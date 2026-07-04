import HealthcareHighlights from "@/components/conference/Day1/HealthCareHeighLightsts"
import PaperPresentationHero from "@/components/conference/paperPresentation/Hero"
import ImportantNotes from "@/components/conference/paperPresentation/ImportantNotes"
import ResearchBanner from "@/components/conference/paperPresentation/ResearchBanner"
import SubmissionGuidelinesSection from "@/components/conference/paperPresentation/SubmissionGuidelines"
import TimelineSection from "@/components/conference/paperPresentation/TimeLineSection"

const PaperPresentation: React.FC = () => {
    return (
        <div className="bg-white min-h-screen font-inter overflow-x-hidden">
            <PaperPresentationHero />
            <TimelineSection />
            <SubmissionGuidelinesSection />
            <ImportantNotes />
            <ResearchBanner />
            {/* <HealthcareHighlights /> */}
        </div>
    )
}
export default PaperPresentation