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
                const selectedRegId = localStorage.getItem('selectedRegId');
                const regParam = selectedRegId ? `?regId=${selectedRegId}` : '';

                const [statsRes, meetingsRes] = await Promise.all([
                    fetch(`${API_URL}/seller-portal/stats${regParam}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    fetch(`${API_URL}/seller-portal/meeting-stats${regParam}`, {
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
        {
            label: "Profile Visibility",
            value: stats?.profileVisibility?.toLocaleString() || "0",
            sub: stats?.totalViews > 0 ? `${stats.totalViews} total views` : "No views yet",
            icon: Eye,
            color: "text-blue-600",
            bg: "bg-blue-50",
            trend: "up"
        },
        {
            label: "Total Leads",
            value: stats?.totalLeads || "0",
            sub: stats?.maxLeads > 0 ? `of ${stats.maxLeads} plan limit` : "All leads shown",
            icon: Users,
            color: "text-orange-600",
            bg: "bg-orange-50",
            trend: "up"
        },
        {
            label: "Meetings Conducted",
            value: meetingStats?.completedMeetings || "0",
            sub: meetingStats?.pendingMeetings > 0 ? `${meetingStats.pendingMeetings} pending` : "No pending",
            icon: Handshake,
            color: "text-purple-600",
            bg: "bg-purple-50",
            trend: "up"
        },
        {
            label: "Visibility Score",
            value: `${stats?.visibilityScore || 0}/100`,
            sub: stats?.subscriptionActive ? "Subscription active" : "Inactive",
            icon: Star,
            color: "text-amber-600",
            bg: "bg-amber-50",
            trend: "up"
        },
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
                {/* Stats Summary */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Performance Summary</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4 flex-1">
                        {[
                            { label: 'Total Product Views', value: stats?.totalViews || 0, color: 'bg-blue-50 text-blue-700' },
                            { label: 'Total Leads', value: stats?.totalLeads || 0, color: 'bg-orange-50 text-orange-700' },
                            { label: 'Meetings Completed', value: meetingStats?.completedMeetings || 0, color: 'bg-purple-50 text-purple-700' },
                            { label: 'Meetings Pending', value: meetingStats?.pendingMeetings || 0, color: 'bg-amber-50 text-amber-700' },
                            { label: 'Meetings Cancelled', value: meetingStats?.cancelledMeetings || 0, color: 'bg-red-50 text-red-700' },
                            { label: 'Profile Completion', value: `${stats?.profileCompletion || 0}%`, color: 'bg-green-50 text-green-700' },
                        ].map((item, i) => (
                            <div key={i} className={`rounded-lg p-4 ${item.color}`}>
                                <p className="text-[9px] font-black uppercase tracking-widest opacity-70 mb-1">{item.label}</p>
                                <p className="text-2xl font-black">{item.value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Subscription & Plan Info */}
                <div className="bg-slate-900 rounded-xl p-8 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10"><TrendingUp size={150} /></div>
                    <div className="relative z-10">
                        <h3 className="text-lg font-black uppercase tracking-tight mb-4 leading-tight">Subscription Status</h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-1">Plan</p>
                                <p className="text-xl font-black text-emerald-400">{stats?.planName || 'No Active Plan'}</p>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between text-[10px] font-bold uppercase">
                                    <span className="text-white/60">Status</span>
                                    <span className={stats?.subscriptionActive ? 'text-emerald-400' : 'text-red-400'}>
                                        {stats?.subscriptionActive ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                                <div className="flex justify-between text-[10px] font-bold uppercase">
                                    <span className="text-white/60">Days Remaining</span>
                                    <span className="text-white">{stats?.daysRemaining ?? '—'}</span>
                                </div>
                                <div className="flex justify-between text-[10px] font-bold uppercase">
                                    <span className="text-white/60">Visibility Score</span>
                                    <span className="text-white">{stats?.visibilityScore || 0}/100</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a href="/seller-portal/sponsorship"
                        className="w-full py-4 bg-[#d26019] text-white font-black text-[10px] uppercase tracking-widest rounded-xl mt-8 shadow-xl hover:bg-[#b8521a] transition-all text-center block">
                        {stats?.subscriptionActive ? 'Manage Subscription' : 'Upgrade Plan'}
                    </a>
                </div>
            </div>
        </div>
    );
}
