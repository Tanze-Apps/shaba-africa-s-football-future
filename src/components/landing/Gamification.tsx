import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/contexts/lang";

const StreakDots = () => {
  const days = [true, true, true, true, true, true, false];
  return (
    <div className="flex justify-center gap-1.5 mt-4">
      {days.map((done, i) => (
        <div key={i} className="w-7 h-7 rounded-full flex items-center justify-center text-sm border-2"
          style={{
            background: done ? "rgba(255,255,255,0.2)" : "transparent",
            borderColor: done ? "rgba(255,255,255,0.4)" : i === 6 ? "white" : "rgba(255,255,255,0.2)",
            borderStyle: i === 6 ? "dashed" : "solid",
          }}>
          {done ? "🔥" : "📅"}
        </div>
      ))}
    </div>
  );
};

const XpBarDemo = ({ active, xpLevel, xpNext }: { active: boolean; xpLevel: string; xpNext: string }) => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setWidth(78), 500);
    return () => clearTimeout(t);
  }, [active]);
  return (
    <div className="mt-4">
      <div className="rounded-full h-2 overflow-hidden" style={{ background: "rgba(0,0,0,0.2)" }}>
        <div className="h-full rounded-full bg-white"
          style={{ width: `${width}%`, transition: "width 1.6s cubic-bezier(0.4,0,0.2,1)" }} />
      </div>
      <div className="flex justify-between mt-1.5">
        <span className="text-[10px] font-black text-white/60">{xpLevel}</span>
        <span className="text-[10px] font-black text-white/40">{xpNext}</span>
      </div>
    </div>
  );
};

const RepStars = ({ label }: { label: string }) => (
  <div className="mt-4">
    <div className="flex justify-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="text-[22px]" style={{ filter: "drop-shadow(0 0 6px rgba(245,166,35,0.6))" }}>⭐</span>
      ))}
    </div>
    <div className="text-center mt-2 text-[11px] font-black text-white/50">{label}</div>
  </div>
);

const Gamification = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { t } = useLang();
  const g = t.gam;

  const demos = [
    <StreakDots key="streak" />,
    <XpBarDemo key="xp" active={inView} xpLevel={g.xpLevel} xpNext={g.xpNext} />,
    <RepStars key="rep" label={g.repLabel} />,
  ];

  return (
    <section id="gamification" className="py-20 relative overflow-hidden" style={{ background: "#1e8a3c" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "repeating-linear-gradient(-45deg,transparent,transparent 30px,rgba(255,255,255,0.03) 30px,rgba(255,255,255,0.03) 60px)" }} />

      <div ref={ref} className="max-w-[1120px] mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-black uppercase tracking-[1.5px] mb-5"
            style={{ background: "rgba(255,255,255,0.1)", border: "1.5px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)" }}>
            {g.badge}
          </div>
          <h2 className="font-fredoka text-[clamp(32px,4vw,52px)] text-white leading-[1.1] mb-2.5">
            {g.headline}<br /><span>{g.accent}</span>
          </h2>
          <p className="text-[16px] font-semibold text-white/65">{g.sub}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {g.cards.map((c, i) => (
            <motion.div
              key={c.title}
              className="rounded-[32px] p-7 text-center hover:bg-white/14 hover:-translate-y-1 transition-all duration-200"
              style={{ background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(255,255,255,0.15)" }}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.12 }}
            >
              <span className="text-[44px] mb-4 block">{c.icon}</span>
              <h3 className="font-fredoka text-[22px] text-white mb-2">{c.title}</h3>
              <p className="text-[13px] font-semibold text-white/65 leading-[1.55]">{c.desc}</p>
              {demos[i]}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gamification;
