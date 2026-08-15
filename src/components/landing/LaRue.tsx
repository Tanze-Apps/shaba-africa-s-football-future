import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/contexts/lang";

const FeedPost = ({
  avatar, name, handle, time, tag, tagColor, children, actions,
}: {
  avatar: string;
  name: string;
  handle: string;
  time: string;
  tag: string;
  tagColor?: string;
  children: React.ReactNode;
  actions: { icon: string; count: number }[];
}) => (
  <div className="rounded-[18px] p-3.5 border-2"
    style={{ borderColor: tagColor ? "#ffe082" : "#dde8dd", background: tagColor ? "#fffde7" : "white" }}>
    <div className="flex items-center gap-2.5 mb-2">
      <div className="w-8 h-8 rounded-full flex items-center justify-center text-base flex-shrink-0"
        style={{ background: tagColor ? "#fff3e0" : "#e8f5ed", border: "2px solid #dde8dd" }}>
        {avatar}
      </div>
      <div>
        <div className="text-[12px] font-black">{name}</div>
        <div className="text-[10px] text-[#6b7b6b] font-semibold">{handle} · {time}</div>
      </div>
    </div>
    <div className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[9px] font-black mb-2"
      style={{ background: tagColor ? "#fff3e0" : "#e8f5ed", border: `1.5px solid ${tagColor ?? "#b2d8bf"}`, color: tagColor ?? "#1e8a3c" }}>
      {tag}
    </div>
    {children}
    <div className="flex gap-3 mt-2">
      {actions.map((a) => (
        <div key={a.icon} className="text-[10px] font-black text-[#6b7b6b] flex items-center gap-1">{a.icon} {a.count}</div>
      ))}
    </div>
  </div>
);

const LaRue = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { t } = useLang();
  const l = t.laRue;

  return (
    <section id="la-rue" className="py-24 relative overflow-hidden stripe-bg" style={{ background: "#0a1a0f" }}>
      <div className="max-w-[1120px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

          {/* LEFT */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
          >
            <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-black uppercase tracking-[1.5px] mb-7"
              style={{ background: "rgba(255,255,255,0.1)", border: "1.5px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)" }}>
              {l.badge}
            </div>
            <h2 className="font-fredoka text-[clamp(38px,5vw,62px)] text-white leading-[1.05] mb-4">
              {l.headline} <span className="text-[#2db355]">{l.accentH}</span><br />
              {l.line2}<br />{l.line3}
            </h2>
            <p className="text-[16px] font-semibold text-white/50 leading-[1.65] max-w-[380px] mb-7">{l.sub}</p>

            <div className="flex flex-col gap-3 mb-8">
              {l.features.map((f) => (
                <div key={f.title} className="flex items-start gap-3 text-[14px] font-bold text-white/60">
                  <div className="w-8 h-8 rounded-[10px] flex items-center justify-center text-base flex-shrink-0"
                    style={{ background: "rgba(45,179,85,0.15)", border: "1.5px solid rgba(45,179,85,0.3)" }}>
                    {f.icon}
                  </div>
                  <div><strong className="text-white/90">{f.title}</strong> — {f.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — feed */}
          <motion.div
            className="flex flex-col gap-2.5 md:rotate-2"
            style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.5))" }}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2 }}
          >
            <FeedPost
              avatar="🏆" name="QG Family ✓" handle="@qg_family" time="2h · Ange-Raphaël"
              tag="⚽ Match · QG Family vs Trinity Sante"
              actions={[{ icon: "❤️", count: 24 }, { icon: "💬", count: 8 }, { icon: "🔁", count: 3 }]}
            >
              <div className="rounded-xl p-2.5 flex items-center justify-center gap-3 mb-2" style={{ background: "#12261e" }}>
                <div className="text-center text-white">
                  <div className="text-lg">🏆</div>
                  <div className="text-[9px] font-black">QG Family</div>
                </div>
                <div className="font-fredoka text-[20px] text-[#2db355]">0 – 0</div>
                <div className="text-center text-white">
                  <div className="text-lg">⚽</div>
                  <div className="text-[9px] font-black">Trinity Sante</div>
                </div>
              </div>
              <p className="text-[12px] font-semibold text-[#1a1a1a] leading-[1.5]">
                Ce soir on a tout donné ! Match nul mais on repart la tête haute 💪 Respect à @TrinityFC 🤝
              </p>
            </FeedPost>

            <FeedPost
              avatar="🦂" name="Scorpions FC" handle="@scorpions_dla" time="5h · Makepe"
              tag="⚡ Défi lancé · 10/6/2026"
              tagColor="#f5a623"
              actions={[{ icon: "❤️", count: 41 }, { icon: "💬", count: 17 }, { icon: "🔁", count: 9 }]}
            >
              <p className="text-[12px] font-semibold text-[#1a1a1a] leading-[1.5]">
                On vous attend sur le terrain 😤 Qui ose relever le défi ? 🦂🔥
              </p>
            </FeedPost>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LaRue;
