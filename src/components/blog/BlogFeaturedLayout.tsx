import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, Calendar, User, ArrowRight } from 'lucide-react';
import { SERVER_URL } from '@/lib/api';

interface BlogFeaturedLayoutProps {
  featured: any[];
  trending: any[];
}

const BlogFeaturedLayout: React.FC<BlogFeaturedLayoutProps> = ({ featured, trending }) => {
  const mainPost = featured[0];
  const sidePosts = featured.slice(1, 10);

  return (
    <section className="pt-2 pb-4 bg-[#fcfdfc]">
      <div className="container mx-auto px-5 md:px-12">
        {/* Balanced Height Wrapper */}
        <div className="flex flex-col lg:flex-row gap-8 items-stretch h-auto lg:h-[520px]">
          
          {/* 1. Main Featured Card (Left - 45%) */}
          <div className="w-full lg:w-[45%] h-[380px] lg:h-full shrink-0">
            {mainPost && (
              <Link 
                to={`/blog/${mainPost.slug}`}
                className="group relative block w-full h-full rounded-[20px] overflow-hidden shadow-2xl bg-[#001529]"
              >
                <img 
                  src={`${SERVER_URL}${mainPost.image}`} 
                  alt={mainPost.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90"
                />
                
                {/* Top Badge: "FEATURED STORY" - Clean & Precise */}
                <div className="absolute top-0 left-0">
                  <div className="bg-[#001529] text-white text-[10px] font-black uppercase tracking-[0.15em] px-6 py-3 rounded-br-[16px] border-b border-r border-white/10 shadow-lg">
                    FEATURED STORY
                  </div>
                </div>

                {/* Bottom Overlay Content */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-10">
                  <span className="inline-block bg-[#00df82] text-[#001529] text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-md mb-5 shadow-lg">
                    FEATURED
                  </span>
                  
                  <h2 className="text-white text-2xl md:text-3xl font-black mb-3 tracking-tight leading-[1.2] group-hover:text-[#00df82] transition-colors">
                    {mainPost.title}
                  </h2>
                  
                  <p className="text-slate-300 text-sm font-medium line-clamp-2 mb-6 opacity-90 leading-relaxed max-w-xl">
                    {mainPost.excerpt}
                  </p>

                  {/* Metadata Row: Date | Author | Read Time */}
                  <div className="flex items-center gap-4 text-white/70 text-[10px] font-bold border-t border-white/10 pt-6">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} /> {new Date(mainPost.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    <span className="opacity-30 font-light text-base">|</span>
                    <div className="flex items-center gap-2">
                      <User size={14} /> By IHWE Editorial Team
                    </div>
                    <span className="opacity-30 font-light text-base">|</span>
                    <div className="flex items-center gap-2">
                      <Clock size={14} /> {mainPost.readTime || "5 min read"}
                    </div>
                  </div>
                </div>

                {/* Arrow Button */}
                <div className="absolute bottom-10 right-10 w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#001529] shadow-2xl group-hover:scale-110 transition-all duration-300">
                  <ArrowRight size={22} />
                </div>
              </Link>
            )}
          </div>

          {/* 2. Side Stacked Cards (Middle - 30%) - Image Left, Text Right - SCROLLABLE */}
          <div className="w-full lg:w-[30%] h-[380px] lg:h-full overflow-y-auto no-scrollbar flex flex-col gap-6 pr-2">
            {sidePosts.map((post, idx) => (
              <Link 
                key={idx}
                to={`/blog/${post.slug}`}
                className="flex items-center gap-5 group shrink-0"
              >
                <div className="w-20 h-20 md:w-28 md:h-28 shrink-0 rounded-[16px] overflow-hidden bg-slate-100 shadow-md border border-slate-100">
                  <img 
                    src={`${SERVER_URL}${post.image}`} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex-1">
                  <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-500 text-[8px] font-black uppercase tracking-widest rounded-md mb-2">
                    {post.category || "HEALTHCARE"}
                  </span>
                  <h3 className="text-[#001529] font-black text-sm leading-snug group-hover:text-[#00df82] transition-colors mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-3 text-slate-400 text-[9px] font-bold">
                    <span>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span className="opacity-40">|</span>
                    <span>{post.readTime || "4 min read"}</span>
                  </div>
                </div>
              </Link>
            ))}
            
          </div>

          {/* 3. Trending Now (Right - 25%) - SCROLLABLE */}
          <div className="w-full lg:w-[25%] h-[380px] lg:h-full bg-white rounded-[24px] p-8 border border-slate-100 shadow-2xl shadow-slate-200/30 flex flex-col">
            <div className="flex items-center justify-between mb-8 shrink-0">
              <h3 className="text-[#001529] font-black text-lg uppercase tracking-tight">TRENDING NOW</h3>
              <div className="w-8 h-1 bg-[#00df82] rounded-full" />
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar relative">
              <div className="absolute left-[19px] top-4 bottom-4 w-[1px] bg-slate-100 hidden md:block" />

              <div className="flex flex-col gap-10">
                {trending.map((post, idx) => (
                  <Link key={idx} to={`/blog/${post.slug}`} className="flex items-start gap-6 group relative z-10 shrink-0">
                    <div className="w-10 h-10 shrink-0 rounded-full border border-slate-100 bg-white flex items-center justify-center text-[#00df82] font-black text-sm shadow-sm group-hover:border-[#00df82] group-hover:bg-[#00df82] group-hover:text-white transition-all">
                      {idx < 9 ? `0${idx + 1}` : idx + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[#001529] font-black text-[13px] leading-tight group-hover:text-[#00df82] transition-colors mb-2">
                        {post.title}
                      </h4>
                      <span className="text-slate-400 text-[10px] font-bold">
                        {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BlogFeaturedLayout;
