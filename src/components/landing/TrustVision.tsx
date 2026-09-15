import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, Shield, Sparkles } from "lucide-react";
import visionMockup from "../../assets/mockup1.webp";

const TrustVision = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const values = [
    {
      icon: Shield,
      title: "Fairness",
      description: "Every match result is verified by both teams. No disputes, no bias.",
    },
    {
      icon: Globe,
      title: "Transparency",
      description: "Open rankings, public stats, and clear criteria for everyone.",
    },
    {
      icon: Sparkles,
      title: "Opportunity",
      description: "Creating pathways for talent to be seen, regardless of where they play.",
    },
  ];

  return (
    <section ref={ref} className="py-20 md:py-32 px-6 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-primary/[0.03] blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="section-badge">
              <Sparkles className="w-3 h-3 text-primary" />
              Our Vision
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight mb-6 md:mb-8">
              Building the digital <br className="hidden md:block" />
              infrastructure for <span className="pill-highlight">African</span> football
            </h2>
            <p className="text-lg md:text-xl text-gray-500 leading-relaxed mb-6 md:mb-8 font-medium">
              We believe every talented player deserves to be seen. Every team
              deserves fair competition. Every community deserves the tools to
              organize and grow.
            </p>
            <p className="text-gray-400 text-sm md:text-base font-medium leading-relaxed mb-10 md:mb-12">
              Shabas is more than a platform — it's a movement to professionalize
              grassroots football across the continent. We're
              creating the pathways that connect local talent to global
              opportunities using data and technology.
            </p>

            {/* Values */}
            <div className="grid sm:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex flex-col gap-4"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <value.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-base md:text-lg font-black text-gray-900 tracking-tight mb-0.5 md:mb-1">{value.title}</h4>
                    <p className="text-gray-400 text-[13px] md:text-sm font-medium leading-snug">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full max-w-lg mx-auto aspect-square">
              {/* Decorative Circles */}
              <div className="absolute -inset-4 border border-primary/10 rounded-full animate-[spin_20s_linear_infinite] pointer-events-none" />
              <div className="absolute -inset-12 border border-primary/5 rounded-full animate-[spin_30s_linear_infinite_reverse] pointer-events-none" />

              <div className="relative h-full w-full bg-gradient-to-tr from-primary/5 to-transparent rounded-full flex items-center justify-center p-8 md:p-12">
                <img
                  src={visionMockup}
                  alt="Shaba platform vision mockup"
                  className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrustVision;
