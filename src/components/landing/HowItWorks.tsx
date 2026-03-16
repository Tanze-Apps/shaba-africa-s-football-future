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
      className="py-24 md:py-32 px-6 bg-white relative overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-primary/[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-24"
        >
          <div className="section-badge">
            <MapPinned className="w-3 h-3 text-primary" />
            The Journey
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight">
            From signup <br className="hidden md:block" />
            to <span className="pill-highlight">stardom</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mt-6">
            Four simple steps to transform your grassroots football journey.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Connection Line - More modern pulse effect */}
          <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-[2px] bg-gray-100 overflow-hidden">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={isInView ? { x: "100%" } : {}}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-1/2 h-full bg-gradient-to-r from-transparent via-primary/40 to-transparent"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={stepVariants}
                className="relative text-center group"
              >
                {/* Step Icon Container */}
                <div className="relative inline-block mb-10">
                  <div className="w-28 h-28 rounded-[2.5rem] bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:bg-primary/5 group-hover:border-primary/20 group-hover:rounded-3xl transition-all duration-500 shadow-sm relative z-10">
                    <step.icon className="w-12 h-12 text-primary" />
                  </div>
                  <motion.span
                    variants={numberVariants}
                    className="absolute -top-3 -right-3 w-10 h-10 rounded-2xl bg-white text-primary text-base font-black flex items-center justify-center shadow-lg border border-gray-100 z-20 group-hover:scale-110 transition-transform"
                  >
                    {step.number}
                  </motion.span>
                </div>

                <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-gray-500 font-medium leading-relaxed px-4">
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
