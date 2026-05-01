import React from "react";
import { TEAL, GOLD } from "./Shared";

interface HeroProps {
    heroImg: string;
    arogyaLogo: string;
}

export const HeroSection: React.FC<HeroProps> = ({ heroImg }) => {
    return (
        <div
            style={{

                background: "#FFFFFF",
                overflow: "hidden",
            }}
        >
            <img
                src={heroImg}
                alt="Hero Banner"
                style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                    objectPosition: "right center",
                    display: "block"
                }}
            />
        </div>
    );
};
