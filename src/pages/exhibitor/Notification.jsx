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
    Bell,
    BellRing,
    CalendarDays,
    CheckCheck,
    ChevronDown,
    ChevronRight,
    CircleAlert,
    CreditCard,
    FileText,
    Filter,
    Headphones,
    LoaderCircle,
    Mail,
    Megaphone,
    MoreVertical,
    SlidersHorizontal,
    Star,
    Tag,
} from 'lucide-react';
import { API_URL } from '@/lib/api';
import { toast } from 'sonner';

const FILTERS = [
    { key: 'All', label: 'All Notifications', icon: Bell },
    { key: 'Unread', label: 'Unread', icon: Mail },
    { key: 'Important', label: 'Important', icon: BellRing },
    { key: 'Payments', label: 'Payments', icon: CreditCard },
    { key: 'Bookings', label: 'Bookings', icon: CalendarDays },
    { key: 'Updates', label: 'Updates', icon: Megaphone },
];

const TYPE_OPTIONS = [
    { value: 'all', label: 'All Types' },
    { value: 'payment', label: 'Payments' },
    { value: 'booking', label: 'Bookings' },
    { value: 'document', label: 'Documents' },
    { value: 'event', label: 'Events' },
    { value: 'update', label: 'Updates' },
    { value: 'general', label: 'General' },
];

const FALLBACK_TYPE = {
    icon: FileText,
    iconWrap: 'bg-[#eef4ff]',
    iconColor: 'text-[#3378d5]',
};

const TYPE_STYLES = {
    payment: {
        icon: Mail,
        iconWrap: 'bg-[#eafaf3]',
        iconColor: 'text-[#15976e]',
    },
    booking: {
        icon: CalendarDays,
        iconWrap: 'bg-[#fff5e9]',
        iconColor: 'text-[#f48a20]',
    },
    approval: {
        icon: CalendarDays,
        iconWrap: 'bg-[#fff5e9]',
        iconColor: 'text-[#f48a20]',
    },
    document: {
        icon: FileText,
        iconWrap: 'bg-[#f5ecff]',
        iconColor: 'text-[#8b47df]',
    },
    event: {
        icon: Megaphone,
        iconWrap: 'bg-[#eaf4ff]',
        iconColor: 'text-[#2a7bd8]',
    },
    update: {
        icon: Megaphone,
        iconWrap: 'bg-[#eaf4ff]',
        iconColor: 'text-[#2a7bd8]',
    },
    support: {
        icon: Headphones,
        iconWrap: 'bg-[#eafaf3]',
        iconColor: 'text-[#15976e]',
    },
    general: {
        icon: Star,
        iconWrap: 'bg-[#eaf4ff]',
        iconColor: 'text-[#2a7bd8]',
    },
};

function isImportant(notification) {
    return notification?.priority === 'high' || notification?.priority === 'urgent';
}

function isBooking(notification) {
    return ['booking', 'approval', 'document'].includes(notification?.type);
}

function isUpdate(notification) {
    return ['update', 'event', 'general'].includes(notification?.type);
}

function formatTimeAgo(dateValue) {
    if (!dateValue) return '';

    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return '';

    const seconds = Math.max(0, Math.floor((Date.now() - date.getTime()) / 1000));

    if (seconds < 60) return 'Just now';

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min${minutes === 1 ? '' : 's'} ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;

    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} day${days === 1 ? '' : 's'} ago`;

    const weeks = Math.floor(days / 7);
    if (weeks < 5) return `${weeks} week${weeks === 1 ? '' : 's'} ago`;

    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}

function getVisualStyle(notification) {
    const title = String(notification?.title || '').toLowerCase();
    const message = String(notification?.message || '').toLowerCase();

    if (isImportant(notification) || title.includes('reminder') || message.includes('due')) {
        return {
            icon: CircleAlert,
            iconWrap: 'bg-[#ffeaed]',
            iconColor: 'text-[#ef4962]',
        };
    }

    if (title.includes('support') || notification?.type === 'support') {
        return TYPE_STYLES.support;
    }

    if (title.includes('welcome')) {
        return TYPE_STYLES.general;
    }

    return TYPE_STYLES[notification?.type] || FALLBACK_TYPE;
}

function getBadge(notification) {
    if (!notification?.read) {
        return {
            label: 'New',
            className: 'bg-[#e9f8f0] text-[#148a64]',
        };
    }

    if (isImportant(notification)) {
        return {
            label: 'Important',
            className: 'bg-[#fff1e5] text-[#df761d]',
        };
    }

    if (isUpdate(notification) || notification?.type === 'support') {
        return {
            label: 'Update',
            className: 'bg-[#f1f3f6] text-[#5d6e86]',
        };
    }

    return {
        label: 'Info',
        className: 'bg-[#eaf3fd] text-[#2b6fb7]',
    };
}

function StatCard({ icon: Icon, iconWrap, iconColor, label, value, helper, helperColor }) {
    return (
        <div className="flex h-[112px] items-center rounded-[15px] border border-[#e7ebf0] bg-white px-[22px] shadow-[0_3px_14px_rgba(15,23,42,0.035)]">
            <div className={`flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full ${iconWrap}`}>
                <Icon size={25} strokeWidth={1.9} className={iconColor} />
            </div>

            <div className="ml-[18px] min-w-0">
                <p className="text-[12px] font-semibold leading-[16px] text-[#455b78]">{label}</p>
                <p className="mt-[3px] text-[22px] font-bold leading-[25px] text-[#101c38]">{value}</p>
                <p className={`mt-[6px] text-[11px] font-medium leading-[14px] ${helperColor}`}>{helper}</p>
            </div>
        </div>
    );
}

export default function Notification() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('All');
    const [typeFilter, setTypeFilter] = useState('all');
    const [visibleCount, setVisibleCount] = useState(7);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('exhibitorToken');
            const response = await fetch(`${API_URL}/seller-portal/notifications`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Notification request failed: ${response.status}`);
            }

            const result = await response.json();
            setNotifications(Array.isArray(result?.data) ? result.data : []);
        } catch (error) {
            console.error('Failed to load notifications:', error);
            toast.error('Failed to load notifications');
        } finally {
            setLoading(false);
        }
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
    const unreadCount = notifications.filter((item) => !item.read).length;
    const importantCount = notifications.filter(isImportant).length;
    const paymentsCount = notifications.filter((item) => item.type === 'payment').length;
    const bookingsCount = notifications.filter(isBooking).length;
    const updatesCount = notifications.filter(isUpdate).length;

    const countByFilter = {
        All: totalCount,
        Unread: unreadCount,
        Important: importantCount,
        Payments: paymentsCount,
        Bookings: bookingsCount,
        Updates: updatesCount,
    };

    const filteredNotifications = useMemo(() => {
        let filtered = [...notifications];

        if (statusFilter === 'Unread') {
            filtered = filtered.filter((item) => !item.read);
        } else if (statusFilter === 'Important') {
            filtered = filtered.filter(isImportant);
        } else if (statusFilter === 'Payments') {
            filtered = filtered.filter((item) => item.type === 'payment');
        } else if (statusFilter === 'Bookings') {
            filtered = filtered.filter(isBooking);
        } else if (statusFilter === 'Updates') {
            filtered = filtered.filter(isUpdate);
        }

        if (typeFilter !== 'all') {
            if (typeFilter === 'booking') {
                filtered = filtered.filter(isBooking);
            } else {
                filtered = filtered.filter((item) => item.type === typeFilter);
            }
        }

        return filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }, [notifications, statusFilter, typeFilter]);

    const visibleNotifications = filteredNotifications.slice(0, visibleCount);

    return (
        <div className="min-h-full w-full bg-[#f8fafc] font-['Inter',sans-serif] text-[#111c38]">
            {/* Page heading */}
            <section className="flex min-h-[96px] items-center justify-between border-b border-[#e4e9ef] bg-white px-[28px] py-[18px] sm:px-[30px]">
                <div className="flex min-w-0 items-center gap-[16px]">
                    <div className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full bg-[#edf9f4]">
                        <Bell size={27} strokeWidth={1.8} className="text-[#17956d]" />
                    </div>

                    <div className="min-w-0">
                        <h1 className="text-[22px] font-bold leading-[28px] tracking-[-0.025em] text-[#111c38]">
                            Notifications
                        </h1>
                        <p className="mt-[2px] truncate text-[12px] font-medium leading-[17px] text-[#60728a]">
                            Stay updated with the latest alerts and important updates.
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={markAllRead}
                    disabled={unreadCount === 0}
                    className="ml-4 flex h-[38px] shrink-0 items-center gap-[10px] rounded-[8px] border border-[#dfe5ec] bg-white px-[16px] text-[12px] font-semibold text-[#283956] shadow-[0_1px_2px_rgba(15,23,42,0.02)] transition hover:bg-[#f8fafc] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <Mail size={16} strokeWidth={1.8} />
                    <span className="hidden sm:inline">Mark all as read</span>
                </button>
            </section>

            <main className="px-[18px] pb-[28px] pt-[14px] sm:px-[24px]">
                {/* Statistics */}
                <section className="grid grid-cols-1 gap-[13px] sm:grid-cols-2 xl:grid-cols-4">
                    <StatCard
                        icon={Bell}
                        iconWrap="bg-[#e9faf3]"
                        iconColor="text-[#169a70]"
                        label="Total Notifications"
                        value={totalCount}
                        helper="All time"
                        helperColor="text-[#169a70]"
                    />
                    <StatCard
                        icon={Mail}
                        iconWrap="bg-[#e9f3ff]"
                        iconColor="text-[#217ee0]"
                        label="Unread"
                        value={unreadCount}
                        helper="New messages"
                        helperColor="text-[#247bdb]"
                    />
                    <StatCard
                        icon={BellRing}
                        iconWrap="bg-[#fff2e6]"
                        iconColor="text-[#ef861e]"
                        label="Important"
                        value={importantCount}
                        helper="Requires attention"
                        helperColor="text-[#e87713]"
                    />
                    <StatCard
                        icon={Tag}
                        iconWrap="bg-[#f3eaff]"
                        iconColor="text-[#914de0]"
                        label="Updates"
                        value={updatesCount}
                        helper="General updates"
                        helperColor="text-[#8541d0]"
                    />
                </section>

                {/* Notifications + filters */}
                <section className="mt-[14px] grid grid-cols-1 items-start gap-y-[14px] xl:grid-cols-[minmax(0,1fr)_344px] xl:gap-x-[24px]">
                    <div className="overflow-hidden rounded-[15px] border border-[#e4e9ef] bg-white shadow-[0_3px_14px_rgba(15,23,42,0.035)]">
                        <div className="flex min-h-[56px] items-center justify-between border-b border-[#e9edf2] px-[16px] py-[9px]">
                            <h2 className="text-[16px] font-bold leading-[22px] text-[#111c38]">All Notifications</h2>

                            <div className="flex items-center gap-[10px]">
                                <div className="relative">
                                    <select
                                        value={typeFilter}
                                        onChange={(event) => setTypeFilter(event.target.value)}
                                        aria-label="Filter notifications by type"
                                        className="h-[38px] min-w-[92px] appearance-none rounded-[8px] border border-[#e0e6ed] bg-white pl-[12px] pr-[30px] text-[11px] font-semibold text-[#30415c] outline-none transition focus:border-[#b8c6d7]"
                                    >
                                        {TYPE_OPTIONS.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown
                                        size={14}
                                        className="pointer-events-none absolute right-[10px] top-1/2 -translate-y-1/2 text-[#5d6d83]"
                                    />
                                </div>

                                <button
                                    type="button"
                                    aria-label="Notification filter options"
                                    className="flex h-[38px] w-[38px] items-center justify-center rounded-[8px] border border-[#e0e6ed] bg-white text-[#5e7088] transition hover:bg-[#f8fafc]"
                                >
                                    <SlidersHorizontal size={15} strokeWidth={1.9} />
                                </button>
                            </div>
                        </div>

                        <div className="min-h-[470px]">
                            {loading ? (
                                <div className="flex min-h-[470px] flex-col items-center justify-center gap-3 text-[#60728a]">
                                    <LoaderCircle size={28} className="animate-spin text-[#15976e]" />
                                    <p className="text-[12px] font-medium">Loading notifications...</p>
                                </div>
                            ) : visibleNotifications.length === 0 ? (
                                <div className="flex min-h-[470px] flex-col items-center justify-center px-6 text-center">
                                    <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#eef8f4] text-[#16976f]">
                                        <CheckCheck size={27} />
                                    </div>
                                    <h3 className="mt-4 text-[16px] font-bold text-[#15233e]">No notifications found</h3>
                                    <p className="mt-1 text-[12px] font-medium text-[#718198]">
                                        There are no notifications matching the selected filter.
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <div>
                                        {visibleNotifications.map((notification) => {
                                            const visual = getVisualStyle(notification);
                                            const Icon = visual.icon;
                                            const badge = getBadge(notification);

                                            return (
                                                <button
                                                    type="button"
                                                    key={notification._id || `${notification.title}-${notification.createdAt}`}
                                                    onClick={() => markAsRead(notification._id, notification.read)}
                                                    className="group grid min-h-[54px] w-full grid-cols-[38px_minmax(0,1fr)_86px_60px_22px] items-center border-b border-[#e9edf2] px-[14px] text-left transition hover:bg-[#fbfcfd]"
                                                >
                                                    <div className={`flex h-[34px] w-[34px] items-center justify-center rounded-full ${visual.iconWrap}`}>
                                                        <Icon size={18} strokeWidth={1.9} className={visual.iconColor} />
                                                    </div>

                                                    <div className="min-w-0 pl-[8px] pr-[8px]">
                                                        <h3
                                                            className={`truncate text-[12px] font-bold leading-[15px] ${notification.read ? 'text-[#33445f]' : 'text-[#111c38]'
                                                                }`}
                                                        >
                                                            {notification.title || 'Notification'}
                                                        </h3>
                                                        <p className="mt-0 truncate text-[10px] font-medium leading-[14px] text-[#5f718a]">
                                                            {notification.message || 'You have a new notification.'}
                                                        </p>
                                                    </div>

                                                    <p className="whitespace-nowrap text-right text-[10px] font-medium text-[#687a92]">
                                                        {formatTimeAgo(notification.createdAt)}
                                                    </p>

                                                    <div className="flex justify-end">
                                                        <span
                                                            className={`inline-flex min-w-[50px] items-center justify-center rounded-[6px] px-[8px] py-[4px] text-[9px] font-semibold leading-none ${badge.className}`}
                                                        >
                                                            {badge.label}
                                                        </span>
                                                    </div>

                                                    <span className="flex justify-end text-[#30425f]">
                                                        <MoreVertical size={16} strokeWidth={1.8} />
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <div className="flex min-h-[48px] items-center justify-center">
                                        {visibleCount < filteredNotifications.length ? (
                                            <button
                                                type="button"
                                                onClick={() => setVisibleCount((count) => count + 7)}
                                                className="flex items-center gap-[8px] text-[11px] font-semibold text-[#2775bf] transition hover:text-[#155c9e]"
                                            >
                                                Load More
                                                <ChevronDown size={15} strokeWidth={2} />
                                            </button>
                                        ) : (
                                            <span className="text-[11px] font-medium text-[#8290a3]">
                                                {filteredNotifications.length} notification{filteredNotifications.length === 1 ? '' : 's'}
                                            </span>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <aside className="space-y-[12px]">
                        {/* Filter card */}
                        <div className="rounded-[15px] border border-[#e4e9ef] bg-white px-[14px] pb-[8px] pt-[12px] shadow-[0_3px_14px_rgba(15,23,42,0.035)]">
                            <div className="mb-[4px] flex items-center gap-[8px] px-[2px]">
                                <Filter size={17} strokeWidth={1.9} className="text-[#243550]" />
                                <h2 className="text-[14px] font-bold text-[#15223d]">Notification Filters</h2>
                            </div>

                            <div>
                                {FILTERS.map(({ key, label, icon: Icon }) => {
                                    const active = statusFilter === key;
                                    const isAll = key === 'All';

                                    return (
                                        <button
                                            type="button"
                                            key={key}
                                            onClick={() => setStatusFilter(key)}
                                            className={`flex h-[34px] w-full items-center justify-between rounded-[7px] px-[9px] transition ${active
                                                ? 'border border-[#cdece0] bg-[#effaf6]'
                                                : 'border border-transparent hover:bg-[#f8fafc]'
                                                }`}
                                        >
                                            <span className="flex min-w-0 items-center gap-[8px]">
                                                <Icon
                                                    size={14}
                                                    strokeWidth={1.85}
                                                    className={active ? 'text-[#15976e]' : 'text-[#30445f]'}
                                                />
                                                <span
                                                    className={`truncate text-[11px] font-semibold ${active ? 'text-[#168c68]' : 'text-[#40516b]'
                                                        }`}
                                                >
                                                    {label}
                                                </span>
                                            </span>

                                            <span className="flex items-center gap-[7px]">
                                                <span
                                                    className={`flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-[5px] text-[9px] font-semibold ${active || isAll
                                                        ? 'bg-[#d9f3e9] text-[#168c68]'
                                                        : 'bg-[#f1f3f6] text-[#63748c]'
                                                        }`}
                                                >
                                                    {countByFilter[key] || 0}
                                                </span>
                                                <ChevronRight size={13} strokeWidth={2} className="text-[#5e7088]" />
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Help card */}
                        <div className="rounded-[15px] border border-[#dcefe7] bg-[linear-gradient(135deg,#f2fcf8_0%,#f7fbf9_100%)] p-[16px] shadow-[0_3px_14px_rgba(15,23,42,0.03)]">
                            <div className="flex items-center gap-[12px]">
                                <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full bg-[#daf4e8] text-[#15976e]">
                                    <Headphones size={24} strokeWidth={1.9} />
                                </div>
                                <div>
                                    <h2 className="text-[14px] font-bold leading-[20px] text-[#16243f]">Need Help?</h2>
                                    <p className="mt-[2px] text-[10px] font-medium leading-[15px] text-[#6b7b91]">
                                        Our support team is here to help you.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-[13px] rounded-[8px] border border-[#e4ece8] bg-white px-[11px] py-[9px]">
                                <a
                                    href="tel:+919654900525"
                                    className="flex items-center gap-[10px] text-[10px] font-medium text-[#51637c] hover:text-[#15976e]"
                                >
                                    <span className="flex h-[24px] w-[24px] items-center justify-center rounded-[6px] bg-[#eefaf5] text-[#15976e]">
                                        <Headphones size={13} strokeWidth={2} />
                                    </span>
                                    +91-9654900525
                                </a>

                                <a
                                    href="mailto:info@ihwe.com"
                                    className="mt-[8px] flex items-center gap-[10px] text-[10px] font-medium text-[#51637c] hover:text-[#15976e]"
                                >
                                    <span className="flex h-[24px] w-[24px] items-center justify-center rounded-[6px] bg-[#eefaf5] text-[#15976e]">
                                        <Mail size={13} strokeWidth={2} />
                                    </span>
                                    info@ihwe.com
                                </a>
                            </div>

                            <a
                                href="mailto:info@ihwe.com?subject=IHWE%20Exhibitor%20Support"
                                className="mt-[11px] flex h-[38px] w-full items-center justify-center gap-[11px] rounded-[6px] bg-[#006a4e] text-[11px] font-semibold text-white transition hover:bg-[#005b43]"
                            >
                                Contact Support
                                <ChevronRight size={15} strokeWidth={2.2} />
                            </a>
                        </div>
                    </aside>
                </section>
            </main>
        </div>
    );
}
