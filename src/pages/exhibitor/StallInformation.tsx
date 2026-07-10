import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Download, FileText, ChevronRight, CheckCircle2,
    Layers, Maximize, Map, Calendar, MapPin, Type, Zap,
    Trash2, Box, Grid, Headset, ArrowRight, Plus, ShieldCheck,
    LightbulbIcon, WifiIcon, ZapIcon, Check, CalendarIcon, Package
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import QRCode from 'react-qr-code';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import { API_URL, downloadPdfApi, SERVER_URL } from '@/lib/api';
import FloorPlanPreview from '@/components/dashboard/exhibitor/FloorPlanPreview';
import stallImage from '@/assets/stallImage.png';

const dateFmt = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

const formatDate = (value?: string | Date | null) => {
    if (!value) return 'TBA';
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? 'TBA' : dateFmt.format(date);
};

const shiftDate = (value: string | Date | null | undefined, days: number) => {
    if (!value) return null;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;
    date.setDate(date.getDate() + days);
    return date;
};

const getStallParts = (stallNo: string) => {
    const normalized = String(stallNo || '').replace(/\s+/g, ' ').trim();
    const hallMatch = normalized.match(/hall\s*([a-z0-9]+)/i) || normalized.match(/^h\s*([0-9]+)/i);
    const stallMatch = normalized.match(/[–-]\s*([a-z0-9]+)$/i);
    return {
        hall: hallMatch ? `Hall ${hallMatch[1]}` : 'TBA',
        stall: stallMatch ? stallMatch[1].toUpperCase() : normalized || 'TBA'
    };
};

const openSideLabel = (value?: string) => {
    const text = String(value || '').trim();
    if (!text || /^undefined/i.test(text)) return 'TBA';
    const numberMap: Record<string, string> = { One: '1', Two: '2', Three: '3', Four: '4' };
    const wordMatch = text.match(/\b(One|Two|Three|Four)\b/i);
    if (wordMatch) {
        const normalized = wordMatch[1].charAt(0).toUpperCase() + wordMatch[1].slice(1).toLowerCase();
        const count = numberMap[normalized];
        return `${count} Side${count === '1' ? '' : 's'}`;
    }
    const digitMatch = text.match(/\b([1-4])\b/);
    if (digitMatch) {
        return `${digitMatch[1]} Side${digitMatch[1] === '1' ? '' : 's'}`;
    }
    return 'TBA';
};

const serviceIcon = (name: string) => {
    const key = name.toLowerCase();
    if (key.includes('fascia')) return Type;
    if (key.includes('electric') || key.includes('power')) return ZapIcon;
    if (key.includes('furniture') || key.includes('table') || key.includes('chair')) return Box;
    if (key.includes('internet') || key.includes('wifi')) return WifiIcon;
    if (key.includes('light')) return LightbulbIcon;
    if (key.includes('dustbin') || key.includes('bin')) return Trash2;
    if (key.includes('carpet')) return Map;
    return Package;
};

const serviceSubText = (service: any) => {
    const qty = Number(service?.includedQty || 0);
    const unit = String(service?.unit || '').trim();
    if (!qty && !unit) return '(Provided)';
    if (qty > 0 && unit) return `(${qty} ${unit})`;
    if (qty > 0) return `(${qty})`;
    return `(${unit})`;
};

const resolveUrl = (url?: string) => {
    if (!url) return '';
    return url.startsWith('http') ? url : `${SERVER_URL}${url}`;
};

const passTypeLabel = (type?: string) => {
    const labels: Record<string, string> = {
        exhibitor: 'Exhibitor Pass',
        vehicle: 'Vehicle Pass',
        service: 'Service Pass',
        visitor: 'Visitor Pass',
        lunch: 'Lunch Pass',
        water: 'Water Bottle',
        dinner: 'Dinner Pass',
    };
    return labels[String(type || '').toLowerCase()] || 'Pass Request';
};

const statusClasses = (status?: string) => {
    const key = String(status || '').toLowerCase();
    if (['approved', 'paid', 'complimentary', 'free'].includes(key)) return 'bg-emerald-50 text-emerald-700 border-emerald-100';
    if (['rejected', 'failed', 'cancelled'].includes(key)) return 'bg-rose-50 text-rose-700 border-rose-100';
    return 'bg-amber-50 text-amber-700 border-amber-100';
};

const moneyFmt = (value?: number) => {
    const amount = Number(value || 0);
    return amount ? `₹${amount.toLocaleString('en-IN')}` : 'Free';
};

export default function StallInformation() {
    const navigate = useNavigate();
    const { data } = useExhibitorCtx() || {};
    const [usefulDocs, setUsefulDocs] = useState<any[]>([]);
    const [requirementRequests, setRequirementRequests] = useState<any[]>([]);
    const [loadingRequirements, setLoadingRequirements] = useState(false);
    const [showFloorPlanPreview, setShowFloorPlanPreview] = useState(false);
    const participation = data?.participation || {};
    const stallDetails = data?.stallDetails || {};
    const stallNo = participation.stallFor || stallDetails.stallNumber || participation.stallNo || 'TBA';
    const stallParts = getStallParts(stallNo);
    const stallSize = participation.stallSize || stallDetails.area;
    const dimension = participation.dimension || stallDetails.dimension;
    const dimensionLabel = dimension && stallSize ? `${dimension} (${stallSize} sqm)` : stallSize ? `${stallSize} sqm` : dimension || 'TBA';
    const stallType = participation.stallType || participation.stallCategory || 'TBA';
    const stallCategory = data?.typeOfBusiness || data?.primaryCategory || participation.stallCategory || 'TBA';
    const openSide = openSideLabel(participation.stallScheme || stallDetails.openSide || stallDetails.plScheme);
    const status = data?.status || (stallNo !== 'TBA' ? 'confirmed' : 'pending');
    const isConfirmed = ['confirmed', 'paid', 'advance-paid', 'approved'].includes(String(status).toLowerCase());
    const eventStart = data?.eventId?.startDate || data?.eventId?.date;
    const eventEnd = data?.eventId?.endDate || data?.eventId?.date;
    const setupDeadline = shiftDate(eventStart, -3);
    const allottedOn = data?.updatedAt || data?.createdAt;
    const services = Array.isArray(data?.complimentaryServices) ? data.complimentaryServices : [];
    const powerService = services.find((s: any) => /electric|power/i.test(s.name || ''));
    const powerAllocation = powerService ? serviceSubText(powerService).replace(/[()]/g, '') : 'TBA';
    const hallNumber = stallParts.hall === 'TBA' ? '8, 9, 10' : stallParts.hall;
    const stallQrValue = typeof window !== 'undefined'
        ? `${window.location.origin}/exhibitor-dashboard/stall-information?stall=${encodeURIComponent(stallParts.stall || String(stallNo))}`
        : String(stallNo);

    const overviewRows = [
        { label: 'Hall Number', value: hallNumber, icon: Map },
        { label: 'Stall Number', value: stallParts.stall, icon: MapPin },
        { label: 'Stall Size', value: dimensionLabel, icon: Maximize },
        { label: 'Stall Type', value: stallType, icon: Grid },
        { label: 'Type Of Business', value: stallCategory, icon: Layers },
        { label: 'Open Side', value: openSide, icon: Layers },
        { label: 'Power Allocation', value: powerAllocation, icon: Zap },
    ];

    useEffect(() => {
        let mounted = true;
        downloadPdfApi.get()
            .then((result) => {
                if (!mounted) return;
                const cards = Array.isArray(result?.cards) ? result.cards : [];
                setUsefulDocs(cards);
            })
            .catch(() => {
                if (mounted) setUsefulDocs([]);
            });
        return () => {
            mounted = false;
        };
    }, []);

    useEffect(() => {
        if (!data?._id) {
            setRequirementRequests([]);
            return;
        }

        let mounted = true;
        const token = localStorage.getItem('exhibitorToken') || '';
        const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

        setLoadingRequirements(true);
        Promise.allSettled([
            fetch(`${API_URL}/stall-accessories/orders?exhibitorId=${data._id}`, { headers }).then((r) => r.json()),
            fetch(`${API_URL}/exhibitor-pass-requests/exhibitor/${data._id}`, { headers }).then((r) => r.json()),
        ])
            .then(([accessoryResult, passResult]) => {
                if (!mounted) return;

                const accessoryOrders = accessoryResult.status === 'fulfilled' && Array.isArray(accessoryResult.value?.data)
                    ? accessoryResult.value.data
                    : [];
                const passRequests = passResult.status === 'fulfilled' && Array.isArray(passResult.value?.data)
                    ? passResult.value.data
                    : [];

                const mappedAccessories = accessoryOrders.map((order: any) => ({
                    id: `accessory-${order._id}`,
                    type: 'Add On Services',
                    title: order.items?.map((item: any) => item.name).filter(Boolean).join(', ') || order.orderNo || 'Accessory Order',
                    meta: `${order.items?.length || 0} item${(order.items?.length || 0) === 1 ? '' : 's'} • ${moneyFmt(order.grandTotal)}`,
                    status: order.paymentStatus || 'pending',
                    date: order.createdAt,
                    link: '/exhibitor-dashboard/accessories',
                }));

                const mappedPasses = passRequests.map((request: any) => ({
                    id: `pass-${request._id}`,
                    type: 'Pass Request',
                    title: passTypeLabel(request.passType),
                    meta: `${request.quantity || 0} pass${Number(request.quantity || 0) === 1 ? '' : 'es'} • ${moneyFmt(request.totalAmount)}`,
                    status: request.status || request.paymentStatus || 'pending',
                    date: request.createdAt,
                    link: '/exhibitor-dashboard/exhibitor-pass',
                }));

                setRequirementRequests([...mappedAccessories, ...mappedPasses].sort((a, b) => {
                    return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime();
                }));
            })
            .catch(() => {
                if (mounted) setRequirementRequests([]);
            })
            .finally(() => {
                if (mounted) setLoadingRequirements(false);
            });

        return () => {
            mounted = false;
        };
    }, [data?._id]);

    return (
        <div className="w-full bg-[#f8f9fa] min-h-screen p-3 lg:p-4 pb-16" style={{ fontFamily: '"Inter", sans-serif' }}>
            <div className="max-w-[1600px] mx-auto space-y-1.5 md:space-y-2.5">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2.5">
                    <div>
                        <h2 className="text-[16px] lg:text-[18px] leading-none font-bold text-[#1a2b3c]">Stall Information</h2>
                        <div className="text-[10px] lg:text-xs text-slate-500 flex items-center gap-1">
                            <span>Home</span>
                            <ChevronRight size={12} />
                            <span className="text-slate-700">Stall Information</span>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
                        <Button variant="outline" className="w-full sm:w-auto bg-white border-slate-200 text-blue-600 hover:bg-blue-50 hover:text-blue-600 font-semibold h-7 px-3 py-1 gap-1.5 shadow-sm text-[11px]">
                            <Download size={12} />
                            Download Stall Allotment Letter
                        </Button>
                        <Button className="w-full sm:w-auto bg-[#0052cc] hover:bg-[#0047b3] text-white font-semibold h-7 px-3 gap-1.5 py-1 shadow-sm text-[11px]">
                            <FileText size={12} />
                            View Floor Plan (PDF)
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-3">
                    <div className="lg:col-span-6 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row">
                        <div className="w-full md:w-[45%] relative min-h-[200px] md:min-h-[250px] bg-slate-100">
                            <img loading="lazy" decoding="async" src={stallImage} alt="Exhibition Stall" className="w-full h-full object-cover absolute inset-0" />
                            <div className={`${isConfirmed ? 'bg-[#10b981]' : 'bg-amber-500'} absolute top-2 left-2 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md`}>
                                <CheckCircle2 size={11} />
                                {isConfirmed ? 'Stall Confirmed' : 'Stall Pending'}
                            </div>
                        </div>
                        <div className="w-full md:w-[62%] p-3.5 md:p-4 flex flex-col justify-center">
                            <div className="flex justify-between items-start mb-3">
                                <div className="pt-4">
                                    <p className="text-[12px] font-bold text-[#002855] mb-0.5">Stall No.</p>
                                    <h2 className="text-[14px] md:text-[20px] font-bold text-[#002855] tracking-tight leading-tight">{stallNo}</h2>
                                </div>
                                <div className="text-center flex flex-col items-center ml-3 border border-slate-200 rounded-lg px-2.5 py-1.5 bg-slate-100">
                                    <p className="text-[10px] font-bold text-black mb-1">Stall QR Code</p>
                                    <div className="w-24 h-24 bg-white rounded-lg p-2 flex items-center justify-center">
                                        <QRCode value={stallQrValue} size={80} fgColor="#000000" bgColor="#ffffff" level="M" />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-y-1.5 gap-x-1">
                                {[
                                    { label: 'Stall Type', value: stallType, icon: Layers },
                                    { label: 'Stall Size', value: dimensionLabel, icon: Maximize },
                                    { label: 'Open Side', value: openSide, icon: Map },
                                    { label: 'Type Of Business', value: stallCategory, icon: Layers },
                                    { label: 'Allotted On', value: formatDate(allottedOn), icon: Calendar },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <div className="w-6 h-6 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center shrink-0">
                                            <item.icon size={12} strokeWidth={2} />
                                        </div>
                                        <div>
                                            <p className="text-[9px] text-slate-400 font-medium">{item.label}</p>
                                            <p className="text-[11px] font-bold text-slate-800">{item.value}</p>
                                        </div>
                                    </div>
                                ))}
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center shrink-0">
                                        <MapPin size={12} strokeWidth={2} />
                                    </div>
                                    <div>
                                        <p className="text-[9px] text-slate-400 font-medium">Status</p>
                                        <div className={`inline-flex items-center gap-1 text-[11px] font-bold rounded-full px-2 py-1 ${isConfirmed ? 'text-[#10b981] bg-green-100' : 'text-amber-700 bg-amber-100'}`}>
                                            {isConfirmed ? 'Confirmed' : 'Pending'}
                                            {isConfirmed && <span className="bg-green-500 rounded-full w-3 h-3 flex items-center justify-center p-0.5 font-bold"><Check size={12} strokeWidth={2.5} className="text-white" /></span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-6 bg-white rounded-2xl shadow-sm border border-slate-200 p-3 flex flex-col min-h-[200px]">
                        <h3 className="text-sm font-bold text-slate-800 pl-3">Your Stall Location</h3>
                        <div className="flex-1 flex flex-col items-center overflow-visible">
                            <button
                                type="button"
                                onClick={() => setShowFloorPlanPreview(true)}
                                className="w-full h-[190px] sm:h-[220px] rounded-xl overflow-hidden bg-slate-50 cursor-zoom-in"
                                aria-label="Open floor plan preview"
                            >
                                <FloorPlanPreview currentStallNo={String(stallNo)} />
                            </button>
                            <div className="flex flex-wrap justify-between items-center gap-y-1.5 mt-1.5 text-[9px] font-semibold text-slate-700 w-full px-3">
                                <div className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-200/60"></span> Available</div>
                                <div className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#0052cc]"></span> Booked</div>
                                <div className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span> Your Stall</div>
                                <div className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span> Blocked</div>
                                <div className="flex items-center gap-1 ml-1.5"><ArrowRight size={10} className="text-[#10b981]" strokeWidth={4} /> Entrance</div>
                                <div className="flex items-center gap-1"><Plus size={10} className="text-red-500" strokeWidth={4} /> Fire Exit</div>
                            </div>
                        </div>
                    </div>
                </div>

                {showFloorPlanPreview && (
                    <div className="fixed inset-0 z-50 bg-black/70 p-4 md:p-6 flex items-center justify-center">
                        <div className="w-full max-w-7xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
                            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
                                <div>
                                    <h3 className="text-sm md:text-base font-black text-slate-900">Your Stall Location</h3>
                                    <p className="text-[11px] font-bold text-slate-500">Stall No. {stallParts.stall}</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setShowFloorPlanPreview(false)}
                                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center"
                                    aria-label="Close floor plan preview"
                                >
                                    ×
                                </button>
                            </div>
                            <div className="h-[72vh] bg-slate-50 overflow-auto">
                                <div className="min-w-[1200px] h-full p-4">
                                    <FloorPlanPreview currentStallNo={String(stallNo)} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex flex-col lg:flex-row gap-3 md:gap-3 mt-2.5 lg:w-2/3">
                    <div className="flex-[1.3] bg-[#ecfdf5] rounded-xl p-3 md:p-3.5 flex flex-row items-center gap-3 shadow-[0_1px_3px_rgba(0,0,0,0.02)] border border-slate-200">
                        <div className="flex items-center justify-center shrink-0">
                            <ShieldCheck size={44} fill="#10b981" color="white" strokeWidth={1.5} />
                        </div>
                        <div className="flex flex-col justify-center">
                            <h4 className="text-slate-800 font-extrabold text-[12px] md:text-[13px] mb-0.5 leading-tight">{isConfirmed ? 'Great! Your stall is confirmed.' : 'Your stall booking is in progress.'}</h4>
                            <p className="text-slate-600 text-[10px] font-medium leading-tight">Start preparing your stall for a successful exhibition.</p>
                        </div>
                    </div>

                    <div className="flex-[1.1] bg-[#f5f3ff] rounded-xl p-3 md:p-3.5 flex flex-row items-center gap-3 shadow-[0_1px_3px_rgba(0,0,0,0.02)] border border-slate-200">
                        <div className="w-11 h-11 bg-[#e0d8fe] rounded-xl flex items-center justify-center shrink-0">
                            <CalendarIcon size={20} className="text-[#6d28d9]" strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col justify-center">
                            <h4 className="text-slate-800 font-bold text-[10px] mb-0.5 leading-tight">Setup Deadline</h4>
                            <p className="text-slate-900 text-[13px] md:text-[14px] font-semibold tracking-tight mb-0.5 leading-tight">{formatDate(setupDeadline)}</p>
                            <p className="text-slate-500 text-[8px] md:text-[9px] font-semibold leading-tight whitespace-nowrap">Time: 08:00 AM - 06:00 PM</p>
                        </div>
                    </div>

                    <div className="flex-[1.1] bg-[#fffbeb] rounded-xl p-3 md:p-3.5 flex flex-row items-center gap-3 shadow-[0_1px_3px_rgba(0,0,0,0.02)] border border-slate-200">
                        <div className="w-11 h-11 bg-[#fde68a] rounded-xl flex items-center justify-center shrink-0">
                            <CalendarIcon size={20} className="text-[#d97706]" strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col justify-center">
                            <h4 className="text-slate-800 font-bold text-[10px] mb-0.5 leading-tight">Exhibition Days</h4>
                            <p className="text-slate-900 text-[13px] md:text-[14px] font-semibold tracking-tight mb-0.5 leading-tight whitespace-nowrap">{formatDate(eventStart)} - {formatDate(eventEnd)}</p>
                            <p className="text-slate-500 text-[8px] md:text-[9px] font-semibold leading-tight">10:00 AM - 06:00 PM</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-3 mt-2.5">
                    <div className="lg:col-span-6 flex flex-col gap-2.5">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-2.5">
                            <h3 className="text-sm font-bold text-slate-800 mb-1.5">Included Services</h3>
                            {services.length ? (
                                <div className="flex flex-wrap gap-1">
                                    {services.map((service: any) => {
                                        const Icon = serviceIcon(service.name || '');
                                        return (
                                            <div key={service._id || service.name} className="flex flex-col items-center justify-center border border-slate-100 rounded-xl p-1.5 min-w-[70px] flex-1 relative bg-white transition-colors shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)]">
                                                <div className="absolute -top-1 -right-1 bg-[#10b981] text-white rounded-full p-0.5 shadow-sm border-2 border-white">
                                                    <Check size={8} strokeWidth={3} />
                                                </div>
                                                <span className="border border-slate-100 p-3"><Icon size={20} className="text-[#0052cc] mb-0.5 opacity-90" strokeWidth={1.5} /></span>
                                                <p className="text-[9px] font-bold text-slate-700 text-center leading-tight whitespace-nowrap">{service.name}</p>
                                                <p className="text-[8px] font-semibold text-slate-400 text-center mt-0 whitespace-nowrap">{serviceSubText(service)}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-[11px] font-semibold text-slate-500 bg-slate-50 border border-dashed border-slate-200 rounded-xl p-4 text-center">
                                    No complimentary services are configured yet.
                                </div>
                            )}
                        </div>

                        <div className="bg-white mt-2 rounded-2xl shadow-sm border border-slate-200 p-2.5 h-[300px] flex flex-col min-h-0">
                            <div className="flex justify-between items-center mb-1.5">
                                <h3 className="text-sm font-bold text-slate-800">Additional Requirements</h3>
                                <button onClick={() => navigate('/exhibitor-dashboard/accessories')} className="text-[10px] font-bold text-black hover:text-slate-700">Manage Requests</button>
                            </div>
                            {loadingRequirements ? (
                                <div className="text-[11px] font-semibold text-slate-500 bg-slate-50 border border-dashed border-slate-200 rounded-xl p-4 text-center">
                                    Loading additional requests...
                                </div>
                            ) : requirementRequests.length ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-1.5 flex-1 min-h-0 overflow-y-scroll pr-1">
                                    {requirementRequests.map((request) => (
                                        <button
                                            key={request.id}
                                            type="button"
                                            onClick={() => navigate(request.link)}
                                            className="w-full text-left bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-100 rounded-xl p-2 transition-colors"
                                        >
                                            <div className="flex h-full flex-col justify-between gap-2">
                                                <div className="min-w-0">
                                                    <p className="text-[9px] font-extrabold text-[#0052cc] uppercase tracking-wide">{request.type}</p>
                                                    <p className="text-[11px] font-bold text-slate-800 line-clamp-2 leading-tight">{request.title}</p>
                                                    <p className="text-[9px] font-semibold text-slate-500">{request.meta}</p>
                                                </div>
                                                <div className="flex items-center justify-between gap-2">
                                                    <span className={`inline-flex border rounded-full px-2 py-0.5 text-[8px] font-extrabold uppercase ${statusClasses(request.status)}`}>
                                                        {request.status}
                                                    </span>
                                                    <p className="text-[8px] font-semibold text-slate-400">{formatDate(request.date)}</p>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-[11px] font-semibold text-slate-500 bg-slate-50 border border-dashed border-slate-200 rounded-xl p-4 text-center">
                                    Additional requirement requests will appear here after they are raised.
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-3 flex flex-col gap-2.5">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-3.5 h-[450px] flex flex-col">
                            <h3 className="text-sm font-bold text-slate-800 mb-3">Important Deadlines</h3>
                            <div className="space-y-4">
                                {[
                                    { name: 'Last Date for Extra Services', date: formatDate(setupDeadline), time: '', icon: Calendar },
                                    { name: 'Stall Setup Date', date: formatDate(shiftDate(eventStart, -2)), time: '', icon: Calendar },
                                    { name: 'Decoration Completion', date: formatDate(shiftDate(eventStart, -1)), time: 'By 06:00 PM', icon: Calendar },
                                    { name: 'Stall Dismantling', date: formatDate(eventEnd), time: 'After 06:00 PM', icon: Calendar },
                                ].map((dl, i) => (
                                    <div key={i} className="flex items-center gap-2 pb-3.5 border-b border-slate-100 last:border-0 last:pb-0">
                                        <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0052cc] flex items-center justify-center shrink-0 border border-blue-100">
                                            <dl.icon size={14} strokeWidth={2} />
                                        </div>
                                        <p className="text-[11px] font-semibold text-slate-700 flex-1 leading-tight">{dl.name}</p>
                                        <div className="text-right shrink-0">
                                            <p className="text-[11px] font-bold text-slate-900 tracking-tight">{dl.date}</p>
                                            {dl.time && <p className="text-[8px] text-slate-500 font-bold mt-0">{dl.time}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-3 flex flex-col gap-2.5 lg:-mt-[82px]">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-3.5">
                            <h3 className="text-sm font-bold text-slate-800 mb-2">Stall Overview</h3>
                            <div className="space-y-0.5">
                                {overviewRows.map((item, i) => (
                                    <div key={i} className="flex items-center justify-between py-0.5 border-b border-slate-50 last:border-0 gap-2">
                                        <div className="flex items-center gap-2 text-slate-600">
                                            <item.icon size={12} className="text-slate-400" strokeWidth={2} />
                                            <span className="text-[10px] font-semibold">{item.label}</span>
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-800 text-right">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                            <Button onClick={() => navigate('/exhibitor-dashboard/chat')} variant="outline" className="w-full mt-2.5 bg-blue-50/50 border-blue-100 text-black hover:bg-blue-100 hover:text-slate-700 font-bold text-[10px] h-7 flex justify-between px-3 transition-colors">
                                <div className="flex items-center gap-1.5">
                                    <Headset size={13} />
                                    Request Changes / Assistance
                                </div>
                                <ChevronRight size={13} />
                            </Button>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-3.5 h-full">
                            <h3 className="text-sm font-bold text-slate-800 mb-2">Useful Documents</h3>
                            <div className="space-y-0.5">
                                {usefulDocs.length ? usefulDocs.map((doc) => (
                                    <div key={doc._id || doc.title} className="flex items-center justify-between py-0.5 border-b border-slate-50 last:border-0">
                                        <div className="flex items-center gap-2 text-slate-700">
                                            <FileText size={11} className="text-[#0052cc]" strokeWidth={1.5} />
                                            <span className="text-[10px] font-bold">{doc.title}</span>
                                        </div>
                                        <a href={resolveUrl(doc.pdf)} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[8px] font-extrabold text-[#0052cc] bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded-md transition-colors border border-blue-100 tracking-wide uppercase">
                                            <Download size={10} strokeWidth={2.5} />
                                            View
                                        </a>
                                    </div>
                                )) : (
                                    <div className="text-[11px] font-semibold text-slate-500 bg-slate-50 border border-dashed border-slate-200 rounded-xl p-4 text-center">
                                        No useful documents added from admin yet.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
