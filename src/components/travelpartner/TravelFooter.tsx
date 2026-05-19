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
import { Link } from 'react-router-dom';
import footerImage from '../../assets/nishu.png';

const TravelFooter: React.FC = () => {
  return (
    <footer className="bg-white pt-1 lg:ml-2">
      <div className="max-w-[1320px] mx-auto bg-white">
        <div className="bg-white rounded-[px]  shadow-sm overflow-hidden flex flex-col lg:flex-row items-stretch min-h-[70px]">

          <div className="bgg-white relative p-[20px_25px] lg:p-[0px_25px] flex items-center gap-[15px] lg:min-w-[280px] overflow-hidden rounded-[20px] lg:rounded-none lg:rounded-r-[80px] z-10 w-full lg:w-auto justify-center lg:justify-start min-h-[100px] lg:min-h-[70px]">

            <div className="absolute inset-0 w-full h-full z-0 bg-white">
              <img
                src={footerImage}
                alt="background"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-20 ml-16 sm:ml-20 text-center lg:text-left">
              <h3 className="text-white font-black text-[13px] uppercase leading-[1.2] tracking-tight">
                Together, let's<br />
                Connect the world to<br />
                <span className="text-[#4E9F3D]">Health &amp; Wellness!</span>
              </h3>
            </div>
          </div>

          <div className="flex-1 flex flex-wrap lg:flex-nowrap justify-center items-center p-[12px_16px] lg:p-[5px_100px] bg-gray-50/50 gap-y-4 gap-x-2 lg:gap-0 w-full">
            {[
              { icon: <Users />, label: "Global Audience Access", color: "#4B49AC" },
              { icon: <Megaphone />, label: "High Brand Exposure", color: "#0B2C66" },
              { icon: <TrendingUp />, label: "Business Growth", color: "#4E9F3D" },
              { icon: <Handshake />, label: "Long-term Partnership", color: "#4B49AC" },
              { icon: <Globe />, label: "Positive Global Impact", color: "#008891" },
            ].map((item, i) => (
              <React.Fragment key={i}>
                <div className="flex flex-col items-center text-center gap-1 flex-1 group min-w-[65px] flex-shrink-0">
                  <div
                    className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-110"
                    style={{ backgroundColor: item.color }}
                  >
                    {React.cloneElement(item.icon as React.ReactElement, { className: "w-[16px] h-[16px]" })}
                  </div>
                  <p className="text-[7.5px] font-bold text-[#1e293b] uppercase leading-tight max-w-[65px]">
                    {item.label}
                  </p>
                </div>

                {i < 4 && <div className="hidden lg:block w-[1px] h-[30px] bg-gray-300 mx-0.5 flex-shrink-0" />}
              </React.Fragment>
            ))}
          </div>


          <div className="flex flex-col sm:flex-row items-stretch w-full lg:w-auto">

            <div className="p-[12px_15px] lg:p-[8px_15px] flex flex-col justify-center min-w-[210px] lg:border-l border-t lg:border-t-0 border-[#E2E8F0] w-full sm:w-auto bg-white">
              <div className="bg-[#2D6A4F] rounded-[8px_8px_2px_2px] px-[10px] py-[4px] text-center mb-1">
                <h4 className="text-white font-black text-[9px] uppercase tracking-wider">
                  Let's Grow Together!
                </h4>
              </div>
              <div className="border border-[#E2E8F0] border-t-0 rounded-[0_0_8px_8px] p-[6px_8px] flex flex-col gap-1.5 bg-white items-center sm:items-start">
                <a
                  href="mailto:partner@ihwe.in"
                  className="flex items-center gap-2 text-[#1e293b] hover:text-[#4E9F3D] transition-colors group"
                >
                  <Mail className="w-[11px] h-[11px] text-[#2D6A4F]" />
                  <span className="font-bold text-[10.5px] group-hover:underline">info@ihwe.in</span>
                </a>
                <a
                  href="tel:+91 9654900525"
                  className="flex items-center gap-2 text-[#1e293b] hover:text-[#4E9F3D] transition-colors group"
                >
                  <Phone className="w-[11px] h-[11px] text-[#2D6A4F]" />
                  <span className="font-bold text-[10.5px] group-hover:underline">+91 9654900525</span>
                </a>
              </div>
            </div>


            <div className="p-1 flex flex-col items-center justify-center gap-0.5 min-w-[70px] flex-shrink-0">
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
  );
};

export default TravelFooter;