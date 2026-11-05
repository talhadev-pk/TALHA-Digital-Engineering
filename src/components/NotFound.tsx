import { motion } from "framer-motion";
import { ArrowLeft, Compass } from "lucide-react";
import { scrollToId } from "./Nav";

export default function NotFound() {
  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="grid-bg absolute inset-0" aria-hidden />
      <motion.p
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-gradient font-display text-[26vw] font-bold leading-none tracking-tight sm:text-[12rem]"
      >
        404
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="kicker mt-2">route not found</p>
        <h1 className="mt-4 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          This page drifted off the map.
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
          The route you opened doesn't exist — it may have been renamed, or the link was mistyped.
          The good stuff is one click away.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="#/" className="btn-primary">
            <ArrowLeft className="h-4 w-4" aria-hidden /> Back to portfolio
          </a>
          <a
            href="#/"
            className="btn-ghost"
            onClick={(e) => {
              e.preventDefault();
              window.location.hash = "/";
              window.setTimeout(() => scrollToId("work"), 80);
            }}
          >
            <Compass className="h-4 w-4" aria-hidden /> Explore projects
          </a>
        </div>
      </motion.div>
    </main>
  );
}
