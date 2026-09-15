import { Link } from "react-router-dom";
import { useLang } from "@/contexts/lang";
import { Reveal } from "@/components/motion/Reveal";
import SocialRow from "@/components/SocialRow";

const EMAIL = "shabasfootball@gmail.com";
const PHONE = "+237673015993";
const PHONE_DISPLAY = "+237 673 015 993";

/**
 * Destinations line up with `t.footer.productLinks` / `companyLinks` by index.
 * The remaining "#" entries are pages that do not exist yet.
 */
const PRODUCT_HREFS = ["#features", "#how", "#la-rue", "#features"];
const COMPANY_HREFS = ["#", "/privacy-policy", "#", `mailto:${EMAIL}`];

const Footer = () => {
  const { t } = useLang();
  const f = t.footer;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-bone/10 bg-ink-deep">
      <div className="mx-auto max-w-[1340px] px-5 md:px-10">
        {/* Oversized wordmark */}
        <Reveal>
          <div className="border-b border-bone/10 py-14 md:py-20">
            <span className="font-display block text-[clamp(56px,15vw,210px)] leading-[0.85] text-bone/90">
              Shabas
            </span>
          </div>
        </Reveal>

        <div className="grid gap-12 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:gap-16">
          {/* Brand + contact */}
          <div>
            <p className="max-w-[300px] text-[14px] leading-relaxed text-bone-dim">
              {f.brand}
            </p>

            <div className="mt-6 flex flex-col gap-2">
              <a
                href={`mailto:${EMAIL}`}
                className="text-[14px] text-bone transition-colors duration-200 hover:text-brand-bright"
              >
                {EMAIL}
              </a>
              <a
                href={`tel:${PHONE}`}
                className="text-[14px] text-bone transition-colors duration-200 hover:text-brand-bright"
              >
                {PHONE_DISPLAY}
              </a>
            </div>

            <SocialRow className="mt-7" />
          </div>

          {/* Product */}
          <div>
            <h4 className="u-eyebrow mb-5 text-bone-faint">{f.product}</h4>
            <ul className="flex flex-col gap-3">
              {f.productLinks.map((label, i) => (
                <li key={label}>
                  <a
                    href={PRODUCT_HREFS[i]}
                    className="text-[14px] text-bone-dim transition-colors duration-200 hover:text-bone"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="u-eyebrow mb-5 text-bone-faint">{f.company}</h4>
            <ul className="flex flex-col gap-3">
              {f.companyLinks.map((label, i) => {
                const href = COMPANY_HREFS[i];
                const className =
                  "text-[14px] text-bone-dim transition-colors duration-200 hover:text-bone";

                return (
                  <li key={label}>
                    {href.startsWith("/") ? (
                      <Link to={href} className={className}>
                        {label}
                      </Link>
                    ) : (
                      <a href={href} className={className}>
                        {label}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-bone/10 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] text-bone-faint">
            © {year} {f.copy}
          </p>
          <Link
            to="/privacy-policy"
            className="text-[12px] text-bone-faint transition-colors duration-200 hover:text-bone"
          >
            {f.privacyPolicy}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
