import React, { useEffect, useState } from 'react';
import { globalPlatformApi, SERVER_URL } from '@/lib/api';

interface PlatformData {
  subheading: string;
  title: string;
  highlightText: string;
  descriptionHtml: string;
  points: string[];
  tagline: string;
  images: { url: string; altText: string }[];
}

const GlobalPlatform: React.FC = () => {
  const [data, setData] = useState<PlatformData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlatformData = async () => {
      try {
        const result = await globalPlatformApi.get();
        if (result) setData(result);
      } catch (error) {
        console.error('Error fetching global platform data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlatformData();
  }, []);

  if (loading || !data) return null;

  const getImageUrl = (url: string) =>
    url.startsWith('http') ? url : `${SERVER_URL}${url}`;

  const renderTitle = (title: string, highlight: string) => {
    if (!highlight) return title;
    const parts = title.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={i} className="text-[#d26019]">{part}</span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <section className="pt-12 pb-0 lg:pt-16 lg:pb-0 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-16 items-center">

          {/* ── LEFT: SINGLE IMAGE ── */}
          <div className="relative order-2 lg:order-1">

            {/* Dot pattern top-right */}
            <div
              className="absolute -top-4 -right-4 w-24 h-24 z-0 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle, #d26019 1.2px, transparent 1.2px)',
                backgroundSize: '9px 9px',
                opacity: 0.25,
              }}
            />
            {/* Dot pattern bottom-left */}
            <div
              className="absolute -bottom-4 -left-4 w-24 h-24 z-0 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle, #23471d 1.2px, transparent 1.2px)',
                backgroundSize: '9px 9px',
                opacity: 0.2,
              }}
            />

            {/* Single image wrapper */}
            <div className="relative z-10" style={{ height: '400px' }}>

              <div
                className="relative overflow-hidden w-full h-full group"
                style={{ outline: '2px solid #d26019', outlineOffset: '-2px' }}
              >
                {data.images[0]?.url ? (
                  
                  <img
                    src={getImageUrl(data.images[0].url)}
                    alt={data.images[0]?.altText || ''}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
                <div className="absolute bottom-0 left-0 w-full h-[4px] bg-[#d26019]" />
                <div className="absolute top-0 left-0 h-full w-[4px] bg-[#23471d]" />
              </div>

              {/* 9th Edition badge */}
              <div
                className="absolute z-20 flex flex-col items-center justify-center text-center"
                style={{
                  bottom: '0px',
                  right: '0px',
                  width: '80px',
                  height: '80px',
                  background: '#d26019',
                  border: '3px solid #fff',
                  boxShadow: '0 6px 24px rgba(210,96,25,0.4)',
                }}
              >
                <span style={{
                  color: '#fff',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 900,
                  fontSize: '24px',
                  lineHeight: 1,
                }}>9th</span>
                <span style={{
                  color: '#ffe0c8',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: '7.5px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginTop: '3px',
                }}>Edition</span>
              </div>

            </div>
          </div>

          {/* ── RIGHT: CONTENT ── */}
          <div className="order-1 lg:order-2">

            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-6 bg-[#23471d]" />
              <span
                className="uppercase tracking-[0.3em] text-[#23471d] font-bold text-[11px]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {data.subheading}
              </span>
            </div>

            {/* Title */}
            <h2
              className="font-semibold text-[28px] text-slate-900 mb-2 leading-tight"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {renderTitle(data.title, data.highlightText)}
            </h2>

            {/* Description - prose hata diya */}
            <div
              className="text-slate-700 leading-relaxed text-sm mb-6 text-justify max-w-none strip-editor-bg"
              dangerouslySetInnerHTML={{ __html: data.descriptionHtml }}
            />

          </div>

        </div>
      </div>
    </section>
  );
};

export default GlobalPlatform;