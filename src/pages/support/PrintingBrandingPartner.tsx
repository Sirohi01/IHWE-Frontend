import React, { useEffect, useState } from "react";
import heroBg from "../../assets/printing.jpeg";
import WhyPartner from "../../components/printingBrandingPartner/WhyPartner";
import StatCardsGroup from "../../components/printingBrandingPartner/StatsCardGroup";
import CardWithTagGroup from "../../components/printingBrandingPartner/CardWithTagGroup";
import AdvantageCardGroup from "../../components/printingBrandingPartner/AdvantageCardGroup";
import FloatingOfficialPartner from "../../components/printingBrandingPartner/FloatingOfficialPartner";
import PartnerShipBenefitCard from "@/components/printingBrandingPartner/PartnerShipBenefitCard";
import PricingFooter from "@/components/printingBrandingPartner/PrintingFooter";
import { printingBrandingPartnerApi, SERVER_URL } from "@/lib/api";
import SectionContainer from "@/components/layout/SectionContainer";



const PrintingBrandingPartner = () => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await printingBrandingPartnerApi.get();
                if (result) setData(result);
            } catch (error) {
                console.error("Failed to load printing branding partner data", error);
            }
        };
        fetchData();
    }, []);

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="w-8 h-8 border-4 border-[#0D0B61] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const hero = data.hero || {};

    // Resolve image URL — handle uploads paths from backend
    const resolveImg = (img: string) => {
        if (!img || img === '/images/printing.jpeg') return heroBg;
        const normalizedImg = img.replace(/\\/g, "/");
        if (normalizedImg.startsWith("http://") || normalizedImg.startsWith("https://")) return normalizedImg;
        if (normalizedImg.startsWith("/uploads") || normalizedImg.startsWith("uploads/")) {
            return `${SERVER_URL}${normalizedImg.startsWith("/") ? normalizedImg : `/${normalizedImg}`}`;
        }
        if (normalizedImg.startsWith("/")) {
            return `${SERVER_URL}${normalizedImg}`;
        }
        return normalizedImg;
    };

    const bgImage = resolveImg(hero.bgImage);
    const titleLines = hero.title.split(/\r?\n/);

    return (
        <div className="bg-white min-h-screen font-inter">
            <div className="min-h-[375px] bg-cover bg-center py-5" style={{ backgroundImage: `url("${bgImage}")` }}>
                <SectionContainer className="relative flex flex-col lg:block">
                    <div className="w-full lg:w-1/2 relative z-10 pb-8 lg:pb-0">
                        <div className="top-logo-and-text flex items-center gap-4">
                            <div className="flex items-start gap-4 w-full mb-0 pt-4 mt-[30px]">
                                <div className="flex items-center gap-[15px]">
                                    <div>
                                        <h1 className="text-[#0B2C66] font-black text-[16px] leading-[1.1] uppercase">
                                            International
                                            <br />
                                            <span className="text-[#4E9F3D]">Health &amp; Wellness</span>
                                            <br />
                                            Expo 2026
                                        </h1>
                                        <span className="bg-[#0B2C66] text-white text-[8px] px-[6px] py-[1px] rounded font-bold mt-0.5 inline-block uppercase tracking-widest">
                                            Global Edition
                                        </span>
                                    </div>
                                </div>
                                <div className="w-[1px] h-[70px] bg-gray-200 hidden lg:block" />
                                <div className="hidden lg:block">
                                    <p className="text-[#0B2C66] font-bold text-[20px] leading-[1.2] tracking-tight">
                                        Collaborate.
                                        <br />
                                        Connect.
                                        <br />
                                        <span className="text-[#4E9F3D]">Grow Together.</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2">
                            <h2 className="text-sm font-bold text-[#0D0B61] md:text-sm uppercase mb-2">{hero.subtitle}</h2>
                            {titleLines.map((line, index) => (
                                <h1
                                    key={index}
                                    className={`text-4xl font-bold md:text-4xl uppercase leading-6 ${index === 1 ? 'text-[#81912F]' : 'text-[#0D0B61]'}`}
                                >
                                    {line}
                                </h1>
                            ))}
                            <div className="w-[100px] h-[2px] bg-[#81912F]" />
                        </div>
                        <div className="my-4">
                            <p className="text-sm text-[#0D0B61] font-bold">{hero.shortDescription}</p>
                            <p className="text-sm text-[#0D0B61] max-w-[350px] mt-2">{hero.description}</p>
                        </div>
                    </div>
                    <FloatingOfficialPartner />
                    <WhyPartner items={data?.whyPartner} />
                </SectionContainer>
            </div>
            <SectionContainer>
                <div className="flex flex-col md:flex-row gap-4 mb-10">
                    <div className="w-full md:w-[70%]">
                        <StatCardsGroup items={data?.stats} />
                        <CardWithTagGroup items={data?.benefits} />
                        <div className="relative flex items-center flex-column py-4 mt-4">
                            <span className="flex-shrink mx-2 md:mx-4 text-[11px] md:text-sm font-bold bg-white px-2 uppercase absolute top-4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#1E104E] whitespace-nowrap">
                                Additional Advantages
                            </span>
                            <div className="flex-grow border border-gray-300 rounded-lg">
                                <AdvantageCardGroup items={data?.advantages} />
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-[30%] h-full mt-6 md:mt-0">
                        <div className="flex flex-col items-start justify-between gap-2 rounded-lg bg-[#0D0B61] pt-2 flex-1 border border-2 border-white h-full">
                            <div className="flex center items-center justify-center w-full h-full">
                                <h3 className="text-lg font-semibold text-white text-center uppercase">Partnership Packages</h3>
                            </div>
                            <div className="bg-white rounded-lg p-3 text-center flex items-center justify-between flex-col gap-2 border border-1 border-gray-300 w-full h-full flex-grow-1">
                                {(data?.packages || []).map((packageData: any, index: number) => (
                                    <PartnerShipBenefitCard
                                        key={index}
                                        color={packageData.color}
                                        title={packageData.title}
                                        icon={packageData.icon || undefined}
                                        price={packageData.price}
                                        list={packageData.list}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </SectionContainer>
            <PricingFooter footer={data?.footer} />
        </div>
    );
};

export default PrintingBrandingPartner;