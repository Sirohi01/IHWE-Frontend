import { useNavigate } from 'react-router-dom';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import ExhibitorEvents from '@/components/dashboard/exhibitor/ExhibitorEvents';
import DashboardHero from '@/components/dashboard/DashboardHero';

export default function ExhibitorEventsPage() {
    const { data, allRegistrations, fetchDashboard, setLoading } = useExhibitorCtx();
    const navigate = useNavigate();
    return (
        <div className="space-y-6">
            <DashboardHero 
                pageId="ex-events" 
                defaultTitle="My Exhibitions" 
                defaultSubtitle="Track your participation across all IHWE editions"
                type="exhibitor" 
            />
            <ExhibitorEvents
                data={data}
                allRegistrations={allRegistrations}
                setLoading={setLoading}
                fetchDashboard={fetchDashboard}
                setActiveTab={(tab: string) => navigate(`/exhibitor-dashboard/${tab === 'dashboard' ? '' : tab}`)}
            />
        </div>
    );
}
