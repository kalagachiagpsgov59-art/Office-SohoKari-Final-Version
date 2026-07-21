import React, { useState, useEffect, useMemo, useRef } from "react";
import * as XLSX from "xlsx";
import { Profile, ORGANIZATIONAL_POSITIONS } from "../types";
import { BANGLADESH_LOCATIONS_DATABASE } from "../locationData";
import { 
  getDistricts, getUpazilas, getUnions, getGeneratedSchools,
  GeoDistrict, GeoUpazila, GeoUnion 
} from "../geoApi";
import { WebEditSettings } from "./WebEditSettings";
import { WebSEO } from "./WebSEO";
import { 
  ShieldCheck, Lock, User, LogOut, Check, X, Trash2, Info, Eye, EyeOff,
  Clock, CheckCircle, AlertTriangle, ChevronLeft, ArrowLeft, RefreshCw,
  Edit, Save, CheckCircle2, AlertOctagon, FileSpreadsheet, FileText, FileDown, File,
  Database, DownloadCloud, UploadCloud, MessageCircle, Plus, Settings
} from "lucide-react";

interface AdminPanelProps {
  onBackToHome: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onBackToHome }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // OTP & Password Recovery States
  const [requiresOtp, setRequiresOtp] = useState(false);
  const [loginOtp, setLoginOtp] = useState("");
  const [devOtpNotice, setDevOtpNotice] = useState("");
  const [isRecovering, setIsRecovering] = useState(false);
  const [recoveryMethod, setRecoveryMethod] = useState<'email' | 'phone'>('email');
  const [recoveryInput, setRecoveryInput] = useState("");
  const [recoveryStep, setRecoveryStep] = useState<1 | 2>(1);
  const [recoveryOtp, setRecoveryOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [recoveryMessage, setRecoveryMessage] = useState("");
  const [recoveryError, setRecoveryError] = useState("");
  const [recoveryLoading, setRecoveryLoading] = useState(false);

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected' | 'webedit' | 'webseo' | 'ai_routing' | 'ai_chats' | 'live_messages'>('pending');
  const [loadingProfiles, setLoadingProfiles] = useState(false);

  // --- LIVE MESSAGES STATES ---
  const [liveChats, setLiveChats] = useState<any[]>([]);
  const [loadingLiveChats, setLoadingLiveChats] = useState(false);
  const [selectedLiveChatId, setSelectedLiveChatId] = useState<string | null>(null);
  const [selectedLiveChatName, setSelectedLiveChatName] = useState("");
  const [liveMessages, setLiveMessages] = useState<any[]>([]);
  const [loadingLiveMessages, setLoadingLiveMessages] = useState(false);
  const [liveMessageInput, setLiveMessageInput] = useState("");
  const [editingLiveMessageId, setEditingLiveMessageId] = useState<string | null>(null);
  const [editingLiveMessageText, setEditingLiveMessageText] = useState("");

  // Admin Registration & Customization State
  const [adminSignUpEnabled, setAdminSignUpEnabled] = useState(true);
  const [isAdminRegistering, setIsAdminRegistering] = useState(false);
  const [adminRegFullName, setAdminRegFullName] = useState("");
  const [adminRegUsername, setAdminRegUsername] = useState("");
  const [adminRegPassword, setAdminRegPassword] = useState("");
  const [adminRegEmail, setAdminRegEmail] = useState("");
  const [adminRegPhone, setAdminRegPhone] = useState("");
  const [adminRegSuccessMsg, setAdminRegSuccessMsg] = useState("");
  const [adminRegErrorMsg, setAdminRegErrorMsg] = useState("");
  const [adminRegLoading, setAdminRegLoading] = useState(false);

  // Multi-Admin Management State
  const [adminsList, setAdminsList] = useState<any[]>([]);
  const [adminRole, setAdminRole] = useState<'superadmin' | 'admin'>('admin');
  const [loggedInAdminId, setLoggedInAdminId] = useState("");
  const [updatingCreds, setUpdatingCreds] = useState(false);
  const [credsSuccess, setCredsSuccess] = useState("");
  const [credsError, setCredsError] = useState("");

  const [editAdminFullName, setEditAdminFullName] = useState("");
  const [editAdminUsername, setEditAdminUsername] = useState("");
  const [editAdminPassword, setEditAdminPassword] = useState("");
  const [editAdminEmail, setEditAdminEmail] = useState("");
  const [editAdminPhone, setEditAdminPhone] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  
  // Selected profile for full detail modal (internal review modal)
  const [selectedReviewProfile, setSelectedReviewProfile] = useState<Profile | null>(null);

  // Editing state
  const [isEditing, setIsEditing] = useState(false);
  const [editFullName, setEditFullName] = useState("");
  const [editUsername, setEditUsername] = useState("");
  const [editPhoneNumber, setEditPhoneNumber] = useState("");
  const [editFacebookUrl, setEditFacebookUrl] = useState("");
  const [editPosition, setEditPosition] = useState("");
  const [editDistrict, setEditDistrict] = useState("");
  const [editUpazila, setEditUpazila] = useState("");
  const [editUnionName, setEditUnionName] = useState("");
  const [editSchoolName, setEditSchoolName] = useState("");
  const [editAboutMe, setEditAboutMe] = useState("");
  const [editFatherName, setEditFatherName] = useState("");
  const [editMotherName, setEditMotherName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editAddress, setEditAddress] = useState("");

  // Confirmation modal state
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    confirmText: string;
    cancelText: string;
  } | null>(null);

  // Backup restore progress states
  const [restoreProgress, setRestoreProgress] = useState<number | null>(null);
  const [restoreStatus, setRestoreStatus] = useState<string>("");

  // File input ref for backup upload
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Toast notification state
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // --- SOHOKARI AI assistant Admin States ---
  const [aiConfigs, setAiConfigs] = useState<any[]>([]);
  const [loadingAiSettings, setLoadingAiSettings] = useState(false);
  const [savingAiSettings, setSavingAiSettings] = useState(false);
  const [chatSessions, setChatSessions] = useState<any[]>([]);
  const [loadingChats, setLoadingChats] = useState(false);
  const [selectedChatSession, setSelectedChatSession] = useState<any | null>(null);

  const [newProvider, setNewProvider] = useState<'nvidia' | 'openrouter'>('nvidia');
  const [newModel, setNewModel] = useState("");
  const [newApiKey, setNewApiKey] = useState("");
  const [showKeyId, setShowKeyId] = useState<string | null>(null);

  const handleAddAiConfig = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newModel.trim() || !newApiKey.trim()) {
      setToast({ message: "মডেলের নাম এবং এপিআই কী দুটিই প্রদান করা আবশ্যক।", type: "error" });
      setTimeout(() => setToast(null), 4500);
      return;
    }

    if (aiConfigs.length >= 25) {
      setToast({ message: "সর্বোচ্চ ২৫ টি রাউটিং মডেল বা এপিআই কী যুক্ত করা সম্ভব।", type: "error" });
      setTimeout(() => setToast(null), 4500);
      return;
    }

    const newItem = {
      id: "ai-" + Math.random().toString(36).substring(2, 9),
      provider: newProvider,
      model: newModel.trim(),
      apiKey: newApiKey.trim(),
      enabled: true
    };

    const updated = [...aiConfigs, newItem];
    setAiConfigs(updated);
    
    // Reset form
    setNewModel("");
    setNewApiKey("");

    // Auto-save instantly with a success toast notification
    saveAiSettings(updated, false);
  };

  const handleToggleEnable = (id: string) => {
    const updated = aiConfigs.map(c => c.id === id ? { ...c, enabled: !c.enabled } : c);
    setAiConfigs(updated);
    
    // Auto-save on toggle to ensure instant changes are saved in the database
    saveAiSettings(updated, false);
  };

  const handleDeleteAiConfig = (id: string) => {
    setConfirmModal({
      isOpen: true,
      title: "রাউটিং মডেল মুছে ফেলুন",
      message: "আপনি কি নিশ্চিতভাবে এই রাউটিং কনফিগারেশনটি মুছে ফেলতে চান?",
      confirmText: "হ্যাঁ, মুছে ফেলুন",
      cancelText: "না, বাতিল",
      onConfirm: () => {
        const updated = aiConfigs.filter(c => c.id !== id);
        setAiConfigs(updated);
        setConfirmModal(null);
        // Auto-save after delete to persist changes instantly in database
        saveAiSettings(updated, false);
      }
    });
  };

  const renderAiRoutingTab = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-700 pb-4">
          <div>
            <h2 className="text-md font-extrabold text-white">🤖 সহাকারী (SOHOKARI) এআই মডেল রাউটিং সেটিংস</h2>
            <p className="text-xs text-slate-400 mt-1">NVIDIA NIM এবং OpenRouter-এর এক বা একাধিক এপিআই কী যুক্ত করে রাউটিং সেট করুন। একটি মডেল ফেইল করলে স্বয়ংক্রিয়ভাবে পরবর্তী মডেলে ফেইলওভার হবে।</p>
          </div>
          <button
            onClick={() => {
              let updated = [...aiConfigs];
              if (newModel.trim() && newApiKey.trim()) {
                const newItem = {
                  id: "ai-" + Math.random().toString(36).substring(2, 9),
                  provider: newProvider,
                  model: newModel.trim(),
                  apiKey: newApiKey.trim(),
                  enabled: true
                };
                updated.push(newItem);
                setNewModel("");
                setNewApiKey("");
              }
              saveAiSettings(updated);
            }}
            disabled={savingAiSettings}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
          >
            {savingAiSettings ? "সংরক্ষণ হচ্ছে..." : "⚙️ কনফিগারেশন সংরক্ষণ করুন"}
          </button>
        </div>

        {/* Add Config Form */}
        <div className="bg-slate-900/40 border border-slate-750 p-5 rounded-2xl space-y-4">
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Plus size={14} className="text-emerald-400" /> নতুন মডেল রাউটিং যুক্ত করুন (সর্বোচ্চ ২৫টি)
          </h3>
          <form onSubmit={handleAddAiConfig} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1.5">প্রোভাইডার (Provider)</label>
              <select
                value={newProvider}
                onChange={(e: any) => setNewProvider(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 text-xs focus:outline-none"
              >
                <option value="nvidia">NVIDIA NIM</option>
                <option value="openrouter">OpenRouter</option>
              </select>
            </div>

            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1.5">মডেল আইডি / নাম (Model Name)</label>
                <input
                  type="text"
                  required
                  value={newModel}
                  onChange={(e) => setNewModel(e.target.value)}
                  placeholder={newProvider === 'nvidia' ? "যেমন: nvidia/llama-3.1-405b" : "যেমন: google/gemini-2.5-flash"}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1.5">এপিআই কী (API Key)</label>
                <input
                  type="password"
                  required
                  value={newApiKey}
                  onChange={(e) => setNewApiKey(e.target.value)}
                  placeholder="nvapi-... অথবা sk-or-v1-..."
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-[#046c4e] hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Plus size={14} />
                রাউটিং তালিকায় যুক্ত করুন
              </button>
            </div>
          </form>
        </div>

        {/* Configurations List */}
        <div className="bg-slate-900/20 border border-slate-750 rounded-2xl overflow-hidden">
          <div className="bg-slate-900/40 px-5 py-3 border-b border-slate-750 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">রাউটিং অগ্রাধিকার তালিকা ({aiConfigs.length}/২৫)</span>
            <span className="text-[10px] text-amber-400 font-bold">💡 উপর থেকে নিচে ক্রমানুসারে মডেল রান করা হবে।</span>
          </div>

          {loadingAiSettings ? (
            <div className="py-12 text-center text-slate-400 text-xs">মডেল লোড হচ্ছে...</div>
          ) : aiConfigs.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-xs space-y-2">
              <p>কোনো কাস্টম এপিআই রাউটিং সেট করা নেই।</p>
              <p className="text-[11px] text-amber-500">সেটিংস খালি থাকলে এআই সহকারী বন্ধ থাকবে এবং দুঃখিত বার্তা প্রদর্শন করবে।</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-750">
              {aiConfigs.map((config, index) => (
                <div key={config.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-800/10 transition">
                  <div className="flex items-start gap-3">
                    <div className="bg-slate-855 px-2.5 py-1 rounded-lg border border-slate-700 text-center font-bold font-mono text-slate-400 text-xs">
                      #{index + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-white text-sm">{config.model}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase border
                          ${config.provider === 'nvidia' 
                            ? 'bg-emerald-950 text-emerald-400 border-emerald-800' 
                            : 'bg-blue-950 text-blue-400 border-blue-800'
                          }`}
                        >
                          {config.provider === 'nvidia' ? 'NVIDIA NIM' : 'OpenRouter'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-[11px] font-mono text-slate-500 font-bold">এপিআই কী:</span>
                        <span className="text-xs font-mono text-slate-400">
                          {showKeyId === config.id ? config.apiKey : `${config.apiKey.substring(0, 10)}...xxxxxxxx`}
                        </span>
                        <button 
                          onClick={() => setShowKeyId(showKeyId === config.id ? null : config.id)}
                          className="text-[10px] text-indigo-400 hover:text-indigo-300 font-bold ml-1 cursor-pointer focus:outline-none"
                        >
                          {showKeyId === config.id ? "লুকান" : "দেখুন"}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-auto">
                    {/* Enable toggle button */}
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold ${config.enabled ? 'text-emerald-400' : 'text-slate-500'}`}>
                        {config.enabled ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleToggleEnable(config.id)}
                        className={`w-10 h-5 rounded-full p-0.5 transition-colors cursor-pointer focus:outline-none
                          ${config.enabled ? 'bg-emerald-600' : 'bg-slate-700'}`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-200
                          ${config.enabled ? 'translate-x-5' : 'translate-x-0'}`}
                        />
                      </button>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => handleDeleteAiConfig(config.id)}
                      className="p-2 bg-slate-800 hover:bg-rose-955 border border-slate-700 hover:border-rose-900/50 rounded-xl text-slate-400 hover:text-rose-400 transition cursor-pointer"
                      title="মুছে ফেলুন"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderAiChatsTab = () => {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[500px]">
        {/* Left Side: Users list */}
        <div className="lg:col-span-4 bg-slate-900/30 border border-slate-750 rounded-2xl flex flex-col overflow-hidden">
          <div className="bg-slate-900/40 p-4 border-b border-slate-750 flex items-center justify-between shrink-0">
            <div>
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1">
                💬 কথোপকথন তালিকা
              </h3>
              <p className="text-[10px] text-slate-500 mt-0.5">সবশেষ সক্রিয় ব্যবহারকারীগণ</p>
            </div>
            {/* Real-time pulsing glow */}
            <div className="flex items-center gap-1.5 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
              <span className="text-[9px] text-emerald-400 font-extrabold uppercase">Live Sync</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto max-h-[450px] divide-y divide-slate-800/60 p-2 space-y-1">
            {loadingChats && chatSessions.length === 0 ? (
              <div className="py-12 text-center text-slate-500 text-xs">লোড হচ্ছে...</div>
            ) : chatSessions.length === 0 ? (
              <div className="py-12 text-center text-slate-600 text-xs">কোনো চ্যাট সেশন পাওয়া যায়নি।</div>
            ) : (
              chatSessions.map((session) => (
                <button
                  key={session.id}
                  onClick={() => setSelectedChatSession(session)}
                  className={`w-full text-left p-3 rounded-xl transition flex items-center gap-3 cursor-pointer
                    ${selectedChatSession?.id === session.id 
                      ? 'bg-slate-800 border border-slate-700/60 shadow' 
                      : 'hover:bg-slate-800/30 border border-transparent'
                    }`}
                >
                  <div className="w-9 h-9 bg-slate-805 text-indigo-400 rounded-full flex items-center justify-center font-bold shadow-inner border border-slate-750 uppercase">
                    {session.userName ? session.userName.substring(0, 1) : "U"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-200 text-xs truncate max-w-[130px]">
                        {session.userName}
                      </span>
                      <span className="text-[9px] text-slate-500 font-medium">
                        {session.lastMessageAt ? new Date(session.lastMessageAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-[10px] text-slate-400 truncate max-w-[140px]">
                        {session.messages?.[session.messages.length - 1]?.content || "কোনো বার্তা নেই"}
                      </p>
                      <span className="bg-indigo-950/60 text-indigo-400 border border-indigo-900/50 text-[8px] px-1.5 py-0.2 rounded-full font-bold">
                        {session.messages?.length || 0} টি
                      </span>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Right Side: Conversation Panel */}
        <div className="lg:col-span-8 bg-slate-900/20 border border-slate-750 rounded-2xl flex flex-col overflow-hidden">
          {selectedChatSession ? (
            <div className="flex flex-col h-full min-h-[450px]">
              {/* Active Header */}
              <div className="bg-slate-900/40 p-4 border-b border-slate-750 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-950 text-indigo-400 rounded-full flex items-center justify-center border border-indigo-500/20 font-extrabold uppercase">
                    {selectedChatSession.userName ? selectedChatSession.userName.substring(0, 1) : "U"}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs md:text-sm text-white tracking-tight">{selectedChatSession.userName}</h4>
                    <p className="text-[10px] text-slate-500 font-medium font-mono">আইডি: {selectedChatSession.id}</p>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 font-bold bg-slate-805 px-3 py-1 rounded-full border border-slate-700">
                  মোট কথোপকথন: {selectedChatSession.messages?.length || 0} টি
                </span>
              </div>

              {/* Chat Stream Messages */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 max-h-[350px]">
                {selectedChatSession.messages?.map((m: any, index: number) => (
                  <div 
                    key={index} 
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-sm
                      ${m.role === 'user' 
                        ? 'bg-slate-850 text-slate-100 border border-slate-750 rounded-br-none' 
                        : 'bg-emerald-955/40 text-emerald-300 border border-emerald-900/40 rounded-bl-none'
                      }`}
                    >
                      <span className={`block text-[9px] font-bold mb-1
                        ${m.role === 'user' ? 'text-indigo-400' : 'text-emerald-400'}`}
                      >
                        {m.role === 'user' ? 'ব্যবহারকারী' : 'সহকারী'}
                      </span>
                      <p className="whitespace-pre-wrap">{m.content}</p>
                      <span className="block text-[8px] text-right mt-1.5 font-mono text-slate-500">
                        {m.timestamp ? new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12 py-24 text-slate-500">
              <MessageCircle size={40} className="text-slate-600 mb-3 animate-pulse" />
              <p className="text-sm font-semibold text-slate-400">কথোপকথন প্রিভিউ</p>
              <p className="text-xs text-slate-500 mt-1 max-w-[280px]">রিয়েল-টাইম কথোপকথন দেখতে বাম দিক থেকে যেকোনো ব্যবহারকারী নির্বাচন করুন।</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderLiveMessagesTab = () => {
    const activeChatMessages = liveMessages;
    
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[500px]">
        {/* Left Side: Active Threads list */}
        <div className="lg:col-span-4 bg-slate-900/30 border border-slate-750 rounded-2xl flex flex-col overflow-hidden">
          <div className="bg-slate-900/40 p-4 border-b border-slate-750 flex items-center justify-between shrink-0">
            <div>
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1">
                💬 লাইভ চ্যাট সেশন ({liveChats.length})
              </h3>
              <p className="text-[10px] text-slate-500 mt-0.5">রিয়েল-টাইম সাপোর্ট সেশনসমূহ</p>
            </div>
            {/* Real-time support indicator */}
            <div className="flex items-center gap-1.5 bg-pink-950/40 border border-pink-500/20 px-2 py-0.5 rounded-full">
              <span className="w-2 h-2 bg-pink-500 rounded-full animate-ping"></span>
              <span className="text-[9px] text-pink-400 font-extrabold uppercase">Support Live</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto max-h-[450px] divide-y divide-slate-800/60 p-2 space-y-1">
            {loadingLiveChats && liveChats.length === 0 ? (
              <div className="py-12 text-center text-slate-500 text-xs">লোড হচ্ছে...</div>
            ) : liveChats.length === 0 ? (
              <div className="py-12 text-center text-slate-600 text-xs">কোনো লাইভ মেসেজ সেশন পাওয়া যায়নি।</div>
            ) : (
              liveChats.map((chat) => (
                <button
                  key={chat.chatId}
                  onClick={() => {
                    setSelectedLiveChatId(chat.chatId);
                    setSelectedLiveChatName(chat.senderName);
                    fetchLiveMessages(chat.chatId);
                  }}
                  className={`w-full text-left p-3 rounded-xl transition flex items-center gap-3 cursor-pointer
                    ${selectedLiveChatId === chat.chatId 
                      ? 'bg-slate-800 border border-slate-700/60 shadow' 
                      : 'hover:bg-slate-800/30 border border-transparent'
                    }`}
                >
                  <div className="w-9 h-9 bg-slate-805 text-pink-400 rounded-full flex items-center justify-center font-bold shadow-inner border border-slate-750 uppercase">
                    {chat.senderName ? chat.senderName.substring(0, 1) : "U"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-200 text-xs truncate max-w-[130px]">
                        {chat.senderName}
                      </span>
                      <span className="text-[9px] text-slate-500 font-medium">
                        {chat.timestamp ? new Date(chat.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 truncate max-w-[170px] mt-1">
                      {chat.lastMessage}
                    </p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Right Side: Active Live Chat Area */}
        <div className="lg:col-span-8 bg-slate-900/20 border border-slate-750 rounded-2xl flex flex-col overflow-hidden">
          {selectedLiveChatId ? (
            <div className="flex flex-col h-full min-h-[450px]">
              {/* Support Header */}
              <div className="bg-slate-900/40 p-4 border-b border-slate-750 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-pink-950 text-pink-400 rounded-full flex items-center justify-center border border-pink-500/20 font-extrabold uppercase">
                    {selectedLiveChatName ? selectedLiveChatName.substring(0, 1) : "U"}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs md:text-sm text-white tracking-tight">{selectedLiveChatName}</h4>
                    <p className="text-[10px] text-slate-500 font-medium font-mono">লাইভ মেসেজ আইডি: {selectedLiveChatId}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-bold bg-slate-805 px-3 py-1 rounded-full border border-slate-700">
                    মোট বার্তা: {activeChatMessages.length} টি
                  </span>
                  <p className="text-[9px] text-slate-500 font-bold mt-1">⚠️ ৩ দিন পর মেসেজ মুছে যাবে</p>
                </div>
              </div>

              {/* Chat Stream messages */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 max-h-[300px]">
                {activeChatMessages.length === 0 ? (
                  <div className="py-12 text-center text-slate-600 text-xs">কোনো বার্তা নেই। কথোপকথন শুরু করুন!</div>
                ) : (
                  activeChatMessages.map((m: any) => (
                    <div 
                      key={m.id} 
                      className={`flex ${m.senderId === 'admin' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-sm relative group
                        ${m.senderId === 'admin' 
                          ? 'bg-slate-850 text-slate-100 border border-slate-750 rounded-br-none' 
                          : 'bg-pink-955/25 text-pink-300 border border-pink-900/30 rounded-bl-none'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-4 mb-1">
                          <span className={`text-[9px] font-bold
                            ${m.senderId === 'admin' ? 'text-indigo-400' : 'text-pink-400'}`}
                          >
                            {m.senderId === 'admin' ? 'এডমিন (আপনি)' : m.senderName}
                          </span>
                          
                          {/* Copy, Edit, Delete Controls */}
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 ml-2">
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(m.content);
                                setToast({ message: "বার্তা কপি করা হয়েছে।", type: "success" });
                                setTimeout(() => setToast(null), 3000);
                              }}
                              className="text-[9px] text-slate-450 hover:text-white cursor-pointer"
                              title="কপি করুন"
                            >
                              কপি
                            </button>
                            
                            <button
                              onClick={() => {
                                setEditingLiveMessageId(m.id);
                                setEditingLiveMessageText(m.content);
                              }}
                              className="text-[9px] text-slate-450 hover:text-white cursor-pointer"
                              title="সম্পাদনা করুন"
                            >
                              সম্পাদনা
                            </button>
                            
                            <button
                              onClick={() => handleDeleteLiveMessage(m.id)}
                              className="text-[9px] text-rose-400 hover:text-rose-300 font-bold cursor-pointer"
                              title="মুছে ফেলুন"
                            >
                              মুছুন
                            </button>
                          </div>
                        </div>

                        {editingLiveMessageId === m.id ? (
                          <div className="mt-1 space-y-2">
                            <input
                              type="text"
                              value={editingLiveMessageText}
                              onChange={(e) => setEditingLiveMessageText(e.target.value)}
                              className="w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded text-xs text-white focus:outline-none"
                            />
                            <div className="flex gap-1.5 justify-end">
                              <button
                                onClick={() => setEditingLiveMessageId(null)}
                                className="px-2 py-0.5 bg-slate-700 text-[10px] text-white rounded cursor-pointer"
                              >
                                বাতিল
                              </button>
                              <button
                                onClick={() => handleEditLiveMessage(m.id, editingLiveMessageText)}
                                className="px-2 py-0.5 bg-indigo-600 text-[10px] text-white rounded cursor-pointer"
                              >
                                সংরক্ষণ
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="whitespace-pre-wrap">{m.content}</p>
                        )}

                        <div className="flex items-center justify-between mt-1.5">
                          {m.isEdited && (
                            <span className="text-[8px] text-slate-500 italic">সংশোধিত</span>
                          )}
                          <span className="text-[8px] font-mono text-slate-500 ml-auto">
                            {m.timestamp ? new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Message Input box */}
              <form onSubmit={handleSendLiveMessage} className="p-4 border-t border-slate-750 bg-slate-900/40 flex items-center gap-2 shrink-0">
                <input
                  type="text"
                  required
                  value={liveMessageInput}
                  onChange={(e) => setLiveMessageInput(e.target.value)}
                  placeholder="ব্যবহারকারীর জবাবে মেসেজ লিখুন..."
                  className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-pink-500"
                />
                <button
                  type="submit"
                  className="px-5 py-2 bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs rounded-xl shadow transition cursor-pointer"
                >
                  পাঠান (Send)
                </button>
              </form>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12 py-24 text-slate-500">
              <MessageCircle size={40} className="text-slate-600 mb-3 animate-pulse" />
              <p className="text-sm font-semibold text-slate-400">লাইভ চ্যাট প্রিভিউ</p>
              <p className="text-xs text-slate-500 mt-1 max-w-[280px]">রিয়েল-টাইম লাইভ সাপোর্ট সেশন শুরু করতে বাম দিক থেকে যেকোনো চ্যাট নির্বাচন করুন।</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const fetchAiSettings = async () => {
    setLoadingAiSettings(true);
    try {
      const token = sessionStorage.getItem("admin_token");
      const res = await fetch("/api/admin/ai-settings", {
        headers: { "Authorization": `admin-session-token ${token}` }
      });
      const data = await res.json();
      if (data.configs) {
        setAiConfigs(data.configs);
      }
    } catch (err) {
      console.error("Failed to load AI settings:", err);
    } finally {
      setLoadingAiSettings(false);
    }
  };

  const saveAiSettings = async (updatedConfigs: any[], quiet: boolean = false) => {
    setSavingAiSettings(true);
    try {
      const token = sessionStorage.getItem("admin_token");
      const res = await fetch("/api/admin/ai-settings", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `admin-session-token ${token}`
        },
        body: JSON.stringify({ configs: updatedConfigs })
      });
      const data = await res.json();
      if (res.ok) {
        setAiConfigs(updatedConfigs);
        if (!quiet) {
          setToast({ message: "এআই সহকারী রাউটিং সেটিংস সফলভাবে সংরক্ষিত হয়েছে।", type: "success" });
          setTimeout(() => setToast(null), 4000);
        }
      } else {
        setToast({ message: data.error || "সেটিংস সংরক্ষণ ব্যর্থ হয়েছে।", type: "error" });
        setTimeout(() => setToast(null), 4000);
      }
    } catch (err) {
      console.error("Failed to save AI settings:", err);
      setToast({ message: "সংযোগ ত্রুটি। অনুগ্রহ করে আবার চেষ্টা করুন।", type: "error" });
      setTimeout(() => setToast(null), 4000);
    } finally {
      setSavingAiSettings(false);
    }
  };

  const fetchChatSessions = async () => {
    setLoadingChats(true);
    try {
      const token = sessionStorage.getItem("admin_token");
      const res = await fetch("/api/admin/chats", {
        headers: { "Authorization": `admin-session-token ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setChatSessions(data.chats);
      }
    } catch (err) {
      console.error("Failed to load chat logs:", err);
    } finally {
      setLoadingChats(false);
    }
  };

  const fetchLiveChats = async () => {
    setLoadingLiveChats(true);
    try {
      const token = sessionStorage.getItem("admin_token");
      const res = await fetch("/api/admin/live-chats", {
        headers: { "Authorization": `admin-session-token ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setLiveChats(data.chats);
      }
    } catch (err) {
      console.error("Failed to load live chats:", err);
    } finally {
      setLoadingLiveChats(false);
    }
  };

  const fetchLiveMessages = async (chatId: string) => {
    setLoadingLiveMessages(true);
    try {
      const res = await fetch(`/api/live-messages?chatId=${chatId}`);
      const data = await res.json();
      if (data.success) {
        setLiveMessages(data.messages);
      }
    } catch (err) {
      console.error("Failed to load live messages:", err);
    } finally {
      setLoadingLiveMessages(false);
    }
  };

  const handleSendLiveMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLiveChatId || !liveMessageInput.trim()) return;

    const content = liveMessageInput.trim();
    setLiveMessageInput("");

    try {
      const res = await fetch("/api/live-messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatId: selectedLiveChatId,
          senderId: "admin",
          senderName: "এডমিন",
          content
        })
      });
      const data = await res.json();
      if (data.success) {
        setLiveMessages(prev => [...prev, data.message]);
        fetchLiveChats(); // refresh list
      }
    } catch (err) {
      console.error("Failed to send live message:", err);
    }
  };

  const handleEditLiveMessage = async (messageId: string, newContent: string) => {
    if (!newContent.trim()) return;
    try {
      const res = await fetch("/api/live-messages/edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messageId, content: newContent })
      });
      const data = await res.json();
      if (data.success) {
        setLiveMessages(prev => prev.map(m => m.id === messageId ? { ...m, content: newContent, isEdited: true } : m));
        setEditingLiveMessageId(null);
        setEditingLiveMessageText("");
      }
    } catch (err) {
      console.error("Failed to edit live message:", err);
    }
  };

  const handleDeleteLiveMessage = async (messageId: string) => {
    showConfirm(
      "বার্তা মুছে ফেলুন",
      "আপনি কি নিশ্চিতভাবে এই বার্তাটি স্থায়ীভাবে ডিলিট করতে চান? ৩ দিনের আগের সকল মেসেজ এমনিতেই ডিলিট হয়ে যাবে।",
      async () => {
        try {
          const res = await fetch("/api/live-messages/delete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messageId })
          });
          const data = await res.json();
          if (data.success) {
            setLiveMessages(prev => prev.filter(m => m.id !== messageId));
            fetchLiveChats();
          }
        } catch (err) {
          console.error("Failed to delete live message:", err);
        }
      },
      "হ্যাঁ, মুছে ফেলুন",
      "না, বাতিল"
    );
  };

  useEffect(() => {
    if (isLoggedIn) {
      if (activeTab === 'ai_routing') {
        fetchAiSettings();
      }
      if (activeTab === 'ai_chats') {
        fetchChatSessions();
        const timer = setInterval(() => {
          fetchChatSessions();
        }, 10000); // Polling every 10 seconds for real-time monitoring
        return () => clearInterval(timer);
      }
      if (activeTab === 'live_messages') {
        fetchLiveChats();
        if (selectedLiveChatId) {
          fetchLiveMessages(selectedLiveChatId);
        }
        const timer = setInterval(() => {
          fetchLiveChats();
          if (selectedLiveChatId) {
            fetchLiveMessages(selectedLiveChatId);
          }
        }, 4000); // Polling every 4 seconds for live chat
        return () => clearInterval(timer);
      }
    }
  }, [activeTab, isLoggedIn, selectedLiveChatId]);
  // ------------------------------------------

  useEffect(() => {
    const successMsg = sessionStorage.getItem("restore_success_msg");
    if (successMsg) {
      setToast({ message: successMsg, type: "success" });
      sessionStorage.removeItem("restore_success_msg");
      
      const timer = setTimeout(() => {
        setToast(null);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Check for pre-existing session token and load settings
  useEffect(() => {
    // Cleanly remove any registration hash/parameters without reload
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    if (window.location.search.includes("register")) {
      const url = new URL(window.location.href);
      url.searchParams.delete("register");
      window.history.replaceState(null, "", url.pathname + url.search);
    }

    // Load settings for sign-up toggle
    fetch("/api/settings")
      .then(res => res.json())
      .then(data => {
        if (data?.customization?.homepage?.adminSignUpEnabled) {
          setAdminSignUpEnabled(data.customization.homepage.adminSignUpEnabled.enabled);
        }
      })
      .catch(err => console.error("Error loading settings:", err));

    const token = sessionStorage.getItem("admin_token");
    if (token && token.startsWith("admin-session-token")) {
      setIsLoggedIn(true);
      const savedRole = sessionStorage.getItem("admin_role") || "admin";
      const savedId = sessionStorage.getItem("admin_id") || "";
      const savedUsername = sessionStorage.getItem("admin_username") || "";
      const savedFullName = sessionStorage.getItem("admin_fullname") || "";
      const savedEmail = sessionStorage.getItem("admin_email") || "";
      const savedPhone = sessionStorage.getItem("admin_phone") || "";

      setAdminRole(savedRole as any);
      setLoggedInAdminId(savedId);
      
      // Pre-fill profile update fields
      setEditAdminFullName(savedFullName);
      setEditAdminUsername(savedUsername);
      setEditAdminEmail(savedEmail);
      setEditAdminPhone(savedPhone);

      fetchProfiles();
      fetchAdmins();
    }
  }, []);

  const fetchAdmins = async () => {
    try {
      const token = sessionStorage.getItem("admin_token");
      const res = await fetch("/api/admin/list-admins", {
        headers: { "Authorization": `admin-session-token ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setAdminsList(data.admins);
        const currentAdmin = data.admins.find((a: any) => a.id === sessionStorage.getItem("admin_id"));
        if (currentAdmin) {
          setEditAdminFullName(currentAdmin.fullName || "");
          setEditAdminUsername(currentAdmin.username || "");
          setEditAdminEmail(currentAdmin.email || "");
          setEditAdminPhone(currentAdmin.phoneNumber || "");
        }
      }
    } catch (err) {
      console.error("Error fetching admins:", err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);
    setDevOtpNotice("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "লগইন ব্যর্থ হয়েছে। তথ্য যাচাই করুন।");
      }

      sessionStorage.setItem("admin_token", data.token);
      sessionStorage.setItem("admin_role", data.role || "admin");
      sessionStorage.setItem("admin_id", data.adminId || "");
      sessionStorage.setItem("admin_username", data.username || "");
      sessionStorage.setItem("admin_fullname", data.fullName || "");
      sessionStorage.setItem("admin_email", data.email || "");
      sessionStorage.setItem("admin_phone", data.phoneNumber || "");

      setAdminRole(data.role || "admin");
      setLoggedInAdminId(data.adminId || "");
      setEditAdminFullName(data.fullName || "");
      setEditAdminUsername(data.username || "");
      setEditAdminEmail(data.email || "");
      setEditAdminPhone(data.phoneNumber || "");

      setIsLoggedIn(true);
      fetchProfiles();
      fetchAdmins();
    } catch (err: any) {
      setLoginError(err.message || "সার্ভার ত্রুটি। দয়া করে পুনরায় চেষ্টা করুন।");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleVerifyLoginOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    try {
      const response = await fetch("/api/admin/verify-login-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, otp: loginOtp }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "ভেরিফিকেশন কোডটি সঠিক নয় বা মেয়াদ শেষ হয়ে গেছে।");
      }

      sessionStorage.setItem("admin_token", data.token);
      sessionStorage.setItem("admin_role", data.role || "admin");
      sessionStorage.setItem("admin_id", data.adminId || "");
      sessionStorage.setItem("admin_username", data.username || "");
      sessionStorage.setItem("admin_fullname", data.fullName || "");
      sessionStorage.setItem("admin_email", data.email || "");
      sessionStorage.setItem("admin_phone", data.phoneNumber || "");

      setAdminRole(data.role || "admin");
      setLoggedInAdminId(data.adminId || "");
      setEditAdminFullName(data.fullName || "");
      setEditAdminUsername(data.username || "");
      setEditAdminEmail(data.email || "");
      setEditAdminPhone(data.phoneNumber || "");

      setIsLoggedIn(true);
      setRequiresOtp(false);
      setLoginOtp("");
      setDevOtpNotice("");
      fetchProfiles();
      fetchAdmins();
    } catch (err: any) {
      setLoginError(err.message || "সার্ভার ত্রুটি। দয়া করে পুনরায় চেষ্টা করুন।");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleAdminSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminRegErrorMsg("");
    setAdminRegSuccessMsg("");
    setAdminRegLoading(true);

    try {
      const res = await fetch("/api/admin/register-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: adminRegFullName,
          username: adminRegUsername,
          password: adminRegPassword,
          email: adminRegEmail,
          phoneNumber: adminRegPhone
        })
      });
      const data = await res.json();
      if (res.ok) {
        setAdminRegSuccessMsg(data.message || "আবেদনটি সফলভাবে জমা হয়েছে।");
        // Clear fields
        setAdminRegFullName("");
        setAdminRegUsername("");
        setAdminRegPassword("");
        setAdminRegEmail("");
        setAdminRegPhone("");
      } else {
        setAdminRegErrorMsg(data.error || "নিবন্ধন ব্যর্থ হয়েছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন।");
      }
    } catch (err) {
      setAdminRegErrorMsg("সার্ভার সাথে যোগাযোগ করা সম্ভব হয়নি।");
    } finally {
      setAdminRegLoading(false);
    }
  };

  const handleApproveAdmin = async (id: string) => {
    try {
      const token = sessionStorage.getItem("admin_token");
      const res = await fetch(`/api/admin/approve-admin/${id}`, {
        method: "POST",
        headers: { "Authorization": `admin-session-token ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setToast({ message: data.message || "এডমিন অ্যাকাউন্টটি অনুমোদিত হয়েছে।", type: "success" });
        fetchAdmins();
      } else {
        setToast({ message: data.error || "অনুমোদন ব্যর্থ হয়েছে।", type: "error" });
      }
    } catch (err) {
      setToast({ message: "সার্ভার ত্রুটি। দয়া করে পুনরায় চেষ্টা করুন।", type: "error" });
    }
  };

  const handleRejectAdmin = async (id: string) => {
    try {
      const token = sessionStorage.getItem("admin_token");
      const res = await fetch(`/api/admin/reject-admin/${id}`, {
        method: "POST",
        headers: { "Authorization": `admin-session-token ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setToast({ message: data.message || "এডমিন অ্যাকাউন্টটি বাতিল/নিষ্ক্রিয় করা হয়েছে।", type: "success" });
        fetchAdmins();
      } else {
        setToast({ message: data.error || "অপারেশন ব্যর্থ হয়েছে।", type: "error" });
      }
    } catch (err) {
      setToast({ message: "সার্ভার ত্রুটি। দয়া করে পুনরায় চেষ্টা করুন।", type: "error" });
    }
  };

  const handleDeleteAdmin = async (id: string) => {
    if (!window.confirm("আপনি কি নিশ্চিতভাবে এই এডমিন অ্যাকাউন্টটি ডিলিট করতে চান?")) {
      return;
    }
    try {
      const token = sessionStorage.getItem("admin_token");
      const res = await fetch(`/api/admin/delete-admin/${id}`, {
        method: "POST",
        headers: { "Authorization": `admin-session-token ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setToast({ message: data.message || "এডমিন অ্যাকাউন্টটি ডিলিট করা হয়েছে।", type: "success" });
        fetchAdmins();
      } else {
        setToast({ message: data.error || "মুছে ফেলা ব্যর্থ হয়েছে।", type: "error" });
      }
    } catch (err) {
      setToast({ message: "সার্ভার ত্রুটি। দয়া করে পুনরায় চেষ্টা করুন।", type: "error" });
    }
  };

  const handleUpdateAdminCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setCredsSuccess("");
    setCredsError("");
    setUpdatingCreds(true);

    try {
      const token = sessionStorage.getItem("admin_token");
      const res = await fetch("/api/admin/update-credentials", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `admin-session-token ${token}`
        },
        body: JSON.stringify({
          adminId: loggedInAdminId,
          fullName: editAdminFullName,
          username: editAdminUsername,
          password: editAdminPassword,
          email: editAdminEmail,
          phoneNumber: editAdminPhone
        })
      });
      const data = await res.json();
      if (res.ok) {
        setCredsSuccess(data.message || "আপনার এডমিন তথ্য সফলভাবে আপডেট করা হয়েছে।");
        if (editAdminUsername) sessionStorage.setItem("admin_username", editAdminUsername);
        if (editAdminFullName) sessionStorage.setItem("admin_fullname", editAdminFullName);
        if (editAdminEmail) sessionStorage.setItem("admin_email", editAdminEmail);
        if (editAdminPhone) sessionStorage.setItem("admin_phone", editAdminPhone);
        
        // Reset password field to empty after success
        setEditAdminPassword("");
        fetchAdmins();
      } else {
        setCredsError(data.error || "আপডেট ব্যর্থ হয়েছে।");
      }
    } catch (err) {
      setCredsError("সার্ভার ত্রুটি। আবার চেষ্টা করুন।");
    } finally {
      setUpdatingCreds(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setRecoveryError("");
    setRecoveryMessage("");
    setRecoveryLoading(true);

    try {
      const response = await fetch("/api/admin/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ method: recoveryMethod, value: recoveryInput }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "তথ্য মেলেনি বা ভুল হয়েছে।");
      }

      setRecoveryMessage(data.message || "ভেরিফিকেশন কোড (OTP) পাঠানো হয়েছে।");
      setRecoveryStep(2);
      if (data._devOtp) {
        setDevOtpNotice(`ডেভলপমেন্ট টেস্ট ওটিপি (OTP): ${data._devOtp} (এটি শুধুমাত্র টেস্ট এনভায়রনমেন্টে প্রদর্শন করা হচ্ছে। রিয়েল ইমেইলের জন্য .env এ SMTP সেট আপ করুন)`);
      }
    } catch (err: any) {
      setRecoveryError(err.message || "রিকভারি রিকোয়েস্ট ব্যর্থ হয়েছে।");
    } finally {
      setRecoveryLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setRecoveryError("");
    setRecoveryMessage("");
    setRecoveryLoading(true);

    try {
      const response = await fetch("/api/admin/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp: recoveryOtp, newPassword }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "OTP কোডটি সঠিক নয়।");
      }

      setToast({ message: "পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে। নতুন পাসওয়ার্ড দিয়ে লগইন করুন।", type: "success" });
      setIsRecovering(false);
      setRecoveryStep(1);
      setRecoveryInput("");
      setRecoveryOtp("");
      setNewPassword("");
      setDevOtpNotice("");
      setPassword("");
    } catch (err: any) {
      setRecoveryError(err.message || "পাসওয়ার্ড রিসেট ব্যর্থ হয়েছে।");
    } finally {
      setRecoveryLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_token");
    setIsLoggedIn(false);
    setProfiles([]);
  };

  const fetchProfiles = async () => {
    setLoadingProfiles(true);
    try {
      const token = sessionStorage.getItem("admin_token");
      const response = await fetch("/api/admin/profiles", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setProfiles(data);
      } else {
        // Token expired or invalid
        handleLogout();
      }
    } catch (error) {
      console.error("Error fetching profiles:", error);
    } finally {
      setLoadingProfiles(false);
    }
  };

  const exportToXLSX = () => {
    const approvedProfiles = profiles.filter(p => p.status === 'approved');
    if (approvedProfiles.length === 0) {
      alert("ডাউনলোড করার মতো কোনো অনুমোদিত প্রোফাইল নেই!");
      return;
    }

    const data = approvedProfiles.map((p, index) => ({
      "ক্রমিক নং": index + 1,
      "নাম": p.fullName || "",
      "পদবী": p.position || "",
      "মোবাইল নম্বর": p.phoneNumber || "",
      "বিদ্যালয়ের নাম": p.schoolName || "",
      "জেলা": p.district || "",
      "উপজেলা": p.upazila || "",
      "ইউনিয়ন": p.unionName || "",
      "পিতার নাম": p.fatherName || "",
      "মাতার নাম": p.motherName || "",
      "ইমেইল": p.email || "",
      "বর্তমান ঠিকানা": p.address || "",
      "ফেসবুক লিংক": p.facebookUrl || "",
      "আমাদের সম্পর্কে (বায়ো)": p.aboutMe || ""
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    
    // Auto-adjust column widths for better Excel layout
    const maxLens = Object.keys(data[0] || {}).map(key => {
      let maxLen = key.length;
      data.forEach(row => {
        const val = String((row as any)[key] || "");
        if (val.length > maxLen) maxLen = val.length;
      });
      return { wch: Math.min(maxLen + 4, 40) };
    });
    worksheet['!cols'] = maxLens;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "অনুমোদিত সদস্যবৃন্দ");
    XLSX.writeFile(workbook, `Approved_Members_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const exportToCSV = () => {
    const approvedProfiles = profiles.filter(p => p.status === 'approved');
    if (approvedProfiles.length === 0) {
      alert("ডাউনলোড করার মতো কোনো অনুমোদিত প্রোফাইল নেই!");
      return;
    }

    const headers = [
      "ক্রমিক নং",
      "নাম",
      "পদবী",
      "মোবাইল নম্বর",
      "বিদ্যালয়ের নাম",
      "জেলা",
      "উপজেলা",
      "ইউনিয়ন",
      "পিতার নাম",
      "মাতার নাম",
      "ইমেইল",
      "বর্তমান ঠিকানা",
      "ফেসবুক লিংক",
      "বায়ো"
    ];

    const rows = approvedProfiles.map((p, index) => [
      String(index + 1),
      p.fullName || "",
      p.position || "",
      p.phoneNumber || "",
      p.schoolName || "",
      p.district || "",
      p.upazila || "",
      p.unionName || "",
      p.fatherName || "",
      p.motherName || "",
      p.email || "",
      p.address || "",
      p.facebookUrl || "",
      (p.aboutMe || "").replace(/\r?\n|\r/g, " ")
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(","))
    ].join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Approved_Members_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    const approvedProfiles = profiles.filter(p => p.status === 'approved');
    if (approvedProfiles.length === 0) {
      alert("ডাউনলোড করার মতো কোনো অনুমোদিত প্রোফাইল নেই!");
      return;
    }

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("পপ-আপ উইন্ডো খোলা সম্ভব হয়নি। অনুগ্রহ করে ব্রাউজারের পপ-আপ ব্লকারটি নিষ্ক্রিয় করুন।");
      return;
    }

    const today = new Date().toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const tableRowsHtml = approvedProfiles.map((p, index) => `
      <tr class="border-b border-slate-200 hover:bg-slate-50 transition-colors">
        <td class="py-2 px-3 text-center font-mono border-r border-slate-200 text-slate-800">${index + 1}</td>
        <td class="py-2 px-3 font-semibold border-r border-slate-200 text-slate-900">${p.fullName}</td>
        <td class="py-2 px-3 border-r border-slate-200 text-slate-700">${p.position}</td>
        <td class="py-2 px-3 font-mono border-r border-slate-200 text-slate-800">${p.phoneNumber}</td>
        <td class="py-2 px-3 border-r border-slate-200 text-slate-700">${p.schoolName}</td>
        <td class="py-2 px-3 text-slate-700">${p.upazila}, ${p.district}</td>
      </tr>
    `).join("");

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="bn">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>অনুমোদিত সদস্য তালিকা - প্রাথমিক বিদ্যালয় অফিস সহায়ক বাংলাদেশ</title>
        <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap" rel="stylesheet">
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          body {
            font-family: 'Hind Siliguri', sans-serif;
            background-color: white;
            color: #1e293b;
          }
          @media print {
            body {
              background-color: white;
              padding: 0;
            }
            .no-print {
              display: none !important;
            }
            @page {
              margin: 1.5cm;
            }
          }
        </style>
      </head>
      <body class="p-6 md:p-12">
        <div class="max-w-6xl mx-auto">
          <!-- Print Control bar -->
          <div class="no-print mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-emerald-50 border border-emerald-100 p-5 rounded-2xl shadow-sm">
            <div>
              <h3 class="text-sm font-bold text-emerald-950">পিডিএফ ডাউনলোড ও প্রিন্ট প্রিভিউ</h3>
              <p class="text-xs text-emerald-800 mt-1">
                <strong>টিপস:</strong> PDF ফাইল সংরক্ষণ করতে আপনার প্রিন্ট ডায়ালগে <strong>Destination</strong> অপশনে <strong>"Save as PDF"</strong> বা <strong>"পিডিএফ হিসেবে সংরক্ষণ করুন"</strong> নির্বাচন করুন।
              </p>
            </div>
            <div class="flex gap-3 self-stretch sm:self-auto justify-end">
              <button onclick="window.print()" class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5">
                🖨️ প্রিন্ট / PDF সেভ
              </button>
              <button onclick="window.close()" class="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold transition-all">
                বন্ধ করুন
              </button>
            </div>
          </div>

          <!-- Printable Document Content -->
          <div class="border border-slate-200 rounded-2xl p-6 sm:p-10 bg-white">
            <div class="text-center border-b border-emerald-500 pb-6 mb-8 relative">
              <h1 class="text-3xl font-extrabold text-emerald-800 tracking-tight">প্রাথমিক বিদ্যালয় অফিস সহায়ক বাংলাদেশ</h1>
              <p class="text-xs text-slate-500 mt-1.5 tracking-wider uppercase">সকল সরকারি প্রাথমিক বিদ্যালয়ের দপ্তরী ও নৈশপ্রহরীদের সঠিক যোগাযোগ ও সাংগঠনিক তথ্য এক ক্লিকেই খুজে নিন।</p>
              
              <div class="mt-6 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                <span>রিপোর্ট জেনারেট তারিখ: <strong>${today}</strong></span>
                <span class="bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-lg">মোট অনুমোদিত সদস্য: ${approvedProfiles.length} জন</span>
              </div>
            </div>

            <!-- Table -->
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse text-xs border border-slate-200">
                <thead>
                  <tr class="bg-slate-100 text-slate-900 border-b border-slate-300 font-bold text-slate-800">
                    <th class="py-3 px-3 text-center w-12 border-r border-slate-200">নং</th>
                    <th class="py-3 px-3 border-r border-slate-200">নাম</th>
                    <th class="py-3 px-3 border-r border-slate-200">পদবী</th>
                    <th class="py-3 px-3 border-r border-slate-200">মোবাইল নম্বর</th>
                    <th class="py-3 px-3 border-r border-slate-200">বিদ্যালয়ের নাম</th>
                    <th class="py-3 px-3">উপজেলা ও জেলা</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200">
                  ${tableRowsHtml}
                </tbody>
              </table>
            </div>

            <!-- Footer Signature/Disclaimer -->
            <div class="mt-16 pt-6 border-t border-slate-150 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-slate-400">
              <p>© ২০২৬ প্রাথমিক বিদ্যালয় অফিস সহায়ক বাংলাদেশ। সর্বস্বত্ব সংরক্ষিত।</p>
              <p>এটি সরকারি প্রাথমিক বিদ্যালয়ের কর্মচারীদের একটি স্বেচ্ছাসেবী অরাজনৈতিক কল্যাণ উদ্যোগ।</p>
            </div>
          </div>
        </div>

        <script>
          // Soft auto-trigger print dialog
          window.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
              window.print();
            }, 800);
          });
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  const exportToWord = () => {
    const approvedProfiles = profiles.filter(p => p.status === 'approved');
    if (approvedProfiles.length === 0) {
      alert("ডাউনলোড করার মতো কোনো অনুমোদিত প্রোফাইল নেই!");
      return;
    }

    const today = new Date().toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const tableRowsHtml = approvedProfiles.map((p, index) => `
      <tr style="border-bottom: 1px solid #cbd5e1;">
        <td style="padding: 8px; text-align: center; border: 1px solid #cbd5e1; font-family: sans-serif;">${index + 1}</td>
        <td style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold; font-family: sans-serif;">${p.fullName}</td>
        <td style="padding: 8px; border: 1px solid #cbd5e1; font-family: sans-serif;">${p.position}</td>
        <td style="padding: 8px; border: 1px solid #cbd5e1; font-family: sans-serif;">${p.phoneNumber}</td>
        <td style="padding: 8px; border: 1px solid #cbd5e1; font-family: sans-serif;">${p.schoolName}</td>
        <td style="padding: 8px; border: 1px solid #cbd5e1; font-family: sans-serif;">${p.upazila}, ${p.district}</td>
      </tr>
    `).join("");

    const wordContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <title>অনুমোদিত সদস্য তালিকা - প্রাথমিক বিদ্যালয় অফিস সহায়ক বাংলাদেশ</title>
        <meta charset="utf-8">
        <!--[if gte mso 9]>
        <xml>
          <w:WordDocument>
            <w:View>Print</w:View>
            <w:Zoom>100</w:Zoom>
            <w:DoNotOptimizeForBrowser/>
          </w:WordDocument>
        </xml>
        <![endif]-->
        <style>
          body {
            font-family: 'Hind Siliguri', 'Segoe UI', Arial, sans-serif;
            color: #1e293b;
            line-height: 1.5;
          }
          h1 {
            color: #065f46;
            font-size: 24px;
            margin-bottom: 5px;
            text-align: center;
          }
          p.subtitle {
            text-align: center;
            color: #64748b;
            font-size: 12px;
            margin-top: 0;
            margin-bottom: 20px;
          }
          .info-bar {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            padding: 10px;
            margin-bottom: 20px;
            font-size: 12px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 11px;
            margin-top: 10px;
          }
          th {
            background-color: #f1f5f9;
            color: #0f172a;
            font-weight: bold;
            padding: 10px 8px;
            border: 1px solid #cbd5e1;
            text-align: left;
          }
          td {
            padding: 8px;
            border: 1px solid #cbd5e1;
          }
        </style>
      </head>
      <body>
        <div style="max-w: 600px; margin: 0 auto;">
          <h1 style="text-align: center; color: #065f46; font-size: 24px; font-family: sans-serif;">প্রাথমিক বিদ্যালয় অফিস সহায়ক বাংলাদেশ</h1>
          <p style="text-align: center; color: #64748b; font-size: 12px; margin-top: 0; margin-bottom: 20px; font-family: sans-serif;">সকল সরকারি প্রাথমিক বিদ্যালয়ের দপ্তরী ও নৈশপ্রহরীদের সঠিক যোগাযোগ ও সাংগঠনিক তথ্য এক ক্লিকেই খুজে নিন।</p>
          
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 10px; margin-bottom: 20px; font-size: 12px;">
            <table style="width: 100%; border: none; margin: 0;">
              <tr style="border: none;">
                <td style="border: none; padding: 0; font-family: sans-serif; font-size: 12px;">রিপোর্ট জেনারেট তারিখ: <strong>${today}</strong></td>
                <td style="border: none; padding: 0; text-align: right; font-family: sans-serif; font-size: 12px; color: #065f46; font-weight: bold;">মোট অনুমোদিত সদস্য: ${approvedProfiles.length} জন</td>
              </tr>
            </table>
          </div>

          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background-color: #f1f5f9;">
                <th style="width: 8%; text-align: center; font-family: sans-serif; border: 1px solid #cbd5e1; padding: 10px 8px;">নং</th>
                <th style="font-family: sans-serif; border: 1px solid #cbd5e1; padding: 10px 8px;">নাম</th>
                <th style="font-family: sans-serif; border: 1px solid #cbd5e1; padding: 10px 8px;">পদবী</th>
                <th style="font-family: sans-serif; border: 1px solid #cbd5e1; padding: 10px 8px;">মোবাইল নম্বর</th>
                <th style="font-family: sans-serif; border: 1px solid #cbd5e1; padding: 10px 8px;">বিদ্যালয়ের নাম</th>
                <th style="font-family: sans-serif; border: 1px solid #cbd5e1; padding: 10px 8px;">উপজেলা ও জেলা</th>
              </tr>
            </thead>
            <tbody>
              ${tableRowsHtml}
            </tbody>
          </table>
          
          <div style="margin-top: 50px; border-top: 1px solid #e2e8f0; padding-top: 10px; font-size: 10px; color: #94a3b8; text-align: center; font-family: sans-serif;">
            <p>© ২০২৬ প্রাথমিক বিদ্যালয় অফিস সহায়ক বাংলাদেশ। সর্বস্বত্ব সংরক্ষিত। এটি সরকারি প্রাথমিক বিদ্যালয়ের কর্মচারীদের একটি স্বেচ্ছাসেবী অরাজনৈতিক কল্যাণ উদ্যোগ।</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob(["\uFEFF" + wordContent], { type: "application/msword;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Approved_Members_${new Date().toISOString().split('T')[0]}.doc`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadBackup = async () => {
    try {
      const token = sessionStorage.getItem("admin_token");
      const response = await fetch("/api/admin/backup", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error("ব্যাকআপ ফাইল জেনারেট করা সম্ভব হয়নি।");
      }
      const data = await response.json();
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `office_sahayak_backup_${new Date().toISOString().split('T')[0]}.json`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err: any) {
      alert(err.message || "ব্যাকআপ ডাউনলোডে সমস্যা হয়েছে।");
    }
  };

  const handleUploadBackup = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileInput = e.target;

    // Immediately show progress bar so the user sees it instantly upon selecting the file
    setRestoreProgress(5);
    setRestoreStatus("ব্যাকআপ ফাইল আপলোড করা হচ্ছে এবং রিডার প্রস্তুত করা হচ্ছে...");

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        // Step 1: Reading file content (simulate visual load)
        setRestoreProgress(20);
        setRestoreStatus("ব্যাকআপ ফাইল পড়া হচ্ছে...");
        await new Promise(resolve => setTimeout(resolve, 500));

        // Step 2: Parsing JSON
        setRestoreProgress(45);
        setRestoreStatus("ডাটা ফরম্যাট যাচাই করা হচ্ছে...");
        await new Promise(resolve => setTimeout(resolve, 500));

        const json = JSON.parse(event.target?.result as string);
        
        let payload: any = {};
        if (Array.isArray(json)) {
          payload = { profiles: json };
        } else if (json && typeof json === "object") {
          if (Array.isArray(json.profiles)) {
            payload = { profiles: json.profiles, settings: json.settings };
          } else {
            throw new Error("ফাইলটিতে সঠিক প্রোফাইল ডাটা খুঁজে পাওয়া যায়নি।");
          }
        } else {
          throw new Error("অকার্যকর ব্যাকআপ ফাইল ফরম্যাট!");
        }

        // Step 3: Server transmission
        setRestoreProgress(70);
        setRestoreStatus("সার্ভারে ডাটা পাঠানো হচ্ছে ও ডাটাবেজ আপডেট হচ্ছে...");
        await new Promise(resolve => setTimeout(resolve, 600));

        const token = sessionStorage.getItem("admin_token");
        const response = await fetch("/api/admin/restore", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });

        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.error || "সার্ভারে রিস্টোর করতে ব্যর্থ হয়েছে।");
        }

        // Step 4: Finished! Success transition
        setRestoreProgress(100);
        setRestoreStatus("ডাটা সফলভাবে রিস্টোর হয়েছে এবং সংযুক্ত করা হয়েছে! ওয়েবসাইট এখন অটোমেটিক রিলোড হচ্ছে...");

        sessionStorage.setItem("restore_success_msg", "অভিনন্দন! ডেটা সফলভাবে রিস্টোর সম্পন্ন হয়েছে এবং ওয়েবসাইট আপডেট হয়েছে।");

        // Pause for 2 seconds so they can see "Data Updated" and success animations
        await new Promise(resolve => setTimeout(resolve, 2000));
        setRestoreProgress(null);
        window.location.reload();

      } catch (err: any) {
        setRestoreProgress(null);
        alert("রিস্টোর করতে সমস্যা হয়েছে: " + err.message);
      } finally {
        if (fileInput) {
          fileInput.value = ""; // reset file input
        }
      }
    };
    
    // Start reading file after progress is set up
    setTimeout(() => {
      reader.readAsText(file);
    }, 100);
  };

  const showConfirm = (title: string, message: string, onConfirm: () => void, confirmText = "হ্যাঁ, ডিলিট/সংরক্ষণ করুন", cancelText = "না, ফিরে যান") => {
    setConfirmModal({
      isOpen: true,
      title,
      message,
      onConfirm: () => {
        onConfirm();
        setConfirmModal(null);
      },
      confirmText,
      cancelText
    });
  };

  const executeApprove = async (id: string) => {
    setActionLoadingId(id);
    try {
      const token = sessionStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/approve/${id}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (response.ok) {
        setProfiles(prev => prev.map(p => p.id === id ? { ...p, status: 'approved' } : p));
        if (selectedReviewProfile?.id === id) {
          setSelectedReviewProfile(prev => prev ? { ...prev, status: 'approved' } : null);
        }
      }
    } catch (error) {
      console.error("Error approving profile:", error);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleApprove = (id: string) => {
    showConfirm(
      "আবেদন অনুমোদন নিশ্চিতকরণ",
      "আপনি কি নিশ্চিতভাবে এই আবেদনটি অনুমোদন করতে চান?",
      () => executeApprove(id),
      "হ্যাঁ, অনুমোদন করুন",
      "না"
    );
  };

  const executeReject = async (id: string) => {
    setActionLoadingId(id);
    try {
      const token = sessionStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/reject/${id}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (response.ok) {
        setProfiles(prev => prev.map(p => p.id === id ? { ...p, status: 'rejected' } : p));
        if (selectedReviewProfile?.id === id) {
          setSelectedReviewProfile(prev => prev ? { ...prev, status: 'rejected' } : null);
        }
      }
    } catch (error) {
      console.error("Error rejecting profile:", error);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleReject = (id: string) => {
    showConfirm(
      "আবেদন বাতিল নিশ্চিতকরণ",
      "আপনি কি নিশ্চিতভাবে এই আবেদনটির অনুমোদন বাতিল করতে চান?",
      () => executeReject(id),
      "হ্যাঁ, বাতিল করুন",
      "না"
    );
  };

  const executeDelete = async (id: string) => {
    setActionLoadingId(id);
    try {
      const token = sessionStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/delete/${id}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (response.ok) {
        setProfiles(prev => prev.filter(p => p.id !== id));
        setSelectedReviewProfile(null);
      }
    } catch (error) {
      console.error("Error deleting profile:", error);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDelete = (id: string) => {
    showConfirm(
      "চিরতরে ডিলিট করার সতর্কবার্তা",
      "আপনি কি নিশ্চিতভাবে এই প্রোফাইলটি চিরতরে ডিলিট করতে চান? এই কাজ আর ফেরত আনা যাবে না।",
      () => executeDelete(id),
      "হ্যাঁ, ডিলিট করুন",
      "না"
    );
  };

  // Editing logic
  const startEditing = (profile: Profile) => {
    setEditFullName(profile.fullName || "");
    setEditUsername(profile.username || "");
    setEditPhoneNumber(profile.phoneNumber || "");
    setEditFacebookUrl(profile.facebookUrl || "");
    setEditPosition(profile.position || "");
    setEditDistrict(profile.district || "");
    setEditUpazila(profile.upazila || "");
    setEditUnionName(profile.unionName || "");
    setEditSchoolName(profile.schoolName || "");
    setEditAboutMe(profile.aboutMe || "");
    setEditFatherName(profile.fatherName || "");
    setEditMotherName(profile.motherName || "");
    setEditEmail(profile.email || "");
    setEditAddress(profile.address || "");
    setIsEditing(true);
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditDistrict(e.target.value);
    setEditUpazila("");
    setEditUnionName("");
    setEditSchoolName("");
  };

  const handleUpazilaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditUpazila(e.target.value);
    setEditUnionName("");
    setEditSchoolName("");
  };

  const handleUnionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditUnionName(e.target.value);
    setEditSchoolName("");
  };

  const [districtsList, setDistrictsList] = useState<GeoDistrict[]>([]);
  const [upazilasList, setUpazilasList] = useState<GeoUpazila[]>([]);
  const [unionsList, setUnionsList] = useState<GeoUnion[]>([]);
  const [schoolsList, setSchoolsList] = useState<string[]>([]);

  useEffect(() => {
    getDistricts().then(setDistrictsList);
  }, []);

  useEffect(() => {
    if (editDistrict) {
      getUpazilas(editDistrict).then(setUpazilasList);
    } else {
      setUpazilasList([]);
    }
  }, [editDistrict]);

  useEffect(() => {
    if (editDistrict && editUpazila) {
      getUnions(editDistrict, editUpazila).then(setUnionsList);
    } else {
      setUnionsList([]);
    }
  }, [editDistrict, editUpazila]);

  useEffect(() => {
    if (editUnionName) {
      getGeneratedSchools(editUnionName).then(setSchoolsList);
    } else {
      setSchoolsList([]);
    }
  }, [editUnionName]);

  const editAvailableUpazilas = useMemo(() => upazilasList.map(u => u.bn_name), [upazilasList]);
  const editAvailableUnions = useMemo(() => unionsList.map(u => ({ name: u.bn_name })), [unionsList]);
  const editAvailableSchools = useMemo(() => schoolsList, [schoolsList]);

  const executeUpdateProfile = async (id: string) => {
    setActionLoadingId(id);
    try {
      const token = sessionStorage.getItem("admin_token");
      const updatedFields = {
        fullName: editFullName,
        username: editUsername,
        phoneNumber: editPhoneNumber,
        facebookUrl: editFacebookUrl,
        position: editPosition,
        district: editDistrict,
        upazila: editUpazila,
        unionName: editUnionName,
        schoolName: editSchoolName,
        aboutMe: editAboutMe,
        fatherName: editFatherName,
        motherName: editMotherName,
        email: editEmail,
        address: editAddress
      };

      const response = await fetch(`/api/admin/update/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(updatedFields)
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Update local state
          setProfiles(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
          setSelectedReviewProfile(prev => prev ? { ...prev, ...updatedFields } : null);
          setIsEditing(false);
        }
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleUpdateProfile = (id: string) => {
    showConfirm(
      "প্রোফাইল তথ্য সংশোধন",
      "আপনি কি আপনার করা পরিবর্তনসমূহ সংরক্ষণ করতে চান?",
      () => executeUpdateProfile(id),
      "হ্যাঁ, সংরক্ষণ করুন",
      "না"
    );
  };

  // Filter profiles based on selected tab
  const filteredProfiles = profiles.filter(p => p.status === activeTab);

  // Stats calculation
  const totalCount = profiles.length;
  const pendingCount = profiles.filter(p => p.status === 'pending').length;
  const approvedCount = profiles.filter(p => p.status === 'approved').length;
  const rejectedCount = profiles.filter(p => p.status === 'rejected').length;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans relative">
      
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 animate-bounce max-w-sm w-full bg-slate-950/95 border text-white rounded-2xl p-4 shadow-2xl flex items-start gap-3 backdrop-blur-md ${
          toast.type === 'success' ? 'border-emerald-500/30' : 'border-rose-500/30'
        }`}>
          <div className={`p-2 rounded-xl border ${
            toast.type === 'success' 
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
              : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
          }`}>
            {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
          </div>
          <div className="flex-1">
            <h5 className={`text-xs font-extrabold ${toast.type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
              {toast.type === 'success' ? 'কার্যক্রম সফল' : 'ত্রুটি ঘটেছে'}
            </h5>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed font-bold">{toast.message}</p>
          </div>
          <button onClick={() => setToast(null)} className="text-slate-400 hover:text-white transition-all cursor-pointer">
            <X size={14} />
          </button>
        </div>
      )}
      
      {/* Admin Login Portal screen */}
      {!isLoggedIn ? (
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          
          <button 
            onClick={onBackToHome}
            className="mb-6 inline-flex items-center gap-2 py-2 px-4 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-all border border-slate-700"
          >
            <ArrowLeft size={14} />
            মূল ওয়েবসাইটে ফিরে যান
          </button>

          <div className="bg-slate-800 rounded-3xl p-8 w-full max-w-md border border-slate-700 shadow-2xl relative overflow-hidden">
            
            {/* Top red-green branding line representing Bangladesh flag */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-emerald-600 to-emerald-700"></div>

            {/* PASSWORD RECOVERY MODE */}
            {isRecovering ? (
              <div>
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-14 h-14 bg-indigo-950 border border-indigo-500/30 rounded-2xl flex items-center justify-center text-indigo-400 mb-3 shadow-inner">
                    <ShieldCheck size={30} className="text-indigo-400" />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight text-white">পাসওয়ার্ড রিকভারি</h2>
                  <p className="text-xs text-slate-400 mt-1">ইমেইল অথবা মোবাইল নাম্বারে ওটিপি ওয়ান-টাইম কোড পাঠান</p>
                </div>

                {recoveryError && (
                  <div className="bg-rose-900/40 text-rose-300 px-4 py-3 border border-rose-800 rounded-2xl text-xs mb-5 text-center leading-relaxed">
                    ⚠️ {recoveryError}
                  </div>
                )}

                {recoveryMessage && (
                  <div className="bg-emerald-900/40 text-emerald-300 px-4 py-3 border border-emerald-800 rounded-2xl text-xs mb-5 text-center leading-relaxed font-bold">
                    ✅ {recoveryMessage}
                  </div>
                )}

                {devOtpNotice && (
                  <div className="bg-indigo-950 border border-indigo-800 text-indigo-300 px-4 py-3 rounded-2xl text-xs mb-5 leading-relaxed font-semibold">
                    💡 {devOtpNotice}
                  </div>
                )}

                {recoveryStep === 1 ? (
                  <form onSubmit={handleForgotPassword} className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-2">কোড পাঠানোর মাধ্যম সিলেক্ট করুন:</label>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <button
                          type="button"
                          onClick={() => {
                            setRecoveryMethod('email');
                            setRecoveryInput('');
                            setRecoveryError('');
                          }}
                          className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                            recoveryMethod === 'email'
                              ? 'bg-indigo-600 border-indigo-500 text-white'
                              : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-white'
                          }`}
                        >
                          📧 ইমেইল (Email)
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setRecoveryMethod('phone');
                            setRecoveryInput('');
                            setRecoveryError('');
                          }}
                          className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                            recoveryMethod === 'phone'
                              ? 'bg-indigo-600 border-indigo-500 text-white'
                              : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-white'
                          }`}
                        >
                          📱 মোবাইল নাম্বার
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1.5">
                        {recoveryMethod === 'email' ? 'নিবন্ধিত ইমেইল ঠিকানা' : 'নিবন্ধিত মোবাইল নাম্বার'}
                      </label>
                      <input
                        type={recoveryMethod === 'email' ? "email" : "text"}
                        required
                        value={recoveryInput}
                        onChange={(e) => setRecoveryInput(e.target.value)}
                        placeholder={recoveryMethod === 'email' ? "উদাহরণ: rifat@example.com" : "উদাহরণ: 017XXXXXXXX"}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900/60 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                      />
                    </div>

                    <div className="flex flex-col gap-2 pt-2">
                      <button
                        type="submit"
                        disabled={recoveryLoading}
                        className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-700 text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm disabled:cursor-not-allowed"
                      >
                        {recoveryLoading ? "কোড পাঠানো হচ্ছে..." : "ওটিপি (OTP) কোড পাঠান"}
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => {
                          setIsRecovering(false);
                          setRecoveryStep(1);
                          setRecoveryError("");
                          setRecoveryMessage("");
                          setDevOtpNotice("");
                        }}
                        className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-950 text-slate-400 hover:text-white border border-slate-700 font-bold rounded-xl transition-all text-xs"
                      >
                        লগইনে ফিরে যান
                      </button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleResetPassword} className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1.5">৬-ডিজিটের ওটিপি কোড (OTP Code)</label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={recoveryOtp}
                        onChange={(e) => setRecoveryOtp(e.target.value)}
                        placeholder="ভেরিফিকেশন কোড লিখুন"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900/60 text-slate-100 text-center tracking-widest font-mono text-lg font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1.5">নতুন পাসওয়ার্ড (New Password)</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-3 text-slate-500">
                          <Lock size={16} />
                        </span>
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="কমপক্ষে ৪ সংখ্যার পাসওয়ার্ড লিখুন"
                          className="w-full pl-10 pr-11 py-2.5 rounded-xl border border-slate-700 bg-slate-900/60 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-200 transition-colors focus:outline-none"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 pt-2">
                      <button
                        type="submit"
                        disabled={recoveryLoading}
                        className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-700 text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm disabled:cursor-not-allowed"
                      >
                        {recoveryLoading ? "পরিবর্তন করা হচ্ছে..." : "পাসওয়ার্ড সফলভাবে পরিবর্তন করুন"}
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => {
                          setRecoveryStep(1);
                          setRecoveryError("");
                          setRecoveryMessage("");
                          setDevOtpNotice("");
                        }}
                        className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-950 text-slate-400 hover:text-white border border-slate-700 font-bold rounded-xl transition-all text-xs"
                      >
                        পুনরায় কোড পাঠান
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ) : requiresOtp ? (
              /* TWO FACTOR OTP SCREEN */
              <div>
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-14 h-14 bg-emerald-950 border border-emerald-500/30 rounded-2xl flex items-center justify-center text-emerald-400 mb-3 shadow-inner animate-pulse">
                    <ShieldCheck size={30} className="text-emerald-400" />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight text-white">২-ধাপ ভেরিফিকেশন কোড</h2>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                    আপনার নিবন্ধিত ইমেইলে (<span className="text-emerald-400 font-bold">mdrifatbhuiyan27@gmail.com</span>) একটি ভেরিফিকেশন ওটিপি পাঠানো হয়েছে। অনুগ্রহ করে কোডটি দিন।
                  </p>
                </div>

                {loginError && (
                  <div className="bg-rose-900/40 text-rose-300 px-4 py-3 border border-rose-800 rounded-2xl text-xs mb-5 text-center leading-relaxed">
                    ⚠️ {loginError}
                  </div>
                )}

                {devOtpNotice && (
                  <div className="bg-amber-950 border border-amber-800 text-amber-300 px-4 py-3 rounded-2xl text-xs mb-5 leading-relaxed font-semibold">
                    💡 {devOtpNotice}
                  </div>
                )}

                <form onSubmit={handleVerifyLoginOtp} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-2 text-center">৬-ডিজিটের ভেরিফিকেশন ওটিপি (Verification OTP)</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={loginOtp}
                      onChange={(e) => setLoginOtp(e.target.value)}
                      placeholder="XXXXXX"
                      className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-900/60 text-slate-100 text-center tracking-widest font-mono text-xl font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    />
                  </div>

                  <div className="flex flex-col gap-2 pt-2">
                    <button
                      type="submit"
                      disabled={loginLoading}
                      className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-700 text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm disabled:cursor-not-allowed"
                    >
                      {loginLoading ? "যাচাই করা হচ্ছে..." : "কোড ভেরিফাই ও প্রবেশ করুন"}
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => {
                        setRequiresOtp(false);
                        setLoginOtp("");
                        setLoginError("");
                        setDevOtpNotice("");
                      }}
                      className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-950 text-slate-400 hover:text-white border border-slate-700 font-bold rounded-xl transition-all text-xs"
                    >
                      লগইনে ফিরে যান
                    </button>
                  </div>
                </form>
              </div>
            ) : false ? (
              /* ADMIN SIGN UP FORM */
              <div>
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-14 h-14 bg-emerald-950 border border-emerald-500/30 rounded-2xl flex items-center justify-center text-emerald-400 mb-3 shadow-inner">
                    <User size={30} />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight text-white">নতুন এডমিন সাইন-আপ</h2>
                  <p className="text-xs text-slate-400 mt-1">আবেদন সাবমিট করুন, প্রধান এডমিনের অনুমোদনের পর লগইন করতে পারবেন</p>
                </div>

                {adminRegSuccessMsg && (
                  <div className="bg-emerald-900/40 text-emerald-300 px-4 py-3 border border-emerald-800 rounded-2xl text-xs mb-5 text-center leading-relaxed font-bold">
                    ✅ {adminRegSuccessMsg}
                  </div>
                )}

                {adminRegErrorMsg && (
                  <div className="bg-rose-900/40 text-rose-300 px-4 py-3 border border-rose-800 rounded-2xl text-xs mb-5 text-center leading-relaxed">
                    ⚠️ {adminRegErrorMsg}
                  </div>
                )}

                <form onSubmit={handleAdminSignUp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">পূর্ণ নাম (Full Name)</label>
                    <input
                      type="text"
                      required
                      value={adminRegFullName}
                      onChange={(e) => setAdminRegFullName(e.target.value)}
                      placeholder="যেমন: মোঃ রিফাত ভুঁইয়া"
                      className="w-full px-4 py-2 rounded-xl border border-slate-700 bg-slate-900/60 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">ইউজারনেম (Username)</label>
                    <input
                      type="text"
                      required
                      value={adminRegUsername}
                      onChange={(e) => setAdminRegUsername(e.target.value.trim().toLowerCase())}
                      placeholder="যেমন: rifatadmin"
                      className="w-full px-4 py-2 rounded-xl border border-slate-700 bg-slate-900/60 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">পাসওয়ার্ড (Password)</label>
                    <input
                      type="password"
                      required
                      value={adminRegPassword}
                      onChange={(e) => setAdminRegPassword(e.target.value)}
                      placeholder="কমপক্ষে ৪ সংখ্যার পাসওয়ার্ড দিন"
                      className="w-full px-4 py-2 rounded-xl border border-slate-700 bg-slate-900/60 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">ইমেইল ঠিকানা (Email Address)</label>
                    <input
                      type="email"
                      required
                      value={adminRegEmail}
                      onChange={(e) => setAdminRegEmail(e.target.value)}
                      placeholder="যেমন: mdrifatbhuiyan27@gmail.com"
                      className="w-full px-4 py-2 rounded-xl border border-slate-700 bg-slate-900/60 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">মোবাইল নম্বর (Phone Number)</label>
                    <input
                      type="text"
                      required
                      value={adminRegPhone}
                      onChange={(e) => setAdminRegPhone(e.target.value)}
                      placeholder="যেমন: 017XXXXXXXX"
                      className="w-full px-4 py-2 rounded-xl border border-slate-700 bg-slate-900/60 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    />
                  </div>

                  <div className="flex flex-col gap-2 pt-2">
                    <button
                      type="submit"
                      disabled={adminRegLoading}
                      className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-700 text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm disabled:cursor-not-allowed"
                    >
                      {adminRegLoading ? "প্রসেস হচ্ছে..." : "সাইন-আপ আবেদন জমা দিন"}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsAdminRegistering(false);
                        setAdminRegErrorMsg("");
                        setAdminRegSuccessMsg("");
                      }}
                      className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-950 text-slate-400 hover:text-white border border-slate-700 font-bold rounded-xl transition-all text-xs"
                    >
                      লগইন স্ক্রিনে ফিরে যান
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              /* REGULAR LOGIN FORM */
              <div>
                <div className="flex flex-col items-center text-center mb-8">
                  <div className="w-14 h-14 bg-emerald-950 border border-emerald-500/30 rounded-2xl flex items-center justify-center text-emerald-400 mb-3 shadow-inner">
                    <ShieldCheck size={30} />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight text-white">এডমিন প্যানেল</h2>
                  <p className="text-xs text-slate-400 mt-1">প্রশাসনিক কাজের জন্য শুধুমাত্র অনুমোদিত এক্সেস</p>
                </div>

                {loginError && (
                  <div className="bg-rose-900/40 text-rose-300 px-4 py-3 border border-rose-800 rounded-2xl text-xs mb-6 text-center leading-relaxed">
                    ⚠️ {loginError}
                  </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1.5">ইউজারনেম (Username)</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-3 text-slate-500">
                        <User size={16} />
                      </span>
                      <input
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="ইউজারনেম লিখুন"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900/60 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-xs font-bold text-slate-400">পাসওয়ার্ড (Password)</label>
                    </div>
                    <div className="relative">
                      <span className="absolute left-3.5 top-3 text-slate-500">
                        <Lock size={16} />
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="পাসওয়ার্ড লিখুন"
                        className="w-full pl-10 pr-11 py-2.5 rounded-xl border border-slate-700 bg-slate-900/60 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-200 transition-colors focus:outline-none"
                        title={showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখান"}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loginLoading}
                    className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-700 text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm mt-2 disabled:cursor-not-allowed"
                  >
                    {loginLoading ? "যাচাই করা হচ্ছে..." : "এডমিন প্যানেলে প্রবেশ করুন"}
                  </button>


                </form>
              </div>
            )}
          </div>
        </div>
      ) : (
        
        /* Admin Dashboard Container */
        <div className="flex-1 flex flex-col">
          
          {/* Header */}
          <header className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-950 text-emerald-400 rounded-xl flex items-center justify-center border border-emerald-500/20">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h1 className="font-bold text-lg text-white">অফিস সহায়ক এডমিন কন্ট্রোল</h1>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">System Status: Secure</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button 
                onClick={fetchProfiles}
                className="p-2 bg-slate-900 hover:bg-slate-950 rounded-xl text-slate-400 hover:text-white border border-slate-750 transition-all"
                title="রিফ্রেশ করুন"
              >
                <RefreshCw size={16} className={loadingProfiles ? "animate-spin" : ""} />
              </button>

              <button 
                onClick={onBackToHome}
                className="py-2 px-3.5 bg-slate-900 hover:bg-slate-950 rounded-xl text-xs font-bold text-slate-300 hover:text-white border border-slate-750 transition-all flex items-center gap-1.5"
              >
                <ArrowLeft size={14} />
                মূল সাইট
              </button>

              <button 
                onClick={handleLogout}
                className="py-2 px-3.5 bg-rose-950/50 hover:bg-rose-900 text-xs font-bold text-rose-300 rounded-xl border border-rose-900/50 transition-all flex items-center gap-1.5"
              >
                <LogOut size={14} />
                লগআউট
              </button>
            </div>
          </header>

          {/* Stats Bar */}
          <main className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-800 rounded-2xl p-4 border border-slate-750">
                <span className="block text-xs text-slate-400 font-bold mb-1">মোট আবেদন</span>
                <span className="text-3xl font-bold text-white font-mono">{totalCount}</span>
              </div>

              <div className="bg-slate-800 rounded-2xl p-4 border border-slate-750 flex items-center justify-between">
                <div>
                  <span className="block text-xs text-amber-400 font-bold mb-1">🕒 অপেক্ষমান</span>
                  <span className="text-3xl font-bold text-white font-mono">{pendingCount}</span>
                </div>
                <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
                  <Clock size={18} />
                </div>
              </div>

              <div className="bg-slate-800 rounded-2xl p-4 border border-slate-750 flex items-center justify-between">
                <div>
                  <span className="block text-xs text-emerald-400 font-bold mb-1">✅ অনুমোদিত</span>
                  <span className="text-3xl font-bold text-white font-mono">{approvedCount}</span>
                </div>
                <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
                  <CheckCircle size={18} />
                </div>
              </div>

              <div className="bg-slate-800 rounded-2xl p-4 border border-slate-750 flex items-center justify-between">
                <div>
                  <span className="block text-xs text-rose-400 font-bold mb-1">❌ বাতিলকৃত</span>
                  <span className="text-3xl font-bold text-white font-mono">{rejectedCount}</span>
                </div>
                <div className="p-2.5 bg-rose-500/10 text-rose-400 rounded-xl border border-rose-500/20">
                  <AlertTriangle size={18} />
                </div>
              </div>
            </div>

            {/* System Backup & Restore Section */}
            <div className="bg-gradient-to-r from-slate-800 to-indigo-950/40 rounded-3xl p-5 border border-indigo-500/20 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-500/10 text-indigo-400 rounded-xl flex items-center justify-center border border-indigo-500/20 shrink-0">
                  <Database size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">সিস্টেম ব্যাকআপ ও ডাটা রিস্টোর (System Backup & Restore)</h3>
                  <p className="text-xs text-slate-400 mt-0.5">সব সদস্যের তথ্য (অপেক্ষমান, অনুমোদিত, বাতিলকৃত) এবং ওয়েবসাইটের কাস্টমাইজেশন ব্যাকআপ রাখুন ও পুনরায় লোড করুন</p>
                </div>
              </div>
              <div className="flex items-center gap-3 self-stretch md:self-auto flex-wrap sm:flex-nowrap">
                <button
                  onClick={handleDownloadBackup}
                  className="w-full sm:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  title="সম্পূর্ণ ব্যাকআপ ফাইল (.json) ডাউনলোড করুন"
                >
                  <DownloadCloud size={14} />
                  ব্যাকআপ ফাইল ডাউনলোড করুন
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full sm:w-auto px-4 py-2 bg-slate-700 hover:bg-slate-650 text-slate-200 hover:text-white rounded-xl text-xs font-bold border border-slate-600 transition-all flex items-center justify-center gap-1.5 cursor-pointer relative"
                >
                  <UploadCloud size={14} />
                  রিস্টোর করুন (Upload JSON)
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".json"
                  onChange={handleUploadBackup}
                  className="hidden"
                />
              </div>
            </div>

            {/* Main Admin Grid Tab Content */}
            <div className="bg-slate-800 rounded-3xl border border-slate-750 overflow-hidden shadow-xl">
              
              {/* Tab headers */}
              <div className="bg-slate-850 border-b border-slate-750 px-6 py-2 flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab('pending')}
                    className={`py-3 px-4 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 border-b-2 ${
                      activeTab === 'pending' 
                        ? 'text-amber-400 border-amber-400 bg-slate-800' 
                        : 'text-slate-400 border-transparent hover:text-slate-200'
                    }`}
                  >
                    🕒 অপেক্ষমান আবেদন ({pendingCount})
                  </button>

                  <button
                    onClick={() => setActiveTab('approved')}
                    className={`py-3 px-4 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 border-b-2 ${
                      activeTab === 'approved' 
                        ? 'text-emerald-400 border-emerald-400 bg-slate-800' 
                        : 'text-slate-400 border-transparent hover:text-slate-200'
                    }`}
                  >
                    ✅ অনুমোদিত সদস্য ({approvedCount})
                  </button>

                  <button
                    onClick={() => setActiveTab('rejected')}
                    className={`py-3 px-4 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 border-b-2 ${
                      activeTab === 'rejected' 
                        ? 'text-rose-400 border-rose-400 bg-slate-800' 
                        : 'text-slate-400 border-transparent hover:text-slate-200'
                    }`}
                  >
                    ❌ বাতিলকৃত আবেদন ({rejectedCount})
                  </button>

                  <button
                    onClick={() => setActiveTab('webedit')}
                    className={`py-3 px-4 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 border-b-2 ${
                      activeTab === 'webedit' 
                        ? 'text-indigo-400 border-indigo-400 bg-slate-800' 
                        : 'text-slate-400 border-transparent hover:text-slate-200'
                    }`}
                  >
                    ⚙️ ওয়েব এডিট সেটিংস (WebEdit)
                  </button>

                  <button
                    onClick={() => setActiveTab('webseo')}
                    className={`py-3 px-4 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 border-b-2 ${
                      activeTab === 'webseo' 
                        ? 'text-cyan-400 border-cyan-400 bg-slate-800' 
                        : 'text-slate-400 border-transparent hover:text-slate-200'
                    }`}
                  >
                    🔍 ওয়েবএসইও সেটিংস (WebSEO)
                  </button>

                  <button
                    onClick={() => setActiveTab('ai_routing')}
                    className={`py-3 px-4 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 border-b-2 ${
                      activeTab === 'ai_routing' 
                        ? 'text-emerald-400 border-emerald-400 bg-slate-800' 
                        : 'text-slate-400 border-transparent hover:text-slate-200'
                    }`}
                  >
                    🤖 এআই সহকারী (SOHOKARI)
                  </button>

                  <button
                    onClick={() => setActiveTab('ai_chats')}
                    className={`py-3 px-4 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 border-b-2 ${
                      activeTab === 'ai_chats' 
                        ? 'text-teal-400 border-teal-400 bg-slate-800' 
                        : 'text-slate-400 border-transparent hover:text-slate-200'
                    }`}
                  >
                    💬 রিয়েল-টাইম চ্যাট ({chatSessions.length})
                  </button>

                  <button
                    onClick={() => setActiveTab('live_messages')}
                    className={`py-3 px-4 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 border-b-2 ${
                      activeTab === 'live_messages' 
                        ? 'text-pink-400 border-pink-400 bg-slate-800' 
                        : 'text-slate-400 border-transparent hover:text-slate-200'
                    }`}
                  >
                    💬 লাইভ মেসেজ (Live Support)
                  </button>
                </div>

                {activeTab === 'approved' && approvedCount > 0 && (
                  <div className="flex items-center gap-2 flex-wrap py-1">
                    <span className="text-[11px] text-slate-400 font-bold hidden lg:inline">ডাউনলোড করুন:</span>
                    <button
                      onClick={exportToXLSX}
                      className="px-3 py-1.5 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/30 hover:border-emerald-500 text-[11px] font-bold text-emerald-400 rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                      title="এক্সেল ফাইল (.xlsx) হিসেবে ডাউনলোড করুন"
                    >
                      <FileSpreadsheet size={13} />
                      Excel (.xlsx)
                    </button>
                    <button
                      onClick={exportToCSV}
                      className="px-3 py-1.5 bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/30 hover:border-cyan-500 text-[11px] font-bold text-cyan-400 rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                      title="সিএসভি ফাইল (.csv) হিসেবে ডাউনলোড করুন"
                    >
                      <FileDown size={13} />
                      CSV (.csv)
                    </button>
                    <button
                      onClick={exportToPDF}
                      className="px-3 py-1.5 bg-rose-950/80 hover:bg-rose-900 border border-rose-500/30 hover:border-rose-500 text-[11px] font-bold text-rose-400 rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                      title="পিডিএফ ফাইল (.pdf) হিসেবে প্রিন্ট বা সেভ করুন"
                    >
                      <FileText size={13} />
                      PDF (.pdf)
                    </button>
                    <button
                      onClick={exportToWord}
                      className="px-3 py-1.5 bg-blue-950/80 hover:bg-blue-900 border border-blue-500/30 hover:border-blue-500 text-[11px] font-bold text-blue-400 rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                      title="ওয়ার্ড ফাইল (.doc) হিসেবে ডাউনলোড করুন"
                    >
                      <File size={13} />
                      Word (.doc)
                    </button>
                  </div>
                )}
              </div>

              {/* Grid content */}
              <div className="p-6">
                {activeTab === 'webedit' ? (
                  <WebEditSettings />
                ) : activeTab === 'webseo' ? (
                  <WebSEO />
                ) : activeTab === 'ai_routing' ? (
                  renderAiRoutingTab()
                ) : activeTab === 'ai_chats' ? (
                  renderAiChatsTab()
                ) : activeTab === 'live_messages' ? (
                  renderLiveMessagesTab()
                ) : loadingProfiles ? (
                  <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
                    <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-400 text-sm">ডাটা লোড হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন...</p>
                  </div>
                ) : filteredProfiles.length === 0 ? (
                  <div className="py-24 text-center text-slate-500">
                    <p className="text-sm font-semibold">কোনো প্রোফাইল পাওয়া যায়নি।</p>
                    <p className="text-xs mt-1">সবকিছু আপ-টু-ডেট আছে!</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-slate-700 text-slate-400 text-xs font-bold">
                          <th className="py-3.5 px-4">নাম ও পদবী</th>
                          <th className="py-3.5 px-4">মোবাইল</th>
                          <th className="py-3.5 px-4">প্রতিষ্ঠান</th>
                          <th className="py-3.5 px-4">অবস্থান</th>
                          <th className="py-3.5 px-4 text-right">কার্যক্রম</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-700/50">
                        {filteredProfiles.map((p) => (
                          <tr key={p.id} className="hover:bg-slate-750/30 transition-all text-slate-300">
                            <td className="py-4 px-4">
                              <div className="font-semibold text-white">{p.fullName}</div>
                              <div className="text-xs text-slate-400 mt-0.5">{p.position}</div>
                            </td>
                            <td className="py-4 px-4 font-mono text-xs">{p.phoneNumber}</td>
                            <td className="py-4 px-4 max-w-[180px] truncate" title={p.schoolName}>
                              {p.schoolName}
                            </td>
                            <td className="py-4 px-4 text-xs">
                              {p.upazila}, {p.district}
                            </td>
                            <td className="py-4 px-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => setSelectedReviewProfile(p)}
                                  className="p-2 bg-slate-700 hover:bg-slate-650 rounded-lg text-slate-300 hover:text-white transition-all"
                                  title="আবেদন পর্যালোচনা করুন"
                                >
                                  <Eye size={14} />
                                </button>

                                {activeTab === "pending" && (
                                  <>
                                    <button
                                      onClick={() => handleApprove(p.id)}
                                      disabled={actionLoadingId === p.id}
                                      className="p-2 bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 text-emerald-400 rounded-lg transition-all disabled:opacity-40"
                                      title="অনুমোদন করুন"
                                    >
                                      <Check size={14} />
                                    </button>
                                    <button
                                      onClick={() => handleReject(p.id)}
                                      disabled={actionLoadingId === p.id}
                                      className="p-2 bg-rose-950/50 hover:bg-rose-900 border border-rose-900/50 text-rose-300 rounded-lg transition-all disabled:opacity-40"
                                      title="বাতিল করুন"
                                    >
                                      <X size={14} />
                                    </button>
                                  </>
                                )}

                                {activeTab === "approved" && (
                                  <>
                                    <button
                                      onClick={() => handleReject(p.id)}
                                      disabled={actionLoadingId === p.id}
                                      className="p-2 bg-rose-950/50 hover:bg-rose-900 border border-rose-900/50 text-rose-300 rounded-lg transition-all disabled:opacity-40"
                                      title="বাতিল করুন"
                                    >
                                      <X size={14} />
                                    </button>
                                    <button
                                      onClick={() => handleDelete(p.id)}
                                      disabled={actionLoadingId === p.id}
                                      className="p-2 bg-slate-900 hover:bg-red-950 hover:text-red-400 border border-slate-750 hover:border-red-900 text-slate-400 rounded-lg transition-all disabled:opacity-40"
                                      title="ডিলেট করুন"
                                    >
                                      <Trash2 size={14} />
                                    </button>
                                  </>
                                )}

                                {activeTab === "rejected" && (
                                  <>
                                    <button
                                      onClick={() => handleApprove(p.id)}
                                      disabled={actionLoadingId === p.id}
                                      className="p-2 bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 text-emerald-400 rounded-lg transition-all disabled:opacity-40"
                                      title="অনুমোদন করুন"
                                    >
                                      <Check size={14} />
                                    </button>
                                    <button
                                      onClick={() => handleDelete(p.id)}
                                      disabled={actionLoadingId === p.id}
                                      className="p-2 bg-slate-900 hover:bg-red-950 hover:text-red-400 border border-slate-750 hover:border-red-900 text-slate-400 rounded-lg transition-all disabled:opacity-40"
                                      title="ডিলেট করুন"
                                    >
                                      <Trash2 size={14} />
                                    </button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      )}

      {/* Internal review detail modal for the admin */}
      {selectedReviewProfile && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-slate-800 rounded-3xl w-full max-w-lg border border-slate-700 shadow-2xl overflow-hidden text-slate-200">
            
            {/* Header banner */}
            <div className="bg-slate-850 p-5 border-b border-slate-700 flex items-center justify-between">
              <div>
                <h3 className="text-md font-bold text-white">
                  {isEditing ? "তথ্য সম্পাদনা করুন" : "আবেদন বিস্তারিত পর্যালোচনা"}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">আবেদনকারী আইডি: {selectedReviewProfile.id}</p>
              </div>
              <div className="flex items-center gap-2">
                {!isEditing ? (
                  <button
                    onClick={() => startEditing(selectedReviewProfile)}
                    className="flex items-center gap-1.5 px-3 py-1 bg-blue-950 hover:bg-blue-900 border border-blue-900 text-blue-300 text-xs font-bold rounded-lg transition-all animate-pulse"
                  >
                    <Edit size={13} />
                    সম্পাদনা করুন
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-1.5 px-3 py-1 bg-slate-750 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-lg transition-all"
                  >
                    সম্পাদনা বাতিল
                  </button>
                )}
                <button
                  onClick={() => {
                    setSelectedReviewProfile(null);
                    setIsEditing(false);
                  }}
                  className="p-1.5 hover:bg-slate-700 rounded-full transition-all text-slate-400 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Profile Info Details list / Edit fields */}
            {isEditing ? (
              <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto text-sm">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">পূর্ণ নাম</label>
                  <input
                    type="text"
                    value={editFullName}
                    onChange={(e) => setEditFullName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">ইউজার নেম</label>
                    <input
                      type="text"
                      value={editUsername}
                      onChange={(e) => setEditUsername(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">মোবাইল নম্বর</label>
                    <input
                      type="text"
                      value={editPhoneNumber}
                      onChange={(e) => setEditPhoneNumber(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">সাংগঠনিক পদবী</label>
                    <select
                      value={editPosition}
                      onChange={(e) => setEditPosition(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs text-slate-200"
                    >
                      {ORGANIZATIONAL_POSITIONS.map((pos) => (
                        <option key={pos} value={pos} className="bg-slate-800 text-white">{pos}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">ফেসবুক প্রোফাইল লিংক</label>
                    <input
                      type="url"
                      value={editFacebookUrl}
                      onChange={(e) => setEditFacebookUrl(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs"
                    />
                  </div>
                </div>

                {/* Cascading Location Selectors for Admin Edit */}
                <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-750/50 space-y-3">
                  <span className="block text-[10px] text-slate-400 font-bold tracking-wider uppercase mb-1">কর্মস্থল ও ঠিকানা</span>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">জেলা</label>
                      <select
                        value={editDistrict}
                        onChange={handleDistrictChange}
                        className="w-full px-2 py-1.5 bg-slate-850 border border-slate-700 rounded-lg text-white focus:outline-none text-xs"
                      >
                        <option value="" className="bg-slate-800 text-white">জেলা নির্বাচন করুন</option>
                        {districtsList.map((loc) => (
                          <option key={loc.id} value={loc.bn_name} className="bg-slate-800 text-white">{loc.bn_name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">উপজেলা</label>
                      <select
                        disabled={!editDistrict}
                        value={editUpazila}
                        onChange={handleUpazilaChange}
                        className="w-full px-2 py-1.5 bg-slate-850 border border-slate-700 rounded-lg text-white focus:outline-none text-xs disabled:opacity-40"
                      >
                        <option value="" className="bg-slate-800 text-white">উপজেলা নির্বাচন করুন</option>
                        {editAvailableUpazilas.map((up) => (
                          <option key={up} value={up} className="bg-slate-800 text-white">{up}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">ইউনিয়ন বা পৌরসভা</label>
                      <select
                        disabled={!editUpazila}
                        value={editUnionName}
                        onChange={handleUnionChange}
                        className="w-full px-2 py-1.5 bg-slate-850 border border-slate-700 rounded-lg text-white focus:outline-none text-xs disabled:opacity-40"
                      >
                        <option value="" className="bg-slate-800 text-white">ইউনিয়ন/পৌরসভা নির্বাচন করুন</option>
                        {editAvailableUnions.map((u) => (
                          <option key={u.name} value={u.name} className="bg-slate-800 text-white">{u.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">কর্মরত বিদ্যালয়</label>
                      <select
                        disabled={!editUnionName}
                        value={editSchoolName}
                        onChange={(e) => setEditSchoolName(e.target.value)}
                        className="w-full px-2 py-1.5 bg-slate-850 border border-slate-700 rounded-lg text-white focus:outline-none text-xs disabled:opacity-40"
                      >
                        <option value="" className="bg-slate-800 text-white">বিদ্যালয় নির্বাচন করুন</option>
                        {editAvailableSchools.map((sch) => (
                          <option key={sch} value={sch} className="bg-slate-800 text-white">{sch}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">নিজের সম্পর্কে</label>
                  <textarea
                    rows={2}
                    value={editAboutMe}
                    onChange={(e) => setEditAboutMe(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs"
                  />
                </div>

                {/* Optional fields */}
                <div className="bg-slate-900/20 p-3 rounded-xl border border-slate-750 space-y-3">
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-widest">অতিরিক্ত তথ্য (ঐচ্ছিক)</span>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">পিতার নাম</label>
                      <input
                        type="text"
                        value={editFatherName}
                        onChange={(e) => setEditFatherName(e.target.value)}
                        className="w-full px-3 py-1.5 bg-slate-850 border border-slate-700 rounded-lg text-white focus:outline-none text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">মাতার নাম</label>
                      <input
                        type="text"
                        value={editMotherName}
                        onChange={(e) => setEditMotherName(e.target.value)}
                        className="w-full px-3 py-1.5 bg-slate-850 border border-slate-700 rounded-lg text-white focus:outline-none text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">ইমেইল</label>
                      <input
                        type="email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        className="w-full px-3 py-1.5 bg-slate-850 border border-slate-700 rounded-lg text-white focus:outline-none text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">ঠিকানা</label>
                      <input
                        type="text"
                        value={editAddress}
                        onChange={(e) => setEditAddress(e.target.value)}
                        className="w-full px-3 py-1.5 bg-slate-850 border border-slate-700 rounded-lg text-white focus:outline-none text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto text-sm">
                {selectedReviewProfile.photo && (
                  <div className="flex justify-center pb-4 border-b border-slate-700/50">
                    <img 
                      src={selectedReviewProfile.photo} 
                      alt={selectedReviewProfile.fullName} 
                      className="w-24 h-24 object-cover rounded-full border-2 border-slate-600 shadow-md"
                    />
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-700/50">
                  <div>
                    <span className="block text-xs text-slate-400">নাম</span>
                    <span className="font-semibold text-white">{selectedReviewProfile.fullName}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400">সাংগঠনিক পদবী</span>
                    <span className="font-semibold text-emerald-400">{selectedReviewProfile.position}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-700/50">
                  <div>
                    <span className="block text-xs text-slate-400">মোবাইল নম্বর</span>
                    <span className="font-semibold text-white font-mono">{selectedReviewProfile.phoneNumber}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400">ফেসবুক প্রোফাইল</span>
                    {selectedReviewProfile.facebookUrl ? (
                      <a href={selectedReviewProfile.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline truncate block">
                        ফেসবুক লিংক
                      </a>
                    ) : (
                      <span className="text-slate-500">নেই</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-700/50">
                  <div>
                    <span className="block text-xs text-slate-400">বিদ্যালয়/প্রতিষ্ঠান</span>
                    <span className="text-white block">{selectedReviewProfile.schoolName}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400">জেলা ও উপজেলা</span>
                    <span className="text-white block">{selectedReviewProfile.upazila}, {selectedReviewProfile.district}</span>
                  </div>
                </div>

                <div className="pb-4 border-b border-slate-700/50">
                  <span className="block text-xs text-slate-400">নিজের সম্পর্কে</span>
                  <p className="text-slate-300 italic mt-1 bg-slate-900/40 p-3 rounded-xl border border-slate-750">
                    "{selectedReviewProfile.aboutMe}"
                  </p>
                </div>

                {/* Optional personal fields */}
                <div className="bg-slate-900/20 p-4 rounded-2xl border border-slate-750 space-y-3.5">
                  <span className="block text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">ঐচ্ছিক অতিরিক্ত তথ্য</span>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-[10px] text-slate-500 font-semibold leading-tight">পিতার নাম</span>
                      <span className="text-slate-300">{selectedReviewProfile.fatherName || "উল্লেখ করা হয়নি"}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-500 font-semibold leading-tight">মাতার নাম</span>
                      <span className="text-slate-300">{selectedReviewProfile.motherName || "on-demand"}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-[10px] text-slate-500 font-semibold leading-tight">ইমেইল</span>
                      <span className="text-slate-300 font-mono text-xs">{selectedReviewProfile.email || "নেই"}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-500 font-semibold leading-tight">ঠিকানা</span>
                      <span className="text-slate-300 text-xs">{selectedReviewProfile.address || "নেই"}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="p-5 bg-slate-850 border-t border-slate-700 flex justify-end gap-2">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-650 text-xs font-bold text-white rounded-xl transition-all"
                  >
                    বাতিল করুন
                  </button>
                  <button
                    onClick={() => handleUpdateProfile(selectedReviewProfile.id)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
                  >
                    <Save size={13} />
                    সংরক্ষণ করুন
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setSelectedReviewProfile(null)}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-650 text-xs font-bold text-white rounded-xl transition-all"
                  >
                    বন্ধ করুন
                  </button>

                  {selectedReviewProfile.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleReject(selectedReviewProfile.id)}
                        className="px-4 py-2 bg-rose-950 hover:bg-rose-900 border border-rose-900 text-rose-300 text-xs font-bold rounded-xl transition-all"
                      >
                        আবেদন বাতিল
                      </button>
                      <button
                        onClick={() => handleApprove(selectedReviewProfile.id)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all"
                      >
                        আবেদন অনুমোদন
                      </button>
                    </>
                  )}

                  {selectedReviewProfile.status === "approved" && (
                    <button
                      onClick={() => handleReject(selectedReviewProfile.id)}
                      className="px-4 py-2 bg-rose-950 hover:bg-rose-900 border border-rose-900 text-rose-300 text-xs font-bold rounded-xl transition-all"
                    >
                      অনুমোদন বাতিল করুন
                    </button>
                  )}

                  {selectedReviewProfile.status === "rejected" && (
                    <button
                      onClick={() => handleApprove(selectedReviewProfile.id)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all"
                    >
                      পুনরায় অনুমোদন দিন
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Confirmation warning modal / popup */}
      {confirmModal && confirmModal.isOpen && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 z-55">
          <div className="bg-slate-900 border border-slate-750 rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl relative overflow-hidden">
            <div className="w-12 h-12 rounded-full bg-amber-950/50 text-amber-500 flex items-center justify-center mx-auto mb-4 border border-amber-900/30">
              <AlertOctagon size={24} className="animate-bounce" />
            </div>
            <h4 className="text-md font-extrabold text-white mb-2">{confirmModal.title}</h4>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">{confirmModal.message}</p>
            <div className="flex gap-2.5 justify-center">
              <button
                onClick={() => setConfirmModal(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-xs font-bold text-slate-300 rounded-xl transition-all"
              >
                {confirmModal.cancelText || "না"}
              </button>
              <button
                onClick={confirmModal.onConfirm}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-red-900/20"
              >
                {confirmModal.confirmText || "হ্যাঁ, নিশ্চিত করুন"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Backup Restore Progress Modal */}
      {restoreProgress !== null && (
        <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-750 rounded-3xl max-w-md w-full p-8 text-center shadow-2xl relative overflow-hidden">
            {/* Bangladesh national colors accent light bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-emerald-600 to-emerald-700"></div>
            
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto mb-6 border border-indigo-500/20 animate-pulse">
              <Database size={32} />
            </div>
            
            <h4 className="text-lg font-extrabold text-white mb-2">ডাটা রিস্টোর হচ্ছে...</h4>
            <p className="text-xs text-slate-400 mb-6 font-mono">{restoreStatus}</p>
            
            {/* Progress bar container */}
            <div className="w-full bg-slate-850 rounded-full h-3 mb-3 p-0.5 border border-slate-700 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-indigo-500 via-violet-500 to-emerald-500 h-2 rounded-full transition-all duration-300 shadow-md shadow-indigo-500/50" 
                style={{ width: `${restoreProgress}%` }}
              ></div>
            </div>
            
            {/* Percentage & Status indicator */}
            <div className="flex justify-between items-center text-xs font-bold text-slate-400">
              <span>প্রগতি:</span>
              <span className="font-mono text-indigo-400 text-sm">{restoreProgress}%</span>
            </div>

            {/* "Data Updated" big checkmark badge when 100% */}
            {restoreProgress === 100 && (
              <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center gap-2.5 text-emerald-400 animate-bounce">
                <CheckCircle2 size={20} />
                <span className="text-sm font-bold uppercase tracking-wider font-sans">Data Updated</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
