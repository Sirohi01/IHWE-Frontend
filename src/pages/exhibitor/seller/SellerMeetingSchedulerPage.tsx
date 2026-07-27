import React, { useState, useEffect } from 'react';
import { 
    Calendar, Clock, User, Building2, 
    TrendingUp, Truck, ShoppingCart, Handshake,
    Send, CheckCircle2, AlertCircle
} from 'lucide-react';
import { API_URL } from '@/lib/api';
import { toast } from 'sonner';

interface MeetingType {
    value: string;
    label: string;
    icon: string;
    color: string;
}

const meetingTypeIcons: Record<string, any> = {
    TrendingUp,
    Truck,
    Building2,
    ShoppingCart,
    Handshake
};

export default function SellerMeetingSchedulerPage() {
    const [meetingTypes, setMeetingTypes] = useState<MeetingType[]>([]);
    const [selectedType, setSelectedType] = useState<string>('');
    const [formData, setFormData] = useState({
        visitorName: '',
        visitorCompany: '',
        preferredDate: '',
        preferredTime: '',
        notes: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMeetingTypes();
    }, []);

    const fetchMeetingTypes = async () => {
        try {
            const token = localStorage.getItem('exhibitorToken');
            const res = await fetch(`${API_URL}/seller-portal/meeting-types`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                setMeetingTypes(data.data);
            }
        } catch (error) {
            toast.error('Failed to load meeting types');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!selectedType) {
            toast.error('Please select a meeting type');
            return;
        }
        
        if (!formData.visitorName || !formData.preferredDate || !formData.preferredTime) {
            toast.error('Please fill in all required fields');
            return;
        }
        
        setSubmitting(true);
        try {
            const token = localStorage.getItem('exhibitorToken');
            const res = await fetch(`${API_URL}/seller-portal/schedule-meeting-with-type`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    meetingType: selectedType,
                    ...formData
                })
            });
            
            const data = await res.json();
            if (data.success) {
                toast.success('Meeting scheduled successfully!');
                setFormData({
                    visitorName: '',
                    visitorCompany: '',
                    preferredDate: '',
                    preferredTime: '',
                    notes: ''
                });
                setSelectedType('');
            } else {
                toast.error(data.message || 'Failed to schedule meeting');
            }
        } catch (error) {
            toast.error('Failed to schedule meeting');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="w-8 h-8 border-4 border-[#23471d]/20 border-t-[#23471d] rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#23471d] to-[#2d5a24] text-white rounded-lg p-6">
                <div className="flex items-center gap-3 mb-2">
                    <Calendar size={24} />
                    <h1 className="text-2xl font-black uppercase tracking-tight">Meeting Scheduler</h1>
                </div>
                <p className="text-sm text-white/80 font-bold">
                    Schedule B2B meetings with buyers, investors, and distributors
                </p>
            </div>

            {/* Meeting Types */}
            <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h2 className="text-lg font-black uppercase text-slate-800 mb-4">Select Meeting Type</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {meetingTypes.map(type => {
                        const Icon = meetingTypeIcons[type.icon] || User;
                        const isSelected = selectedType === type.value;
                        
                        return (
                            <button
                                key={type.value}
                                onClick={() => setSelectedType(type.value)}
                                className={`p-4 rounded-lg border-2 transition-all ${
                                    isSelected
                                        ? 'border-[#23471d] bg-[#23471d]/5'
                                        : 'border-slate-200 hover:border-slate-300'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div 
                                        className="w-12 h-12 rounded-lg flex items-center justify-center"
                                        style={{ backgroundColor: `${type.color}20` }}
                                    >
                                        <Icon size={24} style={{ color: type.color }} />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-sm font-black uppercase text-slate-800">
                                            {type.label}
                                        </h3>
                                        {isSelected && (
                                            <CheckCircle2 size={16} className="text-[#23471d] mt-1" />
                                        )}
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Meeting Form */}
            {selectedType && (
                <div className="bg-white border border-slate-200 rounded-lg p-6">
                    <h2 className="text-lg font-black uppercase text-slate-800 mb-4">Meeting Details</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-black text-slate-600 uppercase mb-2">
                                    Visitor Name *
                                </label>
                                <div className="relative">
                                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="text"
                                        value={formData.visitorName}
                                        onChange={(e) => setFormData({ ...formData, visitorName: e.target.value })}
                                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#23471d]"
                                        placeholder="Enter visitor name"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-black text-slate-600 uppercase mb-2">
                                    Company Name
                                </label>
                                <div className="relative">
                                    <Building2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="text"
                                        value={formData.visitorCompany}
                                        onChange={(e) => setFormData({ ...formData, visitorCompany: e.target.value })}
                                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#23471d]"
                                        placeholder="Enter company name"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-black text-slate-600 uppercase mb-2">
                                    Preferred Date *
                                </label>
                                <div className="relative">
                                    <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="date"
                                        value={formData.preferredDate}
                                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#23471d]"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-black text-slate-600 uppercase mb-2">
                                    Preferred Time *
                                </label>
                                <div className="relative">
                                    <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="time"
                                        value={formData.preferredTime}
                                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#23471d]"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-black text-slate-600 uppercase mb-2">
                                Additional Notes
                            </label>
                            <textarea
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#23471d]"
                                rows={3}
                                placeholder="Any specific requirements or agenda items..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="flex items-center gap-2 px-6 py-3 bg-[#23471d] text-white rounded-lg hover:bg-[#2d5a24] transition-colors disabled:opacity-50"
                        >
                            <Send size={16} />
                            <span className="text-xs font-black uppercase">
                                {submitting ? 'Scheduling...' : 'Schedule Meeting'}
                            </span>
                        </button>
                    </form>
                </div>
            )}

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <TrendingUp size={20} className="text-blue-600" />
                        </div>
                        <h3 className="text-sm font-black uppercase text-blue-900">Investor Meetings</h3>
                    </div>
                    <p className="text-xs text-blue-700 font-bold">
                        Connect with potential investors looking for healthcare and wellness opportunities
                    </p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <Truck size={20} className="text-green-600" />
                        </div>
                        <h3 className="text-sm font-black uppercase text-green-900">Distributor Meetings</h3>
                    </div>
                    <p className="text-xs text-green-700 font-bold">
                        Meet distributors to expand your product reach across regions
                    </p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Building2 size={20} className="text-purple-600" />
                        </div>
                        <h3 className="text-sm font-black uppercase text-purple-900">Hospital Procurement</h3>
                    </div>
                    <p className="text-xs text-purple-700 font-bold">
                        Schedule meetings with hospital procurement teams for bulk orders
                    </p>
                </div>
            </div>

            {/* Meeting Tips */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-6">
                <div className="flex items-start gap-3">
                    <AlertCircle size={20} className="text-amber-600 mt-0.5" />
                    <div>
                        <h3 className="text-sm font-black uppercase text-amber-900 mb-2">Meeting Tips</h3>
                        <ul className="space-y-1 text-xs text-amber-700 font-bold">
                            <li>• Prepare your product catalog and pricing before meetings</li>
                            <li>• Arrive 10 minutes early to set up your presentation</li>
                            <li>• Bring business cards and brochures</li>
                            <li>• Follow up within 24 hours after the meeting</li>
                            <li>• Keep meetings focused and time-bound (30-45 minutes)</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
