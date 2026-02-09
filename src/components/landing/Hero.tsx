import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import heroMockup from "../../assets/mockup2.png";

const Hero = () => {
  return (
    <section className="hero-section min-h-screen flex items-center justify-center relative pt-24 pb-20 px-6">
      {/* Background Effects */}
      <div className="hero-glow" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="text-center lg:text-left max-w-4xl mx-auto lg:mx-0">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-8"
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
            <a href="#how-it-works" className="btn-secondary text-lg px-8 py-4">
              <Play size={20} />
              How It Works
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-xl mx-auto lg:mx-0"
          >
            {[
              { value: "10+", label: "Teams Joining Aleardy" },
              { value: "10+", label: "Cities" },
              { value: "∞", label: "Possibilities" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-hero-foreground">
                  {stat.value}
                </div>
                <div className="text-hero-muted text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
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
      </div>
    </section>
  );
};

export default Hero;
