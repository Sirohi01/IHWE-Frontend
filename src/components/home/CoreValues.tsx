import React from 'react';
import { Globe, Users, HeartPulse, Leaf, Building2, Trophy, Handshake, Activity, Stethoscope, Landmark, GraduationCap, Package, Camera, ShieldCheck, UserCheck, Briefcase, Sparkles, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionContainer from '../layout/SectionContainer';
import { useState, useEffect } from "react";
import { integratedFormatApi } from "../../lib/api";

const ICON_MAP: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-4 h-4" />,
  Users: <Users className="w-4 h-4" />,
  HeartPulse: <HeartPulse className="w-4 h-4" />,
  Leaf: <Leaf className="w-4 h-4" />,
  Building2: <Building2 className="w-4 h-4" />,
  Trophy: <Trophy className="w-4 h-4" />,
  Handshake: <Handshake className="w-4 h-4" />,
  Activity: <Activity className="w-4 h-4" />,
  Stethoscope: <Stethoscope className="w-4 h-4" />,
  Landmark: <Landmark className="w-4 h-4" />,
  GraduationCap: <GraduationCap className="w-4 h-4" />,
  Package: <Package className="w-4 h-4" />,
  Camera: <Camera className="w-4 h-4" />,
  ShieldCheck: <ShieldCheck className="w-4 h-4" />,
  UserCheck: <UserCheck className="w-4 h-4" />,
  Briefcase: <Briefcase className="w-4 h-4" />,
  Sparkles: <Sparkles className="w-4 h-4" />,
  Award: <Award className="w-4 h-4" />,
};

const COLORS = ["#0d47a1", "#2f8f3a", "#0d47a1", "#2f8f3a"];

const CoreValues = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await integratedFormatApi.get();
        if (result) setData(result);
      } catch (err) {
        console.error("Error fetching integrated format highlights:", err);
      }
    };
    fetchData();
  }, []);

  if (!data) return null;

  const highlights = data.highlights?.sort((a: any, b: any) => (a.order || 0) - (b.order || 0)) || [];

  return (
    <section className="bg-white pb-2 overflow-hidden">
      <SectionContainer>
        <div className="flex flex-col lg:flex-row gap-0">
          {/* RIGHT CONTENT - Full width row */}
          <div className="w-full border-t border-b border-gray-200 py-3">
            <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-y-10 gap-x-4">
              {highlights.map((item: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 group relative flex-1 min-w-[240px] lg:min-w-0"
                >
                  {/* Icon Container */}
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 rounded-full border-[1px] border-gray-100 flex items-center justify-center bg-white shadow-sm transition-all duration-500 group-hover:shadow-md relative z-10">
                      <div
                        className="w-[85%] h-[85%] rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundColor: COLORS[index % 4], color: '#fff' }}
                      >
                        {/* Smaller icons for tighter fit */}
                        {ICON_MAP[item.icon] || <Globe className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col">
                    <h3 className="text-[11px] font-black tracking-tight text-[#071c3d] mb-0.5">
                      {item.title}
                    </h3>
                    <p className="text-[10px] text-gray-500 font-medium leading-[1.3] max-w-[180px]">
                      {item.description}
                    </p>
                  </div>

                  {/* Vertical Divider */}
                  {index < highlights.length - 1 && (
                    <div className="hidden lg:block h-8 w-[1px] bg-gray-100 absolute -right-2 top-1/2 -translate-y-1/2" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
};

export default CoreValues;
