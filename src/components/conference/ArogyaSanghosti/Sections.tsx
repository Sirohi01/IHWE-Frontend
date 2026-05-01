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

// ─── Section 01: Basic Details ────────────────────────────────────────────────
export const BasicDetailsSection = ({ form, set, industryCategory, setIndustryCategory }: any) => {
    const categories = [
        { label: "Doctor", icon: <DoctorIcon /> },
        { label: "AYUSH Practitioner", icon: <AyushIcon /> },
        { label: "Hospital", icon: <HospitalIcon /> },
        { label: "University / Academic", icon: <UnivIcon /> },
        { label: "Pharma / Healthcare Company", icon: <PharmaIcon /> },
        { label: "Startup / Innovator", icon: <StartupIcon /> },
        { label: "Other", icon: <OtherDotsIcon /> },
    ];

    return (
        <SectionBox>
            <SectionHeader number="01" title="Basic Details" icon={<IconPerson color="white" />} />
            <FormField label="Full Name" value={form.fullName} onChange={set("fullName")} />
            <FormField label="Designation" value={form.designation} onChange={set("designation")} />
            <FormField label="Organization / Institution" value={form.organization} onChange={set("organization")} />

            <div style={{ marginTop: 15 }}>
                <div style={{ fontSize: 13, color: TEXT_DARK, fontWeight: 700, marginBottom: 12 }}>
                    Industry Category <span style={{ color: "#94A3B8", fontWeight: 400 }}>(Select one)</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
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
        <SectionHeader number="02" title="Contact Details" icon={<IconPhone color="white" />} />
        <FormField label="Mobile Number" icon={<IconMobile size={18} />} value={form.mobile} onChange={set("mobile")} type="tel" />
        <FormField label="Email Address" icon={<IconEmail size={18} />} value={form.email} onChange={set("email")} type="email" />
        <FormField label="City / Country" icon={<IconLocation size={18} />} value={form.city} onChange={set("city")} />
        <FormField label="LinkedIn Profile (if any)" icon={<IconLinkedIn size={18} />} value={form.linkedin} onChange={set("linkedin")} />
    </SectionBox>
);

// ─── Section 03: Speaker Profile ──────────────────────────────────────────────
export const SpeakerProfileSection = ({ form, set, expertise, toggleExpertise }: any) => {
    const expertiseAreas = [
        { label: "Ayurveda", icon: <LeafIcon /> },
        { label: "Modern Medicine", icon: <PillIcon /> },
        { label: "Digital Health / AI", icon: <ChipIcon /> },
        { label: "Wellness & Lifestyle", icon: <WellnessIcon /> },
        { label: "Hospital Management", icon: <HospMgmtIcon /> },
        { label: "Research & Education", icon: <ResearchIcon /> },
        { label: "Policy / Government", icon: <PolicyIcon /> },
        { label: "Other", icon: <OtherDotsIcon /> },
    ];

    return (
        <SectionBox>
            <SectionHeader number="03" title="Speaker Profile" icon={<IconPerson color="white" />} gold />
            <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 13, color: TEXT_DARK, fontWeight: 700, marginBottom: 8 }}>
                    Brief Profile <span style={{ color: "#94A3B8", fontWeight: 400 }}>(100–150 words)</span>
                </div>
                <div style={{ border: `1.5px solid ${BORDER_COLOR}`, borderRadius: 8, padding: 12, minHeight: 100, display: "flex", flexDirection: "column", gap: 8 }}>
                    <IconPerson size={20} color={TEAL} />
                    <textarea
                        value={form.briefProfile}
                        onChange={(e) => set("briefProfile")(e.target.value)}
                        rows={4}
                        style={{ border: "none", outline: "none", resize: "none", width: "100%", fontSize: 13, fontFamily: "'Segoe UI', sans-serif", color: TEXT_DARK, background: "transparent" }}
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
                    style={{ width: 100, border: `1.5px solid ${BORDER_COLOR}`, borderRadius: 6, padding: "8px 12px", fontSize: 14, outline: "none", fontFamily: "'Segoe UI', sans-serif" }}
                />
            </div>
            <div>
                <div style={{ fontSize: 13, color: TEXT_DARK, fontWeight: 700, marginBottom: 12 }}>
                    Areas of Expertise <span style={{ color: "#94A3B8", fontWeight: 400 }}>(Select all that apply)</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
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
        <SectionHeader number="04" title="Session Details" icon={<IconCalendar color="white" />} />
        <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: TEXT_DARK, fontWeight: 700, marginBottom: 12 }}>
                Preferred Track <span style={{ color: "#94A3B8", fontWeight: 400 }}>(Select one)</span>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
                {[
                    { label: "AYUSH &\nWellness", key: "ayush", icon: <AyushTrackIcon /> },
                    { label: "Medical &\nHealthcare", key: "medical", icon: <MedicalIcon /> },
                    { label: "Both", key: "both", icon: <BothIcon /> },
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
            <div style={{ border: `1.5px solid ${BORDER_COLOR}`, borderRadius: 8, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
                <IconDoc size={18} color={TEAL} />
                <input value={form.preferredTopic} onChange={(e) => set("preferredTopic")(e.target.value)} placeholder="Enter your talk title..." style={{ flex: 1, border: "none", outline: "none", fontSize: 14, fontFamily: "'Segoe UI', sans-serif", color: TEXT_DARK }} />
            </div>
        </div>
        <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 13, color: TEXT_DARK, fontWeight: 700, marginBottom: 12 }}>Session Type <span style={{ color: "#94A3B8", fontWeight: 400 }}>(Select one)</span></div>
            <div style={{ display: "flex", gap: 10 }}>
                {[
                    { label: "Keynote", key: "keynote", icon: <IconMic /> },
                    { label: "Panel Discussion", key: "panel", icon: <IconGroup /> },
                    { label: "Expert Talk", key: "expert", icon: <IconChat /> },
                ].map((s) => (
                    <SessionChip key={s.key} label={s.label} icon={s.icon} selected={sessionType === s.key} onClick={() => setSessionType(s.key)} />
                ))}
            </div>
        </div>
        <div>
            <div style={{ fontSize: 13, color: TEXT_DARK, fontWeight: 700, marginBottom: 8 }}>Brief Description of Topic <span style={{ color: "#94A3B8", fontWeight: 400 }}>(100–200 words)</span></div>
            <div style={{ border: `1.5px solid ${BORDER_COLOR}`, borderRadius: 8, padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                <IconDoc size={18} color={TEAL} />
                <textarea value={form.topicDescription} onChange={(e) => set("topicDescription")(e.target.value)} rows={5} style={{ border: "none", outline: "none", resize: "none", width: "100%", fontSize: 13, fontFamily: "'Segoe UI', sans-serif", color: TEXT_DARK, background: "transparent" }} placeholder="Describe your topic briefly..." />
            </div>
        </div>
    </SectionBox>
);

// ─── Section 05: Speaking Experience ──────────────────────────────────────────
export const SpeakingExperienceSection = ({ form, set, spokenBefore, setSpokenBefore }: any) => (
    <SectionBox>
        <SectionHeader number="05" title="Speaking Experience" icon={<IconPerson color="white" />} />
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
        <SectionHeader number="06" title="Supporting Details" icon={<IconDoc color="white" />} />
        <div style={{ fontSize: 12, color: TEXT_DARK, fontWeight: 700, marginBottom: 12 }}>Please upload / provide the following:</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {[
                { label: "Speaker Photo\n(HD)", sub: "JPG, PNG", icon: <IconPerson size={20} color={TEAL} /> },
                { label: "Company Logo\n(if applicable)", icon: <IconBuild size={20} color={TEAL} /> },
                { label: "Presentation\n(optional)", sub: "PPT, PDF (Max 10MB)", icon: <IconUpload size={20} color={TEAL} /> },
            ].map((item) => (
                <div key={item.label} style={{ border: `1px solid ${BORDER_COLOR}`, borderRadius: 10, padding: "12px 8px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, background: TRACK_BG }}>
                    {item.icon}
                    <div style={{ textAlign: "center", fontSize: 11, color: TEXT_DARK, fontWeight: 700, lineHeight: 1.3 }}>
                        {item.label.split("\n").map((l, i) => <div key={i}>{l}</div>)}
                    </div>
                    <button style={{ background: TEAL, color: "white", border: "none", borderRadius: 6, padding: "5px 15px", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "'Segoe UI', sans-serif", marginTop: 2 }}>Upload</button>
                    <div style={{ fontSize: 9, color: "#94A3B8", textAlign: "center" }}>{item.sub || "JPG, PNG"}</div>
                </div>
            ))}
        </div>
        <div style={{ fontSize: 10, color: "#94A3B8", marginTop: 10, fontStyle: "italic" }}>Supported formats: JPG, PNG, PDF, PPT (Max 10MB)</div>
    </SectionBox>
);

// ─── Section 07: Expectations ─────────────────────────────────────────────────
export const ExpectationsSection = ({ expectations, toggleExpectation }: any) => (
    <SectionBox>
        <SectionHeader number="07" title="Expectations" icon={<IconStar color="white" />} gold />
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
        <SectionHeader number="08" title="Consent" icon={<IconShield color="white" />} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                    { state: consent1, set: setConsent1, label: "I confirm that the above information is correct" },
                    { state: consent2, set: setConsent2, label: "I agree to be contacted by the organizing team" },
                ].map((c) => (
                    <label key={c.label} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: TEXT_DARK, cursor: "pointer", fontWeight: 500 }}>
                        <input type="checkbox" checked={c.state} onChange={(e) => c.set(e.target.checked)} style={{ accentColor: TEAL, width: 18, height: 18 }} />
                        {c.label}
                    </label>
                ))}
            </div>
            <div style={{ position: "relative", width: 100, height: 100, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.8 }}>
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3z" fill={TEAL} />
                    <path d="M12 6v14.9c3.27-1.11 6.23-5.26 6.23-9.9V6.6l-6.23-2.34V6z" fill="#135265" />
                    <path d="M11 9h2v3h3v2h-3v3h-2v-3H8v-2h3V9z" fill="white" />
                </svg>
            </div>
        </div>
    </SectionBox>
);
