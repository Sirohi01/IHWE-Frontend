import { Store, CheckCircle, FileText, Megaphone, CalendarDays } from "lucide-react";
import { useState, useEffect } from "react";
import { useExhibitorCtx } from "@/context/ExhibitorContext";
import { API_URL } from "@/lib/api";

const hasFile = (value: any) => value !== undefined && value !== null && String(value).trim() !== "";

const fallbackDocumentStats = (data: any) => {
    const docs = [
        data?.companyLogoUrl,
        data?.panCardFrontUrl,
        data?.gstCertificateUrl,
        data?.cancelledChequeUrl,
        data?.representativePhotoUrl,
        data?.registrationPdfUrl,
    ];
    const completed = docs.filter(hasFile).length;
    return {
        completed,
        total: docs.length,
        status: completed === docs.length ? "Completed" : "Pending",
    };
};

export default function StatCards() {
    const { data } = useExhibitorCtx();
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const [docStats, setDocStats] = useState({ completed: 0, total: 6, status: 'Pending' });
    const [marketingStats, setMarketingStats] = useState({ count: 0, status: 'Not Available' });

    useEffect(() => {
        const fetchDocs = async () => {
            const clientId = data?._id;
            if (!clientId) return;
            try {
                const [reqRes, docsRes] = await Promise.all([
                    fetch(`${API_URL}/document-requirements`),
                    fetch(`${API_URL}/client-documents/${clientId}`)
                ]);
                const reqData = await reqRes.json();
                const docsData = await docsRes.json();

                if (Array.isArray(reqData)) {
                    const uploadedMap = new Map();
                    if (Array.isArray(docsData)) {
                        docsData.forEach((d: any) => uploadedMap.set(d.document_name, d));
                    }
                    let completedCount = 0;
                    reqData.forEach((d: any) => {
                        const uploaded = uploadedMap.get(d.document_name);
                        // Depending on business logic, "Pending" might also mean they uploaded it, but user wants it to say "Completed" tab when all filled.
                        // Based on DashboardBottom, it only counts as Completed if Approved. Let's stick to that, or count if uploaded. 
                        // Wait, user says "utne hi number yr DOCUMENTS [0 / 6] Completed iss card me show krenge or pending or completed tab aaega yr jab sare documents fill ho jaenge"
                        if (uploaded?.status === "Approved") completedCount++;
                        else if (uploaded?.status === "Pending") completedCount++; // Let's count them if they are uploaded, even if pending approval?
                    });

                    // Actually, let's just match the exact counting logic. DashboardBottom says status="Completed" if Approved, "Pending" if Pending/Rejected, "Not Uploaded" otherwise.
                    // The user said "jab sare documents fill ho jaenge", so counting uploaded documents might be better. Let's count both Approved and Pending as filled for the numbers, or maybe just Approved? 
                    // Let's count uploaded and submitted ones.
                    let filledCount = 0;
                    reqData.forEach((d: any) => {
                        const uploaded = uploadedMap.get(d.document_name);
                        if (uploaded && uploaded.status !== "Not Uploaded") {
                            filledCount++;
                        }
                    });

                    setDocStats({
                        completed: filledCount,
                        total: reqData.length,
                        status: filledCount === reqData.length ? 'Completed' : 'Pending'
                    });
                } else {
                    setDocStats(fallbackDocumentStats(data));
                }
            } catch (e) {
                console.error("Failed to fetch documents", e);
                setDocStats(fallbackDocumentStats(data));
            }
        };
        fetchDocs();
    }, [data]);

    useEffect(() => {
        const fetchMarketingTemplates = async () => {
            if (!data?._id) return;
            try {
                const res = await fetch(`${API_URL}/marketing-toolkit/templates?exhibitorId=${data._id}`);
                const result = await res.json();
                const count = result.success && Array.isArray(result.data) ? result.data.length : 0;
                setMarketingStats({
                    count,
                    status: count > 0 ? "Available" : "Not Available",
                });
            } catch (e) {
                console.error("Failed to fetch marketing templates", e);
                setMarketingStats({ count: 0, status: "Not Available" });
            }
        };
        fetchMarketingTemplates();
    }, [data?._id]);

    useEffect(() => {
        // Hardcoded to match IntroductionSection.tsx exactly as requested
        const targetDate = new Date("2026-08-21T00:00:00");

        const updateTimer = () => {
            if (!targetDate || isNaN(targetDate.getTime())) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }
            
            const now = new Date().getTime();
            const difference = targetDate.getTime() - now;
            
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
        
        return () => {
            clearInterval(timer);
        };
    }, []);

    const balance = Number(data?.balanceAmount || 0);
    const paid = Number(data?.amountPaid || 0);
    const paymentValue = balance <= 0 && paid > 0 ? "Paid" : paid > 0 ? "Partial" : data?.status || "Pending";

    const stats = [
        {
            id: "stall",
            icon: Store,
            iconBg: "bg-gradient-to-br from-[#7c6ef5] to-[#5b4fcf]",
            cardBg: "bg-indigo-50/70",
            hoverBg: "hover:bg-indigo-100/80",
            label: "STALL NUMBER",
            value: data?.participation?.stallFor || "TBA",
            sub: `${data?.participation?.stallType || "Space"} – ${data?.participation?.stallSize || 0} SQM`,
            valueColor: "text-gray-800",
        },
        {
            id: "payment",
            icon: CheckCircle,
            iconBg: "bg-gradient-to-br from-[#22a96a] to-[#178a52]",
            cardBg: "bg-green-50/70",
            hoverBg: "hover:bg-green-100/80",
            label: "PAYMENT STATUS",
            value: paymentValue,
            sub: balance > 0
                ? `Balance Due: ${data?.participation?.currency || 'INR'} ${balance.toLocaleString('en-IN')}`
                : `Total Paid: ${data?.participation?.currency || 'INR'} ${paid.toLocaleString('en-IN')}`,
            valueColor: "text-[#22a96a]",
        },
        {
            id: "documents",
            icon: FileText,
            iconBg: "bg-gradient-to-br from-[#f97316] to-[#ea6c0a]",
            cardBg: "bg-orange-50/70",
            hoverBg: "hover:bg-orange-100/80",
            label: "DOCUMENTS",
            value: `${docStats.completed} / ${docStats.total}`,
            sub: docStats.status,
            valueColor: "text-gray-800",
        },
        {
            id: "epromotion",
            icon: Megaphone,
            iconBg: "bg-gradient-to-br from-[#3b82f6] to-[#2563eb]",
            cardBg: "bg-blue-50/70",
            hoverBg: "hover:bg-blue-100/80",
            label: "E-PROMOTION",
            value: marketingStats.status,
            sub: `${marketingStats.count} template${marketingStats.count === 1 ? '' : 's'} available`,
            valueColor: "text-[#3b82f6]",
        },
        {
            id: "countdown",
            icon: CalendarDays,
            iconBg: "bg-gradient-to-br from-[#14b8a6] to-[#0d9488]",
            cardBg: "bg-teal-50/70",
            hoverBg: "hover:bg-teal-100/80",
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
                        className={`flex items-center gap-2 ${stat.cardBg} rounded-md px-3 py-1 flex-1 transform translate-y-0 transition-all duration-300 ease-out hover:translate-y-[2.5px] ${stat.hoverBg} ${stat.id === "countdown" ? "min-w-[240px]" : "min-w-[170px]"
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
