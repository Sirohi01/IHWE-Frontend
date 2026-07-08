import React from 'react';
import { motion } from 'framer-motion';

interface BlogHeroProps {
  settings?: any;
  onSearch?: (query: string) => void;
  heroImage?: string;
}

const BlogHero: React.FC<BlogHeroProps> = ({ settings, onSearch, heroImage }) => {
  return (
    <section className="relative overflow-hidden bg-white">

      {/* ── Main Hero Banner ── */}
      <div className="relative flex items-center overflow-hidden aspect-[0.75/1] sm:aspect-[16/9] md:aspect-[21/9] lg:aspect-[16/7] min-h-[380px] md:min-h-[420px] lg:min-h-[480px]">

        {/* White to light-blue gradient bg */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-[#f0f8ff] to-[#e0f2fe]" />

        {/* Soft arc/wave bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
          <svg viewBox="0 0 1440 64" className="w-full h-full" preserveAspectRatio="none">
            <path
              d="M0,40 C360,80 1080,0 1440,40 L1440,64 L0,64 Z"
              fill="url(#waveGrad)"
            />
            <defs>
              <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#04215A" />
                <stop offset="100%" stopColor="#098E7B" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Hero background image — right side */}
        {heroImage ? (
          <div className="absolute inset-0 z-0">
            <img loading="lazy" decoding="async" src={heroImage}
              className="absolute inset-0 w-full h-full object-cover object-right-bottom"
              alt="Hero Background"
            />
          </div>
        ) : (
          /* Default decorative right side when no image */
          <div className="absolute right-0 top-0 bottom-0 w-[55%] pointer-events-none z-0">

            {/* Soft blob */}
            <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-[#e0f2fe]/80 to-transparent" />

            {/* Floating health icons */}
            {[
              { icon: "+", top: "18%", right: "38%", size: 48, border: "#0ea5e9" },
              { icon: "♥", top: "12%", right: "20%", size: 44, border: "#098E7B" },
              { icon: "🌿", top: "40%", right: "10%", size: 40, border: "#4ade80" },
              { icon: "⚕", top: "55%", right: "30%", size: 36, border: "#0ea5e9" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                className="absolute flex items-center justify-center rounded-full bg-white shadow-md"
                style={{
                  top: item.top,
                  right: item.right,
                  width: item.size,
                  height: item.size,
                  border: `2px solid ${item.border}`,
                  fontSize: item.size * 0.4,
                }}
              >
                {item.icon}
              </motion.div>
            ))}

            {/* Dashed connecting lines SVG */}
            <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 300">
              <path d="M200,60 Q280,100 320,140 Q280,180 200,200 Q160,160 180,100 Z"
                fill="none" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="6,4" />
              <path d="M240,40 L310,90" fill="none" stroke="#098E7B" strokeWidth="1" strokeDasharray="4,4" />
              <path d="M310,90 L350,160" fill="none" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="4,4" />
            </svg>
          </div>
        )}

        {/* ── Left Content ── */}
        <div className="relative z-10 container mx-auto px-6 md:px-12 py-10">
          <div className="">

            {/* Logo + Title row */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-5"
            >

              {/* Expo name */}
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl font-semibold text-[#04215A] leading-tight"
              >
                International<br />
                Health & Wellness<br />
                Expo <span className="text-[#098E7B]">2026</span>
              </motion.h2>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl py-3 font-semibold leading-none mb-3 tracking-tight"
            >
              <span className="text-[#04215A]">Blogs & </span>
              <span className="text-[#098E7B]">News</span>
            </motion.h1>

            {/* Double underline with dot */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-1 mb-10"
            >
              <div className="w-28 h-[4px] bg-[#04215A] rounded-full" />
              <div className="w-3 h-3 rounded-full bg-[#098E7B]" />
              <div className="w-28 h-[4px] bg-[#098E7B] rounded-full" />
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default BlogHero;