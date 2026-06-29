import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import { API_URL } from '@/lib/api';

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
import ExhibitorInvoices from '../../components/dashboard/exhibitor/ExhibitorInvoices';
import { settingsApi } from '@/lib/api';

import {
    ArrowLeft,
    Calendar,
    CheckCircle2,
    Clock3,
    AlertCircle,
    Wallet,
    Receipt,
    Eye,
    Download,
    CreditCard,
    FileText,
    ChevronRight,
    Edit2,
} from 'lucide-react';

const PAGE_SIZE = 10;

const formatDate = (date: any) => {
    if (!date) return '—';
    const d = new Date(date);
    if (isNaN(d.getTime())) return '—';
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

export default function ExhibitorInvoicesPage() {
    const { data } = useExhibitorCtx();
    const navigate = useNavigate();

    const [settings, setSettings] = useState<any>(null);
    const [selectedReg, setSelectedReg] = useState<any>(null);
    const [viewingDoc, setViewingDoc] = useState<any>(null);

    const [documents, setDocuments] = useState<any[]>([]);
    const [paymentSummary, setPaymentSummary] = useState<any>(null);
    const [loadingData, setLoadingData] = useState(true);

    const [activeTab, setActiveTab] = useState('Invoices');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [page, setPage] = useState(1);

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

    useEffect(() => {
        settingsApi.get().then((s: any) => {
            if (s) setSettings(s);
        });
    }, []);

    const fetchAll = useCallback(async () => {
        if (!data?._id) return;
        setLoadingData(true);
        const token = localStorage.getItem('exhibitorToken');
        try {
            const [docsRes, summaryRes] = await Promise.all([
                fetch(`${API_URL}/exhibitor-auth/documents`, {
                    headers: { Authorization: `Bearer ${token}` },
                }),
                fetch(`${API_URL}/payment/summary/${data._id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                }),
            ]);
            const docsJson = await docsRes.json();
            const summaryJson = await summaryRes.json();
            if (docsJson.success) setDocuments(docsJson.data || []);
            if (summaryJson.success) setPaymentSummary(summaryJson.data);
        } catch (err) {
            console.error('Failed to load invoices/payments data', err);
        } finally {
            setLoadingData(false);
        }
    }, [data?._id]);

    useEffect(() => {
        fetchAll();
    }, [fetchAll]);

    useEffect(() => {
        setPage(1);
        setStatusFilter('All Status');
    }, [activeTab]);

    const finance = paymentSummary?.finance || {};
    const totalPayable = finance.netPayable || 0;
    const totalPaid = finance.amountPaid || 0;
    const totalBalance = finance.balanceAmount || 0;
    const isOverdue = totalBalance > 0 && paymentSummary?.paymentDueDate && new Date(paymentSummary.paymentDueDate) < new Date();
    const overdueAmount = isOverdue ? totalBalance : 0;

    const paymentPercentage =
        totalPayable > 0
            ? ((totalPaid / totalPayable) * 100).toFixed(2)
            : '0';

    const animatedPercentage = useCountUp(Number(paymentPercentage), 2500, statsVisible);
    const pendingPercentage = Math.max(0, 100 - Number(paymentPercentage));
    const circumference = 301;
    const paidDash = (circumference * Number(paymentPercentage)) / 100;
    const pendingDash = (circumference * pendingPercentage) / 100;

    const tabs = [
        'Invoices',
        'Payments',
        'Receipts',
        'Credit Notes',
        'Agreements',
    ];

    // Real installment/full-payment schedule, derived the same way as the admin
    // account-overview controller: use the actual installments array when a plan
    // was chosen, otherwise a single lump-sum row (installments is intentionally []
    // for full-payment registrations, not missing data).
    const scheduleRows = useMemo(() => {
        if (!paymentSummary) return [];
        if (paymentSummary.installments?.length > 0) {
            return paymentSummary.installments.map((inst: any, idx: number) => ({
                id: inst.installmentNumber || idx + 1,
                scheduleType: inst.label || `Installment ${inst.installmentNumber || idx + 1}`,
                dueDate: formatDate(inst.dueDate),
                dueAmount: inst.dueAmount || 0,
                paidAmount: inst.paidAmount || 0,
                status: inst.status ? inst.status.charAt(0).toUpperCase() + inst.status.slice(1) : 'Pending',
            }));
        }
        if (totalPayable > 0) {
            return [{
                id: 1,
                scheduleType: paymentSummary.paymentPlanLabel || 'Full Payment',
                dueDate: formatDate(paymentSummary.paymentDueDate),
                dueAmount: totalPayable,
                paidAmount: totalPaid,
                status: totalPaid >= totalPayable ? 'Paid' : 'Pending',
            }];
        }
        return [];
    }, [paymentSummary, totalPayable, totalPaid]);

    const receiptRows = useMemo(() => {
        const history = paymentSummary?.paymentHistory || [];
        return [...history].reverse().map((h: any, idx: number) => ({
            id: h.transactionId || h.razorpayPaymentId || `receipt-${idx}`,
            date: formatDate(h.paidAt),
            amount: h.amount || 0,
            mode: h.method || h.paymentMode || '—',
            receiptUrl: h.receiptPdfUrl || '',
        }));
    }, [paymentSummary]);

    const invoiceRows = useMemo(
        () => documents.filter((d) => d.documentType === 'Invoice' || d.documentType === 'Proforma Invoice'),
        [documents]
    );
    const noteRows = useMemo(
        () => documents.filter((d) => d.documentType === 'Credit Note' || d.documentType === 'Debit Note'),
        [documents]
    );

    const currentRows: any[] = activeTab === 'Invoices' ? invoiceRows
        : activeTab === 'Credit Notes' ? noteRows
        : [];

    const availableStatuses = useMemo(() => {
        if (activeTab === 'Invoices' || activeTab === 'Credit Notes') {
            return Array.from(new Set(currentRows.map((r) => r.status))).filter(Boolean);
        }
        return [];
    }, [activeTab, currentRows]);

    const filteredRows = useMemo(() => {
        if (statusFilter === 'All Status') return currentRows;
        return currentRows.filter((r) => r.status === statusFilter);
    }, [currentRows, statusFilter]);

    const pagedRows = useMemo(() => {
        const start = (page - 1) * PAGE_SIZE;
        return filteredRows.slice(start, start + PAGE_SIZE);
    }, [filteredRows, page]);

    const totalPages = Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE));

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Paid':
                return (
                    <span className="px-3 py-1 rounded-lg bg-[#e8f8ee] text-[#16a34a] text-[12px] font-semibold">
                        Paid
                    </span>
                );
            case 'Partial':
            case 'advance-paid':
                return (
                    <span className="px-3 py-1 rounded-lg bg-[#eff6ff] text-[#2563eb] text-[12px] font-semibold">
                        Partially Paid
                    </span>
                );
            case 'Sent':
                return (
                    <span className="px-3 py-1 rounded-lg bg-[#eff6ff] text-[#2563eb] text-[12px] font-semibold">
                        Sent
                    </span>
                );
            case 'Generated':
                return (
                    <span className="px-3 py-1 rounded-lg bg-[#f3e8ff] text-[#7e22ce] text-[12px] font-semibold">
                        Generated
                    </span>
                );
            default:
                return (
                    <span className="px-3 py-1 rounded-lg bg-[#fff7ed] text-[#f59e0b] text-[12px] font-semibold">
                        {status || 'Pending'}
                    </span>
                );
        }
    };

    const renderModal = () => {
        if (!selectedReg) return null;
        const isUSD = selectedReg.participation?.currency === 'USD';
        const cur = isUSD ? 'USD ' : 'INR ';
        const paid = selectedReg.amountPaid || 0;
        const total = selectedReg.financeBreakdown?.netPayable || selectedReg.participation?.total || 0;
        const balance = selectedReg.balanceAmount || 0;
        const paidPct = total > 0 ? Math.min(100, Math.round((paid / total) * 100)) : 0;
        const regDate = selectedReg.createdAt ? new Date(selectedReg.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }) : '';

        return (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                <div className="bg-[#f5f7fb] rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto relative flex flex-col">
                    <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white border-b border-gray-200">
                        <div className="text-[14px] text-[#64748b] font-medium">
                            Your Proforma Invoice
                        </div>
                        <button
                            onClick={() => setSelectedReg(null)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                        >
                            ✕
                        </button>
                    </div>
                    <div className="p-6">
                        <ExhibitorInvoices
                            data={selectedReg}
                            settings={settings}
                            cur={cur}
                            total={total}
                            paid={paid}
                            balance={balance}
                            paidPct={paidPct}
                            regDate={regDate}
                        />
                    </div>
                </div>
            </div>
        );
    };

    const renderDocModal = () => {
        if (!viewingDoc) return null;
        return (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
                    <div className="flex items-center justify-between p-4 border-b border-gray-100">
                        <h3 className="text-[15px] font-bold text-[#0f172a]">{viewingDoc.documentType} Details</h3>
                        <button onClick={() => setViewingDoc(null)} className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600">✕</button>
                    </div>
                    <div className="p-4 space-y-2.5 text-[13px]">
                        <div className="flex justify-between"><span className="text-[#64748b]">Document No.</span><span className="font-semibold text-[#0f172a]">{viewingDoc.documentNo}</span></div>
                        <div className="flex justify-between"><span className="text-[#64748b]">Date</span><span className="font-medium text-[#0f172a]">{formatDate(viewingDoc.date)}</span></div>
                        <div className="flex justify-between"><span className="text-[#64748b]">Amount</span><span className="font-semibold text-[#0f172a]">₹ {(viewingDoc.amount || 0).toLocaleString('en-IN')}</span></div>
                        <div className="flex justify-between items-center"><span className="text-[#64748b]">Status</span>{getStatusBadge(viewingDoc.status)}</div>
                        {viewingDoc.attachmentUrl && (
                            <a href={viewingDoc.attachmentUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 mt-2 px-4 py-2 rounded-lg bg-[#00a651] text-white text-[12px] font-semibold">
                                <Download size={14} /> Download Attachment
                            </a>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const handleViewDoc = (doc: any) => {
        if (doc.documentType === 'Proforma Invoice' && data) {
            setSelectedReg(data);
        } else {
            setViewingDoc(doc);
        }
    };

    const handleDownloadAllReceipts = () => {
        if (receiptRows.length === 0) return;
        receiptRows.forEach((r) => {
            if (r.receiptUrl) window.open(r.receiptUrl, '_blank');
        });
    };

    if (loadingData && !paymentSummary) {
        return (
            <div className="min-h-screen bg-[#f5f7fb] flex items-center justify-center">
                <p className="text-[#64748b] text-sm">Loading your invoices & payments...</p>
            </div>
        );
    }

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
                        <div className="flex items-center gap-2.5 bg-white rounded-lg px-3 py-2.5" style={{ boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' }}>
                            <div className="bg-emerald-50 p-2 rounded-full shrink-0">
                                <Wallet size={16} className="text-emerald-500" />
                            </div>
                            <div>
                                <p className="text-[9px] text-[#1A1953] font-bold uppercase tracking-wider whitespace-nowrap">Total Amount</p>
                                <p className="text-[15px] font-extrabold text-emerald-600 leading-tight">₹ <CounterNumber end={totalPayable} started={statsVisible} delay={0} /></p>
                                <p className="text-[9px] text-black font-medium whitespace-nowrap">Incl. Taxes</p>
                            </div>
                        </div>

                        {/* CARD 2 */}
                        <div className="flex items-center gap-2.5 bg-white rounded-lg px-3 py-2.5" style={{ boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' }}>
                            <div className="bg-blue-50 p-2 rounded-full shrink-0">
                                <CheckCircle2 size={16} className="text-blue-500" />
                            </div>
                            <div>
                                <p className="text-[9px] text-[#1A1953] font-bold uppercase tracking-wider whitespace-nowrap">Amount Paid</p>
                                <p className="text-[15px] font-extrabold text-blue-600 leading-tight">₹ <CounterNumber end={totalPaid} started={statsVisible} delay={100} /></p>
                                <p className="text-[9px] text-black font-medium whitespace-nowrap">Paid till date</p>
                            </div>
                        </div>

                        {/* CARD 3 */}
                        <div className="flex items-center gap-2.5 bg-white rounded-lg px-3 py-2.5" style={{ boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' }}>
                            <div className="bg-amber-50 p-2 rounded-full shrink-0">
                                <Clock3 size={16} className="text-amber-500" />
                            </div>
                            <div>
                                <p className="text-[9px] text-[#1A1953] font-bold uppercase tracking-wider whitespace-nowrap">Pending Amount</p>
                                <p className="text-[15px] font-extrabold text-amber-500 leading-tight">₹ <CounterNumber end={totalBalance} started={statsVisible} delay={200} /></p>
                                <p className="text-[9px] text-black font-medium whitespace-nowrap">Due amount</p>
                            </div>
                        </div>

                        {/* CARD 4 */}
                        <div className="flex items-center gap-2.5 bg-white rounded-lg px-3 py-2.5" style={{ boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' }}>
                            <div className="bg-red-50 p-2 rounded-full shrink-0">
                                <AlertCircle size={16} className="text-red-500" />
                            </div>
                            <div>
                                <p className="text-[9px] text-[#1A1953] font-bold uppercase tracking-wider whitespace-nowrap">Overdue Amount</p>
                                <p className="text-[15px] font-extrabold text-red-500 leading-tight">₹ <CounterNumber end={overdueAmount} started={statsVisible} delay={300} /></p>
                                <p className="text-[9px] text-black font-medium whitespace-nowrap">{isOverdue ? 'Past due date' : 'No overdue'}</p>
                            </div>
                        </div>
                    </div>


                    {/* MAIN CARD */}

                    <div className="bg-white rounded-[8px] border border-[#edf0f7] shadow-sm overflow-hidden">

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
                                    {activeTab}
                                </h2>
                            </div>

                            {(activeTab === 'Invoices' || activeTab === 'Credit Notes') && (
                                <div className="flex items-center gap-3">
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                                        className="h-8 px-4 rounded-sm border border-[#e2e8f0] bg-white text-[13px] text-[#64748b] outline-none"
                                    >
                                        <option>All Status</option>
                                        {availableStatuses.map((s) => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                            )}
                        </div>

                        {/* TABLE */}

                        {activeTab === 'Invoices' && (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-[#f8fafc]">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-[13px] font-semibold text-[#64748b]">Document No.</th>
                                            <th className="px-4 py-2 text-left text-[13px] font-semibold text-[#64748b]">Type</th>
                                            <th className="px-4 py-2 text-left text-[13px] font-semibold text-[#64748b]">Date</th>
                                            <th className="px-4 py-2 text-right text-[13px] font-semibold text-[#64748b]">Amount</th>
                                            <th className="px-4 py-2 text-center text-[13px] font-semibold text-[#64748b]">Status</th>
                                            <th className="px-4 py-2 text-center text-[13px] font-semibold text-[#64748b]">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pagedRows.length === 0 && (
                                            <tr><td colSpan={6} className="px-4 py-8 text-center text-[13px] text-[#94a3b8]">No invoices found yet.</td></tr>
                                        )}
                                        {pagedRows.map((doc, idx) => (
                                            <tr key={idx} className="border-t border-[#eef2f7] hover:bg-[#fafcff]">
                                                <td className="px-4 py-2.5 text-[12px] font-semibold text-[#2563eb]">
                                                    <button onClick={() => handleViewDoc(doc)} className="hover:underline text-left">{doc.documentNo}</button>
                                                </td>
                                                <td className="px-4 py-2.5 text-[12px] text-[#0f172a]">{doc.documentType}</td>
                                                <td className="px-4 py-2.5 text-[12px] text-[#0f172a]">{formatDate(doc.date)}</td>
                                                <td className="px-4 py-2.5 text-right text-[12px] font-semibold text-[#0f172a]">₹ {(doc.amount || 0).toLocaleString('en-IN')}</td>
                                                <td className="px-2 text-center">{getStatusBadge(doc.status)}</td>
                                                <td className="px-2">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button onClick={() => handleViewDoc(doc)} className="w-8 h-6 rounded-xl border border-[#e2e8f0] flex items-center justify-center">
                                                            <Eye size={14} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {activeTab === 'Payments' && (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-[#f8fafc]">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-[13px] font-semibold text-[#64748b]">#</th>
                                            <th className="px-4 py-2 text-left text-[13px] font-semibold text-[#64748b]">Schedule Type</th>
                                            <th className="px-4 py-2 text-left text-[13px] font-semibold text-[#64748b]">Due Date</th>
                                            <th className="px-4 py-2 text-right text-[13px] font-semibold text-[#64748b]">Due Amount</th>
                                            <th className="px-4 py-2 text-right text-[13px] font-semibold text-[#64748b]">Paid</th>
                                            <th className="px-4 py-2 text-center text-[13px] font-semibold text-[#64748b]">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {scheduleRows.length === 0 && (
                                            <tr><td colSpan={6} className="px-4 py-8 text-center text-[13px] text-[#94a3b8]">No payment schedule yet.</td></tr>
                                        )}
                                        {scheduleRows.map((row: any) => (
                                            <tr key={row.id} className="border-t border-[#eef2f7] hover:bg-[#fafcff]">
                                                <td className="px-4 py-2.5 text-[12px] text-[#94a3b8] font-semibold">{row.id}</td>
                                                <td className="px-4 py-2.5 text-[12px] font-medium text-[#0f172a]">{row.scheduleType}</td>
                                                <td className="px-4 py-2.5 text-[12px] text-[#0f172a]">{row.dueDate}</td>
                                                <td className="px-4 py-2.5 text-right text-[12px] font-semibold text-[#0f172a]">₹ {row.dueAmount.toLocaleString('en-IN')}</td>
                                                <td className="px-4 py-2.5 text-right text-[12px] text-[#0f172a]">₹ {row.paidAmount.toLocaleString('en-IN')}</td>
                                                <td className="px-2 text-center">{getStatusBadge(row.status)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {activeTab === 'Receipts' && (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-[#f8fafc]">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-[13px] font-semibold text-[#64748b]">Transaction Ref.</th>
                                            <th className="px-4 py-2 text-left text-[13px] font-semibold text-[#64748b]">Date</th>
                                            <th className="px-4 py-2 text-right text-[13px] font-semibold text-[#64748b]">Amount</th>
                                            <th className="px-4 py-2 text-center text-[13px] font-semibold text-[#64748b]">Payment Mode</th>
                                            <th className="px-4 py-2 text-center text-[13px] font-semibold text-[#64748b]">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {receiptRows.length === 0 && (
                                            <tr><td colSpan={5} className="px-4 py-8 text-center text-[13px] text-[#94a3b8]">No payments received yet.</td></tr>
                                        )}
                                        {receiptRows.map((r) => (
                                            <tr key={r.id} className="border-t border-[#eef2f7] hover:bg-[#fafcff]">
                                                <td className="px-4 py-2.5 text-[12px] font-semibold text-[#2563eb]">{r.id}</td>
                                                <td className="px-4 py-2.5 text-[12px] text-[#0f172a]">{r.date}</td>
                                                <td className="px-4 py-2.5 text-right text-[12px] font-semibold text-[#0f172a]">₹ {r.amount.toLocaleString('en-IN')}</td>
                                                <td className="px-4 py-2.5 text-[12px] text-center text-[#0f172a]">{r.mode}</td>
                                                <td className="px-2">
                                                    <div className="flex items-center justify-center">
                                                        {r.receiptUrl ? (
                                                            <a href={r.receiptUrl} target="_blank" rel="noreferrer" className="w-8 h-6 rounded-xl border border-[#e2e8f0] flex items-center justify-center">
                                                                <Download size={14} />
                                                            </a>
                                                        ) : (
                                                            <span className="text-[11px] text-[#cbd5e1]">No PDF</span>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {activeTab === 'Credit Notes' && (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-[#f8fafc]">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-[13px] font-semibold text-[#64748b]">Document No.</th>
                                            <th className="px-4 py-2 text-left text-[13px] font-semibold text-[#64748b]">Type</th>
                                            <th className="px-4 py-2 text-left text-[13px] font-semibold text-[#64748b]">Date</th>
                                            <th className="px-4 py-2 text-right text-[13px] font-semibold text-[#64748b]">Amount</th>
                                            <th className="px-4 py-2 text-center text-[13px] font-semibold text-[#64748b]">Status</th>
                                            <th className="px-4 py-2 text-center text-[13px] font-semibold text-[#64748b]">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pagedRows.length === 0 && (
                                            <tr><td colSpan={6} className="px-4 py-8 text-center text-[13px] text-[#94a3b8]">No credit or debit notes yet.</td></tr>
                                        )}
                                        {pagedRows.map((doc, idx) => (
                                            <tr key={idx} className="border-t border-[#eef2f7] hover:bg-[#fafcff]">
                                                <td className="px-4 py-2.5 text-[12px] font-semibold text-[#2563eb]">
                                                    <button onClick={() => setViewingDoc(doc)} className="hover:underline text-left">{doc.documentNo}</button>
                                                </td>
                                                <td className="px-4 py-2.5 text-[12px] text-[#0f172a]">{doc.documentType}</td>
                                                <td className="px-4 py-2.5 text-[12px] text-[#0f172a]">{formatDate(doc.date)}</td>
                                                <td className="px-4 py-2.5 text-right text-[12px] font-semibold text-[#0f172a]">₹ {(doc.amount || 0).toLocaleString('en-IN')}</td>
                                                <td className="px-2 text-center">{getStatusBadge(doc.status)}</td>
                                                <td className="px-2">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button onClick={() => setViewingDoc(doc)} className="w-8 h-6 rounded-xl border border-[#e2e8f0] flex items-center justify-center">
                                                            <Eye size={14} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {activeTab === 'Agreements' && (
                            <div className="px-4 py-12 text-center">
                                <p className="text-[13px] text-[#94a3b8]">Agreements are not available yet. Coming soon.</p>
                            </div>
                        )}

                        {/* TABLE FOOTER */}

                        {(activeTab === 'Invoices' || activeTab === 'Credit Notes') && (
                            <div className="flex items-center justify-between px-4 py-2 border-t border-[#eef2f7]">

                                <p className="text-[12px] text-[#64748b]">
                                    {filteredRows.length === 0
                                        ? 'Showing 0 entries'
                                        : `Showing ${(page - 1) * PAGE_SIZE + 1} to ${Math.min(page * PAGE_SIZE, filteredRows.length)} of ${filteredRows.length} entries`}
                                </p>

                                <div className="flex items-center gap-2">

                                    <button
                                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                                        disabled={page <= 1}
                                        className="w-8 h-8 rounded-[10px] border border-[#dbe4ee] bg-white flex items-center justify-center text-[#64748b] hover:bg-[#f8fafc] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>

                                    <button className="w-8 h-8 rounded-[10px] bg-[#00a651] text-white font-semibold text-[12px] shadow-sm">
                                        {page}
                                    </button>

                                    <button
                                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                        disabled={page >= totalPages}
                                        className="w-8 h-8 rounded-[10px] border border-[#dbe4ee] bg-white flex items-center justify-center text-[#64748b] hover:bg-[#f8fafc] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT SIDEBAR */}

                <div className="xl:col-span-3 space-y-3">

                    {/* PAYMENT SUMMARY */}

                    <div className="bg-white rounded-[8px] border border-[#edf0f7] px-4 py-2 shadow-sm">

                        <div className="flex items-start justify-between">
                            <h3 className="text-[16px] font-bold text-[#0f172a]">
                                Payment Summary
                            </h3>
                        </div>

                        {/* CHART SECTION */}

                        <div className="mt-2 flex items-center justify-between gap-4">

                            <div className="relative w-[85px] h-[85px] shrink-0">

                                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">

                                    <circle cx="60" cy="60" r="48" stroke="#e9eef5" strokeWidth="10" fill="none" />

                                    <circle
                                        cx="60" cy="60" r="48"
                                        stroke="#00a651" strokeWidth="10" fill="none" strokeLinecap="round"
                                        strokeDasharray={`${circumference}`}
                                        strokeDashoffset={`${circumference - (circumference * animatedPercentage) / 100}`}
                                    />

                                    {pendingDash > 0 && (
                                        <circle
                                            cx="60" cy="60" r="48"
                                            stroke="#2563eb" strokeWidth="10" fill="none" strokeLinecap="round"
                                            strokeDasharray={`${pendingDash} ${circumference}`}
                                            strokeDashoffset={`${-paidDash}`}
                                        />
                                    )}
                                </svg>

                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <h2 className="text-[11px] leading-none font-bold text-[#0f172a]">
                                        {animatedPercentage.toFixed(2)}%
                                    </h2>
                                    <p className="text-[10px] text-[#64748b] mt-1">Paid</p>
                                </div>
                            </div>

                            <div className="flex-1 space-y-1">

                                <div className="flex items-start gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#00a651] mt-1"></div>
                                    <div>
                                        <p className="text-[11px] font-medium text-[#64748b]">Paid Amount</p>
                                        <h4 className="text-[11px] font-bold text-[#0f172a] mt-0.5">₹ {totalPaid.toLocaleString()}</h4>
                                    </div>
                                </div>

                                <div className="flex items-start gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#2563eb] mt-1"></div>
                                    <div>
                                        <p className="text-[11px] font-medium text-[#64748b]">Pending Amount</p>
                                        <h4 className="text-[12px] font-bold text-[#0f172a] mt-0.5">₹ {totalBalance.toLocaleString()}</h4>
                                    </div>
                                </div>

                                <div className="flex items-start gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#d1d5db] mt-1"></div>
                                    <div>
                                        <p className="text-[11px] font-medium text-[#64748b]">Overdue Amount</p>
                                        <h4 className="text-[12px] font-bold text-[#0f172a] mt-0.5">₹ {overdueAmount.toLocaleString()}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-2 bg-[#f6f8fc] rounded-[8px] px-5 py-2 flex items-center justify-between">
                            <span className="text-[12px] font-medium text-[#64748b]">Total Amount</span>
                            <span className="text-[12px] leading-none font-bold text-[#0f172a]">₹ {totalPayable.toLocaleString()}</span>
                        </div>

                        <button
                            onClick={() => navigate('/exhibitor-dashboard/payments')}
                            disabled={totalBalance <= 0}
                            className="w-full h-[32px] rounded-[8px] bg-[#00a651] hover:bg-[#00914a] transition-all text-white text-[12px] font-semibold mt-2 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <CreditCard size={14} />
                            Pay Now
                        </button>

                        <button
                            onClick={() => data && setSelectedReg(data)}
                            className="w-full h-[32px] rounded-[8px] border border-[#d9e2ec] hover:bg-[#f8fafc] transition-all bg-white text-[#2563eb] text-[12px] font-semibold mt-2 flex items-center justify-center gap-2"
                        >
                            <Download size={14} />
                            View / Print Invoice
                        </button>
                    </div>

                    {/* QUICK ACTIONS */}

                    <div className="bg-white rounded-[8px] border border-[#edf0f7] px-4 py-2 shadow-sm">

                        <h3 className="text-[15px] font-bold text-[#0f172a] mb-1">
                            Quick Actions
                        </h3>

                        <div className="divide-y divide-[#eef2f7]">

                            <button
                                onClick={() => data && setSelectedReg(data)}
                                className="w-full flex items-center justify-between py-2"
                            >
                                <div className="flex items-center gap-3">
                                    <Download size={14} />
                                    <span className="font-medium text-[12px]">View / Print Invoice</span>
                                </div>
                                <ChevronRight size={14} />
                            </button>

                            <button
                                onClick={handleDownloadAllReceipts}
                                disabled={receiptRows.length === 0}
                                className="w-full flex items-center justify-between py-2 disabled:opacity-40"
                            >
                                <div className="flex items-center gap-3">
                                    <Receipt size={14} />
                                    <span className="font-medium text-[12px]">Download All Receipts</span>
                                </div>
                                <ChevronRight size={14} />
                            </button>

                            <button
                                onClick={() => setActiveTab('Payments')}
                                className="w-full flex items-center justify-between py-2"
                            >
                                <div className="flex items-center gap-3">
                                    <CreditCard size={14} />
                                    <span className="font-medium text-[12px]">View Payment History</span>
                                </div>
                                <ChevronRight size={14} />
                            </button>
                            <button
                                onClick={() => navigate('/exhibitor-dashboard/profile')}
                                className="w-full flex items-center justify-between py-2"
                            >
                                <div className="flex items-center gap-3">
                                    <Edit2 size={14} />
                                    <span className="font-medium text-[12px]">Update Billing Details</span>
                                </div>
                                <ChevronRight size={14} />
                            </button>
                        </div>
                    </div>
                    {/* IMPORTANT NOTES */}

                    <div className="bg-[#fffdf7] rounded-[8px] border border-[#f4ead2] px-4 py-2 shadow-sm relative overflow-hidden">

                        <div className="absolute top-5 right-5 opacity-30">
                            <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
                                <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" stroke="#f4b400" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M13.73 21a2 2 0 01-3.46 0" stroke="#f4b400" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>

                        <h3 className="text-[16px] font-bold text-[#0f172a]">Important Notes</h3>

                        <div className="mt-2 space-y-2">
                            <div className="flex items-start gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#f59e0b] mt-1 shrink-0"></div>
                                <p className="text-[11px] leading-[15px] text-[#475569]">All invoices are inclusive of applicable taxes.</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#f59e0b] mt-1 shrink-0"></div>
                                <p className="text-[11px] leading-[15px] text-[#475569]">Please make payments before the due date to avoid late fees.</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#f59e0b] mt-1 shrink-0"></div>
                                <p className="text-[11px] leading-[15px] text-[#475569]">For any payment related queries, contact Accounts Department.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-2 mt-1 pt-1 border-t border-[#f4ead2]">
                            <div className="flex items-start gap-2 mb-2">
                                <div className="w-4 h-4 rounded-xl bg-white border border-[#f4ead2] flex items-center justify-center">
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                                        <path d="M4 4H20V20H4V4Z" stroke="#2563eb" strokeWidth="1.8" />
                                        <path d="M4 7L12 13L20 7" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <a href="mailto:accounts@ihwe.in" className="text-[11px] font-medium text-[#2563eb]">accounts@ihwe.in</a>
                            </div>

                            <div className="flex items-start gap-1">
                                <div className="w-4 h-4 rounded-xl bg-white border border-[#f4ead2] flex items-center justify-center">
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                                        <path d="M22 16.92V19.92C22 20.47 21.55 20.92 21 20.92C10.51 20.92 2 12.41 2 1.92C2 1.37 2.45 0.92 3 0.92H6C6.55 0.92 7 1.37 7 1.92V4.92C7 5.47 6.55 5.92 6 5.92H4.91C5.46 8.75 7.17 11.33 9.67 13.83C12.17 16.33 14.75 18.04 17.58 18.59V17.5C17.58 16.95 18.03 16.5 18.58 16.5H21C21.55 16.5 22 16.95 22 17.5V16.92Z" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <a href="tel:+918178612345" className="text-[11px] font-medium text-[#2563eb]">+91 81786 12345</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {renderModal()}
            {renderDocModal()}
        </div>
    );
}
