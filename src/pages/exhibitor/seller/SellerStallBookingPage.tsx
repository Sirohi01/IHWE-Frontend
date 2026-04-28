import React, { useState, useEffect } from 'react';
import { 
    MapPin, Building2, Ruler,
    CheckCircle2, AlertCircle, Send, Sparkles, Info
} from 'lucide-react';
import { API_URL } from '@/lib/api';
import { toast } from 'sonner';
import StallMap from '@/components/dashboard/seller/StallMap';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import DashboardHero from '@/components/dashboard/DashboardHero';

interface Stall {
    _id: string;
    stallNumber: string;
    length: number;
    width: number;
    area: number;
    plScheme: string;
    incrementPercentage: number;
    discountPercentage: number;
    status: 'available' | 'booked' | 'reserved';
    eventId: { _id: string; name: string };
}

export default function SellerStallBookingPage() {
    const { data } = useExhibitorCtx();
    const [selectedStall, setSelectedStall] = useState<Stall | null>(null);
    const [showCustomRequest, setShowCustomRequest] = useState(false);
    const [customRequest, setCustomRequest] = useState({
        spaceSize: '',
        hallPreference: '',
        requirements: '',
        budget: ''
    });
    const [submitting, setSubmitting] = useState(false);

    const handleStallSelect = (stall: Stall) => {
        setSelectedStall(stall);
        toast.success(`Selected Stall ${stall.stallNumber} — ${stall.area} sqm`);
    };

    const handleBookStall = async () => {
        if (!selectedStall) return;
        
        setSubmitting(true);
        try {
            const token = localStorage.getItem('exhibitorToken');
            const res = await fetch(`${API_URL}/seller-portal/service-request`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    serviceType: 'stall_booking',
                    serviceName: `Stall Booking - ${selectedStall.stallNumber}`,
                    details: {
                        stallId: selectedStall._id,
                        stallNumber: selectedStall.stallNumber,
                        area: selectedStall.area,
                        length: selectedStall.length,
                        width: selectedStall.width,
                        plScheme: selectedStall.plScheme,
                        eventId: selectedStall.eventId?._id,
                        eventName: selectedStall.eventId?.name,
                    }
                })
            });
            
            const data = await res.json();
            if (data.success) {
                toast.success('Stall booking request submitted successfully!');
                setSelectedStall(null);
            } else {
                toast.error(data.message || 'Failed to submit booking request');
            }
        } catch (error) {
            toast.error('Failed to submit booking request');
        } finally {
            setSubmitting(false);
        }
    };

    const handleCustomRequest = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!customRequest.spaceSize || !customRequest.requirements) {
            toast.error('Please fill in all required fields');
            return;
        }
        
        setSubmitting(true);
        try {
            const token = localStorage.getItem('exhibitorToken');
            const res = await fetch(`${API_URL}/seller-portal/request-custom-space`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(customRequest)
            });
            
            const data = await res.json();
            if (data.success) {
                toast.success('Custom space request submitted successfully!');
                setCustomRequest({ spaceSize: '', hallPreference: '', requirements: '', budget: '' });
                setShowCustomRequest(false);
            } else {
                toast.error(data.message || 'Failed to submit request');
            }
        } catch (error) {
            toast.error('Failed to submit request');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <DashboardHero
                pageId="sl-stall"
                defaultTitle="Stall Booking"
                defaultSubtitle="Manage your stall allocation and request custom space"
                type="seller"
            />
            {/* ── Your Current Stall ── */}
            {data?.participation?.stallFor || data?.participation?.stallNo ? (
                <div className="bg-gradient-to-r from-[#23471d] to-[#2d5a25] rounded-xl p-5 flex flex-wrap items-center gap-5 shadow-sm">
                    <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center shrink-0">
                        <CheckCircle2 size={24} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-[9px] text-white/50 font-black uppercase tracking-widest mb-0.5">Your Allocated Stall</p>
                        <p className="text-2xl font-black text-white leading-none">
                            {data.participation.stallFor || data.participation.stallNo}
                        </p>
                        <p className="text-xs text-white/70 font-bold mt-1">
                            {data.participation.stallType && `${data.participation.stallType} • `}
                            {data.participation.stallSize ? `${data.participation.stallSize} sqm` : ''}
                            {data.participation.stallScheme && ` • ${data.participation.stallScheme}`}
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {data.participation.stallSize && (
                            <div className="bg-white/10 rounded-lg px-4 py-2 text-center">
                                <p className="text-[9px] text-white/50 font-black uppercase">Size</p>
                                <p className="text-lg font-black text-white">{data.participation.stallSize} sqm</p>
                            </div>
                        )}
                        {data.eventId?.name && (
                            <div className="bg-white/10 rounded-lg px-4 py-2 text-center">
                                <p className="text-[9px] text-white/50 font-black uppercase">Event</p>
                                <p className="text-sm font-black text-white">{data.eventId.name}</p>
                            </div>
                        )}
                        <div className={`rounded-lg px-4 py-2 text-center ${
                            data.status === 'paid' ? 'bg-emerald-500/20' :
                            data.status === 'advance-paid' ? 'bg-cyan-500/20' :
                            'bg-amber-500/20'
                        }`}>
                            <p className="text-[9px] text-white/50 font-black uppercase">Status</p>
                            <p className="text-sm font-black text-white capitalize">{data.status}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
                    <Info size={18} className="text-amber-600 shrink-0" />
                    <div>
                        <p className="text-sm font-black text-amber-800">No Stall Allocated Yet</p>
                        <p className="text-xs text-amber-600 mt-0.5">You haven't been assigned a stall. Contact admin or book a new stall below.</p>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-lg p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-black uppercase tracking-tight mb-1">Stall Map & Booking</h1>
                        <p className="text-sm text-white/70 font-bold">
                            View all stalls for the current event. Available stalls can be requested.
                        </p>
                    </div>
                    <button
                        onClick={() => setShowCustomRequest(!showCustomRequest)}
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-colors"
                    >
                        <Sparkles size={16} />
                        <span className="text-xs font-black uppercase">Custom Space Request</span>
                    </button>
                </div>
            </div>

            {/* Custom Space Request Form */}
            {showCustomRequest && (
                <div className="bg-white border border-slate-200 rounded-lg p-6">
                    <h2 className="text-lg font-black uppercase text-slate-800 mb-4">Request Custom Space</h2>
                    <form onSubmit={handleCustomRequest} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-black text-slate-600 uppercase mb-2">
                                    Space Size (sqm) *
                                </label>
                                <input
                                    type="number"
                                    value={customRequest.spaceSize}
                                    onChange={(e) => setCustomRequest({ ...customRequest, spaceSize: e.target.value })}
                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#23471d]"
                                    placeholder="e.g., 50"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-black text-slate-600 uppercase mb-2">
                                    Hall Preference
                                </label>
                                <input
                                    type="text"
                                    value={customRequest.hallPreference}
                                    onChange={(e) => setCustomRequest({ ...customRequest, hallPreference: e.target.value })}
                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#23471d]"
                                    placeholder="e.g., Hall A"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-black text-slate-600 uppercase mb-2">
                                Requirements *
                            </label>
                            <textarea
                                value={customRequest.requirements}
                                onChange={(e) => setCustomRequest({ ...customRequest, requirements: e.target.value })}
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#23471d]"
                                rows={3}
                                placeholder="Describe your space requirements..."
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black text-slate-600 uppercase mb-2">
                                Budget (INR)
                            </label>
                            <input
                                type="number"
                                value={customRequest.budget}
                                onChange={(e) => setCustomRequest({ ...customRequest, budget: e.target.value })}
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#23471d]"
                                placeholder="e.g., 100000"
                            />
                        </div>
                        <div className="flex gap-3">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="flex items-center gap-2 px-6 py-2 bg-[#23471d] text-white rounded-lg hover:bg-[#2d5a24] transition-colors disabled:opacity-50"
                            >
                                <Send size={16} />
                                <span className="text-xs font-black uppercase">
                                    {submitting ? 'Submitting...' : 'Submit Request'}
                                </span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowCustomRequest(false)}
                                className="px-6 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors text-xs font-black uppercase"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Selected Stall Details */}
            {selectedStall && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-3">
                                <CheckCircle2 size={20} className="text-blue-600" />
                                <h3 className="text-lg font-black uppercase text-blue-900">Selected Stall</h3>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Stall Number</p>
                                    <p className="text-xl font-black text-blue-900">{selectedStall.stallNumber}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Event</p>
                                    <p className="text-sm font-black text-blue-900">{selectedStall.eventId?.name || '—'}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Size</p>
                                    <p className="text-xl font-black text-blue-900">{selectedStall.area} sqm</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Dimensions</p>
                                    <p className="text-xl font-black text-blue-900">{selectedStall.length}m × {selectedStall.width}m</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 mt-4">
                                <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 rounded-full">
                                    <span className="text-xs font-black text-blue-700 uppercase">{selectedStall.plScheme}</span>
                                </div>
                                {selectedStall.incrementPercentage > 0 && (
                                    <div className="flex items-center gap-2 px-3 py-1 bg-red-100 rounded-full">
                                        <span className="text-xs font-black text-red-700 uppercase">+{selectedStall.incrementPercentage}% Increment</span>
                                    </div>
                                )}
                                {selectedStall.discountPercentage > 0 && (
                                    <div className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
                                        <span className="text-xs font-black text-green-700 uppercase">-{selectedStall.discountPercentage}% Discount</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button
                                onClick={handleBookStall}
                                disabled={submitting}
                                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                            >
                                <CheckCircle2 size={16} />
                                <span className="text-xs font-black uppercase">
                                    {submitting ? 'Booking...' : 'Book This Stall'}
                                </span>
                            </button>
                            <button
                                onClick={() => setSelectedStall(null)}
                                className="px-6 py-2 bg-white text-slate-600 rounded-lg hover:bg-slate-50 transition-colors text-xs font-black uppercase border border-slate-200"
                            >
                                Clear Selection
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Stall Map */}
            <StallMap 
                onStallSelect={handleStallSelect}
                selectedStallId={selectedStall?._id}
                currentUserRegId={data?.registrationId}
            />

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <MapPin size={20} className="text-green-600" />
                        </div>
                        <h3 className="text-sm font-black uppercase text-slate-800">Location Benefits</h3>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-600 font-bold">
                        <li>• Corner stalls offer maximum visibility</li>
                        <li>• Near entrance = high foot traffic</li>
                        <li>• Hall A has premium positioning</li>
                    </ul>
                </div>
                <div className="bg-white border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Ruler size={20} className="text-blue-600" />
                        </div>
                        <h3 className="text-sm font-black uppercase text-slate-800">Stall Types</h3>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-600 font-bold">
                        <li>• Shell: Basic structure included</li>
                        <li>• Bare: Customize completely</li>
                        <li>• Premium: Fully furnished</li>
                    </ul>
                </div>
                <div className="bg-white border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <AlertCircle size={20} className="text-purple-600" />
                        </div>
                        <h3 className="text-sm font-black uppercase text-slate-800">Booking Process</h3>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-600 font-bold">
                        <li>• Select stall from map</li>
                        <li>• Submit booking request</li>
                        <li>• Admin approval required</li>
                        <li>• Payment after approval</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
