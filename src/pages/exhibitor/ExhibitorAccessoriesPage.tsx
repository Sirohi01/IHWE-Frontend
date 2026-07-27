import { useExhibitorCtx } from '@/context/ExhibitorContext';
import StallExtras from '@/components/dashboard/exhibitor/StallExtras';
export default function ExhibitorAccessoriesPage() {
    const { data } = useExhibitorCtx();
    return (
        <div className="space-y-6">
            <StallExtras data={data} />
        </div>
    );
}
