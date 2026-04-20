import { useState } from "react";
import { LayoutDashboard, User, FileText, Building2, Lock, ChevronRight, Award, Package, MessageSquare, ChevronDown, Megaphone, Handshake, CalendarCheck, FolderOpen } from "lucide-react";
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
    { id: "profile", label: "Profile", icon: User },
    { id: "invoices", label: "Accounts", icon: FileText },
    { id: "stall-management", label: "Stall Management", icon: Building2 },
    { id: "marketing", label: "Marketing Toolkit", icon: Megaphone },
    { id: "bsm", label: "Buyer Seller Meet", icon: Handshake },
    { id: "calendar", label: "Meeting Calendar", icon: CalendarCheck },
    { id: "documentation", label: "Documentation", icon: FolderOpen },
    { id: "chat", label: "Chat Support", icon: MessageSquare },
];

const msmeSubItems = [
    { id: "msme", label: "Udyam Details" },
    {
        id: "psm_claim", label: "PSM Claim",
        isDropdown: true,
        subItems: [
            {
                id: "psm_reports", label: "Reports", isDropdown: true, subItems: [
                    { id: "annexure_c", label: "Annexure C" },
                    { id: "annexure_d", label: "Annexure D" },
                    { id: "declaration", label: "Declaration" },
                    { id: "feedback_report", label: "Feedback Report" },
                    { id: "undertaking", label: "Undertaking" },
                    { id: "pre_receipt", label: "Pre-Receipt" },
                    // { id: "participants_feedback", label: "Participants Feedback" },
                    { id: "mandate_form", label: "Mandate Form" },
                    { id: "pfms_details", label: "PFMS Details" }
                ]
            },
            {
                id: "psm_reports_table", label: "Reports Table", isDropdown: true, subItems: [
                    { id: "annexure_c_table", label: "Annexure C" },
                    { id: "annexure_d_table", label: "Annexure D" },
                    { id: "declaration_table", label: "Declaration" },
                    { id: "feedback_report_table", label: "Feedback Report" },
                    { id: "undertaking_table", label: "Undertaking" },
                    { id: "pre_receipt_table", label: "Pre-Receipt" },
                    // { id: "participants_feedback", label: "Participants Feedback" },
                    { id: "mandate_form_table", label: "Mandate Form" },
                    { id: "pfms_details_table", label: "PFMS Details" }
                ]
            },
        ]
    },
];

export default function ExhibitorSidebar({ activeTab, setActiveTab, sidebarOpen, onChangePwd, unreadChat = 0 }: SidebarProps) {
    const psmSubItems = msmeSubItems.find(i => i.id === "psm_claim")?.subItems || [];
    const psmSubItemIds = psmSubItems.flatMap(si => [si.id, ...(si.subItems?.map(ni => ni.id) || [])]);
    const isMsmeActive = activeTab === "msme" || activeTab === "psm_claim" || psmSubItemIds.includes(activeTab);

    const [msmeOpen, setMsmeOpen] = useState(isMsmeActive);
    const [expandedGroups, setExpandedGroups] = useState<string[]>(() => {
        const initial = [];
        if (psmSubItemIds.includes(activeTab)) initial.push("psm_claim");
        const activeSub = psmSubItems.find(si => si.subItems?.some(s => s.id === activeTab));
        if (activeSub) initial.push(activeSub.id);
        return initial;
    });

    const toggleGroup = (id: string) => {
        setExpandedGroups(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const handleMsmeToggle = () => {
        if (!sidebarOpen) {

            setActiveTab("msme");
            return;
        }
        setMsmeOpen(prev => !prev);
    };

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

                {/* ── MSME Dropdown ── */}
                <div>
                    <button
                        onClick={handleMsmeToggle}
                        className={`w-full flex items-center gap-3 px-2 py-2 rounded-sm text-left transition-all ${isMsmeActive ? "bg-[#23471d] text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}>
                        <div className="relative shrink-0">
                            <Award size={15} />
                        </div>
                        {sidebarOpen && (
                            <span className="text-[11px] font-bold uppercase tracking-wider whitespace-nowrap flex-1">MSME</span>
                        )}
                        {sidebarOpen && (
                            <ChevronDown
                                size={12}
                                className={`ml-auto transition-transform duration-200 ${msmeOpen ? "rotate-180" : ""}`}
                            />
                        )}
                    </button>

                    <AnimatePresence initial={false}>
                        {sidebarOpen && msmeOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                                className="overflow-hidden"
                            >
                                <div className="mt-1 mb-1 ml-[17px] border-l-2 border-slate-200 pl-2 space-y-1">
                                    {msmeSubItems.map(sub => {
                                        if (sub.isDropdown) {
                                            const isGroupActive = activeTab === sub.id || sub.subItems?.some(s => s.id === activeTab);
                                            const isOpen = expandedGroups.includes(sub.id);
                                            return (
                                                <div key={sub.id} className="flex flex-col w-full">
                                                    <button
                                                        onClick={() => toggleGroup(sub.id)}
                                                        className={`w-full flex items-center gap-2 px-2 py-2 rounded-sm text-left transition-all relative group ${isGroupActive ? "bg-[#23471d]/10 text-[#23471d]" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                                                            }`}
                                                    >
                                                        <span
                                                            className={`absolute -left-[13px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-all duration-300 ring-2 ring-white ${isGroupActive ? "bg-[#23471d] scale-100" : "bg-slate-300 scale-0 group-hover:scale-100"
                                                                }`}
                                                        />
                                                        <span className={`text-[10px] uppercase tracking-wider whitespace-nowrap flex-1 ${isGroupActive ? "font-bold" : "font-semibold"}`}>
                                                            {sub.label}
                                                        </span>
                                                        {isOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                                                    </button>

                                                    <AnimatePresence initial={false}>
                                                        {isOpen && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: "auto", opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                transition={{ duration: 0.25, ease: "easeInOut" }}
                                                                className="overflow-hidden"
                                                            >
                                                                <div className="mt-1 mb-1 ml-[8px] border-l border-slate-200 pl-2 space-y-0.5">
                                                                    {sub.subItems?.map(nested => {
                                                                        if (nested.isDropdown) {
                                                                            const isNestedOpen = expandedGroups.includes(nested.id);
                                                                            const isNestedActive = activeTab === nested.id || nested.subItems?.some(s => s.id === activeTab);
                                                                            return (
                                                                                <div key={nested.id} className="flex flex-col w-full">
                                                                                    <button
                                                                                        onClick={() => toggleGroup(nested.id)}
                                                                                        className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-sm text-left transition-all ${isNestedActive ? "text-[#23471d] font-bold" : "text-slate-500 hover:text-slate-800 font-semibold"}`}
                                                                                    >
                                                                                        <span className="text-[9px] uppercase tracking-wider whitespace-nowrap">{nested.label}</span>
                                                                                        {isNestedOpen ? <ChevronDown size={10} className="ml-auto" /> : <ChevronRight size={10} className="ml-auto" />}
                                                                                    </button>
                                                                                    <AnimatePresence>
                                                                                        {isNestedOpen && (
                                                                                            <motion.div
                                                                                                initial={{ height: 0, opacity: 0 }}
                                                                                                animate={{ height: "auto", opacity: 1 }}
                                                                                                exit={{ height: 0, opacity: 0 }}
                                                                                                className="ml-2 border-l border-slate-100 pl-2 space-y-0.5"
                                                                                            >
                                                                                                {nested.subItems?.map(nn => (
                                                                                                    <button
                                                                                                        key={nn.id}
                                                                                                        onClick={() => setActiveTab(nn.id)}
                                                                                                        className={`w-full flex items-center gap-2 px-2 py-1 rounded-sm text-left transition-all ${activeTab === nn.id ? "text-[#23471d] font-bold bg-[#23471d]/5" : "text-slate-400 hover:text-slate-700 font-medium"}`}
                                                                                                    >
                                                                                                        <span className="text-[8px] uppercase tracking-widest">{nn.label}</span>
                                                                                                    </button>
                                                                                                ))}
                                                                                            </motion.div>
                                                                                        )}
                                                                                    </AnimatePresence>
                                                                                </div>
                                                                            );
                                                                        }

                                                                        const nestedActive = activeTab === nested.id;
                                                                        return (
                                                                            <button
                                                                                key={nested.id}
                                                                                onClick={() => setActiveTab(nested.id)}
                                                                                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-sm text-left transition-all relative group ${nestedActive ? "text-[#23471d] font-bold" : "text-slate-500 hover:text-slate-800 font-semibold"
                                                                                    }`}
                                                                            >
                                                                                <span className="text-[9px] uppercase tracking-wider whitespace-nowrap">{nested.label}</span>
                                                                                {nestedActive && <ChevronRight size={10} className="ml-auto" />}
                                                                            </button>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            );
                                        }

                                        const active = activeTab === sub.id;
                                        return (
                                            <button
                                                key={sub.id}
                                                onClick={() => setActiveTab(sub.id)}
                                                className={`w-full flex items-center gap-2 px-2 py-2 rounded-sm text-left transition-all relative group ${active ? "bg-[#23471d]/10 text-[#23471d]" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                                                    }`}
                                            >
                                                <span
                                                    className={`absolute -left-[13px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-all duration-300 ring-2 ring-white ${active ? "bg-[#23471d] scale-100" : "bg-slate-300 scale-0 group-hover:scale-100"
                                                        }`}
                                                />
                                                <span className={`text-[10px] uppercase tracking-wider whitespace-nowrap ${active ? "font-bold" : "font-semibold"}`}>
                                                    {sub.label}
                                                </span>
                                                {active && <ChevronRight size={12} className="ml-auto" />}
                                            </button>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* ── My Events ── */}
                <button
                    onClick={() => setActiveTab("exhibitions")}
                    className={`w-full flex items-center gap-3 px-2 py-2 rounded-sm text-left transition-all ${activeTab === "exhibitions" ? "bg-[#23471d] text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}>
                    <Building2 size={15} className="shrink-0" />
                    {sidebarOpen && <span className="text-[11px] font-bold uppercase tracking-wider whitespace-nowrap flex-1">My Events</span>}
                    {sidebarOpen && activeTab === "exhibitions" && <ChevronRight size={12} className="ml-auto" />}
                </button>
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
