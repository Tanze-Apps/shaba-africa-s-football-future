import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { X, Check, ArrowRight, AlertCircle, Eye, Calendar, Trophy, Zap, ShieldCheck } from "lucide-react";

const ProblemSolution = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const problems = [
    { icon: AlertCircle, text: "Disorganized leagues & static data" },
    { icon: Eye, text: "Hidden talent with zero visibility" },
    { icon: Calendar, text: "The chaos of WhatsApp scheduling" },
  ];

  const solutions = [
    { icon: ShieldCheck, text: "Verified, automated league management" },
    { icon: Zap, text: "Global exposure for every player" },
    { icon: Trophy, text: "Data-driven rankings & verified stats" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section ref={ref} className="py-20 md:py-32 px-6 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-primary/[0.03] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-destructive/[0.02] blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="section-badge mx-auto">
            <Zap className="w-3 h-3 text-primary" />
            The Evolution
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-[1.1]">
            From <span className="text-gray-400 italic">Fragmented</span> <br />
            to <span className="pill-highlight">Unified</span>
          </h2>
        </motion.div>

        {/* Transformation Container */}
        <div className="relative grid lg:grid-cols-11 gap-4 items-center">
          
          {/* Left Side: The Friction (Problem) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500/10 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative p-8 md:p-12 rounded-[2.5rem] bg-gray-50/50 border border-gray-100 shadow-sm overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-5">
                  <X size={120} className="text-destructive stroke-[3px]" />
               </div>
               
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                  <span className="text-red-600 text-[10px] font-black uppercase tracking-widest">The Friction</span>
               </div>
               
               <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-6 leading-tight">
                  Status Quo: <br />
                  <span className="text-gray-400 font-bold">Inefficient & Disconnected</span>
               </h3>
               
               <div className="space-y-4">
                  {problems.map((problem, i) => (
                    <div key={i} className="flex items-center gap-4 text-gray-500 font-medium">
                      <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center flex-shrink-0">
                        <X size={14} className="text-red-300" />
                      </div>
                      <span className="text-sm md:text-base">{problem.text}</span>
                    </div>
                  ))}
               </div>
            </div>
          </motion.div>

          {/* Center Bridge (Arrow) */}
          <div className="lg:col-span-1 flex flex-col items-center justify-center py-8 lg:py-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl shadow-primary/40 relative z-20 group"
            >
              <ArrowRight className="w-6 h-6 lg:rotate-0 rotate-90 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
            </motion.div>
          </div>

          {/* Right Side: The Flow (Solution) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-5 relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-l from-primary/20 to-transparent blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="relative p-8 md:p-12 rounded-[2.5rem] bg-white border-2 border-primary/20 shadow-2xl shadow-primary/5 overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-5">
                  <ShieldCheck size={120} className="text-primary stroke-[3px]" />
               </div>

               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-primary text-[10px] font-black uppercase tracking-widest">The Flow</span>
               </div>
               
               <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-6 leading-tight">
                  Shaba Vision: <br />
                  <span className="text-primary">Optimized & Scalable</span>
               </h3>
               
               <div className="space-y-4">
                  {solutions.map((solution, i) => (
                    <motion.div 
                      key={i} 
                      className="flex items-center gap-4 text-gray-900 font-bold"
                      initial={{ opacity: 0, x: 10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.6 + i * 0.1 }}
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <solution.icon size={18} className="text-primary" />
                      </div>
                      <span className="text-sm md:text-base">{solution.text}</span>
                    </motion.div>
                  ))}
               </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
