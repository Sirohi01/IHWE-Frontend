import React from "react";

const Dont = () => {
    return (
        <div
            style={{
                backgroundImage: "url('/bsmeet/dontBg.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                borderRadius: '12px',
                padding: '30px 40px',
                position: 'relative',
                overflow: 'hidden',
                minHeight: '90px',
                fontFamily: "'Barlow', sans-serif",
            }}
        >
            <div className="flex justify-between items-center px-20">
                {/* Heading */}
                <div style={{ position: 'relative', zIndex: 1, }}>
                    <div style={{
                        fontSize: '20px',
                        fontWeight: 700,
                        color: '#1a3d20',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        lineHeight: 1.2,
                    }}>
                        Don't Miss The Opportunity
                    </div>
                    <div style={{
                        fontSize: '26px',
                        fontWeight: 900,
                        color: '#1a3d20',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        lineHeight: 1.2,
                    }}>
                        To Grow Your Business!
                    </div>
                </div>

                {/* Buttons */}
                <div style={{
                    display: 'flex',
                    gap: '14px',
                    alignItems: 'center',
                    position: 'relative',
                    zIndex: 1,

                }}>
                    {/* Register Now */}
                    <button style={{
                        background: '#1e4020',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '13px 26px',
                        fontSize: '13px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontFamily: 'inherit',
                        whiteSpace: 'nowrap',
                    }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                        </svg>
                        Register Now
                    </button>

                    {/* Book Your Slot */}
                    {/* <button style={{
                        background: '#fff',
                        color: '#1a3d20',
                        border: '1.5px solid #b0c8a0',
                        borderRadius: '8px',
                        padding: '13px 26px',
                        fontSize: '13px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontFamily: 'inherit',
                        whiteSpace: 'nowrap',
                    }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a3d20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        Book Your Slot
                    </button> */}
                </div>
            </div>
        </div>
    )
}

export default Dont