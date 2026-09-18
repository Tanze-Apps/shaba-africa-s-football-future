import SiteLayout from "@/components/SiteLayout";
import Tournaments from "@/components/landing/Tournaments";
import { useLang } from "@/contexts/lang";

const TournamentsPage = () => {
  const { t } = useLang();

  return (
    <SiteLayout title={t.nav.tournaments} description={t.tournament.sub}>
      <Tournaments />
    </SiteLayout>
  );
};

export default TournamentsPage;
