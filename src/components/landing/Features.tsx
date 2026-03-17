import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Swords, Trophy, User, Search } from "lucide-react";

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: MapPin,
      title: "Location-based Team Discovery",
      description:
        "Find teams in your neighborhood, city, or region. Connect with local football communities instantly.",
      color: "primary",
    },
    {
      icon: Swords,
      title: "Match Challenges & Scheduling",
      description:
        "Challenge teams, schedule matches, and coordinate fixtures all in one place. No more WhatsApp chaos.",
      color: "primary",
    },
    {
      icon: Trophy,
      title: "Rankings & Leaderboards",
      description:
        "Earn your spot on the leaderboard. Fair rankings based on match results, verified by both teams.",
      color: "accent",
    },
    {
      icon: User,
      title: "Player Profiles & Stats",
      description:
        "Build your football CV. Track goals, assists, and appearances across all your matches.",
      color: "primary",
    },
    {
      icon: Search,
      title: "Scout Discovery",
      description:
        "Get noticed by scouts and academies looking for the next generation of talent.",
      badge: "Coming Soon",
      color: "muted",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      id="features"
      ref={ref}
      className="py-20 md:py-32 px-6 bg-[#f7f7f7] relative overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-primary/[0.03] blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-20"
        >
          <div className="section-badge">
            <Trophy className="w-3 h-3 text-primary" />
            Core Platform
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight">
            Everything you need <br className="hidden md:block" />
            to <span className="pill-highlight">organize</span> and <span className="pill-highlight">grow</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mt-6">
            A complete platform designed for the unique needs of grassroots
            football across the continent.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className={`feature-card group relative overflow-hidden p-6 md:p-8 flex flex-col items-center text-center ${
                index === 4 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {feature.badge && (
                <span className="absolute top-4 right-4 px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary rounded-full shadow-sm">
                  {feature.badge}
                </span>
              )}
              <div
                className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-[2rem] flex items-center justify-center mb-6 md:mb-8 transition-all duration-500 group-hover:rounded-2xl group-hover:scale-110 shadow-sm ${
                  feature.color === "primary"
                    ? "bg-primary/5 text-primary"
                    : feature.color === "accent"
                    ? "bg-accent/5 text-accent"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                <feature.icon className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-3 md:mb-4 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm md:text-base font-medium leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
