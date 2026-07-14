import { useState, useLayoutEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { Landmark, SquarePen, Mail, Globe } from 'lucide-react';
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
const FIRST_PAGE_ITEM_ROWS = 10;
const OTHER_PAGE_ITEM_ROWS = 16;
const MIN_PADDED_ROWS = 5;

interface Props {
    document: any;
    company?: any;
    bankDetails?: any;
    settings?: any;
    headerImageUrl?: string | null;
    invoiceCopy?: string;
    estimateTerms?: any;
}
export default function ProformaPrintTemplate({ document, company, bankDetails, settings, headerImageUrl, invoiceCopy = 'ORIGINAL COPY', estimateTerms }: Props) {
    const fmtNum = (n: any) => Math.round(Number(n || 0)).toLocaleString('en-IN');

    const items = document?.items || [];
    const estNo = document?.est_no || '';
    const estDate = document?.supply_date ? new Date(document.supply_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }) : '';
    const createdDateTime = document?.added
        ? new Date(document.added).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true }).replace(',', '')
        : new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true }).replace(',', '');

    const totalTaxable = items.reduce((sum: number, item: any) => {
        const amt = parseFloat(item.amount) || 0;
        const discPct = parseFloat(item.disc) || 0;
        const discountAmt = (amt * discPct) / 100;
        return sum + (amt - discountAmt);
    }, 0);
    const totalGstAmount = items.reduce((sum: number, item: any) => sum + (parseFloat(item.tax) || 0), 0);
    const grandTotal = document?.finalAmount || items.reduce((sum: number, item: any) => sum + (parseFloat(item.finalAmount) || 0), 0);

    const c1 = company?.contacts?.[0] || company?.contact1 || {};
    const companyName = 'Namo Gange Wellness Pvt. Ltd.';

    const PROFORMA_EVENT_NAME = '9th Edition of International Health & Wellness Expo (IHWE Global Edition)';
    const PROFORMA_PLACE_OF_SUPPLY = 'Hall Nos. 8, 9 & 10, Pragati Maidan, New Delhi - 110001, India';
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
        'India',
    ]);
    const shipmentAddress = eventPlaceOfSupply;
    const eventGstNo = document?.event_gst_no || PROFORMA_EVENT_GST_NO;

    const isIgst = document?.est_type
        ? (document.est_type === 'Interstate Sale' || document.est_type === 'IGST' || document.est_type === 'Foreign Sale')
        : (document?.state && document.state.toLowerCase() !== 'delhi');

    const sigUrl = settings?.authorizedSignature || null;
    const stampUrl = settings?.companyStamp || null;
    const cancelled = String(document?.status || '').toLowerCase() === 'cancelled';

    // ── Split items into pages ──────────────────────────────────────────────
    const itemChunks: any[][] = [];
    {
        let i = 0;
        let first = true;
        do {
            const size = first ? FIRST_PAGE_ITEM_ROWS : OTHER_PAGE_ITEM_ROWS;
            itemChunks.push(items.slice(i, i + size));
            i += size;
            first = false;
        } while (i < items.length);
    }
    // Whether the GST/terms/bank/signature block can share the page with the last
    // items chunk is decided by actually measuring the rendered height, not by
    // guessing.
    const [summaryFitsLastPage, setSummaryFitsLastPage] = useState(true);
    const lastPageRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!summaryFitsLastPage) return;
        const el = lastPageRef.current;
        if (!el) return;
        if (el.getBoundingClientRect().height > MAX_PAGE_CONTENT_HEIGHT) {
            setSummaryFitsLastPage(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items.length, summaryFitsLastPage]);

    const totalPages = itemChunks.length + (summaryFitsLastPage ? 0 : 1);

    const renderHeaderAndTitle = () => (
        <>
            {headerImageUrl && (
                <div style={{ marginBottom: 0, textAlign: 'center' }}>
                    <img loading="lazy" decoding="async" src={headerImageUrl} alt="Header" style={{ width: '100%', maxWidth: '100%', display: 'block' }} />
                </div>
            )}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 22, marginBottom: 0, paddingTop: 10, paddingBottom: 4, color: '#0d1f3c', textTransform: 'uppercase' , whiteSpace: 'nowrap' }}>
                <div style={{ fontWeight: 500, fontSize: 18, lineHeight: 1, textAlign: 'center' }}>PROFORMA INVOICE</div>
                <div style={{ position: 'absolute', right: 0, bottom: 3, fontWeight: 600, fontSize: 11, lineHeight: 1, paddingRight: 2, whiteSpace: 'nowrap', textAlign: 'right', letterSpacing: '-0.35px' }}>{invoiceCopy}</div>
            </div>
        </>
    );

    const renderDetailsTable = () => (
        <table className="avoid-break" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 5 }}>
            <thead>
                <tr>
                    <th style={{ background: '#0d1f3c', color: '#fff', border: '1px solid #0d1f3c', padding: '3px 2px', width: '38%', textAlign: 'center', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' }}>Client Name &amp; Address</th>
                    <th style={{ background: '#0d1f3c', color: '#fff', border: '1px solid #0d1f3c', padding: '3px 2px', width: '38%', textAlign: 'center', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' }}>Shipment Details</th>
                    <th style={{ background: '#0d1f3c', color: '#fff', border: '1px solid #0d1f3c', padding: '3px 2px', width: '24%', textAlign: 'center', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' }}>Proforma Details</th>
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
                                    <td style={{ border: 'none', padding: '1px 0', textTransform: 'capitalize' }}>{clientContactPerson}</td>
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
                        <div style={{ marginTop: 2 }}>{shipmentAddress}</div>
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
                                    <td style={{ border: 'none', padding: '1px 0', textTransform: 'capitalize' }}>{clientContactPerson}</td>
                                </tr>
                                <tr>
                                    <td style={{ whiteSpace: 'nowrap', padding: '1px 4px 1px 0', border: 'none', width: '1%' }}>Contact No.</td>
                                    <td style={{ border: 'none', padding: '1px 4px 1px 0', width: '1%' }}>:</td>
                                    <td style={{ border: 'none', padding: '1px 0' }}>{clientContactNo}</td>
                                </tr>
                                <tr>
                                    <td style={{ whiteSpace: 'nowrap', padding: '1px 4px 1px 0', border: 'none', width: '1%' }}>GSTIN</td>
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
                                    <td style={{ fontWeight: 'bold', whiteSpace: 'nowrap', padding: '1px 4px 1px 0', border: 'none', width: '1%' }}>Proforma No.</td>
                                    <td style={{ fontWeight: 'bold', border: 'none', padding: '1px 4px 1px 0', width: '1%' }}>:</td>
                                    <td style={{ border: 'none', padding: '1px 0', textAlign: 'right', whiteSpace: 'nowrap' }}>{estNo}</td>
                                </tr>
                                <tr>
                                    <td style={{ fontWeight: 'bold', whiteSpace: 'nowrap', padding: '1px 4px 1px 0', border: 'none', width: '1%' }}>Proforma Date</td>
                                    <td style={{ fontWeight: 'bold', border: 'none', padding: '1px 4px 1px 0', width: '1%' }}>:</td>
                                    <td style={{ border: 'none', padding: '1px 0', textAlign: 'right', whiteSpace: 'nowrap' }}>{estDate}</td>
                                </tr>
                                <tr>
                                    <td style={{ fontWeight: 'bold', whiteSpace: 'nowrap', padding: '1px 4px 1px 0', border: 'none', width: '1%' }}>Created Date</td>
                                    <td style={{ fontWeight: 'bold', border: 'none', padding: '1px 4px 1px 0', width: '1%' }}>:</td>
                                    <td style={{ border: 'none', padding: '1px 0', textAlign: 'right', whiteSpace: 'nowrap' }}>{createdDateTime}</td>
                                </tr>
                                <tr>
                                    <td style={{ fontWeight: 'bold', whiteSpace: 'nowrap', padding: '1px 4px 1px 0', border: 'none', width: '1%' }}>Created By</td>
                                    <td style={{ fontWeight: 'bold', border: 'none', padding: '1px 4px 1px 0', width: '1%' }}>:</td>
                                    <td style={{ border: 'none', padding: '1px 0', textAlign: 'right', textTransform: 'capitalize', whiteSpace: 'nowrap' }}>{document?.added_by || 'Admin'}</td>
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
                        <th key={h.label} style={{ border: '1px solid #0d1f3c', padding: '3px 2px', textAlign: 'center', fontSize: 10, background: '#0d1f3c', color: '#fff', fontWeight: 'bold', width: h.width, whiteSpace: 'nowrap' }}>{h.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {chunk.map((item: any, i: number) => {
                    const index = startIndex + i;
                    const amt = parseFloat(item.amount) || 0;
                    const discPct = parseFloat(item.disc) || 0; // In Proforma, item.disc stores the percentage (e.g. 9)
                    const discountAmt = (amt * discPct) / 100;
                    const taxable = amt - discountAmt;
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
                            <td style={{ border: '1px solid #ccc', padding: '6px', textAlign: 'center' }}>Nos</td>
                            <td style={{ border: '1px solid #ccc', padding: '6px', textAlign: 'right' }}>{fmtNum(item?.rate)}</td>
                            <td style={{ border: '1px solid #ccc', padding: '6px', textAlign: 'center' }}>{fmtNum(item?.disc)}%</td>
                            <td style={{ border: '1px solid #ccc', padding: '6px', textAlign: 'right', fontWeight: 700 }}>{fmtNum(taxable)}</td>
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
                        const gstRate = parseFloat(item?.gstRate) || 0;
                        const halfGst = gstRate / 2;
                        const amt = parseFloat(item?.amount) || 0;
                        const discPct = parseFloat(item?.disc) || 0;
                        const discountAmt = (amt * discPct) / 100;
                        const itemTaxable = amt - discountAmt;
                        const gstAmt = parseFloat(item?.tax) || 0;
                        const halfGstAmt = gstAmt / 2;

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
                        <td colSpan={3} style={{ border: '1px solid #ccc', padding: '4px 6px', fontWeight: 700 }}>GST Amount in Words</td>
                        <td colSpan={6} style={{ border: '1px solid #ccc', padding: '4px 6px', textTransform: 'none' }}>{toWords(Math.round(totalGstAmount))}</td>
                        <td style={{ border: '1px solid #ccc', padding: '4px 6px', fontWeight: 700 }}>Total GST Amount</td>
                        <td style={{ border: '1px solid #ccc', padding: '4px 6px', fontWeight: 700, textAlign: 'right' }}>{fmtNum(totalGstAmount)}</td>
                    </tr>
                    <tr style={{ height: 8 }}>
                        {Array(11).fill(0).map((_, j) => <td key={j} style={{ border: 'none', padding: 0 }}></td>)}
                    </tr>
                    <tr style={{ background: '#f8fafc', textTransform: 'uppercase' }}>
                        <td colSpan={3} style={{ border: '1px solid #ccc', padding: '4px 6px', fontWeight: 700 }}>Amount in Words</td>
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
                            <div style={{ fontWeight: 700, marginBottom: 4, background: '#F8FAFC', borderBottom: '1px solid #ccc', padding: '4px 8px', margin: '-6px -8px 6px' }}>Terms and Conditions:</div>
                            <div style={{ whiteSpace: 'pre-wrap' }}>
                                {estimateTerms?.termsAndConditions?.length ? (
                                    estimateTerms.termsAndConditions.map((t: string, i: number) => <div key={i}>{i + 1}. {t}</div>)
                                ) : (
                                    document?.terms || '1. Payment must be made in favor of Namo Gange Wellness Pvt. Ltd. via Cheque / DD / RTGS / NEFT / UPI only.\n2. This is a Proforma Invoice and not a demand for payment.\n3. All disputes are subject to Delhi Jurisdiction only.'
                                )}
                            </div>
                        </td>
                        <td style={{ width: '40%', border: '1px solid #ccc', padding: '6px 8px', verticalAlign: 'top', fontSize: 10, background: '#fafafa' }}>
                            <div style={{ fontWeight: 700, marginBottom: 4, background: '#F8FAFC', borderBottom: '1px solid #ccc', padding: '4px 8px', margin: '-6px -8px 6px' }}>Payment Conditions:</div>
                            <div style={{ whiteSpace: 'pre-wrap' }}>
                                {estimateTerms?.paymentConditions?.length ? (
                                    estimateTerms.paymentConditions.map((t: string, i: number) => <div key={i}>{i + 1}. {t}</div>)
                                ) : (
                                    '1. 100% Advance Payment.'
                                )}
                            </div>
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
                    <tr style={{ background: '#fafafa' }}>
                        <th style={{ border: 'none', borderRight: '1px solid #ccc', borderBottom: '1px solid #ccc', padding: '6px 8px', background: '#fafafa', textAlign: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: '#0d1f3c', fontWeight: 700, fontSize: 10.5, textTransform: 'uppercase' , whiteSpace: 'nowrap' }}>
                                <Landmark size={14} strokeWidth={2} /> NGWPL Bank Details
                            </div>
                        </th>
                        <th style={{ border: 'none', borderRight: '1px solid #ccc', borderBottom: '1px solid #ccc', padding: '6px 8px', background: '#fafafa', textAlign: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: '#0d1f3c', fontWeight: 700, fontSize: 10.5, textTransform: 'uppercase' , whiteSpace: 'nowrap' }}>
                                <SquarePen size={14} strokeWidth={2} /> Receiver&apos;s Acknowledgement
                            </div>
                        </th>
                        <th style={{ border: 'none', borderBottom: '1px solid #ccc', padding: '6px 8px', background: '#fafafa', textAlign: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: '#0d1f3c', fontWeight: 700, fontSize: 10.5, textTransform: 'uppercase' , whiteSpace: 'nowrap' }}>
                                <SquarePen size={14} strokeWidth={2} /> For {companyName}
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td rowSpan={2} style={{ border: 'none', borderRight: '1px solid #ccc', padding: '2px 8px 2px', verticalAlign: 'top', fontSize: 10, width: '33.33%' }}>
                            <table style={{ borderCollapse: 'collapse', border: 'none', lineHeight: '1.3', width: '100%' }}>
                                <tbody>
                                    <tr>
                                        <td style={{ fontWeight: 'bold', whiteSpace: 'nowrap', padding: '1px 4px 1px 0', border: 'none' }}>Bank Name</td>
                                        <td style={{ fontWeight: 'bold', border: 'none', padding: '1px 4px 1px 0' }}>:</td>
                                        <td style={{ border: 'none', padding: '1px 0', wordBreak: 'break-word' }}>{bankDetails?.bankname || 'Kotak Mahindra Bank'}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: 'bold', whiteSpace: 'nowrap', padding: '1px 4px 1px 0', border: 'none' }}>Account Name</td>
                                        <td style={{ fontWeight: 'bold', border: 'none', padding: '1px 4px 1px 0' }}>:</td>
                                        <td style={{ border: 'none', padding: '1px 0', wordBreak: 'break-word' }}>{bankDetails?.accountname || 'Namo Gange Wellness Pvt. Ltd.'}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: 'bold', whiteSpace: 'nowrap', padding: '1px 4px 1px 0', border: 'none' }}>Account No.</td>
                                        <td style={{ fontWeight: 'bold', border: 'none', padding: '1px 4px 1px 0' }}>:</td>
                                        <td style={{ border: 'none', padding: '1px 0', wordBreak: 'break-word' }}>{bankDetails?.accountno || '6812013962'}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: 'bold', whiteSpace: 'nowrap', padding: '1px 4px 1px 0', border: 'none' }}>IFSC Code</td>
                                        <td style={{ fontWeight: 'bold', border: 'none', padding: '1px 4px 1px 0' }}>:</td>
                                        <td style={{ border: 'none', padding: '1px 0', wordBreak: 'break-word' }}>{bankDetails?.ifsccode || 'KKBK0004584'}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: 'bold', whiteSpace: 'nowrap', padding: '1px 4px 1px 0', border: 'none' }}>Branch Name</td>
                                        <td style={{ fontWeight: 'bold', border: 'none', padding: '1px 4px 1px 0' }}>:</td>
                                        <td style={{ border: 'none', padding: '1px 0', wordBreak: 'break-word' }}>{bankDetails?.bankbranch || 'Jagriti Enclave, Anand Vihar, Delhi'}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td style={{ border: 'none', borderRight: '1px solid #ccc', padding: '2px 8px 8px', verticalAlign: 'top', textAlign: 'center', width: '33.33%' }}>
                            <span style={{ fontSize: 9, whiteSpace: 'nowrap' }}>Received the above goods / services in good condition.</span>
                        </td>
                        <td style={{ border: 'none', padding: '8px', verticalAlign: 'top', textAlign: 'center', width: '33.33%' }}>
                            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                                {sigUrl && <img loading="lazy" decoding="async" src={sigUrl} alt="Signature" style={{ maxHeight: 45, maxWidth: 100 }} />}
                                {stampUrl && <img loading="lazy" decoding="async" src={stampUrl} alt="Stamp" style={{ maxHeight: 45, maxWidth: 45 }} />}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ border: 'none', borderRight: '1px solid #ccc', padding: '0 8px 2px', verticalAlign: 'bottom' }}>
                            <div style={{ borderTop: '1px solid #ccc', margin: '0 2px 4px' }}></div>
                            <div style={{ textAlign: 'center', fontStyle: 'italic', color: '#888', fontSize: 10 }}>(Signature &amp; Company Seal)</div>
                        </td>
                        <td style={{ border: 'none', padding: '0 8px 2px', verticalAlign: 'bottom' }}>
                            <div style={{ borderTop: '1px solid #ccc', margin: '0 2px 4px' }}></div>
                            <div style={{ textAlign: 'center', fontStyle: 'italic', color: '#888', fontSize: 10 }}>Authorized Signatory.</div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className="avoid-break" style={{ position: 'relative', height: 52, overflow: 'hidden', border: '1px solid #ccc', borderTop: 'none' }}>
                <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 24, background: '#0d1f3c', zIndex: 0 }} />

                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, fontSize: 11, fontWeight: 500, color: '#0d1f3c', zIndex: 2 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                        {settings?.contactPhone || '+91 96549 00525'}
                    </div>
                    <div style={{ width: 1, height: 12, background: '#ccc' }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Mail size={12} /> {settings?.contactEmail || 'info@namogangewellness.com'}</div>
                    <div style={{ width: 1, height: 12, background: '#ccc' }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Globe size={12} /> {settings?.contactWebsite || 'www.namogangewellness.com'}</div>
                </div>

                <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 10, fontWeight: 500, zIndex: 2 }}>
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
