import { useState } from "react";
import { toast } from "sonner";
import heroImg from "../../assets/arogyasangostiimageform/hero.png";
import arogyaLogo from "../../assets/arogyasangosti.png";

import { HeroSection } from "./ArogyaSanghosti/Hero";
import {
    BasicDetailsSection, ContactDetailsSection, SpeakerProfileSection,
    SessionDetailsSection, SpeakingExperienceSection, SupportingDetailsSection,
    ExpectationsSection, ConsentSection
} from "./ArogyaSanghosti/Sections";
import { BottomTagline, Footer } from "./ArogyaSanghosti/Footer";
import { API_URL } from "@/lib/api";

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

    const [isSubmitting, setIsSubmitting] = useState(false);

    // ─── FORM VALIDATION ──────────────────────────────────────────────────────
    const validateForm = () => {
        if (!form.fullName.trim()) {
            toast.error("Please enter your full name");
            return false;
        }
        if (!form.designation.trim()) {
            toast.error("Please enter your designation");
            return false;
        }
        if (!form.organization.trim()) {
            toast.error("Please enter your organization");
            return false;
        }
        if (!form.mobile.trim()) {
            toast.error("Please enter your mobile number");
            return false;
        }
        if (!form.email.trim()) {
            toast.error("Please enter your email");
            return false;
        }
        if (!form.city.trim()) {
            toast.error("Please enter your city");
            return false;
        }
        if (!form.briefProfile.trim()) {
            toast.error("Please enter your brief profile");
            return false;
        }
        if (!form.totalExperience.trim()) {
            toast.error("Please enter your total experience");
            return false;
        }
        if (form.expertise.length === 0) {
            toast.error("Please select at least one area of expertise");
            return false;
        }
        if (!form.preferredTopic.trim()) {
            toast.error("Please enter your preferred topic");
            return false;
        }
        if (!form.topicDescription.trim()) {
            toast.error("Please enter topic description");
            return false;
        }
        if (form.expectations.length === 0) {
            toast.error("Please select at least one expectation");
            return false;
        }
        if (!form.consent1) {
            toast.error("Please accept the terms and conditions");
            return false;
        }
        if (!form.consent2) {
            toast.error("Please accept the privacy policy");
            return false;
        }
        return true;
    };

    // ─── FORM SUBMISSION ──────────────────────────────────────────────────────
    const handleSubmit = async () => {
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            const response = await fetch(`${API_URL}/speaker`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form)
            });

            const data = await response.json();

            if (data.success) {
                toast.success(data.message || "Speaker application submitted successfully!");
                
                // Reset form
                setForm({
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
                    expertise: [],
                    preferredTrack: "ayush",
                    sessionType: "keynote",
                    spokenBefore: "No",
                    expectations: [],
                    consent1: false,
                    consent2: false,
                });
            } else {
                toast.error(data.message || "Failed to submit application");
            }
        } catch (error: any) {
            toast.error("Network error. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // ─── HANDLERS ─────────────────────────────────────────────────────────────
    const set = (key: string) => (val: string | boolean) => {
        setForm({ ...form, [key]: val });
    };

    const toggleExpertise = (area: string) => {
        setForm(prev => ({
            ...prev,
            expertise: prev.expertise.includes(area)
                ? prev.expertise.filter(a => a !== area)
                : [...prev.expertise, area]
        }));
    };

    const toggleExpectation = (opt: string) => {
        setForm(prev => ({
            ...prev,
            expectations: prev.expectations.includes(opt)
                ? prev.expectations.filter(o => o !== opt)
                : [...prev.expectations, opt]
        }));
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
                        <div style={{ display: "flex", flexDirection: "column", marginTop: "-37px" }}>
                            <div style={{ maxWidth: "98%" }}>
                                <BasicDetailsSection
                                    form={form}
                                    set={set}
                                    industryCategory={form.industryCategory}
                                    setIndustryCategory={(val: string) => set("industryCategory")(val)}
                                />
                            </div>
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
                                setPreferredTrack={(val: string) => set("preferredTrack")(val)}
                                sessionType={form.sessionType}
                                setSessionType={(val: string) => set("sessionType")(val)}
                            />
                            <SpeakingExperienceSection
                                form={form}
                                set={set}
                                spokenBefore={form.spokenBefore}
                                setSpokenBefore={(val: string) => set("spokenBefore")(val)}
                            />
                            <SupportingDetailsSection />
                            <ConsentSection
                                consent1={form.consent1}
                                setConsent1={(val: boolean) => set("consent1")(val)}
                                consent2={form.consent2}
                                setConsent2={(val: boolean) => set("consent2")(val)}
                            />
                            
                            {/* ── SUBMIT BUTTON ── */}
                            <div style={{ marginTop: "30px", marginBottom: "30px" }}>
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    style={{
                                        width: "100%",
                                        padding: "16px 32px",
                                        background: isSubmitting 
                                            ? "linear-gradient(135deg, #94a3b8 0%, #64748b 100%)"
                                            : "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "12px",
                                        fontSize: "18px",
                                        fontWeight: "600",
                                        cursor: isSubmitting ? "not-allowed" : "pointer",
                                        boxShadow: "0 4px 15px rgba(16, 185, 129, 0.3)",
                                        transition: "all 0.3s ease",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: "10px"
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isSubmitting) {
                                            e.currentTarget.style.transform = "translateY(-2px)";
                                            e.currentTarget.style.boxShadow = "0 6px 20px rgba(16, 185, 129, 0.4)";
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)";
                                        e.currentTarget.style.boxShadow = "0 4px 15px rgba(16, 185, 129, 0.3)";
                                    }}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span style={{
                                                width: "20px",
                                                height: "20px",
                                                border: "3px solid white",
                                                borderTopColor: "transparent",
                                                borderRadius: "50%",
                                                animation: "spin 1s linear infinite"
                                            }} />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            📝 Submit Application
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ── BOTTOM TAGLINE ── */}
                    <BottomTagline />
                </div>

                {/* ── FOOTER ── */}
                <Footer />
            </div>
            
            {/* ── SPINNER ANIMATION ── */}
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}