import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/contexts/lang";

const Footer = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { t } = useLang();
  const f = t.footer;

  return (
    <footer
      ref={ref}
      className="border-t py-12 pb-7"
      style={{ background: "#0a1a0f", borderColor: "rgba(255,255,255,0.06)" }}
    >
      <motion.div
        className="max-w-[1120px] mx-auto px-6"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-10">

          {/* Brand */}
          <div>
            <a href="#" className="flex items-center gap-2.5 mb-3">
              <img src="/logo/shaba-logo.png" alt="Shabas" className="h-8 w-auto object-contain" />
              <span className="font-fredoka text-[20px] text-white tracking-[0.5px]">shabas</span>
            </a>
            <p className="text-[13px] font-semibold text-white/35 leading-[1.6] max-w-[260px] mb-4">{f.brand}</p>
            <div className="flex flex-col gap-1.5 text-[14px] font-bold text-white/55">
              <a href="mailto:shabasfootball@gmail.com" className="hover:text-[#2db355] transition-colors">shabasfootball@gmail.com</a>
              <a href="tel:+237673015993" className="hover:text-[#2db355] transition-colors">+237 673 015 993</a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[1.5px] text-white/35 mb-4">{f.product}</h4>
            {f.productLinks.map((l) => (
              <a key={l} href="#" className="block text-[14px] font-bold text-white/55 mb-2.5 hover:text-[#2db355] transition-colors">{l}</a>
            ))}
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[1.5px] text-white/35 mb-4">{f.company}</h4>
            {f.companyLinks.map((l) => (
              <a key={l} href="#" className="block text-[14px] font-bold text-white/55 mb-2.5 hover:text-[#2db355] transition-colors">{l}</a>
            ))}
          </div>
        </div>

        <div className="h-px mb-6" style={{ background: "rgba(255,255,255,0.06)" }} />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] font-bold text-white/25">
            © {new Date().getFullYear()} {f.copy}
          </p>
          <div className="flex items-center gap-2 text-[12px] font-black text-white/40">
            🌍 {f.madeWith}
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
