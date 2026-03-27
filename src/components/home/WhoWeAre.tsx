import { useState, useEffect } from "react";
import { whoWeAreApi, SERVER_URL } from "@/lib/api";

interface WhoWeAreData {
  subheading: string;
  title: string;
  highlightText: string;
  description: string;
  points: string[];
  images: { url: string; altText: string }[];
}

const WhoWeAre = () => {
  const [data, setData] = useState<WhoWeAreData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await whoWeAreApi.get();
        if (result) {
          setData(result);
        }
      } catch (error) {
        console.error("Failed to fetch Who We Are data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <section className="pt-4 pb-8 lg:pt-6 lg:pb-12 bg-[#ffffff] relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="animate-pulse space-y-4">
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-10 w-3/4 bg-gray-200 rounded" />
              <div className="h-32 bg-gray-200 rounded" />
              <div className="space-y-2">
                {[1,2,3,4,5].map(i => <div key={i} className="h-4 bg-gray-200 rounded" />)}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[1,2,3,4].map(i => <div key={i} className="animate-pulse bg-gray-200 rounded-2xl aspect-square" />)}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!data) return null;

  // Build title with highlighted text
  const renderTitle = () => {
    if (!data.highlightText || !data.title.includes(data.highlightText)) {
      return <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-slate-900 mb-6 leading-tight">{data.title}</h2>;
    }
    const parts = data.title.split(data.highlightText);
    return (
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-slate-900 mb-6 leading-tight">
        {parts[0]}
        <span className="text-[#d26019]">{data.highlightText}</span>
        {parts[1]}
      </h2>
    );
  };

  const activePoints = data.points.filter(p => p && p.trim() !== "");
  const activeImages = data.images.filter(img => img.url && img.url.trim() !== "");

  return (
    <section className="pt-4 pb-8 lg:pt-6 lg:pb-12 bg-[#ffffff] relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#d26019]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-[#d26019]/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">

        {/* 2-COLUMN: CONTENT LEFT, IMAGES RIGHT */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-0">

          {/* LEFT: CONTENT & POINTS */}
          <div data-aos="fade-right" data-aos-duration="800" className="mt-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-6 bg-[#23471d]" />
              <span className="uppercase tracking-[0.3em] text-[#23471d] font-bold text-[12px]">
                {data.subheading}
              </span>
            </div>
            {renderTitle()}
            <p className="text-slate-700 leading-relaxed text-base mb-8 text-justify">
              {data.description}
            </p>

            {activePoints.length > 0 && (
              <div className="space-y-4">
                {activePoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3 group">
                    <div className="mt-1 w-4 h-4 rounded-none border border-[#23471d] flex items-center justify-center shrink-0 group-hover:bg-[#d26019] group-hover:border-[#d26019] transition-colors duration-300">
                      <div className="w-1.5 h-1.5 bg-[#23471d] group-hover:bg-white" />
                    </div>
                    <p className="text-slate-800 font-medium text-sm text-justify">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: 4 IMAGE STAGGERED GRID */}
          {activeImages.length > 0 && (
            <div className="relative grid grid-cols-2 gap-4 md:gap-5">
              {activeImages[0] && (
                <div
                  data-aos="fade-down"
                  data-aos-delay="100"
                  data-aos-duration="700"
                  className="mt-8 overflow-hidden aspect-square rounded-2xl"
                >
                  <img
                    src={`${SERVER_URL}${activeImages[0].url}`}
                    alt={activeImages[0].altText || "Who We Are Image 1"}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              )}
              {activeImages[1] && (
                <div
                  data-aos="fade-left"
                  data-aos-delay="200"
                  data-aos-duration="700"
                  className="-mt-4 overflow-hidden aspect-[4/5] rounded-2xl"
                >
                  <img
                    src={`${SERVER_URL}${activeImages[1].url}`}
                    alt={activeImages[1].altText || "Who We Are Image 2"}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              )}
              {activeImages[2] && (
                <div
                  data-aos="fade-right"
                  data-aos-delay="300"
                  data-aos-duration="700"
                  className="-mt-8 overflow-hidden aspect-[4/5] rounded-2xl"
                >
                  <img
                    src={`${SERVER_URL}${activeImages[2].url}`}
                    alt={activeImages[2].altText || "Who We Are Image 3"}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              )}
              {activeImages[3] && (
                <div
                  data-aos="fade-up"
                  data-aos-delay="400"
                  data-aos-duration="700"
                  className="mt-4 overflow-hidden aspect-square rounded-2xl"
                >
                  <img
                    src={`${SERVER_URL}${activeImages[3].url}`}
                    alt={activeImages[3].altText || "Who We Are Image 4"}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;