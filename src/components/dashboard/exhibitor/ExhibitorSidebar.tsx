import { useState, useEffect } from "react";
import {
    LayoutDashboard, User, FileText, Building2, Headphones,
    ArrowRight, Award, Package, MessageSquare, ChevronDown,
    ChevronRight, Megaphone, CalendarCheck, FolderOpen,
    CreditCard, Store, ShoppingBag, Send, ExternalLink,
    Star, UsersRound, Facebook, Instagram, Youtube, Linkedin, Twitter
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { socialMediaApi, analyticsApi } from "@/lib/api";

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
    { id: "stall-management", label: "Stall Information", icon: Building2 },
    { id: "accessories", label: "Add On Services", icon: ShoppingBag },
    { id: "exhibitor-pass", label: "Exhibitor Pass", icon: Package },
    { id: "invoices", label: "Invoice & Receipts", icon: FileText },
    { id: "payments", label: "Make Payment", icon: CreditCard },
    { id: "documentation", label: "Documentation", icon: FolderOpen },
    { id: "epromotion", label: "E-Promotion", icon: Star },
    { id: "exhibitions", label: "My Events", icon: Star },
    { id: "bsm", label: "Buyer Connect", icon: UsersRound, isNew: true },
    { id: "feedback", label: "Feedback", icon: MessageSquare },
    { id: "chat", label: "Chat Support", icon: MessageSquare },
    { id: "product", label: "Product and Services", icon: MessageSquare },
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
                onClick={() => setActiveTab(item.id)}
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

    const socialData = [
        { icon: Facebook, url: socialLinks.facebook, color: "#1877F2", label: "Facebook" },
        { icon: Instagram, url: socialLinks.instagram, color: "#E4405F", label: "Instagram" },
        { icon: Twitter, url: socialLinks.twitter, color: "#000000", label: "Twitter" },
        { icon: Youtube, url: socialLinks.youtube, color: "#FF0000", label: "YouTube" },
        { icon: Linkedin, url: socialLinks.linkedin, color: "#0A66C2", label: "LinkedIn" },
    ];

    return (
        <aside className={cx("fixed top-0 left-0 bottom-0 z-50 flex flex-col transition-all duration-300 overflow-hidden print:hidden", sidebarOpen ? "w-56" : "w-[72px]")}>
            {/* Backgrounds */}
            <div className="absolute inset-0 bg-[#061d49]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_88%,rgba(21,220,173,0.36),transparent_26%),radial-gradient(circle_at_78%_8%,rgba(37,112,255,0.22),transparent_24%),linear-gradient(180deg,#08204d_0%,#031b47_58%,#06306b_100%)]" />
            {/* <div className="absolute inset-x-0 bottom-0 h-44 opacity-55 bg-[linear-gradient(180deg,transparent,#06d6a0_180%),repeating-linear-gradient(90deg,transparent_0_18px,rgba(41,208,255,.28)_19px_20px)]" /> */}
            <div className="absolute inset-x-0 bottom-8 h-52 opacity-55">
                <img src="/exhibition/1.png" alt="" />
            </div>
            {/* Logo */}
            <div className="relative z-10 flex py-2 items-center justify-center px-4">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-16 bg-white/90 rounded-full blur-md" />
                </div>
                <img src="/logo.png" alt="IHWE 2026" className="relative h-[70px] w-full object-contain drop-shadow-[0_0_40px_rgba(255,255,255,1)]" />
            </div>


            <nav className="relative z-10 flex-1 space-y-1 px-3 pt-1 mt-1 overflow-y-auto">
                {/* Main nav */}
                {NAV_ITEMS.map(item => {
                    const Icon = item.icon;
                    const active = activeTab === item.id;
                    const isChat = item.id === "chat";
                    return (
                        <button key={item.id} onClick={() => setActiveTab(item.id)}
                            className={cx("w-full flex items-center gap-4 px-3 py-1.5    rounded-lg text-left transition-all", active ? "bg-gradient-to-r from-[#095b55] to-[#08775e] text-white shadow-[0_0_0_1px_rgba(90,255,203,0.45),0_12px_28px_rgba(0,0,0,0.28)]" : "text-white/88 hover:bg-white/8 hover:text-white")}
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
                <div>
                    <button onClick={handleMsmeToggle}
                        className={cx("w-full flex items-center gap-4 px-3 py-1.5 rounded-lg text-left transition-all", isMsmeActive ? "bg-gradient-to-r from-[#095b55] to-[#08775e] text-white shadow-[0_0_0_1px_rgba(90,255,203,0.45),0_12px_28px_rgba(0,0,0,0.28)]" : "text-white/88 hover:bg-white/8 hover:text-white")}
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
            </nav>

            {/* Social Icons Section */}
            <div className={cx("relative z-10 px-4 py-2 border-t border-white/10 mt-auto transition-all duration-300", sidebarOpen ? "block" : "hidden")}>
                {/* <div className="text-[9px] font-bold text-white/50 uppercase tracking-widest text-center mb-3">
                    Follow Us
                </div> */}
                {/* Max-w forces exactly 3 items per row naturally */}
                <div className="flex flex-wrap justify-center gap-3 w-full max-w-[140px] mx-auto">
                    {socialData.map((social, index) => {
                        const Icon = social.icon;
                        return (
                            <div key={index} className={`ex-social-item relative ${socialVisible ? "visible" : ""}`} style={{ "--index": index } as React.CSSProperties}>
                                <div className="ex-glow-effect" style={{ backgroundColor: social.color }} />
                                <div className="ex-ripple-effect" style={{ borderColor: social.color }} />

                                <a href={social.url} target="_blank" rel="noopener noreferrer" className="ex-social-button" style={{ borderColor: social.color }} onClick={() => analyticsApi.logClick(`Social: ${social.label}`)}>
                                    <div className="ex-icon-wrapper">
                                        <Icon className="w-[14px] h-[14px]" style={{ color: social.color }} />
                                    </div>
                                    <div className="ex-shine-effect" />
                                </a>

                                <div className="ex-tooltip">
                                    <div className="ex-tooltip-content" style={{ backgroundColor: social.color }}>
                                        {social.label}
                                        <div className="ex-tooltip-arrow" style={{ borderTopColor: social.color }}></div>
                                    </div>
                                </div>

                                <div className="ex-particle" style={{ backgroundColor: social.color, "--x": "20px", "--y": "0px" } as React.CSSProperties} />
                                <div className="ex-particle" style={{ backgroundColor: social.color, "--x": "-10px", "--y": "18px" } as React.CSSProperties} />
                                <div className="ex-particle" style={{ backgroundColor: social.color, "--x": "-10px", "--y": "-18px" } as React.CSSProperties} />
                            </div>
                        );
                    })}
                </div>
            </div>

            <style>{`
                @keyframes exFallIn { from { transform: translateY(30px) rotate(-180deg) scale(0.3); opacity: 0; } to { transform: translateY(0) rotate(0deg) scale(1); opacity: 1; } }
                @keyframes exPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.2); } }
                @keyframes exRipple { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(1.5); opacity: 0; } }
                @keyframes exIconSpin { from { transform: rotate(0deg) scale(1); } to { transform: rotate(360deg) scale(1.1); } }
                @keyframes exButtonShake { 0%, 100% { transform: rotate(0deg) scale(1.1); } 25% { transform: rotate(-10deg) scale(1.1); } 50% { transform: rotate(10deg) scale(1.1); } 75% { transform: rotate(-10deg) scale(1.1); } }
                @keyframes exShine { 0% { left: -100%; } 100% { left: 200%; } }
                @keyframes exTooltipBounce { 0%, 100% { transform: translateX(-50%) translateY(0) scale(1); } 50% { transform: translateX(-50%) translateY(-3px) scale(1.05); } }
                @keyframes exParticle { 0% { transform: translate(-50%, -50%) scale(0); opacity: 0; } 50% { opacity: 0.8; } 100% { transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y))) scale(1.5); opacity: 0; } }

                .ex-social-item { animation: exFallIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; animation-delay: calc(var(--index) * 0.12s + 0.2s); opacity: 0; }
                .ex-social-item.visible { opacity: 1; }
                .ex-glow-effect { position: absolute; inset: 0; border-radius: 9999px; filter: blur(8px); opacity: 0; transition: opacity 0.3s; }
                .ex-social-item:hover .ex-glow-effect { opacity: 0.6; animation: exPulse 2s ease-in-out infinite; }
                .ex-ripple-effect { position: absolute; inset: 0; border-radius: 9999px; border: 2px solid; opacity: 0; }
                .ex-social-item:hover .ex-ripple-effect { animation: exRipple 1.5s ease-out infinite; }
                .ex-social-button { position: relative; display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; background: white; border-radius: 9999px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); border: 2px solid; transition: all 0.3s; overflow: hidden; }
                .ex-social-button:hover { animation: exButtonShake 0.5s ease-in-out; transform: scale(1.1); }
                .ex-social-button:active { transform: scale(0.9); }
                .ex-icon-wrapper { transition: all 0.2s; }
                .ex-social-item:hover .ex-icon-wrapper { animation: exIconSpin 0.6s ease-in-out; }
                .ex-shine-effect { position: absolute; top: 0; left: -100%; width: 50%; height: 100%; background: linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent); transform: rotate(45deg); opacity: 0; }
                .ex-social-item:hover .ex-shine-effect { opacity: 1; animation: exShine 0.6s ease-in-out infinite; animation-delay: 0.5s; }
                .ex-tooltip { position: absolute; bottom: 100%; left: 50%; margin-bottom: 8px; transform: translateX(-50%) translateY(10px) scale(0.8); opacity: 0; pointer-events: none; transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); white-space: nowrap; z-index: 60; }
                .ex-social-item:hover .ex-tooltip { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); animation: exTooltipBounce 0.8s ease-in-out infinite; }
                .ex-tooltip-content { padding: 5px 10px; border-radius: 6px; color: white; font-size: 10px; font-weight: bold; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); position: relative; }
                .ex-tooltip-arrow { position: absolute; top: 100%; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 5px solid; }
                .ex-particle { position: absolute; width: 4px; height: 4px; border-radius: 9999px; pointer-events: none; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0; }
                .ex-social-item:hover .ex-particle { animation: exParticle 1s ease-out infinite; }
                .ex-particle:nth-child(1) { animation-delay: 0s; }
                .ex-particle:nth-child(2) { animation-delay: 0.1s; }
                .ex-particle:nth-child(3) { animation-delay: 0.2s; }
            `}</style>
        </aside>
    );
}