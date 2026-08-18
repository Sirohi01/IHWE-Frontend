import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  ArrowRight,
  Award,
  Banknote,
  Building2,
  Calendar,
  Check,
  ClipboardList,
  Clock,
  Download,
  ExternalLink,
  FileCheck2,
  Landmark,
  Loader2,
  Lock,
  Mail,
  Phone,
  Receipt,
  ShieldCheck,
} from "lucide-react";
import { useExhibitorCtx } from "@/context/ExhibitorContext";
import { useMsmePmsApplication } from "@/hooks/useMsmePmsApplication";

const PMS_STAGE_LABELS = ["Application & Submission", "Claim Documents", "Claim & Reimbursement"];

const safe = (value, fallback = "—") => (value === null || value === undefined || value === "" ? fallback : value);
const fmtDate = (d) => (d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—");
const fmtDateTime = (d) => (d ? new Date(d).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "—");

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

function Card({ icon: Icon, title, tone = "blue", action, children }) {
  const toneMap = {
    emerald: { bg: "bg-[#f4fff8]", text: "text-[#087536]", border: "border-l-emerald-500" },
    orange: { bg: "bg-orange-50", text: "text-orange-600", border: "border-l-orange-500" },
    red: { bg: "bg-red-50", text: "text-red-600", border: "border-l-red-500" },
    blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-l-blue-500" },
    violet: { bg: "bg-violet-50", text: "text-violet-600", border: "border-l-violet-500" },
  };
  const c = toneMap[tone] || toneMap.blue;
  return (
    <section className={`min-w-0 rounded-xl border border-slate-200 border-l-4 ${c.border} ${c.bg} p-3`}>
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

function Field({ label, value, children }) {
  return (
    <div>
      <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wide">{label}</span>
      {children || <strong className="block text-[12.5px] font-bold text-slate-800 mt-0.5">{value}</strong>}
    </div>
  );
}

function InlineField({ label, value, children }) {
  return (
    <div className="flex items-center justify-between gap-2 border-b border-slate-100 py-1 last:border-b-0">
      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide shrink-0">{label}</span>
      {children || <strong className="text-[11.5px] font-bold text-slate-800 text-right">{value}</strong>}
    </div>
  );
}

function TimelineCard({ icon: Icon, title, date, pendingLabel, desc, state, isLast }) {
  const done = state === "done";
  const active = state === "active";
  const rejected = state === "rejected";
  return (
    <div className="relative">
      {!isLast && (
        <div className={`hidden sm:block absolute top-[18px] left-[calc(50%+20px)] w-[calc(100%-40px)] h-0 border-t-2 ${done ? "border-emerald-400 border-solid" : "border-slate-200 border-dashed"}`} />
      )}
      <div className={`relative z-10 h-full rounded-lg border p-2.5 ${active ? "border-[#087536] bg-[#f4fff8]" : rejected ? "border-red-200 bg-red-50" : "border-slate-200 bg-white"}`}>
        <span className={`grid h-9 w-9 place-items-center rounded-full ${done ? "bg-emerald-500 text-white" : active ? "bg-[#087536] text-white" : rejected ? "bg-red-500 text-white" : "bg-slate-100 text-slate-400"}`}>
          {state === "pending" ? <Lock size={15} /> : <Icon size={16} />}
        </span>
        <b className="mt-2 block text-[10.5px] font-bold text-slate-800">{title}</b>
        <span className="mt-0.5 block text-[9px] font-semibold text-slate-400">{date || pendingLabel}</span>
        <p className="mt-1 text-[9px] leading-snug text-slate-500">{desc}</p>
        {active && <span className="mt-1.5 inline-block rounded-full bg-[#087536] px-2 py-0.5 text-[8px] font-bold text-white">Current Status</span>}
      </div>
    </div>
  );
}

export default function MSMEPMSApplicationStatus() {
  const navigate = useNavigate();
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
  const application = pms.application || {};
  const portal = data.msmePortal || {};
  const udyam = data.udyamDetails || {};
  const sanction = data.sanction || {};
  const reimbursement = data.reimbursement || {};
  const rm = data.pmsCoordinator;
  const actionRequired = data.actionRequired;
  const hasOpenAction = actionRequired && actionRequired.resolved === false;
  const documents = (Array.isArray(data.documents) ? data.documents : []).filter((d) => d.path);
  const uploadedByType = new Map(documents.map((d) => [d.documentType, d]));
  const requiredDocs = Array.isArray(data.pmsClaimDocuments) ? data.pmsClaimDocuments : [];
  const submitted = Boolean(application.submittedAt || portal.submittedOn);
  const udyamDoc = uploadedByType.get("udyam");
  const udyamExtracted = udyamDoc?.extractedDetails || {};

  const step1Done = submitted;
  const step2Done = portal.currentStatus === "Approved" || sanction.status !== "Pending";
  const step2Active = submitted && !step2Done;
  const step3Done = sanction.status === "Sanctioned";
  const step3Active = step2Done && !step3Done && sanction.status !== "Rejected";
  const step4Done = reimbursement.status === "Received";
  const step4Active = step3Done && !step4Done;

  return (
    <div className="flex flex-col gap-3 p-1">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-[19px] font-bold text-[#061743]">
            <ShieldCheck size={20} className="text-[#087536]" />
            MSME PMS Application Status
          </h1>
          <p className="mt-1 text-[11.5px] text-slate-500">Track your MSME PMS application and reimbursement status.</p>
        </div>

        <div className="overflow-x-auto">
          <StageStepper stage={1} />
        </div>
      </div>

      {/* ROW 1: PROFILE + APPLICATION SUMMARY */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-2">
        <Card icon={Building2} title="Client (Exhibitor) Profile" tone="blue">
          <div className="flex items-start gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600">
              <Building2 size={22} />
            </span>
            <div className="min-w-0 flex-1">
              <strong className="block text-[13px] font-bold text-slate-800">{safe(data.companyName || data.exhibitorName)}</strong>
              <div className="mt-2 grid grid-cols-2 sm:grid-cols-5 gap-x-4 gap-y-2">
                <Field label="Stall No." value={safe(data.event?.stallNumber)} />
                <Field label="Stall Size" value={data.event?.stallSize ? `${data.event.stallSize} Sq. Mtr.` : "—"} />
                <Field label="Applicant Category" value={safe(data.msme?.msmeCategory || data.category)} />
                <Field label="Total Invoice Value" value={data.payment?.invoiceValue ? `₹${Number(data.payment.invoiceValue).toLocaleString("en-IN")}` : "—"} />
                <Field label="Event Name" value={safe(data.event?.name)} />
              </div>
            </div>
          </div>
        </Card>

        <Card icon={Landmark} title="MSME PMS Application" tone="blue">
          <div className="flex items-center gap-3">
            <div className="grid grid-cols-2 grid-rows-2 grid-flow-col gap-2.5 flex-1">
              <Field label="Application No." value={safe(portal.applicationNo)} />
              <Field label="Submitted On" value={fmtDateTime(portal.submittedOn)} />
              <Field label="Portal Status" children={portal.currentStatus ? <span className={`inline-block mt-0.5 rounded-full text-[10px] font-bold px-2 py-0.5 border ${statusTone(portal.currentStatus)}`}>{portal.currentStatus}</span> : undefined} />
              <Field label="Last Updated" value={fmtDateTime(portal.lastStatusChecked)} />
            </div>
            <span className="hidden sm:grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
              <ShieldCheck size={30} strokeWidth={1.6} />
            </span>
          </div>
        </Card>
      </div>

      {hasOpenAction && (
        <Card icon={AlertTriangle} title="Action Required" tone="red">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <p className="text-[11px] text-slate-600">{actionRequired.message}</p>
              {actionRequired.dueDate && <p className="mt-1 text-[10px] text-red-600 font-semibold flex items-center gap-1"><Calendar size={11} /> Due Date: {fmtDate(actionRequired.dueDate)}</p>}
            </div>
            <button type="button" onClick={() => navigate("/exhibitor-dashboard/msme/claim-documents")} className="shrink-0 rounded-md bg-orange-500 px-3.5 py-1.5 text-[10.5px] font-bold text-white hover:bg-orange-600">
              View Query / Upload Document
            </button>
          </div>
        </Card>
      )}

      {/* ROW 2: 4 CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2 items-stretch">
        <Card icon={ShieldCheck} title="Udyam Registration Details" tone="violet">
          <div>
            <InlineField label="Udyam Reg. No." value={safe(data.udyamNumber || data.msme?.udyamRegNo || udyamExtracted["Udyam Registration Number"])} />
            <InlineField label="Enterprise Name" value={safe(udyamExtracted["Enterprise Name"])} />
            <InlineField label="Date of Registration" value={safe(udyamExtracted["Date of Registration"])} />
            <InlineField label="Registration Type" value={safe(udyam.registrationType || udyamExtracted["Registration Type"])} />
            <InlineField label="Enterprise Type" value={safe(udyam.enterpriseType || udyamExtracted["Type of Enterprise (Micro/Small/Medium)"] || data.msme?.msmeCategory)} />
            <InlineField label="Major Activity" value={safe(udyam.majorActivity || udyamExtracted["Major Activity (Manufacturing/Service/Trading)"])} />
            <InlineField label="Social Category" value={safe(udyam.socialCategory || udyamExtracted["Social Category"])} />
            <InlineField label="Constitution" value={safe(udyam.constitution || udyamExtracted["Constitution / Organisation Type"])} />
            <InlineField label="Date of Incorporation" value={udyam.dateOfIncorporation ? fmtDate(udyam.dateOfIncorporation) : safe(udyamExtracted["Date of Incorporation / Commencement"])} />
          </div>
          {udyamDoc?.path && (
            <a href={udyamDoc.path} target="_blank" rel="noreferrer" className="mt-2 flex items-center justify-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-bold text-slate-600 hover:bg-slate-50">
              <Download size={12} /> View Udyam Certificate
            </a>
          )}
        </Card>

        <Card icon={Landmark} title="MSME Portal Submission" tone="blue">
          <div>
            <InlineField label="Submitted On" value={fmtDateTime(portal.submittedOn)} />
            <InlineField label="Submitted By" value={safe(portal.submittedBy)} />
            <InlineField label="MSME Portal" children={
              <a href="https://my.msme.gov.in/MyMsme/Reg/COM_Matu.aspx" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[10.5px] font-bold text-blue-600 hover:underline">
                Visit Portal <ExternalLink size={11} />
              </a>
            } />
          </div>
          {portal.acknowledgementFile ? (
            <a href={portal.acknowledgementFile} target="_blank" rel="noreferrer" className="mt-2 flex items-center justify-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-bold text-slate-600 hover:bg-slate-50">
              <Download size={12} /> View Acknowledgement
            </a>
          ) : (
            <p className="mt-2 rounded-md bg-white px-2.5 py-1.5 text-center text-[9.5px] text-slate-400">Acknowledgement not uploaded yet.</p>
          )}
        </Card>

        <Card icon={Receipt} title="PMS Scheme Summary" tone="emerald">
          <InlineField label="Maximum Reimbursement Limit" value="₹1,50,000" />
          <InlineField label="Estimated Reimbursement" value={data.claim?.eligibleAmount ? `₹${Number(data.claim.eligibleAmount).toLocaleString("en-IN")}` : "—"} />
          <p className="mt-2 rounded-md bg-white px-2.5 py-1.5 text-[9.5px] text-slate-500">Final reimbursement is subject to MSME-DFO approval.</p>
        </Card>

        <Card icon={Award} title="Relationship Manager (Organiser)" tone="orange">
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
            </>
          ) : (
            <p className="text-[10.5px] text-slate-400">Not yet assigned.</p>
          )}
        </Card>
      </div>

      {/* ROW 3: DOCUMENT DUE DATES + STATUS TIMELINE */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-2 items-stretch">
        <Card icon={Calendar} title="Important Document Due Dates" tone="blue">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_92px] gap-2 items-start">
            <div className="min-w-0">
              {requiredDocs.length === 0 ? (
                <p className="text-[10px] text-slate-400 py-2 text-center">No documents required yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="text-[8.5px] font-bold uppercase text-slate-400 border-b border-slate-100">
                        <th className="py-1 px-1">Document</th>
                        <th className="py-1 px-1">Status</th>
                        <th className="py-1 px-1">Due Date</th>
                        <th className="py-1 px-1">Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requiredDocs.map((doc) => {
                        const uploadedDoc = uploadedByType.get(doc.type);
                        const uploaded = Boolean(uploadedDoc);
                        const dueDate = !uploaded && actionRequired?.dueDate ? fmtDate(actionRequired.dueDate) : "—";
                        const remarks = uploaded ? safe(uploadedDoc.portalStatus, "Submitted") : hasOpenAction ? "Required as per query" : "—";
                        return (
                          <tr key={doc.type} className="border-b border-slate-50 text-[9.5px]">
                            <td className="py-1 px-1 font-semibold text-slate-700">{doc.label}</td>
                            <td className="py-1 px-1">
                              <span className={`rounded-full px-1.5 py-0.5 text-[8.5px] font-bold ${uploaded ? "bg-emerald-50 text-emerald-700" : "bg-orange-50 text-orange-600"}`}>
                                {uploaded ? "Uploaded" : "Pending"}
                              </span>
                            </td>
                            <td className="py-1 px-1 text-slate-500">{dueDate}</td>
                            <td className="py-1 px-1 text-slate-500">{remarks}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
              <button type="button" onClick={() => navigate("/exhibitor-dashboard/msme/claim-documents")} className="mt-1.5 flex items-center gap-1 text-[10px] font-bold text-blue-600 hover:underline">
                View All Documents <ArrowRight size={11} />
              </button>
            </div>
            <div className="hidden md:flex flex-col items-center justify-center rounded-lg border border-slate-100 bg-white p-2 text-center">
              <span className="mb-1.5 grid h-8 w-8 place-items-center rounded-lg bg-blue-50 text-blue-500">
                <ClipboardList size={16} strokeWidth={1.6} />
              </span>
              <p className="text-[8px] leading-snug text-slate-500">Please ensure all pending documents are uploaded before the due date.</p>
            </div>
          </div>
        </Card>

        <Card icon={Clock} title="Application Status Timeline" tone="blue">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <TimelineCard
              icon={FileCheck2}
              title="Application Submitted"
              date={submitted ? fmtDateTime(application.submittedAt || portal.submittedOn) : null}
              pendingLabel="Not yet submitted"
              desc="Application successfully submitted on MSME portal."
              state={step1Done ? "done" : "pending"}
            />
            <TimelineCard
              icon={ShieldCheck}
              title="Under Scrutiny"
              date={step2Active ? fmtDateTime(portal.lastStatusChecked) : null}
              pendingLabel="Pending"
              desc="Application is under scrutiny by MSME-DFO."
              state={step2Done ? "done" : step2Active ? "active" : "pending"}
            />
            <TimelineCard
              icon={Receipt}
              title="Sanction"
              date={step3Done ? fmtDate(sanction.orderDate) : null}
              pendingLabel="Yet to be processed"
              desc={sanction.status === "Rejected" ? "Sanction request was rejected." : "Application will be sanctioned by MSME-DFO."}
              state={sanction.status === "Rejected" ? "rejected" : step3Done ? "done" : step3Active ? "active" : "pending"}
              isLast={false}
            />
            <TimelineCard
              icon={Banknote}
              title="Reimbursement"
              date={step4Done ? fmtDate(reimbursement.paymentDate) : null}
              pendingLabel="Yet to be initiated"
              desc="Reimbursement will be processed after sanction."
              state={step4Done ? "done" : step4Active ? "active" : "pending"}
              isLast
            />
          </div>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
        <p className="flex items-center gap-2 text-[10px] text-slate-500">
          <ShieldCheck size={13} className="text-[#087536] shrink-0" />
          The above information is fetched from the MSME portal and updated regularly. For any discrepancy, please contact PMS Support.
        </p>
        <button
          type="button"
          onClick={() => navigate("/exhibitor-dashboard/msme/claim-documents")}
          className="shrink-0 flex items-center justify-center gap-1.5 rounded-md bg-[#087536] px-4 py-1.5 text-[10.5px] font-bold text-white hover:bg-[#06652f]"
        >
          Save &amp; Next <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}
