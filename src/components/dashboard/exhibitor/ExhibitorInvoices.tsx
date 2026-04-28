import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Printer, FileText, Receipt } from 'lucide-react';
import { SERVER_URL } from '@/lib/api';

interface InvoicesProps {
    data: any;
    settings: any;
    cur: string;
    total: number;
    paid: number;
    balance: number;
    paidPct: number;
    regDate: string;
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
    const intPart = Math.floor(n);
    return convert(intPart) + ' Rupees Only.';
}

function DownloadBtn({ url, label, icon: Icon }: any) {
    return (
        <a href={url} target="_blank" rel="noopener noreferrer" download
            className="flex items-center gap-2 px-3 py-1.5 bg-[#23471d] text-white text-[10px] font-bold rounded no-print">
            <Icon size={12} /> {label}
        </a>
    );
}

export default function ExhibitorInvoices({ data, settings, cur, total, paid, balance, paidPct, regDate }: InvoicesProps) {
    const printRef = useRef<HTMLDivElement>(null);
    const [headerImageUrl, setHeaderImageUrl] = useState<string | null>(null);
    const history = data.paymentHistory || [];

    useEffect(() => {
        const token = localStorage.getItem('exhibitorToken');
        if (!token) return;
        fetch(`${SERVER_URL}/api/message-templates/exhibitor-registration`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(r => r.json())
            .then(res => {
                const img = res?.data?.headerImage || res?.headerImage;
                if (img) setHeaderImageUrl(img.startsWith('http') ? img : `${SERVER_URL}/${img.replace(/^\//, '')}`);
            })
            .catch(() => { });
    }, []);

    const fb = data.financeBreakdown || {};
    const p = data.participation || {};
    const c1 = data.contact1 || {};

    const isFullPayment = data.paymentPlanType === 'full' || fb.isFullPayment === true;
    const effectiveDiscount = (fb.stallDiscountAmount || 0) + (isFullPayment ? (fb.discountAmount || 0) : 0);

    const grossAmt = fb.grossAmount || p.amount || 0;
    const taxableVal = fb.subtotal || p.amount || 0;
    const effectiveTaxableVal = isFullPayment ? taxableVal : (fb.subtotal1 || taxableVal + (fb.discountAmount || 0));
    const gstAmt = fb.gstAmount || Math.round(taxableVal * 0.18);
    const fmt = (n: number) => `${cur} ${Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
    const fmtNum = (n: number) => Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 });
    const cgst = Math.round(gstAmt / 2);
    const sgst = Math.round(gstAmt / 2);
    const tdsAmt = fb.tdsAmount || 0;
    const invoiceTotal = taxableVal + gstAmt;
    const netPayable = fb.netPayable || invoiceTotal - tdsAmt;

    const companyName = settings?.companyName || 'Namo Gange Wellness Pvt. Ltd.';
    const companyAddress = settings?.companyAddress || '12/29, Site-II, Loni Road, Industrial Area, Mohan Nagar, Ghaziabad, India';
    const companyGst = settings?.companyGst || '';
    const companyCin = settings?.companyCin || '';
    const sigUrl = settings?.authorizedSignature ? (settings.authorizedSignature.startsWith('http') ? settings.authorizedSignature : `${SERVER_URL}${settings.authorizedSignature}`) : null;
    const stampUrl = settings?.companyStamp ? (settings.companyStamp.startsWith('http') ? settings.companyStamp : `${SERVER_URL}${settings.companyStamp}`) : null;
    const latestPayment = history.length > 0 ? history[history.length - 1] : null;
    const seqNum = data.registrationId ? data.registrationId.split('-').pop()?.padStart(3, '0') : '001';
    const invoiceYear = new Date().getFullYear();
    const nextYear = (invoiceYear + 1).toString().slice(-2);
    const lastThreeDigits = seqNum.slice(-3);
    const invoiceNo = `NGW/${invoiceYear}-${nextYear}/PI/${lastThreeDigits}`;
    const invoiceDate = latestPayment?.paidAt
        ? new Date(latestPayment.paidAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
        : regDate;

    const handlePrint = () => {
        const content = printRef.current;
        if (!content) return;
        
        // Create iframe for printing
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        if (!iframeDoc) return;
        
        // Write complete HTML with inline styles
        const htmlContent = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Invoice ${invoiceNo} - ${data.registrationId}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { margin: 0; padding: 0; }
        body { 
            margin: 0; 
            padding: 10mm; 
            font-family: Arial, sans-serif; 
            font-size: 11px; 
            color: #000000 !important; 
            background: white;
            line-height: 1.5;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }
        table { 
            width: 100%; 
            border-collapse: collapse; 
            margin-bottom: 12px;
        }
        td, th { 
            border: 1px solid #000; 
            padding: 6px 8px; 
            vertical-align: top;
            font-size: 11px;
            word-wrap: break-word;
            overflow-wrap: break-word;
            color: #000000 !important;
        }
        th {
            background: #0d1f3c !important;
            color: #ffffff !important;
            font-weight: bold;
            text-align: center;
            padding: 6px 4px;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }
        img { 
            max-width: 100%; 
            height: auto; 
            display: block;
        }
        .bold { font-weight: bold; }
        .right { text-align: right; }
        .center { text-align: center; }
        .no-print { display: none !important; }
        div { margin: 0; padding: 0; }
        .auth-sig-line {
            border-top: 1px solid #ccc;
            padding-top: 4px;
            font-weight: 700;
            width: 60%;
            margin-left: auto !important;
            margin-right: auto !important;
            text-align: center;
        }
        section { margin-bottom: 16px; }
        
        /* Terms section spacing */
        div[style*="fontSize: 10"] {
            margin-bottom: 20px !important;
            padding: 8px !important;
        }
        
        /* HSN Code column - keep on one line */
        td:nth-child(3),
        th:nth-child(3) {
            white-space: nowrap;
            font-size: 10px;
        }
        
        /* HSN/SAC No. header - keep on one line */
        th {
            white-space: nowrap;
        }
        
        /* Size column - make it smaller */
        td:nth-child(5),
        th:nth-child(5) {
            width: 8%;
            font-size: 9px;
            padding: 4px 2px;
        }
        
        /* Discount column - make it much smaller */
        td:nth-child(8),
        th:nth-child(8) {
            width: 8%;
            font-size: 9px;
            padding: 4px 2px;
            max-width: 50px;
        }
        
        /* Amount column */
        td:nth-child(7),
        th:nth-child(7) {
            width: 10%;
            font-size: 10px;
            padding: 4px 3px;
        }
        
        /* Rate column */
        td:nth-child(6),
        th:nth-child(6) {
            width: 10%;
            font-size: 10px;
            padding: 4px 3px;
        }
        
        /* Total column - make it smaller */
        td:nth-child(9),
        th:nth-child(9) {
            width: 11%;
            font-size: 10px;
            padding: 4px 3px;
            font-weight: bold;
            white-space: nowrap;
        }
        
        @page { 
            size: A4; 
            margin: 8mm;
        }
        @media print { 
            body { 
                margin: 0; 
                padding: 10mm; 
                color: #000000 !important;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
            * { 
                margin: 0 !important; 
                padding: 0 !important; 
                color: #000000 !important;
            }
            section { margin-bottom: 16px !important; }
            table { margin-bottom: 12px !important; }
            td, th { 
                padding: 6px 8px !important; 
                color: #000000 !important;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
            th {
                background: #0d1f3c !important;
                color: #ffffff !important;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
            div[style*="fontSize: 10"] { margin-bottom: 20px !important; padding: 8px !important; }
        }
    </style>
</head>
<body>
${content.innerHTML}
</body>
</html>`;

        iframeDoc.open();
        iframeDoc.write(htmlContent);
        iframeDoc.close();
        
        // Wait for content to fully load
        setTimeout(() => {
            iframe.contentWindow?.print();
            // Clean up after printing
            setTimeout(() => {
                document.body.removeChild(iframe);
            }, 100);
        }, 500);
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 mb-4 no-print flex-wrap">
                <button onClick={handlePrint}
                    className="flex items-center gap-2 px-4 py-2 bg-[#1a3a6b] text-white text-[11px] font-bold rounded hover:bg-[#152d54] transition">
                    <Printer size={14} /> Print Tax Invoice
                </button>
                {data.registrationPdfUrl && <DownloadBtn url={data.registrationPdfUrl} label="Registration PDF" icon={FileText} />}
                {data.receiptPdfUrl && <DownloadBtn url={data.receiptPdfUrl} label="Receipt PDF" icon={Receipt} />}
            </div>

            {/* Printable Invoice */}
            <div ref={printRef} className="bg-white border border-slate-300 p-4 text-[11px] font-sans text-black" style={{ fontFamily: 'Arial, sans-serif' }}>

                {/* ── HEADER IMAGE ── */}
                {headerImageUrl && (
                    <div style={{ marginBottom: 8, textAlign: 'center' }}>
                        <img src={headerImageUrl} alt="Header" style={{ width: '100%', maxWidth: '100%', display: 'block' }} />
                    </div>
                )}

                {/* ── TAX INVOICE TITLE ── */}
                <div style={{ textAlign: 'center', marginBottom: 20, paddingBottom: 12 }}>
                    <div style={{ fontWeight: 500, fontSize: 18, color: '#0d1f3c', marginBottom: 4 }}>Performa Inovice</div>
                </div>

                {/* ── BUYER / SHIPMENT / INVOICE DETAILS (3 columns) ── */}
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 8 }}>
                    <thead>
                        <tr>
                            <th style={{ background: '#1a3a6b', color: '#fff', border: '1px solid #1a3a6b', padding: '4px 8px', width: '33%', textAlign: 'center' }}>Buyer's Name &amp; Address</th>
                            <th style={{ background: '#1a3a6b', color: '#fff', border: '1px solid #1a3a6b', padding: '4px 8px', width: '34%', textAlign: 'center' }}>Shipment Details</th>
                            <th style={{ background: '#1a3a6b', color: '#fff', border: '1px solid #1a3a6b', padding: '4px 8px', width: '33%', textAlign: 'center' }}>Invoice Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {/* Buyer */}
                            <td style={{ border: '1px solid #ccc', padding: '6px 8px', verticalAlign: 'top', fontSize: 11 }}>
                                <div style={{ fontWeight: 700 }}>{data.exhibitorName || '—'}</div>
                                <div style={{ marginTop: 4, textTransform: 'uppercase' }}>{data.address || ''}{data.city ? ', ' + data.city : ''}{data.pincode ? ' - ' + data.pincode : ''}</div>
                                <div>{data.state || ''}{data.country ? ', ' + data.country : ''}</div>
                                <div style={{ marginTop: 4 }}>Contact Person: {c1.title} {c1.firstName} {c1.lastName}</div>
                                <div>Email: {c1.email || '—'}</div>
                                {data.gstNo && <div style={{ marginTop: 4 }}>GSTIN.: {data.gstNo}</div>}
                            </td>
                            {/* Shipment */}
                            <td style={{ border: '1px solid #ccc', padding: '6px 8px', verticalAlign: 'top', fontSize: 11 }}>
                                <div style={{ fontWeight: 700 }}>{data.eventId?.name || '9th IHWE 2026'}</div>
                                <div style={{ marginTop: 4 }}>Stall No.: {p.stallFor || '—'} | {p.stallType || '—'}</div>
                                <div>Scheme: {p.stallScheme || '—'}</div>
                                <div>Dimension: {p.dimension || '—'} | Area: {p.stallSize || 0} Sqm</div>
                                <div style={{ marginTop: 4 }}>Place of Supply: {data.eventId?.location || 'New Delhi, India'}</div>
                                {data.gstNo && <div style={{ marginTop: 4 }}>GSTIN.: {data.gstNo}</div>}
                            </td>
                            {/* Invoice Details */}
                            <td style={{ border: '1px solid #ccc', padding: '6px 8px', verticalAlign: 'top', fontSize: 11 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                    <span style={{ fontWeight: 700 }}>Performa Inv. No.</span>
                                    <span>{invoiceNo}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                    <span style={{ fontWeight: 700 }}>Performa Inv. Date</span>
                                    <span>{invoiceDate}</span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* ── ITEM TABLE ── */}
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 8 }}>
                    <thead>
                        <tr style={{ background: '#0d1f3c', color: '#fff' }}>
                            {['S.No.', 'Item Description', 'HSN Code', 'Qty.', 'Area', 'Rate', 'Amount', 'Discount', 'Total'].map(h => (
                                <th key={h} style={{ border: '1px solid #0d1f3c', padding: '4px 6px', textAlign: 'center', fontSize: 10, background: '#0d1f3c', color: '#fff', fontWeight: 'bold' }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ border: '1px solid #ccc', padding: '6px', textAlign: 'center' }}>1</td>
                            <td style={{ border: '1px solid #ccc', padding: '6px' }}>
                                <div style={{ fontWeight: 700 }}>{data.eventId?.name || 'IHWE 2026'}</div>
                                <div style={{ fontSize: 10, color: '#555' }}>Exhibition Stall | {p.stallType} | Stall No. {p.stallFor} | {p.stallScheme}  | Hall No. 8, 9, 10 | {p.dimension}</div>
                            </td>
                            <td style={{ border: '1px solid #ccc', padding: '6px', textAlign: 'center' }}>998596</td>
                            <td style={{ border: '1px solid #ccc', padding: '6px', textAlign: 'center' }}>1</td>
                            <td style={{ border: '1px solid #ccc', padding: '6px', textAlign: 'center' }}>{p.stallSize || 0} Sqm.</td>
                            <td style={{ border: '1px solid #ccc', padding: '6px', textAlign: 'right' }}>{fmtNum(p.rate || 0)}</td>
                            <td style={{ border: '1px solid #ccc', padding: '6px', textAlign: 'right' }}>{fmtNum(grossAmt)}</td>
                            <td style={{ border: '1px solid #ccc', padding: '6px', textAlign: 'right' }}>{fmtNum(effectiveDiscount)}</td>
                            <td style={{ border: '1px solid #ccc', padding: '6px', textAlign: 'right', fontWeight: 700 }}>{fmtNum(effectiveTaxableVal)}</td>
                        </tr>
                        {/* Empty rows */}
                        {[1, 2, 3].map(i => (
                            <tr key={i} style={{ height: 24 }}>
                                {Array(9).fill(0).map((_, j) => <td key={j} style={{ border: '1px solid #ccc' }}></td>)}
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={8} style={{ border: '1px solid #ccc', padding: '4px 6px', fontWeight: 700, textAlign: 'right', background: '#f8fafc' }}>Taxable Value</td>
                            <td style={{ border: '1px solid #ccc', padding: '4px 6px', fontWeight: 700, textAlign: 'right' }}>{fmtNum(taxableVal)}</td>
                        </tr>
                    </tbody>
                </table>

                {/* ── GST TABLE ── */}
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 8 }}>
                    <thead>
                        <tr style={{ background: '#0d1f3c', color: '#fff' }}>
                            <th style={{ border: '1px solid #0d1f3c', padding: '4px 6px', fontSize: 10, background: '#0d1f3c', color: '#fff', fontWeight: 'bold' }}>S.No.</th>
                            <th style={{ border: '1px solid #0d1f3c', padding: '4px 6px', fontSize: 10, background: '#0d1f3c', color: '#fff', fontWeight: 'bold' }}>HSN/SAC No.</th>
                            <th style={{ border: '1px solid #0d1f3c', padding: '4px 6px', fontSize: 10, background: '#0d1f3c', color: '#fff', fontWeight: 'bold' }}>Item Value</th>
                            <th style={{ border: '1px solid #0d1f3c', padding: '4px 6px', fontSize: 10, background: '#0d1f3c', color: '#fff', fontWeight: 'bold' }}>Qty.</th>
                            <th style={{ border: '1px solid #0d1f3c', padding: '4px 6px', fontSize: 10, background: '#0d1f3c', color: '#fff', fontWeight: 'bold' }}>CGST(%)</th>
                            <th style={{ border: '1px solid #0d1f3c', padding: '4px 6px', fontSize: 10, background: '#0d1f3c', color: '#fff', fontWeight: 'bold' }}>Amount</th>
                            <th style={{ border: '1px solid #0d1f3c', padding: '4px 6px', fontSize: 10, background: '#0d1f3c', color: '#fff', fontWeight: 'bold' }}>SGST(%)</th>
                            <th style={{ border: '1px solid #0d1f3c', padding: '4px 6px', fontSize: 10, background: '#0d1f3c', color: '#fff', fontWeight: 'bold' }}>Amount</th>
                            <th style={{ border: '1px solid #0d1f3c', padding: '4px 6px', fontSize: 10, background: '#0d1f3c', color: '#fff', fontWeight: 'bold' }}>IGST(%)</th>
                            <th style={{ border: '1px solid #0d1f3c', padding: '4px 6px', fontSize: 10, background: '#0d1f3c', color: '#fff', fontWeight: 'bold' }}>Amount</th>
                            <th style={{ border: '1px solid #0d1f3c', padding: '4px 6px', fontSize: 10, background: '#0d1f3c', color: '#fff', fontWeight: 'bold' }}>Total Tax</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ border: '1px solid #ccc', padding: '4px 6px', textAlign: 'center' }}>1</td>
                            <td style={{ border: '1px solid #ccc', padding: '4px 6px', textAlign: 'center' }}>998596</td>
                            <td style={{ border: '1px solid #ccc', padding: '4px 6px', textAlign: 'right' }}>{fmtNum(taxableVal)}</td>
                            <td style={{ border: '1px solid #ccc', padding: '4px 6px', textAlign: 'center' }}>1</td>
                            <td style={{ border: '1px solid #ccc', padding: '4px 6px', textAlign: 'center' }}>9%</td>
                            <td style={{ border: '1px solid #ccc', padding: '4px 6px', textAlign: 'right' }}>{fmtNum(cgst)}</td>
                            <td style={{ border: '1px solid #ccc', padding: '4px 6px', textAlign: 'center' }}>9%</td>
                            <td style={{ border: '1px solid #ccc', padding: '4px 6px', textAlign: 'right' }}>{fmtNum(sgst)}</td>
                            <td style={{ border: '1px solid #ccc', padding: '4px 6px', textAlign: 'center' }}></td>
                            <td style={{ border: '1px solid #ccc', padding: '4px 6px', textAlign: 'right' }}></td>
                            <td style={{ border: '1px solid #ccc', padding: '4px 6px', textAlign: 'right', fontWeight: 700 }}>{fmtNum(gstAmt)}</td>
                        </tr>
                        <tr style={{ background: '#f8fafc' }}>
                            <td colSpan={3} style={{ border: '1px solid #ccc', padding: '4px 6px', fontWeight: 700 }}>Amount in Words</td>
                            <td colSpan={6} style={{ border: '1px solid #ccc', padding: '4px 6px' }}>{toWords(gstAmt)}</td>
                            <td style={{ border: '1px solid #ccc', padding: '4px 6px', fontWeight: 700 }}>Total GST Amount</td>
                            <td style={{ border: '1px solid #ccc', padding: '4px 6px', fontWeight: 700, textAlign: 'right' }}>{fmtNum(gstAmt)}</td>
                        </tr>
                        <tr style={{ background: '#f8fafc' }}>
                            <td colSpan={3} style={{ border: '1px solid #ccc', padding: '4px 6px', fontWeight: 700 }}>Amount in Words</td>
                            <td colSpan={6} style={{ border: '1px solid #ccc', padding: '4px 6px' }}>{toWords(Math.round(netPayable))}</td>
                            <td style={{ border: '1px solid #ccc', padding: '4px 6px', fontWeight: 700 }}>Invoice Value</td>
                            <td style={{ border: '1px solid #ccc', padding: '4px 6px', fontWeight: 700, textAlign: 'right' }}>{fmtNum(netPayable)}</td>
                        </tr>
                    </tbody>
                </table>

                {/* ── TERMS ── */}
                <div style={{ fontSize: 10, marginBottom: 8, padding: '6px 8px', border: '1px solid #ccc', background: '#fafafa' }}>
                    <div style={{ fontWeight: 700, marginBottom: 4 }}>Terms and Conditions:</div>
                    <div>1. Payments should be made through crossed cheque/D.D./RTGS/NEFT payable at Delhi, favouring {companyName}.</div>
                    <div>2. Interest @24% p.a will be charged if the payment is not made within 7 days from the date of issue of bill.</div>
                    <div>3. All Disputes are subject to Delhi Jurisdiction.</div>
                </div>

                {/* ── BANK & SIGNATURE ── */}
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 8 }}>
                    <thead>
                        <tr style={{ background: '#0d1f3c', color: '#fff' }}>
                            <th style={{ border: '1px solid #0d1f3c', padding: '4px 6px', width: '33%', background: '#0d1f3c', color: '#fff', fontWeight: 'bold' }}>NGW/PL Bank Details</th>
                            <th style={{ border: '1px solid #0d1f3c', padding: '4px 6px', width: '33%', background: '#0d1f3c', color: '#fff', fontWeight: 'bold' }}>Client Signature</th>
                            <th style={{ border: '1px solid #0d1f3c', padding: '4px 6px', width: '34%', background: '#0d1f3c', color: '#fff', fontWeight: 'bold' }}>For {companyName}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ border: '1px solid #ccc', padding: '6px 8px', verticalAlign: 'top', fontSize: 10 }}>
                                <div><b>Bank Name:</b> Kotak Mahindra Bank</div>
                                <div><b>Account No.:</b> 6812013962</div>
                                <div><b>IFSC Code:</b> KKBK0004584</div>
                                <div><b>Branch Name:</b> Jagriti Enclave, Anand Vihar, Delhi</div>
                            </td>
                            <td style={{ border: '1px solid #ccc', padding: '6px 8px', textAlign: 'center', verticalAlign: 'bottom' }}>
                                <div style={{ height: 60 }}></div>
                                <div className="auth-sig-line">Auth Signatory</div>
                            </td>
                            <td style={{ border: '1px solid #ccc', padding: '6px 8px', textAlign: 'center', verticalAlign: 'bottom' }}>
                                <div style={{ height: 60, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
                                    {sigUrl && <img src={sigUrl} alt="Signature" style={{ maxHeight: 50, maxWidth: 130 }} />}
                                    {stampUrl && <img src={stampUrl} alt="Stamp" style={{ maxHeight: 50, maxWidth: 60 }} />}
                                </div>
                                <div className="auth-sig-line">Auth Signatory</div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* ── FOOTER ── */}
                <div style={{ fontSize: 9, textAlign: 'center', color: '#666', marginTop: 8, paddingTop: 6, borderTop: '1px solid #ddd' }}>
                    <b>Register Address:</b> {companyAddress}
                </div>

            </div>
        </motion.div>
    );
}
