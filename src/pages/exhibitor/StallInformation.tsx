import DashboardHero from "@/components/dashboard/DashboardHero";
import StallProductManager from "@/components/dashboard/exhibitor/StallProductManager";
import { useExhibitorCtx } from "@/context/ExhibitorContext";

export default function StallInformation() {
    const { data } = useExhibitorCtx();

    return (
        <div className="space-y-6">
            <DashboardHero
                pageId="ex-stall-info"
                defaultTitle="Stall Information"
                defaultSubtitle="Your live stall allocation, event and venue details"
                type="exhibitor"
            />
            <StallProductManager data={data} mode="exhibitor" initialSection="stall-info" />
        </div>
    );
}
