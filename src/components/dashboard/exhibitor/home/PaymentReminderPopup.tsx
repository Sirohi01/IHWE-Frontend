import { useEffect, useState } from 'react';
import { X, AlertTriangle, IndianRupee, CalendarDays, Clock, ArrowRight, ReceiptText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import { API_URL } from '@/lib/api';

const PAYMENT_ROUTE = '/exhibitor-dashboard/payments';

interface Installment {
    status?: string;
    dueAmount?: number;
    paidAmount?: number;
    dueDate?: string | Date;
    planId?: string;
    label?: string;
}

interface EventPaymentPlan {
    id?: string;
    label?: string;
    dueDate?: string | Date | null;
    dueDaysBeforeEvent?: number | null;
    isDefault?: boolean;
}

interface RemainingBreakdownDoc {
    id?: string;
    no?: string;
    type?: string;
    date?: string | Date;
    remainingAmount?: number;
    particulars?: string;
}

interface AccountOverview {
    financials?: {
        remainingBalance?: number;
        accountStatus?: string;
        remainingBreakdown?: RemainingBreakdownDoc[];
    };
}

interface PendingLine {
    key: string;
    label: string;
    refNo?: string;
    particulars?: string;
    amount: number;
    dueDateRaw: Date | string | null;
}

const formatRupee = (amount: number) =>
    `₹${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(Math.max(0, amount || 0))}`;

const formatDate = (value?: string | Date | null) => {
    if (!value) return null;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

const daysFromToday = (value?: string | Date | null) => {
    const date = value ? new Date(value) : null;
    if (!date || Number.isNaN(date.getTime())) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    return Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
};

// Mirrors the admin backend's getInstallmentDueInfo/resolvePlanDueDate: a payment stage's real
// due date is the event's start date minus its payment plan's dueDaysBeforeEvent — not
// whatever static dueDate got stamped on the installment when the PI was created — so it
// stays correct even if the event's dates are rescheduled after booking.
const resolveDateDaysBeforeEvent = (eventStart?: string | Date | null, daysBeforeEvent?: number | null) => {
    if (!eventStart || daysBeforeEvent === null || daysBeforeEvent === undefined) return null;
    const start = new Date(eventStart);
    if (Number.isNaN(start.getTime())) return null;
    const due = new Date(start);
    due.setDate(due.getDate() - Number(daysBeforeEvent));
    return due;
};

const resolvePlanDueDate = (eventStart?: string | Date | null, plan?: EventPaymentPlan | null) =>
    resolveDateDaysBeforeEvent(eventStart, plan?.dueDaysBeforeEvent) || (plan?.dueDate ? new Date(plan.dueDate) : null);

export default function PaymentReminderPopup({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const navigate = useNavigate();
    const { data } = useExhibitorCtx();

    const [overview, setOverview] = useState<AccountOverview | null>(null);
    const [loading, setLoading] = useState(false);
    const [fetchedForId, setFetchedForId] = useState<string | null>(null);

    // ExhibitorRegistration.balanceAmount only reflects the online booking/checkout flow — it
    // stays 0 for exhibitors whose invoices were raised directly in Accounts, which would make
    // the popup silently never show for them. account-overview nets the *real* Invoice/Payment/
    // CreditNote/DebitNote totals (same source the Accounts module and the full Payment
    // Reminders page use), so that's the balance this popup actually gates on.
    useEffect(() => {
        if (!isOpen || !data?._id || fetchedForId === data._id) return;
        const token = localStorage.getItem('exhibitorToken');
        setLoading(true);
        fetch(`${API_URL}/exhibitor-auth/account-overview?id=${data._id}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        })
            .then((res) => res.json())
            .then((json) => {
                if (json?.success) setOverview(json.data);
            })
            .catch(() => undefined)
            .finally(() => {
                setFetchedForId(data._id);
                setLoading(false);
            });
    }, [isOpen, data?._id, fetchedForId]);

    const remainingBalance = Number(overview?.financials?.remainingBalance ?? 0);
    const remainingBreakdown: RemainingBreakdownDoc[] = overview?.financials?.remainingBreakdown || [];
    const hasFetched = fetchedForId === data?._id;

    // Nothing actually due once the real numbers are in — close quietly so the popup chain
    // in ExhibitorDashboardHome moves on (e.g. to the Referral popup) instead of stalling.
    useEffect(() => {
        if (isOpen && hasFetched && !loading && remainingBalance <= 0) {
            onClose();
        }
    }, [isOpen, hasFetched, loading, remainingBalance, onClose]);

    const installments: Installment[] = Array.isArray(data?.installments) ? data.installments : [];
    const eventStartDate = data?.eventId?.startDate;
    const eventPaymentPlans: EventPaymentPlan[] = Array.isArray(data?.eventId?.paymentPlans) ? data.eventId.paymentPlans : [];
    const planById: Record<string, EventPaymentPlan> = {};
    eventPaymentPlans.forEach((plan) => { if (plan?.id) planById[plan.id] = plan; });
    const defaultPlan = eventPaymentPlans.find((plan) => plan.isDefault) || null;

    // Due date = event date + the payment plan recorded on the PI, not whatever was stamped
    // statically on the installment/registration when it was created.
    const resolveInstallmentDueDate = (inst: Installment) => {
        const plan = inst.planId ? planById[inst.planId] : null;
        return resolvePlanDueDate(eventStartDate, plan) || (inst.dueDate ? new Date(inst.dueDate) : null);
    };

    // Invoice-wise pending payments: when this booking has an Advance/Running/Final schedule,
    // list each unpaid stage by name; otherwise (a lump-sum invoice raised directly in
    // Accounts, with no installment tracking) list each still-outstanding document instead.
    const unpaidInstallments = installments.filter(
        (inst) => inst?.status !== 'paid' && Number(inst?.dueAmount || 0) > Number(inst?.paidAmount || 0)
    );

    const singleDocNo = remainingBreakdown.length === 1 ? remainingBreakdown[0]?.no : undefined;

    const pendingLines: PendingLine[] = unpaidInstallments.length > 0
        ? unpaidInstallments.map((inst, idx) => ({
            key: `inst-${inst.planId || idx}`,
            label: ((inst.planId ? planById[inst.planId]?.label : null) || inst.label || 'Payment').trim(),
            refNo: singleDocNo,
            amount: Number(inst.dueAmount || 0) - Number(inst.paidAmount || 0),
            dueDateRaw: resolveInstallmentDueDate(inst),
        }))
        : remainingBreakdown
            .filter((doc) => Number(doc.remainingAmount || 0) > 0)
            .map((doc, idx) => ({
                key: `doc-${doc.id || idx}`,
                label: doc.type === 'Debit Note' ? 'Debit Note' : (defaultPlan?.label || 'Full Payment').trim(),
                refNo: doc.no,
                particulars: doc.particulars,
                amount: Number(doc.remainingAmount || 0),
                dueDateRaw: resolvePlanDueDate(eventStartDate, defaultPlan) || data?.paymentDueDate || null,
            }));

    pendingLines.sort((a, b) => {
        const aTime = a.dueDateRaw ? new Date(a.dueDateRaw).getTime() : Infinity;
        const bTime = b.dueDateRaw ? new Date(b.dueDateRaw).getTime() : Infinity;
        return aTime - bTime;
    });

    const nearestDays = pendingLines.length ? daysFromToday(pendingLines[0].dueDateRaw) : null;
    const isOverdue = overview?.financials?.accountStatus === 'Overdue' || (nearestDays !== null && nearestDays < 0);
    const invoiceCount = remainingBreakdown.filter((doc) => Number(doc.remainingAmount || 0) > 0).length;

    const payNow = () => {
        onClose();
        navigate(PAYMENT_ROUTE);
    };

    if (!isOpen) return null;
    if (loading && !hasFetched) return null; // avoid flashing an empty/₹0 card while the real balance loads
    if (hasFetched && remainingBalance <= 0) return null; // the effect above is already closing it

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.25 }}
                        className="relative w-full max-w-[440px] bg-white rounded-2xl shadow-2xl overflow-hidden font-inter"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-2.5 right-2.5 z-10 w-6 h-6 flex items-center justify-center bg-black text-white rounded-full hover:bg-red-600 shadow-md transition-colors"
                        >
                            <X size={14} />
                        </button>

                        {/* Header */}
                        <div className={`px-5 pt-6 pb-4 flex items-start gap-3 ${isOverdue ? 'bg-gradient-to-br from-red-50 to-rose-50' : 'bg-gradient-to-br from-orange-50 to-amber-50'}`}>
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm shrink-0 ${isOverdue ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
                                <AlertTriangle size={22} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 leading-tight">
                                    {isOverdue ? 'Payment Overdue' : 'Payment Reminder'}
                                </h3>
                                <p className="text-[12px] text-slate-600 font-medium mt-1 leading-snug">
                                    {isOverdue
                                        ? 'Your payment is past due. Please clear it to avoid service interruptions.'
                                        : 'You have an outstanding balance on your stall booking.'}
                                </p>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="px-5 py-4 space-y-3">
                            <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0">
                                        <IndianRupee size={15} className="text-slate-600" />
                                    </div>
                                    <div>
                                        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Total Amount Due</div>
                                        {invoiceCount > 0 && (
                                            <div className="text-[10px] font-bold text-slate-400 mt-0.5">{invoiceCount} {invoiceCount === 1 ? 'Invoice' : 'Invoices'}</div>
                                        )}
                                    </div>
                                </div>
                                <span className="text-lg font-black text-slate-900">{formatRupee(remainingBalance)}</span>
                            </div>

                            {pendingLines.length > 0 && (
                                <div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide px-0.5">Pending Payments</span>
                                    <div className="mt-1.5 space-y-1.5 max-h-[220px] overflow-y-auto pr-0.5">
                                        {pendingLines.map((line) => {
                                            const days = daysFromToday(line.dueDateRaw);
                                            const lineOverdue = days !== null && days < 0;
                                            return (
                                                <div key={line.key} className="flex items-center justify-between border border-slate-200 rounded-xl px-3 py-2.5 gap-2">
                                                    <div className="flex items-center gap-2.5 min-w-0">
                                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${lineOverdue ? 'bg-red-50 text-red-500' : 'bg-white border border-slate-200 text-slate-500'}`}>
                                                            <ReceiptText size={14} />
                                                        </div>
                                                        <div className="min-w-0">
                                                            <div className="text-[12px] font-bold text-slate-800 truncate">{line.label} Pending</div>
                                                            {line.particulars && (
                                                                <div className="text-[10px] font-semibold text-slate-600 truncate">{line.particulars}</div>
                                                            )}
                                                            <div className="flex items-center gap-1 text-[10px] text-slate-500 font-medium mt-0.5">
                                                                {line.refNo && <span className="truncate">{line.refNo}</span>}
                                                                {line.dueDateRaw && (
                                                                    <span className="flex items-center gap-0.5 shrink-0">
                                                                        {line.refNo && <span>•</span>}
                                                                        <CalendarDays size={10} /> {formatDate(line.dueDateRaw)}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right shrink-0">
                                                        <div className="text-[13px] font-black text-slate-900">{formatRupee(line.amount)}</div>
                                                        {days !== null && (
                                                            <div className={`text-[9px] font-bold ${lineOverdue ? 'text-red-600' : 'text-orange-600'}`}>
                                                                {lineOverdue ? `${Math.abs(days)}d overdue` : days === 0 ? 'Due today' : `${days}d left`}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="px-5 pb-5 flex items-center gap-2">
                            <button
                                onClick={onClose}
                                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors shrink-0"
                            >
                                <Clock size={14} />
                                <span className="text-[12px] font-bold">Remind Later</span>
                            </button>
                            <button
                                onClick={payNow}
                                className="flex-1 bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 transition-all"
                            >
                                <span className="text-[12px] font-bold tracking-wide">PAY NOW</span>
                                <ArrowRight size={14} />
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
