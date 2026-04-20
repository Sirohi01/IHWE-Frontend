import React, { useState, useEffect } from 'react';
import { Printer, Download, ChevronRight, Save, Loader2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { psmClaimApi } from '@/services/psmClaimApi';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import { toast } from 'sonner';
import { jsPDF } from 'jspdf';
import { toPng } from 'html-to-image';
import { useRef } from 'react';
import ReportHeader from './ReportHeader';

const AnnexureD = ({ reportId: propReportId }) => {
    const navigate = useNavigate();
    const { id: urlId } = useParams();
    const reportId = propReportId || urlId;

    const { data: ctxData } = useExhibitorCtx() || {};
    const componentRef = useRef(null);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(!!reportId);
    const [isExporting, setIsExporting] = useState(false);

    const [formData, setFormData] = useState({
        implementingAgency: '',
        applicantUnit: ctxData?.companyName || '',
        address: ctxData?.address || '',
        udyamRegistration: ctxData?.udyamNumber || '',
        entrepreneurCategory: ctxData?.category || '',
        unitType: '',
        unitCategory: '',
        products: '',
        eventDetails: ctxData?.fairName || '',
        feedback: '',
        expenditureTravel: '',
        admissibleTravel: '',
        expenditureSpace: '',
        admissibleSpace: '',
        totalExpenditure: '',
        totalAdmissible: '',
        date: '',
        place: ''
    });

    useEffect(() => {
        if (reportId) {
            const loadData = async () => {
                try {
                    const res = await psmClaimApi.getReportById('annexure-d', reportId);
                    if (res.success && res.data) {
                        // Populate from the 'data' field if it exists, otherwise use res.data
                        setFormData(res.data.data || res.data);
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
            const res = await psmClaimApi.saveReport('annexure-d', {
                data: formData, // Wrap formData in data property
                id: reportId,
                exhibitorId: ctxData?._id
            });
            if (res.success) {
                toast.success(reportId ? 'Report updated' : 'Report saved');
                navigate('/exhibitor-dashboard/psm-claim/reports-table/annexure-d');
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
                filter: (node) => {
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
            pdf.save(`AnnexureD_${ctxData?.companyName || 'Document'}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
            toast.error('Failed to generate PDF. Please try the Print option instead.');
        } finally {
            setIsExporting(false);
        }
    };

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-[#23471d]" /></div>;

    return (
        <div className="flex flex-col gap-0 mx-auto min-h-screen bg-slate-50/50">
            <ReportHeader title="Annexure D" />

            <div className="p-4 sm:p-8 flex flex-col items-center">
                <div
                    ref={componentRef}
                    id="printable-form"
                    className="bg-white pt-[10mm] pb-[15mm] px-[15mm] shadow-2xl w-full max-w-[210mm] min-h-[297mm] text-[#000] text-[12px] leading-tight relative overflow-hidden"
                    style={{ fontFamily: "'Inter', sans-serif" }}
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
                    <div className="text-center mb-8 font-bold">
                        <h1 className="text-lg underline uppercase">ANNEXURE - D</h1>
                        <h2 className="text-lg underline uppercase mt-2">CLAIM FORM</h2>
                        <h3 className="text-sm font-bold underline mt-2">(To be filled by beneficiary unit for claiming reimbursement)</h3>
                    </div>

                    <table className="w-full border-collapse border border-black text-sm">
                        <tbody>
                            <tr>
                                <td colSpan={3} className="border border-black px-3 py-2 font-bold bg-gray-50 print:bg-transparent">
                                    PART - I : Entrepreneurs' Details :
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-black px-3 py-2 text-center w-12 font-bold">1.</td>
                                <td className="border border-black px-3 py-2 w-[40%] font-bold">Name of Implementing agency</td>
                                <td className="border border-black px-3 py-2">
                                    <input
                                        type="text"
                                        value={formData.implementingAgency}
                                        onChange={(e) => setFormData({ ...formData, implementingAgency: e.target.value })}
                                        className="w-full outline-none bg-transparent"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-black px-3 py-2 text-center w-12 font-bold">2.</td>
                                <td className="border border-black px-3 py-2 font-bold">Name of the Applicant Unit</td>
                                <td className="border border-black px-3 py-2">
                                    <input
                                        type="text"
                                        value={formData.applicantUnit}
                                        onChange={(e) => setFormData({ ...formData, applicantUnit: e.target.value })}
                                        className="w-full outline-none bg-transparent"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-black px-3 py-2 text-center w-12 align-top font-bold">3.</td>
                                <td className="border border-black px-3 py-2 font-bold text-xs">Complete address, phone, Fax, e-mail</td>
                                <td className="border border-black px-3 py-2">
                                    <textarea
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        className="w-full outline-none bg-transparent resize-none h-20"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-black px-3 py-2 text-center w-12 font-bold">4.</td>
                                <td className="border border-black px-3 py-2 font-bold">Udyam Registration Number</td>
                                <td className="border border-black px-3 py-2">
                                    <input
                                        type="text"
                                        value={formData.udyamRegistration}
                                        onChange={(e) => setFormData({ ...formData, udyamRegistration: e.target.value })}
                                        className="w-full outline-none bg-transparent"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-black px-3 py-2 text-center w-12 font-bold text-xs">5.</td>
                                <td className="border border-black px-3 py-2 font-bold text-xs">Category (General/Women/SC/ST/NER/PH)</td>
                                <td className="border border-black px-3 py-2">
                                    <input
                                        type="text"
                                        value={formData.entrepreneurCategory}
                                        onChange={(e) => setFormData({ ...formData, entrepreneurCategory: e.target.value })}
                                        className="w-full outline-none bg-transparent"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-black px-3 py-2 text-center w-12 font-bold text-xs">6.</td>
                                <td className="border border-black px-3 py-2 font-bold text-xs">Type of the unit (Micro or Small)</td>
                                <td className="border border-black px-3 py-2">
                                    <input
                                        type="text"
                                        value={formData.unitType}
                                        onChange={(e) => setFormData({ ...formData, unitType: e.target.value })}
                                        className="w-full outline-none bg-transparent"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-black px-3 py-2 text-center w-12 font-bold text-xs">7.</td>
                                <td className="border border-black px-3 py-2 font-bold text-xs">Category (Manufacturing/Service)</td>
                                <td className="border border-black px-3 py-2">
                                    <input
                                        type="text"
                                        value={formData.unitCategory}
                                        onChange={(e) => setFormData({ ...formData, unitCategory: e.target.value })}
                                        className="w-full outline-none bg-transparent"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-black px-3 py-2 text-center w-12 font-bold text-xs">8.</td>
                                <td className="border border-black px-3 py-2 font-bold text-xs">Products manufactured/service rendered</td>
                                <td className="border border-black px-3 py-2">
                                    <textarea
                                        value={formData.products}
                                        onChange={(e) => setFormData({ ...formData, products: e.target.value })}
                                        className="w-full outline-none bg-transparent resize-none h-16"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={3} className="border border-black px-3 py-2 font-bold bg-gray-50 print:bg-transparent">
                                    PART-II: Event details
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-black px-3 py-2 text-center w-12 align-top font-bold">9.</td>
                                <td className="border border-black px-3 py-2 font-bold text-xs">Name of event, venue, duration</td>
                                <td className="border border-black px-3 py-2">
                                    <textarea
                                        value={formData.eventDetails}
                                        onChange={(e) => setFormData({ ...formData, eventDetails: e.target.value })}
                                        className="w-full outline-none bg-transparent resize-none h-20"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-black px-3 py-2 text-center w-12 align-top font-bold text-xs">10.</td>
                                <td className="border border-black px-3 py-2 font-bold text-xs">Feedback: [about 200 words]</td>
                                <td className="border border-black px-3 py-2">
                                    <textarea
                                        value={formData.feedback}
                                        onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                                        className="w-full outline-none bg-transparent resize-none h-32 text-xs"
                                        placeholder="Include details about new business tie-ups achieved through the event. B2B Knowledge on new technology, opportunity for market expansion etc."
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <table className="w-full border-collapse border border-black border-t-0 text-sm mt-6">
                        <thead>
                            <tr className="bg-gray-50 print:bg-transparent font-bold">
                                <td colSpan={4} className="border border-black px-3 py-2">PART -III : Payment Details (DETAILS OF CLAIM in Rs.)</td>
                            </tr>
                            <tr className="text-center font-bold">
                                <th className="border border-black px-2 py-1 w-[20%] text-xs">Scheme Component</th>
                                <th className="border border-black px-2 py-1 w-[40%] text-xs">Items</th>
                                <th className="border border-black px-2 py-1 w-[20%] text-xs">Actual Exp. (in Rs.)</th>
                                <th className="border border-black px-2 py-1 w-[20%] text-xs">Admissible (in Rs.)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-black px-3 py-2 font-bold align-top text-xs" rowSpan={2}>
                                    Domestic Trade Fairs / Exhibitions
                                </td>
                                <td className="border border-black px-3 py-2 text-[10px] leading-tight">
                                    Contingency expenditure including travel, (attach expenditure copy)
                                </td>
                                <td className="border border-black px-2 py-1">
                                    <input
                                        type="number"
                                        value={formData.expenditureTravel}
                                        onChange={(e) => setFormData({ ...formData, expenditureTravel: e.target.value })}
                                        className="w-full outline-none bg-transparent text-center"
                                    />
                                </td>
                                <td className="border border-black px-2 py-1">
                                    <input
                                        type="number"
                                        value={formData.admissibleTravel}
                                        onChange={(e) => setFormData({ ...formData, admissibleTravel: e.target.value })}
                                        className="w-full outline-none bg-transparent text-center"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-black px-3 py-2 text-[10px] leading-tight">
                                    Space Rent (stall rent) (Attach invoice / bill)
                                </td>
                                <td className="border border-black px-2 py-1">
                                    <input
                                        type="number"
                                        value={formData.expenditureSpace}
                                        onChange={(e) => setFormData({ ...formData, expenditureSpace: e.target.value })}
                                        className="w-full outline-none bg-transparent text-center"
                                    />
                                </td>
                                <td className="border border-black px-2 py-1">
                                    <input
                                        type="number"
                                        value={formData.admissibleSpace}
                                        onChange={(e) => setFormData({ ...formData, admissibleSpace: e.target.value })}
                                        className="w-full outline-none bg-transparent text-center"
                                    />
                                </td>
                            </tr>
                            <tr className="font-bold">
                                <td colSpan={2} className="border border-black px-3 py-2 text-center text-xs uppercase">Total (in Rs.)</td>
                                <td className="border border-black px-2 py-1">
                                    <input
                                        type="number"
                                        value={formData.totalExpenditure}
                                        onChange={(e) => setFormData({ ...formData, totalExpenditure: e.target.value })}
                                        className="w-full outline-none bg-transparent text-center font-bold"
                                    />
                                </td>
                                <td className="border border-black px-2 py-1">
                                    <input
                                        type="number"
                                        value={formData.totalAdmissible}
                                        onChange={(e) => setFormData({ ...formData, totalAdmissible: e.target.value })}
                                        className="w-full outline-none bg-transparent text-center font-bold"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="mt-8 space-y-4">
                        <div className="flex justify-between items-end">
                            <div className="space-y-4">
                                <div className="flex gap-2 items-end">
                                    <span className="font-bold text-xs">Place:</span>
                                    <input
                                        type="text"
                                        value={formData.place}
                                        onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                                        className="border-b border-black outline-none bg-transparent w-40 text-xs px-1"
                                    />
                                </div>
                                <div className="flex gap-2 items-end">
                                    <span className="font-bold text-xs">Date:</span>
                                    <div className={`${isExporting ? 'hidden' : 'no-print'}`}>
                                        <input
                                            type="date"
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            className="border-b border-black outline-none bg-transparent w-40 text-xs px-1"
                                        />
                                    </div>
                                    <div className={`${isExporting ? 'block font-bold' : 'hidden print:block'} border-b border-black min-w-[100px] text-xs px-1`}>
                                        {formData.date ? new Date(formData.date).toLocaleDateString('en-GB') : ''}
                                    </div>
                                </div>
                            </div>
                            <div className="text-center w-64 pb-2">
                                <div className="border-b border-black w-full mb-1"></div>
                                <p className="font-bold text-xs uppercase">Signature of authorized signatory</p>
                                <p className="text-[10px] italic">(With Office Seal)</p>
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
                        margin: 8mm 15mm;
                    }
                    .no-print {
                        display: none !important;
                    }
                    body {
                        background: white !important;
                    }
                    #printable-form {
                        width: 100% !important;
                        padding: 0 !important;
                        box-shadow: none !important;
                        border: none !important;
                        zoom: 0.9;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        min-height: 260mm;
                    }
                    table, th, td {
                        border-color: black !important;
                        padding-top: 3px !important;
                        padding-bottom: 3px !important;
                    }
                    input, textarea {
                        border-bottom: none !important;
                    }
                    .mb-8 { margin-bottom: 4mm !important; }
                    .mt-6 { margin-top: 2mm !important; }
                    .space-y-6 { margin-top: 2mm !important; margin-bottom: 2mm !important; }
                    textarea { min-height: 15mm !important; }
                }
            `}} />
        </div>
    );
};

export default AnnexureD;
