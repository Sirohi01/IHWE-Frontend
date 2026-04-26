import { useState } from 'react';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import { motion } from 'framer-motion';
import { Send, Globe, Package, Info, CheckCircle2, ChevronRight, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { API_URL } from '@/lib/api';
import DashboardHero from '@/components/dashboard/DashboardHero';

export default function ProductExportPage() {
    const { data } = useExhibitorCtx();
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const [form, setForm] = useState({
        productName: '',
        category: '',
        hsCode: '',
        targetCountries: '',
        monthlyCapacity: '',
        certification: '',
        description: '',
        contactPerson: `${data?.contact1?.firstName} ${data?.contact1?.lastName}`,
        email: data?.contact1?.email || '',
        phone: data?.contact1?.mobile || ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('exhibitorToken');
            const res = await fetch(`${API_URL}/seller-portal/export-inquiry`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}` 
                },
                body: JSON.stringify({
                    brandName: data?.companyName,
                    contactPerson: form.contactPerson,
                    email: form.email,
                    phone: form.phone,
                    productCategories: [form.category],
                    targetCountries: form.targetCountries.split(',').map(c => c.trim()),
                    message: form.description
                })
            });
            const d = await res.json();
            if (d.success) {
                toast.success("Export inquiry submitted successfully!");
                setSubmitted(true);
            } else {
                toast.error(d.message || "Failed to submit inquiry");
            }
        } catch (err) {
            toast.error("Network error");
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                className="max-w-xl mx-auto mt-12 bg-white p-12 border border-slate-200 shadow-lg rounded-sm text-center"
            >
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send className="text-blue-600" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Inquiry Received</h2>
                <p className="text-slate-500 mb-8 leading-relaxed">
                    Your product export request for <strong>{form.productName}</strong> has been shared with our international trade partners and export consultants.
                </p>
                <Button onClick={() => setSubmitted(false)} variant="outline" className="uppercase text-[10px] font-black tracking-widest px-8">Submit Another Request</Button>
            </motion.div>
        );
    }

    return (
        <div className="space-y-6 pb-12">
            <DashboardHero 
                pageId="sl-export" 
                defaultTitle="Product Export Inquiry" 
                defaultSubtitle="Connect with international buyers and distributors for your premium products."
                type="seller" 
            />

            <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
                <div className="bg-slate-50 px-8 py-4 border-b border-slate-200 flex items-center gap-3">
                    <Package className="text-[#d26019]" size={20} />
                    <h2 className="text-lg font-bold text-slate-800 uppercase tracking-tight">Product Specifications</h2>
                </div>

                <div className="p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider">Product Name *</Label>
                            <Input name="productName" value={form.productName} onChange={handleInputChange} required placeholder="What are you looking to export?" className="h-10 text-sm border-slate-300 focus:border-[#23471d]" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider">Category *</Label>
                            <Select value={form.category} onValueChange={(v) => handleSelectChange('category', v)}>
                                <SelectTrigger className="h-10 text-sm border-slate-300">
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Herbal">Herbal & AYUSH</SelectItem>
                                    <SelectItem value="Organic">Organic Foods</SelectItem>
                                    <SelectItem value="Cosmetics">Natural Cosmetics</SelectItem>
                                    <SelectItem value="Supplements">Health Supplements</SelectItem>
                                    <SelectItem value="Equipments">Wellness Equipments</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider">HS Code (If known)</Label>
                            <Input name="hsCode" value={form.hsCode} onChange={handleInputChange} placeholder="Harmonized System Code" className="h-10 text-sm border-slate-300 focus:border-[#23471d]" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider">Production Capacity (Monthly) *</Label>
                            <Input name="monthlyCapacity" value={form.monthlyCapacity} onChange={handleInputChange} required placeholder="e.g. 5000 Units / 10 Tons" className="h-10 text-sm border-slate-300 focus:border-[#23471d]" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-[10px] font-bold uppercase tracking-wider">Target Countries / Regions *</Label>
                        <Input name="targetCountries" value={form.targetCountries} onChange={handleInputChange} required placeholder="e.g. USA, Europe, Middle East" className="h-10 text-sm border-slate-300 focus:border-[#23471d]" />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-[10px] font-bold uppercase tracking-wider">Current Certifications</Label>
                        <Input name="certification" value={form.certification} onChange={handleInputChange} placeholder="e.g. ISO, GMP, FDA, USDA Organic" className="h-10 text-sm border-slate-300 focus:border-[#23471d]" />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-[10px] font-bold uppercase tracking-wider">Brief Product Description *</Label>
                        <Textarea name="description" value={form.description} onChange={handleInputChange} required placeholder="Key features, USPs, and export readiness..." className="min-h-[100px] text-sm border-slate-300 focus:border-[#23471d]" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider">Contact Name</Label>
                            <Input value={form.contactPerson} readOnly className="h-9 text-xs bg-slate-50 border-slate-200" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider">Contact Email</Label>
                            <Input value={form.email} readOnly className="h-9 text-xs bg-slate-50 border-slate-200" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider">Contact Phone</Label>
                            <Input value={form.phone} readOnly className="h-9 text-xs bg-slate-50 border-slate-200" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                        <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-3 py-2 rounded-sm border border-blue-100">
                            <Info size={14} />
                            <p className="text-[10px] font-bold uppercase tracking-widest">Global Export Desk · IHWE 2026</p>
                        </div>
                        <Button 
                            type="submit" 
                            disabled={loading}
                            className="bg-[#23471d] hover:bg-[#1a3516] text-white px-10 h-11 text-xs font-bold uppercase tracking-widest shadow-lg active:scale-95 transition-all"
                        >
                            {loading ? "Submitting..." : "Send Export Inquiry"}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
