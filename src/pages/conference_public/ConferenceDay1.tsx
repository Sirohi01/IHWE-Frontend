import React, { useEffect } from "react";
import ConferenceStats from "../../components/conference/ConferenceStats";
import DistinguishedSpeakers from "../../components/conference/DistinguishedSpeakers";
import Day1Hero from "../../components/conference/Day1/Day1NewHero";
import Day1About from "../../components/conference/Day1/Day1NewAbout";
import Day1Agenda from "../../components/conference/Day1/Day1Agenda";
// import Day1CTA from "../../components/conference/Day1/Day1CTA";
import amanImage from "../../assets/bhiya.png";

const ConferenceDay1: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen font-inter overflow-x-hidden">
      <div className="relative">
        {/* 1. Hero Section */}
        <Day1Hero />

        {/* 2. Stats Section (Reused) */}
        <ConferenceStats />

        {/* 3. About & Focus Areas */}
        <Day1About />

        {/* 4. Agenda Table */}
        <Day1Agenda />

        {/* 5. Speaker Highlights (Reused/Filtered) */}
        <DistinguishedSpeakers title="SPEAKERS HIGHLIGHTS —" highlight="DAY 1" compact={true} />

        {/* 6. CTA Section */}
        {/* <Day1CTA /> */}
      </div>
    </div>
  );
};

export default ConferenceDay1;
