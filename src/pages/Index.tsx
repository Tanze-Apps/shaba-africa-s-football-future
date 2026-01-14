import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import ProblemSolution from "@/components/landing/ProblemSolution";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import WhoItsFor from "@/components/landing/WhoItsFor";
import TrustVision from "@/components/landing/TrustVision";
import Waitlist from "@/components/landing/Waitlist";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ProblemSolution />
        <Features />
        <HowItWorks />
        <WhoItsFor />
        <TrustVision />
        <Waitlist />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
