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

  // Removed video intersection observer

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

          {/* LEFT IMAGES SIDE - EDITORIAL GRID */}
          <div data-aos="fade-right" className="relative group">
            <div className="grid grid-cols-12 gap-3 lg:gap-4 items-start">
              
              {/* MAIN TALL IMAGE (LEFT) */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="col-span-7 relative overflow-hidden rounded-3xl border-2 border-[#d26019]/20 shadow-lg group-hover:shadow-2xl transition-all duration-500 aspect-[3/4]"
              >
                <img 
                  src={data?.image1 ? `${SERVER_URL}${data.image1}` : ""} 
                  alt={data?.image1Alt || "International Expo Conference"} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>

              {/* RIGHT STACK */}
              <div className="col-span-5 flex flex-col gap-3 lg:gap-4">
                
                {/* TOP ACCENT (SQUARE) */}
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative overflow-hidden rounded-2xl border-2 border-[#23471d]/20 shadow-md aspect-square"
                >
                  <img 
                    src={data?.image3 ? `${SERVER_URL}${data.image3}` : ""} 
                    alt={data?.image3Alt || "Wellness Pavilion"} 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" 
                  />
                </motion.div>

                {/* BOTTOM ACCENT (WIDE) */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="relative overflow-hidden rounded-2xl border-2 border-slate-200/50 shadow-md aspect-[16/9]"
                >
                  <img 
                    src={data?.image2 ? `${SERVER_URL}${data.image2}` : ""} 
                    alt={data?.image2Alt || "Medical Innovation"} 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-[#d26019]/10 mix-blend-multiply opacity-0 hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
                
              </div>

              {/* DECORATIVE ELEMENTS */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -left-6 -top-6 w-24 h-24 border-2 border-[#d26019]/10 rounded-full border-dashed z-[-1]" 
              />
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-[#23471d]/5 blur-3xl rounded-full z-[-1]" />
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