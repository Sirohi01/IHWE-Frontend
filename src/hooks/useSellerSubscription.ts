import { useState, useEffect } from 'react';
import { API_URL } from '@/lib/api';

export interface SellerAccess {
    bsm_marketing: boolean;
    export_inquiry: boolean;
    lead_access: boolean;
    service_request: boolean;
    premium_support: boolean;
    analytics_dashboard: boolean;
    product_showcase: boolean;
    meeting_scheduler: boolean;
    conference: boolean;
    logistics: boolean;
    accessories: boolean;
}

export interface SellerSubscriptionInfo {
    isSeller: boolean;
    sellerStatus: string;
    subscription: {
        status: string;
        plan: string | null;
        planId: string | null;
        expiresAt: string | null;
        daysRemaining: number | null;
        isActive: boolean;
    };
    planDetails: {
        _id: string;
        name: string;
        price: number;
        currency: string;
        durationDays: number;
        features: { key: string; label: string; enabled: boolean }[];
        maxLeads: number;
        maxExportInquiries: number;
        maxServiceRequests: number;
        description: string;
    } | null;
    access: SellerAccess;
}

const DEFAULT_ACCESS: SellerAccess = {
    bsm_marketing: false,
    export_inquiry: false,
    lead_access: false,
    service_request: false,
    premium_support: false,
    analytics_dashboard: false,
    product_showcase: false,
    meeting_scheduler: false,
    conference: false,
    logistics: false,
    accessories: false,
};

export function useSellerSubscription() {
    const [info, setInfo] = useState<SellerSubscriptionInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchInfo = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('exhibitorToken');
            if (!token) { setLoading(false); return; }

            const res = await fetch(`${API_URL}/seller-portal/subscription-info`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                setInfo(data.data);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Failed to fetch subscription info');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    return {
        info,
        loading,
        error,
        refetch: fetchInfo,
        access: info?.access || DEFAULT_ACCESS,
        isActive: info?.subscription?.isActive || false,
        planName: info?.planDetails?.name || null,
        daysRemaining: info?.subscription?.daysRemaining ?? null,
        planDetails: info?.planDetails || null,
    };
}
