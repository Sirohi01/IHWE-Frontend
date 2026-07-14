import { useState, useLayoutEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { Landmark, SquarePen, Mail, Globe } from 'lucide-react';
import { getFirstCleanValue, normalizeContactName, getFirstAddressValue, joinAddressParts, formatSize, formatArea } from './templateHelpers';
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
    const words = convert(intPart).trim();
    return 'Rupees ' + words + ' Only.';
}
const FIRST_PAGE_ITEM_ROWS = 10;
const OTHER_PAGE_ITEM_ROWS = 16;
const MIN_PADDED_ROWS = 5;

interface Props {
    challan: any;
    company?: any;
    settings?: any;
    bankDetails?: any;
    headerImageUrl?: string | null;
    copyLabel?: string;
    estimateTerms?: any;
}

export default function ChallanPrintTemplate({ challan, company, settings, bankDetails, headerImageUrl, copyLabel = 'ORIGINAL COPY', estimateTerms }: Props) {
    const fmtNum = (value: any, decimals = 0) => {
        const number = Number(value);
        if (!Number.isFinite(number)) return decimals ? '0.00' : '0';
        return number.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    };

    const fmtDateOnly = (value: any) => {
        if (!value) return '-';
        const d = new Date(value);
        if (isNaN(d.getTime())) return '-';
        return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' });
    };

    const items = challan.items || [];
    const getGstRate = (item: any) => {
        const directRate = Number(item.gstRate ?? item.gst_per ?? item.gstPct);
        if (Number.isFinite(directRate) && directRate) return directRate;
        const igstRate = Number(item.igst_per);
        if (Number.isFinite(igstRate) && igstRate) return igstRate;
        const cgstRate = Number(item.cgst_per);
        return Number.isFinite(cgstRate) && cgstRate ? cgstRate * 2 : 0;
    };
    const lineValue = (item: any, key: string): number => {
        const qty = Number(item.qty || 0);
        const sourceQty = Number(item.sourceQty || item.piQty || item.originalQty || 0);
        const ratio = sourceQty > 0 ? qty / sourceQty : 1;

        const rateAmount = Number(item.rate || 0) * qty;
        const amount = Number(item.amount || rateAmount) * ratio;

        // discount stored in DB is the absolute discount amount for the full sourceQty
        const discountAmt = Number(item.discount ?? item.discountAmount ?? item.disc ?? 0) * ratio;
        const computedTaxable = amount - discountAmt;

        const gstRate = parseFloat(item.gstRate) || parseFloat(item.gst_per) || 18;
        const computedGstAmount = (computedTaxable * gstRate) / 100;

        if (key === 'amount') return amount;
        if (key === 'discount') return discountAmt;
        if (key === 'taxable') return computedTaxable;
        if (key === 'gstAmount') return computedGstAmount;

        return 0;
    };
    const totalTaxable = items.reduce((sum: number, it: any) => sum + lineValue(it, 'taxable'), 0);
    const totalGst = items.reduce((sum: number, it: any) => sum + lineValue(it, 'gstAmount'), 0);
    const grandTotal = totalTaxable + totalGst;
    const hsnRows: any[] = Object.values(items.reduce((acc: any, item: any) => {
        const hsn = item.hsn || '-';
        if (!acc[hsn]) acc[hsn] = { hsn, qty: 0, taxable: 0, gstRate: getGstRate(item), gst: 0 };
        acc[hsn].qty += Number(item.qty || 0);
        acc[hsn].taxable += lineValue(item, 'taxable');
        acc[hsn].gst += lineValue(item, 'gstAmount');
        return acc;
    }, {}));

    const companyName = settings?.companyName || 'Namo Gange Wellness Pvt. Ltd.';
    const companyGst = settings?.companyGst || settings?.companyGstin || '07AAFCN9238F1Z6';

    const c1 = company?.contacts?.[0] || company?.contact1 || {};

    const buyerCompanyName = challan.company_name || company?.companyName || company?.exhibitorName || '—';
    const titledBuyerContactPerson = [c1.title, c1.firstName, c1.surname].filter(Boolean).join(' ');
    const rawBuyerContactPerson = getFirstCleanValue(
        challan.contact_person,
        challan.company_contact_person,
        challan.consignee_person,
        titledBuyerContactPerson,
        company?.contactPerson,
        company?.contact_person
    ) || '—';
    const buyerContactPerson = normalizeContactName(rawBuyerContactPerson, titledBuyerContactPerson);

    const buyerContactNo = getFirstCleanValue(
        challan.contact_no,
        challan.contact_phone,
        challan.company_contact_no,
        challan.company_phone,
        challan.mobile,
        challan.phone,
        challan.consignee_phone,
        c1.mobile,
        company?.landline,
        company?.mobile
    ) || '—';

    const buyerEmail = getFirstCleanValue(
        challan.company_email,
        challan.contact_email,
        challan.email,
        c1.email,
        company?.companyEmail,
        company?.email
    ) || '—';

    const buyerAddressLine = getFirstAddressValue(
        challan.company_addr,
        challan.company_address,
        challan.address,
        company?.address,
        company?.companyAddress,
        company?.company_addr
    );
    const buyerCity = getFirstAddressValue(
        challan.company_city,
        challan.city,
        company?.city,
        company?.district
    );
    const buyerState = getFirstAddressValue(
        challan.company_state,
        challan.state,
        company?.state
    );
    const buyerCountry = getFirstAddressValue(
        challan.company_country,
        challan.country,
        company?.country
    );
    const buyerPincode = getFirstAddressValue(
        challan.company_pincode,
        challan.pincode,
        challan.pin_code,
        challan.postal_code,
        challan.zip_code,
        company?.pincode,
        company?.pinCode,
        company?.pin_code,
        company?.postalCode,
        company?.postal_code,
        company?.zipCode,
        company?.zip_code
    );
    const buyerCompanyAddress = joinAddressParts([
        buyerAddressLine,
        buyerCity,
        buyerPincode,
        buyerState,
        buyerCountry,
    ]);

    const buyerGstNo = challan.company_gst_no || challan.gst_no || challan.gstin || company?.gstNo || company?.gst_no || '—';

    const CHALLAN_EVENT_NAME = '9th Edition of International Health & Wellness Expo (IHWE Global Edition)';
    const CHALLAN_PLACE_OF_SUPPLY = 'Hall Nos. 8, 9 & 10, Pragati Maidan, New Delhi - 110001, India';
    const CHALLAN_EVENT_STATE = 'Delhi';
    const CHALLAN_PLACE_OF_SUPPLY_WITH_CODE = 'Delhi (07)';
    const CHALLAN_EVENT_GST_NO = '07AAFCN9238F1Z6';

    const eventName = challan.event_name || challan.consignee_name || CHALLAN_EVENT_NAME;
    const eventPlaceOfSupply = joinAddressParts([
        (challan.event_place_of_supply || challan.delivery_address || challan.consignee_addr || CHALLAN_PLACE_OF_SUPPLY)
            .replace(/,\s*Bharat$/i, ''),
        CHALLAN_EVENT_STATE,
        'India',
    ]);
    const shipmentAddress = eventPlaceOfSupply;
    const eventGstNo = challan.event_gst_no || CHALLAN_EVENT_GST_NO;

    const bank = bankDetails || {};
    const bankName = bank.bankname || bank.bankName || settings?.bankName || '-';
    const accountName = bank.accountname || bank.accountName || settings?.accountName || companyName;
    const accountNo = bank.accountno || bank.accountNo || settings?.accountNo || '-';
    const ifscCode = bank.ifsccode || bank.ifscCode || settings?.ifscCode || '-';
    const bankBranch = bank.bankbranch || bank.branch || settings?.bankBranch || '-';

    const th: CSSProperties = { border: '1px solid #0d1f3c', background: '#0d1f3c', color: '#fff', padding: '3px 2px', fontSize: 10, lineHeight: 1.1, fontWeight: 700, textAlign: 'center', textTransform: 'uppercase', whiteSpace: 'nowrap' };
    const td: CSSProperties = { border: '1px solid #ccc', padding: '6px', fontSize: 11, lineHeight: 1.2, verticalAlign: 'top' };
    const topTh = { ...th };
    const topTd = { ...td, padding: '4px 7px' };
    const topInfoLine: CSSProperties = { margin: 0, padding: 0, fontSize: 11, lineHeight: 1.2 };
    const labelCell: CSSProperties = { border: 'none', padding: '1px 3px 1px 0', fontSize: 11, fontWeight: 700, width: '1%', whiteSpace: 'nowrap', lineHeight: 1.3 };
    const colonCell: CSSProperties = { border: 'none', padding: '1px 3px 1px 0', fontSize: 11, fontWeight: 700, width: '1%', lineHeight: 1.3 };
    const valueCell: CSSProperties = { border: 'none', padding: '1px 0', fontSize: 11, lineHeight: 1.3 };
    const detailLabelCell = { ...labelCell, fontSize: 10.5 };
    const detailColonCell = { ...colonCell, fontSize: 10.5 };
    const detailValueCell = { ...valueCell, fontSize: 10.5 };
    const mutedCell: CSSProperties = { ...td, background: '#f8fafc', fontWeight: 700, textTransform: 'uppercase' };
    const isIgst = String(challan.type_of_sale || '').toLowerCase().includes('inter');

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
                <div className="invoice-header-image" style={{ marginBottom: 0, textAlign: 'center' }}>
                    <img loading="lazy" decoding="async" src={headerImageUrl} alt="Header" style={{ width: '100%', maxWidth: '100%', display: 'block' }} />
                </div>
            )}
            <div className="invoice-title-bar" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 22, marginBottom: 0, paddingTop: 10, paddingBottom: 4, color: '#0d1f3c', textTransform: 'uppercase' }}>
                <div style={{ fontWeight: 500, fontSize: 18, lineHeight: 1, textAlign: 'center' }}>DELIVERY CHALLAN</div>
                <div className="invoice-copy-label" style={{ position: 'absolute', right: 0, bottom: 3, fontWeight: 600, fontSize: 11, lineHeight: 1, paddingRight: 2, whiteSpace: 'nowrap', textAlign: 'right', letterSpacing: '-0.35px' }}>{copyLabel}</div>
            </div>
        </>
    );

    const renderDetailsTable = () => (
        <table className="avoid-break" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 5 }}>
            <thead>
                <tr>
                    <th style={{ background: '#0d1f3c', color: '#fff', border: '1px solid #0d1f3c', padding: '3px 2px', width: '38%', textAlign: 'center', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' }}>Buyer's Name &amp; Address</th>
                    <th style={{ background: '#0d1f3c', color: '#fff', border: '1px solid #0d1f3c', padding: '3px 2px', width: '38%', textAlign: 'center', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' }}>Shipment Details</th>
                    <th style={{ background: '#0d1f3c', color: '#fff', border: '1px solid #0d1f3c', padding: '3px 2px', width: '24%', textAlign: 'center', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' }}>Challan Details</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style={{ border: '1px solid #ccc', padding: '4px 8px', verticalAlign: 'top', fontSize: 11, lineHeight: '1.2' }}>
                        <div style={{ fontWeight: 700, textTransform: 'uppercase' }}>{buyerCompanyName}</div>
                        <div style={{ marginTop: 2, textTransform: 'capitalize' }}>{buyerCompanyAddress || '—'}</div>
                        <table style={{ borderCollapse: 'collapse', border: 'none', lineHeight: '1.3', width: '100%', marginTop: 4 }}>
                            <tbody>
                                <tr>
                                    <td style={{ whiteSpace: 'nowrap', padding: '1px 4px 1px 0', border: 'none', width: '1%' }}>Contact Person</td>
                                    <td style={{ border: 'none', padding: '1px 4px 1px 0', width: '1%' }}>:</td>
                                    <td style={{ border: 'none', padding: '1px 0', textTransform: 'capitalize' }}>{buyerContactPerson}</td>
                                </tr>
                                <tr>
                                    <td style={{ whiteSpace: 'nowrap', padding: '1px 4px 1px 0', border: 'none', width: '1%' }}>Contact No.</td>
                                    <td style={{ border: 'none', padding: '1px 4px 1px 0', width: '1%' }}>:</td>
                                    <td style={{ border: 'none', padding: '1px 0' }}>{buyerContactNo}</td>
                                </tr>
                                <tr>
                                    <td style={{ whiteSpace: 'nowrap', padding: '1px 4px 1px 0', border: 'none', width: '1%' }}>Email</td>
                                    <td style={{ border: 'none', padding: '1px 4px 1px 0', width: '1%' }}>:</td>
                                    <td style={{ border: 'none', padding: '1px 0' }}>{buyerEmail}</td>
                                </tr>
                                {buyerGstNo && buyerGstNo !== '—' && (
                                    <tr>
                                        <td style={{ whiteSpace: 'nowrap', padding: '1px 4px 1px 0', border: 'none', width: '1%' }}>GSTIN/PAN</td>
                                        <td style={{ border: 'none', padding: '1px 4px 1px 0', width: '1%' }}>:</td>
                                        <td style={{ border: 'none', padding: '1px 0' }}>{buyerGstNo}</td>
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
                                    <td style={{ border: 'none', padding: '1px 0' }}>{CHALLAN_PLACE_OF_SUPPLY_WITH_CODE}</td>
                                </tr>
                                <tr>
                                    <td style={{ whiteSpace: 'nowrap', padding: '1px 4px 1px 0', border: 'none', width: '1%' }}>Contact Person</td>
                                    <td style={{ border: 'none', padding: '1px 4px 1px 0', width: '1%' }}>:</td>
                                    <td style={{ border: 'none', padding: '1px 0', textTransform: 'capitalize' }}>{buyerContactPerson}</td>
                                </tr>
                                <tr>
                                    <td style={{ whiteSpace: 'nowrap', padding: '1px 4px 1px 0', border: 'none', width: '1%' }}>Contact No.</td>
                                    <td style={{ border: 'none', padding: '1px 4px 1px 0', width: '1%' }}>:</td>
                                    <td style={{ border: 'none', padding: '1px 0' }}>{buyerContactNo}</td>
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
                                {[
                                    ['Challan No.', challan.challan_no || '-'],
                                    ['Challan Date', fmtDateOnly(challan.challan_date)],
                                    ['Challan Type', challan.challan_type || 'Outward'],
                                    ['Sale Type', challan.type_of_sale || '-'],
                                    ['PO No.', challan.po_no || '-'],
                                    ['Bilty No.', challan.bilty_no || '-'],
                                    ['Vehicle No.', challan.vehicle_no || '-'],
                                    ['Transporter', challan.transporter_name || '-'],
                                    ['E-Way Bill', challan.eway_bill || '-'],
                                    ['Proforma No.', challan.estimate_no || '-'],
                                ].map(([label, value]) => (
                                    <tr key={label}>
                                        <td style={{ fontWeight: 'bold', whiteSpace: 'nowrap', padding: '1px 4px 1px 0', border: 'none', width: '1%' }}>{label}</td>
                                        <td style={{ fontWeight: 'bold', border: 'none', padding: '1px 4px 1px 0', width: '1%' }}>:</td>
                                        <td style={{ border: 'none', padding: '1px 0', textAlign: 'right', whiteSpace: 'nowrap' }}>{value}</td>
                                    </tr>
                                ))}
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
                <tr>
                    {[
                        ['S.No.', '4%'],
                        ['Item Description', '38%'],
                        ['HSN Code', '8%'],
                        ['Qty.', '5%'],
                        ['Size', '6%'],
                        ['Area', '6%'],
                        ['Unit', '5%'],
                        ['Rate', '7%'],
                        ['Discount', '7%'],
                        ['Amount', '8%'],
                    ].map(([label, width]) => <th key={label} style={{ ...th, width }}>{label}</th>)}
                </tr>
            </thead>
            <tbody>
                {chunk.map((item: any, i: number) => {
                    const index = startIndex + i;
                    const amt = lineValue(item, 'amount');
                    const taxable = lineValue(item, 'taxable');
                    const discAmt = amt - taxable;
                    const discPct = amt > 0 ? (discAmt / amt) * 100 : 0;
                    return (
                        <tr key={`${item.sourceItemKey}-${index}`}>
                            <td style={{ ...td, textAlign: 'center' }}>{index + 1}</td>
                            <td style={{ ...td }}>
                                <div style={{ fontWeight: 800, textTransform: 'uppercase' }}>{challan.event_name || '9TH EDITION OF INTERNATIONAL HEALTH & WELLNESS EXPO'}</div>
                                <div style={{ whiteSpace: 'pre-wrap' }}>{item.description || '-'}</div>
                                {item.remarks && <div style={{ whiteSpace: 'pre-wrap' }}>{item.remarks}</div>}
                            </td>
                            <td style={{ ...td, textAlign: 'center' }}>{item.hsn || '-'}</td>
                            <td style={{ ...td, textAlign: 'center' }}>{fmtNum(item.qty)}</td>
                            <td style={{ ...td, textAlign: 'center', whiteSpace: 'nowrap' }}>{formatSize(item.area || item.stall_area)}</td>
                            <td style={{ ...td, textAlign: 'center', whiteSpace: 'nowrap' }}>{formatArea(item.size || item.stall_size)}</td>
                            <td style={{ ...td, textAlign: 'center' }}>Nos</td>
                            <td style={{ ...td, textAlign: 'right' }}>{fmtNum(item.rate || 0)}</td>
                            <td style={{ ...td, textAlign: 'center' }}>{Math.round(discPct)}%</td>
                            <td style={{ ...td, textAlign: 'right', fontWeight: 700 }}>{fmtNum(taxable)}</td>
                        </tr>
                    );
                })}
                {showSubtotal && Array.from({ length: Math.max(0, MIN_PADDED_ROWS - chunk.length) }).map((_, row) => (
                    <tr key={`blank-${row}`} style={{ height: 20 }}>
                        {Array.from({ length: 10 }).map((__, cell) => <td key={cell} style={td}></td>)}
                    </tr>
                ))}
                {showSubtotal && (
                    <tr>
                        <td colSpan={9} style={{ ...mutedCell, textAlign: 'right' }}>Taxable Value</td>
                        <td style={{ ...td, textAlign: 'right', fontWeight: 800 }}>{fmtNum(totalTaxable)}</td>
                    </tr>
                )}
            </tbody>
        </table>
    );

    const renderClosingSections = () => (
        <>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 5 }}>
                <thead>
                    <tr>
                        {['S.No.', 'HSN/SAC No.', 'Item Value', 'Qty.', 'CGST(%)', 'Amount', 'SGST(%)', 'Amount', 'IGST(%)', 'Amount', 'Total Tax'].map((head) => (
                            <th key={head} style={th}>{head}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {hsnRows.map((row: any, index: number) => {
                        const halfRate = row.gstRate / 2;
                        const halfGst = row.gst / 2;
                        return (
                            <tr key={row.hsn}>
                                <td style={{ ...td, textAlign: 'center' }}>{index + 1}</td>
                                <td style={{ ...td, textAlign: 'center' }}>{row.hsn}</td>
                                <td style={{ ...td, textAlign: 'right' }}>{fmtNum(row.taxable)}</td>
                                <td style={{ ...td, textAlign: 'center' }}>{fmtNum(row.qty)}</td>
                                <td style={{ ...td, textAlign: 'center' }}>{isIgst ? '-' : `${fmtNum(halfRate)}%`}</td>
                                <td style={{ ...td, textAlign: 'right' }}>{isIgst ? '-' : fmtNum(halfGst)}</td>
                                <td style={{ ...td, textAlign: 'center' }}>{isIgst ? '-' : `${fmtNum(halfRate)}%`}</td>
                                <td style={{ ...td, textAlign: 'right' }}>{isIgst ? '-' : fmtNum(halfGst)}</td>
                                <td style={{ ...td, textAlign: 'center' }}>{isIgst ? `${fmtNum(row.gstRate)}%` : '-'}</td>
                                <td style={{ ...td, textAlign: 'right' }}>{isIgst ? fmtNum(row.gst) : '-'}</td>
                                <td style={{ ...td, textAlign: 'right', fontWeight: 700 }}>{fmtNum(row.gst)}</td>
                            </tr>
                        );
                    })}
                    <tr>
                        <td colSpan={3} style={mutedCell}>GST Amount in Words</td>
                        <td colSpan={6} style={{ ...td, textTransform: 'none' }}>{toWords(Math.round(totalGst))}</td>
                        <td style={mutedCell}>Total GST Amount</td>
                        <td style={{ ...td, textAlign: 'right', fontWeight: 800 }}>{fmtNum(totalGst)}</td>
                    </tr>
                    <tr style={{ height: 8 }}>
                        {Array(11).fill(0).map((_, cell) => <td key={cell} style={{ border: 'none', padding: 0 }}></td>)}
                    </tr>
                    <tr>
                        <td colSpan={3} style={mutedCell}>Amount in Words (INR)</td>
                        <td colSpan={6} style={{ ...td }}>{toWords(Math.round(grandTotal))}</td>
                        <td style={mutedCell}>Total Value</td>
                        <td style={{ ...td, textAlign: 'right', fontWeight: 800 }}>{fmtNum(grandTotal)}</td>
                    </tr>
                </tbody>
            </table>

            <table className="avoid-break" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 5 }}>
                <tbody>
                    <tr>
                        <td style={{ ...td, width: '50%', verticalAlign: 'top', background: '#fafafa' }}>
                            <div style={{ fontWeight: 800, marginBottom: 6, background: '#F8FAFC', borderBottom: '1px solid #ccc', padding: '4px 8px', margin: '-6px -8px 6px' }}>Terms and Conditions:</div>
                            <div style={{ marginLeft: 4, whiteSpace: 'pre-wrap' }}>
                                {estimateTerms?.termsAndConditions?.length ? (
                                    estimateTerms.termsAndConditions.map((t: string, i: number) => <div key={i}>{i + 1}. {t}</div>)
                                ) : (
                                    <>
                                        <div>1. Goods once delivered will not be taken back.</div>
                                        <div>2. Please check the goods in presence of our delivery executive.</div>
                                        <div>3. Any discrepancy should be reported within 24 hours.</div>
                                        <div>4. Goods are delivered in good condition.</div>
                                        <div>5. Subject to Delhi Jurisdiction only.</div>
                                    </>
                                )}
                            </div>
                        </td>
                        <td style={{ ...td, width: '50%', verticalAlign: 'top', background: '#fafafa' }}>
                            <div style={{ fontWeight: 800, marginBottom: 4 }}>Delivery Notes:</div>
                            <div style={{ marginLeft: 4, whiteSpace: 'pre-wrap' }}>
                                {estimateTerms?.deliveryNotes?.length ? (
                                    estimateTerms.deliveryNotes.map((t: string, i: number) => <div key={i}>{i + 1}. {t}</div>)
                                ) : (
                                    <>
                                        <div>1. Goods delivered as per Purchase Order.</div>
                                        <div>2. For any queries, please contact our office.</div>
                                    </>
                                )}
                            </div>
                            {(estimateTerms?.specialRemark || challan.remarks) && (
                                <>
                                    <div style={{ fontWeight: 800, marginTop: 8, marginBottom: 4 }}>Special Remark:</div>
                                    <div style={{ marginLeft: 4, whiteSpace: 'pre-wrap' }}>{estimateTerms?.specialRemark || challan.remarks}</div>
                                </>
                            )}
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
                            <table style={{ borderCollapse: 'collapse', border: 'none', lineHeight: 1.3, width: 'auto' }}>
                                <tbody>
                                    {[
                                        ['Bank Name', bankName],
                                        ['Account Name', accountName],
                                        ['Account No.', accountNo],
                                        ['IFSC Code', ifscCode],
                                        ['Branch', bankBranch],
                                    ].map(([label, value]) => (
                                        <tr key={label}>
                                            <td style={labelCell}>{label}</td>
                                            <td style={colonCell}>:</td>
                                            <td style={{ ...valueCell, wordBreak: 'break-word', whiteSpace: 'normal' }}>{value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </td>
                        <td style={{ border: 'none', borderRight: '1px solid #ccc', padding: '2px 8px 8px', verticalAlign: 'top', textAlign: 'center', width: '33.33%' }}>
                            <span style={{ fontSize: 9, whiteSpace: 'nowrap' }}>Received the above goods / services in good condition.</span>
                        </td>
                        <td style={{ border: 'none', padding: '8px', verticalAlign: 'top', textAlign: 'center', width: '33.33%' }}>
                            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                                {settings?.authorizedSignature && <img loading="lazy" decoding="async" src={settings.authorizedSignature} alt="Signature" style={{ maxHeight: 45, maxWidth: 100, objectFit: 'contain' }} />}
                                {settings?.companyStamp && <img loading="lazy" decoding="async" src={settings.companyStamp} alt="Stamp" style={{ maxHeight: 45, maxWidth: 45, objectFit: 'contain' }} />}
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
                        {challan.status === 'cancelled' && (
                            <div style={{ position: 'absolute', left: '50%', top: '50%', zIndex: 10, transform: 'translate(-50%, -50%) rotate(-12deg)', border: '5px solid rgba(220, 38, 38, 0.7)', padding: '8px 28px', fontSize: 36, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 4, color: 'rgba(220, 38, 38, 0.7)', pointerEvents: 'none' }}>
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
