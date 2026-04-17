import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Send, MessageSquare, Loader2, Check, CheckCheck } from "lucide-react";
import { io, Socket } from "socket.io-client";
import { API_URL, SERVER_URL } from "@/lib/api";

interface Props { data: any; }

function timeStr(d: string) {
    return new Date(d).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
}

function Ticks({ msg }: { msg: any }) {
    if (msg.senderType !== "exhibitor") return null;
    return msg.readByAdmin
        ? <CheckCheck size={11} className="text-blue-400 inline ml-1" />
        : <Check size={11} className="text-slate-300 inline ml-1" />;
}

export default function ExhibitorChatTab({ data }: Props) {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(true);
    const [adminTyping, setAdminTyping] = useState(false);
    const [adminOnline, setAdminOnline] = useState(false);
    const [connected, setConnected] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);
    const typingTimer = useRef<any>(null);
    const token = localStorage.getItem("exhibitorToken") || "";

    const roomId = data?._id?.toString() || "";
    const exhibitorId = data?._id?.toString() || "";
    const exhibitorName = data?.exhibitorName || "Exhibitor";

    // Load history
    useEffect(() => {
        if (!roomId) return;
        setLoading(true);
        fetch(`${API_URL}/chat/messages/${roomId}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(r => r.json())
            .then(res => { if (res.success) setMessages(res.data); })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, [roomId]);

    // Socket
    useEffect(() => {
        if (!roomId) return;
        const s = io(SERVER_URL, { transports: ["websocket", "polling"] });

        s.on("connect", () => {
            setConnected(true);
            s.emit("join_room", { roomId, userId: exhibitorId, userType: "exhibitor", userName: exhibitorName });
            // Mark admin messages as read on open
            s.emit("mark_read", { roomId, readerType: "exhibitor" });
        });
        s.on("disconnect", () => { setConnected(false); setAdminOnline(false); });

        s.on("receive_message", (msg: any) => {
            setMessages(prev => prev.find(m => m._id === msg._id) ? prev : [...prev, msg]);
            // If admin sent it, mark as read immediately
            if (msg.senderType === "admin") {
                s.emit("mark_read", { roomId, readerType: "exhibitor" });
            }
        });

        s.on("messages_seen", ({ seenBy }: any) => {
            if (seenBy === "admin") {
                // Admin has seen our messages — update readByAdmin on all our sent messages
                setMessages(prev => prev.map(m => m.senderType === "exhibitor" ? { ...m, readByAdmin: true } : m));
            }
        });

        s.on("typing", ({ senderType }: any) => { if (senderType === "admin") setAdminTyping(true); });
        s.on("stop_typing", () => setAdminTyping(false));

        s.on("user_status", ({ userType, online }: any) => {
            if (userType === "admin") setAdminOnline(online);
        });

        setSocket(s);
        return () => { s.disconnect(); };
    }, [roomId]);

    useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, adminTyping]);

    const sendMessage = () => {
        if (!input.trim() || !socket || !roomId) return;
        socket.emit("send_message", {
            roomId, exhibitorRegistrationId: exhibitorId, exhibitorName,
            senderType: "exhibitor", senderId: exhibitorId, senderName: exhibitorName,
            message: input.trim()
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

    return (
        <motion.div key="chat" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="bg-white shadow-md overflow-hidden" style={{ height: "calc(100vh - 140px)", display: "flex", flexDirection: "column" }}>

                {/* Header */}
                <div className="px-5 py-3 bg-[#23471d] flex items-center justify-between flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-[12px] font-black text-white">RM</div>
                            <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[#23471d] ${adminOnline ? "bg-emerald-400" : "bg-slate-400"}`} />
                        </div>
                        <div>
                            <p className="text-[13px] font-black text-white">Support Team</p>
                            <p className="text-[10px] text-white/60">
                                {adminTyping ? <span className="text-emerald-300 font-bold">typing...</span>
                                    : adminOnline ? <span className="text-emerald-300">● Online</span>
                                        : "Offline"}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${connected ? "bg-emerald-400" : "bg-slate-400"}`} />
                        <span className="text-[9px] font-bold text-white uppercase">{connected ? "Connected" : "Connecting..."}</span>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2 bg-slate-50/30">
                    {loading ? (
                        <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-[#23471d]" /></div>
                    ) : messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                            <MessageSquare className="w-12 h-12 text-slate-200 mb-3" />
                            <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">No messages yet</p>
                            <p className="text-[11px] text-slate-300 mt-1">Send a message to your relationship manager</p>
                        </div>
                    ) : messages.map((msg: any, i: number) => {
                        const isMe = msg.senderType === "exhibitor";
                        const showTime = i === 0 || new Date(msg.createdAt).getTime() - new Date(messages[i - 1].createdAt).getTime() > 300000;
                        return (
                            <div key={msg._id || i}>
                                {showTime && (
                                    <div className="text-center my-2">
                                        <span className="text-[9px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{timeStr(msg.createdAt)}</span>
                                    </div>
                                )}
                                <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                                    {!isMe && (
                                        <div className="w-7 h-7 rounded-full bg-[#23471d]/10 flex items-center justify-center text-[9px] font-black text-[#23471d] flex-shrink-0 mr-2 mt-1">RM</div>
                                    )}
                                    <div className={`max-w-[72%] flex flex-col gap-0.5 ${isMe ? "items-end" : "items-start"}`}>
                                        <div className={`px-3.5 py-2.5 text-[13px] leading-relaxed shadow-sm ${isMe ? "bg-[#23471d] text-white rounded-2xl rounded-br-sm"
                                                : "bg-white text-slate-800 border border-slate-100 rounded-2xl rounded-bl-sm"
                                            }`}>
                                            {msg.message}
                                        </div>
                                        <div className="flex items-center gap-0.5 px-1">
                                            <span className="text-[9px] text-slate-400">{timeStr(msg.createdAt)}</span>
                                            <Ticks msg={msg} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {adminTyping && (
                        <div className="flex justify-start items-end gap-2">
                            <div className="w-7 h-7 rounded-full bg-[#23471d]/10 flex items-center justify-center text-[9px] font-black text-[#23471d] flex-shrink-0">RM</div>
                            <div className="bg-white border border-slate-100 shadow-sm px-4 py-3 rounded-2xl rounded-bl-sm">
                                <div className="flex gap-1 items-center">
                                    {[0, 1, 2].map(i => <div key={i} className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={bottomRef} />
                </div>

                {/* Input */}
                <div className="px-4 py-3 bg-white border-t border-gray-100 flex-shrink-0">
                    <div className="flex gap-2 items-center">
                        <input value={input} onChange={e => handleTyping(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendMessage())}
                            placeholder="Type your message..."
                            className="flex-1 h-11 px-4 border border-slate-200 rounded-full text-sm outline-none focus:border-[#23471d] bg-slate-50 focus:bg-white transition-colors" />
                        <button onClick={sendMessage} disabled={!input.trim() || !connected}
                            className="w-11 h-11 bg-[#23471d] text-white rounded-full flex items-center justify-center hover:bg-[#1a3516] disabled:opacity-40 transition-all flex-shrink-0">
                            <Send size={15} />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
