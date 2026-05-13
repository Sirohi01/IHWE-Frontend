import { text } from "stream/consumers";
import heroBg from "../../assets/printing.jpeg";
import { X, CheckCircle, User, Building2, Briefcase, Send } from "lucide-react";

const headerData = {
    subtitle: "Partner With Us As a",
    title: 'Printing & Branding Partner',
    shortdescription: "Bring Ideas to Life. Amplify Brands Create Impact",
    description: "Partner with IHWE",
    collaborate: "Collaborate",
    Connect: "Connect",
    "Grow Together": "Grow Together"
}

const advantagesData = [
    {
        title: "Exclusive printing & branding partner for exhibitors", 
        icon: <X />, 
    },
      {
        title: "Opportunity to showcase samples / portfolio at the expo venue", 
        icon: <X />, 
    },
      {
        title: "Access to a network of industry leaders & businesses", 
        icon: <X />, 
    },
      {
        title: "Opportunity to offer special discounts to exhibitors", 
        icon: <X />, 
    },
      {
        title: "Year-round visibility through pre & post event promotions", 
        icon: <X />, 
    }
]

const whyPartnerData = [
    {
        text: "Access 8,000+ exhibitors, buyers and decision makers",
        img: heroBg,
    },
    {
        text: "High visibility before, during and after the event",
        img: heroBg,
    },
    {
        text: "Be part of a trusted global health & wellness event",
        img: heroBg,
    },
    {
        text: "Build strong partnerships & long-term relationships",
        img: heroBg,
    },
    {
        text: "Enhance brand credibility & market leadership",
        img: heroBg,
    }
]

const printingStatsData = [
    {
        title: "8,000+",
        subtitle: "Delegates & Exhibitors Expected",
        icon: <X />
    },
    {
        title: "Multiple",
        subtitle: "Exhibitor Segments",
        icon: <X />
    },
    {
        title: "3",
        subtitle: "Power-Packed Days",
        icon: <X />
    },
    {
        title: "Unlimited",
        subtitle: "Business Opportunities",
        icon: <X />
    },
    {
        title: "High",
        subtitle: "Brand Visibility & Exposure",
        icon: <X />
    }
]

const cardWithTagData = [
    {
        title: "Brand Visibility",
        description: "Prominent logo placement accross IHWE 2026 platforms, signage, banners & marketting collaterals",     icon: <X />
    },
    {
        title: "Direct Business Access",  
        description: "Recieve contact details of all exhibitors for their printing & branding requirements",     icon: <X />
    },
    {  
        title: "On Site Presence",
        description: "Branding at key areas including registration, directions, common areas & main stage.",     icon: <X />
    },
    {
        title: "Operational Support",
        description: "Preffered partner for all printing & branding needs with timely support & smooth coordination.",     icon: <X />
    },
     {
        title: "Digital Promotion",
        description: "Logo promotion on our website with a direct link to your website.",     icon: <X />
    },
]

const partnershipPackagesData = [
    {title:"Associate Partner", price: "1,25,000", icon: <X />, list:[
        'Logo on website & digital platforms',
        "Social media mentions",
        "Exihibitor list & emails"
    ]},
    {title:"Preferred Partner", price:"2,25,000", icon: <X />, list:["All benefits of Associate Partner", "Branding at key areas in the venue", "Premium logo placement"]},
    {title:"Premier Partner", price: "3,75,000", icon: <X />, list:["All benefits of preferred partner", "On-site branding (booth / signage)", "Speaking opportunity / brand showcase", "Featured listing in all marketing"]},
]

const partnershipBenefits=[
    "custom packages available on request","GST as applicable","Stay vouchers valid during event period"
]

const PartnerShipBenefitCard=({title, icon, price, list})=>{
    return (
        <div className="flex flex-row items-start gap-2 rounded-lg white pt-2 flex-1 border-b border-b-2 border-gray">
            <div className="w-[100px] h-[70px] rounded-full bg-[#0D0B61] flex items-center justify-center text-white">

            <X/>
            </div>
            <div className="flex center flex-col items-start justify-start w-full">
                <h3 className="text-lg font-bold text-[#0D0B61] text-center uppercase">{title}</h3>
                <h3 className="text-lg font-bold">{price} + GST</h3>
            <ul>
                {list.map((item, index)=><li key={index} className="text-sm text-[#0D0B61] flex items-center gap-2">{item}</li>)}
            </ul>
            </div>
        </div>
    )
}
const CardWithTag = ({ title, icon, description, isOdd, showBorder }) => {
    return (
        <div className={`flex flex-col items-start justify-between gap-2 rounded-lg ${isOdd ? 'bg-[#81912F]' : 'bg-[#0D0B61]'} pt-2 flex-1`}>
<div className="flex center items-center justify-center w-full">

            <h3 className="text-[11px] font-semibold text-white text-center uppercase">{title}</h3>
</div>
            <div className="bg-white rounded-lg p-3 text-center flex items-center justify-around flex-col gap-2 h-[150px] border border-1 border-gray-300">
                {/* {icon} */}
                <X />
                <p className="text-[12px] text-[#0D0B61]">{description}</p>
            </div>

        </div>
    )
}

const CardWithTagGroup = () => {
    return (
        <div className="flex justify-between items-stretch gap-4 mt-4 shadow-lg shadow-black/20 rounded-xl p-5">
            {cardWithTagData.map((stat, index) => (
                <CardWithTag
                    key={index}
                    title={stat.title}
                    description={stat.description}
                    icon={stat.icon}
                    showBorder={index !== cardWithTagData.length - 1}
                    isOdd={index % 2 !== 0}
                />
            ))}
        </div>
    )
}
const StatCard = ({ title, subtitle, icon, showBorder, isOdd }) => {
    return (
        <div className={`flex flex-row items-center justify-center gap-4 ${showBorder ? 'border-r pr-5 border-gray' : ''} `}>
            <div className={`img-container  ${isOdd ? 'bg-[#294669]' : 'bg-[#81912F]'} p-1 rounded-full`}>
                {/* <img src={img} /> */}
                {icon}
            </div>
            <div className="flex flex-col">
                <h3 className="text-md font-bold text-[#0D0B61]">{title}</h3>
                <p className="text-xs text-[#0D0B61]">{subtitle}</p>
            </div>
        </div>
    )
}

const StatCardsGroup = () => {
    return (
        <div className="flex justify-between items-center gap-4 mt-4 shadow-lg shadow-black/20 rounded-xl p-5">
            {printingStatsData.map((stat, index) => (
                <StatCard
                    key={index}
                    title={stat.title}
                    subtitle={stat.subtitle}
                    icon={stat.icon}
                    showBorder={index !== printingStatsData.length - 1}
                    isOdd={index % 2 !== 0}
                />
            ))}
        </div>
    )
}


const AdvantageCard = ({ title, icon, showBorder }) => {
    return (
        <div className={`flex items-center gap-4 flex-col flex-1 px-4 ${showBorder ? 'border-r border-gray' : ''}`}>
            <div className={`img-container p-1 rounded-full text-lg`}>
                {icon}
            </div>
            <h3 className="text-xs font-semibold text-[#0D0B61] text-center">{title}</h3>
        </div>
    )
}

const AdvantageCardGroup = () => {
    return (
        <div className="flex justify-between items-center gap-4 mt-4 shadow-lg shadow-black/20 rounded-xl p-4">
            {advantagesData.map((advantage, index) => (
                <AdvantageCard
                    key={index}
                    title={advantage.title}
                    icon={advantage.icon}
                    showBorder={index !== advantagesData.length - 1}
                />
            ))}
        </div>
    )
}

const FloatingOfficialPartner = () => {
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform bg-white text-white p-2 rounded-full border border-white w-[220px] h-[220px] flex items-center justify-center">
            <div className="w-full rounded-full h-full bg-[#81912F] p-1">
                <div className="w-full rounded-full h-full bg-[#294669] p-1 flex items-center justify-center">
                    <h4 className="uppercase font-bold text-2xl text-center flex items-center justify-center">Official Printing & branding partner</h4>
                </div>
            </div>
        </div>
    )
}

const WhyPartnerStats = ({ text, img, showBorder }) => {
    return (<div className={`flex justify-center items-center ${showBorder ? 'border-b border-[#294669]' : ''} pb-2`}>
        <div className="img-container bg-[#294669] p-1 rounded-full mr-4">
            {/* <img src={img} /> */}
            <X />
        </div>
        <p className="text-[12px] text-white">{text}</p>
    </div>)
}

const WhyPartner = () => {
    return (
        <div className="py-2 px-4 border border-solid border-2 border-white absolute bottom-5 top-5 right-6 w-[300px] h-full bg-[#0D0B61] text-white rounded-lg">
            <h3 className="text-lg font-bold mt-2">Why Partner </h3>
            <h3 className="text-[#81912F] mb-2">
                <span className="text-white">
                     WITH &nbsp;
                    </span>
                      IHWE 2026?
            </h3>
            <div className="flex flex-col gap-2">
                {whyPartnerData.map((item, index) => <WhyPartnerStats key={index} text={item.text} img={item.img} showBorder={index !== whyPartnerData.length - 1} />)}
            </div>
        </div>
    )
}
const PrintingBrandingPartner = () => {
    return (
        <div className="bg-white min-h-screen font-inter">

            {/* ══════════════════════════════════════
          HERO SECTION — height kept moderate
      ══════════════════════════════════════ */}
            <div className="min-h-[375px] bg-cover bg-center py-5" style={{
                backgroundImage: `url(${heroBg})`
            }}>
                <div className="container mx-auto px-6 max-w-[1400px] relative">
                    <div className="md:w-1/2 ">
                        <div className="top-logo-and-text flex items-center gap-4">

                            <img src={heroBg} alt="Hero" className="object-cover img-responsive w-[200px] h-[75px]" />
                            <div className="h-[70px] w-[1px] bg-blue" />
                            <div className="">
                                <h2 className="text-sm font-bold mb-1 text-[#1E104E]">Collaborate.</h2>
                                <h1 className="text-sm font-bold mb-1 text-[#81912F]">Connect.</h1>
                                <p className="text-sm font-bold text-[#F48F68]">Grow Together.</p>
                            </div>
                        </div>
                        <div className="mt-2">
                            <h2 className="text-sm font-semibold text-[#0D0B61] md:text-sm uppercase mb-2">Partner With Us As a</h2>
                            <h1 className="text-3xl font-bold text-[#0D0B61] md:text-4xl uppercase leading-6">Printing &</h1>
                            <h1 className="text-3xl font-bold md:text-4xl uppercase text-[#81912F]">Branding Partner</h1>
                            <div className="w-[100px] h-[2px] bg-[#81912F]" />
                        </div>
                        <div className="mt-4">
                            <p className="text-sm text-[#0D0B61] font-bold">Bring Ideas to Life. Amplify Brands Create Impact</p>
                            <p className="text-sm text-[#0D0B61] max-w-[350px]">Partner with IHWE 2026 and showcasd your printing & branding excellence to 8,000+ exhibitors, buyers and decision makers from across the globe.</p>
                        </div>
                    </div>
                    <WhyPartner />
                    <FloatingOfficialPartner />
                </div>
            </div>
            <div className="container mx-auto px-6 max-w-[1400px]">
                <div className="flex gap-4">
                    <div className="md:w-[70%]">
                        <StatCardsGroup />
                        <CardWithTagGroup/>
                        <div className="relative flex items-center flex-column py-4 mt-4">

                            <span className="flex-shrink mx-4 text-sm font-bold bg-white px-2 uppercase absolute top-4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#1E104E]">
                                Additional Advantages
                            </span>

                            <div className="flex-grow border border-gray-300 rounded-lg">
                                <AdvantageCardGroup />
                            </div>
                        </div>
                    </div>
                    <div className="md:w-[30%] -mt-5">
                           <div className={`flex flex-col items-start justify-between gap-2 rounded-lg bg-[#0D0B61] pt-2 flex-1 border border-2 border-white`}>
<div className="flex center items-center justify-center w-full">

            <h3 className="text-lg font-semibold text-white text-center uppercase">Partnership Packages</h3>
</div>
            <div className="bg-white rounded-lg p-3 text-center flex items-center justify-around flex-col gap-2 border border-1 border-gray-300 w-full ">
                {partnershipPackagesData.map((packageData, index)=><PartnerShipBenefitCard key={index} title={packageData.title} price={packageData.price} list={packageData.list} icon={packageData.icon} />)}
            </div>

        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PrintingBrandingPartner;