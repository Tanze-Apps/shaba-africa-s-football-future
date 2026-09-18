import { useEffect, useState } from "react";
<<<<<<< HEAD
import { Link, useLocation } from "react-router-dom";
=======
>>>>>>> main
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLang } from "@/contexts/lang";
import { EASE } from "@/components/motion/Reveal";
import SocialRow from "@/components/SocialRow";
<<<<<<< HEAD
import { ROUTES, useMenuNav } from "@/lib/nav";
=======
>>>>>>> main
import menuPhoto from "@/assets/photos/player-golden.webp";

const LangToggle = () => {
  const { lang, setLang } = useLang();

  return (
    <div className="flex items-center border border-bone/15">
      {(["fr", "en"] as const).map((code) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors duration-200 ${
            lang === code
              ? "bg-bone text-ink-deep"
              : "text-bone/55 hover:text-bone"
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  );
};

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLang();
  const reduced = useReducedMotion();
<<<<<<< HEAD
  const { pathname } = useLocation();
  const navLinks = useMenuNav();

  // Header goes solid once the hero starts scrolling away.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hold the page still behind the overlay, and let Escape dismiss it.
  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);
=======

  const navLinks = [
    { href: "#features", label: t.nav.features },
    { href: "#how", label: t.nav.howItWorks },
    { href: "#tournaments", label: t.nav.tournaments },
    { href: "#la-rue", label: t.nav.laRue },
    { href: "#partners", label: t.nav.partners },
    { href: "#download", label: t.nav.download },
  ];
>>>>>>> main

  // Header goes solid once the hero starts scrolling away.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hold the page still behind the overlay, and let Escape dismiss it.
  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 h-[72px] transition-colors duration-300 md:h-[88px] ${
          scrolled && !open
            ? "border-b border-bone/10 bg-ink/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-full max-w-[1340px] items-center justify-between px-5 md:px-10">
          {/* Left — menu trigger */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="group z-10 flex items-center gap-3 text-bone"
            aria-expanded={open}
            aria-label={open ? t.nav.close : t.nav.menu}
          >
            <span className="flex h-4 w-6 flex-col justify-center gap-[5px]">
              <motion.span
                className="block h-[2px] w-full origin-center bg-current"
                animate={open ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
              />
              <motion.span
                className="block h-[2px] w-full origin-center bg-current"
                animate={open ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
              />
            </span>
            <span className="u-eyebrow hidden sm:inline">
              {open ? t.nav.close : t.nav.menu}
            </span>
          </button>

          {/* Centre — crest */}
<<<<<<< HEAD
          <Link
            to={ROUTES.home}
=======
          <a
            href="#hero"
>>>>>>> main
            className="absolute left-1/2 z-10 flex -translate-x-1/2 items-center gap-2.5"
            aria-label="Shabas"
          >
            {/* The brand PNGs are dark green, which disappears against the
                hero photography — filtered to white for the dark header. */}
            <img
              src="/logo/shaba-logo2.png"
              alt=""
              className="u-logo-white h-7 w-auto object-contain md:h-8"
            />
            <span className="font-display text-[19px] leading-none text-bone md:text-[22px]">
              Shabas
            </span>
<<<<<<< HEAD
          </Link>
=======
          </a>
>>>>>>> main

          {/* Right — language + socials */}
          <div className="z-10 flex items-center gap-5">
            <LangToggle />
            <SocialRow className="hidden md:flex" />
          </div>
        </div>
      </header>

      {/* Full-screen overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            className="fixed inset-0 z-40 bg-ink-deep"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <div className="u-grid-lines absolute inset-0 opacity-60" />

            <div className="relative mx-auto flex h-full max-w-[1340px] flex-col justify-center px-5 pt-[72px] md:px-10 md:pt-[88px]">
              <div className="grid items-center gap-12 md:grid-cols-[1.3fr_1fr]">
                <nav>
                  <span className="u-eyebrow mb-8 block text-bone-faint">
                    {t.nav.navigation}
                  </span>

                  <ul>
                    {navLinks.map((l, i) => (
                      <motion.li
<<<<<<< HEAD
                        key={l.to}
=======
                        key={l.href}
>>>>>>> main
                        initial={{ opacity: 0, y: reduced ? 0 : 26 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.08 + i * 0.06,
                          ease: EASE,
                        }}
                        className="border-b border-bone/10"
                      >
<<<<<<< HEAD
                        <Link
                          to={l.to}
                          onClick={() => setOpen(false)}
                          aria-current={pathname === l.to ? "page" : undefined}
                          className="group flex items-baseline gap-4 py-3 md:py-4"
                        >
                          <span
                            className={`u-eyebrow w-7 shrink-0 transition-colors group-hover:text-brand-bright ${
                              pathname === l.to
                                ? "text-brand-bright"
                                : "text-bone-faint"
                            }`}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={`font-display text-[clamp(30px,6.5vw,60px)] leading-[1.05] transition-colors duration-200 group-hover:text-brand-bright ${
                              pathname === l.to
                                ? "text-brand-bright"
                                : "text-bone"
                            }`}
                          >
                            {l.label}
                          </span>
                        </Link>
=======
                        <a
                          href={l.href}
                          onClick={() => setOpen(false)}
                          className="group flex items-baseline gap-4 py-3 md:py-4"
                        >
                          <span className="u-eyebrow w-7 shrink-0 text-bone-faint transition-colors group-hover:text-brand-bright">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="font-display text-[clamp(30px,6.5vw,60px)] leading-[1.05] text-bone transition-colors duration-200 group-hover:text-brand-bright">
                            {l.label}
                          </span>
                        </a>
>>>>>>> main
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* Photo panel — desktop only, purely decorative */}
                <motion.div
                  className="hidden md:block"
                  initial={{ opacity: 0, scale: reduced ? 1 : 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={menuPhoto}
                      alt=""
                      className="h-full w-full object-cover grayscale"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-deep via-ink-deep/25 to-transparent" />
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="mt-12 flex flex-wrap items-center justify-between gap-5 border-t border-bone/10 pt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.35 }}
              >
                <a
                  href="mailto:shabasfootball@gmail.com"
                  className="text-sm text-bone-dim transition-colors hover:text-bone"
                >
                  shabasfootball@gmail.com
                </a>
                <SocialRow />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
