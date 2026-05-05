import { motion } from "framer-motion";
import { Image as ImageIcon, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { API_URL, SERVER_URL } from "@/lib/api";

const AwardsGallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [autoPage, setAutoPage] = useState(1);
  const itemsPerPage = 4;
  const modalItemsPerPage = 12;

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch(`${API_URL}/awards-gallery`);
        const data = await response.json();
        if (data.success) {
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

  // Auto-rotation logic for the main page view
  useEffect(() => {
    if (galleryItems.length <= itemsPerPage || showModal) return;

    const totalAutoPages = Math.ceil(galleryItems.length / itemsPerPage);
    const interval = setInterval(() => {
      setAutoPage(prev => (prev >= totalAutoPages ? 1 : prev + 1));
    }, 8000);

    return () => clearInterval(interval);
  }, [galleryItems.length, showModal]);

  // Pagination logic for Modal
  const totalPages = Math.ceil(galleryItems.length / modalItemsPerPage);
  const modalStartIndex = (currentPage - 1) * modalItemsPerPage;
  const currentModalItems = galleryItems.slice(modalStartIndex, modalStartIndex + modalItemsPerPage);

  // Pagination logic for Auto-scroll View (Main Page)
  const totalAutoPages = Math.ceil(galleryItems.length / itemsPerPage);
  const autoStartIndex = (autoPage - 1) * itemsPerPage;
  const currentAutoItems = galleryItems.slice(autoStartIndex, autoStartIndex + itemsPerPage);

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

  return (
    <section className="pt-1 md:pt-2 pb-4 md:pb-6 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3">
            <div className="h-[2px] w-8 bg-[#1a6b3c]" />
            <span className="text-[#1a6b3c] text-[15px] font-black uppercase tracking-[0.3em]">
              Glimpses of Past Editions
            </span>
            <div className="h-[2px] w-8 bg-[#1a6b3c]" />
          </div>
        </motion.div>

        {/* Main Grid with Auto-scroll groups of 4 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {loading ? (
            Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="rounded-xl overflow-hidden aspect-video bg-slate-100 animate-pulse" />
            ))
          ) : galleryItems.length === 0 ? (
            <div className="col-span-full text-center py-12 text-slate-400">
              <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No gallery images available</p>
            </div>
          ) : (
            currentAutoItems.map((item, idx) => (
              <motion.div
                key={`${item._id}-${autoPage}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.03 }}
                className="group relative rounded-xl overflow-hidden aspect-video shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={openModal}
              >
                <img
                  src={`${SERVER_URL}${item.image}`}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="p-3 text-center">
                    <p className="text-white text-[9px] font-black uppercase tracking-widest">{item.label}</p>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        <div className="flex justify-center">
          <button
            onClick={openModal}
            disabled={galleryItems.length === 0}
            className="group inline-flex items-center gap-3 bg-[#0a2e5c] text-white font-bold px-8 py-3 rounded-full text-[12px] uppercase tracking-[0.15em] transition-all duration-300 hover:bg-[#1a6b3c] shadow-lg hover:shadow-green-900/20"
          >
            <ImageIcon className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            View Full Gallery
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4" onClick={closeModal}>
          <div className="bg-white rounded-3xl w-full max-w-7xl max-h-[95vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-slate-100 p-6 flex items-center justify-between z-10">
              <div>
                <h3 className="text-2xl font-black text-[#0a2e5c] uppercase tracking-tight">Awards Gallery</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-4 h-px bg-green-500" />
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Glimpses of Past Editions</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-3 bg-slate-50 hover:bg-slate-100 rounded-full transition-all group"
              >
                <X className="w-6 h-6 text-slate-500 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-10">
                {currentModalItems.map((item, idx) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.02 }}
                    className="group relative rounded-xl overflow-hidden aspect-square shadow-md"
                  >
                    <img
                      src={`${SERVER_URL}${item.image}`}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                      <p className="text-white text-[9px] font-bold uppercase tracking-wide leading-tight">
                        {item.label}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-6 pb-4">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 px-6 py-2.5 border-2 border-slate-100 rounded-full text-[11px] font-black uppercase tracking-widest text-slate-500 hover:border-[#1a6b3c] hover:text-[#1a6b3c] transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Prev
                  </button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-full font-black text-xs transition-all ${currentPage === page
                          ? 'bg-[#1a6b3c] text-white shadow-lg shadow-green-900/20 scale-110'
                          : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                          }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2 px-6 py-2.5 border-2 border-slate-100 rounded-full text-[11px] font-black uppercase tracking-widest text-slate-500 hover:border-[#1a6b3c] hover:text-[#1a6b3c] transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
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
