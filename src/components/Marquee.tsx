import { Diamond } from "lucide-react";
import { PROJECTS } from "../config/portfolio";

export default function Marquee() {
  const items = PROJECTS.flatMap((p) => [
    { text: p.name, hue: p.hue },
    { text: p.category.toUpperCase(), dim: true },
  ]);
  const row = [...items, ...items];

  return (
    <div className="marquee relative overflow-hidden border-y border-line-soft py-4" aria-hidden="true">
      <div className="marquee-track flex w-max items-center gap-8 pr-8">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center gap-8">
            {row.map((it, i) => (
              <span key={`${half}-${i}`} className="flex items-center gap-8">
                <span
                  className={
                    "font-display text-sm font-medium tracking-wide " +
                    ("dim" in it && it.dim ? "text-faint" : "text-ink")
                  }
                >
                  {it.text}
                </span>
                <Diamond
                  className="h-2.5 w-2.5"
                  style={{ color: "hue" in it && it.hue ? it.hue : "var(--faint)" }}
                  aria-hidden
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
