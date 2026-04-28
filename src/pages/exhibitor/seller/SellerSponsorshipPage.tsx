import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import {
    Award, CheckCircle2, Zap,
    ArrowRight, BadgeInfo, Package, Star,
    Layers, Users, Megaphone,
    RefreshCw, AlertCircle, Crown, Eye
} from 'lucide-react';
import { API_URL, SERVER_URL } from '@/lib/api';
import { toast } from 'sonner';
import DashboardHero from '@/components/dashboard/DashboardHero';

// ─── Icon map for plan icons ──────────────────────────────────────────────────
const PLAN_ICONS = [Star, Zap, Award, Crown, Layers, Package, Users];
const PLAN_COLORS = [
    { icon: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200', accent: '#f59e0b' },
    { icon: 'text-blue-500',  bg: 'bg-blue-50',  border: 'border-blue-200',  accent: '#3b82f6' },
    { icon: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200', accent: '#10b981' },
    { icon: 'text-purple-500', bg: 'bg-purple-50', border: 'border-purple-200', accent: '#8b5cf6' },
    { icon: 'text-cyan-500',  bg: 'bg-cyan-50',  border: 'border-cyan-200',  accent: '#06b6d4' },
    { icon: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-200', accent: '#f97316' },
];

function formatPrice(price: number, currency: string) {
    if (currency === 'INR') return `₹ ${price.toLocaleString('en-IN')}`;
    if (currency === 'USD') return `$ ${price.toLocaleString()}`;
    return `${currency} ${price.toLocaleString()}`;
}

function formatDuration(days: number) {
    if (days >= 365) return `${Math.round(days / 365)} Year${days >= 730 ? 's' : ''}`;
    if (days >= 30) return `${Math.round(days / 30)} Month${days >= 60 ? 's' : ''}`;
    return `${days} Days`;
}

export default function SellerSponsorshipPage() {
    const navigate = useNavigate();
    const { data, subInfo, refetchSub } = useExhibitorCtx() || {};
    const [plans, setPlans] = useState<any[]>([]);
    const [sponsorshipTypes, setSponsorshipTypes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState<string | null>(null);
    const [showSponsorships, setShowSponsorships] = useState(false);

    const currentPlanId = subInfo?.subscription?.planId;
    const isActive = subInfo?.subscription?.isActive;
    const daysRemaining = subInfo?.subscription?.daysRemaining;

    const fetchPlans = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('exhibitorToken');
            const [plansRes, sponsorshipsRes] = await Promise.all([
                fetch(`${API_URL}/seller-portal/available-plans`, {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                fetch(`${API_URL}/seller-portal/sponsorship-types`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
            ]);
            
            const plansData = await plansRes.json();
            const sponsorshipsData = await sponsorshipsRes.json();
            
            if (plansData.success) setPlans(plansData.data || []);
            if (sponsorshipsData.success) setSponsorshipTypes(sponsorshipsData.data || []);
        } catch (err) {
            console.error(err);
            toast.error('Failed to load plans');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlans();
    }, []);

    const handleApply = async (plan: any) => {
        // For custom plan, just submit service request
        if (plan._id === 'custom') {
            setApplying(plan._id);
            try {
                const token = localStorage.getItem('exhibitorToken');
                const res = await fetch(`${API_URL}/seller-portal/service-request`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                    body: JSON.stringify({
                        serviceType: 'sponsorship',
                        serviceName: 'Custom Plan Request',
                        details: { type: 'custom_plan_request' }
                    })
                });
                const d = await res.json();
                if (d.success) {
                    toast.success('Custom plan request submitted! Our team will contact you shortly.');
                } else {
                    toast.error(d.message || 'Failed to submit request');
                }
            } catch (err) {
                toast.error('Failed to submit request');
            } finally {
                setApplying(null);
            }
            return;
        }

        // For regular plans, initiate payment
        setApplying(plan._id);
        try {
            const token = localStorage.getItem('exhibitorToken');
            
            // Step 1: Create order on backend
            const orderRes = await fetch(`${API_URL}/seller-portal/subscription/create-order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ planId: plan._id })
            });
            const orderData = await orderRes.json();
            
            if (!orderData.success) {
                toast.error(orderData.message || 'Failed to create payment order');
                setApplying(null);
                return;
            }

            // Step 2: Open Razorpay checkout
            const options = {
                key: orderData.key,
                amount: orderData.order.amount,
                currency: orderData.order.currency,
                name: 'IHWE Seller Portal',
                description: `${plan.name} Subscription`,
                order_id: orderData.order.id,
                handler: async (response: any) => {
                    try {
                        // Step 3: Verify payment on backend
                        const verifyRes = await fetch(`${API_URL}/seller-portal/subscription/verify-payment`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                            body: JSON.stringify({
                                planId: plan._id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                            })
                        });
                        const verifyData = await verifyRes.json();
                        
                        if (verifyData.success) {
                            toast.success(verifyData.message);
                            // Refresh subscription info
                            if (refetchSub) refetchSub();
                            fetchPlans();
                        } else {
                            toast.error(verifyData.message || 'Payment verification failed');
                        }
                    } catch (err) {
                        toast.error('Payment verification failed');
                    } finally {
                        setApplying(null);
                    }
                },
                prefill: {
                    name: data?.exhibitorName || '',
                    email: data?.contact1?.email || '',
                    contact: data?.contact1?.phone || '',
                },
                theme: {
                    color: '#23471d',
                },
                modal: {
                    ondismiss: () => {
                        setApplying(null);
                    }
                }
            };

            // Load Razorpay script if not already loaded
            if (!(window as any).Razorpay) {
                const script = document.createElement('script');
                script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                script.async = true;
                script.onload = () => {
                    const rzp = new (window as any).Razorpay(options);
                    rzp.open();
                };
                document.body.appendChild(script);
            } else {
                const rzp = new (window as any).Razorpay(options);
                rzp.open();
            }
        } catch (err) {
            console.error('Payment error:', err);
            toast.error('Failed to initiate payment');
            setApplying(null);
        }
    };

    return (
        <div className="space-y-6 pb-12 font-inter">
            <DashboardHero 
                pageId="sl-sponsorship" 
                defaultTitle="Subscription Plans" 
                defaultSubtitle="Choose the right plan to unlock seller features and grow your business"
                type="seller" 
            />

            <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-slate-50 to-blue-50 p-5 rounded-lg border border-slate-200">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setShowSponsorships(false)}
                        className={`px-4 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                            !showSponsorships
                                ? 'bg-[#23471d] text-white'
                                : 'bg-white text-slate-600 border-2 border-slate-300'
                        }`}
                    >
                        Subscription Plans
                    </button>
                </div>
                <button onClick={fetchPlans} className="px-4 py-2.5 border-2 border-slate-300 text-slate-700 font-black text-[10px] uppercase tracking-widest rounded-lg flex items-center gap-2 hover:bg-white hover:border-slate-400 transition-all">
                    <RefreshCw size={12} /> Refresh
                </button>
            </header>

            {/* Current Subscription Status */}
            <div className={`rounded-lg p-6 text-white shadow-xl relative overflow-hidden border-l-4 ${
                isActive 
                    ? 'bg-gradient-to-r from-[#23471d] via-[#1a3516] to-[#0f2410] border-[#d26019]' 
                    : 'bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 border-amber-500'
            }`}>
                <div className="absolute right-0 top-0 p-4 opacity-5"><Award size={150} /></div>
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-lg flex items-center justify-center shadow-lg ${isActive ? 'bg-gradient-to-br from-[#d26019] to-[#b8521a]' : 'bg-gradient-to-br from-amber-500 to-amber-600'}`}>
                            {isActive ? <CheckCircle2 size={28} className="text-white" /> : <AlertCircle size={28} className="text-white" />}
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-white/70 uppercase tracking-widest mb-1">Current Subscription</p>
                            {isActive ? (
                                <>
                                    <p className="text-xl font-black uppercase tracking-tight">{subInfo?.planDetails?.name || 'Active Plan'}</p>
                                    <p className="text-[11px] text-white/70 font-bold">
                                        {daysRemaining !== null ? `${daysRemaining} days remaining` : 'Active'}
                                        {subInfo?.subscription?.expiresAt && ` • Expires ${new Date(subInfo.subscription.expiresAt).toLocaleDateString('en-IN')}`}
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p className="text-xl font-black uppercase tracking-tight">No Active Plan</p>
                                    <p className="text-[11px] text-white/70 font-bold">Select a plan below to get started</p>
                                </>
                            )}
                        </div>
                    </div>
                    {isActive && subInfo?.planDetails?.features && (
                        <div className="flex flex-wrap gap-2">
                            {subInfo.planDetails.features.slice(0, 4).map((f: any, i: number) => (
                                <span key={i} className="bg-white/15 backdrop-blur-sm text-white text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-wider border border-white/20">
                                    {f.label}
                                </span>
                            ))}
                            {subInfo.planDetails.features.length > 4 && (
                                <span className="bg-[#d26019] text-white text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-lg">
                                    +{subInfo.planDetails.features.length - 4} more
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Plans Grid */}
            {!showSponsorships && (
            <div>
                <h3 className="text-[12px] font-black text-slate-800 uppercase tracking-widest mb-5 flex items-center gap-2 pb-3 border-b-2 border-slate-200">
                    <Zap size={14} className="text-amber-500" /> Available Subscription Plans
                </h3>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-8 h-8 border-4 border-[#23471d]/20 border-t-[#23471d] rounded-full animate-spin" />
                    </div>
                ) : plans.length === 0 ? (
                    <div className="bg-white border border-slate-200 rounded-sm p-16 text-center">
                        <Package size={36} className="text-slate-300 mx-auto mb-3" />
                        <p className="text-sm font-black text-slate-400 uppercase tracking-wide">No Plans Available</p>
                        <p className="text-xs text-slate-400 mt-1">Subscription plans will be published by the organizer. Check back later.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {plans.map((plan, i) => {
                            const colorSet = PLAN_COLORS[i % PLAN_COLORS.length];
                            const PlanIcon = PLAN_ICONS[i % PLAN_ICONS.length];
                            const isCurrent = currentPlanId === plan._id;
                            const isApplying = applying === plan._id;
                            const imageUrl = plan.imageUrl ? (plan.imageUrl.startsWith('http') ? plan.imageUrl : `${SERVER_URL}${plan.imageUrl}`) : null;

                            return (
                                <div key={plan._id} className={`bg-white border-2 rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col relative group ${
                                    isCurrent ? 'border-[#23471d] shadow-lg ring-2 ring-[#23471d]/20' : 'border-slate-200 hover:border-slate-300'
                                }`}>
                                    {/* Image Section */}
                                    <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                                        {imageUrl ? (
                                            <>
                                                <img 
                                                    src={imageUrl} 
                                                    alt={plan.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            </>
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <div className={`w-20 h-20 ${colorSet.bg} ${colorSet.icon} rounded-lg flex items-center justify-center border-2 ${colorSet.border}`}>
                                                    <PlanIcon size={40} />
                                                </div>
                                            </div>
                                        )}
                                        
                                        {/* Badge */}
                                        {isCurrent && (
                                            <div className="absolute top-3 right-3 bg-gradient-to-r from-[#23471d] to-[#1a3516] text-white text-[8px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-1 shadow-lg">
                                                <CheckCircle2 size={10} /> Current Plan
                                            </div>
                                        )}
                                        
                                        {/* Price Badge */}
                                        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                                            <p className="text-xl font-black" style={{ color: colorSet.accent }}>
                                                {formatPrice(plan.price, plan.currency)}
                                            </p>
                                            <p className="text-[9px] text-slate-500 font-bold uppercase">
                                                {formatDuration(plan.durationDays)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-5 flex-1 flex flex-col">
                                        {/* Name + Description */}
                                        <div className="mb-4">
                                            <h4 className="text-base font-black text-slate-800 uppercase tracking-tight mb-2">{plan.name}</h4>
                                            {plan.description && (
                                                <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">{plan.description}</p>
                                            )}
                                        </div>

                                        {/* Features */}
                                        {plan.features && plan.features.length > 0 && (
                                            <div className="mb-4">
                                                <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-2">Includes:</p>
                                                <ul className="space-y-1.5">
                                                    {plan.features.slice(0, 4).map((f: any, j: number) => (
                                                        <li key={j} className="flex items-center gap-2 text-[10px] font-semibold text-slate-600">
                                                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colorSet.accent }} />
                                                            {f.label}
                                                        </li>
                                                    ))}
                                                    {plan.features.length > 4 && (
                                                        <li className="text-[10px] font-bold text-slate-400 italic">
                                                            +{plan.features.length - 4} more features
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Limits */}
                                        {(plan.maxLeads > 0 || plan.maxExportInquiries > 0 || plan.maxServiceRequests > 0) && (
                                            <div className="border-t border-slate-100 pt-3 mt-auto mb-4 space-y-1">
                                                {plan.maxLeads > 0 && (
                                                    <div className="flex items-center justify-between text-[10px]">
                                                        <span className="text-slate-500 font-semibold">Max Leads:</span>
                                                        <span className="font-black text-slate-800">{plan.maxLeads}</span>
                                                    </div>
                                                )}
                                                {plan.maxExportInquiries > 0 && (
                                                    <div className="flex items-center justify-between text-[10px]">
                                                        <span className="text-slate-500 font-semibold">Export Inquiries:</span>
                                                        <span className="font-black text-slate-800">{plan.maxExportInquiries}</span>
                                                    </div>
                                                )}
                                                {plan.maxServiceRequests > 0 && (
                                                    <div className="flex items-center justify-between text-[10px]">
                                                        <span className="text-slate-500 font-semibold">Service Requests:</span>
                                                        <span className="font-black text-slate-800">{plan.maxServiceRequests}</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex gap-2 border-t border-slate-200">
                                        <button
                                            onClick={() => navigate(`/seller-portal/sponsorship/${plan._id}`)}
                                            className="flex-1 py-3.5 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all bg-slate-100 text-slate-700 hover:bg-slate-200 border-r border-slate-200"
                                        >
                                            <Eye size={13} /> View Details
                                        </button>
                                        <button
                                            onClick={() => !isCurrent && handleApply(plan)}
                                            disabled={isCurrent || isApplying}
                                            className={`flex-1 py-3.5 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                                                isCurrent 
                                                    ? 'bg-gradient-to-r from-[#23471d]/5 to-[#d26019]/5 text-[#23471d] cursor-default' 
                                                    : 'bg-gradient-to-r from-[#23471d] to-[#1a3516] text-white hover:from-black hover:to-[#23471d] shadow-md hover:shadow-lg'
                                            }`}
                                        >
                                            {isApplying ? (
                                                <><div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" /> Processing...</>
                                            ) : isCurrent ? (
                                                <><CheckCircle2 size={13} /> Active</>
                                            ) : (
                                                <>Buy Now <ArrowRight size={13} /></>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            )}

            {/* Sponsorship Types Grid */}
            {showSponsorships && (
            <div>
                <h3 className="text-[12px] font-black text-slate-800 uppercase tracking-widest mb-5 flex items-center gap-2 pb-3 border-b-2 border-slate-200">
                    <Crown size={14} className="text-amber-500" /> Event Sponsorship Opportunities
                </h3>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-8 h-8 border-4 border-[#23471d]/20 border-t-[#23471d] rounded-full animate-spin" />
                    </div>
                ) : sponsorshipTypes.length === 0 ? (
                    <div className="bg-white border border-slate-200 rounded-sm p-16 text-center">
                        <Award size={36} className="text-slate-300 mx-auto mb-3" />
                        <p className="text-sm font-black text-slate-400 uppercase tracking-wide">No Sponsorships Available</p>
                        <p className="text-xs text-slate-400 mt-1">Sponsorship opportunities will be published soon.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sponsorshipTypes.map((sponsorship, i) => {
                            const colorSet = PLAN_COLORS[i % PLAN_COLORS.length];
                            const SponsorIcon = PLAN_ICONS[i % PLAN_ICONS.length];
                            const isApplying = applying === sponsorship._id;
                            const slotsAvailable = sponsorship.slots - sponsorship.slotsBooked;

                            return (
                                <div key={sponsorship._id} className={`bg-white border-2 rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col relative group ${
                                    slotsAvailable === 0 ? 'border-slate-200 opacity-60' : 'border-slate-200 hover:border-slate-300'
                                }`}>
                                    {/* Header */}
                                    <div className="relative h-32 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                                        <div className="w-full h-full flex items-center justify-center">
                                            <div className={`w-16 h-16 ${colorSet.bg} ${colorSet.icon} rounded-lg flex items-center justify-center border-2 ${colorSet.border}`}>
                                                <SponsorIcon size={32} />
                                            </div>
                                        </div>
                                        
                                        {/* Slots Badge */}
                                        <div className={`absolute top-3 right-3 ${slotsAvailable > 0 ? 'bg-green-500' : 'bg-red-500'} text-white text-[8px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg`}>
                                            {slotsAvailable > 0 ? `${slotsAvailable} Slots Left` : 'Sold Out'}
                                        </div>
                                        
                                        {/* Price Badge */}
                                        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                                            <p className="text-lg font-black" style={{ color: colorSet.accent }}>
                                                {formatPrice(sponsorship.price, sponsorship.currency)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-5 flex-1 flex flex-col">
                                        {/* Name + Description */}
                                        <div className="mb-4">
                                            <h4 className="text-base font-black text-slate-800 uppercase tracking-tight mb-2">{sponsorship.name}</h4>
                                            <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">{sponsorship.description}</p>
                                        </div>

                                        {/* Benefits */}
                                        {sponsorship.benefits && sponsorship.benefits.length > 0 && (
                                            <div className="mb-4">
                                                <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-2">Benefits:</p>
                                                <ul className="space-y-1.5">
                                                    {sponsorship.benefits.slice(0, 4).map((benefit: string, j: number) => (
                                                        <li key={j} className="flex items-center gap-2 text-[10px] font-semibold text-slate-600">
                                                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colorSet.accent }} />
                                                            {benefit}
                                                        </li>
                                                    ))}
                                                    {sponsorship.benefits.length > 4 && (
                                                        <li className="text-[10px] font-bold text-slate-400 italic">
                                                            +{sponsorship.benefits.length - 4} more benefits
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Slots Info */}
                                        <div className="border-t border-slate-100 pt-3 mt-auto mb-4">
                                            <div className="flex items-center justify-between text-[10px]">
                                                <span className="text-slate-500 font-semibold">Total Slots:</span>
                                                <span className="font-black text-slate-800">{sponsorship.slots}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-[10px] mt-1">
                                                <span className="text-slate-500 font-semibold">Available:</span>
                                                <span className={`font-black ${slotsAvailable > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                    {slotsAvailable}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={async () => {
                                            if (slotsAvailable === 0) return;
                                            setApplying(sponsorship._id);
                                            try {
                                                const token = localStorage.getItem('exhibitorToken');
                                                const res = await fetch(`${API_URL}/seller-portal/apply-sponsorship-with-type`, {
                                                    method: 'POST',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        Authorization: `Bearer ${token}`
                                                    },
                                                    body: JSON.stringify({
                                                        sponsorshipType: sponsorship.type,
                                                        sponsorshipName: sponsorship.name,
                                                        companyName: data?.exhibitorName || '',
                                                        contactPerson: data?.contact1?.name || '',
                                                        email: data?.contact1?.email || '',
                                                        phone: data?.contact1?.phone || '',
                                                        message: `Interested in ${sponsorship.name}`
                                                    })
                                                });
                                                const result = await res.json();
                                                if (result.success) {
                                                    toast.success('Sponsorship application submitted!');
                                                } else {
                                                    toast.error(result.message || 'Failed to submit application');
                                                }
                                            } catch (error) {
                                                toast.error('Failed to submit application');
                                            } finally {
                                                setApplying(null);
                                            }
                                        }}
                                        disabled={slotsAvailable === 0 || isApplying}
                                        className={`w-full py-3.5 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all border-t border-slate-200 ${
                                            slotsAvailable === 0
                                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                                : 'bg-gradient-to-r from-[#23471d] to-[#1a3516] text-white hover:from-black hover:to-[#23471d] shadow-md hover:shadow-lg'
                                        }`}
                                    >
                                        {isApplying ? (
                                            <><div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" /> Applying...</>
                                        ) : slotsAvailable === 0 ? (
                                            <>Sold Out</>
                                        ) : (
                                            <>Apply Now <ArrowRight size={13} /></>
                                        )}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            )}

            {/* Custom Request */}
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 border-2 border-slate-200 rounded-lg p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-slate-300 transition-all">
                <div className="max-w-xl">
                    <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight mb-2 flex items-center gap-2">
                        <Crown size={18} className="text-amber-500" /> Need a Custom Plan?
                    </h3>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed">
                        If you have specific requirements or need a tailored package, our team can create a custom plan for your business goals. Get in touch with us today!
                    </p>
                </div>
                <button
                    onClick={() => handleApply({ _id: 'custom', name: 'Custom Plan', price: 0, currency: 'INR', durationDays: 365, features: [] })}
                    className="px-8 py-3.5 bg-gradient-to-r from-[#d26019] to-[#b8521a] text-white font-black text-[10px] uppercase tracking-widest rounded-lg hover:from-[#b8521a] hover:to-[#9a4416] transition-all flex items-center gap-2 whitespace-nowrap shadow-lg hover:shadow-xl"
                >
                    Contact Our Team <BadgeInfo size={14} />
                </button>
            </div>
        </div>
    );
}
