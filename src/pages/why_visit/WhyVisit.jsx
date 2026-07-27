import React from "react";
import WhyVisitHero from "@/components/why_visit/WhyVisitHero";
import ExperienceSection from "@/components/why_visit/ExperienceSection";
import InteractiveExperienceZones from "@/components/why_visit/InteractiveExperienceZones";
import WhoWillYouMeet from "@/components/why_visit/WhoWillYouMeet";
import VisitorPassAndGlance from "@/components/why_visit/VisitorPassAndGlance";
import VisitorTestimonialsAndCTA from "@/components/why_visit/VisitorTestimonialsAndCTA";

const WhyVisit = () => {
    return (
        <>
            <WhyVisitHero />
            <ExperienceSection />
            <WhoWillYouMeet />
            <InteractiveExperienceZones />
            <VisitorPassAndGlance />
            <VisitorTestimonialsAndCTA />
        </>
    )
}

export default WhyVisit;