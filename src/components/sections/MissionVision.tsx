import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import { visionMissionApi } from '@/lib/api';

interface ContentBlock {
  title: string;
  icon: string;
  description: string;
  highlightText: string;
}

interface VisionMissionData {
  mission: ContentBlock;
  vision: ContentBlock;
  backgroundColor: string;
}

const MissionVision: React.FC = () => {
  const [data, setData] = useState<VisionMissionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await visionMissionApi.get();
        if (result) {
          setData(result);
        }
      } catch (error) {
        console.error("Error fetching Vision & Mission data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderDescription = (text: string, highlight: string) => {
    if (!highlight || !text.includes(highlight)) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <>
        {parts.map((part, index) => 
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={index} className="text-[#d26019] font-medium">{part}</span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  if (loading) {
    return (
      <div className="py-16 flex justify-center items-center bg-[#23471d]">
        <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!data) return null;

  const IconCompMission = (LucideIcons as any)[data.mission.icon] || LucideIcons.Target;
  const IconCompVision = (LucideIcons as any)[data.vision.icon] || LucideIcons.Milestone;

  return (
    <section 
      className="py-8 text-white relative overflow-hidden"
      style={{ backgroundColor: data.backgroundColor }}
    >
      <div className="absolute right-0 top-0 w-1/3 h-full bg-white/5 skew-x-12 transform origin-top" />
      <div className="absolute left-0 bottom-0 w-1/4 h-full bg-white/3 -skew-x-12 transform origin-bottom" />
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="grid md:grid-cols-2 gap-10 items-start">

       
                 {/* OUR VISION */}
          <div className="text-left" data-aos="fade-left">
            <IconCompVision className="w-8 h-8 text-[#d26019] mb-3" />
            <h2 className="text-xl md:text-2xl font-inter mb-4">{data.vision.title}</h2>
            <div className="text-base md:text-lg font-light leading-relaxed opacity-90 prose prose-invert max-w-none text-justify"
              style={{ textAlign: 'justify' }}
              dangerouslySetInnerHTML={{ __html: data.vision.description }} />
          </div>

             {/* DIVIDER */}
          <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-3/4 bg-white/20" />



             {/* OUR MISSION */}
          <div className="text-left" data-aos="fade-right">
            <IconCompMission className="w-8 h-8 text-[#d26019] mb-3" />
            <h2 className="text-xl md:text-2xl font-inter mb-4">{data.mission.title}</h2>
            <div className="text-base md:text-lg font-light leading-relaxed opacity-90 prose prose-invert max-w-none text-justify"
              style={{ textAlign: 'justify' }}
              dangerouslySetInnerHTML={{ __html: data.mission.description }} />
          </div>


        </div>
      </div>
    </section>
  );
};

export default MissionVision;
