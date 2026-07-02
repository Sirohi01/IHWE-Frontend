import React from "react";
import AbstractPresentationHero from "../../components/conference/abstractPresentation/Hero";
import TimelineSection from "../../components/conference/abstractPresentation/TimeLineSection";
import AbstractSubmissionGuidelinesSection from "../../components/conference/abstractPresentation/SubmissionGuidelines";
import ImportantNotes from "../../components/conference/abstractPresentation/ImportantNotes";
import ResearchBanner from "../../components/conference/abstractPresentation/ResearchBanner";
import HealthcareHighlights from "../../components/conference/Day1/HealthCareHeighLightsts";

const AbstractPresentation: React.FC = () => {
    return (
        <div className="bg-white min-h-screen font-inter overflow-x-hidden">
            <AbstractPresentationHero />
            <TimelineSection />
            <AbstractSubmissionGuidelinesSection />
            <ImportantNotes />
            <ResearchBanner />
            <HealthcareHighlights />
        </div>
    );
};

export default AbstractPresentation;
