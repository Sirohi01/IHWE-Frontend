import React from "react";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";

const Dont = () => {
    const navigate = useNavigate();
    return (
        <div
            className="relative overflow-hidden rounded-xl px-10 py-4"
            style={{
                backgroundImage: "url('/bsmeet/dontBg.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                fontFamily: "'Barlow', sans-serif",
            }}
        >
            <div className="flex justify-between items-center px-20">

                {/* Heading */}
                <div className="relative z-10">
                    <div className="text-xl font-medium text-[#1a3d20] uppercase tracking-wide leading-tight">
                        Don't Miss The Opportunity
                    </div>
                    <div className="text-2xl font-medium text-[#1a3d20] uppercase tracking-wide leading-tight">
                        To Grow Your Business!
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-4 relative z-10">
                    <button
                        onClick={() => navigate('/buyer-registration')}
                        className="flex items-center gap-2 bg-[#1e4020] text-white text-sm font-medium uppercase tracking-widest px-6 py-2 rounded-lg cursor-pointer whitespace-nowrap hover:bg-[#163015] transition border-none"
                    >
                        <User size={16} color="#fff" strokeWidth={2} />
                        Register Now
                    </button>

                    {/* Book Your Slot — commented out */}
                    {/* <button className="flex items-center gap-2 bg-white text-[#1a3d20] text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-lg cursor-pointer whitespace-nowrap border border-[#b0c8a0] hover:bg-gray-50 transition">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a3d20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        Book Your Slot
                    </button> */}
                </div>

            </div>
        </div>
    );
};

export default Dont;