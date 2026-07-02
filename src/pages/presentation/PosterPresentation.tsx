import React from "react";
import PosterPresentationHero from "../../components/conference/posterPresentation/Hero";
import TimelineSection from "../../components/conference/posterPresentation/TimeLineSection";
import PosterSubmissionGuidelinesSection from "../../components/conference/posterPresentation/SubmissionGuidelines";
import ImportantNotes from "../../components/conference/posterPresentation/ImportantNotes";
import ResearchBanner from "../../components/conference/posterPresentation/ResearchBanner";
import HealthcareHighlights from "../../components/conference/Day1/HealthCareHeighLightsts";

const PosterPresentation: React.FC = () => {
    return (
        <div className="bg-white min-h-screen font-inter overflow-x-hidden">
            <PosterPresentationHero />
            <TimelineSection />
            <PosterSubmissionGuidelinesSection />
            <ImportantNotes />
            <ResearchBanner />
            <HealthcareHighlights />
        </div>
    );
};

export default PosterPresentation;
