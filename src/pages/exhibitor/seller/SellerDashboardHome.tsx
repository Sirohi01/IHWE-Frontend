import React from 'react';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import {
    Handshake, Users, Award,
    Package, Send, BarChart3,
    Megaphone, ShoppingBag,
    Lock, CheckCircle2, Truck, CalendarCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '@/components/home/HeroSection';
import ExhibitorOverview from '@/components/dashboard/exhibitor/ExhibitorOverview';
import AdminApprovalStatus from '@/components/dashboard/seller/AdminApprovalStatus';
import { API_URL } from '@/lib/api';
import { STATUS_CONFIG } from '@/components/dashboard/exhibitor/types';

export default function SellerDashboardHome() {
    const { data, subInfo, access } = useExhibitorCtx() || {};
    const navigate = useNavigate();
    const [stats, setStats] = React.useState<any>(null);

    const isSubscribed = subInfo?.subscription?.isActive === true;
    const planDetails = subInfo?.planDetails;
    const daysRemaining = subInfo?.subscription?.daysRemaining ?? null;

    React.useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('exhibitorToken');
                const selectedRegId = localStorage.getItem('selectedRegId');
                const url = selectedRegId
                    ? `${API_URL}/seller-portal/stats?regId=${selectedRegId}`
                    : `${API_URL}/seller-portal/stats`;
                const res = await fetch(url, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const d = await res.json();
                if (d.success) setStats(d.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchStats();
    }, []);

    const goTo = (tab: string) => navigate(`/seller-portal/${tab === 'dashboard' ? '' : tab}`);

    const cur = data?.participation?.currency === 'USD' ? '$' : '\u20B9';
    const status = STATUS_CONFIG[data?.status] || STATUS_CONFIG.pending;
    const paid    = data?.amountPaid || 0;
    // Use financeBreakdown.netPayable as the true contract value (post-GST, post-TDS)
    const total   = data?.financeBreakdown?.netPayable || data?.participation?.total || 0;
    const balance = data?.balanceAmount || 0;
    const paidPct = total > 0 ? Math.min(100, Math.round((paid / total) * 100)) : 0;

    // Quick Summary Cards Data
    const profileCompletion = stats?.profileCompletion || 0;
    const pendingFields = Math.ceil((100 - profileCompletion) / 6.25);

    const summaryCards = [
        { label: 'Stall Booking',      value: data?.participation?.stallFor || 'Not Assigned', subtext: `${data?.participation?.stallSize || 0} sqm`,                                    icon: Package,      color: '#0284c7' },
        { label: 'Payment Status',     value: `${paidPct}%`,                                   subtext: `${cur}${paid.toLocaleString()} / ${cur}${total.toLocaleString()}`,              icon: CheckCircle2, color: paidPct === 100 ? '#059669' : '#d97706' },
        { label: 'Pending Due',        value: `${cur}${balance.toLocaleString()}`,              subtext: balance > 0 ? 'Payment Required' : 'Fully Paid',                                icon: CalendarCheck,color: balance > 0 ? '#dc2626' : '#059669' },
        { label: 'Visitor Leads',      value: stats?.totalLeads || 0,                          subtext: stats?.maxLeads > 0 ? `of ${stats.maxLeads} plan limit` : 'Verified Inquiries',                                                            icon: Users,        color: '#7c3aed' },
        { label: 'Meeting Requests',   value: stats?.meetingRequests || 0,                     subtext: 'Pending Confirmations',                                                         icon: Handshake,    color: '#ea580c' },
        { label: 'Sponsorship Status', value: isSubscribed ? 'Active' : 'Inactive',            subtext: isSubscribed ? planDetails?.name : 'No Plan',                                   icon: Award,        color: isSubscribed ? '#059669' : '#64748b' },
        { label: 'Profile Completion', value: `${profileCompletion}%`,                         subtext: profileCompletion === 100 ? 'Complete' : `${pendingFields} fields pending`,      icon: Users,        color: profileCompletion === 100 ? '#059669' : '#2563eb' },
        { label: 'Document Status',    value: data?.kycStatus || 'Pending',                    subtext: 'KYC Verification',                                                              icon: Package,      color: data?.kycStatus === 'approved' ? '#059669' : '#d97706' },
    ];

    const modules = [
        { id: 'leads',       label: 'Lead Management',          desc: `${stats?.totalLeads || 0} Verified buyer leads`,  icon: Users,         accent: '#ea580c', light: '#fff7ed', tab: 'leads',          featureKey: 'lead_access' },
        { id: 'bsm',         label: 'Meeting Scheduler',        desc: '1-on-1 Buyer-Seller Meetings',                    icon: Handshake,     accent: '#d97706', light: '#fffbeb', tab: 'bsm',            featureKey: 'bsm_marketing' },
        { id: 'export',      label: 'Product Export',           desc: 'Global trade & export desk',                      icon: Send,          accent: '#2563eb', light: '#eff6ff', tab: 'product-export', featureKey: 'export_inquiry' },
        { id: 'products',    label: 'Manage Products',          desc: 'Catalog & digital showroom',                      icon: Package,       accent: '#059669', light: '#ecfdf5', tab: 'products',       featureKey: 'product_showcase' },
        { id: 'marketing',   label: 'Marketing Support',        desc: 'Custom promos & social assets',                   icon: Megaphone,     accent: '#e11d48', light: '#fff1f2', tab: 'marketing',      featureKey: 'bsm_marketing' },
        // { id: 'logistics',   label: 'Logistics & Operations',   desc: 'Booth setup & services',                          icon: Truck,         accent: '#7c3aed', light: '#f5f3ff', tab: 'logistics',      featureKey: 'logistics' },
        { id: 'conference',  label: 'Conference Participation', desc: 'Sessions & speaker slots',                        icon: CalendarCheck, accent: '#0891b2', light: '#ecfeff', tab: 'conference',     featureKey: 'conference' },
        { id: 'accessories', label: 'Accessories',              desc: 'Order stall accessories',                         icon: ShoppingBag,   accent: '#d97706', light: '#fffbeb', tab: 'accessories',    featureKey: 'accessories' },
        { id: 'reports',     label: 'Reports Section',          desc: `${stats?.totalViews || 0} Total views tracked`,   icon: BarChart3,     accent: '#6366f1', light: '#eef2ff', tab: 'reports',        featureKey: 'analytics_dashboard' },
    ];

    return (
        <div className="space-y-4 pb-12">
            <HeroSection onRegisterVisit={() => {}} forceNewTab={true} hideStats={true} />

            {/* Subscription Status Banner */}
            {isSubscribed && planDetails ? (
                <div className="bg-gradient-to-r from-[#23471d] to-[#1a3516] text-white p-4 rounded-sm shadow-lg flex flex-col md:flex-row items-center justify-between gap-4 border-l-4 border-[#d26019]">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#d26019] rounded-sm flex items-center justify-center shrink-0">
                            <CheckCircle2 className="text-white" size={20} />
                        </div>
                        <div>
                            <h2 className="text-sm font-black uppercase tracking-tight">{planDetails.name} Plan — Active</h2>
                            <p className="text-[10px] text-white/70 font-medium">
                                {planDetails.features?.length || 0} features unlocked
                                {daysRemaining !== null ? ` • ${daysRemaining} days remaining` : ''}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {planDetails.features?.slice(0, 4).map((f: any, i: number) => (
                            <span key={i} className="bg-white/10 text-white text-[9px] font-black px-2 py-1 rounded-sm uppercase tracking-wider">
                                {f.label}
                            </span>
                        ))}
                        {(planDetails.features?.length || 0) > 4 && (
                            <span className="bg-[#d26019] text-white text-[9px] font-black px-2 py-1 rounded-sm uppercase tracking-wider">
                                +{planDetails.features.length - 4} more
                            </span>
                        )}
                    </div>
                </div>
            ) : (
                <div className="bg-gradient-to-r from-[#23471d] to-[#1a3516] text-white p-6 rounded-sm shadow-lg flex flex-col md:flex-row items-center justify-between gap-4 border-l-4 border-[#d26019]">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#d26019] rounded-full flex items-center justify-center shrink-0 shadow-inner">
                            <Award className="text-white" size={24} />
                        </div>
                        <div>
                            <h2 className="text-lg font-black uppercase tracking-tight">Upgrade to Premium Business Engine</h2>
                            <p className="text-xs text-white/80 max-w-lg font-medium">Unlock full access to verified leads, priority meeting slots, and global export consultancy.</p>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate('/seller-portal/sponsorship')}
                        className="bg-[#d26019] hover:bg-[#b8521a] text-white px-8 py-3 rounded-sm text-[11px] font-black uppercase tracking-widest transition-all shadow-xl active:scale-95 whitespace-nowrap"
                    >
                        View Upgrade Plans
                    </button>
                </div>
            )}

            {/* Quick Summary Cards */}
            <div className="bg-white border border-slate-200 p-4 rounded-sm shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-5 bg-[#d26019] rounded-full" />
                    <h3 className="text-[11px] font-black text-[#d26019] uppercase tracking-widest">Quick Summary</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {summaryCards.map((card, idx) => {
                        const Icon = card.icon;
                        return (
                            <div key={idx} className="group relative overflow-hidden border rounded-[3px] p-4 transition-all bg-white border-slate-200 hover:shadow-md">
                                <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-5 group-hover:opacity-10 transition-all duration-500" style={{ background: card.color }} />
                                <div className="flex items-start justify-between mb-3 relative z-10">
                                    <div className="w-9 h-9 rounded-[3px] flex items-center justify-center shadow-sm" style={{ background: card.color }}>
                                        <Icon className="w-4 h-4 text-white" strokeWidth={2.5} />
                                    </div>
                                </div>
                                <p className="text-[10px] font-bold uppercase tracking-tight text-slate-500 mb-1">{card.label}</p>
                                <p className="text-[16px] font-extrabold uppercase tracking-tight text-slate-800 mb-0.5">{card.value}</p>
                                <p className="text-[9px] text-slate-400 font-medium leading-tight">{card.subtext}</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Module Grid */}
            <div className="bg-white border border-slate-200 p-4 rounded-sm shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-5 bg-[#23471d] rounded-full" />
                    <h3 className="text-[11px] font-black text-[#23471d] uppercase tracking-widest">Business Operations</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {modules.map((mod) => {
                        const Icon = mod.icon;
                        const isLocked = !access?.[mod.featureKey];
                        return (
                            <div
                                key={mod.id}
                                onClick={() => !isLocked && goTo(mod.tab)}
                                className={`group relative overflow-hidden border rounded-[3px] p-4 transition-all ${
                                    isLocked
                                        ? 'bg-slate-50 border-slate-100 cursor-not-allowed opacity-60'
                                        : 'bg-white border-slate-200 hover:shadow-md cursor-pointer'
                                }`}
                            >
                                <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-5 group-hover:opacity-10 transition-all duration-500" style={{ background: mod.accent }} />
                                <div className="flex items-start justify-between mb-3 relative z-10">
                                    <div className="w-9 h-9 rounded-[3px] flex items-center justify-center shadow-sm" style={{ background: isLocked ? '#94a3b8' : mod.accent }}>
                                        {isLocked
                                            ? <Lock className="w-4 h-4 text-white" />
                                            : <Icon className="w-4 h-4 text-white" strokeWidth={2.5} />
                                        }
                                    </div>
                                    <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-[2px]"
                                        style={{ background: isLocked ? '#f1f5f9' : mod.light, color: isLocked ? '#94a3b8' : mod.accent }}>
                                        {isLocked ? 'Locked' : 'Active'}
                                    </span>
                                </div>
                                <p className="text-[12px] font-extrabold uppercase tracking-tight text-slate-800 mb-0.5">{mod.label}</p>
                                <p className="text-[10px] text-slate-500 font-medium leading-tight truncate">{mod.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Business Overview */}
            <div className="bg-white p-4 border border-slate-200 rounded-sm shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-5 bg-[#d26019] rounded-full" />
                    <h3 className="text-[11px] font-black text-[#d26019] uppercase tracking-widest">Business Overview</h3>
                </div>
                <ExhibitorOverview
                    data={data}
                    cur={cur}
                    status={status}
                    paidPct={paidPct}
                    paid={paid}
                    total={total}
                    balance={balance}
                    setActiveTab={(tab: string) => navigate(`/seller-portal/${tab === 'dashboard' ? '' : tab}`)}
                />
            </div>

            {/* Admin Approval Status */}
            <AdminApprovalStatus data={data} />
        </div>
    );
}
