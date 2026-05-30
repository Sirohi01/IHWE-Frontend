import { Wallet, Receipt, TrendingUp, BadgeCheck, MapPin, Building2, CalendarCheck, User } from 'lucide-react';

interface StatsGridProps {
    data: any;
    cur: string;
    paid: number;
    total: number;
    balance: number;
    paidPct: number;
}

export default function ExhibitorStatsGrid({ data, cur, paid, total, balance, paidPct }: StatsGridProps) {
    const locale = data.participation?.currency === 'USD' ? 'en-US' : 'en-IN';
    const fmt = (n: number) => `${cur}${n.toLocaleString(locale, { maximumFractionDigits: 2 })}`;

    const stats = [
        {
            title: 'TOTAL AMOUNT',
            value: fmt(total),
            desc: 'Stall booking value',
            icon: Receipt,
            iconBg: 'bg-indigo-500',
            bg: 'bg-indigo-50',
            text: 'text-indigo-600',
        },
        {
            title: 'AMOUNT PAID',
            value: fmt(paid),
            desc: 'Funds received',
            icon: Wallet,
            iconBg: 'bg-emerald-500',
            bg: 'bg-emerald-50',
            text: 'text-emerald-600',
        },
        {
            title: 'BALANCE DUE',
            value: fmt(balance),
            desc: 'Outstanding amount',
            icon: TrendingUp,
            iconBg: balance > 0 ? 'bg-rose-500' : 'bg-slate-400',
            bg: balance > 0 ? 'bg-rose-50' : 'bg-slate-50',
            text: balance > 0 ? 'text-rose-600' : 'text-slate-500',
        },
        {
            title: 'PAYMENT STATUS',
            value: `${paidPct}% Paid`,
            desc: balance === 0 ? 'Fully settled' : 'Partially paid',
            icon: BadgeCheck,
            iconBg: 'bg-amber-500',
            bg: 'bg-amber-50',
            text: 'text-amber-600',
        },
        {
            title: 'STALL NO.',
            value: data.participation?.stallFor || 'PENDING',
            desc: `${data.participation?.stallSize || 0} sqm · ${data.participation?.stallType || '—'}`,
            icon: MapPin,
            iconBg: 'bg-cyan-500',
            bg: 'bg-cyan-50',
            text: 'text-cyan-600',
        },
        {
            title: 'STALL TYPE',
            value: data.participation?.stallType || '—',
            desc: data.participation?.dimension || '—',
            icon: Building2,
            iconBg: 'bg-purple-500',
            bg: 'bg-purple-50',
            text: 'text-purple-600',
        },
        {
            title: 'EVENT',
            value: data.eventId?.name ? data.eventId.name.split(' ').slice(0, 3).join(' ') + '...' : 'IHWE 2026',
            desc: 'Registered event',
            icon: CalendarCheck,
            iconBg: 'bg-pink-500',
            bg: 'bg-pink-50',
            text: 'text-pink-600',
        },
        {
            title: 'CONTACT',
            value: `${data.contact1?.firstName || ''} ${data.contact1?.lastName || ''}`.trim() || '—',
            desc: data.contact1?.designation || '—',
            icon: User,
            iconBg: 'bg-orange-500',
            bg: 'bg-orange-50',
            text: 'text-orange-600',
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((item, index) => {
                const Icon = item.icon;
                return (
                    <div
                        key={index}
                        className="group relative bg-gradient-to-br from-slate-50 to-slate-100 p-5 border-2 border-slate-200 transition-all duration-500 shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.14)] overflow-hidden"
                    >
                        {/* Decorative balls */}
                        <div className="absolute inset-0 pointer-events-none">
                            <div className={`absolute top-0 right-0 w-48 h-48 ${item.iconBg} opacity-10 rounded-full -mr-16 -mt-16 transition-all duration-1000 group-hover:-mr-8 group-hover:-mt-8`} />
                            <div className={`absolute bottom-0 left-0 w-24 h-24 ${item.iconBg} opacity-10 rounded-full -ml-12 -mb-12 transition-all duration-1000 group-hover:-ml-6 group-hover:-mb-6`} />
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-5">
                                <div className="flex items-center gap-2.5">
                                    <div className={`w-9 h-9 ${item.iconBg} flex items-center justify-center shadow-md`}>
                                        <Icon className="w-4 h-4 text-white" strokeWidth={2.5} />
                                    </div>
                                    <p className="text-[10px] font-bold text-gray-700 uppercase tracking-wide">{item.title}</p>
                                </div>
                                <div className={`px-2 py-1 text-[11px] font-bold ${item.bg} ${item.text} border ${item.iconBg.replace('bg-', 'border-')}`}>
                                    {index + 1}
                                </div>
                            </div>
                            <p className={`text-2xl font-extrabold ${item.text} mb-1 leading-none`}>{item.value}</p>
                            <p className="text-[11px] text-gray-600 font-medium truncate">{item.desc}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
