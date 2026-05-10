import { motion } from "framer-motion";
import { Image as ImageIcon, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { API_URL, SERVER_URL } from "@/lib/api";

const AwardsGallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const modalItemsPerPage = 12;

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch(`${API_URL}/awards-gallery`);
        const data = await response.json();
        if (data.success) {
          // Fetch items for the marquee
          setGalleryItems(data.data);
        }
      } catch (error) {
        console.error("Error fetching gallery:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  // Pagination logic for Modal
  const totalPages = Math.ceil(galleryItems.length / modalItemsPerPage);
  const modalStartIndex = (currentPage - 1) * modalItemsPerPage;
  const currentModalItems = galleryItems.slice(modalStartIndex, modalStartIndex + modalItemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const openModal = () => {
    setShowModal(true);
    setCurrentPage(1);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openLightbox = (item) => {
    setSelectedImage(item);
  };

  // Double the items for a seamless loop in marquee
  const marqueeItems = [...galleryItems, ...galleryItems];

  return (
    <section className="pt-2 md:pt-4 pb-1 md:pb-2 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-1"
        >
          <div className="flex items-center justify-center gap-3">
            <div className="h-[2px] w-8 bg-[#1a6b3c]" />
            <span className="text-[#1a6b3c] text-[15px] font-black uppercase tracking-[0.3em]">
              Glimpses of Past Editions
            </span>
            <div className="h-[2px] w-8 bg-[#1a6b3c]" />
          </div>
        </motion.div>
      </div>

      {/* Marquee Section */}
      <div className="relative w-full mb-2">
        {loading ? (
          <div className="flex gap-4 px-4 overflow-hidden">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="flex-shrink-0 w-64 h-48 rounded-2xl bg-slate-100 animate-pulse" />
            ))}
          </div>
        ) : galleryItems.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No gallery images available</p>
          </div>
        ) : (
          <div className="flex overflow-hidden group">
            <motion.div
              className="flex gap-4 py-4"
              animate={{
                x: ["0%", "-50%"],
              }}
              transition={{
                duration: 150,
                ease: "linear",
                repeat: Infinity,
              }}
              // Pause on hover for better UX
              whileHover={{ transition: { duration: 350 } }}
            >
              {marqueeItems.map((item, idx) => (
                <div
                  key={`${item._id}-${idx}`}
                  className="group flex-shrink-0 w-64 md:w-80 aspect-[3/2] relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
                  onClick={() => openLightbox(item)}
                >
                  <img
                    src={`${SERVER_URL}${item.image}`}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white text-[10px] font-bold uppercase tracking-widest leading-tight">{item.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        )}

        {/* Gradient Overlays for smooth edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-white to-transparent z-10" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-center">
        <button
          onClick={openModal}
          disabled={galleryItems.length === 0}
          className="group inline-flex items-center gap-2.5 bg-[#008d48] text-white font-black px-8 py-3 rounded-full text-[12px] uppercase tracking-[0.15em] transition-all duration-300 hover:bg-[#1a6b3c] hover:scale-105 shadow-xl hover:shadow-green-900/20 active:scale-95"
        >
          <ImageIcon className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          Explore Full Gallery
        </button>
      </div>

      {/* Lightbox Modal (Single Image Expand) */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95 p-4 md:p-10"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-green-400 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X size={40} />
          </button>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`${SERVER_URL}${selectedImage.image}`}
              alt={selectedImage.title}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
            <div className="mt-6 text-center">
              <p className="text-white text-lg font-black uppercase tracking-widest">{selectedImage.label}</p>
              <p className="text-gray-400 text-sm mt-1">{selectedImage.title}</p>
            </div>
          </motion.div>
        </div>
      )}

      {/* Modal (Full Gallery Grid) */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4" onClick={closeModal}>
          <div className="bg-white rounded-[2.5rem] w-full max-w-7xl max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 p-8 flex items-center justify-between z-10">
              <div>
                <h3 className="text-3xl font-black text-[#0a2e5c] uppercase tracking-tight">Awards Archive</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-4 h-px bg-green-500" />
                  <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">History of Excellence</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-4 bg-slate-50 hover:bg-slate-100 rounded-full transition-all group"
              >
                <X className="w-6 h-6 text-slate-500 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 md:p-12">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                {currentModalItems.map((item, idx) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="group relative rounded-2xl overflow-hidden aspect-[3/2] shadow-md cursor-pointer"
                    onClick={() => {
                      setSelectedImage(item);
                      closeModal();
                    }}
                  >
                    <img
                      src={`${SERVER_URL}${item.image}`}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <p className="text-white text-[10px] font-bold uppercase tracking-widest leading-tight">
                        {item.label}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 pb-4">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="p-3 border-2 border-slate-100 rounded-full text-slate-500 hover:border-[#1a6b3c] hover:text-[#1a6b3c] transition-all disabled:opacity-20"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-12 h-12 rounded-full font-black text-sm transition-all ${currentPage === page
                          ? 'bg-[#1a6b3c] text-white shadow-lg'
                          : 'bg-slate-50 text-slate-400 hover:bg-slate-200'
                          }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="p-3 border-2 border-slate-100 rounded-full text-slate-500 hover:border-[#1a6b3c] hover:text-[#1a6b3c] transition-all disabled:opacity-20"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AwardsGallery;
