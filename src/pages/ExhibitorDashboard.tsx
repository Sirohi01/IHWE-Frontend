import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    LogOut, MapPin, CreditCard, Download, FileText, CheckCircle,
    Building2, User, ShieldCheck, Mail, Phone, Wallet, Receipt,
    Printer, BadgeCheck, XCircle, Hourglass, TrendingUp, Calendar,
    Hash, Briefcase, KeyRound, Eye, EyeOff, X, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
        <div className="flex flex-col gap-1 pr-4 border-l-2 border-slate-100 pl-4 py-1.5 hover:border-[#23471d]/40 transition-all group">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 group-hover:text-slate-500 transition-colors">{label}</span>
            <span className={`text-[13px] font-black text-slate-900 leading-snug break-words ${mono ? 'font-mono tracking-[0.05em]' : ''}`}>
                {value || <span className="text-slate-300 font-normal italic uppercase text-[10px] tracking-widest">Not Provided</span>}
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
    const [allRegistrations, setAllRegistrations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'dashboard' | 'profile' | 'invoices' | 'payments' | 'exhibitions'>('dashboard');
    const [showChangePwd, setShowChangePwd] = useState(false);
    const [pwdForm, setPwdForm] = useState({ current: '', newPwd: '', confirm: '' });
    const [pwdLoading, setPwdLoading] = useState(false);
    const [showPwd, setShowPwd] = useState({ current: false, newPwd: false });

    const fetchDashboard = async (regId?: string) => {
        const token = localStorage.getItem('exhibitorToken');
        if (!token) { navigate('/exhibitor-login'); return; }
        
        let url = `${API_URL}/exhibitor-auth/dashboard`;
        if (regId) url += `?id=${regId}`;

        try {
            const r = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
            const res = await r.json();
            if (res.success) {
                setData(res.data);
                if (res.allRegistrations) setAllRegistrations(res.allRegistrations);
            } else {
                toast.error(res.message);
                if (res.message === 'Token expired or invalid') {
                    localStorage.removeItem('exhibitorToken');
                    navigate('/exhibitor-login');
                }
            }
        } catch {
            toast.error('Failed to load dashboard.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('exhibitorToken');
        navigate('/exhibitor-login');
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (pwdForm.newPwd !== pwdForm.confirm) { toast.error('New passwords do not match'); return; }
        if (pwdForm.newPwd.length < 6) { toast.error('Password must be at least 6 characters'); return; }
        setPwdLoading(true);
        try {
            const res = await fetch(`${API_URL}/exhibitor-auth/change-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('exhibitorToken')}` },
                body: JSON.stringify({ currentPassword: pwdForm.current, newPassword: pwdForm.newPwd })
            });
            const result = await res.json();
            if (result.success) {
                toast.success('Password changed successfully');
                setShowChangePwd(false);
                setPwdForm({ current: '', newPwd: '', confirm: '' });
            } else {
                toast.error(result.message);
            }
        } catch { toast.error('Failed to change password'); }
        finally { setPwdLoading(false); }
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
                <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
                    <div className="w-full px-4 sm:px-6 xl:px-10 h-20 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#23471d] to-[#3a7a2e] flex items-center justify-center shadow-lg shadow-green-900/30">
                                <ShieldCheck size={26} className="text-white" />
                            </div>
                            <div>
                                <p className="text-base font-black text-slate-900 tracking-tight leading-none uppercase tracking-[0.1em]">Namo Gange Trust Foundation</p>
                                <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-[0.25em]">
                                    {data.eventId?.name || 'IHWE 2026'} · Exhibitor Command Center
                                </p>
                            </div>
                        </div>
                        
                        <div className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-2xl mx-8">
                            {[
                                { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
                                { id: 'profile', label: 'Profile', icon: User },
                                { id: 'invoices', label: 'Invoices', icon: FileText },
                                { id: 'payments', label: 'Payments', icon: Wallet },
                                { id: 'exhibitions', label: 'My Events', icon: Building2 },
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-white text-[#23471d] shadow-md shadow-slate-200/50 scale-[1.02]' : 'text-slate-500 hover:text-slate-800 hover:bg-white/40'}`}
                                >
                                    <tab.icon size={14} className={activeTab === tab.id ? 'text-[#23471d]' : 'text-slate-400'} />
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setShowChangePwd(true)}
                                className="flex items-center gap-2 px-4 py-2.5 text-xs font-black uppercase tracking-widest text-slate-600 hover:text-[#23471d] hover:bg-white rounded-xl transition-all border border-slate-200 shadow-sm hover:shadow-md"
                            >
                                <KeyRound size={14} /> <span className="hidden xl:inline">Security</span>
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2.5 text-xs font-black uppercase tracking-widest text-white bg-slate-900 hover:bg-black rounded-xl transition-all shadow-lg shadow-slate-900/20 hover:-translate-y-0.5"
                            >
                                <LogOut size={14} /> <span className="hidden xl:inline">Logout</span>
                            </button>
                        </div>
                    </div>
                    {/* Mobile Tabs */}
                    <div className="lg:hidden flex overflow-x-auto bg-white/50 backdrop-blur-sm border-t border-slate-100 no-scrollbar">
                        {[
                            { id: 'dashboard', label: 'Home', icon: TrendingUp },
                            { id: 'profile', label: 'Profile', icon: User },
                            { id: 'invoices', label: 'Invoices', icon: FileText },
                            { id: 'payments', label: 'Pays', icon: Wallet },
                            { id: 'exhibitions', label: 'Events', icon: Building2 },
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex-1 flex flex-col items-center gap-1.5 px-4 py-4 min-w-[80px] text-[10px] font-black uppercase tracking-widest transition-all border-b-4 ${activeTab === tab.id ? 'border-[#23471d] text-[#23471d] bg-[#23471d]/5' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                            >
                                <tab.icon size={16} />
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </header>

                <main className="w-full px-6 xl:px-10 py-8 space-y-6">
                    <AnimatePresence mode="wait">
                        {activeTab === 'dashboard' && (
                            <motion.div
                                key="dashboard"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-6"
                            >
                                {/* HERO BANNER */}
                                <div className="relative bg-gradient-to-br from-[#1a3516] via-[#23471d] to-[#2d5c24] rounded-2xl overflow-hidden shadow-lg">
                                    <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5" />
                                    <div className="absolute bottom-0 right-32 w-40 h-40 rounded-full bg-[#d26019]/10" />
                                    <div className="relative z-10 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-green-300/80">{data.eventId?.name || 'Health & Wellness Expo'}</span>
                                                <span className="w-1 h-1 rounded-full bg-green-300/40" />
                                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-green-300/80">New Delhi 2026</span>
                                            </div>
                                            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{data.exhibitorName}</h1>
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

                                {/* Progress */}
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
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* Quick Stats */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {[
                                        { label: 'Total Amount', value: `${cur}${total.toLocaleString('en-IN')}`, icon: TrendingUp, cls: 'text-blue-600', iconBg: 'bg-indigo-500', bg: 'bg-indigo-50', border: 'border-indigo-200', desc: 'Net contract value' },
                                        { label: 'Amount Paid', value: `${cur}${paid.toLocaleString('en-IN')}`, icon: Wallet, cls: 'text-emerald-600', iconBg: 'bg-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200', desc: 'Successful transactions' },
                                        { label: 'Balance Due', value: `${cur}${balance.toLocaleString('en-IN')}`, icon: Receipt, cls: balance > 0 ? 'text-rose-600' : 'text-slate-400', iconBg: balance > 0 ? 'bg-rose-500' : 'bg-slate-400', bg: balance > 0 ? 'bg-rose-50' : 'bg-slate-50', border: balance > 0 ? 'border-rose-200' : 'border-slate-200', desc: 'Outstanding total' },
                                        { label: 'Stall Area', value: `${data.participation?.stallSize || 0} SQM`, icon: Building2, cls: 'text-amber-600', iconBg: 'bg-amber-500', bg: 'bg-amber-50', border: 'border-amber-200', desc: 'Allocated booth size' },
                                    ].map((c, i) => (
                                        <div key={c.label} className="group relative bg-white min-h-[160px] p-6 border-2 border-slate-200/60 transition-all duration-500 shadow-[0_6px_14px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] overflow-hidden rounded-3xl">
                                            {/* Decorative Background Elements */}
                                            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                                                <div className={`absolute top-0 right-0 w-32 h-32 ${c.iconBg} opacity-[0.03] rounded-full -mr-10 -mt-10 transition-all duration-1000 ease-out group-hover:-mr-5 group-hover:-mt-5`} />
                                                <div className={`absolute bottom-0 left-0 w-20 h-20 ${c.iconBg} opacity-[0.03] rounded-full -ml-8 -mb-8 transition-all duration-1000 ease-out group-hover:-ml-4 group-hover:-mb-4`} />
                                            </div>

                                            <div className="relative z-10">
                                                <div className="flex items-center justify-between mb-5">
                                                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${c.iconBg} ${c.iconBg.replace('500', '600')} flex items-center justify-center shadow-lg shadow-${c.iconBg.split('-')[1]}-500/10`}>
                                                        <c.icon size={20} className="text-white" strokeWidth={2.5} />
                                                    </div>
                                                    <span className="text-[10px] font-black text-slate-200 uppercase tracking-[0.2em]">0{i+1}</span>
                                                </div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5">{c.label}</p>
                                                <h3 className={`text-2xl sm:text-3xl font-black ${c.cls} leading-none mb-3 tabular-nums drop-shadow-sm`}>{c.value}</h3>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest opacity-60 text-ellipsis truncate">{c.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Main Summary Grid */}
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    <div className="lg:col-span-2 space-y-6">
                                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                                            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
                                                <div className="flex items-center gap-2">
                                                    <FileText size={13} className="text-slate-500" />
                                                    <h3 className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">Company Snapshot</h3>
                                                </div>
                                                <button onClick={() => setActiveTab('profile')} className="text-[10px] font-bold text-[#23471d] hover:underline">View Full Profile</button>
                                            </div>
                                            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                                                <InfoRow label="Company Name" value={data.exhibitorName} />
                                                <InfoRow label="Industry Sector" value={data.industrySector} />
                                                <InfoRow label="Contact Person" value={`${data.contact1?.firstName} ${data.contact1?.lastName}`} />
                                                <InfoRow label="Email" value={data.contact1?.email} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 text-center space-y-4">
                                            <div className="w-16 h-16 bg-[#23471d]/5 rounded-full flex items-center justify-center mx-auto text-[#23471d]"><Printer size={24} /></div>
                                            <h4 className="text-sm font-bold text-slate-800">Registration Certificate</h4>
                                            <p className="text-xs text-slate-500">Download your official booth confirmed letter and registration document.</p>
                                            <button onClick={() => window.print()} className="w-full py-2.5 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-bold transition-all">Print / Download</button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'profile' && (
                            <motion.div
                                key="profile"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                className="space-y-8"
                            >
                                <div className="bg-white rounded-[2rem] border-2 border-slate-200/60 shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden">
                                    <div className="px-8 sm:px-12 py-10 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                                        <div className="flex items-center gap-5">
                                            <div className="w-16 h-16 rounded-[1.25rem] bg-[#23471d] flex items-center justify-center text-white shadow-xl shadow-green-900/20">
                                                <User size={32} strokeWidth={2.5} />
                                            </div>
                                            <div>
                                                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Exhibitor Profile</h2>
                                                <div className="flex items-center gap-2 mt-1.5 font-bold text-slate-400 text-[10px] uppercase tracking-[0.2em]">
                                                    <ShieldCheck size={12} /> Verified Enterprise Identity
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="px-5 py-2.5 rounded-2xl bg-green-50 text-green-700 text-[10px] font-black uppercase tracking-widest border border-green-100">Profile Active</span>
                                        </div>
                                    </div>
                                    <div className="p-8 sm:p-12 space-y-16">
                                        {/* Executive Summary Cards */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                            {[
                                                { label: 'Exhibitor Hub', value: data.exhibitorName, icon: Building2, col: 'indigo' },
                                                { label: 'Business Type', value: data.typeOfBusiness, icon: Briefcase, col: 'blue' },
                                                { label: 'Fascia Name', value: data.fasciaName, icon: User, col: 'amber' },
                                                { label: 'Global Rank', value: 'Prime Exhibitor', icon: BadgeCheck, col: 'emerald' },
                                            ].map(i => (
                                                <div key={i.label} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-xl hover:shadow-slate-200/40 transition-all cursor-default">
                                                    <div className={`w-8 h-8 rounded-lg bg-${i.col}-500/10 text-${i.col}-600 flex items-center justify-center mb-3 group-hover:bg-${i.col}-500 group-hover:text-white transition-all`}>
                                                        <i.icon size={16} />
                                                    </div>
                                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{i.label}</p>
                                                    <p className="text-sm font-black text-slate-800 truncate mt-1">{i.value || 'N/A'}</p>
                                                </div>
                                            ))}
                                        </div>

                                        <section>
                                            <div className="flex items-center gap-4 mb-10">
                                                <div className="h-0.5 flex-1 bg-gradient-to-r from-slate-100 to-transparent"></div>
                                                <h3 className="text-[11px] font-black text-[#23471d] uppercase tracking-[0.3em] whitespace-nowrap bg-green-50/50 px-4 py-2 rounded-full border border-green-100/50">Core Identity</h3>
                                                <div className="h-0.5 flex-1 bg-gradient-to-l from-slate-100 to-transparent"></div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                                <InfoRow label="Official Company Name" value={data.exhibitorName} />
                                                <InfoRow label="Fascia (Stall Name)" value={data.fasciaName} />
                                                <InfoRow label="Industry Sector" value={data.industrySector} />
                                                <InfoRow label="Nature of Business" value={data.natureOfBusiness} />
                                                <InfoRow label="Business Type" value={data.typeOfBusiness} />
                                                <InfoRow label="Website" value={data.website} />
                                                <InfoRow label="GSTIN" value={data.gstNo} mono />
                                                <InfoRow label="PAN" value={data.panNo} mono />
                                            </div>
                                        </section>

                                        <section className="pt-10 border-t border-slate-100">
                                            <h3 className="text-[10px] font-black text-[#23471d] uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                                <div className="w-4 h-px bg-[#23471d]"></div> Contact Information
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">Primary Contact</p>
                                                    <div className="space-y-4">
                                                        <InfoRow label="Name" value={`${data.contact1?.title} ${data.contact1?.firstName} ${data.contact1?.lastName}`} />
                                                        <InfoRow label="Designation" value={data.contact1?.designation} />
                                                        <InfoRow label="Email Address" value={data.contact1?.email} />
                                                        <InfoRow label="Phone Number" value={data.contact1?.mobile} />
                                                    </div>
                                                </div>
                                                {data.contact2?.firstName && (
                                                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">Secondary Contact</p>
                                                        <div className="space-y-4">
                                                            <InfoRow label="Name" value={`${data.contact2?.title} ${data.contact2?.firstName} ${data.contact2?.lastName}`} />
                                                            <InfoRow label="Designation" value={data.contact2?.designation} />
                                                            <InfoRow label="Email Address" value={data.contact2?.email} />
                                                            <InfoRow label="Phone Number" value={data.contact2?.mobile} />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </section>

                                        <section className="pt-10 border-t border-slate-100">
                                            <h3 className="text-[10px] font-black text-[#23471d] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                                <div className="w-4 h-px bg-[#23471d]"></div> Registered Address
                                            </h3>
                                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                                <p className="text-sm font-semibold text-slate-800 leading-relaxed">{data.address}</p>
                                                <p className="text-xs text-slate-500 mt-2">{[data.city, data.state, data.country, data.pincode].filter(Boolean).join(', ')}</p>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'invoices' && (
                            <motion.div
                                key="invoices"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 30 }}
                                className="space-y-8"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="md:col-span-2 bg-white rounded-[2rem] border-2 border-slate-200/60 shadow-[0_20px_50px_rgba(0,0,0,0.03)] overflow-hidden">
                                        <div className="px-8 py-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-900/20">
                                                    <FileText size={24} strokeWidth={2.5} />
                                                </div>
                                                <div>
                                                    <h2 className="text-xl font-black text-slate-900 tracking-tight">Billing & Receipts</h2>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Tax Documents Hub</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-0">
                                            <div className="overflow-x-auto no-scrollbar">
                                                <table className="w-full text-left border-collapse">
                                                    <thead>
                                                        <tr className="bg-slate-50/50">
                                                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Document Type</th>
                                                            <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Issued On</th>
                                                            <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 text-right">Amount</th>
                                                            <th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-slate-50">
                                                        <tr className="group hover:bg-slate-50/50 transition-all cursor-pointer">
                                                            <td className="px-8 py-6">
                                                                <div className="flex items-center gap-4">
                                                                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-[#23471d] group-hover:text-white transition-all"><FileText size={18} /></div>
                                                                    <div>
                                                                        <p className="text-sm font-black text-slate-800">Registration Receipt</p>
                                                                        <p className="text-[10px] font-black text-slate-400 uppercase">#{data._id.slice(-8).toUpperCase()}-RC</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-6 text-sm text-slate-500 font-bold uppercase tracking-widest tabular-nums">{regDate}</td>
                                                            <td className="px-6 py-6 text-sm font-black text-slate-900 text-right tabular-nums">{cur}{total.toLocaleString()}</td>
                                                            <td className="px-8 py-6 text-right">
                                                                <div className="flex flex-col items-end gap-3">
                                                                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.1em] border-2 ${paid >= total ? 'bg-green-50 text-green-700 border-green-100' : paid > 0 ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-rose-50 text-rose-700 border-rose-100'}`}>
                                                                        {paid >= total ? 'Settled' : paid > 0 ? 'Partial' : 'Pending'}
                                                                    </span>
                                                                    <button onClick={() => window.print()} className="flex items-center gap-1.5 text-[10px] font-black text-blue-600 hover:text-blue-800 uppercase tracking-widest group">
                                                                        <Download size={14} className="group-hover:-translate-y-0.5 transition-all" /> <span>Download PDF</span>
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            {paid === 0 && (
                                                <div className="p-12 text-center bg-slate-50/30">
                                                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                                                        <Hourglass size={24} />
                                                    </div>
                                                    <p className="text-xs text-slate-400 font-black uppercase tracking-widest">Awaiting Initial Payment</p>
                                                    <p className="text-[10px] text-slate-400 mt-1 italic">Receipts are generated instantly after payment verification.</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="bg-[#23471d] rounded-[2rem] p-8 text-white relative overflow-hidden flex flex-col justify-between shadow-2xl shadow-green-900/40">
                                        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl opacity-50"></div>
                                        <div className="relative z-10">
                                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-8 border-b border-white/10 pb-4">Financial Insight</p>
                                            <div className="space-y-6">
                                                <div>
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Contracted Volume</p>
                                                    <h4 className="text-3xl font-black tabular-nums tracking-tighter">{cur}{total.toLocaleString()}</h4>
                                                </div>
                                                <div className="pt-6 border-t border-white/10">
                                                    <div className="flex justify-between items-end">
                                                        <div>
                                                            <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Realized Funds</p>
                                                            <p className="text-xl font-black tabular-nums">{cur}{paid.toLocaleString()}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-xs font-black text-green-400">{paidPct}%</p>
                                                            <p className="text-[9px] font-black text-white/30 uppercase">Settled</p>
                                                        </div>
                                                    </div>
                                                    <div className="w-full h-1.5 bg-white/10 rounded-full mt-3 overflow-hidden">
                                                        <motion.div 
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${paidPct}%` }}
                                                            className="h-full bg-green-400 rounded-full"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'payments' && (
                            <motion.div
                                key="payments"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="space-y-8"
                            >
                                <div className="bg-white rounded-[2.5rem] border-2 border-slate-200/60 shadow-[0_30px_70px_rgba(0,0,0,0.06)] overflow-hidden">
                                    <div className="px-8 sm:px-12 py-10 bg-gradient-to-br from-slate-50 to-white border-b border-slate-100">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                                            <div className="flex items-center gap-5">
                                                <div className="w-16 h-16 rounded-3xl bg-amber-500 flex items-center justify-center text-white shadow-xl shadow-amber-900/20">
                                                    <Wallet size={32} strokeWidth={2.5} />
                                                </div>
                                                <div>
                                                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Payment Ledger</h2>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Immutable Transaction History</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 px-6 py-4 rounded-[1.5rem] bg-indigo-50 border-2 border-indigo-100">
                                                <TrendingUp size={16} className="text-indigo-600" />
                                                <span className="text-xl font-black text-indigo-700 tabular-nums">{paidPct}% Total Compliance</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-8 sm:p-12">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                                            <div className="p-8 rounded-[2rem] bg-indigo-50 border-2 border-indigo-100/50 group hover:scale-[1.02] transition-all">
                                                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-2">Net Obligation</p>
                                                <p className="text-3xl font-black text-indigo-700 tabular-nums">{cur}{total.toLocaleString()}</p>
                                            </div>
                                            <div className="p-8 rounded-[2rem] bg-emerald-50 border-2 border-emerald-100/50 group hover:scale-[1.02] transition-all shadow-lg shadow-emerald-900/5">
                                                <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] mb-2">Authorized Payments</p>
                                                <p className="text-3xl font-black text-emerald-700 tabular-nums">{cur}{paid.toLocaleString()}</p>
                                            </div>
                                            <div className="p-8 rounded-[2rem] bg-rose-50 border-2 border-rose-100/50 group hover:scale-[1.02] transition-all">
                                                <p className="text-[10px] font-black text-rose-400 uppercase tracking-[0.2em] mb-2">Residual Dues</p>
                                                <p className="text-3xl font-black text-rose-600 tabular-nums">{cur}{balance.toLocaleString()}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 mb-10">
                                            <div className="h-[1px] flex-1 bg-slate-100"></div>
                                            <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Chronological Timeline</p>
                                            <div className="h-[1px] flex-1 bg-slate-100"></div>
                                        </div>
                                        
                                        <div className="space-y-6 relative before:absolute before:left-[24px] before:top-8 before:bottom-8 before:w-[2px] before:bg-slate-100">
                                            {paid > 0 ? (
                                                <div className="relative pl-16 py-4 group">
                                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[50px] h-[50px] rounded-2xl bg-green-100 border-2 border-green-200 flex items-center justify-center text-green-600 shadow-lg group-hover:scale-110 transition-transform z-10">
                                                        <CheckCircle size={24} strokeWidth={2.5} />
                                                    </div>
                                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-7 rounded-[1.75rem] border-2 border-slate-100 bg-white hover:bg-slate-50/50 hover:border-green-100 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.02)] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)]">
                                                        <div>
                                                            <h5 className="text-lg font-black text-slate-900 tracking-tight mb-1">Registration Capital Release</h5>
                                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{regDate} · Payment via Secure Online Gateway</p>
                                                        </div>
                                                        <div className="text-left sm:text-right mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-0 border-slate-50">
                                                            <p className="text-2xl font-black text-[#23471d] tabular-nums tracking-tighter">+{cur}{paid.toLocaleString()}</p>
                                                            <p className="text-[10px] font-mono font-bold text-slate-300 uppercase mt-1">Ref ID: {data.paymentId || 'GWAY-X001'}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="text-center py-24 border-2 border-dashed border-slate-100 rounded-[2.5rem] bg-slate-50/30">
                                                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200 shadow-sm">
                                                        <Wallet size={32} />
                                                    </div>
                                                    <p className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Transaction Ledger Empty</p>
                                                    <p className="text-[10px] text-slate-400 mt-2 font-bold italic">No financial movements detected on this account.</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'exhibitions' && (
                            <motion.div
                                key="exhibitions"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                                    <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-[#23471d]"><Building2 size={24} /></div>
                                            <div>
                                                <h2 className="text-xl font-black text-slate-900">My Participation</h2>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Switch Between Registered Events</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {allRegistrations.map((reg: any) => (
                                                <div 
                                                    key={reg._id} 
                                                    onClick={() => {
                                                        if (reg._id !== data._id) {
                                                            setLoading(true);
                                                            fetchDashboard(reg._id);
                                                            setActiveTab('dashboard');
                                                        }
                                                    }}
                                                    className={`cursor-pointer group relative p-6 rounded-3xl border-2 transition-all duration-300 ${reg._id === data._id ? 'border-[#23471d] bg-[#23471d]/5 shadow-lg' : 'border-slate-100 hover:border-[#23471d]/30 hover:bg-slate-50'}`}
                                                >
                                                    {reg._id === data._id && (
                                                        <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#23471d] text-white rounded-full flex items-center justify-center shadow-lg border-4 border-white"><CheckCircle size={14} /></div>
                                                    )}
                                                    <p className="text-[10px] font-black text-slate-400 group-hover:text-[#23471d] uppercase tracking-widest mb-3 transition-colors">{reg.eventId?.name || 'Annual Expo'}</p>
                                                    <h3 className="text-lg font-black text-slate-900 leading-tight mb-4">{reg.exhibitorName}</h3>
                                                    <div className="space-y-3">
                                                        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                                                            <MapPin size={12} className="text-slate-400" /> Stall: {reg.participation?.stallFor || 'TBD'}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                                                            <Calendar size={12} className="text-slate-400" /> {new Date(reg.eventId?.startDate).getFullYear()}
                                                        </div>
                                                    </div>
                                                    <div className="mt-6 pt-4 border-t border-slate-100/50 flex justify-between items-center">
                                                        <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${STATUS_CONFIG[reg.status]?.bg || 'bg-slate-100'} ${STATUS_CONFIG[reg.status]?.color || 'text-slate-500'}`}>
                                                            {STATUS_CONFIG[reg.status]?.label || reg.status}
                                                        </span>
                                                        {reg._id !== data._id && <ArrowRight size={14} className="text-slate-300 group-hover:text-[#23471d] group-hover:translate-x-1 transition-all" />}
                                                    </div>
                                                </div>
                                            ))}
                                            <Link 
                                                to="/book-a-stand"
                                                className="flex flex-col items-center justify-center p-6 rounded-3xl border-2 border-dashed border-slate-200 hover:border-[#23471d] hover:bg-[#23471d]/5 transition-all group"
                                            >
                                                <div className="w-12 h-12 rounded-full bg-slate-50 group-hover:bg-[#23471d]/10 flex items-center justify-center text-slate-300 group-hover:text-[#23471d] transition-all mb-3"><ArrowRight className="-rotate-45" size={20} /></div>
                                                <p className="text-xs font-black text-slate-400 group-hover:text-[#23471d] uppercase tracking-widest">Register New Event</p>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>

                <div className="text-center py-10 opacity-50">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">© 2026 Namo Gange Trust Foundation · Global Healthcare Excellence</p>
                </div>
            </div>

            {/* ── CHANGE PASSWORD MODAL ── */}
            {showChangePwd && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 print:hidden">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                            <div className="flex items-center gap-2">
                                <KeyRound size={16} className="text-[#23471d]" />
                                <h3 className="text-sm font-bold text-slate-800">Change Password</h3>
                            </div>
                            <button onClick={() => setShowChangePwd(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                                <X size={18} />
                            </button>
                        </div>
                        <form onSubmit={handleChangePassword} className="p-6 space-y-4">
                            {[
                                { key: 'current', label: 'Current Password', showKey: 'current' as const },
                                { key: 'newPwd',  label: 'New Password',     showKey: 'newPwd' as const },
                                { key: 'confirm', label: 'Confirm New Password', showKey: 'newPwd' as const },
                            ].map(field => (
                                <div key={field.key}>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">{field.label}</label>
                                    <div className="relative">
                                        <input
                                            type={showPwd[field.showKey] ? 'text' : 'password'}
                                            required
                                            value={(pwdForm as any)[field.key]}
                                            onChange={e => setPwdForm(p => ({ ...p, [field.key]: e.target.value }))}
                                            className="w-full px-4 py-2.5 pr-10 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#23471d] focus:ring-2 focus:ring-[#23471d]/10 transition-all"
                                            placeholder="••••••••"
                                        />
                                        {field.key !== 'confirm' && (
                                            <button type="button" onClick={() => setShowPwd(p => ({ ...p, [field.showKey]: !p[field.showKey] }))}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                                {showPwd[field.showKey] ? <EyeOff size={14} /> : <Eye size={14} />}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setShowChangePwd(false)}
                                    className="flex-1 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-all">
                                    Cancel
                                </button>
                                <button type="submit" disabled={pwdLoading}
                                    className="flex-1 py-2.5 bg-[#23471d] hover:bg-[#1a3516] text-white rounded-xl text-xs font-semibold transition-all disabled:opacity-50">
                                    {pwdLoading ? 'Saving...' : 'Update Password'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
