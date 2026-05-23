import React from "react";
import SectionContainer from "@/components/layout/SectionContainer";
import { Users, Building2, Globe, Mic, CalendarDays } from "lucide-react";

const stats = [
    {
        number: "8,000+",
        label: "Visitors / Delegates",
        icon: <Users size={28} strokeWidth={1.6} className="text-[#113F16]" />,
    },
    {
        number: "150+",
        label: "Exhibitors",
        icon: <Building2 size={28} strokeWidth={1.6} className="text-[#113F16]" />,
    },
    {
        number: "1,000+",
        label: "Global Buyes",
        icon: <Globe size={28} strokeWidth={1.6} className="text-[#113F16]" />,
    },
    {
        number: "150+",
        label: "Speakers",
        icon: <Mic size={28} strokeWidth={1.6} className="text-[#113F16]" />,
    },
    {
        number: "3",
        label: "Days of Innovation",
        icon: <CalendarDays size={28} strokeWidth={1.6} className="text-[#113F16]" />,
    },
];

const BottomData = () => {
    return (
        <div className="bg-[#FAFBF6] py-4">


            {/* Stats Card */}
            <div className="bg-white rounded-t-lg px-6 py-1 flex items-center justify-between shadow-sm">
                {stats.map((stat, index) => (
                    <div
                        key={stat.label}
                        className={`flex flex-col items-center flex-1 ${index !== stats.length - 1 ? "border-r border-gray-100" : ""
                            } px-4 py-1`}
                    >
                        {/* Icon container */}
                        <div className="w-12 h-12 rounded-xl bg-[#EBF5EC] border border-[#c5e0c6] flex items-center justify-center mb-2 shadow-sm">
                            {stat.icon}
                        </div>
                        <p className="text-lg font-semibold text-[#113F16] leading-none mb-1">
                            {stat.number}
                        </p>
                        <p className="text-sm text-gray-600 text-center">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Help Bar */}
            <div className="bg-[#1a5c1a] rounded-b-lg px-8 py-3 flex items-center">
                {/* Left: Need Help */}
                <div className="flex items-center gap-4 flex-[1.2] pr-7 border-r border-white/25">
                    <div className="w-13 h-13 border-2 border-white/60 rounded-full flex items-center justify-center flex-shrink-0 p-2.5">
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                            <path d="M5 14 Q5 6 14 6 Q23 6 23 14" stroke="white" strokeWidth="2" fill="none" />
                            <rect x="3" y="13" width="5" height="8" rx="2.5" fill="white" />
                            <rect x="20" y="13" width="5" height="8" rx="2.5" fill="white" />
                            <path d="M23 20 Q23 24 18 24 L16 24" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-white font-bold text-sm">Need Help?</p>
                        <p className="text-white/80 text-xs leading-snug">
                            Our team is here to assist you<br />with your registration.
                        </p>
                    </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-2 flex-1 justify-center px-5 border-r border-white/25 text-white text-sm font-medium">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <polyline points="2,4 12,13 22,4" />
                    </svg>
                    info@ihwe.in
                </div>

                {/* Phone */}
                <div className="flex items-center gap-2 flex-1 justify-center px-5 border-r border-white/25 text-white text-sm font-medium">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    +91 9654900525
                </div>

                {/* Website */}
                <div className="flex items-center gap-2 flex-1 justify-center px-5 text-white text-sm font-medium">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                    www.ihwe.in
                </div>
            </div>


        </div>
    );
};

export default BottomData;