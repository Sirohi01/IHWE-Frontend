
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Upload, FileText, Image as ImageIcon, ExternalLink, X, Plus, Trash2, Edit2, Check, XCircle, AlertCircle } from 'lucide-react';
import { API_URL, SERVER_URL } from '@/lib/api';
import { toast } from 'sonner';

const DEFAULT_PLACEHOLDER = "https://placehold.co/400x400?text=No+Logo";

const fixUrl = (url: string | null | undefined) => {
    if (!url || url === 'undefined' || url === 'null' || url === '') return DEFAULT_PLACEHOLDER;
    if (url.startsWith('http') || url.startsWith('blob:')) return url;
    const cleanPath = url.startsWith('/') ? url : `/${url}`;
    return url.includes('res.cloudinary.com') ? url : `${SERVER_URL}${cleanPath}`;
};

interface ProfileProps {
    data: any;
    setData: (data: any) => void;
}

// Validation functions
const validateWebsite = (url: string) => {
    if (!url) return true;
    const pattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return pattern.test(url);
};

const validateEmail = (email: string) => {
    if (!email) return true;
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
};

const validateMobile = (mobile: string) => {
    if (!mobile) return true;
    const pattern = /^[0-9]{10}$/;
    return pattern.test(mobile);
};

const validatePincode = (pincode: string) => {
    if (!pincode) return true;
    const pattern = /^[0-9]{6}$/;
    return pattern.test(pincode);
};

const validateGST = (gst: string) => {
    if (!gst) return true;
    const pattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return pattern.test(gst);
};

const validatePAN = (pan: string) => {
    if (!pan) return true;
    const pattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return pattern.test(pan);
};

// Updated InfoGrid with validation
function InfoGrid({ rows, onEdit, errors }: { rows: [string, React.ReactNode][], onEdit?: (index: number, label: string, value: string) => void, errors?: Record<string, string> }) {
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editValue, setEditValue] = useState<string>('');
    const [fieldError, setFieldError] = useState<string>('');

    const handleEdit = (index: number, label: string, currentValue: any) => {
        setEditingIndex(index);
        setFieldError('');
        let valueToEdit = '';
        if (currentValue && typeof currentValue === 'object' && 'props' in currentValue) {
            valueToEdit = currentValue.props.value || '';
        } else if (typeof currentValue === 'string') {
            valueToEdit = currentValue;
        }
        setEditValue(valueToEdit);
    };

    const validateField = (label: string, value: string): string => {
        if (label === 'Email') {
            if (value && !validateEmail(value)) return 'Invalid email format';
        } else if (label === 'Mobile' || label === 'Alt No.') {
            if (value && !validateMobile(value)) return 'Must be 10 digits';
        } else if (label === 'Pincode') {
            if (value && !validatePincode(value)) return 'Must be 6 digits';
        } else if (label === 'GST No.' || label === 'VAT No.') {
            if (value && !validateGST(value)) return 'Invalid GST format';
        } else if (label === 'PAN No.' || label === 'Reg No.') {
            if (value && !validatePAN(value)) return 'Invalid PAN format';
        } else if (label === 'Website') {
            if (value && !validateWebsite(value)) return 'Invalid website URL';
        }
        return '';
    };

    const handleSave = (index: number, label: string) => {
        const error = validateField(label, editValue);
        if (error) {
            setFieldError(error);
            toast.error(error);
            return;
        }
        if (onEdit) onEdit(index, label, editValue);
        setEditingIndex(null);
        setEditValue('');
        setFieldError('');
    };

    const handleCancel = () => {
        setEditingIndex(null);
        setEditValue('');
        setFieldError('');
    };

    return (
        <div className="border border-slate-200 rounded-md overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {rows.map(([label, value], i) => {
                    const isEditable = value && typeof value === 'object' && 'props' in value &&
                        (value.props.value !== undefined || value.props.onChange);
                    const error = errors?.[label] || '';

                    return (
                        <div
                            key={i}
                            className={`group relative flex border-r border-b border-slate-200 last:border-r-0 hover:bg-slate-50/40 transition ${error ? 'bg-red-50' : ''}`}
                        >
                            <div className="w-[120px] min-w-[120px] px-2 py-2 text-[10px] font-semibold text-slate-500 uppercase border-r border-slate-200 bg-slate-50 flex items-center">
                                {label}
                            </div>
                            <div className="flex-1 px-2 py-2 text-[11px] text-slate-800 flex items-center break-all min-h-[40px]">
                                {editingIndex === i ? (
                                    <div className="flex flex-col gap-1 w-full">
                                        <div className="flex items-center gap-1 w-full">
                                            <input
                                                type={label === 'Email' ? 'email' : label.includes('Mobile') || label.includes('Alt') || label === 'Pincode' ? 'tel' : 'text'}
                                                value={editValue}
                                                onChange={(e) => setEditValue(e.target.value)}
                                                className={`flex-1 h-6 text-[11px] border rounded px-1 outline-none focus:ring-1 ${fieldError ? 'border-red-500 focus:border-red-500' : 'border-slate-300 focus:border-[#23471d] focus:ring-[#23471d]/20'}`}
                                                autoFocus
                                            />
                                            <button
                                                onClick={() => handleSave(i, label)}
                                                className="p-0.5 bg-green-600 text-white rounded hover:bg-green-700"
                                            >
                                                <Check size={12} />
                                            </button>
                                            <button
                                                onClick={handleCancel}
                                                className="p-0.5 bg-red-600 text-white rounded hover:bg-red-700"
                                            >
                                                <XCircle size={12} />
                                            </button>
                                        </div>
                                        {fieldError && (
                                            <span className="text-[8px] text-red-600 flex items-center gap-0.5">
                                                <AlertCircle size={8} /> {fieldError}
                                            </span>
                                        )}
                                    </div>
                                ) : (
                                    <>
                                        {value ?? '—'}
                                        {isEditable && (
                                            <button
                                                onClick={() => handleEdit(i, label, value)}
                                                className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 bg-slate-100 rounded hover:bg-slate-200"
                                            >
                                                <Edit2 size={10} className="text-slate-500" />
                                            </button>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
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
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    // Make all company fields editable
    const [companyForm, setCompanyForm] = useState({
        exhibitorName: data.exhibitorName || '',
        typeOfBusiness: data.typeOfBusiness || '',
        industrySector: data.industrySector || '',
    });

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

    const [initialDataId, setInitialDataId] = useState(data._id);

    useEffect(() => {
        if (data._id !== initialDataId) {
            setInitialDataId(data._id);
            setCompanyForm({
                exhibitorName: data.exhibitorName || '',
                typeOfBusiness: data.typeOfBusiness || '',
                industrySector: data.industrySector || '',
            });
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
        }

        setFiles({});
        setPreviews({});
        setAdditionalImageFiles([]);
        setAdditionalImagePreviews([]);
        setDeletedAdditionalImages([]);

        if (data.additionalImages && Array.isArray(data.additionalImages)) {
            setExistingAdditionalImages(data.additionalImages);
        } else {
            setExistingAdditionalImages([]);
        }
    }, [data, initialDataId]);

    const [files, setFiles] = useState<Record<string, File>>({});
    const [previews, setPreviews] = useState<Record<string, string>>({});

    const [additionalImageFiles, setAdditionalImageFiles] = useState<File[]>([]);
    const [additionalImagePreviews, setAdditionalImagePreviews] = useState<string[]>([]);
    const [existingAdditionalImages, setExistingAdditionalImages] = useState<string[]>([]);
    const [deletedAdditionalImages, setDeletedAdditionalImages] = useState<string[]>([]);

    const handleFileChange = (field: string, file: File | null) => {
        if (!file) {
            setFiles(prev => { const next = { ...prev }; delete next[field]; return next; });
            setPreviews(prev => { const next = { ...prev }; delete next[field]; return next; });
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error('File size should be less than 5MB');
            return;
        }

        setFiles(prev => ({ ...prev, [field]: file }));
        if (file.type.startsWith('image/')) {
            const url = URL.createObjectURL(file);
            setPreviews(prev => ({ ...prev, [field]: url }));
        }
    };

    const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        if (selectedFiles.length === 0) return;

        const imageFiles = selectedFiles.filter(f => f.type.startsWith('image/'));

        // Validate each file size
        const validFiles = imageFiles.filter(f => f.size <= 5 * 1024 * 1024);
        if (validFiles.length !== imageFiles.length) {
            toast.error('Some files exceed 5MB limit and were skipped');
        }

        setAdditionalImageFiles(prev => [...prev, ...validFiles]);

        validFiles.forEach(file => {
            const url = URL.createObjectURL(file);
            setAdditionalImagePreviews(prev => [...prev, url]);
        });
    };

    const removeNewAdditionalImage = (index: number) => {
        URL.revokeObjectURL(additionalImagePreviews[index]);
        setAdditionalImageFiles(prev => prev.filter((_, i) => i !== index));
        setAdditionalImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    const removeExistingAdditionalImage = (index: number) => {
        const imageUrl = existingAdditionalImages[index];
        setDeletedAdditionalImages(prev => [...prev, imageUrl]);
        setExistingAdditionalImages(prev => prev.filter((_, i) => i !== index));
    };

    const validateAllFields = (): boolean => {
        const errors: Record<string, string> = {};

        // Validate website
        if (form.website && !validateWebsite(form.website)) {
            errors['Website'] = 'Invalid website URL';
        }

        // Validate GST
        if (form.gstNo && !validateGST(form.gstNo)) {
            errors['GST No.'] = 'Invalid GST format';
        }

        // Validate PAN
        if (form.panNo && !validatePAN(form.panNo)) {
            errors['PAN No.'] = 'Invalid PAN format';
        }

        // Validate pincode
        if (form.pincode && !validatePincode(form.pincode)) {
            errors['Pincode'] = 'Must be 6 digits';
        }

        // Validate primary contact
        if (form.contact1.email && !validateEmail(form.contact1.email)) {
            errors['Email (Primary)'] = 'Invalid email format';
        }
        if (form.contact1.mobile && !validateMobile(form.contact1.mobile)) {
            errors['Mobile (Primary)'] = 'Must be 10 digits';
        }

        // Validate secondary contact
        if (form.contact2.email && !validateEmail(form.contact2.email)) {
            errors['Email (Secondary)'] = 'Invalid email format';
        }
        if (form.contact2.mobile && !validateMobile(form.contact2.mobile)) {
            errors['Mobile (Secondary)'] = 'Must be 10 digits';
        }

        setValidationErrors(errors);

        if (Object.keys(errors).length > 0) {
            toast.error('Please fix validation errors before submitting');
            return false;
        }

        return true;
    };

    const handleEditField = (index: number, label: string, value: string) => {
        // Map label to form field
        const fieldMap: Record<string, string> = {
            'Company Name': 'exhibitorName',
            'Business Type': 'typeOfBusiness',
            'Industry': 'industrySector',
            'Website': 'website',
            'Fascia Name': 'fasciaName',
            'GST No.': 'gstNo',
            'VAT No.': 'gstNo',
            'PAN No.': 'panNo',
            'Reg No.': 'panNo',
            'Nature of Business': 'natureOfBusiness',
            'Address': 'address',
            'City': 'city',
            'State': 'state',
            'Country': 'country',
            'Pincode': 'pincode',
            'Landline': 'landlineNo',
            'First Name': 'firstName',
            'Last Name': 'lastName',
            'Designation': 'designation',
            'Mobile': 'mobile',
            'Email': 'email',
            'Alt No.': 'alternateNo'
        };

        const fieldName = fieldMap[label];
        if (fieldName) {
            if (['exhibitorName', 'typeOfBusiness', 'industrySector'].includes(fieldName)) {
                setCompanyForm(prev => ({ ...prev, [fieldName]: value }));
            } else if (['firstName', 'lastName', 'designation', 'mobile', 'email', 'alternateNo'].includes(fieldName)) {
                inpC1(fieldName, value);
            } else {
                inp(fieldName, value);
            }

            // Clear validation error for this field if it exists
            if (validationErrors[label]) {
                const newErrors = { ...validationErrors };
                delete newErrors[label];
                setValidationErrors(newErrors);
            }
        }
    };

    const handleSave = async () => {
        // Validate all fields before saving
        if (!validateAllFields()) {
            return;
        }

        setSaving(true);
        try {
            const token = localStorage.getItem('exhibitorToken');
            const formData = new FormData();

            // Merge company form with main form
            const allFormData = {
                ...form,
                exhibitorName: companyForm.exhibitorName,
                typeOfBusiness: companyForm.typeOfBusiness,
                industrySector: companyForm.industrySector,
            };

            Object.entries(allFormData).forEach(([key, value]) => {
                if (typeof value === 'object') {
                    formData.append(key, JSON.stringify(value));
                } else {
                    formData.append(key, value as string);
                }
            });

            Object.entries(files).forEach(([field, file]) => {
                const multerFieldMap: Record<string, string> = {
                    companyLogoUrl: 'companyLogo',
                    panCardFrontUrl: 'panCardFront',
                    aadhaarCardFrontUrl: 'aadhaarCardFront',
                    aadhaarCardBackUrl: 'aadhaarCardBack',
                    gstCertificateUrl: 'gstCertificate',
                    cancelledChequeUrl: 'cancelledCheque',
                    representativePhotoUrl: 'representativePhoto'
                };
                formData.append(multerFieldMap[field] || field, file);
            });

            additionalImageFiles.forEach(file => {
                formData.append('additionalImages', file);
            });

            if (deletedAdditionalImages.length > 0) {
                formData.append('deletedAdditionalImages', JSON.stringify(deletedAdditionalImages));
            }

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
                    setAdditionalImageFiles([]);
                    setAdditionalImagePreviews([]);
                    setDeletedAdditionalImages([]);
                    if (result.data.additionalImages) {
                        setExistingAdditionalImages(result.data.additionalImages);
                    }
                    setFiles({});
                    setPreviews({});
                    setValidationErrors({});
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

                <div className="p-4 space-y-4">

                    <Section title="Company Information">
                        <InfoGrid
                            rows={[
                                ['Company Name', <input className={inputCls} value={companyForm.exhibitorName} onChange={e => setCompanyForm(prev => ({ ...prev, exhibitorName: e.target.value }))} />],
                                ['Business Type', <input className={inputCls} value={companyForm.typeOfBusiness} onChange={e => setCompanyForm(prev => ({ ...prev, typeOfBusiness: e.target.value }))} />],
                                ['Industry', <input className={inputCls} value={companyForm.industrySector} onChange={e => setCompanyForm(prev => ({ ...prev, industrySector: e.target.value }))} />],
                                ['Website', <input className={inputCls} placeholder="e.g. www.example.com" value={form.website} onChange={e => inp('website', e.target.value)} />],
                                ['Fascia Name', <input className={inputCls} placeholder="Name on stall" value={form.fasciaName} onChange={e => inp('fasciaName', e.target.value)} />],
                                [isDomestic ? 'GST No.' : 'VAT No.', <input className={inputCls} placeholder="e.g. 22AAAAA0000A1Z" value={form.gstNo} onChange={e => inp('gstNo', e.target.value)} />],
                                [isDomestic ? 'PAN No.' : 'Reg No.', <input className={inputCls} placeholder="e.g. AAAAA1234A" value={form.panNo} onChange={e => inp('panNo', e.target.value)} />],
                                ['Nature of Business', <input className={inputCls} placeholder="Exporter, Mfg, etc." value={form.natureOfBusiness} onChange={e => inp('natureOfBusiness', e.target.value)} />],
                            ]}
                            onEdit={handleEditField}
                            errors={validationErrors}
                        />
                    </Section>

                    <Section title="Address Details">
                        <InfoGrid
                            rows={[
                                ['Address', <input className={inputCls} value={form.address} onChange={e => inp('address', e.target.value)} />],
                                ['City', <input className={inputCls} value={form.city} onChange={e => inp('city', e.target.value)} />],
                                ['State', <input className={inputCls} value={form.state} onChange={e => inp('state', e.target.value)} />],
                                ['Country', <input className={inputCls} value={form.country} onChange={e => inp('country', e.target.value)} />],
                                ['Pincode', <input className={inputCls} type="tel" placeholder="6 digits" maxLength={6} value={form.pincode} onChange={e => inp('pincode', e.target.value.replace(/\D/g, ''))} />],
                                ['Landline', <input className={inputCls} type="tel" placeholder="Phone number" value={form.landlineNo} onChange={e => inp('landlineNo', e.target.value)} />],
                            ]}
                            onEdit={handleEditField}
                            errors={validationErrors}
                        />
                    </Section>

                    <Section title="Primary Contact">
                        <InfoGrid
                            rows={[
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
                                ['Mobile', <input className={inputCls} type="tel" placeholder="10 digits" maxLength={10} value={form.contact1.mobile} onChange={e => inpC1('mobile', e.target.value.replace(/\D/g, ''))} />],
                                ['Email', <input className={inputCls} type="email" placeholder="email@example.com" value={form.contact1.email} onChange={e => inpC1('email', e.target.value)} />],
                                ['Alt No.', <input className={inputCls} type="tel" placeholder="Alternate number" value={form.contact1.alternateNo} onChange={e => inpC1('alternateNo', e.target.value)} />],
                            ]}
                            onEdit={handleEditField}
                            errors={validationErrors}
                        />
                    </Section>

                    <Section title="Secondary Contact">
                        <InfoGrid
                            rows={[
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
                                ['Mobile', <input className={inputCls} type="tel" placeholder="10 digits" maxLength={10} value={form.contact2.mobile} onChange={e => inpC2('mobile', e.target.value.replace(/\D/g, ''))} />],
                                ['Email', <input className={inputCls} type="email" placeholder="email@example.com" value={form.contact2.email} onChange={e => inpC2('email', e.target.value)} />],
                                ['Alt No.', <input className={inputCls} type="tel" placeholder="Alternate number" value={form.contact2.alternateNo} onChange={e => inpC2('alternateNo', e.target.value)} />],
                            ]}
                            onEdit={handleEditField}
                            errors={validationErrors}
                        />
                    </Section>



                    {/* All Upload Sections at Bottom */}
                    <div className="border-t border-slate-200 pt-4 mt-4">
                        <h3 className="text-[12px] font-bold text-slate-700 mb-3 uppercase tracking-wide">Document Uploads</h3>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 mb-6">
                            <FileUpload
                                label="Company Logo"
                                field="companyLogoUrl"
                                currentUrl={data.companyLogoUrl}
                                files={files}
                                previews={previews}
                                onFileChange={handleFileChange}
                            />

                            <FileUpload
                                label="PAN Card"
                                field="panCardFrontUrl"
                                currentUrl={data.panCardFrontUrl}
                                files={files}
                                previews={previews}
                                onFileChange={handleFileChange}
                            />

                            <FileUpload
                                label="Aadhaar Front"
                                field="aadhaarCardFrontUrl"
                                currentUrl={data.aadhaarCardFrontUrl}
                                files={files}
                                previews={previews}
                                onFileChange={handleFileChange}
                            />

                            <FileUpload
                                label="Aadhaar Back"
                                field="aadhaarCardBackUrl"
                                currentUrl={data.aadhaarCardBackUrl}
                                files={files}
                                previews={previews}
                                onFileChange={handleFileChange}
                            />

                            <FileUpload
                                label="GST Certificate"
                                field="gstCertificateUrl"
                                currentUrl={data.gstCertificateUrl}
                                files={files}
                                previews={previews}
                                onFileChange={handleFileChange}
                            />

                            <FileUpload
                                label="Cancelled Cheque"
                                field="cancelledChequeUrl"
                                currentUrl={data.cancelledChequeUrl}
                                files={files}
                                previews={previews}
                                onFileChange={handleFileChange}
                            />

                            <FileUpload
                                label="Representative Photo"
                                field="representativePhotoUrl"
                                currentUrl={data.representativePhotoUrl}
                                files={files}
                                previews={previews}
                                onFileChange={handleFileChange}
                            />
                        </div>


                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// FileUpload component with validation
function FileUpload({ label, field, currentUrl, files, previews, onFileChange }: {
    label: string;
    field: string;
    currentUrl?: string;
    files: Record<string, File>;
    previews: Record<string, string>;
    onFileChange: (field: string, file: File | null) => void;
}) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [showPreview, setShowPreview] = useState(false);

    const hasFile = files[field];
    const previewUrl = previews[field] || (currentUrl ? fixUrl(currentUrl) : null);
    const isImage = previewUrl && (previewUrl.match(/\.(jpg|jpeg|png|webp|gif)$/i) || previewUrl.startsWith('blob:'));

    return (
        <div className="border border-slate-200 rounded-md p-2 bg-slate-50/30 hover:bg-slate-50 transition-colors">
            <div className="flex items-center justify-between mb-1">
                <label className="text-[9px] font-bold text-slate-600 uppercase tracking-wide">{label}</label>
                {hasFile && (
                    <span className="text-[7px] text-green-600 font-bold truncate max-w-[70px]">
                        ✓ {files[field].name.substring(0, 10)}
                    </span>
                )}
            </div>

            <div className="flex flex-wrap items-center gap-1">
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1 px-2 py-1 bg-white border border-slate-300 rounded text-[9px] font-semibold text-slate-600 hover:bg-slate-100 transition-colors shadow-sm"
                >
                    <Upload size={10} /> {hasFile ? 'Change' : (currentUrl ? 'Change' : 'Upload')}
                </button>

                {previewUrl && isImage && (
                    <button
                        type="button"
                        onClick={() => setShowPreview(!showPreview)}
                        className="flex items-center gap-1 px-2 py-1 bg-slate-100 border border-slate-300 rounded text-[9px] font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
                    >
                        <ImageIcon size={10} /> {showPreview ? 'Hide' : 'Preview'}
                    </button>
                )}

                {hasFile && (
                    <button
                        type="button"
                        onClick={() => onFileChange(field, null)}
                        className="p-1 bg-red-50 border border-red-200 rounded text-red-600 hover:bg-red-100 transition-colors"
                    >
                        <Trash2 size={10} />
                    </button>
                )}

                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*,.pdf"
                    onChange={(e) => onFileChange(field, e.target.files?.[0] || null)}
                />
            </div>

            {showPreview && previewUrl && isImage && (
                <div className="mt-2 flex justify-center">
                    <div className="w-16 h-16 bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                        <img
                            src={previewUrl}
                            alt={label}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}