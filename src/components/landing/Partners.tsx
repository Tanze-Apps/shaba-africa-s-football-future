import { motion } from "framer-motion";
import { Store, UserCheck } from "lucide-react";
import { useLang } from "@/contexts/lang";
import { EASE, MaskLines, Reveal } from "@/components/motion/Reveal";

const EMAIL = "shabasfootball@gmail.com";
const PHONE = "+237673015993";
const PHONE_DISPLAY = "+237 673 015 993";

/** One icon per card, in the order they appear in the copy deck. */
const CARD_ICONS = [Store, UserCheck];

/**
 * Partnerships. Selling on the Marketplace and refereeing are both opened by
 * hand after a conversation — there is no self-serve sign-up — so each card
 * ends in an email rather than a form.
 */
const Partners = () => {
  const { t } = useLang();

  return (
    <section
      id="partners"
      className="relative overflow-hidden border-t border-bone/10 bg-ink py-20 md:py-28"
    >
      <div className="u-grid-lines absolute inset-0 opacity-40" />

      <div className="relative mx-auto max-w-[1340px] px-5 md:px-10">
        <div className="grid gap-8 md:grid-cols-2 md:items-end md:gap-16">
          <div>
            <Reveal>
              <span className="u-eyebrow text-brand-bright">
                {t.partners.badge}
              </span>
            </Reveal>

            <MaskLines
              as="h2"
              lines={[
                t.partners.headline,
                <span className="text-brand-bright">{t.partners.accent}</span>,
              ]}
              className="font-display mt-5 text-[clamp(32px,6vw,74px)] leading-[1.03] text-bone"
            />
          </div>

          <Reveal delay={0.1}>
            <p className="max-w-[460px] text-[15px] leading-relaxed text-bone-dim md:text-[17px]">
              {t.partners.sub}
            </p>
          </Reveal>
        </div>

        {/* min-w-0 so a card can never push the page wider than the viewport */}
        <div className="mt-14 grid gap-8 md:mt-20 md:grid-cols-2 md:gap-12">
          {t.partners.cards.map((card, i) => {
            const Icon = CARD_ICONS[i];
            return (
              <motion.div
                key={card.title}
                className="flex min-w-0 flex-col border border-bone/10 bg-ink-raised"
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                transition={{ duration: 0.65, delay: i * 0.08, ease: EASE }}
              >
                <div className="flex items-center gap-3 border-b border-bone/10 px-6 py-4">
                  <Icon
                    className="h-4 w-4 text-brand-bright"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <span className="u-eyebrow text-[10px] text-brand-bright">
                    {card.tag}
                  </span>
                </div>

                <div className="flex flex-1 flex-col px-6 pb-7 pt-6">
                  <h3 className="font-display text-[clamp(22px,3vw,30px)] leading-tight text-bone">
                    {card.title}
                  </h3>

                  <p className="mt-3 text-[14px] leading-relaxed text-bone-dim md:text-[15px]">
                    {card.desc}
                  </p>

                  <ul className="mt-6 border-t border-bone/10">
                    {card.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-3 border-b border-bone/10 py-3"
                      >
                        <span
                          className="mt-[7px] h-1 w-1 shrink-0 bg-brand-bright"
                          aria-hidden="true"
                        />
                        <span className="text-[13px] leading-relaxed text-bone-dim">
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-7">
                    <a
                      href={`mailto:${EMAIL}?subject=${encodeURIComponent(
                        `Shabas — ${card.subject}`,
                      )}`}
                      className="group flex items-center justify-between gap-3 border border-bone/20 px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-bone transition-colors duration-200 hover:border-brand-bright hover:text-brand-bright"
                    >
                      {card.cta}
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                      >
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col gap-3 border-t border-bone/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[560px] text-[13px] leading-relaxed text-bone-faint">
              {t.partners.note}
            </p>

            <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px]">
              <span className="text-bone-faint">{t.partners.contact}</span>
              <a
                href={`mailto:${EMAIL}`}
                className="text-bone transition-colors duration-200 hover:text-brand-bright"
              >
                {EMAIL}
              </a>
              <a
                href={`tel:${PHONE}`}
                className="text-bone transition-colors duration-200 hover:text-brand-bright"
              >
                {PHONE_DISPLAY}
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Partners;
