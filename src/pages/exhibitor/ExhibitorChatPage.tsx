import { useExhibitorCtx } from '@/context/ExhibitorContext';
import ExhibitorChatTab from '@/components/dashboard/exhibitor/ExhibitorChatTab';

export default function ExhibitorChatPage() {
    const { data } = useExhibitorCtx();
    return (
        <div className="h-[calc(100vh-56px)] flex flex-col bg-[#f8fafc] py-2 px-3 lg:py-3 lg:px-4 overflow-hidden">
            <ExhibitorChatTab data={data} />
        </div>
    );
}
