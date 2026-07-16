import React from "react";
import {
  Calendar,
  Bell,
  ChevronDown,
  Landmark,
  Plane,
  BedDouble,
  Package,
  Megaphone,
  ShieldCheck,
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
} from "lucide-react";

import aeroplane from "@/assets/msme-pm-scheme/aeroplane.webp"
import benefit from "@/assets/msme-pm-scheme/benfit.webp";
import courier from "@/assets/msme-pm-scheme/courier_and_logistics.webp"
import user from "@/assets/msme-pm-scheme/user.webp"
import marketing from "@/assets/msme-pm-scheme/marketting_expense.webp"
import hotel_stay from "@/assets/msme-pm-scheme/hotel_stay.webp"
import stall from "@/assets/msme-pm-scheme/stall.webp"
import cta_image from "@/assets/msme-pm-scheme/cta_image.webp"
/* ----------------------------- design tokens 
----------------------------- */
// spacing: 4px & 8px only. one radius token (rounded-lg) everywhere, rounded-full for avatars/pills/progress.
// font sizes: 10px -> 16px only.

const RADIUS = "rounded-lg";

/* ------------------------------- mock data -------------------------------- */

const heroCategories = [
  { icon: stall, label: "Stall Charges" },
  { icon: aeroplane, label: "Travel Expenses" },
  { icon: hotel_stay, label: "Hotel Stay" },
  { icon: courier, label: "Courier & Logistics" },
  { icon: marketing, label: "Marketing Expenses" },
];

const eligibilityItems = [
  { label: "Udyam Registration", value: "Verified", tone: "ok" },
  { label: "MSME Category", value: "Micro", tone: "plain" },
  { label: "GST Status", value: "Verified", tone: "ok" },
  { label: "IHWE Booking", value: "Confirmed", tone: "ok" },
  { label: "Payment Status", value: "Fully Paid", tone: "plain" },
  { label: "Scheme Eligibility", value: "Eligible", tone: "ok" },
];

const progressSteps = [
  { n: 1, label: "Eligibility", status: "done" },
  { n: 2, label: "Application Details", status: "active" },
  { n: 3, label: "Documents Upload", status: "partial", sub: "4 of 8 Uploaded" },
  { n: 4, label: "Verification", status: "pending" },
  { n: 5, label: "Submission", status: "pending" },
  { n: 6, label: "Reimbursement Status", status: "pending" },
];

const claimEstimate = [
  { label: "Stall Charges", value: "1,18,944" },
  { label: "Hotel Stay", value: "18,000" },
  { label: "Travel Expenses", value: "8,500" },
  { label: "Courier Charges", value: "1,200" },
  { label: "Marketing Support", value: "5,000" },
];

const documentStatus = [
  { label: "Udyam Registration Certificate", status: "Uploaded", action: "View" },
  { label: "GST Certificate", status: "Uploaded", action: "View" },
  { label: "PAN Card", status: "Uploaded", action: "View" },
  { label: "Aadhaar Card", status: "Uploaded", action: "View" },
  { label: "Cancelled Cheque", status: "Pending", action: "Upload" },
  { label: "Bank Statement (Last 6 Months)", status: "Pending", action: "Upload" },
  { label: "Hotel Invoice", status: "Pending", action: "Upload" },
  { label: "Travel Proof", status: "Pending", action: "Upload" },
];

const ihweDocs = [
  "Tax Invoice",
  "Payment Receipt",
  "Stall Confirmation Letter",
  "Participation Certificate",
  "Event Confirmation Letter",
  "Organizer Declaration",
];

const quickActions = [
  { icon: FileText, label: "Check Eligibility", bg: "#ECFDF5", color: "#059669" },
  { icon: FileText, label: "Continue Application", bg: "#EFF6FF", color: "#2563EB" },
  { icon: FileText, label: "Upload Documents", bg: "#F5F3FF", color: "#7C3AED" },
  { icon: Download, label: "Download PMS Guidelines", bg: "#FFF7ED", color: "#EA580C" },
  { icon: FileText, label: "Download Application Form", bg: "#F5F3FF", color: "#7C3AED" },
  { icon: Route, label: "Track Application", bg: "#EFF6FF", color: "#2563EB" },
  { icon: Search, label: "Raise a Query", bg: "#FFF7ED", color: "#EA580C" },
  { icon: Phone, label: "Contact PMS Coordinator", bg: "#EFF6FF", color: "#2563EB" },
];

const alerts = [
  "Cancelled cheque is still pending.",
  "Bank statement must be of last 6 months.",
  "Hotel invoice must contain GST details.",
  "Application cannot be submitted until all mandatory documents are uploaded.",
  "Reimbursement approval is subject to scheme guidelines.",
];

/* ------------------------------- primitives ------------------------------- */

function Card({ children, className = "" }) {
  return (
    <div
      className={`border border-gray-200 ${RADIUS} p-2 flex flex-col gap-2 ${className}`}
    >
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

function CardHeader({
  icon: Icon,
  iconBg,
  iconColor,
  title,
  image,
}: CardHeaderProps) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-6 h-6 flex items-center justify-center ${RADIUS} shrink-0`}
        style={{ backgroundColor: iconBg }}
      >
        {!image?<Icon className="w-3.5 h-3.5" style={{ color: iconColor }} />:
        <img src={image} className="w-3.5 h-3.5"  width={14} height={14} />}
      </div>
      <h3 className="text-xs font-semibold  leading-none">{title}</h3>
    </div>
  );
}

interface LinkRowProps {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

function LinkRow({
  children,
  className = "",
  icon = <ArrowRight className="w-3 h-3" />,
}: LinkRowProps) {
  return (
    <button
      className={`flex items-center justify-center gap-1 text-emerald-600 text-[10px] font-medium hover:text-emerald-700 ${className}`}
    >
      {children}
      {icon}
    </button>
  );
}

/* --------------------------------- navbar ---------------------------------- */

function Navbar() {
  return (
    <header className="w-full bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-semibold  tracking-wide">
          EXHIBITOR INTERFACE
        </span>
        <span className="text-gray-300 text-[10px]">|</span>
        <span className="text-xs font-semibold text-emerald-600">MSME PMS Scheme</span>
      </div>

      <div className="flex items-center gap-2">
        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
          <Calendar className="w-4 h-4 " />
        </button>
        <button className="relative w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
          <Bell className="w-4 h-4 " />
          <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center leading-none">
            3
          </span>
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
          <Bell className="w-4 h-4 " />
        </button>

        <div className="flex items-center gap-2 pl-2 ml-1 border-l border-gray-200">
          <div className="w-8 h-8 rounded-full bg-emerald-600 text-white text-[10px] font-semibold flex items-center justify-center">
            VS
          </div>
          <div className="leading-tight">
            <p className="text-[10px] font-semibold ">Velruma Pvt. Ltd.</p>
            <p className="text-[10px] ">Stall No. 139</p>
          </div>
          <ChevronDown className="w-3.5 h-3.5 " />
        </div>
      </div>
    </header>
  );
}

/* ---------------------------------- hero ----------------------------------- */

function Hero() {
  return (
    <Card className="p-2 px-4 md:flex-row md:items-stretch gap-4 bg-blue-50">
      <div className="flex-1 flex flex-col gap-2">
        <div>
          <h1 className="text-md md:text-xl font-bold">
            MSME PMS Reimbursement Center
          </h1>

          <p className="text-[10px] max-w-[280px] mt-1 font-semibold">
            Understand your eligibility, upload documents and track your
            reimbursement application.
          </p>
        </div>

        <div className="flex flex-wrap gap-1 mt-1">
          {heroCategories.map(({ icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1 text-center border-r border-slate-300 last:border-r-0 px-2 py-1"
            >
              <div className="flex items-center justify-center">
                <img
                  src={icon}
                  alt={label}
                  width={20}
                  height={20}
                  className="w-4 h-4"
                />
              </div>

              <span className="text-[7px] leading-tight font-semibold">
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 mt-2">
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-medium px-4 py-1 rounded-lg flex items-center gap-1">
            Check My Eligibility <ArrowRight size={10} />
          </button>

          <button className="border border-gray-300 text-[10px] font-medium px-4 py-1 rounded-lg hover:bg-gray-50 flex items-center gap-1 bg-white">
            Start Application <ArrowRight size={10} />
          </button>
        </div>
      </div>

      {/* BENEFIT CARD */}
      <div className="bg-emerald-50 rounded-lg p-3 flex flex-col sm:flex-row justify-between gap-3 w-full flex-1 shrink-0 relative overflow-hidden">

        {/* Content */}
        <div className="rounded-xl border border-emerald-100/80 backdrop-blur-md shadow-[0_8px_30px_rgba(16,185,129,0.08)] p-2 pr-5 flex justify-center flex-col z-10">
          <p className="text-[10px] font-semibold">
            Maximum Indicative Benefit
          </p>

          <p className="text-[10px] font-semibold">
            Up to
          </p>

          <p className="text-2xl md:text-3xl font-bold text-emerald-700 flex items-start gap-1">
            ₹1,50,000
            <sup className="text-2xl mt-2">*</sup>
          </p>

          <p className="text-[10px] mt-1 max-w-[16rem]">
            *Benefit and approval are subject to
            <br />
            applicable scheme rules and authority verification.
          </p>
        </div>

        {/* Responsive Image */}
        <div className="flex justify-center sm:justify-end items-end w-full sm:w-auto">
          <img
            src={benefit}
            alt="reimbursement coins"
            className="
              w-[130px]
              h-auto
              max-w-full
              object-contain
              sm:w-[150px]
              md:w-[170px]
            "
          />
        </div>
      </div>
    </Card>
  );
}

/* ---------------------------- eligibility card ------------------------------ */

function EligibilityCard() {
  return (
    <Card>
      <CardHeader image={stall} iconBg="#D1FAE5" iconColor="#10B981" title="1. Your Eligibility Status" />
      <div className="flex flex-col gap-1">
     {eligibilityItems.map((item, index) => (
  <div
    key={item.label}
    className={`flex items-center justify-between py-0 ${
       "border-b border-slate-200"
    }`}
  >
    <span className="text-[10px]">{item.label}</span>

    <span
      className={`text-[10px] font-medium flex items-center gap-1 ${
        item.tone === "ok" ? "text-emerald-600" : ""
      }`}
    >
      {item.value}
      {item.tone === "ok" && (
        <CheckCircle2 className="w-3.5 h-3.5" />
      )}
    </span>
  </div>
))}
      </div>

      <div className="flex flex-col gap-1 mt-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] ">Eligibility Profile</span>
        <div className="w-[100px] h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500 rounded-full" style={{ width: "75%" }} />
        </div>
          <span className="text-[10px] ">75% Complete</span>
        </div>
      </div>
<button
      className={`flex items-center justify-end gap-1 text-blue-600 text-[10px] font-medium hover:text-blue-700 `}
    >
    Complete Eligibility Check <ArrowRight className="w-3 h-3" />
    </button>
    </Card>
  );
}

/* --------------------------- application progress ---------------------------- */

function StepDot({ status, n }) {
  if (status === "done") {
    return (
      <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center">
        <Check className="w-3.5 h-3.5" />
      </div>
    );
  }
  if (status === "active") {
    return (
      <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-[10px] font-semibold flex items-center justify-center">
        {n}
      </div>
    );
  }
  return (
    <div className="w-6 h-6 rounded-full bg-gray-100  text-[10px] font-semibold flex items-center justify-center">
      {n}
    </div>
  );
}

function statusLabel(step) {
  if (step.status === "done") return { text: "Completed", color: "text-emerald-600" };
  if (step.status === "active") return { text: "In Progress", color: "text-blue-500" };
  if (step.status === "partial") return { text: step.sub, color: "text-amber-500" };
  return { text: "Pending", color: "" };
}

function ApplicationProgressCard() {
  return (
    <Card>
      <CardHeader icon={FileText} iconBg="#EFF6FF" iconColor="#2563EB" title="2. Application Progress" />

      <div className="flex items-start justify-between px-1 mt-1">
        {progressSteps.map((step, i) => (
          <div key={step.n} className="flex items-center flex-1 last:flex-none">
            <StepDot status={step.status} n={step.n} />
            {i < progressSteps.length - 1 && (
              <div
                className={`h-0.5 flex-1 mx-1 ${
                  step.status === "done" ? "bg-emerald-400" : "bg-gray-100"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-6 gap-1 px-0.5">
        {progressSteps.map((step) => {
          const s = statusLabel(step);
          return (
            <div key={step.n} className="flex flex-col items-center text-center gap-0.5">
              <span className="text-[6px] font-bold  leading-tight">{step.label}</span>
              <span className={`text-[6px] font-bold leading-tight ${s.color}`}>{s.text}</span>
            </div>
          );
        })}
      </div>

      <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-medium py-1 rounded-lg flex items-center justify-center gap-1">
        Continue Application
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </Card>
  );
}

/* ------------------------------ claim estimate -------------------------------- */

function ClaimEstimateCard() {
  const total = "1,51,644";
  return (
    <Card>
      <CardHeader icon={FileText} iconBg="#F5F3FF" iconColor="#7C3AED" title="3. Claim Estimate (Indicative)" />

      <div className="flex items-center justify-between text-[10px]  px-0.5">
        <span>Expense Type</span>
        <span>Claimed Amount (₹)</span>
      </div>

      <div className="flex flex-col gap-1">
     {claimEstimate.map((row, index) => (
  <div
    key={row.label}
    className={`flex items-center justify-between py-0.5 ${"border-b border-slate-200"
        
    }`}
  >
    <span className="text-[10px]">{row.label}</span>
    <span className="text-[10px] font-medium">{row.value}</span>
  </div>
))}
      </div>

      <div className="border-t border-gray-100 pt-1 flex flex-col gap-1">
        <div className="flex items-center justify-between border-b border-slate-200">
          <span className="text-[10px] font-medium ">Total Expense</span>
          <span className="text-[10px] font-semibold ">{total}</span>
        </div>
        <div className="flex items-center justify-between border-b border-slate-200">
          <span className="text-[10px] font-semibold text-emerald-600">Indicative Eligible Claim</span>
          <span className="text-xs font-bold text-emerald-600">₹1,50,000</span>
        </div>
      </div>
<button
      className={`flex items-center justify-end gap-1 text-blue-600 text-[10px] font-medium hover:text-blue-700 `}
    >
    View Claim Calculation <ArrowRight className="w-3 h-3" />
    </button>

    </Card>
  );
}

/* ------------------------------ document status -------------------------------- */

function DocumentStatusCard() {
  return (
    <Card>
      <CardHeader icon={Folder} iconBg="#DBEAFE" iconColor="#3B82F6" title="4. Document Status" />
      <div className="flex flex-col gap-1">
       {documentStatus.map((doc, index) => (
  <div
    key={doc.label}
    className={`flex items-center justify-between py-0.5 ${
      index !== documentStatus.length - 1
        ? "border-b border-slate-200"
        : ""
    }`}
  >
    <span className="text-[10px] max-w-[9rem]">{doc.label}</span>

    <div className="flex items-center gap-2">
      <span
        className={`text-[10px] font-medium flex items-center gap-1 ${
          doc.status === "Uploaded"
            ? "text-emerald-600"
            : "text-red-500"
        }`}
      >
        <Circle className="w-1.5 h-1.5 fill-current" />
        {doc.status}
      </span>

      <button className="text-[10px] text-blue-500 font-medium flex items-center gap-0.5">
        {doc.action === "View" ? (
          <Eye className="w-3 h-3" />
        ) : (
          <Upload className="w-3 h-3" />
        )}
        {doc.action}
      </button>
    </div>
  </div>
))}
      </div>

      <div className="flex items-center justify-between mt-1">
        <span className="text-[8px] ">4 of 8 Documents Uploaded</span>
        <LinkRow><span className="text-[8px]">
          View Document Checklist
          </span>
          </LinkRow>
      </div>
    </Card>
  );
}

/* --------------------------- ihwe generated docs -------------------------------- */

function IhweDocsCard() {
  return (
    <Card>
      <CardHeader icon={FileCheck2} iconBg="#ECFEFF" iconColor="#0891B2" title="5. IHWE Auto-Generated Documents" />
      <p className="text-[10px]  -mt-1">These documents are already available for download.</p>

      <div className="flex flex-col gap-1">
       {ihweDocs.map((doc, index) => (
  <div
    key={doc}
    className={`flex items-center justify-between py-0.5 ${
      index !== ihweDocs.length - 1
        ? "border-b border-slate-200"
        : ""
    }`}
  >
    <span className="text-[10px]">{doc}</span>

    <button className="text-[10px] text-blue-500 font-medium flex items-center gap-0.5">
      <Download className="w-3 h-3" />
      Download
    </button>
  </div>
))}
      </div>

      <button className="mt-auto border border-gray-300  text-[10px] font-medium py-1 rounded-lg flex items-center justify-center gap-1 hover:bg-gray-50">
        <Download className="w-3.5 h-3.5" />
        Download All Documents
      </button>
    </Card>
  );
}

/* ------------------------------- application status ------------------------------- */

function ApplicationStatusCard() {
  const rows = [
    { label: "Application ID", value: "IHWE/2026/PMS/139" },
    { label: "Status", value: "Draft", tone: "amber" },
    { label: "Last Updated", value: "14 May 2026, 11:30 AM" },
    { label: "Claimed Amount", value: "₹1,51,644" },
    { label: "Indicative Eligible Claim", value: "₹1,50,000" },
  ];
  return (
    <Card>
      <CardHeader icon={FileText} iconBg="#FFF7ED" iconColor="#EA580C" title="6. Current Application Status" />

      <div className="flex flex-col gap-1">
        {rows.map((row, index) => (
  <div
    key={row.label}
    className={`flex items-center justify-between py-0.5 ${
      index !== rows.length - 1 ? "border-b border-slate-200" : ""
    }`}
  >
    <span className="text-[10px]">{row.label}</span>

    <span
      className={`text-[10px] font-medium ${
        row.tone === "amber" ? "text-amber-500" : ""
      }`}
    >
      {row.value}
    </span>
  </div>
))}
        <div className="flex items-center justify-between py-0.5">
          <span className="text-[10px] ">Next Action</span>
          <span className="text-[10px] font-medium text-red-500 text-right max-w-[9rem]">
            Upload Cancelled Cheque and Bank Statement.
          </span>
        </div>
      </div>

      <div className="bg-amber-50 border-amber-100 border rounded-lg py-1 flex items-center justify-center mt-auto">
        <LinkRow icon={<ArrowRight className="w-3 h-3 text-amber-600" />}><span className="text-amber-600">Resolve Pending Action
          </span></LinkRow>
      </div>
    </Card>
  );
}

/* --------------------------------- sidebar ----------------------------------- */

function QuickActionsCard() {
  return (
    <Card>
      <h3 className="text-xs font-semibold ">Quick Actions</h3>
      <div className="flex flex-col">
        {quickActions.map(({ icon: Icon, label, bg, color }, i) => (
          <button
            key={label}
            className={`flex items-center justify-between py-0.5 `}
          >
            <span className="flex items-center gap-2 w-full">
              <span
                className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: bg }}
              >
                <Icon className="w-3.5 h-3.5" style={{ color }} />
              </span>
              <div className={`${
              i !== quickActions.length - 1 ? "border-b border-gray-200" : ""
            } flex items-center justify-between flex-1 w-full`}>

              <span className="text-[10px] ">{label}</span>
            <ArrowRight className="w-3 h-3 text-gray-300" />
              </div>
            </span>
          </button>
        ))}
      </div>
    </Card>
  );
}

function AlertsCard() {
  return (
    <Card className="bg-amber-50 border-amber-100">
      <div className="flex items-center gap-2">
        <Bell className="w-4 h-4 text-amber-500" />
        <h3 className="text-xs font-semibold text-amber-700">Important Alerts</h3>
      </div>
      <ul className="flex flex-col gap-1 pl-1">
        {alerts.map((a) => (
          <li key={a} className="text-[10px] text-amber-700 flex gap-1.5">
            <span className="mt-1 w-1 h-1 rounded-full bg-amber-500 shrink-0" />
            {a}
          </li>
        ))}
      </ul>
    </Card>
  );
}

function HelpDeskCard() {
  return (
    <Card className="h-full">
      <div className="flex items-center gap-2">
        <Headphones className="w-4 h-4 text-violet-500" />
        <h3 className="text-xs font-semibold text-violet-600">PMS Help Desk</h3>
      </div>

      <div className="flex items-center gap-2">
        <img
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=80&h=80&fit=crop&crop=faces"
          alt="Rohit Sharma"
          className="w-9 h-9 rounded-full object-cover"
        />
        <div className="leading-tight">
          <p className="text-[10px] font-semibold ">Rohit Sharma</p>
          <p className="text-[10px] ">PMS Scheme Coordinator</p>
        </div>
      </div>

   <div className="flex flex-col gap-1 mt-1 w-full">
  <div className="flex items-center gap-2 text-[10px] w-full border border-slate-200 bg-white rounded-md px-2 py-1.5">
    <Phone className="w-3.5 h-3.5" />
    +91 96549 00525
  </div>

  <div className="flex items-center gap-2 text-[10px] w-full border border-slate-200 bg-white rounded-md px-2 py-1.5">
    <MessageCircle className="w-3.5 h-3.5" />
    WhatsApp Support
  </div>

  <div className="flex items-center gap-2 text-[10px] w-full border border-slate-200 bg-white rounded-md px-2 py-1.5">
    <Mail className="w-3.5 h-3.5" />
    pms.support@ihwe.com
  </div>
</div>

      <button className="mt-auto border border-violet-200 text-violet-600 text-[10px] font-medium py-1 rounded-lg flex items-center justify-center gap-1 hover:bg-violet-50">
        <FileText className="w-3.5 h-3.5" />
        Raise Support Ticket
      </button>
    </Card>
  );
}

/* ---------------------------------- footer cta --------------------------------- */

function FooterCta() {
  return (
    <Card className="bg-emerald-50 border-emerald-100 flex-col md:flex-row items-start md:items-center justify-between gap-3 p-3 mt-2">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 w-full">
        <img
          src={cta_image}
          alt="Claim illustration"
          className="w-[80px] h-[55px] sm:w-[100px] sm:h-[70px] object-cover rounded-lg shrink-0"
        />

        <div>
          <p className="text-xs font-semibold text-emerald-700">
            Ready to Claim Your MSME Reimbursement?
          </p>

          <p className="text-[10px] mt-0.5">
            Complete your details and documents to move your application for verification.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto shrink-0">
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-medium px-4 py-2 rounded-lg flex items-center justify-center gap-1 whitespace-nowrap">
          Continue Application
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button className="border border-gray-300 text-[10px] font-medium px-4 py-2 rounded-lg flex items-center justify-center gap-1 hover:bg-gray-50 whitespace-nowrap">
          Save & Complete Later
        </button>
      </div>
    </Card>
  );
}

/* ----------------------------------- page ------------------------------------- */

export default function MSMEDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="px-3 lg:px-6 py-3 lg:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_300px] gap-2 items-stretch">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-2 flex flex-col gap-2">
            <Hero />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <EligibilityCard />
              <ApplicationProgressCard />
              <ClaimEstimateCard />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <DocumentStatusCard />
              <IhweDocsCard />
              <ApplicationStatusCard />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-2 h-full">
            <QuickActionsCard />
            <AlertsCard />

            <div className="flex-1 min-h-0">
              <HelpDeskCard />
            </div>
          </div>
        </div>

        <FooterCta />
      </main>
    </div>
  );
}