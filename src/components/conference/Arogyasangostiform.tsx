import { useState } from "react";
import { toast } from "sonner";
import heroImg from "../../assets/arogyasangostiimageform/name.jpg.jpeg";
import arogyaLogo from "../../assets/arogyasangostilogo/compressed_arogyasangosti.webp";

import { HeroSection } from "./ArogyaSanghosti/Hero";
import {
    BasicDetailsSection, ContactDetailsSection, SpeakerProfileSection,
    SessionDetailsSection, SpeakingExperienceSection, SupportingDetailsSection,
    ExpectationsSection, ConsentSection
} from "./ArogyaSanghosti/Sections";
import { BottomTagline, Footer } from "./ArogyaSanghosti/Footer";
import { API_URL } from "@/lib/api";

export default function ArogyaSanghostiForm() {

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
        otherIndustryCategory: "",
        expertise: [] as string[],
        preferredTrack: "ayush",
        sessionType: "keynote",
        spokenBefore: "No",
        expectations: [] as string[],
        consent1: false,
        consent2: false,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [files, setFiles] = useState<{ speakerPhoto: File | null; companyLogo: File | null; presentation: File | null }>({
        speakerPhoto: null,
        companyLogo: null,
        presentation: null,
    });


    const validateForm = () => {
        const nameRegex = /^[a-zA-Z\s.''-]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobileRegex = /^[+]?[\d\s\-()]{7,15}$/;
        const urlRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/.+/i;

        // ── Full Name ──
        if (!form.fullName.trim()) {
            toast.error("Full Name is required.");
            return false;
        }
        if (!nameRegex.test(form.fullName.trim())) {
            toast.error("Full Name must contain only letters — no numbers or special characters.");
            return false;
        }
        if (form.fullName.trim().length < 3) {
            toast.error("Full Name must be at least 3 characters.");
            return false;
        }

        // ── Designation ──
        if (!form.designation.trim()) {
            toast.error("Designation is required.");
            return false;
        }
        if (/^\d+$/.test(form.designation.trim())) {
            toast.error("Designation cannot be only numbers.");
            return false;
        }

        // ── Organization ──
        if (!form.organization.trim()) {
            toast.error("Organization / Institution is required.");
            return false;
        }
        if (/^\d+$/.test(form.organization.trim())) {
            toast.error("Organization name cannot be only numbers.");
            return false;
        }

        // ── Industry Category ──
        if (form.industryCategory === "Other" && !form.otherIndustryCategory.trim()) {
            toast.error("Please specify your industry category.");
            return false;
        }

        // ── Mobile ──
        if (!form.mobile.trim()) {
            toast.error("Mobile Number is required.");
            return false;
        }
        if (!mobileRegex.test(form.mobile.trim())) {
            toast.error("Please enter a valid mobile number (7–15 digits).");
            return false;
        }

        // ── Email ──
        if (!form.email.trim()) {
            toast.error("Email Address is required.");
            return false;
        }
        if (!emailRegex.test(form.email.trim())) {
            toast.error("Please enter a valid email address (e.g. name@domain.com).");
            return false;
        }

        // ── City ──
        if (!form.city.trim()) {
            toast.error("City / Country is required.");
            return false;
        }
        if (!nameRegex.test(form.city.trim())) {
            toast.error("City / Country must contain only letters.");
            return false;
        }

        // ── LinkedIn (optional but must be valid if provided) ──
        if (form.linkedin.trim() && !urlRegex.test(form.linkedin.trim())) {
            toast.error("LinkedIn URL must be a valid linkedin.com link.");
            return false;
        }

        // ── Brief Profile ──
        if (!form.briefProfile.trim()) {
            toast.error("Brief Profile is required.");
            return false;
        }

        // ── Total Experience ──
        if (!form.totalExperience.trim()) {
            toast.error("Total Experience is required.");
            return false;
        }
        const exp = Number(form.totalExperience.trim());
        if (isNaN(exp) || exp < 0 || exp > 60) {
            toast.error("Total Experience must be a number between 0 and 60.");
            return false;
        }

        // ── Expertise ──
        if (form.expertise.length === 0) {
            toast.error("Please select at least one area of expertise.");
            return false;
        }

        // ── Preferred Topic ──
        if (!form.preferredTopic.trim()) {
            toast.error("Preferred Topic / Title of Talk is required.");
            return false;
        }

        // ── Topic Description ──
        if (!form.topicDescription.trim()) {
            toast.error("Brief Description of Topic is required.");
            return false;
        }


        // ── Expectations ──
        if (form.expectations.length === 0) {
            toast.error("Please select at least one expectation.");
            return false;
        }

        // ── Consent ──
        if (!form.consent1) {
            toast.error("Please confirm that the information provided is correct.");
            return false;
        }
        if (!form.consent2) {
            toast.error("Please agree to be contacted by the organizing team.");
            return false;
        }
        return true;
    };


    const handleSubmit = async () => {
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            const formData = new FormData();
            // Append all text fields
            Object.entries(form).forEach(([key, val]) => {
                if (Array.isArray(val)) {
                    formData.append(key, JSON.stringify(val));
                } else {
                    formData.append(key, String(val));
                }
            });
            // Append files if selected
            if (files.speakerPhoto) formData.append('speakerPhoto', files.speakerPhoto);
            if (files.companyLogo) formData.append('companyLogo', files.companyLogo);
            if (files.presentation) formData.append('presentation', files.presentation);

            const response = await fetch(`${API_URL}/speaker`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                toast.success(data.message || "Speaker application submitted successfully!");

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
                    otherIndustryCategory: "",
                    expertise: [],
                    preferredTrack: "ayush",
                    sessionType: "keynote",
                    spokenBefore: "No",
                    expectations: [],
                    consent1: false,
                    consent2: false,
                });
                setFiles({ speakerPhoto: null, companyLogo: null, presentation: null });
            } else {
                toast.error(data.message || "Failed to submit application");
            }
        } catch (error: any) {
            toast.error("Network error. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };


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

                <HeroSection heroImg={heroImg} arogyaLogo={arogyaLogo} />


                <div style={{
                    marginTop: "-131px",
                    padding: "0 10px 0 10px",
                    position: "relative",
                    zIndex: 20
                }}>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, position: "relative", zIndex: 10 }}>

                        <div style={{ display: "flex", flexDirection: "column", marginTop: "-37px" }}>
                            <BasicDetailsSection
                                form={form}
                                set={set}
                                industryCategory={form.industryCategory}
                                setIndustryCategory={(val: string) => set("industryCategory")(val)}
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
                            <SupportingDetailsSection files={files} setFiles={setFiles} />
                            <ConsentSection
                                consent1={form.consent1}
                                setConsent1={(val: boolean) => set("consent1")(val)}
                                consent2={form.consent2}
                                setConsent2={(val: boolean) => set("consent2")(val)}
                            />

                            {/* ── SUBMIT BUTTON ── */}
                            <div style={{ marginTop: "30px", marginBottom: "30px", display: "flex", justifyContent: "center" }}>
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    style={{
                                        width: "auto",
                                        minWidth: "250px",
                                        padding: "12px 24px",
                                        background: isSubmitting
                                            ? "linear-gradient(135deg, #94a3b8 0%, #64748b 100%)"
                                            : "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "10px",
                                        fontSize: "16px",
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