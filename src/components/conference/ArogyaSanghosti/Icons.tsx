import React from "react";

const TEAL = "#0B3C49";
const GOLD = "#B8962E";

export const IconPerson = ({ size = 16, color = "white" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
    </svg>
);
export const IconPhone = ({ size = 16, color = "white" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
    </svg>
);
export const IconBriefcase = ({ size = 16, color = "white" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M20 7h-4V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm-8-2h4v2h-4V5z" />
    </svg>
);
export const IconCalendar = ({ size = 16, color = "white" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H5V8h14v13z" />
    </svg>
);
export const IconStar = ({ size = 16, color = "white" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
);
export const IconShield = ({ size = 16, color = "white" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
    </svg>
);
export const IconDoc = ({ size = 16, color = "white" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z" />
    </svg>
);
export const IconMic = ({ size = 18, color = TEAL }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M12 15c1.66 0 3-1.34 3-3V6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V6zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-2.08c3.39-.49 6-3.39 6-6.92h-2z" />
    </svg>
);
export const IconGroup = ({ size = 18, color = TEAL }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
);
export const IconChat = ({ size = 18, color = TEAL }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
    </svg>
);
export const IconMobile = ({ size = 15, color = TEAL }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" />
    </svg>
);
export const IconEmail = ({ size = 15, color = TEAL }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
);
export const IconLocation = ({ size = 15, color = TEAL }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
);
export const IconLinkedIn = ({ size = 15, color = TEAL }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);
export const IconUpload = ({ size = 22, color = TEAL }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
    </svg>
);
export const IconBuild = ({ size = 22, color = TEAL }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" />
    </svg>
);

export const LeafIcon = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={TEAL}>
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 4-10 8-1.33-2.67-4-5.33-8-6C4 5 4 5 4 5 4 5 6 8 17 8z" />
    </svg>
);
export const PillIcon = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={TEAL}>
        <path d="M4.22 11.29l6.34-6.34c1.64-1.64 4.3-1.64 5.95 0l2.54 2.54c1.64 1.64 1.64 4.3 0 5.95l-6.34 6.34c-1.64 1.64-4.3 1.64-5.95 0l-2.54-2.54c-1.64-1.64-1.64-4.3 0-5.95zm1.41 4.55l2.54 2.54c.78.78 2.05.78 2.83 0l3.18-3.18-5.37-5.37-3.18 3.18c-.78.78-.78 2.05 0 2.83z" />
    </svg>
);
export const ChipIcon = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={TEAL}>
        <path d="M9 3H7v2H5v2H3v2h2v2H3v2h2v2H3v2h2v2h2v-2h2v2h2v-2h2v2h2v-2h2v-2h2v-2h-2v-2h2v-2h-2V9h2V7h-2V5h-2V3h-2v2h-2V3H9zm4 4H7v10h10V7h-4z" />
    </svg>
);
export const WellnessIcon = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={TEAL}>
        <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </svg>
);
export const HospMgmtIcon = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={TEAL}>
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H8v-4h4v4zm4-8H8V7h8v2zm0 4h-2v-2h2v2z" />
    </svg>
);
export const ResearchIcon = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={TEAL}>
        <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 14H8v-2h8v2zm0-4H8v-2h8v2zm0-4H8V6h8v2z" />
    </svg>
);
export const PolicyIcon = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={TEAL}>
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
    </svg>
);

export const AyushTrackIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={TEAL}>
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 4-10 8-1.33-2.67-4-5.33-8-6C4 5 4 5 4 5 4 5 6 8 17 8z" />
    </svg>
);
export const MedicalIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#E0445A">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 15h-2v-2h2v2zm2.07-7.75-.9.92C13.45 10.9 13 11.5 13 13h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
    </svg>
);
export const BothIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={TEAL}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
);

export const DoctorIcon = () => (
    <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="16" r="8" fill={TEAL} opacity="0.15" />
        <path d="M24 8a8 8 0 1 1 0 16A8 8 0 0 1 24 8z" stroke={TEAL} strokeWidth="2" fill="none" />
        <path d="M8 40c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke={TEAL} strokeWidth="2" fill="none" />
        <rect x="20" y="28" width="8" height="10" rx="1" fill={TEAL} opacity="0.2" />
        <line x1="24" y1="30" x2="24" y2="36" stroke={TEAL} strokeWidth="1.5" />
        <line x1="21" y1="33" x2="27" y2="33" stroke={TEAL} strokeWidth="1.5" />
    </svg>
);
export const AyushIcon = () => (
    <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
        <path d="M24 6 C24 6 10 18 10 28 a14 14 0 0 0 28 0 C38 18 24 6 24 6z" stroke={TEAL} strokeWidth="2" fill={TEAL} opacity="0.1" />
        <path d="M18 24 Q24 16 30 24" stroke={TEAL} strokeWidth="1.5" fill="none" />
        <circle cx="24" cy="28" r="4" fill={TEAL} opacity="0.3" />
    </svg>
);
export const HospitalIcon = () => (
    <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="16" width="32" height="26" rx="2" stroke={TEAL} strokeWidth="2" fill={TEAL} opacity="0.1" />
        <path d="M16 16V12a8 8 0 0 1 16 0v4" stroke={TEAL} strokeWidth="2" fill="none" />
        <line x1="24" y1="22" x2="24" y2="34" stroke={TEAL} strokeWidth="2" />
        <line x1="18" y1="28" x2="30" y2="28" stroke={TEAL} strokeWidth="2" />
    </svg>
);
export const UnivIcon = () => (
    <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
        <polygon points="24,6 44,16 24,26 4,16" stroke={TEAL} strokeWidth="2" fill={TEAL} opacity="0.1" />
        <rect x="12" y="26" width="6" height="10" stroke={TEAL} strokeWidth="1.5" fill="none" />
        <rect x="30" y="26" width="6" height="10" stroke={TEAL} strokeWidth="1.5" fill="none" />
        <line x1="4" y1="38" x2="44" y2="38" stroke={TEAL} strokeWidth="2" />
    </svg>
);
export const PharmaIcon = () => (
    <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
        <rect x="14" y="10" width="20" height="28" rx="3" stroke={TEAL} strokeWidth="2" fill={TEAL} opacity="0.1" />
        <line x1="14" y1="22" x2="34" y2="22" stroke={TEAL} strokeWidth="1.5" />
        <line x1="24" y1="27" x2="24" y2="33" stroke={TEAL} strokeWidth="1.5" />
        <line x1="21" y1="30" x2="27" y2="30" stroke={TEAL} strokeWidth="1.5" />
    </svg>
);
export const StartupIcon = () => (
    <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
        <path d="M24 4 L40 20 L32 20 L32 36 L16 36 L16 20 L8 20 Z" stroke={TEAL} strokeWidth="2" fill={TEAL} opacity="0.1" />
        <circle cx="24" cy="12" r="3" fill={TEAL} opacity="0.4" />
    </svg>
);
export const OtherDotsIcon = () => (
    <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
        <circle cx="16" cy="24" r="3" fill={TEAL} />
        <circle cx="24" cy="24" r="3" fill={TEAL} />
        <circle cx="32" cy="24" r="3" fill={TEAL} />
    </svg>
);
