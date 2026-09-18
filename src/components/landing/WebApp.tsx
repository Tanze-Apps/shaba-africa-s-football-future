import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useLang } from "@/contexts/lang";
import { EASE, MaskLines, Reveal } from "@/components/motion/Reveal";
import { SCREENSHOTS } from "@/lib/screenshots";

const WEB_APP = "https://app.sha-bas.com";

/** Screens in the same order as `t.webapp.tabs`. */
const SCREENS = [
  "exploreDesktop",
  "homeDesktop",
  "rankingsDesktop",
  "tournamentsDesktop",
  "profileDesktop",
] as const;

/** How long each screen shows before the tour advances on its own. */
const INTERVAL = 5000;

/**
 * The desktop web app, as a short tour of real screens. It sits after
 * Features: having seen the app on a phone, the visitor sees it's a real
 * desktop app too — which matters because iPhone users are sent to the web
 * app.
 */
const WebApp = () => {
  const { t, lang } = useLang();
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const tablistRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(0);
  // The tour stops for good once someone picks a tab — moving it out from
  // under them would be hostile.
  const [autoplay, setAutoplay] = useState(true);
  const inView = useInView(sectionRef, { margin: "-20% 0px -20% 0px" });
  const playing = autoplay && inView && !reduced;

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(
      () => setActive((i) => (i + 1) % SCREENS.length),
      INTERVAL,
    );
    return () => window.clearTimeout(id);
  }, [active, playing]);

  // On narrow screens the tabs overflow; keep the active one centred in the
  // row so the tour never advances to a tab the visitor can't see. Scrolls the
  // row only — scrollIntoView would also move the page.
  useEffect(() => {
    const row = tablistRef.current;
    const tab = row?.children[active] as HTMLElement | undefined;
    if (!row || !tab || row.scrollWidth <= row.clientWidth) return;
    row.scrollTo({
      left: tab.offsetLeft - (row.clientWidth - tab.offsetWidth) / 2,
      behavior: reduced ? "auto" : "smooth",
    });
  }, [active, reduced]);

  // The frame settles to full size as it scrolls up into view.
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "center center"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);

  const choose = (i: number) => {
    setAutoplay(false);
    setActive(i);
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-bone/10 bg-ink-raised py-20 md:py-28"
    >
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
          {/* Screen tabs */}
          <div
            ref={tablistRef}
            role="tablist"
            aria-label={t.webapp.alt}
            className="relative flex overflow-x-auto border-x border-t border-bone/15 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {t.webapp.tabs.map((label, i) => (
              <button
                key={label}
                role="tab"
                id={`webapp-tab-${i}`}
                aria-selected={active === i}
                aria-controls="webapp-panel"
                onClick={() => choose(i)}
                className={`relative flex-1 whitespace-nowrap px-4 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors duration-200 md:py-4 ${
                  active === i
                    ? "bg-ink-deep text-bone"
                    : "text-bone-faint hover:text-bone"
                } ${i > 0 ? "border-l border-bone/10" : ""}`}
              >
                {label}

                {/* Active marker; while the tour runs it fills to show when
                    the next screen is coming. */}
                {active === i && (
                  <span className="absolute inset-x-0 bottom-0 h-[2px] bg-bone/10">
                    <motion.span
                      key={`${active}-${playing}`}
                      className="block h-full bg-brand-bright"
                      initial={{ width: playing ? "0%" : "100%" }}
                      animate={{ width: "100%" }}
                      transition={{
                        duration: playing ? INTERVAL / 1000 : 0,
                        ease: "linear",
                      }}
                    />
                  </span>
                )}
              </button>
            ))}
          </div>

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
                it takes a portrait crop that skips the sidebar and shows the
                main column. */}
            <div
              id="webapp-panel"
              role="tabpanel"
              aria-labelledby={`webapp-tab-${active}`}
              className="relative aspect-[3/4] md:aspect-[16/10]"
            >
              {SCREENS.map((key, i) => (
                <motion.img
                  key={key}
                  src={SCREENSHOTS[key][lang]}
                  alt={
                    active === i ? `${t.webapp.alt} — ${t.webapp.tabs[i]}` : ""
                  }
                  aria-hidden={active !== i}
                  loading="lazy"
                  className="absolute inset-0 block h-full w-full object-cover object-[34%_top] md:object-top"
                  initial={false}
                  animate={{ opacity: active === i ? 1 : 0 }}
                  transition={{ duration: reduced ? 0 : 0.6, ease: EASE }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WebApp;
