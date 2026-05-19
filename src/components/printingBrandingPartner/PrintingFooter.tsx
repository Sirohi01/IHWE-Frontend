import React from 'react';
import {
  Users,
  Globe,
  Mail,
  Phone,
  QrCode,
  Plane,
} from 'lucide-react';
import { Link } from 'react-router-dom';


const PricingFooter = () => {
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

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-3 px-6 py-3 w-full lg:w-auto">

          {/* IMAGE */}
          <div className="w-[160px] shrink-0 hidden md:block">
            <img
              src="/images/stall.png"
              alt="Stall"
              className="w-full object-contain opacity-95"
            />
          </div>

          {/* TEXT */}
          <div>
            <h3 className="text-white uppercase font-black leading-[1.05] text-[16px] md:text-[20px]">
              LET’S PRINT IMPACT.
              <br />
              LET’S BRAND SUCCESS.
              <br />
              <span className="text-[#00a9b7]">
                LET'S GROW TOGETHER!
              </span>
            </h3>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="hidden lg:block w-[1px] h-[90px] bg-white/20" />

        {/* EMAIL */}
        <div className="flex items-center gap-4 px-6 py-5">

          <div className="w-[64px] h-[64px] rounded-full bg-[#0097a7] flex items-center justify-center shadow-lg">
            <Mail className="w-[30px] h-[30px] text-white" />
          </div>

          <h4 className="text-white text-[20px] font-semibold tracking-wide">
            partner@ihwe.in
          </h4>

        </div>

        {/* DIVIDER */}
        <div className="hidden lg:block w-[1px] h-[90px] bg-white/20" />

        {/* PHONE */}
        <div className="flex items-center gap-4 px-6 py-5">

          <div className="w-[64px] h-[64px] rounded-full bg-[#00a388] flex items-center justify-center shadow-lg">
            <Phone className="w-[30px] h-[30px] text-white" />
          </div>

          <h4 className="text-white text-[18px] font-semibold tracking-wide">
            +91 9654900525
          </h4>

        </div>
        <div className="hidden lg:block w-[1px] h-[90px] bg-white/20" />

  <div className="flex items-center gap-4 px-6 py-5">

          <div className="w-[64px] h-[64px] rounded-full bg-[#0097a7] flex items-center justify-center shadow-lg">
            <Globe className="w-[30px] h-[30px] text-white" />
          </div>

          <h4 className="text-white text-[20px] font-semibold tracking-wide">
            www.ihwe.in
          </h4>

        </div>
        {/* DIVIDER */}

        {/* Register Button */}
        <div className="flex items-center gap-4 px-6 py-5">
          <Link to="/partner-registration" target="_blank">
            <button className="bg-[#619941] hover:bg-[#58b02d] transition-all duration-300 text-white uppercase px-6 py-2.5 rounded-md text-xs sm:text-sm font-bold shadow-md tracking-wider">
              Register As Partner
            </button>
          </Link>
        </div>

      </div>

    </div>

  </div>
</footer>
  )
}

export default PricingFooter