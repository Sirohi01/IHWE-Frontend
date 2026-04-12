const timeline = [
    { year: "2015", text: "Founded as a regional health forum with 50 exhibitors" },
    { year: "2018", text: "Expanded to international scope with 15 countries" },
    { year: "2021", text: "Launched hybrid digital-physical expo format" },
    { year: "2024", text: "Became the Middle East's largest medical exhibition" },
    { year: "2026", text: "Global expansion with 25+ countries and AI pavilion" },
];

const JourneyTimeline = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-6 mb-16" data-aos="fade-right">
                <h3 className="font-inter text-3xl text-slate-800">Our Journey</h3>
                <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent" />
            </div>

            <div className="relative space-y-12">
                {/* Timeline Line */}
                <div className="absolute left-[15px] md:left-1/2 top-4 bottom-4 w-px bg-slate-200 -translate-x-1/2 hidden md:block" />

                {timeline.map((t, i) => (
                    <div
                        key={t.year}
                        data-aos={i % 2 === 0 ? "fade-right" : "fade-left"}
                        className={`relative flex items-center justify-between md:flex-row ${i % 2 === 0 ? "" : "md:flex-row-reverse"}`}
                    >
                        {/* Content Card */}
                        <div className={`w-full md:w-[42%] group`}>
                            <div className={`p-8 bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 relative ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                                <div className={`text-[#d26019] font-bold text-2xl mb-2 font-inter`}>{t.year}</div>
                                <p className="text-slate-600 leading-relaxed">{t.text}</p>

                                {/* Decorative Arrow/Indicator for Desktop */}
                                <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-t border-r border-slate-100 rotate-45 hidden md:block ${i % 2 === 0 ? "-right-2 border-slate-100" : "-left-2 border-slate-100 rotate-[225deg]"}`} />
                            </div>
                        </div>

                        {/* Center Node */}
                        <div className="absolute left-[15px] md:left-1/2 w-8 h-8 rounded-full bg-white border-2 border-[#d26019] -translate-x-1/2 z-20 flex items-center justify-center shadow-sm hidden md:flex">
                            <div className="w-2 h-2 rounded-full bg-[#d26019] animate-pulse" />
                        </div>

                        {/* Empty Space for alignment */}
                        <div className="hidden md:block w-[42%]" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JourneyTimeline;
