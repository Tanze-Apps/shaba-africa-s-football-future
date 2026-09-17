import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useLang } from "@/contexts/lang";
import { MaskLines, Reveal } from "@/components/motion/Reveal";
import { SCREENSHOTS } from "@/lib/screenshots";

const WEB_APP = "https://app.sha-bas.com";

/**
 * The desktop web app, shown as a wide screenshot. It sits after Features:
 * having seen the app on a phone, the visitor sees it's a real desktop app
 * too — which matters because iPhone users are sent to the web app.
 */
const WebApp = () => {
  const { t, lang } = useLang();
  const reduced = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);

  // The frame settles to full size as it scrolls up into view.
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "center center"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);

  return (
    <section className="relative overflow-hidden border-t border-bone/10 bg-ink-raised py-20 md:py-28">
      <div className="u-grid-lines absolute inset-0 opacity-40" />

      <div className="relative mx-auto max-w-[1340px] px-5 md:px-10">
        <div className="grid gap-8 md:grid-cols-2 md:items-end md:gap-16">
          <div>
            <Reveal>
              <span className="u-eyebrow text-brand-bright">
                {t.webapp.badge}
              </span>
            </Reveal>

            <MaskLines
              as="h2"
              lines={[
                t.webapp.headline,
                <span className="text-brand-bright">{t.webapp.accent}</span>,
              ]}
              className="font-display mt-5 text-[clamp(32px,6vw,74px)] leading-[1.03] text-bone"
            />
          </div>

          <Reveal delay={0.1}>
            <p className="max-w-[460px] text-[15px] leading-relaxed text-bone-dim md:text-[17px]">
              {t.webapp.sub}
            </p>

            <a
              href={WEB_APP}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-7 inline-flex items-center gap-3 bg-brand px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] text-white transition-colors duration-200 hover:bg-brand-bright"
            >
              {t.webapp.cta}
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
          </Reveal>
        </div>

        <motion.div
          ref={frameRef}
          className="mt-14 origin-top md:mt-20"
          style={reduced ? undefined : { scale, y }}
        >
          <div className="overflow-hidden border border-bone/15 bg-ink-deep">
            {/* A hairline address strip hints at a browser without drawing
                one — the site never uses skeuomorphic chrome. */}
            <div className="flex items-center gap-3 border-b border-bone/10 px-4 py-2.5">
              <span className="h-1.5 w-1.5 bg-brand-bright" />
              <span className="u-eyebrow text-[9px] text-bone-faint">
                app.sha-bas.com
              </span>
            </div>

            {/* On phones the full desktop view would be unreadably small, so
                it takes a portrait crop centred on the team list. */}
            <img
              src={SCREENSHOTS.exploreDesktop[lang]}
              alt={t.webapp.alt}
              loading="lazy"
              className="block aspect-[3/4] w-full object-cover object-[34%_top] md:aspect-[16/10] md:object-top"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WebApp;
