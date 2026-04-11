import { useState, useEffect } from "react";
import { Calendar, MapPin, Clock, ArrowRight, Download } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { eventHighlightsApi, SERVER_URL } from "@/lib/api";

const EventCountdown = ({ targetDateString }: { targetDateString?: string }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        // Use the provided targetDateString or default to August 21, 2026
        const targetDate = targetDateString ? new Date(targetDateString) : new Date("2026-08-21T00:00:00");

        const timer = setInterval(() => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference <= 0) {
                clearInterval(timer);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            setTimeLeft({
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDateString]);

    const boxes = [
        { label: "DAYS", value: timeLeft.days, color: "#d26019" },
        { label: "HOURS", value: timeLeft.hours, color: "#d26019" },
        { label: "MINS", value: timeLeft.minutes, color: "#23471d" },
        { label: "SECS", value: timeLeft.seconds, color: "#23471d" },
    ];

    return (
        <div className="flex gap-2 sm:gap-2.5 items-center">
            {boxes.map((box, i) => (
                <div key={i} className="flex flex-col items-center">
                    <div
                        className="w-12 h-12 md:w-14 md:h-14 rounded-[14px] border-2 flex items-center justify-center bg-white shadow-sm transition-colors duration-300"
                        style={{ borderColor: box.color }}
                    >
                        <span
                            className="text-lg md:text-xl font-bold tabular-nums"
                            style={{ color: box.color }}
                        >
                            {box.value.toString().padStart(2, '0')}
                        </span>
                    </div>
                    <span className="text-[8px] font-bold uppercase tracking-widest text-slate-400 mt-1.5">{box.label}</span>
                </div>
            ))}
        </div>
    );
};

const EventHighlights = () => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const result = await eventHighlightsApi.get();
                if (result) {
                    setData(result);
                }
            } catch (error) {
                console.error("Error fetching event highlights:", error);
            }
        };
        fetchEventData();
    }, []);

    const details = [
        {
            icon: Calendar,
            title: "Event Date",
            value: data?.eventDate || "",
            sub: data?.eventDay || "",
        },
        {
            icon: Clock,
            title: "Exhibition Hours",
            value: data?.exhibitionHours || "",
            sub: data?.timezone || "",
        },
        {
            icon: MapPin,
            title: "Venue Location",
            value: data?.venueName || "",
            sub: data?.venueAddress || "",
        },
    ];

    // Function to render title with highlighted text
    const renderTitle = () => {
        if (!data?.title) return null;

        if (!data.highlightText) {
            return (
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif text-slate-900 leading-tight">
                    {data.title}
                </h1>
            );
        }

        const titleParts = data.title.split(data.highlightText);
        return (
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif text-slate-900 leading-tight">
                {titleParts[0]}
                <span className="text-[#d26019]">{data.highlightText}</span>
                {titleParts[1]}
            </h1>
        );
    };

    return (
        <section className="py-10 lg:py-14 bg-white relative overflow-hidden text-slate-900">
            {/* Background patterns */}
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.015] pointer-events-none">
                <svg width="100%" height="100%">
                    <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                        <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#23471d" strokeWidth="1" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10" data-aos="fade-up">
                    <div className="text-left">
                        <div className="flex items-center gap-2 mb-2.5">
                            <div className="h-px w-6 bg-[#23471d]" />
                            <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-[#23471d]">
                                {data?.subtitle}
                            </span>
                        </div>
                        {renderTitle()}
                    </div>

                    <div className="flex flex-col items-center lg:items-end gap-2.5">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Event Begins In</span>
                        <EventCountdown targetDateString={data?.countdownDate} />
                    </div>
                </div>

                {/* Main grid — both columns same height */}
                <div className="grid lg:grid-cols-12 gap-6 items-stretch">

                    {/* Left: Image — Balanced width (5/12) to keep height in check while being square */}
                    <div className="lg:col-span-5 relative aspect-square" data-aos="fade-right">
                        <div className="absolute inset-0 overflow-hidden group shadow-xl border border-slate-100 bg-white">
                            <img
                                src={data?.image ? `${SERVER_URL}${data.image}` : ""}
                                alt={data?.imageAlt || ""}
                                className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-105"
                            />
                            {/* Overlay Button */}
                            <div className="absolute bottom-6 left-6 z-20">
                                {data?.pdfFile && (
                                    <a href={`${SERVER_URL}${data.pdfFile}`} target="_blank" rel="noopener noreferrer">
                                        <Button className="rounded-xl bg-[#23471d] hover:bg-[#d26019] text-white h-9 px-5 font-bold uppercase tracking-widest text-[9px] transition-all border-none shadow-xl flex items-center gap-2">
                                            <Download className="w-3.5 h-3.5" /> {data.downloadButtonName || "Download Brochure"}
                                        </Button>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right: Details — Takes more space (7/12) to balance the section */}
                    <div className="lg:col-span-7 flex flex-col gap-3" data-aos="fade-left">
                        {details.map((detail, idx) => (
                            <div
                                key={idx}
                                className="bg-[#FAF9F6] p-4 flex items-start gap-5 border-l-4 border-[#23471d] group hover:bg-white hover:shadow-xl transition-all duration-300"
                            >
                                <div className="w-10 h-10 rounded-none bg-white flex items-center justify-center shrink-0 shadow-sm transition-colors group-hover:bg-[#23471d] group-hover:text-white">
                                    <detail.icon className="w-4 h-4 text-[#23471d] group-hover:text-white" />
                                </div>
                                <div className="pt-0.5">
                                    <h3 className="text-[8px] font-bold uppercase tracking-[0.3em] text-[#d26019] mb-1">{detail.title}</h3>
                                    <div className="text-base font-bold text-slate-900 mb-0.5 font-serif leading-tight">{detail.value}</div>
                                    <p className="text-[13px] md:text-sm text-slate-600 leading-relaxed text-left">
                                        {detail.sub}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {/* Button — directly after last detail card, no mt-auto gap */}
                        {data?.registerButtonPath && (
                            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="flex justify-end">
                                <a href={data.registerButtonPath}>
                                    <Button className="rounded-xl bg-[#d26019] hover:bg-[#23471d] text-white h-12 px-10 font-black uppercase tracking-[0.2em] text-[10px] group shadow-xl transition-all border-none flex items-center justify-center gap-3">
                                        {data.registerButtonName || "Register as Visitor"} <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                    </Button>
                                </a>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EventHighlights;
