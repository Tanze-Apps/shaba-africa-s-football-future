import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Swords, Trophy, User, Search, PlayCircle } from "lucide-react";

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: MapPin,
      title: "Discovery",
      subtitle: "Location-based Finder",
      description: "Find teams in your neighborhood or city. Connect with local football communities instantly.",
      className: "md:col-span-2 lg:col-span-2",
      color: "bg-emerald-500",
    },
    {
      icon: Swords,
      title: "Challenges",
      subtitle: "Instant Matchmaking",
      description: "Challenge teams and coordinate fixtures without the WhatsApp chaos.",
      className: "md:col-span-1 lg:col-span-1",
      color: "bg-blue-500",
    },
    {
      icon: Trophy,
      title: "Rankings",
      subtitle: "Verified Standings",
      description: "Earn your spot. Fair rankings based on verified match results.",
      className: "md:col-span-1 lg:col-span-1",
      color: "bg-amber-500",
    },
    {
      icon: User,
      title: "Profiles",
      subtitle: "Digital Portfolio",
      description: "Build your profile. Track goals, assists, and appearances across all matches.",
      className: "md:col-span-2 lg:col-span-2",
      color: "bg-indigo-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="features" ref={ref} className="px-6 bg-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: `radial-gradient(#000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="section-badge mx-auto">
            <PlayCircle className="w-3 h-3 text-primary" />
            Product Suite
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-[1.1]">
            Powerful tools for <br />
            the <span className="pill-highlight">Next Gen</span> of play
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              className={`group relative rounded-[2.5rem] p-8 md:p-10 overflow-hidden border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 ${feature.className}`}
            >
              {/* Card Decor */}
              <div className={`absolute top-0 right-0 w-32 h-32 ${feature.color} opacity-0 group-hover:opacity-[0.07] blur-3xl transition-opacity -mr-10 -mt-10`} />

              <div className="relative z-10 h-full flex flex-col">
                <div className={`w-14 h-14 rounded-2xl ${feature.color} text-white flex items-center justify-center mb-10 shadow-lg shadow-black/5 group-hover:scale-110 transition-transform`}>
                  <feature.icon size={28} strokeWidth={2.5} />
                </div>

                <div className="mt-auto">
                  <span className="text-gray-400 text-xs font-black uppercase tracking-widest mb-2 block">{feature.subtitle}</span>
                  <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-500 font-medium leading-relaxed max-w-sm text-sm md:text-base">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Featured Bento Item (Scouts) */}
          <motion.div
            variants={cardVariants}
            className="md:col-span-3 group relative rounded-[2.5rem] p-8 md:p-12 overflow-hidden border border-primary/20 bg-primary/[0.02] hover:bg-white hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-primary text-[10px] font-black uppercase tracking-widest">Global Network</span>
                </div>
                <h3 className="text-2xl md:text-4xl font-black text-gray-900 mb-6">Discovery Platform</h3>
                <p className="text-gray-600 text-base md:text-lg font-medium leading-relaxed max-w-md mb-8">
                  Get noticed by scouts and academies looking for the next generation of football talent. Your CV, verified and global.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200" />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-primary">Joining 50+ scout networks</span>
                </div>
              </div>
              <div className="relative aspect-video rounded-2xl bg-gray-200 overflow-hidden shadow-2xl">
                {/* Placeholder for a scout UI element or visual */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Search className="text-primary/40 w-24 h-24" strokeWidth={1} />
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg border border-white/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10" />
                      <div>
                        <div className="h-3 w-24 bg-gray-200 rounded mb-1" />
                        <div className="h-2 w-16 bg-gray-100 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
