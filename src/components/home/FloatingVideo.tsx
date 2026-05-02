import React, { useState } from 'react';
import { X, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingVideo: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!isVisible) return null;

  return (
    <>
      {/* Floating Preview Card */}
      <div className="fixed bottom-1 right-1 z-[9999] w-[140px] md:w-[180px] aspect-[9/16] bg-black shadow-2xl border-2 border-white/20 overflow-hidden group rounded-lg">
        {/* Video Thumbnail (Paused Video) */}
        <div className="relative w-full h-full cursor-pointer" onClick={() => setIsModalOpen(true)}>
          <video
            src="/video.mp4"
            muted
            playsInline
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
          />
          
          {/* Centered Play Button */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-12 h-12 bg-[#d26019] text-white rounded-full flex items-center justify-center shadow-xl transform transition-transform duration-300 group-hover:scale-110">
              <Play size={24} fill="currentColor" className="ml-1" />
            </div>
          </div>

          {/* Label Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
            <p className="text-[10px] text-white font-bold uppercase tracking-widest text-center leading-tight">Watch Highlights</p>
          </div>
        </div>

        {/* Close Button (Small Preview) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsVisible(false);
          }}
          className="absolute top-2 right-2 p-1 bg-black/60 hover:bg-red-600 text-white rounded-full transition-colors z-10"
        >
          <X size={14} />
        </button>
      </div>

      {/* Full Screen Video Popup (Modal) */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-10"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl max-h-[85vh] flex items-center justify-center bg-black rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(210,96,25,0.3)] border border-white/10"
            >
              {/* Close Button (Modal) */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-50 w-10 h-10 bg-white/10 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all backdrop-blur-md"
              >
                <X size={24} />
              </button>

              {/* High Quality Video */}
              <video
                src="/video.mp4"
                controls
                autoPlay
                className="w-full h-full max-h-[85vh] object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingVideo;
