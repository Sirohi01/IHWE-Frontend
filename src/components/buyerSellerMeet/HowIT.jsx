import React from 'react'

const steps = [
    {
        num: 1,
        title: "REGISTER\nONLINE",
        desc: "Sign up as Buyer or Seller",
        icon: <img src="/bsmeet/howit1.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />,
    },
    {
        num: 2,
        title: "PROFILE SCREENING\n& APPROVAL",
        desc: "Our team verifies your profile",
        icon: <img src="/bsmeet/howit2.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />,
    },
    {
        num: 3,
        title: "MEETING\nMATCHMAKING",
        desc: "We match you with relevant partners",
        icon: <img src="/bsmeet/howit3.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />,
    },
    {
        num: 4,
        title: "SCHEDULE\nCONFIRMATION",
        desc: "Get your meeting calendar",
        icon: <img src="/bsmeet/howit4.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />,
    },
    {
        num: 5,
        title: "FACE-TO-FACE\nMEETINGS AT EXPO",
        desc: "Meet, discuss & grow your business",
        icon: <img src="/bsmeet/howit5.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />,
    },
]

const ArrowIcon = () => (
    <div style={{ display: 'flex', alignItems: 'center', paddingTop: '30px', flexShrink: 0 }}>
        <svg width="28" height="18" viewBox="0 0 28 18" fill="none">
            <path d="M2 9h22M20 3l6 6-6 6" stroke="#3a7a30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </div>
)
const industries = [
    { icon: '/bsmeet/ind1.png', label: 'Ayurveda &\nHerbal' },
    { icon: '/bsmeet/ind2.png', label: 'Nutraceuticals\n& Supplements' },
    { icon: '/bsmeet/ind3.png', label: 'Organic &\nNatural Products' },
    { icon: '/bsmeet/ind4.png', label: 'Medical Devices\n& Equipment' },
    { icon: '/bsmeet/ind5.png', label: 'Cosmetics &\nPersonal Care' },
    { icon: '/bsmeet/ind6.png', label: 'Food &\nBeverages' },
    { icon: '/bsmeet/ind7.png', label: 'Spa &\nWellness' },
    { icon: '/bsmeet/ind8.png', label: 'Fitness &\nNutrition' },
    { icon: '/bsmeet/ind9.png', label: 'Pharma &\nBiotech' },
    { icon: '/bsmeet/ind10.png', label: 'Home Care &\nHygiene' },
    { icon: '/bsmeet/ind11.png', label: 'Packaging &\nRaw Materials' },
    { icon: '/bsmeet/ind12.png', label: 'Contract\nManufacturing' },
    { icon: '/bsmeet/ind13.png', label: 'E-commerce &\nRetail' },
    { icon: '/bsmeet/ind14.png', label: 'Health Tech &\nDigital Health' },
    { icon: '/bsmeet/ind15.png', label: 'Education &\nTraining' },
]

const HowIT = () => {
    return (
        <div className='py-10 px-14' style={{ fontFamily: "'Barlow', sans-serif" }}>
            <div className='flex flex-row items-stretch gap-10'>

                {/* ── LEFT SIDE: HOW IT WORKS ── */}
                <div className='w-1/2 flex flex-col'>

                    {/* Section Title */}
                    {/* HOW IT WORKS? heading with side lines */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>

                        {/* Left line */}
                        <div style={{ flex: 1, height: '1.5px', background: '#3a7a30', opacity: 0.4 }} />

                        {/* Heading */}
                        <h2 style={{
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontSize: '26px',
                            fontWeight: 800,
                            color: '#1a3d20',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            textAlign: 'center',
                            whiteSpace: 'nowrap',
                            margin: 0,
                        }}>
                            HOW IT WORKS?
                        </h2>

                        {/* Right line */}
                        <div style={{ flex: 1, height: '1.5px', background: '#3a7a30', opacity: 0.4 }} />

                    </div>

                    {/* Steps Row */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                        {steps.map((step, i) => (
                            <React.Fragment key={i}>
                                {/* Step */}
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>

                                    {/* ✅ FIXED: Circle with proper border, overflow hidden, padding */}
                                    <div className='mt-5' style={{
                                        width: '80px',
                                        height: '80px',
                                        borderRadius: '50%',
                                        border: '2.5px solid #3a7a30',   // ← proper border thickness
                                        background: '#fff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        overflow: 'hidden',               // ← image stays inside circle
                                        flexShrink: 0,
                                        padding: '12px',                  // ← icon andar rahe, border clearly dikhe
                                        boxSizing: 'border-box',

                                    }}>
                                        {step.icon}
                                    </div>

                                    {/* Number Badge */}
                                    <div className='mt-6' style={{
                                        width: '26px', height: '26px',
                                        borderRadius: '50%',
                                        background: '#3a7a30',
                                        color: '#fff',
                                        fontFamily: "'Barlow Condensed', sans-serif",
                                        fontSize: '14px',
                                        fontWeight: 800,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',

                                    }}>
                                        {step.num}
                                    </div>

                                    {/* Title */}
                                    <div className='mt-6' style={{
                                        fontFamily: "'Barlow Condensed', sans-serif",
                                        fontSize: '13px',
                                        fontWeight: 800,
                                        color: '#1a3d20',
                                        textTransform: 'uppercase',
                                        textAlign: 'center',
                                        letterSpacing: '0.3px',

                                        lineHeight: 1.4,
                                        whiteSpace: 'pre-line',
                                    }}>
                                        {step.title}
                                    </div>

                                    {/* Description */}
                                    <div style={{
                                        fontSize: '13px',
                                        color: '#4a6040',
                                        textAlign: 'center',
                                        lineHeight: 1.5,
                                        marginTop: '4px',
                                        maxWidth: '120px',
                                    }}>
                                        {step.desc}
                                    </div>
                                </div>

                                {/* Arrow between steps */}
                                {i < steps.length - 1 && <ArrowIcon />}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* ── RIGHT SIDE: INDUSTRIES COVERED ── */}
                <div className='w-1/2 flex flex-col'>

                    {/* Section Title */}
                    {/* <h2 style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: '26px',
                        fontWeight: 800,
                        color: '#1a3d20',
                        textTransform: 'uppercase',
                        letterSpacing: '1.5px',
                        textAlign: 'center',
                        marginBottom: '16px',
                    }}>
                        Industries Covered
                    </h2> */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>

                        {/* Left line */}
                        <div style={{ flex: 1, height: '1.5px', background: '#3a7a30', opacity: 0.4 }} />

                        {/* Heading */}
                        <h2 style={{
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontSize: '26px',
                            fontWeight: 800,
                            color: '#1a3d20',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            textAlign: 'center',
                            whiteSpace: 'nowrap',
                            margin: 0,
                        }}>
                            Industries Covered
                        </h2>

                        {/* Right line */}
                        <div style={{ flex: 1, height: '1.5px', background: '#3a7a30', opacity: 0.4 }} />

                    </div>

                    {/* Outer Box with Unified Border */}
                    <div style={{
                        border: '1.5px solid #c5d9c0',
                        borderRadius: '12px',
                        background: '#fff',
                        overflow: 'hidden',
                        flex: 1, // Ensures it takes equal height
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        {/* Grid */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(5, 1fr)',
                            flex: 1
                        }}>
                            {industries.map((item, i) => {
                                const isRightEdge = (i + 1) % 5 === 0;
                                const isBottomEdge = i >= industries.length - 5;

                                return (
                                    <div key={i} style={{
                                        padding: '12px 8px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        borderRight: isRightEdge ? 'none' : '1.5px solid #c5d9c0',
                                        borderBottom: isBottomEdge ? 'none' : '1.5px solid #c5d9c0',
                                    }}>
                                        <img src={item.icon} alt={item.label} style={{ width: '42px', height: '42px', objectFit: 'contain' }} />
                                        <div style={{
                                            fontFamily: "'Barlow', sans-serif",
                                            fontSize: '12px',
                                            fontWeight: 500,
                                            color: '#1a3d20',
                                            textAlign: 'center',
                                            lineHeight: 1.2,
                                            whiteSpace: 'pre-line',
                                        }}>
                                            {item.label}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* And more */}
                    <div style={{ textAlign: 'right', fontSize: '11px', color: '#4a6040', marginTop: '1px', fontStyle: 'italic', fontWeight: 500 }}>
                        ...and more
                    </div>
                </div>

            </div>
        </div>
    )
}

export default HowIT