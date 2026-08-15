import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useLang } from "@/contexts/lang";

// Assets imported from src/assets (Vite resolves these at build time)
import screen1 from "@/assets/Screenshot 2026-06-10 161816.png";
import screen2 from "@/assets/Screenshot 2026-06-10 161852.png";
import screen3 from "@/assets/Screenshot 2026-06-10 162018.png";
import formationImg from "@/assets/formation.png";

const useCountUp = (target: number, active: boolean, duration = 1800) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let frame: number;
    let start: number | null = null;
    const tick = (t: number) => {
      if (!start) start = t;
      const p = Math.min((t - start) / duration, 1);
      setVal(Math.round(target * (1 - Math.pow(1 - p, 4))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration]);
  return val;
};

const SCREENSHOTS = [
  { src: screen1,      label: 'Home' },
  { src: screen2,      label: 'Explore' },
  { src: screen3,      label: 'Matches' },
  { src: formationImg, label: 'Formation' },
];

const PhoneCarousel = () => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % SCREENSHOTS.length), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="w-[260px] sm:w-[270px] rounded-[42px] p-3.5 animate-phone-float"
      style={{
        background: "#0d0d0d",
        boxShadow: "0 0 0 2px rgba(255,255,255,0.08), 0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(30,138,60,0.15)",
      }}
    >
      {/* Notch */}
      <div className="w-24 h-6 bg-[#0d0d0d] rounded-b-[18px] mx-auto mb-2.5 relative z-10" />

      {/* Screen */}
      <div className="rounded-[30px] overflow-hidden relative" style={{ minHeight: 480 }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={idx}
            src={SCREENSHOTS[idx].src}
            alt={SCREENSHOTS[idx].label}
            className="w-full object-cover object-top"
            style={{ minHeight: 480, display: "block" }}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4 }}
          />
        </AnimatePresence>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 mt-3">
        {SCREENSHOTS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === idx ? 16 : 6,
              height: 6,
              background: i === idx ? '#2db355' : 'rgba(255,255,255,0.2)',
            }}
          />
        ))}
      </div>
    </div>
  );
};

const FloatingCards = () => (
  <div className="hidden lg:block">
    <div className="absolute top-10 -right-[72px] bg-white rounded-[14px] px-3.5 py-2.5 shadow-xl border-[1.5px] border-white/90 flex items-center gap-2 animate-float-card-1 whitespace-nowrap">
      <span className="text-lg">⚡</span>
      <div>
        <div className="text-[13px] font-black text-[#1e8a3c]">+80 XP</div>
        <div className="text-[9px] font-bold text-[#7a8a7a]">Victoire !</div>
      </div>
    </div>
    <div className="absolute bottom-28 -left-[76px] bg-white rounded-[14px] px-3.5 py-2.5 shadow-xl border-[1.5px] border-white/90 flex items-center gap-2 animate-float-card-2 whitespace-nowrap">
      <span className="text-lg">🔔</span>
      <div>
        <div className="text-[13px] font-black text-[#1a1a1a]">Nouveau défi</div>
        <div className="text-[9px] font-bold text-[#7a8a7a]">Scorpions FC</div>
      </div>
    </div>
    <div className="absolute bottom-8 -right-[58px] bg-white rounded-[14px] px-3.5 py-2.5 shadow-xl border-[1.5px] border-white/90 flex items-center gap-2 animate-float-card-3 whitespace-nowrap">
      <span className="text-lg">🏆</span>
      <div>
        <div className="text-[13px] font-black text-[#1e8a3c]">#2 Bepanda</div>
        <div className="text-[9px] font-bold text-[#7a8a7a]">Classement</div>
      </div>
    </div>
  </div>
);

const HeroStats = () => {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref, { once: true });
  const teams = useCountUp(12, active);
  const cities = useCountUp(5, active);
  const { t } = useLang();

  const displayVals = [`${teams}+`, `${cities}+`, "100%", "🌍"];
  const labels = t.hero.stats.map((s) => s.label);

  return (
    <div
      ref={ref}
      className="absolute bottom-0 left-0 right-0 border-t border-white/[0.06]"
      style={{ background: "#12261e", padding: "20px 24px" }}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 max-w-[1120px] mx-auto">
        {labels.map((label, i) => (
          <div
            key={label}
            className="text-center py-3 px-5"
            style={{ borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}
          >
            <div className="font-fredoka text-[28px] sm:text-[34px] text-[#2db355] leading-none mb-1">{displayVals[i]}</div>
            <div className="text-[10px] font-black text-white/35 uppercase tracking-[1.5px]">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Hero = () => {
  const { t } = useLang();

  return (
    <section
      id="hero"
      className="min-h-screen relative overflow-hidden flex items-center pt-[100px] pb-[160px] stripe-bg"
      style={{ background: "#0a1a0f" }}
    >
      <div className="absolute -top-[15%] -left-[10%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(30,138,60,0.25) 0%, transparent 70%)" }} />
      <div className="absolute -bottom-[20%] -right-[5%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(45,179,85,0.15) 0%, transparent 70%)" }} />

      <div className="max-w-[1120px] mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-[60px] items-center">

          {/* LEFT */}
          <motion.div
            className="flex flex-col items-center md:items-start text-center md:text-left"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-7 font-black text-xs text-[#2db355]"
              style={{ background: "rgba(45,179,85,0.12)", border: "1.5px solid rgba(45,179,85,0.35)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#2db355] animate-pulse-dot" />
              {t.hero.badge}
            </div>

            <h1 className="font-fredoka text-[clamp(48px,6vw,80px)] leading-[1.05] text-white mb-6">
              {t.hero.h1} <span className="text-[#2db355]">{t.hero.h1a}</span>
              <br />{t.hero.h2} <span className="text-[#2db355]">{t.hero.h2a}</span>
              <br />{t.hero.h3} <span className="text-[#f5a623]">{t.hero.h3g}</span>
            </h1>

            <p className="text-[17px] font-semibold text-white/55 leading-[1.65] max-w-[420px] mb-9">
              {t.hero.sub}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 mb-11 w-full sm:w-auto">
              <a
                href="https://play.google.com/store/apps/details?id=com.shabas.app"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1e8a3c] text-white text-[16px] font-black px-8 py-4 rounded-[20px] btn-duo"
              >
                {t.hero.ctaPrimary}
              </a>
              <a
                href="https://app.sha-bas.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-white/70 text-sm font-bold px-5 py-3 rounded-[20px] border-2 border-white/15 hover:bg-white/8 hover:text-white hover:border-white/30 transition-all"
              >
                {t.hero.ctaWeb}
              </a>
            </div>

            {/* iPhone notice */}
            <div className="flex items-center gap-2 mb-6 px-3 py-2 rounded-xl text-[12px] font-bold text-[#f5a623]"
              style={{ background: "rgba(245,166,35,0.08)", border: "1px solid rgba(245,166,35,0.2)" }}>
              {t.hero.iphoneNotice}
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2 pt-6 border-t border-white/[0.08]">
              {t.hero.proof.map((p, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[13px] font-bold text-white/50">
                  {p.icon} <strong className="text-white/85">{p.strong}</strong> {p.label}
                  {i < t.hero.proof.length - 1 && (
                    <span className="ml-4 w-px h-5 bg-white/12 inline-block" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            className="flex justify-center items-center relative order-first md:order-last"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <PhoneCarousel />
            <FloatingCards />
          </motion.div>

        </div>
      </div>

      <HeroStats />
    </section>
  );
};

export default Hero;
