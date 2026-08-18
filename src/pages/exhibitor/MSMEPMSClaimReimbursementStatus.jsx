import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Banknote,
  Bell,
  Check,
  CheckCircle2,
  Clock,
  Download,
  FileCheck2,
  FileText,
  Headphones,
  Info,
  Landmark,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  Phone,
  Receipt,
  Search,
  ShieldCheck,
  Upload,
} from "lucide-react";
import { useExhibitorCtx } from "@/context/ExhibitorContext";
import { useMsmePmsApplication } from "@/hooks/useMsmePmsApplication";

const PMS_STAGE_LABELS = ["Application & Submission", "Claim Documents", "Claim & Reimbursement"];

const DOC_PURPOSE = {
  udyam: "To verify MSME registration",
  onlineApplicationPrintout: "To verify MSME portal registration",
  stallBookingLetter: "To verify stall allocation",
  taxInvoice: "To verify eligible expenditure",
  paymentProof: "To verify payment made to organiser",
  bankMandate: "To verify bank account for payout",
  participationProof: "To verify participation in the event",
  productActivityDetails: "To verify exhibited products / activity",
  caCertificateTurnover: "To verify annual turnover",
  declarationLetterhead: "Signed declaration for the claim",
  authorityLetter: "To verify authorized signatory",
  otherSupportingDocument: "Additional supporting document",
};

const safe = (value, fallback = "—") => (value === null || value === undefined || value === "" ? fallback : value);
const fmtDate = (d) => (d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—");
const fmtDateTime = (d) => (d ? new Date(d).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "—");
const daysLeft = (d) => {
  if (!d) return null;
  const diff = Math.ceil((new Date(d).setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0)) / 86400000);
  return diff;
};

const STATUS_TONE = {
  Approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Sanctioned: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Received: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Processed: "bg-blue-50 text-blue-700 border-blue-200",
  "Under Review": "bg-orange-50 text-orange-700 border-orange-200",
  "Under Scrutiny": "bg-orange-50 text-orange-700 border-orange-200",
  "Query Raised": "bg-amber-50 text-amber-700 border-amber-200",
  Rejected: "bg-red-50 text-red-700 border-red-200",
  Pending: "bg-slate-100 text-slate-500 border-slate-200",
};
const statusTone = (s) => STATUS_TONE[s] || "bg-slate-100 text-slate-500 border-slate-200";

function StageStepper({ stage }) {
  const current = Math.min(Math.max(Number(stage) || 1, 1), 3);
  return (
    <div className="flex items-center gap-1">
      {PMS_STAGE_LABELS.map((label, i) => {
        const num = i + 1;
        const done = num < current;
        const active = num === current;
        return (
          <Fragment key={label}>
            <div className="flex flex-col items-center text-center shrink-0 px-1">
              <div className={`w-9 h-9 rounded-full grid place-items-center border-2 text-[13px] font-bold ${done ? "bg-emerald-600 border-emerald-600 text-white" : active ? "bg-[#087536] border-[#087536] text-white" : "bg-white border-slate-200 text-slate-400"}`}>
                {done ? <Check size={16} /> : num}
              </div>
              <span className="mt-1 text-[10px] font-bold text-slate-700 whitespace-nowrap">{label}</span>
              <span className={`text-[9.5px] font-semibold ${done ? "text-emerald-600" : active ? "text-[#087536]" : "text-slate-400"}`}>
                {done ? "Completed" : active ? "Current Stage" : "Pending"}
              </span>
            </div>
            {num < PMS_STAGE_LABELS.length && <div className={`w-16 sm:w-24 h-[2px] mt-[-18px] ${num < current ? "bg-emerald-500" : "bg-slate-200"}`} />}
          </Fragment>
        );
      })}
    </div>
  );
}

function Card({ icon: Icon, title, tone = "plain", action, children, className = "" }) {
  const toneMap = {
    emerald: { bg: "bg-[#f4fff8]", text: "text-[#087536]", border: "border-l-4 border-l-emerald-500", iconWrap: "rounded-full bg-white" },
    orange: { bg: "bg-orange-50", text: "text-orange-600", border: "border-l-4 border-l-orange-500", iconWrap: "rounded-full bg-white" },
    blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-l-4 border-l-blue-500", iconWrap: "rounded-full bg-white" },
    violet: { bg: "bg-violet-50", text: "text-violet-600", border: "border-l-4 border-l-violet-500", iconWrap: "rounded-full bg-white" },
    plain: { bg: "bg-white", text: "text-slate-800", border: "", iconWrap: "" },
  };
  const c = toneMap[tone] || toneMap.plain;
  return (
    <section className={`min-w-0 rounded-xl border border-slate-200 ${c.border} ${c.bg} p-2.5 ${className}`}>
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          {Icon && (
            <span className={`grid h-6 w-6 shrink-0 place-items-center ${c.iconWrap} ${c.text}`}>
              <Icon size={tone === "plain" ? 14 : 15} strokeWidth={2} />
            </span>
          )}
          <strong className={`text-[12.5px] font-bold ${c.text}`}>{title}</strong>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function InlineField({ label, value, children }) {
  return (
    <div className="flex items-center justify-between gap-2 border-b border-slate-100 py-0.5 last:border-b-0">
      <span className="text-[10px] font-semibold text-slate-400 shrink-0">{label}</span>
      {children || <strong className="text-[11px] font-bold text-slate-800 text-right">{value}</strong>}
    </div>
  );
}

function ProgressStep({ icon: Icon, index, title, date, note, state, isLast }) {
  const done = state === "done";
  const active = state === "active";
  return (
    <div className="relative flex flex-1 flex-col items-center text-center min-w-0">
      {!isLast && <div className={`hidden sm:block absolute top-[19px] left-[calc(50%+24px)] w-[calc(100%-48px)] h-0 border-t-2 ${done ? "border-emerald-400 border-solid" : "border-slate-200 border-dashed"}`} />}
      <div className="relative">
        <span className={`grid h-10 w-10 place-items-center rounded-full border-2 ${done ? "border-emerald-500 bg-emerald-50 text-emerald-600" : active ? "border-orange-400 bg-orange-50 text-orange-600" : "border-slate-200 bg-slate-50 text-slate-400"}`}>
          {state === "pending" ? <Lock size={14} /> : <Icon size={17} strokeWidth={1.7} />}
        </span>
        <span className={`absolute -bottom-0.5 -right-0.5 grid h-4 w-4 place-items-center rounded-full text-[8px] font-bold text-white ${done ? "bg-emerald-500" : active ? "bg-orange-500" : "bg-slate-300"}`}>{index}</span>
      </div>
      <b className="mt-1.5 text-[10px] font-bold text-slate-800">{title}</b>
      <span className="mt-0.5 text-[9px] font-semibold text-slate-500">{date}</span>
      <span className={`mt-0.5 text-[9px] font-bold ${done ? "text-emerald-600" : active ? "text-orange-600" : "text-slate-400"}`}>{note}</span>
    </div>
  );
}

export default function MSMEPMSClaimReimbursementStatus() {
  const navigate = useNavigate();
  const [showQueryDetail, setShowQueryDetail] = useState(false);
  const { data: exhibitorData } = useExhibitorCtx();
  const pms = useMsmePmsApplication(exhibitorData);

  if (pms.loading) {
    return (
      <div className="flex h-[60vh] w-full items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-[#087536]" />
      </div>
    );
  }

  const data = pms.data || {};
  const claim = data.claimSubmission || {};
  const portal = data.msmePortal || {};
  const sanction = data.sanction || {};
  const reimbursement = data.reimbursement || {};
  const rm = data.pmsCoordinator;
  const actionRequired = data.actionRequired;
  const hasOpenAction = actionRequired && actionRequired.resolved === false;
  const documentsByType = new Map();
  (data.documents || []).forEach((d) => {
    const list = documentsByType.get(d.documentType) || [];
    list.push(d);
    documentsByType.set(d.documentType, list);
  });
  const claimDocs = Array.isArray(data.pmsClaimDocuments) ? data.pmsClaimDocuments : [];
  const pendingDocs = claimDocs.filter((doc) => {
    const entries = documentsByType.get(doc.type) || [];
    return !entries.some((e) => e.path && !e.notApplicable) && !entries.some((e) => e.notApplicable);
  });
  const statusHistory = Array.isArray(data.statusHistory) ? [...data.statusHistory].sort((a, b) => new Date(b.changedAt) - new Date(a.changedAt)) : [];

  const portalStatus = claim.portalStatus || portal.currentStatus || "";
  const submitted = Boolean(claim.claimNo && claim.submittedOn);
  const step1Done = submitted;
  const step2Done = portalStatus === "Approved" || sanction.status !== "Pending";
  const step2Active = submitted && !step2Done;
  const step3Done = sanction.status === "Sanctioned";
  const step3Active = step2Done && !step3Done && sanction.status !== "Rejected";
  const step4Done = reimbursement.status === "Received";
  const step4Active = step3Done && !step4Done;

  const totalClaimed = Number(data.claim?.totalClaimed || 0);
  const eligibleAmount = Number(data.claim?.eligibleAmount || 0);
  const reimbursementPct = totalClaimed > 0 ? Math.min(100, Math.round((eligibleAmount / totalClaimed) * 100)) : null;
  const eventDateRange = data.event?.startDate && data.event?.endDate
    ? `${fmtDate(data.event.startDate)} – ${fmtDate(data.event.endDate)}`
    : "—";

  return (
    <div className="flex flex-col gap-3 p-1">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-[19px] font-bold text-[#061743]">
            <ShieldCheck size={20} className="text-[#087536]" />
            Claim &amp; Reimbursement Status
          </h1>
          <p className="mt-1 text-[11.5px] text-slate-500">Track your PMS reimbursement journey from claim submission to payment.</p>
        </div>
        <div className="overflow-x-auto">
          <StageStepper stage={3} />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-2 items-start">
      <div className="flex min-w-0 flex-col gap-2">

      {/* SUMMARY BAR */}
      <section className="min-w-0 rounded-xl border border-slate-200 border-l-4 border-l-emerald-500 bg-[#f4fff8] p-2.5">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 items-center">
          <div className="col-span-2 sm:col-span-1 flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-emerald-600">
              <Receipt size={19} strokeWidth={1.6} />
            </span>
          </div>
          <div><span className="block text-[9.5px] font-semibold text-slate-400">Claim Submitted On</span><strong className="text-[11.5px] font-bold text-slate-800">{fmtDateTime(claim.submittedOn)}</strong></div>
          <div><span className="block text-[9.5px] font-semibold text-slate-400">Claim No.</span><strong className="text-[11.5px] font-bold text-slate-800">{safe(claim.claimNo)}</strong></div>
          <div><span className="block text-[9.5px] font-semibold text-slate-400">Udyam Registration No.</span><strong className="text-[11.5px] font-bold text-slate-800">{safe(data.udyamNumber || data.msme?.udyamRegNo)}</strong></div>
          <div>
            <span className="block text-[9.5px] font-semibold text-slate-400">MSME Portal Status</span>
            {portalStatus ? <span className={`inline-block mt-0.5 rounded-full text-[10px] font-bold px-2 py-0.5 border ${statusTone(portalStatus)}`}>{portalStatus}</span> : <strong className="text-[11.5px] font-bold text-slate-800">—</strong>}
          </div>
          <div><span className="block text-[9.5px] font-semibold text-slate-400">Last Updated On</span><strong className="text-[11.5px] font-bold text-slate-800">{fmtDateTime(claim.lastStatusChecked)}</strong></div>
          <div><span className="flex items-center gap-1 text-[9.5px] font-semibold text-slate-400">Estimated Reimbursement <Info size={10} /></span><strong className="text-[13px] font-bold text-emerald-600">{eligibleAmount ? `Up to ₹${eligibleAmount.toLocaleString("en-IN")}` : "—"}</strong></div>
        </div>
      </section>

      {/* CLAIM PROGRESS */}
      <Card title="Claim Progress" tone="plain">
        <div className="flex items-start gap-2">
          <ProgressStep index={1} icon={FileCheck2} title="Claim Submitted" date={submitted ? fmtDate(claim.submittedOn) : "—"} note={step1Done ? "Completed" : "Pending"} state={step1Done ? "done" : "pending"} />
          <ProgressStep index={2} icon={Search} title="Under MSME Scrutiny" date={claim.nextReviewOn ? `Expected by ${fmtDate(claim.nextReviewOn)}` : ""} note={step2Done ? "Completed" : step2Active ? "Current Stage" : "Pending"} state={step2Done ? "done" : step2Active ? "active" : "pending"} />
          <ProgressStep index={3} icon={Landmark} title="Sanction" date={step3Done ? fmtDate(sanction.orderDate) : ""} note={step3Done ? "Completed" : step3Active ? "Current Stage" : "Yet to be processed"} state={step3Done ? "done" : step3Active ? "active" : "pending"} isLast={false} />
          <ProgressStep index={4} icon={Banknote} title="Reimbursement" date={step4Done ? fmtDate(reimbursement.paymentDate) : ""} note={step4Done ? "Received" : step4Active ? "Current Stage" : "Yet to be initiated"} state={step4Done ? "done" : step4Active ? "active" : "pending"} isLast />
        </div>
        {(step2Active || step3Active || step4Active || claim.remarks) && (
          <div className="mt-1.5 flex items-center gap-2 rounded-md bg-blue-50 px-2.5 py-1.5 text-[10px] text-blue-700">
            <Info size={12} className="shrink-0" />
            {claim.remarks || (step2Active
              ? "Your claim is under scrutiny by MSME-DFO. You will be notified once the sanction is issued."
              : step3Active
                ? "Your claim has cleared scrutiny and is awaiting sanction by MSME-DFO."
                : "Your claim has been sanctioned. Reimbursement will be processed shortly.")}
          </div>
        )}
      </Card>

      {/* ROW 3: INFO + TIMELINE + LATEST UPDATE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 items-start">
        <Card title="Claim & Reimbursement Information" tone="plain">
          <InlineField label="Event Name" value={safe(data.event?.name)} />
          <InlineField label="Event Dates" value={eventDateRange} />
          <InlineField label="Stall No." value={safe(data.event?.stallNumber)} />
          <InlineField label="Stall Size" value={data.event?.stallSize ? `${data.event.stallSize} Sqm` : "—"} />
          <InlineField label="Stall Amount (Incl. GST)" value={data.claim?.stallCharges ? `₹${Number(data.claim.stallCharges).toLocaleString("en-IN")}` : "—"} />
          <InlineField label="PMS Category Claimed" value={safe(data.category)} />
          <InlineField label="Reimbursement Percentage" value={reimbursementPct !== null ? `${reimbursementPct}%` : "—"} />
          <InlineField label="Maximum Eligible Amount" value="Up to ₹1,50,000" />
          <InlineField label="Claim Submitted By" value={safe(claim.submittedBy)} />
        </Card>

        <Card title="MSME Timeline" tone="plain">
          {statusHistory.length === 0 ? (
            <p className="py-3 text-center text-[10.5px] text-slate-400">No timeline events yet.</p>
          ) : (
            <ol className="relative max-h-[150px] overflow-y-auto border-l-2 border-slate-100 pl-3 space-y-2 pr-1">
              {statusHistory.slice(0, 6).map((h, i) => (
                <li key={i} className="relative">
                  <span className={`absolute -left-[19px] top-0.5 h-2.5 w-2.5 rounded-full ${i === 0 ? "bg-emerald-500" : "bg-slate-300"}`} />
                  <span className="text-[9px] font-semibold text-slate-400">{fmtDateTime(h.changedAt)}</span>
                  {h.status && <b className="mt-0.5 block text-[10px] font-bold text-slate-700">{h.status}</b>}
                  {h.note && <p className="mt-0.5 text-[9.5px] text-slate-500">{h.note}</p>}
                </li>
              ))}
            </ol>
          )}
          <button type="button" className="mt-2 w-full rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-bold text-slate-600 hover:bg-slate-50">View Full Timeline</button>
        </Card>

        {hasOpenAction ? (
          <Card icon={Bell} title="Latest MSME Update" tone="plain" action={<span className="rounded-full bg-orange-500 px-2 py-0.5 text-[9px] font-bold text-white">New</span>}>
            <span className="text-[9.5px] font-semibold text-slate-400">{fmtDateTime(actionRequired.createdAt)}</span>
            <b className="mt-1 block text-[11px] font-bold text-slate-800">Query Raised by MSME-DFO</b>
            <p className="mt-1 text-[10px] text-slate-600">{actionRequired.message}</p>
            {showQueryDetail && actionRequired.dueDate && (
              <p className="mt-1 text-[9.5px] font-semibold text-red-600">Due Date: {fmtDate(actionRequired.dueDate)}</p>
            )}
            <div className="mt-2 flex flex-col gap-1.5">
              <button type="button" onClick={() => setShowQueryDetail((v) => !v)} className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-bold text-slate-600 hover:bg-slate-50">
                {showQueryDetail ? "Hide Query Details" : "View Query Details"}
              </button>
              <button type="button" onClick={() => navigate("/exhibitor-dashboard/msme/claim-documents")} className="flex items-center justify-center gap-1.5 rounded-md bg-[#087536] px-3 py-1.5 text-[10px] font-bold text-white hover:bg-[#06652f]">
                <Upload size={12} /> Upload / Submit Response
              </button>
            </div>
          </Card>
        ) : (
          <Card icon={CheckCircle2} title="Latest MSME Update" tone="plain">
            <p className="text-[10.5px] text-slate-500">No open queries right now — your claim is progressing normally.</p>
          </Card>
        )}
      </div>

      {/* UPCOMING DOCUMENT DUE DATES */}
      <Card icon={Clock} title="Upcoming Document Due Dates" tone="plain">
        {pendingDocs.length === 0 ? (
          <p className="py-3 text-center text-[10.5px] text-slate-400">No pending documents right now.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[9px] font-bold uppercase text-slate-400 border-b border-slate-100">
                  <th className="py-1.5 px-1">Document Name</th>
                  <th className="py-1.5 px-1">Purpose</th>
                  <th className="py-1.5 px-1">Due Date</th>
                  <th className="py-1.5 px-1">Days Left</th>
                  <th className="py-1.5 px-1">Status</th>
                  <th className="py-1.5 px-1 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingDocs.map((doc) => {
                  const dl = hasOpenAction && actionRequired?.dueDate ? daysLeft(actionRequired.dueDate) : null;
                  return (
                    <tr key={doc.type} className="border-b border-slate-50 text-[10.5px]">
                      <td className="py-1.5 px-1 font-semibold text-slate-700">{doc.label}</td>
                      <td className="py-1.5 px-1 text-slate-500">{DOC_PURPOSE[doc.type] || "Required for claim verification"}</td>
                      <td className="py-1.5 px-1 text-slate-500">{hasOpenAction && actionRequired?.dueDate ? fmtDate(actionRequired.dueDate) : "—"}</td>
                      <td className={`py-1.5 px-1 font-semibold ${dl !== null && dl <= 3 ? "text-red-600" : "text-slate-500"}`}>{dl !== null ? `${dl} Days Left` : "—"}</td>
                      <td className="py-1.5 px-1"><span className="rounded-full bg-orange-50 px-1.5 py-0.5 text-[9px] font-bold text-orange-600">Pending</span></td>
                      <td className="py-1.5 px-1 text-right">
                        <button type="button" onClick={() => navigate("/exhibitor-dashboard/msme/claim-documents")} className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-[9.5px] font-bold text-slate-600 hover:bg-slate-50">
                          <Upload size={10} /> Upload Now
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        <button type="button" onClick={() => navigate("/exhibitor-dashboard/msme/claim-documents")} className="mt-2 flex items-center gap-1 text-[10.5px] font-bold text-blue-600 hover:underline">
          View All Documents
        </button>
      </Card>

      </div>

      {/* SIDEBAR: NOTES + SUPPORT + QUICK LINKS */}
      <div className="flex min-w-0 flex-col gap-2">
        <Card icon={Info} title="Important Notes" tone="plain">
          <ul className="space-y-1.5 text-[10.5px] text-slate-600">
            <li className="flex items-start gap-1.5"><Check size={12} className="mt-0.5 shrink-0 text-emerald-600" /> Reimbursement is subject to approval by MSME-DFO.</li>
            <li className="flex items-start gap-1.5"><Check size={12} className="mt-0.5 shrink-0 text-emerald-600" /> Maximum reimbursement limit is ₹1,50,000.</li>
            <li className="flex items-start gap-1.5"><Check size={12} className="mt-0.5 shrink-0 text-emerald-600" /> Ensure all documents are correct and uploaded.</li>
            <li className="flex items-start gap-1.5"><Check size={12} className="mt-0.5 shrink-0 text-emerald-600" /> Stay updated on your claim status regularly.</li>
          </ul>
        </Card>

        <Card icon={Headphones} title="PMS Support Contact" tone="plain">
          {rm ? (
            <>
              <div className="flex items-center gap-2">
                {rm.photo ? (
                  <img src={rm.photo} alt={rm.name} className="h-10 w-10 rounded-full object-cover" />
                ) : (
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-blue-50 text-blue-600 text-[11px] font-bold">{rm.initials || "RM"}</span>
                )}
                <div className="min-w-0">
                  <strong className="block text-[12px] font-bold text-slate-800 truncate">{rm.name}</strong>
                  <span className="text-[9.5px] text-slate-500">{rm.designation}</span>
                </div>
              </div>
              <div className="mt-2 space-y-1">
                {rm.phone && <a href={`tel:${rm.phone}`} className="flex items-center gap-1.5 text-[10px] text-slate-600 hover:text-blue-600"><Phone size={11} /> {rm.phone}</a>}
                {rm.email && <a href={`mailto:${rm.email}`} className="flex items-center gap-1.5 text-[10px] text-slate-600 hover:text-blue-600"><Mail size={11} /> {rm.email}</a>}
              </div>
              {rm.phone && (
                <a href={`tel:${rm.phone}`} className="mt-2 flex items-center justify-center gap-1.5 rounded-md bg-violet-600 px-3 py-1.5 text-[10px] font-bold text-white hover:bg-violet-700">
                  <Phone size={12} /> Contact Now
                </a>
              )}
            </>
          ) : (
            <p className="text-[10.5px] text-slate-400">Not yet assigned.</p>
          )}
        </Card>

        <Card title="Quick Links" tone="plain">
          <div className="space-y-1.5">
            <button type="button" onClick={() => navigate("/exhibitor-dashboard/msme/claim-documents")} className="flex w-full items-center gap-2 rounded-md border border-slate-100 bg-white px-2.5 py-2 text-left hover:bg-slate-50">
              <FileText size={15} className="text-violet-600 shrink-0" />
              <span><strong className="block text-[10.5px] font-bold text-slate-800">View Claim Documents</strong><span className="text-[9px] text-slate-400">Check uploaded documents</span></span>
            </button>
            <button type="button" onClick={() => navigate("/exhibitor-dashboard/msme/claim-documents")} className="flex w-full items-center gap-2 rounded-md border border-slate-100 bg-white px-2.5 py-2 text-left hover:bg-slate-50">
              <Upload size={15} className="text-blue-600 shrink-0" />
              <span><strong className="block text-[10.5px] font-bold text-slate-800">Upload Additional Document</strong><span className="text-[9px] text-slate-400">Submit missing or additional documents</span></span>
            </button>
            <button type="button" onClick={() => navigate("/exhibitor-dashboard/msme/claim-documents")} className="flex w-full items-center gap-2 rounded-md border border-slate-100 bg-white px-2.5 py-2 text-left hover:bg-slate-50">
              <MessageSquare size={15} className="text-orange-600 shrink-0" />
              <span><strong className="block text-[10.5px] font-bold text-slate-800">Respond to Query</strong><span className="text-[9px] text-slate-400">Reply to MSME queries</span></span>
            </button>
            <a href="https://dcmsme.gov.in/OM%20&%20PMS%20Scheme%20Guidelines.pdf" target="_blank" rel="noreferrer" className="flex w-full items-center gap-2 rounded-md border border-slate-100 bg-white px-2.5 py-2 text-left hover:bg-slate-50">
              <Download size={15} className="text-emerald-600 shrink-0" />
              <span><strong className="block text-[10.5px] font-bold text-slate-800">Download PMS Guidelines</strong><span className="text-[9px] text-slate-400">View scheme guidelines &amp; FAQs</span></span>
            </a>
          </div>
        </Card>
      </div>

      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
        <p className="flex items-center gap-2 text-[10px] text-slate-500">
          <ShieldCheck size={13} className="text-[#087536] shrink-0" />
          The above information is fetched from the MSME portal and updated regularly. For any discrepancy, please contact PMS Support.
        </p>
        <div className="flex gap-2">
          <button type="button" onClick={() => navigate("/exhibitor-dashboard/msme/claim-documents")} className="shrink-0 rounded-md border border-slate-200 bg-white px-3.5 py-1.5 text-[10.5px] font-bold text-slate-600 hover:bg-slate-50">
            Back
          </button>
          <button type="button" onClick={() => navigate("/exhibitor-dashboard/msme/application")} className="shrink-0 rounded-md bg-[#087536] px-4 py-1.5 text-[10.5px] font-bold text-white hover:bg-[#06652f]">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
