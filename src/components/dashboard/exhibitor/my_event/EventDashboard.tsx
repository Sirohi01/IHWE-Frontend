import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Store, FileText, CreditCard, ShoppingBag, Users, Ticket, Handshake } from "lucide-react";

type MyEventDashboardProps = {
    data: any;
    accessoryOrders?: any[];
    passRequests?: any[];
};

const ChecklistBadge = ({ status }: { status: string }) => {
    if (status === "completed")
        return <span className="flex items-center gap-1.5 text-[11px] font-medium px-3 py-0.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200">✔ Completed</span>;
    if (status === "inprogress")
        return <span className="flex items-center gap-1.5 text-[11px] font-medium px-3 py-0.5 rounded-xl bg-orange-50 text-orange-500 border border-orange-200">⏱ In Progress</span>;
    return <span className="flex items-center gap-1.5 text-[11px] font-medium px-3 py-0.5 rounded-xl bg-gray-100 text-gray-400 border border-gray-200">⏰ Pending</span>;
};

const BookingStatus = ({ status }: { status: string }) => {
    if (status === "confirmed")
        return <span className="text-[11px] font-semibold px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-600">Confirmed</span>;
    if (status === "inprogress")
        return <span className="text-[11px] font-semibold px-3 py-0.5 rounded-full bg-orange-50 text-orange-500">In Progress</span>;
    return <span className="text-[11px] text-gray-400">Not Booked</span>;
};

const hasValue = (value: any) => value !== undefined && value !== null && String(value).trim() !== "";

const paymentDone = (data: any) =>
    Number(data?.balanceAmount || 0) <= 0 && (Number(data?.amountPaid || 0) > 0 || ["paid", "confirmed"].includes(data?.status));

const documentDone = (data: any) => {
    const docs = [
        data?.companyLogoUrl,
        data?.panCardFrontUrl,
        data?.gstCertificateUrl,
        data?.cancelledChequeUrl,
        data?.representativePhotoUrl,
    ];
    return docs.filter(hasValue).length >= 3 || ["approved", "verified"].includes(data?.documentStatus) || data?.kycStatus === "approved";
};

export default function EventDashboard({ data, accessoryOrders = [], passRequests = [] }: MyEventDashboardProps) {
    const navigate = useNavigate();
    const hasStall = hasValue(data?.participation?.stallFor) || hasValue(data?.participation?.stallNo);
    const hasAccessories = accessoryOrders.length > 0;
    const hasPassRequests = passRequests.length > 0;
    const hasApprovedPass = passRequests.some((req) => req.status === "approved");

    const tasks = useMemo(() => [
        {
            icon: Store,
            iconColor: "text-emerald-600",
            bg: "bg-emerald-50",
            name: "Complete Stall Information",
            sub: hasStall ? `${data?.participation?.stallFor || data?.participation?.stallNo} assigned` : "Provide your stall details and specifications",
            status: hasStall ? "completed" : "pending",
            path: "/exhibitor-dashboard/stall-information",
        },
        {
            icon: FileText,
            iconColor: "text-purple-600",
            bg: "bg-purple-50",
            name: "Upload Required Documents",
            sub: documentDone(data) ? `Document status: ${data?.documentStatus || data?.kycStatus || "submitted"}` : "Submit all mandatory documents",
            status: documentDone(data) ? "completed" : "pending",
            path: "/exhibitor-dashboard/document-center",
        },
        {
            icon: CreditCard,
            iconColor: "text-blue-600",
            bg: "bg-blue-50",
            name: "Make Payment",
            sub: paymentDone(data) ? `Paid: ${data?.participation?.currency || "INR"} ${Number(data?.amountPaid || 0).toLocaleString("en-IN")}` : `Balance: ${data?.participation?.currency || "INR"} ${Number(data?.balanceAmount || 0).toLocaleString("en-IN")}`,
            status: paymentDone(data) ? "completed" : Number(data?.amountPaid || 0) > 0 ? "inprogress" : "pending",
            path: "/exhibitor-dashboard/payments",
        },
        {
            icon: ShoppingBag,
            iconColor: "text-orange-600",
            bg: "bg-orange-50",
            name: "Book Add On Services",
            sub: hasAccessories ? `${accessoryOrders.length} order${accessoryOrders.length === 1 ? "" : "s"} placed` : "Enhance your presence with additional services",
            status: hasAccessories ? "completed" : "pending",
            path: "/exhibitor-dashboard/accessories",
        },
        {
            icon: Users,
            iconColor: "text-gray-600",
            bg: "bg-gray-100",
            name: "Invite Team Members",
            sub: `${Array.isArray(data?.teamMembers) ? data.teamMembers.length : 0} team member${Array.isArray(data?.teamMembers) && data.teamMembers.length === 1 ? "" : "s"} registered`,
            status: Array.isArray(data?.teamMembers) && data.teamMembers.length > 0 ? "completed" : "pending",
            path: "/exhibitor-dashboard/ex-profile",
        },
    ], [accessoryOrders.length, data, hasAccessories, hasStall]);

    const bookings = [
        { icon: Store, iconColor: "text-emerald-600", name: "Stall Booking", status: hasStall ? "confirmed" : "notbooked", path: "/exhibitor-dashboard/stall-information" },
        { icon: FileText, iconColor: "text-purple-600", name: "Documents", status: documentDone(data) ? "confirmed" : "inprogress", path: "/exhibitor-dashboard/document-center" },
        { icon: CreditCard, iconColor: "text-blue-600", name: "Payment", status: paymentDone(data) ? "confirmed" : Number(data?.amountPaid || 0) > 0 ? "inprogress" : "notbooked", path: "/exhibitor-dashboard/payments" },
        { icon: ShoppingBag, iconColor: "text-orange-600", name: "Add On Services", status: hasAccessories ? "confirmed" : "notbooked", path: "/exhibitor-dashboard/accessories" },
        { icon: Ticket, iconColor: "text-teal-600", name: "Passes", status: hasApprovedPass ? "confirmed" : hasPassRequests ? "inprogress" : "notbooked", path: "/exhibitor-dashboard/exhibitor-pass" },
        { icon: Handshake, iconColor: "text-rose-600", name: "Buyer Meetings", status: "notbooked", path: "/exhibitor-dashboard/bsm" },
    ];

    return (
        <div className="grid grid-cols-2 gap-3 pt-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            {/* Checklist */}
            <div
                className="bg-white rounded-lg border border-slate-100 overflow-hidden flex flex-col"
                style={{ boxShadow: 'rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em' }}
            >
                <div className="flex justify-between items-center bg-slate-100 border-b border-slate-200 px-3 py-2.5">
                    <h2 className="text-[12px] font-bold text-[#1a3a7c] uppercase tracking-wider leading-none">My Event Checklist</h2>
                    <button onClick={() => navigate("/exhibitor-dashboard")} className="text-[10px] text-emerald-600 font-bold hover:text-emerald-700 uppercase cursor-pointer leading-none">View Dashboard →</button>
                </div>
                <div className="px-3 py-2 flex-1 flex flex-col justify-center">
                    {tasks.map((t, i) => (
                        <button key={i} onClick={() => navigate(t.path)} className="w-full flex items-center gap-3 py-0.5 border-b border-gray-100 last:border-none hover:bg-gray-50 rounded-lg px-1 cursor-pointer transition-all text-left">
                            <div className={`w-8 h-8 rounded-lg ${t.bg} flex items-center justify-center shrink-0 border border-slate-100 shadow-sm`}>
                                <t.icon size={15} className={t.iconColor} strokeWidth={2} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[11px] font-bold text-[#124170] leading-snug">{t.name}</p>
                                <p className="text-[10px] text-slate-500 font-medium leading-none mt-0.5">{t.sub}</p>
                            </div>
                            <ChecklistBadge status={t.status} />
                            <span className="text-gray-300 text-lg">›</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Bookings */}
            <div
                className="bg-white rounded-lg border border-slate-100 overflow-hidden flex flex-col"
                style={{ boxShadow: 'rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em' }}
            >
                <div className="flex justify-between items-center bg-slate-100 border-b border-slate-200 px-3 py-2.5">
                    <h2 className="text-[12px] font-bold text-[#1a3a7c] uppercase tracking-wider leading-none">My Bookings & Services</h2>
                    <button onClick={() => navigate("/exhibitor-dashboard/accessories")} className="text-[10px] text-emerald-600 font-bold hover:text-emerald-700 uppercase cursor-pointer leading-none">View All →</button>
                </div>
                <div className="grid grid-cols-3 gap-2 px-3 py-2 flex-1">
                    {bookings.map((b, i) => (
                        <button key={i} onClick={() => navigate(b.path)} className="bg-slate-50 border border-slate-200 shadow-sm rounded-xl px-2 py-1 flex flex-col items-center justify-center gap-1 cursor-pointer hover:-translate-y-0.5 hover:shadow-md hover:bg-white transition-all">
                            <b.icon size={20} className={b.iconColor} strokeWidth={1.8} />
                            <p className="text-[11px] font-bold text-[#124170] text-center leading-tight">{b.name}</p>
                            <BookingStatus status={b.status} />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
