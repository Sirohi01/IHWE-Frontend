import React, { useState, useEffect } from 'react';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import { 
    Bell, CheckCircle2, AlertCircle, Info, 
    Clock, DollarSign, FileText, Users,
    Calendar, Package, Award, Trash2,
    Filter, Search, RefreshCw, CheckCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_URL } from '@/lib/api';
import { toast } from 'sonner';
import DashboardHero from '@/components/dashboard/DashboardHero';

interface Notification {
    _id: string;
    type: 'payment' | 'document' | 'meeting' | 'lead' | 'event' | 'approval' | 'general';
    title: string;
    message: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    read: boolean;
    actionUrl?: string;
    createdAt: string;
}

const NOTIFICATION_ICONS = {
    payment: DollarSign,
    document: FileText,
    meeting: Calendar,
    lead: Users,
    event: Bell,
    approval: CheckCircle2,
    general: Info
};

const NOTIFICATION_COLORS = {
    payment: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200' },
    document: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
    meeting: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
    lead: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200' },
    event: { bg: 'bg-cyan-50', text: 'text-cyan-600', border: 'border-cyan-200' },
    approval: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' },
    general: { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200' }
};

const PRIORITY_COLORS = {
    low: 'bg-slate-100 text-slate-600',
    medium: 'bg-blue-100 text-blue-700',
    high: 'bg-orange-100 text-orange-700',
    urgent: 'bg-red-100 text-red-700'
};

export default function SellerNotificationsPage() {
    const { data } = useExhibitorCtx();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
    const [typeFilter, setTypeFilter] = useState<string>('all');
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('exhibitorToken');
            const res = await fetch(`${API_URL}/seller-portal/notifications`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const d = await res.json();
            if (d.success) {
                setNotifications(d.data || []);
            }
        } catch (err) {
            console.error(err);
            toast.error('Failed to load notifications');
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (id: string) => {
        try {
            const token = localStorage.getItem('exhibitorToken');
            const res = await fetch(`${API_URL}/seller-portal/notifications/${id}/read`, {
                method: 'PATCH',
                headers: { Authorization: `Bearer ${token}` }
            });
            const d = await res.json();
            if (d.success) {
                setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
            }
        } catch (err) {
            console.error(err);
        }
    };

    const markAllAsRead = async () => {
        try {
            const token = localStorage.getItem('exhibitorToken');
            const res = await fetch(`${API_URL}/seller-portal/notifications/mark-all-read`, {
                method: 'PATCH',
                headers: { Authorization: `Bearer ${token}` }
            });
            const d = await res.json();
            if (d.success) {
                setNotifications(prev => prev.map(n => ({ ...n, read: true })));
                toast.success('All notifications marked as read');
            }
        } catch (err) {
            toast.error('Failed to mark all as read');
        }
    };

    const deleteNotification = async (id: string) => {
        try {
            const token = localStorage.getItem('exhibitorToken');
            const res = await fetch(`${API_URL}/seller-portal/notifications/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            const d = await res.json();
            if (d.success) {
                setNotifications(prev => prev.filter(n => n._id !== id));
                toast.success('Notification deleted');
            }
        } catch (err) {
            toast.error('Failed to delete notification');
        }
    };

    const filteredNotifications = notifications.filter(n => {
        const matchesReadFilter = filter === 'all' || (filter === 'unread' && !n.read) || (filter === 'read' && n.read);
        const matchesTypeFilter = typeFilter === 'all' || n.type === typeFilter;
        const matchesSearch = search === '' || n.title.toLowerCase().includes(search.toLowerCase()) || n.message.toLowerCase().includes(search.toLowerCase());
        return matchesReadFilter && matchesTypeFilter && matchesSearch;
    });

    const unreadCount = notifications.filter(n => !n.read).length;

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffHours / 24);
        
        if (diffHours < 1) return 'Just now';
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString('en-IN');
    };

    return (
        <div className="space-y-6 pb-12 font-inter">
            <DashboardHero 
                pageId="sl-notifications" 
                defaultTitle="Notifications Center" 
                defaultSubtitle="Stay updated with all your expo activities and alerts"
                type="seller" 
            />

            {/* Header Actions */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-4 py-2">
                        <Bell size={16} className="text-[#d26019]" />
                        <span className="text-sm font-bold text-slate-700">{unreadCount} Unread</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={fetchNotifications} className="px-4 py-2 border border-slate-200 text-slate-600 font-black text-[10px] uppercase tracking-widest rounded-lg flex items-center gap-2 hover:bg-slate-50">
                        <RefreshCw size={12} /> Refresh
                    </button>
                    {unreadCount > 0 && (
                        <button onClick={markAllAsRead} className="px-4 py-2 bg-[#23471d] text-white font-black text-[10px] uppercase tracking-widest rounded-lg flex items-center gap-2 hover:bg-[#1a3516]">
                            <CheckCheck size={12} /> Mark All Read
                        </button>
                    )}
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                        type="text" 
                        placeholder="Search notifications..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#23471d]"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <select 
                        value={filter}
                        onChange={(e) => setFilter(e.target.value as any)}
                        className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold uppercase focus:outline-none"
                    >
                        <option value="all">All</option>
                        <option value="unread">Unread</option>
                        <option value="read">Read</option>
                    </select>
                    <select 
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold uppercase focus:outline-none"
                    >
                        <option value="all">All Types</option>
                        <option value="payment">Payment</option>
                        <option value="document">Document</option>
                        <option value="meeting">Meeting</option>
                        <option value="lead">Lead</option>
                        <option value="event">Event</option>
                        <option value="approval">Approval</option>
                    </select>
                </div>
            </div>

            {/* Notifications List */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="w-8 h-8 border-4 border-[#23471d]/20 border-t-[#23471d] rounded-full animate-spin" />
                </div>
            ) : filteredNotifications.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-lg p-16 text-center">
                    <Bell size={48} className="text-slate-300 mx-auto mb-4" />
                    <p className="text-sm font-black text-slate-400 uppercase tracking-wide">No Notifications Found</p>
                    <p className="text-xs text-slate-400 mt-1">You're all caught up!</p>
                </div>
            ) : (
                <div className="space-y-3">
                    <AnimatePresence>
                        {filteredNotifications.map((notif, i) => {
                            const Icon = NOTIFICATION_ICONS[notif.type];
                            const colors = NOTIFICATION_COLORS[notif.type];
                            const priorityColor = PRIORITY_COLORS[notif.priority];

                            return (
                                <motion.div
                                    key={notif._id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ delay: i * 0.05 }}
                                    className={`bg-white border-2 rounded-lg overflow-hidden hover:shadow-md transition-all ${
                                        notif.read ? 'border-slate-200' : 'border-[#d26019] bg-orange-50/30'
                                    }`}
                                >
                                    <div className="p-5 flex items-start gap-4">
                                        <div className={`w-12 h-12 ${colors.bg} ${colors.text} rounded-lg flex items-center justify-center shrink-0 border ${colors.border}`}>
                                            <Icon size={22} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-4 mb-2">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 flex-wrap mb-1">
                                                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">{notif.title}</h3>
                                                        {!notif.read && (
                                                            <span className="w-2 h-2 bg-[#d26019] rounded-full animate-pulse" />
                                                        )}
                                                        <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase ${priorityColor}`}>
                                                            {notif.priority}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-slate-600 leading-relaxed">{notif.message}</p>
                                                </div>
                                                <div className="flex items-center gap-2 shrink-0">
                                                    {!notif.read && (
                                                        <button
                                                            onClick={() => markAsRead(notif._id)}
                                                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                                            title="Mark as read"
                                                        >
                                                            <CheckCircle2 size={16} className="text-slate-400 hover:text-green-600" />
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => deleteNotification(notif._id)}
                                                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={16} className="text-slate-400 hover:text-red-600" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 text-[10px] text-slate-400 font-bold">
                                                <span className="flex items-center gap-1">
                                                    <Clock size={10} /> {formatDate(notif.createdAt)}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Package size={10} /> {notif.type}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}
