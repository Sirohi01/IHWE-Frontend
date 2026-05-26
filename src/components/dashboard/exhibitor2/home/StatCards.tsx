import { Store, CheckCircle, FileText, Megaphone, CalendarDays } from "lucide-react";
import { useState, useEffect } from "react";


export default function StatCards() {
    const [daysLeft, setDaysLeft] = useState(0);

    useEffect(() => {
        const targetDate = new Date("2026-08-21T00:00:00");
        const difference = targetDate.getTime() - new Date().getTime();

        if (difference > 0) {
            setDaysLeft(Math.floor(difference / (1000 * 60 * 60 * 24)));
        }
    }, []);

    const stats = [
        {
            id: "stall",
            icon: Store,
            iconBg: "bg-gradient-to-br from-[#7c6ef5] to-[#5b4fcf]",
            label: "STALL NUMBER",
            value: "98",
            sub: "Raw Space – 9 SQM",
            valueColor: "text-gray-800",
        },
        {
            id: "payment",
            icon: CheckCircle,
            iconBg: "bg-gradient-to-br from-[#22a96a] to-[#178a52]",
            label: "PAYMENT STATUS",
            value: "Paid",
            sub: "Total Paid: INR 11.00",
            valueColor: "text-[#22a96a]",
        },
        {
            id: "documents",
            icon: FileText,
            iconBg: "bg-gradient-to-br from-[#f97316] to-[#ea6c0a]",
            label: "DOCUMENTS",
            value: "3 / 6",
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
            value: daysLeft.toString(),
            sub: "Days to go!",
            valueColor: "text-gray-800",
        },
    ];

    return (
        <div className="flex gap-3 w-full overflow-x-auto pb-1">
            {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                    <div
                        key={stat.id}
                        className="flex items-center gap-3 bg-white rounded-md px-4 py-3 shadow-sm border border-gray-100 min-w-[170px] flex-1"
                    >
                        <div className={`${stat.iconBg} rounded-xl p-3 shrink-0`}>
                            <Icon size={18} className="text-white" strokeWidth={1.8} />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[11px] font-semibold text-[#1a3a7c] uppercase tracking-wider leading-none mb-1">
                                {stat.label}
                            </p>
                            <p className={`text-lg font-medium leading-tight ${stat.valueColor}`}>
                                {stat.value}
                            </p>
                            <p className="text-[11px] text-[#1a3a7c] mt-0.5 leading-tight">
                                {stat.sub}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}