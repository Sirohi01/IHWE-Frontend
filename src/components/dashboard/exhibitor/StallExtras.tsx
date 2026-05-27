import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    Gift, ShoppingCart, Package, ExternalLink,
    Plus, Minus, Trash2, CreditCard, CheckCircle2, X, Loader2, Image as ImageIcon,
    LayoutGrid, Armchair, Zap, Megaphone, Monitor, Wrench, Coffee, MoreHorizontal,
    Search, ChevronDown, Info, Lock, FileText, HelpCircle, Phone
} from 'lucide-react';
import { API_URL, SERVER_URL } from '@/lib/api';
import { toast } from 'sonner';

declare global { interface Window { Razorpay: any; } }

interface StallExtrasProps { data: any; }

// ── CLEAN GRID from profile component ──────────────────────────────────────────
function InfoGrid({ rows }: { rows: [string, React.ReactNode][] }) {
    return (
        <div className="border border-slate-200 rounded-md overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {rows.map(([label, value], i) => (
                    <div
                        key={i}
                        className="flex border-r border-b border-slate-200 last:border-r-0 hover:bg-slate-50/40 transition"
                    >
                        {/* Label */}
                        <div className="w-[120px] min-w-[120px] px-2 py-2 text-[10px] font-semibold text-slate-500 uppercase border-r border-slate-200 bg-slate-50 flex items-center">
                            {label}
                        </div>

                        {/* Value */}
                        <div className="flex-1 px-2 py-2 text-[11px] text-slate-800 flex items-center break-all">
                            {value ?? '—'}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ── shared UI ──────────────────────────────────────────────────────────────────
function Section({ title, icon: Icon, children }: any) {
    return (
        <div className="mb-6">
            <div className="flex items-center gap-2 mb-2 pb-1 border-b border-slate-100">
                <div className="w-1.5 h-4 bg-[#23471d] rounded-full" />
                <Icon size={13} className="text-[#23471d]" />
                <span className="font-extrabold text-[12px] text-[#23471d] uppercase tracking-wider">{title}</span>
            </div>
            {children}
        </div>
    );
}

const fmt = (n: number) => `₹${Number(n || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

const STATUS: Record<string, string> = {
    paid: 'bg-blue-50 text-blue-700 border-blue-200',
    complimentary: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
};

interface CartItem {
    accessoryId: string;
    name: string;
    type: string;
    qty: number;
    unitPrice: number;
    gstPercent: number;
    imageUrl?: string;
}

export default function StallExtras({ data }: StallExtrasProps) {
    const [catalog, setCatalog] = useState<any[]>([]);
    const [orders, setOrders] = useState<any[]>([]);
    const [loadingCatalog, setLoadingCatalog] = useState(true);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [showCartMobile, setShowCartMobile] = useState(false);
    const [paying, setPaying] = useState(false);

    // New UI states
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('All Items');
    const [sortOption, setSortOption] = useState('Popular');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 8;

    const token = localStorage.getItem('exhibitorToken') || '';

    const loadCatalog = () => {
        setLoadingCatalog(true);
        fetch(`${API_URL}/stall-accessories/accessories`)
            .then(r => r.json())
            .then(res => setCatalog(res.data || []))
            .catch(() => { })
            .finally(() => setLoadingCatalog(false));
    };

    const loadOrders = () => {
        if (!data?._id) { setLoadingOrders(false); return; }
        setLoadingOrders(true);
        fetch(`${API_URL}/stall-accessories/orders?exhibitorId=${data._id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(r => r.json())
            .then(res => setOrders(res.data || []))
            .catch(() => { })
            .finally(() => setLoadingOrders(false));
    };

    useEffect(() => { loadCatalog(); loadOrders(); }, [data?._id]);

    // ── cart helpers ────────────────────────────────────────────────────────────
    const addToCart = (item: any) => {
        const available = item.availableQty || 0;
        if (available <= 0) return toast.error('This item is currently out of stock');

        setCart(prev => {
            const exists = prev.find(c => c.accessoryId === item._id);
            if (exists) {
                if (exists.qty >= available) {
                    toast.error(`Maximum available quantity reached (${available})`);
                    return prev;
                }
                return prev.map(c => c.accessoryId === item._id ? { ...c, qty: c.qty + 1 } : c);
            }
            return [...prev, {
                accessoryId: item._id,
                name: item.name,
                type: item.type,
                availableQty: available, // Store to check in updateQty
                qty: 1,
                unitPrice: item.price || 0,
                gstPercent: item.gstPercent || 18,
            }];
        });
    };

    const updateQty = (id: string, delta: number) => {
        setCart(prev => prev
            .map(c => {
                if (c.accessoryId === id) {
                    const newQty = c.qty + delta;
                    if (delta > 0 && newQty > (c as any).availableQty) {
                        toast.error(`Maximum available quantity reached (${(c as any).availableQty})`);
                        return c;
                    }
                    return { ...c, qty: Math.max(1, newQty) };
                }
                return c;
            })
        );
    };

    const removeFromCart = (id: string) => setCart(prev => prev.filter(c => c.accessoryId !== id));

    const cartTotal = cart.reduce((sum, c) => {
        const base = c.unitPrice * c.qty;
        return sum + base + (base * c.gstPercent) / 100;
    }, 0);

    // 2.5% Razorpay gateway fee added on top for online payment
    const GATEWAY_FEE_PCT = 2.5;
    const gatewayFee = Math.round(cartTotal * GATEWAY_FEE_PCT) / 100;
    const cartTotalWithFee = Math.round((cartTotal * 1.025) * 100) / 100;

    // ── Razorpay payment ────────────────────────────────────────────────────────
    const handlePay = async () => {
        if (cart.length === 0) return;
        if (cartTotal <= 0) return toast.error('Cart total must be greater than 0');
        setPaying(true);

        try {
            // 1. Create Razorpay order (with 2.5% gateway fee)
            const orderRes = await fetch(`${API_URL}/stall-accessories/create-payment-order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ amount: cartTotalWithFee }),
            }).then(r => r.json());

            if (!orderRes.success) throw new Error(orderRes.message || 'Failed to create order');

            const rzpOrder = orderRes.order;

            // 2. Load Razorpay script if not loaded
            if (!window.Razorpay) {
                await new Promise<void>((res, rej) => {
                    const s = document.createElement('script');
                    s.src = 'https://checkout.razorpay.com/v1/checkout.js';
                    s.onload = () => res();
                    s.onerror = () => rej(new Error('Razorpay script failed to load'));
                    document.body.appendChild(s);
                });
            }

            // 3. Open Razorpay checkout
            const rzp = new window.Razorpay({
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: rzpOrder.amount,
                currency: 'INR',
                name: 'IHWE 2026',
                description: 'Stall Extras Purchase (incl. 2.5% gateway fee)',
                order_id: rzpOrder.id,
                prefill: {
                    name: data?.exhibitorName || '',
                    email: data?.contact1?.email || '',
                    contact: data?.contact1?.mobile || '',
                },
                theme: { color: '#23471d' },
                handler: async (response: any) => {
                    setPaying(true);
                    try {
                        // 4. Verify & create order
                        const verifyRes = await fetch(`${API_URL}/stall-accessories/verify-payment`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                exhibitorRegistrationId: data._id,
                                items: cart,
                            }),
                        }).then(r => r.json());

                        if (verifyRes.success) {
                            toast.success('Payment successful! Receipt sent to your email.');
                            setCart([]);
                            setShowCartMobile(false);
                            loadOrders();
                            loadCatalog();
                        } else {
                            toast.error(verifyRes.message || 'Payment verification failed');
                        }
                    } catch {
                        toast.error('Payment verification failed. Contact support.');
                    } finally {
                        setPaying(false);
                    }
                },
                modal: {
                    ondismiss: () => setPaying(false),
                },
            });
            rzp.open();
        } catch (err: any) {
            toast.error(err.message || 'Payment failed');
            setPaying(false);
        }
    };

    const purchasableItems = catalog.filter(i => i.type === 'purchasable' && i.isActive);
    const complimentaryItems = catalog.filter(i => i.type === 'complimentary' && i.isActive);
    const totalSpent = orders.filter(o => o.paymentStatus === 'paid').reduce((s, o) => s + (o.grandTotal || 0), 0);

    // Filter, Sort, Paginate
    let filteredItems = purchasableItems;
    if (activeTab !== 'All Items') {
        filteredItems = filteredItems.filter(i => i.category === activeTab);
    }
    if (searchQuery) {
        filteredItems = filteredItems.filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (sortOption === 'Price: Low to High') filteredItems.sort((a, b) => a.price - b.price);
    if (sortOption === 'Price: High to Low') filteredItems.sort((a, b) => b.price - a.price);

    const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE) || 1;
    const paginatedItems = filteredItems.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const CATEGORIES = [
        { name: 'All Items', icon: LayoutGrid },
        { name: 'Furniture', icon: Armchair },
        { name: 'Electrical', icon: Zap },
        { name: 'Branding', icon: Megaphone },
        { name: 'Technology', icon: Monitor },
        { name: 'Utilities', icon: Wrench },
        { name: 'Hospitality', icon: Coffee },
        { name: 'Others', icon: MoreHorizontal },
    ];

    const totalCartQty = cart.reduce((s, c) => s + c.qty, 0);

    return (
        <motion.div key="stall-extras" className="px-4 md:px-8 py-6 pb-12 bg-slate-50/30" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {/* Header Area replacing DashboardHero */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                <div>
                    <h1 className="font-md text-[22px]  font-bold text-[#1e293b] tracking-tight flex items-center gap-2">
                        Add On Services
                    </h1>
                    <p className="text-[13px] text-slate-500 font-medium mt-0.5">
                        Enhance your stall with premium add-on facilities and amenities.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-blue-200 text-blue-700 text-[13px] font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-sm">
                        <FileText size={16} /> Service Guidelines
                    </button>
                    {/* Cart Toggle */}
                    <button
                        onClick={() => setShowCartMobile(true)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-[#16a34a] text-white text-[13px] font-bold rounded-lg hover:bg-[#15803d] transition-colors shadow-sm relative"
                    >
                        <ShoppingCart size={16} /> My Selected Items ({totalCartQty})
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                {/* ── LEFT COLUMN: MAIN BROWSER ── */}
                <div className="lg:col-span-8 xl:col-span-9 bg-white rounded-xl shadow-sm border border-slate-100 p-4 flex flex-col gap-4 relative z-0">

                    {/* Tabs */}
                    <div className="flex overflow-x-auto pb-2 gap-1.5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {CATEGORIES.map(cat => {
                            const Icon = cat.icon;
                            const isActive = activeTab === cat.name;
                            return (
                                <button
                                    key={cat.name}
                                    onClick={() => { setActiveTab(cat.name); setCurrentPage(1); }}
                                    className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all border ${isActive
                                        ? 'border-green-100 bg-[#f0fdf4] text-[#16a34a] font-semibold shadow-sm'
                                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 font-medium'
                                        }`}
                                >
                                    <Icon size={12} className={isActive ? "text-[#16a34a]" : "text-slate-500"} />
                                    <span className="text-[11px]">{cat.name}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Filters Row */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative w-full sm:w-48">
                            <select
                                className="w-full appearance-none bg-white border border-slate-200 text-slate-700 text-[12px] font-semibold py-2.5 pl-3 pr-8 rounded-lg outline-none focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a]/20 cursor-pointer"
                                onChange={(e) => { setActiveTab(e.target.value); setCurrentPage(1); }}
                                value={activeTab}
                            >
                                {CATEGORIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                            </select>
                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>
                        <div className="relative w-full sm:w-48">
                            <select
                                className="w-full appearance-none bg-white border border-slate-200 text-slate-700 text-[12px] font-semibold py-2.5 pl-3 pr-8 rounded-lg outline-none focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a]/20 cursor-pointer"
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                            >
                                <option>Popular</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                            </select>
                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>
                        <div className="relative flex-1">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search add-on items..."
                                value={searchQuery}
                                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                                className="w-full bg-white border border-slate-200 text-slate-800 text-[12px] py-2.5 pl-9 pr-3 rounded-lg outline-none focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a]/20 placeholder-slate-400"
                            />
                        </div>
                    </div>

                    {/* Products Grid */}
                    {loadingCatalog ? (
                        <div className="py-20 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-[#16a34a]" /></div>
                    ) : paginatedItems.length === 0 ? (
                        <div className="py-20 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl">
                            <Package className="w-12 h-12 text-slate-300 mb-3" />
                            <p className="text-[14px] text-slate-500 font-semibold">No items found</p>
                            <p className="text-[12px] text-slate-400 mt-1">Try adjusting your search or filters.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
                            {paginatedItems.map((item: any) => {
                                const inCart = cart.find(c => c.accessoryId === item._id);
                                return (
                                    <div key={item._id} className={`bg-white border rounded-lg overflow-hidden flex flex-col transition-all hover:shadow-md ${inCart ? 'border-[#16a34a] ring-1 ring-[#16a34a]' : 'border-slate-200 hover:border-slate-300'}`}>
                                        <div className="h-36 bg-slate-50 border-b border-slate-100 flex items-center justify-center p-4 relative group">
                                            {item.imageUrl ? (
                                                <img src={`${SERVER_URL}${item.imageUrl}`} alt={item.name} className="w-full h-full object-contain" />
                                            ) : (
                                                <ImageIcon size={32} className="text-slate-200" />
                                            )}
                                            {item.label && (
                                                <span className="absolute top-2 left-2 bg-[#16a34a] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-sm tracking-wider">
                                                    {item.label}
                                                </span>
                                            )}
                                        </div>
                                        <div className="p-3 flex flex-col flex-1">
                                            <h3 className="text-[13px] font-semibold text-slate-800 line-clamp-2 leading-snug">{item.name}</h3>
                                            <div className="mt-1 flex items-baseline gap-1">
                                                <span className="text-[14px] font-md font-bold text-slate-900">{fmt(item.price)}</span>
                                                <span className="text-[10px] font-semibold text-slate-500">/ {item.unit || 'Unit'}</span>
                                            </div>

                                            <div className="mt-auto pt-3 flex items-center gap-2">
                                                {inCart ? (
                                                    <div className="flex-1 flex items-center justify-between border border-[#16a34a] rounded-lg overflow-hidden h-9 bg-green-50/50">
                                                        <button onClick={() => updateQty(item._id, -1)} className="w-8 h-full flex items-center justify-center text-[#16a34a] hover:bg-[#16a34a]/10 transition-colors">
                                                            <Minus size={14} />
                                                        </button>
                                                        <span className="text-[13px] font-black text-[#16a34a]">{inCart.qty}</span>
                                                        <button onClick={() => updateQty(item._id, 1)} disabled={inCart.qty >= (item.availableQty || 0)} className="w-8 h-full flex items-center justify-center text-[#16a34a] hover:bg-[#16a34a]/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => addToCart(item)}
                                                        disabled={(item.availableQty || 0) <= 0}
                                                        className="flex-1 h-9 flex items-center justify-center gap-1.5 border border-[#16a34a] text-[#16a34a] text-[12px] font-bold rounded-lg hover:bg-[#16a34a]/5 disabled:border-slate-200 disabled:text-slate-400 disabled:bg-slate-50 transition-colors"
                                                    >
                                                        <ShoppingCart size={14} /> {(item.availableQty || 0) <= 0 ? 'Out of Stock' : 'Add to Cart'}
                                                    </button>
                                                )}
                                                <button className="w-9 h-9 flex items-center justify-center border border-slate-200 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors flex-shrink-0 tooltip-trigger" title={item.description || "More info"}>
                                                    <Info size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-4 flex justify-center gap-1">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded-md text-slate-500 hover:bg-slate-50 disabled:opacity-50"
                            >
                                &lt;
                            </button>
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`w-8 h-8 flex items-center justify-center rounded-md text-[12px] font-bold ${currentPage === i + 1
                                        ? 'bg-[#16a34a] text-white border border-[#16a34a]'
                                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded-md text-slate-500 hover:bg-slate-50 disabled:opacity-50"
                            >
                                &gt;
                            </button>
                        </div>
                    )}
                </div>

                {/* ── RIGHT COLUMN: CART SIDEBAR ── */}
                <div className={`lg:col-span-4 xl:col-span-3 ${showCartMobile ? 'fixed inset-0 z-50 bg-black/50 flex justify-end' : 'hidden lg:block'} sticky top-3`}>
                    <div className={`bg-white shadow-xl lg:shadow-sm border border-slate-100 flex flex-col h-full lg:h-[calc(100vh-24px)] w-full sm:w-96 lg:w-full lg:rounded-xl overflow-hidden ${showCartMobile ? 'animate-in slide-in-from-right-full duration-200' : ''}`}>

                        {/* Cart Header */}
                        <div className="px-5 py-6 border-b border-slate-100 flex items-center justify-between bg-white">
                            <div className="flex items-center gap-2">
                                <ShoppingCart size={16} className="text-[#1e293b]" />
                                <h3 className="text-[14px] font-md font-bold text-[#1e293b]">Your Selected Items ({totalCartQty})</h3>
                            </div>
                            {showCartMobile && (
                                <button onClick={() => setShowCartMobile(false)} className="lg:hidden text-slate-400 hover:text-slate-600">
                                    <X size={20} />
                                </button>
                            )}
                        </div>

                        {/* Cart Items List */}
                        <div className="flex-1 overflow-y-auto px-2.5 py-3 bg-slate-50">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-3">
                                    <ShoppingCart size={40} className="text-slate-200" />
                                    <p className="text-[12px]">Your cart is empty</p>
                                </div>
                            ) : (
                                <div className="space-y-1.5">
                                    {cart.map(item => {
                                        const catalogItem = catalog.find(c => c._id === item.accessoryId);
                                        const finalImageUrl = item.imageUrl || catalogItem?.imageUrl;
                                        const base = item.unitPrice * item.qty;
                                        return (
                                            <div key={item.accessoryId} className="relative bg-white p-2 border border-slate-100 rounded-xl shadow-sm flex items-start gap-2">
                                                <div className="w-10 h-10 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-center flex-shrink-0 p-0.5">
                                                    {finalImageUrl ? (
                                                        <img src={finalImageUrl.startsWith('http') ? finalImageUrl : `${SERVER_URL}${finalImageUrl}`} alt={item.name} className="w-full h-full object-cover rounded-md" />
                                                    ) : (
                                                        <ImageIcon size={16} className="text-slate-300" />
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between items-start pr-5">
                                                        <h4 className="text-[11.5px] font-bold text-slate-800 line-clamp-1">{item.name}</h4>
                                                        <p className="text-[11px] font-semibold text-[#16a34a] whitespace-nowrap">{fmt(item.unitPrice)}</p>
                                                    </div>
                                                    <div className="flex items-center justify-between mt-1">
                                                        <div className="flex items-center border border-slate-200 rounded-md">
                                                            <button onClick={() => updateQty(item.accessoryId, -1)} className="w-6 h-6 flex items-center justify-center text-slate-500 hover:bg-slate-50">
                                                                <Minus size={10} />
                                                            </button>
                                                            <span className="w-6 text-center text-[11px] font-black">{item.qty}</span>
                                                            <button onClick={() => updateQty(item.accessoryId, 1)} className="w-6 h-6 flex items-center justify-center text-slate-500 hover:bg-slate-50">
                                                                <Plus size={10} />
                                                            </button>
                                                        </div>
                                                        <span className="text-[12px] font-black text-slate-800">{fmt(base)}</span>
                                                    </div>
                                                </div>
                                                <button onClick={() => removeFromCart(item.accessoryId)} className="absolute top-3 right-3 text-slate-300 hover:text-red-500 transition-colors bg-white">
                                                    <Trash2 size={13} />
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Cart Summary */}
                        <div className="px-4 py-3 border-t border-slate-100 bg-white">
                            <div className="space-y-0.5 mb-2">
                                <div className="flex justify-between text-[13px]">
                                    <span className="text-slate-500">Subtotal</span>
                                    <span className="font-semibold font-md text-slate-800">{fmt(cartTotal)}</span>
                                </div>
                                <div className="flex justify-between text-[13px]">
                                    <span className="text-slate-500">Gateway Fee (2.5%)</span>
                                    <span className="font-semibold font-md text-slate-800">{fmt(gatewayFee)}</span>
                                </div>
                                <div className="flex justify-between text-[15px] pt-1.5 border-t border-slate-100 mt-1.5">
                                    <span className="font-black text-[#1e293b]">Total</span>
                                    <span className="font-semibold font-md text-[#16a34a]">{fmt(cartTotalWithFee)}</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <button
                                    onClick={handlePay}
                                    disabled={paying || cart.length === 0}
                                    className="w-full py-2 bg-[#16a34a] text-white text-[13px] font-bold rounded-lg hover:bg-[#15803d] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 shadow-sm"
                                >
                                    {paying ? <Loader2 size={16} className="animate-spin" /> : null}
                                    {paying ? 'Processing...' : 'Proceed to Checkout →'}
                                </button>
                                <button className="w-full py-1.5 bg-white border border-blue-700 text-blue-700 text-[12px] font-semibold rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                                    <FileText size={14} /> Request Custom Item
                                </button>
                            </div>

                            {/* Help / Support Block */}
                            <div className="mt-2 p-2 bg-[#f8fafc] rounded-xl border border-slate-200 flex items-start gap-2.5">
                                <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-700">
                                    <Phone size={13} />
                                </div>
                                <div>
                                    <h4 className="text-[11.5px] font-bold text-[#1e293b]">Need Something Else?</h4>
                                    <p className="text-[10px] text-slate-600 leading-[1.3]">Can't find what you're looking for? Let us know.</p>
                                    <a href="tel:+919654900525" className="mt-1 inline-flex items-center gap-1.5 text-[11px] font-bold text-blue-700 hover:underline">
                                        <Phone size={11} /> Contact Support
                                    </a>
                                </div>
                            </div>

                            <div className="mt-2 flex flex-col items-center justify-center gap-1.5">
                                <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
                                    <Lock size={10} /> All payments are secure and encrypted
                                </div>
                                <div className="flex items-center gap-3">
                                    {/* Visa */}
                                    <span className="text-[#1434CB] font-black text-[14px] tracking-tighter italic">VISA</span>
                                    {/* Mastercard */}
                                    <div className="relative flex items-center w-[30px] h-4">
                                        <div className="w-4 h-4 bg-[#EB001B] rounded-full absolute left-0 z-10"></div>
                                        <div className="w-4 h-4 bg-[#F79E1B] rounded-full absolute left-2 z-20 mix-blend-multiply"></div>
                                    </div>
                                    {/* RuPay */}
                                    <div className="flex items-center">
                                        <span className="text-[#038554] font-black text-[13px] tracking-tight italic">Ru</span>
                                        <span className="text-[#F27221] font-black text-[13px] tracking-tight italic">Pay</span>
                                        <span className="text-[8px] -translate-y-1 text-[#F27221]">▶</span>
                                    </div>
                                    {/* UPI */}
                                    <span className="text-slate-800 font-black text-[13px] tracking-widest italic ml-1">UPI</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* My Orders and Complimentary Inclusions (moved to bottom) */}
            {false && (orders.length > 0 || complimentaryItems.length > 0) && (
                <div className="mt-12 pt-8 border-t border-slate-200">
                    <h2 className="text-[18px] font-black text-[#1e293b] mb-6">My Inclusions & Orders</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* My Orders using InfoGrid for table */}
                        <div>
                            <Section title="My Purchase Orders" icon={Package}>
                                {loadingOrders ? (
                                    <div className="py-6 flex justify-center"><Loader2 className="w-5 h-5 animate-spin text-[#23471d]" /></div>
                                ) : orders.length === 0 ? (
                                    <div className="py-8 text-center border border-slate-200 rounded-[2px]">
                                        <Package className="w-10 h-10 text-slate-200 mx-auto mb-2" />
                                        <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">No orders yet</p>
                                    </div>
                                ) : (
                                    <div className="border border-slate-200 rounded-md overflow-hidden">
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-sm">
                                                <thead>
                                                    <tr className="bg-[#23471d] text-white">
                                                        {['Order No', 'Items', 'Total', 'Status', 'Receipt'].map(h => (
                                                            <th key={h} className="py-2 px-3 text-[10px] font-black uppercase tracking-wider text-left whitespace-nowrap">{h}</th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-100">
                                                    {orders.map((order: any, i: number) => (
                                                        <tr key={order._id} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}>
                                                            <td className="py-2.5 px-3 text-[11px] font-bold text-[#23471d] font-mono whitespace-nowrap">{order.orderNo}</td>
                                                            <td className="py-2.5 px-3">
                                                                {order.items?.map((item: any, j: number) => (
                                                                    <div key={j} className="flex items-center gap-1">
                                                                        <CheckCircle2 size={9} className="text-emerald-500 flex-shrink-0" />
                                                                        <span className="text-[10px] text-slate-600">{item.qty}× {item.name}</span>
                                                                    </div>
                                                                ))}
                                                            </td>
                                                            <td className="py-2.5 px-3 text-[11px] font-black text-slate-800 whitespace-nowrap">{fmt(order.grandTotal)}</td>
                                                            <td className="py-2.5 px-3 whitespace-nowrap">
                                                                <span className={`px-2 py-0.5 text-[9px] font-black uppercase rounded-full border ${STATUS[order.paymentStatus] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                                                                    {order.paymentStatus}
                                                                </span>
                                                            </td>
                                                            <td className="py-2.5 px-3 whitespace-nowrap">
                                                                {order.receiptUrl ? (
                                                                    <a href={order.receiptUrl} target="_blank" rel="noopener noreferrer"
                                                                        className="flex items-center gap-1 text-[10px] font-bold text-[#23471d] hover:underline">
                                                                        <ExternalLink size={11} /> PDF
                                                                    </a>
                                                                ) : <span className="text-[10px] text-slate-400">—</span>}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </Section>
                        </div>

                        {/* Complimentary */}
                        <div>
                            <Section title="Complimentary Inclusions (Free with your stall)" icon={Gift}>
                                {loadingCatalog ? (
                                    <div className="py-6 flex justify-center"><Loader2 className="w-5 h-5 animate-spin text-[#23471d]" /></div>
                                ) : complimentaryItems.length === 0 ? (
                                    <div className="py-6 text-center text-[11px] text-slate-400 font-bold uppercase border border-slate-200 rounded-[2px]">
                                        No complimentary items configured yet
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {complimentaryItems.map((item: any) => (
                                            <div key={item._id} className="border border-emerald-200 bg-emerald-50/40 p-3 rounded-[2px] flex items-start gap-3">
                                                <div className="w-10 h-10 bg-white border border-emerald-100 rounded-sm overflow-hidden flex-shrink-0 flex items-center justify-center">
                                                    {item.imageUrl ? (
                                                        <img src={`${SERVER_URL}${item.imageUrl}`} alt={item.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <Gift size={14} className="text-emerald-400" />
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[12px] font-bold text-slate-800">{item.name}</p>
                                                    {item.description && <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{item.description}</p>}
                                                    {item.dimensionUnit && (item.length || item.width || item.height) && (
                                                        <p className="text-[9px] font-bold text-slate-400 mt-0.5 uppercase">
                                                            Size: {[item.length, item.width, item.height].filter(Boolean).join('×')} {item.dimensionUnit}
                                                        </p>
                                                    )}
                                                    <div className="flex items-center gap-2 mt-1.5">
                                                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[9px] font-black uppercase rounded-full">FREE</span>
                                                        <span className="text-[10px] text-slate-500">Qty: {item.includedQty} {item.unit}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </Section>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
}