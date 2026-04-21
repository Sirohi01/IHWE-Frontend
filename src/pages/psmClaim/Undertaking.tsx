import React, { useRef, useState, useEffect } from 'react';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import { psmClaimApi } from '@/services/psmClaimApi';
import { toast } from 'sonner';
import { useReportActions } from './common/useReportActions';
import ReportLayout from './common/ReportLayout';
import { Loader2 } from 'lucide-react';

interface Props { reportId?: string; }

const Undertaking: React.FC<Props> = ({ reportId }) => {
    const { data: ctxData } = useExhibitorCtx() || {};
    const componentRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(!!reportId);

    const [formData, setFormData] = useState({
        name: ctxData?.contactName || '',
        parentName: '',
        designation: 'Proprietor',
        companyName: ctxData?.companyName || '',
        udyamNumber: ctxData?.udyamNumber || '',
        officeAddress: ctxData?.address || '',
        factoryAddress: ctxData?.address || '',
        manufacturingActivity: '',
        exhibitionName: ctxData?.fairName || 'International Health & Wellness Expo 2026',
        stallNo: ctxData?.stallNumber || '',
        venue: 'New Delhi',
        pincode: '110001',
        fromDate: '2026-05-18',
        toDate: '2026-05-20',
        finYear: '2025-26',
        signatoryName: ctxData?.contactName || ''
    });

    const {
        saving,
        isExporting,
        handleSave,
        handlePrint,
        handleDownload
    } = useReportActions({
        reportType: 'undertaking',
        reportId,
        formData,
        componentRef,
        exhibitorId: ctxData?._id
    });

    useEffect(() => {
        if (reportId) {
            const loadData = async () => {
                try {
                    const res = await psmClaimApi.getReportById('undertaking', reportId);
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
            title="Undertaking"
            componentRef={componentRef}
            handlePrint={handlePrint}
            handleDownload={handleDownload}
            handleSave={handleSave}
            saving={saving}
            reportId={reportId}
            isExporting={isExporting}
        >
            <div className="text-center mb-12">
                <h1 className="text-[18px] font-bold uppercase underline">UNDERTAKING</h1>
                <p className="font-medium text-[14px] mt-1">[For reimbursement under Procurement & Marketing Support (PMS) Scheme]</p>
            </div>

            <div className="space-y-6 text-justify text-[13px] leading-relaxed">
                <p className="leading-[2]">
                    I, <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="border-b border-black outline-none px-1 w-64 bg-transparent font-bold" />
                    S/D/o Sh. <input type="text" value={formData.parentName} onChange={(e) => setFormData({ ...formData, parentName: e.target.value })} className="border-b border-black outline-none px-1 w-64 bg-transparent font-bold" />,
                    <select value={formData.designation} onChange={(e) => setFormData({ ...formData, designation: e.target.value })} className="border-b border-black outline-none bg-transparent font-bold cursor-pointer">
                        <option value="Proprietor">Proprietor</option>
                        <option value="Partner">Partner</option>
                        <option value="Director">Director</option>
                    </select> of M/s
                    <input type="text" value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} className="border-b border-black outline-none px-1 w-[400px] bg-transparent font-bold mx-1" />
                    bearing Udyog Aadhaar Memorandum (UAM)/ Udyam Registration (UR) No.
                    <input type="text" value={formData.udyamNumber} onChange={(e) => setFormData({ ...formData, udyamNumber: e.target.value })} className="border-b border-black outline-none px-1 w-80 bg-transparent font-bold mt-1" />
                    located at Registered Office address of the unit/ enterprise:
                    <textarea value={formData.officeAddress} onChange={(e) => setFormData({ ...formData, officeAddress: e.target.value })} className="border-b border-black outline-none px-1 w-full bg-transparent font-bold resize-none min-h-[1.8em] mt-1" rows={1} />,
                    Factory address of the unit/ enterprise:
                    <textarea value={formData.factoryAddress} onChange={(e) => setFormData({ ...formData, factoryAddress: e.target.value })} className="border-b border-black outline-none px-1 w-full bg-transparent font-bold resize-none min-h-[1.8em] mt-1" rows={1} />
                    engaged in the manufacturing activity of
                    <input type="text" value={formData.manufacturingActivity} onChange={(e) => setFormData({ ...formData, manufacturingActivity: e.target.value })} className="border-b border-black outline-none px-1 w-full bg-transparent font-bold mt-1" />
                    do hereby confirm that the information given by me is correct and accurate. M/s
                    <span className="font-bold underline px-1 whitespace-nowrap">{formData.companyName}</span> is eligible for reimbursement as per the Procurement & Marketing Support (PMS) Scheme guidelines. In case if, any information given above is found incorrect/ ineligible, then, I shall be liable to return the entire amount of reimbursement alongwith the prevailing rate of interest to the Government of India.
                </p>

                <p className="leading-[2]">
                    2. That the aforesaid unit/ enterprise had participated in the Fair/ Exhibition
                    <input type="text" value={formData.exhibitionName} onChange={(e) => setFormData({ ...formData, exhibitionName: e.target.value })} className="border-b border-black outline-none px-1 w-full bg-transparent font-bold" />
                    at stall No. <input type="text" value={formData.stallNo} onChange={(e) => setFormData({ ...formData, stallNo: e.target.value })} className="border-b border-black outline-none px-1 w-24 bg-transparent font-bold text-center" />
                    held at <input type="text" value={formData.venue} onChange={(e) => setFormData({ ...formData, venue: e.target.value })} className="border-b border-black outline-none px-1 w-40 bg-transparent font-bold" />
                    pin code <input type="text" value={formData.pincode} onChange={(e) => setFormData({ ...formData, pincode: e.target.value })} className="border-b border-black outline-none px-1 w-24 bg-transparent font-bold text-center" />
                    from
                    <div className={`${isExporting ? 'hidden' : 'no-print'} inline-block mx-1`}>
                        <input type="date" value={formData.fromDate} onChange={(e) => setFormData({ ...formData, fromDate: e.target.value })} className="border-b border-black outline-none px-1 w-32 bg-transparent font-bold text-center" />
                    </div>
                    <div className={`${isExporting ? 'inline-block' : 'hidden print:inline-block'} border-b border-black min-w-[100px] font-bold text-center print-bold`}>
                        {formData.fromDate ? new Date(formData.fromDate).toLocaleDateString('en-GB') : ''}
                    </div>
                    to
                    <div className={`${isExporting ? 'hidden' : 'no-print'} inline-block mx-1`}>
                        <input type="date" value={formData.toDate} onChange={(e) => setFormData({ ...formData, toDate: e.target.value })} className="border-b border-black outline-none px-1 w-32 bg-transparent font-bold text-center" />
                    </div>
                    <div className={`${isExporting ? 'inline-block' : 'hidden print:inline-block'} border-b border-black min-w-[100px] font-bold text-center print-bold`}>
                        {formData.toDate ? new Date(formData.toDate).toLocaleDateString('en-GB') : ''}
                    </div>
                    under Procurement & Marketing Support (PMS) Scheme during the financial year
                    <input 
                        type="text" 
                        value={formData.finYear.split('-')[0]} 
                        onChange={(e) => {
                            const val = e.target.value;
                            const [y1, y2] = formData.finYear.split('-');
                            setFormData({ ...formData, finYear: `${val}-${y2}` });
                        }}
                        className="border-b border-black outline-none w-14 text-center bg-transparent font-bold ml-1" 
                    /> 
                    - 
                    <input 
                        type="text" 
                        value={formData.finYear.split('-')[1]} 
                        onChange={(e) => {
                            const val = e.target.value;
                            const [y1, y2] = formData.finYear.split('-');
                            setFormData({ ...formData, finYear: `${y1}-${val}` });
                        }}
                        className="border-b border-black outline-none w-10 text-center bg-transparent font-bold" 
                    /> .
                </p>

                <p className="mt-12">
                    I do hereby solemnly affirm that the above mentioned information is correct and to the best of my knowledge.
                </p>
            </div>

            <div className="mt-16 flex flex-col items-end pt-10">
                <div className="text-center w-80">
                    <p className="flex justify-center items-center gap-1 font-bold">
                        ( <input type="text" value={formData.signatoryName} onChange={(e) => setFormData({ ...formData, signatoryName: e.target.value })} className="border-b border-black outline-none px-1 w-full bg-transparent text-center font-bold" /> )
                    </p>
                    <p className="font-bold mt-2 uppercase text-[12px]">Signature</p>
                    <p className="font-bold text-[11px] text-slate-600">Proprietor/ Partner/ Director</p>
                    <p className="font-bold italic text-[10px] mt-4 opacity-50">With Office seal</p>
                </div>
            </div>
        </ReportLayout>
    );
};

export default Undertaking;
