import React, { useState } from "react";

// ─── Color Tokens (exact from form) ───────────────────────────────────────────
// Teal/Dark-green header: #1A5C5A  (section headers)
// Gold/Olive label:        #B8962E  (section 03,07 headers)
// Dark navy text:          #1C2B3A
// Light teal bg:           #E8F4F4
// Border lines:            #C8DCDC
// Button teal:             #1A5C5A
// Gold accent:             #D4A017
// ──────────────────────────────────────────────────────────────────────────────

const TEAL = "#1A5C5A";
const GOLD = "#B8962E";
const LIGHT_TEAL_BG = "#EAF4F3";
const BORDER_COLOR = "#C5DCDB";
const TEXT_DARK = "#1C2B3A";
const TRACK_BG = "#F0F8F7";
const SECTION_ICON_BG = "#1A5C5A";

// ─── Icon Components (SVG inline, matching form icons) ────────────────────────
const IconPerson = ({ size = 16, color = "white" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
    </svg>
);
const IconPhone = ({ size = 16, color = "white" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
    </svg>
);
const IconBriefcase = ({ size = 16, color = "white" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M20 7h-4V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm-8-2h4v2h-4V5z" />
    </svg>
);
const IconCalendar = ({ size = 16, color = "white" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H5V8h14v13z" />
    </svg>
);
const IconStar = ({ size = 16, color = "white" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
);
const IconShield = ({ size = 16, color = "white" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
    </svg>
);
const IconDoc = ({ size = 16, color = "white" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z" />
    </svg>
);
const IconMic = ({ size = 18, color = TEAL }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M12 15c1.66 0 3-1.34 3-3V6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V6zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-2.08c3.39-.49 6-3.39 6-6.92h-2z" />
    </svg>
);
const IconGroup = ({ size = 18, color = TEAL }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
);
const IconChat = ({ size = 18, color = TEAL }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
    </svg>
);
const IconMobile = ({ size = 15, color = TEAL }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" />
    </svg>
);
const IconEmail = ({ size = 15, color = TEAL }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
);
const IconLocation = ({ size = 15, color = TEAL }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
);
const IconLinkedIn = ({ size = 15, color = TEAL }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);
const IconUpload = ({ size = 22, color = TEAL }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
    </svg>
);
const IconBuild = ({ size = 22, color = TEAL }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" />
    </svg>
);

// ─── Reusable Components ───────────────────────────────────────────────────────

const SectionHeader: React.FC<{
    number: string;
    title: string;
    icon: React.ReactNode;
    gold?: boolean;
}> = ({ number, title, icon, gold = false }) => (
    <div
        style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: gold ? GOLD : TEAL,
            borderRadius: 6,
            padding: "8px 14px",
            marginBottom: 18,
        }}
    >
        <span
            style={{
                color: "white",
                fontWeight: 800,
                fontSize: 16,
                fontFamily: "'Segoe UI', sans-serif",
                minWidth: 22,
            }}
        >
            {number}
        </span>
        <span
            style={{
                color: "white",
                display: "flex",
                alignItems: "center",
            }}
        >
            {icon}
        </span>
        <span
            style={{
                color: "white",
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: 0.5,
                fontFamily: "'Segoe UI', sans-serif",
                textTransform: "uppercase",
            }}
        >
            {title}
        </span>
    </div>
);

const FormField: React.FC<{
    label: string;
    icon?: React.ReactNode;
    children?: React.ReactNode;
    type?: string;
    value?: string;
    onChange?: (v: string) => void;
    placeholder?: string;
}> = ({ label, icon, children, type = "text", value, onChange, placeholder }) => (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 12, gap: 8 }}>
        {icon && <span style={{ minWidth: 20, display: "flex", alignItems: "center" }}>{icon}</span>}
        <label
            style={{
                minWidth: 160,
                fontSize: 13,
                color: TEXT_DARK,
                fontFamily: "'Segoe UI', sans-serif",
                fontWeight: 500,
            }}
        >
            {label}
        </label>
        <span style={{ color: TEAL, marginRight: 4, fontWeight: 700 }}>:</span>
        {children ?? (
            <input
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange?.(e.target.value)}
                style={{
                    flex: 1,
                    border: "none",
                    borderBottom: `1.5px solid ${BORDER_COLOR}`,
                    outline: "none",
                    fontSize: 13,
                    padding: "4px 2px",
                    fontFamily: "'Segoe UI', sans-serif",
                    color: TEXT_DARK,
                    background: "transparent",
                }}
            />
        )}
    </div>
);

const CategoryChip: React.FC<{
    label: string;
    icon: React.ReactNode;
    selected?: boolean;
    onClick?: () => void;
}> = ({ label, icon, selected, onClick }) => (
    <button
        onClick={onClick}
        style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            border: `1.5px solid ${selected ? TEAL : BORDER_COLOR}`,
            borderRadius: 8,
            padding: "10px 14px",
            background: selected ? LIGHT_TEAL_BG : "white",
            cursor: "pointer",
            minWidth: 80,
            fontSize: 12,
            fontFamily: "'Segoe UI', sans-serif",
            color: TEXT_DARK,
            fontWeight: 500,
            transition: "all 0.2s",
        }}
    >
        {icon}
        <span style={{ textAlign: "center", lineHeight: 1.3 }}>{label}</span>
    </button>
);

const TrackChip: React.FC<{
    label: string;
    icon: React.ReactNode;
    selected?: boolean;
    onClick?: () => void;
}> = ({ label, icon, selected, onClick }) => (
    <button
        onClick={onClick}
        style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            border: `1.5px solid ${selected ? TEAL : BORDER_COLOR}`,
            borderRadius: 8,
            padding: "10px 18px",
            background: selected ? LIGHT_TEAL_BG : "white",
            cursor: "pointer",
            fontSize: 13,
            fontFamily: "'Segoe UI', sans-serif",
            color: TEXT_DARK,
            fontWeight: 500,
            flex: 1,
            justifyContent: "center",
            transition: "all 0.2s",
        }}
    >
        {icon}
        <span>{label}</span>
    </button>
);

const SessionChip: React.FC<{
    label: string;
    icon: React.ReactNode;
    selected?: boolean;
    onClick?: () => void;
}> = ({ label, icon, selected, onClick }) => (
    <button
        onClick={onClick}
        style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            border: `1.5px solid ${selected ? TEAL : BORDER_COLOR}`,
            borderRadius: 8,
            padding: "9px 14px",
            background: selected ? LIGHT_TEAL_BG : "white",
            cursor: "pointer",
            fontSize: 13,
            fontFamily: "'Segoe UI', sans-serif",
            color: TEXT_DARK,
            fontWeight: 500,
            flex: 1,
            justifyContent: "center",
            transition: "all 0.2s",
        }}
    >
        {icon}
        <span>{label}</span>
    </button>
);

const ExpertiseChip: React.FC<{
    label: string;
    icon: React.ReactNode;
    selected?: boolean;
    onClick?: () => void;
}> = ({ label, icon, selected, onClick }) => (
    <button
        onClick={onClick}
        style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            border: `1.5px solid ${selected ? TEAL : BORDER_COLOR}`,
            borderRadius: 6,
            padding: "7px 12px",
            background: selected ? LIGHT_TEAL_BG : "white",
            cursor: "pointer",
            fontSize: 12,
            fontFamily: "'Segoe UI', sans-serif",
            color: TEXT_DARK,
            fontWeight: 500,
            whiteSpace: "nowrap",
            transition: "all 0.2s",
        }}
    >
        {icon}
        <span>{label}</span>
    </button>
);

// ─── Icon SVGs for categories ──────────────────────────────────────────────────
const DoctorIcon = () => (
    <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="16" r="8" fill={TEAL} opacity="0.15" />
        <path d="M24 8a8 8 0 1 1 0 16A8 8 0 0 1 24 8z" stroke={TEAL} strokeWidth="2" fill="none" />
        <path d="M8 40c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke={TEAL} strokeWidth="2" fill="none" />
        <rect x="20" y="28" width="8" height="10" rx="1" fill={TEAL} opacity="0.2" />
        <line x1="24" y1="30" x2="24" y2="36" stroke={TEAL} strokeWidth="1.5" />
        <line x1="21" y1="33" x2="27" y2="33" stroke={TEAL} strokeWidth="1.5" />
    </svg>
);
const AyushIcon = () => (
    <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
        <path d="M24 6 C24 6 10 18 10 28 a14 14 0 0 0 28 0 C38 18 24 6 24 6z" stroke={TEAL} strokeWidth="2" fill={TEAL} opacity="0.1" />
        <path d="M18 24 Q24 16 30 24" stroke={TEAL} strokeWidth="1.5" fill="none" />
        <circle cx="24" cy="28" r="4" fill={TEAL} opacity="0.3" />
    </svg>
);
const HospitalIcon = () => (
    <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="16" width="32" height="26" rx="2" stroke={TEAL} strokeWidth="2" fill={TEAL} opacity="0.1" />
        <path d="M16 16V12a8 8 0 0 1 16 0v4" stroke={TEAL} strokeWidth="2" fill="none" />
        <line x1="24" y1="22" x2="24" y2="34" stroke={TEAL} strokeWidth="2" />
        <line x1="18" y1="28" x2="30" y2="28" stroke={TEAL} strokeWidth="2" />
    </svg>
);
const UnivIcon = () => (
    <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
        <polygon points="24,6 44,16 24,26 4,16" stroke={TEAL} strokeWidth="2" fill={TEAL} opacity="0.1" />
        <rect x="12" y="26" width="6" height="10" stroke={TEAL} strokeWidth="1.5" fill="none" />
        <rect x="30" y="26" width="6" height="10" stroke={TEAL} strokeWidth="1.5" fill="none" />
        <line x1="4" y1="38" x2="44" y2="38" stroke={TEAL} strokeWidth="2" />
    </svg>
);
const PharmaIcon = () => (
    <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
        <rect x="14" y="10" width="20" height="28" rx="3" stroke={TEAL} strokeWidth="2" fill={TEAL} opacity="0.1" />
        <line x1="14" y1="22" x2="34" y2="22" stroke={TEAL} strokeWidth="1.5" />
        <line x1="24" y1="27" x2="24" y2="33" stroke={TEAL} strokeWidth="1.5" />
        <line x1="21" y1="30" x2="27" y2="30" stroke={TEAL} strokeWidth="1.5" />
    </svg>
);
const StartupIcon = () => (
    <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
        <path d="M24 4 L40 20 L32 20 L32 36 L16 36 L16 20 L8 20 Z" stroke={TEAL} strokeWidth="2" fill={TEAL} opacity="0.1" />
        <circle cx="24" cy="12" r="3" fill={TEAL} opacity="0.4" />
    </svg>
);
const OtherDotsIcon = () => (
    <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
        <circle cx="16" cy="24" r="3" fill={TEAL} />
        <circle cx="24" cy="24" r="3" fill={TEAL} />
        <circle cx="32" cy="24" r="3" fill={TEAL} />
    </svg>
);

// Expertise icons
const LeafIcon = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={TEAL}>
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 4-10 8-1.33-2.67-4-5.33-8-6C4 5 4 5 4 5 4 5 6 8 17 8z" />
    </svg>
);
const PillIcon = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={TEAL}>
        <path d="M4.22 11.29l6.34-6.34c1.64-1.64 4.3-1.64 5.95 0l2.54 2.54c1.64 1.64 1.64 4.3 0 5.95l-6.34 6.34c-1.64 1.64-4.3 1.64-5.95 0l-2.54-2.54c-1.64-1.64-1.64-4.3 0-5.95zm1.41 4.55l2.54 2.54c.78.78 2.05.78 2.83 0l3.18-3.18-5.37-5.37-3.18 3.18c-.78.78-.78 2.05 0 2.83z" />
    </svg>
);
const ChipIcon = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={TEAL}>
        <path d="M9 3H7v2H5v2H3v2h2v2H3v2h2v2H3v2h2v2h2v-2h2v2h2v-2h2v2h2v-2h2v-2h2v-2h-2v-2h2v-2h-2V9h2V7h-2V5h-2V3h-2v2h-2V3H9zm4 4H7v10h10V7h-4z" />
    </svg>
);
const WellnessIcon = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={TEAL}>
        <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </svg>
);
const HospMgmtIcon = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={TEAL}>
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H8v-4h4v4zm4-8H8V7h8v2zm0 4h-2v-2h2v2z" />
    </svg>
);
const ResearchIcon = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={TEAL}>
        <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 14H8v-2h8v2zm0-4H8v-2h8v2zm0-4H8V6h8v2z" />
    </svg>
);
const PolicyIcon = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={TEAL}>
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
    </svg>
);

// Track icons
const AyushTrackIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={TEAL}>
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 4-10 8-1.33-2.67-4-5.33-8-6C4 5 4 5 4 5 4 5 6 8 17 8z" />
    </svg>
);
const MedicalIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#E0445A">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 15h-2v-2h2v2zm2.07-7.75-.9.92C13.45 10.9 13 11.5 13 13h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
    </svg>
);
const BothIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={TEAL}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
);

// ─── Main Form Component ───────────────────────────────────────────────────────
export default function ArogyaSanghostiForm() {
    const [industryCategory, setIndustryCategory] = useState<string>("");
    const [preferredTrack, setPreferredTrack] = useState<string>("");
    const [sessionType, setSessionType] = useState<string>("");
    const [expertise, setExpertise] = useState<string[]>([]);
    const [spokenBefore, setSpokenBefore] = useState<string>("");
    const [expectations, setExpectations] = useState<string[]>([]);
    const [consent1, setConsent1] = useState(false);
    const [consent2, setConsent2] = useState(false);

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

    const set = (key: string) => (val: string) => setForm((p) => ({ ...p, [key]: val }));

    const toggleExpertise = (val: string) =>
        setExpertise((prev) =>
            prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
        );
    const toggleExpectation = (val: string) =>
        setExpectations((prev) =>
            prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
        );

    const industryCategories = [
        { label: "Doctor", icon: <DoctorIcon /> },
        { label: "AYUSH Practitioner", icon: <AyushIcon /> },
        { label: "Hospital", icon: <HospitalIcon /> },
        { label: "University / Academic", icon: <UnivIcon /> },
        { label: "Pharma / Healthcare Company", icon: <PharmaIcon /> },
        { label: "Startup / Innovator", icon: <StartupIcon /> },
        { label: "Other", icon: <OtherDotsIcon /> },
    ];

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
        <div
            style={{
                fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
                maxWidth: 1000,
                margin: "0 auto",
                background: "white",
                boxShadow: "0 2px 24px rgba(0,0,0,0.10)",
                borderRadius: 8,
                overflow: "hidden",
            }}
        >
            {/* ── HEADER ─────────────────────────────────────────────────────────── */}
            <div
                style={{
                    background: `linear-gradient(135deg, ${TEAL} 0%, #0F3D3C 100%)`,
                    padding: "24px 36px 20px",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Decorative circles */}
                <div
                    style={{
                        position: "absolute",
                        top: -40,
                        right: -40,
                        width: 180,
                        height: 180,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.04)",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: -30,
                        left: "38%",
                        width: 120,
                        height: 120,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.03)",
                    }}
                />
                <div style={{ display: "flex", alignItems: "flex-start", gap: 28 }}>
                    {/* Logo area */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                            {/* Leaf logo */}
                            <div
                                style={{
                                    width: 52,
                                    height: 52,
                                    borderRadius: "50%",
                                    background: "rgba(255,255,255,0.12)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
                                    <circle cx="24" cy="24" r="20" fill="rgba(255,255,255,0.1)" />
                                    <path d="M24 8C24 8 12 18 12 28a12 12 0 0 0 24 0C36 18 24 8 24 8z" fill="white" opacity="0.8" />
                                    <path d="M24 14C24 14 18 22 18 28a6 6 0 0 0 12 0C30 22 24 14 24 14z" fill={GOLD} opacity="0.6" />
                                    <line x1="24" y1="28" x2="24" y2="40" stroke="white" strokeWidth="2" opacity="0.5" />
                                    <path d="M16 20 Q24 24 32 20" stroke="white" strokeWidth="1.5" fill="none" opacity="0.4" />
                                </svg>
                            </div>
                            <div>
                                <div style={{ color: "white", fontWeight: 800, fontSize: 26, lineHeight: 1.1, letterSpacing: 1 }}>
                                    AROGYA
                                </div>
                                <div style={{ color: GOLD, fontWeight: 800, fontSize: 26, lineHeight: 1.1, letterSpacing: 1 }}>
                                    SANGHOSTHI
                                </div>
                                <div
                                    style={{
                                        background: GOLD,
                                        color: "white",
                                        fontSize: 11,
                                        fontWeight: 700,
                                        padding: "2px 14px",
                                        borderRadius: 20,
                                        display: "inline-block",
                                        marginTop: 4,
                                        letterSpacing: 1,
                                    }}
                                >
                                    — 18<sup>TH</sup> EDITION —
                                </div>
                            </div>
                        </div>
                        <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 12, letterSpacing: 1.5, marginTop: 8, fontWeight: 500 }}>
                            INDIA'S PREMIER HEALTHCARE & AYUSH CONFERENCE
                        </div>
                    </div>

                    {/* Center: SPEAKER NOMINATION */}
                    <div style={{ flex: 1, paddingLeft: 20, borderLeft: "2px solid rgba(255,255,255,0.15)" }}>
                        <div style={{ color: "white", fontWeight: 900, fontSize: 32, lineHeight: 1, letterSpacing: 1 }}>
                            SPEAKER
                        </div>
                        <div style={{ color: "white", fontWeight: 900, fontSize: 32, lineHeight: 1, letterSpacing: 1 }}>
                            NOMINATION FORM
                        </div>
                        <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 4 }}>
                            {["Share Your Knowledge.", "Inspire Change. Shape the Future."].map((t) => (
                                <div key={t} style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.85)", fontSize: 13 }}>
                                    <span style={{ color: GOLD, fontSize: 16 }}>✦</span>
                                    {t}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right badge */}
                    <div
                        style={{
                            minWidth: 120,
                            background: GOLD,
                            borderRadius: 8,
                            padding: "14px 10px",
                            textAlign: "center",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 6,
                        }}
                    >
                        <svg width="30" height="30" viewBox="0 0 48 48" fill="none">
                            <path d="M24 4 L40 18 L32 18 L32 40 L16 40 L16 18 L8 18 Z" fill="white" opacity="0.9" />
                            <circle cx="24" cy="12" r="4" fill={GOLD} />
                        </svg>
                        <div style={{ color: "white", fontWeight: 800, fontSize: 12, lineHeight: 1.3, textAlign: "center" }}>
                            BUILDING A<br />HEALTHIER<br />FUTURE<br />TOGETHER
                        </div>
                    </div>
                </div>
            </div>

            {/* ── FORM BODY ──────────────────────────────────────────────────────── */}
            <div style={{ padding: "28px 36px", background: "#FAFEFE" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
                    {/* ── LEFT COLUMN ── */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                        {/* 01 BASIC DETAILS */}
                        <section style={{ background: "white", borderRadius: 10, padding: "20px 22px", boxShadow: "0 1px 8px rgba(26,92,90,0.07)", border: `1px solid ${BORDER_COLOR}` }}>
                            <SectionHeader number="01" title="Basic Details" icon={<IconPerson />} />
                            <FormField label="Full Name" value={form.fullName} onChange={set("fullName")} />
                            <FormField label="Designation" value={form.designation} onChange={set("designation")} />
                            <FormField label="Organization / Institution" value={form.organization} onChange={set("organization")} />

                            <div style={{ marginTop: 6, marginBottom: 8 }}>
                                <div style={{ fontSize: 13, color: TEXT_DARK, fontWeight: 500, marginBottom: 10 }}>
                                    Industry Category <span style={{ color: "#888", fontWeight: 400 }}>(Select one)</span>
                                </div>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                    {industryCategories.map((cat) => (
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

                        {/* 02 CONTACT DETAILS */}
                        <section style={{ background: "white", borderRadius: 10, padding: "20px 22px", boxShadow: "0 1px 8px rgba(26,92,90,0.07)", border: `1px solid ${BORDER_COLOR}` }}>
                            <SectionHeader number="02" title="Contact Details" icon={<IconPhone />} />
                            <FormField label="Mobile Number" icon={<IconMobile />} value={form.mobile} onChange={set("mobile")} type="tel" />
                            <FormField label="Email Address" icon={<IconEmail />} value={form.email} onChange={set("email")} type="email" />
                            <FormField label="City / Country" icon={<IconLocation />} value={form.city} onChange={set("city")} />
                            <FormField label="LinkedIn Profile (if any)" icon={<IconLinkedIn />} value={form.linkedin} onChange={set("linkedin")} />
                        </section>

                        {/* 03 SPEAKER PROFILE */}
                        <section style={{ background: "white", borderRadius: 10, padding: "20px 22px", boxShadow: "0 1px 8px rgba(26,92,90,0.07)", border: `1px solid ${BORDER_COLOR}` }}>
                            <SectionHeader number="03" title="Speaker Profile" icon={<IconPerson />} gold />
                            <div style={{ marginBottom: 12 }}>
                                <div style={{ fontSize: 13, color: TEXT_DARK, fontWeight: 500, marginBottom: 6 }}>
                                    Brief Profile <span style={{ color: "#888", fontWeight: 400 }}>(100–150 words)</span>
                                </div>
                                <div
                                    style={{
                                        border: `1.5px solid ${BORDER_COLOR}`,
                                        borderRadius: 6,
                                        padding: 10,
                                        minHeight: 80,
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 6,
                                    }}
                                >
                                    <IconPerson size={20} color={TEAL} />
                                    <textarea
                                        value={form.briefProfile}
                                        onChange={(e) => set("briefProfile")(e.target.value)}
                                        rows={4}
                                        style={{
                                            border: "none",
                                            outline: "none",
                                            resize: "none",
                                            width: "100%",
                                            fontSize: 13,
                                            fontFamily: "'Segoe UI', sans-serif",
                                            color: TEXT_DARK,
                                            background: "transparent",
                                        }}
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
                                    style={{
                                        width: 80,
                                        border: `1.5px solid ${BORDER_COLOR}`,
                                        borderRadius: 4,
                                        padding: "4px 8px",
                                        fontSize: 13,
                                        outline: "none",
                                        fontFamily: "'Segoe UI', sans-serif",
                                    }}
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

                        {/* 07 EXPECTATIONS */}
                        <section style={{ background: "white", borderRadius: 10, padding: "20px 22px", boxShadow: "0 1px 8px rgba(26,92,90,0.07)", border: `1px solid ${BORDER_COLOR}` }}>
                            <SectionHeader number="07" title="Expectations" icon={<IconStar />} gold />
                            <div style={{ fontSize: 13, color: TEXT_DARK, fontWeight: 500, marginBottom: 10 }}>
                                Are you open for:
                            </div>
                            {[
                                "Sponsored Speaking Slot",
                                "Panel Participation",
                                "Knowledge Session Only",
                            ].map((opt) => (
                                <label
                                    key={opt}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 8,
                                        marginBottom: 8,
                                        fontSize: 13,
                                        color: TEXT_DARK,
                                        cursor: "pointer",
                                        fontFamily: "'Segoe UI', sans-serif",
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        checked={expectations.includes(opt)}
                                        onChange={() => toggleExpectation(opt)}
                                        style={{ accentColor: TEAL, width: 15, height: 15 }}
                                    />
                                    {opt}
                                </label>
                            ))}
                        </section>
                    </div>

                    {/* ── RIGHT COLUMN ── */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                        {/* 04 SESSION DETAILS */}
                        <section style={{ background: "white", borderRadius: 10, padding: "20px 22px", boxShadow: "0 1px 8px rgba(26,92,90,0.07)", border: `1px solid ${BORDER_COLOR}` }}>
                            <SectionHeader number="04" title="Session Details" icon={<IconCalendar />} />

                            {/* Preferred Track */}
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

                            {/* Topic */}
                            <div style={{ marginBottom: 14 }}>
                                <div style={{ fontSize: 13, color: TEXT_DARK, fontWeight: 500, marginBottom: 6 }}>
                                    Preferred Topic / Title of Talk
                                </div>
                                <div
                                    style={{
                                        border: `1.5px solid ${BORDER_COLOR}`,
                                        borderRadius: 6,
                                        padding: "8px 10px",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 8,
                                    }}
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill={TEAL}><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" /></svg>
                                    <input
                                        value={form.preferredTopic}
                                        onChange={(e) => set("preferredTopic")(e.target.value)}
                                        placeholder="Enter your talk title..."
                                        style={{ flex: 1, border: "none", outline: "none", fontSize: 13, fontFamily: "'Segoe UI', sans-serif", color: TEXT_DARK }}
                                    />
                                </div>
                            </div>

                            {/* Session Type */}
                            <div style={{ marginBottom: 14 }}>
                                <div style={{ fontSize: 13, color: TEXT_DARK, fontWeight: 500, marginBottom: 8 }}>
                                    Session Type <span style={{ color: "#888", fontWeight: 400 }}>(Select one)</span>
                                </div>
                                <div style={{ display: "flex", gap: 8 }}>
                                    {[
                                        { label: "Keynote", key: "keynote", icon: <IconMic /> },
                                        { label: "Panel Discussion", key: "panel", icon: <IconGroup /> },
                                        { label: "Expert Talk", key: "expert", icon: <IconChat /> },
                                    ].map((s) => (
                                        <SessionChip
                                            key={s.key}
                                            label={s.label}
                                            icon={s.icon}
                                            selected={sessionType === s.key}
                                            onClick={() => setSessionType(s.key)}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <div style={{ fontSize: 13, color: TEXT_DARK, fontWeight: 500, marginBottom: 6 }}>
                                    Brief Description of Topic <span style={{ color: "#888", fontWeight: 400 }}>(100–200 words)</span>
                                </div>
                                <div
                                    style={{
                                        border: `1.5px solid ${BORDER_COLOR}`,
                                        borderRadius: 6,
                                        padding: 10,
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 6,
                                    }}
                                >
                                    <IconDoc size={18} color={TEAL} />
                                    <textarea
                                        value={form.topicDescription}
                                        onChange={(e) => set("topicDescription")(e.target.value)}
                                        rows={5}
                                        style={{
                                            border: "none",
                                            outline: "none",
                                            resize: "none",
                                            width: "100%",
                                            fontSize: 13,
                                            fontFamily: "'Segoe UI', sans-serif",
                                            color: TEXT_DARK,
                                            background: "transparent",
                                        }}
                                        placeholder="Describe your topic briefly..."
                                    />
                                </div>
                            </div>
                        </section>

                        {/* 05 SPEAKING EXPERIENCE */}
                        <section style={{ background: "white", borderRadius: 10, padding: "20px 22px", boxShadow: "0 1px 8px rgba(26,92,90,0.07)", border: `1px solid ${BORDER_COLOR}` }}>
                            <SectionHeader number="05" title="Speaking Experience" icon={<IconPerson />} />
                            <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 12 }}>
                                <span style={{ fontSize: 13, color: TEXT_DARK, fontWeight: 500 }}>Have you spoken at conferences before?</span>
                                {["Yes", "No"].map((opt) => (
                                    <label key={opt} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: TEXT_DARK, cursor: "pointer" }}>
                                        <input
                                            type="checkbox"
                                            checked={spokenBefore === opt}
                                            onChange={() => setSpokenBefore(opt)}
                                            style={{ accentColor: TEAL, width: 14, height: 14 }}
                                        />
                                        {opt}
                                    </label>
                                ))}
                            </div>
                            {spokenBefore === "Yes" && (
                                <div>
                                    <div style={{ fontSize: 13, color: TEXT_DARK, fontWeight: 500, marginBottom: 6 }}>
                                        If Yes, mention details{" "}
                                        <span style={{ color: "#888", fontWeight: 400 }}>(Event Name / Organization / Year)</span>
                                    </div>
                                    <div
                                        style={{
                                            border: `1.5px solid ${BORDER_COLOR}`,
                                            borderRadius: 6,
                                            padding: 10,
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 6,
                                        }}
                                    >
                                        <HospMgmtIcon size={18} />
                                        <textarea
                                            value={form.eventDetails}
                                            onChange={(e) => set("eventDetails")(e.target.value)}
                                            rows={3}
                                            style={{
                                                border: "none",
                                                outline: "none",
                                                resize: "none",
                                                width: "100%",
                                                fontSize: 13,
                                                fontFamily: "'Segoe UI', sans-serif",
                                                color: TEXT_DARK,
                                                background: "transparent",
                                            }}
                                            placeholder="Event Name, Organization, Year..."
                                        />
                                    </div>
                                </div>
                            )}
                            {spokenBefore !== "Yes" && (
                                <div
                                    style={{
                                        border: `1.5px solid ${BORDER_COLOR}`,
                                        borderRadius: 6,
                                        padding: 10,
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 8,
                                        minHeight: 60,
                                        color: "#aaa",
                                        fontSize: 13,
                                    }}
                                >
                                    <HospMgmtIcon size={18} />
                                    <span>Select Yes above to enter event details</span>
                                </div>
                            )}
                        </section>

                        {/* 06 SUPPORTING DETAILS */}
                        <section style={{ background: "white", borderRadius: 10, padding: "20px 22px", boxShadow: "0 1px 8px rgba(26,92,90,0.07)", border: `1px solid ${BORDER_COLOR}` }}>
                            <SectionHeader number="06" title="Supporting Details" icon={<IconDoc />} />
                            <div style={{ fontSize: 13, color: TEXT_DARK, fontWeight: 500, marginBottom: 14 }}>
                                Please upload / provide the following:
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
                                {[
                                    { label: "Speaker Photo\n(HD)", sub: "JPG, PNG", icon: <IconBuild /> },
                                    { label: "Company Logo\n(if applicable)", sub: "JPG, PNG", icon: <IconBuild /> },
                                    { label: "Presentation\n(optional)", sub: "PPT, PDF (Max 10MB)", icon: <IconUpload /> },
                                ].map((item) => (
                                    <div
                                        key={item.label}
                                        style={{
                                            border: `1.5px solid ${BORDER_COLOR}`,
                                            borderRadius: 8,
                                            padding: "14px 10px",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            gap: 8,
                                            background: TRACK_BG,
                                        }}
                                    >
                                        {item.icon}
                                        <div style={{ textAlign: "center", fontSize: 12, color: TEXT_DARK, fontWeight: 500, lineHeight: 1.4 }}>
                                            {item.label.split("\\n").join("\n").split("\n").map((l, i) => (
                                                <div key={i}>{l}</div>
                                            ))}
                                        </div>
                                        <button
                                            style={{
                                                background: TEAL,
                                                color: "white",
                                                border: "none",
                                                borderRadius: 4,
                                                padding: "5px 16px",
                                                fontSize: 12,
                                                fontWeight: 600,
                                                cursor: "pointer",
                                                fontFamily: "'Segoe UI', sans-serif",
                                            }}
                                        >
                                            Upload
                                        </button>
                                        <div style={{ fontSize: 10, color: "#888", textAlign: "center" }}>{item.sub}</div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ fontSize: 11, color: "#888", marginTop: 10 }}>
                                Supported formats: JPG, PNG, PDF, PPT (Max size: 10MB each)
                            </div>
                        </section>

                        {/* 08 CONSENT */}
                        <section style={{ background: "white", borderRadius: 10, padding: "20px 22px", boxShadow: "0 1px 8px rgba(26,92,90,0.07)", border: `1px solid ${BORDER_COLOR}` }}>
                            <SectionHeader number="08" title="Consent" icon={<IconShield />} />
                            {[
                                { state: consent1, set: setConsent1, label: "I confirm that the above information is correct" },
                                { state: consent2, set: setConsent2, label: "I agree to be contacted by the organizing team" },
                            ].map((c) => (
                                <label
                                    key={c.label}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 8,
                                        marginBottom: 10,
                                        fontSize: 13,
                                        color: TEXT_DARK,
                                        cursor: "pointer",
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        checked={c.state}
                                        onChange={(e) => c.set(e.target.checked)}
                                        style={{ accentColor: TEAL, width: 15, height: 15 }}
                                    />
                                    {c.label}
                                </label>
                            ))}
                        </section>
                    </div>
                </div>

                {/* ── BOTTOM TAGLINE ── */}
                <div
                    style={{
                        background: LIGHT_TEAL_BG,
                        borderRadius: 8,
                        padding: "14px 24px",
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        marginTop: 24,
                        border: `1px solid ${BORDER_COLOR}`,
                    }}
                >
                    <div style={{ fontWeight: 800, fontSize: 15, color: TEAL, flexShrink: 0 }}>
                        BE PART OF A MOVEMENT THAT<br />BUILDS A HEALTHIER TOMORROW
                    </div>
                    <div style={{ flex: 1, display: "flex", justifyContent: "space-around" }}>
                        {[
                            { icon: <IconGroup size={22} />, label: "Network with\nIndustry Leaders" },
                            { icon: <IconStar size={22} color={TEAL} />, label: "Share Your\nExpertise" },
                            { icon: <IconChat size={22} />, label: "Influence Healthcare\nConversations" },
                            { icon: <IconBuild size={22} />, label: "Drive Innovation &\nPositive Change" },
                            { icon: <LeafIcon size={22} />, label: "Promote Health,\nWellness & AYUSH" },
                        ].map((item) => (
                            <div
                                key={item.label}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: 4,
                                    fontSize: 11,
                                    color: TEXT_DARK,
                                    textAlign: "center",
                                    lineHeight: 1.4,
                                }}
                            >
                                {item.icon}
                                {item.label.split("\n").map((l, i) => <div key={i}>{l}</div>)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
            <div
                style={{
                    background: `linear-gradient(135deg, ${TEAL} 0%, #0F3D3C 100%)`,
                    padding: "16px 36px",
                    display: "flex",
                    alignItems: "center",
                    gap: 24,
                }}
            >
                {/* Submit nomination */}
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, fontWeight: 500 }}>
                        SUBMIT YOUR NOMINATION
                    </div>
                    <button
                        style={{
                            background: GOLD,
                            color: "white",
                            border: "none",
                            borderRadius: 6,
                            padding: "10px 22px",
                            fontSize: 14,
                            fontWeight: 700,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            fontFamily: "'Segoe UI', sans-serif",
                            letterSpacing: 0.5,
                        }}
                        onClick={() => alert("Nomination submitted!")}
                    >
                        SUBMIT NOMINATION
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                        </svg>
                    </button>
                </div>

                {/* Last date */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "10px 18px",
                        border: "1.5px solid rgba(255,255,255,0.3)",
                        borderRadius: 8,
                    }}
                >
                    <IconCalendar size={20} color="white" />
                    <div>
                        <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 11 }}>LAST DATE TO APPLY</div>
                        <div style={{ color: "white", fontWeight: 800, fontSize: 16 }}>30 JUNE 2026</div>
                    </div>
                </div>

                {/* Contact */}
                <div style={{ flex: 1, fontSize: 12, color: "rgba(255,255,255,0.85)", lineHeight: 1.8 }}>
                    <div style={{ fontWeight: 700, fontSize: 12, color: "white", marginBottom: 4 }}>FOR QUERIES, CONTACT US</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <IconEmail size={12} color="rgba(255,255,255,0.7)" /> info@arogyasanghosthi.com
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <IconMobile size={12} color="rgba(255,255,255,0.7)" /> +91 98765 43210
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <IconLocation size={12} color="rgba(255,255,255,0.7)" /> www.ihwe.in
                    </div>
                </div>

                {/* QR placeholder */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div
                        style={{
                            width: 64,
                            height: 64,
                            background: "white",
                            borderRadius: 6,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            overflow: "hidden",
                        }}
                    >
                        <svg width="50" height="50" viewBox="0 0 50 50">
                            {/* Simple QR-like pattern */}
                            {[0, 1, 2, 3, 4, 5, 6].map((r) =>
                                [0, 1, 2, 3, 4, 5, 6].map((c) => {
                                    const on =
                                        (r < 3 && c < 3) ||
                                        (r < 3 && c > 3) ||
                                        (r > 3 && c < 3) ||
                                        ((r + c) % 2 === 0 && r > 2 && c > 2);
                                    return on ? (
                                        <rect key={`${r}-${c}`} x={c * 7 + 1} y={r * 7 + 1} width={6} height={6} fill={TEAL} />
                                    ) : null;
                                })
                            )}
                        </svg>
                    </div>
                    <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 10, textAlign: "center" }}>
                        SCAN TO<br />NOMINATE
                    </div>
                </div>
            </div>

            {/* ── DISCLAIMER ── */}
            <div
                style={{
                    background: LIGHT_TEAL_BG,
                    padding: "10px 36px",
                    textAlign: "center",
                    fontSize: 12,
                    color: TEAL,
                    fontStyle: "italic",
                    borderTop: `1px solid ${BORDER_COLOR}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                }}
            >
                <LeafIcon size={14} />
                Shortlisted speakers will be contacted by the organizing committee.
                <LeafIcon size={14} />
            </div>
        </div>
    );
}