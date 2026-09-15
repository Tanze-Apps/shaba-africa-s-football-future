/* ------------------------------------------------------------------
   Social marks, shared by the header and the footer.

   Lucide dropped most brand glyphs and has never shipped a TikTok one, so
   these are inline paths.

   TODO: replace the placeholder hrefs with the real Shabas profiles.
   ------------------------------------------------------------------ */
export const SOCIALS = [
  {
    name: "Facebook",
    href: "#",
    path: "M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z",
  },
  {
    name: "X",
    href: "#",
    path: "M18.9 3H21l-6.6 7.5L22 21h-6.2l-4.8-6.3L5.5 21H3.4l7-8L2.5 3h6.3l4.4 5.8L18.9 3zm-1.1 16.2h1.2L8.3 4.7H7l10.8 14.5z",
  },
  {
    name: "Instagram",
    href: "#",
    path: "M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 3.2A6.6 6.6 0 1 0 18.6 12 6.6 6.6 0 0 0 12 5.4zm0 10.9A4.3 4.3 0 1 1 16.3 12 4.3 4.3 0 0 1 12 16.3zm6.9-11.1a1.5 1.5 0 1 1-1.5-1.5 1.5 1.5 0 0 1 1.5 1.5z",
  },
  {
    name: "TikTok",
    href: "#",
    path: "M16.5 2h-3v13.1a2.6 2.6 0 1 1-2.2-2.6v-3a5.6 5.6 0 1 0 5.2 5.6V9.3a6.7 6.7 0 0 0 3.9 1.2v-3a3.8 3.8 0 0 1-3.9-3.7V2z",
  },
];

const SocialRow = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-4 ${className}`}>
    {SOCIALS.map((s) => (
      <a
        key={s.name}
        href={s.href}
        aria-label={s.name}
        className="text-bone/60 transition-colors duration-200 hover:text-brand-bright"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-[18px] w-[18px]"
          aria-hidden="true"
        >
          <path d={s.path} />
        </svg>
      </a>
    ))}
  </div>
);

export default SocialRow;
