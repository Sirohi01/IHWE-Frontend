import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Upload, FileText, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { API_URL, SERVER_URL } from '@/lib/api';
import { toast } from 'sonner';

const DEFAULT_PLACEHOLDER = "https://res.cloudinary.com/dr8mld4i0/image/upload/v1776505293/exhibitor-docs/hhrxqt8fsepts1z2vxew.png";

const fixUrl = (url: string | null | undefined) => {
    if (!url || url === 'undefined' || url === 'null') return DEFAULT_PLACEHOLDER;
    if (url.startsWith('http') || url.startsWith('blob:')) return url;
    const cleanPath = url.startsWith('/') ? url : `/${url}`;
    return `${SERVER_URL}${cleanPath}`;
};

interface ProfileProps {
    data: any;
    setData: (data: any) => void;
}

function InfoGrid({ rows }: { rows: [string, React.ReactNode][] }) {
    return (
        <div className="border border-slate-200 rounded-md overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {rows.map(([label, value], i) => (
                    <div
                        key={i}
                        className="flex border-r border-b border-slate-200 last:border-r-0 hover:bg-slate-50/40 transition"
                    >
                        <div className="w-[120px] min-w-[120px] px-2 py-2 text-[10px] font-semibold text-slate-500 uppercase border-r border-slate-200 bg-slate-50 flex items-center">
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="mb-5">
            <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-4 bg-[#23471d] rounded-full" />
                <span className="text-[11px] font-semibold text-[#23471d] uppercase tracking-wider">
                    {title}
                </span>
            </div>
            {children}
        </div>
    );
}

const inputCls =
    "h-7 text-[11px] border border-slate-300 rounded px-2 w-full outline-none focus:border-[#23471d] focus:ring-1 focus:ring-[#23471d]/20";

export default function ExhibitorProfile({ data, setData }: ProfileProps) {
    const [saving, setSaving] = useState(false);
    const isDomestic = data.participation?.currency === 'INR';

    const [form, setForm] = useState({
        website: data.website || '',
        address: data.address || '',
        city: data.city || '',
        state: data.state || '',
        country: data.country || '',
        pincode: data.pincode || '',
        landlineNo: data.landlineNo || '',
        fasciaName: data.fasciaName || '',
        gstNo: data.gstNo || '',
        panNo: data.panNo || '',
        natureOfBusiness: data.natureOfBusiness || '',
        contact1: {
            title: data.contact1?.title || 'Mr.',
            firstName: data.contact1?.firstName || '',
            lastName: data.contact1?.lastName || '',
            email: data.contact1?.email || '',
            designation: data.contact1?.designation || '',
            mobile: data.contact1?.mobile || '',
            alternateNo: data.contact1?.alternateNo || '',
        },
        contact2: {
            title: data.contact2?.title || '',
            firstName: data.contact2?.firstName || '',
            lastName: data.contact2?.lastName || '',
            email: data.contact2?.email || '',
            designation: data.contact2?.designation || '',
            mobile: data.contact2?.mobile || '',
            alternateNo: data.contact2?.alternateNo || '',
        },
    });

    // Sync form state when data prop changes
    useEffect(() => {
        setForm({
            website: data.website || '',
            address: data.address || '',
            city: data.city || '',
            state: data.state || '',
            country: data.country || '',
            pincode: data.pincode || '',
            landlineNo: data.landlineNo || '',
            fasciaName: data.fasciaName || '',
            gstNo: data.gstNo || '',
            panNo: data.panNo || '',
            natureOfBusiness: data.natureOfBusiness || '',
            contact1: {
                title: data.contact1?.title || 'Mr.',
                firstName: data.contact1?.firstName || '',
                lastName: data.contact1?.lastName || '',
                email: data.contact1?.email || '',
                designation: data.contact1?.designation || '',
                mobile: data.contact1?.mobile || '',
                alternateNo: data.contact1?.alternateNo || '',
            },
            contact2: {
                title: data.contact2?.title || '',
                firstName: data.contact2?.firstName || '',
                lastName: data.contact2?.lastName || '',
                email: data.contact2?.email || '',
                designation: data.contact2?.designation || '',
                mobile: data.contact2?.mobile || '',
                alternateNo: data.contact2?.alternateNo || '',
            },
        });
        setFiles({});
        setPreviews({});
    }, [data]);

    const [files, setFiles] = useState<Record<string, File>>({});
    const [previews, setPreviews] = useState<Record<string, string>>({});

    const handleFileChange = (field: string, file: File | null) => {
        if (!file) {
            setFiles(prev => { const next = { ...prev }; delete next[field]; return next; });
            setPreviews(prev => { const next = { ...prev }; delete next[field]; return next; });
            return;
        }

        setFiles(prev => ({ ...prev, [field]: file }));
        if (file.type.startsWith('image/')) {
            const url = URL.createObjectURL(file);
            setPreviews(prev => ({ ...prev, [field]: url }));
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const token = localStorage.getItem('exhibitorToken');
            const formData = new FormData();

            Object.entries(form).forEach(([key, value]) => {
                if (typeof value === 'object') {
                    formData.append(key, JSON.stringify(value));
                } else {
                    formData.append(key, value as string);
                }
            });

            Object.entries(files).forEach(([field, file]) => {
                formData.append(field, file);
            });

            const res = await fetch(`${API_URL}/exhibitor-auth/update-profile?id=${data._id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const result = await res.json();

            if (result.success) {
                toast.success('Submitted successfully! The Administrator can now review your profile.', {
                    duration: 5000,
                    description: "All your updated information and KYC documents are now live in the admin dashboard."
                });
                if (result.data) {
                    setData(result.data);
                }
            } else {
                toast.error(result.message || 'Update failed');
            }
        } catch (error) {
            console.error('Save error:', error);
            toast.error('Error updating profile');
        } finally {
            setSaving(false);
        }
    };

    const inp = (f: string, v: string) => setForm(p => ({ ...p, [f]: v }));
    const inpC1 = (f: string, v: string) => setForm(p => ({ ...p, contact1: { ...p.contact1, [f]: v } }));
    const inpC2 = (f: string, v: string) => setForm(p => ({ ...p, contact2: { ...p.contact2, [f]: v } }));

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-white rounded-md border border-slate-200 overflow-hidden shadow-sm">

                {/* Header */}
                <div className="sticky top-0 z-20 flex justify-between items-center px-4 py-3 border-b bg-slate-50 shadow-sm transition-all duration-300">
                    <div>
                        <h1 className="text-[13px] font-semibold uppercase tracking-tight">Exhibitor Profile</h1>
                        <p className="text-[10px] text-slate-400">Registration ID: {data.registrationId}</p>
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-1.5 px-4 py-1.5 bg-[#23471d] text-white text-[10px] font-bold uppercase rounded hover:bg-[#1a3516] disabled:opacity-50 transition-colors shadow-sm"
                    >
                        <Save size={12} /> {saving ? 'Submitting...' : 'Submit to Admin'}
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 space-y-4">

                    <Section title="Company Information">
                        <InfoGrid rows={[
                            ['Company Name', <div className="text-slate-400 italic text-[10px]">{data.exhibitorName}</div>],
                            ['Business Type', <div className="text-slate-400 italic text-[10px]">{data.typeOfBusiness}</div>],
                            ['Industry', <div className="text-slate-400 italic text-[10px]">{data.industrySector}</div>],
                            ['Website', <input className={inputCls} placeholder="e.g. www.comp.com" value={form.website} onChange={e => inp('website', e.target.value)} />],
                            ['Fascia Name', <input className={inputCls} placeholder="Name on stall" value={form.fasciaName} onChange={e => inp('fasciaName', e.target.value)} />],
                            [isDomestic ? 'GST No.' : 'VAT No.', <input className={inputCls} placeholder="Tax ID" value={form.gstNo} onChange={e => inp('gstNo', e.target.value)} />],
                            [isDomestic ? 'PAN No.' : 'Reg No.', <input className={inputCls} placeholder="Business ID" value={form.panNo} onChange={e => inp('panNo', e.target.value)} />],
                            ['Nature of Business', <input className={inputCls} placeholder="Exporter, Mfg, etc." value={form.natureOfBusiness} onChange={e => inp('natureOfBusiness', e.target.value)} />],
                            ['Company Logo', <FileUpload label="Logo" field="companyLogo" currentUrl={data.companyLogoUrl} files={files} previews={previews} onFileChange={handleFileChange} />],
                            ['', null]
                        ]} />
                    </Section>

                    <Section title="Address Details">
                        <InfoGrid rows={[
                            ['Address', <input className={inputCls} value={form.address} onChange={e => inp('address', e.target.value)} />],
                            ['City', <input className={inputCls} value={form.city} onChange={e => inp('city', e.target.value)} />],
                            ['State', <input className={inputCls} value={form.state} onChange={e => inp('state', e.target.value)} />],
                            ['Country', <input className={inputCls} value={form.country} onChange={e => inp('country', e.target.value)} />],
                            ['Pincode', <input className={inputCls} value={form.pincode} onChange={e => inp('pincode', e.target.value)} />],
                            ['Landline', <input className={inputCls} value={form.landlineNo} onChange={e => inp('landlineNo', e.target.value)} />],
                        ]} />
                    </Section>

                    <Section title="Business Documents (KYC)">
                        <InfoGrid rows={[
                            ['PAN Card Front', <FileUpload label="PAN Front" field="panCardFront" currentUrl={data.panCardFrontUrl} files={files} previews={previews} onFileChange={handleFileChange} />],
                            ['PAN Card Back', <FileUpload label="PAN Back" field="panCardBack" currentUrl={data.panCardBackUrl} files={files} previews={previews} onFileChange={handleFileChange} />],
                            ['Aadhaar Front', <FileUpload label="Aadhaar Front" field="aadhaarCardFront" currentUrl={data.aadhaarCardFrontUrl} files={files} previews={previews} onFileChange={handleFileChange} />],
                            ['Aadhaar Back', <FileUpload label="Aadhaar Back" field="aadhaarCardBack" currentUrl={data.aadhaarCardBackUrl} files={files} previews={previews} onFileChange={handleFileChange} />],
                            ['GST Certificate', <FileUpload label="GST Certificate" field="gstCertificate" currentUrl={data.gstCertificateUrl} files={files} previews={previews} onFileChange={handleFileChange} />],
                            ['Cancelled Cheque', <FileUpload label="Cancelled Cheque" field="cancelledCheque" currentUrl={data.cancelledChequeUrl} files={files} previews={previews} onFileChange={handleFileChange} />],
                        ]} />
                    </Section>

                    <Section title="Primary Contact & Photo">
                        <InfoGrid rows={[
                            ['Salutation', (
                                <select className={inputCls} value={form.contact1.title} onChange={e => inpC1('title', e.target.value)}>
                                    <option value="Mr.">Mr.</option>
                                    <option value="Ms.">Ms.</option>
                                    <option value="Mrs.">Mrs.</option>
                                    <option value="Dr.">Dr.</option>
                                    <option value="Prof.">Prof.</option>
                                </select>
                            )],
                            ['First Name', <input className={inputCls} value={form.contact1.firstName} onChange={e => inpC1('firstName', e.target.value)} />],
                            ['Last Name', <input className={inputCls} value={form.contact1.lastName} onChange={e => inpC1('lastName', e.target.value)} />],
                            ['Designation', <input className={inputCls} value={form.contact1.designation} onChange={e => inpC1('designation', e.target.value)} />],
                            ['Mobile', <input className={inputCls} value={form.contact1.mobile} onChange={e => inpC1('mobile', e.target.value)} />],
                            ['Email', <input className={inputCls} value={form.contact1.email} onChange={e => inpC1('email', e.target.value)} />],
                            ['Alt No.', <input className={inputCls} value={form.contact1.alternateNo} onChange={e => inpC1('alternateNo', e.target.value)} />],
                            ['Profile Photo', <FileUpload label="Photo" field="representativePhoto" currentUrl={data.representativePhotoUrl} files={files} previews={previews} onFileChange={handleFileChange} />],
                        ]} />
                    </Section>

                    <Section title="Secondary Contact Details">
                        <InfoGrid rows={[
                            ['Salutation', (
                                <select className={inputCls} value={form.contact2.title} onChange={e => inpC2('title', e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="Mr.">Mr.</option>
                                    <option value="Ms.">Ms.</option>
                                    <option value="Mrs.">Mrs.</option>
                                    <option value="Dr.">Dr.</option>
                                    <option value="Prof.">Prof.</option>
                                </select>
                            )],
                            ['First Name', <input className={inputCls} value={form.contact2.firstName} onChange={e => inpC2('firstName', e.target.value)} />],
                            ['Last Name', <input className={inputCls} value={form.contact2.lastName} onChange={e => inpC2('lastName', e.target.value)} />],
                            ['Designation', <input className={inputCls} value={form.contact2.designation} onChange={e => inpC2('designation', e.target.value)} />],
                            ['Mobile', <input className={inputCls} value={form.contact2.mobile} onChange={e => inpC2('mobile', e.target.value)} />],
                            ['Email', <input className={inputCls} value={form.contact2.email} onChange={e => inpC2('email', e.target.value)} />],
                            ['Alt No.', <input className={inputCls} value={form.contact2.alternateNo} onChange={e => inpC2('alternateNo', e.target.value)} />],
                        ]} />
                    </Section>

                    {/* Dynamic Official Documents Section */}
                    {(data.registrationPdfUrl || data.receiptPdfUrl || data.primaryCategory) && (
                        <Section title="Official Documents & Category (From Admin)">
                            <div className="p-3 bg-slate-50 border border-slate-200 rounded-md">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-bold text-slate-500 uppercase">Assigned Categories</p>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="px-2 py-1 bg-[#23471d]/10 text-[#23471d] text-[10px] font-bold rounded">
                                                {data.primaryCategory || 'Not Assigned'}
                                            </span>
                                            <span className="px-2 py-1 bg-[#d26019]/10 text-[#d26019] text-[10px] font-bold rounded">
                                                {data.subCategory || 'No Sub-category'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="space-y-2 text-right">
                                        <p className="text-[10px] font-bold text-slate-500 uppercase">Downloadable Forms</p>
                                        <div className="flex justify-end gap-2">
                                            {data.registrationPdfUrl && (
                                                <a href={fixUrl(data.registrationPdfUrl)} target="_blank" rel="noopener noreferrer" 
                                                   className="flex items-center gap-1.5 px-3 py-1.5 bg-[#23471d] text-white text-[10px] font-bold uppercase rounded shadow-sm hover:opacity-90">
                                                    <FileText size={12} /> Registration PDF
                                                </a>
                                            )}
                                            {data.receiptPdfUrl && (
                                                <a href={fixUrl(data.receiptPdfUrl)} target="_blank" rel="noopener noreferrer" 
                                                   className="flex items-center gap-1.5 px-3 py-1.5 bg-[#d26019] text-white text-[10px] font-bold uppercase rounded shadow-sm hover:opacity-90">
                                                    <FileText size={12} /> Payment Receipt
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Section>
                    )}

                </div>

                {/* Bottom Save Bar */}
                <div className="px-4 py-4 border-t bg-slate-50 flex justify-end gap-3">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-1.5 px-6 py-2 bg-[#23471d] text-white text-[11px] font-bold uppercase rounded hover:bg-[#1a3516] disabled:opacity-50 transition-colors shadow-lg"
                    >
                        <Save size={14} /> {saving ? 'Submitting Details...' : 'Submit Profile for Admin Review'}
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

// ─── FileUpload: defined OUTSIDE parent so React never remounts it ─────────────
function FileUpload({ label, field, currentUrl, files, previews, onFileChange }: {
    label: string;
    field: string;
    currentUrl?: string;
    files: Record<string, File>;
    previews: Record<string, string>;
    onFileChange: (field: string, file: File | null) => void;
}) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const isImage = currentUrl?.match(/\.(jpg|jpeg|png|webp|gif)$/i) || previews[field]?.startsWith('blob:');

    return (
        <div className="flex flex-col gap-1 w-full h-full">
            <div className="flex items-center gap-2 w-full">
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1.5 px-2 py-1 bg-slate-100 border border-slate-300 rounded text-[10px] font-bold text-slate-600 hover:bg-slate-200 transition-colors"
                >
                    <Upload size={12} /> {files[field] ? 'Change' : (currentUrl ? 'Change' : 'Upload')}
                </button>
                {files[field] && (
                    <span className="text-[9px] text-green-600 font-bold truncate max-w-[80px]">
                        ✓ {files[field].name}
                    </span>
                )}
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*,.pdf"
                    onChange={(e) => onFileChange(field, e.target.files?.[0] || null)}
                />
            </div>
            {(previews[field] || (currentUrl && isImage)) && (
                <div className="mt-1 flex items-center gap-2 border border-slate-200 rounded p-1 bg-slate-50">
                    <div className="w-8 h-8 rounded overflow-hidden flex items-center justify-center bg-white border border-slate-200">
                        <img
                            src={previews[field] || `${fixUrl(currentUrl)}${currentUrl && currentUrl.includes('?') ? '&' : '?'}v=${new Date().getTime()}`}
                            alt={label}
                            className="w-full h-full object-contain"
                        />
                    </div>
                    {currentUrl && (
                        <a
                            href={`${fixUrl(currentUrl)}${currentUrl.includes('?') ? '&' : '?'}v=${new Date().getTime()}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[9px] font-bold text-[#23471d] hover:underline flex items-center gap-0.5"
                        >
                            <ExternalLink size={8} /> View Orig.
                        </a>
                    )}
                </div>
            )}
        </div>
    );
}