import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

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
        <div className="text-center max-w-4xl mx-auto">
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
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-hero-foreground tracking-tight mb-6"
          >
            The Future of{" "}
            <span className="gradient-text">Grassroots Football</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-hero-muted max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Connect, compete, and get discovered. The platform that brings
            structure, visibility, and opportunity to local football across Africa.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
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
            className="mt-16 grid grid-cols-3 gap-8 max-w-xl mx-auto"
          >
            {[
              { value: "1000+", label: "Teams Joining" },
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

        {/* Abstract Football Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 relative"
        >
          <div className="relative mx-auto w-full max-w-4xl aspect-video rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-white/5 to-transparent">
            {/* Placeholder for app preview/visual */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Abstract football pattern */}
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-2 border-primary/30 flex items-center justify-center animate-float">
                  <div className="w-24 h-24 md:w-36 md:h-36 rounded-full border-2 border-primary/50 flex items-center justify-center">
                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-primary/20 flex items-center justify-center">
                      <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-primary" />
                    </div>
                  </div>
                </div>
                {/* Orbiting dots */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-3 h-3 rounded-full bg-primary animate-pulse" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 w-3 h-3 rounded-full bg-accent animate-pulse delay-300" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-3 h-3 rounded-full bg-primary/70 animate-pulse delay-500" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-3 h-3 rounded-full bg-primary/70 animate-pulse delay-700" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
