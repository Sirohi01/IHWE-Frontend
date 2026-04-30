import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import AttendanceInfo from "@/components/home/AttendanceInfo";
import EventInfoBanner from "@/components/home/EventInfoBanner";
import HealthcareSectors from "@/components/home/HealthcareSectors";
import MarqueeStrip from "@/components/home/MarqueeStrip";
import Testimonials from "@/components/home/Testimonials";
import WhoWeAre from "@/components/home/WhoWeAre";
import StatsCounter from "@/components/home/StatsCounter";
import CountersSection from "@/components/home/CountersSection";
import KeyHighlights from "@/components/home/KeyHighlights";
import PastParticipants from "@/components/home/PastParticipants";
import ParallaxSection from "@/components/home/ParallaxSection";
import GlobalPartners from "@/components/home/GlobalPartners";
import BlogPreview from "@/components/home/BlogPreview";
import PreFooterCTA from "@/components/home/PreFooterCTA";
import ExhibitionGrid from "@/components/home/ExhibitionGrid";
import IndustryZones from "@/components/home/IndustryZones";
import GallerySection from "@/components/home/GallerySection";
import ExhibitorLogos from "@/components/home/ExhibitorLogos";
import FAQSection from "@/components/home/FAQSection";
import EventHighlights from "@/components/home/EventHighlights";
import DownloadsSection from "@/components/home/DownloadsSection";
import TrustedBy from "@/components/home/TrustedBy";
import IntroductionSection from "@/components/home/IntroductionSection";
import GlobalPlatformSection from "@/components/home/GlobalPlatformSection";
import PowerfulPillars from "@/components/home/PowerfulPillars";
import CoreValues from "@/components/home/CoreValues";
import EventGlimpses from "@/components/home/EventGlimpses";
import WhyParticipate from "@/components/home/WhyParticipate";
import ConferenceSeminars from "@/components/home/ConferenceSeminars";
import ExhibitionCategories from "@/components/home/ExhibitionCategories";
import BeyondExhibition from "@/components/home/BeyondExhibition";

interface IndexProps {
  onRegisterVisit: () => void;
}

const Index = ({ onRegisterVisit }: IndexProps) => {
  return (
    <>
      <HeroSection onRegisterVisit={onRegisterVisit} />
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
      <HealthcareSectors />
      <MarqueeStrip />
      <EventGlimpses />
      {/* <AboutSection /> */}
      {/* <DownloadsSection /> */}
    
      {/* <WhoWeAre /> */}

      {/* <IndustryZones /> */}
      <Testimonials />
      <GallerySection />

      {/* <ExhibitorLogos /> */}
      {/* <ExhibitionGrid /> */}
      {/* <CountersSection /> */}
      {/* <KeyHighlights /> */}
      {/* <PastParticipants /> */}

      {/* <ParallaxSection /> */}
      {/* <GlobalPartners /> */}
      {/* <Testimonials />
       <FAQSection /> */}
      <BlogPreview />
     
      {/* <PreFooterCTA onBookStand={onBookStand} /> */}
    </>
  );
};

export default Index;
