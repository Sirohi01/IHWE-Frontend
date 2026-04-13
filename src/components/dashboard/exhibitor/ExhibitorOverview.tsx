import { motion } from 'framer-motion';
import { MapPin, Building2, User, Award, Briefcase, Printer } from 'lucide-react';
import { openPrintWindow } from './PrintCertificate';

interface OverviewProps {
    data: any; cur: string; status: any; paidPct: number;
    paid: number; total: number; balance: number;
    setActiveTab: (tab: any) => void;
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
function Row3({ l1, v1, l2, v2, l3, v3 }: any) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-6 border-b border-slate-200 last:border-b-0">
            <div className={LC}>{l1}</div>
            <div className={VC}>{v1 || '—'}</div>
            <div className={`${LC} border-t md:border-t-0`}>{l2}</div>
            <div className={`${VC} border-t md:border-t-0`}>{v2 || '—'}</div>
            <div className={`${LC} border-t md:border-t-0`}>{l3}</div>
            <div className={`${VC} border-t md:border-t-0 border-r-0`}>{v3 || '—'}</div>
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

export default function ExhibitorOverview({ data, cur, status, paidPct, paid, total, balance, setActiveTab }: OverviewProps) {
    return (
        <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="bg-white shadow-md p-4">
                {/* Sub-header */}
                <div className="bg-slate-50/50 border border-slate-200 px-4 py-3 rounded-[2px] flex flex-col md:flex-row justify-between items-center gap-3 mb-4">
                    <div>
                        <h2 className="text-[15px] font-bold text-slate-800 uppercase tracking-tight">{data.exhibitorName}</h2>
                        <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] mt-0.5 font-bold">
                            {data.eventId?.name || 'IHWE 2026'} · {data.participation?.stallFor || 'Stall TBD'}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 text-[10px] font-black uppercase rounded-[2px] border ${status?.bg || 'bg-slate-100'} ${status?.text || 'text-slate-600'}`}>
                            {data.status}
                        </span>
                        <div className="bg-[#23471d] text-white px-4 py-2 rounded-[2px] text-[11px] font-bold uppercase tracking-widest shadow-sm">
                            {data.registrationId}
                        </div>
                    </div>
                </div>

                {/* Registration Details */}
                <Section title="Registration Details">
                    <Row3
                        l1="Registration ID" v1={data.registrationId}
                        l2="Status" v2={<span className="text-[#23471d] font-bold uppercase">{data.status}</span>}
                        l3="Payment Mode" v3={data.paymentMode}
                    />
                    <Row3
                        l1="Stall No." v1={data.participation?.stallFor}
                        l2="Stall Type" v2={data.participation?.stallType}
                        l3="Area" v3={`${data.participation?.stallSize || 0} sqm`}
                    />
                    <Row3
                        l1="Total Amount" v1={`${cur}${total.toLocaleString()}`}
                        l2="Amount Paid" v2={`${cur}${paid.toLocaleString()}`}
                        l3="Balance Due" v3={<span className={balance > 0 ? 'text-rose-600 font-bold' : 'text-emerald-600 font-bold'}>{cur}{balance.toLocaleString()}</span>}
                    />
                </Section>

                {/* Company Info */}
                <Section title="Company Information">
                    <Row2 l1="Company Name" v1={data.exhibitorName} l2="Industry / Sector" v2={data.industrySector} />
                    <Row2 l1="Type of Business" v1={data.typeOfBusiness} l2="Nature of Business" v2={data.natureOfBusiness} />
                    <Row2 l1="Website" v1={data.website} l2="Address" v2={[data.city, data.state, data.country].filter(Boolean).join(', ')} />
                </Section>

                {/* Primary Contact */}
                <Section title="Primary Contact">
                    <Row3
                        l1="Name" v1={`${data.contact1?.title || ''} ${data.contact1?.firstName || ''} ${data.contact1?.lastName || ''}`.trim()}
                        l2="Designation" v2={data.contact1?.designation}
                        l3="Mobile" v3={data.contact1?.mobile}
                    />
                    <Row2 l1="Email" v1={data.contact1?.email} l2="Alternate No." v2={data.contact1?.alternateNo} />
                </Section>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-3 pt-2">
                    <button onClick={() => setActiveTab('profile')} className="px-5 py-2 bg-slate-800 text-white text-[11px] font-bold uppercase tracking-widest rounded-[2px] hover:bg-slate-900 transition-all">
                        View Full Profile
                    </button>
                    <button onClick={() => setActiveTab('invoices')} className="px-5 py-2 bg-[#23471d] text-white text-[11px] font-bold uppercase tracking-widest rounded-[2px] hover:bg-[#1a3516] transition-all">
                        View Invoices
                    </button>
                    <button onClick={() => openPrintWindow(data)} className="flex items-center gap-2 px-5 py-2 border border-slate-300 text-slate-600 text-[11px] font-bold uppercase tracking-widest rounded-[2px] hover:bg-slate-50 transition-all">
                        <Printer size={13} /> Print Certificate
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
