import React, { useState, useEffect } from 'react';
import { 
    Download, FileText, Image, Mail, 
    MessageSquare, Share2, Sparkles, ExternalLink
} from 'lucide-react';
import { API_URL } from '@/lib/api';
import { toast } from 'sonner';

interface MarketingAsset {
    _id: string;
    name: string;
    description: string;
    category: string;
    fileType: string;
    fileSize: string;
    downloadUrl: string;
    thumbnail: string;
}

const categoryIcons: Record<string, any> = {
    social_media: Share2,
    poster: Image,
    invitation: FileText,
    email: Mail,
    whatsapp: MessageSquare,
    brochure: FileText
};

const categoryColors: Record<string, string> = {
    social_media: 'blue',
    poster: 'purple',
    invitation: 'pink',
    email: 'green',
    whatsapp: 'emerald',
    brochure: 'orange'
};

export default function SellerMarketingPage() {
    const [assets, setAssets] = useState<MarketingAsset[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    useEffect(() => {
        fetchAssets();
    }, []);

    const fetchAssets = async () => {
        try {
            const token = localStorage.getItem('exhibitorToken');
            const res = await fetch(`${API_URL}/seller-portal/marketing-assets`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                setAssets(data.data);
            }
        } catch (error) {
            toast.error('Failed to load marketing assets');
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async (asset: MarketingAsset) => {
        try {
            const token = localStorage.getItem('exhibitorToken');
            await fetch(`${API_URL}/seller-portal/marketing-assets/${asset._id}/download`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            toast.success(`Downloading ${asset.name}...`);
            // In production, this would trigger actual file download
            window.open(asset.downloadUrl, '_blank');
        } catch (error) {
            toast.error('Download failed');
        }
    };

    const filteredAssets = selectedCategory === 'all' 
        ? assets 
        : assets.filter(a => a.category === selectedCategory);

    const categories = ['all', ...new Set(assets.map(a => a.category))];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="w-8 h-8 border-4 border-[#23471d]/20 border-t-[#23471d] rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#23471d] to-[#2d5a24] text-white rounded-lg p-6">
                <div className="flex items-center gap-3 mb-2">
                    <Sparkles size={24} />
                    <h1 className="text-2xl font-black uppercase tracking-tight">Marketing Support</h1>
                </div>
                <p className="text-sm text-white/80 font-bold">
                    Download promotional materials to boost your event presence
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white border border-slate-200 rounded-lg p-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                        Total Assets
                    </p>
                    <p className="text-2xl font-black text-slate-800">{assets.length}</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">
                        Social Media
                    </p>
                    <p className="text-2xl font-black text-blue-700">
                        {assets.filter(a => a.category === 'social_media').length}
                    </p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-1">
                        Email Templates
                    </p>
                    <p className="text-2xl font-black text-green-700">
                        {assets.filter(a => a.category === 'email').length}
                    </p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <p className="text-[10px] font-black text-purple-600 uppercase tracking-widest mb-1">
                        Print Materials
                    </p>
                    <p className="text-2xl font-black text-purple-700">
                        {assets.filter(a => ['poster', 'invitation', 'brochure'].includes(a.category)).length}
                    </p>
                </div>
            </div>

            {/* Category Filter */}
            <div className="bg-white border border-slate-200 rounded-lg p-4">
                <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-lg text-xs font-black uppercase transition-colors ${
                                selectedCategory === cat
                                    ? 'bg-[#23471d] text-white'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            {cat.replace('_', ' ')}
                        </button>
                    ))}
                </div>
            </div>

            {/* Assets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAssets.map(asset => {
                    const Icon = categoryIcons[asset.category] || FileText;
                    const color = categoryColors[asset.category] || 'slate';
                    
                    return (
                        <div key={asset._id} className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                            {/* Thumbnail */}
                            <div className={`h-40 bg-${color}-50 flex items-center justify-center relative`}>
                                <Icon size={48} className={`text-${color}-400`} />
                                <div className={`absolute top-3 right-3 px-2 py-1 bg-${color}-100 rounded-full`}>
                                    <span className={`text-[10px] font-black text-${color}-700 uppercase`}>
                                        {asset.fileType}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="text-sm font-black uppercase text-slate-800 leading-tight">
                                        {asset.name}
                                    </h3>
                                </div>
                                <p className="text-xs text-slate-600 font-bold mb-3 line-clamp-2">
                                    {asset.description}
                                </p>
                                
                                {/* Meta */}
                                <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-100">
                                    <span className="text-[10px] font-black text-slate-400 uppercase">
                                        {asset.fileSize}
                                    </span>
                                    <span className={`text-[10px] font-black text-${color}-600 uppercase`}>
                                        {asset.category.replace('_', ' ')}
                                    </span>
                                </div>

                                {/* Actions */}
                                <button
                                    onClick={() => handleDownload(asset)}
                                    className={`w-full flex items-center justify-center gap-2 px-4 py-2 bg-${color}-600 text-white rounded-lg hover:bg-${color}-700 transition-colors`}
                                >
                                    <Download size={16} />
                                    <span className="text-xs font-black uppercase">Download</span>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Empty State */}
            {filteredAssets.length === 0 && (
                <div className="bg-white border border-slate-200 rounded-lg p-12 text-center">
                    <FileText size={48} className="mx-auto text-slate-300 mb-4" />
                    <h3 className="text-lg font-black uppercase text-slate-800 mb-2">
                        No Assets Found
                    </h3>
                    <p className="text-sm text-slate-600 font-bold">
                        No marketing assets available in this category
                    </p>
                </div>
            )}

            {/* Usage Tips */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-black uppercase text-blue-900 mb-4">Marketing Tips</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h4 className="text-xs font-black text-blue-700 uppercase mb-2">Social Media</h4>
                        <ul className="space-y-1 text-xs text-blue-600 font-bold">
                            <li>• Post daily leading up to event</li>
                            <li>• Use event hashtags</li>
                            <li>• Tag official event accounts</li>
                            <li>• Share behind-the-scenes content</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-xs font-black text-blue-700 uppercase mb-2">Email Campaigns</h4>
                        <ul className="space-y-1 text-xs text-blue-600 font-bold">
                            <li>• Send invitations 2 weeks before</li>
                            <li>• Include booth number and location</li>
                            <li>• Offer exclusive event discounts</li>
                            <li>• Follow up after the event</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-xs font-black text-blue-700 uppercase mb-2">WhatsApp Marketing</h4>
                        <ul className="space-y-1 text-xs text-blue-600 font-bold">
                            <li>• Share with existing customers</li>
                            <li>• Create event-specific groups</li>
                            <li>• Send location and timing details</li>
                            <li>• Share product highlights</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-xs font-black text-blue-700 uppercase mb-2">Print Materials</h4>
                        <ul className="space-y-1 text-xs text-blue-600 font-bold">
                            <li>• Display posters at your office</li>
                            <li>• Hand out invitations to VIP clients</li>
                            <li>• Include in product shipments</li>
                            <li>• Share with distribution partners</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
