import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LogOut, MapPin, CreditCard, Download, FileText, CheckCircle,
    Building2, User, ShieldCheck, Mail, Phone, Wallet, Receipt,
    Printer, BadgeCheck, XCircle, Hourglass, TrendingUp, Calendar,
    Hash, Briefcase
} from 'lucide-react';
import { toast } from 'sonner';
import { API_URL } from '@/lib/api';

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string; dot: string; icon: any; step: number }> = {
    pending:        { label: 'Under Review',   color: 'text-amber-700',   bg: 'bg-amber-50',   border: 'border-amber-200',  dot: 'bg-amber-400',   icon: Hourglass,   step: 1 },
    approved:       { label: 'Approved',        color: 'text-blue-700',    bg: 'bg-blue-50',    border: 'border-blue-200',   dot: 'bg-blue-500',    icon: BadgeCheck,  step: 2 },
    'advance-paid': { label: 'Advance Paid',    color: 'text-violet-700',  bg: 'bg-violet-50',  border: 'border-violet-200', dot: 'bg-violet-500',  icon: CreditCard,  step: 3 },
    paid:           { label: 'Fully Paid',      color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200',dot: 'bg-emerald-500', icon: CheckCircle, step: 4 },
    confirmed:      { label: 'Confirmed',       color: 'text-green-800',   bg: 'bg-green-50',   border: 'border-green-300',  dot: 'bg-green-600',   icon: ShieldCheck, step: 5 },
    rejected:       { label: 'Rejected',        color: 'text-red-700',     bg: 'bg-red-50',     border: 'border-red-200',    dot: 'bg-red-500',     icon: XCircle,     step: 0 },
};

const STEPS = [
    { label: 'Submitted',    sub: 'Application received' },
    { label: 'Approved',     sub: 'Admin verified' },
    { label: 'Advance Paid', sub: 'Partial payment' },
    { label: 'Fully Paid',   sub: 'Payment complete' },
    { label: 'Confirmed',    sub: 'Stall confirmed' },
];

function InfoRow({ label, value, mono = false }: { label: string; value?: string | null; mono?: boolean }) {
    return (
        <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{label}</span>
            <span className={`text-sm font-semibold text-slate-800 ${mono ? 'font-mono' : ''}`}>
                {value || <span className="text-slate-300 font-normal">—</span>}
            </span>
        </div>
    );
}
function PrintDocument({ data }: { data: any }) {
    const cur = data.currency === 'USD' ? '$' : '₹';
    const status = STATUS_CONFIG[data.status] || STATUS_CONFIG.pending;
    const paid = data.amountPaid || 0;
    const total = data.participation?.total || 0;
    const balance = data.balanceAmount || 0;
    const regDate = data.createdAt ? new Date(data.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';
    const printDate = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });

    return (
        <div className="hidden print:block font-['Inter',sans-serif] text-slate-900 bg-white p-0 m-0">

            {/* PAGE 1 */}
            <div style={{ pageBreakAfter: 'always', padding: '32px 40px' }}>

                {/* Header */}
                <div style={{ borderBottom: '3px solid #23471d', paddingBottom: '16px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', color: '#23471d', textTransform: 'uppercase', marginBottom: '4px' }}>
                            Namo Gange Trust Foundation
                        </div>
                        <div style={{ fontSize: '22px', fontWeight: 900, color: '#1a1a1a', letterSpacing: '-0.5px', lineHeight: 1.1 }}>
                            Global Healthcare Excellence 2026
                        </div>
                        <div style={{ fontSize: '9px', fontWeight: 600, color: '#666', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '4px' }}>
                            Official Exhibitor Registration Certificate
                        </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '9px', color: '#888', marginBottom: '2px' }}>Registration ID</div>
                        <div style={{ fontSize: '16px', fontWeight: 900, fontFamily: 'monospace', color: '#23471d', letterSpacing: '2px' }}>
                            #{data._id.slice(-8).toUpperCase()}
                        </div>
                        <div style={{ fontSize: '9px', color: '#888', marginTop: '6px' }}>Printed: {printDate}</div>
                        <div style={{ fontSize: '9px', color: '#888' }}>Registered: {regDate}</div>
                    </div>
                </div>

                {/* Status Banner */}
                <div style={{ background: '#f8fdf8', border: '1px solid #c6e6c6', borderRadius: '8px', padding: '12px 20px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <div style={{ fontSize: '9px', color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Application Status</div>
                        <div style={{ fontSize: '16px', fontWeight: 800, color: '#23471d', marginTop: '2px' }}>{status.label}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '9px', color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Allocated Stall</div>
                        <div style={{ fontSize: '20px', fontWeight: 900, color: '#d26019', marginTop: '2px' }}>
                            {data.participation?.stallFor || data.participation?.stallNo || 'Pending'}
                        </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '9px', color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Total Amount</div>
                        <div style={{ fontSize: '18px', fontWeight: 900, color: '#1a1a1a', marginTop: '2px' }}>{cur}{total.toLocaleString('en-IN')}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '9px', color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Balance Due</div>
                        <div style={{ fontSize: '18px', fontWeight: 900, color: balance > 0 ? '#dc2626' : '#16a34a', marginTop: '2px' }}>{cur}{balance.toLocaleString('en-IN')}</div>
                    </div>
                </div>

                {/* Two Column Layout */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>

                    {/* Company Details */}
                    <div>
                        <div style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#23471d', borderBottom: '1px solid #23471d', paddingBottom: '4px', marginBottom: '12px' }}>
                            Company Information
                        </div>
                        {[
                            ['Company / Firm Name', data.exhibitorName],
                            ['Fascia / Brand Name', data.fasciaName || data.exhibitorName],
                            ['Industry Sector', data.industrySector],
                            ['Nature of Business', data.natureOfBusiness],
                            ['Type of Business', data.typeOfBusiness],
                            ['Website', data.website],
                            ['Landline', data.landlineNo],
                        ].map(([label, val]) => val ? (
                            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dotted #e5e7eb', padding: '5px 0', gap: '8px' }}>
                                <span style={{ fontSize: '9px', color: '#888', fontWeight: 600, flexShrink: 0 }}>{label}</span>
                                <span style={{ fontSize: '9px', fontWeight: 700, color: '#1a1a1a', textAlign: 'right' }}>{val}</span>
                            </div>
                        ) : null)}
                        <div style={{ marginTop: '10px' }}>
                            <div style={{ fontSize: '9px', color: '#888', fontWeight: 600, marginBottom: '3px' }}>Registered Address</div>
                            <div style={{ fontSize: '9px', fontWeight: 700, color: '#1a1a1a', lineHeight: 1.5 }}>
                                {data.address}<br />
                                {[data.city, data.state, data.country, data.pincode].filter(Boolean).join(', ')}
                            </div>
                        </div>
                    </div>

                    {/* Stall + Financial */}
                    <div>
                        <div style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#d26019', borderBottom: '1px solid #d26019', paddingBottom: '4px', marginBottom: '12px' }}>
                            Stall & Financial Details
                        </div>
                        {[
                            ['Stall Number', data.participation?.stallFor || data.participation?.stallNo],
                            ['Stall Type', data.participation?.stallType],
                            ['Category', data.participation?.stallCategory],
                            ['Area', data.participation?.stallSize ? `${data.participation.stallSize} SQM` : null],
                            ['Dimensions', data.participation?.dimension],
                            ['Rate / SQM', data.participation?.rate ? `${cur}${data.participation.rate.toLocaleString('en-IN')}` : null],
                        ].map(([label, val]) => val ? (
                            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dotted #e5e7eb', padding: '5px 0', gap: '8px' }}>
                                <span style={{ fontSize: '9px', color: '#888', fontWeight: 600 }}>{label}</span>
                                <span style={{ fontSize: '9px', fontWeight: 700, color: '#1a1a1a' }}>{val}</span>
                            </div>
                        ) : null)}

                        {/* Financial Summary */}
                        <div style={{ marginTop: '14px', background: '#fafafa', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '10px 12px' }}>
                            {[
                                ['Base Amount', `${cur}${(data.participation?.amount || 0).toLocaleString('en-IN')}`, '#1a1a1a'],
                                data.participation?.discount > 0 ? ['Discount', `−${cur}${data.participation.discount.toLocaleString('en-IN')}`, '#16a34a'] : null,
                                ['GST', `+${cur}${((data.participation?.amount || 0) * ((data.participation?.gstPercent || 18) / 100)).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`, '#1a1a1a'],
                            ].filter(Boolean).map((row: any) => (
                                <div key={row[0]} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0', fontSize: '9px' }}>
                                    <span style={{ color: '#666' }}>{row[0]}</span>
                                    <span style={{ fontWeight: 700, color: row[2] }}>{row[1]}</span>
                                </div>
                            ))}
                            <div style={{ borderTop: '1px solid #d1d5db', marginTop: '6px', paddingTop: '6px', display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '10px', fontWeight: 800 }}>Total</span>
                                <span style={{ fontSize: '12px', fontWeight: 900 }}>{cur}{total.toLocaleString('en-IN')}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0', fontSize: '9px' }}>
                                <span style={{ color: '#666' }}>Amount Paid</span>
                                <span style={{ fontWeight: 700, color: '#16a34a' }}>{cur}{paid.toLocaleString('en-IN')}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0', fontSize: '9px' }}>
                                <span style={{ color: '#666' }}>Balance Due</span>
                                <span style={{ fontWeight: 700, color: balance > 0 ? '#dc2626' : '#16a34a' }}>{cur}{balance.toLocaleString('en-IN')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contacts */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                    {[
                        { title: 'Primary Contact', c: data.contact1, color: '#23471d' },
                        { title: 'Secondary Contact', c: data.contact2, color: '#555' },
                    ].map(({ title, c, color }) => c?.firstName ? (
                        <div key={title}>
                            <div style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color, borderBottom: `1px solid ${color}`, paddingBottom: '4px', marginBottom: '10px' }}>
                                {title}
                            </div>
                            <div style={{ fontSize: '11px', fontWeight: 800, color: '#1a1a1a' }}>
                                {[c.title, c.firstName, c.lastName].filter(Boolean).join(' ')}
                            </div>
                            <div style={{ fontSize: '9px', color: '#888', marginBottom: '6px' }}>{c.designation}</div>
                            {c.email && <div style={{ fontSize: '9px', color: '#444', marginBottom: '2px' }}>✉ {c.email}</div>}
                            {c.mobile && <div style={{ fontSize: '9px', color: '#444', marginBottom: '2px' }}>✆ {c.mobile}</div>}
                            {c.alternateNo && <div style={{ fontSize: '9px', color: '#888' }}>✆ {c.alternateNo} (Alt)</div>}
                        </div>
                    ) : null)}
                </div>

                {/* Tax Numbers */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                    {data.gstNo && (
                        <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '10px 14px' }}>
                            <div style={{ fontSize: '9px', color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>GST Number</div>
                            <div style={{ fontSize: '13px', fontWeight: 800, fontFamily: 'monospace', letterSpacing: '1px', color: '#1a1a1a' }}>{data.gstNo}</div>
                        </div>
                    )}
                    {data.panNo && (
                        <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '10px 14px' }}>
                            <div style={{ fontSize: '9px', color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>PAN Number</div>
                            <div style={{ fontSize: '13px', fontWeight: 800, fontFamily: 'monospace', letterSpacing: '1px', color: '#1a1a1a' }}>{data.panNo}</div>
                        </div>
                    )}
                </div>

                {/* Selected Sectors */}
                {data.selectedSectors?.length > 0 && (
                    <div style={{ marginBottom: '24px' }}>
                        <div style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#555', borderBottom: '1px solid #e5e7eb', paddingBottom: '4px', marginBottom: '10px' }}>
                            Selected Sectors
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {data.selectedSectors.map((s: string) => (
                                <span key={s} style={{ fontSize: '9px', fontWeight: 600, padding: '3px 10px', border: '1px solid #23471d', borderRadius: '20px', color: '#23471d' }}>{s}</span>
                            ))}
                        </div>
                    </div>
                )}
                {/* Footer */}
                <div style={{ borderTop: '2px solid #23471d', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <div style={{ fontSize: '10px', fontWeight: 800, color: '#23471d' }}>Namo Gange Trust Foundation</div>
                        <div style={{ fontSize: '8px', color: '#888', marginTop: '2px' }}>Health & Wellness Expo 2026 · New Delhi, India</div>
                    </div>
                    <div style={{ fontSize: '8px', color: '#aaa', textAlign: 'right' }}>
                        <div>This is a computer-generated document.</div>
                        <div>No signature required.</div>
                    </div>
                </div>

            </div>
        </div>
    );
}

/* ─── MAIN DASHBOARD ─── */
export default function ExhibitorDashboard() {
    const navigate = useNavigate();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('exhibitorToken');
        if (!token) { navigate('/exhibitor-login'); return; }
        fetch(`${API_URL}/exhibitor-auth/dashboard`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(r => r.json())
            .then(res => {
                if (res.success) setData(res.data);
                else {
                    toast.error(res.message);
                    localStorage.removeItem('exhibitorToken');
                    navigate('/exhibitor-login');
                }
            })
            .catch(() => toast.error('Failed to load dashboard.'))
            .finally(() => setLoading(false));
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('exhibitorToken');
        navigate('/exhibitor-login');
    };

    if (loading) return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center print:hidden">
            <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 rounded-full border-[3px] border-[#23471d]/20 border-t-[#23471d] animate-spin" />
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading Portal...</p>
            </div>
        </div>
    );

    if (!data) return null;

    const cur = data.currency === 'USD' ? '$' : '₹';
    const status = STATUS_CONFIG[data.status] || STATUS_CONFIG.pending;
    const StatusIcon = status.icon;
    const currentStep = status.step;
    const isRejected = data.status === 'rejected';
    const paid = data.amountPaid || 0;
    const total = data.participation?.total || 0;
    const balance = data.balanceAmount || 0;
    const paidPct = total > 0 ? Math.min(100, Math.round((paid / total) * 100)) : 0;
    const regDate = data.createdAt ? new Date(data.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';

    return (
        <>
            {/* ── PRINT DOCUMENT (only visible when printing) ── */}
            <PrintDocument data={data} />

            {/* ── SCREEN DASHBOARD (hidden when printing) ── */}
            <div className="min-h-screen bg-[#eef2f7] font-['Inter',sans-serif] print:hidden">

                {/* NAV */}
                <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
                    <div className="w-full px-6 xl:px-10 h-16 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#23471d] to-[#3a7a2e] flex items-center justify-center shadow">
                                <ShieldCheck size={17} className="text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-900 leading-none">{data.exhibitorName}</p>
                                <p className="text-[10px] text-slate-400 font-medium mt-0.5 uppercase tracking-widest">Exhibitor Portal · IHWE 2026</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => window.print()}
                                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-[#23471d] hover:bg-[#23471d]/5 rounded-lg transition-all border border-slate-200"
                            >
                                <Printer size={13} /> <span className="hidden sm:inline">Print / Export</span>
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all border border-slate-200"
                            >
                                <LogOut size={13} /> <span className="hidden sm:inline">Sign Out</span>
                            </button>
                        </div>
                    </div>
                </header>

                <main className="w-full px-6 xl:px-10 py-8 space-y-6">

                    {/* HERO BANNER */}
                    <div className="relative bg-gradient-to-br from-[#1a3516] via-[#23471d] to-[#2d5c24] rounded-2xl overflow-hidden">
                        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5" />
                        <div className="absolute bottom-0 right-32 w-40 h-40 rounded-full bg-[#d26019]/10" />
                        <div className="absolute top-6 right-56 w-20 h-20 rounded-full bg-white/5" />
                        <div className="relative z-10 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-green-300/80">Health & Wellness Expo</span>
                                    <span className="w-1 h-1 rounded-full bg-green-300/40" />
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-green-300/80">New Delhi 2026</span>
                                </div>
                                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{data.exhibitorName}</h1>
                                {data.fasciaName && data.fasciaName !== data.exhibitorName && (
                                    <p className="text-sm text-white/50 mt-0.5">Fascia: <span className="text-white/70 font-semibold">{data.fasciaName}</span></p>
                                )}
                                <div className="flex flex-wrap items-center gap-4 mt-3">
                                    <span className="flex items-center gap-1.5 text-xs text-white/60">
                                        <Hash size={11} /> <span className="font-mono font-bold text-white/80">{data._id.slice(-8).toUpperCase()}</span>
                                    </span>
                                    <span className="flex items-center gap-1.5 text-xs text-white/60">
                                        <Calendar size={11} /> Registered {regDate}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col items-start sm:items-end gap-3 shrink-0">
                                <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border ${status.bg} ${status.border}`}>
                                    <span className={`w-2 h-2 rounded-full ${status.dot} animate-pulse`} />
                                    <StatusIcon size={14} className={status.color} />
                                    <span className={`text-sm font-bold ${status.color}`}>{status.label}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-white/50">
                                    <MapPin size={11} />
                                    <span>Stall: <span className="font-bold text-white/80">{data.participation?.stallFor || data.participation?.stallNo || 'Pending'}</span></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PROGRESS TRACKER */}
                    {!isRejected && (
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Application Journey</p>
                            <div className="relative flex items-start">
                                <div className="absolute top-4 left-4 right-4 h-0.5 bg-slate-100" style={{ zIndex: 0 }} />
                                <div
                                    className="absolute top-4 left-4 h-0.5 bg-gradient-to-r from-[#23471d] to-[#4ade80] transition-all duration-700"
                                    style={{ zIndex: 1, width: currentStep > 0 ? `${Math.min(100, ((currentStep - 1) / (STEPS.length - 1)) * 100)}%` : '0%' }}
                                />
                                {STEPS.map((step, i) => {
                                    const stepNum = i + 1;
                                    const done = currentStep >= stepNum;
                                    const active = currentStep === stepNum;
                                    return (
                                        <div key={step.label} className="flex-1 flex flex-col items-center gap-2 relative z-10">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all
                                                ${done ? 'bg-[#23471d] border-[#23471d] text-white' : 'bg-white border-slate-200 text-slate-400'}
                                                ${active ? 'ring-4 ring-[#23471d]/15 scale-110' : ''}`}>
                                                {done && !active ? <CheckCircle size={14} /> : stepNum}
                                            </div>
                                            <div className="text-center hidden sm:block">
                                                <p className={`text-[10px] font-bold uppercase tracking-wide ${done ? 'text-[#23471d]' : 'text-slate-400'}`}>{step.label}</p>
                                                <p className="text-[9px] text-slate-400 mt-0.5">{step.sub}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* STAT CARDS */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { label: 'Stall Number', value: data.participation?.stallFor || data.participation?.stallNo || 'Pending', icon: MapPin,     iconCls: 'bg-slate-100 text-slate-600',    valCls: 'text-slate-900' },
                            { label: 'Total Amount', value: `${cur}${total.toLocaleString('en-IN')}`,                                 icon: TrendingUp, iconCls: 'bg-blue-50 text-blue-600',       valCls: 'text-slate-900' },
                            { label: 'Amount Paid',  value: `${cur}${paid.toLocaleString('en-IN')}`,                                  icon: Wallet,     iconCls: 'bg-emerald-50 text-emerald-600', valCls: 'text-emerald-700' },
                            { label: 'Balance Due',  value: `${cur}${balance.toLocaleString('en-IN')}`,                               icon: Receipt,    iconCls: balance > 0 ? 'bg-red-50 text-red-500' : 'bg-slate-100 text-slate-400', valCls: balance > 0 ? 'text-red-600' : 'text-slate-400' },
                        ].map(c => (
                            <div key={c.label} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                                <div className={`w-9 h-9 rounded-xl ${c.iconCls} flex items-center justify-center mb-3`}>
                                    <c.icon size={16} />
                                </div>
                                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">{c.label}</p>
                                <p className={`text-lg font-bold mt-0.5 ${c.valCls}`}>{c.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* PAYMENT PROGRESS */}
                    {total > 0 && (
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Payment Progress</p>
                                <span className="text-sm font-black text-[#23471d]">{paidPct}% Paid</span>
                            </div>
                            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full rounded-full bg-gradient-to-r from-[#23471d] to-[#4ade80] transition-all duration-700" style={{ width: `${paidPct}%` }} />
                            </div>
                            <div className="flex justify-between mt-2 text-[10px] text-slate-400 font-medium">
                                <span>Paid: <span className="text-emerald-600 font-bold">{cur}{paid.toLocaleString('en-IN')}</span></span>
                                <span>Balance: <span className={balance > 0 ? 'text-red-500 font-bold' : 'text-slate-400'}>{cur}{balance.toLocaleString('en-IN')}</span></span>
                                <span>Total: <span className="text-slate-700 font-bold">{cur}{total.toLocaleString('en-IN')}</span></span>
                            </div>
                        </div>
                    )}

                    {/* MAIN GRID */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* LEFT */}
                        <div className="space-y-6">
                            {/* Stall Details */}
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                                <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2 bg-slate-50/60">
                                    <Building2 size={13} className="text-[#23471d]" />
                                    <h3 className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">Stall Allocation</h3>
                                </div>
                                <div className="divide-y divide-slate-100">
                                    {[
                                        { label: 'Stall Number', value: data.participation?.stallFor || data.participation?.stallNo },
                                        { label: 'Stall Type',   value: data.participation?.stallType },
                                        { label: 'Category',     value: data.participation?.stallCategory },
                                        { label: 'Area',         value: data.participation?.stallSize ? `${data.participation.stallSize} SQM` : null },
                                        { label: 'Dimensions',   value: data.participation?.dimension },
                                        { label: 'Rate / SQM',   value: data.participation?.rate ? `${cur}${data.participation.rate.toLocaleString('en-IN')}` : null },
                                    ].map(row => (
                                        <div key={row.label} className="flex items-center justify-between px-5 py-3">
                                            <span className="text-xs text-slate-400 font-medium">{row.label}</span>
                                            <span className="text-xs font-semibold text-slate-800">{row.value || '—'}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Financial Ledger */}
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                                <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2 bg-[#d26019]/5">
                                    <CreditCard size={13} className="text-[#d26019]" />
                                    <h3 className="text-[11px] font-bold text-[#d26019] uppercase tracking-widest">Financial Ledger</h3>
                                </div>
                                <div className="p-5 space-y-3">
                                    <div className="flex justify-between text-xs"><span className="text-slate-500">Base Amount</span><span className="font-semibold text-slate-700">{cur}{(data.participation?.amount || 0).toLocaleString('en-IN')}</span></div>
                                    {data.participation?.discount > 0 && (
                                        <div className="flex justify-between text-xs"><span className="text-slate-500">Discount</span><span className="font-semibold text-emerald-600">−{cur}{data.participation.discount.toLocaleString('en-IN')}</span></div>
                                    )}
                                    <div className="flex justify-between text-xs"><span className="text-slate-500">GST ({data.participation?.gstPercent || 18}%)</span><span className="font-semibold text-slate-700">+{cur}{((data.participation?.amount || 0) * ((data.participation?.gstPercent || 18) / 100)).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span></div>
                                    <div className="pt-3 border-t border-dashed border-slate-200 flex justify-between">
                                        <span className="text-sm font-bold text-slate-800">Total</span>
                                        <span className="text-sm font-black text-slate-900">{cur}{total.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="flex justify-between text-xs"><span className="text-slate-500">Amount Paid</span><span className="font-bold text-emerald-600">{cur}{paid.toLocaleString('en-IN')}</span></div>
                                    <div className="flex justify-between text-xs"><span className="text-slate-500">Balance Due</span><span className={`font-bold ${balance > 0 ? 'text-red-500' : 'text-slate-400'}`}>{cur}{balance.toLocaleString('en-IN')}</span></div>
                                </div>
                                {data.receiptUrl && (
                                    <div className="px-5 pb-5">
                                        <a href={data.receiptUrl} target="_blank" rel="noreferrer"
                                            className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-semibold transition-all">
                                            <Download size={13} /> Download Payment Receipt
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Company Info */}
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                                <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2 bg-slate-50/60">
                                    <FileText size={13} className="text-slate-500" />
                                    <h3 className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">Company Information</h3>
                                </div>
                                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <InfoRow label="Company / Firm Name" value={data.exhibitorName} />
                                    <InfoRow label="Fascia / Brand Name"  value={data.fasciaName || data.exhibitorName} />
                                    <InfoRow label="Industry Sector"      value={data.industrySector} />
                                    <InfoRow label="Nature of Business"   value={data.natureOfBusiness} />
                                    <InfoRow label="Type of Business"     value={data.typeOfBusiness} />
                                    <InfoRow label="Website"              value={data.website} />
                                    <InfoRow label="GST Number"           value={data.gstNo} mono />
                                    <InfoRow label="PAN Number"           value={data.panNo} mono />
                                    <InfoRow label="Landline"             value={data.landlineNo} />
                                    <InfoRow label="Registration Date"    value={regDate} />
                                    <div className="sm:col-span-2 pt-2 border-t border-slate-100">
                                        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5"><MapPin size={10} /> Registered Address</p>
                                        <p className="text-sm font-semibold text-slate-800">{data.address || '—'}</p>
                                        <p className="text-xs text-slate-500 mt-0.5">{[data.city, data.state, data.country, data.pincode].filter(Boolean).join(', ')}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Contacts */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                                    <div className="px-5 py-4 border-b border-slate-100 bg-[#23471d]/5 flex items-center gap-2">
                                        <User size={13} className="text-[#23471d]" />
                                        <h3 className="text-[11px] font-bold text-[#23471d] uppercase tracking-widest">Primary Contact</h3>
                                    </div>
                                    <div className="p-5 space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-[#23471d]/10 flex items-center justify-center shrink-0"><User size={16} className="text-[#23471d]" /></div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900">{[data.contact1?.title, data.contact1?.firstName, data.contact1?.lastName].filter(Boolean).join(' ') || '—'}</p>
                                                <p className="text-xs text-slate-500">{data.contact1?.designation}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-2 pt-1">
                                            <div className="flex items-center gap-2 text-xs text-slate-600"><Mail size={11} className="text-slate-400 shrink-0" /><span className="truncate">{data.contact1?.email || '—'}</span></div>
                                            <div className="flex items-center gap-2 text-xs text-slate-600"><Phone size={11} className="text-slate-400 shrink-0" /><span>{data.contact1?.mobile || '—'}</span></div>
                                            {data.contact1?.alternateNo && <div className="flex items-center gap-2 text-xs text-slate-500"><Phone size={11} className="text-slate-300 shrink-0" /><span>{data.contact1.alternateNo}</span></div>}
                                        </div>
                                    </div>
                                </div>

                                {data.contact2?.firstName ? (
                                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                                        <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/60 flex items-center gap-2">
                                            <User size={13} className="text-slate-500" />
                                            <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Secondary Contact</h3>
                                        </div>
                                        <div className="p-5 space-y-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0"><User size={16} className="text-slate-500" /></div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-900">{[data.contact2?.title, data.contact2?.firstName, data.contact2?.lastName].filter(Boolean).join(' ')}</p>
                                                    <p className="text-xs text-slate-500">{data.contact2?.designation}</p>
                                                </div>
                                            </div>
                                            <div className="space-y-2 pt-1">
                                                {data.contact2?.email && <div className="flex items-center gap-2 text-xs text-slate-600"><Mail size={11} className="text-slate-400 shrink-0" /><span className="truncate">{data.contact2.email}</span></div>}
                                                {data.contact2?.mobile && <div className="flex items-center gap-2 text-xs text-slate-600"><Phone size={11} className="text-slate-400 shrink-0" /><span>{data.contact2.mobile}</span></div>}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-slate-50 rounded-2xl border border-dashed border-slate-200 flex items-center justify-center p-8">
                                        <p className="text-xs text-slate-400 font-medium text-center">No secondary contact<br />registered</p>
                                    </div>
                                )}
                            </div>

                            {/* Sectors */}
                            {data.selectedSectors?.length > 0 && (
                                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                                    <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2 bg-slate-50/60">
                                        <Briefcase size={13} className="text-slate-500" />
                                        <h3 className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">Selected Sectors</h3>
                                    </div>
                                    <div className="p-5 flex flex-wrap gap-2">
                                        {data.selectedSectors.map((s: string) => (
                                            <span key={s} className="px-3 py-1 bg-[#23471d]/8 text-[#23471d] text-xs font-semibold rounded-full border border-[#23471d]/15">{s}</span>
                                        ))}
                                        {data.otherSector && <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full border border-slate-200">{data.otherSector}</span>}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="text-center py-6">
                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">© 2026 Namo Gange Trust Foundation · Health & Wellness Expo</p>
                    </div>
                </main>
            </div>
        </>
    );
}
