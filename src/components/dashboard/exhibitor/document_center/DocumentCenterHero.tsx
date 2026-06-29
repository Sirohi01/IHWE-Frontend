import React from "react";
import exbanImg from "@/assets/exbanner.webp";

const DocumentCenterHero: React.FC = () => {
    return (
        <div className="w-full -mt-1.5">
            <div className="w-full relative flex flex-col justify-center rounded-none">
                <img
                    src={exbanImg}
                    alt="Exhibitor Banner"
                    className="w-full h-[90px] md:h-[110px] lg:h-[130px] object-cover object-center rounded-none"
                />
            </div>
        </div>
    );
};

export default DocumentCenterHero;