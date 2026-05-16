import React from 'react';
import { Search, FileText, Users, Globe, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

interface BlogHeroProps {
  settings: any;
  onSearch: (query: string) => void;
  heroImage?: string;
}

const BlogHero: React.FC<BlogHeroProps> = ({ settings, onSearch, heroImage }) => {
  const stats = [
    { label: 'Articles', value: settings?.articlesCount || '250+', icon: <FileText size={18} className="text-rose-500" /> },
    { label: 'Expert Contributors', value: settings?.expertsCount || '50+', icon: <Users size={18} className="text-blue-500" /> },
    { label: 'Countries Covered', value: settings?.countriesCount || '12+', icon: <Globe size={18} className="text-emerald-500" /> },
    { label: 'Updates', value: settings?.updateFrequency || 'Daily', icon: <Calendar size={18} className="text-amber-500" /> },
  ];

  return (
    <section className="relative min-h-[400px] pt-24 pb-12 overflow-hidden bg-[#001529] text-white flex items-center">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        {heroImage && (
          <img
            src={heroImage}
            className="absolute inset-0 w-full h-full object-cover opacity-100"
            alt="Hero Background"
          />
        )}
      </div>

      <div className="container mx-auto px-5 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">

          {/* Left Column: Text & Search */}
          <div className="w-full lg:w-1/2">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[#00df82] font-medium text-xs uppercase tracking-[0.2em] mb-4"
            >
              INSIGHTS & MEDIA
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-medium mb-4 tracking-tight leading-tight text-[#001529]"
            >
              {settings?.heroTitle || "BLOG & NEWS"}
            </motion.h1>

            {/* Green Line */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 60 }}
              className="h-1 bg-[#00df82] mb-8 rounded-full"
            />

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-800 text-base md:text-lg font-medium max-w-lg leading-relaxed mb-6"
            >
              {settings?.heroSubtitle || "Your go-to source for the latest updates, expert insights, industry trends and stories from the world of healthcare, wellness & innovation."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative max-w-md"
            >
              <div className="flex items-center bg-white/60 backdrop-blur-md border border-[#001529]/20 rounded-lg overflow-hidden group focus-within:border-[#00df82]/50 transition-all shadow-lg">
                <input
                  type="text"
                  placeholder="Search articles, news, topics..."
                  className="flex-1 bg-transparent py-2 px-6 text-[#001529] text-sm placeholder:text-[#001529]/40 focus:outline-none font-normal"
                  onChange={(e) => onSearch(e.target.value)}
                />
                <button className="bg-[#00df82] hover:bg-[#00c572] text-[#001529] p-2 transition-colors">
                  <Search className="w-5 h-5" strokeWidth={3} />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Stats Box - Glassmorphism */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end lg:translate-y-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="w-full max-w-md bg-white/40 backdrop-blur-md border border-white/40 rounded-[20px] p-2.5 shadow-xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between relative z-10">
                {stats.map((stat, idx) => (
                  <React.Fragment key={idx}>
                    <div className="flex flex-col items-center text-center flex-1 group">
                      {/* Icon with Glow */}
                      <div className="relative">
                        <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative z-10 opacity-100 transition-all">
                          {stat.icon}
                        </div>
                      </div>

                      {/* Value */}
                      <div className="text-sm md:text-base font-medium text-[#001529] mb-0.5 tracking-tight">
                        {stat.value}
                      </div>

                      {/* Label */}
                      <div className="text-slate-600 text-[8px] font-medium uppercase tracking-wider whitespace-nowrap px-2">
                        {stat.label}
                      </div>
                    </div>

                    {/* Divider - only between items */}
                    {idx < stats.length - 1 && (
                      <div className="h-8 w-[1px] bg-[#001529]/10 mx-1" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BlogHero;
