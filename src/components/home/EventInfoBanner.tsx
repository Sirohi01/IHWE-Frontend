import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Globe, Trophy, ArrowRight, Leaf } from 'lucide-react';

const EventInfoBanner = () => {
  return (
    <section className="w-full bg-white pt-2 pb-0">
      <div className="w-full relative overflow-hidden bg-gradient-to-r from-[#0b2912] via-[#0e3a19] to-[#0b2912] shadow-lg">
        
        {/* Decorative Leaves */}
        <div className="absolute left-[-20px] bottom-[-10px] opacity-10 rotate-45">
          <Leaf className="w-24 h-24 text-white fill-white" />
        </div>
        <div className="absolute right-[-20px] top-[-10px] opacity-10 -rotate-12">
          <Leaf className="w-24 h-24 text-white fill-white" />
        </div>

        <div className="relative z-10 flex flex-wrap xl:flex-nowrap items-center justify-between gap-4 p-3 xl:px-12">
          
          {/* Date */}
          <div className="flex items-center gap-3 border-r border-white/10 pr-6">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md shrink-0">
              <Calendar className="w-5 h-5 text-[#0b2912]" />
            </div>
            <div>
              <p className="text-[18px] font-bold text-white leading-none">21 – 23</p>
              <p className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider">AUGUST 2026</p>
            </div>
          </div>

          {/* Venue */}
          <div className="flex items-center gap-3 border-r border-white/10 pr-6">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md shrink-0">
              <MapPin className="w-5 h-5 text-[#0b2912]" />
            </div>
            <div>
              <p className="text-[14px] font-bold text-white leading-tight uppercase tracking-tight">PRAGATI MAIDAN</p>
              <p className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider">NEW DELHI, INDIA</p>
            </div>
          </div>

          {/* Global Edition */}
          <div className="flex items-center gap-3 border-r border-white/10 pr-6">
            <div className="w-10 h-10 bg-[#ff6b00] rounded-lg flex items-center justify-center shadow-md shrink-0">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-[14px] font-bold text-white leading-tight uppercase tracking-tight">GLOBAL EDITION</p>
              <p className="text-[9px] font-semibold text-gray-300 leading-tight max-w-[130px]">CONNECTING THE WORLD OF HEALTH & WELLNESS</p>
            </div>
          </div>

          {/* Tagline */}
          <div className="flex items-center gap-3 flex-grow">
            <Trophy className="w-8 h-8 text-[#facc15] shrink-0" />
            <div>
              <p className="text-[13px] font-bold text-white uppercase leading-tight tracking-tight">BE PART OF INDIA'S BIGGEST</p>
              <p className="text-[15px] font-bold text-[#86efac] leading-none uppercase tracking-tighter">HEALTH & WELLNESS SHOW!</p>
            </div>
          </div>

          {/* CTA Button */}
          <Link to="/book-a-stand">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#ff6b00] text-white px-6 py-2.5 rounded-[1rem] font-bold text-[13px] flex items-center gap-2.5 shadow-xl hover:bg-[#e65f00] transition-all shrink-0 whitespace-nowrap mr-6"
            >
              BOOK YOUR STALL NOW!
              <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                <ArrowRight className="w-3.5 h-3.5 text-[#ff6b00]" />
              </div>
            </motion.button>
          </Link>

        </div>
      </div>
    </section>
  );
};

export default EventInfoBanner;
