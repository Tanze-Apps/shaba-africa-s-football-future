import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLang } from "@/contexts/lang";
import { EASE, Reveal } from "@/components/motion/Reveal";
import { useSiteNav } from "@/lib/nav";

/**
 * The home page's index of the rest of the site.
 *
 * Each row reuses the destination section's own heading and standfirst, so
 * there is no second version of the copy to keep in step.
 */
const PageIndex = () => {
  const { t } = useLang();
  const nav = useSiteNav();

  return (
    <section className="relative border-t border-bone/10 bg-ink py-20 md:py-28">
      <div className="mx-auto max-w-[1340px] px-5 md:px-10">
        {/* A small heading, not a display one: the rows below are the
            headline here, and a big title would repeat the Features page's
            own H2 word for word. */}
        <Reveal>
          <h2 className="u-eyebrow text-brand-bright">{t.nav.navigation}</h2>
        </Reveal>

        <div className="mt-10 border-t border-bone/10 md:mt-12">
          {nav.map((item, i) => (
            <motion.div
              key={item.to}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}
            >
              <Link
                to={item.to}
                className="group flex items-baseline gap-5 border-b border-bone/10 py-7 transition-colors duration-200 hover:bg-bone/[0.02] md:gap-8 md:py-9"
              >
                <span className="u-eyebrow w-7 shrink-0 text-bone-faint transition-colors duration-200 group-hover:text-brand-bright">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="font-display block text-[clamp(24px,4vw,44px)] leading-[1.05] text-bone transition-colors duration-200 group-hover:text-brand-bright">
                    {item.label}
                  </span>
                  <span className="mt-2 block max-w-[560px] text-[14px] leading-relaxed text-bone-dim md:text-[15px]">
                    {item.blurb}
                  </span>
                </span>

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  className="hidden h-6 w-6 shrink-0 self-center text-bone-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand-bright sm:block"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PageIndex;
