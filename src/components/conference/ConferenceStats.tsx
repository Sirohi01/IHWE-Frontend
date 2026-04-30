// components/conference/ConferenceStats.tsx
import React from "react";
import { motion } from "framer-motion";
import { Users, Mic, Calendar, Trophy, Globe2 } from "lucide-react";

// Custom Infinity icon since lucide doesn't have one
const InfinityIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8C.344 8 .344 16 5.44 16c5.095 0 7.133-8 12.738-8z" />
  </svg>
);

const statsData = [
  { icon: Users, value: "50+", label: "Expert Speakers" },
  { icon: Mic, value: "18", label: "Premium Sessions" },
  { icon: Calendar, value: "3", label: "Major Conferences" },
  { icon: Trophy, value: "1000+", label: "Delegates" },
  { icon: Globe2, value: "20+", label: "Countries" },
  { icon: InfinityIcon, value: "∞", label: "Endless Opportunities", custom: true },
];

const ConferenceStats: React.FC = () => {
  return (
    <section className="relative z-[60] mx-auto max-w-[1320px] -mt-6 px-6">
      <div className="bg-[#0B2C66] rounded-[18px] shadow-xl border border-[#1E4B8A] px-12 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-11 h-11 rounded-[10px] bg-white/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                {stat.custom ? (
                  <InfinityIcon />
                ) : (
                  <stat.icon className="w-5 h-5 text-white" />
                )}
              </div>
              <h3 className="text-[30px] font-bold text-white mb-1 leading-tight">
                {stat.value}
              </h3>
              <p className="text-[10px] font-semibold text-white/70 uppercase tracking-widest leading-tight">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConferenceStats;