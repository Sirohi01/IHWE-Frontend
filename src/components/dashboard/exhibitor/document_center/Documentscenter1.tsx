import React, { useState } from "react";
import { FileText, MoreVertical, X, ZoomIn, ZoomOut, Download, Share2, UploadCloud, Clock, MessageSquare, Plus, CheckCircle2, AlertCircle, XCircle, FileIcon, Search, Filter, LayoutGrid, List, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type DocStatus = "Approved" | "Under Review" | "Rejected" | "Pending Upload";
type DocCategory = "MSME Related" | "General Documents";

interface Doc {
  id: string;
  title: string;
  type: string; // PDF, DOCX
  size: string;
  date: string;
  category: DocCategory;
  status: DocStatus;
  uploadedBy: string;
  uploadDate: string;
  feedback?: string;
  previewUrl?: string;
  originalPdfUrl?: string;
}

const mockDocs: Doc[] = [
  { id: "1", title: "MSME Registration Cert.", type: "PDF", size: "1.2 MB", date: "02 Jun 2026", category: "MSME Related", status: "Approved", uploadedBy: "Exhibitor Admin", uploadDate: "31 May 2026, 11:20 AM" },
  { id: "2", title: "Udyam Certificate", type: "PDF", size: "1.1 MB", date: "31 May 2026", category: "MSME Related", status: "Under Review", uploadedBy: "Exhibitor Admin", uploadDate: "31 May 2026, 11:20 AM" },
  { id: "3", title: "GST Certificate", type: "PDF", size: "1.3 MB", date: "30 May 2026", category: "MSME Related", status: "Approved", uploadedBy: "Exhibitor Admin", uploadDate: "30 May 2026, 10:15 AM" },
  { id: "4", title: "Bank Details Proof", type: "PDF", size: "1.0 MB", date: "29 May 2026", category: "MSME Related", status: "Under Review", uploadedBy: "Exhibitor Admin", uploadDate: "29 May 2026, 09:00 AM" },
  { id: "5", title: "Subsidy Eligibility", type: "PDF", size: "1.4 MB", date: "28 May 2026", category: "MSME Related", status: "Approved", uploadedBy: "Exhibitor Admin", uploadDate: "28 May 2026, 02:30 PM" },
  { id: "6", title: "Company Profile", type: "PDF", size: "2.4 MB", date: "02 Jun 2026", category: "General Documents", status: "Approved", uploadedBy: "Exhibitor Admin", uploadDate: "02 Jun 2026, 11:20 AM" },
  { id: "7", title: "Product Catalogue", type: "PDF", size: "3.1 MB", date: "31 May 2026", category: "General Documents", status: "Under Review", uploadedBy: "Exhibitor Admin", uploadDate: "31 May 2026, 11:20 AM" },
  { id: "8", title: "Participation Form", type: "DOCX", size: "1.1 MB", date: "30 May 2026", category: "General Documents", status: "Approved", uploadedBy: "Exhibitor Admin", uploadDate: "30 May 2026, 11:20 AM" },
  { id: "9", title: "Price List", type: "PDF", size: "1.2 MB", date: "29 May 2026", category: "General Documents", status: "Pending Upload", uploadedBy: "-", uploadDate: "-" },
  { id: "10", title: "Other Document", type: "PDF", size: "1.5 MB", date: "28 May 2026", category: "General Documents", status: "Rejected", uploadedBy: "Exhibitor Admin", uploadDate: "28 May 2026, 11:20 AM", feedback: "Please upload a clearer copy. The current one is unreadable." },
  { id: "11", title: "MSME Annexure A", type: "PDF", size: "-", date: "-", category: "MSME Related", status: "Pending Upload", uploadedBy: "-", uploadDate: "-" },
  { id: "12", title: "Authorized Signatory", type: "PDF", size: "-", date: "-", category: "General Documents", status: "Pending Upload", uploadedBy: "-", uploadDate: "-" },
  { id: "13", title: "Brand Logo (High Res)", type: "JPG", size: "-", date: "-", category: "General Documents", status: "Pending Upload", uploadedBy: "-", uploadDate: "-" }
];

import { useExhibitorCtx } from "@/context/ExhibitorContext";
import { API_URL } from "@/lib/api";

const StatusConfig = {
  "Approved": { color: "text-emerald-600", bg: "bg-emerald-50", icon: <CheckCircle2 size={12} className="text-emerald-600" /> },
  "Under Review": { color: "text-amber-500", bg: "bg-amber-50", icon: <Clock size={12} className="text-amber-500" /> },
  "Rejected": { color: "text-red-600", bg: "bg-red-50", icon: <XCircle size={12} className="text-red-600" /> },
  "Pending Upload": { color: "text-gray-500", bg: "bg-gray-100", icon: <AlertCircle size={12} className="text-gray-500" /> },
};

const DocumentsCenter1: React.FC = () => {
  const { data } = useExhibitorCtx();
  const clientId = data?._id;
  const [docs, setDocs] = useState<Doc[]>([]);
  const [activeTab, setActiveTab] = useState<string>("All Documents");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [pendingUploads, setPendingUploads] = useState<{ [key: string]: { url: string, ext: string, file: File } }>({});
  const fileInputRef = React.useRef<HTMLInputElement>(null);

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
        if (formatted.length > 0 && !selectedDocId) {
          setSelectedDocId(formatted[0].id);
        }
      }
    } catch(e) {
      console.error("Failed to fetch documents", e);
    }
  }

  React.useEffect(() => {
    fetchDocs();
  }, [clientId]);

  const selectedDoc = docs.find(d => d.id === selectedDocId) || null;

  let filteredDocs = docs.filter(doc => activeTab === "All Documents" || doc.category === activeTab);
  
  if (statusFilter !== "All") {
      filteredDocs = filteredDocs.filter(doc => {
          if (statusFilter === "Pending") return doc.status === "Under Review" || doc.status === "Pending Upload";
          return doc.status === statusFilter;
      });
  }

  const msmeDocs = filteredDocs.filter(d => d.category === "MSME Related");
  const generalDocs = filteredDocs.filter(d => d.category === "General Documents");

  const totalCount = docs.length;
  const approvedCount = docs.filter(d => d.status === "Approved").length;
  const pendingCount = docs.filter(d => d.status === "Under Review" || d.status === "Pending Upload").length;
  const rejectedCount = docs.filter(d => d.status === "Rejected").length;

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
      const { url, file } = pendingUploads[selectedDoc.id];

      if (!file || !clientId) {
        toast.error(`Missing ${!file ? 'file' : ''} ${!file && !clientId ? 'and' : ''} ${!clientId ? 'client ID' : ''}`);
        return;
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('client_id', clientId);
      formData.append('document_name', selectedDoc.title);
      // Map back to backend category if needed, or use the exact string
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
            render({data}: any) {
              return data?.message || 'An error occurred during upload';
            }
          }
        });

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
            await fetchDocs();
            Swal.fire({ title: 'Deleted!', text: 'Your document has been removed.', icon: 'success', confirmButtonColor: '#2563eb' });
          } catch(err) {
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
    <div className="flex flex-col font-inter">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      {/* Top Stats & Filters Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-3">
        {/* Tabs */}
        <div className="flex bg-white rounded-lg shadow-sm h-[40px] border-b border-gray-200">
          {["All Documents", "MSME Related", "General Documents"].map((tab, idx) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center justify-center gap-1.5 px-2 md:px-3 h-full text-[10px] lg:text-[11px] font-semibold transition-all relative whitespace-nowrap ${
                activeTab === tab 
                  ? "bg-[#f4f7fe] text-blue-700 rounded-lg" 
                  : "text-[#1E104E] hover:bg-gray-50 bg-white rounded-lg"
              }`}
            >
              {idx === 0 && <FileText size={14} className={activeTab === tab ? "text-blue-600" : "text-[#1E104E]"} />}
              {idx === 1 && <FileText size={14} className={activeTab === tab ? "text-blue-600" : "text-[#1E104E]"} />}
              {idx === 2 && <FileText size={14} className={activeTab === tab ? "text-blue-600" : "text-[#1E104E]"} />}
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-blue-600 rounded-b-lg"></div>
              )}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="flex gap-2">
          <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-1.5" style={{ boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' }}>
            <div className="bg-blue-50 p-1 rounded-full"><FileText size={12} className="text-blue-600" /></div>
            <div>
              <p className="text-[9px] text-[#1E104E] font-semibold uppercase tracking-wider whitespace-nowrap">Total Documents</p>
              <p className="text-xs font-bold text-blue-700">{totalCount}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-1.5" style={{ boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' }}>
            <div className="bg-emerald-50 p-1 rounded-full"><CheckCircle2 size={12} className="text-emerald-600" /></div>
            <div>
              <p className="text-[9px] text-[#1E104E] font-semibold uppercase tracking-wider whitespace-nowrap">Approved</p>
              <p className="text-xs font-bold text-emerald-600">{approvedCount}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-1.5" style={{ boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' }}>
            <div className="bg-amber-50 p-1 rounded-full"><Clock size={12} className="text-amber-500" /></div>
            <div>
              <p className="text-[9px] text-[#1E104E] font-semibold uppercase tracking-wider whitespace-nowrap">Under Review</p>
              <p className="text-xs font-bold text-amber-500">{pendingCount}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-1.5" style={{ boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' }}>
            <div className="bg-red-50 p-1 rounded-full"><XCircle size={12} className="text-red-500" /></div>
            <div>
              <p className="text-[9px] text-[#1E104E] font-semibold uppercase tracking-wider whitespace-nowrap">Rejected</p>
              <p className="text-xs font-bold text-red-600">{rejectedCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex gap-4 relative">
        {/* Left Side: Grid/List */}
        <div className="flex-1">
          {/* Controls Bar */}
          <div className="flex justify-between items-center mb-2">
            <div className="flex gap-2">
              <span onClick={() => setStatusFilter("All")} className={`text-[10px] font-semibold px-2 py-1 rounded-md shadow-sm cursor-pointer transition-colors ${statusFilter === 'All' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-[#111844] hover:bg-gray-50'}`}>All ({totalCount})</span>
              <span onClick={() => setStatusFilter("Approved")} className={`text-[10px] font-semibold px-2 py-1 rounded-md shadow-sm flex items-center gap-1 cursor-pointer transition-colors ${statusFilter === 'Approved' ? 'bg-blue-600 text-white border border-blue-600' : 'bg-white border border-gray-200 text-[#111844] hover:bg-gray-50'}`}><CheckCircle2 size={12} fill="currentColor" stroke="white" className="text-emerald-600" /> Approved ({approvedCount})</span>
              <span onClick={() => setStatusFilter("Pending")} className={`text-[10px] font-semibold px-2 py-1 rounded-md shadow-sm flex items-center gap-1 cursor-pointer transition-colors ${statusFilter === 'Pending' ? 'bg-blue-600 text-white border border-blue-600' : 'bg-white border border-gray-200 text-[#111844] hover:bg-gray-50'}`}><Clock size={12} fill="currentColor" stroke="white" className="text-amber-500" /> Pending ({pendingCount})</span>
              <span onClick={() => setStatusFilter("Rejected")} className={`text-[10px] font-semibold px-2 py-1 rounded-md shadow-sm flex items-center gap-1 cursor-pointer transition-colors ${statusFilter === 'Rejected' ? 'bg-blue-600 text-white border border-blue-600' : 'bg-white border border-gray-200 text-[#111844] hover:bg-gray-50'}`}><XCircle size={12} fill="currentColor" stroke="white" className="text-red-500" /> Rejected ({rejectedCount})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 text-[10px] font-medium text-[#111844] bg-white border border-gray-200 rounded-md px-2 py-1 shadow-sm">
                Sort by: <span className="font-bold text-gray-900">Newest First</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
              </div>
              <div className="flex bg-white border border-gray-200 rounded-md shadow-sm">
                <button onClick={() => setViewMode("grid")} className={`p-1.5 ${viewMode === "grid" ? "bg-gray-100 text-gray-900" : "text-gray-500"}`}><LayoutGrid size={14} /></button>
                <div className="w-px bg-gray-200"></div>
                <button onClick={() => setViewMode("list")} className={`p-1.5 ${viewMode === "list" ? "bg-gray-100 text-gray-900" : "text-gray-500"}`}><List size={14} /></button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl mb-4 flex flex-col max-h-[420px]" style={{ boxShadow: 'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px' }}>
            <div className="p-3 flex-1 overflow-y-auto">
            {/* MSME Section */}
            {(activeTab === "All Documents" || activeTab === "MSME Related") && msmeDocs.length > 0 && (
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2 border-b border-gray-100 pb-1">
                  <h3 className="text-xs font-semibold text-gray-900 flex items-center gap-1.5">
                    <FileText size={14} className="text-gray-500" /> MSME Related Documents
                  </h3>
                  <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab("MSME Related"); }} className="text-[10px] font-bold text-blue-600 hover:underline">View All</a>
                </div>
                <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3" : "flex flex-col gap-2"}>
                  {msmeDocs.map(doc => <DocumentCard key={doc.id} doc={doc} selected={selectedDoc?.id === doc.id} onSelect={() => setSelectedDocId(doc.id)} viewMode={viewMode} />)}
                </div>
              </div>
            )}

            {/* General Section */}
            {(activeTab === "All Documents" || activeTab === "General Documents") && generalDocs.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-2 border-b border-gray-100 pb-1">
                  <h3 className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                    <FileIcon size={14} className="text-gray-500" /> General Documents
                  </h3>
                  <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab("General Documents"); }} className="text-[10px] font-bold text-blue-600 hover:underline">View All</a>
                </div>
                <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3" : "flex flex-col gap-2"}>
                  {generalDocs.map(doc => <DocumentCard key={doc.id} doc={doc} selected={selectedDoc?.id === doc.id} onSelect={() => setSelectedDocId(doc.id)} viewMode={viewMode} />)}
                </div>
              </div>
            )}
            
            </div>
            
            {/* Pagination Placeholder */}
            <div className="flex justify-between items-center p-3 border-t border-gray-100 shrink-0 bg-white rounded-b-xl">
                <span className="text-[10px] text-gray-900 font-medium">Showing 1 to 10 of {totalCount} documents</span>
                <div className="flex items-center gap-1">
                    <button className="w-6 h-6 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors text-[10px]">&lt;</button>
                    <button className="w-6 h-6 flex items-center justify-center rounded-md bg-blue-600 text-white font-semibold shadow-sm text-[10px]">1</button>
                    <button className="w-6 h-6 flex items-center justify-center rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors font-semibold text-[10px]">2</button>
                    <button className="w-6 h-6 flex items-center justify-center rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors font-semibold text-[10px]">3</button>
                    <button className="w-6 h-6 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors text-[10px]">&gt;</button>
                </div>
            </div>
          </div>
        </div>

        {/* Right Side: Preview Panel */}
        {selectedDoc && (
          <div className="w-[230px] lg:w-[250px] shrink-0 sticky top-4 h-fit">
            <div className="bg-[#f9f8fd] rounded-xl overflow-hidden flex flex-col" style={{ boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' }}>
              {/* Header */}
              <div className="flex justify-between items-start p-3 border-b border-gray-100 bg-gray-50/50">
                <div className="min-w-0 flex-1">
                  <h4 className="text-[10px] font-bold text-gray-900 leading-snug pr-2 truncate" title={`Preview: ${selectedDoc.title}.${selectedDoc.type.toLowerCase()}`}>
                    Preview: {selectedDoc.title}.{selectedDoc.type.toLowerCase()}
                  </h4>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${selectedDoc.type === 'PDF' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>{selectedDoc.type}</span>
                </div>
              </div>

              {/* Preview Window (Mockup) */}
              <div className="bg-gray-100 h-[180px] p-2 flex flex-col relative">
                <div className="bg-[#323639] rounded-t-md px-2 py-1 flex justify-between items-center text-gray-300">
                    <div className="flex gap-2">
                        <FileText size={12} /> <span className="text-[9px]">1 / 1</span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <ZoomOut size={12} className="cursor-pointer hover:text-white" />
                        <span className="text-[9px]">100%</span>
                        <ZoomIn size={12} className="cursor-pointer hover:text-white" />
                        <Download size={12} className="cursor-pointer hover:text-white ml-1" />
                        <MoreVertical size={12} className="cursor-pointer hover:text-white" />
                    </div>
                </div>
                <div className="bg-white flex-1 overflow-hidden shadow-inner p-2 relative flex items-center justify-center min-h-0">
                    {pendingUploads[selectedDoc.id] ? (
                         pendingUploads[selectedDoc.id].ext === 'PDF' ? (
                             <iframe src={pendingUploads[selectedDoc.id].url} className="w-full h-full border-0" title="PDF Preview" />
                         ) : (
                             <img src={pendingUploads[selectedDoc.id].url} alt="Preview" className="max-w-full max-h-full object-contain" />
                         )
                    ) : selectedDoc.previewUrl ? (
                         selectedDoc.type === 'PDF' ? (
                             <iframe src={selectedDoc.previewUrl} className="w-full h-full border-0" title="PDF Preview" />
                         ) : (
                             <img src={selectedDoc.previewUrl} alt="Preview" className="max-w-full max-h-full object-contain" />
                         )
                    ) : selectedDoc.status === "Pending Upload" ? (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
                            <UploadCloud size={32} className="mb-2 text-gray-300" />
                            <p className="text-xs font-semibold text-gray-500">No Document Uploaded</p>
                            <p className="text-[10px] text-gray-400 mt-1">Please upload the required file</p>
                        </div>
                    ) : (
                        <div className="w-full h-full border border-gray-100 flex flex-col items-center p-6 text-center opacity-80" style={{ background: 'repeating-linear-gradient(45deg, #f9fafb, #f9fafb 10px, #ffffff 10px, #ffffff 20px)' }}>
                            <img src="/logo.png" alt="Logo" className="w-16 mb-4 grayscale opacity-50" />
                            <h5 className="font-bold text-gray-800 text-sm mb-1 uppercase tracking-wide">{selectedDoc.title}</h5>
                            <div className="w-12 h-0.5 bg-gray-300 mx-auto mb-4"></div>
                            <div className="w-full space-y-2">
                                <div className="h-1.5 bg-gray-200 rounded w-full"></div>
                                <div className="h-1.5 bg-gray-200 rounded w-[80%] mx-auto"></div>
                                <div className="h-1.5 bg-gray-200 rounded w-[90%] mx-auto"></div>
                            </div>
                            <div className="mt-auto w-10 h-10 border border-gray-300 ml-auto bg-gray-100 flex items-center justify-center">
                                <span className="text-[6px] text-gray-400">QR CODE</span>
                            </div>
                        </div>
                    )}
                </div>
              </div>

              {/* Details & Actions */}
              <div className="p-3 flex flex-col gap-3">
                
                {/* Feedback / Alert */}
                {selectedDoc.status === "Rejected" && selectedDoc.feedback && (
                    <div className="bg-red-50 border border-red-100 rounded-lg p-2 flex gap-1.5">
                        <AlertCircle size={12} className="text-red-600 shrink-0 mt-0.5" />
                        <div>
                            <p className="text-[9px] font-bold text-red-800 uppercase tracking-wide mb-0.5">Admin Feedback</p>
                            <p className="text-[10px] text-red-700">{selectedDoc.feedback}</p>
                        </div>
                    </div>
                )}
                {selectedDoc.status === "Under Review" && (
                    <div className="bg-amber-50 border border-amber-100 rounded-lg p-2 flex gap-1.5">
                        <Clock size={12} className="text-amber-600 shrink-0 mt-0.5" />
                        <div>
                            <p className="text-[9px] font-bold text-amber-800 uppercase tracking-wide mb-0.5">Under Review</p>
                            <p className="text-[10px] text-amber-700">Currently under review by admin.</p>
                        </div>
                    </div>
                )}

                {/* Details Grid */}
                <div>
                  <h5 className="text-[10px] font-bold text-gray-900 mb-2 uppercase tracking-wider">Document Details</h5>
                  <div className="grid grid-cols-2 gap-y-2 gap-x-2">
                    <div>
                      <p className="text-[9px] text-gray-500 font-medium">Status</p>
                      <div className={`text-[10px] font-bold mt-0.5 ${StatusConfig[selectedDoc.status].color}`}>{selectedDoc.status}</div>
                    </div>
                    <div>
                      <p className="text-[9px] text-gray-500 font-medium">Uploaded On</p>
                      <p className="text-[10px] font-bold text-gray-900 mt-0.5">{selectedDoc.uploadDate}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-gray-500 font-medium">File Size</p>
                      <p className="text-[10px] font-bold text-gray-900 mt-0.5">{selectedDoc.size}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-gray-500 font-medium">Document Type</p>
                      <p className="text-[10px] font-bold text-gray-900 mt-0.5">{selectedDoc.category}</p>
                    </div>
                  </div>
                </div>

                {/* Actions (Exhibitor specific) */}
                <div>
                  <h5 className="text-[10px] font-bold text-gray-900 mb-2 uppercase tracking-wider">Actions</h5>
                  <div className="grid grid-cols-2 gap-2">
                    <input type="file" ref={fileInputRef} className="hidden" accept=".pdf,.jpg,.jpeg,.png,.docx" onChange={handleFileUpload} />
                    
                    {pendingUploads[selectedDoc.id] ? (
                      <button onClick={handleSaveUpload} className="flex items-center justify-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-semibold py-1.5 rounded-lg transition-colors shadow-sm col-span-2">
                        <UploadCloud size={12} /> Save Upload
                      </button>
                    ) : selectedDoc.status === "Under Review" ? (
                      <button onClick={handleDeleteDoc} className="flex items-center justify-center gap-1 bg-red-600 hover:bg-red-700 text-white text-[10px] font-semibold py-1.5 rounded-lg transition-colors shadow-sm col-span-2">
                        <Trash2 size={12} /> Delete Upload
                      </button>
                    ) : (
                      <button onClick={() => fileInputRef.current?.click()} className="flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-semibold py-1.5 rounded-lg transition-colors shadow-sm col-span-2">
                        <UploadCloud size={12} /> {selectedDoc.status === "Pending Upload" ? "Select Document" : "Replace Document"}
                      </button>
                    )}
                    <a 
                      href={getDocumentUrl(selectedDoc.originalPdfUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-1 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-[10px] font-semibold py-1.5 rounded-lg transition-colors shadow-sm ${!selectedDoc.originalPdfUrl || selectedDoc.status === "Pending Upload" ? 'opacity-50 pointer-events-none cursor-not-allowed' : ''}`}
                    >
                      <ZoomIn size={12} /> View
                    </a>
                    <a 
                      href={getDocumentUrl(selectedDoc.originalPdfUrl)}
                      download={selectedDoc.originalPdfUrl ? selectedDoc.originalPdfUrl.split('/').pop() : 'document'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-1 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-[10px] font-semibold py-1.5 rounded-lg transition-colors shadow-sm ${!selectedDoc.originalPdfUrl || selectedDoc.status === "Pending Upload" ? 'opacity-50 pointer-events-none cursor-not-allowed' : ''}`}
                    >
                      <Download size={12} /> Download
                    </a>
                  </div>
                </div>



              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Document Card Component
const DocumentCard = ({ doc, selected, onSelect, viewMode = "grid" }: { doc: Doc, selected: boolean, onSelect: () => void, viewMode?: "grid" | "list" }) => {
  const config = StatusConfig[doc.status];
  
  if (viewMode === "list") {
    return (
      <div 
        onClick={onSelect}
        className={`rounded-xl px-4 py-3 flex items-center justify-between cursor-pointer transition-all ${selected ? 'border border-blue-500 ring-1 ring-blue-500/20 bg-blue-50/20' : 'bg-[#fefefe] hover:border-blue-300'}`}
        style={!selected ? { boxShadow: 'rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em' } : {}}
      >
        <div className="flex items-center gap-4 flex-1">
           <div className={`w-8 h-8 rounded flex items-center justify-center shrink-0 ${doc.type === 'PDF' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
              <span className="text-[8px] font-black">{doc.type}</span>
           </div>
           <div>
             <h4 className="text-[13px] font-bold text-[#111844] truncate">{doc.title}</h4>
             <p className="text-[10px] mt-0.5 flex items-center gap-1.5">
               <span className={`font-bold px-1.5 py-0.5 rounded ${doc.type === 'PDF' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>{doc.type}</span>
               <span className="text-gray-300">•</span>
               <span className="font-medium text-slate-500">{doc.size}</span>
             </p>
           </div>
        </div>
        
        <div className="w-1/4 text-center">
           <p className="text-[11px] font-medium text-gray-900">{doc.date}</p>
        </div>

        <div className="w-1/4 flex justify-end">
          <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold border border-transparent whitespace-nowrap ${config.bg} ${config.color}`}>
            {doc.status}
          </div>
        </div>

        <div className="pl-4 border-l border-gray-100 ml-4 flex items-center">
           <button className="text-gray-400 hover:text-gray-700"><MoreVertical size={16} /></button>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={onSelect}
      className={`rounded-xl px-2.5 py-1.5 cursor-pointer transition-all flex flex-col ${selected ? 'border border-blue-500 ring-1 ring-blue-500/20 bg-blue-50/20' : 'bg-[#fefefe] hover:border-blue-300'}`}
      style={!selected ? { boxShadow: 'rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em' } : {}}
    >
      <div className="flex justify-between items-start mb-2">
        <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[8px] font-bold border border-transparent whitespace-nowrap ${config.bg} ${config.color}`}>
          {doc.status}
        </div>
        <button className="text-gray-400 hover:text-gray-700"><MoreVertical size={12} /></button>
      </div>

      {/* Graphic representation */}
      <div className={`w-full h-10 rounded-lg mb-1.5 flex items-center justify-center border border-gray-100 ${doc.status === 'Pending Upload' ? 'bg-gray-50 border-dashed' : 'bg-gradient-to-br from-gray-50 to-gray-100'}`}>
        {doc.status === 'Pending Upload' ? (
            <div className="flex flex-col items-center text-gray-300">
                <UploadCloud size={18} />
                <span className="text-[7px] mt-0.5 font-semibold">Upload Required</span>
            </div>
        ) : (
            <div className="opacity-20 flex flex-col items-center">
                <div className="w-6 h-8 border-[1.5px] border-[#1E104E] rounded flex items-center justify-center relative">
                    <div className="absolute top-0 right-0 w-2 h-2 bg-[#1E104E] rounded-bl"></div>
                    <span className="text-[6px] font-black text-[#1E104E]">{doc.type}</span>
                </div>
            </div>
        )}
      </div>

      {/* Document info */}
      <div className="mt-auto">
        <h4 className="text-[10px] font-bold text-[#111844] truncate" title={doc.title}>{doc.title}</h4>
        <div className="flex items-center gap-1 mt-0.5 text-[8px]">
          <span className={`font-bold px-1 py-0.5 rounded ${doc.type === 'PDF' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>{doc.type}</span>
          <span className="text-gray-300">•</span>
          <span className="font-medium text-slate-500">{doc.size}</span>
        </div>
        <p className="text-[8px] font-medium text-gray-900 mt-0.5">{doc.date}</p>
      </div>
    </div>
  );
};

export default DocumentsCenter1;