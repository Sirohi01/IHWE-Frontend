import { useBuyerCtx } from '@/context/BuyerContext';
import BuyerProfile from '@/components/dashboard/buyer/BuyerProfile';

export default function BuyerProfilePage() {
    const { data, setData } = useBuyerCtx();
    return <BuyerProfile data={data} setData={setData} />;
}
