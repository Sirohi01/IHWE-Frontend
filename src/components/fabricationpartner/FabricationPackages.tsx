import React from 'react';
import { motion } from 'framer-motion';

interface FabricationPackagesProps {
  packages?: any;
}

const defaultPackages = [
  {
    name: "Associate Partner",
    price: "₹1,25,000 + GST",
    color: "#00767a",
    bgColor: "bg-[#F0FDF4]",
    image: "/images/partnership/stallhome.png",
  },
  {
    name: "Preferred Partner",
    price: "₹2,25,000 + GST",
    color: "#7e8617",
    bgColor: "bg-[#EFF6FF]",
    image: "/images/partnership/stallhome.png",
  },
  {
    name: "Premier Partner",
    price: "₹3,75,000 + GST",
    color: "#ba7b07",
    bgColor: "bg-[#F5F3FF]",
    image: "/images/partnership/stallhome.png",
  },
];

const defaultNotes = [
  "Custom packages available on request",
  "GST as applicable",
  "Stay vouchers valid during event period",
];

const FabricationPackages: React.FC<FabricationPackagesProps> = ({ packages }) => {
  const packagesList = packages?.items && packages.items.length > 0
    ? packages.items.map((item: any, idx: number) => ({
        name: item.name,
        price: item.price,
        color: item.color || defaultPackages[idx]?.color || "#00767a",
        bgColor: defaultPackages[idx]?.bgColor || "bg-[#F0FDF4]",
        image: defaultPackages[idx]?.image || "/images/partnership/stallhome.png"
      }))
    : defaultPackages;

  const notesList = packages?.notes && packages.notes.length > 0
    ? packages.notes.map((note: any) => note.text)
    : defaultNotes;

  const sectionTitle = packages?.title || "Partnership Packages & Investment";

  return (
    <div className="bg-white rounded-[20px] border border-[#E2E8F0] overflow-hidden flex flex-col">
      
      {/* Header */}
      <div className="bg-[#aa7002] px-[16px] py-[8px]">
        <h3 className="text-white font-semibold text-[12px] uppercase tracking-wider text-center">
          {sectionTitle}
        </h3>
      </div>

      {/* Package Items */}
      <div className="p-[6px_6px_2px] flex flex-col gap-[2px] flex-1">
        {packagesList.map((pkg, index) => (
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
                className="w-[18px] h-[22px] flex items-center justify-center"
                style={{ backgroundColor: pkg.color }}
              >
                <StarIcon />
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

            <div className="flex gap-[10px] py-3 items-center">
              
              {/* Image Instead of Icon */}
              <div
                className="w-[46px] h-[46px] rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
                style={{ backgroundColor: pkg.color }}
              >
                <img loading="lazy" decoding="async" src={pkg.image}
                  alt={pkg.name}
                  className="w-[30px] h-[30px] object-contain brightness-0 invert"
                />
              </div>

              <div className="flex-1">
                <h4
                  className="text-[15px] font-[600] uppercase tracking-tight"
                  style={{ color: pkg.color }}
                >
                  {pkg.name}
                </h4>

                <p className="text-[15px] font-[600] text-[#0B2C66] mt-[1px] mb-[2px]">
                  {pkg.price}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Notes */}
      <div className="bg-[#01122c] px-[14px] py-[10px] mt-auto flex flex-col sm:flex-row lg:flex-col flex-wrap justify-center sm:justify-between lg:justify-start gap-y-2 gap-x-4">
        {notesList.map((note, i) => (
          <div
            key={i}
            className="flex items-center gap-[6px]"
          >
            <div className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] bg-[#4E9F3D] rounded-full flex items-center justify-center flex-shrink-0">
              <Check className="w-[7px] h-[7px] sm:w-[9px] sm:h-[9px] text-white" strokeWidth={4} />
            </div>

            <p className="text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-tight">
              {note}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-[8px] h-[8px] text-white fill-white"
    viewBox="0 0 24 24"
  >
    <path d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 7.1-1.01L12 2z" />
  </svg>
);

const Check = ({
  className,
  strokeWidth,
}: {
  className?: string;
  strokeWidth?: number;
}) => (
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

export default FabricationPackages;