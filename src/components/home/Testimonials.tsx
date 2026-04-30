import React, { useState, useEffect } from 'react';
import { Leaf, MapPin, Plus, Globe, Users, Activity, Sparkles, Heart } from 'lucide-react';
import pattern from '../../assets/pattern.png';
import pattern1 from '../../assets/pattern1.png';

const Testimonials = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 2;
  const perPage = 4;

  const allCards = [
    {
      icon: "https://cdn-icons-png.flaticon.com/512/1048/1048953.png",
      bg: "linear-gradient(135deg,#2f8f3a,#0b4d17)",
      quote: "IHWE brings the right people, ideas, and innovations together under one roof. It's the future of global health and wellness.",
      company: "Global Wellness Institute",
      location: "Washington, USA",
      iconType: "leaf"
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/2920/2920244.png",
      bg: "linear-gradient(135deg,#0e7fa8,#0a4f6e)",
      quote: "An exceptional platform to connect, collaborate, and create meaningful impact in healthcare.",
      company: "Apollo Hospitals",
      location: "New Delhi, India",
      iconType: "plus"
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/740/740881.png",
      bg: "linear-gradient(135deg,#1a56b0,#0d3270)",
      quote: "The quality of exhibitors and knowledge exchange at IHWE is unmatched. A must-attend global event.",
      company: "Health & Wellness Solutions Group",
      location: "London, United Kingdom",
      iconType: "plus"
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/1998/1998614.png",
      bg: "linear-gradient(135deg,#7ab83e,#4a8c1c)",
      quote: "IHWE is where innovation meets opportunity. It's truly shaping a healthier and more sustainable tomorrow.",
      company: "Wellness Frontier",
      location: "Singapore",
      iconType: "leaf"
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/3209/3209072.png",
      bg: "linear-gradient(135deg,#e07b2a,#b85c10)",
      quote: "A game-changing event for the organic wellness industry. We forged partnerships that will last decades.",
      company: "NatureCure International",
      location: "Dubai, UAE",
      iconType: "leaf"
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/2966/2966327.png",
      bg: "linear-gradient(135deg,#9b3db8,#5e1a7a)",
      quote: "The sessions at IHWE redefined how we approach integrative medicine. Absolutely world-class.",
      company: "MediWell Research",
      location: "Toronto, Canada",
      iconType: "plus"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPage(prev => (prev + 1) % totalPages);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentCards = allCards.slice(currentPage * perPage, currentPage * perPage + perPage);

  const LeafIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
    </svg>
  );

  const PlusIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19"/>
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  );

  const PinIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );

  const GreenLeafIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2f8f3a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
    </svg>
  );

  // World map SVG dots pattern inline
  const WorldMapPattern = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 900 500"
      style={{ width: '100%', height: '100%' }}
      opacity="0.18"
    >
      {/* Simplified world map dot pattern */}
      {[
        // North America
        "180,80 200,75 220,72 240,70 260,68 280,70 300,72 320,75 340,78 360,82 180,95 200,92 220,90 240,88 260,86 280,88 300,90 320,92 340,95 360,98 180,110 200,108 220,106 240,104 260,102 280,104 300,106 320,108 200,125 220,122 240,120 260,118 280,120 300,122 220,140 240,138 260,136 280,138",
        // Europe
        "460,70 480,68 500,66 520,68 540,70 460,85 480,83 500,81 520,83 540,85 460,100 480,98 500,96 520,98 540,100 470,115 490,113 510,111 530,113",
        // Africa
        "470,130 490,128 510,126 530,128 470,145 490,143 510,141 530,143 470,160 490,158 510,156 530,158 470,175 490,173 510,171 530,173 480,190 500,188 520,186 500,205",
        // Asia
        "560,60 580,58 600,56 620,58 640,60 660,62 680,64 700,66 560,75 580,73 600,71 620,73 640,75 660,77 680,79 700,81 560,90 580,88 600,86 620,88 640,90 660,92 680,94 700,96 580,105 600,103 620,105 640,107 660,109 680,111 600,120 620,122 640,124 660,126",
        // Australia
        "660,200 680,198 700,196 720,198 740,200 660,215 680,213 700,211 720,213 740,215 670,230 690,228 710,226 730,228",
        // South America
        "260,160 280,158 300,156 320,158 260,175 280,173 300,171 320,173 260,190 280,188 300,186 280,205 300,203 290,220",
      ].map((group, gi) =>
        group.split(' ').map((pt, pi) => {
          const [x, y] = pt.split(',').map(Number);
          return <circle key={`${gi}-${pi}`} cx={x} cy={y} r="3" fill="#2f8f3a" />;
        })
      )}
    </svg>
  );

  return (
    <section style={{
      background: 'white',
      padding: '0 0 50px 0',
      fontFamily: "'Montserrat', sans-serif",
      position: 'relative',
      overflow: 'hidden',
      minHeight: 700,
    }}>

      {/* Dot background - top right */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: '55%', height: '65%',
        backgroundImage: 'radial-gradient(circle, #a8d5b5 1.2px, transparent 1.2px)',
        backgroundSize: '22px 22px',
        opacity: 0.35,
        pointerEvents: 'none',
        maskImage: 'radial-gradient(ellipse 85% 85% at 90% 10%, black 30%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 90% 10%, black 30%, transparent 100%)',
      }} />


      {/* LEFT SLANT IMAGE - replacing SVG with pattern1.png asset */}
      <div style={{
        position: 'absolute',
        top: -20,
        left: -60,
        width: 480,
        height: 430,
        overflow: 'hidden',
        zIndex: 0,
        pointerEvents: 'none',
        transform: 'rotate(-5deg)',
        transformOrigin: 'top left',
      }}>
        <img 
          src={pattern1} 
          alt="decorative pattern" 
          style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'left top' }} 
        />
      </div>

      {/* TOP ROW: Slant left + Content right */}
      <div style={{ display: 'flex', alignItems: 'stretch', marginBottom: 48, minHeight: 320 }}>

        {/* LEFT: Spacer for slant area */}
        <div style={{ width: 220, flexShrink: 0 }} />

        {/* RIGHT: Title + quote card */}
        <div style={{
          flex: 1,
          display: 'flex',
          gap: 40,
          alignItems: 'flex-start',
          paddingTop: 52,
          paddingRight: 40,
          position: 'relative',
          zIndex: 1,
        }}>

          {/* Title Block */}
          <div style={{ flex: '0 0 auto', maxWidth: 480 }}>
            {/* Label */}
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6,
              color: '#2f8f3a', fontWeight: 700, letterSpacing: '0.32em',
              fontSize: 13, textTransform: 'uppercase', marginBottom: 12,
            }}>
              <svg width="65" height="24" viewBox="0 0 48 20" style={{ marginLeft: 2 }}>
                <polyline points="0,10 8,10 12,2 16,18 20,2 24,18 28,10 48,10"
                  fill="none" stroke="#2f8f3a" strokeWidth="2.8"/>
              </svg>
              Testimonials
            </div>

            {/* Heading */}
            <h2 style={{
              fontSize: 'clamp(34px, 3.8vw, 48px)',
              fontWeight: 900,
              lineHeight: 1.05,
              margin: '0 0 16px',
              color: 'black',
            }}>
              Real Voices.<br/>
              <span style={{
                color: '#0e5fa8',
              }}>
                Real
              </span>{' '}
              <span style={{
                background: 'linear-gradient(to right, #1a3a6e, #0e5fa8, #1a7bd4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Impact.
              </span>
            </h2>

            <div style={{ height: 4, width: 58, background: '#2f8f3a', borderRadius: 10, marginBottom: 20 }} />

            <p style={{ color: '#000000ff', fontSize: 15, lineHeight: 1.65, margin: 0, fontWeight: 500 }}>
              From innovation to collaboration, our global community shares how{' '}
              <strong style={{ color: '#0b4d17' }}>IHWE</strong>{' '}
              is driving meaningful connections, advancing healthcare, and building a healthier future for all.
            </p>
          </div>

          {/* Featured Quote Card with World Map background */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', paddingRight: 270, position: 'relative' }}>
            {/* Custom Pattern Image (Top-Right) */}
            <div style={{
              position: 'absolute',
              top: -140,
              right: -150,
              width: 700,
              height: 500,
              zIndex: 0,
              pointerEvents: 'none',
              opacity: 0.6,
            }}>
              <img src={pattern} alt="pattern" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>

            {/* Faint Heartbeat Line to the right of card */}
            <div style={{
              position: 'absolute',
              right: 10,
              top: '60%',
              transform: 'translateY(-50%)',
              opacity: 0.25,
              zIndex: 0,
              pointerEvents: 'none'
            }}>
              <svg width="220" height="80" viewBox="0 0 120 40">
                <polyline points="0,20 40,20 50,5 60,35 70,20 120,20"
                  fill="none" stroke="#2f8f3a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              borderRadius: '14px 0 0 14px',
              padding: '24px 30px 24px',
              maxWidth: 380,
              width: '100%',
              position: 'relative',
              boxShadow: '-12px 10px 25px rgba(0,0,0,0.08)',
              borderLeft: '1.5px solid rgba(47, 143, 58, 0.3)',
              borderTop: '1.5px solid rgba(47, 143, 58, 0.3)',
              borderBottom: '1.5px solid rgba(47, 143, 58, 0.3)',
              borderRight: 'none',
              overflow: 'visible'
            }}>

              {/* World Map background inside card */}
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                zIndex: 0,
                pointerEvents: 'none',
              }}>
                <img src={pattern} alt="pattern" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.1 }} />
              </div>

              {/* LEFT border: big green opening quote ON the border */}
            <div style={{
  position: 'absolute',
top: -60,
  left: -35,
  zIndex: 5,
  fontSize: 130,
  color: '#2f8f3a',
  fontFamily: 'Georgia, serif',
  lineHeight: 1,
  fontWeight: 400,
transform: 'rotate(180deg) scaleX(-1)',
  userSelect: 'none'
}}>
  “
</div>
              {/* BOTTOM-RIGHT corner: big blue closing quote ON the border */}
           <div style={{
  position: 'absolute',
  bottom: -10,
  right: 10,
  zIndex: 5,
  fontSize: 90,
  color: '#1a56b0',
  fontFamily: 'Georgia, serif',
  lineHeight: 1,
  fontWeight: 900,
  userSelect: 'none'
}}>
  ”
</div>

              {/* BOTTOM-LEFT corner: leaf on border */}
              <div style={{
                position: 'absolute',
                bottom: -18,
                left: -15,
                zIndex: 4,
              }}>
                <svg width="52" height="52" viewBox="0 0 52 52">
                  {/* Two overlapping leaves like image */}
                  <g transform="rotate(-30, 26, 26)">
                    <path d="M26 46 A18 18 0 0 1 20 12 C34 10 38 8 42 2 c2 5 4 11 4 20 0 13-10 24-20 24z"
                      fill="#2f8f3a" opacity="0.85"/>
                    <path d="M4 48 c0-10 5-17 13-20 6-2 12-6 15-9" fill="none" stroke="#2f8f3a" strokeWidth="1.5" strokeLinecap="round"/>
                  </g>
                  <g transform="rotate(-55, 22, 30) translate(2, 4)">
                    <path d="M22 44 A15 15 0 0 1 17 13 C29 11 33 9 37 4 c2 4 3 9 3 17 0 11-9 23-18 23z"
                      fill="#7ab83e" opacity="0.7"/>
                  </g>
                </svg>
              </div>

              {/* Content - z-index above map */}
              <div style={{ position: 'relative', zIndex: 1, paddingTop: 8 }}>
                <p style={{ color: '#1a2e1c', fontSize: 17, fontWeight: 700, lineHeight: 1.5, marginBottom: 6, marginTop: 0 }}>
                  Where{' '}
                  <span style={{ color: '#2f8f3a' }}>global collaboration</span>
                </p>
                <p style={{ color: '#1a2e1c', fontSize: 17, fontWeight: 700, lineHeight: 1.5, marginBottom: 16, marginTop: 0 }}>
                  meets{' '}
                  <span style={{ color: '#0e5fa8' }}>meaningful change.</span>
                </p>

                <div style={{ 
                  color: '#000000ff', 
                  fontSize: 13.5, 
                  lineHeight: 1.7, 
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '2px'
                }}>
                  <span>IHWE brings together brilliant minds,</span>
                  <span>breakthrough ideas, and boundless opportunities —under one roof.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CARDS + PAGINATION */}
      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>

        {/* CARDS GRID */}
        <div
          key={currentPage}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 18,
            marginBottom: 36,
            animation: 'fadeSlide 0.5s ease both',
          }}
        >
          {currentCards.map((card, idx) => (
            <div key={idx} style={{
              background: 'white',
              borderRadius: 22,
              padding: '24px 20px',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
              display: 'flex', flexDirection: 'column',
              minHeight: 250,
              border: '1px solid #f1f5f9',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}>
              {/* Card Top */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                {/* Circular Icon with White Border */}
                <div style={{
                  width: 72, height: 72, borderRadius: '50%',
                  background: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                  border: '2px solid #f1f5f9',
                  flexShrink: 0,
                  marginLeft: -15,
                  marginTop: -15,
                }}>
                  <div style={{
                    width: 60, height: 60, borderRadius: '50%',
                    background: card.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                  }}>
                    {idx % 4 === 0 && <Users size={34} color="white" />}
                    {idx % 4 === 1 && <Activity size={34} color="white" />}
                    {idx % 4 === 2 && <Globe size={34} color="white" />}
                    {idx % 4 === 3 && <Sparkles size={34} color="white" />}
                  </div>
                </div>
                <div style={{ 
                  fontSize: 84, 
                  color: card.bg.includes('rgba') ? '#2f8f3a' : card.bg.split(',')[1] || '#0b4d17', 
                  fontFamily: 'Georgia, serif', 
                  lineHeight: 0.8, 
                  opacity: 1,
                  marginTop: -15
                }}>"</div>
              </div>

              {/* Quote */}
              <p style={{ 
                color: 'black', 
                fontSize: 13.5, 
                lineHeight: 1.72, 
                flex: 1, 
                marginBottom: 16, 
                fontWeight: 500,
                fontFamily: "'Inter', sans-serif" 
              }}>
                "{card.quote}"
              </p>

              {/* Dots */}
              <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
                {[...Array(5)].map((_, i) => (
                  <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: '#e2e8f0' }} />
                ))}
              </div>

              {/* Info */}
              <div style={{ marginTop: 'auto' }}>
                <h4 style={{ 
                  color: card.bg.includes('rgba') ? 'inherit' : card.bg.split(',')[1] || '#0b4d17', 
                  fontSize: 13.5, 
                  fontWeight: 600, 
                  margin: '0 0 6px' 
                }}>
                  {card.company}
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'black', fontSize: 11, fontWeight: 600 }}>
                  <MapPin size={13} color="#2f8f3a" />
                  {card.location}
                </div>
              </div>

              {/* Bottom-Right Organic Corner Sweep */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: 65,
                height: 65,
                background: card.bg,
                borderRadius: '100% 0 12px 0',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                padding: '0 8px 8px 0',
                zIndex: 1,
                boxShadow: '-4px -4px 15px rgba(0,0,0,0.05)',
                opacity: 0.95
              }}>
                <div style={{ color: 'white', display: 'flex', opacity: 1 }}>
                   {idx % 4 === 0 && <Users size={32} />}
                   {idx % 4 === 1 && <Activity size={32} />}
                   {idx % 4 === 2 && <Globe size={32} />}
                   {idx % 4 === 3 && <Sparkles size={32} />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 10 }}>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.3s ease',
                background: i === currentPage ? '#2f8f3a' : '#d1d5db',
                transform: i === currentPage ? 'scale(1.2)' : 'scale(1)',
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateX(18px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;