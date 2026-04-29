import React, { useState, useEffect } from 'react';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import {
    Users, Search,
    Mail, Phone,
    Clock, Globe,
    Loader2, Package, Tag, RefreshCw,
    ShoppingBag, Eye, MapPin, Building2, Heart,Calendar
} from 'lucide-react';
import { API_URL } from '@/lib/api';
import { toast } from 'sonner';
import DashboardHero from '@/components/dashboard/DashboardHero';
type LeadType = 'all' | 'domestic_buyer' | 'international_buyer' | 'domestic_visitor' | 'international_visitor' | 'product_enquiry';

const LEAD_TYPE_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
    domestic_buyer:        { label: 'Domestic Buyer',        color: 'text-purple-700',  bg: 'bg-purple-50',  border: 'border-purple-200' },
    international_buyer:   { label: 'International Buyer',   color: 'text-indigo-700',  bg: 'bg-indigo-50',  border: 'border-indigo-200' },
    domestic_visitor:      { label: 'Domestic Visitor',      color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' },
    international_visitor: { label: 'International Visitor', color: 'text-blue-700',    bg: 'bg-blue-50',    border: 'border-blue-200' },
    product_enquiry:       { label: 'Product Enquiry',       color: 'text-orange-700',  bg: 'bg-orange-50',  border: 'border-orange-200' },
};

const TAG_CONFIG: Record<string, string> = {
    Hot:  'bg-red-50 text-red-600 border-red-200',
    Warm: 'bg-orange-50 text-orange-600 border-orange-200',
    Cold: 'bg-slate-50 text-slate-500 border-slate-200',
};

const PRIORITY_CONFIG: Record<string, string> = {
    high:   'bg-red-50 text-red-600 border-red-200',
    medium: 'bg-orange-50 text-orange-600 border-orange-200',
    low:    'bg-slate-50 text-slate-500 border-slate-200',
};

// ─── Tab Button ───────────────────────────────────────────────────────────────
function TabBtn({ active, onClick, label, count, color }: any) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 text-[10px] font-black uppercase tracking-wider rounded-[2px] border-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                active
                    ? 'bg-[#23471d] text-white border-[#23471d]'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
        >
            {label}
            <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                {count}
            </span>
        </button>
    );
}

// ─── Lead Card ────────────────────────────────────────────────────────────────
function LeadCard({ lead }: any) {
    const typeConf = LEAD_TYPE_CONFIG[lead.leadType] || LEAD_TYPE_CONFIG.product_enquiry;

    return (
        <div className="bg-white border border-slate-200 rounded-sm overflow-hidden hover:shadow-md transition-all">
            {/* Top stripe */}
            <div className={`h-1 w-full ${typeConf.bg}`} />

            <div className="p-5">
                {/* Header row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className={`w-10 h-10 rounded-sm flex items-center justify-center shrink-0 ${typeConf.bg} ${typeConf.border} border`}>
                            <span className={`text-sm font-black ${typeConf.color}`}>
                                {(lead.name || '?').charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div className="min-w-0">
                            <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight truncate">{lead.name}</h3>
                            {lead.company && lead.company !== lead.name && (
                                <p className="text-[10px] text-slate-500 font-bold flex items-center gap-1 mt-0.5">
                                    <Building2 size={9} /> {lead.company}
                                    {lead.designation && ` — ${lead.designation}`}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 flex-wrap justify-end">
                        <span className={`text-[8px] font-black px-2 py-0.5 rounded border uppercase tracking-wider ${typeConf.color} ${typeConf.bg} ${typeConf.border}`}>
                            {typeConf.label}
                        </span>
                        {lead.tag && (
                            <span className={`text-[8px] font-black px-2 py-0.5 rounded border uppercase tracking-wider ${TAG_CONFIG[lead.tag] || TAG_CONFIG.Cold}`}>
                                {lead.tag}
                            </span>
                        )}
                        {lead.priority && !lead.tag && (
                            <span className={`text-[8px] font-black px-2 py-0.5 rounded border uppercase tracking-wider ${PRIORITY_CONFIG[lead.priority] || PRIORITY_CONFIG.low}`}>
                                {lead.priority}
                            </span>
                        )}
                        {lead.interested && (
                            <span className="text-[8px] font-black px-2 py-0.5 rounded border uppercase tracking-wider bg-pink-50 text-pink-600 border-pink-200 flex items-center gap-1">
                                <Heart size={7} className="fill-current" /> Interested
                            </span>
                        )}
                    </div>
                </div>

                {/* Info grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                    {lead.email && (
                        <div className="flex items-center gap-1.5 min-w-0">
                            <Mail size={10} className="text-slate-400 shrink-0" />
                            <span className="text-[10px] text-slate-600 font-medium truncate">{lead.email}</span>
                        </div>
                    )}
                    {lead.phone && (
                        <div className="flex items-center gap-1.5">
                            <Phone size={10} className="text-slate-400 shrink-0" />
                            <span className="text-[10px] text-slate-600 font-medium">{lead.phone}</span>
                        </div>
                    )}
                    {(lead.city || lead.state || lead.country) && (
                        <div className="flex items-center gap-1.5 min-w-0">
                            <MapPin size={10} className="text-slate-400 shrink-0" />
                            <span className="text-[10px] text-slate-600 font-medium truncate">
                                {[lead.city, lead.state, lead.country].filter(Boolean).join(', ')}
                            </span>
                        </div>
                    )}
                    {lead.interest && (
                        <div className="flex items-center gap-1.5 min-w-0">
                            <Tag size={10} className="text-slate-400 shrink-0" />
                            <span className="text-[10px] text-slate-600 font-medium truncate">{lead.interest}</span>
                        </div>
                    )}
                    {lead.purchaseTimeline && (
                        <div className="flex items-center gap-1.5">
                            <Calendar size={10} className="text-slate-400 shrink-0" />
                            <span className="text-[10px] text-slate-600 font-medium">{lead.purchaseTimeline}</span>
                        </div>
                    )}
                    {lead.registrationId && (
                        <div className="flex items-center gap-1.5">
                            <Globe size={10} className="text-slate-400 shrink-0" />
                            <span className="text-[10px] text-slate-500 font-mono">{lead.registrationId}</span>
                        </div>
                    )}
                    <div className="flex items-center gap-1.5">
                        <Clock size={10} className="text-slate-400 shrink-0" />
                        <span className="text-[10px] text-slate-400 font-medium">
                            {new Date(lead.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                    </div>
                </div>

                {lead.message && (
                    <p className="text-[10px] text-slate-500 italic mb-3 bg-slate-50 px-3 py-2 rounded-sm border border-slate-100">
                        "{lead.message}"
                    </p>
                )}

                {/* Actions — contact only */}
                {(lead.email || lead.phone) && (
                    <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100">
                        {lead.email && (
                            <a href={`mailto:${lead.email}`}
                                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-sm text-slate-600 hover:bg-slate-100 transition-colors text-[10px] font-bold uppercase flex items-center gap-1">
                                <Mail size={11} /> Email
                            </a>
                        )}
                        {lead.phone && (
                            <a href={`tel:${lead.phone}`}
                                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-sm text-slate-600 hover:bg-slate-100 transition-colors text-[10px] font-bold uppercase flex items-center gap-1">
                                <Phone size={11} /> Call
                            </a>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function SellerLeadsPage() {
    const { data } = useExhibitorCtx();
    const [leads, setLeads] = useState<any[]>([]);
    const [breakdown, setBreakdown] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [activeTab, setActiveTab] = useState<LeadType>('all');
    const [page, setPage] = useState(1);
    const PAGE_SIZE = 12;

    const fetchLeads = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('exhibitorToken');
            const selectedRegId = localStorage.getItem('selectedRegId');
            const url = selectedRegId
                ? `${API_URL}/seller-portal/leads?regId=${selectedRegId}`
                : `${API_URL}/seller-portal/leads`;
            const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
            const d = await res.json();
            if (d.success) {
                setLeads(d.data || []);
                setBreakdown(d.breakdown || {});
            } else {
                toast.error(d.message || 'Failed to load leads');
            }
        } catch {
            toast.error('Failed to load leads');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchLeads(); }, []);

    // Reset to page 1 when tab or search changes
    useEffect(() => { setPage(1); }, [activeTab, search]);

    // ── Filter ────────────────────────────────────────────────────────────────
    const filtered = leads.filter(l => {
        const matchesTab = activeTab === 'all' || l.leadType === activeTab;
        const q = search.toLowerCase();
        const matchesSearch = !q || [l.name, l.company, l.email, l.phone, l.city, l.interest, l.registrationId]
            .some(f => f?.toLowerCase().includes(q));
        return matchesTab && matchesSearch;
    });

    const countOf = (type: LeadType) => type === 'all' ? leads.length : leads.filter(l => l.leadType === type).length;

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    if (loading) return (
        <div className="h-64 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-[#23471d] animate-spin" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Loading Leads...</p>
        </div>
    );

    return (
        <div className="space-y-5 pb-12 font-inter">
            <DashboardHero
                pageId="sl-leads"
                defaultTitle="Lead Management"
                defaultSubtitle={`${leads.length} Total Leads — Buyers & Visitors`}
                type="seller"
            />

            {/* Breakdown Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {[
                    { label: 'Domestic Buyers',        value: breakdown.domesticBuyers || 0,       icon: ShoppingBag, color: 'text-purple-600', bg: 'bg-purple-50' },
                    { label: 'Intl. Buyers',           value: breakdown.internationalBuyers || 0,  icon: Globe,       color: 'text-indigo-600', bg: 'bg-indigo-50' },
                    { label: 'Domestic Visitors',      value: breakdown.domesticVisitors || 0,     icon: Users,       color: 'text-emerald-600',bg: 'bg-emerald-50' },
                    { label: 'Intl. Visitors',         value: breakdown.internationalVisitors || 0,icon: Eye,         color: 'text-blue-600',   bg: 'bg-blue-50' },
                    { label: 'Product Enquiries',      value: breakdown.directEnquiries || 0,      icon: Package,     color: 'text-orange-600', bg: 'bg-orange-50' },
                ].map((s, i) => (
                    <div key={i} className="bg-white border border-slate-200 rounded-sm p-4 flex items-center gap-3 shadow-sm">
                        <div className={`w-9 h-9 ${s.bg} ${s.color} rounded-sm flex items-center justify-center shrink-0`}>
                            <s.icon size={18} />
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-tight">{s.label}</p>
                            <p className="text-lg font-black text-slate-800">{s.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tabs + Search */}
            <div className="bg-white border border-slate-200 rounded-sm p-4 shadow-sm space-y-3">
                <div className="flex flex-wrap gap-2">
                    <TabBtn active={activeTab === 'all'}                  onClick={() => setActiveTab('all')}                  label="All Leads"            count={countOf('all')} />
                    <TabBtn active={activeTab === 'domestic_buyer'}       onClick={() => setActiveTab('domestic_buyer')}       label="Domestic Buyers"      count={countOf('domestic_buyer')} />
                    <TabBtn active={activeTab === 'international_buyer'}  onClick={() => setActiveTab('international_buyer')}  label="Intl. Buyers"         count={countOf('international_buyer')} />
                    <TabBtn active={activeTab === 'domestic_visitor'}     onClick={() => setActiveTab('domestic_visitor')}     label="Domestic Visitors"    count={countOf('domestic_visitor')} />
                    <TabBtn active={activeTab === 'international_visitor'}onClick={() => setActiveTab('international_visitor')}label="Intl. Visitors"       count={countOf('international_visitor')} />
                    {countOf('product_enquiry') > 0 && (
                        <TabBtn active={activeTab === 'product_enquiry'} onClick={() => setActiveTab('product_enquiry')} label="Product Enquiries" count={countOf('product_enquiry')} />
                    )}
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                        <input
                            type="text"
                            placeholder="Search by name, company, email, city, interest..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-xs font-medium focus:outline-none focus:border-[#23471d]"
                        />
                    </div>
                    <button onClick={fetchLeads} className="px-4 py-2.5 border border-slate-200 text-slate-600 font-black text-[10px] uppercase rounded-sm flex items-center gap-2 hover:bg-slate-50">
                        <RefreshCw size={12} /> Refresh
                    </button>
                    <span className="text-[10px] font-black text-slate-400 uppercase whitespace-nowrap">
                        {filtered.length} shown
                    </span>
                </div>
            </div>

            {/* Leads Grid */}
            {filtered.length === 0 ? (
                <div className="h-64 bg-slate-50 border-2 border-dashed border-slate-200 rounded-sm flex flex-col items-center justify-center text-slate-400">
                    <Users size={40} className="mb-2 opacity-20" />
                    <p className="text-[11px] font-bold uppercase tracking-widest">No leads found</p>
                    {search && <p className="text-[10px] mt-1">Try clearing the search filter</p>}
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {paginated.map(lead => (
                            <LeadCard key={lead._id} lead={lead} />
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="bg-white border border-slate-200 rounded-sm px-5 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                Showing{' '}
                                <span className="text-[#23471d]">{(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)}</span>
                                {' '}of{' '}
                                <span className="text-[#23471d]">{filtered.length}</span> leads
                            </p>
                            <div className="flex items-center gap-1.5">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="px-3 py-1.5 border border-slate-200 bg-white text-xs font-black rounded-sm disabled:opacity-30 hover:bg-slate-50 transition-all"
                                >
                                    ← Prev
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1)
                                    .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
                                    .reduce<(number | '...')[]>((acc, p, idx, arr) => {
                                        if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push('...');
                                        acc.push(p);
                                        return acc;
                                    }, [])
                                    .map((p, i) =>
                                        p === '...' ? (
                                            <span key={`ellipsis-${i}`} className="px-2 text-slate-400 text-xs font-black">…</span>
                                        ) : (
                                            <button
                                                key={p}
                                                onClick={() => setPage(p as number)}
                                                className={`w-8 h-8 text-[11px] font-black border rounded-sm transition-all ${
                                                    page === p
                                                        ? 'bg-[#23471d] text-white border-[#23471d]'
                                                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                                                }`}
                                            >
                                                {p}
                                            </button>
                                        )
                                    )
                                }
                                <button
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                    className="px-3 py-1.5 border border-slate-200 bg-white text-xs font-black rounded-sm disabled:opacity-30 hover:bg-slate-50 transition-all"
                                >
                                    Next →
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
