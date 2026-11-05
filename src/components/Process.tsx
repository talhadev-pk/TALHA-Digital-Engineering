import { motion, useReducedMotion } from "framer-motion";
import { PROCESS } from "../config/portfolio";
import { Reveal, SectionHead } from "./ui";

export default function Process() {
  const reduce = useReducedMotion();
  return (
    <section id="process" className="relative scroll-mt-20 border-t border-line-soft py-24 md:py-36" aria-label="Engineering process">
      <SectionHead
        index="03"
        eyebrow="Method"
        title={
          <>
            The same six moves,
            <br />
            every <span className="text-gradient italic">single</span> time.
          </>
        }
        lede="How each project in this portfolio went from an idea to a deployed, tested, documented application."
      />

      <div className="mx-auto mt-16 w-full max-w-6xl px-6 md:px-10">
        <ol className="relative">
          {/* spine */}
          <span className="absolute bottom-0 left-[7px] top-0 w-px bg-line-soft sm:left-1/2" aria-hidden />
          <motion.span
            className="absolute left-[7px] top-0 w-px origin-top bg-gradient-to-b from-accent to-accent-2"
            aria-hidden
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{ duration: reduce ? 0 : 2.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: "100%" }}
          />

          {PROCESS.map((step, i) => {
            const left = i % 2 === 0;
            return (
              <li key={step.n} className="relative grid gap-4 py-8 sm:grid-cols-2 sm:gap-0">
                {/* node */}
                <span
                  className="absolute left-0 top-10 grid h-[15px] w-[15px] place-items-center sm:left-1/2 sm:-translate-x-1/2"
                  aria-hidden
                >
                  <span className="absolute h-full w-full rounded-full bg-accent/25" />
                  <span className="relative h-[7px] w-[7px] rounded-full bg-accent" />
                </span>

                <div className={left ? "sm:col-start-1 sm:pr-14" : "sm:col-start-2 sm:pl-14"}>
                  <Reveal delay={0.05} y={20} className="pl-8 sm:pl-0">
                    <div
                      className={
                        "card card-hover p-6 " + (left ? "sm:ml-auto sm:max-w-md" : "sm:mr-auto sm:max-w-md")
                      }
                    >
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="font-display text-4xl font-semibold tracking-tight text-faint transition-colors duration-500 hover:text-accent">
                          {step.n}
                        </span>
                        <span className="kicker">{step.title}</span>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-muted">{step.text}</p>
                    </div>
                  </Reveal>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
