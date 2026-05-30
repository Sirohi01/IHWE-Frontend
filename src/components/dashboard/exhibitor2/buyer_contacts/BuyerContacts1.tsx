import React, { useState } from "react";

type Status = "New" | "In Discussion" | "Meeting Scheduled" | "Contacted" | "Converted" | "Archived";
type Tab = "All Leads" | "New Leads" | "Contacted" | "In Discussion" | "Meetings Scheduled" | "Converted" | "Archived";

interface Lead {
    id: number;
    initials: string;
    color: string;
    name: string;
    role: string;
    company: string;
    countryFlag: string;
    country: string;
    interestIcon: string;
    interest: string;
    interestColor: string;
    status: Status;
    lastContact: string;
    lastContactTime: string;
}

const leads: Lead[] = [
    {
        id: 1, initials: "RK", color: "bg-orange-400", name: "Rahul Kapoor", role: "Procurement Manager",
        company: "MediCare Solutions Pvt.", countryFlag: "🇮🇳", country: "India",
        interestIcon: "🩺", interest: "Medical Devices", interestColor: "text-green-600 bg-green-50 border-green-200",
        status: "New", lastContact: "15 May 2026", lastContactTime: "11:45 AM",
    },
    {
        id: 2, initials: "AS", color: "bg-purple-500", name: "Anita Sharma", role: "CEO",
        company: "Wellness World Inc.", countryFlag: "🇸🇬", country: "Singapore",
        interestIcon: "🌿", interest: "Wellness Products", interestColor: "text-purple-600 bg-purple-50 border-purple-200",
        status: "In Discussion", lastContact: "14 May 2026", lastContactTime: "04:10 PM",
    },
    {
        id: 3, initials: "DP", color: "bg-blue-500", name: "David Parker", role: "Purchase Head",
        company: "Global Health Corp.", countryFlag: "🇺🇸", country: "USA",
        interestIcon: "💊", interest: "Supplements", interestColor: "text-blue-600 bg-blue-50 border-blue-200",
        status: "Meeting Scheduled", lastContact: "13 May 2026", lastContactTime: "09:30 AM",
    },
    {
        id: 4, initials: "SW", color: "bg-green-500", name: "Sophia Williams", role: "Business Development",
        company: "HealthMax Ltd.", countryFlag: "🇬🇧", country: "UK",
        interestIcon: "🏋️", interest: "Fitness Equipment", interestColor: "text-orange-600 bg-orange-50 border-orange-200",
        status: "Contacted", lastContact: "12 May 2026", lastContactTime: "02:25 PM",
    },
    {
        id: 5, initials: "MR", color: "bg-pink-500", name: "Mohit Reddy", role: "Director",
        company: "LifeCare Distributors", countryFlag: "🇦🇪", country: "UAE",
        interestIcon: "🧴", interest: "Personal Care", interestColor: "text-pink-600 bg-pink-50 border-pink-200",
        status: "New", lastContact: "11 May 2026", lastContactTime: "10:12 AM",
    },
];

const statusStyles: Record<Status, string> = {
    "New": "bg-blue-50 text-blue-600 border border-blue-200",
    "In Discussion": "bg-amber-50 text-amber-600 border border-amber-200",
    "Meeting Scheduled": "bg-purple-50 text-purple-600 border border-purple-200",
    "Contacted": "bg-teal-50 text-teal-600 border border-teal-200",
    "Converted": "bg-green-50 text-green-600 border border-green-200",
    "Archived": "bg-gray-50 text-gray-500 border border-gray-200",
};

const tabs: Tab[] = ["All Leads", "New Leads", "Contacted", "In Discussion", "Meetings Scheduled", "Converted", "Archived"];

const StatCard = ({ icon, value, label, growth, bg, iconBorder }: {
    icon: string; value: number; label: string; growth: string; bg: string; iconBorder: string
}) => (
    <div className={`flex items-center gap-2 p-2 rounded-xl ${bg} flex-1 min-w-0`}>
        <span className={`text-lg w-10 h-10 flex items-center justify-center rounded-full border ${iconBorder} shrink-0`}>
            {icon}
        </span>
        <div>
            <div className="text-[15px] font-semibold text-gray-800 leading-tight">{value}</div>
            <div className="text-xs text-gray-500 font-medium">{label}</div>
            <div className="text-xs text-green-600 font-semibold mt-0.5">↑ {growth}</div>
        </div>
    </div>
);

const DonutChart = () => (
    <div className="flex items-center gap-4">
        <svg width="90" height="90" viewBox="0 0 90 90">
            <circle cx="45" cy="45" r="32" fill="none" stroke="#e5e7eb" strokeWidth="16" />
            {/* Website 45% */}
            <circle cx="45" cy="45" r="32" fill="none" stroke="#3b82f6" strokeWidth="16"
                strokeDasharray={`${0.45 * 201} ${201}`} strokeDashoffset="0" transform="rotate(-90 45 45)" />
            {/* Expo 30% */}
            <circle cx="45" cy="45" r="32" fill="none" stroke="#22c55e" strokeWidth="16"
                strokeDasharray={`${0.30 * 201} ${201}`} strokeDashoffset={`${-0.45 * 201}`} transform="rotate(-90 45 45)" />
            {/* Social 15% */}
            <circle cx="45" cy="45" r="32" fill="none" stroke="#f59e0b" strokeWidth="16"
                strokeDasharray={`${0.15 * 201} ${201}`} strokeDashoffset={`${-0.75 * 201}`} transform="rotate(-90 45 45)" />
            {/* Email 10% */}
            <circle cx="45" cy="45" r="32" fill="none" stroke="#a855f7" strokeWidth="16"
                strokeDasharray={`${0.10 * 201} ${201}`} strokeDashoffset={`${-0.90 * 201}`} transform="rotate(-90 45 45)" />
        </svg>
        <div className="flex flex-col gap-1.5 text-xs">
            {[
                { color: "bg-blue-500", label: "Website", pct: "45%" },
                { color: "bg-green-500", label: "Expo Inquiry", pct: "30%" },
                { color: "bg-amber-400", label: "Social Media", pct: "15%" },
                { color: "bg-purple-500", label: "Email Campaign", pct: "10%" },
            ].map(item => (
                <div key={item.label} className="flex items-center gap-1.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${item.color} shrink-0`} />
                    <span className="text-gray-600">{item.label}</span>
                    <span className="ml-auto font-semibold text-gray-700">{item.pct}</span>
                </div>
            ))}
        </div>
    </div>
);

const BuyerContacts1: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>("All Leads");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const filtered = leads.filter(l =>
        l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.company.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className=" font-sans">
            <div className="w-full flex gap-2 mt-2">

                {/* Main Content */}
                <div className="flex-1 flex flex-col gap-2 min-w-0">

                    {/* Stats Row */}
                    <div className="flex  bg-white  rounded-lg flex-wrap gap-2 justify-between border border-gray-100 p-2"> <StatCard icon="👥" value={128} label="Total Leads" growth="15% this week" bg="bg-green-50" iconBorder="border-green-300" />
                        <StatCard icon="✉️" value={62} label="New Leads" growth="8% this week" bg="bg-blue-50" iconBorder="border-blue-300" />
                        <StatCard icon="👁️" value={34} label="Viewed Profile" growth="12% this week" bg="bg-amber-50" iconBorder="border-amber-300" />
                        <StatCard icon="💬" value={18} label="Conversations" growth="10% this week" bg="bg-purple-50" iconBorder="border-purple-300" />
                        <StatCard icon="📅" value={9} label="Meetings Booked" growth="6% this week" bg="bg-teal-50" iconBorder="border-teal-300" /></div>

                    {/* Leads Table Card */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                        {/* Tabs + Search */}
                        <div className="flex items-center justify-between px-2 pt-2 border-b border-gray-100 gap-1 flex-wrap">
                            <div className="flex gap-1 overflow-x-auto">
                                {tabs.map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-2  py-2 text-sm font-normal whitespace-nowrap rounded-t-lg transition-colors ${activeTab === tab
                                            ? "text-green-600 border-b-2 border-green-600 bg-white"
                                            : "text-gray-500 hover:text-gray-700"
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                            <div className="flex items-center gap-1 pb-2">
                                <div className="flex items-center gap-1 border border-gray-200 rounded-lg px-2 py-1 bg-gray-50">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                                    </svg>
                                    <input
                                        type="text"
                                        placeholder="Search by name, company..."
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                        className="text-sm bg-transparent outline-none w-28 text-gray-700 placeholder-gray-400"
                                    />
                                </div>
                                <button className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-500">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M7 10h10M11 16h2" />
                                    </svg>
                                </button>
                                <button className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-500">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="text-gray-500 text-xs font-medium uppercase tracking-wide border-b border-gray-100">
                                        <th className="px-4 py-3 text-left text-[10px]">Buyer Name</th>
                                        <th className="px-1 py-3 text-left text-[10px]">Company & Designation</th>
                                        <th className="px-1 py-3 text-left text-[10px]">Country</th>
                                        <th className="px-1 py-3 text-left text-[10px]">Interest In</th>
                                        <th className="px-1 py-3 text-left text-[10px]">Status</th>
                                        <th className="px-1 py-3 text-left text-[10px]">Last Contact</th>
                                        <th className="px-1 py-3 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filtered.map(lead => (
                                        <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-2 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-9 h-9 rounded-full ${lead.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                                                        {lead.initials}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-xs  text-gray-800">{lead.name}</div>
                                                        <div className="text-[10px] text-gray-400">{lead.role}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-2 py-2.5 text-xs text-gray-600">{lead.company}</td>
                                            <td className="px-1 py-2.5">
                                                <span className="flex text-xs items-center gap-1.5 text-gray-700">
                                                    <span>{lead.countryFlag}</span>{lead.country}
                                                </span>
                                            </td>
                                            <td className="px-2 py-2.5">
                                                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${lead.interestColor}`}>
                                                    <span>{lead.interestIcon}</span> {lead.interest}
                                                </span>
                                            </td>
                                            <td className="px-2 py-2.5">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[lead.status]}`}>
                                                    {lead.status}
                                                </span>
                                            </td>
                                            <td className="px-2 py-2.5">
                                                <div className="text-gray-700 text-xs font-medium">{lead.lastContact}</div>
                                                <div className="text-xs text-gray-400">{lead.lastContactTime}</div>
                                            </td>
                                            <td className="px-2 py-2.5">
                                                <div className="flex items-center gap-2">
                                                    <button className="p-1.5 rounded-lg border border-gray-200 hover:bg-green-50 hover:border-green-200 text-green-600 transition-colors">
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-5l-3 3v-3z" />
                                                        </svg>
                                                    </button>
                                                    <button className="p-1.5 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-200 text-blue-500 transition-colors">
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" />
                                                        </svg>
                                                    </button>
                                                    <button className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-400 transition-colors">
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                            <circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 text-sm text-gray-500">
                            <span>Showing 1 to {filtered.length} of 128 leads</span>
                            <div className="flex items-center gap-1">
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400">‹</button>
                                {[1, 2, 3].map(p => (
                                    <button
                                        key={p}
                                        onClick={() => setCurrentPage(p)}
                                        className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${currentPage === p ? "bg-green-600 text-white" : "hover:bg-gray-100 text-gray-600"
                                            }`}
                                    >
                                        {p}
                                    </button>
                                ))}
                                <span className="px-1 text-gray-400">...</span>
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600">26</button>
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400">›</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="w-56 shrink-0 flex flex-col gap-2">
                    {/* Filter Panel */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 px-4 py-2">
                        <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
                                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3 3a1 1 0 0 1 1-1h12a1 1 0 0 1 .8 1.6L13 9v5.586l-2 2V9L3.2 4.6A1 1 0 0 1 3 4V3z" clipRule="evenodd" />
                                </svg>
                                Filter Leads
                            </div>
                            <button className="text-xs text-green-600 font-medium hover:underline">Clear All</button>
                        </div>
                        {[
                            { label: "Country", placeholder: "All Countries" },
                            { label: "Interest Category", placeholder: "All Categories" },
                            { label: "Status", placeholder: "All Status" },
                            { label: "Last Contact", placeholder: "Any Time" },
                        ].map(f => (
                            <div key={f.label} className="mb-2">
                                <label className="block text-xs font-medium text-gray-700 mb-1">{f.label}</label>
                                <select className="w-full border border-gray-200 rounded-lg px-3 py-1 text-xs text-gray-600 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-200 appearance-none">
                                    <option>{f.placeholder}</option>
                                </select>
                            </div>
                        ))}
                        <button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg py-1 text-xs font-medium transition-colors flex items-center justify-center gap-2 mt-1">
                            <svg className="w-3 h-33" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 3a1 1 0 0 1 1-1h12a1 1 0 0 1 .8 1.6L13 9v5.586l-2 2V9L3.2 4.6A1 1 0 0 1 3 4V3z" clipRule="evenodd" />
                            </svg>
                            Apply Filters
                        </button>
                    </div>

                    {/* Lead Source Overview */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 px-4 py-1">
                        <div className="font-semibold text-gray-800 mb-2 text-sm">Lead Source Overview</div>
                        <DonutChart />
                    </div>

                    {/* CTA Banner */}
                    <div className="bg-green-50 rounded-lg border border-green-100 px-2 py-2 flex items-start gap-2">
                        <div>
                            <div className="font-semibold text-gray-800 text-sm">Grow your connections!</div>
                            <div className="text-xs text-gray-500 mt-1">Respond to leads quickly and convert more opportunities.</div>
                        </div>
                        <span className="text-2xl shrink-0">📈</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuyerContacts1;