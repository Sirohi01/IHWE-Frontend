import { Outlet } from "react-router-dom";
import { Lock } from "lucide-react";
import { useExhibitorCtx } from "@/context/ExhibitorContext";

// Canonical value BookAStand.jsx writes into participation.stallCategory
// when an admin books this exhibitor's stall "Under MSME PMS Scheme" — the
// signal that determines MSME PMS Scheme eligibility. The other two were a
// "PSM" typo present in older bookings (BookAStand's own select once wrote
// this value despite labelling it "PMS", and ClientOverview1's separate
// Exhibitor Category field used a third variant) — accepted here too so
// exhibitors booked before the typo fix aren't locked out.
const MSME_STALL_CATEGORIES = ["Under MSME PMS Scheme", "Under MSME PSM Scheme", "Under PSM Scheme"];

export default function MsmeSectionGuard() {
  const { data } = useExhibitorCtx();
  const isMsmeExhibitor = MSME_STALL_CATEGORIES.includes(data?.participation?.stallCategory);

  if (!isMsmeExhibitor) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-3 px-6 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-slate-100 text-slate-400">
          <Lock size={24} />
        </span>
        <h2 className="text-[15px] font-bold text-slate-800">MSME PMS Scheme Not Applicable</h2>
        <p className="max-w-sm text-[12px] text-slate-500">
          This section is only available for exhibitors booked under the "Under MSME PMS Scheme" stall category. Contact your PMS coordinator if you believe this is incorrect.
        </p>
      </div>
    );
  }

  return <Outlet />;
}
