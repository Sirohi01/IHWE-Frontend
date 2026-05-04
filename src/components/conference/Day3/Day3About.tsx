import React from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Users, 
  Globe, 
  Apple, 
  Microscope, 
  Handshake 
} from "lucide-react";

const focusAreas = [
  { icon: ShieldCheck, title: "Preventive Medicine & Early Detection" },
  { icon: Users, title: "Public Health & Community Wellness" },
  { icon: Globe, title: "Sustainability & Planetary Health" },
  { icon: Apple, title: "Nutrition, Lifestyle & Mental Well-being" },
  { icon: Microscope, title: "Research, Innovation & Evidence-based Care" },
  { icon: Handshake, title: "Policy, Advocacy & Global Partnerships" },
];

const Day3About: React.FC = () => {
  return (
    <section className="py-10 bg-[#F8FAFC]">
      <div className="container mx-auto px-6 max-w-[1400px] relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

          {/* About Text */}
          <div className="lg:w-[40%]">
            <h2 className="text-[16px] font-black text-[#4E9F3D] uppercase tracking-[0.1em] mb-4">
              About Day 3
            </h2>

            <div className="relative pl-6">
              {/* Green Vertical Line */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#4E9F3D] rounded-full" />

              <div className="space-y-4">
                <p className="text-[13px] md:text-[14px] text-[#4A5568] leading-[1.6] font-medium">
                  The Future of Preventive Healthcare Conference focuses on building a proactive healthcare ecosystem through prevention, early detection, public health strategies, and sustainability.
                </p>
                <p className="text-[15px] md:text-[16px] text-[#4A5568] leading-[1.7] font-medium">
                  This day brings together global thought leaders to create actionable solutions for a healthier, resilient & sustainable future.
                </p>
              </div>
            </div>
          </div>

          {/* Key Focus Areas */}
          <div className="lg:w-[60%]">
            <h2 className="text-[16px] font-black text-[#4E9F3D] uppercase tracking-[0.1em] mb-4">
              Key Focus Areas
            </h2>

            <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2">
              {focusAreas.map((area, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 p-2 rounded-[16px] border border-transparent hover:bg-white hover:shadow-sm transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#F0FDF4] flex items-center justify-center text-[#4E9F3D] shrink-0 border border-[#DCFCE7]/50 shadow-sm">
                    <area.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[13px] font-black text-[#0B2C66] leading-snug">
                    {area.title}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Day3About;
