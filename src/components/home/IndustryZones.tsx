import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
    ArrowRight, Box, Activity, Monitor, Beaker, Leaf, Plane, ShieldCheck, Microscope,
    Star, Heart, Globe, Zap, Award, Package, MapPin, Users
} from "lucide-react";
import { Link } from "react-router-dom";
import { featuredServicesApi, SERVER_URL } from "@/lib/api";

const ICONS_MAP: Record<string, any> = {
    ShieldCheck, Activity, Box, Monitor, Microscope, Leaf, Plane, Beaker,
    Star, Heart, Globe, Zap, Award, Package, MapPin, Users
};

const IconComponent = ({ name, ...props }: { name: string; [key: string]: any }) => {
    const Comp = ICONS_MAP[name] || ShieldCheck;
    return <Comp {...props} />;
};

interface FeaturedServicesData {
    subheading: string;
    heading: string;
    highlightText: string;
    description: string;
    cards: Array<{
        _id: string;
        title: string;
        description: string;
        icon: string;
        image: string;
        imageAlt: string;
        accent: string;
        buttonText: string;
        buttonUrl: string;
    }>;
}

const IndustryZones = () => {
    const [data, setData] = useState<FeaturedServicesData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await featuredServicesApi.get();
                if (result) {
                    setData(result);
                }
            } catch (error) {
                console.error("Failed to fetch featured services:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const renderTitle = (title: string, highlight: string) => {
        if (!highlight || !title.includes(highlight)) return title;
        const parts = title.split(new RegExp(`(${highlight})`, "gi"));
        return parts.map((part, i) => 
            part.toLowerCase() === highlight.toLowerCase() 
                ? <span key={i} className="text-[#d26019]">{part}</span> 
                : part
        );
    };

    const truncateWords = (text: string, limit: number) => {
        const words = text.split(/\s+/);
        if (words.length <= limit) return text;
        return words.slice(0, limit).join(" ") + "...";
    };

    if (isLoading) {
        return (
            <section className="pt-10 pb-10 lg:pt-14 lg:pb-12 bg-white flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#23471d]"></div>
            </section>
        );
    }

    if (!data || !data.cards?.length) return null;

    return (
        <section className="pt-10 pb-10 lg:pt-14 lg:pb-12 bg-white relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#23471d]/20 to-transparent" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-10" data-aos="fade-up">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-px w-8 bg-[#23471d]" />
                        <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-[#23471d]">
                            {data.subheading}
                        </span>
                        <div className="h-px w-8 bg-[#23471d]" />
                    </div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-slate-900 leading-tight">
                        {renderTitle(data.heading, data.highlightText)}
                    </h2>
                    <p className="mt-6 text-slate-500 max-w-2xl mx-auto text-base leading-relaxed">
                        {data.description}
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {data.cards.map((card, idx) => (
                        <motion.div
                            key={card._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative bg-white border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
                        >
                            {/* Image Part */}
                            <div className="relative h-48 overflow-hidden">
                                {card.image ? (
                                    <img
                                        src={`${SERVER_URL}${card.image}`}
                                        alt={card.imageAlt || card.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                                        <Box className="w-12 h-12 text-slate-300" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-300" />

                                {/* Shinny Overlay */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                                    <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
                                </div>
                            </div>

                            {/* Icon Badge - Floating */}
                            <div className="absolute left-6 top-[172px] z-20">
                                <div className="w-12 h-12 bg-white flex items-center justify-center rounded-none shadow-lg border-b-2" style={{ borderColor: card.accent }}>
                                    <IconComponent name={card.icon} className="w-6 h-6" style={{ color: card.accent }} />
                                </div>
                            </div>

                            {/* Content Part */}
                            <div className="p-8 pt-10 flex flex-col flex-1">
                                <h3 className="text-xl font-bold text-slate-900 mb-3 transition-colors duration-300">
                                    {card.title}
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    {truncateWords(card.description, 95)}
                                </p>
                            </div>

                            {/* Bottom Accent Line */}
                            <div className="h-1 w-full transition-all duration-500" style={{ backgroundColor: card.accent }} />
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-12 text-center" data-aos="fade-up">
                    <Link
                        to="/book-a-stand"
                        className="rounded-none bg-[#23471d] hover:bg-[#d26019] text-white h-12 px-10 font-black uppercase tracking-[0.2em] text-xs group shadow-xl transition-all inline-flex items-center justify-center"
                    >
                        Exhibit At India Health 2026 <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </Link>
                    <p className="mt-6 text-slate-400 text-xs font-bold uppercase tracking-widest">
                        Join 2,500+ exhibiting brands from over 25 countries
                    </p>
                </div>
            </div>
        </section>
    );
};

export default IndustryZones;
