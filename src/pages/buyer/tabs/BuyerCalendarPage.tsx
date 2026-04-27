import { useBuyerCtx } from '@/context/BuyerContext';
import BuyerCalendar from '@/components/dashboard/buyer/BuyerCalendar';

export default function BuyerCalendarPage() {
    const { data } = useBuyerCtx();
    return <BuyerCalendar data={data} />;
}
