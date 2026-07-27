import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Menu, X, ShieldCheck, User, Phone, Mail, MessageSquare, Sun, Sunset, Moon, Sparkles } from 'lucide-react';
import { SERVER_URL, API_URL } from '@/lib/api';
import { BiSupport } from "react-icons/bi";
import { RiContactsLine, RiListCheck2, RiAlarmWarningLine, RiUserAddLine } from "react-icons/ri";
import { IoNotificationsOutline } from "react-icons/io5";
import ExhibitorChatTab from '@/components/dashboard/exhibitor/ExhibitorChatTab';

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
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showChatPopup, setShowChatPopup] = useState(false);
    const [rmDetails, setRmDetails] = useState<any>(null);
    const [activePhone, setActivePhone] = useState<string | null>(null);
    const rmName = data?.spokenWith || data?.referredBy || null;
    const navigate = useNavigate();
    const location = useLocation();

    const getPageName = (pathname: string) => {
        if (pathname === '/exhibitor-dashboard' || pathname === '/exhibitor-dashboard/') return 'Dashboard';
        if (pathname === '/exhibitor-dashboard/msme/application') return 'MSME PMS Scheme';
        if (pathname === '/exhibitor-dashboard/msme/pms-claim-status') return 'MSME PMS Claim Status';
        if (pathname === '/exhibitor-dashboard/msme/pms-claim-status-approved') return 'PMS Reimbursement Approved';
        const pathSegments = pathname.split('/').filter(Boolean);
        const lastSegment = pathSegments[pathSegments.length - 1];
        if (!lastSegment || lastSegment === 'exhibitor-dashboard') return 'Dashboard';
        if (lastSegment === 'bsm') return 'Buyer Seller Meet';
        if (lastSegment === 'epromotion') return 'E-Promotion';
        if (lastSegment === 'psm-claim') return 'PMS Scheme';
        if (lastSegment === 'ex-profile') return 'Exhibitor Profile';
        if (lastSegment === 'accessories') return 'Add On Services';
        return lastSegment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    };
    
    const pageName = getPageName(location.pathname);

    const [timeContext, setTimeContext] = useState<{ greeting: string; icon: any; iconColor: string }>({
        greeting: "Welcome back",
        icon: Sparkles,
        iconColor: "text-amber-500"
    });

    useEffect(() => {
        const hr = new Date().getHours();
        if (hr >= 5 && hr < 12) {
            setTimeContext({ greeting: "Good morning", icon: Sun, iconColor: "text-amber-500 animate-pulse" });
        } else if (hr >= 12 && hr < 17) {
            setTimeContext({ greeting: "Good afternoon", icon: Sun, iconColor: "text-amber-500" });
        } else if (hr >= 17 && hr < 22) {
            setTimeContext({ greeting: "Good evening", icon: Sunset, iconColor: "text-orange-500" });
        } else {
            setTimeContext({ greeting: "Welcome back", icon: Moon, iconColor: "text-indigo-400" });
        }
    }, []);

    const TimeIcon = timeContext.icon;

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
        <div className={`fixed top-0 right-0 z-[100] h-[56px] bg-gradient-to-r from-[#051c47] via-[#082b6b] to-[#051c47] border-b border-blue-900/50 shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex items-center justify-between px-3 lg:px-6 print:hidden transition-all duration-300 left-0 ${sidebarOpen ? 'lg:left-56' : 'lg:left-[72px]'}`}>
            {/* Left */}
            <div className="flex items-center gap-2 lg:gap-3">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-1.5 text-white hover:bg-white/10 rounded-md transition-colors lg:hidden"
                >
                    {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
                <h2 className="text-white text-[15px] uppercase font-semibold tracking-tight hidden sm:block">
                    Exhibitor Interface <span className="text-yellow-200 font-medium tracking-normal capitalize ml-1">
                        | {pageName}
                    </span>
                </h2>
                <h2 className="text-white text-[11px] uppercase font-bold tracking-tight sm:hidden">IHWE 2026</h2>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
                {/* Relationship Manager */}
                {rmName && (
                    <div className="relative group">
                        <button onClick={() => navigate('/exhibitor-dashboard/relationship-manager')}
                            className="relative p-2 rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-sm">
                            <RiContactsLine size={15} />
                        </button>
                        {/* Custom Tooltip */}
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-bold px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-50 shadow-md">
                            Relationship Manager
                        </span>
                    </div>
                )}

                {/* Reminder List */}
                <div className="relative hidden sm:block group">
                    <button onClick={() => navigate('/exhibitor-dashboard/reminders')}
                        className="relative p-2 rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-sm">
                        <RiAlarmWarningLine size={15} className="text-slate-300 hover:text-white" />
                        {data?.balanceAmount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-gradient-to-br from-red-500 to-orange-600 border border-white text-white text-[9px] min-w-[15px] h-3.5 px-0.5 rounded-full flex items-center justify-center font-black shadow-sm">
                                1
                            </span>
                        )}
                    </button>
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-bold px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-50 shadow-md">
                        Payment Reminders
                    </span>
                </div>

                {/* Notification */}
                <div className="relative group">
                    <button onClick={() => navigate('/exhibitor-dashboard/notification')}
                        className="relative p-2 rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-sm">
                        <IoNotificationsOutline size={15} className="text-slate-300 hover:text-white" />
                        {/* Dynamic Notification Badge */}
                        <span className="absolute -top-1 -right-1 bg-gradient-to-br from-red-500 to-orange-600 border border-white text-white text-[9px] min-w-[15px] h-3.5 px-0.5 rounded-full flex items-center justify-center font-black shadow-sm">
                            {(data?.balanceAmount > 0 ? 1 : 0) + 2}
                        </span>
                    </button>
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-bold px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-50 shadow-md">
                        Notifications
                    </span>
                </div>

                {/* Support (Live Chat Popup) */}
                <div className="relative">
                    <div className="relative group">
                        <button
                            onClick={() => setShowChatPopup(p => !p)}
                            className="relative p-2 rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-sm"
                        >
                            <BiSupport size={15} className="text-slate-300 hover:text-white" />
                            {unreadChat > 0 && (
                                <span className="absolute -top-1 -right-1 bg-gradient-to-br from-orange-500 to-red-600 text-white text-[9px] min-w-[15px] h-3.5 px-0.5 rounded-full flex items-center justify-center font-black shadow-sm">
                                    {unreadChat > 9 ? '9+' : unreadChat}
                                </span>
                            )}
                        </button>
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-bold px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-50 shadow-md">
                            Live Chat
                        </span>
                    </div>

                    {showChatPopup && (
                        <>
                            {/* Backdrop */}
                            <div className="fixed inset-0 z-40" onClick={() => setShowChatPopup(false)} />
                            <div className="absolute right-0 top-11 w-[350px] bg-white border border-slate-200 shadow-2xl rounded-lg z-50 overflow-hidden" style={{ height: '520px' }}>
                                <ExhibitorChatTab data={data} inNavbar={true} />
                            </div>
                        </>
                    )}
                </div>

                {/* User Profile Dropdown */}
                <div className="relative group">
                    <button
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className="flex items-center gap-2 pl-2 pr-1.5 py-1 bg-white/5 border border-white/10 rounded-full hover:shadow-md hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-sm"
                        id="user-profile-trigger"
                    >
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-[10px] font-black shadow-sm">
                            {data?.exhibitorName?.charAt(0) || 'E'}
                        </div>
                        <span className="text-[10px] font-extrabold text-slate-200 uppercase tracking-widest hidden md:block max-w-[120px] truncate">
                            My Profile
                        </span>
                        <div className="p-0.5 text-slate-400">
                            <Menu size={13} className="text-slate-300" />
                        </div>
                    </button>

                    <AnimatePresence>
                        {showUserMenu && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 shadow-2xl rounded-sm z-50 overflow-hidden"
                                >
                                    <div className="p-4 border-b border-slate-50 bg-slate-50/50">
                                        <p className="text-[11px] font-black text-slate-800 uppercase tracking-widest leading-none mb-1">
                                            {data?.contact1?.firstName || 'User'} {data?.contact1?.lastName || ''}
                                        </p>
                                        <p className="text-[9px] font-bold text-slate-400 truncate">{data?.contact1?.email || data?.email || 'exhibitor@example.com'}</p>
                                    </div>
                                    <div className="p-1">
                                        <button
                                            onClick={() => { navigate('/exhibitor-dashboard/ex-profile1'); setShowUserMenu(false); }}
                                            className="w-full flex items-center gap-3 px-3 py-2.5 text-[11px] font-bold text-slate-600 hover:text-[#23471d] hover:bg-emerald-50 rounded-sm transition-all"
                                        >
                                            <User size={14} />
                                            My Profile
                                        </button>

                                        <div className="my-1 border-t border-slate-100" />
                                        <button
                                            onClick={() => { handleLogout(); setShowUserMenu(false); }}
                                            className="w-full flex items-center gap-3 px-3 py-2.5 text-[11px] font-bold text-red-600 hover:bg-red-50 rounded-sm transition-all"
                                        >
                                            <LogOut size={14} />
                                            Logout System
                                        </button>
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
