import React from 'react';

const categories = [
  {
    line1: "Medical &",
    line2: "Healthcare Industry",
    color: "#f0fdf4",
    iconColor: "#15803d",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/>
        <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/>
        <circle cx="20" cy="10" r="2"/>
      </svg>
    ),
  },
  {
    line1: "Hospitals &",
    line2: "Clinical Services",
    color: "#eff6ff",
    iconColor: "#1d4ed8",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 7v4"/><path d="M14 21v-3a2 2 0 0 0-4 0v3"/><path d="M14 9h-4"/><path d="M18 11h2a2 2 0 0 1 2-2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2"/><path d="M18 21V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
  },
  {
    line1: "AYUSH &",
    line2: "Traditional Medicine",
    color: "#f7fee7",
    iconColor: "#4d7c0f",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 20h10"/>
        <path d="M10 20c5.5-2.5.8-6.4 3-10"/>
        <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/>
        <path d="M14.1 6a7 7 0 0 1 1.1 7.7c-1.5 2.9-3.9 4.4-5.7 4.8 2.3-6.2 4-9.2 4.6-12.5z"/>
      </svg>
    ),
  },
  {
    line1: "Wellness, Fitness &",
    line2: "Preventive Healthcare",
    color: "#faf5ff",
    iconColor: "#7e22ce",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="2"/>
        <path d="M12 8c-2 0-4 1.5-4 3.5 0 1.5 1 2.5 2 3l2 1 2-1c1-.5 2-1.5 2-3 0-2-2-3.5-4-3.5z"/>
        <path d="M12 15.5v5"/>
        <path d="M9 19h6"/>
      </svg>
    ),
  },
  {
    line1: "Beauty, Spa &",
    line2: "Lifestyle Solutions",
    color: "#fff1f2",
    iconColor: "#be123c",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3c-1.5 3-5 5-5 9a5 5 0 0 0 10 0c0-4-3.5-6-5-9z"/>
        <path d="M12 17v4"/>
        <path d="M9 20h6"/>
      </svg>
    ),
  },
  {
    line1: "Digital Health,",
    line2: "HealthTech & AI",
    color: "#eef2ff",
    iconColor: "#3730a3",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8"/><path d="M12 17v4"/>
        <path d="M7 8h2v5H7z"/>
        <path d="M11 10h2v3h-2z"/>
        <path d="M15 6h2v7h-2z"/>
      </svg>
    ),
  },
  {
    line1: "Medical Tourism &",
    line2: "Global Healthcare",
    color: "#ecfeff",
    iconColor: "#0891b2",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        <path d="M2 12h20"/>
      </svg>
    ),
  },
  {
    line1: "Pharmaceuticals &",
    line2: "Nutraceuticals",
    color: "#fffbeb",
    iconColor: "#b45309",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/>
        <path d="m8.5 8.5 7 7"/>
      </svg>
    ),
  },
  {
    line1: "Organic Living &",
    line2: "Sustainable Wellness",
    color: "#f0fdf4",
    iconColor: "#15803d",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
      </svg>
    ),
  },
  {
    line1: "Healthcare",
    line2: "Infrastructure & Equipment",
    color: "#eff6ff",
    iconColor: "#1d4ed8",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
        <path d="M10 11h4"/><path d="M12 9v4"/>
      </svg>
    ),
  },
  {
    line1: "Rehabilitation, Senior Care",
    line2: "& Mental Wellness",
    color: "#faf5ff",
    iconColor: "#7e22ce",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="2"/>
        <path d="M8 22v-8a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
        <path d="M16 18h4"/><path d="M18 16v4"/>
        <path d="M9 22v-4"/><path d="M15 22v-4"/>
      </svg>
    ),
  },
  {
    line1: "Women & Child",
    line2: "Healthcare",
    color: "#fff1f2",
    iconColor: "#be123c",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12h.01"/><path d="M15 12h.01"/>
        <path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"/>
        <path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5.5 4.5 1.4"/>
      </svg>
    ),
  },
  {
    line1: "Alternative Therapies &",
    line2: "Holistic Healing",
    color: "#fffbeb",
    iconColor: "#b45309",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4"/>
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
      </svg>
    ),
  },
  {
    line1: "Health Insurance &",
    line2: "Financial Wellness",
    color: "#ecfeff",
    iconColor: "#0891b2",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="m9 12 2 2 4-4"/>
      </svg>
    ),
  },
  {
    line1: "CSR, Public Health &",
    line2: "Govt. Healthcare Initiatives",
    color: "#eef2ff",
    iconColor: "#3730a3",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
];

const CategoryCard = ({ item, width = '148px' }) => (
  <div
    style={{
      width: width,
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      textAlign: 'center',
      background: '#fff',
      padding: '16px 10px 14px',
      borderRadius: '18px',
      border: '1px solid #e8edf2',
      boxShadow: '0 1px 4px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04)',
      transition: 'all 0.25s ease',
      cursor: 'pointer',
      minHeight: '148px',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = '0 14px 30px rgba(0,0,0,0.11)';
      e.currentTarget.style.borderColor = '#d0d9e8';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04)';
      e.currentTarget.style.borderColor = '#e8edf2';
    }}
  >
    <div style={{
      width: '62px',
      height: '62px',
      borderRadius: '50%',
      background: item.color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '12px',
      color: item.iconColor,
      flexShrink: 0,
    }}>
      {item.icon}
    </div>
    <div style={{
      fontSize: '10.5px',
      fontWeight: '600',
      color: '#1e293b',
      lineHeight: '1.45',
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
    }}>
      <div>{item.line1}</div>
      <div>{item.line2}</div>
    </div>
  </div>
);

const ExhibitionCategories = () => {
  const row1 = categories.slice(0, 8);
  const row2 = categories.slice(8);

  return (
    <section style={{ background: '#fff', padding: '30px 0 20px', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 20px' }}>

        {/* ── Heading ── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '18px',
          marginBottom: '28px',
        }}>
          {/* Left line + dot */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ height: '1.5px', width: '140px', background: 'linear-gradient(to right, transparent, #b0bec5)' }} />
            <div style={{
              width: '10px', height: '10px', borderRadius: '50%',
              border: '2.5px solid #0d47a1', background: '#fff', flexShrink: 0,
            }} />
          </div>

          {/* ✅ KEY FIX: "EXHIBITION" word ko alag span mein rakha with backgroundClip */}
          <h2 style={{
            fontSize: '22px',
            fontWeight: '900',
            letterSpacing: '1px',
            color: '#0f172a',
            textTransform: 'uppercase',
            margin: 0,
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
            whiteSpace: 'nowrap',
            lineHeight: 1,
          }}>
            OUR CORE{' '}
            <span style={{
              background: 'linear-gradient(135deg, #22c55e 0%, #0891b2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block', // ✅ inline-block zaroori hai gradient ke liye
            }}>
              EXHIBITION
            </span>
            {' '}CATEGORIES
          </h2>

          {/* Right dot + line */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              width: '10px', height: '10px', borderRadius: '50%',
              border: '2.5px solid #0d47a1', background: '#fff', flexShrink: 0,
            }} />
            <div style={{ height: '1.5px', width: '140px', background: 'linear-gradient(to left, transparent, #b0bec5)' }} />
          </div>
        </div>

        {/* Row 1: 8 cards */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          padding: '0 60px',
          marginBottom: '14px',
        }}>
          {row1.map((item, i) => (
            <CategoryCard key={i} item={item} width="148px" />
          ))}
        </div>

        {/* Row 2: 7 cards */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          padding: '0 60px',
        }}>
          {row2.map((item, i) => (
            <CategoryCard key={i} item={item} width="170px" />
          ))}
        </div>

      </div>
    </section>
  );
};

export default ExhibitionCategories;