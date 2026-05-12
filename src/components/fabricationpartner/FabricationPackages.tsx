import React from 'react';
import { motion } from 'framer-motion';
import { Send, Star, Plane, Crown } from 'lucide-react';

const packages = [
  {
    name: "Associate Partner",
    price: "₹1,25,000 + GST",
    color: "#00767a",
    bgColor: "bg-[#F0FDF4]",
    icon: <Send className="w-7 h-7" />,
  },
  {
    name: "Preferred Partner",
    price: "₹2,25,000 + GST",
    color: "#7e8617",
    bgColor: "bg-[#EFF6FF]",
    icon: <Plane className="w-7 h-7" />,
  },
  {
    name: "Premier Partner",
    price: "₹3,75,000 + GST",
    color: "#ba7b07",
    bgColor: "bg-[#F5F3FF]",
    icon: <Crown className="w-7 h-7" />,
  },
];

const FabricationPackages = () => {
      return (
        <div className="bg-white rounded-[20px] border border-[#E2E8F0] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-[#aa7002] px-[16px] py-[8px]">
            <h3 className="text-white font-black text-[9px] uppercase tracking-wider text-center">
              Partnership Packages &amp; Investment
            </h3>
          </div>
    
          {/* Package Items */}
          <div className="p-[6px_6px_2px] flex flex-col gap-[2px] flex-1">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-[14px] border border-slate-100 ${pkg.bgColor} p-[4px_10px] relative overflow-hidden`}
              >
                {/* Ribbon */}
                <div
                  className="absolute top-0 right-[10px] flex flex-col items-center"
                  style={{ color: pkg.color }}
                >
                  <div
                    className="w-[18px] h-[22px] flex items-center justify-center text-white text-[9px]"
                    style={{ backgroundColor: pkg.color }}
                  >
                    <Star className="w-[8px] h-[8px] fill-white text-white" />
                  </div>
                  <div
                    className="w-0 h-0"
                    style={{
                      borderLeft: '9px solid transparent',
                      borderRight: '9px solid transparent',
                      borderTop: `6px solid ${pkg.color}`,
                    }}
                  />
                </div>
    
                <div className="flex gap-[10px] py-3">
                  <div
                    className="w-[46px] h-[46px] rounded-full flex items-center justify-center text-white flex-shrink-0"
                    style={{ backgroundColor: pkg.color }}
                  >
                    {React.cloneElement(pkg.icon as React.ReactElement, { className: "w-4 h-4" })}
                  </div>
                  <div className="flex-1 ">
                    <h4
                      className="text-[14px] font-[600] uppercase tracking-tight"
                      style={{ color: pkg.color }}
                    >
                      {pkg.name}
                    </h4>
                    <p className="text-[14px] font-[600] text-[#0B2C66] mt-[1px] mb-[2px]">
                      {pkg.price}
                    </p>
                    
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
    
          {/* Footer Notes */}
          <div className="bg-[#01122c] px-[14px] py-[10px] mt-auto">
            {[
              "Custom packages available on request",
              "GST as applicable",
              "Stay vouchers valid during event period",
            ].map((note, i) => (
              <div key={i} className="flex items-center gap-[6px] mb-[5px] last:mb-0">
                <div className="w-[16px] h-[16px] bg-[#4E9F3D] rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-[9px] h-[9px] text-white" strokeWidth={4} />
                </div>
                <p className="text-white text-[9px] font-bold uppercase tracking-tight">{note}</p>
              </div>
            ))}
          </div>
        </div>
      );
    };
    
    const Check = ({ className, strokeWidth }: { className?: string; strokeWidth?: number }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth || 2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    );
    

export default FabricationPackages