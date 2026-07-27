import React, { useRef, useState, useEffect } from 'react';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import { psmClaimApi } from '@/services/psmClaimApi';
import { toast } from 'sonner';
import { useReportActions } from './common/useReportActions';
import ReportLayout from './common/ReportLayout';
import { Loader2 } from 'lucide-react';

interface Props { reportId?: string; }

const NarrativeFeedback: React.FC<Props> = ({ reportId }) => {
    const { data: ctxData } = useExhibitorCtx() || {};
    const componentRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(!!reportId);

    const defaultContent = `Participating in the 8th International Health and Wellness Expo 2025 at Pragati Maidan was an incredibly rewarding experience. The overall organization and support were commendable.`;

    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        title: 'Namo Gange Feedback',
        content: defaultContent,
        companyName: ctxData?.companyName || '',
        signatoryName: ctxData?.contactName || '',
        designation: 'Partner',
        subDesignation: 'Co Founder'
    });

    const {
        saving,
        isExporting,
        handleSave,
        handlePrint,
        handleDownload
    } = useReportActions({
        reportType: 'narrative-feedback',
        reportId,
        formData,
        componentRef,
        exhibitorId: ctxData?._id
    });

    useEffect(() => {
        if (reportId) {
            const loadData = async () => {
                try {
                    const res = await psmClaimApi.getReportById('narrative-feedback', reportId);
                    if (res.success) {
                        setFormData(prev => ({ ...prev, ...res.data }));
                    }
                } catch (error) {
                    toast.error('Failed to load report data');
                } finally {
                    setLoading(false);
                }
            };
            loadData();
        }
    }, [reportId]);

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-blue-600" /></div>;

    return (
        <ReportLayout
            title="Narrative Feedback"
            componentRef={componentRef}
            handlePrint={handlePrint}
            handleDownload={handleDownload}
            handleSave={handleSave}
            saving={saving}
            reportId={reportId}
            isExporting={isExporting}
            showUnderlines={false}
            isLetterhead={true}
        >
            <div className="flex justify-end mb-8 mt-16 print:mt-12">
                <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">Date:</span>
                    <div className={`${isExporting ? 'hidden' : 'no-print'}`}>
                        <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="border-b border-black outline-none px-1 w-36 bg-transparent font-medium"
                        />
                    </div>
                    <div className={`${isExporting ? 'block' : 'hidden print:block'} font-bold`}>
                        {formData.date ? new Date(formData.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) : ''}
                    </div>
                </div>
            </div>

            <div className="text-center mb-12">
                <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="text-xl font-bold text-slate-800 outline-none w-full text-center bg-transparent border-b border-transparent focus:border-black/10 transition-colors"
                    placeholder="Enter Report Title (e.g. Namo Gange Feedback)"
                />
            </div>

            <div className="space-y-6 text-[15px] leading-[1.8] text-justify text-slate-700">
                <div className="relative">
                    <textarea
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        className="w-full min-h-[200px] bg-transparent outline-none resize-none overflow-hidden transition-all print:border-none"
                        // maxLength={200}
                        placeholder="Enter your feedback here (Max 200 characters)..."
                    />
                    <div className="text-[10px] text-slate-400 absolute bottom-0 right-0 no-print">
                        {formData.content.length}/200
                    </div>
                </div>

                <div className="pt-12">
                    <div className="mt-8 flex flex-col gap-1">
                        <div className="w-48 border-b border-black h-8 relative">
                            {/* Signature placeholder */}
                        </div>
                        <p className="font-bold mt-2">
                            Signature of authorized signatory
                        </p>
                    </div>
                </div>
            </div>
        </ReportLayout>
    );
};

export default NarrativeFeedback;
