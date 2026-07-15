import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Bell, CheckCircle2, Clock, AlertTriangle, ArrowRight,
    FileText, Calendar, Filter, CalendarDays,
    PhoneCall, Mail, Settings, HeadphonesIcon, HelpCircle,
    ChevronLeft, ChevronRight
} from 'lucide-react';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import { API_URL } from '@/lib/api';

const DOC_TYPE_SLUGS = {
    'Invoice': 'invoice',
    'Proforma Invoice': 'proforma',
    'Delivery Challan': 'challan',
    'Credit Note': 'creditnote',
    'Credit Note (Legacy)': 'legacycreditnote',
    'Debit Note': 'debitnote',
};

export default function PaymentReminders() {
    const { data } = useExhibitorCtx();
    const navigate = useNavigate();
    const token = localStorage.getItem('exhibitorToken');

    const [overview, setOverview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const formatRupee = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount || 0);
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '—';
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return '—';
        return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    useEffect(() => {
        const fetchOverview = async () => {
            if (!data?._id) return;
            try {
                setLoading(true);
                const res = await fetch(`${API_URL}/exhibitor-auth/account-overview?id=${data._id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const json = await res.json();
                if (json.success) {
                    setOverview(json.data);
                }
            } catch (err) {
                console.error('Failed to fetch account overview', err);
            } finally {
                setLoading(false);
            }
        };
        fetchOverview();
    }, [data?._id, token]);

    const viewDocument = (doc) => {
        const slug = DOC_TYPE_SLUGS[doc.documentType];
        if (!slug) return;
        window.open(`/exhibitor-print/${slug}/${doc.id}`, '_blank', 'noopener,noreferrer');
    };

    const financials = overview?.financials || {};
    const recentDocuments = overview?.recentDocuments || [];

    const invoices = recentDocuments.filter(doc => doc.documentType === 'Invoice');

    const totalDue = financials?.remainingBalance || 0;
    const totalPaid = financials?.paidAmount || 0;
    const totalInvoices = invoices.length;

    // Remaining by ID map
    const remainingById = new Map(
        (financials?.remainingBreakdown || []).map((entry) => [String(entry.id), entry.remainingAmount])
    );

    // Calculate details for each invoice
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const processedInvoices = invoices.map(inv => {
        const amtDue = remainingById.get(String(inv.id)) || 0;
        const dueDate = inv.dueDate ? new Date(inv.dueDate) : new Date(new Date(inv.date).getTime() + (30 * 24 * 60 * 60 * 1000));
        dueDate.setHours(0, 0, 0, 0);

        const diffTime = dueDate - today;
        const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        let status = amtDue <= 0 ? 'Paid' : 'Upcoming';
        if (amtDue > 0 && daysLeft <= 3 && daysLeft >= 0) status = 'Due Soon';
        if (amtDue > 0 && daysLeft < 0) status = 'Overdue';

        return {
            ...inv,
            amtDue,
            dueDateObj: dueDate,
            dueDateStr: formatDate(dueDate),
            daysLeft,
            statusDisplay: status
        };
    }).sort((a, b) => {
        if (a.amtDue > 0 && b.amtDue <= 0) return -1;
        if (a.amtDue <= 0 && b.amtDue > 0) return 1;
        return a.dueDateObj - b.dueDateObj;
    });

    const unpaidInvoices = processedInvoices.filter(inv => inv.amtDue > 0);
    const nearestInvoice = unpaidInvoices.length > 0 ? unpaidInvoices[0] : null;

    let dueInDays = '—';
    let dueInDateStr = '—';
    if (nearestInvoice) {
        if (nearestInvoice.daysLeft < 0) dueInDays = `${Math.abs(nearestInvoice.daysLeft)} Days Ago`;
        else if (nearestInvoice.daysLeft === 0) dueInDays = 'Today';
        else dueInDays = `${nearestInvoice.daysLeft} Days`;

        dueInDateStr = nearestInvoice.dueDateStr;
    }

    const companyName = data?.exhibitorName || 'Company Name';
    const stallNo = data?.participation?.stallFor || data?.participation?.stall?.stallNumber || data?.participation?.stallNo || 'TBA';

    // Pagination Logic
    const totalPages = Math.ceil(processedInvoices.length / itemsPerPage);
    const paginatedInvoices = processedInvoices.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="space-y-2 font-inter bg-slate-50/50 px-2 lg:px-4 py-2 min-h-full">

            {/* Header Box */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-2.5 px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shrink-0">
                        <Bell size={20} />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-slate-800 leading-tight">Payment Reminders</h1>
                        <p className="text-[11px] text-slate-500 font-medium">Stay updated on your due payments and avoid late fees.</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                    <div className="w-8 h-8 rounded-full bg-[#182a3c] text-[#c9974c] flex items-center justify-center border-2 border-[#c9974c] text-xs font-bold shrink-0">
                        {companyName.substring(0, 1)}
                    </div>
                    <div className="flex flex-col pr-2">
                        <span className="text-[12px] font-bold text-slate-800 leading-none mb-0.5">{companyName}</span>
                        <span className="text-[10px] font-semibold text-slate-500 leading-none">Stall No. {stallNo}</span>
                    </div>
                </div>
            </div>

            {/* Alert Banner */}
            {unpaidInvoices.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 rounded-xl border border-red-100 p-2.5 px-4 flex items-center justify-between gap-3"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center shrink-0">
                            <Bell size={16} className="animate-pulse" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-red-600 leading-tight">You have {unpaidInvoices.length} payment{unpaidInvoices.length > 1 ? 's' : ''} due!</h3>
                            <p className="text-[11px] text-slate-600 font-medium mt-0.5">Make the payment on or before the due date to avoid late fees and service interruptions.</p>
                        </div>
                    </div>
                    <button onClick={() => navigate('/exhibitor-dashboard/invoices')} className="px-3 py-1.5 bg-white text-slate-700 text-[11px] font-bold border border-slate-200 rounded-md hover:bg-slate-50 transition-colors whitespace-nowrap shadow-sm">
                        View Invoice
                    </button>
                </motion.div>
            )}

            {/* Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                        <FileText size={18} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Total Due</p>
                        <h2 className="text-base font-bold text-slate-800 leading-none">{formatRupee(totalDue)}</h2>
                        <p className="text-[10px] font-semibold text-red-500 mt-1">{unpaidInvoices.length} Due</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                        <CalendarDays size={18} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Due In</p>
                        <h2 className="text-base font-bold text-slate-800 leading-none">{dueInDays}</h2>
                        <p className="text-[10px] font-semibold text-orange-500 mt-1">{dueInDateStr}</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                        <CheckCircle2 size={18} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Total Paid</p>
                        <h2 className="text-base font-bold text-slate-800 leading-none">{formatRupee(totalPaid)}</h2>
                        <p className="text-[10px] font-semibold text-emerald-600 mt-1">{invoices.length - unpaidInvoices.length} Paid</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center shrink-0">
                        <FileText size={18} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Total Invoices</p>
                        <h2 className="text-base font-bold text-slate-800 leading-none">{formatRupee(totalDue + totalPaid)}</h2>
                        <p className="text-[10px] font-semibold text-purple-600 mt-1">{totalInvoices} Invoices</p>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-3 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-800">Payment Reminders</h3>
                    <div className="text-[11px] font-bold text-slate-500 bg-slate-50 px-3 py-1 rounded-md border border-slate-200">
                        Total {invoices.length} Invoices
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="py-2 px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Invoice No.</th>
                                <th className="py-2 px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Description</th>
                                <th className="py-2 px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Due Date</th>
                                <th className="py-2 px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Amount Due</th>
                                <th className="py-2 px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Days Left</th>
                                <th className="py-2 px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="py-2 px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {paginatedInvoices.length === 0 && (
                                <tr>
                                    <td colSpan="7" className="py-6 text-center text-xs text-slate-500">No invoices found.</td>
                                </tr>
                            )}
                            {paginatedInvoices.map((inv, idx) => {
                                let statusStyles = "";
                                let icon = null;
                                let daysLeftText = inv.daysLeft < 0 ? 'Overdue' : `${inv.daysLeft} Days`;
                                let daysLeftStyle = "";
                                let rowHighlight = "";

                                if (inv.statusDisplay === 'Paid') {
                                    statusStyles = "bg-emerald-50 text-emerald-600 border border-emerald-100";
                                    icon = <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />;
                                    daysLeftText = "Cleared";
                                    daysLeftStyle = "text-emerald-500 font-bold";
                                    rowHighlight = "hover:bg-slate-50/50";
                                } else if (inv.statusDisplay === 'Overdue') {
                                    statusStyles = "bg-red-50 text-red-600 border border-red-100";
                                    icon = <AlertTriangle size={14} className="text-red-500 shrink-0" />;
                                    daysLeftStyle = "text-red-600 font-bold";
                                    rowHighlight = "bg-red-50 hover:bg-red-100";
                                } else if (inv.statusDisplay === 'Due Soon') {
                                    statusStyles = "bg-red-50 text-red-600 border border-red-100";
                                    icon = <AlertTriangle size={14} className="text-red-500 shrink-0" />;
                                    daysLeftStyle = "text-red-600 font-bold";
                                    rowHighlight = "bg-orange-50 hover:bg-orange-100";
                                } else {
                                    statusStyles = "bg-orange-50 text-orange-600 border border-orange-100";
                                    icon = <AlertTriangle size={14} className="text-orange-400 shrink-0" />;
                                    daysLeftStyle = "text-orange-500 font-bold";
                                    rowHighlight = "bg-yellow-50 hover:bg-yellow-100";
                                }

                                return (
                                    <tr key={inv.id} className={`${rowHighlight} transition-colors border-b border-slate-50 last:border-0`}>
                                        <td className="py-3 px-3 align-middle">
                                            <div className="flex items-center gap-2">
                                                {icon}
                                                <span className="text-[12px] font-bold text-slate-700">{inv.documentNo}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-3 align-middle">
                                            <p className="text-[12px] font-bold text-slate-800 leading-tight">Stall Booking</p>
                                            <p className="text-[10px] text-slate-500 font-medium leading-none mt-0.5">{inv.type_of_invoice || 'Invoice'}</p>
                                        </td>
                                        <td className="py-3 px-3 align-middle">
                                            <p className="text-[12px] font-bold text-slate-800 leading-none">{inv.dueDateStr}</p>
                                        </td>
                                        <td className="py-3 px-3 align-middle">
                                            <p className="text-[12px] font-bold text-slate-800 leading-none">{formatRupee(inv.amtDue > 0 ? inv.amtDue : inv.amount)}</p>
                                        </td>
                                        <td className="py-3 px-3 align-middle">
                                            <span className={`text-[11px] ${daysLeftStyle}`}>{daysLeftText}</span>
                                        </td>
                                        <td className="py-3 px-3 align-middle">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${statusStyles}`}>
                                                {inv.statusDisplay}
                                            </span>
                                        </td>
                                        <td className="py-3 px-3 align-middle">
                                            <button onClick={() => viewDocument(inv)} className="px-2.5 py-1 bg-white border border-slate-200 text-emerald-700 text-[10px] font-bold rounded hover:bg-emerald-50 hover:border-emerald-200 transition-colors shadow-sm">
                                                View Invoice
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="p-2 border-t border-slate-100 flex items-center justify-between bg-slate-50">
                        <span className="text-[11px] font-semibold text-slate-500 pl-2">
                            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, processedInvoices.length)} of {processedInvoices.length} Invoices
                        </span>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="w-6 h-6 flex items-center justify-center rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft size={14} />
                            </button>
                            <span className="text-[11px] font-bold text-slate-700 px-2">Page {currentPage} of {totalPages}</span>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="w-6 h-6 flex items-center justify-center rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronRight size={14} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {/* Tip Card */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                        <Calendar size={14} />
                    </div>
                    <p className="text-[11px] font-bold text-slate-700 leading-tight">
                        <span className="text-emerald-700">Tip:</span> Pay early to ensure uninterrupted services and a smooth event experience.
                    </p>
                </div>

                {/* Help Card */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                            <HeadphonesIcon size={16} />
                        </div>
                        <div>
                            <h4 className="text-[12px] font-bold text-slate-800">Need Help?</h4>
                            <p className="text-[10px] font-semibold text-slate-500 leading-none mt-0.5">Contact our support team.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-[11px] font-bold text-slate-600">
                        <div className="flex items-center gap-1.5">
                            <PhoneCall size={12} className="text-emerald-600" />
                            +91-9654900525
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Mail size={12} className="text-emerald-600" />
                            info@ihwe.com
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}