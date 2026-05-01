import { motion } from "framer-motion";
import { Image as ImageIcon } from "lucide-react";
import gallery1 from "../../assets/awards_gallery1.png";
import gallery2 from "../../assets/awards_gallery2.png";
import gallery3 from "../../assets/awards_gallery3.png";
import gallary4 from "../../assets/gallary4.png";

const galleryItems = [
  {
    src: gallery1,
    alt: "Award ceremony past edition",
    label: "NAMO GANGE GLOBAL HEALTH EXCELLENCE AWARDS",
  },
  {
    src: gallery2,
    alt: "Gala dinner Night",
    label: "Grand Gala Dinner Night",
  },
  {
    src: gallery3,
    alt: "Winners group",
    label: "NAMO GANGE GLOBAL HEALTH EXCELLENCE AWARDS",
  },
  {
    src: gallary4,
    alt: "Excellence Awards",
    label: "NAMO GANGE GLOBAL HEALTH EXCELLENCE AWARDS",
  }
];

const AwardsGallery = () => {
  return (
    <section className="py-6 md:py-8 bg-white">
      {/* Reduced Max-Width to 1280px to push alignment inward */}
      <div className="container mx-auto px-6 max-w-[1280px]">

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
          {galleryItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] shadow-md hover:shadow-xl transition-all duration-400 hover:-translate-y-1 cursor-pointer"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1e3c]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                <p className="text-white text-[11px] font-bold uppercase tracking-wide leading-tight">
                  {item.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <button className="inline-flex items-center gap-2 border-2 border-slate-200 hover:border-[#1a6b3c] text-slate-600 hover:text-[#1a6b3c] font-bold px-7 py-2.5 rounded-full text-[11px] uppercase tracking-[0.15em] transition-all duration-300">
            <ImageIcon className="w-4 h-4" />
            View Photo Gallery
          </button>
        </div>
      </div>
    </section>
  );
};

export default AwardsGallery;
