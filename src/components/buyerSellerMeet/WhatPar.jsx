import React from 'react'

const WhatPar = () => {
    return (
        <div className='pb-10 px-14' style={{ fontFamily: "'Barlow', sans-serif" }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', alignItems: 'stretch' }}>

                {/* ── LEFT: IMPACT ── */}
                {/* ── LEFT: IMPACT BOX ── */}
                <div style={{
                    background: '#1e4020',
                    borderRadius: '14px',
                    padding: '24px 28px 28px',
                    position: 'relative',
                    overflow: 'hidden',
                }}>

                    {/* World Map Background */}
                    <img
                        src="/bsmeet/world-map.png"
                        alt=""
                        style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            opacity: 0.12,
                            pointerEvents: 'none',
                        }}
                    />

                    {/* Title */}
                    <div style={{
                        fontSize: '15px',
                        fontWeight: 800,
                        color: '#d4a832',
                        textTransform: 'uppercase',
                        letterSpacing: '0.8px',
                        textAlign: 'center',
                        marginBottom: '22px',
                        position: 'relative',
                        zIndex: 1,
                    }}>
                        Buyer–Seller Meet 2026 Impact
                    </div>

                    {/* Stats Row — 4 columns with dashed dividers */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1px 1fr 1px 1fr 1px 1fr',
                        alignItems: 'start',
                        position: 'relative',
                        zIndex: 1,
                    }}>
                        {[
                            { icon: '/bsmeet/bsm1.png', num: '1200+', label: 'Pre-scheduled\nMeetings' },
                            { icon: '/bsmeet/bsm2.png', num: '600+', label: 'Verified\nBuyers' },
                            { icon: '/bsmeet/bsm3.png', num: '350+', label: 'Exhibiting\nBrands' },
                            { icon: '/bsmeet/bsm4.png', num: '25+', label: 'Countries\nParticipated' },
                        ].map((item, i) => (
                            <React.Fragment key={i}>
                                {/* Dashed divider before every item except first */}
                                {i > 0 && (
                                    <div style={{
                                        borderLeft: '1.5px dashed rgba(255,255,255,0.3)',
                                        alignSelf: 'stretch',
                                        margin: '0 4px',
                                    }} />
                                )}
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '0 6px',
                                }}>
                                    <img src={item.icon} alt="" style={{ width: '42px', height: '42px', objectFit: 'contain' }} />
                                    <div style={{ fontSize: '28px', fontWeight: 800, color: '#d4a832', lineHeight: 1 }}>
                                        {item.num}
                                    </div>
                                    <div style={{ fontSize: '11px', color: '#cde0c5', textAlign: 'center', lineHeight: 1.45, whiteSpace: 'pre-line' }}>
                                        {item.label}
                                    </div>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* ── MIDDLE: TESTIMONIALS ── */}
                <div style={{ background: '#fff', borderRadius: '14px', padding: '22px 18px 20px', display: 'flex', flexDirection: 'column', gap: '14px', border: '1px solid #e8e8e8' }}>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: '#1a3d20', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'center' }}>
                        What Participants Say
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', flex: 1 }}>
                        {[
                            { text: 'We connected with 15+ serious buyers in one day – highly effective platform.', author: '– Director,\nHerbal Wellness Pvt. Ltd.', img: '/bsmeet/person1.png' },
                            { text: 'The pre-scheduled meetings saved time and gave us quality business opportunities.', author: '– Business Head,\nOrganic India', img: '/bsmeet/person2.png' },
                        ].map((t, i) => (
                            <div key={i} style={{ border: '1px solid #e4e4e4', borderRadius: '10px', padding: '14px 12px 12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '10px' }}>
                                <div>
                                    <div style={{ fontSize: '28px', color: '#3a7a30', lineHeight: 0.8, fontFamily: 'Georgia, serif', fontWeight: 700 }}>"</div>
                                    <div style={{ fontSize: '11.5px', color: '#333', lineHeight: 1.55, marginTop: '6px' }}>{t.text}</div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '8px' }}>
                                    <div style={{ fontSize: '10px', color: '#555', lineHeight: 1.5, fontStyle: 'italic', whiteSpace: 'pre-line' }}>{t.author}</div>
                                    <img src={t.img} alt="" style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #f0e8d0', flexShrink: 0 }} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3a7a30' }} />
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3a7a30' }} />
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ccc' }} />
                    </div>
                </div>

                {/* ── RIGHT: FORM ── */}
                <div style={{ background: '#1e4020', borderRadius: '14px', padding: '22px 18px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'center', lineHeight: 1.3 }}>
                        Join the Buyer–Seller Meet
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        {['Full Name*', 'Company Name*', 'Email*', 'Mobile Number*'].map((p, i) => (
                            <input key={i} type="text" placeholder={p} style={{ background: '#fff', border: 'none', borderRadius: '6px', padding: '10px 12px', fontSize: '11.5px', color: '#333', outline: 'none', width: '100%', fontFamily: 'inherit' }} />
                        ))}
                        <select style={{ background: '#fff', border: 'none', borderRadius: '6px', padding: '10px 12px', fontSize: '11.5px', color: '#888', outline: 'none', width: '100%', fontFamily: 'inherit', gridColumn: '1' }}>
                            <option value="" disabled selected>I am a* (Buyer / Seller)</option>
                            <option>Buyer</option>
                            <option>Seller</option>
                        </select>
                        <input type="text" placeholder="Product Interest*" style={{ background: '#fff', border: 'none', borderRadius: '6px', padding: '10px 12px', fontSize: '11.5px', color: '#333', outline: 'none', width: '100%', fontFamily: 'inherit' }} />
                    </div>
                    <button style={{ background: '#c99a2e', border: 'none', borderRadius: '6px', padding: '13px', fontSize: '13px', fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer', width: '100%', fontFamily: 'inherit' }}>
                        Submit Registration
                    </button>
                    <div style={{ fontSize: '10px', color: '#aacca5', textAlign: 'center', lineHeight: 1.4 }}>
                        🔒 Your information is safe with us and will never be shared.
                    </div>
                </div>

            </div>
        </div>
    )
}

export default WhatPar