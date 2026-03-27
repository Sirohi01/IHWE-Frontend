import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { glimpseApi, SERVER_URL } from "@/lib/api";

interface GlimpseImage {
    _id: string;
    url: string;
    title: string;
    altText?: string;
}

interface GlimpseData {
    subheading: string;
    heading: string;
    highlightText: string;
    description: string;
    images: GlimpseImage[];
}

const GallerySection = () => {
    const [selectedImg, setSelectedImg] = useState<string | null>(null);
    const [data, setData] = useState<GlimpseData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await glimpseApi.get();
                if (result) {
                    setData(result);
                }
            } catch (error) {
                console.error("Error fetching glimpse data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading || !data) {
        return (
            <div className="py-24 text-center bg-white">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-6 w-32 bg-slate-100 rounded mb-4" />
                    <div className="h-10 w-64 bg-slate-100 rounded mb-4" />
                    <div className="h-4 w-96 bg-slate-100 rounded" />
                </div>
            </div>
        );
    }

    // Helper to highlight text
    const getHighlightedText = (text: string, highlight: string) => {
        if (!highlight) return text;
        const parts = text.split(new RegExp(`(${highlight})`, "gi"));
        return (
            <>
                {parts.map((part, i) =>
                    part.toLowerCase() === highlight.toLowerCase() ? (
                        <span key={i} className="text-[#d26019]">
                            {part}
                        </span>
                    ) : (
                        part
                    )
                )}
            </>
        );
    };

    return (
        <section className="pt-12 pb-24 bg-white relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            <div className="container mx-auto px-4 max-w-[1400px] relative z-10">
                {/* Standardized Header */}
                <div className="text-center mb-12" data-aos="fade-up">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-px w-8 bg-[#23471d]" />
                        <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-[#23471d]">
                            {data.subheading}
                        </span>
                        <div className="h-px w-8 bg-[#23471d]" />
                    </div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-slate-900 leading-tight">
                        {getHighlightedText(data.heading, data.highlightText)}
                    </h2>
                    <p className="mt-4 text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
                        {data.description}
                    </p>
                </div>

                {/* PREMIUM STAGGERED GRID (5 Columns) */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5 items-start">
                    {data.images.map((img, idx) => {
                        // Create a staggered effect for columns 2 and 4 on desktop
                        const isStaggered = (idx % 5 === 1 || idx % 5 === 3);
                        const imageUrl = img.url.startsWith('http') || img.url.startsWith('data:') 
                                         ? img.url 
                                         : `${SERVER_URL}${img.url}`;

                        return (
                            <motion.div
                                key={img._id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05, duration: 0.6 }}
                                onClick={() => setSelectedImg(imageUrl)}
                                className={`group relative cursor-pointer rounded-xl overflow-hidden bg-slate-100 shadow-sm hover:shadow-2xl transition-all duration-700 
                                    ${isStaggered ? "lg:translate-y-4" : "lg:translate-y-0"}
                                `}
                            >
                                {/* Fixed Landscape Aspect Ratio for Better Visibility */}
                                <div className="aspect-[3/2] overflow-hidden">
                                    <img
                                        src={imageUrl}
                                        alt={img.altText || img.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />

                                    {/* Glassmorphism Hover Overlay */}
                                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-6 text-center">
                                        <div className="mb-4 p-3 bg-white/10 backdrop-blur-md rounded-full transform scale-50 group-hover:scale-100 transition-transform duration-500">
                                            <ZoomIn className="w-5 h-5 text-white" />
                                        </div>
                                        <p className="text-white text-[9px] font-bold uppercase tracking-[0.2em] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            {img.title}
                                        </p>
                                    </div>

                                    {/* Subtle Border Overlay */}
                                    <div className="absolute inset-0 border border-white/10 group-hover:border-white/20 transition-colors pointer-events-none" />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Premium Lightbox */}
            <AnimatePresence>
                {selectedImg && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImg(null)}
                        className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
                    >
                        <motion.button
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            className="absolute top-8 right-8 z-[110] w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all hover:rotate-90"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImg(null);
                            }}
                        >
                            <X className="w-6 h-6" />
                        </motion.button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="relative max-w-5xl w-full flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedImg}
                                alt="Full View"
                                className="max-w-full max-h-[85vh] object-contain shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-lg"
                            />

                            {/* Subtle info label on lightbox */}
                            <div className="absolute -bottom-10 left-0 right-0 text-center">
                                <p className="text-white/50 text-[10px] font-medium uppercase tracking-[0.3em]">
                                    Click anywhere to close
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default GallerySection;
