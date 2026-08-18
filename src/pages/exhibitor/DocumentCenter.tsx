import React, { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DocumentCenterHero from "@/components/dashboard/exhibitor/document_center/DocumentCenterHero";
import { DocumentsList, DocumentPreviewPanel, Doc, DocCategory, DocStatus } from "@/components/dashboard/exhibitor/document_center/Documentscenter1";
import { useExhibitorCtx } from "@/context/ExhibitorContext";
import { API_URL } from "@/lib/api";
import { logActivity } from "@/utils/activityLogger";

const DocumentCenter = () => {
    const { data } = useExhibitorCtx();
    const clientId = data?._id;

    const [docs, setDocs] = useState<Doc[]>([]);
    const [activeTab, setActiveTab] = useState<string>("All Documents");
    const [statusFilter, setStatusFilter] = useState<string>("All");
    const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [pendingUploads, setPendingUploads] = useState<{ [key: string]: { url: string, ext: string, file: File } }>({});
    const fileInputRef = useRef<HTMLInputElement>(null);

    const fetchDocs = async () => {
        if (!clientId) return;
        try {
            const [reqRes, docsRes] = await Promise.all([
                fetch(`${API_URL}/document-requirements`),
                fetch(`${API_URL}/client-documents/${clientId}`)
            ]);
            const reqData = await reqRes.json();
            const docsData = await docsRes.json();

            if (Array.isArray(reqData)) {
                const uploadedMap = new Map();
                if (Array.isArray(docsData)) {
                    docsData.forEach((d: any) => uploadedMap.set(d.document_name, d));
                }

                const formatted = reqData.map((d: any) => {
                    const uploaded = uploadedMap.get(d.document_name);
                    return {
                        id: uploaded?._id || d._id || d.id,
                        title: d.document_name,
                        type: uploaded?.file_type || "PDF",
                        size: uploaded?.size || "-",
                        date: uploaded ? new Date(uploaded.updated).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : "-",
                        category: (d.category === "MSME Related Documents" ? "MSME Related" : "General Documents") as DocCategory,
                        status: (uploaded?.status === "Approved" ? "Approved" : uploaded?.status === "Rejected" ? "Rejected" : uploaded?.status === "Pending" ? "Under Review" : "Pending Upload") as DocStatus,
                        uploadedBy: uploaded?.uploaded_by || "-",
                        uploadDate: uploaded ? new Date(uploaded.added).toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : "-",
                        previewUrl: uploaded?.file_url ? (uploaded.file_url.startsWith('http') ? uploaded.file_url.replace(/\.pdf$/i, '.jpg') : `${API_URL.replace('/api', '')}${uploaded.file_url}`) : undefined,
                        originalPdfUrl: uploaded?.file_url
                    };
                });
                setDocs(formatted);
                setSelectedDocId(prev => prev || (formatted.length > 0 ? formatted[0].id : null));
            }
        } catch (e) {
            console.error("Failed to fetch documents", e);
        }
    };

    useEffect(() => {
        fetchDocs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clientId]);

    const selectedDoc = docs.find(d => d.id === selectedDocId) || null;

    const uploadDocDirect = (doc: Doc, file: File) => {
        if (!clientId) return;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('client_id', clientId);
        formData.append('document_name', doc.title);
        formData.append('category', doc.category === "MSME Related" ? "MSME Related Documents" : "General Documents");
        formData.append('uploaded_by', data?.exhibitorName || 'Exhibitor');

        const uploadPromise = fetch(`${API_URL}/client-documents/upload`, {
            method: 'POST',
            body: formData
        }).then(async (res) => {
            const result = await res.json();
            if (!res.ok) throw new Error(result.message || 'Failed to upload');
            return result;
        });

        toast.promise(uploadPromise, {
            pending: 'Uploading your document...',
            success: 'Your document has been sent for admin review.',
            error: {
                render({ data }: any) {
                    return data?.message || 'An error occurred during upload';
                }
            }
        }).then(() => {
            logActivity('Documents', 'Uploaded Document', `Document: ${doc.title}`);
            fetchDocs();
        }).catch(() => { });
    };

    const handleCardFilePick = (doc: Doc, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedDocId(doc.id);
            uploadDocDirect(doc, file);
        }
        e.target.value = '';
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && selectedDoc) {
            const url = URL.createObjectURL(file);
            const ext = file.name.split('.').pop()?.toUpperCase() || "PDF";
            setPendingUploads(prev => ({ ...prev, [selectedDoc.id]: { url, ext, file } }));
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleSaveUpload = async () => {
        if (selectedDoc && pendingUploads[selectedDoc.id]) {
            const { file } = pendingUploads[selectedDoc.id];

            if (!file || !clientId) {
                toast.error(`Missing ${!file ? 'file' : ''} ${!file && !clientId ? 'and' : ''} ${!clientId ? 'client ID' : ''}`);
                return;
            }

            const formData = new FormData();
            formData.append('file', file);
            formData.append('client_id', clientId);
            formData.append('document_name', selectedDoc.title);
            formData.append('category', selectedDoc.category === "MSME Related" ? "MSME Related Documents" : "General Documents");
            formData.append('uploaded_by', data?.exhibitorName || 'Exhibitor');

            const uploadPromise = fetch(`${API_URL}/client-documents/upload`, {
                method: 'POST',
                body: formData
            }).then(async (res) => {
                const result = await res.json();
                if (!res.ok) throw new Error(result.message || 'Failed to upload');
                return result;
            });

            try {
                await toast.promise(uploadPromise, {
                    pending: 'Uploading your document...',
                    success: 'Your document has been sent for admin review.',
                    error: {
                        render({ data }: any) {
                            return data?.message || 'An error occurred during upload';
                        }
                    }
                });

                logActivity('Documents', 'Uploaded Document', `Document: ${selectedDoc.title}`);
                setPendingUploads(prev => { const newUploads = { ...prev }; delete newUploads[selectedDoc.id]; return newUploads; });
                await fetchDocs();
            } catch (err) {
                // Error is handled by toast.promise
            }
        } else {
            toast.error("Please select a file first");
        }
    };

    const handleDeleteDoc = () => {
        if (selectedDoc && selectedDoc.status === "Under Review") {
            Swal.fire({
                title: 'Delete Document?',
                text: "You are about to delete this document from review.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#dc2626',
                cancelButtonColor: '#6b7280',
                confirmButtonText: 'Yes, delete it!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await fetch(`${API_URL}/client-documents/${selectedDoc.id}`, { method: 'DELETE' });
                        logActivity('Documents', 'Deleted Document', `Document: ${selectedDoc.title}`);
                        await fetchDocs();
                        Swal.fire({ title: 'Deleted!', text: 'Your document has been removed.', icon: 'success', confirmButtonColor: '#f0730d' });
                    } catch (err) {
                        Swal.fire('Error', 'Failed to delete document', 'error');
                    }
                }
            });
        }
    };

    const getDocumentUrl = (url: string | undefined) => {
        if (!url) return '#';
        let validUrl = url;
        if (!validUrl.startsWith('http')) {
            validUrl = `${API_URL.replace('/api', '')}${validUrl}`;
        }
        if (validUrl.includes('cloudinary.com') && validUrl.startsWith('http://')) {
            validUrl = validUrl.replace('http://', 'https://');
        }
        return validUrl;
    };

    return (
        <div className="bg-[#f8f9fb] min-h-screen">
            <ToastContainer position="top-right" autoClose={3000} theme="colored" />
            <div className="px-6 pb-6">
                {/* Left column: hero + stats/tabs/grid. Right column: preview panel,
                    both starting from the same top row, per the reference layout. */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                    <div className="lg:col-span-8 xl:col-span-9 min-w-0">
                        <DocumentCenterHero />
                        <div className="mt-2.5">
                            <DocumentsList
                                docs={docs}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                                statusFilter={statusFilter}
                                setStatusFilter={setStatusFilter}
                                selectedDocId={selectedDocId}
                                setSelectedDocId={setSelectedDocId}
                                viewMode={viewMode}
                                setViewMode={setViewMode}
                                onPickFile={handleCardFilePick}
                            />
                        </div>
                    </div>

                    <div className="lg:col-span-4 xl:col-span-3 sticky top-4">
                        <DocumentPreviewPanel
                            selectedDoc={selectedDoc}
                            pendingUpload={selectedDoc ? pendingUploads[selectedDoc.id] : undefined}
                            onClose={() => setSelectedDocId(null)}
                            fileInputRef={fileInputRef}
                            onFileChange={handleFileUpload}
                            onSaveUpload={handleSaveUpload}
                            onDeleteDoc={handleDeleteDoc}
                            getDocumentUrl={getDocumentUrl}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DocumentCenter;
