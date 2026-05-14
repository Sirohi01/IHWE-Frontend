import { Calendar, CalendarDays, ChartNoAxesCombined, Globe, Megaphone, Users, X } from "lucide-react"

const printingStatsData = [
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
]

const StatCard = ({ title, subtitle, icon, showBorder, isOdd }) => {
    return (
        <div className={`flex flex-row items-center justify-center gap-4 ${showBorder ? 'border-r pr-5 border-gray' : ''} `}>
            <div className={`img-container  ${isOdd ? 'bg-[#294669]' : 'bg-[#81912F]'} p-2 rounded-full text-white `}>
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
export default StatCardsGroup;