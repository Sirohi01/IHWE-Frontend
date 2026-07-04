import { useState, useLayoutEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
const MAX_PAGE_CONTENT_HEIGHT = 1300;

function toWords(n: number): string {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
        'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    if (n === 0) return 'Zero';
    const convert = (num: number): string => {
        if (num < 20) return ones[num];
        if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? ' ' + ones[num % 10] : '');
        if (num < 1000) return ones[Math.floor(num / 100)] + ' Hundred' + (num % 100 ? ' ' + convert(num % 100) : '');
        if (num < 100000) return convert(Math.floor(num / 1000)) + ' Thousand' + (num % 1000 ? ' ' + convert(num % 1000) : '');
        if (num < 10000000) return convert(Math.floor(num / 100000)) + ' Lakh' + (num % 100000 ? ' ' + convert(num % 100000) : '');
        return convert(Math.floor(num / 10000000)) + ' Crore' + (num % 10000000 ? ' ' + convert(num % 10000000) : '');
    };
    const intPart = Math.floor(n);
    return 'RUPEES ' + convert(intPart) + ' Only.';
}
const FIRST_PAGE_ITEM_ROWS_WITH_CHALLAN = 6;
const FIRST_PAGE_ITEM_ROWS = 10;
const OTHER_PAGE_ITEM_ROWS = 16;
const MIN_PADDED_ROWS = 3;

interface Props {
    document: any;
    company?: any;
    bankDetails?: any;
    settings?: any;
    headerImageUrl?: string | null;
    heading?: string;
    invoiceCopy?: string;
}

export default function InvoicePrintTemplate({ document, company, bankDetails, settings, headerImageUrl, heading = 'TAX INVOICE', invoiceCopy = 'ORIGINAL INVOICE' }: Props) {
    const cur = '₹';
    const fmtNum = (n: any) => Math.round(Number(n || 0)).toLocaleString('en-IN');

    const items = document?.items || [];
    const invoiceNo = document?.invoice_no || '';
    const dateVal = document?.invoice_date || document?.supply_date;
    const invoiceDate = dateVal ? new Date(dateVal).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '';
    const createdDateTime = document?.added
        ? new Date(document.added).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
        : new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    const supplyDateTime = document?.supply_date
        ? new Date(document.supply_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
        : '';

    const totalTaxable = items.reduce((sum: number, item: any) => sum + (parseFloat(item.taxableValue) || 0), 0);
    const totalGstAmount = items.reduce((sum: number, item: any) => sum + (parseFloat(item.gstAmount) || 0), 0);
    const grandTotal = document?.finalAmount || items.reduce((sum: number, item: any) => sum + (parseFloat(item.total) || 0), 0);

    const c1 = company?.contacts?.[0] || company?.contact1 || {};
    const companyName = 'Namo Gange Wellness Pvt. Ltd.';

    const PROFORMA_EVENT_NAME = '9th Edition of International Health & Wellness Expo (IHWE Global Edition)';
    const PROFORMA_PLACE_OF_SUPPLY = 'Hall Nos. 8, 9 & 10, Pragati Maidan, New Delhi - 110001, Bharat';
    const PROFORMA_EVENT_GST_NO = '08AAFCN9238F1Z6';

    const clientCompanyName = document?.company_name || company?.companyName || company?.exhibitorName || '—';
    const clientCompanyAddress = document?.company_addr || [company?.address, company?.city, company?.pincode ? `- ${company.pincode}` : '', company?.state, company?.country].filter(Boolean).join(', ');
    const clientGstNo = document?.company_gst_no || document?.gst_no;

    const eventName = document?.event_name || document?.consignee_name || PROFORMA_EVENT_NAME;
    const eventPlaceOfSupply = document?.event_place_of_supply || document?.consignee_addr || PROFORMA_PLACE_OF_SUPPLY;
    const eventGstNo = document?.event_gst_no || PROFORMA_EVENT_GST_NO;

    const currentInvoiceType = document?.type_of_invoice || document?.est_type;
    const isIgst = currentInvoiceType
        ? (currentInvoiceType === 'Interstate Sale' || currentInvoiceType === 'IGST' || currentInvoiceType === 'Foreign Sale')
        : (document?.state && document.state.toLowerCase() !== 'delhi');

    const currencyStr = document?.currency || 'INR - Indian Rupee (₹)';
    let currAbbr = 'INR';
    if (currencyStr.includes('-')) {
        currAbbr = currencyStr.split('-')[0].trim();
    } else {
        currAbbr = currencyStr.split(' ')[0] || 'INR';
    }

    const sigUrl = settings?.authorizedSignature || null;
    const stampUrl = settings?.companyStamp || null;
    const cancelled = String(document?.status || '').toLowerCase() === 'cancelled';
    const deliveryChallans = document?.delivery_challans || [];

    // ── Split items into pages ──────────────────────────────────────────────
    const itemChunks: any[][] = [];
    {
        let i = 0;
        const firstPageRows = deliveryChallans.length > 0 ? FIRST_PAGE_ITEM_ROWS_WITH_CHALLAN : FIRST_PAGE_ITEM_ROWS;
        let first = true;
        do {
            const size = first ? firstPageRows : OTHER_PAGE_ITEM_ROWS;
            itemChunks.push(items.slice(i, i + size));
            i += size;
            first = false;
        } while (i < items.length);
    }
    // Whether the GST/terms/bank/signature block can share the page with the last
    // items chunk is decided by actually measuring the rendered height (below), not
    // by guessing — a fixed row-count heuristic was wrong in both directions (fit a
    // 2-item invoice that didn't fit; force a split for one that would have fit).
    const [summaryFitsLastPage, setSummaryFitsLastPage] = useState(true);
    const [measuredHeight, setMeasuredHeight] = useState<number | null>(null);
    const lastPageRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!summaryFitsLastPage) return;
        const el = lastPageRef.current;
        if (!el) return;
        const height = el.getBoundingClientRect().height;
        setMeasuredHeight(height);
        if (height > MAX_PAGE_CONTENT_HEIGHT) {
            setSummaryFitsLastPage(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items.length, deliveryChallans.length, summaryFitsLastPage]);

    const totalPages = itemChunks.length + (summaryFitsLastPage ? 0 : 1);

    // ── Reusable page fragments ──────────────────────────────────────────────
    const renderHeaderAndTitle = () => (
        <>
            {headerImageUrl && (
                <div style={{ marginBottom: 5, textAlign: 'center' }}>
                    <img src={headerImageUrl} alt="Header" style={{ width: '100%', maxWidth: '100%', display: 'block' }} />
                </div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', marginBottom: 4, paddingTop: 2, paddingBottom: 2, color: '#0d1f3c', textTransform: 'uppercase' }}>
                <span aria-hidden="true" />
                <div style={{ fontWeight: 400, fontSize: 18 }}>{heading}</div>
                <div style={{ justifySelf: 'end', fontWeight: 700, fontSize: 11 }}>{invoiceCopy}</div>
            </div>
        </>
    );

    const renderDetailsTable = () => (
        <table className="avoid-break" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 5 }}>
            <thead>
                <tr>
                    <th className="invoice-client-column" style={{ background: '#0d1f3c', color: '#fff', border: '1px solid #0d1f3c', padding: '3px 2px', width: '38%', textAlign: 'center', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' }}>Client Name &amp; Address</th>
                    <th className="invoice-shipment-column" style={{ background: '#0d1f3c', color: '#fff', border: '1px solid #0d1f3c', padding: '3px 2px', width: '38%', textAlign: 'center', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' }}>Shipment Details</th>
                    <th className="invoice-details-column" style={{ background: '#0d1f3c', color: '#fff', border: '1px solid #0d1f3c', padding: '3px 2px', width: '24%', textAlign: 'center', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' }}>Invoice Details</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style={{ border: '1px solid #ccc', padding: '4px 8px', verticalAlign: 'top', fontSize: 11, lineHeight: '1.2' }}>
                        <div style={{ fontWeight: 700, textTransform: 'uppercase' }}>{clientCompanyName}</div>
                        <div style={{ marginTop: 2, textTransform: 'capitalize' }}>{clientCompanyAddress || '—'}</div>
                        <table style={{ borderCollapse: 'collapse', border: 'none', lineHeight: '1.3', width: '100%', marginTop: 4 }}>
                            <tbody>
                                <tr>
                                    <td style={{ whiteSpace: 'nowrap', padding: '1px 4px 1px 0', border: 'none', width: '1%' }}>Contact Person</td>
                                    <td style={{ border: 'none', padding: '1px 4px 1px 0', width: '1%' }}>:</td>
                                    <td style={{ border: 'none', padding: '1px 0' }}>{[c1.title, c1.firstName, c1.surname].filter(Boolean).join(' ') || '—'}</td>
                                </tr>
                                <tr>
                                    <td style={{ whiteSpace: 'nowrap', padding: '1px 4px 1px 0', border: 'none', width: '1%' }}>Contact No.</td>
                                    <td style={{ border: 'none', padding: '1px 4px 1px 0', width: '1%' }}>:</td>
                                    <td style={{ border: 'none', padding: '1px 0' }}>{c1.mobile || company?.landline || '—'}</td>
                                </tr>
                                <tr>
                                    <td style={{ whiteSpace: 'nowrap', padding: '1px 4px 1px 0', border: 'none', width: '1%' }}>Email</td>
                                    <td style={{ border: 'none', padding: '1px 4px 1px 0', width: '1%' }}>:</td>
                                    <td style={{ border: 'none', padding: '1px 0' }}>{c1.email || company?.email || '—'}</td>
                                </tr>
                                {clientGstNo && (
                                    <tr>
                                        <td style={{ whiteSpace: 'nowrap', padding: '1px 4px 1px 0', border: 'none', width: '1%' }}>GSTIN.</td>
                                        <td style={{ border: 'none', padding: '1px 4px 1px 0', width: '1%' }}>:</td>
                                        <td style={{ border: 'none', padding: '1px 0' }}>{clientGstNo}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </td>
                    <td style={{ border: '1px solid #ccc', padding: '4px 8px', verticalAlign: 'top', fontSize: 11, lineHeight: '1.2' }}>
                        <div style={{ fontWeight: 700, textTransform: 'uppercase' }}>{eventName}</div>
                        <div style={{ marginTop: 2 }}>{eventPlaceOfSupply}</div>
                        <table style={{ borderCollapse: 'collapse', border: 'none', lineHeight: '1.3', width: '100%', marginTop: 4 }}>
                            <tbody>
                                <tr>
                                    <td style={{ whiteSpace: 'nowrap', padding: '1px 4px 1px 0', border: 'none', width: '1%' }}>Place of Supply &amp; Code</td>
                                    <td style={{ border: 'none', padding: '1px 4px 1px 0', width: '1%' }}>:</td>
                                    <td style={{ border: 'none', padding: '1px 0' }}>{document?.place_of_supply || document?.state || '—'}</td>
                                </tr>
                                <tr>
                                    <td style={{ whiteSpace: 'nowrap', padding: '1px 4px 1px 0', border: 'none', width: '1%' }}>Contact Person</td>
                                    <td style={{ border: 'none', padding: '1px 4px 1px 0', width: '1%' }}>:</td>
                                    <td style={{ border: 'none', padding: '1px 0' }}>{[c1.title, c1.firstName, c1.surname].filter(Boolean).join(' ') || '—'}</td>
                                </tr>
                                <tr>
                                    <td style={{ whiteSpace: 'nowrap', padding: '1px 4px 1px 0', border: 'none', width: '1%' }}>Contact No.</td>
                                    <td style={{ border: 'none', padding: '1px 4px 1px 0', width: '1%' }}>:</td>
                                    <td style={{ border: 'none', padding: '1px 0' }}>{c1.mobile || company?.landline || '—'}</td>
                                </tr>
                                <tr>
                                    <td style={{ whiteSpace: 'nowrap', padding: '1px 4px 1px 0', border: 'none', width: '1%' }}>GSTIN.</td>
                                    <td style={{ border: 'none', padding: '1px 4px 1px 0', width: '1%' }}>:</td>
                                    <td style={{ border: 'none', padding: '1px 0' }}>{eventGstNo}</td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td style={{ border: '1px solid #ccc', padding: '6px 8px', verticalAlign: 'top', fontSize: 11 }}>
                        <table style={{ borderCollapse: 'collapse', border: 'none', lineHeight: '1.3', width: '100%' }}>
                            <tbody>
                                <tr>
                                    <td style={{ fontWeight: 'bold', whiteSpace: 'nowrap', padding: '1px 4px 1px 0', border: 'none', width: '1%' }}>Invoice No.</td>
                                    <td style={{ fontWeight: 'bold', border: 'none', padding: '1px 4px 1px 0', width: '1%' }}>:</td>
                                    <td style={{ border: 'none', padding: '1px 0', textAlign: 'right' }}>{invoiceNo}</td>
                                </tr>
                                {Number(document?.revision_no || 0) > 0 && (
                                    <tr>
                                        <td style={{ fontWeight: 'bold', whiteSpace: 'nowrap', padding: '1px 4px 1px 0', border: 'none', width: '1%' }}>Revision</td>
                                        <td style={{ fontWeight: 'bold', border: 'none', padding: '1px 4px 1px 0', width: '1%' }}>:</td>
                                        <td style={{ border: 'none', padding: '1px 0', textAlign: 'right' }}>Rev {document.revision_no}</td>
                                    </tr>
                                )}
                                <tr>
                                    <td style={{ fontWeight: 'bold', whiteSpace: 'nowrap', padding: '1px 4px 1px 0', border: 'none', width: '1%' }}>Invoice Date</td>
                                    <td style={{ fontWeight: 'bold', border: 'none', padding: '1px 4px 1px 0', width: '1%' }}>:</td>
                                    <td style={{ border: 'none', padding: '1px 0', textAlign: 'right' }}>{invoiceDate}</td>
                                </tr>
                                <tr>
                                    <td style={{ fontWeight: 'bold', whiteSpace: 'nowrap', padding: '1px 4px 1px 0', border: 'none', width: '1%' }}>Created Date</td>
                                    <td style={{ fontWeight: 'bold', border: 'none', padding: '1px 4px 1px 0', width: '1%' }}>:</td>
                                    <td style={{ border: 'none', padding: '1px 0', textAlign: 'right' }}>{createdDateTime}</td>
                                </tr>
                                <tr>
                                    <td style={{ fontWeight: 'bold', whiteSpace: 'nowrap', padding: '1px 4px 1px 0', border: 'none', width: '1%' }}>Created By</td>
                                    <td style={{ fontWeight: 'bold', border: 'none', padding: '1px 4px 1px 0', width: '1%' }}>:</td>
                                    <td style={{ border: 'none', padding: '1px 0', textAlign: 'right', textTransform: 'capitalize' }}>{document?.added_by || 'Admin'}</td>
                                </tr>
                                <tr>
                                    <td style={{ fontWeight: 'bold', whiteSpace: 'nowrap', padding: '1px 4px 1px 0', border: 'none', width: '1%' }}>PO No.</td>
                                    <td style={{ fontWeight: 'bold', border: 'none', padding: '1px 4px 1px 0', width: '1%' }}>:</td>
                                    <td style={{ border: 'none', padding: '1px 0', textAlign: 'right' }}>{document?.po_no || '—'}</td>
                                </tr>
                                <tr>
                                    <td style={{ fontWeight: 'bold', whiteSpace: 'nowrap', padding: '1px 4px 1px 0', border: 'none', width: '1%' }}>Supply Date</td>
                                    <td style={{ fontWeight: 'bold', border: 'none', padding: '1px 4px 1px 0', width: '1%' }}>:</td>
                                    <td style={{ border: 'none', padding: '1px 0', textAlign: 'right' }}>{supplyDateTime || '—'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    );

    const renderChallanSection = () => deliveryChallans.length > 0 && (
        <div style={{ marginBottom: 4 }}>
            <div style={{ background: '#0d1f3c', color: '#fff', border: '1px solid #0d1f3c', padding: '3px 6px', textAlign: 'center', textTransform: 'uppercase', fontSize: 10, fontWeight: 'bold' }}>
                Delivery Challan Details
            </div>
            {deliveryChallans.map((challan: any, challanIndex: number) => (
                <div key={challan.delivery_challan_id || `${challan.challan_no}-${challanIndex}`} className="avoid-break" style={{ border: '1px solid #ccc', borderTop: 0, padding: 4 }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 3 }}>
                        <tbody>
                            <tr>
                                <td style={{ width: '25%', padding: '1px 5px' }}><b>Challan No.:</b> {challan.challan_no || '—'}</td>
                                <td style={{ width: '20%', padding: '1px 5px' }}><b>Date:</b> {challan.challan_date ? new Date(challan.challan_date).toLocaleDateString('en-IN') : '—'}</td>
                                <td style={{ width: '15%', padding: '1px 5px', textTransform: 'capitalize' }}><b>Status:</b> {challan.status || '—'}</td>
                                <td style={{ width: '40%', padding: '1px 5px' }}><b>Delivery:</b> {challan.delivery_address || '—'}</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '1px 5px' }}><b>Transporter:</b> {challan.transporter_name || '—'}</td>
                                <td style={{ padding: '1px 5px' }}><b>Vehicle:</b> {challan.vehicle_no || '—'}</td>
                                <td style={{ padding: '1px 5px' }}><b>E-way Bill:</b> {challan.eway_bill || '—'}</td>
                                <td style={{ padding: '1px 5px' }}><b>Bilty No.:</b> {challan.bilty_no || '—'}</td>
                            </tr>
                        </tbody>
                    </table>
                    {/* <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#eef2f7' }}>
                                <th style={{ border: '1px solid #ccc', padding: 2, width: '4%' }}>#</th>
                                <th style={{ border: '1px solid #ccc', padding: 2, textAlign: 'left' }}>Delivered Item</th>
                                <th style={{ border: '1px solid #ccc', padding: 2, width: '9%' }}>HSN</th>
                                <th style={{ border: '1px solid #ccc', padding: 2, width: '7%' }}>Qty.</th>
                                <th style={{ border: '1px solid #ccc', padding: 2, width: '7%' }}>Unit</th>
                                <th style={{ border: '1px solid #ccc', padding: 2, width: '9%' }}>Rate</th>
                                <th style={{ border: '1px solid #ccc', padding: 2, width: '9%' }}>Discount</th>
                                <th style={{ border: '1px solid #ccc', padding: 2, width: '10%' }}>Amount</th>
                                <th style={{ border: '1px solid #ccc', padding: 2, width: '9%' }}>GST</th>
                                <th style={{ border: '1px solid #ccc', padding: 2, width: '10%' }}>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(challan.items || []).map((item: any, itemIndex: number) => (
                                <tr key={`${challan.challan_no}-${itemIndex}`}>
                                    <td style={{ border: '1px solid #ccc', padding: 2, textAlign: 'center' }}>{itemIndex + 1}</td>
                                    <td style={{ border: '1px solid #ccc', padding: 2 }}>{item.description || '—'}</td>
                                    <td style={{ border: '1px solid #ccc', padding: 2, textAlign: 'center' }}>{item.hsn || '—'}</td>
                                    <td style={{ border: '1px solid #ccc', padding: 2, textAlign: 'center' }}>{item.qty ?? '—'}</td>
                                    <td style={{ border: '1px solid #ccc', padding: 2, textAlign: 'center' }}>{item.unit || '—'}</td>
                                    <td style={{ border: '1px solid #ccc', padding: 2, textAlign: 'right' }}>{item.rate != null ? fmtNum(item.rate) : '—'}</td>
                                    <td style={{ border: '1px solid #ccc', padding: 2, textAlign: 'right' }}>{item.discount != null ? fmtNum(item.discount) : '—'}</td>
                                    <td style={{ border: '1px solid #ccc', padding: 2, textAlign: 'right' }}>{item.taxable != null ? fmtNum(item.taxable) : '—'}</td>
                                    <td style={{ border: '1px solid #ccc', padding: 2, textAlign: 'right' }}>{item.gstAmount != null ? `${fmtNum(item.gstAmount)}${item.gstRate ? ` (${item.gstRate}%)` : ''}` : '—'}</td>
                                    <td style={{ border: '1px solid #ccc', padding: 2, textAlign: 'right', fontWeight: 700 }}>{item.finalAmount != null ? fmtNum(item.finalAmount) : '—'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table> */}
                </div>
            ))}
        </div>
    );

    const renderItemsTable = (chunk: any[], startIndex: number, showSubtotal: boolean) => (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 5 }}>
            <thead>
                <tr style={{ background: '#0d1f3c', color: '#fff', textTransform: 'uppercase' }}>
                    {[
                        { label: 'S.No.', width: '3%' },
                        { label: 'Item Description', width: '48%' },
                        { label: 'HSN Code', width: '7%' },
                        { label: 'Qty.', width: '4%' },
                        { label: 'Area', width: '7%' },
                        { label: 'Size', width: '7%' },
                        { label: 'Unit', width: '6%' },
                        { label: 'Rate', width: '7%' },
                        { label: 'Discount', width: '8%' },
                        { label: 'Total', width: '10%' },
                    ].map(h => (
                        <th key={h.label} style={{ border: '1px solid #0d1f3c', padding: '3px 2px', textAlign: 'center', fontSize: 10, background: '#0d1f3c', color: '#fff', fontWeight: 'bold', width: h.width }}>{h.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {chunk.map((item: any, i: number) => {
                    const index = startIndex + i;
                    const amt = parseFloat(item.amount) || 0;
                    const disc = parseFloat(item.taxableValue) ? amt - parseFloat(item.taxableValue) : 0;
                    return (
                        <tr key={index}>
                            <td style={{ border: '1px solid #ccc', padding: '6px', textAlign: 'center' }}>{index + 1}</td>
                            <td style={{ border: '1px solid #ccc', padding: '6px' }}>
                                <div style={{ fontWeight: 700, textTransform: 'uppercase' }}>9TH EDITION OF INTERNATIONAL HEALTH &amp; WELLNESS EXPO (IHWE GLOBAL EDITION)</div>
                                <div style={{ fontSize: 10, color: '#555', whiteSpace: 'pre-wrap' }}>
                                    {item?.description}
                                    {item?.remarks ? `\n${item.remarks}` : ''}
                                </div>
                            </td>
                            <td style={{ border: '1px solid #ccc', padding: '6px', textAlign: 'center' }}>{item?.hsn}</td>
                            <td style={{ border: '1px solid #ccc', padding: '6px', textAlign: 'center' }}>{item?.qty}</td>
                            <td style={{ border: '1px solid #ccc', padding: '6px', textAlign: 'center' }}>{item?.area || '—'}</td>
                            <td style={{ border: '1px solid #ccc', padding: '6px', textAlign: 'center' }}>{item?.size || '—'}</td>
                            <td style={{ border: '1px solid #ccc', padding: '6px', textAlign: 'center' }}>{item?.unit}</td>
                            <td style={{ border: '1px solid #ccc', padding: '6px', textAlign: 'right' }}>{fmtNum(item?.rate)}</td>
                            <td style={{ border: '1px solid #ccc', padding: '6px', textAlign: 'center' }}>{fmtNum(disc)}%</td>
                            <td style={{ border: '1px solid #ccc', padding: '6px', textAlign: 'right', fontWeight: 700 }}>{fmtNum(item.taxableValue)}</td>
                        </tr>
                    );
                })}
                {showSubtotal && Array.from({ length: Math.max(0, MIN_PADDED_ROWS - chunk.length) }).map((_, i) => (
                    <tr key={`empty-${i}`} style={{ height: 20 }}>
                        {Array(10).fill(0).map((_, j) => <td key={j} style={{ border: '1px solid #ccc' }}></td>)}
                    </tr>
                ))}
                {showSubtotal && (
                    <tr style={{ textTransform: 'uppercase' }}>
                        <td colSpan={9} style={{ border: '1px solid #ccc', padding: '4px 6px', fontWeight: 700, textAlign: 'right', background: '#f8fafc' }}>Taxable Value</td>
                        <td style={{ border: '1px solid #ccc', padding: '4px 6px', fontWeight: 700, textAlign: 'right' }}>{fmtNum(totalTaxable)}</td>
                    </tr>
                )}
            </tbody>
        </table>
    );

    const renderClosingSections = () => (
        <>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 5 }}>
                <thead>
                    <tr style={{ background: '#0d1f3c', color: '#fff', textTransform: 'uppercase' }}>
                        <th style={{ border: '1px solid #0d1f3c', padding: '3px 2px', fontSize: 10, background: '#0d1f3c', color: '#fff', fontWeight: 'bold' }}>S.No.</th>
                        <th style={{ border: '1px solid #0d1f3c', padding: '3px 2px', fontSize: 10, background: '#0d1f3c', color: '#fff', fontWeight: 'bold' }}>HSN/SAC No.</th>
                        <th style={{ border: '1px solid #0d1f3c', padding: '3px 2px', fontSize: 10, background: '#0d1f3c', color: '#fff', fontWeight: 'bold' }}>Item Value</th>
                        <th style={{ border: '1px solid #0d1f3c', padding: '3px 2px', fontSize: 10, background: '#0d1f3c', color: '#fff', fontWeight: 'bold' }}>Qty.</th>
                        <th style={{ border: '1px solid #0d1f3c', padding: '3px 2px', fontSize: 10, background: '#0d1f3c', color: '#fff', fontWeight: 'bold' }}>CGST(%)</th>
                        <th style={{ border: '1px solid #0d1f3c', padding: '3px 2px', fontSize: 10, background: '#0d1f3c', color: '#fff', fontWeight: 'bold' }}>Amount</th>
                        <th style={{ border: '1px solid #0d1f3c', padding: '3px 2px', fontSize: 10, background: '#0d1f3c', color: '#fff', fontWeight: 'bold' }}>SGST(%)</th>
                        <th style={{ border: '1px solid #0d1f3c', padding: '3px 2px', fontSize: 10, background: '#0d1f3c', color: '#fff', fontWeight: 'bold' }}>Amount</th>
                        <th style={{ border: '1px solid #0d1f3c', padding: '3px 2px', fontSize: 10, background: '#0d1f3c', color: '#fff', fontWeight: 'bold' }}>IGST(%)</th>
                        <th style={{ border: '1px solid #0d1f3c', padding: '3px 2px', fontSize: 10, background: '#0d1f3c', color: '#fff', fontWeight: 'bold' }}>Amount</th>
                        <th style={{ border: '1px solid #0d1f3c', padding: '3px 2px', fontSize: 10, background: '#0d1f3c', color: '#fff', fontWeight: 'bold' }}>Total Tax</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item: any, index: number) => {
                        const gstRate = parseFloat(item?.gstPct) || 0;
                        const halfGst = gstRate / 2;
                        const gstAmt = parseFloat(item?.gstAmount) || 0;
                        const halfGstAmt = gstAmt / 2;
                        const itemTaxable = parseFloat(item?.taxableValue) || 0;

                        return (
                            <tr key={index}>
                                <td style={{ border: '1px solid #ccc', padding: '4px 6px', textAlign: 'center' }}>{index + 1}</td>
                                <td style={{ border: '1px solid #ccc', padding: '4px 6px', textAlign: 'center' }}>{item?.hsn}</td>
                                <td style={{ border: '1px solid #ccc', padding: '4px 6px', textAlign: 'right' }}>{fmtNum(itemTaxable)}</td>
                                <td style={{ border: '1px solid #ccc', padding: '4px 6px', textAlign: 'center' }}>{item?.qty}</td>
                                <td style={{ border: '1px solid #ccc', padding: '4px 6px', textAlign: 'center' }}>{!isIgst ? halfGst + '%' : '-'}</td>
                                <td style={{ border: '1px solid #ccc', padding: '4px 6px', textAlign: 'right' }}>{!isIgst ? fmtNum(halfGstAmt) : '-'}</td>
                                <td style={{ border: '1px solid #ccc', padding: '4px 6px', textAlign: 'center' }}>{!isIgst ? halfGst + '%' : '-'}</td>
                                <td style={{ border: '1px solid #ccc', padding: '4px 6px', textAlign: 'right' }}>{!isIgst ? fmtNum(halfGstAmt) : '-'}</td>
                                <td style={{ border: '1px solid #ccc', padding: '4px 6px', textAlign: 'center' }}>{isIgst ? gstRate + '%' : '-'}</td>
                                <td style={{ border: '1px solid #ccc', padding: '4px 6px', textAlign: 'right' }}>{isIgst ? fmtNum(gstAmt) : '-'}</td>
                                <td style={{ border: '1px solid #ccc', padding: '4px 6px', textAlign: 'right', fontWeight: 700 }}>{fmtNum(gstAmt)}</td>
                            </tr>
                        );
                    })}
                    <tr style={{ background: '#f8fafc', textTransform: 'uppercase' }}>
                        <td colSpan={3} style={{ border: '1px solid #ccc', padding: '4px 6px', fontWeight: 700 }}>GST Amount in Words ({currAbbr})</td>
                        <td colSpan={6} style={{ border: '1px solid #ccc', padding: '4px 6px', textTransform: 'capitalize' }}>{toWords(Math.round(totalGstAmount)).toUpperCase()}</td>
                        <td style={{ border: '1px solid #ccc', padding: '4px 6px', fontWeight: 700 }}>Total GST Amount</td>
                        <td style={{ border: '1px solid #ccc', padding: '4px 6px', fontWeight: 700, textAlign: 'right' }}>{fmtNum(totalGstAmount)}</td>
                    </tr>
                    <tr style={{ height: 8 }}>
                        {Array(11).fill(0).map((_, j) => <td key={j} style={{ border: 'none', padding: 0 }}></td>)}
                    </tr>
                    <tr style={{ background: '#f8fafc', textTransform: 'uppercase' }}>
                        <td colSpan={3} style={{ border: '1px solid #ccc', padding: '4px 6px', fontWeight: 700 }}>Amount in Words ({currAbbr})</td>
                        <td colSpan={6} style={{ border: '1px solid #ccc', padding: '4px 6px', textTransform: 'capitalize' }}>{toWords(Math.round(grandTotal)).toUpperCase()}</td>
                        <td style={{ border: '1px solid #ccc', padding: '4px 6px', fontWeight: 700 }}>Grand Total</td>
                        <td style={{ border: '1px solid #ccc', padding: '4px 6px', fontWeight: 700, textAlign: 'right', fontSize: 13, color: '#000' }}>{fmtNum(grandTotal)}</td>
                    </tr>
                </tbody>
            </table>

            <table className="avoid-break" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 5 }}>
                <tbody>
                    <tr>
                        <td style={{ width: '60%', border: '1px solid #ccc', padding: '6px 8px', verticalAlign: 'top', fontSize: 10, background: '#fafafa' }}>
                            <div style={{ fontWeight: 700, marginBottom: 2 }}>Terms and Conditions:</div>
                            <div>1. Payment must be made in favor of Namo Gange Wellness Pvt. Ltd. via Cheque / DD / RTGS / NEFT / UPI only.</div>
                            <div>2. Full payment is due within the stipulated invoice period.</div>
                            <div>3. Delay in payment shall attract interest @24% per annum.</div>
                            <div>4. Booking / services shall be confirmed only after receipt of payment.</div>
                            <div>5. Cancellation or amendments shall be subject to company policy and management approval.</div>
                            <div>6. All disputes are subject to Delhi Jurisdiction only.</div>
                        </td>
                        <td style={{ width: '40%', border: '1px solid #ccc', padding: '6px 8px', verticalAlign: 'top', fontSize: 10, background: '#fafafa' }}>
                            <div style={{ fontWeight: 700, marginBottom: 2 }}>Payment Conditions:</div>
                            <div>1. 100% Advance Payment.</div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <table className="avoid-break" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 5 }}>
                <thead>
                    <tr style={{ background: '#0d1f3c', color: '#fff', textTransform: 'uppercase' }}>
                        <th style={{ border: '1px solid #0d1f3c', padding: '3px 2px', width: '33%', background: '#0d1f3c', color: '#fff', fontWeight: 'bold', fontSize: 10 }}>NGWPL Bank Details</th>
                        <th style={{ border: '1px solid #0d1f3c', padding: '3px 2px', width: '33%', background: '#0d1f3c', color: '#fff', fontWeight: 'bold', fontSize: 10 }}>Client Signature</th>
                        <th style={{ border: '1px solid #0d1f3c', padding: '3px 2px', width: '34%', background: '#0d1f3c', color: '#fff', fontWeight: 'bold', fontSize: 10 }}>For {companyName}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ border: '1px solid #ccc', padding: '6px 8px', verticalAlign: 'top', fontSize: 10 }}>
                            <table style={{ borderCollapse: 'collapse', border: 'none', lineHeight: '1.3', width: 'auto' }}>
                                <tbody>
                                    <tr>
                                        <td style={{ fontWeight: 'bold', whiteSpace: 'nowrap', padding: '1px 4px 1px 0', border: 'none' }}>Bank Name</td>
                                        <td style={{ fontWeight: 'bold', border: 'none', padding: '1px 4px 1px 0' }}>:</td>
                                        <td style={{ border: 'none', whiteSpace: 'nowrap', padding: '1px 0' }}>{bankDetails?.bankname || 'Kotak Mahindra Bank'}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: 'bold', whiteSpace: 'nowrap', padding: '1px 4px 1px 0', border: 'none' }}>Account Name</td>
                                        <td style={{ fontWeight: 'bold', border: 'none', padding: '1px 4px 1px 0' }}>:</td>
                                        <td style={{ border: 'none', whiteSpace: 'nowrap', padding: '1px 0' }}>{bankDetails?.accountname || 'Namo Gange Wellness Pvt. Ltd.'}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: 'bold', whiteSpace: 'nowrap', padding: '1px 4px 1px 0', border: 'none' }}>Account No.</td>
                                        <td style={{ fontWeight: 'bold', border: 'none', padding: '1px 4px 1px 0' }}>:</td>
                                        <td style={{ border: 'none', whiteSpace: 'nowrap', padding: '1px 0' }}>{bankDetails?.accountno || '6812013962'}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: 'bold', whiteSpace: 'nowrap', padding: '1px 4px 1px 0', border: 'none' }}>IFSC Code</td>
                                        <td style={{ fontWeight: 'bold', border: 'none', padding: '1px 4px 1px 0' }}>:</td>
                                        <td style={{ border: 'none', whiteSpace: 'nowrap', padding: '1px 0' }}>{bankDetails?.ifsccode || 'KKBK0004584'}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: 'bold', whiteSpace: 'nowrap', padding: '1px 4px 1px 0', border: 'none' }}>Branch Name</td>
                                        <td style={{ fontWeight: 'bold', border: 'none', padding: '1px 4px 1px 0' }}>:</td>
                                        <td style={{ border: 'none', whiteSpace: 'nowrap', padding: '1px 0' }}>{bankDetails?.bankbranch || 'Jagriti Enclave, Anand Vihar, Delhi'}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td style={{ border: '1px solid #ccc', padding: '6px 8px', textAlign: 'center', verticalAlign: 'bottom' }}>
                            <div style={{ height: 60 }}></div>
                            <div style={{ borderTop: '1px solid #ccc', paddingTop: 4, fontWeight: 700, width: '60%', margin: '0 auto' }}>Auth Signatory</div>
                        </td>
                        <td style={{ border: '1px solid #ccc', padding: '6px 8px', textAlign: 'center', verticalAlign: 'bottom' }}>
                            <div style={{ height: 60, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
                                {sigUrl && <img src={sigUrl} alt="Signature" style={{ maxHeight: 60, maxWidth: 130 }} />}
                                {stampUrl && <img src={stampUrl} alt="Stamp" style={{ maxHeight: 60, maxWidth: 60 }} />}
                            </div>
                            <div style={{ borderTop: '1px solid #ccc', paddingTop: 4, fontWeight: 700, width: '60%', margin: '0 auto' }}>Auth Signatory</div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div style={{ fontSize: 12, textAlign: 'center', color: '#666', marginTop: 8, paddingTop: 6 }}>
                <b>Registered Address:</b> First Floor, E-1, Opposite KFC, Kalkaji Main Market, South Delhi-110019, Delhi, India
            </div>
            <div style={{ fontSize: 11, textAlign: 'center', color: '#999', marginTop: 4 }}>
                This is a computer generated document and does not require a physical signature.
            </div>
        </>
    );

    const renderPageNumber = (page: number) => (
        <div style={{ textAlign: 'right', fontSize: 9, color: '#94a3b8', marginTop: 8 }}>Page {page} of {totalPages}</div>
    );

    const pageStyle = (pageIdx: number): CSSProperties => ({
        fontFamily: 'Calibri, Arial, sans-serif',
        maxWidth: '1000px',
        margin: pageIdx === 0 ? '0 auto 24px' : '24px auto',
        position: 'relative',
        pageBreakBefore: pageIdx > 0 ? 'always' : undefined,
    });

    return (
        <>
            <style>{`
                @media print {
                    .invoice-client-column { width: 36% !important; }
                    .invoice-shipment-column { width: 38% !important; }
                    .invoice-details-column { width: 26% !important; }
                }
            `}</style>

            {itemChunks.map((chunk, pageIdx) => {
                const startIndex = itemChunks.slice(0, pageIdx).reduce((s, c) => s + c.length, 0);
                const isLastItemPage = pageIdx === itemChunks.length - 1;
                const attemptCombine = isLastItemPage && summaryFitsLastPage;

                return (
                    <div
                        key={`page-${pageIdx}`}
                        ref={isLastItemPage ? lastPageRef : undefined}
                        className="bg-white border border-slate-300 p-6 text-[11px] font-sans text-black"
                        style={pageStyle(pageIdx)}
                    >
                        {cancelled && (
                            <div style={{
                                position: 'absolute', top: '44%', left: '50%', transform: 'translate(-50%, -50%) rotate(-18deg)',
                                border: '6px solid rgba(220, 38, 38, 0.7)', color: 'rgba(220, 38, 38, 0.75)', fontSize: 54, fontWeight: 900,
                                letterSpacing: 4, padding: '10px 28px', textTransform: 'uppercase', zIndex: 5, pointerEvents: 'none',
                            }}>
                                Cancelled
                            </div>
                        )}
                        {renderHeaderAndTitle()}
                        {renderDetailsTable()}
                        {pageIdx === 0 && renderChallanSection()}
                        {renderItemsTable(chunk, startIndex, isLastItemPage)}
                        {attemptCombine && renderClosingSections()}
                        {renderPageNumber(pageIdx + 1)}
                    </div>
                );
            })}

            {!summaryFitsLastPage && (
                <div className="bg-white border border-slate-300 p-6 text-[11px] font-sans text-black" style={pageStyle(1)}>
                    {renderHeaderAndTitle()}
                    {renderDetailsTable()}
                    {renderClosingSections()}
                    {renderPageNumber(totalPages)}
                </div>
            )}
        </>
    );
}
