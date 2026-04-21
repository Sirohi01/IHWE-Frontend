import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Receipt, CheckCircle2, Clock, AlertCircle, CreditCard, ArrowRight } from 'lucide-react';
import { useExhibitorCtx } from '../ExhibitorDashboard';

export default function PaymentReminders() {
    const { data } = useExhibitorCtx();
    const navigate = useNavigate();

    const formatRupee = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const totalStallCost = data?.participation?.total || 0;
    const outstandingAmount = data?.balanceAmount || 0;
    const amountPaid = data?.amountPaid || (totalStallCost - outstandingAmount);

    const dueDate = data?.createdAt
        ? new Date(new Date(data.createdAt).getTime() + (30 * 24 * 60 * 60 * 1000)).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
        : '—';

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full pb-10"
        >
            {/* Header Section */}
            <div className="bg-white px-6 py-3 rounded-sm shadow-sm border border-slate-200 mb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t-4 border-t-[#d26019]">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 rounded-full bg-[#d26019]/10 flex items-center justify-center">
                            <CreditCard size={16} className="text-[#d26019]" />
                        </div>
                        <h1 className="text-lg font-medium  tracking-tight text-slate-800">Payment & Outstanding Summary</h1>
                    </div>
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 ml-10">
                        Stay updated with your pending payments and ensure seamless participation at IHWE 2026.
                    </p>
                </div>

                <div className="flex items-center justify-end">
                    {outstandingAmount > 0 ? (
                        <button
                            onClick={() => navigate('/exhibitor-dashboard/invoices')}
                            className="group flex flex-col items-end gap-1 px-5 py-2.5 bg-red-50 hover:bg-red-600 border border-red-200 hover:border-red-600 rounded-sm transition-all duration-300"
                        >
                            <span className="text-[9px] font-semibold uppercase text-red-600 group-hover:text-white transition-colors">Total Outstanding</span>
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-semibold text-red-700 group-hover:text-white transition-colors">{formatRupee(outstandingAmount)}</span>
                                <ArrowRight size={18} className="text-red-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                            </div>
                        </button>
                    ) : (
                        <div className="flex items-center gap-3 px-6 py-3 bg-emerald-50 border border-emerald-100 rounded-sm">
                            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-sm">
                                <CheckCircle2 size={18} />
                            </div>
                            <div>
                                <p className="text-[10px] font-semibold uppercase text-emerald-600 leading-none mb-1">Status</p>
                                <p className="text-sm font-medium text-slate-800 leading-none">Payment Completed</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Payment Summary Highlight Box */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2">
                <div className="bg-white p-5 rounded-sm border-l-4 border-l-blue-600 shadow-sm border border-slate-200">
                    <p className="text-[10px] font-semibold uppercase text-slate-400 tracking-widest mb-1">Total Stall Cost</p>
                    <h2 className="text-lg font-medium text-slate-800">{formatRupee(totalStallCost)}</h2>
                </div>
                <div className="bg-white p-5 rounded-sm border-l-4 border-l-emerald-600 shadow-sm border border-slate-200">
                    <p className="text-[10px] font-semibold uppercase text-slate-400 tracking-widest mb-1">Amount Paid</p>
                    <h2 className="text-lg font-medium text-emerald-600">{formatRupee(amountPaid)}</h2>
                </div>
                <div className="bg-white p-5 rounded-sm border-l-4 border-l-red-600 shadow-sm border border-slate-200">
                    <p className="text-[10px] font-semibold uppercase text-slate-400 tracking-widest mb-1">Outstanding Amount</p>
                    <h2 className="text-lg font-medium text-red-600">{formatRupee(outstandingAmount)}</h2>
                </div>
                <div className="bg-white p-5 rounded-sm border-l-4 border-l-slate-400 shadow-sm border border-slate-200 relative overflow-hidden">
                    <div className="relative z-10">
                        <p className="text-[10px] font-semibold uppercase text-slate-400 tracking-widest mb-1">Payment Due Date</p>
                        <h2 className="text-lg font-medium text-slate-800">{dueDate}</h2>
                    </div>
                </div>
            </div>

            {/* Section Title */}
            <div className="flex items-center justify-between mb-4 px-1">
                <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                    <Receipt size={16} className="text-[#23471d]" />Payment Current Status
                </h3>
            </div>

            {/* Conditional Status Banners */}
            <div className="mb-4">
                {(() => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);

                    // Robust Date Parsing
                    const regDate = data?.createdAt ? new Date(data.createdAt) : new Date();
                    const dueLimit = new Date(regDate);
                    dueLimit.setDate(regDate.getDate() + 30);
                    dueLimit.setHours(0, 0, 0, 0);

                    const isPaid = outstandingAmount <= 0;
                    const isOverdue = !isPaid && today > dueLimit;
                    const isNearDue = !isPaid && !isOverdue; // Catch-all for any pending payment not yet overdue

                    // Days calculation
                    const diffTime = Math.abs(today - dueLimit);
                    const daysDiff = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                    if (isOverdue) {
                        return (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-red-50 border border-red-200 rounded-sm p-5 shadow-sm"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 flex-shrink-0">
                                        <AlertCircle size={20} />
                                    </div>
                                    <div className="space-y-3">
                                        <h4 className="text-[13px] font-semibold text-red-700 uppercase tracking-widest flex items-center gap-2">
                                            ⚠️ Payment Overdue
                                        </h4>
                                        <p className="text-sm text-slate-700 leading-relaxed">
                                            Your payment is overdue by <span className="font-semibold text-red-600 border-b border-red-200">{daysDiff} days</span>.
                                            Kindly clear the outstanding amount of <span className="font-semibold text-red-600">{formatRupee(outstandingAmount)}</span> at the earliest to avoid cancellation or reallocation of your stall.
                                        </p>
                                        <div className="flex items-center gap-2 text-[11px] font-bold text-red-800 bg-red-100/50 px-3 py-1.5 rounded-sm inline-block">
                                            👉 Immediate action is required to continue enjoying all exhibitor benefits.
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    }

                    if (isNearDue) {
                        return (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-amber-50 border border-amber-200 rounded-sm px-6 py-2 shadow-sm"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0">
                                        <Clock size={20} />
                                    </div>
                                    <div className="space-y-1 flex-1">
                                        <h4 className="text-[13px] font-semibold text-amber-700 uppercase tracking-widest flex items-center gap-2">
                                            ⏳ Payment Due Soon
                                        </h4>
                                        <p className="text-sm text-slate-700 leading-relaxed">
                                            Your upcoming payment of <span className="font-semibold text-amber-700">{formatRupee(outstandingAmount)}</span> is due on <span className="font-semibold text-amber-700 underline">{dueDate}</span>.
                                            We request you to complete the payment within the timeline to ensure uninterrupted participation.
                                        </p>
                                        <div className="flex items-center text-[13px] font-medium text-amber-800 bg-amber-100/50 py-1 rounded-sm inline-block">
                                            👉 Timely payment will help you retain your stall allocation and access all event-related services smoothly.
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    }

                    if (isPaid) {
                        return (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-emerald-50 border border-emerald-200 rounded-sm px-6 py-3 shadow-sm border-l-4 border-l-emerald-500"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                                        <CheckCircle2 size={24} />
                                    </div>
                                    <div className="space-y-1 flex-1">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-[13px] font-semibold text-emerald-700 uppercase tracking-widest flex items-center gap-2">
                                                ✅ Payment Up to Date
                                            </h4>
                                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[9px] font-semibold uppercase rounded">Confirmed</span>
                                        </div>
                                        <p className="text-sm text-slate-700 leading-relaxed">
                                            All your payments are successfully completed. Your stall booking is <span className="font-medium text-emerald-700 underline underline-offset-4 decoration-emerald-200">Fully Confirmed</span> for IHWE 2026.
                                        </p>
                                        <div className="flex flex-wrap items-center gap-3 mt-1">
                                            <span className="flex items-center text-[13px] font-medium text-emerald-800 bg-emerald-100/50 rounded-sm">
                                                👉 You can now proceed with exhibitor activities, including dashboard updates, buyer connections, and event participation planning.
                                            </span>

                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    }

                    return null;
                })()}
            </div>
        </motion.div>
    );
}