import { CheckCircle, Clock, MinusCircle, FileText, MapPin, ChevronLeft, ChevronRight, Plus } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type DocStatus = "Completed" | "Pending" | "Not Uploaded";

// ─── Data ─────────────────────────────────────────────────────────────────────

const PAYMENT = {
  totalPaid: "₹ 60,000",
  lastPaymentDate: "24 May 2026",
  txn: "TXN4678981236",
  paid: { label: "Amount Paid", amount: "₹ 60,000", percent: 60, color: "#127445" },
  pending: { label: "Balance Due", amount: "₹ 25,000", percent: 25, color: "#fbbf24" },
  overdue: { label: "Overdue", amount: "₹ 15,000", percent: 15, color: "#ef4444" },
  total: "₹ 1,00,000",
};

const DOCUMENTS: { name: string; status: DocStatus }[] = [
  { name: "Agreement Letter", status: "Completed" },
  { name: "Company Profile", status: "Completed" },
  { name: "GST Certificate", status: "Completed" },
  { name: "Product Brochure", status: "Pending" },
  { name: "Manufacturing License", status: "Pending" },
  { name: "Other Documents", status: "Not Uploaded" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const DOC_STATUS_CONFIG: Record<DocStatus, { label: string; color: string; icon: any }> = {
  "Completed": { label: "Completed", color: "text-green-500", icon: CheckCircle },
  "Pending": { label: "Pending", color: "text-amber-500", icon: Clock },
  "Not Uploaded": { label: "Not Uploaded", color: "text-gray-400", icon: MinusCircle },
};

import { useState, useMemo, useEffect } from 'react';
import { useExhibitorCtx } from "@/context/ExhibitorContext";
import { API_URL } from "@/lib/api";

function DonutChart({ segments }: { segments: { percent: number; color: string; label: string; amount: string }[] }) {
  const r = 36, cx = 44, cy = 44;
  const circ = 2 * Math.PI * r;

  let currentOffset = 0;
  const [tooltip, setTooltip] = useState<{ x: number, y: number, label: string, amount: string, color: string } | null>(null);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="88" height="88" viewBox="0 0 88 88" onMouseLeave={() => setTooltip(null)}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e5e7eb" strokeWidth="10" />
        {segments.map((seg, i) => {
          if (seg.percent <= 0) return null;
          const dash = (seg.percent / 100) * circ;
          const gap = circ - dash;
          const offset = -currentOffset;
          currentOffset += dash;
          return (
            <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={seg.color} strokeWidth="10"
              strokeDasharray={`${dash} ${gap}`} strokeDashoffset={offset}
              transform={`rotate(-90 ${cx} ${cy})`} strokeLinecap="butt"
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setTooltip({
                  x: e.clientX - rect.left,
                  y: e.clientY - rect.top,
                  label: seg.label,
                  amount: seg.amount,
                  color: seg.color
                });
              }}
            />
          );
        })}
      </svg>
      {tooltip && (
        <div 
          className="absolute z-50 text-white text-[10px] font-medium px-2.5 py-1.5 rounded-md shadow-xl pointer-events-none whitespace-nowrap transform -translate-x-1/2 -translate-y-full"
          style={{ left: tooltip.x, top: tooltip.y - 10, backgroundColor: tooltip.color }}
        >
          <span className="font-bold opacity-90">{tooltip.label}:</span> {tooltip.amount}
        </div>
      )}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

interface DashboardBottomProps {
  onViewPayment?: () => void;
  onViewDocuments?: () => void;
  onViewEvents?: () => void;
}

export default function DashboardBottom({ onViewPayment, onViewDocuments, onViewEvents }: DashboardBottomProps) {
  const { data } = useExhibitorCtx();

  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [eventPage, setEventPage] = useState(1);
  const eventsPerPage = 5;
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoadingEvents(true);
      try {
        const res = await fetch(`${API_URL}/upcoming-events`);
        const result = await res.json();
        if (result.success) {
          setUpcomingEvents(result.data);
        }
      } catch (err) {
        console.error("Failed to fetch upcoming events:", err);
      } finally {
        setIsLoadingEvents(false);
      }
    };
    fetchEvents();
  }, []);

  const totalEventPages = Math.ceil(upcomingEvents.length / eventsPerPage);
  const paginatedEvents = upcomingEvents.slice((eventPage - 1) * eventsPerPage, eventPage * eventsPerPage);

  // Dynamic Payment Setup
  const currencySymbol = data?.participation?.currency === 'USD' ? '$' : '₹';
  const formatAmt = (num: number) => `${currencySymbol} ${num?.toLocaleString('en-IN') || '0'}`;

  const totalAmount = data?.participation?.total || 0;
  const paidAmount = data?.amountPaid || 0;
  const balanceAmount = data?.balanceAmount || 0;
  
  // Hardcode overdue for demo if not provided, else derive it properly. We will just use balance as pending.
  const overdueAmount = data?.status === 'payment-failed' ? balanceAmount : 0;
  const pendingAmount = balanceAmount > 0 && overdueAmount === 0 ? balanceAmount : 0;
  
  const totalPaidLabel = formatAmt(paidAmount);
  const totalBilledLabel = formatAmt(totalAmount);

  const calcPercent = (val: number) => totalAmount > 0 ? (val / totalAmount) * 100 : 0;

  const paymentBreakdown = {
    paid: { label: "Amount Paid", amount: totalPaidLabel, percent: calcPercent(paidAmount), color: "#127445" },
    pending: { label: "Balance Due", amount: formatAmt(pendingAmount), percent: calcPercent(pendingAmount), color: "#fbbf24" },
    overdue: { label: "Overdue", amount: formatAmt(overdueAmount), percent: calcPercent(overdueAmount), color: "#ef4444" },
  };

  const lastPayment = data?.paymentHistory?.length > 0 
    ? data.paymentHistory[data.paymentHistory.length - 1] 
    : null;
  const lastPaymentDate = lastPayment?.paidAt ? new Date(lastPayment.paidAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'No payments yet';
  const lastPaymentTxn = lastPayment?.transactionId || 'N/A';
  const invoiceCount = data?.paymentHistory?.length || 0;

  // Dynamic Documents Setup
  const dDocs = useMemo(() => {
      return [
        { name: "Profile Update", status: "Pending" },
        { name: "GST Certificate", status: "Completed" },
        { name: "Aadhar Card", status: "Completed" },
        { name: "PAN Card", status: "Completed" },
        { name: "MSME Document", status: "Pending" },
        { name: "Product Brochure / Catalog", status: "Pending" },
      ] as { name: string; status: DocStatus }[];
  }, [data]);

  return (
    <div className="flex flex-col lg:flex-row gap-2 w-full">

      <div className="w-full lg:w-[64.3%] flex flex-col md:flex-row gap-2">
        {/* ── Payment Overview ── */}
        <div
          className="flex-1 bg-white rounded-lg px-4 py-3"
          style={{ boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-[12px] font-bold text-[#1a3a7c] uppercase tracking-wider">Payment Overview</span>
            <button onClick={onViewPayment} className="text-[10px] font-semibold text-blue-500 hover:text-blue-700 transition-colors">View Details</button>
          </div>

          {/* Top card - single unified */}
          <div className="bg-[#f0faf5] border border-[#d1f0e0] rounded-lg px-4 py-2 mb-4 flex flex-col sm:flex-row gap-2 sm:gap-6">
            <div className="flex-1">
              <p className="text-[10px] font-semibold text-[#1a3a7c] mb-1">Total Paid</p>
              <p className="text-[14px] font-bold text-[#127445]">{totalPaidLabel}</p>
            </div>
            <div className="w-full h-px sm:w-px sm:h-auto bg-[#c8e8d8]" />
            <div className="flex-1">
              <p className="text-[10px] font-semibold text-[#1a3a7c] mb-1">Last Payment</p>
              <p className="text-[10px] font-bold text-[#1a3a7c]">{lastPaymentDate}</p>
              <p className="text-[9px] text-[#1a3a7c]">{lastPaymentTxn}</p>
            </div>
          </div>

          {/* Donut + legend */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <DonutChart segments={[
              { percent: paymentBreakdown.paid.percent, color: paymentBreakdown.paid.color, label: paymentBreakdown.paid.label, amount: paymentBreakdown.paid.amount },
              { percent: paymentBreakdown.pending.percent, color: paymentBreakdown.pending.color, label: paymentBreakdown.pending.label, amount: paymentBreakdown.pending.amount },
              { percent: paymentBreakdown.overdue.percent, color: paymentBreakdown.overdue.color, label: paymentBreakdown.overdue.label, amount: paymentBreakdown.overdue.amount }
            ]} />
            <div className="flex-1 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold text-[#1a3a7c]">Payments Received : </span>
                <span className="text-[10px] font-bold text-[#1a3a7c]">{invoiceCount} Nos</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold text-[#1a3a7c]">Total Billed : </span>
                <span className="text-[10px] font-bold text-[#1a3a7c]">{totalBilledLabel}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: paymentBreakdown.paid.color }} />
                  <span className="text-[10px] font-semibold text-[#1a3a7c]">{paymentBreakdown.paid.label}</span>
                </div>
                <span className="text-[10px] font-semibold text-[#1a3a7c]">{paymentBreakdown.paid.amount}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: paymentBreakdown.pending.color }} />
                  <span className="text-[10px] font-semibold text-[#1a3a7c]">{paymentBreakdown.pending.label}</span>
                </div>
                <span className="text-[10px] font-semibold text-[#1a3a7c]">{paymentBreakdown.pending.amount}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: paymentBreakdown.overdue.color }} />
                  <span className="text-[10px] font-semibold text-[#1a3a7c]">{paymentBreakdown.overdue.label}</span>
                </div>
                <span className="text-[10px] font-semibold text-[#1a3a7c]">{paymentBreakdown.overdue.amount}</span>
              </div>
              <div className="border-t border-gray-100 pt-2 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-[#1a3a7c]">Total Amount</span>
                <span className="text-[12px] font-bold text-[#1a3a7c]">{totalBilledLabel}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Document Status ── */}
        <div
          className="flex-1 bg-white rounded-lg px-4 py-3"
          style={{ boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-bold text-[#1a3a7c] uppercase tracking-wider">Document Status</span>
              <button onClick={onViewDocuments} className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-2 py-0.5 rounded text-[9px] font-bold transition-colors">
                <Plus size={10} strokeWidth={3} /> ADD
              </button>
            </div>
            <button onClick={onViewDocuments} className="text-[10px] font-semibold text-blue-500 hover:text-blue-700 transition-colors">View All</button>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            {dDocs.map((doc, i) => {
              const cfg = DOC_STATUS_CONFIG[doc.status];
              const Icon = cfg.icon;
              return (
                <div key={i} className={`flex items-center justify-between px-4 py-2 ${i !== dDocs.length - 1 ? "border-b border-gray-200" : ""}`}>
                  <div className="flex items-center gap-3">
                    <FileText size={14} className="text-[#8fa3c8] shrink-0" strokeWidth={1.5} />
                    <span className="text-[10px] font-medium text-[#1a3a7c]">{doc.name}</span>
                  </div>
                  <div className={`flex items-center gap-2 ${cfg.color}`}>
                    <span className="text-[10px] font-medium">{cfg.label}</span>
                    <Icon size={14} strokeWidth={1.8} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Upcoming Events ── */}
      <div
        className="w-full lg:w-[35%] shrink-0 bg-white rounded-lg p-3 flex flex-col justify-between"
        style={{ boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px", minHeight: "220px" }}
      >
        <div>
          <div className="flex items-center justify-between mb-2 px-2">
            <span className="text-[12px] font-bold text-[#1a3a7c] uppercase tracking-wider">Upcoming Events</span>
            {/* Pagination Controls in Header */}
            {!isLoadingEvents && totalEventPages > 1 && (
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => setEventPage(p => Math.max(1, p - 1))}
                        disabled={eventPage === 1}
                        className="text-[#1a3a7c] disabled:opacity-30 hover:bg-gray-100 p-0.5 rounded-md transition-colors"
                    >
                        <ChevronLeft size={14} />
                    </button>
                    <span className="text-[9px] font-medium text-gray-500 whitespace-nowrap">
                        {eventPage} / {totalEventPages}
                    </span>
                    <button 
                        onClick={() => setEventPage(p => Math.min(totalEventPages, p + 1))}
                        disabled={eventPage === totalEventPages}
                        className="text-[#1a3a7c] disabled:opacity-30 hover:bg-gray-100 p-0.5 rounded-md transition-colors"
                    >
                        <ChevronRight size={14} />
                    </button>
                </div>
            )}
          </div>

          <div className="space-y-2">
            {isLoadingEvents ? (
              <div className="flex justify-center py-4">
                  <div className="w-5 h-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
              </div>
            ) : paginatedEvents.length > 0 ? (
              paginatedEvents.map((ev, i) => {
                const parts = ev.dateString.split(' ');
                const day = parts[0] || '';
                const month = parts[1] || '';
                return (
                  <div key={i} className="flex items-stretch gap-0 border border-gray-100 rounded-lg overflow-hidden">
                    {/* Date box */}
                    <div className={`${ev.colorClass} shrink-0 w-10 flex flex-col items-center justify-center py-1`}>
                      <p className={`text-[13px] font-black leading-none`}>{day}</p>
                      <p className={`text-[9px] font-bold uppercase tracking-widest mt-0.5`}>{month}</p>
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0 py-1 pl-4 pr-2 flex flex-col justify-center">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] font-bold text-[#1a3a7c] leading-tight truncate mb-1">{ev.title}</p>
                          <div className="flex items-center gap-1">
                            <MapPin size={11} className="text-[#1a3a7c] shrink-0" />
                            <span className="text-[10px] text-[#1a3a7c] truncate">{ev.location}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end shrink-0 pt-0.5">
                          <p className="text-[8px] text-black whitespace-nowrap font-medium">{ev.fullDate}</p>
                          {ev.time && (
                            <p className="text-[8px] text-black whitespace-nowrap mt-0.5">{ev.time}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-xs text-gray-500 py-4">No upcoming events right now.</div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}