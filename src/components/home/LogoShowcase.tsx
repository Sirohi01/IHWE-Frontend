import React, { useState, useEffect } from 'react';
import SectionContainer from '../layout/SectionContainer';
import Marquee from 'react-fast-marquee';
import axios from 'axios';
import { API_URL, SERVER_URL } from '../../lib/api';

const LogoShowcase = () => {
  const [knowledgePartners, setKnowledgePartners] = useState<any[]>([
    { logo: "/aa3.png", name: "Knowledge Partner 1" },
    { logo: "/knowledge2.png", name: "Knowledge Partner 2" },
    { logo: "/knowledge3.png", name: "Knowledge Partner 3" }
  ]);
  const [healthcarePartners, setHealthcarePartners] = useState<any[]>([
    { logo: "/health1.png", name: "Healthcare Partner 1" },
    { logo: "/applog.jpeg", name: "Healthcare Partner 2" },
    { logo: "/forlog.png", name: "Healthcare Partner 3" }
  ]);
  const [supportingAssociations, setSupportingAssociations] = useState<any[]>([
    { logo: "/aa2.png", name: "Supporting Association 3" },
    { logo: "/health.png", name: "Healthcare Partner" },
    { logo: "/Supporting.png", name: "Supporting Association 1" },
    { logo: "/Supporting Association (2).webp", name: "Supporting Association 2" }
  ]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await axios.get(`${API_URL}/partners`);
        if (response.data.success) {
          const groups = response.data.data;
          
          const getPartnersBySubheading = (sub: string) => {
             const group = groups.find((g: any) => g.subheading && g.subheading.toLowerCase().includes(sub));
             return group && group.partners && group.partners.length > 0 ? group.partners : null;
          };

          const kp = getPartnersBySubheading('knowledge');
          const hp = getPartnersBySubheading('healthcare');
          const sa = getPartnersBySubheading('supporting');

          if (kp) setKnowledgePartners(kp);
          if (hp) setHealthcarePartners(hp);
          if (sa) setSupportingAssociations(sa);
        }
      } catch (error) {
        console.error('Error fetching partners for LogoShowcase:', error);
      }
    };
    fetchPartners();
  }, []);

  const getImageUrl = (partner: any) => {
      const path = partner.logo;
      if (!path) return `https://placehold.co/100x60/ffffff/888?text=${encodeURIComponent(partner.name || 'Logo')}`;
      if (path.startsWith('http')) return path;
      if (path.startsWith('/uploads/')) return `${SERVER_URL}${path}`;
      if (path.startsWith('uploads/')) return `${SERVER_URL}/${path}`;
      return path; // Fallback for public images starting with /
  };

  return (
    <section className="bg-white pt-4 pb-6 relative z-10" style={{ fontFamily: "'Inter', sans-serif" }}>
      <SectionContainer>
        
        {/* ===== 3-COLUMN GRID LAYOUT WITH DESKTOP VERTICAL / MOBILE HORIZONTAL DIVIDERS ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start divide-y md:divide-y-0 md:divide-x divide-slate-300">
          
          {/* ─── COLUMN 1: KNOWLEDGE PARTNERS (LEFT) ─── */}
          <div className="flex flex-col items-center px-4 pb-6 md:pb-0">
            <h3 className="font-bold text-[11px] lg:text-[13px] tracking-[0.15em] lg:tracking-[0.2em] uppercase text-[#012112] text-center mb-6">
              Knowledge Partners
            </h3>
            <div className="w-full overflow-hidden">
              <Marquee speed={30} direction="right" gradient={false} pauseOnHover={true}>
                {knowledgePartners.map((partner, idx) => (
                  <div key={idx} className="mx-6 md:mx-8 lg:mx-10 transition-transform duration-300 hover:-translate-y-1 flex items-center justify-center">
                    <img loading="lazy" decoding="async" src={getImageUrl(partner)} 
                      alt={partner.name || partner.imageAlt || 'Knowledge Partner'} 
                      title={partner.name || partner.imageAlt || 'Knowledge Partner'}
                      className="h-12 md:h-14 lg:h-16 w-auto max-w-[100px] md:max-w-[120px] lg:max-w-[140px] object-contain transition-all duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          `https://placehold.co/100x60/ffffff/888?text=${encodeURIComponent(partner.name || 'Logo')}`;
                      }}
                    />
                  </div>
                ))}
              </Marquee>
            </div>
          </div>

          {/* ─── COLUMN 2: HEALTHCARE PARTNER (CENTER) ─── */}
          <div className="flex flex-col items-center px-4 py-6 md:py-0">
            <h3 className="font-bold text-[11px] lg:text-[13px] tracking-[0.15em] lg:tracking-[0.2em] uppercase text-[#012112] text-center mb-6">
              Healthcare Partner
            </h3>
            <div className="w-full overflow-hidden">
              <Marquee speed={30} direction="right" gradient={false} pauseOnHover={true}>
                {healthcarePartners.map((partner, idx) => (
                  <div key={idx} className="mx-6 md:mx-8 lg:mx-10 transition-transform duration-300 hover:-translate-y-1 flex items-center justify-center">
                    <img loading="lazy" decoding="async" src={getImageUrl(partner)} 
                      alt={partner.name || partner.imageAlt || 'Healthcare Partner'} 
                      title={partner.name || partner.imageAlt || 'Healthcare Partner'}
                      className="h-12 md:h-14 lg:h-16 w-auto max-w-[100px] md:max-w-[120px] lg:max-w-[140px] object-contain transition-all duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          `https://placehold.co/100x60/ffffff/888?text=${encodeURIComponent(partner.name || 'Logo')}`;
                      }}
                    />
                  </div>
                ))}
              </Marquee>
            </div>
          </div>

          {/* ─── COLUMN 3: SUPPORTING ASSOCIATION (RIGHT) ─── */}
          <div className="flex flex-col items-center px-4 pt-6 md:pt-0">
            <h3 className="font-bold text-[11px] lg:text-[13px] tracking-[0.15em] lg:tracking-[0.2em] uppercase text-[#012112] text-center mb-6">
              Supporting Association
            </h3>
            <div className="w-full overflow-hidden">
              <Marquee speed={30} direction="right" gradient={false} pauseOnHover={true}>
                {supportingAssociations.map((partner, idx) => (
                  <div key={idx} className="mx-6 md:mx-8 lg:mx-10 transition-transform duration-300 hover:-translate-y-1 flex items-center justify-center">
                    <img loading="lazy" decoding="async" src={getImageUrl(partner)} 
                      alt={partner.name || partner.imageAlt || 'Supporting Association'} 
                      title={partner.name || partner.imageAlt || 'Supporting Association'}
                      className="h-12 md:h-14 lg:h-16 w-auto max-w-[100px] md:max-w-[120px] lg:max-w-[140px] object-contain transition-all duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          `https://placehold.co/100x60/ffffff/888?text=${encodeURIComponent(partner.name || 'Logo')}`;
                      }}
                    />
                  </div>
                ))}
              </Marquee>
            </div>
          </div>

        </div>

      </SectionContainer>
    </section>
  );
};

export default LogoShowcase;
