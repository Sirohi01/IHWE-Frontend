import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Package, Plus, Search, Filter,
    MoreVertical, Edit2, Trash2, Eye,
    MessageCircle, BarChart3, ChevronRight, Target,
    Image as ImageIcon, X, Loader2,
    CheckCircle2, AlertCircle, ShoppingBag,
    Star, Tag, ExternalLink, Mail, Phone,
    TrendingUp, Users, Info, Layers, Calendar, MapPin
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { API_URL } from "@/lib/api";

interface Product {
    _id: string;
    name: string;
    description: string;
    category: string;
    tags: string[];
    images: string[];
    price: number;
    priceUnit: string;
    moq: string;
    isActive: boolean;
    views: number;
    enquiryCount: number;
    createdAt: string;
}

interface Enquiry {
    _id: string;
    productId: any;
    visitorName: string;
    visitorEmail: string;
    visitorPhone: string;
    message: string;
    source: string;
    createdAt: string;
}

interface Analytics {
    totalProducts: number;
    activeProducts: number;
    totalViews: number;
    totalEnquiries: number;
    topProduct: Product | null;
    products: Product[];
    recentEnquiries: Enquiry[];
}

export default function StallProductManager({ data, mode = 'seller', initialSection = 'stall-info' }: { 
    data: any, 
    mode?: 'exhibitor' | 'seller',
    initialSection?: 'stall-info' | 'products' | 'enquiries' | 'analytics'
}) {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState<'stall-info' | 'products' | 'enquiries' | 'analytics'>(initialSection);
    const [products, setProducts] = useState<Product[]>([]);
    const [analytics, setAnalytics] = useState<Analytics | null>(null);
    const [loading, setLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // ... (keep previous state)
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [formLoading, setFormLoading] = useState(false);
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [selectedEnquiryProduct, setSelectedEnquiryProduct] = useState<Product | null>(null);
    const [productEnquiries, setProductEnquiries] = useState<Enquiry[]>([]);
    const [enquiryLoading, setEnquiryLoading] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [units, setUnits] = useState<{ _id: string, unit: string }[]>([]);

    const backendBaseUrl = API_URL.replace('/api', '');
    const cur = data?.participation?.currency === 'USD' ? '$' : '₹';
    const total = data?.participation?.total || 0;
    const paid = data?.amountPaid || 0;
    const balance = data?.balanceAmount || 0;
    const getRegParam = () => {
        const selectedRegId = localStorage.getItem('selectedRegId');
        return selectedRegId ? `?regId=${selectedRegId}` : '';
    };

    const fetchData = async () => {
        setIsRefreshing(true);
        try {
            const token = localStorage.getItem('exhibitorToken');
            const regParam = getRegParam();

            const [pRes, aRes, uRes] = await Promise.all([
                fetch(`${API_URL}/stall-products/my${regParam}`, { headers: { Authorization: `Bearer ${token}` } }),
                fetch(`${API_URL}/stall-products/analytics/summary${regParam}`, { headers: { Authorization: `Bearer ${token}` } }),
                fetch(`${API_URL}/units`)
            ]);

            const pData = await pRes.json();
            const aData = await aRes.json();
            const uData = await uRes.json();

            if (pData.success) setProducts(pData.data);
            if (aData.success) setAnalytics(aData.data);
            if (Array.isArray(uData)) setUnits(uData);
        } catch (err) {
            toast.error("Failed to load catalog data");
        } finally {
            setLoading(false);
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setSelectedImages(prev => [...prev, ...files]);

            const newPreviews = files.map(file => URL.createObjectURL(file));
            setImagePreviews(prev => [...prev, ...newPreviews]);
        }
    };

    const removePreview = (index: number) => {
        setSelectedImages(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    const openAddModal = () => {
        setEditingProduct(null);
        setSelectedImages([]);
        setImagePreviews([]);
        setShowAddModal(true);
    };

    const openEditModal = (product: Product) => {
        setEditingProduct(product);
        setSelectedImages([]);
        setImagePreviews([]);
        setShowAddModal(true);
    };

    const closeProductModal = () => {
        setShowAddModal(false);
        setEditingProduct(null);
        setSelectedImages([]);
        setImagePreviews([]);
    };

    const handleSaveProduct = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormLoading(true);
        try {
            const formData = new FormData(e.currentTarget);
            selectedImages.forEach(file => formData.append('images', file));

            // Pass selectedRegId so product is created under the correct registration
            const selectedRegId = localStorage.getItem('selectedRegId');
            if (selectedRegId) formData.append('regId', selectedRegId);

            const token = localStorage.getItem('exhibitorToken');
            const isEdit = !!editingProduct;
            const res = await fetch(`${API_URL}/stall-products${isEdit ? `/${editingProduct._id}${getRegParam()}` : ''}`, {
                method: isEdit ? 'PUT' : 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: formData
            });

            const result = await res.json();
            if (result.success) {
                toast.success(isEdit ? "Product updated successfully" : "Product added successfully");
                closeProductModal();
                fetchData();
            } else {
                toast.error(result.message);
            }
        } catch (err) {
            toast.error("Error adding product");
        } finally {
            setFormLoading(false);
        }
    };

    const handleDeleteProduct = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;
        try {
            const token = localStorage.getItem('exhibitorToken');
            const res = await fetch(`${API_URL}/stall-products/${id}${getRegParam()}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            const result = await res.json();
            if (result.success) {
                toast.success("Product deleted");
                fetchData();
            } else {
                toast.error(result.message);
            }
        } catch (err) {
            toast.error("Error deleting product");
        }
    };

    const fetchProductEnquiries = async (product: Product) => {
        setSelectedEnquiryProduct(product);
        setEnquiryLoading(true);
        try {
            const token = localStorage.getItem('exhibitorToken');
            const res = await fetch(`${API_URL}/stall-products/${product._id}/enquiries${getRegParam()}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const result = await res.json();
            if (result.success) setProductEnquiries(result.data);
        } catch (err) {
            toast.error("Failed to load enquiries");
        } finally {
            setEnquiryLoading(false);
        }
    };

    if (loading) return (
        <div className="h-64 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-[#23471d] animate-spin" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Syncing Catalog...</p>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Header with quick stats */}
            <div className="bg-white rounded-sm border border-slate-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-1">Stall Management</h2>
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Digital Product Showcase & Lead Center</p>
                </div>
                {mode === 'seller' && (
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-sm">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Total Views</p>
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-black text-slate-900">{analytics?.totalViews || 0}</span>
                                <TrendingUp size={14} className="text-[#16a34a]" />
                            </div>
                        </div>
                        <div className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-sm">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Lead Conversion</p>
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-black text-slate-900">{analytics?.totalEnquiries || 0}</span>
                                <MessageCircle size={14} className="text-[#0284c7]" />
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                setActiveSection('products');
                                openAddModal();
                            }}
                            className="h-11 px-6 bg-[#23471d] hover:bg-[#1a3516] text-white rounded-sm flex items-center gap-2 transition-all shadow-md group"
                        >
                            <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
                            <span className="text-[11px] font-black uppercase tracking-widest">Add New Product</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Navigation Tabs */}
            {mode === 'seller' && (
                <div className="flex items-center border-b border-slate-200 bg-white px-6">
                    {[
                        { id: 'stall-info', label: 'Stall Information', icon: Info },
                        { id: 'products', label: 'Product Listing', icon: Package },
                        { id: 'enquiries', label: 'All Enquiries', icon: Mail },
                        { id: 'analytics', label: 'Store Insights', icon: BarChart3 },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveSection(tab.id as any)}
                            className={`py-4 px-6 flex items-center gap-2 border-b-2 transition-all relative ${activeSection === tab.id
                                ? 'border-[#23471d] text-[#23471d]'
                                : 'border-transparent text-slate-500 hover:text-slate-800'
                                }`}
                        >
                            <tab.icon size={16} />
                            <span className="text-[11px] font-black uppercase tracking-widest">{tab.label}</span>
                            {tab.id === 'enquiries' && analytics?.totalEnquiries ? (
                                <span className="ml-2 w-5 h-5 bg-[#d26019] text-white text-[9px] font-black flex items-center justify-center rounded-full">
                                    {analytics.totalEnquiries}
                                </span>
                            ) : null}
                        </button>
                    ))}
                </div>
            )}

            {/* Content Area */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    {activeSection === 'stall-info' && (
                        <div className="space-y-6">
                            {/* Actions Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button
                                    onClick={() => navigate('/exhibitor-dashboard/accessories')}
                                    className="p-5 bg-white border border-slate-200 rounded-sm hover:border-[#d26019] transition-all group shadow-sm flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-4 text-left">
                                        <div className="w-12 h-12 bg-[#d26019]/5 text-[#d26019] rounded-sm flex items-center justify-center group-hover:bg-[#d26019] group-hover:text-white transition-all shrink-0">
                                            <ShoppingBag size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-[12px] font-black text-slate-900 uppercase tracking-tight leading-none mb-1.5">Extra Add-ons</h3>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Book extra furniture, electricity & branding</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={16} className="text-slate-300 group-hover:text-[#d26019] group-hover:translate-x-0.5 transition-all" />
                                </button>

                                {mode === 'seller' && (
                                    <button
                                        onClick={() => setActiveSection('products')}
                                        className="p-5 bg-white border border-slate-200 rounded-sm hover:border-[#23471d] transition-all group shadow-sm flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-4 text-left">
                                            <div className="w-12 h-12 bg-[#23471d]/5 text-[#23471d] rounded-sm flex items-center justify-center group-hover:bg-[#23471d] group-hover:text-white transition-all shrink-0">
                                                <Package size={20} />
                                            </div>
                                            <div>
                                                <h3 className="text-[12px] font-black text-slate-900 uppercase tracking-tight leading-none mb-1.5">Manage your Products</h3>
                                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Add products, gallery images & descriptions</p>
                                            </div>
                                        </div>
                                        <ChevronRight size={16} className="text-slate-300 group-hover:text-[#23471d] group-hover:translate-x-0.5 transition-all" />
                                    </button>
                                )}
                            </div>

                            {/* Info Grid */}
                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-6">
                                    {/* Event Details */}
                                    {data?.eventId && (
                                        <div className="bg-white border border-slate-200 rounded-sm overflow-hidden">
                                            <div className="bg-[#23471d] px-6 py-3 border-b flex items-center gap-2">
                                                <Calendar size={14} className="text-white/80" />
                                                <span className="text-[10px] font-black text-white uppercase tracking-widest">Event Details</span>
                                            </div>
                                            <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                                                {[
                                                    { label: 'Event Name', value: data.eventId?.name, icon: Star },
                                                    { label: 'Venue / Location', value: data.eventId?.location, icon: MapPin },
                                                    { label: 'Start Date', value: data.eventId?.startDate ? new Date(data.eventId.startDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : null, icon: Calendar },
                                                    { label: 'End Date', value: data.eventId?.endDate ? new Date(data.eventId.endDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : null, icon: Calendar },
                                                ].map((item, i) => (
                                                    <div key={i} className="space-y-1.5">
                                                        <div className="flex items-center gap-1.5 text-slate-400">
                                                            <item.icon size={12} />
                                                            <span className="text-[9px] font-black uppercase tracking-widest">{item.label}</span>
                                                        </div>
                                                        <p className="text-[12px] font-bold text-slate-900">{item.value || 'N/A'}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Stall Details */}
                                    <div className="bg-white border border-slate-200 rounded-sm overflow-hidden">
                                        <div className="bg-slate-50 px-6 py-3 border-b flex items-center justify-between">
                                            <div className="px-2 py-0.5 bg-[#23471d]/10 text-[#23471d] text-[8px] font-black uppercase rounded-sm border border-[#23471d]/20">Official Allocation</div>
                                        </div>
                                        <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                                            {[
                                                { label: 'Stall No.', value: data?.participation?.stallFor, icon: Target },
                                                { label: 'Stall Type', value: data?.participation?.stallType, icon: Layers },
                                                { label: 'Stall Size', value: data?.participation?.stallSize ? `${data.participation.stallSize} SQM` : null, icon: Package },
                                                { label: 'Scheme', value: data?.participation?.stallScheme, icon: Star },
                                                { label: 'Dimension', value: data?.participation?.dimension, icon: Layers },
                                                { label: 'Rate / SQM', value: data?.participation?.rate ? `${cur} ${Number(data.participation.rate).toLocaleString('en-IN')}` : null, icon: Target },
                                                { label: 'Currency', value: data?.participation?.currency, icon: Star },
                                                { label: 'Reg. ID', value: data?.registrationId, icon: Target },
                                            ].map((item, i) => (
                                                <div key={i} className="space-y-1.5">
                                                    <div className="flex items-center gap-1.5 text-slate-400">
                                                        <item.icon size={12} />
                                                        <span className="text-[9px] font-black uppercase tracking-widest">{item.label}</span>
                                                    </div>
                                                    <p className="text-[13px] font-bold text-slate-900 uppercase">{item.value || 'N/A'}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Google Maps Section */}
                                    <div className="bg-white border border-slate-200 rounded-sm overflow-hidden">
                                        <div className="bg-slate-50 px-6 py-3 border-b flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <MapPin size={14} className="text-[#23471d]" />
                                                <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Venue Location & Directions</span>
                                            </div>
                                            <a
                                                href="https://www.google.com/maps/dir/?api=1&destination=Hall+9+Pragati+Maidan+New+Delhi"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[10px] font-black text-[#d26019] uppercase tracking-widest hover:underline flex items-center gap-1 group/link"
                                            >
                                                Directions <ExternalLink size={12} className="group-hover/link:translate-x-0.5 transition-transform" />
                                            </a>
                                        </div>
                                        <div className="p-4 space-y-4">
                                            <div className="relative w-full h-[400px] rounded-sm overflow-hidden border border-slate-200">
                                                <iframe 
                                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.40515138456!2d77.24287917613687!3d28.61761698475674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3292652f09b%3A0x5291514307e237c5!2sHall%20-%209!5e0!3m2!1sen!2sin!4v1777211227510!5m2!1sen!2sin" 
                                                    width="100%" 
                                                    height="100%" 
                                                    style={{ border: 0 }} 
                                                    allowFullScreen 
                                                    loading="lazy" 
                                                    referrerPolicy="no-referrer-when-downgrade"
                                                    title="Venue Location Map"
                                                />
                                            </div>
                                            
                                            <div className="flex flex-col md:flex-row items-center gap-4">
                                                <div className="flex-1 flex items-start gap-3">
                                                    <div className="w-8 h-8 bg-slate-100 rounded-sm flex items-center justify-center shrink-0">
                                                        <MapPin size={16} className="text-[#23471d]" />
                                                    </div>
                                                    <div>
                                                        <p className="text-[11px] font-black text-slate-900 uppercase leading-tight">Pragati Maidan, New Delhi</p>
                                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Hall - 9, IECC Complex, Pragati Maidan, New Delhi, Delhi 110001</p>
                                                    </div>
                                                </div>
                                                <a
                                                    href="https://www.google.com/maps/place/Hall+-+9/@28.6176169,77.2428791,17z/data=!3m1!4b1!4m6!3m5!1s0x390ce3292652f09b:0x5291514307e237c5!8m2!3d28.6176169!4d77.245454!16s%2Fg%2F11c5q5y5qy?entry=ttu"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="h-10 px-6 bg-[#23471d] hover:bg-[#1a3516] text-white rounded-sm flex items-center justify-center gap-2 transition-all shadow-md group shrink-0"
                                                >
                                                    <MapPin size={14} className="group-hover:scale-110 transition-transform" />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">Open in Maps</span>
                                                    <ExternalLink size={12} className="opacity-70" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white border border-slate-200 rounded-sm overflow-hidden text-center p-12">
                                        <ImageIcon className="mx-auto text-slate-100 mb-4" size={48} />
                                        <h3 className="text-[12px] font-black text-slate-400 uppercase tracking-widest mb-2">Technical Documents</h3>
                                        <p className="text-[10px] font-medium text-slate-400 max-w-xs mx-auto mb-6 italics">Please visit the documentation section to download your stall technical manual and entry passes.</p>
                                    </div>
                                </div>


                            </div>
                        </div>
                    )}

                    {activeSection === 'products' && (
                        <ProductGrid
                            products={products}
                            baseUrl={backendBaseUrl}
                            onDelete={handleDeleteProduct}
                            onEnquiries={fetchProductEnquiries}
                            onView={setSelectedProduct}
                            onEdit={openEditModal}
                        />
                    )}

                    {activeSection === 'enquiries' && (
                        <div className="space-y-4">
                            {!analytics?.recentEnquiries?.length ? (
                                <div className="bg-white border rounded-sm p-20 text-center text-slate-400">
                                    <Mail size={48} className="mx-auto mb-4 opacity-10" />
                                    <p className="text-[12px] font-black uppercase tracking-widest">No enquiries received yet</p>
                                </div>
                            ) : (
                                <div className="bg-white border rounded-sm overflow-hidden">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-slate-50 border-b">
                                                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Product</th>
                                                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Visitor Info</th>
                                                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Inquiry Message</th>
                                                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {analytics.recentEnquiries.map((enq) => (
                                                <tr key={enq._id} className="border-b hover:bg-slate-50/50 transition-all group">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 bg-slate-100 rounded-sm overflow-hidden border flex">
                                                                {/* @ts-ignore */}
                                                                {enq.productId?.images?.[0] ? (
                                                                    <img loading="lazy" decoding="async" src={`${backendBaseUrl}${enq.productId.images[0]}`} alt="" className="w-full h-full object-contain m-auto" />
                                                                ) : <Package className="w-full h-full p-2 text-slate-300" />}
                                                            </div>
                                                            <div className="min-w-0">
                                                                <p className="text-[11px] font-black text-slate-800 uppercase truncate">
                                                                    {/* @ts-ignore */}
                                                                    {enq.productId?.name || 'Deleted Product'}
                                                                </p>
                                                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                                                                    ID: {enq._id.slice(-6)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="space-y-1">
                                                            <p className="text-[12px] font-black text-slate-900 uppercase">{enq.visitorName}</p>
                                                            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase">
                                                                <Mail size={12} className="text-slate-300" /> {enq.visitorEmail || 'N/A'}
                                                            </div>
                                                            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase">
                                                                <Phone size={12} className="text-slate-300" /> {enq.visitorPhone || 'N/A'}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="text-[12px] text-slate-600 font-medium leading-relaxed max-w-xs">{enq.message}</p>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">
                                                            {new Date(enq.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}

                    {activeSection === 'analytics' && analytics && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white border rounded-sm p-6 shadow-sm">
                                <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-6">Product Performance</h3>
                                <div className="space-y-6">
                                    {analytics.products.slice(0, 5).map((p, i) => (
                                        <div key={p._id} className="flex items-center gap-4">
                                            <span className="text-lg font-black text-slate-200 w-6">0{i + 1}</span>
                                            <div className="flex-1">
                                                <div className="flex justify-between mb-1 text-[11px] font-black uppercase">
                                                    <span className="text-slate-800">{p.name}</span>
                                                    <span className="text-[#23471d]">{p.views} views</span>
                                                </div>
                                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-[#23471d]"
                                                        style={{ width: `${(p.views / (analytics.topProduct?.views || 1)) * 100}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-6">
                                <div className="bg-[#23471d] text-white rounded-sm p-6 relative overflow-hidden">
                                    <ShoppingBag className="absolute -bottom-6 -right-6 w-32 h-32 opacity-10" />
                                    <div className="relative z-10">
                                        <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-70">Catalog Status</p>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-4xl font-black">{analytics.activeProducts}</span>
                                            <span className="text-[12px] font-bold opacity-60 uppercase">/ {analytics.totalProducts} Active Products</span>
                                        </div>
                                        <div className="mt-6 flex gap-4">
                                            <div className="px-3 py-1.5 bg-white/10 rounded-[4px] border border-white/10 flex items-center gap-2">
                                                <Target size={14} />
                                                <span className="text-[10px] font-black uppercase tracking-widest">High Visibility</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {analytics.topProduct && (
                                    <div className="bg-white border border-[#d26019]/20 rounded-sm p-6">
                                        <p className="text-[10px] font-black text-[#d26019] uppercase tracking-widest mb-4 flex items-center gap-2">
                                            <Star size={12} fill="#d26019" /> Bestselling Product
                                        </p>
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 bg-slate-100 rounded-sm overflow-hidden border">
                                                {analytics.topProduct.images?.[0] ? (
                                                    <img loading="lazy" decoding="async" src={`${backendBaseUrl}${analytics.topProduct.images[0]}`} alt="" className="w-full h-full object-cover" />
                                                ) : <Package className="w-full h-full p-3 text-slate-300" />}
                                            </div>
                                            <div>
                                                <h4 className="text-[14px] font-black text-slate-900 uppercase">{analytics.topProduct.name}</h4>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                                                        <Eye size={12} /> {analytics.topProduct.views}
                                                    </span>
                                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                                                        <MessageCircle size={12} /> {analytics.topProduct.enquiryCount}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Modal for Addition */}
            <AnimatePresence>
                {showAddModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeProductModal}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden relative"
                        >
                            <div className="bg-[#23471d] p-4 flex items-center justify-between">
                                <h3 className="text-white text-[12px] font-black uppercase tracking-widest">
                                    {editingProduct ? 'Update Product' : 'Register New Product'}
                                </h3>
                                <button onClick={closeProductModal} className="text-white/70 hover:text-white transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSaveProduct} className="p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="col-span-1 md:col-span-2 space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Product Name *</label>
                                        <input
                                            name="name" required placeholder="e.g. Handmade Terracotta Vase"
                                            defaultValue={editingProduct?.name || ''}
                                            className="w-full h-11 bg-slate-50 border border-slate-200 rounded-sm px-4 text-[12px] font-bold focus:bg-white focus:border-[#23471d] outline-none transition-all"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Price</label>
                                        <div className="flex gap-2">
                                            <input
                                                name="price" type="number" placeholder="500"
                                                defaultValue={editingProduct?.price || ''}
                                                className="flex-1 h-11 bg-slate-50 border border-slate-200 rounded-sm px-4 text-[12px] font-bold focus:bg-white focus:border-[#23471d] outline-none"
                                            />
                                            <select
                                                name="priceUnit"
                                                defaultValue={editingProduct?.priceUnit || 'per piece'}
                                                className="w-24 h-11 bg-slate-50 border border-slate-200 rounded-sm px-2 text-[10px] font-bold focus:bg-white outline-none"
                                            >
                                                {units.length > 0 ? (
                                                    units.map(u => (
                                                        <option key={u._id} value={u.unit}>{u.unit}</option>
                                                    ))
                                                ) : (
                                                    <>
                                                        <option value="per piece">Pcs</option>
                                                        <option value="per set">Set</option>
                                                        <option value="per kg">Kg</option>
                                                    </>
                                                )}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">MOQ (Min Order Qty)</label>
                                        <input
                                            name="moq" placeholder="e.g. 100 units"
                                            defaultValue={editingProduct?.moq || ''}
                                            className="w-full h-11 bg-slate-50 border border-slate-200 rounded-sm px-4 text-[12px] font-bold focus:bg-white focus:border-[#23471d] outline-none"
                                        />
                                    </div>

                                    <div className="col-span-1 md:col-span-2 space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Product Categories (Comma separated)</label>
                                        <div className="relative">
                                            <Package className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                            <input
                                                name="category" placeholder="handicraft, vase, home decor"
                                                defaultValue={editingProduct?.category || ''}
                                                className="w-full h-11 bg-slate-50 border border-slate-200 rounded-sm pl-10 pr-4 text-[12px] font-bold focus:bg-white focus:border-[#23471d] outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-1 md:col-span-2 space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Description</label>
                                        <textarea
                                            name="description" rows={3} placeholder="Tell buyers about your product features, quality and material..."
                                            defaultValue={editingProduct?.description || ''}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-sm p-4 text-[12px] font-bold focus:bg-white focus:border-[#23471d] outline-none transition-all resize-none"
                                        />
                                    </div>

                                    <div className="col-span-1 md:col-span-2 space-y-2">
                                        <div className="flex justify-between items-center">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Product Images (upto 8)</label>
                                            <span className="text-[9px] font-black text-[#23471d] uppercase">Recommended: 1000 x 1000 px</span>
                                        </div>
                                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                                            {imagePreviews.map((url, i) => (
                                                <div key={i} className="aspect-square bg-slate-100 rounded-sm relative group overflow-hidden border flex">
                                                    <img loading="lazy" decoding="async" src={url} alt="" className="w-full h-full object-contain m-auto" />
                                                    <button
                                                        type="button"
                                                        onClick={() => removePreview(i)}
                                                        className="absolute top-1 right-1 bg-white/90 text-red-500 w-5 h-5 flex items-center justify-center rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <X size={12} />
                                                    </button>
                                                </div>
                                            ))}
                                            {imagePreviews.length < 8 && (
                                                <label className="aspect-square bg-slate-50 border-2 border-dashed border-slate-200 hover:border-[#23471d] rounded-sm flex flex-col items-center justify-center cursor-pointer transition-colors group">
                                                    <ImageIcon size={20} className="text-slate-400 group-hover:text-[#23471d]" />
                                                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">Upload</span>
                                                    <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageChange} />
                                                </label>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={closeProductModal}
                                        className="h-12 px-6 border border-slate-200 hover:bg-slate-50 text-slate-600 text-[11px] font-black uppercase tracking-widest rounded-sm transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={formLoading}
                                        className="h-12 flex-1 bg-[#23471d] hover:bg-[#1a3516] text-white text-[11px] font-black uppercase tracking-widest rounded-sm transition-all flex items-center justify-center gap-2"
                                    >
                                        {formLoading ? <Loader2 size={16} className="animate-spin" /> : <Package size={16} />}
                                        {editingProduct ? 'Update Product Details' : 'Save Product Details'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Product Enquiry View Modal */}
            <AnimatePresence>
                {selectedEnquiryProduct && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedEnquiryProduct(null)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            className="bg-white w-full max-w-xl h-full max-h-[90vh] rounded-sm shadow-2xl flex flex-col relative"
                        >
                            <div className="p-6 border-b flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-50 border rounded-sm overflow-hidden">
                                        {selectedEnquiryProduct.images?.[0] ? (
                                            <img loading="lazy" decoding="async" src={`${backendBaseUrl}${selectedEnquiryProduct.images[0]}`} alt="" className="w-full h-full object-cover" />
                                        ) : <Package className="w-full h-full p-2 text-slate-300" />}
                                    </div>
                                    <div>
                                        <h3 className="text-[14px] font-black text-slate-900 uppercase leading-none mb-1">
                                            {selectedEnquiryProduct.name}
                                        </h3>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                            {productEnquiries.length} Enquiries Tracked
                                        </p>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedEnquiryProduct(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 bg-slate-50/30">
                                {enquiryLoading ? (
                                    <div className="h-40 flex items-center justify-center">
                                        <Loader2 className="animate-spin text-slate-300" />
                                    </div>
                                ) : !productEnquiries.length ? (
                                    <div className="text-center py-20 text-slate-400">
                                        <Info size={40} className="mx-auto mb-4 opacity-10" />
                                        <p className="text-[12px] font-black uppercase tracking-widest">No enquiries for this product</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {productEnquiries.map((enq) => (
                                            <div key={enq._id} className="bg-white border rounded-sm p-5 shadow-sm space-y-4">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-[#23471d]/5 text-[#23471d] rounded-full flex items-center justify-center font-black">
                                                            {enq.visitorName[0]}
                                                        </div>
                                                        <div>
                                                            <p className="text-[12px] font-black text-slate-900 uppercase">{enq.visitorName}</p>
                                                            <span className="text-[9px] font-bold text-slate-400 uppercase">
                                                                {new Date(enq.createdAt).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="px-2 py-0.5 bg-[#f0f9ff] text-[#0284c7] text-[8px] font-black uppercase rounded-[2px] border border-[#0284c7]/20">
                                                        {enq.source} Source
                                                    </div>
                                                </div>

                                                <div className="bg-slate-50 p-4 rounded-sm text-[12px] text-slate-600 font-medium leading-relaxed border border-slate-100">
                                                    "{enq.message}"
                                                </div>

                                                <div className="flex gap-4 border-t pt-4">
                                                    {enq.visitorEmail && (
                                                        <a href={`mailto:${enq.visitorEmail}`} className="flex items-center gap-1.5 text-[10px] font-black text-[#23471d] uppercase hover:underline">
                                                            <Mail size={12} /> Email Buyer
                                                        </a>
                                                    )}
                                                    {enq.visitorPhone && (
                                                        <a href={`tel:${enq.visitorPhone}`} className="flex items-center gap-1.5 text-[10px] font-black text-slate-700 uppercase hover:underline">
                                                            <Phone size={12} /> Call Lead
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Global Gallery Modal */}
            <AnimatePresence>
                {selectedProduct && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProduct(null)}
                            className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white w-full max-w-4xl h-[80vh] rounded-sm overflow-hidden relative flex flex-col shadow-2xl"
                        >
                            <div className="bg-[#23471d] p-4 flex items-center justify-between">
                                <h3 className="text-white text-[12px] font-black uppercase tracking-widest">{selectedProduct.name} - Gallery</h3>
                                <button onClick={() => setSelectedProduct(null)} className="text-white/70 hover:text-white transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-50">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {selectedProduct.images?.map((img, i) => (
                                        <div key={i} className="group aspect-square bg-white border border-slate-200 rounded-sm overflow-hidden shadow-sm relative flex">
                                            <img loading="lazy" decoding="async" src={`${backendBaseUrl}${img}`}
                                                alt=""
                                                className="w-full h-full object-contain m-auto transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute top-3 left-3 px-2 py-1 bg-black/50 backdrop-blur-md text-white text-[9px] font-black rounded-sm border border-white/10">
                                                IMAGE {i + 1}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

function ProductGrid({ products, baseUrl, onDelete, onEnquiries, onView, onEdit }: {
    products: Product[],
    baseUrl: string,
    onDelete: (id: string) => void,
    onEnquiries: (p: Product) => void,
    onView: (p: Product) => void,
    onEdit: (p: Product) => void
}) {
    if (!products.length) return (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-sm p-40 text-center">
            <ShoppingBag size={64} className="mx-auto mb-6 text-slate-200" />
            <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-2">Build Your Digital Stall</h3>
            <p className="text-[12px] font-medium text-slate-400 max-w-sm mx-auto">Upload your product catalog and start receiving high-quality leads directly from visitors.</p>
        </div>
    );

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {products.map((p) => (
                <motion.div
                    layout
                    key={p._id}
                    className="group bg-white border border-slate-200 rounded-sm overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                    <div className="aspect-square bg-slate-50 relative overflow-hidden">
                        {p.images?.[0] ? (
                            <img loading="lazy" decoding="async" src={`${baseUrl}${p.images[0]}`}
                                alt={p.name}
                                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                            />
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 p-4 text-center">
                                <ImageIcon size={24} />
                                <span className="text-[8px] font-black uppercase mt-1">No Image</span>
                            </div>
                        )}

                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <button
                                onClick={() => onView(p)}
                                className="w-7 h-7 bg-white text-slate-900 rounded-full flex items-center justify-center hover:bg-[#23471d] hover:text-white transition-all shadow-lg"
                                title="View All Images"
                            >
                                <Eye size={12} />
                            </button>
                            <button
                                onClick={() => onEnquiries(p)}
                                className="w-7 h-7 bg-white text-slate-900 rounded-full flex items-center justify-center hover:bg-[#23471d] hover:text-white transition-all shadow-lg"
                                title="View Leads"
                            >
                                <MessageCircle size={12} />
                            </button>
                            <button
                                onClick={() => onEdit(p)}
                                className="w-7 h-7 bg-white text-slate-900 rounded-full flex items-center justify-center hover:bg-[#23471d] hover:text-white transition-all shadow-lg"
                                title="Edit Product"
                            >
                                <Edit2 size={12} />
                            </button>
                            <button
                                onClick={() => onDelete(p._id)}
                                className="w-7 h-7 bg-white text-red-500 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-lg"
                                title="Delete"
                            >
                                <Trash2 size={12} />
                            </button>
                        </div>

                        <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/60 backdrop-blur-md text-white text-[8px] font-black uppercase rounded-[2px] flex items-center gap-1 shadow-sm">
                            <Eye size={10} /> {p.views}
                        </div>
                    </div>

                    <div className="p-3 space-y-3">
                        <div className="min-h-[36px]">
                            <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-tight leading-tight line-clamp-2 group-hover:text-[#23471d] transition-colors">
                                {p.name}
                            </h4>
                            <div className="flex flex-wrap gap-1 mt-2">
                                {(p.category || "").split(',').filter(t => t.trim() !== "").slice(0, 2).map((tag, i) => (
                                    <span key={i} className="text-[8px] font-black text-[#23471d] bg-[#23471d]/5 border border-[#23471d]/10 px-1.5 py-0.5 rounded-[2px] uppercase">
                                        {tag.trim()}
                                    </span>
                                ))}
                                {(p.category || "").split(',').filter(t => t.trim() !== "").length > 2 && <span className="text-[8px] font-bold text-slate-300">...</span>}
                            </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-slate-50 pt-3">
                            <div>
                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">MOQ</p>
                                <p className="text-[10px] font-black text-slate-900">{p.moq || 'N/A'}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Price Guide</p>
                                <p className="text-[11px] font-black text-[#23471d]">{p.price ? `${p.price}` : 'Contact'}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => onEnquiries(p)}
                                className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white py-2 rounded-sm transition-all"
                            >
                                <MessageCircle size={12} />
                                <span className="text-[9px] font-black uppercase tracking-[0.1em]">
                                    {p.enquiryCount || 0} Leads
                                </span>
                            </button>
                            <div className="flex items-center justify-center gap-2 bg-slate-50 text-slate-400 border py-2 rounded-sm">
                                <Eye size={12} />
                                <span className="text-[9px] font-black uppercase tracking-[0.1em]">{p.views || 0} Views</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
