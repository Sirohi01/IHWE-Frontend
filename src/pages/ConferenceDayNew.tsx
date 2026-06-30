import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import user from "../assets/day/user.webp"

import { api } from "@/lib/api";
import { Loader2 } from "lucide-react";
import day1HeroImg from "../assets/dayimagesarogyasangosti/design1.png";
import day2HeroImg from "../assets/dayimagesarogyasangosti/nista1.png";
import day3HeroImg from "../assets/dayimagesarogyasangosti/sagar.png";
import Day1Hero from "@/components/conference/Day1/Day1NewHero";
import DayAgendaSection from "@/components/conference/Day1/Day1NewAgenda";
import AboutDayOne from "@/components/conference/Day1/Day1NewAbout";
import OurSpeakersCarousel from "@/components/conference/Day1/OurSpeakers";
import PartnersAndActionsSection from "@/components/conference/Day1/PartnersAndActions";
import HealthcareHighlights from "@/components/conference/Day1/HealthCareHeighLightsts";

const ourSpeakers = [
  {
    name: "Dr. Maria Neira",
    role: "Director",
    company: "WHO",
    image: user,
    badge: "FEATURED",
  },
  {
    name: "Dr. Kevin Tan",
    role: "Founder & CEO",
    company: "HealthTech Asia",
    image: user,
    badge: "KEYNOTE",
  },
  {
    name: "Dr. Devi Shetty",
    role: "Chairman & Founder",
    company: "Narayana Health",
    image: user,
    badge: "SPEAKER",
  },
    {
    name: "Dr. Maria Neira",
    role: "Director",
    company: "WHO",
    image: user,
    badge: "FEATURED",
  },
  {
    name: "Dr. Kevin Tan",
    role: "Founder & CEO",
    company: "HealthTech Asia",
    image: user,
    badge: "KEYNOTE",
  },
  {
    name: "Dr. Devi Shetty",
    role: "Chairman & Founder",
    company: "Narayana Health",
    image: user,
    badge: "SPEAKER",
  },
    {
    name: "Dr. Maria Neira",
    role: "Director",
    company: "WHO",
    image: user,
    badge: "FEATURED",
  },
  {
    name: "Dr. Kevin Tan",
    role: "Founder & CEO",
    company: "HealthTech Asia",
    image: user,
    badge: "KEYNOTE",
  },
  {
    name: "Dr. Devi Shetty",
    role: "Chairman & Founder",
    company: "Narayana Health",
    image: user,
    badge: "SPEAKER",
  },
];

const ConferenceDayUnified: React.FC = () => {
  const { dayNumber } = useParams<{ dayNumber: string }>();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const currentDay = isNaN(parseInt(dayNumber || "")) ? 1 : parseInt(dayNumber || "1");

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDayData();
  }, [dayNumber]);

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
      
        <Day1Hero data={data.hero} defaultImage={getDefaultHeroImage()}/>
       

        {/* 3. About Section */}
        <div className="relative left-[20px]">
          <AboutDayOne data={data.about} />
        </div>

        {/* 4. Agenda & Featured Speakers */}
        <section className="bg-white py-4 relative left-[20px]">
          <div className="container mx-auto px-6 max-w-[1380px]">
            
                <DayAgendaSection
                  data={data} 
                  dayTitle={`${data.hero?.title} — ${data.hero?.date}`} 
                  dayNumber={currentDay}
                />
             
          </div>
        </section>
<OurSpeakersCarousel title="Our Speakers" subtitle="Check OUr Latest Speakers" speakers={ourSpeakers} />
<PartnersAndActionsSection />
<HealthcareHighlights />
       
      </div>
    </div>
  );
};

export default ConferenceDayUnified;
