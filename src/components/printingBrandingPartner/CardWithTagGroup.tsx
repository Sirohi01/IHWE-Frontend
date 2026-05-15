import { Building2, IdCard, Monitor, Presentation, Settings, X } from "lucide-react";
const cardWithTagData = [
    {
        title: "Brand Visibility",
        description: "Prominent logo placement accross IHWE 2026 platforms, signage, banners & marketting collaterals", icon: <Presentation />
    },
    {
        title: "Direct Business Access",
        description: "Recieve contact details of all exhibitors for their printing & branding requirements", icon: <IdCard />
    },
    {
        title: "On Site Presence",
        description: "Branding at key areas including registration, directions, common areas & main stage.", icon: <Building2 />
    },
    {
        title: "Operational Support",
        description: "Preffered partner for all printing & branding needs with timely support & smooth coordination.", icon: <Settings />
    },
    {
        title: "Digital Promotion",
        description: "Logo promotion on our website with a direct link to your website.", icon: <Monitor />
    },
]
const CardWithTag = ({ title, icon, description, isOdd, showBorder }) => {
    return (
        <div className={`flex flex-col items-start justify-between gap-2 rounded-lg ${isOdd ? 'bg-[#81912F]' : 'bg-[#0D0B61]'} pt-2 flex-1`}>
            <div className="flex center items-center justify-center w-full">

                <h3 className="text-[11px] font-semibold text-white text-center uppercase">{title}</h3>
            </div>
            <div className="bg-white rounded-lg p-3 text-center flex items-center flex-col gap-2 h-[150px] border border-1 border-gray-300">
                {icon}
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
export default CardWithTagGroup;