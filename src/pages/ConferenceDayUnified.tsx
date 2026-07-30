import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
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
import { api } from "@/lib/api";
import { Loader2 } from "lucide-react";
import day1HeroImg from "../assets/dayimagesarogyasangosti/design1.webp";
import day2HeroImg from "../assets/dayimagesarogyasangosti/nista1.webp";
import day3HeroImg from "../assets/dayimagesarogyasangosti/sagar.webp";

const ConferenceDayUnified: React.FC = () => {
  const { dayNumber } = useParams<{ dayNumber: string }>();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const dayMatch = (dayNumber || "1").match(/^(?:day-)?([1-3])$/);
  const currentDay = dayMatch ? Number(dayMatch[1]) : 1;
  const canonicalPath = `/conference/day-${currentDay}`;
  const shouldNormalizeUrl = !dayMatch || dayNumber !== `day-${currentDay}`;

  useEffect(() => {
    if (shouldNormalizeUrl) return;
    window.scrollTo(0, 0);
    fetchDayData();
  }, [dayNumber, shouldNormalizeUrl]);

  const fetchDayData = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/api/conference-days/${currentDay}`);
      if (response.data.success) {
        setData(response.data.data);
        setError(null);
      } else {
        setError("Failed to load conference data.");
      }
    } catch (err: any) {
      console.error("Error fetching conference day data:", err);
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  if (shouldNormalizeUrl) {
    return <Navigate to={canonicalPath} replace />;
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <Loader2 className="w-12 h-12 text-[#4E9F3D] animate-spin mb-4" />
        <h2 className="text-xl font-black text-[#0B2C66] uppercase tracking-widest">Loading Day {currentDay} Content...</h2>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6 text-center">
        <h2 className="text-2xl font-black text-red-500 mb-4">OOPS!</h2>
        <p className="text-gray-600 mb-8 max-w-md">{error || "Something went wrong while loading the page."}</p>
        <button onClick={fetchDayData} className="px-8 py-3 bg-[#0B2C66] text-white rounded-full font-bold uppercase tracking-widest">Try Again</button>
      </div>
    );
  }

  const getDefaultHeroImage = () => {
    if (currentDay === 1) return day1HeroImg;
    if (currentDay === 2) return day2HeroImg;
    return day3HeroImg;
  };

  return (
    <div className="bg-white min-h-screen font-inter overflow-x-hidden">
      <div className="relative">
        {/* 1. Hero Section */}
        <Day3Hero data={data.hero} defaultImage={getDefaultHeroImage()} />

        {/* 2. Stats Section */}
        <ConferenceStats />

        {/* 3. About Section */}
        <div className="relative left-[20px]">
          <Day3About data={data.about} />
        </div>

        {/* 4. Agenda & Featured Speakers */}
        <section className="bg-white py-4 relative left-[20px]">
          <div className="container mx-auto px-6 max-w-[1380px]">
            <div className="flex flex-col xl:flex-row gap-6 items-stretch">
              <div className="w-full xl:w-[62%]">
                <Day3Agenda 
                  data={data.agenda} 
                  dayTitle={`${data.hero?.title} — ${data.hero?.date}`} 
                  dayNumber={currentDay}
                />
              </div>
              <div className="w-full xl:w-[38%]">
                <Day3FeaturedSpeakers 
                  data={data.featuredSpeakers} 
                  dayNumber={currentDay}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 5. Details Section (Fixed content for now as per design) */}
        {currentDay === 3 && (
          <>
            <div className="relative left-[20px]">
              <Day3Details />
            </div>

            {/* 6. Sponsors Section (Fixed content) */}
            <div className="relative left-[20px]">
              <Day3Sponsors />
            </div>

            {/* 7. Bottom CTA Banner (Fixed content) */}
            <div className="relative left-[20px]">
              <Day3BottomCTA />
            </div>
          </>
        )}

        {/* 8. Call-to-Action Cards */}
        <Day3CTA data={data.cta} />

        {/* 9. Footer Bar */}
        {currentDay === 3 && (
          <div className="relative left-[20px]">
            <Day3Footer />
          </div>
        )}
      </div>
    </div>
  );
};

export default ConferenceDayUnified;
