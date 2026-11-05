import { motion, useReducedMotion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { useApp } from "../lib/app";

/* ------------------------------------------------------------------ */
/*  Scroll reveal wrapper                                              */
/* ------------------------------------------------------------------ */

export function Reveal({
  children,
  delay = 0,
  className,
  y = 28,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section heading                                                    */
/* ------------------------------------------------------------------ */

export function SectionHead({
  index,
  eyebrow,
  title,
  lede,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  lede?: string;
}) {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
      <Reveal>
        <div className="flex items-center gap-4">
          <span className="kicker text-accent">{index}</span>
          <span className="h-px flex-1 bg-line-soft" aria-hidden />
          <span className="kicker">{eyebrow}</span>
        </div>
      </Reveal>
      <div className="mt-6 grid gap-6 md:grid-cols-12 md:items-end">
        <Reveal className="md:col-span-8" delay={0.06}>
          <h2 className="font-display text-4xl font-semibold leading-[1.04] tracking-tight sm:text-5xl md:text-6xl">
            {title}
          </h2>
        </Reveal>
        {lede ? (
          <Reveal className="md:col-span-4" delay={0.12}>
            <p className="max-w-sm text-[15px] leading-relaxed text-muted md:ml-auto">{lede}</p>
          </Reveal>
        ) : null}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Lazy image with skeleton                                           */
/* ------------------------------------------------------------------ */

export function LazyImg({
  src,
  alt,
  className,
  eager = false,
}: {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className={cn("flex items-center justify-center bg-bg-soft text-faint font-mono text-xs", className)}>
        preview unavailable
      </div>
    );
  }
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {!loaded && <div className="shimmer absolute inset-0" aria-hidden />}
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={cn(
          "h-full w-full object-cover transition-opacity duration-700",
          loaded ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Browser chrome frame                                               */
/* ------------------------------------------------------------------ */

export function BrowserFrame({
  src,
  alt,
  caption,
  className,
  eager = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  eager?: boolean;
}) {
  return (
    <figure className={cn("browser-frame", className)}>
      <div className="flex items-center gap-1.5 border-b border-line-soft px-3.5 py-2.5" aria-hidden>
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="ml-2 h-1.5 w-24 rounded-full bg-line-soft" />
      </div>
      <LazyImg src={src} alt={alt} eager={eager} className="aspect-[16/10] w-full" />
      {caption ? (
        <figcaption className="border-t border-line-soft px-4 py-2.5 font-mono text-[11px] tracking-wide text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/*  Copy button                                                        */
/* ------------------------------------------------------------------ */

export function CopyEmail({ email, className }: { email: string; className?: string }) {
  const { notify } = useApp();
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    []
  );

  const copy = async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(email);
      ok = true;
    } catch {
      try {
        const ta = document.createElement("textarea");
        ta.value = email;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        ok = document.execCommand("copy");
        document.body.removeChild(ta);
      } catch {}
    }
    setCopied(ok);
    notify(ok ? "Email copied to clipboard" : "Copy failed — email shown above");
    timer.current = window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={cn("btn-ghost", className)}
      aria-live="polite"
      aria-label={`Copy email address ${email}`}
    >
      {copied ? <Check className="h-4 w-4 text-accent-2" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
      {copied ? "Copied" : "Copy email"}
    </button>
  );
}
