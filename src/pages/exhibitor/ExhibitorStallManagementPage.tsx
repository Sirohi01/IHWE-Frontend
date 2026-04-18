import StallProductManager from "@/components/dashboard/exhibitor/StallProductManager";
import { useExhibitorCtx } from "@/pages/ExhibitorDashboard";

export default function ExhibitorStallManagementPage() {
    const { data } = useExhibitorCtx();
    return <StallProductManager data={data} />;
}
