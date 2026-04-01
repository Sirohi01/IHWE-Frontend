import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    CheckCircle,
    Send, ChevronRight,
    ShieldCheck,
    Camera,
    Building2,
    Globe,
    FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { heroBackgroundApi, SERVER_URL } from "@/lib/api";
import HeroBg from "@/assets/media.jpg";

const COUNTRIES = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua And Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia And Herzegovina", "Botswana", "Brazil", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyzstan", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "Spain", "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad And Tobago", "Tunisia", "Turkey", "Turkmenistan", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

const MEDIA_CATEGORIES = [
    "Print Media",
    "Digital News/Portal",
    "Blogger/Influencer",
    "Television",
    "Radio",
    "Freelance Journalist",
    "Others"
];

const MediaRegistration = () => {
    const [submitted, setSubmitted] = useState(false);
    const [heroData, setHeroData] = useState<any>(null);

    useEffect(() => {
        const fetchHero = async () => {
            try {
                const data = await heroBackgroundApi.getByPage("Registration / Media Registration");
                if (data) setHeroData(data);
            } catch (err) {
                console.error("Error fetching hero:", err);
            }
        };
        fetchHero();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const inputClasses =
        "rounded-[2px] border-slate-400 h-8 focus:border-[#23471d] focus:ring-[#23471d]/10 transition-all text-[12px] bg-white placeholder:text-slate-400 text-slate-900 font-medium shadow-none outline-none px-3 w-full text-left";
    const labelClasses =
        "text-[10px] font-bold uppercase tracking-[0.05em] text-slate-800 mb-1 block";

    return (
        <div className="min-h-screen bg-[#FDFDFD] font-inter text-slate-900">
            {/* ── HERO SECTION - Registration Standard 16:5 ── */}
            <section
                className="hero-background-registration"
                style={{
                    backgroundImage: `url(${heroData?.backgroundImage ? `${SERVER_URL}${heroData.backgroundImage}` : HeroBg})`,
                    aspectRatio: '16 / 5'
                }}
            >
                <div className="absolute inset-0 bg-black/45" />

                <div
                    className="container mx-auto px-4 text-center text-white relative z-10"
                    data-aos="fade-up"
                >
                    <p className="text-sm uppercase tracking-[0.4em] mb-4 opacity-80">
                        {heroData?.title || "Press & Partnership"}
                    </p>

                    <h1 
                        className="text-4xl md:text-6xl font-serif font-semibold mb-6 italic tracking-tight"
                    >
                        {heroData?.heading || "Cover the Future of Wellness"}
                    </h1>

                    <p className="text-white/70 text-base md:text-lg mb-8 max-w-xl mx-auto font-light leading-relaxed">
                        {heroData?.shortDescription || "Accreditation for journalists, bloggers, and influencers to cover IH&WE 2026."}
                    </p>
                </div>
            </section>

            {/* ── MAIN CONTENT ── */}
            <section className="pt-8 pb-24 relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-[1400px]">
                    <div className="space-y-8">
                        <AnimatePresence mode="wait">
                            {submitted ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-white border border-slate-300 shadow-2xl p-16 flex flex-col items-center justify-center text-center space-y-6"
                                >
                                    <div className="w-20 h-20 bg-[#23471d]/10 flex items-center justify-center text-[#23471d]">
                                        <CheckCircle size={40} />
                                    </div>
                                    <div className="space-y-2">
                                        <h2 
                                            className="text-3xl font-bold text-slate-900"
                                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                        >
                                            Application Submitted!
                                        </h2>
                                        <p className="text-slate-600 text-base max-w-md mx-auto leading-relaxed font-inter">
                                            Your media accreditation request is being processed. 
                                            Our team will review your credentials and get back to you shortly.
                                        </p>
                                    </div>
                                    <div className="flex gap-4 pt-4">
                                        <Link to="/">
                                            <Button className="rounded-sm px-10 h-11 bg-[#23471d] hover:bg-[#1a3516] text-sm font-bold uppercase tracking-widest transition-all">
                                                Return Home
                                            </Button>
                                        </Link>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="form"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white border border-slate-300 shadow-2xl overflow-hidden"
                                >
                                    <div className="bg-slate-50/80 border-b border-slate-200 px-8 py-4">
                                        <h2 
                                            className="text-xl font-bold text-slate-900 uppercase"
                                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                        >
                                            Media & Partners Accreditation
                                        </h2>
                                        <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mt-0.5 font-bold">IHWE 2026 Press & Media Portal</p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="p-8 space-y-8 font-inter">
                                        {/* ── PERSONAL DETAILS ── */}
                                        <div className="space-y-6">
                                            <h3 
                                                className="text-sm font-bold text-[#d26019] uppercase tracking-[0.05em] border-b border-slate-100 pb-1.5"
                                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                            >
                                                Personal Information
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-4">
                                                <div>
                                                    <Label className={labelClasses}>MEDIA CATEGORY *</Label>
                                                    <Select required>
                                                        <SelectTrigger className={inputClasses}>
                                                            <SelectValue placeholder="Select Category" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {MEDIA_CATEGORIES.map(m => (
                                                                <SelectItem key={m} value={m.toLowerCase().replace(/ /g, "_")}>{m}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div>
                                                    <Label className={labelClasses}>FIRST NAME *</Label>
                                                    <Input required placeholder="Enter First Name" className={inputClasses} />
                                                </div>
                                                <div>
                                                    <Label className={labelClasses}>LAST NAME *</Label>
                                                    <Input required placeholder="Enter Last Name" className={inputClasses} />
                                                </div>
                                                <div>
                                                    <Label className={labelClasses}>OFFICIAL EMAIL *</Label>
                                                    <Input type="email" required placeholder="Enter Email.." className={inputClasses} />
                                                </div>
                                                <div>
                                                    <Label className={labelClasses}>MOBILE NO. *</Label>
                                                    <Input required placeholder="Enter Mobile.." className={inputClasses} />
                                                </div>
                                            </div>
                                        </div>

                                        {/* ── PROFESSIONAL DETAILS ── */}
                                        <div className="space-y-6">
                                            <h3 
                                                className="text-sm font-bold text-[#d26019] uppercase tracking-[0.05em] border-b border-slate-100 pb-1.5"
                                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                            >
                                                Media House / Professional Info
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-4">
                                                <div className="lg:col-span-2">
                                                    <Label className={labelClasses}>ORGANIZATION / MEDIA HOUSE NAME *</Label>
                                                    <Input required placeholder="Enter Organization Name.." className={inputClasses} />
                                                </div>
                                                <div>
                                                    <Label className={labelClasses}>DESIGNATION *</Label>
                                                    <Input required placeholder="Enter Designation.." className={inputClasses} />
                                                </div>
                                                <div>
                                                    <Label className={labelClasses}>WEBSITE / PORTFOLIO URL *</Label>
                                                    <Input required placeholder="Enter Website URL.." className={inputClasses} />
                                                </div>
                                                <div>
                                                    <Label className={labelClasses}>COUNTRY *</Label>
                                                    <Select required>
                                                        <SelectTrigger className={inputClasses}>
                                                            <SelectValue placeholder="Select Country" />
                                                        </SelectTrigger>
                                                        <SelectContent className="max-h-[300px]">
                                                            {COUNTRIES.map(c => (
                                                                <SelectItem key={c} value={c.toLowerCase().replace(/ /g, "_")}>{c}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div>
                                                    <Label className={labelClasses}>STATE *</Label>
                                                    <Input required placeholder="Enter State.." className={inputClasses} />
                                                </div>
                                                <div>
                                                    <Label className={labelClasses}>CITY *</Label>
                                                    <Input required placeholder="Enter City.." className={inputClasses} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <Label className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block">Briefly describe your coverage plan *</Label>
                                            <Input placeholder="Write Here .." className={inputClasses} />
                                        </div>

                                        {/* ── SUBMIT BAR ── */}
                                        <div className="pt-6 flex flex-col items-center">
                                            <Button
                                                type="submit"
                                                className="w-full max-w-sm h-12 rounded-sm bg-[#23471d] hover:bg-[#1a3516] text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl shadow-[#23471d]/10 flex items-center justify-center gap-3 group"
                                            >
                                                SUBMIT APPLICATION
                                            </Button>
                                            <p className="mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                                                <ShieldCheck size={12} className="text-[#23471d]" />
                                                Secure Press Portal
                                            </p>
                                        </div>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MediaRegistration;
