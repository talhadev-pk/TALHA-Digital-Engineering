import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "framer-motion";
import { ArrowUp, CheckCircle2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import About from "./components/About";
import Contact from "./components/Contact";
import Expertise from "./components/Expertise";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Nav from "./components/Nav";
import NotFound from "./components/NotFound";
import Process from "./components/Process";
import ProjectModal from "./components/ProjectModal";
import SettingsDrawer from "./components/SettingsDrawer";
import Work from "./components/Work";
import { PROJECTS } from "./config/portfolio";
import { AppProvider, parseHash, useApp, type Route } from "./lib/app";

const IDS = PROJECTS.map((p) => p.id);
const ease = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/*  Boot loader                                                        */
/* ------------------------------------------------------------------ */

function Loader({ done }: { done: () => void }) {
  const reduce = useReducedMotion();
  useEffect(() => {
    const t = window.setTimeout(done, reduce ? 250 : 1300);
    return () => window.clearTimeout(t);
  }, [done, reduce]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center bg-bg"
      exit={{ y: "-100%", transition: { duration: 0.7, ease } }}
      aria-hidden
    >
      <div className="flex flex-col items-center gap-5">
        <motion.span
          initial={{ scale: 0.7, opacity: 0, rotate: -8 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.6, ease }}
          className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-accent to-accent-2 font-display text-2xl font-bold text-accent-ink"
        >
          T
        </motion.span>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint"
        >
          talhadev-pk · portfolio
        </motion.p>
        <motion.span
          className="h-px w-40 origin-left bg-gradient-to-r from-accent to-accent-2"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: reduce ? 0.2 : 1.0, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Toasts                                                             */
/* ------------------------------------------------------------------ */

function Toasts() {
  const { toasts } = useApp();
  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-[120] -translate-x-1/2" role="status" aria-live="polite">
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 18, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.35, ease }}
            className="glass hairline mb-2 flex items-center gap-2.5 rounded-full px-4 py-2.5 shadow-[0_12px_40px_-12px_var(--shadow)]"
          >
            <CheckCircle2 className="h-4 w-4 text-accent-2" aria-hidden />
            <span className="whitespace-nowrap text-[13px] font-medium text-ink">{t.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Back to top                                                        */
/* ------------------------------------------------------------------ */

function BackToTop() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.7, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 12 }}
          transition={{ duration: 0.3, ease }}
          onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })}
          className="glass hairline fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-full text-ink shadow-[0_14px_40px_-12px_var(--shadow)] transition-transform hover:-translate-y-1"
          aria-label="Back to top"
        >
          <ArrowUp className="h-4.5 w-4.5" aria-hidden />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  Site                                                               */
/* ------------------------------------------------------------------ */

function Site() {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash, IDS));
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [booted, setBooted] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onHash = () => setRoute(parseHash(window.location.hash, IDS));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const openProject = useCallback((id: string) => {
    window.location.hash = `/project/${id}`;
  }, []);

  const closeProject = useCallback(() => {
    window.location.hash = "/";
  }, []);

  const navProject = useCallback(
    (dir: 1 | -1) => {
      if (route.page !== "project") return;
      const i = IDS.indexOf(route.id);
      const next = IDS[(i + dir + IDS.length) % IDS.length];
      window.location.hash = `/project/${next}`;
    },
    [route]
  );

  /* document title per route */
  useEffect(() => {
    if (route.page === "project") {
      const p = PROJECTS.find((x) => x.id === route.id);
      if (p) document.title = `${p.name} — ${p.tagline} · Talha`;
    } else if (route.page === "notfound") {
      document.title = "404 — Page not found · Talha";
    } else {
      document.title = "Talha — Software Engineer · Portfolio & Project Showcase";
    }
  }, [route]);

  const project = route.page === "project" ? PROJECTS.find((p) => p.id === route.id) : undefined;

  return (
    <div className="noise min-h-svh">
      <a
        href="#work"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("work")?.scrollIntoView();
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[130] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-accent-ink"
      >
        Skip to projects
      </a>

      <AnimatePresence>{!booted && <Loader done={() => setBooted(true)} />}</AnimatePresence>

      {route.page === "notfound" ? (
        <NotFound />
      ) : (
        <>
          <Nav onOpenSettings={() => setSettingsOpen(true)} />
          <main>
            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: reduce ? 0 : 0.1 }}
            >
              <Hero onOpenProject={openProject} />
              <Marquee />
              <Work onOpenProject={openProject} />
              <Expertise />
              <Process />
              <About />
              <Contact />
            </motion.div>
          </main>
          <Footer onOpenProject={openProject} />
        </>
      )}

      <AnimatePresence>
        {project && (
          <ProjectModal key="pm" project={project} onClose={closeProject} onNav={navProject} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {settingsOpen && <SettingsDrawer open={settingsOpen} onClose={() => setSettingsOpen(false)} />}
      </AnimatePresence>

      <BackToTop />
      <Toasts />
    </div>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <AppProvider>
        <Site />
      </AppProvider>
    </MotionConfig>
  );
}
