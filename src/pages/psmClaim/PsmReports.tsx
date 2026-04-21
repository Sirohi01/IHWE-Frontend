import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FileText, ArrowLeft, ChevronRight, ClipboardCheck, ScrollText, BadgeCheck, ShieldCheck, Receipt, MessageSquare } from 'lucide-react';
import AnnexureC from './AnnexureC';
import AnnexureD from './AnnexureD';
import Declaration from './Declaration';
import FeedbackReport from './FeedbackReport';
import Undertaking from './Undertaking';
import PreReceipt from './PreReceipt';

import MandateForm from './MandateForm';
import PfmsDetails from './PfmsDetails';
import CoveringLetter from './CoveringLetter';
import NarrativeFeedback from './NarrativeFeedback';

const reportTypes = [
    {
        id: 'annexure-c',
        label: 'Annexure C',
        desc: 'Details of Participation and claim components',
        icon: ScrollText,
        color: 'bg-blue-500'
    },
    {
        id: 'annexure-d',
        label: 'Annexure D',
        desc: 'Details of Stall Designing and claim components',
        icon: ScrollText,
        color: 'bg-blue-500'
    },
    {
        id: 'declaration',
        label: 'Declaration',
        desc: 'Official declaration for claim eligibility',
        icon: BadgeCheck,
        color: 'bg-emerald-500'
    },
    {
        id: 'feedback-report',
        label: 'Feedback Report',
        desc: 'Participant feedback for the PMS Scheme',
        icon: ClipboardCheck,
        color: 'bg-[#23471d]'
    },
    {
        id: 'undertaking',
        label: 'Undertaking',
        desc: 'Legal undertaking regarding participation criteria',
        icon: ShieldCheck,
        color: 'bg-orange-500'
    },
    {
        id: 'pre-receipt',
        label: 'Pre-Receipt',
        desc: 'Advance receipt acknowledgment for claim amount',
        icon: Receipt,
        color: 'bg-purple-500'
    },
    {
        id: 'mandate-form',
        label: 'Mandate Form',
        desc: 'Mandate form for the PMS Scheme',
        icon: ClipboardCheck,
        color: 'bg-green-500'
    },
    {
        id: 'pfms-details',
        label: 'PFMS Details',
        desc: 'Details of Enterprise for agency creation on PFMS portal',
        icon: ScrollText,
        color: 'bg-indigo-500'
    },
    {
        id: 'covering-letter',
        label: 'Covering Letter',
        desc: 'Formal request letter for MSME Scheme Reimbursement',
        icon: FileText,
        color: 'bg-rose-500'
    },
    {
        id: 'narrative-feedback',
        label: 'Narrative Feedback',
        desc: 'Detailed descriptive feedback about event participation',
        icon: MessageSquare,
        color: 'bg-teal-500'
    }
];

const PsmReports: React.FC = () => {
    const { type, id } = useParams();
    const navigate = useNavigate();

    const renderForm = () => {
        switch (type) {
            case 'annexure-c': return <AnnexureC reportId={id} />;
            case 'annexure-d': return <AnnexureD reportId={id} />;
            case 'declaration': return <Declaration reportId={id} />;
            case 'feedback-report': return <FeedbackReport reportId={id} />;
            case 'undertaking': return <Undertaking reportId={id} />;
            case 'pre-receipt': return <PreReceipt reportId={id} />;
            case 'mandate-form': return <MandateForm reportId={id} />;
            case 'pfms-details': return <PfmsDetails reportId={id} />;
            case 'covering-letter': return <CoveringLetter reportId={id} />;
            case 'narrative-feedback': return <NarrativeFeedback reportId={id} />;
            default: return null;
        }
    };

    if (type) {
        return (
            <div className="w-full">
                {renderForm()}
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-8 space-y-12">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-extrabold text-[#23471d] tracking-tight">Select Report Type</h1>
                <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
                    Choose the claim document you wish to prepare. All data is saved automatically to your reports table.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {reportTypes.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => navigate(`/exhibitor-dashboard/psm-claim/reports/${item.id}`)}
                        className="group relative bg-white border border-slate-200 p-8 rounded-[2rem] text-left hover:border-[#23471d]/30 hover:shadow-2xl hover:shadow-[#23471d]/5 transition-all duration-500 overflow-hidden"
                    >
                        {/* Decorative background circle */}
                        <div className={`absolute -right-12 -top-12 w-32 h-32 ${item.color} opacity-[0.03] rounded-full group-hover:scale-150 transition-transform duration-700`} />

                        <div className="relative z-10 space-y-6">
                            <div className={`w-16 h-16 ${item.color} text-white rounded-2xl flex items-center justify-center transform group-hover:rotate-6 transition-all duration-500 shadow-xl shadow-slate-200`}>
                                <item.icon size={32} />
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold text-slate-800 tracking-tight">{item.label}</h3>
                                <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                            </div>

                            <div className="flex items-center gap-2 text-[#23471d] font-bold text-sm uppercase tracking-widest pt-2 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                                Create Now <ChevronRight size={16} />
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PsmReports;
