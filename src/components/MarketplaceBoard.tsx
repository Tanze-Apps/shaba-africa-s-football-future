import { motion } from "framer-motion";
import { Footprints, Shirt, Hand } from "lucide-react";
import { EASE } from "@/components/motion/Reveal";

/** One icon per listing, in the order they appear in the copy deck. */
const LISTING_ICONS = [Footprints, Shirt, Hand];

type Listing = { product: string; price: string; condition: string };

/**
 * An illustrated marketplace board for the Features card.
 *
 * Mirrors the real screen — category filters, then listings with a price in
 * XAF, condition and town — without being a screenshot, so it can show a
 * full board rather than whatever happens to be for sale today.
 */
const MarketplaceBoard = ({
  categories,
  listings,
  location,
  className = "",
}: {
  categories: readonly string[];
  listings: readonly Listing[];
  location: string;
  className?: string;
}) => (
  <div
    className={`flex flex-col gap-3 border border-bone/10 bg-ink-deep p-4 md:h-[300px] ${className}`}
  >
    {/* Category filters; the first is the selected one */}
    <div className="flex flex-wrap gap-1.5" aria-hidden="true">
      {categories.map((c, i) => (
        <span
          key={c}
          className={`px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] ${
            i === 0
              ? "bg-brand text-white"
              : "border border-bone/15 text-bone-faint"
          }`}
        >
          {c}
        </span>
      ))}
    </div>

    {listings.map((l, i) => {
      const Icon = LISTING_ICONS[i];
      return (
        <motion.div
          key={l.product}
          className="flex items-center gap-3 border border-bone/10 bg-ink-raised p-3"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.5, delay: 0.1 + i * 0.09, ease: EASE }}
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-bone/15 bg-bone/[0.04]">
            <Icon
              className="h-5 w-5 text-brand-bright"
              strokeWidth={1.75}
              aria-hidden="true"
            />
          </span>

          <span className="min-w-0 flex-1">
            <span className="font-display block truncate text-[15px] leading-none text-bone">
              {l.product}
            </span>
            <span className="mt-1.5 block truncate text-[10px] font-semibold uppercase tracking-[0.14em] text-bone-faint">
              {/* The town is dropped on narrow cards, where it would eat the
                  line and truncate the condition away. */}
              <span className="hidden sm:inline">{location} · </span>
              {l.condition}
            </span>
          </span>

          <span className="font-display shrink-0 text-[15px] leading-none text-brand-bright">
            {l.price}
          </span>
        </motion.div>
      );
    })}
  </div>
);

export default MarketplaceBoard;
