import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Pencil, X, ExternalLink, FileText, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { API_URL, SERVER_URL } from '@/lib/api';
import { toast } from 'sonner';

interface MSMEProps { data: any; }

/* 🔥 SAME GRID SYSTEM */
function InfoGrid({ rows }: { rows: [string, React.ReactNode][] }) {
    return (
        <div className="border border-slate-200 rounded-sm overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {rows.map(([label, value], i) => (
                    <div key={i} className="flex border-r border-b border-slate-200 last:border-r-0 hover:bg-slate-50/40">
                        <div className="w-[120px] min-w-[120px] px-2 py-2 text-[10px] font-semibold text-slate-500 uppercase border-r bg-slate-50 flex items-center">
                            {label}
                        </div>
                        <div className="flex-1 px-2 py-2 text-[11px] text-slate-800 flex items-center break-all">
                            {value ?? '—'}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Section({ title, children }: any) {
    return (
        <div className="mb-4">
            <div className="flex items-center gap-2 mb-1.5">
                <div className="w-1 h-3.5 bg-[#23471d] rounded-full" />
                <span className="text-[11px] font-semibold text-[#23471d] uppercase tracking-wider">
                    {title}
                </span>
            </div>
            {children}
        </div>
    );
}

const inputCls = "rounded border border-slate-300 h-8 text-[11px] px-2 w-full focus:border-[#23471d] focus:ring-1 focus:ring-[#23471d]/20 outline-none";
const selectCls = "rounded border border-slate-300 h-8 text-[11px] px-2 w-full focus:border-[#23471d] focus:ring-1 focus:ring-[#23471d]/20 outline-none";

const MSME_CATEGORIES = ['Micro', 'Small', 'Medium'];
const UDYAM_TYPES = ['udyam Registration Certificate', 'udyam Aadhaar Memorandum', 'EM-II Certificate'];
const GENDERS = ['Male', 'Female', 'Other', 'Prefer not to say'];

export default function ExhibitorMSME({ data }: MSMEProps) {
    const msme = data.msme || {};

    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [verifyStatus, setVerifyStatus] = useState<{ success: boolean; message: string } | null>(null);

    const [form, setForm] = useState({
        // udyam Details
        udyamRegNo: msme.udyamRegNo || '',
        udyamType: msme.udyamType || 'udyam Registration Certificate',
        udyamIssueDate: msme.udyamIssueDate ? msme.udyamIssueDate.split('T')[0] : '',
        udyamExpiryDate: msme.udyamExpiryDate ? msme.udyamExpiryDate.split('T')[0] : '',

        // Enterprise Details
        enterpriseName: msme.enterpriseName || data?.exhibitorName || '',
        panNumber: msme.panNumber || data?.panNo || '',
        gstNumber: msme.gstNumber || data?.gstNo || '',

        // Contact Details (with GENDER)
        contactPerson: msme.contactPerson || data?.contact1?.firstName + ' ' + data?.contact1?.lastName || '',
        gender: msme.gender || '',
        designation: msme.designation || data?.contact1?.designation || '',
        mobileNo: msme.mobileNo || data?.contact1?.mobile || '',
        emailId: msme.emailId || data?.contact1?.email || '',
        alternateNo: msme.alternateNo || data?.contact1?.alternateNo || '',

        // Address Details (No country, only state and city)
        address: msme.address || data?.address || '',
        city: msme.city || data?.city || '',
        state: msme.state || data?.state || '',
        pincode: msme.pincode || data?.pincode || '',

        // MSME Classification
        msmeCategory: msme.msmeCategory || 'Micro',
        investmentInPlant: msme.investmentInPlant || '',
        turnover: msme.turnover || '',

        // DFO Details
        dfoLocation: msme.dfoLocation || '',
        dfoEmail: msme.dfoEmail || '',
        dfoMobileNo: msme.dfoMobileNo || '',

        // Remarks
        msmeRemark: msme.msmeRemark || '',
    });

    const [certFiles, setCertFiles] = useState<File[]>([]);

    const inp = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

    // Verify udyam Registration Number
    const handleVerifyudyam = async () => {
        if (!form.udyamRegNo) {
            toast.error('Please enter udyam Registration Number');
            return;
        }

        setVerifying(true);
        setVerifyStatus(null);

        try {
            const token = localStorage.getItem('exhibitorToken');
            const res = await fetch(`${API_URL}/exhibitor-registration/verify-udyam`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ udyamRegNo: form.udyamRegNo }),
            });

            const result = await res.json();

            if (result.success) {
                setVerifyStatus({
                    success: true,
                    message: 'udyam Registration Number verified successfully!'
                });
                toast.success('udyam verified!');

                // Auto-fill data if returned
                if (result.data) {
                    setForm(prev => ({
                        ...prev,
                        enterpriseName: result.data.enterpriseName || prev.enterpriseName,
                        msmeCategory: result.data.category || prev.msmeCategory,
                        investmentInPlant: result.data.investment || prev.investmentInPlant,
                        turnover: result.data.turnover || prev.turnover,
                    }));
                }
            } else {
                setVerifyStatus({
                    success: false,
                    message: result.message || 'Invalid udyam Registration Number'
                });
                toast.error(result.message || 'Verification failed');
            }
        } catch {
            setVerifyStatus({
                success: false,
                message: 'Failed to verify. Please try again.'
            });
            toast.error('Verification failed');
        } finally {
            setVerifying(false);
        }
    };

    const handleSave = async () => {
        if (!form.udyamRegNo) return toast.error('udyam Reg. No. required');

        setSaving(true);
        try {
            const token = localStorage.getItem('exhibitorToken');
            const fd = new FormData();

            Object.entries(form).forEach(([k, v]) => fd.append(k, v));
            certFiles.forEach(f => fd.append('udyamCertificate', f));

            const res = await fetch(`${API_URL}/exhibitor-registration/${data._id}/msme`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${token}` },
                body: fd,
            });

            const result = await res.json();

            if (result.success) {
                toast.success('MSME details saved successfully!');
                setEditing(false);
                Object.assign(data, { msme: result.data });
            } else {
                toast.error(result.message || 'Failed to save');
            }
        } catch {
            toast.error('Error saving MSME details');
        } finally {
            setSaving(false);
        }
    };

    const certUrl = msme.udyamCertificateUrl
        ? (msme.udyamCertificateUrl.startsWith('http')
            ? msme.udyamCertificateUrl
            : `${SERVER_URL}${msme.udyamCertificateUrl}`)
        : null;

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-white border border-slate-200 rounded-sm overflow-hidden shadow-sm">

                {/* Modern Header */}
                <div className="bg-slate-50 border-b border-slate-200 px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#23471d] rounded-sm flex items-center justify-center text-white shadow-lg shadow-[#23471d]/20">
                            <FileText size={24} />
                        </div>
                        <div>
                            <h1 className="text-[16px] font-black text-slate-900 uppercase tracking-tight">Udyam Registration Details</h1>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">MSME Classification Profile</span>
                                <span className={`px-2 py-0.5 rounded-[2px] text-[8px] font-black uppercase tracking-widest ${msme.udhyamRegNo ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-amber-100 text-amber-700 border border-amber-200'}`}>
                                    {msme.udhyamRegNo ? 'Status: Verified' : 'Status: Pending Update'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => window.open('https://www.udyamregistration.gov.in/UdyamRegistration.aspx', '_blank')}
                            className="h-9 px-4 text-[10px] font-black uppercase tracking-widest text-blue-600 hover:bg-blue-50 rounded-sm transition-all flex items-center gap-2 border border-blue-200"
                        >
                            <ExternalLink size={14} />
                            Register on udyam
                        </button>

                        {editing ? (
                            <>
                                <button onClick={() => setEditing(false)} className="h-9 px-4 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-100 rounded-sm transition-all flex items-center gap-2">
                                    <X size={14} /> Discard
                                </button>
                                <button onClick={handleSave} disabled={saving} className="h-9 px-6 text-[10px] font-black uppercase tracking-widest bg-[#23471d] text-white hover:bg-[#1a3516] rounded-sm transition-all shadow-md flex items-center gap-2">
                                    {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                                    {saving ? 'Processing...' : 'Save Profile'}
                                </button>
                            </>
                        ) : (
                            <button onClick={() => setEditing(true)} className="h-9 px-6 text-[10px] font-black uppercase tracking-widest bg-slate-900 text-white hover:bg-black rounded-sm transition-all shadow-md flex items-center gap-2">
                                <Pencil size={14} /> Edit Information
                            </button>
                        )}
                    </div>
                </div>

                <div className="p-6">

                    {/* EDIT MODE */}
                    {editing ? (
                        <div className="space-y-4">
                            {/* udyam Verification Section */}
                            <div className="bg-blue-50 p-3 rounded border border-blue-200">
                                {verifyStatus && (
                                    <div className={`mt-2 text-[10px] flex items-center gap-1 ${verifyStatus.success ? 'text-green-600' : 'text-red-600'}`}>
                                        {verifyStatus.success ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />}
                                        {verifyStatus.message}
                                    </div>
                                )}
                            </div>

                            {/* udyam Details - 4 columns */}
                            <div>
                                <h3 className="text-[11px] font-bold text-[#23471d] mb-2 uppercase flex items-center gap-2">
                                    <FileText size={12} /> udyam Details
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                    <select className={selectCls} value={form.udyamType} onChange={e => inp('udyamType', e.target.value)}>
                                        {UDYAM_TYPES.map(c => <option key={c}>{c}</option>)}
                                    </select>
                                    <input type="date" className={inputCls} placeholder="Issue Date" value={form.udyamIssueDate} onChange={e => inp('udyamIssueDate', e.target.value)} />
                                    <input type="date" className={inputCls} placeholder="Expiry Date" value={form.udyamExpiryDate} onChange={e => inp('udyamExpiryDate', e.target.value)} />
                                </div>
                            </div>

                            {/* Enterprise Details - 4 columns */}
                            <div>
                                <h3 className="text-[11px] font-bold text-[#23471d] mb-2 uppercase">Enterprise Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                    <input className={inputCls} placeholder="Enterprise Name" value={form.enterpriseName} onChange={e => inp('enterpriseName', e.target.value)} />
                                    <input className={inputCls} placeholder="PAN Number" value={form.panNumber} onChange={e => inp('panNumber', e.target.value)} />
                                    <input className={inputCls} placeholder="GST Number" value={form.gstNumber} onChange={e => inp('gstNumber', e.target.value)} />
                                </div>
                            </div>

                            {/* Contact Details with Gender - 4 columns */}
                            <div>
                                <h3 className="text-[11px] font-bold text-[#23471d] mb-2 uppercase">Contact Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                    <input className={inputCls} placeholder="Contact Person" value={form.contactPerson} onChange={e => inp('contactPerson', e.target.value)} />
                                    <select className={selectCls} value={form.gender} onChange={e => inp('gender', e.target.value)}>
                                        <option value="">Select Gender</option>
                                        {GENDERS.map(g => <option key={g}>{g}</option>)}
                                    </select>
                                    <input className={inputCls} placeholder="Designation" value={form.designation} onChange={e => inp('designation', e.target.value)} />
                                    <input className={inputCls} placeholder="Mobile No" value={form.mobileNo} onChange={e => inp('mobileNo', e.target.value)} />
                                    <input className={inputCls} placeholder="Email ID" type="email" value={form.emailId} onChange={e => inp('emailId', e.target.value)} />
                                    <input className={inputCls} placeholder="Alternate No" value={form.alternateNo} onChange={e => inp('alternateNo', e.target.value)} />
                                </div>
                            </div>

                            {/* Address Details - 4 columns */}
                            <div>
                                <h3 className="text-[11px] font-bold text-[#23471d] mb-2 uppercase">Address Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                    <input className={inputCls} placeholder="Address" value={form.address} onChange={e => inp('address', e.target.value)} />
                                    <input className={inputCls} placeholder="City" value={form.city} onChange={e => inp('city', e.target.value)} />
                                    <input className={inputCls} placeholder="State" value={form.state} onChange={e => inp('state', e.target.value)} />
                                    <input className={inputCls} placeholder="Pincode" value={form.pincode} onChange={e => inp('pincode', e.target.value)} />
                                </div>
                            </div>

                            {/* MSME Classification - 4 columns */}
                            <div>
                                <h3 className="text-[11px] font-bold text-[#23471d] mb-2 uppercase">MSME Classification</h3>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                    <select className={selectCls} value={form.msmeCategory} onChange={e => inp('msmeCategory', e.target.value)}>
                                        {MSME_CATEGORIES.map(c => <option key={c}>{c}</option>)}
                                    </select>
                                    <input className={inputCls} placeholder="Investment in Plant & Machinery (₹)" value={form.investmentInPlant} onChange={e => inp('investmentInPlant', e.target.value)} />
                                    <input className={inputCls} placeholder="Annual Turnover (₹)" value={form.turnover} onChange={e => inp('turnover', e.target.value)} />
                                </div>
                            </div>

                            {/* DFO Details - 4 columns */}
                            <div>
                                <h3 className="text-[11px] font-bold text-[#23471d] mb-2 uppercase">DFO Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                    <input className={inputCls} placeholder="DFO Location" value={form.dfoLocation} onChange={e => inp('dfoLocation', e.target.value)} />
                                    <input className={inputCls} placeholder="DFO Email" type="email" value={form.dfoEmail} onChange={e => inp('dfoEmail', e.target.value)} />
                                    <input className={inputCls} placeholder="DFO Mobile No" value={form.dfoMobileNo} onChange={e => inp('dfoMobileNo', e.target.value)} />
                                </div>
                            </div>

                            {/* Remarks & Certificate */}
                            <div>
                                <h3 className="text-[11px] font-bold text-[#23471d] mb-2 uppercase">Additional Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                    <div className="md:col-span-2">
                                        <input className={inputCls} placeholder="Remark" value={form.msmeRemark} onChange={e => inp('msmeRemark', e.target.value)} />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="text-[10px] text-slate-500 block mb-1">Upload Certificates / Images (multiple allowed)</label>
                                        <input
                                            type="file"
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            multiple
                                            onChange={e => setCertFiles(Array.from(e.target.files || []))}
                                            className="text-[11px] w-full"
                                        />
                                        {certFiles.length > 0 && (
                                            <ul className="mt-2 space-y-1">
                                                {certFiles.map((f, i) => (
                                                    <li key={i} className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded px-2 py-1">
                                                        <span className="text-[10px] text-slate-700 truncate max-w-[160px]">{f.name}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => setCertFiles(prev => prev.filter((_, idx) => idx !== i))}
                                                            className="text-red-400 hover:text-red-600 text-[10px] ml-2 font-bold"
                                                        >✕</button>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* 🔥 VIEW MODE */
                        <div className="space-y-3">
                            {/* Certificate Link */}
                            {certUrl && (
                                <div className="mb-3">
                                    <a href={certUrl} target="_blank" rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#23471d] text-white text-[10px] rounded">
                                        <ExternalLink size={12} /> View Certificate
                                    </a>
                                </div>
                            )}

                            <Section title="udyam Details">
                                <InfoGrid rows={[
                                    ['Reg No', msme.udyamRegNo],
                                    ['Type', msme.udyamType],
                                    ['Issue Date', msme.udyamIssueDate ? new Date(msme.udyamIssueDate).toLocaleDateString() : '—'],
                                    ['Expiry Date', msme.udyamExpiryDate ? new Date(msme.udyamExpiryDate).toLocaleDateString() : '—'],
                                ]} />
                            </Section>

                            <Section title="Enterprise Details">
                                <InfoGrid rows={[
                                    ['Enterprise Name', msme.enterpriseName],
                                    ['PAN Number', msme.panNumber],
                                    ['GST Number', msme.gstNumber],
                                ]} />
                            </Section>

                            <Section title="Contact Details">
                                <InfoGrid rows={[
                                    ['Contact Person', msme.contactPerson],
                                    ['Gender', msme.gender || '—'],
                                    ['Designation', msme.designation],
                                    ['Mobile No', msme.mobileNo],
                                    ['Email ID', msme.emailId],
                                    ['Alternate No', msme.alternateNo || '—'],
                                ]} />
                            </Section>

                            <Section title="Address Details">
                                <InfoGrid rows={[
                                    ['Address', msme.address],
                                    ['City', msme.city],
                                    ['State', msme.state],
                                    ['Pincode', msme.pincode],
                                ]} />
                            </Section>

                            <Section title="MSME Classification">
                                <InfoGrid rows={[
                                    ['Category', msme.msmeCategory],
                                    ['Investment', msme.investmentInPlant ? `₹${Number(msme.investmentInPlant).toLocaleString()}` : '—'],
                                    ['Turnover', msme.turnover ? `₹${Number(msme.turnover).toLocaleString()}` : '—'],
                                ]} />
                            </Section>

                            <Section title="DFO Details">
                                <InfoGrid rows={[
                                    ['Location', msme.dfoLocation || '—'],
                                    ['Email', msme.dfoEmail || '—'],
                                    ['Mobile No', msme.dfoMobileNo || '—'],
                                    ['Remark', msme.msmeRemark || '—'],
                                ]} />
                            </Section>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}