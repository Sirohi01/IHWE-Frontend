import React from 'react';
import { 
    CheckCircle2, Clock, XCircle, AlertCircle,
    User, Building2, CreditCard, Shield, Award, Star
} from 'lucide-react';

interface ApprovalStage {
    key: string;
    label: string;
    status: string;
    description: string;
    icon: any;
    updatedAt?: string;
    rejectionReason?: string;
}

interface AdminApprovalStatusProps {
    data: any;
}

const STATUS_CONFIG = {
    approved: {
        label: 'Approved',
        color: 'text-green-600',
        bg: 'bg-green-50',
        border: 'border-green-200',
        icon: CheckCircle2
    },
    pending: {
        label: 'Pending',
        color: 'text-orange-600',
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        icon: Clock
    },
    under_review: {
        label: 'Under Review',
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        icon: AlertCircle
    },
    rejected: {
        label: 'Rejected',
        color: 'text-red-600',
        bg: 'bg-red-50',
        border: 'border-red-200',
        icon: XCircle
    },
    active: {
        label: 'Active',
        color: 'text-green-600',
        bg: 'bg-green-50',
        border: 'border-green-200',
        icon: CheckCircle2
    },
    inactive: {
        label: 'Inactive',
        color: 'text-slate-600',
        bg: 'bg-slate-50',
        border: 'border-slate-200',
        icon: Clock
    }
};

export default function AdminApprovalStatus({ data }: AdminApprovalStatusProps) {
    const approvalStages: ApprovalStage[] = [
        {
            key: 'seller_approval',
            label: 'Seller Registration',
            status: data?.sellerStatus || 'pending',
            description: 'Your seller account approval status',
            icon: User,
            updatedAt: data?.sellerApprovedAt
        },
        {
            key: 'kyc_approval',
            label: 'KYC Verification',
            status: data?.kycStatus || 'pending',
            description: 'Document verification status',
            icon: Shield,
            updatedAt: data?.kycVerifiedAt,
            rejectionReason: data?.kycRejectionReason
        },
        {
            key: 'stall_approval',
            label: 'Stall Allocation',
            status: (data?.participation?.stallFor || data?.participation?.stallNo)
                ? 'approved'
                : 'pending',
            description: data?.participation?.stallFor
                ? `Stall ${data.participation.stallFor} — ${data.participation.stallSize || 0} sqm`
                : 'Stall booking confirmation',
            icon: Building2,
            updatedAt: data?.participation?.stallFor ? data?.createdAt : undefined
        },
        {
            key: 'payment_confirmation',
            label: 'Payment Verification',
            status: data?.paymentVerificationStatus || (data?.amountPaid > 0 ? 'under_review' : 'pending'),
            description: 'Payment verification status',
            icon: CreditCard,
            updatedAt: data?.lastPaymentAt
        },
        {
            key: 'bank_verification',
            label: 'Bank Details Verification',
            status: data?.bankVerificationStatus || 'pending',
            description: data?.bankDetails?.bankName
                ? `${data.bankDetails.bankName} — ${data.bankDetails.accountType || ''}`
                : 'Bank account verification',
            icon: CreditCard,
            updatedAt: data?.bankVerifiedAt
        },
        {
            key: 'sponsorship_approval',
            label: 'Sponsorship',
            status: data?.sellerSubscription?.status || 'inactive',
            description: 'Subscription plan status',
            icon: Award,
            updatedAt: data?.sellerSubscription?.startDate
        },
        {
            key: 'premium_listing',
            label: 'Premium Listing',
            status: data?.premiumListingStatus || 'inactive',
            description: 'Featured listing approval',
            icon: Star,
            updatedAt: data?.premiumListingApprovedAt
        }
    ];

    const getStatusConfig = (status: string) => {
        return STATUS_CONFIG[status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.pending;
    };

    const approvedCount = approvalStages.filter(s => s.status === 'approved' || s.status === 'active').length;
    const totalStages = approvalStages.length;
    const completionPercentage = Math.round((approvedCount / totalStages) * 100);

    return (
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-sm font-black uppercase tracking-tight text-slate-800">Admin Approval Status</h2>
                        <p className="text-[10px] text-slate-500 font-medium mt-0.5">Track your verification and approval progress</p>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-black text-[#23471d]">{completionPercentage}%</p>
                        <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">{approvedCount}/{totalStages} Approved</p>
                    </div>
                </div>
            </div>

            <div className="p-6">
                {/* Progress Bar */}
                <div className="mb-6">
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-gradient-to-r from-[#23471d] to-[#d26019] transition-all duration-500"
                            style={{ width: `${completionPercentage}%` }}
                        />
                    </div>
                </div>

                {/* Approval Stages */}
                <div className="space-y-4">
                    {approvalStages.map((stage, index) => {
                        const statusConfig = getStatusConfig(stage.status);
                        const StatusIcon = statusConfig.icon;
                        const StageIcon = stage.icon;

                        return (
                            <div 
                                key={stage.key}
                                className={`border-2 rounded-lg p-4 transition-all ${statusConfig.border} ${statusConfig.bg}`}
                            >
                                <div className="flex items-start gap-4">
                                    {/* Stage Icon */}
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${statusConfig.bg} border ${statusConfig.border}`}>
                                        <StageIcon size={20} className={statusConfig.color} />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-4 mb-2">
                                            <div>
                                                <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">{stage.label}</h3>
                                                <p className="text-[10px] text-slate-500 font-medium mt-0.5">{stage.description}</p>
                                            </div>
                                            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${statusConfig.bg} border ${statusConfig.border} shrink-0`}>
                                                <StatusIcon size={12} className={statusConfig.color} />
                                                <span className={`text-[9px] font-black uppercase tracking-wider ${statusConfig.color}`}>
                                                    {statusConfig.label}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Additional Info */}
                                        {stage.updatedAt && (
                                            <p className="text-[9px] text-slate-400 font-bold mt-2">
                                                Updated: {new Date(stage.updatedAt).toLocaleDateString('en-IN', { 
                                                    day: 'numeric', 
                                                    month: 'short', 
                                                    year: 'numeric' 
                                                })}
                                            </p>
                                        )}

                                        {/* Rejection Reason */}
                                        {stage.status === 'rejected' && stage.rejectionReason && (
                                            <div className="mt-3 p-3 bg-red-50 border border-red-100 rounded-lg">
                                                <p className="text-[10px] font-bold text-red-800 mb-1">Rejection Reason:</p>
                                                <p className="text-[10px] text-red-600 font-medium">{stage.rejectionReason}</p>
                                                <button className="mt-2 text-[9px] font-black text-red-600 hover:text-red-700 uppercase tracking-wider">
                                                    Re-submit Documents →
                                                </button>
                                            </div>
                                        )}

                                        {/* Pending Action */}
                                        {stage.status === 'pending' && (
                                            <div className="mt-3 p-3 bg-orange-50 border border-orange-100 rounded-lg">
                                                <p className="text-[10px] text-orange-600 font-medium">
                                                    {stage.key === 'kyc_approval' && 'Please upload all required KYC documents to proceed.'}
                                                    {stage.key === 'payment_confirmation' && 'Complete your payment to proceed with verification.'}
                                                    {stage.key === 'bank_verification' && 'Please add your bank details in the profile section.'}
                                                    {stage.key === 'stall_approval' && 'Stall allocation is pending. Our team will assign your stall soon.'}
                                                    {stage.key === 'seller_approval' && 'Your seller registration is under review by our team.'}
                                                    {stage.key === 'sponsorship_approval' && 'Choose a subscription plan to activate sponsorship benefits.'}
                                                    {stage.key === 'premium_listing' && 'Upgrade to premium plan for featured listing.'}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Timeline Connector */}
                                {index < approvalStages.length - 1 && (
                                    <div className="ml-5 mt-2 mb-2">
                                        <div className={`w-0.5 h-4 ${stage.status === 'approved' || stage.status === 'active' ? 'bg-green-300' : 'bg-slate-200'}`} />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Help Text */}
                <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                    <p className="text-[10px] text-blue-600 font-medium leading-relaxed">
                        <strong className="font-black">Need Help?</strong> If you have any questions about the approval process, 
                        please contact our support team via the Helpdesk section or call us at +91 9654900525.
                    </p>
                </div>
            </div>
        </div>
    );
}
