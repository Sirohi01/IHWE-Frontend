import { Award, Eye, Globe, Handshake, Users, X } from "lucide-react"

const whyPartnerData = [
    {
        text: "Access 8,000+ exhibitors, buyers and decision makers",
        icon: <Users />,
    },
    {
        text: "High visibility before, during and after the event",
        icon:<Eye />
    },
    {
        text: "Be part of a trusted global health & wellness event",
        icon:<Globe />
    },
    {
        text: "Build strong partnerships & long-term relationships",
        icon: <Handshake />
    },
    {
        text: "Enhance brand credibility & market leadership",
        icon:<Award/>
    }
]

const WhyPartnerStats = ({ text, icon, showBorder }) => {
    return (<div className={`flex justify-center items-center ${showBorder ? 'border-b border-[#294669]' : ''} pb-2`}>
        <div className="img-container bg-[#294669] p-2 rounded-full mr-4">
            {icon}
        </div>
        <p className="text-[12px] text-white">{text}</p>
    </div>)
}
const WhyPartner = () => {
    return (
        <div className="py-2 px-4 border border-solid border-2 border-white absolute bottom-5 top-2 right-6 w-[300px] h-full bg-[#0D0B61] text-white rounded-lg">
            <h3 className="text-lg font-bold mt-2">Why Partner </h3>
            <h3 className="text-[#81912F] mb-2 font-bold text-lg">
                <span className="text-white font-bold text-lg">
                    WITH &nbsp;
                </span>
                IHWE 2026?
            </h3>
            <div className="flex flex-col gap-2">
                {whyPartnerData.map((item, index) => <WhyPartnerStats key={index} text={item.text} icon={item.icon} showBorder={index !== whyPartnerData.length - 1} />)}
            </div>
        </div>
    )
}
export default WhyPartner;