import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SERVER_URL } from '@/lib/api';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface BlogExpertsProps {
  experts: any[];
}

const BlogExperts: React.FC<BlogExpertsProps> = ({ experts }) => {
  const [isPaused, setIsPaused] = useState(false);

  // Triple the experts for a seamless infinite loop
  const marqueeExperts = [...experts, ...experts, ...experts];

  return (
    <section className="py-2 bg-slate-50/80 overflow-hidden">
      <div className="max-w-[1380px] mx-auto px-5 md:px-12 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-[#00df82] rounded-full" />
            <h2 className="text-[#001529] text-2xl font-medium tracking-tight">Voices of Experts</h2>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/experts" className="flex items-center gap-2 text-slate-400 text-md font-medium hover:text-[#00df82] transition-colors">
              View all experts <ArrowRight size={14} />
            </Link>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 hover:bg-[#001529] hover:text-white transition-all shadow-sm">
                <ChevronLeft size={16} />
              </button>
              <button className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 hover:bg-[#001529] hover:text-white transition-all shadow-sm">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Infinite Marquee Container */}
      <div className="max-w-[1380px] mx-auto px-5 md:px-12">
        <div
          className="relative flex overflow-hidden group rounded-[32px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            className="flex gap-6 py-4 px-4"
            animate={{
              x: isPaused ? undefined : ["0%", "-33.33%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
            style={{ width: 'fit-content' }}
          >
            {marqueeExperts.map((expert, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 w-[300px] shrink-0 flex flex-col group/card"
              >
                {/* Top Row: Photo & Info */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-20 h-20 rounded-full border-4 border-slate-50 shadow-md overflow-hidden shrink-0">
                    <img
                      src={expert.image.startsWith('http') ? expert.image : `${SERVER_URL}${expert.image}`}
                      alt={expert.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[#001529] font-medium text-sm mb-1">{expert.name}</h3>
                    <p className="text-slate-400 text-[11px] font-medium leading-tight">
                      {expert.role || "Expert Advisor"}
                    </p>
                  </div>
                </div>

                {/* Headline */}
                <div className="flex-1">
                  <h4 className="text-[#001529] font-medium text-sm leading-tight mb-6 group-hover/card:text-[#00df82] transition-colors line-clamp-2">
                    {expert.insightTitle || expert.insight || "Strengthening Healthcare Systems for Viksit Bharat"}
                  </h4>
                </div>

                {/* Read More Link */}
                <Link
                  to={`/blog/${expert.linkedArticleSlug || '#'}`}
                  className="flex items-center gap-2 text-[#00df82] font-medium text-xs hover:gap-3 transition-all"
                >
                  Read More <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </motion.div>

          {/* Gradient overlays for smooth fading edges */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />
        </div>
      </div>
    </section>
  );
};

export default BlogExperts;
