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
      className="py-1.5 mt-0 mb-1 overflow-hidden border-y border-white/10" 
      style={{ backgroundColor: data.bgColor || "#1a3a14" }}
    >
      <style>{`
        @keyframes goldShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes sparkleAnim {
          0%   { opacity: 0; transform: scale(0.5) translateY(0); }
          40%  { opacity: 1; transform: scale(1.2) translateY(-2px); }
          80%  { opacity: 0.6; transform: scale(0.9) translateY(-3px); }
          100% { opacity: 0; transform: scale(0.5) translateY(-4px); }
        }
        .marquee-container {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: marquee-scroll 70s linear infinite;
        }
        @keyframes marquee-scroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .marquee-item {
          display: flex;
          align-items: center;
          gap: 2rem;
          padding: 0 1rem;
        }
        .marquee-text {
          color: #ffffff;
          font-weight: 800;
          letter-spacing: 0.1em;
        }
        .sparkle-dot {
          display: inline-block;
          color: #ffdd00;
          text-shadow: 0 0 10px #ffdd00, 0 0 20px gold;
          animation: sparkleAnim 1.6s ease-in-out infinite;
        }
      `}</style>
      <div className="flex whitespace-nowrap">
        <div 
          className="marquee-container"
          style={{ animationDuration: `${Math.max(data.text.length * 0.7, 30)}s` }}
        >
          {/* Create two identical sets for perfect loop */}
          {[1, 2].map((set) => (
            <div key={set} className="flex">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="marquee-item">
                  <span className="marquee-text font-inter text-[11px] md:text-[12px] uppercase">
                    {data.text}
                  </span>
                  <span className="sparkle-dot text-sm">✦</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeStrip;
