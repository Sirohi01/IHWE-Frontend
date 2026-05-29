import React from 'react';
import {
    Download, FileText, ChevronRight, CheckCircle2, QrCode,
    Layers, Maximize, Map, Calendar, MapPin, Type, Zap,
    Wifi, Trash2, Lightbulb, Box, Grid, Headset
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import stallImage from '@/assets/stallImage.png';

export default function StallInformation() {
    return (
        <div className="w-full bg-[#f8f9fa] min-h-screen font-sans p-4 lg:p-6 pb-20">
            <div className="max-w-[1600px] mx-auto space-y-4 md:space-y-6">

                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-[#1a2b3c]">Stall Information</h1>
                        <div className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                            <span>Home</span>
                            <ChevronRight size={14} />
                            <span className="text-slate-700">Stall Information</span>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                        <Button variant="outline" className="w-full sm:w-auto bg-white border-slate-200 text-blue-600 hover:bg-blue-50 font-bold h-10 px-4 gap-2 shadow-sm">
                            <Download size={16} />
                            Download Stall Allotment Letter
                        </Button>
                        <Button className="w-full sm:w-auto bg-[#0052cc] hover:bg-[#0047b3] text-white font-bold h-10 px-4 gap-2 shadow-sm">
                            <FileText size={16} />
                            View Floor Plan (PDF)
                        </Button>
                    </div>
                </div>

                {/* Top Row: Details & Location */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
                    {/* Stall Details Card */}
                    <div className="lg:col-span-8 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row">
                        {/* Left Image Section */}
                        <div className="w-full md:w-[38%] relative min-h-[220px] md:min-h-[280px] bg-slate-100">
                            <img
                                src={stallImage}
                                alt="Exhibition Stall"
                                className="w-full h-full object-cover absolute inset-0"
                            />
                            <div className="absolute top-3 left-3 bg-[#10b981] text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                                <CheckCircle2 size={13} />
                                Stall Confirmed
                            </div>
                        </div>
                        {/* Right Details Section */}
                        <div className="w-full md:w-[62%] p-5 md:p-6 flex flex-col justify-center">
                            <div className="flex justify-between items-start mb-5">
                                <div>
                                    <p className="text-[12px] font-bold text-slate-500 mb-1">Stall No.</p>
                                    <h2 className="text-2xl md:text-[28px] font-extrabold text-[#002855] tracking-tight leading-tight">HALL 3 – B12</h2>
                                </div>
                                <div className="text-center flex flex-col items-center ml-4">
                                    <p className="text-[9px] font-bold text-slate-400 mb-1.5 border border-slate-200 rounded px-2 py-0.5">Stall QR Code</p>
                                    <div className="w-14 h-14 bg-white border-2 border-dashed border-[#10b981] rounded-lg p-1.5 flex items-center justify-center">
                                        <QrCode size={34} className="text-[#1a5c2e]" strokeWidth={1.5} />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center shrink-0">
                                        <Layers size={15} strokeWidth={2} />
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-slate-400 font-medium">Stall Type</p>
                                        <p className="text-[13px] font-bold text-slate-800">Premium Corner</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center shrink-0">
                                        <Maximize size={15} strokeWidth={2} />
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-slate-400 font-medium">Stall Size</p>
                                        <p className="text-[13px] font-bold text-slate-800">6m X 6m (36 sqm)</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center shrink-0">
                                        <Map size={15} strokeWidth={2} />
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-slate-400 font-medium">Open Side</p>
                                        <p className="text-[13px] font-bold text-slate-800">2 Sides</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center shrink-0">
                                        <Layers size={15} strokeWidth={2} />
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-slate-400 font-medium">Floor</p>
                                        <p className="text-[13px] font-bold text-slate-800">Ground Floor</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center shrink-0">
                                        <Calendar size={15} strokeWidth={2} />
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-slate-400 font-medium">Allotted On</p>
                                        <p className="text-[13px] font-bold text-slate-800">15 May 2026</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center shrink-0">
                                        <MapPin size={15} strokeWidth={2} />
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-slate-400 font-medium">Status</p>
                                        <div className="inline-flex items-center gap-1 text-[#10b981] text-[13px] font-bold">
                                            Confirmed <CheckCircle2 size={14} strokeWidth={2.5} className="text-[#10b981]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Your Stall Location Card */}
                    <div className="lg:col-span-4 bg-white rounded-2xl shadow-sm border border-slate-200 p-5 flex flex-col min-h-[300px]">
                        <h3 className="text-base font-bold text-slate-800 mb-4">Your Stall Location</h3>
                        <div className="flex-1 border border-slate-200 rounded-xl bg-slate-50 p-3 relative flex flex-col items-center justify-center overflow-hidden">
                            {/* Visual Floor Plan Representation */}
                            <div className="w-full max-w-[280px] bg-white border border-slate-300 shadow-sm rounded-lg p-2.5 relative">
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0052cc] text-white text-[10px] font-bold px-4 py-1 rounded-full z-10 whitespace-nowrap shadow-sm">
                                    HALL 3
                                </div>

                                <div className="grid grid-cols-6 gap-1 mt-3">
                                    {/* Left Blocks */}
                                    <div className="col-span-1 flex flex-col gap-1">
                                        <div className="h-6 bg-[#0052cc] rounded-sm text-white flex justify-center items-center"><MapPin size={10} /></div>
                                        <div className="h-8 bg-slate-100 rounded-sm"></div>
                                        <div className="h-10 bg-blue-100 rounded-sm text-[7px] font-bold flex justify-center items-center text-blue-600">B03</div>
                                        <div className="h-6 bg-[#0052cc] rounded-sm text-white flex justify-center items-center"><MapPin size={10} /></div>
                                    </div>
                                    {/* Middle Blocks */}
                                    <div className="col-span-4 grid grid-cols-4 gap-1">
                                        <div className="h-8 bg-blue-200/60 rounded-sm text-[7px] font-bold flex justify-center items-center text-blue-700">B09</div>
                                        <div className="h-8 bg-blue-200/60 rounded-sm text-[7px] font-bold flex justify-center items-center text-blue-700">B10</div>
                                        <div className="h-8 bg-blue-200/60 rounded-sm text-[7px] font-bold flex justify-center items-center text-blue-700">B11</div>
                                        <div className="h-8 bg-blue-200/60 rounded-sm text-[7px] font-bold flex justify-center items-center text-blue-700">B18</div>
                                        <div className="col-span-4 h-3 flex items-center justify-center opacity-30 text-[6px] tracking-[0.2em] font-bold text-slate-400">CORRIDOR</div>
                                        <div className="h-10 bg-blue-200/60 rounded-sm text-[7px] font-bold flex justify-center items-center text-blue-700">B05</div>
                                        <div className="h-10 bg-blue-200/60 rounded-sm text-[7px] font-bold flex justify-center items-center text-blue-700">B06</div>
                                        {/* Highlighted B12 */}
                                        <div className="h-10 col-span-1 bg-[#10b981] rounded-sm text-[9px] font-extrabold flex justify-center items-center text-white relative shadow-md scale-110 z-10 border border-[#059669]">
                                            B12
                                            <div className="absolute -top-4 w-5 h-5 bg-[#10b981] rounded-full border-2 border-white shadow-sm flex items-center justify-center">
                                                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                            </div>
                                            <div className="absolute -top-1 w-2 h-2 bg-[#10b981] rotate-45 border-r border-b border-[#059669]"></div>
                                        </div>
                                        <div className="h-10 bg-blue-200/60 rounded-sm text-[7px] font-bold flex justify-center items-center text-blue-700">B14</div>
                                    </div>
                                    {/* Right Blocks */}
                                    <div className="col-span-1 flex flex-col gap-1">
                                        <div className="h-6 bg-[#0052cc] rounded-sm text-white flex justify-center items-center"><MapPin size={10} /></div>
                                        <div className="h-8 bg-slate-400 rounded-sm text-[7px] font-bold flex justify-center items-center text-white">B19</div>
                                        <div className="h-10 bg-blue-100 rounded-sm text-[7px] font-bold flex justify-center items-center text-blue-600">B02</div>
                                        <div className="h-6 bg-slate-100 rounded-sm"></div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-[8px] text-red-500 font-bold mt-2 px-1">
                                    <span className="flex items-center gap-0.5"><div className="w-2 h-2 bg-red-500 text-white rounded-full flex items-center justify-center text-[6px]">+</div> Fire Exit</span>
                                    <span className="flex items-center gap-0.5"><div className="w-2 h-2 bg-red-500 text-white rounded-full flex items-center justify-center text-[6px]">+</div> Fire Exit</span>
                                </div>
                                <div className="absolute top-1/2 -left-6 -translate-y-1/2 text-[8px] font-bold text-[#10b981] flex flex-col items-center">
                                    <div className="w-3 h-3 bg-[#10b981] rounded-full text-white flex items-center justify-center mb-0.5">→</div>
                                    Entrance
                                </div>
                                <div className="absolute top-1/2 -right-6 -translate-y-1/2 text-[8px] font-bold text-[#10b981] flex flex-col items-center">
                                    <div className="w-3 h-3 bg-[#10b981] rounded-full text-white flex items-center justify-center mb-0.5">←</div>
                                    Entrance
                                </div>
                            </div>

                            {/* Legend */}
                            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 mt-5 text-[10px] font-medium text-slate-600 w-full px-2">
                                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-100 border border-blue-200"></span> Available</div>
                                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#0052cc]"></span> Booked</div>
                                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span> Your Stall</div>
                                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span> Blocked</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Banners Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-4 md:gap-6">
                    {/* Green Banner */}
                    <div className="lg:col-span-4 bg-[#ecfdf5] border border-[#d1fae5] rounded-xl p-4 flex items-center gap-4 shadow-sm">
                        <div className="w-12 h-12 bg-[#10b981] rounded-full flex items-center justify-center shrink-0 shadow-sm">
                            <CheckCircle2 size={24} className="text-white" />
                        </div>
                        <div>
                            <h4 className="text-[#065f46] font-extrabold text-[15px] mb-0.5 tracking-tight">Great! Your stall is confirmed.</h4>
                            <p className="text-[#047857] text-[11px] font-medium">Start preparing your stall for a successful exhibition. 🎉</p>
                        </div>
                    </div>

                    {/* Purple Banner */}
                    <div className="lg:col-span-4 bg-[#f5f3ff] border border-[#ede9fe] rounded-xl p-4 flex items-center gap-4 shadow-sm">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-[#ede9fe]">
                            <Calendar size={22} className="text-[#8b5cf6]" strokeWidth={2.5} />
                        </div>
                        <div>
                            <h4 className="text-slate-600 font-bold text-[10px] uppercase tracking-wider mb-0.5">Setup Deadline</h4>
                            <p className="text-[#4c1d95] text-[17px] font-extrabold leading-tight tracking-tight">18 Aug 2026</p>
                            <p className="text-slate-500 text-[10px] font-bold mt-0.5">Time: 08:00 AM - 06:00 PM</p>
                        </div>
                    </div>

                    {/* Yellow Banner */}
                    <div className="lg:col-span-4 bg-[#fffbeb] border border-[#fef3c7] rounded-xl p-4 flex items-center gap-4 shadow-sm">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-[#fef3c7]">
                            <Calendar size={22} className="text-[#f59e0b]" strokeWidth={2.5} />
                        </div>
                        <div>
                            <h4 className="text-slate-600 font-bold text-[10px] uppercase tracking-wider mb-0.5">Exhibition Days</h4>
                            <p className="text-[#92400e] text-[17px] font-extrabold leading-tight tracking-tight">21 - 23 Aug 2026</p>
                            <p className="text-slate-500 text-[10px] font-bold mt-0.5">10:00 AM - 06:00 PM</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
                    {/* Left Column (Included Services & Additional Req) */}
                    <div className="lg:col-span-5 space-y-4 md:space-y-6">
                        {/* Included Services */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
                            <h3 className="text-base font-bold text-slate-800 mb-4">Included Services</h3>
                            <div className="flex flex-wrap gap-2.5">
                                {[
                                    { name: 'Carpet', sub: '(Provided)', icon: Map },
                                    { name: 'Fascia Name', sub: '(Provided)', icon: Type },
                                    { name: 'Electricity', sub: '(5 KW)', icon: Zap },
                                    { name: 'Basic Furniture', sub: '(1 Table + 3 Chair)', icon: Box },
                                    { name: 'Internet', sub: '(2 Mbps)', icon: Wifi },
                                    { name: 'Spot Lights', sub: '(4 Nos.)', icon: Lightbulb },
                                    { name: 'Dustbin', sub: '(1 No.)', icon: Trash2 },
                                ].map((service, i) => (
                                    <div key={i} className="flex flex-col items-center justify-center border border-slate-100 rounded-xl p-3 min-w-[85px] flex-1 relative bg-white hover:border-slate-300 transition-colors shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)]">
                                        <div className="absolute -top-1.5 -right-1.5 bg-[#10b981] text-white rounded-full p-0.5 shadow-sm border-2 border-white">
                                            <CheckCircle2 size={10} strokeWidth={3} />
                                        </div>
                                        <service.icon size={20} className="text-[#0052cc] mb-2 opacity-80" strokeWidth={1.5} />
                                        <p className="text-[11px] font-bold text-slate-700 text-center leading-tight whitespace-nowrap">{service.name}</p>
                                        <p className="text-[9px] font-semibold text-slate-400 text-center mt-0.5 whitespace-nowrap">{service.sub}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Additional Requirements */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-base font-bold text-slate-800">Additional Requirements</h3>
                                <button className="text-[11px] font-bold text-[#0052cc] hover:text-[#003d99]">Manage Requests</button>
                            </div>
                            <div className="flex flex-wrap gap-2.5">
                                {[
                                    { name: 'Extra Power 10 KW', status: 'Requested', type: 'green' },
                                    { name: 'Water Connection', status: 'Pending', type: 'amber' },
                                    { name: 'Extra Table (2 Nos.)', status: 'Approved', type: 'green' },
                                    { name: 'Lockable Cabinet', status: 'Requested', type: 'green' },
                                    { name: 'Banner Hanging', status: 'Pending', type: 'amber' },
                                ].map((req, i) => (
                                    <div key={i} className="flex flex-col items-center justify-center border border-slate-100 rounded-xl p-3 min-w-[110px] flex-1 bg-white shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)]">
                                        <p className="text-[11px] font-bold text-slate-700 text-center mb-2.5 h-7 flex items-center justify-center leading-tight">{req.name}</p>
                                        <span className={`text-[10px] font-extrabold px-3 py-1 rounded-md w-full text-center tracking-wide ${req.type === 'green'
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

                    {/* Middle Column (Important Deadlines) */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 h-full">
                            <h3 className="text-base font-bold text-slate-800 mb-5">Important Deadlines</h3>
                            <div className="space-y-5">
                                {[
                                    { name: 'Last Date for Extra Services', date: '15 Aug 2026', time: '', icon: Calendar },
                                    { name: 'Stall Setup Date', date: '19 Aug 2026', time: '', icon: Calendar },
                                    { name: 'Decoration Completion', date: '20 Aug 2026', time: 'By 06:00 PM', icon: Calendar },
                                    { name: 'Stall Dismantling', date: '23 Aug 2026', time: 'After 06:00 PM', icon: Calendar },
                                ].map((dl, i) => (
                                    <div key={i} className="flex items-start gap-3.5">
                                        <div className="w-9 h-9 rounded-full bg-blue-50/80 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                                            <dl.icon size={16} strokeWidth={2} />
                                        </div>
                                        <div className="flex-1 pb-4 border-b border-slate-100 last:border-0 last:pb-0 pt-0.5">
                                            <p className="text-[12px] font-semibold text-slate-600 mb-0.5">{dl.name}</p>
                                            <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-0.5">
                                                <p className="text-[14px] font-bold text-slate-800">{dl.date}</p>
                                                {dl.time && <p className="text-[10px] text-slate-500 font-bold">{dl.time}</p>}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Stall Overview & Documents) */}
                    <div className="lg:col-span-4 space-y-4 md:space-y-6">
                        {/* Stall Overview */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
                            <h3 className="text-base font-bold text-slate-800 mb-4">Stall Overview</h3>
                            <div className="space-y-2">
                                {[
                                    { label: 'Hall Number', value: 'Hall 3', icon: Map },
                                    { label: 'Stall Number', value: 'B12', icon: MapPin },
                                    { label: 'Stall Size', value: '6m X 6m (36 sqm)', icon: Maximize },
                                    { label: 'Stall Type', value: 'Premium Corner', icon: Grid },
                                    { label: 'Open Side', value: '2 Sides', icon: Layers },
                                    { label: 'Power Allocation', value: '5 KW', icon: Zap },
                                    { label: 'Floor', value: 'Ground Floor', icon: Layers },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between py-1.5 border-b border-slate-50 last:border-0">
                                        <div className="flex items-center gap-2.5 text-slate-600">
                                            <item.icon size={14} className="text-slate-400" strokeWidth={2} />
                                            <span className="text-[13px] font-semibold">{item.label}</span>
                                        </div>
                                        <span className="text-[13px] font-bold text-slate-800">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                            <Button variant="outline" className="w-full mt-5 bg-blue-50/50 border-blue-100 text-[#0052cc] hover:bg-blue-100 hover:text-[#003d99] font-bold text-[13px] h-10 flex justify-between px-4 transition-colors">
                                <div className="flex items-center gap-2">
                                    <Headset size={16} />
                                    Request Changes / Assistance
                                </div>
                                <ChevronRight size={16} />
                            </Button>
                        </div>

                        {/* Useful Documents */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
                            <h3 className="text-base font-bold text-slate-800 mb-3">Useful Documents</h3>
                            <div className="space-y-1">
                                {[
                                    { name: 'Booth Guidelines' },
                                    { name: 'Technical Manual' },
                                    { name: 'Electrical Guidelines' },
                                    { name: 'Exhibitor Manual' },
                                ].map((doc, i) => (
                                    <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                                        <div className="flex items-center gap-2.5 text-slate-700">
                                            <FileText size={16} className="text-blue-500" strokeWidth={1.5} />
                                            <span className="text-[13px] font-bold">{doc.name}</span>
                                        </div>
                                        <button className="flex items-center gap-1.5 text-[10px] font-extrabold text-[#0052cc] bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md transition-colors border border-blue-100 tracking-wide uppercase">
                                            <Download size={12} strokeWidth={2.5} />
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
