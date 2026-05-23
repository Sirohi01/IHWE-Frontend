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
    Search,
    ChevronRight,
    MoreHorizontal,
    Instagram
} from "lucide-react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationEllipsis,
} from "@/components/ui/pagination";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import gallHero from "../assets/gall.jpg";

import { galleryApi, heroBackgroundApi, SERVER_URL } from "@/lib/api";

const Gallery = () => {
    const [filter, setFilter] = useState("photo");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = filter === "press" ? 15 : 8;
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

    const getInstagramEmbedUrl = (url: string) => {
        let cleanUrl = url.split("?")[0];
        if (!cleanUrl.endsWith("/")) {
            cleanUrl += "/";
        }
        return `${cleanUrl}embed/`;
    };

    const getInstagramThumbnail = (url: string) => {
        if (!url) return null;
        let shortcode = "";
        if (url.includes("instagram.com/reel/")) {
            shortcode = url.split("instagram.com/reel/")[1]?.split("/")[0]?.split("?")[0];
        } else if (url.includes("instagram.com/p/")) {
            shortcode = url.split("instagram.com/p/")[1]?.split("/")[0]?.split("?")[0];
        } else if (url.includes("instagr.am/p/")) {
            shortcode = url.split("instagr.am/p/")[1]?.split("/")[0]?.split("?")[0];
        }
        return shortcode ? `https://www.instagram.com/p/${shortcode}/media/?size=l` : null;
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
                        const isInstagram = item.videoUrl && (item.videoUrl.includes('instagram.com') || item.videoUrl.includes('instagr.am'));
                        if (isInstagram) {
                            thumb = getInstagramThumbnail(item.videoUrl);
                        } else {
                            thumb = getYouTubeThumbnail(item.videoUrl);
                        }
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
            if (item.category === 'photo' && item.title && !item.galleryCategoryId) {
                galleryTitles.add(item.title);
            }
        });

        return Array.from(galleryTitles).map(title => {
            const catInfo = categories.find(cat => cat.title === title && (cat.type === 'gallery' || !cat.type));
            
            const items = mediaItems.filter(item => {
                if (item.category !== 'photo') return false;
                if (item.galleryCategoryId && catInfo) return item.galleryCategoryId === catInfo._id;
                return item.title === title;
            });
            
            return {
                title,
                items,
                coverImage: catInfo?.coverImage 
                    ? `${SERVER_URL}${catInfo.coverImage}`
                    : (items[0]?.thumbnail || items[0]?.src),
                count: items.length,
                date: catInfo?.createdAt || items[0]?.createdAt,
                order: catInfo?.order ?? 999,
                type: 'gallery'
            };
        }).filter(e => e.count > 0 || categories.some(c => c.title === e.title && (!c.type || c.type === 'gallery')))
          .sort((a, b) => {
            if (a.order !== b.order) return a.order - b.order;
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          });
    }, [mediaItems, categories]);

    // VIDEO GALLERY EVENT LIST (filter to only categories of type 'video')
    const videoEventList = useMemo(() => {
        const videoCats = categories.filter(cat => cat.type === 'video');
        const videoTitles = new Set(videoCats.map(c => c.title));

        // Include titles from items that match video category
        mediaItems.forEach(item => {
            if (item.category === 'video' && item.title && !item.galleryCategoryId) {
                videoTitles.add(item.title);
            }
        });

        return Array.from(videoTitles).map(title => {
            const catInfo = categories.find(cat => cat.title === title && cat.type === 'video');
            
            const items = mediaItems.filter(item => {
                if (item.category !== 'video') return false;
                if (item.galleryCategoryId && catInfo) return item.galleryCategoryId === catInfo._id;
                return item.title === title;
            });
            
            return {
                title,
                items,
                coverImage: catInfo?.coverImage 
                    ? `${SERVER_URL}${catInfo.coverImage}`
                    : (items[0]?.thumbnail || items[0]?.src),
                count: items.length,
                date: catInfo?.createdAt || items[0]?.createdAt,
                order: catInfo?.order ?? 999,
                type: 'video'
            };
        }).filter(e => e.count > 0 || categories.some(c => c.title === e.title && c.type === 'video'))
          .sort((a, b) => {
            if (a.order !== b.order) return a.order - b.order;
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          });
    }, [mediaItems, categories]);

    // MEDIA GALLERY EVENT LIST (filter to only categories of type 'media')
    const mediaEventList = useMemo(() => {
        const mediaCats = categories.filter(cat => cat.type === 'media');
        const mediaTitles = new Set(mediaCats.map(c => c.title));

        // Include titles from items that match press category
        mediaItems.forEach(item => {
            if (item.category === 'press' && item.title && !item.galleryCategoryId) {
                mediaTitles.add(item.title);
            }
        });

        return Array.from(mediaTitles).map(title => {
            const catInfo = categories.find(cat => cat.title === title && cat.type === 'media');
            
            const items = mediaItems.filter(item => {
                if (item.category !== 'press') return false;
                if (item.galleryCategoryId && catInfo) return item.galleryCategoryId === catInfo._id;
                return item.title === title;
            });
            
            return {
                title,
                items,
                coverImage: catInfo?.coverImage 
                    ? `${SERVER_URL}${catInfo.coverImage}`
                    : (items[0]?.thumbnail || items[0]?.src),
                count: items.length,
                date: catInfo?.createdAt || items[0]?.createdAt,
                order: catInfo?.order ?? 999,
                type: 'media'
            };
        }).filter(e => e.count > 0 || categories.some(c => c.title === e.title && c.type === 'media'))
          .sort((a, b) => {
            if (a.order !== b.order) return a.order - b.order;
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          });
    }, [mediaItems, categories]);

    const filteredItems = useMemo(() => {
        if (activeEvent) {
            const activeCat = categories.find(c => c.title === activeEvent);
            return mediaItems.filter(item => {
                if (filter !== 'all' && item.category !== filter) return false;
                if (activeCat && item.galleryCategoryId) return item.galleryCategoryId === activeCat._id;
                return item.title === activeEvent;
            });
        }
        
        if (filter === "photo") return []; // Grid view handled separately
        if (filter === "press") return mediaItems.filter(item => item.category === "press");
        if (filter === "video") return []; // Grid view handled separately
        
        return mediaItems.filter(item => item.category === filter);
    }, [filter, activeEvent, mediaItems, categories]);

    const finalDisplayItems = useMemo(() => {
        return filteredItems;
    }, [filteredItems]);

    const paginatedItems = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return finalDisplayItems.slice(startIndex, startIndex + itemsPerPage);
    }, [finalDisplayItems, currentPage]);

    const totalPages = Math.ceil(finalDisplayItems.length / itemsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [filter, activeEvent]);

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

                <div className="container mx-auto px-4 text-center text-white relative z-10" data-aos="fade-up">
                    <p className="text-sm uppercase tracking-[0.4em] mb-4 opacity-80">
                        {heroData?.title || "Visual Journey"}
                    </p>
                    <h1 className="text-4xl md:text-6xl font-inter font-semibold mb-6 tracking-tight">
                        {heroData?.heading || "Event Gallery"}
                    </h1>
                    <p className="text-white/70 text-base md:text-lg mb-8 max-w-2xl mx-auto font-light leading-relaxed">
                        {heroData?.shortDescription || "Relive the highlights, innovations, and vibrant moments of 9th IHWE 2026."}
                    </p>
                </div>
            </section>

            <section className="pt-4 pb-8 bg-white/95 backdrop-blur-md border-b border-slate-200/60 sticky top-[60px] z-40 shadow-sm transition-all duration-300">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center">
                        <div className="inline-flex p-1.5 bg-slate-100/50 backdrop-blur-sm rounded-xl mb-4 border border-slate-200/50 flex-wrap justify-center shadow-sm">
                            {[
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
                                            transition={{ type: "spring" as const, bounce: 0.2, duration: 0.6 }}
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
                                                <h3 className="text-base font-inter font-bold mb-2 uppercase">{event.title}</h3>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white text-[#23471d]">
                                                        <ArrowRight className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-[9px] font-bold uppercase tracking-widest text-white/80">View {event.count} Photos</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-0 transition-opacity text-left">
                                             <h3 className="text-white text-xs font-inter uppercase tracking-widest">{event.title}</h3>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* MEDIA GALLERY CATEGORY GRID REMOVED - IMAGES SHOWN DIRECTLY */}

                    {/* VIDEO GALLERY CATEGORY GRID */}
                    {filter === "video" && !activeEvent && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {videoEventList.map((event) => (
                                <motion.div
                                    key={event.title}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="relative group cursor-pointer"
                                    onClick={() => setActiveEvent(event.title)}
                                >
                                    <div className="relative overflow-hidden rounded-[2px] bg-slate-900 shadow-sm hover:shadow-2xl transition-all duration-700 aspect-[3/2]">
                                        {event.coverImage && (event.coverImage.includes('instagram.com') || event.coverImage.includes('instagr.am')) ? (
                                            <div className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center bg-black">
                                                <iframe 
                                                    src={getInstagramEmbedUrl(event.coverImage)} 
                                                    className="w-full h-[220%] border-0 opacity-80"
                                                    scrolling="no"
                                                    allowTransparency={true}
                                                />
                                                <div className="absolute inset-0 bg-black/10" />
                                            </div>
                                        ) : (
                                            <img
                                                src={event.coverImage}
                                                alt={event.title}
                                                className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    const parent = target.parentElement;
                                                    if (parent) {
                                                        target.style.display = 'none';
                                                        const fallbackDiv = document.createElement('div');
                                                        fallbackDiv.className = "absolute inset-0 bg-gradient-to-tr from-[#f9ce3f] via-[#e1306c] to-[#833ab4] opacity-80 flex items-center justify-center";
                                                        fallbackDiv.innerHTML = `<svg class="w-10 h-10 text-white opacity-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>`;
                                                        parent.appendChild(fallbackDiv);
                                                    }
                                                }}
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 text-white text-left">
                                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="text-[#d26019] text-[9px] font-bold uppercase tracking-widest">Video Collection</span>
                                                    <div className="h-px w-4 bg-white/30" />
                                                </div>
                                                <h3 className="text-base font-inter font-bold mb-2 uppercase">{event.title}</h3>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white text-[#23471d]">
                                                        <ArrowRight className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-[9px] font-bold uppercase tracking-widest text-white/80">View {event.count} Videos</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-0 transition-opacity text-left">
                                             <h3 className="text-white text-xs font-inter uppercase tracking-widest">{event.title}</h3>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* MASONRY LIST (When activeEvent is set OR filter is "press" OR filter is all/other) */}
                    {(activeEvent || filter === "press" || (filter !== "photo" && filter !== "press" && filter !== "video")) && (
                        <div>
                            {activeEvent && (
                                <div className="flex items-center gap-4 mb-10 group cursor-pointer" onClick={() => setActiveEvent(null)}>
                                    <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-[#23471d] group-hover:text-white transition-all shadow-sm">
                                        <ChevronLeft className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-inter font-bold text-slate-900 uppercase tracking-tight">{activeEvent}</h2>
                                </div>
                            )}

                            <motion.div
                                layout
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                            >
                                <AnimatePresence mode="popLayout">
                                    {paginatedItems.map((item) => (
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
                                                        <div className="relative w-full aspect-[16/9] bg-slate-900 flex items-center justify-center overflow-hidden">
                                                            {item.src && (item.src.includes('instagram.com') || item.src.includes('instagr.am')) && (!item.thumbnail || item.thumbnail.includes('instagram.com')) ? (
                                                                <div className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center bg-black">
                                                                    <iframe 
                                                                        src={getInstagramEmbedUrl(item.src)} 
                                                                        className="w-full h-[220%] border-0 opacity-80"
                                                                        scrolling="no"
                                                                        allowTransparency={true}
                                                                    />
                                                                    <div className="absolute inset-0 bg-black/10" />
                                                                </div>
                                                            ) : item.thumbnail ? (
                                                                <img 
                                                                    src={item.thumbnail} 
                                                                    referrerPolicy="no-referrer"
                                                                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                                                                    onError={(e) => {
                                                                        const target = e.target as HTMLImageElement;
                                                                        const parent = target.parentElement;
                                                                        if (parent) {
                                                                            target.style.display = 'none';
                                                                            const fallbackDiv = document.createElement('div');
                                                                            fallbackDiv.className = "absolute inset-0 bg-gradient-to-tr from-[#f9ce3f] via-[#e1306c] to-[#833ab4] opacity-80 flex items-center justify-center";
                                                                            fallbackDiv.innerHTML = `<svg class="w-10 h-10 text-white opacity-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>`;
                                                                            parent.appendChild(fallbackDiv);
                                                                        }
                                                                    }}
                                                                />
                                                            ) : !item.isExternalVideo && item.src ? (
                                                                <video src={`${item.src}#t=0.5`} className="absolute inset-0 w-full h-full object-cover opacity-60" preload="metadata" muted playsInline />
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

                            {/* PAGINATION UI */}
                            {totalPages > 1 && (
                                <div className="mt-16">
                                    <Pagination>
                                        <PaginationContent>
                                            <PaginationItem>
                                                <button
                                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                                    disabled={currentPage === 1}
                                                    className={`px-4 py-2 flex items-center gap-2 text-sm font-medium transition-colors ${
                                                        currentPage === 1 ? "text-slate-300 cursor-not-allowed" : "text-slate-600 hover:text-[#23471d]"
                                                    }`}
                                                >
                                                    <ChevronLeft className="w-4 h-4" /> Previous
                                                </button>
                                            </PaginationItem>
                                            
                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                                                // Show first page, last page, and current +/- 1
                                                if (
                                                    page === 1 ||
                                                    page === totalPages ||
                                                    (page >= currentPage - 1 && page <= currentPage + 1)
                                                ) {
                                                    return (
                                                        <PaginationItem key={page}>
                                                            <button
                                                                onClick={() => setCurrentPage(page)}
                                                                className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${
                                                                    currentPage === page
                                                                        ? "bg-[#23471d] text-white shadow-lg"
                                                                        : "text-slate-500 hover:bg-slate-100"
                                                                }`}
                                                            >
                                                                {page}
                                                            </button>
                                                        </PaginationItem>
                                                    );
                                                } else if (
                                                    page === currentPage - 2 ||
                                                    page === currentPage + 2
                                                ) {
                                                    return (
                                                        <PaginationItem key={page}>
                                                            <PaginationEllipsis />
                                                        </PaginationItem>
                                                    );
                                                }
                                                return null;
                                            })}

                                            <PaginationItem>
                                                <button
                                                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                                    disabled={currentPage === totalPages}
                                                    className={`px-4 py-2 flex items-center gap-2 text-sm font-medium transition-colors ${
                                                        currentPage === totalPages ? "text-slate-300 cursor-not-allowed" : "text-slate-600 hover:text-[#23471d]"
                                                    }`}
                                                >
                                                    Next <ChevronRight className="w-4 h-4" />
                                                </button>
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>
                                </div>
                            )}
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
                                <div className={selectedMedia.src && (selectedMedia.src.includes('instagram.com') || selectedMedia.src.includes('instagr.am')) 
                                    ? "w-full max-w-[400px] h-[580px] bg-black overflow-hidden flex items-center justify-center rounded-lg" 
                                    : "aspect-video w-full"}>
                                    {selectedMedia.src && (selectedMedia.src.includes('instagram.com') || selectedMedia.src.includes('instagr.am')) ? (
                                        <iframe 
                                            src={getInstagramEmbedUrl(selectedMedia.src)} 
                                            className="w-full h-full shadow-2xl border-0" 
                                            scrolling="no" 
                                            allowTransparency={true}
                                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                        />
                                    ) : selectedMedia.isExternalVideo ? (
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
                                    <p className="text-white/80 text-sm font-light">{selectedMedia.description}</p>
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
