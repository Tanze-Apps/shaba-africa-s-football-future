import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Megaphone, Swords, BarChart3 } from "lucide-react";
import { useLang } from "@/contexts/lang";
import { EASE, MaskLines, Reveal } from "@/components/motion/Reveal";
import communityPhoto from "@/assets/photos/community-fans.webp";

const FEATURE_ICONS = [Megaphone, Swords, BarChart3];

const LaRue = () => {
  const { t } = useLang();
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  // Gentle counter-scroll so the photograph feels set back from the page.
  const photoY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      id="la-rue"
      ref={sectionRef}
      className="relative overflow-hidden bg-ink-deep"
    >
      <motion.div
        className="absolute inset-0 h-[116%] -top-[8%]"
        style={reduced ? undefined : { y: photoY }}
      >
        <img
          src={communityPhoto}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </motion.div>

      <div className="u-photo-wash absolute inset-0" />
      <div className="u-grid-lines absolute inset-0 opacity-50" />

      <div className="relative mx-auto max-w-[1340px] px-5 py-20 md:px-10 md:py-28">
        <Reveal>
          <span className="u-eyebrow text-brand-bright">{t.laRue.badge}</span>
        </Reveal>

        <MaskLines
          as="h2"
          lines={[
            <>
              {t.laRue.headline}{" "}
              <span className="text-brand-bright">{t.laRue.accentH}</span>
            </>,
            t.laRue.line2,
            t.laRue.line3,
          ]}
          className="font-display mt-5 text-[clamp(36px,7.4vw,96px)] leading-[1.03] text-bone"
        />

        <Reveal delay={0.12}>
          <p className="mt-7 max-w-[540px] text-[15px] leading-relaxed text-bone-dim md:text-[17px]">
            {t.laRue.sub}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 md:mt-20 md:grid-cols-3 md:gap-12">
          {t.laRue.features.map((f, i) => {
            const Icon = FEATURE_ICONS[i];
            return (
              <motion.div
                key={f.title}
                className="border-t border-bone/20 pt-6"
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                transition={{ duration: 0.65, delay: i * 0.08, ease: EASE }}
              >
                <Icon
                  className="h-5 w-5 text-brand-bright"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <h3 className="font-display mt-4 text-[clamp(19px,2.6vw,27px)] leading-tight text-bone">
                  {f.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-bone-dim md:text-[15px]">
                  {f.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LaRue;
