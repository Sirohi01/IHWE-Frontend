import React from "react";
import { motion } from "framer-motion";
import { Download, ChevronRight, Home, Users, Share2, ShieldCheck, Globe, Zap } from "lucide-react";
import amanImage from "../../../assets/dayimagesarogyasangosti/sagar.png";
import { SERVER_URL } from "@/lib/api";

interface Day3HeroProps {
  data?: {
    title: string;
    subtitle: string;
    date: string;
    category: string;
    description: string;
    backgroundImage: string;
    stats: Array<{ label: string; value: string }>;
  };
  defaultImage?: string;
}

const Day3Hero: React.FC<Day3HeroProps> = ({ data, defaultImage }) => {
  const heroData = data || {
    title: "Wellness & Ayush",
    subtitle: "Leadership Forum",
    date: "23 August 2026",
    category: "Day 3",
    description: "Strengthening prevention, public health & sustainability for a healthier planet.",
    backgroundImage: "",
    stats: [
      { label: "SESSIONS", value: "6 IMPACTFUL" },
      { label: "EXPERTS", value: "GLOBAL" },
      { label: "NETWORKING", value: "STRATEGIC" }
    ]
  };

  const bgImage = heroData.backgroundImage
    ? (heroData.backgroundImage.startsWith('http') ? heroData.backgroundImage : `${SERVER_URL}${heroData.backgroundImage}`)
    : (defaultImage || amanImage);

  const iconMap = {
    "SESSIONS": ShieldCheck,
    "EXPERTS": Globe,
    "NETWORKING": Zap
  };

  return (
    <section className="relative min-h-[750px] lg:min-h-[680px] flex items-center overflow-hidden font-sans">
      <div className="absolute inset-0 "></div>

      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top-left",
          backgroundRepeat: "no-repeat",
          opacity: 0.85,
        }}
      ></div>


      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent"></div>

      <div className="container mx-auto px-6 max-w-[1380px] relative z-10">
        <div className="max-w-[750px] relative left-[20px]" >

          <div className="flex items-center gap-2 text-[14px] text-[#5F6B7A] font-black mb-6">
            <Home className="w-4 h-4 text-[#4E9F3D]" />
            <ChevronRight className="w-4 h-4" />
            <span className="uppercase tracking-widest">Conference</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#0B2C66] uppercase tracking-widest font-black bg-[#E6F3E6] px-3 py-1 rounded-full border border-[#4E9F3D]/20">{heroData.category}</span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className="px-5 py-1.5 bg-[#1A4D2E] text-white text-[13px] font-black rounded-full uppercase tracking-widest shadow-md">
              {heroData.category}
            </span>
            <span className="px-5 py-1.5 bg-white text-[#0B2C66] text-[13px] font-black rounded-full uppercase tracking-widest border-2 border-[#0B2C66] shadow-sm">
              {heroData.date}
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-3"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[54px] font-semibold font-sans leading-tight tracking-tight">
              <span
                className="text-[#0B2C66] block uppercase mb-0.5"
                dangerouslySetInnerHTML={{ __html: heroData.title.replace(/\n/g, '<br />') }}
              />
              <span
                className="text-[#4E9F3D] block uppercase"
                dangerouslySetInnerHTML={{ __html: heroData.subtitle.replace(/\n/g, '<br />') }}
              />
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[13px] sm:text-[14px] md:text-[15px] text-[#5F6B7A] leading-[1.4] max-w-[550px] font-bold mb-6"
          >
            {heroData.description}
          </motion.p>

          <div className="flex flex-wrap gap-x-6 gap-y-4 mb-8">
            {heroData.stats.map((stat, idx) => {
              const Icon = iconMap[stat.label] || ShieldCheck;
              return (
                <div key={idx} className="flex items-center gap-2">
                  <Icon className="w-6 h-6 text-[#4E9F3D] stroke-[2]" />
                  <div className="flex flex-col">
                    <span className="text-[12px] font-black text-[#0B2C66] leading-none uppercase">{stat.value}</span>
                    <span className="text-[9px] font-bold text-[#4E9F3D] uppercase tracking-widest mt-0.5">{stat.label}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <button className="px-8 py-3.5 rounded-full bg-[#1A4D2E] text-white text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-lg hover:bg-[#0B2C66] group">
              REGISTER FOR {heroData.category}
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
            <button className="px-8 py-3.5 rounded-full bg-white text-[#0B2C66] text-[11px] font-black uppercase tracking-widest border-2 border-[#0B2C66] flex items-center justify-center gap-3 transition-all hover:bg-gray-50 shadow-sm">
              DOWNLOAD AGENDA
              <Download className="w-4 h-4 text-[#4E9F3D] stroke-[2.5]" />
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Day3Hero;