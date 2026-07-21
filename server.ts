import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import { BANGLADESH_LOCATIONS_DATABASE } from "./src/locationData";
import { ORGANIZATIONAL_POSITIONS } from "./src/types";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, collection, getDocs, deleteDoc, writeBatch } from "firebase/firestore";

export const app = express();

const adminConfigPath = path.join(process.cwd(), "admin-config.json");

// Firebase/Firestore setup
let db: any = null;
let firebaseInitialized = false;

async function initFirebase() {
  try {
    const firebaseConfigPath = path.join(process.cwd(), "firebase-applet-config.json");
    if (fs.existsSync(firebaseConfigPath)) {
      const configRaw = fs.readFileSync(firebaseConfigPath, "utf-8");
      const config = JSON.parse(configRaw);
      
      const firebaseConfig = {
        apiKey: config.apiKey,
        authDomain: config.authDomain,
        projectId: config.projectId,
        storageBucket: config.storageBucket,
        messagingSenderId: config.messagingSenderId,
        appId: config.appId
      };
      
      const firebaseApp = initializeApp(firebaseConfig);
      if (config.firestoreDatabaseId) {
        db = getFirestore(firebaseApp, config.firestoreDatabaseId);
      } else {
        db = getFirestore(firebaseApp);
      }
      firebaseInitialized = true;
      console.log("[Firebase] Successfully initialized with Database ID:", config.firestoreDatabaseId || "default");
    } else {
      console.log("[Firebase] Configuration file not found, running in local-only mode.");
    }
  } catch (error) {
    console.error("[Firebase] Initialization error:", error);
  }
}

// Pull settings from Firestore
async function syncSettingsFromFirestore() {
  if (!firebaseInitialized || !db) return;
  try {
    const settingsDocRef = doc(db, "config", "settings");
    const docSnap = await getDoc(settingsDocRef);
    if (docSnap.exists()) {
      const settingsData = docSnap.data() as any;
      fs.writeFileSync(settingsPath, JSON.stringify(settingsData, null, 2), "utf-8");
      console.log("[Firebase] Settings successfully loaded from Firestore.");
    } else {
      const localSettings = readSettings();
      await setDoc(settingsDocRef, localSettings);
      console.log("[Firebase] Seeded settings to Firestore.");
    }
  } catch (err) {
    console.error("[Firebase] Error syncing settings from Firestore:", err);
  }
}

// Push settings to Firestore
async function syncSettingsToFirestore(settings: any) {
  if (!firebaseInitialized || !db) return;
  try {
    const settingsDocRef = doc(db, "config", "settings");
    await setDoc(settingsDocRef, settings);
    console.log("[Firebase] Settings synced to Firestore.");
  } catch (err) {
    console.error("[Firebase] Error syncing settings to Firestore:", err);
  }
}

// Pull adminConfig from Firestore
async function syncAdminConfigFromFirestore() {
  if (!firebaseInitialized || !db) return;
  try {
    const adminDocRef = doc(db, "config", "admin-config");
    const docSnap = await getDoc(adminDocRef);
    if (docSnap.exists()) {
      const adminData = docSnap.data() as any;
      fs.writeFileSync(adminConfigPath, JSON.stringify(adminData, null, 2), "utf-8");
      console.log("[Firebase] Admin Config successfully loaded from Firestore.");
    } else {
      const localAdmin = readAdminConfig();
      await setDoc(adminDocRef, localAdmin);
      console.log("[Firebase] Seeded Admin Config to Firestore.");
    }
  } catch (err) {
    console.error("[Firebase] Error syncing Admin Config from Firestore:", err);
  }
}

// Push adminConfig to Firestore
async function syncAdminConfigToFirestore(config: any) {
  if (!firebaseInitialized || !db) return;
  try {
    const adminDocRef = doc(db, "config", "admin-config");
    await setDoc(adminDocRef, config);
    console.log("[Firebase] Admin Config synced to Firestore.");
  } catch (err) {
    console.error("[Firebase] Error syncing Admin Config to Firestore:", err);
  }
}

// Pull profiles from Firestore
async function syncProfilesFromFirestore() {
  if (!firebaseInitialized || !db) return;
  try {
    const querySnapshot = await getDocs(collection(db, "profiles"));
    const profiles: any[] = [];
    querySnapshot.forEach((doc) => {
      profiles.push(doc.data());
    });
    
    if (profiles.length > 0) {
      fs.writeFileSync(dbPath, JSON.stringify(profiles, null, 2), "utf-8");
      console.log(`[Firebase] Loaded ${profiles.length} profiles from Firestore.`);
    } else {
      const localProfiles = readDB();
      if (localProfiles.length > 0) {
        console.log(`[Firebase] Seeding ${localProfiles.length} profiles to Firestore...`);
        const batchSize = 400;
        for (let i = 0; i < localProfiles.length; i += batchSize) {
          const chunk = localProfiles.slice(i, i + batchSize);
          const batch = writeBatch(db);
          chunk.forEach((profile) => {
            const docRef = doc(db, "profiles", profile.id);
            batch.set(docRef, profile);
          });
          await batch.commit();
        }
        console.log("[Firebase] Finished seeding profiles.");
      }
    }
  } catch (err) {
    console.error("[Firebase] Error syncing profiles from Firestore:", err);
  }
}

// Sync bulk upload of profiles to Firestore
async function syncBulkProfilesToFirestore(profiles: any[]) {
  if (!firebaseInitialized || !db) return;
  try {
    console.log(`[Firebase] Syncing bulk profiles upload (${profiles.length})...`);
    
    // Write the current list in batches
    const batchSize = 400;
    for (let i = 0; i < profiles.length; i += batchSize) {
      const chunk = profiles.slice(i, i + batchSize);
      const batch = writeBatch(db);
      chunk.forEach((profile) => {
        const docRef = doc(db, "profiles", profile.id);
        batch.set(docRef, profile);
      });
      await batch.commit();
    }
    
    // Now delete profiles from Firestore that are no longer in our list
    const querySnapshot = await getDocs(collection(db, "profiles"));
    const currentIds = new Set(profiles.map(p => p.id));
    const deleteBatch = writeBatch(db);
    let deleteCount = 0;
    querySnapshot.forEach((doc) => {
      if (!currentIds.has(doc.id)) {
        deleteBatch.delete(doc.ref);
        deleteCount++;
      }
    });
    if (deleteCount > 0) {
      await deleteBatch.commit();
      console.log(`[Firebase] Cleaned up ${deleteCount} orphaned profiles in Firestore.`);
    }
    console.log("[Firebase] Bulk profiles successfully synchronized.");
  } catch (err) {
    console.error("[Firebase] Error in bulk profiles sync:", err);
  }
}


interface AdminUser {
  id: string;
  fullName: string;
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
  status: 'pending' | 'approved' | 'rejected';
  role: 'superadmin' | 'admin';
}

interface AdminConfig {
  username?: string;
  password?: string;
  email?: string;
  phoneNumber?: string;
  admins: AdminUser[];
}

const DEFAULT_ADMIN_CONFIG: AdminConfig = {
  admins: [
    {
      id: "superadmin-id",
      fullName: "প্রধান এডমিন",
      username: "rifatbhuiyanadmin",
      password: "199102",
      email: "mdrifatbhuiyan27@gmail.com",
      phoneNumber: "01712345678",
      status: "approved",
      role: "superadmin"
    }
  ]
};

function readAdminConfig(): AdminConfig {
  try {
    if (!fs.existsSync(adminConfigPath)) {
      fs.writeFileSync(adminConfigPath, JSON.stringify(DEFAULT_ADMIN_CONFIG, null, 2), "utf-8");
      return DEFAULT_ADMIN_CONFIG;
    }
    const data = fs.readFileSync(adminConfigPath, "utf-8");
    let parsed = JSON.parse(data);

    // Migration from old single-object format to multi-admin format
    if (!parsed.admins) {
      const legacyUsername = parsed.username || "rifatbhuiyanadmin";
      const legacyPassword = parsed.password || "199102";
      const legacyEmail = parsed.email || "mdrifatbhuiyan27@gmail.com";
      const legacyPhone = parsed.phoneNumber || "01712345678";

      parsed = {
        admins: [
          {
            id: "superadmin-id",
            fullName: "প্রধান এডমিন",
            username: legacyUsername,
            password: legacyPassword,
            email: legacyEmail,
            phoneNumber: legacyPhone,
            status: "approved",
            role: "superadmin"
          }
        ]
      };
      fs.writeFileSync(adminConfigPath, JSON.stringify(parsed, null, 2), "utf-8");
    }

    // Ensure superadmin has correct email if empty
    const superadmin = parsed.admins.find((a: any) => a.role === 'superadmin');
    if (superadmin && !superadmin.email) {
      superadmin.email = "mdrifatbhuiyan27@gmail.com";
    }

    return parsed;
  } catch (err) {
    console.error("Error reading admin config, falling back:", err);
    return DEFAULT_ADMIN_CONFIG;
  }
}

function writeAdminConfig(config: AdminConfig) {
  try {
    fs.writeFileSync(adminConfigPath, JSON.stringify(config, null, 2), "utf-8");
    if (firebaseInitialized && db) {
      syncAdminConfigToFirestore(config).catch(err => {
        console.error("[Firebase] Background sync error for Admin Config:", err);
      });
    }
  } catch (err) {
    console.error("Error writing admin config:", err);
  }
}

async function sendOtpSms(phoneNumber: string, otpCode: string, purpose: string) {
  // Always log the OTP to the server console in a prominent visual block
  console.log(`
┌────────────────────────────────────────────────────────┐
│               ACTIVE SECURITY SMS OTP                  │
├────────────────────────────────────────────────────────┤
│ Phone:   ${phoneNumber}
│ Purpose: ${purpose}
│ OTP:     ${otpCode}
│ Expires: 10 minutes
└────────────────────────────────────────────────────────┘
`);

  const apiKey = process.env.SMS_API_KEY || "";
  const senderId = process.env.SMS_SENDER_ID || "";
  
  if (!apiKey) {
    console.log(`[SMS SIMULATION] SMS API Key not configured. Simulated SMS delivery to ${phoneNumber}.`);
    return false;
  }
  
  try {
    // Bangladesh Greenweb SMS API Integration
    // Formulate phone number for Bangladesh: ensure 88 prefix if it's 11 digits starting with 0
    let formattedPhone = phoneNumber.trim().replace(/\D/g, "");
    if (formattedPhone.length === 11 && formattedPhone.startsWith("0")) {
      formattedPhone = "88" + formattedPhone;
    }

    const message = `আসসালামু আলাইকুম। আপনার ${purpose}-এর ওটিপি কোড: ${otpCode}. এটি ১০ মিনিট কার্যকর থাকবে।`;
    const url = `https://api.greenweb.com.bd/api.php?json&token=${encodeURIComponent(apiKey)}&to=${encodeURIComponent(formattedPhone)}&message=${encodeURIComponent(message)}`;
    
    const response = await fetch(url);
    const data = await response.json();
    console.log(`[SMS SENDER] Greenweb API Response:`, data);
    return true;
  } catch (err) {
    console.error("Error sending real SMS through Greenweb:", err);
    return false;
  }
}

interface OtpState {
  code: string;
  expiresAt: number;
  type: 'login' | 'reset';
}

const activeOtps = new Map<string, OtpState>();

interface AdminSession {
  adminId: string;
  lastActive: number;
}

const activeSessions = new Map<string, AdminSession>();

interface LoginAttempt {
  count: number;
  lockUntil: number;
}

const loginAttempts = new Map<string, LoginAttempt>();

function checkBruteForce(identifier: string): { allowed: boolean; remainingMs: number } {
  const attempt = loginAttempts.get(identifier);
  if (!attempt) return { allowed: true, remainingMs: 0 };
  if (attempt.lockUntil > Date.now()) {
    return { allowed: false, remainingMs: attempt.lockUntil - Date.now() };
  }
  return { allowed: true, remainingMs: 0 };
}

function registerFailedAttempt(identifier: string) {
  const attempt = loginAttempts.get(identifier) || { count: 0, lockUntil: 0 };
  attempt.count += 1;
  if (attempt.count >= 5) {
    attempt.lockUntil = Date.now() + 15 * 60 * 1000; // 15 mins lock
  }
  loginAttempts.set(identifier, attempt);
}

function clearFailedAttempts(identifier: string) {
  loginAttempts.delete(identifier);
}

function validateAdminSession(req: any): boolean {
  const authHeader = req.headers.authorization;
  if (!authHeader) return false;

  const parts = authHeader.trim().split(/\s+/);
  let token = "";
  if (parts.length > 1) {
    token = parts[1];
  } else {
    token = parts[0];
  }

  if (!token || !token.startsWith("admin-session-token-")) {
    return false;
  }

  const session = activeSessions.get(token);
  if (!session) {
    return false;
  }

  const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes inactivity timeout
  if (Date.now() - session.lastActive > INACTIVITY_TIMEOUT) {
    activeSessions.delete(token);
    return false;
  }

  session.lastActive = Date.now();
  return true;
}

async function sendOtpEmail(toEmail: string, otpCode: string, purpose: string) {
  // Always log the OTP to the server console in a prominent visual block
  console.log(`
┌────────────────────────────────────────────────────────┐
│              ACTIVE SECURITY EMAIL OTP                 │
├────────────────────────────────────────────────────────┤
│ Email:   ${toEmail}
│ Purpose: ${purpose}
│ OTP:     ${otpCode}
│ Expires: 10 minutes
└────────────────────────────────────────────────────────┘
`);

  const host = process.env.SMTP_HOST || "";
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USER || "";
  const pass = process.env.SMTP_PASS || "";

  if (!user || !pass) {
    console.warn("SMTP credentials are not configured in .env. SMTP simulation printed above.");
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });

    const mailOptions = {
      from: `"দপ্তরী কণ্ঠ কল্যাণ ডিরেক্টরি" <${user}>`,
      to: toEmail,
      subject: `আপনার ভেরিফিকেশন কোড (OTP) - দপ্তরী কণ্ঠ`,
      text: `আসসালামু আলাইকুম।\n\nআপনার ${purpose}-এর জন্য ভেরিফিকেশন কোডটি নিচে দেওয়া হলো:\n\nOTP কোড: ${otpCode}\n\nএটি ১০ মিনিটের মধ্যে ব্যবহার করুন। এটি কাউকে শেয়ার করবেন না।`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #f8fafc;">
          <h2 style="color: #046c4e; text-align: center; border-bottom: 2px solid #046c4e; padding-bottom: 10px;">দপ্তরী কণ্ঠ কল্যাণ ডিরেক্টরি</h2>
          <p style="font-size: 16px; color: #334155;">আসসালামু আলাইকুম,</p>
          <p style="font-size: 15px; color: #475569;">আপনার <strong>${purpose}</strong> সফল করতে ভেরিফিকেশন কোড (OTP) পাঠানো হয়েছে:</p>
          <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #cbd5e1; text-align: center; margin: 20px 0;">
            <span style="font-size: 32px; font-weight: bold; color: #1e293b; letter-spacing: 5px;">${otpCode}</span>
          </div>
          <p style="font-size: 13px; color: #64748b; text-align: center;">এই কোডটি আগামী ১০ মিনিটের জন্য প্রযোজ্য থাকবে। কোনো অবস্থাতেই এই কোডটি অন্য কারো সাথে শেয়ার করবেন না।</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="font-size: 12px; color: #94a3b8; text-align: center;">এটি একটি সিস্টেম জেনারেটেড ইমেল। দয়া করে উত্তর দেবেন না।</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}

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
  locations: any[];
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
  seo?: any;
}

const settingsPath = path.join(process.cwd(), "settings-db.json");

const DEFAULT_SETTINGS: SettingsData = {
  fieldsConfig: {
    district: { enabled: true },
    upazila: { enabled: true },
    unionName: { enabled: true },
    schoolName: { enabled: true },
    position: { enabled: true }
  },
  positions: ORGANIZATIONAL_POSITIONS,
  locations: BANGLADESH_LOCATIONS_DATABASE,
  customization: {
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
      description: { text: "সর্বস্বত্ব সংরক্ষিত। এটি প্রাথমিক বিদ্যালয়ের কর্মচারীদের একটি স্বেচ্ছাসেবী ডিজিটাল কল্যাণ উদ্যোগ।", enabled: true },
      socialLinks: [
        { id: "fb", platform: "Facebook", url: "https://facebook.com", enabled: true },
        { id: "wa", platform: "WhatsApp", url: "https://wa.me/880", enabled: true },
        { id: "tg", platform: "Telegram", url: "https://t.me/", enabled: true },
        { id: "li", platform: "LinkedIn", url: "https://linkedin.com", enabled: true },
        { id: "ig", platform: "Instagram", url: "https://instagram.com", enabled: true }
      ]
    }
  }
};

function readSettings(): SettingsData {
  try {
    if (!fs.existsSync(settingsPath)) {
      fs.writeFileSync(settingsPath, JSON.stringify(DEFAULT_SETTINGS, null, 2), "utf-8");
      return DEFAULT_SETTINGS;
    }
    const data = fs.readFileSync(settingsPath, "utf-8");
    const settings = JSON.parse(data);
    let modified = false;
    if (!settings.locations || settings.locations.length === 0) {
      settings.locations = BANGLADESH_LOCATIONS_DATABASE;
      modified = true;
    }
    if (!settings.customization) {
      settings.customization = DEFAULT_SETTINGS.customization;
      modified = true;
    } else {
      if (!settings.customization.homepage) {
        settings.customization.homepage = DEFAULT_SETTINGS.customization!.homepage;
        modified = true;
      } else {
        if (!settings.customization.homepage.adminSignUpEnabled) {
          settings.customization.homepage.adminSignUpEnabled = { text: "এডমিন সাইন-আপ অপশন", enabled: true };
          modified = true;
        }
        if (!settings.customization.homepage.ourPages) {
          settings.customization.homepage.ourPages = [];
          modified = true;
        }
      }
      if (!settings.customization.footer) {
        settings.customization.footer = DEFAULT_SETTINGS.customization!.footer;
        modified = true;
      } else if (!settings.customization.footer.socialLinks) {
        settings.customization.footer.socialLinks = [
          { id: "fb", platform: "Facebook", url: "https://facebook.com", enabled: true },
          { id: "wa", platform: "WhatsApp", url: "https://wa.me/880", enabled: true },
          { id: "tg", platform: "Telegram", url: "https://t.me/", enabled: true },
          { id: "li", platform: "LinkedIn", url: "https://linkedin.com", enabled: true },
          { id: "ig", platform: "Instagram", url: "https://instagram.com", enabled: true }
        ];
        modified = true;
      }
    }
    if (modified) {
      fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2), "utf-8");
    }
    return settings;
  } catch (err) {
    console.error("Error reading settings, falling back to default:", err);
    return DEFAULT_SETTINGS;
  }
}

async function writeSettings(settings: SettingsData) {
  try {
    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2), "utf-8");
    if (firebaseInitialized && db) {
      await syncSettingsToFirestore(settings);
    }
  } catch (err) {
    console.error("Error writing settings:", err);
    throw err;
  }
}

// --- SOHOKARI AI routing configuration ---
const aiSettingsPath = path.join(process.cwd(), "ai-settings.json");

interface AiRoutingItem {
  id: string;
  provider: 'nvidia' | 'openrouter';
  model: string;
  apiKey: string;
  enabled: boolean;
}

interface AiSettingsData {
  configs: AiRoutingItem[];
}

function readAiSettings(): AiSettingsData {
  try {
    if (!fs.existsSync(aiSettingsPath)) {
      const defaultValue = { configs: [] };
      fs.writeFileSync(aiSettingsPath, JSON.stringify(defaultValue, null, 2), "utf-8");
      return defaultValue;
    }
    const data = fs.readFileSync(aiSettingsPath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading AI settings file:", err);
    return { configs: [] };
  }
}

async function writeAiSettings(settings: AiSettingsData) {
  try {
    fs.writeFileSync(aiSettingsPath, JSON.stringify(settings, null, 2), "utf-8");
    if (firebaseInitialized && db) {
      await syncAiSettingsToFirestore(settings);
    }
  } catch (err) {
    console.error("Error writing AI settings:", err);
  }
}

// Pull AI settings from Firestore
async function syncAiSettingsFromFirestore() {
  if (!firebaseInitialized || !db) return;
  try {
    const aiDocRef = doc(db, "config", "ai_settings");
    const docSnap = await getDoc(aiDocRef);
    if (docSnap.exists()) {
      const aiData = docSnap.data() as any;
      fs.writeFileSync(aiSettingsPath, JSON.stringify(aiData, null, 2), "utf-8");
      console.log("[Firebase] AI Settings successfully loaded from Firestore.");
    } else {
      const localAi = readAiSettings();
      await setDoc(aiDocRef, localAi);
      console.log("[Firebase] Seeded AI settings to Firestore.");
    }
  } catch (err) {
    console.error("[Firebase] Error syncing AI Settings from Firestore:", err);
  }
}

// Push AI settings to Firestore
async function syncAiSettingsToFirestore(settings: any) {
  if (!firebaseInitialized || !db) return;
  try {
    const aiDocRef = doc(db, "config", "ai_settings");
    await setDoc(aiDocRef, settings);
    console.log("[Firebase] AI Settings synced to Firestore.");
  } catch (err) {
    console.error("[Firebase] Error syncing AI Settings to Firestore:", err);
  }
}

async function saveChatSessionToFirestore(sessionId: string, userName: string, messages: any[]) {
  if (!firebaseInitialized || !db) return;
  try {
    const chatDocRef = doc(db, "chats", sessionId);
    await setDoc(chatDocRef, {
      id: sessionId,
      userId: sessionId,
      userName: userName || "অজ্ঞাত ব্যবহারকারী",
      lastMessageAt: new Date().toISOString(),
      messages: messages.map(m => ({
        role: m.role,
        content: typeof m.content === 'string' ? m.content : "[মাল্টিমিডিয়া কন্টেন্ট]",
        timestamp: m.timestamp || new Date().toISOString()
      })),
      createdAt: new Date().toISOString()
    }, { merge: true });
    console.log(`[Firebase] Chat session ${sessionId} synced successfully.`);
  } catch (err) {
    console.error("[Firebase] Error saving chat session:", err);
  }
}
// --- LIVE MESSAGES SYSTEM ---
const liveMessagesPath = path.join(process.cwd(), "live-messages-db.json");

interface LiveMessage {
  id: string;
  chatId: string;
  senderId: string; // 'admin' or user session ID
  senderName: string;
  content: string;
  timestamp: string;
  isEdited?: boolean;
  isDeleted?: boolean;
}

// Read live messages with automatic 3 days retention cleanup
function readLiveMessages(): LiveMessage[] {
  try {
    let messages: LiveMessage[] = [];
    if (fs.existsSync(liveMessagesPath)) {
      const raw = fs.readFileSync(liveMessagesPath, "utf-8");
      messages = JSON.parse(raw);
    }
    
    // Retention period: 3 days
    const threeDaysMs = 3 * 24 * 60 * 60 * 1000;
    const cutoff = Date.now() - threeDaysMs;
    
    const activeMessages = messages.filter(m => new Date(m.timestamp).getTime() > cutoff);
    
    if (activeMessages.length !== messages.length) {
      fs.writeFileSync(liveMessagesPath, JSON.stringify(activeMessages, null, 2), "utf-8");
      console.log(`[Live Messages] Purged ${messages.length - activeMessages.length} expired messages older than 3 days.`);
    }
    
    return activeMessages;
  } catch (err) {
    console.error("Error reading live messages:", err);
    return [];
  }
}

// Write live messages to local db and Firestore
async function writeLiveMessages(messages: LiveMessage[]) {
  try {
    fs.writeFileSync(liveMessagesPath, JSON.stringify(messages, null, 2), "utf-8");
    if (firebaseInitialized && db) {
      console.log(`[Firebase] Syncing ${messages.length} live messages in background...`);
      const batchSize = 100;
      for (let i = 0; i < messages.length; i += batchSize) {
        const chunk = messages.slice(i, i + batchSize);
        const batch = writeBatch(db);
        chunk.forEach((msg) => {
          const docRef = doc(db, "live_messages", msg.id);
          batch.set(docRef, msg);
        });
        await batch.commit();
      }
      
      // Delete old ones from Firestore
      const querySnapshot = await getDocs(collection(db, "live_messages"));
      const currentIds = new Set(messages.map(m => m.id));
      const deleteBatch = writeBatch(db);
      let deleteCount = 0;
      querySnapshot.forEach((doc) => {
        if (!currentIds.has(doc.id)) {
          deleteBatch.delete(doc.ref);
          deleteCount++;
        }
      });
      if (deleteCount > 0) {
        await deleteBatch.commit();
      }
    }
  } catch (err) {
    console.error("Error writing live messages:", err);
  }
}

// Pull live messages from Firestore on startup
async function syncLiveMessagesFromFirestore() {
  if (!firebaseInitialized || !db) return;
  try {
    const querySnapshot = await getDocs(collection(db, "live_messages"));
    const messages: any[] = [];
    querySnapshot.forEach((doc) => {
      messages.push(doc.data());
    });
    if (messages.length > 0) {
      fs.writeFileSync(liveMessagesPath, JSON.stringify(messages, null, 2), "utf-8");
      console.log(`[Firebase] Loaded ${messages.length} live messages from Firestore.`);
    }
  } catch (err) {
    console.error("[Firebase] Error syncing live messages from Firestore:", err);
  }
}

// --- TEMPORARY CHATS SYSTEM (24-hour cleanup) ---
const tempChatsDbPath = path.join(process.cwd(), "temporary-chats-db.json");

interface TempChatMessage {
  id: string;
  senderPhone: string;
  senderName: string;
  receiverPhone: string;
  receiverName: string;
  content: string;
  timestamp: string;
}

// Read temporary chats with automatic 24 hours retention cleanup
function readTempChats(): TempChatMessage[] {
  try {
    let messages: TempChatMessage[] = [];
    if (fs.existsSync(tempChatsDbPath)) {
      const raw = fs.readFileSync(tempChatsDbPath, "utf-8");
      messages = JSON.parse(raw);
    }
    
    // Retention period: 24 hours (1 day)
    const twentyFourHoursMs = 24 * 60 * 60 * 1000;
    const cutoff = Date.now() - twentyFourHoursMs;
    
    const activeMessages = messages.filter(m => new Date(m.timestamp).getTime() > cutoff);
    
    if (activeMessages.length !== messages.length) {
      fs.writeFileSync(tempChatsDbPath, JSON.stringify(activeMessages, null, 2), "utf-8");
      console.log(`[Temp Chats] Purged ${messages.length - activeMessages.length} expired messages older than 24 hours.`);
    }
    
    return activeMessages;
  } catch (err) {
    console.error("Error reading temporary chats:", err);
    return [];
  }
}

// Write temporary chats to local db and Firestore
async function writeTempChats(messages: TempChatMessage[]) {
  try {
    fs.writeFileSync(tempChatsDbPath, JSON.stringify(messages, null, 2), "utf-8");
    if (firebaseInitialized && db) {
      console.log(`[Firebase] Syncing ${messages.length} temporary chats in background...`);
      const batchSize = 100;
      for (let i = 0; i < messages.length; i += batchSize) {
        const chunk = messages.slice(i, i + batchSize);
        const batch = writeBatch(db);
        chunk.forEach((msg) => {
          const docRef = doc(db, "temporary_chats", msg.id);
          batch.set(docRef, msg);
        });
        await batch.commit();
      }
      
      // Delete old ones from Firestore
      const querySnapshot = await getDocs(collection(db, "temporary_chats"));
      const currentIds = new Set(messages.map(m => m.id));
      const deleteBatch = writeBatch(db);
      let deleteCount = 0;
      querySnapshot.forEach((doc) => {
        if (!currentIds.has(doc.id)) {
          deleteBatch.delete(doc.ref);
          deleteCount++;
        }
      });
      if (deleteCount > 0) {
        await deleteBatch.commit();
      }
    }
  } catch (err) {
    console.error("Error writing temporary chats:", err);
  }
}

// Pull temporary chats from Firestore on startup
async function syncTempChatsFromFirestore() {
  if (!firebaseInitialized || !db) return;
  try {
    const querySnapshot = await getDocs(collection(db, "temporary_chats"));
    const messages: TempChatMessage[] = [];
    querySnapshot.forEach((doc) => {
      messages.push(doc.data() as TempChatMessage);
    });
    if (messages.length > 0) {
      fs.writeFileSync(tempChatsDbPath, JSON.stringify(messages, null, 2), "utf-8");
      console.log(`[Firebase] Loaded ${messages.length} temporary chats from Firestore.`);
    }
  } catch (err) {
    console.error("[Firebase] Error syncing temporary chats from Firestore:", err);
  }
}

// -----------------------------------------

interface Profile {
  id: string;
  fullName: string;
  username?: string;
  phoneNumber: string;
  facebookUrl: string;
  position: string;
  district: string;
  upazila: string;
  unionName?: string;
  schoolName: string;
  aboutMe: string;
  fatherName?: string;
  motherName?: string;
  email?: string;
  address?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  photo?: string;
}

const PORT = 3000;
const dbPath = path.join(process.cwd(), "profiles-db.json");

// Core Seed Profiles
const SEED_PROFILES: Profile[] = [
  {
    id: "1",
    fullName: "মোঃ রনি আহম্মেদ",
    phoneNumber: "01712345678",
    facebookUrl: "https://facebook.com/md.roni.ahmed",
    position: "সাধারণ সম্পাদক",
    district: "নারায়ণগঞ্জ",
    upazila: "রূপগঞ্জ",
    schoolName: "কালিয়াচর সরকারি প্রাথমিক বিদ্যালয়",
    aboutMe: "আমি কালিয়াচর সরকারি প্রাথমিক বিদ্যালয়ে কর্মরত আছি। দপ্তরী কাম নৈশপ্রহরী কল্যাণ সমিতির কল্যাণার্থে কাজ করে যাচ্ছি।",
    status: "approved",
    createdAt: new Date().toISOString()
  },
  {
    id: "2",
    fullName: "সাজ্জাদ হোসেন",
    phoneNumber: "01823456789",
    facebookUrl: "https://facebook.com/sajjad.hossain",
    position: "যুগ্ম সম্পাদক",
    district: "গাজীপুর",
    upazila: "কালিয়াকৈর",
    schoolName: "বেলতৈল সরকারি প্রাথমিক বিদ্যালয়",
    aboutMe: "দপ্তরী ও কর্মচারী ভাইদের একতা বজায় রাখাই আমাদের মূল লক্ষ্য।",
    status: "approved",
    createdAt: new Date().toISOString()
  },
  {
    id: "3",
    fullName: "মোঃ আলতাফ হোসেন",
    phoneNumber: "01934567890",
    facebookUrl: "",
    position: "সভাপতি",
    district: "ঢাকা",
    upazila: "সাভার",
    schoolName: "সাভার মডেল সরকারি প্রাথমিক বিদ্যালয়",
    aboutMe: "আসুন আমরা সবাই মিলে কল্যাণ সমিতি এগিয়ে নিয়ে যাই।",
    status: "approved",
    createdAt: new Date().toISOString()
  },
  {
    id: "4",
    fullName: "মোঃ আনোয়ার হোসেন",
    phoneNumber: "01734567812",
    facebookUrl: "https://facebook.com/anowar.hossain",
    position: "সহ-সভাপতি",
    district: "কুমিল্লা",
    upazila: "চান্দিনা",
    schoolName: "চান্দিনা আল আমিন মডেল সপ্রাবি",
    aboutMe: "প্রাথমিক বিদ্যালয়ের সকল কর্মচারী ঐক্যবদ্ধ হয়ে অধিকার আদায়ে সচেষ্ট হবো।",
    status: "approved",
    createdAt: new Date().toISOString()
  },
  {
    id: "5",
    fullName: "মোঃ কামরুল হাসান",
    phoneNumber: "01645678901",
    facebookUrl: "https://facebook.com/kamrul.hasan",
    position: "সাংগঠনিক সম্পাদক",
    district: "নারায়ণগঞ্জ",
    upazila: "সোনারগাঁও",
    schoolName: "সোনারগাঁও সরকারি প্রাথমিক বিদ্যালয়",
    aboutMe: "সাংগঠনিক কার্যক্রমকে আরও গতিশীল করার লক্ষ্যে কাজ করছি।",
    status: "approved",
    createdAt: new Date().toISOString()
  },
  {
    id: "6",
    fullName: "মোসাঃ আক্তার বানু",
    phoneNumber: "01556789012",
    facebookUrl: "",
    position: "কোষাধ্যক্ষ",
    district: "ঢাকা",
    upazila: "ধামরাই",
    schoolName: "ধামরাই বালিকা সপ্রাবি",
    aboutMe: "কমিটির হিসাব-নিকাশ অত্যন্ত স্বচ্ছতার সাথে পরিচালনা করাই আমার দায়িত্ব।",
    status: "approved",
    createdAt: new Date().toISOString()
  },
  {
    id: "7",
    fullName: "মোঃ আবু বকর সিদ্দিক",
    phoneNumber: "01367890123",
    facebookUrl: "https://facebook.com/abu.bakkar",
    position: "সদস্য",
    district: "গাজীপুর",
    upazila: "শ্রীপুর",
    schoolName: "শ্রীপুর রেলওয়ে সপ্রাবি",
    aboutMe: "আমরা সেবা ও কল্যাণের ব্রত নিয়ে একসাথে এগিয়ে চলছি।",
    status: "approved",
    createdAt: new Date().toISOString()
  },
  {
    id: "8",
    fullName: "মোঃ ইব্রাহিম খলিল",
    phoneNumber: "01478901234",
    facebookUrl: "https://facebook.com/ibrahim.khalil",
    position: "সদস্য",
    district: "কুমিল্লা",
    upazila: "লাকসাম",
    schoolName: "লাকসাম মডেল সপ্রাবি",
    aboutMe: "সকল দপ্তরী ও নৈশপ্রহরীদের সহযোগিতা করতে আমি সদা প্রস্তুত।",
    status: "approved",
    createdAt: new Date().toISOString()
  },
  {
    id: "9",
    fullName: "মোসাঃ বিলকিস বেগম",
    phoneNumber: "01755554444",
    facebookUrl: "",
    position: "সদস্য",
    district: "সিলেট",
    upazila: "বিয়ানীবাজার",
    schoolName: "বিয়ানীবাজার বালিকা সপ্রাবি",
    aboutMe: "কল্যাণ তহবিল গঠনে ও মানুষের বিপদে আপদে পাশে দাঁড়ানোই আমাদের লক্ষ্য।",
    status: "approved",
    createdAt: new Date().toISOString()
  },
  {
    id: "10",
    fullName: "মোঃ আশরাফুল আলম",
    phoneNumber: "01866663333",
    facebookUrl: "https://facebook.com/ashraful.alam",
    position: "দপ্তর সম্পাদক",
    district: "ময়মনসিংহ",
    upazila: "ত্রিশাল",
    schoolName: "ত্রিশাল মডেল সরকারি প্রাথমিক বিদ্যালয়",
    aboutMe: "দপ্তরের সকল তথ্য সংরক্ষণ ও নথিপত্র সংরক্ষণের দায়িত্বে আছি।",
    status: "approved",
    createdAt: new Date().toISOString()
  },
  {
    id: "11",
    fullName: "মোঃ হাসিবুল ইসলাম",
    phoneNumber: "01977778888",
    facebookUrl: "https://facebook.com/hasibul.islam",
    position: "প্রচার সম্পাদক",
    district: "চট্টগ্রাম",
    upazila: "পটিয়া",
    schoolName: "পটিয়া আদর্শ সপ্রাবি",
    aboutMe: "আমাদের কার্যক্রম সবার কাছে সঠিকভাবে তুলে ধরাই প্রচার সম্পাদকের কাজ।",
    status: "approved",
    createdAt: new Date().toISOString()
  },
  {
    id: "12",
    fullName: "মোসাঃ সুমি আক্তার",
    phoneNumber: "01788889999",
    facebookUrl: "",
    position: "সাধারণ সদস্য",
    district: "বরিশাল",
    upazila: "বাকেরগঞ্জ",
    schoolName: "বাকেরগঞ্জ সপ্রাবি",
    aboutMe: "আমি একজন সাধারণ সদস্য হিসেবে সকল যৌক্তিক আন্দোলন ও কল্যানে সংহতি জানাই।",
    status: "approved",
    createdAt: new Date().toISOString()
  },
  {
    id: "13",
    fullName: "মোঃ মামুন মিয়া",
    phoneNumber: "01799990000",
    facebookUrl: "https://facebook.com/mamun.miya",
    position: "সাধারণ সদস্য",
    district: "গাজীপুর",
    upazila: "কালিয়াকৈর",
    schoolName: "আন্দারমানিক সপ্রাবি",
    aboutMe: "কল্যাণ সমিতির উন্নয়ন কামনা করছি।",
    status: "pending",
    createdAt: new Date().toISOString()
  }
];

// Helper to read database
function readDB(): Profile[] {
  try {
    let dataList: Profile[] = [];
    if (!fs.existsSync(dbPath)) {
      dataList = SEED_PROFILES;
      fs.writeFileSync(dbPath, JSON.stringify(dataList, null, 2), "utf-8");
      return dataList;
    } else {
      const data = fs.readFileSync(dbPath, "utf-8");
      dataList = JSON.parse(data);
    }

    // Migrate data if fields are missing
    let migrated = false;
    dataList = dataList.map((p, index) => {
      let updated = { ...p };
      if (!p.username) {
        const fallbackUsernames: { [key: string]: string } = {
          "1": "roni123",
          "2": "sajjad99",
          "3": "altaf_hossain",
          "4": "anowar_hossain",
          "5": "kamrul_hasan",
          "6": "aktar_banu",
          "7": "abu_bakkar",
          "8": "ibrahim_khalil",
          "9": "bilkis_begum",
          "10": "ashraful_alam",
          "11": "hasibul_islam",
          "12": "sumi_akter",
          "13": "mamun_miya"
        };
        updated.username = fallbackUsernames[p.id] || `user_${p.id || index + 1}`;
        migrated = true;
      }
      if (!p.unionName) {
        const fallbackUnions: { [key: string]: string } = {
          "1": "রূপগঞ্জ ইউনিয়ন",
          "2": "কালিয়াকৈর পৌরসভা",
          "3": "সাভার পৌরসভা",
          "4": "চান্দিনা পৌরসভা",
          "5": "সোনারগাঁও পৌরসভা",
          "6": "ধামরাই পৌরসভা",
          "7": "শ্রীপুর পৌরসভা",
          "8": "লাকসাম পৌরসভা",
          "9": "বিয়ানীবাজার পৌরসভা",
          "10": "ত্রিশাল পৌরসভা",
          "11": "পটিয়া পৌরসভা",
          "12": "বাকেরগঞ্জ পৌরসভা",
          "13": "কালিয়াকৈর পৌরসভা"
        };
        updated.unionName = fallbackUnions[p.id] || "সদর ইউনিয়ন";
        migrated = true;
      }
      return updated;
    });

    if (migrated) {
      fs.writeFileSync(dbPath, JSON.stringify(dataList, null, 2), "utf-8");
    }
    return dataList;
  } catch (err) {
    console.error("Error reading db file, falling back to in-memory:", err);
    return SEED_PROFILES;
  }
}

// Helper to write database
function writeDB(profiles: Profile[]) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(profiles, null, 2), "utf-8");
    if (firebaseInitialized && db) {
      syncBulkProfilesToFirestore(profiles).catch(err => {
        console.error("[Firebase] Background sync error for Profiles:", err);
      });
    }
  } catch (err) {
    console.error("Error writing to db file:", err);
  }
}

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

async function startServer() {
  // Use the top-level exported app instance
  
  // CORS configuration to support external hosting providers like Netlify
  const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://officesohayok.netlify.app"
  ];

  const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
      // Allow requests with no origin (like mobile apps, curl, or server-to-server)
      if (!origin) return callback(null, true);
      
      const isAllowed = allowedOrigins.includes(origin) || 
                        origin.endsWith(".run.app") || 
                        origin.endsWith(".netlify.app");
                        
      if (isAllowed) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept", "X-Requested-With"],
    optionsSuccessStatus: 200
  };

  app.use(cors(corsOptions));

  // Handle pre-flight OPTIONS requests explicitly across all endpoints
  app.options("*", cors(corsOptions) as any);

  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // Initialize Firebase and load initial database from Firestore
  await initFirebase();
  if (firebaseInitialized && db) {
    console.log("[Firebase] Synchronizing local files with Firestore...");
    await syncSettingsFromFirestore();
    await syncAdminConfigFromFirestore();
    await syncAiSettingsFromFirestore();
    await syncProfilesFromFirestore();
    await syncLiveMessagesFromFirestore();
    await syncTempChatsFromFirestore();
    console.log("[Firebase] Startup synchronization complete.");
  }

  // Initialize DB & Settings
  readDB();
  readSettings();
  readAiSettings();

  // Helper to dynamically inject SEO metadata into index.html
  function injectSeoMetadata(html: string): string {
    const settings = readSettings();
    const seo = settings.seo;
    if (!seo) return html;

    const websiteTitle = seo.homepageTitle || seo.websiteTitle || "প্রাথমিক বিদ্যালয় অফিস সহায়ক বাংলাদেশ";
    const metaDescription = seo.metaDescription || "প্রাথমিক বিদ্যালয় অফিস সহায়ক কর্মচারী তালিকা ও তথ্যকোষ";
    const metaKeywords = seo.metaKeywords || "অফিস সহায়ক, প্রাথমিক বিদ্যালয়, দপ্তরী কাম নৈশপ্রহরী, ডিরেক্টরি";
    const themeColor = seo.themeColor || "#059669";
    const faviconUrl = seo.faviconUrl || "/favicon.ico";

    // Build the head elements to inject
    let headInjections = `
    <!-- Basic SEO -->
    <meta name="description" content="${metaDescription}" />
    <meta name="keywords" content="${metaKeywords}" />
    <meta name="author" content="${seo.authorName || "Admin"}" />
    <meta name="copyright" content="${seo.copyright || ""}" />
    <meta name="robots" content="${seo.robotsMetaTag || "index, follow"}" />
    <meta name="theme-color" content="${themeColor}" />
    `;

    if (seo.canonicalUrl) {
      headInjections += `<link rel="canonical" href="${seo.canonicalUrl}" />\n`;
    }

    // Open Graph
    headInjections += `
    <meta property="og:title" content="${seo.ogTitle || websiteTitle}" />
    <meta property="og:description" content="${seo.ogDescription || metaDescription}" />
    <meta property="og:type" content="${seo.ogType || "website"}" />
    <meta property="og:url" content="${seo.ogUrl || seo.websiteUrl || ""}" />
    `;
    if (seo.ogImage) {
      headInjections += `<meta property="og:image" content="${seo.ogImage}" />\n`;
    }
    if (seo.fbAppId) {
      headInjections += `<meta property="fb:app_id" content="${seo.fbAppId}" />\n`;
    }

    // Twitter
    headInjections += `
    <meta name="twitter:card" content="${seo.twitterCardType || "summary_large_image"}" />
    <meta name="twitter:title" content="${seo.twitterTitle || websiteTitle}" />
    <meta name="twitter:description" content="${seo.twitterDescription || metaDescription}" />
    `;
    if (seo.twitterImage) {
      headInjections += `<meta name="twitter:image" content="${seo.twitterImage}" />\n`;
    }

    // Verification Codes
    if (seo.googleConsoleCode) {
      headInjections += `<meta name="google-site-verification" content="${seo.googleConsoleCode}" />\n`;
    }
    if (seo.bingWebmasterCode) {
      headInjections += `<meta name="msvalidate.01" content="${seo.bingWebmasterCode}" />\n`;
    }
    if (seo.yandexWebmasterCode) {
      headInjections += `<meta name="yandex-verification" content="${seo.yandexWebmasterCode}" />\n`;
    }
    if (seo.baiduWebmasterCode) {
      headInjections += `<meta name="baidu-site-verification" content="${seo.baiduWebmasterCode}" />\n`;
    }
    if (seo.pinterestVerificationCode) {
      headInjections += `<meta name="p:domain_verify" content="${seo.pinterestVerificationCode}" />\n`;
    }
    if (seo.facebookDomainVerificationCode) {
      headInjections += `<meta name="facebook-domain-verification" content="${seo.facebookDomainVerificationCode}" />\n`;
    }
    if (seo.customVerificationTags) {
      headInjections += `${seo.customVerificationTags}\n`;
    }

    // Structured Data (JSON-LD Schemas)
    const schemas = [
      { enabled: seo.organizationSchemaEnabled, json: seo.organizationSchemaJson },
      { enabled: seo.websiteSchemaEnabled, json: seo.websiteSchemaJson },
      { enabled: seo.webpageSchemaEnabled, json: seo.webpageSchemaJson },
      { enabled: seo.breadcrumbSchemaEnabled, json: seo.breadcrumbSchemaJson },
      { enabled: seo.faqSchemaEnabled, json: seo.faqSchemaJson },
      { enabled: seo.articleSchemaEnabled, json: seo.articleSchemaJson },
      { enabled: seo.localBusinessSchemaEnabled, json: seo.localBusinessSchemaJson }
    ];

    schemas.forEach(s => {
      if (s.enabled && s.json) {
        headInjections += `<script type="application/ld+json">\n${s.json}\n</script>\n`;
      }
    });

    let modifiedHtml = html;

    // Inject into title tag
    if (modifiedHtml.includes("<title>")) {
      modifiedHtml = modifiedHtml.replace(/<title>.*?<\/title>/, `<title>${websiteTitle}</title>`);
    } else {
      headInjections = `<title>${websiteTitle}</title>\n` + headInjections;
    }

    // Inject favicon
    if (faviconUrl) {
      if (modifiedHtml.includes('rel="icon"')) {
        modifiedHtml = modifiedHtml.replace(/rel="icon" href=".*?"/, `rel="icon" href="${faviconUrl}"`);
      } else if (modifiedHtml.includes('rel="shortcut icon"')) {
        modifiedHtml = modifiedHtml.replace(/rel="shortcut icon" href=".*?"/, `rel="shortcut icon" href="${faviconUrl}"`);
      } else {
        headInjections += `<link rel="icon" href="${faviconUrl}" />\n`;
      }
    }

    // Replace the block between <!-- SEO Meta Tags --> and <!-- Accessibility & Web Performance -->
    const startText = "<!-- SEO Meta Tags -->";
    const endText = "<!-- Accessibility & Web Performance -->";
    if (modifiedHtml.includes(startText) && modifiedHtml.includes(endText)) {
      const startIndex = modifiedHtml.indexOf(startText);
      const endIndex = modifiedHtml.indexOf(endText);
      modifiedHtml = modifiedHtml.substring(0, startIndex + startText.length) + "\n" + headInjections + "\n    " + modifiedHtml.substring(endIndex);
    } else if (modifiedHtml.includes("</head>")) {
      modifiedHtml = modifiedHtml.replace("</head>", `${headInjections}\n</head>`);
    }

    return modifiedHtml;
  }

  // Dynamic public SEO endpoints
  app.get("/robots.txt", (req, res) => {
    try {
      const settings = readSettings();
      const seo = settings.seo;
      const webUrl = (seo?.websiteUrl || "https://doptari-kallyan.web.app").replace(/\/$/, "");
      
      let content = "";
      if (seo?.robotsTxtContent) {
        content = seo.robotsTxtContent;
      } else {
        content = `User-agent: *
Disallow: /rifat-admin
Disallow: /rifat-admin/
Disallow: /api/
Disallow: /admin-config.json
Disallow: /firebase-applet-config.json
Allow: /

Sitemap: ${webUrl}/sitemap-index.xml`;
      }
      
      res.header("Content-Type", "text/plain; charset=utf-8");
      res.send(content);
    } catch (error) {
      res.status(500).send("Error generating robots.txt");
    }
  });

  app.get("/sitemap-index.xml", (req, res) => {
    try {
      const settings = readSettings();
      const seo = settings.seo;
      const webUrl = (seo?.websiteUrl || "https://doptari-kallyan.web.app").replace(/\/$/, "");
      const currentDate = new Date().toISOString().split("T")[0];

      const content = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${webUrl}/sitemap.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
</sitemapindex>`;

      res.header("Content-Type", "application/xml; charset=utf-8");
      res.send(content);
    } catch (error) {
      res.status(500).send("Error generating sitemap index");
    }
  });

  app.get("/sitemap.xml", (req, res) => {
    try {
      const settings = readSettings();
      const seo = settings.seo;
      const webUrl = (seo?.websiteUrl || "https://doptari-kallyan.web.app").replace(/\/$/, "");
      const homepagePriority = seo?.homepagePriority || "1.0";
      const changeFrequency = seo?.changeFrequency || "daily";

      const profiles = readDB();
      const approvedProfiles = profiles.filter(p => p.status === "approved");

      let urlElements = `  <url>
    <loc>${webUrl}/</loc>
    <priority>${homepagePriority}</priority>
    <changefreq>${changeFrequency}</changefreq>
  </url>\n`;

      approvedProfiles.forEach(p => {
        const trailing = seo?.trailingSlashPreference === "always" ? "/" : "";
        urlElements += `  <url>
    <loc>${webUrl}/profile/${p.id}${trailing}</loc>
    <priority>0.8</priority>
    <changefreq>weekly</changefreq>
  </url>\n`;
      });

      const content = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}</urlset>`;

      res.header("Content-Type", "application/xml; charset=utf-8");
      res.send(content);
    } catch (error) {
      res.status(500).send("Error generating sitemap");
    }
  });

  app.get("/sitemap", (req, res) => {
    res.redirect(301, "/sitemap.xml");
  });

  // API Route: Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // API Route: Get WebEdit settings (Public for RegistrationModal and AdminPanel)
  app.get("/api/settings", (req, res) => {
    try {
      const settings = readSettings();
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: "Failed to load settings" });
    }
  });

  // API Route: Update WebEdit settings (Admin only)
  app.post("/api/admin/settings", async (req, res) => {
    try {
      if (!validateAdminSession(req)) {
        return res.status(403).json({ error: "Unauthorized access" });
      }

      const newSettings = req.body;
      if (!newSettings || !newSettings.fieldsConfig || !newSettings.positions || !newSettings.locations) {
        return res.status(400).json({ error: "Invalid settings format" });
      }

      await writeSettings(newSettings);
      res.json({ success: true, settings: newSettings });
    } catch (error) {
      console.error("[Settings] Failed to save settings:", error);
      res.status(500).json({ error: "Failed to save settings" });
    }
  });

  // API Route: Get AI Routing settings (Admin only)
  app.get("/api/admin/ai-settings", (req, res) => {
    try {
      if (!validateAdminSession(req)) {
        return res.status(403).json({ error: "Unauthorized access" });
      }
      const aiSettings = readAiSettings();
      res.json(aiSettings);
    } catch (error) {
      console.error("[AI Settings] Failed to load AI settings:", error);
      res.status(500).json({ error: "Failed to load AI settings" });
    }
  });

  // API Route: Update AI Routing settings (Admin only)
  app.post("/api/admin/ai-settings", async (req, res) => {
    try {
      if (!validateAdminSession(req)) {
        return res.status(403).json({ error: "Unauthorized access" });
      }

      const newSettings = req.body;
      if (!newSettings || !Array.isArray(newSettings.configs)) {
        return res.status(400).json({ error: "Invalid AI settings format" });
      }

      if (newSettings.configs.length > 25) {
        return res.status(400).json({ error: "সর্বোচ্চ ২৫ টি রাউটিং মডেল বা এপিআই কী যুক্ত করা সম্ভব।" });
      }

      await writeAiSettings(newSettings);
      res.json({ success: true, settings: newSettings });
    } catch (error) {
      console.error("[AI Settings] Failed to save AI settings:", error);
      res.status(500).json({ error: "Failed to save AI settings" });
    }
  });

  // API Route: Get Real-time chats (Admin only)
  app.get("/api/admin/chats", async (req, res) => {
    try {
      if (!validateAdminSession(req)) {
        return res.status(403).json({ error: "Unauthorized access" });
      }

      if (!firebaseInitialized || !db) {
        return res.json({ success: true, chats: [] });
      }

      const querySnapshot = await getDocs(collection(db, "chats"));
      const chats: any[] = [];
      querySnapshot.forEach((doc) => {
        chats.push(doc.data());
      });

      chats.sort((a, b) => new Date(b.lastMessageAt || 0).getTime() - new Date(a.lastMessageAt || 0).getTime());
      res.json({ success: true, chats });
    } catch (error) {
      console.error("[Chats] Failed to load real-time chats:", error);
      res.status(500).json({ error: "Failed to load real-time chats" });
    }
  });

  // --- LIVE MESSAGES ENDPOINTS ---

  // Get active live chat threads list (Admin only)
  app.get("/api/admin/live-chats", (req, res) => {
    try {
      if (!validateAdminSession(req)) {
        return res.status(403).json({ error: "Unauthorized access" });
      }

      const messages = readLiveMessages();
      // Group by chatId
      const chatGroups: Record<string, { chatId: string; lastMessage: string; senderName: string; timestamp: string; unreadCount: number }> = {};
      
      messages.forEach((msg) => {
        const id = msg.chatId;
        if (!chatGroups[id] || new Date(msg.timestamp).getTime() > new Date(chatGroups[id].timestamp).getTime()) {
          chatGroups[id] = {
            chatId: id,
            lastMessage: msg.isDeleted ? "এই বার্তাটি মুছে ফেলা হয়েছে।" : msg.content,
            senderName: msg.senderId === 'admin' ? (chatGroups[id]?.senderName || "ব্যবহারকারী") : msg.senderName,
            timestamp: msg.timestamp,
            unreadCount: 0
          };
        } else if (msg.senderId !== 'admin') {
          chatGroups[id].senderName = msg.senderName;
        }
      });

      const chatsList = Object.values(chatGroups).sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

      res.json({ success: true, chats: chatsList });
    } catch (err) {
      console.error("Error getting live chats list:", err);
      res.status(500).json({ error: "Failed to fetch live chats" });
    }
  });

  // Get live messages for a specific chatId (Public/Admin)
  app.get("/api/live-messages", (req, res) => {
    try {
      const { chatId } = req.query;
      if (!chatId || typeof chatId !== "string") {
        return res.status(400).json({ error: "chatId is required" });
      }

      const messages = readLiveMessages();
      const chatMessages = messages.filter(m => m.chatId === chatId);

      res.json({ success: true, messages: chatMessages });
    } catch (err) {
      console.error("Error getting live messages:", err);
      res.status(500).json({ error: "Failed to fetch live messages" });
    }
  });

  // Post a new live message (Public/Admin)
  app.post("/api/live-messages", async (req, res) => {
    try {
      const { chatId, senderId, senderName, content } = req.body;
      if (!chatId || !senderId || !senderName || !content) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const messages = readLiveMessages();
      const newMessage: LiveMessage = {
        id: "msg-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7),
        chatId,
        senderId,
        senderName,
        content: content.trim(),
        timestamp: new Date().toISOString()
      };

      messages.push(newMessage);
      await writeLiveMessages(messages);

      res.status(201).json({ success: true, message: newMessage });
    } catch (err) {
      console.error("Error posting live message:", err);
      res.status(500).json({ error: "Failed to post live message" });
    }
  });

  // Edit a live message
  app.post("/api/live-messages/edit", async (req, res) => {
    try {
      const { messageId, content } = req.body;
      if (!messageId || !content) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const messages = readLiveMessages();
      const index = messages.findIndex(m => m.id === messageId);
      if (index === -1) {
        return res.status(404).json({ error: "Message not found" });
      }

      messages[index].content = content.trim();
      messages[index].isEdited = true;

      await writeLiveMessages(messages);
      res.json({ success: true, message: messages[index] });
    } catch (err) {
      console.error("Error editing live message:", err);
      res.status(500).json({ error: "Failed to edit message" });
    }
  });

  // Delete a live message
  app.post("/api/live-messages/delete", async (req, res) => {
    try {
      const { messageId } = req.body;
      if (!messageId) {
        return res.status(400).json({ error: "Missing messageId" });
      }

      const messages = readLiveMessages();
      const index = messages.findIndex(m => m.id === messageId);
      if (index === -1) {
        return res.status(404).json({ error: "Message not found" });
      }

      messages.splice(index, 1);

      await writeLiveMessages(messages);
      res.json({ success: true });
    } catch (err) {
      console.error("Error deleting live message:", err);
      res.status(500).json({ error: "Failed to delete message" });
    }
  });

  // API Route: SOHOKARI Chat completion with Failover
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, sessionId, userName } = req.body;

      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: "Messages are required" });
      }

      // Check last user message word count limit
      const lastMessage = messages[messages.length - 1];
      if (lastMessage && lastMessage.role === 'user' && typeof lastMessage.content === 'string') {
        const wordCount = lastMessage.content.trim().split(/\s+/).filter(Boolean).length;
        if (wordCount > 750) {
          return res.status(400).json({ error: "আপনার বার্তাটি সর্বোচ্চ ৭৫০ শব্দের মধ্যে হতে হবে।" });
        }
      }

      const result = await callAiWithFailover(messages, sessionId, userName);

      // Save user conversation in Firestore asynchronously for real-time monitoring
      if (sessionId) {
        const updatedMessages = [
          ...messages,
          { role: 'assistant', content: result.reply, timestamp: new Date().toISOString() }
        ];
        saveChatSessionToFirestore(sessionId, userName, updatedMessages).catch(err => {
          console.error("[Chats] Background Firestore sync failed:", err);
        });
      }

      res.json(result);
    } catch (error) {
      console.error("[Sohokari Chat Error]:", error);
      res.status(500).json({ error: "এআই সহকারী বর্তমানে সাড়া দিতে পারছে না। অনুগ্রহ করে আবার চেষ্টা করুন।" });
    }
  });

  // SOHOKARI AI failover execution helper
  async function callAiWithFailover(messages: any[], sessionId: string, userName: string) {
    const approved = readDB().filter(p => p.status === 'approved');
    
    // Speed optimization: dynamically filter profiles based on user keywords
    let filteredApproved = approved;
    const lastUserMsg = messages[messages.length - 1];
    if (approved.length > 8 && lastUserMsg && typeof lastUserMsg.content === 'string') {
      const queryLower = lastUserMsg.content.toLowerCase();
      const matches = approved.filter(p => {
        const name = (p.fullName || "").toLowerCase();
        const school = (p.schoolName || "").toLowerCase();
        const upazila = (p.upazila || "").toLowerCase();
        const district = (p.district || "").toLowerCase();
        const phone = p.phoneNumber || "";
        
        return queryLower.includes(name) || 
               name.split(" ").some((w: string) => w.length > 2 && queryLower.includes(w)) ||
               queryLower.includes(school) || 
               queryLower.includes(upazila) || 
               queryLower.includes(district) || 
               queryLower.includes(phone);
      });

      if (matches.length > 0) {
        const matchIds = new Set(matches.map(m => m.id));
        const extraFallback = approved.filter(p => !matchIds.has(p.id)).slice(0, 4);
        filteredApproved = [...matches, ...extraFallback];
      } else {
        filteredApproved = approved.slice(0, 8);
      }
    }

    const profilesSummary = filteredApproved.map(p => 
      `- ${p.fullName}, পদবী: ${p.position}, বিদ্যালয়: ${p.schoolName}, উপজেলা: ${p.upazila}, জেলা: ${p.district}, মোবাইল: ${p.phoneNumber}`
    ).join("\n");

    const systemPrompt = `আপনি হলেন 'সহকারী' (SOHOKARI), প্রাথমিক বিদ্যালয় অফিস সহায়ক বাংলাদেশ-এর ডিজিটাল তথ্যকোষ ও কল্যাণ ডিরেক্টরির একজন অত্যন্ত চটপটে, দ্রুতগতির ও আন্তরিক এআই অ্যাসিস্ট্যান্ট।
আপনার মূল কাজ হলো ডিরেক্টরি এবং ওয়েবসাইট সম্পর্কিত তথ্য অত্যন্ত দ্রুত প্রদান করা।

এখানে আমাদের ডিরেক্টরির রেজিস্ট্রিকৃত ও অনুমোদিত সদস্য/অফিস সহায়কগণের সম্পূর্ণ তালিকা দেওয়া হলো:

${profilesSummary}

গুরুত্বপূর্ণ নির্দেশনা (Strict Guidelines):
১. **অতি দ্রুত ও সংক্ষেপ উত্তর (Maximum Speed)**: আপনার উত্তরগুলো অত্যন্ত সংক্ষিপ্ত, সরাসরি ও টু-দি-পয়েন্ট রাখুন। অপ্রয়োজনীয় ভূমিকা, দীর্ঘ অভিবাদন বা অপ্রয়োজনীয় বাক্য বর্জন করুন যাতে এআই অত্যন্ত দ্রুত রেসপন্স পাঠাতে পারে।
২. **প্রোফাইলে সরাসরি নেভিগেশন (Direct Profile Link)**: ব্যবহারকারী যদি কোনো নির্দিষ্ট ইউজারের প্রোফাইল দেখতে চায়, বা তার পেজে যেতে বলে (যেমন: "আমাকে মোঃ রনি আহম্মেদ এর পেজে নিয়ে যাও" বা "রনি এর নাম্বার দাও ও তার পেজে যাও"), তবে উত্তর বাক্যে অবশ্যই উক্ত ইউজারের হুবহু পূর্ণ নাম (যেমন: মোঃ রনি আহম্মেদ) উল্লেখ করবেন। ফ্রন্টএন্ডে এটি স্ক্যান করে সরাসরি প্রোফাইলে যাওয়ার লিংক বাটন শো করা হবে।
৩. **চার্ট ও টেবিল (Charts & Tables)**: ব্যবহারকারী যদি কোনো ডেটা বা তালিকা চার্ট বা টেবিল আকারে দেখতে চায়, তবে মার্কডাউন টেবিল ফরম্যাট (Markdown Table Format) ব্যবহার করে তা সুন্দরভাবে প্রদর্শন করবেন। (যেমন: | কলাম ১ | কলাম ২ |)।
৪. **ফাইল বা কোড জেনারেশন (Standalone Code Files)**: ব্যবহারকারী যদি কোনো নির্দিষ্ট কোড (HTML, CSS, JS, HTML+CSS+JS, shtml) বা স্পেসিফিক ফরম্যাটের ফাইল (JSON, TXT, CSV) চায়, তবে তা মার্কডাউন কোড ব্লকে (Markdown Code Block with triple backticks) সুন্দরভাবে র্যাপ করে প্রদান করবেন। ব্যবহারকারীকে বলবেন যে সে কোড ব্লকের ডাউনলোড বাটন চেপে ফাইলটি সরাসরি ডাউনলোড করতে পারবে।

আমাদের ডিরেক্টরি ছাড়া অন্য সাধারণ জিজ্ঞাসা বা প্রশ্নের উত্তরও আপনি বাংলায় অত্যন্ত দ্রুত ও সংক্ষেপে দিতে পারেন।`;

    const aiSettings = readAiSettings();
    const enabledConfigs = aiSettings.configs.filter(c => c.enabled);
    const errorsList: any[] = [];

    // 1. Failover routing if configurations exist
    if (enabledConfigs.length > 0) {
      for (const config of enabledConfigs) {
        // Intelligent auto-detection of the provider to prevent configuration mismatch issues
        let detectedProvider = config.provider;
        if (config.apiKey.startsWith("sk-or-") || config.model.toLowerCase().includes("openrouter")) {
          detectedProvider = 'openrouter';
        } else if (config.apiKey.startsWith("nvapi-") || config.model.toLowerCase().includes("nvidia")) {
          detectedProvider = 'nvidia';
        }

        try {

          const endpoint = detectedProvider === 'nvidia'
            ? 'https://integrate.api.nvidia.com/v1/chat/completions'
            : 'https://openrouter.ai/api/v1/chat/completions';
          
          const headers: Record<string, string> = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${config.apiKey}`
          };
          
          if (detectedProvider === 'openrouter') {
            headers["HTTP-Referer"] = "https://ai.studio/build";
            headers["X-Title"] = "SOHOKARI Assistant";
          }

          // Map messages to OpenAI format and inject system prompt at index 0
          const formattedMessages = [
            { role: 'system', content: systemPrompt },
            ...messages.map((m: any) => {
              const hasImages = m.attachments && m.attachments.some((a: any) => a.type === 'image');
              if (!hasImages) {
                let textContent = m.content;
                if (m.attachments && m.attachments.length > 0) {
                  const fileTexts = m.attachments
                    .filter((a: any) => a.type !== 'image')
                    .map((a: any) => {
                      const textVal = typeof a.content === 'string' ? a.content : '';
                      const truncated = textVal.length > 25000 
                        ? textVal.slice(0, 25000) + "\n[ফাইলটি অনেক বড় হওয়ায় প্রথম ২৫,০০০ ক্যারেক্টার দেখানো হয়েছে...]" 
                        : textVal;
                      return `[আপলোড করা ফাইল: ${a.name}]\n--------------------\n${truncated}\n--------------------\n`;
                    })
                    .join("\n");
                  if (fileTexts) {
                    textContent = `${fileTexts}\n${textContent}`;
                  }
                }
                return { role: m.role === 'model' || m.role === 'assistant' ? 'assistant' : m.role, content: textContent };
              } else {
                const contentArray: any[] = [];
                let textContent = m.content;
                if (m.attachments) {
                  const fileTexts = m.attachments
                    .filter((a: any) => a.type !== 'image')
                    .map((a: any) => {
                      const textVal = typeof a.content === 'string' ? a.content : '';
                      const truncated = textVal.length > 25000 
                        ? textVal.slice(0, 25000) + "\n[ফাইলটি অনেক বড় হওয়ায় প্রথম ২৫,০০০ ক্যারেক্টার দেখানো হয়েছে...]" 
                        : textVal;
                      return `[আপলোড করা ফাইল: ${a.name}]\n--------------------\n${truncated}\n--------------------\n`;
                    })
                    .join("\n");
                  if (fileTexts) {
                    textContent = `${fileTexts}\n${textContent}`;
                  }
                }
                contentArray.push({ type: "text", text: textContent });
                
                m.attachments.filter((a: any) => a.type === 'image').forEach((img: any) => {
                  contentArray.push({
                    type: "image_url",
                    image_url: {
                      url: img.base64
                    }
                  });
                });
                
                return { role: m.role === 'model' || m.role === 'assistant' ? 'assistant' : m.role, content: contentArray };
              }
            })
          ];

          const res = await fetch(endpoint, {
            method: 'POST',
            headers,
            body: JSON.stringify({
              model: config.model,
              messages: formattedMessages,
              max_tokens: 1500
            })
          });

          if (res.ok) {
            const data = await res.json();
            const replyText = data.choices?.[0]?.message?.content;
            if (replyText) {
              console.log(`[AI Success] Successfully responded using ${detectedProvider} - Model: ${config.model}`);
              return { reply: replyText, provider: detectedProvider, model: config.model };
            } else {
              const responseDump = JSON.stringify(data);
              console.warn(`[AI Warning] Model ${config.model} returned OK but empty message content. Response:`, responseDump);
              throw new Error(`ফাঁকা রেসপন্স পাওয়া গেছে।`);
            }
          } else {
            const errorBody = await res.text();
            console.error(`[AI Error] Model ${config.model} returned error status ${res.status}. Body:`, errorBody);
            
            let errMsg = `Error ${res.status}`;
            try {
              const parsed = JSON.parse(errorBody);
              if (parsed.error && typeof parsed.error.message === 'string') {
                errMsg = parsed.error.message;
              } else if (parsed.error && typeof parsed.error === 'string') {
                errMsg = parsed.error;
              } else if (typeof parsed.message === 'string') {
                errMsg = parsed.message;
              }
            } catch (pErr) {
              if (errorBody && errorBody.length < 200) {
                errMsg = errorBody.trim();
              }
            }
            throw new Error(errMsg);
          }
        } catch (err: any) {
          const errMsg = err?.message || "অজানা নেটওয়ার্ক ত্রুটি";
          console.error(`[AI Failover Failed] Provider ${detectedProvider}, model ${config.model} failed. Error:`, errMsg);
          errorsList.push({
            provider: detectedProvider === 'nvidia' ? 'NVIDIA NIM' : 'OpenRouter',
            model: config.model,
            error: errMsg
          });
        }
      }
    }

    // 2. If settings are empty or failover configurations failed, return failure message.
    let replyText = "দুঃখিত, বর্তমানে সংযোগ দেওয়া সম্ভব হচ্ছে না।";
    if (errorsList.length > 0) {
      replyText += "\n\n**ব্যর্থতার বিস্তারিত বিবরণ:**\n" + errorsList.map((e, idx) => 
        `${idx + 1}. **${e.provider}** (${e.model}): ${e.error}`
      ).join("\n");
    } else {
      replyText += "\nদয়া করে এডমিন প্যানেলে এপিআই রাউটিং সেটিংস সক্রিয় আছে কিনা পরীক্ষা করুন।";
    }

    return {
      reply: replyText,
      provider: "none",
      model: "fallback"
    };
  }

  // Initialize DB & Settings
  readDB();
  readSettings();

  // API Route: Get Approved Profiles with Filters
  app.get("/api/profiles", (req, res) => {
    try {
      const profiles = readDB();
      const approvedProfiles = profiles.filter(p => p.status === "approved");

      const { search, position, district, upazila, unionName, school } = req.query;

      let filtered = [...approvedProfiles];

      if (search && typeof search === "string") {
        const query = search.toLowerCase().trim();
        const queryEn = banglaToEnglishDigits(query);
        const queryBn = englishToBanglaDigits(query);

        filtered = filtered.filter(p => 
          p.fullName.toLowerCase().includes(query) || 
          p.fullName.toLowerCase().includes(queryEn) || 
          p.fullName.toLowerCase().includes(queryBn) || 
          p.phoneNumber.includes(query) ||
          p.phoneNumber.includes(queryEn) ||
          p.phoneNumber.includes(queryBn) ||
          p.schoolName.toLowerCase().includes(query) ||
          p.schoolName.toLowerCase().includes(queryEn) ||
          p.schoolName.toLowerCase().includes(queryBn) ||
          (p.username && p.username.toLowerCase().includes(query)) ||
          (p.username && p.username.toLowerCase().includes(queryEn))
        );
      }

      if (school && typeof school === "string") {
        const query = school.toLowerCase().trim();
        filtered = filtered.filter(p => p.schoolName.toLowerCase().includes(query));
      }

      if (position && typeof position === "string" && position !== "all") {
        filtered = filtered.filter(p => p.position === position);
      }

      if (district && typeof district === "string" && district !== "all") {
        filtered = filtered.filter(p => p.district === district);
      }

      if (upazila && typeof upazila === "string" && upazila !== "all") {
        filtered = filtered.filter(p => p.upazila === upazila);
      }

      if (unionName && typeof unionName === "string" && unionName !== "all") {
        const query = unionName.toLowerCase().trim();
        filtered = filtered.filter(p => p.unionName && p.unionName.toLowerCase().includes(query));
      }

      res.json(filtered);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch profiles" });
    }
  });

  // --- TEMPORARY CHATS API ENDPOINTS ---
  app.get("/api/temp-chats/messages", (req, res) => {
    try {
      const { userPhone, partnerPhone } = req.query;
      if (!userPhone || !partnerPhone) {
        return res.status(400).json({ error: "Missing phone numbers" });
      }
      const messages = readTempChats();
      const conversation = messages.filter(m => 
        (m.senderPhone === userPhone && m.receiverPhone === partnerPhone) ||
        (m.senderPhone === partnerPhone && m.receiverPhone === userPhone)
      );
      res.json(conversation);
    } catch (err) {
      res.status(500).json({ error: "Failed to load messages" });
    }
  });

  app.post("/api/temp-chats/send", async (req, res) => {
    try {
      const { senderPhone, senderName, receiverPhone, receiverName, content } = req.body;
      if (!senderPhone || !senderName || !receiverPhone || !receiverName || !content) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      
      const messages = readTempChats();
      const newMsg: TempChatMessage = {
        id: Date.now().toString() + "_" + Math.floor(Math.random() * 1000),
        senderPhone,
        senderName,
        receiverPhone,
        receiverName,
        content,
        timestamp: new Date().toISOString()
      };
      
      messages.push(newMsg);
      await writeTempChats(messages);
      res.status(201).json(newMsg);
    } catch (err) {
      res.status(500).json({ error: "Failed to send message" });
    }
  });

  app.get("/api/temp-chats/active", (req, res) => {
    try {
      const { phone } = req.query;
      if (!phone) {
        return res.status(400).json({ error: "Missing user phone" });
      }
      const messages = readTempChats();
      // Filter messages where user is sender or receiver
      const userMsgs = messages.filter(m => m.senderPhone === phone || m.receiverPhone === phone);
      
      // Group by partner phone
      const partnersMap = new Map<string, { partnerPhone: string, partnerName: string, lastMessage: TempChatMessage }>();
      
      userMsgs.forEach(m => {
        const partnerPhone = m.senderPhone === phone ? m.receiverPhone : m.senderPhone;
        const partnerName = m.senderPhone === phone ? m.receiverName : m.senderName;
        
        const existing = partnersMap.get(partnerPhone);
        if (!existing || new Date(m.timestamp).getTime() > new Date(existing.lastMessage.timestamp).getTime()) {
          partnersMap.set(partnerPhone, {
            partnerPhone,
            partnerName,
            lastMessage: m
          });
        }
      });
      
      const result = Array.from(partnersMap.values()).sort((a, b) => 
         new Date(b.lastMessage.timestamp).getTime() - new Date(a.lastMessage.timestamp).getTime()
      );
      
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: "Failed to load active chats" });
    }
  });

  // API Route: Check Username Availability
  app.get("/api/check-username", (req, res) => {
    try {
      const { username } = req.query;
      if (!username || typeof username !== "string") {
        return res.status(400).json({ error: "Username is required" });
      }

      const cleanUsername = username.trim().toLowerCase();
      if (cleanUsername.length < 3) {
        return res.json({ available: false, error: "ইউজার নেম কমপক্ষে ৩ অক্ষরের হতে হবে।" });
      }

      const profiles = readDB();
      // Check both approved and pending profiles
      const exists = profiles.some(p => p.username && p.username.toLowerCase() === cleanUsername);

      res.json({ available: !exists });
    } catch (error) {
      res.status(500).json({ error: "Failed to check username" });
    }
  });

  // API Route: Submit new profile
  app.post("/api/profiles", (req, res) => {
    try {
      const profiles = readDB();
      const {
        fullName,
        username,
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
        photo
      } = req.body;

      if (!fullName || !username || !phoneNumber || !position || !district || !upazila || !unionName || !schoolName || !aboutMe) {
        return res.status(400).json({ error: "প্রয়োজনীয় সকল তথ্য পূরণ করুন।" });
      }

      const cleanUsername = username.trim().toLowerCase();
      // Duplicate username check
      const usernameExists = profiles.some(p => p.username && p.username.toLowerCase() === cleanUsername);
      if (usernameExists) {
        return res.status(400).json({ error: "এই ইউজার নেমটি ইতিমধ্যে ব্যবহৃত হয়েছে, অনুগ্রহ করে অন্য একটি দিন।" });
      }

      const newProfile: Profile = {
        id: Date.now().toString(),
        fullName,
        username: cleanUsername,
        phoneNumber,
        facebookUrl: facebookUrl || "",
        position,
        district,
        upazila,
        unionName,
        schoolName,
        aboutMe,
        fatherName: fatherName || "",
        motherName: motherName || "",
        email: email || "",
        address: address || "",
        status: "pending", // Default to pending
        createdAt: new Date().toISOString(),
        photo: photo || ""
      };

      profiles.unshift(newProfile); // Add to the front
      writeDB(profiles);

      res.status(201).json(newProfile);
    } catch (error) {
      res.status(500).json({ error: "Failed to register profile" });
    }
  });

  // API Route: Admin Login
  app.post("/api/admin/login", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "ইউজারনেম এবং পাসওয়ার্ড প্রদান করুন।" });
    }

    const bruteCheck = checkBruteForce(username.toLowerCase());
    if (!bruteCheck.allowed) {
      return res.status(429).json({ error: "অতিরিক্ত ব্যর্থ লগইন চেষ্টার কারণে এই অ্যাকাউন্টটি সাময়িকভাবে লক করা হয়েছে। অনুগ্রহ করে ১৫ মিনিট পর আবার চেষ্টা করুন।" });
    }

    const adminConfig = readAdminConfig();

    const matchedAdmin = adminConfig.admins.find(
      a => a.username.toLowerCase() === username.toLowerCase() && a.password === password
    );

    if (matchedAdmin) {
      if (matchedAdmin.status !== 'approved') {
        return res.status(403).json({ error: "আপনার এডমিন অ্যাকাউন্টটি এখনও অনুমোদন করা হয়নি বা বাতিল করা হয়েছে।" });
      }

      clearFailedAttempts(username.toLowerCase());

      const secureToken = "admin-session-token-" + crypto.randomUUID();
      activeSessions.set(secureToken, { adminId: matchedAdmin.id, lastActive: Date.now() });

      res.json({
        success: true,
        token: secureToken,
        username: matchedAdmin.username,
        adminId: matchedAdmin.id,
        role: matchedAdmin.role,
        fullName: matchedAdmin.fullName,
        email: matchedAdmin.email,
        phoneNumber: matchedAdmin.phoneNumber
      });
    } else {
      registerFailedAttempt(username.toLowerCase());
      res.status(401).json({ error: "ইউজারনেম অথবা পাসওয়ার্ড ভুল হয়েছে।" });
    }
  });

  // API Route: Verify Login OTP
  app.post("/api/admin/verify-login-otp", (req, res) => {
    const { username, password, otp } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "ইউজারনেম এবং পাসওয়ার্ড প্রদান করুন।" });
    }

    const bruteCheck = checkBruteForce(username.toLowerCase());
    if (!bruteCheck.allowed) {
      return res.status(429).json({ error: "অতিরিক্ত ব্যর্থ লগইন চেষ্টার কারণে এই অ্যাকাউন্টটি সাময়িকভাবে লক করা হয়েছে। অনুগ্রহ করে ১৫ মিনিট পর আবার চেষ্টা করুন।" });
    }

    const adminConfig = readAdminConfig();

    const matchedAdmin = adminConfig.admins.find(
      a => a.username.toLowerCase() === username.toLowerCase() && a.password === password
    );

    if (!matchedAdmin || matchedAdmin.status !== 'approved') {
      registerFailedAttempt(username.toLowerCase());
      return res.status(401).json({ error: "অননুমোদিত এক্সেস। তথ্য যাচাই করুন।" });
    }

    const otpState = activeOtps.get(matchedAdmin.email);

    if (!otpState || otpState.type !== 'login') {
      registerFailedAttempt(username.toLowerCase());
      return res.status(400).json({ error: "কোনো সক্রিয় লগইন ওটিপি পাওয়া যায়নি।" });
    }

    if (Date.now() > otpState.expiresAt) {
      activeOtps.delete(matchedAdmin.email);
      registerFailedAttempt(username.toLowerCase());
      return res.status(400).json({ error: "ভেরিফিকেশন কোডের মেয়াদ শেষ হয়ে গেছে। আবার চেষ্টা করুন।" });
    }

    if (otpState.code !== otp) {
      registerFailedAttempt(username.toLowerCase());
      return res.status(400).json({ error: "ভেরিফিকেশন কোডটি সঠিক নয়।" });
    }

    // Success - delete OTP
    activeOtps.delete(matchedAdmin.email);
    clearFailedAttempts(username.toLowerCase());

    const secureToken = "admin-session-token-" + crypto.randomUUID();
    activeSessions.set(secureToken, { adminId: matchedAdmin.id, lastActive: Date.now() });

    res.json({
      success: true,
      token: secureToken,
      username: matchedAdmin.username,
      adminId: matchedAdmin.id,
      role: matchedAdmin.role,
      fullName: matchedAdmin.fullName,
      email: matchedAdmin.email,
      phoneNumber: matchedAdmin.phoneNumber
    });
  });

  // API Route: Forgot Password (OTP Generation)
  app.post("/api/admin/forgot-password", async (req, res) => {
    const { method, value } = req.body;
    if (!value) {
      return res.status(400).json({ error: "তথ্য প্রদান করুন।" });
    }

    const bruteCheck = checkBruteForce(value.trim().toLowerCase());
    if (!bruteCheck.allowed) {
      return res.status(429).json({ error: "অতিরিক্ত চেষ্টার কারণে আপনার অ্যাকাউন্টটি সাময়িকভাবে লক করা হয়েছে। অনুগ্রহ করে ১৫ মিনিট পর আবার চেষ্টা করুন।" });
    }

    const adminConfig = readAdminConfig();

    let matchedAdmin = null;

    if (method === 'email') {
      matchedAdmin = adminConfig.admins.find(
        a => value && value.trim().toLowerCase() === a.email.toLowerCase()
      );
    } else if (method === 'phone') {
      matchedAdmin = adminConfig.admins.find(
        a => value && value.trim() === a.phoneNumber
      );
    }

    if (!matchedAdmin) {
      registerFailedAttempt(value.trim().toLowerCase());
      return res.status(400).json({ error: "প্রদত্ত ইমেইল বা মোবাইল নাম্বারটি নিবন্ধিত কোনো এডমিন তথ্যের সাথে মেলেনি।" });
    }

    if (matchedAdmin.status !== 'approved') {
      return res.status(403).json({ error: "আপনার এডমিন অ্যাকাউন্টটি নিষ্ক্রিয় বা অনুমোদিত নয়।" });
    }

    clearFailedAttempts(value.trim().toLowerCase());

    // Generate OTP code
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 mins

    activeOtps.set(matchedAdmin.email, {
      code: otpCode,
      expiresAt,
      type: 'reset'
    });

    // Send OTP email & SMS
    await sendOtpEmail(matchedAdmin.email, otpCode, "পাসওয়ার্ড পরিবর্তন");
    await sendOtpSms(matchedAdmin.phoneNumber, otpCode, "পাসওয়ার্ড পরিবর্তন");

    // Mask value for secure response rendering
    const targetLabel = method === 'email' ? matchedAdmin.email : matchedAdmin.phoneNumber;
    const masked = targetLabel.replace(/(?<=.{3}).(?=.{4})/g, "*");

    res.json({
      success: true,
      message: `${method === 'email' ? 'ইমেইলে' : 'মোবাইল নাম্বারে'} একটি ভেরিফিকেশন ওটিপি পাঠানো হয়েছে।`,
      masked,
      _devOtp: process.env.NODE_ENV !== 'production' ? otpCode : undefined
    });
  });

  // API Route: Reset Password
  app.post("/api/admin/reset-password", (req, res) => {
    const { otp, newPassword } = req.body;
    const adminConfig = readAdminConfig();

    if (!newPassword || newPassword.length < 4) {
      return res.status(400).json({ error: "নতুন পাসওয়ার্ড কমপক্ষে ৪ ডিজিটের হতে হবে।" });
    }

    // Find matching reset OTP state
    let matchedEmail = null;
    let matchedState = null;
    for (const [email, state] of activeOtps.entries()) {
      if (state.type === 'reset' && state.code === otp) {
        matchedEmail = email;
        matchedState = state;
        break;
      }
    }

    if (!matchedEmail || !matchedState) {
      return res.status(400).json({ error: "ওটিপি (OTP) কোডটি সঠিক নয় বা এর মেয়াদ শেষ হয়ে গেছে।" });
    }

    if (Date.now() > matchedState.expiresAt) {
      activeOtps.delete(matchedEmail);
      return res.status(400).json({ error: "কোডটির মেয়াদ শেষ হয়ে গেছে। অনুগ্রহ করে আবার ট্রাই করুন।" });
    }

    // Reset password
    const adminIndex = adminConfig.admins.findIndex(a => a.email.toLowerCase() === matchedEmail!.toLowerCase());
    if (adminIndex !== -1) {
      adminConfig.admins[adminIndex].password = newPassword;
      writeAdminConfig(adminConfig);
    }

    // Delete OTP
    activeOtps.delete(matchedEmail);

    res.json({
      success: true,
      message: "পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে।"
    });
  });

  // API Route: New Admin Sign Up Request
  app.post("/api/admin/register-request", (req, res) => {
    try {
      const { fullName, username, password, email, phoneNumber } = req.body;

      if (!fullName || !username || !password || !email || !phoneNumber) {
        return res.status(400).json({ error: "অনুগ্রহ করে সব তথ্য সঠিকভাবে পূরণ করুন।" });
      }

      const adminConfig = readAdminConfig();

      // Check if username already exists
      const usernameExists = adminConfig.admins.some(
        a => a.username.toLowerCase() === username.trim().toLowerCase()
      );
      if (usernameExists) {
        return res.status(400).json({ error: "এই ইউজারনেমটি ইতিমধ্যে ব্যবহৃত হয়েছে। অন্য একটি ইউজারনেম ব্যবহার করুন।" });
      }

      // Check if email already exists
      const emailExists = adminConfig.admins.some(
        a => a.email.toLowerCase() === email.trim().toLowerCase()
      );
      if (emailExists) {
        return res.status(400).json({ error: "এই ইমেইলটি ইতিমধ্যে ব্যবহৃত হয়েছে।" });
      }

      const newAdmin: AdminUser = {
        id: "admin-" + Date.now(),
        fullName: fullName.trim(),
        username: username.trim(),
        password: password,
        email: email.trim(),
        phoneNumber: phoneNumber.trim(),
        status: "pending",
        role: "admin"
      };

      adminConfig.admins.push(newAdmin);
      writeAdminConfig(adminConfig);

      res.json({
        success: true,
        message: "আপনার এডমিন অ্যাকাউন্ট আবেদনটি সফলভাবে সাবমিট হয়েছে। প্রধান এডমিন এটি অনুমোদন করলেই আপনি লগইন করতে পারবেন।"
      });
    } catch (error) {
      res.status(500).json({ error: "সার্ভার ত্রুটি। দয়া করে পুনরায় চেষ্টা করুন।" });
    }
  });

  // API Route: List Admins (Admin only)
  app.get("/api/admin/list-admins", (req, res) => {
    try {
      if (!validateAdminSession(req)) {
        return res.status(403).json({ error: "অননুমোদিত এক্সেস" });
      }

      const adminConfig = readAdminConfig();
      // Mask passwords before returning to client for security
      const safeAdmins = adminConfig.admins.map(a => ({
        id: a.id,
        fullName: a.fullName,
        username: a.username,
        email: a.email,
        phoneNumber: a.phoneNumber,
        status: a.status,
        role: a.role
      }));

      res.json({ success: true, admins: safeAdmins });
    } catch (error) {
      res.status(500).json({ error: "এডমিন তালিকা লোড করা সম্ভব হয়নি।" });
    }
  });

  // API Route: Approve Secondary Admin Request (Admin only)
  app.post("/api/admin/approve-admin/:id", (req, res) => {
    try {
      if (!validateAdminSession(req)) {
        return res.status(403).json({ error: "অননুমোদিত এক্সেস" });
      }

      const { id } = req.params;
      const adminConfig = readAdminConfig();
      const admin = adminConfig.admins.find(a => a.id === id);

      if (!admin) {
        return res.status(404).json({ error: "এডমিন পাওয়া যায়নি।" });
      }

      // Enforce maximum of 5 approved administrators
      const approvedAdminsCount = adminConfig.admins.filter(a => a.status === "approved" || a.role === "superadmin").length;
      if (approvedAdminsCount >= 5) {
        return res.status(400).json({ error: "সর্বোচ্চ ৫ জন এডমিন অনুমোদিত হতে পারে।" });
      }

      admin.status = "approved";
      writeAdminConfig(adminConfig);

      res.json({ success: true, message: "এডমিন অ্যাকাউন্টটি সফলভাবে অনুমোদন করা হয়েছে।" });
    } catch (error) {
      res.status(500).json({ error: "অনুমোদন ব্যর্থ হয়েছে।" });
    }
  });

  // API Route: Reject/Suspend Admin Request (Admin only)
  app.post("/api/admin/reject-admin/:id", (req, res) => {
    try {
      if (!validateAdminSession(req)) {
        return res.status(403).json({ error: "অননুমোদিত এক্সেস" });
      }

      const { id } = req.params;
      const adminConfig = readAdminConfig();
      const admin = adminConfig.admins.find(a => a.id === id);

      if (!admin) {
        return res.status(404).json({ error: "এডমিন পাওয়া যায়নি।" });
      }

      if (admin.role === 'superadmin') {
        return res.status(400).json({ error: "প্রধান সুপার-এডমিনকে বাতিল বা নিষ্ক্রিয় করা সম্ভব নয়।" });
      }

      admin.status = "rejected";
      writeAdminConfig(adminConfig);

      res.json({ success: true, message: "এডমিন অ্যাকাউন্ট আবেদনটি বাতিল/নিষ্ক্রিয় করা হয়েছে।" });
    } catch (error) {
      res.status(500).json({ error: "বাতিলকরণ ব্যর্থ হয়েছে।" });
    }
  });

  // API Route: Delete Admin Request (Admin only)
  app.post("/api/admin/delete-admin/:id", (req, res) => {
    try {
      if (!validateAdminSession(req)) {
        return res.status(403).json({ error: "অননুমোদিত এক্সেস" });
      }

      const { id } = req.params;
      const adminConfig = readAdminConfig();
      const index = adminConfig.admins.findIndex(a => a.id === id);

      if (index === -1) {
        return res.status(404).json({ error: "এডমিন পাওয়া যায়নি।" });
      }

      if (adminConfig.admins[index].role === 'superadmin') {
        return res.status(400).json({ error: "প্রধান সুপার-এডমিনকে মুছে ফেলা সম্ভব নয়।" });
      }

      adminConfig.admins.splice(index, 1);
      writeAdminConfig(adminConfig);

      res.json({ success: true, message: "এডমিন অ্যাকাউন্টটি সফলভাবে মুছে ফেলা হয়েছে।" });
    } catch (error) {
      res.status(500).json({ error: "মুছে ফেলা ব্যর্থ হয়েছে।" });
    }
  });

  // API Route: Update Logged-in Admin Credentials
  app.post("/api/admin/update-credentials", (req, res) => {
    try {
      if (!validateAdminSession(req)) {
        return res.status(403).json({ error: "অননুমোদিত এক্সেস" });
      }

      const { adminId, fullName, username, password, email, phoneNumber } = req.body;
      const adminConfig = readAdminConfig();

      let adminIndex = -1;
      if (adminId) {
        adminIndex = adminConfig.admins.findIndex(a => a.id === adminId);
      } else {
        adminIndex = adminConfig.admins.findIndex(a => a.role === 'superadmin');
      }

      if (adminIndex === -1) {
        return res.status(404).json({ error: "এডমিন অ্যাকাউন্টটি খুঁজে পাওয়া যায়নি।" });
      }

      const currentAdmin = adminConfig.admins[adminIndex];
      const usernameExists = adminConfig.admins.some(
        a => a.id !== currentAdmin.id && a.username.toLowerCase() === username.trim().toLowerCase()
      );
      if (usernameExists) {
        return res.status(400).json({ error: "এই ইউজারনেমটি অন্য কোনো এডমিন ইতিমধ্যে ব্যবহার করছেন।" });
      }

      const emailExists = adminConfig.admins.some(
        a => a.id !== currentAdmin.id && a.email.toLowerCase() === email.trim().toLowerCase()
      );
      if (emailExists) {
        return res.status(400).json({ error: "এই ইমেইলটি অন্য কোনো এডমিন ইতিমধ্যে ব্যবহার করছেন।" });
      }

      if (fullName) currentAdmin.fullName = fullName.trim();
      if (username) currentAdmin.username = username.trim();
      if (password) currentAdmin.password = password;
      if (email) currentAdmin.email = email.trim();
      if (phoneNumber) currentAdmin.phoneNumber = phoneNumber.trim();

      writeAdminConfig(adminConfig);

      res.json({
        success: true,
        message: "আপনার এডমিন তথ্য সফলভাবে আপডেট করা হয়েছে。"
      });
    } catch (error) {
      res.status(500).json({ error: "তথ্য পরিবর্তন ব্যর্থ হয়েছে।" });
    }
  });

  // API Route: Get Admin Profiles (All, sorted)
  app.get("/api/admin/profiles", (req, res) => {
    try {
      // Basic security check (can be expanded if needed)
      if (!validateAdminSession(req)) {
        return res.status(403).json({ error: "Unauthorized access" });
      }

      const profiles = readDB();
      // Sort: Pending first, then newest
      const sorted = [...profiles].sort((a, b) => {
        if (a.status === "pending" && b.status !== "pending") return -1;
        if (a.status !== "pending" && b.status === "pending") return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });

      res.json(sorted);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch admin profiles" });
    }
  });

  // API Route: Backup all profiles and settings
  app.get("/api/admin/backup", (req, res) => {
    try {
      if (!validateAdminSession(req)) {
        return res.status(403).json({ error: "Unauthorized access" });
      }

      const profiles = readDB();
      const settings = readSettings();

      res.json({
        profiles,
        settings,
        backedUpAt: new Date().toISOString(),
        version: "1.0"
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to generate backup" });
    }
  });

  // API Route: Restore profiles and settings from backup file
  app.post("/api/admin/restore", async (req, res) => {
    try {
      if (!validateAdminSession(req)) {
        return res.status(403).json({ error: "Unauthorized access" });
      }

      const { profiles, settings } = req.body;
      if (!profiles || !Array.isArray(profiles)) {
        return res.status(400).json({ error: "সঠিক ব্যাকআপ ফাইল আপলোড করুন (profiles পাওয়া যায়নি)" });
      }

      // Write to databases
      writeDB(profiles);
      if (settings) {
        await writeSettings(settings);
      }

      res.json({ success: true, message: "ডেটা সফলভাবে রিস্টোর করা হয়েছে!" });
    } catch (error) {
      res.status(500).json({ error: "Failed to restore backup" });
    }
  });

  // API Route: Approve Profile
  app.post("/api/admin/approve/:id", (req, res) => {
    try {
      if (!validateAdminSession(req)) {
        return res.status(403).json({ error: "Unauthorized access" });
      }

      const { id } = req.params;
      const profiles = readDB();
      const profile = profiles.find(p => p.id === id);

      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }

      profile.status = "approved";
      writeDB(profiles);

      res.json({ success: true, profile });
    } catch (error) {
      res.status(500).json({ error: "Failed to approve profile" });
    }
  });

  // API Route: Reject Profile
  app.post("/api/admin/reject/:id", (req, res) => {
    try {
      if (!validateAdminSession(req)) {
        return res.status(403).json({ error: "Unauthorized access" });
      }

      const { id } = req.params;
      const profiles = readDB();
      const profile = profiles.find(p => p.id === id);

      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }

      profile.status = "rejected";
      writeDB(profiles);

      res.json({ success: true, profile });
    } catch (error) {
      res.status(500).json({ error: "Failed to reject profile" });
    }
  });

  // API Route: Update Profile (Admin only)
  app.post("/api/admin/update/:id", (req, res) => {
    try {
      if (!validateAdminSession(req)) {
        return res.status(403).json({ error: "Unauthorized access" });
      }

      const { id } = req.params;
      const updatedFields = req.body;
      const profiles = readDB();
      const profileIndex = profiles.findIndex(p => p.id === id);

      if (profileIndex === -1) {
        return res.status(404).json({ error: "Profile not found" });
      }

      // Merge updated fields
      profiles[profileIndex] = {
        ...profiles[profileIndex],
        ...updatedFields,
        id // make sure ID isn't changed
      };

      writeDB(profiles);
      res.json({ success: true, profile: profiles[profileIndex] });
    } catch (error) {
      res.status(500).json({ error: "Failed to update profile" });
    }
  });

  // API Route: Delete Profile
  app.post("/api/admin/delete/:id", (req, res) => {
    try {
      if (!validateAdminSession(req)) {
        return res.status(403).json({ error: "Unauthorized access" });
      }

      const { id } = req.params;
      const profiles = readDB();
      const filtered = profiles.filter(p => p.id !== id);

      if (profiles.length === filtered.length) {
        return res.status(404).json({ error: "Profile not found" });
      }

      writeDB(filtered);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete profile" });
    }
  });

  // Helper to serve index.html with SEO injected in production
  function serveIndexHtml(res: any) {
    const indexPath = path.join(process.cwd(), "dist", "index.html");
    if (fs.existsSync(indexPath)) {
      try {
        let html = fs.readFileSync(indexPath, "utf-8");
        html = injectSeoMetadata(html);
        res.header("Content-Type", "text/html; charset=utf-8");
        res.send(html);
      } catch (e) {
        res.sendFile(indexPath);
      }
    } else {
      res.sendFile(indexPath);
    }
  }

  // Explicit route for direct browser entry or refreshing on the /rifat-admin URL
  app.get(["/rifat-admin", "/rifat-admin/"], (req, res, next) => {
    if (process.env.NODE_ENV !== "production") {
      req.url = "/";
      next();
    } else {
      serveIndexHtml(res);
    }
  });

  // Explicit route for direct browser entry or refreshing on the profile page URLs
  app.get(["/profile/:id", "/profile/:id/"], (req, res, next) => {
    if (process.env.NODE_ENV !== "production") {
      req.url = "/";
      next();
    } else {
      serveIndexHtml(res);
    }
  });

  // Vite Integration for development / static serving for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      serveIndexHtml(res);
    });
  }

  if (process.env.NETLIFY !== "true" && !process.env.LAMBDA_TASK_ROOT && !process.env.NETLIFY_DEV) {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
}

startServer();
