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
    <section className="hero-section min-h-screen flex items-center justify-center relative pt-24 pb-20 px-6">
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
      {/* Background Effects */}
      <div className="hero-glow" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 12 }}
        animate={videoStage === "hidden" ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="text-center lg:text-left max-w-4xl mx-auto lg:mx-0">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex mt-5 items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-primary text-sm font-medium">
              Launching Soon in Cameroon
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-6xl xl:text-7xl font-bold text-hero-foreground tracking-tight mb-6"
          >
            The Future of{" "}
            <span className="gradient-text">Grassroots Football</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-hero-muted max-w-2xl lg:mx-0 mb-10 leading-relaxed"
          >
            Connect, compete, and get discovered. The platform that brings
            structure, visibility, and opportunity to local football across
            Africa.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4"
          >
            <a href="#waitlist" className="btn-primary text-lg px-8 py-4">
              Join the Waitlist
              <ArrowRight size={20} />
            </a>
            <a href="#how-it-works" className="hidden md:flex btn-secondary text-lg px-8 py-4">
              <Play size={20} />
              How It Works
            </a>
          </motion.div>

          {/* Stats */}
          <div
            ref={statsRef}
            className="mt-12 grid grid-cols-3 sm:grid-cols-3 gap-6 sm:gap-8 max-w-xl mx-auto lg:mx-0"
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

        {/* Product Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
          transition={{
            opacity: { duration: 0.8, delay: 0.5 },
            scale: { duration: 0.8, delay: 0.5 },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          }}
          className="relative"
        >
          <div className="relative mx-auto w-full max-w-7xl aspect-video overflow-hidden">
            <img
              src={heroMockup}
              alt="Shaba platform mockup"
              className="absolute inset-0 h-full w-full object-contain"
              loading="lazy"
            />
          </div>
        </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
