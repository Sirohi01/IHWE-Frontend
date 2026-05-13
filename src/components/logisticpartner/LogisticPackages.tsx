import React from 'react';
import { motion } from 'framer-motion';
import { Box, Star, Truck, Crown } from 'lucide-react';

const packages = [
  {
    name: "Associate Partner",
    price: "₹1,25,000 + GST",
    color: "#4E9F3D",
    bgColor: "bg-[#F0FDF4]",
    icon: <Truck className="w-7 h-7" />,
    features: [
      "Logo on website & digital platforms",
    ],
  },
  {
    name: "Preferred Partner",
    price: "₹2,25,000 + GST",
    color: "#0B2C66",
    bgColor: "bg-[#EFF6FF]",
    icon: <Truck className="w-7 h-7" />,
    features: [
      "All benefits of Associate Partner",
      "Dedicated email promotions",
      "Premium logo placement",
    ],
  },
  {
    name: "Premier Partner",
    price: "₹3,75,000 + GST",
    color: "#7C3AED",
    bgColor: "bg-[#F5F3FF]",
    icon: <Truck className="w-7 h-7" />,
    features: [
      "All benefits of Preferred Partner",
      "On-site branding (booth / signage)",
      "Speaking opportunity / brand showcase",
      "Featured listing in all marketing",
    ],
  },
];


const LogisticPackages: React.FC = () => {
  return (
    <div className="bg-white rounded-[20px] border border-[#E2E8F0] overflow-hidden flex flex-col shadow-sm h-full">
      {/* Header */}
      <div className="bg-[#0B2C66] px-[16px] py-[8px]">
        <h3 className="text-white font-[900] text-[9.5px] uppercase tracking-wider text-center">
          Partnership Packages &amp; Investment
        </h3>
      </div>

      {/* Package Items */}
      <div className="p-[4px] flex flex-col gap-[3px] flex-1">
        {packages.map((pkg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`rounded-[14px] border border-slate-100 ${pkg.bgColor} p-[4px_8px] relative overflow-hidden group`}
          >


            {/* Ribbon Badge */}
            <div
              className="absolute top-0 right-[10px] flex flex-col items-center"
              style={{ color: pkg.color }}
            >
              <div
                className="w-[18px] h-[22px] flex items-center justify-center text-white text-[9px]"
                style={{ backgroundColor: pkg.color }}
              >
                <Star className="w-[9px] h-[9px] fill-white text-white" />
              </div>
              <div
                className="w-0 h-0"
                style={{
                  borderLeft: '9px solid transparent',
                  borderRight: '9px solid transparent',
                  borderTop: `7px solid ${pkg.color}`,
                }}
              />
            </div>

            <div className="flex gap-[10px] items-center">
              <div
                className="w-[40px] h-[40px] rounded-[10px] flex items-center justify-center text-white flex-shrink-0"
                style={{ backgroundColor: pkg.color }}
              >
                {React.cloneElement(pkg.icon as React.ReactElement, { className: "w-4 h-4" })}
              </div>
              <div className="flex-1">
                <h4
                  className="text-[9px] font-[900] uppercase tracking-tight"
                  style={{ color: pkg.color }}
                >
                  {pkg.name}
                </h4>
                <p className="text-[15px] font-[900] text-[#0B2C66] mt-[1px] mb-[2px]">
                  {pkg.price}
                </p>
                <ul className="flex flex-col gap-[3px]">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-[7px] text-[10px] font-bold text-[#4A5568] leading-tight">
                      <div className="w-[12px] h-[12px] rounded-full flex items-center justify-center bg-white border shadow-xs flex-shrink-0" style={{ borderColor: pkg.color }}>
                        <Check className="w-[7px] h-[7px]" style={{ color: pkg.color }} strokeWidth={4} />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

              </div>
            </div>
          </motion.div>
        ))}
      </div>



      {/* Footer Notes */}
      <div className="bg-[#0B2C66] px-[16px] py-[8px] mt-auto">
        {[
          "Custom packages available on request",
          "GST as applicable",
          "Shipping vouchers valid during event period",
        ].map((note, i) => (
          <div key={i} className="flex items-center gap-[7px] mb-[4px] last:mb-0">
            <div className="w-[16px] h-[16px] bg-[#4E9F3D] rounded-full flex items-center justify-center flex-shrink-0">
              <Check className="w-[9px] h-[9px] text-white" strokeWidth={4} />
            </div>
            <p className="text-white text-[9px] font-bold uppercase tracking-tight opacity-90">{note}</p>
          </div>
        ))}
      </div>
    </div>
  );
};


const Check = ({ className, strokeWidth, style }: { className?: string; strokeWidth?: number; style?: React.CSSProperties }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
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


export default LogisticPackages;
