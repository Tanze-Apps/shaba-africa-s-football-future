import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Gamification from "@/components/landing/Gamification";
import LaRue from "@/components/landing/LaRue";
import Download from "@/components/landing/Download";
import Footer from "@/components/landing/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Header />
    <main>
      <Hero />
      <Features />
      <HowItWorks />
      <Gamification />
      <LaRue />
      <Download />
    </main>
    <Footer />
  </div>
);

export default Index;
