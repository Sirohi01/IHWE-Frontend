import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Play,
    Image as ImageIcon,
    Newspaper,
    Maximize2,
    X,
    ZoomIn,
    Video,
    ChevronLeft,
    ArrowRight,
    Layers,
    Search
} from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import gallHero from "../assets/gall.jpg";
import { galleryApi, heroBackgroundApi, SERVER_URL } from "@/lib/api";

const Gallery = () => {
    const [filter, setFilter] = useState("photo");
    const [activeEvent, setActiveEvent] = useState<string | null>(null);
    const [selectedMedia, setSelectedMedia] = useState<any | null>(null);
    const [mediaItems, setMediaItems] = useState<any[]>([]);
    const [heroData, setHeroData] = useState<any>(null);
    
    // Separate categories for Photo Gallery and Media Gallery
    const [categories, setCategories] = useState<any[]>([]); 
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
                // Fetch all media items, all categories, and hero background
                const [mediaData, catData, bgData] = await Promise.all([
                    galleryApi.getAll(),
                    galleryApi.getCategories(),
                    heroBackgroundApi.getByPage("General / Gallery")
                ]);

                setCategories(catData);
                if (bgData) setHeroData(bgData);

                const formatted = mediaData.map((item: any) => {
                    const isVideo = item.mediaType === 'video';
                    const isExternalVideo = isVideo && (item.videoUrl && (item.videoUrl.startsWith('http') || item.videoUrl.includes('youtube.com') || item.videoUrl.includes('youtu.be')));
                    
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
                        createdAt: item.createdAt,
                        galleryCategoryId: item.galleryCategoryId?._id || item.galleryCategoryId
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

    // Helper to group items by category title
    const groupedItemsByTitle = useMemo(() => {
        const groups: Record<string, any[]> = {};
        mediaItems.forEach(item => {
            const title = item.title || "General";
            if (!groups[title]) groups[title] = [];
            groups[title].push(item);
        });
        return groups;
    }, [mediaItems]);

    // PHOTO GALLERY EVENT LIST (filter to only categories of type 'gallery')
    const photoEventList = useMemo(() => {
        const galleryCats = categories.filter(cat => cat.type === 'gallery' || !cat.type);
        const galleryTitles = new Set(galleryCats.map(c => c.title));
        
        // Include titles from items that match photo category but might not have a formal category object
        mediaItems.forEach(item => {
            if (item.category === 'photo' && item.title) galleryTitles.add(item.title);
        });

        return Array.from(galleryTitles).map(title => {
            const items = mediaItems.filter(item => item.title === title && item.category === 'photo');
            const catInfo = categories.find(cat => cat.title === title && (cat.type === 'gallery' || !cat.type));
            
            return {
                title,
                items,
                coverImage: catInfo?.coverImage 
                    ? `${SERVER_URL}${catInfo.coverImage}`
                    : (items[0]?.thumbnail || items[0]?.src),
                count: items.length,
                date: catInfo?.createdAt || items[0]?.createdAt,
                type: 'gallery'
            };
        }).filter(e => e.count > 0 || categories.some(c => c.title === e.title && c.type === 'gallery'))
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [mediaItems, categories]);

    // MEDIA GALLERY EVENT LIST (filter to only categories of type 'media')
    const mediaEventList = useMemo(() => {
        const mediaCats = categories.filter(cat => cat.type === 'media');
        const mediaTitles = new Set(mediaCats.map(c => c.title));

        // Include titles from items that match press category
        mediaItems.forEach(item => {
            if (item.category === 'press' && item.title) mediaTitles.add(item.title);
        });

        return Array.from(mediaTitles).map(title => {
            const items = mediaItems.filter(item => item.title === title && item.category === 'press');
            const catInfo = categories.find(cat => cat.title === title && cat.type === 'media');
            
            return {
                title,
                items,
                coverImage: catInfo?.coverImage 
                    ? `${SERVER_URL}${catInfo.coverImage}`
                    : (items[0]?.thumbnail || items[0]?.src),
                count: items.length,
                date: catInfo?.createdAt || items[0]?.createdAt,
                type: 'media'
            };
        }).filter(e => e.count > 0 || categories.some(c => c.title === e.title && c.type === 'media'))
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [mediaItems, categories]);

    const filteredItems = useMemo(() => {
        if (activeEvent) {
            return mediaItems.filter(item => item.title === activeEvent && (filter === 'all' || item.category === filter));
        }
        
        if (filter === "photo") return []; // Grid view handled separately
        if (filter === "press") return []; // Grid view handled separately
        
        return filter === "all"
            ? mediaItems
            : mediaItems.filter(item => item.category === filter);
    }, [filter, activeEvent, mediaItems]);

    return (
        <div className="bg-white min-h-screen">
            {/* ── HERO SECTION - Standardized 16:4 Sleek Style ── */}
            <section
                className="hero-background-standard"
                style={{ 
                    backgroundImage: `url(${heroData?.backgroundImage ? `${SERVER_URL}${heroData.backgroundImage}` : gallHero})`
                }}
            >
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-0 left-0 w-full h-4 md:h-8 bg-white" style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }} />

                <div className="container mx-auto px-4 text-center text-white relative z-10" data-aos="fade-up">
                    <p className="text-sm uppercase tracking-[0.4em] mb-4 opacity-80">
                        {heroData?.title || "Visual Journey"}
                    </p>
                    <h1 className="text-4xl md:text-6xl font-serif font-semibold mb-6 italic tracking-tight">
                        {heroData?.heading || "Event Gallery"}
                    </h1>
                    <p className="text-white/70 text-base md:text-lg mb-8 max-w-2xl mx-auto font-light leading-relaxed">
                        {heroData?.shortDescription || "Relive the highlights, innovations, and vibrant moments of 9th IHWE 2026."}
                    </p>
                </div>
            </section>

            {/* FILTER SYSTEM */}
            <section className="pt-4 pb-8 bg-white border-b border-slate-50 sticky top-[70px] z-40 lg:top-[80px]">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center">
                        <div className="inline-flex p-1.5 bg-slate-100/50 backdrop-blur-sm rounded-xl mb-4 border border-slate-200/50 flex-wrap justify-center shadow-sm">
                            {[
                                { id: "all", label: "All Items", icon: Layers },
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
                    
                    {/* PHOTO GALLERY CATEGORY GRID */}
                    {filter === "photo" && !activeEvent && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {photoEventList.map((event) => (
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
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 text-white text-left">
                                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="text-[#d26019] text-[9px] font-bold uppercase tracking-widest">Photo Collection</span>
                                                    <div className="h-px w-4 bg-white/30" />
                                                </div>
                                                <h3 className="text-base font-serif font-bold mb-2 uppercase">{event.title}</h3>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white text-[#23471d]">
                                                        <ArrowRight className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-[9px] font-bold uppercase tracking-widest text-white/80">View {event.count} Photos</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-0 transition-opacity text-left">
                                             <h3 className="text-white text-xs font-serif uppercase tracking-widest">{event.title}</h3>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* MEDIA GALLERY CATEGORY GRID */}
                    {filter === "press" && !activeEvent && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {mediaEventList.map((event) => (
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
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 text-white text-left">
                                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="text-[#d26019] text-[9px] font-bold uppercase tracking-widest">Media Coverage</span>
                                                    <div className="h-px w-4 bg-white/30" />
                                                </div>
                                                <h3 className="text-base font-serif font-bold mb-2 uppercase">{event.title}</h3>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white text-[#23471d]">
                                                        <ArrowRight className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-[9px] font-bold uppercase tracking-widest text-white/80">View {event.count} Photos</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-0 transition-opacity text-left">
                                             <h3 className="text-white text-xs font-serif uppercase tracking-widest">{event.title}</h3>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* MASONRY LIST (When activeEvent is set OR filter is all/video) */}
                    {(activeEvent || (filter !== "photo" && filter !== "press")) && (
                        <div>
                            {activeEvent && (
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
                                    {(activeEvent ? mediaItems.filter(it => it.title === activeEvent && (filter === 'all' || it.category === filter)) : filteredItems).map((item) => (
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
                                                    {item.type === "video" ? (
                                                        <div className="relative w-full aspect-[16/9] bg-slate-900 flex items-center justify-center">
                                                            {item.thumbnail ? (
                                                                <img src={item.thumbnail} className="absolute inset-0 w-full h-full object-cover opacity-60" />
                                                            ) : (
                                                                <Video className="w-10 h-10 text-white/20" />
                                                            )}
                                                            <div className="relative z-10 w-12 h-12 rounded-full border-2 border-white/50 flex items-center justify-center text-white">
                                                                <Play size={20} fill="currentColor" />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <LazyLoadImage
                                                            src={item.src}
                                                            alt={item.title}
                                                            effect="blur"
                                                            className="w-full h-auto object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                                                            wrapperClassName="w-full"
                                                        />
                                                    )}
                                                </div>

                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-left">
                                                    <p className="text-white text-[10px] font-bold uppercase tracking-widest mb-1">{item.title}</p>
                                                    <div className="flex items-center gap-2 text-white/70">
                                                        <Maximize2 size={12} />
                                                        <span className="text-[9px] uppercase font-bold tracking-tighter">View Media</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        </div>
                    )}
                </div>
            </section>

            {/* LIGHTBOX / MODAL */}
            <AnimatePresence>
                {selectedMedia && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-sm"
                        onClick={() => setSelectedMedia(null)}
                    >
                        <button className="absolute top-6 right-6 z-[110] text-white p-2 hover:bg-white/10 rounded-full transition-colors" onClick={() => setSelectedMedia(null)}>
                            <X className="w-8 h-8" />
                        </button>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-6xl w-full max-h-[90vh] flex flex-col items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {selectedMedia.type === "video" ? (
                                <div className="aspect-video w-full">
                                    {selectedMedia.isExternalVideo ? (
                                        <iframe 
                                            src={getYouTubeEmbedUrl(selectedMedia.src)} 
                                            className="w-full h-full shadow-2xl" 
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                            allowFullScreen 
                                        />
                                    ) : (
                                        <video src={selectedMedia.src} controls autoPlay className="w-full h-full shadow-2xl" />
                                    )}
                                </div>
                            ) : (
                                <img src={selectedMedia.src} className="max-w-full max-h-[85vh] mx-auto object-contain shadow-2xl" />
                            )}
                            {selectedMedia.description && (
                                <div className="mt-4 text-center">
                                    <p className="text-white/80 text-sm font-light italic">{selectedMedia.description}</p>
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
