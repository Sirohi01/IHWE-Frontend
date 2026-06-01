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

const tasks = [
    { icon: "🏪", bg: "bg-emerald-50", name: "Complete Stall Information", sub: "Provide your stall details and specifications", status: "completed" },
    { icon: "📄", bg: "bg-purple-50", name: "Upload Required Documents", sub: "Submit all mandatory documents", status: "completed" },
    { icon: "💳", bg: "bg-blue-50", name: "Make Payment", sub: "Complete your payment to confirm participation", status: "completed" },
    { icon: "🛍️", bg: "bg-orange-50", name: "Book Add On Services", sub: "Enhance your presence with additional services", status: "inprogress" },
    { icon: "👥", bg: "bg-gray-100", name: "Invite Team Members", sub: "Add your team to manage the event together", status: "pending" },
];

const bookings = [
    { icon: "🏪", name: "Stall Booking", status: "confirmed" },
    { icon: "⚡", name: "Electricity", status: "confirmed" },
    { icon: "🪑", name: "Furniture", status: "inprogress" },
    { icon: "🎨", name: "Branding", status: "confirmed" },
    { icon: "🧑‍💼", name: "Hostesses", status: "notbooked" },
    { icon: "🅿️", name: "Parking", status: "notbooked" },
];

export default function EventDashboard() {
    return (
        <div className="grid grid-cols-2 gap-3 pt-2">
            {/* Checklist */}
            <div 
                className="bg-white rounded-lg px-4 py-2"
                style={{ boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}
            >
                <div className="flex justify-between items-center mb-1">
                    <h2 className="text-sm font-medium text-[#19174D]">My Event Checklist</h2>
                    <span className="text-xs text-emerald-500 font-medium cursor-pointer">View All Tasks →</span>
                </div>
                <div className="border border-gray-100 rounded-lg px-2 py-0.5">
                    {tasks.map((t, i) => (
                        <div key={i} className="flex items-center gap-3 py-0.5 border-b border-gray-100 last:border-none hover:bg-gray-50 rounded-lg px-1 cursor-pointer transition-all">
                            <div className={`w-8 h-8 rounded-lg ${t.bg} flex items-center justify-center text-[15px] shrink-0`}>{t.icon}</div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[11px] font-medium text-[#0f1f45] leading-snug">{t.name}</p>
                                <p className="text-[10px] text-gray-500 leading-none mt-0.5">{t.sub}</p>
                            </div>
                            <ChecklistBadge status={t.status} />
                            <span className="text-gray-300 text-lg">›</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bookings */}
            <div 
                className="bg-white rounded-lg px-4 py-2"
                style={{ boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}
            >
                <div className="flex justify-between items-center mb-1">
                    <h2 className="text-sm font-medium text-[#19174D]">My Bookings & Services</h2>
                    <span className="text-xs text-emerald-500 font-medium cursor-pointer">View All →</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                    {bookings.map((b, i) => (
                        <div key={i} className="bg-[#f4f7ff] rounded-xl px-2 py-1 flex flex-col items-center gap-1 cursor-pointer hover:-translate-y-0.5 hover:shadow-md transition-all">
                            <span className="text-xl">{b.icon}</span>
                            <p className="text-[12px] font-semibold text-[#0f1f45] text-center leading-tight">{b.name}</p>
                            <BookingStatus status={b.status} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}