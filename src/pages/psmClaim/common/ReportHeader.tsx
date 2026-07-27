import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface ReportHeaderProps {
    title: string;
}

const ReportHeader: React.FC<ReportHeaderProps> = ({ title }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white border-b border-slate-200 no-print w-full">
            {/* Breadcrumbs Row */}
            <div className="px-6 py-1.5 flex items-center gap-1.5 text-[10px] font-medium text-slate-400 border-b border-slate-100/50">
                <button
                    onClick={() => navigate('/exhibitor-dashboard/msme')}
                    className="hover:text-blue-600 transition-colors uppercase tracking-wider"
                >
                    MSME
                </button>
                <ChevronRight size={10} className="text-slate-300" />
                <button
                    onClick={() => navigate('/exhibitor-dashboard/psm-claim')}
                    className="hover:text-blue-600 transition-colors uppercase tracking-wider"
                >
                    PSM CLAIM
                </button>
                <ChevronRight size={10} className="text-slate-300" />
                <button
                    onClick={() => navigate('/exhibitor-dashboard/psm-claim/reports')}
                    className="hover:text-blue-600 transition-colors uppercase tracking-wider"
                >
                    Reports
                </button>
                <ChevronRight size={10} className="text-slate-300" />
                <span className="text-slate-600 uppercase tracking-wider">{title}</span>
            </div>

            {/* Title Bar */}
            {/* <div className="px-6 py-1 flex justify-between items-center shadow-sm">
                <h1 className="text-lg font-medium text-slate-800 tracking-tight">{title}</h1>
            </div> */}
        </div>
    );
};

export default ReportHeader;
