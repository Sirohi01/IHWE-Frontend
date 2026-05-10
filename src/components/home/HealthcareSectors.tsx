import React from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, Pill, Building2, Microscope, Cpu, Heart, Leaf, FlaskConical, 
  ShoppingBasket, Dumbbell, Award, Users, Lightbulb, Handshake,
  Stethoscope, Thermometer, Syringe, HeartPulse, Building, Dna,
  ShieldCheck, Box, Monitor, Globe, Zap, Package, MapPin
} from 'lucide-react';
import { API_URL, SERVER_URL } from '@/lib/api';
import SectionContainer from '../layout/SectionContainer';


const ICONS_MAP = {
  Activity, Pill, Building2, Microscope, Cpu, Heart, Leaf, FlaskConical, 
  ShoppingBasket, Dumbbell, Award, Users, Lightbulb, Handshake,
  Stethoscope, Thermometer, Syringe, HeartPulse, Building, Dna,
  ShieldCheck, Box, Monitor, Globe, Zap, Package, MapPin
};

const IconComponent = ({ name, ...props }) => {
  const Icon = ICONS_MAP[name] || Leaf;
  return <Icon {...props} />;
};

const bottomStats = [
  {
    icon: <Award className="w-5 h-5" />,
    title: "Wide Range of Categories",
    desc: "Everything you need under one roof."
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Trusted Brands & Suppliers",
    desc: "Connect with leading brands and reliable partners."
  },
  {
    icon: <Lightbulb className="w-5 h-5" />,
    title: "Innovation & Knowledge",
    desc: "Discover the latest trends, technologies and solutions."
  },
  {
    icon: <Handshake className="w-5 h-5" />,
    title: "Business & Growth",
    desc: "Build connections that create endless opportunities."
  }
];

const HealthcareSectors = () => {
  const [content, setContent] = React.useState({
    heading: 'EXPLORE DIVERSE HEALTHCARE SECTORs',
    subtitle: 'One Platform. Every Healthcare Solution.',
    cards: []
  });

  React.useEffect(() => {
    fetch(`${API_URL}/healthcare-sectors`)
      .then(res => res.json())
      .then(res => {
        if (res.success) setContent(res.data);
      })
      .catch(err => console.error('Error fetching healthcare sectors:', err));
  }, []);

  const sectors = content.cards.length > 0 ? content.cards : [];

  return (
    <section
      className="relative overflow-hidden pt-[25px] pb-2 font-sans bg-[#f5f7f5]"
    >
      {/* Background decorative effects */}
      {/* Top-left dot grid */}
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: 220, height: 220,
        backgroundImage: 'radial-gradient(circle, #b6d4b8 1.2px, transparent 1.2px)',
        backgroundSize: '14px 14px',
        opacity: 0.55,
        zIndex: 0,
        pointerEvents: 'none',
      }} />
      {/* Top-right dot grid */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: 220, height: 220,
        backgroundImage: 'radial-gradient(circle, #b6d4b8 1.2px, transparent 1.2px)',
        backgroundSize: '14px 14px',
        opacity: 0.55,
        zIndex: 0,
        pointerEvents: 'none',
      }} />
      {/* Diagonal sweep lines top-right */}
      <svg style={{position:'absolute',top:0,right:0,width:260,height:260,zIndex:0,opacity:0.13,pointerEvents:'none'}} viewBox="0 0 260 260">
        {[0,18,36,54,72,90,108,126,144,162,180,198,216,234,252].map((v,i)=>(
          <line key={i} x1={260-v} y1="0" x2="260" y2={v} stroke="#2e7d32" strokeWidth="1"/>
        ))}
      </svg>

      <SectionContainer className="relative z-10">
        
        {/* ===== HEADER ===== */}
        <div className="text-center mb-3 lg:mb-5">
          <div className="flex items-center justify-center gap-3 lg:gap-4 mb-1 lg:mb-1">
            {/* Left leaf */}
            <Leaf className="text-[#2e7d32] w-6 lg:w-8 h-6 lg:h-8" />
            
            {/* Title */}
            <h2 className="font-black leading-[1.1] m-0 text-[#1a1a1a] tracking-tight" style={{ fontSize: 'clamp(22px, 4vw, 36px)' }}>
              {content.heading.split(' ').map((word, i) => (
                <React.Fragment key={i}>
                  {i > 0 && ' '}
                  <span style={{ color: (word === 'DIVERSE' || word === 'SECTORs') ? '#1b5e20' : word === 'HEALTHCARE' ? '#4caf50' : 'inherit' }}>
                    {word}
                  </span>
                </React.Fragment>
              ))}
            </h2>
            
            {/* Right leaf */}
            <Leaf className="text-[#2e7d32] w-6 lg:w-8 h-6 lg:h-8 scale-x-[-1]" />
          </div>

          {/* Subtitle row */}
          <div className="flex items-center justify-center gap-4 mb-2">
            <p className="text-[13px] lg:text-[15px] font-medium text-black tracking-wide m-0">
              {content.subtitle}
            </p>
            <div className="hidden lg:block h-[1.5px] w-8 bg-[#1b5e20] opacity-60"/>
          </div>

          {/* Decoration removed */}
        </div>

        {/* ===== CARDS GRID ===== */}
        <div className="sectors-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {sectors.map((sector, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="sector-card"
              style={{
                background: '#fff',
                borderRadius: 14,
                overflow: 'hidden',
                boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px',
                border: 'none',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              {/* Top Section: Icon & Masked Image */}
              <div style={{ height: 110, position: 'relative', display: 'flex' }}>
                {/* Left Side: Icon Container */}
                <div style={{ width: '45%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: 15, zIndex: 10 }}>
                  <div style={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 40%, #4caf50 100%)',
                    border: '4px solid #ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    transition: 'transform 0.3s ease',
                  }}
                    className="card-icon-circle"
                  >
                    <IconComponent name={sector.icon} size={28} />
                  </div>
                </div>

                {/* Right Side: Image with Curve Mask */}
                <div style={{ 
                  width: '75%', 
                  height: 105, 
                  position: 'absolute', 
                  right: 10, 
                  top: 10,
                  overflow: 'hidden',
                  borderRadius: '0 12px 0 60px'
                }}>
                  <div style={{
                    width: '100%',
                    height: '100%',
                    background: '#f0f4f0',
                  }}>
                    <img
                      src={sector.image?.startsWith('http') ? sector.image : `${SERVER_URL}${sector.image}`}
                      alt={sector.imageAlt || sector.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.6s ease',
                      }}
                      className="card-img"
                    />
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div style={{ padding: '10px 16px 16px', flexGrow: 1 }}>
                <h3 style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: '#1b5e20',
                  marginBottom: 6,
                  lineHeight: 1.2,
                  textTransform: 'uppercase',
                  letterSpacing: '0.01em',
                }}>
                  {sector.title}
                </h3>
                <p style={{
                  fontSize: 11.5,
                  color: '#333',
                  fontWeight: 500,
                  fontFamily: "'Segoe UI', sans-serif",
                  lineHeight: 1.5,
                  margin: 0,
                }}>
                  {sector.description}
                </p>
                {/* Short Accent Line */}
                <div style={{
                  marginTop: 12,
                  height: 2.5,
                  width: 28,
                  background: '#1b5e20',
                  borderRadius: 2,
                  transition: 'width 0.3s ease',
                }}
                  className="card-underline"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* ===== BOTTOM STATS BAR ===== */}
        <div className="stats-bar-container flex flex-col lg:flex-row items-stretch overflow-hidden bg-white rounded-[20px] shadow-[rgba(0,0,0,0.05)_0px_0px_0px_1px,rgb(209,213,219)_0px_0px_0px_1px_inset] mt-4 p-1 lg:p-1">
          {/* Stats items */}
          <div className="flex-1 flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-row items-center p-2 lg:pl-4 font-sans gap-2 lg:gap-0">
            {bottomStats.map((stat, i) => (
              <React.Fragment key={i}>
                <div className="flex items-center gap-4 lg:gap-3 p-3 lg:p-2 flex-1 w-full lg:w-auto">
                  <div className="w-12 lg:w-10 h-12 lg:h-10 rounded-full bg-gradient-to-br from-[#0a3d0c] via-[#1b5e20] to-[#2e7d32] flex items-center justify-center shrink-0 text-white shadow-md">
                    {React.cloneElement(stat.icon as React.ReactElement, { className: 'w-6 lg:w-5 h-6 lg:h-5', stroke: 'white', strokeWidth: 2.5 })}
                  </div>
                  <div>
                    <div className="text-[14px] lg:text-[12.5px] font-bold text-[#1b5e20] leading-tight mb-1">
                      {stat.title}
                    </div>
                    <div className="text-[12px] lg:text-[10.5px] text-slate-600 font-medium leading-tight">
                      {stat.desc}
                    </div>
                  </div>
                </div>
                {i < bottomStats.length - 1 && (
                  <div className="hidden lg:block w-[1px] h-8 border-l-[1.5px] border-dotted border-[#b0b8b0] self-center shrink-0 mx-2" />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* CTA Dark Green Box */}
          <div className="bg-[#1b5e20] px-8 lg:px-6 py-6 lg:py-4 flex flex-col items-center lg:items-start justify-center min-w-full lg:min-w-[200px] shrink-0 rounded-b-[20px] lg:rounded-none lg:rounded-r-[20px] gap-1 cursor-pointer hover:bg-[#144718] transition-colors">
            <div className="text-[14px] lg:text-[13px] font-bold text-white/90 uppercase tracking-widest leading-none mb-1">
              Explore. Connect.
            </div>
            <div className="text-[20px] lg:text-[18px] font-black text-[#86efac] flex items-center gap-3 leading-none">
              Innovate. Grow.
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#86efac" className="shrink-0">
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-5 8Z"/>
              </svg>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* Hover CSS */}
      <style>{`
        .sector-card:hover .card-img {
          transform: scale(1.08);
        }
        .sector-card:hover .card-underline {
          width: 56px !important;
          background: #2e7d32 !important;
        }
        @media (max-width: 1024px) {
          .sectors-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .sectors-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default HealthcareSectors;