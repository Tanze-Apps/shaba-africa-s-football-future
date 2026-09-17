import type { Lang } from "@/lib/i18n";

import exploreEn from "@/assets/app/explore-en.webp";
import exploreFr from "@/assets/app/explore-fr.webp";
import rankingsEn from "@/assets/app/rankings-en.webp";
import rankingsFr from "@/assets/app/rankings-fr.webp";
import profileEn from "@/assets/app/profile-en.webp";
import profileFr from "@/assets/app/profile-fr.webp";
import exploreDesktop from "@/assets/app/explore-desktop.webp";
import legacyMatches from "@/assets/app-matches.webp";
import legacyFormation from "@/assets/app-formation.webp";

/**
 * Every app screenshot the site shows, per language.
 *
 * Masters come from the Flutter repo's demo-data mode (1170x2532 phone,
 * 1440x900 desktop) and are compressed into src/assets/app. When a new capture
 * arrives, swap the import here — no component needs to change.
 */
type Localised = Record<Lang, string>;

/** For captures that only exist in one language, or have no text that matters. */
const same = (src: string): Localised => ({ fr: src, en: src });

export const SCREENSHOTS = {
  explore: { fr: exploreFr, en: exploreEn },
  rankings: { fr: rankingsFr, en: rankingsEn },
  profile: { fr: profileFr, en: profileEn },

  // Pre-revamp captures, kept until 02-challenge and 05-formation arrive.
  challenge: same(legacyMatches),
  formation: same(legacyFormation),

  // Stand-in until 06-progression arrives: the profile shows the level bar.
  progression: { fr: profileFr, en: profileEn },

  // UI chrome is English-only in this capture; a French one would replace it.
  exploreDesktop: same(exploreDesktop),
} satisfies Record<string, Localised>;
