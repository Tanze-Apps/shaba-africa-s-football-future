import { useLang } from "@/contexts/lang";

export const ROUTES = {
  home: "/",
  features: "/features",
  how: "/how-it-works",
  tournaments: "/tournaments",
  laRue: "/la-rue",
  partners: "/partners",
  privacy: "/privacy-policy",
} as const;

/**
 * The five content pages, in menu order.
 *
 * Labels and blurbs are the strings each section already uses, so splitting the
 * site into pages needed no new marketing copy — and the menu, the home page
 * index and the page titles can never drift apart.
 */
export const useSiteNav = () => {
  const { t } = useLang();

  return [
    { to: ROUTES.features, label: t.nav.features, blurb: t.features.sub },
    { to: ROUTES.how, label: t.nav.howItWorks, blurb: t.how.sub },
    {
      to: ROUTES.tournaments,
      label: t.nav.tournaments,
      blurb: t.tournament.sub,
    },
    { to: ROUTES.laRue, label: t.nav.laRue, blurb: t.laRue.sub },
    { to: ROUTES.partners, label: t.nav.partners, blurb: t.partners.sub },
  ];
};

/**
 * What the menu shows: home first, then the five content pages.
 *
 * Home is deliberately not part of `useSiteNav` — that list is also the home
 * page's own index, which should not link to itself.
 */
export const useMenuNav = () => {
  const { t } = useLang();
  return [{ to: ROUTES.home, label: t.nav.home }, ...useSiteNav()];
};

/** Old single-page anchors, kept working after the split. */
export const LEGACY_HASHES: Record<string, string> = {
  "#features": ROUTES.features,
  "#how": ROUTES.how,
  "#tournaments": ROUTES.tournaments,
  "#la-rue": ROUTES.laRue,
  "#partners": ROUTES.partners,
};
