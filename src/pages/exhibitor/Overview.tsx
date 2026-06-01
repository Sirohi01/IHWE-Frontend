import { useState } from "react";
import ExTab from "@/components/dashboard/exhibitor/ex_profile/ExTab";
import OverviewStart from "@/components/dashboard/exhibitor/ex_profile/OverviewStart";
import CompanyDetails from "@/components/dashboard/exhibitor/ex_profile/CompanyDetails";

const Overview = () => {
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div>
            <ExTab activeTab={activeTab} setActiveTab={setActiveTab} onPreview={() => window.open('/profile')} />
            {activeTab === "overview" && <OverviewStart />}
            {activeTab === "company-details" && <CompanyDetails />}
        </div>
    );
};

export default Overview;
