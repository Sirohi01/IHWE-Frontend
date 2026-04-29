import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import ExhibitorDocuments from '../../components/dashboard/exhibitor/ExhibitorDocuments';

import DashboardHero from '@/components/dashboard/DashboardHero';

export default function ExhibitorDocumentsPage() {
    const { data, setData } = useExhibitorCtx();

    if (!data) return null;

    return (
        <div className="space-y-6">
            <DashboardHero 
                pageId="ex-docs" 
                defaultTitle="Official Documents" 
                defaultSubtitle="Download exhibitor manuals, gate passes, and legal forms"
                type="exhibitor" 
            />
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full"
            >
                <ExhibitorDocuments data={data} setData={setData} />
            </motion.div>
        </div>
    );
}
