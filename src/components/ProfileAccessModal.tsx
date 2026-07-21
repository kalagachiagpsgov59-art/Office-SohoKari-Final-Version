import React from "react";
import { ShieldAlert, UserPlus, X } from "lucide-react";

interface ProfileAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterClick: () => void;
}

export const ProfileAccessModal: React.FC<ProfileAccessModalProps> = ({
  isOpen,
  onClose,
  onRegisterClick,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-md shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header Alert Accent */}
        <div className="bg-red-800 text-white p-5 text-center flex flex-col items-center relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1 hover:bg-white/10 rounded-full transition-all text-white"
          >
            <X size={18} />
          </button>
          
          <div className="w-12 h-12 bg-white/10 text-white rounded-full flex items-center justify-center mb-3">
            <ShieldAlert size={26} />
          </div>
          <h3 className="text-xl font-bold font-sans">প্রবেশাধিকার সংরক্ষিত!</h3>
          <p className="text-xs text-rose-100 mt-1">সুরক্ষা ও সত্যতা যাচাই নীতিমালা</p>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <p className="text-gray-700 text-sm leading-relaxed mb-6">
            তালিকায় থাকা অন্য কোনো সম্মানিত সদস্যের যোগাযোগের নম্বর ও ফেসবুক আইডি সহ বিস্তারিত তথ্য দেখতে হলে **প্রথমে আপনার নিজের তথ্য এই তথ্যভাণ্ডারে যুক্ত করতে হবে**। 
          </p>
          
          <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 text-rose-900 text-xs text-left leading-relaxed mb-6">
            📌 <strong>এটি কেন প্রয়োজন?</strong> <br />
            আমরা আমাদের দপ্তরী ও কর্মচারীদের ব্যক্তিগত তথ্যের গোপনীয়তা ও নিরাপত্তা নিশ্চিত করতে চাই। কোনো অপ্রাসঙ্গিক বা বহিরাগত ব্যক্তি যেন তালিকা অপব্যবহার করতে না পারে, সেজন্য এই নিয়মটি বাধ্যতামূলক করা হয়েছে।
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2.5">
            <button
              onClick={() => {
                onClose();
                onRegisterClick();
              }}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#046c4e] hover:bg-[#035a41] text-white text-sm font-bold rounded-lg transition-all shadow-md"
            >
              <UserPlus size={16} />
              নিজেকে যুক্ত করুন
            </button>
            
            <button
              onClick={onClose}
              className="w-full py-2.5 px-4 text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg border border-transparent hover:border-gray-200 transition-all"
            >
              এখনই নয়, পরে করব
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
