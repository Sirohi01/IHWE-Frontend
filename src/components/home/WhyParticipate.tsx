import { CheckCircle2, FileDown, ArrowRight, Leaf, Store, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionContainer from '../layout/SectionContainer';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { whyParticipateApi, SERVER_URL, settingsApi } from '../../lib/api';

import participateImgDefault from '@/assets/participate.webp';

// ── Sparkle Component (same as Footer) ──
const Sparkle = ({ style, color = '#fff176' }: { style?: React.CSSProperties, color?: string }) => (
  <span
    style={{
      position: 'absolute',
      pointerEvents: 'none',
      fontSize: '12px',
      color: color,
      textShadow: `0 0 6px ${color}, 0 0 12px ${color}`,
      animation: 'sparkleAnim 1.6s ease-in-out infinite',
      opacity: 0,
      zIndex: 20,
      ...style,
    }}
  >
    ✦
  </span>
);

const WhyParticipate = () => {
  const [data, setData] = useState<any>(null);
  const [brochureUrl, setBrochureUrl] = useState("/pdf.pdf");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [response, settingsData] = await Promise.all([
          whyParticipateApi.get(),
          settingsApi.get()
        ]);
        if (response) {
          setData(response);
        }
        if (settingsData && settingsData.downloadBrochurePdf) {
          setBrochureUrl(`${SERVER_URL}${settingsData.downloadBrochurePdf}`);
        }
      } catch (err) {
        console.error("Error fetching why participate data:", err);
      }
    };
    fetchData();
  }, []);

  if (!data) return null;

  const points = data.keyPoints || [];
  const mainPoints = data.mainPoints || ["Exhibit", "Connect", "Grow"];
  const imageSrc = data.image ? `${SERVER_URL}${data.image}` : participateImgDefault;
  const brochurePath = brochureUrl;

  return (
    <section className="bg-[#F9FCF9] pt-4 pb-12 overflow-hidden">
      {/* ── Inject same keyframe animations as Footer ── */}
      <style>{`
        @keyframes goldShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes shimmer {
          0%   { left: -75%; }
          100% { left: 150%; }
        }
        @keyframes sparkleAnim {
          0%   { opacity: 0; transform: scale(0.5) translateY(0); }
          40%  { opacity: 1; transform: scale(1.2) translateY(-4px); }
          80%  { opacity: 0.6; transform: scale(0.9) translateY(-6px); }
          100% { opacity: 0; transform: scale(0.5) translateY(-8px); }
        }
        .golden-btn-wp {
          background: linear-gradient(135deg, #f5c842 0%, #ffdd00 30%, #ffa500 60%, #f5c842 100%);
          background-size: 200% 200%;
          animation: goldShift 2.5s ease infinite;
          box-shadow: 0 0 16px 4px rgba(255,200,0,0.3), 0 4px 15px rgba(255,165,0,0.25);
          position: relative;
          overflow: hidden;
        }
        .golden-btn-wp::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -75%;
          width: 50%;
          height: 200%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent);
          transform: skewX(-20deg);
          animation: shimmer 2s infinite;
        }
        .blue-btn-wp {
          background: linear-gradient(135deg, #28396C 0%, #3d528f 30%, #1e2a50 60%, #28396C 100%);
          background-size: 200% 200%;
          animation: goldShift 2.5s ease infinite;
          box-shadow: 0 0 16px 4px rgba(40,57,108,0.3), 0 4px 15px rgba(40,57,108,0.25);
          position: relative;
          overflow: hidden;
        }
        .blue-btn-wp::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -75%;
          width: 50%;
          height: 200%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent);
          transform: skewX(-20deg);
          animation: shimmer 2s infinite;
        }
      `}</style>

      <SectionContainer className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full lg:w-1/2"
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#2f8f3a]">{data.subtitle || "Why Participate"}</span>
            <Leaf className="w-[22px] h-[22px] text-[#2f8f3a]" fill="#2f8f3a" />
          </div>

          <h2
            className="text-[26px] md:text-[34px] font-extrabold text-[#071c3d] leading-[1.1] mb-2 prose-headings:m-0"
            dangerouslySetInnerHTML={{ __html: data.heading || 'Your Gateway to <span class="text-[#346739]">Growth</span>' }}
          />

          <div
            className="text-[13.5px] font-semibold text-[#071c3d] leading-[1.7] mb-3 max-w-[480px] text-justify prose prose-sm max-w-none prose-p:m-0"
            dangerouslySetInnerHTML={{ __html: data.description || 'The International Health & Wellness Expo 2026 is a leading platform...' }}
          />

          <div className="space-y-3 mb-8">
            {points.map((point: string, index: number) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#2f8f3a]" fill="#2f8f3a" color="#fff" />
                <span className="text-[13px] font-semibold text-[#071c3d]">{point}</span>
              </div>
            ))}
          </div>

          {/* ── BUTTONS ROW ── */}
          <div className="flex flex-wrap items-center gap-3 md:gap-4">

            {/* ── GOLDEN "BOOK A STALL" BUTTON with sparkles ── */}
            <div className="relative group/btn">
              {/* Sparkles */}
              <Sparkle style={{ top: '-10px', left: '10%', animationDelay: '0s' }} />
              <Sparkle style={{ top: '-12px', left: '40%', animationDelay: '0.4s' }} />
              <Sparkle style={{ top: '-8px', right: '15%', animationDelay: '0.8s' }} />
              <Sparkle style={{ bottom: '-10px', left: '25%', animationDelay: '0.2s' }} />
              <Sparkle style={{ bottom: '-12px', right: '30%', animationDelay: '0.6s' }} />

              <Link
                to={data.button1Path || "/book-a-stand"}
                target="_blank"
                className="golden-btn-wp flex items-center gap-1.5 px-4 h-8 rounded-lg relative z-10 hover:scale-[1.02] transition-transform"
              >
                <Store className="w-[14px] h-[14px] text-[#050A1A] shrink-0" />
                <span className="font-bold text-[10px] tracking-widest text-[#050A1A]">
                  BOOK A STALL
                </span>
                <ArrowRight className="w-3 h-3 text-[#050A1A] group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* ── Blue "Download Brochure" BUTTON with sparkles ── */}
            <div className="relative group/btn">
              {/* Blue Sparkles */}
              <Sparkle color="#28396C" style={{ top: '-10px', left: '10%', animationDelay: '0.1s' }} />
              <Sparkle color="#28396C" style={{ top: '-12px', left: '40%', animationDelay: '0.5s' }} />
              <Sparkle color="#28396C" style={{ top: '-8px', right: '15%', animationDelay: '0.9s' }} />
              <Sparkle color="#28396C" style={{ bottom: '-10px', left: '25%', animationDelay: '0.3s' }} />
              <Sparkle color="#28396C" style={{ bottom: '-12px', right: '30%', animationDelay: '0.7s' }} />

              <a
                href={brochurePath}
                target="_blank"
                rel="noopener noreferrer"
                className="blue-btn-wp flex items-center gap-1.5 px-4 h-8 rounded-lg relative z-10 hover:scale-[1.02] transition-transform"
              >
                <FileDown className="w-[14px] h-[14px] text-white shrink-0" />
                <span className="font-bold text-[10px] tracking-widest text-white uppercase">
                  {data.button2Text || "Download Brochure"}
                </span>
                <ArrowRight className="w-3 h-3 text-white group-hover/btn:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* ── More Info Button ── */}
            <Link
              to="/why-exhibit"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 h-8 rounded-lg border border-[#2f8f3a] bg-white text-[#2f8f3a] hover:bg-[#2f8f3a]/5 transition-all hover:scale-[1.02] shadow-sm relative z-10"
            >
              <Info className="w-[14px] h-[14px] shrink-0" />
              <span className="font-bold text-[10px] tracking-widest uppercase">
                Why Exhibit?
              </span>
            </Link>
          </div>
        </motion.div>

        {/* RIGHT IMAGE SECTION */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full lg:w-1/2 relative"
        >
          {/* Green background block behind image */}
          <div className="hidden md:block absolute bottom-[-18px] right-[-18px] w-[180px] h-[180px] bg-[#2f8f3a] rounded-[20px] z-0" />

          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-[7px] border-white/70 z-10">
            <img loading="lazy" decoding="async" src={imageSrc}
              alt={data.imageAltText || "Business Meeting"}
              className="w-full h-[280px] md:h-[330px] object-cover"
            />

            {/* Floating Badge */}
            <div className="absolute bottom-6 right-6 bg-white p-3 md:p-4 rounded-2xl shadow-xl border-l-[5px] border-[#2f8f3a] max-w-[170px] md:max-w-[190px] z-20 transform hover:-translate-y-2 transition-transform duration-300">
              <div className="flex items-start gap-2 md:gap-3">
                <Leaf className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#2f8f3a] shrink-0 mt-[2px]" fill="#2f8f3a" />
                <p className="text-[10px] md:text-[12px] font-bold text-[#071c3d] leading-tight whitespace-pre-line">
                  {data.imageOverlayText || "Build Relationships.\nGenerate Leads.\nGrow Your Business."}
                </p>
              </div>
            </div>
          </div>

          {/* 3-point bullets below image */}
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 md:gap-8 mt-6 md:mt-8 md:ml-6">
            {mainPoints.map((point: string, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#2f8f3a]" fill="#2f8f3a" color="#fff" />
                <span className="text-[13px] md:text-[14px] font-bold text-[#071c3d] tracking-tight uppercase">{point}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </SectionContainer>
    </section>
  );
};

export default WhyParticipate;