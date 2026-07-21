import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MessageCircle, X, Send, Paperclip, Maximize2, Minimize2, 
  RotateCcw, Upload, Download, AlertCircle, Sparkles, FileText, Image as ImageIcon, Check, Loader2,
  Copy, Edit3, Trash2, MessageSquare
} from "lucide-react";

interface Attachment {
  name: string;
  type: 'text' | 'image';
  content?: string; // Text content for .md, .json, .txt
  base64?: string;  // Base64 data url for images
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  attachments?: Attachment[];
}

// Subcomponent to render a code block with copy and download options
function CodeBlockCard({ code, language }: { code: string; language: string; key?: any }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const extMap: Record<string, string> = {
      html: "html",
      css: "css",
      js: "js",
      javascript: "js",
      json: "json",
      csv: "csv",
      yaml: "yaml",
      yml: "yaml",
      shtml: "shtml",
      txt: "txt"
    };
    const ext = extMap[language] || "txt";
    const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sohokari_file_${Date.now()}.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="my-3 border border-slate-700/80 rounded-xl overflow-hidden shadow-md bg-slate-900 text-slate-100 font-mono text-xs max-w-full">
      <div className="bg-slate-800/90 px-4 py-2 flex items-center justify-between border-b border-slate-700/60 select-none">
        <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider">
          📎 {language} ফাইল
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="p-1 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition cursor-pointer"
            title="কপি করুন"
          >
            {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
          </button>
          <button
            onClick={handleDownload}
            className="p-1 hover:bg-[#046c4e] rounded text-emerald-300 hover:text-white transition cursor-pointer flex items-center gap-1 font-sans text-[10px] font-bold px-2 py-0.5"
            title="ডাউনলোড করুন"
          >
            <Download size={12} />
            <span>ডাউনলোড</span>
          </button>
        </div>
      </div>
      <pre className="p-4 overflow-x-auto max-h-[300px] whitespace-pre text-[11px] leading-relaxed select-text bg-slate-950/80">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// Subcomponent to render text block, parsing and rendering markdown tables beautifully
function TextBlockWithTables({ text }: { text: string; key?: any }) {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let currentTableLines: string[] = [];

  const flushTable = (key: number) => {
    if (currentTableLines.length === 0) return null;
    
    // Parse table lines
    const rows = currentTableLines
      .map(line => line.split("|").map(cell => cell.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1))
      .filter(row => row.length > 0 && !row.every(cell => cell.startsWith("-")));

    currentTableLines = [];

    if (rows.length === 0) return null;

    const headers = rows[0];
    const bodyRows = rows.slice(1);

    return (
      <div key={`table-${key}`} className="my-3 overflow-x-auto border border-emerald-100 rounded-xl shadow-md bg-white">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#046c4e]/5 text-[#046c4e] border-b border-emerald-100">
              {headers.map((h, i) => (
                <th key={i} className="p-3 font-extrabold text-center border-r border-emerald-100 last:border-r-0 tracking-wide uppercase">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bodyRows.map((row, rIdx) => (
              <tr 
                key={rIdx} 
                className="hover:bg-emerald-50/20 transition-all border-b border-gray-100 last:border-b-0"
              >
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className="p-2.5 text-center text-gray-700 border-r border-gray-100 last:border-r-0 leading-relaxed font-bold">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  lines.forEach((line, index) => {
    const isTableLine = line.trim().startsWith("|") && line.trim().endsWith("|");

    if (isTableLine) {
      currentTableLines.push(line);
    } else {
      if (currentTableLines.length > 0) {
        const table = flushTable(index);
        if (table) elements.push(table);
      }
      if (line.trim()) {
        elements.push(
          <p key={index} className="whitespace-pre-wrap leading-relaxed my-1.5">{line}</p>
        );
      } else {
        elements.push(<div key={index} className="h-1.5" />);
      }
    }
  });

  if (currentTableLines.length > 0) {
    const table = flushTable(lines.length);
    if (table) elements.push(table);
  }

  return <div className="space-y-0.5">{elements}</div>;
}

// Combined content renderer
function MessageContent({ content }: { content: string }) {
  const parts = content.split("```");

  return (
    <div className="space-y-2 text-sm leading-relaxed max-w-full overflow-hidden">
      {parts.map((part, index) => {
        const isCodeBlock = index % 2 === 1;

        if (isCodeBlock) {
          const firstLineEnd = part.indexOf("\n");
          let language = "txt";
          let code = part;
          if (firstLineEnd !== -1) {
            language = part.slice(0, firstLineEnd).trim().toLowerCase();
            code = part.slice(firstLineEnd + 1);
          }
          if (!language) language = "txt";

          return (
            <CodeBlockCard key={index} code={code} language={language} />
          );
        } else {
          return <TextBlockWithTables key={index} text={part} />;
        }
      })}
    </div>
  );
}

export function SohokariChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [chatMode, setChatMode] = useState<'ai' | 'live'>('ai');
  const [showMenu, setShowMenu] = useState(false);

  // Resize states
  const [chatWidth, setChatWidth] = useState(380);
  const [chatHeight, setChatHeight] = useState(530);
  const [isResizing, setIsResizing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    const startWidth = chatWidth;
    const startHeight = chatHeight;
    const startX = e.clientX;
    const startY = e.clientY;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = startX - moveEvent.clientX;
      const deltaY = startY - moveEvent.clientY;
      
      const newWidth = Math.max(320, Math.min(800, startWidth + deltaX));
      const newHeight = Math.max(400, Math.min(900, startHeight + deltaY));
      
      setChatWidth(newWidth);
      setChatHeight(newHeight);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // SOHOKARI AI states
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isSending, setIsSending] = useState(false);

  // Live Message states
  const [liveMessages, setLiveMessages] = useState<any[]>([]);
  const [liveInput, setLiveInput] = useState("");
  const [liveChatId, setLiveChatId] = useState<string>("");
  const [liveSenderName, setLiveSenderName] = useState<string>("");
  const [isLoadingLive, setIsLoadingLive] = useState(false);
  const [editingLiveId, setEditingLiveId] = useState<string | null>(null);
  const [editingLiveText, setEditingLiveText] = useState("");
  const [liveNameInput, setLiveNameInput] = useState("");
  const [copiedLiveId, setCopiedLiveId] = useState<string | null>(null);
  
  // Message edit states
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  
  // Daily limit: 80 messages
  const [dailyCount, setDailyCount] = useState(0);
  const MAX_DAILY_MESSAGES = 80;
  
  // Word limit: 750 words
  const [wordCount, setWordCount] = useState(0);
  const MAX_WORDS = 750;

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const restoreInputRef = useRef<HTMLInputElement>(null);

  // Initialize and check daily limits, backup aging, and Live Chat parameters
  useEffect(() => {
    // Resolve live chat ID
    let chatId = localStorage.getItem("sohokari_live_chat_id");
    if (!chatId) {
      chatId = "user_" + Math.random().toString(36).substring(2, 9) + "_" + Date.now();
      localStorage.setItem("sohokari_live_chat_id", chatId);
    }
    setLiveChatId(chatId);

    // Resolve live sender name
    const storedLiveName = localStorage.getItem("sohokari_live_sender_name");
    const doptariName = localStorage.getItem("doptari_profile_fullname") || localStorage.getItem("doptari_registered_fullname") || "";
    if (storedLiveName) {
      setLiveSenderName(storedLiveName);
      setLiveNameInput(storedLiveName);
    } else if (doptariName) {
      setLiveSenderName(doptariName);
      setLiveNameInput(doptariName);
      localStorage.setItem("sohokari_live_sender_name", doptariName);
    }
  }, []);

  const fetchLiveMessages = async (chatId: string) => {
    if (!chatId) return;
    try {
      const res = await fetch(`/api/live-messages?chatId=${chatId}`);
      const data = await res.json();
      if (data.success) {
        setLiveMessages(data.messages);
      }
    } catch (err) {
      console.error("Failed to load live messages:", err);
    }
  };

  useEffect(() => {
    if (isOpen && chatMode === 'live' && liveChatId) {
      fetchLiveMessages(liveChatId);
      const interval = setInterval(() => {
        fetchLiveMessages(liveChatId);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isOpen, chatMode, liveChatId]);

  const handleSendLiveMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!liveInput.trim() || !liveChatId) return;

    const content = liveInput.trim();
    setLiveInput("");

    try {
      const res = await fetch("/api/live-messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatId: liveChatId,
          senderId: "user",
          senderName: liveSenderName || "অতিথি",
          content
        })
      });
      const data = await res.json();
      if (data.success) {
        setLiveMessages(prev => [...prev, data.message]);
      }
    } catch (err) {
      console.error("Error sending live message:", err);
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
        setEditingLiveId(null);
        setEditingLiveText("");
      }
    } catch (err) {
      console.error("Error editing live message:", err);
    }
  };

  const handleDeleteLiveMessage = async (messageId: string) => {
    if (window.confirm("আপনি কি নিশ্চিতভাবে এই বার্তাটি মুছে ফেলতে চান?")) {
      try {
        const res = await fetch("/api/live-messages/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messageId })
        });
        const data = await res.json();
        if (data.success) {
          setLiveMessages(prev => prev.filter(m => m.id !== messageId));
        }
      } catch (err) {
        console.error("Error deleting live message:", err);
      }
    }
  };

  const handleSaveLiveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (!liveNameInput.trim()) return;
    const name = liveNameInput.trim();
    setLiveSenderName(name);
    localStorage.setItem("sohokari_live_sender_name", name);
  };

  // Initialize and check daily limits & backup aging
  useEffect(() => {
    // Load chat history from localStorage
    const savedMessages = localStorage.getItem("sohokari_chat_history");
    let loadedMessages: ChatMessage[] = [];
    if (savedMessages) {
      try {
        loadedMessages = JSON.parse(savedMessages);
        setMessages(loadedMessages);
      } catch (e) {
        console.error("Failed to parse chat history:", e);
      }
    } else {
      // Add initial welcome message
      const welcomeMsg: ChatMessage = {
        role: 'assistant',
        content: "আসসালামু আলাইকুম। আমি 'সহকারী' (SOHOKARI) এআই অ্যাসিস্ট্যান্ট। আমি আপনাকে কীভাবে সাহায্য করতে পারি? আপনি আমাদের ডিরেক্টরি সম্পর্কিত যেকোনো তথ্য বা যেকোনো সাধারণ জিজ্ঞাসা করতে পারেন।",
        timestamp: new Date().toISOString()
      };
      setMessages([welcomeMsg]);
      localStorage.setItem("sohokari_chat_history", JSON.stringify([welcomeMsg]));
    }

    // Daily limit tracker initialization
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem("sohokari_daily_date");
    const savedCount = localStorage.getItem("sohokari_daily_count");

    if (savedDate !== today) {
      localStorage.setItem("sohokari_daily_date", today);
      localStorage.setItem("sohokari_daily_count", "0");
      setDailyCount(0);
    } else if (savedCount) {
      setDailyCount(parseInt(savedCount, 10));
    }

    // Check aging logic: 3 days threshold
    if (loadedMessages.length > 1) {
      const threeDaysMs = 3 * 24 * 60 * 60 * 1000;
      const oldestMessage = loadedMessages.find(m => m.timestamp);
      if (oldestMessage) {
        const oldestTime = new Date(oldestMessage.timestamp).getTime();
        const currentTime = Date.now();
        if (currentTime - oldestTime > threeDaysMs) {
          // Trigger auto-export & download
          exportHistory(loadedMessages, true);
        }
      }
    }
  }, []);

  // Sync messages to localstorage
  const saveMessages = (updated: ChatMessage[]) => {
    setMessages(updated);
    localStorage.setItem("sohokari_chat_history", JSON.stringify(updated));
  };

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, liveMessages, isOpen, isFullscreen, chatMode]);

  // Track word count on inputs
  useEffect(() => {
    const words = input.trim().split(/\s+/).filter(Boolean).length;
    setWordCount(words);
  }, [input]);

  // Helper to trigger backup file download
  const exportHistory = (msgsToExport: ChatMessage[], autoClean: boolean = false) => {
    if (msgsToExport.length === 0) return;
    
    const backupData = {
      app: "SOHOKARI AI",
      exportDate: new Date().toISOString(),
      messages: msgsToExport
    };

    // Obfuscate / Highly Secure (Scromize) using base64 representation
    const jsonStr = JSON.stringify(backupData, null, 2);
    const encodedData = btoa(unescape(encodeURIComponent(jsonStr)));
    
    const blob = new Blob([encodedData], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `sohokari_chat_backup_${new Date().toISOString().split('T')[0]}.sohokari`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    if (autoClean) {
      // Clear history older than 3 days and set welcome message
      const welcomeMsg: ChatMessage = {
        role: 'assistant',
        content: "আপনার ৩ দিনের বেশি পুরনো কথোপকথনটি স্বয়ংক্রিয়ভাবে ডাউনলোড করা হয়েছে এবং নতুন চ্যাট উইন্ডো শুরু হয়েছে। আপনি ডাউনলোড করা '.sohokari' ফাইলটি নিচে আপলোড করে চ্যাট ইতিহাস পুনরুদ্ধার করতে পারবেন।",
        timestamp: new Date().toISOString()
      };
      saveMessages([welcomeMsg]);
    }
  };

  // Helper to restore chat history from custom file
  const handleRestoreFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const rawText = event.target?.result as string;
        // Decode base64 securely
        const decodedText = decodeURIComponent(escape(atob(rawText)));
        const parsed = JSON.parse(decodedText);
        
        if (parsed.app === "SOHOKARI AI" && Array.isArray(parsed.messages)) {
          saveMessages(parsed.messages);
          alert("অভিনন্দন! আপনার চ্যাট ইতিহাস সফলভাবে পুনরুদ্ধার করা হয়েছে।");
        } else {
          alert("ভুল ফাইল ফরম্যাট। অনুগ্রহ করে একটি বৈধ .sohokari ব্যাকআপ ফাইল নির্বাচন করুন।");
        }
      } catch (err) {
        console.error("Failed to restore history:", err);
        alert("ফাইলটি পড়া সম্ভব হয়নি। ফাইলটি ত্রুটিযুক্ত বা ক্ষতিগ্রস্ত হতে পারে।");
      }
    };
    reader.readAsText(file);
    e.target.value = ""; // reset file input
  };

  // Handle files select (supports max 3 attachments, max 35MB size limit per file, only supports .md, .txt, .json, .yaml, .csv)
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];
    
    if (attachments.length + files.length > 3) {
      alert("দুঃখিত, আপনি একসাথে সর্বোচ্চ ৩টি ফাইল আপলোড করতে পারবেন।");
      return;
    }

    const allowedExtensions = [".md", ".txt", ".json", ".yaml", ".csv"];
    const maxSizeBytes = 35 * 1024 * 1024; // 35 MB

    // Validate all files first
    for (const file of files) {
      const ext = "." + file.name.split('.').pop()?.toLowerCase();
      if (!allowedExtensions.includes(ext)) {
        alert(`দুঃখিত, '${file.name}' ফাইলের ফরম্যাট গ্রহণযোগ্য নয়। শুধুমাত্র .md, .txt, .json, .yaml এবং .csv ফাইল আপলোড করা যাবে।`);
        return;
      }
      if (file.size > maxSizeBytes) {
        alert(`দুঃখিত, '${file.name}' ফাইলের সাইজ ৩৫ মেগাবাইট (35MB) এর বেশি। অনুগ্রহ করে ছোট ফাইল আপলোড করুন।`);
        return;
      }
    }

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (evt) => {
        setAttachments(prev => [...prev, {
          name: file.name,
          type: 'text',
          content: evt.target?.result as string
        }]);
      };
      reader.readAsText(file);
    });

    if (fileInputRef.current) fileInputRef.current.value = ""; // reset
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  // Load all approved profiles on mount for scanning matches in SOHOKARI AI assistant responses
  const [allProfiles, setAllProfiles] = useState<any[]>([]);
  useEffect(() => {
    fetch("/api/profiles")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setAllProfiles(data);
      })
      .catch(err => console.error("Error fetching profiles in chat:", err));
  }, []);

  // Shared AI response fetcher
  const fetchAiResponse = async (currentMessages: ChatMessage[]) => {
    let sessionToken = localStorage.getItem("sohokari_session_token");
    if (!sessionToken) {
      sessionToken = "session-" + Math.random().toString(36).substring(2, 15) + "-" + Date.now();
      localStorage.setItem("sohokari_session_token", sessionToken);
    }

    const storedUser = localStorage.getItem("doptari_profile_fullname") || "ব্যবহারকারী";
    setIsSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: currentMessages,
          sessionId: sessionToken,
          userName: storedUser
        })
      });

      if (!response.ok) {
        throw new Error("Server responded with failure code");
      }

      const result = await response.json();
      
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: result.reply,
        timestamp: new Date().toISOString()
      };

      saveMessages([...currentMessages, assistantMessage]);
    } catch (err) {
      console.error("AI chat error:", err);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: "দুঃখিত, বর্তমানে এআই সার্ভারে সংযোগ স্থাপন করা সম্ভব হচ্ছে না। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন বা আপনার ইন্টারনেট সংযোগটি পরীক্ষা করুন।",
        timestamp: new Date().toISOString()
      };
      saveMessages([...currentMessages, errorMessage]);
    } finally {
      setIsSending(false);
    }
  };

  // Send message
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if ((!input.trim() && attachments.length === 0) || isSending) return;

    // Daily limit check
    if (dailyCount >= MAX_DAILY_MESSAGES) {
      alert(`দুঃখিত, আপনি আজকের দৈনিক সর্বোচ্চ ৮০টি বার্তা প্রেরণের কোটা পূরণ করে ফেলেছেন। অনুগ্রহ করে আগামীকাল পুনরায় চেষ্টা করুন।`);
      return;
    }

    // Word limit check
    if (wordCount > MAX_WORDS) {
      alert(`আপনার বার্তাটি ৭৫০ শব্দের চেয়ে বেশি দীর্ঘ। অনুগ্রহ করে এটি সংক্ষেপ করুন।`);
      return;
    }

    const userMsgText = input.trim();
    const currentAttachments = [...attachments];
    
    // Clear inputs immediately
    setInput("");
    setAttachments([]);
    setWordCount(0);

    const newUserMessage: ChatMessage = {
      role: 'user',
      content: userMsgText,
      timestamp: new Date().toISOString(),
      attachments: currentAttachments
    };

    const updatedMessages = [...messages, newUserMessage];
    saveMessages(updatedMessages);

    // Increment daily count
    const nextCount = dailyCount + 1;
    setDailyCount(nextCount);
    localStorage.setItem("sohokari_daily_count", nextCount.toString());

    await fetchAiResponse(updatedMessages);
  };

  // Edit/Update Message (Consumes 1 daily limit count, truncates history, and triggers fresh AI reply)
  const handleUpdateMessage = async (idx: number, newText: string) => {
    if (!newText.trim() || isSending) return;

    if (dailyCount >= MAX_DAILY_MESSAGES) {
      alert(`দুঃখিত, আপনি আজকের দৈনিক সর্বোচ্চ ৮০টি বার্তা প্রেরণের কোটা পূরণ করে ফেলেছেন। আর কোনো নতুন বার্তা এডিট বা সেন্ড করা যাবে না।`);
      return;
    }

    setEditingIndex(null);

    const updatedUserMsg = {
      ...messages[idx],
      content: newText.trim(),
      timestamp: new Date().toISOString()
    };
    
    const truncatedHistory = [...messages.slice(0, idx), updatedUserMsg];
    saveMessages(truncatedHistory);

    // Consumes 1 limit
    const nextCount = dailyCount + 1;
    setDailyCount(nextCount);
    localStorage.setItem("sohokari_daily_count", nextCount.toString());

    await fetchAiResponse(truncatedHistory);
  };

  // Delete message
  const handleDeleteMessage = (idx: number) => {
    if (window.confirm("আপনি কি নিশ্চিতভাবে এই বার্তাটি মুছে ফেলতে চান?")) {
      const updated = [...messages];
      // If user deletes their message, delete the subsequent assistant response as well if present
      if (updated[idx].role === 'user' && updated[idx + 1] && updated[idx + 1].role === 'assistant') {
        updated.splice(idx, 2);
      } else {
        updated.splice(idx, 1);
      }
      saveMessages(updated);
    }
  };

  const handleResetChat = () => {
    if (window.confirm("আপনি কি চ্যাট ইতিহাস মুছে সম্পূর্ণ নতুন করে শুরু করতে চান?")) {
      const welcomeMsg: ChatMessage = {
        role: 'assistant',
        content: "আসসালামু আলাইকুম। আমি 'সহকারী' (SOHOKARI) এআই অ্যাসিস্ট্যান্ট। আমি আপনাকে কীভাবে সাহায্য করতে পারি? আপনি আমাদের ডিরেক্টরি সম্পর্কিত যেকোনো তথ্য বা যেকোনো সাধারণ জিজ্ঞাসা করতে পারেন।",
        timestamp: new Date().toISOString()
      };
      saveMessages([welcomeMsg]);
    }
  };

  return (
    <>
      {/* Floating Chat Bubble Button with Selector Popup */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="mb-4 bg-slate-950/95 backdrop-blur-xl border border-slate-800 text-white rounded-3xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-4 w-96 overflow-hidden select-none"
              >
                <div className="px-1 pb-2 border-b border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping"></span>
                    যোগাযোগের মাধ্যম নির্বাচন করুন
                  </span>
                  <button 
                    onClick={() => setShowMenu(false)}
                    className="text-slate-500 hover:text-white transition-colors cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setChatMode('ai');
                      setIsOpen(true);
                      setShowMenu(false);
                    }}
                    className="w-full text-left p-4 rounded-2xl border border-emerald-500/20 hover:border-emerald-500/50 bg-emerald-950/30 hover:bg-emerald-950/55 transition-all flex items-start gap-4 group cursor-pointer shadow-sm hover:shadow"
                  >
                    <div className="p-3 bg-emerald-500/20 rounded-xl group-hover:scale-110 transition-transform shrink-0">
                      <Sparkles size={22} className="text-yellow-300 group-hover:rotate-12 transition-transform" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-md font-extrabold text-emerald-300">🤖 সহকারী এআই (Sohokari AI)</div>
                      <div className="text-xs text-slate-300 mt-1.5 leading-relaxed">স্বয়ংক্রিয় এআই উত্তর, ফাইল রিডিং ও ২৪/৭ যেকোনো সাধারণ তথ্য পেতে চ্যাট করুন।</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setChatMode('live');
                      setIsOpen(true);
                      setShowMenu(false);
                    }}
                    className="w-full text-left p-4 rounded-2xl border border-pink-500/20 hover:border-pink-500/50 bg-pink-950/20 hover:bg-pink-950/45 transition-all flex items-start gap-4 group cursor-pointer shadow-sm hover:shadow"
                  >
                    <div className="p-3 bg-pink-500/20 rounded-xl group-hover:scale-110 transition-transform shrink-0">
                      <MessageCircle size={22} className="text-pink-400 group-hover:rotate-12 transition-transform" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-md font-extrabold text-pink-300">💬 সরাসরি লাইভ চ্যাট (Admin)</div>
                      <div className="text-xs text-slate-300 mt-1.5 leading-relaxed">সরাসরি ডিরেক্টরি এডমিনের সাথে কথা বলুন ও তাৎক্ষণিক সহযোগিতা পান।</div>
                    </div>
                  </button>


                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            id="sohokari-chat-bubble"
            onClick={() => setShowMenu(!showMenu)}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-gradient-to-r from-[#046c4e] to-emerald-600 text-yellow-300 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl border border-emerald-400/30 cursor-pointer group relative"
          >
            <div className="absolute inset-0 rounded-full bg-[#046c4e] animate-ping opacity-25"></div>
            <MessageCircle size={30} className="text-yellow-300 group-hover:rotate-12 transition-transform" />
            
            <span className="absolute -top-1 -right-1 bg-yellow-400 text-[#046c4e] text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-md animate-bounce">
              চ্যাট
            </span>
          </motion.button>
        </div>
      )}

      {/* Main Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="sohokari-chat-panel"
            initial={isFullscreen ? { opacity: 0, scale: 0.95 } : { opacity: 0, y: 50, scale: 0.9 }}
            animate={isFullscreen ? { opacity: 1, scale: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            style={isFullscreen ? {} : { 
              width: isMobile ? '100%' : `${chatWidth}px`, 
              height: isMobile ? '90vh' : `${chatHeight}px` 
            }}
            className={`fixed z-50 bg-white shadow-2xl flex flex-col border border-gray-100 overflow-hidden
              ${isResizing ? '' : 'transition-all duration-300'}
              ${isFullscreen 
                ? "inset-0 w-full h-full rounded-none" 
                : "bottom-0 right-0 rounded-t-2xl sm:bottom-6 sm:right-6 sm:rounded-2xl"
              }`}
          >
            {/* Top-Left Resize Handle (Shown only when not in fullscreen and not on mobile) */}
            {!isFullscreen && !isMobile && (
              <div
                onMouseDown={handleResizeMouseDown}
                className="absolute top-0 left-0 w-7 h-7 cursor-nwse-resize z-50 flex items-center justify-center group/resize select-none"
                title="টেনে সাইজ পরিবর্তন করুন (Resize)"
              >
                <div className="w-3 h-3 border-t-2 border-l-2 border-white/50 group-hover/resize:border-yellow-300 transition-colors rounded-tl-[3px] pointer-events-none"></div>
              </div>
            )}
            {/* Header */}
            <div className={`text-white px-5 py-4 flex items-center justify-between shadow-md shrink-0 transition-all duration-300
              ${chatMode === 'ai' 
                ? 'bg-gradient-to-r from-[#046c4e] via-emerald-800 to-[#046c4e]' 
                : 'bg-gradient-to-r from-pink-800 via-purple-900 to-indigo-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-400 text-[#046c4e] rounded-full flex items-center justify-center shadow-inner font-extrabold relative shrink-0">
                  {chatMode === 'ai' ? (
                    <Sparkles size={20} className="text-[#046c4e] animate-pulse" />
                  ) : (
                    <MessageCircle size={20} className="text-pink-700 animate-bounce" />
                  )}
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                </div>
                <div>
                  <h3 className="font-extrabold text-sm md:text-base tracking-tight flex items-center gap-1.5">
                    {chatMode === 'ai' ? (
                      <>
                        সহকারী <span className="text-[10px] font-bold text-yellow-300 bg-emerald-900/60 px-2 py-0.5 rounded-full border border-emerald-500/30 uppercase tracking-widest">SOHOKARI</span>
                      </>
                    ) : (
                      <>
                        লাইভ সাপোর্ট <span className="text-[10px] font-bold text-yellow-300 bg-pink-900/60 px-2 py-0.5 rounded-full border border-pink-500/30 uppercase tracking-widest">LIVE</span>
                      </>
                    )}
                  </h3>
                  <p className="text-[11px] text-emerald-200 font-medium">
                    {chatMode === 'ai' ? "ডিজিটাল এআই তথ্যকোষ" : "এডমিন চ্যাট রুম (৩ দিন স্থায়ী)"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {chatMode === 'ai' && (
                  <>
                    {/* Reset button */}
                    <button 
                      onClick={handleResetChat} 
                      title="চ্যাট রিসেট করুন"
                      className="p-1.5 hover:bg-white/10 rounded-lg transition text-emerald-100 hover:text-white cursor-pointer"
                    >
                      <RotateCcw size={16} />
                    </button>

                    {/* Backup export */}
                    <button 
                      onClick={() => exportHistory(messages)} 
                      title="ব্যাকআপ ডাউনলোড করুন"
                      className="p-1.5 hover:bg-white/10 rounded-lg transition text-emerald-100 hover:text-white cursor-pointer"
                    >
                      <Download size={16} />
                    </button>

                    {/* Upload backup */}
                    <button 
                      onClick={() => restoreInputRef.current?.click()} 
                      title="ব্যাকআপ আপলোড করুন"
                      className="p-1.5 hover:bg-white/10 rounded-lg transition text-emerald-100 hover:text-white cursor-pointer"
                    >
                      <Upload size={16} />
                    </button>
                    <input 
                      type="file" 
                      ref={restoreInputRef} 
                      accept=".sohokari" 
                      onChange={handleRestoreFile} 
                      className="hidden" 
                    />
                  </>
                )}

                {/* Maximize Toggle */}
                <button 
                  onClick={() => setIsFullscreen(!isFullscreen)} 
                  title={isFullscreen ? "ছোট করুন" : "পূর্ণ পর্দা করুন"}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition text-emerald-100 hover:text-white cursor-pointer"
                >
                  {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>

                {/* Close Panel */}
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="p-1.5 hover:bg-white/10 rounded-lg transition text-emerald-100 hover:text-white cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Inline Segmented Tab Bar for quick switcher */}
            <div className="bg-gray-100 p-1 border-b border-gray-200 shrink-0 flex gap-1 select-none">
              <button
                onClick={() => setChatMode('ai')}
                className={`flex-1 text-center py-1.5 rounded-lg text-xs font-extrabold transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5
                  ${chatMode === 'ai' 
                    ? 'bg-white text-[#046c4e] shadow-sm' 
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-200/50'}`}
              >
                <Sparkles size={13} className={chatMode === 'ai' ? 'text-yellow-500 animate-pulse' : 'text-gray-400'} />
                <span>सहকারী এআই (AI)</span>
              </button>
              <button
                onClick={() => setChatMode('live')}
                className={`flex-1 text-center py-1.5 rounded-lg text-xs font-extrabold transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5
                  ${chatMode === 'live' 
                    ? 'bg-white text-pink-700 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-200/50'}`}
              >
                <MessageCircle size={13} className={chatMode === 'live' ? 'text-pink-500 animate-bounce' : 'text-gray-400'} />
                <span>লাইভ সাপোর্ট (Live)</span>
              </button>
            </div>

            {/* Chat Content based on selected mode */}
            {chatMode === 'ai' ? (
              <>
                {/* Daily Usage Bar */}
                <div className="bg-emerald-50/50 px-4 py-1.5 border-b border-gray-100 shrink-0 text-[10px] text-gray-500 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <AlertCircle size={12} className="text-emerald-600 shrink-0" />
                    দৈনিক বার্তার কোটা: <strong>{dailyCount}/{MAX_DAILY_MESSAGES}</strong>
                  </span>
                  <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${dailyCount > 70 ? 'bg-red-500' : 'bg-[#046c4e]'}`}
                      style={{ width: `${(dailyCount / MAX_DAILY_MESSAGES) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* AI Chat Body */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-slate-50/40">
                  {messages.map((msg, index) => {
                    const isUser = msg.role === 'user';
                    const isEditing = editingIndex === index;

                    return (
                      <div 
                        key={index} 
                        className={`flex ${isUser ? 'justify-end' : 'justify-start'} group/item`}
                      >
                        <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm relative overflow-visible
                          ${isUser 
                            ? 'bg-emerald-600 text-white rounded-br-none' 
                            : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                          }`}
                        >
                          {/* Render message attachments */}
                          {msg.attachments && msg.attachments.length > 0 && (
                            <div className="mb-2 space-y-1.5">
                              {msg.attachments.map((att, attIdx) => (
                                <div 
                                  key={attIdx} 
                                  className={`flex items-center gap-2 p-1.5 rounded-lg text-xs font-bold shrink-0
                                    ${isUser ? 'bg-emerald-700/80 text-white' : 'bg-gray-100 text-gray-600'}`}
                                >
                                  {att.type === 'image' ? (
                                    <>
                                      <ImageIcon size={14} className="text-yellow-300" />
                                      <span className="truncate max-w-[150px]">{att.name}</span>
                                    </>
                                  ) : (
                                    <>
                                      <FileText size={14} className="text-yellow-300" />
                                      <span className="truncate max-w-[150px]">{att.name}</span>
                                    </>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Message actions menu (Copy, Edit, Delete) */}
                          <div className={`absolute top-2 right-2 flex items-center gap-1.5 opacity-0 group-hover/item:opacity-100 transition-opacity bg-inherit px-1.5 py-0.5 rounded-md shadow-xs border border-white/10 z-10`}>
                            {/* Copy button */}
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(msg.content);
                                setCopiedIdx(index);
                                setTimeout(() => setCopiedIdx(null), 2000);
                              }}
                              title="বার্তা কপি করুন"
                              className={`p-1 rounded hover:bg-black/10 transition cursor-pointer ${isUser ? 'text-emerald-100 hover:text-white' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                              {copiedIdx === index ? <Check size={11} className={isUser ? 'text-yellow-300' : 'text-emerald-600'} /> : <Copy size={11} />}
                            </button>

                            {/* Edit and Delete for User message */}
                            {isUser && !isEditing && (
                              <>
                                <button
                                  onClick={() => {
                                    setEditingIndex(index);
                                    setEditingText(msg.content);
                                  }}
                                  title="বার্তা এডিট করুন"
                                  className="p-1 rounded text-emerald-100 hover:text-white hover:bg-black/10 transition cursor-pointer"
                                >
                                  <Edit3 size={11} />
                                </button>
                                {index > 0 && ( // Prevent deleting welcome message or first item if not user
                                  <button
                                    onClick={() => handleDeleteMessage(index)}
                                    title="বার্তা মুছে ফেলুন"
                                    className="p-1 rounded text-emerald-100 hover:text-red-200 hover:bg-black/10 transition cursor-pointer"
                                  >
                                    <Trash2 size={11} />
                                  </button>
                                )}
                              </>
                            )}
                          </div>

                          {/* Content Render (Support inline edits) */}
                          {isEditing ? (
                            <div className="flex flex-col gap-2 min-w-[220px] pt-4">
                              <textarea
                                value={editingText}
                                onChange={(e) => setEditingText(e.target.value)}
                                className="bg-emerald-700/80 text-white border border-emerald-400/40 rounded-xl p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-yellow-300 resize-none min-h-[70px] w-full font-semibold"
                                placeholder="আপনার বার্তাটি এডিট করুন..."
                              />
                              <div className="flex justify-end gap-1.5">
                                <button
                                  onClick={() => setEditingIndex(null)}
                                  className="px-2.5 py-1.5 bg-emerald-800 hover:bg-emerald-900 rounded-lg text-[10px] font-bold cursor-pointer transition"
                                >
                                  বাতিল
                                </button>
                                <button
                                  onClick={() => handleUpdateMessage(index, editingText)}
                                  className="px-2.5 py-1.5 bg-yellow-400 hover:bg-yellow-500 text-[#046c4e] rounded-lg text-[10px] font-extrabold cursor-pointer transition shadow-sm"
                                >
                                  আপডেট ও সেন্ড
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="pr-7 pt-1">
                              <MessageContent content={msg.content} />
                            </div>
                          )}

                          {/* Scan and render matches for approved member profiles in assistant messages */}
                          {!isUser && allProfiles.length > 0 && (
                            (() => {
                              const matchedProfiles = allProfiles.filter(p => p.fullName && msg.content.includes(p.fullName));
                              if (matchedProfiles.length > 0) {
                                return (
                                  <div className="mt-3 pt-2 border-t border-dashed border-gray-100 flex flex-col gap-1.5">
                                    <p className="text-[10px] font-extrabold text-emerald-700 flex items-center gap-1">
                                      <Sparkles size={11} className="text-yellow-500 animate-pulse" /> সরাসরি প্রোফাইলে যান:
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                      {matchedProfiles.map(p => (
                                        <button
                                          key={p.id}
                                          onClick={() => {
                                            window.dispatchEvent(new CustomEvent('view-profile', { detail: { id: p.id } }));
                                          }}
                                          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-[#046c4e] border border-emerald-200/50 rounded-lg text-[11px] font-bold transition-all shadow-xs cursor-pointer hover:scale-105 active:scale-95"
                                        >
                                          👤 {p.fullName} (দেখুন)
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                );
                              }
                              return null;
                            })()
                          )}

                          <span className={`block text-[9px] text-right mt-1.5 font-medium
                            ${isUser ? 'text-emerald-100' : 'text-gray-400'}`}>
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                  
                  {isSending && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none px-4 py-3 text-sm shadow-sm flex items-center gap-2 text-gray-500">
                        <Loader2 size={16} className="animate-spin text-[#046c4e]" />
                        <span>সহকারী টাইপ করছে...</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Uploaded attachments Preview */}
                {attachments.length > 0 && (
                  <div className="px-4 py-2 bg-slate-100/80 border-t border-gray-200/50 flex flex-wrap gap-2 shrink-0">
                    {attachments.map((att, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg px-2 py-1 text-xs font-semibold text-gray-700 shadow-sm">
                        {att.type === 'image' ? (
                          <ImageIcon size={12} className="text-[#046c4e]" />
                        ) : (
                          <FileText size={12} className="text-blue-600" />
                        )}
                        <span className="truncate max-w-[100px]">{att.name}</span>
                        <button 
                          onClick={() => removeAttachment(idx)} 
                          className="text-gray-400 hover:text-red-500 p-0.5 rounded cursor-pointer"
                        >
                          <X size={10} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* AI Input Footer Form */}
                <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-100 bg-white shrink-0">
                  <div className="flex items-center gap-2">
                    {/* Paperclip Button */}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={attachments.length >= 3}
                      title="ফাইল সংযুক্ত করুন (.md, .txt, .json, .yaml, .csv)"
                      className="p-2 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 text-gray-500 hover:text-emerald-700 transition shrink-0 cursor-pointer disabled:opacity-50"
                    >
                      <Paperclip size={18} />
                    </button>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      multiple 
                      onChange={handleFileSelect} 
                      accept=".md,.txt,.json,.yaml,.csv" 
                      className="hidden" 
                    />

                    {/* Text Field & Word Count indicator inside wrapper */}
                    <div className="flex-1 relative flex items-center">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="আপনার বার্তাটি বাংলায় লিখুন..."
                        disabled={isSending}
                        className="w-full pr-14 pl-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-emerald-600 focus:bg-white transition"
                      />
                      <span className={`absolute right-3 text-[9px] font-extrabold ${wordCount > MAX_WORDS ? 'text-red-500' : 'text-gray-400'}`}>
                        {wordCount}/{MAX_WORDS} শব্দ
                      </span>
                    </div>

                    {/* Send Button */}
                    <button
                      type="submit"
                      disabled={(!input.trim() && attachments.length === 0) || isSending}
                      className="p-2.5 bg-[#046c4e] hover:bg-emerald-700 disabled:opacity-40 disabled:hover:bg-[#046c4e] text-white rounded-xl transition shadow-md flex items-center justify-center shrink-0 cursor-pointer"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </form>
              </>
            ) : (
              // Live Message Support Tab
              <>
                {!liveSenderName ? (
                  <div className="flex-1 flex flex-col justify-center items-center p-6 text-center bg-gray-50">
                    <div className="w-16 h-16 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center shadow-md mb-4 border border-pink-200">
                      <MessageCircle size={28} className="animate-pulse" />
                    </div>
                    <h4 className="text-sm font-extrabold text-gray-800 mb-1">সরাসরি লাইভ চ্যাট সাপোর্ট</h4>
                    <p className="text-xs text-gray-500 mb-5 max-w-[280px] leading-relaxed">
                      এডমিনের সাথে সরাসরি যোগাযোগ করতে অনুগ্রহ করে আপনার নামটি লিখুন। এই বার্তাগুলো সম্পূর্ণ সাময়িক (৩ দিন পর স্বয়ংক্রিয়ভাবে মুছে যাবে)।
                    </p>
                    <form onSubmit={handleSaveLiveName} className="w-full max-w-[280px] space-y-3">
                      <input
                        type="text"
                        required
                        value={liveNameInput}
                        onChange={(e) => setLiveNameInput(e.target.value)}
                        placeholder="আপনার পূর্ণ নাম লিখুন"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-pink-500 bg-white shadow-inner font-extrabold"
                      />
                      <button
                        type="submit"
                        className="w-full py-2.5 bg-pink-600 hover:bg-pink-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                      >
                        চ্যাট শুরু করুন
                      </button>
                    </form>
                  </div>
                ) : (
                  <>
                    {/* Live Support Active Info banner */}
                    <div className="bg-pink-50/70 border-b border-pink-100 px-4 py-1.5 shrink-0 text-[10px] text-pink-700 flex justify-between items-center">
                      <span className="font-extrabold">👤 ইউজারনেম: {liveSenderName}</span>
                      <button 
                        onClick={() => {
                          const newName = prompt("আপনার নাম পরিবর্তন করুন:", liveSenderName);
                          if (newName && newName.trim()) {
                            setLiveSenderName(newName.trim());
                            setLiveNameInput(newName.trim());
                            localStorage.setItem("sohokari_live_sender_name", newName.trim());
                          }
                        }}
                        className="text-[9px] underline font-bold cursor-pointer hover:text-pink-900"
                      >
                        নাম পরিবর্তন
                      </button>
                    </div>

                    {/* Live messages stream */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-slate-50/40">
                      {liveMessages.length === 0 ? (
                        <div className="py-12 text-center text-gray-400 text-xs space-y-2">
                          <MessageCircle size={32} className="mx-auto text-pink-300 animate-pulse" />
                          <p className="font-semibold">কোনো পূর্ববর্তী কথোপকথন নেই।</p>
                          <p className="text-[10px] text-gray-500">এডমিনকে সরাসরি মেসেজ পাঠিয়ে আপনার জিজ্ঞাসা লিখুন।</p>
                        </div>
                      ) : (
                        liveMessages.map((m) => {
                          const isUser = m.senderId === 'user';
                          const isEditing = editingLiveId === m.id;

                          return (
                            <div 
                              key={m.id} 
                              className={`flex ${isUser ? 'justify-end' : 'justify-start'} group/live-item`}
                            >
                              <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs md:text-sm shadow-sm relative overflow-visible
                                ${isUser 
                                  ? 'bg-pink-600 text-white rounded-br-none' 
                                  : 'bg-indigo-950 text-indigo-100 rounded-bl-none border border-slate-700/50'
                                }`}
                              >
                                <div className="flex items-center justify-between gap-4 mb-1 border-b border-white/10 pb-1">
                                  <span className={`text-[9px] font-extrabold ${isUser ? 'text-pink-200' : 'text-indigo-300'}`}>
                                    {isUser ? `${m.senderName} (আপনি)` : "এডমিন (সহকারী)"}
                                  </span>

                                  {/* Copy, Edit, Delete Actions */}
                                  <div className="opacity-0 group-hover/live-item:opacity-100 transition-opacity flex items-center gap-2 ml-2 select-none">
                                    <button
                                      onClick={() => {
                                        navigator.clipboard.writeText(m.content);
                                        setCopiedLiveId(m.id);
                                        setTimeout(() => setCopiedLiveId(null), 2000);
                                      }}
                                      className="text-[9px] hover:text-yellow-300 cursor-pointer opacity-80 hover:opacity-100 font-extrabold"
                                      title="কপি করুন"
                                    >
                                      {copiedLiveId === m.id ? "কপি হয়েছে" : "কপি"}
                                    </button>
                                    
                                    {isUser && (
                                      <>
                                        <button
                                          onClick={() => {
                                            setEditingLiveId(m.id);
                                            setEditingLiveText(m.content);
                                          }}
                                          className="text-[9px] hover:text-yellow-300 cursor-pointer opacity-80 hover:opacity-100 font-extrabold"
                                          title="সম্পাদনা করুন"
                                        >
                                          এডিট
                                        </button>
                                        
                                        <button
                                          onClick={() => handleDeleteLiveMessage(m.id)}
                                          className="text-[9px] text-red-200 hover:text-red-100 font-extrabold cursor-pointer opacity-95 hover:opacity-100"
                                          title="মুছে ফেলুন"
                                        >
                                          মুছুন
                                        </button>
                                      </>
                                    )}
                                  </div>
                                </div>

                                {isEditing ? (
                                  <div className="mt-1.5 space-y-2 min-w-[200px]">
                                    <textarea
                                      value={editingLiveText}
                                      onChange={(e) => setEditingLiveText(e.target.value)}
                                      className="w-full px-2 py-1 bg-pink-850 border border-pink-400 rounded text-xs text-white focus:outline-none font-semibold resize-none"
                                      rows={2}
                                    />
                                    <div className="flex gap-1.5 justify-end">
                                      <button
                                        onClick={() => setEditingLiveId(null)}
                                        className="px-2 py-1 bg-pink-800 hover:bg-pink-900 text-[10px] font-bold text-white rounded cursor-pointer transition"
                                      >
                                        বাতিল
                                      </button>
                                      <button
                                        onClick={() => handleEditLiveMessage(m.id, editingLiveText)}
                                        className="px-2 py-1 bg-yellow-400 hover:bg-yellow-500 text-pink-950 text-[10px] font-extrabold rounded cursor-pointer transition shadow-xs"
                                      >
                                        আপডেট
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <p className="whitespace-pre-wrap leading-relaxed font-semibold">{m.content}</p>
                                )}

                                <div className="flex items-center justify-between mt-2 pt-1 border-t border-white/5">
                                  {m.isEdited && (
                                    <span className={`text-[8px] italic ${isUser ? 'text-pink-300' : 'text-indigo-400'}`}>সংশোধিত</span>
                                  )}
                                  <span className={`text-[8px] font-mono ml-auto ${isUser ? 'text-pink-200' : 'text-indigo-300'}`}>
                                    {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      )}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Live Chat Footer Form (No Attachments/Backup as per request) */}
                    <form onSubmit={handleSendLiveMessage} className="p-3 border-t border-gray-100 bg-white shrink-0">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={liveInput}
                          onChange={(e) => setLiveInput(e.target.value)}
                          placeholder="আপনার বার্তাটি এখানে লিখুন..."
                          className="flex-1 px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:bg-white transition"
                        />
                        <button
                          type="submit"
                          disabled={!liveInput.trim()}
                          className="p-2.5 bg-pink-600 hover:bg-pink-700 disabled:opacity-40 text-white rounded-xl transition shadow-md flex items-center justify-center shrink-0 cursor-pointer"
                        >
                          <Send size={18} />
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
