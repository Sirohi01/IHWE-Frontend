import React from "react";
import { TEAL, GOLD, LIGHT_TEAL_BG, BORDER_COLOR, TEXT_DARK } from "./Shared";
import {
    IconGroup, IconStar, IconChat, IconBuild, LeafIcon, IconCalendar,
    IconEmail, IconMobile, IconLocation
} from "./Icons";

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
            padding: "6px 16px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginTop: 20,
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
                        gap: 2,
                        fontSize: 11,
                        color: TEXT_DARK,
                        textAlign: "center",
                        lineHeight: 1.1,
                        fontWeight: 700,
                        flex: 1
                    }}
                >
                    <div style={{
                        width: 40,
                        height: 40,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 2
                    }}>
                        <img src={item.img} alt={item.label} style={{ width: 32, height: 32, objectFit: "contain" }} />
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
                padding: "6px 80px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
            }}
        >

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                }}
            >
                <IconCalendar size={18} color="white" />
                <div>
                    <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 10 }}>LAST DATE TO APPLY</div>
                    <div style={{ color: "white", fontWeight: 800, fontSize: 14 }}>30 JUNE 2026</div>
                </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "6px 18px", borderRadius: 8 }}>
                <div style={{ fontWeight: 800, fontSize: 12, color: "white", letterSpacing: "0.5px" }}>FOR QUERIES:</div>
                <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 13, color: "rgba(255,255,255,0.9)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <IconEmail size={16} color={GOLD} />
                        </div>
                        <span>info@ihwe.in</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <IconMobile size={16} color={GOLD} />
                        </div>
                        <span>+91-9654900525</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <IconLocation size={16} color={GOLD} />
                        </div>
                        <span>www.ihwe.in</span>
                    </div>
                </div>
            </div>



        </div>


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
                    <a href="/book-a-stand" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                        <button style={{ background: "white", color: TEAL, border: `1px solid ${TEAL}`, borderRadius: 5, padding: "7px 18px", fontSize: 13, fontWeight: 800, cursor: "pointer", width: "100%", height: "100%", letterSpacing: 0.3 }}>BOOK YOUR STALL</button>
                    </a>
                    <a href="/buyer-registration" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                        <button style={{ background: TEAL, color: "white", border: "none", borderRadius: 5, padding: "7px 18px", fontSize: 13, fontWeight: 800, cursor: "pointer", width: "100%", height: "100%", letterSpacing: 0.3 }}>REGISTER AS BUYER</button>
                    </a>
                </div>
            </div>
        </div>
    </>
);
