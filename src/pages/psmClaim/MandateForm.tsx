import React, { useState, useEffect, useRef } from 'react';
import { psmClaimApi } from '@/services/psmClaimApi';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import { toast } from 'sonner';
import { useReportActions } from './common/useReportActions';
import ReportLayout from './common/ReportLayout';
import { Loader2 } from 'lucide-react';

interface Props { reportId?: string; }

const MandateForm: React.FC<Props> = ({ reportId }) => {
    const { data: ctxData } = useExhibitorCtx() || {};
    const componentRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(!!reportId);

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
        customerNameVerification: ctxData?.contactName || '',
        companyName: ctxData?.companyName || ''
    });

    const {
        saving,
        isExporting,
        handleSave,
        handlePrint,
        handleDownload
    } = useReportActions({
        reportType: 'mandate-form',
        reportId,
        formData,
        componentRef,
        exhibitorId: ctxData?._id
    });

    useEffect(() => {
        if (reportId) {
            const loadData = async () => {
                try {
                    const res = await psmClaimApi.getReportById('mandate-form', reportId);
                    if (res.success && res.data) {
                        setFormData(prev => ({ ...prev, ...(res.data.data || res.data) }));
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

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-[#23471d]" /></div>;

    return (
        <ReportLayout
            title="Mandate Form"
            componentRef={componentRef}
            handlePrint={handlePrint}
            handleDownload={handleDownload}
            handleSave={handleSave}
            saving={saving}
            reportId={reportId}
            isExporting={isExporting}
            showUnderlines={false}
        >
            <div className="text-center mb-6 print:mb-2 mt-4 print:mt-0">
                <h1 className="text-xl print:text-lg font-bold uppercase mb-2 border-b border-black inline-block px-10">MANDATE FORM</h1>
                <h2 className="text-lg print:text-base font-bold mb-4 print:mb-2 italic">(Account/s Information form)</h2>

                <p className="text-[10px] print:text-[9px] font-bold uppercase leading-relaxed max-w-2xl mx-auto opacity-70">
                    ELECTRONIC CLEARING SERVICE (CREDIT CLEARING) / REAL TIME GROSS SETTLEMENT (RTGS) /
                    NATIONAL ELECTRONIC TRANSFER (NEFT) / INTRA BANK ACCOUNT TRANSFER FACILITY FOR
                    RECEIVING PAYMENTS
                </p>
            </div>

            <div className="space-y-6 print:space-y-4 font-inter">
                <div>
                    <div className="font-bold mb-1 underline text-[12px] print:text-[11px]">A. DETAILS OF ACCOUNT HOLDER:</div>
                    <table className="w-full border-collapse border border-black text-[11px] print:text-[10.5px]">
                        <tbody>
                            <tr className="border-b border-black">
                                <td className="w-1/2 p-2 print:p-1.5 font-bold uppercase border-r border-black">NAME OF ACCOUNT HOLDER / FIRM</td>
                                <td className="p-2 print:p-1.5">
                                    <input type="text" value={formData.accountHolderName} onChange={(e) => setFormData({ ...formData, accountHolderName: e.target.value })} className="w-full bg-transparent outline-none uppercase font-bold" />
                                </td>
                            </tr>
                            <tr className="border-b border-black">
                                <td className="p-2 print:p-1.5 font-bold uppercase border-r border-black">COMPLETE CONTACT ADDRESS</td>
                                <td className="p-2 print:p-1.5">
                                    <textarea value={formData.contactAddress} onChange={(e) => setFormData({ ...formData, contactAddress: e.target.value })} className="w-full bg-transparent outline-none resize-none h-16 print:h-12 font-bold" />
                                </td>
                            </tr>
                            <tr className="border-b border-black">
                                <td className="p-2 print:p-1.5 font-bold uppercase border-r border-black">MOBILE NUMBER / PH NO</td>
                                <td className="p-2 print:p-1.5">
                                    <input type="text" value={formData.mobileNumber} onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })} className="w-full bg-transparent outline-none font-bold" />
                                </td>
                            </tr>
                            <tr>
                                <td className="p-2 print:p-1.5 font-bold uppercase border-r border-black">E.MAIL</td>
                                <td className="p-2 print:p-1.5">
                                    <input type="text" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-transparent outline-none font-bold italic" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div>
                    <div className="font-bold mb-1 underline text-[12px] print:text-[11px]">B. BANK ACCOUNT DETAILS:</div>
                    <table className="w-full border-collapse border border-black text-[11px] print:text-[10.5px]">
                        <tbody>
                            <tr className="border-b border-black">
                                <td className="w-1/2 p-2 print:p-1.5 font-bold uppercase border-r border-black">
                                    ACCOUNT NAME <br />
                                    <span className="font-normal normal-case italic text-[9px] opacity-60">(Name appearing in your Cheque Book)</span>
                                </td>
                                <td className="p-2 print:p-1.5">
                                    <input type="text" value={formData.accountName} onChange={(e) => setFormData({ ...formData, accountName: e.target.value })} className="w-full bg-transparent outline-none uppercase font-bold" />
                                </td>
                            </tr>
                            <tr className="border-b border-black">
                                <td className="p-2 print:p-1.5 font-bold uppercase border-r border-black">BRANCH NAME WITH ADDRESS, TELEPHONE NO</td>
                                <td className="p-2 print:p-1.5">
                                    <textarea value={formData.branchName} onChange={(e) => setFormData({ ...formData, branchName: e.target.value })} className="w-full bg-transparent outline-none resize-none h-16 print:h-12 font-bold" />
                                </td>
                            </tr>
                            <tr className="border-b border-black">
                                <td className="p-2 print:p-1.5 font-bold uppercase border-r border-black">BRANCH CODE</td>
                                <td className="p-2 print:p-1.5">
                                    <input type="text" value={formData.branchCode} onChange={(e) => setFormData({ ...formData, branchCode: e.target.value })} className="w-full bg-transparent outline-none font-bold" />
                                </td>
                            </tr>
                            <tr className="border-b border-black">
                                <td className="p-2 print:p-1.5 font-bold border-r border-black">
                                    <span className="uppercase">COMPLETE BANK ACCOUNT NUMBER</span>
                                    <p className="mt-1 font-normal normal-case text-[9px] leading-tight opacity-60">
                                        (Note: Account must be in Firm name as per bill/Applicant name).
                                    </p>
                                </td>
                                <td className="p-2 print:p-1.5">
                                    <input type="text" value={formData.accountNumber} onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })} className="w-full bg-transparent outline-none font-bold" />
                                </td>
                            </tr>
                            <tr className="border-b border-black">
                                <td className="p-2 print:p-1.5 font-bold uppercase border-r border-black">IFSC CODE</td>
                                <td className="p-2 print:p-1.5">
                                    <input type="text" value={formData.ifscCode} onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value })} className="w-full bg-transparent outline-none font-bold" />
                                </td>
                            </tr>
                            <tr className="border-b border-black">
                                <td className="p-2 print:p-1.5 font-bold uppercase border-r border-black">TYPE OF ACCOUNT (SB/CURRENT/CC)</td>
                                <td className="p-2 print:p-1.5">
                                    <input type="text" value={formData.accountType} onChange={(e) => setFormData({ ...formData, accountType: e.target.value })} className="w-full bg-transparent outline-none font-bold" />
                                </td>
                            </tr>
                            <tr>
                                <td className="p-2 print:p-1.5 font-bold uppercase border-r border-black">MICR CODE OF BANK</td>
                                <td className="p-2 print:p-1.5">
                                    <input type="text" value={formData.micrCode} onChange={(e) => setFormData({ ...formData, micrCode: e.target.value })} className="w-full bg-transparent outline-none font-bold" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-8 print:mt-4 text-justify text-[11px] print:text-[10px] leading-relaxed italic opacity-80">
                I hereby declare that the particulars given above are correct and complete. If the transaction is delayed or not effected at all for reasons of incomplete or incorrect information I would not hold the user institution responsible. I have read the option invitation letter and agree to discharge responsibility expected of me as a participant under the scheme.
            </div>

            <div className="mt-10 print:mt-4 flex justify-end pr-10 print:pr-4">
                <div className="text-center w-64 print:w-48">
                    <input type="text" value={formData.customerName} onChange={(e) => setFormData({ ...formData, customerName: e.target.value })} className="w-full border-b border-black outline-none bg-transparent text-center font-bold" />
                    <p className="mt-2 font-bold uppercase text-[9px]">Signature of Customer</p>
                </div>
            </div>

            <div className="mt-12 print:mt-4 space-y-6 print:space-y-2 text-[11px] pb-10 print:pb-0">
                <div className="flex gap-2 items-end">
                    <span className="font-bold uppercase opacity-50 text-[10px]">Date:</span>
                    <div className={`${isExporting ? 'hidden' : 'no-print'}`}>
                        <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="border-b border-black outline-none bg-transparent w-40 font-bold" />
                    </div>
                    <div className={`${isExporting ? 'block print-bold' : 'hidden print:block'} border-b border-black min-w-[100px] font-bold`}>
                        {formData.date ? new Date(formData.date).toLocaleDateString('en-GB') : ''}
                    </div>
                </div>

                <p className="font-bold underline decoration-1 underline-offset-2">Certified that the particulars furnished above are correct as per our records.</p>

                <div className="flex justify-between items-end pt-10 print:pt-4">
                    <div className="italic font-bold opacity-30 text-[18px] print:text-[14px]">Bank's Stamp</div>
                    <div className="text-center w-64 print:w-48">
                        <input type="text" value={formData.customerNameVerification} onChange={(e) => setFormData({ ...formData, customerNameVerification: e.target.value })} className="w-full border-b border-black outline-none bg-transparent text-center font-bold" />
                        <p className="mt-2 font-bold italic text-[9px]">Signature of Customer</p>
                    </div>
                </div>

                <div className="mt-10 font-bold text-[10px] border-t border-black/20 pt-4 italic">
                    <span className="underline uppercase tracking-widest mr-2">N.B:</span> Please attach a Cancelled Cheque along with the account information form.
                </div>
            </div>
        </ReportLayout>
    );
};

export default MandateForm;
