import React, { useState, useEffect, useRef } from "react";
import { X, Search, User, AlertCircle } from "lucide-react";

interface DirectSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (username: string) => void;
  error: string;
  setError: (error: string) => void;
}

export const DirectSearchModal: React.FC<DirectSearchModalProps> = ({
  isOpen,
  onClose,
  onSearch,
  error,
  setError,
}) => {
  const [username, setUsername] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setUsername("");
      setError("");
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(username);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl w-full max-w-md shadow-2xl border border-gray-200 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#046c4e] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Search size={18} className="text-emerald-300" />
            <h3 className="text-base font-bold font-sans">সরাসরি প্রোফাইল খুঁজুন</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#035a41] rounded-full transition-all text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                সদস্যের ইউজার নাম লিখুন <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <User size={16} />
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  required
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value.replace(/[^a-zA-Z0-9_]/g, ""));
                    setError("");
                  }}
                  placeholder="উদাঃ roni123"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#046c4e] focus:border-[#046c4e] text-sm font-sans bg-white"
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-1.5">
                নিবন্ধনের সময় তৈরিকৃত ইংরেজি ছোট হাতের অক্ষরের অনন্য ইউজার নাম টাইপ করুন।
              </p>
            </div>

            {error && (
              <div className="bg-rose-50 text-rose-600 px-3.5 py-2.5 rounded-lg text-xs font-medium flex items-start gap-2 border border-rose-100 animate-pulse">
                <AlertCircle size={14} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 font-bold rounded-lg text-xs hover:bg-gray-50 transition-all"
              >
                বাতিল করুন
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-lg text-xs transition-all shadow-sm flex items-center gap-1.5"
              >
                <Search size={14} />
                প্রোফাইল দেখুন
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};
