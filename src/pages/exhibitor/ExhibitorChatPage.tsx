import { useExhibitorCtx } from '@/context/ExhibitorContext';
import ExhibitorChatTab from '@/components/dashboard/exhibitor/ExhibitorChatTab';
import DashboardHero from '@/components/dashboard/DashboardHero';

export default function ExhibitorChatPage() {
    const { data } = useExhibitorCtx();
    return (
        <div className="space-y-6">
            <DashboardHero 
                pageId="ex-chat" 
                defaultTitle="Exhibitor Chat" 
                defaultSubtitle="Connect with buyers and organizers in real-time"
                type="exhibitor" 
            />
            <ExhibitorChatTab data={data} />
        </div>
    );
}
