export type Lang = "fr" | "en";

const fr = {
  nav: {
    features: "Fonctionnalités",
    howItWorks: "Comment ça marche",
    tournaments: "Tournois",
    laRue: "La Rue",
    download: "Télécharger",
    menu: "Menu",
    close: "Fermer",
    navigation: "Navigation",
  },
  ticker: {
    headline: "Derniers résultats & prochains défis",
    verified: "Vérifié",
    upcoming: "À venir",
    note: "Exemple de données in-app",
  },
  webapp: {
    badge: "App web",
    headline: "Pensée pour",
    accent: "le grand écran.",
    sub: "Pas une app mobile étirée. La carte en plein écran, les équipes juste à côté — Shabas sur ordinateur, sans rien installer.",
    cta: "Ouvrir l'app web",
    alt: "Shabas sur ordinateur",
    tabs: ["Explorer", "Accueil", "Classement", "Tournois", "Profil"],
  },
  hero: {
    badge: "Afrique · Canada · Et plus",
    eyebrow: "Bienvenue chez Shabas",
    scroll: "Défiler",
    h1: "Votre",
    h1a: "quartier.",
    h2: "Votre",
    h2a: "terrain.",
    h3: "Votre",
    h3g: "réputation.",
    sub: "Organisez vos matchs, suivez vos résultats, et construisez un profil football qui parle pour vous — sans le chaos des groupes WhatsApp.",
    ctaPrimary: "Télécharger gratuitement",
    ctaWeb: "Essayer sur le web",
    iphoneNotice: "Utilisateurs iPhone : accédez à l'app sur app.sha-bas.com",
    proof: [
      { strong: "12+", label: "équipes actives" },
      { strong: "Cameroun", label: "& Canada" },
      { strong: "5.0", label: "REP moyen" },
      { strong: "Gratuit", label: "de base" },
    ],
    stats: [
      { val: "12+", label: "Équipes actives" },
      { val: "5+", label: "Villes" },
      { val: "100%", label: "Résultats vérifiés" },
      { val: "2", label: "Pays" },
    ],
  },
  features: {
    badge: "Ce que Shabas fait",
    headline: "Tout ce qu'il vous faut pour jouer",
    accent: "sérieusement.",
    sub: "Du défi au classement, Shabas gère tout ce que WhatsApp ne peut pas.",
    cards: [
      {
        tag: "Smart Finder",
        title: "Trouvez des équipes proches",
        desc: "Filtrez par quartier, niveau de jeu et disponibilité. Votre prochain adversaire est à 2 km.",
      },
      {
        tag: "Matchmaking",
        title: "Lancez un défi",
        desc: "Un message. Les deux capitaines acceptent. Votre match est programmé.",
      },
      {
        tag: "Standings",
        title: "Classement vérifié",
        desc: "Chaque résultat confirmé par les deux capitaines. Votre rang est mérité.",
      },
      {
        tag: "Digital Portfolio",
        title: "Votre profil football",
        desc: "Buts, passes décisives, matchs joués, réputation. Tout en un seul endroit — visible par tous.",
      },
    ],
    liveFormation: {
      badge: "Bientôt disponible",
      title: "Formation en direct",
      illustration:
        "Illustration : la formation 4-3-3 de Makepe United sur un terrain, avec Junior Mbarga capitaine",
      desc: "Le capitaine compose sa formation avec les joueurs de l'équipe. Chacun voit sa position avant même d'arriver sur le terrain.",
    },
    marketplace: {
      badge: "Nouveau",
      title: "Marketplace",
      desc: "Les membres premium mettent en vente crampons, maillots et équipement. Tout le monde peut parcourir et envoyer une demande directement.",
      categories: ["Tout", "Crampons", "Maillots", "Gants"],
      location: "Makepe, Douala",
      listings: [
        { product: "Crampons verts", price: "12 000 XAF", condition: "Neuf" },
        {
          product: "Maillot domicile",
          price: "8 000 XAF",
          condition: "Bon état",
        },
        {
          product: "Gants de gardien",
          price: "6 500 XAF",
          condition: "Très bon",
        },
      ],
    },
    showcaseBadge: "Visibilité globale",
    showcaseTitle: "Talent Showcase",
    showcaseDesc:
      "Votre CV football vérifié et visible par les scouts et académies. Jouez. Grimpez. Soyez découvert.",
  },
  how: {
    badge: "Le parcours",
    headline: "En 4 étapes.",
    accent: "C'est tout.",
    sub: "De l'inscription au classement, le chemin est simple.",
    steps: [
      {
        title: "Créez votre profil",
        desc: "Joueur ou équipe. Ajoutez votre quartier, votre niveau et vos disponibilités. 2 minutes.",
      },
      {
        title: "Trouvez des équipes",
        desc: "Parcourez les équipes proches. Filtrez par niveau et type de match.",
      },
      {
        title: "Défiez & jouez",
        desc: "Envoyez un défi. Les deux capitaines acceptent. Le match est fixé — pas de chaos.",
      },
      {
        title: "Grimpez. Répétez.",
        desc: "Résultats vérifiés, réputation construite, rang gagné. Votre profil parle pour vous.",
      },
    ],
  },
  gam: {
    badge: "Système de progression",
    headline: "Jouez. Progressez.",
    accent: "Votre carte évolue.",
    sub: "Comme dans un jeu — mais avec de vrais matchs dans votre quartier.",
    cards: [
      {
        title: "Série de jours",
        desc: "Jouez régulièrement, gardez votre flamme allumée. Une série qui ne ment pas.",
      },
      {
        title: "Points XP",
        desc: "Chaque victoire, défi lancé, et résultat confirmé vous rapporte des XP. Montez de niveau.",
      },
      {
        title: "Réputation (REP)",
        desc: "Votre score REP reflète votre fair-play et votre régularité. Facile à perdre, dur à gagner.",
      },
    ],
    xpLevel: "Niveau 5 · 1 240 XP",
    xpNext: "→ Niv. 6",
    repLabel: "4.8 · Excellente réputation",
  },
  tournament: {
    badge: "Maintenant disponible",
    headline: "Organisez tout le",
    accent: "tournoi.",
    sub: "De la création du tableau au champion — géré de bout en bout.",
    bullets: [
      {
        title: "Créez le tournoi",
        desc: "Format, dates, règles — configuré en quelques minutes.",
      },
      {
        title: "Les équipes s'inscrivent",
        desc: "Ouvrez les inscriptions, validez les équipes participantes.",
      },
      {
        title: "Résultats suivis automatiquement",
        desc: "Calendrier, scores et classement mis à jour jusqu'au sacre du champion.",
      },
    ],
    stages: ["Poules", "Quarts", "Demi-finales", "Finale"],
  },
  laRue: {
    badge: "Communauté",
    headline: "La",
    accentH: "Rue.",
    line2: "Le terrain social",
    line3: "de votre ville.",
    sub: "Partagez les moments d'après-match, lancez des défis publics, votez pour le meilleur quartier. La communauté football de votre ville — dans votre poche.",
    features: [
      {
        title: "Récapitulatifs de matchs",
        desc: "Partagez le résultat, la photo, le ressenti. Directement lié à votre match officiel.",
      },
      {
        title: "Défis publics",
        desc: "Lancez un défi ouvert. Laissez tout le monde voir qui a le courage de répondre.",
      },
      {
        title: "Sondages quartier",
        desc: '"Meilleur attaquant de Makepe ?" Un tap. Des résultats vrais.',
      },
    ],
  },
  download: {
    headline: "Prêt à jouer ?",
    accent: "Téléchargez Shabas.",
    sub: "Les fonctionnalités de base sont gratuites. Pour chaque joueur, chaque équipe, chaque quartier.",
    webCta: "Ouvrir l'app web",
    webSub: "Fonctionne sur iPhone & navigateur",
    iphoneNote: "Pas d'App Store encore ? Utilisez la version web.",
    trust: "Téléchargement gratuit · Fonctionnalités premium à venir",
    appStore: "App Store",
    googlePlay: "Google Play",
    subApp: "Disponible sur",
    subAppSoon: "Bientôt sur",
  },
  footer: {
    brand:
      "Le football de quartier, structuré. La réputation, méritée. L'Afrique et le monde, connectés.",
    product: "Produit",
    company: "Entreprise",
    productLinks: [
      "Fonctionnalités",
      "Comment ça marche",
      "La Rue",
      "Talent Showcase",
    ],
    companyLinks: [
      "À propos",
      "Confidentialité",
      "Conditions d'utilisation",
      "Contact",
    ],
    copy: "Shabas. Conçu pour l'avenir du football africain.",
    madeWith: "",
    privacyPolicy: "Politique de confidentialité",
  },
};

// Typing `en` as `typeof fr` makes the compiler enforce that both languages
// stay structurally identical — a missing or misspelled key is now a build
// error rather than an `undefined` rendered into the page.
const en: typeof fr = {
  nav: {
    features: "Features",
    howItWorks: "How It Works",
    tournaments: "Tournaments",
    laRue: "The Street",
    download: "Download",
    menu: "Menu",
    close: "Close",
    navigation: "Navigation",
  },
  ticker: {
    headline: "Latest results & next challenges",
    verified: "Verified",
    upcoming: "Upcoming",
    note: "Sample in-app data",
  },
  webapp: {
    badge: "Web app",
    headline: "Built for",
    accent: "the big screen.",
    sub: "Not a phone app stretched to fit. A full-screen map with the teams right beside it — Shabas on your computer, nothing to install.",
    cta: "Open the web app",
    alt: "Shabas on desktop",
    tabs: ["Explore", "Home", "Rankings", "Tournaments", "Profile"],
  },
  hero: {
    badge: "Africa · Canada · And more",
    eyebrow: "Welcome to Shabas",
    scroll: "Scroll",
    h1: "Your",
    h1a: "neighborhood.",
    h2: "Your",
    h2a: "pitch.",
    h3: "Your",
    h3g: "reputation.",
    sub: "Organize your matches, track your results, and build a football profile that speaks for you — without the chaos of WhatsApp groups.",
    ctaPrimary: "Download for Free",
    ctaWeb: "Try on the Web",
    iphoneNotice: "iPhone users: access the app at app.sha-bas.com",
    proof: [
      { strong: "12+", label: "active teams" },
      { strong: "Cameroon", label: "& Canada" },
      { strong: "5.0", label: "avg REP" },
      { strong: "Free", label: "to start" },
    ],
    stats: [
      { val: "12+", label: "Active Teams" },
      { val: "5+", label: "Cities" },
      { val: "100%", label: "Verified Results" },
      { val: "2", label: "Countries" },
    ],
  },
  features: {
    badge: "What Shabas Does",
    headline: "Everything you need to play",
    accent: "seriously.",
    sub: "From challenges to standings, Shabas handles everything WhatsApp can't.",
    cards: [
      {
        tag: "Smart Finder",
        title: "Find nearby teams",
        desc: "Filter by neighborhood, skill level and availability. Your next opponent is 2 km away.",
      },
      {
        tag: "Matchmaking",
        title: "Send a challenge",
        desc: "One message. Both captains accept. Your match is scheduled.",
      },
      {
        tag: "Standings",
        title: "Verified rankings",
        desc: "Every result confirmed by both captains. Your rank is earned.",
      },
      {
        tag: "Digital Portfolio",
        title: "Your football profile",
        desc: "Goals, assists, matches played, reputation. All in one place — visible to everyone.",
      },
    ],
    liveFormation: {
      badge: "Coming soon",
      title: "Live Formation Preview",
      illustration:
        "Illustration: Makepe United's 4-3-3 formation on a pitch, with Junior Mbarga as captain",
      desc: "Captains draft their lineup from the team roster. Everyone sees their position before they even reach the pitch.",
    },
    marketplace: {
      badge: "New",
      title: "Marketplace",
      desc: "Premium members list boots, jerseys and gear for sale. Anyone can browse and send an inquiry directly.",
      categories: ["All", "Boots", "Jerseys", "Gloves"],
      location: "Makepe, Douala",
      listings: [
        { product: "Green boots", price: "12,000 XAF", condition: "New" },
        { product: "Home jersey", price: "8,000 XAF", condition: "Good" },
        {
          product: "Keeper gloves",
          price: "6,500 XAF",
          condition: "Very good",
        },
      ],
    },
    showcaseBadge: "Global Visibility",
    showcaseTitle: "Talent Showcase",
    showcaseDesc:
      "Your verified football résumé visible to scouts and academies. Play. Rise. Get discovered.",
  },
  how: {
    badge: "The journey",
    headline: "In 4 steps.",
    accent: "That's it.",
    sub: "From sign-up to national ranking, the path is simple.",
    steps: [
      {
        title: "Create your profile",
        desc: "Player or team. Add your neighborhood, level and availability. 2 minutes.",
      },
      {
        title: "Find teams",
        desc: "Browse nearby teams. Filter by level and match type.",
      },
      {
        title: "Challenge & play",
        desc: "Send a challenge. Both captains accept. Match set — no chaos.",
      },
      {
        title: "Rise. Repeat.",
        desc: "Verified results, built reputation, earned rank. Your profile speaks for you.",
      },
    ],
  },
  gam: {
    badge: "Progression System",
    headline: "Play. Improve.",
    accent: "Your card evolves.",
    sub: "Like a video game — but with real matches in your neighborhood.",
    cards: [
      {
        title: "Day Streak",
        desc: "Play regularly, keep your flame alive. A streak that never lies.",
      },
      {
        title: "XP Points",
        desc: "Every win, challenge sent, and verified result earns you XP. Level up.",
      },
      {
        title: "Reputation (REP)",
        desc: "Your REP score reflects your fair play and consistency. Easy to lose, hard to earn.",
      },
    ],
    xpLevel: "Level 5 · 1,240 XP",
    xpNext: "→ Lvl 6",
    repLabel: "4.8 · Excellent reputation",
  },
  tournament: {
    badge: "Now live",
    headline: "Run the whole",
    accent: "tournament.",
    sub: "From bracket creation to champion — managed end to end.",
    bullets: [
      {
        title: "Create the tournament",
        desc: "Format, dates, rules — set up in minutes.",
      },
      {
        title: "Teams register",
        desc: "Open registration and confirm the participating teams.",
      },
      {
        title: "Results tracked automatically",
        desc: "Fixtures, scores and standings updated all the way to a champion.",
      },
    ],
    stages: ["Groups", "Quarterfinals", "Semifinals", "Final"],
  },
  laRue: {
    badge: "Community",
    headline: "The",
    accentH: "Street.",
    line2: "The social pitch",
    line3: "of your city.",
    sub: "Share post-match moments, send public challenges, vote for the best neighborhood. Your city's football community — in your pocket.",
    features: [
      {
        title: "Match recaps",
        desc: "Share the result, the photo, the feeling. Directly linked to your official match.",
      },
      {
        title: "Public challenges",
        desc: "Send an open challenge. Let everyone see who has the courage to respond.",
      },
      {
        title: "Neighborhood polls",
        desc: '"Best striker in Makepe?" One tap. Real results.',
      },
    ],
  },
  download: {
    headline: "Ready to play?",
    accent: "Download Shabas.",
    sub: "Core features are free. For every player, every team, every neighborhood.",
    webCta: "Open Web App",
    webSub: "Works on iPhone & any browser",
    iphoneNote: "No App Store yet? Use the web version.",
    trust: "Free to download · Premium features coming soon",
    appStore: "App Store",
    googlePlay: "Google Play",
    subApp: "Available on",
    subAppSoon: "Coming soon on",
  },
  footer: {
    brand:
      "Neighborhood football, structured. Reputation, earned. Africa and the world, connected.",
    product: "Product",
    company: "Company",
    productLinks: ["Features", "How It Works", "The Street", "Talent Showcase"],
    companyLinks: ["About", "Privacy", "Terms of Service", "Contact"],
    copy: "Shabas. Built for the future of African football.",
    madeWith: "",
    privacyPolicy: "Privacy Policy",
  },
};

export const translations = { fr, en } as const;
export type T = typeof fr;
