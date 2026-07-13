import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bell, MessageSquare, CreditCard, User, Info, CheckCheck,
    BellRing, Calendar, ChevronRight, FileText, Megaphone,
    Users, MoreVertical, Search, Filter, Headphones, Mail, PhoneCall
} from 'lucide-react';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '@/lib/api';
import { toast } from 'sonner';

// Type configurations for icons and colors
const typeConfig = {
    payment: { icon: <CreditCard size={18} />, bg: 'bg-red-50', text: 'text-red-500', badge: 'bg-red-100', badgeText: 'text-red-600', label: 'Payment' },
    document: { icon: <FileText size={18} />, bg: 'bg-blue-50', text: 'text-blue-500', badge: 'bg-blue-100', badgeText: 'text-blue-600', label: 'Document' },
    booking: { icon: <FileText size={18} />, bg: 'bg-blue-50', text: 'text-blue-500', badge: 'bg-blue-100', badgeText: 'text-blue-600', label: 'Booking' },
    meeting: { icon: <Users size={18} />, bg: 'bg-indigo-50', text: 'text-indigo-500', badge: 'bg-indigo-100', badgeText: 'text-indigo-600', label: 'Meeting' },
    lead: { icon: <Users size={18} />, bg: 'bg-indigo-50', text: 'text-indigo-500', badge: 'bg-indigo-100', badgeText: 'text-indigo-600', label: 'Lead' },
    event: { icon: <Calendar size={18} />, bg: 'bg-teal-50', text: 'text-teal-500', badge: 'bg-teal-100', badgeText: 'text-teal-600', label: 'Event' },
    approval: { icon: <CheckCheck size={18} />, bg: 'bg-emerald-50', text: 'text-emerald-500', badge: 'bg-emerald-100', badgeText: 'text-emerald-600', label: 'Approval' },
    update: { icon: <Megaphone size={18} />, bg: 'bg-orange-50', text: 'text-orange-500', badge: 'bg-orange-100', badgeText: 'text-orange-600', label: 'Update' },
    general: { icon: <Info size={18} />, bg: 'bg-slate-50', text: 'text-slate-500', badge: 'bg-slate-100', badgeText: 'text-slate-600', label: 'System' },
};

export default function Notification() {
    const { data } = useExhibitorCtx();
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('All');

    // Fetch Notifications
    const fetchNotifications = async () => {
        try {
            const token = localStorage.getItem('exhibitorToken');
            const res = await fetch(`${API_URL}/seller-portal/notifications`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const result = await res.json();
            if (result.success) {
                setNotifications(result.data);
            }
        } catch (error) {
            console.error("Failed to load notifications", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    // Mark single as read
    const markAsRead = async (id, currentReadStatus) => {
        if (currentReadStatus) return; // already read

        // Optimistic update
        setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));

        try {
            const token = localStorage.getItem('exhibitorToken');
            await fetch(`${API_URL}/seller-portal/notifications/${id}/read`, {
                method: 'PATCH',
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (error) {
            console.error("Failed to mark as read", error);
        }
    };

    // Mark all as read
    const markAllRead = async () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        try {
            const token = localStorage.getItem('exhibitorToken');
            const res = await fetch(`${API_URL}/seller-portal/notifications/mark-all-read`, {
                method: 'PATCH',
                headers: { Authorization: `Bearer ${token}` }
            });
            const result = await res.json();
            if (result.success) {
                toast.success("All notifications marked as read");
            }
        } catch (error) {
            toast.error("Failed to mark all as read");
        }
    };

    // Calculate Stats
    const totalCount = notifications.length;
    const unreadCount = notifications.filter(n => !n.read).length;
    const importantCount = notifications.filter(n => n.priority === 'high' || n.priority === 'urgent').length;

    // This Week calculation
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const thisWeekCount = notifications.filter(n => new Date(n.createdAt) >= oneWeekAgo).length;

    // Type filters for the sidebar
    const bookingsCount = notifications.filter(n => n.type === 'approval' || n.type === 'document').length;
    const paymentsCount = notifications.filter(n => n.type === 'payment').length;
    const updatesCount = notifications.filter(n => n.type === 'update' || n.type === 'general' || n.type === 'event').length;

    // Filtering logic for the list
    const filteredNotifications = useMemo(() => {
        let filtered = notifications;
        if (statusFilter === 'Unread') filtered = filtered.filter(n => !n.read);
        else if (statusFilter === 'Important') filtered = filtered.filter(n => n.priority === 'high' || n.priority === 'urgent');
        else if (statusFilter === 'Bookings') filtered = filtered.filter(n => n.type === 'approval' || n.type === 'document');
        else if (statusFilter === 'Payments') filtered = filtered.filter(n => n.type === 'payment');
        else if (statusFilter === 'Updates') filtered = filtered.filter(n => n.type === 'update' || n.type === 'general' || n.type === 'event');

        return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }, [notifications, statusFilter]);

    return (
        <div className="w-full pb-6 space-y-2 px-4 md:px-6 lg:px-8 max-w-[1400px] mx-auto pt-4">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200 shadow-sm rounded-xl p-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center border border-emerald-100 flex-shrink-0">
                        <BellRing size={22} className="text-emerald-600" />
                    </div>
                    <div>
                        <h1 className="text-[22px] font-black tracking-tight text-slate-800">Notifications</h1>
                        <p className="text-xs font-semibold text-slate-500 mt-0.5">Stay updated with the latest updates and important alerts</p>
                    </div>
                </div>

                {/* Company Badge */}
                <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 py-2 px-3 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-xs shadow-sm overflow-hidden border-2 border-white">
                        {data?.companyLogo ? (
                            <img src={data.companyLogo} alt="Logo" className="w-full h-full object-cover" />
                        ) : (
                            data?.exhibitorName?.charAt(0) || 'C'
                        )}
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-slate-800">{data?.exhibitorName || 'Company Name'}</h4>
                        <p className="text-[11px] font-semibold text-slate-500">Stall No. {data?.participation?.stallFor || data?.participation?.stall?.stallNumber || data?.participation?.stallNo || 'TBA'}</p>
                    </div>
                    <ChevronRight size={16} className="text-slate-400 ml-2 flex-shrink-0" />
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                {/* All Notifications */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100 flex-shrink-0">
                        <Bell size={18} className="text-emerald-600" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">All Notifications</p>
                        <h3 className="text-xl font-black text-slate-800 leading-none">{totalCount}</h3>
                        <p className="text-[9px] font-semibold text-slate-400 mt-1">Total Messages</p>
                    </div>
                </div>

                {/* Unread */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center border border-red-100 flex-shrink-0">
                        <BellRing size={18} className="text-red-500" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Unread</p>
                        <h3 className="text-xl font-black text-slate-800 leading-none">{unreadCount}</h3>
                        <p className="text-[9px] font-semibold text-slate-400 mt-1">New Messages</p>
                    </div>
                </div>

                {/* Important */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center border border-orange-100 flex-shrink-0">
                        <Megaphone size={18} className="text-orange-500" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Important</p>
                        <h3 className="text-xl font-black text-slate-800 leading-none">{importantCount}</h3>
                        <p className="text-[9px] font-semibold text-slate-400 mt-1">Requires Action</p>
                    </div>
                </div>

                {/* This Week */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100 flex-shrink-0">
                        <Calendar size={18} className="text-blue-500" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">This Week</p>
                        <h3 className="text-xl font-black text-slate-800 leading-none">{thisWeekCount}</h3>
                        <p className="text-[9px] font-semibold text-slate-400 mt-1">New Notifications</p>
                    </div>
                </div>
            </div>

            {/* Main Layout */}
            <div className="flex flex-col lg:flex-row gap-2">

                {/* Left Column - List */}
                <div className="flex-1 min-w-0 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">

                    {/* List Header & Tabs */}
                    <div className="p-4 border-b border-slate-200">
                        <h2 className="text-[15px] font-bold text-slate-800 mb-4">All Notifications</h2>

                        <div className="flex items-center justify-between">
                            {/* Tabs */}
                            <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
                                {[
                                    { label: 'All', count: totalCount },
                                    { label: 'Unread', count: unreadCount },
                                    { label: 'Important', count: importantCount },
                                    { label: 'Bookings', count: bookingsCount },
                                    { label: 'Payments', count: paymentsCount },
                                    { label: 'Updates', count: updatesCount }
                                ].map(tab => (
                                    <button
                                        key={tab.label}
                                        onClick={() => setStatusFilter(tab.label)}
                                        className={`pb-3 text-[13px] font-bold transition-all relative whitespace-nowrap ${statusFilter === tab.label ? 'text-emerald-700' : 'text-slate-500 hover:text-slate-800'}`}
                                    >
                                        {tab.label} {tab.count > 0 && `(${tab.count})`}
                                        {statusFilter === tab.label && (
                                            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-emerald-600 rounded-t-full"></span>
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Mark all as read */}
                            <button
                                onClick={markAllRead}
                                className="flex items-center gap-1.5 text-[12px] font-bold text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
                            >
                                <CheckCheck size={14} />
                                Mark all as read
                            </button>
                        </div>
                    </div>

                    {/* Notifications List */}
                    <div className="flex-1 min-h-[400px]">
                        {loading ? (
                            <div className="p-10 text-center">
                                <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                <p className="text-sm font-semibold text-slate-500">Loading notifications...</p>
                            </div>
                        ) : filteredNotifications.length === 0 ? (
                            <div className="p-16 text-center">
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                                    <BellRing size={24} className="text-slate-300" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-700 mb-1">All Caught Up!</h3>
                                <p className="text-sm font-medium text-slate-500">You don't have any {statusFilter !== 'All' ? statusFilter.toLowerCase() : ''} notifications at the moment.</p>
                            </div>
                        ) : (
                            <div className="flex flex-col">
                                <AnimatePresence initial={false}>
                                    {filteredNotifications.map((n, i) => {
                                        const cfg = typeConfig[n.type] || typeConfig.general;
                                        const date = new Date(n.createdAt);
                                        const isImportant = n.priority === 'high' || n.priority === 'urgent';

                                        return (
                                            <motion.div
                                                key={n._id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.2 }}
                                                onClick={() => markAsRead(n._id, n.read)}
                                                className={`group flex items-start gap-4 p-3 px-4 border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer ${!n.read ? 'bg-white' : 'bg-slate-50/50 opacity-70'}`}
                                            >
                                                {/* Left Icon Area */}
                                                <div className="flex items-center gap-3 flex-shrink-0 mt-0.5">
                                                    <div className={`w-2 h-2 rounded-full ${!n.read ? 'bg-red-500' : 'bg-transparent'}`}></div>
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${cfg.bg} ${cfg.text}`}>
                                                        {React.cloneElement(cfg.icon, { size: 14 })}
                                                    </div>
                                                </div>

                                                {/* Content Area */}
                                                <div className="flex-1 min-w-0 pr-4">
                                                    <h4 className={`text-[13px] font-bold tracking-tight mb-0.5 truncate ${!n.read ? 'text-slate-900' : 'text-slate-700'}`}>
                                                        {n.title}
                                                    </h4>
                                                    <p className="text-[12px] font-medium text-slate-500 leading-relaxed line-clamp-2 mb-1">
                                                        {n.message}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${cfg.badge} ${cfg.badgeText}`}>
                                                            {cfg.label}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Right Actions Area */}
                                                <div className="flex flex-col items-end gap-1.5 flex-shrink-0 w-[120px]">
                                                    <div className="text-right">
                                                        <p className="text-[11px] font-bold text-slate-700">{date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                                                        <p className="text-[10px] font-semibold text-slate-400 mt-0.5">{date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
                                                    </div>

                                                    <div className="flex items-center justify-end gap-2 w-full mt-0.5">
                                                        {isImportant && (
                                                            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-orange-100 text-orange-600">
                                                                Important
                                                            </span>
                                                        )}
                                                        <button className="p-1 rounded hover:bg-slate-200 text-slate-400 transition-colors opacity-0 group-hover:opacity-100">
                                                            <MoreVertical size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>

                                {/* Load More Button */}
                                {filteredNotifications.length > 0 && (
                                    <div className="p-6 flex justify-center">
                                        <button className="flex items-center gap-2 px-6 py-2 border border-slate-200 rounded-xl text-[13px] font-bold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm bg-white">
                                            Load More
                                            <ChevronRight size={14} className="rotate-90" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column - Sidebar */}
                <div className="w-full lg:w-[320px] flex-shrink-0 space-y-2">

                    {/* Promo Card */}
                    <div className="bg-[#0f4d22] rounded-xl p-5 text-white relative overflow-hidden shadow-md">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
                            <BellRing size={120} className="-mr-6" />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-[15px] font-black mb-2">Never Miss an Update</h3>
                            <p className="text-[12px] font-medium text-[#e4f6e8] mb-5 leading-relaxed">
                                Enable email & WhatsApp notifications to receive real-time alerts.
                            </p>
                        </div>
                    </div>

                    {/* Filters List */}
                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4">
                        <div className="flex items-center gap-2 text-[13px] font-bold text-slate-700 mb-4 pb-3 border-b border-slate-100">
                            <Filter size={16} className="text-emerald-600" />
                            Notification Filters
                        </div>
                        <div className="space-y-1">
                            {[
                                { label: 'All Notifications', count: totalCount, icon: <Bell size={16} />, bg: 'bg-emerald-50', text: 'text-emerald-700' },
                                { label: 'Unread', count: unreadCount, icon: <BellRing size={16} />, bg: 'bg-red-50', text: 'text-red-600' },
                                { label: 'Important', count: importantCount, icon: <Megaphone size={16} />, bg: 'bg-orange-50', text: 'text-orange-600' },
                                { label: 'Bookings', count: bookingsCount, icon: <FileText size={16} />, bg: 'bg-slate-50', text: 'text-slate-600' },
                                { label: 'Payments', count: paymentsCount, icon: <CreditCard size={16} />, bg: 'bg-slate-50', text: 'text-slate-600' },
                                { label: 'Updates', count: updatesCount, icon: <CheckCheck size={16} />, bg: 'bg-slate-50', text: 'text-slate-600' }
                            ].map(item => (
                                <button
                                    key={item.label}
                                    onClick={() => setStatusFilter(item.label.split(' ')[0])}
                                    className={`w-full flex items-center justify-between p-2.5 rounded-lg transition-colors ${statusFilter === item.label.split(' ')[0] ? item.bg : 'hover:bg-slate-50'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`${statusFilter === item.label.split(' ')[0] ? item.text : 'text-slate-400'}`}>
                                            {item.icon}
                                        </div>
                                        <span className={`text-[13px] font-bold ${statusFilter === item.label.split(' ')[0] ? item.text : 'text-slate-600'}`}>
                                            {item.label}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {item.count > 0 && (
                                            <span className={`text-[11px] font-black px-2 py-0.5 rounded-full ${statusFilter === item.label.split(' ')[0] ? 'bg-white/50 text-current' : 'bg-slate-100 text-slate-500'}`}>
                                                {item.count}
                                            </span>
                                        )}
                                        <ChevronRight size={14} className={statusFilter === item.label.split(' ')[0] ? item.text : 'text-slate-300'} />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4">
                        <div className="flex items-center gap-2 text-[13px] font-bold text-slate-700 mb-4 pb-3 border-b border-slate-100">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-emerald-600"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            Quick Actions
                        </div>
                        <div className="space-y-3">
                            <button onClick={() => navigate('/exhibitor-dashboard/invoices')} className="w-full flex items-start justify-between group">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-lg bg-blue-50 text-blue-500 group-hover:bg-blue-100 transition-colors">
                                        <FileText size={16} />
                                    </div>
                                    <div className="text-left">
                                        <h4 className="text-[13px] font-bold text-slate-700">View All Invoices</h4>
                                        <p className="text-[11px] font-semibold text-slate-400 mt-0.5">Check your invoice history</p>
                                    </div>
                                </div>
                                <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-400 mt-1" />
                            </button>

                            <button onClick={() => navigate('/exhibitor-dashboard/reminders')} className="w-full flex items-start justify-between group">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-lg bg-orange-50 text-orange-500 group-hover:bg-orange-100 transition-colors">
                                        <BellRing size={16} />
                                    </div>
                                    <div className="text-left">
                                        <h4 className="text-[13px] font-bold text-slate-700">Payment Reminders</h4>
                                        <p className="text-[11px] font-semibold text-slate-400 mt-0.5">View payment due reminders</p>
                                    </div>
                                </div>
                                <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-400 mt-1" />
                            </button>

                            <button onClick={() => navigate('/exhibitor-dashboard/chat')} className="w-full flex items-start justify-between group">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-lg bg-purple-50 text-purple-500 group-hover:bg-purple-100 transition-colors">
                                        <Headphones size={16} />
                                    </div>
                                    <div className="text-left">
                                        <h4 className="text-[13px] font-bold text-slate-700">Contact Support</h4>
                                        <p className="text-[11px] font-semibold text-slate-400 mt-0.5">Get help from our team</p>
                                    </div>
                                </div>
                                <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-400 mt-1" />
                            </button>
                        </div>
                    </div>

                    {/* Need Help? */}
                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                                <Headphones size={20} />
                            </div>
                            <div>
                                <h3 className="text-[14px] font-bold text-slate-800">Need Help?</h3>
                                <p className="text-[11px] font-semibold text-slate-500">Our support team is here to assist you.</p>
                            </div>
                        </div>
                        <div className="space-y-2 pt-3 border-t border-slate-100">
                            <div className="flex items-center gap-2 text-[12px] font-semibold text-slate-600">
                                <PhoneCall size={14} className="text-slate-400" />
                                +91 9654900525
                            </div>
                            <div className="flex items-center gap-2 text-[12px] font-semibold text-slate-600">
                                <Mail size={14} className="text-slate-400" />
                                info@ihwe.com
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}