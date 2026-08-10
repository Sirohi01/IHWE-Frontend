
import { useState, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes } from "react-router-dom";

import { AuthProvider as BuyerAuthProvider } from "@/context/BuyerAuthContext";
import VisitorRegistrationDrawer from "@/components/VisitorRegistrationDrawer";
import { HelmetProvider } from "react-helmet-async";
import SeoHelmet from "@/components/SeoHelmet";
import ScrollToTopOnNavigation from "@/components/layout/ScrollToTopOnNavigation";

// Import Route Groups
import { PublicRoutes } from "./routes/PublicRoutes";
import { ExhibitorRoutes } from "./routes/ExhibitorRoutes";
import { SellerRoutes } from "./routes/SellerRoutes";
import { BuyerRoutes } from "./routes/BuyerRoutes";
import { AuthRoutes } from "./routes/AuthRoutes";

const queryClient = new QueryClient();

const App = () => {
  const [visitorDrawerOpen, setVisitorDrawerOpen] = useState(false);

  const openVisitorDrawer = () => setVisitorDrawerOpen(true);
  const closeVisitorDrawer = () => setVisitorDrawerOpen(false);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <ScrollToTopOnNavigation />
            <BuyerAuthProvider>
              <Toaster />
              <Sonner />
              <SeoHelmet />
              <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="w-10 h-10 border-4 border-[#23471d] border-t-transparent rounded-full animate-spin"></div></div>}>
                <Routes>
                  {PublicRoutes(openVisitorDrawer)}
                  {ExhibitorRoutes()}
                  {SellerRoutes()}
                  {BuyerRoutes()}
                  {AuthRoutes()}
                </Routes>
              </Suspense>
              <VisitorRegistrationDrawer open={visitorDrawerOpen} onClose={closeVisitorDrawer} />
            </BuyerAuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
