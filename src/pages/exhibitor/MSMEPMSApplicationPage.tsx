import { useExhibitorCtx } from '@/context/ExhibitorContext';
import MSMEPMSApplication from './MSMEPMSApplication';
export default function MSMEPMSApplicationPage() {
    const { data } = useExhibitorCtx();
    return <MSMEPMSApplication data={data} />;
}
