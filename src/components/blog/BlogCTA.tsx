import React from 'react';
import { Megaphone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogCTA: React.FC = () => {
  return (
    <section className="pt-0 pb-3 bg-white">
      <div className="container mx-auto px-5 md:px-12">

        {/* Main CTA Bar */}
        <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-r from-[#001529] via-[#002a4d] to-[#001529] p-4 md:p-5 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">

          {/* Left: Icon and Text */}
          <div className="flex items-center gap-6 md:gap-10">
            {/* Icon with subtle glow */}
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-white/20 blur-xl rounded-full" />
              <Megaphone className="text-white relative z-10 w-10 h-10 md:w-12 md:h-12" strokeWidth={1.5} />
            </div>

            <div className="text-center md:text-left">
              <h3 className="text-white font-black text-xl md:text-2xl mb-1 tracking-tight">
                Have a story to share?
              </h3>
              <p className="text-white/60 text-[10px] md:text-xs font-bold uppercase tracking-widest md:tracking-[0.15em]">
                We welcome contributions from industry experts, partners and thought leaders.
              </p>
            </div>
          </div>

          {/* Right: Button */}
          <div className="shrink-0">
            <Link to="/media-registration" target="_blank" rel="noopener noreferrer">
              <button className="bg-gradient-to-r from-[#00df82] to-[#00c572] hover:from-[#00c572] hover:to-[#00df82] text-[#001529] px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center gap-3 shadow-lg shadow-[#00df82]/20 hover:scale-105 active:scale-95">
                CONTRIBUTE NOW <ArrowRight size={18} strokeWidth={3} />
              </button>
            </Link>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-full bg-white/5 skew-x-[45deg] translate-x-16" />
          <div className="absolute bottom-0 left-0 w-24 h-full bg-white/5 skew-x-[45deg] -translate-x-12" />
        </div>

      </div>
    </section>
  );
};

export default BlogCTA;
