import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Menu, Moon, Settings2, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { GithubIcon } from "./icons";
import { useApp } from "../lib/app";
import { cn } from "../utils/cn";

const LINKS = [
  { id: "work", label: "Work", kbd: "01" },
  { id: "expertise", label: "Expertise", kbd: "02" },
  { id: "process", label: "Process", kbd: "03" },
  { id: "about", label: "About", kbd: "04" },
  { id: "contact", label: "Contact", kbd: "05" },
];

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Nav({ onOpenSettings }: { onOpenSettings: () => void }) {
  const { theme, toggleTheme, profile } = useApp();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* scroll-spy */
  useEffect(() => {
    const ids = LINKS.map((l) => l.id);
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-38% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  /* lock scroll when menu open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <motion.div
          className="h-[2px] origin-left bg-gradient-to-r from-accent to-accent-2"
          style={{ scaleX: progress }}
          aria-hidden
        />
        <div
          className={cn(
            "transition-all duration-500",
            scrolled ? "glass border-b border-line-soft" : "border-b border-transparent"
          )}
        >
          <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 md:px-10" aria-label="Primary">
            <a
              href="#/"
              onClick={(e) => {
                e.preventDefault();
                window.location.hash = "/";
                window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
              }}
              className="group flex items-center gap-3"
            >
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent to-accent-2 font-display text-sm font-bold text-accent-ink transition-transform duration-500 group-hover:rotate-[-8deg]">
                {profile.displayName.charAt(0).toUpperCase()}
              </span>
              <span className="font-mono text-xs tracking-[0.18em] text-muted transition-colors group-hover:text-ink">
                {profile.githubUser}
              </span>
            </a>

            <ul className="hidden items-center gap-7 lg:flex">
              {LINKS.map((l) => (
                <li key={l.id}>
                  <button
                    type="button"
                    onClick={() => scrollToId(l.id)}
                    className={cn(
                      "u-sweep flex items-baseline gap-1.5 text-[13px] font-medium transition-colors",
                      active === l.id ? "text-ink" : "text-muted hover:text-ink"
                    )}
                    aria-current={active === l.id ? "true" : undefined}
                  >
                    <span className="font-mono text-[9px] text-accent/80">{l.kbd}</span>
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-1.5">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer noopener"
                className="grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:bg-line-soft hover:text-ink"
                aria-label="GitHub profile"
              >
                <GithubIcon className="h-[18px] w-[18px]" />
              </a>
              <button
                type="button"
                onClick={toggleTheme}
                className="grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:bg-line-soft hover:text-ink"
                aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={theme}
                    initial={{ rotate: -40, opacity: 0, scale: 0.7 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 40, opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.25 }}
                    className="grid place-items-center"
                  >
                    {theme === "dark" ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
                  </motion.span>
                </AnimatePresence>
              </button>
              <button
                type="button"
                onClick={onOpenSettings}
                className="grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:bg-line-soft hover:text-ink"
                aria-label="Open portfolio settings"
              >
                <Settings2 className="h-[18px] w-[18px]" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:bg-line-soft hover:text-ink lg:hidden"
                aria-label="Open menu"
                aria-expanded={open}
              >
                <Menu className="h-5 w-5" aria-hidden />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex flex-col bg-bg lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex h-16 items-center justify-between border-b border-line-soft px-6">
              <span className="font-mono text-xs tracking-[0.18em] text-muted">MENU</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-line-soft hover:text-ink"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center px-8" aria-label="Mobile">
              {LINKS.map((l, i) => (
                <motion.button
                  key={l.id}
                  type="button"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, x: -24 }}
                  animate={reduce ? { opacity: 1 } : { opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => {
                    setOpen(false);
                    window.setTimeout(() => scrollToId(l.id), 60);
                  }}
                  className="group flex items-baseline gap-4 border-b border-line-soft py-5 text-left"
                >
                  <span className="font-mono text-xs text-accent">{l.kbd}</span>
                  <span className="font-display text-4xl font-semibold tracking-tight text-ink transition-transform duration-300 group-hover:translate-x-2">
                    {l.label}
                  </span>
                </motion.button>
              ))}
            </nav>
            <div className="border-t border-line-soft p-6">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-ghost w-full"
              >
                <GithubIcon className="h-4 w-4" /> GitHub — {profile.githubUser}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
