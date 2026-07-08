import { useEffect, useState, useRef, useCallback } from 'react';
import { useExhibitorCtx } from '@/context/ExhibitorContext';

function useCountUp(end: number, duration: number, started: boolean) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!started) return;
        let startTime: number | null = null;
        const step = (ts: number) => {
            if (!startTime) startTime = ts;
            const progress = Math.min((ts - startTime) / duration, 1);
            setCount(progress * end);
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [started, end, duration]);
    return count;
}

const CounterNumber = ({ end, started, delay, decimals = 0 }: { end: number, started: boolean, delay: number, decimals?: number }) => {
    const [active, setActive] = useState(false);
    useEffect(() => {
        if (started) {
            const t = setTimeout(() => setActive(true), delay);
            return () => clearTimeout(t);
        }
    }, [started, delay]);
    const count = useCountUp(end, 2500, active);
    return <>{count.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}</>;
};
import { API_URL } from '@/lib/api';
import { logActivity } from '@/utils/activityLogger';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

import {
    Calendar,
    CheckCircle2,
    Clock3,
    AlertCircle,
    Wallet,
    Receipt,
    Eye,
    Download,
    CreditCard,
    ChevronLeft,
    ChevronRight,
    Edit2,
    Loader2,
} from 'lucide-react';

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

// Which recentDocuments.documentType values show up under each tab.
const TAB_DOC_TYPES: Record<string, string[]> = {
    'All': ['Invoice', 'Proforma Invoice', 'Delivery Challan', 'Payment', 'Credit Note', 'Credit Note (Legacy)', 'Debit Note'],
    'Proforma Invoice': ['Proforma Invoice'],
    'Invoice': ['Invoice'],
    'Delivery Challan': ['Delivery Challan'],
    'Payment': ['Payment'],
    'Credit Notes': ['Debit Note'],
    'Debit Notes': ['Credit Note', 'Credit Note (Legacy)'],
};

const getDisplayDocumentType = (type: string) => {
    if (type === 'Debit Note') return 'Credit Note';
    if (type === 'Credit Note') return 'Debit Note';
    if (type === 'Credit Note (Legacy)') return 'Debit Note (Legacy)';
    return type;
};

const STATUS_STYLES: Record<string, string> = {
    Paid: 'bg-[#e8f8ee] text-[#16a34a]',
    Received: 'bg-[#e8f8ee] text-[#16a34a]',
    Delivered: 'bg-[#e8f8ee] text-[#16a34a]',
    Acknowledged: 'bg-[#e8f8ee] text-[#16a34a]',
    Partial: 'bg-[#eff6ff] text-[#2563eb]',
    Issued: 'bg-[#eff6ff] text-[#2563eb]',
    Generated: 'bg-[#eff6ff] text-[#2563eb]',
    Sent: 'bg-[#eff6ff] text-[#2563eb]',
    'E-Sent': 'bg-[#eff6ff] text-[#2563eb]',
    'W-Sent': 'bg-[#eff6ff] text-[#2563eb]',
    'E/W-Sent': 'bg-[#eff6ff] text-[#2563eb]',
    Unpaid: 'bg-[#fff7ed] text-[#f59e0b]',
    Draft: 'bg-[#fff7ed] text-[#f59e0b]',
    Cancelled: 'bg-[#fef2f2] text-[#dc2626]',
};

const getStatusBadge = (status: string) => {
    switch (status) {
        case 'Paid':
        case 'Received':
        case 'Delivered':
        case 'Acknowledged':
            return <span className="px-2.5 py-1 bg-green-100 text-green-700 text-[11px] font-bold rounded-md whitespace-nowrap">{status}</span>;
        case 'Cancelled':
            return <span className="px-2.5 py-1 bg-red-100 text-red-700 text-[11px] font-bold rounded-md whitespace-nowrap">{status}</span>;
        case 'Sent':
        case 'Partial':
        case 'Issued':
        case 'Generated':
        case 'E-Sent':
        case 'W-Sent':
        case 'E/W-Sent':
            return <span className="px-2.5 py-1 bg-blue-100 text-blue-700 text-[11px] font-bold rounded-md whitespace-nowrap">{status}</span>;
        case 'Unpaid':
        case 'Draft':
        default:
            return <span className="px-2.5 py-1 bg-orange-100 text-orange-700 text-[11px] font-bold rounded-md whitespace-nowrap">{status || 'Pending'}</span>;
    }
};

const formatDocDate = (value: any) => {
    if (!value) return 'N/A';
    const d = new Date(value);
    if (isNaN(d.getTime())) return 'N/A';
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

const formatAmount = (value: any) => `₹ ${(Number(value) || 0).toLocaleString('en-IN')}`;

const DOC_TYPE_SLUGS: Record<string, string> = {
    'Invoice': 'invoice',
    'Proforma Invoice': 'proforma',
    'Delivery Challan': 'challan',
};

const ITEMS_PER_PAGE = 10;

export default function ExhibitorInvoicesPage() {
    const { data } = useExhibitorCtx();
    const token = localStorage.getItem('exhibitorToken');
    const navigate = useNavigate();


    const [activeTab, setActiveTab] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);

    const [overview, setOverview] = useState<any>(null);
    const [loadingOverview, setLoadingOverview] = useState(true);
    const [payingDocId, setPayingDocId] = useState<string | null>(null);

    const statsRef = useRef<HTMLDivElement>(null);
    const [statsVisible, setStatsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStatsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        if (statsRef.current) {
            observer.observe(statsRef.current);
        }
        return () => observer.disconnect();
    }, []);

    const fetchOverview = useCallback(async () => {
        if (!data?._id) return;
        try {
            setLoadingOverview(true);
            const res = await fetch(`${API_URL}/exhibitor-auth/account-overview?id=${data._id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const json = await res.json();
            if (json.success) setOverview(json.data);
        } catch (err) {
            console.error('Failed to load account overview', err);
        } finally {
            setLoadingOverview(false);
        }
    }, [data?._id, token]);

    useEffect(() => {
        fetchOverview();
    }, [fetchOverview]);

    const financials = overview?.financials;
    const totalPayable = financials?.totalDue ?? 0;
    const totalPaid = financials?.paidAmount ?? 0;
    const totalBalance = financials?.remainingBalance ?? 0;

    const paymentPercentage =
        totalPayable > 0
            ? ((totalPaid / totalPayable) * 100).toFixed(2)
            : 0;

    const animatedPercentage = useCountUp(Number(paymentPercentage), 2500, statsVisible);

    const tabs = [
        'All',
        'Proforma Invoice',
        'Invoice',
        'Delivery Challan',
        'Payment',
        'Credit Notes',
        'Debit Notes',
    ];

    const documents: any[] = overview?.recentDocuments || [];
    const filteredDocuments = documents
        .filter((doc) => (TAB_DOC_TYPES[activeTab] || []).includes(doc.documentType))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const remainingById = new Map<string, number>(
        (financials?.remainingBreakdown || []).map((entry: any) => [String(entry.id), entry.remainingAmount])
    );

    const totalPages = Math.max(1, Math.ceil(filteredDocuments.length / ITEMS_PER_PAGE));
    const safeCurrentPage = Math.min(currentPage, totalPages);
    const paginatedDocuments = filteredDocuments.slice(
        (safeCurrentPage - 1) * ITEMS_PER_PAGE,
        safeCurrentPage * ITEMS_PER_PAGE
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab]);

    const viewDocument = (doc: any) => {
        const slug = DOC_TYPE_SLUGS[doc.documentType];
        if (!slug) return;
        logActivity('Finance', 'Viewed Document', doc.documentNo);
        window.open(`/exhibitor-print/${slug}/${doc.id}`, '_blank', 'noopener,noreferrer');
    };

    const handleDownloadStatement = async () => {
        if (!data?._id) return;
        try {
            const toastId = toast.loading('Generating statement...');
            const res = await fetch(`${API_URL}/client-ledger/${data._id}/statement`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!res.ok) throw new Error('Failed to download statement');

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Statement_${data.exhibitorName?.replace(/[^a-z0-9]+/gi, '_') || 'Client'}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
            toast.success('Statement downloaded successfully', { id: toastId });
        } catch (err) {
            console.error('Download error:', err);
            toast.error('Failed to download statement');
        }
    };

    const handleDownloadAllInvoices = () => {
        const invoices = documents.filter((doc: any) => doc.documentType === 'Invoice');
        if (invoices.length === 0) {
            toast.error('No invoices found to download');
            return;
        }

        toast.info(`Generating a single document for ${invoices.length} invoices...`);

        const ids = invoices.map((doc: any) => doc.id).join(',');
        const types = invoices.map((doc: any) => DOC_TYPE_SLUGS[doc.documentType]).join(',');

        navigate(`/exhibitor-print-all?ids=${ids}&types=${types}`);
    };

    const handleDownloadAllReceipts = async () => {
        const receipts = documents.filter((doc: any) => doc.documentType === 'Payment');
        if (receipts.length === 0) {
            toast.error('No receipts found to download');
            return;
        }

        const toastId = toast.loading(`Downloading ${receipts.length} receipts...`);
        for (let i = 0; i < receipts.length; i++) {
            const doc = receipts[i];
            try {
                const res = await fetch(`${API_URL.replace('/api', '')}/api/payments/${doc.id}/receipt`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.ok) {
                    const blob = await res.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    a.download = `Receipt_${doc.documentNo || 'Payment'}.pdf`;
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    a.remove();
                }
            } catch (err) {
                console.error('Failed to download receipt', doc.documentNo, err);
            }
            // Small delay to prevent browser throttling multiple rapid downloads
            await new Promise(r => setTimeout(r, 600));
        }
        toast.success('All receipts downloaded successfully!', { id: toastId });
    };



    const payDocument = async (doc: any) => {
        const docType = doc.documentType === 'Invoice' ? 'invoice' : 'proforma';
        const outstanding = remainingById.get(String(doc.id));
        if (!outstanding || outstanding <= 0) return;

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
                    name: overview?.companyInfo?.contactPerson,
                    email: overview?.companyInfo?.email,
                    contact: overview?.companyInfo?.mobile,
                },
                theme: { color: '#00a651' },
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
                            await fetchOverview();
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

    const mainTableTitle = activeTab === 'Payment'
        ? 'Payment History'
        : activeTab === 'Credit Notes'
            ? 'Credit Notes'
            : activeTab === 'Proforma Invoice'
                ? 'Proforma Invoice List'
                : activeTab === 'Invoice'
                    ? 'Invoice List'
                    : 'All Documents';

    return (
        <div className="min-h-screen bg-[#f5f7fb] p-4">

            {/* PAGE HEADER */}

            <div className="mb-2 mt-2">

                <h2 className="text-[20px] leading-none font-bold text-[#0f172a]">
                    Invoices & Receipts
                </h2>

                <div className="flex items-center gap-2 mt-2 text-[12px] text-[#64748b]">
                    <span>Home</span>
                    <ChevronRight size={12} />
                    <span>Payments & Invoices</span>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

                {/* LEFT SECTION */}

                <div className="xl:col-span-9 space-y-3">

                    {/* SUMMARY CARDS */}
                    <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

                        {/* CARD 1 */}
                        <div className="group relative bg-gradient-to-br from-white from-50% to-emerald-50 p-4 border border-slate-200 rounded-2xl transition-all duration-500 shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:-translate-y-1 overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                                        <Wallet className="w-5 h-5 text-emerald-600" strokeWidth={2.5} />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-xl font-bold text-slate-900 leading-none mb-1">
                                            ₹ <CounterNumber end={totalPayable} started={statsVisible} delay={0} />
                                        </p>
                                        <p className="text-[9px] font-extrabold text-slate-700 leading-tight uppercase whitespace-nowrap truncate">
                                            Total Amount
                                        </p>
                                    </div>
                                </div>
                                <div className="text-[10px] font-bold mt-2 text-emerald-600 text-center">
                                    Incl. Taxes
                                </div>
                            </div>
                        </div>

                        {/* CARD 2 */}
                        <div className="group relative bg-gradient-to-br from-white from-50% to-blue-50 p-4 border border-slate-200 rounded-2xl transition-all duration-500 shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:-translate-y-1 overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                                        <CheckCircle2 className="w-5 h-5 text-blue-600" strokeWidth={2.5} />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-xl font-bold text-slate-900 leading-none mb-1">
                                            ₹ <CounterNumber end={totalPaid} started={statsVisible} delay={100} />
                                        </p>
                                        <p className="text-[9px] font-extrabold text-slate-700 leading-tight uppercase whitespace-nowrap truncate">
                                            Amount Paid
                                        </p>
                                    </div>
                                </div>
                                <div className="text-[10px] font-bold mt-2 text-blue-600 text-center">
                                    Paid till date
                                </div>
                            </div>
                        </div>

                        {/* CARD 3 */}
                        <div className="group relative bg-gradient-to-br from-white from-50% to-amber-50 p-4 border border-slate-200 rounded-2xl transition-all duration-500 shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:-translate-y-1 overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
                                        <Clock3 className="w-5 h-5 text-amber-600" strokeWidth={2.5} />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-xl font-bold text-slate-900 leading-none mb-1">
                                            ₹ <CounterNumber end={totalBalance} started={statsVisible} delay={200} />
                                        </p>
                                        <p className="text-[9px] font-extrabold text-slate-700 leading-tight uppercase whitespace-nowrap truncate">
                                            Pending Amount
                                        </p>
                                    </div>
                                </div>
                                <div className="text-[10px] font-bold mt-2 text-amber-600 text-center">
                                    Due amount
                                </div>
                            </div>
                        </div>

                        {/* CARD 4 */}
                        <div className="group relative bg-gradient-to-br from-white from-50% to-red-50 p-4 border border-slate-200 rounded-2xl transition-all duration-500 shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:-translate-y-1 overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                                        <AlertCircle className="w-5 h-5 text-red-600" strokeWidth={2.5} />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-xl font-bold text-slate-900 leading-none mb-1">
                                            ₹ <CounterNumber end={0} started={statsVisible} delay={300} />
                                        </p>
                                        <p className="text-[9px] font-extrabold text-slate-700 leading-tight uppercase whitespace-nowrap truncate">
                                            Overdue Amount
                                        </p>
                                    </div>
                                </div>
                                <div className="text-[10px] font-bold mt-2 text-red-600 text-center">
                                    No overdue
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* MAIN CARD */}

                    <div className="bg-white rounded-xl border border-[#EDF0F7] shadow-sm overflow-hidden">

                        {/* TABS */}

                        <div className="px-4 pt-2 border-b border-[#edf0f7]">

                            <div className="flex items-center gap-8 overflow-x-auto">

                                {tabs.map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() =>
                                            setActiveTab(tab)
                                        }
                                        className={`pb-2 text-[12px] font-semibold whitespace-nowrap border-b-2 transition-all ${activeTab === tab
                                            ? 'text-[#00a651] border-[#00a651]'
                                            : 'text-[#64748b] border-transparent'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* TABLE HEADER */}

                        <div className="px-4 py-2 border-b border-[#edf0f7] flex items-center justify-between">

                            <div>
                                <h2 className="text-[16px] font-bold text-[#0f172a]">
                                    {mainTableTitle}
                                </h2>
                            </div>
                        </div>

                        {/* TABLE */}

                        <div className="overflow-x-auto custom-scrollbar">

                            <table className="w-full text-left border-collapse whitespace-nowrap text-[10px]" style={{ fontFamily: 'Inter, sans-serif', color: '#15173D' }}>

                                <thead>

                                    <tr className="text-white tracking-wider" style={{ backgroundColor: '#0A2947' }}>

                                        <th className="px-2 py-2 font-medium text-center">
                                            Document No.
                                        </th>

                                        <th className="px-2 py-2 font-medium text-center">
                                            Date
                                        </th>

                                        <th className="px-2 py-2 font-medium text-center">
                                            Type
                                        </th>

                                        <th className="px-2 py-2 font-medium text-right">
                                            Amount
                                        </th>

                                        <th className="px-2 py-2 font-medium text-center">
                                            Status
                                        </th>

                                        <th className="px-2 py-2 font-medium text-center">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-100">
                                    {loadingOverview ? (
                                        <tr>
                                            <td colSpan={6} className="py-8 text-center text-[13px] text-[#64748b]">
                                                Loading documents...
                                            </td>
                                        </tr>
                                    ) : filteredDocuments.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="py-8 text-center text-[13px] text-[#64748b]">
                                                No documents found.
                                            </td>
                                        </tr>
                                    ) : (
                                        paginatedDocuments.map((doc: any) => {
                                            const isPayable = (doc.documentType === 'Invoice' || doc.documentType === 'Proforma Invoice')
                                                && (remainingById.get(String(doc.id)) || 0) > 0;
                                            const isPaying = payingDocId === String(doc.id);
                                            const canView = Boolean(DOC_TYPE_SLUGS[doc.documentType]);

                                            return (
                                                <tr
                                                    key={`${doc.documentType}-${doc.id}`}
                                                    className="border-b border-slate-100 bg-white hover:bg-slate-50/50 transition-colors group"
                                                >
                                                    <td className="px-2 py-2 text-center font-bold" style={{ color: '#5E0006' }}>
                                                        {canView ? (
                                                            <button
                                                                onClick={() => viewDocument(doc)}
                                                                className="hover:underline text-left"
                                                            >
                                                                {doc.documentNo}
                                                            </button>
                                                        ) : doc.documentType === 'Payment' ? (
                                                            <span className="font-normal" style={{ color: '#093C5D' }}>
                                                                Payment for <span className="font-semibold">{doc.documentNo}</span>
                                                            </span>
                                                        ) : (
                                                            <span>{doc.documentNo}</span>
                                                        )}
                                                    </td>

                                                    <td className="px-2 py-2 text-center font-medium">
                                                        {formatDocDate(doc.date)}
                                                    </td>

                                                    <td className="px-2 py-2 text-center">
                                                        <div className="font-bold text-[11px]" style={{ color: '#093C5D' }}>
                                                            {doc.documentType}
                                                        </div>
                                                    </td>

                                                    <td className="px-2 py-2 text-right font-bold text-emerald-700">
                                                        {formatAmount(doc.amount)}
                                                    </td>

                                                    <td className="px-2 py-2 text-center">
                                                        {getStatusBadge(doc.status)}
                                                    </td>

                                                    <td className="px-2 py-2 text-center">
                                                        <div className="flex items-center justify-center gap-1.5 transition-opacity">
                                                            {isPayable && (
                                                                <button
                                                                    onClick={() => payDocument(doc)}
                                                                    disabled={isPaying}
                                                                    className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold flex items-center justify-center gap-1 disabled:opacity-60 transition-colors"
                                                                >
                                                                    {isPaying ? <Loader2 size={11} className="animate-spin" /> : <CreditCard size={11} />}
                                                                    Pay
                                                                </button>
                                                            )}
                                                            {canView && (
                                                                <button
                                                                    onClick={() => viewDocument(doc)}
                                                                    title="View / Print"
                                                                    className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                                                >
                                                                    <Eye size={13} />
                                                                </button>
                                                            )}
                                                            {doc.documentType === 'Payment' && (
                                                                <button
                                                                    onClick={() => window.open(`${API_URL.replace('/api', '')}/api/payments/${doc.id}/receipt`, '_blank')}
                                                                    title="View Receipt"
                                                                    className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                                                >
                                                                    <Eye size={13} />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                            {/* Pagination Footer */}
                            <div className="p-2 border-t border-slate-100 bg-white flex flex-wrap items-center justify-between text-[10px] font-medium text-slate-600 gap-4">
                                <div className="flex items-center gap-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                                    <span className="text-[11px] font-bold" style={{ color: '#334155' }}>Showing</span>
                                    <span className="text-[11px] font-black px-1.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-100" style={{ color: '#016B61' }}>
                                        {filteredDocuments.length === 0 ? 0 : (safeCurrentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(safeCurrentPage * ITEMS_PER_PAGE, filteredDocuments.length)}
                                    </span>
                                    <span className="text-[11px] font-bold" style={{ color: '#334155' }}>of</span>
                                    <span className="text-[11px] font-black px-1.5 py-0.5 rounded-md bg-blue-50 border border-blue-100" style={{ color: '#1E3A8A' }}>
                                        {filteredDocuments.length}
                                    </span>
                                    <span className="text-[11px] font-bold" style={{ color: '#334155' }}>documents</span>
                                </div>

                                {totalPages > 1 && (
                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                            disabled={safeCurrentPage === 1}
                                            className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50"
                                        >
                                            <ChevronLeft size={16} />
                                        </button>
                                        <div className="flex items-center gap-1">
                                            {Array.from({ length: totalPages }).map((_, idx) => {
                                                const pageNum = idx + 1;
                                                return (
                                                    <button
                                                        key={pageNum}
                                                        onClick={() => setCurrentPage(pageNum)}
                                                        className={`w-7 h-7 flex items-center justify-center rounded font-semibold text-sm transition-colors ${safeCurrentPage === pageNum ? 'bg-green-600 text-white' : 'border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                                                    >
                                                        {pageNum}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                        <button
                                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                            disabled={safeCurrentPage === totalPages}
                                            className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50"
                                        >
                                            <ChevronRight size={16} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDEBAR */}

                <div className="xl:col-span-3 space-y-3">

                    {/* PAYMENT SUMMARY */}

                    <div className="bg-white rounded-[8px] border border-[#edf0f7] px-4 py-2 shadow-sm">

                        {/* HEADER */}

                        <div className="flex items-start justify-between">

                            <h3 className="text-[16px] font-bold text-[#0f172a]">
                                Payment Summary
                            </h3>
                        </div>

                        {/* CHART SECTION */}

                        <div className="mt-2 flex items-center justify-between gap-4">

                            {/* CIRCLE */}

                            <div className="relative w-[85px] h-[85px] shrink-0">

                                <svg
                                    className="w-full h-full -rotate-90"
                                    viewBox="0 0 120 120"
                                >

                                    {/* BG */}

                                    <circle
                                        cx="60"
                                        cy="60"
                                        r="48"
                                        stroke="#e9eef5"
                                        strokeWidth="10"
                                        fill="none"
                                    />

                                    {/* GREEN */}

                                    <circle
                                        cx="60"
                                        cy="60"
                                        r="48"
                                        stroke="#00a651"
                                        strokeWidth="10"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeDasharray="301"
                                        strokeDashoffset={`${301 - (301 * animatedPercentage) / 100}`}
                                    />
                                </svg>

                                {/* CENTER */}

                                <div className="absolute inset-0 flex flex-col items-center justify-center">

                                    <h2 className="text-[11px] leading-none font-bold text-[#0f172a]">
                                        {animatedPercentage.toFixed(2)}%
                                    </h2>

                                    <p className="text-[10px] text-[#64748b] mt-1">
                                        Paid
                                    </p>
                                </div>
                            </div>

                            {/* LEGEND */}

                            <div className="flex-1 space-y-1">

                                {/* PAID */}

                                <div className="flex items-start gap-2">

                                    <div className="w-3 h-3 rounded-full bg-[#00a651] mt-1"></div>

                                    <div>
                                        <p className="text-[11px] font-medium text-[#64748b]">
                                            Paid Amount
                                        </p>

                                        <h4 className="text-[11px] font-bold text-[#0f172a] mt-0.5">
                                            ₹ {totalPaid.toLocaleString()}
                                        </h4>
                                    </div>
                                </div>

                                {/* PENDING */}

                                <div className="flex items-start gap-2">

                                    <div className="w-3 h-3 rounded-full bg-[#2563eb] mt-1"></div>

                                    <div>
                                        <p className="text-[11px] font-medium text-[#64748b]">
                                            Pending Amount
                                        </p>

                                        <h4 className="text-[12px] font-bold text-[#0f172a] mt-0.5">
                                            ₹ {totalBalance.toLocaleString()}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* TOTAL */}

                        <div className="mt-2 bg-[#f6f8fc] rounded-[8px] px-5 py-2 flex items-center justify-between">

                            <span className="text-[12px] font-medium text-[#64748b]">
                                Total Amount
                            </span>

                            <span className="text-[12px] leading-none font-bold text-[#0f172a]">
                                ₹ {totalPayable.toLocaleString()}
                            </span>
                        </div>

                        {/* DOWNLOAD */}

                        <button
                            onClick={handleDownloadStatement}
                            className="w-full h-[32px] rounded-[8px] border border-[#d9e2ec] hover:bg-[#f8fafc] transition-all bg-white text-[#2563eb] text-[12px] font-semibold mt-2 flex items-center justify-center gap-2"
                        >

                            <Download size={14} />

                            Download Statement
                        </button>
                    </div>

                    {/* QUICK ACTIONS */}

                    <div className="bg-white rounded-[8px] border border-[#edf0f7] px-4 py-2 shadow-sm">

                        <h3 className="text-[15px] font-bold text-[#0f172a] mb-1">
                            Quick Actions
                        </h3>

                        <div className="divide-y divide-[#eef2f7]">

                            <button onClick={handleDownloadAllInvoices} className="w-full flex items-center justify-between py-2 hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <Download size={14} />
                                    <span className="font-medium text-[12px]">
                                        Download All Invoices
                                    </span>
                                </div>

                                <ChevronRight size={14} />
                            </button>

                            <button onClick={handleDownloadAllReceipts} className="w-full flex items-center justify-between py-2 hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <Receipt size={14} />
                                    <span className="font-medium text-[12px]">
                                        Download All Receipts
                                    </span>
                                </div>

                                <ChevronRight size={14} />
                            </button>

                            <button onClick={() => setActiveTab('Payment')} className="w-full flex items-center justify-between py-2 hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <CreditCard size={14} />
                                    <span className="font-medium text-[12px]">
                                        View Payment History
                                    </span>
                                </div>

                                <ChevronRight size={14} />
                            </button>

                            <button onClick={() => navigate('/exhibitor-dashboard/ex-profile1')} className="w-full flex items-center justify-between py-2 hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <Edit2 size={14} />
                                    <span className="font-medium text-[12px]">
                                        Update Billing Details
                                    </span>
                                </div>

                                <ChevronRight size={14} />
                            </button>
                        </div>
                    </div>
                    {/* IMPORTANT NOTES */}

                    <div className="bg-[#fffdf7] rounded-[8px] border border-[#f4ead2] px-4 py-2 shadow-sm relative overflow-hidden">

                        {/* TOP RIGHT ICON */}

                        <div className="absolute top-5 right-5 opacity-30">

                            <svg
                                width="42"
                                height="42"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"
                                    stroke="#f4b400"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M13.73 21a2 2 0 01-3.46 0"
                                    stroke="#f4b400"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>

                        {/* TITLE */}

                        <h3 className="text-[16px] font-bold text-[#0f172a]">
                            Important Notes
                        </h3>

                        {/* NOTES */}

                        <div className="mt-2 space-y-2">

                            {/* NOTE 1 */}

                            <div className="flex items-start gap-2">

                                <div className="w-2 h-2 rounded-full bg-[#f59e0b] mt-1 shrink-0"></div>

                                <p className="text-[11px] leading-[15px] text-[#475569]">
                                    All invoices are inclusive of applicable taxes.
                                </p>
                            </div>

                            {/* NOTE 2 */}

                            <div className="flex items-start gap-2">

                                <div className="w-2 h-2 rounded-full bg-[#f59e0b] mt-1 shrink-0"></div>

                                <p className="text-[11px] leading-[15px] text-[#475569]">
                                    Please make payments before the due date to avoid late fees.
                                </p>
                            </div>

                            {/* NOTE 3 */}

                            <div className="flex items-start gap-2">

                                <div className="w-2 h-2 rounded-full bg-[#f59e0b] mt-1 shrink-0"></div>

                                <p className="text-[11px] leading-[15px] text-[#475569]">
                                    For any payment related queries, contact Accounts Department.
                                </p>
                            </div>
                        </div>

                        {/* CONTACT INFO */}

                        <div className="flex items-start gap-2 mt-1 pt-1 border-t border-[#f4ead2]">

                            <div className="flex items-start gap-2 mb-2">

                                {/* MAIL */}

                                <div className="w-4 h-4 rounded-xl bg-white border border-[#f4ead2] flex items-center justify-center">

                                    <svg
                                        width="10"
                                        height="10"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M4 4H20V20H4V4Z"
                                            stroke="#2563eb"
                                            strokeWidth="1.8"
                                        />

                                        <path
                                            d="M4 7L12 13L20 7"
                                            stroke="#2563eb"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>

                                <a
                                    href="mailto:accounts@ihwe.in"
                                    className="text-[11px] font-medium text-[#2563eb]"
                                >
                                    accounts@ihwe.in
                                </a>
                            </div>

                            <div className="flex items-start gap-1">

                                {/* PHONE */}

                                <div className="w-4 h-4 rounded-xl bg-white border border-[#f4ead2] flex items-center justify-center">

                                    <svg
                                        width="10"
                                        height="10"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M22 16.92V19.92C22 20.47 21.55 20.92 21 20.92C10.51 20.92 2 12.41 2 1.92C2 1.37 2.45 0.92 3 0.92H6C6.55 0.92 7 1.37 7 1.92V4.92C7 5.47 6.55 5.92 6 5.92H4.91C5.46 8.75 7.17 11.33 9.67 13.83C12.17 16.33 14.75 18.04 17.58 18.59V17.5C17.58 16.95 18.03 16.5 18.58 16.5H21C21.55 16.5 22 16.95 22 17.5V16.92Z"
                                            stroke="#2563eb"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>

                                <a
                                    href="tel:+918178612345"
                                    className="text-[11px] font-medium text-[#2563eb]"
                                >
                                    +91-9654900525
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
