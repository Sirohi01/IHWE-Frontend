import React, { useState, useEffect } from "react";
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
        industryCategory: "Doctor",
        expertise: [] as string[],
        preferredTrack: "ayush",
        sessionType: "keynote",
        spokenBefore: "No",
        expectations: [] as string[],
        consent1: false,
        consent2: false,
    });

    // ─── CONSOLE LOG FOR BACKEND DEVELOPER ────────────────────────────────────
    useEffect(() => {
        console.log("\n" + "=".repeat(80));
        console.log("🚀 BACKEND DEVELOPER - API PAYLOAD REQUIRED");
        console.log("=".repeat(80));
        console.log("\n📋 FORM FIELDS NEEDED:\n");
        console.log(JSON.stringify({
            // Basic Details
            fullName: form.fullName || "string (required)",
            designation: form.designation || "string (required)",
            organization: form.organization || "string (required)",
            industryCategory: form.industryCategory || "string (required) - Doctor/Nurse/etc",
            
            // Contact Details
            mobile: form.mobile || "string (required)",
            email: form.email || "string (required)",
            city: form.city || "string (required)",
            linkedin: form.linkedin || "string (optional)",
            
            // Speaker Profile
            briefProfile: form.briefProfile || "string (required)",
            totalExperience: form.totalExperience || "string (required)",
            expertise: form.expertise.length > 0 ? form.expertise : ["array of strings (required)"],
            
            // Session Details
            preferredTopic: form.preferredTopic || "string (required)",
            topicDescription: form.topicDescription || "string (required)",
            preferredTrack: form.preferredTrack || "string (required) - ayush/allopathy/etc",
            sessionType: form.sessionType || "string (required) - keynote/panel/workshop",
            
            // Speaking Experience
            spokenBefore: form.spokenBefore || "string (required) - Yes/No",
            eventDetails: form.eventDetails || "string (optional)",
            
            // Expectations & Consent
            expectations: form.expectations.length > 0 ? form.expectations : ["array of strings (required)"],
            consent1: form.consent1 || "boolean (required)",
            consent2: form.consent2 || "boolean (required)",
        }, null, 2));
        console.log("\n" + "=".repeat(80) + "\n");
    }, [form]);

    // ─── HANDLERS ─────────────────────────────────────────────────────────────
    const set = (key: string) => (val: string | boolean) => {
        const updatedForm = { ...form, [key]: val };
        setForm(updatedForm);
        console.log("📝 Form Updated:", { field: key, value: val });
        console.log("🔍 Complete Form Data:", updatedForm);
    };

    const toggleExpertise = (area: string) => {
        setForm(prev => {
            const updatedExpertise = prev.expertise.includes(area) 
                ? prev.expertise.filter(a => a !== area) 
                : [...prev.expertise, area];
            const updatedForm = { ...prev, expertise: updatedExpertise };
            console.log("✅ Expertise Updated:", updatedExpertise);
            console.log("🔍 Complete Form Data:", updatedForm);
            return updatedForm;
        });
    };

    const toggleExpectation = (opt: string) => {
        setForm(prev => {
            const updatedExpectations = prev.expectations.includes(opt) 
                ? prev.expectations.filter(o => o !== opt) 
                : [...prev.expectations, opt];
            const updatedForm = { ...prev, expectations: updatedExpectations };
            console.log("🎯 Expectations Updated:", updatedExpectations);
            console.log("🔍 Complete Form Data:", updatedForm);
            return updatedForm;
        });
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
                    marginTop: "-128px",
                    padding: "0 10px 0 10px",
                    position: "relative",
                    zIndex: 20
                }}>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, position: "relative", zIndex: 10 }}>
                        {/* LEFT COLUMN - Adjusted down by 10px */}
                        <div style={{ display: "flex", flexDirection: "column", marginTop: "-35px" }}>
                            <BasicDetailsSection
                                form={form}
                                set={set}
                                industryCategory={form.industryCategory}
                                setIndustryCategory={(val) => set("industryCategory")(val)}
                            />
                            <ContactDetailsSection
                                form={form}
                                set={set}
                            />
                            <SpeakerProfileSection
                                form={form}
                                set={set}
                                expertise={form.expertise}
                                toggleExpertise={toggleExpertise}
                            />
                            <ExpectationsSection
                                expectations={form.expectations}
                                toggleExpectation={toggleExpectation}
                            />
                        </div>

                        {/* RIGHT COLUMN */}
                        <div style={{ display: "flex", flexDirection: "column", marginTop: "126px" }}>
                            <SessionDetailsSection
                                form={form}
                                set={set}
                                preferredTrack={form.preferredTrack}
                                setPreferredTrack={(val) => set("preferredTrack")(val)}
                                sessionType={form.sessionType}
                                setSessionType={(val) => set("sessionType")(val)}
                            />
                            <SpeakingExperienceSection
                                form={form}
                                set={set}
                                spokenBefore={form.spokenBefore}
                                setSpokenBefore={(val) => set("spokenBefore")(val)}
                            />
                            <SupportingDetailsSection />
                            <ConsentSection
                                consent1={form.consent1}
                                setConsent1={(val) => set("consent1")(val)}
                                consent2={form.consent2}
                                setConsent2={(val) => set("consent2")(val)}
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