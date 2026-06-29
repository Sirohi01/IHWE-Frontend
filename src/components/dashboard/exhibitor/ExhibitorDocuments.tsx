import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Image as ImageIcon, ExternalLink, Trash2, FolderPlus, Download, Plus, Loader2 } from 'lucide-react';
import { API_URL, SERVER_URL } from '@/lib/api';
import { toast } from 'sonner';

const DEFAULT_PLACEHOLDER = "https://placehold.co/400x400?text=No+Document";

const fixUrl = (url: string | null | undefined) => {
    if (!url || url === 'undefined' || url === 'null' || url === '') return DEFAULT_PLACEHOLDER;
    if (url.startsWith('http') || url.startsWith('blob:')) return url;
    const cleanPath = url.startsWith('/') ? url : `/${url}`;
    return url.includes('res.cloudinary.com') ? url : `${SERVER_URL}${cleanPath}`;
};

interface DocsProps {
    data: any;
    setData: (data: any) => void;
}

export default function ExhibitorDocuments({ data, setData }: DocsProps) {
    const [label, setLabel] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadingField, setUploadingField] = useState<string | null>(null);
    const kycFileInputRef = useRef<HTMLInputElement>(null);
    const activeKycField = useRef<string | null>(null);

    const triggerKycUpload = (field: string) => {
        activeKycField.current = field;
        kycFileInputRef.current?.click();
    };

    const handleKycFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        const field = activeKycField.current;
        e.target.value = '';
        if (!selected || !field) return;

        if (selected.size > 5 * 1024 * 1024) { toast.error('File size should be less than 5MB'); return; }

        setUploadingField(field);
        try {
            const token = localStorage.getItem('exhibitorToken');
            const fd = new FormData();
            fd.append(field, selected);
            const res = await fetch(`${API_URL}/exhibitor-auth/update-profile?id=${data._id}`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${token}` },
                body: fd,
            });
            const result = await res.json();
            if (result.success) {
                toast.success('Document uploaded successfully');
                if (result.data) setData(result.data);
            } else {
                toast.error(result.message || 'Upload failed');
            }
        } catch {
            toast.error('Upload failed');
        } finally {
            setUploadingField(null);
        }
    };

    const handleUpload = async () => {
        if (!label || !file) { toast.error('Label and File are required'); return; }
        setUploading(true);
        try {
            const fd = new FormData();
            fd.append('label', label);
            fd.append('file', file);
            const res = await fetch(`${API_URL}/exhibitor-registration/${data._id}/special-docs`, {
                method: 'POST',
                body: fd
            });
            const result = await res.json();
            if (result.success) {
                toast.success('Document added successfully');
                setLabel('');
                setFile(null);
                const refreshRes = await fetch(`${API_URL}/exhibitor-auth/dashboard?id=${data._id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('exhibitorToken')}` }
                });
                const refreshData = await refreshRes.json();
                if (refreshData.success) setData(refreshData.data);
            }
        } catch { toast.error('Upload failed'); }
        finally { setUploading(false); }
    };

    const handleDelete = async (docId: string) => {
        if (!confirm('Are you sure you want to delete this document?')) return;
        try {
            const res = await fetch(`${API_URL}/exhibitor-registration/${data._id}/special-docs/${docId}`, {
                method: 'DELETE'
            });
            const result = await res.json();
            if (result.success) {
                toast.success('Document deleted');
                const refreshRes = await fetch(`${API_URL}/exhibitor-auth/dashboard?id=${data._id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('exhibitorToken')}` }
                });
                const refreshData = await refreshRes.json();
                if (refreshData.success) setData(refreshData.data);
            }
        } catch { toast.error('Delete failed'); }
    };

    const kycDocs = [
        { label: 'Company Logo', url: data.companyLogoUrl, field: 'companyLogo' },
        { label: 'PAN Card', url: data.panCardFrontUrl, field: 'panCardFront' },
        { label: 'Aadhaar (Front)', url: data.aadhaarCardFrontUrl, field: 'aadhaarCardFront' },
        { label: 'Aadhaar (Back)', url: data.aadhaarCardBackUrl, field: 'aadhaarCardBack' },
        { label: 'GST Certificate', url: data.gstCertificateUrl, field: 'gstCertificate' },
        { label: 'Cancelled Cheque', url: data.cancelledChequeUrl, field: 'cancelledCheque' },
        { label: 'Profile Photo', url: data.representativePhotoUrl, field: 'representativePhoto' },
    ];

    const officialDocs = [
        { label: 'Registration PDF', url: data.registrationPdfUrl, icon: FileText, color: 'bg-[#23471d]' },
        { label: 'Payment Receipt', url: data.receiptPdfUrl, icon: Download, color: 'bg-[#d26019]' },
    ].filter(d => d.url);

    const isImage = (url: string) => url?.match(/\.(jpg|jpeg|png|webp|gif|avif)$/i) || url?.includes('res.cloudinary.com/image/upload');

    const handleDownload = async (url: string, label: string) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `${label.replace(/\s+/g, '_')}_${Date.now()}.${blob.type.split('/')[1] || 'bin'}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
            toast.success('Download started');
        } catch {
            // Fallback to direct link if fetch fails (e.g. CORS)
            window.open(url, '_blank');
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xs font-black uppercase tracking-widest text-[#23471d] border-b pb-1.5 flex items-center gap-2">
                <FileText size={16} /> Documentation Center
            </h2>

            {/* Official / Downloadable Section */}
            {officialDocs.length > 0 && (
                <div className="bg-slate-50 border border-slate-200 rounded-md p-3">
                    <h3 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Official IHWE Records</h3>
                    <div className="flex flex-wrap gap-2">
                        {officialDocs.map((doc, i) => (
                            <button key={i} onClick={() => handleDownload(fixUrl(doc.url), doc.label)}
                                className={`flex items-center gap-2 px-3 py-1.5 text-white text-[9px] font-black uppercase tracking-widest transition-all hover:scale-105 shadow-sm rounded-[2px] ${doc.color}`}>
                                <doc.icon size={12} /> {doc.label} (Download)
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* KYC Section */}
            <div className="bg-white border border-slate-200 rounded-md overflow-hidden">
                <div className="px-3 py-1.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                    <h3 className="text-[9px] font-bold text-white uppercase tracking-widest flex items-center gap-2">
                        <ImageIcon size={12} /> Business & KYC Credentials
                    </h3>
                </div>
                <input type="file" ref={kycFileInputRef} className="hidden" accept="image/*,.pdf" onChange={handleKycFileChange} />
                <div className="p-3 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3">
                    {kycDocs.map((doc, i) => {
                        const url = fixUrl(doc.url);
                        const hasUrl = !!doc.url && doc.url !== 'undefined' && doc.url !== 'null';
                        const urlIsImage = hasUrl && isImage(url);
                        const isUploadingThis = uploadingField === doc.field;

                        return (
                            <div key={i} className="flex flex-col border border-slate-100 rounded p-1.5 bg-slate-50/50">
                                <span className="text-[8px] font-bold text-slate-400 uppercase mb-1.5 truncate">{doc.label}</span>
                                <div className="aspect-square bg-slate-200 rounded-sm overflow-hidden relative group border border-slate-200">
                                    {isUploadingThis ? (
                                        <div className="w-full h-full flex items-center justify-center bg-slate-100">
                                            <Loader2 size={18} className="text-[#23471d] animate-spin" />
                                        </div>
                                    ) : hasUrl ? (
                                        <>
                                            {urlIsImage ? (
                                                <img src={url} alt={doc.label} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 gap-1">
                                                    <FileText size={20} className="text-rose-500" />
                                                    <span className="text-[7px] font-black text-slate-400 uppercase">PDF FILE</span>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                                                <button onClick={() => triggerKycUpload(doc.field)}
                                                   title="Replace File"
                                                   className="p-1.5 bg-white rounded-full text-black hover:bg-slate-100 shadow-sm transition-all transform hover:scale-110">
                                                    <Upload size={10} />
                                                </button>
                                                <button onClick={() => handleDownload(url, doc.label)}
                                                   title="Force Download"
                                                   className="p-1.5 bg-white rounded-full text-black hover:bg-slate-100 shadow-sm transition-all transform hover:scale-110">
                                                    <Download size={10} />
                                                </button>
                                                <a href={url} target="_blank" rel="noopener noreferrer" title="View Direct" className="p-1.5 bg-white/20 rounded-full text-white hover:bg-white/40 shadow-sm">
                                                    <ExternalLink size={10} />
                                                </a>
                                            </div>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => triggerKycUpload(doc.field)}
                                            title="Upload File"
                                            className="w-full h-full flex items-center justify-center text-slate-300 hover:text-[#23471d] hover:bg-slate-100 transition-colors"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    )}
                                </div>
                                {!hasUrl && <p className="text-[7px] text-center mt-1 font-bold text-rose-500 uppercase tracking-tighter">Missing</p>}
                                {hasUrl && <p className="text-[7px] text-center mt-1 font-bold text-emerald-600 uppercase tracking-tighter">Verified</p>}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Special Documents Section */}
            <div className="bg-white border border-slate-200 rounded-md overflow-hidden shadow-sm">
                <div className="px-3 py-1.5 bg-[#23471d] border-b border-[#1a3516] flex items-center justify-between">
                    <h3 className="text-[9px] font-bold text-white uppercase tracking-widest flex items-center gap-2">
                        <FolderPlus size={12} /> Special Documents
                    </h3>
                </div>
                <div className="p-3">
                    {/* Add New - Compact */}
                    <div className="flex flex-wrap items-center gap-2 mb-4 p-3 bg-slate-50 border border-slate-100 rounded">
                        <input className="flex-1 h-7 px-2 border border-slate-300 rounded-[1px] text-[10px] font-medium outline-none focus:border-[#23471d]"
                            value={label} onChange={e => setLabel(e.target.value)} placeholder="Doc Title" />
                        
                        <input type="file" accept="image/*,.pdf" className="text-[9px] text-slate-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-[9px] file:font-bold file:bg-[#23471d] file:text-white"
                            onChange={e => setFile(e.target.files?.[0] || null)} />
                        
                        <button onClick={handleUpload} disabled={uploading}
                            className="h-7 px-3 bg-[#23471d] text-white text-[9px] font-bold uppercase tracking-widest hover:bg-[#1a3516] disabled:opacity-50 rounded-[1px]">
                            {uploading ? 'Wait...' : 'Add Document'}
                        </button>
                    </div>

                    {/* List Section - Compact Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                        {data.specialDocuments?.length > 0 ? (
                            data.specialDocuments.map((doc: any) => (
                                <div key={doc._id} className="flex items-center justify-between p-2 border border-slate-200 bg-white shadow-sm hover:border-[#d26019]/30 transition-all rounded-[2px] group">
                                    <div className="flex items-center gap-2 overflow-hidden">
                                        <div className="w-6 h-6 rounded bg-amber-50 flex items-center justify-center flex-shrink-0">
                                            <FileText size={12} className={isImage(doc.url) ? "text-emerald-600" : "text-rose-500"} />
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="text-[10px] font-bold text-slate-700 truncate">{doc.label}</p>
                                            <p className="text-[7px] text-slate-400 font-black uppercase tracking-tighter">{isImage(doc.url) ? 'Image' : 'PDF Document'}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-1">
                                        <button onClick={() => handleDownload(fixUrl(doc.url), doc.label)}
                                            className="p-1 text-slate-600 hover:bg-slate-100 rounded transition-colors" title="Force Download">
                                            <Download size={11} />
                                        </button>
                                        <button onClick={() => handleDelete(doc._id)}
                                            className="p-1 text-rose-600 hover:bg-rose-50 rounded transition-colors opacity-0 group-hover:opacity-100" title="Delete">
                                            <Trash2 size={11} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-6 text-center bg-slate-50/50 border border-dashed border-slate-200 rounded">
                                 <p className="text-[9px] text-slate-300 font-bold uppercase tracking-widest italic">No extra records found</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            <p className="text-[9px] font-medium text-slate-400 italic text-center">Documentation Center is for keeping additional IHWE records and downloads.</p>
        </div>
    );
}
