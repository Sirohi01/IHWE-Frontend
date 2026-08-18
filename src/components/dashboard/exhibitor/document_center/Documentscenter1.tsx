import React from "react";
import { FileText, Info, X, ZoomIn, ZoomOut, Download, UploadCloud, Clock, CheckCircle2, AlertCircle, XCircle, FileIcon, LayoutGrid, List, Trash2, Folder, ChevronDown, MoreVertical, User } from "lucide-react";

export type DocStatus = "Approved" | "Under Review" | "Rejected" | "Pending Upload";
export type DocCategory = "MSME Related" | "General Documents";

export interface Doc {
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

export const StatusConfig = {
  "Approved": { color: "text-emerald-600", bg: "bg-emerald-50", dot: "bg-emerald-500", icon: <CheckCircle2 size={12} className="text-emerald-600" /> },
  "Under Review": { color: "text-violet-600", bg: "bg-violet-50", dot: "bg-violet-500", icon: <Clock size={12} className="text-violet-600" /> },
  "Rejected": { color: "text-red-600", bg: "bg-red-50", dot: "bg-red-500", icon: <XCircle size={12} className="text-red-600" /> },
  "Pending Upload": { color: "text-gray-500", bg: "bg-gray-100", dot: "bg-gray-400", icon: <AlertCircle size={12} className="text-gray-500" /> },
};

const FILE_TYPE_STYLE: Record<string, string> = {
  PDF: "bg-red-50 text-red-600",
  DOCX: "bg-blue-50 text-blue-600",
  DOC: "bg-blue-50 text-blue-600",
  JPG: "bg-emerald-50 text-emerald-600",
  PNG: "bg-emerald-50 text-emerald-600",
};

const StatCard = ({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: number; tone: "violet" | "emerald" | "amber" | "rose" }) => {
  const toneMap = {
    violet: { bg: "bg-violet-50", ring: "border-violet-100", text: "text-violet-600" },
    emerald: { bg: "bg-emerald-50", ring: "border-emerald-100", text: "text-emerald-600" },
    amber: { bg: "bg-amber-50", ring: "border-amber-100", text: "text-amber-600" },
    rose: { bg: "bg-rose-50", ring: "border-rose-100", text: "text-rose-600" },
  }[tone];
  return (
    <div className="flex-1 min-w-[170px] bg-white rounded-xl border border-slate-100 shadow-sm px-3 py-2 flex items-center gap-2.5">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${toneMap.bg} ${toneMap.ring} shrink-0`}>
        {icon}
      </div>
      <div className="min-w-0 flex items-baseline gap-1.5">
        <p className={`text-base font-black leading-none ${toneMap.text}`}>{value}</p>
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">{label}</p>
      </div>
    </div>
  );
};

interface DocumentsListProps {
  docs: Doc[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
  selectedDocId: string | null;
  setSelectedDocId: (id: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  onPickFile: (doc: Doc, e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Stats + tabs + filters + document grid — the left/main column. The preview
// panel is a sibling (DocumentPreviewPanel), not nested here, so the parent
// page can lay them out side-by-side from the very top (hero included).
export const DocumentsList: React.FC<DocumentsListProps> = ({
  docs, activeTab, setActiveTab, statusFilter, setStatusFilter,
  selectedDocId, setSelectedDocId, viewMode, setViewMode, onPickFile,
}) => {
  const selectedDoc = docs.find(d => d.id === selectedDocId) || null;

  let filteredDocs = docs.filter(doc => activeTab === "All Documents" || doc.category === activeTab);
  if (statusFilter !== "All") {
    filteredDocs = filteredDocs.filter(doc => doc.status === statusFilter);
  }

  const msmeDocs = filteredDocs.filter(d => d.category === "MSME Related");
  const generalDocs = filteredDocs.filter(d => d.category === "General Documents");

  const totalCount = docs.length;
  const approvedCount = docs.filter(d => d.status === "Approved").length;
  const underReviewCount = docs.filter(d => d.status === "Under Review").length;
  const pendingCount = docs.filter(d => d.status === "Pending Upload").length;
  const rejectedCount = docs.filter(d => d.status === "Rejected").length;

  const msmeAllCount = docs.filter(d => d.category === "MSME Related").length;
  const generalAllCount = docs.filter(d => d.category === "General Documents").length;

  const FILTER_CHIPS: { key: string; label: string; count: number }[] = [
    { key: "All", label: "All", count: totalCount },
    { key: "Approved", label: "Approved", count: approvedCount },
    { key: "Pending Upload", label: "Pending", count: pendingCount },
    { key: "Under Review", label: "Under Review", count: underReviewCount },
    { key: "Rejected", label: "Rejected", count: rejectedCount },
  ];

  return (
    <div className="flex flex-col font-inter">
      {/* Stats Row */}
      <div className="flex flex-wrap gap-2 mb-2.5">
        <StatCard icon={<FileIcon size={14} className="text-violet-600" />} label="Total" value={totalCount} tone="violet" />
        <StatCard icon={<CheckCircle2 size={14} className="text-emerald-600" />} label="Approved" value={approvedCount} tone="emerald" />
        <StatCard icon={<Clock size={14} className="text-amber-600" />} label="Under Review" value={underReviewCount} tone="amber" />
        <StatCard icon={<XCircle size={14} className="text-rose-600" />} label="Rejected" value={rejectedCount} tone="rose" />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-5 mb-2 flex-wrap border-b border-slate-100">
        {[
          { key: "All Documents", label: `All Documents (${totalCount})` },
          { key: "MSME Related", label: `MSME Related (${msmeAllCount})` },
          { key: "General Documents", label: `General Documents (${generalAllCount})` },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`relative pb-1.5 text-[12px] font-bold transition-colors ${
              activeTab === tab.key ? "text-[#f0730d]" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {tab.label}
            {activeTab === tab.key && (
              <span className="absolute left-0 right-0 -bottom-px h-[2.5px] bg-[#f0730d] rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Controls Bar */}
      <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
        <div className="flex gap-1.5 flex-wrap">
          {FILTER_CHIPS.map(chip => (
            <button
              key={chip.key}
              onClick={() => setStatusFilter(chip.key)}
              className={`text-[10px] font-semibold px-2 py-1 rounded-full transition-colors flex items-center gap-1 ${
                statusFilter === chip.key
                  ? "bg-[#f0730d] text-white shadow-sm"
                  : "bg-white border border-gray-200 text-slate-600 hover:bg-gray-50"
              }`}
            >
              {chip.key !== "All" && StatusConfig[chip.key as DocStatus].icon}
              {chip.label} ({chip.count})
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-600 bg-white border border-gray-200 rounded-md px-2.5 py-1.5 shadow-sm">
            Sort by: <span className="font-bold text-gray-900">Newest First</span>
            <ChevronDown size={12} />
          </div>
          <div className="flex bg-white border border-gray-200 rounded-md shadow-sm">
            <button onClick={() => setViewMode("grid")} className={`p-1.5 ${viewMode === "grid" ? "bg-orange-50 text-[#f0730d]" : "text-gray-500"}`}><LayoutGrid size={14} /></button>
            <div className="w-px bg-gray-200"></div>
            <button onClick={() => setViewMode("list")} className={`p-1.5 ${viewMode === "list" ? "bg-orange-50 text-[#f0730d]" : "text-gray-500"}`}><List size={14} /></button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm flex flex-col max-h-[420px]">
        <div className="p-3 flex-1 overflow-y-auto">
          {/* MSME Section */}
          {(activeTab === "All Documents" || activeTab === "MSME Related") && msmeDocs.length > 0 && (
            <div className="mb-3">
              <div className="flex justify-between items-center mb-2.5">
                <h3 className="text-[13px] font-bold text-slate-800 flex items-center gap-1.5">
                  <Folder size={14} className="text-slate-400" /> MSME Related Documents
                </h3>
                <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab("MSME Related"); }} className="text-[10px] font-bold text-[#f0730d] hover:underline">View All</a>
              </div>
              <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3" : "flex flex-col gap-2"}>
                {msmeDocs.map(doc => (
                  <DocumentCard
                    key={doc.id}
                    doc={doc}
                    selected={selectedDoc?.id === doc.id}
                    onSelect={() => setSelectedDocId(doc.id)}
                    onPickFile={(e) => onPickFile(doc, e)}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            </div>
          )}

          {/* General Section */}
          {(activeTab === "All Documents" || activeTab === "General Documents") && generalDocs.length > 0 && (
            <div>
              <div className="flex justify-between items-center mb-2.5">
                <h3 className="text-[13px] font-bold text-slate-800 flex items-center gap-1.5">
                  <FileIcon size={14} className="text-slate-400" /> General Documents
                </h3>
                <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab("General Documents"); }} className="text-[10px] font-bold text-[#f0730d] hover:underline">View All</a>
              </div>
              <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3" : "flex flex-col gap-2"}>
                {generalDocs.map(doc => (
                  <DocumentCard
                    key={doc.id}
                    doc={doc}
                    selected={selectedDoc?.id === doc.id}
                    onSelect={() => setSelectedDocId(doc.id)}
                    onPickFile={(e) => onPickFile(doc, e)}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            </div>
          )}

          {filteredDocs.length === 0 && (
            <div className="py-16 flex flex-col items-center justify-center text-slate-300">
              <FileIcon size={40} className="mb-2" />
              <p className="text-xs font-bold text-slate-400">No documents match this filter</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center p-3 border-t border-gray-100 shrink-0 bg-white rounded-b-xl">
          <span className="text-[10px] text-gray-900 font-medium">Showing {filteredDocs.length === 0 ? 0 : 1} to {filteredDocs.length} of {totalCount} documents</span>
          <div className="flex items-center gap-1">
            <button className="w-6 h-6 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors text-[10px]">&lt;</button>
            <button className="w-6 h-6 flex items-center justify-center rounded-md bg-[#f0730d] text-white font-semibold shadow-sm text-[10px]">1</button>
            <button className="w-6 h-6 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors text-[10px]">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface DocumentPreviewPanelProps {
  selectedDoc: Doc | null;
  pendingUpload?: { url: string; ext: string };
  onClose: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSaveUpload: () => void;
  onDeleteDoc: () => void;
  getDocumentUrl: (url: string | undefined) => string;
}

// Right-hand "DOCUMENT PREVIEW" sidebar — sits beside DocumentsList (and the
// hero above it) in a page-level grid, sticky from the top of the page.
export const DocumentPreviewPanel: React.FC<DocumentPreviewPanelProps> = ({
  selectedDoc, pendingUpload, onClose, fileInputRef, onFileChange, onSaveUpload, onDeleteDoc, getDocumentUrl,
}) => {
  if (!selectedDoc) {
    return (
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 flex flex-col items-center justify-center text-center text-slate-300 h-full min-h-[240px]">
        <FileIcon size={32} className="mb-2" />
        <p className="text-[11px] font-bold text-slate-400">Select a document to preview</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden flex flex-col border border-slate-100 shadow-sm">
      {/* Header */}
      <div className="p-3 border-b border-gray-100 bg-gray-50/50">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-wider">Document Preview</h4>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700"><X size={14} /></button>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-6 h-6 rounded flex items-center justify-center shrink-0 ${FILE_TYPE_STYLE[selectedDoc.type] || 'bg-slate-100 text-slate-600'}`}>
            <FileText size={13} />
          </div>
          <p className="text-[11px] font-bold text-gray-900 leading-snug truncate flex-1 min-w-0" title={`${selectedDoc.title}.${selectedDoc.type.toLowerCase()}`}>
            {selectedDoc.title}.{selectedDoc.type.toLowerCase()}
          </p>
          <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap shrink-0 ${StatusConfig[selectedDoc.status].bg} ${StatusConfig[selectedDoc.status].color}`}>{selectedDoc.status}</span>
        </div>
      </div>

      {/* Preview Window */}
      <div className="bg-gray-100 h-[220px] p-2 flex flex-col relative">
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
          {pendingUpload ? (
            pendingUpload.ext === 'PDF' ? (
              <iframe src={pendingUpload.url} className="w-full h-full border-0" title="PDF Preview" />
            ) : (
              <img loading="lazy" decoding="async" src={pendingUpload.url} alt="Preview" className="max-w-full max-h-full object-contain" />
            )
          ) : selectedDoc.previewUrl ? (
            selectedDoc.type === 'PDF' ? (
              <iframe src={selectedDoc.previewUrl} className="w-full h-full border-0" title="PDF Preview" />
            ) : (
              <img loading="lazy" decoding="async" src={selectedDoc.previewUrl} alt="Preview" className="max-w-full max-h-full object-contain" />
            )
          ) : selectedDoc.status === "Pending Upload" ? (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
              <UploadCloud size={32} className="mb-2 text-gray-300" />
              <p className="text-xs font-semibold text-gray-500">No Document Uploaded</p>
              <p className="text-[10px] text-gray-400 mt-1">Please upload the required file</p>
            </div>
          ) : (
            <div className="w-full h-full border border-gray-100 flex flex-col items-center p-6 text-center opacity-80" style={{ background: 'repeating-linear-gradient(45deg, #f9fafb, #f9fafb 10px, #ffffff 10px, #ffffff 20px)' }}>
              <img loading="lazy" decoding="async" src="/logo.png" alt="Logo" className="w-16 mb-4 grayscale opacity-50" />
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
          <div className="bg-violet-50 border border-violet-100 rounded-lg p-2 flex gap-1.5">
            <Clock size={12} className="text-violet-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-[9px] font-bold text-violet-800 uppercase tracking-wide mb-0.5">Under Review</p>
              <p className="text-[10px] text-violet-700">Currently under review by admin.</p>
            </div>
          </div>
        )}

        {/* Details Grid */}
        <div>
          <h5 className="text-[10px] font-black text-gray-500 mb-2 uppercase tracking-wider">Document Details</h5>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-gray-500 font-medium">Status</p>
              <div className={`text-[10px] font-bold ${StatusConfig[selectedDoc.status].color}`}>{selectedDoc.status}</div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-gray-500 font-medium">Uploaded On</p>
              <p className="text-[10px] font-bold text-gray-900">{selectedDoc.uploadDate}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-gray-500 font-medium">File Size</p>
              <p className="text-[10px] font-bold text-gray-900">{selectedDoc.size}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-gray-500 font-medium">Document Type</p>
              <p className="text-[10px] font-bold text-gray-900">{selectedDoc.category}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-gray-500 font-medium">Uploaded By</p>
              <p className="text-[10px] font-bold text-gray-900 flex items-center gap-1"><User size={10} className="text-gray-400" />{selectedDoc.uploadedBy}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div>
          <h5 className="text-[10px] font-black text-gray-500 mb-2 uppercase tracking-wider">Actions</h5>
          <div className="grid grid-cols-2 gap-2">
            <input type="file" ref={fileInputRef} className="hidden" accept=".pdf,.jpg,.jpeg,.png,.docx" onChange={onFileChange} />

            {pendingUpload ? (
              <button onClick={onSaveUpload} className="flex items-center justify-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-semibold py-1.5 rounded-lg transition-colors shadow-sm col-span-2">
                <UploadCloud size={12} /> Save Upload
              </button>
            ) : selectedDoc.status === "Under Review" ? (
              <button onClick={onDeleteDoc} className="flex items-center justify-center gap-1 bg-red-600 hover:bg-red-700 text-white text-[10px] font-semibold py-1.5 rounded-lg transition-colors shadow-sm col-span-2">
                <Trash2 size={12} /> Delete Upload
              </button>
            ) : (
              <button onClick={() => fileInputRef.current?.click()} className="flex items-center justify-center gap-1 bg-[#f0730d] hover:bg-[#d9640a] text-white text-[10px] font-semibold py-1.5 rounded-lg transition-colors shadow-sm col-span-2">
                <UploadCloud size={12} /> {selectedDoc.status === "Pending Upload" ? "Select Document" : "Replace Document"}
              </button>
            )}
            <a
              href={getDocumentUrl(selectedDoc.originalPdfUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-1 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-[10px] font-semibold py-1.5 rounded-lg transition-colors shadow-sm ${!selectedDoc.originalPdfUrl || selectedDoc.status === "Pending Upload" ? 'opacity-50 pointer-events-none cursor-not-allowed' : ''}`}
            >
              <ZoomIn size={12} /> View Fullscreen
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
  );
};

// Document Card Component
const DocumentCard = ({ doc, selected, onSelect, onPickFile, viewMode = "grid" }: { doc: Doc, selected: boolean, onSelect: () => void, onPickFile: (e: React.ChangeEvent<HTMLInputElement>) => void, viewMode?: "grid" | "list" }) => {
  const config = StatusConfig[doc.status];
  const fileTypeStyle = FILE_TYPE_STYLE[doc.type] || "bg-slate-100 text-slate-600";
  const cardInputRef = React.useRef<HTMLInputElement>(null);
  const needsUpload = doc.status === "Pending Upload";

  const stopAndPick = (e: React.MouseEvent) => {
    e.stopPropagation();
    cardInputRef.current?.click();
  };

  if (viewMode === "list") {
    return (
      <div
        onClick={onSelect}
        className={`rounded-xl px-4 py-3 flex items-center justify-between cursor-pointer transition-all border-2 ${selected ? 'border-[#f0730d] ring-2 ring-[#f0730d]/25 bg-orange-50/50 shadow-md' : 'border-slate-100 bg-white shadow-sm hover:border-orange-200 hover:shadow-md'}`}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
           <div className={`w-8 h-8 rounded flex items-center justify-center shrink-0 ${fileTypeStyle}`}>
              <FileText size={14} />
           </div>
           <div className="min-w-0">
             <h4 className="text-[13px] font-bold text-[#111844] truncate">{doc.title}</h4>
             <p className="text-[10px] mt-0.5 text-slate-500">
               {needsUpload ? "Not uploaded yet" : `Uploaded on ${doc.date}`}
             </p>
           </div>
        </div>

        <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold whitespace-nowrap mr-3 ${config.bg} ${config.color}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} /> {doc.status}
        </div>

        <input type="file" ref={cardInputRef} className="hidden" accept=".pdf,.jpg,.jpeg,.png,.docx" onChange={onPickFile} />
        <button onClick={stopAndPick} className="text-[10px] font-bold text-gray-700 bg-white border border-gray-200 rounded-md px-2.5 py-1 hover:bg-gray-50 whitespace-nowrap">
          {needsUpload ? "Upload" : "Replace"}
        </button>
      </div>
    );
  }

  return (
    <div
      onClick={onSelect}
      className={`rounded-xl p-2.5 cursor-pointer transition-all flex flex-col border-2 ${selected ? 'border-[#f0730d] ring-2 ring-[#f0730d]/25 bg-orange-50/50 shadow-md -translate-y-0.5' : 'border-slate-100 bg-white shadow-sm hover:border-orange-200 hover:shadow-md hover:-translate-y-0.5'}`}
    >
      <div className="flex justify-between items-center mb-2">
        <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[8px] font-bold whitespace-nowrap ${config.bg} ${config.color}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} /> {doc.status}
        </div>
        <Info size={12} className="text-gray-300" />
      </div>

      <div className="flex items-center gap-2 mb-2">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${fileTypeStyle}`}>
          <FileText size={15} />
        </div>
        <h4 className="text-[11px] font-bold text-[#111844] leading-tight line-clamp-2" title={doc.title}>{doc.title}</h4>
      </div>

      <input type="file" ref={cardInputRef} className="hidden" accept=".pdf,.jpg,.jpeg,.png,.docx" onChange={onPickFile} />

      {needsUpload ? (
        <button
          onClick={stopAndPick}
          className="mt-auto w-full flex flex-col items-center justify-center gap-1 py-2.5 rounded-lg border border-gray-200 bg-gray-50 hover:bg-orange-50 hover:border-orange-200 transition-colors text-gray-400 hover:text-[#f0730d]"
        >
          <Download size={16} />
          <span className="text-[9px] font-semibold">Click to upload</span>
          <span className="text-[8px]">{doc.type} only (Max 5MB)</span>
        </button>
      ) : (
        <div className="mt-auto">
          <p className="text-[9px] text-slate-500 font-medium flex items-center gap-1">
            Uploaded on {doc.date}
            <CheckCircle2 size={10} className="text-emerald-500" />
          </p>
          <button
            onClick={stopAndPick}
            className="mt-1.5 w-full flex items-center justify-center gap-1 text-[9px] font-bold text-gray-700 bg-white border border-gray-200 rounded-md py-1.5 hover:bg-gray-50 transition-colors"
          >
            Replace Document
          </button>
          <p className="mt-1 text-[8px] font-medium text-slate-400">{doc.type} &middot; {doc.size}</p>
        </div>
      )}
    </div>
  );
};
