/**
 * A flat, hairline-bordered panel holding an app screenshot.
 *
 * Deliberately not a skeuomorphic phone — the reference design frames its
 * imagery with plain rectangles, and a glossy device mock would fight that.
 *
 * The frame has a fixed phone aspect ratio (the 1170x2532 master size) and
 * crops from the top. Screenshots from different sources don't share an exact
 * ratio, and without this the sticky Features panel would change height as it
 * cross-fades between them.
 */
const AppScreen = ({
  src,
  alt = "",
  className = "",
}: {
  src: string;
  alt?: string;
  className?: string;
}) => (
  <div
    className={`relative aspect-[1170/2532] overflow-hidden border border-bone/12 bg-ink-raised ${className}`}
  >
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="block h-full w-full object-cover object-top"
    />
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-deep/40 to-transparent" />
  </div>
);

export default AppScreen;
