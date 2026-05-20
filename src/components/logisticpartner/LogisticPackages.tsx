import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { Check } from 'lucide-react';

const renderIcon = (iconName: string, className: string = "w-5 h-5") => {
  const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.HelpCircle;
  return <IconComponent className={className} />;
};

interface LogisticPackagesProps {
  data?: any[];
}

const LogisticPackages: React.FC<LogisticPackagesProps> = ({ data }) => {
  const packages = data || [
    {
      name: "Associate Partner",
      price: "₹1,25,000 + GST",
      color: "#4E9F3D",
      bgColor: "bg-[#F0FDF4]",
      icon: "Truck",
      features: [
        "Logo on website & digital platforms",
      ],
    },
    {
      name: "Preferred Partner",
      price: "₹2,25,000 + GST",
      color: "#0B2C66",
      bgColor: "bg-[#EFF6FF]",
      icon: "Truck",
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
      icon: "Truck",
      features: [
        "All benefits of Preferred Partner",
        "On-site branding (booth / signage)",
        "Speaking opportunity / brand showcase",
        "Featured listing in all marketing",
      ],
    },
  ];


  return (
    <div className="bg-white rounded-[20px] border border-[#E2E8F0] overflow-hidden flex flex-col shadow-sm h-full">

      <div className="bg-gradient-to-r from-[#4E9F3D] to-[#0B2C66] px-[16px] py-[8px]">
        <h3 className="text-white font-[900] text-[15px] uppercase tracking-wider text-center">
          PARTNERSHIP PACKAGES
        </h3>
      </div>



      <div className="p-[4px] flex flex-col gap-[3px] flex-1">
        {packages.map((pkg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`rounded-[14px] border-b border-slate-100 bg-white p-[4px_10px] relative overflow-hidden group`}
          >



            <div
              className="absolute top-0 right-[15px] flex flex-col items-center"
              style={{ color: pkg.color }}
            >
              <div
                className="w-[18px] h-[25px] flex items-center justify-center text-white text-[9px]"
                style={{ backgroundColor: pkg.color }}
              >
                <LucideIcons.Star className="w-[10px] h-[10px] fill-white text-white" />
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

            <div className="flex gap-[12px] items-center">
              <div
                className="w-[42px] h-[42px] rounded-full flex items-center justify-center text-white flex-shrink-0 bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8]"
                style={{ background: pkg.name === "Preferred Partner" ? 'linear-gradient(to bottom right, #4E9F3D, #3d7a30)' : undefined }}
              >
                {renderIcon(pkg.icon, "w-5 h-5")}
              </div>
              <div className="flex-1">
                <h4
                  className="text-[14px] font-[900] uppercase tracking-tight"
                  style={{ color: pkg.name === "Preferred Partner" ? '#4E9F3D' : '#0B2C66' }}
                >
                  {pkg.name}
                </h4>
                <p className="text-[18px] font-[900] text-black mt-[0px] mb-[0px]">
                  {pkg.price.split(' ')[0]} <span className="text-[12px] text-gray-500 font-bold">+ GST</span>
                </p>

                <ul className="flex flex-col gap-[1px]">
                  {pkg.features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-center gap-[6px] text-[11px] font-bold text-[#4A5568] leading-tight">
                      <div className="w-[3.5px] h-[3.5px] rounded-full bg-gray-400" />
                      {feature}
                    </li>
                  ))}
                </ul>

              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-[#001D3D] to-[#000000] px-[16px] py-[10px] lg:py-[7px] mt-auto flex flex-wrap lg:flex-nowrap justify-center sm:justify-between items-center gap-y-2 gap-x-4">
        {[
          { text: "Custom packages available on request", icon: <Check /> },
          { text: "GST as applicable", icon: <Check /> },
          { text: "Stay vouchers valid during event period", icon: <Check /> },
        ].map((note, i) => (
          <div key={i} className="flex items-center gap-[6px]">
            <div className="w-[12px] h-[12px] border border-[#4E9F3D] rounded-full flex items-center justify-center flex-shrink-0">
              <Check className="w-[7px] h-[7px] text-[#4E9F3D]" strokeWidth={4} />
            </div>
            <p className="text-white text-[7.5px] font-bold uppercase tracking-tight opacity-90 leading-none">
              {note.text.split(' ').slice(0, 2).join(' ')}<br />{note.text.split(' ').slice(2).join(' ')}
            </p>
          </div>
        ))}
      </div>


    </div>
  );
};


const CustomCheck = ({ className, strokeWidth, style }: { className?: string; strokeWidth?: number; style?: React.CSSProperties }) => (
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
