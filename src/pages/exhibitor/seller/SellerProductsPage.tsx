import StallProductManager from "@/components/dashboard/exhibitor/StallProductManager";
import { useExhibitorCtx } from "@/context/ExhibitorContext";
import DashboardHero from "@/components/dashboard/DashboardHero";

export default function SellerProductsPage() {
    const { data } = useExhibitorCtx();
    return (
        <div className="space-y-6">
            <DashboardHero
                pageId="sl-products"
                defaultTitle="Product Catalog"
                defaultSubtitle="Your digital showroom for international buyers"
                type="seller"
            />
            <StallProductManager data={data} mode="seller" initialSection="products" />
        </div>
    );
}