import { type ReactNode } from "react";
import Header from "@/components/landing/Header";
import Download from "@/components/landing/Download";
import Footer from "@/components/landing/Footer";
import { usePageMeta } from "@/lib/meta";

/**
 * Chrome shared by every page: header, the download call to action, footer.
 *
 * The CTA closes every page so there is always a way to install, wherever
 * someone stops reading.
 */
const SiteLayout = ({
  children,
  title,
  description,
  /** The home page opens on a full-height hero that sits under the fixed
   *  header; every other page needs to start below it. */
  offsetHeader = true,
}: {
  children: ReactNode;
  title: string;
  description: string;
  offsetHeader?: boolean;
}) => {
  usePageMeta(title, description);

  return (
    <div className="min-h-screen">
      <Header />
      <main className={offsetHeader ? "pt-[72px] md:pt-[88px]" : undefined}>
        {children}
        <Download />
      </main>
      <Footer />
    </div>
  );
};

export default SiteLayout;
