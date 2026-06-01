import { Store, CheckCircle, FileText, Megaphone, CalendarDays } from "lucide-react";
import { useState, useEffect } from "react";
import { useExhibitorCtx } from "@/context/ExhibitorContext";


export default function StatCards() {
    const { data } = useExhibitorCtx();
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const targetDate = new Date("2026-08-21T00:00:00");

        const updateTimer = () => {
            const difference = targetDate.getTime() - new Date().getTime();
            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        updateTimer();
        const timer = setInterval(updateTimer, 1000);
        return () => clearInterval(timer);
    }, []);

    const stats = [
        {
            id: "stall",
            icon: Store,
            iconBg: "bg-gradient-to-br from-[#7c6ef5] to-[#5b4fcf]",
            label: "STALL NUMBER",
            value: data?.participation?.stallFor || "TBA",
            sub: `${data?.participation?.stallType || "Space"} – ${data?.participation?.stallSize || 0} SQM`,
            valueColor: "text-gray-800",
        },
        {
            id: "payment",
            icon: CheckCircle,
            iconBg: "bg-gradient-to-br from-[#22a96a] to-[#178a52]",
            label: "PAYMENT STATUS",
            value: data?.status || "Pending",
            sub: `Total Paid: ${data?.participation?.currency || 'INR'} ${data?.amountPaid?.toLocaleString() || '0'}`,
            valueColor: "text-[#22a96a]",
        },
        {
            id: "documents",
            icon: FileText,
            iconBg: "bg-gradient-to-br from-[#f97316] to-[#ea6c0a]",
            label: "DOCUMENTS",
            value: `${[
                data?.companyLogoUrl,
                data?.gstCertificateUrl || data?.kycDocuments?.gstCertificate,
                data?.panCardFrontUrl || data?.kycDocuments?.panCard,
                data?.representativePhotoUrl,
                data?.cancelledChequeUrl,
                data?.brochure
            ].filter(Boolean).length} / 6`,
            sub: "Completed",
            valueColor: "text-gray-800",
        },
        {
            id: "epromotion",
            icon: Megaphone,
            iconBg: "bg-gradient-to-br from-[#3b82f6] to-[#2563eb]",
            label: "E-PROMOTION",
            value: "Active",
            sub: "Your profile is live",
            valueColor: "text-[#3b82f6]",
        },
        {
            id: "countdown",
            icon: CalendarDays,
            iconBg: "bg-gradient-to-br from-[#14b8a6] to-[#0d9488]",
            label: "EVENT COUNTDOWN",
            value: "",
            sub: "Remaining Time",
            valueColor: "text-gray-800",
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:flex xl:flex-nowrap gap-3 w-full pb-2">
            {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                    <div
                        key={stat.id}
                        style={{ boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}
                        className={`flex items-center gap-2 bg-white rounded-md px-3 py-1 flex-1 transform translate-y-0 transition-all duration-300 ease-out hover:translate-y-[2.5px] hover:bg-slate-50/90 ${stat.id === "countdown" ? "min-w-[240px]" : "min-w-[170px]"
                            }`}
                    >
                        <div className={`${stat.iconBg} rounded-xl p-2 shrink-0`}>
                            <Icon size={15} className="text-white" strokeWidth={1.8} />
                        </div>
                        <div className="min-w-0 flex-1 flex flex-col justify-center">
                            {stat.id === "countdown" ? (
                                <>
                                    <p className="text-[10px] font-semibold text-[#1a3a7c] uppercase tracking-wider leading-none mb-1 whitespace-nowrap">
                                        {stat.label}
                                    </p>
                                    <div className="flex items-center gap-1 mt-1">
                                        {/* Days */}
                                        <div className="flex flex-col items-center">
                                            <span className="text-[13px] font-bold text-teal-600 bg-teal-50/80 border border-teal-100 rounded px-1.5 py-0.5 min-w-[22px] text-center tabular-nums leading-none">
                                                {timeLeft.days}
                                            </span>
                                            <span className="text-[7px] font-extrabold text-teal-800/60 uppercase tracking-wider mt-0.5">Days</span>
                                        </div>
                                        <span className="text-teal-400/80 font-bold text-[10px] -mt-2 animate-pulse">:</span>
                                        {/* Hours */}
                                        <div className="flex flex-col items-center">
                                            <span className="text-[13px] font-bold text-teal-600 bg-teal-50/80 border border-teal-100 rounded px-1.5 py-0.5 min-w-[22px] text-center tabular-nums leading-none">
                                                {String(timeLeft.hours).padStart(2, '0')}
                                            </span>
                                            <span className="text-[7px] font-extrabold text-teal-800/60 uppercase tracking-wider mt-0.5">Hours</span>
                                        </div>
                                        <span className="text-teal-400/80 font-bold text-[10px] -mt-2 animate-pulse">:</span>
                                        {/* Minutes */}
                                        <div className="flex flex-col items-center">
                                            <span className="text-[13px] font-bold text-teal-600 bg-teal-50/80 border border-teal-100 rounded px-1.5 py-0.5 min-w-[22px] text-center tabular-nums leading-none">
                                                {String(timeLeft.minutes).padStart(2, '0')}
                                            </span>
                                            <span className="text-[7px] font-extrabold text-teal-800/60 uppercase tracking-wider mt-0.5">Mins</span>
                                        </div>
                                        <span className="text-teal-400/80 font-bold text-[10px] -mt-2 animate-pulse">:</span>
                                        {/* Seconds */}
                                        <div className="flex flex-col items-center">
                                            <span className="text-[13px] font-bold text-teal-600 bg-teal-50/80 border border-teal-100 rounded px-1.5 py-0.5 min-w-[22px] text-center tabular-nums leading-none">
                                                {String(timeLeft.seconds).padStart(2, '0')}
                                            </span>
                                            <span className="text-[7px] font-extrabold text-teal-800/60 uppercase tracking-wider mt-0.5">Secs</span>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex items-baseline gap-1.5 mb-0.5">
                                        <p className="text-[10px] font-semibold text-[#1a3a7c] uppercase tracking-wider leading-none whitespace-nowrap">
                                            {stat.label}
                                        </p>
                                        <span className={`text-[12px] font-bold leading-tight capitalize whitespace-nowrap ${stat.valueColor}`}>
                                            {stat.value}
                                        </span>
                                    </div>
                                    <span className="text-[9px] font-medium text-[#1a3a7c] leading-tight whitespace-nowrap">
                                        {stat.sub}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}