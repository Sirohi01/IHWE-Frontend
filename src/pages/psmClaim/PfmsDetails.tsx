import React, { useRef, useState, useEffect } from 'react';
import { Download, Printer, Save, Loader2 } from 'lucide-react';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import { jsPDF } from 'jspdf';
import { toPng } from 'html-to-image';
import { psmClaimApi } from '@/services/psmClaimApi';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useReactToPrint } from 'react-to-print';
import ReportHeader from './ReportHeader';

interface PfmsDetailsProps {
    reportId?: string;
}

const PfmsDetails: React.FC<PfmsDetailsProps> = ({ reportId: propReportId }) => {
    const navigate = useNavigate();
    const { id: urlId } = useParams();
    const reportId = propReportId || urlId;

    const { data: ctxData } = useExhibitorCtx() || {};
    const componentRef = useRef<HTMLDivElement>(null);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(!!reportId);
    const [isExporting, setIsExporting] = useState(false);

    const [formData, setFormData] = useState({
        mseUnitName: ctxData?.companyName || '',
        postalAddress: ctxData?.address || '',
        email: ctxData?.email || '',
        mobile: ctxData?.mobile || '',
        directorName: ctxData?.contactName || '',
        dob: '',
        gender: '',
        aadharNumber: '',
        udyamNumber: ctxData?.udyamNumber || '',
        gstNumber: '',
        bankAccountNumber: '',
        bankName: '',
        branchName: '',
        ifscCode: '',
        micrCode: '',
        panNumber: '',
        isNpo: 'No',
        fairName: ctxData?.fairName || '',
        companyName: ctxData?.companyName || ''
    });

    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle: `PFMS_Details_${formData.mseUnitName || 'Document'}`,
    });

    useEffect(() => {
        if (reportId) {
            const fetchReport = async () => {
                try {
                    const res = await psmClaimApi.getReportById('pfms_details', reportId);
                    if (res.success && res.data) {
                        setFormData(res.data.data || res.data);
                    }
                } catch (error) {
                    console.error("Error fetching report:", error);
                    toast.error("Failed to load report data");
                } finally {
                    setLoading(false);
                }
            };
            fetchReport();
        }
    }, [reportId]);

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await psmClaimApi.saveReport('pfms_details', {
                data: formData,
                id: reportId,
                exhibitorId: ctxData?._id
            });
            if (res.success) {
                toast.success(reportId ? 'Report updated' : 'Report saved');
                navigate('/exhibitor-dashboard/psm-claim/reports-table/pfms-details');
            }
        } catch (error) {
            console.error("Error saving report:", error);
            toast.error("Failed to save report");
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

            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(dataUrl);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`PFMS_Details_${formData.mseUnitName || 'Document'}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Please try the Print option instead.');
        } finally {
            setIsExporting(false);
        }
    };

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-blue-600" /></div>;

    const rows = [
        { id: 1, label: 'Name of the MSE unit/ enterprise', value: formData.mseUnitName, key: 'mseUnitName' },
        { id: 2, label: 'Complete postal address of MSE unit/ enterprise', value: formData.postalAddress, key: 'postalAddress', isTextArea: true },
        { id: 3, label: 'e-mail address', value: formData.email, key: 'email' },
        { id: 4, label: 'Mobile number', value: formData.mobile, key: 'mobile' },
        { id: 5, label: 'Name of the Director(s)/ Proprietor/ Partner(s)', value: formData.directorName, key: 'directorName' },
        { id: 6, label: 'Date of Birth (dd / mm / yyyy)', value: formData.dob, key: 'dob', isDate: true },
        { id: 7, label: 'Gender (Male/Female)', value: formData.gender, key: 'gender' },
        { id: 8, label: 'Aadhar Card Number of Director(s)/ Proprietor/ Partners', value: formData.aadharNumber, key: 'aadharNumber' },
        { id: 9, label: 'Udyam Registration Number', value: formData.udyamNumber, key: 'udyamNumber' },
        { id: 10, label: 'GST Number', value: formData.gstNumber, key: 'gstNumber' },
        { id: 11, label: 'Bank Details', isHeader: true },
        { id: 12, label: 'Enterprise Current Bank Account Number linked with Aadhar', value: formData.bankAccountNumber, key: 'bankAccountNumber' },
        { id: 13, label: 'Name of the Bank', value: formData.bankName, key: 'bankName' },
        { id: 14, label: 'Branch name', value: formData.branchName, key: 'branchName' },
        { id: 15, label: 'IFSC code', value: formData.ifscCode, key: 'ifscCode' },
        { id: 16, label: 'MICR of Branch', value: formData.micrCode, key: 'micrCode' },
        { id: 17, label: 'PAN Number', value: formData.panNumber, key: 'panNumber' },
        { id: 18, label: 'Are you a Non profitable organization? (NPO) under prevention of money laundering (Maintenance of Records) as per amendment rule 2023.', value: formData.isNpo, key: 'isNpo', isRadio: true },
    ];

    return (
        <div className="flex flex-col gap-0 mx-auto min-h-screen bg-slate-50/50">
            <ReportHeader title="PFMS Details" />

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

                    <div className="flex justify-center mb-6 mt-10">
                        {/* <img src="/logo.png" alt="HERBALVEDA WELLNESS" className="h-16" /> */}
                    </div>

                    <div className="text-center mb-6">
                        <h1 className="text-sm font-bold uppercase underline">
                            Details of Enterprise for agency creation on PFMS portal:
                        </h1>
                    </div>

                    <table className="w-full border-collapse border border-black text-[11px]">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="border border-black p-2 w-[60px] text-center">Sr. No.</th>
                                <th className="border border-black p-2 text-left">Description of the MSEs as per Udyam Registration</th>
                                <th className="border border-black p-2 w-[40%] text-left">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row) => (
                                <tr key={row.id}>
                                    <td className="border border-black p-2 text-center align-top">{row.id}.</td>
                                    <td className="border border-black p-2 font-medium">{row.label}</td>
                                    <td className="border border-black p-2">
                                        {row.isHeader ? (
                                            null
                                        ) : row.isTextArea ? (
                                            <textarea
                                                className="w-full bg-transparent outline-none resize-none min-h-[60px]"
                                                value={row.value}
                                                onChange={(e) => setFormData({ ...formData, [row.key!]: e.target.value })}
                                            />
                                        ) : row.isDate ? (
                                            <div className="relative">
                                                <div className={`${isExporting ? 'hidden' : 'no-print'}`}>
                                                    <input
                                                        type="date"
                                                        className="w-full bg-transparent outline-none border-b border-dashed border-slate-300"
                                                        value={row.value}
                                                        onChange={(e) => setFormData({ ...formData, [row.key!]: e.target.value })}
                                                    />
                                                </div>
                                                <div className={`${isExporting ? 'block font-bold' : 'hidden print:block'}`}>
                                                    {row.value ? new Date(row.value).toLocaleDateString('en-GB') : ''}
                                                </div>
                                            </div>
                                        ) : row.isRadio ? (
                                            <div className="flex justify-around items-center h-full gap-4">
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <span className={`w-3 h-3 border border-black rounded-full flex items-center justify-center ${formData.isNpo === 'Yes' ? 'bg-black' : ''}`}>
                                                        {formData.isNpo === 'Yes' && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                                                    </span>
                                                    <span>Yes</span>
                                                    <input type="radio" className="hidden" name="isNpo" value="Yes" checked={formData.isNpo === 'Yes'} onChange={(e) => setFormData({ ...formData, isNpo: e.target.value })} />
                                                </label>
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <span className={`w-3 h-3 border border-black rounded-full flex items-center justify-center ${formData.isNpo === 'No' ? 'bg-black' : ''}`}>
                                                        {formData.isNpo === 'No' && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                                                    </span>
                                                    <span>No</span>
                                                    <input type="radio" className="hidden" name="isNpo" value="No" checked={formData.isNpo === 'No'} onChange={(e) => setFormData({ ...formData, isNpo: e.target.value })} />
                                                </label>
                                            </div>
                                        ) : (
                                            <input
                                                type="text"
                                                className="w-full bg-transparent outline-none"
                                                value={row.value}
                                                onChange={(e) => setFormData({ ...formData, [row.key!]: e.target.value })}
                                            />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="mt-10 flex flex-col items-end px-4">
                        <div className="text-right mt-10">
                            {/* <p className="font-bold mb-8">For {formData.mseUnitName}</p> */}
                            <div className="flex flex-col items-center">
                                <div className="border-b border-black w-40 h-1"></div>
                                <p className="font-bold mt-1 uppercase">{formData.directorName}</p>
                                <p className="text-[10px] italic">Partner/Proprietor</p>
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
                        margin: 10mm 15mm; 
                    }
                    .no-print { display: none !important; }
                    body { background: white !important; }
                    #printable-form {
                        width: 100% !important;
                        padding: 0 !important;
                        box-shadow: none !important;
                        zoom: 1;
                        display: flex;
                        flex-direction: column;
                        min-height: 277mm;
                        border: none !important;
                    }
                    table, th, td { 
                        border-color: black !important; 
                        padding: 6px !important;
                    }
                    input, textarea { border: none !important; }
                }
            `}} />
        </div>
    );
};

export default PfmsDetails;
