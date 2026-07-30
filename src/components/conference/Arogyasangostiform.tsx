import { useState } from "react";
import { toast } from "sonner";
import heroImg from "../../assets/arogyasangostiimageform/name.jpg.webp";
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

            const contentType = response.headers.get("content-type") || "";
            const data = contentType.includes("application/json")
                ? await response.json()
                : { success: false, message: await response.text() };

            if (response.ok && data.success) {
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
                toast.error(data.message || `Failed to submit application (${response.status})`);
            }
        } catch (error: any) {
            toast.error(error?.message || "Network error. Please try again.");
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
            <style>{`
                /* Global responsive variables for Speaker Registration Form */
                :root {
                    --section-width: 90%;
                    --left-box-width: 90%;
                    --left-box-margin-left: 70px;
                    --right-box-width: 90%;
                    --right-box-margin-left: 30px;
                    --grid-margin-top: -131px;
                    --grid-padding: 0 10px;
                    --grid-cols: 1fr 1fr;
                    --grid-gap: 40px;
                    --left-col-margin-top: -37px;
                    --right-col-margin-top: 126px;
                    --chip-grid-cols: repeat(3, 1fr);
                    --track-grid-cols: repeat(3, 1fr);
                    --session-grid-cols: repeat(3, 1fr);
                    --support-grid-cols: 1fr 1fr 1fr;
                    --field-flex-dir: row;
                    --field-align-items: center;
                    --field-gap: 10px;
                    --field-label-width: 180px;
                    --field-input-width: auto;
                    --field-colon-display: inline;
                    --illustration-display: block;
                    --tagline-margin-x: 70px;
                    --tagline-flex-dir: row;
                    --tagline-grid-cols: repeat(5, 1fr);
                    --tagline-text-align: left;
                    --footer-top-padding: 6px 80px;
                    --footer-top-flex-dir: row;
                    --footer-top-justify: space-between;
                    --footer-top-width: auto;
                    --queries-flex-dir: row;
                    --queries-items-flex-dir: row;
                    --queries-items-align: center;
                    --queries-gap: 16px;
                    --footer-bottom-padding: 15px 80px;
                    --footer-bottom-flex-dir: row;
                    --footer-bottom-text-align: left;
                    --footer-bottom-right-flex-dir: row;
                    --footer-bottom-right-width: auto;
                    --footer-buttons-flex-dir: row;
                    --footer-buttons-width: auto;
                    
                    --hero-logo-height: 20vw;
                    --hero-logo-min-height: 160px;
                    --hero-sub-size: 1.1vw;
                    --hero-title-size: 4.5vw;
                    --hero-title-sub-size: 2vw;
                    --hero-padding: 3.5% 6%;
                }
                
                @media (max-width: 1024px) {
                    :root {
                        --section-width: 100%;
                        --left-box-width: 100%;
                        --left-box-margin-left: 0px;
                        --right-box-width: 100%;
                        --right-box-margin-left: 0px;
                        --grid-margin-top: 15px;
                        --grid-padding: 0 12px;
                        --grid-cols: 1fr;
                        --grid-gap: 24px;
                        --left-col-margin-top: 0px;
                        --right-col-margin-top: 0px;
                        --chip-grid-cols: repeat(2, 1fr);
                        --track-grid-cols: 1fr;
                        --session-grid-cols: 1fr;
                        --support-grid-cols: 1fr;
                        --field-flex-dir: column;
                        --field-align-items: flex-start;
                        --field-gap: 6px;
                        --field-label-width: 100%;
                        --field-input-width: 100%;
                        --field-colon-display: none;
                        --illustration-display: none;
                        --tagline-margin-x: 12px;
                        --tagline-flex-dir: column;
                        --tagline-grid-cols: repeat(2, 1fr);
                        --tagline-text-align: center;
                        --footer-top-padding: 16px 12px;
                        --footer-top-flex-dir: column;
                        --footer-top-justify: center;
                        --footer-top-width: 100%;
                        --queries-flex-dir: column;
                        --queries-items-flex-dir: column;
                        --queries-items-align: flex-start;
                        --queries-gap: 12px;
                        --footer-bottom-padding: 20px 12px;
                        --footer-bottom-flex-dir: column;
                        --footer-bottom-text-align: center;
                        --footer-bottom-right-flex-dir: column;
                        --footer-bottom-right-width: 100%;
                        --footer-buttons-flex-dir: column;
                        --footer-buttons-width: 100%;
                        
                        --hero-logo-height: 15vw;
                        --hero-logo-min-height: 60px;
                        --hero-sub-size: 2.2vw;
                        --hero-title-size: 6vw;
                        --hero-title-sub-size: 3.5vw;
                        --hero-padding: 4% 8%;
                    }
                }
                
                @media (max-width: 480px) {
                    :root {
                        --chip-grid-cols: repeat(2, 1fr);
                        --tagline-grid-cols: 1fr;
                        --hero-logo-min-height: 50px;
                        --hero-sub-size: 2.8vw;
                        --hero-title-size: 7.5vw;
                        --hero-title-sub-size: 4vw;
                    }
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
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
                    marginTop: "var(--grid-margin-top, -131px)",
                    padding: "var(--grid-padding, 0 10px 0 10px)",
                    position: "relative",
                    zIndex: 20
                }}>

                    <div style={{ display: "grid", gridTemplateColumns: "var(--grid-cols, 1fr 1fr)", gap: "var(--grid-gap, 40px)", position: "relative", zIndex: 10 }}>

                        <div style={{ display: "flex", flexDirection: "column", marginTop: "var(--left-col-margin-top, -37px)" }}>
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
                        <div style={{ display: "flex", flexDirection: "column", marginTop: "var(--right-col-margin-top, 126px)" }}>
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
                                onSubmit={handleSubmit}
                                isSubmitting={isSubmitting}
                            />

                            {/* Submit button moved to Footer */}
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
