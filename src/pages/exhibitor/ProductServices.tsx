
import { FormEvent, useEffect, useMemo, useState } from 'react';
import {
    Plus, Layers, Users, TrendingUp,
    Search, Filter, ChevronDown, ChevronLeft, ChevronRight,
    Edit2, Settings, Briefcase, Pill, Monitor,
    ExternalLink, CheckCircle2, PenTool, Microscope, Trash2, Eye, Package,
    X, Loader2, Image as ImageIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { API_URL } from '@/lib/api';
import productImage from '../../assets/productImage7.png'


type CatalogItem = {
    _id: string;
    title: string;
    category: string;
    type: 'Product' | 'Service';
    views: number;
    inquiries: number;
    image: string;
    images: string[];
    description: string;
    price: number;
    priceUnit: string;
    moq: string;
    tags: string[];
};

const categoryOptions = [
    "Medical Equipment", "Diagnostic", "Surgical Instruments", "Pharmaceuticals", "Health IT Solutions", "Other Services"
];

export default function ProductServices() {
    const [items, setItems] = useState<CatalogItem[]>([]);
    const [activeTab, setActiveTab] = useState('All Items');
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All Categories');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [showProductModal, setShowProductModal] = useState(false);
    const [editingItem, setEditingItem] = useState<CatalogItem | null>(null);
    const [viewingItem, setViewingItem] = useState<CatalogItem | null>(null);
    const [activeViewImage, setActiveViewImage] = useState(0);
    const [saving, setSaving] = useState(false);
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const itemsPerPage = 5;
    const backendBaseUrl = API_URL.replace(/\/api$/, '');

    const getRegParam = () => {
        const selectedRegId = localStorage.getItem('selectedRegId');
        return selectedRegId ? `?regId=${selectedRegId}` : '';
    };

    const mapProduct = (product: any): CatalogItem => {
        const tags = Array.isArray(product.tags) ? product.tags : [];
        const isService = tags.some((tag: string) => tag?.toLowerCase() === 'service');
        const images = Array.isArray(product.images)
            ? product.images.map((img: string) => img?.startsWith('http') ? img : `${backendBaseUrl}${img}`).filter(Boolean)
            : [];
        return {
            _id: product._id,
            title: product.name || 'Untitled',
            category: product.category || 'Other Services',
            type: isService ? 'Service' : 'Product',
            views: Number(product.views) || 0,
            inquiries: Number(product.enquiryCount) || 0,
            image: images[0] || '',
            images,
            description: product.description || '',
            price: Number(product.price) || 0,
            priceUnit: product.priceUnit || 'per piece',
            moq: product.moq || '',
            tags,
        };
    };

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('exhibitorToken');
            const res = await fetch(`${API_URL}/stall-products/my${getRegParam()}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (!res.ok || !data.success) throw new Error(data.message || 'Failed to load products');
            setItems((data.data || []).map(mapProduct));
        } catch (error: any) {
            toast.error(error.message || 'Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);



    // Computed Filtering
    const filteredItems = useMemo(() => {
        return items.filter(item => {
            if (activeTab === 'Products' && item.type !== 'Product') return false;
            if (activeTab === 'Services' && item.type !== 'Service') return false;
            if (categoryFilter !== 'All Categories' && item.category !== categoryFilter) return false;
            if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
            return true;
        });
    }, [items, activeTab, categoryFilter, searchQuery]);

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage) || 1;
    const paginatedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Derived Stats
    const totalProducts = items.filter(i => i.type === 'Product').length;
    const totalServices = items.filter(i => i.type === 'Service').length;
    const totalViews = items.reduce((sum, i) => sum + i.views, 0);
    const totalInquiries = items.reduce((sum, i) => sum + i.inquiries, 0);

    const categories = [
        { name: "Medical Equipment", count: items.filter(i => i.category === "Medical Equipment").length, icon: Settings },
        { name: "Diagnostic", count: items.filter(i => i.category === "Diagnostic").length, icon: Microscope },
        { name: "Surgical Instruments", count: items.filter(i => i.category === "Surgical Instruments").length, icon: PenTool },
        { name: "Pharmaceuticals", count: items.filter(i => i.category === "Pharmaceuticals").length, icon: Pill },
        { name: "Health IT Solutions", count: items.filter(i => i.category === "Health IT Solutions").length, icon: Monitor },
        { name: "Other Services", count: items.filter(i => i.category === "Other Services").length, icon: Briefcase }
    ];

    // Actions
    const openAddModal = () => {
        setEditingItem(null);
        setSelectedImages([]);
        setShowProductModal(true);
    };

    const handleEdit = (item: CatalogItem) => {
        setEditingItem(item);
        setSelectedImages([]);
        setShowProductModal(true);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        try {
            const token = localStorage.getItem('exhibitorToken');
            const res = await fetch(`${API_URL}/stall-products/${id}${getRegParam()}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (!res.ok || !data.success) throw new Error(data.message || 'Failed to delete item');
            setItems(items.filter(i => i._id !== id));
            if (paginatedItems.length === 1 && currentPage > 1) setCurrentPage(currentPage - 1);
            toast.success('Item deleted successfully');
        } catch (error: any) {
            toast.error(error.message || 'Failed to delete item');
        }
    };

    const handleView = async (item: CatalogItem) => {
        setViewingItem({ ...item, views: item.views + 1 });
        setActiveViewImage(0);
        try {
            await fetch(`${API_URL}/stall-products/${item._id}/view`, { method: 'POST' });
            setItems(prev => prev.map(current => (
                current._id === item._id
                    ? { ...current, views: current.views + 1 }
                    : current
            )));
        } catch (error) {
            console.warn('Product view tracking failed', error);
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSaving(true);
        try {
            const formData = new FormData(event.currentTarget);
            const itemType = String(formData.get('itemType') || 'Product');
            const rawTags = String(formData.get('tags') || '');
            const tags = rawTags.split(',').map(tag => tag.trim()).filter(Boolean);
            tags.push(itemType);
            formData.set('tags', Array.from(new Set(tags)).join(','));
            formData.delete('itemType');

            selectedImages.forEach(file => formData.append('images', file));
            const selectedRegId = localStorage.getItem('selectedRegId');
            if (selectedRegId) formData.append('regId', selectedRegId);

            const token = localStorage.getItem('exhibitorToken');
            const isEdit = !!editingItem;
            const res = await fetch(`${API_URL}/stall-products${isEdit ? `/${editingItem._id}${getRegParam()}` : ''}`, {
                method: isEdit ? 'PUT' : 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });
            const data = await res.json();
            if (!res.ok || !data.success) throw new Error(data.message || 'Failed to save item');

            toast.success(isEdit ? 'Item updated successfully' : 'Item added successfully');
            setShowProductModal(false);
            setEditingItem(null);
            setSelectedImages([]);
            await fetchProducts();
        } catch (error: any) {
            toast.error(error.message || 'Failed to save item');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="w-full bg-white min-h-screen font-sans relative p-4 lg:p-5">

            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2 ">
                <div>
                    <h2 className="text-[18px] lg:text-[20px] leading-none font-bold text-blue-900">My Products & Services</h2>
                    <div className="text-xs lg:text-sm text-slate-500  flex items-center gap-1.5">
                        <span>Home</span>
                        <ChevronRight size={12} />
                        <span className="text-slate-700">Products & Services</span>
                    </div>
                </div>
                <Button onClick={openAddModal} className="bg-[#10b981] hover:bg-[#059669] text-white flex items-center gap-1.5 px-3 py-0.5 h-8 text-sm">
                    <Plus size={14} />
                    Add New Product / Service
                </Button>
            </div>

            {/* Banner Section */}
            <div className='rounded-2xl overflow-hidden mb-3'>
                <img loading="lazy" decoding="async" src={productImage} alt="Products & Services" className="w-full h-full object-cover" />
            </div>
            {/* <div className="rounded-2xl px-4 md:px-5 mb-3 flex flex-col md:flex-row items-center justify-between overflow-hidden relative bg-gradient-to-r from-sky-200 to-sky-100/70">
                <div className="md:w-1/2 py-3 relative z-10">
                    <h2 className="text-base md:text-lg font-semibold text-[#1a2b3c] mb-1 max-w-sm leading-tight ">
                        Showcase your innovative healthcare products & services
                    </h2>
                    <p className="text-[11px] md:text-xs text-slate-500 max-w-md leading-relaxed">
                        Add products and services to attract more buyers and generate quality leads at IHWE 2026.
                    </p>
                </div>
                <div className="md:w-1/2 flex justify-center items-end relative z-10">
                    <img loading="lazy" decoding="async" src={productImage} alt="Healthcare Products" className="h-20 md:h-28 object-contain" />
                </div>
            </div> */}

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-3 mb-2">
                <div className="bg-white p-2 md:p-2.5 rounded-xl shadow-sm border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center gap-2 md:gap-3">
                    <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                        <Package size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Total Products</p>
                        <h3 className="text-lg md:text-xl font-semibold text-slate-800">{totalProducts}</h3>
                        <p className="text-[9px] text-slate-400">Published Products</p>
                    </div>
                </div>
                <div className="bg-white p-2 md:p-2.5 rounded-xl shadow-sm border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center gap-2 md:gap-3">
                    <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                        <Layers size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Total Services</p>
                        <h3 className="text-lg md:text-xl font-semibold text-slate-800">{totalServices}</h3>
                        <p className="text-[9px] text-slate-400">Published Services</p>
                    </div>
                </div>
                <div className="bg-white p-2 md:p-2.5 rounded-xl shadow-sm border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center gap-2 md:gap-3">
                    <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                        <Eye size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Total Views</p>
                        <h3 className="text-lg md:text-xl font-semibold text-slate-800">{totalViews.toLocaleString()}</h3>
                        <p className="text-[9px] text-slate-400">All Time Views</p>
                    </div>
                </div>
                <div className="bg-white p-2 md:p-2.5 rounded-xl shadow-sm border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center gap-2 md:gap-3">
                    <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                        <Users size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Total Inquiries</p>
                        <h3 className="text-lg md:text-xl font-semibold text-slate-800">{totalInquiries}</h3>
                        <p className="text-[9px] text-slate-400">Received Inquiries</p>
                    </div>
                </div>
                <div className="bg-white p-2 md:p-2.5 rounded-xl shadow-sm border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center gap-2 md:gap-3">
                    <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-green-50 text-green-500 flex items-center justify-center shrink-0">
                        <TrendingUp size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] font-semibold text-slate-500 uppercase whitespace-nowrap tracking-wider">Conversion Leads</p>
                        <h3 className="text-lg md:text-xl font-semibold text-slate-800">{Math.floor(totalInquiries * 0.4)}</h3>
                        <p className="text-[9px] text-slate-400">Qualified Leads</p>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-1.5 md:p-2 mb-2 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-2">
                <div className="flex space-x-3 sm:space-x-5 w-full overflow-x-auto no-scrollbar scroll-smooth px-1">
                    {['All Items', 'Products', 'Services', 'Drafts'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
                            className={`py-0.5 px-1 text-[13px] font-semibold transition-colors border-b-2 whitespace-nowrap ${activeTab === tab
                                ? "border-[#10b981] text-[#10b981]"
                                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full xl:w-auto pr-1">
                    <div className="relative w-full sm:w-auto">
                        <select
                            value={categoryFilter}
                            onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
                            className="appearance-none bg-white border border-slate-200 rounded-lg pl-2 pr-7 py-1 text-[13px] font-medium text-slate-600 focus:outline-none focus:ring-2 focus:ring-green-500/20 w-full h-8"
                        >
                            <option>All Categories</option>
                            {categoryOptions.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                    <div className="relative flex-1 sm:w-52">
                        <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <Input
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                            placeholder="Search products..."
                            className="pl-8 h-8 bg-white border-slate-200 text-[13px] focus-visible:ring-green-500/20"
                        />
                    </div>
                    <Button variant="outline" className="h-8 bg-white border-slate-200 text-slate-600 font-medium shrink-0 text-[13px]">
                        <Filter size={13} className="mr-1.5" />
                        Filters
                    </Button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4">

                {/* Left Column - Table Area */}
                <div className="lg:col-span-2">
                    {/* Tabs and Filters */}


                    {/* Table Container */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-2 md:p-3 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="font-semibold text-[#1a2b3c] text-[15px] md:text-base">Your Products & Services</h3>
                            <span className="text-[11px] font-semibold bg-slate-100 text-slate-500 py-0.5 px-2 rounded-lg"></span>
                        </div>

                        <div className="divide-y divide-slate-100">
                            {loading ? (
                                <div className="p-8 text-center text-slate-500 text-sm flex items-center justify-center gap-2">
                                    <Loader2 size={16} className="animate-spin" />
                                    Loading products...
                                </div>
                            ) : paginatedItems.length === 0 ? (
                                <div className="p-4 md:p-5 text-center text-slate-500 text-sm">No items found matching your criteria.</div>
                            ) : paginatedItems.map((item) => (
                                <div key={item._id} className="p-2 md:p-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between hover:bg-slate-50 transition-colors gap-2 md:gap-3">
                                    <div className="flex items-center gap-2.5 flex-1 min-w-0">
                                        <div className="w-14 h-10 sm:w-16 sm:h-12 bg-slate-100 rounded-lg overflow-hidden shrink-0 border border-slate-200">
                                            {item.image ? (
                                                <img loading="lazy" decoding="async" src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                    <ImageIcon size={16} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2 mb-0.5">
                                                <h4 className="font-medium text-[#1a2b3c] text-[12px] sm:text-[13px]">{item.title}</h4>
                                                <span className={`text-[9px] px-1.5 py-0.5 rounded-sm font-bold uppercase tracking-wider shrink-0 ${item.type === 'Product'
                                                    ? 'bg-[#10b981]/10 text-[#10b981]'
                                                    : 'bg-blue-100 text-blue-700'
                                                    }`}>
                                                    {item.type}
                                                </span>
                                            </div>
                                            <div className="flex items-center text-[11px] text-slate-500 font-medium">
                                                <Settings size={10} className="mr-1 opacity-50" />
                                                <span className="truncate">{item.category}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-5 w-full sm:w-auto mt-1 sm:mt-0">
                                        <div className="flex gap-3 sm:gap-5">
                                            <div>
                                                <p className="text-[9px] text-slate-400 font-semibold uppercase mb-0.5">Views</p>
                                                <p className="font-medium text-slate-800 text-[11px] sm:text-[13px]">{item.views}</p>
                                            </div>
                                            <div>
                                                <p className="text-[9px] text-slate-400 font-semibold uppercase mb-0.5">Inquiries</p>
                                                <p className="font-medium text-slate-800 text-[11px] sm:text-[13px]">{item.inquiries}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1 ml-auto sm:ml-3">
                                            <Button onClick={() => handleView(item)} variant="ghost" size="icon" className="h-7 w-7 text-slate-500 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 bg-white">
                                                <Eye size={12} />
                                            </Button>
                                            <Button onClick={() => handleEdit(item)} variant="ghost" size="icon" className="h-7 w-7 text-slate-500 hover:text-[#10b981] hover:bg-[#10b981]/10 border border-slate-200 bg-white">
                                                <Edit2 size={12} />
                                            </Button>
                                            <Button onClick={() => handleDelete(item._id)} variant="ghost" size="icon" className="h-7 w-7 text-slate-500 hover:text-red-600 hover:bg-red-50 border border-slate-200 bg-white">
                                                <Trash2 size={12} />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredItems.length > 0 && (
                            <div className="p-2 md:p-2.5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[12px] font-medium text-slate-500">
                                <div>Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredItems.length)} of {filteredItems.length} entries</div>
                                <div className="flex items-center gap-1">
                                    <Button
                                        variant="outline" size="icon" className="h-7 w-7 border-slate-200"
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                    >
                                        <ChevronLeft size={12} />
                                    </Button>

                                    {(() => {
                                        const pages = [];
                                        let lastAdded = 0;
                                        for (let i = 1; i <= totalPages; i++) {
                                            if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
                                                if (lastAdded < i - 1) {
                                                    pages.push(<span key={`ellipsis-${i}`} className="px-1 text-slate-400 text-[12px]">...</span>);
                                                }
                                                pages.push(
                                                    <Button
                                                        key={i}
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => setCurrentPage(i)}
                                                        className={`h-7 w-7 text-[12px] ${currentPage === i ? "bg-[#10b981] text-white hover:bg-[#059669] hover:text-white border-transparent" : "border-slate-200"}`}
                                                    >
                                                        {i}
                                                    </Button>
                                                );
                                                lastAdded = i;
                                            }
                                        }
                                        return pages;
                                    })()}

                                    <Button
                                        variant="outline" size="icon" className="h-7 w-7 border-slate-200"
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                    >
                                        <ChevronRight size={12} />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column - Widgets */}
                <div className="space-y-3 md:space-y-4">
                    {/* Categories Widget */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="px-2 md:px-3 py-1 md:py-1.5 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="font-semibold text-[#1a2b3c] text-[14px]">Categories</h3>
                            <button className="text-[10px] font-bold text-blue-600 hover:text-blue-700">Manage Categories</button>
                        </div>
                        <div className="p-2 md:p-3 space-y-1 md:space-y-1.5">
                            {categories.map((cat, i) => {
                                const Icon = cat.icon;
                                return (
                                    <div key={i} className="flex justify-between items-center text-[12px] md:text-[13px]">
                                        <div className="flex items-center gap-2 text-slate-600 font-medium">
                                            <Icon size={14} className="text-slate-400" />
                                            <span>{cat.name}</span>
                                        </div>
                                        <span className="font-bold text-slate-800 bg-slate-50 w-5 h-5 md:w-6 md:h-6 rounded-md flex items-center justify-center text-[10px] md:text-[11px]">{cat.count}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Tips Widget */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="px-2 md:px-3 py-1 md:py-1.5 border-b border-slate-100">
                            <h3 className="font-semibold text-[#1a2b3c] text-[14px]">Tips to Get More Leads</h3>
                        </div>
                        <div className="p-2 md:p-3 space-y-1 md:space-y-1.5">
                            {[
                                "Add high quality images and videos",
                                "Write detailed product descriptions",
                                "Keep your information up to date",
                                "Add brochures and specifications"
                            ].map((tip, i) => (
                                <div key={i} className="flex items-start gap-1.5 md:gap-2 text-[12px] md:text-[13px] text-slate-600 font-medium">
                                    <CheckCircle2 size={14} className="text-[#10b981] shrink-0 mt-0.5" />
                                    <span>{tip}</span>
                                </div>
                            ))}

                            <Button variant="outline" className="w-full mt-1.5 border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 font-bold gap-1.5 h-8 text-[12px]">
                                View Best Practices
                                <ExternalLink size={12} />
                            </Button>
                        </div>
                    </div>
                </div>

            </div>

            {viewingItem && (
                <div className="fixed inset-0 z-[110] bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden relative grid grid-cols-1 md:grid-cols-5 max-h-[86vh]">
                        <button
                            type="button"
                            onClick={() => setViewingItem(null)}
                            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white shadow flex items-center justify-center text-slate-600"
                        >
                            <X size={18} />
                        </button>

                        <div className="md:col-span-3 bg-slate-100 min-h-[280px] md:min-h-[520px] flex flex-col">
                            <div className="flex-1 flex items-center justify-center p-6">
                                {viewingItem.images?.[activeViewImage] ? (
                                    <img loading="lazy" decoding="async" src={viewingItem.images[activeViewImage]}
                                        alt={viewingItem.title}
                                        className="max-w-full max-h-[420px] object-contain rounded-lg bg-white shadow-sm"
                                    />
                                ) : (
                                    <div className="text-slate-300 flex flex-col items-center gap-2">
                                        <Package size={56} />
                                        <span className="text-[10px] font-bold uppercase">No Image</span>
                                    </div>
                                )}
                            </div>
                            {viewingItem.images.length > 1 && (
                                <div className="p-3 bg-white/70 flex gap-2 overflow-x-auto">
                                    {viewingItem.images.map((img, index) => (
                                        <button
                                            key={img}
                                            type="button"
                                            onClick={() => setActiveViewImage(index)}
                                            className={`w-14 h-14 rounded-md border-2 overflow-hidden bg-white shrink-0 ${activeViewImage === index ? 'border-[#10b981]' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                        >
                                            <img loading="lazy" decoding="async" src={img} alt="" className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="md:col-span-2 p-5 md:p-6 overflow-y-auto">
                            <div className="mb-4">
                                <div className="flex flex-wrap gap-1.5 mb-2">
                                    <span className={`text-[9px] px-2 py-1 rounded-sm font-bold uppercase tracking-wider ${viewingItem.type === 'Product' ? 'bg-[#10b981]/10 text-[#10b981]' : 'bg-blue-100 text-blue-700'}`}>
                                        {viewingItem.type}
                                    </span>
                                    <span className="text-[9px] px-2 py-1 rounded-sm font-bold uppercase bg-slate-100 text-slate-600">
                                        {viewingItem.category}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-blue-900 leading-tight">{viewingItem.title}</h3>
                                <p className="text-lg font-bold text-[#10b981] mt-2">
                                    {viewingItem.price ? `₹${viewingItem.price}` : 'Price on request'}
                                    {viewingItem.priceUnit && <span className="text-xs text-slate-400 font-medium"> / {viewingItem.priceUnit}</span>}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-2 mb-5">
                                <div className="bg-slate-50 rounded-lg p-3 text-center">
                                    <p className="text-[9px] uppercase font-semibold text-slate-400">Views</p>
                                    <p className="text-base font-bold text-slate-800">{viewingItem.views}</p>
                                </div>
                                <div className="bg-slate-50 rounded-lg p-3 text-center">
                                    <p className="text-[9px] uppercase font-semibold text-slate-400">Inquiries</p>
                                    <p className="text-base font-bold text-[#10b981]">{viewingItem.inquiries}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-1">Description</h4>
                                    <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                                        {viewingItem.description || 'No description provided.'}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-1">Specifications</h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between gap-3 border-b border-slate-100 pb-2">
                                            <span className="text-slate-400">MOQ</span>
                                            <span className="font-semibold text-slate-700 text-right">{viewingItem.moq || 'N/A'}</span>
                                        </div>
                                        <div className="flex justify-between gap-3 border-b border-slate-100 pb-2">
                                            <span className="text-slate-400">Images</span>
                                            <span className="font-semibold text-slate-700">{viewingItem.images.length}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showProductModal && (
                <div className="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden">
                        <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="text-base font-semibold text-blue-900">
                                {editingItem ? 'Edit Product / Service' : 'Add New Product / Service'}
                            </h3>
                            <button
                                type="button"
                                onClick={() => setShowProductModal(false)}
                                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-4 space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <div className="md:col-span-2">
                                    <label className="text-[11px] font-semibold text-slate-600 uppercase">Name *</label>
                                    <Input name="name" required defaultValue={editingItem?.title || ''} className="h-9 mt-1" placeholder="Product or service name" />
                                </div>
                                <div>
                                    <label className="text-[11px] font-semibold text-slate-600 uppercase">Type *</label>
                                    <select name="itemType" defaultValue={editingItem?.type || 'Product'} className="w-full h-9 mt-1 border border-slate-200 rounded-md px-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20">
                                        <option>Product</option>
                                        <option>Service</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[11px] font-semibold text-slate-600 uppercase">Category *</label>
                                    <select name="category" required defaultValue={editingItem?.category || 'Medical Equipment'} className="w-full h-9 mt-1 border border-slate-200 rounded-md px-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20">
                                        {categoryOptions.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[11px] font-semibold text-slate-600 uppercase">Price</label>
                                    <Input name="price" type="number" min="0" step="0.01" defaultValue={editingItem?.price || ''} className="h-9 mt-1" placeholder="0" />
                                </div>
                                <div>
                                    <label className="text-[11px] font-semibold text-slate-600 uppercase">Price Unit</label>
                                    <Input name="priceUnit" defaultValue={editingItem?.priceUnit || 'per piece'} className="h-9 mt-1" placeholder="per piece" />
                                </div>
                                <div>
                                    <label className="text-[11px] font-semibold text-slate-600 uppercase">MOQ</label>
                                    <Input name="moq" defaultValue={editingItem?.moq || ''} className="h-9 mt-1" placeholder="Minimum order qty" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-[11px] font-semibold text-slate-600 uppercase">Tags</label>
                                    <Input name="tags" defaultValue={(editingItem?.tags || []).filter(tag => tag !== 'Product' && tag !== 'Service').join(', ')} className="h-9 mt-1" placeholder="comma separated tags" />
                                </div>
                                <div className="md:col-span-3">
                                    <label className="text-[11px] font-semibold text-slate-600 uppercase">Description</label>
                                    <textarea name="description" defaultValue={editingItem?.description || ''} rows={3} className="w-full mt-1 border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20" placeholder="Short product/service description" />
                                </div>
                                <div className="md:col-span-3">
                                    <label className="text-[11px] font-semibold text-slate-600 uppercase">Images</label>
                                    <Input type="file" accept="image/*" multiple onChange={(event) => setSelectedImages(Array.from(event.target.files || []))} className="h-9 mt-1" />
                                    {editingItem?.image && (
                                        <p className="text-[11px] text-slate-500 mt-1">Existing image will remain. Upload new image only if you want to add more.</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                                <Button type="button" variant="outline" onClick={() => setShowProductModal(false)} className="h-9">
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={saving} className="h-9 bg-[#10b981] hover:bg-[#059669] text-white">
                                    {saving ? <Loader2 size={14} className="mr-2 animate-spin" /> : <Plus size={14} className="mr-2" />}
                                    {editingItem ? 'Update' : 'Save'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
