import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import backgroundImage from "../../../assets/delegatepassimage/backgroundimage.png";
import one8 from "../../../assets/delegatepassimage/one8.png";
import one7 from "../../../assets/delegatepassimage/one7.png";
import one6 from "../../../assets/delegatepassimage/one6.png";

const bgTextures = [
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80"
];

interface Day3CTAProps {
  data?: {
    bePartTitle: string;
    bePartDescription: string;
    delegatePass: { title: string; description: string };
    sponsor: { title: string; description: string };
  };
}

const Day3CTA: React.FC<Day3CTAProps> = ({ data }) => {
  const ctaData = data || {
    bePartTitle: "Be Part Of Day 3",
    bePartDescription: "Join leaders and innovators shaping the future of preventive healthcare.",
    delegatePass: { title: "Delegate Pass", description: "Access all 3 days of conferences, networking & more." },
    sponsor: { title: "Sponsor & Partner", description: "Showcase your brand and connect with global health leaders." }
  };

  return (
    <section className="relative py-4 overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img loading="lazy" decoding="async" src={backgroundImage}
          className="w-full h-full object-cover"
          alt="Section Background"
        />
      </div>

      <div className="container mx-auto px-6 max-w-[1320px] relative z-10">
        <div className="grid md:grid-cols-3 gap-6">

          {/* Card 1: BE PART OF */}
          <motion.div
            whileHover={{ y: -5 }}
            className="relative h-[220px] rounded-[24px] overflow-hidden group shadow-xl"
          >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1A4D2E] to-[#4E9F3D] z-0" />
            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-20 mix-blend-overlay">
              <img loading="lazy" decoding="async" src={bgTextures[0]} className="w-full h-full object-cover" alt="" />
            </div>

            <div className="relative z-10 p-5 h-full flex flex-col">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-24 h-24 flex items-center justify-center shrink-0 -ml-4">
                  <img loading="lazy" decoding="async" src={one8} alt={ctaData.bePartTitle} className="w-full h-full object-contain" />
                </div>
                <div className="pt-1">
                  <h3 className="text-[21px] font-black text-white uppercase tracking-tight leading-tight whitespace-pre-line">
                    {ctaData.bePartTitle.replace('Of ', 'Of \n')}
                  </h3>
                  <p className="text-[13px] text-white/80 font-medium leading-relaxed mt-2 line-clamp-2">
                    {ctaData.bePartDescription}
                  </p>
                </div>
              </div>

              <button className="mx-auto mt-2 w-fit px-8 py-3 bg-white text-[#1A4D2E] rounded-full font-black text-[11px] uppercase tracking-widest flex items-center gap-3 hover:bg-[#0B2C66] hover:text-white transition-all shadow-lg">
                Register Now
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Card 2: DELEGATE PASS */}
          <motion.div
            whileHover={{ y: -5 }}
            className="relative h-[220px] rounded-[24px] overflow-hidden group shadow-xl"
          >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0B2C66] to-[#1E88E5] z-0" />
            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-20 mix-blend-overlay">
              <img loading="lazy" decoding="async" src={bgTextures[1]} className="w-full h-full object-cover" alt="" />
            </div>

            <div className="relative z-10 p-5 h-full flex flex-col">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-24 h-24 flex items-center justify-center shrink-0 -ml-4">
                  <img loading="lazy" decoding="async" src={one7} alt={ctaData.delegatePass.title} className="w-full h-full object-contain" />
                </div>
                <div className="pt-1">
                  <h3 className="text-[21px] font-black text-white uppercase tracking-tight leading-tight whitespace-pre-line">
                    {ctaData.delegatePass.title.replace(' ', ' \n')}
                  </h3>
                  <p className="text-[13px] text-white/80 font-medium leading-relaxed mt-2 line-clamp-2">
                    {ctaData.delegatePass.description}
                  </p>
                </div>
              </div>

              <button className="mt-2 w-fit px-8 py-3 bg-white text-[#0B2C66] rounded-full font-black text-[11px] uppercase tracking-widest flex items-center gap-3 hover:bg-[#1E88E5] hover:text-white transition-all shadow-lg mx-auto">
                Book Now
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Card 3: SPONSOR & PARTNER */}
          <motion.div
            whileHover={{ y: -5 }}
            className="relative h-[220px] rounded-[24px] overflow-hidden group shadow-xl"
          >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#112D26] to-[#1A4D2E] z-0" />
            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-20 mix-blend-overlay">
              <img loading="lazy" decoding="async" src={bgTextures[2]} className="w-full h-full object-cover" alt="" />
            </div>

            <div className="relative z-10 p-5 h-full flex flex-col">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-24 h-24 flex items-center justify-center shrink-0 -ml-4">
                  <img loading="lazy" decoding="async" src={one6} alt={ctaData.sponsor.title} className="w-full h-full object-contain" />
                </div>
                <div className="pt-1">
                  <h3 className="text-[21px] font-black text-white uppercase tracking-tight leading-tight whitespace-pre-line">
                    {ctaData.sponsor.title.replace('& ', '& \n')}
                  </h3>
                  <p className="text-[13px] text-white/80 font-medium leading-relaxed mt-2 line-clamp-2">
                    {ctaData.sponsor.description}
                  </p>
                </div>
              </div>

              <button className="mt-2 w-fit px-8 py-3 bg-white text-[#1A4D2E] rounded-full font-black text-[11px] uppercase tracking-widest flex items-center gap-3 hover:bg-[#4E9F3D] hover:text-white transition-all shadow-lg mx-auto">
                Become A Sponsor
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section >
  );
};

export default Day3CTA;


