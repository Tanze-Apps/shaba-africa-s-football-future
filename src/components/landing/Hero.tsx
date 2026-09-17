import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useLang } from "@/contexts/lang";
import { useReady } from "@/contexts/ready";
import { EASE, MaskLines } from "@/components/motion/Reveal";
import heroPhoto from "@/assets/photos/hero-pitch.webp";

const Hero = () => {
  const { t } = useLang();
  const ready = useReady();
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // The photograph drifts slower than the page, and the copy lifts away.
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Entrance waits for the loader to clear so it plays into the wipe.
  const show = ready;

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink-deep"
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0"
        style={reduced ? undefined : { y: photoY, scale: photoScale }}
      >
        <img
          src={heroPhoto}
          alt=""
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
      </motion.div>

      <div className="u-photo-wash absolute inset-0" />
      <div className="u-grid-lines absolute inset-0" />

      {/* Content */}
      <motion.div
        className="relative mx-auto flex w-full max-w-[1340px] flex-1 flex-col items-center justify-center px-5 pb-12 pt-[100px] text-center md:px-10 md:pb-10 md:pt-[120px]"
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <motion.span
          className="u-eyebrow text-bone/70"
          initial={{ opacity: 0, y: 14 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.04, ease: EASE }}
        >
          {t.hero.eyebrow}
        </motion.span>

        <MaskLines
          as="h1"
          trigger="mount"
          lines={
            show
              ? [
                  <>
                    {t.hero.h1} {t.hero.h1a}
                  </>,
                  <>
                    {t.hero.h2} {t.hero.h2a}
                  </>,
                  <>
                    {t.hero.h3}{" "}
                    <span className="text-brand-bright">{t.hero.h3g}</span>
                  </>,
                ]
              : []
          }
          className="font-display mt-5 text-[clamp(40px,8.4vw,116px)] leading-[1.05] text-bone"
          delay={0.12}
          stagger={0.08}
        />

        <motion.p
          className="mt-7 max-w-[560px] text-[15px] leading-relaxed text-bone-dim md:text-[17px]"
          initial={{ opacity: 0, y: 18 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.34, ease: EASE }}
        >
          {t.hero.sub}
        </motion.p>

        <motion.div
          className="mt-9 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row"
          initial={{ opacity: 0, y: 18 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.44, ease: EASE }}
        >
          <a
            href="https://play.google.com/store/apps/details?id=com.shabas.app"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-brand px-9 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] text-white transition-colors duration-200 hover:bg-brand-bright sm:w-auto"
          >
            {t.hero.ctaPrimary}
          </a>

          <a
            href="https://app.sha-bas.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-full items-center justify-center gap-3 border border-bone/25 px-9 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] text-bone transition-colors duration-200 hover:border-bone/60 sm:w-auto"
          >
            {t.hero.ctaWeb}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </motion.div>

        <motion.p
          className="mt-6 text-[12px] text-bone-faint"
          initial={{ opacity: 0 }}
          animate={show ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.56 }}
        >
          {t.hero.iphoneNotice}
        </motion.p>
      </motion.div>

      {/* Hairline proof strip along the bottom of the hero */}
      <motion.div
        className="relative border-t border-bone/10 bg-ink-deep/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={show ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.64 }}
      >
        <div className="mx-auto grid max-w-[1340px] grid-cols-2 md:grid-cols-4">
          {t.hero.proof.map((p, i) => (
            <div
              key={p.label}
              className={`px-5 py-4 text-center md:px-10 md:py-5 ${
                i > 0 ? "border-l border-bone/10" : ""
              } ${i === 2 ? "border-l-0 md:border-l" : ""} ${
                i > 1 ? "border-t border-bone/10 md:border-t-0" : ""
              }`}
            >
              <span className="font-display block text-[19px] leading-none text-bone md:text-[24px]">
                {p.strong}
              </span>
              <span className="u-eyebrow mt-1.5 block text-[10px] text-bone-faint">
                {p.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll hint — outer element owns the scroll-linked fade, inner the
          entrance, so the two never fight over `opacity`. */}
      <motion.div
        className="pointer-events-none absolute bottom-[112px] left-10 hidden md:block"
        style={reduced ? undefined : { opacity: contentOpacity }}
      >
        <motion.div
          className="flex flex-col items-start gap-2"
          initial={{ opacity: 0 }}
          animate={show ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.74 }}
        >
          <span className="u-eyebrow text-[10px] text-bone-faint">
            {t.hero.scroll}
          </span>
          <span className="block h-8 w-px bg-bone/20">
            <span className="block h-3 w-px animate-scroll-hint bg-brand-bright" />
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
