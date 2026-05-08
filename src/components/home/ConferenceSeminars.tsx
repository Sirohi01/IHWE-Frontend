import React from 'react';
import { Leaf, ArrowRight, Calendar, MapPin, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionContainer from '../layout/SectionContainer';
import { Link } from 'react-router-dom';
import learnImg from '@/assets/learn.webp';
import arogyaLogo from '@/assets/arogya.png';

// Orange Sparkle component
const OrangeSparkle = ({ style }: { style?: React.CSSProperties }) => (
  <span
    style={{
      position: 'absolute',
      pointerEvents: 'none',
      fontSize: '11px',
      color: '#ffb347',
      textShadow: '0 0 5px #ff8c00, 0 0 10px #ff6600, 0 0 18px rgba(255,140,0,0.8)',
      animation: 'orangeSparkleAnim 1.8s ease-in-out infinite',
      opacity: 0,
      zIndex: 20,
      ...style,
    }}
  >
    ✦
  </span>
);

const ConferenceSeminars = () => {
  return (
    <section className="bg-[#0b4d17] pt-6 pb-6 overflow-hidden relative">

      <style>{`
        /* ── Orange shimmer for button bg ── */
        @keyframes orangeShimmer {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* ── Sweep shine ── */
        @keyframes orangeSweep {
          0%   { left: -75%; }
          100% { left: 150%; }
        }

        /* ── Orange sparkle float-up ── */
        @keyframes orangeSparkleAnim {
          0%   { opacity: 0; transform: scale(0.5) translateY(0); }
          40%  { opacity: 1; transform: scale(1.3) translateY(-5px); }
          80%  { opacity: 0.6; transform: scale(0.9) translateY(-8px); }
          100% { opacity: 0; transform: scale(0.5) translateY(-11px); }
        }

        /* ── Orange Button ── */
        .orange-btn {
          position: relative;
          overflow: hidden;
          background: linear-gradient(
            135deg,
            #ff6a00 0%,
            #ff8c00 25%,
            #ffb347 50%,
            #ff8c00 75%,
            #ff6a00 100%
          );
          background-size: 200% 200%;
          animation: orangeShimmer 2.5s ease infinite;
          border: 1.5px solid #ff9500;
          box-shadow:
            0 0 16px 4px rgba(255,140,0,0.35),
            0 4px 15px rgba(255,100,0,0.3),
            0 1px 2px rgba(255,200,100,0.5) inset,
            0 -1px 2px rgba(180,60,0,0.2) inset;
          transition: filter 0.2s, transform 0.15s;
        }
        .orange-btn::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -75%;
          width: 50%;
          height: 200%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.35), transparent);
          transform: skewX(-20deg);
          animation: orangeSweep 2.2s infinite;
        }
        .orange-btn:hover {
          filter: brightness(1.08);
          transform: translateY(-1px);
          box-shadow:
            0 0 22px 6px rgba(255,140,0,0.45),
            0 6px 20px rgba(255,100,0,0.4),
            0 1px 3px rgba(255,210,120,0.6) inset,
            0 -1px 3px rgba(180,60,0,0.25) inset;
        }
        .orange-btn:active {
          transform: translateY(0px);
          filter: brightness(0.96);
        }
        .orange-btn .btn-text {
          font-weight: 800;
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #000;
          position: relative;
          z-index: 1;
        }
        .orange-btn .btn-arrow {
          color: #000;
          transition: transform 0.2s;
          position: relative;
          z-index: 1;
        }
        .orange-btn:hover .btn-arrow {
          transform: translateX(3px);
        }
      `}</style>

      <SectionContainer className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

        {/* LEFT IMAGE BOX */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full lg:w-[40%]"
        >
          <div className="relative rounded-[1.2rem] overflow-hidden border-[5px] border-white/20 shadow-2xl group">
            <img
              src={learnImg}
              alt="Conference and Seminars"
              className="w-full h-[200px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Arogya Logo with white glow for clear visibility */}
            <div className="absolute top-3 left-3">
              <img
                src={arogyaLogo}
                alt="Arogya Logo"
                className="h-10 md:h-12 w-auto object-contain"
                style={{
                  filter:
                    'drop-shadow(0 0 4px rgba(255,255,255,1)) drop-shadow(0 0 8px rgba(255,255,255,0.95)) drop-shadow(0 0 14px rgba(255,255,255,0.8)) drop-shadow(0 0 20px rgba(255,255,255,0.5))',
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* RIGHT TEXT CONTENT & DIVIDER */}
        <div className="flex items-center gap-4 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-start"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-white/90">
                Conference &amp; Seminars
              </span>
              <Leaf className="w-[24px] h-[24px] text-white/90" fill="currentColor" />
            </div>

            <h2 className="text-[24px] md:text-[30px] font-extrabold text-white leading-tight mb-3">
              Learn. Connect. Get Inspired.
            </h2>

            <p className="text-[13px] md:text-[13.5px] text-white/80 leading-relaxed mb-4 max-w-[580px]">
              Join expert-led sessions, panel discussions &amp; thought leadership{' '}
              <br className="hidden md:block" />
              talks on the latest trends shaping the future of healthcare.
            </p>

            {/* Orange Sparkle Button */}
            <div className="relative group/btn">
              {/* Orange Sparkles — same positions as Footer gold button */}
              <div className="hidden md:block">
                <OrangeSparkle style={{ top: '-9px',     left: '10%',   animationDelay: '0s'    }} />
                <OrangeSparkle style={{ top: '-11px',    left: '40%',   animationDelay: '0.35s' }} />
                <OrangeSparkle style={{ top: '-7px',     right: '14%',  animationDelay: '0.7s'  }} />
                <OrangeSparkle style={{ bottom: '-9px',  left: '22%',   animationDelay: '0.18s' }} />
                <OrangeSparkle style={{ bottom: '-11px', right: '28%',  animationDelay: '0.55s' }} />
              </div>

              <Link to="/conference" target="_blank" className="relative z-10">
                <button className="orange-btn flex items-center gap-2 px-6 h-9 rounded-xl">
                  <span className="btn-text">Register For Seminar</span>
                  <ArrowRight className="btn-arrow w-3.5 h-3.5" />
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Vertical Divider */}
          <div className="hidden lg:block w-[1px] h-44 bg-white/20 shrink-0" />

          {/* Event Info Stack */}
          <div className="hidden lg:flex flex-col gap-6 pl-2">
            {[
              { icon: Calendar, title: '20 – 22',          sub: 'MARCH 2026' },
              { icon: MapPin,   title: 'PRAGATI MAIDAN',   sub: 'NEW DELHI'  },
              { icon: Users,    title: 'INSIGHTS. IDEAS.', sub: 'IMPACT.'    },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2e8b3e] flex items-center justify-center shadow-inner border border-white/5">
                  <item.icon size={18} className="text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10.5px] font-bold text-white/90 leading-tight uppercase tracking-[0.2em]">
                    {item.title}
                  </span>
                  <span className="text-[10.5px] font-bold text-white/90 leading-tight uppercase tracking-[0.2em]">
                    {item.sub}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </SectionContainer>
    </section>
  );
};

export default ConferenceSeminars;