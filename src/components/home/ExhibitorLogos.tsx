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
        <section className="py-6 bg-[#050A1A] overflow-hidden">
            <div className="container mx-auto px-4 mb-4">
                {/* Gold Header with Lines & Dots */}
                <div className="flex items-center justify-center gap-4 max-w-2xl mx-auto">
                    <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#F3B71B]/40 to-[#F3B71B]" />
                    <div className="flex items-center gap-2 px-4 shrink-0">
                        <div className="w-1 h-1 rounded-full bg-[#F3B71B]" />
                        <h2 className="text-[#F3B71B] font-bold text-[10px] md:text-[11px] uppercase tracking-[0.25em] whitespace-nowrap">
                            {subheading || "Supported By & Associated With"}
                        </h2>
                        <div className="w-1 h-1 rounded-full bg-[#F3B71B]" />
                    </div>
                    <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#F3B71B]/40 to-[#F3B71B]" />
                </div>
            </div>

            <div className="relative border-y border-white/40 py-4">
                <Carousel
                    opts={{ loop: true }}
                    plugins={[AutoScroll({ playOnInit: true, speed: 0.8 })]}
                    className="w-full"
                >
                    <CarouselContent className="-ml-4">
                        {[...images, ...images, ...images].map((logo, index) => (
                            <CarouselItem
                                key={`${logo._id}-${index}`}
                                className="pl-4 basis-1/3 sm:basis-1/4 md:basis-1/6 lg:basis-[14.2%]"
                            >
                                <div className="bg-white rounded-lg p-0 h-14 md:h-16 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 mx-1">
                                    <img
                                        src={logo.url.startsWith("http") ? logo.url : `${SERVER_URL}${logo.url}`}
                                        alt={logo.altText}
                                        className="max-h-[95%] max-w-[95%] object-contain grayscale-[0.2] hover:grayscale-0 transition-all"
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>

                {/* Side Fade Overlays */}
                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#050A1A] to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#050A1A] to-transparent z-10" />
            </div>
        </section>
    );
};

export default ExhibitorLogos;
