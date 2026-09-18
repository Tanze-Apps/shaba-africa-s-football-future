import SiteLayout from "@/components/SiteLayout";
import HowItWorks from "@/components/landing/HowItWorks";
import Gamification from "@/components/landing/Gamification";
import { useLang } from "@/contexts/lang";

/** The journey, then how a player rises through it. */
const HowItWorksPage = () => {
  const { t } = useLang();

  return (
    <SiteLayout title={t.nav.howItWorks} description={t.how.sub}>
      <HowItWorks />
      <Gamification />
    </SiteLayout>
  );
};

export default HowItWorksPage;
