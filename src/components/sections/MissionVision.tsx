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
        if (result) setData(result);
      } catch (error) {
        console.error('Error fetching Vision & Mission data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center" style={{ background: '#0d2a1e' }}>
        <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) return null;

  const IconCompMission = (LucideIcons as any)[data.mission.icon] || LucideIcons.Shield;
  const IconCompVision = (LucideIcons as any)[data.vision.icon] || LucideIcons.Sun;

  const visionPills = ['Preventive Healthcare', 'Holistic Wellness', 'Sustainable Living'];
  const missionPills = ['AYUSH', 'Digital Health', 'Wellness Innovation'];

  return (
    <section
      className="py-10 relative overflow-hidden"
      style={{ background: '#0d2a1e', fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Glow accents */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(190,130,60,0.08) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
      <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(80,200,120,0.06) 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-[1fr_1px_1fr] gap-x-10 items-start">

          {/* Vision */}
          <div className="" data-aos="fade-up">
            {/* <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-5"
              style={{ border: '1px solid rgba(200,160,85,0.3)' }}>
              <IconCompVision size={18} style={{ color: '#c8a055' }} />
            </div> */}
            <p className="text-xs font-medium tracking-widest mb-3 flex items-center gap-2"
              style={{ color: '#c8a055', letterSpacing: '1.8px', textTransform: 'uppercase' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
              {data.vision.title}
            </p>
            <h2 className="text-2xl font-semibold mb-4 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif", color: '#f0ece3' }}>
              India as a Global Wellness Hub
            </h2>
            <div
              className="text-sm leading-relaxed mb-3"
              style={{ color: 'rgba(240,236,227,0.68)', fontWeight: 300 }}
              dangerouslySetInnerHTML={{ __html: data.vision.description }}
            />
            <div className="flex flex-wrap gap-2 mt-4">
              {visionPills.map((p) => (
                <span key={p} className="rounded-full px-3 py-1 text-xs"
                  style={{ background: 'rgba(200,160,85,0.1)', border: '1px solid rgba(200,160,85,0.2)', color: 'rgba(200,160,85,0.9)' }}>
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block self-stretch my-2" style={{ background: 'rgba(255,255,255,0.1)' }} />

          {/* Mission */}
          <div className="" data-aos="fade-up" data-aos-delay="100">
            {/* <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-5"
              style={{ border: '1px solid rgba(200,160,85,0.3)' }}>
              <IconCompMission size={18} style={{ color: '#c8a055' }} />
            </div> */}
            <p className="text-xs font-medium tracking-widest mb-3 flex items-center gap-2"
              style={{ color: '#c8a055', letterSpacing: '1.8px', textTransform: 'uppercase' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
              {data.mission.title}
            </p>
            <h2 className="text-2xl font-semibold mb-4 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif", color: '#f0ece3' }}>
              World-Class B2B Health Platform
            </h2>
            <div
              className="text-sm leading-relaxed mb-3"
              style={{ color: 'rgba(240,236,227,0.68)', fontWeight: 300 }}
              dangerouslySetInnerHTML={{ __html: data.mission.description }}
            />
            <div className="flex flex-wrap gap-2 mt-4">
              {missionPills.map((p) => (
                <span key={p} className="rounded-full px-3 py-1 text-xs"
                  style={{ background: 'rgba(200,160,85,0.1)', border: '1px solid rgba(200,160,85,0.2)', color: 'rgba(200,160,85,0.9)' }}>
                  {p}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MissionVision;