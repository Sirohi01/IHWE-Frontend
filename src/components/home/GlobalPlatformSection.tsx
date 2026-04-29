import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import worldMap from "@/assets/wordmap.png";

const GlobalPlatformSection = () => {
  const points = [
    "International Exhibitors & Global Brands",
    "Buyers, Distributors & Importers",
    "Hospitals & Healthcare Institutions",
    "Investors, Startups & Innovators",
    "Government Bodies, Embassies & Policymakers",
  ];

  const cards = [
    {
      line1: "GLOBAL", line2: "EXHIBITORS",
      desc: "Showcase to a global audience",
      icon: (
        <svg width="80" height="80" viewBox="0 0 36 36" fill="none">
          <circle cx="12" cy="11" r="4.5" stroke="#d4a742" strokeWidth="2"/>
          <circle cx="24" cy="11" r="4.5" stroke="#d4a742" strokeWidth="2"/>
          <path d="M3 30c0-5.5 8-7 9-7s9 1.5 9 7" stroke="#d4a742" strokeWidth="2" strokeLinecap="round"/>
          <path d="M24 23c3.5 0 9 1.5 9 7" stroke="#d4a742" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      line1: "INTERNATIONAL", line2: "BUYERS",
      desc: "Connect with decision makers",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#d4a742" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m11 17 2 2a1 1 0 1 0 3-3"/>
          <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/>
          <path d="m21 3 1 11h-2"/>
          <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/>
          <path d="M3 4h8"/>
        </svg>
      )
    },
    {
      line1: "POLICY &", line2: "KNOWLEDGE",
      desc: "Dialogue, insights & roadmaps",
      icon: (
        <svg width="80" height="80" viewBox="0 0 36 36" fill="none">
          <rect x="4" y="28" width="28" height="3" rx="1" stroke="#d4a742" strokeWidth="2"/>
          <rect x="4" y="13" width="28" height="3" rx="1" stroke="#d4a742" strokeWidth="2"/>
          <line x1="8" y1="16" x2="8" y2="28" stroke="#d4a742" strokeWidth="2" strokeLinecap="round"/>
          <line x1="14" y1="16" x2="14" y2="28" stroke="#d4a742" strokeWidth="2" strokeLinecap="round"/>
          <line x1="22" y1="16" x2="22" y2="28" stroke="#d4a742" strokeWidth="2" strokeLinecap="round"/>
          <line x1="28" y1="16" x2="28" y2="28" stroke="#d4a742" strokeWidth="2" strokeLinecap="round"/>
          <polygon points="3,13 18,4 33,13" stroke="#d4a742" strokeWidth="2" strokeLinejoin="round" fill="none"/>
        </svg>
      )
    },
    {
      line1: "INVESTMENT &", line2: "INNOVATION",
      desc: "Growth & collaboration",
      icon: (
        <svg width="80" height="80" viewBox="0 0 36 36" fill="none">
          <line x1="4" y1="30" x2="32" y2="30" stroke="#d4a742" strokeWidth="2" strokeLinecap="round"/>
          <rect x="6" y="20" width="5" height="10" rx="1" fill="#d4a742" opacity="0.5"/>
          <rect x="15.5" y="14" width="5" height="16" rx="1" fill="#d4a742" opacity="0.75"/>
          <rect x="25" y="8" width="5" height="22" rx="1" fill="#d4a742"/>
          <polyline points="7,18 16,12 24,15 31,5" stroke="#d4a742" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="27,5 31,5 31,9" stroke="#d4a742" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
  ];

  return (
    <section className="relative pt-3 pb-4 px-10 overflow-hidden" style={{ background: "#08172a" }}>

      {/* World Map BG */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url('${worldMap}')`,
          backgroundSize: "80%",
          backgroundPosition: "center right -5%",
          backgroundRepeat: "no-repeat",
          opacity: 0.45,
          filter: "invert(1) sepia(1) saturate(3) hue-rotate(185deg) brightness(1.3)",
        }}
      />

      {/* Blue Tint Overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: "linear-gradient(to right, #08172a 20%, rgba(8,23,42,0.4) 100%)",
          mixBlendMode: "multiply",
        }}
      />

      {/* Blue glow blob top-right */}
      <div
        className="absolute pointer-events-none z-[1]"
        style={{
          width: "380px", height: "280px",
          borderRadius: "50%",
          background: "rgba(30,90,200,0.18)",
          filter: "blur(70px)",
          top: "-60px", right: "18%",
        }}
      />

      {/* Gold glow blob bottom-right */}
      <div
        className="absolute pointer-events-none z-[1]"
        style={{
          width: "220px", height: "200px",
          borderRadius: "50%",
          background: "rgba(212,167,66,0.08)",
          filter: "blur(70px)",
          bottom: "-40px", right: "5%",
        }}
      />

      {/* Left fade gradient */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: "linear-gradient(to right, #08172a 28%, rgba(8,23,42,0.82) 48%, rgba(8,23,42,0.25) 68%, transparent 100%)",
        }}
      />

      <div className="relative z-10 grid lg:grid-cols-[1fr_1.5fr] gap-12 items-end">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[#d4a742] font-bold text-[11px] uppercase tracking-[.25em] mb-1 block">
            From India to the World
          </span>
          <h2 className="text-[32px] font-bold text-white leading-tight mb-2">
            From a National Expo<br />
            to a <span className="text-[#d4a742]">Global Platform</span>
          </h2>
          <p className="text-[#a0b3c8] text-[13px] mb-4 leading-relaxed">
            The 9th Edition – Global Edition marks a strategic <br /> evolution of IHWE, designed to attract:
          </p>
          <div className="space-y-[10px] pb-4">
            {points.map((point, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex items-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5 text-[#d4a742] flex-shrink-0" />
                <span className="text-[#d0dde8] text-[13px] font-medium">{point}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT — 4 cards */}
        <div className="grid grid-cols-4 gap-[12px] max-w-[780px] ml-auto pb-4">
          {cards.map((card, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -5 }}
              className="border border-white/[0.1] px-3 pt-5 pb-5 rounded-xl flex flex-col items-center text-center transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(10px)",
                boxShadow: `
                  0 0 0 1px rgba(255,255,255,0.06),
                  0 0 18px rgba(255,255,255,0.07),
                  0 0 10px rgba(212,167,66,0.06),
                  inset 0 0 14px rgba(255,255,255,0.03)
                `,
              }}
            >
              <div className="mb-3 flex items-center justify-center">
                {card.icon}
              </div>
              <h3 className="font-bold text-[12px] tracking-wider uppercase leading-snug mb-2">
                <span className="text-[#d4a742]">{card.line1}</span><br />
                <span className="text-white">{card.line2}</span>
              </h3>
              <p className="text-[#c5d6e8] text-[11.5px] leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default GlobalPlatformSection;