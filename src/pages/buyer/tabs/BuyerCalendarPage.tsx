import BuyerCalendar from "@/components/dashboard/buyer/BuyerCalendar";
import { useAuth } from "@/context/BuyerAuthContext";

export default function BuyerCalendarPage() {
    const { currentBuyer } = useAuth();
    
    if (!currentBuyer) return null;
    
    return (
        <div className="space-y-6">
            <BuyerCalendar data={currentBuyer} />
        </div>
    );
}
