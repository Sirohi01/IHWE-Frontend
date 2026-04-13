import { useState } from 'react';
import { LogOut, Menu, X, ShieldCheck, User, Bell } from 'lucide-react';
import { SERVER_URL } from '@/lib/api';

interface NavbarProps {
    logo: string | null;
    data: any;
    sidebarOpen: boolean;
    setSidebarOpen: (v: boolean) => void;
    handleLogout: () => void;
}

export default function ExhibitorNavbar({ logo, data, sidebarOpen, setSidebarOpen, handleLogout }: NavbarProps) {
    return (
        <div className="fixed top-0 inset-x-0 z-[100] h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 shadow-sm">
            {/* Left: Hamburger + Logo */}
            <div className="flex items-center gap-3">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-slate-100 transition-colors text-slate-600"
                >
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

            {/* Right: User info + logout */}
            <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-sm">
                    <div className="w-5 h-5 rounded-sm bg-[#23471d]/10 flex items-center justify-center">
                        <User size={11} className="text-[#23471d]" />
                    </div>
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
                        {data?.exhibitorName || data?.contact1?.firstName || 'Exhibitor'}
                    </span>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-sm transition-colors"
                >
                    <LogOut size={12} />
                    <span className="hidden sm:block">Logout</span>
                </button>
            </div>
        </div>
    );
}
