import { motion } from 'framer-motion';
import { FileText, Download, CheckCircle, AlertCircle, Printer, ExternalLink } from 'lucide-react';
import { openPrintWindow } from './PrintCertificate';
import { SERVER_URL } from '@/lib/api';

interface InvoicesProps {
    data: any; cur: string; total: number; paid: number;
    balance: number; paidPct: number; regDate: string;
}

const LC = "bg-[#fafafa] p-3 text-[11px] font-bold text-slate-600 uppercase tracking-tighter border-r border-slate-200 flex items-center min-w-[140px]";
const VC = "bg-white p-3 text-[12px] font-semibold text-slate-900 border-r border-slate-200 flex items-center break-all";

function Row2({ l1, v1, l2, v2 }: any) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 border-b border-slate-200 last:border-b-0">
            <div className={LC}>{l1}</div>
            <div className={`${VC} col-span-1`}>{v1 || '—'}</div>
            <div className={`${LC} border-t md:border-t-0`}>{l2}</div>
            <div className={`${VC} col-span-1 border-r-0 border-t md:border-t-0`}>{v2 || '—'}</div>
        </div>
    );
}

function Section({ title, children }: any) {
    return (
        <div className="mb-6">
            <div className="flex items-center gap-2 mb-2 pb-1 border-b border-slate-100">
                <div className="w-1.5 h-4 bg-[#23471d] rounded-full" />
                <span className="font-extrabold text-[12px] text-[#23471d] uppercase tracking-wider">{title}</span>
            </div>
            <div className="border border-slate-300 rounded-[2px] shadow-sm bg-white overflow-hidden">{children}</div>
        </div>
    );
}

export default function ExhibitorInvoices({ data, cur, total, paid, balance, paidPct, regDate }: InvoicesProps) {

    // Build full receipt URL if it's a relative path
    const receiptUrl = data.receiptUrl
        ? (data.receiptUrl.startsWith('http') ? data.receiptUrl : `${SERVER_URL}${data.receiptUrl}`)
        : null;

    return (
        <motion.div key="invoices" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="bg-white shadow-md p-4">
                <div className="pb-3 border-b border-gray-100 mb-4">
                    <h1 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Invoices & Payments</h1>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Financial Records · {data.registrationId}</p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                    {[
                        { label: 'Total Amount', value: `${cur}${total.toLocaleString()}`, color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-200' },
                        { label: 'Amount Paid', value: `${cur}${paid.toLocaleString()}`, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
                        { label: 'Balance Due', value: `${cur}${balance.toLocaleString()}`, color: balance > 0 ? 'text-rose-600' : 'text-slate-500', bg: balance > 0 ? 'bg-rose-50' : 'bg-slate-50', border: balance > 0 ? 'border-rose-200' : 'border-slate-200' },
                        { label: 'Settlement', value: `${paidPct}%`, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
                    ].map((s, i) => (
                        <div key={i} className={`p-4 border-2 rounded-[2px] ${s.bg} ${s.border}`}>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{s.label}</p>
                            <p className={`text-xl font-extrabold ${s.color}`}>{s.value}</p>
                        </div>
                    ))}
                </div>

                {/* Payment Details */}
                <Section title="Payment Details">
                    <Row2 l1="Payment Mode" v1={data.paymentMode} l2="Payment Type" v2={data.paymentType} />
                    <Row2 l1="Transaction ID" v1={data.manualPaymentDetails?.transactionId || data.paymentId || '—'} l2="Method" v2={data.manualPaymentDetails?.method || '—'} />
                    <Row2 l1="Registration Date" v1={regDate} l2="Status" v2={<span className="font-bold uppercase text-[#23471d]">{data.status}</span>} />
                </Section>

                {/* Stall & Pricing */}
                <Section title="Stall & Pricing Breakdown">
                    <Row2 l1="Stall No." v1={data.participation?.stallFor} l2="Stall Type" v2={data.participation?.stallType} />
                    <Row2 l1="Area" v1={`${data.participation?.stallSize || 0} sqm`} l2="Dimension" v2={data.participation?.dimension || '—'} />
                    <Row2 l1="Rate / sqm" v1={`${cur}${(data.participation?.rate || 0).toLocaleString()}`} l2="Base Amount" v2={`${cur}${(data.participation?.amount || 0).toLocaleString()}`} />
                    <Row2 l1="GST (18%)" v1={`${cur}${(total - (data.participation?.amount || 0)).toLocaleString()}`} l2="Total" v2={<span className="font-extrabold text-[#23471d]">{cur}{total.toLocaleString()}</span>} />
                </Section>

                {/* Receipt Section - shown only when receipt exists */}
                {receiptUrl && (
                    <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-[2px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <CheckCircle size={18} className="text-emerald-600 shrink-0" />
                            <div>
                                <p className="text-[11px] font-black text-emerald-800 uppercase tracking-widest">Payment Receipt Available</p>
                                <p className="text-[10px] text-emerald-600 font-medium mt-0.5">
                                    Txn: {data.manualPaymentDetails?.transactionId || data.paymentId || 'N/A'} · {data.manualPaymentDetails?.method || data.paymentMode || ''}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <a
                                href={receiptUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest rounded-[2px] hover:bg-emerald-700 transition-all"
                            >
                                <ExternalLink size={12} /> View Receipt
                            </a>
                            <a
                                href={receiptUrl}
                                download
                                className="flex items-center gap-2 px-4 py-2 bg-white border border-emerald-300 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-[2px] hover:bg-emerald-50 transition-all"
                            >
                                <Download size={12} /> Download
                            </a>
                        </div>
                    </div>
                )}

                {/* Invoice Actions */}
                <div className="flex flex-wrap gap-3 pt-2">
                    <button
                        onClick={() => openPrintWindow(data)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-[#23471d] text-white text-[11px] font-black uppercase tracking-widest rounded-[2px] hover:bg-[#1a3516] transition-all shadow-sm"
                    >
                        <Printer size={13} /> Print Invoice
                    </button>
                    {balance > 0 && (
                        <div className="flex items-center gap-2 px-4 py-2 bg-rose-50 border border-rose-200 text-rose-600 text-[11px] font-bold uppercase tracking-widest rounded-[2px]">
                            <AlertCircle size={13} /> Balance Due: {cur}{balance.toLocaleString()}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
