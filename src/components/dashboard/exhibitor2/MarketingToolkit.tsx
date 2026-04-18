import { useState, useEffect, useRef } from 'react';
import { 
    Megaphone, Download, Share2, Image as ImageIcon, 
    Video as VideoIcon, Sparkles, ChevronRight, CheckCircle2,
    Loader2, AlertCircle, RefreshCcw
} from 'lucide-react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { API_URL, SERVER_URL } from '@/lib/api';
import { toast } from 'sonner';

interface Template {
    _id: string;
    name: string;
    category: string;
    type: string;
    templateUrl: string;
    config: any;
}

export default function MarketingToolkit({ data }: { data: any }) {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [isBulkDownloading, setIsBulkDownloading] = useState(false);

    useEffect(() => {
        fetchTemplates();
    }, []);

    const forceDownload = async (url: string, filename: string) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = filename || 'ihwe-asset';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Download error:', error);
            // Fallback to direct link if fetch fails (CORS issue etc)
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            link.target = "_blank";
            link.click();
        }
    };

    const fetchTemplates = async () => {
        try {
            const r = await fetch(`${API_URL}/marketing-toolkit/templates?exhibitorId=${data._id}`);
            const res = await r.json();
            if (res.success) {
                setTemplates(res.data);
            }
        } catch (error) {
            console.error('Error fetching templates:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleSelect = (id: string) => {
        setSelectedIds(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === templates.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(templates.map(t => t._id));
        }
    };

    const handleBulkDownload = async () => {
        if (selectedIds.length === 0) return;
        setIsBulkDownloading(true);
        const zip = new JSZip();
        
        try {
            toast.info("Preparing your assets zip...");
            
            for (let i = 0; i < selectedIds.length; i++) {
                const id = selectedIds[i];
                const tpl = templates.find(t => t._id === id);
                if (!tpl) continue;

                // Fetch file as blob
                const response = await fetch(`${SERVER_URL}${tpl.templateUrl}`);
                const blob = await response.blob();
                
                // Get extension from URL or use a default
                const ext = tpl.templateUrl.split('.').pop() || 'png';
                const filename = `${tpl.name.replace(/\s+/g, '_')}_${i + 1}.${ext}`;
                
                // Add to zip
                zip.file(filename, blob);
                
                // Update usage count
                fetch(`${API_URL}/marketing-toolkit/usage/${id}`, { method: 'POST' });
            }

            // Generate and download zip
            const content = await zip.generateAsync({ type: 'blob' });
            saveAs(content, `IHWE_Marketing_Assets_${new Date().getTime()}.zip`);
            
            toast.success(`${selectedIds.length} assets packaged and downloaded!`);
            setSelectedIds([]); // Clear selection after success
        } catch (error) {
            console.error('Bulk download error:', error);
            toast.error('Bulk download failed');
        } finally {
            setIsBulkDownloading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 p-4">
                <Loader2 className="w-8 h-8 text-[#23471d] animate-spin mb-4" />
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fetching Assets...</p>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 p-6">
                <div className="flex flex-center items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#fff7ed] rounded-lg flex items-center justify-center border border-orange-100 shadow-sm">
                            <Megaphone className="w-6 h-6 text-[#ea580c]" />
                        </div>
                        <div>
                            <h2 className="text-sm font-black text-[#1e293b] uppercase tracking-tighter">Marketing Toolkit</h2>
                            <p className="text-[10px] text-slate-500 font-medium">Download pre-branded assets from our official IHWE team</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        {templates.length > 0 && (
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={toggleSelectAll}
                                    className="text-[9px] font-black uppercase text-slate-400 hover:text-[#23471d] transition-colors"
                                >
                                    {selectedIds.length === templates.length ? 'Deselect All' : 'Select All'}
                                </button>
                                <button
                                    onClick={handleBulkDownload}
                                    disabled={selectedIds.length === 0 || isBulkDownloading}
                                    className={`
                                        bg-[#23471d] text-white px-4 py-2 rounded-sm text-[9px] font-black uppercase tracking-widest shadow-md 
                                        hover:bg-[#1a3516] transition-all flex items-center gap-2 
                                        ${(selectedIds.length === 0 || isBulkDownloading) ? 'opacity-30 grayscale cursor-not-allowed' : 'opacity-100'}
                                    `}
                                >
                                    {isBulkDownloading ? (
                                        <Loader2 size={12} className="animate-spin" />
                                    ) : (
                                        <Download size={12} />
                                    )}
                                    Download Selected ({selectedIds.length})
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-1 h-5 bg-[#d26019] rounded-full" />
                    <h3 className="text-[11px] font-black text-[#1e293b] uppercase tracking-widest">Available Assets ({templates.length})</h3>
                </div>

                {!templates.length && (
                    <div className="bg-white border-2 border-dashed border-slate-200 rounded-lg p-12 flex flex-col items-center justify-center text-center">
                        <ImageIcon className="w-12 h-12 text-slate-200 mb-4" />
                        <p className="text-[12px] font-bold text-slate-400 uppercase">No assets shared with you yet</p>
                    </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {templates.map((tpl) => (
                        <div 
                            key={tpl._id} 
                            className="bg-white border border-slate-100 overflow-hidden transition-all duration-300 group hover:border-slate-300 shadow-sm hover:shadow-md"
                        >
                            <div className="relative aspect-square bg-slate-100 overflow-hidden">
                                {tpl.category === 'Video' ? (
                                    <video 
                                        src={`${SERVER_URL}${tpl.templateUrl}`} 
                                        className="w-full h-full object-cover"
                                        muted
                                        onMouseOver={(e) => e.currentTarget.play()}
                                        onMouseOut={(e) => e.currentTarget.pause()}
                                    />
                                ) : (
                                    <img src={`${SERVER_URL}${tpl.templateUrl}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={tpl.name} />
                                )}
                                
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button 
                                        onClick={() => {
                                            forceDownload(`${SERVER_URL}${tpl.templateUrl}`, tpl.name);
                                            fetch(`${API_URL}/marketing-toolkit/usage/${tpl._id}`, { method: 'POST' });
                                        }}
                                        className="bg-white text-[#23471d] px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2 hover:bg-[#23471d] hover:text-white transition-colors"
                                    >
                                        <Download size={12} /> Download
                                    </button>
                                </div>

                                <div className="absolute top-2 left-2 z-10">
                                    <input 
                                        type="checkbox"
                                        checked={selectedIds.includes(tpl._id)}
                                        onChange={() => toggleSelect(tpl._id)}
                                        className="w-4 h-4 rounded border-gray-300 text-[#23471d] focus:ring-[#23471d] cursor-pointer"
                                    />
                                </div>

                                <div className="absolute top-2 right-2">
                                    <span className="bg-white/90 backdrop-blur-sm text-[#1e293b] text-[7px] font-black px-1.5 py-0.5 rounded shadow-sm uppercase">
                                        {tpl.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-3">
                                <h4 className="text-[10px] font-extrabold text-[#1e293b] uppercase truncate">{tpl.name}</h4>
                                <div className="flex items-center justify-between mt-1">
                                    <span className="text-[8px] text-slate-400 font-bold uppercase truncate">{tpl.type}</span>
                                    <button 
                                        onClick={() => {
                                            forceDownload(`${SERVER_URL}${tpl.templateUrl}`, tpl.name);
                                            fetch(`${API_URL}/marketing-toolkit/usage/${tpl._id}`, { method: 'POST' });
                                        }}
                                        className="text-[#23471d] hover:text-green-600 transition-colors"
                                    >
                                        <Download size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 bg-blue-50/50 border border-blue-100 p-4 rounded-lg flex gap-3 max-w-2xl mx-auto">
                    <AlertCircle className="w-5 h-5 text-blue-500 shrink-0" />
                    <div>
                        <h5 className="text-[10px] font-black text-blue-900 uppercase mb-1">Marketing Support</h5>
                        <p className="text-[9px] text-blue-700 leading-relaxed">Our official team periodically uploads branded promotional assets for your use. If you need any custom designs, please contact your relationship manager.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
