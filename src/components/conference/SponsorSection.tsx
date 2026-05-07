import React from "react";
import { motion } from "framer-motion";
import { Award, Target, Zap, TrendingUp, Users2, Globe, ChevronRight } from "lucide-react";

const sponsorBenefits = [
  { icon: Award, label: "Premium brand visibility" },
  { icon: Target, label: "Direct access to industry decision-makers" },
  { icon: Zap, label: "High-value networking opportunities" },
  { icon: TrendingUp, label: "Thought leadership positioning" },
  { icon: Users2, label: "Media & PR exposure" },
  { icon: Globe, label: "Global business connections" },
];

const SponsorSection: React.FC = () => {
  return (
    <section className="py-1 bg-white">
      <div className="mx-auto max-w-[1320px] px-4">
        <div className="bg-[#F8FAFC] rounded-[24px] border border-[#E2E8F0] p-3">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="lg:w-[35%] flex-shrink-0">
              <div className="space-y-1">
                <div className="space-y-0.5">
                  <p className="text-[12px] font-black text-[#0B2C66] uppercase tracking-tight">
                    SPONSOR THE
                  </p>
                  <h2 className="text-[18px] font-[900] text-[#4E9F3D] leading-tight uppercase">
                    FUTURE OF HEALTHCARE
                  </h2>
                </div>
                <p className="text-[12px] text-[#5F6B7A] leading-snug max-w-sm">
                  Connect with global leaders and position your brand at the center of health innovation.
                </p>
                <button className="flex items-center gap-1.5 bg-[#4E9F3D] text-white text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest hover:bg-[#3d7e30] transition-all shadow-md mt-1.5">
                  BECOME A CONFERENCE SPONSOR
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>


            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0">
              {sponsorBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className={`px-3 py-1 flex flex-col items-center text-center gap-3 group ${index !== 0 ? "lg:border-l border-gray-100" : ""
                    }`}
                >
                  <div className="w-10 h-10 flex items-center justify-center text-[#4E9F3D]">
                    <benefit.icon className="w-7 h-7 stroke-[1.5px] group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-[10px] font-bold text-[#1C2B3A] leading-tight">
                    {benefit.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SponsorSection;