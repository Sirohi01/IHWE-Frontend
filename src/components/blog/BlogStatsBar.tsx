import React from 'react';
import { Building2, Users, Globe2, Mic2, CalendarDays, Target } from 'lucide-react';

const BlogStatsBar: React.FC = () => {
  const stats = [
    { value: '500+', label: 'Exhibitors', icon: <Building2 size={32} strokeWidth={1.5} /> },
    { value: '20,000+', label: 'Healthcare Professionals', icon: <Users size={32} strokeWidth={1.5} /> },
    { value: '100+', label: 'Countries', icon: <Globe2 size={32} strokeWidth={1.5} /> },
    { value: '250+', label: 'Speakers', icon: <Mic2 size={32} strokeWidth={1.5} /> },
    { value: '3 Days', label: 'Knowledge & Networking', icon: <CalendarDays size={32} strokeWidth={1.5} /> },
    { value: 'Unlimited', label: 'Opportunities', icon: <Target size={32} strokeWidth={1.5} /> },
  ];

  return (
    <section className="bg-gradient-to-r from-[#008080] via-[#2E4A9E] to-[#8A2BE2] py-4 relative overflow-hidden">
      {/* Subtle Overlay Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      
      <div className="container mx-auto px-5 md:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex items-center gap-3 text-white group relative">
              <div className="opacity-70 group-hover:opacity-100 transition-opacity shrink-0">
                {React.cloneElement(stat.icon as React.ReactElement, { size: 24 })}
              </div>
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-medium leading-none mb-0.5">{stat.value}</span>
                <span className="text-[9px] md:text-[10px] font-medium uppercase tracking-wide opacity-70 leading-tight">
                  {stat.label}
                </span>
              </div>
              {/* Vertical Divider for Desktop */}
              {idx < stats.length - 1 && (
                <div className="hidden lg:block h-10 w-[1px] bg-white/20 absolute right-[-16px] top-1/2 -translate-y-1/2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogStatsBar;
