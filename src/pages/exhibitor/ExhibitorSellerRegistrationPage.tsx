import { useState, useEffect, useRef } from 'react';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import { motion } from 'framer-motion';
import { 
    Landmark, User, Building2, Save, ArrowRight, 
    ShieldCheck, CheckCircle2, Globe, Sparkles, Zap, Target,
    ArrowLeft, Check
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
    const isInitialized = useRef(false);

    const [sellerDetails, setSellerDetails] = useState({
        bankName: '',
        accountHolder: '',
        accountNumber: '',
        ifscCode: '',
        branch: '',
        accountType: 'Current',
        brandName: '',
        gstNumber: '',
        panNumber: '',
        businessRegistrationNo: '',
        productCategories: '',
        website: '',
    });

    useEffect(() => {
        if (data && !isInitialized.current) {
            setSellerDetails({
                bankName: data.bankDetails?.bankName || '',
                accountHolder: data.bankDetails?.accountHolder || data.exhibitorName || '',
                accountNumber: data.bankDetails?.accountNumber || '',
                ifscCode: data.bankDetails?.ifscCode || '',
                branch: data.bankDetails?.branch || '',
                accountType: data.bankDetails?.accountType || 'Current',
                brandName: data.brandName || data.fasciaName || data.exhibitorName || '',
                gstNumber: data.gstNo || data.billing?.gst || data.msme?.gstNumber || '',
                panNumber: data.panNo || data.billing?.pan || data.msme?.panNumber || '',
                businessRegistrationNo: data.businessRegistrationNo || data.msme?.udyamRegNo || '',
                productCategories: data.productCategories || '',
                website: data.website || '',
            });
            isInitialized.current = true;
        }
    }, [data]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setSellerDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (value: string) => {
        setSellerDetails(prev => ({ ...prev, accountType: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!sellerDetails.brandName || !sellerDetails.bankName || !sellerDetails.accountNumber || !sellerDetails.ifscCode) {
            toast.error("Please fill all required fields (Brand & Bank Info)");
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem('exhibitorToken');
            const res = await fetch(`${API_URL}/exhibitor-auth/register-seller?id=${data._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ sellerDetails })
            });

            const result = await res.json();
            if (result.success) {
                toast.success("Registration submitted successfully!");
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

    if (success || data?.isSeller) {
        return (
            <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto mt-12 bg-white rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100"
            >
                <div className="bg-[#23471d] p-12 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
                    <motion.div 
                        initial={{ scale: 0 }} 
                        animate={{ scale: 1 }} 
                        transition={{ type: 'spring', damping: 12 }}
                        className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 border border-white/30"
                    >
                        <CheckCircle2 className="w-12 h-12 text-white" />
                    </motion.div>
                    <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">Application Submitted</h2>
                    <p className="text-white/70 text-sm max-w-md mx-auto leading-relaxed">
                        Your request to become a premium seller has been received and is currently being processed by our compliance team.
                    </p>
                </div>

                <div className="p-12 text-center bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                            <ShieldCheck className="w-8 h-8 text-[#d26019] mx-auto mb-3" />
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</h4>
                            <p className="text-sm font-bold text-slate-900 uppercase">
                                {data?.sellerStatus === 'active' ? 'Account Active' : 'Under Review'}
                            </p>
                        </div>
                        <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                            <Building2 className="w-8 h-8 text-[#23471d] mx-auto mb-3" />
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Seller ID</h4>
                            <p className="text-sm font-bold text-slate-900 uppercase">{data.registrationId}</p>
                        </div>
                        <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                            <Globe className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Tier</h4>
                            <p className="text-sm font-bold text-slate-900 uppercase">Premium Global</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button 
                            onClick={() => window.location.href = '/exhibitor-dashboard'}
                            className="w-full sm:w-auto h-12 px-10 bg-[#23471d] hover:bg-[#1a3516] text-white font-bold rounded-lg shadow-lg"
                        >
                            Back to Workspace
                        </Button>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-20 pt-4">
            {/* Hero Header */}
            <header className="relative bg-white rounded-2xl p-10 border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)] overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-slate-50 to-transparent pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-[#d26019]/10 text-[#d26019] text-[10px] font-black uppercase tracking-widest rounded-full border border-[#d26019]/20">
                                Trade Expansion
                            </span>
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">
                            Become a <span className="text-[#23471d] italic font-serif">Verified Seller</span>
                        </h1>
                        <p className="text-slate-500 text-sm max-w-xl font-medium leading-relaxed">
                            Complete your business profile once to unlock global B2B matching and marketing tools.
                        </p>
                    </div>
                    <div className="bg-slate-900 text-white p-6 rounded-xl shadow-xl min-w-[200px] border border-white/10">
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] block mb-1">Exhibitor Registration</span>
                        <div className="text-2xl font-black tracking-tighter text-[#d26019]">{data.registrationId}</div>
                    </div>
                </div>
            </header>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Benefits & Guidance */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="sticky top-8 space-y-6">
                        {/* Perks Card */}
                        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <Sparkles size={16} className="text-[#d26019]" /> Premium Perks
                            </h3>
                            <div className="space-y-6">
                                {[
                                    { title: 'Global Exposure', desc: 'Listing in the 2026 Trade Directory.', icon: Globe },
                                    { title: 'Priority B2B', desc: 'Early access to the Matchmaking scheduler.', icon: Target },
                                    { title: 'Marketing Kit', desc: 'Custom social media graphics.', icon: Zap },
                                ].map((benefit, idx) => (
                                    <div key={idx} className="flex gap-4 group">
                                        <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-[#23471d] group-hover:text-white transition-all duration-300">
                                            <benefit.icon size={18} />
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-tight mb-1">{benefit.title}</h4>
                                            <p className="text-[11px] text-slate-500 leading-relaxed">{benefit.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10 pt-8 border-t border-slate-50">
                                <Button 
                                    type="submit" 
                                    disabled={loading}
                                    className="w-full h-14 bg-[#d26019] hover:bg-[#a84c14] text-white font-black text-[11px] uppercase tracking-widest rounded-xl shadow-[0_10px_30px_rgba(210,96,25,0.3)] active:scale-95 transition-all"
                                >
                                    {loading ? "Authorizing..." : "Submit Registration"}
                                </Button>
                                <p className="text-center text-[9px] font-bold text-slate-400 uppercase mt-4">
                                    Final step to unlock business portal
                                </p>
                            </div>
                        </div>

                        {/* Checklist Card */}
                        <div className="bg-[#f8fafc] p-8 rounded-2xl border border-slate-200">
                            <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] mb-6">Documents Checklist</h3>
                            <div className="space-y-4">
                                {[
                                    { label: 'GSTIN / Tax Certificate', required: true },
                                    { label: 'Corporate PAN Card', required: true },
                                    { label: 'Bank Account / Cancelled Cheque', required: true },
                                    { label: 'Business Registration Proof', required: false },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="mt-1">
                                            <div className="w-4 h-4 rounded border-2 border-[#23471d] flex items-center justify-center">
                                                <Check size={10} className="text-[#23471d]" />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-bold text-slate-700">{item.label}</p>
                                            {item.required && <span className="text-[9px] text-[#d26019] font-black uppercase tracking-tighter">Mandatory</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Trust & Support */}
                        <div className="bg-slate-900 p-8 rounded-2xl text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <ShieldCheck size={60} />
                            </div>
                            <h3 className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-4">Support & Trust</h3>
                            <p className="text-xs font-medium text-white/70 mb-6 leading-relaxed">
                                Our relationship managers will review your application within 24-48 business hours.
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-[11px] font-bold">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    Relationship Support Active
                                </div>
                                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                                    <p className="text-[9px] text-white/40 uppercase font-black mb-1">Direct Helpdesk</p>
                                    <p className="text-sm font-bold">+91 999 000 1234</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Unified Form */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Section 1: Business Profile */}
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-slate-50 bg-slate-50/50 flex items-center gap-3">
                            <div className="w-10 h-10 bg-white shadow-sm rounded-lg flex items-center justify-center border border-slate-100">
                                <User className="text-[#d26019]" size={20} />
                            </div>
                            <div>
                                <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight">Business Profile</h2>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Public identity and catalog branding</p>
                            </div>
                        </div>
                        <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Brand Name *</Label>
                                <Input 
                                    name="brandName" 
                                    value={sellerDetails.brandName} 
                                    onChange={handleInputChange} 
                                    required 
                                    placeholder="e.g. Wellness Pro International"
                                    className="h-12 bg-slate-50/50 border-slate-200 focus:bg-white transition-all rounded-xl font-bold"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Corporate Website</Label>
                                <Input 
                                    name="website" 
                                    value={sellerDetails.website} 
                                    onChange={handleInputChange} 
                                    placeholder="https://www.company.com"
                                    className="h-12 bg-slate-50/50 border-slate-200 focus:bg-white rounded-xl font-bold"
                                />
                            </div>
                            <div className="col-span-full space-y-2">
                                <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Trade Categories *</Label>
                                <textarea 
                                    name="productCategories" 
                                    value={sellerDetails.productCategories} 
                                    onChange={handleInputChange} 
                                    required
                                    rows={3}
                                    placeholder="e.g. Herbal Medicine, Fitness Equipment, Organic Foods..."
                                    className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl font-bold text-sm focus:bg-white focus:border-[#23471d] outline-none transition-all resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 2: KYC & Compliance */}
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-slate-50 bg-slate-50/50 flex items-center gap-3">
                            <div className="w-10 h-10 bg-white shadow-sm rounded-lg flex items-center justify-center border border-slate-100">
                                <ShieldCheck className="text-blue-500" size={20} />
                            </div>
                            <div>
                                <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight">KYC & Compliance</h2>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Taxation and legal verification</p>
                            </div>
                        </div>
                        <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">GSTIN (India) / Tax ID</Label>
                                <Input 
                                    name="gstNumber" 
                                    value={sellerDetails.gstNumber} 
                                    onChange={handleInputChange} 
                                    placeholder="Enter Tax Number"
                                    className="h-12 bg-slate-50/50 border-slate-200 rounded-xl font-bold uppercase"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Corporate PAN</Label>
                                <Input 
                                    name="panNumber" 
                                    value={sellerDetails.panNumber} 
                                    onChange={handleInputChange} 
                                    placeholder="Enter PAN ID"
                                    className="h-12 bg-slate-50/50 border-slate-200 rounded-xl font-bold uppercase"
                                />
                            </div>
                            <div className="col-span-full space-y-2">
                                <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Business Registration Certificate No.</Label>
                                <Input 
                                    name="businessRegistrationNo" 
                                    value={sellerDetails.businessRegistrationNo} 
                                    onChange={handleInputChange} 
                                    placeholder="CIN / MSME / Udyam Number"
                                    className="h-12 bg-slate-50/50 border-slate-200 rounded-xl font-bold"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Bank Details */}
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-slate-50 bg-slate-50/50 flex items-center gap-3">
                            <div className="w-10 h-10 bg-white shadow-sm rounded-lg flex items-center justify-center border border-slate-100">
                                <Landmark className="text-[#23471d]" size={20} />
                            </div>
                            <div>
                                <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight">Payout & Banking</h2>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Secure transaction management</p>
                            </div>
                        </div>
                        <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bank Institution Name *</Label>
                                <Input 
                                    name="bankName" 
                                    value={sellerDetails.bankName} 
                                    onChange={handleInputChange} 
                                    required 
                                    placeholder="e.g. Standard Chartered Bank"
                                    className="h-12 bg-slate-50/50 border-slate-200 rounded-xl font-bold"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">A/C Holder Name *</Label>
                                <Input 
                                    name="accountHolder" 
                                    value={sellerDetails.accountHolder} 
                                    onChange={handleInputChange} 
                                    required 
                                    className="h-12 bg-slate-50/50 border-slate-200 rounded-xl font-bold"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Account Number *</Label>
                                <Input 
                                    name="accountNumber" 
                                    value={sellerDetails.accountNumber} 
                                    onChange={handleInputChange} 
                                    required 
                                    className="h-12 bg-slate-50/50 border-slate-200 rounded-xl font-bold tracking-[0.2em]"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bank IFSC / SWIFT Code *</Label>
                                <Input 
                                    name="ifscCode" 
                                    value={sellerDetails.ifscCode} 
                                    onChange={handleInputChange} 
                                    required 
                                    className="h-12 bg-slate-50/50 border-slate-200 rounded-xl font-bold uppercase"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Branch Address</Label>
                                <Input 
                                    name="branch" 
                                    value={sellerDetails.branch} 
                                    onChange={handleInputChange} 
                                    className="h-12 bg-slate-50/50 border-slate-200 rounded-xl font-bold"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Account Type</Label>
                                <Select value={sellerDetails.accountType} onValueChange={handleSelectChange}>
                                    <SelectTrigger className="h-12 bg-slate-50/50 border-slate-200 rounded-xl font-bold">
                                        <SelectValue placeholder="Select Account Type" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl">
                                        <SelectItem value="Savings">Savings Account</SelectItem>
                                        <SelectItem value="Current">Current Account</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Submit for mobile */}
                    <div className="lg:hidden">
                        <Button 
                            type="submit" 
                            disabled={loading}
                            className="w-full h-14 bg-[#d26019] hover:bg-[#a84c14] text-white font-black text-[11px] uppercase tracking-widest rounded-xl shadow-lg"
                        >
                            {loading ? "Authorizing..." : "Submit Registration"}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
