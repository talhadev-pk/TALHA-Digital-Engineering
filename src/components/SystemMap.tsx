import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { PROJECTS, type Project } from "../config/portfolio";
import { useApp } from "../lib/app";

/* ------------------------------------------------------------------ */
/*  Interactive constellation: six project nodes around a core node.   */
/*  Canvas draws edges + travelling packets; HTML chips stay           */
/*  keyboard-accessible and clickable.                                 */
/* ------------------------------------------------------------------ */

const ease = [0.22, 1, 0.36, 1] as const;

function ringPos(i: number, total: number) {
  const a = (-90 + (360 / total) * i) * (Math.PI / 180);
  return { x: 50 + 38 * Math.cos(a), y: 50 + 34 * Math.sin(a), angle: a };
}

export default function SystemMap({ onSelect }: { onSelect: (id: string) => void }) {
  const { profile } = useApp();
  const wrap = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduce = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 60, damping: 20 });
  const py = useSpring(my, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const holder = wrap.current;
    if (!canvas || !holder) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = holder.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const nodes = PROJECTS.map((p, i) => ({ p, ...ringPos(i, PROJECTS.length) }));

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const dark = document.documentElement.classList.contains("dark");
      const cx = w / 2;
      const cy = h / 2;

      // faint guide rings
      ctx.lineWidth = 1;
      for (const rr of [0.24, 0.38]) {
        ctx.strokeStyle = dark ? "rgba(255,255,255,0.05)" : "rgba(16,18,25,0.06)";
        ctx.setLineDash([2, 6]);
        ctx.beginPath();
        ctx.ellipse(cx, cy, w * rr, h * rr * 0.92, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // edges center <-> node and ring neighbours
      const pt = (n: { x: number; y: number }) => ({ x: (n.x / 100) * w, y: (n.y / 100) * h });
      for (let i = 0; i < nodes.length; i++) {
        const a = pt(nodes[i]);
        const b = pt(nodes[(i + 1) % nodes.length]);
        for (const [from, to] of [
          [{ x: cx, y: cy }, a],
          [a, b],
        ] as const) {
          ctx.strokeStyle = dark ? "rgba(255,255,255,0.08)" : "rgba(16,18,25,0.09)";
          ctx.beginPath();
          ctx.moveTo(from.x, from.y);
          ctx.lineTo(to.x, to.y);
          ctx.stroke();
        }
      }

      // travelling packets along center edges
      nodes.forEach((n, i) => {
        const target = pt(n);
        const speed = 0.00022 + i * 0.00002;
        const tt = reduce ? 0.5 : (t * speed + i * 0.16) % 1;
        const ping = tt < 0.5 ? tt * 2 : (1 - tt) * 2;
        const x = cx + (target.x - cx) * ping;
        const y = cy + (target.y - cy) * ping;
        const g = ctx.createRadialGradient(x, y, 0, x, y, 9);
        g.addColorStop(0, n.p.hue + "ee");
        g.addColorStop(1, n.p.hue + "00");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, 9, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = n.p.hue;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      // node points
      nodes.forEach((n, i) => {
        const { x, y } = pt(n);
        const pulse = reduce ? 0.5 : (Math.sin(t * 0.0016 + i) + 1) / 2;
        const g = ctx.createRadialGradient(x, y, 0, x, y, 16);
        g.addColorStop(0, n.p.hue + (dark ? "55" : "44"));
        g.addColorStop(1, n.p.hue + "00");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = n.p.hue;
        ctx.beginPath();
        ctx.arc(x, y, 3 + pulse * 1.6, 0, Math.PI * 2);
        ctx.fill();
      });

      // core
      const corePulse = reduce ? 0.5 : (Math.sin(t * 0.0012) + 1) / 2;
      const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 44);
      cg.addColorStop(0, dark ? "rgba(139,124,255,0.34)" : "rgba(106,88,240,0.26)");
      cg.addColorStop(1, "rgba(139,124,255,0)");
      ctx.fillStyle = cg;
      ctx.beginPath();
      ctx.arc(cx, cy, 44 + corePulse * 6, 0, Math.PI * 2);
      ctx.fill();
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw(0);
    });
    ro.observe(holder);

    if (reduce) {
      draw(0);
    } else {
      const loop = (t: number) => {
        draw(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [reduce]);

  const onMove = (e: React.PointerEvent) => {
    if (reduce || !wrap.current) return;
    const r = wrap.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 14);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 14);
  };

  return (
    <div
      ref={wrap}
      onPointerMove={onMove}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="relative aspect-square w-full select-none"
      role="group"
      aria-label="Interactive map of the six projects"
    >
      <motion.div style={reduce ? undefined : { x: px, y: py }} className="absolute inset-0">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />

        {/* core node */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease }}
            className="relative grid place-items-center"
          >
            <span className="spin-slow absolute h-20 w-20 rounded-full border border-dashed border-line" aria-hidden />
            <span className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-2 font-display text-xl font-bold text-accent-ink shadow-[0_12px_40px_-10px_var(--glow)]">
              {profile.displayName.charAt(0).toUpperCase()}
            </span>
          </motion.div>
        </div>

        {/* project chips */}
        {PROJECTS.map((p, i) => {
          const pos = ringPos(i, PROJECTS.length);
          return (
            <Chip key={p.id} p={p} i={i} x={pos.x} y={pos.y} onSelect={onSelect} />
          );
        })}
      </motion.div>
    </div>
  );
}

function Chip({
  p,
  i,
  x,
  y,
  onSelect,
}: {
  p: Project;
  i: number;
  x: number;
  y: number;
  onSelect: (id: string) => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(p.id)}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.5 + i * 0.08, ease }}
      whileHover={{ scale: 1.08, y: -3 }}
      whileTap={{ scale: 0.96 }}
      className="glass hairline group absolute flex -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center gap-2 rounded-full py-1.5 pl-2.5 pr-3 shadow-[0_10px_36px_-16px_var(--shadow)] transition-colors hover:border-[var(--line)]"
      style={{ left: `${x}%`, top: `${y}%` }}
      aria-label={`Open ${p.name} project details`}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.hue }} aria-hidden />
      <span className="font-mono text-[10px] tracking-[0.14em] text-faint">{p.index}</span>
      <span className="whitespace-nowrap font-display text-xs font-medium tracking-wide max-sm:hidden">
        {p.name}
      </span>
      <span className="whitespace-nowrap font-display text-xs font-medium tracking-wide sm:hidden">
        {p.name.split(" ")[0].replace("OS", "")}
      </span>
    </motion.button>
  );
}
