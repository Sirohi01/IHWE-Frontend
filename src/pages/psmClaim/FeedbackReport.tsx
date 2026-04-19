import React, { useEffect, useRef, useState } from 'react';
import { Download, Loader2, Printer, Save } from 'lucide-react';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import { jsPDF } from 'jspdf';
import { toPng } from 'html-to-image';
import { psmClaimApi } from '@/services/psmClaimApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface Props { reportId?: string; }

const FeedbackReport: React.FC<Props> = ({ reportId }) => {
    const navigate = useNavigate();
    const { data: ctxData } = useExhibitorCtx() || {};
    const componentRef = useRef<HTMLDivElement>(null);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(!!reportId);

    const [formData, setFormData] = useState({
        mseUnitName: ctxData?.companyName || '',
        plantAddress: ctxData?.address || '',
        proprietorName: ctxData?.contactName || '',
        mobileNumber: ctxData?.mobile || '',
        emailId: ctxData?.email || '',
        website: ctxData?.website || '',
        eventDetails: ctxData?.fairName || '',
        comments: '',
        visitorCount: '',
        exportInquiries: '',
        businessFinalized: '',
        otherAchievements: '',
        participateAgain: '',
        technologies: [
            { country: '', field: '', description: '', contact: '' },
            { country: '', field: '', description: '', contact: '' }
        ],
        remarks: '',
        date: new Date().toLocaleDateString('en-GB')
    });

    useEffect(() => {
        if (reportId) {
            const loadData = async () => {
                try {
                    const res = await psmClaimApi.getReportById('feedback-report', reportId);
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
            const res = await psmClaimApi.saveReport('feedback-report', {
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
            pdf.save(`Feedback_Report_${ctxData?.companyName || 'Document'}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Please try the Print option instead.');
        }
    };

    const updateTech = (index: number, field: string, value: string) => {
        const newTech = [...formData.technologies];
        (newTech[index] as any)[field] = value;
        setFormData({ ...formData, technologies: newTech });
    };

    const mainRows = [
        { id: 1, label: 'Name of the participating MSE unit', value: formData.mseUnitName, key: 'mseUnitName' },
        { id: 2, label: 'Address of Plant', value: formData.plantAddress, key: 'plantAddress' },
        { id: 3, label: 'Name of Proprietor / Partner / Director', value: formData.proprietorName, key: 'proprietorName' },
        { id: 4, label: 'Mobile number of Proprietor / Partner / Director', value: formData.mobileNumber, key: 'mobileNumber' },
        { id: 5, label: 'E-mail ID of Proprietor / Partner / Director', value: formData.emailId, key: 'emailId' },
        { id: 6, label: 'Website of the participating MSE unit', value: formData.website, key: 'website' },
        { id: 7, label: 'Name, Venue, and Duration of event', value: formData.eventDetails, key: 'eventDetails' },
    ];

    const eventRows = [
        { id: 9, label: 'Number of visitors in the event', value: formData.visitorCount, key: 'visitorCount' },
        { id: 10, label: 'Number and value (in INR) of export inquiries generated in the event', value: formData.exportInquiries, key: 'exportInquiries' },
        { id: 11, label: 'Details of business finalized / orders booked in the event.', value: formData.businessFinalized, key: 'businessFinalized' },
        { id: 12, label: 'Other achievements such as joint ventures, technology transfer agreements, etc. (give details)', value: formData.otherAchievements, key: 'otherAchievements' },
    ];

    return (
        <div className="flex flex-col p-4 max-w-5xl mx-auto" style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
            {/* Header / Actions */}
            <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200 no-print">
                <div>
                    <h1 className="text-xl font-bold text-slate-800">Feedback Report</h1>
                    <p className="text-sm text-slate-500">Participant's feedback for the PMS Scheme</p>
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
                    className="bg-white p-[15mm] shadow-2xl mx-auto w-full max-w-[210mm] min-h-[297mm] text-[#000] text-[12px] leading-tight relative overflow-hidden"
                    style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
                >
                    <div className="text-center mb-6">
                        <h1 className="text-[16px] font-bold uppercase underline">PARTICIPANTS FEEDBACK REPORT</h1>
                        <p className="italic font-medium text-[11px] mt-1">(To be filled in by all individual participants separately)</p>
                        <p className="italic font-medium text-[11px]">(All columns should be filled)</p>
                    </div>

                    <table className="w-full border-collapse border border-black table-fixed">
                        <tbody>
                            {[
                                { id: 1, label: 'Name of the participating MSE unit', value: formData.mseUnitName, key: 'mseUnitName' },
                                { id: 2, label: 'Address of Plant', value: formData.plantAddress, key: 'plantAddress' },
                                { id: 3, label: 'Name of Proprietor / Partner / Director', value: formData.proprietorName, key: 'proprietorName' },
                                { id: 4, label: 'Mobile number of Proprietor / Partner / Director', value: formData.mobileNumber, key: 'mobileNumber' },
                                { id: 5, label: 'E-mail ID of Proprietor / Partner / Director', value: formData.emailId, key: 'emailId' },
                                { id: 6, label: 'Website of the participating MSE unit', value: formData.website, key: 'website' },
                                { id: 7, label: 'Name, Venue, and Duration of event', value: formData.eventDetails, key: 'eventDetails' },
                            ].map((row) => (
                                <tr key={row.id} className="border-b border-black">
                                    <td className="w-[40px] text-center border-r border-black font-bold py-2">{row.id}</td>
                                    <td className="p-2 border-r border-black font-bold w-[45%] text-[11px] leading-tight">{row.label}</td>
                                    <td className="p-2 bg-slate-50/30 print:bg-transparent overflow-hidden">
                                        <textarea
                                            value={row.value}
                                            onChange={(e) => setFormData({ ...formData, [row.key]: e.target.value })}
                                            className="w-full bg-transparent outline-none resize-none min-h-[1.5rem] print:hidden overflow-hidden"
                                            rows={1}
                                        />
                                        <div className="hidden print:block whitespace-pre-wrap break-words word-break-all min-h-[1.5rem] text-[11px] leading-tight">
                                            {row.value || <span className="text-transparent">.</span>}
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            <tr className="border-b border-black">
                                <td className="text-center border-r border-black font-bold py-2">8</td>
                                <td className="p-2 border-r border-black font-bold text-[11px] leading-tight">
                                    Comments of the participant regarding benefits of participation in the event
                                    <p className="mt-8 font-normal text-[10px] italic">[about 200 words along with photographs of event]</p>
                                </td>
                                <td className="p-2 overflow-hidden">
                                    <textarea
                                        value={formData.comments}
                                        maxLength={200}
                                        onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                                        className="w-full bg-transparent outline-none resize-none min-h-[6rem] print:hidden overflow-hidden"
                                        placeholder="Type your comments here..."
                                    />
                                    <div className="hidden print:block whitespace-pre-wrap break-words word-break-all min-h-[6rem] text-[11px] leading-tight">
                                        {formData.comments || <span className="text-transparent">.</span>}
                                    </div>
                                </td>
                            </tr>

                            {[
                                { id: 9, label: 'Number of visitors in the event', value: formData.visitorCount, key: 'visitorCount' },
                                { id: 10, label: 'Number and value (in INR) of export inquiries generated in the event', value: formData.exportInquiries, key: 'exportInquiries' },
                                { id: 11, label: 'Details of business finalized / orders booked in the event.', value: formData.businessFinalized, key: 'businessFinalized' },
                                { id: 12, label: 'Other achievements such as joint ventures, technology transfer agreements, etc. (give details)', value: formData.otherAchievements, key: 'otherAchievements' },
                                { id: 13, label: 'Would you like to participate again in the event? If yes, reason for the same.', value: formData.participateAgain, key: 'participateAgain' },
                            ].map((row) => (
                                <tr key={row.id} className="border-b border-black">
                                    <td className="text-center border-r border-black font-bold py-2">{row.id}</td>
                                    <td className="p-2 border-r border-black font-bold text-[11px] leading-tight">{row.label}</td>
                                    <td className="p-2 bg-slate-50/30 print:bg-transparent overflow-hidden">
                                        <textarea
                                            value={row.value}
                                            onChange={(e) => setFormData({ ...formData, [row.key]: e.target.value })}
                                            className="w-full bg-transparent outline-none resize-none min-h-[1.5rem] print:hidden overflow-hidden"
                                            rows={1}
                                        />
                                        <div className="hidden print:block whitespace-pre-wrap break-words word-break-all min-h-[1.5rem] text-[11px] leading-tight">
                                            {row.value || <span className="text-transparent">.</span>}
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            <tr className="border-b border-black">
                                <td className="text-center border-r border-black font-bold py-2">14</td>
                                <td colSpan={2} className="p-2 font-bold leading-tight">
                                    <span className="text-[11px]">Details of technologies noticed in the event which would be useful for MSMEs in India (copies of the brochures and other relevant literature may be attached as separate sheet):</span>
                                    <div className="mt-3 overflow-hidden">
                                        <table id="tech-table" className="w-full border-collapse border border-black text-[10px] table-fixed">
                                            <thead>
                                                <tr className="bg-slate-50 print:bg-transparent">
                                                    <th className="border border-black p-1 w-[20%]">Country</th>
                                                    <th className="border border-black p-1 w-[20%]">Field/Sector</th>
                                                    <th className="border border-black p-1 w-[30%]">Description of Technology</th>
                                                    <th className="border border-black p-1 w-[30%]">Contact details of the company</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {formData.technologies.map((tech, idx) => (
                                                    <tr key={idx}>
                                                        <td className="border border-black p-1 align-top break-words word-break-all"><textarea value={tech.country} onChange={(e) => updateTech(idx, 'country', e.target.value)} className="w-full bg-transparent outline-none resize-none overflow-hidden text-center" rows={1} /></td>
                                                        <td className="border border-black p-1 align-top break-words word-break-all"><textarea value={tech.field} onChange={(e) => updateTech(idx, 'field', e.target.value)} className="w-full bg-transparent outline-none resize-none overflow-hidden text-center" rows={1} /></td>
                                                        <td className="border border-black p-1 align-top break-words word-break-all"><textarea value={tech.description} onChange={(e) => updateTech(idx, 'description', e.target.value)} className="w-full bg-transparent outline-none resize-none overflow-hidden" rows={1} /></td>
                                                        <td className="border border-black p-1 align-top break-words word-break-all"><textarea value={tech.contact} onChange={(e) => updateTech(idx, 'contact', e.target.value)} className="w-full bg-transparent outline-none resize-none overflow-hidden" rows={1} /></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td className="text-center font-bold p-2 border-b border-black align-top">15</td>
                                <td className="font-bold border-b border-black p-2 text-[11px]">Remarks/Suggestions, if any</td>
                                <td className="p-2 border-b border-black overflow-hidden">
                                    <textarea
                                        value={formData.remarks}
                                        onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                                        className="w-full bg-transparent outline-none resize-none min-h-[2.5rem] print:hidden"
                                    />
                                    <div className="hidden print:block whitespace-pre-wrap break-words word-break-all min-h-[2.5rem] text-[11px] leading-tight">
                                        {formData.remarks || <span className="text-transparent">.</span>}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="mt-6 space-y-4">
                        <p className="font-bold italic text-[11px]">Enclosed: Photograph of allotted booth at the event venue.</p>

                        <div className="flex justify-between items-end mt-8 px-2">
                            <div className="flex gap-2 items-end">
                                <span className="font-bold text-[11px]">Date:</span>
                                <input
                                    type="text"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="border-b border-black w-32 px-1 bg-transparent outline-none font-bold text-[11px]"
                                />
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="border-b-2 border-black w-64"></div>
                                <span className="font-bold text-[9px] mt-1 text-center uppercase leading-none">SIGNATURE/NAME/DESIGNATION OF PARTICIPANT</span>
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
                        padding: 15mm 20mm !important; /* Internal padding simulates page margins */
                        box-shadow: none !important;
                        word-break: break-word !important;
                        zoom: 1;
                        min-height: 297mm;
                    }

                    table {
                        width: 100% !important;
                        border-collapse: collapse !important;
                        table-layout: fixed !important;
                    }
                    
                    td, th {
                        border: 1px solid black !important;
                        word-break: break-all !important;
                        overflow-wrap: break-word !important;
                        padding: 4px !important;
                    }
                }
            `}} />
        </div>
    );
};

export default FeedbackReport;
