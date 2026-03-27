import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Play,
    Image as ImageIcon,
    Newspaper,
    Maximize2,
    X,
    ZoomIn,
    Video,
    FileText,
    Calendar,
    Layers,
    Sparkles
} from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import gallHero from "../assets/gall.jpg";
import { galleryApi, SERVER_URL } from "@/lib/api";

const Gallery = () => {
    const [filter, setFilter] = useState("all");
    const [selectedMedia, setSelectedMedia] = useState<any | null>(null);
    const [mediaItems, setMediaItems] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const getYouTubeThumbnail = (url: string) => {
        let videoId = "";
        if (url.includes("youtube.com/watch?v=")) {
            videoId = url.split("v=")[1].split("&")[0];
        } else if (url.includes("youtu.be/")) {
            videoId = url.split("youtu.be/")[1].split("?")[0];
        } else if (url.includes("youtube.com/embed/")) {
            videoId = url.split("embed/")[1].split("?")[0];
        }
        return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
    };

    useEffect(() => {
        const fetchGallery = async () => {
            setIsLoading(true);
            try {
                const data = await galleryApi.getAll();
                // Map API data to UI format
                const formatted = data.map((item: any) => {
                    const isVideo = item.mediaType === 'video';
                    const isExternalVideo = isVideo && (item.videoUrl.startsWith('http') || item.videoUrl.includes('youtube.com') || item.videoUrl.includes('youtu.be'));
                    
                    let thumb = item.image ? `${SERVER_URL}${item.image}` : null;
                    if (isVideo && isExternalVideo && !thumb) {
                        thumb = getYouTubeThumbnail(item.videoUrl);
                    }

                    return {
                        id: item._id,
                        type: item.mediaType,
                        category: item.category,
                        src: isVideo 
                            ? (isExternalVideo ? item.videoUrl : `${SERVER_URL}${item.videoUrl}`)
                            : `${SERVER_URL}${item.image}`,
                        thumbnail: thumb,
                        title: item.title,
                        description: item.description,
                        isExternalVideo
                    };
                });
                setMediaItems(formatted);
            } catch (error) {
                console.error("Error loading gallery:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchGallery();
    }, []);

    const filteredItems = filter === "all"
        ? mediaItems
        : mediaItems.filter(item => item.category === filter);

    return (
        <div className="bg-white min-h-screen">
            {/* HERO SECTION (Contact Style) */}
            <section
                className="relative pt-36 pb-20 overflow-hidden"
                style={{ backgroundImage: `url(${gallHero})`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute bottom-0 left-0 w-full h-16 bg-white" style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }} />

                <div className="container mx-auto px-4 text-center text-white relative z-10" data-aos="fade-up">
                    <p className="text-sm uppercase tracking-[0.4em] mb-4 opacity-80">Visual Legacy</p>
                    <h1 className="text-4xl md:text-6xl font-serif font-semibold mb-6 italic tracking-tight">Media Gallery</h1>
                    <p className="text-white/70 text-base md:text-lg mb-8 max-w-2xl mx-auto font-light leading-relaxed">
                        Relive the most transformative moments from the International Health & Wellness Expo through our curated media collection.
                    </p>
                </div>
            </section>

            {/* PREMIUM FILTER SYSTEM */}
            <section className="pt-4 pb-8 bg-white border-b border-slate-50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center">
                        <div className="inline-flex p-1.5 bg-slate-100/50 backdrop-blur-sm rounded-xl mb-4 border border-slate-200/50 flex-wrap justify-center">
                            {[
                                { id: "all", label: "All", icon: Layers },
                                { id: "photo", label: "Photo Gallery", icon: ImageIcon },
                                { id: "video", label: "Video Gallery", icon: Video },
                                { id: "press", label: "Media Gallery", icon: Newspaper },
                            ].map((btn) => (
                                <button
                                    key={btn.id}
                                    onClick={() => setFilter(btn.id)}
                                    className={`relative flex items-center gap-2.5 px-6 py-3 rounded-lg text-[11px] font-medium uppercase tracking-[0.2em] transition-all duration-500 overflow-hidden ${filter === btn.id
                                        ? "text-white shadow-lg"
                                        : "text-black hover:bg-white/50"
                                        }`}
                                >
                                    {filter === btn.id && (
                                        <motion.div
                                            layoutId="activeFilter"
                                            className="absolute inset-0 bg-[#23471d]"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10 flex items-center gap-2">
                                        <btn.icon className={`w-3.5 h-3.5 ${filter === btn.id ? "text-white" : "text-slate-500 group-hover:text-black"}`} />
                                        {btn.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* DYNAMIC MEDIA GRID */}
            <section className="pt-8 pb-20 bg-white min-h-[600px]">
                <div className="container mx-auto px-4">
                    <motion.div
                        layout
                        className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredItems.map((item, idx) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.4 }}
                                    className="relative group break-inside-avoid"
                                >
                                    <div
                                        className="relative overflow-hidden rounded-[2px] bg-slate-900 cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-700"
                                        onClick={() => setSelectedMedia(item)}
                                    >
                                        {/* Media content */}
                                        <div className="overflow-hidden bg-slate-100 flex items-center justify-center">
                                            {item.type === "video" && !item.thumbnail && !item.isExternalVideo ? (
                                                <div className="relative w-full aspect-[4/3] bg-slate-900 flex items-center justify-center">
                                                    <video 
                                                        src={item.src} 
                                                        className="absolute inset-0 w-full h-full object-cover opacity-60"
                                                        preload="metadata"
                                                    />
                                                    <div className="relative z-10 flex flex-col items-center gap-2">
                                                        <Play className="w-10 h-10 text-white/80" />
                                                        <span className="text-[10px] text-white/60 uppercase tracking-widest font-medium">Video Preview</span>
                                                    </div>
                                                </div>
                                            ) : (item.type === "video" ? item.thumbnail : item.src) ? (
                                                <LazyLoadImage
                                                    src={item.type === "video" ? item.thumbnail : item.src}
                                                    alt={item.title}
                                                    effect="blur"
                                                    className={`w-full h-auto object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105`}
                                                    wrapperClassName="w-full"
                                                />
                                            ) : (
                                                <div className="flex flex-col items-center gap-2 py-20 w-full">
                                                    {item.type === "video" ? (
                                                        <Video className="w-10 h-10 text-slate-300" />
                                                    ) : (
                                                        <ImageIcon className="w-10 h-10 text-slate-300" />
                                                    )}
                                                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">No Preview Available</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Video indicator for non-hover state */}
                                        {item.type === "video" && (
                                            <div className="absolute top-3 left-3 z-10 w-8 h-8 bg-[#23471d]/90 rounded-full flex items-center justify-center text-white shadow-xl backdrop-blur-sm group-hover:opacity-0 transition-all duration-300">
                                                <Play className="w-4 h-4 fill-current ml-0.5" />
                                            </div>
                                        )}

                                        {/* High-end Overlay - HIDDEN for Media Gallery (press) */}
                                        {item.category !== 'press' && (
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="text-[#d26019] text-[9px] font-bold uppercase tracking-widest">
                                                            {item.category}
                                                        </span>
                                                        <div className="h-px w-4 bg-white/30" />
                                                    </div>
                                                    <h3 className="text-base font-serif font-bold text-white mb-3">
                                                        {item.title}
                                                    </h3>

                                                    <div className="flex items-center gap-3">
                                                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white text-[#23471d]">
                                                            {item.type === "video" ? <Play className="w-4 h-4 fill-current" /> : <Maximize2 className="w-4 h-4" />}
                                                        </div>
                                                        <span className="text-[9px] font-bold uppercase tracking-widest text-white/80">
                                                            {item.type === "video" ? "Play" : "View"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Simple Zoom Icon for Media Gallery */}
                                        {item.category === 'press' && (
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-[#23471d]/20 backdrop-blur-[2px]">
                                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#23471d] transform scale-50 group-hover:scale-100 transition-transform duration-500">
                                                    <ZoomIn className="w-6 h-6" />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {/* Empty State */}
                    {filteredItems.length === 0 && (
                        <div className="py-40 text-center">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-slate-100">
                                <ImageIcon className="w-8 h-8 text-slate-200" />
                            </div>
                            <h3 className="text-3xl font-serif text-slate-900 mb-3">No fragments found</h3>
                            <p className="text-slate-400 text-sm tracking-wide">Refine your selection to discover more.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* LIGHTBOX MODAL */}
            <AnimatePresence>
                {selectedMedia && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-sm"
                        onClick={() => setSelectedMedia(null)}
                    >
                        <motion.button
                            initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                            className="absolute top-6 right-6 z-[110] w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all border border-white/10 hover:border-white/20 group"
                            onClick={() => setSelectedMedia(null)}
                        >
                            <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                        </motion.button>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {selectedMedia.type === "video" ? (
                                <div className="w-full aspect-video rounded-xl overflow-hidden shadow-2xl bg-black border border-white/5">
                                    {selectedMedia.isExternalVideo ? (
                                        <iframe
                                            src={selectedMedia.src.replace("watch?v=", "embed/").replace("youtu.be/", "youtube.com/embed/")}
                                            title={selectedMedia.title}
                                            className="w-full h-full border-0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    ) : (
                                        <video
                                            src={selectedMedia.src}
                                            controls
                                            autoPlay
                                            className="w-full h-full object-contain"
                                        />
                                    )}
                                </div>
                            ) : (
                                <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/5">
                                    <img
                                        src={selectedMedia.src}
                                        alt={selectedMedia.title}
                                        className="max-w-full max-h-[85vh] object-contain"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-[#d26019] text-[10px] font-black uppercase tracking-[0.3em]">
                                                {selectedMedia.category}
                                            </span>
                                            <div className="h-px w-6 bg-white/20" />
                                        </div>
                                        <h3 className="text-2xl font-serif font-bold text-white mb-1">
                                            {selectedMedia.title}
                                        </h3>
                                        <p className="text-white/60 text-sm max-w-2xl font-light tracking-wide">
                                            {selectedMedia.description}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Gallery;
