import { useExhibitorCtx } from '@/context/ExhibitorContext';
import StallExtras from '@/components/dashboard/exhibitor/StallExtras';

export default function ExhibitorAccessoriesPage() {
    const { data } = useExhibitorCtx();
    return <StallExtras data={data} />;
}
