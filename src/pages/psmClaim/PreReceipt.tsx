import React, { useRef, useState, useEffect } from 'react';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import { toast } from 'sonner';
import { psmClaimApi } from '@/services/psmClaimApi';
import { useReportActions } from './common/useReportActions';
import ReportLayout from './common/ReportLayout';
import { Loader2 } from 'lucide-react';

interface PreReceiptProps {
    reportId?: string;
}

const PreReceipt: React.FC<PreReceiptProps> = ({ reportId }) => {
    const { data: ctxData } = useExhibitorCtx() || {};
    const componentRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(!!reportId);

    const [formData, setFormData] = useState({
        amount: '',
        amountInWords: '',
        fairName: ctxData?.fairName || 'International Health & Wellness Expo 2026',
        fromDate: '2026-05-18',
        toDate: '2026-05-20',
        venue: 'New Delhi',
        signatoryName: ctxData?.contactName || '',
        designation: 'Proprietor',
        date: new Date().toISOString().split('T')[0],
        companyName: ctxData?.companyName || ''
    });

    const {
        saving,
        isExporting,
        handleSave,
        handlePrint,
        handleDownload
    } = useReportActions({
        reportType: 'pre-receipt',
        reportId,
        formData,
        componentRef,
        exhibitorId: ctxData?._id
    });

    useEffect(() => {
        if (reportId) {
            const loadData = async () => {
                try {
                    const res = await psmClaimApi.getReportById('pre-receipt', reportId);
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
            title="Pre-Receipt"
            componentRef={componentRef}
            handlePrint={handlePrint}
            handleDownload={handleDownload}
            handleSave={handleSave}
            saving={saving}
            reportId={reportId}
            isExporting={isExporting}
        >
            <div className="text-right mb-4 mt-5">
                <span className="font-bold underline text-[18px]">Annexure</span>
            </div>

            <div className="text-center mb-6">
                <h1 className="text-[20px] font-bold underline">PRE- RECEIPT</h1>
                <p className="font-bold text-[15px] mt-2 uppercase">(TO BE SUBMITTED ON THE LETTER HEAD OF THE COMPANY)</p>
            </div>

            <div className="space-y-4 text-justify mt-10 text-[16px] leading-[1.8]">
                <div className="flex items-end gap-x-2">
                    <span>Received a sum of Rs.</span>
                    <input
                        type="text"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        className="flex-1 border-b border-black outline-none px-1 bg-transparent font-bold"
                    />
                </div>

                <div className="flex items-end gap-x-2">
                    <span>(Rupees</span>
                    <input
                        type="text"
                        value={formData.amountInWords}
                        onChange={(e) => setFormData({ ...formData, amountInWords: e.target.value })}
                        className="flex-1 border-b border-black outline-none px-1 bg-transparent font-bold"
                    />
                    <span>Only)</span>
                </div>

                <p className="inline">
                    From the office of Development Commissioner (MSME), Govt. of India, Ministry of Micro, Small & Medium Enterprise (MSME) on account of financial assistance under component 5(I)(A): Participation of Individual MSE in Domestic Trade Fair/Exhibition:
                    <input
                        type="text"
                        value={formData.fairName}
                        onChange={(e) => setFormData({ ...formData, fairName: e.target.value })}
                        className="border-b border-black outline-none px-1 inline-block min-w-[300px] bg-transparent font-bold mx-1"
                    />
                    (Name of Fair) from
                    <div className={`${isExporting ? 'hidden' : 'no-print'} inline-block mx-1`}>
                        <input
                            type="date"
                            value={formData.fromDate}
                            onChange={(e) => setFormData({ ...formData, fromDate: e.target.value })}
                            className="border-b border-black outline-none px-1 w-32 bg-transparent font-bold text-center border-none"
                        />
                    </div>
                    <div className={`${isExporting ? 'inline-block' : 'hidden print:inline-block'} border-b border-black min-w-[80px] font-bold text-center mx-1 print-bold`}>
                        {formData.fromDate ? new Date(formData.fromDate).toLocaleDateString('en-GB') : ''}
                    </div>
                    to
                    <div className={`${isExporting ? 'hidden' : 'no-print'} inline-block mx-1`}>
                        <input
                            type="date"
                            value={formData.toDate}
                            onChange={(e) => setFormData({ ...formData, toDate: e.target.value })}
                            className="border-b border-black outline-none px-1 w-32 bg-transparent font-bold text-center border-none"
                        />
                    </div>
                    <div className={`${isExporting ? 'inline-block' : 'hidden print:inline-block'} border-b border-black min-w-[80px] font-bold text-center mx-1 print-bold`}>
                        {formData.toDate ? new Date(formData.toDate).toLocaleDateString('en-GB') : ''}
                    </div>
                    held at
                    <input
                        type="text"
                        value={formData.venue}
                        onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                        className="border-b border-black outline-none px-1 inline-block min-w-[150px] bg-transparent font-bold mx-1"
                    />
                    (Venue) under Procurement and Marketing Support (PMS) Scheme of the Office of Development Commissioner (MSME).
                </p>

                <div className="mt-12 flex flex-col items-end pt-10">
                    <div className="flex gap-2 items-center mb-6 mr-10 font-bold">
                        <span>Date:</span>
                        <div className={`${isExporting ? 'hidden' : 'no-print'}`}>
                            <input
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="border-b border-black outline-none px-1 w-32 bg-transparent font-bold"
                            />
                        </div>
                        <div className={`${isExporting ? 'block print-bold' : 'hidden print:block'} border-b border-black min-w-[100px] font-bold text-center`}>
                            {formData.date ? new Date(formData.date).toLocaleDateString('en-GB') : ''}
                        </div>
                    </div>

                    <div className="border border-black w-28 h-36 flex items-center justify-center p-2 text-center text-[11px] leading-tight mb-6">
                        Affix the Revenue stamp
                    </div>

                    <div className="text-center w-80">
                        <p className="font-bold uppercase text-[14px]">Signature of Authorized Signatory</p>
                        <div className="flex flex-col gap-1 mt-4">
                            <div className="flex gap-1 items-center justify-center italic text-[14px] font-bold">
                                <span>(</span>
                                <input
                                    type="text"
                                    value={formData.signatoryName}
                                    onChange={(e) => setFormData({ ...formData, signatoryName: e.target.value })}
                                    className="border-b border-black outline-none px-1 w-32 bg-transparent text-center font-bold"
                                />
                                <span>&</span>
                                <input
                                    type="text"
                                    value={formData.designation}
                                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                                    className="border-b border-black outline-none px-1 w-24 bg-transparent text-center font-bold"
                                />
                                <span>)</span>
                            </div>
                            <p className="font-bold text-[11px] mt-1">(Name & Designation)</p>
                        </div>
                    </div>
                </div>

                <div className="mt-16">
                    <p className="font-bold text-[14px]">(<span className="underline">Note</span>: To be submitted in Triplicate)</p>
                </div>
            </div>
        </ReportLayout>
    );
};

export default PreReceipt;
