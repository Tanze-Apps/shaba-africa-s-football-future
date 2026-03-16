import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { X, Check, AlertCircle, Eye, Calendar, Trophy } from "lucide-react";

const ProblemSolution = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const problems = [
    { icon: AlertCircle, text: "Disorganized grassroots football leagues" },
    { icon: Eye, text: "No visibility for local talent" },
    { icon: Calendar, text: "Difficulty finding and scheduling matches" },
    { icon: Trophy, text: "No rankings or credibility system" },
  ];

  const solutions = [
    { icon: Calendar, text: "Structured matches with verified results" },
    { icon: Trophy, text: "Rankings by location and performance" },
    { icon: Eye, text: "Talent visibility for scouts and academies" },
    { icon: Check, text: "Digital infrastructure for growth" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <div className="section-badge">
            <AlertCircle className="w-3 h-3 text-primary" />
            The Challenge
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight">
            Grassroots football <br className="hidden md:block" />
            deserves <span className="pill-highlight">better</span>
          </h2>
        </motion.div>

        {/* Problem → Solution Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Problems */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-3 mb-4 px-2">
              <div className="w-10 h-10 rounded-xl bg-destructive/5 flex items-center justify-center">
                <X className="w-5 h-5 text-destructive" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                The Pain Points
              </h3>
            </div>
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-center gap-4 p-5 rounded-2xl bg-gray-50/50 border border-gray-100 hover:border-destructive/20 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <problem.icon className="w-5 h-5 text-gray-400 group-hover:text-destructive transition-colors" />
                </div>
                <p className="text-gray-600 font-medium">{problem.text}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Solutions */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-3 mb-4 px-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Check className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                The Shaba Advantage
              </h3>
            </div>
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-center gap-4 p-5 rounded-2xl bg-primary/[0.02] border border-primary/10 hover:border-primary/30 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <solution.icon className="w-5 h-5 text-primary/40 group-hover:text-primary transition-colors" />
                </div>
                <p className="text-gray-900 font-semibold">{solution.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
