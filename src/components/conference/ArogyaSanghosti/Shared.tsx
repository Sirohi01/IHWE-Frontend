import React from "react";

export const TEAL = "#0B3C49";
export const GOLD = "#B8962E";
export const LIGHT_TEAL_BG = "#F4F7F7";
export const BORDER_COLOR = "#C5DCDB";
export const TEXT_DARK = "#1C2B3A";
export const TRACK_BG = "#F0F8F7";

export const SectionHeader: React.FC<{
    number: string;
    title: string;
    icon: React.ReactNode;
    gold?: boolean;
}> = ({ number, title, icon, gold = false }) => (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
        <div
            style={{
                background: gold ? GOLD : TEAL,
                display: "flex",
                alignItems: "center",
                padding: "8px 36px 8px 16px",
                clipPath: "polygon(0 0, 100% 0, 92% 100%, 0 100%)",
                minWidth: 280
            }}
        >
            <span style={{ color: "white", fontSize: 20, fontWeight: 800, marginRight: 12 }}>{number}</span>
            <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.3)", marginRight: 12 }}></div>
            <div style={{
                border: "1.5px solid rgba(255,255,255,0.6)",
                borderRadius: "50%",
                width: 28, height: 28,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginRight: 12
            }}>
                {icon}
            </div>
            <span style={{ color: "white", fontSize: 16, fontWeight: 700, letterSpacing: 1.5, fontFamily: "'Segoe UI', sans-serif" }}>
                {title.toUpperCase()}
            </span>
        </div>
        <div style={{ flex: 1, borderBottom: `2px solid ${gold ? GOLD : TEAL}`, opacity: 0.1, marginLeft: -20, zIndex: -1 }}></div>
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
    <div style={{ display: "flex", alignItems: "center", marginBottom: 14, gap: 12 }}>
        {icon && <span style={{ minWidth: 20, display: "flex", alignItems: "center" }}>{icon}</span>}
        <label
            style={{
                minWidth: 160,
                fontSize: 13,
                color: TEXT_DARK,
                fontFamily: "'Segoe UI', sans-serif",
                fontWeight: 600,
            }}
        >
            {label}
        </label>
        <span style={{ color: TEXT_DARK, fontWeight: 600 }}>:</span>
        {children ?? (
            <input
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange?.(e.target.value)}
                style={{
                    flex: 1,
                    border: `1px solid ${BORDER_COLOR}`,
                    borderRadius: 4,
                    outline: "none",
                    fontSize: 13,
                    padding: "8px 12px",
                    fontFamily: "'Segoe UI', sans-serif",
                    color: TEXT_DARK,
                    background: "#FAFAFA",
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
