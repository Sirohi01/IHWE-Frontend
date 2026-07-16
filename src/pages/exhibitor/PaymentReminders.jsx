// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import {
//     Bell, CheckCircle2, Clock, AlertTriangle, ArrowRight,
//     FileText, Calendar, Filter, CalendarDays,
//     PhoneCall, Mail, Settings, HeadphonesIcon, HelpCircle,
//     ChevronLeft, ChevronRight
// } from 'lucide-react';
// import { useExhibitorCtx } from '@/context/ExhibitorContext';
// import { API_URL } from '@/lib/api';

// const DOC_TYPE_SLUGS = {
//     'Invoice': 'invoice',
//     'Proforma Invoice': 'proforma',
//     'Delivery Challan': 'challan',
//     'Credit Note': 'creditnote',
//     'Credit Note (Legacy)': 'legacycreditnote',
//     'Debit Note': 'debitnote',
// };

// export default function PaymentReminders() {
//     const { data } = useExhibitorCtx();
//     const navigate = useNavigate();
//     const token = localStorage.getItem('exhibitorToken');

//     const [overview, setOverview] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 5;

//     const formatRupee = (amount) => {
//         return new Intl.NumberFormat('en-IN', {
//             style: 'currency',
//             currency: 'INR',
//             minimumFractionDigits: 2,
//             maximumFractionDigits: 2
//         }).format(amount || 0);
//     };

//     const formatDate = (dateStr) => {
//         if (!dateStr) return '—';
//         const d = new Date(dateStr);
//         if (isNaN(d.getTime())) return '—';
//         return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
//     };

//     useEffect(() => {
//         const fetchOverview = async () => {
//             if (!data?._id) return;
//             try {
//                 setLoading(true);
//                 const res = await fetch(`${API_URL}/exhibitor-auth/account-overview?id=${data._id}`, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 const json = await res.json();
//                 if (json.success) {
//                     setOverview(json.data);
//                 }
//             } catch (err) {
//                 console.error('Failed to fetch account overview', err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchOverview();
//     }, [data?._id, token]);

//     const viewDocument = (doc) => {
//         const slug = DOC_TYPE_SLUGS[doc.documentType];
//         if (!slug) return;
//         window.open(`/exhibitor-print/${slug}/${doc.id}`, '_blank', 'noopener,noreferrer');
//     };

//     const financials = overview?.financials || {};
//     const recentDocuments = overview?.recentDocuments || [];

//     const invoices = recentDocuments.filter(doc => doc.documentType === 'Invoice');

//     const totalDue = financials?.remainingBalance || 0;
//     const totalPaid = financials?.paidAmount || 0;
//     const totalInvoices = invoices.length;

//     // Remaining by ID map
//     const remainingById = new Map(
//         (financials?.remainingBreakdown || []).map((entry) => [String(entry.id), entry.remainingAmount])
//     );

//     // Calculate details for each invoice
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     const processedInvoices = invoices.map(inv => {
//         const amtDue = remainingById.get(String(inv.id)) || 0;
//         const dueDate = inv.dueDate ? new Date(inv.dueDate) : new Date(new Date(inv.date).getTime() + (30 * 24 * 60 * 60 * 1000));
//         dueDate.setHours(0, 0, 0, 0);

//         const diffTime = dueDate - today;
//         const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//         let status = amtDue <= 0 ? 'Paid' : 'Upcoming';
//         if (amtDue > 0 && daysLeft <= 3 && daysLeft >= 0) status = 'Due Soon';
//         if (amtDue > 0 && daysLeft < 0) status = 'Overdue';

//         return {
//             ...inv,
//             amtDue,
//             dueDateObj: dueDate,
//             dueDateStr: formatDate(dueDate),
//             daysLeft,
//             statusDisplay: status
//         };
//     }).sort((a, b) => {
//         if (a.amtDue > 0 && b.amtDue <= 0) return -1;
//         if (a.amtDue <= 0 && b.amtDue > 0) return 1;
//         return a.dueDateObj - b.dueDateObj;
//     });

//     const unpaidInvoices = processedInvoices.filter(inv => inv.amtDue > 0);
//     const nearestInvoice = unpaidInvoices.length > 0 ? unpaidInvoices[0] : null;

//     let dueInDays = '—';
//     let dueInDateStr = '—';
//     if (nearestInvoice) {
//         if (nearestInvoice.daysLeft < 0) dueInDays = `${Math.abs(nearestInvoice.daysLeft)} Days Ago`;
//         else if (nearestInvoice.daysLeft === 0) dueInDays = 'Today';
//         else dueInDays = `${nearestInvoice.daysLeft} Days`;

//         dueInDateStr = nearestInvoice.dueDateStr;
//     }

//     const companyName = data?.exhibitorName || 'Company Name';
//     const stallNo = data?.participation?.stallFor || data?.participation?.stall?.stallNumber || data?.participation?.stallNo || 'TBA';

//     // Pagination Logic
//     const totalPages = Math.ceil(processedInvoices.length / itemsPerPage);
//     const paginatedInvoices = processedInvoices.slice(
//         (currentPage - 1) * itemsPerPage,
//         currentPage * itemsPerPage
//     );

//     return (
//         <div className="space-y-2 font-inter bg-slate-50/50 px-2 lg:px-4 py-2 min-h-full">

//             {/* Header Box */}
//             <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-2.5 px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
//                 <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shrink-0">
//                         <Bell size={20} />
//                     </div>
//                     <div>
//                         <h1 className="text-lg font-bold text-slate-800 leading-tight">Payment Reminders</h1>
//                         <p className="text-[11px] text-slate-500 font-medium">Stay updated on your due payments and avoid late fees.</p>
//                     </div>
//                 </div>

//                 <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
//                     <div className="w-8 h-8 rounded-full bg-[#182a3c] text-[#c9974c] flex items-center justify-center border-2 border-[#c9974c] text-xs font-bold shrink-0">
//                         {companyName.substring(0, 1)}
//                     </div>
//                     <div className="flex flex-col pr-2">
//                         <span className="text-[12px] font-bold text-slate-800 leading-none mb-0.5">{companyName}</span>
//                         <span className="text-[10px] font-semibold text-slate-500 leading-none">Stall No. {stallNo}</span>
//                     </div>
//                 </div>
//             </div>

//             {/* Alert Banner */}
//             {unpaidInvoices.length > 0 && (
//                 <motion.div
//                     initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
//                     className="bg-red-50 rounded-xl border border-red-100 p-2.5 px-4 flex items-center justify-between gap-3"
//                 >
//                     <div className="flex items-center gap-3">
//                         <div className="w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center shrink-0">
//                             <Bell size={16} className="animate-pulse" />
//                         </div>
//                         <div>
//                             <h3 className="text-sm font-bold text-red-600 leading-tight">You have {unpaidInvoices.length} payment{unpaidInvoices.length > 1 ? 's' : ''} due!</h3>
//                             <p className="text-[11px] text-slate-600 font-medium mt-0.5">Make the payment on or before the due date to avoid late fees and service interruptions.</p>
//                         </div>
//                     </div>
//                     <button onClick={() => navigate('/exhibitor-dashboard/invoices')} className="px-3 py-1.5 bg-white text-slate-700 text-[11px] font-bold border border-slate-200 rounded-md hover:bg-slate-50 transition-colors whitespace-nowrap shadow-sm">
//                         View Invoice
//                     </button>
//                 </motion.div>
//             )}

//             {/* Stats Row */}
//             <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
//                 <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3 flex items-center gap-3">
//                     <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0">
//                         <FileText size={18} />
//                     </div>
//                     <div>
//                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Total Due</p>
//                         <h2 className="text-base font-bold text-slate-800 leading-none">{formatRupee(totalDue)}</h2>
//                         <p className="text-[10px] font-semibold text-red-500 mt-1">{unpaidInvoices.length} Due</p>
//                     </div>
//                 </div>

//                 <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3 flex items-center gap-3">
//                     <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
//                         <CalendarDays size={18} />
//                     </div>
//                     <div>
//                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Due In</p>
//                         <h2 className="text-base font-bold text-slate-800 leading-none">{dueInDays}</h2>
//                         <p className="text-[10px] font-semibold text-orange-500 mt-1">{dueInDateStr}</p>
//                     </div>
//                 </div>

//                 <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3 flex items-center gap-3">
//                     <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
//                         <CheckCircle2 size={18} />
//                     </div>
//                     <div>
//                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Total Paid</p>
//                         <h2 className="text-base font-bold text-slate-800 leading-none">{formatRupee(totalPaid)}</h2>
//                         <p className="text-[10px] font-semibold text-emerald-600 mt-1">{invoices.length - unpaidInvoices.length} Paid</p>
//                     </div>
//                 </div>

//                 <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3 flex items-center gap-3">
//                     <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center shrink-0">
//                         <FileText size={18} />
//                     </div>
//                     <div>
//                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Total Invoices</p>
//                         <h2 className="text-base font-bold text-slate-800 leading-none">{formatRupee(totalDue + totalPaid)}</h2>
//                         <p className="text-[10px] font-semibold text-purple-600 mt-1">{totalInvoices} Invoices</p>
//                     </div>
//                 </div>
//             </div>

//             {/* Table Section */}
//             <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
//                 <div className="p-3 border-b border-slate-100 flex items-center justify-between">
//                     <h3 className="text-sm font-bold text-slate-800">Payment Reminders</h3>
//                     <div className="text-[11px] font-bold text-slate-500 bg-slate-50 px-3 py-1 rounded-md border border-slate-200">
//                         Total {invoices.length} Invoices
//                     </div>
//                 </div>
//                 <div className="overflow-x-auto">
//                     <table className="w-full text-left border-collapse">
//                         <thead>
//                             <tr className="bg-slate-50 border-b border-slate-100">
//                                 <th className="py-2 px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Invoice No.</th>
//                                 <th className="py-2 px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Description</th>
//                                 <th className="py-2 px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Due Date</th>
//                                 <th className="py-2 px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Amount Due</th>
//                                 <th className="py-2 px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Days Left</th>
//                                 <th className="py-2 px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
//                                 <th className="py-2 px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Action</th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-slate-100">
//                             {paginatedInvoices.length === 0 && (
//                                 <tr>
//                                     <td colSpan="7" className="py-6 text-center text-xs text-slate-500">No invoices found.</td>
//                                 </tr>
//                             )}
//                             {paginatedInvoices.map((inv, idx) => {
//                                 let statusStyles = "";
//                                 let icon = null;
//                                 let daysLeftText = inv.daysLeft < 0 ? 'Overdue' : `${inv.daysLeft} Days`;
//                                 let daysLeftStyle = "";
//                                 let rowHighlight = "";

//                                 if (inv.statusDisplay === 'Paid') {
//                                     statusStyles = "bg-emerald-50 text-emerald-600 border border-emerald-100";
//                                     icon = <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />;
//                                     daysLeftText = "Cleared";
//                                     daysLeftStyle = "text-emerald-500 font-bold";
//                                     rowHighlight = "hover:bg-slate-50/50";
//                                 } else if (inv.statusDisplay === 'Overdue') {
//                                     statusStyles = "bg-red-50 text-red-600 border border-red-100";
//                                     icon = <AlertTriangle size={14} className="text-red-500 shrink-0" />;
//                                     daysLeftStyle = "text-red-600 font-bold";
//                                     rowHighlight = "bg-red-50 hover:bg-red-100";
//                                 } else if (inv.statusDisplay === 'Due Soon') {
//                                     statusStyles = "bg-red-50 text-red-600 border border-red-100";
//                                     icon = <AlertTriangle size={14} className="text-red-500 shrink-0" />;
//                                     daysLeftStyle = "text-red-600 font-bold";
//                                     rowHighlight = "bg-orange-50 hover:bg-orange-100";
//                                 } else {
//                                     statusStyles = "bg-orange-50 text-orange-600 border border-orange-100";
//                                     icon = <AlertTriangle size={14} className="text-orange-400 shrink-0" />;
//                                     daysLeftStyle = "text-orange-500 font-bold";
//                                     rowHighlight = "bg-yellow-50 hover:bg-yellow-100";
//                                 }

//                                 return (
//                                     <tr key={inv.id} className={`${rowHighlight} transition-colors border-b border-slate-50 last:border-0`}>
//                                         <td className="py-3 px-3 align-middle">
//                                             <div className="flex items-center gap-2">
//                                                 {icon}
//                                                 <span className="text-[12px] font-bold text-slate-700">{inv.documentNo}</span>
//                                             </div>
//                                         </td>
//                                         <td className="py-3 px-3 align-middle">
//                                             <p className="text-[12px] font-bold text-slate-800 leading-tight">Stall Booking</p>
//                                             <p className="text-[10px] text-slate-500 font-medium leading-none mt-0.5">{inv.type_of_invoice || 'Invoice'}</p>
//                                         </td>
//                                         <td className="py-3 px-3 align-middle">
//                                             <p className="text-[12px] font-bold text-slate-800 leading-none">{inv.dueDateStr}</p>
//                                         </td>
//                                         <td className="py-3 px-3 align-middle">
//                                             <p className="text-[12px] font-bold text-slate-800 leading-none">{formatRupee(inv.amtDue > 0 ? inv.amtDue : inv.amount)}</p>
//                                         </td>
//                                         <td className="py-3 px-3 align-middle">
//                                             <span className={`text-[11px] ${daysLeftStyle}`}>{daysLeftText}</span>
//                                         </td>
//                                         <td className="py-3 px-3 align-middle">
//                                             <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${statusStyles}`}>
//                                                 {inv.statusDisplay}
//                                             </span>
//                                         </td>
//                                         <td className="py-3 px-3 align-middle">
//                                             <button onClick={() => viewDocument(inv)} className="px-2.5 py-1 bg-white border border-slate-200 text-emerald-700 text-[10px] font-bold rounded hover:bg-emerald-50 hover:border-emerald-200 transition-colors shadow-sm">
//                                                 View Invoice
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 );
//                             })}
//                         </tbody>
//                     </table>
//                 </div>

//                 {/* Pagination Controls */}
//                 {totalPages > 1 && (
//                     <div className="p-2 border-t border-slate-100 flex items-center justify-between bg-slate-50">
//                         <span className="text-[11px] font-semibold text-slate-500 pl-2">
//                             Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, processedInvoices.length)} of {processedInvoices.length} Invoices
//                         </span>
//                         <div className="flex items-center gap-1">
//                             <button
//                                 onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
//                                 disabled={currentPage === 1}
//                                 className="w-6 h-6 flex items-center justify-center rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                             >
//                                 <ChevronLeft size={14} />
//                             </button>
//                             <span className="text-[11px] font-bold text-slate-700 px-2">Page {currentPage} of {totalPages}</span>
//                             <button
//                                 onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
//                                 disabled={currentPage === totalPages}
//                                 className="w-6 h-6 flex items-center justify-center rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                             >
//                                 <ChevronRight size={14} />
//                             </button>
//                         </div>
//                     </div>
//                 )}
//             </div>

//             {/* Bottom Cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                 {/* Tip Card */}
//                 <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3 flex items-center gap-3">
//                     <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
//                         <Calendar size={14} />
//                     </div>
//                     <p className="text-[11px] font-bold text-slate-700 leading-tight">
//                         <span className="text-emerald-700">Tip:</span> Pay early to ensure uninterrupted services and a smooth event experience.
//                     </p>
//                 </div>

//                 {/* Help Card */}
//                 <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
//                     <div className="flex items-center gap-3">
//                         <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
//                             <HeadphonesIcon size={16} />
//                         </div>
//                         <div>
//                             <h4 className="text-[12px] font-bold text-slate-800">Need Help?</h4>
//                             <p className="text-[10px] font-semibold text-slate-500 leading-none mt-0.5">Contact our support team.</p>
//                         </div>
//                     </div>
//                     <div className="flex items-center gap-4 text-[11px] font-bold text-slate-600">
//                         <div className="flex items-center gap-1.5">
//                             <PhoneCall size={12} className="text-emerald-600" />
//                             +91-9654900525
//                         </div>
//                         <div className="flex items-center gap-1.5">
//                             <Mail size={12} className="text-emerald-600" />
//                             info@ihwe.com
//                         </div>
//                     </div>
//                 </div>
//             </div>

//         </div>
//     );
// }
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    AlertCircle,
    ArrowRight,
    Bell,
    CalendarDays,
    CheckCircle2,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Download,
    Eye,
    FileText,
    Headphones,
    IndianRupee,
    Lightbulb,
    Loader2,
    Mail,
    MessageCircle,
    Phone,
    ReceiptText,
    Search,
    Send,
    Filter,
} from 'lucide-react';

import { useExhibitorCtx } from '@/context/ExhibitorContext';
import { API_URL } from '@/lib/api';

const DOC_TYPE_SLUGS = {
    Invoice: 'invoice',
    'Proforma Invoice': 'proforma',
    'Delivery Challan': 'challan',
    'Credit Note': 'creditnote',
    'Credit Note (Legacy)': 'legacycreditnote',
    'Debit Note': 'debitnote',
};

const PAYMENT_ROUTE = '/exhibitor-dashboard/payment';
const ITEMS_PER_PAGE = 2;
const DUE_SOON_DAYS = 15;

const FALLBACK_MANAGER_AVATAR = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#eef4f8"/>
      <stop offset="1" stop-color="#d8e4ec"/>
    </linearGradient>
  </defs>
  <rect width="120" height="120" rx="60" fill="url(#bg)"/>
  <circle cx="60" cy="48" r="24" fill="#d9a276"/>
  <path d="M36 46c1-21 12-30 26-30 18 0 27 13 25 34-7-11-17-15-29-14-8 1-14 4-22 10z" fill="#202a35"/>
  <path d="M30 116c3-25 14-39 30-39s28 14 31 39" fill="#172d4b"/>
  <path d="M45 78l15 15 15-15" fill="#ffffff"/>
  <path d="M48 56c4 5 8 7 12 7s8-2 12-7c-2 12-7 18-12 18s-10-6-12-18z" fill="#35251f" opacity=".8"/>
</svg>
`)}`;

const safeNumber = (value) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
};

const resolveImageUrl = (value) => {
    const raw =
        typeof value === 'string'
            ? value
            : value?.secure_url ||
            value?.url ||
            value?.path ||
            value?.location ||
            value?.src ||
            '';

    if (!raw) return '';

    const trimmed = String(raw).trim();

    if (
        trimmed.startsWith('http://') ||
        trimmed.startsWith('https://') ||
        trimmed.startsWith('data:') ||
        trimmed.startsWith('blob:')
    ) {
        return trimmed;
    }

    if (trimmed.startsWith('//')) return `https:${trimmed}`;

    try {
        const apiOrigin = new URL(API_URL, window.location.origin).origin;
        return `${apiOrigin}/${trimmed.replace(/^\/+/, '')}`;
    } catch {
        return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
    }
};

const normalizePhoneForWhatsApp = (phone) => {
    let number = String(phone || '').replace(/\D/g, '');

    if (number.startsWith('0')) number = `91${number.slice(1)}`;
    else if (number.length === 10) number = `91${number}`;

    return number;
};

const formatStallNo = (value) => {
    if (value === null || value === undefined) return '';

    const normalized = String(value).trim();
    if (!normalized || /^[a-f\d]{24}$/i.test(normalized)) return '';

    return normalized;
};

export default function PaymentReminders() {
    const { data } = useExhibitorCtx();
    const navigate = useNavigate();
    const token = localStorage.getItem('exhibitorToken');

    const [overview, setOverview] = useState(null);
    const [manager, setManager] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const formatRupee = (amount) =>
        `₹${new Intl.NumberFormat('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(safeNumber(amount))}`;

    const formatDate = (value) => {
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return '—';

        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    const formatWeekday = (value) => {
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return '—';
        return date.toLocaleDateString('en-GB', { weekday: 'long' });
    };

    useEffect(() => {
        const controller = new AbortController();

        const fetchOverview = async () => {
            if (!data?._id) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);

                const response = await fetch(
                    `${API_URL}/exhibitor-auth/account-overview?id=${data._id}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                        signal: controller.signal,
                    }
                );

                const json = await response.json();
                if (response.ok && json?.success) setOverview(json.data);
            } catch (error) {
                if (error?.name !== 'AbortError') {
                    console.error('Failed to fetch account overview:', error);
                }
            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
        };

        fetchOverview();
        return () => controller.abort();
    }, [data?._id, token]);

    useEffect(() => {
        const rmUsername =
            data?.spokenWith ||
            data?.referredBy ||
            data?.relationshipManagerUsername ||
            overview?.relationshipManagerUsername;

        if (!rmUsername) return undefined;

        const controller = new AbortController();

        const fetchManager = async () => {
            try {
                const response = await fetch(
                    `${API_URL}/admin/by-username?username=${encodeURIComponent(rmUsername)}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                        signal: controller.signal,
                    }
                );

                const json = await response.json();
                const resolvedManager =
                    json?.data || json?.admin || json?.user || json;

                if (response.ok && resolvedManager) setManager(resolvedManager);
            } catch (error) {
                if (error?.name !== 'AbortError') {
                    console.error('Failed to fetch relationship manager:', error);
                }
            }
        };

        fetchManager();
        return () => controller.abort();
    }, [
        data?.spokenWith,
        data?.referredBy,
        data?.relationshipManagerUsername,
        overview?.relationshipManagerUsername,
        token,
    ]);

    const financials = overview?.financials || {};
    const recentDocuments = overview?.recentDocuments || [];

    const invoices = useMemo(
        () => recentDocuments.filter((doc) => doc.documentType === 'Invoice'),
        [recentDocuments]
    );

    const remainingById = useMemo(
        () =>
            new Map(
                (financials?.remainingBreakdown || []).map((entry) => [
                    String(entry.id),
                    safeNumber(entry.remainingAmount),
                ])
            ),
        [financials?.remainingBreakdown]
    );

    const processedInvoices = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return invoices
            .map((invoice) => {
                const mappedAmount = remainingById.get(String(invoice.id));
                const amountDue =
                    mappedAmount !== undefined
                        ? mappedAmount
                        : safeNumber(
                            invoice.remainingAmount ??
                            invoice.balanceDue ??
                            invoice.amountDue
                        );

                const sourceDate =
                    invoice.dueDate ||
                    invoice.date ||
                    invoice.createdAt ||
                    Date.now();

                let dueDate = invoice.dueDate
                    ? new Date(invoice.dueDate)
                    : new Date(
                        new Date(sourceDate).getTime() +
                        30 * 24 * 60 * 60 * 1000
                    );

                if (Number.isNaN(dueDate.getTime())) dueDate = new Date();
                dueDate.setHours(0, 0, 0, 0);

                const daysLeft = Math.ceil(
                    (dueDate.getTime() - today.getTime()) /
                    (1000 * 60 * 60 * 24)
                );

                let statusDisplay = 'Upcoming';
                if (amountDue <= 0) statusDisplay = 'Paid';
                else if (daysLeft < 0) statusDisplay = 'Overdue';
                else if (daysLeft <= DUE_SOON_DAYS) statusDisplay = 'Due Soon';

                return {
                    ...invoice,
                    amountDue,
                    daysLeft,
                    statusDisplay,
                    dueDateObj: dueDate,
                    dueDateStr: formatDate(dueDate),
                    weekday: formatWeekday(dueDate),
                };
            })
            .sort((a, b) => {
                if (a.amountDue > 0 && b.amountDue <= 0) return -1;
                if (a.amountDue <= 0 && b.amountDue > 0) return 1;
                return a.dueDateObj - b.dueDateObj;
            });
    }, [invoices, remainingById]);

    const overdueInvoices = processedInvoices.filter(
        (invoice) => invoice.statusDisplay === 'Overdue'
    );
    const dueSoonInvoices = processedInvoices.filter(
        (invoice) => invoice.statusDisplay === 'Due Soon'
    );
    const paidInvoices = processedInvoices.filter(
        (invoice) => invoice.statusDisplay === 'Paid'
    );

    const filteredInvoices = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();

        return processedInvoices.filter((invoice) => {
            const filterMatches =
                activeFilter === 'All' || invoice.statusDisplay === activeFilter;

            if (!filterMatches) return false;
            if (!term) return true;

            return [
                invoice.documentNo,
                invoice.type_of_invoice,
                invoice.description,
                invoice.items?.[0]?.description,
                invoice.statusDisplay,
            ]
                .filter(Boolean)
                .join(' ')
                .toLowerCase()
                .includes(term);
        });
    }, [processedInvoices, activeFilter, searchTerm]);

    useEffect(() => setCurrentPage(1), [activeFilter, searchTerm]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredInvoices.length / ITEMS_PER_PAGE)
    );

    const paginatedInvoices = filteredInvoices.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const totalOutstanding = safeNumber(
        financials.remainingBalance ??
        financials.totalOutstanding ??
        processedInvoices.reduce(
            (sum, invoice) => sum + Math.max(invoice.amountDue, 0),
            0
        )
    );

    const overdueAmount = overdueInvoices.reduce(
        (sum, invoice) => sum + Math.max(invoice.amountDue, 0),
        0
    );

    const totalPaid = safeNumber(
        financials.paidAmount ?? financials.totalPaid
    );

    const totalInvoiced = safeNumber(
        financials.totalInvoiced ??
        financials.totalAmount ??
        totalOutstanding + totalPaid
    );

    const paymentCount = safeNumber(
        financials.paymentCount ??
        financials.totalPayments ??
        overview?.payments?.length
    );

    const companyName =
        data?.exhibitorName ||
        data?.companyName ||
        data?.organizationName ||
        'Velruma Pvt. Ltd.';

    const stallNo =
        formatStallNo(data?.participation?.stall?.stallNumber) ||
        formatStallNo(data?.participation?.stallNo) ||
        formatStallNo(data?.stallNo) ||
        formatStallNo(data?.participation?.stallNumber) ||
        'TBA';

    const rawManagerImage =
        manager?.profileImage ||
        manager?.profilePhoto ||
        manager?.photo ||
        manager?.image ||
        manager?.imageUrl ||
        manager?.avatar ||
        manager?.adminProfileImage ||
        overview?.relationshipManager?.profileImage ||
        overview?.relationshipManager?.image ||
        data?.relationshipManager?.profileImage ||
        data?.relationshipManager?.image ||
        '';

    const managerData = {
        name:
            manager?.name ||
            manager?.fullName ||
            manager?.username ||
            overview?.relationshipManager?.name ||
            data?.relationshipManager?.name ||
            'Vansh Chaudhary',
        role:
            manager?.designation ||
            manager?.role ||
            overview?.relationshipManager?.designation ||
            data?.relationshipManager?.designation ||
            'Finance Executive',
        phone:
            manager?.mobile ||
            manager?.phone ||
            manager?.contactNumber ||
            overview?.relationshipManager?.phone ||
            data?.relationshipManager?.phone ||
            '09568259784',
        email:
            manager?.email ||
            overview?.relationshipManager?.email ||
            data?.relationshipManager?.email ||
            'vansh.chaudhary@ihwe.in',
        image: resolveImageUrl(rawManagerImage) || FALLBACK_MANAGER_AVATAR,
    };

    const filterTabs = [
        { label: 'All', count: processedInvoices.length },
        { label: 'Overdue', count: overdueInvoices.length },
        { label: 'Due Soon', count: dueSoonInvoices.length },
        { label: 'Paid', count: paidInvoices.length },
    ];

    const viewDocument = (document) => {
        const slug = DOC_TYPE_SLUGS[document.documentType];
        if (!slug) return;

        window.open(
            `/exhibitor-print/${slug}/${document.id}`,
            '_blank',
            'noopener,noreferrer'
        );
    };

    const payNow = (invoice) => {
        navigate(PAYMENT_ROUTE, {
            state: {
                invoiceId: invoice.id,
                invoiceNo: invoice.documentNo,
                amount: invoice.amountDue,
            },
        });
    };

    const sendReminder = (invoice) => {
        const subject = encodeURIComponent(
            `Payment support for ${invoice.documentNo || 'invoice'}`
        );
        const body = encodeURIComponent(
            `Hello ${managerData.name},\n\nPlease help me with payment for invoice ${invoice.documentNo || ''
            }.\nAmount due: ${formatRupee(invoice.amountDue)}.\n\nThank you.`
        );

        window.location.href = `mailto:${managerData.email}?subject=${subject}&body=${body}`;
    };

    const openWhatsApp = () => {
        const number = normalizePhoneForWhatsApp(managerData.phone);
        const message = encodeURIComponent(
            `Hello ${managerData.name}, I need help regarding my payment reminder.`
        );

        window.open(
            `https://wa.me/${number}?text=${message}`,
            '_blank',
            'noopener,noreferrer'
        );
    };

    const getInvoiceMeta = (invoice) => {
        const firstItem = invoice?.items?.[0] || {};
        const area =
            firstItem.area ||
            firstItem.areaSqm ||
            invoice.area ||
            data?.participation?.stall?.area ||
            data?.participation?.area;

        const cleanArea = area
            ? String(area).replace(/\s*sqm\s*/i, '').trim()
            : '';

        const description =
            invoice.description ||
            firstItem.shortDescription ||
            (String(firstItem.description || '')
                .toLowerCase()
                .includes('stall')
                ? 'Stall Booking'
                : '') ||
            'Stall Booking';

        return {
            description,
            details: `${cleanArea ? `${cleanArea} Sqm Stall  |  ` : ''}Stall No. ${stallNo}`,
        };
    };

    const getStatusClass = (status) => {
        if (status === 'Overdue') return 'is-overdue';
        if (status === 'Due Soon') return 'is-due-soon';
        if (status === 'Paid') return 'is-paid';
        return 'is-upcoming';
    };

    const showPagination = filteredInvoices.length > ITEMS_PER_PAGE;

    return (
        <>
            <style>{styles}</style>

            <div className="pr-page">
                <header className="pr-header">
                    <div className="pr-title-wrap">
                        <div className="pr-title-icon">
                            <Bell size={22} strokeWidth={2} />
                        </div>
                        <div className="pr-title-copy">
                            <h1>Payment Reminders</h1>
                            <p>Stay updated on your pending payments and avoid late fees.</p>
                        </div>
                    </div>

                    <button type="button" className="pr-company-card">
                        <span className="pr-company-letter">
                            {companyName.charAt(0).toUpperCase()}
                        </span>
                        <span className="pr-company-copy">
                            <strong>{companyName}</strong>
                            <small>Stall No. {stallNo}</small>
                        </span>
                        <ChevronDown size={14} />
                    </button>
                </header>

                <div className="pr-shell">
                    <div className="pr-layout">
                        <main className="pr-left">
                            <section className="pr-summary-grid">
                                <SummaryCard
                                    tone="red"
                                    icon={<FileText size={23} />}
                                    title="Total Outstanding"
                                    value={formatRupee(totalOutstanding)}
                                    note={`${processedInvoices.filter((item) => item.amountDue > 0).length} Invoices`}
                                />
                                <SummaryCard
                                    tone="orange"
                                    icon={<CalendarDays size={23} />}
                                    title="Overdue Amount"
                                    value={formatRupee(overdueAmount)}
                                    note={`${overdueInvoices.length} ${overdueInvoices.length === 1 ? 'Invoice' : 'Invoices'}`}
                                />
                                <SummaryCard
                                    tone="green"
                                    icon={<CheckCircle2 size={24} />}
                                    title="Total Paid"
                                    value={formatRupee(totalPaid)}
                                    note={`${paymentCount || paidInvoices.length} Payments`}
                                />
                                <SummaryCard
                                    tone="purple"
                                    icon={<ReceiptText size={23} />}
                                    title="Total Invoiced"
                                    value={formatRupee(totalInvoiced)}
                                    note={`${invoices.length} Invoices`}
                                />
                            </section>

                            <section className="pr-toolbar">
                                <div className="pr-tabs">
                                    {filterTabs.map((tab) => (
                                        <button
                                            key={tab.label}
                                            type="button"
                                            data-tone={tab.label.toLowerCase().replace(' ', '-')}
                                            className={activeFilter === tab.label ? 'is-active' : ''}
                                            onClick={() => setActiveFilter(tab.label)}
                                        >
                                            {tab.label} ({tab.count})
                                        </button>
                                    ))}
                                </div>

                                <div className="pr-search-wrap">
                                    <label className="pr-search">
                                        <Search size={15} />
                                        <input
                                            value={searchTerm}
                                            onChange={(event) => setSearchTerm(event.target.value)}
                                            placeholder="Search invoice no. or description..."
                                        />
                                    </label>
                                    <button type="button" className="pr-filter-button" aria-label="Filter invoices">
                                        <Filter size={15} />
                                    </button>
                                </div>
                            </section>

                            <section className={`pr-table-card ${showPagination ? 'has-pagination' : ''}`}>
                                <div className="pr-table-head">
                                    <span>Invoice Details</span>
                                    <span>Due Date</span>
                                    <span>Amount Due</span>
                                    <span>Days Left</span>
                                    <span>Status</span>
                                    <span>Actions</span>
                                </div>

                                <div className="pr-table-body">
                                    {loading ? (
                                        <div className="pr-empty-state">
                                            <Loader2 size={19} className="pr-spin" />
                                            <strong>Loading payment reminders...</strong>
                                        </div>
                                    ) : paginatedInvoices.length === 0 ? (
                                        <div className="pr-empty-state">
                                            <FileText size={30} />
                                            <strong>No invoices found</strong>
                                            <small>Change the filter or search text.</small>
                                        </div>
                                    ) : (
                                        paginatedInvoices.map((invoice) => {
                                            const meta = getInvoiceMeta(invoice);
                                            const statusClass = getStatusClass(invoice.statusDisplay);
                                            const isPaid = invoice.statusDisplay === 'Paid';
                                            const isOverdue = invoice.statusDisplay === 'Overdue';

                                            return (
                                                <article
                                                    key={invoice.id}
                                                    className={`pr-invoice-row ${statusClass}`}
                                                >
                                                    <span className="pr-row-accent" />

                                                    <div className="pr-invoice-details pr-cell">
                                                        <div className="pr-document-icon">
                                                            <FileText size={21} />
                                                        </div>
                                                        <div className="pr-document-copy">
                                                            <strong>{invoice.documentNo || 'Invoice'}</strong>
                                                            <span className="pr-mini-badge">
                                                                {invoice.statusDisplay}
                                                            </span>
                                                            <b>{meta.description}</b>
                                                            <small>{meta.details}</small>
                                                        </div>
                                                    </div>

                                                    <div className="pr-due-cell pr-cell">
                                                        <div className="pr-date-line">
                                                            <CalendarDays size={14} />
                                                            <strong>{invoice.dueDateStr}</strong>
                                                        </div>
                                                        <small>{invoice.weekday}</small>
                                                        {!isPaid && (
                                                            <div className="pr-due-helper">
                                                                <span>{isOverdue ? 'Overdue by' : 'Due in'}</span>
                                                                <b>
                                                                    {Math.abs(invoice.daysLeft)}{' '}
                                                                    {Math.abs(invoice.daysLeft) === 1 ? 'Day' : 'Days'}
                                                                </b>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="pr-amount-cell pr-cell">
                                                        <strong>
                                                            {formatRupee(
                                                                invoice.amountDue > 0
                                                                    ? invoice.amountDue
                                                                    : invoice.amount
                                                            )}
                                                        </strong>
                                                        <small>{isPaid ? 'Paid Amount' : 'Due Amount'}</small>
                                                        <button type="button" onClick={() => viewDocument(invoice)}>
                                                            <Eye size={13} />
                                                            View Invoice
                                                        </button>
                                                    </div>

                                                    <div className="pr-days-cell pr-cell">
                                                        {isPaid ? (
                                                            <CheckCircle2 size={27} />
                                                        ) : (
                                                            <>
                                                                <strong>{invoice.daysLeft}</strong>
                                                                <small>{isOverdue ? 'Days Overdue' : 'Days Left'}</small>
                                                            </>
                                                        )}
                                                    </div>

                                                    <div className="pr-status-cell pr-cell">
                                                        <span>
                                                            {isPaid ? (
                                                                <CheckCircle2 size={12} />
                                                            ) : (
                                                                <AlertCircle size={12} />
                                                            )}
                                                            {invoice.statusDisplay}
                                                        </span>
                                                    </div>

                                                    <div className="pr-actions-cell pr-cell">
                                                        {!isPaid && (
                                                            <button
                                                                type="button"
                                                                className="pr-pay-button"
                                                                onClick={() => payNow(invoice)}
                                                            >
                                                                <IndianRupee size={13} />
                                                                Pay Now
                                                            </button>
                                                        )}
                                                        <button type="button" onClick={() => sendReminder(invoice)}>
                                                            <Send size={12} />
                                                            Send Reminder
                                                        </button>
                                                        <button type="button" onClick={() => viewDocument(invoice)}>
                                                            <Download size={12} />
                                                            Download
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="pr-more-button"
                                                            onClick={() => viewDocument(invoice)}
                                                        >
                                                            More <ChevronDown size={11} />
                                                        </button>
                                                    </div>
                                                </article>
                                            );
                                        })
                                    )}
                                </div>

                                {showPagination && (
                                    <div className="pr-pagination">
                                        <span>
                                            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
                                            {Math.min(currentPage * ITEMS_PER_PAGE, filteredInvoices.length)} of{' '}
                                            {filteredInvoices.length}
                                        </span>
                                        <div>
                                            <button
                                                type="button"
                                                disabled={currentPage === 1}
                                                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                                            >
                                                <ChevronLeft size={12} />
                                            </button>
                                            <b>{currentPage}/{totalPages}</b>
                                            <button
                                                type="button"
                                                disabled={currentPage === totalPages}
                                                onClick={() =>
                                                    setCurrentPage((page) => Math.min(totalPages, page + 1))
                                                }
                                            >
                                                <ChevronRight size={12} />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </section>

                            <section className="pr-bottom-grid">
                                <div className="pr-help-card">
                                    <div className="pr-help-icon">
                                        <MessageCircle size={17} />
                                    </div>
                                    <div className="pr-help-copy">
                                        <strong>Need Help With Payment?</strong>
                                        <p>
                                            If you are facing any issues with payment or invoice,
                                            our support team is ready to assist you.
                                        </p>
                                    </div>
                                    <button type="button" onClick={openWhatsApp}>
                                        <Headphones size={14} />
                                        Contact Support
                                    </button>
                                </div>

                                <div className="pr-method-card">
                                    <strong>Accepted Payment Methods</strong>
                                    <div className="pr-method-grid">
                                        <PaymentMethod icon={<NeftIcon />} label="NEFT / RTGS" />
                                        <PaymentMethod icon={<ImpsIcon />} label="IMPS" />
                                        <PaymentMethod icon={<UpiIcon />} label="UPI" />
                                        <PaymentMethod icon={<NetBankingIcon />} label="Net Banking" />
                                        <PaymentMethod icon={<CardPaymentIcon />} label="Credit / Debit Card" />
                                    </div>
                                </div>
                            </section>
                        </main>

                        <aside className="pr-sidebar">
                            <section className="pr-manager-card">
                                <div className="pr-sidebar-title">
                                    <span className="pr-dotted-icon"><i /></span>
                                    Your Relationship Manager
                                </div>
                                <div className="pr-manager-content">
                                    <div className="pr-manager-profile">
                                        <div className="pr-avatar">
                                            <img
                                                src={managerData.image}
                                                alt={managerData.name}
                                                onError={(event) => {
                                                    event.currentTarget.onerror = null;
                                                    event.currentTarget.src = FALLBACK_MANAGER_AVATAR;
                                                }}
                                            />
                                            <span />
                                        </div>
                                        <div>
                                            <strong>{managerData.name}</strong>
                                            <small>{managerData.role}</small>
                                        </div>
                                    </div>

                                    <div className="pr-manager-contact">
                                        <a href={`tel:${managerData.phone}`}>
                                            <Phone size={14} />
                                            {managerData.phone}
                                        </a>
                                        <a href={`mailto:${managerData.email}`}>
                                            <Mail size={14} />
                                            <span>{managerData.email}</span>
                                        </a>
                                    </div>

                                    <div className="pr-manager-actions">
                                        <button type="button" onClick={openWhatsApp}>
                                            <MessageCircle size={14} /> WhatsApp
                                        </button>
                                        <a href={`tel:${managerData.phone}`}>
                                            <Phone size={13} /> Call
                                        </a>
                                    </div>
                                </div>
                            </section>

                            <section className="pr-support-card">
                                <div className="pr-card-heading">
                                    <Headphones size={16} />
                                    Support Hours
                                </div>
                                <div className="pr-support-time">
                                    <div>
                                        <strong>09:00 AM - 07:00 PM (IST)</strong>
                                        <small>Monday to Saturday</small>
                                    </div>
                                    <ChevronDown size={13} />
                                </div>
                                <button type="button" onClick={openWhatsApp}>
                                    <MessageCircle size={13} />
                                    Start Live Chat
                                </button>
                            </section>

                            <section className="pr-tips-card">
                                <div className="pr-card-heading">
                                    <Lightbulb size={17} />
                                    Quick Tips
                                </div>
                                <div className="pr-tips-list">
                                    <p><i />Pay early to avoid late fees.</p>
                                    <p><i />Download invoices and receipts anytime.</p>
                                    <p><i />Need help? Our team is here for you.</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => navigate('/exhibitor-dashboard/payment-guide')}
                                >
                                    View Payment Guide <ArrowRight size={13} />
                                </button>
                            </section>
                        </aside>
                    </div>

                    <footer className="pr-footer">
                        <p>
                            © 2026 INTERNATIONAL HEALTH &amp; WELLNESS EXPO PVT. LTD. ALL RIGHTS RESERVED WORLDWIDE.
                        </p>
                        <div>
                            <button type="button">Privacy Policy</button>
                            <i />
                            <button type="button">Terms &amp; Conditions</button>
                            <i />
                            <button type="button" onClick={openWhatsApp}>Help &amp; Support</button>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}

function SummaryCard({ tone, icon, title, value, note }) {
    return (
        <article className={`pr-summary-card tone-${tone}`}>
            <div className="pr-summary-icon">{icon}</div>
            <div>
                <small>{title}</small>
                <strong>{value}</strong>
                <b>{note}</b>
            </div>
        </article>
    );
}

function PaymentMethod({ icon, label }) {
    return (
        <div className="pr-payment-method">
            <span>{icon}</span>
            <small>{label}</small>
        </div>
    );
}

function NeftIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M3 9.2 12 4l9 5.2" />
            <path d="M5 10h14M6.2 10v7.2M10 10v7.2M14 10v7.2M17.8 10v7.2M4 19.5h16" />
        </svg>
    );
}

function ImpsIcon() {
    return (
        <svg viewBox="0 0 20 24" fill="none" aria-hidden="true">
            <rect x="4" y="2" width="12" height="20" rx="2.2" />
            <circle cx="10" cy="18.5" r="1" fill="currentColor" stroke="none" />
        </svg>
    );
}

function UpiIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M8 4H5.5A1.5 1.5 0 0 0 4 5.5V8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16M8.2 12h7.6" />
        </svg>
    );
}

function NetBankingIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="5" y="3" width="14" height="18" rx="2" />
            <path d="M8 7h3M8 10h3M8 13h3M14 7h2M14 10h2M14 13h2M8 17h8" />
        </svg>
    );
}

function CardPaymentIcon() {
    return (
        <svg viewBox="0 0 24 20" fill="none" aria-hidden="true">
            <rect x="2" y="3" width="20" height="14" rx="2.2" />
            <path d="M2 7.2h20" />
        </svg>
    );
}

const styles = `
.pr-page,
.pr-page * { box-sizing: border-box; }

.pr-page {
    --navy: #06254a;
    --text: #18304f;
    --muted: #66768b;
    --line: #e1e7ed;
    --green: #079950;
    --red: #ed1f2b;
    --orange: #ef9408;
    --purple: #8c2be7;
    --row-height: 132px;
    width: 100%;
    height: calc(100dvh - 72px);
    max-height: calc(100dvh - 72px);
    min-height: 640px;
    overflow: hidden;
    background: #f9fbfd;
    color: var(--navy);
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.pr-page button,
.pr-page input { font: inherit; }
.pr-page button { cursor: pointer; }

.pr-header {
    height: 70px;
    padding: 0 22px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    background: #fff;
    border-bottom: 1px solid #edf1f4;
}

.pr-title-wrap { min-width: 0; display: flex; align-items: center; gap: 13px; }
.pr-title-icon {
    width: 44px; height: 44px; flex: 0 0 44px;
    display: grid; place-items: center;
    border-radius: 50%;
    color: #09a65b; background: #eafaf2;
}
.pr-title-copy { min-width: 0; }
.pr-title-copy h1 { margin: 0; font-size: 18px; line-height: 1.1; font-weight: 800; letter-spacing: -.02em; }
.pr-title-copy p { margin: 5px 0 0; font-size: 10px; font-weight: 500; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.pr-company-card {
    width: 228px; height: 50px; flex: 0 0 228px;
    display: flex; align-items: center; gap: 10px;
    padding: 0 12px;
    color: var(--navy); background: #fff;
    border: 1px solid var(--line); border-radius: 9px;
    box-shadow: 0 2px 8px rgba(22, 43, 70, .04);
}
.pr-company-letter {
    width: 32px; height: 32px; flex: 0 0 32px;
    display: grid; place-items: center;
    border-radius: 50%; border: 2px solid #d7a11f;
    background: var(--navy); color: #ffc324;
    font-size: 12px; font-weight: 900;
}
.pr-company-copy { min-width: 0; flex: 1; display: flex; flex-direction: column; align-items: flex-start; }
.pr-company-copy strong { max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 11px; }
.pr-company-copy small { margin-top: 2px; font-size: 9px; color: var(--muted); font-weight: 600; }

.pr-shell {
    height: calc(100% - 70px);
    padding: 10px 22px 4px;
    display: grid;
    grid-template-rows: minmax(0, 1fr) 18px;
    gap: 4px;
    overflow: hidden;
}

.pr-layout {
    min-width: 0; min-height: 0;
    display: grid;
    grid-template-columns: minmax(0, 1fr) 268px;
    gap: 12px;
    overflow: hidden;
}

.pr-left {
    min-width: 0; min-height: 0;
    display: grid;
    grid-template-rows: 82px 36px minmax(0, 1fr) 76px;
    gap: 9px;
    overflow: hidden;
}

.pr-summary-grid { min-width: 0; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 9px; }
.pr-summary-card {
    min-width: 0; height: 84px;
    display: grid; grid-template-columns: 46px minmax(0, 1fr); align-items: center; gap: 12px;
    padding: 12px 14px;
    background: #fff; border: 1px solid var(--line); border-radius: 8px;
    box-shadow: 0 3px 12px rgba(22, 44, 71, .035);
    overflow: hidden;
}
.pr-summary-icon {
    width: 46px; height: 46px; flex: 0 0 46px;
    display: grid; place-items: center; border-radius: 8px;
}
.pr-summary-card > div:last-child { min-width: 0; display: flex; flex-direction: column; }
.pr-summary-card small { font-size: 9px; line-height: 1; font-weight: 800; text-transform: uppercase; color: #53647a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.pr-summary-card strong { margin-top: 7px; font-size: clamp(15px, 1.05vw, 17px); line-height: 1; font-weight: 900; letter-spacing: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #102845; }
.pr-summary-card b { margin-top: 7px; font-size: 9px; line-height: 1; font-weight: 800; }
.tone-red .pr-summary-icon { color: #ff303a; background: #fff0f1; }
.tone-red b { color: var(--red); }
.tone-orange .pr-summary-icon { color: #ff9c08; background: #fff5e7; }
.tone-orange b { color: var(--orange); }
.tone-green .pr-summary-icon { color: #11aa60; background: #eafaf2; }
.tone-green b { color: var(--green); }
.tone-purple .pr-summary-icon { color: var(--purple); background: #f5edff; }
.tone-purple b { color: var(--purple); }

.pr-toolbar { min-width: 0; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.pr-tabs { min-width: 0; display: grid; grid-template-columns: repeat(4, 92px); align-items: center; gap: 8px; }
.pr-tabs button {
    width: 92px; height: 34px; padding: 0 10px;
    border: 1px solid; border-radius: 7px;
    font-size: 10px; font-weight: 800; white-space: nowrap;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 1px 3px rgba(13, 44, 68, .03);
}
.pr-tabs button[data-tone="all"] { color: #079950; border-color: #72d4ae; background: #f0fbf6; }
.pr-tabs button[data-tone="overdue"] { color: #ed1f2b; border-color: #ffc9cd; background: #fff4f5; }
.pr-tabs button[data-tone="due-soon"] { color: #d77b00; border-color: #ffe0a8; background: #fff8ec; }
.pr-tabs button[data-tone="paid"] { color: #079950; border-color: #bce8d2; background: #effaf5; }
.pr-tabs button.is-active { box-shadow: inset 0 0 0 1px currentColor, 0 2px 6px rgba(13, 44, 68, .04); }

.pr-search-wrap { min-width: 250px; display: flex; align-items: center; gap: 8px; }
.pr-search {
    height: 34px; min-width: 0; flex: 1;
    display: flex; align-items: center; gap: 8px;
    padding: 0 11px;
    background: #fff; border: 1px solid #dfe5eb; border-radius: 7px;
}
.pr-search svg { color: #718096; flex: 0 0 auto; }
.pr-search input { min-width: 0; width: 100%; border: 0; outline: 0; background: transparent; color: #203652; font-size: 9px; }
.pr-search input::placeholder { color: #8995a5; }
.pr-filter-button {
    width: 34px; height: 34px; flex: 0 0 34px;
    display: grid; place-items: center;
    border: 1px solid #dfe5eb; border-radius: 7px;
    background: #fff; color: #102845;
    box-shadow: 0 1px 3px rgba(13, 44, 68, .03);
}
.pr-filter-button svg {
    width: 15px; height: 15px;
    stroke-width: 2.2;
}

.pr-table-card {
    min-width: 0; min-height: 0;
    display: grid;
    grid-template-rows: 36px minmax(0, 1fr);
    overflow: hidden;
    background: #fff; border: 1px solid var(--line); border-radius: 8px;
    box-shadow: 0 3px 12px rgba(24, 47, 76, .035);
}
.pr-table-card.has-pagination { grid-template-rows: 36px minmax(0, 1fr) 24px; }
.pr-table-head,
.pr-invoice-row {
    display: grid;
    grid-template-columns: minmax(210px, 1.72fr) minmax(140px, 1.02fr) minmax(150px, 1.14fr) minmax(86px, .68fr) minmax(104px, .78fr) minmax(124px, .92fr);
}
.pr-table-head {
    align-items: center; padding: 0 15px;
    border-bottom: 1px solid #e4e8ed; background: #fcfdfe;
}
.pr-table-head span { font-size: 8px; font-weight: 800; text-transform: uppercase; letter-spacing: .025em; color: #53647b; }
.pr-table-head span:nth-child(1),
.pr-table-head span:nth-child(2),
.pr-table-head span:nth-child(3) { text-align: left; }
.pr-table-head span:nth-child(n+4) { text-align: center; }

.pr-table-body {
    min-width: 0; min-height: 0;
    display: grid;
    grid-auto-rows: var(--row-height);
    align-content: start;
    overflow-y: auto;
    overflow-x: hidden;
    background: #fff;
}
.pr-empty-state {
    grid-row: 1 / -1;
    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px;
    color: #8995a5; font-size: 10px;
}
.pr-empty-state strong { color: #40556f; }
.pr-spin { animation: pr-spin 1s linear infinite; color: var(--green); }
@keyframes pr-spin { to { transform: rotate(360deg); } }

.pr-invoice-row {
    position: relative; min-width: 0; min-height: var(--row-height); height: var(--row-height);
    padding: 0 15px;
    border-bottom: 1px solid #e7ebef;
    background: #fff;
    overflow: hidden;
}
.pr-invoice-row::before,
.pr-invoice-row::after {
    content: none !important;
    display: none !important;
}
.pr-invoice-row:last-child { border-bottom: 0; }
.pr-invoice-row.is-overdue,
.pr-invoice-row.is-due-soon,
.pr-invoice-row.is-upcoming,
.pr-invoice-row.is-paid {
    background: #fff;
}
.pr-invoice-row.is-overdue {
    background: linear-gradient(90deg, #fff7f7 0%, #fffafa 42%, #fff 82%);
}
.pr-invoice-row.is-due-soon,
.pr-invoice-row.is-upcoming {
    background: linear-gradient(90deg, #fffdf9 0%, #fffefd 42%, #fff 82%);
}
.pr-invoice-row.is-paid {
    background: linear-gradient(90deg, #f7fff9 0%, #fbfffd 42%, #fff 82%);
}
.pr-row-accent { position: absolute; left: 0; top: 9px; bottom: 9px; width: 4px; border-radius: 0 4px 4px 0; }
.is-overdue .pr-row-accent { background: #ff1f2b; }
.is-due-soon .pr-row-accent, .is-upcoming .pr-row-accent { background: #ffac1c; }
.is-paid .pr-row-accent { background: #12b368; }

.pr-cell { min-width: 0; min-height: 0; border-right: 1px solid #eef1f4; overflow: hidden; }
.pr-invoice-row .pr-cell { background: transparent; }
.pr-cell:last-child { border-right: 0; }
.pr-invoice-details { display: flex; align-items: center; gap: 10px; padding-right: 13px; transform: translateY(-16px); }
.pr-document-icon {
    width: 40px; height: 40px; flex: 0 0 40px;
    display: grid; place-items: center; border-radius: 7px;
}
.is-overdue .pr-document-icon { color: #ff303b; background: #fff0f1; border: 1px solid #ffe2e4; }
.is-due-soon .pr-document-icon, .is-upcoming .pr-document-icon { color: #ff9b08; background: #fffaf2; border: 1px solid #ffedcf; }
.is-paid .pr-document-icon { color: #0ca75d; background: #e9faf2; border: 1px solid #cfeedd; }
.pr-document-copy { min-width: 0; display: flex; flex-direction: column; align-items: flex-start; }
.pr-document-copy > strong { max-width: 100%; font-size: 11px; line-height: 1.1; font-weight: 800; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #152b4a; }
.pr-mini-badge { margin-top: 5px; padding: 3px 6px; border: 1px solid; border-radius: 4px; font-size: 7px; line-height: 1; font-weight: 900; text-transform: uppercase; }
.is-overdue .pr-mini-badge { color: var(--red); border-color: #ffd4d7; background: #fff0f1; }
.is-due-soon .pr-mini-badge, .is-upcoming .pr-mini-badge { color: var(--orange); border-color: #ffe8c2; background: #fffaf2; }
.is-paid .pr-mini-badge { color: var(--green); border-color: #c4eed8; background: #e9faf2; }
.pr-document-copy b { margin-top: 8px; font-size: 9px; line-height: 1; color: #263a55; }
.pr-document-copy small { margin-top: 4px; max-width: 100%; font-size: 7.5px; line-height: 1.1; font-weight: 600; color: #6f7e91; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.pr-due-cell, .pr-amount-cell {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 0 14px;
    transform: translateY(-16px);
}
.pr-date-line { display: flex; align-items: center; gap: 7px; min-width: 0; }
.pr-date-line svg { flex: 0 0 auto; color: #254362; }
.pr-date-line strong { font-size: 10px; white-space: nowrap; }
.pr-due-cell > small, .pr-amount-cell > small { margin-top: 4px; font-size: 7.5px; font-weight: 600; color: #6e7b8d; }
.pr-due-cell > small { margin-left: 21px; }
.pr-due-helper { margin-top: 12px; display: flex; flex-direction: column; align-items: flex-start; }
.pr-due-helper span { font-size: 7.5px; font-weight: 700; color: #586b83; }
.pr-due-helper b { margin-top: 3px; font-size: 9px; }
.is-overdue .pr-due-helper b { color: var(--red); }
.is-due-soon .pr-due-helper b, .is-upcoming .pr-due-helper b { color: var(--orange); }

.pr-amount-cell > strong { font-size: 10.5px; white-space: nowrap; }
.pr-amount-cell button {
    width: 116px; height: 30px; margin-top: 12px;
    display: flex; align-items: center; justify-content: center; gap: 6px;
    border: 1px solid; border-radius: 6px; background: #fff;
    font-size: 9px; font-weight: 800; white-space: nowrap;
}
.is-overdue .pr-amount-cell button { color: var(--red); border-color: #ffc3c7; }
.is-due-soon .pr-amount-cell button, .is-upcoming .pr-amount-cell button { color: var(--orange); border-color: #ffd084; }
.is-paid .pr-amount-cell button { color: var(--green); border-color: #bae8d0; }

.pr-days-cell { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 0 8px; transform: translateY(-38px); }
.pr-days-cell > strong { font-size: 21px; line-height: 1; font-weight: 900; letter-spacing: -.04em; }
.pr-days-cell > strong { transform: translateY(2px); }
.pr-days-cell > small { margin-top: 7px; font-size: 7.5px; line-height: 1; font-weight: 800; color: #344962; white-space: nowrap; }
.is-overdue .pr-days-cell > strong { color: var(--red); }
.is-due-soon .pr-days-cell > strong, .is-upcoming .pr-days-cell > strong { color: var(--orange); }
.is-paid .pr-days-cell { color: var(--green); }

.pr-status-cell { display: flex; align-items: center; justify-content: center; padding: 0 8px; transform: translateY(-42px); }
.pr-status-cell > span { width: 86px; height: 28px; display: flex; align-items: center; justify-content: center; gap: 4px; padding: 0 8px; border: 1px solid; border-radius: 6px; font-size: 8.5px; line-height: 1; font-weight: 800; white-space: nowrap; }
.is-overdue .pr-status-cell > span { color: var(--red); border-color: #ffd4d7; background: #fff0f1; }
.is-due-soon .pr-status-cell > span, .is-upcoming .pr-status-cell > span { color: var(--orange); border-color: #ffe8c2; background: #fffaf2; }
.is-paid .pr-status-cell > span { color: var(--green); border-color: #c4eed8; background: #e9faf2; }

.pr-actions-cell { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; padding-left: 10px; }
.pr-actions-cell button {
    width: 112px; height: 28px;
    display: flex; align-items: center; justify-content: center; gap: 6px;
    border: 1px solid #d8e0e7; border-radius: 6px;
    background: #fff; color: #344a64;
    font-size: 8.5px; font-weight: 800; white-space: nowrap;
}
.pr-actions-cell .pr-pay-button { color: #fff; background: var(--green); border-color: var(--green); }
.pr-actions-cell .pr-more-button { height: 18px; border: 0; background: transparent; }

.pr-pagination {
    padding: 0 12px; display: flex; align-items: center; justify-content: space-between;
    border-top: 1px solid #e5e9ee; background: #fcfdfe;
    color: #6d7c8f; font-size: 7px; font-weight: 700;
}
.pr-pagination > div { display: flex; align-items: center; gap: 6px; }
.pr-pagination button { width: 20px; height: 20px; display: grid; place-items: center; border: 1px solid #dce3e9; border-radius: 4px; background: #fff; color: #40556e; }
.pr-pagination button:disabled { opacity: .4; cursor: not-allowed; }

.pr-bottom-grid { min-width: 0; display: grid; grid-template-columns: 1.18fr .92fr; gap: 9px; overflow: hidden; }
.pr-help-card, .pr-method-card { min-width: 0; height: 76px; border: 1px solid var(--line); border-radius: 8px; overflow: hidden; }
.pr-help-card { display: flex; align-items: center; gap: 10px; padding: 10px 12px; background: #fff; }
.pr-help-icon { width: 34px; height: 34px; flex: 0 0 34px; display: grid; place-items: center; border-radius: 50%; color: #0aa65b; background: #eafaf2; }
.pr-help-copy { min-width: 0; flex: 1; }
.pr-help-copy strong { display: block; font-size: 9px; text-transform: uppercase; }
.pr-help-copy p { margin: 6px 0 0; max-width: 350px; font-size: 7.5px; line-height: 1.35; font-weight: 500; color: #65768b; }
.pr-help-card > button { height: 31px; flex: 0 0 auto; padding: 0 12px; display: flex; align-items: center; gap: 7px; border: 1px solid #8dd8b4; border-radius: 6px; background: #fff; color: #12965a; font-size: 8px; font-weight: 800; white-space: nowrap; }

.pr-method-card { padding: 9px 12px; background: linear-gradient(90deg, #f2f8ff, #edf6ff); border-color: #dfe8f3; }
.pr-method-card > strong { display: block; font-size: 9px; line-height: 1; text-transform: uppercase; color: #2965c3; }
.pr-method-grid { height: 49px; margin-top: 7px; display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 4px; }
.pr-payment-method { min-width: 0; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; text-align: center; }
.pr-payment-method > span { width: 28px; height: 28px; flex: 0 0 28px; display: grid; place-items: center; border-radius: 50%; background: #fff; color: #183555; box-shadow: 0 2px 6px rgba(33,72,116,.08); }
.pr-payment-method svg { width: 16px; height: 16px; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.pr-payment-method small { margin-top: 4px; width: 100%; font-size: 6.2px; line-height: 1; font-weight: 800; color: #2e4562; white-space: nowrap; }

.pr-sidebar { min-width: 0; min-height: 0; display: grid; grid-template-rows: 231px 128px minmax(0, 1fr); gap: 10px; overflow: hidden; }
.pr-manager-card, .pr-support-card, .pr-tips-card { min-width: 0; min-height: 0; background: #fff; border: 1px solid var(--line); border-radius: 8px; box-shadow: 0 2px 10px rgba(18,43,72,.035); overflow: hidden; }
.pr-sidebar-title { height: 43px; padding: 0 14px; display: flex; align-items: center; gap: 8px; background: linear-gradient(90deg, #f3fbf7, #fbfefd); font-size: 8.5px; font-weight: 800; text-transform: uppercase; color: #1e3b4f; white-space: nowrap; }
.pr-dotted-icon { width: 18px; height: 18px; display: grid; place-items: center; border: 1px dashed #35bd79; border-radius: 50%; }
.pr-dotted-icon i { width: 5px; height: 5px; border-radius: 50%; background: #21ae67; }
.pr-manager-content { height: calc(100% - 43px); padding: 13px 14px; display: flex; flex-direction: column; }
.pr-manager-profile { display: flex; align-items: center; gap: 10px; }
.pr-avatar { position: relative; width: 52px; height: 52px; flex: 0 0 52px; }
.pr-avatar img { width: 100%; height: 100%; display: block; object-fit: cover; border-radius: 50%; background: #eef4f8; }
.pr-avatar > span { position: absolute; right: 0; bottom: 0; width: 12px; height: 12px; border: 2px solid #fff; border-radius: 50%; background: #11b765; }
.pr-manager-profile > div:last-child { min-width: 0; display: flex; flex-direction: column; }
.pr-manager-profile strong { max-width: 100%; font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.pr-manager-profile small { margin-top: 4px; font-size: 8px; font-weight: 600; color: #6a798c; }
.pr-manager-contact { margin-top: 14px; display: flex; flex-direction: column; gap: 10px; }
.pr-manager-contact a { min-width: 0; display: flex; align-items: center; gap: 9px; color: #334a66; text-decoration: none; font-size: 8px; font-weight: 700; }
.pr-manager-contact a span { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.pr-manager-actions { margin-top: auto; display: grid; grid-template-columns: 1fr 1fr; gap: 7px; }
.pr-manager-actions button, .pr-manager-actions a { height: 31px; display: flex; align-items: center; justify-content: center; gap: 6px; border-radius: 6px; text-decoration: none; font-size: 8px; font-weight: 800; }
.pr-manager-actions button { color: #11975a; background: #f2fbf6; border: 1px solid #9be0bc; }
.pr-manager-actions a { color: #2b72cf; background: #f5f9ff; border: 1px solid #afd0f5; }

.pr-support-card, .pr-tips-card { padding: 12px 14px; }
.pr-card-heading { display: flex; align-items: center; gap: 8px; font-size: 8.5px; font-weight: 800; text-transform: uppercase; color: #253a56; }
.pr-card-heading svg { color: #11aa60; }
.pr-support-time { margin-top: 12px; display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.pr-support-time > div { min-width: 0; display: flex; flex-direction: column; }
.pr-support-time strong { font-size: 8px; white-space: nowrap; }
.pr-support-time small { margin-top: 4px; font-size: 7.5px; font-weight: 600; color: #69798d; }
.pr-support-card > button { width: 100%; height: 31px; margin-top: 12px; display: flex; align-items: center; justify-content: center; gap: 7px; color: #fff; background: var(--green); border: 0; border-radius: 5px; font-size: 8px; font-weight: 800; text-transform: uppercase; }

.pr-tips-card { display: flex; flex-direction: column; }
.pr-tips-list { margin-top: 12px; display: flex; flex-direction: column; gap: 9px; }
.pr-tips-list p { margin: 0; display: flex; align-items: flex-start; gap: 8px; font-size: 7.5px; line-height: 1.25; font-weight: 600; color: #5e6e82; }
.pr-tips-list i { width: 4px; height: 4px; margin-top: 3px; flex: 0 0 4px; border-radius: 50%; background: #1bb469; }
.pr-tips-card > button { width: 100%; height: 31px; margin-top: auto; display: flex; align-items: center; justify-content: center; gap: 8px; color: #12975a; background: #fff; border: 1px solid #9dddbd; border-radius: 6px; font-size: 8px; font-weight: 800; text-transform: uppercase; }

.pr-footer {
    min-width: 0;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    color: #5e6d80;
    overflow: hidden;
}
.pr-footer p {
    margin: 0;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 7px;
    line-height: 1;
    font-weight: 700;
    letter-spacing: .01em;
}
.pr-footer > div {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;
}
.pr-footer button {
    padding: 0;
    border: 0;
    background: transparent;
    color: #4b5f76;
    font-size: 7px;
    line-height: 1;
    font-weight: 700;
    white-space: nowrap;
}
.pr-footer i { width: 1px; height: 10px; background: #d8dee5; }


/* Slightly larger text without increasing the page height. */
.pr-header { height: 68px; padding-inline: 20px; }
.pr-shell {
    height: calc(100% - 68px);
    padding: 8px 20px 3px;
    grid-template-rows: minmax(0, 1fr) 18px;
    gap: 3px;
}
.pr-layout { gap: 10px; }
.pr-left {
    grid-template-rows: 84px 34px minmax(0, 1fr) 72px;
    gap: 7px;
}
.pr-sidebar {
    grid-template-rows: 225px 123px minmax(0, 1fr);
    gap: 8px;
}

.pr-title-copy h1 { font-size: 19px; }
.pr-title-copy p { font-size: 11px; margin-top: 4px; }
.pr-company-copy strong { font-size: 12px; }
.pr-company-copy small { font-size: 10px; }

.pr-summary-card { height: 84px; padding: 12px 14px; gap: 12px; grid-template-columns: 46px minmax(0, 1fr); }
.pr-summary-icon { width: 46px; height: 46px; flex-basis: 46px; }
.pr-summary-card small { font-size: 9px; }
.pr-summary-card strong { margin-top: 7px; font-size: clamp(15px, 1.05vw, 17px); }
.pr-summary-card b { margin-top: 6px; font-size: 9px; }

.pr-tabs { grid-template-columns: repeat(4, 92px); gap: 8px; }
.pr-tabs button { width: 92px; height: 32px; padding-inline: 10px; font-size: 10px; }
.pr-search-wrap { gap: 7px; }
.pr-search, .pr-filter-button { height: 32px; }
.pr-filter-button { width: 32px; flex-basis: 32px; }
.pr-search input { font-size: 10px; }

.pr-table-card { grid-template-rows: 34px minmax(0, 1fr); }
.pr-table-card.has-pagination { grid-template-rows: 34px minmax(0, 1fr) 22px; }
.pr-table-head { padding-inline: 13px; }
.pr-table-head span { font-size: 9px; }
.pr-invoice-row { padding-inline: 13px; }
.pr-invoice-details { gap: 8px; padding-right: 13px; transform: translateY(-16px); }
.pr-document-copy > strong { font-size: 12px; }
.pr-mini-badge { margin-top: 4px; padding: 3px 6px; font-size: 8px; }
.pr-document-copy b { margin-top: 7px; font-size: 10px; }
.pr-document-copy small { margin-top: 3px; font-size: 8.5px; }

.pr-due-cell, .pr-amount-cell { padding-inline: 14px; align-items: flex-start; transform: translateY(-16px); }
.pr-date-line { gap: 6px; }
.pr-date-line strong { font-size: 11px; }
.pr-due-cell > small, .pr-amount-cell > small { margin-top: 3px; font-size: 8.5px; }
.pr-due-helper { margin-top: 12px; align-items: flex-start; }
.pr-due-helper span { font-size: 8.5px; }
.pr-due-helper b { margin-top: 2px; font-size: 10px; }
.pr-amount-cell > strong { font-size: 11.5px; }
.pr-amount-cell button { width: 116px; height: 30px; margin-top: 12px; font-size: 9px; }
.pr-days-cell > strong { font-size: 22px; }
.pr-days-cell > small { margin-top: 7px; font-size: 8.5px; line-height: 1; }
.pr-status-cell { padding-inline: 8px; }
.pr-status-cell > span { width: 86px; min-width: 0; height: 28px; padding: 0 8px; font-size: 8.5px; line-height: 1; }
.pr-actions-cell { gap: 5px; padding-left: 10px; }
.pr-actions-cell button { width: 112px; height: 28px; font-size: 8.5px; }
.pr-actions-cell .pr-more-button { height: 18px; }
.pr-pagination { font-size: 8px; }

.pr-bottom-grid { gap: 8px; }
.pr-help-card, .pr-method-card { height: 72px; }
.pr-help-card { gap: 8px; padding: 8px 10px; }
.pr-help-copy strong { font-size: 10px; }
.pr-help-copy p { margin-top: 4px; font-size: 8.5px; line-height: 1.25; }
.pr-help-card > button { height: 29px; padding-inline: 10px; font-size: 9px; }
.pr-method-card { padding: 8px 10px; }
.pr-method-card > strong { font-size: 10px; }
.pr-method-grid { height: 45px; margin-top: 5px; }
.pr-payment-method > span { width: 27px; height: 27px; flex-basis: 27px; }
.pr-payment-method small { margin-top: 3px; font-size: 7.2px; }

.pr-sidebar-title { height: 41px; padding-inline: 12px; font-size: 9.5px; }
.pr-manager-content { height: calc(100% - 41px); padding: 11px 12px; }
.pr-manager-profile strong { font-size: 12px; }
.pr-manager-profile small { margin-top: 3px; font-size: 9px; }
.pr-manager-contact { margin-top: 11px; gap: 8px; }
.pr-manager-contact a { font-size: 9px; }
.pr-manager-actions { gap: 6px; }
.pr-manager-actions button, .pr-manager-actions a { height: 29px; font-size: 9px; }

.pr-support-card, .pr-tips-card { padding: 10px 12px; }
.pr-card-heading { font-size: 9.5px; }
.pr-support-time { margin-top: 9px; }
.pr-support-time strong { font-size: 9px; }
.pr-support-time small { margin-top: 3px; font-size: 8.5px; }
.pr-support-card > button { height: 29px; margin-top: 9px; font-size: 9px; }
.pr-tips-list { margin-top: 9px; gap: 7px; }
.pr-tips-list p { font-size: 8.5px; line-height: 1.18; }
.pr-tips-card > button { height: 29px; font-size: 9px; }

.pr-footer p, .pr-footer button { font-size: 7px; }

@media (max-height: 760px) and (min-width: 1200px) {
    .pr-page { min-height: 0; --row-height: 124px; }
    .pr-header { height: 62px; }
    .pr-shell { height: calc(100% - 62px); padding-top: 7px; }
    .pr-left { grid-template-rows: 78px 32px minmax(0, 1fr) 68px; gap: 7px; }
    .pr-summary-card { height: 78px; padding: 9px 11px; grid-template-columns: 40px minmax(0, 1fr); }
    .pr-summary-icon { width: 40px; height: 40px; flex-basis: 40px; }
    .pr-tabs button, .pr-search, .pr-filter-button { height: 30px; }
    .pr-table-head { height: 32px; }
    .pr-bottom-grid, .pr-help-card, .pr-method-card { height: 68px; }
    .pr-sidebar { grid-template-rows: 205px 112px minmax(0, 1fr); gap: 8px; }
}

@media (max-width: 1199px) {
    .pr-page { height: auto; max-height: none; min-height: calc(100dvh - 72px); overflow: auto; }
    .pr-shell { height: auto; display: block; overflow: visible; }
    .pr-layout { grid-template-columns: 1fr; overflow: visible; }
    .pr-left { min-height: 680px; }
    .pr-sidebar { margin-top: 10px; grid-template-columns: repeat(3, minmax(0, 1fr)); grid-template-rows: 220px; overflow: visible; }
    .pr-footer { height: 24px; margin-top: 8px; }
}

@media (max-width: 760px) {
    .pr-page { --row-height: 132px; }
    .pr-header { height: auto; min-height: 70px; padding: 10px 14px; align-items: flex-start; }
    .pr-company-card { width: 190px; flex-basis: 190px; }
    .pr-shell { padding: 10px 12px; }
    .pr-summary-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .pr-left { min-height: 1000px; grid-template-rows: 173px auto 620px 160px; }
    .pr-toolbar { align-items: stretch; flex-direction: column; }
    .pr-tabs { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .pr-tabs button { width: 100%; }
    .pr-search-wrap { width: 100%; }
    .pr-table-card { overflow-x: auto; }
    .pr-table-head, .pr-invoice-row { min-width: 900px; }
    .pr-bottom-grid { grid-template-columns: 1fr; }
    .pr-help-card, .pr-method-card { height: 76px; }
    .pr-sidebar { grid-template-columns: 1fr; grid-template-rows: 220px 125px 170px; }
    .pr-footer { align-items: flex-start; flex-direction: column; height: auto; padding: 8px 0; }
}
`;
