import { useState, useEffect, useMemo } from "react";
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
    Sparkles,
    ChevronLeft,
    ArrowRight
} from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import gallHero from "../assets/gall.jpg";
import { galleryApi, SERVER_URL } from "@/lib/api";

const Gallery = () => {
    const [filter, setFilter] = useState("photo");
    const [activeEvent, setActiveEvent] = useState<string | null>(null);
    const [selectedMedia, setSelectedMedia] = useState<any | null>(null);
    const [mediaItems, setMediaItems] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]); // New state for categories
    const [isLoading, setIsLoading] = useState(true);

    const getYouTubeThumbnail = (url: string) => {
        let videoId = "";
        if (url.includes("youtube.com/watch?v=")) {
            videoId = url.split("v=")[1].split("&")[0];
        } else if (url.includes("youtu.be/")) {
            videoId = url.split("youtu.be/")[1].split("?")[0];
        } else if (url.includes("youtube.com/embed/")) {
            videoId = url.split("embed/")[1].split("?")[0];
        } else if (url.includes("youtube.com/shorts/")) {
            videoId = url.split("shorts/")[1].split("?")[0];
        }
        return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
    };

    const getYouTubeEmbedUrl = (url: string) => {
        let videoId = "";
        if (url.includes("youtube.com/watch?v=")) {
            videoId = url.split("v=")[1].split("&")[0];
        } else if (url.includes("youtu.be/")) {
            videoId = url.split("youtu.be/")[1].split("?")[0];
        } else if (url.includes("youtube.com/embed/")) {
            videoId = url.split("embed/")[1].split("?")[0];
        } else if (url.includes("youtube.com/shorts/")) {
            videoId = url.split("shorts/")[1].split("?")[0];
        }
        return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : url;
    };

    useEffect(() => {
        const fetchGallery = async () => {
            setIsLoading(true);
            try {
                const [mediaData, catData] = await Promise.all([
                    galleryApi.getAll(),
                    galleryApi.getCategories()
                ]);

                setCategories(catData);

                const formatted = mediaData.map((item: any) => {
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
                        isExternalVideo,
                        createdAt: item.createdAt
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

    // Grouping photos by event (title)
    const eventGroups = useMemo(() => {
        const groups: Record<string, any[]> = {};
        mediaItems.forEach(item => {
            if (item.category === 'photo') {
                const title = item.title || "General Gallery";
                if (!groups[title]) groups[title] = [];
                groups[title].push(item);
            }
        });
        return groups;
    }, [mediaItems]);

    const eventList = useMemo(() => {
        const categoryMap: Record<string, any> = {};
        categories.forEach(cat => {
            categoryMap[cat.title] = cat;
        });

        // Get unique titles from both items and categories
        const allTitles = new Set([
            ...Object.keys(eventGroups),
            ...categories.map(cat => cat.title)
        ]);

        return Array.from(allTitles).map(title => {
            const items = eventGroups[title] || [];
            const catInfo = categoryMap[title];
            
            return {
                title,
                items,
                coverImage: catInfo?.coverImage 
                    ? `${SERVER_URL}${catInfo.coverImage}`
                    : (items[0]?.thumbnail || items[0]?.src),
                count: items.length,
                date: catInfo?.createdAt || items[0]?.createdAt
            };
        }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [eventGroups, categories]);

    const filteredItems = useMemo(() => {
        if (filter === "photo") {
            if (activeEvent) {
                return eventGroups[activeEvent] || [];
            }
            return [];
        }
        
        return filter === "all"
            ? mediaItems
            : mediaItems.filter(item => item.category === filter);
    }, [filter, activeEvent, mediaItems, eventGroups]);

    return (
        <div className="bg-white min-h-screen">
            {/* HERO SECTION */}
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

            {/* FILTER SYSTEM */}
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
                                    onClick={() => {
                                        setFilter(btn.id);
                                        setActiveEvent(null);
                                    }}
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

            {/* MEDIA GRID */}
            <section className="pt-8 pb-20 bg-white min-h-[600px]">
                <div className="container mx-auto px-4">
                    
                    {/* Event Grid View (Fixed Size Grid) */}
                    {filter === "photo" && !activeEvent && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {eventList.map((event, idx) => (
                                <motion.div
                                    key={event.title}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="relative group cursor-pointer"
                                    onClick={() => setActiveEvent(event.title)}
                                >
                                    <div className="relative overflow-hidden rounded-[2px] bg-slate-900 shadow-sm hover:shadow-2xl transition-all duration-700 aspect-[3/2]">
                                        <img
                                            src={event.coverImage}
                                            alt={event.title}
                                            className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="text-[#d26019] text-[9px] font-bold uppercase tracking-widest">
                                                        Event Collection
                                                    </span>
                                                    <div className="h-px w-4 bg-white/30" />
                                                </div>
                                                <h3 className="text-base font-serif font-bold text-white mb-2 uppercase">
                                                    {event.title}
                                                </h3>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white text-[#23471d]">
                                                        <ArrowRight className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-[9px] font-bold uppercase tracking-widest text-white/80">
                                                        View {event.count} Photos
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-0 transition-opacity">
                                             <h3 className="text-white text-xs font-serif uppercase tracking-widest">{event.title}</h3>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* Detail/Category/Video Views (Masonry) */}
                    {(filter !== "photo" || activeEvent) && (
                        <div>
                            {filter === "photo" && activeEvent && (
                                <div className="flex items-center gap-4 mb-10 group cursor-pointer" onClick={() => setActiveEvent(null)}>
                                    <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-[#23471d] group-hover:text-white transition-all shadow-sm">
                                        <ChevronLeft className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 uppercase tracking-tight italic">{activeEvent}</h2>
                                </div>
                            )}

                            <motion.div
                                layout
                                className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
                            >
                                <AnimatePresence mode="popLayout">
                                    {filteredItems.map((item) => (
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

                                                {item.type === "video" && (
                                                    <div className="absolute top-3 left-3 z-10 w-8 h-8 bg-[#23471d]/90 rounded-full flex items-center justify-center text-white shadow-xl backdrop-blur-sm group-hover:opacity-0 transition-all duration-300">
                                                        <Play className="w-4 h-4 fill-current ml-0.5" />
                                                    </div>
                                                )}

                                                {item.category !== 'press' && (
                                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                                                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <span className="text-[#d26019] text-[9px] font-bold uppercase tracking-widest">
                                                                    {item.category}
                                                                </span>
                                                                <div className="h-px w-4 bg-white/30" />
                                                            </div>
                                                            <h3 className="text-base font-serif font-bold text-white mb-3 uppercase">
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
                        </div>
                    )}
                </div>
            </section>

            {/* MODAL */}
            <AnimatePresence>
                {selectedMedia && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-sm"
                        onClick={() => setSelectedMedia(null)}
                    >
                        <button className="absolute top-6 right-6 z-[110] text-white" onClick={() => setSelectedMedia(null)}>
                            <X className="w-8 h-8" />
                        </button>
                        <motion.div
                            initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                            className="relative max-w-5xl w-full max-h-[90vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {selectedMedia.type === "video" ? (
                                <div className="aspect-video w-full">
                                    {selectedMedia.isExternalVideo ? (
                                        <iframe 
                                            src={getYouTubeEmbedUrl(selectedMedia.src)} 
                                            className="w-full h-full" 
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                            allowFullScreen 
                                        />
                                    ) : (
                                        <video src={selectedMedia.src} controls autoPlay className="w-full h-full" />
                                    )}
                                </div>
                            ) : (
                                <img src={selectedMedia.src} className="max-w-full max-h-[85vh] mx-auto object-contain" />
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Gallery;
