import { useState, useEffect } from 'react';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import {
    Send, Globe, Package, Info, CheckCircle2,
    ChevronRight, FileText, RefreshCw, Clock,
    Lock, MapPin, Award, Briefcase
} from 'lucide-react';
import { toast } from 'sonner';
import { API_URL } from '@/lib/api';
import DashboardHero from '@/components/dashboard/DashboardHero';

// ─── Subscription Gate ────────────────────────────────────────────────────────
function SubscriptionGate({ children }: { children: React.ReactNode }) {
    const { access } = useExhibitorCtx() || {};
    if (!access?.export_inquiry) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mb-4 border border-amber-200">
                    <Lock size={28} className="text-amber-500" />
                </div>
                <h3 className="text-base font-black text-slate-800 uppercase tracking-tight mb-2">Export Inquiry Locked</h3>
                <p className="text-sm text-slate-500 max-w-sm mb-6">
                    Your current subscription plan does not include Product Export access. Upgrade to unlock.
                </p>
                <a href="/seller-portal/sponsorship"
                    className="px-6 py-2.5 bg-[#23471d] text-white font-black text-[10px] uppercase tracking-widest rounded-sm hover:bg-[#1a3516] transition-all">
                    View Upgrade Plans
                </a>
            </div>
        );
    }
    return <>{children}</>;
}

const STATUS_COLOR: Record<string, string> = {
    pending:   'bg-amber-50 text-amber-700 border-amber-200',
    reviewed:  'bg-blue-50 text-blue-700 border-blue-200',
    contacted: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

const PRODUCT_CATEGORIES = [
    'Herbal & AYUSH Products',
    'Organic Foods & Beverages',
    'Natural Cosmetics & Personal Care',
    'Health Supplements & Nutraceuticals',
    'Wellness Equipment & Devices',
    'Ayurvedic Medicines',
    'Essential Oils & Aromatherapy',
    'Yoga & Fitness Products',
    'Homeopathy Products',
    'Naturopathy Products',
    'Other',
];

const CERTIFICATIONS = [
    'ISO 9001', 'ISO 22000', 'GMP', 'FDA (USA)', 'USDA Organic',
    'AYUSH Premium Mark', 'FSSAI', 'Halal', 'Kosher', 'CE Mark', 'Other',
];

const TARGET_REGIONS = [
    'USA & Canada', 'Europe (EU)', 'UK', 'Middle East & GCC',
    'Southeast Asia', 'Australia & New Zealand', 'Africa',
    'South America', 'Japan & South Korea', 'China', 'Other',
];

const EMPTY_FORM = {
    brandName: '',
    contactPerson: '',
    email: '',
    phone: '',
    productCategories: [] as string[],
    targetCountries: [] as string[],
    exportExperience: '' as 'beginner' | 'intermediate' | 'expert' | '',
    certifications: [] as string[],
    message: '',
};

export default function ProductExportPage() {
    const { data } = useExhibitorCtx() || {};
    const [loading, setLoading] = useState(false);
    const [myInquiries, setMyInquiries] = useState<any[]>([]);
    const [loadingInq, setLoadingInq] = useState(true);
    const [showForm, setShowForm] = useState(false);

    const [form, setForm] = useState({
        ...EMPTY_FORM,
        brandName: data?.exhibitorName || '',
        contactPerson: `${data?.contact1?.firstName || ''} ${data?.contact1?.lastName || ''}`.trim(),
        email: data?.contact1?.email || '',
        phone: data?.contact1?.mobile || '',
    });

    const selectedRegId = localStorage.getItem('selectedRegId');

    const fetchInquiries = async () => {
        setLoadingInq(true);
        try {
            const token = localStorage.getItem('exhibitorToken');
            const url = selectedRegId
                ? `${API_URL}/seller-portal/export-inquiries?regId=${selectedRegId}`
                : `${API_URL}/seller-portal/export-inquiries`;
            const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
            const d = await res.json();
            if (d.success) setMyInquiries(d.data || []);
        } catch { /* silent */ }
        finally { setLoadingInq(false); }
    };

    useEffect(() => { fetchInquiries(); }, []);

    const toggleMulti = (field: 'productCategories' | 'targetCountries' | 'certifications', val: string) => {
        setForm(prev => {
            const arr = prev[field] as string[];
            return { ...prev, [field]: arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val] };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.brandName || !form.contactPerson || !form.email || !form.phone) {
            toast.error('Please fill all required fields');
            return;
        }
        if (form.productCategories.length === 0) {
            toast.error('Select at least one product category');
            return;
        }
        if (form.targetCountries.length === 0) {
            toast.error('Select at least one target region');
            return;
        }
        if (!form.exportExperience) {
            toast.error('Select your export experience level');
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem('exhibitorToken');
            const res = await fetch(`${API_URL}/seller-portal/export-inquiry`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    ...form,
                    ...(selectedRegId && { regId: selectedRegId }),
                })
            });
            const d = await res.json();
            if (d.success) {
                toast.success('Export inquiry submitted successfully!');
                setForm({
                    ...EMPTY_FORM,
                    brandName: data?.exhibitorName || '',
                    contactPerson: `${data?.contact1?.firstName || ''} ${data?.contact1?.lastName || ''}`.trim(),
                    email: data?.contact1?.email || '',
                    phone: data?.contact1?.mobile || '',
                });
                setShowForm(false);
                fetchInquiries();
            } else {
                toast.error(d.message || 'Failed to submit inquiry');
            }
        } catch {
            toast.error('Network error');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (d: string) =>
        new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

    return (
        <div className="space-y-6 pb-12 font-inter">
            <DashboardHero
                pageId="sl-export"
                defaultTitle="Product Export Inquiry"
                defaultSubtitle="Connect with international buyers and distributors for your premium products."
                type="seller"
            />

            <SubscriptionGate>
                {/* Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                        <Globe size={12} className="text-blue-500" /> Global Export Desk · IHWE 2026
                    </p>
                    <div className="flex gap-3">
                        <button onClick={fetchInquiries}
                            className="px-4 py-2.5 border border-slate-200 text-slate-600 font-black text-[10px] uppercase tracking-widest rounded-sm flex items-center gap-2 hover:bg-slate-50">
                            <RefreshCw size={12} /> Refresh
                        </button>
                        <button onClick={() => setShowForm(v => !v)}
                            className="px-6 py-2.5 bg-[#23471d] text-white font-black text-[10px] uppercase tracking-widest rounded-sm shadow-lg hover:bg-[#1a3516] transition-all flex items-center gap-2">
                            <Send size={12} /> {showForm ? 'Cancel' : 'New Export Inquiry'}
                        </button>
                    </div>
                </div>

                {/* Form */}
                {showForm && (
                    <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
                        <div className="bg-[#23471d] px-6 py-3 flex items-center gap-3">
                            <Package size={16} className="text-white" />
                            <h2 className="text-[11px] font-black text-white uppercase tracking-widest">New Export Inquiry</h2>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Contact Info */}
                            <div>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <Briefcase size={10} /> Company & Contact Details
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1.5">Brand / Company Name *</label>
                                        <input value={form.brandName} onChange={e => setForm(p => ({ ...p, brandName: e.target.value }))} required
                                            className="w-full h-10 px-3 border border-slate-200 rounded-sm text-sm font-medium focus:outline-none focus:border-[#23471d] bg-slate-50"
                                            placeholder="Your brand or company name" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1.5">Contact Person *</label>
                                        <input value={form.contactPerson} onChange={e => setForm(p => ({ ...p, contactPerson: e.target.value }))} required
                                            className="w-full h-10 px-3 border border-slate-200 rounded-sm text-sm font-medium focus:outline-none focus:border-[#23471d] bg-slate-50"
                                            placeholder="Full name" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1.5">Email *</label>
                                        <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required
                                            className="w-full h-10 px-3 border border-slate-200 rounded-sm text-sm font-medium focus:outline-none focus:border-[#23471d] bg-slate-50"
                                            placeholder="contact@company.com" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1.5">Phone *</label>
                                        <input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} required
                                            className="w-full h-10 px-3 border border-slate-200 rounded-sm text-sm font-medium focus:outline-none focus:border-[#23471d] bg-slate-50"
                                            placeholder="+91 XXXXX XXXXX" />
                                    </div>
                                </div>
                            </div>

                            {/* Product Categories */}
                            <div>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <Package size={10} /> Product Categories * <span className="text-slate-300 font-medium normal-case">(select all that apply)</span>
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {PRODUCT_CATEGORIES.map(cat => (
                                        <button key={cat} type="button"
                                            onClick={() => toggleMulti('productCategories', cat)}
                                            className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-sm border-2 transition-all ${
                                                form.productCategories.includes(cat)
                                                    ? 'bg-[#23471d] text-white border-[#23471d]'
                                                    : 'bg-white text-slate-600 border-slate-200 hover:border-[#23471d]'
                                            }`}>
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Target Regions */}
                            <div>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <MapPin size={10} /> Target Export Regions * <span className="text-slate-300 font-medium normal-case">(select all that apply)</span>
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {TARGET_REGIONS.map(region => (
                                        <button key={region} type="button"
                                            onClick={() => toggleMulti('targetCountries', region)}
                                            className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-sm border-2 transition-all ${
                                                form.targetCountries.includes(region)
                                                    ? 'bg-blue-600 text-white border-blue-600'
                                                    : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400'
                                            }`}>
                                            {region}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Export Experience */}
                            <div>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <Award size={10} /> Export Experience Level *
                                </p>
                                <div className="flex gap-3">
                                    {(['beginner', 'intermediate', 'expert'] as const).map(level => (
                                        <button key={level} type="button"
                                            onClick={() => setForm(p => ({ ...p, exportExperience: level }))}
                                            className={`flex-1 py-3 text-[10px] font-black uppercase tracking-wider rounded-sm border-2 transition-all ${
                                                form.exportExperience === level
                                                    ? 'bg-[#d26019] text-white border-[#d26019]'
                                                    : 'bg-white text-slate-600 border-slate-200 hover:border-[#d26019]'
                                            }`}>
                                            {level === 'beginner' ? '🌱 Beginner' : level === 'intermediate' ? '📈 Intermediate' : '🏆 Expert'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Certifications */}
                            <div>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <CheckCircle2 size={10} /> Certifications <span className="text-slate-300 font-medium normal-case">(optional)</span>
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {CERTIFICATIONS.map(cert => (
                                        <button key={cert} type="button"
                                            onClick={() => toggleMulti('certifications', cert)}
                                            className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-sm border-2 transition-all ${
                                                form.certifications.includes(cert)
                                                    ? 'bg-emerald-600 text-white border-emerald-600'
                                                    : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-400'
                                            }`}>
                                            {cert}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Message */}
                            <div>
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1.5">
                                    Additional Details / Message
                                </label>
                                <textarea rows={4} value={form.message}
                                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                                    className="w-full px-3 py-2.5 border border-slate-200 rounded-sm text-sm font-medium focus:outline-none focus:border-[#23471d] bg-slate-50"
                                    placeholder="Key USPs, MOQ, pricing range, export readiness, or any specific requirements..." />
                            </div>

                            {/* Submit */}
                            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-3 py-2 rounded-sm border border-blue-100">
                                    <Info size={13} />
                                    <p className="text-[10px] font-bold uppercase tracking-widest">Our team will contact you within 48 hours</p>
                                </div>
                                <button type="submit" disabled={loading}
                                    className="px-8 py-3 bg-[#23471d] hover:bg-[#1a3516] text-white font-black text-[10px] uppercase tracking-widest rounded-sm shadow-lg flex items-center gap-2 disabled:opacity-50 transition-all">
                                    {loading
                                        ? <><div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" /> Submitting...</>
                                        : <><Send size={13} /> Submit Export Inquiry</>
                                    }
                                </button>
                            </div>
                        </div>
                    </form>
                )}

                {/* My Inquiries */}
                <div className="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
                    <div className="bg-[#23471d] px-5 py-3 flex items-center justify-between">
                        <h3 className="text-white font-black text-[11px] uppercase tracking-widest flex items-center gap-2">
                            <FileText size={13} /> My Export Inquiries
                        </h3>
                        <span className="bg-[#d26019] text-white text-[9px] font-black px-2 py-0.5 uppercase tracking-wider">
                            {myInquiries.length} Records
                        </span>
                    </div>

                    {loadingInq ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="w-7 h-7 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                        </div>
                    ) : myInquiries.length === 0 ? (
                        <div className="py-12 text-center">
                            <Globe size={32} className="text-slate-300 mx-auto mb-3" />
                            <p className="text-sm font-black text-slate-400 uppercase tracking-wide">No Export Inquiries Yet</p>
                            <p className="text-xs text-slate-400 mt-1">Click "New Export Inquiry" above to get started.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-50">
                            {myInquiries.map((inq, i) => {
                                const statusStyle = STATUS_COLOR[inq.status] || STATUS_COLOR.pending;
                                return (
                                    <div key={i} className="px-5 py-4 hover:bg-slate-50/50 transition-colors">
                                        <div className="flex items-start justify-between gap-4 mb-2">
                                            <div>
                                                <p className="text-xs font-black text-slate-800 uppercase">{inq.brandName}</p>
                                                <p className="text-[10px] text-slate-500 font-bold mt-0.5">{inq.contactPerson} · {inq.email} · {inq.phone}</p>
                                            </div>
                                            <div className="flex items-center gap-2 shrink-0">
                                                <span className={`text-[9px] font-black px-2 py-1 rounded border uppercase tracking-wider ${statusStyle}`}>
                                                    {inq.status || 'Pending'}
                                                </span>
                                                <span className="text-[9px] text-slate-400 font-bold whitespace-nowrap">
                                                    {formatDate(inq.createdAt)}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-1.5 mt-2">
                                            {(inq.productCategories || []).map((c: string, j: number) => (
                                                <span key={j} className="text-[8px] font-black px-2 py-0.5 bg-slate-100 text-slate-600 rounded uppercase">{c}</span>
                                            ))}
                                            {(inq.targetCountries || []).map((c: string, j: number) => (
                                                <span key={j} className="text-[8px] font-black px-2 py-0.5 bg-blue-50 text-blue-600 rounded uppercase">{c}</span>
                                            ))}
                                            {inq.exportExperience && (
                                                <span className="text-[8px] font-black px-2 py-0.5 bg-orange-50 text-orange-600 rounded uppercase">{inq.exportExperience}</span>
                                            )}
                                            {(inq.certifications || []).map((c: string, j: number) => (
                                                <span key={j} className="text-[8px] font-black px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded uppercase">{c}</span>
                                            ))}
                                        </div>
                                        {inq.message && (
                                            <p className="text-[10px] text-slate-500 mt-2 italic">"{inq.message}"</p>
                                        )}
                                        {inq.adminNote && (
                                            <p className="text-[10px] text-blue-600 font-bold mt-1">Admin: {inq.adminNote}</p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </SubscriptionGate>
        </div>
    );
}
