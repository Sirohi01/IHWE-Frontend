import { useState } from "react";
import ExTab from "@/components/dashboard/exhibitor2/ex_profile/ExTab";
import OverviewStart from "@/components/dashboard/exhibitor2/ex_profile/OverviewStart";
const Overview = () => {
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div>
            <ExTab activeTab={activeTab} setActiveTab={setActiveTab} onPreview={() => window.open('/profile')} />
            <OverviewStart />
        </div>
    );
};

export default Overview;