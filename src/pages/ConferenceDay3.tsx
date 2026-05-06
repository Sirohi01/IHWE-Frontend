import React, { useEffect } from "react";
import ConferenceStats from "../components/conference/ConferenceStats";
import Day3Hero from "../components/conference/Day3/Day3Hero";
import Day3About from "../components/conference/Day3/Day3About";
import Day3Details from "../components/conference/Day3/Day3Details";
import Day3Agenda from "../components/conference/Day3/Day3Agenda";
import Day3FeaturedSpeakers from "../components/conference/Day3/Day3FeaturedSpeakers";
import Day3Sponsors from "../components/conference/Day3/Day3Sponsors";
import Day3CTA from "../components/conference/Day3/Day3CTA";
import Day3BottomCTA from "../components/conference/Day3/Day3BottomCTA";
import Day3Footer from "../components/conference/Day3/Day3Footer";

const ConferenceDay3: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen font-inter overflow-x-hidden">
      <div className="relative">
        {/* 1. Hero Section */}
        <Day3Hero />

        {/* 2. Stats Section (same as Day 1 & Day 2) */}
        <ConferenceStats />

        {/* 3. About Day 3 */}
        <div className="relative left-[20px]">
          <Day3About />
        </div>

        {/* 4. Agenda & Featured Speakers (Side-by-Side, no gap) */}
        <section className="bg-white py-4 relative left-[20px]">
          <div className="container mx-auto px-6 max-w-[1380px]">
            <div className="flex flex-col xl:flex-row gap-6 items-stretch">
              {/* Agenda — 62% */}
              <div className="w-full xl:w-[62%]">
                <Day3Agenda />
              </div>

              <div className="w-full xl:w-[38%]">
                <Day3FeaturedSpeakers />
              </div>
            </div>
          </div>
        </section>

        {/* 5. Attendee Details (Who, Why, Exhibition, Sponsor) */}
        <div className="relative left-[20px]">
          <Day3Details />
        </div>

        {/* 6. Partner/Sponsor Pricing Table */}
        <div className="relative left-[20px]">
          <Day3Sponsors />
        </div>

        {/* 7. Collaboration Banner */}
        <div className="relative left-[20px]">
          <Day3BottomCTA />
        </div>

        {/* 8. Final Call-to-Action Cards */}
        <div className="relative left-[20px]">
          <Day3CTA />
        </div>

        {/* 9. Production Footer Bar */}
        <div className="relative left-[20px]">
          <Day3Footer />
        </div>
      </div>
    </div>
  );
};

export default ConferenceDay3;
