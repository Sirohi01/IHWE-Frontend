import DocumentCenterHero from "@/components/dashboard/exhibitor/document_center/DocumentCenterHero";
import DocumentsCenter1 from "@/components/dashboard/exhibitor/document_center/Documentscenter1";
import React from "react";

const DocumentCenter = () => {
    return (
        <div className="bg-white min-h-screen">
            <DocumentCenterHero />
            <div className="px-6 pb-6 mt-1">
                <DocumentsCenter1 />
            </div>
        </div>
    );
}

export default DocumentCenter;
