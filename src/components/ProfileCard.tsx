import React from "react";
import { Profile } from "../types";
import { Phone, MapPin, School, Facebook, MessageSquare, ArrowRight } from "lucide-react";
import { Avatar } from "./Avatar";

interface ProfileCardProps {
  profile: Profile;
  onViewDetails: (profile: Profile) => void;
}

export function getBengaliInitials(name: string): string {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  const cleanParts = parts.filter(p => !p.includes("মোঃ") && !p.includes("মো:"));
  if (cleanParts.length > 0) {
    return cleanParts[0].substring(0, 2);
  }
  return parts[0].substring(0, 2);
}

export function getAvatarColor(name: string): string {
  const colors = [
    "bg-rose-500",
    "bg-amber-500",
    "bg-emerald-500",
    "bg-teal-500",
    "bg-sky-500",
    "bg-indigo-500",
    "bg-purple-500",
    "bg-fuchsia-500"
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onViewDetails }) => {
  const initials = getBengaliInitials(profile.fullName);
  const avatarBg = getAvatarColor(profile.fullName);

  // Helper to format phone number to Bengali numerals (optional but extremely professional!)
  const toBengaliNumerals = (numStr: string) => {
    const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return numStr.replace(/[0-9]/g, (w) => bengaliDigits[parseInt(w, 10)]);
  };

  const hasFacebook = !!profile.facebookUrl && profile.facebookUrl.trim().length > 0;

  return (
    <div 
      id={`profile-card-${profile.id}`}
      className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 p-5 flex flex-col justify-between"
    >
      <div>
        {/* Top Section: Avatar & Name/Badge */}
        <div className="flex items-start gap-4 mb-4">
          <Avatar fullName={profile.fullName} facebookUrl={profile.facebookUrl} photo={profile.photo} size="md" />
          
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="font-sans font-bold text-lg text-[#1a1a1a] tracking-tight leading-tight truncate">
                {profile.fullName}
              </h3>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-[#046c4e] border border-green-200/50 uppercase">
                {profile.position}
              </span>
            </div>
            
            {/* Status indicators */}
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-2 h-2 rounded-full bg-[#046c4e] animate-pulse"></span>
              <span className="text-xs text-gray-500 font-medium">অনুমোদিত সদস্য</span>
            </div>
          </div>
        </div>

        {/* Info Rows */}
        <div className="space-y-2.5 text-gray-600 text-sm mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-gray-50 rounded flex items-center justify-center text-gray-500 shrink-0 border border-gray-200">
              <Phone size={14} className="text-[#046c4e]" />
            </div>
            <a 
              href={`tel:${profile.phoneNumber}`} 
              className="font-mono hover:text-[#046c4e] hover:underline tracking-wide text-gray-700"
            >
              {toBengaliNumerals(profile.phoneNumber)}
            </a>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-gray-50 rounded flex items-center justify-center text-gray-500 shrink-0 border border-gray-200">
              <School size={14} className="text-[#046c4e]" />
            </div>
            <span className="truncate text-gray-700" title={profile.schoolName}>
              {profile.schoolName}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-gray-50 rounded flex items-center justify-center text-gray-500 shrink-0 border border-gray-200">
              <MapPin size={14} className="text-[#046c4e]" />
            </div>
            <span className="text-gray-700">
              {profile.upazila}, {profile.district}
            </span>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
        <a
          href={`https://wa.me/88${profile.phoneNumber}`}
          target="_blank"
          referrerPolicy="no-referrer"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold text-[#046c4e] bg-green-50 hover:bg-[#046c4e] hover:text-white border border-green-200 rounded-lg transition-all duration-200"
        >
          <MessageSquare size={13} className="text-[#046c4e] fill-[#046c4e] hover:fill-current" />
          WhatsApp
        </a>

        {hasFacebook ? (
          <a
            href={profile.facebookUrl}
            target="_blank"
            referrerPolicy="no-referrer"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-600 hover:text-white border border-blue-200 rounded-lg transition-all duration-200"
          >
            <Facebook size={13} className="text-blue-600 fill-blue-600 hover:fill-current" />
            Facebook
          </a>
        ) : (
          <button
            disabled
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold text-gray-400 bg-gray-50 border border-gray-200 rounded-lg cursor-not-allowed"
          >
            <Facebook size={13} className="text-gray-300" />
            Facebook
          </button>
        )}

        <button
          onClick={() => onViewDetails(profile)}
          className="inline-flex items-center justify-center p-2.5 bg-gray-50 border border-gray-200 text-gray-700 hover:bg-[#046c4e] hover:text-white rounded-lg transition-all duration-200"
          title="বিস্তারিত দেখুন"
        >
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
};
