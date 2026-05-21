import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { SERVER_URL } from '../../lib/api';

interface FabricationFooterProps {
  footer?: any;
}

const FabricationFooter: React.FC<FabricationFooterProps> = ({ footer }) => {
  const footerImgUrl = footer?.image?.startsWith('/uploads') ? `${SERVER_URL}${footer.image}` : (footer?.image || "/images/stall.png");

  return (
    <footer className="bg-[#f5f7fa] py-2">
      <div className="max-w-[1500px] mx-auto">

        <div
          className="relative overflow-hidden rounded-[6px] border border-[#0d3147]"
          style={{
            background:
              "linear-gradient(90deg, #00111d 0%, #00243a 35%, #00192a 100%)",
          }}
        >

          {/* LIGHT EFFECT */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-[20%] w-[300px] h-[300px] bg-[#00b7c2] blur-[140px]" />
            <div className="absolute bottom-0 right-[10%] w-[250px] h-[250px] bg-[#00b7c2] blur-[120px]" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between text-center lg:text-left gap-4 py-4 lg:py-0">

            {/* LEFT */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 px-6 py-3 w-full lg:w-auto">

              {/* IMAGE */}
              <div className="w-[120px] md:w-[160px] shrink-0 hidden md:block">
                <img
                  src={footerImgUrl}
                  alt="Stall"
                  className="w-full object-contain opacity-95"
                />
              </div>

              {/* TEXT */}
              <div>
                <h3 className="text-white uppercase font-black leading-[1.05] text-[16px] md:text-[20px]">
                  {footer?.footerTitle || "LET’S DESIGN."}
                  <br />
                  {footer?.footerSubtitle || "LET’S BUILD."}
                  <br />
                  <span className="text-[#00a9b7]">
                    {footer?.footerItalicText || "LET'S GROW TOGETHER!"}
                  </span>
                </h3>
              </div>

            </div>

            {/* DIVIDER */}
            <div className="hidden lg:block w-[1px] h-[90px] bg-white/20" />

            {/* EMAIL */}
            <a href={`mailto:${footer?.email || "info@ihwe.in"}`} className="flex items-center gap-4 px-6 py-3 hover:opacity-90 transition-all duration-300">

              <div className="w-12 h-12 md:w-[64px] md:h-[64px] rounded-full bg-[#0097a7] flex items-center justify-center shadow-lg shrink-0">
                <Mail className="w-[22px] h-[22px] md:w-[30px] md:h-[30px] text-white" />
              </div>

              <h4 className="text-white text-[16px] md:text-[18px] lg:text-[20px] font-semibold tracking-wide hover:text-[#00b7c2] transition-colors">
                {footer?.email || "info@ihwe.in"}
              </h4>

            </a>

            {/* DIVIDER */}
            <div className="hidden lg:block w-[1px] h-[90px] bg-white/20" />

            {/* PHONE */}
            <a href={`tel:${(footer?.phone || "+919654900525").replace(/\s+/g, '')}`} className="flex items-center gap-4 px-6 py-3 hover:opacity-90 transition-all duration-300">

              <div className="w-12 h-12 md:w-[64px] md:h-[64px] rounded-full bg-[#00a388] flex items-center justify-center shadow-lg shrink-0">
                <Phone className="w-[22px] h-[22px] md:w-[30px] md:h-[30px] text-white" />
              </div>

              <h4 className="text-white text-[16px] md:text-[18px] lg:text-[18px] font-semibold tracking-wide hover:text-[#00a388] transition-colors">
                {footer?.phone || "+91 9654900525"}
              </h4>

            </a>

            {/* DIVIDER */}
            <div className="hidden lg:block w-[1px] h-[90px] bg-white/20" />

          </div>

        </div>

      </div>
    </footer>
  );
};

export default FabricationFooter;