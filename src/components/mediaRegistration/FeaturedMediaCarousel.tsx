import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoplayPlugin from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { mediaRegistrationApi, SERVER_URL } from "@/lib/api";
import SectionContainer from "../layout/SectionContainer";

export default function FeaturedMediaCoverage() {
    const [coverages, setCoverages] = useState([]);
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" }, [
        AutoplayPlugin({ delay: 3000, stopOnInteraction: false }),
    ]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        setScrollSnaps(emblaApi.scrollSnapList());
        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
        return () => {
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
        };
    }, [emblaApi]);

    // Loop needs at least one full extra screen of slides; re-init once data arrives.
    useEffect(() => {
        emblaApi?.reInit({ loop: coverages.length > 1, align: "start" });
    }, [emblaApi, coverages.length]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await mediaRegistrationApi.getPageData();

                if (data?.coverages) {
                    const formattedData = data.coverages.map((item) => ({
                        ...item,
                        logo: item.logo?.startsWith("http")
                            ? item.logo
                            : `${SERVER_URL}${item.logo}`,

                        image: item.image?.startsWith("http")
                            ? item.image
                            : item.image
                            ? `${SERVER_URL}${item.image}`
                            : "",

                        date: item.date
                            ? new Date(item.date).toLocaleDateString(
                                  "en-US",
                                  {
                                      month: "long",
                                      day: "numeric",
                                      year: "numeric",
                                  }
                              )
                            : "",
                    }));

                    setCoverages(formattedData);
                }
            } catch (error) {
                console.log("Error fetching coverages:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <section className="w-full py-4 px-4">
            <SectionContainer className="max-w-[1400px]">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="bg-[#001a4d] rounded-[18px] p-4 md:p-8 shadow-2xl overflow-hidden"
                >
                    {/* HEADER */}
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-white text-sm md:text-base font-semibold uppercase tracking-wide">
                            Featured Media Coverage
                        </h2>

                        <motion.a
                            href="#"
                            whileHover={{ x: 4 }}
                            className="text-white/80 hover:text-white text-xs md:text-sm font-medium flex items-center gap-1 transition-all"
                        >
                            View All <ArrowRight size={14} />
                        </motion.a>
                    </div>

                    {/* CAROUSEL */}
                    <div className="overflow-hidden pb-12" ref={emblaRef}>
                        <div className="flex -ml-5 items-stretch">
                            {coverages.map((item, index) => (
                                <div
                                    key={index}
                                    className="pl-5 min-w-0 shrink-0 grow-0 basis-[83.33%] sm:basis-[45.45%] md:basis-[31.25%] lg:basis-1/5 flex"
                                >
                                    <motion.div
                                        whileHover={{ y: -6 }}
                                        className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-md h-full flex flex-col w-full"
                                    >
                                        {/* LOGO */}
                                        <div className="h-[56px] flex items-center justify-center border-b border-gray-100 bg-white px-3">
                                            <img loading="lazy" decoding="async" src={item.logo}
                                                alt="Media Logo"
                                                className="max-h-6 object-cover grayscale min-h-25 hover:grayscale-0 transition-all"
                                            />
                                        </div>

                                        {/* IMAGE */}
                                        <div className="relative h-[150px] overflow-hidden">
                                            <img loading="lazy" decoding="async" src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                            />
                                        </div>

                                        {/* CONTENT */}
                                        <div className="p-4 flex-grow flex flex-col justify-between">
                                            <div>
                                                <p className="text-[11px] text-gray-500 mb-2">
                                                    {item.date}
                                                </p>

                                                <h3 className="text-[14px] font-semibold text-[#111827] leading-[1.45] line-clamp-3">
                                                    {item.title}
                                                </h3>
                                            </div>

                                            <motion.a
                                                href={item.link || "#"}
                                                target={
                                                    item.link
                                                        ? "_blank"
                                                        : "_self"
                                                }
                                                whileHover={{ x: 4 }}
                                                className="inline-flex items-center gap-1 text-[#1d4ed8] text-sm font-medium mt-4"
                                            >
                                                Read Full Article{" "}
                                                <ArrowRight size={14} />
                                            </motion.a>
                                        </div>
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* PAGINATION DOTS */}
                    {scrollSnaps.length > 1 && (
                        <div className="flex items-center justify-center gap-1.5 -mt-8">
                            {scrollSnaps.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => scrollTo(index)}
                                    aria-label={`Go to slide ${index + 1}`}
                                    className={`h-2 rounded-full transition-all ${index === selectedIndex ? "w-4 bg-[#4ade80]" : "w-2 bg-white/40"
                                        }`}
                                />
                            ))}
                        </div>
                    )}
                </motion.div>
            </SectionContainer>
        </section>
    );
}
