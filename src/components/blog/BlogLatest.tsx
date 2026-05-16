import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { SERVER_URL } from '@/lib/api';
import { Play, Calendar, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface BlogLatestProps {
  blogs: any[];
  type: 'latest' | 'videos';
}

const BlogLatest: React.FC<BlogLatestProps> = ({ blogs, type }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const mainBlog = blogs[0];

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const videos = [
    { title: "The Next Frontier in Biotechnology", duration: "3:45", image: "https://cdn.pixabay.com/video/2016/09/13/5192-183786490_tiny.jpg" },
    { title: "Women Leadership in Healthcare", duration: "4:12", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" },
    { title: "Planetary Health: Act Now", duration: "5:10", image: "https://images.unsplash.com/photo-1530973428-5bf2db2e4d71?auto=format&fit=crop&q=80&w=800" },
  ];

  if (type === 'latest') {
    return (
      <div className="w-full flex flex-col h-[420px]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-1 h-5 bg-[#00df82] rounded-full" />
            <h2 className="text-[#001529] text-lg font-medium tracking-tight">Latest from IHWE</h2>
          </div>
          <Link to="/blog" className="flex items-center gap-1 text-slate-400 text-[10px] font-medium hover:text-[#00df82] transition-colors">
            View all <ArrowRight size={12} />
          </Link>
        </div>

        {mainBlog && (
          <Link
            to={`/blog/${mainBlog.slug}`}
            className="group flex flex-col bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 h-full"
          >
            <div className="relative aspect-video overflow-hidden shrink-0">
              <img
                src={`${SERVER_URL}${mainBlog.image}`}
                alt={mainBlog.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute bottom-3 left-3">
                <span className="bg-[#00df82] text-[#001529] text-[8px] font-medium uppercase tracking-widest px-2.5 py-1.5 rounded shadow-lg">
                  CONFERENCE
                </span>
              </div>
            </div>
            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-[#001529] font-medium text-sm leading-tight mb-2 group-hover:text-[#00df82] transition-colors line-clamp-2">
                {mainBlog.title}
              </h3>
              <p className="text-slate-500 text-[11px] font-medium leading-relaxed line-clamp-3 mb-4">
                {mainBlog.excerpt}
              </p>
              <div className="mt-auto flex items-center gap-2.5 text-slate-400 text-[13px] font-medium">
                <div className="flex items-center gap-1.5">
                  <Calendar size={16} className="text-[#00df82]" />
                  {new Date(mainBlog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-slate-200 rounded-full" />
                  Business Standard
                </div>
              </div>
            </div>
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="w-full h-[420px] flex flex-col relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[#001529] text-lg font-medium tracking-tight">Video Insights</h2>
        <Link to="/videos" className="flex items-center gap-1 text-slate-400 text-[10px] font-medium hover:text-[#00df82] transition-colors">
          View all <ArrowRight size={12} />
        </Link>
      </div>

      <div className="relative flex-1 group/carousel">
        <div
          ref={scrollRef}
          className="flex gap-3 h-full"
        >
          {videos.map((video, idx) => (
            <div key={idx} className="flex-1 snap-start group cursor-pointer h-full flex flex-col">
              <div className="relative aspect-[3/4.2] rounded-2xl overflow-hidden mb-3 shrink-0 shadow-sm border border-slate-100">
                <img src={video.image} alt={video.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                    <Play size={18} className="text-white fill-white ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[9px] font-medium px-1.5 py-0.5 rounded">
                  {video.duration}
                </div>
              </div>
              <h4 className="text-[#001529] font-medium text-xs leading-tight group-hover:text-[#00df82] transition-colors line-clamp-2">
                {video.title}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogLatest;
