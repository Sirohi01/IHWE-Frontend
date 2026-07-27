import React, { useRef, useState, useEffect } from 'react';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import { psmClaimApi } from '@/services/psmClaimApi';
import { toast } from 'sonner';
import { useReportActions } from './common/useReportActions';
import ReportLayout from './common/ReportLayout';
import { Loader2 } from 'lucide-react';

interface AnnexureCProps {
    reportId?: string;
}

const AnnexureC: React.FC<AnnexureCProps> = ({ reportId }) => {
    const { data: ctxData } = useExhibitorCtx() || {};
    const componentRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(!!reportId);

    const [formData, setFormData] = React.useState({
        fairName: ctxData?.fairName || '',
        companyName: ctxData?.companyName || '',
        applicationNo: '',
        additionalCopies: 'No',
        date: '',
        checks: {} as Record<number, boolean>,
        pages: {} as Record<number, string>
    });

    const {
        saving,
        isExporting,
        handleSave,
        handlePrint,
        handleDownload
    } = useReportActions({
        reportType: 'annexure-c',
        reportId,
        formData,
        componentRef,
        exhibitorId: ctxData?._id
    });

    useEffect(() => {
        if (reportId) {
            const loadData = async () => {
                try {
                    const res = await psmClaimApi.getReportById('annexure-c', reportId);
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

    const updateCheck = (id: number) => {
        setFormData(prev => ({
            ...prev,
            checks: { ...prev.checks, [id]: !prev.checks[id] }
        }));
    };

    const updatePage = (id: number, val: string) => {
        setFormData(prev => ({
            ...prev,
            pages: { ...prev.pages, [id]: val }
        }));
    };

    const checklistItems = [
        { id: 1, text: "Covering letter on Letter Head of unit/ enterprise", pg: "" },
        { id: 2, text: "Claim Form (Annexure - D) filled by the unit/ enterprise", pg: "" },
        { id: 3, text: "Print out of Online Application Form No. : UAM/DTF/ _______", pg: "" },
        { id: 4, text: "Copy of UDYAM Regn. Certificate (self certified)", pg: "" },
        { id: 5, text: "Original Invoice(s)/ Bill(s)", pg: "" },
        { id: 6, text: "Original Receipt Voucher(s)", pg: "" },
        { id: 7, text: "Participants Feed Back Report with photos (02)", pg: "" },
        { id: 8, text: "Original Mandate Form (duly verified by the Bank)", pg: "" },
        { id: 9, text: "Cancelled cheque of the concerned bank (original)", pg: "" },
        { id: 10, text: "Original Pre-Receipt (signed & stamped) (In triplicate)", pg: "" },
        {
            id: 11, text: "Details of Agency creation for PFMS", pg: "", subItems: [
                { left: "(i) Name of the unit/ enterprise, complete postal address of unit/ enterprise with e-mail & mobile number (as given in Udyam Regn Certificate).", right: "" },
                { left: "(ii) Name of the Director(s)/ Proprietor/ Partner(s)", right: "" },
                { left: "(iii) Date of Birth", right: "(dd/mm/yyyy)" },
                { left: "(iv) Gender", right: "(Male/ Female/ Transgender)" },
                { left: "(v) Aadhaar Card Details", right: "(Director(s)/ Proprietor/ Partners)" },
                { left: "(vi) Udyam Registration Certificate details.", right: "" },
                { left: "(vii) GST Number (enclose a copy of certificate issued by an Appropriate Authority)", right: "" },
                { left: "(viii) Bank details (Bank Account Number, Name of Bank, Branch name, IFSC, MICR of Branch).", right: "" },
                { left: "(ix) Aadhaar linked Bank Account Number", right: "" }
            ]
        },
        { id: 12, text: "Copy of Aadhaar Card(s) (Director(s)/ Proprietor/ Partners)", pg: "" },
        { id: 13, text: "Copy of GST Registration Certificate", pg: "" },
        { id: 14, text: "Other related documents (PAN card) etc.", pg: "" },
    ];

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-blue-600" /></div>;

    return (
        <ReportLayout
            title="Annexure C"
            componentRef={componentRef}
            handlePrint={handlePrint}
            handleDownload={handleDownload}
            handleSave={handleSave}
            saving={saving}
            reportId={reportId}
            isExporting={isExporting}
        >
            <div className="text-center mb-2 mt-0">
                <h1 className="text-[16px] font-extrabold uppercase tracking-tight underline decoration-2 underline-offset-4 mb-1">ANNEXURE – C</h1>
                <h2 className="text-[14px] font-bold underline decoration-1 underline-offset-4 max-w-2xl mx-auto">
                    Check-list for reimbursement of claims under Component 5(A) : PMS Scheme
                </h2>
            </div>

            <div className="space-y-4 text-[13px] print:text-[11px]">
                <div className="space-y-3">
                    <div className="flex items-end gap-2">
                        <span className="shrink-0 font-bold text-[10px] print:text-black">Name of the Fair/ Exhibition:</span>
                        <input
                            type="text"
                            value={formData.fairName}
                            onChange={(e) => setFormData({ ...formData, fairName: e.target.value })}
                            className="flex-1 border-b border-black px-1 font-medium bg-transparent outline-none"
                            placeholder="Enter Name of the Fair/ Exhibition"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <span className="font-bold text-[10px] print:text-black">The following documents/ information have been received for reimbursement under PMS Scheme from</span>
                        <div className="flex items-end gap-2">
                            <span className="font-bold text-[11px] shrink-0">M/s</span>
                            <input
                                type="text"
                                value={formData.companyName}
                                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                className="border-b border-black flex-1 px-1 font-bold bg-transparent outline-none"
                                placeholder="Enter Company Name"
                            />
                        </div>
                    </div>

                    <div className="text-right italic font-bold text-[10px] print:text-black pr-2">
                        (Two additional copies submitted : {formData.additionalCopies})
                        <div className="no-print mt-1">
                            {['Yes', 'No'].map(opt => (
                                <button
                                    key={opt}
                                    onClick={() => setFormData({ ...formData, additionalCopies: opt })}
                                    className={`ml-2 px-2 py-0.5 border border-slate-300 rounded text-[10px] ${formData.additionalCopies === opt ? 'bg-[#23471d] text-white border-[#23471d]' : 'bg-white'}`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <table className="w-full border-collapse">
                    <thead>
                        <tr className="font-bold border-b border-black/80 bg-slate-100/50">
                            <th className="py-1.5 px-1 w-12 text-center text-[10px]">S. No.</th>
                            <th className="py-1.5 px-3 text-left text-[10px]">Particulars</th>
                            <th className="py-1.5 px-1 text-center w-36 text-[8px] leading-tight">
                                <div className="uppercase whitespace-nowrap">(PUT '✓' OR 'x' IN BOX)</div>
                            </th>
                            <th className="py-1.5 px-1 text-center w-14 text-[9px] leading-tight font-bold">
                                Pg No.
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {checklistItems.map((item) => (
                            <React.Fragment key={item.id}>
                                <tr className="align-top">
                                    <td className="py-2 px-1 text-center text-[10px]">{item.id}.</td>
                                    <td className="py-2 px-3 font-medium text-[11px]">
                                        {item.id === 3 ? (
                                            <div className="flex items-center gap-1 whitespace-nowrap">
                                                <span className="shrink-0 text-[10.5px]">Print out of Online Application Form No. :</span>
                                                <span className="font-extrabold shrink-0 text-[10.5px]">UAM/DTF/</span>
                                                <input
                                                    type="text"
                                                    value={formData.applicationNo}
                                                    onChange={(e) => setFormData({ ...formData, applicationNo: e.target.value })}
                                                    className="border-b border-black/40 px-1 bg-transparent outline-none flex-1 font-bold min-w-[30px] h-4 text-[10.5px]"
                                                    placeholder="Enter Number"
                                                />
                                            </div>
                                        ) : (
                                            <span className="leading-tight block">{item.text}</span>
                                        )}
                                        {item.subItems && (
                                            <ul className="mt-1 print:mt-0.5 space-y-1 print:space-y-0.5 pl-2 text-[10px] font-normal leading-tight">
                                                {item.subItems.map((sub, idx) => (
                                                    <li key={idx} className="flex justify-between items-start gap-4">
                                                        <div className="flex items-start flex-1 text-justify">
                                                            <span className="shrink-0 font-bold w-6">{sub.left.split(' ')[0]}</span>
                                                            <span className="flex-1">{sub.left.substring(sub.left.indexOf(' ') + 1)}</span>
                                                        </div>
                                                        {sub.right && <span className="shrink-0 italic opacity-80 text-[9px]">{sub.right}</span>}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </td>
                                    <td className="py-2 px-1 text-center">
                                        <div
                                            onClick={() => updateCheck(item.id)}
                                            className="w-4 h-4 border border-black/40 mx-auto cursor-pointer flex items-center justify-center bg-transparent"
                                        >
                                            {formData.checks[item.id] && <span className="text-black font-bold text-[11px]">✓</span>}
                                        </div>
                                    </td>
                                    <td className="py-2 px-1 text-center">
                                        <input
                                            type="text"
                                            value={formData.pages[item.id] || ''}
                                            onChange={(e) => updatePage(item.id, e.target.value)}
                                            className="w-full border-b border-black/20 h-5 bg-transparent outline-none text-center font-bold text-[11px]"
                                            placeholder="Pg"
                                        />
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>

                <div className="pt-4 space-y-8">
                    <p className="text-[10.5px] print:text-[10px] leading-snug">
                        Documents/ information checked and verified the claim of the aforementioned unit / enterprise is found in order and eligible for reimbursement as per PMS Scheme guidelines.
                    </p>

                    <div className="flex justify-between items-end pr-4">
                        <div className="w-48 text-left">
                            <div className="no-print">
                                <input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="border-b border-black mb-0.5 w-40 bg-transparent outline-none text-[10.5px]"
                                />
                            </div>
                            <div className={`${isExporting ? 'block font-bold' : 'hidden print:block'} border-b border-black mb-0.5 w-32 min-h-[3em] text-[10.5px] flex items-end pb-1`}>
                                {formData.date ? new Date(formData.date).toLocaleDateString('en-GB') : ''}
                            </div>
                            <span className="block text-[9px] font-bold uppercase">Date</span>
                        </div>
                        <div className="text-center flex flex-col items-center">
                            <div className="w-48 border-b border-black mb-0.5 h-12"></div>
                            <span className="font-bold uppercase text-[10px]">Signature of the Authorized Signatory</span>
                        </div>
                    </div>
                </div>
            </div>
        </ReportLayout>
    );
};

export default AnnexureC;
