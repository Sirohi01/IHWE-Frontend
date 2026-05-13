import React from "react";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import SectionContainer from "@/components/layout/SectionContainer";

const Dont = () => {
    const navigate = useNavigate();
    return (
        <div
            className={`relative overflow-hidden rounded-xl py-3 ${SectionContainer}`}
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
                    <div className="text-xl font-base text-[#1a3d20] uppercase tracking-wide leading-tight">
                        Don't Miss The Opportunity To Grow Your Business!
                    </div>
                    {/* <div className="text-2xl font-medium text-[#1a3d20] uppercase tracking-wide leading-tight">
                        To Grow Your Business!
                    </div> */}
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-4 relative z-10">
                    <button
                        onClick={() => navigate('/buyer-registration')}
                        className="flex items-center gap-2 bg-[#1e4020] text-white text-sm font-bold uppercase tracking-widest px-8 py-3 rounded-xl cursor-pointer whitespace-nowrap hover:bg-[#163015] transition-all duration-300 border-none shadow-[0_8px_20px_rgba(30,64,32,0.4)] hover:shadow-[0_12px_25px_rgba(30,64,32,0.6)] hover:-translate-y-1"
                    >
                        <User size={16} color="#fff" strokeWidth={2} />
                        REGISTER AS BUYER
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Dont;