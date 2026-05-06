import React from "react";
import { motion } from "framer-motion";
import { 
  Globe, 
  Leaf, 
  Dumbbell, 
  Sparkles, 
  Apple, 
  Users 
} from "lucide-react";

const focusAreas = [
  { icon: Globe, title: "Wellness Economy & Global Opportunities" },
  { icon: Leaf, title: "Ayurveda, AYUSH & Holistic Healing" },
  { icon: Dumbbell, title: "Fitness, Preventive Health & Lifestyle Medicine" },
  { icon: Sparkles, title: "Beauty, Personal Care & Wellness Innovation" },
  { icon: Apple, title: "Organic Living, Nutrition & Sustainable Wellness" },
  { icon: Users, title: "Wellness Leaders Networking" },
];

const Day2About: React.FC = () => {
  return (
    <section className="py-4 bg-[#F8FAFC]">
      <div className="container mx-auto px-6 max-w-[1320px] relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

          {/* About Text */}
          <div className="lg:w-[40%]">
            <h2 className="text-[16px] font-black text-[#4E9F3D] uppercase tracking-[0.1em] mb-4">
              About Day 2
            </h2>

            <div className="relative pl-6">
              {/* Green Vertical Line */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#4E9F3D] rounded-full" />

              <div className="space-y-4">
                <p className="text-[13px] md:text-[14px] text-[#4A5568] leading-[1.6] font-medium">
                  The Global Wellness Leadership Forum brings together wellness leaders, healers, nutritionists, fitness experts, policymakers, and innovators to explore holistic well-being, lifestyle medicine, natural healing, and sustainable wellness solutions.
                </p>
                <p className="text-[15px] md:text-[16px] text-[#4A5568] leading-[1.7] font-medium">
                  This summit focuses on building a healthier society through prevention, lifestyle, and holistic approaches to well-being.
                </p>
              </div>
            </div>
          </div>

          {/* Key Focus Areas */}
          <div className="lg:w-[60%]">
            <h2 className="text-[16px] font-black text-[#4E9F3D] uppercase tracking-[0.1em] mb-4">
              Key Focus Areas
            </h2>

            <div className="grid sm:grid-cols-2 gap-x-4 gap-y-0.5">
              {focusAreas.map((area, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-2.5 p-1 rounded-[16px] border border-transparent hover:bg-white hover:shadow-sm transition-all group"
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

export default Day2About;
