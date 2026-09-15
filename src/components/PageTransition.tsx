import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/components/motion/Reveal";

/**
 * Per-route wrapper. Paired with the <AnimatePresence mode="wait"> in App, the
 * outgoing page finishes leaving before the next one arrives.
 */
const PageTransition = ({ children }: { children: ReactNode }) => {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduced ? 0 : -14 }}
      transition={{ duration: reduced ? 0.15 : 0.45, ease: EASE }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
