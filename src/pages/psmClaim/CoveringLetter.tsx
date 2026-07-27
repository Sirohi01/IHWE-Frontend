import React, { useRef, useState, useEffect } from 'react';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import { psmClaimApi } from '@/services/psmClaimApi';
import { toast } from 'sonner';
import { useReportActions } from './common/useReportActions';
import ReportLayout from './common/ReportLayout';
import { Loader2 } from 'lucide-react';

interface Props { reportId?: string; }

const CoveringLetter: React.FC<Props> = ({ reportId }) => {
    const { data: ctxData } = useExhibitorCtx() || {};
    const componentRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(!!reportId);

    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        toDesignation: 'The DFO Ministry of Micro, Small, Medium Enterprises (MSME)',
        subject: 'Regarding MSME Scheme Reimbursement',
        companyName: ctxData?.companyName || '',
        exhibitionName: ctxData?.fairName || '8th International Health & Wellness Expo 2025',
        fromDate: '2025-07-11',
        toDate: '2025-07-13',
        hallNo: '',
        stallNo: '',
        venue: 'Pragatik Maidan, New Delhi',
        signatoryName: ctxData?.contactName || '',
        designation: 'Partner'
    });

    const {
        saving,
        isExporting,
        handleSave,
        handlePrint,
        handleDownload
    } = useReportActions({
        reportType: 'covering-letter',
        reportId,
        formData,
        componentRef,
        exhibitorId: ctxData?._id
    });

    useEffect(() => {
        if (reportId) {
            const loadData = async () => {
                try {
                    const res = await psmClaimApi.getReportById('covering-letter', reportId);
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
            title="Covering Letter"
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

            <div className="space-y-6 text-[14px] leading-relaxed text-justify">
                <div className="space-y-0.5">
                    <div className="flex items-center gap-1">
                        <span className="font-bold">To,</span>
                        <input
                            type="text"
                            value={formData.toDesignation}
                            placeholder='The DFO Ministry of Micro, Small, Medium Enterprises (MSME)'
                            onChange={(e) => setFormData({ ...formData, toDesignation: e.target.value })}
                            className="border-b border-black/20 outline-none w-full bg-transparent font-bold"
                        />
                    </div>
                </div>

                <div className="flex gap-2">
                    <span className="font-bold whitespace-nowrap">Subject-</span>
                    <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="border-b border-black underline outline-none flex-1 bg-transparent font-bold"
                        placeholder="Enter Subject (e.g. Regarding MSME Scheme Reimbursement)"
                    />
                </div>

                <div className="space-y-4">
                    <p>Dear Sir,</p>
                    <div className="leading-loose">
                        We, <span className="font-bold underline">{formData.companyName}</span> had participated as exhibitors in MSME Approved
                        <input
                            type="text"
                            value={formData.exhibitionName}
                            onChange={(e) => setFormData({ ...formData, exhibitionName: e.target.value })}
                            className="border-b border-black outline-none px-1 w-96 bg-transparent font-bold mx-1"
                            placeholder="Enter Exhibition Name"
                        />
                        from
                        <div className={`${isExporting ? 'hidden' : 'no-print'} inline-block mx-1`}>
                            <input type="date" value={formData.fromDate} onChange={(e) => setFormData({ ...formData, fromDate: e.target.value })} className="border-b border-black outline-none px-1 w-32 bg-transparent font-bold text-center" />
                        </div>
                        <div className={`${isExporting ? 'inline-block' : 'hidden print:inline-block'} border-b border-black min-w-[100px] font-bold text-center`}>
                            {formData.fromDate ? new Date(formData.fromDate).toLocaleDateString('en-GB') : ''}
                        </div>
                        to
                        <div className={`${isExporting ? 'hidden' : 'no-print'} inline-block mx-1`}>
                            <input type="date" value={formData.toDate} onChange={(e) => setFormData({ ...formData, toDate: e.target.value })} className="border-b border-black outline-none px-1 w-32 bg-transparent font-bold text-center" />
                        </div>
                        <div className={`${isExporting ? 'inline-block' : 'hidden print:inline-block'} border-b border-black min-w-[100px] font-bold text-center`}>
                            {formData.toDate ? new Date(formData.toDate).toLocaleDateString('en-GB') : ''}
                        </div>
                        held at Hall No. <input type="text" value={formData.hallNo} placeholder="11" onChange={(e) => setFormData({ ...formData, hallNo: e.target.value })} className="border-b border-black outline-none px-1 w-12 bg-transparent font-bold text-center mx-1" />,
                        Stall No. <input type="text" value={formData.stallNo} placeholder="1" onChange={(e) => setFormData({ ...formData, stallNo: e.target.value })} className="border-b border-black outline-none px-1 w-12 bg-transparent font-bold text-center mx-1" />,
                        <input type="text" value={formData.venue} placeholder="Enter Venue" onChange={(e) => setFormData({ ...formData, venue: e.target.value })} className="border-b border-black outline-none px-1 w-64 bg-transparent font-bold mx-1" />.
                        We have duly enclosed all the documents required for MSME Scheme Reimbursement.
                    </div>
                    <p>Request you to kindly acknowledge & consider the same for an earliest refund of the amount, we'll be highly obliged.</p>
                    <p>Thank you for your support and consideration.</p>
                </div>

                <div className="pt-8">
                    <div className="mt-8 flex flex-col gap-1">
                        <div className="w-48 border-b border-black h-8 relative">
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

export default CoveringLetter;
