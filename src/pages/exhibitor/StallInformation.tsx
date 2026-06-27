
import React from 'react';
import {
    Download, FileText, ChevronRight, CheckCircle2, QrCode,
    Layers, Maximize, Map, Calendar, MapPin, Type, Zap,
    Wifi, Trash2, Lightbulb, Box, Grid, Headset, Users, ArrowRight, Plus, ShieldCheck, LightbulbIcon, WifiIcon, ZapIcon, Check, CalendarIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import QRCode from 'react-qr-code';
import stallImage from '@/assets/stallImage.png';
import rightimage from '@/assets/stallRightImagefinal.png';

export default function StallInformation() {
    return (
        <div className="w-full bg-[#f8f9fa] min-h-screen p-3 lg:p-4 pb-16" style={{ fontFamily: '"Inter", sans-serif' }}>
            <div className="max-w-[1600px] mx-auto space-y-1.5 md:space-y-2.5">

                {/* Header Section */}
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

                {/* TOP ROW: Stall Details + Stall Location */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-3">
                    {/* Stall Details Card */}
                    <div className="lg:col-span-6 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row">
                        {/* Left Image Section */}
                        <div className="w-full md:w-[45%] relative min-h-[200px] md:min-h-[250px] bg-slate-100">
                            <img
                                src={stallImage}
                                alt="Exhibition Stall"
                                className="w-full h-full object-fit absolute inset-0"
                            />
                            <div className="absolute top-2 left-2 bg-[#10b981] text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                                <CheckCircle2 size={11} />
                                Stall Confirmed
                            </div>
                        </div>
                        {/* Right Details Section */}
                        <div className="w-full md:w-[62%] p-3.5 md:p-4 flex flex-col justify-center">
                            <div className="flex justify-between items-start mb-3">
                                <div className='pt-4'>
                                    <p className="text-[12px] font-bold text-[#002855] mb-0.5">Stall No.</p>
                                    <h2 className="text-[14px] md:text-[20px] font-bold text-[#002855] tracking-tight leading-tight">HALL 3 – B12</h2>
                                </div>
                                <div className="text-center flex flex-col items-center ml-3 border border-slate-200 rounded-lg px-2.5 py-1 bg-slate-100">
                                    <p className="text-[10px] font-bold text-black mb-0.5   ">Stall QR Code</p>
                                    <div className="w-16 h-16 bg-white  rounded-lg p-1 flex items-center justify-center">
                                        <QRCode value="HALL 3 - B12" size={32} fgColor="#1a5c2e" style={{ height: "auto", maxWidth: "100%", width: "100%" }} />
                                    </div>
                                </div>

                            </div>

                            <div className="grid grid-cols-2 gap-y-1.5 gap-x-1">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center shrink-0">
                                        <Layers size={12} strokeWidth={2} />
                                    </div>
                                    <div>
                                        <p className="text-[9px] text-slate-400 font-medium">Stall Type</p>
                                        <p className="text-[11px] font-bold text-slate-800">Premium Corner</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center shrink-0">
                                        <Maximize size={12} strokeWidth={2} />
                                    </div>
                                    <div>
                                        <p className="text-[9px] text-slate-400 font-medium">Stall Size</p>
                                        <p className="text-[11px] font-bold text-slate-800">6m X 6m (36 sqm)</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center shrink-0">
                                        <Map size={12} strokeWidth={2} />
                                    </div>
                                    <div>
                                        <p className="text-[9px] text-slate-400 font-medium">Open Side</p>
                                        <p className="text-[11px] font-bold text-slate-800">2 Sides</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center shrink-0">
                                        <Layers size={12} strokeWidth={2} />
                                    </div>
                                    <div>
                                        <p className="text-[9px] text-slate-400 font-medium">Floor</p>
                                        <p className="text-[11px] font-bold text-slate-800">Ground Floor</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center shrink-0">
                                        <Calendar size={12} strokeWidth={2} />
                                    </div>
                                    <div>
                                        <p className="text-[9px] text-slate-400 font-medium">Allotted On</p>
                                        <p className="text-[11px] font-bold text-slate-800">15 May 2026</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center shrink-0">
                                        <MapPin size={12} strokeWidth={2} />
                                    </div>
                                    <div>
                                        <p className="text-[9px] text-slate-400 font-medium">Status</p>
                                        <div className="inline-flex items-center gap-1 text-[#10b981] text-[11px] font-bold bg-green-100 rounded-full px-2 py-1">
                                            Confirmed <span className='bg-green-500 rounded-full w-3 h-3 flex items-center justify-center p-0.5 font-bold'> <Check size={12} strokeWidth={2.5} className="text-white" /></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stall Location Card */}
                    <div className="lg:col-span-6 bg-white rounded-2xl shadow-sm border border-slate-200 p-3 flex flex-col min-h-[200px]">
                        <h3 className="text-sm font-bold text-slate-800 pl-3">Your Stall Location</h3>
                        <div className="flex-1 flex flex-col items-center overflow-visible">
                            <div className="w-full h-[190px]">
                                <img src={rightimage} alt="" className='w-full h-full object-fit' />
                            </div>
                            {/* Legend */}
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

                {/* STATE BANNERS ROW */}
                <div className="flex flex-col lg:flex-row gap-3 md:gap-3 mt-2.5 lg:w-2/3">
                    {/* Green Banner */}
                    <div className="flex-[1.3] bg-[#ecfdf5] rounded-xl p-3 md:p-3.5 flex flex-row items-center gap-3 shadow-[0_1px_3px_rgba(0,0,0,0.02)] border border-slate-200">
                        <div className="flex items-center justify-center shrink-0">
                            <ShieldCheck size={44} fill="#10b981" color="white" strokeWidth={1.5} />
                        </div>
                        <div className="flex flex-col justify-center">
                            <h4 className="text-slate-800 font-extrabold text-[12px] md:text-[13px] mb-0.5 leading-tight">Great! Your stall is confirmed.</h4>
                            <p className="text-slate-600 text-[10px] font-medium leading-tight whitespace-nowrap">Start preparing your stall for a successful exhibition. 🎉</p>
                        </div>
                    </div>

                    {/* Purple Banner */}
                    <div className="flex-[1.1] bg-[#f5f3ff] rounded-xl p-3 md:p-3.5 flex flex-row items-center gap-3 shadow-[0_1px_3px_rgba(0,0,0,0.02)] border border-slate-200">
                        <div className="w-11 h-11 bg-[#e0d8fe] rounded-xl flex items-center justify-center shrink-0">
                            <CalendarIcon size={20} className="text-[#6d28d9]" strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col justify-center">
                            <h4 className="text-slate-800 font-bold text-[10px] mb-0.5 leading-tight">Setup Deadline</h4>
                            <p className="text-slate-900 text-[13px] md:text-[14px] font-semibold tracking-tight mb-0.5 leading-tight">18 Aug 2026</p>
                            <p className="text-slate-500 text-[8px] md:text-[9px] font-semibold leading-tight whitespace-nowrap">Time: 08:00 AM - 06:00 PM</p>
                        </div>
                    </div>

                    {/* Yellow Banner */}
                    <div className="flex-[1.1] bg-[#fffbeb] rounded-xl p-3 md:p-3.5 flex flex-row items-center gap-3 shadow-[0_1px_3px_rgba(0,0,0,0.02)] border border-slate-200">
                        <div className="w-11 h-11 bg-[#fde68a] rounded-xl flex items-center justify-center shrink-0">
                            <CalendarIcon size={20} className="text-[#d97706]" strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col justify-center">
                            <h4 className="text-slate-800 font-bold text-[10px] mb-0.5 leading-tight">Exhibition Days</h4>
                            <p className="text-slate-900 text-[13px] md:text-[14px] font-semibold tracking-tight mb-0.5 leading-tight whitespace-nowrap">21 - 23 Aug 2026</p>
                            <p className="text-slate-500 text-[8px] md:text-[9px] font-semibold leading-tight">10:00 AM - 06:00 PM</p>
                        </div>
                    </div>
                </div>

                {/* MAIN CONTENT: 3-COLUMN LAYOUT */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-3 mt-2.5">

                    {/* LEFT COLUMN: Green Banner + Services + Requirements */}
                    <div className="lg:col-span-6 flex flex-col gap-2.5">


                        {/* Included Services */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-2.5">
                            <h3 className="text-sm font-bold text-slate-800 mb-1.5">Included Services</h3>
                            <div className="flex flex-wrap gap-1">
                                {[
                                    { name: 'Carpet', sub: '(Provided)', icon: Map },
                                    { name: 'Fascia Name', sub: '(Provided)', icon: Type },
                                    { name: 'Electricity', sub: '(5 KW)', icon: ZapIcon },
                                    { name: 'Basic Furniture', sub: '(1 Table + 3 Chair)', icon: Box },
                                    { name: 'Internet', sub: '(2 Mbps)', icon: WifiIcon },
                                    { name: 'Spot Lights', sub: '(4 Nos.)', icon: LightbulbIcon },
                                    { name: 'Dustbin', sub: '(1 No.)', icon: Trash2 },
                                ].map((service, i) => (
                                    <div key={i} className="flex flex-col items-center justify-center border border-slate-100 rounded-xl p-1.5 min-w-[70px] flex-1 relative bg-white transition-colors shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)]">
                                        <div className="absolute -top-1 -right-1 bg-[#10b981] text-white rounded-full p-0.5 shadow-sm border-2 border-white">
                                            <Check size={8} strokeWidth={3} />
                                        </div>
                                        <span className='border border-slate-100 p-3'><service.icon size={20} className="text-[#0052cc] mb-0.5 opacity-90" strokeWidth={1.5} /></span>
                                        <p className="text-[9px] font-bold text-slate-700 text-center leading-tight whitespace-nowrap">{service.name}</p>
                                        <p className="text-[8px] font-semibold text-slate-400 text-center mt-0 whitespace-nowrap">{service.sub}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Additional Requirements */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-2.5 flex-1 flex flex-col">
                            <div className="flex justify-between items-center mb-1.5">
                                <h3 className="text-sm font-bold text-slate-800">Additional Requirements</h3>
                                <button className="text-[10px] font-bold text-[#0052cc] hover:text-[#003d99]">Manage Requests</button>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                {[
                                    { name: 'Extra Power 10 KW', status: 'Requested', type: 'green' },
                                    { name: 'Water Connection', status: 'Pending', type: 'amber' },
                                    { name: 'Extra Table (2 Nos.)', status: 'Approved', type: 'green' },
                                    { name: 'Lockable Cabinet', status: 'Requested', type: 'green' },
                                    { name: 'Banner Hanging', status: 'Pending', type: 'amber' },
                                ].map((req, i) => (
                                    <div key={i} className="flex flex-col items-center justify-center border border-slate-100 rounded-xl p-1.5 min-w-[90px] flex-1 bg-white shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)]">
                                        <p className="text-[10px] font-bold text-slate-700 text-center mb-1 h-5 flex items-center justify-center leading-tight whitespace-nowrap">{req.name}</p>
                                        <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-md w-full text-center tracking-wide ${req.type === 'green'
                                            ? 'bg-[#ecfdf5] text-[#059669] border border-[#d1fae5]'
                                            : 'bg-[#fffbeb] text-[#d97706] border border-[#fef3c7]'
                                            }`}>
                                            {req.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* MIDDLE COLUMN: Purple/Yellow Banners + Deadlines */}
                    <div className="lg:col-span-3 flex flex-col gap-2.5">


                        {/* Important Deadlines */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-3.5 h-full">
                            <h3 className="text-sm font-bold text-slate-800 mb-3">Important Deadlines</h3>
                            <div className="space-y-3">
                                {[
                                    { name: 'Last Date for Extra Services', date: '15 Aug 2026', time: '', icon: Calendar },
                                    { name: 'Stall Setup Date', date: '19 Aug 2026', time: '', icon: Calendar },
                                    { name: 'Decoration Completion', date: '20 Aug 2026', time: 'By 06:00 PM', icon: Calendar },
                                    { name: 'Stall Dismantling', date: '23 Aug 2026', time: 'After 06:00 PM', icon: Calendar },
                                ].map((dl, i) => (
                                    <div key={i} className="flex items-center gap-2 pb-2.5 border-b border-slate-100 last:border-0 last:pb-0">
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

                    {/* RIGHT COLUMN: Stall Overview + Useful Documents */}
                    <div className="lg:col-span-3 flex flex-col gap-2.5 lg:-mt-[82px]">
                        {/* Stall Overview */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-3.5 ">
                            <h3 className="text-sm font-bold text-slate-800 mb-2">Stall Overview</h3>
                            <div className="space-y-0.5">
                                {[
                                    { label: 'Hall Number', value: 'Hall 3', icon: Map },
                                    { label: 'Stall Number', value: 'B12', icon: MapPin },
                                    { label: 'Stall Size', value: '6m X 6m (36 sqm)', icon: Maximize },
                                    { label: 'Stall Type', value: 'Premium Corner', icon: Grid },
                                    { label: 'Open Side', value: '2 Sides', icon: Layers },
                                    { label: 'Power Allocation', value: '5 KW', icon: Zap },
                                    { label: 'Floor', value: 'Ground Floor', icon: Layers },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between py-0.5 border-b border-slate-50 last:border-0">
                                        <div className="flex items-center gap-2 text-slate-600">
                                            <item.icon size={12} className="text-slate-400" strokeWidth={2} />
                                            <span className="text-[10px] font-semibold">{item.label}</span>
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-800">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                            <Button variant="outline" className="w-full mt-2.5 bg-blue-50/50 border-blue-100 text-[#0052cc] hover:bg-blue-100 hover:text-[#003d99] font-bold text-[10px] h-7 flex justify-between px-3 transition-colors">
                                <div className="flex items-center gap-1.5">
                                    <Headset size={13} />
                                    Request Changes / Assistance
                                </div>
                                <ChevronRight size={13} />
                            </Button>
                        </div>

                        {/* Useful Documents */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-3.5 h-full">
                            <h3 className="text-sm font-bold text-slate-800 mb-2">Useful Documents</h3>
                            <div className="space-y-0.5">
                                {[
                                    { name: 'Booth Guidelines' },
                                    { name: 'Technical Manual' },
                                    { name: 'Electrical Guidelines' },
                                    { name: 'Exhibitor Manual' },
                                ].map((doc, i) => (
                                    <div key={i} className="flex items-center justify-between py-0.5 border-b border-slate-50 last:border-0">
                                        <div className="flex items-center gap-2 text-slate-700">
                                            <FileText size={11} className="text-[#0052cc]" strokeWidth={1.5} />
                                            <span className="text-[10px] font-bold">{doc.name}</span>
                                        </div>
                                        <button className="flex items-center gap-1 text-[8px] font-extrabold text-[#0052cc] bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded-md transition-colors border border-blue-100 tracking-wide uppercase">
                                            <Download size={10} strokeWidth={2.5} />
                                            View
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
