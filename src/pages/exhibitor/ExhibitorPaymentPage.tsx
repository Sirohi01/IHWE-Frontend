import { useEffect, useState, useCallback } from 'react';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import { API_URL, SERVER_URL } from '@/lib/api';
import { toast } from 'sonner';
import { logActivity } from '@/utils/activityLogger';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CreditCard, CheckCircle2, Clock, AlertTriangle,
    Loader2, RefreshCw, Receipt,
    IndianRupee, ShieldCheck, Zap, Info, Percent, Building2, Calendar,
    Store, Ruler, Layers3, WalletCards
} from 'lucide-react';
import paymentCompleteImg from '@/assets/paymentComplete.webp';

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
const DUMMY_MOBILE_NUMBERS = new Set([
    '98765432' + '11',
    '98765432' + '10',
    '99999' + '99999'
]);

const isDummyMobile = (value: string) => {
    const digits = String(value || '').replace(/\D/g, '');
    if (DUMMY_MOBILE_NUMBERS.has(digits)) return true;
    if (digits.length > 10 && DUMMY_MOBILE_NUMBERS.has(digits.slice(-10))) return true;
    return false;
};

interface ReceiptContact {
    name: string;
    email: string;
    mobile: string;
}

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
    contact1?: any;
}

const fixUrl = (url?: string) => {
    if (!url || url === "undefined" || url === "null") return "";
    if (url.startsWith("http") || url.startsWith("blob:")) return url;
    const cleanPath = url.startsWith("/") ? url : `/${url}`;
    return url.includes("res.cloudinary.com") ? url : `${SERVER_URL}${cleanPath}`;
};

export default function ExhibitorPaymentPage() {
    const { data, fetchDashboard, myStalls: ctxMyStalls } = useExhibitorCtx();
    const myStalls = Array.isArray(ctxMyStalls) ? ctxMyStalls : [];
    const [summary, setSummary] = useState<PaymentSummary | null>(null);
    const [loading, setLoading] = useState(true);
    const [paying, setPaying] = useState(false);
    const [payingInstallment, setPayingInstallment] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState<'pay' | 'history'>('pay');
    const [receiptContact, setReceiptContact] = useState<ReceiptContact>({
        name: '',
        email: '',
        mobile: ''
    });
    const [receiptErrors, setReceiptErrors] = useState<Partial<ReceiptContact>>({});
    const [paymentSuccess, setPaymentSuccess] = useState<{
        show: boolean; amount: number; gatewayFee: number; transactionId: string; balanceAmount: number; status: string;
    } | null>(null);
    const token = localStorage.getItem('exhibitorToken');
    const isUSD = data?.participation?.currency === 'USD';
    const cur = isUSD ? '$' : '₹';

    const fmt = (n: number) =>
        `${cur}${Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;

    const normalizeIndianMobile = (value: string) => {
        if (isDummyMobile(value)) return '';
        const digits = String(value || '').replace(/\D/g, '');
        if (/^[6-9]\d{9}$/.test(digits)) return digits;
        if (/^91[6-9]\d{9}$/.test(digits)) return digits.slice(-10);
        return '';
    };

    const validateReceiptContact = () => {
        const nextErrors: Partial<ReceiptContact> = {};
        const email = receiptContact.email.trim();
        const mobile = normalizeIndianMobile(receiptContact.mobile);

        if (!receiptContact.name.trim()) nextErrors.name = 'Name is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = 'Valid email is required';
        if (!mobile) nextErrors.mobile = 'Valid 10-digit Indian mobile number is required';

        setReceiptErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) {
            toast.error('Please enter valid receipt details before payment.');
            return null;
        }

        return {
            name: receiptContact.name.trim(),
            email: email.toLowerCase(),
            mobile
        };
    };

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
                const fb = d.finance;
                if (fb.grossAmount === 0 && fb.netPayable > 0) {
                    const taxable = d.stall?.amount || 0;
                    const invoiceTotal = d.stall?.total || 0;
                    const gst = invoiceTotal - taxable;
                    fb.subtotal = taxable;
                    fb.gstAmount = gst;
                    fb.grossAmount = taxable;
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

    // Documents (Invoices / Proforma Invoices) this exhibitor can pay against individually,
    // in addition to paying the overall registration balance above.
    const [docOverview, setDocOverview] = useState<any>(null);
    const [payingDocId, setPayingDocId] = useState<string | null>(null);

    const fetchDocOverview = useCallback(async () => {
        if (!data?._id) return;
        try {
            const res = await fetch(`${API_URL}/exhibitor-auth/account-overview?id=${data._id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const json = await res.json();
            if (json.success) setDocOverview(json.data);
        } catch (err) {
            console.error('Failed to load documents', err);
        }
    }, [data?._id, token]);

    useEffect(() => {
        fetchDocOverview();
    }, [fetchDocOverview]);

    // One row per stall — docOverview.recentDocuments lists a PI *and* its
    // converted Invoice as two separate entries once invoiced, which would
    // double up every stall in this list. financials.dueBreakdown is already
    // deduplicated server-side (the Invoice once converted, the PI only while
    // still uninvoiced), so use that instead and keep every stall here even
    // once fully paid — remaining defaults to 0 (rendered as "Paid" below)
    // when a stall's document isn't in remainingBreakdown any more.
    const payableDocuments = (() => {
        const dueDocs: any[] = docOverview?.financials?.dueBreakdown || [];
        const remainingById = new Map<string, number>(
            (docOverview?.financials?.remainingBreakdown || []).map((entry: any) => [String(entry.id), entry.remainingAmount])
        );
        return dueDocs
            .filter((doc) => doc.type === 'Invoice' || doc.type === 'Proforma Invoice')
            .map((doc) => ({
                id: doc.id,
                documentType: doc.type,
                documentNo: doc.no,
                particulars: doc.particulars || '',
                remaining: remainingById.get(String(doc.id)) ?? 0,
            }));
    })();

    // Payment History — docOverview.financials.paidBreakdown is the real, de-duplicated
    // record of every payment (online + recorded directly in Accounts) already tagged with
    // which document it was against (forNo/forType); summary.paymentHistory only covers this
    // one registration's own online payments and doesn't know which invoice they applied to.
    // Falls back to summary.paymentHistory only while docOverview hasn't loaded yet.
    const paymentHistoryByTxnId = new Map<string, any>(
        (summary?.paymentHistory || []).map((h: any) => [String(h.transactionId || h.razorpayPaymentId || ''), h])
    );
    const paidBreakdown: any[] = docOverview?.financials?.paidBreakdown || [];
    const historyRows = paidBreakdown.length > 0
        ? paidBreakdown.map((p) => {
            const matched = paymentHistoryByTxnId.get(String(p.no || ''));
            return {
                amount: p.amount,
                date: p.date,
                type: p.type,
                forNo: p.forNo,
                forType: p.forType,
                method: matched?.method || matched?.paymentMode || (p.type === 'Online Payment' ? 'Online' : '-'),
                transactionId: p.no,
                receiptPdfUrl: matched?.receiptPdfUrl,
            };
        })
        : (summary?.paymentHistory || []).map((h: any) => ({
            amount: h.amount,
            date: h.paidAt,
            type: h.paymentType || 'Payment',
            forNo: 'Registration',
            forType: 'Registration',
            method: h.method || h.paymentMode || 'Online',
            transactionId: h.transactionId || h.razorpayPaymentId,
            receiptPdfUrl: h.receiptPdfUrl,
        }));

    const payDocument = async (doc: any) => {
        const docType = doc.documentType === 'Invoice' ? 'invoice' : 'proforma';
        if (!doc.remaining || doc.remaining <= 0) return;

        const isLoaded = await loadRazorpay();
        if (!isLoaded) {
            toast.error('Payment gateway failed to load. Please refresh and try again.');
            return;
        }

        setPayingDocId(String(doc.id));
        try {
            const orderRes = await fetch(`${API_URL}/exhibitor-auth/documents/${docType}/${doc.id}/create-order`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
            });
            const orderData = await orderRes.json();
            if (!orderData.success) {
                toast.error(orderData.message || 'Failed to create payment order');
                setPayingDocId(null);
                return;
            }

            const { order, key } = orderData;
            const options = {
                key: key || RAZORPAY_KEY,
                amount: order.amount,
                currency: order.currency || 'INR',
                name: 'IHWE Exhibition',
                description: `Payment - ${doc.documentNo}`,
                order_id: order.id,
                prefill: {
                    name: receiptContact.name,
                    email: receiptContact.email,
                    contact: receiptContact.mobile,
                },
                theme: { color: '#23471d' },
                modal: {
                    ondismiss: () => {
                        setPayingDocId(null);
                        toast.info('Payment cancelled');
                    },
                },
                handler: async (response: any) => {
                    try {
                        const verifyRes = await fetch(`${API_URL}/exhibitor-auth/documents/verify-payment`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token}`,
                            },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                docType,
                                docId: doc.id,
                            }),
                        });
                        const verifyData = await verifyRes.json();
                        if (verifyData.success) {
                            toast.success('Payment successful!');
                            logActivity('Finance', 'Made Payment', `Against ${doc.documentNo}`);
                            await fetchDocOverview();
                        } else {
                            toast.error(verifyData.message || 'Payment verification failed');
                        }
                    } catch (err) {
                        toast.error('Payment verification error. Please contact support.');
                    } finally {
                        setPayingDocId(null);
                    }
                },
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.on('payment.failed', (response: any) => {
                toast.error(`Payment failed: ${response.error?.description || 'Unknown error'}`);
                setPayingDocId(null);
            });
            rzp.open();
        } catch (err: any) {
            toast.error(err.message || 'Payment initiation failed');
            setPayingDocId(null);
        }
    };

    useEffect(() => {
        const contact = summary?.contact1 || data?.contact1 || {};
        const name = `${contact.firstName || ''} ${contact.lastName || ''}`.trim();
        const savedMobile = normalizeIndianMobile(contact.whatsapp) || normalizeIndianMobile(contact.mobile);
        setReceiptContact(prev => ({
            name: prev.name || name || data?.exhibitorName || summary?.exhibitorName || '',
            email: prev.email || contact.email || '',
            mobile: prev.mobile || savedMobile || ''
        }));
    }, [data?.contact1, data?.exhibitorName, summary?.contact1, summary?.exhibitorName]);

    const initiatePayment = async (amountOverride?: number, installmentNumber?: number) => {
        if (!data?._id) return;

        const validReceiptContact = validateReceiptContact();
        if (!validReceiptContact) return;

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
                    installmentNumber,
                    receiptContact: validReceiptContact
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
                    name: registration?.receiptContact?.name || validReceiptContact.name,
                    email: registration?.receiptContact?.email || validReceiptContact.email,
                    contact: registration?.receiptContact?.mobile || validReceiptContact.mobile
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
                                installmentNumber,
                                receiptContact: validReceiptContact
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
                            logActivity('Finance', 'Made Payment', `Transaction ID: ${response.razorpay_payment_id}`);
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
    // summary.finance only covers this one registration's own stall booking — an exhibitor can
    // also owe money on other invoices raised directly through Accounts (extra stalls, add-ons),
    // which docOverview.financials.remainingBalance (the real, company-wide total) does capture.
    // Without this, a registration that's "paid" on its own booking would show a misleading
    // "Payment Complete" screen even while the exhibitor still has real invoices outstanding.
    const realTotalOutstanding = Number(docOverview?.financials?.remainingBalance ?? totalPayable);
    const isFullyPaid = (summary?.status === 'paid' || totalPayable <= 0) && realTotalOutstanding <= 0;
    const contractValue = Number(summary?.finance?.netPayable || 0);
    const amountPaid = Number(summary?.finance?.amountPaid || 0);
    const paidPercentage = contractValue > 0
        ? Math.min(100, Math.max(0, Math.round((amountPaid / contractValue) * 100)))
        : 0;

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
        <div className="min-h-screen bg-[#f5f7fb] p-2.5 sm:p-3">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full space-y-2 pr-9 lg:pr-9"
            >
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-1">
                    <h1 className="text-lg md:text-xl font-bold text-slate-800 pl-1">Payment Management</h1>

                    {/* ── Tabs ── */}
                    <div className="flex w-full sm:w-fit gap-2">
                        {[
                            { id: 'pay', label: 'Make Payment', icon: CreditCard },
                            { id: 'history', label: 'Payment History', icon: Receipt }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 text-[12px] font-bold rounded-lg transition-colors border shadow-sm ${activeTab === tab.id
                                    ? 'text-white bg-[#1a5c2e] border-[#1a5c2e]'
                                    : 'text-slate-600 bg-white border-slate-200 hover:bg-slate-50'
                                    }`}
                            >
                                <tab.icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── Header Card ── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-2">
                    {/* Left Card: Confirmed Exhibition Space */}
                    <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm p-3 flex flex-col justify-start gap-4">
                        <div className="flex flex-row items-start justify-between">
                            <div className="flex items-start gap-3">
                                {data?.companyLogoUrl ? (
                                    <div className="w-12 h-12 bg-white rounded-full border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden shadow-sm">
                                        <img loading="lazy" decoding="async" src={fixUrl(data.companyLogoUrl)} alt="Company Logo" className="w-full h-full object-contain" />
                                    </div>
                                ) : (
                                    <div className="w-12 h-12 bg-[#ecfdf5] rounded-full border border-[#d1fae5] flex items-center justify-center shrink-0 shadow-sm">
                                        <span className="text-[#10b981] font-black text-xl">
                                            {summary.exhibitorName ? summary.exhibitorName.charAt(0).toUpperCase() : 'C'}
                                        </span>
                                    </div>
                                )}
                                <div>
                                    <h1 className="text-lg md:text-xl font-bold text-[#1a2b3c] leading-tight mb-1.5">{summary.exhibitorName}</h1>
                                    <div className="flex flex-col gap-1 text-[11px] md:text-[12px] font-medium text-slate-500">
                                        <div className="flex items-start gap-1.5">
                                            <Calendar className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                                            <span className="leading-snug">{summary.event?.name || 'IHWE 2026'}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                            Registration: <span className="font-bold text-[#10b981]">{summary.registrationId}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-[#ecfdf5] text-[#10b981] text-[10px] font-bold rounded-md uppercase tracking-wide border border-[#d1fae5] shrink-0 mt-1">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Confirmed Exhibition Space</span>
                                <span className="sm:hidden">Confirmed</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 border border-slate-100 rounded-lg overflow-hidden shadow-sm mt-auto">
                            <div className="col-span-2 md:col-span-1 bg-[#1a5c2e] p-2 text-white flex flex-col justify-center rounded-t-lg md:rounded-t-none md:rounded-l-lg md:rounded-r-none">
                                <p className="text-[10px] font-bold text-emerald-200 uppercase tracking-wider mb-0.5">Stall Number{myStalls.length > 1 ? 's' : ''}</p>
                                <p className={myStalls.length > 1 ? "text-xl md:text-2xl font-black leading-tight" : "text-2xl md:text-3xl font-black leading-none"}>
                                    {myStalls.length > 1
                                        ? myStalls.map((s: any) => s.stallNumber).join(', ')
                                        : (summary.stall?.stallFor || summary.stall?.stallNumber || 'TBA')}
                                </p>
                            </div>
                            <div className="p-2.5 bg-white border-r border-slate-100 flex flex-col justify-center">
                                <Layers3 className="w-4 h-4 text-amber-500 mb-1" />
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-1">Stall Type</p>
                                <p className="text-sm font-bold text-slate-800 leading-none">{summary.stall?.stallType || 'Standard'}</p>
                            </div>
                            <div className="p-2.5 bg-white border-r border-slate-100 flex flex-col justify-center">
                                <Ruler className="w-4 h-4 text-blue-500 mb-1" />
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-1">Booked Area</p>
                                <p className="text-sm font-bold text-slate-800 leading-none">{summary.stall?.stallSize || 0} SQM</p>
                            </div>
                            <div className="p-2.5 bg-white flex flex-col justify-center">
                                <Building2 className="w-4 h-4 text-purple-500 mb-1" />
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-1">Scheme</p>
                                <p className="text-sm font-bold text-slate-800 leading-none">{summary.stall?.stallScheme || summary.stall?.scheme || 'Exhibition Stall'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Card: Payment Summary */}
                    <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl shadow-sm p-3 flex flex-col justify-between">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-[#ecfdf5] rounded-lg flex items-center justify-center border border-[#d1fae5]">
                                    <Receipt className="w-4 h-4 text-[#10b981]" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800 text-[13px]">Payment Summary</h3>
                                    <p className="text-[10px] font-medium text-slate-500">{summary.paymentPlanLabel || 'Full Payment (100%)'}</p>
                                </div>
                            </div>
                            <span className="px-2 py-0.5 bg-[#ecfdf5] text-[#10b981] text-[9px] font-bold rounded-md border border-[#d1fae5]">
                                {paidPercentage}% paid
                            </span>
                        </div>

                        <div className="flex items-end justify-between mb-3">
                            <div>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Balance Payable</p>
                                <p className={`text-xl font-black ${isFullyPaid ? 'text-[#10b981]' : 'text-slate-800'} leading-none`}>{fmt(totalPayable)}</p>
                            </div>
                            <div className="flex gap-3 text-right">
                                <div>
                                    <p className="text-[8px] md:text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Contract Value</p>
                                    <p className="text-[11px] md:text-xs font-bold text-slate-800 leading-none">{fmt(contractValue)}</p>
                                </div>
                                <div>
                                    <p className="text-[8px] md:text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Amount Received</p>
                                    <p className="text-[11px] md:text-xs font-bold text-[#10b981] leading-none">{fmt(amountPaid)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="w-full h-1.5 bg-slate-100 rounded-full mb-3 overflow-hidden">
                            <div className="h-full bg-[#10b981] rounded-full transition-all duration-500" style={{ width: `${paidPercentage}%` }} />
                        </div>

                        <div className="mt-auto">
                            {isFullyPaid ? (
                                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#ecfdf5] border border-[#d1fae5] rounded-lg shadow-sm">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
                                    <span className="text-[10px] font-bold text-[#10b981]">Settlement completed</span>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg">
                                    <span className="text-[11px] font-semibold text-slate-600">
                                        {effectiveDueDate ? `Due by ${new Date(effectiveDueDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}` : 'Due date not assigned'}
                                    </span>
                                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded">Action Required</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* ── Overdue Warning ── */}
                <AnimatePresence>
                    {daysOverdue > 0 && !isFullyPaid && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 flex items-start gap-2.5"
                        >
                            <div className="w-7 h-7 bg-red-100 rounded-lg flex items-center justify-center shrink-0">
                                <AlertTriangle className="w-4 h-4 text-red-600" />
                            </div>
                            <div>
                                <p className="text-[13px] font-black text-red-800">
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

                {/* ── PAY TAB ── */}
                {activeTab === 'pay' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-2 items-start"
                    >
                        <div className="lg:col-span-8 space-y-2">
                        {!isFullyPaid && (
                            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                                <div className="px-3 py-2 border-b border-gray-100 flex items-center gap-2">
                                    <Receipt className="w-3.5 h-3.5 text-[#23471d]" />
                                    <p className="text-[13px] font-semibold text-slate-800">Receipt Details</p>
                                </div>
                                <div className="p-2.5">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                        <div>
                                            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-1">
                                                Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                value={receiptContact.name}
                                                onChange={e => {
                                                    setReceiptContact(prev => ({ ...prev, name: e.target.value }));
                                                    setReceiptErrors(prev => ({ ...prev, name: undefined }));
                                                }}
                                                className={`w-full h-8 px-2.5 rounded-md border text-xs font-medium outline-none focus:ring-2 focus:ring-[#23471d]/20 ${receiptErrors.name ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}`}
                                                placeholder="Receipt name"
                                            />
                                            {receiptErrors.name && <p className="mt-1 text-[10px] font-semibold text-red-600">{receiptErrors.name}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-1">
                                                Email <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                value={receiptContact.email}
                                                onChange={e => {
                                                    setReceiptContact(prev => ({ ...prev, email: e.target.value }));
                                                    setReceiptErrors(prev => ({ ...prev, email: undefined }));
                                                }}
                                                className={`w-full h-8 px-2.5 rounded-md border text-xs font-medium outline-none focus:ring-2 focus:ring-[#23471d]/20 ${receiptErrors.email ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}`}
                                                placeholder="name@example.com"
                                            />
                                            {receiptErrors.email && <p className="mt-1 text-[10px] font-semibold text-red-600">{receiptErrors.email}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-1">
                                                Mobile / WhatsApp <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                value={receiptContact.mobile}
                                                onChange={e => {
                                                    setReceiptContact(prev => ({ ...prev, mobile: e.target.value }));
                                                    setReceiptErrors(prev => ({ ...prev, mobile: undefined }));
                                                }}
                                                className={`w-full h-8 px-2.5 rounded-md border text-xs font-medium outline-none focus:ring-2 focus:ring-[#23471d]/20 ${receiptErrors.mobile ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}`}
                                                placeholder="10-digit mobile"
                                                maxLength={14}
                                            />
                                            {receiptErrors.mobile && <p className="mt-1 text-[10px] font-semibold text-red-600">{receiptErrors.mobile}</p>}
                                        </div>
                                    </div>
                                    <p className="text-[9px] text-gray-400 font-medium mt-1.5">
                                        Payment receipt will be sent to both email and WhatsApp/mobile after successful payment.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Installments — Sequential: next phase unlocks only after previous is paid */}
                        {summary.installments && summary.installments.length > 0 && (
                            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                                <div className="px-3 py-2 border-b border-gray-100 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Percent className="w-3.5 h-3.5 text-[#23471d]" />
                                        <p className="text-[13px] font-semibold text-slate-800">Installment Schedule</p>
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
                                            <div key={i} className={`px-3 py-2 flex items-start sm:items-center justify-between gap-2 transition-colors
                                            ${isPaid ? 'bg-emerald-50/30' : isLocked ? 'bg-gray-50/80 opacity-60' : isOverdue ? 'bg-red-50/40' : ''}`}>
                                                <div className="flex items-start sm:items-center gap-2 min-w-0 flex-1">
                                                    {/* Phase icon */}
                                                    <div className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 mt-0.5 sm:mt-0
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
                                                    <p className="text-[13px] font-black text-gray-800">{fmt(inst.dueAmount)}</p>
                                                    {isPaid && (
                                                        <p className="text-[10px] text-emerald-600 font-bold">Paid</p>
                                                    )}
                                                    {!isPaid && !isLocked && (
                                                        <>
                                                            <p className="text-[9px] text-gray-400 mt-0.5">+{fmt(instFee)} fee</p>
                                                            <button
                                                                onClick={() => initiatePayment(instBase, inst.installmentNumber)}
                                                                disabled={paying || payingInstallment !== null}
                                                                className="mt-1 flex items-center gap-1.5 px-2.5 py-1.5 bg-[#23471d] text-white text-[9px] font-semibold rounded-md hover:bg-[#1a3516] disabled:opacity-50 transition-colors whitespace-nowrap"
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
                            <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 flex items-start gap-2">
                                <div className="w-7 h-7 bg-amber-100 rounded-lg flex items-center justify-center shrink-0">
                                    <Info className="w-4 h-4 text-amber-600" />
                                </div>
                                <div>
                                    <p className="text-[13px] font-black text-amber-800">Remaining Balance</p>
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
                                <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                                    <div className="px-3 py-2 border-b border-gray-100 flex items-center gap-2">
                                        <ShieldCheck className="w-3.5 h-3.5 text-[#23471d]" />
                                        <p className="text-[12px] font-bold text-gray-700">
                                            {summary.installments.length === 0 ? 'Secure Payment via Razorpay' : 'Pay Remaining Balance'}
                                        </p>
                                    </div>
                                    <div className="p-2.5">
                                        {(() => {
                                            const { fee, total } = calcWithGatewayFee(totalPayable);
                                            return (
                                                <div className="bg-slate-50 rounded-lg border border-slate-200 p-2.5 mb-2 space-y-1.5">
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
                                                        <span className="text-[12px] font-black text-gray-800 uppercase tracking-wide">You Pay</span>
                                                        <span className="text-[18px] font-black text-[#23471d]">{fmt(total)}</span>
                                                    </div>
                                                </div>
                                            );
                                        })()}

                                        <button
                                            onClick={() => initiatePayment()}
                                            disabled={paying || payingInstallment !== null}
                                            className="w-full sm:w-auto sm:min-w-56 h-9 mx-auto flex items-center justify-center gap-2 bg-[#23471d] text-white font-semibold text-[11px] rounded-lg hover:bg-[#1a3516] disabled:opacity-60 transition-all shadow-sm active:scale-[0.99]"
                                        >
                                            {paying
                                                ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing Payment...</>
                                                : <><CreditCard className="w-4 h-4" /> Pay {fmt(calcWithGatewayFee(totalPayable).total)} Now</>
                                            }
                                        </button>

                                        <div className="mt-2 flex items-center justify-center gap-2 text-[8px] text-gray-400 font-bold uppercase">
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
                                className="w-full rounded-xl overflow-hidden shadow-sm border border-slate-200"
                            >
                                <img loading="lazy" decoding="async" src={paymentCompleteImg} alt="Payment Complete" className="w-full h-auto object-cover" />
                            </motion.div>
                        )}

                        </div>

                        <div className="lg:col-span-4 space-y-2 lg:sticky lg:top-3">
                        {/* Financial Summary Card — Full Breakdown */}
                        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                            <div className="px-4 py-1.5 md:py-2 flex items-center gap-2 border-b border-slate-100 bg-slate-50/50">
                                <div className="w-6 h-6 rounded-full bg-[#ecfdf5] flex items-center justify-center border border-[#d1fae5]">
                                    <IndianRupee className="w-3.5 h-3.5 text-[#10b981]" />
                                </div>
                                <p className="text-[14px] font-bold text-slate-800">Financial Breakdown</p>
                            </div>
                            <div className="p-0">
                                <div className="w-full text-[13px]">
                                    {/* Gross Booking Cost */}
                                    <div className="flex justify-between items-center px-4 py-1.5 md:py-2 border-b border-slate-100">
                                        <span className="text-slate-600 font-medium text-xs">Gross Booking Cost</span>
                                        <span className="font-bold text-slate-800">{fmt(summary.finance.grossAmount)}</span>
                                    </div>

                                    {/* Stall Discount */}
                                    {summary.finance.stallDiscountAmount > 0 && (
                                        <div className="flex justify-between items-center px-4 py-1.5 md:py-2 border-b border-slate-100">
                                            <span className="text-slate-600 font-medium flex items-center gap-2 text-xs">
                                                <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span> Stall Discount
                                            </span>
                                            <span className="font-bold text-orange-600">−{fmt(summary.finance.stallDiscountAmount)}</span>
                                        </div>
                                    )}

                                    {/* Full Payment Discount */}
                                    {summary.finance.discountAmount > 0 && (
                                        <div className="flex justify-between items-center px-4 py-1.5 md:py-2 border-b border-slate-100">
                                            <span className="text-slate-600 font-medium flex items-center gap-2 text-xs">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Full Payment Discount
                                            </span>
                                            <span className="font-bold text-emerald-600">−{fmt(summary.finance.discountAmount)}</span>
                                        </div>
                                    )}

                                    {/* Taxable Value */}
                                    <div className="flex justify-between items-center px-4 py-1.5 md:py-2 border-b border-slate-100">
                                        <span className="text-slate-600 font-medium text-xs">Taxable Value (Pre-GST)</span>
                                        <span className="font-bold text-slate-800">{fmt(summary.finance.subtotal)}</span>
                                    </div>

                                    {/* GST */}
                                    <div className="flex justify-between items-center px-4 py-1.5 md:py-2 border-b border-slate-100">
                                        <span className="text-slate-600 font-medium text-xs">GST @ 18%</span>
                                        <span className="font-bold text-slate-600">+{fmt(summary.finance.gstAmount)}</span>
                                    </div>

                                    {/* TDS */}
                                    {summary.finance.tdsAmount > 0 && (
                                        <div className="flex justify-between items-center px-4 py-1.5 md:py-2 border-b border-slate-100">
                                            <span className="text-slate-600 font-medium flex items-center gap-2 text-xs">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#0052cc]"></span> TDS
                                            </span>
                                            <span className="font-bold text-[#0052cc]">−{fmt(summary.finance.tdsAmount)}</span>
                                        </div>
                                    )}

                                    {/* Net Payable / Contract Value */}
                                    <div className="flex justify-between items-center px-4 py-1.5 md:py-2 border-b border-slate-100 bg-[#f8f9fa]">
                                        <span className="font-bold text-[#10b981] uppercase text-xs tracking-wider">Total Contract Value</span>
                                        <span className="font-black text-[#10b981] text-[15px]">{fmt(summary.finance.netPayable)}</span>
                                    </div>

                                    {/* Amount Paid So Far */}
                                    <div className="flex justify-between items-center px-4 py-1.5 md:py-2 border-b border-slate-100 bg-[#f8f9fa]">
                                        <span className="text-slate-600 font-medium text-xs">Amount Paid So Far</span>
                                        <span className="font-black text-[#10b981]">−{fmt(summary.finance.amountPaid)}</span>
                                    </div>

                                    {/* Penalty */}
                                    {summary.finance.penaltyAmount > 0 && (
                                        <div className="flex justify-between items-center px-4 py-1.5 md:py-2 border-b border-slate-100 bg-red-50/30">
                                            <span className="text-red-500 font-medium flex items-center gap-2 text-xs">
                                                <AlertTriangle className="w-3.5 h-3.5" /> Late Payment Penalty
                                            </span>
                                            <span className="font-bold text-red-600">+{fmt(summary.finance.penaltyAmount)}</span>
                                        </div>
                                    )}

                                    {/* Balance Due */}
                                    <div className="flex justify-between items-center px-4 py-1.5 md:py-2 bg-[#fff1f2]">
                                        <span className="font-black text-rose-600 uppercase text-xs tracking-wider">Balance Due</span>
                                        <span className="font-black text-rose-600 text-[18px]">{fmt(summary.finance.totalPayable)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pay against a specific Invoice / Proforma Invoice */}
                        {payableDocuments.length > 0 && (
                            <div className="w-full rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-white">
                                <div className="px-3 py-2 border-b border-slate-100 bg-slate-50">
                                    <p className="text-[12px] font-black text-slate-700 uppercase tracking-wide">Pay Against Invoice / Proforma</p>
                                    <p className="text-[10px] text-slate-400 mt-0.5">Pay directly against a specific document instead of the overall balance above.</p>
                                </div>
                                <div className="divide-y divide-slate-100">
                                    {payableDocuments.map((doc: any) => {
                                        const isPaying = payingDocId === String(doc.id);
                                        const isPaid = doc.remaining <= 0;
                                        return (
                                            <div key={`${doc.documentType}-${doc.id}`} className="flex items-center justify-between gap-2 px-3 py-2.5">
                                                <div className="min-w-0">
                                                    <p className="text-[12px] font-bold text-slate-800 truncate">{doc.documentNo}</p>
                                                    {doc.particulars && (
                                                        <p className="text-[10px] font-semibold text-slate-600 truncate">{doc.particulars}</p>
                                                    )}
                                                    <p className="text-[10px] text-slate-400">{doc.documentType} &middot; {isPaid ? 'Fully Paid' : `Due ${fmt(doc.remaining)}`}</p>
                                                </div>
                                                {isPaid ? (
                                                    <span className="shrink-0 h-8 px-3 rounded-lg bg-emerald-50 text-emerald-700 text-[11px] font-semibold flex items-center gap-1.5 border border-emerald-100">
                                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                                        Paid
                                                    </span>
                                                ) : (
                                                    <button
                                                        onClick={() => payDocument(doc)}
                                                        disabled={isPaying}
                                                        className="shrink-0 h-8 px-3 rounded-lg bg-[#23471d] hover:bg-[#1a3516] text-white text-[11px] font-semibold flex items-center gap-1.5 disabled:opacity-60"
                                                    >
                                                        {isPaying ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CreditCard className="w-3.5 h-3.5" />}
                                                        Pay {fmt(doc.remaining)}
                                                    </button>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Info Note */}
                        {/* <div className="flex items-start gap-2 px-3 py-2 bg-blue-50 border border-blue-100 rounded-lg">
                            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                            <p className="text-[10px] text-blue-700 leading-relaxed">
                                Payment receipts will be sent to the email and WhatsApp/mobile number entered above after successful payment.
                                A {RAZORPAY_CHARGE_PCT}% gateway convenience fee is charged by Razorpay for online payments.
                                For any payment issues, please contact our support team.
                            </p>
                        </div> */}
                        </div>
                    </motion.div>
                )}

                {/* ── HISTORY TAB ── */}
                {activeTab === 'history' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm"
                    >
                        {historyRows.length > 0 ? (
                            <>
                                <div className="hidden sm:block overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-slate-50 border-b border-gray-200">
                                            <tr>
                                                {['#', 'Type', 'Amount', 'Against', 'Method', 'Transaction ID', 'Date', 'Receipt'].map(h => (
                                                    <th key={h} className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase">{h}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {historyRows.map((h, i) => (
                                                <tr key={i} className="hover:bg-slate-50 transition-colors">
                                                    <td className="px-4 py-2.5 text-[12px] text-gray-400 font-bold">#{i + 1}</td>
                                                    <td className="px-4 py-3">
                                                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase rounded-full">
                                                            {h.type || 'Payment'}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-2.5 text-[12px] font-bold text-gray-800">{fmt(h.amount)}</td>
                                                    <td className="px-4 py-2.5 text-[12px]">
                                                        <span className="font-bold text-slate-700">{h.forNo || '—'}</span>
                                                        {h.forType && <span className="block text-[10px] text-slate-400">{h.forType}</span>}
                                                    </td>
                                                    <td className="px-4 py-2.5 text-[12px] text-gray-600 font-semibold uppercase">{h.method || 'Online'}</td>
                                                    <td className="px-4 py-2.5 text-[12px] text-gray-500 font-mono">{h.transactionId || '—'}</td>
                                                    <td className="px-4 py-2.5 text-[12px] text-gray-500 font-semibold">
                                                        {h.date ? new Date(h.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                                                    </td>
                                                    <td className="px-4 py-2.5 text-[12px]">
                                                        {h.receiptPdfUrl ? (
                                                            <a href={h.receiptPdfUrl} target="_blank" rel="noopener noreferrer" download
                                                                className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded font-bold transition">
                                                                <Receipt size={12} /> Download
                                                            </a>
                                                        ) : (
                                                            <span className="text-gray-300 text-[9px]">—</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                {/* Mobile cards */}
                                <div className="sm:hidden divide-y divide-gray-100">
                                    {historyRows.map((h, i) => (
                                        <div key={i} className="p-4 space-y-3">
                                            <div className="flex items-center justify-between">
                                                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase rounded-full">
                                                    {h.type || 'Payment'}
                                                </span>
                                                <span className="text-sm font-black text-gray-800">{fmt(h.amount)}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-[10px]">
                                                <span className="text-gray-500 font-bold uppercase">{h.method || 'Online'}</span>
                                                <span className="text-gray-500 font-bold">
                                                    {h.date ? new Date(h.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                                                </span>
                                            </div>
                                            {h.forNo && (
                                                <p className="text-[10px] font-bold text-slate-600">Against: {h.forNo} {h.forType ? `(${h.forType})` : ''}</p>
                                            )}
                                            {h.transactionId && (
                                                <p className="text-[9px] font-mono text-gray-400 truncate">
                                                    Txn: {h.transactionId}
                                                </p>
                                            )}
                                            {h.receiptPdfUrl && (
                                                <a href={h.receiptPdfUrl} target="_blank" rel="noopener noreferrer" download
                                                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded font-bold text-[10px] transition">
                                                    <Receipt size={12} /> Download Receipt
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="py-12 text-center">
                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Receipt className="w-6 h-6 text-gray-300" />
                                </div>
                                <p className="text-[13px] font-bold text-gray-400">No payment history yet</p>
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
                                className="bg-white rounded-lg p-5 sm:p-6 max-w-sm w-full text-center shadow-2xl"
                                onClick={e => e.stopPropagation()}
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                                    className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4"
                                >
                                    <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                                </motion.div>
                                <h2 className="text-[18px] font-black text-gray-800 mb-1">Payment Successful!</h2>
                                <p className="text-sm text-gray-500 mb-4">Your payment has been processed successfully.</p>
                                <div className="bg-emerald-50 rounded-lg p-3 mb-4 text-left space-y-2">
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
                                    className="w-full h-10 bg-[#23471d] text-white font-bold text-[12px] rounded-lg hover:bg-[#1a3516] transition-colors"
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
