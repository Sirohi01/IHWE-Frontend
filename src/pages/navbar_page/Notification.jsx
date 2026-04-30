import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, MessageSquare, CreditCard, User, Info, Trash2, BellRing, ChevronRight, Calendar } from 'lucide-react';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import { useNavigate } from 'react-router-dom';

const typeConfig = {
    payment: { icon: <CreditCard size={15} />, bg: 'bg-emerald-50', text: 'text-emerald-600', badge: 'bg-emerald-100', badgeText: 'text-emerald-700' },
    chat: { icon: <MessageSquare size={15} />, bg: 'bg-blue-50', text: 'text-blue-600', badge: 'bg-blue-100', badgeText: 'text-blue-700' },
    profile: { icon: <User size={15} />, bg: 'bg-indigo-50', text: 'text-indigo-600', badge: 'bg-indigo-100', badgeText: 'text-indigo-700' },
    alert: { icon: <BellRing size={15} />, bg: 'bg-amber-50', text: 'text-amber-600', badge: 'bg-amber-100', badgeText: 'text-amber-700' },
    system: { icon: <Info size={15} />, bg: 'bg-slate-50', text: 'text-slate-600', badge: 'bg-slate-100', badgeText: 'text-slate-700' },
};

import DashboardHero from '@/components/dashboard/DashboardHero';

export default function Notification() {
    const { data } = useExhibitorCtx();
    const navigate = useNavigate();
    const [statusFilter, setStatusFilter] = useState('All');
    const [dateFilter, setDateFilter] = useState('');

    const formatRupee = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    // --- Dynamic Logic from PaymentReminders ---
    const financialNotif = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const regDate = data?.createdAt ? new Date(data.createdAt) : new Date();
        const dueLimit = new Date(regDate);
        dueLimit.setDate(regDate.getDate() + 30);
        dueLimit.setHours(0, 0, 0, 0);

        const outstandingAmount = data?.balanceAmount || 0;
        const isPaid = outstandingAmount <= 0;
        const isOverdue = !isPaid && today > dueLimit;
        const isNearDue = !isPaid && !isOverdue;

        const dueDateStr = dueLimit.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
        const diffTime = Math.abs(today - dueLimit);
        const daysDiff = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (isOverdue) {
            return {
                id: "NOTIF-PAY-001",
                title: '⚠️ Payment Overdue',
                message: `Your payment is overdue by ${daysDiff} days. Kindly clear ₹${formatRupee(outstandingAmount)} at the earliest.`,
                date: new Date().toISOString(),
                type: 'payment',
                status: 'unread'
            };
        } else if (isNearDue) {
            return {
                id: "NOTIF-PAY-002",
                title: '⏳ Payment Due Soon',
                message: `Your payment of ${formatRupee(outstandingAmount)} is due on ${dueDateStr}. Please complete it soon.`,
                date: new Date().toISOString(),
                type: 'payment',
                status: 'unread'
            };
        } else if (isPaid) {
            return {
                id: "NOTIF-PAY-003",
                title: '✅ Payment Up to Date',
                message: 'All your payments are successfully completed. Your stall booking is fully confirmed.',
                date: new Date().toISOString(),
                type: 'payment',
                status: 'read'
            };
        }
        return null;
    }, [data]);

    // Initial notifications state with dynamic payment check
    const [notifications, setNotifications] = useState([
        financialNotif,
        { id: "N2", title: 'New message from RM', message: 'Your query regarding the stall fascia name modification has been answered.', date: '2026-04-18T10:15:00', type: 'chat', status: 'unread' },
        { id: "N3", title: 'Profile verified', message: 'Your exhibitor company profile has been verified and is now live.', date: '2026-04-17T09:00:00', type: 'profile', status: 'read' },
        { id: "N4", title: 'Upcoming deadline', message: 'The final deadline for submitting Annexure D is tomorrow at 5:00 PM.', date: '2026-04-16T17:00:00', type: 'alert', status: 'unread' },
        { id: "N5", title: 'Manual updated', message: 'The organizers have updated the Exhibitor Manual with new rules for hall setup.', date: '2026-04-15T12:00:00', type: 'system', status: 'read' },
    ].filter(Boolean));

    const markRead = (id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, status: 'read' } : n));
    const deleteNotif = (e, id) => { e.stopPropagation(); setNotifications(prev => prev.filter(n => n.id !== id)); };
    const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, status: 'read' })));

    const processed = notifications
        .filter(n => {
            const matchesStatus = statusFilter === 'All' || n.status === statusFilter.toLowerCase();
            const matchesDate = !dateFilter || n.date.startsWith(dateFilter);
            return matchesStatus && matchesDate;
        })
        .sort((a, b) => {
            if (a.status === 'unread' && b.status === 'read') return -1;
            if (a.status === 'read' && b.status === 'unread') return 1;
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

    const unreadCount = notifications.filter(n => n.status === 'unread').length;

    const handleNotificationClick = (n) => {
        markRead(n.id);
        const basePath = '/exhibitor-dashboard';

        switch (n.type) {
            case 'chat':
                navigate(`${basePath}/chat`);
                break;
            case 'payment':
                navigate(`${basePath}/reminders`);
                break;
            case 'profile':
                navigate(`${basePath}/profile`);
                break;
            case 'alert':
            case 'system':
                // Logic for system/alert could be profile or stay on notification page
                navigate(`${basePath}/notification`);
                break;
            default:
                break;
        }
    };

    return (
        <div className="w-full pb-20 space-y-6">
            <DashboardHero 
                pageId="ex-notifications" 
                defaultTitle="Notification Center" 
                defaultSubtitle="Manage your alerts and stay updated with system actions"
                type="exhibitor" 
            />

            {/* Header */}
            <div className="bg-white rounded-xl px-5 py-3 flex items-center justify-between border border-slate-100 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full border border-slate-100 flex items-center justify-center bg-slate-50">
                        <Bell size={20} className="text-slate-400" />
                    </div>
                    <div>
                        <h2 className="text-sm font-black text-slate-600 uppercase tracking-tight">Status Overview</h2>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Real-time alerts for your profile</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Unread</p>
                    <p className="text-2xl font-black text-emerald-500">{unreadCount}</p>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex bg-slate-100 p-1 rounded-lg gap-1 border border-slate-200/50">
                    {['All', 'Unread', 'Read'].map(tab => (
                        <button key={tab} onClick={() => setStatusFilter(tab)}
                            className={`px-6 py-1.5 rounded-md text-[11px] font-black uppercase tracking-widest transition-all ${statusFilter === tab ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-3">

                    <div className="relative">
                        <Calendar size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="date" value={dateFilter} onChange={e => setDateFilter(e.target.value)}
                            className="pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-400 bg-white" />
                    </div>
                </div>
            </div>

            {/* List */}
            <div className="space-y-2">
                <AnimatePresence mode="popLayout">
                    {processed.length === 0 ? (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="py-20 border-2 border-dashed border-slate-100 rounded-lg text-center bg-white/50">
                            <BellRing size={40} className="mx-auto text-slate-200 mb-3" />
                            <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Quiet Hub</p>
                            <p className="text-[10px] text-slate-300 mt-1 uppercase font-bold">No notifications found for this selection</p>
                        </motion.div>
                    ) : processed.map(n => {
                        const cfg = typeConfig[n.type] || typeConfig.system;
                        const d = new Date(n.date);
                        return (
                            <motion.div key={n.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }}
                                onClick={() => handleNotificationClick(n)}
                                className={`group bg-white border rounded-lg px-4 py-4 flex items-start gap-4 cursor-pointer transition-all hover:border-slate-300 hover:shadow-md ${n.status === 'unread' ? 'border-l-[4px] border-l-[#1D9E75] border-slate-200 shadow-sm' : 'border-slate-200 opacity-80'}`}>

                                {/* Icon */}
                                <div className={`w-10 h-10 rounded-lg ${cfg.bg} ${cfg.text} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                                    {cfg.icon}
                                </div>

                                {/* Body */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        {n.status === 'unread' && <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0 animate-pulse" />}
                                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${cfg.badge} ${cfg.badgeText}`}>{n.type}</span>
                                        <h4 className={`text-[14px] font-medium tracking-tight ${n.status === 'unread' ? 'text-slate-800' : 'text-slate-500'}`}>{n.title}</h4>
                                    </div>
                                    <p className="text-[12px] font-medium text-slate-500 leading-relaxed line-clamp-2">{n.message}</p>
                                </div>

                                {/* Right */}
                                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                                    <div className="text-right">
                                        <p className="text-[12px] font-medium text-slate-800 tracking-tight">{d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                                        <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">{d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</p>
                                    </div>

                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
}