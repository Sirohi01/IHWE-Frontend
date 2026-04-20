import React, { useEffect, useState } from 'react';
import { psmClaimApi } from '@/services/psmClaimApi';
import { useNavigate, useParams } from 'react-router-dom';
import { Pencil, Trash2, Printer, Plus, FileText, Loader2, AlertCircle, TableProperties } from 'lucide-react';
import { toast } from 'sonner';

const reportLabels: Record<string, string> = {
    'annexure-c': 'Annexure C',
    'annexure-d': 'Annexure D',
    'declaration': 'Declaration',
    'feedback-report': 'Feedback Report',
    'undertaking': 'Undertaking',
    'pre-receipt': 'Pre-Receipt',
    'participants-feedback': 'Participants Feedback',
    'mandate-form': 'Mandate Form',
    'pfms-details': 'PFMS Details',
};

const PsmReportsTable: React.FC = () => {
    const { type } = useParams<{ type?: string }>();
    const [reports, setReports] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchReports = async () => {
        setLoading(true);
        try {
            const res = await psmClaimApi.getAllReports();
            if (res.success) {
                // Filter by type if provided in URL
                if (type) {
                    setReports(res.data.filter((r: any) => r.reportType === type));
                } else {
                    setReports(res.data);
                }
            }
        } catch (error) {
            toast.error('Failed to fetch reports');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, [type]);

    const handleDelete = async (rType: string, id: string) => {
        if (!confirm('Are you sure you want to delete this report?')) return;
        try {
            const res = await psmClaimApi.deleteReport(rType, id);
            if (res.success) {
                toast.success('Report deleted');
                fetchReports();
            }
        } catch (error) {
            toast.error('Delete failed');
        }
    };

    const handleEdit = (rType: string, id: string) => {
        navigate(`/exhibitor-dashboard/psm-claim/reports/${rType}/${id}`);
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-[#23471d]" />
                <p className="text-slate-500 font-medium animate-pulse">Loading {type ? reportLabels[type] : ''} reports...</p>
            </div>
        );
    }

    const title = type ? `${reportLabels[type]} Table` : 'All Reports Table';
    const subtitle = type ? `Manage all your submitted ${reportLabels[type]} documents` : 'Manage all your submitted claim documents in one place';

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#23471d]/10 text-[#23471d] rounded-lg flex items-center justify-center ring-4 ring-[#23471d]/5">
                        <TableProperties size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-800">{title}</h1>
                        <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>
                    </div>
                </div>
                <button
                    onClick={() => navigate(type ? `/exhibitor-dashboard/psm-claim/reports/${type}` : '/exhibitor-dashboard/psm-claim/reports')}
                    className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#23471d] text-white rounded-lg hover:bg-[#1a3516] transition-all shadow-sm active:scale-95 font-bold text-sm tracking-wide"
                >
                    <Plus size={18} />
                    New {type ? reportLabels[type] : 'Report'}
                </button>
            </div>

            {reports.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-xl p-16 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-300">
                        <FileText size={40} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-700">No reports found for this category</h3>
                    <p className="text-sm text-slate-400 max-w-sm mt-1">You haven't created any {type ? reportLabels[type] : 'claim'} reports yet. Start by creating a new one today.</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-left">Exhibition / Event Name</th>
                                    {type === 'annexure-c' && (
                                        <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">App No.</th>
                                    )}
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Created By</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Date</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Status</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {reports.map((report) => (
                                    <tr key={report._id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-slate-100 text-slate-500 rounded-lg group-hover:bg-[#23471d]/10 group-hover:text-[#23471d] transition-colors">
                                                    <FileText size={18} />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-sm text-slate-700">
                                                        {report.fairName || report.data?.['6. Title of the event'] || reportLabels[report.reportType] || report.reportType}
                                                    </span>
                                                    <span className="text-[10px] text-slate-400 font-medium">{reportLabels[report.reportType]} | ID: {report._id.slice(-6).toUpperCase()}</span>
                                                </div>
                                            </div>
                                        </td>
                                        
                                        {/* Dynamic Content Columns */}
                                        {type === 'annexure-c' && (
                                            <td className="px-6 py-4 text-sm text-slate-600 text-center font-bold font-mono">
                                                {report.applicationNo || 'N/A'}
                                            </td>
                                        )}
                                        
                                        <td className="px-6 py-4 text-sm text-slate-600 text-center font-medium">
                                            {report.companyName || report.data?.['A. NAME OF ACCOUNT HOLDERER / FIRM'] || report.data?.['2. Name of the Applicant Unit'] || 'System User'}
                                        </td>
                                        
                                        <td className="px-6 py-4 font-semibold text-slate-600 text-sm text-center">
                                            {report.date || new Date(report.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${report.status === 'approved' ? 'bg-green-100 text-green-700' :
                                                report.status === 'draft' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                                                }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${report.status === 'approved' ? 'bg-green-600' :
                                                    report.status === 'draft' ? 'bg-amber-600' : 'bg-blue-600'
                                                    }`} />
                                                {report.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-1">
                                                <button
                                                    onClick={() => handleEdit(report.reportType, report._id)}
                                                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                                    title="Edit"
                                                >
                                                    <Pencil size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(report.reportType, report._id)}
                                                    className="p-2 text-slate-400 hover:text-[#23471d] hover:bg-[#23471d]/10 rounded-lg transition-all"
                                                    title="Print"
                                                >
                                                    <Printer size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(report.reportType, report._id)}
                                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 text-blue-800">
                <AlertCircle size={20} className="shrink-0 text-blue-400" />
                <p className="text-xs font-medium leading-relaxed">
                    All reports are securely stored. Draft versions can be edited and resubmitted until they are marked as completed or approved by the administrator.
                </p>
            </div>
        </div>
    );
};

export default PsmReportsTable;
