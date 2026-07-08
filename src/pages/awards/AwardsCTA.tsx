import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import ctaImg from "../../assets/cta.png";

const AwardsCTA = () => {
  return (
    <section className="relative overflow-hidden">
      <div 
        className="w-full py-4 md:py-5 flex items-center min-h-[100px]"
        style={{
          background: "linear-gradient(90deg, #002b5c 0%, #002b5c 40%, #008d48 100%)"
        }}
      >
        {/* Full width CTA content */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-6">
            <div className="shrink-0 w-24 h-24 md:w-30 md:h-30 overflow-hidden flex items-center justify-center -my-4">
              <img loading="lazy" decoding="async" src={ctaImg} 
                alt="Award Branding" 
                className="w-full h-auto min-h-full object-cover scale-110" 
                style={{ objectPosition: 'center' }}
              />
            </div>

            <div className="flex flex-col text-left">
              <h2 className="text-white text-[20px] md:text-[28px] font-bold font-serif leading-tight">
                Be Recognized. Be Celebrated. Be Honoured.
              </h2>
              <p className="text-white/70 text-[13px] md:text-[15px] font-medium leading-tight mt-1">
                Nominate yourself or someone who truly deserves this recognition.
              </p>
            </div>
          </div>

          {/* Linked Buttons */}
          <div className="flex flex-row items-center justify-center md:justify-end gap-2 md:ml-auto shrink-0 w-full md:w-auto">
            <Link 
              to="/awards/nomination"
              className="flex-1 md:flex-none justify-center bg-[#008d48] text-white px-2 md:px-7 py-2.5 rounded-xl text-[10px] md:text-[12px] font-black uppercase tracking-widest flex items-center gap-1.5 md:gap-2 transition-all hover:bg-[#007a3e] shadow-lg active:scale-95 whitespace-nowrap"
            >
              NOMINATE NOW
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link 
              to="/contact"
              className="flex-1 md:flex-none justify-center bg-white text-[#002b5c] px-2 md:px-7 py-2.5 rounded-xl text-[10px] md:text-[12px] font-black uppercase tracking-widest flex items-center gap-1.5 md:gap-2 transition-all hover:bg-slate-50 shadow-lg active:scale-95 border border-slate-100 whitespace-nowrap"
            >
              CONTACT US
              <Phone className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AwardsCTA;
