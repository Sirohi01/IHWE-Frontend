
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, AtSign, Globe, ShieldCheck, Lock } from "lucide-react";
import HeroBg from "@/assets/buyer.jpg";
import { heroBackgroundApi, SERVER_URL } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const BuyerLanding = () => {
    const isComingSoon = false;
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

    if (isComingSoon) {
        return (
            <div className="min-h-screen bg-white font-sans flex flex-col items-center justify-center relative overflow-hidden">
                {/* Background with Overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20000ms] hover:scale-110"
                    style={{ backgroundImage: `url(${HeroBg})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#23471d]/95 via-black/70 to-black/90" />

                {/* Animated Particles/Accents */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] animate-pulse" />
                    <div className="absolute bottom-[10%] right-[5%] w-80 h-80 bg-emerald-600/10 rounded-full blur-[120px] animate-pulse" />
                </div>

                <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Badge className="mb-6 px-4 py-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] uppercase tracking-[0.3em] font-black rounded-full backdrop-blur-md">
                            Buyer Registration Portal
                        </Badge>

                        <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-8 italic tracking-tighter leading-[1.1]">
                            Coming <span className="text-emerald-400">Soon.</span>
                        </h1>

                        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent mx-auto mb-10 opacity-50" />

                        <p className="text-white/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed tracking-wide">
                            The gateway to India's most exclusive health and wellness sourcing event is almost ready. Prepare for structured B2B networking at IHWE 2026.
                        </p>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl flex items-center gap-4 group hover:bg-white/10 transition-all duration-500 cursor-pointer">
                                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                                    <AtSign size={20} />
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest mb-1">Pre-Register Interest</p>
                                    <p className="text-white font-medium">info@namogangewellness.com</p>
                                </div>
                            </div>

                            <Link to="/">
                                <Button className="h-16 px-10 rounded-2xl bg-white text-black hover:bg-emerald-500 hover:text-white transition-all duration-500 text-sm font-black uppercase tracking-[0.2em] shadow-2xl group">
                                    Explore Expo Site
                                </Button>
                            </Link>
                        </div>

                        <div className="mt-20 flex justify-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                            <ShieldCheck className="text-white" size={32} />
                            <Globe className="text-white" size={32} />
                            <Lock className="text-white" size={32} />
                        </div>
                    </motion.div>
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 text-[9px] uppercase tracking-[0.5em] font-medium text-center">
                    IHWE 2026 • 9th Edition • Global Wellness Sourcing
                </div>
            </div>
        );
    }

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
                                    onClick={() => navigate("/international-buyer-registration")}
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