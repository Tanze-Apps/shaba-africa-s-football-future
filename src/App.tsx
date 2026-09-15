import { useCallback, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { LangProvider } from "./contexts/lang";
import { ReadyProvider } from "./contexts/ready";
import Loader, { shouldShowLoader } from "./components/Loader";
import PageTransition from "./components/PageTransition";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const queryClient = new QueryClient();

/**
 * Routes keyed by pathname so AnimatePresence can cross-fade between pages.
 * Must live inside BrowserRouter — useLocation needs the router context.
 */
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => window.scrollTo({ top: 0, behavior: "instant" })}
    >
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Index />
            </PageTransition>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <PageTransition>
              <PrivacyPolicy />
            </PageTransition>
          }
        />
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
