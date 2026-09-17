import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Flame, Zap, Star } from "lucide-react";
import { useLang } from "@/contexts/lang";
import { EASE, MaskLines, Reveal } from "@/components/motion/Reveal";
import AppScreen from "@/components/AppScreen";
import { SCREENSHOTS } from "@/lib/screenshots";

const CARD_ICONS = [Flame, Zap, Star];

const Gamification = () => {
  const { t, lang } = useLang();
  const barRef = useRef<HTMLDivElement>(null);
  // The XP bar only fills once, when the panel is actually looked at.
  const barInView = useInView(barRef, { once: true, margin: "0px 0px -20% 0px" });

  return (
    <section className="relative border-t border-bone/10 bg-ink py-20 md:py-28">
      <div className="mx-auto max-w-[1340px] px-5 md:px-10">
        <Reveal>
          <span className="u-eyebrow text-brand-bright">{t.gam.badge}</span>
        </Reveal>

        <MaskLines
          as="h2"
          lines={[
            t.gam.headline,
            <span className="text-brand-bright">{t.gam.accent}</span>,
          ]}
          className="font-display mt-5 max-w-[16ch] text-[clamp(32px,6vw,74px)] leading-[1.03] text-bone"
        />

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-[520px] text-[15px] leading-relaxed text-bone-dim md:text-[17px]">
            {t.gam.sub}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          {/* Progress panel */}
          <Reveal>
            <div ref={barRef} className="border border-bone/10 bg-ink-raised">
              <div className="flex items-center justify-between border-b border-bone/10 px-6 py-4">
                <span className="u-eyebrow text-[10px] text-bone-faint">
                  {t.gam.xpLevel}
                </span>
                <span className="u-eyebrow text-[10px] text-brand-bright">
                  {t.gam.xpNext}
                </span>
              </div>

              <div className="px-6 py-7">
                <div className="h-[3px] w-full bg-bone/10">
                  <motion.div
                    className="h-[3px] bg-brand-bright"
                    initial={{ width: "0%" }}
                    animate={barInView ? { width: "78%" } : { width: "0%" }}
                    transition={{ duration: 1.5, delay: 0.2, ease: EASE }}
                  />
                </div>

                <div className="mt-7 flex items-center gap-3 border-t border-bone/10 pt-6">
                  <Star
                    className="h-4 w-4 text-brand-bright"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <span className="text-[13px] text-bone-dim">
                    {t.gam.repLabel}
                  </span>
                </div>
              </div>

              <div className="border-t border-bone/10 p-6">
                <AppScreen src={SCREENSHOTS.progression[lang]} className="mx-auto max-w-[240px]" />
              </div>
            </div>
          </Reveal>

          {/* Cards */}
          <div className="border-t border-bone/10">
            {t.gam.cards.map((card, i) => {
              const Icon = CARD_ICONS[i];
              return (
                <motion.div
                  key={card.title}
                  className="border-b border-bone/10 py-8 md:py-9"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                  transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
                >
                  <div className="flex items-start gap-5">
                    <Icon
                      className="mt-1 h-5 w-5 shrink-0 text-brand-bright"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    <div className="min-w-0">
                      <h3 className="font-display text-[clamp(21px,3vw,30px)] leading-tight text-bone">
                        {card.title}
                      </h3>
                      <p className="mt-2.5 max-w-[440px] text-[14px] leading-relaxed text-bone-dim md:text-[15px]">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gamification;
