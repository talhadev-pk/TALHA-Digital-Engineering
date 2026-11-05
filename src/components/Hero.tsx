import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { STATS } from "../config/portfolio";
import { useApp } from "../lib/app";
import { GithubIcon } from "./icons";
import FlowField from "./FlowField";
import SystemMap from "./SystemMap";
import { scrollToId } from "./Nav";

const ease = [0.22, 1, 0.36, 1] as const;

function Headline() {
  const reduce = useReducedMotion();
  const words: { t: string; accent?: boolean }[] = [
    { t: "Engineering" },
    { t: "ideas" },
    { t: "into" },
    { t: "digital" },
    { t: "experiences.", accent: true },
  ];
  return (
    <h1 className="font-display text-[13.5vw] font-semibold leading-[0.98] tracking-tight sm:text-6xl md:text-7xl xl:text-[5.4rem]">
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className={w.accent ? "text-gradient inline-block pr-1 italic" : "inline-block pr-[0.24em]"}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: "112%" }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 + i * 0.09, ease }}
          >
            {w.t}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

export default function Hero({ onOpenProject }: { onOpenProject: (id: string) => void }) {
  const { profile } = useApp();
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative flex min-h-svh items-center overflow-hidden pt-16" aria-label="Introduction">
      {/* backdrop */}
      <div className="grid-bg absolute inset-0" aria-hidden />
      <FlowField className="absolute inset-0 h-full w-full opacity-70" />
      <div
        className="absolute -left-40 top-1/4 h-[420px] w-[420px] rounded-full bg-accent opacity-[0.13] blur-[130px]"
        aria-hidden
      />
      <div
        className="absolute -right-32 bottom-0 h-[380px] w-[380px] rounded-full bg-accent-2 opacity-[0.1] blur-[130px]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 px-6 pb-24 pt-14 md:px-10 lg:grid-cols-12 lg:gap-6 lg:pb-16">
        {/* left column */}
        <div className="flex flex-col justify-center lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="mb-7 flex flex-wrap items-center gap-3"
          >
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-2 opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-2" />
            </span>
            <span className="kicker !text-[0.72rem] text-ink">
              {profile.displayName} — {profile.role}
            </span>
            <span className="chip hidden sm:inline-flex">{profile.tagline}</span>
          </motion.div>

          <Headline />

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease }}
            className="mt-7 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base"
          >
            I build modern web applications, intelligent business systems, automation tools and
            interactive digital products. Six projects below — each one real, running, and honest
            about what it does. Every claim is verifiable in a public repository.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <button type="button" className="btn-primary" onClick={() => scrollToId("work")}>
              Explore projects
              <ArrowDown className="h-4 w-4" aria-hidden />
            </button>
            <a href={profile.github} target="_blank" rel="noreferrer noopener" className="btn-ghost">
              <GithubIcon className="h-4 w-4" />
              GitHub profile
              <ArrowUpRight className="h-3.5 w-3.5 text-faint" aria-hidden />
            </a>
          </motion.div>

          {/* honest stats */}
          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-14 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4"
          >
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
                animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.12 + i * 0.08, ease }}
                className="border-l border-line pl-4"
              >
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">{s.label}</dt>
                <dd className="mt-1.5 font-display text-2xl font-semibold text-ink">{s.value}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>

        {/* right column — system map */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.45 }}
          className="relative flex flex-col items-center justify-center lg:col-span-5"
        >
          <SystemMap onSelect={onOpenProject} />
          <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
            six projects · one ecosystem — click a node
          </p>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.button
        type="button"
        onClick={() => scrollToId("work")}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-faint transition-colors hover:text-ink md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        aria-label="Scroll to projects"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.3em]">scroll</span>
        <span className="relative h-9 w-px overflow-hidden bg-line-soft" aria-hidden>
          <motion.span
            className="absolute left-0 top-0 h-3 w-px bg-accent"
            animate={reduce ? { y: 12 } : { y: [-12, 36] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.button>
    </section>
  );
}
