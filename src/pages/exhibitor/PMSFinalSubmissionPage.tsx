import { useExhibitorCtx } from '@/context/ExhibitorContext';
import PMSFinalSubmission from './PMSFinalSubmission';

export default function PMSReimbursementApprovedPage() {
    const { data } = useExhibitorCtx();

    return (
        <PMSFinalSubmission
            data={data}
            onBack={() => console.log('back to claim status')}
        />
    );
}