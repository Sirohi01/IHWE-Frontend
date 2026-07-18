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
  Mail,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";
import type { ElementType, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useExhibitorCtx } from "@/context/ExhibitorContext";

const safe = (value: unknown, fallback: string) => {
  const text = String(value ?? "").trim();
  return text || fallback;
};

const amount = (value: number) => value.toLocaleString("en-IN");

type PanelProps = {
  children: ReactNode;
  className?: string;
};

function Panel({ children, className = "" }: PanelProps) {
  return (
    <section
      className={`overflow-hidden rounded-[8px] border border-[#dce6f1] bg-white shadow-[0_1px_2px_rgba(6,23,67,0.025)] ${className}`}
    >
      {children}
    </section>
  );
}

type LabelValueProps = {
  label: string;
  value: string;
  green?: boolean;
};

function LabelValue({ label, value, green = false }: LabelValueProps) {
  return (
    <div className="grid min-h-[27px] grid-cols-[minmax(0,1fr)_auto] items-center gap-2 border-b border-[#edf2f7] last:border-b-0">
      <span className="truncate text-[8px] font-bold leading-none text-[#061743]">
        {label}
      </span>
      <span
        className={`max-w-[150px] truncate text-right text-[8px] font-semibold leading-none ${green ? "text-[#087536]" : "text-[#061743]"
          }`}
        title={value}
      >
        {value}
      </span>
    </div>
  );
}

type ProgressArrowTone = "start" | "done" | "solid" | "dashed";

function ProgressArrow({ tone }: { tone: ProgressArrowTone }) {
  const isStart = tone === "start";
  const isDashed = tone === "dashed";
  const color =
    tone === "start"
      ? "#aab9d3"
      : tone === "done"
        ? "#087536"
        : "#142d75";

  return (
    <svg
      viewBox="0 0 72 14"
      className={`pointer-events-none absolute top-[18px] h-[14px] ${isStart ? "left-[-8px] w-[32px]" : "left-[-47px] w-[76px]"
        }`}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 7H67"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeDasharray={isDashed ? "2.5 3.5" : undefined}
      />
      <path
        d="M62.5 2.5L67 7L62.5 11.5"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type StatusStepProps = {
  icon: ElementType;
  title: string;
  sub: string;
  state: "done" | "active" | "pending";
  connector: ProgressArrowTone;
};

function StatusStep({
  icon: Icon,
  title,
  sub,
  state,
  connector,
}: StatusStepProps) {
  const active = state === "active";
  const done = state === "done";

  return (
    <div className="relative flex min-w-0 flex-col items-center text-center">
      <ProgressArrow tone={connector} />

      <div
        className={`flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-full border ${done
          ? "border-[#bfe8d1] bg-[#edf9f2] text-[#087536]"
          : active
            ? "border-[#f2a23a] bg-[#fff7e8] text-[#f08a00]"
            : "border-[#d7dee8] bg-[#f8fafc] text-[#31446c]"
          }`}
      >
        <Icon size={21} strokeWidth={1.75} />
      </div>

      <b className="mt-[7px] whitespace-nowrap text-[8px] font-black leading-none text-[#061743]">
        {title}
      </b>

      <span
        className={`mt-[5px] text-[8px] font-semibold leading-none ${active
          ? "text-[#f08a00]"
          : done
            ? "text-[#087536]"
            : "text-[#31446c]"
          }`}
      >
        {sub}
      </span>
    </div>
  );
}

type MetricProps = {
  icon: ElementType;
  label: string;
  value: string;
  tone: "green" | "blue" | "purple" | "orange";
};

function Metric({ icon: Icon, label, value, tone }: MetricProps) {
  const styles = {
    green: {
      panel: "border-[#ccebd8] bg-[#f4fff8]",
      icon: "bg-[#e8f8ee] text-[#087536]",
      label: "text-[#087536]",
      value: "text-[#087536]",
    },
    blue: {
      panel: "border-[#d8e1ff] bg-[#f5f7ff]",
      icon: "bg-[#eaf0ff] text-[#123ad6]",
      label: "text-[#123ad6]",
      value: "text-[#061743]",
    },
    purple: {
      panel: "border-[#e4d7ff] bg-[#fbf8ff]",
      icon: "bg-[#f1eaff] text-[#6d28d9]",
      label: "text-[#6d28d9]",
      value: "text-[#6d28d9]",
    },
    orange: {
      panel: "border-[#ffdfaa] bg-[#fffaf0]",
      icon: "bg-[#fff2dc] text-[#f07800]",
      label: "text-[#31446c]",
      value: "text-[#c85b00]",
    },
  }[tone];

  return (
    <Panel
      className={`flex h-full items-center gap-[12px] px-[12px] ${styles.panel}`}
    >
      <span
        className={`flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[6px] ${styles.icon}`}
      >
        <Icon size={23} strokeWidth={1.75} />
      </span>

      <div className="min-w-0">
        <p
          className={`m-0 truncate text-[8px] font-bold leading-none ${styles.label}`}
        >
          {label}
        </p>
        <b
          className={`mt-[7px] block truncate text-[14px] font-black leading-none ${styles.value}`}
        >
          {value}
        </b>
      </div>
    </Panel>
  );
}

type DocStatusProps = {
  name: string;
  status: "Verified" | "Under Review";
};

function DocStatus({ name, status }: DocStatusProps) {
  const ok = status === "Verified";

  return (
    <div className="grid h-[25px] grid-cols-[minmax(0,1fr)_92px] items-center border-t border-[#edf2f7] px-[7px] text-[7px] font-semibold">
      <span className="truncate">{name}</span>
      <span
        className={`flex items-center gap-[4px] font-black ${ok ? "text-[#087536]" : "text-[#f08a00]"
          }`}
      >
        <CheckCircle2 size={9} strokeWidth={2.2} />
        {status}
      </span>
    </div>
  );
}

type DownloadRowProps = {
  title: string;
  sub: string;
};

function DownloadRow({ title, sub }: DownloadRowProps) {
  return (
    <div className="flex h-[42px] items-center justify-between gap-2 rounded-[5px] border border-[#e1e9f2] bg-white px-[8px]">
      <div className="flex min-w-0 items-center gap-[7px]">
        <span className="flex h-[25px] w-[25px] shrink-0 items-center justify-center rounded-[4px] border border-[#ccebd8] bg-[#f2faf5] text-[#087536]">
          <FileText size={13} strokeWidth={1.8} />
        </span>

        <div className="min-w-0">
          <p className="m-0 truncate text-[8px] font-black leading-[10px]">
            {title}
          </p>
          <p className="m-0 truncate text-[7px] font-semibold leading-[9px] text-[#31446c]">
            {sub}
          </p>
        </div>
      </div>

      <Download size={12} strokeWidth={1.8} className="shrink-0" />
    </div>
  );
}

export default function MSMEPMSClaimStatusPage() {
  const navigate = useNavigate();
  const { data } = useExhibitorCtx();

  const companyName = safe(
    data?.exhibitorName || data?.companyName || data?.organizationName,
    "Velruma Pvt. Ltd.",
  );
  const applicationId = safe(data?.applicationId, "PMS-IHWE-2026-00139");
  const msmeCategory = safe(data?.msme?.msmeCategory, "Micro");
  const udyamNumber = safe(data?.msme?.udyamRegNo, "UP09D0012345");
  const gstNumber = safe(
    data?.gstNo || data?.gstNumber,
    "09AAACV1234A1Z5",
  );
  const coordinatorPhoto = safe(
    data?.pmsCoordinator?.photo,
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Rohit&backgroundColor=eef2f7",
  );

  return (
    <div className="pms-status-page flex h-[calc(100dvh-58px)] min-h-0 w-full max-w-full flex-col overflow-hidden bg-white text-[#061743] [font-family:Inter,ui-sans-serif,system-ui,sans-serif]">
      <style>{`
        .pms-status-page * {
          box-sizing: border-box;
        }

        @media (min-width: 1181px) and (max-height: 900px) {
          .pms-status-fit {
            zoom: 0.90;
            width: 111%;
          }
        }

        @media (min-width: 1181px) and (max-height: 790px) {
          .pms-status-fit {
            zoom: 0.80;
            width: 124.75%;
          }
        }
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
          <h1 className="m-0 text-[24px] font-bold leading-none tracking-[-0.2px] text-[#061743]">
            MSME PMS Claim Status
          </h1>
          <p className="m-0 mt-[8px] text-[11px] font-semibold leading-none text-[#061743]">
            Track your reimbursement application in real time
          </p>
        </header>

        <div className="pms-status-fit grid min-h-0 w-full max-w-full grid-cols-[minmax(0,1fr)_275px] gap-[18px]">
          <main className="grid min-w-0 grid-rows-[112px_144px_70px_358px_42px_35px] gap-[10px]">
            <Panel className="grid h-full grid-cols-[360px_minmax(0,1fr)] border-[#cfe5dc]">
              <div className="flex min-w-0 items-center gap-[19px] border-r border-[#dce6f1] bg-[#fbfffd] px-[24px]">
                <ClipboardCheck
                  size={62}
                  className="shrink-0 text-[#087536]"
                  strokeWidth={1.65}
                />

                <div className="min-w-0">
                  <p className="m-0 text-[13px] font-black leading-none text-[#087536]">
                    Your Application is
                  </p>
                  <h2 className="m-0 mt-[6px] text-[17px] font-black leading-none text-[#f08a00]">
                    Under Verification
                  </h2>
                  <p className="m-0 mt-[9px] max-w-[205px] text-[9px] font-semibold leading-[14px]">
                    Our team is verifying your
                    <br />
                    documents and details.
                  </p>
                </div>
              </div>

              <div className="grid min-w-0 grid-cols-[1.3fr_.85fr_.8fr_1fr] items-center gap-[15px] px-[20px]">
                <div className="min-w-0">
                  <p className="m-0 text-[8px] font-bold leading-none">
                    Application ID
                  </p>
                  <b className="mt-[12px] block truncate text-[11px] font-black leading-none">
                    {applicationId}
                  </b>
                </div>

                <div>
                  <p className="m-0 text-[8px] font-bold leading-none">
                    Submitted On
                  </p>
                  <b className="mt-[12px] flex items-center gap-[6px] text-[9px] font-black leading-none">
                    <CalendarDays size={13} strokeWidth={1.7} />
                    15 Jul 2026
                  </b>
                </div>

                <div>
                  <p className="m-0 text-[8px] font-bold leading-none">
                    Claim Amount
                  </p>
                  <b className="mt-[12px] block text-[14px] font-black leading-none">
                    ₹ {amount(150000)}
                  </b>
                </div>

                <div>
                  <p className="m-0 text-[8px] font-bold leading-none">
                    Current Status
                  </p>
                  <span className="mt-[10px] inline-flex h-[26px] items-center rounded-[5px] border border-[#f2a23a] bg-[#fff7e8] px-[9px] text-[8px] font-black leading-none text-[#c85b00]">
                    Under Verification
                  </span>
                </div>
              </div>
            </Panel>

            <Panel className="h-full px-[14px] pb-[10px] pt-[12px]">
              <div className="grid h-[82px] grid-cols-6 items-start gap-[2px] px-[9px]">
                <StatusStep
                  icon={FileCheck2}
                  title="Application Submitted"
                  sub="15 Jul 2026"
                  state="done"
                  connector="start"
                />
                <StatusStep
                  icon={FileText}
                  title="Document Verification"
                  sub="In Progress"
                  state="active"
                  connector="done"
                />
                <StatusStep
                  icon={CircleHelp}
                  title="Query Raised"
                  sub="(If Any)"
                  state="pending"
                  connector="solid"
                />
                <StatusStep
                  icon={ShieldCheck}
                  title="Approved"
                  sub="Pending"
                  state="pending"
                  connector="dashed"
                />
                <StatusStep
                  icon={Building2}
                  title="Forwarded to Authority"
                  sub="Pending"
                  state="pending"
                  connector="dashed"
                />
                <StatusStep
                  icon={Banknote}
                  title="Reimbursement Released"
                  sub="Pending"
                  state="pending"
                  connector="dashed"
                />
              </div>

              <div className="flex h-[29px] items-center justify-between rounded-[5px] border border-[#ffd99c] bg-[#fffaf0] px-[13px] text-[8px] font-bold text-[#b45309]">
                <span>
                  Current Stage:
                  <b className="ml-[5px]">Document Verification</b>
                  <span className="mx-[10px] text-[#d7a15d]">|</span>
                  Estimated Processing Time:
                  <b className="ml-[5px]">15 - 30 Working Days*</b>
                </span>
                <span className="text-[7px] text-[#596d91]">
                  *Subject to scheme guidelines
                </span>
              </div>
            </Panel>

            <div className="grid h-full grid-cols-4 gap-[10px]">
              <Metric
                icon={Banknote}
                label="Claimed Amount"
                value={`₹ ${amount(150000)}`}
                tone="green"
              />
              <Metric
                icon={ShieldCheck}
                label="Approved Amount"
                value="Pending"
                tone="blue"
              />
              <Metric
                icon={Building2}
                label="Released Amount"
                value="₹ 0"
                tone="purple"
              />
              <Metric
                icon={CalendarDays}
                label="Expected Processing"
                value="15 - 30 Days"
                tone="orange"
              />
            </div>

            <div className="grid min-h-0 grid-cols-[1.06fr_1fr_1.08fr] gap-[10px]">
              <Panel className="h-full px-[12px] pb-[10px] pt-[13px]">
                <h3 className="m-0 mb-[10px] text-[11px] font-black leading-none">
                  Document Verification Status
                </h3>

                <div className="overflow-hidden rounded-[5px] border border-[#edf2f7]">
                  <div className="grid h-[25px] grid-cols-[minmax(0,1fr)_92px] items-center bg-[#f7f9fc] px-[7px] text-[7px] font-black">
                    <span>Document Name</span>
                    <span>Status</span>
                  </div>

                  <DocStatus
                    name="Udyam Registration Certificate"
                    status="Verified"
                  />
                  <DocStatus name="GST Certificate" status="Verified" />
                  <DocStatus name="PAN Card" status="Verified" />
                  <DocStatus
                    name="Bank Statement (Last 6 Months)"
                    status="Under Review"
                  />
                  <DocStatus name="Hotel Invoice(s)" status="Under Review" />
                  <DocStatus name="Travel Invoice(s)" status="Under Review" />
                  <DocStatus name="Courier Invoice(s)" status="Verified" />
                  <DocStatus
                    name="Marketing / Printing Invoice(s)"
                    status="Under Review"
                  />
                </div>

                <button
                  type="button"
                  className="mx-auto mt-[10px] flex h-[28px] w-[72%] items-center justify-center gap-[6px] rounded-[5px] border border-[#a4b0d1] bg-white text-[9px] font-black"
                >
                  View All Documents
                  <Eye size={12} strokeWidth={1.8} />
                </button>
              </Panel>

              <Panel className="h-full px-[13px] pb-[10px] pt-[13px]">
                <h3 className="m-0 mb-[12px] text-[11px] font-black leading-none">
                  Application Activity Log
                </h3>

                <div className="relative ml-[3px] grid gap-[13px]">
                  <div className="absolute bottom-[8px] left-[6px] top-[7px] w-px bg-[#a9b8d8]" />

                  {[
                    [
                      "15 Jul 2026, 11:42 AM",
                      "Application Submitted",
                      "Your PMS application has been submitted successfully.",
                      "green",
                    ],
                    [
                      "17 Jul 2026, 02:35 PM",
                      "Documents Under Review",
                      "Your documents are under verification.",
                      "blue",
                    ],
                    [
                      "18 Jul 2026, 10:15 AM",
                      "Hotel Invoice Verification Started",
                      "Hotel invoice is under verification.",
                      "orange",
                    ],
                    [
                      "19 Jul 2026, 03:20 PM",
                      "Bank Details Verified",
                      "Your bank details have been verified.",
                      "green",
                    ],
                  ].map(([time, title, desc, tone]) => (
                    <div key={title} className="relative flex gap-[10px]">
                      <span
                        className={`relative z-10 mt-[1px] flex h-[13px] w-[13px] shrink-0 items-center justify-center rounded-full border bg-white ${tone === "orange"
                          ? "border-[#f08a00] text-[#f08a00]"
                          : tone === "blue"
                            ? "border-[#3154d5] text-[#3154d5]"
                            : "border-[#087536] text-[#087536]"
                          }`}
                      >
                        <span className="h-[4px] w-[4px] rounded-full bg-current" />
                      </span>

                      <div className="min-w-0">
                        <p className="m-0 text-[7px] font-bold leading-none text-[#12307a]">
                          {time}
                        </p>
                        <b className="mt-[5px] block truncate text-[8px] leading-none">
                          {title}
                        </b>
                        <span className="mt-[5px] block truncate text-[7px] font-semibold leading-none text-[#31446c]">
                          {desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="mx-auto mt-[18px] flex h-[28px] w-[72%] items-center justify-center gap-[7px] rounded-[5px] border border-[#a4b0d1] bg-white text-[9px] font-black"
                >
                  View All Activities
                  <span className="text-[14px] leading-none">→</span>
                </button>
              </Panel>

              <Panel className="h-full px-[12px] pb-[10px] pt-[13px]">
                <h3 className="m-0 mb-[10px] text-[11px] font-black leading-none">
                  Downloads
                </h3>

                <div className="grid gap-[5px]">
                  <DownloadRow
                    title="Application Copy"
                    sub="Download your submitted application"
                  />
                  <DownloadRow
                    title="Submitted Documents"
                    sub="All documents you have uploaded"
                  />
                  <DownloadRow
                    title="Acknowledgement Receipt"
                    sub="Official submission acknowledgement"
                  />
                  <DownloadRow
                    title="Approval Letter"
                    sub="Download approval letter (Once approved)"
                  />
                  <DownloadRow
                    title="Reimbursement Letter"
                    sub="Download reimbursement release letter"
                  />
                </div>

                <button
                  type="button"
                  className="mx-auto mt-[10px] flex h-[28px] w-[72%] items-center justify-center gap-[6px] rounded-[5px] border border-[#a4b0d1] bg-white text-[9px] font-black"
                >
                  <Download size={12} strokeWidth={1.8} />
                  Download All
                </button>
              </Panel>
            </div>

            <div className="grid h-full grid-cols-3 gap-[18px]">
              <button
                type="button"
                className="flex h-full items-center justify-center gap-[8px] rounded-[5px] bg-[#087536] text-[10px] font-black text-white transition hover:bg-[#06652f]"
              >
                <Download size={14} strokeWidth={1.8} />
                Download Application
              </button>

              <button
                type="button"
                className="flex h-full items-center justify-center gap-[8px] rounded-[5px] border border-[#2f55d4] bg-white text-[10px] font-black text-[#061743] transition hover:bg-[#f7f9fc]"
              >
                <CircleHelp size={14} strokeWidth={1.8} />
                Raise Query
              </button>

              <button
                type="button"
                className="flex h-full items-center justify-center gap-[8px] rounded-[5px] border border-[#087536] bg-white text-[10px] font-black text-[#087536] transition hover:bg-[#edf9f2]"
              >
                <Phone size={14} strokeWidth={1.8} />
                Contact Coordinator
              </button>
            </div>

            <div className="flex h-full items-center rounded-[5px] border border-[#dce6f1] bg-[#fbfffd] px-[14px] text-[7px] font-semibold text-[#087536]">
              <ShieldCheck size={14} strokeWidth={1.8} className="mr-[8px]" />
              Note: You will receive SMS and Email notifications for every update
              on your application.
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
              <LabelValue label="Booking Status" value="Confirmed" green />
              <LabelValue label="Payment Status" value="Fully Paid" green />

              <button
                type="button"
                onClick={() =>
                  navigate("/exhibitor-dashboard/msme/application")
                }
                className="mt-[10px] h-[28px] w-full rounded-[5px] border border-[#087536] bg-white text-[9px] font-black text-[#087536] transition hover:bg-[#edf9f2]"
              >
                View Full Application
              </button>
            </Panel>

            <Panel className="h-full px-[13px] pb-[10px] pt-[12px]">
              <h3 className="m-0 text-[11px] font-black leading-none text-[#087536]">
                Application Score
              </h3>

              <div className="mt-[12px] flex items-center gap-[15px]">
                <div className="flex h-[75px] w-[75px] shrink-0 flex-col items-center justify-center rounded-full border-[7px] border-[#087536]">
                  <b className="text-[17px] leading-none">100%</b>
                  <span className="mt-[4px] text-[7px] font-bold leading-none">
                    Complete
                  </span>
                </div>

                <div className="min-w-0">
                  <b className="block text-[12px] font-black leading-none text-[#087536]">
                    Excellent!
                  </b>
                  <span className="mt-[9px] block text-[8px] font-semibold leading-[13px]">
                    You have completed
                    <br />
                    all steps successfully.
                  </span>
                </div>
              </div>
            </Panel>

            <Panel className="h-full border-[#ffd99c] bg-[#fffaf0] px-[13px] py-[12px]">
              <h3 className="m-0 flex items-center gap-[7px] text-[10px] font-black leading-none text-[#c85b00]">
                <FileText size={16} strokeWidth={1.75} />
                Current Stage
              </h3>
              <b className="ml-[23px] mt-[9px] block text-[10px] leading-none">
                Document Verification
              </b>
              <p className="m-0 ml-[23px] mt-[8px] text-[7px] font-semibold leading-[11px]">
                Our team is verifying your
                <br />
                documents. Please wait.
              </p>
            </Panel>

            <Panel className="h-full border-[#ded8f7] px-[13px] pb-[10px] pt-[12px]">
              <h3 className="m-0 mb-[10px] flex items-center gap-[7px] text-[11px] font-black leading-none text-[#5b20e6]">
                <Headphones size={16} strokeWidth={1.8} />
                PMS Coordinator
              </h3>

              <div className="flex items-center gap-[10px]">
                <img
                  className="h-[48px] w-[48px] rounded-full bg-[#eef2f7] object-cover"
                  src={coordinatorPhoto}
                  alt="PMS Coordinator"
                />
                <div className="min-w-0">
                  <b className="block text-[10px] font-black leading-none">
                    Rohit Sharma
                  </b>
                  <span className="mt-[6px] block whitespace-nowrap text-[8px] font-semibold leading-none">
                    PMS Scheme Coordinator
                  </span>
                </div>
              </div>

              <a
                href="tel:+919654900525"
                className="mt-[10px] flex h-[30px] items-center gap-[9px] rounded-[4px] border border-[#e1e9f2] px-[10px] text-[9px] font-black text-[#061743] no-underline"
              >
                <Phone size={13} strokeWidth={1.8} className="text-[#142d75]" />
                +91 96549 00525
              </a>

              <a
                href="https://wa.me/919654900525"
                target="_blank"
                rel="noreferrer"
                className="mt-[5px] flex h-[30px] items-center gap-[9px] rounded-[4px] border border-[#e1e9f2] px-[10px] text-[9px] font-black text-[#061743] no-underline"
              >
                <MessageCircle
                  size={13}
                  strokeWidth={1.8}
                  className="text-[#087536]"
                />
                WhatsApp Chat
              </a>

              <a
                href="mailto:pms.support@ihwe.com"
                className="mt-[5px] flex h-[30px] items-center gap-[9px] rounded-[4px] border border-[#e1e9f2] px-[10px] text-[9px] font-black text-[#061743] no-underline"
              >
                <Mail
                  size={13}
                  strokeWidth={1.8}
                  className="text-[#5b20e6]"
                />
                <span className="min-w-0 truncate">pms.support@ihwe.com</span>
              </a>

              <button
                type="button"
                className="mt-[9px] h-[28px] w-full rounded-[5px] border border-[#8c55f4] bg-white text-[9px] font-black text-[#5b20e6] transition hover:bg-[#f6f1ff]"
              >
                Contact PMS Helpdesk
              </button>
            </Panel>
          </aside>
        </div>
      </div>
    </div>
  );
}