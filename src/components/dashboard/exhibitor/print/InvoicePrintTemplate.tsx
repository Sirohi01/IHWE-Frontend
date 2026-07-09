import { useState, useLayoutEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { Landmark, SquarePen, Phone, Mail, Globe } from 'lucide-react';
import { getFirstCleanValue, normalizeContactName, getFirstAddressValue, joinAddressParts, getDiscountPercent, getItemTaxable, formatSize, formatArea } from './templateHelpers';

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
    let words = convert(intPart).trim();
    return 'Rupees ' + words + ' Only.';
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
    const invoiceDate = dateVal ? new Date(dateVal).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }) : '';
    const createdDateTime = document?.added
        ? new Date(document.added).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true }).replace(',', '')
        : new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true }).replace(',', '');
    const supplyDateTime = document?.supply_date
        ? new Date(document.supply_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })
        : '';

    const totalTaxable = items.reduce((sum: number, item: any) => sum + (parseFloat(item.taxableValue) || 0), 0);
    const totalGstAmount = items.reduce((sum: number, item: any) => sum + (parseFloat(item.gstAmount) || 0), 0);
    const grandTotal = document?.finalAmount || items.reduce((sum: number, item: any) => sum + (parseFloat(item.total) || 0), 0);
    const c1 = company?.contacts?.[0] || company?.contact1 || {};
    const companyName = 'Namo Gange Wellness Pvt. Ltd.';

    const PROFORMA_EVENT_NAME = '9th Edition of International Health & Wellness Expo (IHWE Global Edition)';
    const PROFORMA_PLACE_OF_SUPPLY = 'Hall Nos. 8, 9 & 10, Pragati Maidan, New Delhi - 110001, Bharat';
    const PROFORMA_EVENT_STATE = 'Delhi';
    const PROFORMA_PLACE_OF_SUPPLY_WITH_CODE = 'Delhi (07)';
    const PROFORMA_EVENT_GST_NO = '07AAFCN9238F1Z6';

    const clientCompanyName = document?.company_name || company?.companyName || company?.exhibitorName || '—';
    const titledContactPerson = [c1.title, c1.firstName, c1.surname].filter(Boolean).join(' ');
    const rawClientContactPerson = getFirstCleanValue(
        document?.contact_person,
        document?.company_contact_person,
        document?.consignee_person,
        titledContactPerson,
        company?.contactPerson,
        company?.contact_person
    ) || '—';
    const clientContactPerson = normalizeContactName(rawClientContactPerson, titledContactPerson);

    const clientContactNo = getFirstCleanValue(
        document?.contact_no,
        document?.contact_phone,
        document?.company_contact_no,
        document?.company_phone,
        document?.mobile,
        document?.phone,
        document?.consignee_phone,
        c1.mobile,
        company?.landline,
        company?.mobile
    ) || '—';

    const clientEmail = getFirstCleanValue(
        document?.company_email,
        document?.contact_email,
        document?.email,
        c1.email,
        company?.companyEmail,
        company?.email
    ) || '—';

    const clientAddressLine = getFirstAddressValue(
        document?.company_addr,
        document?.address,
        company?.address,
        company?.companyAddress,
        company?.company_addr
    );
    const clientCity = getFirstAddressValue(
        document?.company_city,
        document?.city,
        company?.city,
        company?.district
    );
    const clientState = getFirstAddressValue(
        document?.company_state,
        document?.state,
        company?.state
    );
    const clientCountry = getFirstAddressValue(
        document?.company_country,
        document?.country,
        company?.country
    );
    const clientPincode = getFirstAddressValue(
        document?.company_pincode,
        document?.pincode,
        document?.pin_code,
        document?.postal_code,
        document?.zip_code,
        company?.pincode,
        company?.pinCode,
        company?.pin_code,
        company?.postalCode,
        company?.postal_code,
        company?.zipCode,
        company?.zip_code
    );
    const clientCompanyAddress = joinAddressParts([
        clientAddressLine,
        clientCity,
        clientPincode,
        clientState,
        clientCountry,
    ]);
    const clientGstNo = document?.company_gst_no || document?.gst_no;

    const eventName = document?.event_name || document?.consignee_name || PROFORMA_EVENT_NAME;
    const eventPlaceOfSupply = joinAddressParts([
        (document?.event_place_of_supply || document?.consignee_addr || PROFORMA_PLACE_OF_SUPPLY)
            .replace(/,\s*Bharat$/i, ''),
        PROFORMA_EVENT_STATE,
        'Bharat',
    ]);
    const shipmentAddress = eventPlaceOfSupply;
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
    const challanNos = deliveryChallans.map((c: any) => c.challan_no).filter(Boolean);

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
                    <img loading="lazy" decoding="async" src={headerImageUrl} alt="Header" style={{ width: '100%', maxWidth: '100%', display: 'block' }} />
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
                                    <td style={{ border: 'none', padding: '1px 0' }}>{clientContactPerson}</td>
                                </tr>
                                <tr>
                                    <td style={{ whiteSpace: 'nowrap', padding: '1px 4px 1px 0', border: 'none', width: '1%' }}>Contact No.</td>
                                    <td style={{ border: 'none', padding: '1px 4px 1px 0', width: '1%' }}>:</td>
                                    <td style={{ border: 'none', padding: '1px 0' }}>{clientContactNo}</td>
                                </tr>
                                <tr>
                                    <td style={{ whiteSpace: 'nowrap', padding: '1px 4px 1px 0', border: 'none', width: '1%' }}>Email</td>
                                    <td style={{ border: 'none', padding: '1px 4px 1px 0', width: '1%' }}>:</td>
                                    <td style={{ border: 'none', padding: '1px 0' }}>{clientEmail}</td>
                                </tr>
                                {clientGstNo && (
                                    <tr>
                                        <td style={{ whiteSpace: 'nowrap', padding: '1px 4px 1px 0', border: 'none', width: '1%' }}>GSTIN/PAN</td>
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
                                    <td style={{ border: 'none', padding: '1px 0' }}>{PROFORMA_PLACE_OF_SUPPLY_WITH_CODE}</td>
                                </tr>
                                <tr>
                                    <td style={{ whiteSpace: 'nowrap', padding: '1px 4px 1px 0', border: 'none', width: '1%' }}>Contact Person</td>
                                    <td style={{ border: 'none', padding: '1px 4px 1px 0', width: '1%' }}>:</td>
                                    <td style={{ border: 'none', padding: '1px 0' }}>{clientContactPerson}</td>
                                </tr>
                                <tr>
                                    <td style={{ whiteSpace: 'nowrap', padding: '1px 4px 1px 0', border: 'none', width: '1%' }}>Contact No.</td>
                                    <td style={{ border: 'none', padding: '1px 4px 1px 0', width: '1%' }}>:</td>
                                    <td style={{ border: 'none', padding: '1px 0' }}>{clientContactNo}</td>
                                </tr>
                                {eventGstNo && eventGstNo !== '—' && (
                                    <tr>
                                        <td style={{ whiteSpace: 'nowrap', padding: '1px 4px 1px 0', border: 'none', width: '1%' }}>GSTIN</td>
                                        <td style={{ border: 'none', padding: '1px 4px 1px 0', width: '1%' }}>:</td>
                                        <td style={{ border: 'none', padding: '1px 0' }}>{eventGstNo}</td>
                                    </tr>
                                )}
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
                                <tr>
                                    <td style={{ fontWeight: 'bold', whiteSpace: 'nowrap', padding: '1px 4px 1px 0', border: 'none', width: '1%' }}>Invoice Date</td>
                                    <td style={{ fontWeight: 'bold', border: 'none', padding: '1px 4px 1px 0', width: '1%' }}>:</td>
                                    <td style={{ border: 'none', padding: '1px 0', textAlign: 'right' }}>{invoiceDate}</td>
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
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
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
                        { label: 'Size', width: '7%' },
                        { label: 'Area', width: '7%' },
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
                    const discPct = item.discountPct != null ? parseFloat(item.discountPct) : (amt > 0 ? (disc / amt) * 100 : 0);
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
                            <td style={{ border: '1px solid #ccc', padding: '6px', textAlign: 'center', whiteSpace: 'nowrap' }}>{formatSize(item?.area || item?.stall_area)}</td>
                            <td style={{ border: '1px solid #ccc', padding: '6px', textAlign: 'center', whiteSpace: 'nowrap' }}>{formatArea(item?.size || item?.stall_size)}</td>
                            <td style={{ border: '1px solid #ccc', padding: '6px', textAlign: 'center' }}>Nos.</td>
                            <td style={{ border: '1px solid #ccc', padding: '6px', textAlign: 'right' }}>{fmtNum(item?.rate)}</td>
                            <td style={{ border: '1px solid #ccc', padding: '6px', textAlign: 'center' }}>{Math.round(discPct)}%</td>
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
                        <td colSpan={7} style={{ border: '1px solid #ccc', padding: '4px 6px', fontWeight: 700, borderRight: 'none', background: '#fff' }}>
                            {challanNos.length > 0 ? `DELIVERY CHALLAN NO.: ${challanNos.join(', ')}` : ''}
                        </td>
                        <td colSpan={2} style={{ border: '1px solid #ccc', padding: '4px 6px', fontWeight: 700, textAlign: 'right', background: '#f8fafc', borderLeft: 'none' }}>
                            Taxable Value
                        </td>
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
                        <td colSpan={6} style={{ border: '1px solid #ccc', padding: '4px 6px', textTransform: 'none' }}>{toWords(Math.round(totalGstAmount))}</td>
                        <td style={{ border: '1px solid #ccc', padding: '4px 6px', fontWeight: 700 }}>Total GST Amount</td>
                        <td style={{ border: '1px solid #ccc', padding: '4px 6px', fontWeight: 700, textAlign: 'right' }}>{fmtNum(totalGstAmount)}</td>
                    </tr>
                    <tr style={{ height: 8 }}>
                        {Array(11).fill(0).map((_, j) => <td key={j} style={{ border: 'none', padding: 0 }}></td>)}
                    </tr>
                    <tr style={{ background: '#f8fafc', textTransform: 'uppercase' }}>
                        <td colSpan={3} style={{ border: '1px solid #ccc', padding: '4px 6px', fontWeight: 700 }}>Amount in Words ({currAbbr})</td>
                        <td colSpan={6} style={{ border: '1px solid #ccc', padding: '4px 6px', textTransform: 'none' }}>{toWords(Math.round(grandTotal))}</td>
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

            <table className="avoid-break" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 0, border: '1px solid #ccc' }}>
                <colgroup>
                    <col style={{ width: '33%' }} />
                    <col style={{ width: '33%' }} />
                    <col style={{ width: '34%' }} />
                </colgroup>
                <thead>
                    <tr>
                        <th style={{ border: 'none', borderRight: '1px solid #ccc', borderBottom: '1px solid #ccc', padding: '6px 8px', background: '#fff', textAlign: 'left' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#0d1f3c', fontWeight: 700, fontSize: 10.5, textTransform: 'uppercase' }}>
                                <Landmark size={14} strokeWidth={2} /> NGWPL Bank Details
                            </div>
                        </th>
                        <th style={{ border: 'none', borderRight: '1px solid #ccc', borderBottom: '1px solid #ccc', padding: '6px 8px', background: '#fff', textAlign: 'left' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#0d1f3c', fontWeight: 700, fontSize: 10.5, textTransform: 'uppercase' }}>
                                <SquarePen size={14} strokeWidth={2} /> Receiver&apos;s Acknowledgement
                            </div>
                        </th>
                        <th style={{ border: 'none', borderBottom: '1px solid #ccc', padding: '6px 8px', background: '#fff', textAlign: 'left' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#0d1f3c', fontWeight: 700, fontSize: 10.5, textTransform: 'uppercase' }}>
                                <SquarePen size={14} strokeWidth={2} /> For {companyName}
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ border: 'none', borderRight: '1px solid #ccc', padding: '2px 8px 8px', verticalAlign: 'top', fontSize: 10 }}>
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
                                        <td style={{ border: 'none', whiteSpace: 'nowrap', padding: '1px 0', fontWeight: 700, color: '#0d1f3c' }}>{bankDetails?.ifsccode || 'KKBK0004584'}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: 'bold', whiteSpace: 'nowrap', padding: '1px 4px 1px 0', border: 'none' }}>Branch Name</td>
                                        <td style={{ fontWeight: 'bold', border: 'none', padding: '1px 4px 1px 0' }}>:</td>
                                        <td style={{ border: 'none', whiteSpace: 'nowrap', padding: '1px 0' }}>{bankDetails?.bankbranch || 'Jagriti Enclave, Anand Vihar, Delhi'}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td style={{ border: 'none', borderRight: '1px solid #ccc', padding: '16px 8px 8px', verticalAlign: 'top', fontSize: 10 }}>
                            <div>Received the above goods / services in good condition.</div>
                            <div style={{ borderTop: '1px solid #ccc', margin: '60px 10px 8px' }}></div>
                            <div style={{ textAlign: 'center', fontStyle: 'italic', color: '#888', fontSize: 9, marginTop: 6 }}>(Signature &amp; Company Seal)</div>
                        </td>
                        <td style={{ border: 'none', padding: '2px 8px 8px', textAlign: 'center', verticalAlign: 'bottom' }}>
                            <div style={{ height: 55, marginTop: 15, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                                {sigUrl && <img loading="lazy" decoding="async" src={sigUrl} alt="Signature" style={{ maxHeight: 55, maxWidth: 120 }} />}
                                {stampUrl && <img loading="lazy" decoding="async" src={stampUrl} alt="Stamp" style={{ maxHeight: 55, maxWidth: 55 }} />}
                            </div>
                            <div style={{ borderTop: '1px solid #ccc', marginTop: 20, paddingTop: 4, fontWeight: 700, width: '60%', marginLeft: 'auto', marginRight: 'auto' }}>Auth. Sign.</div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className="avoid-break" style={{ position: 'relative', height: 62, overflow: 'hidden', border: '1px solid #ccc', borderTop: 'none' }}>
                {/* navy background — banner area only, bottom-anchored */}
                <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 34, background: '#0d1f3c', zIndex: 0 }} />

                {/* contact row */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, fontSize: 10, fontWeight: 600, color: '#0d1f3c', zIndex: 2 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                        +91 96549 00525
                    </div>
                    <div style={{ width: 1, height: 12, background: '#ccc' }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Mail size={12} /> info@namogangewellness.com</div>
                    <div style={{ width: 1, height: 12, background: '#ccc' }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Globe size={12} /> www.namogangewellness.com</div>
                </div>

                {/* banner text */}
                <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 10.5, zIndex: 2 }}>
                    <span>This is a computer generated document and does not require a physical signature.</span>
                </div>
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
