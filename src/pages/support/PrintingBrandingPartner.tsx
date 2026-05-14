import { text } from "stream/consumers";
import heroBg from "../../assets/printing.jpeg";
import { X, CheckCircle, User, Building2, Briefcase, Send } from "lucide-react";
import WhyPartner from "../../components/printingBrandingPartner/WhyPartner";
import StatCardsGroup from "../../components/printingBrandingPartner/StatsCardGroup";
import CardWithTagGroup from "../../components/printingBrandingPartner/CardWithTagGroup";
import AdvantageCardGroup from "../../components/printingBrandingPartner/AdvantageCardGroup";
import FloatingOfficialPartner from "../../components/printingBrandingPartner/FloatingOfficialPartner";
import PartnerShipBenefitCard from "@/components/printingBrandingPartner/PartnerShipBenefitCard";
import PricingFooter from "@/components/printingBrandingPartner/PrintingFooter";

const headerData = {
    subtitle: "Partner With Us As a",
    title: 'Printing & Branding Partner',
    shortdescription: "Bring Ideas to Life. Amplify Brands Create Impact",
    description: "Partner with IHWE",
    collaborate: "Collaborate",
    Connect: "Connect",
    "Grow Together": "Grow Together"
}

const partnershipPackagesData = [
    {
        title: "Associate Partner", price: "1,25,000", icon: <X />, list: [
            'Logo on website & digital platforms',
            "Social media mentions",
            "Exihibitor list & emails"
        ],
        color:'#1E104E'
    },
    { title: "Preferred Partner", price: "2,25,000", icon: <X />, list: ["All benefits of Associate Partner", "Branding at key areas in the venue", "Premium logo placement"], color:"#81912F" },
    { title: "Premier Partner", price: "3,75,000", icon: <X />, list: ["All benefits of preferred partner", "On-site branding (booth / signage)", "Speaking opportunity / brand showcase", "Featured listing in all marketing"], color:"orange" },
]

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

                            <div className="flex items-start gap-4 w-full mb-0 pt-4 mt-[30px]">

                                <div className="flex items-center gap-[15px]">
                                    <div>
                                        <h1 className="text-[#0B2C66] font-black text-[16px] leading-[1.1] uppercase">
                                            International<br />
                                            <span className="text-[#4E9F3D]">Health &amp; Wellness</span><br />
                                            Expo 2026
                                        </h1>
                                        <span className="bg-[#0B2C66] text-white text-[8px] px-[6px] py-[1px] rounded font-bold mt-0.5 inline-block uppercase tracking-widest">
                                            Global Edition
                                        </span>
                                    </div>
                                </div>


                                <div className="w-[1px] h-[70px] bg-gray-200 hidden md:block" />


                                <div className="hidden md:block">
                                    <p className="text-[#0B2C66] font-bold text-[20px] leading-[1.2] tracking-tight">
                                        Collaborate.<br />
                                        Connect.<br />
                                        <span className="text-[#4E9F3D]">Grow Together.</span>
                                    </p>
                                </div>
                            </div>

                        </div>
                        <div className="mt-2">
                            <h2 className="text-sm font-bold text-[#0D0B61] md:text-sm uppercase mb-2">Partner With Us As a</h2>
                            <h1 className="text-4xl font-bold text-[#0D0B61] md:text-4xl uppercase leading-6">Printing &</h1>
                            <h1 className="text-4xl font-bold md:text-4xl uppercase text-[#81912F]">Branding Partner</h1>
                            <div className="w-[100px] h-[2px] bg-[#81912F]" />
                        </div>
                        <div className="my-4">
                            <p className="text-sm text-[#0D0B61] font-bold">Bring Ideas to Life. Amplify Brands Create Impact</p>
                            <p className="text-sm text-[#0D0B61] max-w-[350px] mt-2">Partner with IHWE 2026 and showcasd your printing & branding excellence to 8,000+ exhibitors, buyers and decision makers from across the globe.</p>
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
                        <CardWithTagGroup />
                        <div className="relative flex items-center flex-column py-4 mt-4">

                            <span className="flex-shrink mx-4 text-sm font-bold bg-white px-2 uppercase absolute top-4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#1E104E]">
                                Additional Advantages
                            </span>

                            <div className="flex-grow border border-gray-300 rounded-lg">
                                <AdvantageCardGroup />
                            </div>
                        </div>
                    </div>
                    <div className="md:w-[30%] h-[100%]">
                        <div className={`flex flex-col items-start justify-between gap-2 rounded-lg bg-[#0D0B61] pt-2 flex-1 border border-2 border-white h-full`}>
                            <div className="flex center items-center justify-center w-full h-full">

                                <h3 className="text-lg font-semibold text-white text-center uppercase">Partnership Packages</h3>
                            </div>
                            <div className="bg-white rounded-lg p-3 text-center flex items-center justify-between flex-col gap-2 border border-1 border-gray-300 w-full  h-full flex-grow-1">
                                {partnershipPackagesData.map((packageData, index) => <PartnerShipBenefitCard color={packageData.color} key={index} title={packageData.title} price={packageData.price} list={packageData.list} icon={packageData.icon} />)}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <PricingFooter />
        </div>
    )
}

export default PrintingBrandingPartner;