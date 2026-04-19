import React, { useRef, useState, useEffect } from 'react';
import { Download, Printer, Save, Loader2 } from 'lucide-react';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import { jsPDF } from 'jspdf';
import { toPng } from 'html-to-image';
import { toast } from 'sonner';
import { psmClaimApi } from '@/services/psmClaimApi';
import { useNavigate } from 'react-router-dom';

interface Props { reportId?: string; }

const PreReceipt: React.FC<Props> = ({ reportId }) => {
    const navigate = useNavigate();
    const { data: ctxData } = useExhibitorCtx() || {};
    const componentRef = useRef<HTMLDivElement>(null);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(!!reportId);

    const [formData, setFormData] = useState({
        amount: '',
        amountInWords: '',
        fairName: ctxData?.fairName || 'International Health & Wellness Expo 2026',
        fromDate: '18-05-2026',
        toDate: '20-05-2026',
        venue: 'New Delhi',
        signatoryName: ctxData?.contactName || '',
        designation: 'Proprietor',
        date: new Date().toLocaleDateString('en-GB')
    });

    useEffect(() => {
        if (reportId) {
            const loadData = async () => {
                try {
                    const res = await psmClaimApi.getReportById('pre-receipt', reportId);
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
            const res = await psmClaimApi.saveReport('pre-receipt', {
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
            pdf.save(`PreReceipt_${ctxData?.companyName || 'Document'}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
            toast.error('Failed to generate PDF. Please try the Print option instead.');
        }
    };

    return (
        <div className="flex flex-col gap-6 p-4 max-w-5xl mx-auto">
            {/* Header / Actions */}
            <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200 no-print">
                <div>
                    <h1 className="text-xl font-bold text-slate-800">Pre-Receipt</h1>
                    <p className="text-sm text-slate-500">Submit this document on company letterhead</p>
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
                    className="bg-white p-[15mm] shadow-2xl mx-auto w-full max-w-[210mm] min-h-[297mm] text-[#000] text-[16px] leading-[1.8] relative overflow-hidden"
                    style={{ fontFamily: "'Serif', 'Times New Roman', serif" }}
                >
                    <div className="text-right mb-4">
                        <span className="font-bold underline text-[18px]">Annexure</span>
                    </div>

                    <div className="text-center mb-6">
                        <h1 className="text-[20px] font-bold underline">PRE- RECEIPT</h1>
                        <p className="font-bold text-[15px] mt-2 uppercase">(TO BE SUBMITTED ON THE LETTER HEAD OF THE COMPANY)</p>
                    </div>

                    <div className="space-y-4 text-justify mt-4 text-[16px]">
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

                        <div className="leading-[2.0]">
                            From the office of Development Commissioner (MSME), Govt. of India, Ministry of Micro, Small & Medium Enterprise (MSME) on account of financial assistance under component 5(I)(A): Participation of Individual MSE in Domestic Trade Fair/Exhibition
                            <input
                                type="text"
                                value={formData.fairName}
                                onChange={(e) => setFormData({ ...formData, fairName: e.target.value })}
                                className="border-b border-black outline-none px-1 w-full mt-2 bg-transparent font-bold"
                            />
                            <div className="flex flex-wrap items-center mt-2 w-full">
                                (Name of Fair) from
                                <input
                                    type="text"
                                    value={formData.fromDate}
                                    onChange={(e) => setFormData({ ...formData, fromDate: e.target.value })}
                                    className="border-b border-black outline-none px-1 w-28 bg-transparent font-bold text-center mx-1"
                                />
                                to
                                <input
                                    type="text"
                                    value={formData.toDate}
                                    onChange={(e) => setFormData({ ...formData, toDate: e.target.value })}
                                    className="border-b border-black outline-none px-1 w-28 bg-transparent font-bold text-center mx-1"
                                />
                                held at
                                <input
                                    type="text"
                                    value={formData.venue}
                                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                                    className="border-b border-black outline-none px-1 w-44 bg-transparent font-bold mx-1"
                                />
                                (Venue) under Procurement and Marketing Support (PMS) Scheme of the Office of Development Commissioner (MSME).
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 flex flex-col items-end">
                        <div className="border border-black w-28 h-36 flex items-center justify-center p-2 text-center text-[11px] leading-tight mb-4">
                            Affix the Revenue stamp
                        </div>

                        <div className="text-center w-64">
                            <p className="font-bold">Signature of Authorized Signatory</p>
                            <div className="flex flex-col gap-1 mt-2">
                                <div className="flex gap-2 items-center justify-center italic text-[14px]">
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
                                <p className="font-bold text-[13px]">(Name & Designation)</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <p className="font-bold text-[15px]">(<span className="underline">Note</span>: To be submitted in Triplicate)</p>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @media print {
                    @page {
                        size: A4;
                        margin: 0mm; /* Removes browser headers/footers */
                    }
                    * {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
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
                        padding: 30mm 20mm 15mm 20mm !important; /* Top margin for letterhead */
                        box-shadow: none !important;
                        word-break: break-word !important;
                        zoom: 1;
                        min-height: 297mm;
                        background: white !important;
                    }
                    
                    input {
                        border-bottom: 1px solid black !important;
                        background: transparent !important;
                        color: black !important;
                        -webkit-appearance: none;
                        border-radius: 0;
                    }

                    input::placeholder {
                        color: transparent !important;
                    }
                }
            `}} />
        </div>
    );
};

export default PreReceipt;
