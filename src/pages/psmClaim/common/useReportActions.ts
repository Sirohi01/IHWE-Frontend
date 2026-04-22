import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { psmClaimApi } from '@/services/psmClaimApi';
import { useReactToPrint } from 'react-to-print';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

interface UseReportActionsProps {
    reportType: string;
    reportId?: string;
    formData: any;
    componentRef: React.RefObject<HTMLDivElement | null>;
    exhibitorId?: string;
    onSaveSuccess?: () => void;
}

export const useReportActions = ({
    reportType,
    reportId,
    formData,
    componentRef,
    exhibitorId,
    onSaveSuccess
}: UseReportActionsProps) => {
    const navigate = useNavigate();
    const [saving, setSaving] = useState(false);
    const [isExporting, setIsExporting] = useState(false);

    // Dynamic document title for Print/PDF
    const documentTitle = `${reportType.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('_')}_${formData.companyName || formData.mseUnitName || 'Document'}`;

    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle: documentTitle,
    });

    const handleSave = async () => {
        setSaving(true);
        try {
            // Unified API call structure
            const res = await psmClaimApi.saveReport(reportType, {
                data: formData, // Many reports wrap in 'data'
                ...formData,    // Some use flat structure
                id: reportId,
                exhibitorId: exhibitorId
            });

            if (res.success) {
                toast.success(reportId ? 'Report updated' : 'Report saved');
                if (onSaveSuccess) {
                    onSaveSuccess();
                } else {
                    navigate(`/exhibitor-dashboard/psm-claim/reports-table/${reportType}`);
                }
            }
        } catch (error) {
            console.error("Save Error:", error);
            toast.error('Failed to save report');
        } finally {
            setSaving(false);
        }
    };

    const handleDownload = async () => {
        if (!componentRef.current) return;
        setIsExporting(true);

        try {
            // Small delay to ensure UI updates (hiding tooltips/hovers)
            await new Promise(resolve => setTimeout(resolve, 100));

            const dataUrl = await toPng(componentRef.current, {
                quality: 1,
                pixelRatio: 2,
                backgroundColor: '#ffffff',
                filter: (node: HTMLElement) => {
                    if (node.classList && node.classList.contains('no-print')) {
                        return false;
                    }
                    return true;
                }
            });

            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(dataUrl);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${documentTitle}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
            toast.error('Failed to generate PDF. Use Print instead.');
        } finally {
            setIsExporting(false);
        }
    };

    return {
        saving,
        isExporting,
        handleSave,
        handlePrint,
        handleDownload
    };
};
