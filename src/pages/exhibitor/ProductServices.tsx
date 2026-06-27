import DashboardHero from "@/components/dashboard/DashboardHero";
import StallProductManager from "@/components/dashboard/exhibitor/StallProductManager";
import { useExhibitorCtx } from "@/context/ExhibitorContext";

export default function ProductServices() {
    const { data } = useExhibitorCtx();

    return (
        <div className="space-y-6">
            <DashboardHero
                pageId="ex-products-services"
                defaultTitle="My Product/Services"
                defaultSubtitle="Manage your live product catalogue and enquiries"
                type="exhibitor"
            />
            <StallProductManager data={data} mode="seller" initialSection="products" />
        </div>
    );
}
