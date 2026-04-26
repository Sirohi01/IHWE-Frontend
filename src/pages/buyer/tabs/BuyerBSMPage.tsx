import { useBuyerCtx } from '@/context/BuyerContext';
import BuyerBSM from '@/components/dashboard/buyer/BuyerBSM';

export default function BuyerBSMPage() {
    const { data } = useBuyerCtx();
    return <BuyerBSM data={data} />;
}
