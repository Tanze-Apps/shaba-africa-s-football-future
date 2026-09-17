import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/components/motion/Reveal";

const SESSION_KEY = "shabas:loaded";

/**
 * Whether the intro should play at all.
 *
 * It runs once per browser session — replaying it on every internal
 * navigation would be noise — and never for visitors who ask for reduced
 * motion. Computed synchronously so the first render already knows, which
 * avoids a frame of hidden hero content when the loader is skipped.
 */
export const shouldShowLoader = () => {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  // Escape hatch for previewing the page without sitting through the intro.
  if (new URLSearchParams(window.location.search).has("nointro")) return false;
  try {
    return sessionStorage.getItem(SESSION_KEY) !== "1";
  } catch {
    // Private browsing or blocked storage — show it, just don't remember.
    return true;
  }
};

const MIN_DURATION = 1400;

type LoaderProps = {
  /** Fires as the panel starts clearing, so the hero animates into the wipe. */
  onDone: () => void;
};

const Loader = ({ onDone }: LoaderProps) => {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);
  const doneRef = useRef(false);

  useEffect(() => {
    const start = performance.now();
    let frame = 0;
    let settled = false;

    // The bar tracks real page load, but never finishes faster than
    // MIN_DURATION so it doesn't flash on a warm cache.
    const pageLoaded =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((resolve) =>
            window.addEventListener("load", () => resolve(), { once: true }),
          );

    pageLoaded.then(() => {
      settled = true;
    });

    const tick = (now: number) => {
      const elapsed = now - start;
      const timeProgress = Math.min(elapsed / MIN_DURATION, 1);
      // Creep to 90% on time alone; the last 10% needs the page to be loaded.
      const target = settled ? timeProgress : Math.min(timeProgress, 0.9);
      setCount(Math.round(target * 100));

      if (target >= 1) {
        finish();
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* nothing to do — the intro just replays next session */
      }
      window.setTimeout(() => {
        setVisible(false);
        onDone();
      }, 260);
    };

    frame = requestAnimationFrame(tick);

    // Hard ceiling: never trap the visitor behind the intro if `load` stalls
    // on a slow third-party asset.
    const bail = window.setTimeout(finish, 6000);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(bail);
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink-deep"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: EASE }}
          aria-hidden="true"
        >
          <motion.div
            className="flex flex-col items-center px-6"
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <img
              src="/logo/shaba-logo2.png"
              alt=""
              className="u-logo-white h-12 w-auto object-contain"
            />
            <span className="font-display mt-5 text-[clamp(38px,9vw,64px)] leading-none text-bone">
              Shabas
            </span>

            <div className="mt-8 h-px w-[min(280px,62vw)] bg-bone/15">
              <motion.div
                className="h-px bg-brand-bright"
                style={{ width: `${count}%` }}
              />
            </div>

            <span className="u-eyebrow mt-4 text-bone-faint tabular-nums">
              {String(count).padStart(3, "0")}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
