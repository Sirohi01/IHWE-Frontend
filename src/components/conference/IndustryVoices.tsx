// components/conference/IndustryVoices.tsx
import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    text: "IHWE Conference brings together the right mix of innovation, knowledge, and people who are truly committed to building a healthier world.",
    author: "Dr. B. S. Ajaikumar",
    role: "Chairman, HCG Hospitals",
  },
  {
    text: "A fantastic platform to exchange ideas, explore partnerships, and understand where the future of healthcare is headed.",
    author: "Anurag Batra",
    role: "Chairman & Editor-in-Chief, BW Businessworld",
  },
  {
    text: "IHWE sets the stage for meaningful conversations that lead to real impact in healthcare and wellness.",
    author: "Dr. Mickey Mehta",
    role: "Global Leading Holistic Health Guru",
  },
];

const IndustryVoices: React.FC = () => {
  return (
    <section className="py-16 bg-[#F8FCF9]">
      <div className="container mx-auto px-6 max-w-[1320px]">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-px w-8 bg-[#4E9F3D]" />
              <span className="text-[10px] font-black text-[#4E9F3D] uppercase tracking-[0.2em]">
                VOICES FROM
              </span>
            </div>
            <h2 className="text-[36px] font-black text-[#1a3a32]">
              Industry <span className="text-[#4E9F3D]">Leaders</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-semibold text-[#4E9F3D] cursor-pointer hover:underline">
              VIEW ALL TESTIMONIALS →
            </span>
            <button className="w-10 h-10 rounded-full border border-[#E6ECF3] flex items-center justify-center hover:bg-white transition-all shadow-sm">
              <ChevronLeft className="w-5 h-5 text-[#5F6B7A]" />
            </button>
            <button className="w-10 h-10 rounded-full bg-[#4E9F3D] flex items-center justify-center hover:bg-[#2E7D32] transition-all shadow-md">
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Testimonial cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-[24px] shadow-md border border-[#E6ECF3] relative group hover:-translate-y-1 transition-all duration-300"
            >
              {/* Large decorative quote mark */}
              <div className="absolute top-5 left-5 text-[52px] leading-none text-[#E8F5E9] font-serif group-hover:text-[#c8e6c9] transition-colors select-none">
                "
              </div>

              <div className="relative z-10 pt-4 space-y-6">
                <p className="text-[14px] text-[#5F6B7A] leading-[1.7] italic">
                  "{item.text}"
                </p>
                <div className="border-t border-[#E6ECF3] pt-4">
                  <h4 className="font-black text-[#1a3a32] text-[15px] mb-1">
                    — {item.author}
                  </h4>
                  <p className="text-[10px] font-bold text-[#4E9F3D] uppercase tracking-widest">
                    {item.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`rounded-full transition-all ${i === 0
                  ? "w-5 h-2 bg-[#4E9F3D]"
                  : "w-2 h-2 bg-[#E6ECF3]"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustryVoices;