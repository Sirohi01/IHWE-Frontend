
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import HeroBg from "@/assets/buyer.jpg";
import { heroBackgroundApi, SERVER_URL } from "@/lib/api";

const BuyerLanding = () => {
    const [heroData, setHeroData] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHero = async () => {
            try {
                const data = await heroBackgroundApi.getByPage("Registration / Buyer Registration");
                if (data) setHeroData(data);
            } catch (err) {
                console.error("Error fetching hero data:", err);
            }
        };
        fetchHero();
    }, []);

    return (
        <div className="min-h-screen bg-[#FDFDFD] font-inter text-slate-900">
            {/* ── HERO SECTION ── */}
            <section
                className="hero-background-registration"
                style={{
                    backgroundImage: `url(${heroData?.backgroundImage ? `${SERVER_URL}${heroData.backgroundImage}` : HeroBg})`
                }}
            >
                <div className="absolute inset-0 bg-black/45" />

                <div
                    className="container mx-auto px-4 text-center text-white relative z-10"
                    data-aos="fade-up"
                >
                    <p className="text-sm uppercase tracking-[0.4em] mb-4 opacity-80">
                        {heroData?.title || "Buyer Experience"}
                    </p>

                    <h1
                        className="text-4xl md:text-6xl font-serif font-semibold mb-6 italic tracking-tight"
                    >
                        {heroData?.heading || "Lead the Transformation of Wellness"}
                    </h1>

                    <p className="text-white/70 text-base md:text-lg mb-8 max-w-xl mx-auto font-light leading-relaxed">
                        {heroData?.shortDescription || "Join the global network of sourcing professionals and discover premium manufacturers in health and wellness."}
                    </p>
                </div>
            </section>

            {/* ── MAIN CONTENT ── */}
            <section className="pt-8 pb-24 relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-[1400px]">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white border border-slate-300 shadow-2xl overflow-hidden"
                    >
                        <div className="bg-slate-50/80 border-b border-slate-200 px-8 py-4 justify-between items-center text-left">
                            <h3 className="text-[22px] mb-2 font-semibold text-[#d26019]">
                                Welcome to the 9th Edition of International Health & Wellness Expo 2026 (IHWE Global Edition)
                            </h3>
                            <p className="mb-2">
                                Step into IHWE 2026, a leading global platform uniting healthcare, wellness, AYUSH, organic, and sustainable industries under one roof.
                            </p>
                            <p className="mb-2">
                                Whether you are a visitor discovering innovations or a corporate buyer seeking meaningful business connections, IHWE offers a high-value, curated experience with India’s most trusted brands and manufacturers.
                            </p>
                            <p className="mb-2">
                                Register now and be part of a powerful global movement in health & wellness.
                            </p>
                        </div>

                        <div className="text-center py-12 space-y-6">
                            <h2 className="text-2xl font-bold text-slate-800">
                                Choose Buyer Category
                            </h2>
                            <div className="flex justify-center gap-6">
                                <button
                                    onClick={() => navigate("/buyer-registration-form")}
                                    className="px-6 py-2 bg-[#23471d] text-white font-semibold shadow hover:scale-105 transition-all flex items-center gap-2"
                                >
                                    Domestic Buyer <ArrowRight size={16} />
                                </button>
                                <button
                                    onClick={() => navigate("/buyer-registration-form")}
                                    className="px-6 py-2 bg-[#d26019] text-white font-semibold shadow hover:scale-105 transition-all flex items-center gap-2"
                                >
                                    International Buyer <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default BuyerLanding;