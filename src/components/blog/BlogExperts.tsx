import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SERVER_URL } from '@/lib/api';

interface BlogExpertsProps {
  experts: any[];
}

const BlogExperts: React.FC<BlogExpertsProps> = ({ experts }) => {
  const [isPaused, setIsPaused] = useState(false);
  // Duplicate experts for smooth infinite marquee
  const marqueeExperts = [...experts, ...experts, ...experts, ...experts];

  return (
    <section className="pt-2 pb-2 bg-[#f8faf9] border-y border-slate-100 overflow-hidden">
      <div className="container mx-auto px-5 md:px-12 mb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-[#00df82] rounded-full" />
            <h2 className="text-[#001529] text-xl font-black uppercase tracking-tight">INSIGHTS FROM EXPERTS</h2>
          </div>
        </div>
      </div>

      {/* Infinite Marquee Container */}
      <div 
        className="relative flex overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div 
          className="flex gap-6 py-4 px-4"
          animate={{
            x: isPaused ? undefined : [-2400, 0], 
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 50, 
              ease: "linear",
            },
          }}
          style={{ width: 'fit-content' }}
        >
          {marqueeExperts.map((expert, idx) => (
            <div 
              key={idx}
              className="group flex flex-col bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden w-[320px] shrink-0 p-5"
            >
              <div className="flex items-start gap-4 mb-4">
                <img 
                  src={expert.image.startsWith('http') ? expert.image : `${SERVER_URL}${expert.image}`} 
                  alt={expert.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-slate-50"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-[#001529] font-black text-sm mb-0.5 truncate">{expert.name}</h3>
                  <p className="text-blue-600 text-[10px] font-bold mb-0.5 truncate">{expert.role}</p>
                  <p className="text-slate-400 text-[9px] font-bold uppercase tracking-tight truncate">
                    {expert.organization || "Independent Advisor"}
                  </p>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-slate-600 text-xs font-medium leading-relaxed italic mb-4 line-clamp-3">
                  "{expert.insight}"
                </p>
                {expert.linkedArticleSlug && (
                  <Link 
                    to={`/blog/${expert.linkedArticleSlug}`}
                    className="text-[#00df82] font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all"
                  >
                    Read Insight <div className="w-4 h-0.5 bg-[#00df82] transition-all group-hover:w-6" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Gradient overlays for smooth fading edges */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#f8faf9] to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#f8faf9] to-transparent z-10" />
      </div>
    </section>
  );
};

export default BlogExperts;
