import { useEffect, useState } from "react";
import { ArrowRight, Store, Calendar, Wrench, AlertTriangle, Users } from "lucide-react";
import Hero from "@/assets/exhibitor/myeventhero2.webp";
import { useNavigate } from "react-router-dom";

const formatDateRange = (start?: string, end?: string) => {
    if (!start) return { value: "TBD", sub: "Dates pending" };
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : startDate;
    if (Number.isNaN(startDate.getTime())) return { value: "TBD", sub: "Dates pending" };

    const sameMonth = startDate.getMonth() === endDate.getMonth() && startDate.getFullYear() === endDate.getFullYear();
    const value = sameMonth
        ? `${startDate.getDate()} - ${endDate.getDate()}`
        : `${startDate.toLocaleDateString("en-GB", { day: "2-digit", month: "short" })} - ${endDate.toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}`;
    const sub = sameMonth
        ? startDate.toLocaleDateString("en-GB", { month: "long", year: "numeric" })
        : endDate.getFullYear().toString();
    return { value, sub };
};

const shiftDateRange = (start?: string, daysBefore = 2) => {
    if (!start) return { value: "TBD", sub: "Setup pending" };
    const startDate = new Date(start);
    if (Number.isNaN(startDate.getTime())) return { value: "TBD", sub: "Setup pending" };
    const setupStart = new Date(startDate);
    setupStart.setDate(startDate.getDate() - daysBefore);
    const setupEnd = new Date(startDate);
    setupEnd.setDate(startDate.getDate() - 1);
    return formatDateRange(setupStart.toISOString(), setupEnd.toISOString());
};

const singleDate = (date?: string) => {
    if (!date) return { value: "TBD", sub: "Date pending" };
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return { value: "TBD", sub: "Date pending" };
    return {
        value: String(d.getDate()).padStart(2, "0"),
        sub: d.toLocaleDateString("en-GB", { month: "long", year: "numeric" }),
    };
};

function useCountdown(targetDate: Date) {
    const targetTime = targetDate.getTime();
    const calc = () => {
        if (Number.isNaN(targetTime)) return { days: 0, hrs: 0, mins: 0, secs: 0 };
        const diff = Math.max(0, targetTime - Date.now());
        return {
            days: Math.floor(diff / 86400000),
            hrs: Math.floor((diff % 86400000) / 3600000),
            mins: Math.floor((diff % 3600000) / 60000),
            secs: Math.floor((diff % 60000) / 1000),
        };
    };
    const [time, setTime] = useState(calc);
    useEffect(() => {
        setTime(calc());
        if (Number.isNaN(targetTime)) return;
        const t = setInterval(() => setTime(calc()), 1000);
        return () => clearInterval(t);
    }, [targetTime]);
    return time;
}

function CountBox({ value, label }: { value: number; label: string }) {
    return (
        <div className="flex flex-col items-center gap-1">
            <div className="w-[32px] h-[32px] bg-white rounded-xl flex items-center justify-center shadow-md">
                <span className="text-[14px] font-black text-[#0f1f45] tabular-nums">
                    {String(value).padStart(2, "0")}
                </span>
            </div>
            <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">{label}</span>
        </div>
    );
}

function InfoCard({ icon: Icon, iconBg, label, value, sub }: {
    icon: any; iconBg: string; label: string; value: string; sub: string;
}) {
    let gradientTo = 'to-slate-50';
    if (iconBg.includes('emerald')) gradientTo = 'to-emerald-50';
    else if (iconBg.includes('violet')) gradientTo = 'to-violet-50';
    else if (iconBg.includes('blue')) gradientTo = 'to-blue-50';
    else if (iconBg.includes('orange')) gradientTo = 'to-orange-50';
    else if (iconBg.includes('sky')) gradientTo = 'to-sky-50';

    return (
        <div 
            className={`flex items-center gap-3 rounded-xl bg-gradient-to-br from-white ${gradientTo} px-3 py-2 flex-1 min-w-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer border border-slate-200 shadow-sm`}
            style={{ fontFamily: 'Inter, sans-serif' }}
        >
            <div className={`w-8 h-8 rounded-full ${iconBg} flex items-center justify-center shrink-0`}>
                <Icon size={16} strokeWidth={1.8} className="text-current" />
            </div>
            <div className="flex flex-col min-w-0">
                <span className="text-[13px] font-[800] text-[#0f172a] leading-none mb-[2px] truncate block">{value}</span>
                <span className="text-[8px] font-[800] text-[#334155] uppercase leading-tight truncate block">{label}</span>
                <span className="text-[9px] font-[700] text-[#475569] leading-tight truncate block mt-0.5">{sub}</span>
            </div>
        </div>
    );
}

export default function MyEventHero({ data, myStalls = [] }: { data: any; myStalls?: any[] }) {
    const navigate = useNavigate();
    const fallbackDate = new Date("2026-08-21T00:00:00");
    const rawDate = data?.eventId?.startDate ? new Date(data.eventId.startDate) : null;
    const isInvalidOrPast = !rawDate || Number.isNaN(rawDate.getTime()) || rawDate.getTime() <= Date.now();
    const eventStart = isInvalidOrPast ? fallbackDate : rawDate;
    
    const { days, hrs, mins, secs } = useCountdown(eventStart);
    const eventDates = formatDateRange(data?.eventId?.startDate, data?.eventId?.endDate);
    // Prefer the real Setup/Dismantling dates set on the event in admin; fall back to an
    // estimate (2 days before start / the event's end date) for events that predate those fields.
    const setupDates = data?.eventId?.setupDate
        ? singleDate(data.eventId.setupDate)
        : shiftDateRange(data?.eventId?.startDate);
    const dismantlingDate = data?.eventId?.dismantlingDate
        ? singleDate(data.eventId.dismantlingDate)
        : singleDate(data?.eventId?.endDate);
    const teamCount = Array.isArray(data?.teamMembers) ? data.teamMembers.length : 0;
    const stallValue = myStalls.length > 1
        ? myStalls.map((s) => s.stallNumber).join(", ")
        : data?.participation?.stallFor || data?.participation?.stallNo || "TBD";
    const stallSub = myStalls.length > 1
        ? `${myStalls.length} stalls`
        : data?.participation?.stallScheme || data?.participation?.stallType || "Stall pending";
    const eventName = data?.eventId?.name || "IHWE 2026";

    const infoCards = [
        { icon: Store, iconBg: "bg-emerald-50 text-emerald-600", label: "Stall Number", value: stallValue, sub: stallSub },
        { icon: Calendar, iconBg: "bg-violet-50 text-violet-500", label: "Event Dates", value: eventDates.value, sub: eventDates.sub },
        { icon: Wrench, iconBg: "bg-blue-50 text-blue-400", label: "Setup Dates", value: setupDates.value, sub: setupDates.sub },
        { icon: AlertTriangle, iconBg: "bg-orange-50 text-orange-400", label: "Dismantling Date", value: dismantlingDate.value, sub: dismantlingDate.sub },
        { icon: Users, iconBg: "bg-sky-50 text-sky-500", label: "Team Members", value: String(teamCount).padStart(2, "0"), sub: "Registered" },
    ];

    return (
        <div className="flex flex-col gap-2 w-full ">

            {/* ── Top Banner: 3 columns ── */}
            <div className="flex overflow-hidden gap-4">

                {/* COL 1 — White title */}
                <div className="flex flex-col justify-center py-2 w-[230px]">
                    <h2 className="text-[24px] font-semibold text-[#0f1f45] leading-tight mb-1">My Event</h2>
                    <div className="w-10 h-[3px] bg-emerald-500 rounded-full mb-2" />
                    <p className="text-[12px] text-[#1a3a7c] leading-relaxed">
                        Manage, track and organize everything about your participation in {eventName} - all in one place.
                    </p>
                </div>

                {/* COL 2 — Hero image */}
                <div
                    className="flex-1 relative min-h-[110px] flex items-end justify-end p-1.5"
                    style={{
                        backgroundImage: `url(${Hero})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        borderRadius: "12px",
                    }}
                >

                    {/* COL 3 — Dark navy: tagline top, countdown bottom */}
                    <div
                        className="w-fit flex flex-row items-center gap-6 justify-between px-4 py-2"
                    >
                        {/* Tagline */}
                        <div className="w-[180px]">
                            <p className="text-white/80 text-[13px] italic font-medium leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                                Let's make your
                            </p>
                            <p className="text-white text-[15px] font-semibold leading-tight tracking-wide">
                                {eventName}
                            </p>
                            <p className="text-[#47B338] text-[17px] font-black italic leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                                experience
                            </p>
                            <p className="text-white/90 text-[13px] font-medium italic leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                                extraordinary!
                            </p>
                        </div>

                        {/* Countdown + button */}
                        <div className="flex flex-col relative gap-1.5">
                            <div className="px-3 py-1 bg-[#021825] rounded-lg shrink-0 border border-white/10 ">
                                <p className="text-white text-[8px] font-bold uppercase tracking-widest mb-1">Event Starts In</p>
                                <div className="flex items-center gap-2">
                                    <CountBox value={days} label="DAYS" />
                                    <CountBox value={hrs} label="HRS" />
                                    <CountBox value={mins} label="MINS" />
                                    <CountBox value={secs} label="SECS" />
                                </div>

                            </div>
                            <button
                                onClick={() => navigate("/exhibitor-dashboard/exhibitions")}
                                className="w-full flex items-center justify-center gap-2 py-1 rounded-md bg-[#339D3F] hover:bg-emerald-600 text-white font-bold text-[12px] transition-colors"
                            >
                                View Event Details <ArrowRight size={12} />
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            {/* ── Bottom Info Cards ── */}
            <div className="flex gap-2">
                {infoCards.map((card, i) => (
                    <InfoCard key={i} {...card} />
                ))}
            </div>

        </div>
    );
}
