import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLang } from "@/contexts/lang";

const LangToggle = () => {
  const { lang, setLang } = useLang();
  return (
    <div className="flex items-center bg-[#f0f2f0] border-2 border-[#dde8dd] rounded-full p-0.5">
      <button
        onClick={() => setLang('fr')}
        className={`text-xs font-black px-3 py-1.5 rounded-full transition-all duration-200 ${
          lang === 'fr' ? 'bg-[#1e8a3c] text-white shadow-sm' : 'text-[#6b7b6b] hover:text-[#1a1a1a]'
        }`}
      >
        FR
      </button>
      <button
        onClick={() => setLang('en')}
        className={`text-xs font-black px-3 py-1.5 rounded-full transition-all duration-200 ${
          lang === 'en' ? 'bg-[#1e8a3c] text-white shadow-sm' : 'text-[#6b7b6b] hover:text-[#1a1a1a]'
        }`}
      >
        EN
      </button>
    </div>
  );
};

const Header = () => {
  const [open, setOpen] = useState(false);
  const { t } = useLang();

  const navLinks = [
    { href: '#features',    label: t.nav.features },
    { href: '#how',         label: t.nav.howItWorks },
    { href: '#tournaments', label: t.nav.tournaments },
    { href: '#la-rue',      label: t.nav.laRue },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[66px] flex items-center bg-white/95 backdrop-blur-md border-b-2 border-[#dde8dd]">
      <div className="max-w-[1120px] mx-auto px-6 flex items-center justify-between w-full">

        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <img src="/logo/shaba-logo.png" alt="Shabas" className="h-9 w-auto object-contain" />
          <span className="font-fredoka text-[22px] text-[#1a1a1a] tracking-[0.5px]">shabas</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-bold text-[#6b7b6b] px-3.5 py-2 rounded-xl hover:bg-[#f0f2f0] hover:text-[#1a1a1a] transition-all"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right side: toggle + CTA */}
        <div className="hidden md:flex items-center gap-3">
          <LangToggle />
          <a
            href="#download"
            className="inline-flex items-center gap-2 bg-[#1e8a3c] text-white text-sm font-black px-5 py-2.5 rounded-[20px] btn-duo"
          >
            {t.nav.download}
          </a>
        </div>

        {/* Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <LangToggle />
          <button className="p-2 text-[#1a1a1a]" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-full left-0 right-0 bg-white border-b-2 border-[#dde8dd] flex flex-col gap-1 p-4 md:hidden shadow-lg"
          >
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm font-bold text-[#6b7b6b] px-3.5 py-2.5 rounded-xl hover:bg-[#f0f2f0] hover:text-[#1a1a1a] transition-all"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#download"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 bg-[#1e8a3c] text-white text-sm font-black px-5 py-3 rounded-[20px]"
            >
              {t.nav.download}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
