import { motion, useInView, useSpring, useTransform, useMotionValue } from "framer-motion";
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

const InteractiveBall = ({
  className,
  mouseX,
  mouseY,
  baseX,
  baseY,
  size = 120,
}: {
  className?: string;
  mouseX: any;
  mouseY: any;
  baseX: number;
  baseY: number;
  size?: number;
}) => {
  const ballRef = useRef<HTMLImageElement>(null);

  // Create physics springs for smooth movement
  const springX = useSpring(baseX, { stiffness: 40, damping: 15, mass: 1 });
  const springY = useSpring(baseY, { stiffness: 40, damping: 15, mass: 1 });

  // Rotation transforms based on movement
  const rotate = useTransform(springX, [0, window.innerWidth], [0, 720]);

  useEffect(() => {
    const handleMouseMove = () => {
      if (!ballRef.current) return;

      const rect = ballRef.current.getBoundingClientRect();
      const ballCenterX = rect.left + rect.width / 2;
      const ballCenterY = rect.top + rect.height / 2;

      const currentMouseX = mouseX.get();
      const currentMouseY = mouseY.get();

      // Calculate distance from cursor to ball
      const dx = ballCenterX - currentMouseX;
      const dy = ballCenterY - currentMouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Avoidance threshold and force calculation
      const threshold = 250;

      if (distance < threshold && distance > 0) {
        // Apply repulsive force inversely proportional to distance
        const force = (threshold - distance) / threshold;
        const pushX = (dx / distance) * force * 150;
        const pushY = (dy / distance) * force * 150;

        // Push the ball away
        springX.set(baseX + pushX);
        springY.set(baseY + pushY);
      } else {
        // Return to base position
        springX.set(baseX);
        springY.set(baseY);
      }
    };

    // React to continuous mouse changes
    const unsubscribeX = mouseX.onChange(handleMouseMove);
    const unsubscribeY = mouseY.onChange(handleMouseMove);

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [mouseX, mouseY, baseX, baseY, springX, springY]);

  // Floating animation offset to combine with physics
  const floatY = useSpring(0, { stiffness: 20, damping: 10 });

  useEffect(() => {
    // Add a gentle idle floating effect
    const interval = setInterval(() => {
      floatY.set(Math.sin(Date.now() / 1000) * 15);
    }, 50);
    return () => clearInterval(interval);
  }, [floatY]);

  // Combine base position, physics, and float
  const renderX = useTransform(() => springX.get() - size / 2);
  const renderY = useTransform(() => springY.get() + floatY.get() - size / 2);

  return (
    <motion.img
      ref={ballRef}
      src="/icons/soccer.png"
      className={`absolute opacity-90 drop-shadow-2xl z-0 ${className}`}
      style={{
        left: renderX,
        top: renderY,
        width: size,
        height: size,
        rotate,
        cursor: 'default'
      }}
      alt="Interactive Soccer Ball"
    />
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

  // Track mouse coordinates for interactive elements
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Initialize ball positions based on screen size (handled in effect to ensure window exists)
  const [ballPositions, setBallPositions] = useState({ leftX: 200, leftY: 200, rightX: 800, rightY: 400 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleResize = () => {
      setBallPositions({
        leftX: window.innerWidth * 0.15,
        leftY: window.innerHeight * 0.3,
        rightX: window.innerWidth * 0.85,
        rightY: window.innerHeight * 0.6,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // Initial position
    handleResize();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [mouseX, mouseY]);

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
      className={`min-h-screen flex items-center justify-center relative pt-20 pb-16 md:pb-24 px-6 transition-colors duration-700 ${videoStage === "hidden" ? "bg-background" : "bg-black"
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
          {/* Placeholder Image for Slow Connections */}
          <div
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 filter blur-sm transition-opacity duration-700 ${videoReady ? "opacity-0" : "opacity-100"}`}
            style={{
              backgroundImage: "url('/icons/how-it-works/discover-teams-nearby/icons8-map-96.png')", // Fallback pattern or placeholder
              backgroundColor: "#111" // Dark fallback
            }}
          >
            {/* Spinning Soccer Ball Loader */}
            {!videoReady && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                <motion.img
                  src="/icons/soccer.png"
                  alt="Loading..."
                  className="w-16 h-16 opacity-80"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="text-white/80 font-bold text-sm md:text-base mt-6 tracking-[0.2em] uppercase"
                >
                  Loading Experience
                </motion.div>
              </div>
            )}
          </div>
          <video
            className="h-full w-full object-cover scale-110 relative z-10"
            src={heroVideo}
            autoPlay
            muted
            playsInline
            loop={false}
            preload="auto"
            onLoadedData={() => setVideoReady(true)}
            onEnded={() => setVideoStage("ended")}
            onError={() => setVideoStage("hidden")}
          />
        </div>
      )}

      {/* Background Effects (Only visible when video is hidden) */}
      {videoStage === "hidden" && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />

          {/* Interactive Soccer Balls */}
          <div className="hidden md:block">
            <InteractiveBall
              mouseX={mouseX}
              mouseY={mouseY}
              baseX={ballPositions.leftX}
              baseY={ballPositions.leftY}
              size={140}
            />
            <InteractiveBall
              mouseX={mouseX}
              mouseY={mouseY}
              baseX={ballPositions.rightX}
              baseY={ballPositions.rightY}
              size={180}
            />
          </div>

          {/* Static decoration for mobile */}
          <motion.img
            src="/icons/soccer.png"
            className="md:hidden absolute right-[-10%] top-[20%] w-32 h-32 opacity-40 blur-[1px]"
            animate={{ rotate: 360, y: [0, -20, 0] }}
            transition={{ rotate: { duration: 30, repeat: Infinity, ease: "linear" }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
            alt="Soccer Ball Decoration"
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
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-gray-600  text-xs md:text-sm font-medium">
              Web Version Now Live
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
            <a href="https://app.sha-bas.com" className="btn-primary w-full sm:w-auto text-base md:text-lg px-8 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl bg-primary hover:opacity-90 text-white font-bold shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2">
              Launch Web App
              <ArrowRight size={20} className="stroke-[3px]" />
            </a>
            <a href="#waitlist" className="btn-secondary w-full sm:w-auto text-base md:text-lg px-8 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl border-2 border-gray-200 text-gray-700 bg-white hover:bg-gray-50 font-bold transition-all flex items-center justify-center">
              Join the Mobile Waitlist
            </a>
          </motion.div>

          {/* Store Icons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={videoStage === "hidden" ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 flex flex-col items-center gap-4"
          >
            <span className="text-gray-400 text-xs font-black uppercase tracking-widest">Available soon on</span>
            <div className="flex items-center gap-6">
              <div className="group relative">
                <div className="absolute inset-0 bg-black/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 scale-90" />
                <img
                  src="/icons/playstore.png"
                  alt="Play Store"
                  className="h-13  w-auto contrast-125 drop-shadow-[0_10px_15px_rgba(0,0,0,0.7)] hover:-translate-y-2 transition-all duration-300 cursor-pointer relative z-10"
                />
              </div>
              <div className="group relative">
                <div className="absolute inset-0 bg-black/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 scale-90" />
                <img
                  src="/icons/appstore.png"
                  alt="App Store"
                  className="h-13  w-auto contrast-125 drop-shadow-[0_10px_15px_rgba(0,0,0,0.7)] hover:-translate-y-2 transition-all duration-300 cursor-pointer relative z-10"
                />
              </div>
            </div>
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
