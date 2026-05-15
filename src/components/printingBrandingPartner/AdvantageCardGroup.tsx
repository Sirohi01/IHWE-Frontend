import { BadgePercent, ChartNoAxesCombined, FolderOpen, Gem, Users, X } from "lucide-react"

const advantagesData = [
    {
        title: "Exclusive printing & branding partner for exhibitors",
        icon: <Gem />,
    },
    {
        title: "Opportunity to showcase samples / portfolio at the expo venue",
        icon: <FolderOpen />,
    },
    {
        title: "Access to a network of industry leaders & businesses",
        icon: <Users />,
    },
    {
        title: "Opportunity to offer special discounts to exhibitors",
        icon: <BadgePercent />,
    },
    {
        title: "Year-round visibility through pre & post event promotions",
        icon: <ChartNoAxesCombined />,
    }
]
const AdvantageCard = ({ title, icon, showBorder }) => {
    return (
        <div className={`flex items-center gap-4 flex-col flex-1 px-4 ${showBorder ? 'border-r border-gray' : ''} flex-1`}>
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
export default AdvantageCardGroup;