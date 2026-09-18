import SiteLayout from "@/components/SiteLayout";
import Partners from "@/components/landing/Partners";
import { useLang } from "@/contexts/lang";

const PartnersPage = () => {
  const { t } = useLang();

  return (
    <SiteLayout title={t.nav.partners} description={t.partners.sub}>
      <Partners />
    </SiteLayout>
  );
};

export default PartnersPage;
