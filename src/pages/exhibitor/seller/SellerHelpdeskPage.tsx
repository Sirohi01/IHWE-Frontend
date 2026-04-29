import React, { useState, useEffect } from 'react';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import { 
    Phone,
    Zap, ChevronRight, 
    LifeBuoy, HelpCircle,
    CreditCard, FileText, Send
} from 'lucide-react';
import { toast } from 'sonner';
import { API_URL } from '@/lib/api';
import DashboardHero from '@/components/dashboard/DashboardHero';

export default function SellerHelpdeskPage() {
    const { } = useExhibitorCtx() || {};
    const [tickets, setTickets] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        category: 'Technical Support',
        priority: 'Standard',
        description: ''
    });

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('exhibitorToken');
            const selectedRegId = localStorage.getItem('selectedRegId');
            const url = selectedRegId
                ? `${API_URL}/seller-portal/service-requests?regId=${selectedRegId}`
                : `${API_URL}/seller-portal/service-requests`;
            const res = await fetch(url, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const d = await res.json();
            if (d.success) {
                // Show only helpdesk tickets on this page
                const helpdeskTickets = (d.data || []).filter((t: any) => t.serviceType === 'helpdesk');
                setTickets(helpdeskTickets);
            }
        } catch (err) {
            console.error('Failed to fetch tickets:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!form.description.trim()) {
            toast.error('Please describe your issue');
            return;
        }

        setSubmitting(true);
        try {
            const token = localStorage.getItem('exhibitorToken');
            const selectedRegId = localStorage.getItem('selectedRegId');
            const res = await fetch(`${API_URL}/seller-portal/service-request`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}` 
                },
                body: JSON.stringify({
                    serviceType: 'helpdesk',
                    serviceName: form.category,
                    ...(selectedRegId && { regId: selectedRegId }),
                    details: {
                        category: form.category,
                        priority: form.priority,
                        description: form.description
                    }
                })
            });
            const d = await res.json();
            
            if (d.success) {
                toast.success('Support ticket submitted successfully!');
                setForm({ category: 'Technical Support', priority: 'Standard', description: '' });
                fetchTickets();
            } else {
                toast.error(d.message || 'Failed to submit ticket');
            }
        } catch (err) {
            console.error('Submit error:', err);
            toast.error('Failed to submit ticket');
        } finally {
            setSubmitting(false);
        }
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffHours / 24);
        
        if (diffHours < 1) return 'Just now';
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        return date.toLocaleDateString('en-IN');
    };

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'resolved':
            case 'completed':
                return 'bg-emerald-50 text-emerald-600';
            case 'pending':
            case 'open':
                return 'bg-orange-50 text-orange-600';
            case 'in-progress':
                return 'bg-blue-50 text-blue-600';
            default:
                return 'bg-slate-50 text-slate-600';
        }
    };

    return (
        <div className="space-y-8 pb-12 font-inter">
            <DashboardHero 
                pageId="sl-helpdesk" 
                defaultTitle="Helpdesk & Support" 
                defaultSubtitle="Dedicated assistance and knowledge base for your expo participation"
                type="seller" 
            />

            <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="hidden md:block">
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                        <LifeBuoy size={12} className="text-orange-500" /> Professional support 24/7
                    </p>
                </div>
            </header>

            {/* Quick Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Technical Support", value: "+91-9654900525", icon: Zap, color: "text-blue-600", bg: "bg-blue-50" },
                    { label: "Accounts & Billing", value: "info@namogangewellness.com", icon: CreditCard, color: "text-emerald-600", bg: "bg-emerald-50" },
                    { label: "Founder", value: "Dr. Vijay Sharma", icon: HelpCircle, color: "text-purple-600", bg: "bg-purple-50" },
                ].map((c, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 hover:border-[#23471d] transition-all cursor-pointer group">
                        <div className={`w-12 h-12 ${c.bg} ${c.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            <c.icon size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{c.label}</p>
                            <p className="text-sm font-black text-slate-800">{c.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Raise Ticket Section */}
                <div className="lg:col-span-2 space-y-6">
                    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6">Raise a Support Ticket</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Support Category</label>
                                <select 
                                    value={form.category}
                                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold uppercase focus:outline-none focus:border-[#23471d]"
                                >
                                    <option>Technical Support</option>
                                    <option>Payment & Invoices</option>
                                    <option>Stall & Logistics</option>
                                    <option>Documentation</option>
                                    <option>Product Catalog</option>
                                    <option>Lead Management</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Priority Level</label>
                                <select 
                                    value={form.priority}
                                    onChange={(e) => setForm({ ...form, priority: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold uppercase focus:outline-none focus:border-[#23471d]"
                                >
                                    <option>Standard</option>
                                    <option>Urgent</option>
                                    <option>Critical</option>
                                </select>
                            </div>
                        </div>
                        <div className="space-y-2 mb-6">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Describe Your Issue</label>
                            <textarea 
                                rows={4}
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:border-[#23471d]"
                                placeholder="Tell us how we can help you..."
                                required
                            />
                        </div>
                        <button 
                            type="submit"
                            disabled={submitting}
                            className="px-8 py-3 bg-slate-800 text-white font-black text-[10px] uppercase tracking-widest rounded-lg flex items-center gap-2 hover:bg-black transition-all disabled:opacity-50"
                        >
                            {submitting ? (
                                <><div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" /> Submitting...</>
                            ) : (
                                <>Submit Ticket <Send size={14} /></>
                            )}
                        </button>
                    </form>

                    {/* Recent Tickets List */}
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-widest">My Support History</h3>
                            <span className="text-[10px] font-black text-slate-400 uppercase">{tickets.length} Tickets</span>
                        </div>
                        {loading ? (
                            <div className="px-6 py-12 flex items-center justify-center">
                                <div className="w-6 h-6 border-4 border-slate-200 border-t-[#23471d] rounded-full animate-spin" />
                            </div>
                        ) : tickets.length === 0 ? (
                            <div className="px-6 py-12 text-center">
                                <FileText size={32} className="text-slate-300 mx-auto mb-3" />
                                <p className="text-sm font-bold text-slate-400">No support tickets yet</p>
                                <p className="text-xs text-slate-400 mt-1">Submit your first ticket above</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-50">
                                {tickets.slice(0, 10).map((t, i) => (
                                    <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center text-slate-400">
                                                <FileText size={16} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-800">{t.serviceName || 'Support Request'}</p>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                                                    {t.details?.category || t.serviceType} • {formatDate(t.createdAt)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase ${getStatusColor(t.status)}`}>
                                                {t.status || 'Pending'}
                                            </span>
                                            <ChevronRight size={16} className="text-slate-300" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* FAQ / Knowledge Base */}
                <div className="space-y-6">
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm">
                        <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-6">Frequently Asked Questions</h3>
                        <div className="space-y-4">
                            {[
                                "How to update company profile?",
                                "When will I get my badge?",
                                "How to book extra furniture?",
                                "What is the move-in schedule?",
                                "How to export visitor leads?",
                            ].map((q, i) => (
                                <div key={i} className="flex items-start gap-2 group cursor-pointer">
                                    <HelpCircle size={14} className="text-slate-400 mt-0.5 shrink-0" />
                                    <p className="text-[11px] font-bold text-slate-600 group-hover:text-[#23471d] transition-colors">{q}</p>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-8 py-3 bg-white border border-slate-200 text-slate-700 font-black text-[10px] uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 hover:bg-slate-100 transition-all">
                            Visit Knowledge Base
                        </button>
                    </div>

                    <div className="bg-gradient-to-br from-[#23471d] to-[#1a3516] p-6 rounded-xl text-white shadow-lg">
                        <h3 className="text-sm font-black uppercase tracking-widest mb-4">Urgent Assistance?</h3>
                        <p className="text-xs text-white/70 leading-relaxed mb-6">
                            For immediate on-ground support during the event days, please visit the Organizer's Office in Hall 9 or call our 24/7 hotline.
                        </p>
                        <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                            <Phone size={18} className="text-white" />
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest">24/7 Hotline</p>
                                <p className="text-sm font-black">+91 9654900525</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
