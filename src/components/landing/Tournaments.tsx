import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy } from "lucide-react";
import { useLang } from "@/contexts/lang";

const BracketDemo = ({ stages }: { stages: readonly string[] }) => (
  <div className="rounded-[24px] p-6" style={{ background: "#f0f2f0", border: "2px solid #dde8dd" }}>
    <div className="flex items-center justify-between mb-6">
      {stages.map((stage, i) => (
        <div key={stage} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center gap-2 flex-shrink-0">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-fredoka text-[13px]"
              style={{
                background: i === stages.length - 1 ? "#f5a623" : "white",
                border: i === stages.length - 1 ? "none" : "2px solid #dde8dd",
                color: i === stages.length - 1 ? "white" : "#6b7b6b",
              }}
            >
              {i === stages.length - 1 ? <Trophy className="w-4 h-4" /> : i + 1}
            </div>
            <span className="text-[9px] font-black text-[#6b7b6b] uppercase tracking-wide text-center whitespace-nowrap">{stage}</span>
          </div>
          {i < stages.length - 1 && (
            <div
              className="flex-1 h-[2px] mx-2 mb-4"
              style={{ background: "repeating-linear-gradient(90deg,#c7d4c7 0px,#c7d4c7 6px,transparent 6px,transparent 12px)" }}
            />
          )}
        </div>
      ))}
    </div>
    <div className="rounded-xl p-3.5 flex items-center justify-center gap-4" style={{ background: "white", border: "2px solid #dde8dd" }}>
      <div className="text-[12px] font-black text-[#1a1a1a]">QG Family</div>
      <div className="font-fredoka text-[15px] text-[#f5a623]">VS</div>
      <div className="text-[12px] font-black text-[#1a1a1a]">Scorpions FC</div>
    </div>
  </div>
);

const Tournaments = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { t } = useLang();
  const tr = t.tournament;

  return (
    <section id="tournaments" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-[1120px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

          {/* LEFT */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
          >
            <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-black uppercase tracking-[1.5px] mb-7 text-[#f5a623]"
              style={{ background: "rgba(245,166,35,0.1)", border: "1.5px solid rgba(245,166,35,0.3)" }}>
              {tr.badge}
            </div>
            <h2 className="font-fredoka text-[clamp(36px,5vw,58px)] leading-[1.1] text-[#1a1a1a] mb-4">
              {tr.headline} <span className="text-[#1e8a3c]">{tr.accent}</span>
            </h2>
            <p className="text-[16px] font-semibold text-[#6b7b6b] leading-[1.65] max-w-[420px] mb-8">{tr.sub}</p>

            <div className="flex flex-col gap-5">
              {tr.bullets.map((b, i) => (
                <div key={b.title} className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-[#1e8a3c] flex items-center justify-center font-fredoka text-[12px] text-white flex-shrink-0"
                    style={{ boxShadow: "0 2px 0 #145c28" }}>
                    {i + 1}
                  </div>
                  <div>
                    <div className="text-[15px] font-black text-[#1a1a1a] mb-0.5">{b.title}</div>
                    <p className="text-[13px] font-semibold text-[#6b7b6b] leading-[1.5]">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2 }}
          >
            <BracketDemo stages={tr.stages} />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Tournaments;
