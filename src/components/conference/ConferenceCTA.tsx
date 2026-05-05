import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Users } from "lucide-react";

const ConferenceCTA: React.FC = () => {
  return (
    <section className="py-4 bg-white overflow-hidden">
      <div className="mx-auto max-w-[1380px] relative left-[20px] px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[24px] bg-[#0A1A31] p-6 md:p-8 shadow-xl"
        >
          <div className="flex flex-col lg:flex-row items-center gap-8 relative z-10">
            {/* Left Skeleton Leaf */}
            <div className="hidden lg:block flex-shrink-0">
              <div className="w-[100px] h-[100px] opacity-70">
                <svg viewBox="0 0 100 100" className="w-full h-full text-[#A3E635]">
                  <path 
                    d="M50 10 C30 30 10 60 50 90 C90 60 70 30 50 10 M50 10 L50 90 M50 30 L30 45 M50 30 L70 45 M50 50 L25 70 M50 50 L75 70 M50 70 L35 80 M50 70 L65 80" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-[24px] md:text-[32px] font-[900] text-white leading-[1.1] mb-2 uppercase tracking-tight">
                Be Part of the <span className="text-[#A3E635]">Conversation</span><br />
                That Shapes <span className="text-[#1E88E5]">Tomorrow</span>
              </h2>
              <p className="text-[14px] text-white/50 font-medium max-w-2xl mx-auto lg:mx-0">
                Join India's most influential healthcare and wellness conference platform.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0 w-full lg:w-auto">
              <button className="px-7 py-3.5 rounded-full bg-[#4E9F3D] text-white font-bold text-[12px] uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#3d7e30] transition-all shadow-lg">
                BOOK YOUR DELEGATE PASS
                <ChevronRight className="w-4 h-4" />
              </button>

              <button className="px-7 py-3.5 rounded-full border border-white/20 text-white font-bold text-[12px] uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white/5 transition-all">
                PARTNER WITH US
                <Users className="w-4 h-4 text-[#A3E635]" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConferenceCTA;