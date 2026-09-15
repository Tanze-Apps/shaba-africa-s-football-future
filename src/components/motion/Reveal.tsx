import { type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

/**
 * Shared easing for the whole site. A long, soft decelerate — the reference
 * design never uses bouncy motion.
 */
export const EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: ReactNode;
  /** Seconds to wait before this element starts. */
  delay?: number;
  /** How far it travels, in px. */
  y?: number;
  className?: string;
  /** "view" animates when scrolled into frame, "mount" runs immediately. */
  trigger?: "view" | "mount";
};

/**
 * Fades and lifts a block as it enters the viewport. Plays once.
 */
export const Reveal = ({
  children,
  delay = 0,
  y = 28,
  className,
  trigger = "view",
}: RevealProps) => {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  const animateProps =
    trigger === "mount"
      ? { animate: { opacity: 1, y: 0 } }
      : {
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "0px 0px -12% 0px" },
        };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      {...animateProps}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
};

type MaskLinesProps = {
  /** One entry per rendered line. */
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  /** Gap between consecutive lines, in seconds. */
  stagger?: number;
  trigger?: "view" | "mount";
  as?: "h1" | "h2" | "h3" | "p" | "div";
};

const lineVariants: Variants = {
  hidden: { y: "108%" },
  shown: { y: "0%" },
};

/**
 * Display type that slides up line by line from behind a mask — the signature
 * headline treatment of the reference design.
 *
 * Each line needs its own overflow-hidden wrapper, which is why the caller
 * passes an array of lines rather than a single string.
 */
export const MaskLines = ({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
  trigger = "view",
  as: Tag = "div",
}: MaskLinesProps) => {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <Tag className={className}>
        {lines.map((line, i) => (
          <span key={i} className={`block ${lineClassName ?? ""}`}>
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  const motionProps =
    trigger === "mount"
      ? { animate: "shown" }
      : {
          whileInView: "shown",
          viewport: { once: true, margin: "0px 0px -10% 0px" } as const,
        };

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className="u-mask">
          <motion.span
            className={`block ${lineClassName ?? ""}`}
            variants={lineVariants}
            initial="hidden"
            {...motionProps}
            transition={{
              duration: 0.85,
              delay: delay + i * stagger,
              ease: EASE,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};
