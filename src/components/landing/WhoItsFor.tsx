import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { User, Users, Eye, GraduationCap, Check } from "lucide-react";

const WhoItsFor = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const personas = [
    {
      icon: User,
      title: "Players",
      description:
        "Build your profile, track your stats, and get discovered. Show the world what you can do on the pitch.",
      benefits: [
        "Personal football CV",
        "Match history & stats",
        "Scout visibility",
      ],
    },
    {
      icon: Users,
      title: "Team Captains",
      description:
        "Manage your squad, find opponents, and climb the rankings. Bring structure to your team's journey.",
      benefits: [
        "Team management tools",
        "Match scheduling",
        "Performance tracking",
      ],
    },
    {
      icon: Eye,
      title: "Scouts",
      description:
        "Discover raw talent in local communities. Access verified stats and match footage from grassroots leagues.",
      benefits: [
        "Talent discovery tools",
        "Performance data",
        "Direct player contact",
      ],
    },
    {
      icon: GraduationCap,
      title: "Academies",
      description:
        "Find promising players and organize trials. Build your pipeline with structured scouting data.",
      benefits: [
        "Recruitment pipeline",
        "Player assessments",
        "Community visibility",
      ],
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
      id="who-its-for"
      ref={ref}
      className="py-24 md:py-32 px-6 bg-[#f7f7f7] relative overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white to-transparent opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <div className="section-badge">
            <Users className="w-3 h-3 text-primary" />
            For the Community
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight">
            Built for <span className="pill-highlight">everyone</span> <br className="hidden md:block" />
            in the ecosystem
          </h2>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mt-6">
            Whether you're playing, managing, or scouting — Shaba connects
            every piece of the puzzle.
          </p>
        </motion.div>

        {/* Personas Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-8"
        >
          {personas.map((persona, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="feature-card flex flex-col sm:flex-row gap-8 items-start sm:items-center group p-10"
            >
              <div className="w-20 h-20 rounded-3xl bg-primary/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500 shadow-sm shadow-primary/5">
                <persona.icon className="w-10 h-10 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                    {persona.title}
                  </h3>
                </div>
                <p className="text-gray-500 font-medium mb-6 leading-relaxed">
                  {persona.description}
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                  {persona.benefits.map((benefit, benefitIndex) => (
                    <div
                      key={benefitIndex}
                      className="flex items-center gap-2 text-sm font-bold text-gray-700"
                    >
                      <Check className="w-4 h-4 text-primary" />
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhoItsFor;
