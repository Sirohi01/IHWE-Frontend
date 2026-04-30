// components/conference/ConferenceTracks.tsx
import React from "react";
import { motion } from "framer-motion";
import {
  HeartPulse,
  Building2,
  Leaf,
  Sparkles,
  Stethoscope,
  Cpu,
  Apple,
  Flower2,
} from "lucide-react";

const tracks = [
  { icon: HeartPulse, label: "Medical Devices & Healthcare Innovation" },
  { icon: Building2, label: "Hospital Infrastructure & Smart Healthcare" },
  { icon: Leaf, label: "Ayurveda, AYUSH & Alternative Medicine" },
  { icon: Sparkles, label: "Wellness, Fitness & Preventive Healthcare" },
  { icon: Stethoscope, label: "Pharma, Nutraceuticals & Diagnostics" },
  { icon: Cpu, label: "Digital Health, AI & HealthTech" },
  { icon: Apple, label: "Organic Living & Sustainable Wellness" },
  { icon: Flower2, label: "Beauty, Personal Care & Lifestyle Wellness" },
];

const ConferenceTracks: React.FC = () => {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-6 max-w-[1320px]">
        {/* Section header */}
        <div className="flex flex-col items-center mb-10">
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
              className="group p-5 rounded-[16px] bg-[#F7F9FC] border border-[#E6ECF3] flex flex-col items-center text-center hover:bg-[#4E9F3D] hover:border-[#4E9F3D] transition-all duration-400 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-400">
                <track.icon className="w-6 h-6 text-[#4E9F3D]" />
              </div>
              <h3 className="text-[13px] font-semibold text-[#1C2B3A] group-hover:text-white transition-colors leading-snug">
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