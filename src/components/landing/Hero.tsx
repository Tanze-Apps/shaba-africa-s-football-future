import { motion, useInView } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import heroVideo from "../../assets/hero-video.mp4";
import heroMockup from "../../assets/mockup2.png";

type Stat = {
  value: number;
  label: string;
  suffix?: string;
  displayOverride?: string;
};

const FloatingDecoration = ({
  className,
  delay = 0,
  duration = 20
}: {
  className: string;
  delay?: number;
  duration?: number
}) => {
  return (
    <motion.div
      initial={{ y: 0, x: 0, rotate: 0 }}
      animate={{
        y: [0, -40, 0],
        x: [0, 20, 0],
        rotate: [0, 360],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
        delay
      }}
      className={`absolute pointer-events-none opacity-60 blur-[0.5px] ${className}`}
    >
      <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.5" />
        <path d="M50 2L30 35L50 68L70 35L50 2Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="0.5" />
        <path d="M30 35L2 50L30 65" stroke="currentColor" strokeWidth="0.5" />
        <path d="M70 35L98 50L70 65" stroke="currentColor" strokeWidth="0.5" />
        <path d="M50 68L50 98" stroke="currentColor" strokeWidth="0.5" />
        <path d="M30 65L50 98L70 65" stroke="currentColor" strokeWidth="0.5" />
        <path d="M2 50L50 2L98 50L50 98L2 50Z" stroke="currentColor" strokeWidth="0.5" />
      </svg>
    </motion.div>
  );
};

const StatCard = ({
  stat,
  start,
  delay = 0,
}: {
  stat: Stat;
  start: boolean;
  delay?: number;
}) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!start || stat.displayOverride) return;
    const duration = 2000;
    let animationFrame = 0;
    let startTime: number | null = null;

    const animate = (time: number) => {
      if (startTime === null) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const nextValue = Math.round(stat.value * eased);
      setDisplay(nextValue);
      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(animate);
      }
    };

    const timeout = window.setTimeout(() => {
      animationFrame = window.requestAnimationFrame(animate);
    }, delay);

    return () => {
      window.clearTimeout(timeout);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [delay, start, stat.displayOverride, stat.value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={start ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: delay / 1000 }}
      className="flex flex-col items-center sm:items-start group"
    >
      <div className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter mb-1 transition-transform group-hover:scale-105 duration-300">
        <span className="text-primary">{stat.displayOverride ?? display}</span>
        {stat.suffix && <span className="text-gray-300 ml-1">{stat.suffix}</span>}
      </div>
      <div className="text-gray-400 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] leading-none">
        {stat.label}
      </div>
    </motion.div>
  );
};

const Hero = () => {
  const [videoStage, setVideoStage] = useState<"playing" | "ended" | "hidden">(
    "playing"
  );
  const [videoReady, setVideoReady] = useState(false);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-20%" });

  const stats: Stat[] = [
    { value: 10, suffix: "+", label: "Teams Joining Already" },
    { value: 10, suffix: "+", label: "Cities" },
    { value: 0, displayOverride: "∞", label: "Possibilities" },
  ];

  useEffect(() => {
    if (videoStage !== "ended") return;
    const timeout = window.setTimeout(() => {
      setVideoStage("hidden");
    }, 600);
    return () => window.clearTimeout(timeout);
  }, [videoStage]);

  return (
    <section
      className={`min-h-screen flex items-center justify-center relative pt-20 pb-16 md:pb-24 px-6 transition-colors duration-700 ${videoStage === "hidden" ? "bg-[#f7f7f7]" : "bg-black"
        }`}
    >
      {/* Background Video */}
      {videoStage !== "hidden" && (
        <div
          className={`absolute inset-0 overflow-hidden transition-opacity duration-700 ${videoStage === "ended"
            ? "opacity-0"
            : videoReady
              ? "opacity-100"
              : "opacity-0"
            }`}
        >
          <video
            className="h-full w-full object-cover scale-110"
            src={heroVideo}
            autoPlay
            muted
            playsInline
            preload="metadata"
            onLoadedData={() => setVideoReady(true)}
            onEnded={() => setVideoStage("ended")}
            onError={() => setVideoStage("hidden")}
          />
        </div>
      )}

      {/* Background Effects (Only visible when video is hidden) */}
      {videoStage === "hidden" && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />

          {/* Floating Decorations */}
          <FloatingDecoration
            className="top-[15%] left-[5%] w-24 h-24 text-primary md:w-32 md:h-32"
            delay={0}
            duration={25}
          />
          <FloatingDecoration
            className="top-[25%] right-[5%] w-40 h-40 text-gray-300 md:w-56 md:h-56"
            delay={2}
            duration={35}
          />
          <FloatingDecoration
            className="bottom-[30%] left-[10%] w-48 h-48 text-primary/40 md:w-72 md:h-72"
            delay={5}
            duration={45}
          />
          <FloatingDecoration
            className="bottom-[10%] right-[15%] w-32 h-32 text-gray-200 md:w-48 md:h-48"
            delay={8}
            duration={30}
          />
          <FloatingDecoration
            className="top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] text-primary/5 hidden md:block"
            delay={0}
            duration={60}
          />
        </div>
      )}

      <motion.div
        className="max-w-7xl mx-auto relative z-10 pt-15"
        initial={{ opacity: 0, y: 12 }}
        animate={videoStage === "hidden" ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex flex-col  items-center text-center max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={videoStage === "hidden" ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 mt-10 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-black/5 bg-white shadow-sm mb-6 md:mb-10"
          >
            <span className="w-2 h-2 rounded-full bg-[#00D084] animate-pulse" />
            <span className="text-gray-600  text-xs md:text-sm font-medium">
              Launching Soon in Cameroon
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={videoStage === "hidden" ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight mb-6 md:mb-8 leading-[1.1] px-2 md:px-0"
          >
            The Future of{" "}
            <br className="hidden md:block" />
            <span className="pill-highlight">Grassroots</span>{" "}
            <span className="pill-highlight">Football</span>
            <br className="hidden md:block" />
            across Africa
          </motion.h1>

          {/* Subheadline */}
          {/* Subheadline */}
          <motion.div
            initial="hidden"
            animate={videoStage === "hidden" ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15, delayChildren: 0.3 }
              }
            }}
            className="text-base md:text-xl text-gray-500 max-w-3xl mb-8 md:mb-12 leading-relaxed px-4 md:px-0"
          >
            <div className="flex flex-wrap justify-center gap-x-2 md:gap-x-3 mb-3 md:mb-4">
              {["Connect.", "Compete.", "Get Discovered."].map((text, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
                    visible: { opacity: 1, y: 0, filter: "blur(0px)" }
                  }}
                  className="font-black text-gray-900"
                >
                  {text}
                </motion.span>
              ))}
            </div>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-gray-500"
            >
              The <span className="pill-highlight">#1</span> platform built to bring
              professional structure and global visibility to every local talent.
            </motion.p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={videoStage === "hidden" ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-5 w-full sm:w-auto px-6 sm:px-0"
          >
            <a href="#waitlist" className="btn-primary w-full sm:w-auto text-base md:text-lg px-8 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl bg-[#00D084] hover:bg-[#00b975] text-white font-bold shadow-xl shadow-green-500/20 transition-all flex items-center justify-center gap-2">
              Join the Waitlist
              <ArrowRight size={20} className="stroke-[3px]" />
            </a>
            <a href="#how-it-works" className="btn-secondary w-full sm:w-auto text-base md:text-lg px-8 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl border-2 border-gray-200 text-gray-700 bg-white hover:bg-gray-50 font-bold transition-all flex items-center justify-center">
              How It Works
            </a>
          </motion.div>

          {/* Product Mockup - Simplified for clean blend */}
          {/* <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={videoStage === "hidden" ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="mt-12 md:mt-16 relative w-full max-w-4xl mx-auto px-4 sm:px-0"
          >
            <div className="relative flex justify-center">
              <img
                src={heroMockup}
                alt="Shaba platform mockup"
                className="w-full h-auto object-contain drop-shadow-sm"
                loading="lazy"
              />
            </div>
          </motion.div> */}

          {/* Stats Section with Glass Container */}
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 30 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 md:mt-32 w-full max-w-5xl mx-auto"
          >
            <div className="relative p-6 md:p-12 rounded-[2rem] md:rounded-[3.5rem] bg-white border border-gray-100 shadow-2xl shadow-black/[0.02] overflow-hidden group">
              {/* Accent Background */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 transition-transform group-hover:scale-110 duration-700" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gray-50 rounded-full blur-3xl -ml-24 -mb-24" />

              <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-20 items-center justify-between">
                {stats.map((stat, index) => (
                  <div key={stat.label} className="flex justify-center">
                    <StatCard
                      stat={stat}
                      start={statsInView}
                      delay={index * 150}
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
