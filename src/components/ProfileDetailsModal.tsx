import React from "react";
import { Profile } from "../types";
import { getBengaliInitials, getAvatarColor } from "./ProfileCard";
import { X, Phone, School, MapPin, Facebook, Mail, Home, User, MessageCircle } from "lucide-react";
import { Avatar } from "./Avatar";

interface ProfileDetailsModalProps {
  isOpen: boolean;
  profile: Profile | null;
  onClose: () => void;
}

export const ProfileDetailsModal: React.FC<ProfileDetailsModalProps> = ({ isOpen, profile, onClose }) => {
  if (!isOpen || !profile) return null;

  const initials = getBengaliInitials(profile.fullName);
  const avatarBg = getAvatarColor(profile.fullName);

  const toBengaliNumerals = (numStr: string) => {
    const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return numStr.replace(/[0-9]/g, (w) => bengaliDigits[parseInt(w, 10)]);
  };

  const hasOptionalFields = 
    (profile.fatherName && profile.fatherName.trim().length > 0) ||
    (profile.motherName && profile.motherName.trim().length > 0) ||
    (profile.email && profile.email.trim().length > 0) ||
    (profile.address && profile.address.trim().length > 0);

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-lg shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Banner with Profile Avatar */}
        <div className="relative bg-[#046c4e] text-white p-6 pt-10 text-center flex flex-col items-center">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 hover:bg-white/10 rounded-full transition-all text-white"
          >
            <X size={18} />
          </button>
          
          <Avatar fullName={profile.fullName} facebookUrl={profile.facebookUrl} photo={profile.photo} size="xl" className="mb-3" />

          <h2 className="text-2xl font-bold font-sans tracking-tight">{profile.fullName}</h2>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#035a41] text-white mt-1.5 border border-[#035a41]">
            {profile.position}
          </span>
          <p className="text-xs text-emerald-200 mt-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            সক্রিয় ও অনুমোদিত সদস্য
          </p>
        </div>

        {/* Detailed Info Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
          
          {/* Main Work Info */}
          <div className="space-y-3.5">
            <h3 className="text-sm font-bold text-gray-900 border-b border-gray-200 pb-2">📋 পেশাগত তথ্য ও অবস্থান</h3>
            
            <div className="flex items-start gap-3 text-slate-700 text-sm">
              <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200 shrink-0 mt-0.5">
                <School size={16} className="text-[#046c4e]" />
              </div>
              <div>
                <span className="block text-xs text-gray-500 font-bold">কর্মস্থল (বিদ্যালয়ের নাম)</span>
                <span className="font-semibold text-gray-900">{profile.schoolName}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-slate-700 text-sm">
              <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200 shrink-0 mt-0.5">
                <MapPin size={16} className="text-[#046c4e]" />
              </div>
              <div>
                <span className="block text-xs text-gray-500 font-bold">ঠিকানা ও সাংগঠনিক এলাকা</span>
                <span className="font-semibold text-gray-900">{profile.upazila}, {profile.district}</span>
              </div>
            </div>
          </div>

          {/* About Himself */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 text-sm">
            <span className="block text-xs text-gray-500 font-bold mb-1.5 uppercase tracking-wide">💡 নিজের সম্পর্কে কিছু কথা:</span>
            <p className="text-gray-700 leading-relaxed italic">
              "{profile.aboutMe}"
            </p>
          </div>

          {/* Optional personal fields */}
          {hasOptionalFields && (
            <div className="space-y-3.5">
              <h3 className="text-sm font-bold text-gray-900 border-b border-gray-200 pb-2">👤 ব্যক্তিগত তথ্য</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {profile.fatherName && (
                  <div className="flex items-center gap-3 text-slate-700 text-sm">
                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200 shrink-0">
                      <User size={15} className="text-[#046c4e]" />
                    </div>
                    <div>
                      <span className="block text-[10px] text-gray-500 font-bold leading-tight">পিতার নাম</span>
                      <span className="text-gray-900 font-semibold">{profile.fatherName}</span>
                    </div>
                  </div>
                )}

                {profile.motherName && (
                  <div className="flex items-center gap-3 text-slate-700 text-sm">
                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200 shrink-0">
                      <User size={15} className="text-[#046c4e]" />
                    </div>
                    <div>
                      <span className="block text-[10px] text-gray-500 font-bold leading-tight">মাতার নাম</span>
                      <span className="text-gray-900 font-semibold">{profile.motherName}</span>
                    </div>
                  </div>
                )}

                {profile.email && (
                  <div className="flex items-center gap-3 text-slate-700 text-sm">
                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200 shrink-0">
                      <Mail size={15} className="text-[#046c4e]" />
                    </div>
                    <div>
                      <span className="block text-[10px] text-gray-500 font-bold leading-tight">ইমেইল</span>
                      <span className="text-gray-900 font-semibold font-mono text-xs truncate max-w-[140px] block" title={profile.email}>
                        {profile.email}
                      </span>
                    </div>
                  </div>
                )}

                {profile.address && (
                  <div className="flex items-center gap-3 text-slate-700 text-sm">
                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200 shrink-0">
                      <Home size={15} className="text-[#046c4e]" />
                    </div>
                    <div>
                      <span className="block text-[10px] text-gray-500 font-bold leading-tight">স্থায়ী ঠিকানা</span>
                      <span className="text-gray-900 font-semibold">{profile.address}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Action Button Strip */}
        <div className="p-6 bg-gray-100 border-t border-gray-200 flex flex-col sm:flex-row gap-2">
          <a
            href={`tel:${profile.phoneNumber}`}
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#046c4e] hover:bg-[#035a41] text-white text-sm font-bold rounded-lg transition-all shadow-sm"
          >
            <Phone size={15} />
            সরাসরি কল করুন ({toBengaliNumerals(profile.phoneNumber)})
          </a>

          <div className="flex gap-2">
            <a
              href={`https://wa.me/88${profile.phoneNumber}`}
              target="_blank"
              referrerPolicy="no-referrer"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center p-3 bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 rounded-lg transition-all"
              title="WhatsApp মেসেজ"
            >
              <MessageCircle size={18} className="fill-green-700" />
            </a>

            {profile.facebookUrl ? (
              <a
                href={profile.facebookUrl}
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center p-3 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg transition-all"
                title="ফেসবুক প্রোফাইল"
              >
                <Facebook size={18} className="fill-blue-700" />
              </a>
            ) : (
              <button
                disabled
                className="inline-flex items-center justify-center p-3 bg-gray-200 text-gray-400 border border-gray-300 rounded-lg cursor-not-allowed"
                title="ফেসবুক প্রোফাইল উপলব্ধ নেই"
              >
                <Facebook size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
