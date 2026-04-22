import { useNavigate } from 'react-router-dom';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import ExhibitorEvents from '@/components/dashboard/exhibitor/ExhibitorEvents';

export default function ExhibitorEventsPage() {
    const { data, allRegistrations, fetchDashboard, setLoading } = useExhibitorCtx();
    const navigate = useNavigate();
    return (
        <ExhibitorEvents
            data={data}
            allRegistrations={allRegistrations}
            setLoading={setLoading}
            fetchDashboard={fetchDashboard}
            setActiveTab={(tab: string) => navigate(`/exhibitor-dashboard/${tab === 'dashboard' ? '' : tab}`)}
        />
    );
}
