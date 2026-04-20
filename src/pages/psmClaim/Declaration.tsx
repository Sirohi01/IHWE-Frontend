import React, { useEffect, useRef, useState } from 'react';
import { Download, Printer, Save, Loader2, ChevronRight } from 'lucide-react';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import { jsPDF } from 'jspdf';
import { toPng } from 'html-to-image';
import { psmClaimApi } from '@/services/psmClaimApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useReactToPrint } from 'react-to-print';
import ReportHeader from './ReportHeader';

interface DeclarationProps {
    reportId?: string;
}

const Declaration: React.FC<DeclarationProps> = ({ reportId }) => {
    const navigate = useNavigate();
    const { data: ctxData } = useExhibitorCtx() || {};
    const componentRef = useRef<HTMLDivElement>(null);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(!!reportId);
    const [isExporting, setIsExporting] = useState(false);

    const [formData, setFormData] = React.useState({
        fairName: ctxData?.fairName || '',
        companyName: ctxData?.companyName || '',
        place: '',
        date: new Date().toISOString().split('T')[0],
        name: ctxData?.contactName || '',
        designation: ''
    });

    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle: `Declaration_${formData.companyName || 'Document'}`,
    });

    useEffect(() => {
        const fetchReport = async () => {
            if (!reportId) return;
            try {
                const res = await psmClaimApi.getReportById('declaration', reportId);
                if (res.success) {
                    setFormData({
                        ...formData,
                        ...res.data
                    });
                }
            } catch (error) {
                console.error("Error fetching report:", error);
                toast.error("Failed to load report data");
            } finally {
                setLoading(false);
            }
        };
        fetchReport();
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
                navigate('/exhibitor-dashboard/psm-claim/reports-table/declaration');
            }
        } catch (error) {
            toast.error('Failed to save report');
        } finally {
            setSaving(false);
        }
    };

    const handleDownload = async () => {
        if (!componentRef.current) return;
        setIsExporting(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 100));
            const dataUrl = await toPng(componentRef.current, {
                quality: 1,
                pixelRatio: 2,
                backgroundColor: '#ffffff',
                filter: (node: HTMLElement) => !node.classList?.contains('no-print'),
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
            pdf.save(`Declaration_${formData.companyName || 'Document'}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Please try the Print option instead.');
        } finally {
            setIsExporting(false);
        }
    };

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-blue-600" /></div>;

    return (
        <div className="flex flex-col gap-0 mx-auto min-h-screen bg-slate-50/50">
            <ReportHeader title="Declaration" />

            <div className="p-4 sm:p-8 flex flex-col items-center">
                <div
                    ref={componentRef}
                    id="printable-form"
                    className="bg-white pt-[10mm] pb-[15mm] px-[15mm] shadow-2xl w-full max-w-[210mm] min-h-[297mm] text-[#000] text-[12.5px] leading-relaxed relative overflow-hidden"
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
                                        className={`flex-1 border-b border-black/30 px-1 bg-transparent outline-none focus:border-black transition-colors py-0.5 ${isExporting ? 'hidden' : 'print:hidden'}`}
                                    />
                                    <div className={`${isExporting ? 'block' : 'hidden print:block'} flex-1 border-b border-black px-1 min-h-[1.5rem]`}>
                                        {formData.name || <span className="text-transparent">.</span>}
                                    </div>
                                </div>
                                <div className="flex items-end gap-2">
                                    <span className="font-bold w-28 uppercase text-[11px]">Date:</span>
                                    <input
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        className={`flex-1 border-b border-black/30 px-1 bg-transparent outline-none focus:border-black transition-colors py-0.5 ${isExporting ? 'hidden' : 'print:hidden'}`}
                                    />
                                    <div className={`${isExporting ? 'block font-bold' : 'hidden print:block'} flex-1 border-b border-black px-1 min-h-[1.5rem]`}>
                                        {formData.date ? new Date(formData.date).toLocaleDateString('en-GB') : <span className="text-transparent">.</span>}
                                    </div>
                                </div>
                                <div className="flex items-end gap-2">
                                    <span className="font-bold w-28 uppercase text-[11px]">Designation:</span>
                                    <input
                                        type="text"
                                        value={formData.designation}
                                        onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                                        className={`flex-1 border-b border-black/30 px-1 bg-transparent outline-none focus:border-black transition-colors py-0.5 ${isExporting ? 'hidden' : 'print:hidden'}`}
                                    />
                                    <div className={`${isExporting ? 'block' : 'hidden print:block'} flex-1 border-b border-black px-1 min-h-[1.5rem]`}>
                                        {formData.designation || <span className="text-transparent">.</span>}
                                    </div>
                                </div>
                                <div className="flex items-end gap-2">
                                    <span className="font-bold w-28 uppercase text-[11px]">Place:</span>
                                    <input
                                        type="text"
                                        value={formData.place}
                                        onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                                        className={`flex-1 border-b border-black/30 px-1 bg-transparent outline-none focus:border-black transition-colors py-0.5 ${isExporting ? 'hidden' : 'print:hidden'}`}
                                    />
                                    <div className={`${isExporting ? 'block' : 'hidden print:block'} flex-1 border-b border-black px-1 min-h-[1.5rem]`}>
                                        {formData.place || <span className="text-transparent">.</span>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Approval Flow Chart */}
                        <div className="pt-20">
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
                        padding: 10mm 15mm !important;
                        box-shadow: none !important;
                        zoom: 0.92;
                        min-height: 280mm;
                        background: white !important;
                    }
                    
                    table, th, td, div, p, span {
                        border-color: black !important;
                        color: black !important;
                    }

                    input {
                        border-bottom: black solid 1px !important;
                        // background: transparent !important;
                    }
                    .pt-20 { pt-10 !important; }
                    .mt-16 { mt-8 !important; }
                }
            `}} />
        </div>
    );
};

export default Declaration;
