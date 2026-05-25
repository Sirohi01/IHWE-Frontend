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
  { name: "Agreement Letter",      status: "Completed"    },
  { name: "Company Profile",       status: "Completed"    },
  { name: "GST Certificate",       status: "Completed"    },
  { name: "Product Brochure",      status: "Pending"      },
  { name: "Manufacturing License", status: "Pending"      },
  { name: "Other Documents",       status: "Not Uploaded" },
];

const EVENTS: { day: string; month: string; title: string; date: string; time?: string; venue: string; color: EventColor }[] = [
  { day: "19", month: "AUG", title: "Stall Setup Begins",  date: "19 August 2026",                    venue: "Pragati Maidan, New Delhi",      color: "blue"   },
  { day: "21", month: "AUG", title: "Expo Inauguration",   date: "21 August 2026", time: "10:00 AM",  venue: "Main Auditorium, Hall No. 1",    color: "green"  },
  { day: "23", month: "AUG", title: "Expo Closing",        date: "23 August 2026", time: "06:00 PM",  venue: "Pragati Maidan, New Delhi",      color: "purple" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const DOC_STATUS_CONFIG: Record<DocStatus, { label: string; color: string; icon: any }> = {
  "Completed":    { label: "Completed",    color: "text-green-500", icon: CheckCircle  },
  "Pending":      { label: "Pending",      color: "text-amber-500", icon: Clock        },
  "Not Uploaded": { label: "Not Uploaded", color: "text-gray-400",  icon: MinusCircle  },
};

const EVENT_COLORS: Record<EventColor, { day: string; month: string }> = {
  blue:   { day: "text-blue-600",   month: "text-blue-400"   },
  green:  { day: "text-green-600",  month: "text-green-400"  },
  purple: { day: "text-purple-600", month: "text-purple-400" },
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
      <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-gray-800 uppercase tracking-wider">Payment Overview</span>
            <span className="h-[2px] w-8 bg-gradient-to-r from-[#3b82f6] to-transparent rounded-full" />
          </div>
          <button onClick={onViewPayment} className="text-[12px] font-semibold text-blue-500 hover:text-blue-700 transition-colors">View Details</button>
        </div>

        <div className="flex gap-3 mb-4">
          <div className="flex-1 bg-gray-50 rounded-xl p-3">
            <p className="text-[11px] text-gray-400 mb-1">Total Paid</p>
            <p className="text-xl font-bold text-green-600">{PAYMENT.totalPaid}</p>
          </div>
          <div className="flex-1 bg-gray-50 rounded-xl p-3">
            <p className="text-[11px] text-gray-400 mb-1">Last Payment</p>
            <p className="text-[13px] font-semibold text-gray-700">{PAYMENT.lastPaymentDate}</p>
            <p className="text-[11px] text-gray-400">{PAYMENT.txn}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <DonutChart percent={PAYMENT.paid.percent} />
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-green-500 shrink-0" />
                <span className="text-[12px] text-gray-500">{PAYMENT.paid.label}</span>
              </div>
              <span className="text-[12px] font-semibold text-gray-700">{PAYMENT.paid.amount} ({PAYMENT.paid.percent}%)</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-amber-400 shrink-0" />
                <span className="text-[12px] text-gray-500">{PAYMENT.pending.label}</span>
              </div>
              <span className="text-[12px] font-semibold text-gray-700">{PAYMENT.pending.amount} ({PAYMENT.pending.percent}%)</span>
            </div>
            <div className="border-t border-gray-100 pt-2 flex items-center justify-between">
              <span className="text-[12px] font-semibold text-gray-500">Total Amount</span>
              <span className="text-[13px] font-bold text-gray-800">{PAYMENT.total}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Document Status ── */}
      <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-gray-800 uppercase tracking-wider">Document Status</span>
            <span className="h-[2px] w-8 bg-gradient-to-r from-[#3b82f6] to-transparent rounded-full" />
          </div>
          <button onClick={onViewDocuments} className="text-[12px] font-semibold text-blue-500 hover:text-blue-700 transition-colors">View All</button>
        </div>

        <div className="space-y-2.5">
          {DOCUMENTS.map((doc, i) => {
            const cfg = DOC_STATUS_CONFIG[doc.status];
            const Icon = cfg.icon;
            return (
              <div key={i} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-2.5">
                  <FileText size={14} className="text-gray-400 shrink-0" />
                  <span className="text-[13px] text-gray-700 font-medium">{doc.name}</span>
                </div>
                <div className={`flex items-center gap-1.5 ${cfg.color}`}>
                  <span className="text-[12px] font-semibold">{cfg.label}</span>
                  <Icon size={14} strokeWidth={2} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Upcoming Events ── */}
      <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-gray-800 uppercase tracking-wider">Upcoming Events</span>
            <span className="h-[2px] w-8 bg-gradient-to-r from-[#3b82f6] to-transparent rounded-full" />
          </div>
          <button onClick={onViewEvents} className="text-[12px] font-semibold text-blue-500 hover:text-blue-700 transition-colors">View All</button>
        </div>

        <div className="space-y-4">
          {EVENTS.map((ev, i) => {
            const clr = EVENT_COLORS[ev.color];
            return (
              <div key={i} className="flex items-start gap-4 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                <div className="text-center shrink-0 w-12">
                  <p className={`text-2xl font-black leading-none ${clr.day}`}>{ev.day}</p>
                  <p className={`text-[11px] font-bold uppercase tracking-wider ${clr.month}`}>{ev.month}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-bold text-gray-800 leading-tight">{ev.title}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    {ev.date}{ev.time ? ` | ${ev.time}` : ""}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin size={11} className="text-gray-400 shrink-0" />
                    <span className="text-[11px] text-gray-400 truncate">{ev.venue}</span>
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