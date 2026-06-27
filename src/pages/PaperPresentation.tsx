import HealthcareHighlights from "@/components/conference/Day1/HealthCareHeighLightsts"
import PaperPresentationHero from "@/components/conference/PaperPresentation/Hero"
import ImportantNotes from "@/components/conference/PaperPresentation/ImportantNotes"
import ResearchBanner from "@/components/conference/PaperPresentation/ResearchBanner"
import SubmissionGuidelinesSection from "@/components/conference/PaperPresentation/SubmissionGuidelines"
import TimelineSection from "@/components/conference/PaperPresentation/TimeLineSection"

const PaperPresentation: React.FC = () => {
    return (
        <div className="bg-white min-h-screen font-inter overflow-x-hidden">
            <PaperPresentationHero />
            <TimelineSection />
            <SubmissionGuidelinesSection/>
            <ImportantNotes />
            <ResearchBanner />
            <HealthcareHighlights />
        </div>
    )
}
export default PaperPresentation