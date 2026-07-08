import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FileText, ArrowLeft, ChevronRight, ClipboardCheck, ScrollText, BadgeCheck, ShieldCheck, Receipt, MessageSquare, LayoutGrid } from 'lucide-react';

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
    { id: 'annexure-c', label: 'Annexure C', icon: ScrollText },
    { id: 'annexure-d', label: 'Annexure D', icon: ScrollText },
    { id: 'declaration', label: 'Declaration', icon: BadgeCheck },
    { id: 'feedback-report', label: 'Feedback Report', icon: ClipboardCheck },
    { id: 'undertaking', label: 'Undertaking', icon: ShieldCheck },
    { id: 'pre-receipt', label: 'Pre-Receipt', icon: Receipt },
    { id: 'mandate-form', label: 'Mandate Form', icon: ClipboardCheck },
    { id: 'pfms-details', label: 'PFMS Details', icon: ScrollText },
    { id: 'covering-letter', label: 'Covering Letter', icon: FileText },
    { id: 'narrative-feedback', label: 'Narrative Feedback', icon: MessageSquare }
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

    return (
        <div className="min-h-screen bg-slate-50/50 p-4 ">
            <div className="w-full space-y-2">

                {/* TABS NAVIGATION (ALWAYS VISIBLE) */}
                <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-200/60">
                    <div className="flex flex-wrap gap-2">
                        {reportTypes.map((item) => {
                            const isActive = type === item.id;
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => navigate(`/exhibitor-dashboard/psm-claim/reports/${item.id}`)}
                                    className={`flex items-center gap-2 px-2 py-1 rounded-lg text-[10px] font-medium transition-all duration-200 ${isActive
                                        ? 'bg-[#23471d] text-white shadow-sm transform scale-[1.02]'
                                        : 'bg-slate-50 text-slate-600 hover:bg-[#23471d]/5 hover:text-[#23471d] border border-slate-100 hover:border-[#23471d]/20'
                                        }`}
                                >
                                    <Icon size={14} className={isActive ? 'text-white/90' : 'text-slate-400 group-hover:text-[#23471d]/70'} />
                                    {item.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* MAIN CONTENT AREA */}
                <div className="bg-white rounded-lg shadow-sm border border-slate-200/60 p-2 ">
                    {type ? (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 w-full">
                            {renderForm()}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full py-6 text-center space-y-4">
                            <div className="relative">
                                <div className="absolute inset-0 bg-[#23471d]/5 animate-ping rounded-full" />
                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center border-[6px] border-white shadow-lg relative z-10">
                                    <FileText className="text-slate-300" size={32} />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <h3 className="text-xl font-extrabold text-slate-800">Select a Document</h3>
                                <p className="text-slate-500 text-[13px] font-medium max-w-md mx-auto leading-relaxed">
                                    Please choose a document type from the navigation menu above to begin filling out your claim details.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default PsmReports;
