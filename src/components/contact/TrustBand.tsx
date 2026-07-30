import React from "react";
import SectionContainer from "@/components/layout/SectionContainer";
import c1 from "@/assets/c1.webp";
import c2 from "@/assets/c2.webp";
import c3 from "@/assets/c3.webp";
import c4 from "@/assets/c4.webp";

const TrustBand = () => {
  return (
    <section className="relative z-30 -mt-16">
      <SectionContainer>
        <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100 py-5 px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-y-8">
            {[
              { img: c1, top: "100% SECURE", bot: "Your information is safe with us" },
              { img: c2, top: "DEDICATED TEAM", bot: "We are here to help" },
              { img: c3, top: "QUICK RESPONSE", bot: "We reply within 24 hrs" },
              { img: c4, top: "TRUSTED SUPPORT", bot: "Your satisfaction is our priority" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 px-6 border-gray-300 md:border-r last:border-none">
                <img loading="lazy" decoding="async" src={item.img} alt={item.top} className="w-12 h-12 object-contain shrink-0" />
                <div>
                  <p className="text-[13px] font-bold text-[#044716] leading-tight tracking-tight">{item.top}</p>
                  <p className="text-[11px] text-gray-900 font-bold leading-tight mt-1">{item.bot}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
};

export default TrustBand;
