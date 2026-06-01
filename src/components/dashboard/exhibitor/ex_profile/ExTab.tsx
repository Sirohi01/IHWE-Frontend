import { Eye } from "lucide-react";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "company-details", label: "Company Details" },
  { id: "products", label: "Products & Services" },
  { id: "team", label: "Team Members" },
  { id: "documents", label: "Documents" },
  { id: "social", label: "Social Media" },
];

interface ExTabProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onPreview?: () => void;
}

export default function ExTab({ activeTab, setActiveTab, onPreview }: ExTabProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 pt-5 pb-0">
      {/* Header row */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h1 className="text-lg font-semibold text-[#1a3a7c] leading-tight">My Profile</h1>
          <p className="text-[12px] text-gray-400 mt-0.5">
            Home &nbsp;<span className="text-gray-300">›</span>&nbsp; Overview
          </p>
        </div>
        <button
          onClick={onPreview}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#1a3a7c]/30 text-[#1a3a7c] hover:bg-blue-50 transition-colors"
        >
          <Eye size={16} strokeWidth={2} />
          <span className="text-[13px] font-bold">Preview Public Profile</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6">
        {TABS.map(tab => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-[14px] font-medium transition-colors border-b-2 whitespace-nowrap ${active
                ? "text-emerald-600 border-emerald-600"
                : "text-gray-500 border-transparent hover:text-gray-700"
                }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}