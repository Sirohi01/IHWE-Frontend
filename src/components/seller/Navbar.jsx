import { useState } from 'react';
import { LogOut, Menu, X, ShieldCheck, User, Bell } from 'lucide-react';
import { useAuth } from '@/context/SellerAuthContext';

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
    const { currentSeller, logout } = useAuth();
    const initials = currentSeller?.fullName
        ? currentSeller.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        : 'BU';

    return (
        <div className="fixed top-0 inset-x-0 z-[100] h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 shadow-sm print:hidden">
            {/* Left */}
            <div className="flex items-center gap-3">
                <button onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-slate-100 transition-colors text-slate-600">
                    {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
                <div className="flex items-center" style={{ height: '48px' }}>
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-[#23471d] flex items-center justify-center rounded-sm">
                            <ShieldCheck size={18} className="text-white" />
                        </div>
                        <span className="text-[12px] font-black text-slate-800 uppercase tracking-widest hidden sm:block font-sans">Seller Portal</span>
                    </div>
                </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2">
                {/* Notifications */}
                <button className="relative p-2 rounded-sm hover:bg-slate-100 transition-colors" title="Notifications">
                    <Bell size={16} className="text-[#23471d]" />
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                </button>

                {/* User Info */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-sm">
                    <div className="w-5 h-5 rounded-sm bg-[#23471d]/10 flex items-center justify-center">
                        <User size={11} className="text-[#23471d]" />
                    </div>
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest font-sans">
                        {currentSeller?.fullName || 'Seller'}
                    </span>
                </div>

                {/* Profile Circle (Small) */}
                <div className="w-8 h-8 bg-[#23471d] rounded-full flex items-center justify-center text-white text-[10px] font-black shadow-inner">
                    {initials}
                </div>

                {/* Logout */}
                <button onClick={logout}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-sm transition-colors font-sans">
                    <LogOut size={12} />
                    <span className="hidden sm:block">Logout</span>
                </button>
            </div>
        </div>
    );
}