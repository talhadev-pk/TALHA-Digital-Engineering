import { BarChart3, Layers, PanelsTopLeft, ShieldCheck, Sparkles, type LucideIcon } from "lucide-react";
import { SKILL_GROUPS } from "../config/portfolio";
import { Reveal, SectionHead } from "./ui";

const ICONS: Record<string, LucideIcon> = {
  layout: PanelsTopLeft,
  layers: Layers,
  chart: BarChart3,
  sparkles: Sparkles,
  shield: ShieldCheck,
};

export default function Expertise() {
  return (
    <section id="expertise" className="relative scroll-mt-20 border-t border-line-soft py-24 md:py-36" aria-label="Expertise">
      <div
        className="absolute right-0 top-24 h-[320px] w-[320px] rounded-full bg-accent opacity-[0.07] blur-[120px]"
        aria-hidden
      />
      <SectionHead
        index="02"
        eyebrow="Capabilities"
        title={
          <>
            Expertise, <span className="text-gradient italic">traceable</span>
            <br />
            to shipped code.
          </>
        }
        lede="No skill-cloud filler. Every entry names the repository it comes from — hover any card and check the provenance."
      />

      <div className="mx-auto mt-14 grid w-full max-w-6xl gap-4 px-6 md:grid-cols-2 md:px-10 lg:grid-cols-6">
        {SKILL_GROUPS.map((g, gi) => {
          const Icon = ICONS[g.icon] ?? Layers;
          const span = gi < 2 ? "lg:col-span-3" : gi === 2 ? "lg:col-span-2" : gi === 3 ? "lg:col-span-2" : "lg:col-span-2";
          return (
            <Reveal key={g.title} delay={Math.min(gi * 0.07, 0.28)} className={span}>
              <div className="card card-hover group relative h-full overflow-hidden p-6">
                <span
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-[0.13]"
                  aria-hidden
                />
                <div className="flex items-center gap-3.5">
                  <span className="glass hairline grid h-11 w-11 place-items-center rounded-xl text-accent">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold tracking-tight">{g.title}</h3>
                    <p className="text-xs text-faint">{g.blurb}</p>
                  </div>
                </div>
                <ul className="mt-5 space-y-0">
                  {g.skills.map((s) => (
                    <li
                      key={s.name}
                      className="group/skill flex items-baseline justify-between gap-3 border-t border-line-soft py-2.5 first:border-t-0"
                    >
                      <span className="text-sm font-medium text-ink">{s.name}</span>
                      <span className="text-right font-mono text-[10px] tracking-wide text-faint transition-colors group-hover/skill:text-muted">
                        {s.from}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
