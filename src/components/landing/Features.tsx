import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Footprints, MapPin, BadgeCheck } from "lucide-react";
import { useLang } from "@/contexts/lang";
import formationImg from "@/assets/formation.png";

const TYPING_NAMES = ["Sniper 99", "Makossa 10", "Flash Mpondo", "Dragon 7"];

const SearchDemo = () => {
  const [nameIdx, setNameIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const name = TYPING_NAMES[nameIdx];
    let i = 0;
    setTyped("");
    setShowResult(false);
    const typer = setInterval(() => {
      i++;
      setTyped(name.slice(0, i));
      if (i >= name.length) {
        clearInterval(typer);
        setTimeout(() => setShowResult(true), 300);
        setTimeout(() => setNameIdx((p) => (p + 1) % TYPING_NAMES.length), 2800);
      }
    }, 80);
    return () => clearInterval(typer);
  }, [nameIdx]);

  const initials = typed.split(" ").map((w) => w[0] || "").join("").slice(0, 2).toUpperCase();

  return (
    <div className="rounded-[18px] p-4 flex flex-col gap-2.5"
      style={{ background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.1)" }}>
      <div className="bg-white rounded-full px-4 py-2.5 flex items-center gap-2">
        <span className="text-sm">🔍</span>
        <span className="text-[13px] font-bold text-[#1a1a1a]">{typed}</span>
        <span className="inline-block w-[2px] h-3.5 bg-[#1e8a3c] animate-cursor-blink" />
      </div>
      {showResult && (
        <div className="bg-white rounded-[14px] px-3 py-2.5 flex items-center gap-2.5 slide-in-result">
          <div className="w-9 h-9 rounded-full flex items-center justify-center font-fredoka text-sm text-white flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#c8960c,#f5d020)" }}>
            {initials}
          </div>
          <div>
            <div className="text-[13px] font-black">{typed}</div>
            <div className="text-[10px] text-[#6b7b6b] font-semibold">Attaquant · Makepe</div>
          </div>
          <div className="ml-auto bg-[#1e8a3c] text-white text-[10px] font-black px-2.5 py-1 rounded-full">RTG 92</div>
        </div>
      )}
    </div>
  );
};

type MarketplaceListing = { product: string; price: string; location: string; condition: string; seller: string };

const MarketplaceDemo = ({ demo }: { demo: MarketplaceListing }) => (
  <div className="rounded-[18px] p-4"
    style={{ background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.1)" }}>
    <div className="bg-white rounded-[14px] p-3.5 flex flex-col gap-3">
      <div className="flex items-center gap-2.5">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "linear-gradient(135deg,#c8960c,#f5d020)" }}>
          <Footprints className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-black text-[#1a1a1a] truncate">{demo.product}</div>
          <div className="text-[10px] text-[#6b7b6b] font-semibold flex items-center gap-1">
            <MapPin className="w-3 h-3" /> {demo.location}
          </div>
        </div>
        <span className="bg-[#e8f5ed] text-[#1e8a3c] text-[9px] font-black px-2 py-1 rounded-full flex-shrink-0">{demo.condition}</span>
      </div>
      <div className="flex items-center justify-between pt-2.5 border-t border-[#f0f2f0]">
        <span className="font-fredoka text-[17px] text-[#1a1a1a]">{demo.price}</span>
        <div className="flex items-center gap-1 text-[10px] font-black text-[#c8960c]">
          <BadgeCheck className="w-3.5 h-3.5" /> {demo.seller}
        </div>
      </div>
    </div>
  </div>
);

const GLOW_COLORS = ['#1e8a3c', '#f5a623', '#f59e0b', '#6366f1'];
const HOVER_BORDERS = ['#1e8a3c', '#f5a623', '#f59e0b', '#6366f1'];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: (d: number) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: d * 0.1 } }),
};

const Features = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { t } = useLang();
  const f = t.features;

  return (
    <section id="features" className="bg-white py-24 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid pointer-events-none" />
      <div className="max-w-[1120px] mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center mb-14"
          initial="hidden" animate={inView ? "visible" : "hidden"} custom={0} variants={reveal}
        >
          <div className="inline-flex items-center gap-1.5 bg-[#f0f2f0] border-2 border-[#dde8dd] rounded-full px-3.5 py-1.5 text-[11px] font-black uppercase tracking-[1.5px] text-[#6b7b6b] mb-5">
            {f.badge}
          </div>
          <h2 className="font-fredoka text-[clamp(36px,5vw,60px)] leading-[1.1] text-[#1a1a1a] mb-3">
            {f.headline}<br /><span className="text-[#1e8a3c]">{f.accent}</span>
          </h2>
          <p className="text-[16px] font-semibold text-[#6b7b6b] max-w-[480px] mx-auto">{f.sub}</p>
        </motion.div>

        {/* Bento */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Discovery — wide */}
          <motion.div
            className="group sm:col-span-2 relative bg-[#f0f2f0] border-2 border-[#dde8dd] rounded-[32px] p-8 overflow-hidden cursor-default hover:-translate-y-1 hover:bg-white hover:shadow-xl transition-all duration-300"
            style={{ ['--hover-border' as any]: HOVER_BORDERS[0] }}
            initial="hidden" animate={inView ? "visible" : "hidden"} custom={1} variants={reveal}
          >
            <div className="bento-glow" style={{ background: GLOW_COLORS[0] }} />
            <span className="text-[42px] mb-5 block">{f.cards[0].icon}</span>
            <div className="text-[10px] font-black uppercase tracking-[1.5px] text-[#6b7b6b] mb-1.5">{f.cards[0].tag}</div>
            <h3 className="font-fredoka text-[26px] text-[#1a1a1a] mb-2.5">{f.cards[0].title}</h3>
            <p className="text-[14px] font-semibold text-[#6b7b6b] leading-[1.6] max-w-xs">{f.cards[0].desc}</p>
          </motion.div>

          {/* Challenges */}
          <motion.div
            className="group relative bg-[#f0f2f0] border-2 border-[#dde8dd] rounded-[32px] p-8 overflow-hidden cursor-default hover:-translate-y-1 hover:bg-white hover:shadow-xl transition-all duration-300"
            initial="hidden" animate={inView ? "visible" : "hidden"} custom={2} variants={reveal}
          >
            <div className="bento-glow" style={{ background: GLOW_COLORS[1] }} />
            <span className="text-[42px] mb-5 block">{f.cards[1].icon}</span>
            <div className="text-[10px] font-black uppercase tracking-[1.5px] text-[#6b7b6b] mb-1.5">{f.cards[1].tag}</div>
            <h3 className="font-fredoka text-[26px] text-[#1a1a1a] mb-2.5">{f.cards[1].title}</h3>
            <p className="text-[14px] font-semibold text-[#6b7b6b] leading-[1.6]">{f.cards[1].desc}</p>
          </motion.div>

          {/* Rankings */}
          <motion.div
            className="group relative bg-[#f0f2f0] border-2 border-[#dde8dd] rounded-[32px] p-8 overflow-hidden cursor-default hover:-translate-y-1 hover:bg-white hover:shadow-xl transition-all duration-300"
            initial="hidden" animate={inView ? "visible" : "hidden"} custom={3} variants={reveal}
          >
            <div className="bento-glow" style={{ background: GLOW_COLORS[2] }} />
            <span className="text-[42px] mb-5 block">{f.cards[2].icon}</span>
            <div className="text-[10px] font-black uppercase tracking-[1.5px] text-[#6b7b6b] mb-1.5">{f.cards[2].tag}</div>
            <h3 className="font-fredoka text-[26px] text-[#1a1a1a] mb-2.5">{f.cards[2].title}</h3>
            <p className="text-[14px] font-semibold text-[#6b7b6b] leading-[1.6]">{f.cards[2].desc}</p>
          </motion.div>

          {/* Profile — wide */}
          <motion.div
            className="group sm:col-span-2 relative bg-[#f0f2f0] border-2 border-[#dde8dd] rounded-[32px] p-8 overflow-hidden cursor-default hover:-translate-y-1 hover:bg-white hover:shadow-xl transition-all duration-300"
            initial="hidden" animate={inView ? "visible" : "hidden"} custom={4} variants={reveal}
          >
            <div className="bento-glow" style={{ background: GLOW_COLORS[3] }} />
            <span className="text-[42px] mb-5 block">{f.cards[3].icon}</span>
            <div className="text-[10px] font-black uppercase tracking-[1.5px] text-[#6b7b6b] mb-1.5">{f.cards[3].tag}</div>
            <h3 className="font-fredoka text-[26px] text-[#1a1a1a] mb-2.5">{f.cards[3].title}</h3>
            <p className="text-[14px] font-semibold text-[#6b7b6b] leading-[1.6] max-w-xs">{f.cards[3].desc}</p>
          </motion.div>

          {/* Live Formation Preview — full width */}
          <motion.div
            className="lg:col-span-3 sm:col-span-2 relative rounded-[32px] overflow-hidden border-2 border-[#2db355]/20 hover:border-[#2db355]/40 hover:shadow-xl transition-all duration-300"
            style={{ background: "#0a1a0f" }}
            initial="hidden" animate={inView ? "visible" : "hidden"} custom={5} variants={reveal}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8 md:p-10">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-black uppercase tracking-[1.5px] text-[#2db355] mb-5"
                  style={{ background: "rgba(45,179,85,0.1)", border: "1.5px solid rgba(45,179,85,0.25)" }}>
                  {f.liveFormation.badge}
                </div>
                <h3 className="font-fredoka text-[32px] text-white mb-3">{f.liveFormation.title}</h3>
                <p className="text-[15px] font-semibold text-white/55 leading-[1.65] max-w-[340px]">{f.liveFormation.desc}</p>
              </div>
              <div className="flex justify-center">
                <div className="rounded-[28px] p-3 w-[220px]"
                  style={{ background: "#0d0d0d", boxShadow: "0 0 0 2px rgba(255,255,255,0.08), 0 30px 60px rgba(0,0,0,0.5)" }}>
                  <img src={formationImg} alt={f.liveFormation.title} className="w-full rounded-[16px] object-cover" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Marketplace — full width */}
          <motion.div
            className="lg:col-span-3 sm:col-span-2 relative rounded-[32px] overflow-hidden border-2 border-[#f5a623]/20 hover:border-[#f5a623]/40 hover:shadow-xl transition-all duration-300"
            style={{ background: "#0a1a0f" }}
            initial="hidden" animate={inView ? "visible" : "hidden"} custom={6} variants={reveal}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8 md:p-10">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-black uppercase tracking-[1.5px] text-[#f5a623] mb-5"
                  style={{ background: "rgba(245,166,35,0.1)", border: "1.5px solid rgba(245,166,35,0.25)" }}>
                  {f.marketplace.badge}
                </div>
                <h3 className="font-fredoka text-[32px] text-white mb-3">{f.marketplace.title}</h3>
                <p className="text-[15px] font-semibold text-white/55 leading-[1.65] max-w-[340px]">{f.marketplace.desc}</p>
              </div>
              <MarketplaceDemo demo={f.marketplace.demo} />
            </div>
          </motion.div>

          {/* Talent Showcase — full width */}
          <motion.div
            className="lg:col-span-3 sm:col-span-2 relative rounded-[32px] overflow-hidden border-2 border-[#2db355]/20 hover:border-[#2db355]/40 hover:shadow-xl transition-all duration-300"
            style={{ background: "#0a1a0f" }}
            initial="hidden" animate={inView ? "visible" : "hidden"} custom={7} variants={reveal}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8 md:p-10">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-black uppercase tracking-[1.5px] text-[#2db355] mb-5"
                  style={{ background: "rgba(45,179,85,0.1)", border: "1.5px solid rgba(45,179,85,0.25)" }}>
                  {f.showcaseBadge}
                </div>
                <h3 className="font-fredoka text-[32px] text-white mb-3">{f.showcaseTitle}</h3>
                <p className="text-[15px] font-semibold text-white/55 leading-[1.65] max-w-[340px]">{f.showcaseDesc}</p>
              </div>
              <SearchDemo />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Features;
