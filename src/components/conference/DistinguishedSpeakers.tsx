import React, { useState, useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { ChevronLeft, ChevronRight, Mic2 } from "lucide-react";
import { speakerApi, SERVER_URL } from "@/lib/api";

const FALLBACK_SPEAKERS = [
  {
    name: "Manish Kumar Sirohi",
    role: "CTO",
    org: "Pramod Kirana Store",
    topic: "Health Benefits of Ayurveda",
    image: "https://images.unsplash.com/photo-1556157382-97dee2dcb721?auto=format&fit=crop&q=80",
    flag: "🇮🇳",
  },
  {
    name: "AMAN CHAUDHARY",
    role: "sds",
    org: "jkdjksd",
    topic: "sdsdsdsd",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80",
    flag: "🇮🇳",
  },
  {
    name: "AMAN aman",
    role: "Speaker",
    org: "aman",
    topic: "sdsd",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80",
    flag: "🇮🇳",
  },
  {
    name: "AMAN CHAUDHARY",
    role: "Speaker",
    org: "aman",
    topic: "sdsdsd",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80",
    flag: "🇮🇳",
  },
  {
    name: "AMAN CHAUDHARY",
    role: "ashdsd",
    org: "sdcsc",
    topic: "csdcsc",
    image: "https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80",
    flag: "🇮🇳",
  },
];

interface DistinguishedSpeakersProps {
  title?: string;
  highlight?: string;
}

const DistinguishedSpeakers: React.FC<DistinguishedSpeakersProps> = ({
  title = "MEET OUR DISTINGUISHED",
  highlight = "SPEAKERS"
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [displaySpeakers, setDisplaySpeakers] = useState(FALLBACK_SPEAKERS);

  useEffect(() => {
    const fetchApprovedSpeakers = async () => {
      try {
        const approved = await speakerApi.get('Approved');
        if (approved && approved.length > 0) {
          const mapped = approved.map((s: any) => ({
            name: s.fullName,
            role: s.designation,
            org: s.organization,
            topic: s.preferredTopic,
            image: s.speakerPhotoUrl && (s.speakerPhotoUrl.startsWith('http') ? s.speakerPhotoUrl : `${SERVER_URL}${s.speakerPhotoUrl}`),
            flag: "🇮🇳",
          }));
          setDisplaySpeakers(mapped);
        }
      } catch (error) {
        console.error("Error fetching approved speakers:", error);
      }
    };
    fetchApprovedSpeakers();
  }, []);

  return (
    <section className="pt-0 pb-10 bg-white overflow-hidden relative">
      <div className="mx-auto max-w-[1380px] relative left-[20px]  rounded-[30px] px-8 py-4 border border-[#E2E8F0]">
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
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-[#E6ECF3] flex items-center justify-center text-[#0B2C66] hover:bg-[#4E9F3D] hover:text-white transition-all"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-[#E6ECF3] flex items-center justify-center text-[#0B2C66] hover:bg-[#4E9F3D] hover:text-white transition-all"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Marquee Container */}
          <div className="relative w-full overflow-hidden">
            <motion.div
              className="flex gap-3 w-max py-2"
              animate={isPaused ? {} : {
                x: ["0%", "-50%"],
              }}
              transition={{
                duration: 30,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              {[...displaySpeakers, ...displaySpeakers].map((speaker, index) => (
                <div
                  key={index}
                  className="w-[190px] bg-white rounded-[18px] p-4 shadow-sm border border-[#E6ECF3] hover:shadow-md transition-all duration-300 flex flex-col items-center text-center relative"
                >
                  {/* Top Icons */}
                  <div className="absolute top-3 left-3 w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-[#1E88E5]">
                    <Mic2 className="w-3 h-3" />
                  </div>

                  <div className="absolute top-3 right-3 text-base">
                    {speaker.flag}
                  </div>

                  {/* Profile Image */}
                  <div className="w-[70px] h-[70px] rounded-full overflow-hidden border-[3px] border-[#F1F8EE] mb-2 shadow-sm mt-2">
                    <img
                      src={speaker.image || "https://via.placeholder.com/70"}
                      alt={speaker.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Speaker Details */}
                  <h3 className="text-[12px] font-bold text-[#1C2B3A] mb-0.5 leading-tight">
                    {speaker.name}
                  </h3>
                  <p className="text-[10px] text-[#5F6B7A] leading-tight mb-0.5">
                    {speaker.role}
                  </p>
                  <p className="text-[10px] font-semibold text-[#1C2B3A] mb-2">
                    {speaker.org}
                  </p>

                  {/* Topic Section */}
                  <div className="mt-auto pt-2 border-t border-[#F1F5F9] w-full text-left">
                    <span className="text-[8px] font-bold text-[#8FB569] uppercase block mb-0.5">
                      TOPIC:
                    </span>
                    <p className="text-[10px] font-medium text-[#1C2B3A] line-clamp-2 leading-snug">
                      {speaker.topic}
                    </p>
                  </div>
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