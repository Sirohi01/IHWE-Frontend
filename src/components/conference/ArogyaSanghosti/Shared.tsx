import React from "react";

export const TEAL = "#0B3C49";
export const GOLD = "#B8962E";
export const LIGHT_TEAL_BG = "#F4F7F7";
export const BORDER_COLOR = "#E2E8F0"; // Lighter border like Figma
export const TEXT_DARK = "#1C2B3A";
export const TRACK_BG = "#F8FAFC";

export const SectionHeader: React.FC<{
    number: string;
    title: string;
    icon: React.ReactNode;
    gold?: boolean;
}> = ({ number, title, icon, gold = false }) => (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 10, position: "relative" }}>
        <div
            style={{
                background: gold ? GOLD : TEAL,
                display: "flex",
                alignItems: "center",
                padding: "4px 18px 4px 8px",
                clipPath: "polygon(0 0, 95% 0, 100% 50%, 95% 100%, 0 100%)",
                minWidth: 180,
                borderRadius: "4px 0 0 4px"
            }}
        >
            <div style={{
                background: "rgba(255,255,255,0.15)",
                borderRadius: "50%",
                width: 28, height: 28,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginRight: 10,
                color: "white",
                fontWeight: 800,
                fontSize: 15
            }}>
                {number}
            </div>
            <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.2)", marginRight: 10 }}></div>
            <div style={{ marginRight: 8, display: "flex", alignItems: "center", scale: "0.9" }}>
                {icon}
            </div>
            <span style={{ color: "white", fontSize: 13, fontWeight: 700, letterSpacing: 1, fontFamily: "'Segoe UI', sans-serif" }}>
                {title.toUpperCase()}
            </span>
        </div>
    </div>
);

// New component for Section Boxes
export const SectionBox: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div style={{
        background: "white",
        border: `1px solid ${BORDER_COLOR}`,
        borderRadius: 12,
        padding: "10px 18px",
        marginBottom: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
        position: "relative",
    }}>
        {children}
    </div>
);

export const FormField: React.FC<{
    label: string;
    icon?: React.ReactNode;
    children?: React.ReactNode;
    type?: string;
    value?: string | number;
    onChange?: (v: string) => void;
    placeholder?: string;
}> = ({ label, icon, children, type = "text", value, onChange, placeholder }) => (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 8, gap: 10 }}>
        {icon && <span style={{ minWidth: 18, display: "flex", alignItems: "center", opacity: 0.6 }}>{icon}</span>}
        <label
            style={{
                minWidth: 180,
                fontSize: 12,
                color: TEXT_DARK,
                fontFamily: "'Segoe UI', sans-serif",
                fontWeight: 600,
            }}
        >
            {label}
        </label>
        <span style={{ color: "#94A3B8", fontWeight: 400, marginRight: 8 }}>:</span>
        {children ?? (
            <input
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange?.(e.target.value)}
                style={{
                    flex: 1,
                    border: "none",
                    borderBottom: `1.2px solid ${BORDER_COLOR}`,
                    outline: "none",
                    fontSize: 13,
                    padding: "4px 0",
                    fontFamily: "'Segoe UI', sans-serif",
                    color: TEXT_DARK,
                    background: "transparent",
                }}
            />
        )}
    </div>
);

export const CategoryChip: React.FC<{
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
            gap: 8,
            border: `1.5px solid ${selected ? TEAL : BORDER_COLOR}`,
            borderRadius: 10,
            padding: "15px 12px",
            background: selected ? "rgba(11, 60, 73, 0.05)" : "white",
            cursor: "pointer",
            minWidth: 100,
            fontSize: 11,
            fontFamily: "'Segoe UI', sans-serif",
            color: TEXT_DARK,
            fontWeight: 600,
            transition: "all 0.2s",
            boxShadow: selected ? "0 4px 10px rgba(11, 60, 73, 0.1)" : "none"
        }}
    >
        {icon}
        <span style={{ textAlign: "center", lineHeight: 1.2 }}>{label}</span>
    </button>
);

export const TrackChip: React.FC<{
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
            gap: 12,
            border: `1.5px solid ${selected ? TEAL : BORDER_COLOR}`,
            borderRadius: 12,
            padding: "12px 24px",
            background: selected ? "rgba(11, 60, 73, 0.05)" : "white",
            cursor: "pointer",
            fontSize: 14,
            fontFamily: "'Segoe UI', sans-serif",
            color: TEXT_DARK,
            fontWeight: 600,
            flex: 1,
            justifyContent: "center",
            transition: "all 0.2s",
        }}
    >
        {icon}
        <span style={{ whiteSpace: "pre-line" }}>{label}</span>
    </button>
);

export const SessionChip: React.FC<{
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
            gap: 10,
            border: `1.5px solid ${selected ? TEAL : BORDER_COLOR}`,
            borderRadius: 10,
            padding: "12px 20px",
            background: selected ? "rgba(11, 60, 73, 0.05)" : "white",
            cursor: "pointer",
            fontSize: 13,
            fontFamily: "'Segoe UI', sans-serif",
            color: TEXT_DARK,
            fontWeight: 600,
            flex: 1,
            justifyContent: "center",
            transition: "all 0.2s",
        }}
    >
        {icon}
        <span>{label}</span>
    </button>
);

export const ExpertiseChip: React.FC<{
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
            padding: "8px 16px",
            background: selected ? "rgba(11, 60, 73, 0.05)" : "white",
            cursor: "pointer",
            fontSize: 12,
            fontFamily: "'Segoe UI', sans-serif",
            color: TEXT_DARK,
            fontWeight: 600,
            whiteSpace: "nowrap",
            transition: "all 0.2s",
        }}
    >
        {icon}
        <span>{label}</span>
    </button>
);
