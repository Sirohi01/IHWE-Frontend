import React, { useEffect, useRef, useState } from 'react';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import { psmClaimApi } from '@/services/psmClaimApi';
import { toast } from 'sonner';
import { useReportActions } from './common/useReportActions';
import ReportLayout from './common/ReportLayout';
import { Loader2 } from 'lucide-react';

interface Props { reportId?: string; }

const FeedbackReport: React.FC<Props> = ({ reportId }) => {
    const { data: ctxData } = useExhibitorCtx() || {};
    const componentRef = useRef<HTMLDivElement>(null);
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
        date: '',
        companyName: ctxData?.companyName || ''
    });

    const {
        saving,
        isExporting,
        handleSave,
        handlePrint,
        handleDownload
    } = useReportActions({
        reportType: 'feedback-report',
        reportId,
        formData,
        componentRef,
        exhibitorId: ctxData?._id
    });

    useEffect(() => {
        if (reportId) {
            const loadData = async () => {
                try {
                    const res = await psmClaimApi.getReportById('feedback-report', reportId);
                    if (res.success) {
                        setFormData(prev => ({ ...prev, ...res.data }));
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

    const updateTech = (index: number, field: string, value: string) => {
        const newTech = [...formData.technologies];
        (newTech[index] as any)[field] = value;
        setFormData({ ...formData, technologies: newTech });
    };

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-blue-600" /></div>;

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
        { id: 13, label: 'Would you like to participate again in the event? If yes, reason for the same.', value: formData.participateAgain, key: 'participateAgain' },
    ];

    return (
        <ReportLayout
            title="Feedback Report"
            componentRef={componentRef}
            handlePrint={handlePrint}
            handleDownload={handleDownload}
            handleSave={handleSave}
            saving={saving}
            reportId={reportId}
            isExporting={isExporting}
            isLetterhead={true}
        >
            <div className="text-center mb-8 mt-4">
                <h1 className="text-[16px] font-bold uppercase underline">PARTICIPANTS FEEDBACK REPORT</h1>
                <p className="italic font-medium text-[11px] mt-1">(To be filled in by all individual participants separately)</p>
                <p className="italic font-medium text-[11px]">(All columns should be filled)</p>
            </div>

            <table className="w-full border-collapse border border-black table-fixed">
                <tbody>
                    {mainRows.map((row) => (
                        <tr key={row.id} className="border-b border-black">
                            <td className="w-[40px] text-center border-r border-black font-bold py-2">{row.id}</td>
                            <td className="p-2 border-r border-black font-bold w-[45%] text-[11px] leading-tight">{row.label}</td>
                            <td className="p-2 overflow-hidden">
                                <textarea
                                    value={row.value}
                                    onChange={(e) => setFormData({ ...formData, [row.key]: e.target.value })}
                                    className={`w-full bg-transparent outline-none resize-none min-h-[1.5rem] overflow-hidden border-none ${isExporting ? 'hidden' : 'print:hidden'}`}
                                    rows={1}
                                    placeholder="Enter details here..."
                                />
                                <div className={`${isExporting ? 'block font-bold' : 'hidden print:block'} whitespace-pre-wrap break-words min-h-[1.5rem] text-[11px] print-bold`}>
                                    {row.value || ''}
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
                                className={`w-full bg-transparent outline-none resize-none min-h-[6rem] overflow-hidden border-none ${isExporting ? 'hidden' : 'print:hidden'}`}
                                placeholder="Enter your comments regarding the benefits of participation..."
                            />
                            <div className={`${isExporting ? 'block font-bold' : 'hidden print:block'} whitespace-pre-wrap break-words min-h-[6rem] text-[11px] print-bold`}>
                                {formData.comments || ''}
                            </div>
                        </td>
                    </tr>

                    {eventRows.map((row) => (
                        <tr key={row.id} className="border-b border-black">
                            <td className="text-center border-r border-black font-bold py-2">{row.id}</td>
                            <td className="p-2 border-r border-black font-bold text-[11px] leading-tight">{row.label}</td>
                            <td className="p-2 overflow-hidden">
                                <textarea
                                    value={row.value}
                                    onChange={(e) => setFormData({ ...formData, [row.key]: e.target.value })}
                                    className={`w-full bg-transparent outline-none resize-none min-h-[1.5rem] overflow-hidden border-none ${isExporting ? 'hidden' : 'print:hidden'}`}
                                    rows={1}
                                    placeholder="Enter details here..."
                                />
                                <div className={`${isExporting ? 'block font-bold' : 'hidden print:block'} whitespace-pre-wrap break-words min-h-[1.5rem] text-[11px] print-bold`}>
                                    {row.value || ''}
                                </div>
                            </td>
                        </tr>
                    ))}

                    <tr className="border-b border-black">
                        <td className="text-center border-r border-black font-bold py-2">14</td>
                        <td colSpan={2} className="p-2 font-bold leading-tight">
                            <span className="text-[11px]">Details of technologies noticed in the event which would be useful for MSMEs in India (copies of the brochures and other relevant literature may be attached as separate sheet):</span>
                            <div className="mt-3 overflow-hidden">
                                <table className="w-full border-collapse border border-black text-[10px] table-fixed">
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
                                                <td className="border border-black p-1 align-top break-words"><textarea value={tech.country} onChange={(e) => updateTech(idx, 'country', e.target.value)} className="w-full bg-transparent border-none outline-none resize-none text-center" rows={1} placeholder="Country" /></td>
                                                <td className="border border-black p-1 align-top break-words"><textarea value={tech.field} onChange={(e) => updateTech(idx, 'field', e.target.value)} className="w-full bg-transparent border-none outline-none resize-none text-center" rows={1} placeholder="Field/Sector" /></td>
                                                <td className="border border-black p-1 align-top break-words"><textarea value={tech.description} onChange={(e) => updateTech(idx, 'description', e.target.value)} className="w-full bg-transparent border-none outline-none resize-none" rows={1} placeholder="Description" /></td>
                                                <td className="border border-black p-1 align-top break-words"><textarea value={tech.contact} onChange={(e) => updateTech(idx, 'contact', e.target.value)} className="w-full bg-transparent border-none outline-none resize-none" rows={1} placeholder="Contact Details" /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td className="text-center font-bold p-2 border-r border-black align-top">15</td>
                        <td className="font-bold border-r border-black p-2 text-[11px]">Remarks/Suggestions, if any</td>
                        <td className="p-2 border-b border-black overflow-hidden">
                            <textarea
                                value={formData.remarks}
                                onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                                className={`w-full bg-transparent outline-none resize-none min-h-[2.5rem] border-none ${isExporting ? 'hidden' : 'print:hidden'}`}
                                placeholder="Enter any additional remarks or suggestions..."
                            />
                            <div className={`${isExporting ? 'block font-bold' : 'hidden print:block'} whitespace-pre-wrap break-words min-h-[2.5rem] text-[11px] print-bold`}>
                                {formData.remarks || ''}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className="mt-2 space-y-8">
                <p className="font-bold text-[11px]">Enclosed: Photograph of allotted booth at the event venue.</p>

                <div className="flex justify-between items-end mt-12 px-2 pb-10">
                    <div className="flex gap-2 items-end">
                        <span className="font-bold text-[11px]">Date:</span>
                        <div className={`${isExporting ? 'hidden' : 'no-print'}`}>
                            <input
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="border-b border-black w-40 px-1 bg-transparent border-none outline-none font-bold text-[11px]"
                            />
                        </div>
                        <div className={`${isExporting ? 'block font-bold' : 'hidden print:block'} border-b border-black min-w-[100px] font-bold text-[11px] print-bold`}>
                            {formData.date ? new Date(formData.date).toLocaleDateString('en-GB') : ''}
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="border-b-2 border-black w-64 h-1"></div>
                        <span className="font-bold text-[9px] mt-2 text-center uppercase leading-none">SIGNATURE/NAME/DESIGNATION OF PARTICIPANT</span>
                    </div>
                </div>
            </div>
        </ReportLayout>
    );
};

export default FeedbackReport;
