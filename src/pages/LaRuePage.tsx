import SiteLayout from "@/components/SiteLayout";
import LaRue from "@/components/landing/LaRue";
import { useLang } from "@/contexts/lang";

const LaRuePage = () => {
  const { t } = useLang();

  return (
    <SiteLayout title={t.nav.laRue} description={t.laRue.sub}>
      <LaRue />
    </SiteLayout>
  );
};

export default LaRuePage;
