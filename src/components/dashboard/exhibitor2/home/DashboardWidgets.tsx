import { Building2, FileText, CreditCard, Calendar, FolderOpen, Megaphone, CalendarDays, UsersRound, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import Hero from "@/assets/exhibitor/myeventhero2.png";

// ─── Quick Access Data ────────────────────────────────────────────────────────

const QUICK_ACCESS = [
    { id: "my-event", label: "My Event", sub: "View event details", icon: Calendar, link: "/exhibitor-dashboard/my-event", iconBg: "bg-gradient-to-br from-[#3b82f6] to-[#2563eb]" },
    { id: "document-center", label: "Document Center", sub: "Upload & manage", icon: FolderOpen, link: "/exhibitor-dashboard/document-center", iconBg: "bg-gradient-to-br from-[#a855f7] to-[#9333ea]" },
    { id: "stall-management", label: "Stall Information", sub: "View stall details", icon: Building2, link: "/exhibitor-dashboard/ex-profile", iconBg: "bg-gradient-to-br from-[#3b82f6] to-[#2563eb]" },
    { id: "invoices", label: "Invoice & Receipts", sub: "View & download", icon: FileText, link: "/exhibitor-dashboard/finances", iconBg: "bg-gradient-to-br from-[#22a96a] to-[#178a52]" },
    { id: "payments", label: "Make Payment", sub: "Secure payments", icon: CreditCard, link: "/exhibitor-dashboard/payments", iconBg: "bg-gradient-to-br from-[#f97316] to-[#ea6c0a]" },
    { id: "documentation", label: "Documentation", sub: "Upload & manage", icon: FolderOpen, link: "/exhibitor-dashboard/documentation", iconBg: "bg-gradient-to-br from-[#a855f7] to-[#9333ea]" },
    { id: "epromotion", label: "E-Promotion", sub: "Promote your brand", icon: Megaphone, link: "/exhibitor-dashboard/epromotion", iconBg: "bg-gradient-to-br from-[#ec4899] to-[#db2777]" },
    { id: "exhibitions", label: "My Events", sub: "Your schedule", icon: CalendarDays, link: "/exhibitor-dashboard/exhibitions", iconBg: "bg-gradient-to-br from-[#f59e0b] to-[#d97706]" },
    { id: "bsm", label: "Buyer Connect", sub: "Connect with buyers", icon: UsersRound, link: "/exhibitor-dashboard/bsm", iconBg: "bg-gradient-to-br from-[#14b8a6] to-[#0d9488]" },
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
        <div className="flex flex-row gap-2 w-full">

            {/* Quick Access */}
            <div className="w-[65%] bg-white rounded-2xl border border-gray-100 shadow-sm p-2">
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm font-bold text-[#1a3a7c] uppercase tracking-wider">Quick Access</span>
                    <span className="h-[2px] w-8 bg-gradient-to-r from-[#3b82f6] to-transparent rounded-full" />
                </div>

                <div className="grid grid-cols-4 gap-1.5">
                    {QUICK_ACCESS.map(item => {
                        const Icon = item.icon;
                        return (
                            <Link
                                to={item.link}
                                className="flex items-center gap-3 py-3 px-2 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all group text-left"
                            >
                                <div className={`${item.iconBg} rounded-xl p-2.5 shrink-0 shadow-sm group-hover:scale-105 transition-transform`}>
                                    <Icon size={14} className="text-white" strokeWidth={1.8} />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[12px] font-semibold text-[#1a3a7c] leading-tight truncate">{item.label}</p>
                                    <p className="text-[11px] text-[#1a3a7c] mt-0.5 truncate">{item.sub}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Important Updates */}
            <div className="w-[35%]  shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-2">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#1a3a7c] uppercase tracking-wider">Important Updates</span>
                        <span className="h-[2px] w-8 bg-gradient-to-r from-[#3b82f6] to-transparent rounded-full" />
                    </div>
                    <button className="text-[12px] font-semibold text-blue-500 hover:text-blue-700 transition-colors">View All</button>
                </div>

                <div className="space-y-2.5">
                    {UPDATES.map((u, i) => (
                        <div key={i} className="flex items-start gap-3">
                            <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-md shrink-0 mt-0.5 ${BADGE_STYLES[u.badge]}`}>
                                {u.badge}
                            </span>
                            <div className="flex-1 min-w-0 ">
                                <div className="flex items-start justify-between gap-8">
                                    <p className="text-xs font-semibold text-[#1a3a7c] leading-tight">{u.title}</p>
                                    <span className="text-[11px] text-gray-500 shrink-0 whitespace-nowrap">{u.date}</span>
                                </div>
                                <p className="text-[11px] text-[#1a3a7c] mt-0.5 ">{u.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}