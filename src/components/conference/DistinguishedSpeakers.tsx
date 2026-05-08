import React, { useState, useEffect } from "react";
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

const DistinguishedSpeakers: React.FC<DistinguishedSpeakersProps> = ({
  title = "MEET OUR ESTEEMED",
  highlight = "SPEAKERS 2025",
  compact = false,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [displaySpeakers, setDisplaySpeakers] = useState<Speaker[]>([]);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
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
  const animateTo = `-100%`;

  return (
    <section
      className={`${compact ? "py-4" : "pt-0 pb-10"} bg-white overflow-hidden relative`}
    >
      <div className="mx-auto max-w-[1380px] relative left-[20px] rounded-[30px] px-8 py-4">
        {/* Header */}
        <div className="flex justify-center items-center mb-4 px-4">
          <div className="flex flex-col items-center">
            <h2 className="text-[24px] font-[900] text-[#0B2C66] uppercase tracking-tight">
              {title} <span className="text-[#1E88E5]">{highlight}</span>
            </h2>
            <div className="h-1 w-20 bg-[#4E9F3D] mt-2 rounded-full" />
          </div>
        </div>

        {/* Carousel Area */}
        <div
          className="relative group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Arrows */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-[#E6ECF3] flex items-center justify-center text-[#0B2C66] hover:bg-[#4E9F3D] hover:text-white transition-all"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-[#E6ECF3] flex items-center justify-center text-[#0B2C66] hover:bg-[#4E9F3D] hover:text-white transition-all"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Marquee Container */}
          <div className="relative w-full overflow-hidden">
            <motion.div
              className="flex gap-3 w-max py-2"
              animate={isPaused ? {} : { x: ["0%", animateTo] }}
              transition={{ duration: 30, ease: "linear", repeat: Infinity }}
            >
              {displaySpeakers.map((speaker, index) => (
                <div
                  key={index}
                  className="w-[190px] bg-white rounded-[18px] p-4 shadow-sm border border-[#E6ECF3] hover:shadow-md transition-all duration-300 flex flex-col items-center text-center relative"
                >
                  <div className="absolute top-3 left-3 w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-[#1E88E5]">
                    <Mic2 className="w-3 h-3" />
                  </div>

                  <div className="absolute top-3 right-3 text-base">
                    {speaker.flag}
                  </div>

                  <div className="w-[130px] h-[130px] rounded-full overflow-hidden  mb-3 shadow-sm mt-2">
                    <img
                      src={
                        speaker.image ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(speaker.name)}&background=random`
                      }
                      alt={speaker.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(speaker.name)}&background=0B2C66&color=fff`;
                      }}
                    />
                  </div>

                  <h3 className="text-[12px] font-bold text-[#1C2B3A] mb-0.5 leading-tight">
                    {speaker.name}
                  </h3>
                  <p className="text-[10px] text-[#5F6B7A] leading-tight mb-0.5">
                    {speaker.role}
                  </p>
                  <p className="text-[10px] font-semibold text-[#1C2B3A] mb-2">
                    {speaker.org}
                  </p>

                </div>
              ))}
            </motion.div>
          </div>

          {/* Indicators */}
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