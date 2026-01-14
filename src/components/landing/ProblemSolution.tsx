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
    <section ref={ref} className="py-24 md:py-32 px-6 bg-background relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            The Challenge
          </span>
          <h2 className="section-heading mt-4">
            Grassroots football deserves better
          </h2>
        </motion.div>

        {/* Problem → Solution Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          {/* Problems */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <X className="w-5 h-5 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                The Problems
              </h3>
            </div>
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-start gap-4 p-5 rounded-xl bg-secondary/50 border border-border"
              >
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                  <problem.icon className="w-5 h-5 text-destructive" />
                </div>
                <p className="text-muted-foreground pt-2">{problem.text}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Solutions */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Check className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                The Shaba Solution
              </h3>
            </div>
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-start gap-4 p-5 rounded-xl bg-primary/5 border border-primary/20"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <solution.icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-foreground pt-2">{solution.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
