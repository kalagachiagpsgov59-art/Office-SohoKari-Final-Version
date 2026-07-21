export interface Profile {
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

export interface LocationData {
  district: string;
  upazilas: string[];
}

export const BANGLADESH_LOCATIONS: LocationData[] = [
  {
    district: "নারায়ণগঞ্জ",
    upazilas: ["রূপগঞ্জ", "সোনারগাঁও", "আড়াইহাজার", "সদর", "বন্দর"]
  },
  {
    district: "গাজীপুর",
    upazilas: ["কালিয়াকৈর", "শ্রীপুর", "সদর", "কাপাসিয়া", "কালীগঞ্জ"]
  },
  {
    district: "ঢাকা",
    upazilas: ["সাভার", "ধামরাই", "দোহার", "নবাবগঞ্জ", "কেরানীগঞ্জ", "সদর"]
  },
  {
    district: "কুমিল্লা",
    upazilas: ["চৌদ্দগ্রাম", "লাকসাম", "চান্দিনা", "বুড়িচং", "দাউদকান্দি", "সদর"]
  },
  {
    district: "ময়মনসিংহ",
    upazilas: ["ত্রিশাল", "ভালুকা", "গফরগাঁও", "ফুলপুর", "ঈশ্বরগঞ্জ", "সদর"]
  },
  {
    district: "সিলেট",
    upazilas: ["বিয়ানীবাজার", "গোলাপগঞ্জ", "জৈন্তাপুর", "কানাইঘাট", "সদর"]
  },
  {
    district: "চট্টগ্রাম",
    upazilas: ["হাটহাজারী", "পটিয়া", "সীতাকুণ্ড", "মিরসরাই", "সদর"]
  },
  {
    district: "বরিশাল",
    upazilas: ["বাকেরগঞ্জ", "বাবুগঞ্জ", "উজিরপুর", "মুলাদী", "সদর"]
  }
];

export const ORGANIZATIONAL_POSITIONS = [
  "সভাপতি",
  "সহ-সভাপতি",
  "সাধারণ সম্পাদক",
  "যুগ্ম সম্পাদক",
  "সাংগঠনিক সম্পাদক",
  "দপ্তর সম্পাদক",
  "কোষাধ্যক্ষ",
  "প্রচার সম্পাদক",
  "সদস্য",
  "সাধারণ সদস্য"
];
