import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Search, Zap, Trophy, User, LayoutGrid, Store } from "lucide-react";
import { useLang } from "@/contexts/lang";
import { EASE, MaskLines, Reveal } from "@/components/motion/Reveal";
import AppScreen from "@/components/AppScreen";
import FormationPitch from "@/components/FormationPitch";
import MarketplaceBoard from "@/components/MarketplaceBoard";
import { SCREENSHOTS } from "@/lib/screenshots";
import showcasePhoto from "@/assets/photos/player-golden.webp";

/**
 * Icons live here rather than in the copy deck — they are presentation, not
 * translation, and the order matches `t.features.cards`.
 */
const CARD_ICONS = [Search, Zap, Trophy, User];

/** Screenshot shown beside each card, in the same order as `t.features.cards`. */
const CARD_SCREENS = ["explore", "challenge", "rankings", "profile"] as const;

type RowProps = {
  index: number;
  active: boolean;
  onActive: (i: number) => void;
  tag: string;
  title: string;
  desc: string;
};

const FeatureRow = ({
  index,
  active,
  onActive,
  tag,
  title,
  desc,
}: RowProps) => {
  const ref = useRef<HTMLDivElement>(null);
  // Fires when the row crosses the middle band of the viewport, which is what
  // drives the sticky screenshot beside it.
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  const Icon = CARD_ICONS[index];

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <motion.div
      ref={ref}
      className="border-t border-bone/10 py-9 md:py-12"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.65, ease: EASE }}
    >
      <div className="flex items-start gap-5 md:gap-7">
        <span
          className={`u-eyebrow shrink-0 pt-1.5 transition-colors duration-500 ${
            active ? "text-brand-bright" : "text-bone-faint"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="min-w-0 flex-1">
          <div className="mb-3 flex items-center gap-3">
            <Icon
              className={`h-[18px] w-[18px] shrink-0 transition-colors duration-500 ${
                active ? "text-brand-bright" : "text-bone-faint"
              }`}
              strokeWidth={1.75}
              aria-hidden="true"
            />
            <span className="u-eyebrow text-[10px] text-bone-faint">{tag}</span>
          </div>

          <h3
            className={`font-display text-[clamp(23px,3.4vw,38px)] leading-[1.1] transition-colors duration-500 ${
              active ? "text-bone" : "text-bone/45"
            }`}
          >
            {title}
          </h3>

          <p className="mt-3 max-w-[460px] text-[14px] leading-relaxed text-bone-dim md:text-[15px]">
            {desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const Features = () => {
  const { t, lang } = useLang();
  const [active, setActive] = useState(0);
  const screens = CARD_SCREENS.map((key) => SCREENSHOTS[key][lang]);
  const handleActive = useCallback((i: number) => setActive(i), []);

  return (
    // No bottom padding: this section ends on a full-bleed band, and padding
    // after it would read as a dead gap.
    <section id="features" className="relative bg-ink pt-20 md:pt-28">
      <div className="mx-auto max-w-[1340px] px-5 md:px-10">
        {/* Section header */}
        <Reveal>
          <span className="u-eyebrow text-brand-bright">
            {t.features.badge}
          </span>
        </Reveal>

        <MaskLines
          as="h2"
          lines={[
            t.features.headline,
            <span className="text-brand-bright">{t.features.accent}</span>,
          ]}
          className="font-display mt-5 max-w-[15ch] text-[clamp(32px,6vw,74px)] leading-[1.03] text-bone"
        />

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-[520px] text-[15px] leading-relaxed text-bone-dim md:text-[17px]">
            {t.features.sub}
          </p>
        </Reveal>

        {/* Mobile screenshot — the sticky column is desktop-only */}
        <Reveal delay={0.1} className="mt-12 md:hidden">
          <AppScreen src={screens[0]} className="mx-auto max-w-[280px]" />
        </Reveal>

        {/* Rows + sticky panel */}
        <div className="mt-8 grid gap-10 md:mt-16 md:grid-cols-[1fr_0.8fr] md:gap-20">
          <div>
            {t.features.cards.map((card, i) => (
              <FeatureRow
                key={card.title}
                index={i}
                active={active === i}
                onActive={handleActive}
                tag={card.tag}
                title={card.title}
                desc={card.desc}
              />
            ))}
          </div>

          <div className="hidden md:block">
            <div className="sticky top-[132px]">
              <div className="relative mx-auto max-w-[300px]">
                {screens.map((src, i) => (
                  <motion.div
                    key={i}
                    className={i === 0 ? "relative" : "absolute inset-0"}
                    animate={{ opacity: active === i ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    aria-hidden={active !== i}
                  >
                    <AppScreen src={src} />
                  </motion.div>
                ))}
              </div>

              <div className="mx-auto mt-6 flex max-w-[300px] gap-1.5">
                {screens.map((_, i) => (
                  <span
                    key={i}
                    className={`h-px flex-1 transition-colors duration-500 ${
                      active === i ? "bg-brand-bright" : "bg-bone/15"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live formation + marketplace */}
        {/* min-w-0 on both items: grid items default to min-width:auto, so a
            card would otherwise refuse to shrink below its content's minimum
            and push the page wider than the phone viewport. */}
        <div className="mt-20 grid gap-8 md:mt-28 md:grid-cols-2 md:gap-12">
          <Reveal className="min-w-0">
            <div className="flex h-full flex-col border border-bone/10 bg-ink-raised">
              <div className="flex items-center gap-3 border-b border-bone/10 px-6 py-4">
                {/* Still in development — muted so it doesn't read like the
                    green "New" on the live Marketplace card beside it. */}
                <LayoutGrid
                  className="h-4 w-4 text-bone-faint"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <span className="u-eyebrow text-[10px] text-bone-faint">
                  {t.features.liveFormation.badge}
                </span>
              </div>

              {/* An illustration, not a screenshot: the feature is still in
                  development. Capped at 463px wide on desktop, which makes it
                  300px tall — level with the marketplace card beside it. */}
              <div className="px-6 pt-6">
                <FormationPitch
                  label={t.features.liveFormation.illustration}
                  className="mx-auto md:max-w-[463px]"
                />
              </div>

              <div className="mt-auto px-6 pb-7 pt-6">
                <h3 className="font-display text-[26px] leading-tight text-bone">
                  {t.features.liveFormation.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-bone-dim">
                  {t.features.liveFormation.desc}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="min-w-0">
            <div className="flex h-full flex-col border border-bone/10 bg-ink-raised">
              <div className="flex items-center gap-3 border-b border-bone/10 px-6 py-4">
                <Store
                  className="h-4 w-4 text-brand-bright"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <span className="u-eyebrow text-[10px] text-brand-bright">
                  {t.features.marketplace.badge}
                </span>
              </div>

              {/* An illustration rather than a screenshot: the live board
                  shows whatever is for sale that day, which may be one item. */}
              <div className="px-6 pt-6">
                <MarketplaceBoard
                  categories={t.features.marketplace.categories}
                  listings={t.features.marketplace.listings}
                  location={t.features.marketplace.location}
                />
              </div>

              <div className="mt-auto px-6 pb-7 pt-6">
                <h3 className="font-display text-[26px] leading-tight text-bone">
                  {t.features.marketplace.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-bone-dim">
                  {t.features.marketplace.desc}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Talent showcase — full-bleed band */}
      <div className="relative mt-20 overflow-hidden md:mt-28">
        <div className="relative min-h-[420px] md:min-h-[520px]">
          <img
            src={showcasePhoto}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="u-photo-wash absolute inset-0" />
          <div className="u-grid-lines absolute inset-0 opacity-50" />

          <div className="relative mx-auto flex min-h-[420px] max-w-[1340px] flex-col justify-center px-5 py-16 md:min-h-[520px] md:px-10">
            <Reveal>
              <span className="u-eyebrow text-brand-bright">
                {t.features.showcaseBadge}
              </span>
            </Reveal>

            <MaskLines
              as="h3"
              lines={[t.features.showcaseTitle]}
              className="font-display mt-4 text-[clamp(38px,8vw,92px)] leading-[1.02] text-bone"
            />

            <Reveal delay={0.1}>
              <p className="mt-5 max-w-[520px] text-[15px] leading-relaxed text-bone-dim md:text-[17px]">
                {t.features.showcaseDesc}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
