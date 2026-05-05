import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Ticket, Users, Wallet } from "lucide-react";


// Using Unsplash placeholder images for the background textures (city/circuit/tech feel)
const bgTextures = [
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80"
];

const Day1CTA: React.FC = () => {
  return (
    <section className="relative py-10 overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
          className="w-full h-full object-cover"
          alt="Section Background"
        />

      </div>
      <div className="container mx-auto px-6 max-w-[1320px] relative z-10">
        <div className="grid md:grid-cols-3 gap-6">

          {/* Card 1: BE PART OF DAY 1 */}
          <motion.div
            whileHover={{ y: -5 }}
            className="relative h-[220px] rounded-[24px] overflow-hidden group shadow-xl"
          >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1A4D2E] to-[#4E9F3D] z-0" />
            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-20 mix-blend-overlay">
              <img src={bgTextures[0]} className="w-full h-full object-cover" alt="" />
            </div>

            <div className="relative z-10 p-8 h-full flex flex-col">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0">
                  <div className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="pt-1">
                  <h3 className="text-[18px] font-black text-white uppercase tracking-tight leading-tight">
                    Be Part Of <br /> Day 1
                  </h3>
                  <p className="text-[12px] text-white/80 font-medium leading-relaxed mt-2 line-clamp-2">
                    Join the leaders and innovators shaping the future of healthcare.
                  </p>
                </div>
              </div>

              <button className="mx-auto mt-auto w-fit px-8 py-3 bg-white text-[#1A4D2E] rounded-full font-black text-[11px] uppercase tracking-widest flex items-center gap-3 hover:bg-[#0B2C66] hover:text-white transition-all shadow-lg">
                Register For Day 1
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
              <img src={bgTextures[1]} className="w-full h-full object-cover" alt="" />
            </div>

            <div className="relative z-10 p-8 h-full flex flex-col">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0">
                  <div className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center">
                    <Ticket className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="pt-1">
                  <h3 className="text-[18px] font-black text-white uppercase tracking-tight leading-tight">
                    Delegate <br /> Pass
                  </h3>
                  <p className="text-[12px] text-white/80 font-medium leading-relaxed mt-2 line-clamp-2">
                    Access all 3 days of conferences, networking & more.
                  </p>
                </div>
              </div>

              <button className="mt-auto w-fit px-8 py-3 bg-white text-[#0B2C66] rounded-full font-black text-[11px] uppercase tracking-widest flex items-center gap-3 hover:bg-[#1E88E5] hover:text-white transition-all shadow-lg mx-auto">
                Book Delegate Pass
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
              <img src={bgTextures[2]} className="w-full h-full object-cover" alt="" />
            </div>

            <div className="relative z-10 p-8 h-full flex flex-col">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0">
                  <div className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="pt-1">
                  <h3 className="text-[18px] font-black text-white uppercase tracking-tight leading-tight">
                    Sponsor & <br /> Partner
                  </h3>
                  <p className="text-[12px] text-white/80 font-medium leading-relaxed mt-2 line-clamp-2">
                    Showcase your brand and connect with decision-makers.
                  </p>
                </div>
              </div>

              <button className="mt-auto w-fit px-8 py-3 bg-white text-[#1A4D2E] rounded-full font-black text-[11px] uppercase tracking-widest flex items-center gap-3 hover:bg-[#4E9F3D] hover:text-white transition-all shadow-lg mx-auto">
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

export default Day1CTA;
