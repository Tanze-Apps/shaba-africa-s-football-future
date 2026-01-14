import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, Shield, Sparkles } from "lucide-react";

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
    <section ref={ref} className="py-24 md:py-32 px-6 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="africa-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#africa-pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Our Vision
            </span>
            <h2 className="section-heading mt-4 mb-6">
              Building the digital infrastructure for{" "}
              <span className="gradient-text">African football</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              We believe every talented player deserves to be seen. Every team
              deserves fair competition. Every community deserves the tools to
              organize and grow.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-10">
              Shaba.cm is more than a platform — it's a movement to professionalize
              grassroots football across Africa, starting with Cameroon. We're
              creating the pathways that connect local talent to global
              opportunities.
            </p>

            {/* Values */}
            <div className="space-y-4">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <value.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{value.title}</h4>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
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
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Abstract Africa-inspired visual */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
              
              {/* Concentric circles representing connection */}
              <div className="absolute inset-8 rounded-full border border-primary/10 animate-pulse" />
              <div className="absolute inset-16 rounded-full border border-primary/20" />
              <div className="absolute inset-24 rounded-full border border-primary/30" />
              <div className="absolute inset-32 rounded-full bg-primary/5 flex items-center justify-center">
                <div className="text-center">
                  <Globe className="w-12 h-12 text-primary mx-auto mb-2" />
                  <span className="text-sm font-medium text-foreground">Africa</span>
                </div>
              </div>

              {/* Floating dots representing cities/teams */}
              <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-primary animate-pulse" />
              <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-accent animate-pulse delay-300" />
              <div className="absolute bottom-1/3 left-1/3 w-2.5 h-2.5 rounded-full bg-primary/70 animate-pulse delay-500" />
              <div className="absolute bottom-1/4 right-1/3 w-2 h-2 rounded-full bg-primary animate-pulse delay-700" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrustVision;
