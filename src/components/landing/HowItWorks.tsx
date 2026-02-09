import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { UserPlus, MapPinned, Swords, TrendingUp } from "lucide-react";

const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      number: "01",
      icon: UserPlus,
      title: "Create Your Profile",
      description:
        "Sign up as a player or register your team. Add your location, photos, and playing style.",
    },
    {
      number: "02",
      icon: MapPinned,
      title: "Discover Teams Nearby",
      description:
        "Browse teams in your area. Filter by location, skill level, and availability.",
    },
    {
      number: "03",
      icon: Swords,
      title: "Challenge & Play",
      description:
        "Send match challenges, agree on terms, and play. Both teams verify the result.",
    },
    {
      number: "04",
      icon: TrendingUp,
      title: "Build Your Ranking",
      description:
        "Win matches, climb the leaderboard, and get noticed by scouts and academies.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.18, delayChildren: 0.05 },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const numberVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.4 } },
  };

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="py-24 md:py-32 px-6 bg-background"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-[0.2em]">
            How It Works
          </span>
          <h2 className="section-heading mt-4">
            From signup to <span className="gradient-text">stardom</span>
          </h2>
          <p className="section-subheading mx-auto mt-4">
            Four simple steps to transform your football journey.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Connection Line */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0.8 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hidden lg:block absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent origin-center"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={stepVariants}
                whileHover={{ y: -6 }}
                className="relative text-center group"
              >
                {/* Step Number */}
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-secondary/70 border border-border/60 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/30 transition-colors">
                    <step.icon className="w-9 h-9 text-primary" />
                  </div>
                  <motion.span
                    variants={numberVariants}
                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shadow-sm"
                  >
                    {step.number}
                  </motion.span>
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
