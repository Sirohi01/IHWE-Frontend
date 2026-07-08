import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText, Send, Share2 } from 'lucide-react';
import bannerImg from '../../assets/banner2.png';

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BrochureModal: React.FC<BrochureModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-3xl shadow-2xl overflow-hidden max-w-lg w-full z-[110]"
          >
            {/* Close Button - Using the requested slate/red style initially */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all duration-300 z-50 group"
            >
              <X className="w-5 h-5" />
              <span className="absolute right-full mr-2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                CLOSE
              </span>
            </button>

            {/* Banner Image Container */}
            <div className="relative h-56 md:h-64 overflow-hidden">
              <img loading="lazy" decoding="async" src={bannerImg} 
                alt="IHWE 2026 Brochure" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-1 bg-[#23471d] rounded-full" />
                  <span className="text-[#f5c842] font-black text-[12px] uppercase tracking-wider">Exclusive Content</span>
                </div>
                <h3 className="text-white font-black text-2xl leading-tight">
                  IHWE 2026 <br /> 
                  <span className="text-[#a4c639]">Official Brochure</span>
                </h3>
              </div>
            </div>

            {/* Content & Buttons */}
            <div className="p-8 bg-white">
              <p className="text-slate-600 text-[14px] leading-relaxed mb-8">
                Get comprehensive insights into the 9th International Health & Wellness Expo. Download our official brochure to explore exhibition categories, industry zones, and partnership opportunities.
              </p>

              <div className="flex flex-col gap-3">
                {/* Button 1: Main Action */}
                <button className="flex items-center justify-center gap-3 w-full bg-[#23471d] text-white font-black py-4 rounded-2xl hover:bg-[#2d5c1e] transition-all duration-300 shadow-lg shadow-green-900/20 group">
                  <Download className="w-5 h-5 group-hover:bounce" />
                  DOWNLOAD BROCHURE
                </button>

                <div className="grid grid-cols-2 gap-3">
                  {/* Button 2: Secondary */}
                  <button className="flex items-center justify-center gap-2 bg-slate-50 text-slate-700 font-bold py-3.5 rounded-2xl border border-slate-200 hover:bg-slate-100 transition-all duration-300">
                    <FileText className="w-4 h-4 text-[#d26019]" />
                    VIEW DETAILS
                  </button>
                  
                  {/* Button 3: Tertiary */}
                  <button className="flex items-center justify-center gap-2 bg-slate-50 text-slate-700 font-bold py-3.5 rounded-2xl border border-slate-200 hover:bg-slate-100 transition-all duration-300">
                    <Send className="w-4 h-4 text-[#3b82f6]" />
                    CONTACT US
                  </button>
                </div>
              </div>

              {/* Footer text */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-4 text-slate-400">
                <div className="flex items-center gap-1">
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Share with others</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BrochureModal;
