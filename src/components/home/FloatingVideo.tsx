import React, { useState, useEffect } from 'react';
import { X, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { floatingVideoApi, SERVER_URL } from '@/lib/api';

const FloatingVideo: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videos, setVideos] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rotationTimer, setRotationTimer] = useState(7);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [v, t] = await Promise.all([
          floatingVideoApi.getAll(),
          floatingVideoApi.getSettings()
        ]);
        setVideos(v.filter((vid: any) => vid.status === 'active'));
        setRotationTimer(t);
      } catch (error) {
        console.error("Error fetching floating videos:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (videos.length > 1 && !isModalOpen) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % videos.length);
      }, rotationTimer * 1000);
      return () => clearInterval(interval);
    }
  }, [videos, rotationTimer, isModalOpen]);

  if (!isVisible || videos.length === 0) return null;

  const currentVideo = videos[currentIndex];

  return (
    <>
      {/* Floating Preview Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentVideo._id}
          initial={{ opacity: 0, x: 50, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 50, scale: 0.8 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed bottom-1 right-1 z-[9999] w-[100px] md:w-[130px] aspect-[9/16] bg-black shadow-2xl border-2 border-white/20 overflow-hidden group rounded-lg"
        >
          {/* Video Thumbnail (Auto-playing Preview) */}
          <div className="relative w-full h-full cursor-pointer" onClick={() => setIsModalOpen(true)}>
            <video
              key={`${currentVideo._id}-preview`}
              src={`${SERVER_URL}${currentVideo.videoUrl}#t=0.1`}
              muted
              playsInline
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
            />
            
            {/* Video Title - Now at the top */}
            <div className="absolute top-0 left-0 right-0 p-2 bg-gradient-to-b from-black/80 to-transparent z-10">
              <p className="text-[8px] md:text-[9px] text-white font-black uppercase tracking-[0.15em] text-center leading-tight drop-shadow-lg">
                {currentVideo.title || "Watch Highlights"}
              </p>
            </div>

            {/* Play Button - Bottom Right */}
            <div className="absolute bottom-9 right-2 pointer-events-none">
              <div className="w-7 h-7 bg-[#d26019] text-white rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                <Play size={12} fill="currentColor" className="ml-[1px]" />
              </div>
            </div>

            {/* White Band - Name and Company */}
            <div className="absolute bottom-0 left-0 right-0 bg-white py-1 px-1 border-t border-gray-100 flex flex-col items-center justify-center min-h-[28px]">
              {currentVideo.name && (
                <p className="text-[9px] md:text-[10px] text-gray-900 font-black uppercase tracking-tight text-center leading-none truncate w-full px-1">
                  {currentVideo.name}
                </p>
              )}
              {currentVideo.companyName && (
                <p 
                  className="text-[7px] md:text-[8px] font-bold uppercase tracking-tighter text-center leading-tight mt-0.5 truncate w-full px-1"
                  style={{ color: currentVideo.companyNameColor === 'green' ? '#23471d' : '#d26019' }}
                >
                  {currentVideo.companyName}
                </p>
              )}
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
        </motion.div>
      </AnimatePresence>

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
                src={`${SERVER_URL}${currentVideo.videoUrl}`}
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
