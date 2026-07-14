import { SquarePen, Phone, Mail, Globe } from 'lucide-react';
import { formatSize, formatArea } from './templateHelpers';
import { SERVER_URL } from '@/lib/api';

const NAVY = '#0d1f3c';
const BAND_HEIGHT = 22;
const PLACE_OF_SUPPLY = 'Delhi (07)';
const EVENT_NAME = '9th Edition of International Health & Wellness Expo (IHWE Global Edition)';

interface Props {
    document: any;
    company?: any;
    settings?: any;
    headerImageUrl?: string | null;
}

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
    return 'Rupees ' + convert(Math.round(n)).trim() + ' Only.';
}

const fmtNum = (n: any) => Math.round(Number(n || 0)).toLocaleString('en-IN');
const fmtDate = (v: any) => {
    if (!v) return '—';
    const d = new Date(v);
    return Number.isNaN(d.getTime()) ? '—' : d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

// Safety net for records saved while preparedBy/reviewedBy were briefly stored as a
// raw JSON string instead of a real object (fixed server-side, but old records may
// still have the string form until they're re-saved).
const mediaUrl = (value?: string | null) => {
    if (!value) return null;
    if (/^https?:\/\//i.test(value)) return value;
    return `${SERVER_URL}${value.startsWith('/') ? '' : '/'}${value}`;
};

const asNamedPerson = (value: any, fallbackName = '', fallbackDesignation = ''): { name?: string; designation?: string; signatureImage?: string } => {
    if (value && typeof value === 'object') {
        return {
            name: value.name || fallbackName,
            designation: value.designation || fallbackDesignation,
            signatureImage: value.signatureImage || '',
        };
    }
    if (typeof value === 'string' && value.trim()) {
        try {
            const parsed = JSON.parse(value);
            return {
                name: parsed?.name || fallbackName,
                designation: parsed?.designation || fallbackDesignation,
                signatureImage: parsed?.signatureImage || '',
            };
        } catch {
            return { name: value, designation: fallbackDesignation };
        }
    }
    return { name: fallbackName, designation: fallbackDesignation };
};

const DetailRows = ({ rows }: { rows: [string, any][] }) => (
    <table style={{ borderCollapse: 'collapse', border: 'none', lineHeight: 1.3, width: '100%' }}>
        <tbody>
            {rows.map(([label, value]) => (
                <tr key={label}>
                    <td style={{ fontWeight: 'bold', whiteSpace: 'nowrap', padding: '1px 4px 1px 0', border: 'none' }}>{label}</td>
                    <td style={{ fontWeight: 'bold', border: 'none', padding: '1px 4px 1px 0' }}>:</td>
                    <td style={{ border: 'none', padding: '1px 0' }}>{value || '—'}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

const CompactDetailRows = ({ rows }: { rows: [string, any][] }) => (
    <table style={{ borderCollapse: 'collapse', border: 'none', lineHeight: 1.3, width: 'auto' }}>
        <tbody>
            {rows.map(([label, value]) => (
                <tr key={label}>
                    <td style={{ fontWeight: 'bold', whiteSpace: 'nowrap', padding: '1px 4px 1px 0', border: 'none' }}>{label}</td>
                    <td style={{ fontWeight: 'bold', border: 'none', padding: '1px 4px 1px 0' }}>:</td>
                    <td style={{ border: 'none', padding: '1px 0', wordBreak: 'break-word' }}>{value || '—'}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

const InlineSignatoryDetails = ({ name, designation, date }: { name?: string; designation?: string; date: any }) => (
    <div style={{ lineHeight: 1.1, textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {[name, designation, fmtDate(date)].filter(Boolean).join(' / ') || '—'}
    </div>
);

const SignatoryCell = ({ name, designation, date, signatureUrl }: { name?: string; designation?: string; date: any; signatureUrl?: string | null }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <InlineSignatoryDetails name={name} designation={designation} date={date} />
        {signatureUrl && (
            <img
                loading="lazy"
                decoding="async"
                src={signatureUrl}
                alt=""
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                style={{ maxHeight: 30, maxWidth: 95, objectFit: 'contain', alignSelf: 'center' }}
            />
        )}
    </div>
);

const SectionHeader = ({ label }: { icon?: any; label: string }) => (
    <div style={{ boxSizing: 'border-box', background: NAVY, color: '#fff', fontWeight: 'bold', fontSize: 10, textTransform: 'uppercase', padding: '3px 2px', textAlign: 'center', lineHeight: 'normal' }}>
        {label}
    </div>
);

export default function CreditNotePrintTemplate({ document, company, settings, headerImageUrl }: Props) {
    const items = (document?.items || []).map((it: any) => {
        const qty = it.quantity || 1;
        const rate = it.rate != null ? it.rate : it.cn_amount;
        const grossAmount = rate * qty;
        // taxableValue is the post-discount amount (what the "Total" column of the item
        // table shows, matching the Invoice printout); discountPct is derived from it
        // when not stored directly.
        const taxableValue = it.taxableValue != null ? it.taxableValue : grossAmount;
        const discountPct = it.discountPct != null ? it.discountPct : (grossAmount > 0 ? ((grossAmount - taxableValue) / grossAmount) * 100 : 0);
        const gstPct = it.gstPct || '18%';
        // Older credit notes were saved before per-item GST tracking existed — fall back to
        // computing it from the item's own rate so the printout never shows a hard ₹0.
        const gstAmount = it.gstAmount || (taxableValue * (parseFloat(gstPct) / 100));
        return {
            description: it.item,
            hsn: it.hsn || '',
            qty,
            unit: 'Nos',
            rate,
            amount: taxableValue,
            area: it.area,
            size: it.size,
            discountPct,
            gstAmount,
        };
    });

    const totalTaxable = document?.taxableAmount || items.reduce((s: number, it: any) => s + (Number(it.amount) || 0), 0);
    const totalGstAmount = document?.gstAmount || items.reduce((s: number, it: any) => s + (Number(it.gstAmount) || 0), 0);
    const grandTotal = document?.totalAmount || (totalTaxable + totalGstAmount);
    const tdsAmount = Number(document?.tdsAmount || 0);
    const netAdjustment = grandTotal - tdsAmount;
    const isIgst = false;

    const c1 = company?.contacts?.[0] || company?.contact1 || {};
    const companyName = document?.clientName || company?.companyName || company?.exhibitorName || '—';
    const address = [company?.address, company?.city, company?.pincode ? `- ${company.pincode}` : '', company?.state, company?.country]
        .filter(Boolean).join(', ');
    const contactName = c1.name || [c1.title, c1.firstName, c1.surname || c1.lastName].filter(Boolean).join(' ');
    const contactNo = c1.mobile || c1.whatsapp || company?.landline || company?.landlineNo;
    const contactEmail = c1.email || company?.email || company?.companyEmail;
    const gstin = document?.gstin || company?.gstNumber || company?.gstNo || company?.gstin || company?.panNo;

    const sigUrl = settings?.authorizedSignature || null;
    const stampUrl = settings?.companyStamp || null;
    const preparedBy = asNamedPerson(document?.preparedBy, document?.preparedByName || document?.prepared_by || '', document?.preparedByDesignation || document?.prepared_by_designation || '');
    const reviewedBy = asNamedPerson(document?.reviewedBy, document?.reviewedByName || document?.reviewed_by || document?.approvedBy || '', document?.reviewedByDesignation || document?.reviewed_by_designation || '');

    return (
        <div className="bg-white border border-slate-300 p-6 text-[11px] font-sans text-black credit-note-print" style={{ fontFamily: 'Calibri, Arial, sans-serif', fontSize: 11, lineHeight: 'normal', maxWidth: '1000px', margin: '0 auto 24px' }}>
            {headerImageUrl && (
                <div className="invoice-header-image" style={{ marginBottom: 0, textAlign: 'center' }}>
                    <img loading="lazy" decoding="async" src={headerImageUrl} alt="Header" style={{ width: '100%', maxWidth: '100%', display: 'block' }} />
                </div>
            )}

            <div
                className="invoice-title-bar"
                style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 22, marginBottom: 0, paddingTop: 10, paddingBottom: 4, color: NAVY, textTransform: 'uppercase' }}
            >
                <div style={{ fontWeight: 500, fontSize: 18, lineHeight: 1, textAlign: 'center' }}>CREDIT NOTE</div>
                <div className="invoice-copy-label" style={{ position: 'absolute', right: 0, bottom: 3, fontWeight: 600, fontSize: 11, lineHeight: 1, paddingRight: 2, whiteSpace: 'nowrap', textAlign: 'right', letterSpacing: '-0.35px' }}>ORIGINAL COPY</div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 5 }}>
                <colgroup><col style={{ width: '30%' }} /><col style={{ width: '30%' }} /><col style={{ width: '40%' }} /></colgroup>
                <thead>
                    <tr>
                        <th style={{ background: NAVY, color: '#fff', border: `1px solid ${NAVY}`, padding: 0, width: '30%', textAlign: 'center', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' }}><SectionHeader icon={SquarePen} label="Billed To (Customer Details)" /></th>
                        <th style={{ background: NAVY, color: '#fff', border: `1px solid ${NAVY}`, padding: 0, width: '30%', textAlign: 'center', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' }}><SectionHeader icon={SquarePen} label="Credit Note Details" /></th>
                        <th style={{ background: NAVY, color: '#fff', border: `1px solid ${NAVY}`, padding: 0, width: '40%', textAlign: 'center', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' }}><SectionHeader icon={SquarePen} label="Reason for Credit Note" /></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ border: '1px solid #ccc', padding: '4px 8px', verticalAlign: 'top', fontSize: 11, lineHeight: '1.2' }}>
                            <div style={{ fontWeight: 700, textTransform: 'uppercase' }}>{companyName}</div>
                            <div style={{ marginTop: 2, textTransform: 'capitalize' }}>{address || '—'}</div>
                            <div style={{ marginTop: 4 }}>
                                <DetailRows rows={[
                                ['Contact Person', contactName],
                                ['Contact No.', contactNo],
                                ['Email', contactEmail],
                                ['GSTIN/PAN', gstin],
                                ]} />
                            </div>
                        </td>
                        <td style={{ border: '1px solid #ccc', padding: '4px 6px', verticalAlign: 'top', fontSize: 11, lineHeight: '1.2' }}>
                            <table style={{ borderCollapse: 'collapse', border: 'none', lineHeight: 1.2, width: '100%' }}>
                                <tbody>
                                    {[
                                        ['Against Invoice No.', document?.reference_invoice_no],
                                        ['Against Invoice Date', fmtDate(document?.invoice_date)],
                                        ['Adjustment Type', document?.adjustment_type || 'Against Invoice'],
                                        ['Credit Note No.', document?.create_note_no],
                                        ['Credit Note Date', fmtDate(document?.credit_note_date)],
                                        ['Original Invoice No.', document?.reference_invoice_no],
                                        ['Original Invoice Date', fmtDate(document?.invoice_date)],
                                        ['Place of Supply', PLACE_OF_SUPPLY],
                                    ].map(([label, value]) => (
                                        <tr key={label}>
                                            <td style={{ fontWeight: 'bold', whiteSpace: 'nowrap', padding: '1px 4px 1px 0', border: 'none' }}>{label}</td>
                                            <td style={{ fontWeight: 'bold', border: 'none', padding: '1px 4px 1px 0' }}>:</td>
                                            <td style={{ border: 'none', padding: '1px 0' }}>{value || '—'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </td>
                        <td style={{ border: '1px solid #ccc', padding: '6px 8px', verticalAlign: 'top', whiteSpace: 'pre-wrap', fontSize: 11 }}>
                            <div style={{ fontWeight: 700, marginBottom: 4 }}>{document?.credit_note_type || '—'}</div>
                            <div>{document?.reason || '—'}</div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 5 }}>
                <thead>
                    <tr style={{ background: NAVY, color: '#fff', textTransform: 'uppercase' }}>
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
                        ].map((h) => (
                            <th key={h.label} style={{ border: `1px solid ${NAVY}`, padding: '3px 2px', textAlign: 'center', fontSize: 10, background: NAVY, color: '#fff', fontWeight: 'bold', width: h.width, whiteSpace: 'nowrap' }}>{h.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {items.map((item: any, i: number) => (
                        <tr key={i}>
                            <td style={{ border: '1px solid #ccc', padding: '4px 3px', textAlign: 'center', fontSize: 10, fontWeight: 500, whiteSpace: 'nowrap' }}>{i + 1}</td>
                            <td style={{ border: '1px solid #ccc', padding: '4px 3px', fontSize: 10, fontWeight: 700, lineHeight: 1.15, whiteSpace: 'normal' }}>{item.description || '—'}</td>
                            <td style={{ border: '1px solid #ccc', padding: '4px 3px', textAlign: 'center', fontSize: 10, fontWeight: 500, whiteSpace: 'nowrap' }}>{item.hsn || '—'}</td>
                            <td style={{ border: '1px solid #ccc', padding: '4px 3px', textAlign: 'center', fontSize: 10, fontWeight: 500, whiteSpace: 'nowrap' }}>{item.qty}</td>
                            <td style={{ border: '1px solid #ccc', padding: '4px 3px', textAlign: 'center', fontSize: 10, fontWeight: 500, whiteSpace: 'nowrap' }}>{formatSize(item.area)}</td>
                            <td style={{ border: '1px solid #ccc', padding: '4px 3px', textAlign: 'center', fontSize: 10, fontWeight: 500, whiteSpace: 'nowrap' }}>{formatArea(item.size)}</td>
                            <td style={{ border: '1px solid #ccc', padding: '4px 3px', textAlign: 'center', fontSize: 10, fontWeight: 500, whiteSpace: 'nowrap' }}>Nos</td>
                            <td style={{ border: '1px solid #ccc', padding: '4px 3px', textAlign: 'right', fontSize: 10, fontWeight: 500, whiteSpace: 'nowrap' }}>{fmtNum(item.rate)}</td>
                            <td style={{ border: '1px solid #ccc', padding: '4px 3px', textAlign: 'center', fontSize: 10, fontWeight: 500, whiteSpace: 'nowrap' }}>{Math.round(item.discountPct || 0)}%</td>
                            <td style={{ border: '1px solid #ccc', padding: '4px 3px', textAlign: 'right', fontSize: 10, fontWeight: 700, whiteSpace: 'nowrap' }}>{fmtNum(item.amount)}</td>
                        </tr>
                    ))}
                    <tr style={{ background: '#f8fafc' }}>
                        <td colSpan={9} style={{ border: '1px solid #ccc', padding: '4px 6px', fontWeight: 700, textAlign: 'right', textTransform: 'uppercase' }}>Total Before Tax</td>
                        <td style={{ border: '1px solid #ccc', padding: '4px 6px', fontWeight: 700, textAlign: 'right' }}>{fmtNum(totalTaxable)}</td>
                    </tr>
                </tbody>
            </table>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 4 }}>
                <tbody>
                    <tr>
                        <td style={{ width: '52%', verticalAlign: 'top', padding: 0, border: 'none' }}>
                            <table style={{ width: '100%', height: '100%', borderCollapse: 'collapse', border: '1px solid #ccc' }}>
                                <thead><tr><th colSpan={4} style={{ border: 'none', padding: 0 }}><SectionHeader icon={SquarePen} label="GST Details" /></th></tr></thead>
                                <tbody>
                                    <tr style={{ background: '#f8fafc', fontWeight: 700, fontSize: 10 }}>
                                        <td style={{ border: '1px solid #ccc', padding: '5px 6px' }}>Tax Head</td>
                                        <td style={{ border: '1px solid #ccc', padding: '5px 6px' }}>Rate (%)</td>
                                        <td style={{ border: '1px solid #ccc', padding: '5px 6px' }}>Taxable Value (₹)</td>
                                        <td style={{ border: '1px solid #ccc', padding: '5px 6px' }}>Amount (₹)</td>
                                    </tr>
                                    <tr>
                                        <td style={{ border: '1px solid #ccc', padding: '5px 6px' }}>CGST</td>
                                        <td style={{ border: '1px solid #ccc', padding: '5px 6px' }}>{isIgst ? '-' : '9%'}</td>
                                        <td style={{ border: '1px solid #ccc', padding: '5px 6px' }}>{isIgst ? '-' : fmtNum(totalTaxable)}</td>
                                        <td style={{ border: '1px solid #ccc', padding: '5px 6px' }}>{isIgst ? '-' : fmtNum(totalGstAmount / 2)}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ border: '1px solid #ccc', padding: '5px 6px' }}>SGST</td>
                                        <td style={{ border: '1px solid #ccc', padding: '5px 6px' }}>{isIgst ? '-' : '9%'}</td>
                                        <td style={{ border: '1px solid #ccc', padding: '5px 6px' }}>{isIgst ? '-' : fmtNum(totalTaxable)}</td>
                                        <td style={{ border: '1px solid #ccc', padding: '5px 6px' }}>{isIgst ? '-' : fmtNum(totalGstAmount / 2)}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ border: '1px solid #ccc', padding: '5px 6px' }}>IGST</td>
                                        <td style={{ border: '1px solid #ccc', padding: '5px 6px' }}>-</td>
                                        <td style={{ border: '1px solid #ccc', padding: '5px 6px' }}>-</td>
                                        <td style={{ border: '1px solid #ccc', padding: '5px 6px' }}>-</td>
                                    </tr>
                                    <tr style={{ background: '#f8fafc', fontWeight: 700 }}>
                                        <td colSpan={3} style={{ border: '1px solid #ccc', padding: '5px 6px' }}>Total GST Amount</td>
                                        <td style={{ border: '1px solid #ccc', padding: '5px 6px' }}>{fmtNum(totalGstAmount)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td style={{ width: '2%', border: 'none' }} />
                        <td style={{ width: '46%', verticalAlign: 'top', padding: 0, border: 'none' }}>
                            <table style={{ width: '100%', height: '100%', borderCollapse: 'collapse', border: '1px solid #ccc' }}>
                                <thead><tr><th colSpan={2} style={{ border: 'none', padding: 0 }}><SectionHeader icon={SquarePen} label="Adjustment Summary" /></th></tr></thead>
                                <tbody>
                                    {([
                                        ['Credit Amount (Before Tax)', fmtNum(totalTaxable), false],
                                        ['GST Amount', fmtNum(totalGstAmount), false],
                                        ['TOTAL CREDIT NOTE VALUE', fmtNum(grandTotal), true],
                                        ['TDS Impact (If Any)', fmtNum(tdsAmount), false],
                                        ['NET ADJUSTMENT AMOUNT', fmtNum(netAdjustment), true],
                                    ] as [string, string, boolean][]).map(([label, value, strong]) => (
                                        <tr key={label} style={{ height: '20%', ...(strong ? { background: '#fff7ed' } : {}) }}>
                                            <td style={{ border: '1px solid #ccc', padding: '5px 6px', fontWeight: strong ? 700 : 500 }}>{label}</td>
                                            <td style={{ border: '1px solid #ccc', padding: '5px 6px', textAlign: 'right', fontWeight: strong ? 700 : 500, color: strong ? '#c2410c' : undefined }}>₹ {value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 4 }}>
                <tbody>
                    <tr style={{ background: 'rgb(241, 245, 249)' }}>
                        <td style={{ width: '70%', border: '1px solid #ccc', padding: '4px 6px', verticalAlign: 'middle', background: 'rgb(241, 245, 249)' }}>
                            <span style={{ fontWeight: 700 }}>Amount in Words: </span>{toWords(grandTotal)}
                        </td>
                        <td style={{ width: '30%', height: BAND_HEIGHT, border: '1px solid #ccc', background: 'rgb(241, 245, 249)', color: NAVY, padding: '0 6px', verticalAlign: 'middle' }}>
                            <div style={{ height: BAND_HEIGHT, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                                <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase' }}>Credit Note Value</span>
                                <span style={{ fontSize: 13, fontWeight: 700 }}>₹ {fmtNum(grandTotal)}</span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <table className="avoid-break" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 4, border: '1px solid #ccc' }}>
                <tbody>
                    <tr>
                        {[
                            { label: 'PREPARED BY', person: preparedBy, date: document?.credit_note_date },
                            { label: 'REVIEWED BY', person: reviewedBy, date: document?.credit_note_date },
                            { label: `FOR ${companyName}`, company: true },
                        ].map((col: any, idx) => (
                            <td key={col.label} style={{ width: '33.33%', padding: 0, border: 'none', borderRight: idx < 2 ? '1px solid #ccc' : 'none', verticalAlign: 'top' }}>
                                <div style={{ height: BAND_HEIGHT, background: 'rgb(241, 245, 249)', color: NAVY, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, lineHeight: 1, fontWeight: 700, textAlign: 'center', textTransform: 'uppercase', padding: '0 8px' }}>
                                    {col.label}
                                </div>
                                <div style={{ height: 86, position: 'relative', borderTop: '1px solid #ccc', boxSizing: 'border-box' }}>
                                    {!col.company ? (
                                        <>
                                            {mediaUrl(col.person?.signatureImage) && (
                                                <img loading="lazy" decoding="async" src={mediaUrl(col.person?.signatureImage) || ''} alt="" onError={(e) => { e.currentTarget.style.display = 'none'; }} style={{ position: 'absolute', top: 4, left: '50%', transform: 'translateX(-50%)', maxHeight: 36, maxWidth: 125, objectFit: 'contain', display: 'block' }} />
                                            )}
                                            <div style={{ position: 'absolute', left: 14, right: 14, top: 42, borderTop: '1px solid #ccc' }} />
                                            <div style={{ position: 'absolute', left: 8, right: 8, top: 51, textAlign: 'center', color: '#111827', fontSize: 8.2, lineHeight: 1.1, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                {[col.person?.name || 'N/A', col.person?.designation || (idx === 0 ? 'Relationship Manager' : 'HOD'), fmtDate(col.date)].filter(Boolean).join(' / ')}
                                            </div>
                                            <div style={{ position: 'absolute', left: 0, right: 0, top: 64, textAlign: 'center', color: '#000', fontSize: 8.2, lineHeight: 1, fontStyle: 'italic' }}>(Signature)</div>
                                        </>
                                    ) : (
                                        <>
                                            {stampUrl && <img loading="lazy" decoding="async" src={stampUrl} alt="" onError={(e) => { e.currentTarget.style.display = 'none'; }} style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-90px)', maxHeight: 54, maxWidth: 56, objectFit: 'contain', display: 'block' }} />}
                                            {sigUrl && <img loading="lazy" decoding="async" src={sigUrl} alt="" onError={(e) => { e.currentTarget.style.display = 'none'; }} style={{ position: 'absolute', top: 13, left: '50%', transform: 'translateX(-24px)', maxHeight: 46, maxWidth: 155, objectFit: 'contain', display: 'block' }} />}
                                            <div style={{ position: 'absolute', left: 14, right: 14, top: 65, borderTop: '1px solid #ccc' }} />
                                            <div style={{ position: 'absolute', left: 0, right: 0, top: 68, textAlign: 'center', color: '#000', fontSize: 8.2, lineHeight: 1, fontStyle: 'italic' }}>Authorized Signatory</div>
                                        </>
                                    )}
                                </div>
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>


            <div className="avoid-break" style={{ position: 'relative', height: 50, overflow: 'hidden', border: '1px solid #ccc', borderTop: 'none' }}>
                <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 24, background: NAVY, zIndex: 0 }} />
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, fontSize: 11, fontWeight: 500, color: NAVY, zIndex: 2 }}>
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
        </div>
    );
}
