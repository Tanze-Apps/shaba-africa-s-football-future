/* ------------------------------------------------------------------
   Social profiles, shared by the header, the menu overlay and the footer.

   Facebook is the only active channel. To add another, append an entry with
   its profile URL and an inline SVG path (Lucide dropped most brand glyphs).
   ------------------------------------------------------------------ */
export const SOCIALS = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61573251448789",
    path: "M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z",
  },
];

const SocialRow = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-4 ${className}`}>
    {SOCIALS.map((s) => (
      <a
        key={s.name}
        href={s.href}
        target="_blank"
        rel="noopener noreferrer"
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
