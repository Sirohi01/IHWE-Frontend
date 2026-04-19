import React, { useRef, useState, useEffect } from 'react';
import { Download, Printer, Save, Loader2 } from 'lucide-react';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import { jsPDF } from 'jspdf';
import { toPng } from 'html-to-image';
import { psmClaimApi } from '@/services/psmClaimApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface AnnexureCProps {
    reportId?: string;
}

const AnnexureC: React.FC<AnnexureCProps> = ({ reportId }) => {
    const navigate = useNavigate();
    const { data: ctxData } = useExhibitorCtx() || {};
    const componentRef = useRef<HTMLDivElement>(null);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(!!reportId);
    const [formData, setFormData] = React.useState({
        fairName: ctxData?.fairName || '',
        companyName: ctxData?.companyName || '',
        applicationNo: '',
        additionalCopies: 'No',
        date: new Date().toLocaleDateString('en-GB'),
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
                navigate('/exhibitor-dashboard/psm-claim/reports-table');
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

        try {
            const dataUrl = await toPng(componentRef.current, {
                quality: 1,
                pixelRatio: 3,
                backgroundColor: '#ffffff',
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
                "(i) Name of the unit/ enterprise, complete postal address of unit/ enterprise with e-mail & mobile number (as given in Udyam Regn Certificate).",
                "(ii) Name of the Director(s)/ Proprietor/ Partner(s)",
                "(iii) Date of Birth (dd/mm/yyyy)",
                "(iv) Gender (Male/ Female/ Transgender)",
                "(v) Aadhaar Card Details (Director(s)/ Proprietor/ Partners)",
                "(vi) Udyam Registration Certificate details.",
                "(vii) GST Number (enclose a copy of certificate issued by an Appropriate Authority)",
                "(viii) Bank details (Bank Account Number, Name of Bank, Branch name, IFSC, MICR of Branch).",
                "(ix) Aadhaar linked Bank Account Number"
            ]
        },
        { id: 12, text: "Copy of Aadhaar Card(s) (Director(s)/ Proprietor/ Partners)", pg: "" },
        { id: 13, text: "Copy of GST Registration Certificate", pg: "" },
        { id: 14, text: "Other related documents (PAN card) etc.", pg: "" },
    ];

    return (
        <div className="flex flex-col gap-6 p-4 max-w-5xl mx-auto">
            {/* Header / Actions */}
            <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200 no-print">
                <div className="space-y-1">
                    <h1 className="text-xl font-bold text-slate-800">Annexure C</h1>
                    <p className="text-sm text-slate-500">Check-list for reimbursement of claims under PMS Scheme</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md active:scale-95 font-medium disabled:opacity-50"
                    >
                        {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                        {reportId ? 'Update Report' : 'Save Report'}
                    </button>
                    <button
                        onClick={handlePrint}
                        className="flex items-center gap-2 px-4 py-2 bg-[#23471d] text-white rounded-lg hover:bg-[#1a3516] transition-all shadow-md active:scale-95 font-medium"
                    >
                        <Printer size={18} />
                        Print Document
                    </button>
                    <button
                        onClick={handleDownload}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-all shadow-sm active:scale-95 font-medium"                    >
                        <Download size={18} />
                        Download PDF
                    </button>
                </div>
            </div>

            <div
                id="printable-form"
                ref={componentRef}
                className="bg-white p-[20mm] shadow-2xl print:shadow-none print:p-0 mx-auto w-full max-w-[210mm] min-h-[297mm] text-[#000] leading-snug relative overflow-hidden"
                style={{ fontFamily: "'Serif', 'Times New Roman', serif" }}
            >
                {/* Header Decoration for Web View */}

                <div className="text-center mb-6 mt-2">
                    <h1 className="text-lg font-extrabold uppercase tracking-tight underline decoration-2 underline-offset-4 mb-2">ANNEXURE – C</h1>
                    <h2 className="text-[15px] font-bold underline decoration-1 underline-offset-4 max-w-2xl mx-auto">
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

                        <div className="leading-snug">
                            <span className="font-bold uppercase text-[10px] print:text-black mr-2">The following documents/ information have been received for reimbursement under PMS Scheme from M/s:</span>
                            <input
                                type="text"
                                value={formData.companyName}
                                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                className="border-b border-black inline-block min-w-[350px] px-1 font-medium bg-transparent outline-none"
                            />
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
                            <tr className="font-bold bg-slate-50 print:bg-transparent">
                                <th className="py-1.5 px-1 w-12 text-center">S. No.</th>
                                <th className="py-1.5 px-3 text-left">Particulars</th>
                                <th className="py-1.5 px-2 text-center w-36 text-[9px] uppercase">(Put '✓' or '×' in box)</th>
                                <th className="py-1.5 px-2 text-center w-20 text-[9px] uppercase">Pg No.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {checklistItems.map((item) => (
                                <React.Fragment key={item.id}>
                                    <tr className=" ">
                                        <td className="py-1.5 px-1 text-center align-middle">{item.id}.</td>
                                        <td className="py-1.5 px-3 align-middle font-medium">
                                            {item.id === 3 ? (
                                                <div className="flex flex-wrap items-center gap-1">
                                                    <span>Print out of Online Application Form No. : <strong>UAM/DTF/</strong></span>
                                                    <input
                                                        type="text"
                                                        value={formData.applicationNo}
                                                        onChange={(e) => setFormData({ ...formData, applicationNo: e.target.value })}
                                                        className="border-b border-black px-1 bg-transparent outline-none w-24 font-bold"
                                                    />
                                                </div>
                                            ) : item.text}
                                            {item.subItems && (
                                                <ul className="mt-1 space-y-0.5 pl-2 text-[10px] font-normal leading-tight">
                                                    {item.subItems.map((sub, idx) => (
                                                        <li key={idx} className="flex gap-1">
                                                            <span className="shrink-0">{sub.substring(0, sub.indexOf(')') + 1)}</span>
                                                            <span className="text-justify">{sub.substring(sub.indexOf(')') + 2)}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </td>
                                        <td className="py-1.5 px-2 text-center align-middle">
                                            <div
                                                onClick={() => updateCheck(item.id)}
                                                className="w-4 h-4 border border-black mx-auto cursor-pointer flex items-center justify-center bg-transparent"
                                            >
                                                {formData.checks[item.id] && <span className="text-black font-bold text-[10px]">✓</span>}
                                            </div>
                                        </td>
                                        <td className="py-1.5 px-2 text-center align-middle">
                                            <input
                                                type="text"
                                                value={formData.pages[item.id] || ''}
                                                onChange={(e) => updatePage(item.id, e.target.value)}
                                                className="w-full border-b border-black/20 h-5 bg-transparent outline-none text-center font-bold text-[10px]"
                                            />
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>

                    <div className="pt-4 space-y-8">
                        <p className="text-[11px] print:text-[10px] leading-snug">
                            Documents/ information checked and verified the claim of the aforementioned unit / enterprise is found in order and eligible for reimbursement as per PMS Scheme guidelines.
                        </p>

                        <div className="flex justify-between items-end pr-10">
                            <div className="w-48 text-left">
                                <div className="no-print">
                                    <input
                                        type="text"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        className="border-b border-black mb-0.5 w-32 bg-transparent outline-none text-[10.5px]"
                                    />
                                </div>
                                <div className="hidden print:block border-b border-black mb-0.5 w-32 min-h-[1.5em] text-[10.5px]">{formData.date}</div>
                                <span className="block text-[9px] font-bold uppercase">Date</span>
                            </div>
                            <div className="text-center flex flex-col items-center">
                                <div className="w-48 border-b border-black mb-0.5 h-6"></div>
                                <span className="font-bold uppercase text-[10px]">Signature</span>
                            </div>
                        </div>
                    </div>


                </div>
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
                        padding: 15mm 20mm !important; /* Internal padding simulates page margins */
                        box-shadow: none !important;
                        word-break: break-word !important;
                        zoom: 1;
                        min-height: 297mm;
                        background: white !important;
                        position: relative !important;
                    }
                    
                    table, th, td, div, p, span {
                        border-color: black !important;
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
            `}} />
        </div>
    );
};

export default AnnexureC;
