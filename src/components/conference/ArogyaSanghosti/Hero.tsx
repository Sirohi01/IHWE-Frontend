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
                padding: "3.5% 6%",
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
                        height: "20vw",
                        minHeight: "160px",
                        width: "auto",
                        alignSelf: "flex-start"
                    }} />

                    {/* Badge - Gap reduced */}
                    <div style={{ marginTop: 6 }}>
                        <div style={{
                            background: TEAL,
                            color: "white",
                            padding: "6px 24px",
                            borderRadius: "24px",
                            fontSize: "1.4vw",
                            fontWeight: 800,
                            clipPath: "polygon(5% 0, 95% 0, 100% 50%, 95% 100%, 5% 100%, 0 50%)",
                            display: "inline-block"
                        }}>
                            18<sup>TH</sup> EDITION
                        </div>
                    </div>


                    <div style={{
                        color: TEAL,
                        fontSize: "1.1vw",
                        fontWeight: 800,
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                        marginTop: 4
                    }}>
                        India's Premier Healthcare & AYUSH Conference
                    </div>


                    <h1 style={{
                        color: TEAL,
                        margin: "8px 0 2px 0",
                        fontWeight: 900,
                        lineHeight: 1.1,
                        textTransform: "uppercase",
                        fontSize: "4.5vw",
                        textAlign: "left"
                    }}>
                        Speaker
                        <div style={{ fontSize: "2vw", fontWeight: 700, opacity: 0.8, marginTop: "2px" }}>
                            Nomination Form
                        </div>
                    </h1>




                </div>
            </div>
        </div>
    );
};