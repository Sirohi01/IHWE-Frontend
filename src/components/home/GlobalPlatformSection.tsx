import { motion } from "framer-motion";
import SectionContainer from "../layout/SectionContainer";
import { CheckCircle2, Map } from "lucide-react";
import { useState, useEffect } from "react";
import { nationalExpoApi, SERVER_URL } from "../../lib/api";
import defaultWorldMap from "@/assets/wordmap.png";

const ICON_MAP: Record<string, React.ReactNode> = {
  Globe: (
    <svg width="80" height="80" viewBox="0 0 36 36" fill="none">
      <circle cx="12" cy="11" r="4.5" stroke="#d4a742" strokeWidth="2" />
      <circle cx="24" cy="11" r="4.5" stroke="#d4a742" strokeWidth="2" />
      <path d="M3 30c0-5.5 8-7 9-7s9 1.5 9 7" stroke="#d4a742" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 23c3.5 0 9 1.5 9 7" stroke="#d4a742" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  UserCheck: (
    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#d4a742" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m11 17 2 2a1 1 0 1 0 3-3" />
      <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
      <path d="m21 3 1 11h-2" />
      <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
      <path d="M3 4h8" />
    </svg>
  ),
  BookOpen: (
    <svg width="80" height="80" viewBox="0 0 36 36" fill="none">
      <rect x="4" y="28" width="28" height="3" rx="1" stroke="#d4a742" strokeWidth="2" />
      <rect x="4" y="13" width="28" height="3" rx="1" stroke="#d4a742" strokeWidth="2" />
      <line x1="8" y1="16" x2="8" y2="28" stroke="#d4a742" strokeWidth="2" strokeLinecap="round" />
      <line x1="14" y1="16" x2="14" y2="28" stroke="#d4a742" strokeWidth="2" strokeLinecap="round" />
      <line x1="22" y1="16" x2="22" y2="28" stroke="#d4a742" strokeWidth="2" strokeLinecap="round" />
      <line x1="28" y1="16" x2="28" y2="28" stroke="#d4a742" strokeWidth="2" strokeLinecap="round" />
      <polygon points="3,13 18,4 33,13" stroke="#d4a742" strokeWidth="2" strokeLinejoin="round" fill="none" />
    </svg>
  ),
  TrendingUp: (
    <svg width="80" height="80" viewBox="0 0 36 36" fill="none">
      <line x1="4" y1="30" x2="32" y2="30" stroke="#d4a742" strokeWidth="2" strokeLinecap="round" />
      <rect x="6" y="20" width="5" height="10" rx="1" fill="#d4a742" opacity="0.5" />
      <rect x="15.5" y="14" width="5" height="16" rx="1" fill="#d4a742" opacity="0.75" />
      <rect x="25" y="8" width="5" height="22" rx="1" fill="#d4a742" />
      <polyline points="7,18 16,12 24,15 31,5" stroke="#d4a742" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="27,5 31,5 31,9" stroke="#d4a742" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  CheckCircle2: <CheckCircle2 className="w-12 h-12 text-[#d4a742]" />,
  Map: <Map className="w-12 h-12 text-[#d4a742]" />,
};

// ✅ whileInView directly use — useInView/ref ka chakkar nahi
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 65,
    scale: 0.72,
    rotate: -5,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.65,
      ease: [0.34, 1.56, 0.64, 1],
    },
  }),
};

const GlobalPlatformSection = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const platformData = await nationalExpoApi.get();
        if (platformData) setData(platformData);
      } catch (err) {
        console.error("Error fetching global platform data:", err);
      }
    };
    fetchData();
  }, []);

  if (!data) return null;

  const points = data.points || [];
  const cards = data.cards || [];
  const bgUrl = data.bgImage ? `${SERVER_URL}${data.bgImage}` : defaultWorldMap;

  return (
    <section className="relative pt-3 pb-4 overflow-hidden" style={{ background: "#08172a" }}>

      {/* World Map BG */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url('${bgUrl}')`,
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

      <SectionContainer className="relative z-10 grid lg:grid-cols-[1fr_1.5fr] gap-12 items-end">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div
            className="text-[#d4a742] font-bold text-[11px] uppercase tracking-[.25em] mb-1 block prose prose-sm max-w-none prose-p:m-0"
            dangerouslySetInnerHTML={{ __html: data.subtitle }}
          />
          <div
            className="text-[28px] md:text-[32px] font-bold text-white leading-tight mb-2 prose prose-invert prose-xl max-w-none prose-headings:m-0"
            dangerouslySetInnerHTML={{ __html: data.title }}
          />
          <div
            className="text-[#a0b3c8] text-[13px] mb-4 leading-relaxed prose prose-sm max-w-none prose-p:m-0"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />

          <div className="space-y-[10px] pb-4">
            {points
              .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
              .map((point: any, i: number) => (
                <motion.div
                  key={point._id || i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#d4a742] flex-shrink-0" />
                  <span className="text-[#d0dde8] text-[13px] font-medium">{point.text}</span>
                </motion.div>
              ))}
          </div>
        </motion.div>

        {/* ✅ RIGHT — Cards with whileInView directly (reliable fix) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[12px] max-w-[780px] ml-auto pb-4">
          {cards
            .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
            .map((card: any, i: number) => (
              <motion.div
                key={card._id || i}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{
                  y: -8,
                  scale: 1.04,
                  transition: { duration: 0.22, ease: "easeOut" },
                }}
                className="border border-white/[0.1] px-3 pt-5 pb-5 rounded-xl flex flex-col items-center text-center"
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
                  {ICON_MAP[card.icon] || ICON_MAP.Globe}
                </div>
                <h3 className="font-bold text-[12px] tracking-wider uppercase leading-snug mb-2">
                  <span className="text-[#d4a742]">{card.goldTitle}</span><br />
                  <span className="text-white">{card.whiteTitle}</span>
                </h3>
                <p className="text-[#c5d6e8] text-[11.5px] leading-relaxed">{card.description}</p>
              </motion.div>
            ))}
        </div>


      </SectionContainer>
    </section>
  );
};

export default GlobalPlatformSection;