import React, { useState, useEffect, useMemo } from "react";
import { ORGANIZATIONAL_POSITIONS } from "../types";
import { BANGLADESH_LOCATIONS_DATABASE } from "../locationData";
import { 
  getDistricts, getUpazilas, getUnions, getGeneratedSchools,
  GeoDistrict, GeoUpazila, GeoUnion 
} from "../geoApi";
import { X, CheckCircle2, Loader2, Save, UserCheck, AlertTriangle, LogOut } from "lucide-react";
import { isDirectFirebaseActive, getDirectSettings, submitDirectProfileRequest, checkDirectUsername, auth, googleProvider } from "../firebase";
import { onAuthStateChanged, signInWithPopup, signOut, User } from "firebase/auth";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [dynamicSettings, setDynamicSettings] = useState<{
    fieldsConfig: {
      district: { enabled: boolean };
      upazila: { enabled: boolean };
      unionName: { enabled: boolean };
      schoolName: { enabled: boolean };
      position: { enabled: boolean };
    };
    positions: string[];
    locations: Array<{
      district: string;
      upazilas: Array<{
        name: string;
        unions: Array<{
          name: string;
          schools: string[];
        }>;
      }>;
    }>;
  } | null>(null);

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [position, setPosition] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [unionName, setUnionName] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoError, setPhotoError] = useState("");

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoError("");
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size: 2MB (2 * 1024 * 1024 bytes)
    if (file.size > 2 * 1024 * 1024) {
      setPhotoError("ছবির সাইজ ২ MB এর বেশি হতে পারবে না। অনুগ্রহ করে ছোট সাইজের ছবি আপলোড করুন।");
      e.target.value = ""; // reset input
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result as string);
    };
    reader.onerror = () => {
      setPhotoError("ছবি পড়তে সমস্যা হয়েছে। অন্য ছবি দিয়ে চেষ্টা করুন।");
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setPhoto("");
    setPhotoError("");
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authChecking, setAuthChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthChecking(false);
      if (user && user.email) {
        setEmail(user.email);
        if (user.displayName) {
          setFullName(prev => prev || user.displayName || "");
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user && result.user.email) {
        setEmail(result.user.email);
        if (result.user.displayName) {
          setFullName(prev => prev || result.user.displayName || "");
        }
      }
    } catch (err: any) {
      console.error("Google login error:", err);
      setError("গুগল একাউন্ট দিয়ে লগইন সফল হয়নি। দয়া করে আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setEmail("");
      setFullName("");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const [usernameError, setUsernameError] = useState("");
  const [checkingUsername, setCheckingUsername] = useState(false);

  // Load WebEdit settings
  useEffect(() => {
    if (isOpen) {
      if (isDirectFirebaseActive()) {
        getDirectSettings()
          .then(data => setDynamicSettings(data as any))
          .catch(err => console.error("Error loading direct settings:", err));
      } else {
        fetch("/api/settings")
          .then(res => res.json())
          .then(data => setDynamicSettings(data))
          .catch(err => console.error("Error loading settings:", err));
      }
    }
  }, [isOpen]);

  const locationsDb = useMemo(() => dynamicSettings?.locations || BANGLADESH_LOCATIONS_DATABASE, [dynamicSettings]);
  const positionsList = useMemo(() => dynamicSettings?.positions || ORGANIZATIONAL_POSITIONS, [dynamicSettings]);
  const fieldsConfig = useMemo(() => dynamicSettings?.fieldsConfig || {
    district: { enabled: true },
    upazila: { enabled: true },
    unionName: { enabled: true },
    schoolName: { enabled: true },
    position: { enabled: true }
  }, [dynamicSettings]);

  // Check username availability with debounce
  useEffect(() => {
    if (!username.trim()) {
      setUsernameError("");
      return;
    }
    const cleanUsername = username.trim().toLowerCase();
    if (cleanUsername.length < 3) {
      setUsernameError("ইউজার নেম কমপক্ষে ৩ অক্ষরের হতে হবে।");
      return;
    }
    
    const isValid = /^[a-zA-Z0-9_]+$/.test(cleanUsername);
    if (!isValid) {
      setUsernameError("ইউজার নেম শুধুমাত্র ইংরেজি অক্ষর, সংখ্যা এবং আন্ডারস্কোর (_) হতে পারবে।");
      return;
    }

    const timer = setTimeout(async () => {
      setCheckingUsername(true);
      try {
        if (isDirectFirebaseActive()) {
          const isAvailable = await checkDirectUsername(cleanUsername);
          if (!isAvailable) {
            setUsernameError("এই ইউজার নেমটি ইতিমধ্যে ব্যবহৃত হয়েছে, অনুগ্রহ করে অন্য একটি দিন।");
          } else {
            setUsernameError("");
          }
        } else {
          const response = await fetch(`/api/check-username?username=${encodeURIComponent(cleanUsername)}`);
          const data = await response.json();
          if (!response.ok || !data.available) {
            setUsernameError(data.error || "এই ইউজার নেমটি ইতিমধ্যে ব্যবহৃত হয়েছে, অনুগ্রহ করে অন্য একটি দিন।");
          } else {
            setUsernameError("");
          }
        }
      } catch (err) {
        console.error("Error checking username:", err);
      } finally {
        setCheckingUsername(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [username]);

  const [districtsList, setDistrictsList] = useState<GeoDistrict[]>([]);
  const [upazilasList, setUpazilasList] = useState<GeoUpazila[]>([]);
  const [unionsList, setUnionsList] = useState<GeoUnion[]>([]);
  const [schoolsList, setSchoolsList] = useState<string[]>([]);

  useEffect(() => {
    getDistricts().then(setDistrictsList);
  }, []);

  useEffect(() => {
    if (district) {
      getUpazilas(district).then(setUpazilasList);
    } else {
      setUpazilasList([]);
    }
  }, [district]);

  useEffect(() => {
    if (district && upazila) {
      getUnions(district, upazila).then(setUnionsList);
    } else {
      setUnionsList([]);
    }
  }, [district, upazila]);

  useEffect(() => {
    if (unionName) {
      getGeneratedSchools(unionName).then(setSchoolsList);
    } else {
      setSchoolsList([]);
    }
  }, [unionName]);

  const availableUpazilas = useMemo(() => upazilasList.map(u => u.bn_name), [upazilasList]);
  const availableUnions = useMemo(() => unionsList.map(u => ({ name: u.bn_name })), [unionsList]);
  const availableSchools = useMemo(() => schoolsList, [schoolsList]);

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDistrict(e.target.value);
    setUpazila(""); // reset upazila on district change
    setUnionName("");
    setSchoolName("");
  };

  const handleUpazilaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUpazila(e.target.value);
    setUnionName("");
    setSchoolName("");
  };

  const handleUnionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUnionName(e.target.value);
    setSchoolName("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Required fields check
    if (!fullName || !username || !phoneNumber || !position || !district || !upazila || !unionName || !schoolName || !aboutMe) {
      setError("তারকা (*) চিহ্নিত সকল তথ্য অবশ্যই প্রদান করতে হবে।");
      return;
    }

    if (usernameError) {
      setError("ইউজার নেম ত্রুটি সংশোধন করুন।");
      return;
    }

    setLoading(true);

    try {
      const profilePayload = {
        fullName,
        username: username.trim().toLowerCase(),
        phoneNumber,
        facebookUrl,
        position,
        district,
        upazila,
        unionName,
        schoolName,
        aboutMe,
        fatherName,
        motherName,
        email,
        address,
        photo,
        uid: currentUser?.uid || "",
      };

      let registeredId = "";

      if (isDirectFirebaseActive()) {
        const result = await submitDirectProfileRequest(profilePayload);
        if (!result.success || !result.profile) {
          throw new Error("নিবন্ধন করা সম্ভব হয়নি। পুনরায় চেষ্টা করুন।");
        }
        registeredId = result.profile.id;
      } else {
        const response = await fetch("/api/profiles", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profilePayload),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "নিবন্ধন করা সম্ভব হয়নি। পুনরায় চেষ্টা করুন।");
        }
        registeredId = data.profile?.id || data.id || "";
      }

      // Save registration state locally so the user is allowed to view profiles
      localStorage.setItem("doptari_registered", "true");
      localStorage.setItem("doptari_registered_phone", phoneNumber);
      localStorage.setItem("doptari_registered_name", fullName);

      setSuccess(true);
      onSuccess();
    } catch (err: any) {
      setError(err.message || "সার্ভার ত্রুটি। দয়া করে আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-[#046c4e] text-white px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold font-sans">নিজেকে যুক্ত করুন (নিবন্ধন ফর্ম)</h2>
            <p className="text-xs text-emerald-100 mt-0.5">অনুগ্রহ করে সঠিক তথ্য দিয়ে ফর্মটি পূরণ করুন</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-[#035a41] rounded-full transition-all text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="bg-rose-50 text-rose-600 px-6 py-3 border-b border-rose-100 text-sm font-medium">
            ⚠️ {error}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {authChecking ? (
            <div className="py-12 text-center flex flex-col items-center justify-center">
              <Loader2 size={36} className="animate-spin text-[#046c4e] mb-4" />
              <p className="text-sm text-slate-500 font-sans">অনুমোদন যাচাই করা হচ্ছে...</p>
            </div>
          ) : !currentUser ? (
            <div className="py-10 px-4 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-emerald-50 text-[#046c4e] border border-emerald-100 rounded-full flex items-center justify-center mb-5 shadow-sm">
                <UserCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-sans">গুগল অ্যাকাউন্ট দিয়ে যাচাইকরণ</h3>
              <p className="text-gray-600 max-w-sm mx-auto leading-relaxed mb-6 text-xs md:text-sm">
                নিরাপত্তা নিশ্চিত করতে এবং তালিকায় আপনার নিজের তথ্য সফলভাবে সংরক্ষণ করতে প্রথমে আপনার গুগল অ্যাকাউন্ট দিয়ে লগইন করুন।
              </p>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="inline-flex items-center gap-3 py-3 px-6 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm rounded-lg border border-slate-200 transition-all shadow-sm hover:shadow-md disabled:opacity-50 active:scale-98 cursor-pointer"
              >
                <svg className="w-5 h-5 inline-block mr-1" viewBox="0 0 24 24" width="20" height="20">
                  <path
                    fill="#EA4335"
                    d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.48 14.98 1 12 1 7.28 1 3.25 3.72 1.25 7.7l3.92 3.04C6.12 7.74 8.84 5.04 12 5.04z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.49 12.27c0-.81-.07-1.59-.2-2.35H12v4.45h6.44c-.28 1.48-1.12 2.73-2.38 3.58v2.97h3.85c2.25-2.07 3.58-5.12 3.58-8.65z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.17 14.74c-.23-.69-.37-1.43-.37-2.2s.13-1.51.37-2.2L1.25 7.3C.45 8.9 0 10.4 0 12s.45 3.1 1.25 4.7l3.92-2.96z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c3.24 0 5.97-1.08 7.96-2.92l-3.85-2.97c-1.08.72-2.45 1.15-4.11 1.15-3.16 0-5.88-2.7-6.83-5.7l-3.92 3.04C3.25 20.28 7.28 23 12 23z"
                  />
                </svg>
                গুগল দিয়ে লগইন করুন
              </button>
            </div>
          ) : success ? (
            <div className="py-8 px-4 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-green-50 text-[#046c4e] border border-green-200 rounded-full flex items-center justify-center mb-4 shadow-sm">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">ধন্যবাদ! নিবন্ধন সফল হয়েছে</h3>
              <p className="text-gray-600 max-w-md mx-auto leading-relaxed mb-6">
                আপনার তথ্য আমাদের সিস্টেমে পেন্ডিং (Pending) হিসেবে সংরক্ষণ করা হয়েছে। এডমিন প্যানেল কর্তৃক তথ্য যাচাই সাপেক্ষে দ্রুত এটি অনুমোদিত করা হবে এবং তালিকায় দৃশ্যমান হবে।
              </p>
              <div className="bg-green-50 text-[#046c4e] px-4 py-2.5 rounded-lg text-xs font-bold border border-green-200 mb-6">
                🎉 আপনি এখন তালিকায় থাকা অন্যান্য সকল সদস্যদের প্রোফাইল দেখতে পারবেন!
              </div>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-[#046c4e] hover:bg-[#035a41] text-white font-bold rounded-lg transition-all shadow-md"
              >
                ড্যাশবোর্ডে ফিরে যান
              </button>
            </div>
          ) : (
            <div>
              {/* Logged in User Bar */}
              <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 mb-4 text-xs">
                <div className="flex items-center gap-2">
                  {currentUser?.photoURL ? (
                    <img src={currentUser.photoURL} alt="" className="w-6 h-6 rounded-full" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-6 h-6 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center font-bold font-sans">
                      {currentUser?.displayName ? currentUser.displayName[0] : "G"}
                    </div>
                  )}
                  <div className="text-slate-700 font-sans">
                    <span className="font-bold">{currentUser?.displayName || "ব্যবহারকারী"}</span> (<span className="font-mono text-slate-500">{currentUser?.email}</span>) হিসেবে লগইন আছেন
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex items-center gap-1 text-rose-600 hover:text-rose-700 font-bold hover:underline transition-all cursor-pointer font-sans"
                >
                  <LogOut size={14} />
                  লগআউট
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
              {/* Note */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-slate-700 text-xs leading-relaxed">
                📢 <strong className="text-amber-800">বিশেষ নোটিশ:</strong> তারকা (<span className="text-rose-500">*</span>) চিহ্নিত ঘরগুলো অবশ্যই পূরণ করতে হবে। ভুল তথ্য দিলে আপনার নিবন্ধন বাতিল হতে পারে।
              </div>

              {/* Grid 1: Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    পূর্ণ নাম <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="উদাঃ মোঃ রনি আহম্মেদ"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#046c4e] focus:border-[#046c4e] text-sm bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    ইউজার নাম <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value.replace(/[^a-zA-Z0-9_]/g, ""));
                      }}
                      placeholder="উদাঃ roni123 (ইংরেজি ও সংখ্যা)"
                      className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-1 text-sm bg-white font-sans ${
                        usernameError 
                          ? "border-rose-300 focus:ring-rose-500 focus:border-rose-500 bg-rose-50/10" 
                          : username && !checkingUsername 
                            ? "border-emerald-300 focus:ring-emerald-500 focus:border-emerald-500 bg-emerald-50/10" 
                            : "border-gray-300 focus:ring-[#046c4e] focus:border-[#046c4e]"
                      }`}
                    />
                    {checkingUsername && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2">
                        <Loader2 size={16} className="animate-spin text-gray-400" />
                      </span>
                    )}
                  </div>
                  {usernameError ? (
                    <p className="text-[10px] text-rose-500 font-bold mt-1">⚠️ {usernameError}</p>
                  ) : username && !checkingUsername ? (
                    <p className="text-[10px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
                      <UserCheck size={12} /> ইউজার নেমটি খালি আছে এবং ব্যবহার করা যাবে।
                    </p>
                  ) : (
                    <p className="text-[10px] text-gray-400 mt-1">লগইন বা সরাসরি খোঁজার জন্য অনন্য ইউজার নেম দিন।</p>
                  )}
                </div>
              </div>

              {/* Grid 2: Contact & Position */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    মোবাইল নম্বর <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{11}"
                    maxLength={11}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                    placeholder="উদাঃ 01712345678"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#046c4e] focus:border-[#046c4e] text-sm font-mono bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    সাংগঠনিক পদবী <span className="text-rose-500">*</span>
                  </label>
                  <select
                    required
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#046c4e] focus:border-[#046c4e] text-sm bg-white"
                  >
                    <option value="">পদবী নির্বাচন করুন</option>
                    {ORGANIZATIONAL_POSITIONS.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Grid 3: Location */}
              <div className="grid grid-cols-1 md:grid-3 gap-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 col-span-1 md:col-span-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      জেলা <span className="text-rose-500">*</span>
                    </label>
                    <select
                      required
                      value={district}
                      onChange={handleDistrictChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#046c4e] focus:border-[#046c4e] text-sm bg-white"
                    >
                      <option value="">জেলা নির্বাচন করুন</option>
                      {districtsList.map((loc) => (
                        <option key={loc.id} value={loc.bn_name}>{loc.bn_name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      উপজেলা <span className="text-rose-500">*</span>
                    </label>
                    <select
                      required
                      disabled={!district}
                      value={upazila}
                      onChange={handleUpazilaChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#046c4e] focus:border-[#046c4e] text-sm bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">উপজেলা নির্বাচন করুন</option>
                      {availableUpazilas.map((up) => (
                        <option key={up} value={up}>{up}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      ইউনিয়ন বা পৌরসভা <span className="text-rose-500">*</span>
                    </label>
                    <select
                      required
                      disabled={!upazila}
                      value={unionName}
                      onChange={handleUnionChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#046c4e] focus:border-[#046c4e] text-sm bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">ইউনিয়ন/পৌরসভা নির্বাচন করুন</option>
                      {availableUnions.map((u) => (
                        <option key={u.name} value={u.name}>{u.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  কর্মরত বিদ্যালয়/প্রতিষ্ঠানের নাম <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  disabled={!unionName}
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  placeholder="আপনার বিদ্যালয়ের নাম লিখুন..."
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#046c4e] focus:border-[#046c4e] text-sm bg-white disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700"
                />
              </div>

              {/* Facebook and About */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  ফেসবুক প্রোফাইল লিংক
                </label>
                <input
                  type="url"
                  value={facebookUrl}
                  onChange={(e) => setFacebookUrl(e.target.value)}
                  placeholder="উদাঃ https://facebook.com/username"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#046c4e] focus:border-[#046c4e] text-sm font-mono bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  নিজের সম্পর্কে কিছু কথা <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={aboutMe}
                  onChange={(e) => setAboutMe(e.target.value)}
                  placeholder="আপনার কর্মজীবন বা অন্য কোনো কথা সংক্ষেপে লিখুন..."
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#046c4e] focus:border-[#046c4e] text-sm bg-white"
                ></textarea>
              </div>

              {/* Optional Photo Upload */}
              <div className="border-t border-gray-100 pt-4 mt-2">
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  নিজের ছবি (ঐচ্ছিক)
                </label>
                <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  {photo ? (
                    <div className="relative w-16 h-16 shrink-0 group">
                      <img
                        src={photo}
                        alt="Selected Preview"
                        className="w-16 h-16 object-cover rounded-full border-2 border-[#046c4e] shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={handleRemovePhoto}
                        className="absolute -top-1 -right-1 bg-rose-600 text-white rounded-full p-1 shadow-md hover:bg-rose-700 transition-all"
                        title="ছবি মুছুন"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-300 shrink-0">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <input
                      type="file"
                      accept="image/*"
                      id="profile-photo-input"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="profile-photo-input"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-gray-100 text-[#046c4e] border border-gray-300 rounded-lg text-xs font-bold cursor-pointer transition-all shadow-xs"
                    >
                      ছবি নির্বাচন করুন
                    </label>
                    <p className="text-[10px] text-gray-500 mt-1">
                      জেপিজি, পিএনজি বা জেপিইজি ফরম্যাট। সর্বোচ্চ সাইজ ২ মেগাবাইট (2 MB)।
                    </p>
                    {photoError && (
                      <p className="text-[10px] text-rose-500 font-bold mt-1">
                        ⚠️ {photoError}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Collapsible/Section: Optional Information */}
              <div className="border-t border-gray-200 pt-4 mt-2">
                <h4 className="text-sm font-bold text-slate-700 mb-3 bg-gray-150 px-3 py-1.5 rounded-lg inline-block">
                  ঐচ্ছিক তথ্য (প্রদান না করলেও চলবে)
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">পিতার নাম</label>
                    <input
                      type="text"
                      value={fatherName}
                      onChange={(e) => setFatherName(e.target.value)}
                      placeholder="পিতার নাম লিখুন"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#046c4e] focus:border-[#046c4e] text-sm bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">মাতার নাম</label>
                    <input
                      type="text"
                      value={motherName}
                      onChange={(e) => setMotherName(e.target.value)}
                      placeholder="মাতার নাম লিখুন"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#046c4e] focus:border-[#046c4e] text-sm bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">ইমেইল</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="উদাঃ example@mail.com"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#046c4e] focus:border-[#046c4e] text-sm font-mono bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">ঠিকানা</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="গ্রাম, পোস্ট অফিস, ইউনিয়ন"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#046c4e] focus:border-[#046c4e] text-sm bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-gray-100 border border-gray-300 rounded-lg transition-all"
                >
                  বাতিল করুন
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 text-sm font-bold bg-[#046c4e] hover:bg-[#035a41] text-white rounded-lg transition-all flex items-center gap-2 shadow-md hover:shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      প্রক্রিয়াধীন...
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      সংরক্ষণ করুন
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};
