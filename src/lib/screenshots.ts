import type { Lang } from "@/lib/i18n";

import exploreEn from "@/assets/app/explore-en.webp";
import exploreFr from "@/assets/app/explore-fr.webp";
import challenge from "@/assets/app/challenge.webp";
import rankings from "@/assets/app/rankings.webp";
import profile from "@/assets/app/profile.webp";
import progression from "@/assets/app/progression.webp";
import laRue from "@/assets/app/la-rue.webp";
import tournaments from "@/assets/app/tournaments.webp";
import exploreDesktop from "@/assets/app/explore-desktop.webp";
import homeDesktop from "@/assets/app/home-desktop.webp";
import rankingsDesktop from "@/assets/app/rankings-desktop.webp";
import profileDesktop from "@/assets/app/profile-desktop.webp";
import tournamentsDesktop from "@/assets/app/tournaments-desktop.webp";

/**
 * Every app screenshot the site shows, per language.
 *
 * Captures come from the Flutter repo's demo-data mode and are compressed
 * into src/assets/app. When a new capture arrives, swap the import here — no
 * component needs to change.
 */
type Localised = Record<Lang, string>;

/** For captures that only exist in one language. */
const same = (src: string): Localised => ({ fr: src, en: src });

export const SCREENSHOTS = {
  // Phone. Only Explore exists in both languages so far; the rest show the
  // English UI in both until French captures arrive.
  explore: { fr: exploreFr, en: exploreEn },
  challenge: same(challenge),
  rankings: same(rankings),
  profile: same(profile),
  progression: same(progression),
  laRue: same(laRue),
  tournaments: same(tournaments),

  // Desktop web app.
  exploreDesktop: same(exploreDesktop),
  homeDesktop: same(homeDesktop),
  rankingsDesktop: same(rankingsDesktop),
  tournamentsDesktop: same(tournamentsDesktop),
  profileDesktop: same(profileDesktop),
} satisfies Record<string, Localised>;
