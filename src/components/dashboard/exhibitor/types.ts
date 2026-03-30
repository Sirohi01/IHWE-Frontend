import { 
    CreditCard, CheckCircle, ShieldCheck, BadgeCheck, XCircle, Hourglass 
} from 'lucide-react';

export const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string; dot: string; icon: any; step: number }> = {
    pending: { label: 'Under Review', color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200', dot: 'bg-amber-400', icon: Hourglass, step: 1 },
    approved: { label: 'Approved', color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200', dot: 'bg-blue-500', icon: BadgeCheck, step: 2 },
    'advance-paid': { label: 'Advance Paid', color: 'text-violet-700', bg: 'bg-violet-50', border: 'border-violet-200', dot: 'bg-violet-500', icon: CreditCard, step: 3 },
    paid: { label: 'Fully Paid', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', dot: 'bg-emerald-500', icon: CheckCircle, step: 4 },
    confirmed: { label: 'Confirmed', color: 'text-green-800', bg: 'bg-green-50', border: 'border-green-300', dot: 'bg-green-600', icon: ShieldCheck, step: 5 },
    rejected: { label: 'Rejected', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200', dot: 'bg-red-500', icon: XCircle, step: 0 },
};

export const STEPS = [
    { label: 'Submitted', sub: 'Application received' },
    { label: 'Approved', sub: 'Admin verified' },
    { label: 'Advance Paid', sub: 'Partial payment' },
    { label: 'Fully Paid', sub: 'Payment complete' },
    { label: 'Confirmed', sub: 'Stall confirmed' },
];
