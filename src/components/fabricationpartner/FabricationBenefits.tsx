import React from 'react'

const FabricationBenefits = () => {
  return (
    <div>
      {/* BENEFITS SECTION */}
<section className="bg-white">
  <div className="max-w-[1450px] mx-auto">

    {/* TOP CARDS */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

      {[
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
      ].map((item, idx) => (
        <div
          key={idx}
          className="rounded-[16px] overflow-hidden border border-[#d8d8d8] bg-[#fafafa] shadow-sm hover:shadow-lg transition-all duration-300"
        >

          {/* HEADER */}
          <div
            className="h-[36px] flex items-center justify-center"
            style={{
              background: `linear-gradient(180deg, ${item.color} 0%, ${item.color}dd 100%)`,
            }}
          >
            <h3 className="text-white text-[14px] md:text-[15px] font-semibold uppercase tracking-[0.5px] text-center">
              {item.title}
            </h3>
          </div>

          {/* BODY */}
          <div className="px-4 py-2 flex flex-col items-center text-center min-h-[150px]">

            {/* ICON */}
            <div className="w-[62px] h-[62px] flex items-center justify-center mb-2">
              <img
                src={item.icon}
                alt={item.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* DESC */}
            <p className="text-[#111827] text-[12px] leading-[1.55]">
              {item.desc}
            </p>

          </div>

        </div>
      ))}

    </div>

    {/* ADDITIONAL ADVANTAGES */}
    <div className="mt-2 border border-[#69aeb3] rounded-[18px] bg-[#fcfcfc] overflow-hidden">

      {/* TITLE */}
      <div className="flex items-center justify-center gap-5">

        <div className="h-[1px] w-[120px] bg-[#69aeb3]" />

        <h3 className="text-[#111827] text-[16px] md:text-[22px] font-black uppercase tracking-[1px]">
          Additional Advantages
        </h3>

        <div className="h-[1px] w-[120px] bg-[#69aeb3]" />

      </div>

      {/* ITEMS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">

        {[
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
            icon: "/images/partnership/chart.png",
            text: "Year-round visibility through pre & post event promotions",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="relative flex flex-col items-center text-center px-2 py-3"
          >

            {/* VERTICAL DIVIDER */}
            {idx !== 5 && (
              <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-[80px] bg-[#d7d7d7]" />
            )}

            {/* ICON */}
            <div className="w-[58px] h-[58px] mb-1">
              <img
                src={item.icon}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>

            {/* TEXT */}
            <p className="text-[#111827] text-[12px] leading-[1.45]">
              {item.text}
            </p>

          </div>
        ))}

      </div>

    </div>

  </div>
</section>
    </div>
  )
}

export default FabricationBenefits