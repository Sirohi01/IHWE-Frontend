import { BadgePercent, ChartNoAxesCombined, FolderOpen, Gem, Users } from "lucide-react";

const defaultAdvantagesData = [
    {
        title: "Exclusive printing & branding partner for exhibitors",
        icon: <Gem />
    },
    {
        title: "Opportunity to showcase samples / portfolio at the expo venue",
        icon: <FolderOpen />
    },
    {
        title: "Access to a network of industry leaders & businesses",
        icon: <Users />
    },
    {
        title: "Opportunity to offer special discounts to exhibitors",
        icon: <BadgePercent />
    },
    {
        title: "Year-round visibility through pre & post event promotions",
        icon: <ChartNoAxesCombined />
    }
];

const defaultAdvantageIcons = [<Gem />, <FolderOpen />, <Users />, <BadgePercent />, <ChartNoAxesCombined />];

const AdvantageCard = ({ title, icon, showBorder }) => {
    return (
        <div className={`flex flex-col items-center flex-1 ${showBorder ? 'border-b md:border-b-0 md:border-r border-gray-400 pb-4 md:pb-0' : ''} px-2`}>
            <div className="img-container p-1 rounded-full text-lg">{icon}</div>
            <h3 className="text-xs font-semibold text-[#0D0B61] text-center">{title}</h3>
        </div>
    );
};

const AdvantageCardGroup = ({ items }) => {
    const list = items && items.length ? items : defaultAdvantagesData;
    return (
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mt-4 shadow-lg shadow-black/20 rounded-xl p-4">
            {list.map((advantage, index) => (
                <AdvantageCard
                    key={index}
                    title={advantage.title || advantage.text}
                    icon={advantage.icon || defaultAdvantageIcons[index % defaultAdvantageIcons.length]}
                    showBorder={index !== list.length - 1}
                />
            ))}
        </div>
    );
};
export default AdvantageCardGroup;