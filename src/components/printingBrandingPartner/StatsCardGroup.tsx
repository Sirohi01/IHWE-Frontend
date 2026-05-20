import { CalendarDays, ChartNoAxesCombined, Globe, Megaphone, Users } from "lucide-react";

const defaultPrintingStatsData = [
    {
        title: "8,000+",
        subtitle: "Delegates & Exhibitors Expected",
        icon: <Users />
    },
    {
        title: "Multiple",
        subtitle: "Exhibitor Segments",
        icon: <Globe />
    },
    {
        title: "3",
        subtitle: "Power-Packed Days",
        icon: <CalendarDays />
    },
    {
        title: "Unlimited",
        subtitle: "Business Opportunities",
        icon: <ChartNoAxesCombined />
    },
    {
        title: "High",
        subtitle: "Brand Visibility & Exposure",
        icon: <Megaphone />
    }
];

const defaultStatIcons = [
    <Users />, <Globe />, <CalendarDays />, <ChartNoAxesCombined />, <Megaphone />
];

const StatCard = ({ title, subtitle, icon, showBorder, isOdd }) => {
    return (
        <div className={`flex flex-row items-center justify-center gap-4 ${showBorder ? 'border-r pr-5 border-gray' : ''} `}>
            <div className={`img-container  ${isOdd ? 'bg-[#294669]' : 'bg-[#81912F]'} p-2 rounded-full text-white `}>
                {icon}
            </div>
            <div className="flex flex-col">
                <h3 className="text-md font-bold text-[#0D0B61]">{title}</h3>
                <p className="text-xs text-[#0D0B61]">{subtitle}</p>
            </div>
        </div>
    );
};

const StatCardsGroup = ({ items }) => {
    const stats = items && items.length ? items : defaultPrintingStatsData;
    return (
        <div className="flex justify-between items-center gap-4 mt-4 shadow-lg shadow-black/20 rounded-xl p-5">
            {stats.map((stat, index) => (
                <StatCard
                    key={index}
                    title={stat.title}
                    subtitle={stat.subtitle}
                    icon={stat.icon || defaultStatIcons[index % defaultStatIcons.length]}
                    showBorder={index !== stats.length - 1}
                    isOdd={index % 2 !== 0}
                />
            ))}
        </div>
    );
};
export default StatCardsGroup;