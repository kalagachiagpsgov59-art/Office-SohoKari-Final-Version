import React, { useState, useEffect, useRef, useMemo } from "react";
import { Profile, ORGANIZATIONAL_POSITIONS } from "./types";
import { BANGLADESH_LOCATIONS_DATABASE } from "./locationData";
import { 
  getDistricts, getUpazilas, getUnions, getGeneratedSchools,
  GeoDistrict, GeoUpazila, GeoUnion 
} from "./geoApi";
import { ProfileCard, getBengaliInitials, getAvatarColor } from "./components/ProfileCard";
import { Avatar } from "./components/Avatar";
import { RegistrationModal } from "./components/RegistrationModal";
import { ProfileAccessModal } from "./components/ProfileAccessModal";
import { ProfileDetailsModal } from "./components/ProfileDetailsModal";
import { AdminPanel } from "./components/AdminPanel";
import { UserProfilePage } from "./components/UserProfilePage";
import { DirectSearchModal } from "./components/DirectSearchModal";
import { SohokariChat } from "./components/SohokariChat";
import { TemporaryDirectChat } from "./components/TemporaryDirectChat";
import { TemporaryChatsInbox } from "./components/TemporaryChatsInbox";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, SlidersHorizontal, MapPin, School, Phone, Plus, ShieldCheck, 
  ChevronDown, BookOpen, AlertCircle, Sparkles, Star, Users, CheckCircle, X,
  Facebook, Linkedin, Instagram, Send, Globe, ExternalLink
} from "lucide-react";
import { isDirectFirebaseActive, getDirectSettings, getDirectProfiles } from "./firebase";

function banglaToEnglishDigits(str: string): string {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return str.replace(/[০-৯]/g, (match) => {
    return banglaDigits.indexOf(match).toString();
  });
}

function englishToBanglaDigits(str: string): string {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return str.replace(/[0-9]/g, (match) => {
    return banglaDigits[parseInt(match, 10)];
  });
}

export default function App() {
  // Routing simulation
  const [currentPath, setCurrentPath] = useState(window.location.pathname.toLowerCase());

  // Toast notification state
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

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

  // Registration & Access states
  const [isRegistered, setIsRegistered] = useState(false);
  const [showRegModal, setShowRegModal] = useState(false);
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  // Search & Filter fields
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [selectedUnion, setSelectedUnion] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("");
  const [directQuery, setDirectQuery] = useState("");
  const [directSearchError, setDirectSearchError] = useState("");
  const [showDirectSearchModal, setShowDirectSearchModal] = useState(false);
  
  // Temporary 1-on-1 Chat states
  const [tempChatTarget, setTempChatTarget] = useState<Profile | null>(null);
  const [showTempChatsInbox, setShowTempChatsInbox] = useState(false);

  useEffect(() => {
    const handleOpenInbox = () => {
      setShowTempChatsInbox(true);
    };
    window.addEventListener('open-temp-chats-inbox', handleOpenInbox);
    return () => {
      window.removeEventListener('open-temp-chats-inbox', handleOpenInbox);
    };
  }, []);
  
  // Data lists
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [allApprovedProfiles, setAllApprovedProfiles] = useState<Profile[]>([]); // cache for search suggestions
  const [loading, setLoading] = useState(true);
  const [initialAppLoading, setInitialAppLoading] = useState(true);

  useEffect(() => {
    // If profiles and settings loaded, hide the initial app loading screen after a short elegant delay
    if (allApprovedProfiles.length > 0 || !loading) {
      const timer = setTimeout(() => {
        setInitialAppLoading(false);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [allApprovedProfiles, loading]);

  // WebEdit settings customization state
  const [customization, setCustomization] = useState<{
    homepage: {
      topNotice: { text: string; enabled: boolean };
      badge: { text: string; enabled: boolean };
      mainTitle: { text: string; enabled: boolean };
      subtitle: { text: string; enabled: boolean };
      directoryTitle?: { text: string; enabled: boolean };
      directorySubtitle?: { text: string; enabled: boolean };
      ourPages?: Array<{
        id: string;
        title: string;
        url: string;
        enabled: boolean;
      }>;
    };
    footer: {
      copyright: { text: string; enabled: boolean };
      description: { text: string; enabled: boolean };
      socialLinks?: Array<{
        id: string;
        platform: string;
        url: string;
        enabled: boolean;
      }>;
    };
  } | null>(null);

  // Fetch website settings on load
  useEffect(() => {
    if (isDirectFirebaseActive()) {
      getDirectSettings()
        .then(data => {
          if (data && data.customization) {
            setCustomization(data.customization);
          }
        })
        .catch(err => console.error("Error loading web settings from Firestore:", err));
    } else {
      fetch("/api/settings")
        .then(res => res.json())
        .then(data => {
          if (data && data.customization) {
            setCustomization(data.customization);
          }
        })
        .catch(err => console.error("Error loading web settings:", err));
    }
  }, []);

  // Dynamic geo api states
  const [districtsList, setDistrictsList] = useState<GeoDistrict[]>([]);
  const [upazilasList, setUpazilasList] = useState<GeoUpazila[]>([]);
  const [unionsList, setUnionsList] = useState<GeoUnion[]>([]);
  const [schoolsList, setSchoolsList] = useState<string[]>([]);

  // Fetch districts on load
  useEffect(() => {
    getDistricts().then(setDistrictsList);
  }, []);

  // Fetch upazilas when district changes
  useEffect(() => {
    if (selectedDistrict) {
      getUpazilas(selectedDistrict).then(setUpazilasList);
    } else {
      setUpazilasList([]);
    }
  }, [selectedDistrict]);

  // Fetch unions when district & upazila changes
  useEffect(() => {
    if (selectedDistrict && selectedUpazila) {
      getUnions(selectedDistrict, selectedUpazila).then(setUnionsList);
    } else {
      setUnionsList([]);
    }
  }, [selectedDistrict, selectedUpazila]);

  // Populate schools list
  useEffect(() => {
    if (selectedUnion) {
      getGeneratedSchools(selectedUnion).then(setSchoolsList);
    } else {
      setSchoolsList([]);
    }
  }, [selectedUnion]);

  const upazilaOptions = useMemo(() => upazilasList.map(u => u.bn_name), [upazilasList]);
  const availableUnions = useMemo(() => unionsList.map(u => u.bn_name), [unionsList]);
  const availableSchools = useMemo(() => schoolsList, [schoolsList]);

  // Suggestions state
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Profile[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // set to 6 so pagination can be tested with seed data!

  // Check registration and location path on load
  useEffect(() => {
    const checkReg = localStorage.getItem("doptari_registered");
    if (checkReg === "true") {
      setIsRegistered(true);
    }

    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname.toLowerCase());
    };
    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  // Synchronize URL routing for profile details view & handling browser refresh
  useEffect(() => {
    const pathParts = currentPath.split("/");
    if (pathParts[1] === "profile" && pathParts[2]) {
      const idOrUsername = pathParts[2].trim().toLowerCase();
      const found = allApprovedProfiles.find(
        p => p.id.toLowerCase() === idOrUsername || (p.username && p.username.toLowerCase() === idOrUsername)
      );
      if (found) {
        setSelectedProfile(found);
      }
    } else if (currentPath === "/" || currentPath === "" || currentPath === "/index.html") {
      setSelectedProfile(null);
    }
  }, [currentPath, allApprovedProfiles]);

  const navigateTo = (path: string) => {
    window.history.pushState(null, "", path);
    setCurrentPath(path.toLowerCase());
  };

  // Fetch approved profiles
  const fetchApprovedProfiles = async () => {
    setLoading(true);
    try {
      if (isDirectFirebaseActive()) {
        const data = await getDirectProfiles({
          search: searchQuery,
          position: selectedPosition,
          district: selectedDistrict,
          upazila: selectedUpazila,
          unionName: selectedUnion,
          school: selectedSchool
        });
        setProfiles(data);
      } else {
        const params = new URLSearchParams();
        if (searchQuery) params.append("search", searchQuery);
        if (selectedPosition) params.append("position", selectedPosition);
        if (selectedDistrict) params.append("district", selectedDistrict);
        if (selectedUpazila) params.append("upazila", selectedUpazila);
        if (selectedUnion) params.append("unionName", selectedUnion);
        if (selectedSchool) params.append("school", selectedSchool);

        const response = await fetch(`/api/profiles?${params.toString()}`);
        if (response.ok) {
          const data = await response.json();
          setProfiles(data);
        }
      }
    } catch (error) {
      console.error("Error fetching profiles:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch and full cache fetch for autocomplete suggestions
  useEffect(() => {
    fetchApprovedProfiles();
    
    if (isDirectFirebaseActive()) {
      getDirectProfiles({})
        .then(data => setAllApprovedProfiles(data))
        .catch(err => console.error("Error loading direct cache:", err));
    } else {
      // fetch all approved profiles once for instant local autocomplete
      fetch("/api/profiles")
        .then(res => res.json())
        .then(data => setAllApprovedProfiles(data))
        .catch(err => console.error("Error loading cache:", err));
    }
  }, [selectedPosition, selectedDistrict, selectedUpazila, selectedUnion, selectedSchool]); // Refetch automatically on dropdown filters

  // Listen to SOHOKARI AI view profile events for direct page navigation
  useEffect(() => {
    const handleViewProfile = (e: Event) => {
      const customEvent = e as CustomEvent;
      const profileId = customEvent.detail?.id;
      if (profileId && allApprovedProfiles.length > 0) {
        const found = allApprovedProfiles.find(p => p.id === profileId);
        if (found) {
          setSelectedProfile(found);
          navigateTo(`/profile/${found.id}`);
        }
      }
    };
    window.addEventListener('view-profile', handleViewProfile);
    return () => window.removeEventListener('view-profile', handleViewProfile);
  }, [allApprovedProfiles]);

  // Trigger search on query enter / button click
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    setCurrentPage(1);
    fetchApprovedProfiles();
  };

  const handleDirectSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDirectSearchError("");

    if (!directQuery.trim()) {
      setDirectSearchError("দয়া করে ইউজার নাম বা মোবাইল নম্বর লিখুন।");
      return;
    }

    const query = directQuery.toLowerCase().trim();
    // Search in allApprovedProfiles (which has all approved profiles)
    const found = allApprovedProfiles.find(p => 
      p.fullName.toLowerCase() === query || 
      p.fullName.toLowerCase().includes(query) ||
      p.phoneNumber === query ||
      p.id === query ||
      (p.username && p.username.toLowerCase() === query)
    );

    if (found) {
      setDirectQuery("");
      setDirectSearchError("");
      handleViewProfileDetails(found);
    } else {
      setDirectSearchError("ইউজার পাওয়া যায়নি! সঠিক নাম, ইউজার নাম বা মোবাইল নম্বর দিন।");
    }
  };

  const handleDirectUsernameSearch = (usernameInput: string) => {
    setDirectSearchError("");
    const query = usernameInput.toLowerCase().trim();
    if (!query) {
      setDirectSearchError("দয়া করে ইউজার নাম লিখুন।");
      return;
    }

    const found = allApprovedProfiles.find(p => 
      p.username && p.username.toLowerCase() === query
    );

    if (found) {
      setDirectSearchError("");
      setShowDirectSearchModal(false); // Close direct search modal
      handleViewProfileDetails(found); // Open details modal!
    } else {
      setDirectSearchError("ইউজার নেম পাওয়া যায়নি! সঠিক ইউজার নাম দিন।");
    }
  };

  // Generate real-time search suggestions
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    const queryEn = banglaToEnglishDigits(query);
    const queryBn = englishToBanglaDigits(query);

    const filtered = allApprovedProfiles.filter(p => 
      p.fullName.toLowerCase().includes(query) ||
      p.fullName.toLowerCase().includes(queryEn) ||
      p.fullName.toLowerCase().includes(queryBn) ||
      p.phoneNumber.includes(query) ||
      p.phoneNumber.includes(queryEn) ||
      p.phoneNumber.includes(queryBn) ||
      p.schoolName.toLowerCase().includes(query) ||
      p.schoolName.toLowerCase().includes(queryEn) ||
      p.schoolName.toLowerCase().includes(queryBn)
    );

    setSuggestions(filtered.slice(0, 5)); // show top 5 suggestions
  }, [searchQuery, allApprovedProfiles]);

  // Click outside suggestions box to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle viewing profile card details
  const handleViewProfileDetails = (profile: Profile) => {
    navigateTo(`/profile/${profile.id}`);
    setSelectedProfile(profile);
  };

  const handleDistrictSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(e.target.value);
    setSelectedUpazila(""); // reset upazila on district change
    setSelectedUnion("");
    setSelectedSchool("");
  };

  // Pagination lists
  const indexOfLastItem = currentPage * itemsPerPage;
  const currentProfiles = profiles.slice(0, indexOfLastItem); // For "Load More" flow
  const totalPages = Math.ceil(profiles.length / itemsPerPage);

  const handlePageSelect = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // scroll smoothly to directory title
    document.getElementById("directory-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLoadMore = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handleRegistrationSuccess = () => {
    setIsRegistered(true);
    fetchApprovedProfiles();
    // Re-cache approved list
    fetch("/api/profiles")
      .then(res => res.json())
      .then(data => setAllApprovedProfiles(data));
  };

  const toBengaliNumerals = (numStr: string) => {
    const bDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return numStr.toString().replace(/[0-9]/g, (w) => bDigits[parseInt(w, 10)]);
  };

  if (initialAppLoading) {
    return (
      <AnimatePresence>
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 bg-slate-50 flex flex-col items-center justify-center z-50 select-none"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center max-w-md px-6 space-y-6"
          >
            {/* Logo or pulsing icon */}
            <div className="relative flex items-center justify-center">
              {/* Soft pulsing glow behind */}
              <div className="absolute w-28 h-28 bg-emerald-200/50 rounded-full blur-2xl animate-pulse"></div>
              
              {/* Main Emblem Circle */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.05, 1],
                  boxShadow: ["0px 4px 20px rgba(4,108,78,0.2)", "0px 4px 30px rgba(4,108,78,0.4)", "0px 4px 20px rgba(4,108,78,0.2)"]
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-24 h-24 bg-[#046c4e] text-yellow-300 rounded-full flex items-center justify-center shadow-lg border-2 border-emerald-400/20"
              >
                <BookOpen size={44} className="text-yellow-400" />
              </motion.div>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight font-sans">
                প্রাথমিক বিদ্যালয় অফিস সহায়ক বাংলাদেশ
              </h2>
              <p className="text-xs text-emerald-700 font-extrabold tracking-wide uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 inline-block">
                ডিজিটাল তথ্যকোষ ও কল্যাণ ডিরেক্টরি
              </p>
            </div>

            {/* Sleek Line Progress Loader */}
            <div className="w-56 h-1.5 bg-gray-200 rounded-full overflow-hidden mx-auto relative shadow-inner">
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
                className="h-full bg-gradient-to-r from-[#046c4e] via-emerald-500 to-[#046c4e] rounded-full"
              />
            </div>

            <p className="text-[11px] text-gray-400 font-bold tracking-widest uppercase animate-pulse">
              তথ্য লোড হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন...
            </p>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // If URL is /RIFAT-ADMIN (or rifat-admin case-insensitive), render Admin Panel
  const normalizedPath = currentPath.trim().replace(/\/$/, "");
  if (normalizedPath === "/rifat-admin") {
    return (
      <AdminPanel 
        onBackToHome={() => {
          window.location.href = "/";
        }} 
      />
    );
  }

  // If a profile is selected, render the dedicated profile page view
  if (selectedProfile) {
    return (
      <div className="min-h-screen bg-[#f9fafb] flex flex-col font-sans relative">
        
        {/* Toast Notification */}
        {toast && (
          <div className="fixed top-5 right-5 z-50 animate-bounce max-w-sm w-full bg-slate-900/95 border border-emerald-500/30 text-white rounded-2xl p-4 shadow-2xl flex items-start gap-3 backdrop-blur-md">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
              <CheckCircle size={18} />
            </div>
            <div className="flex-1">
              <h5 className="text-xs font-extrabold text-emerald-400">Dataset Updated</h5>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed font-bold">{toast.message}</p>
            </div>
            <button onClick={() => setToast(null)} className="text-slate-400 hover:text-white transition-all cursor-pointer">
              <X size={14} />
            </button>
          </div>
        )}
        
        {/* 1. TOP NOTICE AREA */}
        {(!customization || customization.homepage.topNotice?.enabled) && (
          <div className="bg-[#046c4e] text-white py-2 px-6 text-[11px] text-center font-semibold tracking-wide flex items-center justify-center gap-2 border-b border-white/10 shadow-sm">
            <span className="inline-block w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
            {customization?.homepage.topNotice?.text || "আসসালামু আলাইকুম। সম্মানিত প্রাথমিক বিদ্যালয় অফিস সহায়ক ভাইদের সর্ববৃহৎ ডিজিটাল তথ্যকোষ ও কল্যাণ ডিরেক্টরি।"}
          </div>
        )}

        <UserProfilePage 
          profile={selectedProfile} 
          onBack={() => {
            navigateTo("/");
            setSelectedProfile(null);
          }} 
          onStartChat={(profile) => {
            setTempChatTarget(profile);
          }}
        />

        {/* FOOTER BRANDS ACCENT */}
        <footer className="bg-slate-900 text-slate-400 py-10 px-4 mt-auto border-t border-slate-800 text-center">
          <div className="max-w-4xl mx-auto space-y-2">
            {(!customization || customization.footer.copyright?.enabled) && (
              <p className="text-sm font-bold text-slate-300">
                {customization?.footer.copyright?.text || `প্রাথমিক বিদ্যালয় অফিস সহায়ক বাংলাদেশ কল্যাণ ডিরেক্টরি © ${toBengaliNumerals("2026")}`}
              </p>
            )}
            {(!customization || customization.footer.description?.enabled) && (
              <p className="text-xs text-slate-500 mt-2">
                {customization?.footer.description?.text || "সর্বস্বত্ব সংরক্ষিত। এটি প্রাথমিক বিদ্যালয়ের কর্মচারীদের একটি স্বেচ্ছাসেবী ডিজিটাল কল্যাণ উদ্যোগ।"}
              </p>
            )}

            {((customization?.footer?.socialLinks || [
              { id: "fb", platform: "Facebook", url: "https://facebook.com", enabled: true },
              { id: "wa", platform: "WhatsApp", url: "https://wa.me/880", enabled: true },
              { id: "tg", platform: "Telegram", url: "https://t.me/", enabled: true },
              { id: "li", platform: "LinkedIn", url: "https://linkedin.com", enabled: true },
              { id: "ig", platform: "Instagram", url: "https://instagram.com", enabled: true }
            ]).filter(l => l.enabled).length > 0) && (
              <div className="flex flex-wrap justify-center items-center gap-3 mt-6 pt-4 border-t border-slate-800/60">
                {(customization?.footer?.socialLinks || [
                  { id: "fb", platform: "Facebook", url: "https://facebook.com", enabled: true },
                  { id: "wa", platform: "WhatsApp", url: "https://wa.me/880", enabled: true },
                  { id: "tg", platform: "Telegram", url: "https://t.me/", enabled: true },
                  { id: "li", platform: "LinkedIn", url: "https://linkedin.com", enabled: true },
                  { id: "ig", platform: "Instagram", url: "https://instagram.com", enabled: true }
                ]).filter(l => l.enabled).map(link => (
                  <a
                    key={link.id}
                    href={link.url.startsWith("http") ? link.url : `https://${link.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-950/40 hover:bg-slate-950 text-slate-300 hover:text-emerald-400 rounded-full border border-slate-800 hover:border-emerald-500/30 text-xs transition-all duration-300"
                  >
                    {link.platform.toLowerCase().includes("facebook") || link.platform.toLowerCase().includes("fb") ? <Facebook size={14} className="text-blue-500" /> :
                     link.platform.toLowerCase().includes("linkedin") ? <Linkedin size={14} className="text-sky-500" /> :
                     link.platform.toLowerCase().includes("instagram") || link.platform.toLowerCase().includes("ig") ? <Instagram size={14} className="text-pink-500" /> :
                     link.platform.toLowerCase().includes("telegram") || link.platform.toLowerCase().includes("tg") ? <Send size={14} className="text-sky-400" /> :
                     link.platform.toLowerCase().includes("whatsapp") || link.platform.toLowerCase().includes("wa") ? <Phone size={14} className="text-emerald-500" /> :
                     <Globe size={14} className="text-slate-400" />}
                    <span className="font-medium">{link.platform}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </footer>

        {/* PERMANENT DEVELOPER CREDIT STRIP */}
        <div id="developer-credit-footer" className="bg-slate-950 text-slate-500 py-4 px-4 text-center border-t border-slate-900 text-xs tracking-wide">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
            <span>Designed & Developed by</span>
            <a
              href="https://oaliur.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 font-medium hover:text-emerald-300 transition-all duration-300 relative inline-block group hover:drop-shadow-[0_0_6px_rgba(52,211,153,0.6)]"
            >
              Oaliur Rahman SIyam
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>
        </div>

        {/* Temporary 1-on-1 Chats System */}
        <TemporaryDirectChat
          isOpen={!!tempChatTarget}
          onClose={() => setTempChatTarget(null)}
          targetProfile={tempChatTarget || ({} as Profile)}
        />

        <TemporaryChatsInbox
          isOpen={showTempChatsInbox}
          onClose={() => setShowTempChatsInbox(false)}
          onSelectPartner={(partner) => {
            setShowTempChatsInbox(false);
            setTempChatTarget(partner);
          }}
          allProfiles={allApprovedProfiles}
        />

        {/* SOHOKARI AI Assistant floating chat widget */}
        <SohokariChat />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#f9fafb] flex flex-col font-sans relative"
    >
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 animate-bounce max-w-sm w-full bg-slate-900/95 border border-emerald-500/30 text-white rounded-2xl p-4 shadow-2xl flex items-start gap-3 backdrop-blur-md">
          <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
            <CheckCircle size={18} />
          </div>
          <div className="flex-1">
            <h5 className="text-xs font-extrabold text-emerald-400">Dataset Updated</h5>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed font-bold">{toast.message}</p>
          </div>
          <button onClick={() => setToast(null)} className="text-slate-400 hover:text-white transition-all cursor-pointer">
            <X size={14} />
          </button>
        </div>
      )}
      
      {/* 1. TOP NOTICE AREA */}
      {(!customization || customization.homepage.topNotice?.enabled) && (
        <div className="bg-[#046c4e] text-white py-2 px-6 text-[11px] text-center font-semibold tracking-wide flex items-center justify-center gap-2 border-b border-white/10 shadow-sm">
          <span className="inline-block w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
          {customization?.homepage.topNotice?.text || "আসসালামু আলাইকুম। সম্মানিত প্রাথমিক বিদ্যালয় অফিস সহায়ক ভাইদের সর্ববৃহৎ ডিজিটাল তথ্যকোষ ও কল্যাণ ডিরেক্টরি।"}
        </div>
      )}

      {/* Our Pages (External Links) Banner */}
      {customization?.homepage.ourPages && customization.homepage.ourPages.filter(p => p.enabled).length > 0 && (
        <div className="bg-white border-b border-gray-150 py-2 px-4 shadow-sm relative z-20">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-2.5 text-center">
            <span className="text-[10px] md:text-xs font-extrabold text-gray-500 uppercase tracking-wider flex items-center justify-center gap-1.5 shrink-0 font-sans">
              <Globe size={13} className="text-[#046c4e]" />
              Our Pages / অন্যান্য লিংকসমূহ:
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 overflow-x-auto py-0.5 max-w-full">
              {customization.homepage.ourPages.filter(p => p.enabled).map((page) => (
                <a
                  key={page.id}
                  href={page.url.startsWith("http") ? page.url : `https://${page.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-[#046c4e] hover:text-[#035a41] border border-emerald-150 rounded-full text-[11px] font-bold transition-all duration-300 shadow-sm cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>{page.title}</span>
                  <ExternalLink size={9} className="text-emerald-600" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. GREEN HERO SECTION */}
      <section className="bg-[#046c4e] text-white pt-5 md:pt-6 pb-16 md:pb-20 px-4 relative overflow-hidden">
        
        {/* Vector patterns in bg */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          
          {(!customization || customization.homepage.badge?.enabled) && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] md:text-xs font-bold bg-[#035a41]/60 text-yellow-400 border border-white/10 mb-2 md:mb-2.5 tracking-wide uppercase">
              <Star size={11} className="fill-yellow-400" />
              {customization?.homepage.badge?.text || "বাংলাদেশ সরকারি প্রাথমিক বিদ্যালয়"}
            </span>
          )}

          {(!customization || customization.homepage.mainTitle?.enabled) && (
            <h1 className="text-2xl md:text-3xl font-extrabold font-sans text-white drop-shadow-sm tracking-tight leading-tight mb-1">
              {customization?.homepage.mainTitle?.text || "প্রাথমিক বিদ্যালয় অফিস সহায়ক বাংলাদেশ"}
            </h1>
          )}

          {(!customization || customization.homepage.subtitle?.enabled) && (
            <p className="text-[11px] md:text-xs text-emerald-50 max-w-lg mx-auto leading-relaxed font-light mb-1">
              {customization?.homepage.subtitle?.text || "সকল সরকারি প্রাথমিক বিদ্যালয়ের অফিস সহায়ক কর্মচারীদের সঠিক যোগাযোগ ও সাংগঠনিক তথ্য এক ক্লিকেই খুজে নিন।"}
            </p>
          )}

          <div className="mt-2 md:mt-2.5 flex items-center justify-center gap-3">
            <div className="bg-[#035a41]/75 border border-white/10 px-2 py-1 rounded-lg flex items-center gap-1.5 shadow-sm">
              <Users size={12} className="text-emerald-300" />
              <span className="text-[10px] md:text-xs text-emerald-100 font-bold">
                {toBengaliNumerals(allApprovedProfiles.length)}+ অনুমোদিত সদস্য
              </span>
            </div>
            
            <a 
              href="#directory-section"
              className="text-[10px] md:text-xs text-yellow-300 hover:text-yellow-100 underline decoration-dotted underline-offset-4 font-bold"
            >
              তালিকায় যান ↓
            </a>
          </div>

          {/* 3. CENTERED SEARCH BOX AREA */}
          <div className="mt-2.5 md:mt-3 max-w-2xl mx-auto text-left">
            <div className="bg-white text-[#1a1a1a] rounded-lg p-3 md:p-3.5 shadow-md border border-gray-150 relative">
              
              <form onSubmit={handleSearchSubmit} className="space-y-2">
                
                {/* Search Text Input Row */}
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#046c4e]">
                    <Search size={18} />
                  </span>
                  
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="সদস্যের নাম বা মোবাইল নম্বর (বাংলা/English) দিয়ে খুঁজুন..."
                    className="w-full pl-11 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#046c4e] focus:border-[#046c4e] transition-all font-sans"
                  />

                  {/* Suggestions Dropdown */}
                  {showSuggestions && suggestions.length > 0 && (
                    <div 
                      ref={suggestionsRef}
                      className="absolute left-0 right-0 top-full mt-2 bg-white rounded-lg border border-gray-200 shadow-xl overflow-hidden z-30 divide-y divide-gray-100 animate-in fade-in duration-100"
                    >
                      <div className="bg-gray-50 px-4 py-1.5 text-[10px] text-gray-500 font-bold tracking-wider uppercase border-b border-gray-200">
                        অনুসন্ধান সাজেশন্স
                      </div>
                      {suggestions.map((p) => {
                        const init = getBengaliInitials(p.fullName);
                        const avBg = getAvatarColor(p.fullName);
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => {
                              setSearchQuery(p.fullName);
                              setShowSuggestions(false);
                              handleViewProfileDetails(p);
                            }}
                            className="w-full text-left px-4 py-2.5 hover:bg-gray-50 flex items-center gap-3 transition-all"
                          >
                            <Avatar fullName={p.fullName} facebookUrl={p.facebookUrl} photo={p.photo} size="sm" />
                            <div className="flex-1 min-w-0">
                              <span className="block font-bold text-xs text-[#1a1a1a] truncate">{p.fullName}</span>
                              <span className="block text-[10px] text-gray-500 truncate mt-0.5">
                                {p.position} • {p.upazila}, {p.district}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Dropdowns Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
                  {/* Position */}
                  <div className="relative">
                    <select
                      value={selectedPosition}
                      onChange={(e) => {
                        setSelectedPosition(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full pl-4 pr-8 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs font-semibold appearance-none focus:outline-none focus:ring-1 focus:ring-[#046c4e] text-gray-700 bg-white"
                    >
                      <option value="">সকল পদবী</option>
                      {ORGANIZATIONAL_POSITIONS.map((pos) => (
                        <option key={pos} value={pos}>{pos}</option>
                      ))}
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      <ChevronDown size={14} />
                    </span>
                  </div>

                  {/* District */}
                  <div className="relative">
                    <select
                      value={selectedDistrict}
                      onChange={(e) => {
                        handleDistrictSelect(e);
                        setCurrentPage(1);
                      }}
                      className="w-full pl-4 pr-8 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs font-semibold appearance-none focus:outline-none focus:ring-1 focus:ring-[#046c4e] text-gray-700 bg-white"
                    >
                      <option value="">সকল জেলা</option>
                      {districtsList.map((loc) => (
                        <option key={loc.id} value={loc.bn_name}>{loc.bn_name}</option>
                      ))}
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      <ChevronDown size={14} />
                    </span>
                  </div>

                  {/* Upazila */}
                  <div className="relative">
                    <select
                      disabled={!selectedDistrict}
                      value={selectedUpazila}
                      onChange={(e) => {
                        setSelectedUpazila(e.target.value);
                        setSelectedUnion("");
                        setSelectedSchool("");
                        setCurrentPage(1);
                      }}
                      className="w-full pl-4 pr-8 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs font-semibold appearance-none focus:outline-none focus:ring-1 focus:ring-[#046c4e] text-gray-700 bg-white disabled:opacity-50"
                    >
                      <option value="">সকল উপজেলা</option>
                      {upazilaOptions.map((up) => (
                        <option key={up} value={up}>{up}</option>
                      ))}
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      <ChevronDown size={14} />
                    </span>
                  </div>

                  {/* Union / Municipality Select dropdown */}
                  <div className="relative">
                    <select
                      disabled={!selectedUpazila}
                      value={selectedUnion}
                      onChange={(e) => {
                        setSelectedUnion(e.target.value);
                        setSelectedSchool("");
                        setCurrentPage(1);
                      }}
                      className="w-full pl-4 pr-8 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs font-semibold appearance-none focus:outline-none focus:ring-1 focus:ring-[#046c4e] text-gray-700 bg-white disabled:opacity-50"
                    >
                      <option value="">সকল ইউনিয়ন/পৌরসভা</option>
                      {availableUnions.map((un) => (
                        <option key={un} value={un}>{un}</option>
                      ))}
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      <ChevronDown size={14} />
                    </span>
                  </div>

                </div>

                {/* Submit button inside form */}
                <div className="flex justify-end pt-0.5">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-5 py-2 bg-[#046c4e] hover:bg-[#035a41] text-white rounded-lg font-bold text-xs tracking-wide transition-all shadow-sm flex items-center justify-center gap-2"
                  >
                    <Search size={13} />
                    অনুসন্ধান করুন
                  </button>
                </div>

              </form>

              {/* Direct Profile Access Divider */}
              <div className="relative flex py-2 items-center mt-3 border-t border-gray-100">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-3 text-[10px] md:text-xs font-bold text-gray-400 bg-white px-2">
                  সরাসরি ইউজার নাম দিয়ে প্রোফাইল খুঁজুন
                </span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              {/* Direct Username Search Modal Trigger Button */}
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={() => setShowDirectSearchModal(true)}
                  className="px-6 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-xs rounded-lg shadow-sm transition-all flex items-center gap-2 border border-yellow-500 animate-pulse hover:animate-none"
                >
                  <Search size={14} />
                  ইউজার নেম দিয়ে সরাসরি খুঁজুন
                </button>
              </div>
            </div>
          </div>

          {/* Add Yourself Action trigger */}
          <div className="mt-4 md:mt-4.5 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setShowRegModal(true)}
              className="inline-flex items-center gap-2 py-2.5 px-5 bg-yellow-400 hover:bg-yellow-500 hover:scale-102 text-gray-900 font-bold text-sm rounded-lg transition-all shadow-md border border-[#046c4e]/20"
            >
              <Plus size={15} className="stroke-[3]" />
              নিজেকে যুক্ত করুন
            </button>
          </div>

        </div>

        {/* Beautiful wavy bottom separator with drop-shadow for premium curve depth */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10 translate-y-[1px] pointer-events-none drop-shadow-[0_-4px_6px_rgba(0,0,0,0.08)]">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[32px] md:h-[48px] fill-[#f9fafb]">
            <path d="M0,60 C150,110 350,110 500,60 C650,10 850,10 1200,60 L1200,120 L0,120 Z"></path>
          </svg>
        </div>

        {/* Bouncing down arrow scroll indicator */}
        <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
          <button
            onClick={() => {
              document.getElementById("directory-section")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-9 h-9 md:w-10 md:h-10 bg-white text-[#046c4e] rounded-full flex items-center justify-center shadow-lg border border-gray-150 hover:bg-emerald-50 hover:scale-110 active:scale-95 transition-all animate-bounce group"
            title="স্ক্রোল করুন"
          >
            <ChevronDown size={18} className="stroke-[3] text-[#046c4e] group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </section>

      {/* 4. MAIN DIRECTORY LAYOUT & LISTINGS */}
      <section id="directory-section" className="max-w-7xl mx-auto px-4 py-12 flex-1">
        
        {/* Section Heading Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-200">
          <div>
            {(!customization || customization.homepage.directoryTitle?.enabled) && (
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2 tracking-tight">
                <span className="w-1.5 h-6 bg-[#046c4e] rounded-full"></span>
                {customization?.homepage.directoryTitle?.text || "নিবন্ধিত সদস্যদের তালিকা"}
              </h2>
            )}
            {(!customization || customization.homepage.directorySubtitle?.enabled) && (
              <p className="text-xs text-gray-500 mt-1">
                {customization?.homepage.directorySubtitle?.text || "সক্রিয় ও ভেরিফাইড দপ্তরী কাম নৈশপ্রহরীদের তালিকা"}
              </p>
            )}
          </div>

          <div className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-xs font-bold border border-gray-200 flex items-center gap-1.5 self-start sm:self-auto">
            <SlidersHorizontal size={13} className="text-[#046c4e]" />
            ফলাফল: <span className="font-mono text-[#046c4e]">{toBengaliNumerals(profiles.length)}</span> জন সদস্য
          </div>
        </div>

        {/* Loading Indicator */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-white rounded-xl border border-gray-100 p-5 flex flex-col justify-between h-[210px] animate-pulse shadow-sm relative overflow-hidden">
                {/* Accent line skeleton */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100"></div>
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    {/* Skeleton Avatar */}
                    <div className="w-12 h-12 bg-slate-200 rounded-full shrink-0"></div>
                    {/* Skeleton Name & Badge */}
                    <div className="flex-1 space-y-2 mt-1">
                      <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                      <div className="h-3 bg-slate-100 rounded w-1/3"></div>
                    </div>
                  </div>
                  {/* Skeleton Rows */}
                  <div className="space-y-3 pt-1">
                    <div className="h-3 bg-slate-100 rounded w-5/6"></div>
                    <div className="h-3 bg-slate-100 rounded w-4/6"></div>
                    <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                  </div>
                </div>
                {/* Skeleton Button */}
                <div className="h-9 bg-slate-200/80 rounded-xl w-full mt-4"></div>
              </div>
            ))}
          </div>
        ) : profiles.length === 0 ? (
          <div className="bg-white rounded-xl p-16 text-center border border-gray-200 max-w-md mx-auto shadow-sm">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-200">
              <AlertCircle size={24} />
            </div>
            <h3 className="font-bold text-gray-900 text-md mb-1.5">কোনো সদস্য পাওয়া যায়নি!</h3>
            <p className="text-gray-500 text-xs leading-relaxed mb-6">
              আপনার নির্বাচিত পদবী বা জেলার অধীনে কোনো সক্রিয় অনুমোদিত সদস্য খুঁজে পাওয়া যায়নি। অনুগ্রহ করে আপনার ফিল্টার পরিবর্তন করে পুনরায় অনুসন্ধান করুন।
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedPosition("");
                setSelectedDistrict("");
                setSelectedUpazila("");
                fetchApprovedProfiles();
              }}
              className="px-5 py-2.5 bg-gray-50 border border-gray-200 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-100 transition-all"
            >
              ফিল্টার রিসেট করুন
            </button>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProfiles.map((profile) => (
                <motion.div
                  key={profile.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={{
                    hidden: { opacity: 0, y: 35, scale: 0.97 },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } 
                    }
                  }}
                  className="flex flex-col"
                >
                  <ProfileCard 
                    profile={profile} 
                    onViewDetails={handleViewProfileDetails} 
                  />
                </motion.div>
              ))}
            </div>

            {/* 5. PAGINATION & LOAD MORE */}
            <div className="pt-8 border-t border-gray-200 flex flex-col items-center gap-6">
              
              {/* Load More Button */}
              {currentPage < totalPages && (
                <button
                  onClick={handleLoadMore}
                  className="px-8 py-3 bg-[#046c4e] hover:bg-[#035a41] text-white font-bold text-xs rounded-lg transition-all shadow-sm flex items-center gap-1.5"
                >
                  আরো দেখুন (Load More)
                </button>
              )}

              {/* standard pagination row with Page numbers */}
              {totalPages > 1 && (
                <div className="flex items-center gap-1.5">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageSelect(currentPage - 1)}
                    className="p-2 rounded-lg text-xs font-bold border border-gray-350 text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    পূর্ববর্তী
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageSelect(page)}
                      className={`w-9 h-9 rounded-lg text-xs font-bold border transition-all ${
                        currentPage === page 
                          ? 'bg-[#046c4e] text-white border-[#046c4e]' 
                          : 'border-gray-200 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {toBengaliNumerals(page.toString())}
                    </button>
                  ))}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageSelect(currentPage + 1)}
                    className="p-2 rounded-lg text-xs font-bold border border-gray-350 text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    পরবর্তী
                  </button>
                </div>
              )}

            </div>
          </div>
        )}

      </section>

      {/* FOOTER BRANDS ACCENT */}
      <footer className="bg-slate-900 text-slate-400 py-10 px-4 mt-auto border-t border-slate-800 text-center">
        <div className="max-w-4xl mx-auto space-y-2">
          {(!customization || customization.footer.copyright?.enabled) && (
            <p className="text-sm font-bold text-slate-300">
              {customization?.footer.copyright?.text || `প্রাথমিক বিদ্যালয় অফিস সহায়ক বাংলাদেশ কল্যাণ ডিরেক্টরি © ${toBengaliNumerals("2026")}`}
            </p>
          )}
          {(!customization || customization.footer.description?.enabled) && (
            <p className="text-xs text-slate-500 mt-2">
              {customization?.footer.description?.text || "সর্বস্বত্ব সংরক্ষিত। এটি প্রাথমিক বিদ্যালয়ের কর্মচারীদের একটি স্বেচ্ছাসেবী ডিজিটাল কল্যাণ উদ্যোগ।"}
            </p>
          )}

          {((customization?.footer?.socialLinks || [
            { id: "fb", platform: "Facebook", url: "https://facebook.com", enabled: true },
            { id: "wa", platform: "WhatsApp", url: "https://wa.me/880", enabled: true },
            { id: "tg", platform: "Telegram", url: "https://t.me/", enabled: true },
            { id: "li", platform: "LinkedIn", url: "https://linkedin.com", enabled: true },
            { id: "ig", platform: "Instagram", url: "https://instagram.com", enabled: true }
          ]).filter(l => l.enabled).length > 0) && (
            <div className="flex flex-wrap justify-center items-center gap-3 mt-6 pt-4 border-t border-slate-800/60">
              {(customization?.footer?.socialLinks || [
                { id: "fb", platform: "Facebook", url: "https://facebook.com", enabled: true },
                { id: "wa", platform: "WhatsApp", url: "https://wa.me/880", enabled: true },
                { id: "tg", platform: "Telegram", url: "https://t.me/", enabled: true },
                { id: "li", platform: "LinkedIn", url: "https://linkedin.com", enabled: true },
                { id: "ig", platform: "Instagram", url: "https://instagram.com", enabled: true }
              ]).filter(l => l.enabled).map(link => (
                <a
                  key={link.id}
                  href={link.url.startsWith("http") ? link.url : `https://${link.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-950/40 hover:bg-slate-950 text-slate-300 hover:text-emerald-400 rounded-full border border-slate-800 hover:border-emerald-500/30 text-xs transition-all duration-300"
                >
                  {link.platform.toLowerCase().includes("facebook") || link.platform.toLowerCase().includes("fb") ? <Facebook size={14} className="text-blue-500" /> :
                   link.platform.toLowerCase().includes("linkedin") ? <Linkedin size={14} className="text-sky-500" /> :
                   link.platform.toLowerCase().includes("instagram") || link.platform.toLowerCase().includes("ig") ? <Instagram size={14} className="text-pink-500" /> :
                   link.platform.toLowerCase().includes("telegram") || link.platform.toLowerCase().includes("tg") ? <Send size={14} className="text-sky-400" /> :
                   link.platform.toLowerCase().includes("whatsapp") || link.platform.toLowerCase().includes("wa") ? <Phone size={14} className="text-emerald-500" /> :
                   <Globe size={14} className="text-slate-400" />}
                  <span className="font-medium">{link.platform}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </footer>

      {/* PERMANENT DEVELOPER CREDIT STRIP */}
      <div id="developer-credit-footer" className="bg-slate-950 text-slate-500 py-4 px-4 text-center border-t border-slate-900 text-xs tracking-wide">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
          <span>Designed & Developed by</span>
          <a
            href="https://oaliur.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 font-medium hover:text-emerald-300 transition-all duration-300 relative inline-block group hover:drop-shadow-[0_0_6px_rgba(52,211,153,0.6)]"
          >
            Oaliur Rahman SIyam
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>
      </div>

      {/* 6. MODALS POPUPS */}
      
      {/* Registration Modal Form */}
      <RegistrationModal 
        isOpen={showRegModal} 
        onClose={() => setShowRegModal(false)} 
        onSuccess={handleRegistrationSuccess}
      />

      {/* Access Protection Modal */}
      <ProfileAccessModal 
        isOpen={showAccessModal} 
        onClose={() => setShowAccessModal(false)} 
        onRegisterClick={() => setShowRegModal(true)} 
      />

      {/* Full Detailed Profile Viewer */}
      <ProfileDetailsModal 
        isOpen={showDetailsModal} 
        profile={selectedProfile} 
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedProfile(null);
        }} 
      />

      {/* Direct Search popup modal */}
      <DirectSearchModal
        isOpen={showDirectSearchModal}
        onClose={() => setShowDirectSearchModal(false)}
        onSearch={handleDirectUsernameSearch}
        error={directSearchError}
        setError={setDirectSearchError}
      />

      {/* Temporary 1-on-1 Chats System */}
      <TemporaryDirectChat
        isOpen={!!tempChatTarget}
        onClose={() => setTempChatTarget(null)}
        targetProfile={tempChatTarget || ({} as Profile)}
      />

      <TemporaryChatsInbox
        isOpen={showTempChatsInbox}
        onClose={() => setShowTempChatsInbox(false)}
        onSelectPartner={(partner) => {
          setShowTempChatsInbox(false);
          setTempChatTarget(partner);
        }}
        allProfiles={allApprovedProfiles}
      />

      {/* SOHOKARI AI Assistant floating chat widget */}
      <SohokariChat />

    </motion.div>
  );
}
