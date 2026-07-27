import React from 'react';
import {
  Mail,
  Phone,
  Globe,
  QrCode,
  Truck,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import busAndTruck from '../../assets/logistic/raman.png';

interface LogisticFooterProps {
  data?: any;
}

const LogisticFooter: React.FC<LogisticFooterProps> = ({ data }) => {
  const successTitle = data?.successTitle || "LET'S MOVE SUCCESS TOGETHER!";
  const successSub = data?.successSub || "Partner with IHWE 2026 and deliver excellence at every step.";
  const email = data?.email || "info@ihwe.in";
  const phone = data?.phone || "+91 9654900525";
  const website = data?.website || "www.ihwe.in";

  const successTitleParts = successTitle.split(' ');
  const successTitleLast = successTitleParts.length > 1 ? successTitleParts.pop() : '';
  const successTitleFirst = successTitleParts.join(' ');

  return (
    <footer className="bg-[#001D3D] py-4 lg:py-0.5 mt-2">
      <div className="max-w-[1350px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-4 px-4">
        <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-4">
          <div className="hidden sm:block">
            <img loading="lazy" decoding="async" src={busAndTruck} alt="Logistics" className="w-auto h-[60px] object-contain" />
          </div>



          <div className="flex flex-col">
            <h3 className="text-white font-black text-[14px] uppercase leading-tight sm:whitespace-nowrap">
              {successTitleFirst} {successTitleLast && <span className="text-[#4E9F3D]">{successTitleLast}</span>}
            </h3>
            <p className="text-white text-[8.5px] font-medium opacity-80 mt-0 max-w-[280px]">
              {successSub}
            </p>
          </div>
        </div>

        {/* Middle Section: Contact Info with Dividers */}
        <div className="flex flex-col sm:flex-row flex-wrap lg:flex-nowrap items-center justify-center gap-4 sm:gap-5 lg:gap-8 flex-1 border-x-0 lg:border-x border-white/10 lg:px-8">

          {/* Email */}
          <div className="flex items-center gap-2.5 group">
            <div className="w-[34px] h-[34px] bg-[#4E9F3D] rounded-full flex items-center justify-center text-white shadow-[0_0_10px_rgba(78,159,61,0.3)] transition-all duration-300 group-hover:scale-105">
              <Mail className="w-[16px] h-[16px]" />
            </div>
            <a href={`mailto:${email}`} className="text-white font-bold text-[12px] hover:text-[#4E9F3D] transition-colors">
              {email}
            </a>
          </div>

          <div className="hidden lg:block w-[1px] h-[25px] bg-white/10" />

          {/* Phone */}
          <div className="flex items-center gap-2.5 group">
            <div className="w-[34px] h-[34px] bg-[#4E9F3D] rounded-full flex items-center justify-center text-white shadow-[0_0_10px_rgba(78,159,61,0.3)] transition-all duration-300 group-hover:scale-105">
              <Phone className="w-[16px] h-[16px]" />
            </div>
            <a href={`tel:${phone}`} className="text-white font-bold text-[12px] hover:text-[#4E9F3D] transition-colors">
              {phone}
            </a>
          </div>

          <div className="hidden lg:block w-[1px] h-[25px] bg-white/10" />

          {/* Website */}
          <div className="flex items-center gap-2.5 group">
            <div className="w-[34px] h-[34px] bg-[#4E9F3D] rounded-full flex items-center justify-center text-white shadow-[0_0_10px_rgba(78,159,61,0.3)] transition-all duration-300 group-hover:scale-105">
              <Globe className="w-[16px] h-[16px]" />
            </div>
            <a href={website.startsWith('http') ? website : `https://${website}`} target="_blank" rel="noreferrer" className="text-white font-bold text-[12px] hover:text-[#4E9F3D] transition-colors">
              {website.replace(/^https?:\/\//, '')}
            </a>
          </div>

        </div>

        {/* Right Section: Register Button */}
        <div className="p-1 flex flex-col items-center justify-center gap-0.5 min-w-[70px] flex-shrink-0">
          <Link to="/partner-registration?type=logistics" target="_blank">
            <button className="bg-[#619941] hover:bg-[#58b02d] transition-all duration-300 text-white uppercase px-6 py-2.5 rounded-md text-xs sm:text-sm font-bold shadow-md tracking-wider">
              Register As Partner
            </button>
          </Link>
        </div>

      </div>
    </footer>
  );
};

export default LogisticFooter;
