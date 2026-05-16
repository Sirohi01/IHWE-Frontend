
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Mic2 } from "lucide-react";
import { distinguishedSpeakerApi, speakerApi, SERVER_URL } from "@/lib/api";

interface Speaker {
  name: string;
  role: string;
  org: string;
  topic: string;
  image: string;
  flag: string;
  _order: number;
}

interface DistinguishedSpeakersProps {
  title?: string;
  highlight?: string;
  compact?: boolean;
}

const cardBackgrounds = [
  "bg-gradient-to-br from-white to-[#F0F9FF]",
  "bg-gradient-to-br from-white to-[#F0FDF4]",
  "bg-gradient-to-br from-white to-[#FFF7ED]",
  "bg-gradient-to-br from-white to-[#FEF2F2]",
  "bg-gradient-to-br from-white to-[#FAF5FF]",
  "bg-gradient-to-br from-white to-[#FFF1F5]",
  "bg-gradient-to-br from-white to-[#F5F3FF]",
  "bg-gradient-to-br from-white to-[#ECFEFF]",
];

const DistinguishedSpeakers: React.FC<DistinguishedSpeakersProps> = ({
  title = "MEET OUR ESTEEMED",
  highlight = "SPEAKERS 2025",
  compact = false,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [displaySpeakers, setDisplaySpeakers] = useState<Speaker[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const [adminRes, nominationsRes] = await Promise.allSettled([
          distinguishedSpeakerApi.getAll(),
          speakerApi.get("Approved"),
        ]);

        const list: Speaker[] = [];

        if (adminRes.status === "fulfilled" && adminRes.value?.length > 0) {
          adminRes.value.forEach((s: any) =>
            list.push({
              name: s.name,
              role: s.designation,
              org: s.organization,
              topic: s.topic || "",
              image: s.image
                ? s.image.startsWith("http")
                  ? s.image
                  : `${SERVER_URL}${s.image}`
                : "",
              flag: s.flag || "🇮🇳",
              _order: Number(s.order) || 0,
            })
          );
        }

        if (
          nominationsRes.status === "fulfilled" &&
          nominationsRes.value?.length > 0
        ) {
          nominationsRes.value.forEach((s: any) =>
            list.push({
              name: s.fullName,
              role: s.designation,
              org: s.organization,
              topic: s.preferredTopic || "",
              image: s.speakerPhotoUrl
                ? s.speakerPhotoUrl.startsWith("http")
                  ? s.speakerPhotoUrl
                  : `${SERVER_URL}${s.speakerPhotoUrl}`
                : "",
              flag: "🇮🇳",
              _order: 9999,
            })
          );
        }

        if (list.length > 0) {
          list.sort((a, b) => a._order - b._order);
          setDisplaySpeakers(list);
        }
      } catch (error) {
        console.error("Error fetching speakers:", error);
      }
    };

    fetchSpeakers();
  }, []);


  useEffect(() => {
    if (scrollRef.current && displaySpeakers.length > 0) {
      const measureWidths = () => {
        const scrollContainer = scrollRef.current;
        const contentContainer = scrollContainer?.querySelector(".scroll-content");

        if (contentContainer && scrollContainer) {
          const contentWidthValue = contentContainer.scrollWidth;
          setContentWidth(contentWidthValue);
        }
      };

      measureWidths();
      window.addEventListener("resize", measureWidths);
      return () => window.removeEventListener("resize", measureWidths);
    }
  }, [displaySpeakers]);


  const getAnimationDuration = () => {

    const TOTAL_CYCLE_DURATION_SECONDS = 700;


    return TOTAL_CYCLE_DURATION_SECONDS;
  };


  const getInfiniteSpeakers = () => {
    if (displaySpeakers.length === 0) return [];
    return [...displaySpeakers, ...displaySpeakers];
  };

  const infiniteSpeakers = getInfiniteSpeakers();

  if (displaySpeakers.length === 0) {
    return null;
  }

  return (
    <section
      className={`${compact ? "py-4" : "pt-0 pb-4"
        } bg-white overflow-hidden relative`}
    >
      <div className="mx-auto max-w-[1340px] relative lg:left-[10px] rounded-[30px] px-6 lg:px-0 py-4">

        {/* HEADER */}
        <div className="flex justify-center items-center mb-4 px-4">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-[20px] md:text-[24px] font-[900] text-[#0B2C66] uppercase tracking-tight">
              {title} <span className="text-[#1E88E5]">{highlight}</span>
            </h2>
            <div className="h-1 w-20 bg-[#4E9F3D] mt-2 rounded-full" />
          </div>
        </div>

        {/* SPEAKER SECTION */}
        <div
          className="relative group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >

          {/* LEFT BUTTON */}
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-[#E6ECF3] items-center justify-center text-[#0B2C66] hover:bg-[#4E9F3D] hover:text-white transition-all"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* RIGHT BUTTON */}
          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-[#E6ECF3] items-center justify-center text-[#0B2C66] hover:bg-[#4E9F3D] hover:text-white transition-all"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* SLIDER */}
          <div
            ref={scrollRef}
            className="relative w-full overflow-x-auto scrollbar-hide"
          >
            <motion.div
              className="scroll-content flex gap-3 w-max py-2"
              animate={
                isPaused
                  ? {}
                  : {
                    x: [0, -contentWidth],
                  }
              }
              transition={{
                duration: getAnimationDuration(), // Uses your manual value
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
              }}
              style={{
                display: "flex",
              }}
            >
              {infiniteSpeakers.map((speaker, index) => (
                <div
                  key={`${index}-${speaker.name}`}
                  className={`w-[190px] h-[200px] ${cardBackgrounds[index % cardBackgrounds.length]} rounded-[18px] p-2.5 shadow-sm border border-[#E6ECF3] hover:shadow-md transition-all duration-300 flex flex-col items-center text-center relative flex-shrink-0`}
                >
                  <div className="absolute top-2 left-2 w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-[#1E88E5]">
                    <Mic2 className="w-5 h-5" />
                  </div>

                  <div className="w-[95px] h-[95px] rounded-full overflow-hidden mb-2 shadow-sm mt-2 flex-shrink-0">
                    <img
                      src={
                        speaker.image ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          speaker.name
                        )}&background=random`
                      }
                      alt={speaker.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          speaker.name
                        )}&background=0B2C66&color=fff`;
                      }}
                    />
                  </div>

                  <h3
                    className="text-[14px] font-bold text-[#1C2B3A] leading-tight mb-1 w-full overflow-hidden"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {speaker.name}
                  </h3>

                  <p
                    className="text-[12px] text-[#5F6B7A] leading-tight mb-1 w-full overflow-hidden"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {speaker.role}
                  </p>

                  <p
                    className="text-[12px] font-semibold text-[#1C2B3A] w-full overflow-hidden"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {speaker.org}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center gap-2 mt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#4E9F3D]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#E2E8F0]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#E2E8F0]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DistinguishedSpeakers;