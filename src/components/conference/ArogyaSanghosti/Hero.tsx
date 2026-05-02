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

                <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start" }}>

                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        <img src={arogyaLogo} alt="Arogya Logo" style={{ height: "11vw", minHeight: "80px", width: "auto", alignSelf: "flex-start" }} />

                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{
                                background: TEAL,
                                color: "white",
                                padding: "6px 28px",
                                borderRadius: "24px",
                                fontSize: "1.3vw",
                                fontWeight: 800,
                                clipPath: "polygon(5% 0, 95% 0, 100% 50%, 95% 100%, 5% 100%, 0 50%)",
                            }}>
                                18<sup>TH</sup> EDITION
                            </div>
                        </div>

                        <div style={{ color: TEAL, fontSize: "1vw", fontWeight: 800, letterSpacing: "0.5px", textTransform: "uppercase" }}>
                            India's Premier Healthcare & AYUSH Conference
                        </div>
                    </div>


                    <div style={{ width: "1.5px", height: "13vw", background: "#E2E8F0", margin: "0 20px", opacity: 0.8 }}></div>


                    <div style={{ textAlign: "left", flex: 1 }}>
                        <h1 style={{
                            color: TEAL,
                            margin: "10px 10px 10px 10px",
                            fontWeight: 900,
                            lineHeight: 1,
                            textTransform: "uppercase",
                            fontSize: "4vw"
                        }}>
                            Speaker<br />
                            <span style={{ opacity: 0.8, fontSize: "1.9vw", fontWeight: 700 }}>Nomination Form</span>
                        </h1>
                        <div style={{ marginTop: 12, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 6, color: TEXT_DARK, fontSize: "0.9vw", fontWeight: 600 }}>
                                <span style={{ color: GOLD }}>⬩</span>
                                <span style={{ opacity: 0.7 }}>Share Your Knowledge.</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 6, color: TEXT_DARK, fontSize: "0.9vw", fontWeight: 600 }}>
                                <span style={{ color: GOLD }}>⬩</span>
                                <span style={{ opacity: 0.7 }}>Inspire Change. Shape the Future.</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAR RIGHT BADGE (Building Healthier Future) */}



            </div>
        </div >

    );
};
