import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Search, PlayCircle, Star } from "lucide-react";

const PLAYERS = [
  { name: "Le Noir", position: "Midfielder", rating: 88, image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=200&auto=format&fit=crop " },
  { name: "Sniper 99", position: "Striker", rating: 92, image: "https://images.unsplash.com/photo-1530268729831-4b0b9e170218?q=80&w=200&auto=format&fit=crop" },
  { name: "Lovet Tanze", position: "Defender", rating: 85, image: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=100&auto=format&fit=crop" },
];

const SEARCH_TERMS = ["Lovet Tanze", "Le Noir...", "Sniper 99", "Top Strikers in Cameroon..."];

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Typing Animation State
  const [currentSearchIndex, setCurrentSearchIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const currentTerm = SEARCH_TERMS[currentSearchIndex];

    if (isDeleting) {
      if (displayText === "") {
        setIsDeleting(false);
        setCurrentSearchIndex((prev) => (prev + 1) % SEARCH_TERMS.length);
        timeout = setTimeout(() => { }, 800); // Pause before typing next
      } else {
        timeout = setTimeout(() => {
          setDisplayText(currentTerm.substring(0, displayText.length - 1));
        }, 40); // Deletion speed
      }
    } else {
      if (displayText === currentTerm) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2500); // Pause after typing
      } else {
        timeout = setTimeout(() => {
          setDisplayText(currentTerm.substring(0, displayText.length + 1));
        }, 120); // Typing speed
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentSearchIndex]);

  const features = [
    {
      icon: "/icons/features/discovery/icons8-discovery-100.png",
      title: "Discovery",
      subtitle: "Location-based Finder",
      description: "Find teams in your neighborhood or city. Connect with local football communities instantly.",
      className: "md:col-span-2 lg:col-span-2",
      color: "bg-emerald-500",
    },
    {
      icon: "/icons/features/challenges/icons8-challenge-80.png",
      title: "Challenges",
      subtitle: "Instant Matchmaking",
      description: "Challenge teams and coordinate fixtures without the WhatsApp chaos.",
      className: "md:col-span-1 lg:col-span-1",
      color: "bg-blue-500",
    },
    {
      icon: "/icons/features/ranking/icons8-ranking-96.png",
      title: "Rankings",
      subtitle: "Verified Standings",
      description: "Earn your spot. Fair rankings based on verified match results.",
      className: "md:col-span-1 lg:col-span-1",
      color: "bg-amber-500",
    },
    {
      icon: "/icons/features/portfolio/icons8-portfolio-100.png",
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
                <div className={`w-14 h-14  flex items-center justify-center mb-10  group-hover:scale-110 transition-transform`}>
                  <img src={feature.icon} alt={feature.title} className="w-15 h-15 object-contain" />
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
                    {[
                      "https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=100&auto=format&fit=crop",
                      "https://images.unsplash.com/photo-1579208030886-b937da0925dc?q=80&w=100&auto=format&fit=crop",
                      "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=200&auto=format&fit=crop"
                    ].map((src, i) => (
                      <img key={i} src={src} alt="Scout" className="w-10 h-10 rounded-full border-2 border-white object-cover bg-gray-200" />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-primary">Join 50+ scout networks</span>
                </div>
              </div>
              <div className="relative aspect-video rounded-2xl bg-gray-50 overflow-hidden shadow-inner border border-gray-100">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent flex flex-col items-center justify-center p-6 gap-6">

                  {/* Automated Search Bar with Typing Effect */}
                  <motion.div
                    className="w-full max-w-[280px] h-12 bg-white rounded-full shadow-sm flex items-center px-4 gap-3 border border-gray-200 z-20"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <Search size={18} className="text-gray-400 flex-shrink-0" />
                    <div className="flex-1 font-medium text-gray-700 text-sm overflow-hidden flex items-center">
                      {displayText}
                      <span className="w-0.5 h-4 ml-0.5 bg-primary animate-pulse" />
                    </div>
                  </motion.div>

                  {/* Scrolling Feed of Player Profiles */}
                  <div className="relative w-full max-w-[280px] h-[120px] perspective-1000">
                    <AnimatePresence>
                      {PLAYERS.map((player, i) => (
                        <motion.div
                          key={player.name}
                          className="absolute inset-0 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-gray-100 p-4 flex items-center gap-4 will-change-transform"
                          initial={{ y: 80, opacity: 0, scale: 0.8, rotateX: 20 }}
                          animate={{
                            y: [80, 0, -80],
                            opacity: [0, 1, 0],
                            scale: [0.8, 1, 0.8],
                            rotateX: [20, 0, -20],
                            zIndex: [0, 10, 0]
                          }}
                          transition={{
                            duration: 8,
                            repeat: Infinity,
                            delay: i * (8 / PLAYERS.length),
                            ease: "easeInOut"
                          }}
                        >
                          <img src={player.image} alt={player.name} className="w-14 h-14 rounded-full border-2 border-white shadow-sm object-cover" />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-900 truncate">{player.name}</h4>
                            <p className="text-xs text-gray-500 truncate mb-1">{player.position}</p>
                            <div className="flex items-center gap-1">
                              <Star size={12} className="text-amber-400 fill-amber-400" />
                              <span className="text-xs font-black text-gray-700">{player.rating} RTG</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Decoration Blurs */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full" />
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

