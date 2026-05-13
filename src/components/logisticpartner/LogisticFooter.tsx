import React from 'react';
import {
  Mail,
  Phone,
  Globe,
  QrCode,
  Truck,
} from 'lucide-react';

import busAndTruck from '../../assets/logistic/raman.png';

const LogisticFooter: React.FC = () => {
  return (
    <footer className="bg-[#001D3D] py-0.5 mt-2">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <img src={busAndTruck} alt="Logistics" className="w-auto h-[60px] object-contain" />
          </div>



          <div className="flex flex-col">
            <h3 className="text-white font-black text-[14px] uppercase leading-tight whitespace-nowrap">
              LET'S MOVE SUCCESS <span className="text-[#4E9F3D]">TOGETHER!</span>
            </h3>
            <p className="text-white text-[8.5px] font-medium opacity-80 mt-0 max-w-[280px]">
              Partner with IHWE 2026 and deliver excellence at every step.
            </p>
          </div>
        </div>

        {/* Middle Section: Contact Info with Dividers */}
        <div className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-5 lg:gap-8 flex-1 border-x-0 lg:border-x border-white/10 lg:px-8">

          {/* Email */}
          <div className="flex items-center gap-2.5 group">
            <div className="w-[34px] h-[34px] bg-[#4E9F3D] rounded-full flex items-center justify-center text-white shadow-[0_0_10px_rgba(78,159,61,0.3)] transition-all duration-300 group-hover:scale-105">
              <Mail className="w-[16px] h-[16px]" />
            </div>
            <a href="mailto:partner@ihwe.in" className="text-white font-bold text-[12px] hover:text-[#4E9F3D] transition-colors">
              partner@ihwe.in
            </a>
          </div>

          <div className="hidden lg:block w-[1px] h-[25px] bg-white/10" />

          {/* Phone */}
          <div className="flex items-center gap-2.5 group">
            <div className="w-[34px] h-[34px] bg-[#4E9F3D] rounded-full flex items-center justify-center text-white shadow-[0_0_10px_rgba(78,159,61,0.3)] transition-all duration-300 group-hover:scale-105">
              <Phone className="w-[16px] h-[16px]" />
            </div>
            <a href="mailto:partner@ihwe.in" className="text-white font-bold text-[12px] hover:text-[#4E9F3D] transition-colors">
              +91 11 4958 8555
            </a>
          </div>

          <div className="hidden lg:block w-[1px] h-[25px] bg-white/10" />

          {/* Website */}
          <div className="flex items-center gap-2.5 group">
            <div className="w-[34px] h-[34px] bg-[#4E9F3D] rounded-full flex items-center justify-center text-white shadow-[0_0_10px_rgba(78,159,61,0.3)] transition-all duration-300 group-hover:scale-105">
              <Globe className="w-[16px] h-[16px]" />
            </div>
            <a href="https://www.ihwe.in" target="_blank" rel="noreferrer" className="text-white font-bold text-[12px] hover:text-[#4E9F3D] transition-colors">
              www.ihwe.in
            </a>
          </div>

        </div>

        {/* Right Section: QR Code & Button */}
        <div className="flex items-center gap-3 bg-black/10 p-1.5 pr-3 rounded-[10px] border border-white/5">
          <div className="bg-white p-0.5 rounded-[6px] shadow-lg">
            <QrCode className="w-[34px] h-[34px] text-[#001D3D]" />
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-[#4E9F3D] px-3 py-1 rounded-[6px] shadow-sm hover:bg-[#458b36] transition-colors cursor-pointer">
              <span className="text-white font-black text-[10px] uppercase tracking-wider leading-[0.9]">
                SCAN TO PARTNER
              </span>

            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default LogisticFooter;
