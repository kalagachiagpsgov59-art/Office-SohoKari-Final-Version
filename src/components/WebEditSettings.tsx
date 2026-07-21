import React, { useState, useEffect } from "react";
import { 
  Settings, ToggleLeft, ToggleRight, Plus, Trash2, 
  MapPin, Briefcase, RefreshCw, Save, CheckCircle, AlertCircle, HelpCircle,
  Edit, X, Check, ExternalLink, Globe, Eye, EyeOff
} from "lucide-react";

interface FieldConfig {
  enabled: boolean;
}

interface SettingsData {
  fieldsConfig: {
    district: FieldConfig;
    upazila: FieldConfig;
    unionName: FieldConfig;
    schoolName: FieldConfig;
    position: FieldConfig;
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
  customization?: {
    homepage: {
      topNotice: { text: string; enabled: boolean };
      badge: { text: string; enabled: boolean };
      mainTitle: { text: string; enabled: boolean };
      subtitle: { text: string; enabled: boolean };
      directoryTitle?: { text: string; enabled: boolean };
      directorySubtitle?: { text: string; enabled: boolean };
      adminSignUpEnabled?: { text: string; enabled: boolean };
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
  };
}

export const WebEditSettings: React.FC = () => {
  const [settings, setSettings] = useState<SettingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  
  // WebEdit sub-tabs
  const [subTab, setSubTab] = useState<"fields" | "positions" | "locations" | "customization">("fields");

  // State for Website Customization Section
  const [customizationSection, setCustomizationSection] = useState<"homepage" | "footer">("homepage");

  // Website Customization Local Text States
  const [localTopNotice, setLocalTopNotice] = useState("");
  const [localBadge, setLocalBadge] = useState("");
  const [localMainTitle, setLocalMainTitle] = useState("");
  const [localSubtitle, setLocalSubtitle] = useState("");
  const [localDirectoryTitle, setLocalDirectoryTitle] = useState("");
  const [localDirectorySubtitle, setLocalDirectorySubtitle] = useState("");
  const [localCopyright, setLocalCopyright] = useState("");
  const [localFooterDesc, setLocalFooterDesc] = useState("");
  const [localSocialLinks, setLocalSocialLinks] = useState<Array<{ id: string; platform: string; url: string; enabled: boolean }>>([]);
  const [localOurPages, setLocalOurPages] = useState<Array<{ id: string; title: string; url: string; enabled: boolean }>>([]);

  // Social links inline editing states
  const [editingSocialLinkId, setEditingSocialLinkId] = useState<string | null>(null);
  const [editingSocialPlatform, setEditingSocialPlatform] = useState("");
  const [editingSocialUrl, setEditingSocialUrl] = useState("");

  // Our Pages inline editing states
  const [editingOurPageId, setEditingOurPageId] = useState<string | null>(null);
  const [editingOurPageTitle, setEditingOurPageTitle] = useState("");
  const [editingOurPageUrl, setEditingOurPageUrl] = useState("");

  // Sync local states when settings load/update
  useEffect(() => {
    if (settings && settings.customization) {
      setLocalTopNotice(settings.customization.homepage.topNotice?.text || "");
      setLocalBadge(settings.customization.homepage.badge?.text || "");
      setLocalMainTitle(settings.customization.homepage.mainTitle?.text || "");
      setLocalSubtitle(settings.customization.homepage.subtitle?.text || "");
      setLocalDirectoryTitle(settings.customization.homepage.directoryTitle?.text || "");
      setLocalDirectorySubtitle(settings.customization.homepage.directorySubtitle?.text || "");
      setLocalCopyright(settings.customization.footer.copyright?.text || "");
      setLocalFooterDesc(settings.customization.footer.description?.text || "");
      setLocalSocialLinks(settings.customization.footer.socialLinks || [
        { id: "fb", platform: "Facebook", url: "https://facebook.com", enabled: true },
        { id: "wa", platform: "WhatsApp", url: "https://wa.me/880", enabled: true },
        { id: "tg", platform: "Telegram", url: "https://t.me/", enabled: true },
        { id: "li", platform: "LinkedIn", url: "https://linkedin.com", enabled: true },
        { id: "ig", platform: "Instagram", url: "https://instagram.com", enabled: true }
      ]);
      setLocalOurPages(settings.customization.homepage.ourPages || []);
    }
  }, [settings]);

  // Website Customization Actions
  const ensureCustomizationObject = (updated: SettingsData) => {
    if (!updated.customization) {
      updated.customization = {
        homepage: {
          topNotice: { text: "আসসালামু আলাইকুম। সম্মানিত প্রাথমিক বিদ্যালয় অফিস সহায়ক ভাইদের সর্ববৃহৎ ডিজিটাল তথ্যকোষ ও কল্যাণ ডিরেক্টরি।", enabled: true },
          badge: { text: "বাংলাদেশ সরকারি প্রাথমিক বিদ্যালয়", enabled: true },
          mainTitle: { text: "প্রাথমিক বিদ্যালয় অফিস সহায়ক বাংলাদেশ", enabled: true },
          subtitle: { text: "সকল সরকারি প্রাথমিক বিদ্যালয়ের অফিস সহায়ক কর্মচারীদের সঠিক যোগাযোগ ও সাংগঠনিক তথ্য এক ক্লিকেই খুজে নিন।", enabled: true },
          directoryTitle: { text: "নিবন্ধিত সদস্যদের তালিকা", enabled: true },
          directorySubtitle: { text: "সক্রিয় ও ভেরিফাইড অফিস সহায়ক সদস্যদের তালিকা", enabled: true },
          adminSignUpEnabled: { text: "এডমিন সাইন-আপ অপশন", enabled: true },
          ourPages: []
        },
        footer: {
          copyright: { text: "প্রাথমিক বিদ্যালয় অফিস সহায়ক বাংলাদেশ কল্যাণ ডিরেক্টরি © 2026", enabled: true },
          description: { text: "সর্বস্বত্ব সংরক্ষিত। এটি প্রাথমিক বিদ্যালয়ের কর্মচারীদের একটি স্বেচ্ছাসেবী ডিজিটাল কল্যাণ উদ্যোগ।", enabled: true }
        }
      };
    }
    if (!updated.customization.homepage) {
      updated.customization.homepage = {
        topNotice: { text: "আসসালামু আলাইকুম। সম্মানিত প্রাথমিক বিদ্যালয় অফিস সহায়ক ভাইদের সর্ববৃহৎ ডিজিটাল তথ্যকোষ ও কল্যাণ ডিরেক্টরি।", enabled: true },
        badge: { text: "বাংলাদেশ সরকারি প্রাথমিক বিদ্যালয়", enabled: true },
        mainTitle: { text: "প্রাথমিক বিদ্যালয় অফিস সহায়ক বাংলাদেশ", enabled: true },
        subtitle: { text: "সকল সরকারি প্রাথমিক বিদ্যালয়ের অফিস সহায়ক কর্মচারীদের সঠিক যোগাযোগ ও সাংগঠনিক তথ্য এক ক্লিকেই খুজে নিন।", enabled: true },
        directoryTitle: { text: "নিবন্ধিত সদস্যদের তালিকা", enabled: true },
        directorySubtitle: { text: "সক্রিয় ও ভেরিফাইড অফিস সহায়ক সদস্যদের তালিকা", enabled: true },
        adminSignUpEnabled: { text: "এডমিন সাইন-আপ অপশন", enabled: true },
        ourPages: []
      };
    }
    if (!updated.customization.homepage.directoryTitle) {
      updated.customization.homepage.directoryTitle = { text: "নিবন্ধিত সদস্যদের তালিকা", enabled: true };
    }
    if (!updated.customization.homepage.directorySubtitle) {
      updated.customization.homepage.directorySubtitle = { text: "সক্রিয় ও ভেরিফাইড দপ্তরী কাম নৈশপ্রহরীদের তালিকা", enabled: true };
    }
    if (!updated.customization.homepage.adminSignUpEnabled) {
      updated.customization.homepage.adminSignUpEnabled = { text: "এডমিন সাইন-আপ অপশন", enabled: true };
    }
    if (!updated.customization.homepage.ourPages) {
      updated.customization.homepage.ourPages = [];
    }
    if (!updated.customization.footer) {
      updated.customization.footer = {
        copyright: { text: "প্রাথমিক বিদ্যালয় অফিস সহায়ক বাংলাদেশ কল্যাণ ডিরেক্টরি © 2026", enabled: true },
        description: { text: "সর্বস্বত্ব সংরক্ষিত। এটি প্রাথমিক বিদ্যালয়ের কর্মচারীদের একটি স্বেচ্ছাসেবী ডিজিটাল কল্যাণ উদ্যোগ।", enabled: true },
        socialLinks: [
          { id: "fb", platform: "Facebook", url: "https://facebook.com", enabled: true },
          { id: "wa", platform: "WhatsApp", url: "https://wa.me/880", enabled: true },
          { id: "tg", platform: "Telegram", url: "https://t.me/", enabled: true },
          { id: "li", platform: "LinkedIn", url: "https://linkedin.com", enabled: true },
          { id: "ig", platform: "Instagram", url: "https://instagram.com", enabled: true }
        ]
      };
    } else if (!updated.customization.footer.socialLinks) {
      updated.customization.footer.socialLinks = [
        { id: "fb", platform: "Facebook", url: "https://facebook.com", enabled: true },
        { id: "wa", platform: "WhatsApp", url: "https://wa.me/880", enabled: true },
        { id: "tg", platform: "Telegram", url: "https://t.me/", enabled: true },
        { id: "li", platform: "LinkedIn", url: "https://linkedin.com", enabled: true },
        { id: "ig", platform: "Instagram", url: "https://instagram.com", enabled: true }
      ];
    }
    return updated;
  };

  const handleUpdateCustomizationText = (
    section: "homepage" | "footer",
    field: string,
    text: string
  ) => {
    if (!settings) return;
    let updated = JSON.parse(JSON.stringify(settings)) as SettingsData;
    updated = ensureCustomizationObject(updated);
    
    const secObj = updated.customization![section] as any;
    if (secObj) {
      if (!secObj[field]) {
        secObj[field] = { text: "", enabled: true };
      }
      secObj[field].text = text;
    }
    saveSettings(updated);
  };

  const handleToggleCustomizationField = (
    section: "homepage" | "footer",
    field: string
  ) => {
    if (!settings) return;
    let updated = JSON.parse(JSON.stringify(settings)) as SettingsData;
    updated = ensureCustomizationObject(updated);

    const secObj = updated.customization![section] as any;
    if (secObj) {
      if (!secObj[field]) {
        secObj[field] = { text: "", enabled: true };
      }
      secObj[field].enabled = !secObj[field].enabled;
    }
    saveSettings(updated);
  };

  const handleDeleteCustomizationField = (
    section: "homepage" | "footer",
    field: string
  ) => {
    if (!settings) return;
    showConfirm(
      "তথ্যটি মুছে ফেলতে চান?",
      "আপনি কি নিশ্চিতভাবে এই ফিল্ডের টেক্সটটি খালি/মুছে ফেলতে চান?",
      () => {
        let updated = JSON.parse(JSON.stringify(settings)) as SettingsData;
        updated = ensureCustomizationObject(updated);
        const secObj = updated.customization![section] as any;
        if (secObj) {
          if (!secObj[field]) {
            secObj[field] = { text: "", enabled: true };
          }
          secObj[field].text = "";
        }
        saveSettings(updated);
      },
      "হ্যাঁ, মুছুন",
      "না, ফিরে যান"
    );
  };

  const handleRevertCustomizationField = (
    section: "homepage" | "footer",
    field: string
  ) => {
    if (!settings) return;
    const defaults: any = {
      homepage: {
        topNotice: "আসসালামু আলাইকুম। সম্মানিত প্রাথমিক বিদ্যালয় অফিস সহায়ক ভাইদের সর্ববৃহৎ ডিজিটাল তথ্যকোষ ও কল্যাণ ডিরেক্টরি।",
        badge: "বাংলাদেশ সরকারি প্রাথমিক বিদ্যালয়",
        mainTitle: "প্রাথমিক বিদ্যালয় অফিস সহায়ক বাংলাদেশ",
        subtitle: "সকল সরকারি প্রাথমিক বিদ্যালয়ের অফিস সহায়ক কর্মচারীদের সঠিক যোগাযোগ ও সাংগঠনিক তথ্য এক ক্লিকেই খুজে নিন।",
        directoryTitle: "নিবন্ধিত সদস্যদের তালিকা",
        directorySubtitle: "সক্রিয় ও ভেরিফাইড অফিস সহায়ক সদস্যদের তালিকা"
      },
      footer: {
        copyright: "প্রাথমিক বিদ্যালয় অফিস সহায়ক বাংলাদেশ কল্যাণ ডিরেক্টরি © 2026",
        description: "সর্বস্বত্ব সংরক্ষিত। এটি প্রাথমিক বিদ্যালয়ের কর্মচারীদের একটি স্বেচ্ছাসেবী ডিজিটাল কল্যাণ উদ্যোগ।"
      }
    };
    let updated = JSON.parse(JSON.stringify(settings)) as SettingsData;
    updated = ensureCustomizationObject(updated);
    const secObj = updated.customization![section] as any;
    if (secObj) {
      secObj[field] = { text: defaults[section][field], enabled: true };
    }
    saveSettings(updated);
  };

  // Social links management states
  const [newSocialPlatform, setNewSocialPlatform] = useState("");
  const [newSocialUrl, setNewSocialUrl] = useState("");

  const handleLocalToggleSocialLink = (id: string) => {
    setLocalSocialLinks(prev => prev.map(link => {
      if (link.id === id) {
        return { ...link, enabled: !link.enabled };
      }
      return link;
    }));
  };

  const handleLocalUpdateSocialLink = (id: string, platform: string, url: string) => {
    setLocalSocialLinks(prev => prev.map(link => {
      if (link.id === id) {
        return { ...link, platform, url };
      }
      return link;
    }));
  };

  const handleDeleteSocialLink = (id: string) => {
    showConfirm(
      "সামাজিক লিঙ্ক মুছে ফেলুন",
      "আপনি কি নিশ্চিতভাবে এই সামাজিক যোগাযোগের লিঙ্কটি মুছে ফেলতে চান? সংরক্ষণ না করা পর্যন্ত এটি ডেটাবেজে স্থায়ীভাবে মুছবে না।",
      () => {
        setLocalSocialLinks(prev => prev.filter(link => link.id !== id));
      },
      "হ্যাঁ, মুছুন",
      "না, ফিরে যান"
    );
  };

  const handleAddSocialLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSocialPlatform.trim() || !newSocialUrl.trim()) {
      showFeedback("error", "দয়া করে প্ল্যাটফর্ম এবং লিঙ্ক উভয় ক্ষেত্র পূরণ করুন।");
      return;
    }
    const newLink = {
      id: "social_" + Date.now(),
      platform: newSocialPlatform.trim(),
      url: newSocialUrl.trim(),
      enabled: true
    };
    setLocalSocialLinks(prev => [...prev, newLink]);
    setNewSocialPlatform("");
    setNewSocialUrl("");
  };

  const handleSaveSocialLinks = () => {
    if (!settings) return;
    let updated = JSON.parse(JSON.stringify(settings)) as SettingsData;
    updated = ensureCustomizationObject(updated);
    updated.customization!.footer.socialLinks = localSocialLinks;
    saveSettings(updated);
  };

  // Our Pages management states and actions
  const [newOurPageTitle, setNewOurPageTitle] = useState("");
  const [newOurPageUrl, setNewOurPageUrl] = useState("");

  const handleLocalToggleOurPage = (id: string) => {
    setLocalOurPages(prev => prev.map(page => {
      if (page.id === id) {
        return { ...page, enabled: !page.enabled };
      }
      return page;
    }));
  };

  const handleLocalUpdateOurPage = (id: string, title: string, url: string) => {
    setLocalOurPages(prev => prev.map(page => {
      if (page.id === id) {
        return { ...page, title, url };
      }
      return page;
    }));
  };

  const handleDeleteOurPage = (id: string) => {
    showConfirm(
      "পেজ লিংক মুছে ফেলুন",
      "আপনি কি নিশ্চিতভাবে এই পেজ লিঙ্কটি মুছে ফেলতে চান? সংরক্ষণ না করা পর্যন্ত এটি ডেটাবেজে স্থায়ীভাবে মুছবে না।",
      () => {
        setLocalOurPages(prev => prev.filter(page => page.id !== id));
      },
      "হ্যাঁ, মুছুন",
      "না, ফিরে যান"
    );
  };

  const handleAddOurPage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOurPageTitle.trim() || !newOurPageUrl.trim()) {
      showFeedback("error", "দয়া করে পেজ টাইটেল এবং লিঙ্ক উভয় ক্ষেত্র পূরণ করুন।");
      return;
    }
    if (localOurPages.length >= 250) {
      showFeedback("error", "দুঃখিত, আপনি সর্বোচ্চ ২৫০ টি লিঙ্ক যুক্ত করতে পারবেন।");
      return;
    }
    const newPage = {
      id: "page_" + Date.now(),
      title: newOurPageTitle.trim(),
      url: newOurPageUrl.trim(),
      enabled: true
    };
    setLocalOurPages(prev => [...prev, newPage]);
    setNewOurPageTitle("");
    setNewOurPageUrl("");
  };

  const handleSaveOurPages = () => {
    if (!settings) return;
    let updated = JSON.parse(JSON.stringify(settings)) as SettingsData;
    updated = ensureCustomizationObject(updated);
    updated.customization!.homepage.ourPages = localOurPages;
    saveSettings(updated);
  };

  // State for Position Management
  const [newPosition, setNewPosition] = useState("");

  // State for Location Management
  const [selectedDistrictIndex, setSelectedDistrictIndex] = useState<number>(-1);
  const [selectedUpazilaIndex, setSelectedUpazilaIndex] = useState<number>(-1);
  const [selectedUnionIndex, setSelectedUnionIndex] = useState<number>(-1);

  // Form inputs for new address/school items
  const [newDistrictName, setNewDistrictName] = useState("");
  const [newUpazilaName, setNewUpazilaName] = useState("");
  const [newUnionNameValue, setNewUnionNameValue] = useState("");
  const [newSchoolNameValue, setNewSchoolNameValue] = useState("");

  // Custom confirmation modal state
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    confirmText?: string;
    cancelText?: string;
  } | null>(null);

  const showConfirm = (
    title: string, 
    message: string, 
    onConfirm: () => void, 
    confirmText = "হ্যাঁ, ডিলিট করুন", 
    cancelText = "না, ফিরে যান"
  ) => {
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

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/settings");
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      } else {
        showFeedback("error", "সেটিংস লোড করতে ব্যর্থ হয়েছে।");
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
      showFeedback("error", "নেটওয়ার্ক সমস্যা। পুনরায় চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const showFeedback = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const saveSettings = async (updatedSettings: SettingsData) => {
    setSaving(true);
    try {
      const token = sessionStorage.getItem("admin_token");
      const response = await fetch("/api/admin/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(updatedSettings)
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setSettings(data.settings);
          showFeedback("success", "সেটিংস সফলভাবে সংরক্ষণ করা হয়েছে!");
        } else {
          showFeedback("error", data.error || "সেটিংস সংরক্ষণ করা সম্ভব হয়নি।");
        }
      } else {
        showFeedback("error", "অননুমোদিত বা অবৈধ অনুরোধ।");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      showFeedback("error", "নেটওয়ার্কের সমস্যা হয়েছে। পুনরায় চেষ্টা করুন।");
    } finally {
      setSaving(false);
    }
  };

  // 1. Toggle field configuration
  const handleToggleField = (fieldName: keyof SettingsData["fieldsConfig"]) => {
    if (!settings) return;
    const updated = {
      ...settings,
      fieldsConfig: {
        ...settings.fieldsConfig,
        [fieldName]: {
          ...settings.fieldsConfig[fieldName],
          enabled: !settings.fieldsConfig[fieldName].enabled
        }
      }
    };
    setSettings(updated);
    saveSettings(updated);
  };

  // 2. Position Management Actions
  const handleAddPosition = (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings || !newPosition.trim()) return;
    
    const trimPos = newPosition.trim();
    if (settings.positions.includes(trimPos)) {
      showFeedback("error", "এই পদবীটি ইতিমধ্যে তালিকায় বিদ্যমান আছে।");
      return;
    }

    const updated = {
      ...settings,
      positions: [...settings.positions, trimPos]
    };
    setSettings(updated);
    saveSettings(updated);
    setNewPosition("");
  };

  const handleDeletePosition = (posToDelete: string) => {
    if (!settings) return;
    showConfirm(
      "পদবী মুছে ফেলার নিশ্চিতকরণ",
      `আপনি কি নিশ্চিতভাবে "${posToDelete}" পদবীটি তালিকা থেকে মুছে ফেলতে চান?`,
      () => {
        const updated = {
          ...settings,
          positions: settings.positions.filter(p => p !== posToDelete)
        };
        setSettings(updated);
        saveSettings(updated);
      }
    );
  };

  // 3. Address / Locations Management Actions
  const handleAddDistrict = (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings || !newDistrictName.trim()) return;

    const trimDist = newDistrictName.trim();
    const exists = settings.locations.some(loc => loc.district === trimDist);
    if (exists) {
      showFeedback("error", "এই জেলাটি ইতিমধ্যে তালিকায় বিদ্যমান আছে।");
      return;
    }

    const updated = {
      ...settings,
      locations: [...settings.locations, { district: trimDist, upazilas: [] }]
    };
    setSettings(updated);
    saveSettings(updated);
    setNewDistrictName("");
    setSelectedDistrictIndex(updated.locations.length - 1);
    setSelectedUpazilaIndex(-1);
    setSelectedUnionIndex(-1);
  };

  const handleDeleteDistrict = (index: number, name: string) => {
    if (!settings) return;
    showConfirm(
      "জেলা মুছে ফেলার নিশ্চিতকরণ",
      `আপনি কি নিশ্চিতভাবে জেলা "${name}" এবং এর অন্তর্গত সকল উপজেলা, ইউনিয়ন ও বিদ্যালয় স্থায়ীভাবে ডিলিট করতে চান?`,
      () => {
        const updatedLocs = [...settings.locations];
        updatedLocs.splice(index, 1);
        
        const updated = {
          ...settings,
          locations: updatedLocs
        };
        setSettings(updated);
        saveSettings(updated);
        setSelectedDistrictIndex(-1);
        setSelectedUpazilaIndex(-1);
        setSelectedUnionIndex(-1);
      }
    );
  };

  const handleAddUpazila = (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings || selectedDistrictIndex === -1 || !newUpazilaName.trim()) return;

    const trimUp = newUpazilaName.trim();
    const districtObj = settings.locations[selectedDistrictIndex];
    const exists = districtObj.upazilas.some(u => u.name === trimUp);
    if (exists) {
      showFeedback("error", "এই উপজেলাটি ইতিমধ্যে তালিকায় বিদ্যমান আছে।");
      return;
    }

    const updatedLocs = [...settings.locations];
    updatedLocs[selectedDistrictIndex].upazilas.push({
      name: trimUp,
      unions: []
    });

    const updated = {
      ...settings,
      locations: updatedLocs
    };
    setSettings(updated);
    saveSettings(updated);
    setNewUpazilaName("");
    setSelectedUpazilaIndex(districtObj.upazilas.length - 1);
    setSelectedUnionIndex(-1);
  };

  const handleDeleteUpazila = (upazilaIndex: number, upazilaName: string) => {
    if (!settings || selectedDistrictIndex === -1) return;
    showConfirm(
      "উপজেলা মুছে ফেলার নিশ্চিতকরণ",
      `আপনি কি নিশ্চিতভাবে উপজেলা "${upazilaName}" এবং এর অন্তর্গত সকল ইউনিয়ন ও বিদ্যালয় ডিলিট করতে চান?`,
      () => {
        const updatedLocs = [...settings.locations];
        updatedLocs[selectedDistrictIndex].upazilas.splice(upazilaIndex, 1);

        const updated = {
          ...settings,
          locations: updatedLocs
        };
        setSettings(updated);
        saveSettings(updated);
        setSelectedUpazilaIndex(-1);
        setSelectedUnionIndex(-1);
      }
    );
  };

  const handleAddUnion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings || selectedDistrictIndex === -1 || selectedUpazilaIndex === -1 || !newUnionNameValue.trim()) return;

    const trimUnion = newUnionNameValue.trim();
    const upazilaObj = settings.locations[selectedDistrictIndex].upazilas[selectedUpazilaIndex];
    const exists = upazilaObj.unions.some(un => un.name === trimUnion);
    if (exists) {
      showFeedback("error", "এই ইউনিয়নটি ইতিমধ্যে তালিকায় বিদ্যমান আছে।");
      return;
    }

    const updatedLocs = [...settings.locations];
    updatedLocs[selectedDistrictIndex].upazilas[selectedUpazilaIndex].unions.push({
      name: trimUnion,
      schools: []
    });

    const updated = {
      ...settings,
      locations: updatedLocs
    };
    setSettings(updated);
    saveSettings(updated);
    setNewUnionNameValue("");
    setSelectedUnionIndex(upazilaObj.unions.length - 1);
  };

  const handleDeleteUnion = (unionIndex: number, unionName: string) => {
    if (!settings || selectedDistrictIndex === -1 || selectedUpazilaIndex === -1) return;
    showConfirm(
      "ইউনিয়ন মুছে ফেলার নিশ্চিতকরণ",
      `আপনি কি নিশ্চিতভাবে ইউনিয়ন "${unionName}" এবং এর অন্তর্গত সকল বিদ্যালয় ডিলিট করতে চান?`,
      () => {
        const updatedLocs = [...settings.locations];
        updatedLocs[selectedDistrictIndex].upazilas[selectedUpazilaIndex].unions.splice(unionIndex, 1);

        const updated = {
          ...settings,
          locations: updatedLocs
        };
        setSettings(updated);
        saveSettings(updated);
        setSelectedUnionIndex(-1);
      }
    );
  };

  const handleAddSchool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings || selectedDistrictIndex === -1 || selectedUpazilaIndex === -1 || selectedUnionIndex === -1 || !newSchoolNameValue.trim()) return;

    const trimSchool = newSchoolNameValue.trim();
    const unionObj = settings.locations[selectedDistrictIndex].upazilas[selectedUpazilaIndex].unions[selectedUnionIndex];
    const exists = unionObj.schools.includes(trimSchool);
    if (exists) {
      showFeedback("error", "এই বিদ্যালয়টি ইতিমধ্যে তালিকায় বিদ্যমান আছে।");
      return;
    }

    const updatedLocs = [...settings.locations];
    updatedLocs[selectedDistrictIndex].upazilas[selectedUpazilaIndex].unions[selectedUnionIndex].schools.push(trimSchool);

    const updated = {
      ...settings,
      locations: updatedLocs
    };
    setSettings(updated);
    saveSettings(updated);
    setNewSchoolNameValue("");
  };

  const handleDeleteSchool = (schoolIndex: number, schoolName: string) => {
    if (!settings || selectedDistrictIndex === -1 || selectedUpazilaIndex === -1 || selectedUnionIndex === -1) return;
    showConfirm(
      "বিদ্যালয় মুছে ফেলার নিশ্চিতকরণ",
      `আপনি কি নিশ্চিতভাবে "${schoolName}" বিদ্যালয়টি ডিলিট করতে চান?`,
      () => {
        const updatedLocs = [...settings.locations];
        updatedLocs[selectedDistrictIndex].upazilas[selectedUpazilaIndex].unions[selectedUnionIndex].schools.splice(schoolIndex, 1);

        const updated = {
          ...settings,
          locations: updatedLocs
        };
        setSettings(updated);
        saveSettings(updated);
      }
    );
  };

  if (loading) {
    return (
      <div className="py-16 text-center flex flex-col items-center justify-center gap-3">
        <RefreshCw className="animate-spin text-emerald-400" size={28} />
        <p className="text-slate-400 text-sm">ওয়েব সেটিংস লোড করা হচ্ছে...</p>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="py-12 text-center text-rose-400 flex flex-col items-center justify-center gap-2">
        <AlertCircle size={32} />
        <p>দুঃখিত, সেটিংস লোড করা সম্ভব হয়নি।</p>
        <button onClick={fetchSettings} className="mt-3 px-4 py-2 bg-slate-700 hover:bg-slate-650 text-white rounded-lg text-xs transition-all">
          পুনরায় চেষ্টা করুন
        </button>
      </div>
    );
  }

  const selectedDistrict = selectedDistrictIndex !== -1 ? settings.locations[selectedDistrictIndex] : null;
  const selectedUpazila = (selectedDistrict && selectedUpazilaIndex !== -1) ? selectedDistrict.upazilas[selectedUpazilaIndex] : null;
  const selectedUnion = (selectedUpazila && selectedUnionIndex !== -1) ? selectedUpazila.unions[selectedUnionIndex] : null;

  return (
    <div className="space-y-6">
      
      {/* Settings Action Feedback Toast */}
      {message && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold border animate-in fade-in slide-in-from-top-4 ${
          message.type === "success" 
            ? "bg-emerald-950 border-emerald-800 text-emerald-300" 
            : "bg-rose-950 border-rose-800 text-rose-300"
        }`}>
          {message.type === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
          {message.text}
        </div>
      )}

      {/* Intro info box */}
      <div className="bg-slate-850 p-5 rounded-2xl border border-slate-750 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
            <Settings size={16} className="text-emerald-400" />
            ওয়েবসাইট ডায়নামিক ম্যানেজমেন্ট (WebEdit)
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            এখান থেকে আপনি "নিজে কে যুক্ত করুন" (রেজিস্ট্রেশন ফর্ম) এর ড্রপডাউন অপশনগুলো সরাসরি এডিট করতে পারবেন ও ফিল্ডগুলো অন/অফ করতে পারবেন।
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-850">
          {saving ? (
            <>
              <RefreshCw size={12} className="animate-spin text-emerald-400" />
              সংরক্ষণ হচ্ছে...
            </>
          ) : (
            <>
              <CheckCircle size={12} className="text-emerald-400" />
              রিয়েল-টাইম সিঙ্ক অ্যাক্টিভ
            </>
          )}
        </div>
      </div>

      {/* Sub Navigation */}
      <div className="flex border-b border-slate-750 overflow-x-auto">
        <button
          onClick={() => setSubTab("fields")}
          className={`pb-3 px-5 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
            subTab === "fields" 
              ? "text-emerald-400 border-emerald-400" 
              : "text-slate-400 border-transparent hover:text-slate-300"
          }`}
        >
          ফিল্ড অন/অফ করুন
        </button>
        <button
          onClick={() => setSubTab("positions")}
          className={`pb-3 px-5 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
            subTab === "positions" 
              ? "text-emerald-400 border-emerald-400" 
              : "text-slate-400 border-transparent hover:text-slate-300"
          }`}
        >
          পদবী তালিকা (Positions)
        </button>
        <button
          onClick={() => setSubTab("locations")}
          className={`pb-3 px-5 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
            subTab === "locations" 
              ? "text-emerald-400 border-emerald-400" 
              : "text-slate-400 border-transparent hover:text-slate-300"
          }`}
        >
          ঠিকানা ম্যানেজমেন্ট
        </button>
        <button
          onClick={() => setSubTab("customization")}
          className={`pb-3 px-5 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
            subTab === "customization" 
              ? "text-emerald-400 border-emerald-400" 
              : "text-slate-400 border-transparent hover:text-slate-300"
          }`}
        >
          ওয়েবসাইট কাস্টমাইজেশন
        </button>
      </div>

      {/* TAB 1: Fields On/Off */}
      {subTab === "fields" && (
        <div className="bg-slate-850 rounded-2xl p-6 border border-slate-750 space-y-5">
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">রেজিস্ট্রেশন ফর্ম ফিল্ড নিয়ন্ত্রণ</h4>
            <p className="text-xs text-slate-400 mb-4">যেকোনো ফিল্ড অফ করে রাখলে সেটি সাধারণ মানুষের রেজিস্ট্রেশন ফর্ম ও ফিল্টারিং অপশনে আর দৃশ্যমান হবে না।</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Position Field Toggle */}
            <div className="flex items-center justify-between p-4 bg-slate-900/60 rounded-xl border border-slate-750/50 hover:border-slate-700 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
                  <Briefcase size={16} />
                </div>
                <div>
                  <span className="block text-xs font-bold text-white">পদবী (Position)</span>
                  <span className="text-[10px] text-slate-400">সংগঠনের পদবী নির্বাচন ড্রপডাউন</span>
                </div>
              </div>
              <button 
                onClick={() => handleToggleField("position")}
                className="text-slate-300 hover:text-white transition-all focus:outline-none"
              >
                {settings.fieldsConfig.position?.enabled ? (
                  <ToggleRight size={38} className="text-emerald-500" />
                ) : (
                  <ToggleLeft size={38} className="text-slate-600" />
                )}
              </button>
            </div>

            {/* District Field Toggle */}
            <div className="flex items-center justify-between p-4 bg-slate-900/60 rounded-xl border border-slate-750/50 hover:border-slate-700 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
                  <MapPin size={16} />
                </div>
                <div>
                  <span className="block text-xs font-bold text-white">জেলা (District)</span>
                  <span className="text-[10px] text-slate-400">জেলা নির্বাচন অপশন</span>
                </div>
              </div>
              <button 
                onClick={() => handleToggleField("district")}
                className="text-slate-300 hover:text-white transition-all focus:outline-none"
              >
                {settings.fieldsConfig.district?.enabled ? (
                  <ToggleRight size={38} className="text-emerald-500" />
                ) : (
                  <ToggleLeft size={38} className="text-slate-600" />
                )}
              </button>
            </div>

            {/* Upazila Field Toggle */}
            <div className="flex items-center justify-between p-4 bg-slate-900/60 rounded-xl border border-slate-750/50 hover:border-slate-700 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
                  <MapPin size={16} />
                </div>
                <div>
                  <span className="block text-xs font-bold text-white">উপজেলা (Upazila)</span>
                  <span className="text-[10px] text-slate-400">উপজেলা নির্বাচন অপশন</span>
                </div>
              </div>
              <button 
                onClick={() => handleToggleField("upazila")}
                className="text-slate-300 hover:text-white transition-all focus:outline-none"
              >
                {settings.fieldsConfig.upazila?.enabled ? (
                  <ToggleRight size={38} className="text-emerald-500" />
                ) : (
                  <ToggleLeft size={38} className="text-slate-600" />
                )}
              </button>
            </div>

            {/* Union Field Toggle */}
            <div className="flex items-center justify-between p-4 bg-slate-900/60 rounded-xl border border-slate-750/50 hover:border-slate-700 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
                  <MapPin size={16} />
                </div>
                <div>
                  <span className="block text-xs font-bold text-white">ইউনিয়ন (Union)</span>
                  <span className="text-[10px] text-slate-400">ইউনিয়ন নাম নির্বাচন অপশন</span>
                </div>
              </div>
              <button 
                onClick={() => handleToggleField("unionName")}
                className="text-slate-300 hover:text-white transition-all focus:outline-none"
              >
                {settings.fieldsConfig.unionName?.enabled ? (
                  <ToggleRight size={38} className="text-emerald-500" />
                ) : (
                  <ToggleLeft size={38} className="text-slate-600" />
                )}
              </button>
            </div>

            {/* School Field Toggle */}
            <div className="flex items-center justify-between p-4 bg-slate-900/60 rounded-xl border border-slate-750/50 hover:border-slate-700 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
                  <Settings size={16} />
                </div>
                <div>
                  <span className="block text-xs font-bold text-white">কর্মরত বিদ্যালয় (School Name)</span>
                  <span className="text-[10px] text-slate-400">বিদ্যালয় নির্বাচনের তালিকা</span>
                </div>
              </div>
              <button 
                onClick={() => handleToggleField("schoolName")}
                className="text-slate-300 hover:text-white transition-all focus:outline-none"
              >
                {settings.fieldsConfig.schoolName?.enabled ? (
                  <ToggleRight size={38} className="text-emerald-500" />
                ) : (
                  <ToggleLeft size={38} className="text-slate-600" />
                )}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: Positions Management */}
      {subTab === "positions" && (
        <div className="bg-slate-850 rounded-2xl p-6 border border-slate-750 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">পদবী বা পদসমূহ নিয়ন্ত্রণ করুন</h4>
              <p className="text-xs text-slate-400 mt-1">এখানে করা যেকোনো পরিবর্তন সরাসরি রেজিস্ট্রেশন ফর্ম এর "পদবী" অপশনে দৃশ্যমান হবে।</p>
            </div>
            
            <form onSubmit={handleAddPosition} className="flex gap-2 w-full md:w-auto">
              <input
                type="text"
                value={newPosition}
                onChange={(e) => setNewPosition(e.target.value)}
                required
                placeholder="নতুন পদবী লিখুন (যেমন: উপদেষ্টা)"
                className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 w-full md:w-60"
              />
              <button 
                type="submit"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shrink-0"
              >
                <Plus size={14} />
                যুক্ত করুন
              </button>
            </form>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {settings.positions.map((pos) => (
              <div 
                key={pos}
                className="p-3 bg-slate-900/60 hover:bg-slate-900 rounded-xl border border-slate-750 flex items-center justify-between group transition-all"
              >
                <span className="text-xs text-slate-200 font-semibold">{pos}</span>
                <button
                  type="button"
                  onClick={() => handleDeletePosition(pos)}
                  className="text-slate-500 hover:text-rose-400 p-1 rounded-lg hover:bg-rose-950/20 transition-all opacity-0 group-hover:opacity-100"
                  title="ডিলিট করুন"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Locations Management */}
      {subTab === "locations" && (
        <div className="bg-slate-850 rounded-2xl p-6 border border-slate-750 space-y-6">
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">ঠিকানা ম্যানেজমেন্ট ট্রি</h4>
            <p className="text-xs text-slate-400">নিচে যেকোনো জেলা সিলেক্ট করুন, এরপর তার ভেতরে উপজেলা ও ইউনিয়ন অ্যাড বা রিমুভ করুন।</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 1. Districts Column */}
            <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-750 flex flex-col space-y-3">
              <span className="text-xs font-bold text-slate-300 border-b border-slate-750 pb-2 flex items-center gap-1">
                <MapPin size={12} className="text-rose-400" />
                ১. জেলা তালিকা ({settings.locations.length})
              </span>

              {/* Add District form */}
              <form onSubmit={handleAddDistrict} className="flex gap-1.5">
                <input
                  type="text"
                  required
                  value={newDistrictName}
                  onChange={(e) => setNewDistrictName(e.target.value)}
                  placeholder="জেলার নাম..."
                  className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-[11px] text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 w-full"
                />
                <button type="submit" className="p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-all shrink-0" title="জেলা যুক্ত করুন">
                  <Plus size={14} />
                </button>
              </form>

              {/* Districts List */}
              <div className="flex-1 overflow-y-auto max-h-[300px] space-y-1 pr-1">
                {settings.locations.map((loc, idx) => (
                  <div
                    key={loc.district}
                    className={`p-2 rounded-lg flex items-center justify-between group transition-all text-xs font-semibold cursor-pointer ${
                      selectedDistrictIndex === idx 
                        ? "bg-slate-800 text-white border border-slate-700" 
                        : "text-slate-400 hover:bg-slate-800/40 hover:text-slate-200 border border-transparent"
                    }`}
                    onClick={() => {
                      setSelectedDistrictIndex(idx);
                      setSelectedUpazilaIndex(-1);
                      setSelectedUnionIndex(-1);
                    }}
                  >
                    <span>{loc.district}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteDistrict(idx, loc.district);
                      }}
                      className="text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all p-1 hover:bg-rose-950/20 rounded"
                    >
                      <Trash2 size={10} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Upazila Column */}
            <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-750 flex flex-col space-y-3">
              <span className="text-xs font-bold text-slate-300 border-b border-slate-750 pb-2 flex items-center gap-1">
                <MapPin size={12} className="text-amber-400" />
                ২. উপজেলা তালিকা {selectedDistrict && `(${selectedDistrict.district})`}
              </span>

              {selectedDistrict ? (
                <>
                  {/* Add Upazila Form */}
                  <form onSubmit={handleAddUpazila} className="flex gap-1.5">
                    <input
                      type="text"
                      required
                      value={newUpazilaName}
                      onChange={(e) => setNewUpazilaName(e.target.value)}
                      placeholder="উপজেলার নাম..."
                      className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-[11px] text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 w-full"
                    />
                    <button type="submit" className="p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-all shrink-0" title="উপজেলা যুক্ত করুন">
                      <Plus size={14} />
                    </button>
                  </form>

                  {/* Upazilas List */}
                  <div className="flex-1 overflow-y-auto max-h-[300px] space-y-1 pr-1">
                    {selectedDistrict.upazilas.map((up, idx) => (
                      <div
                        key={up.name}
                        className={`p-2 rounded-lg flex items-center justify-between group transition-all text-xs font-semibold cursor-pointer ${
                          selectedUpazilaIndex === idx 
                            ? "bg-slate-800 text-white border border-slate-700" 
                            : "text-slate-400 hover:bg-slate-800/40 hover:text-slate-200 border border-transparent"
                        }`}
                        onClick={() => {
                          setSelectedUpazilaIndex(idx);
                          setSelectedUnionIndex(-1);
                        }}
                      >
                        <span>{up.name}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteUpazila(idx, up.name);
                          }}
                          className="text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all p-1 hover:bg-rose-950/20 rounded"
                        >
                          <Trash2 size={10} />
                        </button>
                      </div>
                    ))}
                    {selectedDistrict.upazilas.length === 0 && (
                      <div className="text-center py-8 text-[11px] text-slate-500">এই জেলায় কোনো উপজেলা যুক্ত নেই।</div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-center p-6 text-[11px] text-slate-500">
                  উপজেলা দেখতে বামপাশের তালিকা থেকে জেলা সিলেক্ট করুন।
                </div>
              )}
            </div>

            {/* 3. Union Column */}
            <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-750 flex flex-col space-y-3">
              <span className="text-xs font-bold text-slate-300 border-b border-slate-750 pb-2 flex items-center gap-1">
                <MapPin size={12} className="text-emerald-400" />
                ৩. ইউনিয়ন তালিকা {selectedUpazila && `(${selectedUpazila.name})`}
              </span>

              {selectedUpazila ? (
                <>
                  {/* Add Union Form */}
                  <form onSubmit={handleAddUnion} className="flex gap-1.5">
                    <input
                      type="text"
                      required
                      value={newUnionNameValue}
                      onChange={(e) => setNewUnionNameValue(e.target.value)}
                      placeholder="ইউনিয়ন/পৌরসভা..."
                      className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-[11px] text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 w-full"
                    />
                    <button type="submit" className="p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-all shrink-0" title="ইউনিয়ন যুক্ত করুন">
                      <Plus size={14} />
                    </button>
                  </form>

                  {/* Union list */}
                  <div className="flex-1 overflow-y-auto max-h-[300px] space-y-1 pr-1">
                    {selectedUpazila.unions.map((un, idx) => (
                      <div
                        key={un.name}
                        className={`p-2 rounded-lg flex items-center justify-between group transition-all text-xs font-semibold cursor-pointer ${
                          selectedUnionIndex === idx 
                            ? "bg-slate-800 text-white border border-slate-700" 
                            : "text-slate-400 hover:bg-slate-800/40 hover:text-slate-200 border border-transparent"
                        }`}
                        onClick={() => setSelectedUnionIndex(idx)}
                      >
                        <span>{un.name}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteUnion(idx, un.name);
                          }}
                          className="text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all p-1 hover:bg-rose-950/20 rounded"
                        >
                          <Trash2 size={10} />
                        </button>
                      </div>
                    ))}
                    {selectedUpazila.unions.length === 0 && (
                      <div className="text-center py-8 text-[11px] text-slate-500">কোনো ইউনিয়ন যুক্ত নেই।</div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-center p-6 text-[11px] text-slate-500">
                  ইউনিয়ন দেখতে উপরোক্ত তালিকা থেকে উপজেলা সিলেক্ট করুন।
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* TAB 4: Website Customization */}
      {subTab === "customization" && (
        <div className="bg-slate-850 rounded-2xl p-6 border border-slate-750 space-y-6 animate-in fade-in duration-255">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-750 pb-5">
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">ওয়েবসাইট কন্টেন্ট কাস্টমাইজেশন</h4>
              <p className="text-xs text-slate-400">এখান থেকে আপনি ওয়েবসাইটের হোমপেজ এবং ফুটারের বিভিন্ন টেক্সট পরিবর্তন, অন/অফ এবং ডিলিট/রিসেট করতে পারবেন।</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400 shrink-0">কাস্টমাইজেশন সেকশন:</span>
              <select
                value={customizationSection}
                onChange={(e: any) => setCustomizationSection(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-bold cursor-pointer"
              >
                <option value="homepage">🏠 হোমপেজ কাস্টমাইজেশন (Homepage)</option>
                <option value="footer">👣 ফুটার কাস্টমাইজেশন (Footer)</option>
              </select>
            </div>
          </div>

          {settings && settings.customization ? (
            <div className="space-y-6">
              {customizationSection === "homepage" && (
                <div className="space-y-5">
                  {/* Top Notice Field */}
                  <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-750/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-200">১. টপ নোটিশ এরিয়া (Top Notice / Announcement)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleToggleCustomizationField("homepage", "topNotice")}
                          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-all"
                        >
                          <span className="text-[10px] font-bold">ভিজিবিলিটি:</span>
                          {settings.customization.homepage.topNotice?.enabled ? (
                            <ToggleRight size={24} className="text-emerald-400" />
                          ) : (
                            <ToggleLeft size={24} className="text-slate-600" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={localTopNotice}
                        onChange={(e) => setLocalTopNotice(e.target.value)}
                        placeholder="টপ নোটিশের লেখা লিখুন..."
                        className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 w-full"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                      <span className="text-[10px] text-slate-500">ডিফল্ট নোটিশ টেক্সট রিসেট করতে বামপাশের রিসেট বোতাম চাপুন।</span>
                      <div className="flex items-center justify-end gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleRevertCustomizationField("homepage", "topNotice")}
                          className="px-2.5 py-1 text-[10px] font-bold text-indigo-400 hover:text-indigo-300 border border-indigo-900/50 hover:bg-indigo-950/20 rounded transition-all"
                        >
                          ডিফল্ট রিসেট
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteCustomizationField("homepage", "topNotice")}
                          className="px-2.5 py-1 text-[10px] font-bold text-rose-400 hover:text-rose-300 border border-rose-900/50 hover:bg-rose-950/20 rounded transition-all"
                        >
                          মুছে ফেলুন
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUpdateCustomizationText("homepage", "topNotice", localTopNotice)}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold transition-all"
                        >
                          আপডেট করুন
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Badge Field */}
                  <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-750/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-200">২. সাব-ব্যাজ টেক্সট (Hero Badge)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleToggleCustomizationField("homepage", "badge")}
                          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-all"
                        >
                          <span className="text-[10px] font-bold">ভিজিবিলিটি:</span>
                          {settings.customization.homepage.badge?.enabled ? (
                            <ToggleRight size={24} className="text-emerald-400" />
                          ) : (
                            <ToggleLeft size={24} className="text-slate-600" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={localBadge}
                        onChange={(e) => setLocalBadge(e.target.value)}
                        placeholder="ব্যাজ টেক্সট লিখুন..."
                        className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 w-full"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                      <span className="text-[10px] text-slate-500">ডিফল্ট ব্যাজ রিসেট করতে বামপাশের রিসেট বোতাম চাপুন।</span>
                      <div className="flex items-center justify-end gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleRevertCustomizationField("homepage", "badge")}
                          className="px-2.5 py-1 text-[10px] font-bold text-indigo-400 hover:text-indigo-300 border border-indigo-900/50 hover:bg-indigo-950/20 rounded transition-all"
                        >
                          ডিফল্ট রিসেট
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteCustomizationField("homepage", "badge")}
                          className="px-2.5 py-1 text-[10px] font-bold text-rose-400 hover:text-rose-300 border border-rose-900/50 hover:bg-rose-950/20 rounded transition-all"
                        >
                          মুছে ফেলুন
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUpdateCustomizationText("homepage", "badge", localBadge)}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold transition-all"
                        >
                          আপডেট করুন
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Main Title Field */}
                  <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-750/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-200">৩. প্রধান শিরোনাম (Main Hero Title)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleToggleCustomizationField("homepage", "mainTitle")}
                          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-all"
                        >
                          <span className="text-[10px] font-bold">ভিজিবিলিটি:</span>
                          {settings.customization.homepage.mainTitle?.enabled ? (
                            <ToggleRight size={24} className="text-emerald-400" />
                          ) : (
                            <ToggleLeft size={24} className="text-slate-600" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={localMainTitle}
                        onChange={(e) => setLocalMainTitle(e.target.value)}
                        placeholder="প্রধান শিরোনাম লিখুন..."
                        className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 w-full"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                      <span className="text-[10px] text-slate-500">ডিফল্ট শিরোনাম রিসেট করতে বামপাশের রিসেট বোতাম চাপুন।</span>
                      <div className="flex items-center justify-end gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleRevertCustomizationField("homepage", "mainTitle")}
                          className="px-2.5 py-1 text-[10px] font-bold text-indigo-400 hover:text-indigo-300 border border-indigo-900/50 hover:bg-indigo-950/20 rounded transition-all"
                        >
                          ডিফল্ট রিসেট
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteCustomizationField("homepage", "mainTitle")}
                          className="px-2.5 py-1 text-[10px] font-bold text-rose-400 hover:text-rose-300 border border-rose-900/50 hover:bg-rose-950/20 rounded transition-all"
                        >
                          মুছে ফেলুন
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUpdateCustomizationText("homepage", "mainTitle", localMainTitle)}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold transition-all"
                        >
                          আপডেট করুন
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Subtitle Field */}
                  <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-750/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-200">৪. উপ-শিরোনাম / বর্ণনা (Hero Subtitle)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleToggleCustomizationField("homepage", "subtitle")}
                          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-all"
                        >
                          <span className="text-[10px] font-bold">ভিজিবিলিটি:</span>
                          {settings.customization.homepage.subtitle?.enabled ? (
                            <ToggleRight size={24} className="text-emerald-400" />
                          ) : (
                            <ToggleLeft size={24} className="text-slate-600" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <textarea
                        value={localSubtitle}
                        onChange={(e) => setLocalSubtitle(e.target.value)}
                        placeholder="উপ-শিরোনাম লিখুন..."
                        rows={3}
                        className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 w-full"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                      <span className="text-[10px] text-slate-500">ডিফল্ট উপ-শিরোনাম রিসেট করতে বামপাশের রিসেট বোতাম চাপুন।</span>
                      <div className="flex items-center justify-end gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleRevertCustomizationField("homepage", "subtitle")}
                          className="px-2.5 py-1 text-[10px] font-bold text-indigo-400 hover:text-indigo-300 border border-indigo-900/50 hover:bg-indigo-950/20 rounded transition-all"
                        >
                          ডিফল্ট রিসেট
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteCustomizationField("homepage", "subtitle")}
                          className="px-2.5 py-1 text-[10px] font-bold text-rose-400 hover:text-rose-300 border border-rose-900/50 hover:bg-rose-950/20 rounded transition-all"
                        >
                          মুছে ফেলুন
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUpdateCustomizationText("homepage", "subtitle", localSubtitle)}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold transition-all"
                        >
                          আপডেট করুন
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Directory Title Field */}
                  <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-750/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-200">৫. নিবন্ধিত তালিকা শিরোনাম (Directory List Title)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleToggleCustomizationField("homepage", "directoryTitle")}
                          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-all"
                        >
                          <span className="text-[10px] font-bold">ভিজিবিলিটি:</span>
                          {settings.customization.homepage.directoryTitle?.enabled ? (
                            <ToggleRight size={24} className="text-emerald-400" />
                          ) : (
                            <ToggleLeft size={24} className="text-slate-600" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={localDirectoryTitle}
                        onChange={(e) => setLocalDirectoryTitle(e.target.value)}
                        placeholder="নিবন্ধিত তালিকা শিরোনাম লিখুন..."
                        className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 w-full"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                      <span className="text-[10px] text-slate-500">ডিফল্ট ডিরেক্টরি শিরোনাম রিসেট করতে ডানপাশের রিসেট বোতাম চাপুন।</span>
                      <div className="flex items-center justify-end gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleRevertCustomizationField("homepage", "directoryTitle")}
                          className="px-2.5 py-1 text-[10px] font-bold text-indigo-400 hover:text-indigo-300 border border-indigo-900/50 hover:bg-indigo-950/20 rounded transition-all"
                        >
                          ডিফল্ট রিসেট
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteCustomizationField("homepage", "directoryTitle")}
                          className="px-2.5 py-1 text-[10px] font-bold text-rose-400 hover:text-rose-300 border border-rose-900/50 hover:bg-rose-950/20 rounded transition-all"
                        >
                          মুছে ফেলুন
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUpdateCustomizationText("homepage", "directoryTitle", localDirectoryTitle)}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold transition-all"
                        >
                          আপডেট করুন
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Directory Subtitle Field */}
                  <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-750/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-200">৬. নিবন্ধিত তালিকা উপ-শিরোনাম (Directory List Subtitle)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleToggleCustomizationField("homepage", "directorySubtitle")}
                          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-all"
                        >
                          <span className="text-[10px] font-bold">ভিজিবিলিটি:</span>
                          {settings.customization.homepage.directorySubtitle?.enabled ? (
                            <ToggleRight size={24} className="text-emerald-400" />
                          ) : (
                            <ToggleLeft size={24} className="text-slate-600" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <textarea
                        value={localDirectorySubtitle}
                        onChange={(e) => setLocalDirectorySubtitle(e.target.value)}
                        placeholder="নিবন্ধিত তালিকা উপ-শিরোনাম লিখুন..."
                        rows={2}
                        className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 w-full"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                      <span className="text-[10px] text-slate-500">ডিফল্ট ডিরেক্টরি উপ-শিরোনাম রিসেট করতে ডানপাশের রিসেট বোতাম চাপুন।</span>
                      <div className="flex items-center justify-end gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleRevertCustomizationField("homepage", "directorySubtitle")}
                          className="px-2.5 py-1 text-[10px] font-bold text-indigo-400 hover:text-indigo-300 border border-indigo-900/50 hover:bg-indigo-950/20 rounded transition-all"
                        >
                          ডিফল্ট রিসেট
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteCustomizationField("homepage", "directorySubtitle")}
                          className="px-2.5 py-1 text-[10px] font-bold text-rose-400 hover:text-rose-300 border border-rose-900/50 hover:bg-rose-950/20 rounded transition-all"
                        >
                          মুছে ফেলুন
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUpdateCustomizationText("homepage", "directorySubtitle", localDirectorySubtitle)}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold transition-all"
                        >
                          আপডেট করুন
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Our Pages (External Links) Management */}
                  <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-750/50 space-y-4">
                    <div>
                      <span className="text-xs font-bold text-slate-200 block mb-1">৭. আমাদের অন্যান্য লিংকসমূহ (Our Pages External Links)</span>
                      <p className="text-[10px] text-slate-400">হোমপেজে প্রদর্শনের জন্য প্রয়োজনীয় বাহ্যিক পেজ/ওয়েবসাইটের লিঙ্ক বা টাইটেল যুক্ত করুন। আপনি সর্বোচ্চ ২৫০ টি লিঙ্ক ম্যানেজ করতে পারবেন। পরিবর্তন শেষে অবশ্যই "সংরক্ষণ করুন" বোতামে ক্লিক করুন।</p>
                    </div>

                    {/* Pages list */}
                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                      {localOurPages?.map((page) => {
                        const isEditing = editingOurPageId === page.id;
                        return (
                          <div key={page.id} className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-950/50 p-4 rounded-xl border border-slate-800/80 hover:border-slate-700 transition-all">
                            {isEditing ? (
                              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block mb-1">পেজ টাইটেল (Title)</label>
                                  <input
                                    type="text"
                                    value={editingOurPageTitle}
                                    onChange={(e) => setEditingOurPageTitle(e.target.value)}
                                    className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 w-full"
                                  />
                                </div>
                                <div>
                                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block mb-1">পেজ লিঙ্ক (URL)</label>
                                  <input
                                    type="text"
                                    value={editingOurPageUrl}
                                    onChange={(e) => setEditingOurPageUrl(e.target.value)}
                                    className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 w-full"
                                  />
                                </div>
                              </div>
                            ) : (
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs font-bold text-slate-100">{page.title}</span>
                                  <span className={`px-2 py-0.5 text-[9px] font-bold rounded-full border ${
                                    page.enabled 
                                      ? "bg-emerald-950/40 text-emerald-400 border-emerald-900/40" 
                                      : "bg-slate-900 text-slate-500 border-slate-850"
                                  }`}>
                                    {page.enabled ? "সক্রিয়" : "নিষ্ক্রিয়"}
                                  </span>
                                </div>
                                <p className="text-[10px] text-slate-400 truncate font-mono">{page.url}</p>
                              </div>
                            )}

                            <div className="flex items-center justify-end gap-2 mt-2 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/50">
                              {isEditing ? (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      handleLocalUpdateOurPage(page.id, editingOurPageTitle, editingOurPageUrl);
                                      setEditingOurPageId(null);
                                    }}
                                    className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold transition-all shadow-md"
                                  >
                                    <Check size={12} />
                                    আপডেট
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setEditingOurPageId(null)}
                                    className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[10px] font-bold transition-all"
                                  >
                                    <X size={12} />
                                    বাতিল
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEditingOurPageId(page.id);
                                      setEditingOurPageTitle(page.title);
                                      setEditingOurPageUrl(page.url);
                                    }}
                                    className="p-1.5 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-950/20 rounded-lg transition-all"
                                    title="এডিট করুন"
                                  >
                                    <Edit size={14} />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleLocalToggleOurPage(page.id)}
                                    className="p-1.5 text-slate-400 hover:text-slate-200 transition-all"
                                    title="দৃশ্যমানতা পরিবর্তন করুন"
                                  >
                                    {page.enabled ? (
                                      <ToggleRight size={20} className="text-emerald-400" />
                                    ) : (
                                      <ToggleLeft size={20} className="text-slate-600" />
                                    )}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteOurPage(page.id)}
                                    className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 rounded-lg transition-all"
                                    title="মুছে ফেলুন"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })}

                      {(!localOurPages || localOurPages.length === 0) && (
                        <div className="text-center py-6 bg-slate-950/20 rounded-lg border border-dashed border-slate-800 text-xs text-slate-500">
                          কোনো বাহ্যিক লিংক যুক্ত করা নেই।
                        </div>
                      )}
                    </div>

                    {/* Add new page link */}
                    <div className="bg-slate-950/25 p-4 rounded-xl border border-slate-800/50 space-y-3">
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wide block">নতুন লিংক যুক্ত করুন</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <input
                            type="text"
                            placeholder="লিংকের শিরোনাম (যেমন: এডমিন প্যানেল ২)"
                            value={newOurPageTitle}
                            onChange={(e) => setNewOurPageTitle(e.target.value)}
                            className="bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 w-full"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            placeholder="সম্পূর্ণ ইউআরএল (যেমন: https://another-panel.com)"
                            value={newOurPageUrl}
                            onChange={(e) => setNewOurPageUrl(e.target.value)}
                            className="bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 w-full"
                          />
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-1">
                        <span className="text-[10px] text-slate-500">মোট লিংক সংখ্যা: {localOurPages.length}/২৫০</span>
                        <button
                          type="button"
                          onClick={(e) => handleAddOurPage(e)}
                          className="flex items-center gap-1 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition-all shadow-md hover:shadow-emerald-950/50"
                        >
                          <Plus size={14} />
                          লিংক যুক্ত করুন
                        </button>
                      </div>
                    </div>

                    {/* Save Button for Our Pages */}
                    <div className="flex justify-end pt-2">
                      <button
                        type="button"
                        onClick={handleSaveOurPages}
                        className="flex items-center gap-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-all shadow-lg hover:shadow-emerald-950/50"
                      >
                        <Save size={14} />
                        লিংকসমূহ সংরক্ষণ করুন
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {customizationSection === "footer" && (
                <div className="space-y-5">
                  {/* Footer Copyright Field */}
                  <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-750/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-200">১. ফুটার কপিরাইট টেক্সট (Footer Copyright Text)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleToggleCustomizationField("footer", "copyright")}
                          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-all"
                        >
                          <span className="text-[10px] font-bold">ভিজিবিলিটি:</span>
                          {settings.customization.footer.copyright?.enabled ? (
                            <ToggleRight size={24} className="text-emerald-400" />
                          ) : (
                            <ToggleLeft size={24} className="text-slate-600" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={localCopyright}
                        onChange={(e) => setLocalCopyright(e.target.value)}
                        placeholder="কপিরাইট টেক্সট লিখুন..."
                        className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 w-full"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                      <span className="text-[10px] text-slate-500">ডিফল্ট কপিরাইট রিসেট করতে বামপাশের রিসেট বোতাম চাপুন।</span>
                      <div className="flex items-center justify-end gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleRevertCustomizationField("footer", "copyright")}
                          className="px-2.5 py-1 text-[10px] font-bold text-indigo-400 hover:text-indigo-300 border border-indigo-900/50 hover:bg-indigo-950/20 rounded transition-all"
                        >
                          ডিফল্ট রিসেট
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteCustomizationField("footer", "copyright")}
                          className="px-2.5 py-1 text-[10px] font-bold text-rose-400 hover:text-rose-300 border border-rose-900/50 hover:bg-rose-950/20 rounded transition-all"
                        >
                          মুছে ফেলুন
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUpdateCustomizationText("footer", "copyright", localCopyright)}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold transition-all"
                        >
                          আপডেট করুন
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Footer Description Field */}
                  <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-750/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-200">২. ফুটার বর্ণনা (Footer Description)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleToggleCustomizationField("footer", "description")}
                          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-all"
                        >
                          <span className="text-[10px] font-bold">ভিজিবিলিটি:</span>
                          {settings.customization.footer.description?.enabled ? (
                            <ToggleRight size={24} className="text-emerald-400" />
                          ) : (
                            <ToggleLeft size={24} className="text-slate-600" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <textarea
                        value={localFooterDesc}
                        onChange={(e) => setLocalFooterDesc(e.target.value)}
                        placeholder="ফুটার বর্ণনা লিখুন..."
                        rows={3}
                        className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 w-full"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                      <span className="text-[10px] text-slate-500">ডিফল্ট বর্ণনা রিসেট করতে বামপাশের রিসেট বোতাম চাপুন।</span>
                      <div className="flex items-center justify-end gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleRevertCustomizationField("footer", "description")}
                          className="px-2.5 py-1 text-[10px] font-bold text-indigo-400 hover:text-indigo-300 border border-indigo-900/50 hover:bg-indigo-950/20 rounded transition-all"
                        >
                          ডিফল্ট রিসেট
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteCustomizationField("footer", "description")}
                          className="px-2.5 py-1 text-[10px] font-bold text-rose-400 hover:text-rose-300 border border-rose-900/50 hover:bg-rose-950/20 rounded transition-all"
                        >
                          মুছে ফেলুন
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUpdateCustomizationText("footer", "description", localFooterDesc)}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold transition-all"
                        >
                          আপডেট করুন
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Social Media Links Management */}
                  <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-750/50 space-y-4">
                    <div>
                      <span className="text-xs font-bold text-slate-200 block mb-1">৩. সামাজিক যোগাযোগ মাধ্যম লিঙ্কসমূহ (Social Media Links)</span>
                      <p className="text-[10px] text-slate-400">ফুটার ডিরেক্টরিতে আপনার প্রয়োজনীয় সামাজিক যোগাযোগ মাধ্যম প্রোফাইলের লিঙ্ক সচল অথবা নিষ্ক্রিয় করতে পারবেন, নতুন যুক্ত বা ডিলিট করতে পারবেন। পরিবর্তন শেষে অবশ্যই "সংরক্ষণ করুন" বোতামে ক্লিক করুন।</p>
                    </div>

                    {/* Social links list */}
                    <div className="space-y-3">
                      {localSocialLinks?.map((link) => {
                        const isEditing = editingSocialLinkId === link.id;
                        return (
                          <div key={link.id} className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-950/50 p-4 rounded-xl border border-slate-800/80 hover:border-slate-700 transition-all">
                            {isEditing ? (
                              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block mb-1">মাধ্যম/প্ল্যাটফর্ম</label>
                                  <input
                                    type="text"
                                    value={editingSocialPlatform}
                                    onChange={(e) => setEditingSocialPlatform(e.target.value)}
                                    className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 w-full"
                                  />
                                </div>
                                <div>
                                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block mb-1">প্রোফাইল লিঙ্ক (URL)</label>
                                  <input
                                    type="text"
                                    value={editingSocialUrl}
                                    onChange={(e) => setEditingSocialUrl(e.target.value)}
                                    className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 w-full"
                                  />
                                </div>
                              </div>
                            ) : (
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs font-bold text-slate-100">{link.platform}</span>
                                  <span className={`px-2 py-0.5 text-[9px] font-bold rounded-full border ${
                                    link.enabled 
                                      ? "bg-emerald-950/40 text-emerald-400 border-emerald-900/40" 
                                      : "bg-slate-900 text-slate-500 border-slate-850"
                                  }`}>
                                    {link.enabled ? "সক্রিয়" : "নিষ্ক্রিয়"}
                                  </span>
                                </div>
                                <p className="text-[10px] text-slate-400 truncate font-mono">{link.url}</p>
                              </div>
                            )}

                            <div className="flex items-center justify-end gap-2 mt-2 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/50">
                              {isEditing ? (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      handleLocalUpdateSocialLink(link.id, editingSocialPlatform, editingSocialUrl);
                                      setEditingSocialLinkId(null);
                                    }}
                                    className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold transition-all shadow-md"
                                  >
                                    <Check size={12} />
                                    আপডেট
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setEditingSocialLinkId(null)}
                                    className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[10px] font-bold transition-all"
                                  >
                                    <X size={12} />
                                    বাতিল
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEditingSocialLinkId(link.id);
                                      setEditingSocialPlatform(link.platform);
                                      setEditingSocialUrl(link.url);
                                    }}
                                    className="p-1.5 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-950/20 rounded-lg transition-all"
                                    title="এডিট করুন"
                                  >
                                    <Edit size={14} />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleLocalToggleSocialLink(link.id)}
                                    className="p-1.5 text-slate-400 hover:text-slate-200 transition-all"
                                    title="দৃশ্যমানতা পরিবর্তন করুন"
                                  >
                                    {link.enabled ? (
                                      <ToggleRight size={20} className="text-emerald-400" />
                                    ) : (
                                      <ToggleLeft size={20} className="text-slate-600" />
                                    )}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteSocialLink(link.id)}
                                    className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 rounded-lg transition-all"
                                    title="মুছে ফেলুন"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })}

                      {(!localSocialLinks || localSocialLinks.length === 0) && (
                        <div className="text-center py-4 bg-slate-950/20 rounded-lg border border-dashed border-slate-800 text-xs text-slate-500">
                          কোনো সামাজিক যোগাযোগের লিঙ্ক যুক্ত করা নেই।
                        </div>
                      )}
                    </div>

                    {/* Form to add new social link */}
                    <div className="bg-slate-950/25 p-3 rounded-lg border border-slate-800/50 space-y-3">
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wide block">নতুন সোশ্যাল মিডিয়া যুক্ত করুন</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="প্ল্যাটফর্মের নাম (যেমন: Facebook, WhatsApp)"
                          value={newSocialPlatform}
                          onChange={(e) => setNewSocialPlatform(e.target.value)}
                          className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 w-full"
                        />
                        <input
                          type="text"
                          placeholder="লিঙ্ক (যেমন: https://facebook.com/username)"
                          value={newSocialUrl}
                          onChange={(e) => setNewSocialUrl(e.target.value)}
                          className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 w-full"
                        />
                      </div>
                      <div className="flex justify-end pt-1">
                        <button
                          type="button"
                          onClick={(e) => handleAddSocialLink(e as any)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold transition-all shadow-md"
                        >
                          <Plus size={14} />
                          যুক্ত করুন
                        </button>
                      </div>
                    </div>

                    {/* Save Button for Social Links */}
                    <div className="flex justify-end pt-3 border-t border-slate-800/40">
                      <button
                        type="button"
                        onClick={handleSaveSocialLinks}
                        className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-md hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <Save size={14} />
                        সামাজিক লিঙ্ক সংরক্ষণ করুন
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-xs text-slate-500">সেটিংস লোড হচ্ছে...</div>
          )}
        </div>
      )}

      {/* Custom Confirmation Modal */}
      {confirmModal && confirmModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-750 max-w-md w-full rounded-2xl shadow-2xl p-6 transform animate-in zoom-in-95 duration-200">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-rose-950/40 rounded-xl text-rose-400 border border-rose-900/50 shrink-0">
                <AlertCircle size={24} />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-white mb-1">{confirmModal.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">{confirmModal.message}</p>
                
                <div className="flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setConfirmModal(null)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-all"
                  >
                    {confirmModal.cancelText || "না, ফিরে যান"}
                  </button>
                  <button
                    type="button"
                    onClick={confirmModal.onConfirm}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all"
                  >
                    {confirmModal.confirmText || "হ্যাঁ, ডিলিট করুন"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
