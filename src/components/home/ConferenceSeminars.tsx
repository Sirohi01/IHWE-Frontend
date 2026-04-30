import React from 'react';
import { Leaf, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import learnImg from '@/assets/learn.webp';

const ConferenceSeminars = () => {
  return (
    <section className="bg-[#0b4d17] py-2 px-6 md:px-14 overflow-hidden relative">
      {/* Decorative leaf in background */}
      <div className="absolute right-[-20px] bottom-[-20px] opacity-10 pointer-events-none transform rotate-[15deg]">
        <Leaf className="w-64 h-64 text-white" fill="currentColor" />
      </div>

      <div className="max-w-[1500px] mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        
        {/* LEFT IMAGE BOX */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full lg:w-[40%]"
        >
          <div className="relative rounded-[1.2rem] overflow-hidden border-[5px] border-white/20 shadow-2xl">
            <img 
              src={learnImg} 
              alt="Conference and Seminars" 
              className="w-full h-[200px] object-cover"
            />
          </div>
        </motion.div>

        {/* RIGHT TEXT CONTENT */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full lg:w-[60%] flex flex-col items-start"
        >
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-white/90">Conference & Seminars</span>
            <Leaf className="w-[24px] h-[24px] text-white/90" fill="currentColor" />
          </div>

          <h2 className="text-[24px] md:text-[30px] font-extrabold text-white leading-tight mb-3">
            Learn. Connect. Get Inspired.
          </h2>

          <p className="text-[13px] md:text-[13.5px] text-white/80 leading-relaxed mb-4 max-w-[580px]">
            Join expert-led sessions, panel discussions & thought leadership talks on the latest trends shaping the future of healthcare.
          </p>

          <Link to="/conference">
            <Button className="bg-white hover:bg-gray-50 text-[#0b4d17] px-8 h-10 rounded-xl font-bold uppercase tracking-wider text-[11px] flex items-center gap-3 shadow-xl transition-all group border-none">
              Register For Seminar
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default ConferenceSeminars;
