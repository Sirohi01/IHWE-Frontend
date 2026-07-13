import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    User, Phone, Mail, MessageSquare, ShieldCheck, Clock,
    ExternalLink, ChevronRight, HeadphonesIcon, Users, 
    Building, Briefcase, CheckCircle, Shield
} from 'lucide-react';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import { API_URL, SERVER_URL } from '@/lib/api';

import DashboardHero from '@/components/dashboard/DashboardHero';

export default function RelationshipManager() {
    const { data } = useExhibitorCtx();
    const navigate = useNavigate();
    const [rmDetails, setRmDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date());

    const rmUsername = data?.filledBy && data.filledBy !== 'User' ? data.filledBy : null;
    const rmName = data?.spokenWith || data?.filledBy || null;

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (!rmUsername) {
            setLoading(false);
            return;
        }
        fetch(`${API_URL}/admin/by-username/${encodeURIComponent(rmUsername)}`)
            .then(r => r.json())
            .then(res => {
                if (res.success && res.data) setRmDetails(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [rmUsername]);

    const handleWhatsApp = (phone) => {
        if(!phone || phone === 'N/A') return;
        const cleanPhone = phone.replace(/\D/g, '');
        const personName = `${data?.contact1?.firstName || ''} ${data?.contact1?.lastName || ''}`.trim() || 'Exhibitor';
        const companyName = data?.exhibitorName || '—';
        const regId = data?.registrationId || '—';

        const msg = `Hi, I am ${personName} from ${companyName}. My Exhibitor ID is ${regId}. I have a query regarding IHWE 2026: `;
        const url = `https://wa.me/${cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone}?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank');
    };

    const handleCall = (phone) => {
        if(!phone || phone === 'N/A') return;
        window.location.href = `tel:${phone}`;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-8 h-8 border-4 border-[#0F3B2B] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!rmName) {
        return (
            <div className="space-y-6">
                <div className="max-w-4xl mx-auto p-10 text-center bg-white rounded-xl border border-slate-200 mt-10">
                    <HeadphonesIcon size={48} className="mx-auto text-slate-300 mb-4" />
                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">No Manager Assigned</h2>
                    <p className="text-slate-500 mt-2">Your relationship manager details will appear here once assigned.</p>
                </div>
            </div>
        );
    }

    // Determine Online Status
    const hour = currentTime.getHours();
    const isOnline = hour >= 9 && hour < 19;
    
    // Helper to safely construct image URLs
    const getImageUrl = (path) => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        if (path.startsWith('/')) return `${SERVER_URL}${path}`;
        return `${SERVER_URL}/${path}`;
    };

    // Fallback UI data
    const profileImg = getImageUrl(rmDetails?.profileImage);
    const name = rmDetails?.fullName || rmName;
    const designation = rmDetails?.designation || 'Relationship Manager';
    const email = rmDetails?.email || 'N/A';
    const mobile = rmDetails?.mobile || 'N/A';
    const department = rmDetails?.department || 'N/A';
    const empId = rmDetails?.username || 'N/A';

    return (
        <div className="space-y-1.5 font-inter bg-slate-50/50 px-2 lg:px-4 py-2">
            
            {/* Header Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="h-1.5 w-full bg-[#0F3B2B]"></div>
                <div className="p-2 px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#0F3B2B]/5 flex items-center justify-center border border-[#0F3B2B]/10">
                            <HeadphonesIcon size={20} className="text-[#0F3B2B]" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 leading-tight">Support & Assistance</h2>
                            <p className="text-[11px] font-medium text-slate-500">Dedicated Relationship Management for <span className="text-[#0F3B2B] font-bold">IHWE 2026</span></p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <a href="mailto:info@namogangewellness.com" className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors">
                            <Mail size={12} /> Complaints
                        </a>
                        <a href="tel:+919654900525" className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors">
                            <Phone size={12} /> Help Line
                        </a>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-1.5">
                
                {/* LEFT COLUMN: Profile & Office Hours */}
                <div className="lg:col-span-3 flex flex-col gap-1.5">
                    
                    {/* Profile Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                        <div className="h-16 bg-[#082E20] relative overflow-hidden flex-shrink-0">
                            {/* Abstract wave or lines effect */}
                            <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIj48cGF0aCBkPSJNMCAxMDBDMTAwIDEwMCAyMDAgMCA0MDAgMTAwTDAgMTAwWiIgZmlsbD0iI2ZmZmZmZiIvPjwvc3ZnPg==')] bg-cover bg-center"></div>
                        </div>
                        <div className="px-4 pb-3 -mt-8 text-center flex-1">
                            <div className="relative inline-block mb-2">
                                <div className="w-16 h-16 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center overflow-hidden shadow-sm mx-auto">
                                    {profileImg ? (
                                        <img src={profileImg} alt={name} className="w-full h-full object-cover" crossOrigin="anonymous" />
                                    ) : (
                                        <User size={30} className="text-slate-300" />
                                    )}
                                </div>
                                <div className="absolute bottom-1 right-1 bg-[#0F3B2B] p-1.5 rounded-full border-2 border-white text-white shadow-sm">
                                    <ShieldCheck size={14} />
                                </div>
                            </div>
                            <h2 className="text-[15px] font-black text-slate-900 leading-tight mb-1">{name}</h2>
                            <p className="text-[10px] font-bold text-[#0F3B2B] uppercase tracking-widest mb-2">{designation}</p>
                            
                            <div className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full text-[9px] font-bold text-emerald-700 uppercase mb-3">
                                <Clock size={10} /> Response time: ~30 mins
                            </div>

                            <div className="flex flex-col gap-2 text-left">
                                <div className="flex items-center gap-2 py-1 border-b border-slate-100 last:border-0">
                                    <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                                        <Mail size={12} className="text-[#0F3B2B]" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Email</p>
                                        <p className="text-[11px] font-bold text-slate-800 truncate" title={email}>{email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0">
                                    <div className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                                        <Phone size={12} className="text-[#0F3B2B]" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Mobile</p>
                                        <p className="text-[11px] font-bold text-slate-800 truncate">{mobile}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0">
                                    <div className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                                        <Building size={12} className="text-[#0F3B2B]" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Department</p>
                                        <p className="text-[11px] font-bold text-slate-800 truncate" title={department}>{department}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0">
                                    <div className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                                        <Briefcase size={12} className="text-[#0F3B2B]" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Employee ID</p>
                                        <p className="text-[11px] font-bold text-slate-800 truncate" title={empId}>{empId}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Office Hours */}
                    <div className="bg-[#052618] rounded-xl text-white shadow-md overflow-hidden relative flex-1 flex flex-col p-3">
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center border border-white/10">
                                    <Clock size={12} />
                                </div>
                                <h3 className="text-[11px] font-black tracking-widest uppercase">Office Hours</h3>
                            </div>
                            <div className="flex gap-2 items-center mb-2 bg-white/5 p-2 rounded-lg border border-white/10">
                                <div className="w-6 h-6 rounded flex items-center justify-center">
                                    <Clock size={14} className="text-emerald-400" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-emerald-400 uppercase mb-0.5">Mon - Sat</p>
                                    <p className="text-xs font-bold">09:00 AM - 07:00 PM <span className="text-[9px] font-normal text-slate-300">(IST)</span></p>
                                </div>
                            </div>
                            <p className="text-[11px] opacity-80 leading-relaxed font-medium">
                                For urgent matters outside office hours, please use the official IHWE helpline.
                            </p>
                        </div>
                        <HeadphonesIcon className="absolute -bottom-6 -right-6 text-white/5 w-32 h-32 rotate-12" />
                    </div>
                </div>

                {/* MIDDLE COLUMN: Team & Contacts */}
                <div className="lg:col-span-6 flex flex-col gap-1.5">
                    
                    {/* Team Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                            <div className="flex items-center gap-2">
                                <Users size={14} className="text-[#0F3B2B]" />
                                <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-widest">Your Relationship Team</h3>
                            </div>
                            <div className="flex gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                            {/* HOD Card */}
                            <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col justify-between">
                                <div className="mb-2">
                                    <span className="inline-block px-1.5 py-0.5 bg-emerald-50 text-emerald-700 text-[8px] font-bold uppercase tracking-wider rounded border border-emerald-100 mb-2">HOD</span>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-sm overflow-hidden shrink-0">
                                            {rmDetails?.hodImage ? (
                                                <img src={getImageUrl(rmDetails.hodImage)} alt="HOD" className="w-full h-full object-cover" crossOrigin="anonymous"/>
                                            ) : (
                                                <User size={16} />
                                            )}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-[12px] font-black text-slate-800 leading-tight mb-0.5 truncate" title={rmDetails?.hodName}>{rmDetails?.hodName || 'Not Assigned'}</p>
                                            <p className="text-[9px] font-medium text-slate-500 truncate" title={rmDetails?.hodDesignation}>{rmDetails?.hodDesignation || 'Head of Department'}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <Phone size={10} className="text-[#0F3B2B] shrink-0" />
                                            <p className="text-[10px] font-medium text-slate-700 truncate">{rmDetails?.hodMobile || 'N/A'}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Mail size={10} className="text-[#0F3B2B] shrink-0" />
                                            <p className="text-[10px] font-medium text-slate-700 truncate" title={rmDetails?.hodEmail}>{rmDetails?.hodEmail || 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Reporting Manager Card */}
                            <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col justify-between">
                                <div className="mb-2">
                                    <span className="inline-block px-1.5 py-0.5 bg-emerald-50 text-emerald-700 text-[8px] font-bold uppercase tracking-wider rounded border border-emerald-100 mb-2">REPORTING MANAGER</span>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-sm overflow-hidden shrink-0">
                                            {rmDetails?.reportingToImage ? (
                                                <img src={getImageUrl(rmDetails.reportingToImage)} alt="Reporting Manager" className="w-full h-full object-cover" crossOrigin="anonymous"/>
                                            ) : (
                                                <User size={16} />
                                            )}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-[12px] font-black text-slate-800 leading-tight mb-0.5 truncate" title={rmDetails?.reportingToName}>{rmDetails?.reportingToName || 'Not Assigned'}</p>
                                            <p className="text-[9px] font-medium text-slate-500 truncate" title={rmDetails?.reportingToDesignation}>{rmDetails?.reportingToDesignation || 'Reporting Manager'}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <Phone size={10} className="text-[#0F3B2B] shrink-0" />
                                            <p className="text-[10px] font-medium text-slate-700 truncate">{rmDetails?.reportingToMobile || 'N/A'}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Mail size={10} className="text-[#0F3B2B] shrink-0" />
                                            <p className="text-[10px] font-medium text-slate-700 truncate" title={rmDetails?.reportingToEmail}>{rmDetails?.reportingToEmail || 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Channels Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3 flex-1 flex flex-col">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                            <div className="flex items-center gap-2">
                                <Phone size={14} className="text-[#0F3B2B]" />
                                <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-widest">Contact Channels</h3>
                            </div>
                            <div className="flex gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col">
                            <div className="p-3 rounded-xl border border-slate-100 bg-slate-50 mb-3">
                                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Primary Contact</p>
                                <div className="flex items-center justify-between">
                                    <p className="text-xl font-black text-slate-900 tracking-tight">{mobile}</p>
                                    <button onClick={() => handleCall(mobile)} className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#0F3B2B] shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors">
                                        <Phone size={14} />
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 gap-2 mt-3">
                                    <button onClick={() => handleWhatsApp(mobile)} className="flex items-center justify-center gap-1.5 py-2 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-100 hover:bg-emerald-100 transition-colors">
                                        <MessageSquare size={14} />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">WhatsApp</span>
                                    </button>
                                    <button onClick={() => handleCall(mobile)} className="flex items-center justify-center gap-1.5 py-2 bg-blue-50 text-blue-700 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors">
                                        <Phone size={14} />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">Call</span>
                                    </button>
                                </div>
                            </div>

                            <div className="p-3 rounded-xl border border-slate-100 flex items-center justify-between bg-white mt-auto">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0">
                                        <Mail size={14} className="text-[#0F3B2B]" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Official Email</p>
                                        <p className="text-[12px] font-black text-slate-800 truncate" title={email}>{email}</p>
                                    </div>
                                </div>
                                <a href={`mailto:${email}`} className="flex items-center justify-center gap-1 px-3 py-1.5 bg-white text-[#0F3B2B] rounded border border-slate-200 hover:bg-slate-50 transition-colors text-[9px] font-bold uppercase tracking-widest shrink-0">
                                    Email Us <ExternalLink size={10} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Live Support */}
                <div className="lg:col-span-3 flex flex-col">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3 h-full flex flex-col items-center justify-center text-center relative overflow-hidden">
                        
                        {/* Time & Status Badges */}
                        <div className="w-full flex justify-between items-center absolute top-2 px-3">
                            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-50 border border-slate-100 text-[8px] font-bold uppercase tracking-widest text-slate-600">
                                <Clock size={10} /> 09:00 AM - 07:00 PM
                            </div>
                            <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full border text-[8px] font-bold uppercase tracking-widest ${isOnline ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                                <div className={`w-1 h-1 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></div>
                                {isOnline ? 'Online' : 'Offline'}
                            </div>
                        </div>

                        <div className="w-16 h-16 bg-[#0F3B2B]/5 rounded-full flex items-center justify-center mt-6 mb-3">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100">
                                <MessageSquare size={20} className="text-[#0F3B2B]" />
                            </div>
                        </div>

                        <h3 className="text-lg font-black text-slate-900 mb-1">Live Support</h3>
                        <p className="text-[11px] text-slate-500 mb-4 max-w-[180px] leading-relaxed">
                            {isOnline 
                                ? "Start an instant conversation with our team for quick support." 
                                : "Our team is currently away. Please reach out during office hours."}
                        </p>

                        <button 
                            disabled={!isOnline}
                            onClick={() => navigate('/exhibitor-dashboard/chat')}
                            className={`w-full mt-auto py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                                isOnline 
                                ? 'bg-[#052618] text-white hover:bg-[#031c10] shadow-md' 
                                : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200 shadow-none'
                            }`}
                        >
                            {isOnline ? (
                                <>Start Live Chat <ChevronRight size={14} /></>
                            ) : (
                                <><Clock size={14} /> Offline</>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Features Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1.5 mt-1">
                <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-200 flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#0F3B2B]/5 text-[#0F3B2B] flex items-center justify-center shrink-0 border border-[#0F3B2B]/10">
                        <Shield size={14} />
                    </div>
                    <div>
                        <h4 className="text-[11px] font-black text-slate-900 mb-0.5">Dedicated Support</h4>
                        <p className="text-[9px] text-slate-500 leading-tight">One-to-one assistance for all your requirements.</p>
                    </div>
                </div>
                <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-200 flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#0F3B2B]/5 text-[#0F3B2B] flex items-center justify-center shrink-0 border border-[#0F3B2B]/10">
                        <Clock size={14} />
                    </div>
                    <div>
                        <h4 className="text-[11px] font-black text-slate-900 mb-0.5">Quick Response</h4>
                        <p className="text-[9px] text-slate-500 leading-tight">We ensure prompt response within ~30 minutes.</p>
                    </div>
                </div>
                <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-200 flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#0F3B2B]/5 text-[#0F3B2B] flex items-center justify-center shrink-0 border border-[#0F3B2B]/10">
                        <Users size={14} />
                    </div>
                    <div>
                        <h4 className="text-[11px] font-black text-slate-900 mb-0.5">Expert Guidance</h4>
                        <p className="text-[9px] text-slate-500 leading-tight">Experienced team to help you at every step.</p>
                    </div>
                </div>
                <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-200 flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#0F3B2B]/5 text-[#0F3B2B] flex items-center justify-center shrink-0 border border-[#0F3B2B]/10">
                        <CheckCircle size={14} />
                    </div>
                    <div>
                        <h4 className="text-[11px] font-black text-slate-900 mb-0.5">Complete Assistance</h4>
                        <p className="text-[9px] text-slate-500 leading-tight">End-to-end support for a seamless experience.</p>
                    </div>
                </div>
            </div>

            
        </div>
    );
}