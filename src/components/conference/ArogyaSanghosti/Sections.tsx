import React from "react";
import {
    SectionHeader, SectionBox, FormField, CategoryChip, TrackChip, SessionChip, ExpertiseChip,
    TEAL, GOLD, TEXT_DARK, BORDER_COLOR, TRACK_BG
} from "./Shared";
import {
    IconPerson, IconPhone, IconMobile, IconEmail, IconLocation, IconLinkedIn,
    IconCalendar, IconMic, IconGroup, IconChat, IconDoc, IconBuild, IconUpload,
    IconStar, IconShield, LeafIcon, PillIcon, ChipIcon, WellnessIcon, HospMgmtIcon,
    ResearchIcon, PolicyIcon, AyushTrackIcon, MedicalIcon, BothIcon,
    DoctorIcon, AyushIcon, HospitalIcon, UnivIcon, PharmaIcon, StartupIcon, OtherDotsIcon
} from "./Icons";


import doctorImg from "../../../assets/arogyasangostiimageform/Doctor (1).webp";
import ayushIconImg from "../../../assets/arogyasangostiimageform/Ayush (1).webp";
import hospitalImg from "../../../assets/arogyasangostiimageform/Hospital.webp";
import universityImg from "../../../assets/arogyasangostiimageform/University (1).webp";
import pharmaImg from "../../../assets/arogyasangostiimageform/pharma (1).webp";
import startupImg from "../../../assets/arogyasangostiimageform/Startup.webp";

import ayurvedaImg from "../../../assets/arogyasangostiimageform/ayurveda (2).webp";
import modernMedImg from "../../../assets/arogyasangostiimageform/modern medicine.webp";
import digitalHealthImg from "../../../assets/arogyasangostiimageform/Digital Helth  ai (2).webp";
import wellnessImg from "../../../assets/arogyasangostiimageform/wellness & lifestyle.webp";
import hospMgmtImg from "../../../assets/arogyasangostiimageform/hospital management.webp";
import researchImg from "../../../assets/arogyasangostiimageform/Research & education.webp";
import policyImg from "../../../assets/arogyasangostiimageform/Policy  government.webp";

import ayushWellnessImg from "../../../assets/arogyasangostiimageform/Ayush & Wellness (1).webp";
import medicalHealthcareImg from "../../../assets/arogyasangostiimageform/Medical & Health care.webp";
import bothImg from "../../../assets/arogyasangostiimageform/both (1).webp";

import keynoteImg from "../../../assets/arogyasangostiimageform/keynote.webp";
import panelImg from "../../../assets/arogyasangostiimageform/Panel Dicusion.webp";
import expertImg from "../../../assets/arogyasangostiimageform/Expert.webp";

import speakerPhotoImg from "../../../assets/arogyasangostiimageform/speaker photo.webp";
import companyLogoImg from "../../../assets/arogyasangostiimageform/company logo.webp";
import presentationImg from "../../../assets/arogyasangostiimageform/presentation.webp";

import expectationImg from "../../../assets/arogyasangostiimageform/leaf-removebg-preview.webp";
import consentImg from "../../../assets/arogyasangostiimageform/ChatGPT Image May 1, 2026, 05_33_52 PM (1).webp";


import headerBasicImg from "../../../assets/arogyasangostiimageform/Basic Details (1).webp";
import headerContactImg from "../../../assets/arogyasangostiimageform/Contact Deatils.webp";
import headerSpeakerImg from "../../../assets/arogyasangostiimageform/Speacker Profile.webp";
import headerSessionImg from "../../../assets/arogyasangostiimageform/Session Deatils.webp";
import headerSpeakingExpImg from "../../../assets/arogyasangostiimageform/speaking profile.webp";
import headerSupportingImg from "../../../assets/arogyasangostiimageform/supporting details.webp";
import headerExpectationImg from "../../../assets/arogyasangostiimageform/Expectation.webp";
import headerConsentImg from "../../../assets/arogyasangostiimageform/Consent.webp";


export const BasicDetailsSection = ({ form, set, industryCategory, setIndustryCategory }: any) => {
    const categories = [
        { label: "Doctor", icon: <img loading="lazy" decoding="async" src={doctorImg} alt="Doctor" style={{ width: 48, height: 48, objectFit: "contain" }} /> },
        { label: "AYUSH Practitioner", icon: <img loading="lazy" decoding="async" src={ayushIconImg} alt="AYUSH" style={{ width: 48, height: 48, objectFit: "contain" }} /> },
        { label: "Hospital", icon: <img loading="lazy" decoding="async" src={hospitalImg} alt="Hospital" style={{ width: 48, height: 48, objectFit: "contain" }} /> },
        { label: "University / Academic", icon: <img loading="lazy" decoding="async" src={universityImg} alt="University" style={{ width: 48, height: 48, objectFit: "contain" }} /> },
        { label: "Pharma / Healthcare Company", icon: <img loading="lazy" decoding="async" src={pharmaImg} alt="Pharma" style={{ width: 48, height: 48, objectFit: "contain" }} /> },
        { label: "Startup / Innovator", icon: <img loading="lazy" decoding="async" src={startupImg} alt="Startup" style={{ width: 48, height: 48, objectFit: "contain" }} /> },
        { label: "Other", icon: <OtherDotsIcon /> },
    ];

    return (
        <SectionBox style={{ width: "var(--left-box-width, 90%)", marginLeft: "var(--left-box-margin-left, 70px)" }}>
            <SectionHeader number="01" title="Basic Details" icon={<IconPerson size={24} color="white" />} />
            <FormField label="Full Name" value={form.fullName} onChange={set("fullName")} lettersOnly />
            <FormField label="Designation" value={form.designation} onChange={set("designation")} />
            <FormField label="Organization / Institution" value={form.organization} onChange={set("organization")} />

            <div style={{ marginTop: 10 }}>
                <div style={{ fontSize: 12, color: TEXT_DARK, fontWeight: 700, marginBottom: 8 }}>
                    Industry Category <span style={{ color: "#94A3B8", fontWeight: 400 }}>(Select one)</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "var(--chip-grid-cols, repeat(3, 1fr))", gap: 12 }}>
                    {categories.map((cat) => (
                        <CategoryChip
                            key={cat.label}
                            label={cat.label}
                            icon={cat.icon}
                            selected={industryCategory === cat.label}
                            onClick={() => setIndustryCategory(cat.label)}
                        />
                    ))}
                </div>
                {industryCategory === "Other" && (
                    <div style={{ marginTop: 16 }}>
                        <FormField label="Please specify your industry" value={form.otherIndustryCategory || ""} onChange={set("otherIndustryCategory")} />
                    </div>
                )}
            </div>
        </SectionBox>
    );
};


export const ContactDetailsSection = ({ form, set }: any) => (
    <SectionBox style={{ width: "var(--left-box-width, 90%)", marginLeft: "var(--left-box-margin-left, 70px)" }}>
        <SectionHeader number="02" title="Contact Details" icon={<IconPhone size={24} color="white" />} />
        <FormField label="Mobile Number" icon={<IconMobile size={22} />} value={form.mobile} onChange={set("mobile")} type="tel" />
        <FormField label="Email Address" icon={<IconEmail size={22} />} value={form.email} onChange={set("email")} type="email" />
        <FormField label="City / Country" icon={<IconLocation size={22} />} value={form.city} onChange={set("city")} lettersOnly />
        <FormField label="LinkedIn Profile (if any)" icon={<IconLinkedIn size={22} />} value={form.linkedin} onChange={set("linkedin")} />
    </SectionBox>
);


export const SpeakerProfileSection = ({ form, set, expertise, toggleExpertise }: any) => {
    const expertiseAreas = [
        { label: "Ayurveda", icon: <img loading="lazy" decoding="async" src={ayurvedaImg} alt="Ayurveda" style={{ width: 20, height: 20, objectFit: "contain" }} /> },
        { label: "Modern Medicine", icon: <img loading="lazy" decoding="async" src={modernMedImg} alt="Modern Medicine" style={{ width: 20, height: 20, objectFit: "contain" }} /> },
        { label: "Digital Health / AI", icon: <img loading="lazy" decoding="async" src={digitalHealthImg} alt="Digital Health" style={{ width: 20, height: 20, objectFit: "contain" }} /> },
        { label: "Wellness & Lifestyle", icon: <img loading="lazy" decoding="async" src={wellnessImg} alt="Wellness" style={{ width: 20, height: 20, objectFit: "contain" }} /> },
        { label: "Hospital Management", icon: <img loading="lazy" decoding="async" src={hospMgmtImg} alt="Hospital Mgmt" style={{ width: 20, height: 20, objectFit: "contain" }} /> },
        { label: "Research & Education", icon: <img loading="lazy" decoding="async" src={researchImg} alt="Research" style={{ width: 20, height: 20, objectFit: "contain" }} /> },
        { label: "Policy / Government", icon: <img loading="lazy" decoding="async" src={policyImg} alt="Policy" style={{ width: 20, height: 20, objectFit: "contain" }} /> },
        { label: "Other", icon: <OtherDotsIcon /> },
    ];

    return (
        <SectionBox style={{ width: "var(--left-box-width, 90%)", marginLeft: "var(--left-box-margin-left, 70px)" }}>
            <SectionHeader number="03" title="Speaker Profile" icon={<IconMic size={20} color="white" />} gold />
            <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 12, color: TEXT_DARK, fontWeight: 700, marginBottom: 4 }}>
                    Brief Profile <span style={{ color: "#94A3B8", fontWeight: 400 }}>(100–150 words)</span>
                </div>
                <div style={{ border: `1.2px solid ${BORDER_COLOR}`, borderRadius: 8, padding: "6px 8px", minHeight: 45, display: "flex", flexDirection: "column", gap: 4 }}>
                    <IconPerson size={16} color={TEAL} />
                    <textarea
                        value={form.briefProfile}
                        onChange={(e) => set("briefProfile")(e.target.value)}
                        rows={2}
                        style={{ border: "none", outline: "none", resize: "none", width: "100%", fontSize: 12, fontFamily: "'Segoe UI', sans-serif", color: TEXT_DARK, background: "transparent" }}
                        placeholder="Write your brief profile..."
                    />
                </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <span style={{ fontSize: 12, color: TEXT_DARK, fontWeight: 700 }}>Total Experience (Years)</span>
                <input
                    type="number"
                    value={form.totalExperience}
                    onChange={(e) => set("totalExperience")(e.target.value)}
                    style={{ width: 80, border: `1.2px solid ${BORDER_COLOR}`, borderRadius: 6, padding: "6px 10px", fontSize: 13, outline: "none", fontFamily: "'Segoe UI', sans-serif" }}
                />
            </div>
            <div>
                <div style={{ fontSize: 12, color: TEXT_DARK, fontWeight: 700, marginBottom: 8 }}>
                    Areas of Expertise <span style={{ color: "#94A3B8", fontWeight: 400 }}>(Select all that apply)</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "var(--chip-grid-cols, repeat(3, 1fr))", gap: 12 }}>
                    {expertiseAreas.map((area) => (
                        <ExpertiseChip
                            key={area.label}
                            label={area.label}
                            icon={area.icon}
                            selected={expertise.includes(area.label)}
                            onClick={() => toggleExpertise(area.label)}
                        />
                    ))}
                </div>
            </div>
        </SectionBox>
    );
};

// ─── Section 04: Session Details ──────────────────────────────────────────────
export const SessionDetailsSection = ({ form, set, preferredTrack, setPreferredTrack, sessionType, setSessionType }: any) => (
    <SectionBox style={{ width: "var(--right-box-width, 90%)", marginLeft: "var(--right-box-margin-left, 30px)" }}>
        <SectionHeader number="04" title="Session Details" icon={<IconChat size={20} color="white" />} />
        <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: TEXT_DARK, fontWeight: 700, marginBottom: 12 }}>
                Preferred Track <span style={{ color: "#94A3B8", fontWeight: 400 }}>(Select one)</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "var(--track-grid-cols, repeat(3, 1fr))", gap: 10 }}>
                {[
                    { label: "AYUSH &\nWellness", key: "ayush", icon: <img loading="lazy" decoding="async" src={ayushWellnessImg} alt="AYUSH" style={{ width: 32, height: 32, objectFit: "contain" }} /> },
                    { label: "Medical &\nHealthcare", key: "medical", icon: <img loading="lazy" decoding="async" src={medicalHealthcareImg} alt="Medical" style={{ width: 32, height: 32, objectFit: "contain" }} /> },
                    { label: "Both", key: "both", icon: <img loading="lazy" decoding="async" src={bothImg} alt="Both" style={{ width: 32, height: 32, objectFit: "contain" }} /> },
                ].map((t) => (
                    <TrackChip
                        key={t.key}
                        label={t.label}
                        icon={t.icon}
                        selected={preferredTrack === t.key}
                        onClick={() => setPreferredTrack(t.key)}
                    />
                ))}
            </div>
        </div>
        <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 13, color: TEXT_DARK, fontWeight: 700, marginBottom: 8 }}>Preferred Topic / Title of Talk</div>
            <div style={{ border: `1.2px solid ${BORDER_COLOR}`, borderRadius: 8, padding: "8px 12px", display: "flex", alignItems: "center", gap: 10 }}>
                <IconDoc size={18} color={TEAL} />
                <input value={form.preferredTopic} onChange={(e) => set("preferredTopic")(e.target.value)} placeholder="Enter your talk title..." style={{ flex: 1, border: "none", outline: "none", fontSize: 13, fontFamily: "'Segoe UI', sans-serif", color: TEXT_DARK }} />
            </div>
        </div>
        <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 13, color: TEXT_DARK, fontWeight: 700, marginBottom: 12 }}>Session Type <span style={{ color: "#94A3B8", fontWeight: 400 }}>(Select one)</span></div>
            <div style={{ display: "grid", gridTemplateColumns: "var(--session-grid-cols, repeat(3, 1fr))", gap: 10 }}>
                {[
                    { label: "Keynote", key: "keynote", icon: <img loading="lazy" decoding="async" src={keynoteImg} alt="Keynote" style={{ width: 32, height: 32, objectFit: "contain" }} /> },
                    { label: "Panel Discussion", key: "panel", icon: <img loading="lazy" decoding="async" src={panelImg} alt="Panel" style={{ width: 32, height: 32, objectFit: "contain" }} /> },
                    { label: "Expert Talk", key: "expert", icon: <img loading="lazy" decoding="async" src={expertImg} alt="Expert" style={{ width: 32, height: 32, objectFit: "contain" }} /> },
                ].map((s) => (
                    <SessionChip key={s.key} label={s.label} icon={s.icon} selected={sessionType === s.key} onClick={() => setSessionType(s.key)} />
                ))}
            </div>
        </div>
        <div>
            <div style={{ fontSize: 13, color: TEXT_DARK, fontWeight: 700, marginBottom: 6 }}>Brief Description of Topic <span style={{ color: "#94A3B8", fontWeight: 400 }}>(100–200 words)</span></div>
            <div style={{ border: `1.2px solid ${BORDER_COLOR}`, borderRadius: 8, padding: 8, display: "flex", flexDirection: "column", gap: 6 }}>
                <IconDoc size={18} color={TEAL} />
                <textarea value={form.topicDescription} onChange={(e) => set("topicDescription")(e.target.value)} rows={3} style={{ border: "none", outline: "none", resize: "none", width: "100%", fontSize: 12, fontFamily: "'Segoe UI', sans-serif", color: TEXT_DARK, background: "transparent" }} placeholder="Describe your topic briefly..." />
            </div>
        </div>
    </SectionBox>
);

// ─── Section 05: Speaking Experience ──────────────────────────────────────────
export const SpeakingExperienceSection = ({ form, set, spokenBefore, setSpokenBefore }: any) => (
    <SectionBox style={{ width: "var(--right-box-width, 90%)", marginLeft: "var(--right-box-margin-left, 30px)" }}>
        <SectionHeader number="05" title="Speaking Experience" icon={<IconStar size={20} color="white" />} />
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 15 }}>
            <span style={{ fontSize: 13, color: TEXT_DARK, fontWeight: 700 }}>Have you spoken at conferences before?</span>
            <div style={{ display: "flex", gap: 15 }}>
                {["Yes", "No"].map((opt) => (
                    <label key={opt} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, color: TEXT_DARK, cursor: "pointer", fontWeight: 500 }}>
                        <input type="checkbox" checked={spokenBefore === opt} onChange={() => setSpokenBefore(opt)} style={{ accentColor: TEAL, width: 16, height: 16 }} />
                        {opt}
                    </label>
                ))}
            </div>
        </div>
        {spokenBefore === "Yes" ? (
            <div>
                <div style={{ fontSize: 13, color: TEXT_DARK, fontWeight: 700, marginBottom: 8 }}>If Yes, mention details <span style={{ color: "#94A3B8", fontWeight: 400 }}>(Event Name / Organization / Year)</span></div>
                <div style={{ border: `1.5px solid ${BORDER_COLOR}`, borderRadius: 8, padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                    <HospMgmtIcon size={20} />
                    <textarea value={form.eventDetails} onChange={(e) => set("eventDetails")(e.target.value)} rows={3} style={{ border: "none", outline: "none", resize: "none", width: "100%", fontSize: 13, fontFamily: "'Segoe UI', sans-serif", color: TEXT_DARK, background: "transparent" }} placeholder="Event Name, Organization, Year..." />
                </div>
            </div>
        ) : (
            <div style={{ border: `1.5px dashed ${BORDER_COLOR}`, borderRadius: 10, padding: 15, display: "flex", alignItems: "center", gap: 10, minHeight: 70, color: "#94A3B8", fontSize: 13, background: "#F8FAFC" }}>
                <HospMgmtIcon size={20} />
                <span>Select Yes above to enter event details</span>
            </div>
        )}
    </SectionBox>
);

// ─── Section 06: Supporting Details ───────────────────────────────────────────
export const SupportingDetailsSection = ({ files, setFiles }: { files: any; setFiles: any }) => {
    const items = [
        {
            key: "speakerPhoto",
            label: "Speaker Photo\n(HD)",
            sub: "JPG, PNG",
            icon: <img loading="lazy" decoding="async" src={speakerPhotoImg} alt="Speaker" style={{ width: 40, height: 40, objectFit: "contain" }} />,
            accept: ".jpg,.jpeg,.png",
        },
        {
            key: "companyLogo",
            label: "Company Logo\n(if applicable)",
            sub: "JPG, PNG",
            icon: <img loading="lazy" decoding="async" src={companyLogoImg} alt="Company" style={{ width: 40, height: 40, objectFit: "contain" }} />,
            accept: ".jpg,.jpeg,.png",
        },
        {
            key: "presentation",
            label: "Presentation\n(optional)",
            sub: "PPT, PDF (10MB)",
            icon: <img loading="lazy" decoding="async" src={presentationImg} alt="Presentation" style={{ width: 40, height: 40, objectFit: "contain" }} />,
            accept: ".ppt,.pptx,.pdf",
        },
    ];

    return (
        <SectionBox style={{ width: "var(--right-box-width, 90%)", marginLeft: "var(--right-box-margin-left, 30px)" }}>
            <SectionHeader number="06" title="Supporting Details" icon={<IconUpload size={20} color="white" />} />
            <div style={{ fontSize: 11, color: TEXT_DARK, fontWeight: 700, marginBottom: 6 }}>Please upload / provide the following:</div>
            <div style={{ display: "grid", gridTemplateColumns: "var(--support-grid-cols, 1fr 1fr 1fr)", gap: 10 }}>
                {items.map((item) => {
                    const selectedFile: File | null = files[item.key];
                    return (
                        <div key={item.key} style={{ border: `1px solid ${BORDER_COLOR}`, borderRadius: 10, padding: "6px 4px", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, background: TRACK_BG }}>
                            {item.icon}
                            <div style={{ textAlign: "center", fontSize: 9, color: TEXT_DARK, fontWeight: 700, lineHeight: 1.2 }}>
                                {item.label.split("\n").map((l, i) => <div key={i}>{l}</div>)}
                            </div>
                            <label style={{ background: selectedFile ? "#059669" : TEAL, color: "white", border: "none", borderRadius: 4, padding: "4px 12px", fontSize: 9, fontWeight: 700, cursor: "pointer", fontFamily: "'Segoe UI', sans-serif", maxWidth: "90%", textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                {selectedFile ? selectedFile.name : "Upload"}
                                <input
                                    type="file"
                                    style={{ display: "none" }}
                                    accept={item.accept}
                                    onChange={(e) => {
                                        const f = e.target.files?.[0] || null;
                                        setFiles((prev: any) => ({ ...prev, [item.key]: f }));
                                    }}
                                />
                            </label>
                            <div style={{ fontSize: 8, color: "#94A3B8", textAlign: "center" }}>{item.sub}</div>
                        </div>
                    );
                })}
            </div>
            <div style={{ fontSize: 9, color: "#94A3B8", marginTop: 4, fontStyle: "italic" }}>Formats: JPG, PNG, PDF, PPT (Max 10MB)</div>
        </SectionBox>
    );
};

// ─── Section 07: Expectations ─────────────────────────────────────────────────
export const ExpectationsSection = ({ expectations, toggleExpectation }: any) => (
    <SectionBox style={{ width: "var(--left-box-width, 90%)", marginLeft: "var(--left-box-margin-left, 70px)", minHeight: "130px", paddingBottom: "10px", display: "flex", flexDirection: "column" }}>
        <SectionHeader number="07" title="Expectations" icon={<IconGroup size={20} color="white" />} gold />
        <div style={{ display: "flex", justifyContent: "space-between", flex: 1, marginTop: "8px" }}>
            <div style={{ flex: 1, paddingBottom: 10, alignSelf: "flex-start" }}>
                <div style={{ fontSize: 13, color: TEXT_DARK, fontWeight: 700, marginBottom: 12 }}>Are you open for:</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {[
                        "Sponsored Speaking Slot",
                        "Panel Participation",
                        "Knowledge Session Only",
                    ].map((opt) => (
                        <label key={opt} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: TEXT_DARK, cursor: "pointer", fontFamily: "'Segoe UI', sans-serif", fontWeight: 500 }}>
                            <input type="checkbox" checked={expectations.includes(opt)} onChange={() => toggleExpectation(opt)} style={{ accentColor: TEAL, width: 16, height: 16 }} />
                            {opt}
                        </label>
                    ))}
                </div>
            </div>
            <img loading="lazy" decoding="async" src={expectationImg} alt="Expectations" style={{ width: 110, objectFit: "contain", marginRight: "-10px", marginBottom: "-10px", mixBlendMode: "multiply", alignSelf: "flex-end", display: "var(--illustration-display, block)" }} />
        </div>
    </SectionBox>
);

// ─── Section 08: Consent ──────────────────────────────────────────────────────
export const ConsentSection = ({ consent1, setConsent1, consent2, setConsent2, onSubmit, isSubmitting }: any) => (
    <SectionBox style={{ width: "var(--right-box-width, 90%)", marginLeft: "var(--right-box-margin-left, 30px)", minHeight: "130px", paddingBottom: "10px", display: "flex", flexDirection: "column" }}>
        <SectionHeader number="08" title="Consent" icon={<IconShield size={20} color="white" />} />
        <div style={{ display: "flex", justifyContent: "space-between", flex: 1 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingBottom: 10, flex: 1, alignSelf: "flex-start" }}>
                {[
                    { state: consent1, set: setConsent1, label: "I confirm that the above information is correct" },
                    { state: consent2, set: setConsent2, label: "I agree to be contacted by the organizing team" },
                ].map((c) => (
                    <label key={c.label} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: TEXT_DARK, cursor: "pointer", fontWeight: 600 }}>
                        <input type="checkbox" checked={c.state} onChange={(e) => c.set(e.target.checked)} style={{ accentColor: TEAL, width: 18, height: 18 }} />
                        {c.label}
                    </label>
                ))}
                
                <div style={{ marginTop: 10 }}>
                    <button
                        style={{
                            background: GOLD,
                            color: "white",
                            border: "none",
                            borderRadius: 6,
                            padding: "10px 24px",
                            fontSize: 14,
                            fontWeight: 700,
                            cursor: isSubmitting ? "not-allowed" : "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            fontFamily: "'Segoe UI', sans-serif",
                            letterSpacing: 0.5,
                            boxShadow: "0 4px 15px rgba(234, 179, 8, 0.3)",
                            transition: "transform 0.2s ease",
                        }}
                        onClick={onSubmit}
                        disabled={isSubmitting}
                        onMouseEnter={(e) => !isSubmitting && (e.currentTarget.style.transform = "translateY(-2px)")}
                        onMouseLeave={(e) => !isSubmitting && (e.currentTarget.style.transform = "translateY(0)")}
                    >
                        {isSubmitting ? (
                            <>
                                <span style={{
                                    width: "16px",
                                    height: "16px",
                                    border: "2px solid white",
                                    borderTopColor: "transparent",
                                    borderRadius: "50%",
                                    animation: "spin 1s linear infinite"
                                }} />
                                Submitting...
                            </>
                        ) : (
                            <>
                                SUBMIT APPLICATION
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                                </svg>
                            </>
                        )}
                    </button>
                </div>
            </div>
            <img loading="lazy" decoding="async" src={consentImg} alt="Consent" style={{ width: 130, objectFit: "contain", marginRight: "-10px", marginBottom: "-10px", mixBlendMode: "multiply", alignSelf: "flex-end", display: "var(--illustration-display, block)" }} />
        </div>
    </SectionBox>
);
