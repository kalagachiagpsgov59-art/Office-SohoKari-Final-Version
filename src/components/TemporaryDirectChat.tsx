import React, { useState, useEffect, useRef } from "react";
import { Profile } from "../types";
import { 
  X, Send, ShieldAlert, Clock, Loader2, User, Phone, CheckCircle, MessageSquare, AlertTriangle, Check, CheckCheck
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface TemporaryDirectChatProps {
  isOpen: boolean;
  onClose: () => void;
  targetProfile: Profile;
}

interface TempMessage {
  id: string;
  senderPhone: string;
  senderName: string;
  receiverPhone: string;
  receiverName: string;
  content: string;
  timestamp: string;
}

export const TemporaryDirectChat: React.FC<TemporaryDirectChatProps> = ({
  isOpen,
  onClose,
  targetProfile
}) => {
  const [messages, setMessages] = useState<TempMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  // Identity state
  const [userPhone, setUserPhone] = useState("");
  const [userName, setUserName] = useState("");
  const [needsIdentity, setNeedsIdentity] = useState(false);
  const [tempNameInput, setTempNameInput] = useState("");
  const [tempPhoneInput, setTempPhoneInput] = useState("");
  const [identityError, setIdentityError] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pollingIntervalRef = useRef<any>(null);

  // 1. Resolve Identity on Open
  useEffect(() => {
    if (isOpen) {
      const regPhone = localStorage.getItem("doptari_registered_phone");
      const regName = localStorage.getItem("doptari_registered_name");
      const tempPhone = localStorage.getItem("temp_chat_phone");
      const tempName = localStorage.getItem("temp_chat_name");

      if (regPhone && regName) {
        setUserPhone(regPhone);
        setUserName(regName);
        setNeedsIdentity(false);
      } else if (tempPhone && tempName) {
        setUserPhone(tempPhone);
        setUserName(tempName);
        setNeedsIdentity(false);
      } else {
        setNeedsIdentity(true);
      }
    }
  }, [isOpen]);

  // 2. Fetch Messages and setup polling
  useEffect(() => {
    if (isOpen && userPhone && targetProfile.phoneNumber) {
      fetchMessages();

      // Poll for new messages every 3 seconds
      pollingIntervalRef.current = setInterval(() => {
        fetchMessagesSilently();
      }, 3000);

      return () => {
        if (pollingIntervalRef.current) {
          clearInterval(pollingIntervalRef.current);
        }
      };
    }
  }, [isOpen, userPhone, targetProfile]);

  // 3. Scroll to bottom on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/temp-chats/messages?userPhone=${encodeURIComponent(userPhone)}&partnerPhone=${encodeURIComponent(targetProfile.phoneNumber)}`
      );
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessagesSilently = async () => {
    try {
      const response = await fetch(
        `/api/temp-chats/messages?userPhone=${encodeURIComponent(userPhone)}&partnerPhone=${encodeURIComponent(targetProfile.phoneNumber)}`
      );
      if (response.ok) {
        const data = await response.json();
        // Check if there are actual changes before triggering state update to prevent flashing/re-renders
        if (JSON.stringify(data) !== JSON.stringify(messages)) {
          setMessages(data);
        }
      }
    } catch (err) {
      console.error("Silent message sync failed:", err);
    }
  };

  const handleSaveIdentity = (e: React.FormEvent) => {
    e.preventDefault();
    setIdentityError("");

    if (!tempNameInput.trim()) {
      setIdentityError("অনুগ্রহ করে আপনার নাম প্রদান করুন।");
      return;
    }

    const cleanPhone = tempPhoneInput.replace(/\D/g, "");
    if (cleanPhone.length !== 11) {
      setIdentityError("অনুগ্রহ করে ১১ ডিজিটের সঠিক মোবাইল নম্বর দিন।");
      return;
    }

    if (cleanPhone === targetProfile.phoneNumber) {
      setIdentityError("আপনি নিজের নাম বা মোবাইল নম্বরে চ্যাট করতে পারবেন না!");
      return;
    }

    localStorage.setItem("temp_chat_name", tempNameInput.trim());
    localStorage.setItem("temp_chat_phone", cleanPhone);

    setUserName(tempNameInput.trim());
    setUserPhone(cleanPhone);
    setNeedsIdentity(false);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const messageText = newMessage;
    setNewMessage("");
    setSending(true);

    const tempId = "temp_" + Date.now() + "_" + Math.floor(Math.random() * 1000);
    const tempMsg: TempMessage = {
      id: tempId,
      senderPhone: userPhone,
      senderName: userName,
      receiverPhone: targetProfile.phoneNumber,
      receiverName: targetProfile.fullName,
      content: messageText,
      timestamp: new Date().toISOString()
    };

    // Optimistically add message
    setMessages(prev => [...prev, tempMsg]);

    try {
      const response = await fetch("/api/temp-chats/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          senderPhone: userPhone,
          senderName: userName,
          receiverPhone: targetProfile.phoneNumber,
          receiverName: targetProfile.fullName,
          content: messageText
        })
      });

      if (response.ok) {
        const sentMsg = await response.json();
        // Replace optimistic message with the actual saved one
        setMessages(prev => prev.map(m => m.id === tempId ? sentMsg : m));
      } else {
        // Remove optimistic message and restore input on failure
        setMessages(prev => prev.filter(m => m.id !== tempId));
        setNewMessage(messageText);
      }
    } catch (err) {
      console.error("Failed to send message:", err);
      setMessages(prev => prev.filter(m => m.id !== tempId));
      setNewMessage(messageText);
    } finally {
      setSending(false);
    }
  };

  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString("bn-BD", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      });
    } catch (e) {
      return "";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white flex flex-col z-50 overflow-hidden animate-in fade-in slide-in-from-bottom duration-250">
      <div className="flex-1 w-full bg-white flex flex-col h-full">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white px-5 py-4 flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20 font-bold font-sans text-sm">
              {targetProfile.fullName.slice(0, 2)}
            </div>
            <div>
              <h3 className="font-bold text-sm leading-tight">{targetProfile.fullName}</h3>
              <p className="text-[10px] text-emerald-100 mt-0.5 font-medium">
                {targetProfile.position} • {targetProfile.schoolName}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-full transition-all text-white cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Identity Form (shown if user is not resolved yet) */}
        {needsIdentity ? (
          <div className="flex-1 p-6 flex flex-col justify-center bg-slate-50">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm max-w-sm mx-auto space-y-4">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                  <MessageSquare size={24} />
                </div>
                <h4 className="font-extrabold text-slate-800 text-md">সাময়িক যোগাযোগ পরিচয়</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  অস্থায়ী চ্যাট শুরু করতে আপনার নাম এবং মোবাইল নম্বর প্রদান করুন। তথ্যটি শুধুমাত্র বার্তা প্রেরণের কাজে ব্যবহৃত হবে।
                </p>
              </div>

              {identityError && (
                <div className="bg-rose-50 border border-rose-100 text-rose-600 px-3 py-2 rounded-lg text-[11px] font-bold">
                  ⚠️ {identityError}
                </div>
              )}

              <form onSubmit={handleSaveIdentity} className="space-y-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 mb-1">আপনার নাম *</label>
                  <div className="relative">
                    <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={tempNameInput}
                      onChange={(e) => setTempNameInput(e.target.value)}
                      placeholder="উদাঃ মোঃ আবির হোসেন"
                      className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-gray-300 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none bg-white text-slate-800 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-600 mb-1">মোবাইল নম্বর *</label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      required
                      maxLength={11}
                      value={tempPhoneInput}
                      onChange={(e) => setTempPhoneInput(e.target.value.replace(/\D/g, ""))}
                      placeholder="উদাঃ 01XXXXXXXXX"
                      className="w-full pl-9 pr-4 py-2 text-xs font-mono rounded-lg border border-gray-300 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none bg-white text-slate-800 font-medium"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-sm transition-all cursor-pointer mt-2"
                >
                  চ্যাট শুরু করুন
                </button>
              </form>
            </div>
          </div>
        ) : (
          <>
            {/* Retention and Info Alert */}
            <div className="bg-amber-50 border-b border-amber-200/50 px-4 py-2 flex items-center gap-2.5 select-none">
              <Clock size={14} className="text-amber-600 shrink-0" />
              <p className="text-[10px] text-amber-800 font-bold leading-normal">
                মেসেজগুলো ১ দিন (২৪ ঘণ্টা) পর স্বয়ংক্রিয়ভাবে মুছে যাবে। এটি সম্পূর্ণ নিরাপদ ও অস্থায়ী।
              </p>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
              {loading ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center space-y-1.5">
                    <Loader2 className="animate-spin text-emerald-600 mx-auto" size={24} />
                    <span className="text-[11px] text-slate-400 font-bold">বার্তা লোড হচ্ছে...</span>
                  </div>
                </div>
              ) : messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-2">
                  <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-100 text-emerald-500">
                    <MessageSquare size={18} />
                  </div>
                  <h5 className="text-xs font-bold text-slate-700">কোনো বার্তা নেই</h5>
                  <p className="text-[10px] text-slate-400 max-w-xs">
                    আপনার এবং {targetProfile.fullName}-এর মধ্যে অস্থায়ী চ্যাট শুরু করুন। এখনই প্রথম বার্তাটি পাঠান!
                  </p>
                </div>
              ) : (
                messages.map((msg) => {
                  const isMine = msg.senderPhone === userPhone;
                  return (
                    <div 
                      key={msg.id}
                      className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 shadow-xs ${
                        isMine 
                          ? "bg-emerald-600 text-white rounded-br-none" 
                          : "bg-white text-slate-800 border border-gray-150 rounded-bl-none"
                      }`}>
                        {!isMine && (
                          <span className="block text-[9px] font-extrabold text-emerald-600 mb-0.5">
                            {msg.senderName}
                          </span>
                        )}
                        <p className="text-xs leading-relaxed font-semibold whitespace-pre-wrap select-text">
                          {msg.content}
                        </p>
                        <div className={`flex items-center justify-end gap-1 mt-1 text-[9px] font-sans ${
                          isMine ? "text-emerald-100" : "text-slate-400"
                        }`}>
                          <span>{formatTime(msg.timestamp)}</span>
                          {isMine && (
                            <span className="flex items-center">
                              {msg.id.startsWith("temp_") ? (
                                <Check size={11} className="text-white/60 animate-pulse" />
                              ) : (
                                <CheckCheck size={11} className="text-[#a7f3d0]" />
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-150 bg-white flex items-center gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="আপনার বার্তা লিখুন..."
                className="flex-1 px-4 py-2.5 text-xs rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50 text-slate-800 font-semibold"
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="p-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 text-white disabled:text-slate-400 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center shrink-0"
              >
                <Send size={16} />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
