import { useExhibitorCtx } from '@/context/ExhibitorContext';
import MarketingToolkit from '@/components/dashboard/exhibitor2/MarketingToolkit';

export default function ExhibitorMarketingPage() {
    const { data } = useExhibitorCtx();
    return <MarketingToolkit data={data} />;
}
