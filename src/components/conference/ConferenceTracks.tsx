// components/conference/ConferenceTracks.tsx
import React from "react";
import Marquee from "react-fast-marquee";

// Import original images
import imgMedical from "../../assets/confrencetrack/Screenshot 2026-05-01 at 11.42.11 AM.png";
import imgHospital from "../../assets/confrencetrack/Screenshot 2026-05-01 at 11.42.21 AM.png";
import imgAyurveda from "../../assets/confrencetrack/Screenshot 2026-05-01 at 11.42.31 AM.png";
import imgWellness from "../../assets/confrencetrack/Screenshot 2026-05-01 at 11.42.37 AM.png";
import imgPharma from "../../assets/confrencetrack/Screenshot 2026-05-01 at 11.42.55 AM.png";
import imgDigital from "../../assets/confrencetrack/Screenshot 2026-05-01 at 11.43.03 AM.png";
import imgOrganic from "../../assets/confrencetrack/Screenshot 2026-05-01 at 11.43.11 AM.png";
import imgBeauty from "../../assets/confrencetrack/Screenshot 2026-05-01 at 11.43.18 AM.png";

const tracks = [
  // New SVG-based Categories
  {
    line1: "Medical &",
    line2: "Healthcare Industry",
    color: "#f0fdf4",
    iconColor: "#15803d",
    icon: (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
        <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
        <circle cx="20" cy="10" r="2" />
      </svg>
    ),
  },

  // Original Image-based Tracks
  { icon: imgMedical, line1: "Medical Devices &", line2: "Healthcare Innovation", color: "#f0fdf4", iconColor: "#15803d" },
  { icon: imgHospital, line1: "Hospital Infrastructure", line2: "& Smart Healthcare", color: "#eff6ff", iconColor: "#1d4ed8" },
  { icon: imgAyurveda, line1: "Ayurveda, AYUSH &", line2: "Alternative Medicine", color: "#f7fee7", iconColor: "#4d7c0f" },
  { icon: imgWellness, line1: "Wellness, Fitness &", line2: "Preventive Healthcare", color: "#faf5ff", iconColor: "#7e22ce" },
  { icon: imgPharma, line1: "Pharma, Nutraceuticals", line2: "& Diagnostics", color: "#fffbeb", iconColor: "#b45309" },
  { icon: imgDigital, line1: "Digital Health, AI", line2: "& HealthTech", color: "#eef2ff", iconColor: "#3730a3" },
  { icon: imgOrganic, line1: "Organic Living &", line2: "Sustainable Wellness", color: "#f0fdf4", iconColor: "#15803d" },
  { icon: imgBeauty, line1: "Beauty, Personal Care", line2: "& Lifestyle Wellness", color: "#fff1f2", iconColor: "#be123c" },

  {
    line1: "Hospitals &",
    line2: "Clinical Services",
    color: "#eff6ff",
    iconColor: "#1d4ed8",
    icon: (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 7v4" /><path d="M14 21v-3a2 2 0 0 0-4 0v3" /><path d="M14 9h-4" /><path d="M18 11h2a2 2 0 0 1 2-2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2" /><path d="M18 21V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    line1: "AYUSH &",
    line2: "Traditional Medicine",
    color: "#f7fee7",
    iconColor: "#4d7c0f",
    icon: (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 20h10" />
        <path d="M10 20c5.5-2.5.8-6.4 3-10" />
        <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
        <path d="M14.1 6a7 7 0 0 1 1.1 7.7c-1.5 2.9-3.9 4.4-5.7 4.8 2.3-6.2 4-9.2 4.6-12.5z" />
      </svg>
    ),
  },
  {
    line1: "Wellness, Fitness &",
    line2: "Preventive Healthcare",
    color: "#faf5ff",
    iconColor: "#7e22ce",
    icon: (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="2" />
        <path d="M12 8c-2 0-4 1.5-4 3.5 0 1.5 1 2.5 2 3l2 1 2-1c1-.5 2-1.5 2-3 0-2-2-3.5-4-3.5z" />
        <path d="M12 15.5v5" />
        <path d="M9 19h6" />
      </svg>
    ),
  },
  {
    line1: "Beauty, Spa &",
    line2: "Lifestyle Solutions",
    color: "#fff1f2",
    iconColor: "#be123c",
    icon: (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3c-1.5 3-5 5-5 9a5 5 0 0 0 10 0c0-4-3.5-6-5-9z" />
        <path d="M12 17v4" />
        <path d="M9 20h6" />
      </svg>
    ),
  },
  {
    line1: "Digital Health,",
    line2: "HealthTech & AI",
    color: "#eef2ff",
    iconColor: "#3730a3",
    icon: (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8" /><path d="M12 17v4" />
        <path d="M7 8h2v5H7z" />
        <path d="M11 10h2v3h-2z" />
        <path d="M15 6h2v7h-2z" />
      </svg>
    ),
  },
  {
    line1: "Medical Tourism &",
    line2: "Global Healthcare",
    color: "#ecfeff",
    iconColor: "#0891b2",
    icon: (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        <path d="M2 12h20" />
      </svg>
    ),
  },
  {
    line1: "Pharmaceuticals &",
    line2: "Nutraceuticals",
    color: "#fffbeb",
    iconColor: "#b45309",
    icon: (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
        <path d="m8.5 8.5 7 7" />
      </svg>
    ),
  },
  {
    line1: "Organic Living &",
    line2: "Sustainable Wellness",
    color: "#f0fdf4",
    iconColor: "#15803d",
    icon: (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    ),
  },
  {
    line1: "Healthcare",
    line2: "Infrastructure & Equipment",
    color: "#eff6ff",
    iconColor: "#1d4ed8",
    icon: (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        <path d="M10 11h4" /><path d="M12 9v4" />
      </svg>
    ),
  },
  {
    line1: "Rehabilitation, Senior Care",
    line2: "& Mental Wellness",
    color: "#faf5ff",
    iconColor: "#7e22ce",
    icon: (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="2" />
        <path d="M8 22v-8a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <path d="M16 18h4" /><path d="M18 16v4" />
        <path d="M9 22v-4" /><path d="M15 22v-4" />
      </svg>
    ),
  },
  {
    line1: "Women & Child",
    line2: "Healthcare",
    color: "#fff1f2",
    iconColor: "#be123c",
    icon: (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12h.01" /><path d="M15 12h.01" />
        <path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5" />
        <path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5.5 4.5 1.4" />
      </svg>
    ),
  },
  {
    line1: "Alternative Therapies &",
    line2: "Holistic Healing",
    color: "#fffbeb",
    iconColor: "#b45309",
    icon: (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
    ),
  },
  {
    line1: "Health Insurance &",
    line2: "Financial Wellness",
    color: "#ecfeff",
    iconColor: "#0891b2",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    line1: "CSR, Public Health &",
    line2: "Govt. Healthcare Initiatives",
    color: "#eef2ff",
    iconColor: "#3730a3",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];


const marqueeTracks = [...tracks];

const ConferenceTracks: React.FC = () => {
  return (
    <section className="pt-3 pb-4 bg-[#F7F9FC] overflow-hidden " style={{ backgroundColor: "#caf0f8" }}>
      <div className="mx-auto max-w-[1330px] pl-6 lg:pl-2">

        <div className="flex flex-col items-center mb-0">
          <h2 className="text-[24px] font-[900] text-[#0B2C66] uppercase tracking-tight">
            EXPLORE CONFERENCE <span className="text-[#1E88E5]">TRACKS</span>
          </h2>
          <div className="h-1 w-20 bg-[#4E9F3D] mt-0 rounded-full" />
        </div>


        <Marquee
          speed={40}
          pauseOnHover={true}
          pauseOnClick={false}
          direction="left"
          loop={0}
          autoFill={false}
          className="py-2"
        >
          {marqueeTracks.map((track, index) => (
            <div
              key={index}
              className="group w-[150px] md:w-[180px] h-[180px] mx-2 p-0 rounded-[24px] bg-white border border-[#E6ECF3] flex flex-col items-center justify-center text-center hover:shadow-xl hover:border-[#4E9F3D] transition-all duration-300 cursor-pointer shadow-sm"
            >
              <div
                className="w-20 h-20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 rounded-full"
                style={{ backgroundColor: track.color, color: track.iconColor }}
              >
                {typeof track.icon === "string" ? (
                  <img src={track.icon} alt="" className="w-12 h-12 object-contain mix-blend-multiply" />
                ) : (
                  track.icon
                )}
              </div>
              <div className="text-[11px] md:text-[12px] font-bold text-[#1C2B3A] group-hover:text-[#4E9F3D] transition-colors leading-snug">
                <div>{track.line1}</div>
                <div>{track.line2}</div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default ConferenceTracks;