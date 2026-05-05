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
      <ConferenceStats />
      <WhyAttend />
      <ConferenceTracks />
      <MainConferences />
      <DistinguishedSpeakers />
      <ConferenceAgenda />
      <SponsorSection />
      <IndustryVoices />
      <ConferenceCTA />
    </div>
  );
};

export default Conference;
