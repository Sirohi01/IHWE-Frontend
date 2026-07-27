import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    User, Phone, Mail, MessageSquare, Clock,
    ExternalLink, ChevronRight, HeadphonesIcon, Users,
    Building, Briefcase, CheckCircle, Shield, Zap,
    ChevronLeft
} from 'lucide-react';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import { API_URL, SERVER_URL } from '@/lib/api';

export default function RelationshipManager() {
    const { data } = useExhibitorCtx();
    const navigate = useNavigate();
    const [rmDetails, setRmDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [selectedFeature, setSelectedFeature] = useState(null);

    const rmUsername = data?.filledBy && data.filledBy !== 'User' ? data.filledBy : null;
    const rmName = data?.spokenWith || data?.filledBy || null;

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);
    useEffect(() => {
        if (selectedFeature) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedFeature]);

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
        if (!phone || phone === 'N/A') return;
        const cleanPhone = phone.replace(/\D/g, '');
        const personName = `${data?.contact1?.firstName || ''} ${data?.contact1?.lastName || ''}`.trim() || 'Exhibitor';
        const companyName = data?.exhibitorName || '—';
        const regId = data?.registrationId || '—';

        const msg = `Hi, I am ${personName} from ${companyName}. My Exhibitor ID is ${regId}. I have a query regarding IHWE 2026: `;
        const url = `https://wa.me/${cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone}?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank');
    };

    const handleCall = (phone) => {
        if (!phone || phone === 'N/A') return;
        window.location.href = `tel:${phone}`;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-8 h-8 border-4 border-[#0F3B2B] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    // Default Fallbacks matching the image UI
    const getImageUrl = (path) => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        if (path.startsWith('/')) return `${SERVER_URL}${path}`;
        return `${SERVER_URL}/${path}`;
    };

    const profileImg = getImageUrl(rmDetails?.profileImage);
    const name = rmDetails?.fullName || rmName || 'Manish Sirohi';
    const designation = rmDetails?.designation || 'FINANCE EXECUTIVE';
    const email = rmDetails?.email || 'manishsirohi023@gmail.com';
    const mobile = rmDetails?.mobile || '09568259784';
    const department = rmDetails?.department || 'Finance Department';
    const empId = rmDetails?.username || 'vansh';

    const hodName = rmDetails?.hodName || 'Vansh Chaudhary';
    const hodDesignation = rmDetails?.hodDesignation || 'Developer';
    const hodMobile = rmDetails?.hodMobile || '09568259784';
    const hodEmail = rmDetails?.hodEmail || 'manishsirohi023@gmail.com';

    const repName = rmDetails?.reportingToName || 'Rohit Kumar';
    const repDesignation = rmDetails?.reportingToDesignation || 'Software Developer';
    const repMobile = rmDetails?.reportingToMobile || '9568816858';
    const repEmail = rmDetails?.reportingToEmail || 'rishi.encodency95@gmail.com';

    const hour = currentTime.getHours();
    const isOnline = hour >= 9 && hour < 19;

    const featureDetails = [
        {
            id: 'dedicated-support',
            title: 'Dedicated Support',
            shortDesc: 'One-to-one assistance for all your requirements.',
            description: 'We provide you with a dedicated Relationship Manager who serves as your single point of contact for all your needs regarding IHWE 2026. This ensures you always have a familiar expert to rely on.',
            Icon: HeadphonesIcon,
            colorBg: 'bg-emerald-50',
            colorBorder: 'border-emerald-100',
            colorText: 'text-emerald-600',
            iconClass: '',
            points: [
                'Personalized assistance tailored to your specific exhibition requirements.',
                'Direct line of communication with our senior support staff.',
                'Proactive updates and follow-ups on your requests.',
                'Priority handling of any escalations or critical issues.'
            ]
        },
        {
            id: 'quick-response',
            title: 'Quick Response',
            shortDesc: 'We ensure prompt response within ~30 minutes.',
            description: 'Time is critical when preparing for an exhibition. Our team is committed to ensuring that your queries are addressed with the utmost urgency, keeping your preparations on track.',
            Icon: Zap,
            colorBg: 'bg-purple-50',
            colorBorder: 'border-purple-100',
            colorText: 'text-purple-600',
            iconClass: 'fill-purple-600',
            points: [
                'Guaranteed initial response within ~30 minutes during working hours.',
                'Fast-track resolution for technical and logistical queries.',
                'Real-time updates on the status of your open tickets.',
                '24/7 automated ticketing system for tracking your requests.'
            ]
        },
        {
            id: 'expert-guidance',
            title: 'Expert Guidance',
            shortDesc: 'Experienced team to help you at every step.',
            description: 'Leverage the expertise of our seasoned event professionals to maximize your return on investment at IHWE 2026. We help you make informed decisions.',
            Icon: Shield,
            colorBg: 'bg-blue-50',
            colorBorder: 'border-blue-100',
            colorText: 'text-blue-600',
            iconClass: '',
            points: [
                'Strategic advice on booth placement, design, and visitor engagement.',
                'Best practices for pre-event marketing and audience targeting.',
                'Compliance and regulatory guidance for your exhibition setup.',
                'Insights into industry trends and networking opportunities.'
            ]
        },
        {
            id: 'complete-assistance',
            title: 'Complete Assistance',
            shortDesc: 'End-to-end support for a seamless experience.',
            description: 'From the moment you register until the conclusion of the event, we provide comprehensive support covering every single aspect of your participation journey.',
            Icon: CheckCircle,
            colorBg: 'bg-orange-50',
            colorBorder: 'border-orange-100',
            colorText: 'text-orange-500',
            iconClass: '',
            points: [
                'Seamless onboarding and registration process.',
                'Complete logistical support, including freight, electricity, and furniture.',
                'On-site troubleshooting and technical assistance during event days.',
                'Post-event reporting and feedback analysis.'
            ]
        }
    ];

    return (
        <>
            <div className="space-y-2 font-inter bg-slate-50 min-h-full p-1 lg:p-2">

                {/* Header */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-2 flex flex-col sm:flex-row items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100 shrink-0">
                            <HeadphonesIcon size={20} className="text-[#0F3B2B]" />
                        </div>
                        <div>
                            <h2 className="text-lg font-medium text-slate-800 leading-tight">Support & Assistance</h2>
                            <p className="text-xs font-medium text-slate-500">Dedicated Relationship Management for <span className="text-[#0F3B2B] font-bold">IHWE 2026</span></p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <a href="mailto:info@namogangewellness.com" className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 rounded-lg text-[11px] font-bold uppercase tracking-wide transition-colors">
                            <Mail size={14} /> COMPLAINTS
                        </a>
                        <a href="tel:+919654900525" className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white text-blue-600 border border-blue-100 hover:bg-blue-50 rounded-lg text-[11px] font-bold uppercase tracking-wide transition-colors">
                            <Phone size={14} /> HELP LINE
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-1">

                    {/* LEFT COLUMN */}
                    <div className="lg:col-span-3 flex flex-col gap-1">
                        {/* Profile Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col items-center pb-7 overflow-hidden">
                            <div className="w-[120%] h-28 bg-[#0F3B2B] rounded-b-[50%] shrink-0"></div>
                            <div className="relative -mt-12 mb-1">
                                <div className="w-20 h-20 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center overflow-hidden shadow-sm mx-auto z-10 relative">
                                    {profileImg ? (
                                        <img src={profileImg} alt={name} className="w-full h-full object-cover" crossOrigin="anonymous" />
                                    ) : (
                                        <User size={36} className="text-slate-300" />
                                    )}
                                </div>
                                <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center z-20">
                                    <CheckCircle size={12} className="text-white" strokeWidth={3} />
                                </div>
                            </div>
                            <h2 className="text-xl font-medium text-slate-800 leading-tight mb-1 px-2 text-center">{name}</h2>
                            <p className="text-xs font-bold text-[#0F3B2B] uppercase tracking-widest mb-1 text-center">{designation}</p>

                            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-[10px] font-bold text-emerald-700 uppercase mb-1">
                                <Clock size={12} /> RESPONSE TIME: ~30 MINS
                            </div>

                            <div className="w-full px-4 space-y-2.5">
                                <div className="flex items-start gap-1">
                                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                                        <Mail size={14} className="text-slate-500" />
                                    </div>
                                    <div className="min-w-0 flex-1 pt-0.5">
                                        <p className="text-[10px] font-medium text-slate-500 mb-0.5">Email</p>
                                        <p className="text-[13px] font-bold text-slate-800 truncate" title={email}>{email}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-1">
                                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                                        <Phone size={14} className="text-slate-500" />
                                    </div>
                                    <div className="min-w-0 flex-1 pt-0.5">
                                        <p className="text-[10px] font-medium text-slate-500 mb-0.5">Mobile</p>
                                        <p className="text-[13px] font-bold text-slate-800 truncate">{mobile}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-1">
                                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                                        <Building size={14} className="text-slate-500" />
                                    </div>
                                    <div className="min-w-0 flex-1 pt-0.5">
                                        <p className="text-[10px] font-medium text-slate-500 mb-0.5">Department</p>
                                        <p className="text-[13px] font-bold text-slate-800 truncate" title={department}>{department}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-1">
                                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                                        <Briefcase size={14} className="text-slate-500" />
                                    </div>
                                    <div className="min-w-0 flex-1 pt-0.5">
                                        <p className="text-[10px] font-medium text-slate-500 mb-0.5">Employee Username</p>
                                        <p className="text-[13px] font-bold text-slate-800 truncate" title={empId}>{empId}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Office Hours Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3">
                            <div className="flex items-center gap-1 mb-1">
                                <Clock size={16} className="text-slate-600" />
                                <h3 className="text-sm font-medium text-slate-800 uppercase tracking-wide">OFFICE HOURS</h3>
                            </div>
                            <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100 flex items-start gap-1 mb-1">
                                <div className="mt-1">
                                    <Clock size={16} className="text-emerald-600" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-emerald-700 uppercase tracking-widest mb-1">MON - SAT</p>
                                    <p className="text-base font-medium text-emerald-700">09:00 AM - 07:00 PM <span className="text-xs font-bold">(IST)</span></p>
                                </div>
                            </div>
                            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                                For urgent matters outside office hours, please use the official IHWE helpline.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT SIDE (COMBINED MIDDLE & RIGHT COLUMNS) */}
                    <div className="lg:col-span-9 flex flex-col gap-1">

                        {/* Top Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-1">

                            {/* Middle Content */}
                            <div className="lg:col-span-2 flex flex-col gap-1">
                                {/* Your Relationship Team */}
                                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-1">
                                            <Users size={18} className="text-slate-600" />
                                            <h3 className="text-sm font-medium text-slate-800 uppercase tracking-wide">YOUR RELATIONSHIP TEAM</h3>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                                        {/* HOD */}
                                        <div className="p-3 rounded-xl border border-slate-100 bg-slate-50">
                                            <span className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[9px] font-medium uppercase tracking-widest rounded mb-3">HOD</span>
                                            <div className="flex items-center gap-1 mb-1">
                                                <div className="w-10 h-10 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center font-medium text-lg overflow-hidden shrink-0">
                                                    {rmDetails?.hodImage ? (
                                                        <img src={getImageUrl(rmDetails.hodImage)} alt="HOD" className="w-full h-full object-cover" crossOrigin="anonymous" />
                                                    ) : (
                                                        <User size={20} />
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-medium text-slate-800 truncate" title={hodName}>{hodName}</p>
                                                    <p className="text-[11px] font-medium text-slate-500 truncate" title={hodDesignation}>{hodDesignation}</p>
                                                </div>
                                            </div>
                                            <div className="space-y-2.5">
                                                <div className="flex items-center gap-1">
                                                    <Phone size={14} className="text-slate-400 shrink-0" />
                                                    <p className="text-xs font-medium text-slate-700 truncate">{hodMobile}</p>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Mail size={14} className="text-slate-400 shrink-0" />
                                                    <p className="text-xs font-medium text-slate-700 truncate" title={hodEmail}>{hodEmail}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Reporting Manager */}
                                        <div className="p-3 rounded-xl border border-slate-100 bg-slate-50">
                                            <span className="inline-block px-2 py-0.5 bg-purple-100 text-purple-700 text-[9px] font-medium uppercase tracking-widest rounded mb-3">REPORTING MANAGER</span>
                                            <div className="flex items-center gap-1 mb-1">
                                                <div className="w-10 h-10 rounded-full bg-purple-200 text-purple-800 flex items-center justify-center font-medium text-lg overflow-hidden shrink-0">
                                                    {rmDetails?.reportingToImage ? (
                                                        <img src={getImageUrl(rmDetails.reportingToImage)} alt="Reporting Manager" className="w-full h-full object-cover" crossOrigin="anonymous" />
                                                    ) : (
                                                        <User size={20} />
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-medium text-slate-800 truncate" title={repName}>{repName}</p>
                                                    <p className="text-[11px] font-medium text-slate-500 truncate" title={repDesignation}>{repDesignation}</p>
                                                </div>
                                            </div>
                                            <div className="space-y-2.5">
                                                <div className="flex items-center gap-1">
                                                    <Phone size={14} className="text-slate-400 shrink-0" />
                                                    <p className="text-xs font-medium text-slate-700 truncate">{repMobile}</p>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Mail size={14} className="text-slate-400 shrink-0" />
                                                    <p className="text-xs font-medium text-slate-700 truncate" title={repEmail}>{repEmail}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Channels */}
                                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                                    <div className="flex items-center gap-1 mb-1">
                                        <Phone size={18} className="text-slate-600" />
                                        <h3 className="text-sm font-medium text-slate-800 uppercase tracking-wide">CONTACT CHANNELS</h3>
                                    </div>

                                    <div className="bg-gradient-to-r from-[#2FAAA7] to-[#4068f2] rounded-xl p-4 mb-1 relative overflow-hidden flex flex-col justify-center min-h-[90px]">
                                        <p className="text-xs font-medium text-white/80 mb-1">Primary Contact</p>
                                        <p className="text-3xl font-medium text-white tracking-tight">{mobile}</p>

                                        <div className="absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center border border-white/30 backdrop-blur-sm">
                                            <Phone size={22} className="text-white" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-1 mb-1">
                                        <button onClick={() => handleWhatsApp(mobile)} className="flex items-center justify-center gap-1 py-2.5 bg-[#e8f7ec] text-[#0F3B2B] rounded-lg border border-[#c1ebd0] hover:bg-[#d1f0dd] transition-colors font-bold uppercase tracking-widest text-xs">
                                            <MessageSquare size={16} /> WHATSAPP
                                        </button>
                                        <button onClick={() => handleCall(mobile)} className="flex items-center justify-center gap-1 py-2.5 bg-white text-blue-600 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors font-bold uppercase tracking-widest text-xs shadow-sm">
                                            <Phone size={16} /> CALL
                                        </button>
                                    </div>

                                    <div className="rounded-xl border border-slate-100 flex items-center justify-between bg-slate-50 p-3">
                                        <div className="flex items-center gap-1">
                                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-slate-200 shrink-0 shadow-sm">
                                                <Mail size={16} className="text-slate-500" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Official Email</p>
                                                <p className="text-[13px] font-bold text-slate-800 truncate" title={email}>{email}</p>
                                            </div>
                                        </div>
                                        <a href={`mailto:${email}`} className="flex items-center justify-center gap-1.5 px-3 py-2 bg-white text-emerald-700 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors text-xs font-bold uppercase tracking-widest shrink-0 shadow-sm">
                                            EMAIL US <ExternalLink size={14} />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Right Content */}
                            <div className="lg:col-span-1 flex flex-col gap-1">
                                {/* Live Support */}
                                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col items-center text-center relative pt-4">
                                    <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[9px] font-bold uppercase tracking-widest text-emerald-600">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                        ONLINE
                                    </div>

                                    <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-1">
                                        <HeadphonesIcon size={32} className="text-[#0F3B2B]" />
                                    </div>

                                    <h3 className="text-xl font-medium text-slate-800 mb-1">Live Support</h3>
                                    <p className="text-[13px] text-slate-500 mb-1 leading-relaxed px-2">
                                        Start an instant conversation with our team for quick support.
                                    </p>

                                    <div className="mb-5 w-full">
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Support Hours</p>
                                        <div className="flex items-center justify-center gap-1.5 text-sm font-medium text-slate-700">
                                            <Clock size={16} /> 09:00 AM - 07:00 PM <span className="text-[10px] text-slate-400">(IST)</span>
                                        </div>
                                    </div>

                                    <button
                                        disabled={!isOnline}
                                        onClick={() => navigate('/exhibitor-dashboard/chat')}
                                        className="w-full py-3 rounded-xl text-[12px] font-medium uppercase tracking-widest flex items-center justify-center gap-1 transition-all bg-[#0F3B2B] text-white hover:bg-[#0a271c] shadow-md shadow-[#0F3B2B]/20"
                                    >
                                        <MessageSquare size={16} /> START LIVE CHAT <ChevronRight size={16} />
                                    </button>
                                </div>

                                {/* Quick Stats */}
                                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                                    <div className="flex items-center gap-1 mb-1 border-b border-slate-100 pb-1">
                                        <div className="flex gap-1 items-end h-4">
                                            <div className="w-1 h-3 bg-slate-400 rounded-sm"></div>
                                            <div className="w-1 h-4 bg-slate-600 rounded-sm"></div>
                                            <div className="w-1 h-2 bg-slate-300 rounded-sm"></div>
                                        </div>
                                        <h3 className="text-sm font-medium text-slate-800 uppercase tracking-wide">QUICK STATS</h3>
                                    </div>

                                    <div className="grid grid-cols-2 gap-1">
                                        <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                                            <p className="text-[10px] font-medium text-slate-500 mb-1 leading-tight">Tickets Resolved</p>
                                            <p className="text-lg font-medium text-emerald-600">128</p>
                                        </div>
                                        <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                                            <p className="text-[10px] font-medium text-slate-500 mb-1 leading-tight">Avg. Response</p>
                                            <p className="text-lg font-medium text-purple-600">~30m</p>
                                        </div>
                                        <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                                            <p className="text-[10px] font-medium text-slate-500 mb-1 leading-tight">Satisfaction Rate</p>
                                            <p className="text-lg font-medium text-orange-500">98%</p>
                                        </div>
                                        <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                                            <p className="text-[10px] font-medium text-slate-500 mb-1 leading-tight">Active Chats</p>
                                            <p className="text-lg font-medium text-blue-500">8</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 mt-auto">
                            {featureDetails.map((feat) => (
                                <div key={feat.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-2.5 flex flex-col items-start">
                                    <div className={`w-8 h-8 rounded-full ${feat.colorBg} flex items-center justify-center border ${feat.colorBorder} mb-1`}>
                                        <feat.Icon size={16} className={`${feat.colorText} ${feat.iconClass}`} />
                                    </div>
                                    <h4 className="text-xs font-medium text-slate-800 mb-0.5">{feat.title}</h4>
                                    <p className="text-[10px] text-slate-500 leading-tight mb-1">{feat.shortDesc}</p>
                                    <button
                                        onClick={() => setSelectedFeature(feat)}
                                        className={`${feat.colorText} text-[10px] font-bold flex items-center gap-0.5 hover:underline mt-auto`}
                                    >
                                        Learn more <ChevronRight size={10} />
                                    </button>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

            </div>

            {/* Feature Modal */}
            {
                selectedFeature && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSelectedFeature(null)}>
                        <div
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200 border border-slate-200"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className={`p-4 flex items-center gap-3 ${selectedFeature.colorBg} border-b ${selectedFeature.colorBorder}`}>
                                <div className={`w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm border ${selectedFeature.colorBorder}`}>
                                    <selectedFeature.Icon size={24} className={`${selectedFeature.colorText} ${selectedFeature.iconClass}`} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-medium text-slate-800">{selectedFeature.title}</h3>
                                </div>
                                <button onClick={() => setSelectedFeature(null)} className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center transition-colors">
                                    <span className="text-slate-600 font-bold text-lg leading-none">&times;</span>
                                </button>
                            </div>
                            {/* Body */}
                            <div className="p-5 space-y-5">
                                <p className="text-[13px] text-slate-600 leading-relaxed font-medium">
                                    {selectedFeature.description}
                                </p>
                                <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    <h4 className="text-[10px] font-medium text-slate-800 uppercase tracking-widest flex items-center gap-1.5">
                                        <CheckCircle size={12} className={selectedFeature.colorText} /> Key Benefits
                                    </h4>
                                    <ul className="space-y-2.5">
                                        {selectedFeature.points.map((pt, i) => (
                                            <li key={i} className="flex items-start gap-2 text-[12px] text-slate-700 font-medium">
                                                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-current ${selectedFeature.colorText}`} />
                                                <span className="leading-tight">{pt}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            {/* Footer */}
                            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
                                <button onClick={() => setSelectedFeature(null)} className="px-6 py-2.5 rounded-xl bg-slate-800 text-white text-[11px] font-medium uppercase tracking-widest hover:bg-slate-900 transition-colors shadow-sm">
                                    Got it
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

        </>
    );
}