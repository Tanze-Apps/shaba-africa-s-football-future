import SiteLayout from "@/components/SiteLayout";
import Hero from "@/components/landing/Hero";
import ResultsTicker from "@/components/landing/ResultsTicker";
import WebApp from "@/components/landing/WebApp";
import PageIndex from "@/components/landing/PageIndex";
import { useLang } from "@/contexts/lang";

/**
 * Home is deliberately short: the pitch, proof that it is real, proof that it
 * works on a desktop, and a way into everything else.
 */
const Home = () => {
  const { t } = useLang();

  return (
    <SiteLayout title="Shabas" description={t.hero.sub} offsetHeader={false}>
      <Hero />
      <ResultsTicker />
      <WebApp />
      <PageIndex />
    </SiteLayout>
  );
};

export default Home;
