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

const MandateForm = ({ reportId: propReportId }) => {
    const navigate = useNavigate();
    const { id: urlId } = useParams();
    const reportId = propReportId || urlId;

    const { data: ctxData } = useExhibitorCtx() || {};
    const componentRef = useRef(null);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(!!reportId);
    const [isExporting, setIsExporting] = useState(false);

    const [formData, setFormData] = useState({
        accountHolderName: ctxData?.companyName || '',
        contactAddress: ctxData?.address || '',
        mobileNumber: ctxData?.mobile || '',
        email: ctxData?.email || '',
        accountName: ctxData?.companyName || '',
        branchName: '',
        branchCode: '',
        accountNumber: '',
        ifscCode: '',
        accountType: '',
        micrCode: '',
        date: new Date().toISOString().split('T')[0],
        customerName: ctxData?.contactName || '',
        customerNameVerification: ctxData?.contactName || ''
    });

    useEffect(() => {
        if (reportId) {
            const loadData = async () => {
                try {
                    const res = await psmClaimApi.getReportById('mandate-form', reportId);
                    if (res.success && res.data) {
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
            const res = await psmClaimApi.saveReport('mandate-form', {
                data: formData,
                id: reportId,
                exhibitorId: ctxData?._id
            });
            if (res.success) {
                toast.success(reportId ? 'Report updated' : 'Report saved');
                navigate('/exhibitor-dashboard/psm-claim/reports-table/mandate-form');
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
            pdf.save(`MandateForm_${formData.companyName || 'Document'}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Please try the Print option instead.');
        } finally {
            setIsExporting(false);
        }
    };

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-[#23471d]" /></div>;

    return (
        <div className="flex flex-col gap-0 mx-auto min-h-screen bg-slate-50/50">
            <ReportHeader title="Mandate Form" />

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
                    <div className="text-center mb-8">
                        <h1 className="text-xl font-bold uppercase mb-2 border-b border-black">
                            <span className="px-3 py-1">MANDATE FORM</span>
                        </h1>
                        <h2 className="text-lg font-bold mb-4 italic">(Account/s Information form)</h2>

                        <p className="text-[11px] font-bold uppercase leading-relaxed max-w-2xl mx-auto">
                            ELECTRONIC CLEARING SERVICE (CREDIT CLEARING) / REAL TIME GROSS SETTLEMENT (RTGS) /
                            NATIONAL ELECTRONIC TRANSFER (NEFT) / INTRA BANK ACCOUNT TRANSFER FACILITY FOR
                            RECEIVING PAYMENTS
                        </p>
                    </div>

                    <div className="space-y-6">
                        {/* Section A */}
                        <div>
                            <div className="font-bold mb-1 underline">A. DETAILS OF ACCOUNT HOLDER:</div>
                            <table className="w-full border-collapse border border-black text-[11px]">
                                <tbody>
                                    <tr className="border-b border-black">
                                        <td className="w-1/2 p-2 font-bold uppercase border-r border-black">NAME OF ACCOUNT HOLDER / FIRM</td>
                                        <td className="p-2">
                                            <input type="text" value={formData.accountHolderName} onChange={(e) => setFormData({ ...formData, accountHolderName: e.target.value })} className="w-full bg-transparent outline-none uppercase font-bold" />
                                        </td>
                                    </tr>
                                    <tr className="border-b border-black">
                                        <td className="p-2 font-bold uppercase border-r border-black">COMPLETE CONTACT ADDRESS</td>
                                        <td className="p-2">
                                            <textarea value={formData.contactAddress} onChange={(e) => setFormData({ ...formData, contactAddress: e.target.value })} className="w-full bg-transparent outline-none resize-none h-16 font-bold" />
                                        </td>
                                    </tr>
                                    <tr className="border-b border-black">
                                        <td className="p-2 font-bold uppercase border-r border-black">MOBILE NUMBER / PH NO</td>
                                        <td className="p-2">
                                            <input type="text" value={formData.mobileNumber} onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })} className="w-full bg-transparent outline-none font-bold" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 font-bold uppercase border-r border-black">E.MAIL</td>
                                        <td className="p-2">
                                            <input type="text" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-transparent outline-none font-bold italic" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Section B */}
                        <div>
                            <div className="font-bold mb-1 underline">B. BANK ACCOUNT DETAILS:</div>
                            <table className="w-full border-collapse border border-black text-[11px]">
                                <tbody>
                                    <tr className="border-b border-black">
                                        <td className="w-1/2 p-2 font-bold uppercase border-r border-black">
                                            ACCOUNT NAME <br />
                                            <span className="font-normal normal-case italic text-[10px]">(Name appearing in your Cheque Book)</span>
                                        </td>
                                        <td className="p-2">
                                            <input type="text" value={formData.accountName} onChange={(e) => setFormData({ ...formData, accountName: e.target.value })} className="w-full bg-transparent outline-none uppercase font-bold" />
                                        </td>
                                    </tr>
                                    <tr className="border-b border-black">
                                        <td className="p-2 font-bold uppercase border-r border-black">BRANCH NAME WITH ADDRESS, TELEPHONE NO</td>
                                        <td className="p-2">
                                            <textarea value={formData.branchName} onChange={(e) => setFormData({ ...formData, branchName: e.target.value })} className="w-full bg-transparent outline-none resize-none h-16 font-bold" />
                                        </td>
                                    </tr>
                                    <tr className="border-b border-black">
                                        <td className="p-2 font-bold uppercase border-r border-black">BRANCH CODE</td>
                                        <td className="p-2">
                                            <input type="text" value={formData.branchCode} onChange={(e) => setFormData({ ...formData, branchCode: e.target.value })} className="w-full bg-transparent outline-none font-bold" />
                                        </td>
                                    </tr>
                                    <tr className="border-b border-black">
                                        <td className="p-2 font-bold border-r border-black">
                                            <span className="uppercase">COMPLETE BANK ACCOUNT NUMBER</span>
                                            <p className="mt-1 font-normal normal-case text-[9px] leading-tight">
                                                (Note: Account must be in Firm name as per bill/Applicant name).
                                            </p>
                                        </td>
                                        <td className="p-2">
                                            <input type="text" value={formData.accountNumber} onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })} className="w-full bg-transparent outline-none font-bold" />
                                        </td>
                                    </tr>
                                    <tr className="border-b border-black">
                                        <td className="p-2 font-bold uppercase border-r border-black">IFSC CODE</td>
                                        <td className="p-2">
                                            <input type="text" value={formData.ifscCode} onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value })} className="w-full bg-transparent outline-none font-bold" />
                                        </td>
                                    </tr>
                                    <tr className="border-b border-black">
                                        <td className="p-2 font-bold uppercase border-r border-black">TYPE OF ACCOUNT (SB/CURRENT/CC)</td>
                                        <td className="p-2">
                                            <input type="text" value={formData.accountType} onChange={(e) => setFormData({ ...formData, accountType: e.target.value })} className="w-full bg-transparent outline-none font-bold" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 font-bold uppercase border-r border-black">MICR CODE OF BANK</td>
                                        <td className="p-2">
                                            <input type="text" value={formData.micrCode} onChange={(e) => setFormData({ ...formData, micrCode: e.target.value })} className="w-full bg-transparent outline-none font-bold" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="mt-6 text-justify text-[11px] leading-relaxed">
                        I hereby declare that the particulars given above are correct and complete. If the transaction is delayed or not effected at all for reasons of incomplete or incorrect information I would not hold the user institution responsible. I have read the option invitation letter and agree to discharge responsibility expected of me as a participant under the scheme.
                    </div>

                    <div className="mt-10 flex justify-end">
                        <div className="text-center w-64">
                            <input type="text" value={formData.customerName} onChange={(e) => setFormData({ ...formData, customerName: e.target.value })} className="w-full border-b border-black outline-none bg-transparent text-center font-bold" />
                            <p className="mt-1 font-bold">Signature of Customer</p>
                        </div>
                    </div>

                    <div className="mt-12 space-y-4 text-[11px]">
                        <div className="flex gap-2 items-end">
                            <span className="font-bold">Date:</span>
                            <div className={`${isExporting ? 'hidden' : 'no-print'}`}>
                                <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="border-b border-black outline-none bg-transparent w-40 font-bold" />
                            </div>
                            <div className={`${isExporting ? 'block font-bold' : 'hidden print:block'} border-b border-black min-w-[100px] font-bold`}>
                                {formData.date ? new Date(formData.date).toLocaleDateString('en-GB') : ''}
                            </div>
                        </div>
                        <p className="font-bold">Certified that the particulars furnished above are correct as per our records.</p>

                        <div className="flex justify-between items-end pt-8">
                            <div className="italic font-bold">(Bank's Stamp)</div>
                            <div className="text-center w-64">
                                <input type="text" value={formData.customerNameVerification} onChange={(e) => setFormData({ ...formData, customerNameVerification: e.target.value })} className="w-full border-b border-black outline-none bg-transparent text-center font-bold" />
                                <p className="mt-1 font-bold italic">Signature of Customer</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 font-bold text-[11px] border-t border-black pt-4">
                        <span className="underline">N.B:</span> Please attach a Cancelled Cheque along with the account information form.
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
                    .no-print { display: none !important; }
                    body { background: white !important; }
                    #printable-form {
                        width: 100% !important;
                        padding: 0 !important;
                        box-shadow: none !important;
                        zoom: 0.9;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        min-height: 255mm;
                    }
                    table, th, td { 
                        border-color: black !important; 
                        padding-top: 3px !important;
                        padding-bottom: 3px !important;
                    }
                    input, textarea { border-bottom: none !important; }
                    .space-y-6 { margin-top: 3mm !important; margin-bottom: 3mm !important; }
                    .mt-12, .mt-10, .mt-8, .mt-6 { margin-top: 3mm !important; }
                    textarea { min-height: 15mm !important; }
                }
            `}} />
        </div>
    );
};

export default MandateForm;