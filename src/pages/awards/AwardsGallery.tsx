import { motion } from "framer-motion";
import { Image as ImageIcon, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { API_URL, SERVER_URL } from "@/lib/api";

const AwardsGallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

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

  // Pagination logic
  const totalPages = Math.ceil(galleryItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = galleryItems.slice(startIndex, endIndex);
  const displayItems = showModal ? currentItems : galleryItems.slice(0, 4);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const openModal = () => {
    setShowModal(true);
    setCurrentPage(1);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentPage(1);
  };
  return (
    <section className="py-6 md:py-8 bg-white">
      {/* Wider alignment matching home page */}
      <div className="mx-auto px-6 md:px-14">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <div className="flex items-center justify-center gap-3">
            <div className="h-[2px] w-6 bg-[#1a6b3c]" />
            <span className="text-[#1a6b3c] text-[14px] font-black uppercase tracking-[0.3em]">
              Glimpses of Past Editions
            </span>
            <div className="h-[2px] w-6 bg-[#1a6b3c]" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="rounded-2xl overflow-hidden aspect-[4/3] bg-slate-200 animate-pulse" />
            ))
          ) : displayItems.length === 0 ? (
            <div className="col-span-4 text-center py-12 text-slate-400">
              <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No gallery images available</p>
            </div>
          ) : (
            displayItems.map((item, idx) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] shadow-md hover:shadow-xl transition-all duration-400 hover:-translate-y-1 cursor-pointer"
              >
                <img
                  src={`${SERVER_URL}${item.image}`}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1e3c]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <p className="text-white text-[11px] font-bold uppercase tracking-wide leading-tight">
                    {item.label}
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </div>

        <div className="flex justify-center">
          <button 
            onClick={openModal}
            disabled={galleryItems.length === 0}
            className="inline-flex items-center gap-2 border-2 border-slate-200 hover:border-[#1a6b3c] text-slate-600 hover:text-[#1a6b3c] font-bold px-7 py-2.5 rounded-full text-[11px] uppercase tracking-[0.15em] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ImageIcon className="w-4 h-4" />
            View Photo Gallery
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={closeModal}>
          <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-slate-100 p-4 flex items-center justify-between z-10">
              <div>
                <h3 className="text-xl font-black text-[#0a2e5c]">Awards Gallery</h3>
                <p className="text-sm text-slate-400">Glimpses of Past Editions</p>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-slate-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {currentItems.map((item, idx) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="group relative rounded-xl overflow-hidden aspect-[4/3] shadow-md hover:shadow-xl transition-all"
                  >
                    <img
                      src={`${SERVER_URL}${item.image}`}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1e3c]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div>
                        <p className="text-white text-xs font-bold uppercase tracking-wide leading-tight mb-1">
                          {item.label}
                        </p>
                        <p className="text-white/70 text-[10px]">{item.title}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 px-4 py-2 border-2 border-slate-200 rounded-full text-sm font-bold text-slate-600 hover:border-[#1a6b3c] hover:text-[#1a6b3c] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>
                  
                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-full font-bold text-sm transition-all ${
                          currentPage === page
                            ? 'bg-[#1a6b3c] text-white'
                            : 'border-2 border-slate-200 text-slate-600 hover:border-[#1a6b3c] hover:text-[#1a6b3c]'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2 px-4 py-2 border-2 border-slate-200 rounded-full text-sm font-bold text-slate-600 hover:border-[#1a6b3c] hover:text-[#1a6b3c] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
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
