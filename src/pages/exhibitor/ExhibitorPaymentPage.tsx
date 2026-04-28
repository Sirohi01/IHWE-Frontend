import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import { API_URL } from '@/lib/api';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardHero from '@/components/dashboard/DashboardHero';
import {
    CreditCard, CheckCircle2, Clock, AlertTriangle,
    Loader2, RefreshCw, Receipt,
    IndianRupee, ShieldCheck, Zap, Info, Percent, Building2, Calendar
} from 'lucide-react';

const RAZORPAY_CHARGE_PCT = 2.5;
const loadRazorpay = (): Promise<boolean> => {
    return new Promise((resolve) => {
        if ((window as any).Razorpay) { resolve(true); return; }
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID || '';

interface PaymentSummary {
    exhibitorName: string;
    registrationId: string;
    event: any;
    stall: any;
    finance: {
        // Full breakdown
        grossAmount: number;
        stallDiscountPercent: number;
        stallDiscountAmount: number;
        subtotal1: number;
        discountPercent: number;
        discountAmount: number;
        subtotal: number;
        gstAmount: number;
        tdsPercent: number;
        tdsAmount: number;
        netPayable: number;
        // Payment tracking
        amountPaid: number;
        balanceAmount: number;
        penaltyAmount: number;
        totalPayable: number;
    };
    installments: any[];
    paymentHistory: any[];
    status: string;
    paymentDueDate: string | null;
    paymentPlanType: string;
    paymentPlanLabel: string;
    chosenTdsPercent: number;
}

export default function ExhibitorPaymentPage() {
    const { data, fetchDashboard } = useExhibitorCtx();
    const location = useLocation();
    const isSeller = location.pathname.includes('/seller-portal');
    const [summary, setSummary] = useState<PaymentSummary | null>(null);
    const [loading, setLoading] = useState(true);
    const [paying, setPaying] = useState(false);
    const [payingInstallment, setPayingInstallment] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState<'pay' | 'history'>('pay');
    const [paymentSuccess, setPaymentSuccess] = useState<{
        show: boolean; amount: number; gatewayFee: number; transactionId: string; balanceAmount: number; status: string;
    } | null>(null);

    const token = localStorage.getItem('exhibitorToken');
    const isUSD = data?.participation?.currency === 'USD';
    const cur = isUSD ? '$' : '₹';

    const fmt = (n: number) =>
        `${cur}${Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;

    const fetchSummary = useCallback(async () => {
        if (!data?._id) return;
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/payment/summary/${data._id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const json = await res.json();
            if (json.success) {
                const d = json.data;
                // Fallback: if financeBreakdown fields are 0 (old registrations),
                // reconstruct from participation fields
                const fb = d.finance;
                if (fb.grossAmount === 0 && fb.netPayable > 0) {
                    // participation.amount = taxable value (pre-GST)
                    // participation.total  = taxable + GST (invoice total)
                    const taxable = d.stall?.amount || 0;
                    const invoiceTotal = d.stall?.total || 0;
                    const gst = invoiceTotal - taxable;
                    fb.subtotal = taxable;
                    fb.gstAmount = gst;
                    fb.grossAmount = taxable; // best approximation
                    fb.subtotal1 = taxable;
                }
                setSummary(d);
            }
        } catch (err) {
            console.error('Payment summary error:', err);
        } finally {
            setLoading(false);
        }
    }, [data?._id, token]);

    useEffect(() => {
        fetchSummary();
    }, [fetchSummary]);
    const initiatePayment = async (amountOverride?: number, installmentNumber?: number) => {
        if (!data?._id) return;

        const isLoaded = await loadRazorpay();
        if (!isLoaded) {
            toast.error('Payment gateway failed to load. Please refresh and try again.');
            return;
        }

        if (installmentNumber !== undefined) {
            setPayingInstallment(installmentNumber);
        } else {
            setPaying(true);
        }

        // Add 2.5% Razorpay gateway fee on top of base amount
        const baseAmount = amountOverride ?? totalPayable;
        const { fee: gatewayFee, total: amountWithFee } = calcWithGatewayFee(baseAmount);

        try {
            // 1. Create order on backend (send amount WITH gateway fee)
            const orderRes = await fetch(`${API_URL}/payment/create-order/${data._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    amount: amountWithFee,
                    installmentNumber
                })
            });
            const orderData = await orderRes.json();

            if (!orderData.success) {
                toast.error(orderData.message || 'Failed to create payment order');
                return;
            }

            const { order, key, registration } = orderData;

            // 2. Open Razorpay checkout
            const options = {
                key: key || RAZORPAY_KEY,
                amount: order.amount,
                currency: order.currency || 'INR',
                name: 'IHWE Exhibition',
                description: installmentNumber
                    ? `Installment ${installmentNumber} - ${registration?.registrationId}`
                    : `Payment - ${registration?.registrationId}`,
                order_id: order.id,
                prefill: {
                    name: `${data.contact1?.firstName || ''} ${data.contact1?.lastName || ''}`.trim(),
                    email: data.contact1?.email || '',
                    contact: data.contact1?.mobile || ''
                },
                theme: { color: '#23471d' },
                modal: {
                    ondismiss: () => {
                        setPaying(false);
                        setPayingInstallment(null);
                        toast.info('Payment cancelled');
                    }
                },
                handler: async (response: any) => {
                    // 3. Verify payment on backend
                    try {
                        const verifyRes = await fetch(`${API_URL}/payment/verify-payment`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token}`
                            },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                registrationId: data._id,
                                amountPaid: baseAmount,
                                paymentType: installmentNumber ? `installment_${installmentNumber}` : 'online',
                                installmentNumber
                            })
                        });
                        const verifyData = await verifyRes.json();

                        if (verifyData.success) {
                            setPaymentSuccess({
                                show: true,
                                amount: baseAmount,
                                gatewayFee,
                                transactionId: response.razorpay_payment_id,
                                balanceAmount: verifyData.data?.balanceAmount || 0,
                                status: verifyData.data?.status || 'paid'
                            });
                            await fetchSummary();
                            await fetchDashboard();
                        } else {
                            toast.error(verifyData.message || 'Payment verification failed');
                        }
                    } catch (err) {
                        toast.error('Payment verification error. Please contact support.');
                    } finally {
                        setPaying(false);
                        setPayingInstallment(null);
                    }
                }
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.on('payment.failed', (response: any) => {
                toast.error(`Payment failed: ${response.error?.description || 'Unknown error'}`);
                setPaying(false);
                setPayingInstallment(null);
            });
            rzp.open();

        } catch (err: any) {
            toast.error(err.message || 'Payment initiation failed');
            setPaying(false);
            setPayingInstallment(null);
        }
    };

    // ── Status helpers ─────────────────────────────────────────────────────────
    const getStatusBadge = (status: string) => {
        const map: Record<string, { label: string; cls: string }> = {
            paid: { label: 'Fully Paid', cls: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
            'advance-paid': { label: 'Advance Paid', cls: 'bg-cyan-100 text-cyan-800 border-cyan-300' },
            pending: { label: 'Payment Pending', cls: 'bg-amber-100 text-amber-800 border-amber-300' },
            approved: { label: 'Approved', cls: 'bg-green-100 text-green-800 border-green-300' },
            confirmed: { label: 'Confirmed', cls: 'bg-blue-100 text-blue-800 border-blue-300' },
            'payment-failed': { label: 'Payment Failed', cls: 'bg-red-100 text-red-800 border-red-300' },
        };
        const s = map[status] || { label: status?.toUpperCase(), cls: 'bg-gray-100 text-gray-700 border-gray-300' };
        return (
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase border ${s.cls}`}>
                {s.label}
            </span>
        );
    };

    const getDaysOverdue = () => {
        // Use last installment due date if installment plan, else paymentDueDate
        const insts = summary?.installments || [];
        const dueDateStr = insts.length > 0
            ? (insts[insts.length - 1].dueDate || summary?.paymentDueDate)
            : summary?.paymentDueDate;
        if (!dueDateStr) return 0;
        const due = new Date(dueDateStr);
        const today = new Date();
        const diff = Math.floor((today.getTime() - due.getTime()) / (1000 * 60 * 60 * 24));
        return diff > 0 ? diff : 0;
    };

    const daysOverdue = getDaysOverdue();
    const totalPayable = summary?.finance?.totalPayable || summary?.finance?.balanceAmount || 0;
    const isFullyPaid = summary?.status === 'paid' || totalPayable <= 0;

    // ── Due date logic ─────────────────────────────────────────────────────────
    // Full payment: use paymentDueDate (set to last installment due date or 7 days from booking)
    // Installment: use the last installment's due date as the final deadline
    const effectiveDueDate = (() => {
        if (!summary) return null;
        const insts = summary.installments || [];
        if (insts.length > 0) {
            // Last installment's due date is the final deadline
            const lastInst = insts[insts.length - 1];
            return lastInst.dueDate || summary.paymentDueDate;
        }
        return summary.paymentDueDate;
    })();

    // ── Installment state helpers ──────────────────────────────────────────────
    const isInstallmentPlan = summary?.paymentPlanType && summary.paymentPlanType !== 'full';
    const allInstallmentsPaid = summary?.installments?.length > 0 &&
        summary.installments.every((i: any) => i.status === 'paid');
    // Remaining balance after all installments are paid (rounding differences etc.)
    const remainingAfterInstallments = allInstallmentsPaid ? (summary?.finance?.balanceAmount || 0) : 0;

    // Razorpay 2.5% convenience fee calculation
    const calcWithGatewayFee = (amount: number) => {
        const fee = Math.round(amount * RAZORPAY_CHARGE_PCT / 100);
        return { base: amount, fee, total: amount + fee };
    };

    // ── Loading ────────────────────────────────────────────────────────────────
    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-8 h-8 text-[#23471d] animate-spin" />
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading Payment Info...</p>
            </div>
        </div>
    );

    if (!summary) return (
        <div className="flex items-center justify-center h-64">
            <p className="text-sm text-slate-500">No payment data found.</p>
        </div>
    );

    return (
        <div className="space-y-6 pb-6">
            <DashboardHero 
                pageId={isSeller ? "sl-payments" : "ex-payments"}
                defaultTitle="Secure Payment Portal" 
                defaultSubtitle="Manage your stall payments and transaction history"
                type={isSeller ? "seller" : "exhibitor"} 
            />

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full space-y-3"
            >
            {/* ── Header Card ── */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <div className="bg-gradient-to-r from-[#23471d] to-[#2d5a25] px-4 py-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                            <CreditCard className="w-4 h-4 text-white" />
                        </div>
                        <div className="min-w-0">
                            <h2 className="text-xs font-black text-white uppercase tracking-widest">Payment Portal</h2>
                            <p className="text-[10px] text-white/60 font-medium mt-0.5 truncate">{summary.registrationId}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                        {getStatusBadge(summary.status)}
                        <button onClick={fetchSummary} className="w-7 h-7 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                            <RefreshCw className="w-3.5 h-3.5 text-white" />
                        </button>
                    </div>
                </div>
                {/* Exhibitor + Event info strip */}
                <div className="px-4 py-2.5 bg-slate-50 border-b border-gray-100 flex flex-wrap items-center gap-x-4 gap-y-1.5">
                    <div className="flex items-center gap-1.5 min-w-0">
                        <Building2 className="w-3 h-3 text-gray-400 shrink-0" />
                        <span className="text-[11px] font-bold text-gray-700 truncate max-w-[140px] sm:max-w-none">{summary.exhibitorName}</span>
                    </div>
                    {summary.event?.name && (
                        <div className="flex items-center gap-1.5 min-w-0">
                            <Calendar className="w-3 h-3 text-gray-400 shrink-0" />
                            <span className="text-[11px] font-bold text-gray-700 truncate max-w-[120px] sm:max-w-none">{summary.event.name}</span>
                        </div>
                    )}
                    {(summary.stall?.stallFor || summary.stall?.stallNumber) && (
                        <div className="flex items-center gap-1">
                            <span className="text-[9px] font-black text-gray-400 uppercase">Stall:</span>
                            <span className="text-[11px] font-black text-[#23471d]">
                                {summary.stall.stallFor || summary.stall.stallNumber}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* ── Overdue Warning ── */}
            <AnimatePresence>
                {daysOverdue > 0 && !isFullyPaid && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3"
                    >
                        <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center shrink-0">
                            <AlertTriangle className="w-4 h-4 text-red-600" />
                        </div>
                        <div>
                            <p className="text-sm font-black text-red-800">
                                Payment Overdue by {daysOverdue} {daysOverdue === 1 ? 'day' : 'days'}
                            </p>
                            <p className="text-xs text-red-600 mt-0.5">
                                Please complete your payment immediately to avoid further penalties.
                                Due date was {effectiveDueDate ? new Date(effectiveDueDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }) : ''}.
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Tabs ── */}
            <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                {[
                    { id: 'pay', label: 'Make Payment', icon: CreditCard },
                    { id: 'history', label: 'Payment History', icon: Receipt }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex-1 flex items-center justify-center gap-2 px-5 py-3.5 text-[11px] font-black uppercase tracking-wider transition-all border-b-2 ${activeTab === tab.id
                            ? 'border-[#23471d] text-[#23471d] bg-[#23471d]/5'
                            : 'border-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <tab.icon className="w-3.5 h-3.5" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* ── PAY TAB ── */}
            {activeTab === 'pay' && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                >
                    {/* Financial Summary Card — Full Breakdown */}
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                        <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2">
                            <IndianRupee className="w-3.5 h-3.5 text-[#23471d]" />
                            <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Financial Breakdown</p>
                        </div>
                        <div className="p-4 sm:p-5">
                            {/* Cost Breakdown */}
                            <div className="space-y-0 border border-gray-100 rounded-lg overflow-hidden mb-4">
                                {/* Gross Amount */}
                                <div className="flex justify-between items-center px-3 sm:px-4 py-2.5 bg-slate-50 border-b border-gray-100 gap-2">
                                    <span className="text-xs text-gray-500 font-medium">Gross Booking Cost</span>
                                    <span className="text-xs font-bold text-gray-800 shrink-0">{fmt(summary.finance.grossAmount)}</span>
                                </div>

                                {/* Stall Discount */}
                                {summary.finance.stallDiscountAmount > 0 && (
                                    <div className="flex justify-between items-center px-3 sm:px-4 py-2.5 border-b border-gray-100 gap-2">
                                        <span className="text-xs text-gray-500 font-medium flex items-center gap-1.5 min-w-0">
                                            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block shrink-0"></span>
                                            <span className="truncate">Stall Discount</span>
                                        </span>
                                        <span className="text-xs font-bold text-orange-600 shrink-0">−{fmt(summary.finance.stallDiscountAmount)}</span>
                                    </div>
                                )}

                                {/* Full Payment Discount */}
                                {summary.finance.discountAmount > 0 && (
                                    <div className="flex justify-between items-center px-3 sm:px-4 py-2.5 border-b border-gray-100 bg-emerald-50/40 gap-2">
                                        <span className="text-xs text-emerald-700 font-bold flex items-center gap-1.5 min-w-0">
                                            <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                                            <span className="truncate">Full Payment Discount</span>
                                        </span>
                                        <span className="text-xs font-black text-emerald-700 shrink-0">−{fmt(summary.finance.discountAmount)}</span>
                                    </div>
                                )}

                                {/* Taxable Value */}
                                <div className="flex justify-between items-center px-3 sm:px-4 py-2.5 border-b border-gray-100 bg-slate-50 gap-2">
                                    <span className="text-xs text-gray-600 font-bold">Taxable Value (Pre-GST)</span>
                                    <span className="text-xs font-black text-gray-800 shrink-0">{fmt(summary.finance.subtotal)}</span>
                                </div>

                                {/* GST */}
                                <div className="flex justify-between items-center px-3 sm:px-4 py-2.5 border-b border-gray-100 gap-2">
                                    <span className="text-xs text-gray-500 font-medium">GST @ 18%</span>
                                    <span className="text-xs font-bold text-gray-700 shrink-0">+{fmt(summary.finance.gstAmount)}</span>
                                </div>

                                {/* TDS */}
                                {summary.finance.tdsAmount > 0 && (
                                    <div className="flex justify-between items-center px-3 sm:px-4 py-2.5 border-b border-gray-100 gap-2">
                                        <span className="text-xs text-gray-500 font-medium flex items-center gap-1.5 min-w-0">
                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block shrink-0"></span>
                                            <span className="truncate">TDS</span>
                                        </span>
                                        <span className="text-xs font-bold text-blue-600 shrink-0">−{fmt(summary.finance.tdsAmount)}</span>
                                    </div>
                                )}

                                {/* Net Payable */}
                                <div className="flex justify-between items-center px-3 sm:px-4 py-3 bg-[#23471d]/5 border-b border-[#23471d]/10 gap-2">
                                    <span className="text-sm font-black text-[#23471d] uppercase tracking-wide">Total Contract Value</span>
                                    <span className="text-base sm:text-lg font-black text-[#23471d] shrink-0">{fmt(summary.finance.netPayable)}</span>
                                </div>

                                {/* Amount Paid */}
                                <div className="flex justify-between items-center px-3 sm:px-4 py-2.5 border-b border-gray-100 gap-2">
                                    <span className="text-xs text-gray-500 font-medium">Amount Paid So Far</span>
                                    <span className="text-xs font-black text-emerald-600 shrink-0">−{fmt(summary.finance.amountPaid)}</span>
                                </div>

                                {/* Penalty */}
                                {summary.finance.penaltyAmount > 0 && (
                                    <div className="flex justify-between items-center px-3 sm:px-4 py-2.5 border-b border-gray-100 bg-red-50/50 gap-2">
                                        <span className="text-xs text-red-600 font-bold flex items-center gap-1.5">
                                            <AlertTriangle className="w-3 h-3 shrink-0" /> Late Payment Penalty
                                        </span>
                                        <span className="text-xs font-black text-red-700 shrink-0">+{fmt(summary.finance.penaltyAmount)}</span>
                                    </div>
                                )}

                                {/* Balance Due */}
                                <div className="flex justify-between items-center px-3 sm:px-4 py-3 bg-rose-50 border-t border-rose-100 gap-2">
                                    <span className="text-sm font-black text-rose-700 uppercase tracking-wide">Balance Due</span>
                                    <span className="text-lg sm:text-xl font-black text-rose-700 shrink-0">{fmt(summary.finance.totalPayable)}</span>
                                </div>
                            </div>

                            {/* Stall + Due Date info */}
                            <div className="grid grid-cols-2 gap-2 sm:gap-3">
                                <div className="bg-slate-50 rounded-lg p-3">
                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-wider mb-1">Stall</p>
                                    <p className="text-sm font-black text-gray-800">
                                        {summary.stall?.stallFor || summary.stall?.stallNumber || '—'}
                                    </p>
                                    <p className="text-[10px] text-gray-500 truncate">{summary.stall?.stallType} • {summary.stall?.stallSize} sqm</p>
                                </div>
                                <div className={`rounded-lg p-3 ${daysOverdue > 0 ? 'bg-red-50' : 'bg-slate-50'}`}>
                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-wider mb-1">Payment Due</p>
                                    {effectiveDueDate ? (
                                        <>
                                            <p className={`text-sm font-black ${daysOverdue > 0 ? 'text-red-700' : 'text-gray-800'}`}>
                                                {new Date(effectiveDueDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                            </p>
                                            {daysOverdue > 0 && <p className="text-[10px] text-red-600 font-bold">{daysOverdue}d overdue</p>}
                                        </>
                                    ) : <p className="text-sm font-black text-gray-400">—</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Installments — Sequential: next phase unlocks only after previous is paid */}
                    {summary.installments && summary.installments.length > 0 && (
                        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                            <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Percent className="w-3.5 h-3.5 text-[#23471d]" />
                                    <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Installment Schedule</p>
                                </div>
                                <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider">
                                    {summary.installments.filter((i: any) => i.status === 'paid').length}/{summary.installments.length} Paid
                                </span>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {summary.installments.map((inst: any, i: number) => {
                                    const isPaid = inst.status === 'paid';
                                    const isOverdue = inst.dueDate && new Date(inst.dueDate) < new Date() && !isPaid;
                                    // Sequential lock: this phase is payable only if all previous phases are paid
                                    const prevPhasePaid = i === 0 || summary.installments.slice(0, i).every((p: any) => p.status === 'paid');
                                    const isLocked = !isPaid && !prevPhasePaid;
                                    const instBase = inst.dueAmount - (inst.paidAmount || 0);
                                    const { fee: instFee, total: instTotal } = calcWithGatewayFee(instBase);

                                    return (
                                        <div key={i} className={`p-3 sm:p-4 flex items-start sm:items-center justify-between gap-3 transition-colors
                                            ${isPaid ? 'bg-emerald-50/30' : isLocked ? 'bg-gray-50/80 opacity-60' : isOverdue ? 'bg-red-50/40' : ''}`}>
                                            <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
                                                {/* Phase icon */}
                                                <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 sm:mt-0
                                                    ${isPaid ? 'bg-emerald-100' : isLocked ? 'bg-gray-200' : isOverdue ? 'bg-red-100' : 'bg-amber-100'}`}>
                                                    {isPaid
                                                        ? <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                                        : isLocked
                                                            ? <ShieldCheck className="w-4 h-4 text-gray-400" />
                                                            : isOverdue
                                                                ? <AlertTriangle className="w-4 h-4 text-red-600" />
                                                                : <Clock className="w-4 h-4 text-amber-600" />
                                                    }
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex flex-wrap items-center gap-1.5">
                                                        <p className="text-xs font-black text-gray-800">
                                                            {(inst.label || `Installment ${inst.installmentNumber}`).replace(/\s*\(\d+%\)/g, '')}
                                                        </p>
                                                        {isLocked && (
                                                            <span className="text-[8px] font-black uppercase px-1.5 py-0.5 bg-gray-200 text-gray-500 rounded">Locked</span>
                                                        )}
                                                        {isOverdue && !isLocked && (
                                                            <span className="text-[8px] font-black uppercase px-1.5 py-0.5 bg-red-100 text-red-600 rounded">Overdue</span>
                                                        )}
                                                    </div>
                                                    <p className="text-[10px] text-gray-500 mt-0.5">
                                                        {inst.dueDate && `Due: ${new Date(inst.dueDate).toLocaleDateString('en-IN')}`}
                                                    </p>
                                                    {isPaid && inst.paidAt && (
                                                        <p className="text-[10px] text-emerald-600 font-bold mt-0.5">
                                                            ✓ Paid on {new Date(inst.paidAt).toLocaleDateString('en-IN')}
                                                        </p>
                                                    )}
                                                    {isLocked && (
                                                        <p className="text-[10px] text-gray-400 mt-0.5">Complete Phase {i} first to unlock</p>
                                                    )}
                                                </div>
                                            </div>
                                            {/* Amount + Pay button — right side on desktop, below on mobile */}
                                            <div className="text-right shrink-0">
                                                <p className="text-sm font-black text-gray-800">{fmt(inst.dueAmount)}</p>
                                                {isPaid && (
                                                    <p className="text-[10px] text-emerald-600 font-bold">Paid</p>
                                                )}
                                                {!isPaid && !isLocked && (
                                                    <>
                                                        <p className="text-[9px] text-gray-400 mt-0.5">+{fmt(instFee)} fee</p>
                                                        <button
                                                            onClick={() => initiatePayment(instBase, inst.installmentNumber)}
                                                            disabled={paying || payingInstallment !== null}
                                                            className="mt-1.5 flex items-center gap-1 px-2.5 sm:px-3 py-1.5 bg-[#23471d] text-white text-[9px] font-black uppercase rounded-lg hover:bg-[#1a3516] disabled:opacity-50 transition-colors whitespace-nowrap"
                                                        >
                                                            {payingInstallment === inst.installmentNumber
                                                                ? <><Loader2 className="w-3 h-3 animate-spin" /> Processing...</>
                                                                : <><Zap className="w-3 h-3" /> Pay {fmt(instTotal)}</>
                                                            }
                                                        </button>
                                                    </>
                                                )}
                                                {isLocked && (
                                                    <p className="text-[9px] text-gray-400 mt-1">—</p>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* ── Remaining Balance after all installments paid ── */}
                    {isInstallmentPlan && allInstallmentsPaid && remainingAfterInstallments > 0 && !isFullyPaid && (
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                            <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center shrink-0">
                                <Info className="w-4 h-4 text-amber-600" />
                            </div>
                            <div>
                                <p className="text-sm font-black text-amber-800">Remaining Balance</p>
                                <p className="text-xs text-amber-700 mt-0.5">
                                    All installments are paid. A remaining balance of <span className="font-black">{fmt(remainingAfterInstallments)}</span> is still due (rounding/adjustment).
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Pay Full Balance:
                        - Show if NO installment plan (full payment)
                        - Show if installment plan AND all installments are paid but balance still remains
                        - Hide if installment plan is active and phases are still pending */}
                    {!isFullyPaid && (
                        !isInstallmentPlan ||
                        (isInstallmentPlan && allInstallmentsPaid && remainingAfterInstallments > 0)
                    ) && (
                            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                                <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2">
                                    <ShieldCheck className="w-3.5 h-3.5 text-[#23471d]" />
                                    <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">
                                        {summary.installments.length === 0 ? 'Secure Payment via Razorpay' : 'Pay Remaining Balance'}
                                    </p>
                                </div>
                                <div className="p-5">
                                    {(() => {
                                        const { fee, total } = calcWithGatewayFee(totalPayable);
                                        return (
                                            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 mb-4 space-y-2">
                                                <div className="flex justify-between text-xs">
                                                    <span className="text-gray-500 font-medium">Balance Due</span>
                                                    <span className="font-bold text-gray-800">{fmt(totalPayable)}</span>
                                                </div>
                                                <div className="flex justify-between text-xs">
                                                    <span className="text-gray-500 font-medium flex items-center gap-1">
                                                        <Percent className="w-3 h-3 text-orange-500" />
                                                        Gateway Fee ({RAZORPAY_CHARGE_PCT}%)
                                                    </span>
                                                    <span className="font-bold text-orange-600">+{fmt(fee)}</span>
                                                </div>
                                                <div className="border-t border-slate-200 pt-2 flex justify-between items-center">
                                                    <span className="text-sm font-black text-gray-800 uppercase tracking-wide">You Pay</span>
                                                    <span className="text-2xl font-black text-[#23471d]">{fmt(total)}</span>
                                                </div>
                                            </div>
                                        );
                                    })()}

                                    <button
                                        onClick={() => initiatePayment()}
                                        disabled={paying || payingInstallment !== null}
                                        className="w-full flex items-center justify-center gap-2 py-4 bg-[#23471d] text-white font-black text-sm uppercase tracking-wider rounded-xl hover:bg-[#1a3516] disabled:opacity-60 transition-all shadow-md hover:shadow-lg active:scale-[0.99]"
                                    >
                                        {paying
                                            ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing Payment...</>
                                            : <><CreditCard className="w-4 h-4" /> Pay {fmt(calcWithGatewayFee(totalPayable).total)} Now</>
                                        }
                                    </button>

                                    <div className="mt-3 flex items-center justify-center gap-3 text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                                        <span>UPI</span><span className="text-gray-200">|</span>
                                        <span>Cards</span><span className="text-gray-200">|</span>
                                        <span>Net Banking</span><span className="text-gray-200">|</span>
                                        <span>Wallets</span>
                                    </div>
                                </div>
                            </div>
                        )}

                    {/* Fully Paid */}
                    {isFullyPaid && (
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center"
                        >
                            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                            </div>
                            <p className="text-lg font-black text-emerald-800">All Payments Complete!</p>
                            <p className="text-sm text-emerald-600 mt-1">Your stall booking is fully paid. Thank you!</p>
                        </motion.div>
                    )}

                    {/* Info Note */}
                    <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl">
                        <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                        <p className="text-[10px] text-blue-700 leading-relaxed">
                            Payment receipts will be sent to your registered email address after successful payment.
                            A {RAZORPAY_CHARGE_PCT}% gateway convenience fee is charged by Razorpay for online payments.
                            For any payment issues, please contact our support team.
                        </p>
                    </div>
                </motion.div>
            )}

            {/* ── HISTORY TAB ── */}
            {activeTab === 'history' && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
                >
                    {summary.paymentHistory && summary.paymentHistory.length > 0 ? (
                        <>
                            {/* Desktop table */}
                            <div className="hidden sm:block overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-slate-50 border-b border-gray-200">
                                        <tr>
                                            {['#', 'Type', 'Amount', 'Method', 'Transaction ID', 'Date'].map(h => (
                                                <th key={h} className="px-4 py-3 text-left text-[9px] font-black text-gray-500 uppercase tracking-wider">{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {summary.paymentHistory.map((h: any, i: number) => (
                                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="px-4 py-3 text-xs text-gray-400 font-bold">#{i + 1}</td>
                                                <td className="px-4 py-3">
                                                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase rounded-full">
                                                        {h.paymentType || 'Payment'}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-sm font-black text-gray-800">{fmt(h.amount)}</td>
                                                <td className="px-4 py-3 text-xs text-gray-600 font-bold uppercase">{h.method || h.paymentMode || 'Online'}</td>
                                                <td className="px-4 py-3 text-xs text-gray-500 font-mono">{h.transactionId || h.razorpayPaymentId || '—'}</td>
                                                <td className="px-4 py-3 text-xs text-gray-500 font-bold">
                                                    {h.paidAt ? new Date(h.paidAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {/* Mobile cards */}
                            <div className="sm:hidden divide-y divide-gray-100">
                                {summary.paymentHistory.map((h: any, i: number) => (
                                    <div key={i} className="p-4 space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase rounded-full">
                                                {h.paymentType || 'Payment'}
                                            </span>
                                            <span className="text-sm font-black text-gray-800">{fmt(h.amount)}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-[10px]">
                                            <span className="text-gray-500 font-bold uppercase">{h.method || h.paymentMode || 'Online'}</span>
                                            <span className="text-gray-500 font-bold">
                                                {h.paidAt ? new Date(h.paidAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                                            </span>
                                        </div>
                                        {(h.transactionId || h.razorpayPaymentId) && (
                                            <p className="text-[9px] font-mono text-gray-400 truncate">
                                                Txn: {h.transactionId || h.razorpayPaymentId}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="py-16 text-center">
                            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Receipt className="w-7 h-7 text-gray-300" />
                            </div>
                            <p className="text-sm font-bold text-gray-400">No payment history yet</p>
                            <p className="text-xs text-gray-300 mt-1">Your transactions will appear here</p>
                        </div>
                    )}
                </motion.div>
            )}

            {/* ── Payment Success Modal ── */}
            <AnimatePresence>
                {paymentSuccess?.show && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
                        onClick={() => setPaymentSuccess(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="bg-white rounded-2xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl"
                            onClick={e => e.stopPropagation()}
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                                className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4"
                            >
                                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                            </motion.div>
                            <h2 className="text-xl font-black text-gray-800 mb-1">Payment Successful!</h2>
                            <p className="text-sm text-gray-500 mb-4">Your payment has been processed successfully.</p>
                            <div className="bg-emerald-50 rounded-xl p-4 mb-4 text-left space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-xs text-gray-500">Amount Paid</span>
                                    <span className="text-sm font-black text-emerald-700">{fmt(paymentSuccess.amount)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-xs text-gray-500">Gateway Fee ({RAZORPAY_CHARGE_PCT}%)</span>
                                    <span className="text-xs font-bold text-orange-600">+{fmt(paymentSuccess.gatewayFee)}</span>
                                </div>
                                <div className="flex justify-between border-t border-emerald-100 pt-2">
                                    <span className="text-xs font-black text-gray-700">Total Charged</span>
                                    <span className="text-sm font-black text-gray-800">{fmt(paymentSuccess.amount + paymentSuccess.gatewayFee)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-xs text-gray-500">Transaction ID</span>
                                    <span className="text-xs font-mono text-gray-700">{paymentSuccess.transactionId?.substring(0, 16)}...</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-xs text-gray-500">Balance Remaining</span>
                                    <span className="text-sm font-black text-gray-700">{fmt(paymentSuccess.balanceAmount)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-xs text-gray-500">Status</span>
                                    <span className={`text-xs font-black uppercase px-2 py-0.5 rounded-full ${paymentSuccess.status === 'paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-cyan-100 text-cyan-700'}`}>
                                        {paymentSuccess.status}
                                    </span>
                                </div>
                            </div>
                            <p className="text-xs text-gray-400 mb-4">Receipt has been sent to your registered email address.</p>
                            <button
                                onClick={() => setPaymentSuccess(null)}
                                className="w-full py-3 bg-[#23471d] text-white font-black text-sm uppercase rounded-xl hover:bg-[#1a3516] transition-colors"
                            >
                                Done
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
        </div>
    );
}
