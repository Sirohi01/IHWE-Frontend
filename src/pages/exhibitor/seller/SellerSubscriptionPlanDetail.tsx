import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import {
    ArrowLeft, CheckCircle2, Zap, Award, Crown,
    Layers, Package, Users, Star, AlertCircle,
    Clock, DollarSign, Briefcase
} from 'lucide-react';
import { API_URL, SERVER_URL } from '@/lib/api';
import { toast } from 'sonner';
import DashboardHero from '@/components/dashboard/DashboardHero';

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

const PLAN_ICONS = [Star, Zap, Award, Crown, Layers, Package, Users];
const PLAN_COLORS = [
    { icon: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200', accent: '#f59e0b' },
    { icon: 'text-blue-500',  bg: 'bg-blue-50',  border: 'border-blue-200',  accent: '#3b82f6' },
    { icon: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200', accent: '#10b981' },
    { icon: 'text-purple-500', bg: 'bg-purple-50', border: 'border-purple-200', accent: '#8b5cf6' },
    { icon: 'text-cyan-500',  bg: 'bg-cyan-50',  border: 'border-cyan-200',  accent: '#06b6d4' },
    { icon: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-200', accent: '#f97316' },
];

export default function SellerSubscriptionPlanDetail() {
    const { planId } = useParams<{ planId: string }>();
    const navigate = useNavigate();
    const { data, subInfo, refetchSub } = useExhibitorCtx() || {};
    const [plan, setPlan] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [purchasing, setPurchasing] = useState(false);

    const currentPlanId = subInfo?.subscription?.planId;
    const isActive = subInfo?.subscription?.isActive;

    useEffect(() => {
        fetchPlanDetail();
    }, [planId]);

    const fetchPlanDetail = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('exhibitorToken');
            const res = await fetch(`${API_URL}/seller-portal/available-plans`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const d = await res.json();
            if (d.success && d.data) {
                const foundPlan = d.data.find((p: any) => p._id === planId);
                if (foundPlan) {
                    setPlan(foundPlan);
                } else {
                    toast.error('Plan not found');
                    navigate('/seller-portal/sponsorship');
                }
            }
        } catch (err) {
            console.error(err);
            toast.error('Failed to load plan details');
        } finally {
            setLoading(false);
        }
    };

    const handlePurchase = async () => {
        if (!plan) return;
        
        setPurchasing(true);
        try {
            const token = localStorage.getItem('exhibitorToken');
            
            // Create order
            const orderRes = await fetch(`${API_URL}/seller-portal/subscription/create-order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ planId: plan._id })
            });
            const orderData = await orderRes.json();
            
            if (!orderData.success) {
                toast.error(orderData.message || 'Failed to create payment order');
                setPurchasing(false);
                return;
            }

            // Open Razorpay
            const options = {
                key: orderData.key,
                amount: orderData.order.amount,
                currency: orderData.order.currency,
                name: 'IHWE Seller Portal',
                description: `${plan.name} Subscription`,
                order_id: orderData.order.id,
                handler: async (response: any) => {
                    try {
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
                            if (refetchSub) refetchSub();
                            setTimeout(() => navigate('/seller-portal/sponsorship'), 1500);
                        } else {
                            toast.error(verifyData.message || 'Payment verification failed');
                        }
                    } catch (err) {
                        toast.error('Payment verification failed');
                    } finally {
                        setPurchasing(false);
                    }
                },
                prefill: {
                    name: data?.exhibitorName || '',
                    email: data?.contact1?.email || '',
                    contact: data?.contact1?.phone || '',
                },
                theme: { color: '#23471d' },
                modal: { ondismiss: () => setPurchasing(false) }
            };

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
            setPurchasing(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-4 border-[#23471d]/20 border-t-[#23471d] rounded-full animate-spin" />
            </div>
        );
    }

    if (!plan) {
        return (
            <div className="text-center py-20">
                <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
                <p className="text-slate-600 font-bold">Plan not found</p>
            </div>
        );
    }

    const colorIndex = PLAN_COLORS.length - 1;
    const colorSet = PLAN_COLORS[colorIndex % PLAN_COLORS.length];
    const PlanIcon = PLAN_ICONS[colorIndex % PLAN_ICONS.length];
    const imageUrl = plan.imageUrl ? (plan.imageUrl.startsWith('http') ? plan.imageUrl : `${SERVER_URL}${plan.imageUrl}`) : null;
    const isCurrent = currentPlanId === plan._id;

    return (
        <div className="space-y-8 pb-12 font-inter">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => navigate('/seller-portal/sponsorship')}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                    <ArrowLeft size={20} className="text-slate-600" />
                </button>
                <div>
                    <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tight">{plan.name}</h1>
                    <p className="text-slate-500 text-sm font-bold mt-1">Subscription Plan Details</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Image & Quick Info */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Image */}
                    <div className="bg-white border-2 border-slate-200 rounded-lg overflow-hidden shadow-lg">
                        {imageUrl ? (
                            <img loading="lazy" decoding="async" src={imageUrl} 
                                alt={plan.name}
                                className="w-full h-64 object-contain bg-slate-50 p-4"
                            />
                        ) : (
                            <div className="w-full h-64 bg-slate-50 flex items-center justify-center">
                                <div className="w-24 h-24 bg-slate-100 rounded-lg flex items-center justify-center border-2 border-slate-200">
                                    <PlanIcon size={48} className="text-slate-400" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Price Card */}
                    <div className="bg-gradient-to-br from-[#23471d] to-[#1a3516] text-white rounded-lg p-6 shadow-lg">
                        <p className="text-[10px] font-black text-white/70 uppercase tracking-widest mb-2">Price</p>
                        <p className="text-4xl font-black mb-1">{formatPrice(plan.price, plan.currency)}</p>
                        <p className="text-[11px] text-white/70 font-bold uppercase">per {formatDuration(plan.durationDays)}</p>
                        
                        {isCurrent && (
                            <div className="mt-4 pt-4 border-t border-white/20">
                                <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                                    <CheckCircle2 size={16} /> Your Current Plan
                                </div>
                            </div>
                        )}
                    </div>

                    {/* CTA Button */}
                    {!isCurrent && (
                        <button
                            onClick={handlePurchase}
                            disabled={purchasing}
                            className="w-full py-4 bg-gradient-to-r from-[#d26019] to-[#b8521a] text-white font-black text-[11px] uppercase tracking-widest rounded-lg hover:from-[#b8521a] hover:to-[#9a4416] transition-all shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {purchasing ? (
                                <><div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" /> Processing...</>
                            ) : (
                                <>Buy Now</>
                            )}
                        </button>
                    )}
                </div>

                {/* Right: Details */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Description */}
                    {plan.description && (
                        <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
                            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <Briefcase size={16} className="text-slate-600" /> Description
                            </h3>
                            <p className="text-slate-600 leading-relaxed">{plan.description}</p>
                        </div>
                    )}

                    {/* Features */}
                    {plan.features && plan.features.length > 0 && (
                        <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
                            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <CheckCircle2 size={16} className="text-slate-600" /> Included Features
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {plan.features.map((f: any, i: number) => (
                                    <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                                        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-slate-300">
                                            <CheckCircle2 size={14} className="text-white" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-800 text-sm">{f.label}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Limits & Specs */}
                    <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Zap size={16} className="text-slate-600" /> Plan Specifications
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Duration */}
                            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                                <Clock size={20} className="text-slate-600" />
                                <div>
                                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Duration</p>
                                    <p className="text-lg font-black text-slate-800">{formatDuration(plan.durationDays)}</p>
                                </div>
                            </div>

                            {/* Max Leads */}
                            {plan.maxLeads > 0 && (
                                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                                    <Users size={20} className="text-slate-600" />
                                    <div>
                                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Max Leads</p>
                                        <p className="text-lg font-black text-slate-800">{plan.maxLeads}</p>
                                    </div>
                                </div>
                            )}

                            {/* Max Export Inquiries */}
                            {plan.maxExportInquiries > 0 && (
                                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                                    <Package size={20} className="text-slate-600" />
                                    <div>
                                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Export Inquiries</p>
                                        <p className="text-lg font-black text-slate-800">{plan.maxExportInquiries}</p>
                                    </div>
                                </div>
                            )}

                            {/* Max Service Requests */}
                            {plan.maxServiceRequests > 0 && (
                                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                                    <Briefcase size={20} className="text-slate-600" />
                                    <div>
                                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Service Requests</p>
                                        <p className="text-lg font-black text-slate-800">{plan.maxServiceRequests}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Comparison Note */}
                    <div className="bg-gradient-to-r from-slate-50 to-blue-50 border-2 border-slate-200 rounded-lg p-6">
                        <p className="text-sm text-slate-600 leading-relaxed">
                            <span className="font-black text-slate-800">Ready to upgrade?</span> This plan includes all the features you need to grow your business. Click "Buy Now" to get started with your subscription today.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
