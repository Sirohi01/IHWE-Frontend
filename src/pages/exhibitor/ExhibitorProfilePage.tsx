import { useExhibitorCtx } from '@/context/ExhibitorContext';
import ExhibitorProfile from '@/components/dashboard/exhibitor/ExhibitorProfile';

export default function ExhibitorProfilePage() {
    const { data, setData } = useExhibitorCtx();
    return <ExhibitorProfile data={data} setData={setData} />;
}
