import React, { useState, useEffect, useRef } from 'react';
import { psmClaimApi } from '@/services/psmClaimApi';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import { toast } from 'sonner';
import { useReportActions } from './common/useReportActions';
import ReportLayout from './common/ReportLayout';
import { Loader2 } from 'lucide-react';

interface Props { reportId?: string; }

const AnnexureD: React.FC<Props> = ({ reportId }) => {
    const { data: ctxData } = useExhibitorCtx() || {};
    const componentRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(!!reportId);

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
        date: new Date().toISOString().split('T')[0],
        place: '',
        companyName: ctxData?.companyName || ''
    });

    const {
        saving,
        isExporting,
        handleSave,
        handlePrint,
        handleDownload
    } = useReportActions({
        reportType: 'annexure-d',
        reportId,
        formData,
        componentRef,
        exhibitorId: ctxData?._id
    });

    useEffect(() => {
        if (reportId) {
            const loadData = async () => {
                try {
                    const res = await psmClaimApi.getReportById('annexure-d', reportId);
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

    const sections = [
        { label: 'Name of Implementing agency', key: 'implementingAgency' },
        { label: 'Name of the Applicant Unit', key: 'applicantUnit' },
        { label: 'Complete address, phone, Fax, e-mail', key: 'address', isTextArea: true },
        { label: 'Udyam Registration Number', key: 'udyamRegistration' },
        { label: 'Category (General/Women/SC/ST/NER/PH)', key: 'entrepreneurCategory' },
        { label: 'Type of the unit (Micro or Small)', key: 'unitType' },
        { label: 'Category (Manufacturing/Service)', key: 'unitCategory' },
        { label: 'Products manufactured/service rendered', key: 'products', isTextArea: true },
    ];

    return (
        <ReportLayout
            title="Annexure D"
            componentRef={componentRef}
            handlePrint={handlePrint}
            handleDownload={handleDownload}
            handleSave={handleSave}
            saving={saving}
            reportId={reportId}
            isExporting={isExporting}
        >
            <div className="text-center mb-8 font-bold mt-2">
                <h1 className="text-lg underline uppercase">ANNEXURE - D</h1>
                <h2 className="text-lg underline uppercase mt-2">CLAIM FORM</h2>
                <h3 className="text-[12px] font-bold underline mt-2">(To be filled by beneficiary unit for claiming reimbursement)</h3>
            </div>

            <table className="w-full border-collapse border border-black text-[12px]">
                <tbody>
                    <tr>
                        <td colSpan={3} className="border border-black px-3 py-2 font-bold bg-gray-50 print:bg-transparent uppercase tracking-wider">
                            PART - I : Entrepreneurs' Details :
                        </td>
                    </tr>
                    {sections.map((sec, idx) => (
                        <tr key={sec.key}>
                            <td className="border border-black px-2 py-2 text-center w-10 font-bold">{idx + 1}.</td>
                            <td className="border border-black px-3 py-2 w-[40%] font-bold">{sec.label}</td>
                            <td className="border border-black px-3 py-2">
                                {sec.isTextArea ? (
                                    <textarea
                                        value={(formData as any)[sec.key]}
                                        onChange={(e) => setFormData({ ...formData, [sec.key]: e.target.value })}
                                        className="w-full outline-none bg-transparent resize-none h-16 border-none"
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        value={(formData as any)[sec.key]}
                                        onChange={(e) => setFormData({ ...formData, [sec.key]: e.target.value })}
                                        className="w-full outline-none bg-transparent border-none font-bold"
                                    />
                                )}
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan={3} className="border border-black px-3 py-2 font-bold bg-gray-50 print:bg-transparent uppercase tracking-wider">
                            PART-II: Event details
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-black px-2 py-2 text-center w-10 align-top font-bold">9.</td>
                        <td className="border border-black px-3 py-2 font-bold">Name of event, venue, duration</td>
                        <td className="border border-black px-3 py-2">
                            <textarea
                                value={formData.eventDetails}
                                onChange={(e) => setFormData({ ...formData, eventDetails: e.target.value })}
                                className="w-full outline-none bg-transparent resize-none h-16 border-none"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-black px-2 py-2 text-center w-10 align-top font-bold">10.</td>
                        <td className="border border-black px-3 py-2 font-bold">Feedback: [about 200 words]</td>
                        <td className="border border-black px-3 py-2">
                            <textarea
                                value={formData.feedback}
                                onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                                className="w-full outline-none bg-transparent resize-none h-24 text-[11px] border-none"
                                placeholder="Include details about new business tie-ups achieved through the event..."
                            />
                        </td>
                    </tr>
                </tbody>
            </table>

            <table className="w-full border-collapse border border-black border-t-0 text-[12px] mt-6">
                <thead>
                    <tr className="bg-gray-50 print:bg-transparent font-bold">
                        <td colSpan={4} className="border border-black px-3 py-2 uppercase tracking-wider">PART -III : Payment Details (DETAILS OF CLAIM in Rs.)</td>
                    </tr>
                    <tr className="text-center font-bold">
                        <th className="border border-black px-2 py-2 w-[20%]">Scheme Component</th>
                        <th className="border border-black px-2 py-2 w-[40%]">Items</th>
                        <th className="border border-black px-2 py-2 w-[20%]">Actual Exp. (in Rs.)</th>
                        <th className="border border-black px-2 py-2 w-[20%]">Admissible (in Rs.)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border border-black px-3 py-2 font-bold align-top" rowSpan={2}>
                            Domestic Trade Fairs / Exhibitions
                        </td>
                        <td className="border border-black px-3 py-2 text-[10px] leading-tight">
                            Contingency expenditure including travel, (attach expenditure copy)
                        </td>
                        <td className="border border-black px-2 py-2">
                            <input
                                type="number"
                                value={formData.expenditureTravel}
                                onChange={(e) => setFormData({ ...formData, expenditureTravel: e.target.value })}
                                className="w-full outline-none bg-transparent text-center border-none font-bold"
                            />
                        </td>
                        <td className="border border-black px-2 py-2">
                            <input
                                type="number"
                                value={formData.admissibleTravel}
                                onChange={(e) => setFormData({ ...formData, admissibleTravel: e.target.value })}
                                className="w-full outline-none bg-transparent text-center border-none font-bold"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-black px-3 py-2 text-[10px] leading-tight">
                            Space Rent (stall rent) (Attach invoice / bill)
                        </td>
                        <td className="border border-black px-2 py-2">
                            <input
                                type="number"
                                value={formData.expenditureSpace}
                                onChange={(e) => setFormData({ ...formData, expenditureSpace: e.target.value })}
                                className="w-full outline-none bg-transparent text-center border-none font-bold"
                            />
                        </td>
                        <td className="border border-black px-2 py-2">
                            <input
                                type="number"
                                value={formData.admissibleSpace}
                                onChange={(e) => setFormData({ ...formData, admissibleSpace: e.target.value })}
                                className="w-full outline-none bg-transparent text-center border-none font-bold"
                            />
                        </td>
                    </tr>
                    <tr className="font-bold">
                        <td colSpan={2} className="border border-black px-3 py-3 text-center uppercase tracking-widest text-[11px]">Total (in Rs.)</td>
                        <td className="border border-black px-2 py-2">
                            <input
                                type="number"
                                value={formData.totalExpenditure}
                                onChange={(e) => setFormData({ ...formData, totalExpenditure: e.target.value })}
                                className="w-full outline-none bg-transparent text-center font-bold border-none text-[13px]"
                            />
                        </td>
                        <td className="border border-black px-2 py-2">
                            <input
                                type="number"
                                value={formData.totalAdmissible}
                                onChange={(e) => setFormData({ ...formData, totalAdmissible: e.target.value })}
                                className="w-full outline-none bg-transparent text-center font-bold border-none text-[13px]"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className="mt-12 space-y-4 pb-10">
                <div className="flex justify-between items-end pr-10">
                    <div className="space-y-6">
                        <div className="flex gap-2 items-end">
                            <span className="font-bold text-[11px] uppercase opacity-50">Place:</span>
                            <input
                                type="text"
                                value={formData.place}
                                onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                                className="border-b border-black/30 outline-none bg-transparent w-48 font-bold px-1 border-none"
                            />
                        </div>
                        <div className="flex gap-2 items-end">
                            <span className="font-bold text-[11px] uppercase opacity-50">Date:</span>
                            <div className={`${isExporting ? 'hidden' : 'no-print'}`}>
                                <input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="border-b border-black/30 outline-none bg-transparent w-48 font-bold px-1 border-none"
                                />
                            </div>
                            <div className={`${isExporting ? 'block font-bold' : 'hidden print:block'} border-b border-black min-w-[120px] px-1 print-bold`}>
                                {formData.date ? new Date(formData.date).toLocaleDateString('en-GB') : ''}
                            </div>
                        </div>
                    </div>
                    <div className="text-center w-64">
                        <div className="border-b-2 border-black w-full mb-2 h-1"></div>
                        <p className="font-extrabold text-[10px] uppercase tracking-wider">Signature of authorized signatory</p>
                        <p className="text-[9px] italic opacity-60">(With Office Seal)</p>
                    </div>
                </div>
            </div>
        </ReportLayout>
    );
};

export default AnnexureD;
