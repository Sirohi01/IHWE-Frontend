import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  Award,
  Banknote,
  Bell,
  Building2,
  Check,
  Eye,
  FileCheck2,
  FileText,
  Folder,
  Landmark,
  Loader2,
  Lock,
  Mail,
  PenLine,
  Phone,
  Printer,
  Receipt,
  ShieldCheck,
  Trash2,
  Upload,
} from "lucide-react";
import { useExhibitorCtx } from "@/context/ExhibitorContext";
import { useMsmePmsApplication } from "@/hooks/useMsmePmsApplication";

const PMS_STAGE_LABELS = ["Application & Submission", "Claim Documents", "Claim & Reimbursement"];

const DOC_ICONS = {
  udyam: ShieldCheck,
  onlineApplicationPrintout: Printer,
  stallBookingLetter: Building2,
  taxInvoice: Receipt,
  paymentProof: Banknote,
  bankMandate: Landmark,
  participationProof: Award,
  productActivityDetails: FileCheck2,
  caCertificateTurnover: Award,
  declarationLetterhead: PenLine,
  authorityLetter: PenLine,
  otherSupportingDocument: FileText,
};

const fmtDate = (d) => (d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—");

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
                {done ? "Completed" : active ? "In Progress" : "Pending"}
              </span>
            </div>
            {num < PMS_STAGE_LABELS.length && <div className={`w-16 sm:w-24 h-[2px] mt-[-18px] ${num < current ? "bg-emerald-500" : "bg-slate-200"}`} />}
          </Fragment>
        );
      })}
    </div>
  );
}

function Card({ icon: Icon, title, tone = "blue", action, children, className = "" }) {
  const toneMap = {
    emerald: { bg: "bg-[#f4fff8]", text: "text-[#087536]", border: "border-l-emerald-500" },
    orange: { bg: "bg-orange-50", text: "text-orange-600", border: "border-l-orange-500" },
    blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-l-blue-500" },
    violet: { bg: "bg-violet-50", text: "text-violet-600", border: "border-l-violet-500" },
  };
  const c = toneMap[tone] || toneMap.blue;
  return (
    <section className={`min-w-0 rounded-xl border border-slate-200 border-l-4 ${c.border} ${c.bg} p-3 ${className}`}>
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {Icon && (
            <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white ${c.text}`}>
              <Icon size={15} strokeWidth={2} />
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

function ProgressRing({ percent }) {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  return (
    <svg width="76" height="76" viewBox="0 0 72 72" className="shrink-0">
      <circle cx="36" cy="36" r={radius} className="fill-none stroke-slate-100" strokeWidth={6} />
      <circle cx="36" cy="36" r={radius} className="fill-none stroke-emerald-500 transition-[stroke-dashoffset] duration-300" strokeWidth={6} strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} transform="rotate(-90 36 36)" />
      <text x="36" y="33" textAnchor="middle" className="fill-slate-800 text-[13px] font-bold">{percent}%</text>
      <text x="36" y="46" textAnchor="middle" className="fill-slate-400 text-[6.5px] font-bold uppercase">Complete</text>
    </svg>
  );
}

function DocCard({ index, doc, entries, onUpload, onDelete, onView, uploading, deletingId }) {
  const notApplicable = entries.some((e) => e.notApplicable);
  const files = entries.filter((e) => e.path && !e.notApplicable);
  const uploaded = files.length > 0;
  const anyRejected = files.some((e) => e.status === "Rejected");
  const allVerified = uploaded && files.every((e) => e.status === "Verified");

  const statusMeta = notApplicable
    ? { label: "Not Applicable", tone: "text-slate-400", icon: <Check size={11} /> }
    : anyRejected
      ? { label: "Re-upload Required", tone: "text-red-600", icon: <FileText size={11} /> }
      : allVerified
        ? { label: "Verified", tone: "text-emerald-600", icon: <Check size={11} /> }
        : uploaded
          ? { label: `Uploaded${files.length > 1 ? ` (${files.length} files)` : ""}`, tone: "text-blue-600", icon: <Check size={11} /> }
          : { label: "Pending", tone: "text-orange-500", icon: <FileText size={11} /> };

  const badgeTone = notApplicable ? "bg-slate-100 text-slate-400" : uploaded ? "bg-emerald-600 text-white" : "bg-orange-500 text-white";
  const isImportant = doc.required && !uploaded && !notApplicable;
  const Icon = doc.icon;

  return (
    <div className={`flex flex-col rounded-lg border bg-white p-2.5 ${isImportant ? "border-red-300 ring-1 ring-red-100" : "border-slate-200"}`}>
      {isImportant && (
        <span className="mb-1.5 inline-flex w-fit items-center gap-1 rounded-full bg-red-50 px-1.5 py-0.5 text-[8.5px] font-bold text-red-600">
          <AlertTriangle size={9} /> Important
        </span>
      )}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2 min-w-0">
          <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-md text-[10px] font-bold ${badgeTone}`}>{String(index + 1).padStart(2, "0")}</span>
          <div className="min-w-0">
            <strong className="block text-[11px] font-bold text-slate-800 leading-tight">{doc.label}</strong>
            <span className="text-[9px] font-semibold text-slate-400">Requirement: {doc.required ? "Mandatory" : "If Applicable"}</span>
          </div>
        </div>
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-slate-50 text-slate-400"><Icon size={16} strokeWidth={1.7} /></span>
      </div>

      <div className={`mt-2 flex items-center gap-1 text-[10px] font-bold ${statusMeta.tone}`}>{statusMeta.icon} {statusMeta.label}</div>

      {uploaded && (
        <ul className="mt-1.5 space-y-1">
          {files.map((f) => (
            <li key={f._id} className="flex items-center justify-between gap-1 rounded-md bg-slate-50 px-1.5 py-1">
              <button type="button" onClick={() => onView(f.path)} className="flex min-w-0 items-center gap-1 text-left text-[9px] font-semibold text-slate-600 hover:text-blue-600">
                <Eye size={10} className="shrink-0" />
                <span className="truncate">{f.filename}</span>
              </button>
              {!allVerified && (
                <button type="button" disabled={deletingId === f._id} onClick={() => onDelete(doc.type, f._id)} className="shrink-0 text-slate-300 hover:text-red-500 disabled:opacity-40">
                  {deletingId === f._id ? <Loader2 size={11} className="animate-spin" /> : <Trash2 size={11} />}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-2">
        {notApplicable ? (
          <button type="button" disabled className="w-full rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-[10px] font-bold text-slate-400">Not Applicable</button>
        ) : allVerified ? (
          <button type="button" disabled className="flex w-full items-center justify-center gap-1.5 rounded-md border border-emerald-100 bg-emerald-50 px-2 py-1.5 text-[10px] font-bold text-emerald-600">
            <Lock size={11} /> Approved — Locked
          </button>
        ) : (
          <label className={`flex w-full items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-[10px] font-bold cursor-pointer ${uploading ? "bg-slate-100 text-slate-400" : uploaded ? "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50" : "bg-orange-50 text-orange-600 hover:bg-orange-100"}`}>
            {uploading ? <Loader2 size={12} className="animate-spin" /> : <Upload size={12} />}
            {uploading ? "Uploading..." : uploaded ? "Add More Files" : "Upload Document"}
            <input type="file" multiple accept="application/pdf,image/jpeg,image/png" className="hidden" disabled={uploading} onChange={(e) => { const fileList = Array.from(e.target.files || []); e.target.value = ""; if (fileList.length) onUpload(doc.type, fileList); }} />
          </label>
        )}
      </div>
    </div>
  );
}

export default function MSMEPMSClaimDocuments() {
  const navigate = useNavigate();
  const { data: exhibitorData } = useExhibitorCtx();
  const pms = useMsmePmsApplication(exhibitorData);
  const [uploadingType, setUploadingType] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  if (pms.loading) {
    return (
      <div className="flex h-[60vh] w-full items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-[#087536]" />
      </div>
    );
  }

  const data = pms.data || {};
  const claimDocs = Array.isArray(data.pmsClaimDocuments) && data.pmsClaimDocuments.length
    ? data.pmsClaimDocuments.map((d) => ({ ...d, icon: DOC_ICONS[d.type] || FileText }))
    : [];
  const documentsByType = new Map();
  (data.documents || []).forEach((d) => {
    const list = documentsByType.get(d.documentType) || [];
    list.push(d);
    documentsByType.set(d.documentType, list);
  });
  const actionRequired = data.actionRequired;
  const hasOpenAction = actionRequired && actionRequired.resolved === false;
  const rm = data.pmsCoordinator;

  const rows = claimDocs.map((doc) => {
    const entries = documentsByType.get(doc.type) || [];
    const notApplicable = entries.some((e) => e.notApplicable);
    const files = entries.filter((e) => e.path && !e.notApplicable);
    const uploaded = files.length > 0;
    const verified = uploaded && files.every((e) => e.status === "Verified");
    const rejected = files.some((e) => e.status === "Rejected");
    return { doc, entries, notApplicable, uploaded, verified, rejected };
  });

  const totalRequired = rows.length;
  const uploadedCount = rows.filter((r) => r.uploaded).length;
  const verifiedCount = rows.filter((r) => r.verified).length;
  const notApplicableCount = rows.filter((r) => r.notApplicable).length;
  const reuploadCount = rows.filter((r) => r.rejected).length;
  const pendingCount = totalRequired - uploadedCount - notApplicableCount;
  const percentComplete = totalRequired ? Math.round(((uploadedCount + notApplicableCount) / totalRequired) * 100) : 0;
  const pendingDocs = rows.filter((r) => !r.uploaded && !r.notApplicable);

  const handleUpload = async (type, files) => {
    setUploadingType(type);
    try {
      for (const file of files) {
        // eslint-disable-next-line no-await-in-loop
        await pms.uploadDocument(type, file);
      }
    } finally {
      setUploadingType(null);
    }
  };

  const handleDelete = async (type, documentId) => {
    setDeletingId(documentId);
    try { await pms.deleteDocument(type, documentId); } finally { setDeletingId(null); }
  };

  return (
    <div className="flex flex-col gap-3 p-1">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-[19px] font-bold text-[#061743]">
            <ShieldCheck size={20} className="text-[#087536]" />
            Claim Documents
          </h1>
          <p className="mt-1 text-[11.5px] text-slate-500">Upload and track the mandatory documents required for PMS reimbursement claim.</p>
        </div>
        <div className="overflow-x-auto">
          <StageStepper stage={2} />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-2 items-stretch">
        <section className="min-w-0 rounded-xl border border-slate-200 border-l-4 border-l-blue-500 bg-blue-50 p-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 items-center">
            <div className="col-span-2 sm:col-span-1 flex items-center gap-3">
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-white text-blue-500">
                <Folder size={30} strokeWidth={1.6} />
              </span>
              <strong className="text-[13px] font-bold leading-tight text-slate-800">Documents<br />Summary</strong>
            </div>
            <div className="text-center"><span className="block text-[9.5px] font-semibold text-slate-400">Total Required</span><strong className="text-[16px] font-bold text-slate-800">{totalRequired}</strong></div>
            <div className="text-center"><span className="block text-[9.5px] font-semibold text-slate-400">Uploaded</span><strong className="text-[16px] font-bold text-emerald-600">{uploadedCount}</strong></div>
            <div className="text-center"><span className="block text-[9.5px] font-semibold text-slate-400">Verified</span><strong className="text-[16px] font-bold text-blue-600">{verifiedCount}</strong></div>
            <div className="text-center"><span className="block text-[9.5px] font-semibold text-slate-400">Pending / To Upload</span><strong className="text-[16px] font-bold text-orange-500">{pendingCount}</strong></div>
            <div className="text-center"><span className="block text-[9.5px] font-semibold text-slate-400">Re-upload Required</span><strong className="text-[16px] font-bold text-red-500">{reuploadCount}</strong></div>
            <div className="flex justify-center"><ProgressRing percent={percentComplete} /></div>
          </div>
        </section>

        <Card icon={Bell} title="Important" tone="orange">
          <p className="text-[10.5px] text-slate-600">Upload all pending documents before due dates to avoid delays in reimbursement.</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-2 items-start">
        <Card icon={FileText} title={`Required Documents (${totalRequired})`} tone="blue">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {rows.map((r, i) => (
              <DocCard
                key={r.doc.type}
                index={i}
                doc={r.doc}
                entries={r.entries}
                uploading={uploadingType === r.doc.type}
                deletingId={deletingId}
                onUpload={handleUpload}
                onDelete={handleDelete}
                onView={(path) => window.open(path, "_blank", "noopener,noreferrer")}
              />
            ))}
          </div>
        </Card>

        <div className="flex flex-col gap-2">
          <Card icon={FileCheck2} title="Document Guidelines" tone="blue">
            <ul className="list-disc space-y-1.5 pl-4 text-[10px] font-medium text-slate-600">
              <li>All documents must be clear, legible and valid.</li>
              <li>File format: PDF, JPG, PNG.</li>
              <li>Maximum file size: 10 MB per file.</li>
              <li>Ensure documents are uploaded before the due date.</li>
            </ul>
          </Card>

          <Card icon={Bell} title="Upcoming Due Dates" tone="orange">
            {hasOpenAction && actionRequired?.dueDate && pendingDocs.length > 0 ? (
              <div>
                <strong className="block text-[10.5px] font-bold text-orange-600">{fmtDate(actionRequired.dueDate)}</strong>
                <p className="mt-1 text-[9.5px] text-slate-500">{pendingDocs.map((r) => r.doc.label).join(", ")}</p>
              </div>
            ) : (
              <p className="text-[10.5px] text-slate-400">No due dates pending right now.</p>
            )}
          </Card>

          <Card icon={Award} title="Relationship Manager (Organiser)" tone="violet">
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
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
        <p className="flex items-center gap-2 text-[10px] text-slate-500">
          <ShieldCheck size={13} className="text-[#087536] shrink-0" />
          Please ensure all pending documents are uploaded before the due date to avoid reimbursement delays.
        </p>
        <div className="flex gap-2">
          <button type="button" onClick={() => navigate("/exhibitor-dashboard/msme/application")} className="shrink-0 rounded-md border border-slate-200 bg-white px-3.5 py-1.5 text-[10.5px] font-bold text-slate-600 hover:bg-slate-50">
            Back
          </button>
          <button type="button" onClick={() => navigate("/exhibitor-dashboard/msme/claim-reimbursement")} className="shrink-0 rounded-md bg-[#087536] px-4 py-1.5 text-[10.5px] font-bold text-white hover:bg-[#06652f]">
            Save &amp; Next
          </button>
        </div>
      </div>
    </div>
  );
}
