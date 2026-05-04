import React, { useEffect } from "react";
import ConferenceStats from "../components/conference/ConferenceStats";
import DistinguishedSpeakers from "../components/conference/DistinguishedSpeakers";
import Day2Hero from "../components/conference/Day2/Day2Hero";
import Day2About from "../components/conference/Day2/Day2About";
import Day2Agenda from "../components/conference/Day2/Day2Agenda";
import Day2CTA from "../components/conference/Day2/Day2CTA";

const ConferenceDay2: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen font-inter overflow-x-hidden">
      <div className="relative">
        {/* 1. Hero Section */}
        <Day2Hero />

        {/* 2. Stats Section (Reused) */}
        <ConferenceStats />

        {/* 3. About & Focus Areas */}
        <Day2About />

        {/* 4. Agenda Table */}
        <Day2Agenda />

        {/* 5. Speaker Highlights (Reused/Filtered) */}
        <DistinguishedSpeakers title="SPEAKERS HIGHLIGHTS —" highlight="DAY 2" />

        {/* 6. CTA Section */}
        <Day2CTA />
      </div>
    </div>
  );
};

export default ConferenceDay2;
