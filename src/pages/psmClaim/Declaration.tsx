import React, { useRef } from 'react';
import { Download, Printer, Save, Loader2 } from 'lucide-react';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import { jsPDF } from 'jspdf';
import { toPng } from 'html-to-image';
import { psmClaimApi } from '@/services/psmClaimApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface DeclarationProps {
    reportId?: string;
}

const Declaration: React.FC<DeclarationProps> = ({ reportId }) => {
    const navigate = useNavigate();
    const { data: ctxData } = useExhibitorCtx() || {};
    const componentRef = useRef<HTMLDivElement>(null);
    const [saving, setSaving] = React.useState(false);
    const [loading, setLoading] = React.useState(!!reportId);

    const [formData, setFormData] = React.useState({
        name: ctxData?.contactName || '',
        designation: '',
        date: new Date().toLocaleDateString('en-GB'),
        place: ''
    });

    React.useEffect(() => {
        if (reportId) {
            const loadData = async () => {
                try {
                    const res = await psmClaimApi.getReportById('declaration', reportId);
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
            const res = await psmClaimApi.saveReport('declaration', {
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
                pixelRatio: 3, // Higher resolution for professional print
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
            pdf.save(`Declaration_${ctxData?.companyName || 'Document'}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Please try the Print option instead.');
        }
    };

    return (
        <div className="flex flex-col p-4 max-w-5xl mx-auto">
            {/* Header / Actions */}
            <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200 no-print">
                <div>
                    <h1 className="text-xl font-bold text-slate-800">Declaration Form</h1>
                    <p className="text-sm text-slate-500">Review and print the declaration for PSM Claim</p>
                </div>
                <div className="flex gap-3">
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
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-all shadow-sm active:scale-95 font-medium"
                    >
                        <Download size={18} />
                        Download PDF
                    </button>
                </div>
            </div>

            {/* A4 Document Wrapper */}
            <div className="flex justify-center w-full overflow-x-auto p-2 sm:p-8 rounded-xl">
                <div
                    id="printable-form"
                    ref={componentRef}
                    className="bg-white p-[20mm] shadow-2xl mx-auto w-full max-w-[210mm] min-h-[297mm] text-[#000] leading-relaxed relative overflow-hidden"
                    style={{ fontFamily: "'Serif', 'Times New Roman', serif" }}
                >
                    {/* Header Decoration */}

                    <div className="text-center mb-16 mt-8">
                        <h1 className="text-xl font-bold uppercase tracking-widest underline decoration-2 underline-offset-8">DECLARATION</h1>
                    </div>

                    <div className="space-y-8 text-[15px] print:text-[14px]">
                        <p className="font-medium italic">I hereby declare that :</p>

                        <div className="flex gap-4 items-start pl-2">
                            <span className="font-bold shrink-0">(a)</span>
                            <p className="text-justify">
                                Above information is correct and is based on the actual expenditure incurred. In case any of the statement/ information furnished in application / document is later found to be wrong or in correct or misleading, I do hereby bind myself and my unit to pay to the Government on demand the full amount received as reimbursement in respect within seven days of the demand.
                            </p>
                        </div>

                        <div className="flex gap-4 items-start pl-2">
                            <span className="font-bold shrink-0">(b)</span>
                            <p className="text-justify">
                                The unit has not claimed/ applied for financial assistance from any other Ministry/ Department of the Government of India or any other State Government or any Government Institute/Agency for the above mentioned trade fair/ packaging consultancy.
                            </p>
                        </div>

                        {/* Signature Section */}
                        <div className="pt-16 flex flex-col items-end mr-10 space-y-4">
                            <div className="text-center border-t border-black pt-2 min-w-[250px]">
                                <span className="font-bold uppercase text-[12px]">Signature of the Authorized Signatory</span>
                            </div>

                            <div className="w-[300px] space-y-4 pt-4">
                                <div className="flex items-end gap-2">
                                    <span className="font-bold w-28 uppercase text-[11px]">Name:</span>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="flex-1 border-b border-black/30 px-1 bg-transparent outline-none focus:border-black transition-colors py-0.5 print:hidden"
                                    />
                                    <div className="hidden print:block flex-1 border-b border-black px-1 min-h-[1.5rem]">
                                        {formData.name || <span className="text-transparent">.</span>}
                                    </div>
                                </div>
                                <div className="flex items-end gap-2">
                                    <span className="font-bold w-28 uppercase text-[11px]">Date:</span>
                                    <input
                                        type="text"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        className="flex-1 border-b border-black/30 px-1 bg-transparent outline-none focus:border-black transition-colors py-0.5 print:hidden"
                                    />
                                    <div className="hidden print:block flex-1 border-b border-black px-1 min-h-[1.5rem]">
                                        {formData.date || <span className="text-transparent">.</span>}
                                    </div>
                                </div>
                                <div className="flex items-end gap-2">
                                    <span className="font-bold w-28 uppercase text-[11px]">Designation:</span>
                                    <input
                                        type="text"
                                        value={formData.designation}
                                        onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                                        className="flex-1 border-b border-black/30 px-1 bg-transparent outline-none focus:border-black transition-colors py-0.5 print:hidden"
                                    />
                                    <div className="hidden print:block flex-1 border-b border-black px-1 min-h-[1.5rem]">
                                        {formData.designation || <span className="text-transparent">.</span>}
                                    </div>
                                </div>
                                <div className="flex items-end gap-2">
                                    <span className="font-bold w-28 uppercase text-[11px]">Place:</span>
                                    <input
                                        type="text"
                                        value={formData.place}
                                        onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                                        className="flex-1 border-b border-black/30 px-1 bg-transparent outline-none focus:border-black transition-colors py-0.5 print:hidden"
                                    />
                                    <div className="hidden print:block flex-1 border-b border-black px-1 min-h-[1.5rem]">
                                        {formData.place || <span className="text-transparent">.</span>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Approval Flow Chart */}
                        <div className="pt-20">
                            <div className="border border-black p-4 text-center space-y-3">
                                <h3 className="font-bold uppercase text-[12px] underline underline-offset-4">Approval Flow Chart:</h3>
                                <div className="flex items-center justify-center gap-4 text-[13px] font-bold">
                                    <span>Claim submission by applicant Unit</span>
                                    <span>→</span>
                                    <span>Scrutiny</span>
                                    <span>→</span>
                                    <span>Approval/Sanction/Release to beneficiary unit</span>
                                </div>
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
                    }
                    
                    table, th, td, div, p, span {
                        border-color: black !important;
                        color: black !important;
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

export default Declaration;
