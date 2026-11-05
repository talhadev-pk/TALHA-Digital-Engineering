import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Cpu,
  ExternalLink,
  FileText,
  Layers,
  ShieldCheck,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { Project } from "../config/portfolio";
import { GithubIcon } from "./icons";
import { LazyImg } from "./ui";
import { cn } from "../utils/cn";

const ease = [0.22, 1, 0.36, 1] as const;

interface Visual {
  src: string;
  alt: string;
  caption: string;
  artwork?: boolean;
  note?: string;
}

export default function ProjectModal({
  project: p,
  onClose,
  onNav,
}: {
  project: Project;
  onClose: () => void;
  onNav: (dir: 1 | -1) => void;
}) {
  const reduce = useReducedMotion();

  const visuals: Visual[] =
    p.screenshots.length > 0
      ? p.screenshots.map((s) => ({ ...s }))
      : p.artwork
        ? [{ src: p.artwork.src, alt: `Identity artwork for ${p.name}`, caption: p.name, artwork: true, note: p.artwork.note }]
        : [];

  const [slide, setSlide] = useState(0);
  useEffect(() => setSlide(0), [p.id]);

  const next = useCallback(() => setSlide((s) => (s + 1) % Math.max(visuals.length, 1)), [visuals.length]);
  const prev = useCallback(
    () => setSlide((s) => (s - 1 + Math.max(visuals.length, 1)) % Math.max(visuals.length, 1)),
    [visuals.length]
  );

  /* keyboard controls */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && (e.metaKey || e.ctrlKey)) onNav(1);
      if (e.key === "ArrowLeft" && (e.metaKey || e.ctrlKey)) onNav(-1);
      if (visuals.length > 1 && !e.metaKey && !e.ctrlKey) {
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onNav, next, prev, visuals.length]);

  /* scroll lock + initial focus */
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const el = document.getElementById("pm-close");
    el?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [p.id]);

  const v = visuals[Math.min(slide, Math.max(visuals.length - 1, 0))];

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${p.name} project details`}
    >
      <motion.button
        type="button"
        aria-label="Close project details"
        className="absolute inset-0 cursor-zoom-out bg-black/60 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="card relative flex max-h-[94svh] w-full max-w-5xl flex-col overflow-hidden sm:max-h-[90vh] sm:rounded-3xl"
        style={{ ["--p" as string]: p.hue }}
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 64, scale: 0.98 }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: 48, scale: 0.98 }}
        transition={{ duration: 0.5, ease }}
      >
        {/* sticky header */}
        <div className="glass z-10 flex items-center gap-3 border-b border-line-soft px-4 py-3 sm:px-6">
          <span className="font-mono text-xs tracking-[0.2em] text-faint">PRJ·{p.index}</span>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.hue }} aria-hidden />
          <span className="font-display text-sm font-semibold tracking-wide">{p.name}</span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-faint sm:inline">
            {p.category}
          </span>
          <div className="ml-auto flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onNav(-1)}
              className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-colors hover:text-ink"
              aria-label="Previous project"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => onNav(1)}
              className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-colors hover:text-ink"
              aria-label="Next project"
            >
              <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
            <button
              id="pm-close"
              type="button"
              onClick={onClose}
              className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-colors hover:text-ink"
              aria-label="Close"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>

        {/* scrollable body */}
        <div className="overflow-y-auto overscroll-contain">
          <div className="grid gap-0 lg:grid-cols-5">
            {/* gallery */}
            <div className="border-b border-line-soft p-4 sm:p-6 lg:col-span-3 lg:border-b-0 lg:border-r">
              {v ? (
                <>
                  <div className="browser-frame relative">
                    <div className="flex items-center justify-between border-b border-line-soft px-3.5 py-2.5">
                      <span className="flex gap-1.5" aria-hidden>
                        <span className="h-2 w-2 rounded-full bg-line" />
                        <span className="h-2 w-2 rounded-full bg-line" />
                        <span className="h-2 w-2 rounded-full bg-line" />
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-faint">
                        {v.artwork ? "identity artwork" : `capture ${slide + 1}/${visuals.length}`}
                      </span>
                    </div>
                    <motion.div
                      key={v.src}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <LazyImg src={v.src} alt={v.alt} eager className="aspect-[16/10] w-full" />
                    </motion.div>
                    {visuals.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={prev}
                          className="glass hairline absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-ink transition-transform hover:scale-105"
                          aria-label="Previous screenshot"
                        >
                          <ArrowLeft className="h-4 w-4" aria-hidden />
                        </button>
                        <button
                          type="button"
                          onClick={next}
                          className="glass hairline absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-ink transition-transform hover:scale-105"
                          aria-label="Next screenshot"
                        >
                          <ArrowRight className="h-4 w-4" aria-hidden />
                        </button>
                      </>
                    )}
                  </div>
                  <p className="mt-3 font-mono text-[11px] tracking-wide text-muted">{v.caption}</p>
                  {v.note ? <p className="mt-1.5 text-xs leading-relaxed text-faint">{v.note}</p> : null}
                  {visuals.length > 1 && (
                    <div className="mt-4 flex gap-2">
                      {visuals.map((s, i) => (
                        <button
                          key={s.src}
                          type="button"
                          onClick={() => setSlide(i)}
                          className={cn(
                            "browser-frame relative w-20 overflow-hidden !rounded-lg transition-all",
                            i === slide ? "ring-2 ring-accent" : "opacity-55 hover:opacity-100"
                          )}
                          aria-label={`Show screenshot ${i + 1}: ${s.caption}`}
                          aria-pressed={i === slide}
                        >
                          <img src={s.src} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : null}

              {/* overview */}
              <div className="mt-8 space-y-4">
                {p.overview.map((para, i) => (
                  <p key={i} className="text-[15px] leading-relaxed text-muted">
                    {para}
                  </p>
                ))}
              </div>

              {/* problem */}
              <div className="mt-8 rounded-2xl border border-line-soft bg-bg-soft p-5">
                <p className="kicker mb-3 flex items-center gap-2 !text-accent">
                  <FileText className="h-3.5 w-3.5" aria-hidden /> Problem addressed
                </p>
                <p className="text-sm leading-relaxed text-muted">{p.problem}</p>
              </div>

              {/* capabilities */}
              <div className="mt-8">
                <p className="kicker mb-4">Main capabilities</p>
                <ul className="space-y-2.5">
                  {p.capabilities.map((c) => (
                    <li key={c} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: p.hue }} aria-hidden />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* right rail */}
            <div className="p-4 sm:p-6 lg:col-span-2">
              <div
                className="rounded-2xl border border-line-soft p-5"
                style={{ background: `linear-gradient(160deg, ${p.hue}14, transparent 55%)` }}
              >
                <p className="font-display text-4xl font-semibold" style={{ color: p.hue }}>
                  {p.stat.value}
                </p>
                <p className="mt-1 text-xs text-muted">{p.stat.label}</p>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                  {p.tagline}
                </p>
              </div>

              <div className="mt-6">
                <p className="kicker mb-3 flex items-center gap-2">
                  <Cpu className="h-3.5 w-3.5" aria-hidden /> Technology stack
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-7">
                <p className="kicker mb-3 flex items-center gap-2">
                  <Layers className="h-3.5 w-3.5" aria-hidden /> Architecture highlights
                </p>
                <ul className="space-y-3">
                  {p.architecture.map((a) => (
                    <li key={a} className="border-l border-line pl-3 text-[13px] leading-relaxed text-muted">
                      {a}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7">
                <p className="kicker mb-3 flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden /> Engineering decisions
                </p>
                <ul className="space-y-3">
                  {p.engineering.map((a) => (
                    <li key={a} className="border-l border-line pl-3 text-[13px] leading-relaxed text-muted">
                      {a}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-col gap-2.5">
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn-primary w-full !text-sm"
                >
                  <GithubIcon className="h-4 w-4" /> View repository
                </a>
                {p.live ? (
                  <a href={p.live} target="_blank" rel="noreferrer noopener" className="btn-ghost w-full !text-sm">
                    <ExternalLink className="h-4 w-4" aria-hidden /> Open live demo
                  </a>
                ) : (
                  <p className="rounded-xl border border-dashed border-line px-4 py-3 text-center text-xs text-faint">
                    {p.liveNote ?? "No public deployment — repository only"}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* modal footer nav */}
          <div className="flex items-center justify-between border-t border-line-soft px-4 py-4 sm:px-6">
            <button
              type="button"
              onClick={() => onNav(-1)}
              className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden />
              Previous project
            </button>
            <span className="font-mono text-[10px] tracking-[0.2em] text-faint">⌘← → to switch</span>
            <button
              type="button"
              onClick={() => onNav(1)}
              className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
            >
              Next project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
