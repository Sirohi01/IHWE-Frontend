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

// ─── IMAGE IMPORTS ────────────────────────────────────────────────────────
import doctorImg from "../../../assets/arogyasangostiimageform/Doctor (1).png";
import ayushIconImg from "../../../assets/arogyasangostiimageform/Ayush (1).png";
import hospitalImg from "../../../assets/arogyasangostiimageform/Hospital.png";
import universityImg from "../../../assets/arogyasangostiimageform/University (1).png";
import pharmaImg from "../../../assets/arogyasangostiimageform/pharma (1).png";
import startupImg from "../../../assets/arogyasangostiimageform/Startup.png";

import ayurvedaImg from "../../../assets/arogyasangostiimageform/ayurveda (2).png";
import modernMedImg from "../../../assets/arogyasangostiimageform/modern medicine.png";
import digitalHealthImg from "../../../assets/arogyasangostiimageform/Digital Helth  ai (2).png";
import wellnessImg from "../../../assets/arogyasangostiimageform/wellness & lifestyle.png";
import hospMgmtImg from "../../../assets/arogyasangostiimageform/hospital management.png";
import researchImg from "../../../assets/arogyasangostiimageform/Research & education.png";
import policyImg from "../../../assets/arogyasangostiimageform/Policy  government.png";

import ayushWellnessImg from "../../../assets/arogyasangostiimageform/Ayush & Wellness (1).png";
import medicalHealthcareImg from "../../../assets/arogyasangostiimageform/Medical & Health care.png";
import bothImg from "../../../assets/arogyasangostiimageform/both (1).png";

import keynoteImg from "../../../assets/arogyasangostiimageform/keynote.png";
import panelImg from "../../../assets/arogyasangostiimageform/Panel Dicusion.png";
import expertImg from "../../../assets/arogyasangostiimageform/Expert.png";

import speakerPhotoImg from "../../../assets/arogyasangostiimageform/speaker photo.png";
import companyLogoImg from "../../../assets/arogyasangostiimageform/company logo.png";
import presentationImg from "../../../assets/arogyasangostiimageform/presentation.png";

import expectationImg from "../../../assets/arogyasangostiimageform/Expectation.png";
import consentImg from "../../../assets/arogyasangostiimageform/Consent.png";

// Header Icon Imports
import headerBasicImg from "../../../assets/arogyasangostiimageform/Basic Details (1).png";
import headerContactImg from "../../../assets/arogyasangostiimageform/Contact Deatils.png";
import headerSpeakerImg from "../../../assets/arogyasangostiimageform/Speacker Profile.png";
import headerSessionImg from "../../../assets/arogyasangostiimageform/Session Deatils.png";
import headerSpeakingExpImg from "../../../assets/arogyasangostiimageform/speaking profile.png";
import headerSupportingImg from "../../../assets/arogyasangostiimageform/supporting details.png";
import headerExpectationImg from "../../../assets/arogyasangostiimageform/Expectation.png";
import headerConsentImg from "../../../assets/arogyasangostiimageform/Consent.png";


export const BasicDetailsSection = ({ form, set, industryCategory, setIndustryCategory }: any) => {
    const categories = [
        { label: "Doctor", icon: <img src={doctorImg} alt="Doctor" style={{ width: 64, height: 64, objectFit: "contain" }} /> },
        { label: "AYUSH Practitioner", icon: <img src={ayushIconImg} alt="AYUSH" style={{ width: 64, height: 64, objectFit: "contain" }} /> },
        { label: "Hospital", icon: <img src={hospitalImg} alt="Hospital" style={{ width: 64, height: 64, objectFit: "contain" }} /> },
        { label: "University / Academic", icon: <img src={universityImg} alt="University" style={{ width: 64, height: 64, objectFit: "contain" }} /> },
        { label: "Pharma / Healthcare Company", icon: <img src={pharmaImg} alt="Pharma" style={{ width: 64, height: 64, objectFit: "contain" }} /> },
        { label: "Startup / Innovator", icon: <img src={startupImg} alt="Startup" style={{ width: 64, height: 64, objectFit: "contain" }} /> },
        { label: "Other", icon: <OtherDotsIcon /> },
    ];

    return (
        <SectionBox>
            <SectionHeader number="01" title="Basic Details" icon={<img src={headerBasicImg} alt="Basic" style={{ width: 30, height: 30 }} />} />
            <FormField label="Full Name" value={form.fullName} onChange={set("fullName")} />
            <FormField label="Designation" value={form.designation} onChange={set("designation")} />
            <FormField label="Organization / Institution" value={form.organization} onChange={set("organization")} />

            <div style={{ marginTop: 15 }}>
                <div style={{ fontSize: 13, color: TEXT_DARK, fontWeight: 700, marginBottom: 16 }}>
                    Industry Category <span style={{ color: "#94A3B8", fontWeight: 400 }}>(Select one)</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
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
            </div>
        </SectionBox>
    );
};

// ─── Section 02: Contact Details ──────────────────────────────────────────────
export const ContactDetailsSection = ({ form, set }: any) => (
    <SectionBox>
        <SectionHeader number="02" title="Contact Details" icon={<img src={headerContactImg} alt="Contact" style={{ width: 30, height: 30 }} />} />
        <FormField label="Mobile Number" icon={<IconMobile size={18} />} value={form.mobile} onChange={set("mobile")} type="tel" />
        <FormField label="Email Address" icon={<IconEmail size={18} />} value={form.email} onChange={set("email")} type="email" />
        <FormField label="City / Country" icon={<IconLocation size={18} />} value={form.city} onChange={set("city")} />
        <FormField label="LinkedIn Profile (if any)" icon={<IconLinkedIn size={18} />} value={form.linkedin} onChange={set("linkedin")} />
    </SectionBox>
);

// ─── Section 03: Speaker Profile ──────────────────────────────────────────────
export const SpeakerProfileSection = ({ form, set, expertise, toggleExpertise }: any) => {
    const expertiseAreas = [
        { label: "Ayurveda", icon: <img src={ayurvedaImg} alt="Ayurveda" style={{ width: 48, height: 48, objectFit: "contain" }} /> },
        { label: "Modern Medicine", icon: <img src={modernMedImg} alt="Modern Medicine" style={{ width: 48, height: 48, objectFit: "contain" }} /> },
        { label: "Digital Health / AI", icon: <img src={digitalHealthImg} alt="Digital Health" style={{ width: 48, height: 48, objectFit: "contain" }} /> },
        { label: "Wellness & Lifestyle", icon: <img src={wellnessImg} alt="Wellness" style={{ width: 48, height: 48, objectFit: "contain" }} /> },
        { label: "Hospital Management", icon: <img src={hospMgmtImg} alt="Hospital Mgmt" style={{ width: 48, height: 48, objectFit: "contain" }} /> },
        { label: "Research & Education", icon: <img src={researchImg} alt="Research" style={{ width: 48, height: 48, objectFit: "contain" }} /> },
        { label: "Policy / Government", icon: <img src={policyImg} alt="Policy" style={{ width: 48, height: 48, objectFit: "contain" }} /> },
        { label: "Other", icon: <OtherDotsIcon /> },
    ];

    return (
        <SectionBox>
            <SectionHeader number="03" title="Speaker Profile" icon={<img src={headerSpeakerImg} alt="Speaker" style={{ width: 30, height: 30 }} />} gold />
            <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 13, color: TEXT_DARK, fontWeight: 700, marginBottom: 8 }}>
                    Brief Profile <span style={{ color: "#94A3B8", fontWeight: 400 }}>(100–150 words)</span>
                </div>
                <div style={{ border: `1.2px solid ${BORDER_COLOR}`, borderRadius: 8, padding: 8, minHeight: 70, display: "flex", flexDirection: "column", gap: 6 }}>
                    <IconPerson size={18} color={TEAL} />
                    <textarea
                        value={form.briefProfile}
                        onChange={(e) => set("briefProfile")(e.target.value)}
                        rows={3}
                        style={{ border: "none", outline: "none", resize: "none", width: "100%", fontSize: 12, fontFamily: "'Segoe UI', sans-serif", color: TEXT_DARK, background: "transparent" }}
                        placeholder="Write your brief profile..."
                    />
                </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                <span style={{ fontSize: 13, color: TEXT_DARK, fontWeight: 700 }}>Total Experience (Years)</span>
                <input
                    type="number"
                    value={form.totalExperience}
                    onChange={(e) => set("totalExperience")(e.target.value)}
                    style={{ width: 80, border: `1.2px solid ${BORDER_COLOR}`, borderRadius: 6, padding: "6px 10px", fontSize: 13, outline: "none", fontFamily: "'Segoe UI', sans-serif" }}
                />
            </div>
            <div>
                <div style={{ fontSize: 13, color: TEXT_DARK, fontWeight: 700, marginBottom: 16 }}>
                    Areas of Expertise <span style={{ color: "#94A3B8", fontWeight: 400 }}>(Select all that apply)</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
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
    <SectionBox>
        <SectionHeader number="04" title="Session Details" icon={<img src={headerSessionImg} alt="Session" style={{ width: 30, height: 30 }} />} />
        <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: TEXT_DARK, fontWeight: 700, marginBottom: 12 }}>
                Preferred Track <span style={{ color: "#94A3B8", fontWeight: 400 }}>(Select one)</span>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
                {[
                    { label: "AYUSH &\nWellness", key: "ayush", icon: <img src={ayushWellnessImg} alt="AYUSH" style={{ width: 54, height: 54, objectFit: "contain" }} /> },
                    { label: "Medical &\nHealthcare", key: "medical", icon: <img src={medicalHealthcareImg} alt="Medical" style={{ width: 54, height: 54, objectFit: "contain" }} /> },
                    { label: "Both", key: "both", icon: <img src={bothImg} alt="Both" style={{ width: 54, height: 54, objectFit: "contain" }} /> },
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
            <div style={{ display: "flex", gap: 10 }}>
                {[
                    { label: "Keynote", key: "keynote", icon: <img src={keynoteImg} alt="Keynote" style={{ width: 50, height: 50, objectFit: "contain" }} /> },
                    { label: "Panel Discussion", key: "panel", icon: <img src={panelImg} alt="Panel" style={{ width: 50, height: 50, objectFit: "contain" }} /> },
                    { label: "Expert Talk", key: "expert", icon: <img src={expertImg} alt="Expert" style={{ width: 50, height: 50, objectFit: "contain" }} /> },
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
    <SectionBox>
        <SectionHeader number="05" title="Speaking Experience" icon={<img src={headerSpeakingExpImg} alt="Experience" style={{ width: 30, height: 30 }} />} />
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
export const SupportingDetailsSection = () => (
    <SectionBox>
        <SectionHeader number="06" title="Supporting Details" icon={<img src={headerSupportingImg} alt="Supporting" style={{ width: 30, height: 30 }} />} />
        <div style={{ fontSize: 11, color: TEXT_DARK, fontWeight: 700, marginBottom: 6 }}>Please upload / provide the following:</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {[
                { label: "Speaker Photo\n(HD)", sub: "JPG, PNG", icon: <img src={speakerPhotoImg} alt="Speaker" style={{ width: 40, height: 40, objectFit: "contain" }} /> },
                { label: "Company Logo\n(if applicable)", icon: <img src={companyLogoImg} alt="Company" style={{ width: 40, height: 40, objectFit: "contain" }} /> },
                { label: "Presentation\n(optional)", sub: "PPT, PDF (10MB)", icon: <img src={presentationImg} alt="Presentation" style={{ width: 40, height: 40, objectFit: "contain" }} /> },
            ].map((item) => (
                <div key={item.label} style={{ border: `1px solid ${BORDER_COLOR}`, borderRadius: 10, padding: "6px 4px", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, background: TRACK_BG }}>
                    {item.icon}
                    <div style={{ textAlign: "center", fontSize: 9, color: TEXT_DARK, fontWeight: 700, lineHeight: 1.2 }}>
                        {item.label.split("\n").map((l, i) => <div key={i}>{l}</div>)}
                    </div>
                    <button style={{ background: TEAL, color: "white", border: "none", borderRadius: 4, padding: "4px 12px", fontSize: 9, fontWeight: 700, cursor: "pointer", fontFamily: "'Segoe UI', sans-serif" }}>Upload</button>
                    <div style={{ fontSize: 8, color: "#94A3B8", textAlign: "center" }}>{item.sub || "JPG, PNG"}</div>
                </div>
            ))}
        </div>
        <div style={{ fontSize: 9, color: "#94A3B8", marginTop: 4, fontStyle: "italic" }}>Formats: JPG, PNG, PDF, PPT (Max 10MB)</div>
    </SectionBox>
);

// ─── Section 07: Expectations ─────────────────────────────────────────────────
export const ExpectationsSection = ({ expectations, toggleExpectation }: any) => (
    <SectionBox>
        <SectionHeader number="07" title="Expectations" icon={<img src={headerExpectationImg} alt="Expectations" style={{ width: 30, height: 30 }} />} gold />
        <div style={{ fontSize: 13, color: TEXT_DARK, fontWeight: 700, marginBottom: 12 }}>Are you open for:</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
                "Sponsored Speaking Slot",
                "Panel Participation",
                "Knowledge Session Only",
            ].map((opt) => (
                <label key={opt} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: TEXT_DARK, cursor: "pointer", fontFamily: "'Segoe UI', sans-serif", fontWeight: 500 }}>
                    <input type="checkbox" checked={expectations.includes(opt)} onChange={() => toggleExpectation(opt)} style={{ accentColor: TEAL, width: 18, height: 18 }} />
                    {opt}
                </label>
            ))}
        </div>
    </SectionBox>
);

// ─── Section 08: Consent ──────────────────────────────────────────────────────
export const ConsentSection = ({ consent1, setConsent1, consent2, setConsent2 }: any) => (
    <SectionBox>
        <SectionHeader number="08" title="Consent" icon={<img src={headerConsentImg} alt="Consent" style={{ width: 30, height: 30 }} />} />
        <div style={{ display: "flex", flexDirection: "column", gap: 18, padding: "10px 0" }}>
            {[
                { state: consent1, set: setConsent1, label: "I confirm that the above information is correct" },
                { state: consent2, set: setConsent2, label: "I agree to be contacted by the organizing team" },
            ].map((c) => (
                <label key={c.label} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 16, color: TEXT_DARK, cursor: "pointer", fontWeight: 600 }}>
                    <input type="checkbox" checked={c.state} onChange={(e) => c.set(e.target.checked)} style={{ accentColor: TEAL, width: 22, height: 22 }} />
                    {c.label}
                </label>
            ))}
        </div>
    </SectionBox>
);
