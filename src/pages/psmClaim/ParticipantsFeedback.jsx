import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { psmClaimApi } from '@/services/psmClaimApi';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import { toast } from 'sonner';
import { useReportActions } from './common/useReportActions';
import ReportLayout from './common/ReportLayout';
import { Loader2 } from 'lucide-react';

const ParticipantsFeedback = ({ reportId: propReportId }) => {
    const { id: urlId } = useParams();
    const reportId = propReportId || urlId;
    
    const { data: ctxData } = useExhibitorCtx() || {};
    const componentRef = useRef(null);
    const [loading, setLoading] = useState(!!reportId);

    const [formData, setFormData] = useState({
        mseUnitName: ctxData?.companyName || '',
        plantAddress: ctxData?.address || '',
        proprietorName: ctxData?.contactName || '',
        mobileNumber: ctxData?.mobile || '',
        email: ctxData?.email || '',
        website: '',
        eventDetails: ctxData?.fairName || '',
        benefitsComments: '',
        visitorCount: '',
        exportInquiries: '',
        businessFinalized: '',
        otherAchievements: '',
        participateAgain: '',
        techNoticed: [
            { country: '', sector: '', description: '', contact: '' },
            { country: '', sector: '', description: '', contact: '' }
        ],
        remarks: '',
        date: new Date().toISOString().split('T')[0],
        participantName: ctxData?.contactName || ''
    });

    const {
        saving,
        isExporting,
        handleSave,
        handlePrint,
        handleDownload
    } = useReportActions({
        reportType: 'participants-feedback',
        reportId,
        formData,
        componentRef,
        exhibitorId: ctxData?._id
    });

    useEffect(() => {
        if (reportId) {
            const loadData = async () => {
                try {
                    const res = await psmClaimApi.getReportById('participants-feedback', reportId);
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

    const updateTech = (index, field, value) => {
        const newTech = [...formData.techNoticed];
        newTech[index][field] = value;
        setFormData({ ...formData, techNoticed: newTech });
    };

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-[#23471d]" /></div>;

    return (
        <ReportLayout
            title="Participants Feedback"
            componentRef={componentRef}
            handlePrint={handlePrint}
            handleDownload={handleDownload}
            handleSave={handleSave}
            saving={saving}
            reportId={reportId}
            isExporting={isExporting}
            isLetterhead={true}
        >
            <div className="text-center mb-8 print:mb-4 font-bold">
                <h1 className="text-lg print:text-base underline uppercase">PARTICIPANTS FEEDBACK REPORT</h1>
                <p className="text-[11px] mt-1 normal-case">(To be filled in by all individual participants separately)</p>
                <p className="text-[11px] normal-case">(All columns should be filled)</p>
            </div>

            <table className="w-full border-collapse border border-black text-[11px]">
                <tbody>
                    <tr>
                        <td className="border border-black px-3 py-2 print:py-1 text-center w-10 font-bold">1</td>
                        <td className="border border-black px-3 py-2 print:py-1 w-[40%] font-bold">Name of the participating MSE unit</td>
                        <td className="border border-black px-3 py-2 print:py-1 font-bold uppercase">
                            <input type="text" value={formData.mseUnitName} placeholder="Enter Name of MSE unit" onChange={(e) => setFormData({...formData, mseUnitName: e.target.value})} className="w-full bg-transparent outline-none" />
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-black px-3 py-2 print:py-1 text-center w-10 font-bold">2</td>
                        <td className="border border-black px-3 py-2 print:py-1 font-bold">Address of Plant</td>
                        <td className="border border-black px-3 py-2 print:py-1">
                            <textarea value={formData.plantAddress} placeholder="Enter Complete Plant Address" onChange={(e) => setFormData({...formData, plantAddress: e.target.value})} className="w-full bg-transparent outline-none resize-none h-16 print:h-12" />
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-black px-3 py-2 print:py-1 text-center w-10 font-bold">3</td>
                        <td className="border border-black px-3 py-2 print:py-1 font-bold">Name of Proprietor / Partner / Director</td>
                        <td className="border border-black px-3 py-2 print:py-1">
                            <input type="text" value={formData.proprietorName} placeholder="Enter Name of Proprietor/Partner/Director" onChange={(e) => setFormData({...formData, proprietorName: e.target.value})} className="w-full bg-transparent outline-none" />
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-black px-3 py-2 print:py-1 text-center w-10 font-bold">4</td>
                        <td className="border border-black px-3 py-2 print:py-1 font-bold">Mobile number</td>
                        <td className="border border-black px-3 py-2 print:py-1">
                            <input type="text" value={formData.mobileNumber} placeholder="Enter Mobile Number" onChange={(e) => setFormData({...formData, mobileNumber: e.target.value})} className="w-full bg-transparent outline-none font-bold" />
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-black px-3 py-2 print:py-1 text-center w-10 font-bold">5</td>
                        <td className="border border-black px-3 py-2 print:py-1 font-bold">E-mail ID</td>
                        <td className="border border-black px-3 py-2 print:py-1">
                            <input type="text" value={formData.email} placeholder="Enter E-mail ID" onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-transparent outline-none italic" />
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-black px-3 py-2 print:py-1 text-center w-10 font-bold">6</td>
                        <td className="border border-black px-3 py-2 print:py-1 font-bold">Website</td>
                        <td className="border border-black px-3 py-2 print:py-1">
                            <input type="text" value={formData.website} placeholder="Enter Website URL" onChange={(e) => setFormData({...formData, website: e.target.value})} className="w-full bg-transparent outline-none italic" />
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-black px-3 py-2 print:py-1 text-center w-10 font-bold">7</td>
                        <td className="border border-black px-3 py-2 print:py-1 font-bold">Name, Venue, and Duration of event</td>
                        <td className="border border-black px-3 py-2 print:py-1">
                            <textarea value={formData.eventDetails} placeholder="Enter Name, Venue, and Duration of the event" onChange={(e) => setFormData({...formData, eventDetails: e.target.value})} className="w-full bg-transparent outline-none resize-none h-16 print:h-12 font-bold" />
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-black px-3 py-2 print:py-1 text-center w-10 font-bold">8</td>
                        <td className="border border-black px-3 py-2 print:py-1 font-bold">
                            Comments of participant regarding benefits
                            <p className="mt-1 normal-case text-[9px]">[about 200 words along with photographs]</p>
                        </td>
                        <td className="border border-black px-3 py-2 print:py-1">
                            <textarea value={formData.benefitsComments} placeholder="Enter comments regarding benefits (approx 200 words)..." onChange={(e) => setFormData({...formData, benefitsComments: e.target.value})} className="w-full bg-transparent outline-none resize-none h-32 print:h-24 leading-tight" />
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-black px-3 py-2 print:py-1 text-center w-10 font-bold">9</td>
                        <td className="border border-black px-3 py-2 print:py-1 font-bold">Number of visitors in the event</td>
                        <td className="border border-black px-3 py-2 print:py-1">
                            <input type="text" value={formData.visitorCount} placeholder="Enter Visitor Count" onChange={(e) => setFormData({...formData, visitorCount: e.target.value})} className="w-full bg-transparent outline-none text-center font-bold" />
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-black px-3 py-2 print:py-1 text-center w-10 font-bold">10</td>
                        <td className="border border-black px-3 py-2 print:py-1 font-bold">Export inquiries generated (Number and Value)</td>
                        <td className="border border-black px-3 py-2 print:py-1">
                            <input type="text" value={formData.exportInquiries} placeholder="Enter Number and Value in INR" onChange={(e) => setFormData({...formData, exportInquiries: e.target.value})} className="w-full bg-transparent outline-none text-center font-bold" />
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-black px-3 py-2 print:py-1 text-center w-10 font-bold">11</td>
                        <td className="border border-black px-3 py-2 print:py-1 font-bold">Details of business finalized / orders booked</td>
                        <td className="border border-black px-3 py-2 print:py-1">
                            <textarea value={formData.businessFinalized} placeholder="Enter details of business finalized / orders booked" onChange={(e) => setFormData({...formData, businessFinalized: e.target.value})} className="w-full bg-transparent outline-none resize-none h-16 print:h-12 font-bold" />
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-black px-3 py-2 print:py-1 text-center w-10 font-bold">12</td>
                        <td className="border border-black px-3 py-2 print:py-1 font-bold">Other achievements (JVs, Tech transfer etc)</td>
                        <td className="border border-black px-3 py-2 print:py-1">
                            <textarea value={formData.otherAchievements} placeholder="Enter other achievements (e.g. JVs, Tech transfer)" onChange={(e) => setFormData({...formData, otherAchievements: e.target.value})} className="w-full bg-transparent outline-none resize-none h-16 print:h-12 font-bold" />
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-black px-3 py-2 print:py-1 text-center w-10 font-bold">13</td>
                        <td className="border border-black px-3 py-2 print:py-1 font-bold">Would you like to participate again? (If yes, reason)</td>
                        <td className="border border-black px-3 py-2 print:py-1">
                            <textarea value={formData.participateAgain} placeholder="Yes/No and reason for participation" onChange={(e) => setFormData({...formData, participateAgain: e.target.value})} className="w-full bg-transparent outline-none resize-none h-16 print:h-12 font-bold" />
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-black px-3 py-2 print:py-1 text-center w-10 font-bold">14</td>
                        <td colSpan={2} className="border border-black p-0">
                            <div className="px-3 py-2 print:py-1 font-bold italic border-b border-black">Details of technologies noticed useful for MSMEs in India:</div>
                            <table className="w-full border-collapse text-[10px]">
                                <thead>
                                    <tr className="border-b border-black font-bold">
                                        <td className="border-r border-black p-1 text-center w-[20%]">Country</td>
                                        <td className="border-r border-black p-1 text-center w-[20%]">Sector</td>
                                        <td className="border-r border-black p-1 text-center w-[30%]">Description</td>
                                        <td className="p-1 text-center w-[30%]">Contact Details</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {formData.techNoticed.map((tech, i) => (
                                        <tr key={i} className={i === 0 ? 'border-b border-black' : ''}>
                                            <td className="border-r border-black p-1 italic"><input type="text" value={tech.country} placeholder="Country" onChange={(e) => updateTech(i, 'country', e.target.value)} className="w-full bg-transparent outline-none" /></td>
                                            <td className="border-r border-black p-1 italic"><input type="text" value={tech.sector} placeholder="Sector" onChange={(e) => updateTech(i, 'sector', e.target.value)} className="w-full bg-transparent outline-none" /></td>
                                            <td className="border-r border-black p-1 italic"><input type="text" value={tech.description} placeholder="Description" onChange={(e) => updateTech(i, 'description', e.target.value)} className="w-full bg-transparent outline-none" /></td>
                                            <td className="p-1 italic"><input type="text" value={tech.contact} placeholder="Contact" onChange={(e) => updateTech(i, 'contact', e.target.value)} className="w-full bg-transparent outline-none" /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-black px-3 py-2 print:py-1 text-center w-10 font-bold">15</td>
                        <td className="border border-black px-3 py-2 print:py-1 font-bold">Remarks/Suggestions, if any</td>
                        <td className="border border-black px-3 py-2 print:py-1">
                            <textarea value={formData.remarks} placeholder="Enter any additional remarks or suggestions" onChange={(e) => setFormData({...formData, remarks: e.target.value})} className="w-full bg-transparent outline-none resize-none h-16 print:h-12 font-bold" />
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className="mt-8 print:mt-4 space-y-8 print:space-y-4 text-[11px]">
                <p className="font-bold italic">Enclosed: Photograph of allotted booth at the event venue.</p>
                <div className="flex justify-between items-end pt-4 print:pt-2">
                    <div className="flex gap-2 items-end">
                        <span className="font-bold">Date:</span>
                        <div className={`${isExporting ? 'hidden' : 'no-print'}`}>
                            <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="border-b border-black outline-none bg-transparent w-40 font-bold" />
                        </div>
                        <div className={`${isExporting ? 'block font-bold' : 'hidden print:block'} border-b border-black min-w-[100px] font-bold`}>
                            {formData.date ? new Date(formData.date).toLocaleDateString('en-GB') : ''}
                        </div>
                    </div>
                    <div className="text-center w-72">
                        <input type="text" value={formData.participantName} onChange={(e) => setFormData({...formData, participantName: e.target.value})} className="w-full border-b border-black outline-none bg-transparent text-center font-bold uppercase" />
                        <p className="mt-1 font-bold">Signature/Name/Designation of Participant</p>
                    </div>
                </div>
            </div>
        </ReportLayout>
    );
};

export default ParticipantsFeedback;