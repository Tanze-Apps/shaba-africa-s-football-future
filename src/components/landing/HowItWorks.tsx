import { motion } from "framer-motion";
import { useLang } from "@/contexts/lang";
import { EASE, MaskLines, Reveal } from "@/components/motion/Reveal";

const HowItWorks = () => {
  const { t } = useLang();

  return (
    <section
      id="how"
      className="relative border-t border-bone/10 bg-ink-raised py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1340px] px-5 md:px-10">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
          {/* Sticky header — stays put while the steps scroll past */}
          <div>
            <div className="md:sticky md:top-[132px]">
              <Reveal>
                <span className="u-eyebrow text-brand-bright">
                  {t.how.badge}
                </span>
              </Reveal>

              <MaskLines
                as="h2"
                lines={[
                  t.how.headline,
                  <span className="text-brand-bright">{t.how.accent}</span>,
                ]}
                className="font-display mt-5 text-[clamp(32px,5.6vw,68px)] leading-[1.03] text-bone"
              />

              <Reveal delay={0.1}>
                <p className="mt-6 max-w-[380px] text-[15px] leading-relaxed text-bone-dim md:text-[17px]">
                  {t.how.sub}
                </p>
              </Reveal>
            </div>
          </div>

          <ol className="border-t border-bone/10">
            {t.how.steps.map((step, i) => (
              <motion.li
                key={step.title}
                className="group border-b border-bone/10 py-8 md:py-10"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}
              >
                <div className="flex items-baseline gap-5 md:gap-8">
                  <span className="font-display shrink-0 text-[clamp(30px,5vw,54px)] leading-none text-bone/15 transition-colors duration-300 group-hover:text-brand-bright">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-[clamp(21px,3vw,32px)] leading-tight text-bone">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 max-w-[440px] text-[14px] leading-relaxed text-bone-dim md:text-[15px]">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
