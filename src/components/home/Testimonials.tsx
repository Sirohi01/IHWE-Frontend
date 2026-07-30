import React, { useState, useEffect } from 'react';
import { MapPin, Globe, Users, Activity, Sparkles, Quote } from 'lucide-react';
import { newTestimonialsApi, SERVER_URL } from '../../lib/api';
import pattern from '../../assets/pattern.webp';
import pattern1 from '../../assets/test1.webp';
import test23 from '../../assets/test23.webp';
import test24 from '../../assets/test24.webp';
import test25 from '../../assets/test25.webp';
import test26 from '../../assets/test26.webp';

const TOP_IMAGES_MAP: Record<string, any> = {
  test23, test24, test25, test26
};

const ICON_CONFIG: Record<string, any> = {
  Quote: { 
    component: Quote, 
    bg: "linear-gradient(135deg,#2f8f3a,#0b4d17)", 
    color: "#0b4d17" 
  },
  Users: { 
    component: Users, 
    bg: "linear-gradient(135deg,#0e7fa8,#0a4f6e)", 
    color: "#0a4f6e" 
  },
  Activity: { 
    component: Activity, 
    bg: "linear-gradient(135deg,#e07b2a,#b85c10)", 
    color: "#b85c10" 
  },
  Globe: { 
    component: Globe, 
    bg: "linear-gradient(135deg,#1a56b0,#0d3270)", 
    color: "#0d3270" 
  },
  Sparkles: { 
    component: Sparkles, 
    bg: "linear-gradient(135deg,#9b3db8,#5e1a7a)", 
    color: "#5e1a7a" 
  }
};

const Testimonials = () => {
  const [data, setData] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 4;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await newTestimonialsApi.get();
        if (response) {
          setData(response);
        }
      } catch (err) {
        console.error("Error fetching testimonials data:", err);
      }
    };
    fetchData();
  }, []);

  const allCards = data?.testimonials || [];
  const totalPages = Math.ceil(allCards.length / perPage) || 1;

  useEffect(() => {
    if (totalPages <= 1) return;
    const timer = setInterval(() => {
      setCurrentPage(prev => (prev + 1) % totalPages);
    }, 5000);
    return () => clearInterval(timer);
  }, [totalPages]);

  if (!data) return null;

  const currentCards = allCards
    .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
    .slice(currentPage * perPage, currentPage * perPage + perPage);

  const leftImg = data?.leftBgImage ? `${SERVER_URL}${data.leftBgImage}` : pattern1;
  const rightImg = data?.rightBgImage ? `${SERVER_URL}${data.rightBgImage}` : pattern;

  return (
    <section style={{
      background: 'white',
      padding: '0 0 10px 0',
      fontFamily: "'Montserrat', sans-serif",
      position: 'relative',
      overflow: 'hidden',
      minHeight: 'auto',
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


      {/* LEFT SLANT IMAGE - replacing SVG with pattern1.webp asset */}
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
        <img loading="lazy" decoding="async" src={leftImg} 
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
              {data.subtitle || "Testimonials"}
            </div>

            {/* Heading */}
            <div style={{
              fontSize: 'clamp(34px, 3.8vw, 48px)',
              fontWeight: 900,
              lineHeight: 1.05,
              margin: '0 0 16px',
            }}>
              {/* First Line - black */}
              <div style={{ color: 'black' }}>
                {(data.heading || 'Real Voices.<br/>Real Impact.')
                  .split(/<br\s*\/?>/i)[0]
                  .replace(/Real Impact\.?/gi, '') // Remove from black line to avoid duplication
                  .replace(/<[^>]+>/g, '')}
              </div>

              {/* Second Line - gradient */}
              <div style={{
                background: 'linear-gradient(90deg, #2f8f3a 0%, #2f8f3a 25%, #1a7a8a 50%, #1a56b0 75%, #0d3270 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                {(data.heading || 'Real Voices.<br/>Real Impact.')
                  .split(/<br\s*\/?>/i)[1]
                  ?.replace(/<[^>]+>/g, '') || 'Real Impact.'}
              </div>
            </div>

            <div style={{ height: 4, width: 58, background: '#2f8f3a', borderRadius: 10, marginBottom: 20 }} />

            <div 
              style={{ color: '#000000ff', fontSize: 15, lineHeight: 1.65, margin: 0, fontWeight: 500 }}
              className="prose prose-sm max-w-none prose-p:m-0"
              dangerouslySetInnerHTML={{ __html: data.description || 'From innovation to collaboration...' }}
            />
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
              <img loading="lazy" decoding="async" src={rightImg} alt="pattern" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
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
                <img loading="lazy" decoding="async" src={rightImg} alt="pattern" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.1 }} />
              </div>

              {/* LEFT border: big green opening quote ON the border */}
            <div style={{
  position: 'absolute',
  top: -10,
  left: -20,
  zIndex: 5,
  fontSize: 120,
  color: '#069b17ff',
  fontFamily: 'Georgia, serif',
  lineHeight: 1,
  userSelect: 'none'
}}>
  &#x201C;
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
            marginBottom: 20,
            animation: 'fadeSlide 0.5s ease both',
          }}
        >
          {currentCards.map((card: any, idx: number) => {
             const config = ICON_CONFIG[card.icon] || ICON_CONFIG.Quote;
             const Icon = config.component;

             return (
              <div key={card._id || idx} style={{
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
                    width: 86, height: 86, borderRadius: '50%',
                    flexShrink: 0,
                    marginLeft: -20,
                    marginTop: -20,
                    overflow: 'hidden',
                  }}>
                    <img loading="lazy" decoding="async" src={card.cardTopImage ? `${SERVER_URL}${card.cardTopImage}` : (TOP_IMAGES_MAP[card.icon] || test23)} 
                      alt="testimonial icon" 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        imageRendering: 'auto',
                        transform: 'translateZ(0)',
                        backfaceVisibility: 'hidden'
                      }} 
                    />
                  </div>
                <div style={{ 
                  fontSize: 84, 
                  color: config.color, 
                  fontFamily: 'Georgia, serif', 
                  lineHeight: 0.8, 
                  opacity: 0.4,
                  marginTop: -15
                }}>&ldquo;</div>
                </div>

                {/* Quote */}
                <div style={{ 
                  color: 'black', 
                  fontSize: 13.5, 
                  lineHeight: 1.72, 
                  flex: 1, 
                  marginBottom: 16, 
                  fontWeight: 500,
                  fontFamily: "'Inter', sans-serif" 
                }}>
                  " <div 
                      style={{ display: 'inline' }}
                      className="prose-p:m-0 prose-sm inline"
                      dangerouslySetInnerHTML={{ __html: card.description }}
                    /> "
                </div>

                {/* Dots */}
                <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
                  {[...Array(5)].map((_, i) => (
                    <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: '#e2e8f0' }} />
                  ))}
                </div>

                {/* Info */}
                <div style={{ marginTop: 'auto' }}>
                  <h4 style={{ 
                    color: config.color, 
                    fontSize: 13.5, 
                    fontWeight: 600, 
                    margin: '0 0 6px' 
                  }}>
                    {card.authorName}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'black', fontSize: 11, fontWeight: 600 }}>
                    <MapPin size={13} color="#2f8f3a" />
                    {card.location}
                  </div>
                </div>

                {/* Bottom-Right Organic Corner Sweep / Custom Image */}
                {card.cardBottomImage ? (
                  <img loading="lazy" decoding="async" src={`${SERVER_URL}${card.cardBottomImage}`} 
                    alt="corner" 
                    style={{ 
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      width: 240,
                      height: 240,
                      objectFit: 'contain',
                      zIndex: 1,
                      pointerEvents: 'none'
                    }} 
                  />
                ) : (
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: 65,
                    height: 65,
                    background: config.bg,
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
                       <Icon size={32} />
                    </div>
                  </div>
                )}
              </div>
             );
          })}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 0 }}>
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
        )}
      </div>

      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateX(18px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .testimonials-heading-dynamic span {
            /* Support for the span color if needed */
        }
      `}</style>
    </section>
  );
};

export default Testimonials;