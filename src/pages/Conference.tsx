import React from "react";
import ConferenceHero from "../components/conference/ConferenceHero";
import ConferenceStats from "../components/conference/ConferenceStats";
import WhyAttend from "../components/conference/WhyAttend";
import ConferenceTracks from "../components/conference/ConferenceTracks";
import MainConferences from "../components/conference/MainConferences";
import DistinguishedSpeakers from "../components/conference/DistinguishedSpeakers";
import ConferenceAgenda from "../components/conference/ConferenceAgenda";
import SponsorSection from "../components/conference/SponsorSection";
import IndustryVoices from "../components/conference/IndustryVoices";
import ConferenceCTA from "../components/conference/ConferenceCTA";

const Conference: React.FC = () => {
  return (
    <div className="bg-white min-h-screen font-inter overflow-x-hidden">

      <ConferenceHero />

      {/* 2. Stats Section */}
      <ConferenceStats />

      {/* 3. Why Attend Section */}
      <WhyAttend />

      {/* 4. Conference Tracks Section */}
      <ConferenceTracks />

      {/* 5. Main Conferences (Days Overview) */}
      <MainConferences />

      {/* 6. Distinguished Speakers */}
      <DistinguishedSpeakers />

      {/* 7. Detailed Agenda */}
      <ConferenceAgenda />

      {/* 8. Sponsor Section */}
      <SponsorSection />

      {/* 9. Industry Voices (Testimonials) */}
      <IndustryVoices />

      {/* 10. Final CTA */}
      <ConferenceCTA />
    </div>
  );
};

export default Conference;
