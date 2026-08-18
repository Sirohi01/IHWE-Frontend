import {
  Banknote,
  Building2,
  CalendarDays,
  CheckCircle2,
  CircleHelp,
  ClipboardCheck,
  Download,
  Eye,
  FileCheck2,
  FileText,
  Headphones,
  Loader2,
  Mail,
  MessageCircle,
  Phone,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import type { ElementType, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useExhibitorCtx } from "@/context/ExhibitorContext";
import { useMsmePmsApplication } from "@/hooks/useMsmePmsApplication";

const safe = (value: unknown, fallback: string) => {
  const text = String(value ?? "").trim();
  return text || fallback;
};

const amount = (value: number) => Number(value || 0).toLocaleString("en-IN");

const fmtDate = (value: any, fallback = "—") => {
  if (!value) return fallback;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return fallback;
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};
const fmtDateTime = (value: any, fallback = "—") => {
  if (!value) return fallback;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return fallback;
  return d.toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
};

// Same required-document list the backend enforces at submission time
// (REQUIRED_DOCUMENTS / requiredDocumentsFor in msmePmsSchemeController.js).
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
    { type: "hotelInvoice", label: "Hotel Invoice(s)" },
    { type: "hotelPayment", label: "Hotel Payment Proof" },
  ],
  "Travel": [
    { type: "travelExpense", label: "Travel Expense Proof" },
    { type: "travelInvoice", label: "Travel Invoice(s)" },
  ],
  "Courier": [{ type: "courier", label: "Courier Invoice(s)" }],
  "Marketing Material": [{ type: "marketing", label: "Marketing / Printing Invoice(s)" }],
};

type PanelProps = { children: ReactNode; className?: string };

function Panel({ children, className = "" }: PanelProps) {
  return (
    <section className={`overflow-hidden rounded-[8px] border border-[#dce6f1] bg-white shadow-[0_1px_2px_rgba(6,23,67,0.025)] ${className}`}>
      {children}
    </section>
  );
}

type LabelValueProps = { label: string; value: string; green?: boolean };

function LabelValue({ label, value, green = false }: LabelValueProps) {
  return (
    <div className="grid min-h-[27px] grid-cols-[minmax(0,1fr)_auto] items-center gap-2 border-b border-[#edf2f7] last:border-b-0">
      <span className="truncate text-[8px] font-bold leading-none text-[#061743]">{label}</span>
      <span className={`max-w-[150px] truncate text-right text-[8px] font-semibold leading-none ${green ? "text-[#087536]" : "text-[#061743]"}`} title={value}>
        {value}
      </span>
    </div>
  );
}

type ProgressArrowTone = "start" | "done" | "solid" | "dashed";

function ProgressArrow({ tone }: { tone: ProgressArrowTone }) {
  const isStart = tone === "start";
  const isDashed = tone === "dashed";
  const color = tone === "start" ? "#aab9d3" : tone === "done" ? "#087536" : "#142d75";

  return (
    <svg viewBox="0 0 72 14" className={`pointer-events-none absolute top-[18px] h-[14px] ${isStart ? "left-[-8px] w-[32px]" : "left-[-47px] w-[76px]"}`} fill="none" aria-hidden="true">
      <path d="M1 7H67" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeDasharray={isDashed ? "2.5 3.5" : undefined} />
      <path d="M62.5 2.5L67 7L62.5 11.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type StatusStepProps = {
  icon: ElementType;
  title: string;
  sub: string;
  state: "done" | "active" | "pending" | "rejected";
  connector: ProgressArrowTone;
};

function StatusStep({ icon: Icon, title, sub, state, connector }: StatusStepProps) {
  const active = state === "active";
  const done = state === "done";
  const rejected = state === "rejected";

  return (
    <div className="relative flex min-w-0 flex-col items-center text-center">
      <ProgressArrow tone={connector} />
      <div
        className={`flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-full border ${
          rejected ? "border-[#f3b8b8] bg-[#fef2f2] text-[#dc2626]"
          : done ? "border-[#bfe8d1] bg-[#edf9f2] text-[#087536]"
          : active ? "border-[#f2a23a] bg-[#fff7e8] text-[#f08a00]"
          : "border-[#d7dee8] bg-[#f8fafc] text-[#31446c]"
        }`}
      >
        <Icon size={21} strokeWidth={1.75} />
      </div>
      <b className="mt-[7px] whitespace-nowrap text-[8px] font-black leading-none text-[#061743]">{title}</b>
      <span className={`mt-[5px] text-[8px] font-semibold leading-none ${rejected ? "text-[#dc2626]" : active ? "text-[#f08a00]" : done ? "text-[#087536]" : "text-[#31446c]"}`}>
        {sub}
      </span>
    </div>
  );
}

type MetricProps = { icon: ElementType; label: string; value: string; tone: "green" | "blue" | "purple" | "orange" };

function Metric({ icon: Icon, label, value, tone }: MetricProps) {
  const styles = {
    green: { panel: "border-[#ccebd8] bg-[#f4fff8]", icon: "bg-[#e8f8ee] text-[#087536]", label: "text-[#087536]", value: "text-[#087536]" },
    blue: { panel: "border-[#d8e1ff] bg-[#f5f7ff]", icon: "bg-[#eaf0ff] text-[#123ad6]", label: "text-[#123ad6]", value: "text-[#061743]" },
    purple: { panel: "border-[#e4d7ff] bg-[#fbf8ff]", icon: "bg-[#f1eaff] text-[#6d28d9]", label: "text-[#6d28d9]", value: "text-[#6d28d9]" },
    orange: { panel: "border-[#ffdfaa] bg-[#fffaf0]", icon: "bg-[#fff2dc] text-[#f07800]", label: "text-[#31446c]", value: "text-[#c85b00]" },
  }[tone];

  return (
    <Panel className={`flex h-full items-center gap-[12px] px-[12px] ${styles.panel}`}>
      <span className={`flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[6px] ${styles.icon}`}>
        <Icon size={23} strokeWidth={1.75} />
      </span>
      <div className="min-w-0">
        <p className={`m-0 truncate text-[8px] font-bold leading-none ${styles.label}`}>{label}</p>
        <b className={`mt-[7px] block truncate text-[14px] font-black leading-none ${styles.value}`}>{value}</b>
      </div>
    </Panel>
  );
}

type DocStatusProps = { name: string; status: "Verified" | "Under Review" | "Not Uploaded" };

function DocStatus({ name, status }: DocStatusProps) {
  const tone = status === "Verified" ? "text-[#087536]" : status === "Under Review" ? "text-[#f08a00]" : "text-[#94a3b8]";
  return (
    <div className="grid h-[25px] grid-cols-[minmax(0,1fr)_92px] items-center border-t border-[#edf2f7] px-[7px] text-[7px] font-semibold">
      <span className="truncate">{name}</span>
      <span className={`flex items-center gap-[4px] font-black ${tone}`}>
        {status === "Not Uploaded" ? <XCircle size={9} strokeWidth={2.2} /> : <CheckCircle2 size={9} strokeWidth={2.2} />}
        {status}
      </span>
    </div>
  );
}

type DownloadRowProps = { title: string; sub: string; href?: string; disabled?: boolean };

function DownloadRow({ title, sub, href, disabled }: DownloadRowProps) {
  const content = (
    <>
      <div className="flex min-w-0 items-center gap-[7px]">
        <span className="flex h-[25px] w-[25px] shrink-0 items-center justify-center rounded-[4px] border border-[#ccebd8] bg-[#f2faf5] text-[#087536]">
          <FileText size={13} strokeWidth={1.8} />
        </span>
        <div className="min-w-0">
          <p className="m-0 truncate text-[8px] font-black leading-[10px]">{title}</p>
          <p className="m-0 truncate text-[7px] font-semibold leading-[9px] text-[#31446c]">{sub}</p>
        </div>
      </div>
      <Download size={12} strokeWidth={1.8} className="shrink-0" />
    </>
  );
  const cls = `flex h-[42px] items-center justify-between gap-2 rounded-[5px] border border-[#e1e9f2] bg-white px-[8px] ${disabled ? "opacity-40 pointer-events-none" : "hover:border-[#087536]"}`;
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className={cls}>{content}</a>
  ) : (
    <div className={cls}>{content}</div>
  );
}

export default function MSMEPMSClaimStatusPage() {
  const navigate = useNavigate();
  const { data: exhibitorData } = useExhibitorCtx();
  const pms = useMsmePmsApplication(exhibitorData);

  if (pms.loading) {
    return (
      <div className="flex h-[calc(100dvh-58px)] w-full items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-[#087536]" />
      </div>
    );
  }

  const data = pms.data;
  const application: any = pms.application || {};
  const status: string = application.status || "Draft";
  const submitted = Boolean(application.submittedAt);

  const companyName = safe(data?.exhibitorName || data?.companyName, "—");
  const applicationId = safe(application.applicationId, "Not yet generated");
  const msmeCategory = safe(data?.msme?.msmeCategory, "—");
  const udyamNumber = safe(data?.msme?.udyamRegNo, "—");
  const gstNumber = safe(data?.gstNo, "—");
  const coordinator = data?.pmsCoordinator;

  const claim = data?.claim || {};
  const claimedAmount = Number(claim.totalClaimed || claim.stallCharges || 0);
  const eligibleAmount = Number(claim.eligibleAmount || 0);
  const approvedAmount = status === "Approved" ? eligibleAmount : 0;

  const requiredDocs = [...BASE_DOCS, ...((data?.selectedExpenses || []) as string[]).flatMap(e => EXPENSE_DOCS[e] || [])];
  const uploadedByType = new Map(((data?.documents || []) as any[]).map(d => [d.documentType, d]));
  const uploadedCount = requiredDocs.filter(d => uploadedByType.has(d.type)).length;
  const missingDocs = requiredDocs.filter(d => !uploadedByType.has(d.type));

  // Per-document approve/reject state doesn't exist in the backend yet — only
  // whether it's been uploaded. Show "Verified" once the whole application is
  // Approved, "Under Review" while uploaded and pending, "Not Uploaded" if missing,
  // rather than fabricating a per-document review status the system doesn't track.
  const docStatusFor = (uploaded: boolean): DocStatusProps["status"] =>
    !uploaded ? "Not Uploaded" : status === "Approved" ? "Verified" : "Under Review";

  const isRejected = status === "Rejected";
  const everQueried = (application.statusHistory || []).some((h: any) => h.status === "Query Raised") || status === "Query Raised";

  const step1Done = submitted;
  const step2State: StatusStepProps["state"] = !submitted ? "pending" : (status === "Approved" || status === "Rejected" || everQueried) ? "done" : "active";
  const step3State: StatusStepProps["state"] = status === "Query Raised" ? "active" : everQueried ? "done" : "pending";
  const step4State: StatusStepProps["state"] = isRejected ? "rejected" : status === "Approved" ? "done" : "pending";
  // Neither "forwarded to the scheme authority" nor "reimbursement released" is
  // tracked anywhere in the backend today — both are external, post-approval
  // government-side steps with no field to source real state from, so they
  // stay "pending" (informational) even after approval, honestly.

  const heroTitle = isRejected ? "Rejected" : !submitted ? "Not Yet Submitted" : status === "Approved" ? "Approved" : status === "Query Raised" ? "Query Raised" : "Under Verification";
  const heroSub = isRejected
    ? (application.statusHistory?.slice().reverse().find((h: any) => h.status === "Rejected")?.note || "Your application was rejected. Contact your PMS coordinator for details.")
    : !submitted
      ? "Complete and submit your application to begin verification."
      : status === "Query Raised"
        ? "Admin has raised a query on your application. Please respond."
        : status === "Approved"
          ? "Your reimbursement claim has been approved."
          : "Our team is verifying your documents and details.";

  const activity = (application.statusHistory || []).slice().reverse();

  return (
    <div className="pms-status-page flex h-[calc(100dvh-58px)] min-h-0 w-full max-w-full flex-col overflow-hidden bg-white text-[#061743] [font-family:Inter,ui-sans-serif,system-ui,sans-serif]">
      <style>{`
        .pms-status-page * { box-sizing: border-box; }
        @media (min-width: 1181px) and (max-height: 900px) { .pms-status-fit { zoom: 0.90; width: 111%; } }
        @media (min-width: 1181px) and (max-height: 790px) { .pms-status-fit { zoom: 0.80; width: 124.75%; } }
      `}</style>

      <div className="flex h-[44px] min-h-[44px] shrink-0 items-center border-b border-[#dce6f1] px-5">
        <nav className="flex items-center gap-[11px] whitespace-nowrap text-[10px] font-semibold leading-none">
          <span>Exhibitor Interface</span>
          <span className="text-[#6f82a5]">›</span>
          <span className="text-[#087536]">MSME PMS Scheme</span>
          <span className="text-[#6f82a5]">›</span>
          <span className="text-[#087536]">PMS Claim Status</span>
        </nav>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden px-5 pb-[10px]">
        <header className="flex h-[72px] shrink-0 flex-col justify-center">
          <h1 className="m-0 text-[24px] font-bold leading-none tracking-[-0.2px] text-[#061743]">MSME PMS Claim Status</h1>
          <p className="m-0 mt-[8px] text-[11px] font-semibold leading-none text-[#061743]">Track your reimbursement application in real time</p>
        </header>

        <div className="pms-status-fit grid min-h-0 w-full max-w-full grid-cols-[minmax(0,1fr)_275px] gap-[18px]">
          <main className="grid min-w-0 grid-rows-[112px_144px_70px_358px_42px_35px] gap-[10px]">
            <Panel className="grid h-full grid-cols-[360px_minmax(0,1fr)] border-[#cfe5dc]">
              <div className="flex min-w-0 items-center gap-[19px] border-r border-[#dce6f1] bg-[#fbfffd] px-[24px]">
                <ClipboardCheck size={62} className={`shrink-0 ${isRejected ? "text-[#dc2626]" : "text-[#087536]"}`} strokeWidth={1.65} />
                <div className="min-w-0">
                  <p className="m-0 text-[13px] font-black leading-none text-[#087536]">Your Application is</p>
                  <h2 className={`m-0 mt-[6px] text-[17px] font-black leading-none ${isRejected ? "text-[#dc2626]" : "text-[#f08a00]"}`}>{heroTitle}</h2>
                  <p className="m-0 mt-[9px] max-w-[205px] text-[9px] font-semibold leading-[14px]">{heroSub}</p>
                </div>
              </div>

              <div className="grid min-w-0 grid-cols-[1.3fr_.85fr_.8fr_1fr] items-center gap-[15px] px-[20px]">
                <div className="min-w-0">
                  <p className="m-0 text-[8px] font-bold leading-none">Application ID</p>
                  <b className="mt-[12px] block truncate text-[11px] font-black leading-none">{applicationId}</b>
                </div>
                <div>
                  <p className="m-0 text-[8px] font-bold leading-none">Submitted On</p>
                  <b className="mt-[12px] flex items-center gap-[6px] text-[9px] font-black leading-none">
                    <CalendarDays size={13} strokeWidth={1.7} />
                    {fmtDate(application.submittedAt, "Not Submitted")}
                  </b>
                </div>
                <div>
                  <p className="m-0 text-[8px] font-bold leading-none">Claim Amount</p>
                  <b className="mt-[12px] block text-[14px] font-black leading-none">₹ {amount(claimedAmount)}</b>
                </div>
                <div>
                  <p className="m-0 text-[8px] font-bold leading-none">Current Status</p>
                  <span className={`mt-[10px] inline-flex h-[26px] items-center rounded-[5px] border px-[9px] text-[8px] font-black leading-none ${isRejected ? "border-[#f3b8b8] bg-[#fef2f2] text-[#dc2626]" : status === "Approved" ? "border-[#bfe8d1] bg-[#edf9f2] text-[#087536]" : "border-[#f2a23a] bg-[#fff7e8] text-[#c85b00]"}`}>
                    {heroTitle}
                  </span>
                </div>
              </div>
            </Panel>

            <Panel className="h-full px-[14px] pb-[10px] pt-[12px]">
              <div className="grid h-[82px] grid-cols-6 items-start gap-[2px] px-[9px]">
                <StatusStep icon={FileCheck2} title="Application Submitted" sub={fmtDate(application.submittedAt, "Not Submitted")} state={step1Done ? "done" : "pending"} connector="start" />
                <StatusStep icon={FileText} title="Document Verification" sub={step2State === "done" ? "Completed" : step2State === "active" ? "In Progress" : "Pending"} state={step2State} connector={step1Done ? "done" : "solid"} />
                <StatusStep icon={CircleHelp} title="Query Raised" sub={step3State === "pending" ? "(If Any)" : step3State === "active" ? "Awaiting Response" : "Resolved"} state={step3State} connector={step2State === "done" ? "done" : "solid"} />
                <StatusStep icon={ShieldCheck} title={isRejected ? "Rejected" : "Approved"} sub={step4State === "done" ? "Approved" : isRejected ? "Rejected" : "Pending"} state={step4State} connector="dashed" />
                <StatusStep icon={Building2} title="Forwarded to Authority" sub="Pending" state="pending" connector="dashed" />
                <StatusStep icon={Banknote} title="Reimbursement Released" sub="Pending" state="pending" connector="dashed" />
              </div>

              <div className="flex h-[29px] items-center justify-between rounded-[5px] border border-[#ffd99c] bg-[#fffaf0] px-[13px] text-[8px] font-bold text-[#b45309]">
                <span>
                  Current Stage:
                  <b className="ml-[5px]">{heroTitle}</b>
                  <span className="mx-[10px] text-[#d7a15d]">|</span>
                  Estimated Processing Time:
                  <b className="ml-[5px]">15 - 30 Working Days*</b>
                </span>
                <span className="text-[7px] text-[#596d91]">*Subject to scheme guidelines</span>
              </div>
            </Panel>

            <div className="grid h-full grid-cols-4 gap-[10px]">
              <Metric icon={Banknote} label="Claimed Amount" value={`₹ ${amount(claimedAmount)}`} tone="green" />
              <Metric icon={ShieldCheck} label="Approved Amount" value={status === "Approved" ? `₹ ${amount(approvedAmount)}` : "Pending"} tone="blue" />
              <Metric icon={Building2} label="Released Amount" value="₹ 0" tone="purple" />
              <Metric icon={CalendarDays} label="Expected Processing" value="15 - 30 Days" tone="orange" />
            </div>

            <div className="grid min-h-0 grid-cols-[1.06fr_1fr_1.08fr] gap-[10px]">
              <Panel className="h-full px-[12px] pb-[10px] pt-[13px]">
                <h3 className="m-0 mb-[10px] text-[11px] font-black leading-none">Document Verification Status</h3>
                <div className="overflow-hidden rounded-[5px] border border-[#edf2f7]">
                  <div className="grid h-[25px] grid-cols-[minmax(0,1fr)_92px] items-center bg-[#f7f9fc] px-[7px] text-[7px] font-black">
                    <span>Document Name</span>
                    <span>Status</span>
                  </div>
                  {requiredDocs.map(doc => (
                    <DocStatus key={doc.type} name={doc.label} status={docStatusFor(uploadedByType.has(doc.type))} />
                  ))}
                </div>
                <button type="button" onClick={() => navigate("/exhibitor-dashboard/msme/documents-upload")} className="mx-auto mt-[10px] flex h-[28px] w-[72%] items-center justify-center gap-[6px] rounded-[5px] border border-[#a4b0d1] bg-white text-[9px] font-black">
                  View All Documents
                  <Eye size={12} strokeWidth={1.8} />
                </button>
              </Panel>

              <Panel className="h-full px-[13px] pb-[10px] pt-[13px]">
                <h3 className="m-0 mb-[12px] text-[11px] font-black leading-none">Application Activity Log</h3>
                <div className="relative ml-[3px] grid gap-[13px] max-h-[250px] overflow-y-auto pr-1">
                  {activity.length > 0 && <div className="absolute bottom-[8px] left-[6px] top-[7px] w-px bg-[#a9b8d8]" />}
                  {activity.length === 0 ? (
                    <p className="text-[8px] font-semibold text-[#596d91]">No activity yet — activity appears here once you submit your application.</p>
                  ) : activity.map((entry: any, i: number) => {
                    const tone = entry.status === "Rejected" || entry.status === "Query Raised" ? "orange" : entry.status === "Approved" ? "green" : "blue";
                    return (
                      <div key={i} className="relative flex gap-[10px]">
                        <span className={`relative z-10 mt-[1px] flex h-[13px] w-[13px] shrink-0 items-center justify-center rounded-full border bg-white ${tone === "orange" ? "border-[#f08a00] text-[#f08a00]" : tone === "blue" ? "border-[#3154d5] text-[#3154d5]" : "border-[#087536] text-[#087536]"}`}>
                          <span className="h-[4px] w-[4px] rounded-full bg-current" />
                        </span>
                        <div className="min-w-0">
                          <p className="m-0 text-[7px] font-bold leading-none text-[#12307a]">{fmtDateTime(entry.changedAt)}</p>
                          <b className="mt-[5px] block truncate text-[8px] leading-none">{entry.status}</b>
                          {entry.note && <span className="mt-[5px] block truncate text-[7px] font-semibold leading-none text-[#31446c]">{entry.note}</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Panel>

              <Panel className="h-full px-[12px] pb-[10px] pt-[13px]">
                <h3 className="m-0 mb-[10px] text-[11px] font-black leading-none">Downloads</h3>
                <div className="grid gap-[5px]">
                  <DownloadRow title="Application Copy" sub="Download your submitted application" disabled={!submitted} />
                  {requiredDocs.filter(d => uploadedByType.has(d.type)).map(d => (
                    <DownloadRow key={d.type} title={d.label} sub="Your uploaded document" href={uploadedByType.get(d.type)?.url || undefined} />
                  ))}
                  <DownloadRow title="Approval Letter" sub="Download approval letter (Once approved)" disabled={status !== "Approved"} />
                  <DownloadRow title="Reimbursement Letter" sub="Download reimbursement release letter" disabled />
                </div>
              </Panel>
            </div>

            <div className="grid h-full grid-cols-3 gap-[18px]">
              <button type="button" onClick={() => navigate("/exhibitor-dashboard/msme/application/edit")} className="flex h-full items-center justify-center gap-[8px] rounded-[5px] bg-[#087536] text-[10px] font-black text-white transition hover:bg-[#06652f]">
                <Download size={14} strokeWidth={1.8} />
                {submitted ? "View Application" : "Complete Application"}
              </button>
              <a href={`mailto:${coordinator?.email || "pms.support@ihwe.com"}?subject=${encodeURIComponent(`Query on ${applicationId}`)}`} className="flex h-full items-center justify-center gap-[8px] rounded-[5px] border border-[#2f55d4] bg-white text-[10px] font-black text-[#061743] no-underline transition hover:bg-[#f7f9fc]">
                <CircleHelp size={14} strokeWidth={1.8} />
                Raise Query
              </a>
              <a href={coordinator?.phone ? `tel:${coordinator.phone}` : undefined} className={`flex h-full items-center justify-center gap-[8px] rounded-[5px] border border-[#087536] bg-white text-[10px] font-black text-[#087536] no-underline transition hover:bg-[#edf9f2] ${!coordinator?.phone ? "opacity-50 pointer-events-none" : ""}`}>
                <Phone size={14} strokeWidth={1.8} />
                Contact Coordinator
              </a>
            </div>

            <div className="flex h-full items-center rounded-[5px] border border-[#dce6f1] bg-[#fbfffd] px-[14px] text-[7px] font-semibold text-[#087536]">
              <ShieldCheck size={14} strokeWidth={1.8} className="mr-[8px]" />
              Note: You will receive SMS and Email notifications for every update on your application.
            </div>
          </main>

          <aside className="grid min-h-0 min-w-0 grid-rows-[265px_138px_102px_270px] gap-[10px]">
            <Panel className="h-full px-[13px] pb-[10px] pt-[12px]">
              <h3 className="m-0 mb-[8px] flex items-center gap-[7px] text-[11px] font-black leading-none text-[#087536]">
                <ClipboardCheck size={16} strokeWidth={1.75} />
                Application Summary
              </h3>
              <LabelValue label="Company Name" value={companyName} />
              <LabelValue label="MSME Category" value={msmeCategory} />
              <LabelValue label="Udyam Number" value={udyamNumber} />
              <LabelValue label="GST Number" value={gstNumber} />
              <LabelValue label="Booking Status" value={safe(data?.event?.bookingStatus, "Pending")} green={data?.event?.bookingStatus === "Confirmed"} />
              <LabelValue label="Payment Status" value={safe(data?.event?.paymentStatus, "Pending")} green={data?.event?.paymentStatus === "Fully Paid"} />
              <button type="button" onClick={() => navigate("/exhibitor-dashboard/msme/application/edit")} className="mt-[10px] h-[28px] w-full rounded-[5px] border border-[#087536] bg-white text-[9px] font-black text-[#087536] transition hover:bg-[#edf9f2]">
                View Full Application
              </button>
            </Panel>

            <Panel className="h-full px-[13px] pb-[10px] pt-[12px]">
              <h3 className="m-0 text-[11px] font-black leading-none text-[#087536]">Application Score</h3>
              <div className="mt-[12px] flex items-center gap-[15px]">
                <div className="flex h-[75px] w-[75px] shrink-0 flex-col items-center justify-center rounded-full border-[7px] border-[#087536]">
                  <b className="text-[17px] leading-none">{Math.round((uploadedCount / (requiredDocs.length || 1)) * 100)}%</b>
                  <span className="mt-[4px] text-[7px] font-bold leading-none">Complete</span>
                </div>
                <div className="min-w-0">
                  <b className="block text-[12px] font-black leading-none text-[#087536]">{missingDocs.length === 0 ? "Excellent!" : `${missingDocs.length} pending`}</b>
                  <span className="mt-[9px] block text-[8px] font-semibold leading-[13px]">
                    {missingDocs.length === 0 ? "All required documents are uploaded." : `${missingDocs.slice(0, 2).map(d => d.label).join(", ")}${missingDocs.length > 2 ? "..." : ""} still pending.`}
                  </span>
                </div>
              </div>
            </Panel>

            <Panel className="h-full border-[#ffd99c] bg-[#fffaf0] px-[13px] py-[12px]">
              <h3 className="m-0 flex items-center gap-[7px] text-[10px] font-black leading-none text-[#c85b00]">
                <FileText size={16} strokeWidth={1.75} />
                Current Stage
              </h3>
              <b className="ml-[23px] mt-[9px] block text-[10px] leading-none">{heroTitle}</b>
              <p className="m-0 ml-[23px] mt-[8px] text-[7px] font-semibold leading-[11px]">{heroSub}</p>
            </Panel>

            <Panel className="h-full border-[#ded8f7] px-[13px] pb-[10px] pt-[12px]">
              <h3 className="m-0 mb-[10px] flex items-center gap-[7px] text-[11px] font-black leading-none text-[#5b20e6]">
                <Headphones size={16} strokeWidth={1.8} />
                PMS Coordinator
              </h3>
              <div className="flex items-center gap-[10px]">
                {coordinator?.photo ? (
                  <img className="h-[48px] w-[48px] rounded-full bg-[#eef2f7] object-cover" src={coordinator.photo} alt={coordinator.name} />
                ) : (
                  <div className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#eef2f7] text-[11px] font-black text-[#5b20e6]">{coordinator?.initials || "PM"}</div>
                )}
                <div className="min-w-0">
                  <b className="block text-[10px] font-black leading-none">{safe(coordinator?.name, "Not yet assigned")}</b>
                  <span className="mt-[6px] block whitespace-nowrap text-[8px] font-semibold leading-none">{coordinator?.designation || "PMS Scheme Coordinator"}</span>
                </div>
              </div>

              <a href={coordinator?.phone ? `tel:${coordinator.phone}` : undefined} className={`mt-[10px] flex h-[30px] items-center gap-[9px] rounded-[4px] border border-[#e1e9f2] px-[10px] text-[9px] font-black text-[#061743] no-underline ${!coordinator?.phone ? "opacity-50 pointer-events-none" : ""}`}>
                <Phone size={13} strokeWidth={1.8} className="text-[#142d75]" />
                {coordinator?.phone || "Not available yet"}
              </a>
              <a href={coordinator?.phone ? `https://wa.me/${String(coordinator.phone).replace(/\D/g, "")}` : undefined} target="_blank" rel="noreferrer" className={`mt-[5px] flex h-[30px] items-center gap-[9px] rounded-[4px] border border-[#e1e9f2] px-[10px] text-[9px] font-black text-[#061743] no-underline ${!coordinator?.phone ? "opacity-50 pointer-events-none" : ""}`}>
                <MessageCircle size={13} strokeWidth={1.8} className="text-[#087536]" />
                WhatsApp Chat
              </a>
              <a href={`mailto:${coordinator?.email || "pms.support@ihwe.com"}`} className="mt-[5px] flex h-[30px] items-center gap-[9px] rounded-[4px] border border-[#e1e9f2] px-[10px] text-[9px] font-black text-[#061743] no-underline">
                <Mail size={13} strokeWidth={1.8} className="text-[#5b20e6]" />
                <span className="min-w-0 truncate">{coordinator?.email || "pms.support@ihwe.com"}</span>
              </a>
              <a href={`mailto:${coordinator?.email || "pms.support@ihwe.com"}?subject=${encodeURIComponent("MSME PMS Helpdesk")}`} className="mt-[9px] flex h-[28px] w-full items-center justify-center rounded-[5px] border border-[#8c55f4] bg-white text-[9px] font-black text-[#5b20e6] no-underline transition hover:bg-[#f6f1ff]">
                Contact PMS Helpdesk
              </a>
            </Panel>
          </aside>
        </div>
      </div>
    </div>
  );
}
