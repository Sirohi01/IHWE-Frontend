import { useExhibitorCtx } from '@/context/ExhibitorContext';
import ExhibitorMSME from '@/components/dashboard/exhibitor/ExhibitorMSME';

export default function ExhibitorMSMEPage() {
    const { data } = useExhibitorCtx();
    return <ExhibitorMSME data={data} />;
}
