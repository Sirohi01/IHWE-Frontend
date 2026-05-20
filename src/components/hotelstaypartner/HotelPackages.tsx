import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const IconRenderer = ({ name, className }: { name: string, className?: string }) => {
  const Icon = (Icons as any)[name] || Icons.Star;
  return <Icon className={className} />;
};

interface HotelPackagesProps {
  packages: any;
}

const HotelPackages: React.FC<HotelPackagesProps> = ({ packages }) => {
  return (
    <div className="bg-[#051124] rounded-[20px] border-2 border-[#D4AF37]/30 overflow-hidden flex flex-col shadow-2xl h-full">

      <div className="relative pt-4 pb-3 px-4 text-center">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-500/30 via-transparent to-transparent"></div>
        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="h-[1px] w-4 bg-gradient-to-l from-[#D4AF37] to-transparent"></div>
            <IconRenderer name="Star" className="w-2.5 h-2.5 fill-[#D4AF37] text-[#D4AF37]" />
            <h3 className="text-white font-[900] text-xs md:text-[11px] uppercase tracking-[1.2px] leading-tight whitespace-pre-line">
              {packages?.title || "PARTNERSHIP PACKAGES & INVESTMENT"}
            </h3>
            <IconRenderer name="Star" className="w-2.5 h-2.5 fill-[#D4AF37] text-[#D4AF37]" />
            <div className="h-[1px] w-4 bg-gradient-to-r from-[#D4AF37] to-transparent"></div>
          </div>
        </div>
      </div>


      <div className="p-3 md:p-2 flex flex-col gap-2.5 md:gap-2 flex-1">
        {(packages?.items || []).map((pkg: any, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[10px] overflow-hidden flex items-stretch h-[60px] md:h-[55px] shadow-[0_5px_15px_rgba(0,0,0,0.3)] border border-white/10"
          >

            <div
              className="w-[60px] md:w-[55px] flex items-center justify-center text-white relative shrink-0"
              style={{ backgroundColor: pkg.color }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
              <div className="relative z-10">
                <IconRenderer name={pkg.icon} className="w-5 h-5 fill-current" />
              </div>
            </div>


            <div className="flex-1 flex flex-col justify-center px-4">
              <h4
                className="text-[11px] md:text-[10px] font-[900] uppercase tracking-tight"
                style={{ color: pkg.titleColor }}
              >
                {pkg.name}
              </h4>
              <p className="text-[16px] font-[1000] text-[#1a1a1a] leading-none mt-0.5">
                {pkg.price}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="px-4 py-3 mt-auto">
        <div className="h-[1px] w-full bg-white/10 mb-3"></div>
        <div className="grid grid-cols-1 gap-2.5 md:gap-2">
          {(packages?.notes || []).map((note: any, i: number) => (
            <div key={note.id || i} className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-4 h-4 bg-green-600 rounded-full border border-green-400 shrink-0">
                <IconRenderer name="CheckCircle2" className="w-3 h-3 text-white" />
              </div>
              <p className="text-white text-[11px] md:text-[9.5px] font-bold tracking-tight leading-tight opacity-95 uppercase">
                {note.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelPackages;
