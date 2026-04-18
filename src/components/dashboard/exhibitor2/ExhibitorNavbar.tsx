import { useState, useEffect } from 'react';
import { LogOut, Menu, X, ShieldCheck, User, Phone, Mail, MessageSquare } from 'lucide-react';
import { SERVER_URL, API_URL } from '@/lib/api';
import { io } from 'socket.io-client';

interface NavbarProps {
    logo: string | null;
    data: any;
    sidebarOpen: boolean;
    setSidebarOpen: (v: boolean) => void;
    handleLogout: () => void;
    onChatClick?: () => void;
    unreadChat?: number;
}

export default function ExhibitorNavbar({ logo, data, sidebarOpen, setSidebarOpen, handleLogout, onChatClick, unreadChat = 0 }: NavbarProps) {
    const [showRM, setShowRM] = useState(false);
    const [rmDetails, setRmDetails] = useState<any>(null);
    const [activePhone, setActivePhone] = useState<string | null>(null);
    const rmName = data?.spokenWith || data?.referredBy || null;

    useEffect(() => {
        if (!rmName) return;
        fetch(`${API_URL}/admin/by-username/${encodeURIComponent(rmName)}`)
            .then(r => r.json())
            .then(res => { if (res.success && res.data) setRmDetails(res.data); })
            .catch(() => { });
    }, [rmName]);

    const handleWhatsApp = (phone: string) => {
        const cleanPhone = phone.replace(/\D/g, '');
        const personName = `${data?.contact1?.firstName || ''} ${data?.contact1?.lastName || ''}`.trim() || 'Exhibitor';
        const companyName = data?.exhibitorName || '—';
        const regId = data?.registrationId || '—';
        
        const msg = `Hi, I am ${personName} from ${companyName}. My Exhibitor ID is ${regId}. I have a query regarding IHWE 2026: `;
        const url = `https://wa.me/${cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone}?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank');
        setActivePhone(null);
    };

    const handleCall = (phone: string) => {
        window.location.href = `tel:${phone}`;
        setActivePhone(null);
    };

    return (
        <div className="fixed top-0 inset-x-0 z-[100] h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 shadow-sm print:hidden">
            {/* Left */}
            <div className="flex items-center gap-3">
                <button onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-slate-100 transition-colors text-slate-600">
                    {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
                <div className="flex items-center" style={{ height: '48px' }}>
                    {logo ? (
                        <img src={`${SERVER_URL}${logo}`} style={{ height: '48px', width: 'auto', objectFit: 'contain', maxWidth: '180px' }} alt="Logo" />
                    ) : (
                        <div className="flex items-center gap-2">
                            <div className="w-9 h-9 bg-[#23471d] flex items-center justify-center rounded-sm">
                                <ShieldCheck size={18} className="text-white" />
                            </div>
                            <span className="text-[12px] font-black text-slate-800 uppercase tracking-widest hidden sm:block">IHWE Portal</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2">
                {/* Relationship Manager */}
                {rmName && (
                    <div className="relative">
                        <button onClick={() => setShowRM(p => !p)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#23471d]/10 border border-[#23471d]/20 text-[#23471d] text-[10px] font-black uppercase tracking-widest rounded-sm hover:bg-[#23471d]/20 transition-colors">
                            <Phone size={11} />
                            <span className="hidden sm:block">Relationship Manager</span>
                        </button>

                        {showRM && (
                            <>
                                {/* backdrop */}
                                <div className="fixed inset-0 z-40" onClick={() => { setShowRM(false); setActivePhone(null); }} />
                                <div className="absolute right-0 top-10 w-80 bg-white border border-slate-200 shadow-xl rounded-sm z-50 overflow-hidden">
                                    <div className="bg-[#23471d] px-4 py-3 flex items-center justify-between">
                                        <p className="text-[10px] font-black text-white uppercase tracking-widest">Your Relationship Manager</p>
                                        <button onClick={() => setShowRM(false)} className="text-white/70 hover:text-white"><X size={13} /></button>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-12 h-12 rounded-full bg-[#23471d]/10 flex items-center justify-center flex-shrink-0">
                                                <User size={22} className="text-[#23471d]" />
                                            </div>
                                            <div>
                                                <p className="text-[14px] font-black text-slate-800">
                                                    {rmDetails?.fullName || rmName}
                                                </p>
                                                {rmDetails?.designation && (
                                                    <p className="text-[10px] text-[#d26019] font-bold uppercase tracking-wider">{rmDetails.designation}</p>
                                                )}
                                                <p className="text-[10px] text-slate-400 uppercase tracking-wider">IHWE Team</p>
                                            </div>
                                        </div>

                                        <div className="space-y-4 border-t border-slate-100 pt-3">
                                            {[rmDetails?.mobile, rmDetails?.altMobile].filter(Boolean).map((phone, idx) => (
                                                <div key={idx} className="relative">
                                                    <div className="flex items-center gap-2">
                                                        <Phone size={12} className="text-[#23471d] flex-shrink-0" />
                                                        <button 
                                                            onClick={() => setActivePhone(phone)}
                                                            className={`text-left transition-colors ${activePhone === phone ? 'text-[#23471d]' : 'text-slate-700 hover:text-[#23471d]'}`}
                                                        >
                                                            <p className="text-[12px] font-bold tracking-tight">{phone}</p>
                                                            {idx > 0 && <p className="text-[9px] text-slate-400 font-bold uppercase">Alternative Number</p>}
                                                        </button>
                                                    </div>

                                                    {activePhone === phone && (
                                                        <div className="mt-2 grid grid-cols-2 gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
                                                            <button 
                                                                onClick={() => handleWhatsApp(phone)}
                                                                className="flex items-center justify-center gap-1.5 py-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase rounded-sm border border-emerald-100 hover:bg-emerald-100 transition-colors"
                                                            >
                                                                <MessageSquare size={12} /> WhatsApp
                                                            </button>
                                                            <button 
                                                                onClick={() => handleCall(phone)}
                                                                className="flex items-center justify-center gap-1.5 py-1.5 bg-blue-50 text-blue-700 text-[10px] font-black uppercase rounded-sm border border-blue-100 hover:bg-blue-100 transition-colors"
                                                            >
                                                                <Phone size={12} /> Call Now
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                            
                                            {rmDetails?.email && (
                                                <div className="flex items-center gap-2">
                                                    <Mail size={12} className="text-[#23471d] flex-shrink-0" />
                                                    <a href={`mailto:${rmDetails.email}`} className="text-[12px] font-bold text-slate-700 hover:text-[#23471d] truncate">
                                                        {rmDetails.email}
                                                    </a>
                                                </div>
                                            )}
                                        </div>

                                        <p className="text-[10px] text-slate-400 border-t border-slate-100 pt-3 mt-3 leading-relaxed font-medium">
                                            For any queries regarding your stall booking, please reach out to your relationship manager.
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}

                {/* Chat notification button */}
                {onChatClick && (
                    <button onClick={onChatClick}
                        className="relative p-2 rounded-sm hover:bg-slate-100 transition-colors"
                        title="Chat Support">
                        <MessageSquare size={16} className="text-[#23471d]" />
                        {unreadChat > 0 && (
                            <span className="absolute -top-1 -right-1 bg-[#d26019] text-white text-[9px] min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center font-black">
                                {unreadChat > 9 ? '9+' : unreadChat}
                            </span>
                        )}
                    </button>
                )}

                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-sm">
                    <div className="w-5 h-5 rounded-sm bg-[#23471d]/10 flex items-center justify-center">
                        <User size={11} className="text-[#23471d]" />
                    </div>
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
                        {data?.exhibitorName || data?.contact1?.firstName || 'Exhibitor'}
                    </span>
                </div>
                <button onClick={handleLogout}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-sm transition-colors">
                    <LogOut size={12} />
                    <span className="hidden sm:block">Logout</span>
                </button>
            </div>
        </div>
    );
}
