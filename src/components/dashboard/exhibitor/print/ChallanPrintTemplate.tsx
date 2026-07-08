import { useState, useLayoutEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
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
}

export default function ChallanPrintTemplate({ challan, company, settings, bankDetails, headerImageUrl, copyLabel = 'ORIGINAL FOR RECIPIENT' }: Props) {
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

    const buyerAddressLine = getFirstAddressValue(
        challan.company_address,
        challan.company_addr,
        challan.companyAddress,
        challan.address,
        challan.company?.address,
        challan.company?.companyAddress,
        challan.company?.company_addr
    );
    const buyerCity = getFirstAddressValue(
        challan.company_city,
        challan.city,
        challan.company?.city,
        challan.company?.district
    );
    const buyerState = getFirstAddressValue(
        challan.company_state,
        challan.state,
        challan.company?.state
    );
    const buyerCountry = getFirstAddressValue(
        challan.company_country,
        challan.country,
        challan.company?.country
    );
    const buyerPincode = getFirstAddressValue(
        challan.company_pincode,
        challan.pincode,
        challan.pin_code,
        challan.postal_code,
        challan.zip_code,
        challan.company?.pincode,
        challan.company?.pinCode,
        challan.company?.pin_code,
        challan.company?.postalCode,
        challan.company?.postal_code,
        challan.company?.zipCode,
        challan.company?.zip_code
    );
    const buyerCompanyAddress = joinAddressParts([
        buyerAddressLine,
        buyerCity,
        buyerPincode,
        buyerState,
        buyerCountry,
    ]);

    const titledBuyerContactPerson = [challan.company?.contact1?.title, challan.company?.contact1?.firstName, challan.company?.contact1?.surname].filter(Boolean).join(' ');
    const rawBuyerContactPerson = getFirstCleanValue(
        challan.contact_person,
        challan.company_contact_person,
        challan.consignee_person,
        titledBuyerContactPerson,
        challan.company?.contactPerson,
        challan.company?.contact_person
    ) || '—';
    const buyerContactPerson = normalizeContactName(rawBuyerContactPerson, titledBuyerContactPerson);

    const buyerContactNo = getFirstCleanValue(
        challan.contact_phone,
        challan.contact_no,
        challan.company_contact_no,
        challan.company_phone,
        challan.mobile,
        challan.phone,
        challan.consignee_phone,
        challan.company?.contact1?.mobile,
        challan.company?.landline,
        challan.company?.mobile
    ) || '—';

    const buyerEmail = getFirstCleanValue(
        challan.company_email,
        challan.contact_email,
        challan.email,
        company?.companyEmail,
        company?.contact1?.email,
        company?.email,
        challan.company?.contact1?.email,
        challan.company?.companyEmail,
        challan.company?.email,
        challan.user?.email
    ) || '-';

    const buyerGstNo = challan.company_gst_no || challan.gst_no || challan.gstin || challan.company?.gstNo || challan.company?.gst_no || '—';

    const bank = bankDetails || {};
    const bankName = bank.bankname || bank.bankName || settings?.bankName || '-';
    const accountName = bank.accountname || bank.accountName || settings?.accountName || companyName;
    const accountNo = bank.accountno || bank.accountNo || settings?.accountNo || '-';
    const ifscCode = bank.ifsccode || bank.ifscCode || settings?.ifscCode || '-';
    const bankBranch = bank.bankbranch || bank.branch || settings?.bankBranch || '-';

    const th: CSSProperties = { border: '1px solid #0d1f3c', background: '#0d1f3c', color: '#fff', padding: '3px 2px', fontSize: 10, lineHeight: 1.1, fontWeight: 700, textAlign: 'center', textTransform: 'uppercase' };
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
                <div style={{ marginBottom: 5, textAlign: 'center' }}>
                    <img src={headerImageUrl} alt="Header" style={{ width: '100%', maxWidth: '100%', display: 'block' }} />
                </div>
            )}
            <div style={{ position: 'relative', textAlign: 'center', marginBottom: 4, paddingTop: 2, paddingBottom: 1 }}>
                <div style={{ fontWeight: 400, fontSize: 18, color: '#0d1f3c', marginBottom: 0 }}>DELIVERY CHALLAN</div>
                <div style={{ position: 'absolute', right: 0, top: 5, fontWeight: 700, fontSize: 10, color: '#0d1f3c', textTransform: 'uppercase', textAlign: 'right', whiteSpace: 'nowrap' }}>{copyLabel}</div>
            </div>
        </>
    );

    const renderDetailsTable = () => (
        <table className="avoid-break" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 5 }}>
            <thead>
                <tr>
                    <th style={{ ...topTh, width: '35%' }}>Buyer's Name &amp; Address</th>
                    <th style={{ ...topTh, width: '34%' }}>Shipment Details</th>
                    <th style={{ ...topTh, width: '31%' }}>Delivery Challan Details</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style={{ ...topTd, overflowWrap: "anywhere", wordBreak: "break-word" }}>
                        <div style={{ ...topInfoLine, fontWeight: 800, textTransform: 'uppercase', marginBottom: 1 }}>{challan.company_name || '-'}</div>
                        <div style={{ ...topInfoLine, whiteSpace: 'pre-wrap' }}>{buyerCompanyAddress}</div>
                        <table style={{ borderCollapse: 'collapse', border: 'none', lineHeight: 1.3, width: '100%', marginTop: 4 }}>
                            <tbody>
                                {[
                                    ['Contact Person', buyerContactPerson],
                                    ['Contact No.', buyerContactNo],
                                    ['Email', buyerEmail],
                                    ['GSTIN/PAN', buyerGstNo],
                                ].map(([label, value]) => (
                                    <tr key={label}>
                                        <td style={labelCell}>{label}</td>
                                        <td style={colonCell}>:</td>
                                        <td style={valueCell}>{value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </td>
                    <td style={{ ...topTd }}>
                        <div style={{ ...topInfoLine, fontWeight: 800, textTransform: 'uppercase', marginBottom: 1 }}>{challan.event_name || '9TH EDITION OF INTERNATIONAL HEALTH & WELLNESS EXPO'}</div>
                        <div style={{ ...topInfoLine, fontSize: 10.5, whiteSpace: 'nowrap' }}>{challan.delivery_address || challan.company_address || '-'}</div>
                        <table style={{ borderCollapse: 'collapse', border: 'none', lineHeight: 1.3, width: '100%', marginTop: 4 }}>
                            <tbody>
                                {[
                                    ['Place of Supply', challan.shipped_to || '-'],
                                    ['State Code', challan.state_code || '-'],
                                    ['GSTIN', companyGst],
                                ].map(([label, value]) => (
                                    <tr key={label}>
                                        <td style={labelCell}>{label}</td>
                                        <td style={colonCell}>:</td>
                                        <td style={valueCell}>{value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </td>
                    <td style={{ ...topTd }}>
                        <table style={{ borderCollapse: 'collapse', border: 'none', lineHeight: 1.3, width: '100%' }}>
                            <tbody>
                                {[
                                    ['Delivery Challan No.', challan.challan_no || '-'],
                                    ['Delivery Challan Date', fmtDateOnly(challan.challan_date)],
                                    ['Delivery Challan Type', challan.challan_type || 'Outward'],
                                    ['Type of Sale', challan.type_of_sale || '-'],
                                    ['PO No.', challan.po_no || '-'],
                                    ['Bilty No.', challan.bilty_no || '-'],
                                    ['Vehicle No.', challan.vehicle_no || '-'],
                                    ['Transporter', challan.transporter_name || '-'],
                                    ['E-Way Bill No.', challan.eway_bill || '-'],
                                    ['Proforma No.', challan.estimate_no || '-'],
                                ].map(([label, value]) => (
                                    <tr key={label}>
                                        <td style={detailLabelCell}>{label}</td>
                                        <td style={detailColonCell}>:</td>
                                        <td style={{ ...detailValueCell, textAlign: 'right', whiteSpace: 'nowrap' }}>{value}</td>
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
                            <td style={{ ...td, textAlign: 'center' }}>Nos.</td>
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
                        <td style={{ ...td, fontWeight: 800, width: '16%', background: '#fafafa' }}>Special Remark:</td>
                        <td style={{ ...td, height: 24 }}>{challan.remarks || '-'}</td>
                    </tr>
                    <tr>
                        <td style={{ ...td, fontWeight: 800, background: '#fafafa' }}>Terms and Conditions:</td>
                        <td style={{ ...td }}>{challan.terms || 'Goods/material received in good condition. All disputes are subject to Delhi jurisdiction.'}</td>
                    </tr>
                </tbody>
            </table>

            <table className="avoid-break" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 5 }}>
                <thead>
                    <tr>
                        <th style={{ ...th, width: '33%' }}>NGWPL Bank Details</th>
                        <th style={{ ...th, width: '33%' }}>Client Signature</th>
                        <th style={{ ...th, width: '34%' }}>For {companyName}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={td}>
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
                                            <td style={{ ...valueCell, whiteSpace: 'nowrap' }}>{value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </td>
                        <td style={{ ...td, textAlign: 'center', verticalAlign: 'bottom' }}>
                            <div style={{ height: 60 }}></div>
                            <div style={{ borderTop: '1px solid #ccc', paddingTop: 4, fontWeight: 700, width: '60%', margin: '0 auto' }}>Client Signature</div>
                        </td>
                        <td style={{ ...td, textAlign: 'center', verticalAlign: 'bottom' }}>
                            {(settings?.companyStamp || settings?.authorizedSignature) ? (
                                <div style={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, overflow: 'hidden' }}>
                                    {settings?.authorizedSignature && <img src={settings.authorizedSignature} alt="" style={{ maxHeight: 60, maxWidth: 130, objectFit: 'contain' }} />}
                                    {settings?.companyStamp && <img src={settings.companyStamp} alt="" style={{ maxHeight: 60, maxWidth: 60, objectFit: 'contain' }} />}
                                </div>
                            ) : (
                                <div style={{ height: 60 }}></div>
                            )}
                            <div style={{ borderTop: '1px solid #ccc', paddingTop: 4, fontWeight: 700, width: '60%', margin: '0 auto' }}>Authorised Signatory</div>
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
