import {
    Building2, Layers, Wallet, ShoppingBag,
    Handshake, Target, CalendarDays, Megaphone,
    Wrench, FolderOpen, BarChart3, Bell,
    Sparkles
} from 'lucide-react';

interface ModuleGridProps {
    setActiveTab: (tab: any) => void;
    paid: number;
    total: number;
    balance: number;
    paidPct: number;
    cur: string;
    data: any;
}

export default function ExhibitorModuleGrid({ setActiveTab, paid, total, balance, paidPct, cur, data }: ModuleGridProps) {
    const locale = data?.participation?.currency === 'USD' ? 'en-US' : 'en-IN';
    const fmt = (n: number) => `${cur}${n.toLocaleString(locale, { maximumFractionDigits: 2 })}`;

    const modules = [
        {
            id: 'profile',
            label: 'Profile Management',
            desc: 'Brand info, contacts & digital assets',
            icon: Building2,
            accent: '#4f46e5',
            light: '#eef2ff',
            badge: data?.exhibitorName ? 'Active' : 'Incomplete',
            badgeOk: !!data?.exhibitorName,
            tab: 'profile',
        },
        {
            id: 'stall',
            label: 'Stall Management',
            desc: `${data?.participation?.stallFor || 'TBD'} · ${data?.participation?.stallSize || 0} sqm`,
            icon: Layers,
            accent: '#0891b2',
            light: '#ecfeff',
            badge: data?.participation?.stallFor ? 'Assigned' : 'Pending',
            badgeOk: !!data?.participation?.stallFor,
            tab: null,
        },
        {
            id: 'billing',
            label: 'Billing & Payments',  // ✅ changed
            desc: `${fmt(paid)} paid · ${fmt(balance)} due`,
            icon: Wallet,
            accent: balance > 0 ? '#e11d48' : '#16a34a',
            light: balance > 0 ? '#fff1f2' : '#f0fdf4',
            badge: `${paidPct}% Settled`,
            badgeOk: balance === 0,
            tab: 'invoices',
        },
        {
            id: 'products',
            label: 'Products & Services',
            desc: 'Electricity, furniture & branding',
            icon: ShoppingBag,
            accent: '#7c3aed',
            light: '#f5f3ff',
            badge: 'Active',
            badgeOk: true,
            tab: 'accessories',
        },
        {
            id: 'sponsorship',
            label: 'Sponsorship',
            desc: 'Gold | Silver | Booth branding | Lanyard',
            icon: Sparkles,
            accent: '#b45309',
            light: '#fff7ed',
            badge: data?.sponsorship?.tier ? 'Active' : 'Upgrade',
            badgeOk: !!data?.sponsorship?.tier,
            tab: null,
            highlight: true,
        },
        {
            id: 'bsm',
            label: 'Appointments & Meetings',
            desc: 'Schedule & manage buyer meetings',
            icon: Handshake,
            accent: '#d97706',
            light: '#fffbeb',
            badge: '⭐ Core Module',
            badgeOk: true,
            tab: null,
            highlight: true,
        },
        {
            id: 'leads',
            label: 'Leads & Visitors',
            desc: 'QR scans, enquiries & follow-ups',
            icon: Target,
            accent: '#db2777',
            light: '#fdf2f8',
            badge: '⭐ Core Module',
            badgeOk: true,
            tab: null,
            highlight: true,
        },
        {
            id: 'calendar',
            label: 'Meeting Calendar',
            desc: 'Daily schedule & reminders',
            icon: CalendarDays,
            accent: '#0284c7',
            light: '#f0f9ff',
            badge: 'Coming Soon',
            badgeOk: false,
            tab: null,
        },
        {
            id: 'marketing',
            label: 'Marketing & Promotions',
            desc: 'Creatives, email & WhatsApp templates',
            icon: Megaphone,
            accent: '#ea580c',
            light: '#fff7ed',
            badge: 'Coming Soon',
            badgeOk: false,
            tab: null,
        },

        {
            id: 'docs',
            label: 'Document Center',
            desc: 'Manuals, entry passes & T&C',
            icon: FolderOpen,
            accent: '#059669',
            light: '#ecfdf5',
            badge: 'Available',
            badgeOk: true,
            tab: null,
        },
        {
            id: 'analytics',
            label: 'Analytics & ROI',
            desc: 'Profile views, leads & conversion',
            icon: BarChart3,
            accent: '#7c3aed',
            light: '#faf5ff',
            badge: 'Coming Soon',
            badgeOk: false,
            tab: null,
        },

    ];

    return (
        <div className="p-4 space-y-3">
            {/* Section header */}
            <div className="flex items-center gap-2 mb-1">
                <div className="w-1 h-5 bg-[#23471d] rounded-full" />
                <h3 className="text-[11px] font-black text-[#23471d] uppercase tracking-widest">Dashboard Modules</h3>
                <div className="flex-1 h-px bg-slate-100" />
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{modules.length} Modules</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {modules.map((mod) => {
                    const Icon = mod.icon;
                    const isClickable = !!mod.tab;
                    return (
                        <div
                            key={mod.id}
                            onClick={() => mod.tab && setActiveTab(mod.tab)}
                            className={`
                                group relative overflow-hidden border rounded-[3px] p-4 transition-all duration-300
                                ${isClickable ? 'cursor-pointer hover:shadow-lg hover:-translate-y-0.5' : 'cursor-default opacity-80'}
                                ${(mod as any).highlight
                                    ? 'border-2 shadow-md'
                                    : 'border border-slate-200 shadow-sm bg-white'
                                }
                            `}
                            style={
                                (mod as any).highlight
                                    ? { borderColor: mod.accent, background: mod.light }
                                    : {}
                            }
                        >
                            {/* Decorative circle */}
                            <div
                                className="absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-10 transition-all duration-500 group-hover:opacity-20 group-hover:-top-4 group-hover:-right-4"
                                style={{ background: mod.accent }}
                            />

                            {/* Top row */}
                            <div className="flex items-start justify-between mb-3 relative z-10">
                                <div
                                    className="w-9 h-9 rounded-[3px] flex items-center justify-center shadow-sm"
                                    style={{ background: mod.accent }}
                                >
                                    <Icon className="w-4 h-4 text-white" strokeWidth={2.5} />
                                </div>
                                <span
                                    className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-[2px]"
                                    style={{
                                        background: mod.badgeOk ? mod.accent + '18' : '#f1f5f9',
                                        color: mod.badgeOk ? mod.accent : '#94a3b8',
                                        border: `1px solid ${mod.badgeOk ? mod.accent + '40' : '#e2e8f0'}`,
                                    }}
                                >
                                    {mod.badge}
                                </span>
                            </div>

                            {/* Text */}
                            <div className="relative z-10">
                                <p
                                    className="text-[12px] font-extrabold uppercase tracking-tight mb-0.5"
                                    style={{ color: (mod as any).highlight ? mod.accent : '#1e293b' }}
                                >
                                    {mod.label}
                                </p>
                                <p className="text-[10px] text-slate-500 font-medium leading-tight truncate">{mod.desc}</p>
                            </div>

                            {/* Bottom action line */}
                            {isClickable && (
                                <div
                                    className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                                    style={{ background: mod.accent }}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}