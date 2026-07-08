import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
    ArrowLeft, ArrowRight, Activity, Box, Monitor, Microscope, Leaf, Plane,
    Beaker, Star, Heart, Globe, Zap, Award, Package, MapPin, Users, ShieldCheck,
    CheckCircle2, Target, Presentation, ArrowRightCircle, Map, Calendar
} from "lucide-react";
import { featuredServicesApi, serviceDetailApi, SERVER_URL } from "@/lib/api";

const ICONS_MAP: Record<string, any> = {
    ShieldCheck, Activity, Box, Monitor, Microscope, Leaf, Plane, Beaker,
    Star, Heart, Globe, Zap, Award, Package, MapPin, Users
};

const IconComponent = ({ name, ...props }: { name: string;[key: string]: any }) => {
    const Comp = ICONS_MAP[name] || Activity;
    return <Comp {...props} />;
};

const IndustryZoneDetail = () => {
    const { id: idOrSlug } = useParams();
    const [zone, setZone] = useState<any>(null);
    const [detail, setDetail] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAll = async () => {
            if (!idOrSlug) return;

            try {
                setLoading(true);
                let serviceCardId = idOrSlug;
                let pageDetail = null;

                // 1. Try to fetch by Slug first
                pageDetail = await serviceDetailApi.getBySlug(idOrSlug);

                if (pageDetail) {
                    serviceCardId = pageDetail.serviceCardId;
                    setDetail(pageDetail);
                } else {
                    // 2. If not found by slug, try by Card ID
                    // Only try if idOrSlug looks like a MongoDB ID (24 chars hex)
                    const isMongoId = /^[0-9a-fA-F]{24}$/.test(idOrSlug);
                    if (isMongoId) {
                        pageDetail = await serviceDetailApi.getByCardId(idOrSlug);
                        setDetail(pageDetail);
                        serviceCardId = idOrSlug;
                    }
                }

                // 3. Fetch the basic card data using the determined serviceCardId
                const cardData = await featuredServicesApi.get();
                if (cardData && cardData.cards) {
                    const foundZone = cardData.cards.find((c: any) => c._id === serviceCardId);
                    setZone(foundZone);
                }

            } catch (error) {
                console.error("Error fetching industry zone data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
        window.scrollTo(0, 0);
    }, [idOrSlug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#23471d] border-t-transparent rounded-full animate-spin" />
                    <p className="text-slate-500 font-medium tracking-widest uppercase text-[10px]">Loading Experience...</p>
                </div>
            </div>
        );
    }

    if (!zone) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4 text-center">
                <h2 className="text-3xl font-inter font-bold text-slate-800 mb-4">Industry Zone Not Found</h2>
                <Link to="/" className="inline-flex items-center gap-2 bg-[#23471d] text-white px-6 py-3 font-bold text-xs uppercase tracking-widest hover:bg-[#d26019] transition-all">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>
            </div>
        );
    }

    // Default overlay is 0.7 if not specified in dynamic detail
    const overlayOpacity = detail?.heroOverlayOpacity !== undefined ? detail.heroOverlayOpacity : 0.7;

    return (
        <div className="min-h-screen bg-white font-inter">
            {/* ── HERO SECTION ── */}
            <section className="relative h-[55vh] min-h-[450px] flex items-start pt-12 md:pt-16 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img loading="lazy" decoding="async" src={detail?.heroImage ? `${SERVER_URL}${detail.heroImage}` : `${SERVER_URL}${zone.image}`}
                        alt={detail?.heroImageAlt || zone.title}
                        className="w-full h-full object-cover"
                    />
                    {/* Dynamic Overlay */}
                    <div
                        className="absolute inset-0 bg-slate-950"
                        style={{ opacity: overlayOpacity }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-transparent to-transparent" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl"
                    >
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-[10px] font-bold uppercase tracking-[0.3em] mb-8 transition-all group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Zones
                        </Link>


                        <h1 className={`leading-tight tracking-tight mb-6 hero-rich-text rich-text-content ${!detail?.h1Heading ? 'text-4xl md:text-5xl lg:text-6xl font-bold text-white' : 'text-white'}`} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            {detail?.h1Heading ? (
                                <span dangerouslySetInnerHTML={{ __html: detail.h1Heading }} />
                            ) : (
                                zone.title
                            )}
                        </h1>

                        <div className="flex items-center gap-6">
                            <div className="h-1 w-16" style={{ backgroundColor: zone.accent }} />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── CONTENT SECTION ── */}
            <section className="py-20 relative">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        {/* Main Content */}
                        <div className="lg:col-span-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                {detail?.content ? (
                                    <div className="dynamic-service-content prose prose-lg max-w-none text-slate-700 leading-relaxed text-justify">
                                        <div dangerouslySetInnerHTML={{ __html: detail.content }} />
                                    </div>
                                ) : (
                                    <>
                                        <div className="inline-flex items-center gap-3 mb-6">
                                            <div className="w-8 h-px bg-[#23471d]" />
                                            <span className="text-[#23471d] text-[10px] font-black uppercase tracking-[0.3em]">Overview</span>
                                        </div>

                                        <h2 className="text-2xl md:text-3xl font-inter font-bold text-slate-900 mb-8 leading-tight">
                                            Driving Innovation & Excellence in the <span className="text-[#d26019]">{zone.title}</span> Sector
                                        </h2>

                                        <div className="space-y-6">
                                            <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed space-y-6 text-justify">
                                                <div dangerouslySetInnerHTML={{ __html: zone.description }} />

                                                {!zone.description.includes('<p>') && (
                                                    <>
                                                        <p>
                                                            The 9th International Health & Wellness Expo 2026 presents a dedicated pavilion for the {zone.title} sector. This specialized zone is designed to create a concentrated environment for business growth, knowledge exchange, and technical demonstrations.
                                                        </p>
                                                        <p>
                                                            As the healthcare landscape evolves, this pavilion serves as the epicenter for the latest advancements, bringing together a diverse ecosystem of stakeholders—from established multinational corporations to agile startups pushing the boundaries of what's possible.
                                                        </p>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        {/* Default Features if no dynamic content */}
                                        <div className="mt-16 bg-slate-50 p-8 border border-slate-100">
                                            <h3 className="text-lg font-bold text-slate-900 mb-8 uppercase tracking-widest text-[11px] flex items-center gap-3">
                                                <Target className="w-5 h-5 text-[#d26019]" /> Key Objectives & Benefits
                                            </h3>
                                            <div className="grid grid-cols-1 gap-6">
                                                {[
                                                    {
                                                        title: "Targeted Networking",
                                                        desc: "Direct access to specialized buyers, procurement officers, and hospital administrators specifically seeking your solutions.",
                                                    },
                                                    {
                                                        title: "Brand Positioning",
                                                        desc: "Showcase your leadership by exhibiting within a curated premium environment that enhances your brand's authority.",
                                                    },
                                                    {
                                                        title: "Market Intelligence",
                                                        desc: "Stay ahead of the curve with direct feedback from the Indian and international markets through face-to-face interactions.",
                                                    },
                                                    {
                                                        title: "Business Expansion",
                                                        desc: "Generate high-quality leads and close deals with decision-makers who have the power to influence procurement.",
                                                    }
                                                ].map((feature, i) => (
                                                    <div key={i} className="flex gap-4 items-start group">
                                                        <div className="mt-1 shrink-0">
                                                            <ArrowRightCircle className="w-5 h-5 text-[#23471d] group-hover:translate-x-1 transition-transform" />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-slate-900 text-base mb-1">{feature.title}</h4>
                                                            <p className="text-sm text-slate-500 leading-relaxed text-justify">{feature.desc}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </motion.div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-32 space-y-8">
                                <div className="bg-[#23471d] p-8 text-white relative overflow-hidden shadow-xl">
                                    <div className="relative z-10">
                                        <h3 className="text-xl font-bold mb-4 uppercase tracking-tight">Book Your Space</h3>
                                        <p className="text-white/70 text-sm mb-8 leading-relaxed text-justify">
                                            Join industry leaders in the {zone.title} pavilion. Limited stalls available for IHWE 2026.
                                        </p>
                                        <Link
                                            to="/book-a-stand"
                                            className="w-full bg-[#d26019] text-white hover:bg-white hover:text-[#23471d] py-4 px-6 font-bold text-xs uppercase tracking-widest transition-all inline-flex items-center justify-center group"
                                        >
                                            Inquire Now <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                        </Link>
                                    </div>
                                </div>

                                <div className="bg-white border border-slate-100 shadow-sm p-8 rounded-sm">
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="w-1 h-6 bg-[#23471d]" />
                                        <h4 className="font-inter font-black text-slate-900 uppercase tracking-[0.2em] text-[11px]">Event Information</h4>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="flex gap-4">
                                            <div className="w-10 h-10 shrink-0 bg-slate-50 flex items-center justify-center rounded-none border-b-2 border-slate-200 group-hover:border-[#d26019] transition-colors">
                                                <Calendar className="w-5 h-5 text-[#23471d]" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Event Dates</p>
                                                <p className="text-slate-900 font-bold text-sm">21-23 AUGUST 2026</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            <div className="w-10 h-10 shrink-0 bg-slate-50 flex items-center justify-center rounded-none border-b-2 border-slate-200">
                                                <MapPin className="w-5 h-5 text-[#23471d]" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Official Venue</p>
                                                <p className="text-slate-900 font-bold text-sm">Pragati Maidan, Delhi</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            <div className="w-10 h-10 shrink-0 bg-slate-50 flex items-center justify-center rounded-none border-b-2 border-slate-200">
                                                <Box className="w-5 h-5 text-[#23471d]" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Zone Location</p>
                                                <p className="text-slate-900 font-bold text-sm">Hall 5 - Ground Floor</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-dashed border-slate-200">
                                        <div className="flex items-center gap-2 text-slate-400">
                                            <Map className="w-4 h-4" />
                                            <span className="text-[10px] font-medium uppercase tracking-wider">Floor Plan Available</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default IndustryZoneDetail;
