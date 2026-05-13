import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Star, Crown, CheckCircle2 } from 'lucide-react';

const packages = [
  {
    name: "ASSOCIATE PARTNER",
    price: "₹1,00,000 + GST",
    icon: <Globe className="w-6 h-6" />,
    color: "#0B3931",
    titleColor: "#0B2C66"
  },
  {
    name: "PREFERRED PARTNER",
    price: "₹2,00,000 + GST",
    icon: <Star className="w-6 h-6 fill-current" />,
    color: "#050A1A",
    titleColor: "#A67C00"
  },
  {
    name: "PREMIER PARTNER",
    price: "₹3,50,000 + GST",
    icon: <Crown className="w-6 h-6 fill-current" />,
    color: "#050A1A",
    titleColor: "#D4AF37"
  },
];

const HotelPackages: React.FC = () => {
  return (
    <div className="bg-[#051124] rounded-[20px] border-2 border-[#D4AF37]/30 overflow-hidden flex flex-col shadow-2xl h-full">

      <div className="relative pt-3 pb-2 px-4 text-center">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-500/30 via-transparent to-transparent"></div>
        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="h-[1px] w-4 bg-gradient-to-l from-[#D4AF37] to-transparent"></div>
            <Star className="w-2.5 h-2.5 fill-[#D4AF37] text-[#D4AF37]" />
            <h3 className="text-white font-[900] text-[11px] uppercase tracking-[1.2px] leading-tight">
              PARTNERSHIP PACKAGES
            </h3>
            <Star className="w-2.5 h-2.5 fill-[#D4AF37] text-[#D4AF37]" />
            <div className="h-[1px] w-4 bg-gradient-to-r from-[#D4AF37] to-transparent"></div>
          </div>
          <h3 className="text-white font-[900] text-[11px] uppercase tracking-[1.2px] leading-none mt-0.5">
            &amp; INVESTMENT
          </h3>
        </div>
      </div>


      <div className="p-2 flex flex-col gap-2 flex-1 ">
        {packages.map((pkg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[10px] overflow-hidden flex items-stretch h-[55px] shadow-[0_5px_15px_rgba(0,0,0,0.3)] border border-white/10"
          >

            <div
              className="w-[55px] flex items-center justify-center text-white relative"
              style={{ backgroundColor: pkg.color }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
              <div className="relative z-10">
                {React.cloneElement(pkg.icon as React.ReactElement, { className: "w-5 h-5" })}
              </div>
            </div>


            <div className="flex-1 flex flex-col justify-center px-4">
              <h4
                className="text-[10px] font-[900] uppercase tracking-tight"
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
        <div className="grid grid-cols-1 gap-2">
          {[
            { text: "Custom packages available on request", id: "custom" },
            { text: "GST as applicable", id: "gst" },
            { text: "Stay vouchers valid during event period", id: "vouchers" },
          ].map((note, i) => (
            <div key={note.id} className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-4 h-4 bg-green-600 rounded-full border border-green-400">
                <CheckCircle2 className="w-3 h-3 text-white" />
              </div>
              <p className="text-white text-[9.5px] font-bold tracking-tight leading-tight opacity-95 uppercase">
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
