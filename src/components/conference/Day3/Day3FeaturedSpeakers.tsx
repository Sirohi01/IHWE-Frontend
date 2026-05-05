import React from "react";

const speakers = [
  {
    name: "Dr. Sanjay Gupta",
    role: "Prev. Chief Medical",
    company: "Correspondent, CNN",
    image: "https://randomuser.me/api/portraits/men/20.jpg",
    badge: "KEYNOTE SPEAKER",
    badgeColor: "text-[#4E9F3D] border-[#4E9F3D]"
  },
  {
    name: "Dr. Soumya Swaminathan",
    role: "Prev. Chief Scientist",
    company: "WHO",
    image: "https://randomuser.me/api/portraits/women/21.jpg",
    badge: "KEYNOTE SPEAKER",
    badgeColor: "text-[#4E9F3D] border-[#4E9F3D]"
  },
  {
    name: "Luke Coutinho",
    role: "Holistic Lifestyle Expert",
    company: "",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    badge: "SPEAKER",
    badgeColor: "text-[#5F6B7A] border-[#CBD5E0]"
  },
  {
    name: "Dr. R. Balakrishnan",
    role: "Director",
    company: "PHFI",
    image: "https://randomuser.me/api/portraits/men/23.jpg",
    badge: "PANELIST",
    badgeColor: "text-[#5F6B7A] border-[#CBD5E0]"
  },
  {
    name: "Dr. Nikhil Tandon",
    role: "Director",
    company: "AIIMS",
    image: "https://randomuser.me/api/portraits/men/24.jpg",
    badge: "SPEAKER",
    badgeColor: "text-[#5F6B7A] border-[#CBD5E0]"
  },
  {
    name: "Dr. Sangita Reddy",
    role: "Joint MD",
    company: "Apollo Hospitals",
    image: "https://randomuser.me/api/portraits/women/25.jpg",
    badge: "PANELIST",
    badgeColor: "text-[#5F6B7A] border-[#CBD5E0]"
  }
];

const Day3FeaturedSpeakers: React.FC = () => {
  return (
    <div className="bg-white h-full flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <h2 className="text-[14px] font-black text-[#0B2C66] uppercase tracking-tight leading-snug">
          FEATURED SPEAKERS —{" "}
          <span className="text-[#4E9F3D]">DAY 3</span>
        </h2>

      </div>

      {/* 2×3 Grid with vertical scroll */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-6 flex-1 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
        {speakers.map((speaker, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center text-center"
          >
            {/* Photo */}
            <img
              src={speaker.image}
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
            <span className={`mt-1 px-3 py-0.5 border rounded-full text-[8px] font-black uppercase tracking-widest ${speaker.badgeColor}`}>
              {speaker.badge}
            </span>
          </div>
        ))}
      </div>

      {/* Pagination dots */}
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
