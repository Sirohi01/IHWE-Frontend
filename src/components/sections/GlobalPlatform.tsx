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
        if (result) {
          setData(result);
        }
      } catch (error) {
        console.error('Error fetching global platform data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlatformData();
  }, []);

  if (loading || !data) return null;

  // Function to wrap highlight text in orange span
  const renderTitle = (title: string, highlight: string) => {
    if (!highlight) return title;
    const parts = title.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={i} className="text-[#d26019]">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <section className="pt-4 pb-16 lg:pt-6 lg:pb-24 relative">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-start">
          
          {/* LEFT SIDE: IMAGES GRID FROM BACKEND */}
          <div className="relative order-2 lg:order-1" data-aos="fade-right">
            <div className="grid grid-cols-2 gap-3 max-w-[450px] mx-auto lg:mx-0">
              <div className="space-y-3">
                <div className="rounded-2xl overflow-hidden aspect-[3/4] shadow-md bg-gray-100">
                  {data.images[0]?.url && (
                    <img 
                      src={data.images[0].url.startsWith('http') ? data.images[0].url : `${SERVER_URL}${data.images[0].url}`} 
                      alt={data.images[0]?.altText || "Global Platform"} 
                      className="w-full h-full object-cover" 
                    />
                  )}
                </div>
                <div className="rounded-2xl overflow-hidden aspect-square shadow-md bg-gray-100">
                  {data.images[1]?.url && (
                    <img 
                      src={data.images[1].url.startsWith('http') ? data.images[1].url : `${SERVER_URL}${data.images[1].url}`} 
                      alt={data.images[1]?.altText || "Global Platform"} 
                      className="w-full h-full object-cover" 
                    />
                  )}
                </div>
              </div>
              <div className="space-y-3 pt-6">
                <div className="rounded-2xl overflow-hidden aspect-square shadow-md bg-gray-100">
                  {data.images[2]?.url && (
                    <img 
                      src={data.images[2].url.startsWith('http') ? data.images[2].url : `${SERVER_URL}${data.images[2].url}`} 
                      alt={data.images[2]?.altText || "Global Platform"} 
                      className="w-full h-full object-cover" 
                    />
                  )}
                </div>
                <div className="rounded-2xl overflow-hidden aspect-[3/4] shadow-md bg-gray-100">
                  {data.images[3]?.url && (
                    <img 
                      src={data.images[3].url.startsWith('http') ? data.images[3].url : `${SERVER_URL}${data.images[3].url}`} 
                      alt={data.images[3]?.altText || "Global Platform"} 
                      className="w-full h-full object-cover" 
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: CONTENT FROM BACKEND */}
          <div data-aos="fade-left" className="order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-6 bg-[#23471d]" />
              <span className="uppercase tracking-[0.3em] text-[#23471d] font-bold text-[11px]">
                {data.subheading}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-slate-900 mb-6 leading-tight">
              {renderTitle(data.title, data.highlightText)}
            </h2>
            
            {/* Main Description (Rich Text) */}
            <div 
              className="text-slate-700 leading-relaxed text-base mb-6 text-justify prose prose-slate max-w-none"
              dangerouslySetInnerHTML={{ __html: data.descriptionHtml }}
            />

            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              {data.points.map((point, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#d26019]" />
                  <span className="text-sm font-semibold text-slate-800">{point}</span>
                </div>
              ))}
            </div>

            {data.tagline && (
              <p className="text-slate-700 leading-relaxed text-sm mt-10 italic border-l-2 border-[#d26019] pl-4">
                {data.tagline}
              </p>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default GlobalPlatform;
