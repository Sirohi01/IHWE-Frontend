// import React, { useState, useEffect, useMemo } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//     Bell, MessageSquare, CreditCard, User, Info, CheckCheck,
//     BellRing, Calendar, ChevronRight, FileText, Megaphone,
//     Users, MoreVertical, Search, Filter, Headphones, Mail, PhoneCall
// } from 'lucide-react';
// import { useExhibitorCtx } from '@/context/ExhibitorContext';
// import { useNavigate } from 'react-router-dom';
// import { API_URL } from '@/lib/api';
// import { toast } from 'sonner';

// // Type configurations for icons and colors
// const typeConfig = {
//     payment: { icon: <CreditCard size={18} />, bg: 'bg-red-50', text: 'text-red-500', badge: 'bg-red-100', badgeText: 'text-red-600', label: 'Payment' },
//     document: { icon: <FileText size={18} />, bg: 'bg-blue-50', text: 'text-blue-500', badge: 'bg-blue-100', badgeText: 'text-blue-600', label: 'Document' },
//     booking: { icon: <FileText size={18} />, bg: 'bg-blue-50', text: 'text-blue-500', badge: 'bg-blue-100', badgeText: 'text-blue-600', label: 'Booking' },
//     meeting: { icon: <Users size={18} />, bg: 'bg-indigo-50', text: 'text-indigo-500', badge: 'bg-indigo-100', badgeText: 'text-indigo-600', label: 'Meeting' },
//     lead: { icon: <Users size={18} />, bg: 'bg-indigo-50', text: 'text-indigo-500', badge: 'bg-indigo-100', badgeText: 'text-indigo-600', label: 'Lead' },
//     event: { icon: <Calendar size={18} />, bg: 'bg-teal-50', text: 'text-teal-500', badge: 'bg-teal-100', badgeText: 'text-teal-600', label: 'Event' },
//     approval: { icon: <CheckCheck size={18} />, bg: 'bg-emerald-50', text: 'text-emerald-500', badge: 'bg-emerald-100', badgeText: 'text-emerald-600', label: 'Approval' },
//     update: { icon: <Megaphone size={18} />, bg: 'bg-orange-50', text: 'text-orange-500', badge: 'bg-orange-100', badgeText: 'text-orange-600', label: 'Update' },
//     general: { icon: <Info size={18} />, bg: 'bg-slate-50', text: 'text-slate-500', badge: 'bg-slate-100', badgeText: 'text-slate-600', label: 'System' },
// };

// export default function Notification() {
//     const { data } = useExhibitorCtx();
//     const navigate = useNavigate();
//     const [notifications, setNotifications] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [statusFilter, setStatusFilter] = useState('All');

//     // Fetch Notifications
//     const fetchNotifications = async () => {
//         try {
//             const token = localStorage.getItem('exhibitorToken');
//             const res = await fetch(`${API_URL}/seller-portal/notifications`, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             const result = await res.json();
//             if (result.success) {
//                 setNotifications(result.data);
//             }
//         } catch (error) {
//             console.error("Failed to load notifications", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchNotifications();
//     }, []);

//     // Mark single as read
//     const markAsRead = async (id, currentReadStatus) => {
//         if (currentReadStatus) return; // already read

//         // Optimistic update
//         setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));

//         try {
//             const token = localStorage.getItem('exhibitorToken');
//             await fetch(`${API_URL}/seller-portal/notifications/${id}/read`, {
//                 method: 'PATCH',
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//         } catch (error) {
//             console.error("Failed to mark as read", error);
//         }
//     };

//     // Mark all as read
//     const markAllRead = async () => {
//         setNotifications(prev => prev.map(n => ({ ...n, read: true })));
//         try {
//             const token = localStorage.getItem('exhibitorToken');
//             const res = await fetch(`${API_URL}/seller-portal/notifications/mark-all-read`, {
//                 method: 'PATCH',
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             const result = await res.json();
//             if (result.success) {
//                 toast.success("All notifications marked as read");
//             }
//         } catch (error) {
//             toast.error("Failed to mark all as read");
//         }
//     };

//     // Calculate Stats
//     const totalCount = notifications.length;
//     const unreadCount = notifications.filter(n => !n.read).length;
//     const importantCount = notifications.filter(n => n.priority === 'high' || n.priority === 'urgent').length;

//     // This Week calculation
//     const oneWeekAgo = new Date();
//     oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
//     const thisWeekCount = notifications.filter(n => new Date(n.createdAt) >= oneWeekAgo).length;

//     // Type filters for the sidebar
//     const bookingsCount = notifications.filter(n => n.type === 'approval' || n.type === 'document').length;
//     const paymentsCount = notifications.filter(n => n.type === 'payment').length;
//     const updatesCount = notifications.filter(n => n.type === 'update' || n.type === 'general' || n.type === 'event').length;

//     // Filtering logic for the list
//     const filteredNotifications = useMemo(() => {
//         let filtered = notifications;
//         if (statusFilter === 'Unread') filtered = filtered.filter(n => !n.read);
//         else if (statusFilter === 'Important') filtered = filtered.filter(n => n.priority === 'high' || n.priority === 'urgent');
//         else if (statusFilter === 'Bookings') filtered = filtered.filter(n => n.type === 'approval' || n.type === 'document');
//         else if (statusFilter === 'Payments') filtered = filtered.filter(n => n.type === 'payment');
//         else if (statusFilter === 'Updates') filtered = filtered.filter(n => n.type === 'update' || n.type === 'general' || n.type === 'event');

//         return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//     }, [notifications, statusFilter]);

//     return (
//         <div className="w-full pb-6 space-y-2 px-4 md:px-6 lg:px-8 max-w-[1400px] mx-auto pt-4">
//             {/* Header Area */}
//             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200 shadow-sm rounded-xl p-4">
//                 <div className="flex items-center gap-4">
//                     <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center border border-emerald-100 flex-shrink-0">
//                         <BellRing size={22} className="text-emerald-600" />
//                     </div>
//                     <div>
//                         <h1 className="text-[22px] font-normal tracking-tight text-slate-800">Notifications</h1>
//                         <p className="text-xs font-semibold text-slate-500 mt-0.5">Stay updated with the latest updates and important alerts</p>
//                     </div>
//                 </div>

//                 {/* Company Badge */}
//                 <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 py-2 px-3 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
//                     <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-xs shadow-sm overflow-hidden border-2 border-white">
//                         {data?.companyLogo ? (
//                             <img src={data.companyLogo} alt="Logo" className="w-full h-full object-cover" />
//                         ) : (
//                             data?.exhibitorName?.charAt(0) || 'C'
//                         )}
//                     </div>
//                     <div>
//                         <h4 className="text-sm font-bold text-slate-800">{data?.exhibitorName || 'Company Name'}</h4>
//                         <p className="text-[11px] font-semibold text-slate-500">Stall No. {data?.participation?.stallFor || data?.participation?.stall?.stallNumber || data?.participation?.stallNo || 'TBA'}</p>
//                     </div>
//                     <ChevronRight size={16} className="text-slate-400 ml-2 flex-shrink-0" />
//                 </div>
//             </div>

//             {/* Stat Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
//                 {/* All Notifications */}
//                 <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
//                     <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100 flex-shrink-0">
//                         <Bell size={18} className="text-emerald-600" />
//                     </div>
//                     <div>
//                         <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">All Notifications</p>
//                         <h3 className="text-xl font-black text-slate-800 leading-none">{totalCount}</h3>
//                         <p className="text-[9px] font-semibold text-slate-400 mt-1">Total Messages</p>
//                     </div>
//                 </div>

//                 {/* Unread */}
//                 <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
//                     <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center border border-red-100 flex-shrink-0">
//                         <BellRing size={18} className="text-red-500" />
//                     </div>
//                     <div>
//                         <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Unread</p>
//                         <h3 className="text-xl font-black text-slate-800 leading-none">{unreadCount}</h3>
//                         <p className="text-[9px] font-semibold text-slate-400 mt-1">New Messages</p>
//                     </div>
//                 </div>

//                 {/* Important */}
//                 <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
//                     <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center border border-orange-100 flex-shrink-0">
//                         <Megaphone size={18} className="text-orange-500" />
//                     </div>
//                     <div>
//                         <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Important</p>
//                         <h3 className="text-xl font-black text-slate-800 leading-none">{importantCount}</h3>
//                         <p className="text-[9px] font-semibold text-slate-400 mt-1">Requires Action</p>
//                     </div>
//                 </div>

//                 {/* This Week */}
//                 <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
//                     <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100 flex-shrink-0">
//                         <Calendar size={18} className="text-blue-500" />
//                     </div>
//                     <div>
//                         <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">This Week</p>
//                         <h3 className="text-xl font-black text-slate-800 leading-none">{thisWeekCount}</h3>
//                         <p className="text-[9px] font-semibold text-slate-400 mt-1">New Notifications</p>
//                     </div>
//                 </div>
//             </div>

//             {/* Main Layout */}
//             <div className="flex flex-col lg:flex-row gap-2">

//                 {/* Left Column - List */}
//                 <div className="flex-1 min-w-0 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">

//                     {/* List Header & Tabs */}
//                     <div className="p-4 border-b border-slate-200">
//                         <h2 className="text-[15px] font-bold text-slate-800 mb-1">All Notifications</h2>

//                         <div className="flex items-center justify-between">
//                             {/* Tabs */}
//                             <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
//                                 {[
//                                     { label: 'All', count: totalCount },
//                                     { label: 'Unread', count: unreadCount },
//                                     { label: 'Important', count: importantCount },
//                                     { label: 'Bookings', count: bookingsCount },
//                                     { label: 'Payments', count: paymentsCount },
//                                     { label: 'Updates', count: updatesCount }
//                                 ].map(tab => (
//                                     <button
//                                         key={tab.label}
//                                         onClick={() => setStatusFilter(tab.label)}
//                                         className={`pb-1 text-[13px] font-bold transition-all relative whitespace-nowrap ${statusFilter === tab.label ? 'text-emerald-700' : 'text-slate-500 hover:text-slate-800'}`}
//                                     >
//                                         {tab.label} {tab.count > 0 && `(${tab.count})`}
//                                         {statusFilter === tab.label && (
//                                             <span className="absolute bottom-0 left-0 w-full h-[3px] bg-emerald-600 rounded-t-full"></span>
//                                         )}
//                                     </button>
//                                 ))}
//                             </div>

//                             {/* Mark all as read */}
//                             <button
//                                 onClick={markAllRead}
//                                 className="flex items-center gap-1.5 text-[12px] font-bold text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
//                             >
//                                 <CheckCheck size={14} />
//                                 Mark all as read
//                             </button>
//                         </div>
//                     </div>

//                     {/* Notifications List */}
//                     <div className="flex-1 min-h-[400px]">
//                         {loading ? (
//                             <div className="p-10 text-center">
//                                 <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-1"></div>
//                                 <p className="text-sm font-semibold text-slate-500">Loading notifications...</p>
//                             </div>
//                         ) : filteredNotifications.length === 0 ? (
//                             <div className="p-16 text-center">
//                                 <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-1 border border-slate-100">
//                                     <BellRing size={24} className="text-slate-300" />
//                                 </div>
//                                 <h3 className="text-lg font-bold text-slate-700 mb-1">All Caught Up!</h3>
//                                 <p className="text-sm font-medium text-slate-500">You don't have any {statusFilter !== 'All' ? statusFilter.toLowerCase() : ''} notifications at the moment.</p>
//                             </div>
//                         ) : (
//                             <div className="flex flex-col">
//                                 <AnimatePresence initial={false}>
//                                     {filteredNotifications.map((n, i) => {
//                                         const cfg = typeConfig[n.type] || typeConfig.general;
//                                         const date = new Date(n.createdAt);
//                                         const isImportant = n.priority === 'high' || n.priority === 'urgent';

//                                         return (
//                                             <motion.div
//                                                 key={n._id}
//                                                 initial={{ opacity: 0, y: 10 }}
//                                                 animate={{ opacity: 1, y: 0 }}
//                                                 exit={{ opacity: 0, height: 0 }}
//                                                 transition={{ duration: 0.2 }}
//                                                 onClick={() => markAsRead(n._id, n.read)}
//                                                 className={`group flex items-start gap-4 p-3 px-4 border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer ${!n.read ? 'bg-white' : 'bg-slate-50/50 opacity-70'}`}
//                                             >
//                                                 {/* Left Icon Area */}
//                                                 <div className="flex items-center gap-3 flex-shrink-0 mt-0.5">
//                                                     <div className={`w-2 h-2 rounded-full ${!n.read ? 'bg-red-500' : 'bg-transparent'}`}></div>
//                                                     <div className={`w-8 h-8 rounded-full flex items-center justify-center ${cfg.bg} ${cfg.text}`}>
//                                                         {React.cloneElement(cfg.icon, { size: 14 })}
//                                                     </div>
//                                                 </div>

//                                                 {/* Content Area */}
//                                                 <div className="flex-1 min-w-0 pr-4">
//                                                     <h4 className={`text-[13px] font-bold tracking-tight mb-0.5 truncate ${!n.read ? 'text-slate-900' : 'text-slate-700'}`}>
//                                                         {n.title}
//                                                     </h4>
//                                                     <p className="text-[12px] font-medium text-slate-500 leading-relaxed line-clamp-2 mb-1">
//                                                         {n.message}
//                                                     </p>
//                                                     <div className="flex items-center gap-2 mt-1">
//                                                         <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${cfg.badge} ${cfg.badgeText}`}>
//                                                             {cfg.label}
//                                                         </span>
//                                                     </div>
//                                                 </div>

//                                                 {/* Right Actions Area */}
//                                                 <div className="flex flex-col items-end gap-1.5 flex-shrink-0 w-[120px]">
//                                                     <div className="text-right">
//                                                         <p className="text-[11px] font-bold text-slate-700">{date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
//                                                         <p className="text-[10px] font-semibold text-slate-400 mt-0.5">{date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
//                                                     </div>

//                                                     <div className="flex items-center justify-end gap-2 w-full mt-0.5">
//                                                         {isImportant && (
//                                                             <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-orange-100 text-orange-600">
//                                                                 Important
//                                                             </span>
//                                                         )}
//                                                         <button className="p-1 rounded hover:bg-slate-200 text-slate-400 transition-colors opacity-0 group-hover:opacity-100">
//                                                             <MoreVertical size={16} />
//                                                         </button>
//                                                     </div>
//                                                 </div>
//                                             </motion.div>
//                                         );
//                                     })}
//                                 </AnimatePresence>

//                                 {/* Load More Button */}
//                                 {filteredNotifications.length > 0 && (
//                                     <div className="p-6 flex justify-center">
//                                         <button className="flex items-center gap-2 px-6 py-2 border border-slate-200 rounded-xl text-[13px] font-bold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm bg-white">
//                                             Load More
//                                             <ChevronRight size={14} className="rotate-90" />
//                                         </button>
//                                     </div>
//                                 )}
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 {/* Right Column - Sidebar */}
//                 <div className="w-full lg:w-[320px] flex-shrink-0 space-y-2">

//                     {/* Promo Card */}
//                     <div className="bg-[#0f4d22] rounded-xl p-5 text-white relative overflow-hidden shadow-md">
//                         <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
//                             <BellRing size={120} className="-mr-6" />
//                         </div>
//                         <div className="relative z-10">
//                             <h3 className="text-[15px] font-black mb-2">Never Miss an Update</h3>
//                             <p className="text-[12px] font-medium text-[#e4f6e8] mb-5 leading-relaxed">
//                                 Enable email & WhatsApp notifications to receive real-time alerts.
//                             </p>
//                         </div>
//                     </div>

//                     {/* Filters List */}
//                     <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4">
//                         <div className="flex items-center gap-2 text-[13px] font-bold text-slate-700 mb-4 pb-3 border-b border-slate-100">
//                             <Filter size={16} className="text-emerald-600" />
//                             Notification Filters
//                         </div>
//                         <div className="space-y-1">
//                             {[
//                                 { label: 'All Notifications', count: totalCount, icon: <Bell size={16} />, bg: 'bg-emerald-50', text: 'text-emerald-700' },
//                                 { label: 'Unread', count: unreadCount, icon: <BellRing size={16} />, bg: 'bg-red-50', text: 'text-red-600' },
//                                 { label: 'Important', count: importantCount, icon: <Megaphone size={16} />, bg: 'bg-orange-50', text: 'text-orange-600' },
//                                 { label: 'Bookings', count: bookingsCount, icon: <FileText size={16} />, bg: 'bg-slate-50', text: 'text-slate-600' },
//                                 { label: 'Payments', count: paymentsCount, icon: <CreditCard size={16} />, bg: 'bg-slate-50', text: 'text-slate-600' },
//                                 { label: 'Updates', count: updatesCount, icon: <CheckCheck size={16} />, bg: 'bg-slate-50', text: 'text-slate-600' }
//                             ].map(item => (
//                                 <button
//                                     key={item.label}
//                                     onClick={() => setStatusFilter(item.label.split(' ')[0])}
//                                     className={`w-full flex items-center justify-between p-2.5 rounded-lg transition-colors ${statusFilter === item.label.split(' ')[0] ? item.bg : 'hover:bg-slate-50'}`}
//                                 >
//                                     <div className="flex items-center gap-3">
//                                         <div className={`${statusFilter === item.label.split(' ')[0] ? item.text : 'text-slate-400'}`}>
//                                             {item.icon}
//                                         </div>
//                                         <span className={`text-[13px] font-bold ${statusFilter === item.label.split(' ')[0] ? item.text : 'text-slate-600'}`}>
//                                             {item.label}
//                                         </span>
//                                     </div>
//                                     <div className="flex items-center gap-2">
//                                         {item.count > 0 && (
//                                             <span className={`text-[11px] font-black px-2 py-0.5 rounded-full ${statusFilter === item.label.split(' ')[0] ? 'bg-white/50 text-current' : 'bg-slate-100 text-slate-500'}`}>
//                                                 {item.count}
//                                             </span>
//                                         )}
//                                         <ChevronRight size={14} className={statusFilter === item.label.split(' ')[0] ? item.text : 'text-slate-300'} />
//                                     </div>
//                                 </button>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Quick Actions */}
//                     <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4">
//                         <div className="flex items-center gap-2 text-[13px] font-bold text-slate-700 mb-4 pb-3 border-b border-slate-100">
//                             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-emerald-600"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
//                             Quick Actions
//                         </div>
//                         <div className="space-y-3">
//                             <button onClick={() => navigate('/exhibitor-dashboard/invoices')} className="w-full flex items-start justify-between group">
//                                 <div className="flex items-start gap-3">
//                                     <div className="p-2 rounded-lg bg-blue-50 text-blue-500 group-hover:bg-blue-100 transition-colors">
//                                         <FileText size={16} />
//                                     </div>
//                                     <div className="text-left">
//                                         <h4 className="text-[13px] font-bold text-slate-700">View All Invoices</h4>
//                                         <p className="text-[11px] font-semibold text-slate-400 mt-0.5">Check your invoice history</p>
//                                     </div>
//                                 </div>
//                                 <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-400 mt-1" />
//                             </button>

//                             <button onClick={() => navigate('/exhibitor-dashboard/reminders')} className="w-full flex items-start justify-between group">
//                                 <div className="flex items-start gap-3">
//                                     <div className="p-2 rounded-lg bg-orange-50 text-orange-500 group-hover:bg-orange-100 transition-colors">
//                                         <BellRing size={16} />
//                                     </div>
//                                     <div className="text-left">
//                                         <h4 className="text-[13px] font-bold text-slate-700">Payment Reminders</h4>
//                                         <p className="text-[11px] font-semibold text-slate-400 mt-0.5">View payment due reminders</p>
//                                     </div>
//                                 </div>
//                                 <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-400 mt-1" />
//                             </button>

//                             <button onClick={() => navigate('/exhibitor-dashboard/chat')} className="w-full flex items-start justify-between group">
//                                 <div className="flex items-start gap-3">
//                                     <div className="p-2 rounded-lg bg-purple-50 text-purple-500 group-hover:bg-purple-100 transition-colors">
//                                         <Headphones size={16} />
//                                     </div>
//                                     <div className="text-left">
//                                         <h4 className="text-[13px] font-bold text-slate-700">Contact Support</h4>
//                                         <p className="text-[11px] font-semibold text-slate-400 mt-0.5">Get help from our team</p>
//                                     </div>
//                                 </div>
//                                 <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-400 mt-1" />
//                             </button>
//                         </div>
//                     </div>

//                     {/* Need Help? */}
//                     <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
//                         <div className="flex items-center gap-3 mb-4">
//                             <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
//                                 <Headphones size={20} />
//                             </div>
//                             <div>
//                                 <h3 className="text-[14px] font-bold text-slate-800">Need Help?</h3>
//                                 <p className="text-[11px] font-semibold text-slate-500">Our support team is here to assist you.</p>
//                             </div>
//                         </div>
//                         <div className="space-y-2 pt-3 border-t border-slate-100">
//                             <div className="flex items-center gap-2 text-[12px] font-semibold text-slate-600">
//                                 <PhoneCall size={14} className="text-slate-400" />
//                                 +91 9654900525
//                             </div>
//                             <div className="flex items-center gap-2 text-[12px] font-semibold text-slate-600">
//                                 <Mail size={14} className="text-slate-400" />
//                                 info@ihwe.com
//                             </div>
//                         </div>
//                     </div>

//                 </div>
//             </div>
//         </div>
//     );
// }
import React, { useEffect, useMemo, useState } from 'react';
import {
    Bell, MessageSquare, CreditCard, User, Info, CheckCheck,
    BellRing, Calendar, ChevronRight, FileText, Megaphone,
    Users, MoreVertical, Search, Filter, Headphones, Mail, PhoneCall,
    ChevronDown, CheckCircle, Star, AlertCircle, Settings
} from 'lucide-react';
import { API_URL } from '@/lib/api';
import { toast } from 'sonner';

import mmImage from '../../assets/mm.png';

const typeConfig = {
    payment_success: { icon: <Mail size={14} />, bg: 'bg-emerald-50', text: 'text-emerald-600', badge: 'text-emerald-600 bg-emerald-50', badgeText: 'New', dot: 'bg-emerald-500' },
    booking_confirm: { icon: <Calendar size={14} />, bg: 'bg-orange-50', text: 'text-orange-500', badge: 'text-emerald-600 bg-emerald-50', badgeText: 'New', dot: 'bg-emerald-500' },
    invoice_gen: { icon: <FileText size={14} />, bg: 'bg-purple-50', text: 'text-purple-600', badge: 'text-blue-500 bg-blue-50', badgeText: 'Info', dot: 'bg-blue-500' },
    event_update: { icon: <Megaphone size={14} />, bg: 'bg-blue-50', text: 'text-blue-500', badge: 'text-blue-500 bg-blue-50', badgeText: 'Update', dot: 'bg-blue-500' },
    payment_reminder: { icon: <AlertCircle size={14} />, bg: 'bg-red-50', text: 'text-red-500', badge: 'text-orange-500 bg-orange-50', badgeText: 'Important', dot: 'bg-red-500' },
    support_res: { icon: <Headphones size={14} />, bg: 'bg-emerald-50', text: 'text-emerald-600', badge: 'text-blue-500 bg-blue-50', badgeText: 'Update', dot: 'bg-emerald-500' },
    welcome: { icon: <Star size={14} />, bg: 'bg-purple-50', text: 'text-purple-600', badge: 'text-blue-500 bg-blue-50', badgeText: 'Info', dot: 'bg-purple-500' },
    general: { icon: <Info size={14} />, bg: 'bg-purple-50', text: 'text-purple-500', badge: 'text-purple-500 bg-purple-50', badgeText: 'Info', dot: 'bg-purple-500' },
};

export default function Notification() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('All');
    const [typeFilter, setTypeFilter] = useState('all');
    const [visibleCount, setVisibleCount] = useState(7);

    const fetchNotifications = async () => {
        const staticNotifications = [
            {
                _id: '1',
                title: 'Invoice Payment Received',
                message: 'Your payment for Invoice #INV/26-27/017 has been received successfully.',
                createdAt: new Date(Date.now() - 5 * 60000).toISOString(),
                read: false,
                type: 'payment_success'
            },
            {
                _id: '2',
                title: 'Stall Booking Confirmed',
                message: 'Your stall booking for IHWE 2026 has been confirmed.',
                createdAt: new Date(Date.now() - 60 * 60000).toISOString(),
                read: false,
                type: 'booking_confirm'
            },
            {
                _id: '3',
                title: 'Invoice Generated',
                message: 'Your invoice #INV/26-27/034 has been generated.',
                createdAt: new Date(Date.now() - 3 * 60 * 60000).toISOString(),
                read: false,
                type: 'invoice_gen'
            },
            {
                _id: '4',
                title: 'Event Update',
                message: 'Exhibitor guidelines have been updated. Please check the latest version.',
                createdAt: new Date(Date.now() - 24 * 60 * 60000).toISOString(),
                read: true,
                type: 'event_update'
            },
            {
                _id: '5',
                title: 'Payment Reminder',
                message: 'Your payment for Invoice #INV/26-27/034 is due on 01 Aug 2026.',
                createdAt: new Date(Date.now() - 2 * 24 * 60 * 60000).toISOString(),
                read: true,
                type: 'payment_reminder',
                priority: 'high'
            },
            {
                _id: '6',
                title: 'Support Response',
                message: 'Our team has responded to your support ticket.',
                createdAt: new Date(Date.now() - 3 * 24 * 60 * 60000).toISOString(),
                read: true,
                type: 'support_res'
            },
            {
                _id: '7',
                title: 'Welcome to IHWE 2026',
                message: 'Thank you for joining International Health & Wellness Expo 2026.',
                createdAt: new Date(Date.now() - 5 * 24 * 60 * 60000).toISOString(),
                read: true,
                type: 'welcome'
            }
        ];

        setNotifications(staticNotifications);
        setLoading(false);
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    useEffect(() => {
        setVisibleCount(7);
    }, [statusFilter, typeFilter]);

    const markAsRead = async (id, currentReadStatus) => {
        if (!id || currentReadStatus) return;

        setNotifications((previous) =>
            previous.map((item) => (item._id === id ? { ...item, read: true } : item)),
        );

        try {
            const token = localStorage.getItem('exhibitorToken');
            const response = await fetch(`${API_URL}/seller-portal/notifications/${id}/read`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error('Could not mark notification as read');
        } catch (error) {
            console.error(error);
            fetchNotifications();
        }
    };

    const markAllRead = async () => {
        const previousNotifications = notifications;
        setNotifications((previous) => previous.map((item) => ({ ...item, read: true })));

        try {
            const token = localStorage.getItem('exhibitorToken');
            const response = await fetch(`${API_URL}/seller-portal/notifications/mark-all-read`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error('Could not mark all notifications as read');
            toast.success('All notifications marked as read');
        } catch (error) {
            console.error(error);
            setNotifications(previousNotifications);
            toast.error('Failed to mark all notifications as read');
        }
    };

    const totalCount = notifications.length;
    const unreadCount = notifications.filter(n => !n.read).length;
    const importantCount = notifications.filter(n => n.priority === 'high' || n.priority === 'urgent').length;

    // Type filters for the sidebar
    const bookingsCount = notifications.filter(n => n.type === 'approval' || n.type === 'document').length;
    const paymentsCount = notifications.filter(n => n.type === 'payment').length;
    const invoicesCount = notifications.filter(n => n.type === 'invoice').length;
    const updatesCount = notifications.filter(n => n.type === 'update' || n.type === 'general' || n.type === 'event').length;

    // Filtering logic for the list
    const filteredNotifications = useMemo(() => {
        let filtered = notifications;
        if (statusFilter === 'Unread') filtered = filtered.filter(n => !n.read);
        else if (statusFilter === 'Important') filtered = filtered.filter(n => n.priority === 'high' || n.priority === 'urgent');
        else if (statusFilter === 'Bookings') filtered = filtered.filter(n => n.type === 'approval' || n.type === 'document');
        else if (statusFilter === 'Payments') filtered = filtered.filter(n => n.type === 'payment');
        else if (statusFilter === 'Invoices') filtered = filtered.filter(n => n.type === 'invoice');
        else if (statusFilter === 'Updates') filtered = filtered.filter(n => n.type === 'update' || n.type === 'general' || n.type === 'event');

        return filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }, [notifications, statusFilter, typeFilter]);

    const visibleNotifications = filteredNotifications.slice(0, visibleCount);

    return (
        <div className="w-full pb-10 px-4 md:px-6 lg:px-8 max-w-[1400px] mx-auto pt-6 bg-white min-h-screen flex flex-col lg:flex-row gap-6">

            {/* LEFT COLUMN: Header, Stats, List */}
            <div className="flex-1 min-w-0 flex flex-col">

                {/* Top Header Section with Illustration */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 relative">
                    <div className="z-10">
                        <h1 className="text-[18px] font-bold tracking-tight text-[#1e293b] mb-0.5">Stay Updated, Stay Ahead!</h1>
                        <p className="text-[12px] font-medium text-slate-500">All important alerts, messages and updates at one place.</p>
                    </div>
                    {/* Positioned the image appropriately within the left column */}
                    <div className="hidden md:block absolute right-0 -top-6">
                        <img src={mmImage} alt="Notifications" className="h-32 lg:h-40 object-contain drop-shadow-xl" />
                    </div>
                </div>

                {/* 4 Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 relative z-10">
                    {/* Total Notifications */}
                    <div className="group cursor-pointer relative bg-gradient-to-br from-white to-emerald-50 p-3.5 border border-slate-200 rounded-2xl transition-all duration-500 shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:-translate-y-1 overflow-hidden">
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-9 h-9 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                                    <Bell size={18} className="text-emerald-600" strokeWidth={2.5} />
                                </div>
                                <div className="flex flex-col">
                                    <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', lineHeight: 1, marginBottom: '4px', display: 'block', fontFamily: 'Inter, sans-serif' }}>
                                        {totalCount}
                                    </span>
                                    <span style={{ fontSize: '8.5px', fontWeight: 800, color: '#334155', lineHeight: 1.2, display: 'block', fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap' }}>
                                        TOTAL NOTIFICATIONS
                                    </span>
                                </div>
                            </div>
                            <div style={{ fontSize: '10px', fontWeight: 700, color: '#059669', textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>
                                All time
                            </div>
                        </div>
                    </div>

                    {/* Unread Messages */}
                    <div className="group cursor-pointer relative bg-gradient-to-br from-white to-blue-50 p-3.5 border border-slate-200 rounded-2xl transition-all duration-500 shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:-translate-y-1 overflow-hidden">
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                                    <Mail size={18} className="text-blue-600" strokeWidth={2.5} />
                                </div>
                                <div className="flex flex-col">
                                    <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', lineHeight: 1, marginBottom: '4px', display: 'block', fontFamily: 'Inter, sans-serif' }}>
                                        {unreadCount}
                                    </span>
                                    <span style={{ fontSize: '8.5px', fontWeight: 800, color: '#334155', lineHeight: 1.2, display: 'block', fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap' }}>
                                        UNREAD MESSAGES
                                    </span>
                                </div>
                            </div>
                            <div style={{ fontSize: '10px', fontWeight: 700, color: '#2563eb', textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>
                                New messages
                            </div>
                        </div>
                    </div>

                    {/* Important */}
                    <div className="group cursor-pointer relative bg-gradient-to-br from-white to-orange-50 p-3.5 border border-slate-200 rounded-2xl transition-all duration-500 shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:-translate-y-1 overflow-hidden">
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-9 h-9 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                                    <Megaphone size={18} className="text-orange-600" strokeWidth={2.5} />
                                </div>
                                <div className="flex flex-col">
                                    <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', lineHeight: 1, marginBottom: '4px', display: 'block', fontFamily: 'Inter, sans-serif' }}>
                                        {importantCount}
                                    </span>
                                    <span style={{ fontSize: '8.5px', fontWeight: 800, color: '#334155', lineHeight: 1.2, display: 'block', fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap' }}>
                                        IMPORTANT
                                    </span>
                                </div>
                            </div>
                            <div style={{ fontSize: '10px', fontWeight: 700, color: '#ea580c', textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>
                                Requires attention
                            </div>
                        </div>
                    </div>

                    {/* Updates */}
                    <div className="group cursor-pointer relative bg-gradient-to-br from-white to-purple-50 p-3.5 border border-slate-200 rounded-2xl transition-all duration-500 shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:-translate-y-1 overflow-hidden">
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-9 h-9 bg-purple-100 rounded-full flex items-center justify-center shrink-0">
                                    <Info size={18} className="text-purple-600" strokeWidth={2.5} />
                                </div>
                                <div className="flex flex-col">
                                    <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', lineHeight: 1, marginBottom: '4px', display: 'block', fontFamily: 'Inter, sans-serif' }}>
                                        {updatesCount}
                                    </span>
                                    <span style={{ fontSize: '8.5px', fontWeight: 800, color: '#334155', lineHeight: 1.2, display: 'block', fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap' }}>
                                        UPDATES
                                    </span>
                                </div>
                            </div>
                            <div style={{ fontSize: '10px', fontWeight: 700, color: '#9333ea', textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>
                                General updates
                            </div>
                        </div>
                    </div>
                </div>

                {/* Notifications List Area */}
                <div className="flex-1 min-w-0">
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">

                        {/* List Header */}
                        <div className="px-4 py-2 bg-slate-100 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <h2 className="text-[12px] font-bold text-slate-800 tracking-tight">All Notifications</h2>

                            <div className="flex items-center gap-2">
                                <div className="relative">
                                    <select className="appearance-none bg-white border border-slate-200 text-slate-700 text-[10px] font-bold py-1 pl-2 pr-6 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer">
                                        <option>All Types</option>
                                        <option>Alerts</option>
                                        <option>Messages</option>
                                    </select>
                                    <ChevronDown size={12} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                                <div className="relative">
                                    <select className="appearance-none bg-white border border-slate-200 text-slate-700 text-[10px] font-bold py-1 pl-2 pr-6 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer">
                                        <option>Latest First</option>
                                        <option>Oldest First</option>
                                    </select>
                                    <ChevronDown size={12} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                                <button className="p-1 border border-slate-200 rounded text-slate-600 hover:bg-slate-50 transition-colors bg-white">
                                    <Filter size={16} />
                                </button>
                            </div>
                        </div>

                        {/* List Items */}
                        <div className="flex-1">
                            {loading ? (
                                <div className="p-16 text-center">
                                    <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                                    <p className="text-sm font-semibold text-slate-500">Loading notifications...</p>
                                </div>
                            ) : filteredNotifications.length === 0 ? (
                                <div className="p-16 text-center">
                                    <BellRing size={32} className="mx-auto text-slate-300 mb-3" />
                                    <h3 className="text-lg font-bold text-slate-700 mb-1">No notifications found</h3>
                                    <p className="text-sm font-medium text-slate-500">You don't have any notifications matching this filter.</p>
                                </div>
                            ) : (
                                <div className="flex flex-col">
                                    <AnimatePresence initial={false}>
                                        {filteredNotifications.map((n) => {
                                            const cfg = typeConfig[n.type] || typeConfig.general;

                                            // Handle relative time logic
                                            const date = new Date(n.createdAt);
                                            const now = new Date();
                                            const diffMs = now - date;
                                            const diffMins = Math.round(diffMs / 60000);
                                            const diffHours = Math.round(diffMs / 3600000);
                                            const diffDays = Math.round(diffMs / 86400000);

                                            let timeString = "";
                                            if (diffMins < 60) timeString = `${diffMins} mins ago`;
                                            else if (diffHours < 24) timeString = `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
                                            else timeString = `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

                                            return (
                                                <motion.div
                                                    key={n._id}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    onClick={() => markAsRead(n._id, n.read)}
                                                    className={`group relative flex items-center justify-between p-2.5 px-4 border-b border-dashed border-slate-200 hover:bg-slate-50/50 transition-colors cursor-pointer ${!n.read ? 'bg-white border-l-[3px] border-l-emerald-500' : 'opacity-90'}`}
                                                >
                                                    {/* Left side: Icon + Text */}
                                                    <div className="flex items-start gap-3">
                                                        <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${!n.read ? cfg.dot : 'bg-transparent'}`}></div>
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${cfg.bg} ${cfg.text}`}>
                                                            {React.cloneElement(cfg.icon, { size: 14 })}
                                                        </div>
                                                        <div>
                                                            <h4 className={`text-[11px] font-bold leading-tight mb-0.5 ${!n.read ? 'text-slate-800' : 'text-slate-600'}`}>
                                                                {n.title}
                                                            </h4>
                                                            <p className="text-[10px] font-medium text-slate-500 line-clamp-1 leading-tight">
                                                                {n.message}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Right side: Time + Badge + Actions */}
                                                    <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
                                                        <span className="text-[9px] font-semibold text-slate-500 w-14 sm:w-16 text-right">
                                                            {timeString}
                                                        </span>
                                                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md w-14 sm:w-16 text-center ${cfg.badge}`}>
                                                            {cfg.badgeText}
                                                        </span>
                                                        <button className="text-slate-400 hover:text-slate-700 transition-colors">
                                                            <MoreVertical size={14} />
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </AnimatePresence>

                                    {/* Load More Button */}
                                    {filteredNotifications.length > 0 && (
                                        <div className="p-4 sm:p-6 flex justify-center">
                                            <button className="flex items-center gap-2 px-5 py-1.5 border border-emerald-600 rounded-lg text-[11px] font-bold text-emerald-700 hover:bg-emerald-50 transition-colors bg-white">
                                                Load More
                                                <ChevronDown size={14} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Bottom Promo */}
                    <div className="mt-4 bg-white border border-slate-200 rounded-2xl shadow-sm p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                                <Mail size={16} className="text-emerald-600" />
                            </div>
                            <div>
                                <h3 className="text-[14px] font-bold text-slate-800 mb-0.5">Never miss an important update!</h3>
                                <p className="text-[11px] font-medium text-slate-700 leading-tight">
                                    Enable email & SMS notifications to stay informed about payments, <br />
                                    invoices, bookings and event updates.
                                </p>
                            </div>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-[11px] font-bold transition-colors whitespace-nowrap flex-shrink-0 shadow-sm">
                            <CheckCircle size={14} /> Manage Notification Preferences
                        </button>
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN: Sidebar (Now at the top level) */}
            <div className="w-full lg:w-[280px] xl:w-[310px] flex-shrink-0 space-y-6">

                {/* Notification Filters */}
                <div className="bg-white rounded-2xl flex flex-col overflow-hidden" style={{ boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset' }}>
                    <div className="px-4 py-2 bg-slate-100 border-b border-slate-200 flex items-center gap-2">
                        <Filter size={14} className="text-slate-800" />
                        <h2 className="text-[12px] font-bold text-slate-800 tracking-tight">Notification Filters</h2>
                    </div>
                    <div className="px-3 pb-3">
                        {[
                            { label: 'All Notifications', id: 'All', count: 28, icon: <Mail size={14} />, badge: 'bg-emerald-50 text-emerald-700' },
                            { label: 'Unread', id: 'Unread', count: 6, icon: <Mail size={14} />, badge: 'bg-blue-50 text-blue-600' },
                            { label: 'Important', id: 'Important', count: 4, icon: <Bell size={14} />, badge: 'bg-orange-50 text-orange-500' },
                            { label: 'Payments', id: 'Payments', count: 5, icon: <CreditCard size={14} />, badge: 'bg-emerald-50 text-emerald-600' },
                            { label: 'Invoices', id: 'Invoices', count: 6, icon: <FileText size={14} />, badge: 'bg-purple-50 text-purple-600' },
                            { label: 'Bookings', id: 'Bookings', count: 3, icon: <Calendar size={14} />, badge: 'bg-blue-50 text-blue-600' },
                            { label: 'Updates', id: 'Updates', count: 14, icon: <Megaphone size={14} />, badge: 'bg-purple-50 text-purple-600' }
                        ].map((item, idx) => {
                            const isActive = statusFilter === item.id;
                            return (
                                <div key={item.label}>
                                    <button
                                        onClick={() => setStatusFilter(item.id)}
                                        className={`w-full flex items-center justify-between px-2 py-1.5 rounded-xl transition-colors ${isActive ? 'bg-emerald-50' : 'hover:bg-slate-50'}`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className={isActive ? 'text-emerald-700' : 'text-slate-800'}>
                                                {item.icon}
                                            </div>
                                            <span className={`text-[12px] font-bold ${isActive ? 'text-emerald-700' : 'text-slate-800'}`}>
                                                {item.label}
                                            </span>
                                        </div>
                                        {item.count > 0 && (
                                            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${item.badge}`}>
                                                {item.count}
                                            </span>
                                        )}
                                    </button>
                                    {idx < 6 && <div className="h-[1px] w-full bg-slate-50 my-0.5"></div>}
                                </div>
                            );
                        })}

                        <div className="h-[1px] w-full bg-slate-50 my-1"></div>

                        <button className="w-full flex items-center justify-between px-2 py-1.5 rounded-xl hover:bg-slate-50 transition-colors">
                            <div className="flex items-center gap-2">
                                <div className="text-slate-800">
                                    <Settings size={14} />
                                </div>
                                <span className="text-[11px] font-bold text-slate-800">
                                    Manage Preferences
                                </span>
                            </div>
                            <ChevronRight size={14} className="text-slate-800" />
                        </button>
                    </div>
                </div>

                {/* Quick Actions (2x2 Grid) */}
                <div className="bg-white rounded-2xl p-5" style={{ boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset' }}>
                    <h3 className="text-[12px] font-bold text-slate-800 mb-3">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <button onClick={markAllRead} className="bg-[#f0fdf4] p-3 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-[#dcfce7]/50 transition-colors" style={{ boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' }}>
                            <Mail size={18} className="text-emerald-600" />
                            <span className="text-[11px] font-bold text-emerald-800 text-center leading-tight">Mark all as read</span>
                        </button>
                        <button className="bg-[#f0fdfa] p-3 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-[#ccfbf1]/50 transition-colors" style={{ boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' }}>
                            <CreditCard size={18} className="text-teal-600" />
                            <span className="text-[11px] font-bold text-teal-800 text-center leading-tight">Check Payments</span>
                        </button>
                        <button className="bg-[#fdf4ff] p-3 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-[#fae8ff]/50 transition-colors" style={{ boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' }}>
                            <FileText size={18} className="text-purple-600" />
                            <span className="text-[11px] font-bold text-purple-800 text-center leading-tight">View Invoices</span>
                        </button>
                        <button className="bg-[#fff7ed] p-3 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-[#ffedd5]/50 transition-colors" style={{ boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' }}>
                            <Headphones size={18} className="text-orange-500" />
                            <span className="text-[11px] font-bold text-orange-800 text-center leading-tight">Contact Support</span>
                        </button>
                    </div>
                </div>

                {/* Need Help? */}
                <div className="bg-[#f0fdf4] rounded-2xl overflow-hidden" style={{ boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px' }}>
                    <div className="p-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#14532d] flex items-center justify-center flex-shrink-0 text-white">
                            <Headphones size={14} />
                        </div>

                        <div>
                            <h3 className="text-[12px] font-bold text-slate-800 mb-0.5">Need Help?</h3>
                            <p className="text-[10px] font-medium text-slate-500 leading-tight">We're here to support you.</p>
                        </div>
                    </div>
                    <div className="px-4 pb-4 space-y-1.5">
                        <div className="bg-white rounded-md p-2 flex items-center gap-2.5 border border-[#dcfce7]">
                            <PhoneCall size={12} className="text-emerald-600" />
                            <span className="text-[11px] font-bold text-slate-700">+91-9654900525</span>
                        </div>
                        <div className="bg-white rounded-md p-2 flex items-center gap-2.5 border border-[#dcfce7]">
                            <Mail size={12} className="text-emerald-600" />
                            <span className="text-[11px] font-bold text-slate-700">info@ihwe.com</span>
                        </div>

                        <a
                            href="mailto:info@ihwe.com?subject=IHWE%20Exhibitor%20Support"
                            className="mt-[11px] flex h-[38px] w-full items-center justify-center gap-[11px] rounded-[6px] bg-[#006a4e] text-[11px] font-semibold text-white transition hover:bg-[#005b43]"
                        >
                            Contact Support
                            <ChevronRight size={15} strokeWidth={2.2} />
                        </a>
                    </div>
                    <div className="bg-[#0f4d22] p-2.5 flex items-center justify-center gap-2 text-white text-[11px] font-bold cursor-pointer hover:bg-[#14532d] transition-colors">
                        Contact Support <ChevronRight size={12} />
                    </div>
                </div>

            </div>
        </div>
    );
}
