import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL, SERVER_URL, settingsApi } from '@/lib/api';
import InvoicePrintTemplate from '@/components/dashboard/exhibitor/print/InvoicePrintTemplate';
import ProformaPrintTemplate from '@/components/dashboard/exhibitor/print/ProformaPrintTemplate';
import ChallanPrintTemplate from '@/components/dashboard/exhibitor/print/ChallanPrintTemplate';
import CreditNotePrintTemplate from '@/components/dashboard/exhibitor/print/CreditNotePrintTemplate';
import DebitNotePrintTemplate from '@/components/dashboard/exhibitor/print/DebitNotePrintTemplate';
import { Printer, Download, Loader2 } from 'lucide-react';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

const mediaUrl = (value?: string) => {
    if (!value) return null;
    if (/^https?:\/\//i.test(value)) return value;
    return `${SERVER_URL}${value.startsWith('/') ? '' : '/'}${value}`;
};

export default function ExhibitorDocumentPrintPage() {
    const { docType = '', docId = '' } = useParams<{ docType: string; docId: string }>();
    const token = localStorage.getItem('exhibitorToken');

    const printRef = useRef<HTMLDivElement>(null);
    const [document, setDocument] = useState<any>(null);
    const [company, setCompany] = useState<any>(null);
    const [settings, setSettings] = useState<any>(null);
    const [bankDetails, setBankDetails] = useState<any>(null);
    const [estimateTerms, setEstimateTerms] = useState<any>(null);
    const [headerImageUrl, setHeaderImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [isExporting, setIsExporting] = useState(false);
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
                if (docJson.company) {
                    setCompany(docJson.company);
                }

                let termEndpoint = 'performa';
                if (docType === 'challan') termEndpoint = 'delivery-challan';
                else if (docType !== 'proforma' && docType !== 'creditnote' && docType !== 'debitnote' && docType !== 'legacycreditnote') termEndpoint = 'tax-invoice';

                const [settingsData, banksRes, templateRes, termsRes] = await Promise.all([
                    settingsApi.get().catch(() => null),
                    fetch(`${SERVER_URL}/api/banks`).then((r) => r.json()).catch(() => []),
                    fetch(`${SERVER_URL}/api/message-templates/exhibitor-registration`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }).then((r) => r.json()).catch(() => null),
                    fetch(`${SERVER_URL}/api/estimate-terms-config/${termEndpoint}`).then((r) => r.json()).catch(() => null),
                ]);
                setSettings(settingsData ? {
                    ...settingsData,
                    authorizedSignature: mediaUrl(settingsData.authorizedSignature),
                    companyStamp: mediaUrl(settingsData.companyStamp),
                } : null);
                const banks = Array.isArray(banksRes) ? banksRes : [];
                setBankDetails(banks.find((b: any) => b.status === 'active') || banks[0] || null);
                if (termsRes?.success && termsRes?.data) {
                    setEstimateTerms(termsRes.data);
                }
                const img = templateRes?.data?.headerImage || templateRes?.headerImage;
                if (img) setHeaderImageUrl(mediaUrl(img));

                if (!docJson.company && docJson.document?.companyId) {
                    fetch(`${SERVER_URL}/api/companies/lookup/${docJson.document.companyId}`)
                        .then((r) => r.json())
                        .then((res) => setCompany(res?.data || res))
                        .catch(() => { });
                }
            } catch (err) {
                setError('Failed to load document');
            } finally {
                setLoading(false);
            }
        };
        if (docType && docId) load();
    }, [docType, docId, token]);

    const handleDownloadPdf = async () => {
        if (!printRef.current) return;
        setIsExporting(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 100)); // allow UI update
            const dataUrl = await toPng(printRef.current, {
                quality: 1,
                pixelRatio: 2,
                backgroundColor: '#ffffff',
            });
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(dataUrl);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            // For multi-page, since toPng makes one big image, we might need to add multiple pages if it's very tall.
            // But a simple fit-to-width works for short documents.
            // Let's do multi-page split:
            const pageHeight = pdf.internal.pageSize.getHeight();
            let heightLeft = pdfHeight;
            let position = 0;

            pdf.addImage(dataUrl, 'PNG', 0, position, pdfWidth, pdfHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - pdfHeight;
                pdf.addPage();
                pdf.addImage(dataUrl, 'PNG', 0, position, pdfWidth, pdfHeight);
                heightLeft -= pageHeight;
            }

            pdf.save(`${docType}_${docId}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Use Print instead.');
        } finally {
            setIsExporting(false);
        }
    };

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
        <div className="min-h-screen bg-[#f1f5f9] py-1">
            <div className="no-print max-w-[1000px] mx-auto mb-2 flex justify-end gap-3 px-4 pt-2">
                <button
                    onClick={() => window.print()}
                    className="group relative flex items-center gap-2 px-5 py-1.5 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 hover:text-slate-900 rounded-lg text-[12px] font-medium shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 active:scale-95"
                >
                    <Printer size={16} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
                    Print Document
                </button>
                <button
                    onClick={handleDownloadPdf}
                    disabled={isExporting}
                    className="group relative flex items-center gap-2 px-5 py-1.5 bg-gradient-to-r from-[#00a651] to-[#00914a] hover:from-[#00914a] hover:to-[#007f41] text-white rounded-lg text-[12px] font-medium shadow-[0_4px_12px_rgba(0,166,81,0.25)] hover:shadow-[0_6px_16px_rgba(0,166,81,0.35)] hover:-translate-y-0.5 transition-all duration-300 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                    {isExporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} className="text-emerald-100 group-hover:text-white transition-colors" />}
                    {isExporting ? 'Generating PDF...' : 'Download PDF'}
                </button>
            </div>

            <div className="print-root" ref={printRef}>
                {docType === 'challan' ? (
                    <ChallanPrintTemplate challan={document} company={company} settings={settings} bankDetails={bankDetails} headerImageUrl={headerImageUrl} estimateTerms={estimateTerms} />
                ) : docType === 'proforma' ? (
                    <ProformaPrintTemplate document={document} company={company} settings={settings} bankDetails={bankDetails} headerImageUrl={headerImageUrl} estimateTerms={estimateTerms} />
                ) : docType === 'creditnote' || docType === 'legacycreditnote' ? (
                    <CreditNotePrintTemplate document={document} company={company} settings={settings} headerImageUrl={headerImageUrl} />
                ) : docType === 'debitnote' ? (
                    <DebitNotePrintTemplate document={document} company={company} settings={settings} headerImageUrl={headerImageUrl} />
                ) : (
                    <InvoicePrintTemplate document={document} company={company} settings={settings} bankDetails={bankDetails} headerImageUrl={headerImageUrl} heading="TAX INVOICE" estimateTerms={estimateTerms} />
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
