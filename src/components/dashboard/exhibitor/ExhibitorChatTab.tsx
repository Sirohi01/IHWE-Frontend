import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Send, MessageSquare, Loader2, Check, CheckCheck,
  Phone, Mail, PhoneCall, Filter, MessageCircle,
  Paperclip, Smile, MoreVertical, ArrowRight,
  PhoneIncoming, PhoneOutgoing, Calendar, BadgeCheck,
  Clock, X,
} from "lucide-react";
import { io, Socket } from "socket.io-client";
import { API_URL, SERVER_URL } from "@/lib/api";
import exhibitorContactImg from "@/assets/exhibitorcontact.png";
import chatSupportImg from "@/assets/chatsupport1.png";

interface Props {
  data: any;
  inNavbar?: boolean;
}

type HistoryFilter = "All" | "Chat" | "Email" | "Call";

/* ─── Helpers ────────────────────────────────────────────────────────────── */
function timeStr(d: string) {
  return new Date(d).toLocaleTimeString("en-IN", {
    hour: "2-digit", minute: "2-digit", hour12: true,
  });
}

function friendlyDate(d: string | Date) {
  const date = new Date(d);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const pad = (n: number) => n.toString().padStart(2, "0");
  const dd = pad(date.getDate());
  const mmm = date.toLocaleString("en-IN", { month: "short" });
  const yyyy = date.getFullYear();
  if (date.toDateString() === today.toDateString())
    return `Today, ${dd} ${mmm} ${yyyy}`;
  if (date.toDateString() === yesterday.toDateString())
    return `Yesterday, ${dd} ${mmm} ${yyyy}`;
  return `${dd} ${mmm} ${yyyy}`;
}

function Ticks({ msg }: { msg: any }) {
  if (msg.senderType !== "exhibitor") return null;
  return msg.readByAdmin
    ? <CheckCheck size={11} className="text-blue-400 inline ml-1 flex-shrink-0" />
    : <Check size={11} className="text-slate-300 inline ml-1 flex-shrink-0" />;
}

function WhatsAppIcon({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function HistoryIcon({ type, callType }: { type: string; callType?: string }) {
  if (type === "Chat")
    return (
      <div className="w-9 h-9 rounded-full bg-[#23471d]/10 flex items-center justify-center flex-shrink-0">
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#23471d]"
        >
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
          <path d="M8 12h.01" strokeWidth="3.2" />
          <path d="M12 12h.01" strokeWidth="3.2" />
          <path d="M16 12h.01" strokeWidth="3.2" />
        </svg>
      </div>
    );
  if (type === "Email")
    return (
      <div className="w-9 h-9 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
        <Mail size={15} className="text-violet-600" />
      </div>
    );
  return (
    <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
      {callType === "incoming"
        ? <PhoneIncoming size={15} className="text-orange-500" />
        : <PhoneOutgoing size={15} className="text-orange-500" />}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */
export default function ExhibitorChatTab({ data, inNavbar = false }: Props) {
  const navigate = useNavigate();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [chatLoading, setChatLoading] = useState(true);
  const [adminTyping, setAdminTyping] = useState(false);
  const [adminOnline, setAdminOnline] = useState(false);
  const [connected, setConnected] = useState(false);
  const [historyFilter, setHistoryFilter] = useState<HistoryFilter>("All");
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [isHistoryPopupOpen, setIsHistoryPopupOpen] = useState(false);

  const [rmDetails, setRmDetails] = useState<any>(null);
  const [rmLoading, setRmLoading] = useState(true);

  const bottomRef = useRef<HTMLDivElement>(null);
  const typingTimer = useRef<any>(null);
  const token = localStorage.getItem("exhibitorToken") || "";

  const roomId = data?._id?.toString() || "";
  const exhibitorId = data?._id?.toString() || "";
  const exhibitorName = data?.exhibitorName || "Exhibitor";

  const rmUsername = data?.filledBy && data.filledBy !== "User" ? data.filledBy : null;
  const rmDisplayName = rmDetails?.fullName || data?.spokenWith || data?.filledBy || "Support Team";
  const rmDesignation = rmDetails?.designation || "Support Executive";
  const rmEmail = rmDetails?.email || "";
  const rmMobile = rmDetails?.mobile || "";
  const rmAltMobile = rmDetails?.altMobile || "";

  const initials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  /* ── Fetch RM details ── */
  useEffect(() => {
    if (!rmUsername) { setRmLoading(false); return; }
    fetch(`${API_URL}/admin/by-username/${encodeURIComponent(rmUsername)}`)
      .then((r) => r.json())
      .then((res) => { if (res.success && res.data) setRmDetails(res.data); })
      .catch(() => { })
      .finally(() => setRmLoading(false));
  }, [rmUsername]);

  /* ── Load chat history ── */
  useEffect(() => {
    if (!roomId) { setChatLoading(false); return; }
    setChatLoading(true);
    fetch(`${API_URL}/chat/messages/${roomId}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((res) => { if (res.success) setMessages(res.data); })
      .catch(() => { })
      .finally(() => setChatLoading(false));
  }, [roomId]);

  /* ── Socket ── */
  useEffect(() => {
    if (!roomId) return;
    const s = io(SERVER_URL, { transports: ["websocket", "polling"] });
    s.on("connect", () => {
      setConnected(true);
      s.emit("join_room", { roomId, userId: exhibitorId, userType: "exhibitor", userName: exhibitorName });
      s.emit("mark_read", { roomId, readerType: "exhibitor" });
    });
    s.on("disconnect", () => { setConnected(false); setAdminOnline(false); });
    s.on("receive_message", (msg: any) => {
      setMessages((prev) => prev.find((m) => m._id === msg._id) ? prev : [...prev, msg]);
      if (msg.senderType === "admin") s.emit("mark_read", { roomId, readerType: "exhibitor" });
    });
    s.on("messages_seen", ({ seenBy }: any) => {
      if (seenBy === "admin")
        setMessages((prev) => prev.map((m) => m.senderType === "exhibitor" ? { ...m, readByAdmin: true } : m));
    });
    s.on("typing", ({ senderType }: any) => { if (senderType === "admin") setAdminTyping(true); });
    s.on("stop_typing", () => setAdminTyping(false));
    s.on("user_status", ({ userType, online }: any) => { if (userType === "admin") setAdminOnline(online); });
    setSocket(s);
    return () => { s.disconnect(); };
  }, [roomId]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, adminTyping]);

  const sendMessage = () => {
    if (!input.trim() || !socket || !roomId) return;
    socket.emit("send_message", {
      roomId, exhibitorRegistrationId: exhibitorId, exhibitorName,
      senderType: "exhibitor", senderId: exhibitorId, senderName: exhibitorName,
      message: input.trim(),
    });
    setInput("");
    socket.emit("stop_typing", { roomId });
  };

  const handleTyping = (val: string) => {
    setInput(val);
    if (!socket || !roomId) return;
    socket.emit("typing", { roomId, senderType: "exhibitor", senderName: exhibitorName });
    clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(() => socket?.emit("stop_typing", { roomId }), 1500);
  };

  const openWhatsApp = (phone: string) => {
    const clean = phone.replace(/\D/g, "");
    const personName = `${data?.contact1?.firstName || ""} ${data?.contact1?.lastName || ""}`.trim() || "Exhibitor";
    const msg = `Hi, I am ${personName} from ${data?.exhibitorName || ""}. My Exhibitor ID is ${data?.registrationId || "—"}. I have a query regarding IHWE 2026: `;
    window.open(`https://wa.me/${clean.startsWith("91") ? clean : "91" + clean}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  /* ── Group messages by date ── */
  type MsgGroup = { label: string; msgs: any[] };
  const messageGroups: MsgGroup[] = [];
  messages.forEach((msg) => {
    const label = friendlyDate(msg.createdAt);
    const last = messageGroups[messageGroups.length - 1];
    if (!last || last.label !== label) messageGroups.push({ label, msgs: [msg] });
    else last.msgs.push(msg);
  });

  /* ── Build history from real messages ── */
  type HistItem = { id: string; type: HistoryFilter; time: string; title: string; desc: string; date: string; callType?: string; };
  let chatHistory: HistItem[] = messages.map((msg) => ({
    id: msg._id,
    type: "Chat",
    time: timeStr(msg.createdAt),
    title: "Chat",
    desc: msg.senderType === "exhibitor" ? `You: ${msg.message}` : `${rmDisplayName}: ${msg.message}`,
    date: friendlyDate(msg.createdAt),
  }));

  // Fallback mock chats if no real messages exist in database
  if (chatHistory.length === 0) {
    const todayLabel = friendlyDate(new Date());
    chatHistory = [
      {
        id: "h-chat-1",
        type: "Chat",
        time: "10:32 AM",
        title: "Chat",
        desc: "You: Hi, I need help with additional visitor passes.",
        date: todayLabel,
      },
      {
        id: "h-chat-2",
        type: "Chat",
        time: "10:30 AM",
        title: "Chat",
        desc: `${rmDisplayName}: Hello! Welcome to IHWE Support.`,
        date: todayLabel,
      },
    ];
  }


  const hardcodedHistory: HistItem[] = [
    {
      id: "h-email-1",
      type: "Email",
      time: "04:21 PM",
      title: "Email",
      desc: "Support Team: Re: Stall setup guidelines (Attachment)",
      date: "19 May 2026",
    },
    {
      id: "h-email-2",
      type: "Email",
      time: "04:18 PM",
      title: "Email",
      desc: "You: Requested information about stall setup guidelines.",
      date: "19 May 2026",
    },
    {
      id: "h-call-1",
      type: "Call",
      time: "03:15 PM",
      title: "Call",
      desc: "Outgoing Call • Duration: 04:32 min",
      date: "18 May 2026",
      callType: "outgoing",
    },
    {
      id: "h-call-2",
      type: "Call",
      time: "03:10 PM",
      title: "Call",
      desc: "Incoming Call • Duration: 06:15 min",
      date: "18 May 2026",
      callType: "incoming",
    },
  ];

  const combinedHistory = [...chatHistory, ...hardcodedHistory];
  const filteredHistory = historyFilter === "All"
    ? combinedHistory
    : combinedHistory.filter((h) => h.type === historyFilter);

  type HistGroup = { date: string; items: HistItem[] };
  
  const historyGroups: HistGroup[] = [];
  filteredHistory.slice(0, 10).forEach((item) => {
    const last = historyGroups[historyGroups.length - 1];
    if (!last || last.date !== item.date) historyGroups.push({ date: item.date, items: [item] });
    else last.items.push(item);
  });

  const fullHistoryGroups: HistGroup[] = [];
  filteredHistory.forEach((item) => {
    const last = fullHistoryGroups[fullHistoryGroups.length - 1];
    if (!last || last.date !== item.date) fullHistoryGroups.push({ date: item.date, items: [item] });
    else last.items.push(item);
  });


  const hour = new Date().getHours();
  const isWorkingHours = hour >= 9 && hour < 19;

  /* ═══════════════════════════════════════════════════════════════════════
     RENDER
  ═══════════════════════════════════════════════════════════════════════ */
  return (
    <motion.div
      key="chat-support-v3"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex flex-row gap-2 flex-1 min-h-0 w-full"
    >
      {/* ── LEFT CONTAINER: Hero Banner + Channel Cards + Agent/Chat Columns ── */}
      <div className="flex-1 min-h-0 flex flex-col gap-1.5">
        {/* HERO BANNER — Direct Static Image */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex-shrink-0">
          <img
            src={chatSupportImg}
            alt="Chat Support"
            className="w-full h-auto block"
          />
        </div>


        {/* 3 CHANNEL CARDS */}
        <div className="grid grid-cols-3 gap-1.5 flex-shrink-0">
          {/* Live Chat */}
          <div className="bg-[#f0faf2] rounded-2xl border border-[#e4f6e8] shadow-sm py-2.5 px-3.5 flex flex-col gap-2 hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#108c2d] flex items-center justify-center flex-shrink-0 shadow-sm">
                  <svg
                    viewBox="0 0 24 24"
                    width="19"
                    height="19"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                    <path d="M8 12h.01" strokeWidth="3.2" />
                    <path d="M12 12h.01" strokeWidth="3.2" />
                    <path d="M16 12h.01" strokeWidth="3.2" />
                  </svg>
                </div>
                <div>
                  <p className="text-[12px] font-black text-slate-800 leading-tight">Live Chat</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Instant support in real-time</p>
                </div>
              </div>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border flex-shrink-0 ${isWorkingHours ? "bg-[#e2f5e9] text-[#108c2d] border-[#d2edd9]" : "bg-slate-100 text-slate-400 border-slate-200"}`}>
                {isWorkingHours ? "Online" : "Offline"}
              </span>
            </div>
            <button
              onClick={() => document.getElementById("chat-input-field")?.focus()}
              className="w-full h-8 rounded-full bg-white hover:bg-slate-50 text-[#108c2d] text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md transition-all duration-200"
            >
              Chat Now <ArrowRight size={12} className="text-[#108c2d]" />
            </button>
          </div>

          {/* Email Support */}
          <div className="bg-[#f4f2ff] rounded-2xl border border-[#e8e4ff] shadow-sm py-2.5 px-3.5 flex flex-col gap-2 hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#635bff] flex items-center justify-center flex-shrink-0 shadow-sm">
                <Mail size={15} className="text-white" />
              </div>
              <div>
                <p className="text-[12px] font-black text-slate-800 leading-tight">Email Support</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Get response via email</p>
              </div>
            </div>
            <button
              onClick={() => window.open(`mailto:${rmEmail || "info@ihweexpo.com"}`, "_blank")}
              className="w-full h-8 rounded-full bg-white hover:bg-slate-50 text-[#635bff] text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md transition-all duration-200"
            >
              Send Email <ArrowRight size={12} className="text-[#635bff]" />
            </button>
          </div>

          {/* Call Support */}
          <div className="bg-[#fff8f0] rounded-2xl border border-[#ffe8d4] shadow-sm py-2.5 px-3.5 flex flex-col gap-2 hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#f97316] flex items-center justify-center flex-shrink-0 shadow-sm">
                <PhoneCall size={15} className="text-white" />
              </div>
              <div>
                <p className="text-[12px] font-black text-slate-800 leading-tight">Call Support</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Talk to our support team</p>
              </div>
            </div>
            <button
              onClick={() => navigate("/exhibitor-dashboard/relationship-manager")}
              className="w-full h-8 rounded-full bg-white hover:bg-slate-50 text-[#ea580c] text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md transition-all duration-200"
            >
              Call Now <ArrowRight size={12} className="text-[#ea580c]" />
            </button>
          </div>
        </div>


        {/* 2-COLUMN PROFILE + CHAT SUB-GRID */}
        <div
          className="grid gap-1.5 flex-1 min-h-0"
          style={{
            gridTemplateColumns: "260px 1fr",
          }}
        >



          {/* LEFT: Agent Profile + Contact + Call Back (Unified Card) */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between p-4 h-full min-w-0 overflow-hidden">
            <div className="flex flex-col gap-4">
              {/* Profile photo + name */}
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md bg-slate-100">
                    <img
                      src={rmDetails?.profileImage || rmDetails?.hodImage || exhibitorContactImg}
                      alt={rmDisplayName}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${adminOnline ? "bg-emerald-400" : "bg-slate-300"}`} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <p className="text-[13px] font-black text-slate-800 leading-tight truncate">
                      {rmLoading ? "Loading..." : rmDisplayName}
                    </p>
                    {!rmLoading && <BadgeCheck size={13} className="text-blue-500 flex-shrink-0" />}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 truncate">{rmDesignation}</p>
                  <span className={`inline-flex mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${adminOnline ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-slate-100 text-slate-500 border-slate-200"}`}>
                    {adminOnline ? "Online" : "Offline"}
                  </span>
                </div>
              </div>

              {/* Contact Details */}
              <div className="flex flex-col gap-2.5">
                <p className="text-[10px] font-black text-slate-600 uppercase tracking-wider">
                  Contact Details
                </p>
                {/* Email */}
                {rmEmail ? (
                  <a href={`mailto:${rmEmail}`} className="flex items-start gap-2 group">
                    <div className="w-5 h-5 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Mail size={11} className="text-[#23471d]" />
                    </div>
                    <span className="text-[11px] text-slate-600 break-all leading-tight group-hover:text-[#23471d] transition-colors">
                      {rmEmail}
                    </span>
                  </a>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center flex-shrink-0">
                      <Mail size={11} className="text-slate-300" />
                    </div>
                    <span className="text-[11px] text-slate-300 italic">Not assigned</span>
                  </div>
                )}
                {/* Phone */}
                {rmMobile ? (
                  <a href={`tel:${rmMobile}`} className="flex items-center gap-2 group">
                    <div className="w-5 h-5 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center flex-shrink-0">
                      <Phone size={11} className="text-[#23471d]" />
                    </div>
                    <span className="text-[12px] text-slate-600 font-medium group-hover:text-[#23471d] transition-colors">
                      {rmMobile}
                    </span>
                  </a>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center flex-shrink-0">
                      <Phone size={11} className="text-slate-300" />
                    </div>
                    <span className="text-[11px] text-slate-300 italic">Not assigned</span>
                  </div>
                )}
                {/* WhatsApp */}
                {rmMobile ? (
                  <button onClick={() => openWhatsApp(rmAltMobile || rmMobile)} className="flex items-center gap-2 group w-full text-left">
                    <div className="w-5 h-5 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center flex-shrink-0">
                      <WhatsAppIcon size={11} className="text-[#23471d]" />
                    </div>
                    <span className="text-[12px] text-slate-600 font-medium group-hover:text-[#23471d] transition-colors">
                      {rmAltMobile || rmMobile}
                    </span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center flex-shrink-0">
                      <WhatsAppIcon size={11} className="text-slate-300" />
                    </div>
                    <span className="text-[11px] text-slate-300 italic">Not assigned</span>
                  </div>
                )}
              </div>
            </div>

            {/* Request Call Back */}
            <button
              onClick={() => window.open(`tel:${rmMobile || "+919654900525"}`, "_self")}
              className="w-full h-9 rounded-full border-2 border-[#23471d] text-[#23471d] text-[12px] font-bold flex items-center justify-center gap-2 hover:bg-[#23471d] hover:text-white transition-all duration-200"
            >
              <PhoneCall size={13} />
              Request Call Back
            </button>
          </div>

          {/* CENTRE: Live Chat Window */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden min-w-0">
            {/* Top bar */}
            <div className="px-4 py-2.5 border-b border-slate-100 flex items-center justify-between flex-shrink-0 bg-white">
              <div className="w-12" /> {/* Spacer to align date in center */}
              <div className="flex items-center gap-1.5 justify-center">
                <Calendar size={13} className="text-slate-700" />
                <span className="text-[12px] text-slate-800 font-black tracking-tight">
                  Today, 20 May 2026
                </span>
              </div>
              <div className="relative flex items-center gap-2">
                <button
                  onClick={() => setShowMoreMenu((v) => !v)}
                  className="flex items-center gap-1 text-slate-600 hover:text-slate-900 transition-all font-bold text-[12px]"
                >
                  More
                  <MoreVertical size={14} className="text-slate-700" />
                </button>
                <AnimatePresence>
                  {showMoreMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -4, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.95 }}
                      className="absolute right-0 top-8 w-40 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-50"
                    >
                      {rmEmail && (
                        <a href={`mailto:${rmEmail}`} className="flex items-center gap-2 px-3 py-2 text-[12px] text-slate-600 hover:bg-slate-50" onClick={() => setShowMoreMenu(false)}>
                          <Mail size={12} /> Email RM
                        </a>
                      )}
                      {rmMobile && (
                        <a href={`tel:${rmMobile}`} className="flex items-center gap-2 px-3 py-2 text-[12px] text-slate-600 hover:bg-slate-50" onClick={() => setShowMoreMenu(false)}>
                          <Phone size={12} /> Call RM
                        </a>
                      )}
                      {rmMobile && (
                        <button onClick={() => { openWhatsApp(rmMobile); setShowMoreMenu(false); }} className="flex items-center gap-2 px-3 py-2 text-[12px] text-slate-600 hover:bg-slate-50 w-full text-left">
                          <WhatsAppIcon size={12} /> WhatsApp
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto px-4 py-3 bg-slate-50/50 custom-scrollbar">
              {chatLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin text-[#23471d]" />
                </div>
              ) : (
                (() => {
                  const displayMessages = messages.length > 0 ? messages : [
                    {
                      _id: "m-fallback-1",
                      senderType: "admin",
                      senderName: rmDisplayName,
                      message: "Hello! 👋 Welcome to IHWE Support. How can I help you today?",
                      createdAt: new Date(new Date().setHours(10, 30, 0, 0)).toISOString(),
                      readByAdmin: true,
                    },
                    {
                      _id: "m-fallback-2",
                      senderType: "exhibitor",
                      senderName: exhibitorName,
                      message: "Hi, I need help with additional visitor passes. How can I purchase them?",
                      createdAt: new Date(new Date().setHours(10, 32, 0, 0)).toISOString(),
                      readByAdmin: true,
                    },
                    {
                      _id: "m-fallback-3",
                      senderType: "admin",
                      senderName: rmDisplayName,
                      message: "Sure, I can help you with that. You can purchase additional visitor passes from the 'Passes & Entitlements' section. Would you like me to guide you?",
                      createdAt: new Date(new Date().setHours(10, 33, 0, 0)).toISOString(),
                      readByAdmin: true,
                    },
                    {
                      _id: "m-fallback-4",
                      senderType: "exhibitor",
                      senderName: exhibitorName,
                      message: "Yes, please guide me.",
                      createdAt: new Date(new Date().setHours(10, 34, 0, 0)).toISOString(),
                      readByAdmin: true,
                    },
                  ];

                  // Group messages by date
                  type DisplayMsgGroup = { label: string; msgs: any[] };
                  const displayGroups: DisplayMsgGroup[] = [];
                  displayMessages.forEach((msg) => {
                    const label = friendlyDate(msg.createdAt);
                    const last = displayGroups[displayGroups.length - 1];
                    if (!last || last.label !== label) displayGroups.push({ label, msgs: [msg] });
                    else last.msgs.push(msg);
                  });

                  return displayGroups.map((group, gi) => (
                    <div key={gi}>
                      {group.msgs.map((msg: any, i: number) => {
                        const isMe = msg.senderType === "exhibitor";
                        return (
                          <div key={msg._id || i} className={`flex mb-3 ${isMe ? "justify-end" : "justify-start"}`}>
                            {!isMe && (
                              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mr-2 mt-1 shadow-sm border border-slate-100 bg-[#e6f4ea] flex items-center justify-center">
                                <img src={rmDetails?.profileImage || rmDetails?.hodImage || exhibitorContactImg} alt="RM" className="w-full h-full object-cover object-top" />
                              </div>
                            )}
                            <div className={`max-w-[75%] flex flex-col gap-0.5 ${isMe ? "items-end" : "items-start"}`}>
                              {isMe ? (
                                <div className="bg-[#e2f5e9] border border-[#d2edd9] text-slate-800 rounded-2xl rounded-tr-sm px-3.5 py-2 shadow-sm flex flex-col gap-1">
                                  <span className="text-[13px] leading-relaxed font-semibold text-slate-800">{msg.message}</span>
                                  <div className="flex items-center gap-1 self-end mt-0.5">
                                    <span className="text-[10px] text-slate-500 font-medium">{timeStr(msg.createdAt)}</span>
                                    <CheckCheck size={13} className="text-[#108c2d] flex-shrink-0" />
                                  </div>
                                </div>
                              ) : (
                                <div className="bg-white text-slate-800 border border-slate-150 rounded-2xl rounded-tl-sm px-3.5 py-2.5 shadow-sm flex flex-col gap-1">
                                  <span className="text-[13px] leading-relaxed font-semibold text-slate-800">{msg.message}</span>
                                  <span className="text-[10px] text-slate-400 self-start mt-0.5">{timeStr(msg.createdAt)}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ));
                })()
              )}

              {/* Typing indicator */}
              <AnimatePresence>
                {(adminTyping || messages.length === 0) && (
                  <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex justify-start items-end gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-slate-100 bg-[#e6f4ea] flex items-center justify-center shadow-sm">
                      <img src={rmDetails?.profileImage || rmDetails?.hodImage || exhibitorContactImg} alt="RM" className="w-full h-full object-cover object-top" />
                    </div>
                    <div className="bg-white border border-slate-150 shadow-sm px-4 py-3 rounded-2xl rounded-bl-sm flex items-center justify-center">
                      <div className="flex gap-1 items-center">
                        {[0, 1, 2].map((i) => (
                          <div key={i} className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={bottomRef} />
            </div>

            {/* Input bar */}
            <div className="px-4 py-3 border-t border-slate-100 bg-white flex-shrink-0">
              <div className="flex items-center gap-2 border border-slate-200 bg-white rounded-2xl px-3 py-1.5 shadow-sm">
                <button className="text-slate-500 hover:text-slate-800 transition-colors flex-shrink-0 p-1">
                  <Paperclip size={18} />
                </button>
                <input
                  id="chat-input-field"
                  value={input}
                  onChange={(e) => handleTyping(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendMessage())}
                  placeholder="Type your message..."
                  className="flex-1 text-[13px] outline-none bg-transparent placeholder:text-slate-400 py-1"
                />
                <button className="text-slate-500 hover:text-slate-800 transition-colors flex-shrink-0 p-1 mr-1">
                  <Smile size={18} />
                </button>
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() && messages.length > 0}
                  className="w-10 h-10 bg-[#0e7f22] text-white rounded-2xl flex items-center justify-center hover:bg-[#0b651b] transition-all flex-shrink-0 shadow-md shadow-[#0e7f22]/20"
                >
                  <Send size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT COLUMN: Communication History (Full Height) ── */}
      <div className="w-[340px] flex-shrink-0 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden h-full">

        {/* Header */}
        <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between flex-shrink-0">
          <p className="text-[14px] font-black text-slate-800 tracking-tight">Communication History</p>
          <button className="flex items-center gap-1 border border-slate-200 bg-white shadow-sm px-2.5 py-1 rounded-full text-[11px] font-black text-slate-700 hover:bg-slate-50 transition-all">
            <Filter size={12} className="text-slate-600" />
            Filter
          </button>
        </div>

        {/* Filter tabs */}
        <div className="px-3.5 py-2 flex-shrink-0">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-1 flex w-full justify-between items-center shadow-sm">
            {(["All", "Chat", "Email", "Call"] as HistoryFilter[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setHistoryFilter(tab)}
                className={`flex-1 text-center py-1.5 rounded-xl text-[11px] font-bold transition-all ${historyFilter === tab
                  ? "bg-[#0e7f22] text-white shadow-md font-black"
                  : "text-slate-600 hover:text-slate-900"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* History list */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {chatLoading ? (
            <div className="flex justify-center py-10">
              <Loader2 size={20} className="animate-spin text-[#23471d]" />
            </div>
          ) : filteredHistory.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-10 text-center px-4">
              <MessageSquare size={28} className="text-slate-200 mb-2" />
              <p className="text-[11px] text-slate-400">No conversations yet</p>
            </div>
          ) : (
            historyGroups.map((group, gi) => (
              <div key={gi} className="mb-2">
                {/* Date Divider Badge */}
                <div className="px-4 py-1.5 flex">
                  <span className="text-[10px] text-[#108c2d] font-bold bg-[#e6f4ea] px-3 py-0.5 rounded-full">
                    {group.date}
                  </span>
                </div>

                {/* Items List */}
                <div className="flex flex-col">
                  {group.items.map((item) => {
                    const isCall = item.type === "Call";
                    const isEmail = item.type === "Email";
                    const isChat = item.type === "Chat";

                    return (
                      <div
                        key={item.id}
                        className="px-4 py-2 hover:bg-slate-50/50 transition-all cursor-pointer flex items-center gap-2.5"
                      >
                        {/* 1. Left metadata: Left Circle Icon + Time */}
                        <div className="flex items-center gap-2 w-24 flex-shrink-0">
                          {/* Circle Icon */}
                          {isChat && (
                            <div className="w-8 h-8 rounded-full bg-[#e6f7ec] flex items-center justify-center flex-shrink-0 shadow-sm">
                              <svg
                                viewBox="0 0 24 24"
                                width="15"
                                height="15"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-[#108c2d]"
                              >
                                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                                <path d="M8 12h.01" strokeWidth="3.2" />
                                <path d="M12 12h.01" strokeWidth="3.2" />
                                <path d="M16 12h.01" strokeWidth="3.2" />
                              </svg>
                            </div>
                          )}
                          {isEmail && (
                            <div className="w-8 h-8 rounded-full bg-[#e8f0fe] flex items-center justify-center flex-shrink-0 shadow-sm">
                              <Mail size={14} className="text-[#1a73e8]" />
                            </div>
                          )}
                          {isCall && (
                            <div className="w-8 h-8 rounded-full bg-[#e6f7ec] flex items-center justify-center flex-shrink-0 shadow-sm">
                              <Phone size={14} className="text-[#108c2d]" />
                            </div>
                          )}

                          {/* Time */}
                          <span className="text-[11px] text-slate-500 font-bold whitespace-nowrap">
                            {item.time}
                          </span>
                        </div>

                        {/* 2. Middle Orange Call Icon (Only for Call history) */}
                        {isCall && (
                          <div className="w-8 h-8 rounded-full bg-[#fff8f0] flex items-center justify-center flex-shrink-0 shadow-sm border border-[#ffe8d4]">
                            <PhoneCall size={14} className="text-[#f97316]" />
                          </div>
                        )}

                        {/* 3. Details: Title + Description */}
                        <div className="flex-1 min-w-0">
                          <p className="text-[12px] font-black text-slate-800 leading-tight">
                            {item.title}
                          </p>
                          <p className="text-[10.5px] text-slate-500 mt-0.5 truncate leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-white flex-shrink-0 border-t border-slate-100">
          <button onClick={() => setIsHistoryPopupOpen(true)} className="w-full h-10 border border-slate-200 bg-white hover:bg-slate-50 transition-all rounded-2xl flex items-center justify-center gap-1.5 text-[#108c2d] text-[12px] font-black shadow-sm">
            View All Conversations <ArrowRight size={13} className="text-[#108c2d]" />
          </button>
        </div>
      </div>

      {/* Pop-up for All Conversations */}
      <AnimatePresence>
        {isHistoryPopupOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-[450px] h-[85vh] bg-[#f8fafc] rounded-2xl shadow-2xl flex flex-col overflow-hidden font-inter border border-slate-200"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsHistoryPopupOpen(false)}
                className="absolute top-3.5 right-3.5 z-10 w-7 h-7 flex items-center justify-center bg-black/10 text-slate-800 rounded-full hover:bg-red-500 hover:text-white shadow-sm transition-colors"
              >
                <X size={14} strokeWidth={3} />
              </button>

              {/* Header */}
              <div className="px-5 py-4 bg-white border-b border-slate-100 flex items-center justify-between flex-shrink-0">
                <p className="text-[16px] font-black text-slate-800 tracking-tight">All Conversations</p>
              </div>

              {/* History list inside Popup */}
              <div className="flex-1 overflow-y-auto custom-scrollbar px-2 py-4">
                {fullHistoryGroups.map((group, gi) => (
                  <div key={gi} className="mb-3 bg-white border border-slate-200/60 rounded-xl overflow-hidden shadow-sm mx-2">
                    {/* Date Divider Badge */}
                    <div className="px-4 py-2 border-b border-slate-100 bg-slate-50">
                      <span className="text-[11px] text-slate-700 font-bold uppercase tracking-wide">
                        {group.date}
                      </span>
                    </div>

                    {/* Items List */}
                    <div className="flex flex-col">
                      {group.items.map((item, ii) => {
                        const isCall = item.type === "Call";
                        const isEmail = item.type === "Email";
                        const isChat = item.type === "Chat";
                        const isLast = ii === group.items.length - 1;

                        return (
                          <div
                            key={item.id}
                            className={`px-4 py-3 hover:bg-slate-50/50 transition-all cursor-pointer flex items-start gap-3 ${!isLast ? "border-b border-slate-100" : ""}`}
                          >
                            {/* Left Circle Icon */}
                            <div className="flex-shrink-0 mt-0.5">
                              {isChat && (
                                <div className="w-9 h-9 rounded-full bg-[#e6f7ec] flex items-center justify-center flex-shrink-0 shadow-sm">
                                  <svg
                                    viewBox="0 0 24 24"
                                    width="16"
                                    height="16"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-[#108c2d]"
                                  >
                                    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                                    <path d="M8 12h.01" strokeWidth="3.2" />
                                    <path d="M12 12h.01" strokeWidth="3.2" />
                                    <path d="M16 12h.01" strokeWidth="3.2" />
                                  </svg>
                                </div>
                              )}
                              {isEmail && (
                                <div className="w-9 h-9 rounded-full bg-[#e8f0fe] flex items-center justify-center flex-shrink-0 shadow-sm">
                                  <Mail size={15} className="text-[#1a73e8]" />
                                </div>
                              )}
                              {isCall && (
                                <div className="w-9 h-9 rounded-full bg-[#fff8f0] flex items-center justify-center flex-shrink-0 shadow-sm">
                                  <PhoneCall size={15} className="text-[#f97316]" />
                                </div>
                              )}
                            </div>

                            {/* Details: Title + Description */}
                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                              <div className="flex items-center justify-between mb-1">
                                <p className="text-[13px] font-black text-slate-800 leading-tight">
                                  {item.title}
                                </p>
                                <span className="text-[11px] text-slate-400 font-semibold whitespace-nowrap ml-2">
                                  {item.time}
                                </span>
                              </div>
                              <p className="text-[11.5px] text-slate-600 leading-snug">
                                {item.desc}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
