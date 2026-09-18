import { useCallback, useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { LangProvider } from "./contexts/lang";
import { ReadyProvider } from "./contexts/ready";
import { LEGACY_HASHES, ROUTES } from "./lib/nav";
import Loader, { shouldShowLoader } from "./components/Loader";
import PageTransition from "./components/PageTransition";
import Home from "./pages/Home";
import FeaturesPage from "./pages/FeaturesPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import TournamentsPage from "./pages/TournamentsPage";
import LaRuePage from "./pages/LaRuePage";
import PartnersPage from "./pages/PartnersPage";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const queryClient = new QueryClient();

/**
 * The site used to be one page with #anchors. Links shared before the split —
 * sha-bas.com/#tournaments and the like — land on the matching page instead of
 * dumping the visitor at the top of the home page.
 */
const useLegacyHashRedirect = () => {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname !== ROUTES.home || !hash) return;
    const target = LEGACY_HASHES[hash];
    if (target) navigate(target, { replace: true });
  }, [pathname, hash, navigate]);
};

/**
 * Routes keyed by pathname so AnimatePresence can cross-fade between pages.
 * Must live inside BrowserRouter — useLocation needs the router context.
 */
const AnimatedRoutes = () => {
  const location = useLocation();
  useLegacyHashRedirect();

  const pages: [string, React.ReactNode][] = [
    [ROUTES.home, <Home />],
    [ROUTES.features, <FeaturesPage />],
    [ROUTES.how, <HowItWorksPage />],
    [ROUTES.tournaments, <TournamentsPage />],
    [ROUTES.laRue, <LaRuePage />],
    [ROUTES.partners, <PartnersPage />],
    [ROUTES.privacy, <PrivacyPolicy />],
  ];

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => window.scrollTo({ top: 0, behavior: "instant" })}
    >
      <Routes location={location} key={location.pathname}>
        {pages.map(([path, element]) => (
          <Route
            key={path}
            path={path}
            element={<PageTransition>{element}</PageTransition>}
          />
        ))}
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const [showLoader] = useState(shouldShowLoader);
  const [ready, setReady] = useState(!showLoader);
  const handleLoaderDone = useCallback(() => setReady(true), []);

  return (
    <QueryClientProvider client={queryClient}>
      <LangProvider>
        <ReadyProvider value={ready}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            {showLoader && <Loader onDone={handleLoaderDone} />}
            <BrowserRouter>
              <AnimatedRoutes />
            </BrowserRouter>
          </TooltipProvider>
        </ReadyProvider>
      </LangProvider>
    </QueryClientProvider>
  );
};

export default App;
