// components/conference/SponsorSection.tsx
import React from "react";
import { motion } from "framer-motion";
import { Award, Target, Zap, TrendingUp, Users2, Globe } from "lucide-react";
import { ArrowRight } from "lucide-react";

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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 max-w-[1320px]">
        <div className="flex flex-col lg:flex-row items-start gap-12">
          {/* Left text */}
          <div className="lg:w-[38%]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <p className="text-[11px] font-black text-[#4E9F3D] uppercase tracking-[0.15em]">
                SPONSOR THE
              </p>
              <h2 className="text-[32px] font-black text-[#1C2B3A] leading-[1.2]">
                <span className="text-[#4E9F3D]">FUTURE</span> OF HEALTHCARE
              </h2>
              <p className="text-[14px] text-[#5F6B7A] leading-[1.65]">
                Position your brand at the center of meaningful conversations
                and connect with a global audience of decision-makers and
                innovators.
              </p>
              <button className="flex items-center gap-2 bg-[#4E9F3D] text-white text-[12px] font-bold px-7 py-3 rounded-full uppercase tracking-widest hover:bg-[#2E7D32] transition-all shadow-md">
                BECOME A CONFERENCE SPONSOR
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>

          {/* Right benefits grid */}
          <div className="lg:w-[62%] grid grid-cols-2 md:grid-cols-3 gap-4">
            {sponsorBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="p-5 rounded-[14px] bg-[#F7F9FC] border border-[#E6ECF3] flex flex-col items-center text-center gap-3 hover:border-[#4E9F3D] hover:bg-[#F1F8EE] transition-all group"
              >
                <div className="w-12 h-12 rounded-[12px] bg-[#E8F5E9] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <benefit.icon className="w-6 h-6 text-[#4E9F3D]" />
                </div>
                <span className="text-[11px] font-bold text-[#1C2B3A] text-center leading-snug">
                  {benefit.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SponsorSection;