import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL, SERVER_URL, settingsApi } from '@/lib/api';
import InvoicePrintTemplate from '@/components/dashboard/exhibitor/print/InvoicePrintTemplate';
import ProformaPrintTemplate from '@/components/dashboard/exhibitor/print/ProformaPrintTemplate';
import ChallanPrintTemplate from '@/components/dashboard/exhibitor/print/ChallanPrintTemplate';
import { Printer, Loader2 } from 'lucide-react';

const mediaUrl = (value?: string) => {
    if (!value) return null;
    if (/^https?:\/\//i.test(value)) return value;
    return `${SERVER_URL}${value.startsWith('/') ? '' : '/'}${value}`;
};

export default function ExhibitorDocumentPrintPage() {
    const { docType = '', docId = '' } = useParams<{ docType: string; docId: string }>();
    const token = localStorage.getItem('exhibitorToken');

    const [document, setDocument] = useState<any>(null);
    const [company, setCompany] = useState<any>(null);
    const [settings, setSettings] = useState<any>(null);
    const [bankDetails, setBankDetails] = useState<any>(null);
    const [headerImageUrl, setHeaderImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                setError('');

                const docRes = await fetch(`${API_URL}/exhibitor-auth/documents/${docType}/${docId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const docJson = await docRes.json();
                if (!docJson.success) {
                    setError(docJson.message || 'Document not found');
                    return;
                }
                setDocument(docJson.document);

                const [settingsData, banksRes, templateRes] = await Promise.all([
                    settingsApi.get().catch(() => null),
                    fetch(`${SERVER_URL}/api/banks`).then((r) => r.json()).catch(() => []),
                    fetch(`${SERVER_URL}/api/message-templates/exhibitor-registration`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }).then((r) => r.json()).catch(() => null),
                ]);
                setSettings(settingsData ? {
                    ...settingsData,
                    authorizedSignature: mediaUrl(settingsData.authorizedSignature),
                    companyStamp: mediaUrl(settingsData.companyStamp),
                } : null);
                const banks = Array.isArray(banksRes) ? banksRes : [];
                setBankDetails(banks.find((b: any) => b.status === 'active') || banks[0] || null);
                const img = templateRes?.data?.headerImage || templateRes?.headerImage;
                if (img) setHeaderImageUrl(mediaUrl(img));

                if (docType !== 'challan' && docJson.document?.companyId) {
                    fetch(`${SERVER_URL}/api/companies/lookup/${docJson.document.companyId}`)
                        .then((r) => r.json())
                        .then((res) => setCompany(res?.data || res))
                        .catch(() => {});
                }
            } catch (err) {
                setError('Failed to load document');
            } finally {
                setLoading(false);
            }
        };
        if (docType && docId) load();
    }, [docType, docId, token]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white text-slate-500 gap-2">
                <Loader2 className="animate-spin" size={18} /> Loading document...
            </div>
        );
    }

    if (error || !document) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white text-red-500">
                {error || 'Document not found'}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f1f5f9] py-6">
            <div className="no-print max-w-[1000px] mx-auto mb-4 flex justify-end px-4">
                <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 px-4 py-2 bg-[#00a651] hover:bg-[#00914a] text-white rounded-lg text-sm font-semibold shadow-sm"
                >
                    <Printer size={16} /> Print / Save PDF
                </button>
            </div>

            <div className="print-root">
                {docType === 'challan' ? (
                    <ChallanPrintTemplate challan={document} settings={settings} bankDetails={bankDetails} headerImageUrl={headerImageUrl} />
                ) : docType === 'proforma' ? (
                    <ProformaPrintTemplate document={document} company={company} settings={settings} bankDetails={bankDetails} headerImageUrl={headerImageUrl} />
                ) : (
                    <InvoicePrintTemplate document={document} company={company} settings={settings} bankDetails={bankDetails} headerImageUrl={headerImageUrl} heading="TAX INVOICE" />
                )}
            </div>

            <style>{`
                @media print {
                    body * { visibility: hidden; }
                    .print-root, .print-root * { visibility: visible; }
                    .print-root { position: absolute; left: 0; top: 0; width: 100%; }
                    .no-print { display: none !important; }

                    /* Let long tables (item lists, GST breakdowns) flow across pages while
                       repeating their header row and never splitting a single row in half.
                       Self-contained blocks (details grid, terms, bank/signature, a single
                       delivery challan) are marked .avoid-break so they jump to the next
                       page whole instead of being cut across the boundary. */
                    table { page-break-inside: auto; }
                    thead { display: table-header-group; }
                    tr { page-break-inside: avoid; page-break-after: auto; }
                    .avoid-break { page-break-inside: avoid; }
                }
            `}</style>
        </div>
    );
}
