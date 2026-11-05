import { motion } from "framer-motion";
import { Info, RotateCcw, Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useApp } from "../lib/app";

const ease = [0.22, 1, 0.36, 1] as const;

interface FieldSpec {
  key: "displayName" | "role" | "tagline" | "email" | "whatsapp";
  label: string;
  hint: string;
  placeholder: string;
}

export default function SettingsDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { profile, overrides, saveOverrides, resetOverrides, notify } = useApp();
  const [form, setForm] = useState({ displayName: "", role: "", tagline: "", email: "", whatsapp: "" });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setForm({
        displayName: overrides.displayName ?? profile.displayName,
        role: overrides.role ?? profile.role,
        tagline: overrides.tagline ?? profile.tagline,
        email: overrides.email ?? profile.email,
        whatsapp: overrides.whatsapp ?? profile.whatsapp,
      });
      setError(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const fields: FieldSpec[] = [
    {
      key: "displayName",
      label: "Display name",
      hint: "Shown in the hero, nav monogram and footer.",
      placeholder: "Talha",
    },
    {
      key: "role",
      label: "Professional role",
      hint: "The positioning line next to your name.",
      placeholder: "Software Engineer",
    },
    {
      key: "tagline",
      label: "Tagline",
      hint: "One-line summary shown in hero and footer.",
      placeholder: "Web Applications · Business Systems · Automation & AI",
    },
    {
      key: "email",
      label: "Contact email",
      hint: "Used by the copy button and all mail links.",
      placeholder: "you@example.com",
    },
    {
      key: "whatsapp",
      label: "WhatsApp number",
      hint: "International format with country code — powers the WhatsApp chat card.",
      placeholder: "+92 3XX XXXXXXX",
    },
  ];

  const save = () => {
    const email = form.email.trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    const whatsapp = form.whatsapp.trim();
    if (whatsapp && !/^\+?[0-9][0-9\s\-()]{6,20}$/.test(whatsapp)) {
      setError("Please enter the WhatsApp number in international format, e.g. +92 307 7251905.");
      return;
    }
    saveOverrides({
      displayName: form.displayName,
      role: form.role,
      tagline: form.tagline,
      email,
      whatsapp,
    });
    setError(null);
    notify("Settings saved — persists after refresh");
    onClose();
  };

  const reset = () => {
    resetOverrides();
    notify("Reset to defaults");
    onClose();
  };

  return (
    <>
      <motion.div
        className="fixed inset-0 z-[85] bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        aria-hidden
      />
      <motion.aside
        className="fixed bottom-0 right-0 top-0 z-[95] flex w-full max-w-md flex-col border-l border-line bg-bg shadow-[0_0_80px_-20px_var(--shadow)]"
        initial={{ x: "104%" }}
        animate={{ x: 0 }}
        exit={{ x: "104%" }}
        transition={{ duration: 0.45, ease }}
        role="dialog"
        aria-modal="true"
        aria-label="Portfolio settings"
      >
        <div className="flex items-center justify-between border-b border-line-soft px-6 py-4">
          <div>
            <p className="font-display text-lg font-semibold tracking-tight">Portfolio settings</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
              stored locally · never uploaded
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-colors hover:text-ink"
            aria-label="Close settings"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
          {fields.map((f) => (
            <div key={f.key}>
              <label className="mb-1.5 block text-xs font-semibold text-ink" htmlFor={`set-${f.key}`}>
                {f.label}
              </label>
              <input
                id={`set-${f.key}`}
                type={f.key === "email" ? "email" : "text"}
                value={form[f.key]}
                placeholder={f.placeholder}
                onChange={(e) => setForm((s) => ({ ...s, [f.key]: e.target.value }))}
                className="glass hairline h-11 w-full rounded-xl px-4 text-sm placeholder:text-faint focus:border-accent focus:outline-none"
              />
              <p className="mt-1.5 text-[11px] text-faint">{f.hint}</p>
            </div>
          ))}

          {error ? (
            <p className="text-xs font-medium text-red-400" role="alert">
              {error}
            </p>
          ) : null}

          <div className="rounded-2xl border border-dashed border-line p-4">
            <p className="flex items-start gap-2 text-[11px] leading-relaxed text-muted">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" aria-hidden />
              Deeper changes — project descriptions, links, capabilities, skills — live in one
              editable config file: <span className="font-mono text-ink">src/config/portfolio.ts</span>.
              No interface rewrites needed.
            </p>
          </div>
        </div>

        <div className="flex gap-2.5 border-t border-line-soft px-6 py-4">
          <button type="button" onClick={reset} className="btn-ghost flex-1 !text-sm">
            <RotateCcw className="h-4 w-4" aria-hidden /> Reset defaults
          </button>
          <button type="button" onClick={save} className="btn-primary flex-1 !text-sm">
            <Save className="h-4 w-4" aria-hidden /> Save changes
          </button>
        </div>
      </motion.aside>
    </>
  );
}
