import React from "react";

const ResearchBanner: React.FC = () => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8">
      <div
        className="mx-auto max-w-[1320px] rounded-lg overflow-hidden"
        style={{
          backgroundImage: `url("/images/banner-bg.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex min-h-[106px] items-center justify-between gap-6 px-8 py-6 sm:px-10 md:px-12">
          
          {/* Text */}
          <div className="text-white">
            <h2 className="text-lg font-bold tracking-wide sm:text-xl">
              READY TO SHARE YOUR RESEARCH?
            </h2>

            <p className="mt-2 text-xs text-white/90 sm:text-sm">
              Submit your paper today and be a part of this global healthcare
              innovation summit.
            </p>
          </div>


          {/* Button */}
          <button
            className="
              flex shrink-0 items-center gap-3
              rounded-full
              bg-[#39a936]
              px-7 py-3.5
              text-xs font-semibold text-white
              transition-all
              hover:bg-[#2f912e]
              sm:px-10
            "
          >
            SUBMIT YOUR PAPER NOW
            <span className="text-lg">›</span>
          </button>

        </div>
      </div>
    </section>
  );
};

export default ResearchBanner;