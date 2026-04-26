import React, { useState, useEffect } from 'react';
import { 
    MapPin, Building2, Ruler, DollarSign, 
    CheckCircle2, AlertCircle, Send, Sparkles
} from 'lucide-react';
import { API_URL } from '@/lib/api';
import { toast } from 'sonner';
import StallMap from '@/components/dashboard/seller/StallMap';

interface Stall {
    _id: string;
    stallNumber: string;
    hallNumber: string;
    size: number;
    type: string;
    price: number;
    currency: string;
    status: 'available' | 'booked' | 'reserved';
    isCorner: boolean;
    position: { x: number; y: number };
}

export default function SellerStallBookingPage() {
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
        toast.success(`Selected ${stall.stallNumber} - ${stall.size} sqm`);
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
                        hallNumber: selectedStall.hallNumber,
                        size: selectedStall.size,
                        type: selectedStall.type,
                        price: selectedStall.price,
                        isCorner: selectedStall.isCorner
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
            {/* Header */}
            <div className="bg-gradient-to-r from-[#23471d] to-[#2d5a24] text-white rounded-lg p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-black uppercase tracking-tight mb-2">Stall Booking</h1>
                        <p className="text-sm text-white/80 font-bold">
                            Select your preferred stall location from the interactive map
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
                                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">
                                        Stall Number
                                    </p>
                                    <p className="text-xl font-black text-blue-900">{selectedStall.stallNumber}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">
                                        Hall
                                    </p>
                                    <p className="text-xl font-black text-blue-900">Hall {selectedStall.hallNumber}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">
                                        Size
                                    </p>
                                    <p className="text-xl font-black text-blue-900">{selectedStall.size} sqm</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">
                                        Price
                                    </p>
                                    <p className="text-xl font-black text-blue-900">
                                        {selectedStall.currency} {selectedStall.price.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 mt-4">
                                <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 rounded-full">
                                    <span className="text-xs font-black text-blue-700 uppercase">{selectedStall.type}</span>
                                </div>
                                {selectedStall.isCorner && (
                                    <div className="flex items-center gap-2 px-3 py-1 bg-orange-100 rounded-full">
                                        <span className="text-xs font-black text-orange-700 uppercase">Corner Stall</span>
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
