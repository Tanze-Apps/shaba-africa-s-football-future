import { motion } from "framer-motion";
import { useLang } from "@/contexts/lang";
import { EASE, MaskLines, Reveal } from "@/components/motion/Reveal";
import AppScreen from "@/components/AppScreen";
import { SCREENSHOTS } from "@/lib/screenshots";
import stadiumPhoto from "@/assets/photos/stadium.webp";

const Tournaments = () => {
  const { t, lang } = useLang();

  return (
    <section id="tournaments" className="relative overflow-hidden bg-ink-deep">
      <img
        src={stadiumPhoto}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="u-photo-wash absolute inset-0" />
      <div className="u-grid-lines absolute inset-0 opacity-50" />

      <div className="relative mx-auto max-w-[1340px] px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-12 md:grid-cols-[1fr_260px] md:items-center md:gap-16">
          <div>
            <Reveal>
              <span className="u-eyebrow border border-brand-bright/40 px-3 py-1.5 text-brand-bright">
                {t.tournament.badge}
              </span>
            </Reveal>

            <MaskLines
              as="h2"
              lines={[
                t.tournament.headline,
                <span className="text-brand-bright">
                  {t.tournament.accent}
                </span>,
              ]}
              className="font-display mt-6 max-w-[14ch] text-[clamp(32px,6.4vw,80px)] leading-[1.02] text-bone"
            />

            <Reveal delay={0.1}>
              <p className="mt-6 max-w-[520px] text-[15px] leading-relaxed text-bone-dim md:text-[17px]">
                {t.tournament.sub}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <AppScreen
              src={SCREENSHOTS.tournaments[lang]}
              className="mx-auto max-w-[240px] md:max-w-none"
            />
          </Reveal>
        </div>

        {/* Bracket stages */}
        <Reveal delay={0.15}>
          <div className="mt-14 grid grid-cols-2 border-l border-t border-bone/15 md:mt-16 md:grid-cols-4">
            {t.tournament.stages.map((stage, i) => (
              <div
                key={stage}
                className="border-b border-r border-bone/15 px-5 py-6 md:px-6 md:py-8"
              >
                <span className="u-eyebrow block text-[9px] text-bone-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display mt-2 block text-[clamp(17px,2.4vw,26px)] leading-tight text-bone">
                  {stage}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Bullets */}
        <div className="mt-14 grid gap-8 md:mt-16 md:grid-cols-3 md:gap-12">
          {t.tournament.bullets.map((b, i) => (
            <motion.div
              key={b.title}
              className="border-t border-bone/15 pt-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -12% 0px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
            >
              <h3 className="font-display text-[clamp(19px,2.6vw,26px)] leading-tight text-bone">
                {b.title}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-bone-dim md:text-[15px]">
                {b.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tournaments;
