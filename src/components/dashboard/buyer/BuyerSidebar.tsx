import { useState } from "react";
import { LayoutDashboard, User, FileText, Building2, Lock, ChevronRight, Award, MessageSquare, ChevronDown, Megaphone, Handshake, CalendarCheck, FolderOpen, ClipboardList } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: any) => void;
    sidebarOpen: boolean;
    onChangePwd: () => void;
    unreadChat?: number;
}

const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "profile", label: "Profile Management", icon: User },
    { id: "invoices", label: "Invoice and Receipts", icon: FileText },
    { id: "bsm", label: "Buyer Seller Meet", icon: Handshake },
    { id: "calendar", label: "Meeting Calendar", icon: CalendarCheck },
    { id: "documentation", label: "Documentation", icon: FolderOpen },
    { id: "chat", label: "Chat Support", icon: MessageSquare },
    { id: 'feedback', label: 'Buyer Feedback', icon: ClipboardList },
    { id: "notifications", label: "Notifications", icon: Megaphone },
];

export default function BuyerSidebar({ activeTab, setActiveTab, sidebarOpen, onChangePwd, unreadChat = 0 }: SidebarProps) {
    return (
        <aside className={`fixed top-16 left-0 bottom-0 z-50 bg-white border-r border-slate-200 flex flex-col transition-all duration-300 overflow-hidden print:hidden ${sidebarOpen ? "w-56" : "w-14"}`}>
            <nav className="flex-1 py-4 space-y-0.5 px-2 overflow-y-auto">
                {navItems.map(item => {
                    const Icon = item.icon;
                    const active = activeTab === item.id;
                    const isChat = item.id === "chat";
                    return (
                        <button key={item.id} onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-2 py-2 rounded-sm text-left transition-all ${active ? "bg-[#23471d] text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}>
                            <div className="relative shrink-0">
                                <Icon size={15} />
                                {isChat && unreadChat > 0 && (
                                    <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-[#d26019] rounded-full text-[8px] font-black text-white flex items-center justify-center">
                                        {unreadChat > 9 ? "9+" : unreadChat}
                                    </span>
                                )}
                            </div>
                            {sidebarOpen && (
                                <span className="text-[11px] font-bold uppercase tracking-wider whitespace-nowrap flex-1">{item.label}</span>
                            )}
                            {sidebarOpen && isChat && unreadChat > 0 && !active && (
                                <span className="bg-[#d26019] text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">{unreadChat}</span>
                            )}
                            {sidebarOpen && active && <ChevronRight size={12} className="ml-auto" />}
                        </button>
                    );
                })}
            </nav>

            <div className="px-2 pb-4">
                <button onClick={onChangePwd} className="w-full flex items-center gap-3 px-2 py-2 rounded-sm text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-all">
                    <Lock size={15} className="shrink-0" />
                    {sidebarOpen && <span className="text-[11px] font-bold uppercase tracking-wider whitespace-nowrap">Change Password</span>}
                </button>
            </div>
        </aside>
    );
}
