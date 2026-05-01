import React from "react";
import { 
    SectionHeader, FormField, CategoryChip, TrackChip, SessionChip, ExpertiseChip,
    TEAL, GOLD, TEXT_DARK, BORDER_COLOR, TRACK_BG, LIGHT_TEAL_BG
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
        <section style={{ marginBottom: 40 }}>
            <SectionHeader number="01" title="Basic Details" icon={<IconPerson />} />
            <FormField label="Full Name" value={form.fullName} onChange={set("fullName")} />
            <FormField label="Designation" value={form.designation} onChange={set("designation")} />
            <FormField label="Organization / Institution" value={form.organization} onChange={set("organization")} />

            <div style={{ marginTop: 6, marginBottom: 8 }}>
                <div style={{ fontSize: 13, color: TEXT_DARK, fontWeight: 500, marginBottom: 10 }}>
                    Industry Category <span style={{ color: "#888", fontWeight: 400 }}>(Select one)</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
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
        </section>
    );
};

// ─── Section 02: Contact Details ──────────────────────────────────────────────
export const ContactDetailsSection = ({ form, set }: any) => (
    <section style={{ marginBottom: 40 }}>
        <SectionHeader number="02" title="Contact Details" icon={<IconPhone />} />
        <FormField label="Mobile Number" icon={<IconMobile />} value={form.mobile} onChange={set("mobile")} type="tel" />
        <FormField label="Email Address" icon={<IconEmail />} value={form.email} onChange={set("email")} type="email" />
        <FormField label="City / Country" icon={<IconLocation />} value={form.city} onChange={set("city")} />
        <FormField label="LinkedIn Profile (if any)" icon={<IconLinkedIn />} value={form.linkedin} onChange={set("linkedin")} />
    </section>
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
        <section style={{ marginBottom: 40 }}>
            <SectionHeader number="03" title="Speaker Profile" icon={<IconPerson />} gold />
            <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 13, color: TEXT_DARK, fontWeight: 500, marginBottom: 6 }}>
                    Brief Profile <span style={{ color: "#888", fontWeight: 400 }}>(100–150 words)</span>
                </div>
                <div style={{ border: `1.5px solid ${BORDER_COLOR}`, borderRadius: 6, padding: 10, minHeight: 80, display: "flex", flexDirection: "column", gap: 6 }}>
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
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <span style={{ fontSize: 13, color: TEXT_DARK, fontWeight: 500 }}>Total Experience (Years)</span>
                <input
                    type="number"
                    value={form.totalExperience}
                    onChange={(e) => set("totalExperience")(e.target.value)}
                    style={{ width: 80, border: `1.5px solid ${BORDER_COLOR}`, borderRadius: 4, padding: "4px 8px", fontSize: 13, outline: "none", fontFamily: "'Segoe UI', sans-serif" }}
                />
            </div>
            <div>
                <div style={{ fontSize: 13, color: TEXT_DARK, fontWeight: 500, marginBottom: 8 }}>
                    Areas of Expertise <span style={{ color: "#888", fontWeight: 400 }}>(Select all that apply)</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
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
        </section>
    );
};

// ─── Section 04: Session Details ──────────────────────────────────────────────
export const SessionDetailsSection = ({ form, set, preferredTrack, setPreferredTrack, sessionType, setSessionType }: any) => (
    <section style={{ marginBottom: 40 }}>
        <SectionHeader number="04" title="Session Details" icon={<IconCalendar />} />
        <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, color: TEXT_DARK, fontWeight: 500, marginBottom: 8 }}>
                Preferred Track <span style={{ color: "#888", fontWeight: 400 }}>(Select one)</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
                {[
                    { label: "AYUSH &\nWellness", key: "ayush", icon: <AyushTrackIcon /> },
                    { label: "Medical &\nHealthcare", key: "medical", icon: <MedicalIcon /> },
                    { label: "Both", key: "both", icon: <BothIcon /> },
                ].map((t) => (
                    <TrackChip
                        key={t.key}
                        label={t.label.replace("\\n", "\n")}
                        icon={t.icon}
                        selected={preferredTrack === t.key}
                        onClick={() => setPreferredTrack(t.key)}
                    />
                ))}
            </div>
        </div>
        <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 13, color: TEXT_DARK, fontWeight: 500, marginBottom: 6 }}>Preferred Topic / Title of Talk</div>
            <div style={{ border: `1.5px solid ${BORDER_COLOR}`, borderRadius: 6, padding: "8px 10px", display: "flex", alignItems: "center", gap: 8 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill={TEAL}><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" /></svg>
                <input value={form.preferredTopic} onChange={(e) => set("preferredTopic")(e.target.value)} placeholder="Enter your talk title..." style={{ flex: 1, border: "none", outline: "none", fontSize: 13, fontFamily: "'Segoe UI', sans-serif", color: TEXT_DARK }} />
            </div>
        </div>
        <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 13, color: TEXT_DARK, fontWeight: 500, marginBottom: 8 }}>Session Type <span style={{ color: "#888", fontWeight: 400 }}>(Select one)</span></div>
            <div style={{ display: "flex", gap: 8 }}>
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
            <div style={{ fontSize: 13, color: TEXT_DARK, fontWeight: 500, marginBottom: 6 }}>Brief Description of Topic <span style={{ color: "#888", fontWeight: 400 }}>(100–200 words)</span></div>
            <div style={{ border: `1.5px solid ${BORDER_COLOR}`, borderRadius: 6, padding: 10, display: "flex", flexDirection: "column", gap: 6 }}>
                <IconDoc size={18} color={TEAL} />
                <textarea value={form.topicDescription} onChange={(e) => set("topicDescription")(e.target.value)} rows={5} style={{ border: "none", outline: "none", resize: "none", width: "100%", fontSize: 13, fontFamily: "'Segoe UI', sans-serif", color: TEXT_DARK, background: "transparent" }} placeholder="Describe your topic briefly..." />
            </div>
        </div>
    </section>
);

// ─── Section 05: Speaking Experience ──────────────────────────────────────────
export const SpeakingExperienceSection = ({ form, set, spokenBefore, setSpokenBefore }: any) => (
    <section style={{ marginBottom: 40 }}>
        <SectionHeader number="05" title="Speaking Experience" icon={<IconPerson />} />
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 12 }}>
            <span style={{ fontSize: 13, color: TEXT_DARK, fontWeight: 500 }}>Have you spoken at conferences before?</span>
            {["Yes", "No"].map((opt) => (
                <label key={opt} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: TEXT_DARK, cursor: "pointer" }}>
                    <input type="checkbox" checked={spokenBefore === opt} onChange={() => setSpokenBefore(opt)} style={{ accentColor: TEAL, width: 14, height: 14 }} />
                    {opt}
                </label>
            ))}
        </div>
        {spokenBefore === "Yes" ? (
            <div>
                <div style={{ fontSize: 13, color: TEXT_DARK, fontWeight: 500, marginBottom: 6 }}>If Yes, mention details <span style={{ color: "#888", fontWeight: 400 }}>(Event Name / Organization / Year)</span></div>
                <div style={{ border: `1.5px solid ${BORDER_COLOR}`, borderRadius: 6, padding: 10, display: "flex", flexDirection: "column", gap: 6 }}>
                    <HospMgmtIcon size={18} />
                    <textarea value={form.eventDetails} onChange={(e) => set("eventDetails")(e.target.value)} rows={3} style={{ border: "none", outline: "none", resize: "none", width: "100%", fontSize: 13, fontFamily: "'Segoe UI', sans-serif", color: TEXT_DARK, background: "transparent" }} placeholder="Event Name, Organization, Year..." />
                </div>
            </div>
        ) : (
            <div style={{ border: `1.5px solid ${BORDER_COLOR}`, borderRadius: 6, padding: 10, display: "flex", alignItems: "center", gap: 8, minHeight: 60, color: "#aaa", fontSize: 13 }}>
                <HospMgmtIcon size={18} />
                <span>Select Yes above to enter event details</span>
            </div>
        )}
    </section>
);

// ─── Section 06: Supporting Details ───────────────────────────────────────────
export const SupportingDetailsSection = () => (
    <section style={{ marginBottom: 40 }}>
        <SectionHeader number="06" title="Supporting Details" icon={<IconDoc />} />
        <div style={{ fontSize: 13, color: TEXT_DARK, fontWeight: 500, marginBottom: 14 }}>Please upload / provide the following:</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
            {[
                { label: "Speaker Photo\n(HD)", sub: "JPG, PNG", icon: <IconBuild /> },
                { label: "Company Logo\n(if applicable)", sub: "JPG, PNG", icon: <IconBuild /> },
                { label: "Presentation\n(optional)", sub: "PPT, PDF (Max 10MB)", icon: <IconUpload /> },
            ].map((item) => (
                <div key={item.label} style={{ border: `1.5px solid ${BORDER_COLOR}`, borderRadius: 8, padding: "14px 10px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, background: TRACK_BG }}>
                    {item.icon}
                    <div style={{ textAlign: "center", fontSize: 12, color: TEXT_DARK, fontWeight: 500, lineHeight: 1.4 }}>
                        {item.label.split("\n").map((l, i) => <div key={i}>{l}</div>)}
                    </div>
                    <button style={{ background: TEAL, color: "white", border: "none", borderRadius: 4, padding: "5px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Segoe UI', sans-serif" }}>Upload</button>
                    <div style={{ fontSize: 10, color: "#888", textAlign: "center" }}>{item.sub}</div>
                </div>
            ))}
        </div>
        <div style={{ fontSize: 11, color: "#888", marginTop: 10 }}>Supported formats: JPG, PNG, PDF, PPT (Max size: 10MB each)</div>
    </section>
);

// ─── Section 07: Expectations ─────────────────────────────────────────────────
export const ExpectationsSection = ({ expectations, toggleExpectation }: any) => (
    <section style={{ marginBottom: 40 }}>
        <SectionHeader number="07" title="Expectations" icon={<IconStar />} gold />
        <div style={{ fontSize: 13, color: TEXT_DARK, fontWeight: 500, marginBottom: 10 }}>Are you open for:</div>
        {[
            "Sponsored Speaking Slot",
            "Panel Participation",
            "Knowledge Session Only",
        ].map((opt) => (
            <label key={opt} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, fontSize: 13, color: TEXT_DARK, cursor: "pointer", fontFamily: "'Segoe UI', sans-serif" }}>
                <input type="checkbox" checked={expectations.includes(opt)} onChange={() => toggleExpectation(opt)} style={{ accentColor: TEAL, width: 15, height: 15 }} />
                {opt}
            </label>
        ))}
    </section>
);

// ─── Section 08: Consent ──────────────────────────────────────────────────────
export const ConsentSection = ({ consent1, setConsent1, consent2, setConsent2 }: any) => (
    <section style={{ marginBottom: 40 }}>
        <SectionHeader number="08" title="Consent" icon={<IconShield />} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
                {[
                    { state: consent1, set: setConsent1, label: "I confirm that the above information is correct" },
                    { state: consent2, set: setConsent2, label: "I agree to be contacted by the organizing team" },
                ].map((c) => (
                    <label key={c.label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, fontSize: 13, color: TEXT_DARK, cursor: "pointer" }}>
                        <input type="checkbox" checked={c.state} onChange={(e) => c.set(e.target.checked)} style={{ accentColor: TEAL, width: 15, height: 15 }} />
                        {c.label}
                    </label>
                ))}
            </div>
            <div style={{ position: "relative", width: 100, height: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3z" fill={TEAL} />
                    <path d="M12 6v14.9c3.27-1.11 6.23-5.26 6.23-9.9V6.6l-6.23-2.34V6z" fill="#135265" />
                    <path d="M11 9h2v3h3v2h-3v3h-2v-3H8v-2h3V9z" fill="white" />
                </svg>
            </div>
        </div>
    </section>
);
