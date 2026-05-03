import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Mail, Linkedin, Globe } from "lucide-react";
import { advisoryApi, heroBackgroundApi, SERVER_URL } from "@/lib/api";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import heroImgFallback from "../assets/members.jpg";

const AdvisoryBoard = () => {
    const [heroData, setHeroData] = useState<any>(null);
    const [members, setMembers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [heroRes, membersRes] = await Promise.all([
                    heroBackgroundApi.getByPage("Overview / Advisory Board Members"),
                    advisoryApi.getAll()
                ]);
                
                if (heroRes) setHeroData(heroRes);
                setMembers(membersRes);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="bg-[#f9fafb] min-h-screen font-inter">
            {/* ── HERO SECTION - Standardized 16:4 Sleek Style ── */}
            <section
                className="hero-background-standard"
                style={{ 
                    backgroundImage: heroData?.backgroundImage ? `url(${SERVER_URL}${heroData.backgroundImage})` : `url(${heroImgFallback})`,
                    backgroundPosition: "center"
                }}
            >

                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-0 left-0 w-full h-4 md:h-8 bg-[#f9fafb]" style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }} />

                <div className="container mx-auto px-4 text-center text-white relative z-10" data-aos="fade-up">
                    <p className="text-sm uppercase tracking-[0.4em] mb-4 opacity-80">
                        {heroData?.title || "Experts & Visionaries"}
                    </p>
                    <h1 className="text-4xl md:text-6xl font-inter font-semibold mb-6 tracking-tight">
                        {heroData?.heading || "Advisory Board Members"}
                    </h1>
                    <p className="text-white/70 text-base md:text-lg mb-8 max-w-2xl mx-auto font-light leading-relaxed">
                        {heroData?.shortDescription || "Meet the distinguished leaders and professionals shaping the strategic direction."}
                    </p>
                </div>
            </section>

            {/* ── MEMBERS GRID ── */}
            <section className="pb-24 pt-8 relative z-20">
                <div className="container mx-auto px-4 max-w-[1400px]">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="w-10 h-10 border-4 border-[#23471d] border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {members.map((member, idx) => (
                                <motion.div
                                    key={member._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: idx * 0.03 }}
                                    className="group relative bg-white border border-slate-200 rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                                >
                                    {/* Image Area - Reduced padding to decrease height */}
                                    <div className="aspect-square p-3 flex items-center justify-center bg-white">
                                        <LazyLoadImage
                                            src={`${SERVER_URL}${member.image}`}
                                            alt={member.imageAlt || member.name}
                                            effect="blur"
                                            className="max-h-full max-w-full object-cover transition-all duration-700 scale-95 group-hover:scale-100"
                                            wrapperClassName="flex items-center justify-center h-full w-full"
                                        />
                                    </div>

                                    {/* Content - More compact height */}
                                    <div className="p-2.5 bg-white border-t border-slate-100 flex flex-col justify-center text-center pb-3">
                                        <h3 className="text-[10px] font-bold text-slate-900 mb-0.5 truncate uppercase tracking-tight">{member.name}</h3>
                                        <div className="flex flex-col gap-0">
                                            <p className="text-[#23471d] text-[8px] font-black uppercase tracking-widest">{member.role}</p>
                                            <p className="text-slate-500 text-[7px] font-bold uppercase tracking-[0.1em] leading-tight line-clamp-1">{member.organization}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default AdvisoryBoard;
