import { motion } from 'framer-motion';
import { Printer } from 'lucide-react';
import { openPrintWindow } from './PrintCertificate';

interface OverviewProps {
    data: any; cur: string; status: any; paidPct: number;
    paid: number; total: number; balance: number;
    setActiveTab: (tab: any) => void;
}

function InfoGrid({ rows }: { rows: [string, React.ReactNode][] }) {
    return (
        <div className="border border-slate-200 rounded-sm overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {rows.map(([label, value], i) => (
                    <div
                        key={i}
                        className="flex border-r border-b border-slate-200 last:border-r-0 hover:bg-slate-50/40 transition"
                    >

                        <div className="w-[120px] min-w-[120px] px-2 py-2 text-[10px] font-semibold text-slate-500 uppercase border-r border-slate-200 bg-slate-50 flex items-center">
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="mb-4">
            <div className="flex items-center gap-2 mb-1.5">
                <div className="w-1 h-3.5 bg-[#23471d] rounded-full" />
                <span className="font-extrabold text-[10px] text-[#23471d] uppercase tracking-widest">
                    {title}
                </span>
            </div>
            {children}
        </div>
    );
}

export default function ExhibitorOverview({
    data, cur, status, paidPct, paid, total, balance, setActiveTab
}: OverviewProps) {

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-white border border-slate-200 p-4 rounded-md">


                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4 pb-3 border-b">
                    <div>
                        <h2 className="text-[13px] font-bold uppercase text-slate-800">
                            {data.exhibitorName}
                        </h2>
                        <p className="text-[10px] text-slate-400 uppercase">
                            {data.eventId?.name || 'IHWE 2026'} · {data.participation?.stallFor || '—'}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-[9px] font-bold border ${status?.bg} ${status?.text}`}>
                            {data.status}
                        </span>
                        <span className="bg-[#23471d] text-white px-2 py-1 text-[10px] font-bold">
                            {data.registrationId}
                        </span>
                    </div>
                </div>

                <div className="space-y-3">

                    <Section title="Registration Details">
                        <InfoGrid rows={[
                            ['Registration ID', data.registrationId],
                            ['Status', data.status],
                            ['Payment Mode', data.paymentMode],
                            ['Stall No.', data.participation?.stallFor],
                            ['Stall Type', data.participation?.stallType],
                            ['Area', `${data.participation?.stallSize || 0} sqm`],
                        ]} />
                    </Section>

                    <Section title="Financial Summary">
                        <InfoGrid rows={[
                            ['Total Amount', `${cur}${total.toLocaleString()}`],
                            ['Paid', `${cur}${paid.toLocaleString()}`],
                            ['Balance', <span className={balance > 0 ? 'text-red-600 font-bold' : 'text-green-600 font-bold'}>
                                {cur}{balance.toLocaleString()}
                            </span>],
                            ['Status', `${paidPct}% Paid`],
                        ]} />
                    </Section>

                    <Section title="Company Information">
                        <InfoGrid rows={[
                            ['Company Name', data.exhibitorName],
                            ['Business Type', data.typeOfBusiness],
                            ['Industry', data.industrySector],
                            ['Website', data.website],
                            ['Address', [data.city, data.state, data.country].filter(Boolean).join(', ')],
                        ]} />
                    </Section>

                    <Section title="Primary Contact">
                        <InfoGrid rows={[
                            ['Name', `${data.contact1?.firstName || ''} ${data.contact1?.lastName || ''}`],
                            ['Designation', data.contact1?.designation],
                            ['Mobile', data.contact1?.mobile],
                            ['Email', data.contact1?.email],
                            ['Alt No.', data.contact1?.alternateNo],
                        ]} />
                    </Section>

                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className="px-3 py-1.5 bg-slate-800 text-white text-[10px] font-bold"
                    >
                        View Profile
                    </button>

                    <button
                        onClick={() => setActiveTab('invoices')}
                        className="px-3 py-1.5 bg-[#23471d] text-white text-[10px] font-bold"
                    >
                        Invoices
                    </button>

                    <button
                        onClick={() => openPrintWindow(data)}
                        className="flex items-center gap-1 px-3 py-1.5 border text-[10px]"
                    >
                        <Printer size={12} /> Print
                    </button>
                </div>

            </div>
        </motion.div>
    );
}