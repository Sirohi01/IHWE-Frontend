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
    <section className="">
      <div className="mx-auto max-w-[1340px] pl-8 lg:pl-3">
        <div className="rounded-[24px] border border-[#E2E8F0] p-2" style={{ backgroundColor: '#F5F5F0' }}>
          <div className="flex flex-col lg:flex-row items-center gap-3">
            {/* LEFT CONTENT WITH PADDING LEFT */}
            <div className="lg:w-[35%] flex-shrink-0 pl-[20px]">
              <div className="space-y-0.5">
                <div className="space-y-0">
                  <p className="text-[12px] font-black text-[#0B2C66] uppercase tracking-tight">
                    SPONSOR THE
                  </p>
                  <h2 className="text-[18px] font-[900] text-[#4E9F3D] leading-tight uppercase">
                    FUTURE OF HEALTHCARE
                  </h2>
                </div>
                <p className="text-[10px] text-[#5F6B7A] leading-snug max">
                  Connect with global leaders and position your brand at the center of health innovation.
                </p>
              </div>
            </div>

            {/* VERTICAL LINE DIVIDER */}
            <div className="hidden lg:block w-px h-14 bg-gray-300"></div>

            {/* BENEFITS WITH VERTICAL LINES BETWEEN THEM */}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0">
              {sponsorBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className={`px-2 py-0.5 flex flex-col items-center text-center gap-1.5 group relative ${index !== 0 ? "lg:border-l border-gray-200" : ""
                    }`}
                >
                  <div className="w-8 h-8 flex items-center justify-center text-[#4E9F3D]">
                    <benefit.icon className="w-6 h-6 stroke-[1.5px] group-hover:scale-110 transition-transform" />
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