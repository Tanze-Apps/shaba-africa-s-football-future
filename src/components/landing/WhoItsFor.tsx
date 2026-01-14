import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { User, Users, Eye, GraduationCap } from "lucide-react";

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
            Who It's For
          </span>
          <h2 className="section-heading mt-4">
            Built for <span className="gradient-text">everyone</span> in the
            football ecosystem
          </h2>
          <p className="section-subheading mx-auto mt-4">
            Whether you're playing, managing, or scouting — Shaba has you
            covered.
          </p>
        </motion.div>

        {/* Personas Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-6"
        >
          {personas.map((persona, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="feature-card flex flex-col md:flex-row gap-6"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <persona.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {persona.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {persona.description}
                </p>
                <ul className="space-y-2">
                  {persona.benefits.map((benefit, benefitIndex) => (
                    <li
                      key={benefitIndex}
                      className="flex items-center gap-2 text-sm text-foreground"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhoItsFor;
