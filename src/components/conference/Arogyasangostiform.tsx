import React, { useState } from "react";
import heroImg from "../../assets/arogyasangostiimageform/hero.png";
import arogyaLogo from "../../assets/arogyasangosti.png";

import { HeroSection } from "./ArogyaSanghosti/Hero";
import { 
    BasicDetailsSection, ContactDetailsSection, SpeakerProfileSection,
    SessionDetailsSection, SpeakingExperienceSection, SupportingDetailsSection,
    ExpectationsSection, ConsentSection
} from "./ArogyaSanghosti/Sections";
import { BottomTagline, Footer } from "./ArogyaSanghosti/Footer";

export default function ArogyaSanghostiForm() {
    // ─── STATE MANAGEMENT ─────────────────────────────────────────────────────
    const [form, setForm] = useState({
        fullName: "",
        designation: "",
        organization: "",
        mobile: "",
        email: "",
        city: "",
        linkedin: "",
        briefProfile: "",
        totalExperience: "",
        preferredTopic: "",
        topicDescription: "",
        eventDetails: "",
    });

    const [industryCategory, setIndustryCategory] = useState("Doctor");
    const [expertise, setExpertise] = useState<string[]>([]);
    const [preferredTrack, setPreferredTrack] = useState("ayush");
    const [sessionType, setSessionType] = useState("keynote");
    const [spokenBefore, setSpokenBefore] = useState("No");
    const [expectations, setExpectations] = useState<string[]>([]);
    const [consent1, setConsent1] = useState(false);
    const [consent2, setConsent2] = useState(false);

    // ─── HANDLERS ─────────────────────────────────────────────────────────────
    const set = (key: string) => (val: string) => setForm({ ...form, [key]: val });

    const toggleExpertise = (area: string) => {
        setExpertise(prev => prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area]);
    };

    const toggleExpectation = (opt: string) => {
        setExpectations(prev => prev.includes(opt) ? prev.filter(o => o !== opt) : [...prev, opt]);
    };

    return (
        <div style={{ background: "#F1F5F9", minHeight: "100vh" }}>
            <div
                style={{
                    fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
                    width: "100%",
                    background: "white",
                    overflow: "hidden",
                }}
            >
                {/* ── HEADER (HERO) ── */}
                <HeroSection heroImg={heroImg} arogyaLogo={arogyaLogo} />

                {/* ── MAIN CONTENT (FORM SECTIONS) ── */}
                <div style={{ 
                    marginTop: "-120px",
                    padding: "0 40px 80px 40px", 
                    position: "relative",
                    zIndex: 20
                }}>
                    
                    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 40, position: "relative", zIndex: 10 }}>
                        {/* LEFT COLUMN - Adjusted to not go too far UP */}
                        <div style={{ display: "flex", flexDirection: "column", marginTop: "-47px" }}>
                            <BasicDetailsSection 
                                form={form} 
                                set={set} 
                                industryCategory={industryCategory} 
                                setIndustryCategory={setIndustryCategory} 
                            />
                            <ContactDetailsSection 
                                form={form} 
                                set={set} 
                            />
                            <SpeakerProfileSection 
                                form={form} 
                                set={set} 
                                expertise={expertise} 
                                toggleExpertise={toggleExpertise} 
                            />
                        </div>

                        {/* RIGHT COLUMN */}
                        <div style={{ display: "flex", flexDirection: "column", marginTop: "120px" }}>
                            <SessionDetailsSection 
                                form={form} 
                                set={set} 
                                preferredTrack={preferredTrack} 
                                setPreferredTrack={setPreferredTrack}
                                sessionType={sessionType}
                                setSessionType={setSessionType}
                            />
                            <SpeakingExperienceSection 
                                form={form} 
                                set={set} 
                                spokenBefore={spokenBefore} 
                                setSpokenBefore={setSpokenBefore} 
                            />
                            <SupportingDetailsSection />
                            <ExpectationsSection 
                                expectations={expectations} 
                                toggleExpectation={toggleExpectation} 
                            />
                            <ConsentSection 
                                consent1={consent1} 
                                setConsent1={setConsent1} 
                                consent2={consent2} 
                                setConsent2={setConsent2} 
                            />
                        </div>
                    </div>

                    {/* ── BOTTOM TAGLINE ── */}
                    <BottomTagline />
                </div>

                {/* ── FOOTER ── */}
                <Footer />
            </div>
        </div>
    );
}