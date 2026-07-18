import { useExhibitorCtx } from '@/context/ExhibitorContext';
import MSMEPMSApplication from './MSMEPMSApplication';
import MSMEPMSReviewConfirmation from './MSMEApplicationReview';
export default function MSMEApplicationReviewPage() {
    const { data } = useExhibitorCtx();
    return <MSMEPMSReviewConfirmation data={data} onBack={()=>console.log("hello")} onContinue={()=>console.log("continue")} />;
}
