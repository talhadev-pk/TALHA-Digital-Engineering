import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ExternalLink, FolderSearch, Plus, RotateCcw, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { CATEGORIES, PROJECTS, type Project } from "../config/portfolio";
import { GithubIcon } from "./icons";
import { BrowserFrame, SectionHead, Reveal } from "./ui";
import { cn } from "../utils/cn";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Work({ onOpenProject }: { onOpenProject: (id: string) => void }) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const reduce = useReducedMotion();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROJECTS.filter((p) => {
      const inCat = cat === "All" || p.category === cat;
      if (!inCat) return false;
      if (!q) return true;
      const hay = [p.name, p.tagline, p.description, p.category, ...p.stack].join(" ").toLowerCase();
      return hay.includes(q);
    });
  }, [query, cat]);

  return (
    <section id="work" className="relative scroll-mt-20 py-24 md:py-36" aria-label="Projects">
      <SectionHead
        index="01"
        eyebrow="Selected Work"
        title={
          <>
            Six projects.
            <br />
            <span className="text-gradient italic">One consistent standard.</span>
          </>
        }
        lede="Every card below is a complete, working product — repo-verified. Filter by discipline, or search the catalogue."
      />

      {/* controls */}
      <div className="mx-auto mt-12 w-full max-w-6xl px-6 md:px-10">
        <Reveal delay={0.1}>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-xs">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" aria-hidden />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects, stack, category…"
                aria-label="Search projects"
                className="glass hairline h-11 w-full rounded-full pl-10 pr-4 text-sm text-ink placeholder:text-faint focus:border-accent focus:outline-none"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter projects by category">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCat(c)}
                  className={cn(
                    "chip h-9 cursor-pointer px-4 transition-all duration-300",
                    cat === c
                      ? "border-accent bg-accent/10 !text-ink shadow-[0_0_0_1px_var(--accent)]"
                      : "hover:border-line hover:text-ink"
                  )}
                  aria-pressed={cat === c}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-faint" aria-live="polite">
            {filtered.length} / {PROJECTS.length} projects
            {query ? ` · matching “${query.trim()}”` : ""}
            {cat !== "All" ? ` · ${cat}` : ""}
          </p>
        </Reveal>
      </div>

      {/* grid */}
      <div className="mx-auto mt-10 w-full max-w-6xl px-6 md:px-10">
        {filtered.length === 0 ? (
          <Reveal>
            <div className="card flex flex-col items-center gap-4 px-6 py-20 text-center">
              <FolderSearch className="h-8 w-8 text-faint" aria-hidden />
              <p className="font-display text-xl font-medium">No projects match that search.</p>
              <p className="max-w-sm text-sm text-muted">
                Try a technology like “Dexie” or “Zustand”, a name like “FlowPilot”, or reset the filters.
              </p>
              <button
                type="button"
                className="btn-ghost mt-2"
                onClick={() => {
                  setQuery("");
                  setCat("All");
                }}
              >
                <RotateCcw className="h-4 w-4" aria-hidden /> Reset filters
              </button>
            </div>
          </Reveal>
        ) : (
          <motion.div layout className="grid gap-6 md:grid-cols-2" id="project-grid">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.article
                  layout
                  key={p.id}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 32 }}
                  animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.55, delay: reduce ? 0 : Math.min(i * 0.06, 0.3), ease }}
                >
                  <ProjectCard project={p} onOpen={() => onOpenProject(p.id)} />
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project: p, onOpen }: { project: Project; onOpen: () => void }) {
  const shot = p.screenshots[0];
  return (
    <div
      className="card card-hover group relative flex h-full flex-col overflow-hidden p-4 sm:p-5"
      style={{ ["--p" as string]: p.hue }}
    >
      {/* hue edge */}
      <span
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-70 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `linear-gradient(90deg, transparent, ${p.hue}, transparent)` }}
        aria-hidden
      />

      <button
        type="button"
        onClick={onOpen}
        className="block text-left"
        aria-label={`Open details for ${p.name}`}
      >
        <div className="relative overflow-hidden rounded-2xl">
          {shot ? (
            <BrowserFrame
              src={shot.src}
              alt={shot.alt}
              className="transition-transform duration-700 ease-out group-hover:scale-[1.025]"
            />
          ) : p.artwork ? (
            <div className="browser-frame relative">
              <div className="flex items-center justify-between border-b border-line-soft px-3.5 py-2.5">
                <span className="flex gap-1.5" aria-hidden>
                  <span className="h-2 w-2 rounded-full bg-line" />
                  <span className="h-2 w-2 rounded-full bg-line" />
                  <span className="h-2 w-2 rounded-full bg-line" />
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-faint">identity artwork</span>
              </div>
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={p.artwork.src}
                  alt={`Abstract identity artwork for ${p.name}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>
            </div>
          ) : null}
          <span
            className="glass hairline absolute left-3 top-3 rounded-full px-2.5 py-1 font-mono text-[10px] tracking-[0.18em] text-ink"
            aria-hidden
          >
            PRJ·{p.index}
          </span>
        </div>
      </button>

      <div className="flex flex-1 flex-col px-1 pb-1 pt-5">
        <div className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.hue }} aria-hidden />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{p.category}</span>
          <span className="font-mono text-[10px] tracking-[0.2em] text-faint">· {p.year}</span>
          {p.live ? (
            <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-2" aria-hidden /> live
            </span>
          ) : (
            <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.14em] text-faint">repo</span>
          )}
        </div>

        <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">{p.name}</h3>
        <p className="mt-1 font-display text-sm text-muted">{p.tagline}</p>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">{p.description}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.stack.slice(0, 4).map((s) => (
            <span key={s} className="chip">
              {s}
            </span>
          ))}
          {p.stack.length > 4 && <span className="chip text-faint">+{p.stack.length - 4}</span>}
        </div>

        <div className="mt-auto flex items-center gap-2 pt-6">
          <button type="button" onClick={onOpen} className="btn-primary !px-5 !py-2.5 !text-[13px]">
            <Plus className="h-4 w-4" aria-hidden /> Details
          </button>
          <a
            href={p.repo}
            target="_blank"
            rel="noreferrer noopener"
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-all hover:-translate-y-0.5 hover:border-faint hover:text-ink"
            aria-label={`${p.name} GitHub repository`}
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          {p.live ? (
            <a
              href={p.live}
              target="_blank"
              rel="noreferrer noopener"
              className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-all hover:-translate-y-0.5 hover:border-faint hover:text-ink"
              aria-label={`${p.name} live demo`}
            >
              <ExternalLink className="h-4 w-4" aria-hidden />
            </a>
          ) : null}
          <button
            type="button"
            onClick={onOpen}
            className="ml-auto inline-flex items-center gap-1 font-mono text-[11px] tracking-[0.14em] text-faint transition-colors hover:text-ink"
          >
            PRJ·{p.index} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
