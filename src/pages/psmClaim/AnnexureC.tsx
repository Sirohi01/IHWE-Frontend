import React, { useRef, useState, useEffect } from 'react';
import { Download, Printer, Save, Loader2, ChevronRight } from 'lucide-react';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import { jsPDF } from 'jspdf';
import { toPng } from 'html-to-image';
import { psmClaimApi } from '@/services/psmClaimApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import ReportHeader from './ReportHeader';

interface AnnexureCProps {
    reportId?: string;
}

const AnnexureC: React.FC<AnnexureCProps> = ({ reportId }) => {
    const navigate = useNavigate();
    const { data: ctxData } = useExhibitorCtx() || {};
    const componentRef = useRef<HTMLDivElement>(null);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(!!reportId);
    const [isExporting, setIsExporting] = useState(false);
    const [formData, setFormData] = React.useState({
        fairName: ctxData?.fairName || '',
        companyName: ctxData?.companyName || '',
        applicationNo: '',
        additionalCopies: 'No',
        date: new Date().toISOString().split('T')[0],
        checks: {} as Record<number, boolean>,
        pages: {} as Record<number, string>
    });

    useEffect(() => {
        if (reportId) {
            const loadData = async () => {
                try {
                    const res = await psmClaimApi.getReportById('annexure-c', reportId);
                    if (res.success) {
                        setFormData(res.data);
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

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await psmClaimApi.saveReport('annexure-c', {
                ...formData,
                id: reportId,
                exhibitorId: ctxData?._id
            });
            if (res.success) {
                toast.success(reportId ? 'Report updated' : 'Report saved');
                navigate('/exhibitor-dashboard/psm-claim/reports-table/annexure-c');
            }
        } catch (error) {
            toast.error('Failed to save report');
        } finally {
            setSaving(false);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const handleDownload = async () => {
        if (!componentRef.current) return;
        setIsExporting(true);

        try {
            const dataUrl = await toPng(componentRef.current, {
                quality: 1,
                pixelRatio: 3,
                backgroundColor: '#ffffff',
                filter: (node: HTMLElement) => {
                    if (node.classList && node.classList.contains('no-print')) {
                        return false;
                    }
                    return true;
                },
                style: {
                    boxShadow: 'none',
                    margin: '0',
                    transform: 'none',
                    borderRadius: '0'
                }
            });

            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const imgProps = pdf.getImageProperties(dataUrl);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`AnnexureC_${ctxData?.companyName || 'Document'}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Please try the Print option instead.');
        } finally {
            setIsExporting(false);
        }
    };

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

    return (
        <div className="flex flex-col gap-0 mx-auto min-h-screen bg-slate-50/50">
            <ReportHeader title="Annexure C" />

            <div className="p-4 sm:p-5 flex flex-col items-center">
                <div
                    id="printable-form"
                    ref={componentRef}
                    className="bg-white pt-[10mm] pb-[15mm] px-[15mm] shadow-2xl w-full max-w-[210mm] min-h-[297mm] text-[#000] leading-snug relative overflow-hidden"
                    style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
                >
                    {/* Corner Action Icons - Only visible in Web View */}
                    <div className="absolute top-4 right-4 flex gap-2 no-print">
                        <button
                            onClick={handlePrint}
                            className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full transition-all shadow-sm border border-slate-100 group"
                            title="Print Document"
                        >
                            <Printer size={18} className="group-hover:scale-110 transition-transform" />
                        </button>
                        <button
                            onClick={handleDownload}
                            className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full transition-all shadow-sm border border-slate-100 group"
                            title="Download PDF"
                        >
                            <Download size={18} className="group-hover:scale-110 transition-transform" />
                        </button>
                    </div>
                    {/* Header Decoration for Web View */}

                    <div className="text-center mb-3 mt-0">
                        <h1 className="text-lg font-extrabold uppercase tracking-tight underline decoration-2 underline-offset-4 mb-1.5">ANNEXURE – C</h1>
                        <h2 className="text-[14px] font-bold underline decoration-1 underline-offset-4 max-w-2xl mx-auto">
                            Check-list for reimbursement of claims under Component 5(A) : PMS Scheme
                        </h2>
                    </div>

                    <div className="space-y-4 text-[13px] print:text-[11px]">
                        <div className="space-y-3">
                            <div className="flex items-end gap-2">
                                <span className="shrink-0 font-bold uppercase text-[10px] print:text-black">Name of the Fair/ Exhibition:</span>
                                <input
                                    type="text"
                                    value={formData.fairName}
                                    onChange={(e) => setFormData({ ...formData, fairName: e.target.value })}
                                    className="flex-1 border-b border-black px-1 font-medium bg-transparent outline-none"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <span className="font-bold uppercase text-[10px] print:text-black">The following documents/ information have been received for reimbursement under PMS Scheme from:</span>
                                <div className="flex items-end gap-2">
                                    <span className="font-bold text-[11px] shrink-0">M/s:</span>
                                    <input
                                        type="text"
                                        value={formData.companyName}
                                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                        className="border-b border-black flex-1 px-1 font-bold bg-transparent outline-none"
                                    />
                                </div>
                            </div>

                            <div className="text-right italic font-bold text-[10px] print:text-black pr-4">
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
                                    <th className="py-1.5 px-1 text-center w-20 text-[8px] leading-tight flex-col items-center">
                                        <div className="uppercase">(PUT '✓' OR 'x' IN BOX)</div>
                                    </th>
                                    <th className="py-1.5 px-1 text-center w-14 text-[9px] leading-tight font-bold">
                                        PG NO.
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
                                                />
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>

                        <div className="pt-2 space-y-4">
                            <p className="text-[10.5px] print:text-[10px] leading-snug">
                                Documents/ information checked and verified the claim of the aforementioned unit / enterprise is found in order and eligible for reimbursement as per PMS Scheme guidelines.
                            </p>

                            <div className="flex justify-between items-end pr-10">
                                <div className="w-48 text-left">
                                    <div className="no-print">
                                        <input
                                            type="date"
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            className="border-b border-black mb-0.5 w-40 bg-transparent outline-none text-[10.5px]"
                                        />
                                    </div>
                                    <div className={`${isExporting ? 'block font-bold' : 'hidden print:block'} border-b border-black mb-0.5 w-32 min-h-[1.5em] text-[10.5px]`}>
                                        {formData.date ? new Date(formData.date).toLocaleDateString('en-GB') : ''}
                                    </div>
                                    <span className="block text-[9px] font-bold uppercase">Date</span>
                                </div>
                                <div className="text-center flex flex-col items-center">
                                    <div className="w-48 border-b border-black mb-0.5 h-6"></div>
                                    <span className="font-bold uppercase text-[10px]">Signature of the Authorized Signatory</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Save Button */}
            <div className="flex justify-center mb-12 no-print">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg active:scale-95 font-semibold disabled:opacity-50"
                >
                    {saving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                    {reportId ? 'Update Report' : 'Save Report'}
                </button>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @media print {
                    @page {
                        size: A4;
                        margin: 0;
                    }
                    * {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    html, body {
                        margin: 0 !important;
                        padding: 0 !important;
                        background: white !important;
                    }
                    
                    /* Hide non-essential layout elements */
                    header, nav, aside, footer, 
                    .no-print, .action-bar, .sidebar, .sidebar-overlay,
                    [role="navigation"], button, 
                    .SocialSidebar, .AdminWhatsAppFloat,
                    [class*="ExhibitorNavbar"], [class*="ExhibitorSidebar"],
                    [class*="SocialSidebar"], [class*="AdminWhatsAppFloat"] {
                        display: none !important;
                        height: 0 !important;
                        visibility: hidden !important;
                    }
                    
                    /* Reset body and root for clean print */
                    html, body, #root, #root > div, [class*="Layout"], main, main > div {
                        display: block !important;
                        visibility: visible !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        width: 100% !important;
                        height: auto !important;
                        overflow: visible !important;
                        background: transparent !important;
                        box-shadow: none !important;
                    }

                    #printable-form {
                        display: block !important;
                        visibility: visible !important;
                        width: 100% !important;
                        max-width: none !important;
                        margin: 0 !important;
                        padding: 10mm 15mm !important; /* Reduced padding to fit single page */
                        box-shadow: none !important;
                        border: none !important;
                        word-break: break-word !important;
                        zoom: 1;
                        height: 297mm;
                        background: white !important;
                        position: relative !important;
                    }
                    
                    table, th, td {
                        border-color: black !important;
                    }
                    
                    div, p, span {
                        color: black !important;
                    }
                    input::placeholder {
                        color: transparent !important;
                    }
                    input {
                        border-bottom: black solid 1px !important;
                        border-top: none !important;
                        border-left: none !important;
                        border-right: none !important;
                        background: transparent !important;
                    }
                }
            ` }} />
        </div>
    );
};

export default AnnexureC;
