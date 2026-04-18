import { useExhibitorCtx } from '../ExhibitorDashboard';
import ExhibitorChatTab from '@/components/dashboard/exhibitor/ExhibitorChatTab';

export default function ExhibitorChatPage() {
    const { data } = useExhibitorCtx();
    return <ExhibitorChatTab data={data} />;
}
