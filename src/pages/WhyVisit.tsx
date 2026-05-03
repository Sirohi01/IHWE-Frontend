import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { ArrowRight } from "lucide-react";
import { heroBackgroundApi, whyVisitApi, SERVER_URL } from "@/lib/api";
import { Button } from "@/components/ui/button";

import visitImg from "@/assets/visit.jpg";

const WhyVisit = () => {
    const [heroData, setHeroData] = useState<any>(null);
    const [pageData, setPageData] = useState<any>(null);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [hero, page] = await Promise.all([
                    heroBackgroundApi.getByPage("Visit / Why Visit?"),
                    whyVisitApi.get()
                ]);
                if (hero) setHeroData(hero);
                if (page) setPageData(page);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchAllData();
    }, []);

    const renderDynamicIcon = (iconName: string, className: string, style?: any) => {
        const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Users;
        return <IconComponent className={className} style={style} />;
    };

    const highlightText = (text: string, highlight: string) => {
        if (!highlight) return text;
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return parts.map((part, i) => 
            part.toLowerCase() === highlight.toLowerCase() 
                ? <span key={i} className="text-[#d26019]">{part}</span> 
                : part
        );
    };

    return (
        <div className="bg-[#f9fafb] min-h-screen font-inter text-slate-900">
            {/* ── HERO SECTION - Standardized 16:4 Sleek Style ── */}
            <section
                className="hero-background-standard"
                style={{
                    backgroundImage: heroData?.backgroundImage ? `url(${SERVER_URL}${heroData.backgroundImage})` : `url(${visitImg})`
                }}
            >

                <div className="absolute inset-0 bg-black/40" />
                <div
                    className="absolute bottom-0 left-0 w-full h-4 md:h-8 bg-[#f9fafb]"
                    style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }}
                />
                <div className="container mx-auto px-4 text-center text-white relative z-10" data-aos="fade-up">
                    <p className="text-sm uppercase tracking-[0.4em] mb-4 opacity-80 font-medium font-inter">
                        {heroData?.title || "Visit · Experience"}
                    </p>
                    <h1 className="text-4xl md:text-6xl font-inter font-semibold mb-6 tracking-tight">
                        {heroData?.heading || "Why Visit IHWE 2026?"}
                    </h1>
                    <p className="text-white/70 text-base md:text-lg mb-8 max-w-3xl mx-auto font-light leading-relaxed font-inter">
                        {heroData?.shortDescription || "Join thousands of healthcare professionals at the regional exhibition."}
                    </p>
                </div>
            </section>

            {/* ── MAIN CONTENT ── */}
            <section className="mt-12 md:mt-24 pb-32 relative z-20">
                <div className="container mx-auto px-6 max-w-7xl">
                    {/* Header - EXACT MATCH TO WHY EXHIBIT STYLE */}
                    <div className="text-center mb-16" data-aos="fade-up">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="h-px w-8 bg-[#23471d]" />
                            <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-[#23471d]">
                                {pageData?.subheading || "Empower Your Journey"}
                            </span>
                            <div className="h-px w-8 bg-[#23471d]" />
                        </div>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-inter text-slate-900 leading-tight">
                            {highlightText(pageData?.heading || "Discover Why You Should Join Us", pageData?.highlightText || "Join Us")}
                        </h2>
                        {pageData?.shortDescription && (
                            <p className="mt-6 text-slate-500 max-w-2xl mx-auto text-base leading-relaxed font-light">
                                {pageData.shortDescription}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {pageData?.reasons?.map((reason: any, idx: number) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.6 }}
                                className="group relative bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full overflow-hidden"
                            >
                                {/* Image Part */}
                                <div className="relative h-48 overflow-hidden bg-slate-100">
                                    <img
                                        src={reason.image ? `${SERVER_URL}${reason.image}` : visitImg}
                                        alt={reason.imageAlt || reason.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 brightness-95"
                                    />
                                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-300" />
                                </div>

                                {/* Icon Badge - Floating */}
                                <div className="absolute left-6 top-[164px] z-20">
                                    <div className="w-12 h-12 bg-white flex items-center justify-center rounded-none shadow-lg border-b-2" style={{ borderColor: reason.accent }}>
                                        {renderDynamicIcon(reason.icon, "w-6 h-6 transition-transform duration-500 group-hover:rotate-12", { color: reason.accent })}
                                    </div>
                                </div>

                                {/* Content Part */}
                                <div className="p-8 pt-10 flex flex-col flex-1">
                                    <h3 className="text-xl font-bold text-slate-900 mb-3 transition-colors duration-300 group-hover:text-[#23471d]">
                                        {reason.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm leading-relaxed mb-6 font-light">
                                        {reason.description}
                                    </p>
                                    
                                    <Link 
                                        to={reason.buttonLink || "/visitor-registration"} 
                                        className="mt-auto flex items-center gap-2 text-[#d26019] text-[9px] font-bold uppercase tracking-widest transition-all duration-300 group-hover:gap-3"
                                    >
                                        {reason.buttonName || "Learn More"} <ArrowRight className="w-3 h-3 translate-y-px" />
                                    </Link>
                                </div>

                                {/* Bottom Accent Line */}
                                <div className="h-1 w-full transition-all duration-500" style={{ backgroundColor: reason.accent }} />
                            </motion.div>
                        ))}
                    </div>

                    {/* ── CALL TO ACTION ── */}
                    <div className="mt-20 text-center" data-aos="fade-up">
                        <Link to="/visitor-registration">
                            <Button className="h-12 px-10 bg-[#23471d] hover:bg-[#1a3516] text-white font-bold text-[10px] uppercase tracking-widest rounded-none shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2 mx-auto">
                                Free Visitor Registration
                                <ArrowRight className="ml-1 w-4 h-4" />
                            </Button>
                        </Link>
                        <p className="mt-8 text-xs text-slate-400 font-bold uppercase tracking-[0.4em] font-inter">
                            Join Us: 21 - 23 AUGUST 2026
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WhyVisit;
