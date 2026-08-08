import React from 'react';
import { motion } from 'framer-motion';
import { Send, Star, Plane, Crown } from 'lucide-react';

const packages = [
  {
    name: "Associate Partner",
    price: "₹1,00,000 + GST",
    color: "#4E9F3D",
    bgColor: "bg-[#F0FDF4]",
    icon: <Send className="w-7 h-7" />,
    features: [
      "Logo on website & digital platforms",
      "Co-branded flight offers",
      "Social media mentions",
    ],
  },
  {
    name: "Preferred Partner",
    price: "₹2,00,000 + GST",
    color: "#1E88E5",
    bgColor: "bg-[#EFF6FF]",
    icon: <Plane className="w-7 h-7" />,
    features: [
      "All benefits of Associate Partner",
      "Dedicated email promotions",
      "Premium placement on website",
    ],
  },
  {
    name: "Premier Partner",
    price: "₹3,50,000 + GST",
    color: "#7C3AED",
    bgColor: "bg-[#F5F3FF]",
    icon: <Crown className="w-7 h-7" />,
    features: [
      "All benefits of Preferred Partner",
      "Exclusive flight offers for delegates",
      "Speaking opportunity / brand showcase",
    ],
  },
];

const TravelPackages: React.FC = () => {
  return (
    <div className="bg-white rounded-[20px] border border-[#E2E8F0] overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="bg-[#0B2C66] px-[16px] py-[10px]">
        <h3 className="text-white font-black text-[10px] uppercase tracking-wider text-center">
          Partnership Packages &amp; Investment
        </h3>
      </div>

      {/* Package Items */}
      <div className="p-[10px_10px_4px] flex flex-col gap-[8px] flex-1">
        {packages.map((pkg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`rounded-[14px] border border-slate-100 ${pkg.bgColor} p-[10px_12px] relative overflow-hidden`}
          >
            {/* Ribbon */}
            <div
              className="absolute top-0 right-[10px] flex flex-col items-center"
              style={{ color: pkg.color }}
            >
              <div
                className="w-[22px] h-[26px] flex items-center justify-center text-white text-[11px]"
                style={{ backgroundColor: pkg.color }}
              >
                <Star className="w-[10px] h-[10px] fill-white text-white" />
              </div>
              <div
                className="w-0 h-0"
                style={{
                  borderLeft: '11px solid transparent',
                  borderRight: '11px solid transparent',
                  borderTop: `7px solid ${pkg.color}`,
                }}
              />
            </div>

            <div className="flex gap-[10px]">
              <div
                className="w-[64px] h-[64px] rounded-[14px] flex items-center justify-center text-white flex-shrink-0"
                style={{ backgroundColor: pkg.color }}
              >
                {pkg.icon}
              </div>
              <div className="flex-1">
                <h4
                  className="text-[12px] font-[900] uppercase tracking-tight"
                  style={{ color: pkg.color }}
                >
                  {pkg.name}
                </h4>
                <p className="text-[18px] font-[900] text-[#0B2C66] mt-[2px] mb-[6px]">
                  {pkg.price}
                </p>
                <ul className="flex flex-col gap-[3px]">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-[5px] text-[10px] font-bold text-[#4A5568]">
                      <span
                        className="w-[5px] h-[5px] rounded-full flex-shrink-0"
                        style={{ backgroundColor: pkg.color }}
                      />
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
      <div className="bg-[#0B2C66] px-[14px] py-[10px] mt-auto">
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

export default TravelPackages;