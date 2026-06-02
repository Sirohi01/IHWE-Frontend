import { useEffect, useState, useRef } from 'react';
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

export default function ExhibitorInvoicesPage() {
    const { data } = useExhibitorCtx();

    const [settings, setSettings] = useState<any>(null);
    const [selectedReg, setSelectedReg] = useState<any>(null);

    const [activeTab, setActiveTab] = useState('Invoices');

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

    const regs = data ? [data] : [];

    const totalPayable = regs.reduce(
        (sum: number, r: any) =>
            sum +
            (r.financeBreakdown?.netPayable ||
                r.participation?.total ||
                0),
        0
    );

    const totalPaid = regs.reduce(
        (sum: number, r: any) => sum + (r.amountPaid || 0),
        0
    );

    const totalBalance = regs.reduce(
        (sum: number, r: any) => sum + (r.balanceAmount || 0),
        0
    );

    const paymentPercentage =
        totalPayable > 0
            ? ((totalPaid / totalPayable) * 100).toFixed(2)
            : 0;

    const animatedPercentage = useCountUp(Number(paymentPercentage), 2500, statsVisible);

    const tabs = [
        'Invoices',
        'Payments',
        'Receipts',
        'Credit Notes',
        'Agreements',
    ];

    const getInvoiceNo = (reg: any) => {
        const seqNum = reg.registrationId
            ? reg.registrationId
                .split('-')
                .pop()
                ?.padStart(3, '0')
            : '001';

        const invoiceYear = new Date(
            reg.createdAt || Date.now()
        ).getFullYear();

        const nextYear = (invoiceYear + 1)
            .toString()
            .slice(-2);

        return `IHWE${invoiceYear}/INV/${seqNum}`;
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'paid':
                return (
                    <span className="px-3 py-1 rounded-lg bg-[#e8f8ee] text-[#16a34a] text-[12px] font-semibold">
                        Paid
                    </span>
                );

            case 'advance-paid':
                return (
                    <span className="px-3 py-1 rounded-lg bg-[#eff6ff] text-[#2563eb] text-[12px] font-semibold">
                        Partially Paid
                    </span>
                );

            default:
                return (
                    <span className="px-3 py-1 rounded-lg bg-[#fff7ed] text-[#f59e0b] text-[12px] font-semibold">
                        Pending
                    </span>
                );
        }
    };

    if (selectedReg) {
        const isUSD =
            selectedReg.participation?.currency === 'USD';

        const cur = isUSD ? 'USD ' : 'INR ';

        const paid = selectedReg.amountPaid || 0;

        const total =
            selectedReg.financeBreakdown?.netPayable ||
            selectedReg.participation?.total ||
            0;

        const balance = selectedReg.balanceAmount || 0;

        const paidPct =
            total > 0
                ? Math.min(
                    100,
                    Math.round((paid / total) * 100)
                )
                : 0;

        const regDate = selectedReg.createdAt
            ? new Date(
                selectedReg.createdAt
            ).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
            })
            : '';

        return (
            <div className="min-h-screen bg-[#f5f7fb] p-6">
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={() => setSelectedReg(null)}
                        className="h-11 px-5 rounded-xl bg-white border border-[#e6ebf2] text-[#0f172a] font-semibold flex items-center gap-2"
                    >
                        <ArrowLeft size={16} />
                        Back
                    </button>

                    <div className="text-[14px] text-[#64748b] font-medium">
                        Invoice :
                        <span className="text-[#0f172a] font-bold ml-2">
                            {getInvoiceNo(selectedReg)}
                        </span>
                    </div>
                </div>

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
                                <p className="text-[15px] font-extrabold text-red-500 leading-tight">₹ <CounterNumber end={0} started={statsVisible} delay={300} /></p>
                                <p className="text-[9px] text-black font-medium whitespace-nowrap">No overdue</p>
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
                                    Invoice List
                                </h2>
                            </div>

                            <div className="flex items-center gap-3">

                                <select className="h-8 px-4 rounded-sm border border-[#e2e8f0] bg-white text-[13px] text-[#64748b] outline-none">
                                    <option>All Status</option>
                                </select>

                                <button className="h-8 px-4 rounded-sm border border-[#e2e8f0] bg-white text-[13px] text-[#64748b] flex items-center gap-2">
                                    <Calendar size={16} />
                                    Select Date Range
                                </button>
                            </div>
                        </div>

                        {/* TABLE */}

                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead className="bg-[#f8fafc]">

                                    <tr>

                                        <th className="px-4 py-1 text-left text-[13px] font-semibold text-[#64748b]">
                                            Invoice No.
                                        </th>

                                        <th className="px-4 py-1 text-left text-[13px] font-semibold text-[#64748b]">
                                            Invoice Date
                                        </th>

                                        <th className="px-4 py-1 text-left text-[13px] font-semibold text-[#64748b]">
                                            Due Date
                                        </th>

                                        <th className="px-4 py-1 text-left text-[13px] font-semibold text-[#64748b]">
                                            Description
                                        </th>

                                        <th className="px-4 py-1 text-right text-[13px] font-semibold text-[#64748b]">
                                            Amount
                                        </th>

                                        <th className="px-4 py-2 text-center text-[13px] font-semibold text-[#64748b]">
                                            Status
                                        </th>

                                        <th className="px-4 py-2 text-center text-[13px] font-semibold text-[#64748b]">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {regs.map(
                                        (
                                            reg: any,
                                            idx: number
                                        ) => {
                                            const total =
                                                reg
                                                    .financeBreakdown
                                                    ?.netPayable ||
                                                0;

                                            return (
                                                <tr
                                                    key={idx}
                                                    className="border-t border-[#eef2f7] hover:bg-[#fafcff]"
                                                >

                                                    <td className="px-3 text-[12px] font-semibold text-[#2563eb]">
                                                        {getInvoiceNo(
                                                            reg
                                                        )}
                                                    </td>

                                                    <td className="px-3 text-[12px] text-[#0f172a]">
                                                        15 Jan 2026
                                                    </td>

                                                    <td className="px-3 text-[12px] text-[#0f172a]">
                                                        31 Jan 2026
                                                    </td>

                                                    <td className="px-3  text-[12px] text-[#0f172a]">
                                                        Stall Booking (
                                                        {
                                                            reg
                                                                .participation
                                                                ?.stallSize
                                                        }
                                                        m x
                                                        {
                                                            reg
                                                                .participation
                                                                ?.stallSize
                                                        }
                                                        m )
                                                    </td>

                                                    <td className="px-2 text-right text-[12px] font-semibold text-[#0f172a]">
                                                        ₹{' '}
                                                        {total.toLocaleString()}
                                                    </td>

                                                    <td className="px-2 text-center">
                                                        {getStatusBadge(
                                                            reg.status
                                                        )}
                                                    </td>

                                                    <td className="px-2">

                                                        <div className="flex items-center justify-center gap-2">

                                                            <button className="w-8 h-6 rounded-xl border border-[#e2e8f0] flex items-center justify-center">
                                                                <Download
                                                                    size={
                                                                        14
                                                                    }
                                                                />
                                                            </button>

                                                            <button
                                                                onClick={() =>
                                                                    setSelectedReg(
                                                                        reg
                                                                    )
                                                                }
                                                                className="w-8 h-6 rounded-xl border border-[#e2e8f0] flex items-center justify-center"
                                                            >
                                                                <Eye
                                                                    size={
                                                                        14
                                                                    }
                                                                />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    )}
                                    <tr
                                        className="border-t border-[#eef2f7] hover:bg-[#fafcff]"
                                    >

                                        <td className="px-3 text-[12px] font-semibold text-[#2563eb]">
                                            IHWE2026/INV/002
                                        </td>

                                        <td className="px-3 text-[12px] text-[#0f172a]">
                                            15 Jan 2026
                                        </td>

                                        <td className="px-3 text-[12px] text-[#0f172a]">
                                            31 Jan 2026
                                        </td>

                                        <td className="px-3  text-[12px] text-[#0f172a]">
                                            Stall Booking (
                                            3m x 3m )
                                        </td>

                                        <td className="px-2 text-right text-[12px] font-semibold text-[#0f172a]">
                                            ₹{' '}
                                            2,36,000
                                        </td>

                                        <td className="px-2 text-[12px] text-center">
                                            Paid
                                        </td>

                                        <td className="px-2">

                                            <div className="flex items-center justify-center gap-2">

                                                <button className="w-8 h-6 rounded-xl border border-[#e2e8f0] flex items-center justify-center">
                                                    <Download
                                                        size={
                                                            14
                                                        }
                                                    />
                                                </button>

                                                <button className="w-8 h-6 rounded-xl border border-[#e2e8f0] flex items-center justify-center"
                                                >
                                                    <Eye
                                                        size={
                                                            14
                                                        }
                                                    />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr
                                        className="border-t border-[#eef2f7] hover:bg-[#fafcff]"
                                    >

                                        <td className="px-3 text-[12px] font-semibold text-[#2563eb]">
                                            IHWE2026/INV/002
                                        </td>

                                        <td className="px-3 text-[12px] text-[#0f172a]">
                                            15 Jan 2026
                                        </td>

                                        <td className="px-3 text-[12px] text-[#0f172a]">
                                            31 Jan 2026
                                        </td>

                                        <td className="px-3  text-[12px] text-[#0f172a]">
                                            Stall Booking (
                                            3m x 3m )
                                        </td>

                                        <td className="px-2 text-right text-[12px] font-semibold text-[#0f172a]">
                                            ₹{' '}
                                            2,36,000
                                        </td>

                                        <td className="px-2 text-[12px] text-center">
                                            Paid
                                        </td>

                                        <td className="px-2">

                                            <div className="flex items-center justify-center gap-2">

                                                <button className="w-8 h-6 rounded-xl border border-[#e2e8f0] flex items-center justify-center">
                                                    <Download
                                                        size={
                                                            14
                                                        }
                                                    />
                                                </button>

                                                <button className="w-8 h-6 rounded-xl border border-[#e2e8f0] flex items-center justify-center"
                                                >
                                                    <Eye
                                                        size={
                                                            14
                                                        }
                                                    />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr
                                        className="border-t border-[#eef2f7] hover:bg-[#fafcff]"
                                    >

                                        <td className="px-3 text-[12px] font-semibold text-[#2563eb]">
                                            IHWE2026/INV/002
                                        </td>

                                        <td className="px-3 text-[12px] text-[#0f172a]">
                                            15 Jan 2026
                                        </td>

                                        <td className="px-3 text-[12px] text-[#0f172a]">
                                            31 Jan 2026
                                        </td>

                                        <td className="px-3  text-[12px] text-[#0f172a]">
                                            Stall Booking (
                                            3m x 3m )
                                        </td>

                                        <td className="px-2 text-right text-[12px] font-semibold text-[#0f172a]">
                                            ₹{' '}
                                            2,36,000
                                        </td>

                                        <td className="px-2 text-[12px] text-center">
                                            Paid
                                        </td>

                                        <td className="px-2">

                                            <div className="flex items-center justify-center gap-2">

                                                <button className="w-8 h-6 rounded-xl border border-[#e2e8f0] flex items-center justify-center">
                                                    <Download
                                                        size={
                                                            14
                                                        }
                                                    />
                                                </button>

                                                <button className="w-8 h-6 rounded-xl border border-[#e2e8f0] flex items-center justify-center"
                                                >
                                                    <Eye
                                                        size={
                                                            14
                                                        }
                                                    />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr
                                        className="border-t border-[#eef2f7] hover:bg-[#fafcff]"
                                    >

                                        <td className="px-3 text-[12px] font-semibold text-[#2563eb]">
                                            IHWE2026/INV/002
                                        </td>

                                        <td className="px-3 text-[12px] text-[#0f172a]">
                                            15 Jan 2026
                                        </td>

                                        <td className="px-3 text-[12px] text-[#0f172a]">
                                            31 Jan 2026
                                        </td>

                                        <td className="px-3  text-[12px] text-[#0f172a]">
                                            Stall Booking (
                                            3m x 3m )
                                        </td>

                                        <td className="px-2 text-right text-[12px] font-semibold text-[#0f172a]">
                                            ₹{' '}
                                            2,36,000
                                        </td>

                                        <td className="px-2 text-[12px] text-center">
                                            Paid
                                        </td>

                                        <td className="px-2">

                                            <div className="flex items-center justify-center gap-2">

                                                <button className="w-8 h-6 rounded-xl border border-[#e2e8f0] flex items-center justify-center">
                                                    <Download
                                                        size={
                                                            14
                                                        }
                                                    />
                                                </button>

                                                <button className="w-8 h-6 rounded-xl border border-[#e2e8f0] flex items-center justify-center"
                                                >
                                                    <Eye
                                                        size={
                                                            14
                                                        }
                                                    />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                            {/* TABLE FOOTER */}

                            <div className="flex items-center justify-between px-4 py-2 border-t border-[#eef2f7]">

                                {/* LEFT */}

                                <p className="text-[12px] text-[#64748b]">
                                    Showing 1 to 5 of 5 entries
                                </p>

                                {/* RIGHT PAGINATION */}

                                <div className="flex items-center gap-2">

                                    {/* PREV */}

                                    <button className="w-8 h-8 rounded-[10px] border border-[#dbe4ee] bg-white flex items-center justify-center text-[#64748b] hover:bg-[#f8fafc] transition-all">

                                        <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <path
                                                d="M15 18L9 12L15 6"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>

                                    {/* ACTIVE PAGE */}

                                    <button className="w-8 h-8 rounded-[10px] bg-[#00a651] text-white font-semibold text-[12px] shadow-sm">
                                        1
                                    </button>

                                    {/* NEXT */}

                                    <button className="w-8 h-8 rounded-[10px] border border-[#dbe4ee] bg-white flex items-center justify-center text-[#64748b] hover:bg-[#f8fafc] transition-all">

                                        <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <path
                                                d="M9 18L15 12L9 6"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className="bg-white rounded-[8px] border border-[#edf0f7] shadow-sm overflow-hidden">
                        <div className="px-4 py-2 border-b border-[#edf0f7] flex items-center justify-between">

                            <div>
                                <h2 className="text-[16px] font-bold text-[#0f172a]">
                                    Recent Receipts
                                </h2>
                            </div>

                        </div>

                        {/* TABLE */}

                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead className="bg-[#f8fafc]">

                                    <tr>

                                        <th className="px-4 py-1 text-left text-[13px] font-semibold text-[#64748b]">
                                            Receipt No.
                                        </th>

                                        <th className="px-4 py-1 text-left text-[13px] font-semibold text-[#64748b]">
                                            Receipt Date
                                        </th>

                                        <th className="px-4 py-1 text-left text-[13px] font-semibold text-[#64748b]">
                                            Against Invoice
                                        </th>



                                        <th className="px-4 py-1 text-right text-[13px] font-semibold text-[#64748b]">
                                            Amount
                                        </th>

                                        <th className="px-4 py-1 text-center text-[13px] font-semibold text-[#64748b]">
                                            Payment Mode
                                        </th>

                                        <th className="px-4 py-1 text-center text-[13px] font-semibold text-[#64748b]">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {regs.map(
                                        (
                                            reg: any,
                                            idx: number
                                        ) => {
                                            const total =
                                                reg
                                                    .financeBreakdown
                                                    ?.netPayable ||
                                                0;

                                            return (
                                                <tr
                                                    key={idx}
                                                    className="border-t border-[#eef2f7] hover:bg-[#fafcff]"
                                                >

                                                    <td className="px-3 text-[12px] font-semibold text-[#2563eb]">
                                                        IHWE2026/REC/001
                                                    </td>

                                                    <td className="px-3 text-[12px] text-[#0f172a]">
                                                        15 Jan 2026
                                                    </td>

                                                    <td className="px-3 text-[12px] text-[#0f172a]">
                                                        {getInvoiceNo(
                                                            reg
                                                        )}
                                                    </td>



                                                    <td className="px-2 text-right text-[12px] font-semibold text-[#0f172a]">
                                                        ₹{' '}
                                                        {total.toLocaleString()}
                                                    </td>

                                                    <td className="px-2 text-[12px] text-center">
                                                        Online (Razorpay)
                                                    </td>

                                                    <td className="px-2">

                                                        <div className="flex items-center justify-center gap-2">

                                                            <button className="w-8 h-6 rounded-xl border border-[#e2e8f0] flex items-center justify-center">
                                                                <Download
                                                                    size={
                                                                        14
                                                                    }
                                                                />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>

                                            );
                                        }
                                    )}
                                    <tr className="border-t border-[#eef2f7] hover:bg-[#fafcff]"
                                    >

                                        <td className="px-3 py-1 text-[12px] font-semibold text-[#2563eb]">
                                            IHWE2026/REC/001
                                        </td>

                                        <td className="px-3 py-1 text-[12px] text-[#0f172a]">
                                            15 Jan 2026
                                        </td>

                                        <td className="px-3 py-1 text-[12px] text-[#0f172a]">
                                            IHWE2026/INV/001
                                        </td>



                                        <td className="px-2  text-right text-[12px] font-semibold text-[#0f172a]">
                                            ₹{' '}
                                            2,36,000
                                        </td>

                                        <td className="px-2 text-[12px] text-center">
                                            Online (Razorpay)
                                        </td>

                                        <td className="px-2 py-1">

                                            <div className="flex items-center justify-center gap-2">

                                                <button className="w-8 h-6 rounded-xl border border-[#e2e8f0] flex items-center justify-center">
                                                    <Download
                                                        size={
                                                            14
                                                        }
                                                    />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            {/* TABLE FOOTER */}

                            <div className="flex items-center justify-between px-4 py-2 border-t border-[#eef2f7]">

                                {/* LEFT */}

                                <p className="text-[12px] text-[#64748b]">
                                    Showing 1 to 5 of 5 entries
                                </p>

                                {/* RIGHT PAGINATION */}

                                <div className="flex items-center gap-2">

                                    {/* PREV */}

                                    <button className="w-9 h-9 rounded-[10px] border border-[#dbe4ee] bg-white flex items-center justify-center text-[#64748b] hover:bg-[#f8fafc] transition-all">

                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <path
                                                d="M15 18L9 12L15 6"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>

                                    {/* ACTIVE PAGE */}

                                    <button className="w-8 h-8 rounded-[10px] bg-[#00a651] text-white font-semibold text-[12px] shadow-sm">
                                        1
                                    </button>

                                    {/* NEXT */}

                                    <button className="w-9 h-9 rounded-[10px] border border-[#dbe4ee] bg-white flex items-center justify-center text-[#64748b] hover:bg-[#f8fafc] transition-all">

                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <path
                                                d="M9 18L15 12L9 6"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>
                                </div>
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

                            <button className="text-[#94a3b8] hover:text-[#0f172a]">
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <circle
                                        cx="12"
                                        cy="5"
                                        r="1.5"
                                        fill="currentColor"
                                    />
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="1.5"
                                        fill="currentColor"
                                    />
                                    <circle
                                        cx="12"
                                        cy="19"
                                        r="1.5"
                                        fill="currentColor"
                                    />
                                </svg>
                            </button>
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

                                    {/* BLUE */}

                                    <circle
                                        cx="60"
                                        cy="60"
                                        r="48"
                                        stroke="#2563eb"
                                        strokeWidth="10"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeDasharray="60 301"
                                        strokeDashoffset="-170"
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

                                {/* OVERDUE */}

                                <div className="flex items-start gap-2">

                                    <div className="w-3 h-3 rounded-full bg-[#d1d5db] mt-1"></div>

                                    <div>
                                        <p className="text-[11px] font-medium text-[#64748b]">
                                            Overdue Amount
                                        </p>

                                        <h4 className="text-[12px] font-bold text-[#0f172a] mt-0.5">
                                            ₹ 0
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

                        {/* PAY BUTTON */}

                        <button className="w-full h-[32px] rounded-[8px] bg-[#00a651] hover:bg-[#00914a] transition-all text-white text-[12px] font-semibold mt-2 flex items-center justify-center gap-2">

                            <CreditCard size={14} />

                            Pay Now
                        </button>

                        {/* DOWNLOAD */}

                        <button className="w-full h-[32px] rounded-[8px] border border-[#d9e2ec] hover:bg-[#f8fafc] transition-all bg-white text-[#2563eb] text-[12px] font-semibold mt-2 flex items-center justify-center gap-2">

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

                            <button className="w-full flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Download size={14} />
                                    <span className="font-medium text-[12px]">
                                        Download All Invoices
                                    </span>
                                </div>

                                <ChevronRight size={14} />
                            </button>

                            <button className="w-full flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Receipt size={14} />
                                    <span className="font-medium text-[12px]">
                                        Download All Receipts
                                    </span>
                                </div>

                                <ChevronRight size={14} />
                            </button>

                            <button className="w-full flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <CreditCard size={14} />
                                    <span className="font-medium text-[12px]">
                                        View Payment History
                                    </span>
                                </div>

                                <ChevronRight size={14} />
                            </button>
                            <button className="w-full flex items-center justify-between">
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
                                    +91 81786 12345
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
