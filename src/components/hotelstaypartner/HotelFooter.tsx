import React from 'react';
import * as Icons from 'lucide-react';
import { SERVER_URL } from '../../lib/api';
import { Link } from 'react-router-dom';

const IconRenderer = ({ name, className }: { name: string, className?: string }) => {
  const Icon = (Icons as any)[name] || Icons.Star;
  return <Icon className={className} />;
};

interface HotelFooterProps {
  footer: any;
}

const HotelFooter: React.FC<HotelFooterProps> = ({ footer }) => {
  const footerBgImage = footer?.image?.startsWith('/uploads') ? `${SERVER_URL}${footer.image}` : footer?.image;
  return (
    <footer className="bg-[#051124] py-6 lg:py-1 px-4 relative overflow-hidden">

      <div className="absolute -left-10 -top-10 w-80 h-80 bg-[#103D1A] rounded-full blur-2xl opacity-40 z-0"></div>
      <div className="absolute -left-5 -top-5 w-40 h-40 bg-[#4E9F3D]/15 rounded-full z-0"></div>

      <div className="mx-auto max-w-[1330px] flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-0 relative z-10 text-center lg:text-left py-4 lg:py-0">


        <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-2 w-full lg:w-auto justify-center lg:justify-start">

          <div className="relative w-20 h-20 flex-shrink-0">
            <img loading="lazy" decoding="async" src={footerBgImage}
              alt="IHWE Footer Badge"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex flex-col text-left">
            <p className="text-white font-medium text-[11px] uppercase tracking-wide leading-tight whitespace-pre-line">
              {footer?.footerTitle || "Together, let's create"}
            </p>
            <p className="text-white font-black text-[16px] uppercase leading-tight tracking-tight whitespace-pre-line">
              {footer?.footerSubtitle || "Memorable Experiences"}
            </p>
            <p className="text-[#D4AF37] font-serif italic text-[14px] leading-none whitespace-pre-line">
              {footer?.footerItalicText || "for a Healthier Tomorrow"}
            </p>
          </div>
        </div>


        <div className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-y-4 gap-x-2 lg:gap-0 flex-1 px-2 w-full max-w-[500px] lg:max-w-none">
          {(footer?.perks || []).map((item: any, i: number) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center text-center px-3 group flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-[#0B2C66] border border-white/20 flex items-center justify-center text-white mb-0.5 shadow-inner group-hover:bg-[#4E9F3D] transition-colors duration-300">
                  <IconRenderer name={item.icon} className="w-4 h-4" />
                </div>
                <p className="text-white text-[7px] font-bold uppercase tracking-tight leading-tight max-w-[55px] whitespace-pre-line">
                  {item.label}
                </p>
              </div>
              {i < 4 && <div className="hidden lg:block h-6 w-[1px] bg-white/10" />}
            </React.Fragment>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto justify-center">
          <div className="bg-white rounded-md overflow-hidden min-w-[240px] shadow-md border border-white/10 w-full sm:w-auto">
            <div className="bg-[#4E9F3D] py-0.5 px-2 text-center">
              <h4 className="text-white font-black text-[9px] uppercase tracking-wider whitespace-pre-line">
                {footer?.footerGrowTitle || "Let's Grow Together!"}
              </h4>
            </div>
            <div className="p-1 px-3 flex flex-col gap-0.5 items-center sm:items-start">
              <a href={`mailto:${footer?.email || 'info@ihwe.in'}`} className="flex items-center gap-2 text-[#0B2C66] hover:text-[#4E9F3D] transition-colors group">
                <IconRenderer name="Mail" className="w-3.5 h-3.5 text-[#4E9F3D]" />
                <span className="font-black text-[11px]">{footer?.email || 'info@ihwe.in'}</span>
              </a>
              <a href={`tel:${footer?.phone || '+91 9654900525'}`} className="flex items-center gap-2 text-[#0B2C66] hover:text-[#4E9F3D] transition-colors group">
                <IconRenderer name="Phone" className="w-3.5 h-3.5 text-[#4E9F3D]" />
                <span className="font-black text-[11px]">{footer?.phone || '+91 9654900525'}</span>
              </a>
            </div>
          </div>
          <div className="p-1 flex flex-col items-center justify-center gap-0.5 min-w-[70px] flex-shrink-0">

            <Link to="/partner-registration?type=hotel" target="_blank">
              <button className="bg-[#619941] hover:bg-[#58b02d] transition-all duration-300 text-white uppercase px-6 py-2.5 rounded-md text-xs sm:text-sm font-bold shadow-md tracking-wider">
                Register As Partner
              </button>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

const Star = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

export default HotelFooter;
