
// import { useState, useEffect, useMemo } from "react";
// import { Link } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//     CheckCircle,
//     Send,
//     ShieldCheck,
//     Loader2,
//     User,
//     Phone,
//     Briefcase,
//     Target,
//     Globe,
//     Calendar,
//     CreditCard,
//     Smartphone,
//     AtSign,
//     Shield
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import HeroBg from "@/assets/buyer.jpg";
// import { buyerRegistrationApi, heroBackgroundApi, SERVER_URL, crmApi, otpApi } from "@/lib/api";

// const BuyerRegistration = () => {
//     const [config, setConfig] = useState<any>(null);
//     const [submitted, setSubmitted] = useState(false);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [heroData, setHeroData] = useState<any>(null);
//     const [countries, setCountries] = useState<any[]>([]);
//     const [states, setStates] = useState<any[]>([]);
//     const [cities, setCities] = useState<any[]>([]);

//     const [emailOtpSent, setEmailOtpSent] = useState(false);
//     const [emailOtpVerified, setEmailOtpVerified] = useState(false);
//     const [emailOtpValue, setEmailOtpValue] = useState("");
//     const [mobileOtpSent, setMobileOtpSent] = useState(false);
//     const [mobileOtpVerified, setMobileOtpVerified] = useState(false);
//     const [mobileOtpValue, setMobileOtpValue] = useState("");
//     const [isVerifying, setIsVerifying] = useState({ email: false, mobile: false });
//     const [errors, setErrors] = useState<Record<string, string>>({});
//     const [loadingLocations, setLoadingLocations] = useState({ states: false, cities: false });

//     const initialFormState = {
//         fullName: "",
//         designation: "",
//         companyName: "",
//         businessType: "",
//         mobileNumber: "",
//         alternateNumber: "",
//         emailAddress: "",
//         website: "",
//         pinCode: "",
//         country: "India",
//         stateProvince: "",
//         city: "",
//         registeredAddress: "",
//         yearsInOperation: "",
//         annualTurnover: "",
//         buyingFrequency: "",
//         estimatedAnnualPurchaseValue: "",
//         keyProductsServices: "",
//         primaryProductInterest: "",
//         secondaryProductCategories: "",
//         specificProductRequirements: "",
//         estimatedPurchaseVolume: "",
//         budgetRange: "",
//         preferredSupplierRegion: [] as string[],
//         preferredState: "",
//         preferredSupplierType: [] as string[],
//         preferredCompanySize: "",
//         purchaseTimeline: "",
//         roleInPurchaseDecision: "",
//         pricingPreference: "Mid-Range",
//         matchmakingInterest: "Yes",
//         logisticsRequirements: "",
//         preferredPaymentMethods: [] as string[],
//         companyProfile: null as File | null,
//         requiredCertifications: [] as string[],
//         preferredMeetingDate: "",
//         preferredTimeSlot: "",
//         requirePreScheduledB2B: "Yes",
//         meetingPriorityLevel: "Medium",
//         remarks: "",
//         registrationCategory: "",
//         registrationFee: "₹0",
//         paymentMode: "Online/Razorpay",
//         transactionId: "",
//         paymentProof: null as File | null,
//         consentTerms: false,
//         consentPaymentValid: false,
//         consentMatchedExhibitors: false
//     };

//     const [formData, setFormData] = useState(initialFormState);

//     const [showMembershipOptions, setShowMembershipOptions] = useState(false);
//     const [showTermsModal, setShowTermsModal] = useState(false);
//     const [tempSelectedPackage, setTempSelectedPackage] = useState<any>(null);

//     const membershipPackages = useMemo(() => config?.packages?.filter((p: any) => p.category === 'Membership') || [], [config]);
//     const passPackages = useMemo(() => config?.packages?.filter((p: any) => p.category === 'Pass') || [], [config]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const [hData, cRes, configRes] = await Promise.all([
//                     heroBackgroundApi.getByPage("Registration / Buyer Registration"),
//                     crmApi.getCountries(),
//                     buyerRegistrationApi.getConfig()
//                 ]);
//                 if (hData) setHeroData(hData);
//                 if (cRes) setCountries(cRes);
//                 if (configRes?.success) {
//                     const cfg = configRes.data;
//                     setConfig(cfg);

//                     if (cfg.packages?.length > 0) {
//                         setFormData(prev => ({
//                             ...prev,
//                             registrationCategory: cfg.packages[0].name,
//                             registrationFee: `₹${cfg.packages[0].price}`
//                         }));
//                     }
//                 }
//             } catch (err) {
//                 console.error("Error fetching initial data:", err);
//             }
//         };
//         fetchData();
//     }, []);

//     // Cascade State from Country selection
//     useEffect(() => {
//         const fetchStates = async () => {
//             if (!formData.country) {
//                 setStates([]);
//                 return;
//             }
//             const selectedCountry = countries.find(c => c.name === formData.country);
//             if (selectedCountry) {
//                 setLoadingLocations(prev => ({ ...prev, states: true }));
//                 try {
//                     const data = await crmApi.getStates(selectedCountry.countryCode);
//                     setStates(data);
//                 } catch (err) {
//                     console.error("Error fetching states:", err);
//                 } finally {
//                     setLoadingLocations(prev => ({ ...prev, states: false }));
//                 }
//             }
//         };
//         fetchStates();
//     }, [formData.country, countries]);

//     // Cascade City from State selection
//     useEffect(() => {
//         const fetchCities = async () => {
//             if (!formData.stateProvince) {
//                 setCities([]);
//                 return;
//             }
//             const selectedState = states.find(s => s.name === formData.stateProvince);
//             if (selectedState) {
//                 setLoadingLocations(prev => ({ ...prev, cities: true }));
//                 try {
//                     const data = await crmApi.getCities(selectedState.stateCode);
//                     setCities(data);
//                 } catch (err) {
//                     console.error("Error fetching cities:", err);
//                 } finally {
//                     setLoadingLocations(prev => ({ ...prev, cities: false }));
//                 }
//             }
//         };
//         fetchCities();
//     }, [formData.stateProvince, states]);

//     const validateField = (name: string, value: any) => {
//         let error = "";
//         const requiredFields = [
//             'fullName', 'designation', 'companyName', 'businessType',
//             'emailAddress', 'mobileNumber', 'registeredAddress', 'pinCode',
//             'stateProvince', 'city', 'yearsInOperation', 'annualTurnover',
//             'keyProductsServices', 'primaryProductInterest', 'buyingFrequency',
//             'estimatedAnnualPurchaseValue', 'purchaseTimeline', 'roleInPurchaseDecision',
//             'matchmakingInterest', 'preferredMeetingDate', 'preferredTimeSlot',
//             'registrationCategory'
//         ];

//         const lettersOnlyFields = ['fullName', 'designation', 'companyName', 'specificProductRequirements'];

//         if (requiredFields.includes(name) && !value) {
//             error = "This field is required";
//         } else if (lettersOnlyFields.includes(name) && value && !/^[A-Za-z\s]+$/.test(value)) {
//             error = "Only letters and spaces allowed";
//         } else if (name === 'emailAddress' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
//             error = "Invalid email format";
//         } else if ((name === 'mobileNumber' || name === 'alternateNumber') && value && !/^\d{7,15}$/.test(value)) {
//             error = "Invalid mobile number (7-15 digits)";
//         } else if (name === 'pinCode' && value && !/^\d{4,10}$/.test(value)) {
//             error = "Invalid pin code";
//         }

//         setErrors(prev => ({ ...prev, [name]: error }));
//         return error === "";
//     };

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const { name, value } = e.target;

//         // Restriction: Numbers only for specific fields
//         if (['mobileNumber', 'alternateNumber', 'pinCode', 'estimatedPurchaseVolume'].includes(name)) {
//             const digitsOnly = value.replace(/\D/g, '');
//             setFormData(prev => ({ ...prev, [name]: digitsOnly }));
//             validateField(name, digitsOnly);
//         } else if (['fullName', 'designation', 'companyName', 'specificProductRequirements'].includes(name)) {
//             // Restriction: Letters and spaces only for Full Name, Designation, Company Name, and Specific Product Requirements
//             const lettersOnly = value.replace(/[^A-Za-z\s]/g, '');
//             setFormData(prev => ({ ...prev, [name]: lettersOnly }));
//             validateField(name, lettersOnly);
//         } else {
//             setFormData(prev => ({ ...prev, [name]: value }));
//             validateField(name, value);
//         }
//     };

//     const handleSelectChange = (name: string, value: string) => {
//         setErrors(prev => ({ ...prev, [name]: "" })); // Clear error on change

//         if (name === 'country') {
//             setFormData(prev => ({ ...prev, country: value, stateProvince: '', city: '' }));
//             return;
//         }
//         if (name === 'stateProvince') {
//             setFormData(prev => ({ ...prev, stateProvince: value, city: '' }));
//             return;
//         }
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     const validateForm = () => {
//         let isValid = true;
//         const newErrors: Record<string, string> = {};

//         // 1. Core Fields
//         const fieldsToValidate = [
//             'fullName', 'designation', 'companyName', 'businessType',
//             'emailAddress', 'mobileNumber', 'registeredAddress', 'pinCode',
//             'stateProvince', 'city', 'yearsInOperation', 'annualTurnover',
//             'keyProductsServices', 'primaryProductInterest', 'buyingFrequency',
//             'estimatedAnnualPurchaseValue', 'purchaseTimeline', 'roleInPurchaseDecision',
//             'matchmakingInterest', 'preferredMeetingDate', 'preferredTimeSlot',
//             'registrationCategory'
//         ];

//         fieldsToValidate.forEach(field => {
//             if (!formData[field as keyof typeof formData]) {
//                 newErrors[field] = "This field is required";
//                 isValid = false;
//             }
//         });

//         // 2. Format Validations
//         if (formData.emailAddress && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress)) {
//             newErrors.emailAddress = "Invalid email format";
//             isValid = false;
//         }

//         if (formData.mobileNumber && !/^\d{10,15}$/.test(formData.mobileNumber)) {
//             newErrors.mobileNumber = "Invalid mobile number (Min 10 digits)";
//             isValid = false;
//         }

//         // 3. Multi-selects
//         if (formData.preferredSupplierRegion.length === 0) {
//             newErrors.preferredSupplierRegion = "Select at least one region";
//             isValid = false;
//         }
//         if (formData.preferredSupplierType.length === 0) {
//             newErrors.preferredSupplierType = "Select at least one type";
//             isValid = false;
//         }

//         // 5. OTP Verification
//         if (!emailOtpVerified) {
//             newErrors.emailAddress = "Please verify your email via OTP";
//             isValid = false;
//         }
//         if (!mobileOtpVerified) {
//             newErrors.mobileNumber = "Please verify your mobile via OTP";
//             isValid = false;
//         }

//         setErrors(newErrors);
//         return isValid;
//     };

//     const handleCheckboxChange = (name: string, value: string, checked: boolean) => {
//         setFormData(prev => {
//             const list = prev[name as keyof typeof prev] as string[];
//             return { ...prev, [name]: checked ? [...list, value] : list.filter(item => item !== value) };
//         });
//     };

//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0] || null;
//         setFormData(prev => ({ ...prev, paymentProof: file }));
//     };

//     const requestOtp = async (type: 'email' | 'mobile') => {
//         const identifier = type === 'email' ? formData.emailAddress : formData.mobileNumber;
//         if (!identifier) { alert(`Please enter a valid ${type} first.`); return; }
//         setIsVerifying(prev => ({ ...prev, [type]: true }));
//         try {
//             const res = await otpApi.request(identifier, type === 'email' ? 'email' : 'phone', formData.fullName);
//             if (res.success) {
//                 alert(`OTP sent to your ${type}.`);
//                 type === 'email' ? setEmailOtpSent(true) : setMobileOtpSent(true);
//             } else alert(res.message);
//         } catch (err) { alert("Connection error."); } finally { setIsVerifying(prev => ({ ...prev, [type]: false })); }
//     };

//     const verifyOtp = async (type: 'email' | 'mobile') => {
//         const identifier = type === 'email' ? formData.emailAddress : formData.mobileNumber;
//         const otp = type === 'email' ? emailOtpValue : mobileOtpValue;
//         if (!otp) { alert("Please enter the OTP."); return; }
//         setIsVerifying(prev => ({ ...prev, [type]: true }));
//         try {
//             const res = await otpApi.verify(identifier, otp, type === 'email' ? 'email' : 'phone');
//             if (res.success) {
//                 alert(`${type.toUpperCase()} verified successfully!`);
//                 type === 'email' ? setEmailOtpVerified(true) : setMobileOtpVerified(true);
//             } else alert(res.message);
//         } catch (err) { alert("Verification failed."); } finally { setIsVerifying(prev => ({ ...prev, [type]: false })); }
//     };



//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         const isValid = validateForm();

//         if (!isValid) {
//             alert("Please correct the errors in the form before submitting.");
//             const firstErrorField = Object.keys(errors)[0];
//             const element = document.getElementsByName(firstErrorField)[0];
//             if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
//             return;
//         }

//         if (formData.preferredSupplierRegion.length === 0 || formData.preferredSupplierType.length === 0) {
//             alert("Please select at least one Preferred Supplier Region and Type.");
//             return;
//         }

//         if (!emailOtpVerified || !mobileOtpVerified) {
//             alert("Please verify your Email and Mobile via OTP before submitting.");
//             return;
//         }

//         submitFinal();
//     };

//     const submitFinal = async () => {
//         setIsSubmitting(true);
//         try {
//             const res = await buyerRegistrationApi.submit({
//                 ...formData,
//                 paymentStatus: "N/A",
//                 registrationFee: "0",
//                 consentTerms: true,
//                 consentPaymentValid: true,
//                 consentMatchedExhibitors: true
//             });
//             if (res.success) { setSubmitted(true); window.scrollTo({ top: 0, behavior: "smooth" }); } else alert(res.message);
//         } catch (error) { alert("Submission error."); } finally { setIsSubmitting(false); }
//     };

//     const handleReset = () => {
//         setFormData({
//             ...initialFormState,
//             registrationCategory: config?.packages?.[0]?.name || "",
//             registrationFee: config?.packages?.[0]?.price ? `₹${config.packages[0].price}` : "₹0"
//         });
//         setFormData(prev => ({ ...prev, preferredState: "", secondaryProductCategories: "" }));
//         setSubmitted(false);
//         setEmailOtpSent(false);
//         setEmailOtpVerified(false);
//         setEmailOtpValue("");
//         setMobileOtpSent(false);
//         setMobileOtpVerified(false);
//         setMobileOtpValue("");
//         setShowMembershipOptions(false);
//         setTempSelectedPackage(null);
//         window.scrollTo({ top: 0, behavior: "smooth" });
//     };

//     // Consistent styling classes
//     const inputClasses = "w-full h-8 px-3 py-2 rounded-[2px] border border-slate-400 bg-white text-left text-[12px] font-medium text-slate-900 outline-none shadow-none transition-all ring-offset-background focus:border-[#23471d] focus:ring-[#23471d]/10 placeholder:text-slate-400 font-sans";
//     const labelClasses = "text-[12px] font-semibold text-slate-900 mb-0.5 block text-left font-sans";
//     const sectionTitleClasses = "text-[13px] font-black text-[#23471d] pb-1 border-b border-emerald-500/20 flex items-center gap-1.5 mb-3 uppercase tracking-tight font-sans";
//     const baseTextClasses = "font-sans";
//     const selectContentClasses = "bg-white font-sans text-[12px]";
//     const checkboxLabelClasses = "text-[12px] font-medium text-slate-700 font-sans";
//     const buttonTextClasses = "text-[11px] font-bold uppercase tracking-wider font-sans";

//     const handlePackageSelection = (pkg: any) => {
//         setTempSelectedPackage(pkg);
//         setShowTermsModal(true);
//     };

//     const confirmPackage = () => {
//         if (tempSelectedPackage) {
//             setFormData(prev => ({
//                 ...prev,
//                 registrationCategory: tempSelectedPackage.name,
//                 registrationFee: "0"
//             }));
//         }
//         setShowTermsModal(false);
//     };

//     const ErrorDisplay = ({ name }: { name: string }) => (
//         errors[name] ? <span className="text-red-500 text-[10px] mt-0.5 block h-3 font-medium animate-in fade-in slide-in-from-top-1">{errors[name]}</span> : <div className="h-3" />
//     );

//     return (
//         <div className="min-h-screen bg-[#FDFDFD] font-sans">
//             <section className="relative h-[140px] flex items-center justify-center bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url(${heroData?.backgroundImage ? `${SERVER_URL}${heroData.backgroundImage}` : HeroBg})` }}>
//                 <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20" />
//                 <div className="container mx-auto px-4 text-center text-white relative z-10">
//                     <p className="text-[9px] uppercase tracking-[0.5em] mb-1 text-emerald-400 font-bold font-sans">IHWE 2026 - Global Connect</p>
//                     <h1 className="text-2xl md:text-3xl font-serif font-bold mb-1 italic">Buyer Registration</h1>
//                     <div className="w-12 h-0.5 bg-emerald-500 mx-auto rounded-full" />
//                 </div>
//             </section>

//             <section className="py-4 relative bg-[#F8FAFC]">
//                 <div className="container mx-auto px-4 max-w-[1400px]">
//                     <AnimatePresence mode="wait">
//                         {submitted ? (
//                             <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white border border-slate-200 p-12 flex flex-col items-center text-center space-y-5 shadow-2xl rounded-xl">
//                                 <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500"><CheckCircle size={48} strokeWidth={1.5} /></div>
//                                 <div className="space-y-2">
//                                     <h2 className="text-2xl font-bold text-slate-900 font-serif">Registration Successful!</h2>
//                                     <p className="text-slate-500 text-sm max-w-lg mx-auto leading-relaxed font-sans">Thank you for choosing IHWE 2026. Your registration details and payment confirmation have been emailed to you.</p>
//                                 </div>
//                                 <div className="flex flex-wrap gap-4 justify-center">
//                                     <Button onClick={handleReset} className={`rounded-full px-8 h-10 border-[#23471d] text-[#23471d] hover:bg-emerald-50 ${buttonTextClasses} shadow-sm`} variant="outline">Register Another</Button>
//                                     <Link to="/"><Button className={`rounded-full px-8 h-10 bg-[#23471d] hover:bg-[#1a3516] ${buttonTextClasses} shadow-xl`}>Return Home</Button></Link>
//                                 </div>
//                             </motion.div>
//                         ) : (
//                             <motion.div key="form" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-slate-200 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-lg overflow-hidden">
//                                 <div className="bg-[#23471d] px-5 py-3 text-white flex justify-between items-center">
//                                     <div>
//                                         <h2 className="text-base font-bold uppercase tracking-wider font-sans">Buyer-Seller Meet</h2>
//                                         <p className="text-[9px] text-emerald-300 uppercase tracking-[0.3em] font-medium font-sans">International Health & Wellness Expo 2026</p>
//                                     </div>
//                                     <ShieldCheck className="text-emerald-400 opacity-50" size={24} />
//                                 </div>
//                                 <form onSubmit={handleSubmit} className="p-5 space-y-5">

//                                     {/* 1. Personal & Company Information */}
//                                     <div className="space-y-2">
//                                         <h3 className={sectionTitleClasses}> Personal & Company Information</h3>
//                                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 gap-y-4 gap-x-5">
//                                             <div><Label className={labelClasses}>Full Name *</Label><Input required name="fullName" value={formData.fullName} onChange={handleChange} placeholder="As per ID Proof" className={`${inputClasses} ${errors.fullName ? 'border-red-400' : ''}`} /><ErrorDisplay name="fullName" /></div>
//                                             <div><Label className={labelClasses}>Designation *</Label><Input required name="designation" value={formData.designation} onChange={handleChange} placeholder="Current Position" className={`${inputClasses} ${errors.designation ? 'border-red-400' : ''}`} /><ErrorDisplay name="designation" /></div>
//                                             <div><Label className={labelClasses}>Company Name *</Label><Input required name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Full Registered Name" className={`${inputClasses} ${errors.companyName ? 'border-red-400' : ''}`} /><ErrorDisplay name="companyName" /></div>
//                                             <div><Label className={labelClasses}>Business Type *</Label><Select required value={formData.businessType} onValueChange={(v) => handleSelectChange('businessType', v)}><SelectTrigger className={`${inputClasses} ${errors.businessType ? 'border-red-400' : ''}`}><SelectValue placeholder="Select Type" /></SelectTrigger><SelectContent className={selectContentClasses}>{config?.companyTypes?.map((t: string) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></Select><ErrorDisplay name="businessType" /></div>
//                                         </div>
//                                     </div>

//                                     {/* 2. Contact Information */}
//                                     <div className="space-y-2">
//                                         <h3 className={sectionTitleClasses}>Contact Information</h3>
//                                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 gap-y-4 gap-x-5">
//                                             <div className="space-y-1">
//                                                 <Label className={labelClasses}>Mobile Number (OTP) *</Label>
//                                                 <div className="flex gap-2">
//                                                     <div className="relative flex-1"><Smartphone className="absolute left-2 top-1.5 text-slate-400" size={12} /><Input required name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} placeholder="Primary" className={`${inputClasses} pl-7 ${errors.mobileNumber ? 'border-red-400' : ''}`} disabled={mobileOtpVerified} /></div>
//                                                     {!mobileOtpVerified && <Button type="button" onClick={() => (mobileOtpSent ? verifyOtp('mobile') : requestOtp('mobile'))} disabled={isVerifying.mobile} className={`bg-[#23471d] text-[10px] h-7 px-2 whitespace-nowrap ${buttonTextClasses}`}>{isVerifying.mobile ? <Loader2 className="animate-spin" size={10} /> : (mobileOtpSent ? 'Verify' : 'Send')}</Button>}
//                                                 </div>
//                                                 <ErrorDisplay name="mobileNumber" />
//                                                 {mobileOtpSent && !mobileOtpVerified && <Input placeholder="Enter OTP" value={mobileOtpValue} onChange={(e) => setMobileOtpValue(e.target.value)} className={inputClasses} />}
//                                             </div>
//                                             <div><Label className={labelClasses}>Alternate Number</Label><Input name="alternateNumber" value={formData.alternateNumber} onChange={handleChange} placeholder="Optional" className={`${inputClasses} ${errors.alternateNumber ? 'border-red-400' : ''}`} /><ErrorDisplay name="alternateNumber" /></div>
//                                             <div className="space-y-1">
//                                                 <Label className={labelClasses}>Email Address (OTP) *</Label>
//                                                 <div className="flex gap-2">
//                                                     <div className="relative flex-1"><AtSign className="absolute left-2 top-1.5 text-slate-400" size={12} /><Input type="email" required name="emailAddress" value={formData.emailAddress} onChange={handleChange} placeholder="Work Email" className={`${inputClasses} pl-7 ${errors.emailAddress ? 'border-red-400' : ''}`} disabled={emailOtpVerified} /></div>
//                                                     {!emailOtpVerified && <Button type="button" onClick={() => (emailOtpSent ? verifyOtp('email') : requestOtp('email'))} disabled={isVerifying.email} className={`bg-[#23471d] text-[10px] h-7 px-2 whitespace-nowrap ${buttonTextClasses}`}>{isVerifying.email ? <Loader2 className="animate-spin" size={10} /> : (emailOtpSent ? 'Verify' : 'Send')}</Button>}
//                                                 </div>
//                                                 <ErrorDisplay name="emailAddress" />
//                                                 {emailOtpSent && !emailOtpVerified && <Input placeholder="Enter OTP" value={emailOtpValue} onChange={(e) => setEmailOtpValue(e.target.value)} className={inputClasses} />}
//                                             </div>
//                                             <div><Label className={labelClasses}>Website (Optional)</Label><Input name="website" value={formData.website} onChange={handleChange} placeholder="https://..." className={`${inputClasses} ${errors.website ? 'border-red-400' : ''}`} /><ErrorDisplay name="website" /></div>
//                                         </div>
//                                     </div>

//                                     {/* Registered Address, State, City, Pin Code - Single Row without Country */}
//                                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 gap-y-4 gap-x-5">
//                                         <div><Label className={labelClasses}>Registered Address *</Label><Input required name="registeredAddress" value={formData.registeredAddress} onChange={handleChange} placeholder="Full Corporate Address" className={`${inputClasses} ${errors.registeredAddress ? 'border-red-400' : ''}`} /><ErrorDisplay name="registeredAddress" /></div>
//                                         <div><Label className={labelClasses}>State/Province *</Label><Select value={formData.stateProvince} onValueChange={(v) => handleSelectChange('stateProvince', v)} disabled={loadingLocations.states}><SelectTrigger className={`${inputClasses} ${errors.stateProvince ? 'border-red-400' : ''}`}><SelectValue placeholder={loadingLocations.states ? "Loading..." : "Select State"} /></SelectTrigger><SelectContent className={`${selectContentClasses} max-h-[200px]`}>{states.map(s => <SelectItem key={s._id} value={s.name}>{s.name}</SelectItem>)}</SelectContent></Select><ErrorDisplay name="stateProvince" /></div>
//                                         <div><Label className={labelClasses}>City *</Label><Select value={formData.city} onValueChange={(v) => handleSelectChange('city', v)} disabled={!formData.stateProvince || loadingLocations.cities}><SelectTrigger className={`${inputClasses} ${errors.city ? 'border-red-400' : ''}`}><SelectValue placeholder={loadingLocations.cities ? "Loading..." : "Select City"} /></SelectTrigger><SelectContent className={`${selectContentClasses} max-h-[200px]`}>{cities.map(c => <SelectItem key={c._id} value={c.name}>{c.name}</SelectItem>)}</SelectContent></Select><ErrorDisplay name="city" /></div>
//                                         <div><Label className={labelClasses}>Pin Code *</Label><Input required name="pinCode" value={formData.pinCode} onChange={handleChange} placeholder="Postal Code" className={`${inputClasses} ${errors.pinCode ? 'border-red-400' : ''}`} /><ErrorDisplay name="pinCode" /></div>
//                                     </div>

//                                     {/* 3. Business Profile */}
//                                     <div className="space-y-2">
//                                         <h3 className={sectionTitleClasses}> Business Profile</h3>
//                                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 gap-y-4 gap-x-5">
//                                             <div><Label className={labelClasses}>Years in Operation *</Label><Input type="date" required name="yearsInOperation" value={formData.yearsInOperation} onChange={handleChange} className={`${inputClasses} ${errors.yearsInOperation ? 'border-red-400' : ''}`} /><ErrorDisplay name="yearsInOperation" /></div>
//                                             <div><Label className={labelClasses}>Annual Turnover *</Label><Select value={formData.annualTurnover} onValueChange={(v) => handleSelectChange('annualTurnover', v)}><SelectTrigger className={`${inputClasses} ${errors.annualTurnover ? 'border-red-400' : ''}`}><SelectValue placeholder="Choose Range" /></SelectTrigger><SelectContent className={selectContentClasses}>{config?.annualTurnoverRanges?.map((r: string) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent></Select><ErrorDisplay name="annualTurnover" /></div>
//                                             <div><Label className={labelClasses}>Key Products / Services *</Label><Input required name="keyProductsServices" value={formData.keyProductsServices} onChange={handleChange} placeholder="Your primary offerings..." className={`${inputClasses} ${errors.keyProductsServices ? 'border-red-400' : ''}`} /><ErrorDisplay name="keyProductsServices" /></div>
//                                         </div>
//                                     </div>

//                                     {/* 4. Sourcing & Buying Interests */}
//                                     <div className="space-y-2">
//                                         <h3 className={sectionTitleClasses}> Sourcing & Buying Interests</h3>
//                                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 gap-y-4 gap-x-5">
//                                             <div><Label className={labelClasses}>Primary Product Interest *</Label><Select value={formData.primaryProductInterest} onValueChange={(v) => handleSelectChange('primaryProductInterest', v)}><SelectTrigger className={`${inputClasses} ${errors.primaryProductInterest ? 'border-red-400' : ''}`}><SelectValue placeholder="Choose Interest" /></SelectTrigger><SelectContent className={selectContentClasses}>{config?.primaryProductInterests?.map((i: string) => <SelectItem key={i} value={i}>{i}</SelectItem>)}</SelectContent></Select><ErrorDisplay name="primaryProductInterest" /></div>
//                                             <div>
//                                                 <Label className={labelClasses}>Secondary Product Categories</Label>
//                                                 <Select value={formData.secondaryProductCategories} onValueChange={(v) => handleSelectChange('secondaryProductCategories', v)}>
//                                                     <SelectTrigger className={inputClasses}>
//                                                         <SelectValue placeholder="Choose Interests" />
//                                                     </SelectTrigger>
//                                                     <SelectContent className={selectContentClasses}>
//                                                         {config?.secondaryProductCategories?.map((c: string) => (
//                                                             <SelectItem key={c} value={c}>
//                                                                 {c}
//                                                             </SelectItem>
//                                                         ))}
//                                                     </SelectContent>
//                                                 </Select>
//                                             </div>
//                                             <div><Label className={labelClasses}>Estimated Purchase Volume</Label><Input name="estimatedPurchaseVolume" value={formData.estimatedPurchaseVolume} onChange={handleChange} placeholder="e.g. 5000 Units" className={inputClasses} /><div className="h-3" /></div>
//                                             <div><Label className={labelClasses}>Budget Range</Label><Select value={formData.budgetRange} onValueChange={(v) => handleSelectChange('budgetRange', v)}><SelectTrigger className={inputClasses}><SelectValue placeholder="Choose Budget" /></SelectTrigger><SelectContent className={selectContentClasses}>{config?.budgetRanges?.map((b: string) => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent></Select><div className="h-3" /></div>
//                                         </div>
//                                         <div className="mt-1">
//                                             <Label className={labelClasses}>Specific Product Requirements</Label>
//                                             <Textarea name="specificProductRequirements" value={formData.specificProductRequirements} onChange={handleChange} className={`${inputClasses} h-auto min-h-[50px] py-1`} placeholder="Any custom needs..." />
//                                         </div>
//                                     </div>

//                                     {/* 5. Supplier Preference - Single Row */}
//                                     <div className="space-y-2">
//                                         <h3 className={sectionTitleClasses}> Supplier Preference (India Only)</h3>
//                                         <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 gap-y-4 gap-x-5">
//                                             <div className="space-y-1">
//                                                 <Label className={labelClasses}>Preferred Supplier Region *</Label>
//                                                 <div className={`p-2 border rounded-lg bg-white ${errors.preferredSupplierRegion ? 'border-red-400' : 'border-slate-400'}`}>
//                                                     <div className="flex flex-wrap gap-2">
//                                                         {['North India', 'South India', 'East India', 'West India', 'Pan India'].map((r: string) => (
//                                                             <label key={r} className={`flex items-center gap-1 ${checkboxLabelClasses} bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-[2px] cursor-pointer hover:border-emerald-500`}>
//                                                                 <Checkbox checked={formData.preferredSupplierRegion.includes(r)} onCheckedChange={(checked) => handleCheckboxChange('preferredSupplierRegion', r, !!checked)} className="h-3 w-3" /> {r}
//                                                             </label>
//                                                         ))}
//                                                     </div>
//                                                 </div>
//                                                 <ErrorDisplay name="preferredSupplierRegion" />
//                                             </div>
//                                             <div className="space-y-1">
//                                                 <Label className={labelClasses}>Preferred Supplier Type *</Label>
//                                                 <div className={`p-2 border rounded-lg bg-white ${errors.preferredSupplierType ? 'border-red-400' : 'border-slate-400'}`}>
//                                                     <div className="flex flex-wrap gap-2">
//                                                         {['Manufacturer', 'Exporter', 'MSME', 'Startup', 'Wholesaler'].map((t: string) => (
//                                                             <label key={t} className={`flex items-center gap-1 ${checkboxLabelClasses} bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-[2px] cursor-pointer hover:border-emerald-500`}>
//                                                                 <Checkbox checked={formData.preferredSupplierType.includes(t)} onCheckedChange={(checked) => handleCheckboxChange('preferredSupplierType', t, !!checked)} className="h-3 w-3" /> {t}
//                                                             </label>
//                                                         ))}
//                                                     </div>
//                                                 </div>
//                                                 <ErrorDisplay name="preferredSupplierType" />
//                                             </div>
//                                             <div>
//                                                 <Label className={labelClasses}>Preferred State (Optional)</Label>
//                                                 <Select value={formData.preferredState} onValueChange={(v) => handleSelectChange('preferredState', v)}>
//                                                     <SelectTrigger className={inputClasses}>
//                                                         <SelectValue placeholder="Select State" />
//                                                     </SelectTrigger>
//                                                     <SelectContent className={`${selectContentClasses} max-h-[200px]`}>
//                                                         {states.map(s => (
//                                                             <SelectItem key={s._id} value={s.name}>
//                                                                 {s.name}
//                                                             </SelectItem>
//                                                         ))}
//                                                     </SelectContent>
//                                                 </Select>
//                                             </div>
//                                             <div><Label className={labelClasses}>Preferred Company Size</Label><Select value={formData.preferredCompanySize} onValueChange={(v) => handleSelectChange('preferredCompanySize', v)}><SelectTrigger className={inputClasses}><SelectValue placeholder="Select Size" /></SelectTrigger><SelectContent className={selectContentClasses}>{config?.companySizes?.map((s: string) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select></div>
//                                         </div>
//                                     </div>

//                                     {/* 6. Purchase Intent & Capacity */}
//                                     <div className="space-y-2 ">
//                                         <h3 className={sectionTitleClasses}> Purchase Intent & Capacity</h3>
//                                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 gap-y-4 gap-x-5">
//                                             <div><Label className={labelClasses}>Buying Frequency *</Label><Select value={formData.buyingFrequency} onValueChange={(v) => handleSelectChange('buyingFrequency', v)}><SelectTrigger className={`${inputClasses} ${errors.buyingFrequency ? 'border-red-400' : ''}`}><SelectValue placeholder="Select" /></SelectTrigger><SelectContent className={selectContentClasses}>{['One-time', 'Monthly', 'Quarterly', 'Long-term'].map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent></Select><ErrorDisplay name="buyingFrequency" /></div>
//                                             <div><Label className={labelClasses}>Est. Annual Purchase Value *</Label><Select value={formData.estimatedAnnualPurchaseValue} onValueChange={(v) => handleSelectChange('estimatedAnnualPurchaseValue', v)}><SelectTrigger className={`${inputClasses} ${errors.estimatedAnnualPurchaseValue ? 'border-red-400' : ''}`}><SelectValue placeholder="Choose Range" /></SelectTrigger><SelectContent className={selectContentClasses}>{config?.annualPurchaseValueRanges?.map((v: string) => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent></Select><ErrorDisplay name="estimatedAnnualPurchaseValue" /></div>
//                                             <div><Label className={labelClasses}>Purchase Timeline *</Label><Select value={formData.purchaseTimeline} onValueChange={(v) => handleSelectChange('purchaseTimeline', v)}><SelectTrigger className={`${inputClasses} ${errors.purchaseTimeline ? 'border-red-400' : ''}`}><SelectValue placeholder="Select" /></SelectTrigger><SelectContent className={selectContentClasses}>{['Immediate', '1–3 Months', '3–6 Months', 'Exploring'].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></Select><ErrorDisplay name="purchaseTimeline" /></div>
//                                             <div><Label className={labelClasses}>Matchmaking Interest *</Label><Select value={formData.matchmakingInterest} onValueChange={(v) => handleSelectChange('matchmakingInterest', v)}><SelectTrigger className={`${inputClasses} ${errors.matchmakingInterest ? 'border-red-400' : ''}`}><SelectValue placeholder="Yes/No" /></SelectTrigger><SelectContent className={selectContentClasses}><SelectItem value="Yes">Yes</SelectItem><SelectItem value="No">No</SelectItem></SelectContent></Select><ErrorDisplay name="matchmakingInterest" /></div>
//                                             <div><Label className={labelClasses}>Role in Purchase Decision *</Label><Select value={formData.roleInPurchaseDecision} onValueChange={(v) => handleSelectChange('roleInPurchaseDecision', v)}><SelectTrigger className={`${inputClasses} ${errors.roleInPurchaseDecision ? 'border-red-400' : ''}`}><SelectValue placeholder="Select Role" /></SelectTrigger><SelectContent className={selectContentClasses}>{['Final Decision Maker', 'Influencer', 'Research Only'].map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent></Select><ErrorDisplay name="roleInPurchaseDecision" /></div>
//                                         </div>
//                                     </div>

//                                     {/* 7. Certification & Compliance + 8. Pricing Preference - Single Row */}
//                                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 gap-y-4 gap-x-5">
//                                         <div className="space-y-2">
//                                             <h3 className={sectionTitleClasses}> Certification & Compliance</h3>
//                                             <div className="flex flex-wrap gap-2 p-2 border rounded-lg bg-white">
//                                                 {['ISO', 'GMP', 'FDA', 'AYUSH', 'Organic', 'Others'].map((c: string) => (
//                                                     <label key={c} className={`flex items-center gap-1 ${checkboxLabelClasses} bg-slate-50 px-2 py-0.5 rounded border border-slate-400 cursor-pointer hover:bg-emerald-50`}>
//                                                         <Checkbox checked={formData.requiredCertifications.includes(c)} onCheckedChange={(checked) => handleCheckboxChange('requiredCertifications', c, !!checked)} className="h-3 w-3" /> {c}
//                                                     </label>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                         <div className="space-y-2">
//                                             <h3 className={sectionTitleClasses}> Pricing Preference</h3>
//                                             <div className="flex gap-4 p-2">
//                                                 <label className={`flex items-center gap-1 ${checkboxLabelClasses}`}><Checkbox checked={formData.pricingPreference === 'Premium'} onCheckedChange={() => handleSelectChange('pricingPreference', 'Premium')} className="h-3 w-3" /> Premium</label>
//                                                 <label className={`flex items-center gap-1 ${checkboxLabelClasses}`}><Checkbox checked={formData.pricingPreference === 'Mid-Range'} onCheckedChange={() => handleSelectChange('pricingPreference', 'Mid-Range')} className="h-3 w-3" /> Mid-Range</label>
//                                                 <label className={`flex items-center gap-1 ${checkboxLabelClasses}`}><Checkbox checked={formData.pricingPreference === 'Budget'} onCheckedChange={() => handleSelectChange('pricingPreference', 'Budget')} className="h-3 w-3" /> Budget</label>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* 9. B2B Meeting Preferences */}
//                                     <div className="space-y-2">
//                                         <h3 className={sectionTitleClasses}> B2B Meeting Preferences</h3>
//                                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 gap-y-4 gap-x-5">
//                                             <div><Label className={labelClasses}>Preferred Meeting Date *</Label><Input type="date" required name="preferredMeetingDate" value={formData.preferredMeetingDate} onChange={handleChange} className={`${inputClasses} ${errors.preferredMeetingDate ? 'border-red-400' : ''}`} /><ErrorDisplay name="preferredMeetingDate" /></div>
//                                             <div><Label className={labelClasses}>Preferred Time Slot *</Label><Select value={formData.preferredTimeSlot} onValueChange={(v) => handleSelectChange('preferredTimeSlot', v)}><SelectTrigger className={`${inputClasses} ${errors.preferredTimeSlot ? 'border-red-400' : ''}`}><SelectValue placeholder="Select Slot" /></SelectTrigger><SelectContent className={selectContentClasses}><SelectItem value="Morning (10AM - 1PM)">Morning (10AM - 1PM)</SelectItem><SelectItem value="Afternoon (2PM - 4PM)">Afternoon (2PM - 4PM)</SelectItem><SelectItem value="Evening (4PM - 6PM)">Evening (4PM - 6PM)</SelectItem></SelectContent></Select><ErrorDisplay name="preferredTimeSlot" /></div>
//                                             <div><Label className={labelClasses}>Pre-scheduled sB2B *</Label><Select value={formData.requirePreScheduledB2B} onValueChange={(v) => handleSelectChange('requirePreScheduledB2B', v)}><SelectTrigger className={inputClasses}><SelectValue placeholder="Yes/No" /></SelectTrigger><SelectContent className={selectContentClasses}><SelectItem value="Yes">Yes</SelectItem><SelectItem value="No">No</SelectItem></SelectContent></Select><div className="h-3" /></div>
//                                             <div><Label className={labelClasses}>Meeting Priority Level *</Label><Select value={formData.meetingPriorityLevel} onValueChange={(v) => handleSelectChange('meetingPriorityLevel', v)}><SelectTrigger className={inputClasses}><SelectValue placeholder="Priority" /></SelectTrigger><SelectContent className={selectContentClasses}><SelectItem value="High">High</SelectItem><SelectItem value="Medium">Medium</SelectItem><SelectItem value="General">General</SelectItem></SelectContent></Select><div className="h-3" /></div>
//                                         </div>
//                                     </div>
//                                     {/* 10. Registration Category */}
//                                     <div className="space-y-4">
//                                         <h3 className={sectionTitleClasses}> Registration Category 🔹</h3>

//                                         {!showMembershipOptions ? (
//                                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
//                                                 {passPackages.map((pkg: any) => (
//                                                     <div
//                                                         key={pkg.name}
//                                                         onClick={() => handlePackageSelection(pkg)}
//                                                         className={`relative p-4 border-2 transition-all cursor-pointer rounded-xl flex flex-col h-full font-sans ${formData.registrationCategory === pkg.name ? 'border-[#23471d] bg-white shadow-xl ring-4 ring-emerald-50' : 'border-slate-200 bg-white hover:border-emerald-200'}`}
//                                                     >
//                                                         <div className="flex justify-between items-start mb-2 gap-2">
//                                                             <h4 className="text-[14px] font-black leading-tight text-slate-800 font-sans">
//                                                                 {pkg.name}
//                                                             </h4>
//                                                         </div>
//                                                         <div className="flex-1 space-y-2">
//                                                             <ul className="text-[11px] text-slate-700 space-y-1.5 font-medium font-sans">
//                                                                 {pkg.benefits.map((b: string, i: number) => (
//                                                                     <li key={i} className="flex items-start gap-2">
//                                                                         <span className="text-emerald-600 font-black mt-0.5 whitespace-nowrap">✓</span>
//                                                                         <span>{b}</span>
//                                                                     </li>
//                                                                 ))}
//                                                             </ul>
//                                                         </div>
//                                                         <div className={`mt-3 w-full py-2 rounded-lg text-center text-[11px] font-black uppercase tracking-wider transition-all font-sans ${formData.registrationCategory === pkg.name ? 'bg-[#23471d] text-white' : 'bg-slate-50 text-slate-400 hover:bg-emerald-50 hover:text-emerald-700'}`}>
//                                                             {formData.registrationCategory === pkg.name ? "Selected ✅" : "Select 👉"}
//                                                         </div>
//                                                     </div>
//                                                 ))}

//                                                 {/* Membership Trigger Card */}
//                                                 <div
//                                                     onClick={() => setShowMembershipOptions(true)}
//                                                     className="relative p-3 border-2 border-dashed border-emerald-300 bg-emerald-50/20 transition-all cursor-pointer rounded-xl flex flex-col justify-center items-center text-center hover:border-emerald-500 hover:bg-emerald-50/40 h-full min-h-[200px] font-sans"
//                                                 >
//                                                     <h4 className="text-[14px] font-black text-emerald-800 mb-1 font-sans">Membership Option</h4>
//                                                     <div className={`text-[11px] text-emerald-500 font-bold uppercase mt-2 px-4 py-1.5 border border-emerald-200 rounded-full bg-white shadow-sm font-sans`}>View More Plans →</div>
//                                                 </div>
//                                             </div>
//                                         ) : (
//                                             <div className="space-y-4">
//                                                 <div className="flex items-center justify-between px-2">
//                                                     <div className="flex items-center gap-2">
//                                                         <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
//                                                         <p className="text-[11px] font-black text-slate-600 uppercase tracking-[0.2em] font-sans">Exclusive Membership Plans</p>
//                                                     </div>
//                                                     <Button type="button" onClick={() => setShowMembershipOptions(false)} variant="ghost" className={`h-8 text-[11px] text-emerald-700 font-black hover:bg-emerald-50 border border-emerald-100 ${buttonTextClasses}`}>← Back</Button>
//                                                 </div>

//                                                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
//                                                     {membershipPackages.map((pkg: any) => (
//                                                         <div
//                                                             key={pkg.name}
//                                                             onClick={() => handlePackageSelection(pkg)}
//                                                             className={`relative p-4 border-2 transition-all cursor-pointer rounded-xl flex flex-col h-full font-sans ${formData.registrationCategory === pkg.name ? 'border-[#23471d] bg-white shadow-xl ring-4 ring-emerald-50' : 'border-slate-200 bg-white hover:border-emerald-200'}`}
//                                                         >
//                                                             <div className="flex justify-between items-start mb-2 gap-2">
//                                                                 <h4 className="text-[14px] font-black leading-tight text-slate-800 font-sans">
//                                                                     {pkg.name}
//                                                                 </h4>
//                                                             </div>

//                                                             <div className="flex-1 space-y-2">
//                                                                 <ul className="text-[11px] text-slate-600 space-y-1.5 font-medium font-sans">
//                                                                     {pkg.benefits.map((b: string, i: number) => (
//                                                                         <li key={i} className="flex items-start gap-2">
//                                                                             <span className="text-emerald-500 font-bold mt-0.5">✓</span>
//                                                                             <span>{b}</span>
//                                                                         </li>
//                                                                     ))}
//                                                                 </ul>
//                                                             </div>

//                                                             <div className={`mt-4 w-full py-2 rounded-lg text-center text-[11px] font-black uppercase tracking-wider transition-all font-sans ${formData.registrationCategory === pkg.name ? 'bg-[#23471d] text-white' : 'bg-slate-50 text-slate-400 hover:bg-emerald-50 hover:text-emerald-700'}`}>
//                                                                 {formData.registrationCategory === pkg.name ? "Selected ✅" : "Select 👉"}
//                                                             </div>
//                                                         </div>
//                                                     ))}
//                                                 </div>
//                                             </div>
//                                         )}
//                                     </div>

//                                     {/* Submit Section */}
//                                     <div className="pt-4 flex flex-col items-center border-t border-slate-100">
//                                         <Button type="submit" disabled={isSubmitting} className={`w-inline h-8 bg-[#23471d] hover:bg-[#1a3516] rounded-sm text-white shadow-md transition-all flex items-center justify-center gap-2 ${buttonTextClasses}`}>{isSubmitting ? <Loader2 size={12} className="animate-spin" /> : <>Submit Registration <Send size={11} /></>}</Button>
//                                         <p className="mt-1 text-[8px] text-slate-400 font-bold uppercase tracking-wide flex items-center gap-1 font-sans"><Shield size={8} className="text-[#23471d]" /> Secured Registration System</p>
//                                     </div>
//                                 </form>
//                             </motion.div>
//                         )}
//                     </AnimatePresence>
//                 </div>
//             </section >

//             {/* Terms & Conditions Modal */}
//             <AnimatePresence>
//                 {
//                     showTermsModal && (
//                         <motion.div
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             exit={{ opacity: 0 }}
//                             className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
//                         >
//                             <motion.div
//                                 initial={{ scale: 0.9, y: 20 }}
//                                 animate={{ scale: 1, y: 0 }}
//                                 exit={{ scale: 0.9, y: 20 }}
//                                 className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden"
//                             >
//                                 <div className="bg-[#23471d] p-4 text-white flex justify-between items-center">
//                                     <h3 className="font-bold uppercase tracking-wider text-sm font-sans">Payment Terms & Conditions</h3>
//                                     <button onClick={() => setShowTermsModal(false)} className="hover:rotate-90 transition-transform"><Loader2 className="rotate-45" size={20} /></button>
//                                 </div>

//                                 <div className="p-6 overflow-y-auto text-[12px] leading-relaxed text-slate-600 space-y-4 font-medium custom-scrollbar font-sans">
//                                     <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100 text-emerald-800 font-bold mb-4 font-sans">
//                                         Registration: {tempSelectedPackage?.name} — ₹{tempSelectedPackage?.price}
//                                     </div>
//                                     <p className="font-bold underline text-slate-800 uppercase font-sans">9th Edition of International Health & Wellness Expo 2026 (IHWE – Global Edition)</p>
//                                     <p className="font-sans">Organised by: Namo Gange Wellness Pvt. Ltd.</p>

//                                     <div className="space-y-3 pt-2">
//                                         <p className="font-sans"><strong>1. Acceptance of Terms:</strong> By proceeding with registration, the Participant confirms they have read and agreed to these Terms under the Indian Contract Act, 1872.</p>
//                                         <p className="font-sans"><strong>2. Scope of Payment:</strong> Includes Exhibition Stall Booking, Sponsorship, Buyer/Seller Registration, and Membership fees.</p>
//                                         <p className="font-sans"><strong>3. Confirmation:</strong> Confirmed only upon receipt of payment. Confirmation invoice will be issued via email.</p>
//                                         <p className="font-sans"><strong>4. Pricing & Taxes:</strong> Fees are exclusive of GST. Participant agrees to bear all duties and charges.</p>
//                                         <p className="font-sans"><strong>5. Strict No Refund Policy:</strong> ALL PAYMENTS ARE FINAL, NON-REFUNDABLE, AND NON-TRANSFERABLE. This includes cancellations, no-shows, or changes in plans.</p>
//                                         <p className="font-sans"><strong>6. Force Majeure:</strong> Organiser reserves right to reschedule. Registration remains valid for revised dates; no refund arises.</p>
//                                         <p className="font-sans"><strong>7. Jurisdiction:</strong> Governed by laws of India. Disputes subject to Courts in Delhi NCR.</p>
//                                     </div>


//                                 </div>

//                                 <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col gap-3">
//                                     <div className="flex items-start gap-3 p-3 bg-white border border-emerald-200 rounded-lg">
//                                         <Checkbox id="modal-consent" onCheckedChange={(checked) => {
//                                             if (checked) {
//                                                 // Optional: visual feedback before closing or auto-confirm
//                                             }
//                                         }} />
//                                         <Label htmlFor="modal-consent" className="text-[11px] leading-tight text-slate-700 font-bold font-sans">
//                                             I have read, understood, and agree to the Payment Terms & Conditions, including the strictly non-refundable and non-transferable policy, and I voluntarily proceed.
//                                         </Label>
//                                     </div>
//                                     <div className="flex gap-2">
//                                         <Button variant="outline" onClick={() => setShowTermsModal(false)} className={`flex-1 h-9 text-xs font-sans ${buttonTextClasses}`}>Cancel</Button>
//                                         <Button
//                                             onClick={confirmPackage}
//                                             className={`flex-1 h-9 bg-[#23471d] hover:bg-[#1a3516] text-white ${buttonTextClasses}`}
//                                         >
//                                             Agree & Proceed
//                                         </Button>
//                                     </div>
//                                 </div>
//                             </motion.div>
//                         </motion.div>
//                     )
//                 }
//             </AnimatePresence >
//         </div >
//     );
// };

// export default BuyerRegistration;

import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    CheckCircle,
    Send,
    ShieldCheck,
    Loader2,
    User,
    Phone,
    Briefcase,
    Target,
    Globe,
    Calendar,
    CreditCard,
    Smartphone,
    AtSign,
    Shield,
    FileText,
    Lock,
    AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import HeroBg from "@/assets/buyer.jpg";
import { buyerRegistrationApi, heroBackgroundApi, SERVER_URL, crmApi, otpApi } from "@/lib/api";

// Function to load Razorpay script
const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

const BuyerRegistration = () => {
    const [config, setConfig] = useState<any>(null);
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [heroData, setHeroData] = useState<any>(null);
    const [countries, setCountries] = useState<any[]>([]);
    const [states, setStates] = useState<any[]>([]);
    const [cities, setCities] = useState<any[]>([]);

    const [emailOtpSent, setEmailOtpSent] = useState(false);
    const [emailOtpVerified, setEmailOtpVerified] = useState(false);
    const [emailOtpValue, setEmailOtpValue] = useState("");
    const [mobileOtpSent, setMobileOtpSent] = useState(false);
    const [mobileOtpVerified, setMobileOtpVerified] = useState(false);
    const [mobileOtpValue, setMobileOtpValue] = useState("");
    const [isVerifying, setIsVerifying] = useState({ email: false, mobile: false });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loadingLocations, setLoadingLocations] = useState({ states: false, cities: false });

    // Modal states
    const [showTermsModal, setShowTermsModal] = useState(false);
    const [tempSelectedPackage, setTempSelectedPackage] = useState<any>(null);
    const [activePolicyTab, setActivePolicyTab] = useState<'payment' | 'refund' | 'privacy'>('payment');
    const [policyConsents, setPolicyConsents] = useState({
        paymentTerms: false,
        refundPolicy: false,
        privacyPolicy: false
    });

    const initialFormState = {
        fullName: "",
        designation: "",
        companyName: "",
        businessType: "",
        mobileNumber: "",
        alternateNumber: "",
        emailAddress: "",
        website: "",
        pinCode: "",
        country: "India",
        stateProvince: "",
        city: "",
        registeredAddress: "",
        yearsInOperation: "",
        annualTurnover: "",
        buyingFrequency: "",
        estimatedAnnualPurchaseValue: "",
        keyProductsServices: "",
        primaryProductInterest: "",
        secondaryProductCategories: "",
        specificProductRequirements: "",
        estimatedPurchaseVolume: "",
        budgetRange: "",
        preferredSupplierRegion: [] as string[],
        preferredState: "",
        preferredSupplierType: [] as string[],
        preferredCompanySize: "",
        purchaseTimeline: "",
        roleInPurchaseDecision: "",
        pricingPreference: "Mid-Range",
        matchmakingInterest: "Yes",
        logisticsRequirements: "",
        preferredPaymentMethods: [] as string[],
        companyProfile: null as File | null,
        requiredCertifications: [] as string[],
        preferredMeetingDate: "",
        preferredTimeSlot: "",
        requirePreScheduledB2B: "Yes",
        meetingPriorityLevel: "Medium",
        remarks: "",
        registrationCategory: "",
        registrationFee: "₹0",
        paymentMode: "Online/Razorpay",
        transactionId: "",
        paymentProof: null as File | null,
        consentTerms: false,
        consentPaymentValid: false,
        consentMatchedExhibitors: false
    };

    const [formData, setFormData] = useState(initialFormState);
    const [showMembershipOptions, setShowMembershipOptions] = useState(false);

    const membershipPackages = useMemo(() => config?.packages?.filter((p: any) => p.category === 'Membership') || [], [config]);
    const passPackages = useMemo(() => config?.packages?.filter((p: any) => p.category === 'Pass') || [], [config]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [hData, cRes, configRes] = await Promise.all([
                    heroBackgroundApi.getByPage("Registration / Buyer Registration"),
                    crmApi.getCountries(),
                    buyerRegistrationApi.getConfig()
                ]);
                if (hData) setHeroData(hData);
                if (cRes) setCountries(cRes);
                if (configRes?.success) {
                    const cfg = configRes.data;
                    setConfig(cfg);

                    if (cfg.packages?.length > 0) {
                        setFormData(prev => ({
                            ...prev,
                            registrationCategory: cfg.packages[0].name,
                            registrationFee: `₹${cfg.packages[0].price}`
                        }));
                    }
                }
            } catch (err) {
                console.error("Error fetching initial data:", err);
            }
        };
        fetchData();
    }, []);

    // Cascade State from Country selection
    useEffect(() => {
        const fetchStates = async () => {
            if (!formData.country) {
                setStates([]);
                return;
            }
            const selectedCountry = countries.find(c => c.name === formData.country);
            if (selectedCountry) {
                setLoadingLocations(prev => ({ ...prev, states: true }));
                try {
                    const data = await crmApi.getStates(selectedCountry.countryCode);
                    setStates(data);
                } catch (err) {
                    console.error("Error fetching states:", err);
                } finally {
                    setLoadingLocations(prev => ({ ...prev, states: false }));
                }
            }
        };
        fetchStates();
    }, [formData.country, countries]);

    // Cascade City from State selection
    useEffect(() => {
        const fetchCities = async () => {
            if (!formData.stateProvince) {
                setCities([]);
                return;
            }
            const selectedState = states.find(s => s.name === formData.stateProvince);
            if (selectedState) {
                setLoadingLocations(prev => ({ ...prev, cities: true }));
                try {
                    const data = await crmApi.getCities(selectedState.stateCode);
                    setCities(data);
                } catch (err) {
                    console.error("Error fetching cities:", err);
                } finally {
                    setLoadingLocations(prev => ({ ...prev, cities: false }));
                }
            }
        };
        fetchCities();
    }, [formData.stateProvince, states]);

    const validateField = (name: string, value: any) => {
        let error = "";
        const requiredFields = [
            'fullName', 'designation', 'companyName', 'businessType',
            'emailAddress', 'mobileNumber', 'registeredAddress', 'pinCode',
            'stateProvince', 'city', 'yearsInOperation', 'annualTurnover',
            'keyProductsServices', 'primaryProductInterest', 'buyingFrequency',
            'estimatedAnnualPurchaseValue', 'purchaseTimeline', 'roleInPurchaseDecision',
            'matchmakingInterest', 'preferredMeetingDate', 'preferredTimeSlot',
            'registrationCategory'
        ];

        const lettersOnlyFields = ['fullName', 'designation', 'companyName', 'specificProductRequirements'];

        if (requiredFields.includes(name) && !value) {
            error = "This field is required";
        } else if (lettersOnlyFields.includes(name) && value && !/^[A-Za-z\s]+$/.test(value)) {
            error = "Only letters and spaces allowed";
        } else if (name === 'emailAddress' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            error = "Invalid email format";
        } else if (name === 'mobileNumber' && value) {
            // Fix: Mobile number must be exactly 10 digits
            if (!/^\d{10}$/.test(value)) {
                error = "Mobile number must be exactly 10 digits";
            }
        } else if (name === 'alternateNumber' && value && !/^\d{10}$/.test(value)) {
            error = "Alternate number must be exactly 10 digits";
        } else if (name === 'pinCode' && value && !/^\d{6}$/.test(value)) {
            error = "Pin code must be exactly 6 digits";
        }

        setErrors(prev => ({ ...prev, [name]: error }));
        return error === "";
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        // Mobile number validation - only numbers, max 10 digits
        if (name === 'mobileNumber') {
            const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
            setFormData(prev => ({ ...prev, [name]: digitsOnly }));
            validateField(name, digitsOnly);
        } else if (name === 'alternateNumber') {
            const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
            setFormData(prev => ({ ...prev, [name]: digitsOnly }));
            validateField(name, digitsOnly);
        } else if (name === 'pinCode') {
            const digitsOnly = value.replace(/\D/g, '').slice(0, 6);
            setFormData(prev => ({ ...prev, [name]: digitsOnly }));
            validateField(name, digitsOnly);
        } else if (['fullName', 'designation', 'companyName', 'specificProductRequirements'].includes(name)) {
            const lettersOnly = value.replace(/[^A-Za-z\s]/g, '');
            setFormData(prev => ({ ...prev, [name]: lettersOnly }));
            validateField(name, lettersOnly);
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
            validateField(name, value);
        }
    };

    const handleSelectChange = (name: string, value: string) => {
        setErrors(prev => ({ ...prev, [name]: "" }));

        if (name === 'country') {
            setFormData(prev => ({ ...prev, country: value, stateProvince: '', city: '' }));
            return;
        }
        if (name === 'stateProvince') {
            setFormData(prev => ({ ...prev, stateProvince: value, city: '' }));
            return;
        }
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors: Record<string, string> = {};

        // 1. Core Fields
        const fieldsToValidate = [
            'fullName', 'designation', 'companyName', 'businessType',
            'emailAddress', 'mobileNumber', 'registeredAddress', 'pinCode',
            'stateProvince', 'city', 'yearsInOperation', 'annualTurnover',
            'keyProductsServices', 'primaryProductInterest', 'buyingFrequency',
            'estimatedAnnualPurchaseValue', 'purchaseTimeline', 'roleInPurchaseDecision',
            'matchmakingInterest', 'preferredMeetingDate', 'preferredTimeSlot',
            'registrationCategory'
        ];

        fieldsToValidate.forEach(field => {
            if (!formData[field as keyof typeof formData]) {
                newErrors[field] = "This field is required";
                isValid = false;
            }
        });

        // 2. Format Validations
        if (formData.emailAddress && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress)) {
            newErrors.emailAddress = "Invalid email format";
            isValid = false;
        }

        if (formData.mobileNumber && !/^\d{10}$/.test(formData.mobileNumber)) {
            newErrors.mobileNumber = "Mobile number must be exactly 10 digits";
            isValid = false;
        }

        // 3. Multi-selects
        if (formData.preferredSupplierRegion.length === 0) {
            newErrors.preferredSupplierRegion = "Select at least one region";
            isValid = false;
        }
        if (formData.preferredSupplierType.length === 0) {
            newErrors.preferredSupplierType = "Select at least one type";
            isValid = false;
        }

        // 4. OTP Verification
        if (!emailOtpVerified) {
            newErrors.emailAddress = "Please verify your email via OTP";
            isValid = false;
        }
        if (!mobileOtpVerified) {
            newErrors.mobileNumber = "Please verify your mobile via OTP";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleCheckboxChange = (name: string, value: string, checked: boolean) => {
        setFormData(prev => {
            const list = prev[name as keyof typeof prev] as string[];
            return { ...prev, [name]: checked ? [...list, value] : list.filter(item => item !== value) };
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData(prev => ({ ...prev, paymentProof: file }));
    };

    const requestOtp = async (type: 'email' | 'mobile') => {
        const identifier = type === 'email' ? formData.emailAddress : formData.mobileNumber;
        if (!identifier) {
            alert(`Please enter a valid ${type} first.`);
            return;
        }
        if (type === 'mobile' && !/^\d{10}$/.test(identifier)) {
            alert("Please enter a valid 10-digit mobile number first.");
            return;
        }
        setIsVerifying(prev => ({ ...prev, [type]: true }));
        try {
            const res = await otpApi.request(identifier, type === 'email' ? 'email' : 'phone', formData.fullName);
            if (res.success) {
                alert(`OTP sent to your ${type}.`);
                type === 'email' ? setEmailOtpSent(true) : setMobileOtpSent(true);
            } else alert(res.message);
        } catch (err) {
            alert("Connection error.");
        } finally {
            setIsVerifying(prev => ({ ...prev, [type]: false }));
        }
    };

    const verifyOtp = async (type: 'email' | 'mobile') => {
        const identifier = type === 'email' ? formData.emailAddress : formData.mobileNumber;
        const otp = type === 'email' ? emailOtpValue : mobileOtpValue;
        if (!otp) {
            alert("Please enter the OTP.");
            return;
        }
        setIsVerifying(prev => ({ ...prev, [type]: true }));
        try {
            const res = await otpApi.verify(identifier, otp, type === 'email' ? 'email' : 'phone');
            if (res.success) {
                alert(`${type.toUpperCase()} verified successfully!`);
                type === 'email' ? setEmailOtpVerified(true) : setMobileOtpVerified(true);
            } else alert(res.message);
        } catch (err) {
            alert("Verification failed.");
        } finally {
            setIsVerifying(prev => ({ ...prev, [type]: false }));
        }
    };

    const handlePackageSelection = (pkg: any) => {
        setTempSelectedPackage(pkg);
        setPolicyConsents({ paymentTerms: false, refundPolicy: false, privacyPolicy: false });
        setActivePolicyTab('payment');
        setShowTermsModal(true);
    };

    const initiateRazorpayPayment = async () => {
        const razorpayLoaded = await loadRazorpayScript();
        if (!razorpayLoaded) {
            alert("Failed to load payment gateway. Please try again.");
            return;
        }

        const options = {
            key: process.env.RAZORPAY_KEY_ID || "YOUR_KEY_ID",
            amount: tempSelectedPackage.price * 100, // Amount in paise
            currency: "INR",
            name: "IHWE 2026",
            description: `${tempSelectedPackage.name} Registration`,
            handler: async function (response: any) {
                // Payment successful
                setFormData(prev => ({
                    ...prev,
                    registrationCategory: tempSelectedPackage.name,
                    registrationFee: `₹${tempSelectedPackage.price}`,
                    transactionId: response.razorpay_payment_id
                }));

                setShowTermsModal(false);
                await submitFinal(response.razorpay_payment_id);
            },
            prefill: {
                name: formData.fullName,
                email: formData.emailAddress,
                contact: formData.mobileNumber
            },
            theme: {
                color: "#23471d"
            },
            modal: {
                confirm_close: true,
                ondismiss: function () {
                    alert("Payment cancelled. Please complete payment to confirm registration.");
                }
            }
        };

        const razorpay = new (window as any).Razorpay(options);
        razorpay.open();
    };

    const confirmPackage = () => {
        if (!policyConsents.paymentTerms || !policyConsents.refundPolicy || !policyConsents.privacyPolicy) {
            alert("Please accept all Terms & Conditions, Refund Policy, and Privacy Policy to proceed.");
            return;
        }

        // Show final confirmation
        const userConfirmed = window.confirm(
            "⚠️ IMPORTANT: All payments are NON-REFUNDABLE and NON-TRANSFERABLE.\n\n" +
            "Do you wish to proceed with the payment?"
        );

        if (userConfirmed) {
            initiateRazorpayPayment();
        }
    };

    const submitFinal = async (transactionId: string) => {
        setIsSubmitting(true);
        try {
            const res = await buyerRegistrationApi.submit({
                ...formData,
                registrationCategory: tempSelectedPackage?.name,
                registrationFee: `₹${tempSelectedPackage?.price}`,
                paymentStatus: "Paid",
                transactionId: transactionId,
                consentTerms: true,
                consentPaymentValid: true,
                consentMatchedExhibitors: true
            });
            if (res.success) {
                setSubmitted(true);
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                alert(res.message || "Submission error. Please contact support.");
            }
        } catch (error) {
            alert("Submission error. Please contact support.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const isValid = validateForm();

        if (!isValid) {
            alert("Please correct the errors in the form before submitting.");
            const firstErrorField = Object.keys(errors)[0];
            const element = document.getElementsByName(firstErrorField)[0];
            if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        if (formData.preferredSupplierRegion.length === 0 || formData.preferredSupplierType.length === 0) {
            alert("Please select at least one Preferred Supplier Region and Type.");
            return;
        }

        if (!emailOtpVerified || !mobileOtpVerified) {
            alert("Please verify your Email and Mobile via OTP before submitting.");
            return;
        }

        // Note: Form submission now happens after payment, not here
        // The package selection modal will handle payment and submission
    };

    const handleReset = () => {
        setFormData({
            ...initialFormState,
            registrationCategory: config?.packages?.[0]?.name || "",
            registrationFee: config?.packages?.[0]?.price ? `₹${config.packages[0].price}` : "₹0"
        });
        setSubmitted(false);
        setEmailOtpSent(false);
        setEmailOtpVerified(false);
        setEmailOtpValue("");
        setMobileOtpSent(false);
        setMobileOtpVerified(false);
        setMobileOtpValue("");
        setShowMembershipOptions(false);
        setTempSelectedPackage(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Consistent styling classes
    const inputClasses = "w-full h-8 px-3 py-2 rounded-[2px] border border-slate-400 bg-white text-left text-[12px] font-medium text-slate-900 outline-none shadow-none transition-all ring-offset-background focus:border-[#23471d] focus:ring-[#23471d]/10 placeholder:text-slate-400 font-sans";
    const labelClasses = "text-[12px] font-semibold text-slate-900 mb-0.5 block text-left font-sans";
    const sectionTitleClasses = "text-[13px] font-black text-[#23471d] pb-1 border-b border-emerald-500/20 flex items-center gap-1.5 mb-3 uppercase tracking-tight font-sans";
    const buttonTextClasses = "text-[11px] font-bold uppercase tracking-wider font-sans";

    return (
        <div className="min-h-screen bg-[#FDFDFD] font-sans">
            <section className="relative h-[140px] flex items-center justify-center bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url(${heroData?.backgroundImage ? `${SERVER_URL}${heroData.backgroundImage}` : HeroBg})` }}>
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20" />
                <div className="container mx-auto px-4 text-center text-white relative z-10">
                    <p className="text-[9px] uppercase tracking-[0.5em] mb-1 text-emerald-400 font-bold font-sans">IHWE 2026 - Global Connect</p>
                    <h1 className="text-2xl md:text-3xl font-serif font-bold mb-1 italic">Buyer Registration</h1>
                    <div className="w-12 h-0.5 bg-emerald-500 mx-auto rounded-full" />
                </div>
            </section>

            <section className="py-4 relative bg-[#F8FAFC]">
                <div className="container mx-auto px-4 max-w-[1400px]">
                    <AnimatePresence mode="wait">
                        {submitted ? (
                            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white border border-slate-200 p-12 flex flex-col items-center text-center space-y-5 shadow-2xl rounded-xl">
                                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500"><CheckCircle size={48} strokeWidth={1.5} /></div>
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-bold text-slate-900 font-serif">Registration Successful!</h2>
                                    <p className="text-slate-500 text-sm max-w-lg mx-auto leading-relaxed font-sans">Thank you for choosing IHWE 2026. Your registration details and payment confirmation have been emailed to you.</p>
                                </div>
                                <div className="flex flex-wrap gap-4 justify-center">
                                    <Button onClick={handleReset} className={`rounded-full px-8 h-10 border-[#23471d] text-[#23471d] hover:bg-emerald-50 ${buttonTextClasses} shadow-sm`} variant="outline">Register Another</Button>
                                    <Link to="/"><Button className={`rounded-full px-8 h-10 bg-[#23471d] hover:bg-[#1a3516] ${buttonTextClasses} shadow-xl`}>Return Home</Button></Link>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div key="form" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-slate-200 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-lg overflow-hidden">
                                <div className="bg-[#23471d] px-5 py-3 text-white flex justify-between items-center">
                                    <div>
                                        <h2 className="text-base font-bold uppercase tracking-wider font-sans">Buyer-Seller Meet</h2>
                                        <p className="text-[9px] text-emerald-300 uppercase tracking-[0.3em] font-medium font-sans">International Health & Wellness Expo 2026</p>
                                    </div>
                                    <ShieldCheck className="text-emerald-400 opacity-50" size={24} />
                                </div>
                                <form onSubmit={handleSubmit} className="p-5 space-y-5">

                                    {/* 1. Personal & Company Information */}
                                    <div className="space-y-2">
                                        <h3 className={sectionTitleClasses}> Personal & Company Information</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 gap-y-4 gap-x-5">
                                            <div><Label className={labelClasses}>Full Name *</Label><Input required name="fullName" value={formData.fullName} onChange={handleChange} placeholder="As per ID Proof" className={`${inputClasses} ${errors.fullName ? 'border-red-400' : ''}`} /><ErrorDisplay name="fullName" errors={errors} /></div>
                                            <div><Label className={labelClasses}>Designation *</Label><Input required name="designation" value={formData.designation} onChange={handleChange} placeholder="Current Position" className={`${inputClasses} ${errors.designation ? 'border-red-400' : ''}`} /><ErrorDisplay name="designation" errors={errors} /></div>
                                            <div><Label className={labelClasses}>Company Name *</Label><Input required name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Full Registered Name" className={`${inputClasses} ${errors.companyName ? 'border-red-400' : ''}`} /><ErrorDisplay name="companyName" errors={errors} /></div>
                                            <div><Label className={labelClasses}>Business Type *</Label><Select required value={formData.businessType} onValueChange={(v) => handleSelectChange('businessType', v)}><SelectTrigger className={`${inputClasses} ${errors.businessType ? 'border-red-400' : ''}`}><SelectValue placeholder="Select Type" /></SelectTrigger><SelectContent className="bg-white font-sans text-[12px]">{config?.companyTypes?.map((t: string) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></Select><ErrorDisplay name="businessType" errors={errors} /></div>
                                        </div>
                                    </div>

                                    {/* 2. Contact Information */}
                                    <div className="space-y-2">
                                        <h3 className={sectionTitleClasses}>Contact Information</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 gap-y-4 gap-x-5">
                                            <div className="space-y-1">
                                                <Label className={labelClasses}>Mobile Number (10 digits) *</Label>
                                                <div className="flex gap-2">
                                                    <div className="relative flex-1"><Smartphone className="absolute left-2 top-1.5 text-slate-400" size={12} /><Input required name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} placeholder="10-digit mobile number" className={`${inputClasses} pl-7 ${errors.mobileNumber ? 'border-red-400' : ''}`} disabled={mobileOtpVerified} maxLength={10} /></div>
                                                    {!mobileOtpVerified && <Button type="button" onClick={() => (mobileOtpSent ? verifyOtp('mobile') : requestOtp('mobile'))} disabled={isVerifying.mobile || formData.mobileNumber.length !== 10} className={`bg-[#23471d] text-[10px] h-7 px-2 whitespace-nowrap ${buttonTextClasses}`}>{isVerifying.mobile ? <Loader2 className="animate-spin" size={10} /> : (mobileOtpSent ? 'Verify' : 'Send')}</Button>}
                                                </div>
                                                <ErrorDisplay name="mobileNumber" errors={errors} />
                                                {mobileOtpSent && !mobileOtpVerified && <Input placeholder="Enter OTP" value={mobileOtpValue} onChange={(e) => setMobileOtpValue(e.target.value)} className={inputClasses} />}
                                            </div>
                                            <div><Label className={labelClasses}>Alternate Number (10 digits)</Label><Input name="alternateNumber" value={formData.alternateNumber} onChange={handleChange} placeholder="Optional" className={`${inputClasses} ${errors.alternateNumber ? 'border-red-400' : ''}`} maxLength={10} /><ErrorDisplay name="alternateNumber" errors={errors} /></div>
                                            <div className="space-y-1">
                                                <Label className={labelClasses}>Email Address (OTP) *</Label>
                                                <div className="flex gap-2">
                                                    <div className="relative flex-1"><AtSign className="absolute left-2 top-1.5 text-slate-400" size={12} /><Input type="email" required name="emailAddress" value={formData.emailAddress} onChange={handleChange} placeholder="Work Email" className={`${inputClasses} pl-7 ${errors.emailAddress ? 'border-red-400' : ''}`} disabled={emailOtpVerified} /></div>
                                                    {!emailOtpVerified && <Button type="button" onClick={() => (emailOtpSent ? verifyOtp('email') : requestOtp('email'))} disabled={isVerifying.email} className={`bg-[#23471d] text-[10px] h-7 px-2 whitespace-nowrap ${buttonTextClasses}`}>{isVerifying.email ? <Loader2 className="animate-spin" size={10} /> : (emailOtpSent ? 'Verify' : 'Send')}</Button>}
                                                </div>
                                                <ErrorDisplay name="emailAddress" errors={errors} />
                                                {emailOtpSent && !emailOtpVerified && <Input placeholder="Enter OTP" value={emailOtpValue} onChange={(e) => setEmailOtpValue(e.target.value)} className={inputClasses} />}
                                            </div>
                                            <div><Label className={labelClasses}>Website (Optional)</Label><Input name="website" value={formData.website} onChange={handleChange} placeholder="https://..." className={`${inputClasses} ${errors.website ? 'border-red-400' : ''}`} /><ErrorDisplay name="website" errors={errors} /></div>
                                        </div>
                                    </div>

                                    {/* Registered Address, State, City, Pin Code */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 gap-y-4 gap-x-5">
                                        <div><Label className={labelClasses}>Registered Address *</Label><Input required name="registeredAddress" value={formData.registeredAddress} onChange={handleChange} placeholder="Full Corporate Address" className={`${inputClasses} ${errors.registeredAddress ? 'border-red-400' : ''}`} /><ErrorDisplay name="registeredAddress" errors={errors} /></div>
                                        <div><Label className={labelClasses}>State/Province *</Label><Select value={formData.stateProvince} onValueChange={(v) => handleSelectChange('stateProvince', v)} disabled={loadingLocations.states}><SelectTrigger className={`${inputClasses} ${errors.stateProvince ? 'border-red-400' : ''}`}><SelectValue placeholder={loadingLocations.states ? "Loading..." : "Select State"} /></SelectTrigger><SelectContent className="bg-white font-sans text-[12px] max-h-[200px]">{states.map(s => <SelectItem key={s._id} value={s.name}>{s.name}</SelectItem>)}</SelectContent></Select><ErrorDisplay name="stateProvince" errors={errors} /></div>
                                        <div><Label className={labelClasses}>City *</Label><Select value={formData.city} onValueChange={(v) => handleSelectChange('city', v)} disabled={!formData.stateProvince || loadingLocations.cities}><SelectTrigger className={`${inputClasses} ${errors.city ? 'border-red-400' : ''}`}><SelectValue placeholder={loadingLocations.cities ? "Loading..." : "Select City"} /></SelectTrigger><SelectContent className="bg-white font-sans text-[12px] max-h-[200px]">{cities.map(c => <SelectItem key={c._id} value={c.name}>{c.name}</SelectItem>)}</SelectContent></Select><ErrorDisplay name="city" errors={errors} /></div>
                                        <div><Label className={labelClasses}>Pin Code (6 digits) *</Label><Input required name="pinCode" value={formData.pinCode} onChange={handleChange} placeholder="Postal Code" className={`${inputClasses} ${errors.pinCode ? 'border-red-400' : ''}`} maxLength={6} /><ErrorDisplay name="pinCode" errors={errors} /></div>
                                    </div>

                                    {/* 3. Business Profile */}
                                    <div className="space-y-2">
                                        <h3 className={sectionTitleClasses}> Business Profile</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 gap-y-4 gap-x-5">
                                            <div><Label className={labelClasses}>Years in Operation *</Label><Input type="date" required name="yearsInOperation" value={formData.yearsInOperation} onChange={handleChange} className={`${inputClasses} ${errors.yearsInOperation ? 'border-red-400' : ''}`} /><ErrorDisplay name="yearsInOperation" errors={errors} /></div>
                                            <div><Label className={labelClasses}>Annual Turnover *</Label><Select value={formData.annualTurnover} onValueChange={(v) => handleSelectChange('annualTurnover', v)}><SelectTrigger className={`${inputClasses} ${errors.annualTurnover ? 'border-red-400' : ''}`}><SelectValue placeholder="Choose Range" /></SelectTrigger><SelectContent className="bg-white font-sans text-[12px]">{config?.annualTurnoverRanges?.map((r: string) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent></Select><ErrorDisplay name="annualTurnover" errors={errors} /></div>
                                            <div><Label className={labelClasses}>Key Products / Services *</Label><Input required name="keyProductsServices" value={formData.keyProductsServices} onChange={handleChange} placeholder="Your primary offerings..." className={`${inputClasses} ${errors.keyProductsServices ? 'border-red-400' : ''}`} /><ErrorDisplay name="keyProductsServices" errors={errors} /></div>
                                        </div>
                                    </div>

                                    {/* 4. Sourcing & Buying Interests */}
                                    <div className="space-y-2">
                                        <h3 className={sectionTitleClasses}> Sourcing & Buying Interests</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 gap-y-4 gap-x-5">
                                            <div><Label className={labelClasses}>Primary Product Interest *</Label><Select value={formData.primaryProductInterest} onValueChange={(v) => handleSelectChange('primaryProductInterest', v)}><SelectTrigger className={`${inputClasses} ${errors.primaryProductInterest ? 'border-red-400' : ''}`}><SelectValue placeholder="Choose Interest" /></SelectTrigger><SelectContent className="bg-white font-sans text-[12px]">{config?.primaryProductInterests?.map((i: string) => <SelectItem key={i} value={i}>{i}</SelectItem>)}</SelectContent></Select><ErrorDisplay name="primaryProductInterest" errors={errors} /></div>
                                            <div>
                                                <Label className={labelClasses}>Secondary Product Categories</Label>
                                                <Select value={formData.secondaryProductCategories} onValueChange={(v) => handleSelectChange('secondaryProductCategories', v)}>
                                                    <SelectTrigger className={inputClasses}>
                                                        <SelectValue placeholder="Choose Interests" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-white font-sans text-[12px]">
                                                        {config?.secondaryProductCategories?.map((c: string) => (
                                                            <SelectItem key={c} value={c}>{c}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div><Label className={labelClasses}>Estimated Purchase Volume</Label><Input name="estimatedPurchaseVolume" value={formData.estimatedPurchaseVolume} onChange={handleChange} placeholder="e.g. 5000 Units" className={inputClasses} /><div className="h-3" /></div>
                                            <div><Label className={labelClasses}>Budget Range</Label><Select value={formData.budgetRange} onValueChange={(v) => handleSelectChange('budgetRange', v)}><SelectTrigger className={inputClasses}><SelectValue placeholder="Choose Budget" /></SelectTrigger><SelectContent className="bg-white font-sans text-[12px]">{config?.budgetRanges?.map((b: string) => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent></Select><div className="h-3" /></div>
                                        </div>
                                        <div className="mt-1">
                                            <Label className={labelClasses}>Specific Product Requirements</Label>
                                            <Textarea name="specificProductRequirements" value={formData.specificProductRequirements} onChange={handleChange} className={`${inputClasses} h-auto min-h-[50px] py-1`} placeholder="Any custom needs..." />
                                        </div>
                                    </div>

                                    {/* 5. Supplier Preference */}
                                    <div className="space-y-2">
                                        <h3 className={sectionTitleClasses}> Supplier Preference (India Only)</h3>
                                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 gap-y-4 gap-x-5">
                                            <div className="space-y-1">
                                                <Label className={labelClasses}>Preferred Supplier Region *</Label>
                                                <div className={`p-2 border rounded-lg bg-white ${errors.preferredSupplierRegion ? 'border-red-400' : 'border-slate-400'}`}>
                                                    <div className="flex flex-wrap gap-2">
                                                        {['North India', 'South India', 'East India', 'West India', 'Pan India'].map((r: string) => (
                                                            <label key={r} className={`flex items-center gap-1 text-[12px] font-medium text-slate-700 font-sans bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-[2px] cursor-pointer hover:border-emerald-500`}>
                                                                <Checkbox checked={formData.preferredSupplierRegion.includes(r)} onCheckedChange={(checked) => handleCheckboxChange('preferredSupplierRegion', r, !!checked)} className="h-3 w-3" /> {r}
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                                <ErrorDisplay name="preferredSupplierRegion" errors={errors} />
                                            </div>
                                            <div className="space-y-1">
                                                <Label className={labelClasses}>Preferred Supplier Type *</Label>
                                                <div className={`p-2 border rounded-lg bg-white ${errors.preferredSupplierType ? 'border-red-400' : 'border-slate-400'}`}>
                                                    <div className="flex flex-wrap gap-2">
                                                        {['Manufacturer', 'Exporter', 'MSME', 'Startup', 'Wholesaler'].map((t: string) => (
                                                            <label key={t} className={`flex items-center gap-1 text-[12px] font-medium text-slate-700 font-sans bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-[2px] cursor-pointer hover:border-emerald-500`}>
                                                                <Checkbox checked={formData.preferredSupplierType.includes(t)} onCheckedChange={(checked) => handleCheckboxChange('preferredSupplierType', t, !!checked)} className="h-3 w-3" /> {t}
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                                <ErrorDisplay name="preferredSupplierType" errors={errors} />
                                            </div>
                                            <div>
                                                <Label className={labelClasses}>Preferred State (Optional)</Label>
                                                <Select value={formData.preferredState} onValueChange={(v) => handleSelectChange('preferredState', v)}>
                                                    <SelectTrigger className={inputClasses}>
                                                        <SelectValue placeholder="Select State" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-white font-sans text-[12px] max-h-[200px]">
                                                        {states.map(s => (
                                                            <SelectItem key={s._id} value={s.name}>{s.name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div><Label className={labelClasses}>Preferred Company Size</Label><Select value={formData.preferredCompanySize} onValueChange={(v) => handleSelectChange('preferredCompanySize', v)}><SelectTrigger className={inputClasses}><SelectValue placeholder="Select Size" /></SelectTrigger><SelectContent className="bg-white font-sans text-[12px]">{config?.companySizes?.map((s: string) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select></div>
                                        </div>
                                    </div>

                                    {/* 6. Purchase Intent & Capacity */}
                                    <div className="space-y-2 ">
                                        <h3 className={sectionTitleClasses}> Purchase Intent & Capacity</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 gap-y-4 gap-x-5">
                                            <div><Label className={labelClasses}>Buying Frequency *</Label><Select value={formData.buyingFrequency} onValueChange={(v) => handleSelectChange('buyingFrequency', v)}><SelectTrigger className={`${inputClasses} ${errors.buyingFrequency ? 'border-red-400' : ''}`}><SelectValue placeholder="Select" /></SelectTrigger><SelectContent className="bg-white font-sans text-[12px]">{['One-time', 'Monthly', 'Quarterly', 'Long-term'].map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent></Select><ErrorDisplay name="buyingFrequency" errors={errors} /></div>
                                            <div><Label className={labelClasses}>Est. Annual Purchase Value *</Label><Select value={formData.estimatedAnnualPurchaseValue} onValueChange={(v) => handleSelectChange('estimatedAnnualPurchaseValue', v)}><SelectTrigger className={`${inputClasses} ${errors.estimatedAnnualPurchaseValue ? 'border-red-400' : ''}`}><SelectValue placeholder="Choose Range" /></SelectTrigger><SelectContent className="bg-white font-sans text-[12px]">{config?.annualPurchaseValueRanges?.map((v: string) => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent></Select><ErrorDisplay name="estimatedAnnualPurchaseValue" errors={errors} /></div>
                                            <div><Label className={labelClasses}>Purchase Timeline *</Label><Select value={formData.purchaseTimeline} onValueChange={(v) => handleSelectChange('purchaseTimeline', v)}><SelectTrigger className={`${inputClasses} ${errors.purchaseTimeline ? 'border-red-400' : ''}`}><SelectValue placeholder="Select" /></SelectTrigger><SelectContent className="bg-white font-sans text-[12px]">{['Immediate', '1–3 Months', '3–6 Months', 'Exploring'].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></Select><ErrorDisplay name="purchaseTimeline" errors={errors} /></div>
                                            <div><Label className={labelClasses}>Matchmaking Interest *</Label><Select value={formData.matchmakingInterest} onValueChange={(v) => handleSelectChange('matchmakingInterest', v)}><SelectTrigger className={`${inputClasses} ${errors.matchmakingInterest ? 'border-red-400' : ''}`}><SelectValue placeholder="Yes/No" /></SelectTrigger><SelectContent className="bg-white font-sans text-[12px]}"><SelectItem value="Yes">Yes</SelectItem><SelectItem value="No">No</SelectItem></SelectContent></Select><ErrorDisplay name="matchmakingInterest" errors={errors} /></div>
                                            <div><Label className={labelClasses}>Role in Purchase Decision *</Label><Select value={formData.roleInPurchaseDecision} onValueChange={(v) => handleSelectChange('roleInPurchaseDecision', v)}><SelectTrigger className={`${inputClasses} ${errors.roleInPurchaseDecision ? 'border-red-400' : ''}`}><SelectValue placeholder="Select Role" /></SelectTrigger><SelectContent className="bg-white font-sans text-[12px]}">{['Final Decision Maker', 'Influencer', 'Research Only'].map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent></Select><ErrorDisplay name="roleInPurchaseDecision" errors={errors} /></div>
                                        </div>
                                    </div>

                                    {/* 7. Certification & Compliance + 8. Pricing Preference */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 gap-y-4 gap-x-5">
                                        <div className="space-y-2">
                                            <h3 className={sectionTitleClasses}> Certification & Compliance</h3>
                                            <div className="flex flex-wrap gap-2 p-2 border rounded-lg bg-white">
                                                {['ISO', 'GMP', 'FDA', 'AYUSH', 'Organic', 'Others'].map((c: string) => (
                                                    <label key={c} className={`flex items-center gap-1 text-[12px] font-medium text-slate-700 font-sans bg-slate-50 px-2 py-0.5 rounded border border-slate-400 cursor-pointer hover:bg-emerald-50`}>
                                                        <Checkbox checked={formData.requiredCertifications.includes(c)} onCheckedChange={(checked) => handleCheckboxChange('requiredCertifications', c, !!checked)} className="h-3 w-3" /> {c}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className={sectionTitleClasses}> Pricing Preference</h3>
                                            <div className="flex gap-4 p-2">
                                                <label className={`flex items-center gap-1 text-[12px] font-medium text-slate-700 font-sans`}><Checkbox checked={formData.pricingPreference === 'Premium'} onCheckedChange={() => handleSelectChange('pricingPreference', 'Premium')} className="h-3 w-3" /> Premium</label>
                                                <label className={`flex items-center gap-1 text-[12px] font-medium text-slate-700 font-sans`}><Checkbox checked={formData.pricingPreference === 'Mid-Range'} onCheckedChange={() => handleSelectChange('pricingPreference', 'Mid-Range')} className="h-3 w-3" /> Mid-Range</label>
                                                <label className={`flex items-center gap-1 text-[12px] font-medium text-slate-700 font-sans`}><Checkbox checked={formData.pricingPreference === 'Budget'} onCheckedChange={() => handleSelectChange('pricingPreference', 'Budget')} className="h-3 w-3" /> Budget</label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 9. B2B Meeting Preferences */}
                                    <div className="space-y-2">
                                        <h3 className={sectionTitleClasses}> B2B Meeting Preferences</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 gap-y-4 gap-x-5">
                                            <div><Label className={labelClasses}>Preferred Meeting Date *</Label><Input type="date" required name="preferredMeetingDate" value={formData.preferredMeetingDate} onChange={handleChange} className={`${inputClasses} ${errors.preferredMeetingDate ? 'border-red-400' : ''}`} /><ErrorDisplay name="preferredMeetingDate" errors={errors} /></div>
                                            <div><Label className={labelClasses}>Preferred Time Slot *</Label><Select value={formData.preferredTimeSlot} onValueChange={(v) => handleSelectChange('preferredTimeSlot', v)}><SelectTrigger className={`${inputClasses} ${errors.preferredTimeSlot ? 'border-red-400' : ''}`}><SelectValue placeholder="Select Slot" /></SelectTrigger><SelectContent className="bg-white font-sans text-[12px]}"><SelectItem value="Morning (10AM - 1PM)">Morning (10AM - 1PM)</SelectItem><SelectItem value="Afternoon (2PM - 4PM)">Afternoon (2PM - 4PM)</SelectItem><SelectItem value="Evening (4PM - 6PM)">Evening (4PM - 6PM)</SelectItem></SelectContent></Select><ErrorDisplay name="preferredTimeSlot" errors={errors} /></div>
                                            <div><Label className={labelClasses}>Pre-scheduled B2B *</Label><Select value={formData.requirePreScheduledB2B} onValueChange={(v) => handleSelectChange('requirePreScheduledB2B', v)}><SelectTrigger className={inputClasses}><SelectValue placeholder="Yes/No" /></SelectTrigger><SelectContent className="bg-white font-sans text-[12px]}"><SelectItem value="Yes">Yes</SelectItem><SelectItem value="No">No</SelectItem></SelectContent></Select><div className="h-3" /></div>
                                            <div><Label className={labelClasses}>Meeting Priority Level *</Label><Select value={formData.meetingPriorityLevel} onValueChange={(v) => handleSelectChange('meetingPriorityLevel', v)}><SelectTrigger className={inputClasses}><SelectValue placeholder="Priority" /></SelectTrigger><SelectContent className="bg-white font-sans text-[12px]}">{(config?.meetingPriorityLevels || ['Low', 'Medium', 'High']).map((m: string) => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent></Select><div className="h-3" /></div>
                                        </div>
                                    </div>

                                    {/* 10. Registration Category */}
                                    <div className="space-y-4">
                                        <h3 className={sectionTitleClasses}> Registration Category 🔹</h3>

                                        {!showMembershipOptions ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
                                                {passPackages.map((pkg: any) => (
                                                    <div
                                                        key={pkg.name}
                                                        onClick={() => handlePackageSelection(pkg)}
                                                        className={`relative p-4 border-2 transition-all cursor-pointer rounded-xl flex flex-col h-full font-sans ${formData.registrationCategory === pkg.name ? 'border-[#23471d] bg-white shadow-xl ring-4 ring-emerald-50' : 'border-slate-200 bg-white hover:border-emerald-200'}`}
                                                    >
                                                        <div className="flex justify-between items-start mb-2 gap-2">
                                                            <h4 className="text-[14px] font-black leading-tight text-slate-800 font-sans">
                                                                {pkg.name}
                                                            </h4>
                                                        </div>
                                                        <div className="flex-1 space-y-2">
                                                            <ul className="text-[11px] text-slate-700 space-y-1.5 font-medium font-sans">
                                                                {pkg.benefits.map((b: string, i: number) => (
                                                                    <li key={i} className="flex items-start gap-2">
                                                                        <span className="text-emerald-600 font-black mt-0.5 whitespace-nowrap">✓</span>
                                                                        <span>{b}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                        <div className={`mt-3 w-full py-2 rounded-lg text-center text-[11px] font-black uppercase tracking-wider transition-all font-sans ${formData.registrationCategory === pkg.name ? 'bg-[#23471d] text-white' : 'bg-slate-50 text-slate-400 hover:bg-emerald-50 hover:text-emerald-700'}`}>
                                                            {formData.registrationCategory === pkg.name ? "Selected ✅" : "Select 👉"}
                                                        </div>
                                                    </div>
                                                ))}

                                                {/* Membership Trigger Card */}
                                                <div
                                                    onClick={() => setShowMembershipOptions(true)}
                                                    className="relative p-3 border-2 border-dashed border-emerald-300 bg-emerald-50/20 transition-all cursor-pointer rounded-xl flex flex-col justify-center items-center text-center hover:border-emerald-500 hover:bg-emerald-50/40 h-full min-h-[200px] font-sans"
                                                >
                                                    <h4 className="text-[14px] font-black text-emerald-800 mb-1 font-sans">Membership Option</h4>
                                                    <div className={`text-[11px] text-emerald-500 font-bold uppercase mt-2 px-4 py-1.5 border border-emerald-200 rounded-full bg-white shadow-sm font-sans`}>View More Plans →</div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between px-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                                        <p className="text-[11px] font-black text-slate-600 uppercase tracking-[0.2em] font-sans">Exclusive Membership Plans</p>
                                                    </div>
                                                    <Button type="button" onClick={() => setShowMembershipOptions(false)} variant="ghost" className={`h-8 text-[11px] text-emerald-700 font-black hover:bg-emerald-50 border border-emerald-100 ${buttonTextClasses}`}>← Back</Button>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
                                                    {membershipPackages.map((pkg: any) => (
                                                        <div
                                                            key={pkg.name}
                                                            onClick={() => handlePackageSelection(pkg)}
                                                            className={`relative p-4 border-2 transition-all cursor-pointer rounded-xl flex flex-col h-full font-sans ${formData.registrationCategory === pkg.name ? 'border-[#23471d] bg-white shadow-xl ring-4 ring-emerald-50' : 'border-slate-200 bg-white hover:border-emerald-200'}`}
                                                        >
                                                            <div className="flex justify-between items-start mb-2 gap-2">
                                                                <h4 className="text-[14px] font-black leading-tight text-slate-800 font-sans">
                                                                    {pkg.name}
                                                                </h4>
                                                            </div>

                                                            <div className="flex-1 space-y-2">
                                                                <ul className="text-[11px] text-slate-600 space-y-1.5 font-medium font-sans">
                                                                    {pkg.benefits.map((b: string, i: number) => (
                                                                        <li key={i} className="flex items-start gap-2">
                                                                            <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                                                                            <span>{b}</span>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>

                                                            <div className={`mt-4 w-full py-2 rounded-lg text-center text-[11px] font-black uppercase tracking-wider transition-all font-sans ${formData.registrationCategory === pkg.name ? 'bg-[#23471d] text-white' : 'bg-slate-50 text-slate-400 hover:bg-emerald-50 hover:text-emerald-700'}`}>
                                                                {formData.registrationCategory === pkg.name ? "Selected ✅" : "Select 👉"}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Submit Section */}
                                    <div className="pt-4 flex flex-col items-center border-t border-slate-100">
                                        <Button type="submit" disabled={isSubmitting} className={`w-inline h-8 bg-[#23471d] hover:bg-[#1a3516] rounded-sm text-white shadow-md transition-all flex items-center justify-center gap-2 ${buttonTextClasses}`}>{isSubmitting ? <Loader2 size={12} className="animate-spin" /> : <>Submit Registration <Send size={11} /></>}</Button>
                                        <p className="mt-1 text-[8px] text-slate-400 font-bold uppercase tracking-wide flex items-center gap-1 font-sans"><Shield size={8} className="text-[#23471d]" /> Secured Registration System</p>
                                    </div>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* Comprehensive Terms & Conditions Modal with Policies */}
            <AnimatePresence>
                {showTermsModal && tempSelectedPackage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden"
                        >
                            {/* Header */}
                            <div className="bg-[#23471d] p-4 text-white flex justify-between items-center sticky top-0 z-10">
                                <div>
                                    <h3 className="font-bold uppercase tracking-wider text-sm font-sans">Registration & Payment Terms</h3>
                                    <p className="text-[9px] text-emerald-300 uppercase tracking-[0.2em] font-medium font-sans">
                                        {tempSelectedPackage?.name} - ₹{tempSelectedPackage?.price}
                                    </p>
                                </div>
                                <button onClick={() => setShowTermsModal(false)} className="hover:rotate-90 transition-transform text-white">
                                    ✕
                                </button>
                            </div>

                            {/* Policy Tabs */}
                            <div className="flex border-b bg-slate-50 sticky top-[57px] z-10">
                                <button
                                    onClick={() => setActivePolicyTab('payment')}
                                    className={`flex-1 px-4 py-2.5 text-[11px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${activePolicyTab === 'payment' ? 'bg-white text-[#23471d] border-b-2 border-[#23471d]' : 'text-slate-500 hover:text-[#23471d]'}`}
                                >
                                    <FileText size={14} /> Payment Terms
                                </button>
                                <button
                                    onClick={() => setActivePolicyTab('refund')}
                                    className={`flex-1 px-4 py-2.5 text-[11px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${activePolicyTab === 'refund' ? 'bg-white text-[#23471d] border-b-2 border-[#23471d]' : 'text-slate-500 hover:text-[#23471d]'}`}
                                >
                                    <AlertTriangle size={14} /> Refund Policy
                                </button>
                                <button
                                    onClick={() => setActivePolicyTab('privacy')}
                                    className={`flex-1 px-4 py-2.5 text-[11px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${activePolicyTab === 'privacy' ? 'bg-white text-[#23471d] border-b-2 border-[#23471d]' : 'text-slate-500 hover:text-[#23471d]'}`}
                                >
                                    <Lock size={14} /> Privacy Policy
                                </button>
                            </div>

                            {/* Policy Content */}
                            <div className="p-6 overflow-y-auto text-[12px] leading-relaxed text-slate-600 space-y-4 font-medium custom-scrollbar font-sans flex-1">
                                {activePolicyTab === 'payment' && (
                                    <div className="space-y-4">
                                        <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
                                            <p className="text-red-700 font-bold text-[11px] uppercase">⚠️ IMPORTANT: STRICT NO REFUND POLICY</p>
                                            <p className="text-red-600 text-[11px] mt-1">All payments are FINAL, NON-REFUNDABLE, and NON-TRANSFERABLE under any circumstances.</p>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-slate-800 mb-2 text-[13px]">1. Acceptance of Terms</h4>
                                            <p>By proceeding with registration and/or payment, the Participant confirms that they have read, understood, and agreed to these Terms & Conditions and enters into a legally binding agreement with Namo Gange Wellness Pvt. Ltd. under the provisions of the Indian Contract Act, 1872.</p>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-slate-800 mb-2 text-[13px]">2. Scope of Payment</h4>
                                            <p>Payments made through this platform may include, but are not limited to: Exhibition Stall Booking, Sponsorship Packages, Buyer/Seller Registration, Delegate Registration, Seminar/Conference Participation, and ICOA Buyer Membership.</p>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-slate-800 mb-2 text-[13px]">3. Payment Confirmation</h4>
                                            <p>Registration/booking shall be deemed confirmed only upon successful receipt of payment by the Organiser. A confirmation email, receipt, or invoice shall be issued upon successful transaction.</p>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-slate-800 mb-2 text-[13px]">4. Pricing & Taxes</h4>
                                            <p>All fees are exclusive of applicable taxes (including GST), unless otherwise specified. The Participant agrees to bear all applicable taxes, duties, and statutory charges.</p>
                                        </div>

                                        <div className="bg-red-50 p-3 rounded">
                                            <h4 className="font-bold text-red-700 mb-2 text-[13px]">5. Strict No Refund & Non-Transfer Policy</h4>
                                            <p className="font-bold">ALL PAYMENTS ARE FINAL, NON-REFUNDABLE, AND NON-TRANSFERABLE.</p>
                                            <p className="mt-1">No refund shall be provided under any circumstances, including but not limited to: Cancellation by the Participant, No-show or partial participation, Change in business plans, schedule, or preferences.</p>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-slate-800 mb-2 text-[13px]">6. Cancellation / Rescheduling by Organiser</h4>
                                            <p>The Organiser reserves the right to reschedule or modify the Event. In such cases, registration shall remain valid for revised dates. No refund obligation shall arise.</p>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-slate-800 mb-2 text-[13px]">7. Payment Modes</h4>
                                            <p>Payments shall be made only through authorised channels: UPI, Net Banking, Debit Card, Credit Card, or Official Bank Transfer.</p>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-slate-800 mb-2 text-[13px]">8. Chargeback & Fraud Policy</h4>
                                            <p>Initiating a chargeback without valid grounds shall be treated as breach of agreement. The Organiser reserves the right to suspend or cancel participation and recover dues through legal means.</p>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-slate-800 mb-2 text-[13px]">9. Limitation of Liability</h4>
                                            <p>The Organiser shall not be liable for any direct or indirect loss, business loss, missed opportunities, or damages. Participation is at the sole risk of the Participant.</p>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-slate-800 mb-2 text-[13px]">10. Governing Law & Jurisdiction</h4>
                                            <p>These Terms shall be governed by the laws of India. All disputes shall be subject to the exclusive jurisdiction of Courts in Delhi NCR, India.</p>
                                        </div>
                                    </div>
                                )}

                                {activePolicyTab === 'refund' && (
                                    <div className="space-y-4">
                                        <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
                                            <p className="text-red-700 font-bold text-[11px] uppercase">⚠️ STRICT NO REFUND POLICY</p>
                                            <p className="text-red-600 text-[11px] mt-1">All payments made to Namo Gange Wellness Pvt. Ltd. are strictly non-refundable and non-transferable.</p>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-slate-800 mb-2 text-[13px]">1. Scope of Policy</h4>
                                            <p>This Refund & Cancellation Policy governs all payments made towards Exhibition Stall Booking, Sponsorship Packages, Buyer/Seller Registration, Delegate Registration, Seminar/Conference Participation, and ICOA Buyer Membership.</p>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-slate-800 mb-2 text-[13px]">2. General Refund Policy</h4>
                                            <p className="font-bold">All payments made to Namo Gange Wellness Pvt. Ltd. are strictly non-refundable and non-transferable. By making payment, the Participant acknowledges and agrees to this policy.</p>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-slate-800 mb-2 text-[13px]">3. No Refund Scenarios</h4>
                                            <p>No refund shall be provided under any circumstances, including but not limited to:</p>
                                            <ul className="list-disc pl-5 mt-1 space-y-1">
                                                <li>Cancellation by the Participant for any reason</li>
                                                <li>Non-attendance (no-show)</li>
                                                <li>Partial participation or early exit</li>
                                                <li>Change in business plans, priorities, or schedule</li>
                                                <li>Dissatisfaction with business outcomes or networking results</li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-slate-800 mb-2 text-[13px]">4. Event Rescheduling / Modification</h4>
                                            <p>The Organiser reserves the right to reschedule, modify, or change venue or format of the Event. In such cases, the registration/booking shall remain valid for the revised event. No refund shall be applicable.</p>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-slate-800 mb-2 text-[13px]">5. Event Cancellation by Organiser</h4>
                                            <p>In rare circumstances, if the Event is cancelled, the Organiser may, at its sole discretion, offer credit for future events or provide alternative participation benefits. Refunds, if any, shall be at the sole discretion of the Organiser and not a matter of right.</p>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-slate-800 mb-2 text-[13px]">6. Non-Transferability</h4>
                                            <p>Registration, booking, or membership is non-transferable. Substitution of participant is not allowed without prior written approval.</p>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-slate-800 mb-2 text-[13px]">7. Force Majeure</h4>
                                            <p>No refund or liability shall arise due to natural disasters, government restrictions, pandemic, or unforeseen circumstances.</p>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-slate-800 mb-2 text-[13px]">8. Governing Law & Jurisdiction</h4>
                                            <p>This Policy shall be governed by the laws of India. Subject to exclusive jurisdiction of Courts in Delhi NCR, India.</p>
                                        </div>
                                    </div>
                                )}

                                {activePolicyTab === 'privacy' && (
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-bold text-slate-800 mb-2 text-[13px]">1. Scope and Applicability</h4>
                                            <p>This Privacy Policy governs the collection, use, processing, storage, and disclosure of personal data by Namo Gange Wellness Pvt. Ltd. in relation to website access, exhibition participation, buyer-seller meet, conferences, registrations, memberships, sponsorships, and payments.</p>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-slate-800 mb-2 text-[13px]">2. Legal Basis for Processing</h4>
                                            <p>We process personal data in accordance with the Information Technology Act, 2000 and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.</p>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-slate-800 mb-2 text-[13px]">3. Categories of Information Collected</h4>
                                            <p><strong>Personal Information:</strong> Full name, designation, organisation name, contact details (mobile number, email address), address (city, state, country).</p>
                                            <p className="mt-1"><strong>Business Information:</strong> Business profile, turnover, industry, product interests, sourcing preferences.</p>
                                            <p className="mt-1"><strong>Financial & Transactional Information:</strong> Transaction reference numbers, payment status (processed via authorised payment gateways).</p>
                                            <p className="mt-1 text-[11px] text-slate-500">Note: We do not collect or store sensitive banking details such as card numbers, CVV, or passwords.</p>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-slate-800 mb-2 text-[13px]">4. Purpose of Data Processing</h4>
                                            <p>Personal data is collected and processed for registration and event participation management, buyer-seller matchmaking and business networking, communication (email, SMS, WhatsApp, calls), issuance of invoices, badges, passes, and confirmations, marketing and promotions (subject to consent), and legal compliance.</p>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-slate-800 mb-2 text-[13px]">5. Data Sharing & Disclosure</h4>
                                            <p>We may share personal data strictly on a need-to-know basis with event participants (exhibitors, buyers, business stakeholders for matchmaking purposes), associate partners (ICOA and Namo Gange Trust), and service providers (payment gateways, CRM, IT infrastructure).</p>
                                            <p className="mt-1 font-bold">We do not sell, rent, or trade personal data to third parties.</p>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-slate-800 mb-2 text-[13px]">6. Data Security Measures</h4>
                                            <p>The Company implements reasonable security practices including secure servers, encrypted systems, access control, and restricted data access. However, no digital system is completely secure, and data is shared at the Participant's own risk.</p>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-slate-800 mb-2 text-[13px]">7. User Rights</h4>
                                            <p>Subject to applicable laws, Participants may request access to their personal data, request correction or updating of inaccurate data, and withdraw consent for marketing communications.</p>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-slate-800 mb-2 text-[13px]">8. Governing Law & Jurisdiction</h4>
                                            <p>This Policy shall be governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Delhi NCR, India.</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Footer with Consent Checkboxes */}
                            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col gap-3 sticky bottom-0">
                                <div className="space-y-2">
                                    <div className="flex items-start gap-3 p-2 hover:bg-white rounded transition-colors">
                                        <Checkbox
                                            id="consent-payment"
                                            checked={policyConsents.paymentTerms}
                                            onCheckedChange={(checked) => setPolicyConsents(prev => ({ ...prev, paymentTerms: !!checked }))}
                                        />
                                        <Label htmlFor="consent-payment" className="text-[11px] leading-tight text-slate-700 font-medium cursor-pointer">
                                            I have read, understood, and agree to the <span className="font-bold text-[#23471d]">Payment Terms & Conditions</span>, including the strictly non-refundable and non-transferable policy.
                                        </Label>
                                    </div>

                                    <div className="flex items-start gap-3 p-2 hover:bg-white rounded transition-colors">
                                        <Checkbox
                                            id="consent-refund"
                                            checked={policyConsents.refundPolicy}
                                            onCheckedChange={(checked) => setPolicyConsents(prev => ({ ...prev, refundPolicy: !!checked }))}
                                        />
                                        <Label htmlFor="consent-refund" className="text-[11px] leading-tight text-slate-700 font-medium cursor-pointer">
                                            I have read, understood, and agree to the <span className="font-bold text-red-600">Refund & Cancellation Policy</span>, acknowledging that all payments are strictly non-refundable.
                                        </Label>
                                    </div>

                                    <div className="flex items-start gap-3 p-2 hover:bg-white rounded transition-colors">
                                        <Checkbox
                                            id="consent-privacy"
                                            checked={policyConsents.privacyPolicy}
                                            onCheckedChange={(checked) => setPolicyConsents(prev => ({ ...prev, privacyPolicy: !!checked }))}
                                        />
                                        <Label htmlFor="consent-privacy" className="text-[11px] leading-tight text-slate-700 font-medium cursor-pointer">
                                            I hereby provide my consent for the collection, processing, storage, and sharing of my personal data in accordance with the <span className="font-bold text-[#23471d]">Privacy Policy</span>.
                                        </Label>
                                    </div>
                                </div>

                                <div className="flex gap-2 mt-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => setShowTermsModal(false)}
                                        className={`flex-1 h-9 text-xs font-sans ${buttonTextClasses}`}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={confirmPackage}
                                        disabled={!policyConsents.paymentTerms || !policyConsents.refundPolicy || !policyConsents.privacyPolicy}
                                        className={`flex-1 h-9 bg-[#23471d] hover:bg-[#1a3516] text-white ${buttonTextClasses} disabled:opacity-50 disabled:cursor-not-allowed`}
                                    >
                                        Agree & Proceed to Payment 💳
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Error Display Component
const ErrorDisplay = ({ name, errors }: { name: string; errors: Record<string, string> }) => (
    errors[name] ? <span className="text-red-500 text-[10px] mt-0.5 block h-3 font-medium animate-in fade-in slide-in-from-top-1">{errors[name]}</span> : <div className="h-3" />
);

export default BuyerRegistration;