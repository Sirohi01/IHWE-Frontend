import React from "react";
import { TEAL, GOLD, TEXT_DARK } from "./Shared";

interface HeroProps {
    heroImg: string;
    arogyaLogo: string;
}

export const HeroSection: React.FC<HeroProps> = ({ heroImg, arogyaLogo }) => {
    return (
        <div
            style={{
                background: "#FFFFFF",
                overflow: "hidden",
                margin: 0,
                padding: 0,
                lineHeight: 0,
                position: "relative"
            }}
        >

            <img
                src={heroImg}
                alt="Hero Banner"
                style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    margin: 0,
                    padding: 0
                }}
            />

            <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "var(--hero-padding, 3.5% 6%)",
                lineHeight: "normal",
                boxSizing: "border-box"
            }}>

                {/* Completely left-aligned container */}
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    textAlign: "left"
                }}>

                    {/* Logo */}
                    <img src={arogyaLogo} alt="Arogya Logo" style={{
                        height: "var(--hero-logo-height, 20vw)",
                        minHeight: "var(--hero-logo-min-height, 160px)",
                        width: "auto",
                        alignSelf: "flex-start"
                    }} />

                    {/* Badge - Normal font weight */}
                    <div style={{ marginTop: 6 }}>
                        <div style={{
                            background: TEAL,
                            color: "white",
                            padding: "6px 24px",
                            borderRadius: "24px",
                            fontSize: "var(--hero-sub-size, 1.4vw)",
                            fontWeight: 400,
                            clipPath: "polygon(5% 0, 95% 0, 100% 50%, 95% 100%, 5% 100%, 0 50%)",
                            display: "inline-block"
                        }}>
                            18<sup>TH</sup> EDITION
                        </div>
                    </div>

                    {/* Subtitle - Normal font weight */}
                    <div style={{
                        color: TEAL,
                        fontSize: "var(--hero-sub-size, 1.1vw)",
                        fontWeight: 400,
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                        marginTop: 4
                    }}>
                        India's Premier Healthcare & AYUSH Conference
                    </div>

                    {/* Main Heading - Normal font weight */}
                    <h1 style={{
                        color: TEAL,
                        margin: "8px 0 2px 0",
                        fontWeight: 400,
                        lineHeight: 1.1,
                        textTransform: "uppercase",
                        fontSize: "var(--hero-title-size, 4.5vw)",
                        textAlign: "left",
                        fontFamily: "'Helvetica Neue', Arial, sans-serif"
                    }}>
                        Speaker
                        <div style={{ fontSize: "var(--hero-title-sub-size, 2vw)", fontWeight: 400, opacity: 0.8, marginTop: "2px" }}>
                            Nomination Form
                        </div>
                    </h1>

                </div>
            </div>
        </div>
    );
};