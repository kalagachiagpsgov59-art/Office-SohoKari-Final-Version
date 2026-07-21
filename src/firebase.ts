import { initializeApp, getApp, getApps } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  addDoc,
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  Timestamp
} from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

// Default Firebase configuration from firebase-applet-config.json
const defaultFirebaseConfig = {
  apiKey: "AIzaSyD8hulUNQTtYpt_zAyLdYzHCQGEXkJDwcw",
  authDomain: "officesohayok12.firebaseapp.com",
  projectId: "officesohayok12",
  storageBucket: "officesohayok12.firebasestorage.app",
  messagingSenderId: "340543194241",
  appId: "1:340543194241:web:5abb6ef6f7be479e803980",
  databaseId: ""
};

// Allow overriding via environment variables (useful for Netlify custom projects)
const metaEnv = (import.meta as any).env || {};

const firebaseConfig = {
  apiKey: metaEnv.VITE_FIREBASE_API_KEY || defaultFirebaseConfig.apiKey,
  authDomain: metaEnv.VITE_FIREBASE_AUTH_DOMAIN || defaultFirebaseConfig.authDomain,
  projectId: metaEnv.VITE_FIREBASE_PROJECT_ID || defaultFirebaseConfig.projectId,
  storageBucket: metaEnv.VITE_FIREBASE_STORAGE_BUCKET || defaultFirebaseConfig.storageBucket,
  messagingSenderId: metaEnv.VITE_FIREBASE_MESSAGING_SENDER_ID || defaultFirebaseConfig.messagingSenderId,
  appId: metaEnv.VITE_FIREBASE_APP_ID || defaultFirebaseConfig.appId,
};

const databaseId = metaEnv.VITE_FIREBASE_DATABASE_ID || defaultFirebaseConfig.databaseId;

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore
const db = databaseId ? getFirestore(app, databaseId) : getFirestore(app);

// Initialize Auth
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
// Set prompt parameter to select account every time
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Check if we should use direct client-side Firebase instead of Express backend API
// This is automatically true on Netlify or custom domains, or if explicitly configured
export const isDirectFirebaseActive = () => {
  const hostname = window.location.hostname;
  return (
    hostname.endsWith(".netlify.app") ||
    hostname === "officesohayok.netlify.app" ||
    metaEnv.VITE_USE_DIRECT_FIREBASE === "true" ||
    (hostname !== "localhost" && !hostname.endsWith(".run.app"))
  );
};

export { app, db, auth, googleProvider };

/**
 * --- Direct Firestore Data Access Functions (Serverless/Client-Side Fallback) ---
 */

// 1. Fetch settings directly from Firestore
export async function getDirectSettings() {
  try {
    const docRef = doc(db, "config", "settings");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (error) {
    console.error("Error getting settings from Firestore:", error);
    throw error;
  }
}

// 2. Fetch approved profiles directly from Firestore
export async function getDirectProfiles(filters: {
  search?: string;
  position?: string;
  district?: string;
  upazila?: string;
  unionName?: string;
  school?: string;
}) {
  try {
    const querySnapshot = await getDocs(collection(db, "profiles"));
    const profiles: any[] = [];
    querySnapshot.forEach((docSnap) => {
      profiles.push({ id: docSnap.id, ...docSnap.data() });
    });

    // Filter to only approved ones
    let filtered = profiles.filter(p => p.status === "approved");

    const banglaToEnglishDigits = (str: string) => {
      const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
      return str.replace(/[০-৯]/g, (match) => banglaDigits.indexOf(match).toString());
    };

    const englishToBanglaDigits = (str: string) => {
      const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
      return str.replace(/[0-9]/g, (match) => banglaDigits[parseInt(match, 10)]);
    };

    if (filters.search) {
      const queryStr = filters.search.toLowerCase().trim();
      const queryEn = banglaToEnglishDigits(queryStr);
      const queryBn = englishToBanglaDigits(queryStr);

      filtered = filtered.filter(p => 
        p.fullName.toLowerCase().includes(queryStr) || 
        p.fullName.toLowerCase().includes(queryEn) || 
        p.fullName.toLowerCase().includes(queryBn) || 
        p.phoneNumber.includes(queryStr) ||
        p.phoneNumber.includes(queryEn) ||
        p.phoneNumber.includes(queryBn) ||
        p.schoolName.toLowerCase().includes(queryStr) ||
        p.schoolName.toLowerCase().includes(queryEn) ||
        p.schoolName.toLowerCase().includes(queryBn) ||
        (p.username && p.username.toLowerCase().includes(queryStr)) ||
        (p.username && p.username.toLowerCase().includes(queryEn))
      );
    }

    if (filters.school) {
      const q = filters.school.toLowerCase().trim();
      filtered = filtered.filter(p => p.schoolName.toLowerCase().includes(q));
    }

    if (filters.position && filters.position !== "all") {
      filtered = filtered.filter(p => p.position === filters.position);
    }

    if (filters.district && filters.district !== "all") {
      filtered = filtered.filter(p => p.district === filters.district);
    }

    if (filters.upazila && filters.upazila !== "all") {
      filtered = filtered.filter(p => p.upazila === filters.upazila);
    }

    if (filters.unionName && filters.unionName !== "all") {
      const q = filters.unionName.toLowerCase().trim();
      filtered = filtered.filter(p => p.unionName && p.unionName.toLowerCase().includes(q));
    }

    return filtered;
  } catch (error) {
    console.error("Error getting profiles from Firestore:", error);
    throw error;
  }
}

// 3. Register/Submit Profile Request directly to Firestore
export async function submitDirectProfileRequest(profileData: any) {
  try {
    const id = "p_" + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    const newProfile = {
      ...profileData,
      id,
      status: "pending",
      createdAt: new Date().toISOString()
    };
    await setDoc(doc(db, "profiles", id), newProfile);
    return { success: true, profile: newProfile };
  } catch (error) {
    console.error("Error writing profile to Firestore:", error);
    throw error;
  }
}

// 4. Check if a username is available directly in Firestore
export async function checkDirectUsername(username: string): Promise<boolean> {
  try {
    const cleanUsername = username.trim().toLowerCase();
    const querySnapshot = await getDocs(collection(db, "profiles"));
    let exists = false;
    querySnapshot.forEach((docSnap) => {
      const p = docSnap.data();
      if (p && p.username && p.username.toLowerCase() === cleanUsername) {
        exists = true;
      }
    });
    return !exists;
  } catch (error) {
    console.error("Error checking username directly in Firestore:", error);
    return true; // default fallback
  }
}
