import { STATUS_CONFIG } from './types';

export default function PrintCertificate({ data }: { data: any }) {
    if (!data) return null;
    const cur = data.currency === 'USD' ? '$' : '₹';
    const status = STATUS_CONFIG[data.status] || STATUS_CONFIG.pending;
    const paid = data.amountPaid || 0;
    const total = data.participation?.total || 0;
    const balance = data.balanceAmount || 0;
    const regDate = data.createdAt ? new Date(data.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';
    const printDate = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });

    return (
        <div className="hidden print:block font-['Inter',sans-serif] text-slate-900 bg-white p-0 m-0">

            {/* PAGE 1 */}
            <div style={{ pageBreakAfter: 'always', padding: '32px 40px' }}>

                {/* Header */}
                <div style={{ borderBottom: '3px solid #23471d', paddingBottom: '16px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', color: '#23471d', textTransform: 'uppercase', marginBottom: '4px' }}>
                            Namo Gange Trust Foundation
                        </div>
                        <div style={{ fontSize: '22px', fontWeight: 900, color: '#1a1a1a', letterSpacing: '-0.5px', lineHeight: 1.1 }}>
                            Global Healthcare Excellence 2026
                        </div>
                        <div style={{ fontSize: '9px', fontWeight: 600, color: '#666', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '4px' }}>
                            Official Exhibitor Registration Certificate
                        </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '9px', color: '#888', marginBottom: '2px' }}>Registration ID</div>
                        <div style={{ fontSize: '16px', fontWeight: 900, fontFamily: 'monospace', color: '#23471d', letterSpacing: '2px' }}>
                            #{data._id.slice(-8).toUpperCase()}
                        </div>
                        <div style={{ fontSize: '9px', color: '#888', marginTop: '6px' }}>Printed: {printDate}</div>
                        <div style={{ fontSize: '9px', color: '#888' }}>Registered: {regDate}</div>
                    </div>
                </div>

                {/* Status Banner */}
                <div style={{ background: '#f8fdf8', border: '1px solid #c6e6c6', borderRadius: '8px', padding: '12px 20px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <div style={{ fontSize: '9px', color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Application Status</div>
                        <div style={{ fontSize: '16px', fontWeight: 800, color: '#23471d', marginTop: '2px' }}>{status.label}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '9px', color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Allocated Stall</div>
                        <div style={{ fontSize: '20px', fontWeight: 900, color: '#d26019', marginTop: '2px' }}>
                            {data.participation?.stallFor || data.participation?.stallNo || 'Pending'}
                        </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '9px', color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Total Amount</div>
                        <div style={{ fontSize: '18px', fontWeight: 900, color: '#1a1a1a', marginTop: '2px' }}>{cur}{total.toLocaleString('en-IN')}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '9px', color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Balance Due</div>
                        <div style={{ fontSize: '18px', fontWeight: 900, color: balance > 0 ? '#dc2626' : '#16a34a', marginTop: '2px' }}>{cur}{balance.toLocaleString('en-IN')}</div>
                    </div>
                </div>

                {/* Two Column Layout */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>

                    {/* Company Details */}
                    <div>
                        <div style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#23471d', borderBottom: '1px solid #23471d', paddingBottom: '4px', marginBottom: '12px' }}>
                            Company Information
                        </div>
                        {[
                            ['Company / Firm Name', data.exhibitorName],
                            ['Fascia / Brand Name', data.fasciaName || data.exhibitorName],
                            ['Industry Sector', data.industrySector],
                            ['Nature of Business', data.natureOfBusiness],
                            ['Type of Business', data.typeOfBusiness],
                            ['Website', data.website],
                            ['Landline', data.landlineNo],
                        ].map(([label, val]) => val ? (
                            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dotted #e5e7eb', padding: '5px 0', gap: '8px' }}>
                                <span style={{ fontSize: '9px', color: '#888', fontWeight: 600, flexShrink: 0 }}>{label}</span>
                                <span style={{ fontSize: '9px', fontWeight: 700, color: '#1a1a1a', textAlign: 'right' }}>{val}</span>
                            </div>
                        ) : null)}
                        <div style={{ marginTop: '10px' }}>
                            <div style={{ fontSize: '9px', color: '#888', fontWeight: 600, marginBottom: '3px' }}>Registered Address</div>
                            <div style={{ fontSize: '9px', fontWeight: 700, color: '#1a1a1a', lineHeight: 1.5 }}>
                                {data.address}<br />
                                {[data.city, data.state, data.country, data.pincode].filter(Boolean).join(', ')}
                            </div>
                        </div>
                    </div>

                    {/* Stall + Financial */}
                    <div>
                        <div style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#d26019', borderBottom: '1px solid #d26019', paddingBottom: '4px', marginBottom: '12px' }}>
                            Stall & Financial Details
                        </div>
                        {[
                            ['Stall Number', data.participation?.stallFor || data.participation?.stallNo],
                            ['Stall Type', data.participation?.stallType],
                            ['Category', data.participation?.stallCategory],
                            ['Area', data.participation?.stallSize ? `${data.participation.stallSize} SQM` : null],
                            ['Dimensions', data.participation?.dimension],
                            ['Rate / SQM', data.participation?.rate ? `${cur}${data.participation.rate.toLocaleString('en-IN')}` : null],
                        ].map(([label, val]) => val ? (
                            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dotted #e5e7eb', padding: '5px 0', gap: '8px' }}>
                                <span style={{ fontSize: '9px', color: '#888', fontWeight: 600 }}>{label}</span>
                                <span style={{ fontSize: '9px', fontWeight: 700, color: '#1a1a1a' }}>{val}</span>
                            </div>
                        ) : null)}

                        {/* Financial Summary */}
                        <div style={{ marginTop: '14px', background: '#fafafa', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '10px 12px' }}>
                            {[
                                ['Base Amount', `${cur}${(data.participation?.amount || 0).toLocaleString('en-IN')}`, '#1a1a1a'],
                                data.participation?.discount > 0 ? ['Discount', `−${cur}${data.participation.discount.toLocaleString('en-IN')}`, '#16a34a'] : null,
                                ['GST', `+${cur}${((data.participation?.amount || 0) * ((data.participation?.gstPercent || 18) / 100)).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`, '#1a1a1a'],
                            ].filter(Boolean).map((row: any) => (
                                <div key={row[0]} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0', fontSize: '9px' }}>
                                    <span style={{ color: '#666' }}>{row[0]}</span>
                                    <span style={{ fontWeight: 700, color: row[2] }}>{row[1]}</span>
                                </div>
                            ))}
                            <div style={{ borderTop: '1px solid #d1d5db', marginTop: '6px', paddingTop: '6px', display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '10px', fontWeight: 800 }}>Total</span>
                                <span style={{ fontSize: '12px', fontWeight: 900 }}>{cur}{total.toLocaleString('en-IN')}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0', fontSize: '9px' }}>
                                <span style={{ color: '#666' }}>Amount Paid</span>
                                <span style={{ fontWeight: 700, color: '#16a34a' }}>{cur}{paid.toLocaleString('en-IN')}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0', fontSize: '9px' }}>
                                <span style={{ color: '#666' }}>Balance Due</span>
                                <span style={{ fontWeight: 700, color: balance > 0 ? '#dc2626' : '#16a34a' }}>{cur}{balance.toLocaleString('en-IN')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contacts */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                    {[
                        { title: 'Primary Contact', c: data.contact1, color: '#23471d' },
                        { title: 'Secondary Contact', c: data.contact2, color: '#555' },
                    ].map(({ title, c, color }) => c?.firstName ? (
                        <div key={title}>
                            <div style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color, borderBottom: `1px solid ${color}`, paddingBottom: '4px', marginBottom: '10px' }}>
                                {title}
                            </div>
                            <div style={{ fontSize: '11px', fontWeight: 800, color: '#1a1a1a' }}>
                                {[c.title, c.firstName, c.lastName].filter(Boolean).join(' ')}
                            </div>
                            <div style={{ fontSize: '9px', color: '#888', marginBottom: '6px' }}>{c.designation}</div>
                            {c.email && <div style={{ fontSize: '9px', color: '#444', marginBottom: '2px' }}>✉ {c.email}</div>}
                            {c.mobile && <div style={{ fontSize: '9px', color: '#444', marginBottom: '2px' }}>✆ {c.mobile}</div>}
                            {c.alternateNo && <div style={{ fontSize: '9px', color: '#888' }}>✆ {c.alternateNo} (Alt)</div>}
                        </div>
                    ) : null)}
                </div>

                {/* Tax Numbers */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                    {data.gstNo && (
                        <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '10px 14px' }}>
                            <div style={{ fontSize: '9px', color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>GST Number</div>
                            <div style={{ fontSize: '13px', fontWeight: 800, fontFamily: 'monospace', letterSpacing: '1px', color: '#1a1a1a' }}>{data.gstNo}</div>
                        </div>
                    )}
                    {data.panNo && (
                        <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '10px 14px' }}>
                            <div style={{ fontSize: '9px', color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>PAN Number</div>
                            <div style={{ fontSize: '13px', fontWeight: 800, fontFamily: 'monospace', letterSpacing: '1px', color: '#1a1a1a' }}>{data.panNo}</div>
                        </div>
                    )}
                </div>

                {/* Selected Sectors */}
                {data.selectedSectors?.length > 0 && (
                    <div style={{ marginBottom: '24px' }}>
                        <div style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#555', borderBottom: '1px solid #e5e7eb', paddingBottom: '4px', marginBottom: '10px' }}>
                            Selected Sectors
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {data.selectedSectors.map((s: string) => (
                                <span key={s} style={{ fontSize: '9px', fontWeight: 600, padding: '3px 10px', border: '1px solid #23471d', borderRadius: '20px', color: '#23471d' }}>{s}</span>
                            ))}
                        </div>
                    </div>
                )}
                {/* Footer */}
                <div style={{ borderTop: '2px solid #23471d', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <div style={{ fontSize: '10px', fontWeight: 800, color: '#23471d' }}>Namo Gange Trust Foundation</div>
                        <div style={{ fontSize: '8px', color: '#888', marginTop: '2px' }}>Health & Wellness Expo 2026 · New Delhi, India</div>
                    </div>
                    <div style={{ fontSize: '8px', color: '#aaa', textAlign: 'right' }}>
                        <div>This is a computer-generated document.</div>
                        <div>No signature required.</div>
                    </div>
                </div>

            </div>
        </div>
    );
}
