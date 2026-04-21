import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    User,
    Phone,
    Mail,
    MessageSquare,
    ShieldCheck,
    Clock,
    ExternalLink,
    ChevronRight,
    HeadphonesIcon
} from 'lucide-react';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import { API_URL } from '@/lib/api';

export default function RelationshipManager() {
    const { data } = useExhibitorCtx();
    const navigate = useNavigate();
    const [rmDetails, setRmDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date());
    const rmName = data?.spokenWith || data?.referredBy || null;

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (!rmName) {
            setLoading(false);
            return;
        }
        fetch(`${API_URL}/admin/by-username/${encodeURIComponent(rmName)}`)
            .then(r => r.json())
            .then(res => {
                if (res.success && res.data) setRmDetails(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [rmName]);

    const handleWhatsApp = (phone) => {
        const cleanPhone = phone.replace(/\D/g, '');
        const personName = `${data?.contact1?.firstName || ''} ${data?.contact1?.lastName || ''}`.trim() || 'Exhibitor';
        const companyName = data?.exhibitorName || '—';
        const regId = data?.registrationId || '—';

        const msg = `Hi, I am ${personName} from ${companyName}. My Exhibitor ID is ${regId}. I have a query regarding IHWE 2026: `;
        const url = `https://wa.me/${cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone}?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank');
    };

    const handleCall = (phone) => {
        window.location.href = `tel:${phone}`;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-8 h-8 border-4 border-[#23471d] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!rmName) {
        return (
            <div className="max-w-4xl mx-auto p-10 text-center bg-white rounded-sm border border-slate-200">
                <HeadphonesIcon size={48} className="mx-auto text-slate-300 mb-4" />
                <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">No Manager Assigned</h2>
                <p className="text-slate-500 mt-2">Your relationship manager details will appear here once assigned.</p>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full pb-10 px-4"
        >
            {/* Header Section */}
            <div className="bg-white p-4 rounded-sm shadow-sm border border-slate-200 mb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t-4 border-t-[#23471d]">
                <div className=''>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-7 h-7 rounded-full bg-[#23471d]/10 flex items-center justify-center">
                            <HeadphonesIcon size={16} className="text-[#23471d]" />
                        </div>
                        <h2 className="text-lg font-black font-medium tracking-tight text-slate-800">Support & Assistance</h2>
                    </div>
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 ml-10">
                        (Dedicated Relationship Management for IHWE 2026)
                    </p>
                </div>
                <div className='flex justify-between gap-4'>
                    <a href="mailto:info@namogangewellness.com" className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 hover:bg-emerald-100 transition-colors group">
                        <Mail size={12} className="text-emerald-600 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-black uppercase text-emerald-700 tracking-wider">Complaints</span>
                    </a>

                    <a href="tel:+919654900525" className="flex items-center  gap-2 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 hover:bg-emerald-100 transition-colors group">
                        <Phone size={12} className="text-emerald-600 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-black uppercase text-emerald-700 tracking-wider">Help Line</span>
                    </a>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                {/* Left Column: Profile & Office Hours */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                    {/* Profile Card */}
                    <div className="bg-white rounded-sm border border-slate-200 overflow-hidden shadow-sm flex flex-col">
                        <div className="h-24 bg-gradient-to-r from-[#23471d] to-[#1a3516] flex-shrink-0" />
                        <div className="px-6 pb-8 -mt-12 text-center flex-1">
                            <div className="relative inline-block">
                                <div className="w-24 h-24 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center overflow-hidden mb-4 shadow-md mx-auto">
                                    <User size={48} className="text-slate-300" />
                                </div>
                                <div className="absolute bottom-6 right-0 bg-[#d26019] p-1.5 rounded-full border-2 border-white text-white">
                                    <ShieldCheck size={14} />
                                </div>
                            </div>
                            <h2 className="text-lg font-medium font-black text-slate-800 tracking-tight">
                                {rmDetails?.fullName || rmName}
                            </h2>
                            <p className="text-[11px] font-bold text-[#d26019] uppercase tracking-widest mb-4">
                                {rmDetails?.designation || 'Relationship Manager'}
                            </p>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-[10px] font-bold text-slate-500 uppercase">
                                <Clock size={12} /> Response time: ~30 mins
                            </div>
                        </div>
                    </div>

                    {/* Office Hours Card */}
                    <div className="bg-[#23471d] p-6 rounded-sm text-white shadow-lg overflow-hidden relative flex-1 flex flex-col justify-center">
                        <div className="relative z-10">
                            <h3 className="text-sm font-black uppercase tracking-widest mb-2">Office Hours</h3>
                            <p className="text-[12px] opacity-80 leading-relaxed mb-4">
                                Monday - Saturday<br />
                                09:00 AM - 07:00 PM (IST)
                            </p>
                            <div className="h-px bg-white/20 mb-4" />
                            <p className="text-[10px] font-bold opacity-60 italic leading-snug">
                                For urgent matters outside office hours, please use the official IHWE helpline.
                            </p>
                        </div>
                        <HeadphonesIcon className="absolute -bottom-6 -right-6 text-white/5 w-32 h-32 rotate-12" />
                    </div>
                </div>

                {/* Right Column: Contact & Actions */}
                <div className="lg:col-span-2 flex flex-col h-full">
                    <div className="bg-white rounded-sm border border-slate-200 p-4 shadow-sm h-full flex flex-col">
                        <h3 className="text-[12px] font-semibold text-slate-800 uppercase tracking-widest mb-2 flex items-center gap-2 flex-shrink-0">
                            <Phone size={14} className="text-[#23471d] " /> Contact Channels
                        </h3>


                        <div className='flex flex-col xl:flex-row justify-between gap-6 w-full flex-1 '>
                            <div className="flex-1 flex flex-col gap-4">
                                {[rmDetails?.mobile, rmDetails?.altMobile].filter(Boolean).map((phone, idx) => (
                                    <div key={idx} className="p-4 rounded-sm border border-slate-100 bg-slate-50/50 group hover:border-[#23471d]/30 transition-all flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center justify-between">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                    {idx === 0 ? 'Primary Contact' : 'Alternative Contact'}
                                                </p>
                                                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#23471d] border border-slate-100 shadow-sm">
                                                    <Phone size={14} />
                                                </div>
                                            </div>
                                            <p className="text-xl font-medium font-black text-slate-800 mb-6 tracking-tight">{phone}</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 mt-auto">
                                            <button
                                                onClick={() => handleWhatsApp(phone)}
                                                className="flex items-center justify-center gap-2 py-3 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-sm border border-emerald-100 hover:bg-emerald-100 transition-colors"
                                            >
                                                <MessageSquare size={14} /> WhatsApp
                                            </button>
                                            <button
                                                onClick={() => handleCall(phone)}
                                                className="flex items-center justify-center gap-2 py-3 bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-widest rounded-sm border border-blue-100 hover:bg-blue-100 transition-colors"
                                            >
                                                <Phone size={14} /> Call
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex-1 p-4 rounded-sm border border-slate-100 bg-gradient-to-br from-white to-slate-50 group hover:border-[#23471d]/30 transition-all flex flex-col items-center justify-center text-center shadow-sm relative overflow-hidden">
                                {(() => {
                                    const hour = currentTime.getHours();
                                    const isOnline = hour >= 9 && hour < 19;

                                    return (
                                        <>
                                            {/* Current Time (Left) */}
                                            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-slate-100 bg-slate-50 text-sm font-black uppercase text-slate-400 tracking-wider transition-all">
                                                <Clock size={10} />
                                                {/* {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })} */}
                                                (09:00 AM - 07:00 PM)
                                            </div>

                                            {/* Status Badge (Right) */}
                                            <div className={`absolute top-3 right-3 flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-sm  font-black uppercase tracking-wider ${isOnline ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-100'
                                                }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
                                                {isOnline ? 'Online' : 'Offline'}
                                            </div>

                                            <div className="w-16 h-16 bg-[#23471d]/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                                <MessageSquare size={32} className={isOnline ? "text-[#23471d]" : "text-slate-400"} />
                                            </div>
                                            <h3 className="text-lg font-medium font-black text-slate-800 mb-2">Live Support</h3>
                                            <p className="text-xs font-semibold text-slate-500 mb-6 max-w-[200px] leading-relaxed">
                                                {isOnline
                                                    ? "Start an instant conversation with our team for quick support."
                                                    : "Our team is currently away. Please reach out during office hours."}
                                            </p>
                                            <button
                                                disabled={!isOnline}
                                                onClick={() => navigate('/exhibitor-dashboard/chat')}
                                                className={`w-full flex items-center justify-center gap-2 py-3.5 text-sm font-medium font-black uppercase tracking-widest rounded-sm transition-all shadow-md ${isOnline
                                                    ? 'bg-[#23471d] text-white hover:bg-[#1a3516] group-hover:translate-y-[-2px]'
                                                    : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200 shadow-none'
                                                    }`}
                                            >
                                                {isOnline ? (
                                                    <>Start Live Chat <ChevronRight size={14} /></>
                                                ) : (
                                                    <><Clock size={14} /> Offline</>
                                                )}
                                            </button>
                                        </>
                                    );
                                })()}
                            </div>
                        </div>



                        {rmDetails?.email && (
                            <div className="p-5 rounded-sm border border-slate-100 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4 flex-shrink-0">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#23471d] border border-slate-100 flex-shrink-0 shadow-sm">
                                        <Mail size={18} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Official Email Support</p>
                                        <p className="text-[15px] font-bold text-slate-800 truncate">{rmDetails.email}</p>
                                    </div>
                                </div>
                                <a
                                    href={`mailto:${rmDetails.email}`}
                                    className="flex items-center justify-center gap-3 px-8 py-3 bg-[#23471d] text-white text-[10px] font-black uppercase tracking-widest rounded-sm hover:bg-[#1a3516] transition-colors shadow-md"
                                >
                                    Email  <ExternalLink size={12} />
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}