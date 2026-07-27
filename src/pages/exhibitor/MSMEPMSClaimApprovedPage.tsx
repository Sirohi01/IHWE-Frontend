import {
  ArrowLeft,
  Check,
  CheckCircle2,
  CircleHelp,
  Download,
  FileCheck2,
  FileText,
  Headphones,
  IndianRupee,
  Landmark,
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

const money = (value: number) => value.toLocaleString("en-IN");

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
  strong?: boolean;
  green?: boolean;
  className?: string;
};

function LabelValue({
  label,
  value,
  strong = false,
  green = false,
  className = "",
}: LabelValueProps) {
  return (
    <div
      className={`grid min-h-[24px] grid-cols-[minmax(0,1fr)_auto] items-center gap-2 border-b border-[#edf2f7] last:border-b-0 ${className}`}
    >
      <span className="truncate text-[9px] font-semibold leading-none text-[#061743]">
        {label}
      </span>
      <span
        className={`max-w-[170px] truncate text-right text-[9px] leading-none ${strong ? "font-bold" : "font-medium"
          } ${green ? "text-[#087536]" : "text-[#061743]"}`}
        title={value}
      >
        {value}
      </span>
    </div>
  );
}

type StatusStepProps = {
  icon: ElementType;
  title: string;
  date: string;
  active?: boolean;
  resolved?: boolean;
};

function StatusStep({
  icon: Icon,
  title,
  date,
  active = false,
  resolved = false,
}: StatusStepProps) {
  return (
    <div className="flex min-w-0 flex-col items-center text-center">
      <div
        className={`flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full border ${active
          ? "border-[#087536] bg-[#087536] text-white shadow-[0_5px_12px_rgba(8,117,54,0.15)]"
          : "border-[#bfe8d1] bg-[#effaf4] text-[#087536]"
          }`}
      >
        <Icon size={21} strokeWidth={1.7} />
      </div>
      <b className="mt-[6px] whitespace-nowrap text-[8px] font-bold leading-none text-[#061743]">
        {title}
      </b>
      <span className="mt-[5px] text-[8px] font-medium leading-none text-[#27406f]">
        {date}
      </span>
      {resolved && (
        <span className="mt-[5px] rounded-[3px] bg-[#dff3e7] px-[8px] py-[2px] text-[7px] font-bold leading-none text-[#087536]">
          Resolved
        </span>
      )}
    </div>
  );
}

type ProgressArrowProps = {
  muted?: boolean;
};

function ProgressArrow({ muted = false }: ProgressArrowProps) {
  return (
    <svg
      viewBox="0 0 34 14"
      className={`mt-[16px] h-[14px] w-[30px] justify-self-center ${muted ? "text-[#9aadd0]" : "text-[#142d75]"
        }`}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 7H31"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M26.5 2.5L31 7L26.5 11.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type DocRowProps = {
  title: string;
  sub: string;
};

function DocRow({ title, sub }: DocRowProps) {
  return (
    <div className="flex h-[35px] items-center justify-between gap-2 rounded-[5px] border border-[#e1e9f2] bg-white px-[8px]">
      <div className="flex min-w-0 items-center gap-[7px]">
        <span className="flex h-[23px] w-[23px] shrink-0 items-center justify-center rounded-[4px] border border-[#bfe8d1] bg-[#f2faf5] text-[#087536]">
          <FileText size={13} strokeWidth={1.8} />
        </span>
        <div className="min-w-0">
          <p className="m-0 truncate text-[8px] font-bold leading-[10px] text-[#061743]">
            {title}
          </p>
          <p className="m-0 truncate text-[7px] font-medium leading-[9px] text-[#31446c]">
            {sub}
          </p>
        </div>
      </div>
      <button
        type="button"
        className="flex h-[23px] w-[23px] shrink-0 items-center justify-center rounded-[4px] text-[#061743] transition hover:bg-[#f2f6fb]"
        aria-label={`Download ${title}`}
      >
        <Download size={13} strokeWidth={1.8} />
      </button>
    </div>
  );
}

function ReleasedBadge() {
  const confetti = [
    "left-[2px] top-[7px] rotate-45 bg-[#5fa5b4]",
    "left-[45px] top-0 rotate-45 bg-[#ed8b00]",
    "right-[10px] top-[8px] -rotate-45 bg-[#ffbf00]",
    "left-0 top-[48px] -rotate-45 bg-[#f04b31]",
    "right-[2px] top-[47px] rotate-45 bg-[#ee5c2c]",
    "left-[5px] bottom-[5px] -rotate-45 bg-[#df304d]",
    "left-[50px] bottom-0 rotate-45 bg-[#f1c644]",
    "right-[7px] bottom-[7px] -rotate-45 bg-[#e83c79]",
  ];

  return (
    <div className="relative h-[92px] w-[92px] shrink-0">
      {confetti.map((classes, index) => (
        <span
          key={index}
          className={`absolute h-[3px] w-[8px] rounded-full ${classes}`}
        />
      ))}

      <div className="absolute left-1/2 top-1/2 flex h-[62px] w-[62px] -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-[#087536] [clip-path:polygon(50%_0%,61%_8%,75%_5%,84%_16%,97%_20%,96%_34%,100%_50%,92%_61%,95%_75%,84%_84%,80%_97%,65%_96%,50%_100%,38%_92%,24%_96%,16%_84%,3%_80%,4%_65%,0%_50%,8%_39%,5%_25%,16%_16%,20%_3%,35%_4%)]">
        <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-white text-[#087536] shadow-[inset_0_0_0_2px_#d7efe1]">
          <Check size={29} strokeWidth={3} />
        </div>
      </div>
    </div>
  );
}

export default function MSMEPMSClaimApprovedPage() {
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
  const approvedAmount = 150000;

  const claimRows: Array<[string, number]> = [
    ["Stall Charges", 118944],
    ["Hotel Stay", 18000],
    ["Travel Expenses", 8500],
    ["Courier Charges", 1200],
    ["Marketing Expenses", 5000],
  ];

  return (
    <div className="pms-approved-page flex h-dvh min-h-0 flex-col overflow-hidden bg-white text-[#061743] [font-family:Inter,ui-sans-serif,system-ui,sans-serif]">
      <style>{`
        .pms-approved-page * { box-sizing: border-box; }

        @media (min-width: 1181px) and (max-height: 850px) {
          .pms-approved-fit {
            zoom: .90;
            width: 111.12%;
          }
        }

        @media (min-width: 1181px) and (max-height: 740px) {
          .pms-approved-fit {
            zoom: .80;
            width: 125%;
          }
        }
      `}</style>

      <div className="flex h-[44px] min-h-[44px] shrink-0 items-center border-b border-[#dce6f1] px-5">
        <nav className="flex items-center gap-[11px] whitespace-nowrap text-[10px] font-semibold leading-none">
          <span>Exhibitor Interface</span>
          <span className="text-[#5f7298]">›</span>
          <span>MSME PMS Scheme</span>
          <span className="text-[#5f7298]">›</span>
          <span>PMS Claim Status</span>
          <span className="text-[#5f7298]">›</span>
          <span className="text-[#087536]">Reimbursement Approved</span>
        </nav>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden px-5 pb-[10px]">
        <header className="flex h-[62px] items-center justify-between gap-4">
          <div className="min-w-0">
            <h1 className="m-0 truncate text-[25px] font-bold leading-[29px] tracking-[-0.2px] text-[#061743]">
              PMS Reimbursement Approved
            </h1>
            <p className="m-0 mt-[3px] flex items-center gap-[6px] text-[11px] font-semibold leading-none text-[#061743]">
              <CheckCircle2
                size={15}
                strokeWidth={2.2}
                className="shrink-0 fill-[#087536] text-white"
              />
              Congratulations! Your reimbursement has been approved and released.
            </p>
          </div>

          <div className="grid shrink-0 grid-cols-2 gap-[10px]">
            <Panel className="flex h-[50px] w-[195px] flex-col justify-center px-[15px]">
              <span className="text-[9px] font-semibold leading-none text-[#31446c]">
                Application ID
              </span>
              <b className="mt-[6px] block text-[11px] font-bold leading-none text-[#061743]">
                {applicationId}
              </b>
            </Panel>
            <Panel className="flex h-[50px] w-[187px] flex-col justify-center px-[15px]">
              <span className="text-[9px] font-semibold leading-none text-[#31446c]">
                Status
              </span>
              <b className="mt-[6px] block text-[10px] font-bold leading-none text-[#087536]">
                Reimbursement Released
              </b>
            </Panel>
          </div>
        </header>

        <div className="pms-approved-fit grid grid-cols-[minmax(0,1fr)_275px] gap-[18px]">
          <main className="grid min-w-0 grid-rows-[160px_110px_275px_75px_36px] gap-[10px]">
            <Panel className="grid grid-cols-[1.02fr_1px_1fr] items-center gap-[20px] border-[#cfe5dc] bg-[#fbfffd] px-[20px]">
              <div className="flex min-w-0 items-center gap-[16px]">
                <ReleasedBadge />
                <div className="min-w-0">
                  <h2 className="m-0 whitespace-nowrap text-[15px] font-bold leading-none text-[#087536]">
                    Reimbursement Successfully Released!
                  </h2>
                  <p className="m-0 mt-[12px] max-w-[380px] text-[10px] font-medium leading-[18px] text-[#061743]">
                    Your claim has been approved and the eligible amount
                    <br />
                    has been released to your bank account.
                  </p>
                </div>
              </div>

              <div className="h-[108px] w-px bg-[#b9d3dc]" />

              <div className="grid h-[118px] grid-rows-[repeat(4,1fr)_27px]">
                <div className="grid grid-cols-[155px_12px_1fr] items-center text-[9px] font-medium">
                  <span>Approved On</span>
                  <span>:</span>
                  <b>25 Jul 2026</b>
                </div>
                <div className="grid grid-cols-[155px_12px_1fr] items-center text-[9px] font-medium">
                  <span>Reimbursement Released On</span>
                  <span>:</span>
                  <b>28 Jul 2026</b>
                </div>
                <div className="grid grid-cols-[155px_12px_1fr] items-center text-[9px] font-medium">
                  <span>Payment Reference No.</span>
                  <span>:</span>
                  <b>PMS/2026/139/000458</b>
                </div>
                <div className="grid grid-cols-[155px_12px_1fr] items-center text-[9px] font-medium">
                  <span>UTR No.</span>
                  <span>:</span>
                  <b>HDFC5280726004587</b>
                </div>
                <div className="grid grid-cols-[155px_12px_1fr] items-end text-[9px] font-medium">
                  <span className="pb-[4px]">Amount Released</span>
                  <span className="pb-[4px]">:</span>
                  <b className="text-[16px] font-bold leading-none text-[#087536]">
                    ₹ {money(approvedAmount)}
                  </b>
                </div>
              </div>
            </Panel>

            <div className="grid grid-cols-[30px_1fr_30px_1fr_30px_1fr_30px_1fr_30px_1fr_30px_1fr] items-start px-[8px] pt-[8px]">
              <ProgressArrow muted />
              <StatusStep
                icon={FileCheck2}
                title="Application Submitted"
                date="15 Jul 2026"
              />
              <ProgressArrow />
              <StatusStep
                icon={FileText}
                title="Document Verification"
                date="17 Jul 2026"
              />
              <ProgressArrow />
              <StatusStep
                icon={CircleHelp}
                title="Query (If Any)"
                date="18 Jul 2026"
                resolved
              />
              <ProgressArrow />
              <StatusStep
                icon={ShieldCheck}
                title="Approved"
                date="25 Jul 2026"
              />
              <ProgressArrow />
              <StatusStep
                icon={Landmark}
                title="Forwarded to Authority"
                date="26 Jul 2026"
              />
              <ProgressArrow />
              <StatusStep
                icon={IndianRupee}
                title="Reimbursement Released"
                date="28 Jul 2026"
                active
              />
            </div>

            <div className="grid min-h-0 grid-cols-[1fr_1fr_1.09fr] gap-[10px]">
              <Panel className="h-full px-[13px] pb-[10px] pt-[13px]">
                <h3 className="m-0 mb-[9px] text-[11px] font-bold leading-none text-[#087536]">
                  Approved Claim Details
                </h3>
                <div className="overflow-hidden rounded-[5px] border border-[#edf2f7]">
                  <div className="grid h-[24px] grid-cols-2 items-center bg-[#f7f9fc] px-[9px] text-[8px] font-bold">
                    <span>Particulars</span>
                    <span className="text-right">Amount (₹)</span>
                  </div>
                  {claimRows.map(([label, value]) => (
                    <div
                      key={label}
                      className="grid h-[23px] grid-cols-2 items-center border-t border-[#edf2f7] px-[9px] text-[8px] font-medium"
                    >
                      <span>{label}</span>
                      <span className="text-right">{money(value)}</span>
                    </div>
                  ))}
                  <div className="grid h-[29px] grid-cols-2 items-center border-t border-[#dce6f1] px-[9px] text-[9px] font-bold">
                    <span>Total Claimed Amount</span>
                    <span className="text-right">1,51,644</span>
                  </div>
                  <div className="grid h-[31px] grid-cols-2 items-center px-[9px] text-[10px] font-bold text-[#087536]">
                    <span>Approved Amount</span>
                    <span className="text-right">{money(approvedAmount)}</span>
                  </div>
                </div>
              </Panel>

              <Panel className="h-full px-[13px] pb-[10px] pt-[13px]">
                <h3 className="m-0 mb-[8px] text-[11px] font-bold leading-none text-[#087536]">
                  Reimbursement Details
                </h3>
                <LabelValue label="Bank Name" value="HDFC Bank Ltd." />
                <LabelValue label="Account Number" value="50200012345678" />
                <LabelValue label="IFSC Code" value="HDFC0001234" />
                <LabelValue label="Account Holder Name" value={companyName} />
                <LabelValue
                  label="Amount Released"
                  value={`₹ ${money(approvedAmount)}`}
                  green
                  strong
                />
                <LabelValue label="Payment Date" value="28 Jul 2026" />
                <LabelValue label="Payment Mode" value="NEFT" />
                <div className="mt-[7px] flex h-[24px] items-center gap-[6px] rounded-[4px] border border-[#ccebd8] bg-[#edf9f2] px-[8px] text-[7px] font-medium text-[#087536]">
                  <CheckCircle2 size={12} strokeWidth={1.8} />
                  Amount has been credited to your bank account.
                </div>
              </Panel>

              <Panel className="h-full px-[12px] pb-[9px] pt-[13px]">
                <h3 className="m-0 mb-[8px] text-[11px] font-bold leading-none text-[#061743]">
                  Documents &amp; Letters
                </h3>
                <div className="grid gap-[4px]">
                  <DocRow
                    title="Approval Letter"
                    sub="Official PMS approval letter"
                  />
                  <DocRow
                    title="Sanction Letter"
                    sub="Government sanction letter"
                  />
                  <DocRow
                    title="Reimbursement Release Letter"
                    sub="Fund release confirmation"
                  />
                  <DocRow
                    title="Reimbursement Certificate"
                    sub="MSME PMS reimbursement certificate"
                  />
                  <DocRow
                    title="Application Copy"
                    sub="Submitted application copy"
                  />
                </div>
                <button
                  type="button"
                  className="mt-[7px] flex h-[27px] w-[215px] items-center justify-center gap-[6px] rounded-[5px] border border-[#9eabd0] bg-white text-[9px] font-bold text-[#061743] transition hover:bg-[#f7f9fc]"
                >
                  <Download size={13} strokeWidth={1.8} />
                  Download All Documents
                </button>
              </Panel>
            </div>

            <Panel className="relative flex h-full items-center justify-between border-[#d4e8df] bg-[#f5fffa] px-[14px]">
              <div className="min-w-0">
                <h3 className="m-0 flex items-center gap-[7px] text-[11px] font-bold leading-none text-[#087536]">
                  <ShieldCheck size={16} strokeWidth={1.8} />
                  Important Information
                </h3>
                <div className="ml-[25px] mt-[6px] grid gap-[4px] text-[7px] font-medium leading-none text-[#061743]">
                  <p className="m-0 flex items-center gap-[6px]">
                    <CheckCircle2 size={11} className="text-[#087536]" />
                    The amount has been transferred to your bank account as per the details provided.
                  </p>
                  <p className="m-0 flex items-center gap-[6px]">
                    <CheckCircle2 size={11} className="text-[#087536]" />
                    Please check your bank statement for confirmation.
                  </p>
                  <p className="m-0 flex items-center gap-[6px]">
                    <CheckCircle2 size={11} className="text-[#087536]" />
                    For any queries, contact your PMS Coordinator or raise a support ticket.
                  </p>
                </div>
              </div>

              <div className="relative mr-[1px] h-[62px] w-[105px] shrink-0">
                <Landmark
                  size={58}
                  strokeWidth={1.35}
                  className="absolute bottom-[2px] left-[4px] text-[#d5d8d7]"
                />
                <div className="absolute bottom-[3px] right-[16px] flex h-[48px] w-[32px] items-center justify-center rounded-[5px] border-2 border-[#087536] bg-white text-[#087536] shadow-sm">
                  <IndianRupee size={20} strokeWidth={1.7} />
                </div>
                <CheckCircle2
                  size={22}
                  strokeWidth={2.2}
                  className="absolute bottom-0 right-0 fill-[#087536] text-white"
                />
              </div>
            </Panel>

            <div className="grid h-full grid-cols-[1fr_1.18fr_1.08fr] gap-[10px]">
              <button
                type="button"
                onClick={() => navigate("/exhibitor-dashboard/psm-claim")}
                className="flex h-full items-center justify-center gap-[8px] rounded-[5px] border border-[#dce6f1] bg-white text-[10px] font-bold text-[#061743] transition hover:bg-[#f7f9fc]"
              >
                <ArrowLeft size={14} strokeWidth={1.8} />
                Back to Claim Status
              </button>
              <button
                type="button"
                className="flex h-full items-center justify-center gap-[8px] rounded-[5px] border border-[#dce6f1] bg-white text-[10px] font-bold text-[#061743] transition hover:bg-[#f7f9fc]"
              >
                <Download size={14} strokeWidth={1.8} />
                Download Acknowledgement
              </button>
              <button
                type="button"
                className="flex h-full items-center justify-center gap-[8px] rounded-[5px] bg-[#087536] text-[10px] font-bold text-white transition hover:bg-[#06652f]"
              >
                <FileText size={14} strokeWidth={1.8} />
                Raise New Claim
              </button>
            </div>
          </main>

          <aside className="grid grid-rows-[220px_145px_245px] gap-[10px]">
            <Panel className="h-full px-[13px] pb-[10px] pt-[12px]">
              <h3 className="m-0 mb-[8px] flex items-center gap-[7px] text-[11px] font-bold leading-none text-[#087536]">
                <FileCheck2 size={16} strokeWidth={1.7} />
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
                className="mt-[9px] h-[27px] w-full rounded-[5px] border border-[#087536] bg-white text-[9px] font-bold text-[#087536] transition hover:bg-[#edf9f2]"
              >
                View Full Application
              </button>
            </Panel>

            <Panel className="h-full px-[13px] pb-[10px] pt-[12px]">
              <h3 className="m-0 text-[11px] font-bold leading-none text-[#087536]">
                Reimbursement Summary
              </h3>
              <div className="mt-[10px] flex items-center gap-[12px]">
                <div className="flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-full bg-[conic-gradient(#bfe8d1_0deg_225deg,#e2e7e7_225deg_360deg)] p-[6px]">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-[radial-gradient(circle_at_center,#ffffff_55%,#f3faf6_100%)]">
                    <span className="text-[35px] font-medium leading-none text-[#087536]">
                      ₹
                    </span>
                  </div>
                </div>
                <div className="min-w-0">
                  <p className="m-0 text-[8px] font-semibold leading-none text-[#31446c]">
                    Approved Amount
                  </p>
                  <b className="mt-[4px] block text-[13px] font-bold leading-none text-[#087536]">
                    ₹ {money(approvedAmount)}
                  </b>
                  <p className="m-0 mt-[8px] text-[8px] font-semibold leading-none text-[#31446c]">
                    Released Amount
                  </p>
                  <b className="mt-[4px] block text-[13px] font-bold leading-none text-[#087536]">
                    ₹ {money(approvedAmount)}
                  </b>
                </div>
              </div>
              <div className="mt-[9px] flex h-[24px] items-center justify-center rounded-[4px] border border-[#ccebd8] bg-[#e8f7ed] text-[9px] font-black text-[#087536]">
                Reimbursement Completed
              </div>
            </Panel>

            <Panel className="h-full border-[#ded8f7] px-[13px] pb-[10px] pt-[12px]">
              <h3 className="m-0 mb-[10px] flex items-center gap-[7px] text-[11px] font-bold leading-none text-[#5b20e6]">
                <Headphones size={16} strokeWidth={1.8} />
                PMS Coordinator
              </h3>

              <div className="flex items-center gap-[10px]">
                <img
                  className="h-[47px] w-[47px] rounded-full bg-[#eef2f7] object-cover"
                  src={coordinatorPhoto}
                  alt="PMS Coordinator"
                />
                <div className="min-w-0">
                  <b className="block text-[10px] font-bold leading-none text-[#061743]">
                    Rohit Sharma
                  </b>
                  <span className="mt-[5px] block whitespace-nowrap text-[8px] font-medium leading-none text-[#061743]">
                    PMS Scheme Coordinator
                  </span>
                </div>
              </div>

              <a
                href="tel:+919654900525"
                className="mt-[9px] flex h-[29px] items-center gap-[9px] rounded-[4px] border border-[#e1e9f2] px-[11px] text-[10px] font-black text-[#061743] no-underline"
              >
                <Phone size={14} strokeWidth={1.8} className="text-[#142d75]" />
                +91 96549 00525
              </a>
              <a
                href="https://wa.me/919654900525"
                target="_blank"
                rel="noreferrer"
                className="mt-[5px] flex h-[29px] items-center gap-[9px] rounded-[4px] border border-[#e1e9f2] px-[11px] text-[10px] font-black text-[#061743] no-underline"
              >
                <MessageCircle
                  size={14}
                  strokeWidth={1.8}
                  className="text-[#087536]"
                />
                WhatsApp Chat
              </a>
              <a
                href="mailto:pms.support@ihwe.com"
                className="mt-[5px] flex h-[29px] items-center gap-[9px] rounded-[4px] border border-[#e1e9f2] px-[11px] text-[10px] font-black text-[#061743] no-underline"
              >
                <Mail size={14} strokeWidth={1.8} className="text-[#5b20e6]" />
                pms.support@ihwe.com
              </a>
              <button
                type="button"
                className="mt-[9px] h-[27px] w-full rounded-[5px] border border-[#8c55f4] bg-white text-[9px] font-bold text-[#5b20e6] transition hover:bg-[#f6f1ff]"
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