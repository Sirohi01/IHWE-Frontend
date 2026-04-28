import { useState } from "react";
import { LayoutDashboard, User, FileText, Building2, Lock, ChevronRight, Award, Package, MessageSquare, ChevronDown, Megaphone, CalendarCheck, FolderOpen, CreditCard, Store, ShoppingBag, Send, ExternalLink, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
    data: any;
    activeTab: string;
    setActiveTab: (tab: any) => void;
    sidebarOpen: boolean;
    onChangePwd: () => void;
    unreadChat?: number;
}

export default function ExhibitorSidebar({ data, activeTab, setActiveTab, sidebarOpen, onChangePwd, unreadChat = 0 }: SidebarProps) {
    const navigate = useNavigate();
    const isSeller = data?.isSeller || false;
    const isSubscribed = data?.sellerSubscription?.status === 'active';

    const navItems = [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "stall-management", label: "Stall Information", icon: Building2 },
        { id: "invoices", label: "Invoice and Receipts", icon: FileText },
        { id: "payments", label: "Make Payment", icon: CreditCard },
        { id: "documentation", label: "Documentation", icon: FolderOpen },
        { id: "exhibitions", label: "My Events", icon: Star },
        { id: "chat", label: "Chat Support", icon: MessageSquare },
    ];

    const sellerSubItems = [
        { id: "seller-dashboard", label: "Dashboard Home", icon: LayoutDashboard },
        { id: "ex-profile", label: "Profile Management", icon: User },
        { id: "stall-management", label: "Stall Booking", icon: Building2 },
        { id: "payments", label: "Payment Management", icon: CreditCard },
        { id: "seller-products", label: "Manage Products", icon: Package },
        { id: "product-export", label: "Product Export", icon: Send },
        { id: "seller-leads", label: "Lead Management", icon: Store },
        { id: "seller-sponsorship", label: "Sponsorships", icon: Award },
        { id: "seller-conference", label: "Conferences", icon: CalendarCheck },
        ...(isSubscribed ? [{ id: "seller-marketing", label: "Marketing Toolkit", icon: Megaphone }] : []),
        { id: "seller-logistics", label: "Logistics & Ops", icon: Package },
        { id: "seller-reports", label: "Business Reports", icon: FileText },
    ];

    const isSellerActive = activeTab.startsWith('seller-') || activeTab === 'product-export' || activeTab === 'stall-management' || activeTab === 'ex-profile' || activeTab === 'payments';
    const [sellerOpen, setSellerOpen] = useState(isSellerActive);

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
                        { id: "pfms_details", label: "PFMS Details" },
                        { id: "covering_letter", label: "Covering Letter" },
                        { id: "narrative_feedback", label: "Narrative Feedback" }
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
                        { id: "pfms_details_table", label: "PFMS Details" },
                        { id: "covering_letter_table", label: "Covering Letter" },
                        { id: "narrative_feedback_table", label: "Narrative Feedback" }
                    ]
                },
            ]
        },
    ];

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

                {/* ── Seller Section ── */}
                {!isSeller ? (
                    // Not a seller yet — show "Become a Seller" button
                    <button
                        onClick={() => setActiveTab("become-seller")}
                        className={`w-full flex items-center gap-3 px-2 py-2 rounded-sm text-left transition-all ${activeTab === "become-seller" ? "bg-[#23471d] text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}>
                        <div className="relative shrink-0">
                            <Store size={15} />
                        </div>
                        {sidebarOpen && (
                            <span className="text-[11px] font-bold uppercase tracking-wider whitespace-nowrap flex-1">Become a Seller</span>
                        )}
                        {sidebarOpen && activeTab === "become-seller" && <ChevronRight size={12} className="ml-auto" />}
                    </button>
                ) : data?.sellerStatus === 'pending' ? (
                    // Seller registered but pending admin approval
                    <div className={`w-full flex items-center gap-3 px-2 py-2 rounded-sm ${sidebarOpen ? 'bg-amber-50 border border-amber-200' : ''}`}>
                        <div className="relative shrink-0 text-amber-500">
                            <Store size={15} />
                        </div>
                        {sidebarOpen && (
                            <div className="flex-1 min-w-0">
                                <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 block">Seller: Pending</span>
                                <span className="text-[9px] text-amber-600 leading-tight block">Awaiting admin approval</span>
                            </div>
                        )}
                    </div>
                ) : data?.sellerStatus === 'active' && data?.sellerSubscription?.status !== 'active' ? (
                    // Approved but no subscription — go to seller portal (sponsorship page inside)
                    <button
                        onClick={() => navigate("/seller-portal")}
                        className="w-full flex items-center gap-3 px-2 py-2 rounded-sm text-left transition-all bg-blue-50 border border-blue-200 hover:bg-blue-100">
                        <div className="relative shrink-0 text-blue-600">
                            <Store size={15} />
                        </div>
                        {sidebarOpen && (
                            <div className="flex-1 min-w-0">
                                <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 block">Seller Approved!</span>
                                <span className="text-[9px] text-blue-600 leading-tight block">Buy a plan to activate</span>
                            </div>
                        )}
                        {sidebarOpen && <ExternalLink size={11} className="ml-auto text-blue-400 shrink-0" />}
                    </button>
                ) : (
                    // Active seller with subscription — show portal link
                    <button
                        onClick={() => navigate("/seller-portal")}
                        className={`w-full flex items-center gap-3 px-2 py-2 rounded-sm text-left transition-all ${activeTab === 'seller-dashboard' ? "bg-[#23471d] text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}>
                        <div className="relative shrink-0">
                            <ShoppingBag size={15} />
                        </div>
                        {sidebarOpen && (
                            <span className="text-[11px] font-bold uppercase tracking-wider whitespace-nowrap flex-1">Open Seller Portal</span>
                        )}
                        {sidebarOpen && (
                            <ExternalLink size={12} className="ml-auto opacity-50" />
                        )}
                    </button>
                )}

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
