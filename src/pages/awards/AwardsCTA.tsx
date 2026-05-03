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
        <div className="container mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-6">
            <div className="shrink-0 w-24 h-24 md:w-30 md:h-30 overflow-hidden flex items-center justify-center -my-4">
              <img 
                src={ctaImg} 
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
          <div className="flex flex-wrap items-center gap-4">
            <Link 
              to="/awards/nomination"
              className="bg-[#008d48] text-white px-7 py-3 rounded-lg text-[11px] font-black uppercase tracking-widest flex items-center gap-2.5 transition-all hover:bg-[#007a3e] border border-white/10 shadow-lg"
            >
              NOMINATE NOW
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              to="/contact"
              className="bg-white text-[#002b5c] px-7 py-3 rounded-lg text-[11px] font-black uppercase tracking-widest flex items-center gap-2.5 transition-all hover:bg-slate-50 shadow-lg"
            >
              CONTACT US
              <Phone className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AwardsCTA;
