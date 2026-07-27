import React, { Suspense, lazy } from "react";
import HeroSection from "@/components/dashboard/exhibitor/home/HeroSection";
import BrochureDownloadPopup from "@/components/home/BrochureDownloadPopup";

// Lazy load below-the-fold components
const TrustedBy = lazy(() => import("@/components/home/TrustedBy"));
const IntroductionSection = lazy(() => import("@/components/home/IntroductionSection"));
const GlobalPlatformSection = lazy(() => import("@/components/home/GlobalPlatformSection"));
const PowerfulPillars = lazy(() => import("@/components/home/PowerfulPillars"));
const CoreValues = lazy(() => import("@/components/home/CoreValues"));
const WhyParticipate = lazy(() => import("@/components/home/WhyParticipate"));
const ConferenceSeminars = lazy(() => import("@/components/home/ConferenceSeminars"));
const ExhibitionCategories = lazy(() => import("@/components/home/ExhibitionCategories"));
const BeyondExhibition = lazy(() => import("@/components/home/BeyondExhibition"));
const AttendanceInfo = lazy(() => import("@/components/home/AttendanceInfo"));
const EventInfoBanner = lazy(() => import("@/components/home/EventInfoBanner"));
const SponsorshipSection = lazy(() => import("@/components/home/SponsorshipSection"));
const UpcomingBrands = lazy(() => import("@/components/home/SponsorshipSection").then(module => ({ default: module.UpcomingBrands })));
const LogoShowcase = lazy(() => import("@/components/home/LogoShowcase"));
const HealthcareSectors = lazy(() => import("@/components/home/HealthcareSectors"));
const MarqueeStrip = lazy(() => import("@/components/home/MarqueeStrip"));
const BuyerSellerMeet = lazy(() => import("@/components/home/BuyerSellerMeet"));
const EventGlimpses = lazy(() => import("@/components/home/EventGlimpses"));
const TestimonialsCarousel = lazy(() => import("@/components/home/TestimonialsCarousel"));
const BlogPreview = lazy(() => import("@/components/home/BlogPreview"));
const FloatingVideo = lazy(() => import("@/components/home/FloatingVideo"));

interface IndexProps {
  onRegisterVisit: () => void;
}

const Index = ({ onRegisterVisit }: IndexProps) => {
  return (
    <>
      <BrochureDownloadPopup />
      {/* HeroSection is kept synchronous for LCP optimization */}
      <HeroSection onRegisterVisit={onRegisterVisit} forceNewTab={true} />
      
      <Suspense fallback={<div className="min-h-[200px] flex items-center justify-center"><div className="w-8 h-8 border-4 border-[#23471d] border-t-transparent rounded-full animate-spin"></div></div>}>
        <TrustedBy />
        <IntroductionSection />
        <GlobalPlatformSection />
        <PowerfulPillars />
        <CoreValues />
        <WhyParticipate />
        <ConferenceSeminars />

        <ExhibitionCategories />
        <BeyondExhibition />

        <AttendanceInfo />
        <EventInfoBanner />

        <SponsorshipSection />
        <LogoShowcase />
        <UpcomingBrands />
        <HealthcareSectors />
        <MarqueeStrip />
        <BuyerSellerMeet />
        <EventGlimpses />

        <TestimonialsCarousel />
        <BlogPreview />
        <FloatingVideo />
      </Suspense>
    </>
  );
};

export default Index;
