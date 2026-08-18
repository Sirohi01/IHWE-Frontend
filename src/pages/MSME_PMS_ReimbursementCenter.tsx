import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  CheckCircle2,
  Circle,
  Eye,
  Upload,
  Download,
  Phone,
  MessageCircle,
  Mail,
  Headphones,
  ArrowRight,
  FileText,
  Folder,
  Search,
  FileCheck2,
  Route,
  Save,
  Check,
  Loader2,
} from "lucide-react";

import aeroplane from "@/assets/msme-pm-scheme/aeroplane.webp"
import benefit from "@/assets/msme-pm-scheme/benfit.webp";
import courier from "@/assets/msme-pm-scheme/courier_and_logistics.webp"
import marketing from "@/assets/msme-pm-scheme/marketting_expense.webp"
import hotel_stay from "@/assets/msme-pm-scheme/hotel_stay.webp"
import stall from "@/assets/msme-pm-scheme/stall.webp"
import cta_image from "@/assets/msme-pm-scheme/cta_image.webp"

import { useExhibitorCtx } from "@/context/ExhibitorContext";
import { useMsmePmsApplication } from "@/hooks/useMsmePmsApplication";

/* ----------------------------- design tokens -----------------------------
   spacing: 4px & 8px only. one radius token (rounded-lg) everywhere.
   font sizes: 10px -> 16px only. */
const RADIUS = "rounded-lg";
const SCHEME_MAX_BENEFIT = 150000;

const heroCategories = [
  { icon: stall, label: "Stall Charges" },
  { icon: aeroplane, label: "Travel Expenses" },
  { icon: hotel_stay, label: "Hotel Stay" },
  { icon: courier, label: "Courier & Logistics" },
  { icon: marketing, label: "Marketing Expenses" },
];

// Required for every claim, plus one extra document type per selected
// expense category — mirrors REQUIRED_DOCUMENTS / requiredDocumentsFor in
// ihwe/controllers/msmePmsSchemeController.js so this checklist never drifts
// from what the backend will actually accept at submission.
const BASE_DOCS = [
  { type: "udyam", label: "Udyam Registration Certificate" },
  { type: "gst", label: "GST Certificate" },
  { type: "pan", label: "PAN Card" },
  { type: "aadhaar", label: "Aadhaar Card" },
  { type: "cheque", label: "Cancelled Cheque" },
  { type: "statement", label: "Bank Statement (Last 6 Months)" },
];
const EXPENSE_DOCS: Record<string, { type: string; label: string }[]> = {
  "Hotel Stay": [
    { type: "hotelInvoice", label: "Hotel Invoice" },
    { type: "hotelPayment", label: "Hotel Payment Proof" },
  ],
  "Travel": [
    { type: "travelExpense", label: "Travel Expense Proof" },
    { type: "travelInvoice", label: "Travel Invoice" },
  ],
  "Courier": [{ type: "courier", label: "Courier Receipt" }],
  "Marketing Material": [{ type: "marketing", label: "Marketing Expense Proof" }],
};

const ihweDocs = [
  "Tax Invoice",
  "Payment Receipt",
  "Stall Confirmation Letter",
  "Participation Certificate",
];

const fmtMoney = (n: number) => `₹${Number(n || 0).toLocaleString("en-IN")}`;
const fmtDate = (value: any) => {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
};

/* ------------------------------- primitives ------------------------------- */

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`border border-gray-200 ${RADIUS} p-2 flex flex-col gap-2 ${className}`}>
      {children}
    </div>
  );
}

type CardHeaderProps = {
  icon?: React.ElementType;
  iconBg: string;
  iconColor: string;
  title: string;
  image?: string;
};

function CardHeader({ icon: Icon, iconBg, iconColor, title, image }: CardHeaderProps) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-6 h-6 flex items-center justify-center ${RADIUS} shrink-0`} style={{ backgroundColor: iconBg }}>
        {!image ? <Icon className="w-3.5 h-3.5" style={{ color: iconColor }} /> : <img src={image} className="w-3.5 h-3.5" width={14} height={14} />}
      </div>
      <h3 className="text-xs font-semibold leading-none">{title}</h3>
    </div>
  );
}

interface LinkRowProps {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

function LinkRow({ children, className = "", icon = <ArrowRight className="w-3 h-3" />, onClick }: LinkRowProps) {
  return (
    <button onClick={onClick} className={`flex items-center justify-center gap-1 text-emerald-600 text-[10px] font-medium hover:text-emerald-700 ${className}`}>
      {children}
      {icon}
    </button>
  );
}

/* --------------------------------- navbar ---------------------------------- */

function Navbar({ data }: { data: any }) {
  const exhibitorName: string = data?.exhibitorName || data?.companyName || "—";
  const stallNo = data?.event?.stallNumber || "TBA";
  const initials = exhibitorName.split(/\s+/).filter(Boolean).map((w: string) => w[0]).slice(0, 2).join("").toUpperCase() || "EX";

  return (
    <header className="w-full bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-semibold tracking-wide">EXHIBITOR INTERFACE</span>
        <span className="text-gray-300 text-[10px]">|</span>
        <span className="text-xs font-semibold text-emerald-600">MSME PMS Scheme</span>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 pl-2 ml-1 border-l border-gray-200">
          <div className="w-8 h-8 rounded-full bg-emerald-600 text-white text-[10px] font-semibold flex items-center justify-center">
            {initials}
          </div>
          <div className="leading-tight">
            <p className="text-[10px] font-semibold truncate max-w-[140px]">{exhibitorName}</p>
            <p className="text-[10px]">Stall No. {stallNo}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ---------------------------------- hero ----------------------------------- */

function Hero({ navigate, eligibleAmount }: { navigate: (p: string) => void; eligibleAmount: number }) {
  return (
    <Card className="p-2 px-4 md:flex-row md:items-stretch gap-4 bg-blue-50">
      <div className="flex-1 flex flex-col gap-2">
        <div>
          <h1 className="text-md md:text-xl font-bold">MSME PMS Reimbursement Center</h1>
          <p className="text-[10px] max-w-[280px] mt-1 font-semibold">
            Understand your eligibility, upload documents and track your reimbursement application.
          </p>
        </div>

        <div className="flex flex-wrap gap-1 mt-1">
          {heroCategories.map(({ icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-1 text-center border-r border-slate-300 last:border-r-0 px-2 py-1">
              <div className="flex items-center justify-center">
                <img src={icon} alt={label} width={20} height={20} className="w-4 h-4" />
              </div>
              <span className="text-[7px] leading-tight font-semibold">{label}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 mt-2">
          <button onClick={() => navigate("/exhibitor-dashboard/msme")} className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-medium px-4 py-1 rounded-lg flex items-center gap-1">
            Check My Eligibility <ArrowRight size={10} />
          </button>
          <button onClick={() => navigate("/exhibitor-dashboard/msme/application")} className="border border-gray-300 text-[10px] font-medium px-4 py-1 rounded-lg hover:bg-gray-50 flex items-center gap-1 bg-white">
            Start Application <ArrowRight size={10} />
          </button>
        </div>
      </div>

      <div className="bg-emerald-50 rounded-lg p-3 flex flex-col sm:flex-row justify-between gap-3 w-full flex-1 shrink-0 relative overflow-hidden">
        <div className="rounded-xl border border-emerald-100/80 backdrop-blur-md shadow-[0_8px_30px_rgba(16,185,129,0.08)] p-2 pr-5 flex justify-center flex-col z-10">
          <p className="text-[10px] font-semibold">Your Indicative Benefit</p>
          <p className="text-[10px] font-semibold">Up to</p>
          <p className="text-2xl md:text-3xl font-bold text-emerald-700 flex items-start gap-1">
            {fmtMoney(eligibleAmount || SCHEME_MAX_BENEFIT)}
            <sup className="text-2xl mt-2">*</sup>
          </p>
          <p className="text-[10px] mt-1 max-w-[16rem]">
            *Benefit and approval are subject to
            <br />
            applicable scheme rules and authority verification.
          </p>
        </div>
        <div className="flex justify-center sm:justify-end items-end w-full sm:w-auto">
          <img src={benefit} alt="reimbursement coins" className="w-[130px] h-auto max-w-full object-contain sm:w-[150px] md:w-[170px]" />
        </div>
      </div>
    </Card>
  );
}

/* ---------------------------- eligibility card ------------------------------ */

function EligibilityCard({ data, navigate }: { data: any; navigate: (p: string) => void }) {
  const items = [
    { label: "Udyam Registration", ok: Boolean(data?.msme?.udyamRegNo) },
    { label: "MSME Category", ok: Boolean(data?.msme?.msmeCategory), value: data?.msme?.msmeCategory || "Not Set" },
    { label: "GST Status", ok: Boolean(data?.gstNo) },
    { label: "IHWE Booking", ok: data?.event?.bookingStatus === "Confirmed", value: data?.event?.bookingStatus || "Pending" },
    { label: "Payment Status", ok: data?.event?.paymentStatus === "Fully Paid", value: data?.event?.paymentStatus || "Pending" },
  ];
  const okCount = items.filter(i => i.ok).length;
  const eligible = okCount === items.length;
  const pct = Math.round((okCount / items.length) * 100);

  return (
    <Card>
      <CardHeader image={stall} iconBg="#D1FAE5" iconColor="#10B981" title="1. Your Eligibility Status" />
      <div className="flex flex-col gap-1">
        {items.map(item => (
          <div key={item.label} className="flex items-center justify-between py-0 border-b border-slate-200">
            <span className="text-[10px]">{item.label}</span>
            <span className={`text-[10px] font-medium flex items-center gap-1 ${item.ok ? "text-emerald-600" : "text-amber-500"}`}>
              {item.value || (item.ok ? "Verified" : "Pending")}
              {item.ok && <CheckCircle2 className="w-3.5 h-3.5" />}
            </span>
          </div>
        ))}
        <div className="flex items-center justify-between py-0 border-b border-slate-200">
          <span className="text-[10px]">Scheme Eligibility</span>
          <span className={`text-[10px] font-medium flex items-center gap-1 ${eligible ? "text-emerald-600" : "text-amber-500"}`}>
            {eligible ? "Eligible" : "Incomplete"}
            {eligible && <CheckCircle2 className="w-3.5 h-3.5" />}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-1 mt-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px]">Eligibility Profile</span>
          <div className="w-[100px] h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${pct}%` }} />
          </div>
          <span className="text-[10px]">{pct}% Complete</span>
        </div>
      </div>
      <button onClick={() => navigate("/exhibitor-dashboard/msme/application")} className="flex items-center justify-end gap-1 text-blue-600 text-[10px] font-medium hover:text-blue-700">
        Complete Eligibility Check <ArrowRight className="w-3 h-3" />
      </button>
    </Card>
  );
}

/* --------------------------- application progress ---------------------------- */

function StepDot({ status, n }: { status: string; n: number }) {
  if (status === "done") {
    return <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center"><Check className="w-3.5 h-3.5" /></div>;
  }
  if (status === "active") {
    return <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-[10px] font-semibold flex items-center justify-center">{n}</div>;
  }
  return <div className="w-6 h-6 rounded-full bg-gray-100 text-[10px] font-semibold flex items-center justify-center">{n}</div>;
}

function statusLabel(step: any) {
  if (step.status === "done") return { text: "Completed", color: "text-emerald-600" };
  if (step.status === "active") return { text: "In Progress", color: "text-blue-500" };
  if (step.status === "partial") return { text: step.sub, color: "text-amber-500" };
  return { text: "Pending", color: "" };
}

function ApplicationProgressCard({ application, data, navigate }: { application: any; data: any; navigate: (p: string) => void }) {
  const completedSteps: number[] = application?.completedSteps || [];
  const currentStep: number = application?.currentStep || 1;
  const status: string = application?.status || "Draft";
  const submitted = Boolean(application?.submittedAt);

  const requiredDocs = [...BASE_DOCS, ...(data?.selectedExpenses || []).flatMap((e: string) => EXPENSE_DOCS[e] || [])];
  const uploadedTypes = new Set((data?.documents || []).map((d: any) => d.documentType));
  const uploadedCount = requiredDocs.filter(d => uploadedTypes.has(d.type)).length;

  const docsStatus = uploadedCount === 0 ? (currentStep === 3 ? "active" : "pending")
    : completedSteps.includes(3) ? "done" : "partial";

  const verificationStatus = !submitted ? "pending"
    : (status === "Approved" || status === "Rejected") ? "done"
      : "active";

  const reimbursementStatus = status === "Approved" ? "done" : status === "Rejected" ? "active" : "pending";

  const steps = [
    { n: 1, label: "Eligibility", status: "done" },
    { n: 2, label: "Application Details", status: completedSteps.includes(1) ? "done" : currentStep === 1 ? "active" : "pending" },
    { n: 3, label: "Documents Upload", status: docsStatus, sub: `${uploadedCount} of ${requiredDocs.length} Uploaded` },
    { n: 4, label: "Verification", status: verificationStatus },
    { n: 5, label: "Submission", status: submitted ? "done" : (completedSteps.includes(3) ? "active" : "pending") },
    { n: 6, label: "Reimbursement Status", status: reimbursementStatus, sub: status },
  ];

  return (
    <Card>
      <CardHeader icon={FileText} iconBg="#EFF6FF" iconColor="#2563EB" title="2. Application Progress" />

      <div className="flex items-start justify-between px-1 mt-1">
        {steps.map((step, i) => (
          <div key={step.n} className="flex items-center flex-1 last:flex-none">
            <StepDot status={step.status} n={step.n} />
            {i < steps.length - 1 && <div className={`h-0.5 flex-1 mx-1 ${step.status === "done" ? "bg-emerald-400" : "bg-gray-100"}`} />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-6 gap-1 px-0.5">
        {steps.map(step => {
          const s = statusLabel(step);
          return (
            <div key={step.n} className="flex flex-col items-center text-center gap-0.5">
              <span className="text-[6px] font-bold leading-tight">{step.label}</span>
              <span className={`text-[6px] font-bold leading-tight ${s.color}`}>{s.text}</span>
            </div>
          );
        })}
      </div>

      <button onClick={() => navigate("/exhibitor-dashboard/msme/application")} className="mt-2 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-medium py-1 rounded-lg flex items-center justify-center gap-1">
        Continue Application
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </Card>
  );
}

/* ------------------------------ claim estimate -------------------------------- */

function ClaimEstimateCard({ data, navigate }: { data: any; navigate: (p: string) => void }) {
  const claim = data?.claim || {};
  const stallCharges = Number(claim.stallCharges || 0);
  // Only Stall Charges is ever computed from real finance data today — the
  // other expense categories (hotel/travel/courier/marketing) have no amount
  // captured anywhere in the system yet, only whether they were selected, so
  // they're shown as "Pending Documents" rather than a fabricated number.
  const otherExpenses: string[] = (data?.selectedExpenses || []).filter((e: string) => e !== "Stall Charges");
  const eligibleAmount = Number(claim.eligibleAmount || 0);
  const sqmClaimed = Number(claim.stallSqmClaimed || 9);
  const sqmActual = Number(claim.stallSqmActual || 0);
  const hasLargerFootprint = sqmActual > sqmClaimed;

  return (
    <Card>
      <CardHeader icon={FileText} iconBg="#F5F3FF" iconColor="#7C3AED" title="3. Claim Estimate (Indicative)" />

      {hasLargerFootprint && (
        <p className="text-[9px] text-amber-600 bg-amber-50 border border-amber-100 rounded-md px-2 py-1 -mt-1">
          MSME PMS covers up to {sqmClaimed} sqm per exhibitor — your booking totals {sqmActual} sqm, so only {sqmClaimed} sqm is claimable here.
        </p>
      )}

      <div className="flex items-center justify-between text-[10px] px-0.5">
        <span>Expense Type</span>
        <span>Claimed Amount (₹)</span>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between py-0.5 border-b border-slate-200">
          <span className="text-[10px]">Stall Charges ({sqmClaimed} sqm)</span>
          <span className="text-[10px] font-medium">{stallCharges.toLocaleString("en-IN")}</span>
        </div>
        {otherExpenses.map(label => (
          <div key={label} className="flex items-center justify-between py-0.5 border-b border-slate-200">
            <span className="text-[10px]">{label}</span>
            <span className="text-[10px] font-medium text-amber-500">Pending Documents</span>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-100 pt-1 flex flex-col gap-1">
        <div className="flex items-center justify-between border-b border-slate-200">
          <span className="text-[10px] font-medium">Stall Charges (Verified)</span>
          <span className="text-[10px] font-semibold">{fmtMoney(stallCharges)}</span>
        </div>
        <div className="flex items-center justify-between border-b border-slate-200">
          <span className="text-[10px] font-semibold text-emerald-600">Indicative Eligible Claim</span>
          <span className="text-xs font-bold text-emerald-600">{fmtMoney(Math.min(eligibleAmount || stallCharges, SCHEME_MAX_BENEFIT))}</span>
        </div>
      </div>
      <button onClick={() => navigate("/exhibitor-dashboard/msme/application-review")} className="flex items-center justify-end gap-1 text-blue-600 text-[10px] font-medium hover:text-blue-700">
        View Claim Calculation <ArrowRight className="w-3 h-3" />
      </button>
    </Card>
  );
}

/* ------------------------------ document status -------------------------------- */

function DocumentStatusCard({ data, navigate }: { data: any; navigate: (p: string) => void }) {
  const requiredDocs = [...BASE_DOCS, ...(data?.selectedExpenses || []).flatMap((e: string) => EXPENSE_DOCS[e] || [])];
  const uploadedByType = new Map((data?.documents || []).map((d: any) => [d.documentType, d]));
  const rows = requiredDocs.map(doc => ({ ...doc, uploaded: uploadedByType.has(doc.type), file: uploadedByType.get(doc.type) }));
  const uploadedCount = rows.filter(r => r.uploaded).length;

  return (
    <Card>
      <CardHeader icon={Folder} iconBg="#DBEAFE" iconColor="#3B82F6" title="4. Document Status" />
      <div className="flex flex-col gap-1">
        {rows.map((doc, index) => (
          <div key={doc.type} className={`flex items-center justify-between py-0.5 ${index !== rows.length - 1 ? "border-b border-slate-200" : ""}`}>
            <span className="text-[10px] max-w-[9rem]">{doc.label}</span>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-medium flex items-center gap-1 ${doc.uploaded ? "text-emerald-600" : "text-red-500"}`}>
                <Circle className="w-1.5 h-1.5 fill-current" />
                {doc.uploaded ? "Uploaded" : "Pending"}
              </span>
              <button onClick={() => navigate("/exhibitor-dashboard/msme/documents-upload")} className="text-[10px] text-blue-500 font-medium flex items-center gap-0.5">
                {doc.uploaded ? (doc.file?.url ? <a href={doc.file.url} target="_blank" rel="noreferrer" className="flex items-center gap-0.5"><Eye className="w-3 h-3" />View</a> : <><Eye className="w-3 h-3" />View</>) : <><Upload className="w-3 h-3" />Upload</>}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-1">
        <span className="text-[8px]">{uploadedCount} of {rows.length} Documents Uploaded</span>
        <LinkRow onClick={() => navigate("/exhibitor-dashboard/msme/documents-upload")}><span className="text-[8px]">View Document Checklist</span></LinkRow>
      </div>
    </Card>
  );
}

/* --------------------------- ihwe generated docs -------------------------------- */

function IhweDocsCard({ navigate }: { navigate: (p: string) => void }) {
  return (
    <Card>
      <CardHeader icon={FileCheck2} iconBg="#ECFEFF" iconColor="#0891B2" title="5. IHWE Auto-Generated Documents" />
      <p className="text-[10px] -mt-1">Available from your Invoices & Receipts page.</p>

      <div className="flex flex-col gap-1">
        {ihweDocs.map((doc, index) => (
          <div key={doc} className={`flex items-center justify-between py-0.5 ${index !== ihweDocs.length - 1 ? "border-b border-slate-200" : ""}`}>
            <span className="text-[10px]">{doc}</span>
            <button onClick={() => navigate("/exhibitor-dashboard/invoices")} className="text-[10px] text-blue-500 font-medium flex items-center gap-0.5">
              <Eye className="w-3 h-3" />
              Open
            </button>
          </div>
        ))}
      </div>

      <button onClick={() => navigate("/exhibitor-dashboard/invoices")} className="mt-auto border border-gray-300 text-[10px] font-medium py-1 rounded-lg flex items-center justify-center gap-1 hover:bg-gray-50">
        <Download className="w-3.5 h-3.5" />
        Go to Invoices & Receipts
      </button>
    </Card>
  );
}

/* ------------------------------- application status ------------------------------- */

function ApplicationStatusCard({ application, data, navigate }: { application: any; data: any; navigate: (p: string) => void }) {
  const requiredDocs = [...BASE_DOCS, ...(data?.selectedExpenses || []).flatMap((e: string) => EXPENSE_DOCS[e] || [])];
  const uploadedTypes = new Set((data?.documents || []).map((d: any) => d.documentType));
  const missingDocs = requiredDocs.filter(d => !uploadedTypes.has(d.type));
  const claim = data?.claim || {};

  const rows = [
    { label: "Application ID", value: application?.applicationId || "Not yet generated" },
    { label: "Status", value: application?.status || "Draft", tone: ["Under Review", "Query Raised", "Pending"].includes(application?.status) ? "amber" : "" },
    { label: "Last Updated", value: fmtDate(application?.updatedAt) },
    { label: "Claimed Amount", value: fmtMoney(claim.totalClaimed || claim.stallCharges || 0) },
    { label: "Indicative Eligible Claim", value: fmtMoney(Math.min(claim.eligibleAmount || 0, SCHEME_MAX_BENEFIT)) },
  ];

  const nextAction = missingDocs.length
    ? `Upload ${missingDocs.map(d => d.label).slice(0, 2).join(" and ")}${missingDocs.length > 2 ? "..." : "."}`
    : application?.submittedAt
      ? "Awaiting admin verification."
      : "Submit your application for review.";

  return (
    <Card>
      <CardHeader icon={FileText} iconBg="#FFF7ED" iconColor="#EA580C" title="6. Current Application Status" />

      <div className="flex flex-col gap-1">
        {rows.map((row, index) => (
          <div key={row.label} className={`flex items-center justify-between py-0.5 ${index !== rows.length - 1 ? "border-b border-slate-200" : ""}`}>
            <span className="text-[10px]">{row.label}</span>
            <span className={`text-[10px] font-medium ${row.tone === "amber" ? "text-amber-500" : ""}`}>{row.value}</span>
          </div>
        ))}
        <div className="flex items-center justify-between py-0.5">
          <span className="text-[10px]">Next Action</span>
          <span className="text-[10px] font-medium text-red-500 text-right max-w-[9rem]">{nextAction}</span>
        </div>
      </div>

      <div className="bg-amber-50 border-amber-100 border rounded-lg py-1 flex items-center justify-center mt-auto">
        <LinkRow icon={<ArrowRight className="w-3 h-3 text-amber-600" />} onClick={() => navigate(missingDocs.length ? "/exhibitor-dashboard/msme/documents-upload" : "/exhibitor-dashboard/msme/application")}>
          <span className="text-amber-600">Resolve Pending Action</span>
        </LinkRow>
      </div>
    </Card>
  );
}

/* --------------------------------- sidebar ----------------------------------- */

function QuickActionsCard({ navigate }: { navigate: (p: string) => void }) {
  const quickActions = [
    { icon: FileText, label: "Check Eligibility", bg: "#ECFDF5", color: "#059669", to: "/exhibitor-dashboard/msme" },
    { icon: FileText, label: "Continue Application", bg: "#EFF6FF", color: "#2563EB", to: "/exhibitor-dashboard/msme/application" },
    { icon: FileText, label: "Upload Documents", bg: "#F5F3FF", color: "#7C3AED", to: "/exhibitor-dashboard/msme/documents-upload" },
    { icon: Route, label: "Track Application", bg: "#EFF6FF", color: "#2563EB", to: "/exhibitor-dashboard/msme/pms-claim-status" },
    { icon: Search, label: "Raise a Query", bg: "#FFF7ED", color: "#EA580C", to: "/exhibitor-dashboard/support" },
    { icon: Phone, label: "Contact PMS Coordinator", bg: "#EFF6FF", color: "#2563EB", to: "/exhibitor-dashboard/relationship-manager" },
  ];
  return (
    <Card>
      <h3 className="text-xs font-semibold">Quick Actions</h3>
      <div className="flex flex-col">
        {quickActions.map(({ icon: Icon, label, bg, color, to }, i) => (
          <button key={label} onClick={() => navigate(to)} className="flex items-center justify-between py-0.5">
            <span className="flex items-center gap-2 w-full">
              <span className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: bg }}>
                <Icon className="w-3.5 h-3.5" style={{ color }} />
              </span>
              <div className={`${i !== quickActions.length - 1 ? "border-b border-gray-200" : ""} flex items-center justify-between flex-1 w-full`}>
                <span className="text-[10px]">{label}</span>
                <ArrowRight className="w-3 h-3 text-gray-300" />
              </div>
            </span>
          </button>
        ))}
      </div>
    </Card>
  );
}

function AlertsCard({ data }: { data: any }) {
  const requiredDocs = [...BASE_DOCS, ...(data?.selectedExpenses || []).flatMap((e: string) => EXPENSE_DOCS[e] || [])];
  const uploadedTypes = new Set((data?.documents || []).map((d: any) => d.documentType));
  const missingDocs = requiredDocs.filter(d => !uploadedTypes.has(d.type));

  const alerts: string[] = [];
  missingDocs.forEach(d => alerts.push(`${d.label} is still pending.`));
  alerts.push("Application cannot be submitted until all mandatory documents are uploaded.");
  alerts.push("Reimbursement approval is subject to scheme guidelines.");

  return (
    <Card className="bg-amber-50 border-amber-100">
      <div className="flex items-center gap-2">
        <Bell className="w-4 h-4 text-amber-500" />
        <h3 className="text-xs font-semibold text-amber-700">Important Alerts</h3>
      </div>
      <ul className="flex flex-col gap-1 pl-1">
        {alerts.map(a => (
          <li key={a} className="text-[10px] text-amber-700 flex gap-1.5">
            <span className="mt-1 w-1 h-1 rounded-full bg-amber-500 shrink-0" />
            {a}
          </li>
        ))}
      </ul>
    </Card>
  );
}

function HelpDeskCard({ data }: { data: any }) {
  const coordinator = data?.pmsCoordinator;
  const name = coordinator?.name || "Not yet assigned";
  const phone = coordinator?.phone || "";
  const email = coordinator?.email || "pms.support@ihwe.com";

  return (
    <Card className="h-full">
      <div className="flex items-center gap-2">
        <Headphones className="w-4 h-4 text-violet-500" />
        <h3 className="text-xs font-semibold text-violet-600">PMS Help Desk</h3>
      </div>

      <div className="flex items-center gap-2">
        {coordinator?.photo ? (
          <img src={coordinator.photo} alt={name} className="w-9 h-9 rounded-full object-cover" />
        ) : (
          <div className="w-9 h-9 rounded-full bg-violet-100 text-violet-600 text-[11px] font-bold flex items-center justify-center">
            {coordinator?.initials || "PM"}
          </div>
        )}
        <div className="leading-tight">
          <p className="text-[10px] font-semibold">{name}</p>
          <p className="text-[10px]">{coordinator?.designation || "PMS Scheme Coordinator"}</p>
        </div>
      </div>

      <div className="flex flex-col gap-1 mt-1 w-full">
        <a href={phone ? `tel:${phone}` : undefined} className={`flex items-center gap-2 text-[10px] w-full border border-slate-200 bg-white rounded-md px-2 py-1.5 ${!phone ? "opacity-50 pointer-events-none" : ""}`}>
          <Phone className="w-3.5 h-3.5" />
          {phone || "Not available yet"}
        </a>
        <a href={phone ? `https://wa.me/${String(phone).replace(/\D/g, "")}` : undefined} target="_blank" rel="noreferrer" className={`flex items-center gap-2 text-[10px] w-full border border-slate-200 bg-white rounded-md px-2 py-1.5 ${!phone ? "opacity-50 pointer-events-none" : ""}`}>
          <MessageCircle className="w-3.5 h-3.5" />
          WhatsApp Support
        </a>
        <a href={`mailto:${email}`} className="flex items-center gap-2 text-[10px] w-full border border-slate-200 bg-white rounded-md px-2 py-1.5">
          <Mail className="w-3.5 h-3.5" />
          {email}
        </a>
      </div>

      <a href={`mailto:${email}?subject=${encodeURIComponent("MSME PMS Support Ticket")}`} className="mt-auto border border-violet-200 text-violet-600 text-[10px] font-medium py-1 rounded-lg flex items-center justify-center gap-1 hover:bg-violet-50">
        <FileText className="w-3.5 h-3.5" />
        Raise Support Ticket
      </a>
    </Card>
  );
}

/* ---------------------------------- footer cta --------------------------------- */

function FooterCta({ navigate, saving, onSaveDraft }: { navigate: (p: string) => void; saving: boolean; onSaveDraft: () => void }) {
  return (
    <Card className="bg-emerald-50 border-emerald-100 flex-col md:flex-row items-start md:items-center justify-between gap-3 p-3 mt-2">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 w-full">
        <img src={cta_image} alt="Claim illustration" className="w-[80px] h-[55px] sm:w-[100px] sm:h-[70px] object-cover rounded-lg shrink-0" />
        <div>
          <p className="text-xs font-semibold text-emerald-700">Ready to Claim Your MSME Reimbursement?</p>
          <p className="text-[10px] mt-0.5">Complete your details and documents to move your application for verification.</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto shrink-0">
        <button onClick={() => navigate("/exhibitor-dashboard/msme/application")} className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-medium px-4 py-2 rounded-lg flex items-center justify-center gap-1 whitespace-nowrap">
          Continue Application
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
        <button onClick={onSaveDraft} disabled={saving} className="border border-gray-300 text-[10px] font-medium px-4 py-2 rounded-lg flex items-center justify-center gap-1 hover:bg-gray-50 whitespace-nowrap disabled:opacity-60">
          {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
          Save & Complete Later
        </button>
      </div>
    </Card>
  );
}

/* ----------------------------------- page ------------------------------------- */

export default function MSMEDashboard() {
  const navigate = useNavigate();
  const { data: exhibitorData } = useExhibitorCtx();
  const pms = useMsmePmsApplication(exhibitorData);

  if (pms.loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
      </div>
    );
  }

  const data = pms.data;
  const application = pms.application;
  const eligibleAmount = Math.min(Number(data?.claim?.eligibleAmount || 0), SCHEME_MAX_BENEFIT);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="px-3 lg:px-6 py-3 lg:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_300px] gap-2 items-stretch">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-2 flex flex-col gap-2">
            <Hero navigate={navigate} eligibleAmount={eligibleAmount} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <EligibilityCard data={data} navigate={navigate} />
              <ApplicationProgressCard application={application} data={data} navigate={navigate} />
              <ClaimEstimateCard data={data} navigate={navigate} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <DocumentStatusCard data={data} navigate={navigate} />
              <IhweDocsCard navigate={navigate} />
              <ApplicationStatusCard application={application} data={data} navigate={navigate} />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-2 h-full">
            <QuickActionsCard navigate={navigate} />
            <AlertsCard data={data} />
            <div className="flex-1 min-h-0">
              <HelpDeskCard data={data} />
            </div>
          </div>
        </div>

        <FooterCta navigate={navigate} saving={pms.saving} onSaveDraft={() => pms.saveStep(1, { applicantDetails: data, selectedExpenses: data?.selectedExpenses || [], saveAsDraft: true })} />
      </main>
    </div>
  );
}
