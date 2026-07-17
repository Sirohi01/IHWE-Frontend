import { useExhibitorCtx } from '@/context/ExhibitorContext';
import MSMEPMSDocumentsUpload from './MSMEPMSDocumentsUpload';
export default function MSMEPMSDocumentsUploadPage() {
    const { data } = useExhibitorCtx();
    return <MSMEPMSDocumentsUpload data={data} onBack={()=> console.log("hello")} onContinue={()=>console.log("hello")} />;
}
