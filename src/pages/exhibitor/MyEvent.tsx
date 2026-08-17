import EventDashboard from "@/components/dashboard/exhibitor/my_event/EventDashboard";
import EventDashboard1 from "@/components/dashboard/exhibitor/my_event/Eventdashboard1";

import MyEventHero from "@/components/dashboard/exhibitor/my_event/MyEventHero";
import { useEffect, useMemo, useState } from "react";
import { useExhibitorCtx } from "@/context/ExhibitorContext";
import { API_URL } from "@/lib/api";

const hasValue = (value: any) => value !== undefined && value !== null && String(value).trim() !== "";

const buildDocuments = (data: any) => {
    const docs = [
        { name: "Registration PDF", url: data?.registrationPdfUrl },
        { name: "Payment Receipt", url: data?.receiptPdfUrl },
        { name: "Company Logo", url: data?.companyLogoUrl },
        { name: "GST Certificate", url: data?.gstCertificateUrl },
        { name: "PAN Card", url: data?.panCardFrontUrl },
        { name: "Cancelled Cheque", url: data?.cancelledChequeUrl },
        ...(Array.isArray(data?.specialDocuments)
            ? data.specialDocuments.map((doc: any) => ({ name: doc.label || "Special Document", url: doc.url }))
            : []),
    ];

    return docs
        .filter((doc) => hasValue(doc.url))
        .map((doc) => ({
            name: doc.name,
            size: doc.url?.toLowerCase().includes(".pdf") ? "PDF" : "Document",
            url: doc.url,
        }));
};

const MyEvent = () => {
    const { data, myStalls = [] } = useExhibitorCtx();
    const [updates, setUpdates] = useState<any[]>([]);
    const [accessoryOrders, setAccessoryOrders] = useState<any[]>([]);
    const [passRequests, setPassRequests] = useState<any[]>([]);

    useEffect(() => {
        if (!data?._id) return;
        const token = localStorage.getItem("exhibitorToken");
        const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

        fetch(`${API_URL}/exhibitor-auth/updates?id=${data._id}&page=1&limit=5`, { headers })
            .then((res) => res.json())
            .then((res) => {
                if (res.success && Array.isArray(res.data)) {
                    setUpdates(res.data.map((item: any) => ({
                        title: item.title,
                        desc: item.desc,
                        badge: item.badge,
                    })));
                }
            })
            .catch(() => setUpdates([]));

        fetch(`${API_URL}/stall-accessories/orders?exhibitorId=${data._id}`, { headers })
            .then((res) => res.json())
            .then((res) => setAccessoryOrders(res.success && Array.isArray(res.data) ? res.data : []))
            .catch(() => setAccessoryOrders([]));

        fetch(`${API_URL}/exhibitor-pass-requests/exhibitor/${data._id}`, { headers })
            .then((res) => res.json())
            .then((res) => setPassRequests(res.success && Array.isArray(res.data) ? res.data : []))
            .catch(() => setPassRequests([]));
    }, [data?._id]);

    const documents = useMemo(() => buildDocuments(data), [data]);

    return (

        <div className="pt-4 px-6 bg-[#f4f6fb]">
            <MyEventHero data={data} myStalls={myStalls} />
            <EventDashboard data={data} myStalls={myStalls} accessoryOrders={accessoryOrders} passRequests={passRequests} />
            <EventDashboard1 announcements={updates} documents={documents} />
        </div>

    )
}

export default MyEvent;
