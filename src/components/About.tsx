import { Compass, FlaskConical, HeartHandshake, ScanEye } from "lucide-react";
import { useApp } from "../lib/app";
import { Reveal, SectionHead } from "./ui";

const PRINCIPLES = [
  {
    icon: HeartHandshake,
    title: "Honesty shipped as a feature",
    text: "Every project labels its simulated data, demo integrations and illustrative metrics in the UI itself — because a portfolio that fakes its numbers proves nothing.",
  },
  {
    icon: ScanEye,
    title: "Definitions before dashboards",
    text: "From CommerceOS's P&L to NexaCore's KPI thresholds, every figure documents its formula. A number you can't explain is decoration.",
  },
  {
    icon: FlaskConical,
    title: "Learning by building for real",
    text: "IndexedDB transactions, drag-and-drop persistence, OLS forecasting, canvas tooling — each project exists to master something concrete, end to end.",
  },
  {
    icon: Compass,
    title: "Static-first, deploy-anywhere",
    text: "No backend required, no paid hosting, no secrets. Hash routing, guarded persistence and Actions workflows mean every repo is one push away from live.",
  },
];

export default function About() {
  const { profile } = useApp();
  return (
    <section id="about" className="relative scroll-mt-20 border-t border-line-soft py-24 md:py-36" aria-label="About">
      <SectionHead
        index="04"
        eyebrow="About"
        title={
          <>
            A builder of <span className="text-gradient italic">practical</span>
            <br />
            software.
          </>
        }
      />

      <div className="mx-auto mt-14 grid w-full max-w-6xl gap-10 px-6 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="text-lg leading-relaxed text-ink">
              I'm {profile.displayName} — a developer who learns by shipping complete products, not
              snippets. This portfolio is a collection of interconnected business applications:
              automation, commerce, content, operations, analytics and simulation.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 text-[15px] leading-relaxed text-muted">
              The thread connecting all six projects is a preference for software that respects its
              user. Interfaces are designed, not defaulted. State persists where it should. Inputs
              are validated, empty states are designed, destructive actions ask first. And where
              something is a demonstration, the interface says so — simulated runs are labelled
              simulated, sample statistics are labelled sample.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-6 text-[15px] leading-relaxed text-muted">
              Technically, I work in TypeScript across the React ecosystem — component architecture,
              client-side data modelling, Zustand and IndexedDB persistence, charting, canvas tools
              and motion — with testing and CI treated as part of the product, not an afterthought.
              I'm most interested in automation, honest AI UX and the business systems that sit
              between a spreadsheet and an enterprise suite.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center gap-2">
              {["Applications", "Business systems", "Automation", "Honest AI UX", "Data products"].map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.title} delay={0.05 + i * 0.07}>
                <div className="card card-hover h-full p-6">
                  <p.icon className="h-5 w-5 text-accent" aria-hidden />
                  <h3 className="mt-4 font-display text-base font-semibold tracking-tight">{p.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <p className="mt-6 border-l-2 border-accent pl-4 font-display text-base italic leading-relaxed text-muted">
              “Every repository here is public, tested and documented — the README tells you exactly
              what is real and what is simulated. That transparency is the product.”
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
