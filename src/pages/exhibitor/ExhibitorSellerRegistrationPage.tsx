import { useState, useEffect, useRef } from 'react';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Building2, User, Landmark, ShieldCheck, Check, ArrowRight, ArrowLeft,
    Globe, Sparkles, Eye, FileText, Info
} from 'lucide-react';
import { API_URL } from '@/lib/api';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ExhibitorSellerRegistrationPage() {
    const { data, fetchDashboard } = useExhibitorCtx();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedPlan, setSelectedPlan] = useState('Growth'); // Starter, Growth, Pro
    const isInitialized = useRef(false);

    // Form fields mapped exactly to standard seller details and prefilled
    const [formData, setFormData] = useState({
        // Step 1: Business Details
        brandName: '',
        businessType: '',
        country: '',
        stateProvince: '',
        city: '',
        website: '',
        businessCategory: '',
        companyDescription: '',
        gstNumber: '',
        panNumber: '',

        // Step 2: Contact Details
        contactFirstName: '',
        contactLastName: '',
        contactDesignation: '',
        contactEmail: '',
        contactMobile: '',
        contactAlternateNo: '',

        // Step 3: Stall Preference & Bank Details
        stallCategory: '',
        stallScheme: '',
        stallSize: '',
        preferredStallNo: '',
        additionalRequirements: '',
        bankName: '',
        accountHolder: '',
        accountNumber: '',
        ifscCode: '',
        branch: '',
        accountType: 'Current',

        // Step 4: Documents (URLs or file names)
        panCardFrontUrl: '',
        gstCertificateUrl: '',
        aadhaarCardFrontUrl: '',
        cancelledChequeUrl: '',
        representativePhotoUrl: '',
    });

    // Prefill details automatically from context data
    useEffect(() => {
        if (data && !isInitialized.current) {
            setFormData({
                brandName: data.brandName || data.fasciaName || data.exhibitorName || '',
                businessType: data.typeOfBusiness || data.msme?.msmeCategory || 'Manufacturer',
                country: data.country || 'India',
                stateProvince: data.state || '',
                city: data.city || '',
                website: data.website || '',
                businessCategory: data.primaryCategory || data.natureOfBusiness || 'Healthcare & Diagnostics',
                companyDescription: data.companyDescription || '',
                gstNumber: data.gstNo || data.billing?.gst || data.msme?.gstNumber || '',
                panNumber: data.panNo || data.billing?.pan || data.msme?.panNumber || '',

                contactFirstName: data.contact1?.firstName || '',
                contactLastName: data.contact1?.lastName || '',
                contactDesignation: data.contact1?.designation || '',
                contactEmail: data.contact1?.email || '',
                contactMobile: data.contact1?.mobile || '',
                contactAlternateNo: data.contact1?.alternateNo || '',

                stallCategory: data.participation?.stallCategory || 'Shell Scheme',
                stallScheme: data.participation?.stallScheme || 'Normal',
                stallSize: data.participation?.stallSize?.toString() || '9',
                preferredStallNo: data.participation?.stallNo || '',
                additionalRequirements: '',

                bankName: data.bankDetails?.bankName || '',
                accountHolder: data.bankDetails?.accountHolder || data.exhibitorName || '',
                accountNumber: data.bankDetails?.accountNumber || '',
                ifscCode: data.bankDetails?.ifscCode || '',
                branch: data.bankDetails?.branch || '',
                accountType: data.bankDetails?.accountType || 'Current',

                panCardFrontUrl: data.panCardFrontUrl || '',
                gstCertificateUrl: data.gstCertificateUrl || '',
                aadhaarCardFrontUrl: data.aadhaarCardFrontUrl || '',
                cancelledChequeUrl: data.cancelledChequeUrl || '',
                representativePhotoUrl: data.representativePhotoUrl || '',
            });
            isInitialized.current = true;
        }
    }, [data]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNextStep = () => {
        // Simple validations
        if (currentStep === 1) {
            if (!formData.brandName || !formData.businessType || !formData.country || !formData.city || !formData.businessCategory || !formData.companyDescription) {
                toast.error("Please fill all required fields in Business Details");
                return;
            }
        } else if (currentStep === 2) {
            if (!formData.contactFirstName || !formData.contactLastName || !formData.contactDesignation || !formData.contactEmail || !formData.contactMobile) {
                toast.error("Please fill all required fields in Contact Details");
                return;
            }
        } else if (currentStep === 3) {
            if (!formData.bankName || !formData.accountHolder || !formData.accountNumber || !formData.ifscCode) {
                toast.error("Please fill all Payout & Bank Details");
                return;
            }
        }
        setCurrentStep(prev => Math.min(prev + 1, 5));
    };

    const handlePrevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
        try {
            const token = localStorage.getItem('exhibitorToken');
            const res = await fetch(`${API_URL}/exhibitor-auth/register-seller?id=${data._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    sellerDetails: {
                        brandName: formData.brandName,
                        productCategories: [formData.businessCategory],
                        businessRegistrationNo: formData.gstNumber || formData.panNumber || '',
                        gstNumber: formData.gstNumber,
                        panNumber: formData.panNumber,
                        website: formData.website,
                        bankName: formData.bankName,
                        accountHolder: formData.accountHolder,
                        accountNumber: formData.accountNumber,
                        ifscCode: formData.ifscCode,
                        branch: formData.branch,
                        accountType: formData.accountType,
                        selectedPlan: selectedPlan
                    }
                })
            });

            const result = await res.json();
            if (result.success) {
                toast.success("Seller registration submitted successfully!");
                setSuccess(true);
                fetchDashboard(data._id);
            } else {
                toast.error(result.message || "Registration failed");
            }
        } catch (error) {
            console.error("Seller registration error:", error);
            toast.error("An error occurred during registration");
        } finally {
            setLoading(false);
        }
    };

    const steps = [
        { num: 1, label: 'Business Details' },
        { num: 2, label: 'Contact Details' },
        { num: 3, label: 'Stall Preference' },
        { num: 4, label: 'Documents' },
        { num: 5, label: 'Review & Submit' }
    ];

    if (success || data?.isSeller) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto mt-12 bg-white rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-slate-150"
            >
                <div className="bg-[#108c2d] p-12 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', damping: 12 }}
                        className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 border border-white/30"
                    >
                        <Check className="w-10 h-10 text-white" />
                    </motion.div>
                    <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">Application Submitted Successfully</h2>
                    <p className="text-white/70 text-xs max-w-md mx-auto leading-relaxed">
                        Your request to register as an exhibitor seller has been received and is currently being processed by our B2B team.
                    </p>
                </div>

                <div className="p-12 text-center bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                            <ShieldCheck className="w-8 h-8 text-[#108c2d] mx-auto mb-3" />
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</h4>
                            <p className="text-sm font-bold text-slate-900 uppercase">
                                {data?.sellerStatus === 'active' ? 'Account Active' : 'Under Review'}
                            </p>
                        </div>
                        <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                            <Building2 className="w-8 h-8 text-[#108c2d] mx-auto mb-3" />
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Seller ID</h4>
                            <p className="text-sm font-bold text-slate-900 uppercase">{data?.registrationId || 'IHWE/2026/SLR'}</p>
                        </div>
                        <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                            <Globe className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Package</h4>
                            <p className="text-sm font-bold text-slate-900 uppercase">{data?.sellerSubscription?.plan || 'Growth Package'}</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button
                            onClick={() => window.location.href = '/exhibitor-dashboard'}
                            className="w-full sm:w-auto h-11 px-10 bg-[#108c2d] hover:bg-[#0b651b] text-white font-bold rounded-xl shadow-lg transition-all"
                        >
                            Back to Workspace
                        </Button>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto pb-3 pt-4 px-4 h-[calc(100vh-65px)] overflow-hidden">
            {/* Direct top-level grid so that right column aligns with the header and starts from the top */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 h-full items-stretch min-h-0">

                {/* Left Column: Page Header + Stepper + Form Card */}
                <div className="lg:col-span-8 xl:col-span-8 flex flex-col gap-2 min-h-0">

                    {/* Header section with page path/details - Highly Compact */}
                    <div className="flex-shrink-0">
                        <h1 className="text-xl font-md text-slate-900 tracking-tight">Seller (Exhibitor) Registration</h1>
                        <p className="text-slate-505 text-[12px] mt-0.5">Fill in the details below to register as an exhibitor at IHWE 2026.</p>
                    </div>

                    {/* Progress Stepper component - Highly Compact */}
                    <div className="bg-white px-5 py-2 rounded-2xl border border-slate-200/80 shadow-sm relative overflow-hidden flex-shrink-0">
                        <div className="flex items-center justify-between max-w-4xl mx-auto relative z-10">
                            {steps.map((s, idx) => {
                                const isActive = s.num === currentStep;
                                const isCompleted = s.num < currentStep;
                                return (
                                    <div key={s.num} className="flex flex-col items-center flex-1 relative">
                                        {/* Connector line */}
                                        {idx > 0 && (
                                            <div className="absolute top-3 right-[50%] w-full h-[1.5px] -z-10 translate-y-[-50%]"
                                                style={{
                                                    background: idx < currentStep ? '#108c2d' : '#e2e8f0',
                                                    left: '-50%',
                                                    right: '50%'
                                                }}
                                            />
                                        )}

                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] transition-all duration-300 ${isActive ? 'bg-[#108c2d] text-white ring-4 ring-[#108c2d]/10 font-black' :
                                            isCompleted ? 'bg-[#108c2d] text-white' :
                                                'bg-slate-100 text-slate-400 border border-slate-200'
                                            }`}>
                                            {isCompleted ? <Check size={11} className="stroke-[3.5px]" /> : s.num}
                                        </div>
                                        <span className={`text-[10px] font-bold mt-1 transition-all uppercase tracking-tight ${isActive ? 'text-[#108c2d] font-black' : 'text-slate-400'
                                            }`}>
                                            {s.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col justify-between flex-1 min-h-0">

                        {/* Interactive Steps container - Scrollable internal only */}
                        <div className="p-3 flex-1 overflow-y-auto custom-scrollbar">
                            <AnimatePresence mode="wait">
                                {currentStep === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: -8 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 8 }}
                                        className="space-y-2.5"
                                    >
                                        <div className="flex items-center gap-2 pb-1.5 border-b border-slate-100">
                                            <div className="w-7 h-7 bg-[#eef8f0] text-[#108c2d] rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Building2 size={14} />
                                            </div>
                                            <div>
                                                <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-tight leading-none">Business Details</h3>
                                                <p className="text-[8px] text-slate-400 font-bold uppercase mt-0.5 leading-none">Tell us about your business</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1.5">
                                            <div className="space-y-0.5">
                                                <Label className="text-[10px] font-bold text-slate-700">Company / Brand Name <span className="text-red-500">*</span></Label>
                                                <Input
                                                    name="brandName"
                                                    value={formData.brandName}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter company or brand name"
                                                    className="h-9 border-slate-200 rounded-lg text-[11px] font-bold focus:border-[#108c2d] focus:ring-0 transition-all bg-white"
                                                />
                                            </div>

                                            <div className="space-y-0.5">
                                                <Label className="text-[10px] font-bold text-slate-700">Business Type <span className="text-red-500">*</span></Label>
                                                <Select value={formData.businessType} onValueChange={(v) => handleSelectChange('businessType', v)}>
                                                    <SelectTrigger className="h-9 border-slate-200 rounded-lg text-[11px] font-bold focus:border-[#108c2d] transition-all bg-white text-left shadow-none outline-none">
                                                        <SelectValue placeholder="Select business type" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-white">
                                                        {['Manufacturer', 'Service Provider', 'Trader', 'Exporter', 'Others'].map(t => (
                                                            <SelectItem key={t} value={t} className="text-xs font-semibold">{t}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-0.5">
                                                <Label className="text-[10px] font-bold text-slate-700">Country <span className="text-red-500">*</span></Label>
                                                <Select value={formData.country} onValueChange={(v) => handleSelectChange('country', v)}>
                                                    <SelectTrigger className="h-9 border-slate-200 rounded-lg text-[11px] font-bold focus:border-[#108c2d] transition-all bg-white text-left shadow-none">
                                                        <SelectValue placeholder="Select country" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-white max-h-48">
                                                        {['India', 'United States', 'United Kingdom', 'Germany', 'United Arab Emirates', 'Singapore'].map(c => (
                                                            <SelectItem key={c} value={c} className="text-xs font-semibold">{c}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-0.5">
                                                <Label className="text-[10px] font-bold text-slate-700">State <span className="text-red-500">*</span></Label>
                                                <Input
                                                    name="stateProvince"
                                                    value={formData.stateProvince}
                                                    onChange={handleInputChange}
                                                    placeholder="Select state"
                                                    className="h-9 border-slate-200 rounded-lg text-[11px] font-bold focus:border-[#108c2d] focus:ring-0 transition-all bg-white"
                                                />
                                            </div>

                                            <div className="space-y-0.5">
                                                <Label className="text-[10px] font-bold text-slate-700">City <span className="text-red-500">*</span></Label>
                                                <Input
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter city"
                                                    className="h-9 border-slate-200 rounded-lg text-[11px] font-bold focus:border-[#108c2d] focus:ring-0 transition-all bg-white"
                                                />
                                            </div>

                                            <div className="space-y-0.5">
                                                <Label className="text-[10px] font-bold text-slate-700">Website (Optional)</Label>
                                                <div className="relative flex items-center">
                                                    <span className="absolute left-3.5 text-slate-400"><Globe size={12} /></span>
                                                    <Input
                                                        name="website"
                                                        value={formData.website}
                                                        onChange={handleInputChange}
                                                        placeholder="www.yourwebsite.com"
                                                        className="h-9 pl-9 border-slate-200 rounded-lg text-[11px] font-bold focus:border-[#108c2d] focus:ring-0 transition-all bg-white"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-0.5 md:col-span-2">
                                                <Label className="text-[10px] font-bold text-slate-700">Business Category <span className="text-red-500">*</span></Label>
                                                <Select value={formData.businessCategory} onValueChange={(v) => handleSelectChange('businessCategory', v)}>
                                                    <SelectTrigger className="h-9 border-slate-200 rounded-lg text-[11px] font-bold focus:border-[#108c2d] transition-all bg-white text-left shadow-none">
                                                        <SelectValue placeholder="Select business category" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-white">
                                                        {['Healthcare & Diagnostics', 'AYUSH & Herbal Remedies', 'Organic & Natural Products', 'Wellness Devices & Fitness', 'Corporate Gifting', 'Pharma & Biotech'].map(bc => (
                                                            <SelectItem key={bc} value={bc} className="text-xs font-semibold">{bc}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-0.5 md:col-span-2">
                                                <Label className="text-[10px] font-bold text-slate-700">Brief About Your Business / Products <span className="text-red-500">*</span></Label>
                                                <textarea
                                                    name="companyDescription"
                                                    value={formData.companyDescription}
                                                    onChange={handleInputChange}
                                                    maxLength={500}
                                                    rows={3}
                                                    placeholder="Write a short description about your business and products"
                                                    className="w-full p-2.5 border border-slate-200 rounded-lg text-[11px] font-bold focus:border-[#108c2d] outline-none transition-all resize-none bg-white placeholder:text-slate-450 h-16"
                                                />
                                                <div className="text-right text-[9px] font-black text-slate-400 mt-0.5">
                                                    {formData.companyDescription.length} / 500
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {currentStep === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: -8 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 8 }}
                                        className="space-y-2.5"
                                    >
                                        <div className="flex items-center gap-2 pb-1.5 border-b border-slate-100">
                                            <div className="w-7 h-7 bg-[#eef8f0] text-[#108c2d] rounded-lg flex items-center justify-center flex-shrink-0">
                                                <User size={14} />
                                            </div>
                                            <div>
                                                <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-tight leading-none">Contact Details</h3>
                                                <p className="text-[8px] text-slate-400 font-bold uppercase mt-0.5 leading-none">Manage your representative details</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1.5">
                                            <div className="space-y-0.5">
                                                <Label className="text-[10px] font-bold text-slate-700">First Name <span className="text-red-500">*</span></Label>
                                                <Input
                                                    name="contactFirstName"
                                                    value={formData.contactFirstName}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter first name"
                                                    className="h-9 border-slate-200 rounded-lg text-[11px] font-bold focus:border-[#108c2d] bg-white"
                                                />
                                            </div>

                                            <div className="space-y-0.5">
                                                <Label className="text-[10px] font-bold text-slate-700">Last Name <span className="text-red-500">*</span></Label>
                                                <Input
                                                    name="contactLastName"
                                                    value={formData.contactLastName}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter last name"
                                                    className="h-9 border-slate-200 rounded-lg text-[11px] font-bold focus:border-[#108c2d] bg-white"
                                                />
                                            </div>

                                            <div className="space-y-0.5">
                                                <Label className="text-[10px] font-bold text-slate-700">Designation <span className="text-red-500">*</span></Label>
                                                <Input
                                                    name="contactDesignation"
                                                    value={formData.contactDesignation}
                                                    onChange={handleInputChange}
                                                    placeholder="e.g. Managing Director"
                                                    className="h-9 border-slate-200 rounded-lg text-[11px] font-bold focus:border-[#108c2d] bg-white"
                                                />
                                            </div>

                                            <div className="space-y-0.5">
                                                <Label className="text-[10px] font-bold text-slate-700">Email Address <span className="text-red-500">*</span></Label>
                                                <Input
                                                    name="contactEmail"
                                                    type="email"
                                                    value={formData.contactEmail}
                                                    onChange={handleInputChange}
                                                    placeholder="representative@company.com"
                                                    className="h-9 border-slate-200 rounded-lg text-[11px] font-bold focus:border-[#108c2d] bg-white"
                                                />
                                            </div>

                                            <div className="space-y-0.5">
                                                <Label className="text-[10px] font-bold text-slate-700">Mobile No. <span className="text-red-500">*</span></Label>
                                                <Input
                                                    name="contactMobile"
                                                    value={formData.contactMobile}
                                                    onChange={handleInputChange}
                                                    placeholder="Mobile/WhatsApp Number"
                                                    className="h-9 border-slate-200 rounded-lg text-[11px] font-bold focus:border-[#108c2d] bg-white"
                                                />
                                            </div>

                                            <div className="space-y-0.5">
                                                <Label className="text-[10px] font-bold text-slate-700">Alternate No. (Optional)</Label>
                                                <Input
                                                    name="contactAlternateNo"
                                                    value={formData.contactAlternateNo}
                                                    onChange={handleInputChange}
                                                    placeholder="Secondary/Office Number"
                                                    className="h-9 border-slate-200 rounded-lg text-[11px] font-bold focus:border-[#108c2d] bg-white"
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {currentStep === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, x: -8 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 8 }}
                                        className="space-y-2.5"
                                    >
                                        <div className="flex items-center gap-2 pb-1.5 border-b border-slate-100">
                                            <div className="w-7 h-7 bg-[#eef8f0] text-[#108c2d] rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Landmark size={14} />
                                            </div>
                                            <div>
                                                <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-tight leading-none">Stall & Payout Details</h3>
                                                <p className="text-[8px] text-slate-400 font-bold uppercase mt-0.5 leading-none">Preferences and Bank Account details</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1.5">
                                            <div className="space-y-0.5">
                                                <Label className="text-[10px] font-bold text-slate-700">Stall Category</Label>
                                                <Select value={formData.stallCategory} onValueChange={(v) => handleSelectChange('stallCategory', v)}>
                                                    <SelectTrigger className="h-9 border-slate-200 rounded-lg text-[11px] font-bold focus:border-[#108c2d] bg-white text-left shadow-none">
                                                        <SelectValue placeholder="Choose Category" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-white">
                                                        {['Shell Scheme', 'Raw Space', 'Premium Pavilion'].map(c => (
                                                            <SelectItem key={c} value={c} className="text-xs font-semibold">{c}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-0.5">
                                                <Label className="text-[10px] font-bold text-slate-700">Stall Scheme</Label>
                                                <Select value={formData.stallScheme} onValueChange={(v) => handleSelectChange('stallScheme', v)}>
                                                    <SelectTrigger className="h-9 border-slate-200 rounded-lg text-[11px] font-bold focus:border-[#108c2d] bg-white text-left shadow-none">
                                                        <SelectValue placeholder="Choose Scheme" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-white">
                                                        {['Normal', 'Corner (1 Side Open)', '2 Side Open', '3 Side Open'].map(sc => (
                                                            <SelectItem key={sc} value={sc} className="text-xs font-semibold">{sc}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-0.5">
                                                <Label className="text-[10px] font-bold text-slate-700">Stall Size (Sqm)</Label>
                                                <Input
                                                    name="stallSize"
                                                    value={formData.stallSize}
                                                    onChange={handleInputChange}
                                                    placeholder="e.g. 9, 12, 18, 36"
                                                    className="h-9 border-slate-200 rounded-lg text-[11px] font-bold focus:border-[#108c2d] bg-white"
                                                />
                                            </div>

                                            <div className="space-y-0.5">
                                                <Label className="text-[10px] font-bold text-slate-700">Preferred Stall No</Label>
                                                <Input
                                                    name="preferredStallNo"
                                                    value={formData.preferredStallNo}
                                                    onChange={handleInputChange}
                                                    placeholder="Specify stall number if any"
                                                    className="h-9 border-slate-200 rounded-lg text-[11px] font-bold focus:border-[#108c2d] bg-white"
                                                />
                                            </div>

                                            {/* Payout & Banking Header */}
                                            <div className="col-span-full pt-1.5 border-t border-slate-100">
                                                <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-wider mb-0.5">Payout & Banking Details <span className="text-red-500">*</span></h4>
                                            </div>

                                            <div className="space-y-0.5">
                                                <Label className="text-[10px] font-bold text-slate-700">Bank Institution Name <span className="text-red-500">*</span></Label>
                                                <Input
                                                    name="bankName"
                                                    value={formData.bankName}
                                                    onChange={handleInputChange}
                                                    placeholder="e.g. State Bank of India"
                                                    className="h-9 border-slate-205 rounded-lg text-[11px] font-bold focus:border-[#108c2d] bg-white"
                                                />
                                            </div>

                                            <div className="space-y-0.5">
                                                <Label className="text-[10px] font-bold text-slate-700">Account Holder Name <span className="text-red-500">*</span></Label>
                                                <Input
                                                    name="accountHolder"
                                                    value={formData.accountHolder}
                                                    onChange={handleInputChange}
                                                    placeholder="Legal Beneficiary Name"
                                                    className="h-9 border-slate-200 rounded-lg text-[11px] font-bold focus:border-[#108c2d] bg-white"
                                                />
                                            </div>

                                            <div className="space-y-0.5">
                                                <Label className="text-[10px] font-bold text-slate-700">Account Number <span className="text-red-500">*</span></Label>
                                                <Input
                                                    name="accountNumber"
                                                    value={formData.accountNumber}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter bank account number"
                                                    className="h-9 border-slate-200 rounded-lg text-[11px] font-bold focus:border-[#108c2d] bg-white"
                                                />
                                            </div>

                                            <div className="space-y-0.5">
                                                <Label className="text-[10px] font-bold text-slate-700">IFSC / SWIFT Code <span className="text-red-500">*</span></Label>
                                                <Input
                                                    name="ifscCode"
                                                    value={formData.ifscCode}
                                                    onChange={handleInputChange}
                                                    placeholder="e.g. SBIN0001234"
                                                    className="h-9 border-slate-200 rounded-lg text-[11px] font-bold focus:border-[#108c2d] bg-white uppercase"
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {currentStep === 4 && (
                                    <motion.div
                                        key="step4"
                                        initial={{ opacity: 0, x: -8 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 8 }}
                                        className="space-y-4"
                                    >
                                        <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                                            <div className="w-8 h-8 bg-[#eef8f0] text-[#108c2d] rounded-xl flex items-center justify-center flex-shrink-0">
                                                <FileText size={16} />
                                            </div>
                                            <div>
                                                <h3 className="text-xs font-black text-slate-800 uppercase tracking-tight">Compliance Documents</h3>
                                                <p className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">Corporate verification checklist</p>
                                            </div>
                                        </div>

                                        <div className="space-y-2.5">
                                            {[
                                                { label: 'Corporate PAN Card', field: 'panCardFrontUrl', prefilled: formData.panCardFrontUrl },
                                                { label: 'GSTIN / Tax Certificate', field: 'gstCertificateUrl', prefilled: formData.gstCertificateUrl },
                                                { label: 'Aadhaar Card (Authorized Signatory)', field: 'aadhaarCardFrontUrl', prefilled: formData.aadhaarCardFrontUrl },
                                                { label: 'Bank Account Cancelled Cheque', field: 'cancelledChequeUrl', prefilled: formData.cancelledChequeUrl }
                                            ].map((doc, idx) => (
                                                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-150 rounded-xl gap-3">
                                                    <div>
                                                        <span className="text-[11px] font-bold text-slate-800">{doc.label}</span>
                                                        <span className="block text-[8px] text-[#108c2d] font-bold uppercase tracking-wider">Required for B2B portal</span>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        {doc.prefilled ? (
                                                            <div className="flex items-center gap-1 bg-[#eef8f0] border border-[#d2edd9] py-1 px-2 rounded-lg text-[9px] text-[#108c2d] font-bold">
                                                                <span>Attached</span>
                                                                <Eye size={10} className="cursor-pointer" onClick={() => window.open(doc.prefilled, '_blank')} />
                                                            </div>
                                                        ) : (
                                                            <span className="text-[9px] text-slate-400 italic">No file</span>
                                                        )}

                                                        <button type="button" className="h-7 px-2.5 rounded-lg border border-slate-200 hover:border-[#108c2d] hover:bg-[#eef8f0] text-slate-700 hover:text-[#108c2d] font-bold text-[10px] flex items-center gap-1 transition-all bg-white">
                                                            Upload
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {currentStep === 5 && (
                                    <motion.div
                                        key="step5"
                                        initial={{ opacity: 0, x: -8 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 8 }}
                                        className="space-y-4"
                                    >
                                        <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                                            <div className="w-8 h-8 bg-[#eef8f0] text-[#108c2d] rounded-xl flex items-center justify-center flex-shrink-0">
                                                <Eye size={16} />
                                            </div>
                                            <div>
                                                <h3 className="text-xs font-black text-slate-800 uppercase tracking-tight">Review & Submit</h3>
                                                <p className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">Please review your application summary</p>
                                            </div>
                                        </div>

                                        <div className="space-y-3.5">
                                            <div className="p-3 border border-slate-200 rounded-xl space-y-2 bg-slate-50/50">
                                                <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-wider pb-1 border-b border-slate-200 flex justify-between">
                                                    Business Profile
                                                    <span className="text-[#108c2d] cursor-pointer hover:underline text-[9px] font-bold" onClick={() => setCurrentStep(1)}>Edit</span>
                                                </h4>
                                                <div className="grid grid-cols-2 gap-y-1 text-[11px]">
                                                    <div><span className="text-slate-400 font-medium">Company Name:</span> <span className="font-bold text-slate-700">{formData.brandName}</span></div>
                                                    <div><span className="text-slate-400 font-medium">Business Type:</span> <span className="font-bold text-slate-700">{formData.businessType}</span></div>
                                                    <div><span className="text-slate-400 font-medium">Country:</span> <span className="font-bold text-slate-700">{formData.country}</span></div>
                                                    <div><span className="text-slate-400 font-medium">City:</span> <span className="font-bold text-slate-700">{formData.city}</span></div>
                                                </div>
                                            </div>

                                            <div className="p-3 border border-slate-200 rounded-xl space-y-2 bg-slate-50/50">
                                                <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-wider pb-1 border-b border-slate-200 flex justify-between">
                                                    Payout & Stall Details
                                                    <span className="text-[#108c2d] cursor-pointer hover:underline text-[9px] font-bold" onClick={() => setCurrentStep(3)}>Edit</span>
                                                </h4>
                                                <div className="grid grid-cols-2 gap-y-1 text-[11px]">
                                                    <div><span className="text-slate-400 font-medium">Stall Size:</span> <span className="font-bold text-slate-700">{formData.stallSize} Sqm</span></div>
                                                    <div><span className="text-slate-400 font-medium">Bank Name:</span> <span className="font-bold text-slate-700">{formData.bankName}</span></div>
                                                    <div><span className="text-slate-400 font-medium">Account Number:</span> <span className="font-bold text-slate-700">•••• {formData.accountNumber.slice(-4)}</span></div>
                                                    <div><span className="text-slate-400 font-medium">Plan Selected:</span> <span className="font-bold text-[#108c2d] uppercase">{selectedPlan} Plan</span></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-2 pt-2">
                                            <input type="checkbox" id="terms-agree" className="mt-0.5 w-3.5 h-3.5 accent-[#108c2d] rounded" required />
                                            <Label htmlFor="terms-agree" className="text-[10px] text-slate-500 leading-tight font-semibold cursor-pointer">
                                                I agree all details submitted are authentic and comply with IHWE 2026 guidelines.
                                            </Label>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Form Buttons Footer - Plain white background, styled button */}
                        <div className="px-5 py-4 bg-white flex items-center justify-between flex-shrink-0">
                            <div>
                                {currentStep > 1 && (
                                    <button
                                        type="button"
                                        onClick={handlePrevStep}
                                        className="h-9 px-4.5 rounded-lg border border-slate-200 text-slate-600 font-bold text-xs flex items-center gap-1 hover:bg-slate-50 transition-all bg-white"
                                    >
                                        <ArrowLeft size={11} />
                                        Back
                                    </button>
                                )}
                            </div>

                            {currentStep < 5 ? (
                                <button
                                    type="button"
                                    onClick={handleNextStep}
                                    className="h-10 px-6 rounded-xl bg-[#108c2d] hover:bg-[#0b651b] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all duration-200 active:scale-95"
                                >
                                    Save & Continue
                                    <ArrowRight size={12} className="mt-0.5" />
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="h-10 px-6 rounded-xl bg-[#108c2d] hover:bg-[#0b651b] text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm disabled:opacity-50 duration-200 active:scale-95"
                                >
                                    {loading ? "Registering..." : "Submit Application"}
                                    <Check size={12} className="stroke-[3px]" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Footer text outside the card, aligned bottom-left */}
                    <div className="flex items-center gap-1.5 text-[#108c2d] font-semibold text-[10.5px] pl-1.5 py-0.5 flex-shrink-0">
                        <ShieldCheck size={13} className="stroke-[2.5px] text-[#108c2d]" />
                        <span>Your information is secure with us. We never share your data with anyone.</span>
                    </div>
                </div>

                {/* Right Column: Premium Verified Meeting Packages Sidebar */}
                <div className="lg:col-span-4 xl:col-span-4 flex flex-col min-h-0">
                    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col justify-between flex-1 min-h-0 p-3">

                        {/* Upper Section containing feature description + packages grid */}
                        <div className="space-y-3.5 flex-1 overflow-y-auto custom-scrollbar">

                            {/* Premium feature information card - Enhanced Fonts */}
                            <div className="bg-[#f0faf2] p-3 rounded-xl border border-[#e4f6e8] shadow-sm flex items-start gap-2.5">
                                <div className="w-10 h-10 bg-[#108c2d] text-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                        <span className="text-[13px] font-black text-slate-850 leading-tight">Get Verified Meetings with Verified Buyers</span>
                                        <span className="bg-[#fff3cd] text-[#856404] text-[8.5px] font-black px-2 py-0.5 rounded-full border border-[#ffeeba] flex items-center gap-0.5 uppercase tracking-wide">
                                            <Sparkles size={8} className="fill-current" /> Premium Feature
                                        </span>
                                    </div>
                                    <p className="text-[10.5px] text-slate-500 leading-relaxed font-semibold">
                                        Increase your business opportunities by connecting with quality, pre-verified buyers.
                                    </p>
                                </div>
                            </div>

                            {/* Title Block */}
                            <div>
                                <h3 className="text-[12.5px] font-black text-slate-850 uppercase tracking-wider">Choose Your Meeting Package</h3>
                            </div>

                            {/* 3-Column Plan Grid aligned perfectly side by side */}
                            <div className="grid grid-cols-3 gap-1.5">
                                {[
                                    {
                                        name: 'Starter',
                                        meetings: '5',
                                        price: '9,999',
                                        features: [
                                            '15 Pre-scheduled Meetings',
                                            'Verified Buyer Access',
                                            'Meeting Scheduler Access'
                                        ]
                                    },
                                    {
                                        name: 'Growth',
                                        meetings: '15',
                                        price: '24,999',
                                        popular: true,
                                        features: [
                                            '15 Pre-scheduled Meetings',
                                            'Verified Buyer Access',
                                            'Priority Meeting Scheduler',
                                            'Meeting Analytics Report'
                                        ]
                                    },
                                    {
                                        name: 'Pro',
                                        meetings: '30',
                                        price: '44,999',
                                        features: [
                                            '30 Pre-scheduled Meetings',
                                            'Verified Buyer Access',
                                            'Priority Meeting Scheduler',
                                            'Meeting Analytics Report',
                                            'Featured in Buyer List'
                                        ]
                                    }
                                ].map((plan) => {
                                    const isSelected = selectedPlan === plan.name;
                                    return (
                                        <div
                                            key={plan.name}
                                            onClick={() => setSelectedPlan(plan.name)}
                                            className={`p-2.5 rounded-xl border flex flex-col justify-between cursor-pointer transition-all duration-300 relative ${isSelected
                                                ? 'border-[#108c2d] bg-[#f0faf2]/25 shadow-sm ring-1 ring-[#108c2d]'
                                                : 'border-slate-200 hover:border-slate-350 hover:bg-slate-50/30'
                                                }`}
                                        >
                                            {plan.popular && (
                                                <span className="absolute top-0 left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#fff3cd] text-[#856404] text-[8px] font-black px-1.5 py-0.5 rounded-full border border-[#ffeeba] uppercase tracking-wide whitespace-nowrap z-20">
                                                    ★ Most Popular
                                                </span>
                                            )}

                                            <div className="text-center space-y-1">
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">{plan.name}</span>

                                                <div className="flex flex-col items-center justify-center pt-1">
                                                    <span className="text-2xl font-black text-[#108c2d] leading-none">{plan.meetings}</span>
                                                    <span className="text-[8px] text-slate-500 font-bold uppercase mt-0.5">Verified Meetings</span>
                                                </div>

                                                <div className="pt-1.5 border-t border-slate-100">
                                                    <span className="text-[11px] font-black text-slate-800 block">₹ {plan.price}</span>
                                                    <span className="text-[8px] text-slate-400 font-medium block leading-none">+ GST</span>
                                                </div>
                                            </div>

                                            {/* Features List */}
                                            <div className="mt-3 pt-3 border-t border-slate-100 space-y-2 flex-1">
                                                {plan.features.map((feat, fidx) => (
                                                    <div key={fidx} className="flex items-start gap-1 text-[8.5px] text-slate-600 font-semibold leading-tight">
                                                        <Check size={9} className="text-[#108c2d] stroke-[4px] mt-0.5 flex-shrink-0" />
                                                        <span>{feat}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Button status placeholder */}
                                            <button
                                                type="button"
                                                className={`w-full h-7 rounded-lg font-bold text-[10px] mt-3.5 flex items-center justify-center transition-all ${isSelected
                                                    ? 'bg-[#108c2d] text-white shadow-sm'
                                                    : 'bg-white border border-slate-200 hover:border-slate-350 text-slate-700 font-bold'
                                                    }`}
                                            >
                                                {isSelected ? 'Selected' : 'Select Plan'}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>

                        </div>

                        {/* How it works info box - Fixed footer size */}
                        <div className="pt-2.5 border-t border-slate-100 flex-shrink-0">
                            <div className="bg-[#f0f4f8] p-3 rounded-xl border border-[#e2edf9] space-y-2">
                                <div className="flex items-center gap-1.5 text-[10.5px] font-black text-slate-800 uppercase tracking-wide">
                                    <span className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center text-white text-[9.5px] font-black">i</span>
                                    <span>How it works?</span>
                                </div>
                                <div className="flex items-center justify-between text-[9.5px] font-bold text-slate-600 gap-1.5 leading-tight text-center">
                                    <div className="flex-1">Choose a package</div>
                                    <div className="text-slate-400 font-bold text-[9px]">➔</div>
                                    <div className="flex-1">Get matched with verified buyers</div>
                                    <div className="text-slate-400 font-bold text-[9px]">➔</div>
                                    <div className="flex-1">Schedule & conduct meetings</div>
                                </div>
                            </div>
                        </div>

                        {/* Footer details - Fixed size */}
                        <div className="text-[10px] text-slate-800 font-semibold leading-relaxed pt-2.5 mt-2.5 border-t border-slate-100 flex justify-between items-center flex-shrink-0">
                            <span>You can upgrade or purchase more meetings later from your dashboard.</span>
                            <span className="text-[#108c2d] font-black cursor-pointer whitespace-nowrap hover:underline ml-2 flex items-center gap-0.5 text-[10.5px]">
                                View full details <ArrowRight size={10} className="mt-0.5" />
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
