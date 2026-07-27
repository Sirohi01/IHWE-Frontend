import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LogOut, Menu, X, ShieldCheck, User, Phone, Mail, MessageSquare } from 'lucide-react';
import { SERVER_URL, API_URL } from '@/lib/api';
import { BiSupport } from "react-icons/bi";
import { RiContactsLine, RiAlarmWarningLine } from "react-icons/ri";
import { IoNotificationsOutline } from "react-icons/io5";
import BuyerChatTab from './BuyerChatTab';

interface NavbarProps {
    logo: string | null;
    data: any;
    sidebarOpen: boolean;
    setSidebarOpen: (v: boolean) => void;
    handleLogout: () => void;
    onChatClick?: () => void;
    unreadChat?: number;
}

export default function BuyerNavbar({ logo, data, sidebarOpen, setSidebarOpen, handleLogout, onChatClick, unreadChat = 0 }: NavbarProps) {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showChatPopup, setShowChatPopup] = useState(false);
    const navigate = useNavigate();

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
                        <img loading="lazy" decoding="async" src={`${SERVER_URL}${logo}`} style={{ height: '48px', width: 'auto', objectFit: 'contain', maxWidth: '180px' }} alt="Logo" />
                    ) : (
                        <div className="flex items-center gap-2">
                            <div className="w-9 h-9 bg-[#23471d] flex items-center justify-center rounded-sm">
                                <ShieldCheck size={18} className="text-white" />
                            </div>
                            <span className="text-[12px] font-black text-slate-800 uppercase tracking-widest hidden sm:block">Buyer Portal</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
                {/* Notification */}
                <div className="relative group bg-gray-100 rounded-full">
                    <button onClick={() => navigate('/buyer-dashboard/notifications')} className="relative p-2 rounded-full hover:bg-slate-200 transition-colors">
                        <IoNotificationsOutline size={16} className="text-[#23471d]" />
                    </button>
                    <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-100 pointer-events-none z-50">
                        Notifications
                    </span>
                </div>

                {/* Support (Live Chat Popup) */}
                <div className="relative">
                    <div className="relative group bg-gray-100 rounded-full">
                        <button
                            onClick={() => setShowChatPopup(p => !p)}
                            className="relative p-2 rounded-full hover:bg-slate-100 transition-colors"
                        >
                            <BiSupport size={16} className="text-[#23471d]" />
                            {unreadChat > 0 && (
                                <span className="absolute -top-1 -right-1 bg-[#d26019] text-white text-[9px] min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center font-black">
                                    {unreadChat > 9 ? '9+' : unreadChat}
                                </span>
                            )}
                        </button>
                        <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-100 pointer-events-none z-50">
                            Live Chat
                        </span>
                    </div>

                    {showChatPopup && (
                        <>
                            {/* Backdrop */}
                            <div className="fixed inset-0 z-40" onClick={() => setShowChatPopup(false)} />
                            <div className="absolute right-0 top-10 w-[350px] bg-white border border-slate-200 shadow-xl rounded-sm z-50 overflow-hidden" style={{ height: '520px' }}>
                                <BuyerChatTab data={data} inNavbar={true} />
                            </div>
                        </>
                    )}
                </div>

                {/* User Profile Dropdown */}
                <div className="relative group">
                    <button
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className="flex items-center gap-2 pl-3 pr-1 py-1 bg-slate-50 border border-slate-200 rounded-full hover:bg-slate-100 transition-all shadow-sm"
                        id="user-profile-trigger"
                    >
                        <div className="w-7 h-7 rounded-full bg-[#23471d] flex items-center justify-center text-white text-[10px] font-bold shadow-sm">
                            {data?.companyFirmName?.charAt(0) || 'B'}
                        </div>
                        <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest hidden md:block max-w-[120px] truncate">
                            My Profile
                        </span>
                        <div className="p-1 text-slate-400">
                            <Menu size={14} />
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
                                            {data?.nameOfRepresentative || 'Buyer'}
                                        </p>
                                        <p className="text-[9px] font-bold text-slate-400 truncate">{data?.emailAddress || ''}</p>
                                    </div>
                                    <div className="p-1">
                                        <button
                                            onClick={() => { navigate('/buyer-dashboard/profile'); setShowUserMenu(false); }}
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
