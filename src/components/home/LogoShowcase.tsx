import React from 'react';
import SectionContainer from '../layout/SectionContainer';

const LogoShowcase = () => {
  return (
    <section className="bg-white pt-4 pb-12 relative z-10" style={{ fontFamily: "'Inter', sans-serif" }}>
      <SectionContainer>
        
        {/* ===== 3-COLUMN GRID LAYOUT WITH DESKTOP VERTICAL / MOBILE HORIZONTAL DIVIDERS ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start divide-y md:divide-y-0 md:divide-x divide-slate-300">
          
          {/* ─── COLUMN 1: KNOWLEDGE PARTNERS (LEFT) ─── */}
          <div className="flex flex-col items-center px-4 pb-6 md:pb-0">
            <h3 className="font-bold text-[11px] lg:text-[13px] tracking-[0.15em] lg:tracking-[0.2em] uppercase text-[#012112] text-center mb-6">
              Knowledge Partners
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {[
                { src: "/knowledge1.png", alt: "Knowledge Partner 1" },
                { src: "/knowledge2.png", alt: "Knowledge Partner 2" },
                { src: "/knowledge3.png", alt: "Knowledge Partner 3" }
              ].map((logo, idx, arr) => (
                <React.Fragment key={idx}>
                  <div className="transition-transform duration-300 hover:-translate-y-1 flex items-center justify-center">
                    <img 
                      src={logo.src} 
                      alt={logo.alt} 
                      className="h-12 md:h-14 lg:h-16 w-auto max-w-[100px] md:max-w-[120px] lg:max-w-[140px] object-contain transition-all duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          `https://placehold.co/100x60/ffffff/888?text=${encodeURIComponent(logo.alt)}`;
                      }}
                    />
                  </div>
                  {idx < arr.length - 1 && (
                    <div className="h-10 w-px bg-slate-300 hidden sm:block self-center" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* ─── COLUMN 2: HEALTHCARE PARTNER (CENTER) ─── */}
          <div className="flex flex-col items-center px-4 py-6 md:py-0">
            <h3 className="font-bold text-[11px] lg:text-[13px] tracking-[0.15em] lg:tracking-[0.2em] uppercase text-[#012112] text-center mb-6">
              Healthcare Partner
            </h3>
            <div className="flex items-center justify-center">
              <div className="transition-transform duration-300 hover:-translate-y-1 flex items-center justify-center">
                <img 
                  src="/health.png" 
                  alt="Healthcare Partner" 
                  className="h-18 md:h-22 lg:h-26 w-auto max-w-[140px] md:max-w-[180px] lg:max-w-[200px] object-contain transition-all duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      `https://placehold.co/140x80/ffffff/888?text=Healthcare+Partner`;
                  }}
                />
              </div>
            </div>
          </div>

          {/* ─── COLUMN 3: SUPPORTING ASSOCIATION (RIGHT) ─── */}
          <div className="flex flex-col items-center px-4 pt-6 md:pt-0">
            <h3 className="font-bold text-[11px] lg:text-[13px] tracking-[0.15em] lg:tracking-[0.2em] uppercase text-[#012112] text-center mb-6">
              Supporting Association
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {[
                { src: "/Supporting.png", alt: "Supporting Association 1" },
                { src: "/Supporting%20Association%20(2).webp", alt: "Supporting Association 2" }
              ].map((logo, idx, arr) => (
                <React.Fragment key={idx}>
                  <div className="transition-transform duration-300 hover:-translate-y-1 flex items-center justify-center">
                    <img 
                      src={logo.src} 
                      alt={logo.alt} 
                      className="h-12 md:h-14 lg:h-16 w-auto max-w-[100px] md:max-w-[120px] lg:max-w-[140px] object-contain transition-all duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          `https://placehold.co/100x60/ffffff/888?text=${encodeURIComponent(logo.alt)}`;
                      }}
                    />
                  </div>
                  {idx < arr.length - 1 && (
                    <div className="h-10 w-px bg-slate-300 hidden sm:block self-center" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

        </div>

      </SectionContainer>
    </section>
  );
};

export default LogoShowcase;
