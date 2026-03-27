import { useState, useEffect } from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { clientApi, SERVER_URL } from "@/lib/api";

interface Logo {
    _id: string;
    altText: string;
    url: string;
}

interface ClientData {
    subheading: string;
    heading: string;
    highlightText: string;
    images: Logo[];
}

const ExhibitorLogos = () => {
    const [data, setData] = useState<ClientData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await clientApi.get();
                if (result) {
                    setData(result);
                }
            } catch (error) {
                console.error("Error fetching client logos:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

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

    if (loading) {
        return (
            <div className="py-24 bg-[#F7F8F0] flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-[#23471d] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!data || !data.images || data.images.length === 0) return null;

    const { subheading, heading, highlightText, images } = data;

    return (
        <section className="py-8 bg-[#F7F8F0]">
            <div className="container mx-auto px-4 flex flex-col items-center text-center">
                <div className="flex items-center gap-3 mb-4" data-aos="fade-up">
                    <div className="h-px w-8 bg-[#23471d]" />
                    <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#23471d]">
                        {subheading}
                    </span>
                    <div className="h-px w-8 bg-[#23471d]" />
                </div>
                <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-10 leading-tight" data-aos="fade-up" data-aos-delay="100">
                    {getHighlightedText(heading, highlightText)}
                </h2>
            </div>

            <div className="border-y border-slate-400 py-6 bg-slate-50/30">
                <div className="relative mx-auto flex items-center justify-center max-w-7xl">
                    <Carousel
                        opts={{ loop: true }}
                        plugins={[AutoScroll({ playOnInit: true, speed: 0.5 })]}
                    >
                        <CarouselContent className="-ml-4">
                            {[...images, ...images].map((logo, index) => (
                                <CarouselItem
                                    key={`${logo._id}-${index}`}
                                    className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                                >
                                    <div className="bg-white border border-slate-200 p-1.5 h-28 flex items-center justify-center shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300">
                                        <img
                                            src={logo.url.startsWith("http") ? logo.url : `${SERVER_URL}${logo.url}`}
                                            alt={logo.altText}
                                            className="max-h-[100%] max-w-[100%] object-contain"
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                    {/* Fading Gradients */}
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
                </div>
            </div>
        </section>
    );
};

export default ExhibitorLogos;
