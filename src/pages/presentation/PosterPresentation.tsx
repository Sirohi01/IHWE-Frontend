import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "@/lib/api";
import PosterPresentationHero from "../../components/conference/posterPresentation/Hero";
import TimelineSection from "../../components/conference/posterPresentation/TimeLineSection";
import PosterSubmissionGuidelinesSection from "../../components/conference/posterPresentation/SubmissionGuidelines";
import ImportantNotes from "../../components/conference/posterPresentation/ImportantNotes";
import ResearchBanner from "../../components/conference/posterPresentation/ResearchBanner";
import HealthcareHighlights from "../../components/conference/Day1/HealthCareHeighLightsts";

const PosterPresentation: React.FC = () => {
    const [data, setData] = useState<any>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${API_URL}/poster-presentation`);
                if (res.data.success) {
                    setData(res.data.data);
                }
            } catch (error) {
                console.error("Error fetching poster presentation data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="bg-white min-h-screen font-inter overflow-x-hidden">
            <PosterPresentationHero />
            <TimelineSection data={data} />
            <PosterSubmissionGuidelinesSection data={data} />
            <ImportantNotes data={data} />
            <ResearchBanner />
            <HealthcareHighlights />
        </div>
    );
};

export default PosterPresentation;
