import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useExhibitorCtx } from '../ExhibitorDashboard';
import ExhibitorDocuments from '../../components/dashboard/exhibitor/ExhibitorDocuments';

export default function ExhibitorDocumentsPage() {
    const { data, setData } = useExhibitorCtx();

    if (!data) return null;

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full"
        >
            <ExhibitorDocuments data={data} setData={setData} />
        </motion.div>
    );
}
