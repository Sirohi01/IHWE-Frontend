import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../lib/api";
import AbstractPresentationHero from "../../components/conference/abstractPresentation/Hero";
import TimelineSection from "../../components/conference/abstractPresentation/TimeLineSection";
import AbstractSubmissionGuidelinesSection from "../../components/conference/abstractPresentation/SubmissionGuidelines";
import ImportantNotes from "../../components/conference/abstractPresentation/ImportantNotes";
import ResearchBanner from "../../components/conference/abstractPresentation/ResearchBanner";
import HealthcareHighlights from "../../components/conference/Day1/HealthCareHeighLightsts";

const AbstractPresentation: React.FC = () => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/abstract-presentation`);
                setData(response.data.data);
            } catch (error) {
                console.error("Error fetching abstract presentation data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="bg-white min-h-screen font-inter overflow-x-hidden">
            <AbstractPresentationHero />
            <TimelineSection data={data} />
            <AbstractSubmissionGuidelinesSection data={data} />
            <ImportantNotes data={data} />
            <ResearchBanner />
            <HealthcareHighlights />
        </div>
    );
};

export default AbstractPresentation;
