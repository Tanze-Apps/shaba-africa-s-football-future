import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/contexts/lang";

const PLAY_STORE = "https://play.google.com/store/apps/details?id=com.shabas.app";
const WEB_APP    = "https://app.sha-bas.com";

const Download = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { t } = useLang();
  const d = t.download;

  return (
    <section id="download" className="py-24 text-center relative overflow-hidden" style={{ background: "#12261e" }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(30,138,60,0.2) 0%, transparent 70%)" }} />

      <div ref={ref} className="max-w-[1120px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <h2 className="font-fredoka text-[clamp(38px,5vw,64px)] text-white leading-[1.1] mb-4">
            {d.headline}<br /><span className="text-[#2db355]">{d.accent}</span>
          </h2>
          <p className="text-[17px] font-semibold text-white/45 max-w-[400px] mx-auto mb-10">{d.sub}</p>

          {/* Primary download buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-5">
            {/* Google Play — live */}
            <a
              href={PLAY_STORE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-white text-[#1a1a1a] px-6 py-3.5 rounded-[20px] btn-duo-white"
            >
              <img src="/icons/playstore.png" alt="" className="w-6 h-6 object-contain" />
              <div className="text-left">
                <div className="text-[9px] font-bold text-[#6b7b6b] uppercase tracking-[0.5px]">{d.subApp}</div>
                <div className="text-[16px] font-black leading-[1.2]">{d.googlePlay}</div>
              </div>
            </a>

            {/* App Store — coming soon */}
            <div className="inline-flex items-center gap-2.5 bg-white/8 border-2 border-white/15 text-white/50 px-6 py-3.5 rounded-[20px] cursor-not-allowed select-none">
              <img src="/icons/appstore.png" alt="" className="w-6 h-6 object-contain opacity-50" />
              <div className="text-left">
                <div className="text-[9px] font-bold text-white/30 uppercase tracking-[0.5px]">{d.subAppSoon}</div>
                <div className="text-[16px] font-black leading-[1.2]">{d.appStore}</div>
              </div>
            </div>
          </div>

          {/* Web app — prominent for iPhone users */}
          <div className="flex justify-center mb-8">
            <a
              href={WEB_APP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-[20px] px-6 py-3.5 transition-all hover:-translate-y-0.5"
              style={{ background: "rgba(45,179,85,0.12)", border: "1.5px solid rgba(45,179,85,0.3)" }}
            >
              <span className="text-[20px]">🌐</span>
              <div className="text-left">
                <div className="text-[9px] font-bold text-[#2db355]/70 uppercase tracking-[0.5px]">{d.webSub}</div>
                <div className="text-[15px] font-black text-[#2db355] leading-[1.2]">{d.webCta}</div>
              </div>
            </a>
          </div>

          {/* iPhone notice chip */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-bold text-[#f5a623] mb-6"
            style={{ background: "rgba(245,166,35,0.08)", border: "1px solid rgba(245,166,35,0.2)" }}>
            {d.iphoneNote}
          </div>

          <div className="flex items-center justify-center gap-2 text-[13px] font-bold text-white/25">
            {d.trust}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Download;
