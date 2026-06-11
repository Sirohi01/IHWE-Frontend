
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, AtSign, Globe, ShieldCheck, Lock } from "lucide-react";
import HeroBg from "@/assets/buyer.jpg";
import { heroBackgroundApi, SERVER_URL } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BuyerRegistration from "@/pages/registration/BuyerRegistration";
import InternationalBuyerRegistration from "@/pages/buyer/InternationalBuyerRegistration";
import SectionContainer from "@/components/layout/SectionContainer";

const BuyerLanding = () => {
    const isComingSoon = false;
    const [heroData, setHeroData] = useState<any>(null);
    const navigate = useNavigate();
    const [buyerType, setBuyerType] = useState<'domestic' | 'international' | null>(null);


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

    const formRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (buyerType && formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [buyerType]);

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
            <section
                className="hero-background-registration relative overflow-hidden pt-[125px] sm:pt-[100px] lg:pt-0 pb-8 lg:pb-0 !aspect-auto lg:!aspect-[16/5] !h-auto lg:!h-auto"
                style={{
                    backgroundImage: "url('/buyer/doin.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'left',
                    backgroundRepeat: 'no-repeat',
                    fontFamily: "'Barlow', sans-serif",
                }}
            >
                <SectionContainer className="w-full py-4">
                    <div className="relative z-10 flex flex-col gap-2 w-full lg:w-[70%] text-center lg:text-left items-center lg:items-start">

                        {/* Register as a Buyer */}
                        <div className="inline-block mt-6 w-fit mx-auto lg:mx-0">
                            <h2
                                className="text-sm md:text-base font-bold uppercase tracking-[0.2em] text-[#1a4d1a] bg-[#a8d060] px-3 py-1 rounded-sm border-l-4 border-[#5a9e20]"
                                style={{ animation: 'gentleBounce 2s ease-in-out infinite' }}
                            >
                                Register as a Buyer
                                <style>{`
      @keyframes gentleBounce {
        0%, 100% { transform: translateY(0); }
        50%       { transform: translateY(-4px); }
      }
    `}</style>
                            </h2>
                        </div>

                        {/* Main Heading */}
                        <div className="mt-2">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase leading-tight">
                                Unlock Business
                            </h1>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase leading-tight mt-1">
                                <span className="text-[#a8d060] drop-shadow-[0_0_20px_rgba(168,208,96,0.4)]">
                                    Opportunities
                                </span>
                            </h1>
                        </div>

                        {/* Description */}
                        <p className="text-white/90 text-sm sm:text-base lg:text-lg leading-relaxed max-w-md mt-4 mx-auto lg:mx-0">
                            Join{' '}
                            <span className="text-[#a8d060] font-bold">8,000+ verified</span>{' '}
                            seller | buyers, connect with top exhibitors,
                            explore quality products, and grow your business.
                        </p>

                        {/* Stats Row */}
                        <div className="grid grid-cols-2 lg:flex lg:items-center gap-y-6 gap-x-2 lg:gap-0 mt-6 lg:mt-3 w-full max-w-lg lg:max-w-none mx-auto lg:mx-0">
                            {[
                                {
                                    num: '1,000+', label: 'Buyers',
                                    icon: <img src="/buyer/sb1.png" alt="" className="w-16 lg:w-20 h-auto object-contain" />
                                },
                                {
                                    num: '150+', label: 'Exhibitors',
                                    icon: <img src="/buyer/sb2.png" alt="" className="w-16 lg:w-20 h-auto object-contain" />,
                                },
                                {
                                    num: '5,000+', label: 'Products',
                                    icon: <img src="/buyer/sb3.png" alt="" className="w-16 lg:w-20 h-auto object-contain" />,
                                },
                                {
                                    num: 'Global', label: 'Participation',
                                    icon: <img src="/buyer/sb4.png" alt="" className="w-16 lg:w-20 h-auto object-contain" />,
                                },
                            ].map((stat, i, arr) => (
                                <div key={i} className="flex items-center lg:contents">
                                    <div className="flex flex-col items-center text-center px-2 flex-1">
                                        <div className="mb-1">
                                            {stat.icon}
                                        </div>
                                        <div className="text-lg lg:text-xl font-bold text-[#a8d060] leading-none tracking-tight">
                                            {stat.num}
                                        </div>
                                        <div className="text-[10px] lg:text-xs font-semibold text-white uppercase tracking-[0.2em] mt-1.5 opacity-90">
                                            {stat.label}
                                        </div>
                                    </div>
                                    {/* Vertical Divider */}
                                    {i < arr.length - 1 && (
                                        <div className="hidden lg:block h-16 w-[1.5px] bg-[#a8d060]/30 shrink-0" />
                                    )}
                                </div>
                            ))}
                        </div>

                    </div>

                    <div className="hidden lg:block lg:w-[30%]">
                        {/* <img src="/bsmeet/bsherob.png" alt="" /> */}
                    </div>
                </SectionContainer>
            </section>

            {/* button section  */}
            <section className="w-full pt-4 px-6 text-center bg-white " >
                {/* Title with Leaf Icons */}
                <div className="flex items-center justify-center gap-4 mb-2">
                    <div className="flex items-center gap-2">
                        <span className="block w-12 h-[1px] bg-gray-300"></span>
                    </div>
                    <h2 className="text-lg font-medium tracking-[0.15em] text-[#1a3352] uppercase">
                        Choose Your Category
                    </h2>
                    <div className="flex items-center gap-2">
                        <span className="block w-12 h-[1px] bg-gray-300"></span>
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto ">

                    {/* Domestic Buyer */}
                    <div
                        onClick={() => setBuyerType('domestic')}
                        className={`relative flex items-center gap-6 bg-[#f7fcf2] border-2 rounded-xl px-4 py-3 overflow-hidden text-left cursor-pointer group transition-all duration-300 active:scale-[0.98] ${buyerType === 'domestic'
                            ? 'border-[#a8d060] shadow-[0_8px_30px_rgba(77,127,29,0.2)] ring-4 ring-[#a8d060]/20'
                            : 'border-[#dfeccd] shadow-sm hover:shadow-md opacity-70 hover:opacity-100 grayscale-[30%] hover:grayscale-0'
                            }`}
                    >

                        {/* Background Full Image */}
                        <img
                            src="/buyer/dombuybg.png"
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover opacity-100 pointer-events-none"
                        />

                        {/* Logo */}
                        <div className="relative shrink-0 z-10">
                            <div className={`w-24 h-24 rounded-full bg-white flex items-center justify-center border-[6px] transition-all duration-300 ${buyerType === 'domestic' ? 'border-[#eef6e2] shadow-xl scale-105' : 'border-transparent shadow-md'}`}>
                                <div className="w-20 h-20 rounded-full bg-[#4d7f1d] flex items-center justify-center">
                                    <img
                                        src="/buyer/dombuy.png"
                                        alt="Domestic"
                                        className="w-26 h-26 object-contain"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10">
                            <h3 className="text-[#4d7f1d] font-medium text-lg leading-none mb-1 uppercase tracking-wide">
                                Domestic Buyer
                            </h3>

                            <p className="text-[#2d2d2d] text-sm leading-relaxed max-w-[350px] font-medium">
                                For buyers based in India looking to connect with leading brands and manufacturers.
                            </p>
                            {/* Active Button Pill */}
                            <div className={`mt-1 inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-medium uppercase tracking-widest transition-all ${buyerType === 'domestic' ? 'bg-[#4d7f1d] text-white' : 'bg-[#eef6e2] text-[#4d7f1d] group-hover:bg-[#dcedc8]'}`}>
                                {buyerType === 'domestic' ? '✓ Selected' : 'Select Domestic'}
                            </div>
                        </div>
                    </div>

                    {/* International Buyer */}
                    <div
                        onClick={() => setBuyerType('international')}
                        className={`relative flex items-center gap-6 bg-[#f4f8fd] border-2 rounded-xl px-4 py-3 overflow-hidden text-left cursor-pointer group transition-all duration-300 active:scale-[0.98] ${buyerType === 'international'
                            ? 'border-[#4f8fe0] shadow-[0_8px_30px_rgba(24,95,165,0.2)] ring-4 ring-[#4f8fe0]/20'
                            : 'border-[#d9e7f6] shadow-sm hover:shadow-md opacity-70 hover:opacity-100 grayscale-[30%] hover:grayscale-0'
                            }`}
                    >

                        {/* Background Full Image */}
                        <img
                            src="/buyer/intbuybg.png"
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover opacity-100 pointer-events-none"
                        />

                        {/* Logo */}
                        <div className="relative shrink-0 z-10">
                            <div className={`w-24 h-24 rounded-full bg-white flex items-center justify-center border-[6px] transition-all duration-300 ${buyerType === 'international' ? 'border-[#e4eef9] shadow-xl scale-105' : 'border-transparent shadow-md'}`}>
                                <div className="w-20 h-20 rounded-full bg-[#185fa5] flex items-center justify-center">
                                    <img
                                        src="/buyer/intbuy.png"
                                        alt="International"
                                        className="w-26 h-26 object-contain"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10">
                            <h3 className="text-[#185fa5] font-medium text-lg leading-none mb-1 uppercase tracking-wide">
                                International Buyer
                            </h3>

                            <p className="text-[#2d2d2d] text-sm leading-relaxed max-w-[350px] font-medium">
                                For international buyers looking to source premium products and build global partnerships.
                            </p>
                            {/* Active Button Pill */}
                            <div className={`mt-1 inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-medium uppercase tracking-widest transition-all ${buyerType === 'international' ? 'bg-[#185fa5] text-white' : 'bg-[#e4eef9] text-[#185fa5] group-hover:bg-[#d0e1f3]'}`}>
                                {buyerType === 'international' ? '✓ Selected' : 'Select International'}
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <div ref={formRef} className="scroll-mt-10">
                {buyerType === 'domestic' && <BuyerRegistration key="domestic" />}
                {buyerType === 'international' && <InternationalBuyerRegistration key="international" />}
            </div>
        </div>
    );
};

export default BuyerLanding;