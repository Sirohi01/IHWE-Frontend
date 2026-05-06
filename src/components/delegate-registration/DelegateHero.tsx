import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, BookOpen, Globe } from "lucide-react";
import pragatiMaidan from "@/assets/Pragati-Maidan.jpg";

const DelegateHero: React.FC = () => {
  const stats = [
    { icon: <Users className="w-5 h-5 text-gray-700" />, value: "80+", label: "Expert Speakers" },
    { icon: <BookOpen className="w-5 h-5 text-gray-700" />, value: "18", label: "Power-Packed Sessions" },
    { icon: <Users className="w-5 h-5 text-gray-700" />, value: "1000+", label: "Delegates" },
    { icon: <Globe className="w-5 h-5 text-gray-700" />, value: "20+", label: "Countries" },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* Hero Content with Image Background */}
      <div className="relative h-[360px] w-full">
        <img
          src={pragatiMaidan}
          alt="Conference Venue"
          className="w-full h-full object-cover"
        />
        {/* White Gradient Overlay to match image */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent" />
        
        {/* Main Title and Stats Area */}
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8">
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-[48px] font-black text-[#143111] uppercase tracking-tight leading-none mb-3"
              >
                DELEGATE REGISTRATION
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-[16px] text-gray-700 font-medium max-w-[500px] leading-snug"
              >
                Register now and be a part of India's largest healthcare knowledge platform.
              </motion.p>

              {/* Stats Bar - Exactly like image */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-8 bg-[#F1F8EE]/80 backdrop-blur-sm rounded-xl p-5 flex items-center gap-10 border border-white shadow-sm max-w-max"
              >
                {stats.map((stat, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/50 flex items-center justify-center text-gray-600">
                      {stat.icon}
                    </div>
                    <div>
                      <div className="text-[18px] font-black text-[#143111] leading-none">{stat.value}</div>
                      <div className="text-[10px] font-bold text-gray-500 uppercase tracking-tight mt-1">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Details Card */}
            <div className="lg:col-span-4 flex justify-end">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-[#143111] rounded-2xl p-6 text-white shadow-2xl w-full max-w-[320px] relative overflow-hidden"
              >
                <div className="flex items-start gap-4 mb-6 relative z-10">
                  <div className="p-2.5 rounded-lg bg-white/10">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[18px] font-black">21 – 23 August 2026</div>
                    <div className="text-[13px] opacity-70 font-medium">Thursday – Saturday</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 relative z-10">
                  <div className="p-2.5 rounded-lg bg-white/10">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[18px] font-black leading-tight">Pragati Maidan,</div>
                    <div className="text-[18px] font-black leading-tight">New Delhi, India</div>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default DelegateHero;
