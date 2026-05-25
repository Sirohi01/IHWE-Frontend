import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import ExhibitorInvoices from '../../components/dashboard/exhibitor/ExhibitorInvoices';
import { settingsApi } from '@/lib/api';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Calendar, Wallet, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import DashboardHero from '@/components/dashboard/DashboardHero';

export default function ExhibitorInvoicesPage() {
    const { data, allRegistrations } = useExhibitorCtx();
    const navigate = useNavigate();
    const [settings, setSettings] = useState<any>(null);
    const [selectedReg, setSelectedReg] = useState<any>(null);

    useEffect(() => {
        settingsApi.get().then((s: any) => { if (s) setSettings(s); });
    }, []);

    // Filter to only show the invoice for the currently selected/active event
    const regs = data ? [data] : [];

    // Summary Calculations
    const totalBookings = regs.length;
    const totalPayable = regs.reduce((sum: number, r: any) => sum + (r.financeBreakdown?.netPayable || r.participation?.total || 0), 0);
    const totalPaid = regs.reduce((sum: number, r: any) => sum + (r.amountPaid || 0), 0);
    const totalBalance = regs.reduce((sum: number, r: any) => sum + (r.balanceAmount || 0), 0);

    const getInvoiceNo = (reg: any) => {
        const seqNum = reg.registrationId ? reg.registrationId.split('-').pop()?.padStart(3, '0') : '001';
        const invoiceYear = new Date(reg.createdAt || Date.now()).getFullYear();
        const nextYear = (invoiceYear + 1).toString().slice(-2);
        const lastThreeDigits = seqNum.slice(-3);
        return `NGW/${invoiceYear}-${nextYear}/PI/${lastThreeDigits}`;
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'paid':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        <CheckCircle size={12} /> Paid
                    </span>
                );
            case 'advance-paid':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-100 text-cyan-800 border border-cyan-300">
                        <Clock size={12} /> Advance Paid
                    </span>
                );
            case 'approved':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-300">
                        Approved
                    </span>
                );
            case 'payment-failed':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-300">
                        <AlertCircle size={12} /> Payment Failed
                    </span>
                );
            case 'rejected':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-300">
                        Rejected
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300">
                        <Clock size={12} /> Pending
                    </span>
                );
        }
    };

    if (selectedReg) {
        const isUSD = selectedReg.participation?.currency === 'USD';
        const cur = isUSD ? 'USD ' : 'INR ';
        const paid = selectedReg.amountPaid || 0;
        const total = selectedReg.financeBreakdown?.netPayable || selectedReg.participation?.total || 0;
        const balance = selectedReg.balanceAmount || 0;
        const paidPct = total > 0 ? Math.min(100, Math.round((paid / total) * 100)) : 0;
        const regDate = selectedReg.createdAt
            ? new Date(selectedReg.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })
            : '';

        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between no-print">
                    <button
                        onClick={() => setSelectedReg(null)}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition shadow-sm"
                    >
                        <ArrowLeft size={14} /> Back to Invoices List
                    </button>
                    <span className="text-xs text-slate-500 font-medium">Viewing Proforma Invoice: <strong className="text-slate-800">{getInvoiceNo(selectedReg)}</strong></span>
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
        <div className="space-y-6">
            <DashboardHero
                pageId="ex-invoices"
                defaultTitle="Invoices & Finance"
                defaultSubtitle="Track your payments and download official receipts"
                type="exhibitor"
            />

            {/* Financial Summary Cards */}
            {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                        <FileText size={22} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Event Bookings</p>
                        <h4 className="text-2xl font-black text-slate-800 mt-0.5">{totalBookings}</h4>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#23471d]/10 flex items-center justify-center text-[#23471d] shrink-0">
                        <Wallet size={22} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#23471d]">Total Payable</p>
                        <h4 className="text-xl font-black text-slate-800 mt-0.5">₹{totalPayable.toLocaleString()}</h4>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <CheckCircle size={22} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Total Paid</p>
                        <h4 className="text-xl font-black text-slate-800 mt-0.5">₹{totalPaid.toLocaleString()}</h4>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                        <AlertCircle size={22} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-rose-600">Total Outstanding</p>
                        <h4 className="text-xl font-black text-slate-800 mt-0.5">₹{totalBalance.toLocaleString()}</h4>
                    </div>
                </div>
            </div> */}

            {/* Invoices List Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h3 className="font-bold text-slate-800 text-base">Your Invoices</h3>
                        <p className="text-xs text-slate-400 font-medium">Showing documents for active event: <strong className="text-slate-700">{data?.eventId?.name || 'IHWE Global Event'}</strong></p>
                    </div>
                </div>

                {regs.length === 0 ? (
                    <div className="p-10 text-center">
                        <FileText size={48} className="text-slate-300 mx-auto mb-3" />
                        <p className="text-sm font-semibold text-slate-500">No invoices or bookings found.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    <th className="py-4 px-6">Inv No</th>
                                    <th className="py-4 px-6">Event Name</th>
                                    <th className="py-4 px-6">Stall Choice</th>
                                    <th className="py-4 px-6 text-right">Total Cost</th>
                                    <th className="py-4 px-6 text-right">Amount Paid</th>
                                    <th className="py-4 px-6 text-right">Balance Due</th>
                                    <th className="py-4 px-6 text-center">Status</th>
                                    <th className="py-4 px-6 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
                                {regs.map((reg: any, idx: number) => {
                                    const isItemUSD = reg.participation?.currency === 'USD';
                                    const rCur = isItemUSD ? '$' : '₹';
                                    const rPayable = reg.financeBreakdown?.netPayable || reg.participation?.total || 0;
                                    const rPaid = reg.amountPaid || 0;
                                    const rBalance = reg.balanceAmount || 0;

                                    return (
                                        <tr key={reg._id || idx} className="hover:bg-slate-50/50 transition">
                                            <td className="py-4 px-6 font-bold text-slate-900">
                                                {getInvoiceNo(reg)}
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2">
                                                    <Calendar size={14} className="text-slate-400 shrink-0" />
                                                    <span className="font-semibold text-slate-800 truncate max-w-[200px]" title={reg.eventId?.name}>
                                                        {reg.eventId?.name || 'IHWE Global Event'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="font-semibold text-slate-800">
                                                    Stall {reg.participation?.stallFor || '—'}
                                                </div>
                                                <div className="text-[10px] text-slate-400">
                                                    {reg.participation?.stallType || 'Shell Space'} • {reg.participation?.stallSize || 0} Sqm
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-right font-semibold text-slate-800">
                                                {rCur}{rPayable.toLocaleString()}
                                            </td>
                                            <td className="py-4 px-6 text-right font-semibold text-emerald-600">
                                                {rCur}{rPaid.toLocaleString()}
                                            </td>
                                            <td className="py-4 px-6 text-right font-semibold text-rose-600">
                                                {rCur}{rBalance.toLocaleString()}
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                {getStatusBadge(reg.status)}
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                <button
                                                    onClick={() => setSelectedReg(reg)}
                                                    className="px-4 py-1.5 bg-[#23471d] hover:bg-[#193215] text-white text-[10px] font-bold rounded transition shadow-sm hover:scale-105 active:scale-95 duration-150"
                                                >
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
