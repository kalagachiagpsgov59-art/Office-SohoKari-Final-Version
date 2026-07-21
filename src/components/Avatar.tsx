import React, { useState } from "react";
import { getBengaliInitials, getAvatarColor } from "./ProfileCard";

interface AvatarProps {
  fullName: string;
  facebookUrl?: string;
  photo?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function extractFacebookUsername(url: string | undefined): string | null {
  if (!url) return null;
  const cleanUrl = url.trim();
  if (!cleanUrl) return null;

  try {
    // Try to parse as URL
    const urlObj = new URL(cleanUrl.startsWith("http") ? cleanUrl : `https://${cleanUrl}`);
    
    if (!/facebook\.com|fb\.com/i.test(urlObj.hostname)) {
      return null;
    }

    if (urlObj.pathname === "/profile.php") {
      const id = urlObj.searchParams.get("id");
      if (id) return id;
    }

    const paths = urlObj.pathname.split("/").filter(Boolean);
    if (paths.length > 0) {
      const ignoreList = ["people", "pages", "groups", "profile.php", "home", "messages"];
      for (const p of paths) {
        if (!ignoreList.includes(p.toLowerCase())) {
          return p;
        }
      }
    }
  } catch (err) {
    // Fallback simple regex parsing
    const match = cleanUrl.match(/(?:facebook\.com|fb\.com)\/(?:profile\.php\?id=)?([a-zA-Z0-9.]+)/i);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
}

export const Avatar: React.FC<AvatarProps> = ({ fullName, facebookUrl, photo, size = "md", className = "" }) => {
  const [imgError, setImgError] = useState(false);
  const initials = getBengaliInitials(fullName);
  const avatarBg = getAvatarColor(fullName);
  const username = extractFacebookUsername(facebookUrl);

  const sizeClasses = {
    sm: "w-9 h-9 text-xs",
    md: "w-14 h-14 text-xl",
    lg: "w-20 h-20 text-2xl",
    xl: "w-24 h-24 text-3xl",
  };

  const selectedSize = sizeClasses[size] || sizeClasses.md;

  if (photo && !imgError) {
    return (
      <div className={`relative ${selectedSize} shrink-0`}>
        <img
          src={photo}
          alt={fullName}
          onError={() => setImgError(true)}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover rounded-full border-2 border-white ring-4 ring-gray-100 shadow-md ${className}`}
        />
      </div>
    );
  }

  if (username && !imgError) {
    const fbImgUrl = `https://graph.facebook.com/${username}/picture?type=large`;
    return (
      <div className={`relative ${selectedSize} shrink-0`}>
        <img
          src={fbImgUrl}
          alt={fullName}
          onError={() => setImgError(true)}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover rounded-full border-2 border-white ring-4 ring-gray-100 shadow-md ${className}`}
        />
        {/* Subtle Facebook Badge indicator */}
        <span className="absolute bottom-0 right-0 w-4 h-4 bg-blue-600 rounded-full border border-white flex items-center justify-center text-[8px] font-bold text-white shadow-xs select-none">
          f
        </span>
      </div>
    );
  }

  return (
    <div className={`relative ${selectedSize} ${avatarBg} text-white font-bold rounded-full flex items-center justify-center shrink-0 shadow-inner uppercase border-2 border-white ring-4 ring-gray-100 ${className}`}>
      {initials}
    </div>
  );
};
