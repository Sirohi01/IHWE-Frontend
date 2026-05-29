import DocumentCenterHero from "@/components/dashboard/exhibitor2/document_center/DocumentCenterHero";
import DocumentsCenter1 from "@/components/dashboard/exhibitor2/document_center/Documentscenter1";
import React from "react";

const DocumentCenter = () => {
    return (
        <div className="pt-4 px-6 bg-[#f4f6fb]">
            <DocumentCenterHero />
            <DocumentsCenter1 />
        </div>
    );
}

export default DocumentCenter;
