import { useExhibitorCtx } from '../ExhibitorDashboard';
import ExhibitorProfile from '@/components/dashboard/exhibitor/ExhibitorProfile';

export default function ExhibitorProfilePage() {
    const { data } = useExhibitorCtx();
    return <ExhibitorProfile data={data} />;
}
