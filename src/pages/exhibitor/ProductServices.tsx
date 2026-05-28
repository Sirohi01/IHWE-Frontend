import { useState, useMemo } from 'react';
import {
    Plus, Package, Layers, Eye, Users, TrendingUp,
    Search, Filter, ChevronDown, ChevronLeft, ChevronRight,
    Edit2, Settings, Briefcase, Pill, Monitor,
    ExternalLink, CheckCircle2, PenTool, Microscope, Trash2, X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import productImage from '../../assets/productImage6.jpg'


const initialProducts = [
    {
        id: 1,
        title: "Advanced ICU Bed",
        category: "Medical Equipment",
        type: "Product",
        views: 356,
        inquiries: 24,
        image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=80&h=80"
    },
    {
        id: 2,
        title: "Portable Ventilator",
        category: "Medical Equipment", // simplified categories to match dropdown
        type: "Product",
        views: 289,
        inquiries: 18,
        image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&q=80&w=80&h=80"
    },
    {
        id: 3,
        title: "Surgical Instruments Set",
        category: "Surgical Instruments",
        type: "Product",
        views: 210,
        inquiries: 12,
        image: "https://images.unsplash.com/photo-1551076805-e1869043e560?auto=format&fit=crop&q=80&w=80&h=80"
    },
    {
        id: 4,
        title: "Laboratory Testing Services",
        category: "Diagnostic",
        type: "Service",
        views: 165,
        inquiries: 9,
        image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=80&h=80"
    },
    {
        id: 5,
        title: "Telemedicine Solutions",
        category: "Health IT Solutions",
        type: "Service",
        views: 135,
        inquiries: 8,
        image: "https://images.unsplash.com/photo-1576091160550-2173ff9e5eb3?auto=format&fit=crop&q=80&w=80&h=80"
    }
];

const categoryOptions = [
    "Medical Equipment", "Diagnostic", "Surgical Instruments", "Pharmaceuticals", "Health IT Solutions", "Other Services"
];

export default function ProductServices() {
    const [items, setItems] = useState(initialProducts);
    const [activeTab, setActiveTab] = useState('All Items');
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All Categories');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewItem, setViewItem] = useState<any>(null);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [formData, setFormData] = useState({ title: '', category: 'Medical Equipment', type: 'Product', image: '' });

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
    const handleSave = () => {
        if (!formData.title.trim()) return alert("Title is required!");

        if (editingItem) {
            setItems(items.map(i => i.id === editingItem.id ? { ...i, ...formData } : i));
        } else {
            const newItem = {
                id: Date.now(),
                ...formData,
                views: 0,
                inquiries: 0,
                image: formData.image || "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=80&h=80"
            };
            setItems([newItem, ...items]);
        }
        setIsModalOpen(false);
    };

    const handleEdit = (item: any) => {
        setEditingItem(item);
        setFormData({ title: item.title, category: item.category, type: item.type, image: item.image });
        setIsModalOpen(true);
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            setItems(items.filter(i => i.id !== id));
            if (paginatedItems.length === 1 && currentPage > 1) setCurrentPage(currentPage - 1);
        }
    };

    const openNewModal = () => {
        setEditingItem(null);
        setFormData({ title: '', category: 'Medical Equipment', type: 'Product', image: '' });
        setIsModalOpen(true);
    };

    return (
        <div className="w-full bg-white min-h-[calc(100vh-60px)] font-sans relative p-2 sm:p-4">

            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-1.5 gap-2">
                <div>
                    <h1 className="text-xl font-bold text-blue-900 leading-tight">Products & Services</h1>
                    <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                        <span>Home</span>
                        <ChevronRight size={12} />
                        <span className="text-slate-700">Products & Services</span>
                    </div>
                </div>
                <Button onClick={openNewModal} className="bg-[#10b981] hover:bg-[#059669] text-white flex items-center gap-1.5 px-2 py-0.5 text-xs h-7">
                    <Plus size={13} />
                    Add New Product / Service
                </Button>
            </div>

            {/* Banner Section */}
            <div className="rounded-xl px-4 md:px-5 mb-2 flex flex-col md:flex-row items-center justify-between overflow-hidden relative bg-gradient-to-r from-sky-200 to-sky-100/70">
                <div className="md:w-1/2 py-1 relative z-10">
                    <h2 className="text-base md:text-lg font-semibold text-[#1a2b3c] mb-0.5 max-w-sm leading-tight ">
                        Showcase your innovative healthcare products & services
                    </h2>
                    <p className="text-[10px] text-slate-600 max-w-md leading-snug">
                        Add products and services to attract more buyers and <br /> generate quality leads at IHWE 2026.
                    </p>
                </div>
                <div className="md:w-1/2 flex justify-center items-end relative z-10">
                    <img src={productImage} alt="Healthcare Products" className="h-16 md:h-20 object-contain" />
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-1.5">
                <div className="bg-white p-1.5 rounded-lg shadow-sm border border-slate-100 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                        <Package size={16} />
                    </div>
                    <div>
                        <p className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider leading-none mb-0.5">Total Products</p>
                        <h3 className="text-base font-semibold text-slate-800 leading-none mb-0.5">{totalProducts}</h3>
                        <p className="text-[8px] text-slate-400 leading-none">Published Products</p>
                    </div>
                </div>
                <div className="bg-white p-1.5 rounded-lg shadow-sm border border-slate-100 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                        <Layers size={16} />
                    </div>
                    <div>
                        <p className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider leading-none mb-0.5">Total Services</p>
                        <h3 className="text-base font-semibold text-slate-800 leading-none mb-0.5">{totalServices}</h3>
                        <p className="text-[8px] text-slate-400 leading-none">Published Services</p>
                    </div>
                </div>
                <div className="bg-white p-1.5 rounded-lg shadow-sm border border-slate-100 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                        <Eye size={16} />
                    </div>
                    <div>
                        <p className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider leading-none mb-0.5">Total Views</p>
                        <h3 className="text-base font-semibold text-slate-800 leading-none mb-0.5">{totalViews.toLocaleString()}</h3>
                        <p className="text-[8px] text-slate-400 leading-none">All Time Views</p>
                    </div>
                </div>
                <div className="bg-white p-1.5 rounded-lg shadow-sm border border-slate-100 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                        <Users size={16} />
                    </div>
                    <div>
                        <p className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider leading-none mb-0.5">Total Inquiries</p>
                        <h3 className="text-base font-semibold text-slate-800 leading-none mb-0.5">{totalInquiries}</h3>
                        <p className="text-[8px] text-slate-400 leading-none">Received Inquiries</p>
                    </div>
                </div>
                <div className="bg-white p-1.5 rounded-lg shadow-sm border border-slate-100 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-green-50 text-green-500 flex items-center justify-center shrink-0">
                        <TrendingUp size={16} />
                    </div>
                    <div>
                        <p className="text-[9px] font-semibold text-slate-500 uppercase whitespace-nowrap tracking-wider leading-none mb-0.5">Conversion Leads</p>
                        <h3 className="text-base font-semibold text-slate-800 leading-none mb-0.5">{Math.floor(totalInquiries * 0.4)}</h3>
                        <p className="text-[8px] text-slate-400 leading-none">Qualified Leads</p>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-1 mb-1.5 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-2">
                <div className="flex space-x-2 sm:space-x-4 w-full overflow-x-auto no-scrollbar scroll-smooth px-1">
                    {['All Items', 'Products', 'Services', 'Drafts'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
                            className={`py-0.5 px-1 text-xs font-semibold transition-colors border-b-2 whitespace-nowrap ${activeTab === tab
                                ? "border-[#10b981] text-[#10b981]"
                                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-1.5 w-full xl:w-auto pr-1">
                    <div className="relative w-full sm:w-auto">
                        <select
                            value={categoryFilter}
                            onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
                            className="appearance-none bg-white border border-slate-200 rounded text-xs pl-2 pr-6 py-0.5 font-medium text-slate-600 focus:outline-none focus:ring-1 focus:ring-green-500/20 w-full"
                        >
                            <option>All Categories</option>
                            {categoryOptions.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                    <div className="relative flex-1 sm:w-48">
                        <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
                        <Input
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                            placeholder="Search products..."
                            className="pl-7 h-6 text-xs bg-white border-slate-200 focus-visible:ring-green-500/20 rounded"
                        />
                    </div>
                    <Button variant="outline" className="h-6 text-xs px-2 py-0 bg-white border-slate-200 text-slate-600 font-medium shrink-0 rounded">
                        <Filter size={12} className="mr-1" />
                        Filters
                    </Button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">

                {/* Left Column - Table Area */}
                <div className="lg:col-span-2">
                    {/* Tabs and Filters */}


                    {/* Table Container */}
                    <div className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-1.5 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="font-semibold text-[#1a2b3c] text-[13px]">Your Products & Services</h3>
                            <span className="text-[10px] font-semibold bg-slate-100 text-slate-500 py-0.5 px-1.5 rounded-md">{filteredItems.length} Total</span>
                        </div>

                        <div className="divide-y divide-slate-100">
                            {paginatedItems.length === 0 ? (
                                <div className="p-3 text-center text-xs text-slate-500">No items found matching your criteria.</div>
                            ) : paginatedItems.map((item) => (
                                <div key={item.id} className="p-1.5 flex flex-col sm:flex-row items-center justify-between hover:bg-slate-50 transition-colors gap-2">
                                    <div className="flex items-center gap-2 flex-1 min-w-0">
                                        <div className="w-12 h-8 bg-slate-100 rounded overflow-hidden shrink-0 border border-slate-200">
                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-1.5 mb-0.5">
                                                <h4 className="font-medium text-[#1a2b3c] text-[11px] truncate">{item.title}</h4>
                                                <span className={`text-[8px] px-1.5 py-0 rounded-sm font-bold uppercase tracking-wider shrink-0 ${item.type === 'Product'
                                                    ? 'bg-[#10b981]/10 text-[#10b981]'
                                                    : 'bg-blue-100 text-blue-700'
                                                    }`}>
                                                    {item.type}
                                                </span>
                                            </div>
                                            <div className="flex items-center text-[10px] text-slate-500 font-medium">
                                                <Settings size={10} className="mr-1 opacity-50" />
                                                <span className="truncate">{item.category}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-end gap-3 w-auto">
                                        <div className="flex gap-3 text-right">
                                            <div>
                                                <p className="text-[8px] text-slate-400 font-semibold uppercase leading-none mb-0.5">Views</p>
                                                <p className="font-medium text-slate-800 text-[11px] leading-none">{item.views}</p>
                                            </div>
                                            <div>
                                                <p className="text-[8px] text-slate-400 font-semibold uppercase leading-none mb-0.5">Inquiries</p>
                                                <p className="font-medium text-slate-800 text-[11px] leading-none">{item.inquiries}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1 ml-2">
                                            <Button onClick={() => setViewItem(item)} variant="ghost" size="icon" className="h-6 w-6 text-slate-500 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 bg-white rounded">
                                                <Eye size={12} />
                                            </Button>
                                            <Button onClick={() => handleEdit(item)} variant="ghost" size="icon" className="h-6 w-6 text-slate-500 hover:text-[#10b981] hover:bg-[#10b981]/10 border border-slate-200 bg-white rounded">
                                                <Edit2 size={12} />
                                            </Button>
                                            <Button onClick={() => handleDelete(item.id)} variant="ghost" size="icon" className="h-6 w-6 text-slate-500 hover:text-red-600 hover:bg-red-50 border border-slate-200 bg-white rounded">
                                                <Trash2 size={12} />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredItems.length > 0 && (
                            <div className="p-1.5 border-t border-slate-100 flex items-center justify-between gap-2 text-[11px] font-medium text-slate-500">
                                <div>Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredItems.length)} of {filteredItems.length}</div>
                                <div className="flex items-center gap-1.5">
                                    <button
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="h-7 w-7 flex items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                                    >
                                        <ChevronLeft size={14} strokeWidth={2.5} />
                                    </button>

                                    {(() => {
                                        const pages = [];
                                        let lastAdded = 0;
                                        for (let i = 1; i <= totalPages; i++) {
                                            if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
                                                if (lastAdded < i - 1) {
                                                    pages.push(<span key={`ellipsis-${i}`} className="px-1 text-slate-400 font-bold">...</span>);
                                                }
                                                pages.push(
                                                    <button
                                                        key={i}
                                                        onClick={() => setCurrentPage(i)}
                                                        className={`h-7 w-7 flex items-center justify-center rounded-md text-xs font-semibold shadow-sm transition-all ${currentPage === i
                                                            ? "bg-[#10b981] text-white border border-[#10b981]"
                                                            : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                                                            }`}
                                                    >
                                                        {i}
                                                    </button>
                                                );
                                                lastAdded = i;
                                            }
                                        }
                                        return pages;
                                    })()}

                                    <button
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        className="h-7 w-7 flex items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                                    >
                                        <ChevronRight size={14} strokeWidth={2.5} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column - Widgets */}
                <div className="space-y-2">
                    {/* Categories Widget */}
                    <div className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-1.5 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="font-semibold text-[#1a2b3c] text-[12px]">Categories</h3>
                            <button className="text-[9px] font-bold text-blue-600 hover:text-blue-700">Manage Categories</button>
                        </div>
                        <div className="px-1.5 py-1 space-y-0.5">
                            {categories.map((cat, i) => {
                                const Icon = cat.icon;
                                return (
                                    <div key={i} className="flex justify-between items-center text-[11px]">
                                        <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                                            <Icon size={12} className="text-slate-400" />
                                            <span>{cat.name}</span>
                                        </div>
                                        <span className="font-bold text-slate-800 bg-slate-50 w-5 h-5 rounded flex items-center justify-center text-[9px]">{cat.count}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Tips Widget */}
                    <div className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-1.5 border-b border-slate-100">
                            <h3 className="font-semibold text-[#1a2b3c] text-[12px]">Tips to Get More Leads</h3>
                        </div>
                        <div className="p-1.5 space-y-1.5">
                            {[
                                "Add high quality images and videos",
                                "Write detailed product descriptions",
                                "Keep your information up to date",
                                "Add brochures and specifications"
                            ].map((tip, i) => (
                                <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-600 font-medium leading-tight">
                                    <CheckCircle2 size={12} className="text-[#10b981] shrink-0 mt-0.5" />
                                    <span>{tip}</span>
                                </div>
                            ))}

                            <Button variant="outline" className="w-full mt-1.5 border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 font-bold gap-1 h-7 text-[10px] rounded">
                                View Best Practices
                                <ExternalLink size={12} />
                            </Button>
                        </div>
                    </div>
                </div>

            </div>


            {/* Modal for Add / Edit */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-3">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200">
                        {/* Modal Header */}
                        <div className="px-4 py-1 border-b border-slate-200 flex justify-between items-center">
                            <h3 className="font-bold text-lg text-slate-800">
                                {editingItem ? 'Edit Item' : 'Add New Product / Service'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="px-4 py-1 space-y-3">
                            {/* Title */}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Title</label>
                                <input
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Enter product or service title..."
                                    className="w-full border border-slate-300 rounded-lg px-3 py-1 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#10b981]/30 focus:border-[#10b981] transition-colors"
                                />
                            </div>

                            {/* Type & Category */}
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Type</label>
                                    <select
                                        value={formData.type}
                                        onChange={e => setFormData({ ...formData, type: e.target.value })}
                                        className="w-full border border-slate-300 rounded-lg px-3 py-1 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#10b981]/30 focus:border-[#10b981] transition-colors"
                                    >
                                        <option value="Product">Product</option>
                                        <option value="Service">Service</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full border border-slate-300 rounded-lg px-3 py-1 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#10b981]/30 focus:border-[#10b981] transition-colors"
                                    >
                                        {categoryOptions.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                            </div>

                            {/* File Upload */}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Upload Image</label>
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-[#10b981] hover:bg-[#10b981]/5 transition-colors group">
                                    {formData.image ? (
                                        <div className="flex items-center gap-3">
                                            <img src={formData.image} alt="Preview" className="w-16 h-16 object-cover rounded-lg border border-slate-200" />
                                            <div className="text-sm">
                                                <p className="font-semibold text-slate-700">Image selected</p>
                                                <p className="text-xs text-[#10b981]">Click to change</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-2 text-slate-400 group-hover:text-[#10b981]">
                                            <Plus size={28} className="opacity-60" />
                                            <p className="text-sm font-medium">Click to upload image</p>
                                            <p className="text-[10px] text-slate-400">PNG, JPG, WEBP up to 5MB</p>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={e => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                const url = URL.createObjectURL(file);
                                                setFormData({ ...formData, image: url });
                                            }
                                        }}
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-4 py-1 border-t border-slate-200 flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setIsModalOpen(false)} className="border-slate-300 text-slate-600 hover:bg-slate-50">Cancel</Button>
                            <Button onClick={handleSave} className="bg-[#10b981] hover:bg-[#059669] text-white px-6">Save Item</Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal for View Details */}
            {viewItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-3">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200">
                        {/* Modal Header */}
                        <div className="px-4 py-2 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                            <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                                <Package size={18} className="text-[#10b981]" />
                                Item Details
                            </h3>
                            <button onClick={() => setViewItem(null)} className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-4 space-y-4">
                            <div className="w-full h-40 bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
                                <img src={viewItem.image} alt={viewItem.title} className="w-full h-full object-cover" />
                            </div>

                            <div>
                                <h4 className="text-xl font-bold text-[#1a2b3c]">{viewItem.title}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className={`text-[10px] px-2 py-0.5 rounded-sm font-bold uppercase tracking-wider ${viewItem.type === 'Product' ? 'bg-[#10b981]/10 text-[#10b981]' : 'bg-blue-100 text-blue-700'}`}>
                                        {viewItem.type}
                                    </span>
                                    <div className="flex items-center text-xs text-slate-500 font-medium">
                                        <Settings size={12} className="mr-1 opacity-50" />
                                        <span>{viewItem.category}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
                                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-1 flex items-center gap-1"><Eye size={12} /> Total Views</p>
                                    <p className="font-bold text-slate-800 text-lg">{viewItem.views}</p>
                                </div>
                                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-1 flex items-center gap-1"><Users size={12} /> Total Inquiries</p>
                                    <p className="font-bold text-slate-800 text-lg">{viewItem.inquiries}</p>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-4 py-2 border-t border-slate-200 flex justify-end">
                            <Button onClick={() => setViewItem(null)} className="bg-slate-800 hover:bg-slate-700 text-white px-6">Close</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}