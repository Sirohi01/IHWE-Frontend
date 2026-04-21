import { motion } from 'framer-motion';
import { FileText, Download, Receipt } from 'lucide-react';
import { SERVER_URL } from '@/lib/api';

interface InvoicesProps {
    data: any; cur: string; total: number; paid: number;
    balance: number; paidPct: number; regDate: string;
}

/* 🔥 SAME GRID (4 per row) */
function InfoGrid({ rows }: { rows: [string, React.ReactNode][] }) {
    return (
        <div className="border border-slate-200 rounded-sm overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {rows.map(([label, value], i) => (
                    <div key={i} className="flex border-r border-b border-slate-200 last:border-r-0 hover:bg-slate-50/40">
                        <div className="w-[120px] min-w-[120px] px-2 py-2 text-[10px] font-semibold text-slate-500 uppercase border-r bg-slate-50 flex items-center">
                            {label}
                        </div>
                        <div className="flex-1 px-2 py-2 text-[11px] text-slate-800 flex items-center break-all">
                            {value ?? '—'}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Section({ title, children }: any) {
    return (
        <div className="mb-4">
            <div className="flex items-center gap-2 mb-1.5">
                <div className="w-1 h-3.5 bg-[#23471d] rounded-full" />
                <span className="text-[11px] font-semibold text-[#23471d] uppercase tracking-wider">
                    {title}
                </span>
            </div>
            {children}
        </div>
    );
}

function DownloadBtn({ url, label, icon: Icon }: any) {
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="flex items-center gap-2 px-3 py-1.5 bg-[#23471d] text-white text-[10px] font-bold rounded"
        >
            <Icon size={12} /> {label}
        </a>
    );
}

export default function ExhibitorInvoices({
    data, cur, total, paid, balance, paidPct, regDate
}: InvoicesProps) {

    const receiptUrl = data.receiptUrl
        ? (data.receiptUrl.startsWith('http') ? data.receiptUrl : `${SERVER_URL}${data.receiptUrl}`)
        : null;

    const txId = data.manualPaymentDetails?.transactionId || data.paymentId || '—';
    const method = data.manualPaymentDetails?.method || data.paymentMode || '—';
    const fb = data.financeBreakdown || {};
    const history = data.paymentHistory || [];
    const latestPayment = history.length > 0 ? history[history.length - 1] : null;
    const latestTxId = latestPayment?.transactionId || latestPayment?.razorpayPaymentId || data.paymentId || data.manualPaymentDetails?.transactionId || '—';
    const latestMethod = latestPayment?.method || data.manualPaymentDetails?.method || data.paymentMode || '—';

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-white border border-slate-200 p-4 rounded-md">

                {/* Header */}
                <div className="mb-4 border-b pb-3">
                    <h1 className="text-[14px] font-semibold uppercase">Invoices & Payments</h1>
                    <p className="text-[10px] text-slate-400">ID: {data.registrationId}</p>
                </div>

                {/* Summary */}
                <Section title="Summary">
                    <InfoGrid rows={[
                        ['Total Amount', `${cur}${total.toLocaleString()}`],
                        ['Paid', `${cur}${paid.toLocaleString()}`],
                        ['Balance', <span className={balance > 0 ? 'text-red-600 font-bold' : 'text-green-600 font-bold'}>
                            {cur}{balance.toLocaleString()}
                        </span>],
                        ['Settlement', `${paidPct}%`],
                    ]} />
                </Section>

                {/* Payment Details */}
                <Section title="Payment Details">
                    <InfoGrid rows={[
                        ['Payment Mode', data.paymentMode],
                        ['Payment Type', data.paymentType],
                        ['Transaction ID', latestTxId],
                        ['Method', latestMethod],
                        ['Registration Date', regDate],
                        ['Status', data.status],
                    ]} />
                </Section>

                {/* Financial Breakdown */}
                {fb.grossAmount > 0 && (
                    <Section title="Financial Breakdown">
                        <InfoGrid rows={[
                            ['Gross Cost', `${cur}${(fb.grossAmount || 0).toLocaleString()}`],
                            ...(fb.stallDiscountAmount > 0 ? [[`Stall Disc (${fb.stallDiscountPercent}%)`, `-${cur}${fb.stallDiscountAmount.toLocaleString()}`] as [string, React.ReactNode]] : []),
                            ...(fb.discountAmount > 0 ? [[`FP Disc (${fb.discountPercent}%)`, `-${cur}${fb.discountAmount.toLocaleString()}`] as [string, React.ReactNode]] : []),
                            ['Taxable Value', `${cur}${(fb.subtotal || 0).toLocaleString()}`],
                            ['GST @ 18%', `+${cur}${(fb.gstAmount || 0).toLocaleString()}`],
                            ...(fb.tdsAmount > 0 ? [[`TDS @ ${fb.tdsPercent}%`, `-${cur}${fb.tdsAmount.toLocaleString()}`] as [string, React.ReactNode]] : []),
                            ['Net Payable', <span className="text-[#23471d] font-bold">{cur}{(fb.netPayable || 0).toLocaleString()}</span>],
                        ]} />
                    </Section>
                )}

                {/* Stall Details */}
                <Section title="Stall & Pricing">
                    <InfoGrid rows={[
                        ['Stall No.', data.participation?.stallFor],
                        ['Stall Type', data.participation?.stallType],
                        ['Area', `${data.participation?.stallSize || 0} sqm`],
                        ['Dimension', data.participation?.dimension],
                        ['Rate', `${cur}${(data.participation?.rate || 0).toLocaleString()}`],
                        ['Base', `${cur}${(data.participation?.amount || 0).toLocaleString()}`],
                        ['GST', `${cur}${(total - (data.participation?.amount || 0)).toLocaleString()}`],
                        ['Total', <span className="text-[#23471d] font-bold">{cur}{total.toLocaleString()}</span>],
                    ]} />
                </Section>

                <Section title="Payment History">
                    <div className="overflow-x-auto">
                        <table className="w-full text-[11px]">
                            <thead className="bg-[#23471d] text-white">
                                <tr>
                                    <th className="p-2 text-left">#</th>
                                    <th className="p-2 text-left">Amount</th>
                                    <th className="p-2 text-left">Method</th>
                                    <th className="p-2 text-left">Txn ID</th>
                                    <th className="p-2 text-left">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.length > 0 ? history.map((h: any, i: number) => (
                                    <tr key={i} className="border-b hover:bg-slate-50">
                                        <td className="p-2 text-slate-400 font-bold">#{i + 1}</td>
                                        <td className="p-2 font-bold text-[#23471d]">{cur}{Number(h.amount || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                                        <td className="p-2">{h.method || h.paymentMode || '—'}</td>
                                        <td className="p-2 font-mono text-slate-600">{h.transactionId || h.razorpayPaymentId || '—'}</td>
                                        <td className="p-2">{h.paidAt ? new Date(h.paidAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}</td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan={5} className="p-4 text-center text-slate-400 italic text-[10px]">No payment records yet</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Section>

                {/* Documents */}
                <Section title="Documents">
                    <div className="flex gap-2 flex-wrap">
                        {data.registrationPdfUrl && (
                            <DownloadBtn url={data.registrationPdfUrl} label="Registration PDF" icon={FileText} />
                        )}
                        {data.receiptPdfUrl && (
                            <DownloadBtn url={data.receiptPdfUrl} label="Receipt PDF" icon={Receipt} />
                        )}
                        {receiptUrl && (
                            <DownloadBtn url={receiptUrl} label="Invoice" icon={Download} />
                        )}
                    </div>
                </Section>

            </div>
        </motion.div>
    );
}