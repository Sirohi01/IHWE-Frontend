import React from 'react'

const steps = [
    {
        num: 1,
        title: "REGISTER\nONLINE",
        desc: "Sign up as Buyer or Seller",
        icon: <img src="/bsmeet/howit1.png" alt="" className="w-full h-full object-contain" />,
    },
    {
        num: 2,
        title: "PROFILE SCREENING\n& APPROVAL",
        desc: "Our team verifies your profile",
        icon: <img src="/bsmeet/howit2.png" alt="" className="w-full h-full object-contain" />,
    },
    {
        num: 3,
        title: "MEETING\nMATCHMAKING",
        desc: "We match you with relevant partners",
        icon: <img src="/bsmeet/howit3.png" alt="" className="w-full h-full object-contain" />,
    },
    {
        num: 4,
        title: "SCHEDULE\nCONFIRMATION",
        desc: "Get your meeting calendar",
        icon: <img src="/bsmeet/howit4.png" alt="" className="w-full h-full object-contain" />,
    },
    {
        num: 5,
        title: "FACE-TO-FACE\nMEETINGS AT EXPO",
        desc: "Meet, discuss & grow your business",
        icon: <img src="/bsmeet/howit5.png" alt="" className="w-full h-full object-contain" />,
    },
]

const ArrowIcon = () => (
    <div className="flex items-center mt-10 shrink-0">
        <svg width="20" height="18" viewBox="0 0 28 18" fill="none">
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
        <div className="py-4 px-14 font-['Barlow',sans-serif]">
            <div className='flex flex-row items-stretch gap-4'>

                {/* ── LEFT SIDE: HOW IT WORKS ── */}
                <div className='w-[60%] flex flex-col'>

                    {/* Section Title */}
                    {/* HOW IT WORKS? heading with side lines */}
                    <div className="flex items-center gap-1 mb-2">

                        {/* Left line */}
                        <div className="flex-1 h-[1.5px] bg-[#3a7a30] opacity-40" />

                        {/* Heading */}
                        <h2 className="font-['Barlow_Condensed',sans-serif] text-lg font-medium text-[#1a3d20] uppercase tracking-[1px] text-center whitespace-nowrap m-0">
                            HOW IT WORKS?
                        </h2>

                        {/* Right line */}
                        <div className="flex-1 h-[1.5px] bg-[#3a7a30] opacity-40" />

                    </div>

                    {/* Steps Row */}
                    <div className="flex items-start justify-center">
                        {steps.map((step, i) => (
                            <React.Fragment key={i}>
                                {/* Step */}
                                <div className="flex flex-col items-center flex-1">

                                    {/* ✅ FIXED: Circle with proper border, overflow hidden, padding */}
                                    <div className="mt-5 w-[60px] h-[60px] rounded-full border-[2.5px] border-[#3a7a30] bg-white flex items-center justify-center overflow-hidden shrink-0 p-3 box-border">
                                        {step.icon}
                                    </div>

                                    {/* Number Badge */}
                                    <div className="mt-6 w-[26px] h-[26px] rounded-full bg-[#3a7a30] text-white font-['Barlow_Condensed',sans-serif] text-[14px] font-extrabold flex items-center justify-center">
                                        {step.num}
                                    </div>

                                    {/* Title */}
                                    <div className="mt-6 text-sm font-medium text-[#1a3d20] uppercase text-center whitespace-pre-line">
                                        {step.title}
                                    </div>

                                    {/* Description */}
                                    <div className="text-[13px] text-[#4a6040] text-center mt-1">
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
                <div className='w-[40%] flex flex-col'>

                    {/* Section Title */}

                    <div className="flex items-center gap-3 mb-2">

                        {/* Left line */}
                        <div className="flex-1 h-[1.5px] bg-[#3a7a30] opacity-40" />

                        {/* Heading */}
                        <h2 className="font-['Barlow_Condensed',sans-serif] text-lg font-medium text-[#1a3d20] uppercase tracking-[1px] text-center whitespace-nowrap m-0">
                            Industries Covered
                        </h2>

                        {/* Right line */}
                        <div className="flex-1 h-[1.5px] bg-[#3a7a30] opacity-40" />

                    </div>

                    {/* Outer Box with Unified Border */}
                    <div className="border-[1.5px] border-[#c5d9c0] rounded-xl bg-white overflow-hidden flex-1 flex flex-col">
                        {/* Grid */}
                        <div className="grid grid-cols-5 flex-1">
                            {industries.map((item, i) => {
                                const isRightEdge = (i + 1) % 5 === 0;
                                const isBottomEdge = i >= industries.length - 5;

                                return (
                                    <div key={i} className={`py-0.5 px-1 flex flex-col items-center justify-center gap-2 border-[#c5d9c0] ${!isRightEdge ? 'border-r-[1.5px]' : ''} ${!isBottomEdge ? 'border-b-[1.5px]' : ''}`}>
                                        <img src={item.icon} alt={item.label} className="w-[36px] h-[36px] object-contain" />
                                        <div className="font-['Barlow',sans-serif] text-[12px] font-medium text-[#1a3d20] text-center leading-[1.2] whitespace-pre-line">
                                            {item.label}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* And more */}
                    <div className="text-right text-[11px] text-[#4a6040] mt-[1px] italic font-medium">
                        ...and more
                    </div>
                </div>

            </div>
        </div>
    )
}

export default HowIT