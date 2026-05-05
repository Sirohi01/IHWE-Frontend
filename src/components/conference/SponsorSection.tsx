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
    <section className="py-2 bg-white">
      <div className="mx-auto max-w-[1380px] relative left-[20px] px-4">
        <div className="bg-[#F8FAFC] rounded-[24px] border border-[#E2E8F0] p-5">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            {/* Left text */}
            <div className="lg:w-[35%] flex-shrink-0">
              <div className="space-y-2">
                <div className="space-y-1">
                  <p className="text-[14px] font-black text-[#0B2C66] uppercase tracking-tight">
                    SPONSOR THE
                  </p>
                  <h2 className="text-[24px] font-[900] text-[#4E9F3D] leading-tight uppercase">
                    FUTURE OF HEALTHCARE
                  </h2>
                </div>
                <p className="text-[13px] text-[#5F6B7A] leading-relaxed max-w-sm">
                  Position your brand at the center of meaningful conversations
                  and connect with a global audience of decision-makers and
                  innovators.
                </p>
                <button className="flex items-center gap-2 bg-[#4E9F3D] text-white text-[11px] font-bold px-7 py-3 rounded-full uppercase tracking-wider hover:bg-[#3d7e30] transition-all shadow-md">
                  BECOME A CONFERENCE SPONSOR
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right benefits grid - single row with separators */}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0">
              {sponsorBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className={`px-4 py-2 flex flex-col items-center text-center gap-4 group ${
                    index !== 0 ? "lg:border-l border-gray-100" : ""
                  }`}
                >
                  <div className="w-12 h-12 flex items-center justify-center text-[#4E9F3D]">
                    <benefit.icon className="w-8 h-8 stroke-[1.5px] group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-[11px] font-bold text-[#1C2B3A] leading-tight">
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