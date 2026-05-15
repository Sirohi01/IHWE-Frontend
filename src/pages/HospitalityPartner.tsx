
import {
    Users, Globe, Calendar, TrendingUp, BarChart3,
    Building2, Hotel, Landmark, Mail, Phone, Globe2,
    CheckCircle2, Star, ShieldCheck, Search, Award, Presentation, Bell,
    Eye, Handshake, Shield, Contact2, Bed, Megaphone, BadgeCheck, Percent,
    CreditCard, CheckCircle, Smartphone, ConciergeBell
} from 'lucide-react';
import SectionContainer from "@/components/layout/SectionContainer";
import TopImage from "@/assets/hospitalityPartner/TopImage.jpeg";
import BottomImage from "@/assets/hospitalityPartner/BottomImage2.jpeg";
import persons from "@/assets/hospitalityPartner/persons.jpeg"
import awards from "@/assets/hospitalityPartner/award.jpeg"
import bed from "@/assets/hospitalityPartner/bed.jpeg"
import bell from "@/assets/hospitalityPartner/bell.jpeg"
import building from "@/assets/hospitalityPartner/building.jpeg"
import calender from "@/assets/hospitalityPartner/calender.jpeg"
import globe from "@/assets/hospitalityPartner/globe.jpeg"
import idcard from "@/assets/hospitalityPartner/idcard.jpeg"
import megaphone from "@/assets/hospitalityPartner/megaphone.jpeg"
import power from "@/assets/hospitalityPartner/power.jpeg"




const HospitalityPartner = () => {
    return (
        <div className="min-h-screen bg-white font-inter text-[#0b1a3a]">

            {/* MAIN CONTENT WRAPPER */}
            <div className="w-full">

                {/* 1. MAIN HERO BANNER (Standardized Alignment) */}
                <div className="relative w-full overflow-hidden bg-white min-h-[440px]">

                    {/* Background Visual (Absolute positioned) */}
                    <div className="absolute right-0 top-0 bottom-0 w-[85%] lg:w-[85%] pointer-events-none  z-0">
                        <img src={TopImage} alt="Hotel Background" className="w-full h-full object-cover" />
                    </div>

                    <SectionContainer className="relative z-10 py-2">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-1 h-full">

                            {/* LEFT SIDE: HEADER & TEXT CONTENT */}
                            <div className="lg:col-span-5 flex flex-col pt-2 ">

                                {/* TOP ROW: LOGO & TAGLINE */}
                                <div className="flex items-start justify-start gap-2 mb-6">
                                    <div className="flex items-center">
                                        <div className="flex flex-col">
                                            <h2 className="text-[#003399] font-black text-[24px] leading-[1.05] uppercase tracking-tight">
                                                International <br />
                                                <span className="text-[#2e7d32]">Health & Wellness</span> <br />
                                                Expo 2026
                                            </h2>
                                            <div className="bg-amber-600 text-white text-[9px] font-black px-2 py-0.5 mt-1 rounded tracking-[0.2em] w-fit uppercase">Global Edition</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-5 border-l-2 border-slate-200 ml-6 pl-4 py-3">
                                        <div className="flex flex-col">
                                            <span className="text-[#0b1a3a] font-black text-lg leading-tight uppercase">Collaborate.</span>
                                            <span className="text-[#2e7d32] font-black text-lg leading-tight uppercase">Connect.</span>
                                            <span className="text-amber-600 font-black text-lg leading-tight uppercase">Grow Together.</span>
                                        </div>
                                    </div>
                                </div>

                                {/* HERO TEXT CONTENT */}
                                <div className="flex flex-col ">
                                    <p className="text-[#003399] font-black text-sm tracking-[0.3em] uppercase mb-4">Partner with us as a</p>
                                    <h1 className="text-[50px] lg:text-[60px] font-extrabold leading-[0.82] text-[#0b1a3a] uppercase mb-3">
                                        Hospitality <br />
                                        <span className="text-amber-600">Partner</span>
                                    </h1>

                                    {/* Multi-color line */}
                                    <div className="flex w-full h-[4px] mb-6">
                                        <div className="w-[45%] bg-[#003399]"></div>
                                        <div className="w-[55%] bg-amber-500"></div>
                                    </div>

                                    <p className="text-[#0b1a3a] font-black text-[18px] mb-4">Exceptional Experiences. Memorable Stays. Lasting Impressions.</p>
                                    <p className="text-slate-600 text-[14px] font-medium leading-relaxed max-w-[480px]">
                                        Partner with IHWE 2026 and be the preferred hospitality partner for 8,000+ exhibitors, buyers and decision makers from around the world.
                                    </p>
                                </div>
                            </div>

                            {/* RIGHT SIDE: WHY PARTNER BOX */}
                            <div className="lg:col-span-7 relative flex items-center justify-end h-full">
                                <div className="relative z-20 w-[320px] bg-[#0b1a3a]/95 backdrop-blur-sm rounded-2xl p-2 text-white border border-white/20 shadow-2xl mr-4 flex flex-col">
                                    <h4 className="text-white font-black text-[15px] uppercase tracking-wider mb-3 flex flex-col leading-tight">
                                        WHY PARTNER <br />
                                        <span>WITH <span className="text-amber-500">IHWE 2026?</span></span>
                                    </h4>

                                    <div className="space-y-2">
                                        {[
                                            { icon: Users, text: "Access 8,000+ exhibitors, buyers & decision makers" },
                                            { icon: Eye, text: "High visibility before, during & after the event" },
                                            { icon: Globe, text: "Be part of a trusted global health & wellness platform" },
                                            { icon: Handshake, text: "Build strong partnerships & long-term relationships" },
                                            { icon: Shield, text: "Enhance brand credibility & market leadership" }
                                        ].map((item, i) => (
                                            <div key={i} className="flex gap-4 items-center border-t border-white/10 pt-2 first:border-0 first:pt-0">
                                                <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                                    <item.icon className="w-5 h-5 text-emerald-400" />
                                                </div>
                                                <p className="text-[10px] font-semibold leading-snug text-slate-100 uppercase tracking-tight">{item.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SectionContainer>
                </div>

                {/* MIDDLE SECTION (70/30 SPLIT - Standardized Alignment) */}
                <SectionContainer className="mb-1 flex flex-col lg:flex-row gap-6 items-start ">

                    {/* LEFT COLUMN: 70% (Stats + Benefits) */}
                    <div className="w-full lg:w-[70%] flex flex-col gap-2 relative z-20 -mt-3 ">

                        {/* 2. STATS STRIP (Compacted) */}
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-0 border border-slate-200 rounded-[1.5rem] overflow-hidden shadow-sm bg-white">
                            {[
                                { icon: persons, val: "8,000+", label: "Delegates & Exhibitors Expected", color: "text-white", bg: "bg-[#006b70]", isImg: true },
                                { icon: globe, val: "Multiple", label: "Exhibitor Segments", color: "text-white", bg: "bg-[#0b1a3a]", isImg: true },
                                { icon: calender, val: "3", label: "Power-Packed Days", color: "text-white", bg: "bg-[#b4841c]", isImg: true },
                                { icon: power, val: "Unlimited", label: "Business Opportunities", color: "text-white", bg: "bg-[#0b1a3a]", isImg: true },
                                { icon: bell, val: "High", label: "Brand Visibility & Exposure", color: "text-white", bg: "bg-[#006b70]", isImg: true }
                            ].map((stat, i) => (
                                <div key={i} className="py-4 px-4 flex items-center gap-4 border-r last:border-r-0 border-slate-100">
                                    <div className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 shadow-md`}>
                                        <img src={stat.icon} alt="" className="w-16 h-16 object-contain" />
                                    </div>
                                    <div className="flex flex-col text-left">
                                        <h5 className="text-[#0b1a3a] font-black text-[16px] leading-none mb-1">{stat.val}</h5>
                                        <p className="text-slate-500 text-[9px] font-bold uppercase leading-tight max-w-[100px]">{stat.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 3. CORE BENEFITS GRID */}
                        <div className="grid grid-cols-5 gap-2">
                            {[
                                { title: "BRAND VISIBILITY", icon: building, color: "bg-[#006b70]", desc: "Prominent logo placement across IHWE 2026 platforms, signage, digital promotions and hospitality areas." },
                                { title: "DIRECT BUSINESS ACCESS", icon: idcard, color: "bg-amber-600", desc: "Receive contact details of all exhibitors for exclusive stay offers and hospitality solutions." },
                                { title: "PREFERRED STAY PARTNER", icon: bed, color: "bg-[#0b1a3a]", desc: "Recommended as the official hospitality partner to exhibitors and visitors attending the event." },
                                { title: "EXCLUSIVE VISIBILITY", icon: megaphone, color: "bg-[#006b70]", desc: "Logo promotion on our website with a direct link to your website." },
                                { title: "ADDITIONAL BENEFITS", icon: awards, color: "bg-amber-600", desc: "Inclusion in event directory, social media mentions & emailer promotions." }
                            ].map((benefit, i) => (
                                <div key={i} className="flex flex-col h-full bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm group hover:shadow-md transition-shadow">
                                    <div className={`${benefit.color} text-white px-2 py-2 flex items-center justify-center text-center`}>
                                        <span className="text-[10px] font-semibold uppercase tracking-tight leading-none">{benefit.title}</span>
                                    </div>
                                    <div className="px-6 py-2 flex-1 flex flex-col items-center text-center justify-center bg-white">
                                        <div className="w-16 h-16 flex items-center justify-center mb-2">
                                            <img src={benefit.icon} alt="" className="w-16 h-16 text-[#0b1a3a] object-contain" />
                                        </div>
                                        <p className="text-[10px] text-slate-600 leading-tight font-medium">{benefit.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* ADDITIONAL ADVANTAGES STRIP */}
                        <div className="bg-[#f1f5f9] border border-slate-200 rounded-2xl flex overflow-hidden">
                            <div className="w-[160px] bg-slate-100/50 py-6 px-5 flex items-center border-r border-slate-200">
                                <h3 className="text-[#0b1a3a] font-black text-[13px] uppercase leading-tight tracking-widest">ADDITIONAL <br /> ADVANTAGES</h3>
                            </div>
                            <div className="flex-1 grid grid-cols-5 gap-0">
                                {[
                                    { icon: building, text: "Opportunity to offer exclusive rates & packages to exhibitors", isImg: true },
                                    { icon: bell, text: "Showcase your hotel facilities to a high-value business audience", isImg: true },
                                    { icon: persons, text: "Access to a network of industry leaders & global professionals", isImg: true },
                                    { icon: Percent, text: "Opportunity for seasonal tie-ups & long-term partnerships", isImg: false },
                                    { icon: power, text: "Year-round visibility through pre & post event promotions", isImg: true }
                                ].map((adv, i) => (
                                    <div key={i} className="flex flex-col items-center text-center py-6 px-3 border-r last:border-r-0 border-slate-200">
                                        <div className="w-12 h-12 flex items-center justify-center mb-2">
                                            {adv.isImg ? (
                                                <img src={adv.icon as string} alt="" className="w-10 h-10 text-[#0b1a3a] object-contain" />
                                            ) : (
                                                <adv.icon className="w-8 h-8 text-[#0b1a3a]" />
                                            )}
                                        </div>
                                        <p className="text-[9px] font-bold text-[#0b1a3a] leading-tight uppercase tracking-tight max-w-[90px] mx-auto">{adv.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: 30% (Partnership Packages) */}
                    <div className="w-full lg:w-[30%] bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden flex flex-col h-full relative z-20 -mt-8">
                        <div className="bg-gradient-to-r from-[#b4841c] via-[#d4a017] to-[#b4841c] px-4 py-2 flex items-center justify-center text-center">
                            <h3 className="text-white font-black text-[18px] uppercase tracking-wider">PARTNERSHIP PACKAGES</h3>
                        </div>

                        <div className="flex-1 flex flex-col">
                            {[
                                {
                                    name: "ASSOCIATE PARTNER",
                                    price: "₹1,25,000 + GST",
                                    color: "text-[#006b70]",
                                    bg: "bg-[#006b70]",
                                    benefits: ["Logo on website & digital platforms", "Social media mentions", "Exhibitor list & emails"]
                                },
                                {
                                    name: "PREFERRED PARTNER",
                                    price: "₹2,25,000 + GST",
                                    color: "text-[#0b1a3a]",
                                    bg: "bg-[#0b1a3a]",
                                    benefits: ["All benefits of Associate Partner", "Dedicated email promotions", "Premium logo placement"]
                                },
                                {
                                    name: "PREMIER PARTNER",
                                    price: "₹3,75,000 + GST",
                                    color: "text-[#b4841c]",
                                    bg: "bg-[#b4841c]",
                                    benefits: ["All benefits of Preferred Partner", "On-site branding (hospitality areas)", "Speaking opportunity / brand showcase", "Featured listing in all marketing"]
                                }
                            ].map((pkg, i) => (
                                <div key={i} className="relative flex flex-col p-3 border-b last:border-b-0 border-slate-100 group transition-colors">
                                    <div className="flex items-center gap-4 mb-1 pr-10">
                                        <div className={`w-14 h-14 rounded-full ${pkg.bg} flex items-center justify-center shrink-0 shadow-md border-2 border-white`}>
                                            <Building2 className="w-7 h-7 text-white" />
                                        </div>
                                        <div className="flex flex-col">
                                            <h4 className={`${pkg.color} font-black text-[14px] uppercase leading-tight`}>{pkg.name}</h4>
                                            <p className="text-[#0b1a3a] font-black text-[18px] tracking-tight">{pkg.price}</p>
                                        </div>
                                    </div>
                                    <div
                                        className={`absolute right-4 top-0 w-8 h-12 ${pkg.bg} flex flex-col items-center pt-1.5 shadow-sm`}
                                        style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 50% 85%, 0% 100%)' }}
                                    >
                                        <Star className="w-4 h-4 text-white fill-white" />
                                    </div>
                                    <ul className="space-y-1 pl-2">
                                        {pkg.benefits.map((b, j) => (
                                            <li key={j} className="flex items-start gap-2 text-[10px] text-slate-700 font-bold tracking-tight leading-tight">
                                                <div className="w-1 h-1 rounded-full bg-slate-900 mt-1 shrink-0" />
                                                {b}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <div className="bg-[#0b1a3a] p-2 flex flex-col gap-2 mt-auto">
                            <div className="grid grid-cols-3 gap-1">
                                {[
                                    { text: "Custom packages available on request" },
                                    { text: "GST as applicable" },
                                    { text: "Stay vouchers valid during event period" }
                                ].map((u, i) => (
                                    <div key={i} className="flex flex-col items-center gap-1 text-center">
                                        <CheckCircle className="w-3 h-3 text-amber-500 shrink-0" />
                                        <span className="text-[7px] text-white font-bold leading-tight uppercase">{u.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </SectionContainer>

                {/* 4. FINAL FOOTER BANNER (Aligned under Logo) */}
                <div
                    className="bg-[#0b1a3a] overflow-hidden py-1 shadow-2xl  relative"
                    style={{
                        backgroundImage: `url(${BottomImage})`,
                        backgroundSize: '100% 100%',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'left center'
                    }}
                >
                    <SectionContainer className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-2 h-full py-2">
                        <div className="flex items-center gap-8 min-w-[210px] ml-56">
                            <div className="flex flex-col">
                                <h4 className="text-white font-semibold text-[14px] leading-tight uppercase tracking-tight">
                                    LET'S CREATE MEMORIES. <br />
                                    LET'S DELIVER HOSPITALITY. <br />
                                    LET'S <span className="text-amber-500">GROW TOGETHER!</span>
                                </h4>
                                <p className="text-slate-300 text-[11px] font-semibold mt-3 max-w-[280px] uppercase leading-tight">
                                    Join hands with IHWE 2026 and be the preferred stay partner for global leaders.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-0 flex-1 justify-center">
                            <div className="px-4 border-l-2 border-white/10 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full border-2 border-amber-500/50 flex items-center justify-center bg-transparent">
                                    <Mail className="w-5 h-5 text-white" />
                                </div>
                                <a href="mailto:partner@ihwe.in" className="text-white font-black text-sm tracking-tight hover:text-amber-500">info@ihwe.in</a>
                            </div>
                            <div className="px-4 border-l-2 border-white/10 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full border-2 border-amber-500/50 flex items-center justify-center bg-transparent">
                                    <Phone className="w-5 h-5 text-white" />
                                </div>
                                <a href="tel:+911149588555" className="text-white font-black text-sm tracking-tight hover:text-amber-500 whitespace-nowrap">+91 11 4958 8555</a>
                            </div>
                            <div className="px-4 border-l-2 border-white/10 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full border-2 border-amber-500/50 flex items-center justify-center bg-transparent">
                                    <Globe2 className="w-5 h-5 text-white" />
                                </div>
                                <a href="https://www.ihwe.in" target="_blank" rel="noreferrer" className="text-white font-black text-sm tracking-tight hover:text-amber-500">www.ihwe.in</a>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 pl-2 border-l border-white/10">
                            <div className="w-20 h-20 bg-white p-1 rounded-xl shadow-lg">
                                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://www.ihwe.in/partner-form" alt="QR" className="w-full h-full" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-amber-500 font-black text-[14px] uppercase leading-tight tracking-[0.1em]">SCAN TO</span>
                                <span className="text-amber-500 font-black text-[14px] uppercase leading-tight tracking-[0.1em]">PARTNER</span>
                            </div>
                        </div>
                    </SectionContainer>
                </div>

            </div>
        </div>
    );
};

export default HospitalityPartner;
