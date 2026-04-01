import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import * as LucideIcons from "lucide-react";
import {
    ChevronRight, ArrowRight, Users
} from "lucide-react";
import { Link } from "react-router-dom";
import { heroBackgroundApi, whyExhibitApi, SERVER_URL } from "@/lib/api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import whyHeroFallback from "../assets/exhi1.jpg";
import ctaFallback from "../assets/confe.jpg";

const WhyExhibit = () => {
    const [heroData, setHeroData] = useState<any>(null);
    const [pageData, setPageData] = useState<any>(null);
    const parallaxRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: parallaxRef,
        offset: ["start end", "end start"]
    });

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [hero, page] = await Promise.all([
                    heroBackgroundApi.getByPage("Exhibit / Why Exhibit?"),
                    whyExhibitApi.get()
                ]);
                if (hero) setHeroData(hero);
                if (page) setPageData(page);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchAllData();
    }, []);

    const y1 = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

    const renderDynamicIcon = (iconName: string, className: string, style?: any) => {
        const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Rocket;
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

    const highlightCTAText = (text: string, highlight: string) => {
        if (!highlight) return text;
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return parts.map((part, i) => 
            part.toLowerCase() === highlight.toLowerCase() 
                ? <span key={i} className="text-orange-400">{part}</span> 
                : part
        );
    };

    return (
        <div className="bg-white min-h-screen font-inter">
            {/* HERO SECTION - Standardized 16:4 Sleek Style */}
            <section
                className="hero-background-standard"
                style={{ 
                    backgroundImage: `url(${heroData?.backgroundImage ? `${SERVER_URL}${heroData.backgroundImage}` : whyHeroFallback})`
                }}
            >
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-0 left-0 w-full h-4 md:h-8 bg-white" style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }} />

                <div className="container mx-auto px-4 text-center text-white relative z-10" data-aos="fade-up">
                    <p className="text-sm uppercase tracking-[0.4em] mb-4 opacity-80">
                        {heroData?.title || "Maximize Visibility & Growth"}
                    </p>
                    <h1 className="text-4xl md:text-6xl font-serif font-semibold mb-6 italic tracking-tight">
                        {heroData?.heading || "Why Exhibit?"}
                    </h1>
                    <p className="text-white/70 text-base md:text-lg mb-8 max-w-2xl mx-auto font-light leading-relaxed">
                        {heroData?.shortDescription || "Join the most significant gathering of healthcare leaders and wellness innovators."}
                    </p>
                </div>
            </section>

            {/* STRATEGIC ADVANTAGES - Refined Headings & Sizes */}
            <section className="pt-6 pb-24 bg-white relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    {/* Header - EXACT MATCH TO INDUSTRY ZONES STYLE */}
                    <div className="text-center mb-16" data-aos="fade-up">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="h-px w-8 bg-[#23471d]" />
                            <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-[#23471d]">
                                {pageData?.subheading || "Empower Your Business"}
                            </span>
                            <div className="h-px w-8 bg-[#23471d]" />
                        </div>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-slate-900 leading-tight">
                            {highlightText(pageData?.heading || "Drive Growth & Innovation", pageData?.highlightText || "Growth & Innovation")}
                        </h2>
                        {pageData?.shortDescription && (
                            <p className="mt-6 text-slate-500 max-w-2xl mx-auto text-base leading-relaxed">
                                {pageData.shortDescription}
                            </p>
                        )}
                    </div>

                    {/* Grid - Dynamic Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {pageData?.benefits?.map((benefit: any, idx: number) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full overflow-hidden"
                            >
                                {/* Image Part */}
                                <div className="relative h-48 overflow-hidden">
                                    <LazyLoadImage
                                        src={`${SERVER_URL}${benefit.image}`}
                                        alt={benefit.imageAlt || benefit.title}
                                        effect="blur"
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        wrapperClassName="w-full h-full"
                                    />
                                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-300" />
                                </div>

                                {/* Icon Badge - Floating */}
                                <div className="absolute left-6 top-[164px] z-20">
                                    <div className="w-12 h-12 bg-white flex items-center justify-center rounded-none shadow-lg border-b-2" style={{ borderColor: benefit.accent }}>
                                        {renderDynamicIcon(benefit.icon, "w-6 h-6", { color: benefit.accent })}
                                    </div>
                                </div>

                                {/* Content Part */}
                                <div className="p-6 pt-10 flex flex-col flex-1">
                                    <h3 className="text-lg font-bold text-slate-900 mb-3 transition-colors duration-300 group-hover:text-[#23471d]">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1 font-light">
                                        {benefit.description}
                                    </p>

                                    <Link 
                                        to={benefit.buttonLink || "/contact"}
                                        className="mt-auto flex items-center gap-2 text-[#d26019] text-[9px] font-bold uppercase tracking-widest transition-all duration-300"
                                    >
                                        {benefit.buttonName || "Learn More"} <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>

                                {/* Bottom Accent Line */}
                                <div className="h-1 w-full transition-all duration-500" style={{ backgroundColor: benefit.accent }} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA SECTION - PARALLAX EFFECT */}
            <section
                ref={parallaxRef}
                className="relative h-[45vh] md:h-[50vh] overflow-hidden bg-slate-900 flex items-center justify-center"
            >
                {/* Parallax Background */}
                <motion.div
                    style={{ y: y1, scale, opacity }}
                    className="absolute inset-0 w-full h-[140%] -top-[20%] z-0"
                >
                    <img
                        src={pageData?.ctaImage ? `${SERVER_URL}${pageData.ctaImage}` : ctaFallback}
                        alt={pageData?.ctaImageAlt || "Success at IH&WE"}
                        className="w-full h-full object-cover brightness-[0.6] contrast-110"
                    />
                </motion.div>

                {/* Content Overlay */}
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl mx-auto"
                    >
                        <h2 className="text-2xl md:text-4xl font-serif text-white mb-4 italic leading-tight">
                            {highlightCTAText(pageData?.ctaTitle || "Ready to Scale Your Brand?", pageData?.ctaHighlightText || "Scale Your Brand?")}
                        </h2>
                        <p className="text-slate-300 text-sm md:text-base mb-8 max-w-xl mx-auto leading-relaxed font-light">
                            {pageData?.ctaDescription || "Secure your premium space today and connect with thousands of decision-makers in the healthcare and wellness sector."}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                to={pageData?.ctaButton1Link || "/book-a-stall"}
                                className="px-6 py-2.5 bg-[#23471d] text-white rounded-none font-bold uppercase tracking-widest hover:bg-[#1a3a14] transition-all transform hover:scale-105 flex items-center gap-2 group shadow-2xl text-[10px]"
                            >
                                {pageData?.ctaButton1Name || "Book Your Stand Now"} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to={pageData?.ctaButton2Link || "/visitor-registration"}
                                className="px-6 py-2.5 bg-transparent border border-white/30 text-white rounded-none font-bold uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all flex items-center gap-2 text-[10px]"
                            >
                                {pageData?.ctaButton2Name || "Register as Visitor"} <Users className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Decorative Floating Elements */}
                <div className="absolute top-10 left-10 w-32 h-32 border border-white/5 rounded-full z-10 animate-pulse hidden lg:block" />
                <div className="absolute bottom-10 right-10 w-48 h-48 border border-white/5 rounded-full z-10 animate-pulse delay-700 hidden lg:block" />
            </section>
        </div>
    );
};

export default WhyExhibit;
