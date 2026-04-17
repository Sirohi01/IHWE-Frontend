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
const UDYAM_TYPES = ['Udhyam Registration Certificate', 'Udhyam Aadhaar Memorandum', 'EM-II Certificate'];
const GENDERS = ['Male', 'Female', 'Other', 'Prefer not to say'];

export default function ExhibitorMSME({ data }: MSMEProps) {
    const msme = data.msme || {};

    const [editing, setEditing] = useState(!msme.udhyamRegNo);
    const [saving, setSaving] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [verifyStatus, setVerifyStatus] = useState<{ success: boolean; message: string } | null>(null);

    const [form, setForm] = useState({
        // Udhyam Details
        udhyamRegNo: msme.udhyamRegNo || '',
        udhyamType: msme.udhyamType || 'Udhyam Registration Certificate',
        udhyamIssueDate: msme.udhyamIssueDate ? msme.udhyamIssueDate.split('T')[0] : '',
        udhyamExpiryDate: msme.udhyamExpiryDate ? msme.udhyamExpiryDate.split('T')[0] : '',

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

    // Verify Udhyam Registration Number
    const handleVerifyUdhyam = async () => {
        if (!form.udhyamRegNo) {
            toast.error('Please enter Udhyam Registration Number');
            return;
        }

        setVerifying(true);
        setVerifyStatus(null);

        try {
            const token = localStorage.getItem('exhibitorToken');
            const res = await fetch(`${API_URL}/exhibitor-registration/verify-udhyam`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ udhyamRegNo: form.udhyamRegNo }),
            });

            const result = await res.json();

            if (result.success) {
                setVerifyStatus({
                    success: true,
                    message: 'Udhyam Registration Number verified successfully!'
                });
                toast.success('Udhyam verified!');

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
                    message: result.message || 'Invalid Udhyam Registration Number'
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
        if (!form.udhyamRegNo) return toast.error('Udhyam Reg. No. required');

        setSaving(true);
        try {
            const token = localStorage.getItem('exhibitorToken');
            const fd = new FormData();

            Object.entries(form).forEach(([k, v]) => fd.append(k, v));
            certFiles.forEach(f => fd.append('udhyamCertificate', f));

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

    const certUrl = msme.udhyamCertificateUrl
        ? (msme.udhyamCertificateUrl.startsWith('http')
            ? msme.udhyamCertificateUrl
            : `${SERVER_URL}${msme.udhyamCertificateUrl}`)
        : null;

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-white border border-slate-200 p-4 rounded-md">

                {/* Header */}
                <div className="flex justify-between items-center mb-4 border-b pb-3">
                    <h1 className="text-[14px] font-semibold uppercase">MSME Details</h1>

                    {editing ? (
                        <div className="flex gap-2">
                            <button onClick={() => setEditing(false)} className="text-xs border px-2 py-1 rounded flex items-center gap-1">
                                <X size={12} /> Cancel
                            </button>
                            <button onClick={handleSave} disabled={saving} className="text-xs bg-[#23471d] text-white px-2 py-1 rounded flex items-center gap-1">
                                <Save size={12} /> {saving ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    ) : (
                        <button onClick={() => setEditing(true)} className="text-xs bg-slate-700 text-white px-2 py-1 rounded flex items-center gap-1">
                            <Pencil size={12} /> Edit
                        </button>
                    )}
                </div>

                {/* EDIT MODE */}
                {editing ? (
                    <div className="space-y-4">
                        {/* Udhyam Verification Section */}
                        <div className="bg-blue-50 p-3 rounded border border-blue-200">
                            <div className="flex items-end gap-2 flex-wrap">
                                <div className="flex-1 min-w-[200px]">
                                    <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Udhyam Registration No. *</label>
                                    <input
                                        className={inputCls}
                                        placeholder="e.g., UDYAM-XX-00-0000000"
                                        value={form.udhyamRegNo}
                                        onChange={e => inp('udhyamRegNo', e.target.value)}
                                    />
                                </div>
                                <button
                                    onClick={handleVerifyUdhyam}
                                    disabled={verifying}
                                    className="px-3 py-1.5 bg-[#23471d] text-white text-[11px] font-bold rounded flex items-center gap-1 whitespace-nowrap"
                                >
                                    {verifying ? <Loader2 size={12} className="animate-spin" /> : <CheckCircle2 size={12} />}
                                    {verifying ? 'Verifying...' : 'Verify Udhyam'}
                                </button>
                                <button
                                    onClick={() => window.open('https://www.udyamregistration.gov.in/UdyamRegistration.aspx', '_blank')}
                                    className="px-3 py-1.5 bg-blue-600 text-white text-[11px] font-bold rounded flex items-center gap-1 whitespace-nowrap"
                                >
                                    <ExternalLink size={12} />
                                    Register on Udhyam Portal
                                </button>
                            </div>
                            {verifyStatus && (
                                <div className={`mt-2 text-[10px] flex items-center gap-1 ${verifyStatus.success ? 'text-green-600' : 'text-red-600'}`}>
                                    {verifyStatus.success ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />}
                                    {verifyStatus.message}
                                </div>
                            )}
                        </div>

                        {/* Udhyam Details */}
                        <div>
                            <h3 className="text-[11px] font-bold text-[#23471d] mb-2 uppercase flex items-center gap-2">
                                <FileText size={12} /> Udhyam Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <select className={selectCls} value={form.udhyamType} onChange={e => inp('udhyamType', e.target.value)}>
                                    {UDYAM_TYPES.map(c => <option key={c}>{c}</option>)}
                                </select>
                                <input type="date" className={inputCls} placeholder="Issue Date" value={form.udhyamIssueDate} onChange={e => inp('udhyamIssueDate', e.target.value)} />
                                <input type="date" className={inputCls} placeholder="Expiry Date" value={form.udhyamExpiryDate} onChange={e => inp('udhyamExpiryDate', e.target.value)} />
                            </div>
                        </div>

                        {/* Enterprise Details */}
                        <div>
                            <h3 className="text-[11px] font-bold text-[#23471d] mb-2 uppercase">Enterprise Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <input className={inputCls} placeholder="Enterprise Name" value={form.enterpriseName} onChange={e => inp('enterpriseName', e.target.value)} />
                                <input className={inputCls} placeholder="PAN Number" value={form.panNumber} onChange={e => inp('panNumber', e.target.value)} />
                                <input className={inputCls} placeholder="GST Number" value={form.gstNumber} onChange={e => inp('gstNumber', e.target.value)} />
                            </div>
                        </div>

                        {/* Contact Details with Gender */}
                        <div>
                            <h3 className="text-[11px] font-bold text-[#23471d] mb-2 uppercase">Contact Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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

                        {/* Address Details (No Country) */}
                        <div>
                            <h3 className="text-[11px] font-bold text-[#23471d] mb-2 uppercase">Address Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <input className={inputCls} placeholder="Address" value={form.address} onChange={e => inp('address', e.target.value)} />
                                <input className={inputCls} placeholder="City" value={form.city} onChange={e => inp('city', e.target.value)} />
                                <input className={inputCls} placeholder="State" value={form.state} onChange={e => inp('state', e.target.value)} />
                                <input className={inputCls} placeholder="Pincode" value={form.pincode} onChange={e => inp('pincode', e.target.value)} />
                            </div>
                        </div>

                        {/* MSME Classification */}
                        <div>
                            <h3 className="text-[11px] font-bold text-[#23471d] mb-2 uppercase">MSME Classification</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <select className={selectCls} value={form.msmeCategory} onChange={e => inp('msmeCategory', e.target.value)}>
                                    {MSME_CATEGORIES.map(c => <option key={c}>{c}</option>)}
                                </select>
                                <input className={inputCls} placeholder="Investment in Plant & Machinery (₹)" value={form.investmentInPlant} onChange={e => inp('investmentInPlant', e.target.value)} />
                                <input className={inputCls} placeholder="Annual Turnover (₹)" value={form.turnover} onChange={e => inp('turnover', e.target.value)} />
                            </div>
                        </div>

                        {/* DFO Details */}
                        <div>
                            <h3 className="text-[11px] font-bold text-[#23471d] mb-2 uppercase">DFO Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <input className={inputCls} placeholder="DFO Location" value={form.dfoLocation} onChange={e => inp('dfoLocation', e.target.value)} />
                                <input className={inputCls} placeholder="DFO Email" type="email" value={form.dfoEmail} onChange={e => inp('dfoEmail', e.target.value)} />
                                <input className={inputCls} placeholder="DFO Mobile No" value={form.dfoMobileNo} onChange={e => inp('dfoMobileNo', e.target.value)} />
                            </div>
                        </div>

                        {/* Remarks & Certificate */}
                        <div>
                            <h3 className="text-[11px] font-bold text-[#23471d] mb-2 uppercase">Additional Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <input className={inputCls} placeholder="Remark" value={form.msmeRemark} onChange={e => inp('msmeRemark', e.target.value)} />
                                <div>
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

                        <Section title="Udhyam Details">
                            <InfoGrid rows={[
                                ['Reg No', msme.udhyamRegNo],
                                ['Type', msme.udhyamType],
                                ['Issue Date', msme.udhyamIssueDate ? new Date(msme.udhyamIssueDate).toLocaleDateString() : '—'],
                                ['Expiry Date', msme.udhyamExpiryDate ? new Date(msme.udhyamExpiryDate).toLocaleDateString() : '—'],
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
        </motion.div>
    );
}