import { CheckCircle, Clock, MinusCircle, FileText, MapPin, ChevronLeft, ChevronRight, Plus } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type DocStatus = "Completed" | "Pending" | "Not Uploaded";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const DOC_STATUS_CONFIG: Record<DocStatus, { label: string; color: string; icon: any }> = {
  "Completed": { label: "Completed", color: "text-green-500", icon: CheckCircle },
  "Pending": { label: "Pending", color: "text-amber-500", icon: Clock },
  "Not Uploaded": { label: "Not Uploaded", color: "text-gray-400", icon: MinusCircle },
};

import { useState, useEffect, useRef } from 'react';
import { useExhibitorCtx } from "@/context/ExhibitorContext";
import { API_URL } from "@/lib/api";
import { Link, useNavigate } from 'react-router-dom';

const hasFile = (value: any) => value !== undefined && value !== null && String(value).trim() !== "";

const registrationDocs = (data: any): { name: string; status: DocStatus }[] => [
  { name: "Company Logo", status: hasFile(data?.companyLogoUrl) ? "Completed" : "Not Uploaded" },
  { name: "PAN Card", status: hasFile(data?.panCardFrontUrl) ? "Completed" : "Not Uploaded" },
  { name: "GST Certificate", status: hasFile(data?.gstCertificateUrl) ? "Completed" : "Not Uploaded" },
  { name: "Cancelled Cheque", status: hasFile(data?.cancelledChequeUrl) ? "Completed" : "Not Uploaded" },
  { name: "Representative Photo", status: hasFile(data?.representativePhotoUrl) ? "Completed" : "Not Uploaded" },
  { name: "Registration PDF", status: hasFile(data?.registrationPdfUrl) ? "Completed" : "Not Uploaded" },
];

const normalizeEvent = (event: any, index = 0) => {
  const rawDate = event?.startDate || event?.date || event?.eventDate;
  const date = rawDate ? new Date(rawDate) : null;
  const isValidDate = date && !Number.isNaN(date.getTime());
  const colors = [
    "bg-blue-50 text-blue-700",
    "bg-emerald-50 text-emerald-700",
    "bg-orange-50 text-orange-700",
    "bg-purple-50 text-purple-700",
  ];
  return {
    title: event?.title || event?.name || "Upcoming Event",
    location: event?.location || "Location TBA",
    dateString: isValidDate ? date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }) : "TBA",
    fullDate: isValidDate ? date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "Date TBA",
    time: event?.time || "",
    colorClass: event?.colorClass || colors[index % colors.length],
  };
};

function useCountUp(end: number, duration: number = 2500, active: boolean = true) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!active) return;
        let startTime: number | null = null;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
            
            // easeOutQuart
            const easeProgress = 1 - Math.pow(1 - percentage, 4);
            
            setCount(end * easeProgress);

            if (progress < duration) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, active]);

    return count;
}

function DonutChart({ segments }: { segments: { percent: number; color: string; label: string; amount: string }[] }) {
  const r = 36, cx = 44, cy = 44;
  const circ = 2 * Math.PI * r;

  const [tooltip, setTooltip] = useState<{ x: number, y: number, label: string, amount: string, color: string } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const progress = useCountUp(1, 2500, isVisible);

  let currentOffset = 0;

  return (
    <div className="relative inline-flex items-center justify-center" ref={containerRef}>
      <svg width="88" height="88" viewBox="0 0 88 88" onMouseLeave={() => setTooltip(null)}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e5e7eb" strokeWidth="10" />
        {segments.map((seg, i) => {
          if (seg.percent <= 0) return null;
          const animatedPercent = seg.percent * progress;
          const dash = (animatedPercent / 100) * circ;
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
  const navigate = useNavigate();

  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [docsList, setDocsList] = useState<{ name: string; status: DocStatus }[]>([]);
  const [eventPage, setEventPage] = useState(1);
  const eventsPerPage = 5;
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);

  useEffect(() => {
    const fetchDocsAndEvents = async () => {
      setIsLoadingEvents(true);
      try {
        const eventsRes = await fetch(`${API_URL}/upcoming-events`);
        const result = await eventsRes.json();
        if (result.success && Array.isArray(result.data)) {
          setUpcomingEvents(result.data.map(normalizeEvent));
        } else if (data?.eventId) {
          setUpcomingEvents([normalizeEvent(data.eventId)]);
        }

        const clientId = data?._id;
        if (clientId) {
          const [reqRes, docsRes] = await Promise.all([
            fetch(`${API_URL}/document-requirements`),
            fetch(`${API_URL}/client-documents/${clientId}`)
          ]);
          const reqData = await reqRes.json();
          const docsData = await docsRes.json();

          if (Array.isArray(reqData)) {
            const uploadedMap = new Map();
            if (Array.isArray(docsData)) {
              docsData.forEach((d: any) => uploadedMap.set(d.document_name, d));
            }

            const formatted = reqData.map((d: any) => {
              const uploaded = uploadedMap.get(d.document_name);
              let status: DocStatus = "Not Uploaded";
              if (uploaded?.status === "Approved") status = "Completed";
              else if (uploaded?.status === "Pending" || uploaded?.status === "Rejected") status = "Pending";
              
              return {
                name: d.document_name,
                status
              };
            });
            setDocsList(formatted);
          } else {
            setDocsList(registrationDocs(data));
          }
        } else {
          setDocsList(registrationDocs(data));
        }
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setUpcomingEvents(data?.eventId ? [normalizeEvent(data.eventId)] : []);
        setDocsList(registrationDocs(data));
      } finally {
        setIsLoadingEvents(false);
      }
    };
    fetchDocsAndEvents();
  }, [data?._id]);

  const totalEventPages = Math.ceil(upcomingEvents.length / eventsPerPage);
  const paginatedEvents = upcomingEvents.slice((eventPage - 1) * eventsPerPage, eventPage * eventsPerPage);

  // Dynamic Payment Setup
  const currencySymbol = data?.participation?.currency === 'USD' ? '$' : '₹';
  const formatAmt = (num: number) => `${currencySymbol} ${num?.toLocaleString('en-IN') || '0'}`;

  const billedAmount = data?.participation?.total || 0;
  const totalAmount = data?.financeBreakdown?.netPayable || billedAmount;
  const paidAmount = data?.amountPaid || 0;
  const balanceAmount = data?.balanceAmount || 0;
  
  // Hardcode overdue for demo if not provided, else derive it properly. We will just use balance as pending.
  const overdueAmount = data?.status === 'payment-failed' ? balanceAmount : 0;
  const pendingAmount = balanceAmount > 0 && overdueAmount === 0 ? balanceAmount : 0;
  
  const totalPaidLabel = formatAmt(paidAmount);
  const totalBilledLabel = formatAmt(billedAmount);
  const totalAmountLabel = formatAmt(totalAmount);

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

  return (
    <div className="flex flex-col lg:flex-row gap-2 w-full">

      <div className="w-full lg:w-[64.3%] flex flex-col md:flex-row gap-2">
        {/* ── Payment Overview ── */}
        <div
          className="flex-1 bg-white rounded-lg border border-slate-100 overflow-hidden flex flex-col"
          style={{ boxShadow: 'rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em', fontFamily: 'Inter, sans-serif' }}
        >
          <div className="flex items-center justify-between bg-slate-100 border-b border-slate-200 px-3 py-2.5">
            <h2 className="text-[12px] font-bold text-[#1a3a7c] uppercase tracking-wider leading-none">Payment Overview</h2>
            <button onClick={onViewPayment || (() => navigate('/exhibitor-dashboard/payments'))} className="text-[10px] text-emerald-600 font-bold hover:text-emerald-700 uppercase cursor-pointer leading-none">View Details</button>
          </div>
          <div className="p-4 flex-1">

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
                <span className="text-[10px] font-semibold text-[#1a3a7c]">Net Payable Amount</span>
                <span className="text-[12px] font-bold text-[#1a3a7c]">{totalAmountLabel}</span>
              </div>
            </div>
          </div>
          </div>
        </div>

        {/* ── Document Status ── */}
        <div
          className="flex-1 bg-white rounded-lg border border-slate-100 overflow-hidden flex flex-col"
          style={{ boxShadow: 'rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em', fontFamily: 'Inter, sans-serif' }}
        >
          <div className="flex items-center justify-between bg-slate-100 border-b border-slate-200 px-3 py-2.5">
            <div className="flex items-center gap-2">
              <h2 className="text-[12px] font-bold text-[#1a3a7c] uppercase tracking-wider leading-none">Document Status</h2>
              <Link to="/exhibitor-dashboard/document-center" className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-1.5 py-0.5 rounded-sm text-[8px] font-bold transition-colors uppercase">
                <Plus size={10} strokeWidth={3} /> ADD
              </Link>
            </div>
            <Link to="/exhibitor-dashboard/document-center" className="text-[10px] text-emerald-600 font-bold hover:text-emerald-700 uppercase cursor-pointer leading-none">View All</Link>
          </div>
          <div className="p-3 flex-1 flex flex-col justify-center">

          <div className="border border-gray-200 rounded-lg overflow-y-auto max-h-[220px] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400">
            {docsList.map((doc, i) => {
              const cfg = DOC_STATUS_CONFIG[doc.status];
              const Icon = cfg.icon;
              return (
                <div key={i} className={`flex items-center justify-between px-4 py-2 ${i !== docsList.length - 1 ? "border-b border-gray-200" : ""}`}>
                  <div className="flex items-center gap-3">
                    <FileText size={14} className="text-[#8fa3c8] shrink-0" strokeWidth={1.5} />
                    <span className="text-[10px] font-medium text-[#1a3a7c]">{doc.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`flex items-center gap-1.5 ${cfg.color}`}>
                      <span className="text-[10px] font-medium">{cfg.label}</span>
                      <Icon size={14} strokeWidth={1.8} />
                    </div>
                    {(doc.status === "Pending" || doc.status === "Not Uploaded") && (
                      <Link to="/exhibitor-dashboard/document-center" className="text-[9px] bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold px-2 py-0.5 rounded transition-colors border border-blue-200">
                        Add
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
            {!docsList.length && (
              <div className="px-4 py-4 text-[10px] text-slate-400 font-semibold text-center">
                No document requirements found.
              </div>
            )}
          </div>
          </div>
        </div>
      </div>

      {/* ── Upcoming Events ── */}
      <div
        className="w-full lg:w-[35%] shrink-0 bg-white rounded-lg border border-slate-100 overflow-hidden flex flex-col"
        style={{ boxShadow: 'rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em', minHeight: "220px", fontFamily: 'Inter, sans-serif' }}
      >
        <div className="flex items-center justify-between bg-slate-100 border-b border-slate-200 px-3 py-2.5 shrink-0">
            <h2 className="text-[12px] font-bold text-[#1a3a7c] uppercase tracking-wider leading-none">Upcoming Events</h2>
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
                        className="text-[#1a3a7c] disabled:opacity-30 hover:bg-gray-200 p-0.5 rounded-md transition-colors"
                    >
                        <ChevronRight size={14} />
                    </button>
                </div>
            )}
        </div>

        <div className="p-3 flex-1 flex flex-col">
          <div className="space-y-2 flex-1">
            {isLoadingEvents ? (
              <div className="flex justify-center py-4">
                  <div className="w-5 h-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
              </div>
            ) : paginatedEvents.length > 0 ? (
              paginatedEvents.map((ev, i) => {
                const parts = String(ev.dateString || '').split(' ');
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
