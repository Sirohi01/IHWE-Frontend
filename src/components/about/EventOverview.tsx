import React from "react";
import SectionContainer from "@/components/layout/SectionContainer";
import * as LucideIcons from "lucide-react";

interface EventOverviewProps {
  eventOverviewData: any;
}

const EventOverview: React.FC<EventOverviewProps> = ({ eventOverviewData }) => {
  return (
    <section className="pt-4 pb-0 bg-white relative z-10">
      <SectionContainer>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* LEFT - Event Overview */}
          {eventOverviewData && eventOverviewData.title ? (
            <div>
              <p className="text-[#d26019] font-bold text-[13px] uppercase tracking-[0.22em] mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                {eventOverviewData.subtitle}
              </p>
              <h2 className="font-black text-[28px] leading-[1.2] mb-4 text-[#1a2e1a]" style={{ fontFamily: "'Inter', sans-serif" }}>
                {eventOverviewData.title}
              </h2>
              <div 
                className="text-gray-900 text-sm leading-[1.6] mb-3 text-justify strip-editor-bg prose prose-sm max-w-none [&_*]:!bg-transparent" 
                style={{ fontFamily: "'Inter', sans-serif", textAlign: 'justify' }}
                dangerouslySetInnerHTML={{ __html: eventOverviewData.descriptionHtml }}
              />
            </div>
          ) : (
            <div>
              <p className="text-[#d26019] font-bold text-[13px] uppercase tracking-[0.22em] mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                Event Overview
              </p>
              <h2 className="font-black text-[28px] leading-[1.2] mb-4 text-[#1a2e1a]" style={{ fontFamily: "'Inter', sans-serif" }}>
                A Global Platform Connecting Healthcare  Wellness & Business Opportunities
              </h2>
              <p className="text-gray-900 text-sm leading-[1.6] mb-3 text-justify strip-editor-bg" style={{ fontFamily: "'Inter', sans-serif", textAlign: 'justify' }}>
                The International Health & Wellness Expo (IHWE) 2026 is a globally positioned B2B healthcare and wellness exhibition in India, designed to bring together the entire ecosystem of healthcare, AYUSH, wellness, nutrition, medical technology, and preventive healthcare under one integrated platform.
              </p>
              <p className="text-gray-900 text-sm leading-[1.6] mb-3 text-justify strip-editor-bg" style={{ fontFamily: "'Inter', sans-serif", textAlign: 'justify' }}>
                Now in its 9th Edition, IHWE has evolved into a comprehensive business, knowledge, and networking platform, attracting exhibitors, buyers, healthcare professionals, startups, and international delegates from across India and global markets.
              </p>
              <p className="text-gray-900 text-sm leading-[1.6] text-justify strip-editor-bg" style={{ fontFamily: "'Inter', sans-serif", textAlign: 'justify' }}>
                Scheduled from 21st – 23rd August 2026 at Pragati Maidan, New Delhi, the expo is strategically designed to enable business growth, industry collaboration, and global trade opportunities in one high-impact environment.
              </p>
            </div>
          )}

          {/* RIGHT - Key Sectors */}
          <div>
            <p className="text-[#d26019] font-bold text-[13px] uppercase tracking-[0.22em] mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
              {eventOverviewData?.keySectorsTitle || "Key Sectors"}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {(eventOverviewData?.sectors || [
                { label: "Healthcare & Medical Industry", color: "#3b82f6", iconName: "HeartPulse" },
                { label: "AYUSH & Traditional Medicine", color: "#22c55e", iconName: "Sprout" },
                { label: "Wellness, Fitness & Lifestyle", color: "#f59e0b", iconName: "User" },
                { label: "Digital Health, AI & Medical Technology", color: "#8b5cf6", iconName: "MonitorDot" },
                { label: "Medical Tourism in India", color: "#06b6d4", iconName: "Plane" },
                { label: "Nutrition, Organic & Sustainable Living", color: "#10b981", iconName: "Leaf" },
              ]).map((sector: any, i: number) => {
                const Icon = (LucideIcons as any)[sector.iconName] || LucideIcons.HeartPulse;
                return (
                  <div key={i} className="flex flex-col items-center text-center gap-3 p-4 bg-[#f8f9fa] rounded-xl shadow-sm transition-all duration-300 group cursor-default border border-gray-100 hover:border-[#d26019]/30">
                    <div className="transition-transform duration-300 group-hover:scale-110" style={{ color: sector.color }}>
                      <Icon className="w-16 h-16" strokeWidth={1.2} />
                    </div>
                    <span className="text-[#1a2e1a] font-bold text-[11px] leading-[1.4]" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {sector.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
};

export default EventOverview;
