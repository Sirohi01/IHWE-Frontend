import React, { useState, useEffect } from 'react';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import { 
    BarChart3, TrendingUp, Users, 
    Download, Calendar, ArrowUpRight, 
    Eye, Handshake, Star, ArrowDownRight,
    Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { API_URL } from '@/lib/api';
import DashboardHero from '@/components/dashboard/DashboardHero';

export default function SellerReportsPage() {
    const { data } = useExhibitorCtx();
    const [stats, setStats] = useState<any>(null);
    const [meetingStats, setMeetingStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('exhibitorToken');
                const [statsRes, meetingsRes] = await Promise.all([
                    fetch(`${API_URL}/seller-portal/stats`, {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    fetch(`${API_URL}/seller-portal/meeting-stats`, {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                ]);
                
                const statsData = await statsRes.json();
                const meetingsData = await meetingsRes.json();
                
                if (statsData.success) setStats(statsData.data);
                if (meetingsData.success) setMeetingStats(meetingsData.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return (
        <div className="h-64 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-[#23471d] animate-spin" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Analyzing Performance...</p>
        </div>
    );

    const metrics = [
        { label: "Profile Visibility", value: stats?.profileVisibility?.toLocaleString() || "0", sub: "+15% vs last week", icon: Eye, color: "text-blue-600", bg: "bg-blue-50", trend: "up" },
        { label: "Total Leads", value: stats?.totalLeads || "0", sub: "Based on inquiries", icon: Users, color: "text-orange-600", bg: "bg-orange-50", trend: "up" },
        { label: "Meetings Conducted", value: meetingStats?.completedMeetings || "0", sub: `${meetingStats?.pendingMeetings || 0} pending`, icon: Handshake, color: "text-purple-600", bg: "bg-purple-50", trend: "up" },
        { label: "Visibility Score", value: `${stats?.visibilityScore || 85}/100`, sub: "Top 5% in category", icon: Star, color: "text-amber-600", bg: "bg-amber-50", trend: "up" },
    ];

    return (
        <div className="space-y-8 pb-12 font-inter">
            <DashboardHero 
                pageId="sl-reports" 
                defaultTitle="Business Intelligence" 
                defaultSubtitle="Analyze your performance and ROI at IHWE 2026"
                type="seller" 
            />

            <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="hidden md:block">
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                        <BarChart3 size={12} className="text-[#23471d]" /> Real-time analytics dashboard
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="px-4 py-2 bg-white border border-slate-200 rounded-lg flex items-center gap-2 text-xs font-bold text-slate-600">
                        <Calendar size={14} /> Last 30 Days
                    </div>
                    <button className="px-6 py-2.5 bg-[#23471d] text-white font-black text-[10px] uppercase tracking-widest rounded-lg shadow-lg hover:bg-[#1a3516] transition-all flex items-center gap-2">
                        <Download size={14} /> Download PDF Report
                    </button>
                </div>
            </header>

            {/* Performance Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((m, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm group hover:border-[#23471d] transition-all">
                        <div className={`w-10 h-10 ${m.bg} ${m.color} rounded-lg flex items-center justify-center mb-4`}>
                            <m.icon size={20} />
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{m.label}</p>
                        <p className="text-2xl font-black text-slate-800 mb-2">{m.value}</p>
                        <div className="flex items-center gap-1.5">
                            {m.trend === 'up' ? <ArrowUpRight size={14} className="text-emerald-500" /> : <ArrowDownRight size={14} className="text-rose-500" />}
                            <span className={`text-[10px] font-bold uppercase ${m.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>{m.sub}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Visual Chart Placeholder */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Visibility & Engagement</h3>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-[#23471d] rounded-full" />
                                <span className="text-[10px] font-bold text-slate-500 uppercase">Profile Views</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-[#d26019] rounded-full" />
                                <span className="text-[10px] font-bold text-slate-500 uppercase">Inquiries</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 min-h-[300px] flex items-end justify-between gap-2 px-4 pb-4">
                        {[40, 65, 45, 90, 55, 75, 85, 45, 60, 95, 70, 80].map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                <div className="w-full bg-[#23471d]/10 rounded-t-lg relative group overflow-hidden" style={{ height: `${h}%` }}>
                                    <div className="absolute bottom-0 left-0 w-full bg-[#23471d] group-hover:bg-[#d26019] transition-all" style={{ height: '70%' }} />
                                </div>
                                <span className="text-[8px] font-bold text-slate-400 uppercase">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ROI Analysis Card */}
                <div className="bg-slate-900 rounded-xl p-8 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10"><TrendingUp size={150} /></div>
                    <div className="relative z-10">
                        <h3 className="text-lg font-black uppercase tracking-tight mb-4 leading-tight">Estimated ROI Analysis</h3>
                        <div className="space-y-6">
                            <div>
                                <p className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-1">Projected Business</p>
                                <p className="text-3xl font-black text-emerald-400">₹ 4.5M+</p>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between text-[10px] font-bold uppercase text-white/60">
                                    <span>High Intent Leads</span>
                                    <span>12</span>
                                </div>
                                <div className="flex justify-between text-[10px] font-bold uppercase text-white/60">
                                    <span>Meeting ROI Factor</span>
                                    <span>4.2x</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="w-full py-4 bg-[#d26019] text-white font-black text-[10px] uppercase tracking-widest rounded-xl mt-8 shadow-xl hover:bg-[#b8521a] transition-all">
                        View Detailed Breakdown
                    </button>
                </div>
            </div>
        </div>
    );
}
