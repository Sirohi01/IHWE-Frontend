import React from "react";
import { motion } from "framer-motion";
import { Download, Handshake } from "lucide-react";

const Day3BottomCTA: React.FC = () => {
  return (
    <section className="pt-2 pb-0 bg-white">
      <div className="container mx-auto px-6 max-w-[1380px]">
        
        {/* Banner */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 py-6 px-10 rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0]">
          <div className="flex items-center gap-6 text-center lg:text-left">
            <div className="w-16 h-16 rounded-2xl bg-[#E6F3E6] flex items-center justify-center text-[#4E9F3D]">
              <Handshake className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-[20px] font-black text-[#0B2C66] uppercase tracking-tight">
                LET'S CREATE A HEALTHIER TOMORROW TOGETHER!
              </h2>
              <p className="text-[14px] font-bold text-[#5F6B7A] mt-1">
                Partner with Arogya Sanghosthi and make a lasting impact.
              </p>
            </div>
          </div>

          <button className="flex items-center gap-3 px-8 py-4 bg-[#1A4D2E] text-white rounded-full font-black text-[12px] uppercase tracking-widest shadow-xl hover:bg-[#0B2C66] transition-all group">
            DOWNLOAD SPONSORSHIP BROCHURE
            <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>



      </div>
    </section>
  );
};

export default Day3BottomCTA;
