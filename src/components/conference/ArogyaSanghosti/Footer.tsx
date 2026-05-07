import React from "react";
import { TEAL, GOLD, LIGHT_TEAL_BG, BORDER_COLOR, TEXT_DARK } from "./Shared";
import {
    IconGroup, IconStar, IconChat, IconBuild, LeafIcon, IconCalendar,
    IconEmail, IconMobile, IconLocation
} from "./Icons";

// ─── IMAGE IMPORTS ────────────────────────────────────────────────────────
import networkImg from "../../../assets/arogyasangostiimageform/Network with industry leaders.png";
import shareExpertiseImg from "../../../assets/arogyasangostiimageform/SHARE YOUR EXPERTISE.png";
import influenceImg from "../../../assets/arogyasangostiimageform/nfluence heathcare conversation.png";
import driveInnovationImg from "../../../assets/arogyasangostiimageform/Drive Innovation & Positive.png";
import promoteHealthImg from "../../../assets/arogyasangostiimageform/wellness & lifestyle.png";

export const BottomTagline = () => (
    <div
        style={{
            background: "#FFFFFF",
            borderRadius: 8,
            padding: "10px 20px",
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginTop: 30,
            marginBottom: 0,
            marginLeft: 70,
            marginRight: 70,
            border: `1px solid ${BORDER_COLOR}`,
        }}
    >
        <div style={{ fontWeight: 800, fontSize: 15, color: TEAL, flexShrink: 0 }}>
            BE PART OF A MOVEMENT THAT<br />BUILDS A HEALTHIER TOMORROW
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "space-around" }}>
            {[
                { img: networkImg, label: "Network with\nIndustry Leaders" },
                { img: shareExpertiseImg, label: "Share Your\nExpertise" },
                { img: influenceImg, label: "Influence Healthcare\nConversations" },
                { img: driveInnovationImg, label: "Drive Innovation &\nPositive Change" },
                { img: promoteHealthImg, label: "Promote Health,\nWellness & AYUSH" },
            ].map((item) => (
                <div
                    key={item.label}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 8,
                        fontSize: 10,
                        color: TEXT_DARK,
                        textAlign: "center",
                        lineHeight: 1.2,
                        fontWeight: 700,
                        flex: 1
                    }}
                >
                    <div style={{
                        width: 70,
                        height: 70,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 4
                    }}>
                        <img src={item.img} alt={item.label} style={{ width: 64, height: 64, objectFit: "contain" }} />
                    </div>
                    {item.label.split("\n").map((l, i) => <div key={i}>{l}</div>)}
                </div>
            ))}
        </div>
    </div>
);

export const Footer = () => (
    <>
        <div
            style={{
                background: `linear-gradient(135deg, ${TEAL} 0%, #0F3D3C 100%)`,
                padding: "16px 80px",
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
            <div style={{ flex: 1, fontSize: 12, color: "rgba(255,255,255,0.85)", lineHeight: 1.6 }}>
                <div style={{ fontWeight: 800, fontSize: 12, color: "white", marginBottom: 6, letterSpacing: "0.5px" }}>FOR QUERIES, CONTACT US</div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 2 }}>
                    <IconEmail size={14} color={GOLD} /> <span style={{ opacity: 0.9 }}>info@ihwe.in</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 2 }}>
                    <IconMobile size={14} color={GOLD} /> <span style={{ opacity: 0.9 }}>+91-9654900525</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <IconLocation size={14} color={GOLD} /> <span style={{ opacity: 0.9 }}>www.ihwe.in</span>
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

        {/* Disclaimer & Organised By */}
        <div
            style={{
                background: LIGHT_TEAL_BG,
                padding: "15px 80px",
                fontSize: 12,
                color: TEAL,
                borderTop: `1px solid ${BORDER_COLOR}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontStyle: "italic" }}>
                <LeafIcon size={14} />
                Shortlisted speakers will be contacted by the organizing committee.
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: TEAL }}>Organised By</div>
                    <div style={{ height: 25, width: 1, background: BORDER_COLOR }}></div>
                    <div style={{ fontSize: 12, fontWeight: 900, color: TEAL, letterSpacing: 0.5 }}>NAMO GANGE WELLNESS PVT. LTD.</div>
                </div>

                <div style={{ display: "flex", gap: 10 }}>
                    <button style={{ background: "white", color: TEAL, border: `1px solid ${TEAL}`, borderRadius: 4, padding: "4px 12px", fontSize: 10, fontWeight: 800, cursor: "pointer" }}>BOOK YOUR STALL</button>
                    <button style={{ background: TEAL, color: "white", border: "none", borderRadius: 4, padding: "4px 12px", fontSize: 10, fontWeight: 800, cursor: "pointer" }}>REGISTER AS BUYER</button>
                </div>
            </div>
        </div>
    </>
);
