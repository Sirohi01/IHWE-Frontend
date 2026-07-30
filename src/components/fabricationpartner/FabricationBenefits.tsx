import React from 'react';
import * as Icons from 'lucide-react';

const IconOrImageRenderer = ({ icon, className }: { icon: string, className?: string }) => {
  if (!icon) return null;
  if (icon.startsWith('/') || icon.startsWith('http') || icon.includes('.')) {
    return <img loading="lazy" decoding="async" src={icon} alt="" className={className} />;
  }
  const IconComponent = (Icons as any)[icon] || Icons.Star;
  return <IconComponent className={className} />;
};

interface FabricationBenefitsProps {
  benefits?: any;
}

const defaultTopCards = [
  {
    title: "BRAND VISIBILITY",
    color: "#005E68",
    icon: "/images/partnership/star.png",
    desc: "Premium branding across IHWE 2026 platforms and on-site signage.",
  },
  {
    title: "DIRECT BUSINESS ACCESS",
    color: "#6D8300",
    icon: "/images/partnership/id.png",
    desc: "Receive contact details of all exhibitors for stall design & fabrication opportunities.",
  },
  {
    title: "OPERATIONAL SUPPORT",
    color: "#C18A00",
    icon: "/images/partnership/switch.png",
    desc: "Temporary electricity connection during fabrication days.",
  },
  {
    title: "MARKETING & PROMOTION",
    color: "#003D7A",
    icon: "/images/partnership/socials.png",
    desc: "Logo promotion on our website with a direct link to your website.",
  },
];

const defaultAdvantages = [
  {
    icon: "/images/partnership/folder.png",
    text: "Exhibitor data shared for stall fabrication business",
  },
  {
    icon: "/images/partnership/website.png",
    text: "Profile on IHWE website as an official partner",
  },
  {
    icon: "/images/partnership/badge.png",
    text: "Featured listing in event directory",
  },
  {
    icon: "/images/partnership/group.png",
    text: "On-site branding at strategic locations",
  },
  {
    icon: "/images/partnership/discount.png",
    text: "Opportunity to offer exclusive deals to exhibitors",
  },
  {
    icon: "/images/partnership/chart.webp",
    text: "Year-round visibility through pre & post event promotions",
  },
];

const FabricationBenefits: React.FC<FabricationBenefitsProps> = ({ benefits }) => {
  const topCardsList = benefits?.companyCard?.items && benefits.companyCard.items.length > 0
    ? benefits.companyCard.items.map((item: any, idx: number) => ({
        title: item.title || defaultTopCards[idx]?.title || `BENEFIT ${idx + 1}`,
        color: item.color || defaultTopCards[idx]?.color || "#005E68",
        icon: item.icon || defaultTopCards[idx]?.icon || "Star",
        desc: item.text || item.desc || ""
      }))
    : defaultTopCards;

  const advantagesList = benefits?.perksCard?.items && benefits.perksCard.items.length > 0
    ? benefits.perksCard.items.map((item: any, idx: number) => ({
        icon: item.icon || defaultAdvantages[idx]?.icon || "Check",
        text: item.label || item.text || ""
      }))
    : defaultAdvantages;

  const advantagesTitle = benefits?.perksCard?.title || "Additional Advantages";

  return (
    <div>
      {/* BENEFITS SECTION */}
      <section className="bg-white">
        <div className="max-w-[1450px] mx-auto">

          {/* TOP CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topCardsList.map((item, idx) => (
              <div
                key={idx}
                className="rounded-[16px] overflow-hidden border border-[#d8d8d8] bg-[#fafafa] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full"
              >
                {/* HEADER */}
                <div
                  className="h-[36px] flex items-center justify-center px-2 shrink-0"
                  style={{
                    background: `linear-gradient(180deg, ${item.color} 0%, ${item.color}dd 100%)`,
                  }}
                >
                  <h3 className="text-white text-xs sm:text-[13px] md:text-[15px] font-semibold uppercase tracking-[0.5px] text-center">
                    {item.title}
                  </h3>
                </div>

                {/* BODY */}
                <div className="px-4 py-4 flex flex-col items-center text-center flex-1">
                  {/* ICON */}
                  <div className="w-12 h-12 md:w-[62px] md:h-[62px] flex items-center justify-center mb-2 shrink-0 text-[#0f6a72]">
                    <IconOrImageRenderer
                      icon={item.icon}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* DESC */}
                  <p className="text-[#111827] text-[11px] sm:text-[12px] leading-[1.55]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ADDITIONAL ADVANTAGES */}
          <div className="mt-8 border border-[#69aeb3] rounded-[18px] bg-[#fcfcfc] overflow-hidden">
            {/* TITLE */}
            <div className="flex items-center justify-center gap-3 sm:gap-5 px-4 mt-6">
              <div className="h-[1px] flex-1 max-w-[120px] bg-[#69aeb3]" />
              <h3 className="text-[#111827] text-sm sm:text-[16px] md:text-[22px] font-black uppercase tracking-[1px] text-center shrink-0">
                {advantagesTitle}
              </h3>
              <div className="h-[1px] flex-1 max-w-[120px] bg-[#69aeb3]" />
            </div>

            {/* ITEMS */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 p-2">
              {advantagesList.map((item, idx) => (
                <div
                  key={idx}
                  className="relative flex flex-col items-center text-center px-2 py-4"
                >
                  {/* VERTICAL DIVIDER */}
                  {idx !== advantagesList.length - 1 && (
                    <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-[80px] bg-[#d7d7d7]" />
                  )}

                  {/* ICON */}
                  <div className="w-[48px] h-[48px] md:w-[58px] md:h-[58px] mb-2 shrink-0 text-[#0f6a72] flex items-center justify-center">
                    <IconOrImageRenderer
                      icon={item.icon}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* TEXT */}
                  <p className="text-[#111827] text-[10px] sm:text-[12px] leading-[1.45] font-bold">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default FabricationBenefits;