import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { api, SERVER_URL } from "@/lib/api";
import { cn } from "@/lib/utils";

const ExhibitorHeroSlider = () => {
    const [slides, setSlides] = useState<any[]>([]);
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const res = await api.get('/api/exhibitor-hero-slider');
                if (res.data.success && res.data.data.length > 0) {
                    setSlides(res.data.data);
                }
            } catch (error) {
                console.error("Failed to fetch exhibitor slides:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSlides();
    }, []);

    useEffect(() => {
        if (slides.length <= 1 || !isPlaying) return;
        const timer = setInterval(() => {
            setDirection(1);
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length, isPlaying]);

    const handleSlideChange = (index: number) => {
        setDirection(index > current ? 1 : -1);
        setCurrent(index);
    };

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0,
            scale: 1.1,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (direction: number) => ({
            z: 0,
            x: direction > 0 ? -100 : 100,
            opacity: 0,
            scale: 0.95,
        }),
    };

    const getImageUrl = (image: string) => {
        if (!image) return "";
        if (image.startsWith("http") || image.startsWith("data:")) return image;
        const cleanPath = image.startsWith("/") ? image : "/" + image;
        return `${SERVER_URL}${cleanPath}`;
    };

    if (isLoading) {
        return (
            <section className="relative w-full overflow-hidden bg-black flex items-center justify-center aspect-[0.75/1] sm:aspect-[16/9] md:aspect-[16/5.62]">
                <div className="w-12 h-12 rounded-full border-4 border-white/20 border-t-white animate-spin" />
            </section>
        );
    }

    if (slides.length === 0) return null;

    return (
        <section className="relative w-full overflow-hidden bg-black font-inter text-white aspect-[0.75/1] sm:aspect-[16/9] md:aspect-[16/5.69] rounded-xl">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                    key={current}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 200, damping: 30 },
                        opacity: { duration: 0.8 },
                        scale: { duration: 1.2 },
                    }}
                    className="absolute inset-0 z-0"
                >
                    <motion.div
                        className="absolute inset-0"
                        initial={{ scale: 1.05 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 7, ease: "easeOut" }}
                    >
                        {slides[current].path ? (
                            <a href={slides[current].path} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                                <img
                                    src={getImageUrl(slides[current].image)}
                                    alt={slides[current].imageAlt || "Exhibitor Hero Slide"}
                                    className="w-full h-full object-cover"
                                />
                            </a>
                        ) : (
                            <img
                                src={getImageUrl(slides[current].image)}
                                alt={slides[current].imageAlt || "Exhibitor Hero Slide"}
                                className="w-full h-full object-cover"
                            />
                        )}
                    </motion.div>
                </motion.div>
            </AnimatePresence>

            <div className="hidden md:flex absolute bottom-4 right-12 z-30 flex-col gap-6">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => handleSlideChange(i)}
                        className="group relative flex items-center justify-end"
                    >
                        <motion.span
                            className="absolute right-0 text-[10px] font-semibold text-white/0 group-hover:text-white/70 transition-all duration-300 mr-20 uppercase tracking-[0.3em]"
                            whileHover={{ x: -10 }}
                        >
                            0{i + 1}
                        </motion.span>
                        <div className="relative w-16 h-[2px] bg-white/20 overflow-hidden">
                            <motion.span
                                className={cn("absolute left-0 top-0 h-full bg-white")}
                                initial={false}
                                animate={{ width: i === current ? "100%" : "0%" }}
                                transition={{ duration: i === current && isPlaying ? 5 : 0.5, ease: isPlaying ? "linear" : "easeOut" }}
                            />
                        </div>
                        <span
                            className={cn(
                                "ml-4 w-2 h-2 rounded-full transition-all duration-300",
                                i === current ? "bg-white scale-100" : "bg-white/30 scale-75 group-hover:bg-white/50",
                            )}
                        />
                    </button>
                ))}
            </div>
            
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent z-30"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
            />
        </section>
    );
};

export default ExhibitorHeroSlider;
