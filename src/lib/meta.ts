import { useEffect } from "react";

const SUFFIX = "Shabas";
const ORIGIN = "https://sha-bas.com";

const setMeta = (selector: string, attr: string, value: string) => {
  const el = document.head.querySelector<HTMLMetaElement>(selector);
  if (el) el.setAttribute(attr, value);
};

/**
 * Per-page title, description and share preview.
 *
 * index.html carries one set of tags for the whole site, which was fine as a
 * single page. Now that each topic has its own URL, a link shared to Facebook
 * has to describe the page it points at, not the site in general.
 */
export const usePageMeta = (title: string, description: string) => {
  useEffect(() => {
    const full = title === SUFFIX ? title : `${title} | ${SUFFIX}`;
    document.title = full;

    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", full);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[name="twitter:title"]', "content", full);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta(
      'meta[property="og:url"]',
      "content",
      `${ORIGIN}${window.location.pathname}`,
    );

    // Canonical follows the route, so each page is indexed in its own right.
    let canonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `${ORIGIN}${window.location.pathname}`;
  }, [title, description]);
};
