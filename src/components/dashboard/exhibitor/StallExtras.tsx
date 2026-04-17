import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    Gift, ShoppingCart, Package, ExternalLink,
    Plus, Minus, Trash2, CreditCard, CheckCircle2, X, Loader2
} from 'lucide-react';
import { API_URL } from '@/lib/api';
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

// ── Cart item type ─────────────────────────────────────────────────────────────
interface CartItem {
    accessoryId: string;
    name: string;
    type: string;
    qty: number;
    unitPrice: number;
    gstPercent: number;
}

export default function StallExtras({ data }: StallExtrasProps) {
    const [catalog, setCatalog] = useState<any[]>([]);
    const [orders, setOrders] = useState<any[]>([]);
    const [loadingCatalog, setLoadingCatalog] = useState(true);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [showCart, setShowCart] = useState(false);
    const [paying, setPaying] = useState(false);

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
        setCart(prev => {
            const exists = prev.find(c => c.accessoryId === item._id);
            if (exists) return prev.map(c => c.accessoryId === item._id ? { ...c, qty: c.qty + 1 } : c);
            return [...prev, {
                accessoryId: item._id,
                name: item.name,
                type: item.type,
                qty: 1,
                unitPrice: item.price || 0,
                gstPercent: item.gstPercent || 18,
            }];
        });
    };

    const updateQty = (id: string, delta: number) => {
        setCart(prev => prev
            .map(c => c.accessoryId === id ? { ...c, qty: Math.max(1, c.qty + delta) } : c)
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
                            setShowCart(false);
                            loadOrders();
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

    return (
        <motion.div key="stall-extras" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="bg-white shadow-md p-4">

                {/* Header */}
                <div className="pb-3 border-b border-gray-100 mb-4 flex items-start justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Stall Extras</h1>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                            Complimentary inclusions & purchasable extras · {data?.registrationId}
                        </p>
                    </div>
                    {cart.length > 0 && (
                        <button onClick={() => setShowCart(true)}
                            className="relative flex items-center gap-2 px-4 py-2 bg-[#23471d] text-white text-[11px] font-black uppercase tracking-wider hover:bg-[#1a3516] transition-all">
                            <ShoppingCart size={13} />
                            Cart ({cart.length})
                            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#d26019] rounded-full text-[9px] font-black flex items-center justify-center">
                                {cart.reduce((s, c) => s + c.qty, 0)}
                            </span>
                        </button>
                    )}
                </div>

                {/* Stats using InfoGrid */}
                <div className="mb-5">
                    <InfoGrid rows={[
                        ['Free Inclusions', complimentaryItems.length],
                        ['My Orders', orders.length],
                        ['Total Spent', fmt(totalSpent)],
                        ['Stall ID', data?.registrationId || '—'],
                    ]} />
                </div>

                {/* Complimentary */}
                <Section title="Complimentary Inclusions (Free with your stall)" icon={Gift}>
                    {loadingCatalog ? (
                        <div className="py-6 flex justify-center"><Loader2 className="w-5 h-5 animate-spin text-[#23471d]" /></div>
                    ) : complimentaryItems.length === 0 ? (
                        <div className="py-6 text-center text-[11px] text-slate-400 font-bold uppercase border border-slate-200 rounded-[2px]">
                            No complimentary items configured yet
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {complimentaryItems.map((item: any) => (
                                <div key={item._id} className="border border-emerald-200 bg-emerald-50/40 p-3 rounded-[2px] flex items-start gap-2">
                                    <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Gift size={12} className="text-emerald-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[12px] font-bold text-slate-800">{item.name}</p>
                                        {item.description && <p className="text-[10px] text-slate-500 mt-0.5">{item.description}</p>}
                                        {(item.length || item.width || item.height) && (
                                            <p className="text-[10px] text-slate-400">{[item.length, item.width, item.height].filter(Boolean).join(' × ')}</p>
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

                {/* Purchasable Extras */}
                <Section title="Purchasable Extras" icon={ShoppingCart}>
                    {loadingCatalog ? (
                        <div className="py-6 flex justify-center"><Loader2 className="w-5 h-5 animate-spin text-[#23471d]" /></div>
                    ) : purchasableItems.length === 0 ? (
                        <div className="py-6 text-center text-[11px] text-slate-400 font-bold uppercase border border-slate-200 rounded-[2px]">
                            No extras available right now
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {purchasableItems.map((item: any) => {
                                const gstAmt = (item.price * (item.gstPercent || 18)) / 100;
                                const totalPerUnit = item.price + gstAmt;
                                const inCart = cart.find(c => c.accessoryId === item._id);
                                return (
                                    <div key={item._id} className={`border rounded-[2px] p-3 flex flex-col gap-2 transition-all ${inCart ? 'border-[#23471d] bg-green-50/30' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                                        <div>
                                            <p className="text-[12px] font-bold text-slate-800">{item.name}</p>
                                            {item.description && <p className="text-[10px] text-slate-500 mt-0.5">{item.description}</p>}
                                            {(item.length || item.width || item.height) && (
                                                <p className="text-[10px] text-slate-400">{[item.length, item.width, item.height].filter(Boolean).join(' × ')}</p>
                                            )}
                                            {item.category && (
                                                <span className="inline-block mt-1 px-2 py-0.5 bg-slate-100 text-slate-500 text-[9px] font-bold uppercase rounded-full">{item.category}</span>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-100">
                                            <div>
                                                <p className="text-[10px] text-slate-400">Base: {fmt(item.price)}</p>
                                                <p className="text-[13px] font-black text-[#23471d]">{fmt(totalPerUnit)} <span className="text-[9px] font-bold text-slate-400">/ {item.unit}</span></p>
                                                <p className="text-[9px] text-slate-400">incl. {item.gstPercent}% GST</p>
                                            </div>
                                            {inCart ? (
                                                <div className="flex items-center gap-1">
                                                    <button onClick={() => updateQty(item._id, -1)}
                                                        className="w-6 h-6 flex items-center justify-center border border-slate-300 rounded-[2px] hover:bg-slate-100">
                                                        <Minus size={10} />
                                                    </button>
                                                    <span className="w-7 text-center text-[12px] font-black text-slate-800">{inCart.qty}</span>
                                                    <button onClick={() => updateQty(item._id, 1)}
                                                        className="w-6 h-6 flex items-center justify-center border border-slate-300 rounded-[2px] hover:bg-slate-100">
                                                        <Plus size={10} />
                                                    </button>
                                                    <button onClick={() => removeFromCart(item._id)}
                                                        className="w-6 h-6 flex items-center justify-center text-red-400 hover:text-red-600 ml-1">
                                                        <Trash2 size={11} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <button onClick={() => addToCart(item)}
                                                    className="flex items-center gap-1 px-3 py-1.5 bg-[#23471d] text-white text-[10px] font-black uppercase rounded-[2px] hover:bg-[#1a3516] transition-all">
                                                    <Plus size={11} /> Add
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Floating cart bar */}
                    {cart.length > 0 && (
                        <div className="mt-4 flex items-center justify-between p-3 bg-[#23471d] text-white rounded-[2px]">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">
                                    {cart.reduce((s, c) => s + c.qty, 0)} item(s) in cart
                                </p>
                                <p className="text-base font-black">{fmt(cartTotalWithFee)} <span className="text-[10px] font-normal opacity-70">incl. 2.5% fee</span></p>
                            </div>
                            <button onClick={() => setShowCart(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-[#d26019] text-white text-[11px] font-black uppercase hover:bg-[#b8521a] transition-all">
                                <CreditCard size={13} /> Proceed to Pay
                            </button>
                        </div>
                    )}
                </Section>

                {/* My Orders using InfoGrid for table */}
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
                                            {['Order No', 'Items', 'Total', 'Status', 'Txn ID', 'Date', 'Receipt'].map(h => (
                                                <th key={h} className="py-2.5 px-4 text-[10px] font-black uppercase tracking-wider text-left whitespace-nowrap">{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {orders.map((order: any, i: number) => (
                                            <tr key={order._id} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}>
                                                <td className="py-2.5 px-4 text-[11px] font-bold text-[#23471d] font-mono whitespace-nowrap">{order.orderNo}</td>
                                                <td className="py-2.5 px-4">
                                                    {order.items?.map((item: any, j: number) => (
                                                        <div key={j} className="flex items-center gap-1">
                                                            <CheckCircle2 size={9} className="text-emerald-500 flex-shrink-0" />
                                                            <span className="text-[10px] text-slate-600">{item.qty}× {item.name}</span>
                                                        </div>
                                                    ))}
                                                </td>
                                                <td className="py-2.5 px-4 text-[11px] font-black text-slate-800 whitespace-nowrap">{fmt(order.grandTotal)}</td>
                                                <td className="py-2.5 px-4 whitespace-nowrap">
                                                    <span className={`px-2 py-0.5 text-[9px] font-black uppercase rounded-full border ${STATUS[order.paymentStatus] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                                                        {order.paymentStatus}
                                                    </span>
                                                </td>
                                                <td className="py-2.5 px-4 text-[10px] text-slate-500 font-mono whitespace-nowrap">{order.transactionId || '—'}</td>
                                                <td className="py-2.5 px-4 text-[10px] text-slate-500 whitespace-nowrap">
                                                    {new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                </td>
                                                <td className="py-2.5 px-4 whitespace-nowrap">
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

            {/* ── Cart / Checkout Modal ─────────────────────────────────────────── */}
            {showCart && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
                    <div className="bg-white w-full sm:max-w-md max-h-[90vh] overflow-y-auto shadow-2xl rounded-t-2xl sm:rounded-[2px]">
                        <div className="flex items-center justify-between px-5 py-3 bg-[#23471d] sticky top-0">
                            <div className="flex items-center gap-2">
                                <ShoppingCart size={14} className="text-white" />
                                <h3 className="text-[11px] font-black text-white uppercase tracking-widest">Your Cart</h3>
                            </div>
                            <button onClick={() => setShowCart(false)} className="text-white/70 hover:text-white"><X size={16} /></button>
                        </div>

                        <div className="p-4 space-y-3">
                            {cart.map(item => {
                                const base = item.unitPrice * item.qty;
                                const gst = (base * item.gstPercent) / 100;
                                return (
                                    <div key={item.accessoryId} className="flex items-center gap-3 p-3 border border-slate-200 rounded-[2px]">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[12px] font-bold text-slate-800 truncate">{item.name}</p>
                                            <p className="text-[10px] text-slate-400">{fmt(item.unitPrice)} × {item.qty} + {item.gstPercent}% GST</p>
                                        </div>
                                        <div className="flex items-center gap-1 flex-shrink-0">
                                            <button onClick={() => updateQty(item.accessoryId, -1)}
                                                className="w-6 h-6 flex items-center justify-center border border-slate-300 rounded-[2px] hover:bg-slate-100">
                                                <Minus size={10} />
                                            </button>
                                            <span className="w-7 text-center text-[12px] font-black">{item.qty}</span>
                                            <button onClick={() => updateQty(item.accessoryId, 1)}
                                                className="w-6 h-6 flex items-center justify-center border border-slate-300 rounded-[2px] hover:bg-slate-100">
                                                <Plus size={10} />
                                            </button>
                                        </div>
                                        <p className="text-[12px] font-black text-[#23471d] w-20 text-right flex-shrink-0">{fmt(base + gst)}</p>
                                        <button onClick={() => removeFromCart(item.accessoryId)} className="text-red-400 hover:text-red-600 flex-shrink-0">
                                            <Trash2 size={13} />
                                        </button>
                                    </div>
                                );
                            })}

                            {/* Totals */}
                            <div className="border-t border-slate-200 pt-3 space-y-1.5">
                                {cart.map(item => {
                                    const base = item.unitPrice * item.qty;
                                    const gst = (base * item.gstPercent) / 100;
                                    return (
                                        <div key={item.accessoryId} className="flex justify-between text-[10px] text-slate-500">
                                            <span>{item.name} (GST {item.gstPercent}%)</span>
                                            <span>{fmt(gst)}</span>
                                        </div>
                                    );
                                })}
                                <div className="flex justify-between text-[11px] text-slate-600 pt-1">
                                    <span>Subtotal (incl. GST)</span>
                                    <span className="font-bold">{fmt(cartTotal)}</span>
                                </div>
                                <div className="flex justify-between text-[11px] text-slate-500">
                                    <span>Gateway Fee (2.5%)</span>
                                    <span className="font-bold text-[#d26019]">+ {fmt(gatewayFee)}</span>
                                </div>
                                <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                                    <span className="text-[11px] font-black text-slate-700 uppercase">You Pay</span>
                                    <span className="text-lg font-black text-[#23471d]">{fmt(cartTotalWithFee)}</span>
                                </div>
                            </div>

                            <button
                                onClick={handlePay}
                                disabled={paying}
                                className="w-full flex items-center justify-center gap-2 py-3 bg-[#d26019] text-white text-[12px] font-black uppercase tracking-wider hover:bg-[#b8521a] disabled:opacity-60 transition-all mt-2"
                            >
                                {paying ? <Loader2 size={14} className="animate-spin" /> : <CreditCard size={14} />}
                                {paying ? 'Processing...' : `Pay ${fmt(cartTotalWithFee)} via Razorpay`}
                            </button>

                            <p className="text-[10px] text-slate-400 text-center">
                                Secure payment · Receipt sent to your registered email
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
}