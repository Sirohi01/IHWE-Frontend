import { Eye, Target } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { aboutApi, SERVER_URL } from "@/lib/api";

const pathVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.5, ease: "easeInOut", delay: 0.5 },
      opacity: { duration: 0.3, delay: 0.5 },
    },
  },
} as any;

const AboutSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await aboutApi.get();
        if (result) {
          setData(result);
        }
      } catch (error) {
        console.error("Error fetching about data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(error => {
            console.log("Autoplay prevented:", error);
          });
        } else {
          videoRef.current?.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [data]); // Re-observe if video src changes

  const visionMission = [
    {
      icon: Eye,
      title: "Our Vision",
      text: data?.vision || "",
    },
    {
      icon: Target,
      title: "Our Mission",
      text: data?.mission || "",
    },
  ];

  const renderHeading = () => {
    const subheading = data?.subheading || "";
    const highlightedWord = data?.highlightedWord || "";

    if (!highlightedWord || !subheading.includes(highlightedWord)) {
      return (
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-foreground mb-6 leading-tight">
          {subheading}
        </h2>
      );
    }

    const parts = subheading.split(highlightedWord);

    return (
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-foreground mb-6 leading-tight">
        {parts[0]}
        <span className="relative inline-block text-[#d26019]">
          {highlightedWord}
          <motion.svg
            className="absolute -bottom-1.5 left-0 w-full h-2.5 text-[#23471d]/60"
            viewBox="0 0 200 12"
            fill="none"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.path
              d="M2 10C60 2, 140 2, 198 10"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              variants={pathVariants}
            />
          </motion.svg>
        </span>
        {parts[1]}
      </h2>
    );
  };

  return (
    <section className="py-10 lg:py-14 bg-[#FFFDF1] overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* LEFT VIDEO SIDE */}
          <div data-aos="fade-right" className="self-stretch">
            <div className="relative h-full">
              <div className="overflow-hidden border-4 border-[#d26019] bg-slate-900 h-full">
                <video
                  ref={videoRef}
                  key={data?.video} // Reset video element when src changes
                  src={data?.video ? `${SERVER_URL}${data.video}` : ""}
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT SIDE */}
          <div data-aos="fade-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-6 bg-[#23471d]" />
              <span className="uppercase tracking-[0.3em] text-[#23471d] font-bold text-[12px]">
              {data?.heading}
              </span>
            </div>

            {renderHeading()}

            {/* DESCRIPTION */}
            <p className="text-slate-700 mb-6 leading-relaxed text-base text-justify">
              {data?.description}
            </p>

            {/* VISION / MISSION */}
            <div className="flex flex-col gap-6">
              {visionMission.map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 p-4 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-poppins font-semibold text-slate-800 text-sm mb-0.5">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed text-justify">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;