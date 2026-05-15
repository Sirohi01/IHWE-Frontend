import React from 'react';
import { Megaphone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogCTA: React.FC = () => {
  return (
    <section className="pt-0 pb-3 bg-white">
      <div className="container mx-auto px-5 md:px-12">

        {/* Main CTA Bar */}
        <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-r from-[#f0fdf4] via-[#dcfce7] to-[#f0fdf4] border border-emerald-100 py-2.5 px-6 flex flex-col md:flex-row items-center justify-between gap-3 shadow-xl">

          {/* Left: Icon and Text */}
          <div className="flex items-center gap-4 md:gap-8">
            {/* Icon with subtle glow */}
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-[#00df82]/20 blur-xl rounded-full" />
              <Megaphone className="text-[#064e3b] relative z-10 w-6 h-6 md:w-7 md:h-7" strokeWidth={1.5} />
            </div>

            <div className="text-center md:text-left">
              <h3 className="text-[#064e3b] font-black text-lg md:text-xl mb-0.5 tracking-tight">
                Have a story to share?
              </h3>
              <p className="text-[#065f46]/70 text-[9px] md:text-[10px] font-bold uppercase tracking-widest md:tracking-[0.1em]">
                We welcome contributions from industry experts, partners and thought leaders.
              </p>
            </div>
          </div>

          {/* Right: Button */}
          <div className="shrink-0">
            <Link to="/media-registration" target="_blank" rel="noopener noreferrer">
              <button className="bg-gradient-to-r from-[#00df82] to-[#00c572] hover:from-[#00c572] hover:to-[#00df82] text-[#001529] px-5 py-1.5 rounded-lg font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center gap-2 shadow-lg shadow-[#00df82]/20 hover:scale-105 active:scale-95">
                CONTRIBUTE NOW <ArrowRight size={18} strokeWidth={3} />
              </button>
            </Link>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-full bg-[#064e3b]/5 skew-x-[45deg] translate-x-16" />
          <div className="absolute bottom-0 left-0 w-24 h-full bg-[#064e3b]/5 skew-x-[45deg] -translate-x-12" />
        </div>

      </div>
    </section>
  );
};

export default BlogCTA;
