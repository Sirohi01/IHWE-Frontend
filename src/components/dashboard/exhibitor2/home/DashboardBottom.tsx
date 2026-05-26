import { CheckCircle, Clock, MinusCircle, FileText, MapPin } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type DocStatus = "Completed" | "Pending" | "Not Uploaded";
type EventColor = "blue" | "green" | "purple";

// ─── Data ─────────────────────────────────────────────────────────────────────

const PAYMENT = {
  totalPaid: "INR 11.00",
  lastPaymentDate: "24 May 2026",
  txn: "TXN4678981236",
  paid: { label: "Paid", amount: "INR 11.00", percent: 100 },
  pending: { label: "Pending", amount: "INR 0.00", percent: 0 },
  total: "INR 11.00",
};

const DOCUMENTS: { name: string; status: DocStatus }[] = [
  { name: "Agreement Letter", status: "Completed" },
  { name: "Company Profile", status: "Completed" },
  { name: "GST Certificate", status: "Completed" },
  { name: "Product Brochure", status: "Pending" },
  { name: "Manufacturing License", status: "Pending" },
  { name: "Other Documents", status: "Not Uploaded" },
];

const EVENTS: { day: string; month: string; title: string; date: string; time?: string; venue: string; color: EventColor }[] = [
  { day: "19", month: "AUG", title: "Stall Setup Begins", date: "19 August 2026", venue: "Pragati Maidan, New Delhi", color: "blue" },
  { day: "21", month: "AUG", title: "Expo Inauguration", date: "21 August 2026", time: "10:00 AM", venue: "Main Auditorium, Hall No. 1", color: "green" },
  { day: "23", month: "AUG", title: "Expo Closing", date: "23 August 2026", time: "06:00 PM", venue: "Pragati Maidan, New Delhi", color: "purple" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const DOC_STATUS_CONFIG: Record<DocStatus, { label: string; color: string; icon: any }> = {
  "Completed": { label: "Completed", color: "text-green-500", icon: CheckCircle },
  "Pending": { label: "Pending", color: "text-amber-500", icon: Clock },
  "Not Uploaded": { label: "Not Uploaded", color: "text-gray-400", icon: MinusCircle },
};

const EVENT_COLORS: Record<EventColor, { day: string; month: string; bg: string }> = {
  blue: { day: "text-[#1a3a7c]", month: "text-[#4169c8]", bg: "bg-[#eef2ff]" },
  green: { day: "text-green-700", month: "text-green-500", bg: "bg-[#f0faf5]" },
  purple: { day: "text-purple-700", month: "text-purple-500", bg: "bg-[#f5f0ff]" },
};


function DonutChart({ percent }: { percent: number }) {
  const r = 36, cx = 44, cy = 44;
  const circ = 2 * Math.PI * r;
  const dash = (percent / 100) * circ;
  return (
    <svg width="88" height="88" viewBox="0 0 88 88">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e5e7eb" strokeWidth="10" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#22a96a" strokeWidth="10"
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cy})`} />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

interface DashboardBottomProps {
  onViewPayment?: () => void;
  onViewDocuments?: () => void;
  onViewEvents?: () => void;
}

export default function DashboardBottom({ onViewPayment, onViewDocuments, onViewEvents }: DashboardBottomProps) {
  return (
    <div className="flex gap-4 w-full">

      {/* ── Payment Overview ── */}
      <div className="flex-1 bg-white rounded-lg border border-gray-100 shadow-sm px-4 py-3">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-bold text-[#1a3a7c] uppercase tracking-wider">Payment Overview</span>
          <button onClick={onViewPayment} className="text-[12px] font-semibold text-blue-500 hover:text-blue-700 transition-colors">View Details</button>
        </div>

        {/* Top card - single unified */}
        <div className="bg-[#f0faf5] border border-[#d1f0e0] rounded-lg px-4 py-2 mb-4 flex gap-6">
          <div className="flex-1">
            <p className="text-sm font-semibold text-[#1a3a7c] mb-1">Total Paid</p>
            <p className="text-lg font-semibold text-green-700">{PAYMENT.totalPaid}</p>
          </div>
          <div className="w-px bg-[#c8e8d8]" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-[#1a3a7c] mb-1">Last Payment</p>
            <p className="text-[13px] font-semibold text-[#1a3a7c]">{PAYMENT.lastPaymentDate}</p>
            <p className="text-[11px] text-[#1a3a7c]">{PAYMENT.txn}</p>
          </div>
        </div>

        {/* Donut + legend */}
        <div className="flex items-center gap-4">
          <DonutChart percent={PAYMENT.paid.percent} />
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-green-500 shrink-0" />
                <span className="text-[12px] font-semibold text-[#1a3a7c]">{PAYMENT.paid.label}</span>
              </div>
              <span className="text-[12px] font-semibold text-[#1a3a7c]">{PAYMENT.paid.amount} ({PAYMENT.paid.percent}%)</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-amber-400 shrink-0" />
                <span className="text-[12px] font-semibold text-[#1a3a7c]">{PAYMENT.pending.label}</span>
              </div>
              <span className="text-[12px] font-semibold text-[#1a3a7c]">{PAYMENT.pending.amount} ({PAYMENT.pending.percent}%)</span>
            </div>
            <div className="border-t border-gray-100 pt-2 flex items-center justify-between">
              <span className="text-[12px] font-semibold text-[#1a3a7c]">Total Amount</span>
              <span className="text-sm font-bold text-[#1a3a7c]">{PAYMENT.total}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Document Status ── */}
      <div className="flex-1 bg-white rounded-lg  border border-gray-100 shadow-sm  px-4 py-3">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-bold text-[#1a3a7c] uppercase tracking-wider">Document Status</span>
          <button onClick={onViewDocuments} className="text-[12px] font-semibold text-blue-500 hover:text-blue-700 transition-colors">View All</button>
        </div>

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          {DOCUMENTS.map((doc, i) => {
            const cfg = DOC_STATUS_CONFIG[doc.status];
            const Icon = cfg.icon;
            return (
              <div key={i} className={`flex items-center justify-between px-4 py-2 ${i !== DOCUMENTS.length - 1 ? "border-b border-gray-200" : ""}`}>
                <div className="flex items-center gap-3">
                  <FileText size={16} className="text-[#8fa3c8] shrink-0" strokeWidth={1.5} />
                  <span className="text-[14px] font-medium text-[#1a3a7c]">{doc.name}</span>
                </div>
                <div className={`flex items-center gap-2 ${cfg.color}`}>
                  <span className="text-[13px] font-medium">{cfg.label}</span>
                  <Icon size={16} strokeWidth={1.8} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Upcoming Events ── */}
      <div className="flex-1 bg-white rounded-lg  border border-gray-100 shadow-sm  px-4 py-3">
        <div className="flex items-center justify-between mb-5">
          <span className="text-sm font-bold text-[#1a3a7c] uppercase tracking-wider">Upcoming Events</span>
          <button onClick={onViewEvents} className="text-[12px] font-semibold text-blue-500 hover:text-blue-700 transition-colors">View All</button>
        </div>

        <div className="space-y-2">
          {EVENTS.map((ev, i) => {
            const clr = EVENT_COLORS[ev.color];
            return (
              <div key={i} className="flex items-stretch gap-0 border border-gray-100 rounded-lg overflow-hidden">
                {/* Date box */}
                <div className={`${clr.bg} shrink-0 w-16 flex flex-col items-center justify-center py-1 px-3`}>
                  <p className={`text-xl font-semibold text-[#1a3a7c] leading-none ${clr.day}`}>{ev.day}</p>
                  <p className={`text-sm font-medium uppercase tracking-widest mt-1 ${clr.month}`}>{ev.month}</p>
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0 py-1 px-5">
                  <p className="text-sm font-medium text-[#1a3a7c] leading-tight">{ev.title}</p>
                  <p className="text-[12px] text-[#1a3a7c] mt-1">
                    {ev.date}{ev.time ? <><span className="mx-2 text-[#1a3a7c]">|</span>{ev.time}</> : ""}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin size={12} className="text-[#1a3a7c] shrink-0" />
                    <span className="text-[12px] text-[#1a3a7c]">{ev.venue}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}