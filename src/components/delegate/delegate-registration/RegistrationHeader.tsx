import React from "react";
import { Phone } from "lucide-react";
import logo from "@/assets/arogyasangosti.png";

const RegistrationHeader: React.FC = () => {
  return (
    <header className="w-full bg-white py-3 px-6 lg:px-10 border-b border-gray-100">
      <div className="max-w-[1360px] mx-auto flex items-center justify-between gap-4 pl-[30px]">
        {/* Left: Logo and Title */}
        <div className="flex items-center gap-8">
          <img src={logo} alt="Arogya Sanghoshthi" className="h-10 w-auto" />
          <div className="hidden md:block border-l border-gray-100 pl-8">
            <h2 className="text-[14px] font-black text-[#143111] leading-none mb-1">AROGYA SANGHOSHTI 2026</h2>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">India's Premier Healthcare & AYUSH Conference</p>
          </div>
        </div>

        {/* Center/Right: Part of and Need Help */}
        <div className="flex items-center gap-10">
          <div className="hidden xl:flex items-center gap-3">
             <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Part of</span>
             <div className="flex items-center gap-2">
                <img src="/logo.png" alt="IHWE 2026" className="w-10 h-10 object-contain" />
                <div className="text-[10px] font-black leading-tight">
                  <div>INTERNATIONAL</div>
                  <div className="text-green-600">EXPO 2026</div>
                </div>
             </div>
          </div>

          <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
              <Phone className="w-4 h-4 text-[#143111]" />
            </div>
            <div>
              <div className="text-[9px] font-bold text-gray-400 uppercase tracking-tight leading-none mb-1">Need Help?</div>
              <div className="text-[13px] font-black text-[#143111] leading-none">+91 98765 43210</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default RegistrationHeader;
