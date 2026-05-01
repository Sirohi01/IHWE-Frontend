// components/conference/ConferenceTracks.tsx
import React from "react";
import { motion } from "framer-motion";
import imgMedical from "../../assets/confrencetrack/Screenshot 2026-05-01 at 11.42.11 AM.png";
import imgHospital from "../../assets/confrencetrack/Screenshot 2026-05-01 at 11.42.21 AM.png";
import imgAyurveda from "../../assets/confrencetrack/Screenshot 2026-05-01 at 11.42.31 AM.png";
import imgWellness from "../../assets/confrencetrack/Screenshot 2026-05-01 at 11.42.37 AM.png";
import imgPharma from "../../assets/confrencetrack/Screenshot 2026-05-01 at 11.42.55 AM.png";
import imgDigital from "../../assets/confrencetrack/Screenshot 2026-05-01 at 11.43.03 AM.png";
import imgOrganic from "../../assets/confrencetrack/Screenshot 2026-05-01 at 11.43.11 AM.png";
import imgBeauty from "../../assets/confrencetrack/Screenshot 2026-05-01 at 11.43.18 AM.png";

const tracks = [
  { icon: imgMedical, label: "Medical Devices & Healthcare Innovation" },
  { icon: imgHospital, label: "Hospital Infrastructure & Smart Healthcare" },
  { icon: imgAyurveda, label: "Ayurveda, AYUSH & Alternative Medicine" },
  { icon: imgWellness, label: "Wellness, Fitness & Preventive Healthcare" },
  { icon: imgPharma, label: "Pharma, Nutraceuticals & Diagnostics" },
  { icon: imgDigital, label: "Digital Health, AI & HealthTech" },
  { icon: imgOrganic, label: "Organic Living & Sustainable Wellness" },
  { icon: imgBeauty, label: "Beauty, Personal Care & Lifestyle Wellness" },
];

const ConferenceTracks: React.FC = () => {
  return (
    <section className="py-4 bg-white">
      <div className="container mx-auto px-6 max-w-[1320px]">
        {/* Section header */}
        <div className="flex flex-col items-center mb-4">
          <h2 className="text-[24px] font-[900] text-[#0B2C66] uppercase tracking-tight">
            EXPLORE CONFERENCE <span className="text-[#1E88E5]">TRACKS</span>
          </h2>
          <div className="h-1 w-20 bg-[#4E9F3D] mt-2 rounded-full" />
        </div>

        {/* Tracks grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {tracks.map((track, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group p-5 rounded-[16px] bg-white border border-[#E6ECF3] flex flex-col items-center text-center hover:shadow-lg hover:border-[#4E9F3D] transition-all duration-300 cursor-pointer"
            >
              <div className="w-20 h-20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <img src={track.icon} alt="" className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              <h3 className="text-[13px] font-semibold text-[#1C2B3A] group-hover:text-[#4E9F3D] transition-colors leading-snug">
                {track.label}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConferenceTracks;