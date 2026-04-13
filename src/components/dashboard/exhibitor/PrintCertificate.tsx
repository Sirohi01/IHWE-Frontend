import { STATUS_CONFIG } from './types';
import { SERVER_URL } from '@/lib/api';

export function buildPrintHTML(data: any): string {
    if (!data) return '';
    const cur = data.participation?.currency === 'USD' ? '$' : '\u20B9';
    const status = STATUS_CONFIG[data.status] || STATUS_CONFIG.pending;
    const paid = data.amountPaid || 0;
    const total = data.participation?.total || 0;
    const balance = data.balanceAmount || 0;
    const regDate = data.createdAt
        ? new Date(data.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
        : '—';
    const printDate = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
    const gstAmt = total - (data.participation?.amount || 0);
    const contacts = [
        { title: 'Primary Contact', c: data.contact1, color: '#23471d' },
        { title: 'Secondary Contact', c: data.contact2, color: '#555' },
    ].filter(({ c }) => c?.firstName);

    const contactHTML = contacts.map(({ title, c, color }) => `
        <div>
            <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.15em;color:${color};border-bottom:1px solid ${color};padding-bottom:4px;margin-bottom:10px">${title}</div>
            <div style="font-size:11px;font-weight:800;color:#1a1a1a">${[c.title, c.firstName, c.lastName].filter(Boolean).join(' ')}</div>
            <div style="font-size:9px;color:#888;margin-bottom:6px">${c.designation || ''}</div>
            ${c.email ? `<div style="font-size:9px;color:#444;margin-bottom:2px">✉ ${c.email}</div>` : ''}
            ${c.mobile ? `<div style="font-size:9px;color:#444;margin-bottom:2px">✆ ${c.mobile}</div>` : ''}
            ${c.alternateNo ? `<div style="font-size:9px;color:#888">✆ ${c.alternateNo} (Alt)</div>` : ''}
        </div>`).join('');

    const sectorsHTML = data.selectedSectors?.length > 0
        ? `<div style="margin-bottom:24px">
            <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.15em;color:#555;border-bottom:1px solid #e5e7eb;padding-bottom:4px;margin-bottom:10px">Selected Sectors</div>
            <div style="display:flex;flex-wrap:wrap;gap:6px">
                ${data.selectedSectors.map((s: string) => `<span style="font-size:9px;font-weight:600;padding:3px 10px;border:1px solid #23471d;border-radius:20px;color:#23471d">${s}</span>`).join('')}
            </div>
        </div>` : '';

    const receiptSection = (data.status === 'paid' || data.status === 'advance-paid') && data.receiptUrl
        ? `<div style="margin-bottom:24px;background:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:14px 18px">
            <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.15em;color:#166534;margin-bottom:6px">Payment Receipt</div>
            <div style="font-size:10px;font-weight:600;color:#444">Receipt on file · Transaction ID: ${data.manualPaymentDetails?.transactionId || data.paymentId || 'N/A'}</div>
            <div style="font-size:10px;font-weight:600;color:#444;margin-top:2px">Method: ${data.manualPaymentDetails?.method || data.paymentMode || 'N/A'}</div>
        </div>` : '';

    return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"/>
<title>Exhibitor Registration Certificate · ${data.exhibitorName}</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:'Segoe UI',Arial,sans-serif;font-size:12px;color:#111;background:#fff;padding:36px 44px}
  @media print{body{padding:20px 28px}@page{margin:12mm;size:A4}}
</style>
</head><body>

<!-- HEADER -->
<div style="border-bottom:3px solid #23471d;padding-bottom:16px;margin-bottom:24px;display:flex;justify-content:space-between;align-items:flex-start">
  <div>
    <div style="font-size:9px;font-weight:700;letter-spacing:.2em;color:#23471d;text-transform:uppercase;margin-bottom:4px">Namo Gange Trust Foundation</div>
    <div style="font-size:22px;font-weight:900;color:#1a1a1a;letter-spacing:-.5px;line-height:1.1">Global Healthcare Excellence 2026</div>
    <div style="font-size:9px;font-weight:600;color:#666;letter-spacing:.15em;text-transform:uppercase;margin-top:4px">Official Exhibitor Registration Certificate</div>
  </div>
  <div style="text-align:right">
    <div style="font-size:9px;color:#888;margin-bottom:2px">Registration ID</div>
    <div style="font-size:16px;font-weight:900;font-family:monospace;color:#23471d;letter-spacing:2px">#${data._id.slice(-8).toUpperCase()}</div>
    <div style="font-size:9px;color:#888;margin-top:6px">Printed: ${printDate}</div>
    <div style="font-size:9px;color:#888">Registered: ${regDate}</div>
  </div>
</div>

<!-- STATUS BANNER -->
<div style="background:#f8fdf8;border:1px solid #c6e6c6;border-radius:8px;padding:12px 20px;margin-bottom:24px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
  <div>
    <div style="font-size:9px;color:#888;font-weight:600;text-transform:uppercase;letter-spacing:.15em">Application Status</div>
    <div style="font-size:16px;font-weight:800;color:#23471d;margin-top:2px">${status.label}</div>
  </div>
  <div style="text-align:right">
    <div style="font-size:9px;color:#888;font-weight:600;text-transform:uppercase;letter-spacing:.15em">Allocated Stall</div>
    <div style="font-size:20px;font-weight:900;color:#d26019;margin-top:2px">${data.participation?.stallFor || data.participation?.stallNo || 'Pending'}</div>
  </div>
  <div style="text-align:right">
    <div style="font-size:9px;color:#888;font-weight:600;text-transform:uppercase;letter-spacing:.15em">Total Amount</div>
    <div style="font-size:18px;font-weight:900;color:#1a1a1a;margin-top:2px">${cur}${total.toLocaleString('en-IN')}</div>
  </div>
  <div style="text-align:right">
    <div style="font-size:9px;color:#888;font-weight:600;text-transform:uppercase;letter-spacing:.15em">Balance Due</div>
    <div style="font-size:18px;font-weight:900;color:${balance > 0 ? '#dc2626' : '#16a34a'};margin-top:2px">${cur}${balance.toLocaleString('en-IN')}</div>
  </div>
</div>

<!-- TWO COLUMN -->
<div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:24px">

  <!-- Company -->
  <div>
    <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.15em;color:#23471d;border-bottom:1px solid #23471d;padding-bottom:4px;margin-bottom:12px">Company Information</div>
    ${[
        ['Company / Firm Name', data.exhibitorName],
        ['Fascia / Brand Name', data.fasciaName || data.exhibitorName],
        ['Industry Sector', data.industrySector],
        ['Nature of Business', data.natureOfBusiness],
        ['Type of Business', data.typeOfBusiness],
        ['Website', data.website],
        ['Landline', data.landlineNo],
    ].filter(([, v]) => v).map(([l, v]) => `
        <div style="display:flex;justify-content:space-between;border-bottom:1px dotted #e5e7eb;padding:5px 0;gap:8px">
            <span style="font-size:9px;color:#888;font-weight:600;flex-shrink:0">${l}</span>
            <span style="font-size:9px;font-weight:700;color:#1a1a1a;text-align:right">${v}</span>
        </div>`).join('')}
    <div style="margin-top:10px">
      <div style="font-size:9px;color:#888;font-weight:600;margin-bottom:3px">Registered Address</div>
      <div style="font-size:9px;font-weight:700;color:#1a1a1a;line-height:1.5">
        ${data.address}<br/>${[data.city, data.state, data.country, data.pincode].filter(Boolean).join(', ')}
      </div>
    </div>
  </div>

  <!-- Stall & Financial -->
  <div>
    <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.15em;color:#d26019;border-bottom:1px solid #d26019;padding-bottom:4px;margin-bottom:12px">Stall & Financial Details</div>
    ${[
        ['Stall Number', data.participation?.stallFor || data.participation?.stallNo],
        ['Stall Type', data.participation?.stallType],
        ['Area', data.participation?.stallSize ? `${data.participation.stallSize} SQM` : null],
        ['Dimensions', data.participation?.dimension],
        ['Rate / SQM', data.participation?.rate ? `${cur}${data.participation.rate.toLocaleString('en-IN')}` : null],
    ].filter(([, v]) => v).map(([l, v]) => `
        <div style="display:flex;justify-content:space-between;border-bottom:1px dotted #e5e7eb;padding:5px 0;gap:8px">
            <span style="font-size:9px;color:#888;font-weight:600">${l}</span>
            <span style="font-size:9px;font-weight:700;color:#1a1a1a">${v}</span>
        </div>`).join('')}
    <div style="margin-top:14px;background:#fafafa;border:1px solid #e5e7eb;border-radius:6px;padding:10px 12px">
      <div style="display:flex;justify-content:space-between;padding:3px 0;font-size:9px">
        <span style="color:#666">Base Amount</span>
        <span style="font-weight:700">${cur}${(data.participation?.amount || 0).toLocaleString('en-IN')}</span>
      </div>
      <div style="display:flex;justify-content:space-between;padding:3px 0;font-size:9px">
        <span style="color:#666">GST (${data.participation?.gstPercent || 18}%)</span>
        <span style="font-weight:700">+${cur}${gstAmt.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
      </div>
      <div style="border-top:1px solid #d1d5db;margin-top:6px;padding-top:6px;display:flex;justify-content:space-between">
        <span style="font-size:10px;font-weight:800">Total</span>
        <span style="font-size:12px;font-weight:900">${cur}${total.toLocaleString('en-IN')}</span>
      </div>
      <div style="display:flex;justify-content:space-between;padding:3px 0;font-size:9px">
        <span style="color:#666">Amount Paid</span>
        <span style="font-weight:700;color:#16a34a">${cur}${paid.toLocaleString('en-IN')}</span>
      </div>
      <div style="display:flex;justify-content:space-between;padding:3px 0;font-size:9px">
        <span style="color:#666">Balance Due</span>
        <span style="font-weight:700;color:${balance > 0 ? '#dc2626' : '#16a34a'}">${cur}${balance.toLocaleString('en-IN')}</span>
      </div>
    </div>
  </div>
</div>

<!-- CONTACTS -->
${contacts.length > 0 ? `
<div style="display:grid;grid-template-columns:${contacts.length > 1 ? '1fr 1fr' : '1fr'};gap:24px;margin-bottom:24px">
  ${contactHTML}
</div>` : ''}

<!-- TAX NUMBERS -->
${(data.gstNo || data.panNo) ? `
<div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:24px">
  ${data.gstNo ? `<div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;padding:10px 14px">
    <div style="font-size:9px;color:#888;font-weight:600;text-transform:uppercase;letter-spacing:.1em;margin-bottom:4px">GST Number</div>
    <div style="font-size:13px;font-weight:800;font-family:monospace;letter-spacing:1px;color:#1a1a1a">${data.gstNo}</div>
  </div>` : ''}
  ${data.panNo ? `<div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;padding:10px 14px">
    <div style="font-size:9px;color:#888;font-weight:600;text-transform:uppercase;letter-spacing:.1em;margin-bottom:4px">PAN Number</div>
    <div style="font-size:13px;font-weight:800;font-family:monospace;letter-spacing:1px;color:#1a1a1a">${data.panNo}</div>
  </div>` : ''}
</div>` : ''}

<!-- SECTORS -->
${sectorsHTML}

<!-- RECEIPT INFO -->
${receiptSection}

<!-- PAYMENT DETAILS -->
<div style="margin-bottom:24px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:14px 18px">
  <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.15em;color:#555;margin-bottom:10px">Payment Details</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
    ${[
        ['Payment Mode', data.paymentMode],
        ['Payment Type', data.paymentType],
        ['Transaction ID', data.manualPaymentDetails?.transactionId || data.paymentId || '—'],
        ['Method', data.manualPaymentDetails?.method || '—'],
        ['Referred By', data.referredBy || 'Direct'],
        ['Spoken With', data.spokenWith || '—'],
    ].map(([l, v]) => `
        <div style="display:flex;gap:8px;padding:4px 0;border-bottom:1px dotted #e5e7eb">
            <span style="font-size:9px;color:#888;font-weight:600;min-width:100px;flex-shrink:0">${l}</span>
            <span style="font-size:9px;font-weight:700;color:#1a1a1a;text-transform:uppercase">${v || '—'}</span>
        </div>`).join('')}
  </div>
</div>

<!-- FOOTER -->
<div style="border-top:2px solid #23471d;padding-top:12px;display:flex;justify-content:space-between;align-items:center">
  <div>
    <div style="font-size:10px;font-weight:800;color:#23471d">Namo Gange Trust Foundation</div>
    <div style="font-size:8px;color:#888;margin-top:2px">Health & Wellness Expo 2026 · New Delhi, India</div>
  </div>
  <div style="font-size:8px;color:#aaa;text-align:right">
    <div>This is a computer-generated document.</div>
    <div>No signature required.</div>
  </div>
</div>

</body></html>`;
}

export function openPrintWindow(data: any) {
    const html = buildPrintHTML(data);
    const win = window.open('', '_blank', 'width=960,height=750');
    if (!win) return;
    win.document.write(html);
    win.document.close();
    win.focus();
    setTimeout(() => win.print(), 600);
}

export default function PrintCertificate({ data }: { data: any }) {
    // This component is kept for legacy compatibility but print is now handled via openPrintWindow
    return null;
}
