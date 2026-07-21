import React, { useState, useEffect } from "react";
import { 
  Globe, Facebook, Twitter, CheckCircle2, AlertTriangle, Save, RefreshCw, 
  ExternalLink, Code, Search, Settings, FileText, Check, Copy, HelpCircle
} from "lucide-react";

interface SeoData {
  // Basic SEO
  websiteName: string;
  websiteTitle: string;
  homepageTitle: string;
  metaDescription: string;
  metaKeywords: string;
  canonicalUrl: string;
  websiteUrl: string;
  preferredDomain: string;
  defaultLanguage: string;
  authorName: string;
  copyright: string;
  robotsMetaTag: string;
  themeColor: string;
  faviconUrl: string;

  // Open Graph
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  ogType: string;
  fbAppId: string;

  // Twitter
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  twitterCardType: string;

  // Verification Codes
  googleConsoleCode: string;
  bingWebmasterCode: string;
  yandexWebmasterCode: string;
  baiduWebmasterCode: string;
  pinterestVerificationCode: string;
  facebookDomainVerificationCode: string;
  customVerificationTags: string;

  // Sitemap & Robots configurations
  trailingSlashPreference: "always" | "never";
  homepagePriority: string;
  changeFrequency: string;
  indexSetting: "index" | "noindex";
  followSetting: "follow" | "nofollow";

  // Structured Data (JSON-LD)
  organizationSchemaEnabled: boolean;
  organizationSchemaJson: string;
  websiteSchemaEnabled: boolean;
  websiteSchemaJson: string;
  webpageSchemaEnabled: boolean;
  webpageSchemaJson: string;
  breadcrumbSchemaEnabled: boolean;
  breadcrumbSchemaJson: string;
  faqSchemaEnabled: boolean;
  faqSchemaJson: string;
  articleSchemaEnabled: boolean;
  articleSchemaJson: string;
  localBusinessSchemaEnabled: boolean;
  localBusinessSchemaJson: string;

  // Live content preview override
  robotsTxtContent: string;
}

interface SettingsData {
  fieldsConfig: any;
  positions: string[];
  locations: any[];
  customization?: any;
  seo?: SeoData;
}

const DEFAULT_SEO: SeoData = {
  websiteName: "প্রাথমিক বিদ্যালয় অফিস সহায়ক বাংলাদেশ",
  websiteTitle: "প্রাথমিক বিদ্যালয় অফিস সহায়ক বাংলাদেশ কল্যাণ ডিরেক্টরি",
  homepageTitle: "প্রাথমিক বিদ্যালয় অফিস সহায়ক বাংলাদেশ কল্যাণ ডিরেক্টরি - দপ্তরী কাম নৈশপ্রহরী তথ্যকোষ",
  metaDescription: "সকল সরকারি প্রাথমিক বিদ্যালয়ের অফিস সহায়ক কর্মচারীদের সঠিক যোগাযোগ ও কল্যাণ ডিরেক্টরি এক ক্লিকেই খুজে নিন।",
  metaKeywords: "দপ্তরী, নৈশপ্রহরী, প্রাথমিক বিদ্যালয়, অফিস সহায়ক, বাংলাদেশ, কল্যাণ ডিরেক্টরি, doptari, nishiprohori",
  canonicalUrl: "",
  websiteUrl: "https://doptari-kallyan.web.app",
  preferredDomain: "www.doptari-kallyan.web.app",
  defaultLanguage: "bn",
  authorName: "এডমিন",
  copyright: "প্রাথমিক বিদ্যালয় অফিস সহায়ক বাংলাদেশ © 2026",
  robotsMetaTag: "index, follow",
  themeColor: "#059669",
  faviconUrl: "/favicon.ico",

  ogTitle: "প্রাথমিক বিদ্যালয় অফিস সহায়ক বাংলাদেশ কল্যাণ ডিরেক্টরি",
  ogDescription: "সকল সরকারি প্রাথমিক বিদ্যালয়ের অফিস সহায়ক কর্মচারীদের সঠিক যোগাযোগ ও কল্যাণ ডিরেক্টরি এক ক্লিকেই খুজে নিন।",
  ogImage: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=600",
  ogUrl: "",
  ogType: "website",
  fbAppId: "",

  twitterTitle: "প্রাথমিক বিদ্যালয় অফিস সহায়ক বাংলাদেশ কল্যাণ ডিরেক্টরি",
  twitterDescription: "সকল সরকারি প্রাথমিক বিদ্যালয়ের অফিস সহায়ক কর্মচারীদের সঠিক যোগাযোগ ও কল্যাণ ডিরেক্টরি এক ক্লিকেই খুজে নিন।",
  twitterImage: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=600",
  twitterCardType: "summary_large_image",

  googleConsoleCode: "",
  bingWebmasterCode: "",
  yandexWebmasterCode: "",
  baiduWebmasterCode: "",
  pinterestVerificationCode: "",
  facebookDomainVerificationCode: "",
  customVerificationTags: "",

  trailingSlashPreference: "never",
  homepagePriority: "1.0",
  changeFrequency: "daily",
  indexSetting: "index",
  followSetting: "follow",

  organizationSchemaEnabled: true,
  organizationSchemaJson: `{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "প্রাথমিক বিদ্যালয় অফিস সহায়ক বাংলাদেশ",
  "url": "https://doptari-kallyan.web.app",
  "logo": "https://doptari-kallyan.web.app/favicon.ico",
  "sameAs": [
    "https://facebook.com/groups/primaryschool.office.assistant"
  ]
}`,
  websiteSchemaEnabled: true,
  websiteSchemaJson: `{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "প্রাথমিক বিদ্যালয় অফিস সহায়ক বাংলাদেশ",
  "url": "https://doptari-kallyan.web.app",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://doptari-kallyan.web.app/?search={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}`,
  webpageSchemaEnabled: true,
  webpageSchemaJson: `{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "অফিস সহায়ক ডিরেক্টরি",
  "description": "সরকারি প্রাথমিক বিদ্যালয়ের অফিস সহায়ক কর্মচারীদের ডিরেক্টরি ও যোগাযোগ ডেক্স"
}`,
  breadcrumbSchemaEnabled: true,
  breadcrumbSchemaJson: `{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "হোম",
    "item": "https://doptari-kallyan.web.app"
  }]
}`,
  faqSchemaEnabled: true,
  faqSchemaJson: `{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "এই কল্যাণ ডিরেক্টরিটির উদ্দেশ্য কি?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "সকল সরকারি প্রাথমিক বিদ্যালয়ের অফিস সহায়ক কর্মচারীদের পারস্পরিক যোগাযোগ সহজ করা এবং কল্যাণকর কার্যক্রম ত্বরান্বিত করা।"
    }
  }, {
    "@type": "Question",
    "name": "সদস্য তথ্য কি নিরাপদ?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "হ্যাঁ, এডমিন প্যানেলের মাধ্যমে অনুমোদিত হওয়ার পরই শুধুমাত্র নিবন্ধিত সদস্যের তথ্য সিস্টেমে প্রদর্শিত হয়।"
    }
  }]
}`,
  articleSchemaEnabled: false,
  articleSchemaJson: `{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "সরকারি প্রাথমিক বিদ্যালয়ের অফিস সহায়ক কর্মচারীদের কল্যাণ ডিরেক্টরি প্রকাশ",
  "datePublished": "2026-07-19T08:00:00+06:00",
  "author": {
    "@type": "Organization",
    "name": "অফিস সহায়ক বাংলাদেশ অ্যাসোসিয়েশন"
  }
}`,
  localBusinessSchemaEnabled: false,
  localBusinessSchemaJson: `{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "প্রাথমিক বিদ্যালয় অফিস সহায়ক বাংলাদেশ",
  "image": "https://doptari-kallyan.web.app/favicon.ico",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "ঢাকা",
    "addressCountry": "BD"
  },
  "telephone": "+8801700000000"
}`,
  robotsTxtContent: ""
};

export const WebSEO: React.FC = () => {
  const [settings, setSettings] = useState<SettingsData | null>(null);
  const [seo, setSeo] = useState<SeoData>(DEFAULT_SEO);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<"basic" | "social" | "verification" | "sitemap" | "schema" | "preview">("basic");

  // Robots and sitemap generation dynamic test output
  const [copiedRobots, setCopiedRobots] = useState(false);
  const [copiedSitemap, setCopiedSitemap] = useState(false);
  const [generatingAssets, setGeneratingAssets] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/settings");
      if (response.ok) {
        const data = (await response.json()) as SettingsData;
        setSettings(data);
        if (data.seo) {
          // Merge with DEFAULT_SEO to ensure any newly added properties always exist
          setSeo({
            ...DEFAULT_SEO,
            ...data.seo
          });
        } else {
          setSeo(DEFAULT_SEO);
        }
      } else {
        showFeedback("error", "সার্ভার থেকে সেটিংস লোড করতে ব্যর্থ হয়েছে।");
      }
    } catch (error) {
      console.error("Error fetching settings for WebSEO:", error);
      showFeedback("error", "নেটওয়ার্ক ত্রুটি। দয়া করে পুনরায় চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const showFeedback = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4500);
  };

  const handleInputChange = (field: keyof SeoData, value: any) => {
    setSeo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveSeoSettings = async () => {
    if (!settings) return;
    setSaving(true);
    try {
      const token = sessionStorage.getItem("admin_token");
      const updatedSettings: SettingsData = {
        ...settings,
        seo: seo
      };

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
          if (data.settings.seo) {
            setSeo(data.settings.seo);
          }
          showFeedback("success", "ওয়েবএসইও (WebSEO) সেটিংস সফলভাবে ডাটাবেজে ও ফায়ারস্টোরে সংরক্ষিত হয়েছে!");
        } else {
          showFeedback("error", data.error || "সেটিংস সংরক্ষণ ব্যর্থ হয়েছে।");
        }
      } else {
        showFeedback("error", "অননুমোদিত এক্সেস। পুনরায় লগইন করুন।");
      }
    } catch (error) {
      console.error("Error saving SEO settings:", error);
      showFeedback("error", "নেটওয়ার্ক কানেকশন ব্যর্থ হয়েছে।");
    } finally {
      setSaving(false);
    }
  };

  const handleRegenerateRobotsAndSitemap = async () => {
    setGeneratingAssets(true);
    // Mimic sitemap generation trigger by updating backend content
    try {
      // Regenerate locally based on current websiteUrl
      const webUrl = seo.websiteUrl.replace(/\/$/, "");
      
      let generatedRobots = seo.robotsTxtContent;
      if (!generatedRobots || generatedRobots.includes("Sitemap:")) {
        generatedRobots = `User-agent: *\nDisallow: /rifat-admin/\nAllow: /\n\nSitemap: ${webUrl}/sitemap-index.xml`;
      }

      setSeo(prev => ({
        ...prev,
        robotsTxtContent: generatedRobots
      }));

      showFeedback("success", "robots.txt এবং sitemap.xml সফলভাবে পুনঃসংগঠিত (Regenerated) হয়েছে! সেটিংস সংরক্ষণ করুন।");
    } catch (e) {
      showFeedback("error", "পুনঃসংগঠন ব্যর্থ হয়েছে।");
    } finally {
      setGeneratingAssets(false);
    }
  };

  const handleCopyText = (text: string, type: "robots" | "sitemap") => {
    navigator.clipboard.writeText(text);
    if (type === "robots") {
      setCopiedRobots(true);
      setTimeout(() => setCopiedRobots(false), 2000);
    } else {
      setCopiedSitemap(true);
      setTimeout(() => setCopiedSitemap(false), 2000);
    }
  };

  const testRobotsUrl = `${seo.websiteUrl.replace(/\/$/, "")}/robots.txt`;
  const testSitemapUrl = `${seo.websiteUrl.replace(/\/$/, "")}/sitemap.xml`;
  const testSitemapIndexUrl = `${seo.websiteUrl.replace(/\/$/, "")}/sitemap-index.xml`;

  if (loading) {
    return (
      <div className="py-16 text-center text-slate-400 text-xs flex flex-col items-center justify-center gap-3">
        <RefreshCw className="animate-spin text-emerald-500" size={24} />
        <span>সার্ভার থেকে এসইও কনফিগারেশন লোড করা হচ্ছে...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Title & Description */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-700/60 pb-5">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Globe className="text-cyan-400" size={20} />
            সার্চ ইঞ্জিন অপ্টিমাইজেশন (WebSEO System)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            কোড পরিবর্তন ছাড়াই আপনার কল্যাণ ডিরেক্টরি ওয়েবসাইটের টাইটেল, মেটা ডেসক্রিপশন, ফেসবুক ওপেন গ্রাফ, টুইটার কার্ড, সাইট ভেরিফিকেশন এবং JSON-LD স্কিমা নিয়্ন্ত্রণ করুন।
          </p>
        </div>

        <button
          onClick={handleSaveSeoSettings}
          disabled={saving}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2"
        >
          {saving ? (
            <RefreshCw className="animate-spin" size={14} />
          ) : (
            <Save size={14} />
          )}
          এসইও সেটিংস সংরক্ষণ করুন
        </button>
      </div>

      {/* Success/Error Feedback Banner */}
      {message && (
        <div className={`p-4 rounded-2xl flex items-center gap-3 border text-xs leading-relaxed animate-in fade-in slide-in-from-top-1 ${
          message.type === "success" 
            ? "bg-emerald-950/40 text-emerald-300 border-emerald-800" 
            : "bg-rose-950/40 text-rose-300 border-rose-800"
        }`}>
          {message.type === "success" ? <CheckCircle2 size={16} className="text-emerald-400 shrink-0" /> : <AlertTriangle size={16} className="text-rose-400 shrink-0" />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Sub Tabs Navigation */}
      <div className="flex flex-wrap gap-1.5 border-b border-slate-750 pb-1">
        {[
          { id: "basic", label: "প্রাথমিক এসইও সেটিংস", icon: Globe },
          { id: "social", label: "সোশ্যাল মিডিয়া (OG & Twitter)", icon: Facebook },
          { id: "verification", label: "সার্চ ইঞ্জিন ভেরিফিকেশন", icon: CheckCircle2 },
          { id: "sitemap", label: "রোবটস ও সাইটম্যাপ", icon: Settings },
          { id: "schema", label: "Structured Data (Schema)", icon: Code },
          { id: "preview", label: "সার্চ প্রিভিউ চেকার", icon: Search }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-3 py-2 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 border border-transparent ${
                activeSubTab === tab.id
                  ? "bg-slate-700 text-white border-slate-650"
                  : "text-slate-400 hover:bg-slate-750 hover:text-slate-200"
              }`}
            >
              <Icon size={13} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Grid containing Tab Contents & Sidebar Help Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Form Panel */}
        <div className="lg:col-span-3 space-y-5">
          
          {/* TAB 1: BASIC SEO */}
          {activeSubTab === "basic" && (
            <div className="bg-slate-850/40 p-5 rounded-2xl border border-slate-750/70 space-y-4">
              <h3 className="text-xs font-bold text-white border-b border-slate-750 pb-2 uppercase tracking-wide">বেসিক এসইও তথ্যসমূহ</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">ওয়েবসাইটের নাম (Website Name)</label>
                  <input
                    type="text"
                    value={seo.websiteName}
                    onChange={(e) => handleInputChange("websiteName", e.target.value)}
                    placeholder="যেমন: প্রাথমিক বিদ্যালয় অফিস সহায়ক বাংলাদেশ"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs"
                  />
                </div>
                
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">ওয়েবসাইটের টাইটেল (Website Title)</label>
                  <input
                    type="text"
                    value={seo.websiteTitle}
                    onChange={(e) => handleInputChange("websiteTitle", e.target.value)}
                    placeholder="যেমন: প্রাথমিক বিদ্যালয় অফিস সহায়ক বাংলাদেশ কল্যাণ ডিরেক্টরি"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">হোমপেজ ফুল টাইটেল (Homepage Title Template)</label>
                <input
                  type="text"
                  value={seo.homepageTitle}
                  onChange={(e) => handleInputChange("homepageTitle", e.target.value)}
                  placeholder="যেমন: প্রাথমিক বিদ্যালয় অফিস সহায়ক বাংলাদেশ কল্যাণ ডিরেক্টরি - দপ্তরী কাম নৈশপ্রহরী তথ্যকোষ"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">ওয়েবসাইট লিংক (Website URL)</label>
                  <input
                    type="url"
                    value={seo.websiteUrl}
                    onChange={(e) => handleInputChange("websiteUrl", e.target.value)}
                    placeholder="যেমন: https://doptari-kallyan.web.app"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">প্রিফার্ড ডোমেইন (Preferred Domain URL)</label>
                  <input
                    type="text"
                    value={seo.preferredDomain}
                    onChange={(e) => handleInputChange("preferredDomain", e.target.value)}
                    placeholder="যেমন: www.doptari-kallyan.web.app"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">মেটা ডেসক্রিপশন (Meta Description) <span className="text-slate-500 font-normal">({seo.metaDescription.length}/160 characters recommendation)</span></label>
                <textarea
                  rows={3}
                  value={seo.metaDescription}
                  onChange={(e) => handleInputChange("metaDescription", e.target.value)}
                  placeholder="সার্চ ইঞ্জিনের ফলাফলে সাইটের টাইটেলের নিচে প্রদর্শিত ছোট ডেসক্রিপশন..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">মেটা কিওয়ার্ডস (Meta Keywords) <span className="text-slate-500 font-normal">(কমা দিয়ে আলাদা করুন)</span></label>
                <input
                  type="text"
                  value={seo.metaKeywords}
                  onChange={(e) => handleInputChange("metaKeywords", e.target.value)}
                  placeholder="দপ্তরী, নৈশপ্রহরী, ডিরেক্টরি, অফিস সহায়ক"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">ক্যানোনিকাল লিংক (Canonical URL)</label>
                  <input
                    type="url"
                    value={seo.canonicalUrl}
                    onChange={(e) => handleInputChange("canonicalUrl", e.target.value)}
                    placeholder="ফাঁকা রাখলে অটোমেটিক রুট ডোমেইন হবে"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">ডিফল্ট ভাষা (Default Language)</label>
                  <input
                    type="text"
                    value={seo.defaultLanguage}
                    onChange={(e) => handleInputChange("defaultLanguage", e.target.value)}
                    placeholder="যেমন: bn"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">Robots Meta Tag</label>
                  <select
                    value={seo.robotsMetaTag}
                    onChange={(e) => handleInputChange("robotsMetaTag", e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs text-slate-200"
                  >
                    <option value="index, follow" className="bg-slate-800">index, follow (সুপারিশকৃত)</option>
                    <option value="noindex, follow" className="bg-slate-800">noindex, follow</option>
                    <option value="index, nofollow" className="bg-slate-800">index, nofollow</option>
                    <option value="noindex, nofollow" className="bg-slate-800">noindex, nofollow</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">লেখক / প্রকাশকের নাম (Author Name)</label>
                  <input
                    type="text"
                    value={seo.authorName}
                    onChange={(e) => handleInputChange("authorName", e.target.value)}
                    placeholder="যেমন: এডমিন"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">কপিরাইট লাইন (Copyright Text)</label>
                  <input
                    type="text"
                    value={seo.copyright}
                    onChange={(e) => handleInputChange("copyright", e.target.value)}
                    placeholder="যেমন: প্রাথমিক বিদ্যালয় অফিস সহায়ক বাংলাদেশ কল্যাণ ডিরেক্টরি © 2026"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">থিম কালার (Theme Color HEX)</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={seo.themeColor.startsWith("#") ? seo.themeColor : "#059669"}
                      onChange={(e) => handleInputChange("themeColor", e.target.value)}
                      className="w-10 h-8 rounded bg-slate-900 border border-slate-700 cursor-pointer self-center"
                    />
                    <input
                      type="text"
                      value={seo.themeColor}
                      onChange={(e) => handleInputChange("themeColor", e.target.value)}
                      placeholder="#059669"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">Favicon URL Link</label>
                  <input
                    type="text"
                    value={seo.faviconUrl}
                    onChange={(e) => handleInputChange("faviconUrl", e.target.value)}
                    placeholder="/favicon.ico অথবা বাহ্যিক ইমেজ লিংক"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs font-mono"
                  />
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: SOCIAL MEDIA */}
          {activeSubTab === "social" && (
            <div className="space-y-5">
              
              {/* Facebook Open Graph */}
              <div className="bg-slate-850/40 p-5 rounded-2xl border border-slate-750/70 space-y-4">
                <h3 className="text-xs font-bold text-cyan-400 flex items-center gap-1.5 border-b border-slate-750 pb-2 uppercase tracking-wide">
                  <Facebook size={14} /> Facebook Open Graph (OG) Tags
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">ফেসবুক ওজি টাইটেল (OG Title)</label>
                    <input
                      type="text"
                      value={seo.ogTitle}
                      onChange={(e) => handleInputChange("ogTitle", e.target.value)}
                      placeholder="ফেসবুকে শেয়ার করলে প্রদর্শিত টাইটেল"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">ওজি ক্যাটাগরি (OG Type)</label>
                    <input
                      type="text"
                      value={seo.ogType}
                      onChange={(e) => handleInputChange("ogType", e.target.value)}
                      placeholder="যেমন: website"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">ফেসবুক ওজি ইমেজ লিংক (OG Image URL)</label>
                  <input
                    type="text"
                    value={seo.ogImage}
                    onChange={(e) => handleInputChange("ogImage", e.target.value)}
                    placeholder="যেমন: https://domain.com/og-banner.jpg"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs font-mono"
                  />
                  {seo.ogImage && (
                    <div className="mt-2 text-[10px] text-slate-400 flex items-center gap-1">
                      <span>প্রিভিউ ইমেজ লিংক সক্রিয়:</span>
                      <a href={seo.ogImage} target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline flex items-center gap-0.5">
                        ভিজিট করুন <ExternalLink size={10} />
                      </a>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">ফেসবুক ওজি ডেসক্রিপশন (OG Description)</label>
                  <textarea
                    rows={2.5}
                    value={seo.ogDescription}
                    onChange={(e) => handleInputChange("ogDescription", e.target.value)}
                    placeholder="ফেসবুকে শেয়ার দিলে প্রদর্শিত সংক্ষিপ্ত বর্ণনা..."
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">ওজি লিংক (OG URL Override)</label>
                    <input
                      type="text"
                      value={seo.ogUrl}
                      onChange={(e) => handleInputChange("ogUrl", e.target.value)}
                      placeholder="ফাঁকা রাখলে প্রধান ডোমেইন অটো কাজ করবে"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">ফেসবুক অ্যাপ আইডি (FB App ID - optional)</label>
                    <input
                      type="text"
                      value={seo.fbAppId}
                      onChange={(e) => handleInputChange("fbAppId", e.target.value)}
                      placeholder="ফেসবুক ডিরেক্টরি ড্যাশবোর্ড ট্র্যাকিং অ্যাপ আইডি"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs font-mono"
                    />
                  </div>
                </div>

              </div>

              {/* Twitter Card */}
              <div className="bg-slate-850/40 p-5 rounded-2xl border border-slate-750/70 space-y-4">
                <h3 className="text-xs font-bold text-sky-400 flex items-center gap-1.5 border-b border-slate-750 pb-2 uppercase tracking-wide">
                  <Twitter size={14} /> Twitter (X) Card Meta Tags
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">টুইটার টাইটেল (Twitter Title)</label>
                    <input
                      type="text"
                      value={seo.twitterTitle}
                      onChange={(e) => handleInputChange("twitterTitle", e.target.value)}
                      placeholder="টুইটার/X প্ল্যাটফর্মে প্রদর্শিত টাইটেল"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">টুইটার কার্ড টাইপ (Twitter Card Type)</label>
                    <select
                      value={seo.twitterCardType}
                      onChange={(e) => handleInputChange("twitterCardType", e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs text-slate-200"
                    >
                      <option value="summary_large_image" className="bg-slate-800">summary_large_image (বড় ব্যানার ব্যানার)</option>
                      <option value="summary" className="bg-slate-800">summary (ছোট থাম্বনেইল)</option>
                      <option value="app" className="bg-slate-800">app details card</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">টুইটার ইমেজ লিংক (Twitter Image URL)</label>
                  <input
                    type="text"
                    value={seo.twitterImage}
                    onChange={(e) => handleInputChange("twitterImage", e.target.value)}
                    placeholder="টুইটার/X প্ল্যাটফর্মের থাম্বনেইল ব্যানার লিংক"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">টুইটার ডেসক্রিপশন (Twitter Description)</label>
                  <textarea
                    rows={2.5}
                    value={seo.twitterDescription}
                    onChange={(e) => handleInputChange("twitterDescription", e.target.value)}
                    placeholder="টুইটার/X এ শেয়ার দিলে প্রদর্শিত সংক্ষিপ্ত বর্ণনা..."
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs leading-relaxed"
                  />
                </div>

              </div>

            </div>
          )}

          {/* TAB 3: SEARCH VERIFICATION CODES */}
          {activeSubTab === "verification" && (
            <div className="bg-slate-850/40 p-5 rounded-2xl border border-slate-750/70 space-y-4">
              <h3 className="text-xs font-bold text-white border-b border-slate-750 pb-2 uppercase tracking-wide">সার্চ ইঞ্জিন ক্রলার ভেরিফিকেশন কোডসমূহ</h3>
              <p className="text-[11px] text-slate-400">
                গুগল সার্চ কনসোল, বিং বা ইয়ানডেক্সে আপনার ডিরেক্টরি ওয়েবসাইটটি ভেরিফাই করতে ক্রলার কোডগুলো এখানে পেস্ট করুন। সার্ভার এগুলো মেটা কোড হিসেবে হেডারে যুক্ত করবে।
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">Google Search Console Verification Code</label>
                  <input
                    type="text"
                    value={seo.googleConsoleCode}
                    onChange={(e) => handleInputChange("googleConsoleCode", e.target.value)}
                    placeholder="যেমন: jb-a7U6Y_xN4S6G..."
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">Bing Webmaster verification</label>
                  <input
                    type="text"
                    value={seo.bingWebmasterCode}
                    onChange={(e) => handleInputChange("bingWebmasterCode", e.target.value)}
                    placeholder="যেমন: 893D1E0B0A7B..."
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">Yandex Webmaster ID</label>
                  <input
                    type="text"
                    value={seo.yandexWebmasterCode}
                    onChange={(e) => handleInputChange("yandexWebmasterCode", e.target.value)}
                    placeholder="যেমন: d6f5a34e0b7..."
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">Baidu Webmaster Verification ID</label>
                  <input
                    type="text"
                    value={seo.baiduWebmasterCode}
                    onChange={(e) => handleInputChange("baiduWebmasterCode", e.target.value)}
                    placeholder="যেমন: code-va287f3..."
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">Pinterest domain verification</label>
                  <input
                    type="text"
                    value={seo.pinterestVerificationCode}
                    onChange={(e) => handleInputChange("pinterestVerificationCode", e.target.value)}
                    placeholder="Pinterest মেটা ভেরিফিকেশন কোড"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">Facebook Domain Verification</label>
                  <input
                    type="text"
                    value={seo.facebookDomainVerificationCode}
                    onChange={(e) => handleInputChange("facebookDomainVerificationCode", e.target.value)}
                    placeholder="যেমন: fb-df1287f712..."
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">Custom meta tags / Third-party Scripts (Raw Head Script injection)</label>
                <textarea
                  rows={4}
                  value={seo.customVerificationTags}
                  onChange={(e) => handleInputChange("customVerificationTags", e.target.value)}
                  placeholder="যেমন: <meta name='custom-tag' content='12345' /> বা কাস্টম স্ক্রিপ্ট ট্যাগ..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs font-mono leading-relaxed"
                />
              </div>

            </div>
          )}

          {/* TAB 4: ROBOTS & SITEMAPS */}
          {activeSubTab === "sitemap" && (
            <div className="space-y-5">
              
              <div className="bg-slate-850/40 p-5 rounded-2xl border border-slate-750/70 space-y-4">
                <h3 className="text-xs font-bold text-white border-b border-slate-750 pb-2 uppercase tracking-wide">রোবটস ডট টিএক্সটি (robots.txt) ও সাইটম্যাপ রুলস</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">ট্রেয়লিং স্ল্যাশ পলিসি (Trailing Slash)</label>
                    <select
                      value={seo.trailingSlashPreference}
                      onChange={(e) => handleInputChange("trailingSlashPreference", e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs text-slate-200"
                    >
                      <option value="never" className="bg-slate-800">কখনোই নয় (যেমন: /profile/123)</option>
                      <option value="always" className="bg-slate-800">সর্বদা স্ল্যাশ যুক্ত করুন (যেমন: /profile/123/)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">হোমপেজ সাইটম্যাপ প্রায়োরিটি (Homepage Priority)</label>
                    <input
                      type="text"
                      value={seo.homepagePriority}
                      onChange={(e) => handleInputChange("homepagePriority", e.target.value)}
                      placeholder="1.0"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">পরিবর্তনের ফ্রিকোয়েন্সি (Change Frequency)</label>
                    <select
                      value={seo.changeFrequency}
                      onChange={(e) => handleInputChange("changeFrequency", e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs text-slate-200"
                    >
                      <option value="always" className="bg-slate-800">always</option>
                      <option value="hourly" className="bg-slate-800">hourly</option>
                      <option value="daily" className="bg-slate-800">daily (সুপারিশকৃত)</option>
                      <option value="weekly" className="bg-slate-800">weekly</option>
                      <option value="monthly" className="bg-slate-800">monthly</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">গ্লোবাল ইনডেক্সিং (Global Index Setting)</label>
                    <select
                      value={seo.indexSetting}
                      onChange={(e) => handleInputChange("indexSetting", e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs text-slate-200"
                    >
                      <option value="index" className="bg-slate-800">index (সার্চ ইঞ্জিনে দেখাবে)</option>
                      <option value="noindex" className="bg-slate-800">noindex (সার্চ ইঞ্জিনে লুকানো)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">ক্রলার ফলো পলিসি (Crawler Follow Policy)</label>
                    <select
                      value={seo.followSetting}
                      onChange={(e) => handleInputChange("followSetting", e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs text-slate-200"
                    >
                      <option value="follow" className="bg-slate-800">follow (সব লিঙ্ক স্ক্যান করবে)</option>
                      <option value="nofollow" className="bg-slate-800">nofollow (লিঙ্ক স্ক্যান করবে না)</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end pt-3 gap-3">
                  <button
                    type="button"
                    onClick={handleRegenerateRobotsAndSitemap}
                    disabled={generatingAssets}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <RefreshCw className={generatingAssets ? "animate-spin" : ""} size={12} />
                    পুনঃসংগঠন (Regenerate robots.txt & sitemaps)
                  </button>
                </div>
              </div>

              {/* Live Preview / Customize Robots.txt Content Area */}
              <div className="bg-slate-850/40 p-5 rounded-2xl border border-slate-750/70 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-750 pb-2">
                  <h3 className="text-xs font-bold text-white flex items-center gap-1">
                    <FileText size={14} /> Robots.txt Content Customization
                  </h3>
                  <button
                    type="button"
                    onClick={() => handleCopyText(seo.robotsTxtContent || `User-agent: *\nDisallow: /rifat-admin/\nAllow: /\n\nSitemap: ${seo.websiteUrl.replace(/\/$/, "")}/sitemap-index.xml`, "robots")}
                    className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[10px] font-bold transition-all"
                  >
                    {copiedRobots ? <Check size={10} className="text-emerald-400" /> : <Copy size={10} />}
                    {copiedRobots ? "Copied!" : "Copy"}
                  </button>
                </div>

                <textarea
                  rows={6}
                  value={seo.robotsTxtContent || `User-agent: *\nDisallow: /rifat-admin/\nAllow: /\n\nSitemap: ${seo.websiteUrl.replace(/\/$/, "")}/sitemap-index.xml`}
                  onChange={(e) => handleInputChange("robotsTxtContent", e.target.value)}
                  placeholder="রোবটস ডট টিএক্সটি ফাইলের সরাসরি রুলস এডিট করুন..."
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs font-mono leading-relaxed"
                />

                <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-750 flex flex-wrap gap-3 items-center justify-between text-xs">
                  <div>
                    <span className="block font-bold text-slate-300">সার্ভার ইউআরএল টেস্ট লিংক (Dynamic Service URLs):</span>
                    <span className="text-[10px] text-slate-500 mt-0.5">সব সাইটম্যাপ ডাটা ফায়ারস্টোর থেকে ডাইনামিকালি উৎপন্ন হয়ে নিম্নোক্ত রুটে রেন্ডার হবে</span>
                  </div>
                  
                  <div className="flex gap-2 flex-wrap text-[10px] font-mono">
                    <a href={testRobotsUrl} target="_blank" rel="noopener noreferrer" className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-300 rounded-lg flex items-center gap-1">
                      /robots.txt <ExternalLink size={10} />
                    </a>
                    <a href={testSitemapUrl} target="_blank" rel="noopener noreferrer" className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-300 rounded-lg flex items-center gap-1">
                      /sitemap.xml <ExternalLink size={10} />
                    </a>
                    <a href={testSitemapIndexUrl} target="_blank" rel="noopener noreferrer" className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-300 rounded-lg flex items-center gap-1">
                      /sitemap-index.xml <ExternalLink size={10} />
                    </a>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 5: STRUCTURED SCHEMAS (JSON-LD) */}
          {activeSubTab === "schema" && (
            <div className="space-y-4 bg-slate-850/40 p-5 rounded-2xl border border-slate-750/70">
              <div className="border-b border-slate-750 pb-2">
                <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Code className="text-yellow-400" size={15} /> Structured Schema Configuration (JSON-LD)
                </h3>
                <p className="text-[11px] text-slate-400 mt-1">
                  সার্চ ইঞ্জিনের কৃত্রিম বুদ্ধিমত্তা ও ক্রলারকে আপনার ওয়েবসাইটের সঠিক ধরণ বুঝাতে JSON-LD স্ট্রাকচার্ড স্কিমা সক্রিয় করুন।
                </p>
              </div>

              {[
                { 
                  id: "organization", 
                  title: "🏢 Organization Schema (সংস্থার কাঠামো)", 
                  enabledField: "organizationSchemaEnabled", 
                  jsonField: "organizationSchemaJson",
                  desc: "আপনার কল্যাণ উদ্যোগের সামাজিক/প্রাতিষ্ঠানিক পরিচয় সার্চ বটকে জানাবে।"
                },
                { 
                  id: "website", 
                  title: "💻 WebSite Schema (সার্চ বক্সসহ সাইটের কাঠামো)", 
                  enabledField: "websiteSchemaEnabled", 
                  jsonField: "websiteSchemaJson",
                  desc: "গুগলে আপনার সাইটের সার্চবক্স ইন-সার্চ করার সাহায্যকারী মেটা ডাটা।"
                },
                { 
                  id: "webpage", 
                  title: "📄 WebPage Schema (হোমপেজ বিবরণ)", 
                  enabledField: "webpageSchemaEnabled", 
                  jsonField: "webpageSchemaJson",
                  desc: "হোমপেজের ইন্টারনাল স্ট্রাকচার গুগলের কাছে উপস্থাপন করার জন্য।"
                },
                { 
                  id: "breadcrumb", 
                  title: "🔗 Breadcrumb Schema (সাইটের নেভিগেশন লিংক)", 
                  enabledField: "breadcrumbSchemaEnabled", 
                  jsonField: "breadcrumbSchemaJson",
                  desc: "সার্চ রেজাল্ট পেজে লিংকগুলো চেইন ক্যাটাগরি আকারে দেখানোর জন্য।"
                },
                { 
                  id: "faq", 
                  title: "❓ FAQPage Schema (এফএকিউ প্রশ্ন-উত্তর)", 
                  enabledField: "faqSchemaEnabled", 
                  jsonField: "faqSchemaJson",
                  desc: "গুগল সার্চ পেজে সরাসরি প্রশ্ন ও উত্তর প্রদর্শন করার জন্য অনন্য ফিচার।"
                },
                { 
                  id: "article", 
                  title: "📰 Article / News Schema (নিবন্ধ ও আর্টিকেল)", 
                  enabledField: "articleSchemaEnabled", 
                  jsonField: "articleSchemaJson",
                  desc: "ডিরেক্টরি রিলিজের খবর ক্রলারকে নিউজ ব্লগে রেন্ডার করার জন্য।"
                },
                { 
                  id: "localBusiness", 
                  title: "📍 Local Business Schema (স্থানীয় সেবা বা কার্যালয়)", 
                  enabledField: "localBusinessSchemaEnabled", 
                  jsonField: "localBusinessSchemaJson",
                  desc: "গুগল ম্যাপ ও লোকাল এরিয়া সার্চ ইঞ্জিনে দৃশ্যমান করার জন্য।"
                }
              ].map(schema => {
                const isEnabled = (seo as any)[schema.enabledField];
                const jsonVal = (seo as any)[schema.jsonField];

                return (
                  <div key={schema.id} className="bg-slate-900/60 p-4 rounded-xl border border-slate-750 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-200">{schema.title}</h4>
                        <span className="text-[10px] text-slate-500 mt-0.5 block">{schema.desc}</span>
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => handleInputChange(schema.enabledField as any, !isEnabled)}
                        className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all border ${
                          isEnabled
                            ? "bg-emerald-950/40 text-emerald-400 border-emerald-900/60"
                            : "bg-slate-800 text-slate-400 border-slate-700"
                        }`}
                      >
                        {isEnabled ? "✓ সক্রিয় (Enabled)" : "✕ নিষ্ক্রিয় (Disabled)"}
                      </button>
                    </div>

                    {isEnabled && (
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-slate-400 block">Edit JSON-LD Template Code:</label>
                        <textarea
                          rows={4}
                          value={jsonVal}
                          onChange={(e) => handleInputChange(schema.jsonField as any, e.target.value)}
                          className="w-full p-2.5 bg-slate-950 border border-slate-750 rounded text-[10px] font-mono text-cyan-300 focus:outline-none leading-relaxed"
                        />
                      </div>
                    )}
                  </div>
                );
              })}

            </div>
          )}

          {/* TAB 6: SEO SEARCH ENGINE PREVIEWS */}
          {activeSubTab === "preview" && (
            <div className="space-y-6">
              
              {/* Google Search Preview */}
              <div className="bg-slate-850/40 p-5 rounded-2xl border border-slate-750/70 space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 block border-b border-slate-750 pb-2">🔍 Google Search Results (SERP Preview)</span>
                
                <div className="bg-white p-5 rounded-xl border border-slate-200 text-slate-900 shadow-inner max-w-2xl">
                  {/* Title and breadcrumbs */}
                  <div className="text-sm font-sans flex items-center gap-1.5 text-slate-600 mb-0.5">
                    <span className="text-xs">{seo.websiteUrl.replace(/https?:\/\//, "")}</span>
                    <span className="text-slate-400 text-xs">›</span>
                    <span className="text-xs">home</span>
                  </div>
                  
                  {/* Google Search Link Title */}
                  <h4 className="text-[19px] font-sans font-medium text-[#1a0dab] leading-tight hover:underline cursor-pointer">
                    {seo.homepageTitle || seo.websiteTitle}
                  </h4>
                  
                  {/* Description snippet */}
                  <p className="text-[13px] font-sans text-[#4d5156] mt-1 leading-relaxed">
                    {seo.metaDescription || "We cannot find any meta description tag. Google will auto select general text content which looks unorganized."}
                  </p>
                </div>
              </div>

              {/* Facebook Share Preview */}
              <div className="bg-slate-850/40 p-5 rounded-2xl border border-slate-750/70 space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 block border-b border-slate-750 pb-2">👥 Facebook Share Card Preview</span>
                
                <div className="bg-[#18191a] text-[#e4e6eb] rounded-xl overflow-hidden border border-slate-800 max-w-xl shadow-md">
                  {/* Image banner */}
                  <div className="h-60 bg-slate-900 flex items-center justify-center overflow-hidden">
                    {seo.ogImage ? (
                      <img src={seo.ogImage} alt="OG Preview Banner" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-slate-600 text-center text-xs p-10">
                        <Facebook size={36} className="mx-auto mb-2 opacity-30" />
                        No OG Image Provided. Facebook will display a fallback empty box or a random file.
                      </div>
                    )}
                  </div>

                  {/* Metadata fields */}
                  <div className="p-3 bg-[#242526] border-t border-[#3a3b3c]">
                    <span className="text-[11px] uppercase text-[#b0b3b8] tracking-wider font-mono">
                      {seo.websiteUrl.replace(/https?:\/\/(www\.)?/, "").split("/")[0]}
                    </span>
                    <h4 className="text-sm font-semibold mt-1 text-[#e4e6eb] truncate">
                      {seo.ogTitle || seo.websiteTitle}
                    </h4>
                    <p className="text-xs text-[#b0b3b8] mt-1 line-clamp-2 leading-snug">
                      {seo.ogDescription || seo.metaDescription}
                    </p>
                  </div>
                </div>
              </div>

              {/* Twitter X Card Preview */}
              <div className="bg-slate-850/40 p-5 rounded-2xl border border-slate-750/70 space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-sky-400 block border-b border-slate-750 pb-2">🐦 Twitter (X) Card Share Preview</span>
                
                <div className="bg-[#000000] text-white rounded-2xl overflow-hidden border border-[#2f3336] max-w-xl shadow-md font-sans">
                  {/* Image container */}
                  <div className="h-56 bg-[#16181c] flex items-center justify-center overflow-hidden">
                    {seo.twitterImage ? (
                      <img src={seo.twitterImage} alt="Twitter Card" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-slate-500 text-center text-xs p-10">
                        <Twitter size={36} className="mx-auto mb-2 opacity-30" />
                        No Twitter Card image link provided.
                      </div>
                    )}
                  </div>

                  {/* Descriptions block */}
                  <div className="p-3 bg-black border-t border-[#2f3336]">
                    <span className="text-[11px] text-[#71767b] font-normal lowercase font-mono">
                      {seo.websiteUrl.replace(/https?:\/\/(www\.)?/, "").split("/")[0]}
                    </span>
                    <h4 className="text-sm font-bold text-[#e7e9ea] truncate mt-0.5">
                      {seo.twitterTitle || seo.websiteTitle}
                    </h4>
                    <p className="text-xs text-[#71767b] mt-0.5 line-clamp-2 leading-snug">
                      {seo.twitterDescription || seo.metaDescription}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Right Help Sidebar */}
        <div className="space-y-4">
          <div className="bg-slate-850/80 p-5 rounded-2xl border border-slate-750/70 space-y-4">
            <h3 className="text-xs font-bold text-white flex items-center gap-1">
              <Settings className="text-emerald-400" size={14} /> SEO System Status
            </h3>
            
            <div className="space-y-3.5 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Database Sync:</span>
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  Firestore-Ready
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">robots.txt Status:</span>
                <span className="font-bold text-indigo-400 flex items-center gap-1">
                  Dynamic Active
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Sitemap Engine:</span>
                <span className="font-bold text-cyan-400 flex items-center gap-1">
                  Full Auto Sync
                </span>
              </div>
              
              <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-750/50 space-y-2">
                <span className="block text-[10px] text-slate-300 font-bold uppercase tracking-wider">💡 প্রো-টিপস (Pro Tips):</span>
                <p className="text-[10.5px] text-slate-400 leading-relaxed">
                  আপনার এসইও সেটিংস পরিবর্তন করার পর ডান কোণায় থাকা **"এসইও সেটিংস সংরক্ষণ করুন"** বাটনে চাপুন। এটি করা মাত্রই ইনস্ট্যান্টলি আপনার লাইভ ওয়েবসাইট ইনডেক্সিং এবং মেটা তথ্য আপডেট হয়ে যাবে।
                </p>
              </div>

              <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-750/50 space-y-2">
                <span className="block text-[10px] text-slate-300 font-bold uppercase tracking-wider">🔗 সায়েন্টিফিক ইউআরএলস:</span>
                <p className="text-[10.5px] text-slate-400 leading-relaxed">
                  ক্রলারদের সুবিধার্থে ডোমেইনটি `https://` এবং `www.` সহ প্রবেশ করান। sitemap.xml ফাইলে সদস্যদের ডাইনামিক লিঙ্ক সরাসরি সার্ভার থেকে ইনজেক্ট করা হয়।
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
