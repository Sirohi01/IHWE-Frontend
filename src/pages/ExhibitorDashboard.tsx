import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    LogOut, MapPin, CreditCard, Download, FileText, CheckCircle,
    Building2, User, ShieldCheck, Mail, Phone, Wallet, Receipt,
    Printer, BadgeCheck, XCircle, Hourglass, TrendingUp, Calendar,
    Hash, Briefcase, KeyRound, Eye, EyeOff, X, ArrowRight,
    Award, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { API_URL, SERVER_URL, settingsApi } from '@/lib/api';

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string; dot: string; icon: any; step: number }> = {
    pending: { label: 'Under Review', color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200', dot: 'bg-amber-400', icon: Hourglass, step: 1 },
    approved: { label: 'Approved', color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200', dot: 'bg-blue-500', icon: BadgeCheck, step: 2 },
    'advance-paid': { label: 'Advance Paid', color: 'text-violet-700', bg: 'bg-violet-50', border: 'border-violet-200', dot: 'bg-violet-500', icon: CreditCard, step: 3 },
    paid: { label: 'Fully Paid', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', dot: 'bg-emerald-500', icon: CheckCircle, step: 4 },
    confirmed: { label: 'Confirmed', color: 'text-green-800', bg: 'bg-green-50', border: 'border-green-300', dot: 'bg-green-600', icon: ShieldCheck, step: 5 },
    rejected: { label: 'Rejected', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200', dot: 'bg-red-500', icon: XCircle, step: 0 },
};

const STEPS = [
    { label: 'Submitted', sub: 'Application received' },
    { label: 'Approved', sub: 'Admin verified' },
    { label: 'Advance Paid', sub: 'Partial payment' },
    { label: 'Fully Paid', sub: 'Payment complete' },
    { label: 'Confirmed', sub: 'Stall confirmed' },
];

function InfoRow({ label, value, mono = false, icon: Icon }: { label: string; value?: string | null; mono?: boolean; icon?: any }) {
    return (
        <div className="flex items-start gap-3.5 p-4 rounded-2xl border border-slate-100 bg-white/50 hover:bg-white hover:border-[#23471d]/20 hover:shadow-sm transition-all group">
            {Icon && (
                <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#23471d]/10 group-hover:text-[#23471d] transition-all shrink-0">
                    <Icon size={16} strokeWidth={2.5} />
                </div>
            )}
            <div className="min-w-0">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{label}</p>
                <p className={`text-[13px] font-black text-slate-900 truncate ${mono ? 'font-mono tracking-wider' : ''}`}>
                    {value || <span className="text-slate-300 font-bold italic opacity-50">Not Provided</span>}
                </p>
            </div>
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
    const [logo, setLogo] = useState<string | null>(null);

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
        settingsApi.get().then(s => { if (s?.logo) setLogo(s.logo); });
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
        <div className="min-h-screen bg-[#f1f4f9] font-sans selection:bg-[#23471d]/20 antialiased print:hidden">

            {/* 🛸 PREMIUM FLOATING HEADER (DESKTOP + MOBILE BRAND) */}
            <div className="fixed top-0 inset-x-0 z-[100] px-4 pt-4 print:hidden pointer-events-none">
                <header className="max-w-[1600px] mx-auto bg-white/70 backdrop-blur-2xl border border-white shadow-[0_8px_32px_rgba(0,0,0,0.05)] rounded-[2.5rem] flex items-center justify-between px-6 py-2.5 pointer-events-auto transition-all duration-500 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
                    
                    {/* Brand Only */}
                    <div className="flex items-center group">
                        <div className="h-14 flex items-center group-hover:scale-105 transition-all duration-500">
                            {logo ? (
                                <img src={`${SERVER_URL}${logo}`} className="h-full w-auto object-contain pr-4" alt="Logo" />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#1a3516] to-[#3a7a2e] flex items-center justify-center shadow-xl shadow-green-900/10">
                                    <ShieldCheck size={24} className="text-white" strokeWidth={2.5} />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Navigation Desktop */}
                    <nav className="hidden lg:flex items-center gap-1.5 p-1.5 rounded-3xl bg-slate-100/40">
                        {[
                            { id: 'dashboard', label: 'Overview', icon: TrendingUp },
                            { id: 'profile',   label: 'Profile',  icon: User },
                            { id: 'invoices',  label: 'Invoices', icon: FileText },
                            { id: 'exhibitions', label: 'My Events', icon: Building2 },
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center gap-2.5 px-6 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300 relative overflow-hidden group
                                    ${activeTab === tab.id 
                                        ? 'bg-white text-slate-900 shadow-sm' 
                                        : 'text-slate-500 hover:text-slate-800 hover:bg-white/50'
                                    }`}
                            >
                                <tab.icon size={13} strokeWidth={2.5} className={activeTab === tab.id ? 'text-[#23471d]' : 'text-slate-400'} />
                                <span>{tab.label}</span>
                                {activeTab === tab.id && <motion.div layoutId="activeTab" className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#23471d]" />}
                            </button>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <div className="hidden sm:flex items-center gap-2 h-10 px-4 bg-slate-50 border border-slate-100 rounded-2xl mr-2">
                             <div className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                                <User size={12} strokeWidth={3} />
                             </div>
                             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{data.contact1?.firstName}</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-900/20"
                        >
                            <LogOut size={16} strokeWidth={2.5} />
                        </button>
                    </div>
                </header>
            </div>

            {/* 📱 MOBILE BOTTOM NAVIGATION (Premium Floating Design) */}
            <div className="lg:hidden fixed bottom-6 inset-x-4 z-[100] print:hidden">
                <nav className="bg-slate-900/95 backdrop-blur-xl border border-white/10 shadow-2xl rounded-[2rem] flex items-center justify-around px-2 py-3">
                    {[
                        { id: 'dashboard', label: 'Overview', icon: TrendingUp },
                        { id: 'profile',   label: 'Profile',  icon: User },
                        { id: 'invoices',  label: 'Invoices', icon: FileText },
                        { id: 'exhibitions', label: 'Events', icon: Building2 },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex flex-col items-center gap-1.5 px-4 py-2 rounded-2xl transition-all duration-300 relative
                                ${activeTab === tab.id 
                                    ? 'text-white' 
                                    : 'text-white/40 hover:text-white/60'
                                }`}
                        >
                            <tab.icon size={18} strokeWidth={2.5} className={activeTab === tab.id ? 'text-emerald-400' : 'inherit'} />
                            <span className="text-[8px] font-black uppercase tracking-widest">{tab.label}</span>
                            {activeTab === tab.id && (
                                <motion.div 
                                    layoutId="activeTabMobile" 
                                    className="absolute -bottom-1 w-1 h-1 rounded-full bg-emerald-400" 
                                />
                            )}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Main Content Pad */}
            <main className="max-w-[1600px] mx-auto px-4 sm:px-10 lg:px-16 pt-28 pb-32">
                <AnimatePresence mode="wait">
                    {activeTab === 'dashboard' && (
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
                    )}

                    {activeTab === 'profile' && (
                        <motion.div
                            key="profile"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="space-y-8"
                        >
                            <div className="bg-white rounded-[3rem] border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden">
                                <div className="px-10 py-10 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="flex items-center gap-6">
                                        <div className="w-16 h-16 rounded-[1.5rem] bg-slate-900 flex items-center justify-center text-white shadow-2xl shadow-slate-900/20">
                                            <Building2 size={32} strokeWidth={2.5} />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Corporate Identity</h2>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1 flex items-center gap-2">
                                                <BadgeCheck size={12} className="text-emerald-500" /> Verified Industry Profile
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-10 space-y-12">
                                    {/* Identity Section */}
                                    <section>
                                        <div className="flex items-center gap-4 mb-8">
                                            <h3 className="text-[11px] font-black text-[#23471d] uppercase tracking-[0.25em] whitespace-nowrap bg-[#23471d]/5 px-5 py-2 rounded-full border border-[#23471d]/10">Registration Nucleus</h3>
                                            <div className="h-px flex-1 bg-slate-100" />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            <InfoRow label="Official Entity" value={data.exhibitorName} icon={Award} />
                                            <InfoRow label="Fascia/Brand" value={data.fasciaName || data.exhibitorName} icon={User} />
                                            <InfoRow label="Industry Sector" value={data.industrySector} icon={Briefcase} />
                                            <InfoRow label="Nature of Org" value={data.natureOfBusiness} icon={Hash} />
                                            <InfoRow label="Business Framework" value={data.typeOfBusiness} icon={Building2} />
                                            <InfoRow label="Institutional Web" value={data.website} icon={Calendar} />
                                            <InfoRow label="Tax Identification (GST)" value={data.gstNo} icon={ShieldCheck} mono />
                                            <InfoRow label="Financial ID (PAN)" value={data.panNo} icon={FileText} mono />
                                        </div>
                                    </section>

                                    {/* Contact Grid */}
                                    <section>
                                        <div className="flex items-center gap-4 mb-8">
                                            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] whitespace-nowrap">Liaison Framework</h3>
                                            <div className="h-px flex-1 bg-slate-100" />
                                        </div>
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                            <div className="bg-slate-50/50 p-8 rounded-[2rem] border border-slate-100 space-y-6">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-3 py-1 bg-white rounded-full shadow-sm">Primary Delegate</span>
                                                    <Mail size={16} className="text-slate-300" />
                                                </div>
                                                <div className="grid grid-cols-1 gap-4">
                                                    <InfoRow label="Officer Name" value={`${data.contact1?.title} ${data.contact1?.firstName} ${data.contact1?.lastName}`} icon={User} />
                                                    <InfoRow label="Global Email" value={data.contact1?.email} icon={Mail} />
                                                    <InfoRow label="Direct Mobile" value={data.contact1?.mobile} icon={Phone} mono />
                                                </div>
                                            </div>
                                            {data.contact2?.firstName && (
                                                <div className="bg-slate-50/50 p-8 rounded-[2rem] border border-slate-100 space-y-6">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-3 py-1 bg-white rounded-full shadow-sm">Secondary Delegate</span>
                                                        <Mail size={16} className="text-slate-300" />
                                                    </div>
                                                    <div className="grid grid-cols-1 gap-4">
                                                        <InfoRow label="Officer Name" value={`${data.contact2?.title} ${data.contact2?.firstName} ${data.contact2?.lastName}`} icon={User} />
                                                        <InfoRow label="Global Email" value={data.contact2?.email} icon={Mail} />
                                                        <InfoRow label="Direct Mobile" value={data.contact2?.mobile} icon={Phone} mono />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </section>

                                    {/* Geographic Footprint */}
                                    <section>
                                        <div className="flex items-center gap-4 mb-8">
                                            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] whitespace-nowrap">Geographic Footprint</h3>
                                            <div className="h-px flex-1 bg-slate-100" />
                                        </div>
                                        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 flex items-start gap-6">
                                            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                                                <MapPin size={22} />
                                            </div>
                                            <div className="space-y-1.5">
                                                <p className="text-sm font-bold text-slate-900 leading-relaxed">{data.address}</p>
                                                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{[data.city, data.state, data.country, data.pincode].filter(Boolean).join(' • ')}</p>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'invoices' && (
                        <motion.div
                            key="finance"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="space-y-8"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Invoice Ledger */}
                                <div className="lg:col-span-2 bg-white rounded-[3rem] border border-slate-200 shadow-xl shadow-slate-200/30 overflow-hidden">
                                    <div className="px-8 py-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white">
                                                <FileText size={24} strokeWidth={2.5} />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-black text-slate-900 tracking-tight">Fiscal Documents</h3>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Automated Tax Invoicing</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-0">
                                        <div className="overflow-x-auto no-scrollbar">
                                            <table className="w-full text-left">
                                                <thead>
                                                    <tr className="bg-slate-50/30">
                                                        <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Document / Transaction</th>
                                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Timestamp</th>
                                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right">Value</th>
                                                        <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-50">
                                                    <tr className="group hover:bg-slate-50/50 transition-all cursor-pointer">
                                                        <td className="px-8 py-6">
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-[#23471d] group-hover:text-white transition-all"><FileText size={18} /></div>
                                                                <div>
                                                                    <p className="text-sm font-black text-slate-800 tracking-tight">Proforma Invoice</p>
                                                                    <p className="text-[10px] font-bold text-slate-400 uppercase">PINV-{data._id.slice(-6).toUpperCase()}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-6 text-[11px] text-slate-500 font-black uppercase tracking-widest">{regDate}</td>
                                                        <td className="px-6 py-6 text-sm font-black text-slate-900 text-right tabular-nums">{cur}{total.toLocaleString()}</td>
                                                        <td className="px-8 py-6 text-right">
                                                            <button 
                                                                onClick={() => window.print()}
                                                                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-slate-900/10"
                                                            >
                                                                <Download size={14} strokeWidth={2.5} /> <span className="hidden sm:inline">Export PDF</span>
                                                            </button>
                                                        </td>
                                                    </tr>

                                                    {/* Payment Tracker Entry */}
                                                    {paid > 0 && (
                                                        <tr className="group hover:bg-slate-50/50 transition-all">
                                                            <td className="px-8 py-6">
                                                                <div className="flex items-center gap-4">
                                                                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600"><CheckCircle size={18} /></div>
                                                                    <div>
                                                                        <p className="text-sm font-black text-slate-800 tracking-tight">Payment Realized</p>
                                                                        <p className="text-[10px] font-bold text-slate-400 uppercase">
                                                                            {data.manualPaymentDetails?.transactionId || data.paymentId || 'TRX-CONFIRMED'}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-6 text-[11px] text-slate-500 font-black uppercase tracking-widest">
                                                                {data.manualPaymentDetails?.updatedAt ? new Date(data.manualPaymentDetails.updatedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) : regDate}
                                                            </td>
                                                            <td className="px-6 py-6 text-sm font-black text-emerald-600 text-right tabular-nums">+{cur}{paid.toLocaleString()}</td>
                                                            <td className="px-8 py-6 text-right">
                                                                {data.receiptUrl ? (
                                                                    <a 
                                                                        href={data.receiptUrl} 
                                                                        target="_blank" 
                                                                        rel="noopener noreferrer"
                                                                        className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-100 transition-all"
                                                                    >
                                                                        <Download size={14} /> <span className="hidden sm:inline">Receipt</span>
                                                                    </a>
                                                                ) : (
                                                                    <div className="text-[9px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-lg inline-block">Verified</div>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {/* Transaction Metadata (Ledger Sidebar) */}
                                    <div className="p-8 bg-slate-50/50 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Settlement Infrastructure</p>
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center text-xs">
                                                    <span className="font-bold text-slate-500 uppercase tracking-tight">Method</span>
                                                    <span className="font-black text-slate-900">{data.manualPaymentDetails?.method || data.paymentMode || 'Online'}</span>
                                                </div>
                                                <div className="flex justify-between items-center text-xs">
                                                    <span className="font-bold text-slate-500 uppercase tracking-tight">UTR / Ref No.</span>
                                                    <span className="font-black text-slate-900 font-mono tracking-tighter">{data.manualPaymentDetails?.transactionId || data.paymentId || '—'}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Participation Fee</p>
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center text-xs">
                                                    <span className="font-bold text-slate-500 uppercase tracking-tight">Base Amount</span>
                                                    <span className="font-black text-slate-900">{cur}{(data.participation?.amount || 0).toLocaleString()}</span>
                                                </div>
                                                <div className="flex justify-between items-center text-xs">
                                                    <span className="font-bold text-slate-500 uppercase tracking-tight">GST (18%)</span>
                                                    <span className="font-black text-slate-900">+{cur}{(total - (data.participation?.amount || 0)).toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="lg:border-l lg:border-slate-200 lg:pl-8">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Account Statement</p>
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white">
                                                    <Receipt size={18} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-slate-900 tracking-tight">Audit Ready</p>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase">System Generated</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Fiscal Snapshot Card */}
                                <div className="space-y-6">
                                    <div className="bg-[#1a3516] rounded-[3rem] p-10 text-white relative overflow-hidden flex flex-col justify-between shadow-2xl shadow-green-900/30">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl opacity-50"></div>
                                        <div className="relative z-10 space-y-8">
                                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 pb-4 border-b border-white/10">Liquidity Pulse</p>
                                            <div className="space-y-6">
                                                <div>
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400/80 mb-2">Realized Liquidity</p>
                                                    <h4 className="text-4xl font-black tabular-nums tracking-tighter leading-none">{cur}{paid.toLocaleString()}</h4>
                                                </div>
                                                <div className="pt-6 border-t border-white/10">
                                                    <div className="flex justify-between items-end mb-3">
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-white/30 truncate">Settlement Ratio</p>
                                                        <p className="text-xs font-black text-emerald-400">{paidPct}%</p>
                                                    </div>
                                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${paidPct}%` }}
                                                            className="h-full bg-emerald-400"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-8 h-8 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center"><AlertCircle size={14} /></div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pending Liability</p>
                                        </div>
                                        <h5 className="text-2xl font-black text-slate-900 tabular-nums mb-1">{cur}{balance.toLocaleString()}</h5>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                                            {balance > 0 ? "Outstanding balance required for stall handover." : "All fiscal obligations fully satisfied."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'exhibitions' && (
                        <motion.div
                            key="exhibitions"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="space-y-8"
                        >
                            <div className="bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden">
                                <div className="px-10 py-8 border-b border-slate-100 bg-slate-50/50">
                                    <h2 className="text-xl font-black text-slate-900 tracking-tight">Institutional Participation</h2>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Cross-Event Identity Manager</p>
                                </div>
                                <div className="p-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                                                className={`group relative p-8 rounded-[2.5rem] border-2 transition-all duration-500 cursor-pointer
                                                        ${reg._id === data._id
                                                        ? 'border-[#23471d] bg-[#23471d]/5 shadow-xl shadow-green-900/5'
                                                        : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'}`}
                                            >
                                                <div className="space-y-6">
                                                    <div className="flex justify-between items-start">
                                                        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-slate-400 group-hover:text-[#23471d] transition-colors shadow-sm">
                                                            <Building2 size={24} />
                                                        </div>
                                                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${reg._id === data._id ? 'bg-[#23471d] text-white' : 'bg-slate-100 text-slate-400'}`}>
                                                            {reg._id === data._id ? 'Active Context' : 'Historical'}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{reg.eventId?.name || 'ANNUAL GATHERING'}</p>
                                                        <h3 className="text-lg font-black text-slate-900 tracking-tight leading-tight">{reg.exhibitorName}</h3>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-[11px] font-bold text-slate-400 border-t border-slate-100 pt-6">
                                                        <div className="flex items-center gap-1.5"><MapPin size={12} /> {reg.participation?.stallFor || 'TBD'}</div>
                                                        <div className="w-1 h-1 rounded-full bg-slate-200" />
                                                        <div className="flex items-center gap-1.5"><Calendar size={12} /> {new Date(reg.eventId?.startDate).getFullYear()}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        <Link
                                            to="/book-a-stand"
                                            className="group flex flex-col items-center justify-center p-8 rounded-[2.5rem] border-2 border-dashed border-slate-200 hover:border-[#23471d] hover:bg-[#23471d]/5 transition-all"
                                        >
                                            <div className="w-14 h-14 rounded-full bg-slate-50 group-hover:bg-[#23471d]/10 flex items-center justify-center text-slate-300 group-hover:text-[#23471d] transition-all mb-4">
                                                <ArrowRight size={24} className="-rotate-45" />
                                            </div>
                                            <p className="text-[11px] font-black text-slate-400 group-hover:text-[#23471d] uppercase tracking-[0.2em]">New Event Registration</p>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <footer className="max-w-[1600px] mx-auto px-10 lg:px-16 py-12 border-t border-slate-200/50 flex flex-col sm:flex-row items-center justify-between gap-6 opacity-60">
                <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    <span>© 2026 Namo Gange Trust</span>
                    <div className="w-1 h-1 rounded-full bg-slate-300" />
                    <span>Security Protocol Alpha</span>
                </div>
            </footer>

            {/* 🔐 SECURITY LAYER (MODAL) */}
            <AnimatePresence>
                {showChangePwd && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4 print:hidden"
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            className="bg-white rounded-[3rem] shadow-2xl w-full max-w-md overflow-hidden relative"
                        >
                            <div className="px-10 py-10 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-2xl bg-[#23471d] text-white flex items-center justify-center">
                                        <KeyRound size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-slate-900 tracking-tight">Security Update</h3>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Credential Governance</p>
                                    </div>
                                </div>
                                <button onClick={() => setShowChangePwd(false)} className="w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center transition-colors">
                                    <X size={18} className="text-slate-500" />
                                </button>
                            </div>
                            <form onSubmit={handleChangePassword} className="p-10 space-y-6">
                                {[
                                    { key: 'current', label: 'Current Authentication', showKey: 'current' as const },
                                    { key: 'newPwd', label: 'New Passphrase', showKey: 'newPwd' as const },
                                    { key: 'confirm', label: 'Validate Passphrase', showKey: 'newPwd' as const },
                                ].map(field => (
                                    <div key={field.key}>
                                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2 px-1">{field.label}</label>
                                        <div className="relative group">
                                            <input
                                                type={showPwd[field.showKey] ? 'text' : 'password'}
                                                required
                                                value={(pwdForm as any)[field.key]}
                                                onChange={e => setPwdForm(p => ({ ...p, [field.key]: e.target.value }))}
                                                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[13px] font-bold focus:outline-none focus:bg-white focus:border-[#23471d]/30 focus:shadow-sm transition-all"
                                                placeholder="••••••••"
                                            />
                                            {field.key !== 'confirm' && (
                                                <button type="button" onClick={() => setShowPwd(p => ({ ...p, [field.showKey]: !p[field.showKey] }))}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#23471d] transition-colors">
                                                    {showPwd[field.showKey] ? <EyeOff size={16} /> : <Eye size={16} />}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                <div className="grid grid-cols-2 gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowChangePwd(false)}
                                        className="py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={pwdLoading}
                                        className="py-4 bg-[#23471d] hover:bg-black text-white rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all shadow-xl shadow-green-900/20 disabled:opacity-50"
                                    >
                                        {pwdLoading ? 'UPDATING...' : 'SAVE CHANGES'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 🔥 PRINT LAYER */}
            <PrintDocument data={data} />
        </div>
    );
}
