import React, { useState, useEffect } from 'react';
import { Printer, Download, ChevronRight, Save, Loader2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { psmClaimApi } from '@/services/psmClaimApi';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import { toast } from 'sonner';

const ParticipantsFeedback = ({ reportId: propReportId }) => {
    const navigate = useNavigate();
    const { id: urlId } = useParams();
    const reportId = propReportId || urlId;
    
    const { data: ctxData } = useExhibitorCtx() || {};
    const [saving, setSaving] = useState(false);
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

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await psmClaimApi.saveReport('participants-feedback', {
                data: formData,
                id: reportId,
                exhibitorId: ctxData?._id
            });
            if (res.success) {
                toast.success(reportId ? 'Report updated' : 'Report saved');
                navigate('/exhibitor-dashboard/psm-claim/reports-table/participants-feedback');
            }
        } catch (error) {
            toast.error('Failed to save report');
        } finally {
            setSaving(false);
        }
    };

    const updateTech = (index, field, value) => {
        const newTech = [...formData.techNoticed];
        newTech[index][field] = value;
        setFormData({ ...formData, techNoticed: newTech });
    };

    const handlePrint = () => {
        window.print();
    };

    const handleDownload = () => {
        toast.info("Please use the 'Save as PDF' option in the print dialog.");
        window.print();
    };

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-[#23471d]" /></div>;

    return (
        <div className="flex flex-col gap-6 p-4 max-w-5xl mx-auto min-h-screen">
            {/* Top Action Bar */}
            <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200 no-print">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/exhibitor-dashboard/psm-claim/reports-table/participants-feedback')}
                        className="p-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-all active:scale-95 shadow-sm"
                        title="Back to Table"
                    >
                        <ChevronRight size={20} className="rotate-180" />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-slate-800">Feedback Report</h1>
                        <p className="text-sm text-slate-500">Individual participants feedback</p>
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
            <div className="flex justify-center w-full overflow-x-auto p-2 rounded-xl">
                <div
                    id="printable-form"
                    className="bg-white p-[15mm] shadow-2xl mx-auto w-full max-w-[210mm] min-h-[297mm] text-[#000] text-[12px] leading-tight relative overflow-hidden"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                >
                    <div className="text-center mb-8 font-bold">
                        <h1 className="text-lg underline uppercase">PARTICIPANTS FEEDBACK REPORT</h1>
                        <p className="text-[11px] mt-1 normal-case">(To be filled in by all individual participants separately)</p>
                        <p className="text-[11px] normal-case">(All columns should be filled)</p>
                    </div>

                    <table className="w-full border-collapse border border-black text-[11px]">
                        <tbody>
                            <tr>
                                <td className="border border-black px-3 py-2 text-center w-10 font-bold">1</td>
                                <td className="border border-black px-3 py-2 w-[40%] font-bold">Name of the participating MSE unit</td>
                                <td className="border border-black px-3 py-2 font-bold uppercase">
                                    <input type="text" value={formData.mseUnitName} onChange={(e) => setFormData({...formData, mseUnitName: e.target.value})} className="w-full bg-transparent outline-none" />
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-black px-3 py-2 text-center w-10 font-bold">2</td>
                                <td className="border border-black px-3 py-2 font-bold">Address of Plant</td>
                                <td className="border border-black px-3 py-2">
                                    <textarea value={formData.plantAddress} onChange={(e) => setFormData({...formData, plantAddress: e.target.value})} className="w-full bg-transparent outline-none resize-none h-16" />
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-black px-3 py-2 text-center w-10 font-bold">3</td>
                                <td className="border border-black px-3 py-2 font-bold">Name of Proprietor / Partner / Director</td>
                                <td className="border border-black px-3 py-2">
                                    <input type="text" value={formData.proprietorName} onChange={(e) => setFormData({...formData, proprietorName: e.target.value})} className="w-full bg-transparent outline-none" />
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-black px-3 py-2 text-center w-10 font-bold">4</td>
                                <td className="border border-black px-3 py-2 font-bold">Mobile number</td>
                                <td className="border border-black px-3 py-2">
                                    <input type="text" value={formData.mobileNumber} onChange={(e) => setFormData({...formData, mobileNumber: e.target.value})} className="w-full bg-transparent outline-none font-bold" />
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-black px-3 py-2 text-center w-10 font-bold">5</td>
                                <td className="border border-black px-3 py-2 font-bold">E-mail ID</td>
                                <td className="border border-black px-3 py-2">
                                    <input type="text" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-transparent outline-none italic" />
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-black px-3 py-2 text-center w-10 font-bold">6</td>
                                <td className="border border-black px-3 py-2 font-bold">Website</td>
                                <td className="border border-black px-3 py-2">
                                    <input type="text" value={formData.website} onChange={(e) => setFormData({...formData, website: e.target.value})} className="w-full bg-transparent outline-none italic" />
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-black px-3 py-2 text-center w-10 font-bold">7</td>
                                <td className="border border-black px-3 py-2 font-bold">Name, Venue, and Duration of event</td>
                                <td className="border border-black px-3 py-2">
                                    <textarea value={formData.eventDetails} onChange={(e) => setFormData({...formData, eventDetails: e.target.value})} className="w-full bg-transparent outline-none resize-none h-16 font-bold" />
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-black px-3 py-2 text-center w-10 font-bold">8</td>
                                <td className="border border-black px-3 py-2 font-bold">
                                    Comments of participant regarding benefits
                                    <p className="mt-1 normal-case text-[9px]">[about 200 words along with photographs]</p>
                                </td>
                                <td className="border border-black px-3 py-2">
                                    <textarea value={formData.benefitsComments} onChange={(e) => setFormData({...formData, benefitsComments: e.target.value})} className="w-full bg-transparent outline-none resize-none h-32 leading-tight" />
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-black px-3 py-2 text-center w-10 font-bold">9</td>
                                <td className="border border-black px-3 py-2 font-bold">Number of visitors in the event</td>
                                <td className="border border-black px-3 py-2">
                                    <input type="text" value={formData.visitorCount} onChange={(e) => setFormData({...formData, visitorCount: e.target.value})} className="w-full bg-transparent outline-none text-center font-bold" />
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-black px-3 py-2 text-center w-10 font-bold">10</td>
                                <td className="border border-black px-3 py-2 font-bold">Export inquiries generated (Number and Value)</td>
                                <td className="border border-black px-3 py-2">
                                    <input type="text" value={formData.exportInquiries} onChange={(e) => setFormData({...formData, exportInquiries: e.target.value})} className="w-full bg-transparent outline-none text-center font-bold" />
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-black px-3 py-2 text-center w-10 font-bold">11</td>
                                <td className="border border-black px-3 py-2 font-bold">Details of business finalized / orders booked</td>
                                <td className="border border-black px-3 py-2">
                                    <textarea value={formData.businessFinalized} onChange={(e) => setFormData({...formData, businessFinalized: e.target.value})} className="w-full bg-transparent outline-none resize-none h-16 font-bold" />
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-black px-3 py-2 text-center w-10 font-bold">12</td>
                                <td className="border border-black px-3 py-2 font-bold">Other achievements (JVs, Tech transfer etc)</td>
                                <td className="border border-black px-3 py-2">
                                    <textarea value={formData.otherAchievements} onChange={(e) => setFormData({...formData, otherAchievements: e.target.value})} className="w-full bg-transparent outline-none resize-none h-16 font-bold" />
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-black px-3 py-2 text-center w-10 font-bold">13</td>
                                <td className="border border-black px-3 py-2 font-bold">Would you like to participate again? (If yes, reason)</td>
                                <td className="border border-black px-3 py-2">
                                    <textarea value={formData.participateAgain} onChange={(e) => setFormData({...formData, participateAgain: e.target.value})} className="w-full bg-transparent outline-none resize-none h-16 font-bold" />
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-black px-3 py-2 text-center w-10 font-bold">14</td>
                                <td colSpan={2} className="border border-black p-0">
                                    <div className="px-3 py-2 font-bold italic border-b border-black">Details of technologies noticed useful for MSMEs in India:</div>
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
                                                    <td className="border-r border-black p-1 italic"><input type="text" value={tech.country} onChange={(e) => updateTech(i, 'country', e.target.value)} className="w-full bg-transparent outline-none" /></td>
                                                    <td className="border-r border-black p-1 italic"><input type="text" value={tech.sector} onChange={(e) => updateTech(i, 'sector', e.target.value)} className="w-full bg-transparent outline-none" /></td>
                                                    <td className="border-r border-black p-1 italic"><input type="text" value={tech.description} onChange={(e) => updateTech(i, 'description', e.target.value)} className="w-full bg-transparent outline-none" /></td>
                                                    <td className="p-1 italic"><input type="text" value={tech.contact} onChange={(e) => updateTech(i, 'contact', e.target.value)} className="w-full bg-transparent outline-none" /></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-black px-3 py-2 text-center w-10 font-bold">15</td>
                                <td className="border border-black px-3 py-2 font-bold">Remarks/Suggestions, if any</td>
                                <td className="border border-black px-3 py-2">
                                    <textarea value={formData.remarks} onChange={(e) => setFormData({...formData, remarks: e.target.value})} className="w-full bg-transparent outline-none resize-none h-16 font-bold" />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="mt-8 space-y-8 text-[11px]">
                        <p className="font-bold italic">Enclosed: Photograph of allotted booth at the event venue.</p>
                        <div className="flex justify-between items-end pt-4">
                            <div className="flex gap-2 items-end">
                                <span className="font-bold">Date:</span>
                                <div className="no-print">
                                    <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="border-b border-black outline-none bg-transparent w-40 font-bold" />
                                </div>
                                <div className="hidden print:block border-b border-black min-w-[100px] font-bold">
                                    {formData.date ? new Date(formData.date).toLocaleDateString('en-GB') : ''}
                                </div>
                            </div>
                            <div className="text-center w-72">
                                <input type="text" value={formData.participantName} onChange={(e) => setFormData({...formData, participantName: e.target.value})} className="w-full border-b border-black outline-none bg-transparent text-center font-bold uppercase" />
                                <p className="mt-1 font-bold">Signature/Name/Designation of Participant</p>
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
                        padding: 10mm 0 !important;
                        box-shadow: none !important;
                        zoom: 1;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        min-height: 270mm;
                    }
                    table, th, td { 
                        border-color: black !important; 
                        padding-top: 6px !important;
                        padding-bottom: 6px !important;
                    }
                    input, textarea { border-bottom: none !important; }
                    .mb-8, .mt-8, .mt-10, .mb-10 { margin-top: 5mm !important; margin-bottom: 5mm !important; }
                    .space-y-8 { margin-top: 6mm !important; margin-bottom: 6mm !important; }
                    textarea { min-height: 15mm !important; }
                }
            `}} />
        </div>
    );
};

export default ParticipantsFeedback;