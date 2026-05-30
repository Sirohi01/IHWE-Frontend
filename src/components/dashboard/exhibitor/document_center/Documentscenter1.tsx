import React, { useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────
type Status = "Submitted" | "Under Review" | "Pending" | "Not Uploaded";
type DocType = "Required" | "Optional";

interface Document {
  id: number;
  name: string;
  description: string;
  requiredFor: string;
  status: Status;
  lastUpdated: string | null;
  type: DocType;
  iconColor: string;
  iconBg: string;
}

// ── Data ───────────────────────────────────────────────────────────────────
const documents: Document[] = [
  {
    id: 1,
    name: "Company Registration Certificate",
    description: "Certificate of Incorporation / Registration proof of the company",
    requiredFor: "All Exhibitors",
    status: "Submitted",
    lastUpdated: "15 May 2026\n11:30 AM",
    type: "Required",
    iconColor: "#16a34a",
    iconBg: "#e6f4ee",
  },
  {
    id: 2,
    name: "GST Registration Certificate",
    description: "GST Registration Certificate of the company",
    requiredFor: "All Exhibitors",
    status: "Under Review",
    lastUpdated: "14 May 2026\n04:15 PM",
    type: "Required",
    iconColor: "#2563eb",
    iconBg: "#eff6ff",
  },
  {
    id: 3,
    name: "Logo (High Resolution)",
    description: "Company / Brand Logo in high resolution (JPG/PNG)",
    requiredFor: "Branding & Directory",
    status: "Pending",
    lastUpdated: null,
    type: "Required",
    iconColor: "#d97706",
    iconBg: "#fffbeb",
  },
  {
    id: 4,
    name: "Product Brochure / Catalog",
    description: "Latest product brochure or catalog",
    requiredFor: "Directory & Digital Promotion",
    status: "Submitted",
    lastUpdated: "10 May 2026\n02:20 PM",
    type: "Optional",
    iconColor: "#16a34a",
    iconBg: "#e6f4ee",
  },
  {
    id: 5,
    name: "Authorized Signatory Letter",
    description: "Authorization letter on company letterhead",
    requiredFor: "All Exhibitors",
    status: "Under Review",
    lastUpdated: "13 May 2026\n09:10 AM",
    type: "Required",
    iconColor: "#2563eb",
    iconBg: "#eff6ff",
  },
  {
    id: 6,
    name: "Fire NOC / Safety Certificate",
    description: "Fire NOC / Safety compliance certificate (if applicable)",
    requiredFor: "All Exhibitors",
    status: "Pending",
    lastUpdated: null,
    type: "Required",
    iconColor: "#dc2626",
    iconBg: "#fef2f2",
  },
  {
    id: 7,
    name: "Insurance Certificate",
    description: "Public liability insurance certificate",
    requiredFor: "All Exhibitors",
    status: "Not Uploaded",
    lastUpdated: null,
    type: "Optional",
    iconColor: "#7c3aed",
    iconBg: "#f5f3ff",
  },
];

// ── Status Badge ───────────────────────────────────────────────────────────
const StatusBadge = ({ status }: { status: Status }) => {
  const config: Record<Status, { bg: string; text: string; border: string; icon: React.ReactNode }> = {
    Submitted: {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      border: "border-emerald-200",

      icon: (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="#16a34a" />
          <polyline points="8,12 11,15 16,9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      ),
    },
    "Under Review": {
      bg: "bg-blue-50",
      text: "text-blue-600",
      border: "border-blue-200",
      icon: (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#2563eb" strokeWidth="2" fill="none" />
          <polyline points="12,7 12,12 15,15" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    Pending: {
      bg: "bg-amber-50",
      text: "text-amber-600",
      border: "border-amber-200",
      icon: (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="3" stroke="#d97706" strokeWidth="2" fill="none" />
          <line x1="12" y1="8" x2="12" y2="13" stroke="#d97706" strokeWidth="2" strokeLinecap="round" />
          <line x1="9" y1="16" x2="15" y2="16" stroke="#d97706" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    "Not Uploaded": {
      bg: "bg-gray-50",
      text: "text-gray-500",
      border: "border-gray-200",
      icon: (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#9ca3af" strokeWidth="2" fill="none" />
          <polyline points="12,7 12,12 15,15" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  };
  const c = config[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium ${c.bg} ${c.text} ${c.border}`}>
      {c.icon}
      {status}
    </span>
  );
};

// ── Doc Icon ───────────────────────────────────────────────────────────────
const DocIcon = ({ color, bg }: { color: string; bg: string }) => (
  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: bg }}>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="12" y2="17" />
    </svg>
  </div>
);

// ── Action Buttons ─────────────────────────────────────────────────────────
const ActionButtons = ({ status }: { status: Status }) => {
  const isUploaded = status === "Submitted" || status === "Under Review";
  return (
    <div className="flex items-center gap-2">
      <button className="w-8 h-8 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
        {isUploaded ? (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        ) : (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 16 12 12 8 16" />
            <line x1="12" y1="12" x2="12" y2="21" />
            <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
          </svg>
        )}
      </button>
      <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 rounded-lg transition-colors">
        <svg width="4" height="16" viewBox="0 0 4 16" fill="none">
          <circle cx="2" cy="2" r="1.5" fill="#9ca3af" />
          <circle cx="2" cy="8" r="1.5" fill="#9ca3af" />
          <circle cx="2" cy="14" r="1.5" fill="#9ca3af" />
        </svg>
      </button>
    </div>
  );
};

// ── Right Sidebar ──────────────────────────────────────────────────────────
const RightSidebar = () => (
  <div className="flex flex-col gap-2 w-[220px] flex-shrink-0">
    {/* Upload Card */}
    <div className="bg-[#0f3d2e] rounded-lg px-5 py-1.5 text-white">
      <p className="text-sm font-semibold">Upload Document</p>
      {/* Illustration */}
      <div className="flex justify-center">
        <svg width="90" height="70" viewBox="0 0 90 70" fill="none">
          <ellipse cx="45" cy="60" rx="38" ry="8" fill="#0b2e22" opacity="0.5" />
          {/* Folder */}
          <path d="M15 32 Q15 26 21 26 H38 L43 32 Z" fill="#1a7d4a" />
          <rect x="15" y="32" width="60" height="28" rx="5" fill="#1a7d4a" />
          <rect x="15" y="38" width="60" height="22" rx="0" fill="#22a05a" />
          {/* Paper */}
          <rect x="28" y="22" width="34" height="34" rx="3" fill="white" opacity="0.95" />
          <rect x="33" y="30" width="24" height="3" rx="1.5" fill="#d1d5db" />
          <rect x="33" y="36" width="18" height="3" rx="1.5" fill="#d1d5db" />
          <rect x="33" y="42" width="21" height="3" rx="1.5" fill="#e5e7eb" />
          {/* Cloud + arrow */}
          <ellipse cx="68" cy="22" rx="12" ry="8" fill="white" opacity="0.18" />
          <ellipse cx="68" cy="24" rx="10" ry="7" fill="white" opacity="0.2" />
          <line x1="68" y1="28" x2="68" y2="18" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <polyline points="64,22 68,18 72,22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </div>
      <p className="text-xs text-center text-emerald-200 mb-3">
        Drag &amp; drop your files here<br />or click to browse
      </p>
      <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-semibold py-1.5 rounded-lg transition-colors mb-3">
        Upload Document
      </button>
      <p className="text-[10px] text-emerald-300 text-center leading-relaxed">
        Accepted formats: PDF, JPG, PNG 🟢<br />Max file size: 10 MB per file
      </p>
    </div>

    {/* Deadline Card */}
    <div className="bg-white border border-gray-200 rounded-lg px-4 py-2">
      <div className="flex items-center gap-2 mb-2">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <p className="text-xs font-semibold text-gray-700">Document Deadline</p>
      </div>
      <p className="text-sm font-medium text-gray-900">30 June 2026</p>
      <p className="text-xs text-gray-500 mb-1">11:59 PM IST</p>
      <p className="text-xs text-gray-500 leading-relaxed mb-1">
        Ensure all documents are uploaded and approved before the deadline to avoid delays.
      </p>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-600 rounded-full" style={{ width: "55%" }} />
        </div>
        <span className="text-[10px] text-gray-500 whitespace-nowrap">45 Days Left</span>
      </div>
    </div>

    {/* Help Card */}
    <div className="bg-amber-50 border border-amber-100 rounded-lg px-4 py-2">
      <div className="flex items-center gap-2 mb-1">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
          <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
        </svg>
        <p className="text-sm font-semibold text-gray-800">Need Help?</p>
      </div>
      <p className="text-xs text-gray-500 leading-relaxed mb-1">
        Facing any issue while uploading documents? Our team is here to help.
      </p>
      <button className="inline-flex items-center gap-2 border border-gray-300 bg-white rounded-lg px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
        Raise a Ticket
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </button>
    </div>
  </div>
);

// ── Main Component ─────────────────────────────────────────────────────────
type TabKey = "all" | "required" | "optional" | "uploaded";

const DocumentsCenter1: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const [search, setSearch] = useState("");

  const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    {
      key: "all",
      label: "All Documents",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      ),
    },
    {
      key: "required",
      label: "Required Documents",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
    {
      key: "optional",
      label: "Optional Documents",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" strokeDasharray="4 2" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      ),
    },
    {
      key: "uploaded",
      label: "Uploaded Documents",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 16 12 12 8 16" />
          <line x1="12" y1="12" x2="12" y2="21" />
          <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
        </svg>
      ),
    },
  ];

  const filtered = documents.filter((doc) => {
    const matchSearch = doc.name.toLowerCase().includes(search.toLowerCase());
    if (activeTab === "required") return matchSearch && doc.type === "Required";
    if (activeTab === "optional") return matchSearch && doc.type === "Optional";
    if (activeTab === "uploaded") return matchSearch && (doc.status === "Submitted" || doc.status === "Under Review");
    return matchSearch;
  });

  return (
    <div className="flex flex-col gap-2 font-sans mb-4">


      {/* Main content row */}
      <div className="flex gap-3 items-start">
        <div className="flex flex-col">
          {/* Tabs + Search Row */}
          <div className="flex justify-between items-center gap-2">
            {/* Tabs */}
            <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1 gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-2 py-1 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${activeTab === tab.key
                    ? "bg-[#0f3d2e] text-white shadow-sm"
                    : "text-[#090C37] hover:bg-gray-50"
                    }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden px-4 py-1.5 gap-3 w-fit">
              {/* Search */}
              <div className="flex items-center gap-2">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="text-sm text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent w-366"
                />
              </div>

              {/* Divider */}
              <div className="w-px h-5 bg-gray-200" />

              {/* Filter */}
              <button className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
                Filter
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="flex-1 mt-1 bg-white border border-gray-200 rounded-lg overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-[2fr_2fr_1.2fr_1.2fr_1.2fr_0.7fr] px-5 py-3 border-b border-gray-100">
              {["DOCUMENT NAME", "DESCRIPTION", "REQUIRED FOR", "STATUS", "LAST UPDATED", "ACTION"].map((h) => (
                <p key={h} className="text-[10px] font-semibold text-[#090C37] tracking-wider uppercase">{h}</p>
              ))}
            </div>

            {/* Rows */}
            {filtered.map((doc, i) => (
              <div
                key={doc.id}
                className={`grid grid-cols-[2fr_2fr_1.2fr_1.2fr_1.2fr_0.7fr] items-center p-2 ${i < filtered.length - 1 ? "border-b border-gray-100" : ""
                  } hover:bg-gray-50 transition-colors`}
              >
                {/* Name */}
                <div className="flex items-center gap-2">
                  <DocIcon color={doc.iconColor} bg={doc.iconBg} />
                  <div>
                    <p className="text-[11px] font-medium text-[#090C37] leading-tight">{doc.name}</p>
                    <span className={`inline-block mt-1 text-[10px] font-medium px-2 py-0.5 rounded-lg ${doc.type === "Required"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-gray-100 text-gray-500"
                      }`}>
                      {doc.type}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[11px] font-medium text-gray-700 leading-relaxed">{doc.description}</p>

                {/* Required For */}
                <p className="text-[11px] font-medium text-gray-700">{doc.requiredFor}</p>

                {/* Status */}
                <div><StatusBadge status={doc.status} /></div>

                {/* Last Updated */}
                <div>
                  {doc.lastUpdated ? (
                    <p className="text-[11px] text-gray-700 whitespace-pre-line">{doc.lastUpdated}</p>
                  ) : (
                    <p className="text-[11px] text-gray-700">—</p>
                  )}
                </div>

                {/* Action */}
                <ActionButtons status={doc.status} />
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="py-16 text-center text-sm text-gray-400">No documents found.</div>
            )}
          </div>
          {/* Footer */}
          <div className="bg-[#0f3d2e] rounded-lg px-6 mt-2 py-2 flex items-center justify-between">
            <div>
              <p className="text-white text-sm font-semibold">Have questions about documentation?</p>
              <p className="text-white/90 text-xs mt-0.5">We're here to help you with a seamless experience.</p>
            </div>
            <div className="flex items-center gap-8">
              <div className="w-px h-8 bg-emerald-700" />
              <div className="flex items-center gap-2 text-white/90 text-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                support@ihwe-expo.com
              </div>
              <div className="w-px h-8 bg-emerald-700" />
              <div className="flex items-center gap-2 text-white/90 text-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6.29 6.29l.87-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                +91 81786 12345
              </div>
            </div>
          </div>
        </div>


        {/* Right Sidebar */}
        <RightSidebar />
      </div>


    </div>
  );
};

export default DocumentsCenter1;