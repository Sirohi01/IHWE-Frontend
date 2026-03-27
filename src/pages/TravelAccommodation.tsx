import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    MapPin, Calendar, Car, Train, Plane,
    Hotel, HelpCircle, Mail, Phone, ExternalLink,
    MapPinned, Clock, Globe, Sparkles
} from "lucide-react";
import { heroBackgroundApi, SERVER_URL } from "@/lib/api";
import heroImgFallback from "../assets/travel.jpg";

const transportOptions = [
    {
        icon: Car,
        title: "By Road",
        desc: "Easily accessible by car, taxi, or bus. The venue is well-connected to major highways and city routes."
    },
    {
        icon: Train,
        title: "By Train",
        desc: "Nearest Railway Station: New Delhi Railway Station (Approx. 5 km). Regular trains from across India."
    },
    {
        icon: Train,
        title: "By Metro",
        desc: "Nearest Metro Station: Pragati Maidan (Supreme Court) Metro Station. Take an auto/taxi to the venue."
    },
    {
        icon: Plane,
        title: "By Air",
        desc: "Nearest Airport: Indira Gandhi International Airport (DEL), Approx. 18 km. Taxis and app-based cabs available 24x7."
    }
];

const hotels = [
    {
        name: "Radisson Blu",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
        dist: "3 km from venue",
        price: "₹12,500/night",
        rating: 5,
        tag: "Most Popular"
    },
    {
        name: "Lemon Tree",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800",
        dist: "5 km from venue",
        price: "₹8,200/night",
        rating: 4,
        tag: "Business Choice"
    },
    {
        name: "Country Inn",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800",
        dist: "2.5 km from venue",
        price: "₹7,200/night",
        rating: 4,
        tag: "Budget-Friendly"
    }
];

const TravelAccommodation = () => {
    const [heroData, setHeroData] = useState<any>(null);

    useEffect(() => {
        const fetchHero = async () => {
            try {
                const data = await heroBackgroundApi.getByPage("Exhibit / Travel & Accommodation");
                if (data) setHeroData(data);
            } catch (error) {
                console.error("Error fetching hero:", error);
            }
        };
        fetchHero();
    }, []);

    return (
        <div className="bg-white min-h-screen font-inter pb-12">
            {/* ── HERO SECTION ── */}
            <section
                className="relative pt-36 pb-16 overflow-hidden"
                style={{ 
                    backgroundImage: `url(${heroData?.backgroundImage ? `${SERVER_URL}${heroData.backgroundImage}` : heroImgFallback})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            >
                <div className="absolute inset-0 bg-black/55" />
                <div className="absolute bottom-0 left-0 w-full h-12 bg-white" style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }} />

                <div className="container mx-auto px-4 text-center text-white relative z-10" data-aos="fade-up">
                    <p className="text-[10px] uppercase tracking-[0.5em] mb-3 opacity-80 font-bold">
                        {heroData?.title || "Smooth Arrival"}
                    </p>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold mb-4 italic tracking-tight">
                        {heroData?.heading || "Travel & Accommodation"}
                    </h1>
                    <p className="text-white/70 text-sm md:text-base mb-6 max-w-2xl mx-auto font-light leading-relaxed">
                        {heroData?.shortDescription || "Plan your visit to the 9th International Health & Wellness Expo 2026 with ease. We ensure a comfortable stay and seamless travel experience."}
                    </p>
                </div>
            </section>

            {/* ── VENUE LOCATION ── */}
            <section className="pt-6 pb-12">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Header */}
                    <div className="flex flex-col items-start mb-8">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="h-px w-6 bg-[#23471d]" />
                            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#23471d]">The Destination</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-slate-900 leading-tight">
                            Venue <span className="text-[#d26019]">Location</span>
                        </h2>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-6 items-stretch">
                        {/* Left: Google Map */}
                        <div className="lg:col-span-7 relative h-[350px] lg:h-auto" data-aos="fade-right">
                            <div className="absolute inset-0 lg:h-full overflow-hidden shadow-xl border border-slate-100 rounded-sm">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14009.843540849091!2d77.2357397409923!3d28.615945897527517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce328b5a553f7%3A0x795cf6ea0f8b5378!2sPragati%20Maidan%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1772876873909!5m2!1sen!2sin"
                                    className="w-full h-full border-0"
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>

                        {/* Right: Details cards (EventHighlights style) */}
                        <div className="lg:col-span-5 flex flex-col gap-3" data-aos="fade-left">
                            <div className="bg-[#FAF9F6] p-5 flex items-start gap-5 border-l-4 border-[#23471d] group hover:bg-white hover:shadow-xl transition-all duration-300">
                                <div className="w-10 h-10 rounded-none bg-white flex items-center justify-center shrink-0 shadow-sm transition-colors group-hover:bg-[#23471d] group-hover:text-white">
                                    <Calendar className="w-4 h-4 text-[#23471d] group-hover:text-white" />
                                </div>
                                <div className="pt-0.5">
                                    <h4 className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#d26019] mb-1">Mark Your Calendar</h4>
                                    <div className="text-base font-bold text-slate-900 mb-0.5 font-serif leading-tight">21 - 23 August 2026</div>
                                    <p className="text-[13px] text-slate-600 leading-relaxed">Friday - Sunday</p>
                                </div>
                            </div>

                            <div className="bg-[#FAF9F6] p-5 flex items-start gap-5 border-l-4 border-[#23471d] group hover:bg-white hover:shadow-xl transition-all duration-300">
                                <div className="w-10 h-10 rounded-none bg-white flex items-center justify-center shrink-0 shadow-sm transition-colors group-hover:bg-[#23471d] group-hover:text-white">
                                    <Clock className="w-4 h-4 text-[#23471d] group-hover:text-white" />
                                </div>
                                <div className="pt-0.5">
                                    <h4 className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#d26019] mb-1">Exhibition Hours</h4>
                                    <div className="text-base font-bold text-slate-900 mb-0.5 font-serif leading-tight">9:00 AM - 6:00 PM</div>
                                    <p className="text-[13px] text-slate-600 leading-relaxed">Indian Standard Time (IST)</p>
                                </div>
                            </div>

                            <div className="bg-[#FAF9F6] p-5 flex items-start gap-5 border-l-4 border-[#23471d] group hover:bg-white hover:shadow-xl transition-all duration-300">
                                <div className="w-10 h-10 rounded-none bg-white flex items-center justify-center shrink-0 shadow-sm transition-colors group-hover:bg-[#23471d] group-hover:text-white">
                                    <MapPin className="w-4 h-4 text-[#23471d] group-hover:text-white" />
                                </div>
                                <div className="pt-0.5">
                                    <h4 className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#d26019] mb-1">Venue Location</h4>
                                    <div className="text-base font-bold text-slate-900 mb-0.5 font-serif leading-tight">Bharat Mandapam</div>
                                    <p className="text-[13px] text-slate-600 leading-relaxed font-inter">
                                        Halls 8, 9, and 10, Pragati Maidan, New Delhi
                                    </p>
                                </div>
                            </div>

                            <div className="pt-2 flex gap-3">
                                <Button className="flex-1 rounded-sm bg-[#23471d] hover:bg-[#1a3516] text-white h-11 font-bold uppercase tracking-widest text-[9px] shadow-lg flex items-center justify-center gap-2">
                                    <MapPin size={14} /> Get Directions
                                </Button>
                                <Button variant="outline" className="flex-1 rounded-sm border-2 border-slate-200 text-slate-800 h-11 font-bold uppercase tracking-widest text-[9px] hover:border-[#23471d] transition-all flex items-center justify-center gap-2">
                                    <Globe size={14} /> Venue Website
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── TRAVEL OPTIONS ── */}
            <section className="py-12 bg-slate-50/50">
                <div className="container mx-auto px-4 max-w-6xl text-center">
                    <div className="flex flex-col items-center mb-10">
                        <div className="flex items-center justify-center gap-3 mb-2">
                            <div className="h-px w-6 bg-[#23471d]" />
                            <span className="uppercase tracking-[0.3em] text-[#23471d] font-bold text-[10px]">How to reach</span>
                            <div className="h-px w-6 bg-[#23471d]" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-serif text-slate-900 leading-tight">
                            Commute <span className="text-[#d26019]">options</span>
                        </h2>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {transportOptions.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 group text-center"
                            >
                                <div className="w-14 h-14 rounded-lg bg-slate-50 flex items-center justify-center text-[#23471d] mx-auto mb-4 group-hover:bg-[#23471d] group-hover:text-white transition-all duration-500 shadow-inner">
                                    <item.icon size={24} />
                                </div>
                                <h3 className="text-base font-serif font-bold text-slate-900 mb-2 uppercase tracking-tight">{item.title}</h3>
                                <p className="text-[12px] text-slate-500 leading-relaxed font-inter">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── ACCOMMODATION OPTIONS ── */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="flex flex-col items-center text-center mb-10">
                        <div className="flex items-center justify-center gap-3 mb-2">
                            <div className="h-px w-6 bg-[#23471d]" />
                            <span className="uppercase tracking-[0.3em] text-[#23471d] font-bold text-[10px]">Preferred Stay</span>
                            <div className="h-px w-6 bg-[#23471d]" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-serif text-slate-900 leading-tight">
                            Accommodation <span className="text-[#d26019]">Options</span>
                        </h2>
                        <p className="mt-2 text-sm text-slate-500 font-inter">Enjoy a comfortable stay near the venue. Choose from our curated hotel options.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {hotels.map((hotel, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="group bg-white rounded-sm border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
                            >
                                <div className="relative aspect-[16/10] overflow-hidden">
                                    <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                                    <div className="absolute top-3 left-3">
                                        <span className="bg-[#23471d] text-white text-[8px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-widest shadow-lg">
                                            {hotel.tag}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-1.5">
                                        <h3 className="text-lg font-serif font-bold text-slate-900 group-hover:text-[#23471d] transition-colors">{hotel.name}</h3>
                                        <div className="flex items-center gap-0.5 text-yellow-500">
                                            {[...Array(hotel.rating)].map((_, i) => (
                                                <Sparkles key={i} size={10} fill="currentColor" />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-[12px] text-slate-500 mb-4 flex items-center gap-1.5 font-medium">
                                        <MapPin size={12} className="text-[#d26019]" /> {hotel.dist}
                                    </p>
                                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                                        <div>
                                            <p className="text-[9px] uppercase font-bold text-slate-400 tracking-widest mb-0.5">Approx. Rate</p>
                                            <p className="text-base font-bold text-[#23471d]">{hotel.price}</p>
                                        </div>
                                        <Button className="rounded-sm w-9 h-9 p-0 flex items-center justify-center bg-slate-900 group-hover:bg-[#23471d] text-white transition-all shadow-md">
                                            <ExternalLink size={16} />
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── HELP / CONTACT ── */}
            <section className="py-12 bg-[#FAF9F6]">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-white rounded-sm border border-slate-200 p-8 md:p-12 shadow-xl relative overflow-hidden text-center group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#23471d]/3 rounded-full -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#d26019]/3 rounded-full translate-y-1/2 -translate-x-1/2" />

                        <div className="relative z-10">
                            <div className="w-14 h-14 rounded-2xl bg-[#23471d]/5 text-[#23471d] flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-inner">
                                <HelpCircle size={28} />
                            </div>
                            <h2 className="text-2xl font-serif font-bold text-slate-900 mb-3">Need Help Booking?</h2>
                            <p className="text-sm text-slate-500 max-w-lg mx-auto mb-8 leading-relaxed">
                                For travel assistance, group bookings, or hotel recommendations,
                                our dedicated concierge team is ready to assist you.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-4 pb-2 text-left">
                                <a href="mailto:travel@ihwe.com" className="flex items-center gap-4 p-4 rounded-sm bg-slate-50 border border-slate-100 hover:border-[#23471d] hover:bg-white hover:shadow-lg transition-all group">
                                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-[#23471d] shadow-sm">
                                        <Mail size={16} />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-bold uppercase text-slate-400 tracking-widest">Email Assistance</p>
                                        <p className="text-[13px] font-bold text-slate-800 tracking-tight">travel@ihwe.com</p>
                                    </div>
                                </a>
                                <a href="tel:+919876543210" className="flex items-center gap-4 p-4 rounded-sm bg-slate-50 border border-slate-100 hover:border-[#d26019] hover:bg-white hover:shadow-lg transition-all group">
                                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-[#d26019] shadow-sm">
                                        <Phone size={16} />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-bold uppercase text-slate-400 tracking-widest">Call / WhatsApp</p>
                                        <p className="text-[13px] font-bold text-slate-800 tracking-tight">+91-98765-43210</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const Button = ({ className, variant, ...props }: any) => {
    const base = "inline-flex items-center justify-center transition-all focus:outline-none";
    const variants: any = {
        primary: "bg-[#23471d] hover:bg-[#1a3516] text-white",
        outline: "border-2 border-slate-200 hover:border-[#23471d] text-slate-800"
    };
    return <button className={`${base} ${className}`} {...props} />;
};

export default TravelAccommodation;
