import React from "react";
import { motion } from "framer-motion";
import { Activity, ShieldCheck, Cpu, FlaskConical, Building2, Globe } from "lucide-react";
import amanImage from "../../../assets/bhiya.png";

const focusAreas = [
  { icon: Activity, title: "Smart Hospitals & Digital Transformation" },
  { icon: ShieldCheck, title: "Medical Devices & Innovation" },
  { icon: Cpu, title: "AI, HealthTech & Digital Health" },
  { icon: FlaskConical, title: "Diagnostics, Labs & Precision Medicine" },
  { icon: Building2, title: "Healthcare Infrastructure & Investment" },
  { icon: Globe, title: "Leadership, Policy & Global Collaboration" },
];

const Day1About: React.FC = () => {
  return (
    <section className="py-2 bg-white mt-4">
      <div className="container mx-auto px-6 max-w-[1320px] relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

          {/* About Text */}
          <div className="lg:w-[40%]">
            <h2 className="text-[16px] font-black text-[#4E9F3D] uppercase tracking-[0.1em] mb-4">
              About Day 1
            </h2>

            <div className="relative pl-6">
              {/* Green Vertical Line */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#4E9F3D] rounded-full" />

              <div className="space-y-4">
                <p className="text-[13px] md:text-[14px] text-[#4A5568] leading-[1.6] font-medium">
                  The Healthcare Innovation Summit brings together visionaries, technologists, clinicians, and industry leaders to explore the latest advancements shaping the future of healthcare.
                </p>
                <p className="text-[15px] md:text-[16px] text-[#4A5568] leading-[1.7] font-medium">
                  From smart hospitals to AI-powered diagnostics, this summit focuses on building resilient, efficient, and patient-centric healthcare systems.
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
                  className="flex items-center gap-3 p-2 rounded-[16px] border border-transparent hover:bg-[#FBFDFB] transition-all group"
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

export default Day1About;
