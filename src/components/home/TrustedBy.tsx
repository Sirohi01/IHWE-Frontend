import React, { useState, useEffect } from 'react';
import { 
  Stethoscope, Landmark, Leaf, Globe, Building2, GraduationCap, 
  Users, Handshake, Package, Sparkles, Camera, ShieldCheck, UserCheck, Activity, Award, Briefcase
} from "lucide-react";
import { supportedByApi } from "../../lib/api";
import SectionContainer from "../layout/SectionContainer";

const ICON_MAP: Record<string, React.ReactNode> = {
  Stethoscope: <Stethoscope size={28} className="text-emerald-700" />,
  Landmark: <Landmark size={28} className="text-blue-700" />,
  Leaf: <Leaf size={28} className="text-green-600" />,
  Globe: <Globe size={28} className="text-indigo-600" />,
  Building2: <Building2 size={28} className="text-red-600" />,
  GraduationCap: <GraduationCap size={28} className="text-amber-600" />,
  Users: <Users size={28} className="text-slate-600" />,
  Handshake: <Handshake size={28} className="text-teal-600" />,
  Package: <Package size={28} className="text-orange-600" />,
  Sparkles: <Sparkles size={28} className="text-yellow-600" />,
  Camera: <Camera size={28} className="text-pink-600" />,
  ShieldCheck: <ShieldCheck size={28} className="text-cyan-600" />,
  UserCheck: <UserCheck size={28} className="text-lime-600" />,
  Activity: <Activity size={28} className="text-rose-600" />,
  Award: <Award size={28} className="text-purple-600" />,
  Briefcase: <Briefcase size={28} className="text-brown-600" />,
};

const TrustedBy = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await supportedByApi.get();
        if (data) {
          setData(data);
        }
      } catch (err) {
        console.error("Error fetching supported-by data:", err);
      }
    };
    fetchData();
  }, []);

  if (!data) return null;

  const items = data.items || [];
  const sortedItems = [...items].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div 
      className="relative z-40 w-full py-2 md:py-1 border-y border-white/5 shadow-xl transition-colors duration-500"
      style={{ backgroundColor: data.bgColor || '#23471d' }}
    >
      <SectionContainer>
        
        {/* Row 1: Centered Heading - Glassmorphism Blur Effect */}
        <div className="relative -top-7 md:-top-10 flex items-center justify-center gap-2 md:gap-4 mb-2 md:mb-0 w-full max-w-2xl mx-auto z-50">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-orange-500/40 to-orange-500" />
          <div 
            className="flex items-center px-4 md:px-6 py-0.5 md:py-1 backdrop-blur-md rounded-full border border-white/10 shadow-lg"
            style={{ backgroundColor: `${data.bgColor}ee` || '#23471dee' }}
          >
             <p className="text-[8px] md:text-[11px] font-bold uppercase tracking-[0.2em] md:tracking-[0.35em] text-white whitespace-nowrap">
               {data.title || 'Supported By'}
             </p>
          </div>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-orange-500/40 to-orange-500" />
        </div>

        {/* Row 2: Grid Items */}
        <div className="flex items-center justify-center w-full mt-2 md:-mt-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:flex xl:flex-nowrap items-center justify-center gap-x-4 md:gap-x-8 gap-y-4 md:gap-y-2 w-full">
            {sortedItems.map((item, i) => (
              <div key={item._id || i} className="flex items-center justify-start sm:justify-center xl:justify-start">
                <div className="flex items-center gap-2 md:gap-2.5 group transition-all duration-300">
                  <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 shadow-md bg-white transition-all duration-500`}>
                    <div className="scale-[0.4] md:scale-[0.5] group-hover:scale-[0.6] transition-transform duration-500">
                        {ICON_MAP[item.icon] || <Globe size={28} className="text-gray-400" />}
                    </div>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-tight text-white leading-tight break-words">
                      {item.label}
                    </p>
                    <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-tight text-white/70 leading-tight break-words">
                      {item.label2}
                    </p>
                  </div>
                </div>
                {i < sortedItems.length - 1 && (
                  <div className="hidden xl:block w-px h-5 bg-white/10 flex-shrink-0 mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>

      </SectionContainer>
    </div>
  );
};

export default TrustedBy;