import { useEffect, useState } from "react";
import { ArrowRight, Store, Calendar, Wrench, AlertTriangle, Users } from "lucide-react";
import Hero from "@/assets/exhibitor/myeventhero2.png";

function useCountdown(targetDate: Date) {
    const calc = () => {
        const diff = Math.max(0, targetDate.getTime() - Date.now());
        return {
            days: Math.floor(diff / 86400000),
            hrs: Math.floor((diff % 86400000) / 3600000),
            mins: Math.floor((diff % 3600000) / 60000),
            secs: Math.floor((diff % 60000) / 1000),
        };
    };
    const [time, setTime] = useState(calc);
    useEffect(() => {
        const t = setInterval(() => setTime(calc()), 1000);
        return () => clearInterval(t);
    }, []);
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
        <div className="flex items-center gap-4 rounded-lg border border-gray-100 shadow-sm px-4 py-1 flex-1 min-w-0 transition-all duration-200 hover:shadow-md hover:border-blue-200 bg-white hover:bg-blue-50/40 hover:-translate-y-0.5 cursor-pointer group">
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

const EVENT_DATE = new Date("2026-08-21T10:00:00");

const INFO_CARDS = [
    { icon: Store, iconBg: "bg-emerald-50 text-emerald-600", label: "Stall Number", value: "H4-23", sub: "Hall 04" },
    { icon: Calendar, iconBg: "bg-violet-50 text-violet-500", label: "Event Dates", value: "21 – 23", sub: "August 2026" },
    { icon: Wrench, iconBg: "bg-blue-50 text-blue-400", label: "Setup Dates", value: "19 – 20", sub: "August 2026" },
    { icon: AlertTriangle, iconBg: "bg-orange-50 text-orange-400", label: "Dismantling Date", value: "23", sub: "August 2026" },
    { icon: Users, iconBg: "bg-sky-50 text-sky-500", label: "Team Members", value: "05", sub: "Registered" },
];

export default function MyEventHero() {
    const { days, hrs, mins, secs } = useCountdown(EVENT_DATE);

    return (
        <div className="flex flex-col gap-3 w-full ">

            {/* ── Top Banner: 3 columns ── */}
            <div className="flex overflow-hidden gap-6">

                {/* COL 1 — White title */}
                <div className="flex flex-col justify-center  py-8  w-[230px]">
                    <h2 className="text-[28px] font-semibold text-[#0f1f45] leading-tight mb-2">My Event</h2>
                    <div className="w-10 h-[3px] bg-emerald-500 rounded-full mb-3" />
                    <p className="text-[13px] text-[#1a3a7c] leading-relaxed">
                        Manage, track and organize everything about your participation in IHWE 2026 – all in one place.
                    </p>
                </div>

                {/* COL 2 — Hero image */}
                <div
                    className="flex-1 relative min-h-[170px] flex items-end justify-end p-2"
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
                        className="w-fit  flex flex-row items-center gap-8 justify-between px-6 py-5 "
                    >
                        {/* Tagline */}
                        <div className="w-[180px]">
                            <p className="text-white/80 text-lg italic font-medium leading-snug" style={{ fontFamily: 'Georgia, serif' }}>
                                Let's make your
                            </p>
                            <p className="text-white text-xl font-semibold leading-tight tracking-wide">
                                IHWE 2026
                            </p>
                            <p className="text-[#47B338] text-[22px] font-black italic leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                                experience
                            </p>
                            <p className="text-white/90 text-lg font-medium italic leading-snug" style={{ fontFamily: 'Georgia, serif' }}>
                                extraordinary!
                            </p>
                        </div>

                        {/* Countdown + button */}
                        <div className="flex flex-col relative  gap-3">
                            <div className="px-3 py-2 bg-[#021825] rounded-lg shrink-0 border border-white/10 ">
                                <p className="text-white text-[10px] font-bold uppercase tracking-widest mb-2.5">Event Starts In</p>
                                <div className="flex items-center gap-2 ">
                                    <CountBox value={days} label="DAYS" />
                                    <CountBox value={hrs} label="HRS" />
                                    <CountBox value={mins} label="MINS" />
                                    <CountBox value={secs} label="SECS" />
                                </div>

                            </div>
                            <button className="w-full flex items-center justify-center gap-2 py-1.5 rounded-md bg-[#339D3F] hover:bg-emerald-600 text-white font-bold text-[13px] transition-colors">
                                View Event Details <ArrowRight size={14} />
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            {/* ── Bottom Info Cards ── */}
            <div className="flex gap-3">
                {INFO_CARDS.map((card, i) => (
                    <InfoCard key={i} {...card} />
                ))}
            </div>

        </div>
    );
}