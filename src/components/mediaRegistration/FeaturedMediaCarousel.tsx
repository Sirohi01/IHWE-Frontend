"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const mediaCoverage = [
    {
        title:
            "IHWE 2026 to Become India's Largest Wellness & Healthcare Gathering",
        image:
            "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
        logo: "Business Standard",
        date: "May 20, 2024",
    },
    {
        title:
            "IHWE 2026 Unveils Global Platform for Innovation in Healthcare & Wellness",
        image:
            "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop",
        logo: "Healthworld",
        date: "May 18, 2024",
    },
    {
        title:
            "IHWE 2026 Aims to Bring Together Global Leaders in Health & Wellness",
        image:
            "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1200&auto=format&fit=crop",
        logo: "ANI",
        date: "May 17, 2024",
    },
    {
        title:
            "International Participation Grows Strong for IHWE 2026",
        image:
            "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1200&auto=format&fit=crop",
        logo: "India Today",
        date: "May 16, 2024",
    },
    {
        title:
            "IHWE 2026 Set to Showcase Future of Healthcare, Wellness & AYUSH",
        image:
            "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=1200&auto=format&fit=crop",
        logo: "ThePrint",
        date: "May 16, 2024",
    },
      {
        title:
            "IHWE 2026 to Become India's Largest Wellness & Healthcare Gathering",
        image:
            "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
        logo: "Business Standard",
        date: "May 20, 2024",
    },
    {
        title:
            "IHWE 2026 Unveils Global Platform for Innovation in Healthcare & Wellness",
        image:
            "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop",
        logo: "Healthworld",
        date: "May 18, 2024",
    },
    {
        title:
            "IHWE 2026 Aims to Bring Together Global Leaders in Health & Wellness",
        image:
            "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1200&auto=format&fit=crop",
        logo: "ANI",
        date: "May 17, 2024",
    },
    {
        title:
            "International Participation Grows Strong for IHWE 2026",
        image:
            "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1200&auto=format&fit=crop",
        logo: "India Today",
        date: "May 16, 2024",
    },
    {
        title:
            "IHWE 2026 Set to Showcase Future of Healthcare, Wellness & AYUSH",
        image:
            "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=1200&auto=format&fit=crop",
        logo: "ThePrint",
        date: "May 16, 2024",
    },
      {
        title:
            "IHWE 2026 to Become India's Largest Wellness & Healthcare Gathering",
        image:
            "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
        logo: "Business Standard",
        date: "May 20, 2024",
    },
    {
        title:
            "IHWE 2026 Unveils Global Platform for Innovation in Healthcare & Wellness",
        image:
            "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop",
        logo: "Healthworld",
        date: "May 18, 2024",
    },
    {
        title:
            "IHWE 2026 Aims to Bring Together Global Leaders in Health & Wellness",
        image:
            "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1200&auto=format&fit=crop",
        logo: "ANI",
        date: "May 17, 2024",
    },
    {
        title:
            "International Participation Grows Strong for IHWE 2026",
        image:
            "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1200&auto=format&fit=crop",
        logo: "India Today",
        date: "May 16, 2024",
    },
    {
        title:
            "IHWE 2026 Set to Showcase Future of Healthcare, Wellness & AYUSH",
        image:
            "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=1200&auto=format&fit=crop",
        logo: "ThePrint",
        date: "May 16, 2024",
    },
];

export default function FeaturedMediaCoverage() {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "start",
        dragFree: true,
    });

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <section className="w-full py-4 px-4">
            <div className="max-w-[1400px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="bg-[#001a4d] rounded-[18px] p-4 md:p-5 shadow-2xl overflow-hidden"
                >
                    {/* HEADER */}
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-white text-sm md:text-base font-semibold uppercase tracking-wide">
                            Featured Media Coverage
                        </h2>

                        <motion.a
                            href="#"
                            whileHover={{ x: 4 }}
                            className="text-white/80 hover:text-white text-xs md:text-sm font-medium flex items-center gap-1 transition-all"
                        >
                            View All
                            <ArrowRight size={14} />
                        </motion.a>
                    </div>

                    {/* CAROUSEL */}
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex gap-4">
                            {mediaCoverage.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{
                                        delay: index * 0.08,
                                        duration: 0.5,
                                    }}
                                    viewport={{ once: true }}
                                    whileHover={{
                                        y: -6,
                                    }}
                                    className="min-w-[85%] sm:min-w-[48%] md:min-w-[31%] lg:min-w-[19%] bg-white rounded-xl overflow-hidden border border-gray-200 shadow-md"
                                >
                                    {/* LOGO */}
                                    <div className="h-[56px] flex items-center justify-center border-b border-gray-100 bg-white px-3">
                                        <span className="text-[18px] font-semibold text-gray-800 text-center">
                                            {item.logo}
                                        </span>
                                    </div>

                                    {/* IMAGE */}
                                    <div className="relative h-[150px] overflow-hidden">
                                        <motion.img
                                            whileHover={{ scale: 1.08 }}
                                            transition={{ duration: 0.4 }}
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* CONTENT */}
                                    <div className="p-4">
                                        <p className="text-[11px] text-gray-500 mb-2">
                                            {item.date}
                                        </p>

                                        <h3 className="text-[14px] font-semibold text-[#111827] leading-[1.45] min-h-[78px]">
                                            {item.title}
                                        </h3>

                                        <motion.a
                                            href="#"
                                            whileHover={{ x: 4 }}
                                            className="inline-flex items-center gap-1 text-[#1d4ed8] text-sm font-medium mt-4"
                                        >
                                            Read Full Article
                                            <ArrowRight size={14} />
                                        </motion.a>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* DOTS */}
                    <div className="flex items-center justify-center gap-2 mt-5">
                        <button
                            onClick={scrollPrev}
                            className="w-2 h-2 rounded-full bg-white/40 hover:bg-white transition-all"
                        />

                        <button className="w-2 h-2 rounded-full bg-green-400" />

                        <button
                            onClick={scrollNext}
                            className="w-2 h-2 rounded-full bg-white/40 hover:bg-white transition-all"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}