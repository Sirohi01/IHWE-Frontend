import React from 'react';
import { motion } from 'framer-motion';
import { Send, Star, Plane, Crown } from 'lucide-react';

interface TravelPackagesProps {
  packages: any;
}

const getFeaturesForPackage = (name: string) => {
  const lower = (name || '').toLowerCase();
  if (lower.includes('associate')) {
    return [
      "Logo on website & digital platforms",
      "Co-branded flight offers",
      "Social media mentions",
    ];
  } else if (lower.includes('preferred')) {
    return [
      "All benefits of Associate Partner",
      "Dedicated email promotions",
      "Premium placement on website",
    ];
  } else if (lower.includes('premier') || lower.includes('elite')) {
    return [
      "All benefits of Preferred Partner",
      "Exclusive flight offers for delegates",
      "Speaking opportunity / brand showcase",
    ];
  }
  return [
    "Logo visibility on expo platforms",
    "Special promotional opportunities",
    "Co-branded partner benefits"
  ];
};

const packageStyles = [
  {
    color: "#4E9F3D",
    bgColor: "bg-[#F0FDF4]",
    icon: <Send className="w-7 h-7" />
  },
  {
    color: "#0B2C66",
    bgColor: "bg-[#EFF6FF]",
    icon: <Plane className="w-7 h-7" />
  },
  {
    color: "#7C3AED",
    bgColor: "bg-[#F5F3FF]",
    icon: <Crown className="w-7 h-7" />
  }
];

const TravelPackages: React.FC<TravelPackagesProps> = ({ packages }) => {
  return (
    <div className="bg-white rounded-[20px] border border-[#E2E8F0] overflow-hidden flex flex-col shadow-sm">

      <div className="bg-[#0B2C66] px-[16px] py-[4px]">
        <h3 className="text-white font-[900] text-[12px] uppercase tracking-wider text-center">
          {packages?.title || "Partnership Packages & Investment"}
        </h3>
      </div>

      <div className="p-[4px] flex flex-col gap-[2px] flex-1">
        {(packages?.items || []).map((pkg: any, index: number) => {
          const features = getFeaturesForPackage(pkg.name);
          const pkgStyle = packageStyles[index % packageStyles.length];
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-[14px] border border-slate-100 ${pkgStyle.bgColor} p-[2px_10px] relative overflow-hidden group`}
            >
              <div
                className="absolute top-0 right-[10px] flex flex-col items-center"
                style={{ color: pkgStyle.color }}
              >
                <div
                  className="w-[18px] h-[22px] flex items-center justify-center text-white text-[9px]"
                  style={{ backgroundColor: pkgStyle.color }}
                >
                  <Star className="w-[9px] h-[9px] fill-white text-white" />
                </div>
                <div
                  className="w-0 h-0"
                  style={{
                    borderLeft: '9px solid transparent',
                    borderRight: '9px solid transparent',
                    borderTop: `7px solid ${pkgStyle.color}`,
                  }}
                />
              </div>

              <div className="flex gap-[10px] items-center">
                <div
                  className="w-[32px] h-[32px] rounded-[8px] flex items-center justify-center text-white flex-shrink-0"
                  style={{ backgroundColor: pkgStyle.color }}
                >
                  {React.cloneElement(pkgStyle.icon as React.ReactElement, { className: "w-3.5 h-3.5" })}
                </div>
                <div className="flex-1">
                  <h4
                    className="text-[12px] font-[900] uppercase tracking-tight"
                    style={{ color: pkgStyle.color }}
                  >
                    {pkg.name}
                  </h4>
                  <p className="text-[15px] font-[900] text-[#0B2C66] mt-[0px] mb-[0px]">
                    {pkg.price ? pkg.price.split(' ')[0] : ''} <span className="text-[10px] text-gray-500 font-bold">+ GST</span>
                  </p>
                  <ul className="flex flex-col gap-[1px]">
                    {features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-[4px] text-[9.5px] font-bold text-[#4A5568] leading-tight">
                        <span
                          className="w-[3px] h-[3px] rounded-full flex-shrink-0 mt-[4px]"
                          style={{ backgroundColor: pkgStyle.color }}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="bg-[#0B2C66] px-[14px] py-[6px] mt-auto">
        {(packages?.notes || []).map((note: any, i: number) => (
          <div key={note.id || i} className="flex items-center gap-[6px] mb-[2px] last:mb-0">
            <div className="w-[14px] h-[14px] bg-[#4E9F3D] rounded-full flex-center flex items-center justify-center flex-shrink-0">
              <Check className="w-[8px] h-[8px] text-white" strokeWidth={4} />
            </div>
            <p className="text-white text-[9px] font-bold uppercase tracking-tight opacity-90">{note.text}</p>
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