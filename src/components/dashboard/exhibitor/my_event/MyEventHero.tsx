import { useEffect, useState } from "react";
import { ArrowRight, Store, Calendar, Wrench, AlertTriangle, Users } from "lucide-react";
import Hero from "@/assets/exhibitor/myeventhero2.png";
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
    return (
        <div 
            className="flex items-center gap-4 rounded-lg bg-white px-4 py-1 flex-1 min-w-0 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer group"
            style={{ boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}
        >
            <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110`}>
                <Icon size={22} strokeWidth={1.4} className="text-current" />
            </div>
            <div className="min-w-0">
                <p className="text-[12px] text-[#1a3a7c] font-medium mb-0.5">{label}</p>
                <p className="text-[15px] font-semibold text-[#0f1f45] leading-tight">{value}</p>
                <p className="text-[11px] text-gray-400">{sub}</p>
            </div>
        </div>
    );
}

export default function MyEventHero({ data }: { data: any }) {
    const navigate = useNavigate();
    const fallbackDate = new Date("2026-08-21T00:00:00");
    const rawDate = data?.eventId?.startDate ? new Date(data.eventId.startDate) : null;
    const isInvalidOrPast = !rawDate || Number.isNaN(rawDate.getTime()) || rawDate.getTime() <= Date.now();
    const eventStart = isInvalidOrPast ? fallbackDate : rawDate;
    
    const { days, hrs, mins, secs } = useCountdown(eventStart);
    const eventDates = formatDateRange(data?.eventId?.startDate, data?.eventId?.endDate);
    const setupDates = shiftDateRange(data?.eventId?.startDate);
    const dismantlingDate = singleDate(data?.eventId?.endDate);
    const teamCount = Array.isArray(data?.teamMembers) ? data.teamMembers.length : 0;
    const stallValue = data?.participation?.stallFor || data?.participation?.stallNo || "TBD";
    const stallSub = data?.participation?.stallScheme || data?.participation?.stallType || "Stall pending";
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
                    className="flex-1 relative min-h-[130px] flex items-end justify-end p-2"
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
                        className="w-fit flex flex-row items-center gap-6 justify-between px-4 py-3"
                    >
                        {/* Tagline */}
                        <div className="w-[180px]">
                            <p className="text-white/80 text-[15px] italic font-medium leading-snug" style={{ fontFamily: 'Georgia, serif' }}>
                                Let's make your
                            </p>
                            <p className="text-white text-[17px] font-semibold leading-tight tracking-wide">
                                {eventName}
                            </p>
                            <p className="text-[#47B338] text-[19px] font-black italic leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                                experience
                            </p>
                            <p className="text-white/90 text-[15px] font-medium italic leading-snug" style={{ fontFamily: 'Georgia, serif' }}>
                                extraordinary!
                            </p>
                        </div>

                        {/* Countdown + button */}
                        <div className="flex flex-col relative gap-2">
                            <div className="px-3 py-1.5 bg-[#021825] rounded-lg shrink-0 border border-white/10 ">
                                <p className="text-white text-[9px] font-bold uppercase tracking-widest mb-1.5">Event Starts In</p>
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
