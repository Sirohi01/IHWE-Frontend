import React, { useRef, useState, useEffect } from 'react';
import { Download, Printer, Save, Loader2, ChevronRight } from 'lucide-react';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import { jsPDF } from 'jspdf';
import { toPng } from 'html-to-image';
import { psmClaimApi } from '@/services/psmClaimApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface Props { reportId?: string; }

const Undertaking: React.FC<Props> = ({ reportId }) => {
    const navigate = useNavigate();
    const { data: ctxData } = useExhibitorCtx() || {};
    const componentRef = useRef<HTMLDivElement>(null);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(!!reportId);

    const [formData, setFormData] = useState({
        name: ctxData?.contactName || '',
        parentName: '',
        designation: 'Proprietor', // Default
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

    useEffect(() => {
        if (reportId) {
            const loadData = async () => {
                try {
                    const res = await psmClaimApi.getReportById('undertaking', reportId);
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
            const res = await psmClaimApi.saveReport('undertaking', {
                ...formData,
                id: reportId,
                exhibitorId: ctxData?._id
            });
            if (res.success) {
                toast.success(reportId ? 'Report updated' : 'Report saved');
                navigate('/exhibitor-dashboard/psm-claim/reports-table/undertaking');
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
            pdf.save(`Undertaking_${ctxData?.companyName || 'Document'}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Please try the Print option instead.');
        }
    };

    return (
        <div className="flex flex-col gap-6 p-4 max-w-5xl mx-auto min-h-screen">
            {/* Top Action Bar */}
            <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200 no-print">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/exhibitor-dashboard/psm-claim/reports-table/undertaking')}
                        className="p-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-all active:scale-95 shadow-sm"
                        title="Back to Table"
                    >
                        <ChevronRight size={20} className="rotate-180" />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-slate-800">Undertaking</h1>
                        <p className="text-sm text-slate-500">Reimbursement eligibility confirmation</p>
                    </div>
                </div>
                <div className="flex gap-3">
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
            <div className="flex justify-center w-full overflow-x-auto p-2 sm:p-2 rounded-xl">
                <div
                    id="printable-form"
                    ref={componentRef}
                    className="bg-white p-[15mm] shadow-2xl mx-auto w-full max-w-[210mm] min-h-[297mm] text-[#000] text-[12.5px] leading-relaxed relative overflow-hidden"
                    style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
                >
                    <div className="text-center mb-12">
                        <h1 className="text-[18px] font-bold uppercase underline">UNDERTAKING</h1>
                        <p className="font-medium text-[14px] mt-1">[For reimbursement under Procurement & Marketing Support (PMS) Scheme]</p>
                    </div>

                    <div className="space-y-6 text-justify">
                        <p>
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

                        <p>
                            2. That the aforesaid unit/ enterprise had participated in the Fair/ Exhibition
                            <input type="text" value={formData.exhibitionName} onChange={(e) => setFormData({ ...formData, exhibitionName: e.target.value })} className="border-b border-black outline-none px-1 w-full bg-transparent font-bold" />
                            at stall No. <input type="text" value={formData.stallNo} onChange={(e) => setFormData({ ...formData, stallNo: e.target.value })} className="border-b border-black outline-none px-1 w-24 bg-transparent font-bold text-center" />
                            held at <input type="text" value={formData.venue} onChange={(e) => setFormData({ ...formData, venue: e.target.value })} className="border-b border-black outline-none px-1 w-40 bg-transparent font-bold" />
                            pin code <input type="text" value={formData.pincode} onChange={(e) => setFormData({ ...formData, pincode: e.target.value })} className="border-b border-black outline-none px-1 w-24 bg-transparent font-bold text-center" />
                            from 
                            <div className="no-print inline-block">
                                <input type="date" value={formData.fromDate} onChange={(e) => setFormData({ ...formData, fromDate: e.target.value })} className="border-b border-black outline-none px-1 w-32 bg-transparent font-bold text-center" />
                            </div>
                            <div className="hidden print:inline-block border-b border-black min-w-[100px] font-bold text-center">
                                {formData.fromDate ? new Date(formData.fromDate).toLocaleDateString('en-GB') : ''}
                            </div>
                            to 
                            <div className="no-print inline-block">
                                <input type="date" value={formData.toDate} onChange={(e) => setFormData({ ...formData, toDate: e.target.value })} className="border-b border-black outline-none px-1 w-32 bg-transparent font-bold text-center" />
                            </div>
                            <div className="hidden print:inline-block border-b border-black min-w-[100px] font-bold text-center">
                                {formData.toDate ? new Date(formData.toDate).toLocaleDateString('en-GB') : ''}
                            </div>
                            under Procurement & Marketing Support (PMS) Scheme during the financial year 202<input type="text" value={formData.finYear.split('-')[0].slice(-1)} readOnly className="border-b border-black outline-none w-4 text-center bg-transparent" /> - 2<input type="text" value={formData.finYear.split('-')[1].slice(-1)} readOnly className="border-b border-black outline-none w-4 text-center bg-transparent" /> .
                        </p>

                        <p className="mt-8">
                            I do hereby solemnly affirm that the above mentioned information is correct and to the best of my knowledge.
                        </p>
                    </div>

                    <div className="mt-10 flex flex-col items-end space-y-2">
                        <div className="text-center">
                            <p>( <input type="text" value={formData.signatoryName} onChange={(e) => setFormData({ ...formData, signatoryName: e.target.value })} className="border-b border-black outline-none px-1 w-64 bg-transparent text-center font-bold" /> )</p>
                            <p className="font-bold mt-1">Signature</p>
                            <p className="font-bold">Proprietor/ Partner/ Director</p>
                            <p className="font-bold italic">With Office seal</p>
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
                        margin: 0mm; /* Removes browser headers/footers */
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
                    
                    input, textarea, select {
                        border-bottom: black solid 1px !important;
                        border-top: none !important;
                        border-left: none !important;
                        border-right: none !important;
                        background: transparent !important;
                        font-weight: bold !important;
                        -webkit-appearance: none;
                        appearance: none;
                    }
                }
            ` }} />
        </div>
    );
};

export default Undertaking;
