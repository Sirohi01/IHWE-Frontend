import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { API_URL, SERVER_URL, settingsApi } from '@/lib/api';
import InvoicePrintTemplate from '@/components/dashboard/exhibitor/print/InvoicePrintTemplate';
import ProformaPrintTemplate from '@/components/dashboard/exhibitor/print/ProformaPrintTemplate';
import ChallanPrintTemplate from '@/components/dashboard/exhibitor/print/ChallanPrintTemplate';
import { Printer, Loader2, ArrowLeft } from 'lucide-react';

const mediaUrl = (value?: string) => {
    if (!value) return null;
    if (/^https?:\/\//i.test(value)) return value;
    return `${SERVER_URL}${value.startsWith('/') ? '' : '/'}${value}`;
};

export default function ExhibitorPrintAllInvoicesPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('exhibitorToken');

    const [documents, setDocuments] = useState<any[]>([]);
    const [companyMap, setCompanyMap] = useState<Record<string, any>>({});
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

                const idsParam = searchParams.get('ids');
                const typesParam = searchParams.get('types');

                if (!idsParam || !typesParam) {
                    setError('No invoices specified for printing');
                    return;
                }

                const ids = idsParam.split(',');
                const types = typesParam.split(',');

                if (ids.length !== types.length) {
                    setError('Invalid request parameters');
                    return;
                }

                // Fetch all documents in parallel
                const docPromises = ids.map((id, idx) =>
                    fetch(`${API_URL}/exhibitor-auth/documents/${types[idx]}/${id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }).then(r => r.json())
                );

                const docResults = await Promise.all(docPromises);

                const validDocs = docResults
                    .filter(res => res.success && res.document)
                    .map((res, idx) => ({ ...res.document, _docType: types[idx] }));

                if (validDocs.length === 0) {
                    setError('Failed to load any of the requested invoices');
                    return;
                }

                setDocuments(validDocs);

                // Fetch global settings, banks, templates
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

                // Fetch companies
                const companyIds = Array.from(new Set(validDocs.filter(d => d.companyId && d._docType !== 'challan').map(d => d.companyId)));
                const cMap: Record<string, any> = {};

                await Promise.all(companyIds.map(async (cid) => {
                    try {
                        const r = await fetch(`${SERVER_URL}/api/companies/lookup/${cid}`);
                        const res = await r.json();
                        cMap[cid as string] = res?.data || res;
                    } catch (e) { }
                }));

                setCompanyMap(cMap);

            } catch (err) {
                console.error(err);
                setError('An error occurred while loading invoices');
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [searchParams, token]);

    // Automatically open print dialog once loaded
    useEffect(() => {
        if (!loading && !error && documents.length > 0) {
            const handleAfterPrint = () => {
                navigate('/exhibitor-dashboard/invoices');
            };
            
            window.addEventListener('afterprint', handleAfterPrint);
            setTimeout(() => {
                window.print();
            }, 1000);
            return () => window.removeEventListener('afterprint', handleAfterPrint);
        }
    }, [loading, error, documents, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white text-slate-500 gap-4">
                <Loader2 className="animate-spin text-[#00a651]" size={32} />
                <span className="text-lg font-medium">Gathering your invoices for print/download...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white text-red-500 font-medium">
                {error}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f1f5f9] py-6">
            <div className="no-print max-w-[1000px] mx-auto mb-4 flex justify-between items-center px-4">
                <button
                    onClick={() => navigate('/exhibitor-dashboard/invoices')}
                    className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors"
                >
                    <ArrowLeft size={18} /> Back to Invoices
                </button>
                <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#00a651] hover:bg-[#00914a] text-white rounded-lg text-sm font-semibold shadow-sm transition-colors"
                >
                    <Printer size={18} /> Print / Save PDF
                </button>
            </div>

            <div className="print-root">
                {documents.map((doc, index) => {
                    const type = doc._docType;
                    const company = doc.companyId ? companyMap[doc.companyId] : null;

                    return (
                        <div key={doc._id || index} className="print-page-wrapper">
                            {type === 'challan' ? (
                                <ChallanPrintTemplate challan={doc} settings={settings} bankDetails={bankDetails} headerImageUrl={headerImageUrl} />
                            ) : type === 'proforma' ? (
                                <ProformaPrintTemplate document={doc} company={company} settings={settings} bankDetails={bankDetails} headerImageUrl={headerImageUrl} />
                            ) : (
                                <InvoicePrintTemplate document={doc} company={company} settings={settings} bankDetails={bankDetails} headerImageUrl={headerImageUrl} heading="TAX INVOICE" />
                            )}
                        </div>
                    );
                })}
            </div>

            <style>{`
                .print-page-wrapper {
                    page-break-after: always;
                    margin-bottom: 2rem;
                    background: white;
                    padding-bottom: 2rem;
                }
                .print-page-wrapper:last-child {
                    page-break-after: auto;
                    margin-bottom: 0;
                    padding-bottom: 0;
                }

                @media print {
                    body * { visibility: hidden; }
                    .print-root, .print-root * { visibility: visible; }
                    .print-root { position: absolute; left: 0; top: 0; width: 100%; }
                    .no-print { display: none !important; }
                    .print-page-wrapper {
                        margin-bottom: 0;
                        padding-bottom: 0;
                        background: none;
                    }

                    table { page-break-inside: auto; }
                    thead { display: table-header-group; }
                    tr { page-break-inside: avoid; page-break-after: auto; }
                    .avoid-break { page-break-inside: avoid; }
                }
            `}</style>
        </div>
    );
}
