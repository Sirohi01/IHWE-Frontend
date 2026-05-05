import React from "react";
import MPSchemeHero from "../../components/governmentMsmePmsSchemes/MPSchemeHero";
import VerifyCheck from "../../components/governmentMsmePmsSchemes/VerifyCheck";
import WhyPart from "../../components/governmentMsmePmsSchemes/WhyPart";

const GovernmentMsmePmsSchemes = () => {
    return (
        <div className="bg-[#FCFCFA]">
            <MPSchemeHero />
            <VerifyCheck />
            <WhyPart />
        </div>
    );
};

export default GovernmentMsmePmsSchemes;