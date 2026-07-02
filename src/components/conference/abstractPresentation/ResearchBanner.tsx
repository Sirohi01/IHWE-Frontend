import React from "react";

const ResearchBanner: React.FC = () => {
  return (
    <section className="w-full py-2">
      <div className="px-5 sm:px-6 lg:px-12">
        <div className="flex min-h-[80px] items-center justify-between gap-6 px-6 py-4 sm:px-8 md:px-10 rounded-xl bg-[#0a1c63] shadow-sm relative overflow-hidden">
          
          {/* Subtle background decoration */}
          <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />

          {/* Text */}
          <div className="text-white relative z-10">
            <h2 className="text-[15px] md:text-[17px] font-bold tracking-wide uppercase leading-tight">
              READY TO SUBMIT YOUR ABSTRACT?
            </h2>

            <p className="mt-1 text-[11.5px] text-white/90 max-w-[500px]">
              Be a part of a global platform for innovation and collaboration.
            </p>
          </div>


          {/* Button */}
          <button
            className="
              relative z-10
              flex shrink-0 items-center gap-2
              rounded-full
              bg-[#39a936]
              px-6 py-2.5
              text-[12px] font-bold uppercase text-white
              transition-all
              hover:bg-[#2f912e]
              hover:shadow-md
            "
          >
            SUBMIT ABSTRACT NOW
            <span className="text-[16px] leading-none mt-[-2px]">›</span>
          </button>

        </div>
      </div>
    </section>
  );
};

export default ResearchBanner;