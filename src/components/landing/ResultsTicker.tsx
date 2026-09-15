import { useLang } from "@/contexts/lang";
import { MaskLines, Reveal } from "@/components/motion/Reveal";

/**
 * Sample in-app data, not live scores. It illustrates the verified-result
 * feed that the app produces; the strip is labelled as sample data so nobody
 * reads it as a real league table.
 */
type Fixture =
  | { kind: "result"; home: string; away: string; hs: number; as: number }
  | { kind: "upcoming"; home: string; away: string; when: string };

const FIXTURES: Fixture[] = [
  { kind: "result", home: "Bepanda FC", away: "Makepe United", hs: 3, as: 1 },
  { kind: "result", home: "Scorpions FC", away: "Akwa Stars", hs: 2, as: 2 },
  { kind: "result", home: "Deido Warriors", away: "Bonapriso FC", hs: 4, as: 0 },
  { kind: "result", home: "New Bell FC", away: "Ndogbong SC", hs: 1, as: 3 },
  { kind: "result", home: "Logbaba Kings", away: "Bali FC", hs: 2, as: 0 },
  { kind: "upcoming", home: "Makepe United", away: "Deido Warriors", when: "Sat 20/09" },
  { kind: "upcoming", home: "Scorpions FC", away: "Bepanda FC", when: "Tue 23/09" },
];

/** Initials mark — a neutral stand-in so no club badge is invented. */
const Crest = ({ name }: { name: string }) => {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-bone/15 bg-bone/[0.06]">
      <span className="font-display text-[13px] leading-none text-bone/80">
        {initials}
      </span>
    </span>
  );
};

const FixtureCard = ({ fixture }: { fixture: Fixture }) => {
  const { t } = useLang();

  return (
    <div className="flex w-[262px] shrink-0 flex-col justify-between border-r border-bone/10 px-6 py-5">
      <span className="u-eyebrow mb-4 text-[9px] text-brand-bright">
        {fixture.kind === "result" ? t.ticker.verified : t.ticker.upcoming}
      </span>

      <div className="flex items-center justify-between gap-3">
        <Crest name={fixture.home} />

        {fixture.kind === "result" ? (
          <span className="font-display whitespace-nowrap text-[26px] leading-none text-bone">
            {fixture.hs} <span className="text-bone-faint">:</span> {fixture.as}
          </span>
        ) : (
          <span className="font-display whitespace-nowrap text-[17px] leading-none text-bone">
            {fixture.when}
          </span>
        )}

        <Crest name={fixture.away} />
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 text-[11px] text-bone-faint">
        <span className="max-w-[46%] truncate">{fixture.home}</span>
        <span className="max-w-[46%] truncate text-right">{fixture.away}</span>
      </div>
    </div>
  );
};

const ResultsTicker = () => {
  const { t } = useLang();

  // Two identical passes so the -50% translation loops seamlessly.
  const track = [FIXTURES, FIXTURES];

  return (
    <section className="relative overflow-hidden border-b border-bone/10 bg-[#0c1a12] py-16 md:py-20">
      <div className="u-grid-lines absolute inset-0 opacity-40" />

      <div className="relative mx-auto max-w-[1340px] px-5 md:px-10">
        <MaskLines
          as="h2"
          lines={[t.ticker.headline]}
          className="font-display text-center text-[clamp(26px,5.2vw,58px)] leading-[1.02] text-bone"
        />
      </div>

      <Reveal delay={0.15} className="u-marquee-host relative mt-12">
        <div className="u-edge-fade overflow-hidden">
          <div
            className="animate-marquee flex w-max border-y border-bone/10"
            style={{ "--marquee-duration": "52s" } as React.CSSProperties}
          >
            {track.map((group, g) => (
              // The second pass is a visual duplicate only — hiding it keeps
              // screen readers from announcing every fixture twice.
              <div key={g} className="flex" aria-hidden={g === 1}>
                {group.map((f, i) => (
                  <FixtureCard key={`${f.home}-${f.away}-${i}`} fixture={f} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <p className="u-eyebrow relative mt-6 text-center text-[9px] text-bone-faint">
        {t.ticker.note}
      </p>
    </section>
  );
};

export default ResultsTicker;
