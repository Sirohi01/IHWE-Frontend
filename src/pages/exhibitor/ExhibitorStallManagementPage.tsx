import StallProductManager from "@/components/dashboard/exhibitor/StallProductManager";
import { useExhibitorCtx } from "@/context/ExhibitorContext";

export default function ExhibitorStallManagementPage() {
    const { data } = useExhibitorCtx();
    return <StallProductManager data={data} />;
}
