import React from "react";
import { SERVER_URL } from "@/lib/api";

interface Day3FeaturedSpeakersProps {
  data?: Array<{
    name: string;
    role: string;
    company: string;
    image: string;
    category: string;
  }>;
  dayNumber?: number;
}

const Day3FeaturedSpeakers: React.FC<Day3FeaturedSpeakersProps> = ({ data, dayNumber }) => {
  const speakers = Array.isArray(data) ? data : [];

  return (
    <div className="bg-white h-full flex flex-col py-2" style={{ backgroundColor: '#F5F5F0' }}>
      {/* Header */}
      <div className="flex items-start justify-between mb-5 text-center justify-center items-center ">
        <h2 className="text-[14px] font-black text-[#0B2C66] uppercase tracking-tight leading-snug">
          FEATURED SPEAKERS —{" "}
          <span className="text-[#4E9F3D]">DAY {dayNumber || 3}</span>
        </h2>
      </div>

      {/* 2×3 Grid with vertical scroll */}
      <div className="-mt-4  grid grid-cols-2 gap-x-4 gap-y-6 flex-1 max-h-[390px] overflow-y-auto pr-2 custom-scrollbar">
        {speakers.map((speaker, idx) => {
          const isKeynote = speaker.category?.toUpperCase().includes('KEYNOTE');
          const badgeColor = isKeynote ? "text-[#4E9F3D] border-[#4E9F3D]" : "text-[#5F6B7A] border-[#CBD5E0]";
          const speakerImg = speaker.image
            ? (speaker.image.startsWith('http') ? speaker.image : `${SERVER_URL}${speaker.image}`)
            : "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=100";

          return (
            <div
              key={idx}
              className="flex flex-col items-center text-center"
            >
              {/* Photo */}
              <img
                src={speakerImg}
                alt={speaker.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md mb-2"
              />

              {/* Name */}
              <h3 className="text-[12px] font-black text-[#0B2C66] leading-tight mb-0.5">
                {speaker.name}
              </h3>

              {/* Role */}
              <p className="text-[10px] font-bold text-[#5F6B7A] leading-tight">
                {speaker.role}
              </p>
              {speaker.company && (
                <p className="text-[10px] font-bold text-[#5F6B7A] leading-tight mb-2">
                  {speaker.company}
                </p>
              )}

              {/* Badge */}
              {speaker.category && (
                <span className={`mt-1 px-3 py-0.5 border rounded-full text-[8px] font-black uppercase tracking-widest ${badgeColor}`}>
                  {speaker.category}
                </span>
              )}
            </div>
          );
        })}
        {speakers.length === 0 && (
          <div className="col-span-2 py-12 text-center text-gray-400 italic text-xs">
            No featured speakers yet.
          </div>
        )}
      </div>

      {/* Pagination dots (static placeholder) */}
      <div className="flex justify-center gap-1.5 mt-5">
        <div className="w-2 h-2 rounded-full bg-[#4E9F3D]" />
        <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />
        <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />
        <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />
      </div>
    </div>
  );
};

export default Day3FeaturedSpeakers;


