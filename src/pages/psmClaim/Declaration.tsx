import React, { useEffect, useRef, useState } from 'react';
import { psmClaimApi } from '@/services/psmClaimApi';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import { toast } from 'sonner';
import { useReportActions } from './common/useReportActions';
import ReportLayout from './common/ReportLayout';
import { Loader2 } from 'lucide-react';

interface DeclarationProps {
    reportId?: string;
}

const Declaration: React.FC<DeclarationProps> = ({ reportId }) => {
    const { data: ctxData } = useExhibitorCtx() || {};
    const componentRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(!!reportId);

    const [formData, setFormData] = React.useState({
        fairName: ctxData?.fairName || '',
        companyName: ctxData?.companyName || '',
        place: '',
        date: new Date().toISOString().split('T')[0],
        name: ctxData?.contactName || '',
        designation: '',
        exhibitorId: ctxData?._id
    });

    const {
        saving,
        isExporting,
        handleSave,
        handlePrint,
        handleDownload
    } = useReportActions({
        reportType: 'declaration',
        reportId,
        formData,
        componentRef,
        exhibitorId: ctxData?._id
    });

    useEffect(() => {
        if (reportId) {
            const fetchReport = async () => {
                try {
                    const res = await psmClaimApi.getReportById('declaration', reportId);
                    if (res.success) {
                        setFormData(prev => ({ ...prev, ...res.data }));
                    }
                } catch (error) {
                    toast.error("Failed to load report data");
                } finally {
                    setLoading(false);
                }
            };
            fetchReport();
        }
    }, [reportId]);

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-blue-600" /></div>;

    return (
        <ReportLayout
            title="Declaration"
            componentRef={componentRef}
            handlePrint={handlePrint}
            handleDownload={handleDownload}
            handleSave={handleSave}
            saving={saving}
            reportId={reportId}
            isExporting={isExporting}
        >
            <div className="text-center mb-16 mt-8">
                <h1 className="text-xl font-bold uppercase tracking-widest underline decoration-2 underline-offset-8">DECLARATION</h1>
            </div>

            <div className="space-y-8 text-[15px] print:text-[14px]">
                <p className="font-medium italic">I hereby declare that :</p>

                <div className="flex gap-4 items-start pl-2">
                    <span className="font-bold shrink-0">(a)</span>
                    <p className="text-justify leading-relaxed">
                        Above information is correct and is based on the actual expenditure incurred. In case any of the statement/ information furnished in application / document is later found to be wrong or in correct or misleading, I do hereby bind myself and my unit to pay to the Government on demand the full amount received as reimbursement in respect within seven days of the demand.
                    </p>
                </div>

                <div className="flex gap-4 items-start pl-2">
                    <span className="font-bold shrink-0">(b)</span>
                    <p className="text-justify leading-relaxed">
                        The unit has not claimed/ applied for financial assistance from any other Ministry/ Department of the Government of India or any other State Government or any Government Institute/Agency for the above mentioned trade fair/ packaging consultancy.
                    </p>
                </div>

                {/* Signature Section */}
                <div className="pt-20 flex flex-col items-end mr-10 space-y-4">
                    <div className="w-[300px] space-y-4">
                        {[
                            { label: 'Name', key: 'name' },
                            { label: 'Date', key: 'date', isDate: true },
                            { label: 'Designation', key: 'designation' },
                            { label: 'Place', key: 'place' }
                        ].map((field) => (
                            <div key={field.key} className="flex items-end gap-2">
                                <span className="font-bold w-28 uppercase text-[11px]">{field.label}:</span>
                                <input
                                    type={field.isDate ? 'date' : 'text'}
                                    value={(formData as any)[field.key]}
                                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                                    className={`flex-1 border-b border-black px-1 bg-transparent outline-none focus:border-black transition-colors py-0.5 ${isExporting ? 'hidden' : 'print:hidden'}`}
                                />
                                <div className={`${isExporting ? 'block' : 'hidden print:block'} flex-1 border-b border-black px-1 min-h-[1.5rem] print-bold`}>
                                    {field.isDate
                                        ? ((formData as any)[field.key] ? new Date((formData as any)[field.key]).toLocaleDateString('en-GB') : '.')
                                        : ((formData as any)[field.key] || '.')
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center pt-4 min-w-[250px]">
                        <span className="font-bold uppercase text-[12px]">(Signature of the Authorized Signatory)</span>
                    </div>
                </div>

                {/* Approval Flow Chart */}
                <div className="pt-24 mt-auto">
                    <div className="border border-black p-4 text-center space-y-3">
                        <h3 className="font-bold uppercase text-[12px] underline underline-offset-4">Approval Flow Chart:</h3>
                        <div className="flex items-center justify-center gap-4 text-[12px] font-bold">
                            <span>Claim submission by applicant Unit</span>
                            <span>→</span>
                            <span>Scrutiny</span>
                            <span>→</span>
                            <span>Approval/Sanction/Release to beneficiary unit</span>
                        </div>
                    </div>
                </div>
            </div>
        </ReportLayout>
    );
};

export default Declaration;
