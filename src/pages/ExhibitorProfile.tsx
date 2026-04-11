import { useState, useEffect } from "react";
import {
    Calendar, MapPin, CheckCircle2, Users, Building2, Sparkles
} from "lucide-react";
import { heroBackgroundApi, SERVER_URL, exhibitorProfileApi } from "@/lib/api";
import heroImgFallback from "../assets/profile.jpg";

const ExhibitorProfile = () => {
    const [heroData, setHeroData] = useState<any>(null);
    const [profileData, setProfileData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [hero, profile] = await Promise.all([
                    heroBackgroundApi.getByPage("Exhibit / Exhibitor Profile"),
                    exhibitorProfileApi.get()
                ]);
                if (hero) setHeroData(hero);
                if (profile) setProfileData(profile);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const segments = profileData?.segments || [];
    const categories = profileData?.productCategories || [];

    return (
        <div className="bg-white min-h-screen font-inter pb-20">
            {/* ── HERO SECTION - Standardized 16:4 Sleek Style ── */}
            <section
                className="hero-background-standard"
                style={{
                    backgroundImage: `url(${heroData?.backgroundImage ? `${SERVER_URL}${heroData.backgroundImage}` : heroImgFallback})`
                }}
            >
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-0 left-0 w-full h-4 md:h-8 bg-white" style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }} />

                <div className="container mx-auto px-4 text-center text-white relative z-10" data-aos="fade-up">
                    <p className="text-sm uppercase tracking-[0.4em] mb-4 opacity-80">
                        {heroData?.title || "Strategic Participation"}
                    </p>
                    <h1 className="text-4xl md:text-6xl font-serif font-semibold mb-6 italic tracking-tight">
                        {heroData?.heading || "Exhibitor Profile"}
                    </h1>
                    <p className="text-white/70 text-base md:text-lg mb-8 max-w-2xl mx-auto font-light leading-relaxed">
                        {heroData?.shortDescription || "Position your brand at the center of the world's fastest-growing market."}
                    </p>
                </div>
            </section>

            {/* ── MAIN CONTENT ── */}
            <section className="pt-12">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid lg:grid-cols-3 gap-12">

                        {/* LEFT COLUMN: MAIN INFO */}
                        <div className="lg:col-span-2">

                            {/* SHOW INFORMATION */}
                            <div className="mb-16">
                                <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-10 border-l-4 border-[#23471d] pl-4">Show Information</h2>
                                <div className="flex flex-col gap-3 max-w-2xl">
                                    {/* Date Card */}
                                    <div className="bg-[#FAF9F6] p-4 flex items-start gap-5 border-l-4 border-[#23471d] group hover:bg-white hover:shadow-xl transition-all duration-300">
                                        <div className="w-10 h-10 rounded-none bg-white flex items-center justify-center shrink-0 shadow-sm transition-colors group-hover:bg-[#23471d] group-hover:text-white">
                                            <Calendar className="w-4 h-4 text-[#23471d] group-hover:text-white" />
                                        </div>
                                        <div className="pt-0.5">
                                            <h3 className="text-[8px] font-bold uppercase tracking-[0.3em] text-[#d26019] mb-1">Event Date</h3>
                                            <div className="text-base font-bold text-slate-900 mb-0.5 font-serif leading-tight text-left">
                                                {profileData?.eventDate || "21 - 23 August 2026"}
                                            </div>
                                            <p className="text-[13px] md:text-sm text-slate-600 leading-relaxed text-left font-inter italic">
                                                {profileData?.eventDay || "Friday - Sunday"}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Venue Card */}
                                    <div className="bg-[#FAF9F6] p-4 flex items-start gap-5 border-l-4 border-[#23471d] group hover:bg-white hover:shadow-xl transition-all duration-300">
                                        <div className="w-10 h-10 rounded-none bg-white flex items-center justify-center shrink-0 shadow-sm transition-colors group-hover:bg-[#23471d] group-hover:text-white">
                                            <MapPin className="w-4 h-4 text-[#23471d] group-hover:text-white" />
                                        </div>
                                        <div className="pt-0.5">
                                            <h3 className="text-[8px] font-bold uppercase tracking-[0.3em] text-[#d26019] mb-1">Venue Location</h3>
                                            <div className="text-base font-bold text-slate-900 mb-0.5 font-serif leading-tight text-left">
                                                {profileData?.venueHall || "Hall 6, Pragati Maidan"}
                                            </div>
                                            <p className="text-[13px] md:text-sm text-slate-600 leading-relaxed text-left font-inter italic">
                                                {profileData?.venueCity || "New Delhi, India"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* COLORED BOXES GRID */}
                            <div className="mb-20">
                                <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-10 border-l-4 border-[#23471d] pl-4">Exhibitor Profile</h2>

                                <div className="flex flex-wrap justify-start gap-0.5">
                                    <div className="w-full flex flex-wrap justify-start gap-0.5">
                                        {segments.map((seg: any, i: number) => (
                                            <div
                                                key={i}
                                                className="w-full sm:w-[calc(20%-2px)] min-h-[100px] p-4 flex items-center justify-center text-center text-white text-[10px] font-bold leading-tight uppercase tracking-widest"
                                                style={{ backgroundColor: seg.accent || "#23471d" }}
                                            >
                                                {seg.title}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* PRODUCT CATEGORIES */}
                            <div>
                                <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-10 border-l-4 border-[#23471d] pl-4">Product Categories</h2>
                                <div className="grid sm:grid-cols-2 gap-y-3 gap-x-8">
                                    {categories.map((cat: any, i: number) => (
                                        <div key={i} className="flex items-center gap-3 py-1 border-b border-dashed border-slate-100 group">
                                            <div className="w-5 h-5 rounded bg-slate-50 border border-slate-200 flex items-center justify-center text-[#23471d] group-hover:bg-[#23471d] group-hover:text-white transition-colors">
                                                <CheckCircle2 size={12} />
                                            </div>
                                            <span className="text-[13px] text-slate-600 font-medium group-hover:text-slate-900 transition-colors uppercase tracking-tight">{cat.title}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* RIGHT COLUMN: SIDEBAR */}
                        <div className="lg:col-span-1 space-y-8">

                            {/* REGISTRATION LINKS CARD */}
                            <div className="bg-slate-50/50 p-6  border border-slate-300 sticky top-28">
                                <div className="space-y-4">
                                    <a href="/visitor-registration" className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200 hover:border-[#23471d] hover:shadow-md transition-all group overflow-hidden">
                                        <div className="w-10 h-10 bg-[#23471d] rounded-xl flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                                            <Users size={18} />
                                        </div>
                                        <span className="font-bold text-slate-800 group-hover:text-[#23471d] text-sm tracking-tight">Visitor Registration</span>
                                    </a>
                                    <a href="/book-a-stand" className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200 hover:border-[#23471d] hover:shadow-md transition-all group overflow-hidden">
                                        <div className="w-10 h-10 bg-[#23471d] rounded-xl flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                                            <Building2 size={18} />
                                        </div>
                                        <span className="font-bold text-slate-800 group-hover:text-[#23471d] text-sm tracking-tight">Book a Stand</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default ExhibitorProfile;
