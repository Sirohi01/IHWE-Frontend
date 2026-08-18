import { useExhibitorCtx } from '@/context/ExhibitorContext';
import ExhibitorMSME from '@/components/dashboard/exhibitor/ExhibitorMSME';

// ExhibitorMSME already renders its own contextual header ("Udyam
// Registration Details" bar) — stacking the generic DashboardHero banner on
// top of it was two large headers back to back, which is most of why this
// page felt overly long. Dropped it.
export default function ExhibitorMSMEPage() {
    const { data } = useExhibitorCtx();
    return (
        <div className="p-3">
            <ExhibitorMSME data={data} />
        </div>
    );
}
