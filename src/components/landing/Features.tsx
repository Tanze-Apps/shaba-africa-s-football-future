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
      className="py-24 md:py-32 px-6 bg-secondary/30"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Features
          </span>
          <h2 className="section-heading mt-4">
            Everything you need to organize,{" "}
            <span className="gradient-text">compete, and grow</span>
          </h2>
          <p className="section-subheading mx-auto mt-4">
            A complete platform designed for the unique needs of grassroots
            football in Africa.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className={`feature-card group relative overflow-hidden ${
                index === 4 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {feature.badge && (
                <span className="absolute top-4 right-4 px-3 py-1 text-xs font-medium bg-accent/20 text-accent rounded-full">
                  {feature.badge}
                </span>
              )}
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${
                  feature.color === "primary"
                    ? "bg-primary/10"
                    : feature.color === "accent"
                    ? "bg-accent/10"
                    : "bg-muted"
                }`}
              >
                <feature.icon
                  className={`w-7 h-7 ${
                    feature.color === "primary"
                      ? "text-primary"
                      : feature.color === "accent"
                      ? "text-accent"
                      : "text-muted-foreground"
                  }`}
                />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
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
