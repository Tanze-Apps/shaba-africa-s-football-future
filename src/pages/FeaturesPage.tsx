import SiteLayout from "@/components/SiteLayout";
import Features from "@/components/landing/Features";
import { useLang } from "@/contexts/lang";

const FeaturesPage = () => {
  const { t } = useLang();

  return (
    <SiteLayout title={t.nav.features} description={t.features.sub}>
      <Features />
    </SiteLayout>
  );
};

export default FeaturesPage;
