import { useState } from "react";

const documents = [
  { name: "Exhibitor Manual", size: "PDF (2.4 MB)" },
  { name: "Venue Map", size: "PDF (1.8 MB)" },
  { name: "Move-in / Move-out Guidelines", size: "PDF (1.2 MB)" },
];

const announcements = [
  {
    title: "Venue Entry Pass Mandatory",
    desc: "All exhibitors & team members must carry the venue entry pass during move-in, event days & move-out.",
  },
  {
    title: "Booth Setup Deadline",
    desc: "All booth setups must be completed by 8:00 PM on the day before the event opens.",
  },
  {
    title: "Parking Notice",
    desc: "Dedicated parking for exhibitors is available at Gate 3. Please display your parking pass visibly.",
  },
];

// --- Icons ---
const MegaphoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 11l19-9-9 19-2-8-8-2z" />
  </svg>
);

const FolderIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const HeadsetIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
    <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </svg>
);

const FileIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const ArrowRightIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

// --- Announcement Card ---
const AnnouncementCard = () => {
  const [active, setActive] = useState(0);
  const ann = announcements[active];

  return (
    <div 
      className="bg-white border border-gray-200 rounded-lg px-4 py-2"
      style={{ boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
          <span className="w-6 h-6 rounded-full font-medium bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <MegaphoneIcon />
          </span>
          <span className="text-xs">Important Announcements</span>
        </div>
        <button className="flex items-center gap-1 text-[10px] font-medium text-emerald-700 hover:text-emerald-900 transition-colors">
          View All <ArrowRightIcon size={10} />
        </button>
      </div>

      {/* Banner */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-2 py-1.5 flex items-start gap-2">
        <div className="flex-1">
          <p className="text-[11px] font-semibold text-emerald-900 mb-0.5">{ann.title}</p>
          <p className="text-[10px] text-emerald-700 leading-tight">{ann.desc}</p>
        </div>
        <div className="flex-shrink-0">
          <svg width="40" height="40" viewBox="0 0 52 52" fill="none">
            <circle cx="26" cy="26" r="26" fill="#c6ecd8" />
            <path d="M14 26 Q20 13 26 23 Q30 31 38 21" stroke="#1a7d4a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <circle cx="14" cy="26" r="3.5" fill="#1a7d4a" />
            <ellipse cx="38" cy="21" rx="5" ry="6" fill="#1a7d4a" opacity="0.75" />
            <line x1="26" y1="30" x2="26" y2="37" stroke="#1a7d4a" strokeWidth="2" strokeLinecap="round" />
            <rect x="21" y="37" width="10" height="3.5" rx="1.75" fill="#1a7d4a" opacity="0.55" />
          </svg>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-2">
        {announcements.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${i === active ? "bg-emerald-600" : "bg-gray-300"
              }`}
            aria-label={`Announcement ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// --- Documents Card ---
const DocumentsCard = () => (
  <div 
    className="bg-white border border-gray-200 rounded-lg px-4 py-2"
    style={{ boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}
  >
    {/* Header */}
    <div className="flex items-center justify-between mb-1">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
        <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center">
          <FolderIcon />
        </span>
        <span className="text-xs">Event Documents</span>
      </div>
      <button className="flex items-center gap-1 text-[10px] font-medium text-emerald-700 hover:text-emerald-900 transition-colors">
        View All <ArrowRightIcon size={10} />
      </button>
    </div>

    {/* Doc Rows */}
    <div className="divide-y divide-gray-100">
      {documents.map((doc, i) => (
        <div key={i} className="flex items-center justify-between py-1">
          <div className="flex items-center gap-2">
            <span className="text-gray-400">
              <FileIcon />
            </span>
            <span className="text-[11px] font-medium text-gray-800">{doc.name}</span>
            <span className="text-[10px] text-gray-400">{doc.size}</span>
          </div>
          <button
            className="text-emerald-600 hover:text-emerald-800 transition-colors p-1"
            aria-label={`Download ${doc.name}`}
          >
            <DownloadIcon />
          </button>
        </div>
      ))}
    </div>
  </div>
);

// --- Help Card ---
const HelpCard = () => (
  <div 
    className="bg-white border border-gray-200 rounded-xl p-3"
    style={{ boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}
  >
    {/* Header */}
    <div className="flex items-center gap-2 text-xs font-medium text-gray-800 mb-1">
      <HeadsetIcon />
      Need Help?
    </div>

    <div className="flex items-start gap-2">
      <div className="flex-1">
        <p className="text-[11px] text-gray-500 leading-snug mb-2">
          Our support team is here to help you through your event journey.
        </p>
        <button className="inline-flex items-center gap-1 mt-1 bg-emerald-950 hover:bg-emerald-900 text-white text-[10px] font-medium rounded-md px-3 py-1.5 transition-colors">
          Contact Support <ArrowRightIcon size={10} />
        </button>
      </div>
      <div className="flex-shrink-0">
        <svg width="60" height="60" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="34" r="20" fill="#e6f1fb" />
          <path d="M24 34 Q24 16 40 16 Q56 16 56 34" stroke="#185fa5" strokeWidth="3" strokeLinecap="round" fill="none" />
          <rect x="19" y="31" width="9" height="14" rx="4.5" fill="#0f3d2e" />
          <rect x="52" y="31" width="9" height="14" rx="4.5" fill="#0f3d2e" />
          <circle cx="40" cy="62" r="9" fill="#1a7d4a" />
          <text x="40" y="67" textAnchor="middle" fontSize="11" fontWeight="600" fill="white">C</text>
          <circle cx="54" cy="48" r="9" fill="#d4f0e0" stroke="#1a7d4a" strokeWidth="1.2" />
          <text x="54" y="52" textAnchor="middle" fontSize="10" fill="#145c30">···</text>
        </svg>
      </div>
    </div>
  </div>
);

// --- Main Component ---
export default function EventDashboard1() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 py-1 font-sans pb-4">
      <AnnouncementCard />
      <DocumentsCard />
      <HelpCard />
    </div>
  );
}