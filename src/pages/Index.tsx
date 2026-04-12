import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import MarqueeStrip from "@/components/home/MarqueeStrip";
import WhoWeAre from "@/components/home/WhoWeAre";
import StatsCounter from "@/components/home/StatsCounter";
import CountersSection from "@/components/home/CountersSection";
import KeyHighlights from "@/components/home/KeyHighlights";
import PastParticipants from "@/components/home/PastParticipants";
import ParallaxSection from "@/components/home/ParallaxSection";
import GlobalPartners from "@/components/home/GlobalPartners";
import Testimonials from "@/components/home/Testimonials";
import BlogPreview from "@/components/home/BlogPreview";
import PreFooterCTA from "@/components/home/PreFooterCTA";
import ExhibitionGrid from "@/components/home/ExhibitionGrid";
import IndustryZones from "@/components/home/IndustryZones";
import GallerySection from "@/components/home/GallerySection";
import ExhibitorLogos from "@/components/home/ExhibitorLogos";
import FAQSection from "@/components/home/FAQSection";
import EventHighlights from "@/components/home/EventHighlights";
import DownloadsSection from "@/components/home/DownloadsSection";

interface IndexProps {
  onRegisterVisit: () => void;
}

const Index = ({ onRegisterVisit }: IndexProps) => {
  return (
    <>
      <HeroSection onRegisterVisit={onRegisterVisit} />
      <EventHighlights />
      <AboutSection />
      <DownloadsSection />
      <MarqueeStrip />
      <WhoWeAre />

      <IndustryZones />
      <GallerySection />

      <ExhibitorLogos />
      {/* <ExhibitionGrid /> */}
      {/* <CountersSection /> */}
      {/* <KeyHighlights /> */}
      {/* <PastParticipants /> */}

      <ParallaxSection />
      {/* <GlobalPartners /> */}
      <Testimonials />
      <StatsCounter />
       <FAQSection />
      <BlogPreview />
     
      {/* <PreFooterCTA onBookStand={onBookStand} /> */}
    </>
  );
};

export default Index;
