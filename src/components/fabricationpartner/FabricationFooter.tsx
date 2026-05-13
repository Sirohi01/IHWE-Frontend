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

const FabricationFooter = () => {
  return (
     <footer className="bg-[#F8FAFC] pb-4 pt-2">
          <div className="mx-auto max-w-[1400px]">
            <div className="bg-[#001c31] rounded-[2px] border border-[#E2E8F0] shadow-sm overflow-hidden flex flex-col lg:flex-row items-stretch min-h-[70px]">
    
             
    
              {/* Middle Stats/Benefits Row - Reduced Vertical Padding */}
              <div className="flex-1 flex justify-between items-center p-[5px_20px]">
               <div className="relative z-10 w-[44px] h-[44px] flex items-center justify-center flex-shrink-0">
                  <Plane className="w-[32px] h-[32px] text-white rotate-45 fill-white" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-white text-[16px] uppercase leading-[1.2] tracking-tight">
                    LET's DESIGN.<br />
                    LET's BUILD.<br />
                    LET's <span className="text-[#028187]">GROW TOGETHER!</span>
                  </h3>
                </div>
            <div className="w-[1px] h-[32px] bg-gray-200 mx-3" />
                {[
  {
    icon: <Mail />,
    label: "Global Audience Access",
    color: "#057f84",
  },
  {
    icon: <Phone />,
    label: "High Brand Exposure",
    color: "#057f84",
  },
].map((item, i) => (
  <React.Fragment key={i}>
    
    {/* ITEM */}
    <div className="flex items-center gap-3 flex-1 group">
      
      {/* ICON */}
      <div
        className="w-[38px] h-[38px] rounded-full flex items-center justify-center text-white shadow-sm shrink-0 transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: item.color }}
      >
        {React.cloneElement(
          item.icon as React.ReactElement,
          {
            className: "w-[18px] h-[18px]",
          }
        )}
      </div>

      {/* CONTENT */}
      <div className="flex flex-col">
        <p className="text-[11px] font-bold text-[#1e293b] uppercase leading-tight">
          {item.label}
        </p>
      </div>

    </div>

    {/* DIVIDER */}
    {i < 1 && (
      <div className="w-[1px] h-[32px] bg-gray-200 mx-3" />
    )}

  </React.Fragment>
))}
<div className="w-[1px] h-[32px] bg-gray-200 mx-3" />
                <div className="bg-white p-[16px] rounded-[6px] shadow-sm">
                    <QrCode className="w-[46px] h-[46px] text-[#0B2C66]" />
                  </div>
    
                {/* QR Section */}
                <div className=" p-[8px_15px] flex flex-col items-center justify-center gap-1.5 min-w-[90px]">
                  
                  <p className="text-white font-black text-[9px] uppercase text-center leading-tight tracking-wider">
                    Scan For <br />Partner
                  </p>
                </div>
                 
              </div>
  
            </div>
          </div>
        </footer>
  )
}

export default FabricationFooter