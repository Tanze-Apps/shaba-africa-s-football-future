import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/contexts/lang";

const HowItWorks = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { t } = useLang();
  const h = t.how;

  return (
    <section id="how" className="py-24" style={{ background: "#f0f2f0" }}>
      <div className="max-w-[1120px] mx-auto px-6">

        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <div className="inline-flex items-center gap-1.5 bg-white border-2 border-[#dde8dd] rounded-full px-3.5 py-1.5 text-[11px] font-black uppercase tracking-[1.5px] text-[#6b7b6b] mb-5">
            {h.badge}
          </div>
          <h2 className="font-fredoka text-[clamp(36px,5vw,58px)] leading-[1.1] text-[#1a1a1a] mb-3">
            {h.headline}<br /><span className="text-[#1e8a3c]">{h.accent}</span>
          </h2>
          <p className="text-[16px] font-semibold text-[#6b7b6b] max-w-[380px] mx-auto">{h.sub}</p>
        </motion.div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Dashed connector — desktop only */}
          <div className="hidden lg:block absolute top-[52px] left-[12.5%] right-[12.5%] h-[2px] pointer-events-none"
            style={{ background: "repeating-linear-gradient(90deg,#1e8a3c 0px,#1e8a3c 8px,transparent 8px,transparent 16px)", opacity: 0.3 }} />

          {h.steps.map((s, i) => (
            <motion.div
              key={i}
              className="relative bg-white border-2 border-[#dde8dd] rounded-[32px] pt-8 pb-7 px-5 text-center hover:-translate-y-1 hover:shadow-xl transition-all duration-200"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1 }}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#1e8a3c] flex items-center justify-center font-fredoka text-[13px] text-white"
                style={{ boxShadow: "0 2px 0 #145c28" }}>
                {i + 1}
              </div>
              <span className="text-[40px] my-3.5 block">{s.emoji}</span>
              <h3 className="font-fredoka text-[18px] text-[#1a1a1a] mb-2">{s.title}</h3>
              <p className="text-[13px] font-semibold text-[#6b7b6b] leading-[1.55]">{s.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
