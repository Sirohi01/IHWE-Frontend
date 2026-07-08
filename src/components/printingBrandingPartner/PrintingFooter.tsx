import React from 'react';
import { Globe, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const PricingFooter = ({ footer }) => {
  const content = footer || {
    successTitle: "LET’S PRINT IMPACT.",
    successSub: "LET’S BRAND SUCCESS. LET’S GROW TOGETHER!",
    email: 'partner@ihwe.in',
    phone: '+91 9654900525',
    website: 'www.ihwe.in',
    registerLink: '/partner-registration?type=printing'
  };

  return (
    <footer className="bg-[#f5f7fa] py-2">
      <div className="max-w-[1500px] mx-auto">
        <div
          className="relative overflow-hidden rounded-[6px] border border-[#0d3147]"
          style={{
            background: "linear-gradient(90deg, #00111d 0%, #00243a 35%, #00192a 100%)"
          }}
        >
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-[20%] w-[300px] h-[300px] bg-[#00b7c2] blur-[140px]" />
            <div className="absolute bottom-0 right-[10%] w-[250px] h-[250px] bg-[#00b7c2] blur-[120px]" />
          </div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between">
            <div className="flex items-center gap-3 px-6 py-3 w-full lg:w-auto">
              <div className="w-[160px] shrink-0 hidden md:block">
                <img loading="lazy" decoding="async" src="/images/stall.png"
                  alt="Stall"
                  className="w-full object-contain opacity-95"
                />
              </div>
              <div>
                <h3 className="text-white uppercase font-black leading-[1.05] text-[16px] md:text-[20px]">
                  {content.successTitle}
                  <br />
                  {content.successSub}
                </h3>
              </div>
            </div>
            <div className="hidden lg:block w-[1px] h-[90px] bg-white/20" />
            <div className="flex items-center gap-4 px-6 py-5">
              <div className="w-[64px] h-[64px] rounded-full bg-[#0097a7] flex items-center justify-center shadow-lg">
                <Mail className="w-[30px] h-[30px] text-white" />
              </div>
              <h4 className="text-white text-[20px] font-semibold tracking-wide">{content.email}</h4>
            </div>
            <div className="hidden lg:block w-[1px] h-[90px] bg-white/20" />
            <div className="flex items-center gap-4 px-6 py-5">
              <div className="w-[64px] h-[64px] rounded-full bg-[#00a388] flex items-center justify-center shadow-lg">
                <Phone className="w-[30px] h-[30px] text-white" />
              </div>
              <h4 className="text-white text-[18px] font-semibold tracking-wide">{content.phone}</h4>
            </div>
            <div className="hidden lg:block w-[1px] h-[90px] bg-white/20" />
            <div className="flex items-center gap-4 px-6 py-5">
              <div className="w-[64px] h-[64px] rounded-full bg-[#0097a7] flex items-center justify-center shadow-lg">
                <Globe className="w-[30px] h-[30px] text-white" />
              </div>
              <h4 className="text-white text-[20px] font-semibold tracking-wide">{content.website}</h4>
            </div>
            <div className="flex items-center gap-4 px-6 py-5">
              <Link to={content.registerLink} target="_blank">
                <button className="bg-[#619941] hover:bg-[#58b02d] transition-all duration-300 text-white uppercase px-6 py-2.5 rounded-md text-xs sm:text-sm font-bold shadow-md tracking-wider">
                  Register As Partner
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PricingFooter;