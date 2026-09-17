import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import ResultsTicker from "@/components/landing/ResultsTicker";
import Features from "@/components/landing/Features";
import WebApp from "@/components/landing/WebApp";
import HowItWorks from "@/components/landing/HowItWorks";
import Gamification from "@/components/landing/Gamification";
import Tournaments from "@/components/landing/Tournaments";
import LaRue from "@/components/landing/LaRue";
import Download from "@/components/landing/Download";
import Footer from "@/components/landing/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Header />
    <main>
      <Hero />
      <ResultsTicker />
      <Features />
      <WebApp />
      <HowItWorks />
      <Gamification />
      <Tournaments />
      <LaRue />
      <Download />
    </main>
    <Footer />
  </div>
);

export default Index;
