import { useExhibitorCtx } from '@/context/ExhibitorContext';
import ExhibitorBSM from '@/components/dashboard/exhibitor/ExhibitorBSM';

export default function ExhibitorBSMPage() {
    const { data } = useExhibitorCtx();
    return <ExhibitorBSM data={data} />;
}
