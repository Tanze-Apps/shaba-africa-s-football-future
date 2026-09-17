import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { EASE } from "@/components/motion/Reveal";

type Player = {
  initials: string;
  name: string;
  /** Position as a percentage of pitch length (left to right). */
  x: number;
  /** Position as a percentage of pitch width (top to bottom). */
  y: number;
  captain?: boolean;
};

/**
 * Makepe United in a 4-3-3, attacking left to right. Players come from the
 * app's demo world — never real people. Listed goalkeeper first so the
 * lineup fills in back to front, the way a captain would build it.
 */
const LINEUP: Player[] = [
  { initials: "FB", name: "Bilong", x: 7, y: 50 },
  { initials: "AK", name: "Kamga", x: 27, y: 21 },
  { initials: "CE", name: "Eboa", x: 27, y: 39 },
  { initials: "LF", name: "Fotso", x: 27, y: 61 },
  { initials: "SN", name: "Ngando", x: 27, y: 81 },
  { initials: "RN", name: "Nana", x: 51, y: 27 },
  { initials: "PE", name: "Essomba", x: 51, y: 50 },
  { initials: "HT", name: "Tchami", x: 51, y: 73 },
  { initials: "BM", name: "Mbida", x: 76, y: 23 },
  { initials: "JM", name: "Mbarga", x: 80, y: 50, captain: true },
  { initials: "YE", name: "Ekambi", x: 76, y: 78 },
];

/** Pitch markings in metres on a 105 x 68 pitch. */
const Markings = () => (
  <svg
    viewBox="0 0 105 68"
    preserveAspectRatio="none"
    className="absolute inset-0 h-full w-full"
    fill="none"
    stroke="rgba(242,244,241,0.14)"
    strokeWidth="1"
    aria-hidden="true"
  >
    <g>
      <rect
        x="1"
        y="1"
        width="103"
        height="66"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1="52.5"
        y1="1"
        x2="52.5"
        y2="67"
        vectorEffect="non-scaling-stroke"
      />
      <circle cx="52.5" cy="34" r="9.15" vectorEffect="non-scaling-stroke" />
      {/* Penalty and goal areas, both ends */}
      <rect
        x="1"
        y="13.84"
        width="16.5"
        height="40.32"
        vectorEffect="non-scaling-stroke"
      />
      <rect
        x="1"
        y="24.84"
        width="5.5"
        height="18.32"
        vectorEffect="non-scaling-stroke"
      />
      <rect
        x="87.5"
        y="13.84"
        width="16.5"
        height="40.32"
        vectorEffect="non-scaling-stroke"
      />
      <rect
        x="98.5"
        y="24.84"
        width="5.5"
        height="18.32"
        vectorEffect="non-scaling-stroke"
      />
    </g>
  </svg>
);

/**
 * An illustrated formation for the Live Formation card. The feature is still
 * in development, so this deliberately isn't a screenshot — it shows the idea
 * without claiming to be the finished app.
 */
const FormationPitch = ({
  label,
  className = "",
}: {
  /** Accessible description of the illustration. */
  label: string;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduced = useReducedMotion();
  const show = inView || reduced;

  return (
    <div
      ref={ref}
      role="img"
      aria-label={label}
      className={`relative aspect-[105/68] w-full overflow-hidden border border-bone/10 bg-ink-deep ${className}`}
      style={{
        // Faint mowing stripes, just enough to read as grass.
        backgroundImage:
          "repeating-linear-gradient(90deg, rgba(45,179,85,0.045) 0 10%, transparent 10% 20%)",
      }}
    >
      <Markings />

      <span className="u-eyebrow absolute left-3 top-2 text-[9px] text-bone-faint">
        Makepe United · 4-3-3
      </span>

      {LINEUP.map((p, i) => (
        // Outer element owns the centring translate; the inner one animates
        // scale, so the two transforms never overwrite each other.
        <div
          key={p.initials}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          aria-hidden="true"
        >
          <motion.div
            className="relative"
            initial={reduced ? false : { opacity: 0, scale: 0.4 }}
            animate={show ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.07, ease: EASE }}
          >
            {p.captain && (
              <span className="animate-marker-pulse absolute inset-0 border border-brand-bright" />
            )}

            <span
              className={`relative flex h-7 w-7 items-center justify-center border md:h-8 md:w-8 ${
                p.captain
                  ? "border-brand-bright bg-brand text-white"
                  : "border-bone/25 bg-ink-raised text-bone"
              }`}
            >
              <span className="font-display text-[11px] leading-none md:text-[12px]">
                {p.initials}
              </span>
            </span>

            <span className="absolute left-1/2 top-full mt-1 hidden -translate-x-1/2 whitespace-nowrap bg-ink-deep/85 px-1 text-[8px] font-semibold uppercase tracking-[0.14em] text-bone-faint md:block">
              {p.name}
              {p.captain && <span className="text-brand-bright"> · C</span>}
            </span>
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default FormationPitch;
