import { useState } from "react";
import ExTab from "@/components/dashboard/exhibitor/ex_profile/ExTab";
import OverviewStart from "@/components/dashboard/exhibitor/ex_profile/OverviewStart";
import CompanyDetails from "@/components/dashboard/exhibitor/ex_profile/CompanyDetails";
import TeamMembersTab from "@/components/dashboard/exhibitor/ex_profile/TeamMembersTab";
import SocialMediaTab from "@/components/dashboard/exhibitor/ex_profile/SocialMediaTab";
import StallExtras from "@/components/dashboard/exhibitor/StallExtras";
import { useExhibitorCtx } from "@/context/ExhibitorContext";
import DocumentCenter from "@/pages/exhibitor/DocumentCenter";


const Overview = () => {
    const [activeTab, setActiveTab] = useState("overview");
    const { data } = useExhibitorCtx();

    return (
        <div>
            <ExTab activeTab={activeTab} setActiveTab={setActiveTab} onPreview={() => window.open('/profile')} />
            {activeTab === "overview" && <OverviewStart />}
            {activeTab === "company-details" && <CompanyDetails />}
            {activeTab === "products" && <StallExtras data ={data} />}
            {activeTab === "team" && <TeamMembersTab />}
            {activeTab === "documents" && <DocumentCenter / >}
            {activeTab === "social" && <SocialMediaTab />}
        </div>
    );
};

export default Overview;
