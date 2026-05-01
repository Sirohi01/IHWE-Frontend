import React from "react";
import { TEAL, GOLD } from "./Shared";

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
                lineHeight: 0
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
        </div>
    );
};
