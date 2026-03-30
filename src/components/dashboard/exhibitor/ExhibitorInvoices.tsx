import { motion } from 'framer-motion';
import { FileText, Download, CheckCircle, Receipt, Wallet, TrendingUp, AlertCircle } from 'lucide-react';

interface InvoicesProps {
    data: any;
    cur: string;
    total: number;
    paid: number;
    balance: number;
    paidPct: number;
    regDate: string;
}

export default function ExhibitorInvoices({ data, cur, total, paid, balance, paidPct, regDate }: InvoicesProps) {
    return (
        <motion.div
            key="finance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="space-y-8"
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Invoice Ledger */}
                <div className="lg:col-span-2 bg-white rounded-[3rem] border border-slate-200 shadow-xl shadow-slate-200/30 overflow-hidden">
                    <div className="px-8 py-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white">
                                <FileText size={24} strokeWidth={2.5} />
                            </div>
                            <div>
                                <h3 className="text-lg font-black text-slate-900 tracking-tight">Fiscal Documents</h3>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Automated Tax Invoicing</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-0">
                        <div className="overflow-x-auto no-scrollbar">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/30">
                                        <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Document / Transaction</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Timestamp</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right">Value</th>
                                        <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    <tr className="group hover:bg-slate-50/50 transition-all cursor-pointer">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-[#23471d] group-hover:text-white transition-all"><FileText size={18} /></div>
                                                <div>
                                                    <p className="text-sm font-black text-slate-800 tracking-tight">Proforma Invoice</p>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase">PINV-{data._id.slice(-6).toUpperCase()}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 text-[11px] text-slate-500 font-black uppercase tracking-widest">{regDate}</td>
                                        <td className="px-6 py-6 text-sm font-black text-slate-900 text-right tabular-nums">{cur}{total.toLocaleString()}</td>
                                        <td className="px-8 py-6 text-right">
                                            <button 
                                                onClick={() => window.print()}
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-slate-900/10"
                                            >
                                                <Download size={14} strokeWidth={2.5} /> <span className="hidden sm:inline">Export PDF</span>
                                            </button>
                                        </td>
                                    </tr>

                                    {/* Payment Tracker Entry */}
                                    {paid > 0 && (
                                        <tr className="group hover:bg-slate-50/50 transition-all">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600"><CheckCircle size={18} /></div>
                                                    <div>
                                                        <p className="text-sm font-black text-slate-800 tracking-tight">Payment Realized</p>
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase">
                                                            {data.manualPaymentDetails?.transactionId || data.paymentId || 'TRX-CONFIRMED'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6 text-[11px] text-slate-500 font-black uppercase tracking-widest">
                                                {data.manualPaymentDetails?.updatedAt ? new Date(data.manualPaymentDetails.updatedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) : regDate}
                                            </td>
                                            <td className="px-6 py-6 text-sm font-black text-emerald-600 text-right tabular-nums">+{cur}{paid.toLocaleString()}</td>
                                            <td className="px-8 py-6 text-right">
                                                {data.receiptUrl ? (
                                                    <a 
                                                        href={data.receiptUrl} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-100 transition-all"
                                                    >
                                                        <Download size={14} /> <span className="hidden sm:inline">Receipt</span>
                                                    </a>
                                                ) : (
                                                    <div className="text-[9px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-lg inline-block">Verified</div>
                                                )}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Transaction Metadata (Ledger Sidebar) */}
                    <div className="p-8 bg-slate-50/50 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Settlement Infrastructure</p>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="font-bold text-slate-500 uppercase tracking-tight">Method</span>
                                    <span className="font-black text-slate-900">{data.manualPaymentDetails?.method || data.paymentMode || 'Online'}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="font-bold text-slate-500 uppercase tracking-tight">UTR / Ref No.</span>
                                    <span className="font-black text-slate-900 font-mono tracking-tighter">{data.manualPaymentDetails?.transactionId || data.paymentId || '—'}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Participation Fee</p>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="font-bold text-slate-500 uppercase tracking-tight">Base Amount</span>
                                    <span className="font-black text-slate-900">{cur}{(data.participation?.amount || 0).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="font-bold text-slate-500 uppercase tracking-tight">GST (18%)</span>
                                    <span className="font-black text-slate-900">+{cur}{(total - (data.participation?.amount || 0)).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                        <div className="lg:border-l lg:border-slate-200 lg:pl-8">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Account Statement</p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white">
                                    <Receipt size={18} />
                                </div>
                                <div>
                                    <p className="text-sm font-black text-slate-900 tracking-tight">Audit Ready</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">System Generated</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Fiscal Snapshot Card */}
                <div className="space-y-6">
                    <div className="bg-[#1a3516] rounded-[3rem] p-10 text-white relative overflow-hidden flex flex-col justify-between shadow-2xl shadow-green-900/30">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl opacity-50"></div>
                        <div className="relative z-10 space-y-8">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 pb-4 border-b border-white/10">Liquidity Pulse</p>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400/80 mb-2">Realized Liquidity</p>
                                    <h4 className="text-4xl font-black tabular-nums tracking-tighter leading-none">{cur}{paid.toLocaleString()}</h4>
                                </div>
                                <div className="pt-6 border-t border-white/10">
                                    <div className="flex justify-between items-end mb-3">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-white/30 truncate">Settlement Ratio</p>
                                        <p className="text-xs font-black text-emerald-400">{paidPct}%</p>
                                    </div>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${paidPct}%` }}
                                            className="h-full bg-emerald-400"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center"><AlertCircle size={14} /></div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pending Liability</p>
                        </div>
                        <h5 className="text-2xl font-black text-slate-900 tabular-nums mb-1">{cur}{balance.toLocaleString()}</h5>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                            {balance > 0 ? "Outstanding balance required for stall handover." : "All fiscal obligations fully satisfied."}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
