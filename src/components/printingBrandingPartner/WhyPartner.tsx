import * as LucideIcons from "lucide-react";
import { SERVER_URL } from "@/lib/api";

const defaultWhyPartnerData = [
    { text: "Access 8,000+ exhibitors, buyers and decision makers" },
    { text: "High visibility before, during and after the event" },
    { text: "Be part of a trusted global health & wellness event" },
    { text: "Build strong partnerships & long-term relationships" },
    { text: "Enhance brand credibility & market leadership" }
];

const iconList = [<LucideIcons.Users />, <LucideIcons.Eye />, <LucideIcons.Globe />, <LucideIcons.Handshake />, <LucideIcons.Award />];

const renderIcon = (icon) => {
    if (!icon) return null;

    if (typeof icon === 'string') {
        const normalizedUrl = icon.replace(/\\/g, '/');
        const isImageUrl = normalizedUrl.startsWith('http://') || normalizedUrl.startsWith('https://') || normalizedUrl.startsWith('/uploads') || normalizedUrl.startsWith('uploads/') || normalizedUrl.startsWith('/images');

        if (isImageUrl) {
            const src = normalizedUrl.startsWith('http://') || normalizedUrl.startsWith('https://')
                ? normalizedUrl
                : `${SERVER_URL}${normalizedUrl.startsWith('/') ? normalizedUrl : `/${normalizedUrl}`}`;
            return <img src={src} alt="icon" className="w-4 h-4 object-contain" />;
        }

        const IconComponent = (LucideIcons as any)[icon] || LucideIcons.HelpCircle;
        return <IconComponent className="w-4 h-4" />;
    }

    return icon;
};

const WhyPartnerStats = ({ text, icon, showBorder }) => {
    return (
        <div className={`flex justify-start items-center ${showBorder ? 'border-b border-[#294669]' : ''} pb-2`}>
            <div className="bg-[#294669] rounded-full mr-4 shrink-0 flex items-center justify-center w-9 h-9">
                {renderIcon(icon)}
            </div>
            <p className="text-[12px] text-white text-left leading-tight">{text}</p>
        </div>
    );
};

const WhyPartner = ({ items }) => {
    const list = items && items.length ? items : defaultWhyPartnerData;
    return (
        <div className="py-2 px-4 border border-solid border-2 border-white relative md:absolute md:bottom-5 md:top-2 md:right-6 w-full md:w-[300px] md:h-[95%] bg-[#0D0B61] text-white rounded-lg z-20 mt-6 md:mt-0">
            <h3 className="text-lg font-bold mt-2">Why Partner </h3>
            <h3 className="text-[#81912F] mb-2 font-bold text-lg">
                <span className="text-white font-bold text-lg">WITH &nbsp;</span>
                IHWE 2026?
            </h3>
            <div className="flex flex-col gap-2">
                {list.map((item, index) => (
                    <WhyPartnerStats
                        key={index}
                        text={item.text}
                        icon={item.icon || iconList[index % iconList.length]}
                        showBorder={index !== list.length - 1}
                    />
                ))}
            </div>
        </div>
    );
};
export default WhyPartner;