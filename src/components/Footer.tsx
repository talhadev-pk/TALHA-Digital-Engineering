import { ArrowUpRight, Heart } from "lucide-react";
import { PROJECTS } from "../config/portfolio";
import { useApp } from "../lib/app";
import { GithubIcon } from "./icons";
import { scrollToId } from "./Nav";

export default function Footer({ onOpenProject }: { onOpenProject: (id: string) => void }) {
  const { profile } = useApp();

  return (
    <footer className="relative overflow-hidden border-t border-line-soft" aria-label="Footer">
      <div className="mx-auto w-full max-w-6xl px-6 pb-14 pt-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <a
              href="#/"
              onClick={(e) => {
                e.preventDefault();
                window.location.hash = "/";
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center gap-3"
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-accent to-accent-2 font-display text-base font-bold text-accent-ink">
                {profile.displayName.charAt(0).toUpperCase()}
              </span>
              <span className="font-mono text-xs tracking-[0.18em] text-muted">{profile.githubUser}</span>
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              {profile.tagline}. A static, honest, fully-verifiable engineering portfolio.
            </p>
            <a
              href={profile.github + "?tab=repositories"}
              target="_blank"
              rel="noreferrer noopener"
              className="u-sweep mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink"
            >
              Browse all repositories <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </div>

          <div className="md:col-span-4">
            <p className="kicker mb-5">Projects</p>
            <ul className="grid grid-cols-2 gap-x-4">
              {PROJECTS.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => onOpenProject(p.id)}
                    className="group flex w-full items-baseline gap-2 py-1.5 text-left text-sm text-muted transition-colors hover:text-ink"
                  >
                    <span className="font-mono text-[9px] text-faint">{p.index}</span>
                    <span className="u-sweep">{p.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="kicker mb-5">Navigate</p>
            <ul>
              {["work", "expertise", "process", "about", "contact"].map((id) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => scrollToId(id)}
                    className="u-sweep block py-1.5 text-sm capitalize text-muted transition-colors hover:text-ink"
                  >
                    {id}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* giant wordmark */}
        <div className="pointer-events-none mt-16 select-none overflow-hidden" aria-hidden>
          <p className="text-center font-display text-[18vw] font-bold leading-[0.85] tracking-tight text-ink opacity-[0.05] md:text-[13rem]">
            {profile.displayName.toUpperCase()}
          </p>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-line-soft pt-6 sm:flex-row">
          <p className="flex items-center gap-1.5 text-xs text-muted">
            Made with{" "}
            <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" aria-label="love" role="img" /> by{" "}
            {profile.displayName}
          </p>
          <p className="font-mono text-[10px] tracking-[0.14em] text-faint">
            © {new Date().getFullYear()} · React · TypeScript · Tailwind · Framer Motion
          </p>
          <a
            href="https://github.com/talhadev-pk/talhadev-pk.github.io"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.14em] text-faint transition-colors hover:text-ink"
          >
            <GithubIcon className="h-3.5 w-3.5" /> SOURCE
          </a>
        </div>
      </div>
    </footer>
  );
}
