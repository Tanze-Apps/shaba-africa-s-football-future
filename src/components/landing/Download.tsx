import { useLang } from "@/contexts/lang";
import { MaskLines, Reveal } from "@/components/motion/Reveal";
import ctaPhoto from "@/assets/photos/celebration.webp";

const PLAY_STORE =
  "https://play.google.com/store/apps/details?id=com.shabas.app";
const WEB_APP = "https://app.sha-bas.com";

const Download = () => {
  const { t } = useLang();
  const d = t.download;

  return (
    <section id="download" className="relative overflow-hidden bg-ink-deep">
      <img
        src={ctaPhoto}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="u-photo-wash absolute inset-0" />
      {/* This photograph is busier and brighter than the others, so it takes
          an extra knock-down to keep the headline clean. */}
      <div className="absolute inset-0 bg-ink-deep/35" />
      <div className="u-grid-lines absolute inset-0 opacity-50" />

      <div className="relative mx-auto max-w-[1340px] px-5 py-24 text-center md:px-10 md:py-32">
        <MaskLines
          as="h2"
          lines={[d.headline, <span className="text-brand-bright">{d.accent}</span>]}
          className="font-display mx-auto text-[clamp(36px,7vw,88px)] leading-[1.03] text-bone"
        />

        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-[460px] text-[15px] leading-relaxed text-bone-dim md:text-[17px]">
            {d.sub}
          </p>
        </Reveal>

        {/* Store buttons */}
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={PLAY_STORE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-3 bg-bone px-7 py-4 text-ink-deep transition-colors duration-200 hover:bg-brand-bright hover:text-white sm:w-auto"
            >
              <img
                src="/icons/playstore.png"
                alt=""
                className="h-6 w-6 object-contain"
              />
              <span className="text-left">
                <span className="u-eyebrow block text-[9px] opacity-60">
                  {d.subApp}
                </span>
                <span className="font-display block text-[17px] leading-tight">
                  {d.googlePlay}
                </span>
              </span>
            </a>

            {/* App Store is not live yet, so this is deliberately inert */}
            <div
              className="inline-flex w-full cursor-not-allowed select-none items-center justify-center gap-3 border border-bone/15 px-7 py-4 text-bone/40 sm:w-auto"
              aria-disabled="true"
            >
              <img
                src="/icons/appstore.png"
                alt=""
                className="h-6 w-6 object-contain opacity-40"
              />
              <span className="text-left">
                <span className="u-eyebrow block text-[9px] opacity-70">
                  {d.subAppSoon}
                </span>
                <span className="font-display block text-[17px] leading-tight">
                  {d.appStore}
                </span>
              </span>
            </div>
          </div>
        </Reveal>

        {/* Web app */}
        <Reveal delay={0.2}>
          <div className="mt-10 border-t border-bone/10 pt-8">
            <a
              href={WEB_APP}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.16em] text-bone transition-colors duration-200 hover:text-brand-bright"
            >
              {d.webCta}
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

            <p className="mt-3 text-[12px] text-bone-faint">{d.webSub}</p>
            <p className="mt-1 text-[12px] text-bone-faint">{d.iphoneNote}</p>
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <p className="u-eyebrow mt-10 text-[9px] text-bone-faint">{d.trust}</p>
        </Reveal>
      </div>
    </section>
  );
};

export default Download;
