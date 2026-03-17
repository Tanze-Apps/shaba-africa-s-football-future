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
    const duration = 1200;
    let animationFrame = 0;
    let startTime: number | null = null;

    const animate = (time: number) => {
      if (startTime === null) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
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
      initial={{ opacity: 0, y: 16 }}
      animate={start ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="text-center sm:text-left"
    >
      <div className="text-3xl md:text-4xl font-bold text-hero-foreground">
        {stat.displayOverride ?? display}
        {stat.suffix}
      </div>
      <div className="text-hero-muted text-sm mt-1">{stat.label}</div>
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
      className={`min-h-screen flex items-center justify-center relative pt-28 pb-16 md:pt-36 md:pb-24 px-6 transition-colors duration-700 ${
        videoStage === "hidden" ? "bg-[#f7f7f7]" : "bg-black"
      }`}
    >
      {/* Background Video */}
      {videoStage !== "hidden" && (
        <div
          className={`absolute inset-0 overflow-hidden transition-opacity duration-700 ${
            videoStage === "ended"
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
        </div>
      )}

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 12 }}
        animate={videoStage === "hidden" ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={videoStage === "hidden" ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-black/5 bg-white shadow-sm mb-6 md:mb-10"
          >
            <span className="w-2 h-2 rounded-full bg-[#00D084] animate-pulse" />
            <span className="text-gray-600 text-xs md:text-sm font-medium">
              Launching Soon in Cameroon
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={videoStage === "hidden" ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 tracking-tight mb-6 md:mb-8 leading-[1.1] px-2 md:px-0"
          >
            The Future of{" "}
            <br className="hidden md:block" />
            <span className="pill-highlight">Grassroots</span>{" "}
            <span className="pill-highlight">Football</span>
            <br className="hidden md:block" />
             across Africa
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={videoStage === "hidden" ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-2xl text-gray-500 max-w-2xl mb-8 md:mb-12 leading-relaxed px-4 md:px-0"
          >
            Connect, compete, and get discovered. The #1 platform bringing
            structure, visibility, and opportunity to local football.
          </motion.p>

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
          <motion.div
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
          </motion.div>

          {/* Stats Section moved below for better flow */}
          <div
            ref={statsRef}
            className="mt-16 md:mt-24 grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-24 items-center justify-center"
          >
            {stats.map((stat, index) => (
              <StatCard
                key={stat.label}
                stat={stat}
                start={statsInView}
                delay={index * 120}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
