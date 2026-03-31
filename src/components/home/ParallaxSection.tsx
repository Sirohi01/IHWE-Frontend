import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { parallaxApi, SERVER_URL } from "@/lib/api";

interface ParallaxData {
  subheading: string;
  heading: string;
  highlightText: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  imageUrl: string;
}

const ParallaxSection = () => {
  const [data, setData] = useState<ParallaxData | null>(null);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Enhanced professional parallax movement for better visibility
  const y = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.2]);
  const opacityValue = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1, 0.7]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await parallaxApi.get();
        if (result) {
          setData(result);
        }
      } catch (error) {
        console.error("Error fetching parallax data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getHighlightedText = (text: string, highlight: string) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
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

  const bgImage = data?.imageUrl ? `${SERVER_URL}${data.imageUrl}` : "/images/cara121.png";

  return (
    <section
      ref={ref}
      className="relative h-[320px] md:h-[360px] lg:h-[420px] flex items-center justify-center overflow-hidden bg-black"
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-[#d26019] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : !data ? null : (
        <>
          {/* Parallax Image Layer */}
          <motion.div
            style={{ y, scale, opacity: opacityValue }}
            className="absolute inset-0 w-full h-[160%] -top-[30%]"
          >
            <motion.img
              src={bgImage}
              alt="Parallax Background"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>

          {/* Balanced Semi-Transparent Overlay (Optimized for text readability) */}
          <div className="absolute inset-0 bg-black/35" />

          {/* Moderate Gradient Depth for Sharp Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/50" />

          {/* Content */}
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-white/80 mb-4"
            >
              {data.subheading}
            </motion.p>

            <motion.h2 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl md:text-4xl lg:text-5xl font-serif font-semibold text-white leading-tight mb-6"
            >
              {getHighlightedText(data.heading, data.highlightText)}
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-white/70 max-w-xl mx-auto mb-8 text-sm md:text-base"
            >
              {data.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link to={data.buttonUrl}>
                <Button
                  size="lg"
                  className="bg-[#d26019] hover:bg-[#b54e12] text-white font-semibold px-8 py-4 uppercase tracking-[0.2em] text-xs shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 border border-white/10"
                >
                  {data.buttonText}
                </Button>
              </Link>
            </motion.div>
          </div>
        </>
      )}
    </section>
  );
};

export default ParallaxSection;