import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Quote } from "lucide-react";

const chartData = [
    { year: "2008", value: 45, display: "$45B" },
    { year: "2009", value: 52, display: "$52B" },
    { year: "2010", value: 59, display: "$59B" },
    { year: "2011", value: 64, display: "$64B" },
    { year: "2012", value: 66, display: "$66B" },
    { year: "2014", value: 77, display: "$77B" },
    { year: "2015", value: 82, display: "$82B" },
    { year: "2016", value: 86, display: "$86B" },
    { year: "2017", value: 100, display: "$100B" },
    { year: "2018", value: 119, display: "$119B" },
    { year: "2019", value: 114, display: "$114B" },
    { year: "2020", value: 178, display: "$178B" },
    { year: "2021", value: 224, display: "$224B" },
    { year: "2022", value: 285, display: "$285B" },
    { year: "2023", value: 367, display: "$367B" },
    { year: "2024", value: 479, display: "$479B" },
    { year: "2025", value: 638, display: "$638B" },
];

const MAX_VALUE = 700;
const Y_TICKS = [0, 100, 200, 300, 400, 500, 600, 700];
const CHART_HEIGHT = 290; // px

const HealthcareGrowth = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setAnimated(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="pt-8 pb-4 lg:pt-10 lg:pb-6 bg-[#F9FAFB] relative overflow-hidden">
            {/* Background dot pattern */}
            <div className="absolute inset-0 opacity-[0.025]" style={{
                backgroundImage: "radial-gradient(#23471d 1px, transparent 1px)",
                backgroundSize: "28px 28px"
            }} />

            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                {/* Section Header */}
                <div className="text-center mb-10" data-aos="fade-up">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <div className="h-px w-8 bg-[#23471d]" />
                        <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-[#23471d]">Market Opportunity</span>
                        <div className="h-px w-8 bg-[#23471d]" />
                    </div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-slate-900 leading-tight max-w-3xl mx-auto">
                        India's Healthcare Industry Is Expected to Reach{" "}
                        <span className="text-[#d26019]">Over $610 Billion</span> by 2026.
                    </h2>
                    <p className="mt-4 text-slate-500 max-w-2xl mx-auto text-xs leading-relaxed">
                        Growing demand across hospitals, medical devices, telemedicine, medical tourism, health insurance, and
                        diagnostic equipment is fueling this unprecedented market expansion.
                    </p>
                </div>

                {/* CHART + CALLOUT Layout */}
                <div className="grid lg:grid-cols-3 gap-6 items-start">
                    {/* Bar Chart — 2/3 width */}
                    <div className="lg:col-span-2 bg-white border border-slate-100 shadow-sm p-5" data-aos="fade-right">
                        {/* Chart Area with Y-axis grid */}
                        <div className="relative flex gap-2">
                            {/* Y-Axis Labels */}
                            <div className="flex flex-col-reverse justify-between text-[10px] text-slate-600 font-semibold pr-2 shrink-0" style={{ height: `${CHART_HEIGHT}px` }}>
                                {Y_TICKS.map(t => (
                                    <span key={t}>${t}B</span>
                                ))}
                            </div>

                            {/* Chart with grid lines */}
                            <div className="relative flex-1" style={{ height: `${CHART_HEIGHT}px` }}>
                                {/* Horizontal Grid Lines */}
                                {Y_TICKS.map((t, i) => (
                                    <div
                                        key={t}
                                        className="absolute left-0 right-0 border-t border-slate-100"
                                        style={{ bottom: `${(t / MAX_VALUE) * 100}%` }}
                                    />
                                ))}

                                {/* Bars */}
                                <div className="absolute inset-0 flex items-end gap-0.5">
                                    {chartData.map((d, idx) => {
                                        const pct = (d.value / MAX_VALUE) * 100;
                                        const delay = idx * 90; // ms stagger per bar
                                        return (
                                            <div key={d.year} className="flex flex-col items-center justify-end flex-1 h-full group">
                                                {/* Value on top */}
                                                <span
                                                    className={`text-[7px] font-bold text-[#23471d] mb-0.5 leading-none transition-opacity duration-300 ${animated ? "opacity-100" : "opacity-0"}`}
                                                    style={{ transitionDelay: `${delay + 500}ms` }}
                                                >
                                                    {d.display}
                                                </span>
                                                {/* Bar — grows from 0 to full height one by one */}
                                                <div
                                                    className="w-full bg-[#23471d] group-hover:bg-[#d26019] transition-colors duration-300 relative overflow-hidden"
                                                    style={{
                                                        height: animated ? `${pct}%` : "0%",
                                                        minHeight: animated ? "4px" : "0",
                                                        transitionProperty: "height",
                                                        transitionDuration: "0.6s",
                                                        transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)",
                                                        transitionDelay: animated ? `${delay}ms` : "0ms",
                                                    }}
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* X-axis year labels */}
                        <div className="flex pl-8 mt-1 gap-0.5">
                            {chartData.map(d => (
                                <div key={d.year} className="flex-1 text-center text-[7px] md:text-[8px] text-slate-400 font-medium">
                                    {d.year}
                                </div>
                            ))}
                        </div>

                        <p className="mt-3 text-[10px] text-slate-400 font-medium uppercase tracking-widest text-right">
                            Source: Informa Markets
                        </p>

                        {/* PM Quote — directly below chart */}
                        <div className="mt-4 border-l-4 border-[#d26019] bg-slate-50 px-5 py-3 flex items-start gap-3">
                            <Quote className="w-4 h-4 text-[#d26019] shrink-0 mt-0.5" />
                            <div>
                                <p className="text-slate-600 text-[13px] leading-relaxed italic">
                                    "India has adopted a multi-sectoral approach towards the health sector. The country is focusing on four main pillars of universal health — preventive health, affordable healthcare, supply-side interventions and mission mode intervention."
                                </p>
                                <p className="mt-1.5 font-bold text-[#23471d] text-[9px] uppercase tracking-widest">
                                    Narendra Modi, Prime Minister of India
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-4" data-aos="fade-left">
                        {/* Growth Badge */}
                        <div className="bg-[#23471d] text-white p-4 flex items-start gap-3">
                            <TrendingUp className="w-5 h-5 shrink-0 mt-0.5 text-[#d26019]" />
                            <div>
                                <p className="text-[9px] font-bold uppercase tracking-widest text-white/60 mb-1">Projected Size</p>
                                <p className="text-2xl font-black leading-none">$610B+</p>
                                <p className="text-[11px] text-white/70 mt-1.5 leading-relaxed">India's healthcare by 2026, a 14× growth from 2008.</p>
                            </div>
                        </div>

                        {/* Stat Cards */}
                        {[
                            { label: "CAGR Growth", value: "22%", desc: "Compound Annual Growth Rate 2015–2025" },
                            { label: "Medical Tourism", value: "$12B", desc: "Estimated inbound revenue by 2026" },
                            { label: "Digital Health", value: "$37B", desc: "Projected digital health market size" },
                        ].map((item, i) => (
                            <div key={i} className="bg-white border border-slate-100 shadow-sm p-3 hover:border-[#23471d] transition-colors duration-300">
                                <p className="text-[9px] font-bold uppercase tracking-widest text-[#23471d] mb-1">{item.label}</p>
                                <p className="text-xl font-black text-slate-900">{item.value}</p>
                                <p className="text-[11px] text-slate-500 mt-1">{item.desc}</p>
                                <div className="mt-2 h-0.5 w-full bg-[#d26019]" />
                            </div>
                        ))}

                        <div className="text-center py-2.5 px-5 border-2 border-[#23471d] text-[#23471d] text-[10px] font-bold uppercase tracking-widest cursor-default">
                            Source of Information
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HealthcareGrowth;
