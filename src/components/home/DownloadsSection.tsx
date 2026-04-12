import { Download, FileText, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { downloadPdfApi, SERVER_URL } from "@/lib/api";
interface PdfCard {
    _id: string;
    title: string;
    subtitle: string;
    meta: string;
    badge: string;
    badgeColor: string;
    image: string;
    imageAlt?: string;
    pdf: string;
    tag: string;
}

interface DownloadsData {
    subheading: string;
    heading: string;
    highlightTitle: string;
    description: string;
    cards: PdfCard[];
}

const cardVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
};

const DownloadsSection = () => {
    const [data, setData] = useState<DownloadsData>({
        subheading: 'Resources',
        heading: 'Expand Your Business with Health & Wellness',
        highlightTitle: 'Health & Wellness',
        description: 'Download our official reports, brochures, and floor plans to stay informed and plan your participation.',
        cards: []
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDownloads = async () => {
            try {
                const result = await downloadPdfApi.get();
                if (result) {
                    // Map image and pdf URLs to include SERVER_URL if they are relative paths
                    const mappedCards = result.cards.map((card: any) => ({
                        ...card,
                        image: card.image.startsWith('http') ? card.image : `${SERVER_URL}${card.image}`,
                        pdf: card.pdf.startsWith('http') ? card.pdf : `${SERVER_URL}${card.pdf}`
                    }));
                    setData({ ...result, cards: mappedCards });
                }
            } catch (error) {
                console.error("Failed to fetch downloads:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDownloads();
    }, []);

    const handleDownload = (pdf: string, title: string) => {
        const link = document.createElement("a");
        link.href = pdf;
        link.download = title.replace(/\s+/g, "-").toLowerCase() + ".pdf";
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Only use fetched cards from API
    const displayCards = data.cards;

    if (isLoading) {
        return (
            <div className="py-20 flex flex-col items-center justify-center bg-white">
                <div className="w-10 h-10 border-4 border-[#23471d] border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-slate-500 font-inter">Loading resources...</p>
            </div>
        );
    }

    if (!isLoading && displayCards.length === 0) {
        return null; // Don't show the section if no resources are managed
    }

    // Split heading for highlighting based on highlightTitle
    const renderHeading = () => {
        const highlight = data.highlightTitle;
        if (highlight && data.heading.includes(highlight)) {
            const parts = data.heading.split(highlight);
            return (
                <>
                    {parts[0]}
                    <span className="text-[#d26019]">{highlight}</span>
                    {parts[1]}
                </>
            );
        }
        return data.heading;
    };

    return (
        <section className="py-10 lg:py-14 bg-white relative overflow-hidden">
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: "radial-gradient(#23471d 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                }}
            />

            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                <div className="text-center mb-10" data-aos="fade-up">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <div className="h-px w-8 bg-[#23471d]" />
                        <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-[#23471d]">
                            {data.subheading}
                        </span>
                        <div className="h-px w-8 bg-[#23471d]" />
                    </div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-inter text-slate-900 leading-tight">
                        {renderHeading()}
                    </h2>
                    <p className="mt-3 text-slate-600 text-sm max-w-xl mx-auto leading-relaxed">
                        {data.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {displayCards.map((item, i) => (
                        <motion.div
                            key={item._id}
                            custom={i}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={cardVariants}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                            className="bg-white border border-slate-100 shadow-md hover:shadow-xl transition-shadow duration-300 group overflow-hidden flex flex-col rounded-xl"
                        >
                            <div className="relative overflow-hidden aspect-video bg-white rounded-t-xl">
                                <img
                                    src={item.image}
                                    alt={item.imageAlt || item.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                                <span
                                    className={`absolute top-2.5 left-2.5 ${item.badgeColor || 'bg-[#d26019]'} text-white text-[7px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-md`}
                                >
                                    {item.badge}
                                </span>

                                <span className="absolute top-2.5 right-2.5 bg-white/90 text-slate-900 text-[8px] font-bold px-1.5 py-0.5 tracking-widest rounded-md">
                                    {item.tag}
                                </span>

                                <div className="absolute bottom-2.5 left-2.5 right-2.5">
                                    <p className="text-white font-bold text-[11px] leading-tight drop-shadow">
                                        {item.subtitle}
                                    </p>
                                </div>
                            </div>

                            <div className="p-4 flex flex-col flex-1">
                                <div className="flex items-start gap-2.5 mb-2.5">
                                    <div className="w-8 h-8 rounded-none bg-[#23471d]/10 flex items-center justify-center shrink-0">
                                        <FileText className="w-3.5 h-3.5 text-[#23471d]" />
                                    </div>
                                    <div>
                                        <h3 className="font-inter font-bold text-slate-900 text-[12px] leading-snug">
                                            {item.title}
                                        </h3>
                                        <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">
                                            {item.meta}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-auto pt-2.5 border-t border-slate-100">
                                    <button
                                        onClick={() => handleDownload(item.pdf, item.title)}
                                        className="w-full flex items-center justify-center gap-1.5 bg-[#23471d] hover:bg-[#d26019] text-white text-[9px] font-black uppercase tracking-[0.2em] h-9 transition-colors duration-300 group/btn rounded-lg"
                                    >
                                        <Download className="w-3 h-3" />
                                        {item.tag === 'PDF' || !item.tag ? 'PDF' : item.tag}
                                        <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DownloadsSection;
