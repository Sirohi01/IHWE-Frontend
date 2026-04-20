import React, { useRef, useState, useEffect } from 'react';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import { psmClaimApi } from '@/services/psmClaimApi';
import { toast } from 'sonner';
import { useReportActions } from './common/useReportActions';
import ReportLayout from './common/ReportLayout';
import { Loader2 } from 'lucide-react';

interface PfmsDetailsProps {
    reportId?: string;
}

const PfmsDetails: React.FC<PfmsDetailsProps> = ({ reportId }) => {
    const { data: ctxData } = useExhibitorCtx() || {};
    const componentRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(!!reportId);

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

    const {
        saving,
        isExporting,
        handleSave,
        handlePrint,
        handleDownload
    } = useReportActions({
        reportType: 'pfms_details',
        reportId,
        formData,
        componentRef,
        exhibitorId: ctxData?._id
    });

    useEffect(() => {
        if (reportId) {
            const fetchReport = async () => {
                try {
                    const res = await psmClaimApi.getReportById('pfms_details', reportId);
                    if (res.success && res.data) {
                        setFormData(prev => ({ ...prev, ...(res.data.data || res.data) }));
                    }
                } catch (error) {
                    toast.error("Failed to load report data");
                } finally {
                    setLoading(false);
                }
            };
            fetchReport();
        }
    }, [reportId]);

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
        <ReportLayout
            title="PFMS Details"
            componentRef={componentRef}
            handlePrint={handlePrint}
            handleDownload={handleDownload}
            handleSave={handleSave}
            saving={saving}
            reportId={reportId}
            isExporting={isExporting}
        >
            <div className="text-center mb-8 mt-10">
                <h1 className="text-[15px] font-bold uppercase underline">
                    Details of Enterprise for agency creation on PFMS portal:
                </h1>
            </div>

            <table className="w-full border-collapse border border-black text-[12px]">
                <thead>
                    <tr className="bg-slate-50/50">
                        <th className="border border-black p-2 w-[60px] text-center">Sr. No.</th>
                        <th className="border border-black p-3 text-left">Description of the MSEs as per Udyam Registration</th>
                        <th className="border border-black p-3 w-[40%] text-left">Details</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row.id}>
                            <td className="border border-black p-2 text-center align-top font-bold">{row.id}.</td>
                            <td className="border border-black p-3 font-medium">{row.label}</td>
                            <td className="border border-black p-3">
                                {row.isHeader ? (
                                    null
                                ) : row.isTextArea ? (
                                    <textarea
                                        className="w-full bg-transparent outline-none resize-none min-h-[60px] border-none font-bold"
                                        value={row.value as string}
                                        onChange={(e) => setFormData({ ...formData, [row.key!]: e.target.value })}
                                    />
                                ) : row.isDate ? (
                                    <div className="relative">
                                        <div className={`${isExporting ? 'hidden' : 'no-print'}`}>
                                            <input
                                                type="date"
                                                className="w-full bg-transparent outline-none border-none font-bold"
                                                value={row.value as string}
                                                onChange={(e) => setFormData({ ...formData, [row.key!]: e.target.value })}
                                            />
                                        </div>
                                        <div className={`${isExporting ? 'block print-bold' : 'hidden print:block'}`}>
                                            {row.value ? new Date(row.value as string).toLocaleDateString('en-GB') : ''}
                                        </div>
                                    </div>
                                ) : row.isRadio ? (
                                    <div className="flex justify-around items-center h-full gap-4 pt-1">
                                        {['Yes', 'No'].map(val => (
                                            <label key={val} className="flex items-center gap-2 cursor-pointer group">
                                                <div className={`w-4 h-4 rounded-full border border-black flex items-center justify-center transition-all ${formData.isNpo === val ? 'bg-blue-600 border-blue-600 shadow-sm' : 'hover:bg-slate-50'}`}>
                                                    {formData.isNpo === val && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                                                </div>
                                                <span className={`font-bold transition-colors ${formData.isNpo === val ? 'text-blue-600' : 'text-slate-500'}`}>{val}</span>
                                                <input type="radio" className="hidden" name="isNpo" value={val} checked={formData.isNpo === val} onChange={(e) => setFormData({ ...formData, isNpo: e.target.value })} />
                                            </label>
                                        ))}
                                    </div>
                                ) : (
                                    <input
                                        type="text"
                                        className="w-full bg-transparent outline-none border-none font-bold"
                                        value={row.value as string}
                                        onChange={(e) => setFormData({ ...formData, [row.key!]: e.target.value })}
                                    />
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-12 flex flex-col items-end px-10 pb-20">
                <div className="text-center w-64 pt-10">
                    <div className="border-b-2 border-black w-full h-1 mb-2"></div>
                    <p className="font-extrabold mt-1 uppercase text-[11px] tracking-wider">{formData.directorName}</p>
                    <p className="text-[10px] italic opacity-60">Partner/Proprietor</p>
                </div>
            </div>
        </ReportLayout>
    );
};

export default PfmsDetails;
