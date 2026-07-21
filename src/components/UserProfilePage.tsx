import React from "react";
import { Profile } from "../types";
import { getBengaliInitials, getAvatarColor } from "./ProfileCard";
import { 
  ArrowLeft, Phone, School, MapPin, Facebook, Mail, Home, User, 
  MessageCircle, ShieldCheck, Heart, Calendar, Briefcase 
} from "lucide-react";
import { Avatar } from "./Avatar";

interface UserProfilePageProps {
  profile: Profile;
  onBack: () => void;
  onStartChat?: (profile: Profile) => void;
}

export const UserProfilePage: React.FC<UserProfilePageProps> = ({ profile, onBack, onStartChat }) => {
  const initials = getBengaliInitials(profile.fullName);
  const avatarBg = getAvatarColor(profile.fullName);

  const toBengaliNumerals = (numStr: string) => {
    const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return numStr.toString().replace(/[0-9]/g, (w) => bengaliDigits[parseInt(w, 10)]);
  };

  const hasOptionalFields = 
    (profile.fatherName && profile.fatherName.trim().length > 0) ||
    (profile.motherName && profile.motherName.trim().length > 0) ||
    (profile.email && profile.email.trim().length > 0) ||
    (profile.address && profile.address.trim().length > 0);

  // Parse relative joining or member status if needed
  const dateFormatted = profile.createdAt 
    ? toBengaliNumerals(new Date(profile.createdAt).toLocaleDateString("bn-BD", { year: 'numeric', month: 'long', day: 'numeric' }))
    : "";

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-3 duration-300">
      
      {/* Navigation & Back Button */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 hover:text-[#046c4e] font-bold text-sm rounded-xl border border-slate-200 shadow-sm transition-all duration-300 group cursor-pointer"
        >
          <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1 text-[#046c4e]" />
          <span>তালিকায় ফিরে যান</span>
        </button>
      </div>

      {/* Main Container Card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden mb-12">
        
        {/* Dynamic Colorful Banner Header */}
        <div className="relative bg-gradient-to-r from-[#046c4e] via-[#05825d] to-[#035a41] text-white p-8 md:p-10 text-center md:text-left flex flex-col md:flex-row items-center gap-6 md:gap-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
          
          <div className="relative z-10 shrink-0 transform hover:scale-105 transition-all duration-300">
            <Avatar 
              fullName={profile.fullName} 
              facebookUrl={profile.facebookUrl} 
              photo={profile.photo} 
              size="xl" 
              className="border-4 border-white/20 shadow-2xl scale-110 md:scale-125" 
            />
          </div>

          <div className="relative z-10 text-center md:text-left space-y-2 mt-4 md:mt-0 flex-1">
            <div className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-200 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase border border-emerald-400/20">
              <ShieldCheck size={13} className="text-emerald-300" />
              সক্রিয় ও অনুমোদিত সদস্য
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold font-sans text-white drop-shadow-md leading-tight">
              {profile.fullName}
            </h1>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-1 text-emerald-100 text-sm font-semibold">
              <span className="bg-[#035a41] px-3 py-1 rounded-lg border border-white/10 text-yellow-300">
                {profile.position}
              </span>
              <span className="flex items-center gap-1 text-xs text-emerald-200">
                <MapPin size={13} className="text-yellow-400" />
                {profile.upazila}, {profile.district}
              </span>
            </div>
          </div>
        </div>

        {/* Content Section - Bento Grid */}
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          
          {/* Column 1 & 2: Detailed Info (Professional, Location, and Bio) */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Professional and Workspace Information */}
            <div className="bg-slate-50/50 p-5 md:p-6 rounded-2xl border border-slate-100 space-y-4">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 pb-2.5 border-b border-slate-200">
                <Briefcase size={16} className="text-[#046c4e]" />
                <span>📋 পেশাগত তথ্য ও অবস্থান</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
                <div className="flex items-start gap-3 text-slate-700 text-sm">
                  <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center border border-emerald-100 shrink-0 mt-0.5">
                    <School size={16} className="text-[#046c4e]" />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 font-bold">কর্মস্থল (বিদ্যালয়ের নাম)</span>
                    <span className="font-bold text-slate-800">{profile.schoolName}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-700 text-sm">
                  <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center border border-emerald-100 shrink-0 mt-0.5">
                    <MapPin size={16} className="text-[#046c4e]" />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 font-bold">জেলা ও উপজেলা</span>
                    <span className="font-bold text-slate-800">{profile.upazila}, {profile.district}</span>
                  </div>
                </div>

                {profile.unionName && (
                  <div className="flex items-start gap-3 text-slate-700 text-sm">
                    <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center border border-emerald-100 shrink-0 mt-0.5">
                      <MapPin size={16} className="text-[#046c4e]" />
                    </div>
                    <div>
                      <span className="block text-xs text-slate-400 font-bold">ইউনিয়ন</span>
                      <span className="font-bold text-slate-800">{profile.unionName}</span>
                    </div>
                  </div>
                )}

                {dateFormatted && (
                  <div className="flex items-start gap-3 text-slate-700 text-sm">
                    <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center border border-emerald-100 shrink-0 mt-0.5">
                      <Calendar size={16} className="text-[#046c4e]" />
                    </div>
                    <div>
                      <span className="block text-xs text-slate-400 font-bold">তালিকায় যুক্ত হওয়ার তারিখ</span>
                      <span className="font-bold text-slate-800">{dateFormatted}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quote Block / Bio */}
            <div className="bg-[#046c4e]/5 p-5 md:p-6 rounded-2xl border border-emerald-100/50 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-emerald-500/5 rounded-full pointer-events-none"></div>
              
              <span className="block text-xs text-emerald-700 font-extrabold mb-2.5 uppercase tracking-wider flex items-center gap-1">
                <Heart size={12} className="fill-emerald-600 text-emerald-600" />
                নিজের সম্পর্কে কিছু কথা:
              </span>
              <p className="text-slate-700 leading-relaxed italic text-sm font-medium">
                "{profile.aboutMe || "সম্মানিত সদস্যের কোনো অতিরিক্ত তথ্য সংরক্ষিত নেই।"}"
              </p>
            </div>

            {/* Optional Personal Data fields */}
            {hasOptionalFields && (
              <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-100 space-y-4">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 pb-2.5 border-b border-slate-200">
                  <User size={16} className="text-[#046c4e]" />
                  <span>👤 ব্যক্তিগত তথ্য</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
                  {profile.fatherName && (
                    <div className="flex items-center gap-3 text-slate-700 text-sm">
                      <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 shrink-0">
                        <span className="text-[10px] font-bold text-slate-400">পিতা</span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-slate-400 font-bold leading-tight">পিতার নাম</span>
                        <span className="text-slate-800 font-bold">{profile.fatherName}</span>
                      </div>
                    </div>
                  )}

                  {profile.motherName && (
                    <div className="flex items-center gap-3 text-slate-700 text-sm">
                      <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 shrink-0">
                        <span className="text-[10px] font-bold text-slate-400">মাতা</span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-slate-400 font-bold leading-tight">মাতার নাম</span>
                        <span className="text-slate-800 font-bold">{profile.motherName}</span>
                      </div>
                    </div>
                  )}

                  {profile.email && (
                    <div className="flex items-center gap-3 text-slate-700 text-sm">
                      <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 shrink-0">
                        <Mail size={14} className="text-slate-500" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="block text-[10px] text-slate-400 font-bold leading-tight">ইমেইল</span>
                        <span className="text-slate-800 font-bold text-xs truncate block" title={profile.email}>
                          {profile.email}
                        </span>
                      </div>
                    </div>
                  )}

                  {profile.address && (
                    <div className="flex items-center gap-3 text-slate-700 text-sm sm:col-span-2">
                      <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 shrink-0">
                        <Home size={14} className="text-slate-500" />
                      </div>
                      <div>
                        <span className="block text-[10px] text-slate-400 font-bold leading-tight">স্থায়ী ঠিকানা</span>
                        <span className="text-slate-800 font-bold">{profile.address}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>

          {/* Column 3: Contact Channels Sidebar */}
          <div className="space-y-6">
            
            <div className="bg-slate-50/50 p-5 md:p-6 rounded-2xl border border-slate-100 space-y-5">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 pb-2.5 border-b border-slate-200">
                <Phone size={15} className="text-[#046c4e]" />
                <span>📞 সরাসরি যোগাযোগের মাধ্যম</span>
              </h3>

              <div className="space-y-3 pt-1">
                {/* Dial Direct Button */}
                <a
                  href={`tel:${profile.phoneNumber}`}
                  className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-4 bg-[#046c4e] hover:bg-[#035a41] text-white text-sm font-bold rounded-xl shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer text-center"
                >
                  <Phone size={16} />
                  <span>সরাসরি কল করুন</span>
                </a>

                {/* Temporary Chat (Free) Button */}
                <button
                  onClick={() => onStartChat && onStartChat(profile)}
                  className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer text-center"
                >
                  <MessageCircle size={16} />
                  <span>Direct Chat (Free)</span>
                </button>

                <div className="text-center py-1">
                  <span className="text-xs text-slate-400 block font-bold mb-0.5">মোবাইল নম্বর</span>
                  <span className="text-lg font-bold text-slate-800 select-all">
                    {toBengaliNumerals(profile.phoneNumber)}
                  </span>
                </div>

                <div className="h-[1px] bg-slate-200 my-4"></div>

                {/* Social Networks Row */}
                <div className="grid grid-cols-2 gap-3">
                  {/* WhatsApp Message */}
                  <a
                    href={`https://wa.me/88${profile.phoneNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white hover:bg-green-50 text-green-700 border border-slate-200 hover:border-green-300 rounded-xl font-bold text-xs transition-all duration-300 shadow-sm"
                  >
                    <MessageCircle size={15} className="fill-green-700 text-green-700" />
                    <span>WhatsApp</span>
                  </a>

                  {/* Facebook Profile */}
                  {profile.facebookUrl ? (
                    <a
                      href={profile.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white hover:bg-blue-50 text-blue-700 border border-slate-200 hover:border-blue-300 rounded-xl font-bold text-xs transition-all duration-300 shadow-sm"
                    >
                      <Facebook size={15} className="fill-blue-700 text-blue-700" />
                      <span>Facebook</span>
                    </a>
                  ) : (
                    <span
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-100 text-slate-400 border border-slate-100 rounded-xl font-bold text-xs cursor-not-allowed select-none"
                      title="ফেসবুক প্রোফাইল উপলব্ধ নেই"
                    >
                      <Facebook size={15} />
                      <span>অফলাইন</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Quick trust banner */}
            <div className="border border-emerald-500/20 bg-emerald-50/30 p-4 rounded-xl text-center">
              <span className="text-[11px] font-bold text-emerald-800 flex items-center justify-center gap-1">
                <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
                তথ্য নিরাপত্তা ও নিশ্চয়তা
              </span>
              <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                এই ডিরেক্টরির সকল তথ্য শুধুমাত্র প্রাতিষ্ঠানিক ও কল্যাণমূলক যোগাযোগের উদ্দেশ্যে সংগৃহীত ও সংরক্ষিত।
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
