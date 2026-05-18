import React from 'react';
import { ArrowRight, Plus } from 'lucide-react';
import lotusImg from '../../assets/blog/outputonlinepngtools.png';

const BlogFooter: React.FC = () => {
  return (
    <footer className="bg-[#010F33] text-white pt-0 pb-0 overflow-hidden">
      <div className="container mx-auto px-5 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-0 mb-4 pb-2">

          {/* Left: Building Illustration */}
          <div className="w-full lg:w-[25%] flex justify-center lg:justify-start pr-6">
            <div className="relative w-full max-w-[240px] h-20 opacity-80">
              <img
                src={lotusImg}
                alt="Lotus Temple"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-[1px] h-12 bg-white/10" />

          {/* Center: CTA */}
          <div className="w-full lg:w-[45%] px-10 py-1 flex flex-col items-start text-left">
            <h3 className="text-[15px] font-medium mb-2 pt-4 leading-tight tracking-tight">
              Be part of the world's leading health & wellness gathering.
            </h3>
            <button className="bg-gradient-to-r from-[#00df82] to-[#3b82f6] text-white font-medium py-2 px-6 rounded-lg uppercase tracking-widest text-[9px] flex items-center gap-2 hover:scale-105 transition-transform shadow-xl shadow-green-500/10">
              REGISTER NOW <ArrowRight size={12} />
            </button>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-[1px] h-12 bg-white/10" />

          {/* Right: Event Info */}
          <div className="w-full lg:w-[30%] pl-10 py-1 flex flex-col items-start lg:items-end text-left lg:text-right">
            <div className="flex flex-col items-start lg:items-end leading-tight uppercase">
              <span className="text-[11px] font-bold tracking-widest text-[#00df82]">International Health & Wellness Expo 2026</span>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-[11px] font-medium tracking-tight">21 - 23 August 2026</span>
                <span className="w-1 h-1 bg-white/20 rounded-full" />
                <span className="text-[11px] font-medium tracking-tight">Pragati Maidan, New Delhi</span>
              </div>
            </div>
          </div>

        </div>



      </div>
    </footer>
  );
};

export default BlogFooter;
