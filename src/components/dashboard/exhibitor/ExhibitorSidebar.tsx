import { useState, useEffect } from "react";
import {
    LayoutDashboard, User, FileText, Building2, Headphones,
    ArrowRight, Award, Package, MessageSquare, ChevronDown,
    ChevronRight, Megaphone, CalendarCheck, FolderOpen,
    CreditCard, Store, ShoppingBag, Send, ExternalLink,
    Star, UsersRound, Facebook, Instagram, Youtube, Linkedin, Twitter, Phone, MessageCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { socialMediaApi, analyticsApi, API_URL } from "@/lib/api";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavItem {
    id: string;
    label: string;
    icon: React.ElementType;
    isNew?: boolean;
}

interface MsmeLeafItem { id: string; label: string }
interface MsmeNestedGroup { id: string; label: string; isDropdown: true; subItems: MsmeLeafItem[] }
interface MsmeGroup { id: string; label: string; isDropdown: true; subItems: (MsmeNestedGroup | MsmeLeafItem)[] }
type MsmeItem = MsmeLeafItem | MsmeGroup;

interface SidebarProps {
    data: any;
    activeTab: string;
    setActiveTab: (tab: string) => void;
    sidebarOpen: boolean;
    onChangePwd: () => void;
    unreadChat?: number;
}

// ─── Static nav data ──────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "my-event", label: "My Event", icon: CalendarCheck },
    { id: "stall-management", label: "Stall Information", icon: Building2 },
    { id: "invoices", label: "Invoice & Receipts", icon: FileText },
    { id: "accessories", label: "Add On Services", icon: ShoppingBag },
    { id: "exhibitor-pass", label: "Passes & Hospitality", icon: Package },
    { id: "product", label: "My Product/Services", icon: Package },
    { id: "documentation", label: "Documentations", icon: FolderOpen },
    ...(import.meta.env.DEV ? [{ id: "bsm", label: "Buyers Management", icon: UsersRound }] : []),
    { id: "payments", label: "Make Payment", icon: CreditCard },
    ...(import.meta.env.DEV ? [{ id: "epromotion", label: "E-Promotion", icon: Megaphone }] : []),
    { id: "feedback", label: "Feedback", icon: MessageSquare },
    { id: "chat", label: "Customer Care", icon: MessageSquare },
];

const PSM_REPORT_IDS = [
    "annexure_c", "annexure_d", "declaration", "feedback_report",
    "undertaking", "pre_receipt", "mandate_form", "pfms_details",
    "covering_letter", "narrative_feedback",
];

const MSME_ITEMS: MsmeItem[] = [
    { id: "msme", label: "Udyam Details" },
    {
        id: "psm_claim", label: "PSM Claim", isDropdown: true,
        subItems: [
            {
                id: "psm_reports", label: "Reports", isDropdown: true,
                subItems: PSM_REPORT_IDS.map(id => ({
                    id,
                    label: id.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
                })),
            },
            {
                id: "psm_reports_table", label: "Reports Table", isDropdown: true,
                subItems: PSM_REPORT_IDS.map(id => ({
                    id: `${id}_table`,
                    label: id.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
                })),
            },
        ],
    },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getAllMsmeIds(items: MsmeItem[]): string[] {
    return items.flatMap(item => {
        const base = [item.id];
        if ("subItems" in item) base.push(...getAllMsmeIds(item.subItems as MsmeItem[]));
        return base;
    });
}

const ALL_MSME_IDS = getAllMsmeIds(MSME_ITEMS);

function cx(...classes: (string | false | undefined)[]) {
    return classes.filter(Boolean).join(" ");
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Collapse({ open, children }: { open: boolean; children: React.ReactNode }) {
    return (
        <AnimatePresence initial={false}>
            {open && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: "easeInOut" }}
                    className="overflow-hidden"
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function MsmeNode({
    item, depth = 0, activeTab, setActiveTab, expandedGroups, toggleGroup,
}: {
    item: MsmeItem;
    depth?: number;
    activeTab: string;
    setActiveTab: (id: string) => void;
    expandedGroups: string[];
    toggleGroup: (id: string) => void;
}) {
    const isGroup = "subItems" in item;
    const isActive = activeTab === item.id;

    if (!isGroup) {
        return (
            <button
                onClick={() => {
                    setActiveTab(item.id);
                }}
                className={cx(
                    "w-full flex items-center gap-2 px-2 py-2 rounded-sm text-left transition-all relative group",
                    isActive ? "bg-emerald-500/20 text-emerald-400" : "text-white/60 hover:bg-white/8 hover:text-white"
                )}
            >
                <span className={cx(
                    "absolute -left-[13px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-all duration-300 ring-2 ring-[#061d49]",
                    isActive ? "bg-emerald-400 scale-100" : "bg-slate-500 scale-0 group-hover:scale-100"
                )} />
                <span className={cx("whitespace-nowrap text-xs uppercase tracking-wide", isActive ? "font-bold" : "font-medium")}>
                    {item.label}
                </span>
                {isActive && <ChevronRight size={10} className="ml-auto" />}
            </button>
        );
    }

    const group = item as MsmeGroup;
    const isOpen = expandedGroups.includes(group.id);
    const isGroupActive = activeTab === group.id || getAllMsmeIds(group.subItems as MsmeItem[]).includes(activeTab);
    const ChevronIcon = isOpen ? ChevronDown : ChevronRight;
    const iconSize = depth === 0 ? 12 : 10;

    return (
        <div className="flex flex-col w-full">
            <button
                onClick={() => toggleGroup(group.id)}
                className={cx(
                    "w-full flex items-center gap-2 px-2 py-2 rounded-sm text-left transition-all relative group",
                    isGroupActive ? "bg-emerald-500/20 text-emerald-400" : "text-white/60 hover:bg-white/8 hover:text-white"
                )}
            >
                <span className={cx(
                    "absolute -left-[13px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-all duration-300 ring-2 ring-[#061d49]",
                    isGroupActive ? "bg-emerald-400 scale-100" : "bg-slate-500 scale-0 group-hover:scale-100"
                )} />
                <span className={cx("flex-1 whitespace-nowrap text-xs uppercase tracking-wide", isGroupActive ? "font-bold" : "font-semibold")}>
                    {group.label}
                </span>
                <ChevronIcon size={iconSize} className="shrink-0" />
            </button>

            <Collapse open={isOpen}>
                <div className="mt-1 mb-1 ml-[8px] border-l border-white/20 pl-2 space-y-0.5">
                    {group.subItems.map(child => (
                        <MsmeNode
                            key={child.id}
                            item={child as MsmeItem}
                            depth={depth + 1}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            expandedGroups={expandedGroups}
                            toggleGroup={toggleGroup}
                        />
                    ))}
                </div>
            </Collapse>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ExhibitorSidebar({
    data, activeTab, setActiveTab, sidebarOpen, onChangePwd, unreadChat = 0,
}: SidebarProps) {
    const navigate = useNavigate();
    const isSeller = data?.isSeller || false;
    const isSubscribed = data?.sellerSubscription?.status === "active";
    const sellerStatus = data?.sellerStatus;

    const isMsmeActive = ALL_MSME_IDS.includes(activeTab);

    const [msmeOpen, setMsmeOpen] = useState(isMsmeActive);
    const [expandedGroups, setExpandedGroups] = useState<string[]>(() => {
        const init: string[] = [];
        if (isMsmeActive) init.push("psm_claim");
        // find which nested group contains activeTab
        const psmGroup = MSME_ITEMS.find(i => i.id === "psm_claim") as MsmeGroup | undefined;
        if (psmGroup) {
            const parent = psmGroup.subItems.find(s => "subItems" in s && getAllMsmeIds((s as MsmeGroup).subItems as MsmeItem[]).includes(activeTab)) as MsmeGroup | undefined;
            if (parent) init.push(parent.id);
        }
        return init;
    });

    const [socialVisible, setSocialVisible] = useState(false);
    const [socialLinks, setSocialLinks] = useState({
        facebook: "https://www.facebook.com/namogangewellness.event",
        instagram: "https://instagram.com",
        twitter: "https://twitter.com",
        youtube: "https://youtube.com",
        linkedin: "https://linkedin.com",
    });

    useEffect(() => {
        const timer = setTimeout(() => setSocialVisible(true), 100);
        const fetchSocialLinks = async () => {
            try {
                const data = await socialMediaApi.get();
                if (data) {
                    setSocialLinks({
                        facebook: data.facebook || "https://www.facebook.com/namogangewellness.event",
                        instagram: data.instagram || "https://instagram.com",
                        twitter: data.twitter || "https://twitter.com",
                        youtube: data.youtube || "https://youtube.com",
                        linkedin: data.linkedin || "https://linkedin.com",
                    });
                }
            } catch (error) {
                console.error("Error fetching social links:", error);
            }
        };
        fetchSocialLinks();

        return () => clearTimeout(timer);
    }, []);

    const [rmPhone, setRmPhone] = useState<string | null>(null);
    useEffect(() => {
        const rmName = data?.spokenWith || data?.referredBy || null;
        if (!rmName) return;
        fetch(`${API_URL}/admin/by-username/${encodeURIComponent(rmName)}`)
            .then(r => r.json())
            .then(res => {
                if (res.success && res.data) {
                    setRmPhone(res.data.mobile || res.data.altMobile || null);
                }
            })
            .catch(() => { });
    }, [data]);

    const toggleGroup = (id: string) =>
        setExpandedGroups(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

    const handleMsmeToggle = () => {
        if (!sidebarOpen) { setActiveTab("msme"); return; }
        setMsmeOpen(p => !p);
    };

    // Seller section variants
    const sellerSection = (() => {
        const btnBase = "w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-all";
        if (!isSeller) return (
            <button onClick={() => setActiveTab("become-seller")} className={cx(btnBase, activeTab === "become-seller" ? "bg-gradient-to-r from-[#095b55] to-[#08775e] text-white" : "text-white/88 hover:bg-white/8 hover:text-white")}>
                <Store size={sidebarOpen ? 16 : 15} className="text-white shrink-0" />
                {sidebarOpen && <span className="text-sm font-semibold text-white flex-1 whitespace-nowrap">Become a Seller</span>}
            </button>
        );
        if (sellerStatus === "pending") return (
            <div className={cx("w-full flex items-center gap-3 px-3 py-3 rounded-lg", sidebarOpen && "bg-amber-50 border border-amber-200")}>
                <Store size={15} className="text-amber-500 shrink-0" />
                {sidebarOpen && <div className="flex-1 min-w-0"><span className="text-[10px] font-black uppercase tracking-wider text-amber-700 block">Seller: Pending</span><span className="text-[9px] text-amber-600 block">Awaiting admin approval</span></div>}
            </div>
        );
        if (sellerStatus === "active" && !isSubscribed) return (
            <button onClick={() => navigate("/seller-portal")} className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-all">
                <Store size={15} className="text-blue-600 shrink-0" />
                {sidebarOpen && <><div className="flex-1 min-w-0"><span className="text-[10px] font-black uppercase tracking-wider text-blue-700 block">Seller Approved!</span><span className="text-[9px] text-blue-600 block">Buy a plan to activate</span></div><ExternalLink size={11} className="text-blue-400 shrink-0" /></>}
            </button>
        );
        return (
            <button onClick={() => navigate("/seller-portal")} className={cx(btnBase, activeTab === "seller-dashboard" ? "bg-[#23471d] text-white" : "text-white/88 hover:bg-white/8 hover:text-white")}>
                <ShoppingBag size={15} className="shrink-0" />
                {sidebarOpen && <><span className="text-[11px] font-bold uppercase tracking-wider flex-1 whitespace-nowrap">Open Seller Portal</span><ExternalLink size={12} className="opacity-50" /></>}
            </button>
        );
    })();

    const rawPhone = rmPhone || data?.admin?.phone || data?.vendorDetails?.phone || "1234567890";
    const cleanPhone = rawPhone.replace(/\D/g, '');
    const callUrl = `tel:${cleanPhone.startsWith('91') ? cleanPhone : '+91' + cleanPhone}`;
    
    const personName = `${data?.contact1?.firstName || ''} ${data?.contact1?.lastName || ''}`.trim() || 'Exhibitor';
    const companyName = data?.exhibitorName || '—';
    const regId = data?.registrationId || '—';
    const msg = `Hi, I am ${personName} from ${companyName}. My Exhibitor ID is ${regId}. I have a query regarding IHWE 2026: `;
    const whatsappUrl = `https://wa.me/${cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone}?text=${encodeURIComponent(msg)}`;

    const socialData = [
        { icon: Facebook, url: socialLinks.facebook, color: "#1877F2", label: "Facebook" },
        { icon: Instagram, url: socialLinks.instagram, color: "#E4405F", label: "Instagram" },
        { icon: Twitter, url: socialLinks.twitter, color: "#000000", label: "Twitter" },
        { icon: Youtube, url: socialLinks.youtube, color: "#FF0000", label: "YouTube" },
        { icon: Linkedin, url: socialLinks.linkedin, color: "#0A66C2", label: "LinkedIn" },
        { icon: MessageCircle, url: whatsappUrl, color: "#25D366", label: "WhatsApp" },
        { icon: Phone, url: callUrl, color: "#3b82f6", label: "Call Us" },
    ];

    return (
        <aside className={cx(
            "fixed top-0 left-0 bottom-0 z-[110] lg:z-50 flex flex-col transition-all duration-300 overflow-hidden print:hidden",
            sidebarOpen ? "translate-x-0 w-56" : "-translate-x-full lg:translate-x-0 lg:w-[72px]"
        )} style={{ fontFamily: '"Inter", sans-serif' }}>
            {/* Backgrounds */}
            <div className="absolute inset-0 bg-[#061d49]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,112,255,0.15),transparent_50%),linear-gradient(180deg,#08204d_0%,#031b47_58%,#06306b_100%)]" />
            {/* <div className="absolute inset-x-0 bottom-0 h-44 opacity-55 bg-[linear-gradient(180deg,transparent,#06d6a0_180%),repeating-linear-gradient(90deg,transparent_0_18px,rgba(41,208,255,.28)_19px_20px)]" /> */}
            <div className="absolute inset-x-0 bottom-0 h-52 opacity-55 pointer-events-none">
                <img loading="lazy" decoding="async" src="/exhibition/1.png" alt="" className="w-full h-full object-cover object-bottom" />
            </div>
            {/* Logo */}
            <div className="relative z-10 flex pt-2 pb-2 items-center justify-center px-4 mb-2 border-b border-white/10">
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    {/* Soft white glowing aura behind the logo for readability */}
                    <div className="w-[120px] h-[40px] bg-white/60 rounded-full blur-2xl" />
                </div>
                <img loading="lazy" decoding="async" src="/logo.png" 
                    alt="IHWE 2026" 
                    className="relative h-[60px] w-full object-contain" 
                    style={{ filter: "drop-shadow(0px 0px 15px rgba(255,255,255,0.8)) drop-shadow(0px 0px 4px rgba(255,255,255,1))" }}
                />
            </div>


            <nav className="relative z-10 flex-1 space-y-1 px-3 pt-1 mt-1 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/30">
                {/* Main nav */}
                {NAV_ITEMS.map(item => {
                    const Icon = item.icon;
                    const active = activeTab === item.id;
                    const isChat = item.id === "chat";
                    return (
                        <button key={item.id} onClick={() => {
                            setActiveTab(item.id);
                        }}
                            className={cx("w-full flex items-center gap-4 px-3 py-1.5 rounded-lg text-left transition-all", active ? "bg-gradient-to-r from-[#095b55] to-[#08775e] text-white" : "text-white/88 hover:bg-white/8 hover:text-white")}
                        >
                            <div className="relative shrink-0">
                                <Icon size={sidebarOpen ? 16 : 15} strokeWidth={2.1} className="text-white" />
                                {isChat && unreadChat > 0 && (
                                    <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-[#d26019] rounded-full text-[8px] font-medium text-white flex items-center justify-center">
                                        {unreadChat > 9 ? "9+" : unreadChat}
                                    </span>
                                )}
                            </div>
                            {sidebarOpen && <span className="text-sm font-medium text-white whitespace-nowrap flex-1">{item.label}</span>}
                            {sidebarOpen && item.isNew && <span className="rounded-md bg-emerald-500/90 px-2 py-0.5 text-[11px] font-bold text-white shadow">New</span>}
                            {sidebarOpen && isChat && unreadChat > 0 && !active && (
                                <span className="bg-[#d26019] text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">{unreadChat}</span>
                            )}
                        </button>
                    );
                })}

                {/* Seller section */}
                {sellerSection}

                {/* MSME dropdown */}
                {import.meta.env.DEV && (
                    <div>
                        <button onClick={handleMsmeToggle}
                            className={cx("w-full flex items-center gap-4 px-3 py-1.5 rounded-lg text-left transition-all", isMsmeActive ? "bg-gradient-to-r from-[#095b55] to-[#08775e] text-white" : "text-white/88 hover:bg-white/8 hover:text-white")}
                        >
                            <Award size={sidebarOpen ? 16 : 15} className="text-white shrink-0" />
                            {sidebarOpen && <span className="text-sm font-medium text-white flex-1 whitespace-nowrap">MSME</span>}
                            {sidebarOpen && <ChevronDown size={12} className={cx("ml-auto transition-transform duration-200", msmeOpen && "rotate-180")} />}
                        </button>

                        <Collapse open={sidebarOpen && msmeOpen}>
                            <div className="mt-1 mb-1 ml-[17px] border-l-2 border-white/20 pl-2 space-y-1">
                                {MSME_ITEMS.map(item => (
                                    <MsmeNode
                                        key={item.id}
                                        item={item}
                                        depth={0}
                                        activeTab={activeTab}
                                        setActiveTab={setActiveTab}
                                        expandedGroups={expandedGroups}
                                        toggleGroup={toggleGroup}
                                    />
                                ))}
                            </div>
                        </Collapse>
                    </div>
                )}
            </nav>

            {/* Social Icons at the bottom */}
            {socialVisible && (
                <>
                    <style>{`
                        @keyframes iconSpin { from { transform: rotate(0deg) scale(1); } to { transform: rotate(360deg) scale(1.1); } }
                        @keyframes buttonShake {
                            0%, 100% { transform: rotate(0deg) scale(1.1); }
                            25% { transform: rotate(-10deg) scale(1.1); }
                            50% { transform: rotate(10deg) scale(1.1); }
                            75% { transform: rotate(-10deg) scale(1.1); }
                        }
                        .social-icon-btn { position: relative; transition: all 0.3s; }
                        .social-icon-btn:hover { animation: buttonShake 0.5s ease-in-out; transform: scale(1.1); }
                        .social-icon-btn:active { transform: scale(0.9); }
                        .social-icon-wrapper { transition: all 0.2s; }
                        .social-icon-btn:hover .social-icon-wrapper { animation: iconSpin 0.6s ease-in-out; }
                        
                        .social-glow {
                            position: absolute; inset: 0; border-radius: 9999px; filter: blur(8px);
                            opacity: 0; transition: opacity 0.3s; z-index: -1;
                        }
                        .social-icon-btn:hover .social-glow { opacity: 0.8; animation: pulse 2s ease-in-out infinite; }
                    `}</style>
                    <div className={cx("relative z-10 border-t border-white/10 mt-auto shrink-0 transition-all duration-300", sidebarOpen ? "py-4 px-2" : "py-3 px-1")}>
                        <div className={cx("flex items-center flex-wrap", sidebarOpen ? "justify-center gap-3" : "flex-col gap-3")}>
                            {socialData.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <a 
                                        key={index}
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-icon-btn flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-md border border-white/10"
                                        title={item.label}
                                        onClick={() => analyticsApi.logClick(`Social Sidebar: ${item.label}`)}
                                    >
                                        <div className="social-glow" style={{ backgroundColor: item.color }} />
                                        <div className="social-icon-wrapper flex items-center justify-center" style={{ color: item.color }}>
                                            <Icon size={sidebarOpen ? 18 : 16} strokeWidth={2.5} />
                                        </div>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </>
            )}
        </aside>
    );
}
