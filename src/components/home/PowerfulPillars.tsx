import { motion } from "framer-motion";
import { Building2, Users, Trophy, Handshake, Leaf, Globe, Activity, Stethoscope, Landmark, GraduationCap, Package, Camera, ShieldCheck, UserCheck, Briefcase, Sparkles, Award } from "lucide-react";
import { useState, useEffect } from "react";
import { integratedFormatApi } from "../../lib/api";

const ICON_MAP: Record<string, React.ReactNode> = {
  Building2: <Building2 className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  Trophy: <Trophy className="w-5 h-5" />,
  Handshake: <Handshake className="w-5 h-5" />,
  Leaf: <Leaf className="w-8 h-8" />,
  Globe: <Globe className="w-5 h-5" />,
  Activity: <Activity className="w-5 h-5" />,
  Stethoscope: <Stethoscope className="w-5 h-5" />,
  Landmark: <Landmark className="w-5 h-5" />,
  GraduationCap: <GraduationCap className="w-5 h-5" />,
  Package: <Package className="w-5 h-5" />,
  Camera: <Camera className="w-5 h-5" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5" />,
  UserCheck: <UserCheck className="w-5 h-5" />,
  Briefcase: <Briefcase className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  Award: <Award className="w-5 h-5" />,
};

const CARD_COLORS = ["#2f8f3a", "#0d47a1", "#d89a00", "#0f8b8d"];

const IntegratedFormatSection = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await integratedFormatApi.get();
        if (result) setData(result);
      } catch (err) {
        console.error("Error fetching integrated format:", err);
      }
    };
    fetchData();
  }, []);

  if (!data) return null;

  const cards = data.cards?.sort((a: any, b: any) => (a.order || 0) - (b.order || 0)) || [];

  return (
    <section className="bg-white pt-16 pb-8 px-6 md:px-14 font-['Inter',sans-serif] overflow-hidden">
      <div className="max-w-[1500px] mx-auto flex flex-col lg:flex-row items-center gap-8">

        {/* LEFT COLUMN - HEADING (Narrower to allow more card width) */}
        <div className="w-full lg:w-[22%] flex flex-col items-start text-left shrink-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-[1.5px] w-10 bg-[#2f8f3a]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#2f8f3a]">
              {data.subtitle}
            </span>
          </div>

          <div className="flex items-end gap-1 mb-5">
            <h2 className="text-[30px] font-black leading-[1.1] tracking-tight strip-editor-bg prose prose-xl max-w-none [&_*]:!bg-transparent inline-block"
                style={{ color: data.leafColor }}>
              <div dangerouslySetInnerHTML={{ __html: data.title }} className="inline" />
              <Leaf className="w-8 h-8 ml-1 inline-block align-baseline flex-shrink-0 transform translate-y-[3px]" style={{ color: data.leafColor, fill: data.leafColor }} />
            </h2>
          </div>

          <div className="flex flex-col gap-5 max-w-[380px] text-[13.5px] leading-[1.6] text-gray-500 font-medium text-justify strip-editor-bg prose prose-sm max-w-none [&_*]:!bg-transparent"
               dangerouslySetInnerHTML={{ __html: data.description }} />
        </div>

        {/* RIGHT COLUMN - CARDS GRID */}
        <div className="w-full lg:w-[75%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-8 lg:pt-0">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative flex flex-col items-start text-left bg-white border-[1.5px] rounded-[1.8rem] px-6 pt-16 pb-12 transition-all duration-300 hover:shadow-xl group h-full"
              style={{
                borderColor: card.color + "50",
                boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"
              }}
            >
              {/* Icon Circle */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border-[4px] border-white shadow-md flex items-center justify-center z-10 overflow-hidden transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: CARD_COLORS[i % 4] }}>
                <div className="absolute inset-0 border-[2px] border-white/20 rounded-full m-1" />
                <div className="relative text-white">
                  {ICON_MAP[card.icon] || <Building2 className="w-5 h-5" />}
                </div>
              </div>

              {/* Card Title */}
              <h3 className="text-[12.5px] font-black uppercase tracking-tight leading-tight mb-1 h-10 flex items-center text-left"
                style={{ color: CARD_COLORS[i % 4] }}>
                {card.title}
              </h3>

              {/* Divider Gap */}
              <div className="mb-1" />

              {/* Description */}
              <p className="text-[11.2px] leading-[2.1] text-gray-600 font-medium tracking-[0.01em]">
                {card.description}
              </p>

              {/* Bottom Tab */}
              <div className="absolute -bottom-[2px] left-1/2 -translate-x-1/2 w-20 h-5 flex items-center justify-center z-30">
                <div className="absolute inset-0 rounded-b-[0.6rem]" style={{ backgroundColor: CARD_COLORS[i % 4] }} />
                <span className="relative text-white font-black text-[10px] tracking-widest">{card.cardNumber}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default IntegratedFormatSection;