import { motion } from 'framer-motion';
import { MapPin, Building2, Receipt, Wallet, TrendingUp, BadgeCheck, User, Award, Printer } from 'lucide-react';
import { InfoRow } from './Shared';
import { Briefcase } from 'lucide-react';

interface OverviewProps {
    data: any;
    cur: string;
    status: any;
    paidPct: number;
    paid: number;
    total: number;
    balance: number;
    setActiveTab: (tab: any) => void;
}

export default function ExhibitorOverview({ data, cur, status, paidPct, paid, total, balance, setActiveTab }: OverviewProps) {
    return (
        <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-8"
        >
            {/* 👑 HERO COMMAND SECTION */}
            <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#1a3516] to-[#3a7a2e] rounded-[3rem] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-700" />
                <div className="relative bg-white border border-slate-200 rounded-[3rem] overflow-hidden shadow-xl shadow-slate-200/50">
                    <div className="p-8 sm:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-12">
                        <div className="space-y-6 lg:max-w-4xl">
                            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">{data.status} • {data._id.slice(-8).toUpperCase()}</span>
                            </div>
                            <div>
                                <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tighter leading-tight">
                                    Welcome back,<br />
                                    <span className="text-[#23471d]">{data.exhibitorName}</span>
                                </h2>
                                <p className="text-slate-400 font-medium text-sm mt-4 leading-relaxed max-w-md">
                                    Your participation in {data.eventId?.name || 'IHWE 2026'} is currently in the <span className="text-slate-900 font-bold underline decoration-[#23471d]/30 underline-offset-4">{status.label}</span> phase.
                                </p>
                            </div>
                            <div className="flex flex-wrap items-center gap-6 pt-2">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Allocated Stall</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                                            <MapPin size={14} strokeWidth={2.5} />
                                        </div>
                                        <span className="text-lg font-black text-slate-900">{data.participation?.stallFor || data.participation?.stallNo || 'PENDING'}</span>
                                    </div>
                                </div>
                                <div className="w-px h-10 bg-slate-100" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Booth Area</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                            <Building2 size={14} strokeWidth={2.5} />
                                        </div>
                                        <span className="text-lg font-black text-slate-900">{data.participation?.stallSize || 0} SQM</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Circle */}
                        <div className="shrink-0 flex items-center justify-center">
                            <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full border-[12px] border-slate-50 flex items-center justify-center bg-white shadow-inner">
                                <svg className="absolute inset-0 w-full h-full -rotate-90">
                                    <circle
                                        cx="50%" cy="50%" r="48%"
                                        className="fill-none stroke-emerald-500/10 stroke-[12]"
                                    />
                                    <motion.circle
                                        cx="50%" cy="50%" r="48%"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: paidPct / 100 }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        className="fill-none stroke-[#23471d] stroke-[12] stroke-round"
                                    />
                                </svg>
                                <div className="text-center space-y-1">
                                    <p className="text-3xl sm:text-5xl font-black text-slate-900 tabular-nums">{paidPct}%</p>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Settled</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 📊 METRICS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Obligation', value: `${cur}${total.toLocaleString()}`, icon: Receipt, col: 'indigo' },
                    { label: 'Funds Realized', value: `${cur}${paid.toLocaleString()}`, icon: Wallet, col: 'emerald' },
                    { label: 'Outstanding Due', value: `${cur}${balance.toLocaleString()}`, icon: TrendingUp, col: balance > 0 ? 'rose' : 'slate' },
                    { label: 'Account Health', value: balance === 0 ? 'PRIME' : 'ACTIVE', icon: BadgeCheck, col: 'amber' },
                ].map((stat, i) => (
                    <div key={stat.label} className="group bg-white p-6 rounded-[2rem] border border-slate-200 hover:border-[#23471d]/20 transition-all hover:shadow-xl hover:shadow-slate-200/40">
                        <div className={`w-12 h-12 rounded-2xl bg-${stat.col}-50 flex items-center justify-center text-${stat.col}-600 mb-6 group-hover:scale-110 transition-transform`}>
                            <stat.icon size={20} strokeWidth={2.5} />
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5">{stat.label}</p>
                        <p className="text-xl font-black text-slate-900 tracking-tight tabular-nums">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* 🏗️ QUICK ACTIONS / IDENTITY */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden">
                    <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Enterprise Context</h3>
                        <motion.button
                            onClick={() => setActiveTab('profile')}
                            whileHover={{ scale: 1.05 }}
                            className="text-[10px] font-black text-[#23471d] uppercase tracking-widest hover:underline"
                        >
                            Manage Identity
                        </motion.button>
                    </div>
                    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InfoRow label="Official Entity" value={data.exhibitorName} icon={Building2} />
                        <InfoRow label="Industry Sector" value={data.industrySector} icon={Briefcase} />
                        <InfoRow label="Liaison Officer" value={`${data.contact1?.firstName} ${data.contact1?.lastName}`} icon={User} />
                        <InfoRow label="Designation" value={data.contact1?.designation} icon={Award} />
                    </div>
                </div>
                <div className="bg-slate-900 rounded-[2.5rem] p-8 sm:p-10 text-white relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
                    <div className="space-y-6 relative z-10">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                            <Printer size={20} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h4 className="text-xl font-black tracking-tight leading-tight">Confirmation<br />Documents</h4>
                            <p className="text-white/40 text-xs font-medium mt-3 leading-relaxed">
                                Download your official registration certificate and stall allocation documents.
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => window.print()}
                        className="w-full py-4 bg-white text-slate-900 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-emerald-50 hover:text-[#23471d] transition-all mt-10"
                    >
                        Print Certificate
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
