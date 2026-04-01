import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Target,
  Sparkles,
  Stethoscope,
  GraduationCap,
  Handshake,
  Rocket,
  Apple,
  Building2,
  Activity,
  Milestone
} from "lucide-react";
import StatsCounter from "@/components/home/StatsCounter";
import ExhibitorLogos from "@/components/home/ExhibitorLogos";
import GlobalPlatform from "@/components/sections/GlobalPlatform";
import MissionVision from "@/components/sections/MissionVision";
import WhyAttend from "@/components/sections/WhyAttend";
import WhoShouldAttend from "@/components/sections/WhoShouldAttend";
import OrganizedBy from "@/components/sections/OrganizedBy";
import { motion } from "framer-motion";
import { heroBackgroundApi, SERVER_URL } from "@/lib/api";




const About = () => {
  const [heroData, setHeroData] = useState<any>(null);
  const [loadingHero, setLoadingHero] = useState(true);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const data = await heroBackgroundApi.getByPage("Overview / About IHWE");
        if (data) {
          setHeroData(data);
        }
      } catch (error) {
        console.error("Error fetching hero background:", error);
      } finally {
        setLoadingHero(false);
      }
    };
    fetchHero();
  }, []);

  // Use dynamic data if available
  const heroStyles = {
    backgroundImage: heroData?.backgroundImage
      ? `url(${SERVER_URL}${heroData.backgroundImage})`
      : `none`,
    aspectRatio: "16 / 4"
  };

  const heroSubtitle = heroData?.title || "";
  const heroTitle = heroData?.heading || "";
  const heroDesc = heroData?.shortDescription || "";
  const heroAlt = heroData?.imageAltText || "";

  return (
    <div className="bg-[#FFFDF1] font-inter">
      {/* PROFESSIONAL HERO SECTION */}
      <section
        className="hero-background-standard"
        style={heroStyles}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-0 left-0 w-full h-4 md:h-8 bg-[#FFFDF1]" style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }} />

        <div className="container mx-auto px-4 text-center text-white relative z-10" data-aos="fade-up">
          <p className="text-sm uppercase tracking-[0.4em] mb-4 opacity-80">{heroSubtitle}</p>
          <h1 className="text-4xl md:text-6xl font-serif font-semibold mb-6 italic tracking-tight">{heroTitle}</h1>
          <p className="text-white/70 text-base md:text-lg mb-8 max-w-2xl mx-auto font-light leading-relaxed">
            {heroDesc}
          </p>
        </div>
      </section>

      {/* DYNAMIC GLOBAL PLATFORM SECTION */}
      <GlobalPlatform />

      {/* DYNAMIC MISSION & VISION SECTION */}
      <MissionVision />

      <StatsCounter />

      {/* WHY ATTEND SECTION */}
      <WhyAttend />





      {/* WHO SHOULD ATTEND */}
      <WhoShouldAttend />
      <OrganizedBy />

      <ExhibitorLogos />

      {/* FINAL CALL TO ACTION */}
      {/* <section className="py-24 bg-[#FFFDF1] border-t border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto p-12 rounded-3xl bg-white shadow-2xl overflow-hidden relative group">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#23471d]" />
            <h2 className="text-3xl font-serif text-slate-900 mb-6">Want to be part of IH&WE 2026?</h2>
            <p className="text-slate-600 mb-10">Join thousands of healthcare leaders and pioneers in building the future of wellness.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact">
                <button className="px-10 py-4 bg-[#23471d] text-white rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-[#d26019] transition-all shadow-lg hover:-translate-y-1">
                  Contact Us
                </button>
              </Link>
              <Link to="/exhibition">
                <button className="px-10 py-4 border-2 border-[#23471d] text-[#23471d] rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-[#23471d] hover:text-white transition-all shadow-lg hover:-translate-y-1">
                  Explore Expo
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default About;
