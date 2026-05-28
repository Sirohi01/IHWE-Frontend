import EventDashboard from "@/components/dashboard/exhibitor2/my_event/EventDashboard";
import EventDashboard1 from "@/components/dashboard/exhibitor2/my_event/Eventdashboard1";

import MyEventHero from "@/components/dashboard/exhibitor2/my_event/MyEventHero";
import React from "react";

const MyEvent = () => {
    return (

        <div className="pt-4 px-6 bg-[#f4f6fb]">
            <MyEventHero />
            <EventDashboard />
            <EventDashboard1 />
        </div>

    )
}

export default MyEvent;