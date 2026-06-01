import { Building2, FileText, CreditCard, Calendar, FolderOpen, Megaphone, CalendarDays, UsersRound, MessageSquare, Ticket, ShoppingBag, Package, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Sparkle = ({ style, color = '#fff176' }: { style?: React.CSSProperties, color?: string }) => (
    <span
        style={{
            position: 'absolute',
            pointerEvents: 'none',
            fontSize: '12px',
            color: color,
            textShadow: `0 0 8px ${color}, 0 0 16px ${color}, 0 0 24px ${color}`,
            animation: 'sparkleAnim 1.6s ease-in-out infinite',
            opacity: 0,
            zIndex: 20,
            ...style,
        }}
    >
        ✦
    </span>
);

// ─── Quick Access Data ────────────────────────────────────────────────────────

const QUICK_ACCESS = [
    { id: "my-event", label: "My Event", sub: "View event details", icon: Calendar, link: "/exhibitor-dashboard/my-event", iconBg: "bg-gradient-to-br from-[#3b82f6] to-[#2563eb]" },
    { id: "stall-management", label: "Stall Information", sub: "View stall details", icon: Building2, link: "/exhibitor-dashboard/ex-profile", iconBg: "bg-gradient-to-br from-[#3b82f6] to-[#2563eb]" },
    { id: "invoices", label: "Invoice & Receipts", sub: "View & download", icon: FileText, link: "/exhibitor-dashboard/invoices", iconBg: "bg-gradient-to-br from-[#22a96a] to-[#178a52]" },
    { id: "add-on-services", label: "Add On Services", sub: "View & purchase", icon: ShoppingBag, link: "/exhibitor-dashboard/accessories", iconBg: "bg-gradient-to-br from-[#f43f5e] to-[#e11d48]" },
    { id: "exhibitor-pass", label: "Passes & Hospitality", sub: "View & download pass", icon: Ticket, link: "/exhibitor-dashboard/exhibitor-pass", iconBg: "bg-gradient-to-br from-[#10b981] to-[#059669]" },

    { id: "add-product", label: "My Product/Services", sub: "Add your products", icon: Package, link: "/exhibitor-dashboard/product", iconBg: "bg-gradient-to-br from-[#8b5cf6] to-[#6d28d9]" },

    { id: "document-center", label: "MSME Documentation", sub: "Upload & manage", icon: FolderOpen, link: "/exhibitor-dashboard/document-center", iconBg: "bg-gradient-to-br from-[#a855f7] to-[#9333ea]" },
    { id: "buyer-contacts", label: "Buyers Management", sub: "View buyer contacts", icon: UsersRound, link: "/exhibitor-dashboard/buyer-contacts", iconBg: "bg-gradient-to-br from-[#14b8a6] to-[#0d9488]" },


    { id: "payments", label: "Make Payment", sub: "Secure payments", icon: CreditCard, link: "/exhibitor-dashboard/payments", iconBg: "bg-gradient-to-br from-[#f97316] to-[#ea6c0a]" },
    // { id: "documentation", label: "Documentation", sub: "Upload & manage", icon: FolderOpen, link: "/exhibitor-dashboard/documentation", iconBg: "bg-gradient-to-br from-[#a855f7] to-[#9333ea]" },
    { id: "epromotion", label: "E-Promotion", sub: "Promote your brand", icon: Megaphone, link: "/exhibitor-dashboard/epromotion", iconBg: "bg-gradient-to-br from-[#ec4899] to-[#db2777]" },
    // { id: "exhibitions", label: "My Events", sub: "Your schedule", icon: CalendarDays, link: "/exhibitor-dashboard/exhibitions", iconBg: "bg-gradient-to-br from-[#f59e0b] to-[#d97706]" },
    // { id: "bsm", label: "Buyer Connect", sub: "Connect with buyers", icon: UsersRound, link: "/exhibitor-dashboard/bsm", iconBg: "bg-gradient-to-br from-[#14b8a6] to-[#0d9488]" },
    { id: "chat", label: "Chat Support", sub: "Get instant help", icon: MessageSquare, link: "/exhibitor-dashboard/chat", iconBg: "bg-gradient-to-br from-[#3b82f6] to-[#6366f1]" },
];

// ─── Important Updates Data ───────────────────────────────────────────────────

type BadgeType = "New" | "Info" | "Alert";

const UPDATES: { badge: BadgeType; title: string; desc: string; date: string }[] = [
    { badge: "New", title: "Buyer Seller Meet Registrations Open", desc: "Register now to connect with quality buyers.", date: "20 May 2026" },
    { badge: "Info", title: "Last Date for Stall Setup", desc: "Stall setup begins from 19 August 2026.", date: "18 May 2026" },
    { badge: "Alert", title: "Submit Your Documents", desc: "Please complete remaining documents.", date: "15 May 2026" },
];

const BADGE_STYLES: Record<BadgeType, string> = {
    New: "bg-blue-100 text-blue-600 border border-blue-200",
    Info: "bg-amber-100 text-amber-600 border border-amber-200",
    Alert: "bg-red-100 text-red-600 border border-red-200",
};

// ─── Props ────────────────────────────────────────────────────────────────────

interface DashboardWidgetsProps {
    onNavigate?: (tab: string) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function DashboardWidgets({ onNavigate }: DashboardWidgetsProps) {
    return (
        <div className="flex flex-col lg:flex-row items-start gap-2 w-full">

            {/* Quick Access */}
            <div
                className="w-full lg:w-[65%] bg-white rounded-2xl p-2 pb-2"
                style={{ boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}
            >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 px-1 gap-3">
                    <div className="flex items-center gap-2">
                        <span className="text-[12px] font-bold text-[#1a3a7c] uppercase tracking-wider">Quick Access</span>
                        <span className="h-[2px] w-8 bg-gradient-to-r from-[#3b82f6] to-transparent rounded-full" />
                    </div>

                    <div className="flex items-center gap-2 sm:-mt-1.5">
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            <Sparkle style={{ top: '-10px', left: '10%', animationDelay: '0s' }} />
                            <Sparkle style={{ bottom: '-10px', right: '20%', animationDelay: '0.4s' }} />
                            <Link
                                to="/buyer-registration"
                                className="golden-btn-hero group rounded-md px-2 py-1.5 text-[#0b2912] transition-all duration-500 uppercase tracking-wider text-[8px] font-black flex items-center justify-center shrink-0 shadow-sm border border-transparent"
                            >
                                <span className="relative z-10 flex items-center gap-1">
                                    Buyer Registration
                                    <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform duration-300" />
                                </span>
                            </Link>
                        </div>

                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            <Sparkle color="#3b82f6" style={{ top: '-10px', left: '20%', animationDelay: '0.2s' }} />
                            <Sparkle color="#3b82f6" style={{ bottom: '-10px', right: '15%', animationDelay: '0.6s' }} />
                            <Link
                                to="/delegates-registration"
                                className="group relative overflow-hidden rounded-md px-2 py-1.5 bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 transition-all duration-500 uppercase tracking-wider text-[8px] font-bold shadow-[0_4px_10px_rgba(59,130,246,0.3)] hover:shadow-[0_6px_15px_rgba(59,130,246,0.4)] flex items-center justify-center shrink-0 border border-blue-400/30"
                            >
                                <span className="relative z-10 flex items-center gap-1">
                                    Delegates Registration
                                    <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform duration-300" />
                                </span>
                                <span className="absolute inset-0 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5 -mt-1.5">
                    {QUICK_ACCESS.map(item => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.id}
                                to={item.link}
                                style={{ boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}
                                className="flex items-center gap-1.5 py-1.5 pl-1.5 pr-2 rounded-xl hover:bg-gray-50 transition-all group text-left"
                            >
                                <div className={`${item.iconBg} rounded-xl p-2 shrink-0 shadow-sm group-hover:scale-105 transition-transform`}>
                                    <Icon size={14} className="text-white" strokeWidth={1.8} />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[10px] font-bold text-[#403c9e] leading-tight whitespace-nowrap tracking-tight">{item.label}</p>
                                    <p className="text-[8px] text-[#1a3a7c] mt-0.5 whitespace-nowrap tracking-tight">{item.sub}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Important Updates */}
            <div
                className="w-full lg:w-[35%] shrink-0 bg-white rounded-2xl p-2 pb-2"
                style={{ boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}
            >
                <div className="flex items-center justify-between mb-2 px-2">
                    <div className="flex items-center gap-2">
                        <span className="text-[12px] font-bold text-[#1a3a7c] uppercase tracking-wider">Important Updates</span>
                        <span className="h-[2px] w-8 bg-gradient-to-r from-[#3b82f6] to-transparent rounded-full" />
                    </div>
                    <button className="text-[10px] font-semibold text-blue-500 hover:text-blue-700 transition-colors">View All</button>
                </div>

                <div className="space-y-2">
                    {UPDATES.map((u, i) => (
                        <div key={i} className="flex items-start gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors" style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px" }}>
                            <span className={`w-[34px] text-center text-[9px] font-semibold px-1 py-0.5 rounded-md shrink-0 mt-0.5 ${BADGE_STYLES[u.badge]}`}>
                                {u.badge}
                            </span>
                            <div className="flex-1 min-w-0 ">
                                <div className="flex items-center justify-between gap-1 mb-1">
                                    <p className="text-[10px] font-semibold text-[#1a3a7c] leading-tight whitespace-nowrap tracking-tight">{u.title}</p>
                                    <span className="text-[8px] text-black shrink-0 whitespace-nowrap">{u.date}</span>
                                </div>
                                <p className="text-[8px] text-[#1a3a7c] mt-0.5">{u.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}