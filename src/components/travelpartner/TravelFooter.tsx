import React from 'react';
import {
  Users,
  Megaphone,
  TrendingUp,
  Handshake,
  Globe,
  Mail,
  Phone,
  QrCode,
  Plane,
} from 'lucide-react';

const TravelFooter: React.FC = () => {
  return (
    <footer className="bg-[#F8FAFC] pb-4 pt-2 px-6">
      <div className="mx-auto max-w-[1400px]">
        <div className="bg-white rounded-[24px] border border-[#E2E8F0] shadow-sm overflow-hidden flex flex-col lg:flex-row items-stretch min-h-[70px]">

          {/* Left CTA: Dark Blue with Swirl - Reduced Vertical Padding */}
          <div className="bg-[#0B2C66] p-[12px_30px] flex items-center gap-[20px] lg:min-w-[320px] relative overflow-hidden rounded-r-[60px] lg:rounded-r-[80px] z-10">
            {/* Airplane Swirl Path (Simplified with SVG) */}
            <div className="absolute left-[-20px] top-[10px] w-[140px] h-[80px] opacity-20 pointer-events-none">
              <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M5 50 C 20 50, 40 45, 50 30 C 60 15, 80 10, 95 10" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M10 55 C 30 55, 50 48, 60 32" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
              </svg>
            </div>
            <div className="relative z-10 w-[44px] h-[44px] flex items-center justify-center flex-shrink-0">
              <Plane className="w-[32px] h-[32px] text-white rotate-45 fill-white" />
            </div>
            <div className="relative z-10">
              <h3 className="text-white font-black text-[14px] uppercase leading-[1.2] tracking-tight">
                Together, let's<br />
                Connect the world to<br />
                <span className="text-[#4E9F3D]">Health &amp; Wellness!</span>
              </h3>
            </div>
          </div>

          {/* Middle Stats/Benefits Row - Reduced Vertical Padding */}
          <div className="flex-1 flex justify-between items-center p-[5px_20px] bg-gray-50/50">
            {[
              { icon: <Users />, label: "Global Audience Access", color: "#4B49AC" },
              { icon: <Megaphone />, label: "High Brand Exposure", color: "#0B2C66" },
              { icon: <TrendingUp />, label: "Business Growth", color: "#4E9F3D" },
              { icon: <Handshake />, label: "Long-term Partnership", color: "#4B49AC" },
              { icon: <Globe />, label: "Positive Global Impact", color: "#008891" },
            ].map((item, i) => (
              <React.Fragment key={i}>
                <div className="flex flex-col items-center text-center gap-1 flex-1 group">
                  <div
                    className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-110"
                    style={{ backgroundColor: item.color }}
                  >
                    {React.cloneElement(item.icon as React.ReactElement, { className: "w-[16px] h-[16px]" })}
                  </div>
                  <p className="text-[8px] font-bold text-[#1e293b] uppercase leading-tight max-w-[70px]">
                    {item.label}
                  </p>
                </div>
                {i < 4 && <div className="w-[1px] h-[30px] bg-gray-200 mx-2" />}
              </React.Fragment>
            ))}
          </div>

          {/* Right Section: Contact + QR - Reduced Vertical Padding */}
          <div className="flex items-stretch">
            {/* Contact Box */}
            <div className="p-[8px_15px] flex flex-col justify-center min-w-[240px] border-l border-[#E2E8F0]">
              <div className="bg-[#2D6A4F] rounded-[8px_8px_2px_2px] px-[12px] py-[4px] text-center mb-1">
                <h4 className="text-white font-black text-[10px] uppercase tracking-wider">
                  Let's Grow Together!
                </h4>
              </div>
              <div className="border border-[#E2E8F0] border-t-0 rounded-[0_0_8px_8px] p-[6px_10px] flex flex-col gap-1.5 bg-white">
                <a
                  href="mailto:partner@ihwe.in"
                  className="flex items-center gap-2.5 text-[#1e293b] hover:text-[#4E9F3D] transition-colors group"
                >
                  <Mail className="w-[12px] h-[12px] text-[#2D6A4F]" />
                  <span className="font-bold text-[11px] group-hover:underline">partner@ihwe.in</span>
                </a>
                <a
                  href="tel:+911149588555"
                  className="flex items-center gap-2.5 text-[#1e293b] hover:text-[#4E9F3D] transition-colors group"
                >
                  <Phone className="w-[12px] h-[12px] text-[#2D6A4F]" />
                  <span className="font-bold text-[11px] group-hover:underline">+91 11 4958 8555</span>
                </a>
              </div>
            </div>

            {/* QR Section */}
            <div className="bg-[#0B2C66] p-[8px_15px] flex flex-col items-center justify-center gap-1.5 min-w-[90px]">
              <div className="bg-white p-[4px] rounded-[6px] shadow-sm">
                <QrCode className="w-[42px] h-[42px] text-[#0B2C66]" />
              </div>
              <p className="text-white font-black text-[7px] uppercase text-center leading-tight tracking-wider">
                Scan To<br />Partner
              </p>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default TravelFooter;