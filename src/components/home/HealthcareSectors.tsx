import React from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Pill, 
  Building2, 
  Microscope, 
  Cpu, 
  Heart, 
  Leaf, 
  FlaskConical, 
  ShoppingBasket, 
  Dumbbell,
  Award,
  Users,
  Lightbulb,
  Handshake
} from 'lucide-react';

const sectors = [
  {
    title: "MEDICAL DEVICES",
    desc: "Advanced equipment and technology for better outcomes.",
    icon: <Activity className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=400"
  },
  {
    title: "PHARMA & NUTRACEUTICALS",
    desc: "Innovative medicines, supplements and nutritional solutions.",
    icon: <Pill className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?auto=format&fit=crop&q=80&w=400"
  },
  {
    title: "HOSPITAL & INFRASTRUCTURE",
    desc: "Smart infrastructure and solutions for modern healthcare facilities.",
    icon: <Building2 className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=400"
  },
  {
    title: "DIAGNOSTICS",
    desc: "Cutting-edge diagnostic technologies for accurate and early detection.",
    icon: <Microscope className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1579152276503-31649983949b?auto=format&fit=crop&q=80&w=400"
  },
  {
    title: "HEALTHTECH & DIGITAL HEALTH",
    desc: "Digital solutions transforming care delivery and patient experience.",
    icon: <Cpu className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1576091160550-2173dad99901?auto=format&fit=crop&q=80&w=400"
  },
  {
    title: "WELLNESS & REHABILITATION",
    desc: "Products and programs for holistic well-being and faster recovery.",
    icon: <Heart className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400"
  },
  {
    title: "AYURVEDA & HERBAL",
    desc: "Time-tested natural therapies for a healthier tomorrow.",
    icon: <Leaf className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=400"
  },
  {
    title: "BEAUTY & PERSONAL CARE",
    desc: "Innovative beauty and personal care solutions for all.",
    icon: <FlaskConical className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=400"
  },
  {
    title: "ORGANIC & NATURAL PRODUCTS",
    desc: "Pure, organic and sustainable products for a better lifestyle.",
    icon: <ShoppingBasket className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400"
  },
  {
    title: "FITNESS & LIFESTYLE",
    desc: "Fitness equipment, supplements and lifestyle solutions for an active life.",
    icon: <Dumbbell className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=400"
  }
];

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
  return (
    <section
      style={{
        background: '#f5f7f5',
        position: 'relative',
        overflow: 'hidden',
        padding: '45px 24px 0',
        fontFamily: "'Segoe UI', sans-serif",
      }}
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

      <div style={{maxWidth: 1700, margin: '0 auto', position: 'relative', zIndex: 1}}>
        
        {/* ===== HEADER ===== */}
        <div style={{textAlign: 'center', marginBottom: 20}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 8}}>
            {/* Left leaf */}
            <svg width="34" height="34" viewBox="0 0 24 24" fill="#2e7d32" style={{opacity:0.85}}>
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-5 8Z"/>
            </svg>
            
            {/* Title */}
            <h2 style={{
              fontSize: 'clamp(22px, 3vw, 38px)',
              fontWeight: 900,
              letterSpacing: '-0.5px',
              margin: 0,
              lineHeight: 1.1,
              color: '#1a1a1a',
            }}>
              EXPLORE{' '}
              <span style={{ color: '#1b5e20' }}>DIVERSE</span>{' '}
              <span style={{ color: '#4caf50' }}>HEALTHCARE</span>{' '}
              <span style={{ color: '#1b5e20' }}>SECTORS</span>
            </h2>
            
            {/* Right leaf */}
            <svg width="34" height="34" viewBox="0 0 24 24" fill="#2e7d32" style={{opacity:0.85, transform:'scaleX(-1)'}}>
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-5 8Z"/>
            </svg>
          </div>

          {/* Subtitle row */}
          <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap: 15, marginBottom: 6}}>
            {/* Left underline removed */}
            <p style={{
              fontSize: 15,
              fontWeight: 400,
              color: '#000000',
              letterSpacing: '0.03em',
              margin: 0,
            }}>
              One Platform. Every Healthcare Solution.
            </p>
            <div style={{height: 1.5, width: 30, background: '#1b5e20', opacity: 0.6}}/>
          </div>

          {/* Small leaf center with longer gradient lines */}
          <div style={{display:'flex', alignItems: 'center', justifyContent:'center', gap: 12, marginTop: 2}}>
            <div style={{
              height: 1.2, 
              width: 120, 
              background: 'linear-gradient(to left, #1b5e20, transparent)', 
              opacity: 0.4 
            }}/>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#2e7d32">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-5 8Z"/>
            </svg>
            <div style={{
              height: 1.2, 
              width: 120, 
              background: 'linear-gradient(to right, #1b5e20, transparent)', 
              opacity: 0.4 
            }}/>
          </div>
        </div>

        {/* ===== CARDS GRID ===== */}
        <div className="sectors-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '16px',
          padding: '0 40px',
        }}>
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
              <div style={{ height: 125, position: 'relative', display: 'flex' }}>
                {/* Left Side: Icon Container */}
                <div style={{ width: '45%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: 15, zIndex: 10 }}>
                  <div style={{
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 40%, #4caf50 100%)',
                    border: '5px solid #ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    transition: 'transform 0.3s ease',
                  }}
                    className="card-icon-circle"
                  >
                    {React.cloneElement(sector.icon as React.ReactElement, { className: 'w-8 h-8' })}
                  </div>
                </div>

                {/* Right Side: Image with Curve Mask */}
                <div style={{ 
                  width: '75%', 
                  height: 120, 
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
                      src={sector.image}
                      alt={sector.title}
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
              <div style={{ padding: '12px 20px 20px', flexGrow: 1 }}>
                <h3 style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#1b5e20',
                  marginBottom: 8,
                  lineHeight: 1.2,
                  textTransform: 'uppercase',
                  letterSpacing: '0.01em',
                }}>
                  {sector.title}
                </h3>
                <p style={{
                  fontSize: 12,
                  color: '#333',
                  fontWeight: 500,
                  fontFamily: "'Segoe UI', sans-serif",
                  lineHeight: 1.6,
                  margin: 0,
                }}>
                  {sector.desc}
                </p>
                {/* Short Accent Line */}
                <div style={{
                  marginTop: 14,
                  height: 3,
                  width: 32,
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
        <div style={{
          marginTop: 24,
          marginInline: 40,
          background: '#fff',
          borderRadius: 20,
          boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset',
          display: 'flex',
          alignItems: 'stretch',
          overflow: 'hidden',
          padding: '4px',
        }}>
          {/* Stats items */}
          <div style={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            paddingLeft: 8,
            fontFamily: "'Segoe UI', sans-serif",
            flexWrap: 'nowrap',
            minWidth: 0
          }}>
            {bottomStats.map((stat, i) => (
              <React.Fragment key={i}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 10px',
                  flex: 1,
                  minWidth: 0
                }}>
                  <div style={{
                    width: 42,
                    height: 42,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #0a3d0c 0%, #1b5e20 60%, #2e7d32 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: '#fff',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}>
                    {React.cloneElement(stat.icon as React.ReactElement, { className: 'w-5 h-5', stroke: 'white', strokeWidth: 2.5 })}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{
                      fontSize: 12.5, 
                      fontWeight: 700, 
                      color: '#1b5e20', 
                      marginBottom: 1,
                      lineHeight: 1.2
                    }}>
                      {stat.title}
                    </div>
                    <div style={{
                      fontSize: 10.5, 
                      color: '#444', 
                      fontWeight: 500, 
                      lineHeight: 1.2,
                    }}>
                      {stat.desc}
                    </div>
                  </div>
                </div>
                {i < bottomStats.length - 1 && (
                  <div style={{ width: 1, height: 32, borderLeft: '1.5px dotted #b0b8b0', alignSelf: 'center', flexShrink: 0 }} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* CTA Dark Green Box */}
          <div style={{
            background: '#1b5e20',
            padding: '12px 25px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            minWidth: 180,
            flexShrink: 0,
            borderRadius: '0 20px 20px 0',
            gap: 2,
            cursor: 'pointer',
          }}>
            <div style={{fontSize: 14, fontWeight: 700, color: '#fff', lineHeight: 1.1}}>
              Explore. Connect.
            </div>
            <div style={{
              fontSize: 17,
              fontWeight: 800,
              lineHeight: 1.1,
              color: '#86efac',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}>
              Innovate. Grow.
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#86efac" style={{flexShrink:0}}>
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-5 8Z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Hover CSS */}
      <style>{`
        .sector-card:hover .card-img {
          transform: scale(1.08);
        }
        .sector-card:hover .card-underline {
          width: 56px !important;
          background: #2e7d32 !important;
        }
        @media (max-width: 1200px) {
          .sectors-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .sectors-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .sectors-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default HealthcareSectors;