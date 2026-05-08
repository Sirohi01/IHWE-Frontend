import { useState, useEffect } from "react";
import { marqueeApi } from "@/lib/api";

const MarqueeStrip = () => {
  const [data, setData] = useState<{ text: string; bgColor: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMarquee = async () => {
      try {
        const result = await marqueeApi.get();
        if (result && result.text) {
          setData(result);
        }
      } catch (error) {
        console.error("Failed to fetch marquee:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMarquee();
  }, []);

  if (isLoading || !data || !data.text) return null;

  return (
    <section 
      className="py-4 mt-4 overflow-hidden" 
      style={{ backgroundColor: data.bgColor || "#23471d" }}
    >
      <style>{`
        .marquee-strip {
          display: flex;
          width: max-content;
          animation: marquee-scroll 60s linear infinite;
        }
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <div className="flex whitespace-nowrap">
        <div className="marquee-strip flex">
          <span className="text-white font-inter font-medium text-sm tracking-wider px-2">{data.text}</span>
          <span className="text-white font-inter font-medium text-sm tracking-wider px-2">{data.text}</span>
          <span className="text-white font-inter font-medium text-sm tracking-wider px-2">{data.text}</span>
          <span className="text-white font-inter font-medium text-sm tracking-wider px-2">{data.text}</span>
        </div>
      </div>
    </section>
  );
};

export default MarqueeStrip;
