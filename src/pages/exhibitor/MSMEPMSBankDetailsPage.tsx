import { useExhibitorCtx } from '@/context/ExhibitorContext';
import MSMEPMSBankDetails from './MSMEPMSBankDetails';
export default function MSMEPMSBankDetailsPage() {
    const { data } = useExhibitorCtx();
    return <MSMEPMSBankDetails data={data} />;
}
