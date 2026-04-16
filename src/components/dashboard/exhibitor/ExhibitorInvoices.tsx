import { motion } from 'framer-motion';
import { FileText, Download, CheckCircle, AlertCircle, Printer, ExternalLink, Receipt } from 'lucide-react';
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

function DownloadBtn({ url, label, icon: Icon }: { url: string; label: string; icon: any }) {
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="flex items-center gap-2 px-4 py-2 bg-[#23471d] text-white text-[10px] font-black uppercase tracking-widest rounded-[2px] hover:bg-[#1a3516] transition-all"
        >
            <Icon size={12} /> {label}
        </a>
    );
}

export default function ExhibitorInvoices({ data, cur, total, paid, balance, paidPct, regDate }: InvoicesProps) {

    const receiptUrl = data.receiptUrl
        ? (data.receiptUrl.startsWith('http') ? data.receiptUrl : `${SERVER_URL}${data.receiptUrl}`)
        : null;

    const registrationPdfUrl = data.registrationPdfUrl || null;
    const receiptPdfUrl = data.receiptPdfUrl || null;

    const txId = data.manualPaymentDetails?.transactionId || data.paymentId || '—';
    const method = data.manualPaymentDetails?.method || (data.paymentMode === 'online' ? 'Razorpay (Online)' : '—');

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
                    <Row2 l1="Transaction ID" v1={txId} l2="Method" v2={method} />
                    {data.razorpayOrderId && (
                        <Row2 l1="Razorpay Order ID" v1={data.razorpayOrderId} l2="Payment ID" v2={data.paymentId || '—'} />
                    )}
                    <Row2 l1="Registration Date" v1={regDate} l2="Status" v2={<span className="font-bold uppercase text-[#23471d]">{data.status}</span>} />
                </Section>

                {/* Payment History */}
                <Section title="Payment History">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-[#23471d] text-white">
                                    <th className="py-2 px-4 text-[10px] font-black uppercase tracking-wider text-left">#</th>
                                    <th className="py-2 px-4 text-[10px] font-black uppercase tracking-wider text-left">Type</th>
                                    <th className="py-2 px-4 text-[10px] font-black uppercase tracking-wider text-left">Amount</th>
                                    <th className="py-2 px-4 text-[10px] font-black uppercase tracking-wider text-left">Mode / Method</th>
                                    <th className="py-2 px-4 text-[10px] font-black uppercase tracking-wider text-left">Txn ID</th>
                                    <th className="py-2 px-4 text-[10px] font-black uppercase tracking-wider text-left">Date</th>
                                    <th className="py-2 px-4 text-[10px] font-black uppercase tracking-wider text-left">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.paymentHistory?.length > 0 ? (
                                    data.paymentHistory.map((h: any, i: number) => (
                                        <tr key={i} className={`border-b border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}`}>
                                            <td className="py-2 px-4 text-[11px] text-slate-400 font-bold">{i + 1}</td>
                                            <td className="py-2 px-4 text-[11px] font-bold text-slate-700 capitalize">{h.paymentType || '—'}</td>
                                            <td className="py-2 px-4 text-[11px] font-black text-emerald-700">{cur}{Number(h.amount || 0).toLocaleString()}</td>
                                            <td className="py-2 px-4 text-[11px] text-slate-600">{h.method || h.paymentMode || '—'}</td>
                                            <td className="py-2 px-4 text-[11px] text-slate-600 font-mono">{h.transactionId || h.razorpayPaymentId || '—'}</td>
                                            <td className="py-2 px-4 text-[11px] text-slate-500">
                                                {h.paidAt ? new Date(h.paidAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                                            </td>
                                            <td className="py-2 px-4">
                                                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[9px] font-black uppercase rounded-[2px]">Paid</span>
                                            </td>
                                        </tr>
                                    ))
                                ) : paid > 0 ? (
                                    // Fallback for old records without paymentHistory
                                    <tr className="border-b border-slate-100 bg-emerald-50/40">
                                        <td className="py-2 px-4 text-[11px] text-slate-400 font-bold">1</td>
                                        <td className="py-2 px-4 text-[11px] font-bold text-slate-700">{data.paymentType === 'advance' ? 'Advance' : 'Full'}</td>
                                        <td className="py-2 px-4 text-[11px] font-black text-emerald-700">{cur}{paid.toLocaleString()}</td>
                                        <td className="py-2 px-4 text-[11px] text-slate-600">{method}</td>
                                        <td className="py-2 px-4 text-[11px] text-slate-600 font-mono">{txId}</td>
                                        <td className="py-2 px-4 text-[11px] text-slate-500">{regDate}</td>
                                        <td className="py-2 px-4">
                                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[9px] font-black uppercase rounded-[2px]">Paid</span>
                                        </td>
                                    </tr>
                                ) : (
                                    <tr><td colSpan={7} className="py-6 text-center text-[11px] text-slate-400 font-bold uppercase">No payment records yet</td></tr>
                                )}
                                {balance > 0 && (
                                    <tr className="border-b border-slate-100 bg-rose-50/40">
                                        <td className="py-2 px-4 text-[11px] text-slate-400 font-bold">—</td>
                                        <td className="py-2 px-4 text-[11px] font-bold text-slate-700">Balance Due</td>
                                        <td className="py-2 px-4 text-[11px] font-black text-rose-600">{cur}{balance.toLocaleString()}</td>
                                        <td colSpan={3} className="py-2 px-4 text-[11px] text-slate-400">—</td>
                                        <td className="py-2 px-4">
                                            <span className="px-2 py-0.5 bg-rose-100 text-rose-700 text-[9px] font-black uppercase rounded-[2px]">Pending</span>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Section>

                {/* Stall & Pricing */}
                <Section title="Stall & Pricing Breakdown">
                    <Row2 l1="Stall No." v1={data.participation?.stallFor} l2="Stall Type" v2={data.participation?.stallType} />
                    <Row2 l1="Area" v1={`${data.participation?.stallSize || 0} sqm`} l2="Dimension" v2={data.participation?.dimension || '—'} />
                    <Row2 l1="Rate / sqm" v1={`${cur}${(data.participation?.rate || 0).toLocaleString()}`} l2="Base Amount" v2={`${cur}${(data.participation?.amount || 0).toLocaleString()}`} />
                    <Row2 l1="GST (18%)" v1={`${cur}${(total - (data.participation?.amount || 0)).toLocaleString()}`} l2="Total" v2={<span className="font-extrabold text-[#23471d]">{cur}{total.toLocaleString()}</span>} />
                </Section>

                {/* Documents */}
                <Section title="Documents & Downloads">
                    <div className="p-4 flex flex-wrap gap-3">
                        {registrationPdfUrl && (
                            <DownloadBtn url={registrationPdfUrl} label="Registration Form (PDF)" icon={FileText} />
                        )}
                        {receiptPdfUrl && (
                            <DownloadBtn url={receiptPdfUrl} label="Payment Receipt (PDF)" icon={Receipt} />
                        )}
                        {receiptUrl && (
                            <DownloadBtn url={receiptUrl} label="Uploaded Receipt" icon={Download} />
                        )}
                        {!registrationPdfUrl && !receiptPdfUrl && !receiptUrl && (
                            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">No documents available yet</p>
                        )}
                    </div>
                </Section>

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
