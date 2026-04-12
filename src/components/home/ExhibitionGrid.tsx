import { Calendar, MapPin, ArrowRight, Clock } from "lucide-react";

const events = [
    {
        id: "01",
        category: "GRAND EXPO",
        title: "International Health & Wellness Expo 2026",
        date: "14–17 Oct 2026",
        time: "9:00 AM – 6:00 PM",
        location: "Dubai World Trade Centre, UAE",
        tag: "Featured",
        tagColor: "bg-[#d26019] text-white",
    },
    {
        id: "02",
        category: "CONFERENCE",
        title: "Global Medical Innovation Summit",
        date: "14 Oct 2026",
        time: "10:00 AM – 4:00 PM",
        location: "Hall A, DWTC",
        tag: "Keynote",
        tagColor: "bg-slate-800 text-white",
    },
    {
        id: "03",
        category: "WORKSHOP",
        title: "AI in Healthcare: Hands-On Workshop",
        date: "15 Oct 2026",
        time: "2:00 PM – 5:00 PM",
        location: "Innovation Pavilion, Level 2",
        tag: "Limited Seats",
        tagColor: "bg-amber-500 text-white",
    },
    {
        id: "04",
        category: "NETWORKING",
        title: "VIP Pharma & Biotech Leaders Roundtable",
        date: "16 Oct 2026",
        time: "11:00 AM – 1:00 PM",
        location: "Executive Lounge, Hall B",
        tag: "Invitation Only",
        tagColor: "bg-slate-200 text-slate-700",
    },
    {
        id: "05",
        category: "SHOWCASE",
        title: "Wellness & Diagnostics Product Showcase",
        date: "17 Oct 2026",
        time: "9:00 AM – 3:00 PM",
        location: "Wellness Zone, Hall C",
        tag: "Open Access",
        tagColor: "bg-emerald-100 text-emerald-700",
    },
];

const ExhibitionGrid = () => {
    return (
        <section className="py-16 bg-white border-t border-slate-100">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 mb-10" data-aos="fade-up">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-px w-6 bg-[#23471d]" />
                            <span className="uppercase tracking-[0.3em] text-[#23471d] font-bold text-[12px]">
                                Upcoming Events
                            </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-inter text-slate-900 leading-tight">
                            What's On at the Expo
                        </h2>
                    </div>
                    <button className="group hidden md:flex items-center gap-2 text-[11px] font-bold tracking-widest text-slate-400 uppercase hover:text-[#d26019] transition-colors duration-300 shrink-0">
                        View All Events
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-300" />
                    </button>
                </div>

                {/* Featured Event Card */}
                <div data-aos="fade-up" data-aos-delay="100" className="group bg-[#d26019] text-white p-8 md:p-10 mb-4 relative overflow-hidden cursor-pointer hover:bg-[#b54e12] transition-colors duration-500">
                    <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
                    <div className="absolute -right-4 bottom-0 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-xs font-bold tracking-widest uppercase bg-white/20 px-3 py-1 rounded-none">
                                    {events[0].category}
                                </span>
                                <span className={`text-xs font-bold tracking-widest px-3 py-1 ${events[0].tagColor}`}>
                                    ★ {events[0].tag}
                                </span>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-inter font-light mb-4 leading-snug">
                                {events[0].title}
                            </h3>
                            <div className="flex flex-wrap gap-x-6 gap-y-2 text-white/80 text-sm">
                                <span className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {events[0].date}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    {events[0].time}
                                </span>
                                <span className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    {events[0].location}
                                </span>
                            </div>
                        </div>
                        <div className="shrink-0">
                            <div className="w-12 h-12 border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300">
                                <ArrowRight className="w-5 h-5 text-white group-hover:text-[#d26019] transition-colors duration-300" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Event List */}
                <div className="divide-y divide-slate-100">
                    {events.slice(1).map((event, idx) => (
                        <div
                            key={event.id}
                            data-aos="fade-up"
                            data-aos-delay={idx * 60}
                            className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-5 cursor-pointer hover:bg-slate-50 px-4 -mx-4 transition-colors duration-300"
                        >
                            <div className="flex items-center gap-5 md:gap-8 min-w-0">
                                <span className="text-[11px] font-mono text-slate-400 shrink-0 hidden md:block">{event.id}</span>
                                <div className="min-w-0">
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                        <span className="text-[10px] font-bold tracking-widest text-slate-600 uppercase">{event.category}</span>
                                        <span className={`text-[10px] font-bold px-2 py-0.5 ${event.tagColor}`}>{event.tag}</span>
                                    </div>
                                    <h4 className="font-medium text-slate-800 text-sm md:text-base group-hover:text-[#d26019] transition-colors duration-300 truncate">
                                        {event.title}
                                    </h4>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 md:gap-8 shrink-0 text-xs text-slate-500 pl-0 sm:pl-12 md:pl-0">
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {event.date}
                                </span>
                                <span className="hidden md:flex items-center gap-1.5">
                                    <MapPin className="w-3.5 h-3.5" />
                                    {event.location}
                                </span>
                                <ArrowRight className="w-4 h-4 text-slate-200 group-hover:text-[#d26019] group-hover:translate-x-1 transition-all duration-300 hidden sm:block" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile CTA */}
                <div className="mt-8 md:hidden text-center">
                    <button className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-[#d26019] uppercase mx-auto">
                        View All Events
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

            </div>
        </section>
    );
};

export default ExhibitionGrid;
