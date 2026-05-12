import React, { useState, useEffect } from "react";
import MPSchemeHero from "../../components/governmentMsmePmsSchemes/MPSchemeHero";
import StatsBand from "../../components/governmentMsmePmsSchemes/StatsBand";
import VerifyCheck from "../../components/governmentMsmePmsSchemes/VerifyCheck";
import CombineGrid from "../../components/governmentMsmePmsSchemes/CombineGrid";
import ExpensesIndustries from "../../components/governmentMsmePmsSchemes/ExpensesIndustries";
import WhyPart from "../../components/governmentMsmePmsSchemes/WhyPart";
import PmsApplicationModal from "../../components/governmentMsmePmsSchemes/PmsApplicationModal";

const GovernmentMsmePmsSchemes = () => {
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#f9faf9] overflow-x-hidden min-h-screen pb-10">
            
            {/* ── HERO ── */}
            <MPSchemeHero onApplyClick={() => setModalOpen(true)} />
            
            {/* ── STATS BAND ── */}
            <StatsBand />

            {/* ── QUICK ACCESS & SUBSIDY ── */}
            <VerifyCheck />

            {/* ── GRID: WHO, WHY, BENEFITS ── */}
            <CombineGrid />

            {/* ── EXPENSES & INDUSTRIES ── */}
            <ExpensesIndustries />

            {/* ── HOW IT WORKS, DOCUMENTS, CTA ── */}
            <WhyPart onApplyClick={() => setModalOpen(true)} />

            {/* ── APPLICATION FORM MODAL ── */}
            <PmsApplicationModal open={modalOpen} onClose={() => setModalOpen(false)} />

        </div>
    );
};

export default GovernmentMsmePmsSchemes;
