import React, { useState, useEffect, useRef } from "react";
import { Profile } from "../types";
import { 
  X, MessageSquare, Loader2, User, Phone, Clock, ArrowRight, ShieldCheck, MailWarning
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface TemporaryChatsInboxProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPartner: (partner: Profile) => void;
  allProfiles: Profile[];
}

interface ActiveChatSession {
  partnerPhone: string;
  partnerName: string;
  lastMessage: {
    id: string;
    senderPhone: string;
    senderName: string;
    receiverPhone: string;
    receiverName: string;
    content: string;
    timestamp: string;
  };
}

export const TemporaryChatsInbox: React.FC<TemporaryChatsInboxProps> = ({
  isOpen,
  onClose,
  onSelectPartner,
  allProfiles
}) => {
  const [sessions, setSessions] = useState<ActiveChatSession[]>([]);
  const [loading, setLoading] = useState(true);

  // Identity state
  const [userPhone, setUserPhone] = useState("");
  const [userName, setUserName] = useState("");
  const [needsIdentity, setNeedsIdentity] = useState(false);
  const [tempNameInput, setTempNameInput] = useState("");
  const [tempPhoneInput, setTempPhoneInput] = useState("");
  const [identityError, setIdentityError] = useState("");

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

  // 2. Fetch active sessions list
  useEffect(() => {
    if (isOpen && userPhone) {
      fetchSessions();

      pollingIntervalRef.current = setInterval(() => {
        fetchSessionsSilently();
      }, 4000);

      return () => {
        if (pollingIntervalRef.current) {
          clearInterval(pollingIntervalRef.current);
        }
      };
    }
  }, [isOpen, userPhone]);

  const fetchSessions = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/temp-chats/active?phone=${encodeURIComponent(userPhone)}`);
      if (response.ok) {
        const data = await response.json();
        setSessions(data);
      }
    } catch (err) {
      console.error("Failed to load active chat sessions:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSessionsSilently = async () => {
    try {
      const response = await fetch(`/api/temp-chats/active?phone=${encodeURIComponent(userPhone)}`);
      if (response.ok) {
        const data = await response.json();
        if (JSON.stringify(data) !== JSON.stringify(sessions)) {
          setSessions(data);
        }
      }
    } catch (err) {
      console.error("Silent sync of sessions failed:", err);
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

    localStorage.setItem("temp_chat_name", tempNameInput.trim());
    localStorage.setItem("temp_chat_phone", cleanPhone);

    setUserName(tempNameInput.trim());
    setUserPhone(cleanPhone);
    setNeedsIdentity(false);
  };

  const handleSelectSession = (session: ActiveChatSession) => {
    // Attempt to locate the full Profile object in our directory list based on phone number
    const foundProfile = allProfiles.find(p => p.phoneNumber === session.partnerPhone);
    
    if (foundProfile) {
      onSelectPartner(foundProfile);
    } else {
      // Create a temporary profile object if the partner is not in approved directory (e.g., unregistered user)
      const mockProfile: Profile = {
        id: "temp_" + session.partnerPhone,
        fullName: session.partnerName,
        username: "temp_" + session.partnerPhone,
        phoneNumber: session.partnerPhone,
        facebookUrl: "",
        position: "সাময়িক চ্যাট মেম্বার",
        district: "অজানা",
        upazila: "অজানা",
        unionName: "",
        schoolName: "সাময়িক ইউজার",
        aboutMe: "",
        status: "approved",
        createdAt: new Date().toISOString(),
        photo: ""
      };
      onSelectPartner(mockProfile);
    }
  };

  const formatTimeAgo = (isoString: string) => {
    try {
      const diffMs = Date.now() - new Date(isoString).getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);

      const toBengaliNumerals = (numStr: string) => {
        const bDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
        return numStr.toString().replace(/[0-9]/g, (w) => bDigits[parseInt(w, 10)]);
      };

      if (diffMins < 1) return "এইমাত্র";
      if (diffMins < 60) return `${toBengaliNumerals(diffMins.toString())} মিনিট আগে`;
      if (diffHours < 24) return `${toBengaliNumerals(diffHours.toString())} ঘণ্টা আগে`;
      return "১ দিন আগে";
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
          <div className="flex items-center gap-2.5">
            <MessageSquare size={20} className="text-emerald-300" />
            <div>
              <h3 className="font-extrabold text-sm md:text-base tracking-tight">অস্থায়ী চ্যাট ইনবক্স (Inbox)</h3>
              <p className="text-[10px] text-emerald-100">মেসেজ ও ১-টু-১ চ্যাট তালিকা</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-full transition-all text-white cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Identity view / registration if needed */}
        {needsIdentity ? (
          <div className="flex-1 p-6 flex flex-col justify-center bg-slate-50">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                  <MessageSquare size={24} />
                </div>
                <h4 className="font-extrabold text-slate-800 text-md">চ্যাট ইনবক্স অ্যাক্সেস</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  আপনার ইনবক্স দেখতে এবং অন্যদের পাঠানো মেসেজের উত্তর দিতে আপনার নাম ও মোবাইল নম্বর দিয়ে প্রবেশ করুন।
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
                  ইনবক্স খুলুন
                </button>
              </form>
            </div>
          </div>
        ) : (
          <>
            {/* Pruning notification banner */}
            <div className="bg-amber-50 border-b border-amber-200/50 px-4 py-2 flex items-center gap-2.5 select-none shrink-0">
              <Clock size={13} className="text-amber-600 shrink-0" />
              <p className="text-[10px] text-amber-800 font-bold leading-normal">
                মেসেজগুলো ১ দিন (২৪ ঘণ্টা) পর অটোমেটিক ডিলিট হবে।
              </p>
            </div>

            {/* List of active sessions */}
            <div className="flex-1 overflow-y-auto bg-slate-50/50">
              {loading ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center space-y-1.5">
                    <Loader2 className="animate-spin text-emerald-600 mx-auto" size={24} />
                    <span className="text-[11px] text-slate-400 font-bold">ইনবক্স চেক করা হচ্ছে...</span>
                  </div>
                </div>
              ) : sessions.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-2">
                  <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-100 text-emerald-500">
                    <MessageSquare size={20} className="animate-pulse" />
                  </div>
                  <h5 className="text-xs font-bold text-slate-700">কোনো সক্রিয় চ্যাট সেশন নেই</h5>
                  <p className="text-[10px] text-slate-400 max-w-xs leading-relaxed">
                    কারো সাথে চ্যাট শুরু করতে তালিকায় থাকা যেকোনো সদস্যের প্রোফাইলে প্রবেশ করে <strong>"অস্থায়ী চ্যাট (ফ্রি)"</strong> বাটন প্রেস করুন।
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-150">
                  {sessions.map((session) => {
                    const isIncoming = session.lastMessage.senderPhone !== userPhone;
                    return (
                      <button
                        key={session.partnerPhone}
                        onClick={() => handleSelectSession(session)}
                        className="w-full text-left p-4 hover:bg-emerald-50/30 transition-all flex items-center justify-between gap-4 cursor-pointer border-b border-gray-100 last:border-0"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 bg-emerald-50 text-[#046c4e] rounded-full flex items-center justify-center font-bold border border-emerald-100 shrink-0 text-sm">
                            {session.partnerName.slice(0, 2)}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-extrabold text-xs text-slate-800 flex items-center gap-1.5">
                              <span>{session.partnerName}</span>
                              {isIncoming && (
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block animate-ping" />
                              )}
                            </h4>
                            <p className="text-[11px] text-slate-500 truncate mt-0.5 font-medium">
                              {isIncoming ? "সে:" : "আপনি:"} {session.lastMessage.content}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-1.5 shrink-0 text-[10px] font-semibold text-slate-400">
                          <span className="flex items-center gap-1">
                            <Clock size={10} />
                            {formatTimeAgo(session.lastMessage.timestamp)}
                          </span>
                          <span className="text-[#046c4e] hover:underline flex items-center gap-0.5 font-extrabold text-[9px] uppercase tracking-wide">
                            চ্যাট করুন <ArrowRight size={10} />
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
