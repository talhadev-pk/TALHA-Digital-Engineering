import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { DEFAULT_PROFILE, type Profile } from "../config/portfolio";

/* ------------------------------------------------------------------ */
/*  Theme                                                              */
/* ------------------------------------------------------------------ */

export type Theme = "dark" | "light";
const THEME_KEY = "tdp-theme";

function initialTheme(): Theme {
  try {
    const t = localStorage.getItem(THEME_KEY);
    if (t === "light" || t === "dark") return t;
  } catch {}
  return "dark";
}

/* ------------------------------------------------------------------ */
/*  Editable profile (persisted overrides)                             */
/* ------------------------------------------------------------------ */

export interface ProfileOverride {
  displayName?: string;
  role?: string;
  tagline?: string;
  email?: string;
  whatsapp?: string;
}

const SETTINGS_KEY = "tdp-settings-v1";

function loadOverrides(): ProfileOverride {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") return parsed as ProfileOverride;
  } catch {}
  return {};
}

/* ------------------------------------------------------------------ */
/*  Toasts                                                             */
/* ------------------------------------------------------------------ */

export interface Toast {
  id: number;
  message: string;
}

interface AppState {
  theme: Theme;
  toggleTheme: () => void;
  profile: Profile;
  overrides: ProfileOverride;
  saveOverrides: (o: ProfileOverride) => void;
  resetOverrides: () => void;
  toasts: Toast[];
  notify: (message: string) => void;
}

const Ctx = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [overrides, setOverrides] = useState<ProfileOverride>(loadOverrides);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {}
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(overrides));
    } catch {}
  }, [overrides]);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const toggleTheme = useCallback(() => setTheme((t) => (t === "dark" ? "light" : "dark")), []);

  const notify = useCallback((message: string) => {
    idRef.current += 1;
    const id = idRef.current;
    setToasts((ts) => [...ts.slice(-2), { id, message }]);
    const t = window.setTimeout(() => setToasts((ts) => ts.filter((x) => x.id !== id)), 2600);
    timers.current.push(t);
  }, []);

  const saveOverrides = useCallback((o: ProfileOverride) => setOverrides(o), []);
  const resetOverrides = useCallback(() => {
    setOverrides({});
    try {
      localStorage.removeItem(SETTINGS_KEY);
    } catch {}
  }, []);

  const profile = useMemo<Profile>(
    () => ({
      ...DEFAULT_PROFILE,
      displayName: overrides.displayName?.trim() || DEFAULT_PROFILE.displayName,
      role: overrides.role?.trim() || DEFAULT_PROFILE.role,
      tagline: overrides.tagline?.trim() || DEFAULT_PROFILE.tagline,
      email: overrides.email?.trim() || DEFAULT_PROFILE.email,
      whatsapp: overrides.whatsapp?.trim() || DEFAULT_PROFILE.whatsapp,
    }),
    [overrides]
  );

  const value = useMemo<AppState>(
    () => ({ theme, toggleTheme, profile, overrides, saveOverrides, resetOverrides, toasts, notify }),
    [theme, toggleTheme, profile, overrides, saveOverrides, resetOverrides, toasts, notify]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp(): AppState {
  const v = useContext(Ctx);
  if (!v) throw new Error("useApp must be used inside AppProvider");
  return v;
}

/* ------------------------------------------------------------------ */
/*  Tiny hash router                                                   */
/* ------------------------------------------------------------------ */

export type Route = { page: "home" } | { page: "project"; id: string } | { page: "notfound" };

export function parseHash(hash: string, validIds: string[]): Route {
  const h = hash.replace(/^#/, "");
  if (h === "" || h === "/" || h === "/top") return { page: "home" };
  const m = h.match(/^\/project\/([a-z0-9-]+)$/i);
  if (m) return validIds.includes(m[1]) ? { page: "project", id: m[1] } : { page: "notfound" };
  return { page: "notfound" };
}
