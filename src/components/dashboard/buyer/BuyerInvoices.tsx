
import { useRef, useState, useEffect } from 'react';
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

export default function BuyerInvoices({ data, settings, cur, total, paid, balance, paidPct, regDate }: InvoicesProps) {
    const printRef = useRef<HTMLDivElement>(null);
    const [headerImageUrl, setHeaderImageUrl] = useState<string | null>(null);
    const history = data.paymentHistory || [];
    const [selectedInvoiceIdx, setSelectedInvoiceIdx] = useState<number>(history.length > 0 ? 0 : -1);

    useEffect(() => {
        const token = localStorage.getItem('buyerToken');
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
    const parseAmt = (val: any) => {
        if (typeof val === 'number') return val;
        if (typeof val === 'string') return Number(val.replace(/[^0-9.]/g, '')) || 0;
        return 0;
    };

    const actualTotal = (() => {
        if (total && total > 0) return total;
        if (data.totalAmount) return parseAmt(data.totalAmount);
        if (data.amount) return parseAmt(data.amount);
        if (data.registrationFee) return parseAmt(data.registrationFee);
        if (data.financeBreakdown?.netPayable) return parseAmt(data.financeBreakdown.netPayable);
        if (data.participation?.amount) return parseAmt(data.participation.amount);
        if (data.paymentDetails?.amount) return parseAmt(data.paymentDetails.amount);
        return 0;
    })();

    const taxableVal = actualTotal > 0 ? Math.round(actualTotal / 1.18) : 0;
    const gstAmt = actualTotal - taxableVal;
    const cgst = Math.round(gstAmt / 2);
    const sgst = Math.round(gstAmt / 2);
    const fmtNum = (n: number) => Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 });

    const selectedPayment = history.length > 0 && selectedInvoiceIdx >= 0 ? history[selectedInvoiceIdx] : null;
    const latestPayment = selectedPayment || (history.length > 0 ? history[history.length - 1] : null);


    const latestTxId =
        latestPayment?.transactionId ||
        latestPayment?.razorpayPaymentId ||
        latestPayment?.txnId ||
        latestPayment?.paymentId ||
        data.paymentId ||
        data.transactionId ||
        data.razorpayPaymentId ||
        (data.manualPaymentDetails?.transactionId) ||
        (data.manualPaymentDetails?.paymentId) ||
        '—';


    const latestMethod =
        latestPayment?.method ||
        latestPayment?.paymentMethod ||
        latestPayment?.mode ||
        (data.manualPaymentDetails?.method) ||
        (data.manualPaymentDetails?.paymentMode) ||
        data.paymentMode ||
        data.paymentMethod ||
        '—';


    const thisPaymentAmt = (() => {
        if (selectedPayment?.amount) return parseAmt(selectedPayment.amount);
        if (selectedPayment?.paidAmount) return parseAmt(selectedPayment.paidAmount);
        if (selectedPayment?.paymentAmount) return parseAmt(selectedPayment.paymentAmount);
        if (paid && paid > 0) return paid;
        if (data.paidAmount) return parseAmt(data.paidAmount);
        if (data.amountPaid) return parseAmt(data.amountPaid);
        if (actualTotal > 0) return actualTotal;
        return 0;
    })();


    const exhibitorPhone =
        data.phone ||
        data.phoneNumber ||
        data.mobile ||
        data.mobileNumber ||
        data.contact1?.phone ||
        data.contact1?.mobile ||
        data.contactNumber ||
        '—';

    const companyName = settings?.companyName || 'Namo Gange Wellness Pvt. Ltd.';
    const companyAddress = settings?.companyAddress || '12/29, Site-II, Loni Road, Industrial Area, Mohan Nagar, Ghaziabad, India';
    const companyGst = settings?.companyGst || '';
    const companyCin = settings?.companyCin || '';
    const sigUrl = settings?.authorizedSignature ? (settings.authorizedSignature.startsWith('http') ? settings.authorizedSignature : `${SERVER_URL}${settings.authorizedSignature}`) : null;
    const stampUrl = settings?.companyStamp ? (settings.companyStamp.startsWith('http') ? settings.companyStamp : `${SERVER_URL}${settings.companyStamp}`) : null;


    const seqNum = data.registrationId ? data.registrationId.split('-').pop()?.padStart(3, '0') : '001';
    const invoiceYear = new Date().getFullYear();
    const paymentSuffix = selectedInvoiceIdx >= 0 ? `/P${selectedInvoiceIdx + 1}` : '';
    const invoiceNo = `9IHWE/EX/INV/${invoiceYear}/${seqNum}${paymentSuffix}`;
    const invoiceDate = latestPayment?.paidAt ? new Date(latestPayment.paidAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : regDate;

    const handlePrint = () => {
        const content = printRef.current;
        if (!content) return;
        const win = window.open('', '_blank', 'width=900,height=700');
        if (!win) return;
        win.document.write(`<!DOCTYPE html><html><head><title>Invoice ${invoiceNo} - ${data.registrationId}</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: Arial, sans-serif; font-size: 11px; color: #000; background: #fff; }
            table { width: 100%; border-collapse: collapse; }
            td, th { border: 1px solid #000; padding: 4px 6px; vertical-align: top; }
            .bold { font-weight: bold; }
            .right { text-align: right; }
            .center { text-align: center; }
            .no-print { display: none !important; }
            img { max-width: 100%; }
            @page { size: A4; margin: 8mm; }
        </style></head><body>`);
        win.document.write(content.innerHTML);
        win.document.write('</body></html>');
        win.document.close();
        win.focus();
        setTimeout(() => { win.print(); win.close(); }, 600);
    };


    const exhibitorInfo = {
        name: data.fullName || data.exhibitorName || data.companyName || data.businessName || '—',
        address: data.address || data.registeredAddress || data.businessAddress || '',
        city: data.city || '',
        state: data.state || data.stateProvince || '',
        country: data.country || '',
        pincode: data.pincode || data.pinCode || '',
        contactPerson: data.contactPersonName || data.fullName || data.representativeName || '—',
        email: data.email || data.emailAddress || data.contactEmail || '—',
        phone: exhibitorPhone,
        gstNo: data.gstNo || data.gstNumber || '',
        panNo: data.panNo || data.panNumber || ''
    };


    const exhibitorCategory = (() => {
        if (data.registrationCategory) return data.registrationCategory;
        if (data.category) return data.category;
        if (data.passType) return data.passType;
        return 'Buyer Registration';
    })();

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>

            <div className="flex items-center justify-between gap-3 mb-4 no-print flex-wrap">
                <div className="flex gap-2 flex-wrap items-center">
                    <button onClick={handlePrint}
                        className="flex items-center gap-2 px-4 py-2 bg-[#1a3a6b] text-white text-[11px] font-bold rounded hover:bg-[#152d54] transition">
                        <Printer size={14} /> Print Tax Invoice
                    </button>
                    {data.registrationPdfUrl && <DownloadBtn url={data.registrationPdfUrl} label="Registration PDF" icon={FileText} />}
                    {selectedPayment?.receiptPdfUrl && (
                        <DownloadBtn url={selectedPayment.receiptPdfUrl} label={`Receipt #${selectedInvoiceIdx + 1} PDF`} icon={Receipt} />
                    )}
                </div>

                {history.length > 0 && (
                    <div className="flex items-center gap-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Payment:</label>
                        <select
                            value={selectedInvoiceIdx}
                            onChange={(e) => setSelectedInvoiceIdx(Number(e.target.value))}
                            className="px-3 py-2 border border-slate-300 rounded text-[11px] font-bold bg-white focus:border-[#1a3a6b] focus:ring-1 focus:ring-[#1a3a6b] outline-none"
                        >
                            {history.map((h: any, i: number) => (
                                <option key={i} value={i}>
                                    #{i + 1} — {cur} {Number(h.amount || h.paidAmount || h.paymentAmount || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })} — {new Date(h.paidAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            <div ref={printRef} className="bg-white border border-slate-300 p-4 text-[11px] font-sans text-black" style={{ fontFamily: 'Arial, sans-serif' }}>
                {headerImageUrl && (
                    <div style={{ marginBottom: 8, textAlign: 'center' }}>
                        <img src={headerImageUrl} alt="Header" style={{ width: '100%', maxWidth: '100%', display: 'block' }} />
                    </div>
                )}
                <div style={{ fontWeight: 'normal', textAlign: 'center', fontSize: '18px' }}  >Tax Invoice</div>


                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 8 }}>
                    <thead>
                        <tr>
                            <th style={{ background: '#1a3a6b', color: '#fff', border: '1px solid #1a3a6b', padding: '4px 8px', width: '33%', textAlign: 'center' }}>Buyer's Name &amp; Address</th>
                            <th style={{ background: '#1a3a6b', color: '#fff', border: '1px solid #1a3a6b', padding: '4px 8px', width: '34%', textAlign: 'center' }}>Shipment Details</th>
                            <th style={{ background: '#1a3a6b', color: '#fff', border: '1px solid #1a3a6b', padding: '4px 8px', width: '33%', textAlign: 'center' }}>Seller Invoice Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ border: '1px solid #ccc', padding: '6px 8px', verticalAlign: 'top', fontSize: 11 }}>
                                <div style={{ fontWeight: 700 }}>{exhibitorInfo.name}</div>
                                <div style={{ marginTop: 4 }}>{exhibitorInfo.address}</div>
                                <div>{exhibitorInfo.city}{exhibitorInfo.state ? `, ${exhibitorInfo.state}` : ''}{exhibitorInfo.country ? `, ${exhibitorInfo.country}` : ''}{exhibitorInfo.pincode ? ` - ${exhibitorInfo.pincode}` : ''}</div>
                                <div style={{ marginTop: 4 }}>Contact Person: {exhibitorInfo.contactPerson}</div>
                                <div>Email: {exhibitorInfo.email}</div>
                                <div>Phone: {exhibitorInfo.phone}</div>
                                <div style={{ marginTop: 4 }}><b>GSTIN:</b> {exhibitorInfo.gstNo || '—'} / <b>PAN:</b> {exhibitorInfo.panNo || '—'}</div>
                            </td>
                            <td style={{ border: '1px solid #ccc', padding: '6px 8px', verticalAlign: 'top', fontSize: 11 }}>
                                <div style={{ fontWeight: 700 }}>{data.eventId?.name || '9th IHWE 2026'}</div>
                                <div style={{ marginTop: 4 }}>Category: {exhibitorCategory}</div>
                                <div>Registration Type: {data.registrationCategory || data.category || data.passType || 'Buyer Pass'}</div>
                                <div style={{ marginTop: 4 }}>Place of Supply: {data.eventId?.location || 'New Delhi, India'}</div>
                            </td>
                            <td style={{ border: '1px solid #ccc', padding: 0, verticalAlign: 'top', fontSize: 11 }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <tbody>
                                        {[
                                            ['Invoice No.', invoiceNo],
                                            ['Invoice Date', invoiceDate],
                                            ['Reverse Charge', 'No'],
                                        ].map(([label, value]) => (
                                            <tr key={label}>
                                                <td style={{ border: '1px solid #eee', padding: '3px 6px', fontWeight: 700, background: '#f8fafc', width: '45%', fontSize: 10 }}>{label}</td>
                                                <td style={{ border: '1px solid #eee', padding: '3px 6px', fontSize: 10 }}>{value}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 8 }}>
                    <thead>
                        <tr style={{ background: '#1a3a6b', color: '#fff' }}>
                            {['S.No.', 'Item Description', 'HSN Code', 'Qty.', 'Size', 'Rate', 'Amount', 'Discount', 'Total'].map(h => (
                                <th key={h} style={{ border: '1px solid #1a3a6b', padding: '4px 6px', textAlign: 'center', fontSize: 10 }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ border: '1px solid #ccc', padding: '6px', textAlign: 'center' }}>1</td>
                            <td style={{ border: '1px solid #ccc', padding: '6px' }}>
                                <div style={{ fontWeight: 700 }}>Buyer Registration Fee</div>
                                <div style={{ fontSize: 10, color: '#555' }}>{data.eventId?.name || '9th International Health & Wellness Expo 2026'} | {exhibitorCategory}</div>
                            </td>
                            <td style={{ border: '1px solid #ccc', padding: '6px', textAlign: 'center' }}>998596</td>
                            <td style={{ border: '1px solid #ccc', padding: '6px', textAlign: 'center' }}>1</td>
                            <td style={{ border: '1px solid #ccc', padding: '6px', textAlign: 'center' }}>—</td>
                            <td style={{ border: '1px solid #ccc', padding: '6px', textAlign: 'right' }}>{fmtNum(taxableVal)}</td>
                            <td style={{ border: '1px solid #ccc', padding: '6px', textAlign: 'right' }}>{fmtNum(taxableVal)}</td>
                            <td style={{ border: '1px solid #ccc', padding: '6px', textAlign: 'right' }}>0.00</td>
                            <td style={{ border: '1px solid #ccc', padding: '6px', textAlign: 'right', fontWeight: 700 }}>{fmtNum(taxableVal)}</td>
                        </tr>
                        {[1, 2, 3].map(i => (
                            <tr key={i} style={{ height: 24 }}>
                                {Array(9).fill(0).map((_, j) => <td key={j} style={{ border: '1px solid #ccc' }}> </td>)}
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={7} style={{ border: '1px solid #ccc', padding: '4px 6px' }}> </td>
                            <td style={{ border: '1px solid #ccc', padding: '4px 6px', fontWeight: 700, textAlign: 'right', background: '#f8fafc' }}>Taxable Value</td>
                            <td style={{ border: '1px solid #ccc', padding: '4px 6px', fontWeight: 700, textAlign: 'right' }}>{fmtNum(taxableVal)}</td>
                        </tr>
                    </tbody>
                </table>


                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 8 }}>
                    <thead>
                        <tr style={{ background: '#1a3a6b', color: '#fff' }}>
                            <th style={{ border: '1px solid #1a3a6b', padding: '4px 6px', fontSize: 10 }}>S.No.</th>
                            <th style={{ border: '1px solid #1a3a6b', padding: '4px 6px', fontSize: 10 }}>HSN/SAC No.</th>
                            <th style={{ border: '1px solid #1a3a6b', padding: '4px 6px', fontSize: 10 }}>Item Value</th>
                            <th style={{ border: '1px solid #1a3a6b', padding: '4px 6px', fontSize: 10 }}>Qty.</th>
                            <th colSpan={2} style={{ border: '1px solid #1a3a6b', padding: '4px 6px', fontSize: 10, textAlign: 'center' }}>CGST</th>
                            <th colSpan={2} style={{ border: '1px solid #1a3a6b', padding: '4px 6px', fontSize: 10, textAlign: 'center' }}>SGST</th>
                            <th colSpan={2} style={{ border: '1px solid #1a3a6b', padding: '4px 6px', fontSize: 10, textAlign: 'center' }}>IGST</th>
                            <th style={{ border: '1px solid #1a3a6b', padding: '4px 6px', fontSize: 10 }}>Total Tax</th>
                        </tr>
                        <tr style={{ background: '#e8edf5' }}>
                            <th colSpan={4} style={{ border: '1px solid #ccc', padding: '2px 6px' }}></th>
                            <th style={{ border: '1px solid #ccc', padding: '2px 6px', fontSize: 10 }}>CGST(%)</th>
                            <th style={{ border: '1px solid #ccc', padding: '2px 6px', fontSize: 10 }}>Amount</th>
                            <th style={{ border: '1px solid #ccc', padding: '2px 6px', fontSize: 10 }}>SGST(%)</th>
                            <th style={{ border: '1px solid #ccc', padding: '2px 6px', fontSize: 10 }}>Amount</th>
                            <th style={{ border: '1px solid #ccc', padding: '2px 6px', fontSize: 10 }}>IGST(%)</th>
                            <th style={{ border: '1px solid #ccc', padding: '2px 6px', fontSize: 10 }}>Amount</th>
                            <th style={{ border: '1px solid #ccc', padding: '2px 6px' }}></th>
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
                            <td style={{ border: '1px solid #ccc', padding: '4px 6px', textAlign: 'center' }}>—</td>
                            <td style={{ border: '1px solid #ccc', padding: '4px 6px', textAlign: 'right' }}>—</td>
                            <td style={{ border: '1px solid #ccc', padding: '4px 6px', textAlign: 'right', fontWeight: 700 }}>{fmtNum(gstAmt)}</td>
                        </tr>
                        <tr style={{ background: '#f8fafc' }}>
                            <td colSpan={2} style={{ border: '1px solid #ccc', padding: '4px 6px', fontWeight: 700 }}>Amount in Words</td>
                            <td colSpan={7} style={{ border: '1px solid #ccc', padding: '4px 6px' }}>{gstAmt === 0 ? 'Zero' : toWords(gstAmt)}</td>
                            <td style={{ border: '1px solid #ccc', padding: '4px 6px', fontWeight: 700 }}>Total GST Amount</td>
                            <td style={{ border: '1px solid #ccc', padding: '4px 6px', fontWeight: 700, textAlign: 'right' }}>{fmtNum(gstAmt)}</td>
                        </tr>
                    </tbody>
                </table>


                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 8 }}>
                    <tbody>
                        <tr style={{ background: '#f8fafc' }}>
                            <td colSpan={2} style={{ border: '1px solid #ccc', padding: '4px 6px', fontWeight: 700 }}>Amount in Words</td>
                            <td colSpan={7} style={{ border: '1px solid #ccc', padding: '4px 6px' }}>{thisPaymentAmt === 0 ? 'Zero' : toWords(Math.round(thisPaymentAmt))}</td>
                            <td style={{ border: '1px solid #ccc', padding: '4px 6px', fontWeight: 700 }}>Invoice Value</td>
                            <td style={{ border: '1px solid #ccc', padding: '4px 6px', fontWeight: 700, textAlign: 'right' }}>{fmtNum(thisPaymentAmt)}</td>
                        </tr>
                    </tbody>
                </table>


                <div style={{ fontSize: 10, marginBottom: 8, padding: '6px 8px', border: '1px solid #ccc', background: '#fafafa' }}>
                    <div style={{ fontWeight: 700, marginBottom: 4 }}>Terms and Conditions:</div>
                    <div>1. Payments should be made through crossed cheque/D.D./RTGS/NEFT payable at Delhi, favouring {companyName}.</div>
                    <div>2. Interest @24% p.a will be charged if the payment is not made within 7 days from the date of issue of bill.</div>
                    <div>3. All Disputes are subject to Delhi Jurisdiction.</div>
                </div>


                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 8 }}>
                    <thead>
                        <tr style={{ background: '#1a3a6b', color: '#fff' }}>
                            <th style={{ border: '1px solid #1a3a6b', padding: '4px 6px', width: '33%' }}>Bank Details</th>
                            <th style={{ border: '1px solid #1a3a6b', padding: '4px 6px', width: '33%' }}>Client Signature</th>
                            <th style={{ border: '1px solid #1a3a6b', padding: '4px 6px', width: '34%' }}>For {companyName}</th>
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
                                <div style={{ borderTop: '1px solid #000', paddingTop: 4, fontWeight: 700 }}>Auth Signatory</div>
                            </td>
                            <td style={{ border: '1px solid #ccc', padding: '6px 8px', textAlign: 'center', verticalAlign: 'bottom' }}>
                                <div style={{ height: 60, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
                                    {sigUrl && <img src={sigUrl} alt="Signature" style={{ maxHeight: 50, maxWidth: 130 }} />}
                                    {stampUrl && <img src={stampUrl} alt="Stamp" style={{ maxHeight: 50, maxWidth: 60 }} />}
                                </div>
                                <div style={{ borderTop: '1px solid #000', paddingTop: 4, fontWeight: 700 }}>Auth Signatory</div>
                            </td>
                        </tr>
                    </tbody>
                </table>


                <div style={{ fontSize: 9, textAlign: 'center', color: '#666', marginTop: 8, paddingTop: 6, borderTop: '1px solid #ddd' }}>
                    <b>9th International Health & Wellness Expo 2026</b>
                </div>
            </div>
        </motion.div>
    );
}