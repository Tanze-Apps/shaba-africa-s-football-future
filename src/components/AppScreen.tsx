/**
 * A flat, hairline-bordered panel holding an app screenshot.
 *
 * Deliberately not a skeuomorphic phone — the reference design frames its
 * imagery with plain rectangles, and a glossy device mock would fight that.
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
    className={`relative overflow-hidden border border-bone/12 bg-ink-raised ${className}`}
  >
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="block w-full object-cover object-top"
    />
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-deep/40 to-transparent" />
  </div>
);

export default AppScreen;
