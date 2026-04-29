import React from 'react';

const categories = [
  {
    title: "Medical & Healthcare Industry",
    color: "#e8f5e9",
    iconColor: "#2e7d32",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/>
        <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/>
        <circle cx="20" cy="10" r="2"/>
      </svg>
    ),
  },
  {
    title: "Hospitals & Clinical Services",
    color: "#e3f2fd",
    iconColor: "#1565c0",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 6v4"/><path d="M14 14h-4"/><path d="M14 18h-4"/><path d="M14 8h-4"/>
        <rect x="3" y="2" width="7" height="20" rx="1"/>
        <path d="M21 15V8a2 2 0 0 0-2-2h-5v16h5a2 2 0 0 0 2-2v0"/>
      </svg>
    ),
  },
  {
    title: "AYUSH & Traditional Medicine",
    color: "#f1f8e9",
    iconColor: "#33691e",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 20h10"/>
        <path d="M10 20c5.5-2.5.8-6.4 3-10"/>
        <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/>
        <path d="M14.1 6a7 7 0 0 1 1.1 7.7c-1.5 2.9-3.9 4.4-5.7 4.8 2.3-6.2 4-9.2 4.6-12.5z"/>
      </svg>
    ),
  },
  {
    title: "Wellness, Fitness & Preventive Healthcare",
    color: "#f3e5f5",
    iconColor: "#7b1fa2",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
  },
  {
    title: "Beauty, Spa & Lifestyle Solutions",
    color: "#fce4ec",
    iconColor: "#c2185b",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
        <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
      </svg>
    ),
  },
  {
    title: "Digital Health, HealthTech & AI",
    color: "#e8eaf6",
    iconColor: "#283593",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="6" height="6" rx="1"/>
        <rect x="14" y="4" width="6" height="6" rx="1"/>
        <rect x="14" y="14" width="6" height="6" rx="1"/>
        <path d="M7 14H4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1z"/>
      </svg>
    ),
  },
  {
    title: "Medical Tourism & Global Healthcare",
    color: "#e0f7fa",
    iconColor: "#00838f",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 21 4s-2 0-3.5 1.5L14 9l-8.2-1.8L4 8l6 2-2 3-4-1-1 1 3 2 2 4 1-1-1-4 3-2 2 6z"/>
      </svg>
    ),
  },
  {
    title: "Pharmaceuticals & Nutraceuticals",
    color: "#fff8e1",
    iconColor: "#ff8f00",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="m4.5 13.5 5-5 5 5"/><path d="M11.5 8.5 14 6a3.5 3.5 0 0 1 5 5l-2.5 2.5"/>
        <circle cx="17" cy="17" r="3"/><path d="m15.5 15.5 3 3"/>
      </svg>
    ),
  },
  {
    title: "Organic Living & Sustainable Wellness",
    color: "#e8f5e9",
    iconColor: "#2e7d32",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
      </svg>
    ),
  },
  {
    title: "Healthcare Infrastructure & Equipment",
    color: "#e3f2fd",
    iconColor: "#1565c0",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
  },
  {
    title: "Rehabilitation, Senior Care & Mental Wellness",
    color: "#f3e5f5",
    iconColor: "#7b1fa2",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="2"/>
        <path d="m3 22 3-8 2 3 2-6 2 6 2-3 3 8"/>
      </svg>
    ),
  },
  {
    title: "Women & Child Healthcare",
    color: "#fce4ec",
    iconColor: "#c2185b",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12h.01"/><path d="M15 12h.01"/>
        <path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"/>
        <path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5.5 4.5 1.4"/>
      </svg>
    ),
  },
  {
    title: "Alternative Therapies & Holistic Healing",
    color: "#fff8e1",
    iconColor: "#ff8f00",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4"/>
        <path d="M12 2v2"/><path d="M12 20v2"/>
        <path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/>
        <path d="M2 12h2"/><path d="M20 12h2"/>
        <path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
      </svg>
    ),
  },
  {
    title: "Health Insurance & Financial Wellness",
    color: "#e0f7fa",
    iconColor: "#00838f",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
        <path d="m9 12 2 2 4-4"/>
      </svg>
    ),
  },
  {
    title: "CSR, Public Health & Government Healthcare Initiatives",
    color: "#e8eaf6",
    iconColor: "#283593",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
        <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66"/>
        <path d="m18 15-2-2"/><path d="m15 18-2-2"/>
      </svg>
    ),
  },
];

const ExhibitionCategories = () => {
  return (
    <section style={{ background: '#fff', padding: '40px 48px 10px 48px', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1500px', margin: '0 auto' }}>

        {/* Section Title */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ height: '1.5px', width: '140px', background: '#e0e0e0' }} />
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#0d47a1', flexShrink: 0 }} />
          </div>

          <h2 style={{
            fontSize: '18px',
            fontWeight: '800',
            letterSpacing: '0.5px',
            color: '#071c3d',
            whiteSpace: 'nowrap',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            OUR CORE{' '}
            <span style={{
              background: 'linear-gradient(90deg, #2f8f3a, #0d47a1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              EXHIBITION
            </span>{' '}
            CATEGORIES
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#0d47a1', flexShrink: 0 }} />
            <div style={{ height: '1.5px', width: '140px', background: '#e0e0e0' }} />
          </div>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: '12px',
        }}>
          {categories.map((item, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                background: '#fff',
                padding: '16px 10px',
                borderRadius: '16px',
                border: '1px solid #f0f0f0',
                boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px',
                transition: 'box-shadow 0.2s, transform 0.2s',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Icon Circle */}
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background: item.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '10px',
                color: item.iconColor,
                flexShrink: 0,
              }}>
                {item.icon}
              </div>

              {/* Title */}
              <p style={{
                fontSize: '11px',
                fontWeight: '600',
                color: '#071c3d',
                lineHeight: '1.4',
                margin: 0,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}>
                {item.title}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ExhibitionCategories;