import React, { useState, useEffect } from 'react';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import { 
    Users, Search, Filter, Download, 
    Mail, Phone, MessageSquare, Star,
    CheckCircle2, Clock, Globe, ArrowUpRight,
    Loader2, Package, Calendar, Send, Heart,
    TrendingUp, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_URL } from '@/lib/api';
import { toast } from 'sonner';
import DashboardHero from '@/components/dashboard/DashboardHero';

export default function SellerLeadsPage() {
    const { data } = useExhibitorCtx();
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [priorityFilter, setPriorityFilter] = useState("all");
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    const fetchLeads = async () => {
        try {
            const token = localStorage.getItem('exhibitorToken');
            const res = await fetch(`${API_URL}/seller-portal/leads`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const d = await res.json();
            if (d.success) setLeads(d.data);
        } catch (err) {
            toast.error("Failed to load leads");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    const handleMarkInterested = async (leadId: string) => {
        setActionLoading(leadId);
        try {
            const token = localStorage.getItem('exhibitorToken');
            const res = await fetch(`${API_URL}/seller-portal/leads/${leadId}/mark-interested`, {
                method: 'PATCH',
                headers: { Authorization: `Bearer ${token}` }
            });
            const d = await res.json();
            if (d.success) {
                toast.success('Lead marked as interested');
                setLeads(prev => prev.map(l => l._id === leadId ? { ...l, interested: true } : l));
            } else {
                toast.error(d.message || 'Failed to mark as interested');
            }
        } catch (err) {
            toast.error('Failed to mark as interested');
        } finally {
            setActionLoading(null);
        }
    };

    const handleScheduleMeeting = async (leadId: string, visitorName: string) => {
        setActionLoading(leadId);
        try {
            const token = localStorage.getItem('exhibitorToken');
            const res = await fetch(`${API_URL}/seller-portal/leads/${leadId}/schedule-meeting`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}` 
                },
                body: JSON.stringify({ visitorName })
            });
            const d = await res.json();
            if (d.success) {
                toast.success('Meeting request sent successfully');
            } else {
                toast.error(d.message || 'Failed to schedule meeting');
            }
        } catch (err) {
            toast.error('Failed to schedule meeting');
        } finally {
            setActionLoading(null);
        }
    };

    const handleSendBrochure = async (leadId: string, email: string) => {
        if (!email) {
            toast.error('Email not available for this lead');
            return;
        }
        setActionLoading(leadId);
        try {
            const token = localStorage.getItem('exhibitorToken');
            const res = await fetch(`${API_URL}/seller-portal/leads/${leadId}/send-brochure`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}` 
                },
                body: JSON.stringify({ email })
            });
            const d = await res.json();
            if (d.success) {
                toast.success('Brochure sent successfully');
            } else {
                toast.error(d.message || 'Failed to send brochure');
            }
        } catch (err) {
            toast.error('Failed to send brochure');
        } finally {
            setActionLoading(null);
        }
    };

    const handleSetPriority = async (leadId: string, priority: string) => {
        setActionLoading(leadId);
        try {
            const token = localStorage.getItem('exhibitorToken');
            const res = await fetch(`${API_URL}/seller-portal/leads/${leadId}/set-priority`, {
                method: 'PATCH',
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}` 
                },
                body: JSON.stringify({ priority })
            });
            const d = await res.json();
            if (d.success) {
                toast.success(`Priority set to ${priority}`);
                setLeads(prev => prev.map(l => l._id === leadId ? { ...l, priority } : l));
            } else {
                toast.error(d.message || 'Failed to set priority');
            }
        } catch (err) {
            toast.error('Failed to set priority');
        } finally {
            setActionLoading(null);
        }
    };

    const handleConvertToOpportunity = async (leadId: string) => {
        setActionLoading(leadId);
        try {
            const token = localStorage.getItem('exhibitorToken');
            const res = await fetch(`${API_URL}/seller-portal/leads/${leadId}/convert-opportunity`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` }
            });
            const d = await res.json();
            if (d.success) {
                toast.success('Lead converted to business opportunity');
                setLeads(prev => prev.map(l => l._id === leadId ? { ...l, status: 'opportunity' } : l));
            } else {
                toast.error(d.message || 'Failed to convert');
            }
        } catch (err) {
            toast.error('Failed to convert lead');
        } finally {
            setActionLoading(null);
        }
    };

    const filteredLeads = leads.filter(l => {
        const matchesSearch = l.visitorName.toLowerCase().includes(search.toLowerCase()) || 
                             l.productId?.name?.toLowerCase().includes(search.toLowerCase());
        const matchesSource = filter === 'all' || l.source === filter;
        const matchesPriority = priorityFilter === 'all' || l.priority === priorityFilter;
        return matchesSearch && matchesSource && matchesPriority;
    });

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'bg-red-50 text-red-600 border-red-200';
            case 'medium': return 'bg-orange-50 text-orange-600 border-orange-200';
            case 'low': return 'bg-blue-50 text-blue-600 border-blue-200';
            default: return 'bg-slate-50 text-slate-600 border-slate-200';
        }
    };

    if (loading) return (
        <div className="h-64 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-[#23471d] animate-spin" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Syncing Leads...</p>
        </div>
    );

    return (
        <div className="space-y-6 pb-12 font-inter">
            <DashboardHero 
                pageId="sl-leads" 
                defaultTitle="Lead Management" 
                defaultSubtitle={`${leads.length} Verified Buyer Leads Found`}
                type="seller" 
            />

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="hidden md:block">
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                        <Users size={12} className="text-orange-500" /> Real-time inquiry tracking
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="px-4 py-2 bg-slate-100 text-slate-600 font-black text-[10px] uppercase tracking-widest rounded-lg flex items-center gap-2 hover:bg-slate-200 transition-all">
                        <Download size={14} /> Export CSV
                    </button>
                    <button className="px-4 py-2 bg-[#23471d] text-white font-black text-[10px] uppercase tracking-widest rounded-lg flex items-center gap-2 shadow-lg hover:bg-[#1a3516] transition-all">
                        <Star size={14} className="fill-current" /> Priority Leads
                    </button>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                        type="text" 
                        placeholder="Search by buyer name, company, or requirement..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#23471d] font-medium"
                    />
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <select 
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold uppercase tracking-wider focus:outline-none"
                    >
                        <option value="all">All Sources</option>
                        <option value="web">Web Inquiry</option>
                        <option value="visitor">Visitor Scan</option>
                        <option value="buyer">Direct Buyer</option>
                    </select>
                    <select 
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)}
                        className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold uppercase tracking-wider focus:outline-none"
                    >
                        <option value="all">All Priority</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                </div>
            </div>

            {/* Leads List */}
            <div className="grid grid-cols-1 gap-4">
                {!filteredLeads.length ? (
                    <div className="h-64 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400">
                        <Users size={40} className="mb-2 opacity-20" />
                        <p className="text-[11px] font-bold uppercase tracking-widest">No matching leads found</p>
                    </div>
                ) : (
                    filteredLeads.map((lead, i) => (
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            key={lead._id} 
                            className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-all group"
                        >
                            <div className="p-5 flex flex-col gap-4">
                                {/* Header */}
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-center gap-4 flex-1">
                                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center shrink-0 border border-slate-200">
                                            <span className="text-sm font-black text-slate-600">{lead.visitorName.charAt(0)}</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">{lead.visitorName}</h3>
                                                <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-widest ${
                                                    lead.source === 'web' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'
                                                }`}>{lead.source} inquiry</span>
                                                {lead.interested && (
                                                    <span className="text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-widest bg-pink-50 text-pink-600 flex items-center gap-1">
                                                        <Heart size={8} className="fill-current" /> Interested
                                                    </span>
                                                )}
                                                {lead.priority && (
                                                    <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-widest border ${getPriorityColor(lead.priority)}`}>
                                                        {lead.priority} priority
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                                                <p className="text-[10px] text-slate-500 font-bold flex items-center gap-1"><Globe size={10} /> {lead.visitorEmail || "No Email"}</p>
                                                <p className="text-[10px] text-slate-400 font-bold flex items-center gap-1"><Clock size={10} /> {new Date(lead.createdAt).toLocaleDateString()}</p>
                                                {lead.productId?.name && (
                                                    <p className="text-[10px] text-slate-400 font-bold flex items-center gap-1"><Package size={10} /> {lead.productId.name}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100">
                                    {lead.visitorEmail && (
                                        <a href={`mailto:${lead.visitorEmail}`} className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors text-[10px] font-bold uppercase flex items-center gap-1">
                                            <Mail size={12} /> Email
                                        </a>
                                    )}
                                    {lead.visitorPhone && (
                                        <a href={`tel:${lead.visitorPhone}`} className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors text-[10px] font-bold uppercase flex items-center gap-1">
                                            <Phone size={12} /> Call
                                        </a>
                                    )}
                                    {!lead.interested && (
                                        <button 
                                            onClick={() => handleMarkInterested(lead._id)}
                                            disabled={actionLoading === lead._id}
                                            className="px-3 py-1.5 bg-pink-50 border border-pink-200 rounded-lg text-pink-600 hover:bg-pink-100 transition-colors text-[10px] font-bold uppercase flex items-center gap-1 disabled:opacity-50"
                                        >
                                            <Heart size={12} /> Mark Interested
                                        </button>
                                    )}
                                    <button 
                                        onClick={() => handleScheduleMeeting(lead._id, lead.visitorName)}
                                        disabled={actionLoading === lead._id}
                                        className="px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg text-blue-600 hover:bg-blue-100 transition-colors text-[10px] font-bold uppercase flex items-center gap-1 disabled:opacity-50"
                                    >
                                        <Calendar size={12} /> Schedule Meeting
                                    </button>
                                    <button 
                                        onClick={() => handleSendBrochure(lead._id, lead.visitorEmail)}
                                        disabled={actionLoading === lead._id || !lead.visitorEmail}
                                        className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-600 hover:bg-emerald-100 transition-colors text-[10px] font-bold uppercase flex items-center gap-1 disabled:opacity-50"
                                    >
                                        <Send size={12} /> Send Brochure
                                    </button>
                                    {!lead.priority && (
                                        <select 
                                            onChange={(e) => handleSetPriority(lead._id, e.target.value)}
                                            disabled={actionLoading === lead._id}
                                            className="px-3 py-1.5 bg-orange-50 border border-orange-200 rounded-lg text-orange-600 text-[10px] font-bold uppercase disabled:opacity-50"
                                        >
                                            <option value="">Set Priority</option>
                                            <option value="high">High</option>
                                            <option value="medium">Medium</option>
                                            <option value="low">Low</option>
                                        </select>
                                    )}
                                    {lead.status !== 'opportunity' && (
                                        <button 
                                            onClick={() => handleConvertToOpportunity(lead._id)}
                                            disabled={actionLoading === lead._id}
                                            className="px-3 py-1.5 bg-[#d26019] text-white rounded-lg hover:bg-[#b8521a] transition-colors text-[10px] font-bold uppercase flex items-center gap-1 disabled:opacity-50"
                                        >
                                            <TrendingUp size={12} /> Convert to Opportunity
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            {/* Pagination / Load More */}
            <div className="flex justify-center mt-8">
                <button onClick={fetchLeads} className="px-8 py-3 bg-white border border-slate-200 text-slate-500 font-black text-[10px] uppercase tracking-widest rounded-lg hover:bg-slate-50 transition-all flex items-center gap-2">
                    Refresh Leads <ArrowUpRight size={14} />
                </button>
            </div>
        </div>
    );
}
