export interface UnionData {
  name: string;
  schools: string[];
}

export interface UpazilaData {
  name: string;
  unions: UnionData[];
}

export interface DistrictData {
  district: string;
  upazilas: UpazilaData[];
}

export const BANGLADESH_LOCATIONS_DATABASE: DistrictData[] = [
  {
    "district": "কক্সবাজার",
    "upazilas": [
      {
        "name": "ঈদগাঁও",
        "unions": []
      },
      {
        "name": "উখিয়া",
        "unions": [
          {
            "name": "জালিয়াপালং",
            "schools": []
          },
          {
            "name": "পালংখালী",
            "schools": []
          },
          {
            "name": "রত্নাপালং",
            "schools": []
          },
          {
            "name": "রাজাপালং",
            "schools": []
          },
          {
            "name": "হলদিয়াপালং",
            "schools": []
          }
        ]
      },
      {
        "name": "কক্সবাজার সদর",
        "unions": [
          {
            "name": "ইসলামপুর",
            "schools": []
          },
          {
            "name": "ইসলামাবাদ",
            "schools": []
          },
          {
            "name": "ঈদগাঁও",
            "schools": []
          },
          {
            "name": "খুরুশকুল",
            "schools": []
          },
          {
            "name": "চৌফলদন্ডী",
            "schools": []
          },
          {
            "name": "জালালাবাদ",
            "schools": []
          },
          {
            "name": "ঝিলংঝা",
            "schools": []
          },
          {
            "name": "পিএমখালী",
            "schools": []
          },
          {
            "name": "পোকখালী",
            "schools": []
          },
          {
            "name": "ভারুয়াখালী",
            "schools": []
          }
        ]
      },
      {
        "name": "কুতুবদিয়া",
        "unions": [
          {
            "name": "আলি আকবর ডেইল",
            "schools": []
          },
          {
            "name": "উত্তর ধুরুং",
            "schools": []
          },
          {
            "name": "কৈয়ারবিল",
            "schools": []
          },
          {
            "name": "দক্ষিণ ধুরুং",
            "schools": []
          },
          {
            "name": "বড়ঘোপ",
            "schools": []
          },
          {
            "name": "লেমসিখালী",
            "schools": []
          }
        ]
      },
      {
        "name": "চকরিয়া",
        "unions": [
          {
            "name": "কাইয়ার বিল",
            "schools": []
          },
          {
            "name": "কাকারা",
            "schools": []
          },
          {
            "name": "কোনাখালী",
            "schools": []
          },
          {
            "name": "খুটাখালী",
            "schools": []
          },
          {
            "name": "চিরিঙ্গা",
            "schools": []
          },
          {
            "name": "ডুলাহাজারা",
            "schools": []
          },
          {
            "name": "ঢেমুশিয়া",
            "schools": []
          },
          {
            "name": "পশ্চিম বড় ভেওলা",
            "schools": []
          },
          {
            "name": "ফাঁসিয়াখালী",
            "schools": []
          },
          {
            "name": "বড়ইতলী",
            "schools": []
          },
          {
            "name": "বদরখালী",
            "schools": []
          },
          {
            "name": "বামু বিলছড়ি",
            "schools": []
          },
          {
            "name": "ভেওলা মানিক চর",
            "schools": []
          },
          {
            "name": "শাহারবিল",
            "schools": []
          },
          {
            "name": "সুরজপুর মানিকপুর",
            "schools": []
          },
          {
            "name": "হারবাঙ্গ",
            "schools": []
          }
        ]
      },
      {
        "name": "টেকনাফ",
        "unions": [
          {
            "name": "টেকনাফ সদর",
            "schools": []
          },
          {
            "name": "বাহারছড়া",
            "schools": []
          },
          {
            "name": "সাবরাং",
            "schools": []
          },
          {
            "name": "সেন্ট মার্টিন",
            "schools": []
          },
          {
            "name": "হোয়াইক্যং",
            "schools": []
          },
          {
            "name": "হ্নীলা",
            "schools": []
          }
        ]
      },
      {
        "name": "পেকুয়া",
        "unions": [
          {
            "name": "উজানটিয়া",
            "schools": []
          },
          {
            "name": "টাইটং",
            "schools": []
          },
          {
            "name": "পেকুয়া",
            "schools": []
          },
          {
            "name": "বড় বাকিয়া",
            "schools": []
          },
          {
            "name": "মগনামা",
            "schools": []
          },
          {
            "name": "রাজাখালী",
            "schools": []
          },
          {
            "name": "শীলখালী",
            "schools": []
          }
        ]
      },
      {
        "name": "মহেশখালী",
        "unions": [
          {
            "name": "কালারমারছড়া",
            "schools": []
          },
          {
            "name": "কুতুবজোম",
            "schools": []
          },
          {
            "name": "ছোট মহেশখালী",
            "schools": []
          },
          {
            "name": "ধলঘাটা",
            "schools": []
          },
          {
            "name": "বড় মহেশখালী",
            "schools": []
          },
          {
            "name": "মাতারবাড়ী",
            "schools": []
          },
          {
            "name": "শাপলাপুর",
            "schools": []
          },
          {
            "name": "হোয়ানক",
            "schools": []
          }
        ]
      },
      {
        "name": "রামু",
        "unions": [
          {
            "name": "ঈদগড়",
            "schools": []
          },
          {
            "name": "কচ্ছপিয়া",
            "schools": []
          },
          {
            "name": "কাউয়ারখোপ",
            "schools": []
          },
          {
            "name": "খুনিয়াপালং",
            "schools": []
          },
          {
            "name": "গর্জনিয়া",
            "schools": []
          },
          {
            "name": "চাকমারকুল",
            "schools": []
          },
          {
            "name": "জোয়ারিয়া নালা",
            "schools": []
          },
          {
            "name": "দক্ষিণ মিঠাছড়ি",
            "schools": []
          },
          {
            "name": "ফতেখাঁরকুল",
            "schools": []
          },
          {
            "name": "রশীদনগর",
            "schools": []
          },
          {
            "name": "রাজারকুল",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "কিশোরগঞ্জ",
    "upazilas": [
      {
        "name": "অষ্টগ্রাম",
        "unions": [
          {
            "name": "অষ্টগ্রাম সদর",
            "schools": []
          },
          {
            "name": "আদমপুর",
            "schools": []
          },
          {
            "name": "কলমা",
            "schools": []
          },
          {
            "name": "কাস্তুল",
            "schools": []
          },
          {
            "name": "খয়েরপুর-আব্দুল্লাপুর",
            "schools": []
          },
          {
            "name": "দেওঘর",
            "schools": []
          },
          {
            "name": "পূর্ব অষ্টগ্রাম",
            "schools": []
          },
          {
            "name": "বাঙ্গালপাড়া",
            "schools": []
          }
        ]
      },
      {
        "name": "ইটনা",
        "unions": [
          {
            "name": "ইটনা",
            "schools": []
          },
          {
            "name": "এলংজুরী",
            "schools": []
          },
          {
            "name": "চৌগাংগা",
            "schools": []
          },
          {
            "name": "জয়সিদ্ধি",
            "schools": []
          },
          {
            "name": "ধনপুর",
            "schools": []
          },
          {
            "name": "বড়িবাড়ি",
            "schools": []
          },
          {
            "name": "বাদলা",
            "schools": []
          },
          {
            "name": "মৃগা",
            "schools": []
          },
          {
            "name": "রায়টুটি",
            "schools": []
          }
        ]
      },
      {
        "name": "কটিয়াদী",
        "unions": [
          {
            "name": "আচমিতা",
            "schools": []
          },
          {
            "name": "কারগাঁও",
            "schools": []
          },
          {
            "name": "চান্দপুর",
            "schools": []
          },
          {
            "name": "জালালপুর",
            "schools": []
          },
          {
            "name": "বনগ্রাম",
            "schools": []
          },
          {
            "name": "মসূয়া",
            "schools": []
          },
          {
            "name": "মুমুরদিয়া",
            "schools": []
          },
          {
            "name": "লোহাজুরী",
            "schools": []
          },
          {
            "name": "সহশ্রাম ধুলদিয়া",
            "schools": []
          }
        ]
      },
      {
        "name": "করিমগঞ্জ",
        "unions": [
          {
            "name": "কাদিরজঙ্গল",
            "schools": []
          },
          {
            "name": "কিরাটন",
            "schools": []
          },
          {
            "name": "গুজাদিয়া",
            "schools": []
          },
          {
            "name": "গুনধর",
            "schools": []
          },
          {
            "name": "জয়কা",
            "schools": []
          },
          {
            "name": "জাফরাবাদ",
            "schools": []
          },
          {
            "name": "দেহুন্দা",
            "schools": []
          },
          {
            "name": "নিয়ামতপুর",
            "schools": []
          },
          {
            "name": "নোয়াবাদ",
            "schools": []
          },
          {
            "name": "বারঘড়িয়া",
            "schools": []
          },
          {
            "name": "সুতারপাড়া",
            "schools": []
          }
        ]
      },
      {
        "name": "কিশোরগঞ্জ সদর",
        "unions": [
          {
            "name": "কর্শাকড়িয়াইল",
            "schools": []
          },
          {
            "name": "চৌদ্দশত",
            "schools": []
          },
          {
            "name": "দানাপাটুলী",
            "schools": []
          },
          {
            "name": "বিন্নাটি",
            "schools": []
          },
          {
            "name": "বৌলাই",
            "schools": []
          },
          {
            "name": "মহিনন্দ",
            "schools": []
          },
          {
            "name": "মাইজখাপন",
            "schools": []
          },
          {
            "name": "মারিয়া",
            "schools": []
          },
          {
            "name": "যশোদল",
            "schools": []
          },
          {
            "name": "রশিদাবাদ",
            "schools": []
          },
          {
            "name": "লতিবাবাদ",
            "schools": []
          }
        ]
      },
      {
        "name": "কুলিয়ারচর",
        "unions": [
          {
            "name": "উছমানপুর",
            "schools": []
          },
          {
            "name": "গোবরিয়া আব্দুল্লাহপুর",
            "schools": []
          },
          {
            "name": "ছয়সূতী",
            "schools": []
          },
          {
            "name": "ফরিদপুর",
            "schools": []
          },
          {
            "name": "রামদী",
            "schools": []
          },
          {
            "name": "সালুয়া",
            "schools": []
          }
        ]
      },
      {
        "name": "তাড়াইল",
        "unions": [
          {
            "name": "জাওয়ার",
            "schools": []
          },
          {
            "name": "তাড়াইল-সাচাইল",
            "schools": []
          },
          {
            "name": "তালজাঙ্গা",
            "schools": []
          },
          {
            "name": "দামিহা",
            "schools": []
          },
          {
            "name": "দিগদাইর",
            "schools": []
          },
          {
            "name": "ধলা",
            "schools": []
          },
          {
            "name": "রাউতি",
            "schools": []
          }
        ]
      },
      {
        "name": "নিকলী",
        "unions": [
          {
            "name": "কারপাশা",
            "schools": []
          },
          {
            "name": "গুরই",
            "schools": []
          },
          {
            "name": "ছাতিরচর",
            "schools": []
          },
          {
            "name": "জারইতলা",
            "schools": []
          },
          {
            "name": "দামপাড়া",
            "schools": []
          },
          {
            "name": "নিকলী সদর",
            "schools": []
          },
          {
            "name": "সিংপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "পাকুন্দিয়া",
        "unions": [
          {
            "name": "ইজারাসিন্দুর",
            "schools": []
          },
          {
            "name": "চান্দিপাশা",
            "schools": []
          },
          {
            "name": "চারফারাদি",
            "schools": []
          },
          {
            "name": "জাঙ্গালিয়া",
            "schools": []
          },
          {
            "name": "নারান্দি",
            "schools": []
          },
          {
            "name": "পটুয়াভাঙ্গা",
            "schools": []
          },
          {
            "name": "পাকন্দিয়া",
            "schools": []
          },
          {
            "name": "বুড়ুদিয়া",
            "schools": []
          },
          {
            "name": "সুখিয়া",
            "schools": []
          },
          {
            "name": "হোসেনদি",
            "schools": []
          }
        ]
      },
      {
        "name": "বাজিতপুর",
        "unions": [
          {
            "name": "কৈলাগ",
            "schools": []
          },
          {
            "name": "গাজীরচর",
            "schools": []
          },
          {
            "name": "দিঘীরপাড়",
            "schools": []
          },
          {
            "name": "দিলালপুর",
            "schools": []
          },
          {
            "name": "পিরিজপুর",
            "schools": []
          },
          {
            "name": "বলিয়ার্দী",
            "schools": []
          },
          {
            "name": "মাইজচর",
            "schools": []
          },
          {
            "name": "সরারচর",
            "schools": []
          },
          {
            "name": "হালিমপুর",
            "schools": []
          },
          {
            "name": "হিলচিয়া",
            "schools": []
          },
          {
            "name": "হুমাইপর",
            "schools": []
          }
        ]
      },
      {
        "name": "ভৈরব",
        "unions": [
          {
            "name": "আগানগর",
            "schools": []
          },
          {
            "name": "কালিকা প্রসাদ",
            "schools": []
          },
          {
            "name": "গজারিয়া",
            "schools": []
          },
          {
            "name": "শিবপুর",
            "schools": []
          },
          {
            "name": "শিমুলকান্দি",
            "schools": []
          },
          {
            "name": "শ্রীনগর",
            "schools": []
          },
          {
            "name": "সাদেকপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "মিঠামইন",
        "unions": [
          {
            "name": "কাটখাল",
            "schools": []
          },
          {
            "name": "কেওয়ারজোর",
            "schools": []
          },
          {
            "name": "গোপদিঘী",
            "schools": []
          },
          {
            "name": "ঘাগড়া",
            "schools": []
          },
          {
            "name": "ঢাকী",
            "schools": []
          },
          {
            "name": "বৈরাটি",
            "schools": []
          },
          {
            "name": "মিঠামইন",
            "schools": []
          }
        ]
      },
      {
        "name": "হোসেনপুর",
        "unions": [
          {
            "name": "আড়াইবাড়িয়া",
            "schools": []
          },
          {
            "name": "গোবিন্দপুর",
            "schools": []
          },
          {
            "name": "জিনারী",
            "schools": []
          },
          {
            "name": "পুমদি",
            "schools": []
          },
          {
            "name": "সাহেদল",
            "schools": []
          },
          {
            "name": "সিদলা",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "কুড়িগ্রাম",
    "upazilas": [
      {
        "name": "উলিপুর",
        "unions": [
          {
            "name": "গুনাইগাছ",
            "schools": []
          },
          {
            "name": "তবকপুর",
            "schools": []
          },
          {
            "name": "থেতরাই",
            "schools": []
          },
          {
            "name": "দলদলিয়া",
            "schools": []
          },
          {
            "name": "দুর্গাপুর",
            "schools": []
          },
          {
            "name": "ধরণীবাড়ী",
            "schools": []
          },
          {
            "name": "ধামশ্রেণী",
            "schools": []
          },
          {
            "name": "পান্ডুল",
            "schools": []
          },
          {
            "name": "বজরা",
            "schools": []
          },
          {
            "name": "বুড়াবুড়ী",
            "schools": []
          },
          {
            "name": "বেগমগঞ্জ",
            "schools": []
          },
          {
            "name": "সাহেবের আলগা",
            "schools": []
          },
          {
            "name": "হাতিয়া",
            "schools": []
          }
        ]
      },
      {
        "name": "কুড়িগ্রাম সদর",
        "unions": [
          {
            "name": "কাঁঠালবাড়ী",
            "schools": []
          },
          {
            "name": "ঘোগাদহ",
            "schools": []
          },
          {
            "name": "পাঁচগাছি",
            "schools": []
          },
          {
            "name": "বেলগাছা",
            "schools": []
          },
          {
            "name": "ভোগডাঙ্গা",
            "schools": []
          },
          {
            "name": "মোগলবাসা",
            "schools": []
          },
          {
            "name": "যাত্রাপুর",
            "schools": []
          },
          {
            "name": "হলোখানা",
            "schools": []
          }
        ]
      },
      {
        "name": "চর রাজিবপুর",
        "unions": [
          {
            "name": "কোদালকাটি",
            "schools": []
          },
          {
            "name": "মোহনগঞ্জ",
            "schools": []
          },
          {
            "name": "রাজিবপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "চিলমারী",
        "unions": [
          {
            "name": "অষ্টমীর চর",
            "schools": []
          },
          {
            "name": "চিলমারী",
            "schools": []
          },
          {
            "name": "থানাহাট",
            "schools": []
          },
          {
            "name": "নয়ারহাট",
            "schools": []
          },
          {
            "name": "রমনা",
            "schools": []
          },
          {
            "name": "রাণীগঞ্জ",
            "schools": []
          }
        ]
      },
      {
        "name": "নাগেশ্বরী",
        "unions": [
          {
            "name": "কঁচাকাঁটা",
            "schools": []
          },
          {
            "name": "কালীগঞ্জ",
            "schools": []
          },
          {
            "name": "কেদার",
            "schools": []
          },
          {
            "name": "নারায়নপুর",
            "schools": []
          },
          {
            "name": "নুনখাওয়া",
            "schools": []
          },
          {
            "name": "নেওয়াশী",
            "schools": []
          },
          {
            "name": "বল্লভেরখাস",
            "schools": []
          },
          {
            "name": "বামনডাঙ্গা",
            "schools": []
          },
          {
            "name": "বেরুবাড়ী",
            "schools": []
          },
          {
            "name": "ভিতরবন্দ",
            "schools": []
          },
          {
            "name": "রামখানা",
            "schools": []
          },
          {
            "name": "রায়গঞ্জ",
            "schools": []
          },
          {
            "name": "সন্তোষপুর",
            "schools": []
          },
          {
            "name": "হাসনাবাদ",
            "schools": []
          }
        ]
      },
      {
        "name": "ফুলবাড়ী",
        "unions": [
          {
            "name": "কাশিপুর",
            "schools": []
          },
          {
            "name": "নাওডাঙ্গা",
            "schools": []
          },
          {
            "name": "ফুলবাড়ী",
            "schools": []
          },
          {
            "name": "বড়ভিটা",
            "schools": []
          },
          {
            "name": "ভাঙ্গামোড়",
            "schools": []
          },
          {
            "name": "শিমুলবাড়ী",
            "schools": []
          }
        ]
      },
      {
        "name": "ভুরুঙ্গামারী",
        "unions": [
          {
            "name": "আন্ধারীরঝাড়",
            "schools": []
          },
          {
            "name": "চর-ভূরুঙ্গামারী",
            "schools": []
          },
          {
            "name": "জয়মনিরহাট",
            "schools": []
          },
          {
            "name": "তিলাই",
            "schools": []
          },
          {
            "name": "পাইকেরছড়া",
            "schools": []
          },
          {
            "name": "পাথরডুবি",
            "schools": []
          },
          {
            "name": "বঙ্গসোনাহাট",
            "schools": []
          },
          {
            "name": "বলদিয়া",
            "schools": []
          },
          {
            "name": "ভূরুঙ্গামারী",
            "schools": []
          },
          {
            "name": "শিলখুড়ি",
            "schools": []
          }
        ]
      },
      {
        "name": "রাজারহাট",
        "unions": [
          {
            "name": "উমর মজিদ",
            "schools": []
          },
          {
            "name": "ঘড়িয়ালডাঙ্গা",
            "schools": []
          },
          {
            "name": "চাকিরপশার",
            "schools": []
          },
          {
            "name": "ছিনাই",
            "schools": []
          },
          {
            "name": "নাজিমখাঁন",
            "schools": []
          },
          {
            "name": "বিদ্যানন্দ",
            "schools": []
          },
          {
            "name": "রাজারহাট",
            "schools": []
          }
        ]
      },
      {
        "name": "রৌমারী",
        "unions": [
          {
            "name": "দাঁতভাঙ্গা",
            "schools": []
          },
          {
            "name": "বন্দবেড়",
            "schools": []
          },
          {
            "name": "যাদুরচর",
            "schools": []
          },
          {
            "name": "রৌমারী",
            "schools": []
          },
          {
            "name": "শৌলমারী",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "কুমিল্লা",
    "upazilas": [
      {
        "name": "কুমিল্লা সদর",
        "unions": [
          {
            "name": "আমড়াতলী",
            "schools": []
          },
          {
            "name": "উত্তর দুর্গাপুর",
            "schools": []
          },
          {
            "name": "কালীর বাজার",
            "schools": []
          },
          {
            "name": "জগন্নাথপুর",
            "schools": []
          },
          {
            "name": "দক্ষিন দুর্গাপুর",
            "schools": []
          },
          {
            "name": "পাঁচথুবী",
            "schools": []
          }
        ]
      },
      {
        "name": "চান্দিনা",
        "unions": [
          {
            "name": "এতবারপুর",
            "schools": []
          },
          {
            "name": "কেরণখাল",
            "schools": []
          },
          {
            "name": "গল্লাই",
            "schools": []
          },
          {
            "name": "জোয়াগ",
            "schools": []
          },
          {
            "name": "দোল্লাই নবাবপুর",
            "schools": []
          },
          {
            "name": "বরকইট",
            "schools": []
          },
          {
            "name": "বরকরই",
            "schools": []
          },
          {
            "name": "বাড়েরা",
            "schools": []
          },
          {
            "name": "বাতাঘাসি",
            "schools": []
          },
          {
            "name": "মহিচাইল",
            "schools": []
          },
          {
            "name": "মাইজখার",
            "schools": []
          },
          {
            "name": "মাধাইয়া",
            "schools": []
          },
          {
            "name": "সুহিলপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "চৌদ্দগ্রাম",
        "unions": [
          {
            "name": "আলকরা",
            "schools": []
          },
          {
            "name": "কনকাপৈত",
            "schools": []
          },
          {
            "name": "কালিকাপুর",
            "schools": []
          },
          {
            "name": "কাশিনগর",
            "schools": []
          },
          {
            "name": "গুনবতী",
            "schools": []
          },
          {
            "name": "ঘোলপাশা",
            "schools": []
          },
          {
            "name": "চিওড়া",
            "schools": []
          },
          {
            "name": "জগন্নাথদিঘী",
            "schools": []
          },
          {
            "name": "বাতিসা",
            "schools": []
          },
          {
            "name": "মুন্সীরহাট",
            "schools": []
          },
          {
            "name": "শুভপুর",
            "schools": []
          },
          {
            "name": "শ্রীপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "তিতাস",
        "unions": [
          {
            "name": "কড়িকান্দি",
            "schools": []
          },
          {
            "name": "কলাকান্দি",
            "schools": []
          },
          {
            "name": "জগতপুর",
            "schools": []
          },
          {
            "name": "জিয়ারকান্দি",
            "schools": []
          },
          {
            "name": "নারান্দিয়া",
            "schools": []
          },
          {
            "name": "বলরামপুর",
            "schools": []
          },
          {
            "name": "ভিটিকান্দি",
            "schools": []
          },
          {
            "name": "মজিদপুর",
            "schools": []
          },
          {
            "name": "সাতানী",
            "schools": []
          }
        ]
      },
      {
        "name": "দাউদকান্দি",
        "unions": [
          {
            "name": "উত্তর ইলিয়টগঞ্জ",
            "schools": []
          },
          {
            "name": "গোয়ালমারী",
            "schools": []
          },
          {
            "name": "গৌরীপুর",
            "schools": []
          },
          {
            "name": "জিংলাতলী",
            "schools": []
          },
          {
            "name": "দক্ষিন ইলিয়টগঞ্জ",
            "schools": []
          },
          {
            "name": "দাউদকান্দি",
            "schools": []
          },
          {
            "name": "দৌলতপুর",
            "schools": []
          },
          {
            "name": "পদুয়া",
            "schools": []
          },
          {
            "name": "পশ্চিম পাচঁগাছিয়া",
            "schools": []
          },
          {
            "name": "পশ্চিম মোহাম্মদপুর",
            "schools": []
          },
          {
            "name": "পুর্ব মোহাম্মদপুর",
            "schools": []
          },
          {
            "name": "বারপাড়া",
            "schools": []
          },
          {
            "name": "বিটেশ্বর",
            "schools": []
          },
          {
            "name": "মারুকা",
            "schools": []
          },
          {
            "name": "সুন্দলপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "দেবিদ্বার",
        "unions": [
          {
            "name": "ইউসুফপুর",
            "schools": []
          },
          {
            "name": "উত্তর গুনাইঘর",
            "schools": []
          },
          {
            "name": "এলাহাবাদ",
            "schools": []
          },
          {
            "name": "জাফরগঞ্জ",
            "schools": []
          },
          {
            "name": "দক্ষিণ গুনাইঘর",
            "schools": []
          },
          {
            "name": "ধামতী",
            "schools": []
          },
          {
            "name": "ফতেহাবাদ",
            "schools": []
          },
          {
            "name": "বড়শালঘর",
            "schools": []
          },
          {
            "name": "বরকামতা",
            "schools": []
          },
          {
            "name": "ভানী",
            "schools": []
          },
          {
            "name": "মোহনপুর",
            "schools": []
          },
          {
            "name": "রসুলপুর",
            "schools": []
          },
          {
            "name": "রাজামেহার",
            "schools": []
          },
          {
            "name": "সুবিল",
            "schools": []
          },
          {
            "name": "সুলতানপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "নাঙ্গলকোট",
        "unions": [
          {
            "name": "আদ্রা",
            "schools": []
          },
          {
            "name": "জোড্ডা",
            "schools": []
          },
          {
            "name": "ঢালুয়া",
            "schools": []
          },
          {
            "name": "দৌলখাঁড়",
            "schools": []
          },
          {
            "name": "পেরিয়া",
            "schools": []
          },
          {
            "name": "বক্সগঞ্জ",
            "schools": []
          },
          {
            "name": "বাঙ্গড্ডা",
            "schools": []
          },
          {
            "name": "মক্রবপুর",
            "schools": []
          },
          {
            "name": "মোকরা",
            "schools": []
          },
          {
            "name": "রায়কোট",
            "schools": []
          },
          {
            "name": "সাতবাড়ীয়া",
            "schools": []
          },
          {
            "name": "হেসাখাল",
            "schools": []
          }
        ]
      },
      {
        "name": "বরুড়া",
        "unions": [
          {
            "name": "আগানগর",
            "schools": []
          },
          {
            "name": "আড্ডা",
            "schools": []
          },
          {
            "name": "আদ্রা",
            "schools": []
          },
          {
            "name": "উত্তর খোশবাস",
            "schools": []
          },
          {
            "name": "উত্তর শিলমুড়ি",
            "schools": []
          },
          {
            "name": "গালিমপুর",
            "schools": []
          },
          {
            "name": "চিতড্ডা",
            "schools": []
          },
          {
            "name": "ঝলম",
            "schools": []
          },
          {
            "name": "দক্ষিন খোশবাস",
            "schools": []
          },
          {
            "name": "দক্ষিন শিলমুড়ি",
            "schools": []
          },
          {
            "name": "পয়ালগাছা",
            "schools": []
          },
          {
            "name": "ভবানীপুর",
            "schools": []
          },
          {
            "name": "ভাউকসার",
            "schools": []
          },
          {
            "name": "লক্ষীপুর",
            "schools": []
          },
          {
            "name": "শাকপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "বুড়িচং",
        "unions": [
          {
            "name": "পীরযাত্রাপুর",
            "schools": []
          },
          {
            "name": "বাকশীমূল",
            "schools": []
          },
          {
            "name": "বুড়িচং সদর",
            "schools": []
          },
          {
            "name": "ভারেল্লা",
            "schools": []
          },
          {
            "name": "ময়নামতি",
            "schools": []
          },
          {
            "name": "মোকাম",
            "schools": []
          },
          {
            "name": "রাজাপুর",
            "schools": []
          },
          {
            "name": "ষোলনল",
            "schools": []
          }
        ]
      },
      {
        "name": "ব্রাহ্মণপাড়া",
        "unions": [
          {
            "name": "চান্দলা",
            "schools": []
          },
          {
            "name": "দুলালপুর",
            "schools": []
          },
          {
            "name": "ব্রাহ্মনপাড়া সদর",
            "schools": []
          },
          {
            "name": "মাধবপুর",
            "schools": []
          },
          {
            "name": "মালাপাড়া",
            "schools": []
          },
          {
            "name": "শশীদল",
            "schools": []
          },
          {
            "name": "শিদলাই",
            "schools": []
          },
          {
            "name": "সাহেবাবাদ",
            "schools": []
          }
        ]
      },
      {
        "name": "মনোহরগঞ্জ",
        "unions": [
          {
            "name": "উত্তর হাওলা",
            "schools": []
          },
          {
            "name": "খিলা",
            "schools": []
          },
          {
            "name": "ঝলম (উত্তর)",
            "schools": []
          },
          {
            "name": "ঝলম (দক্ষিন)",
            "schools": []
          },
          {
            "name": "নাথেরপেটুয়া",
            "schools": []
          },
          {
            "name": "বাইশগাঁও",
            "schools": []
          },
          {
            "name": "বিপুলাসার",
            "schools": []
          },
          {
            "name": "মৈশাতুয়া",
            "schools": []
          },
          {
            "name": "লক্ষনপুর",
            "schools": []
          },
          {
            "name": "সরসপুর",
            "schools": []
          },
          {
            "name": "হাসনাবাদ",
            "schools": []
          }
        ]
      },
      {
        "name": "মুরাদনগর",
        "unions": [
          {
            "name": "আকুবপুর",
            "schools": []
          },
          {
            "name": "আন্দিকোট",
            "schools": []
          },
          {
            "name": "কামাল্লা",
            "schools": []
          },
          {
            "name": "চাপিতলা",
            "schools": []
          },
          {
            "name": "ছালিয়াকান্দি",
            "schools": []
          },
          {
            "name": "জাহাপুর",
            "schools": []
          },
          {
            "name": "টনকী",
            "schools": []
          },
          {
            "name": "দারোরা",
            "schools": []
          },
          {
            "name": "ধামঘর",
            "schools": []
          },
          {
            "name": "নবীপুর (পশ্চিম)",
            "schools": []
          },
          {
            "name": "নবীপুর (পুর্ব)",
            "schools": []
          },
          {
            "name": "পাহাড়পুর",
            "schools": []
          },
          {
            "name": "পুর্বধৈইর (পশ্চিম)",
            "schools": []
          },
          {
            "name": "পুর্বধৈইর (পুর্ব)",
            "schools": []
          },
          {
            "name": "বাঙ্গরা (পশ্চিম)",
            "schools": []
          },
          {
            "name": "বাঙ্গরা (পূর্ব)",
            "schools": []
          },
          {
            "name": "বাবুটিপাড়া",
            "schools": []
          },
          {
            "name": "মুরাদনগর সদর",
            "schools": []
          },
          {
            "name": "যাত্রাপুর",
            "schools": []
          },
          {
            "name": "রামচন্দ্রপুর (উত্তর)",
            "schools": []
          },
          {
            "name": "রামচন্দ্রপুর (দক্ষিন)",
            "schools": []
          },
          {
            "name": "শ্রীকাইল",
            "schools": []
          }
        ]
      },
      {
        "name": "মেঘনা",
        "unions": [
          {
            "name": "গোবিন্দপুর",
            "schools": []
          },
          {
            "name": "চন্দনপুর",
            "schools": []
          },
          {
            "name": "চালিভাঙ্গা",
            "schools": []
          },
          {
            "name": "বড়কান্দা",
            "schools": []
          },
          {
            "name": "ভাওরখোলা",
            "schools": []
          },
          {
            "name": "মানিকারচর",
            "schools": []
          },
          {
            "name": "রাধানগর",
            "schools": []
          },
          {
            "name": "লুটেরচর",
            "schools": []
          }
        ]
      },
      {
        "name": "লাকসাম",
        "unions": [
          {
            "name": "আজগরা",
            "schools": []
          },
          {
            "name": "উত্তরদা",
            "schools": []
          },
          {
            "name": "কান্দিরপাড়",
            "schools": []
          },
          {
            "name": "গোবিন্দপুর",
            "schools": []
          },
          {
            "name": "বাকই",
            "schools": []
          },
          {
            "name": "মুদাফফর গঞ্জ",
            "schools": []
          },
          {
            "name": "লাকসাম পুর্ব",
            "schools": []
          }
        ]
      },
      {
        "name": "লালমাই",
        "unions": [
          {
            "name": "পেরুল (উত্তর)",
            "schools": []
          },
          {
            "name": "পেরুল (দক্ষিন)",
            "schools": []
          },
          {
            "name": "বাগমারা (উত্তর)",
            "schools": []
          },
          {
            "name": "বাগমারা (দক্ষিন)",
            "schools": []
          },
          {
            "name": "বেলঘর (উত্তর)",
            "schools": []
          },
          {
            "name": "বেলঘর (দক্ষিন)",
            "schools": []
          },
          {
            "name": "ভূলইন (উত্তর)",
            "schools": []
          },
          {
            "name": "ভূলইন (দক্ষিন)",
            "schools": []
          }
        ]
      },
      {
        "name": "সদর দক্ষিণ",
        "unions": [
          {
            "name": "গলিয়ারা",
            "schools": []
          },
          {
            "name": "চৌয়ারা",
            "schools": []
          },
          {
            "name": "জোড়কানন (পশ্চিম)",
            "schools": []
          },
          {
            "name": "জোড়কানন (পুর্ব)",
            "schools": []
          },
          {
            "name": "পেরুল (উত্তর)",
            "schools": []
          },
          {
            "name": "পেরুল (দক্ষিন)",
            "schools": []
          },
          {
            "name": "বাগমারা (উত্তর)",
            "schools": []
          },
          {
            "name": "বাগমারা (দক্ষিন)",
            "schools": []
          },
          {
            "name": "বারপাড়া",
            "schools": []
          },
          {
            "name": "বিজয়পুর",
            "schools": []
          },
          {
            "name": "বেলঘর (উত্তর)",
            "schools": []
          },
          {
            "name": "বেলঘর (দক্ষিন)",
            "schools": []
          },
          {
            "name": "ভূলইন (উত্তর)",
            "schools": []
          },
          {
            "name": "ভূলইন (দক্ষিন)",
            "schools": []
          }
        ]
      },
      {
        "name": "হোমনা",
        "unions": [
          {
            "name": "আছাদপুর",
            "schools": []
          },
          {
            "name": "ঘাগুটিয়া",
            "schools": []
          },
          {
            "name": "ঘারমোড়া",
            "schools": []
          },
          {
            "name": "চান্দেরচর",
            "schools": []
          },
          {
            "name": "জয়পুর",
            "schools": []
          },
          {
            "name": "দুলালপুর",
            "schools": []
          },
          {
            "name": "নিলখী",
            "schools": []
          },
          {
            "name": "ভাষানিয়া",
            "schools": []
          },
          {
            "name": "মাথাভাঙ্গা",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "কুষ্টিয়া",
    "upazilas": [
      {
        "name": "কুমারখালী",
        "unions": [
          {
            "name": "কয়া",
            "schools": []
          },
          {
            "name": "চরসাদীপুর",
            "schools": []
          },
          {
            "name": "চাঁদপুর",
            "schools": []
          },
          {
            "name": "চাপড়া",
            "schools": []
          },
          {
            "name": "জগন্নাথপুর",
            "schools": []
          },
          {
            "name": "নন্দলালপুর",
            "schools": []
          },
          {
            "name": "পান্টি",
            "schools": []
          },
          {
            "name": "বাগুলাট",
            "schools": []
          },
          {
            "name": "যদুবয়রা",
            "schools": []
          },
          {
            "name": "শিলাইদহ",
            "schools": []
          },
          {
            "name": "সদকী",
            "schools": []
          }
        ]
      },
      {
        "name": "কুষ্টিয়া সদর",
        "unions": [
          {
            "name": "আইলচারা",
            "schools": []
          },
          {
            "name": "আব্দালপুর",
            "schools": []
          },
          {
            "name": "আলামপুর",
            "schools": []
          },
          {
            "name": "উজানগ্রাম",
            "schools": []
          },
          {
            "name": "গোস্বামী দুর্গাপুর",
            "schools": []
          },
          {
            "name": "জিয়ারাখী",
            "schools": []
          },
          {
            "name": "ঝাউদিয়া",
            "schools": []
          },
          {
            "name": "পাটিকাবাড়ী",
            "schools": []
          },
          {
            "name": "বটতৈল",
            "schools": []
          },
          {
            "name": "বারখাদা",
            "schools": []
          },
          {
            "name": "মজমপুর",
            "schools": []
          },
          {
            "name": "মনোহরদিয়া",
            "schools": []
          },
          {
            "name": "হরিনারায়নপুর",
            "schools": []
          },
          {
            "name": "হাটশ হরিপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "খোকসা",
        "unions": [
          {
            "name": "আমবাড়ীয়া",
            "schools": []
          },
          {
            "name": "ওসমানপুর",
            "schools": []
          },
          {
            "name": "খোকসা",
            "schools": []
          },
          {
            "name": "গোপগ্রাম",
            "schools": []
          },
          {
            "name": "জয়ন্তীহাজরা",
            "schools": []
          },
          {
            "name": "জানিপুর",
            "schools": []
          },
          {
            "name": "বেতবাড়ীয়া",
            "schools": []
          },
          {
            "name": "শিমুলিয়া",
            "schools": []
          },
          {
            "name": "শোমসপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "দৌলতপুর",
        "unions": [
          {
            "name": "আড়িয়া",
            "schools": []
          },
          {
            "name": "খলিশাকুন্ডি",
            "schools": []
          },
          {
            "name": "চিলমারী",
            "schools": []
          },
          {
            "name": "ড়ীয়া",
            "schools": []
          },
          {
            "name": "দৌলতপুর",
            "schools": []
          },
          {
            "name": "পিয়ারপুর",
            "schools": []
          },
          {
            "name": "প্রাগপুর",
            "schools": []
          },
          {
            "name": "ফিলিপনগর",
            "schools": []
          },
          {
            "name": "বোয়ালি",
            "schools": []
          },
          {
            "name": "মথুরাপুর",
            "schools": []
          },
          {
            "name": "মরিচা",
            "schools": []
          },
          {
            "name": "রামকৃষ্ণপুর",
            "schools": []
          },
          {
            "name": "রিফাইতপুর",
            "schools": []
          },
          {
            "name": "হোগলবাড়ীয়া",
            "schools": []
          }
        ]
      },
      {
        "name": "ভেড়ামারা",
        "unions": [
          {
            "name": "চাঁদগ্রাম",
            "schools": []
          },
          {
            "name": "জুনিয়াদহ",
            "schools": []
          },
          {
            "name": "ধরমপুর",
            "schools": []
          },
          {
            "name": "বাহাদুরপুর",
            "schools": []
          },
          {
            "name": "বাহিরচর",
            "schools": []
          },
          {
            "name": "মোকারিমপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "মিরপুর",
        "unions": [
          {
            "name": "আমবাড়ীয়া",
            "schools": []
          },
          {
            "name": "আমলা",
            "schools": []
          },
          {
            "name": "কুর্শা",
            "schools": []
          },
          {
            "name": "চিথলিয়া",
            "schools": []
          },
          {
            "name": "ছাতিয়ান",
            "schools": []
          },
          {
            "name": "তালবাড়ীয়া",
            "schools": []
          },
          {
            "name": "ধূবইল",
            "schools": []
          },
          {
            "name": "পোড়াদহ",
            "schools": []
          },
          {
            "name": "ফুলবাড়ীয়া",
            "schools": []
          },
          {
            "name": "বহলবাড়ীয়া",
            "schools": []
          },
          {
            "name": "বারুইপাড়া",
            "schools": []
          },
          {
            "name": "মালিহাদ",
            "schools": []
          },
          {
            "name": "সদরপুর",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "খাগড়াছড়ি",
    "upazilas": [
      {
        "name": "খাগড়াছড়ি সদর",
        "unions": [
          {
            "name": "কমলছড়ি",
            "schools": []
          },
          {
            "name": "খাগরাছড়ি সদর",
            "schools": []
          },
          {
            "name": "গোলাবাড়ী",
            "schools": []
          },
          {
            "name": "পেরাছড়া",
            "schools": []
          }
        ]
      },
      {
        "name": "গুইমারা",
        "unions": []
      },
      {
        "name": "দিঘীনালা",
        "unions": [
          {
            "name": "কবাখালী",
            "schools": []
          },
          {
            "name": "দিঘীনালা",
            "schools": []
          },
          {
            "name": "বাবুছড়া",
            "schools": []
          },
          {
            "name": "বোয়ালখালী",
            "schools": []
          },
          {
            "name": "মেরুং",
            "schools": []
          }
        ]
      },
      {
        "name": "পানছড়ি",
        "unions": [
          {
            "name": "চেংগী",
            "schools": []
          },
          {
            "name": "পানছড়ি",
            "schools": []
          },
          {
            "name": "লতিবান",
            "schools": []
          },
          {
            "name": "লোগাং",
            "schools": []
          }
        ]
      },
      {
        "name": "মহালছড়ি",
        "unions": [
          {
            "name": "ক্যায়াংঘাট",
            "schools": []
          },
          {
            "name": "ভাইবোনছড়া",
            "schools": []
          },
          {
            "name": "মহালছড়ি",
            "schools": []
          },
          {
            "name": "মাইসছড়ি",
            "schools": []
          },
          {
            "name": "মুবাছড়ি",
            "schools": []
          }
        ]
      },
      {
        "name": "মাটিরাঙ্গা",
        "unions": [
          {
            "name": "আমতলি",
            "schools": []
          },
          {
            "name": "গুইমারা",
            "schools": []
          },
          {
            "name": "গোমতি",
            "schools": []
          },
          {
            "name": "তবলছড়ি",
            "schools": []
          },
          {
            "name": "তাইন্দং",
            "schools": []
          },
          {
            "name": "বর্ণাল",
            "schools": []
          },
          {
            "name": "বেলছড়ি",
            "schools": []
          },
          {
            "name": "মাটিরাঙ্গা",
            "schools": []
          }
        ]
      },
      {
        "name": "মানিকছড়ি",
        "unions": [
          {
            "name": "তিনটহরী",
            "schools": []
          },
          {
            "name": "বাটনাতলী",
            "schools": []
          },
          {
            "name": "মানিকছড়ি",
            "schools": []
          },
          {
            "name": "যোগ্যছোলা",
            "schools": []
          }
        ]
      },
      {
        "name": "রামগড়",
        "unions": [
          {
            "name": "পাতাছড়া",
            "schools": []
          },
          {
            "name": "রামগড়",
            "schools": []
          },
          {
            "name": "হাফছড়ি",
            "schools": []
          }
        ]
      },
      {
        "name": "লক্ষীছড়ি",
        "unions": [
          {
            "name": "দুল্যাতলী",
            "schools": []
          },
          {
            "name": "বর্মাছড়ি",
            "schools": []
          },
          {
            "name": "লক্ষীছড়ি",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "খুলনা",
    "upazilas": [
      {
        "name": "কয়রা",
        "unions": [
          {
            "name": "আমাদি",
            "schools": []
          },
          {
            "name": "উত্তর বেদকাশী",
            "schools": []
          },
          {
            "name": "কয়রা",
            "schools": []
          },
          {
            "name": "দক্ষিণ বেদকাশী",
            "schools": []
          },
          {
            "name": "বাগালী",
            "schools": []
          },
          {
            "name": "মহারাজপুর",
            "schools": []
          },
          {
            "name": "মহেশ্বরীপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "ডুমুরিয়া",
        "unions": [
          {
            "name": "আটলিয়া",
            "schools": []
          },
          {
            "name": "খর্ণিয়া",
            "schools": []
          },
          {
            "name": "গুটুদিয়া",
            "schools": []
          },
          {
            "name": "ডুমুরিয়া",
            "schools": []
          },
          {
            "name": "ধামালিয়া",
            "schools": []
          },
          {
            "name": "ভান্ডারপাড়া",
            "schools": []
          },
          {
            "name": "মাগুরখালি",
            "schools": []
          },
          {
            "name": "মাগুরাঘোনা",
            "schools": []
          },
          {
            "name": "রংপুর",
            "schools": []
          },
          {
            "name": "রঘুনাথপুর",
            "schools": []
          },
          {
            "name": "রুদাঘরা",
            "schools": []
          },
          {
            "name": "শরাফপুর",
            "schools": []
          },
          {
            "name": "শোভনা",
            "schools": []
          },
          {
            "name": "সাহস",
            "schools": []
          }
        ]
      },
      {
        "name": "তেরখাদা",
        "unions": [
          {
            "name": "আজগড়া",
            "schools": []
          },
          {
            "name": "ছাগলাদহ",
            "schools": []
          },
          {
            "name": "তেরখাদা",
            "schools": []
          },
          {
            "name": "বারাসাত",
            "schools": []
          },
          {
            "name": "মধুপুর",
            "schools": []
          },
          {
            "name": "সাচিয়াদাহ",
            "schools": []
          }
        ]
      },
      {
        "name": "দাকোপ",
        "unions": [
          {
            "name": "কামারখোলা",
            "schools": []
          },
          {
            "name": "কৈলাশগঞ্জ",
            "schools": []
          },
          {
            "name": "তিলডাঙ্গা",
            "schools": []
          },
          {
            "name": "দাকোপ",
            "schools": []
          },
          {
            "name": "পানখালী",
            "schools": []
          },
          {
            "name": "বাজুয়া",
            "schools": []
          },
          {
            "name": "বানিশান্তা",
            "schools": []
          },
          {
            "name": "লাউডোব",
            "schools": []
          },
          {
            "name": "সুতারখালী",
            "schools": []
          }
        ]
      },
      {
        "name": "দিঘলিয়া",
        "unions": [
          {
            "name": "আড়ংঘাটা",
            "schools": []
          },
          {
            "name": "গাজীরহাট",
            "schools": []
          },
          {
            "name": "দিঘলিয়া",
            "schools": []
          },
          {
            "name": "বারাকপুর",
            "schools": []
          },
          {
            "name": "যোগীপোল",
            "schools": []
          },
          {
            "name": "সেনহাটি",
            "schools": []
          }
        ]
      },
      {
        "name": "পাইকগাছা",
        "unions": [
          {
            "name": "কপিলমুনি",
            "schools": []
          },
          {
            "name": "গড়ইখালী",
            "schools": []
          },
          {
            "name": "গদাইপুর",
            "schools": []
          },
          {
            "name": "চাঁদখালী",
            "schools": []
          },
          {
            "name": "দেলুটি",
            "schools": []
          },
          {
            "name": "রাড়ুলী",
            "schools": []
          },
          {
            "name": "লতা",
            "schools": []
          },
          {
            "name": "লস্কর",
            "schools": []
          },
          {
            "name": "সোলাদানা",
            "schools": []
          },
          {
            "name": "হরিঢালী",
            "schools": []
          }
        ]
      },
      {
        "name": "ফুলতলা",
        "unions": [
          {
            "name": "আটরা গিলাতলা",
            "schools": []
          },
          {
            "name": "জামিরা",
            "schools": []
          },
          {
            "name": "দামোদর",
            "schools": []
          },
          {
            "name": "ফুলতলা",
            "schools": []
          }
        ]
      },
      {
        "name": "বটিয়াঘাটা",
        "unions": [
          {
            "name": "আমিরপুর",
            "schools": []
          },
          {
            "name": "গঙ্গারামপুর",
            "schools": []
          },
          {
            "name": "জলমা",
            "schools": []
          },
          {
            "name": "বটিয়াঘাটা",
            "schools": []
          },
          {
            "name": "বালিয়াডাঙ্গা",
            "schools": []
          },
          {
            "name": "ভান্ডারকোট",
            "schools": []
          },
          {
            "name": "সুরখালী",
            "schools": []
          }
        ]
      },
      {
        "name": "রূপসা",
        "unions": [
          {
            "name": "আইচগাতী",
            "schools": []
          },
          {
            "name": "ঘাটভোগ",
            "schools": []
          },
          {
            "name": "টিএসবি",
            "schools": []
          },
          {
            "name": "নৈহাটি",
            "schools": []
          },
          {
            "name": "শ্রীফলতলা",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "গাইবান্ধা",
    "upazilas": [
      {
        "name": "গাইবান্ধা সদর",
        "unions": [
          {
            "name": "কামারজানি",
            "schools": []
          },
          {
            "name": "কুপতলা",
            "schools": []
          },
          {
            "name": "খোলাহাটী",
            "schools": []
          },
          {
            "name": "গিদারী",
            "schools": []
          },
          {
            "name": "ঘাগোয়া",
            "schools": []
          },
          {
            "name": "বল্লমঝাড়",
            "schools": []
          },
          {
            "name": "বাদিয়াখালী",
            "schools": []
          },
          {
            "name": "বোয়ালী",
            "schools": []
          },
          {
            "name": "মালীবাড়ী",
            "schools": []
          },
          {
            "name": "মোল্লারচর",
            "schools": []
          },
          {
            "name": "রামচন্দ্রপুর",
            "schools": []
          },
          {
            "name": "লক্ষ্মীপুর",
            "schools": []
          },
          {
            "name": "সাহাপাড়া",
            "schools": []
          }
        ]
      },
      {
        "name": "গোবিন্দগঞ্জ",
        "unions": [
          {
            "name": "কাটাবাড়ী",
            "schools": []
          },
          {
            "name": "কামদিয়া",
            "schools": []
          },
          {
            "name": "কামারদহ",
            "schools": []
          },
          {
            "name": "কোচাশহর",
            "schools": []
          },
          {
            "name": "গুমানীগঞ্জ",
            "schools": []
          },
          {
            "name": "তালুককানুপুর",
            "schools": []
          },
          {
            "name": "দরবস্ত ইয়নিয়ন",
            "schools": []
          },
          {
            "name": "নাকাই",
            "schools": []
          },
          {
            "name": "ফুলবাড়ী",
            "schools": []
          },
          {
            "name": "মহিমাগঞ্জ",
            "schools": []
          },
          {
            "name": "রাখালবুরুজ",
            "schools": []
          },
          {
            "name": "রাজাহার",
            "schools": []
          },
          {
            "name": "শাখাহার",
            "schools": []
          },
          {
            "name": "শালমারা",
            "schools": []
          },
          {
            "name": "শিবপুর",
            "schools": []
          },
          {
            "name": "সাপমারা",
            "schools": []
          },
          {
            "name": "হরিরামপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "পলাশবাড়ী",
        "unions": [
          {
            "name": "কিশোরগাড়ী",
            "schools": []
          },
          {
            "name": "পবনাপুর",
            "schools": []
          },
          {
            "name": "পলাশবাড়ী",
            "schools": []
          },
          {
            "name": "বরিশাল",
            "schools": []
          },
          {
            "name": "বেতকাপা",
            "schools": []
          },
          {
            "name": "মনোহরপুর",
            "schools": []
          },
          {
            "name": "মহদীপুর",
            "schools": []
          },
          {
            "name": "হরিণাথপুর",
            "schools": []
          },
          {
            "name": "হোসেনপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "ফুলছড়ি",
        "unions": [
          {
            "name": "উড়িয়া",
            "schools": []
          },
          {
            "name": "উদাখালী",
            "schools": []
          },
          {
            "name": "এরেন্ডাবাড়ী",
            "schools": []
          },
          {
            "name": "কঞ্চিপাড়া",
            "schools": []
          },
          {
            "name": "গজারিয়া",
            "schools": []
          },
          {
            "name": "ফজলুপুর",
            "schools": []
          },
          {
            "name": "ফুলছড়ি",
            "schools": []
          }
        ]
      },
      {
        "name": "সাঘাটা",
        "unions": [
          {
            "name": "কচুয়া",
            "schools": []
          },
          {
            "name": "কামালেরপাড়া",
            "schools": []
          },
          {
            "name": "ঘুরিদহ",
            "schools": []
          },
          {
            "name": "জুমারবাড়ী",
            "schools": []
          },
          {
            "name": "পদুমশহর",
            "schools": []
          },
          {
            "name": "বোনারপাড়া",
            "schools": []
          },
          {
            "name": "ভরতখালী",
            "schools": []
          },
          {
            "name": "মুক্তিনগর",
            "schools": []
          },
          {
            "name": "সাঘাটা",
            "schools": []
          },
          {
            "name": "হলদিয়া",
            "schools": []
          }
        ]
      },
      {
        "name": "সাদুল্লাপুর",
        "unions": [
          {
            "name": "ইদিলপুর",
            "schools": []
          },
          {
            "name": "কামারপাড়া",
            "schools": []
          },
          {
            "name": "খোদকোমরপুর",
            "schools": []
          },
          {
            "name": "জামালপুর",
            "schools": []
          },
          {
            "name": "দামোদরপুর",
            "schools": []
          },
          {
            "name": "ধাপেরহাট",
            "schools": []
          },
          {
            "name": "নলডাঙ্গা",
            "schools": []
          },
          {
            "name": "ফরিদপুর",
            "schools": []
          },
          {
            "name": "বনগ্রাম",
            "schools": []
          },
          {
            "name": "ভাতগ্রাম",
            "schools": []
          },
          {
            "name": "রসুলপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "সুন্দরগঞ্জ",
        "unions": [
          {
            "name": "কঞ্চিবাড়ী",
            "schools": []
          },
          {
            "name": "কাপাসিয়া",
            "schools": []
          },
          {
            "name": "চন্ডিপুর",
            "schools": []
          },
          {
            "name": "ছাপরহাটী",
            "schools": []
          },
          {
            "name": "তারাপুর",
            "schools": []
          },
          {
            "name": "দহবন্দ",
            "schools": []
          },
          {
            "name": "ধোপাডাঙ্গা",
            "schools": []
          },
          {
            "name": "বামনডাঙ্গা",
            "schools": []
          },
          {
            "name": "বেলকা",
            "schools": []
          },
          {
            "name": "রামজীবন",
            "schools": []
          },
          {
            "name": "শান্তিরাম",
            "schools": []
          },
          {
            "name": "শ্রীপুর",
            "schools": []
          },
          {
            "name": "সর্বানন্দ",
            "schools": []
          },
          {
            "name": "সোনারায়",
            "schools": []
          },
          {
            "name": "হরিপুর",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "গাজীপুর",
    "upazilas": [
      {
        "name": "কাপাসিয়া",
        "unions": [
          {
            "name": "কড়িহাতা",
            "schools": []
          },
          {
            "name": "কাপাসিয়া",
            "schools": []
          },
          {
            "name": "ঘাগটিয়া",
            "schools": []
          },
          {
            "name": "চাঁদপুর",
            "schools": []
          },
          {
            "name": "টোক",
            "schools": []
          },
          {
            "name": "তরগাঁও",
            "schools": []
          },
          {
            "name": "দূর্গাপুর",
            "schools": []
          },
          {
            "name": "বারিষাব",
            "schools": []
          },
          {
            "name": "রায়েদ",
            "schools": []
          },
          {
            "name": "সনমানিয়া",
            "schools": []
          },
          {
            "name": "সিংহশ্রী",
            "schools": []
          }
        ]
      },
      {
        "name": "কালিয়াকৈর",
        "unions": [
          {
            "name": "আটাবহ",
            "schools": []
          },
          {
            "name": "চাপাইর",
            "schools": []
          },
          {
            "name": "ঢালজোড়া",
            "schools": []
          },
          {
            "name": "ফুলবাড়ীয়া",
            "schools": []
          },
          {
            "name": "বোয়ালী",
            "schools": []
          },
          {
            "name": "মধ্যপাড়া",
            "schools": []
          },
          {
            "name": "মৌচাক",
            "schools": []
          },
          {
            "name": "শ্রীফলতলী",
            "schools": []
          },
          {
            "name": "সূত্রাপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "কালীগঞ্জ",
        "unions": [
          {
            "name": "জাঙ্গালিয়া",
            "schools": []
          },
          {
            "name": "জামালপুর",
            "schools": []
          },
          {
            "name": "তুমুলিয়া",
            "schools": []
          },
          {
            "name": "নাগরী",
            "schools": []
          },
          {
            "name": "বক্তারপুর",
            "schools": []
          },
          {
            "name": "বাহাদুরশাদী",
            "schools": []
          },
          {
            "name": "মোক্তারপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "গাজীপুর সদর",
        "unions": [
          {
            "name": "কাউলতিয়া",
            "schools": []
          },
          {
            "name": "কাশিমপুর",
            "schools": []
          },
          {
            "name": "কোনাবাড়ী",
            "schools": []
          },
          {
            "name": "গাছা",
            "schools": []
          },
          {
            "name": "পূবাইল",
            "schools": []
          },
          {
            "name": "বাড়ীয়া",
            "schools": []
          },
          {
            "name": "বাসন",
            "schools": []
          },
          {
            "name": "মির্জাপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "শ্রীপুর",
        "unions": [
          {
            "name": "কাওরাইদ",
            "schools": []
          },
          {
            "name": "গাজীপুর",
            "schools": []
          },
          {
            "name": "গোসিংগা",
            "schools": []
          },
          {
            "name": "তেলিহাটী",
            "schools": []
          },
          {
            "name": "প্রহলাদপুর",
            "schools": []
          },
          {
            "name": "বরমী",
            "schools": []
          },
          {
            "name": "মাওনা",
            "schools": []
          },
          {
            "name": "রাজাবাড়ী",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "গোপালগঞ্জ",
    "upazilas": [
      {
        "name": "কাশিয়ানী",
        "unions": [
          {
            "name": "ওড়াকান্দি",
            "schools": []
          },
          {
            "name": "কাশিয়ানী",
            "schools": []
          },
          {
            "name": "নিজামকান্দি",
            "schools": []
          },
          {
            "name": "পারুলিয়া",
            "schools": []
          },
          {
            "name": "পুইশুর",
            "schools": []
          },
          {
            "name": "ফুকরা",
            "schools": []
          },
          {
            "name": "বেথুড়ী",
            "schools": []
          },
          {
            "name": "মহেশপুর",
            "schools": []
          },
          {
            "name": "মাহমুদপুর",
            "schools": []
          },
          {
            "name": "রাজপাট",
            "schools": []
          },
          {
            "name": "রাতইল",
            "schools": []
          },
          {
            "name": "সাজাইল",
            "schools": []
          },
          {
            "name": "সিংগা",
            "schools": []
          },
          {
            "name": "হাতিয়াড়া",
            "schools": []
          }
        ]
      },
      {
        "name": "কোটালীপাড়া",
        "unions": [
          {
            "name": "আমতলী",
            "schools": []
          },
          {
            "name": "কলাবাড়ী",
            "schools": []
          },
          {
            "name": "কান্দি",
            "schools": []
          },
          {
            "name": "কুশলা",
            "schools": []
          },
          {
            "name": "ঘাঘর",
            "schools": []
          },
          {
            "name": "পিঞ্জুরী",
            "schools": []
          },
          {
            "name": "বান্ধাবাড়ী",
            "schools": []
          },
          {
            "name": "রাধাগঞ্জ",
            "schools": []
          },
          {
            "name": "রামশীল",
            "schools": []
          },
          {
            "name": "সাদুল্লাপুর",
            "schools": []
          },
          {
            "name": "হিরণ",
            "schools": []
          }
        ]
      },
      {
        "name": "গোপালগঞ্জ সদর",
        "unions": [
          {
            "name": "উরফি",
            "schools": []
          },
          {
            "name": "উলপুর",
            "schools": []
          },
          {
            "name": "করপাড়া",
            "schools": []
          },
          {
            "name": "কাজুলিয়া",
            "schools": []
          },
          {
            "name": "কাঠি",
            "schools": []
          },
          {
            "name": "গোপীনাথপুর",
            "schools": []
          },
          {
            "name": "গোবরা",
            "schools": []
          },
          {
            "name": "চন্দ্রদিঘলিয়া",
            "schools": []
          },
          {
            "name": "জালালাবাদ",
            "schools": []
          },
          {
            "name": "দুর্গাপুর",
            "schools": []
          },
          {
            "name": "নিজড়া",
            "schools": []
          },
          {
            "name": "পাইককান্দি",
            "schools": []
          },
          {
            "name": "বোড়াশী",
            "schools": []
          },
          {
            "name": "বৌলতলী",
            "schools": []
          },
          {
            "name": "মাঝিগাতী",
            "schools": []
          },
          {
            "name": "রঘুনাথপুর",
            "schools": []
          },
          {
            "name": "লতিফপুর",
            "schools": []
          },
          {
            "name": "শুকতাইল",
            "schools": []
          },
          {
            "name": "সাতপাড়",
            "schools": []
          },
          {
            "name": "সাহাপুর",
            "schools": []
          },
          {
            "name": "হরিদাসপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "টুংগীপাড়া",
        "unions": [
          {
            "name": "কুশলী",
            "schools": []
          },
          {
            "name": "গোপালপুর",
            "schools": []
          },
          {
            "name": "ডুমরিয়া",
            "schools": []
          },
          {
            "name": "পাটগাতী",
            "schools": []
          },
          {
            "name": "বর্ণি",
            "schools": []
          }
        ]
      },
      {
        "name": "মুকসুদপুর",
        "unions": [
          {
            "name": "উজানী",
            "schools": []
          },
          {
            "name": "কাশালিয়া",
            "schools": []
          },
          {
            "name": "খান্দারপাড়া",
            "schools": []
          },
          {
            "name": "গোবিন্দপুর",
            "schools": []
          },
          {
            "name": "গোহালা",
            "schools": []
          },
          {
            "name": "জলিরপাড়",
            "schools": []
          },
          {
            "name": "দিগনগর",
            "schools": []
          },
          {
            "name": "ননীক্ষীর",
            "schools": []
          },
          {
            "name": "পশারগাতি",
            "schools": []
          },
          {
            "name": "বহুগ্রাম",
            "schools": []
          },
          {
            "name": "বাটিকামারী",
            "schools": []
          },
          {
            "name": "বাশঁবাড়িয়া",
            "schools": []
          },
          {
            "name": "ভাবড়াশুর",
            "schools": []
          },
          {
            "name": "মহারাজপুর",
            "schools": []
          },
          {
            "name": "মোচনা",
            "schools": []
          },
          {
            "name": "রাঘদী",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "চট্টগ্রাম",
    "upazilas": [
      {
        "name": "আনোয়ারা",
        "unions": [
          {
            "name": "আনোয়ারা",
            "schools": []
          },
          {
            "name": "চাতরী",
            "schools": []
          },
          {
            "name": "জুঁইদন্ডী",
            "schools": []
          },
          {
            "name": "পরৈকোড়া",
            "schools": []
          },
          {
            "name": "বটতলী",
            "schools": []
          },
          {
            "name": "বরম্নমচড়া",
            "schools": []
          },
          {
            "name": "বারখাইন",
            "schools": []
          },
          {
            "name": "বারশত",
            "schools": []
          },
          {
            "name": "বৈরাগ",
            "schools": []
          },
          {
            "name": "রায়পুর",
            "schools": []
          },
          {
            "name": "হাইলধর",
            "schools": []
          }
        ]
      },
      {
        "name": "কর্ণফুলী",
        "unions": [
          {
            "name": "চর পাথরঘাটা",
            "schools": []
          },
          {
            "name": "চর লক্ষ্যা",
            "schools": []
          },
          {
            "name": "জুলধা",
            "schools": []
          },
          {
            "name": "বড় উঠান",
            "schools": []
          },
          {
            "name": "শিকলবাহা",
            "schools": []
          }
        ]
      },
      {
        "name": "চন্দনাইশ",
        "unions": [
          {
            "name": "কাঞ্চনাবাদ",
            "schools": []
          },
          {
            "name": "জোয়ারা",
            "schools": []
          },
          {
            "name": "দোহাজারী",
            "schools": []
          },
          {
            "name": "ধোপাছড়ী",
            "schools": []
          },
          {
            "name": "বরকল",
            "schools": []
          },
          {
            "name": "বরমা",
            "schools": []
          },
          {
            "name": "বৈলতলী",
            "schools": []
          },
          {
            "name": "সাতবাড়িয়া",
            "schools": []
          },
          {
            "name": "হাশিমপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "পটিয়া",
        "unions": [
          {
            "name": "আশিয়া",
            "schools": []
          },
          {
            "name": "কাচুয়াই",
            "schools": []
          },
          {
            "name": "কাশিয়াইশ",
            "schools": []
          },
          {
            "name": "কুসুমপুরা",
            "schools": []
          },
          {
            "name": "কেলিশহর",
            "schools": []
          },
          {
            "name": "কোলাগাঁও",
            "schools": []
          },
          {
            "name": "খরনা",
            "schools": []
          },
          {
            "name": "চর পাথরঘাটা",
            "schools": []
          },
          {
            "name": "চর লক্ষ্যা",
            "schools": []
          },
          {
            "name": "ছনহরা",
            "schools": []
          },
          {
            "name": "জঙ্গলখাইন",
            "schools": []
          },
          {
            "name": "জিরি",
            "schools": []
          },
          {
            "name": "জুলধা",
            "schools": []
          },
          {
            "name": "দক্ষিণ ভূর্ষি",
            "schools": []
          },
          {
            "name": "ধলঘাট",
            "schools": []
          },
          {
            "name": "বড় উঠান",
            "schools": []
          },
          {
            "name": "বরলিয়া",
            "schools": []
          },
          {
            "name": "ভাটিখাইন",
            "schools": []
          },
          {
            "name": "শিকলবাহা",
            "schools": []
          },
          {
            "name": "শোভনদন্ডী",
            "schools": []
          },
          {
            "name": "হাইদগাঁও",
            "schools": []
          },
          {
            "name": "হাবিলাসদ্বীপ",
            "schools": []
          }
        ]
      },
      {
        "name": "ফটিকছড়ি",
        "unions": [
          {
            "name": "আবদুল্লাপুর",
            "schools": []
          },
          {
            "name": "কাঞ্চনগর",
            "schools": []
          },
          {
            "name": "জাফতনগর",
            "schools": []
          },
          {
            "name": "দাঁতমারা",
            "schools": []
          },
          {
            "name": "দৌলতপুর",
            "schools": []
          },
          {
            "name": "ধর্মপুর",
            "schools": []
          },
          {
            "name": "নানুপুর",
            "schools": []
          },
          {
            "name": "নারায়নহাট",
            "schools": []
          },
          {
            "name": "পাইনদং",
            "schools": []
          },
          {
            "name": "বক্তপুর",
            "schools": []
          },
          {
            "name": "বাগান বাজার",
            "schools": []
          },
          {
            "name": "ভূজপুর",
            "schools": []
          },
          {
            "name": "রোসাংগিরী",
            "schools": []
          },
          {
            "name": "লেলাং",
            "schools": []
          },
          {
            "name": "সমিতির হাট",
            "schools": []
          },
          {
            "name": "সুনদরপুর",
            "schools": []
          },
          {
            "name": "সুয়াবিল",
            "schools": []
          },
          {
            "name": "হারুয়ালছড়ি",
            "schools": []
          }
        ]
      },
      {
        "name": "বাঁশখালী",
        "unions": [
          {
            "name": "কাথরিয়া",
            "schools": []
          },
          {
            "name": "কালীপুর",
            "schools": []
          },
          {
            "name": "খানখানাবাদ",
            "schools": []
          },
          {
            "name": "গন্ডামারা",
            "schools": []
          },
          {
            "name": "চাম্বল",
            "schools": []
          },
          {
            "name": "ছনুয়া",
            "schools": []
          },
          {
            "name": "পুঁইছড়ি",
            "schools": []
          },
          {
            "name": "পুকুরিয়া",
            "schools": []
          },
          {
            "name": "বাহারছড়া",
            "schools": []
          },
          {
            "name": "বৈলছড়ি",
            "schools": []
          },
          {
            "name": "শীলকুপ",
            "schools": []
          },
          {
            "name": "শেখেরখীল",
            "schools": []
          },
          {
            "name": "সরল",
            "schools": []
          },
          {
            "name": "সাধনপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "বোয়ালখালী",
        "unions": [
          {
            "name": "আমুচিয়া",
            "schools": []
          },
          {
            "name": "আহল্লা করলডেঙ্গা",
            "schools": []
          },
          {
            "name": "কধুরখীল",
            "schools": []
          },
          {
            "name": "চরনদ্বীপ",
            "schools": []
          },
          {
            "name": "পশ্চিম গোমদন্ডী",
            "schools": []
          },
          {
            "name": "পুর্ব গোমদন্ডী",
            "schools": []
          },
          {
            "name": "পোপাদিয়া",
            "schools": []
          },
          {
            "name": "শাকপুরা",
            "schools": []
          },
          {
            "name": "শ্রীপুর-খরন্দীপ",
            "schools": []
          },
          {
            "name": "সারোয়াতলী",
            "schools": []
          }
        ]
      },
      {
        "name": "মীরসরাই",
        "unions": [
          {
            "name": "ইছাখালী",
            "schools": []
          },
          {
            "name": "ওয়াহেদপুর",
            "schools": []
          },
          {
            "name": "ওসমানপুর",
            "schools": []
          },
          {
            "name": "করেরহাট",
            "schools": []
          },
          {
            "name": "কাটাছরা",
            "schools": []
          },
          {
            "name": "খৈয়াছরা",
            "schools": []
          },
          {
            "name": "জোরারগঞ্জ",
            "schools": []
          },
          {
            "name": "দূর্গাপুর",
            "schools": []
          },
          {
            "name": "ধুম",
            "schools": []
          },
          {
            "name": "মঘাদিয়া",
            "schools": []
          },
          {
            "name": "মায়ানী",
            "schools": []
          },
          {
            "name": "মিঠানালা",
            "schools": []
          },
          {
            "name": "মীরসরাই",
            "schools": []
          },
          {
            "name": "সাহেরখালী",
            "schools": []
          },
          {
            "name": "হাইতকান্দি",
            "schools": []
          },
          {
            "name": "হিংগুলি",
            "schools": []
          }
        ]
      },
      {
        "name": "রাউজান",
        "unions": [
          {
            "name": "উড়কিরচর",
            "schools": []
          },
          {
            "name": "কদলপূর",
            "schools": []
          },
          {
            "name": "গহিরা",
            "schools": []
          },
          {
            "name": "চিকদাইর",
            "schools": []
          },
          {
            "name": "ডাবুয়া",
            "schools": []
          },
          {
            "name": "নওয়াজিশপুর",
            "schools": []
          },
          {
            "name": "নোয়াপাড়া",
            "schools": []
          },
          {
            "name": "পশ্চিম গুজরা",
            "schools": []
          },
          {
            "name": "পাহাড়তলী",
            "schools": []
          },
          {
            "name": "পূর্ব গুজরা",
            "schools": []
          },
          {
            "name": "বাগোয়ান",
            "schools": []
          },
          {
            "name": "বিনাজুরী",
            "schools": []
          },
          {
            "name": "রাউজান",
            "schools": []
          },
          {
            "name": "হলদিয়া",
            "schools": []
          }
        ]
      },
      {
        "name": "রাঙ্গুনিয়া",
        "unions": [
          {
            "name": "ইসলামপুর",
            "schools": []
          },
          {
            "name": "কোদালা",
            "schools": []
          },
          {
            "name": "চন্দ্রঘোনা",
            "schools": []
          },
          {
            "name": "দক্ষিণ রাজানগর",
            "schools": []
          },
          {
            "name": "পারুয়া",
            "schools": []
          },
          {
            "name": "পোমরা",
            "schools": []
          },
          {
            "name": "বেতাগী",
            "schools": []
          },
          {
            "name": "মরিয়মনগর",
            "schools": []
          },
          {
            "name": "রাজানগর",
            "schools": []
          },
          {
            "name": "লালানগর",
            "schools": []
          },
          {
            "name": "শিলক",
            "schools": []
          },
          {
            "name": "সরফভাটা",
            "schools": []
          },
          {
            "name": "স্বনির্ভর রাঙ্গুনিয়া",
            "schools": []
          },
          {
            "name": "হোছনাবাদ",
            "schools": []
          }
        ]
      },
      {
        "name": "লোহাগাড়া",
        "unions": [
          {
            "name": "আধুনগর",
            "schools": []
          },
          {
            "name": "আমিরাবাদ",
            "schools": []
          },
          {
            "name": "কলাউজান",
            "schools": []
          },
          {
            "name": "চরম্বা",
            "schools": []
          },
          {
            "name": "চুনতি",
            "schools": []
          },
          {
            "name": "পদুয়া",
            "schools": []
          },
          {
            "name": "পুটিবিলা",
            "schools": []
          },
          {
            "name": "বড়হাতিয়া",
            "schools": []
          },
          {
            "name": "লোহাগাড়া",
            "schools": []
          }
        ]
      },
      {
        "name": "সন্দ্বীপ",
        "unions": [
          {
            "name": "আজিমপুর",
            "schools": []
          },
          {
            "name": "আমানউল্যা",
            "schools": []
          },
          {
            "name": "উড়িরচর",
            "schools": []
          },
          {
            "name": "কালাপানিয়া",
            "schools": []
          },
          {
            "name": "গাছুয়া",
            "schools": []
          },
          {
            "name": "বাউরিয়া",
            "schools": []
          },
          {
            "name": "মগধরা",
            "schools": []
          },
          {
            "name": "মাইটভাঙ্গা",
            "schools": []
          },
          {
            "name": "মুছাপুর",
            "schools": []
          },
          {
            "name": "রহমতপুর",
            "schools": []
          },
          {
            "name": "সন্তোষপুর",
            "schools": []
          },
          {
            "name": "সারিকাইত",
            "schools": []
          },
          {
            "name": "হরিশপুর",
            "schools": []
          },
          {
            "name": "হারামিয়া",
            "schools": []
          }
        ]
      },
      {
        "name": "সাতকানিয়া",
        "unions": [
          {
            "name": "আমিলাইশ",
            "schools": []
          },
          {
            "name": "এওচিয়া",
            "schools": []
          },
          {
            "name": "কাঞ্চনা",
            "schools": []
          },
          {
            "name": "কালিয়াইশ",
            "schools": []
          },
          {
            "name": "কেঁওচিয়া",
            "schools": []
          },
          {
            "name": "খাগরিয়া",
            "schools": []
          },
          {
            "name": "চরতী",
            "schools": []
          },
          {
            "name": "ছদাহা",
            "schools": []
          },
          {
            "name": "ঢেমশা",
            "schools": []
          },
          {
            "name": "নলুয়া",
            "schools": []
          },
          {
            "name": "পশ্চিম ঢেমশা",
            "schools": []
          },
          {
            "name": "পুরানগড়",
            "schools": []
          },
          {
            "name": "বাজালিয়া",
            "schools": []
          },
          {
            "name": "মাদার্শা",
            "schools": []
          },
          {
            "name": "সাতকানিয়া",
            "schools": []
          },
          {
            "name": "সোনাকানিয়া",
            "schools": []
          }
        ]
      },
      {
        "name": "সীতাকুন্ড",
        "unions": [
          {
            "name": "কুমিরা",
            "schools": []
          },
          {
            "name": "বাঁশবারীয়া",
            "schools": []
          },
          {
            "name": "বাড়িয়াডিয়ালা",
            "schools": []
          },
          {
            "name": "বারবকুন্ড",
            "schools": []
          },
          {
            "name": "ভাটিয়ারী",
            "schools": []
          },
          {
            "name": "মুরাদপুর",
            "schools": []
          },
          {
            "name": "সাঈদপুর",
            "schools": []
          },
          {
            "name": "সালিমপুর",
            "schools": []
          },
          {
            "name": "সোনাইছড়ি",
            "schools": []
          }
        ]
      },
      {
        "name": "হাটহাজারী",
        "unions": [
          {
            "name": "উত্তর মাদার্শা",
            "schools": []
          },
          {
            "name": "গড়দুয়ারা",
            "schools": []
          },
          {
            "name": "গুমানমর্দ্দন",
            "schools": []
          },
          {
            "name": "চিকনদন্ডী",
            "schools": []
          },
          {
            "name": "ছিপাতলী",
            "schools": []
          },
          {
            "name": "দক্ষিন মাদার্শা",
            "schools": []
          },
          {
            "name": "ধলই",
            "schools": []
          },
          {
            "name": "নাঙ্গলমোরা",
            "schools": []
          },
          {
            "name": "ফতেপুর",
            "schools": []
          },
          {
            "name": "ফরহাদাবাদ",
            "schools": []
          },
          {
            "name": "বুডিরশ্চর",
            "schools": []
          },
          {
            "name": "মির্জাপুর",
            "schools": []
          },
          {
            "name": "মেখল",
            "schools": []
          },
          {
            "name": "শিকারপুর",
            "schools": []
          },
          {
            "name": "হাটহাজারী",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "চাঁদপুর",
    "upazilas": [
      {
        "name": "কচুয়া",
        "unions": [
          {
            "name": "আসরাফপুর",
            "schools": []
          },
          {
            "name": "কচুয়া (উত্তর)",
            "schools": []
          },
          {
            "name": "কচুয়া (দক্ষিণ)",
            "schools": []
          },
          {
            "name": "কড়ইয়া",
            "schools": []
          },
          {
            "name": "কাদলা",
            "schools": []
          },
          {
            "name": "গোহাট (উত্তর)",
            "schools": []
          },
          {
            "name": "গোহাট (দক্ষিণ)",
            "schools": []
          },
          {
            "name": "পাথৈর",
            "schools": []
          },
          {
            "name": "বিতারা",
            "schools": []
          },
          {
            "name": "সহদেবপুর (পশ্চিম)",
            "schools": []
          },
          {
            "name": "সহদেবপুর (পূর্ব)",
            "schools": []
          },
          {
            "name": "সাচার",
            "schools": []
          }
        ]
      },
      {
        "name": "চাঁদপুর সদর",
        "unions": [
          {
            "name": "আশিকাটি",
            "schools": []
          },
          {
            "name": "ইব্রাহীমপুর",
            "schools": []
          },
          {
            "name": "কল্যাণপুর",
            "schools": []
          },
          {
            "name": "চান্দ্রা",
            "schools": []
          },
          {
            "name": "তরপুচন্ডী",
            "schools": []
          },
          {
            "name": "বাগাদী",
            "schools": []
          },
          {
            "name": "বালিয়া",
            "schools": []
          },
          {
            "name": "বিষ্ণপুর",
            "schools": []
          },
          {
            "name": "মৈশাদী",
            "schools": []
          },
          {
            "name": "রাজরাজেশ্বর",
            "schools": []
          },
          {
            "name": "রামপুর",
            "schools": []
          },
          {
            "name": "লক্ষীপুর মডেল",
            "schools": []
          },
          {
            "name": "শাহ্‌ মাহমুদপুর",
            "schools": []
          },
          {
            "name": "হানারচর",
            "schools": []
          }
        ]
      },
      {
        "name": "ফরিদগঞ্জ",
        "unions": [
          {
            "name": "গবিন্দপুর (উত্তর)",
            "schools": []
          },
          {
            "name": "গবিন্দপুর (দক্ষিণ)",
            "schools": []
          },
          {
            "name": "গুপ্তি (পশ্চিম)",
            "schools": []
          },
          {
            "name": "গুপ্তি (পূর্ব)",
            "schools": []
          },
          {
            "name": "চরদুঃখিয়া (পশ্চিম)",
            "schools": []
          },
          {
            "name": "চরদুখিয়া (পূর্ব)",
            "schools": []
          },
          {
            "name": "পাইকপাড়া (উত্তর)",
            "schools": []
          },
          {
            "name": "পাইকপাড়া (দক্ষিণ)",
            "schools": []
          },
          {
            "name": "ফরিদ্গঞ্জ (দক্ষিণ)",
            "schools": []
          },
          {
            "name": "বালিথুবা (পশ্চিম)",
            "schools": []
          },
          {
            "name": "বালিথুবা (পূর্ব)",
            "schools": []
          },
          {
            "name": "রুপসা (উত্তর)",
            "schools": []
          },
          {
            "name": "রুপসা (দক্ষিণ)",
            "schools": []
          },
          {
            "name": "সুবিদপুর (পশ্চিম)",
            "schools": []
          },
          {
            "name": "সুবিদপুর (পূর্ব)",
            "schools": []
          }
        ]
      },
      {
        "name": "মতলব উত্তর",
        "unions": [
          {
            "name": "ইসলামাবাদ",
            "schools": []
          },
          {
            "name": "এখলাছপুর",
            "schools": []
          },
          {
            "name": "কালাকান্দা",
            "schools": []
          },
          {
            "name": "গজরা",
            "schools": []
          },
          {
            "name": "জহিরাবাদ",
            "schools": []
          },
          {
            "name": "দূর্গাপুর",
            "schools": []
          },
          {
            "name": "ফতেহপুর (পশ্চিম)",
            "schools": []
          },
          {
            "name": "ফতেহপুর (পূর্ব)",
            "schools": []
          },
          {
            "name": "ফরাজীকান্দি",
            "schools": []
          },
          {
            "name": "বাগানবাড়ী",
            "schools": []
          },
          {
            "name": "মোহনপুর",
            "schools": []
          },
          {
            "name": "ষাটনল",
            "schools": []
          },
          {
            "name": "সাদুল্ল্যাপুর",
            "schools": []
          },
          {
            "name": "সুলতানাবাদ",
            "schools": []
          }
        ]
      },
      {
        "name": "মতলব দক্ষিণ",
        "unions": [
          {
            "name": "উপাদী (উত্তর)",
            "schools": []
          },
          {
            "name": "উপাদী (দক্ষিণ)",
            "schools": []
          },
          {
            "name": "খাদেরগাঁও",
            "schools": []
          },
          {
            "name": "নায়েরগাঁও (উত্তর)",
            "schools": []
          },
          {
            "name": "নায়েরগাঁও (দক্ষিন)",
            "schools": []
          },
          {
            "name": "নারায়নপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "শাহরাস্তি\t",
        "unions": [
          {
            "name": "চিতষী (পশ্চিম)",
            "schools": []
          },
          {
            "name": "চিতষী (পূর্ব)",
            "schools": []
          },
          {
            "name": "টামটা (উত্তর)",
            "schools": []
          },
          {
            "name": "টামটা (দক্ষিণ)",
            "schools": []
          },
          {
            "name": "মেহের (উত্তর)",
            "schools": []
          },
          {
            "name": "মেহের (দক্ষিণ)",
            "schools": []
          },
          {
            "name": "রায়শ্রী (উত্তর)",
            "schools": []
          },
          {
            "name": "রায়শ্রী (দক্ষিন)",
            "schools": []
          },
          {
            "name": "সুচিপাড়া (উত্তর)",
            "schools": []
          },
          {
            "name": "সুচিপাড়া (দক্ষিণ)",
            "schools": []
          }
        ]
      },
      {
        "name": "হাইমচর",
        "unions": [
          {
            "name": "আলগী দুর্গাপুর (উত্তর)",
            "schools": []
          },
          {
            "name": "আলগী দুর্গাপুর (দক্ষিণ)",
            "schools": []
          },
          {
            "name": "গাজীপুর",
            "schools": []
          },
          {
            "name": "চরভৈরবী",
            "schools": []
          },
          {
            "name": "নীলকমল",
            "schools": []
          },
          {
            "name": "হাইমচর",
            "schools": []
          }
        ]
      },
      {
        "name": "হাজীগঞ্জ",
        "unions": [
          {
            "name": "কালচোঁ (উত্তর)",
            "schools": []
          },
          {
            "name": "কালচোঁ (দক্ষিণ)",
            "schools": []
          },
          {
            "name": "গন্ধর্ব্যপুর (উত্তর)",
            "schools": []
          },
          {
            "name": "গন্ধর্ব্যপুর (দক্ষিণ)",
            "schools": []
          },
          {
            "name": "বড়কুল (পশ্চিম)",
            "schools": []
          },
          {
            "name": "বড়কুল (পূর্ব)",
            "schools": []
          },
          {
            "name": "বাকিলা",
            "schools": []
          },
          {
            "name": "রাজারগাঁও (উত্তর)",
            "schools": []
          },
          {
            "name": "হাজীগঞ্জ সদর",
            "schools": []
          },
          {
            "name": "হাটিলা (পশ্চিম)",
            "schools": []
          },
          {
            "name": "হাটিলা (পূর্ব)",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "চাঁপাইনবাবগঞ্জ",
    "upazilas": [
      {
        "name": "গোমস্তাপুর",
        "unions": [
          {
            "name": "আলীনগর",
            "schools": []
          },
          {
            "name": "গোমস্তাপুর",
            "schools": []
          },
          {
            "name": "চৌডালা",
            "schools": []
          },
          {
            "name": "পার্বতীপুর",
            "schools": []
          },
          {
            "name": "বাঙ্গাবাড়ী",
            "schools": []
          },
          {
            "name": "বোয়ালিয়া",
            "schools": []
          },
          {
            "name": "রহনপুর",
            "schools": []
          },
          {
            "name": "রাধানগর",
            "schools": []
          }
        ]
      },
      {
        "name": "চাঁপাইনবাবগঞ্জ সদর",
        "unions": [
          {
            "name": "আলাতুলী",
            "schools": []
          },
          {
            "name": "ইসলামপুর",
            "schools": []
          },
          {
            "name": "গোবরাতলা",
            "schools": []
          },
          {
            "name": "চর অনুপনগর",
            "schools": []
          },
          {
            "name": "চরবাগডাঙ্গা",
            "schools": []
          },
          {
            "name": "ঝিলিম",
            "schools": []
          },
          {
            "name": "দেবীনগর",
            "schools": []
          },
          {
            "name": "নারায়নপুর",
            "schools": []
          },
          {
            "name": "বারঘরিয়া",
            "schools": []
          },
          {
            "name": "বালিয়াডাঙ্গা",
            "schools": []
          },
          {
            "name": "মহারাজপুর",
            "schools": []
          },
          {
            "name": "রানীহাটি",
            "schools": []
          },
          {
            "name": "শাহজাহানপুর",
            "schools": []
          },
          {
            "name": "সুন্দরপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "নাচোল",
        "unions": [
          {
            "name": "কসবা",
            "schools": []
          },
          {
            "name": "নাচোল",
            "schools": []
          },
          {
            "name": "নেজামপুর",
            "schools": []
          },
          {
            "name": "ফতেপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "ভোলাহাট",
        "unions": [
          {
            "name": "গোহালবাড়ী",
            "schools": []
          },
          {
            "name": "জামবাড়িয়া",
            "schools": []
          },
          {
            "name": "দলদলী",
            "schools": []
          },
          {
            "name": "ভোলাহাট",
            "schools": []
          }
        ]
      },
      {
        "name": "শিবগঞ্জ",
        "unions": [
          {
            "name": "উজিরপুর",
            "schools": []
          },
          {
            "name": "কানসাট",
            "schools": []
          },
          {
            "name": "ঘোড়াপাখিয়া",
            "schools": []
          },
          {
            "name": "চককির্তী",
            "schools": []
          },
          {
            "name": "ছত্রাজিতপুর",
            "schools": []
          },
          {
            "name": "দাইপুকুরিয়া",
            "schools": []
          },
          {
            "name": "দুর্লভপুর",
            "schools": []
          },
          {
            "name": "ধাইনগর",
            "schools": []
          },
          {
            "name": "নয়ালাভাঙ্গা",
            "schools": []
          },
          {
            "name": "পাঁকা",
            "schools": []
          },
          {
            "name": "বিনোদপুর",
            "schools": []
          },
          {
            "name": "মনাকষা",
            "schools": []
          },
          {
            "name": "মোবারকপুর",
            "schools": []
          },
          {
            "name": "শাহাবাজপুর",
            "schools": []
          },
          {
            "name": "শ্যামপুর",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "চুয়াডাঙ্গা",
    "upazilas": [
      {
        "name": "আলমডাঙ্গা",
        "unions": [
          {
            "name": "আইলহাঁস",
            "schools": []
          },
          {
            "name": "কালিদাসপুর",
            "schools": []
          },
          {
            "name": "কুমারী",
            "schools": []
          },
          {
            "name": "খাদিমপুর",
            "schools": []
          },
          {
            "name": "খাসকররা",
            "schools": []
          },
          {
            "name": "গাংনী",
            "schools": []
          },
          {
            "name": "চিৎলা",
            "schools": []
          },
          {
            "name": "জামজামি",
            "schools": []
          },
          {
            "name": "জেহালা",
            "schools": []
          },
          {
            "name": "ডাউকী",
            "schools": []
          },
          {
            "name": "নাগদাহ",
            "schools": []
          },
          {
            "name": "বাড়াদী",
            "schools": []
          },
          {
            "name": "বেলগাছি",
            "schools": []
          },
          {
            "name": "ভাংবাড়ীয়া",
            "schools": []
          },
          {
            "name": "হারদী",
            "schools": []
          }
        ]
      },
      {
        "name": "চুয়াডাঙ্গা সদর",
        "unions": [
          {
            "name": "আলুকদিয়া",
            "schools": []
          },
          {
            "name": "কুতুবপুর",
            "schools": []
          },
          {
            "name": "তিতুদাহ",
            "schools": []
          },
          {
            "name": "পদ্মবিলা",
            "schools": []
          },
          {
            "name": "বেগমপুর",
            "schools": []
          },
          {
            "name": "মোমিনপুর",
            "schools": []
          },
          {
            "name": "শংকরচন্দ্র",
            "schools": []
          }
        ]
      },
      {
        "name": "জীবননগর",
        "unions": [
          {
            "name": "আন্দুলবাড়ীয়া",
            "schools": []
          },
          {
            "name": "উথলী",
            "schools": []
          },
          {
            "name": "বাঁকা",
            "schools": []
          },
          {
            "name": "রায়পুর",
            "schools": []
          },
          {
            "name": "সীমান্ত",
            "schools": []
          },
          {
            "name": "হাসাদাহ",
            "schools": []
          }
        ]
      },
      {
        "name": "দামুড়হুদা",
        "unions": [
          {
            "name": "কার্পাসডাঙ্গা",
            "schools": []
          },
          {
            "name": "কুড়ালগাছী",
            "schools": []
          },
          {
            "name": "জুড়ানপুর",
            "schools": []
          },
          {
            "name": "দামুড়হুদা",
            "schools": []
          },
          {
            "name": "নতিপোতা",
            "schools": []
          },
          {
            "name": "পারকৃষ্ণপুর মদনা",
            "schools": []
          },
          {
            "name": "হাওলী",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "জয়পুরহাট",
    "upazilas": [
      {
        "name": "আক্কেলপুর",
        "unions": [
          {
            "name": "গোপীনাথপুর",
            "schools": []
          },
          {
            "name": "তিলকপুর",
            "schools": []
          },
          {
            "name": "রায়কালী",
            "schools": []
          },
          {
            "name": "রুকিন্দীপুর",
            "schools": []
          },
          {
            "name": "সোনামূখী",
            "schools": []
          }
        ]
      },
      {
        "name": "কালাই",
        "unions": [
          {
            "name": "আহম্মেদাবাদ",
            "schools": []
          },
          {
            "name": "উদয়পুর",
            "schools": []
          },
          {
            "name": "জিন্দারপুর",
            "schools": []
          },
          {
            "name": "পুনট",
            "schools": []
          },
          {
            "name": "মাত্রাই",
            "schools": []
          }
        ]
      },
      {
        "name": "ক্ষেতলাল",
        "unions": [
          {
            "name": " তুলশীগংগা",
            "schools": []
          },
          {
            "name": "আলমপুর",
            "schools": []
          },
          {
            "name": "বড়তারা",
            "schools": []
          },
          {
            "name": "বড়াইল",
            "schools": []
          },
          {
            "name": "মামুদপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "জয়পুরহাট সদর",
        "unions": [
          {
            "name": "আমদই",
            "schools": []
          },
          {
            "name": "চকবরকত",
            "schools": []
          },
          {
            "name": "জামালপুর",
            "schools": []
          },
          {
            "name": "দোগাছি",
            "schools": []
          },
          {
            "name": "ধলাহার",
            "schools": []
          },
          {
            "name": "পুরানাপৈল",
            "schools": []
          },
          {
            "name": "বম্বু",
            "schools": []
          },
          {
            "name": "ভাদসা",
            "schools": []
          },
          {
            "name": "মোহাম্মদাবাদ",
            "schools": []
          }
        ]
      },
      {
        "name": "পাঁচবিবি",
        "unions": [
          {
            "name": "আওলাই",
            "schools": []
          },
          {
            "name": "আটাপুর",
            "schools": []
          },
          {
            "name": "আয়মারসুলপুর",
            "schools": []
          },
          {
            "name": "কুসুম্বা",
            "schools": []
          },
          {
            "name": "ধরঞ্জি",
            "schools": []
          },
          {
            "name": "বাগজানা",
            "schools": []
          },
          {
            "name": "বালিঘাটা",
            "schools": []
          },
          {
            "name": "মোহাম্মদপুর",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "জামালপুর",
    "upazilas": [
      {
        "name": "ইসলামপুর",
        "unions": [
          {
            "name": "ইসলামপুর",
            "schools": []
          },
          {
            "name": "কুলকান্দি",
            "schools": []
          },
          {
            "name": "গাইবান্ধা",
            "schools": []
          },
          {
            "name": "গোয়ালেরচর",
            "schools": []
          },
          {
            "name": "চরগোয়ালীনি",
            "schools": []
          },
          {
            "name": "চরপুটিমারী",
            "schools": []
          },
          {
            "name": "চিনাডুলী",
            "schools": []
          },
          {
            "name": "নোয়ারপাড়া",
            "schools": []
          },
          {
            "name": "পলবান্ধা",
            "schools": []
          },
          {
            "name": "পাথশী",
            "schools": []
          },
          {
            "name": "বেলগাছা",
            "schools": []
          },
          {
            "name": "সাপধরী",
            "schools": []
          }
        ]
      },
      {
        "name": "জামালপুর সদর",
        "unions": [
          {
            "name": "ইটাইল",
            "schools": []
          },
          {
            "name": "কেন্দুয়া",
            "schools": []
          },
          {
            "name": "ঘোড়াধাপ",
            "schools": []
          },
          {
            "name": "তিতপল্লা",
            "schools": []
          },
          {
            "name": "তুলশীরচর",
            "schools": []
          },
          {
            "name": "দিগপাইত",
            "schools": []
          },
          {
            "name": "নরুন্দী",
            "schools": []
          },
          {
            "name": "বাশঁচড়া",
            "schools": []
          },
          {
            "name": "মেষ্টা",
            "schools": []
          },
          {
            "name": "রশিদপুর",
            "schools": []
          },
          {
            "name": "রানাগাছা",
            "schools": []
          },
          {
            "name": "লক্ষীরচর",
            "schools": []
          },
          {
            "name": "শরিফপুর",
            "schools": []
          },
          {
            "name": "শাহবাজপুর",
            "schools": []
          },
          {
            "name": "শ্রীপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "দেওয়ানগঞ্জ",
        "unions": [
          {
            "name": "চর আমখাওয়া",
            "schools": []
          },
          {
            "name": "চিকাজানী",
            "schools": []
          },
          {
            "name": "চুকাইবাড়ী",
            "schools": []
          },
          {
            "name": "ডাংধরা",
            "schools": []
          },
          {
            "name": "দেওয়ানগঞ্জ",
            "schools": []
          },
          {
            "name": "পাররাম রামপুর",
            "schools": []
          },
          {
            "name": "বাহাদুরাবাদ",
            "schools": []
          },
          {
            "name": "হাতীভাঙ্গা",
            "schools": []
          }
        ]
      },
      {
        "name": "বকশীগঞ্জ",
        "unions": [
          {
            "name": "ধানুয়া",
            "schools": []
          },
          {
            "name": "নিলক্ষিয়া",
            "schools": []
          },
          {
            "name": "বকসীগঞ্জ",
            "schools": []
          },
          {
            "name": "বগারচর",
            "schools": []
          },
          {
            "name": "বাট্রাজোড়",
            "schools": []
          },
          {
            "name": "মেরুরচর",
            "schools": []
          },
          {
            "name": "সাধুরপাড়া",
            "schools": []
          }
        ]
      },
      {
        "name": "মাদারগঞ্জ",
        "unions": [
          {
            "name": "আদারভিটা",
            "schools": []
          },
          {
            "name": "কড়ইচড়া",
            "schools": []
          },
          {
            "name": "গুনারীতলা",
            "schools": []
          },
          {
            "name": "চর পাকেরদহ",
            "schools": []
          },
          {
            "name": "জোড়খালী",
            "schools": []
          },
          {
            "name": "বালিজুড়ী",
            "schools": []
          },
          {
            "name": "সিধুলী",
            "schools": []
          }
        ]
      },
      {
        "name": "মেলান্দহ",
        "unions": [
          {
            "name": "আদ্রা",
            "schools": []
          },
          {
            "name": "কুলিয়া",
            "schools": []
          },
          {
            "name": "ঘোষেরপাড়া",
            "schools": []
          },
          {
            "name": "চরবানী পাকুরিয়া",
            "schools": []
          },
          {
            "name": "ঝাউগড়া",
            "schools": []
          },
          {
            "name": "দুরমুট",
            "schools": []
          },
          {
            "name": "নয়ানগর",
            "schools": []
          },
          {
            "name": "নাংলা",
            "schools": []
          },
          {
            "name": "ফুলকোচা",
            "schools": []
          },
          {
            "name": "মাহমুদপুর",
            "schools": []
          },
          {
            "name": "শ্যামপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "সরিষাবাড়ী",
        "unions": [
          {
            "name": "আওনা",
            "schools": []
          },
          {
            "name": "কামরাবাদ",
            "schools": []
          },
          {
            "name": "ডোয়াইল",
            "schools": []
          },
          {
            "name": "পিংনা",
            "schools": []
          },
          {
            "name": "পোগলদিঘা",
            "schools": []
          },
          {
            "name": "ভাটারা",
            "schools": []
          },
          {
            "name": "মহাদান",
            "schools": []
          },
          {
            "name": "সাতপোয়া",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "ঝালকাঠি",
    "upazilas": [
      {
        "name": "কাঠালিয়া",
        "unions": [
          {
            "name": "আওরাবুনিয়া",
            "schools": []
          },
          {
            "name": "আমুয়া",
            "schools": []
          },
          {
            "name": "কাঠালিয়া",
            "schools": []
          },
          {
            "name": "চেঁচরীরামপুর",
            "schools": []
          },
          {
            "name": "পাটিখালঘাটা",
            "schools": []
          },
          {
            "name": "শৌলজালিয়া",
            "schools": []
          }
        ]
      },
      {
        "name": "ঝালকাঠি সদর",
        "unions": [
          {
            "name": "কীর্তিপাশা",
            "schools": []
          },
          {
            "name": "কেওড়া",
            "schools": []
          },
          {
            "name": "গাবখান ধানসিঁড়ি",
            "schools": []
          },
          {
            "name": "গাভারামচন্দ্রপুর",
            "schools": []
          },
          {
            "name": "নথুলল্লাবাদ",
            "schools": []
          },
          {
            "name": "নবগ্রাম",
            "schools": []
          },
          {
            "name": "পোনাবালিয়া",
            "schools": []
          },
          {
            "name": "বাসন্ডা",
            "schools": []
          },
          {
            "name": "বিনয়কাঠী",
            "schools": []
          },
          {
            "name": "শেখেরহাট",
            "schools": []
          }
        ]
      },
      {
        "name": "নলছিটি",
        "unions": [
          {
            "name": "কুলকাঠী",
            "schools": []
          },
          {
            "name": "কুশঙ্গল",
            "schools": []
          },
          {
            "name": "দপদপিয়া",
            "schools": []
          },
          {
            "name": "নাচনমহল",
            "schools": []
          },
          {
            "name": "ভৈরবপাশা",
            "schools": []
          },
          {
            "name": "মগর",
            "schools": []
          },
          {
            "name": "মোল্লারহাট",
            "schools": []
          },
          {
            "name": "রানাপাশা",
            "schools": []
          },
          {
            "name": "সিদ্ধকাঠী",
            "schools": []
          },
          {
            "name": "সুবিদপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "রাজাপুর",
        "unions": [
          {
            "name": "গালুয়া",
            "schools": []
          },
          {
            "name": "বড়ইয়া",
            "schools": []
          },
          {
            "name": "মঠবাড়ী",
            "schools": []
          },
          {
            "name": "রাজাপুর",
            "schools": []
          },
          {
            "name": "শুক্তাগড়",
            "schools": []
          },
          {
            "name": "সাতুরিয়া",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "ঝিনাইদহ",
    "upazilas": [
      {
        "name": "কালীগঞ্জ",
        "unions": [
          {
            "name": "কাষ্টভাঙ্গা",
            "schools": []
          },
          {
            "name": "কোলা",
            "schools": []
          },
          {
            "name": "জামাল",
            "schools": []
          },
          {
            "name": "ত্রিলোচনপুর",
            "schools": []
          },
          {
            "name": "নিয়ামতপুর",
            "schools": []
          },
          {
            "name": "বারবাজার",
            "schools": []
          },
          {
            "name": "মালিয়াট",
            "schools": []
          },
          {
            "name": "রাখালগাছি",
            "schools": []
          },
          {
            "name": "রায়গ্রাম",
            "schools": []
          },
          {
            "name": "শিমলা-রোকনপুর",
            "schools": []
          },
          {
            "name": "সুন্দরপুর-দূর্গাপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "কোটচাঁদপুর",
        "unions": [
          {
            "name": "এলাঙ্গী",
            "schools": []
          },
          {
            "name": "কুশনা",
            "schools": []
          },
          {
            "name": "দোড়া",
            "schools": []
          },
          {
            "name": "বলুহর",
            "schools": []
          },
          {
            "name": "সাবদালপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "ঝিনাইদহ সদর",
        "unions": [
          {
            "name": "কালীচরণপুর",
            "schools": []
          },
          {
            "name": "কুমড়াবাড়ীয়া",
            "schools": []
          },
          {
            "name": "গান্না",
            "schools": []
          },
          {
            "name": "ঘোড়শাল",
            "schools": []
          },
          {
            "name": "দোগাছি",
            "schools": []
          },
          {
            "name": "নলডাঙ্গা",
            "schools": []
          },
          {
            "name": "পদ্মাকর",
            "schools": []
          },
          {
            "name": "পাগলাকানাই",
            "schools": []
          },
          {
            "name": "পোড়াহাটী",
            "schools": []
          },
          {
            "name": "ফুরসন্দি",
            "schools": []
          },
          {
            "name": "মধুহাটী",
            "schools": []
          },
          {
            "name": "মহারাজপুর",
            "schools": []
          },
          {
            "name": "সাগান্না",
            "schools": []
          },
          {
            "name": "সাধুহাটী",
            "schools": []
          },
          {
            "name": "সুরাট",
            "schools": []
          },
          {
            "name": "হরিশংকরপুর",
            "schools": []
          },
          {
            "name": "হলিধানী",
            "schools": []
          }
        ]
      },
      {
        "name": "মহেশপুর",
        "unions": [
          {
            "name": "আজমপুর",
            "schools": []
          },
          {
            "name": "এস, বি, কে",
            "schools": []
          },
          {
            "name": "কাজীরবেড়",
            "schools": []
          },
          {
            "name": "নাটিমা",
            "schools": []
          },
          {
            "name": "নেপা",
            "schools": []
          },
          {
            "name": "পান্থপাড়া",
            "schools": []
          },
          {
            "name": "ফতেপুর",
            "schools": []
          },
          {
            "name": "বাঁশবাড়ীয়া",
            "schools": []
          },
          {
            "name": "মান্দারবাড়ীয়া",
            "schools": []
          },
          {
            "name": "যাদবপুর",
            "schools": []
          },
          {
            "name": "শ্যামকুড়",
            "schools": []
          },
          {
            "name": "স্বরুপপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "শৈলকুপা",
        "unions": [
          {
            "name": "আবাইপুর",
            "schools": []
          },
          {
            "name": "উমেদপুর",
            "schools": []
          },
          {
            "name": "কাঁচেরকোল",
            "schools": []
          },
          {
            "name": "ত্রিবেনী",
            "schools": []
          },
          {
            "name": "দিগনগর",
            "schools": []
          },
          {
            "name": "দুধসর",
            "schools": []
          },
          {
            "name": "ধলহরাচন্দ্র",
            "schools": []
          },
          {
            "name": "নিত্যানন্দপুর",
            "schools": []
          },
          {
            "name": "ফুলহরি",
            "schools": []
          },
          {
            "name": "বগুড়া",
            "schools": []
          },
          {
            "name": "মনোহরপুর",
            "schools": []
          },
          {
            "name": "মির্জাপুর",
            "schools": []
          },
          {
            "name": "সারুটিয়া",
            "schools": []
          },
          {
            "name": "হাকিমপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "হরিণাকুন্ডু",
        "unions": [
          {
            "name": "কাপাশহাটিয়া",
            "schools": []
          },
          {
            "name": "চাঁদপুর",
            "schools": []
          },
          {
            "name": "জোড়াদহ",
            "schools": []
          },
          {
            "name": "তাহেরহুদা",
            "schools": []
          },
          {
            "name": "দৌলতপুর",
            "schools": []
          },
          {
            "name": "ফলসী",
            "schools": []
          },
          {
            "name": "ভায়না",
            "schools": []
          },
          {
            "name": "রঘুনাথপুর",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "টাঙ্গাইল",
    "upazilas": [
      {
        "name": "কালিহাতী",
        "unions": [
          {
            "name": "কোকডহরা",
            "schools": []
          },
          {
            "name": "গোহালিয়াবাড়ী",
            "schools": []
          },
          {
            "name": "দশকিয়া",
            "schools": []
          },
          {
            "name": "দুর্গাপুর",
            "schools": []
          },
          {
            "name": "নাগবাড়ী",
            "schools": []
          },
          {
            "name": "নারান্দিয়া",
            "schools": []
          },
          {
            "name": "পাইকড়া",
            "schools": []
          },
          {
            "name": "পারখী",
            "schools": []
          },
          {
            "name": "বল্লা",
            "schools": []
          },
          {
            "name": "বাংড়া",
            "schools": []
          },
          {
            "name": "বীরবাসিন্দা",
            "schools": []
          },
          {
            "name": "সল্লা",
            "schools": []
          },
          {
            "name": "সহদেবপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "গোপালপুর",
        "unions": [
          {
            "name": "আলমনগর",
            "schools": []
          },
          {
            "name": "ঝাওয়াইল",
            "schools": []
          },
          {
            "name": "ধোপাকান্দি",
            "schools": []
          },
          {
            "name": "নগদাশিমলা",
            "schools": []
          },
          {
            "name": "মির্জাপুর",
            "schools": []
          },
          {
            "name": "হাদিরা",
            "schools": []
          },
          {
            "name": "হেমনগর",
            "schools": []
          }
        ]
      },
      {
        "name": "ঘাটাইল",
        "unions": [
          {
            "name": "আনেহলা",
            "schools": []
          },
          {
            "name": "ঘাটাইল",
            "schools": []
          },
          {
            "name": "জামুরিয়া",
            "schools": []
          },
          {
            "name": "দিগড়",
            "schools": []
          },
          {
            "name": "দিঘলকান্দি",
            "schools": []
          },
          {
            "name": "দেউলাবাড়ী",
            "schools": []
          },
          {
            "name": "দেওপাড়া",
            "schools": []
          },
          {
            "name": "ধলাপাড়া",
            "schools": []
          },
          {
            "name": "রসুলপুর",
            "schools": []
          },
          {
            "name": "লোকেরপাড়া",
            "schools": []
          },
          {
            "name": "সন্ধানপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "টাঙ্গাইল সদর",
        "unions": [
          {
            "name": "করটিয়া",
            "schools": []
          },
          {
            "name": "কাকুয়া",
            "schools": []
          },
          {
            "name": "কাতুলী",
            "schools": []
          },
          {
            "name": "গালা",
            "schools": []
          },
          {
            "name": "ঘারিন্দা",
            "schools": []
          },
          {
            "name": "ছিলিমপুর",
            "schools": []
          },
          {
            "name": "দাইন্যা",
            "schools": []
          },
          {
            "name": "পোড়াবাড়ী",
            "schools": []
          },
          {
            "name": "বাঘিল",
            "schools": []
          },
          {
            "name": "মগড়া",
            "schools": []
          },
          {
            "name": "মাহমুদনগর",
            "schools": []
          },
          {
            "name": "হুগড়া",
            "schools": []
          }
        ]
      },
      {
        "name": "দেলদুয়ার",
        "unions": [
          {
            "name": "আটিয়া",
            "schools": []
          },
          {
            "name": "এলাসিন",
            "schools": []
          },
          {
            "name": "ডুবাইল",
            "schools": []
          },
          {
            "name": "দেউলী",
            "schools": []
          },
          {
            "name": "দেলদুয়ার",
            "schools": []
          },
          {
            "name": "পাথরাইল",
            "schools": []
          },
          {
            "name": "ফাজিলহাটি",
            "schools": []
          },
          {
            "name": "লাউহাটি",
            "schools": []
          }
        ]
      },
      {
        "name": "ধনবাড়ী",
        "unions": [
          {
            "name": "ধোপাখালী",
            "schools": []
          },
          {
            "name": "পাইস্কা",
            "schools": []
          },
          {
            "name": "বলিভদ্র",
            "schools": []
          },
          {
            "name": "বানিয়াজান",
            "schools": []
          },
          {
            "name": "বীরতারা",
            "schools": []
          },
          {
            "name": "মুশুদ্দি",
            "schools": []
          },
          {
            "name": "যদুনাথপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "নাগরপুর",
        "unions": [
          {
            "name": "গয়হাটা",
            "schools": []
          },
          {
            "name": "দপ্তিয়র",
            "schools": []
          },
          {
            "name": "ধুবড়িয়া",
            "schools": []
          },
          {
            "name": "নাগরপুর",
            "schools": []
          },
          {
            "name": "পাকুটিয়া",
            "schools": []
          },
          {
            "name": "বেকরা আটগ্রাম",
            "schools": []
          },
          {
            "name": "ভাদ্রা",
            "schools": []
          },
          {
            "name": "ভারড়া",
            "schools": []
          },
          {
            "name": "মামুদনগর",
            "schools": []
          },
          {
            "name": "মোকনা",
            "schools": []
          },
          {
            "name": "সলিমাবাদ",
            "schools": []
          },
          {
            "name": "সহবতপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "বাসাইল",
        "unions": [
          {
            "name": "কাউলজানী",
            "schools": []
          },
          {
            "name": "কাঞ্চনপুর",
            "schools": []
          },
          {
            "name": "কাশিল",
            "schools": []
          },
          {
            "name": "ফুলকি",
            "schools": []
          },
          {
            "name": "বাসাইল",
            "schools": []
          },
          {
            "name": "হাবলা",
            "schools": []
          }
        ]
      },
      {
        "name": "ভুয়াপুর",
        "unions": [
          {
            "name": "অর্জুনা",
            "schools": []
          },
          {
            "name": "আলোয়া",
            "schools": []
          },
          {
            "name": "গাবসারা",
            "schools": []
          },
          {
            "name": "গোবিন্দাসী",
            "schools": []
          },
          {
            "name": "নিকরাইল",
            "schools": []
          },
          {
            "name": "ফলদা",
            "schools": []
          }
        ]
      },
      {
        "name": "মধুপুর",
        "unions": [
          {
            "name": "অরণখোলা",
            "schools": []
          },
          {
            "name": "আউশনারা",
            "schools": []
          },
          {
            "name": "আলোকদিয়া",
            "schools": []
          },
          {
            "name": "গোলাবাড়ী",
            "schools": []
          },
          {
            "name": "মির্জাবাড়ী",
            "schools": []
          },
          {
            "name": "শোলাকুড়ি",
            "schools": []
          }
        ]
      },
      {
        "name": "মির্জাপুর",
        "unions": [
          {
            "name": "আজগানা",
            "schools": []
          },
          {
            "name": "আনাইতারা",
            "schools": []
          },
          {
            "name": "ওয়ার্শী",
            "schools": []
          },
          {
            "name": "গোড়াই",
            "schools": []
          },
          {
            "name": "জামুর্কী",
            "schools": []
          },
          {
            "name": "তরফপুর",
            "schools": []
          },
          {
            "name": "ফতেপুর",
            "schools": []
          },
          {
            "name": "বহুরিয়া",
            "schools": []
          },
          {
            "name": "বাঁশতৈল",
            "schools": []
          },
          {
            "name": "বানাইল",
            "schools": []
          },
          {
            "name": "ভাওড়া",
            "schools": []
          },
          {
            "name": "ভাতগ্রাম",
            "schools": []
          },
          {
            "name": "মহেড়া",
            "schools": []
          },
          {
            "name": "লতিফপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "সখিপুর",
        "unions": [
          {
            "name": "কাকড়াজান",
            "schools": []
          },
          {
            "name": "কালমেঘা",
            "schools": []
          },
          {
            "name": "কালিয়া",
            "schools": []
          },
          {
            "name": "গজারিয়া",
            "schools": []
          },
          {
            "name": "দরিয়াপুর",
            "schools": []
          },
          {
            "name": "বহেড়াতৈল",
            "schools": []
          },
          {
            "name": "যাদবপুর",
            "schools": []
          },
          {
            "name": "হাতীবান্ধা",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "ঠাকুরগাঁও",
    "upazilas": [
      {
        "name": "ঠাকুরগাঁও সদর",
        "unions": [
          {
            "name": "আউলিয়াপুর",
            "schools": []
          },
          {
            "name": "আকচা",
            "schools": []
          },
          {
            "name": "আখানগর",
            "schools": []
          },
          {
            "name": "গড়েয়া",
            "schools": []
          },
          {
            "name": "চিলারং",
            "schools": []
          },
          {
            "name": "জগন্নাথপুর",
            "schools": []
          },
          {
            "name": "জামালপুর",
            "schools": []
          },
          {
            "name": "ঢোলারহাট",
            "schools": []
          },
          {
            "name": "দেবীপুর",
            "schools": []
          },
          {
            "name": "নারগুন",
            "schools": []
          },
          {
            "name": "বড়গাঁও",
            "schools": []
          },
          {
            "name": "বালিয়া",
            "schools": []
          },
          {
            "name": "বেগুনবাড়ী",
            "schools": []
          },
          {
            "name": "মোহাম্মদপুর",
            "schools": []
          },
          {
            "name": "রহিমানপুর",
            "schools": []
          },
          {
            "name": "রাজাগাঁও",
            "schools": []
          },
          {
            "name": "রায়পুর",
            "schools": []
          },
          {
            "name": "রুহিয়া",
            "schools": []
          },
          {
            "name": "রুহিয়া পশ্চিম",
            "schools": []
          },
          {
            "name": "শুখানপুকুরী",
            "schools": []
          },
          {
            "name": "সালন্দর",
            "schools": []
          }
        ]
      },
      {
        "name": "পীরগঞ্জ",
        "unions": [
          {
            "name": "কোষারাণীগঞ্জ",
            "schools": []
          },
          {
            "name": "খনগাঁও",
            "schools": []
          },
          {
            "name": "জাবরহাট",
            "schools": []
          },
          {
            "name": "দৌলতপুর",
            "schools": []
          },
          {
            "name": "পীরগঞ্জ",
            "schools": []
          },
          {
            "name": "বৈরচুনা",
            "schools": []
          },
          {
            "name": "ভোমরাদহ",
            "schools": []
          },
          {
            "name": "সেনগাঁও",
            "schools": []
          },
          {
            "name": "সৈয়দপুর",
            "schools": []
          },
          {
            "name": "হাজীপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "বালিয়াডাঙ্গী",
        "unions": [
          {
            "name": "আমজানখোর",
            "schools": []
          },
          {
            "name": "চারোল",
            "schools": []
          },
          {
            "name": "দুওসুও",
            "schools": []
          },
          {
            "name": "ধনতলা",
            "schools": []
          },
          {
            "name": "পাড়িয়া",
            "schools": []
          },
          {
            "name": "বড়পলাশবাড়ী",
            "schools": []
          },
          {
            "name": "বড়বাড়ী",
            "schools": []
          },
          {
            "name": "ভানোর",
            "schools": []
          }
        ]
      },
      {
        "name": "রাণীশংকৈল",
        "unions": [
          {
            "name": "কাশিপুর",
            "schools": []
          },
          {
            "name": "ধর্মগড়",
            "schools": []
          },
          {
            "name": "নন্দুয়ার",
            "schools": []
          },
          {
            "name": "নেকমরদ",
            "schools": []
          },
          {
            "name": "বাচোর",
            "schools": []
          },
          {
            "name": "রাতোর",
            "schools": []
          },
          {
            "name": "লেহেম্বা",
            "schools": []
          },
          {
            "name": "হোসেনগাঁও",
            "schools": []
          }
        ]
      },
      {
        "name": "হরিপুর",
        "unions": [
          {
            "name": "আমগাঁও",
            "schools": []
          },
          {
            "name": "গেদুড়া",
            "schools": []
          },
          {
            "name": "ডাঙ্গীপাড়া",
            "schools": []
          },
          {
            "name": "বকুয়া",
            "schools": []
          },
          {
            "name": "ভাতুরিয়া",
            "schools": []
          },
          {
            "name": "হরিপুর",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "ঢাকা",
    "upazilas": [
      {
        "name": "কেরাণীগঞ্জ",
        "unions": [
          {
            "name": "আগানগর",
            "schools": []
          },
          {
            "name": "কলাতিয়া",
            "schools": []
          },
          {
            "name": "কালিন্দি",
            "schools": []
          },
          {
            "name": "কোন্ডা",
            "schools": []
          },
          {
            "name": "জিনজিরা",
            "schools": []
          },
          {
            "name": "তারানগর",
            "schools": []
          },
          {
            "name": "তেঘরিয়া",
            "schools": []
          },
          {
            "name": "বাস্তা",
            "schools": []
          },
          {
            "name": "রোহিতপুর",
            "schools": []
          },
          {
            "name": "শাক্তা",
            "schools": []
          },
          {
            "name": "শুভাঢ্যা",
            "schools": []
          },
          {
            "name": "হযরতপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "দোহার",
        "unions": [
          {
            "name": "কুসুমহাটি",
            "schools": []
          },
          {
            "name": "নয়াবাড়ী",
            "schools": []
          },
          {
            "name": "নারিশা",
            "schools": []
          },
          {
            "name": "বিলাসপুর",
            "schools": []
          },
          {
            "name": "মাহমুদপুর",
            "schools": []
          },
          {
            "name": "মুকসুদপুর",
            "schools": []
          },
          {
            "name": "রাইপাড়া",
            "schools": []
          },
          {
            "name": "সুতারপাড়া",
            "schools": []
          }
        ]
      },
      {
        "name": "ধামরাই",
        "unions": [
          {
            "name": "আমতা",
            "schools": []
          },
          {
            "name": "কুল্লা",
            "schools": []
          },
          {
            "name": "কুশুরা",
            "schools": []
          },
          {
            "name": "গাংগুটিয়া",
            "schools": []
          },
          {
            "name": "চৌহাট",
            "schools": []
          },
          {
            "name": "ধামরাই",
            "schools": []
          },
          {
            "name": "নান্নার",
            "schools": []
          },
          {
            "name": "বাইশাকান্দা",
            "schools": []
          },
          {
            "name": "বালিয়া",
            "schools": []
          },
          {
            "name": "ভাড়ারিয়া",
            "schools": []
          },
          {
            "name": "যাদবপুর",
            "schools": []
          },
          {
            "name": "রোয়াইল",
            "schools": []
          },
          {
            "name": "সানোড়া",
            "schools": []
          },
          {
            "name": "সুয়াপুর",
            "schools": []
          },
          {
            "name": "সূতিপাড়া",
            "schools": []
          },
          {
            "name": "সোমভাগ",
            "schools": []
          }
        ]
      },
      {
        "name": "নবাবগঞ্জ",
        "unions": [
          {
            "name": "আগলা",
            "schools": []
          },
          {
            "name": "কলাকোপা",
            "schools": []
          },
          {
            "name": "কৈলাইল",
            "schools": []
          },
          {
            "name": "গালিমপুর",
            "schools": []
          },
          {
            "name": "চুড়াইন",
            "schools": []
          },
          {
            "name": "জয়কৃষ্ণপুর",
            "schools": []
          },
          {
            "name": "নয়নশ্রী",
            "schools": []
          },
          {
            "name": "বক্সনগর",
            "schools": []
          },
          {
            "name": "বান্দুরা",
            "schools": []
          },
          {
            "name": "বারুয়াখালী",
            "schools": []
          },
          {
            "name": "বাহ্রা",
            "schools": []
          },
          {
            "name": "যন্ত্রাইল",
            "schools": []
          },
          {
            "name": "শিকারীপাড়া",
            "schools": []
          },
          {
            "name": "শোল্লা",
            "schools": []
          }
        ]
      },
      {
        "name": "সাভার",
        "unions": [
          {
            "name": "আমিনবাজার",
            "schools": []
          },
          {
            "name": "আশুলিয়া",
            "schools": []
          },
          {
            "name": "ইয়ারপুর",
            "schools": []
          },
          {
            "name": "কাউন্দিয়া",
            "schools": []
          },
          {
            "name": "তেঁতুলঝোড়া",
            "schools": []
          },
          {
            "name": "ধামসোনা",
            "schools": []
          },
          {
            "name": "পাথালিয়া",
            "schools": []
          },
          {
            "name": "বনগাঁও",
            "schools": []
          },
          {
            "name": "বিরুলিয়া",
            "schools": []
          },
          {
            "name": "ভাকুর্তা",
            "schools": []
          },
          {
            "name": "শিমুলিয়া",
            "schools": []
          },
          {
            "name": "সাভার",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "দিনাজপুর",
    "upazilas": [
      {
        "name": "কাহারোল",
        "unions": [
          {
            "name": "ডাবোর",
            "schools": []
          },
          {
            "name": "তারগাঁও",
            "schools": []
          },
          {
            "name": "মুকুন্দপুর",
            "schools": []
          },
          {
            "name": "রসুলপুর",
            "schools": []
          },
          {
            "name": "রামচন্দ্রপুর",
            "schools": []
          },
          {
            "name": "সুন্দরপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "খানসামা",
        "unions": [
          {
            "name": "আঙ্গারপাড়া",
            "schools": []
          },
          {
            "name": "আলোকঝাড়ী",
            "schools": []
          },
          {
            "name": "খামারপাড়া",
            "schools": []
          },
          {
            "name": "গোয়ালডিহি",
            "schools": []
          },
          {
            "name": "ভাবকী",
            "schools": []
          },
          {
            "name": "ভেড়ভেড়ী",
            "schools": []
          }
        ]
      },
      {
        "name": "ঘোড়াঘাট",
        "unions": [
          {
            "name": "ঘোড়াঘাট",
            "schools": []
          },
          {
            "name": "পালশা",
            "schools": []
          },
          {
            "name": "বুলাকীপুর",
            "schools": []
          },
          {
            "name": "সিংড়া",
            "schools": []
          }
        ]
      },
      {
        "name": "চিরিরবন্দর",
        "unions": [
          {
            "name": "অমরপুর",
            "schools": []
          },
          {
            "name": "আউলিয়াপুকুর",
            "schools": []
          },
          {
            "name": "আব্দুলপুর",
            "schools": []
          },
          {
            "name": "আলোকডিহি",
            "schools": []
          },
          {
            "name": "ইসবপুর",
            "schools": []
          },
          {
            "name": "তেতুলিয়া",
            "schools": []
          },
          {
            "name": "নশরতপুর",
            "schools": []
          },
          {
            "name": "পুনট্টি",
            "schools": []
          },
          {
            "name": "ফতেজংপুর",
            "schools": []
          },
          {
            "name": "ভিয়াইল",
            "schools": []
          },
          {
            "name": "সাইতারা",
            "schools": []
          },
          {
            "name": "সাতনালা",
            "schools": []
          }
        ]
      },
      {
        "name": "দিনাজপুর সদর",
        "unions": [
          {
            "name": "আউলিয়াপুর",
            "schools": []
          },
          {
            "name": "আস্করপুর",
            "schools": []
          },
          {
            "name": "উথরাইল",
            "schools": []
          },
          {
            "name": "কমলপুর",
            "schools": []
          },
          {
            "name": "চেহেলগাজী",
            "schools": []
          },
          {
            "name": "ফাজিলপুর",
            "schools": []
          },
          {
            "name": "শংকরপুর",
            "schools": []
          },
          {
            "name": "শশরা",
            "schools": []
          },
          {
            "name": "শেখপুরা",
            "schools": []
          },
          {
            "name": "সুন্দরবন",
            "schools": []
          }
        ]
      },
      {
        "name": "নবাবগঞ্জ",
        "unions": [
          {
            "name": "কুশদহ",
            "schools": []
          },
          {
            "name": "গোলাপগঞ্জ",
            "schools": []
          },
          {
            "name": "জয়পুর",
            "schools": []
          },
          {
            "name": "দাউদপুর",
            "schools": []
          },
          {
            "name": "পুটিমারা",
            "schools": []
          },
          {
            "name": "বিনোদনগর",
            "schools": []
          },
          {
            "name": "ভাদুরিয়া",
            "schools": []
          },
          {
            "name": "মাহামুদপুর",
            "schools": []
          },
          {
            "name": "শালখুরিয়া",
            "schools": []
          }
        ]
      },
      {
        "name": "পার্বতীপুর",
        "unions": [
          {
            "name": "চন্ডীপুর",
            "schools": []
          },
          {
            "name": "পলাশবাড়ী",
            "schools": []
          },
          {
            "name": "বেলাইচন্ডি",
            "schools": []
          },
          {
            "name": "মন্মথপুর",
            "schools": []
          },
          {
            "name": "মোমিনপুর",
            "schools": []
          },
          {
            "name": "মোস্তফাপুর",
            "schools": []
          },
          {
            "name": "রামপুর",
            "schools": []
          },
          {
            "name": "হরিরামপুর",
            "schools": []
          },
          {
            "name": "হাবড়া",
            "schools": []
          },
          {
            "name": "হামিদপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "ফুলবাড়ী",
        "unions": [
          {
            "name": "আলাদিপুর",
            "schools": []
          },
          {
            "name": "এলুয়াড়ী",
            "schools": []
          },
          {
            "name": "কাজীহাল",
            "schools": []
          },
          {
            "name": "খয়েরবাড়ী",
            "schools": []
          },
          {
            "name": "দৌলতপুর",
            "schools": []
          },
          {
            "name": "বেতদিঘী",
            "schools": []
          },
          {
            "name": "শিবনগর",
            "schools": []
          }
        ]
      },
      {
        "name": "বিরল",
        "unions": [
          {
            "name": "আজিমপুর",
            "schools": []
          },
          {
            "name": "ধর্মপুর",
            "schools": []
          },
          {
            "name": "ধামইর",
            "schools": []
          },
          {
            "name": "ফরাক্কাবাদ",
            "schools": []
          },
          {
            "name": "বিজোড়া",
            "schools": []
          },
          {
            "name": "বিরল",
            "schools": []
          },
          {
            "name": "ভান্ডারা",
            "schools": []
          },
          {
            "name": "মঙ্গলপুর",
            "schools": []
          },
          {
            "name": "রাজারামপুর",
            "schools": []
          },
          {
            "name": "রাণীপুকুর",
            "schools": []
          },
          {
            "name": "শহরগ্রাম",
            "schools": []
          }
        ]
      },
      {
        "name": "বিরামপুর",
        "unions": [
          {
            "name": "কাটলা",
            "schools": []
          },
          {
            "name": "খানপুর",
            "schools": []
          },
          {
            "name": "জোতবানী",
            "schools": []
          },
          {
            "name": "দিওড়",
            "schools": []
          },
          {
            "name": "পলিপ্রয়াগপুর",
            "schools": []
          },
          {
            "name": "বিনাইল",
            "schools": []
          },
          {
            "name": "মুকুন্দপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "বীরগঞ্জ",
        "unions": [
          {
            "name": "নিজপাড়া",
            "schools": []
          },
          {
            "name": "পলাশবাড়ী",
            "schools": []
          },
          {
            "name": "পাল্টাপুর",
            "schools": []
          },
          {
            "name": "ভোগনগর",
            "schools": []
          },
          {
            "name": "মরিচা",
            "schools": []
          },
          {
            "name": "মোহনপুর",
            "schools": []
          },
          {
            "name": "মোহাম্মদপুর",
            "schools": []
          },
          {
            "name": "শতগ্রাম",
            "schools": []
          },
          {
            "name": "শিবরামপুর",
            "schools": []
          },
          {
            "name": "সাতোর",
            "schools": []
          },
          {
            "name": "সুজালপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "বোচাগঞ্জ",
        "unions": [
          {
            "name": "আটগাঁও",
            "schools": []
          },
          {
            "name": "ঈশানিয়া",
            "schools": []
          },
          {
            "name": "ছাতইল",
            "schools": []
          },
          {
            "name": "নাফানগর",
            "schools": []
          },
          {
            "name": "মুর্শিদহাট",
            "schools": []
          },
          {
            "name": "রনগাঁও",
            "schools": []
          }
        ]
      },
      {
        "name": "হাকিমপুর",
        "unions": [
          {
            "name": "আলীহাট",
            "schools": []
          },
          {
            "name": "খট্টামাধবপাড়া",
            "schools": []
          },
          {
            "name": "বোয়ালদার",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "নওগাঁ",
    "upazilas": [
      {
        "name": "আত্রাই",
        "unions": [
          {
            "name": "আহসানগঞ্জ",
            "schools": []
          },
          {
            "name": "কালিকাপুর",
            "schools": []
          },
          {
            "name": "পাঁচুপুর",
            "schools": []
          },
          {
            "name": "বিশা",
            "schools": []
          },
          {
            "name": "ভোঁপড়া",
            "schools": []
          },
          {
            "name": "মনিয়ারী",
            "schools": []
          },
          {
            "name": "শাহাগোলা",
            "schools": []
          },
          {
            "name": "হাটকালুপাড়া",
            "schools": []
          }
        ]
      },
      {
        "name": "ধামইরহাট",
        "unions": [
          {
            "name": "আগ্রাদ্বিগুন",
            "schools": []
          },
          {
            "name": "আড়ানগর",
            "schools": []
          },
          {
            "name": "আলমপুর",
            "schools": []
          },
          {
            "name": "ইসবপুর",
            "schools": []
          },
          {
            "name": "উমার",
            "schools": []
          },
          {
            "name": "খেলনা",
            "schools": []
          },
          {
            "name": "জাহানপুর",
            "schools": []
          },
          {
            "name": "ধামইরহাট",
            "schools": []
          }
        ]
      },
      {
        "name": "নওগাঁ সদর",
        "unions": [
          {
            "name": "কির্ত্তিপুর",
            "schools": []
          },
          {
            "name": "চন্ডিপুর",
            "schools": []
          },
          {
            "name": "তিলোকপুর",
            "schools": []
          },
          {
            "name": "দুবলহাটী",
            "schools": []
          },
          {
            "name": "বক্তারপুর",
            "schools": []
          },
          {
            "name": "বর্ষাইল",
            "schools": []
          },
          {
            "name": "বলিহার",
            "schools": []
          },
          {
            "name": "বোয়ালিয়া",
            "schools": []
          },
          {
            "name": "শিকারপুর",
            "schools": []
          },
          {
            "name": "শৈলগাছী",
            "schools": []
          },
          {
            "name": "হাঁসাইগাড়ী",
            "schools": []
          },
          {
            "name": "হাপানিয়া",
            "schools": []
          }
        ]
      },
      {
        "name": "নিয়ামতপুর",
        "unions": [
          {
            "name": "চন্দননগর",
            "schools": []
          },
          {
            "name": "নিয়ামতপুর",
            "schools": []
          },
          {
            "name": "পাড়ইল",
            "schools": []
          },
          {
            "name": "বাহাদুরপুর",
            "schools": []
          },
          {
            "name": "ভাবিচা",
            "schools": []
          },
          {
            "name": "রসুলপুর",
            "schools": []
          },
          {
            "name": "শ্রীমন্তপুর",
            "schools": []
          },
          {
            "name": "হাজীনগর",
            "schools": []
          }
        ]
      },
      {
        "name": "পত্নিতলা",
        "unions": [
          {
            "name": "আকবরপুর",
            "schools": []
          },
          {
            "name": "আমাইড়",
            "schools": []
          },
          {
            "name": "কৃষ্ণপুর",
            "schools": []
          },
          {
            "name": "ঘষনগর",
            "schools": []
          },
          {
            "name": "দিবর",
            "schools": []
          },
          {
            "name": "নজিপুর",
            "schools": []
          },
          {
            "name": "নিমইল",
            "schools": []
          },
          {
            "name": "পত্নীতলা",
            "schools": []
          },
          {
            "name": "পাটিচড়া",
            "schools": []
          },
          {
            "name": "মাটিন্দর",
            "schools": []
          },
          {
            "name": "শিহারা",
            "schools": []
          }
        ]
      },
      {
        "name": "পোরশা",
        "unions": [
          {
            "name": "গাঙ্গুরিয়া",
            "schools": []
          },
          {
            "name": "ঘাটনগর",
            "schools": []
          },
          {
            "name": "ছাওড়",
            "schools": []
          },
          {
            "name": "তেঁতুলিয়া",
            "schools": []
          },
          {
            "name": "নিতপুর",
            "schools": []
          },
          {
            "name": "মশিদপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "বদলগাছী",
        "unions": [
          {
            "name": "আধাইপুর",
            "schools": []
          },
          {
            "name": "কোলা",
            "schools": []
          },
          {
            "name": "পাহারপুর",
            "schools": []
          },
          {
            "name": "বদলগাছী",
            "schools": []
          },
          {
            "name": "বালুভরা",
            "schools": []
          },
          {
            "name": "বিলাশবাড়ী",
            "schools": []
          },
          {
            "name": "মথুরাপুর",
            "schools": []
          },
          {
            "name": "মিঠাপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "মহাদেবপুর",
        "unions": [
          {
            "name": "উত্তরগ্রাম",
            "schools": []
          },
          {
            "name": "এনায়েতপুর",
            "schools": []
          },
          {
            "name": "খাজুর",
            "schools": []
          },
          {
            "name": "চাঁন্দাশ",
            "schools": []
          },
          {
            "name": "চেরাগপুর",
            "schools": []
          },
          {
            "name": "ভীমপুর",
            "schools": []
          },
          {
            "name": "মহাদেবপুর",
            "schools": []
          },
          {
            "name": "রাইগাঁ",
            "schools": []
          },
          {
            "name": "সফাপুর",
            "schools": []
          },
          {
            "name": "হাতুড়",
            "schools": []
          }
        ]
      },
      {
        "name": "মান্দা",
        "unions": [
          {
            "name": "কশব",
            "schools": []
          },
          {
            "name": "কাঁশোকাপুর",
            "schools": []
          },
          {
            "name": "কালিকাপুর",
            "schools": []
          },
          {
            "name": "কুসুম্বা",
            "schools": []
          },
          {
            "name": "গনেশপুর",
            "schools": []
          },
          {
            "name": "তেঁতুলিয়া",
            "schools": []
          },
          {
            "name": "নূরুল্যাবাদ",
            "schools": []
          },
          {
            "name": "পরানপুর",
            "schools": []
          },
          {
            "name": "প্রসাদপুর",
            "schools": []
          },
          {
            "name": "বিষ্ণপুর",
            "schools": []
          },
          {
            "name": "ভারশো",
            "schools": []
          },
          {
            "name": "ভালাইন",
            "schools": []
          },
          {
            "name": "মান্দা",
            "schools": []
          },
          {
            "name": "মৈনম",
            "schools": []
          }
        ]
      },
      {
        "name": "রাণীনগর",
        "unions": [
          {
            "name": "একডালা",
            "schools": []
          },
          {
            "name": "কালিগ্রাম",
            "schools": []
          },
          {
            "name": "কাশিমপুর",
            "schools": []
          },
          {
            "name": "খট্টেশ্বর রাণীনগর",
            "schools": []
          },
          {
            "name": "গোনা",
            "schools": []
          },
          {
            "name": "পারইল",
            "schools": []
          },
          {
            "name": "বরগাছা",
            "schools": []
          },
          {
            "name": "মিরাট",
            "schools": []
          }
        ]
      },
      {
        "name": "সাপাহার",
        "unions": [
          {
            "name": "আইহাই",
            "schools": []
          },
          {
            "name": "গোয়ালা",
            "schools": []
          },
          {
            "name": "তিলনা",
            "schools": []
          },
          {
            "name": "পাতাড়ী",
            "schools": []
          },
          {
            "name": "শিরন্টী",
            "schools": []
          },
          {
            "name": "সাপাহার",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "নড়াইল",
    "upazilas": [
      {
        "name": "কালিয়া",
        "unions": [
          {
            "name": "কলাবাড়ীয়া",
            "schools": []
          },
          {
            "name": "খাসিয়াল",
            "schools": []
          },
          {
            "name": "চাচুড়ী",
            "schools": []
          },
          {
            "name": "জয়নগর",
            "schools": []
          },
          {
            "name": "পহরডাঙ্গা",
            "schools": []
          },
          {
            "name": "পাঁচগ্রাম",
            "schools": []
          },
          {
            "name": "পুরুলিয়া",
            "schools": []
          },
          {
            "name": "পেড়লী",
            "schools": []
          },
          {
            "name": "বড়নাল-ইলিয়াছাবাদ",
            "schools": []
          },
          {
            "name": "বাঐসোনা",
            "schools": []
          },
          {
            "name": "বাবরা-হাচলা",
            "schools": []
          },
          {
            "name": "মাউলী",
            "schools": []
          },
          {
            "name": "সালামাবাদ",
            "schools": []
          },
          {
            "name": "হামিদপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "নড়াইল সদর",
        "unions": [
          {
            "name": "আউড়িয়া",
            "schools": []
          },
          {
            "name": "কলোড়া",
            "schools": []
          },
          {
            "name": "চন্ডিবরপুর",
            "schools": []
          },
          {
            "name": "তুলারামপুর",
            "schools": []
          },
          {
            "name": "বাশগ্রাম",
            "schools": []
          },
          {
            "name": "বিছালী",
            "schools": []
          },
          {
            "name": "ভদ্রবিলা",
            "schools": []
          },
          {
            "name": "মাইজপাড়া",
            "schools": []
          },
          {
            "name": "মুলিয়া",
            "schools": []
          },
          {
            "name": "শাহাবাদ",
            "schools": []
          },
          {
            "name": "সিঙ্গাশোলপুর",
            "schools": []
          },
          {
            "name": "সেখহাটী",
            "schools": []
          },
          {
            "name": "হবখালী",
            "schools": []
          }
        ]
      },
      {
        "name": "লোহাগড়া",
        "unions": [
          {
            "name": "ইতনা",
            "schools": []
          },
          {
            "name": "কাশিপুর",
            "schools": []
          },
          {
            "name": "কোটাকোল",
            "schools": []
          },
          {
            "name": "জয়পুর",
            "schools": []
          },
          {
            "name": "দিঘলিয়া",
            "schools": []
          },
          {
            "name": "নলদী",
            "schools": []
          },
          {
            "name": "নোয়াগ্রাম",
            "schools": []
          },
          {
            "name": "মল্লিকপুর",
            "schools": []
          },
          {
            "name": "লক্ষীপাশা",
            "schools": []
          },
          {
            "name": "লাহুড়িয়া",
            "schools": []
          },
          {
            "name": "লোহাগড়া",
            "schools": []
          },
          {
            "name": "শালনগর",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "নরসিংদী",
    "upazilas": [
      {
        "name": "নরসিংদী সদর",
        "unions": [
          {
            "name": "আমদিয়া ২",
            "schools": []
          },
          {
            "name": "আলোকবালী",
            "schools": []
          },
          {
            "name": "করিমপুর",
            "schools": []
          },
          {
            "name": "কাঠালিয়া",
            "schools": []
          },
          {
            "name": "চরদিঘলদী",
            "schools": []
          },
          {
            "name": "চিনিশপুর",
            "schools": []
          },
          {
            "name": "নজরপুর",
            "schools": []
          },
          {
            "name": "নূরালাপুর",
            "schools": []
          },
          {
            "name": "পাইকারচর",
            "schools": []
          },
          {
            "name": "পাঁচদোনা",
            "schools": []
          },
          {
            "name": "মহিষাশুড়া",
            "schools": []
          },
          {
            "name": "মেহেড়পাড়া",
            "schools": []
          },
          {
            "name": "শিলমান্দী",
            "schools": []
          },
          {
            "name": "হাজীপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "পলাশ",
        "unions": [
          {
            "name": "গজারিয়া",
            "schools": []
          },
          {
            "name": "চরসিন্দুর",
            "schools": []
          },
          {
            "name": "জিনারদী",
            "schools": []
          },
          {
            "name": "ডাংঙ্গা",
            "schools": []
          }
        ]
      },
      {
        "name": "বেলাবো",
        "unions": [
          {
            "name": "আমলাব",
            "schools": []
          },
          {
            "name": "চরউজিলাব",
            "schools": []
          },
          {
            "name": "দেয়ারা মডেল",
            "schools": []
          },
          {
            "name": "নারায়নপুর",
            "schools": []
          },
          {
            "name": "পাটুলী",
            "schools": []
          },
          {
            "name": "বাজনাব",
            "schools": []
          },
          {
            "name": "বিন্নাবাইদ",
            "schools": []
          },
          {
            "name": "বেলাব",
            "schools": []
          },
          {
            "name": "সল্লাবাদ",
            "schools": []
          }
        ]
      },
      {
        "name": "মনোহরদী",
        "unions": [
          {
            "name": "একদুয়ারিয়া",
            "schools": []
          },
          {
            "name": "কাচিকাটা",
            "schools": []
          },
          {
            "name": "কৃষ্ণপুর",
            "schools": []
          },
          {
            "name": "খিদিরপুর",
            "schools": []
          },
          {
            "name": "গোতাশিয়া",
            "schools": []
          },
          {
            "name": "চন্দনবাড়ী",
            "schools": []
          },
          {
            "name": "চরমান্দালিয়া",
            "schools": []
          },
          {
            "name": "চালাকচর",
            "schools": []
          },
          {
            "name": "দৌলতপুর",
            "schools": []
          },
          {
            "name": "বড়চাপা",
            "schools": []
          },
          {
            "name": "লেবুতলা",
            "schools": []
          },
          {
            "name": "শুকুন্দি",
            "schools": []
          }
        ]
      },
      {
        "name": "রায়পুরা",
        "unions": [
          {
            "name": "অলিপুরা",
            "schools": []
          },
          {
            "name": "আদিয়াবাদ",
            "schools": []
          },
          {
            "name": "আমিরগঞ্জ",
            "schools": []
          },
          {
            "name": "উত্তর বাখরনগর",
            "schools": []
          },
          {
            "name": "চরআড়ালিয়া",
            "schools": []
          },
          {
            "name": "চরমধুয়া",
            "schools": []
          },
          {
            "name": "চরসুবুদ্দি",
            "schools": []
          },
          {
            "name": "চানপুর",
            "schools": []
          },
          {
            "name": "চান্দেরকান্দি",
            "schools": []
          },
          {
            "name": "ডৌকারচর",
            "schools": []
          },
          {
            "name": "নিলক্ষ্যা",
            "schools": []
          },
          {
            "name": "পলাশতলী",
            "schools": []
          },
          {
            "name": "পাড়াতলী",
            "schools": []
          },
          {
            "name": "বাঁশগাড়ী",
            "schools": []
          },
          {
            "name": "মরজাল",
            "schools": []
          },
          {
            "name": "মহেষপুর",
            "schools": []
          },
          {
            "name": "মির্জানগর",
            "schools": []
          },
          {
            "name": "মির্জারচর",
            "schools": []
          },
          {
            "name": "মুছাপুর",
            "schools": []
          },
          {
            "name": "রায়পুরা",
            "schools": []
          },
          {
            "name": "শ্রীনগর",
            "schools": []
          },
          {
            "name": "হাইরমারা",
            "schools": []
          }
        ]
      },
      {
        "name": "শিবপুর",
        "unions": [
          {
            "name": "আয়ুবপুর",
            "schools": []
          },
          {
            "name": "চক্রধা",
            "schools": []
          },
          {
            "name": "জয়নগর",
            "schools": []
          },
          {
            "name": "দুলালপুর",
            "schools": []
          },
          {
            "name": "পুটিয়া",
            "schools": []
          },
          {
            "name": "বাঘাব",
            "schools": []
          },
          {
            "name": "মাছিমপুর",
            "schools": []
          },
          {
            "name": "যোশর",
            "schools": []
          },
          {
            "name": "সাধারচর",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "নাটোর",
    "upazilas": [
      {
        "name": "গুরুদাসপুর",
        "unions": [
          {
            "name": "খুবজীপুর",
            "schools": []
          },
          {
            "name": "চাপিলা",
            "schools": []
          },
          {
            "name": "ধারাবারিষা",
            "schools": []
          },
          {
            "name": "নাজিরপুর",
            "schools": []
          },
          {
            "name": "বিয়াঘাট",
            "schools": []
          },
          {
            "name": "মসিন্দা",
            "schools": []
          }
        ]
      },
      {
        "name": "নলডাঙ্গা",
        "unions": []
      },
      {
        "name": "নাটোর সদর",
        "unions": [
          {
            "name": "কাফুরিয়া",
            "schools": []
          },
          {
            "name": "খাজুরা",
            "schools": []
          },
          {
            "name": "ছাতনী",
            "schools": []
          },
          {
            "name": "তেবাড়িয়া",
            "schools": []
          },
          {
            "name": "দিঘাপতিয়া",
            "schools": []
          },
          {
            "name": "পিপরুল",
            "schools": []
          },
          {
            "name": "বড়হরিশপুর",
            "schools": []
          },
          {
            "name": "বিপ্রবেলঘড়িয়া",
            "schools": []
          },
          {
            "name": "ব্রহ্মপুর",
            "schools": []
          },
          {
            "name": "মাধনগর",
            "schools": []
          },
          {
            "name": "লক্ষীপুর খোলাবাড়িয়া",
            "schools": []
          },
          {
            "name": "হালসা",
            "schools": []
          }
        ]
      },
      {
        "name": "বড়াইগ্রাম",
        "unions": [
          {
            "name": "গোপালপুর",
            "schools": []
          },
          {
            "name": "চান্দাই",
            "schools": []
          },
          {
            "name": "জোনাইল",
            "schools": []
          },
          {
            "name": "জোয়াড়ী",
            "schools": []
          },
          {
            "name": "নগর",
            "schools": []
          },
          {
            "name": "বড়াইগ্রাম",
            "schools": []
          },
          {
            "name": "মাঝগাও",
            "schools": []
          }
        ]
      },
      {
        "name": "বাগাতিপাড়া",
        "unions": [
          {
            "name": "জামনগর",
            "schools": []
          },
          {
            "name": "দয়ারামপুর",
            "schools": []
          },
          {
            "name": "পাঁকা",
            "schools": []
          },
          {
            "name": "ফাগুয়ারদিয়াড়",
            "schools": []
          },
          {
            "name": "বাগাতিপাড়া",
            "schools": []
          }
        ]
      },
      {
        "name": "লালপুর",
        "unions": [
          {
            "name": "অর্জুনপুর বরমহাটী",
            "schools": []
          },
          {
            "name": "আড়বাব",
            "schools": []
          },
          {
            "name": "ঈশ্বরদী",
            "schools": []
          },
          {
            "name": "ওয়ালিয়া",
            "schools": []
          },
          {
            "name": "কদিমচিলান",
            "schools": []
          },
          {
            "name": "চংধুপইল",
            "schools": []
          },
          {
            "name": "দুড়দুরিয়া",
            "schools": []
          },
          {
            "name": "দুয়ারিয়া",
            "schools": []
          },
          {
            "name": "বিলমাড়িয়া",
            "schools": []
          },
          {
            "name": "লালপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "সিংড়া",
        "unions": [
          {
            "name": "ইটালী",
            "schools": []
          },
          {
            "name": "কলম",
            "schools": []
          },
          {
            "name": "চামারী",
            "schools": []
          },
          {
            "name": "চৌগ্রাম",
            "schools": []
          },
          {
            "name": "ছাতারদিঘী",
            "schools": []
          },
          {
            "name": "ডাহিয়া",
            "schools": []
          },
          {
            "name": "তাজপুর",
            "schools": []
          },
          {
            "name": "রামান্দখাজুরা",
            "schools": []
          },
          {
            "name": "লালোর",
            "schools": []
          },
          {
            "name": "শুকাশ",
            "schools": []
          },
          {
            "name": "শেরকোল",
            "schools": []
          },
          {
            "name": "হাতিয়ানদহ",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "নারায়ণগঞ্জ",
    "upazilas": [
      {
        "name": "আড়াইহাজার",
        "unions": [
          {
            "name": "উচিৎপুরা",
            "schools": []
          },
          {
            "name": "কালাপাহাড়িয়া",
            "schools": []
          },
          {
            "name": "খাগকান্দা",
            "schools": []
          },
          {
            "name": "দুপ্তারা",
            "schools": []
          },
          {
            "name": "ফতেপুর",
            "schools": []
          },
          {
            "name": "বিশনন্দী",
            "schools": []
          },
          {
            "name": "ব্রা‏হ্মন্দী",
            "schools": []
          },
          {
            "name": "মাহমুদপুর",
            "schools": []
          },
          {
            "name": "সাতগ্রাম",
            "schools": []
          },
          {
            "name": "হাইজাদী",
            "schools": []
          }
        ]
      },
      {
        "name": "নারায়নগঞ্জ সদর",
        "unions": [
          {
            "name": "আলিরটেক",
            "schools": []
          },
          {
            "name": "এনায়েত নগর",
            "schools": []
          },
          {
            "name": "কাশীপুর",
            "schools": []
          },
          {
            "name": "কুতুবপুর",
            "schools": []
          },
          {
            "name": "গোগনগর",
            "schools": []
          },
          {
            "name": "বক্তাবলী",
            "schools": []
          }
        ]
      },
      {
        "name": "বন্দর",
        "unions": [
          {
            "name": " কলাগাছিয়া",
            "schools": []
          },
          {
            "name": "ধামগর",
            "schools": []
          },
          {
            "name": "বন্দর",
            "schools": []
          },
          {
            "name": "মদনপুর",
            "schools": []
          },
          {
            "name": "মুছাপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "রূপগঞ্জ",
        "unions": [
          {
            "name": "কায়েতপাড়া",
            "schools": []
          },
          {
            "name": "গোলাকান্দাইল",
            "schools": []
          },
          {
            "name": "দাউদপুর",
            "schools": []
          },
          {
            "name": "ভূলতা",
            "schools": []
          },
          {
            "name": "ভোলাব",
            "schools": []
          },
          {
            "name": "মুড়াপাড়া",
            "schools": []
          },
          {
            "name": "রূপগঞ্জ",
            "schools": []
          }
        ]
      },
      {
        "name": "সোনারগাঁ",
        "unions": [
          {
            "name": "কাচপুর",
            "schools": []
          },
          {
            "name": "জামপুর",
            "schools": []
          },
          {
            "name": "নোয়াগাঁও",
            "schools": []
          },
          {
            "name": "পিরোজপুর",
            "schools": []
          },
          {
            "name": "বারদী",
            "schools": []
          },
          {
            "name": "বৈদ্যেরবাজার",
            "schools": []
          },
          {
            "name": "মোগরাপাড়া",
            "schools": []
          },
          {
            "name": "শম্ভুপুরা",
            "schools": []
          },
          {
            "name": "সনমান্দি",
            "schools": []
          },
          {
            "name": "সাদীপুর",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "নীলফামারী",
    "upazilas": [
      {
        "name": "কিশোরগঞ্জ",
        "unions": [
          {
            "name": "কিশোরগঞ্জ",
            "schools": []
          },
          {
            "name": "গাড়াগ্রাম",
            "schools": []
          },
          {
            "name": "চাঁদখানা",
            "schools": []
          },
          {
            "name": "নিতাই",
            "schools": []
          },
          {
            "name": "পুটিমারী",
            "schools": []
          },
          {
            "name": "বড়ভিটা",
            "schools": []
          },
          {
            "name": "বাহাগিলি",
            "schools": []
          },
          {
            "name": "মাগুরা",
            "schools": []
          },
          {
            "name": "রনচন্ডি",
            "schools": []
          }
        ]
      },
      {
        "name": "জলঢাকা",
        "unions": [
          {
            "name": "কাঠালী",
            "schools": []
          },
          {
            "name": "কৈমারী",
            "schools": []
          },
          {
            "name": "খুটামারা",
            "schools": []
          },
          {
            "name": "গোলনা",
            "schools": []
          },
          {
            "name": "গোলমুন্ডা",
            "schools": []
          },
          {
            "name": "ডাউয়াবাড়ী",
            "schools": []
          },
          {
            "name": "ধর্মপাল",
            "schools": []
          },
          {
            "name": "বালাগ্রাম",
            "schools": []
          },
          {
            "name": "মীরগঞ্জ",
            "schools": []
          },
          {
            "name": "শিমুলবাড়ী",
            "schools": []
          },
          {
            "name": "শৌলমারী",
            "schools": []
          }
        ]
      },
      {
        "name": "ডিমলা",
        "unions": [
          {
            "name": "খগা খড়িবাড়ী",
            "schools": []
          },
          {
            "name": "খালিশা চাপানী",
            "schools": []
          },
          {
            "name": "গয়াবাড়ী",
            "schools": []
          },
          {
            "name": "ঝুনাগাছ চাপানী",
            "schools": []
          },
          {
            "name": "টেপা খরীবাড়ী",
            "schools": []
          },
          {
            "name": "ডিমলা সদর",
            "schools": []
          },
          {
            "name": "নাউতারা",
            "schools": []
          },
          {
            "name": "পশ্চিম ছাতনাই",
            "schools": []
          },
          {
            "name": "পুর্ব ছাতনাই",
            "schools": []
          },
          {
            "name": "বালাপাড়া",
            "schools": []
          }
        ]
      },
      {
        "name": "ডোমার",
        "unions": [
          {
            "name": "কেতকীবাড়ী",
            "schools": []
          },
          {
            "name": "গোমনাতি",
            "schools": []
          },
          {
            "name": "জোড়াবাড়ী",
            "schools": []
          },
          {
            "name": "ডোমার",
            "schools": []
          },
          {
            "name": "পাংগা মটকপুর",
            "schools": []
          },
          {
            "name": "বামুনীয়া",
            "schools": []
          },
          {
            "name": "বোড়াগাড়ী",
            "schools": []
          },
          {
            "name": "ভোগডাবুড়ী",
            "schools": []
          },
          {
            "name": "সোনারায়",
            "schools": []
          },
          {
            "name": "হরিণচরা",
            "schools": []
          }
        ]
      },
      {
        "name": "নীলফামারী সদর",
        "unions": [
          {
            "name": "ইটাখোলা",
            "schools": []
          },
          {
            "name": "কচুকাটা",
            "schools": []
          },
          {
            "name": "কুন্দপুকুর",
            "schools": []
          },
          {
            "name": "খোকসাবাড়ী",
            "schools": []
          },
          {
            "name": "গোড়গ্রাম",
            "schools": []
          },
          {
            "name": "চওড়া বড়গাছা",
            "schools": []
          },
          {
            "name": "চড়াইখোলা",
            "schools": []
          },
          {
            "name": "চাপড়া সরঞ্জানী",
            "schools": []
          },
          {
            "name": "টুপামারী",
            "schools": []
          },
          {
            "name": "পঞ্চপুকুর",
            "schools": []
          },
          {
            "name": "পলাশবাড়ী",
            "schools": []
          },
          {
            "name": "রামনগর",
            "schools": []
          },
          {
            "name": "লক্ষ্মীচাপ",
            "schools": []
          },
          {
            "name": "সংগলশী",
            "schools": []
          },
          {
            "name": "সোনারায়",
            "schools": []
          }
        ]
      },
      {
        "name": "সৈয়দপুর",
        "unions": [
          {
            "name": "কামারপুকুর",
            "schools": []
          },
          {
            "name": "কাশিরাম বেলপুকুর",
            "schools": []
          },
          {
            "name": "খাতা মধুপুর",
            "schools": []
          },
          {
            "name": "বাঙ্গালীপুর",
            "schools": []
          },
          {
            "name": "বোতলাগাড়ী",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "নেত্রকোণা",
    "upazilas": [
      {
        "name": "আটপাড়া",
        "unions": [
          {
            "name": "তেলিগাতী",
            "schools": []
          },
          {
            "name": "দুওজ",
            "schools": []
          },
          {
            "name": "বানিয়াজান",
            "schools": []
          },
          {
            "name": "লুনেশ্বর",
            "schools": []
          },
          {
            "name": "শুনই",
            "schools": []
          },
          {
            "name": "সুখারী",
            "schools": []
          },
          {
            "name": "স্বরমুশিয়া",
            "schools": []
          }
        ]
      },
      {
        "name": "কলমাকান্দা",
        "unions": [
          {
            "name": "কলমাকান্দা",
            "schools": []
          },
          {
            "name": "কৈলাটী",
            "schools": []
          },
          {
            "name": "খারনৈ",
            "schools": []
          },
          {
            "name": "নাজিরপুর",
            "schools": []
          },
          {
            "name": "পোগলা",
            "schools": []
          },
          {
            "name": "বড়খাপন",
            "schools": []
          },
          {
            "name": "রংছাতি",
            "schools": []
          },
          {
            "name": "লেংগুরা",
            "schools": []
          }
        ]
      },
      {
        "name": "কেন্দুয়া",
        "unions": [
          {
            "name": "আশুজিয়া",
            "schools": []
          },
          {
            "name": "কান্দিউড়া",
            "schools": []
          },
          {
            "name": "গড়াডোবা",
            "schools": []
          },
          {
            "name": "গণ্ডা",
            "schools": []
          },
          {
            "name": "চিরাং",
            "schools": []
          },
          {
            "name": "দলপা",
            "schools": []
          },
          {
            "name": "নওপাড়া",
            "schools": []
          },
          {
            "name": "পাইকুড়া",
            "schools": []
          },
          {
            "name": "বলাইশিমুল",
            "schools": []
          },
          {
            "name": "মাসকা",
            "schools": []
          },
          {
            "name": "মোজাফরপুর",
            "schools": []
          },
          {
            "name": "রোয়াইলবাড়ী আমতলা",
            "schools": []
          },
          {
            "name": "সান্দিকোনা",
            "schools": []
          }
        ]
      },
      {
        "name": "খালিয়াজুরী",
        "unions": [
          {
            "name": "কৃষ্ণপুর",
            "schools": []
          },
          {
            "name": "খালিয়াজুরী",
            "schools": []
          },
          {
            "name": "গাজীপুর",
            "schools": []
          },
          {
            "name": "চাকুয়া",
            "schools": []
          },
          {
            "name": "নগর",
            "schools": []
          },
          {
            "name": "মেন্দিপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "দুর্গাপুর",
        "unions": [
          {
            "name": "কাকৈরগড়া",
            "schools": []
          },
          {
            "name": "কুল্লাগড়া",
            "schools": []
          },
          {
            "name": "গাঁওকান্দিয়া",
            "schools": []
          },
          {
            "name": "চণ্ডিগড়",
            "schools": []
          },
          {
            "name": "দূর্গাপুর",
            "schools": []
          },
          {
            "name": "বাকলজোড়া",
            "schools": []
          },
          {
            "name": "বিরিশিরি",
            "schools": []
          }
        ]
      },
      {
        "name": "নেত্রকোণা সদর",
        "unions": [
          {
            "name": "আমতলা",
            "schools": []
          },
          {
            "name": "কাইলাটি",
            "schools": []
          },
          {
            "name": "কালিয়ারা গাবরাগাতি",
            "schools": []
          },
          {
            "name": "চল্লিশা",
            "schools": []
          },
          {
            "name": "ঠাকুরাকোণা",
            "schools": []
          },
          {
            "name": "দক্ষিণ বিশিউড়া",
            "schools": []
          },
          {
            "name": "মদনপুর",
            "schools": []
          },
          {
            "name": "মেদনী",
            "schools": []
          },
          {
            "name": "মৌগাতি",
            "schools": []
          },
          {
            "name": "রৌহা",
            "schools": []
          },
          {
            "name": "লক্ষীগঞ্জ",
            "schools": []
          },
          {
            "name": "সিংহের বাংলা",
            "schools": []
          }
        ]
      },
      {
        "name": "পূর্বধলা",
        "unions": [
          {
            "name": "আগিয়া",
            "schools": []
          },
          {
            "name": "খলিশাউড়",
            "schools": []
          },
          {
            "name": "গোহালাকান্দা",
            "schools": []
          },
          {
            "name": "ঘাগড়া",
            "schools": []
          },
          {
            "name": "জারিয়া",
            "schools": []
          },
          {
            "name": "ধলামুলগাঁও",
            "schools": []
          },
          {
            "name": "নারান্দিয়া",
            "schools": []
          },
          {
            "name": "পূর্বধলা",
            "schools": []
          },
          {
            "name": "বিশকাকুনী",
            "schools": []
          },
          {
            "name": "বৈরাটী",
            "schools": []
          },
          {
            "name": "হোগলা",
            "schools": []
          }
        ]
      },
      {
        "name": "বারহাট্টা",
        "unions": [
          {
            "name": "আসমা",
            "schools": []
          },
          {
            "name": "চিরাম",
            "schools": []
          },
          {
            "name": "বাউশী",
            "schools": []
          },
          {
            "name": "বারহাট্টা",
            "schools": []
          },
          {
            "name": "রায়পুর",
            "schools": []
          },
          {
            "name": "সাহতা",
            "schools": []
          },
          {
            "name": "সিংধা",
            "schools": []
          }
        ]
      },
      {
        "name": "মদন",
        "unions": [
          {
            "name": "কাইটাল",
            "schools": []
          },
          {
            "name": "গেবিন্দশ্রী",
            "schools": []
          },
          {
            "name": "চানগাঁও",
            "schools": []
          },
          {
            "name": "তিয়শ্রী",
            "schools": []
          },
          {
            "name": "নায়েকপুর",
            "schools": []
          },
          {
            "name": "ফতেপুর",
            "schools": []
          },
          {
            "name": "মদন",
            "schools": []
          },
          {
            "name": "মাঘান",
            "schools": []
          }
        ]
      },
      {
        "name": "মোহনগঞ্জ",
        "unions": [
          {
            "name": "গাগলাজুর",
            "schools": []
          },
          {
            "name": "তেতুলিয়া",
            "schools": []
          },
          {
            "name": "বড়কাশিয়া বিরামপুর",
            "schools": []
          },
          {
            "name": "বড়তলী বানিহারী",
            "schools": []
          },
          {
            "name": "মাঘান সিয়াদার",
            "schools": []
          },
          {
            "name": "সমাজ সহিলদেও",
            "schools": []
          },
          {
            "name": "সুয়াইর",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "নোয়াখালী",
    "upazilas": [
      {
        "name": "কবিরহাট",
        "unions": [
          {
            "name": "ঘোষবাগ",
            "schools": []
          },
          {
            "name": "চাপরাশিরহাট",
            "schools": []
          },
          {
            "name": "ধানশালিক",
            "schools": []
          },
          {
            "name": "ধানসিঁড়ি",
            "schools": []
          },
          {
            "name": "নরোত্তমপুর",
            "schools": []
          },
          {
            "name": "বাটইয়া",
            "schools": []
          },
          {
            "name": "সুন্দলপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "কোম্পানীগঞ্জ",
        "unions": [
          {
            "name": "চরএলাহী",
            "schools": []
          },
          {
            "name": "চরকাঁকড়া",
            "schools": []
          },
          {
            "name": "চরপার্বতী",
            "schools": []
          },
          {
            "name": "চরফকিরা",
            "schools": []
          },
          {
            "name": "চরহাজারী",
            "schools": []
          },
          {
            "name": "মুসাপুর",
            "schools": []
          },
          {
            "name": "রামপুর",
            "schools": []
          },
          {
            "name": "সিরাজপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "চাটখিল",
        "unions": [
          {
            "name": "খিলপাড়া",
            "schools": []
          },
          {
            "name": "নোয়াখলা",
            "schools": []
          },
          {
            "name": "পরকোট",
            "schools": []
          },
          {
            "name": "পাঁচগাঁও",
            "schools": []
          },
          {
            "name": "বাদলকোট",
            "schools": []
          },
          {
            "name": "মোহাম্মদপুর",
            "schools": []
          },
          {
            "name": "রামনারায়নপুর",
            "schools": []
          },
          {
            "name": "সাহাপুর",
            "schools": []
          },
          {
            "name": "হাট-পুকুরিয়া ঘাটলাবাগ",
            "schools": []
          }
        ]
      },
      {
        "name": "নোয়াখালী সদর",
        "unions": [
          {
            "name": "অশ্বদিয়া",
            "schools": []
          },
          {
            "name": "আন্ডারচর",
            "schools": []
          },
          {
            "name": "এওজবালিয়া",
            "schools": []
          },
          {
            "name": "কাদির হানিফ",
            "schools": []
          },
          {
            "name": "কালাদরপ",
            "schools": []
          },
          {
            "name": "চরমটুয়া",
            "schools": []
          },
          {
            "name": "দাদপুর",
            "schools": []
          },
          {
            "name": "ধর্মপুর",
            "schools": []
          },
          {
            "name": "নিয়াজপুর",
            "schools": []
          },
          {
            "name": "নোয়াখালী",
            "schools": []
          },
          {
            "name": "নোয়ান্নই",
            "schools": []
          },
          {
            "name": "পূর্ব চরমটুয়া",
            "schools": []
          },
          {
            "name": "বিনোদপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "বেগমগঞ্জ",
        "unions": [
          {
            "name": "আমানউল্ল্যাপুর",
            "schools": []
          },
          {
            "name": "আলাইয়ারপুর",
            "schools": []
          },
          {
            "name": "একলাশপুর",
            "schools": []
          },
          {
            "name": "কাদিরপুর",
            "schools": []
          },
          {
            "name": "কুতবপুর",
            "schools": []
          },
          {
            "name": "গোপালপুর",
            "schools": []
          },
          {
            "name": "ছয়ানী",
            "schools": []
          },
          {
            "name": "জিরতলী",
            "schools": []
          },
          {
            "name": "দূর্গাপুর",
            "schools": []
          },
          {
            "name": "নরোত্তমপুর",
            "schools": []
          },
          {
            "name": "বেগমগঞ্জ",
            "schools": []
          },
          {
            "name": "মিরওয়ারিশপুর",
            "schools": []
          },
          {
            "name": "রসুলপুর",
            "schools": []
          },
          {
            "name": "রাজগঞ্জ",
            "schools": []
          },
          {
            "name": "শরীফপুর",
            "schools": []
          },
          {
            "name": "হাজীপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "সুবর্ণচর",
        "unions": [
          {
            "name": "চরআমান উল্যা",
            "schools": []
          },
          {
            "name": "চরওয়াপদা",
            "schools": []
          },
          {
            "name": "চরক্লার্ক",
            "schools": []
          },
          {
            "name": "চরজাব্বার",
            "schools": []
          },
          {
            "name": "চরজুবলী",
            "schools": []
          },
          {
            "name": "চরবাটা",
            "schools": []
          },
          {
            "name": "পূর্ব চরবাটা",
            "schools": []
          },
          {
            "name": "মোহাম্মদপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "সেনবাগ",
        "unions": [
          {
            "name": "অর্জুনতলা",
            "schools": []
          },
          {
            "name": "কাদরা",
            "schools": []
          },
          {
            "name": "কাবিলপুর",
            "schools": []
          },
          {
            "name": "কেশরপাড়া",
            "schools": []
          },
          {
            "name": "ছাতারপাইয়া",
            "schools": []
          },
          {
            "name": "ডুমুরুয়া",
            "schools": []
          },
          {
            "name": "নবীপুর",
            "schools": []
          },
          {
            "name": "বিজবাগ",
            "schools": []
          },
          {
            "name": "মোহাম্মদপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "সোনাইমুড়ী",
        "unions": [
          {
            "name": "অম্বরনগর",
            "schools": []
          },
          {
            "name": "আমিশাপাড়া",
            "schools": []
          },
          {
            "name": "চাষীরহাট",
            "schools": []
          },
          {
            "name": "জয়াগ",
            "schools": []
          },
          {
            "name": "দেওটি",
            "schools": []
          },
          {
            "name": "নদনা",
            "schools": []
          },
          {
            "name": "নাটেশ্বর",
            "schools": []
          },
          {
            "name": "বজরা",
            "schools": []
          },
          {
            "name": "বারগাঁও",
            "schools": []
          },
          {
            "name": "সোনাপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "হাতিয়া",
        "unions": [
          {
            "name": "চরঈশ্বর",
            "schools": []
          },
          {
            "name": "চরকিং",
            "schools": []
          },
          {
            "name": "জাহাজমারা",
            "schools": []
          },
          {
            "name": "তমরদ্দি",
            "schools": []
          },
          {
            "name": "নলচিরা",
            "schools": []
          },
          {
            "name": "নিঝুমদ্বীপ",
            "schools": []
          },
          {
            "name": "বুড়িরচর",
            "schools": []
          },
          {
            "name": "সুখচর",
            "schools": []
          },
          {
            "name": "সোনাদিয়া",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "পঞ্চগড়",
    "upazilas": [
      {
        "name": "আটোয়ারী",
        "unions": [
          {
            "name": "আলোয়াখোয়া",
            "schools": []
          },
          {
            "name": "তোড়িয়া",
            "schools": []
          },
          {
            "name": "ধামোর",
            "schools": []
          },
          {
            "name": "বলরামপুর",
            "schools": []
          },
          {
            "name": "মির্জাপুর",
            "schools": []
          },
          {
            "name": "রাধানগর",
            "schools": []
          }
        ]
      },
      {
        "name": "তেতুলিয়া",
        "unions": [
          {
            "name": "তিমাইহাট",
            "schools": []
          },
          {
            "name": "তেতুলিয়া",
            "schools": []
          },
          {
            "name": "দেবনগর",
            "schools": []
          },
          {
            "name": "বাংলাবান্ধা",
            "schools": []
          },
          {
            "name": "বুড়াবুড়ী",
            "schools": []
          },
          {
            "name": "ভজনপুর",
            "schools": []
          },
          {
            "name": "ভজনপুর",
            "schools": []
          },
          {
            "name": "শালবাহান",
            "schools": []
          }
        ]
      },
      {
        "name": "দেবীগঞ্জ",
        "unions": [
          {
            "name": "চিলাহাটি",
            "schools": []
          },
          {
            "name": "চেংঠী হাজরা ডাঙ্গা",
            "schools": []
          },
          {
            "name": "টেপ্রীগঞ্জ",
            "schools": []
          },
          {
            "name": "দন্ডপাল",
            "schools": []
          },
          {
            "name": "দেবীগঞ্জ সদর",
            "schools": []
          },
          {
            "name": "দেবীডুবা",
            "schools": []
          },
          {
            "name": "পামুলী",
            "schools": []
          },
          {
            "name": "শালডাঙ্গা",
            "schools": []
          },
          {
            "name": "সুন্দরদিঘী",
            "schools": []
          },
          {
            "name": "সোনাহার মল্লিকাদহ",
            "schools": []
          }
        ]
      },
      {
        "name": "পঞ্চগড় সদর",
        "unions": [
          {
            "name": "অমরখানা",
            "schools": []
          },
          {
            "name": "কামাত কাজল দীঘি",
            "schools": []
          },
          {
            "name": "গরিনাবাড়ী",
            "schools": []
          },
          {
            "name": "চাকলাহাট",
            "schools": []
          },
          {
            "name": "ধাক্কামারা",
            "schools": []
          },
          {
            "name": "পঞ্চগড় সদর",
            "schools": []
          },
          {
            "name": "মাগুরা",
            "schools": []
          },
          {
            "name": "সাতমেরা",
            "schools": []
          },
          {
            "name": "হাড়িভাসা",
            "schools": []
          },
          {
            "name": "হাফিজাবাদ",
            "schools": []
          }
        ]
      },
      {
        "name": "বোদা",
        "unions": [
          {
            "name": "কাজলদীঘি কালিগঞ্জ",
            "schools": []
          },
          {
            "name": "চন্দনবাড়ী",
            "schools": []
          },
          {
            "name": "ঝলইশাল শিরি",
            "schools": []
          },
          {
            "name": "পাচপীর",
            "schools": []
          },
          {
            "name": "বড়শশী",
            "schools": []
          },
          {
            "name": "বেংহারী",
            "schools": []
          },
          {
            "name": "বোদা",
            "schools": []
          },
          {
            "name": "ময়দান দীঘি",
            "schools": []
          },
          {
            "name": "মাড়েয়া বামনহাট",
            "schools": []
          },
          {
            "name": "সাকোয়া",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "পটুয়াখালী",
    "upazilas": [
      {
        "name": "কলাপাড়া",
        "unions": [
          {
            "name": "চম্পাপুর",
            "schools": []
          },
          {
            "name": "চাকামইয়া",
            "schools": []
          },
          {
            "name": "টিয়াখালী",
            "schools": []
          },
          {
            "name": "ডালবুগঞ্জ",
            "schools": []
          },
          {
            "name": "ধানখালী",
            "schools": []
          },
          {
            "name": "ধুলাসার",
            "schools": []
          },
          {
            "name": "নীলগঞ্জ",
            "schools": []
          },
          {
            "name": "বালিয়াতলী",
            "schools": []
          },
          {
            "name": "মহিপুর",
            "schools": []
          },
          {
            "name": "মিঠাগঞ্জ",
            "schools": []
          },
          {
            "name": "লতাচাপলী",
            "schools": []
          },
          {
            "name": "লালুয়া",
            "schools": []
          }
        ]
      },
      {
        "name": "গলাচিপা",
        "unions": [
          {
            "name": "আমখোলা",
            "schools": []
          },
          {
            "name": "কলাগাছিয়া",
            "schools": []
          },
          {
            "name": "গজালিয়া",
            "schools": []
          },
          {
            "name": "গলাচিপা",
            "schools": []
          },
          {
            "name": "গোলখালী",
            "schools": []
          },
          {
            "name": "চরকাজল",
            "schools": []
          },
          {
            "name": "চরবিশ্বাস",
            "schools": []
          },
          {
            "name": "চিকনিকান্দী",
            "schools": []
          },
          {
            "name": "ডাকুয়া",
            "schools": []
          },
          {
            "name": "পানপট্টি",
            "schools": []
          },
          {
            "name": "বকুলবাড়ীয়া",
            "schools": []
          },
          {
            "name": "রতনদী তালতলী",
            "schools": []
          }
        ]
      },
      {
        "name": "দশমিনা",
        "unions": [
          {
            "name": "আলীপুর",
            "schools": []
          },
          {
            "name": "দশমিনা",
            "schools": []
          },
          {
            "name": "বহরমপুর",
            "schools": []
          },
          {
            "name": "বাঁশবাড়ীয়া",
            "schools": []
          },
          {
            "name": "বেতাগী সানকিপুর",
            "schools": []
          },
          {
            "name": "রণগোপালদী",
            "schools": []
          }
        ]
      },
      {
        "name": "দুমকি",
        "unions": [
          {
            "name": "আংগারিয়া",
            "schools": []
          },
          {
            "name": "পাংগাশিয়া",
            "schools": []
          },
          {
            "name": "মুরাদিয়া",
            "schools": []
          },
          {
            "name": "লেবুখালী",
            "schools": []
          },
          {
            "name": "শ্রীরামপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "পটুয়াখালী সদর",
        "unions": [
          {
            "name": "আউলিয়াপুর",
            "schools": []
          },
          {
            "name": "ইটবাড়ীয়া",
            "schools": []
          },
          {
            "name": "কমলাপুর",
            "schools": []
          },
          {
            "name": "কালিকাপুর",
            "schools": []
          },
          {
            "name": "ছোট বিঘাই",
            "schools": []
          },
          {
            "name": "জৈনকাঠী",
            "schools": []
          },
          {
            "name": "বড় বিঘাই",
            "schools": []
          },
          {
            "name": "বদরপুর",
            "schools": []
          },
          {
            "name": "মরিচবুনিয়া",
            "schools": []
          },
          {
            "name": "মাদারবুনিয়া",
            "schools": []
          },
          {
            "name": "লাউকাঠী",
            "schools": []
          },
          {
            "name": "লোহালিয়া",
            "schools": []
          }
        ]
      },
      {
        "name": "বাউফল",
        "unions": [
          {
            "name": "আদাবারিয়া",
            "schools": []
          },
          {
            "name": "কনকদিয়া",
            "schools": []
          },
          {
            "name": "কাছিপাড়া",
            "schools": []
          },
          {
            "name": "কালাইয়া",
            "schools": []
          },
          {
            "name": "কালিশুরী",
            "schools": []
          },
          {
            "name": "কেশবপুর",
            "schools": []
          },
          {
            "name": "দাস পাড়া",
            "schools": []
          },
          {
            "name": "ধুলিয়া",
            "schools": []
          },
          {
            "name": "নওমালা",
            "schools": []
          },
          {
            "name": "নাজিরপুর",
            "schools": []
          },
          {
            "name": "বগা",
            "schools": []
          },
          {
            "name": "বাউফল",
            "schools": []
          },
          {
            "name": "মদনপুরা",
            "schools": []
          },
          {
            "name": "সূর্য্যমনি",
            "schools": []
          }
        ]
      },
      {
        "name": "মির্জাগঞ্জ",
        "unions": [
          {
            "name": "আমড়াগাছিয়া",
            "schools": []
          },
          {
            "name": "কাকড়াবুনিয়া",
            "schools": []
          },
          {
            "name": "দেউলী সুবিদখালী",
            "schools": []
          },
          {
            "name": "মজিদবাড়িয়া",
            "schools": []
          },
          {
            "name": "মাধবখালী",
            "schools": []
          },
          {
            "name": "মির্জাগঞ্জ",
            "schools": []
          }
        ]
      },
      {
        "name": "রাঙ্গাবালী",
        "unions": [
          {
            "name": "চরমোন্তাজ",
            "schools": []
          },
          {
            "name": "চালিতাবুনিয়া",
            "schools": []
          },
          {
            "name": "ছোটবাইশদিয়া",
            "schools": []
          },
          {
            "name": "বড়বাইশদিয়া",
            "schools": []
          },
          {
            "name": "রাঙ্গাবালী",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "পাবনা",
    "upazilas": [
      {
        "name": "আটঘরিয়া",
        "unions": [
          {
            "name": "একদন্ত",
            "schools": []
          },
          {
            "name": "চাঁদভা",
            "schools": []
          },
          {
            "name": "দেবোত্তর",
            "schools": []
          },
          {
            "name": "মাজপাড়া",
            "schools": []
          },
          {
            "name": "লক্ষীপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "ঈশ্বরদী",
        "unions": [
          {
            "name": "ছলিমপুর",
            "schools": []
          },
          {
            "name": "দাশুরিয়া",
            "schools": []
          },
          {
            "name": "পাকশী",
            "schools": []
          },
          {
            "name": "মুলাডুলি",
            "schools": []
          },
          {
            "name": "লক্ষীকুন্ডা",
            "schools": []
          },
          {
            "name": "সাঁড়া",
            "schools": []
          },
          {
            "name": "সাহাপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "চাটমোহর",
        "unions": [
          {
            "name": "গুনাইগাছা",
            "schools": []
          },
          {
            "name": "ছাইকোলা",
            "schools": []
          },
          {
            "name": "দাতিয়া বামনগ্রাম",
            "schools": []
          },
          {
            "name": "নিমাইচড়া",
            "schools": []
          },
          {
            "name": "পার্শ্বডাঙ্গা",
            "schools": []
          },
          {
            "name": "ফৈলজানা",
            "schools": []
          },
          {
            "name": "বিলচলন",
            "schools": []
          },
          {
            "name": "মথুরাপুর",
            "schools": []
          },
          {
            "name": "মুলগ্রাম",
            "schools": []
          },
          {
            "name": "হরিপুর",
            "schools": []
          },
          {
            "name": "হান্ডিয়াল",
            "schools": []
          }
        ]
      },
      {
        "name": "পাবনা সদর",
        "unions": [
          {
            "name": "আতাইকুলা",
            "schools": []
          },
          {
            "name": "গয়েশপুর",
            "schools": []
          },
          {
            "name": "চরতারাপুর",
            "schools": []
          },
          {
            "name": "দাপুনিয়া",
            "schools": []
          },
          {
            "name": "দোগাছী",
            "schools": []
          },
          {
            "name": "ভাঁড়ারা",
            "schools": []
          },
          {
            "name": "মালঞ্চি",
            "schools": []
          },
          {
            "name": "মালিগাছা",
            "schools": []
          },
          {
            "name": "সাদুল্লাপুর",
            "schools": []
          },
          {
            "name": "হেমায়েতপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "ফরিদপুর",
        "unions": [
          {
            "name": "ডেমড়া",
            "schools": []
          },
          {
            "name": "পুঙ্গুলি",
            "schools": []
          },
          {
            "name": "ফরিদপুর",
            "schools": []
          },
          {
            "name": "বনওয়ারীনগর",
            "schools": []
          },
          {
            "name": "বৃলাহিড়ীবাড়ী",
            "schools": []
          },
          {
            "name": "হাদল",
            "schools": []
          }
        ]
      },
      {
        "name": "বেড়া",
        "unions": [
          {
            "name": "কৈটোলা",
            "schools": []
          },
          {
            "name": "চাকলা",
            "schools": []
          },
          {
            "name": "জাতসাখিনি",
            "schools": []
          },
          {
            "name": "ঢালার চর",
            "schools": []
          },
          {
            "name": "নতুন ভারেঙ্গা",
            "schools": []
          },
          {
            "name": "পুরান ভারেঙ্গা",
            "schools": []
          },
          {
            "name": "মাসুমদিয়া",
            "schools": []
          },
          {
            "name": "রূপপুর",
            "schools": []
          },
          {
            "name": "হাটুরিয়া নাকালিয়া",
            "schools": []
          }
        ]
      },
      {
        "name": "ভাঙ্গুড়া",
        "unions": [
          {
            "name": "অষ্টমণিষা",
            "schools": []
          },
          {
            "name": "খানমরিচ",
            "schools": []
          },
          {
            "name": "দিলপাশার",
            "schools": []
          },
          {
            "name": "পারভাঙ্গুড়া",
            "schools": []
          },
          {
            "name": "ভাঙ্গুড়া",
            "schools": []
          }
        ]
      },
      {
        "name": "সাঁথিয়া",
        "unions": [
          {
            "name": "আর-আতাইকুলা",
            "schools": []
          },
          {
            "name": "করমজা",
            "schools": []
          },
          {
            "name": "কাশিনাথপুর",
            "schools": []
          },
          {
            "name": "ক্ষেতুপাড়া",
            "schools": []
          },
          {
            "name": "গৌরীগ্রাম",
            "schools": []
          },
          {
            "name": "ধুলাউড়ি",
            "schools": []
          },
          {
            "name": "ধোপাদহ",
            "schools": []
          },
          {
            "name": "নন্দনপুর",
            "schools": []
          },
          {
            "name": "নাগডেমড়া",
            "schools": []
          },
          {
            "name": "ভুলবাড়ীয়া",
            "schools": []
          }
        ]
      },
      {
        "name": "সুজানগর",
        "unions": [
          {
            "name": "আহম্মদপুর",
            "schools": []
          },
          {
            "name": "তাঁতিবন্দ",
            "schools": []
          },
          {
            "name": "দুলাই",
            "schools": []
          },
          {
            "name": "নাজিরগঞ্জ",
            "schools": []
          },
          {
            "name": "ভায়না",
            "schools": []
          },
          {
            "name": "মানিকহাট",
            "schools": []
          },
          {
            "name": "রাণীনগর",
            "schools": []
          },
          {
            "name": "সাগরকান্দি",
            "schools": []
          },
          {
            "name": "সাতবাড়ীয়া",
            "schools": []
          },
          {
            "name": "হাটখালী",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "পিরোজপুর",
    "upazilas": [
      {
        "name": "ইন্দুরকানী",
        "unions": [
          {
            "name": "পত্তাশি",
            "schools": []
          },
          {
            "name": "পাড়েরহাট",
            "schools": []
          },
          {
            "name": "বালিপাড়া",
            "schools": []
          }
        ]
      },
      {
        "name": "কাউখালী",
        "unions": [
          {
            "name": "আমড়াজুড়ি",
            "schools": []
          },
          {
            "name": "কাউখালি সদর",
            "schools": []
          },
          {
            "name": "চিরাপাড়া",
            "schools": []
          },
          {
            "name": "শিয়ালকাঠী",
            "schools": []
          },
          {
            "name": "সয়না রঘুনাথপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "নাজিরপুর",
        "unions": [
          {
            "name": "কলারদোয়ানিয়া",
            "schools": []
          },
          {
            "name": "দীর্ঘা",
            "schools": []
          },
          {
            "name": "দেউলবাড়ী দোবড়া",
            "schools": []
          },
          {
            "name": "নাজিরপুর সদর",
            "schools": []
          },
          {
            "name": "মাটিভাংগা",
            "schools": []
          },
          {
            "name": "মালিখালী",
            "schools": []
          },
          {
            "name": "শাখারীকাঠী",
            "schools": []
          },
          {
            "name": "শ্রীরামকাঠী",
            "schools": []
          },
          {
            "name": "সেখমাটিয়া",
            "schools": []
          }
        ]
      },
      {
        "name": "নেছারাবাদ",
        "unions": [
          {
            "name": "আটঘর কুড়িয়ানা",
            "schools": []
          },
          {
            "name": "গুয়ারেখা",
            "schools": []
          },
          {
            "name": "জলাবাড়ী",
            "schools": []
          },
          {
            "name": "দৈহারী",
            "schools": []
          },
          {
            "name": "বলদিয়া",
            "schools": []
          },
          {
            "name": "সমুদয়কাঠী",
            "schools": []
          },
          {
            "name": "সারেংকাঠী",
            "schools": []
          },
          {
            "name": "সুটিয়াকাঠী",
            "schools": []
          },
          {
            "name": "সোহাগদল",
            "schools": []
          },
          {
            "name": "স্বরুপকাঠী",
            "schools": []
          }
        ]
      },
      {
        "name": "পিরোজপুর সদর",
        "unions": [
          {
            "name": "কদমতলা",
            "schools": []
          },
          {
            "name": "কলাখালী",
            "schools": []
          },
          {
            "name": "টোনা",
            "schools": []
          },
          {
            "name": "দূর্গাপুর",
            "schools": []
          },
          {
            "name": "শংকরপাশা",
            "schools": []
          },
          {
            "name": "শরিকতলা",
            "schools": []
          },
          {
            "name": "শিকদার মল্লিক",
            "schools": []
          }
        ]
      },
      {
        "name": "ভান্ডারিয়া",
        "unions": [
          {
            "name": "ইকড়ী",
            "schools": []
          },
          {
            "name": "গৌরীপুর",
            "schools": []
          },
          {
            "name": "তেলিখালী",
            "schools": []
          },
          {
            "name": "ধাওয়া",
            "schools": []
          },
          {
            "name": "নদমূলা শিয়ালকাঠী",
            "schools": []
          },
          {
            "name": "ভান্ডারিয়া সদর",
            "schools": []
          },
          {
            "name": "ভিটাবাড়িয়া",
            "schools": []
          }
        ]
      },
      {
        "name": "মঠবাড়ীয়া",
        "unions": [
          {
            "name": "আমড়াগাছিয়া",
            "schools": []
          },
          {
            "name": "টিকিকাটা",
            "schools": []
          },
          {
            "name": "তুষখালী",
            "schools": []
          },
          {
            "name": "দাউদখালী",
            "schools": []
          },
          {
            "name": "ধানীসাফা",
            "schools": []
          },
          {
            "name": "বড়মাছুয়া",
            "schools": []
          },
          {
            "name": "বেতমোর রাজপাড়া",
            "schools": []
          },
          {
            "name": "মঠবাড়িয়া",
            "schools": []
          },
          {
            "name": "মিরুখালী",
            "schools": []
          },
          {
            "name": "শাপলেজা",
            "schools": []
          },
          {
            "name": "হলতাগুলিশাখালী",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "ফরিদপুর",
    "upazilas": [
      {
        "name": "আলফাডাঙ্গা",
        "unions": [
          {
            "name": "আলফাডাঙ্গা",
            "schools": []
          },
          {
            "name": "গোপালপুর",
            "schools": []
          },
          {
            "name": "টগরবন্দ",
            "schools": []
          },
          {
            "name": "পাঁচুড়িয়া",
            "schools": []
          },
          {
            "name": "বানা",
            "schools": []
          },
          {
            "name": "বুড়াইচ",
            "schools": []
          }
        ]
      },
      {
        "name": "চরভদ্রাসন",
        "unions": [
          {
            "name": "গাজীরটেক",
            "schools": []
          },
          {
            "name": "চর ঝাউকান্দা",
            "schools": []
          },
          {
            "name": "চর ভদ্রাসন",
            "schools": []
          },
          {
            "name": "চর হরিরামপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "নগরকান্দা",
        "unions": [
          {
            "name": "কাইচাইল",
            "schools": []
          },
          {
            "name": "কোদালিয়া শহিদনগর",
            "schools": []
          },
          {
            "name": "চরযশোরদী",
            "schools": []
          },
          {
            "name": "ডাঙ্গী",
            "schools": []
          },
          {
            "name": "তালমা",
            "schools": []
          },
          {
            "name": "পুরাপাড়া",
            "schools": []
          },
          {
            "name": "ফুলসুতি",
            "schools": []
          },
          {
            "name": "রামনগর",
            "schools": []
          },
          {
            "name": "লস্করদিয়া",
            "schools": []
          }
        ]
      },
      {
        "name": "ফরিদপুর সদর",
        "unions": [
          {
            "name": "অম্বিকাপুর",
            "schools": []
          },
          {
            "name": "আলিয়াবাদ",
            "schools": []
          },
          {
            "name": "ঈশানগোপালপুর",
            "schools": []
          },
          {
            "name": "কানাইপুর",
            "schools": []
          },
          {
            "name": "কৃষ্ণনগর",
            "schools": []
          },
          {
            "name": "কৈজুরী",
            "schools": []
          },
          {
            "name": "গেরদা",
            "schools": []
          },
          {
            "name": "চরমাধবদিয়া",
            "schools": []
          },
          {
            "name": "ডিক্রিরচর",
            "schools": []
          },
          {
            "name": "নর্থচ্যানেল",
            "schools": []
          },
          {
            "name": "মাচ্চর",
            "schools": []
          }
        ]
      },
      {
        "name": "বোয়ালমারী",
        "unions": [
          {
            "name": "গুনবহা",
            "schools": []
          },
          {
            "name": "ঘোষপুর",
            "schools": []
          },
          {
            "name": "চতুল",
            "schools": []
          },
          {
            "name": "চাঁদপুর",
            "schools": []
          },
          {
            "name": "দাদপুর",
            "schools": []
          },
          {
            "name": "পরমেশ্বরদী",
            "schools": []
          },
          {
            "name": "বোয়ালমারী",
            "schools": []
          },
          {
            "name": "ময়না",
            "schools": []
          },
          {
            "name": "রূপাপাত",
            "schools": []
          },
          {
            "name": "শেখর",
            "schools": []
          },
          {
            "name": "সাতৈর",
            "schools": []
          }
        ]
      },
      {
        "name": "ভাঙ্গা",
        "unions": [
          {
            "name": "আজিমনগর",
            "schools": []
          },
          {
            "name": "আলগী",
            "schools": []
          },
          {
            "name": "কাউলিবেড়া",
            "schools": []
          },
          {
            "name": "কালামৃধা",
            "schools": []
          },
          {
            "name": "ঘারুয়া",
            "schools": []
          },
          {
            "name": "চান্দ্রা",
            "schools": []
          },
          {
            "name": "চুমুরদী",
            "schools": []
          },
          {
            "name": "তুজারপুর",
            "schools": []
          },
          {
            "name": "নাছিরাবাদ",
            "schools": []
          },
          {
            "name": "নুরুল্যাগঞ্জ",
            "schools": []
          },
          {
            "name": "মানিকদহ",
            "schools": []
          },
          {
            "name": "হামিরদী",
            "schools": []
          }
        ]
      },
      {
        "name": "মধুখালী",
        "unions": [
          {
            "name": "কামারখালী",
            "schools": []
          },
          {
            "name": "গাজনা",
            "schools": []
          },
          {
            "name": "জাহাপুর",
            "schools": []
          },
          {
            "name": "ডুমাইন",
            "schools": []
          },
          {
            "name": "নওপাড়া",
            "schools": []
          },
          {
            "name": "বাগাট",
            "schools": []
          },
          {
            "name": "মধুখালী",
            "schools": []
          },
          {
            "name": "মেগচামী",
            "schools": []
          },
          {
            "name": "রায়পুর",
            "schools": []
          }
        ]
      },
      {
        "name": "সদরপুর",
        "unions": [
          {
            "name": "আকোটের চর",
            "schools": []
          },
          {
            "name": "কৃষ্ণপুর",
            "schools": []
          },
          {
            "name": "চর নাসিরপুর",
            "schools": []
          },
          {
            "name": "চর বিষ্ণুপুর",
            "schools": []
          },
          {
            "name": "চর মানাইর",
            "schools": []
          },
          {
            "name": "ঢেউখালী",
            "schools": []
          },
          {
            "name": "নারিকেল বাড়িয়া",
            "schools": []
          },
          {
            "name": "ভাষানচর",
            "schools": []
          },
          {
            "name": "সদরপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "সালথা",
        "unions": [
          {
            "name": "আটঘর",
            "schools": []
          },
          {
            "name": "গট্টি",
            "schools": []
          },
          {
            "name": "বল্লভদী",
            "schools": []
          },
          {
            "name": "ভাওয়াল",
            "schools": []
          },
          {
            "name": "মাঝারদিয়া",
            "schools": []
          },
          {
            "name": "যদুনন্দী",
            "schools": []
          },
          {
            "name": "রামকান্তপুর",
            "schools": []
          },
          {
            "name": "সোনাপুর",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "ফেনী",
    "upazilas": [
      {
        "name": "ছাগলনাইয়া",
        "unions": [
          {
            "name": "ঘোপাল",
            "schools": []
          },
          {
            "name": "পাঠাননগর",
            "schools": []
          },
          {
            "name": "মহামায়া",
            "schools": []
          },
          {
            "name": "রাধানগর",
            "schools": []
          },
          {
            "name": "শুভপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "দাগনভূঞা",
        "unions": [
          {
            "name": "ইয়াকুবপুর",
            "schools": []
          },
          {
            "name": "জায়লস্কর",
            "schools": []
          },
          {
            "name": "দাগনভূঞা",
            "schools": []
          },
          {
            "name": "পূর্বচন্দ্রপুর",
            "schools": []
          },
          {
            "name": "মাতুভূঞা",
            "schools": []
          },
          {
            "name": "রাজাপুর",
            "schools": []
          },
          {
            "name": "রামনগর",
            "schools": []
          },
          {
            "name": "সিন্দুরপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "পরশুরাম",
        "unions": [
          {
            "name": "চিথলিয়া",
            "schools": []
          },
          {
            "name": "বক্সমাহমুদ",
            "schools": []
          },
          {
            "name": "মির্জানগর",
            "schools": []
          }
        ]
      },
      {
        "name": "ফুলগাজী",
        "unions": [
          {
            "name": "আনন্দপুর",
            "schools": []
          },
          {
            "name": "আমজাদহাট",
            "schools": []
          },
          {
            "name": "জি,এম, হাট",
            "schools": []
          },
          {
            "name": "দরবারপুর",
            "schools": []
          },
          {
            "name": "ফুলগাজী",
            "schools": []
          },
          {
            "name": "মুন্সিরহাট",
            "schools": []
          }
        ]
      },
      {
        "name": "ফেনী সদর",
        "unions": [
          {
            "name": "কাজিরবাগ",
            "schools": []
          },
          {
            "name": "কালিদহ",
            "schools": []
          },
          {
            "name": "ছনুয়া",
            "schools": []
          },
          {
            "name": "ধর্মপুর",
            "schools": []
          },
          {
            "name": "ধলিয়া",
            "schools": []
          },
          {
            "name": "পাঁচগাছিয়া",
            "schools": []
          },
          {
            "name": "ফরহাদনগর",
            "schools": []
          },
          {
            "name": "ফাজিলপুর",
            "schools": []
          },
          {
            "name": "বালিগাঁও",
            "schools": []
          },
          {
            "name": "মোটবী",
            "schools": []
          },
          {
            "name": "লেমুয়া",
            "schools": []
          },
          {
            "name": "শর্শদি",
            "schools": []
          }
        ]
      },
      {
        "name": "সোনাগাজী",
        "unions": [
          {
            "name": "আমিরাবাদ",
            "schools": []
          },
          {
            "name": "চরচান্দিয়া",
            "schools": []
          },
          {
            "name": "চরদরবেশ",
            "schools": []
          },
          {
            "name": "চরমজলিশপুর",
            "schools": []
          },
          {
            "name": "নবাবপুর",
            "schools": []
          },
          {
            "name": "বগাদানা",
            "schools": []
          },
          {
            "name": "মঙ্গলকান্দি",
            "schools": []
          },
          {
            "name": "মতিগঞ্জ",
            "schools": []
          },
          {
            "name": "সোনাগাজী",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "বগুড়া",
    "upazilas": [
      {
        "name": "আদমদিঘি",
        "unions": [
          {
            "name": "আদমদিঘি",
            "schools": []
          },
          {
            "name": "কুন্দগ্রাম",
            "schools": []
          },
          {
            "name": "চাঁপাপুর",
            "schools": []
          },
          {
            "name": "ছাতিয়ানগ্রাম",
            "schools": []
          },
          {
            "name": "নশরতপুর",
            "schools": []
          },
          {
            "name": "সান্তাহার",
            "schools": []
          }
        ]
      },
      {
        "name": "কাহালু",
        "unions": [
          {
            "name": "কালাই",
            "schools": []
          },
          {
            "name": "কাহালু",
            "schools": []
          },
          {
            "name": "জামগ্রাম",
            "schools": []
          },
          {
            "name": "দূর্গাপুর",
            "schools": []
          },
          {
            "name": "নারহট্ট",
            "schools": []
          },
          {
            "name": "পাইকড়",
            "schools": []
          },
          {
            "name": "বীরকেদার",
            "schools": []
          },
          {
            "name": "মালঞ্চা",
            "schools": []
          },
          {
            "name": "মুরইল",
            "schools": []
          }
        ]
      },
      {
        "name": "গাবতলী",
        "unions": [
          {
            "name": "কাগইল",
            "schools": []
          },
          {
            "name": "গাবতলি",
            "schools": []
          },
          {
            "name": "দক্ষিণপাড়া",
            "schools": []
          },
          {
            "name": "দুর্গাহাটা",
            "schools": []
          },
          {
            "name": "নশিপুর",
            "schools": []
          },
          {
            "name": "নাড়ুয়ামালা",
            "schools": []
          },
          {
            "name": "নেপালতলী",
            "schools": []
          },
          {
            "name": "বালিয়া দিঘী",
            "schools": []
          },
          {
            "name": "মহিষাবান",
            "schools": []
          },
          {
            "name": "রামেশ্বরপুর",
            "schools": []
          },
          {
            "name": "সোনারায়",
            "schools": []
          }
        ]
      },
      {
        "name": "দুপচাচিঁয়া",
        "unions": [
          {
            "name": "গুনাহার",
            "schools": []
          },
          {
            "name": "গোবিন্দপুর",
            "schools": []
          },
          {
            "name": "চামরুল",
            "schools": []
          },
          {
            "name": "জিয়ানগর",
            "schools": []
          },
          {
            "name": "তালোড়া",
            "schools": []
          },
          {
            "name": "দুপচাঁচিয়া",
            "schools": []
          }
        ]
      },
      {
        "name": "ধুনট",
        "unions": [
          {
            "name": "১গোপালনগর",
            "schools": []
          },
          {
            "name": "এলাঙ্গী",
            "schools": []
          },
          {
            "name": "কালেরপাড়া",
            "schools": []
          },
          {
            "name": "গোসাইবাড়ী",
            "schools": []
          },
          {
            "name": "চিকাশী",
            "schools": []
          },
          {
            "name": "চৌকিবাড়ী",
            "schools": []
          },
          {
            "name": "ধুনট সদর",
            "schools": []
          },
          {
            "name": "নিমগাছি",
            "schools": []
          },
          {
            "name": "ভান্ডারবাড়ী",
            "schools": []
          },
          {
            "name": "মথুরাপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "নন্দিগ্রাম",
        "unions": [
          {
            "name": "থালতা মাঝগ্রাম",
            "schools": []
          },
          {
            "name": "নন্দিগ্রাম",
            "schools": []
          },
          {
            "name": "বুড়ইল",
            "schools": []
          },
          {
            "name": "ভাটগ্রাম",
            "schools": []
          },
          {
            "name": "ভাটরা",
            "schools": []
          }
        ]
      },
      {
        "name": "বগুড়া সদর",
        "unions": [
          {
            "name": "এরুলিয়া",
            "schools": []
          },
          {
            "name": "গোকুল",
            "schools": []
          },
          {
            "name": "নামুজা",
            "schools": []
          },
          {
            "name": "নিশিন্দারা",
            "schools": []
          },
          {
            "name": "নুনগোলা",
            "schools": []
          },
          {
            "name": "ফাঁপোর",
            "schools": []
          },
          {
            "name": "রাজাপুর",
            "schools": []
          },
          {
            "name": "লাহিড়ীপাড়া",
            "schools": []
          },
          {
            "name": "শাখারিয়া",
            "schools": []
          },
          {
            "name": "শেখেরকোলা",
            "schools": []
          },
          {
            "name": "সাবগ্রাম",
            "schools": []
          }
        ]
      },
      {
        "name": "শাজাহানপুর",
        "unions": [
          {
            "name": "আড়িয়া",
            "schools": []
          },
          {
            "name": "আমরুল",
            "schools": []
          },
          {
            "name": "আশেকপুর",
            "schools": []
          },
          {
            "name": "খরনা",
            "schools": []
          },
          {
            "name": "খোট্টাপাড়া",
            "schools": []
          },
          {
            "name": "গোহাইল",
            "schools": []
          },
          {
            "name": "চোপিনগর",
            "schools": []
          },
          {
            "name": "মাঝিড়া",
            "schools": []
          },
          {
            "name": "মাদলা",
            "schools": []
          }
        ]
      },
      {
        "name": "শিবগঞ্জ",
        "unions": [
          {
            "name": "আটমূল",
            "schools": []
          },
          {
            "name": "কিচক",
            "schools": []
          },
          {
            "name": "দেউলি",
            "schools": []
          },
          {
            "name": "পিরব",
            "schools": []
          },
          {
            "name": "বিহার",
            "schools": []
          },
          {
            "name": "বুড়িগঞ্জ",
            "schools": []
          },
          {
            "name": "ময়দানহাট্টা",
            "schools": []
          },
          {
            "name": "মাঝিহট্ট",
            "schools": []
          },
          {
            "name": "মোকামতলা",
            "schools": []
          },
          {
            "name": "রায়নগর",
            "schools": []
          },
          {
            "name": "শিবগঞ্জ",
            "schools": []
          },
          {
            "name": "সৈয়দপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "শেরপুর",
        "unions": [
          {
            "name": "কুসুম্বী",
            "schools": []
          },
          {
            "name": "খানপুর",
            "schools": []
          },
          {
            "name": "খামারকান্দি",
            "schools": []
          },
          {
            "name": "গাড়িদহ",
            "schools": []
          },
          {
            "name": "বিশালপুর",
            "schools": []
          },
          {
            "name": "ভবানীপুর",
            "schools": []
          },
          {
            "name": "মির্জাপুর",
            "schools": []
          },
          {
            "name": "শাহবন্দেগী",
            "schools": []
          },
          {
            "name": "সীমাবাড়ি",
            "schools": []
          },
          {
            "name": "সুঘাট",
            "schools": []
          }
        ]
      },
      {
        "name": "সারিয়াকান্দি",
        "unions": [
          {
            "name": "কর্ণিবাড়ী",
            "schools": []
          },
          {
            "name": "কাজলা",
            "schools": []
          },
          {
            "name": "কামালপুর",
            "schools": []
          },
          {
            "name": "কুতুবপুর",
            "schools": []
          },
          {
            "name": "চন্দনবাইশা",
            "schools": []
          },
          {
            "name": "চালুয়াবাড়ী",
            "schools": []
          },
          {
            "name": "নারচী",
            "schools": []
          },
          {
            "name": "বোহাইল",
            "schools": []
          },
          {
            "name": "ভেলাবাড়ী",
            "schools": []
          },
          {
            "name": "সারিয়াকান্দি সদর",
            "schools": []
          },
          {
            "name": "হাটফুলবাড়ী",
            "schools": []
          },
          {
            "name": "হাটশেরপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "সোনাতলা",
        "unions": [
          {
            "name": "জোড়গাছা",
            "schools": []
          },
          {
            "name": "তেকানী চুকাইনগর",
            "schools": []
          },
          {
            "name": "দিগদাইড়",
            "schools": []
          },
          {
            "name": "পাকুল্ল্যা",
            "schools": []
          },
          {
            "name": "বালুয়া",
            "schools": []
          },
          {
            "name": "মধুপুর",
            "schools": []
          },
          {
            "name": "সোনাতলা",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "বরগুনা",
    "upazilas": [
      {
        "name": "আমতলী",
        "unions": [
          {
            "name": "আঠারগাছিয়া",
            "schools": []
          },
          {
            "name": "আড়পাঙ্গাশিয়া",
            "schools": []
          },
          {
            "name": "আমতলী",
            "schools": []
          },
          {
            "name": "কুকুয়া",
            "schools": []
          },
          {
            "name": "গুলিশাখালী",
            "schools": []
          },
          {
            "name": "চাওড়া",
            "schools": []
          },
          {
            "name": "ছোটবগী",
            "schools": []
          },
          {
            "name": "হলদিয়া",
            "schools": []
          }
        ]
      },
      {
        "name": "তালতলি",
        "unions": [
          {
            "name": "কড়ইবাড়ীয়া",
            "schools": []
          },
          {
            "name": "ছোটবগি",
            "schools": []
          },
          {
            "name": "নিশানবাড়ীয়া",
            "schools": []
          },
          {
            "name": "পচাকোড়ালিয়া",
            "schools": []
          },
          {
            "name": "বড়বগি",
            "schools": []
          },
          {
            "name": "শারিকখালি",
            "schools": []
          },
          {
            "name": "সোনাকাটা",
            "schools": []
          }
        ]
      },
      {
        "name": "পাথরঘাটা",
        "unions": [
          {
            "name": "কাকচিঢ়া",
            "schools": []
          },
          {
            "name": "কাঠালতলী",
            "schools": []
          },
          {
            "name": "কালমেঘা",
            "schools": []
          },
          {
            "name": "চরদুয়ানী",
            "schools": []
          },
          {
            "name": "নাচনাপাড়া",
            "schools": []
          },
          {
            "name": "পাথরঘাটা",
            "schools": []
          },
          {
            "name": "রায়হানপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "বরগুনা সদর",
        "unions": [
          {
            "name": "আয়লা পাতাকাটা",
            "schools": []
          },
          {
            "name": "এম. বালিয়াতলী",
            "schools": []
          },
          {
            "name": "কেওড়াবুনিয়া",
            "schools": []
          },
          {
            "name": "গৌরিচন্না",
            "schools": []
          },
          {
            "name": "ঢলুয়া",
            "schools": []
          },
          {
            "name": "নলটোনা",
            "schools": []
          },
          {
            "name": "ফুলঝুড়ি",
            "schools": []
          },
          {
            "name": "বদরখালী",
            "schools": []
          },
          {
            "name": "বরগুনা",
            "schools": []
          },
          {
            "name": "বুড়িরচর",
            "schools": []
          }
        ]
      },
      {
        "name": "বামনা",
        "unions": [
          {
            "name": "ডৌয়াতলা",
            "schools": []
          },
          {
            "name": "বামনা",
            "schools": []
          },
          {
            "name": "বুকাবুনিয়া",
            "schools": []
          },
          {
            "name": "রামনা",
            "schools": []
          }
        ]
      },
      {
        "name": "বেতাগী",
        "unions": [
          {
            "name": "কাজীরাবাদ",
            "schools": []
          },
          {
            "name": "বিবিচিন",
            "schools": []
          },
          {
            "name": "বুড়ামজুমদার",
            "schools": []
          },
          {
            "name": "বেতাগী",
            "schools": []
          },
          {
            "name": "মোকামিয়া",
            "schools": []
          },
          {
            "name": "সরিষামুড়ী",
            "schools": []
          },
          {
            "name": "হোসনাবাদ",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "বরিশাল",
    "upazilas": [
      {
        "name": "আগৈলঝাড়া",
        "unions": [
          {
            "name": "গৈলা",
            "schools": []
          },
          {
            "name": "বাকাল",
            "schools": []
          },
          {
            "name": "বাগধা",
            "schools": []
          },
          {
            "name": "রত্নপুর",
            "schools": []
          },
          {
            "name": "রাজিহার",
            "schools": []
          }
        ]
      },
      {
        "name": "উজিরপুর",
        "unions": [
          {
            "name": "ওটরা",
            "schools": []
          },
          {
            "name": "গুঠিয়া",
            "schools": []
          },
          {
            "name": "জল্লা",
            "schools": []
          },
          {
            "name": "বরাকোঠা",
            "schools": []
          },
          {
            "name": "বামরাইল",
            "schools": []
          },
          {
            "name": "শিকারপুর উজিরপুর",
            "schools": []
          },
          {
            "name": "শোলক",
            "schools": []
          },
          {
            "name": "সাতলা",
            "schools": []
          },
          {
            "name": "হারতা",
            "schools": []
          }
        ]
      },
      {
        "name": "গৌরনদী",
        "unions": [
          {
            "name": "খাঞ্জাপুর",
            "schools": []
          },
          {
            "name": "চাঁদশী",
            "schools": []
          },
          {
            "name": "নলচিড়া",
            "schools": []
          },
          {
            "name": "বাটাজোর",
            "schools": []
          },
          {
            "name": "বার্থী",
            "schools": []
          },
          {
            "name": "মাহিলারা",
            "schools": []
          },
          {
            "name": "সরিকল",
            "schools": []
          }
        ]
      },
      {
        "name": "বরিশাল সদর",
        "unions": [
          {
            "name": "কাশীপুর",
            "schools": []
          },
          {
            "name": "চন্দ্রমোহন",
            "schools": []
          },
          {
            "name": "চরকাউয়া",
            "schools": []
          },
          {
            "name": "চরবাড়িয়া",
            "schools": []
          },
          {
            "name": "চরমোনাই",
            "schools": []
          },
          {
            "name": "চাঁদপুরা",
            "schools": []
          },
          {
            "name": "জাগুয়া",
            "schools": []
          },
          {
            "name": "টুঙ্গীবাড়িয়া",
            "schools": []
          },
          {
            "name": "রায়পাশা কড়াপুর",
            "schools": []
          },
          {
            "name": "সায়েস্তাবাদ",
            "schools": []
          }
        ]
      },
      {
        "name": "বাকেরগঞ্জ",
        "unions": [
          {
            "name": "কবাই",
            "schools": []
          },
          {
            "name": "কলসকাঠী",
            "schools": []
          },
          {
            "name": "গারুরিয়া",
            "schools": []
          },
          {
            "name": "চরাদি",
            "schools": []
          },
          {
            "name": "চরামদ্দি",
            "schools": []
          },
          {
            "name": "দাড়িয়াল",
            "schools": []
          },
          {
            "name": "দুধল",
            "schools": []
          },
          {
            "name": "দুর্গাপাশা",
            "schools": []
          },
          {
            "name": "নলুয়া",
            "schools": []
          },
          {
            "name": "নিয়ামতি",
            "schools": []
          },
          {
            "name": "পাদ্রিশিবপুর",
            "schools": []
          },
          {
            "name": "ফরিদপুর",
            "schools": []
          },
          {
            "name": "ভরপাশা",
            "schools": []
          },
          {
            "name": "রঙ্গশ্রী",
            "schools": []
          }
        ]
      },
      {
        "name": "বানারীপাড়া",
        "unions": [
          {
            "name": "ইলুহার",
            "schools": []
          },
          {
            "name": "উদয়কাঠী",
            "schools": []
          },
          {
            "name": "চাখার",
            "schools": []
          },
          {
            "name": "বাইশারী",
            "schools": []
          },
          {
            "name": "বানারিপাড়া",
            "schools": []
          },
          {
            "name": "বিশারকান্দি",
            "schools": []
          },
          {
            "name": "সলিয়াবাকপুর",
            "schools": []
          },
          {
            "name": "সৈয়দকাঠী",
            "schools": []
          }
        ]
      },
      {
        "name": "বাবুগঞ্জ",
        "unions": [
          {
            "name": "কেদারপুর",
            "schools": []
          },
          {
            "name": "চাঁদপাশা",
            "schools": []
          },
          {
            "name": "জাহাঙ্গীর নগর",
            "schools": []
          },
          {
            "name": "দেহেরগতি",
            "schools": []
          },
          {
            "name": "মাধবপাশা",
            "schools": []
          },
          {
            "name": "রহমতপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "মুলাদী",
        "unions": [
          {
            "name": "কাজিরচর",
            "schools": []
          },
          {
            "name": "গাছুয়া",
            "schools": []
          },
          {
            "name": "চরকালেখা",
            "schools": []
          },
          {
            "name": "নাজিরপুর",
            "schools": []
          },
          {
            "name": "বাটামারা",
            "schools": []
          },
          {
            "name": "মুলাদী",
            "schools": []
          },
          {
            "name": "সফিপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "মেহেন্দিগঞ্জ",
        "unions": [
          {
            "name": "আন্দারমানিক",
            "schools": []
          },
          {
            "name": "আলিমাবাদ",
            "schools": []
          },
          {
            "name": "উলানিয়া",
            "schools": []
          },
          {
            "name": "গোবিন্দপুর",
            "schools": []
          },
          {
            "name": "চরএককরিয়া",
            "schools": []
          },
          {
            "name": "চরগোপালপুর",
            "schools": []
          },
          {
            "name": "চানপুর",
            "schools": []
          },
          {
            "name": "জাঙ্গালিয়া",
            "schools": []
          },
          {
            "name": "দড়িরচর খাজুরিয়া",
            "schools": []
          },
          {
            "name": "বিদ্যানন্দনপুর",
            "schools": []
          },
          {
            "name": "ভাষানচর",
            "schools": []
          },
          {
            "name": "মেহেন্দিগঞ্জ",
            "schools": []
          },
          {
            "name": "লতা",
            "schools": []
          }
        ]
      },
      {
        "name": "হিজলা",
        "unions": [
          {
            "name": "গুয়াবাড়িয়া",
            "schools": []
          },
          {
            "name": "ধুলখোলা",
            "schools": []
          },
          {
            "name": "বড়জালিয়া",
            "schools": []
          },
          {
            "name": "মেমানিয়া",
            "schools": []
          },
          {
            "name": "হরিনাথপুর",
            "schools": []
          },
          {
            "name": "হিজলা গৌরাব্দি",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "বাগেরহাট",
    "upazilas": [
      {
        "name": "কচুয়া",
        "unions": [
          {
            "name": "কচুয়া",
            "schools": []
          },
          {
            "name": "গজালিয়া",
            "schools": []
          },
          {
            "name": "গোপালপুর",
            "schools": []
          },
          {
            "name": "ধোপাখালী",
            "schools": []
          },
          {
            "name": "বাধাল",
            "schools": []
          },
          {
            "name": "মঘিয়া",
            "schools": []
          },
          {
            "name": "রাড়ীপাড়া",
            "schools": []
          }
        ]
      },
      {
        "name": "চিতলমারী",
        "unions": [
          {
            "name": "কলাতলা",
            "schools": []
          },
          {
            "name": "চরবানিয়ারী",
            "schools": []
          },
          {
            "name": "চিতলমারী",
            "schools": []
          },
          {
            "name": "বড়বাড়িয়া",
            "schools": []
          },
          {
            "name": "শিবপুর",
            "schools": []
          },
          {
            "name": "সন্তোষপুর",
            "schools": []
          },
          {
            "name": "হিজলা",
            "schools": []
          }
        ]
      },
      {
        "name": "ফকিরহাট",
        "unions": [
          {
            "name": "নলধা-মৌভোগ",
            "schools": []
          },
          {
            "name": "পিলজংগ",
            "schools": []
          },
          {
            "name": "ফকিরহাট",
            "schools": []
          },
          {
            "name": "বাহিরদিয়া-মানসা",
            "schools": []
          },
          {
            "name": "বেতাগা",
            "schools": []
          },
          {
            "name": "মূলঘর",
            "schools": []
          },
          {
            "name": "লখপুর",
            "schools": []
          },
          {
            "name": "শুভদিয়া",
            "schools": []
          }
        ]
      },
      {
        "name": "বাগেরহাট সদর",
        "unions": [
          {
            "name": "কাড়াপাড়া",
            "schools": []
          },
          {
            "name": "খানপুর",
            "schools": []
          },
          {
            "name": "গোটাপাড়া",
            "schools": []
          },
          {
            "name": "ডেমা",
            "schools": []
          },
          {
            "name": "বারুইপাড়া",
            "schools": []
          },
          {
            "name": "বিষ্ণুপুর",
            "schools": []
          },
          {
            "name": "বেমরতা",
            "schools": []
          },
          {
            "name": "যাত্রাপুর",
            "schools": []
          },
          {
            "name": "রাখালগাছি",
            "schools": []
          },
          {
            "name": "ষাটগুম্বজ",
            "schools": []
          }
        ]
      },
      {
        "name": "মোংলা",
        "unions": [
          {
            "name": "চাঁদপাই",
            "schools": []
          },
          {
            "name": "চিলা",
            "schools": []
          },
          {
            "name": "বুড়িরডাঙ্গা",
            "schools": []
          },
          {
            "name": "মিঠাখালী",
            "schools": []
          },
          {
            "name": "সুন্দরবন",
            "schools": []
          },
          {
            "name": "সোনাইলতলা",
            "schools": []
          }
        ]
      },
      {
        "name": "মোড়েলগঞ্জ",
        "unions": [
          {
            "name": "খাউলিয়া",
            "schools": []
          },
          {
            "name": "চিংড়াখালী",
            "schools": []
          },
          {
            "name": "জিউধরা",
            "schools": []
          },
          {
            "name": "তেলিগাতী",
            "schools": []
          },
          {
            "name": "দৈবজ্ঞহাটি",
            "schools": []
          },
          {
            "name": "নিশানবাড়িয়া",
            "schools": []
          },
          {
            "name": "পঞ্চকরণ",
            "schools": []
          },
          {
            "name": "পুটিখালী",
            "schools": []
          },
          {
            "name": "বনগ্রাম",
            "schools": []
          },
          {
            "name": "বলইবুনিয়া",
            "schools": []
          },
          {
            "name": "বহরবুনিয়া",
            "schools": []
          },
          {
            "name": "বারইখালী",
            "schools": []
          },
          {
            "name": "মোড়েলগঞ্জ",
            "schools": []
          },
          {
            "name": "রামচন্দ্রপুর",
            "schools": []
          },
          {
            "name": "হোগলাপাশা",
            "schools": []
          },
          {
            "name": "হোগলাবুনিয়া",
            "schools": []
          }
        ]
      },
      {
        "name": "মোল্লাহাট",
        "unions": [
          {
            "name": "আটজুড়ী",
            "schools": []
          },
          {
            "name": "উদয়পুর",
            "schools": []
          },
          {
            "name": "কুলিয়া",
            "schools": []
          },
          {
            "name": "কোদালিয়া",
            "schools": []
          },
          {
            "name": "গাওলা",
            "schools": []
          },
          {
            "name": "গাংনী",
            "schools": []
          },
          {
            "name": "চুনখোলা",
            "schools": []
          }
        ]
      },
      {
        "name": "রামপাল",
        "unions": [
          {
            "name": "উজলকুড়",
            "schools": []
          },
          {
            "name": "গৌরম্ভা",
            "schools": []
          },
          {
            "name": "পেড়িখালী",
            "schools": []
          },
          {
            "name": "বাইনতলা",
            "schools": []
          },
          {
            "name": "বাঁশতলী",
            "schools": []
          },
          {
            "name": "ভোজপাতিয়া",
            "schools": []
          },
          {
            "name": "মল্লিকেরবেড়",
            "schools": []
          },
          {
            "name": "রাজনগর",
            "schools": []
          },
          {
            "name": "রামপাল",
            "schools": []
          },
          {
            "name": "হুড়কা",
            "schools": []
          }
        ]
      },
      {
        "name": "শরণখোলা",
        "unions": [
          {
            "name": "খোন্তাকাটা",
            "schools": []
          },
          {
            "name": "ধানসাগর",
            "schools": []
          },
          {
            "name": "রায়েন্দা",
            "schools": []
          },
          {
            "name": "সাউথখালী",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "বান্দরবান",
    "upazilas": [
      {
        "name": "আলীকদম",
        "unions": [
          {
            "name": "আলীকদম সদর",
            "schools": []
          },
          {
            "name": "চৈক্ষ্যং",
            "schools": []
          }
        ]
      },
      {
        "name": "থানচি",
        "unions": [
          {
            "name": "তিন্দু",
            "schools": []
          },
          {
            "name": "থানচি সদর",
            "schools": []
          },
          {
            "name": "বলিপাড়া",
            "schools": []
          },
          {
            "name": "রেমাক্রী",
            "schools": []
          }
        ]
      },
      {
        "name": "নাইক্ষ্যংছড়ি",
        "unions": [
          {
            "name": "ঘুমধুম",
            "schools": []
          },
          {
            "name": "দোছড়ি",
            "schools": []
          },
          {
            "name": "নাইক্ষ্যংছড়ি সদর",
            "schools": []
          },
          {
            "name": "বাইশারী",
            "schools": []
          },
          {
            "name": "সোনাইছড়ি",
            "schools": []
          }
        ]
      },
      {
        "name": "বান্দরবান সদর",
        "unions": [
          {
            "name": "কুহালং",
            "schools": []
          },
          {
            "name": "টংকাবতী",
            "schools": []
          },
          {
            "name": "বান্দরবান সদর",
            "schools": []
          },
          {
            "name": "রাজবিলা",
            "schools": []
          },
          {
            "name": "সুয়ালক",
            "schools": []
          }
        ]
      },
      {
        "name": "রুমা",
        "unions": [
          {
            "name": "গ্যালেংগ্যা",
            "schools": []
          },
          {
            "name": "পাইন্দু",
            "schools": []
          },
          {
            "name": "রুমা সদর",
            "schools": []
          },
          {
            "name": "রেমাক্রীপ্রাংসা",
            "schools": []
          }
        ]
      },
      {
        "name": "রোয়াংছড়ি",
        "unions": [
          {
            "name": "আলেক্ষ্যং",
            "schools": []
          },
          {
            "name": "তারাছা",
            "schools": []
          },
          {
            "name": "নোয়াপতং",
            "schools": []
          },
          {
            "name": "রোয়াংছড়ি সদর",
            "schools": []
          }
        ]
      },
      {
        "name": "লামা",
        "unions": [
          {
            "name": "আজিজনগর",
            "schools": []
          },
          {
            "name": "গজালিয়া",
            "schools": []
          },
          {
            "name": "ফাইতং",
            "schools": []
          },
          {
            "name": "ফাসিয়াখালী",
            "schools": []
          },
          {
            "name": "রূপসীপাড়া",
            "schools": []
          },
          {
            "name": "লামা সদর",
            "schools": []
          },
          {
            "name": "সরই",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "ব্রাহ্মণবাড়িয়া",
    "upazilas": [
      {
        "name": "আখাউড়া",
        "unions": [
          {
            "name": "আখাউড়া (উঃ)",
            "schools": []
          },
          {
            "name": "আখাউড়া (দঃ)",
            "schools": []
          },
          {
            "name": "ধরখার",
            "schools": []
          },
          {
            "name": "মনিয়ন্দ",
            "schools": []
          },
          {
            "name": "মোগড়া",
            "schools": []
          }
        ]
      },
      {
        "name": "আশুগঞ্জ",
        "unions": [
          {
            "name": "আড়াইসিধা",
            "schools": []
          },
          {
            "name": "আশুগঞ্জ সদর",
            "schools": []
          },
          {
            "name": "চরচারতলা",
            "schools": []
          },
          {
            "name": "তারুয়া",
            "schools": []
          },
          {
            "name": "তালশহর(পঃ)",
            "schools": []
          },
          {
            "name": "দুর্গাপুর",
            "schools": []
          },
          {
            "name": "লালপুর",
            "schools": []
          },
          {
            "name": "শরীফপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "কসবা",
        "unions": [
          {
            "name": "কসবা",
            "schools": []
          },
          {
            "name": "কাইমপুর",
            "schools": []
          },
          {
            "name": "কুটি",
            "schools": []
          },
          {
            "name": "খাড়েরা",
            "schools": []
          },
          {
            "name": "গোপীনাথপুর",
            "schools": []
          },
          {
            "name": "বাদৈর",
            "schools": []
          },
          {
            "name": "বায়েক",
            "schools": []
          },
          {
            "name": "বিনাউটি",
            "schools": []
          },
          {
            "name": "মূলগ্রাম",
            "schools": []
          },
          {
            "name": "মেহারী",
            "schools": []
          }
        ]
      },
      {
        "name": "নবীনগর",
        "unions": [
          {
            "name": "ইব্রাহিমপুর",
            "schools": []
          },
          {
            "name": "কাইতলা (উত্তর)",
            "schools": []
          },
          {
            "name": "কাইতলা (দক্ষিন)",
            "schools": []
          },
          {
            "name": "কৃষ্ণনগর",
            "schools": []
          },
          {
            "name": "ছলিমগঞ্জ",
            "schools": []
          },
          {
            "name": "জিনোদপুর",
            "schools": []
          },
          {
            "name": "নবীনগর (পূর্ব)",
            "schools": []
          },
          {
            "name": "নবীনগর(পশ্চিম)",
            "schools": []
          },
          {
            "name": "নাটঘর",
            "schools": []
          },
          {
            "name": "বড়াইল",
            "schools": []
          },
          {
            "name": "বড়িকান্দি",
            "schools": []
          },
          {
            "name": "বিটঘর",
            "schools": []
          },
          {
            "name": "বিদ্যাকুট",
            "schools": []
          },
          {
            "name": "বীরগাঁও",
            "schools": []
          },
          {
            "name": "রতনপুর",
            "schools": []
          },
          {
            "name": "রসুল্লাবাদ",
            "schools": []
          },
          {
            "name": "লাউরফতেপুর",
            "schools": []
          },
          {
            "name": "শিবপুর",
            "schools": []
          },
          {
            "name": "শ্যামগ্রাম",
            "schools": []
          },
          {
            "name": "শ্রীরামপুর",
            "schools": []
          },
          {
            "name": "সাতমোড়া",
            "schools": []
          }
        ]
      },
      {
        "name": "নাসিরনগর",
        "unions": [
          {
            "name": "কুন্ডা",
            "schools": []
          },
          {
            "name": "গুনিয়াউক",
            "schools": []
          },
          {
            "name": "গোকর্ণ",
            "schools": []
          },
          {
            "name": "গোয়ালনগর",
            "schools": []
          },
          {
            "name": "চাতলপাড়",
            "schools": []
          },
          {
            "name": "চাপৈরতলা",
            "schools": []
          },
          {
            "name": "ধরমন্ডল",
            "schools": []
          },
          {
            "name": "নাসিরনগর",
            "schools": []
          },
          {
            "name": "পূর্বভাগ",
            "schools": []
          },
          {
            "name": "ফান্দাউক",
            "schools": []
          },
          {
            "name": "বুড়িশ্বর",
            "schools": []
          },
          {
            "name": "ভলাকুট",
            "schools": []
          },
          {
            "name": "হরিপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "বাঞ্ছারামপুর",
        "unions": [
          {
            "name": "আইয়ুবপুর",
            "schools": []
          },
          {
            "name": "উজানচর পূর্ব",
            "schools": []
          },
          {
            "name": "ছয়ফুল্লাকান্দি",
            "schools": []
          },
          {
            "name": "ছলিমাবাদ",
            "schools": []
          },
          {
            "name": "তেজখালী",
            "schools": []
          },
          {
            "name": "দড়িকান্দি",
            "schools": []
          },
          {
            "name": "দরিয়াদৌলত",
            "schools": []
          },
          {
            "name": "পাহাড়িয়া কান্দি",
            "schools": []
          },
          {
            "name": "ফরদাবাদ",
            "schools": []
          },
          {
            "name": "বাঞ্ছারামপুর",
            "schools": []
          },
          {
            "name": "মানিকপুর",
            "schools": []
          },
          {
            "name": "রুপসদী পশ্চিম",
            "schools": []
          },
          {
            "name": "সোনারামপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "বিজয়নগর",
        "unions": [
          {
            "name": "ইছাপুরা",
            "schools": []
          },
          {
            "name": "চম্পকনগর",
            "schools": []
          },
          {
            "name": "চর-ইসলামপুর",
            "schools": []
          },
          {
            "name": "চান্দুরা",
            "schools": []
          },
          {
            "name": "পত্তন",
            "schools": []
          },
          {
            "name": "পাহাড়পুর",
            "schools": []
          },
          {
            "name": "বিষ্ণুপুর",
            "schools": []
          },
          {
            "name": "বুধন্তি",
            "schools": []
          },
          {
            "name": "সিংগারবিল",
            "schools": []
          },
          {
            "name": "হরষপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "ব্রাহ্মণবাড়িয়া সদর",
        "unions": [
          {
            "name": "তালশহর",
            "schools": []
          },
          {
            "name": "নাটাই (উত্তর)",
            "schools": []
          },
          {
            "name": "নাটাই (দক্ষিন)",
            "schools": []
          },
          {
            "name": "বাসুদেব",
            "schools": []
          },
          {
            "name": "বুধল",
            "schools": []
          },
          {
            "name": "মজলিশপুর",
            "schools": []
          },
          {
            "name": "মাছিহাতা",
            "schools": []
          },
          {
            "name": "রামরাইল",
            "schools": []
          },
          {
            "name": "সাদেকপুর",
            "schools": []
          },
          {
            "name": "সুলতানপুর",
            "schools": []
          },
          {
            "name": "সুহিলপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "সরাইল",
        "unions": [
          {
            "name": "অরুয়াইল",
            "schools": []
          },
          {
            "name": "কালীকচ্ছ",
            "schools": []
          },
          {
            "name": "চুন্টা",
            "schools": []
          },
          {
            "name": "নোয়াগাঁও",
            "schools": []
          },
          {
            "name": "পাকশিমুল",
            "schools": []
          },
          {
            "name": "পানিশ্বর",
            "schools": []
          },
          {
            "name": "শাহজাদাপুর",
            "schools": []
          },
          {
            "name": "শাহবাজপুর",
            "schools": []
          },
          {
            "name": "সরাইল সদর",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "ভোলা",
    "upazilas": [
      {
        "name": "চরফ্যাশন",
        "unions": [
          {
            "name": "আওয়াজপুর",
            "schools": []
          },
          {
            "name": "আওয়াজপুর",
            "schools": []
          },
          {
            "name": "আছলামপুর",
            "schools": []
          },
          {
            "name": "আবদুল্লাহ",
            "schools": []
          },
          {
            "name": "আবুবকরপুর",
            "schools": []
          },
          {
            "name": "আমিনাবাদ",
            "schools": []
          },
          {
            "name": "ওসমানগঞ্জ",
            "schools": []
          },
          {
            "name": "কুকরীমূকরী",
            "schools": []
          },
          {
            "name": "চরকলমী",
            "schools": []
          },
          {
            "name": "চরমাদ্রাজ",
            "schools": []
          },
          {
            "name": "চরমানিকা",
            "schools": []
          },
          {
            "name": "জাহানপুর",
            "schools": []
          },
          {
            "name": "জিন্নাগড়",
            "schools": []
          },
          {
            "name": "ঢালচর",
            "schools": []
          },
          {
            "name": "নজরুল নগর",
            "schools": []
          },
          {
            "name": "নীলকমল",
            "schools": []
          },
          {
            "name": "নুরাবাদ",
            "schools": []
          },
          {
            "name": "মুজিব নগর",
            "schools": []
          },
          {
            "name": "রসুলপুর",
            "schools": []
          },
          {
            "name": "হাজারীগঞ্জ",
            "schools": []
          }
        ]
      },
      {
        "name": "তজুমদ্দিন",
        "unions": [
          {
            "name": "চাঁদপুর",
            "schools": []
          },
          {
            "name": "চাচঁড়া",
            "schools": []
          },
          {
            "name": "বড় মলংচড়া",
            "schools": []
          },
          {
            "name": "শম্ভুপুর",
            "schools": []
          },
          {
            "name": "সোনাপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "দৌলতখান",
        "unions": [
          {
            "name": "উত্তর জয়নগর",
            "schools": []
          },
          {
            "name": "চর খলিফা",
            "schools": []
          },
          {
            "name": "চরপাতা",
            "schools": []
          },
          {
            "name": "দক্ষিন জয়নগর",
            "schools": []
          },
          {
            "name": "ভবানীপুর",
            "schools": []
          },
          {
            "name": "মদনপুর",
            "schools": []
          },
          {
            "name": "মেদুয়া",
            "schools": []
          },
          {
            "name": "সৈয়দপুর",
            "schools": []
          },
          {
            "name": "হাজীপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "বোরহানউদ্দিন",
        "unions": [
          {
            "name": "কাচিয়া",
            "schools": []
          },
          {
            "name": "কুতুবা",
            "schools": []
          },
          {
            "name": "দেউলা",
            "schools": []
          },
          {
            "name": "পক্ষিয়া",
            "schools": []
          },
          {
            "name": "বড় মানিকা",
            "schools": []
          }
        ]
      },
      {
        "name": "ভোলা সদর",
        "unions": [
          {
            "name": " ভেলুমিয়া",
            "schools": []
          },
          {
            "name": "আলীনগর",
            "schools": []
          },
          {
            "name": "ইলিশা",
            "schools": []
          },
          {
            "name": "উত্তর দিঘলদী",
            "schools": []
          },
          {
            "name": "কাচিয়া",
            "schools": []
          },
          {
            "name": "চরসামাইয়া",
            "schools": []
          },
          {
            "name": "দক্ষিণ দিঘলদী",
            "schools": []
          },
          {
            "name": "ধনিয়া",
            "schools": []
          },
          {
            "name": "পশ্চিম ইলিশা",
            "schools": []
          },
          {
            "name": "বাপ্তা",
            "schools": []
          },
          {
            "name": "ভেদুরিয়া",
            "schools": []
          },
          {
            "name": "রাজাপুর",
            "schools": []
          },
          {
            "name": "শিবপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "মনপুরা",
        "unions": [
          {
            "name": "উত্তর সাকুচিয়া",
            "schools": []
          },
          {
            "name": "দক্ষিন সাকুচিয়া",
            "schools": []
          },
          {
            "name": "মনপুরা",
            "schools": []
          },
          {
            "name": "হাজীর হাট",
            "schools": []
          }
        ]
      },
      {
        "name": "লালমোহন",
        "unions": [
          {
            "name": " কালমা",
            "schools": []
          },
          {
            "name": "চরভূতা",
            "schools": []
          },
          {
            "name": "ধলীগৌর নগর",
            "schools": []
          },
          {
            "name": "পশ্চিম চর উমেদ",
            "schools": []
          },
          {
            "name": "ফরাজগঞ্জ",
            "schools": []
          },
          {
            "name": "বদরপুর",
            "schools": []
          },
          {
            "name": "রমাগঞ্জ",
            "schools": []
          },
          {
            "name": "লর্ড হার্ডিঞ্জ",
            "schools": []
          },
          {
            "name": "লালমোহন",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "ময়মনসিংহ",
    "upazilas": [
      {
        "name": "ঈশ্বরগঞ্জ",
        "unions": [
          {
            "name": "আঠারবাড়ী",
            "schools": []
          },
          {
            "name": "ঈশ্বরগঞ্জ",
            "schools": []
          },
          {
            "name": "উচাখিলা",
            "schools": []
          },
          {
            "name": "জাটিয়া",
            "schools": []
          },
          {
            "name": "তারুন্দিয়া",
            "schools": []
          },
          {
            "name": "বড়হিত",
            "schools": []
          },
          {
            "name": "মগটুলা",
            "schools": []
          },
          {
            "name": "মাইজবাগ",
            "schools": []
          },
          {
            "name": "রাজিবপুর",
            "schools": []
          },
          {
            "name": "সরিষা",
            "schools": []
          },
          {
            "name": "সোহাগী",
            "schools": []
          }
        ]
      },
      {
        "name": "গফরগাঁও",
        "unions": [
          {
            "name": "উস্থি",
            "schools": []
          },
          {
            "name": "গফরগাঁও",
            "schools": []
          },
          {
            "name": "চরআলগী",
            "schools": []
          },
          {
            "name": "টাংগাব",
            "schools": []
          },
          {
            "name": "দত্তেরবাজার",
            "schools": []
          },
          {
            "name": "নিগুয়ারী",
            "schools": []
          },
          {
            "name": "পাইথল",
            "schools": []
          },
          {
            "name": "পাঁচবাগ",
            "schools": []
          },
          {
            "name": "বারবারিয়া",
            "schools": []
          },
          {
            "name": "মশাখালী",
            "schools": []
          },
          {
            "name": "যশরা",
            "schools": []
          },
          {
            "name": "রসুলপুর",
            "schools": []
          },
          {
            "name": "রাওনা",
            "schools": []
          },
          {
            "name": "লংগাইর",
            "schools": []
          },
          {
            "name": "সালটিয়া",
            "schools": []
          }
        ]
      },
      {
        "name": "গৌরীপুর",
        "unions": [
          {
            "name": "অচিন্তপুর",
            "schools": []
          },
          {
            "name": "গৌরীপুর",
            "schools": []
          },
          {
            "name": "ডৌহাখলা",
            "schools": []
          },
          {
            "name": "বোকাইনগর",
            "schools": []
          },
          {
            "name": "ভাংনামারী",
            "schools": []
          },
          {
            "name": "মইলাকান্দা",
            "schools": []
          },
          {
            "name": "মাওহা",
            "schools": []
          },
          {
            "name": "রামগোপালপুর",
            "schools": []
          },
          {
            "name": "সহনাটি",
            "schools": []
          },
          {
            "name": "সিধলা",
            "schools": []
          }
        ]
      },
      {
        "name": "তারাকান্দা",
        "unions": [
          {
            "name": "কাকনী",
            "schools": []
          },
          {
            "name": "কামারগাঁও",
            "schools": []
          },
          {
            "name": "কামারিয়া",
            "schools": []
          },
          {
            "name": "গালাগাঁও",
            "schools": []
          },
          {
            "name": "ঢাকুয়া",
            "schools": []
          },
          {
            "name": "তারাকান্দা",
            "schools": []
          },
          {
            "name": "বানিহালা",
            "schools": []
          },
          {
            "name": "বালিখা",
            "schools": []
          },
          {
            "name": "বিস্কা",
            "schools": []
          },
          {
            "name": "রামপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "ত্রিশাল",
        "unions": [
          {
            "name": "আমিরাবাড়ী",
            "schools": []
          },
          {
            "name": "কাঁঠাল",
            "schools": []
          },
          {
            "name": "কানিহারী",
            "schools": []
          },
          {
            "name": "ত্রিশাল",
            "schools": []
          },
          {
            "name": "ধানীখোলা",
            "schools": []
          },
          {
            "name": "বালিপাড়া",
            "schools": []
          },
          {
            "name": "বৈলর",
            "schools": []
          },
          {
            "name": "মঠবাড়ী",
            "schools": []
          },
          {
            "name": "মোক্ষপুর",
            "schools": []
          },
          {
            "name": "রামপুর",
            "schools": []
          },
          {
            "name": "সাখুয়া",
            "schools": []
          },
          {
            "name": "হরিরামপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "ধোবাউড়া",
        "unions": [
          {
            "name": "গামারীতলা",
            "schools": []
          },
          {
            "name": "গোয়াতলা",
            "schools": []
          },
          {
            "name": "ঘোষগাঁও",
            "schools": []
          },
          {
            "name": "দক্ষিণ মাইজপাড়া",
            "schools": []
          },
          {
            "name": "ধোবাউড়া",
            "schools": []
          },
          {
            "name": "পোড়াকান্দুলিয়া",
            "schools": []
          },
          {
            "name": "বাঘবেড়",
            "schools": []
          }
        ]
      },
      {
        "name": "নান্দাইল",
        "unions": [
          {
            "name": "আচারগাঁও",
            "schools": []
          },
          {
            "name": "খারুয়া",
            "schools": []
          },
          {
            "name": "গাংগাইল",
            "schools": []
          },
          {
            "name": "চন্ডীপাশা",
            "schools": []
          },
          {
            "name": "জাহাঙ্গীরপুর",
            "schools": []
          },
          {
            "name": "নান্দাইল",
            "schools": []
          },
          {
            "name": "বেতাগৈর",
            "schools": []
          },
          {
            "name": "মুশুল্লী",
            "schools": []
          },
          {
            "name": "মোয়াজ্জেমপুর",
            "schools": []
          },
          {
            "name": "রাজগাতী",
            "schools": []
          },
          {
            "name": "শেরপুর",
            "schools": []
          },
          {
            "name": "সিংরইল",
            "schools": []
          }
        ]
      },
      {
        "name": "ফুলপুর",
        "unions": [
          {
            "name": "ছনধরা",
            "schools": []
          },
          {
            "name": "পয়ারী",
            "schools": []
          },
          {
            "name": "ফুলপুর",
            "schools": []
          },
          {
            "name": "বওলা",
            "schools": []
          },
          {
            "name": "বালিয়া",
            "schools": []
          },
          {
            "name": "ভাইটকান্দি",
            "schools": []
          },
          {
            "name": "রহিমগঞ্জ",
            "schools": []
          },
          {
            "name": "রামভদ্রপুর",
            "schools": []
          },
          {
            "name": "রূপসী",
            "schools": []
          },
          {
            "name": "সিংহেশ্বর",
            "schools": []
          }
        ]
      },
      {
        "name": "ফুলবাড়ীয়া",
        "unions": [
          {
            "name": "আছিমপাটুলী",
            "schools": []
          },
          {
            "name": "এনায়েতপুর",
            "schools": []
          },
          {
            "name": "কালাদহ",
            "schools": []
          },
          {
            "name": "কুশমাইল",
            "schools": []
          },
          {
            "name": "দেওখোলা",
            "schools": []
          },
          {
            "name": "নাওগাঁও",
            "schools": []
          },
          {
            "name": "পুটিজানা",
            "schools": []
          },
          {
            "name": "ফুলবাড়ীয়া",
            "schools": []
          },
          {
            "name": "বাক্তা",
            "schools": []
          },
          {
            "name": "বালিয়ান",
            "schools": []
          },
          {
            "name": "ভবানীপুর",
            "schools": []
          },
          {
            "name": "রাঙ্গামাটিয়া",
            "schools": []
          },
          {
            "name": "রাধাকানাই",
            "schools": []
          }
        ]
      },
      {
        "name": "ভালুকা",
        "unions": [
          {
            "name": "উথুরা",
            "schools": []
          },
          {
            "name": "কাচিনা",
            "schools": []
          },
          {
            "name": "ডাকাতিয়া",
            "schools": []
          },
          {
            "name": "ধীতপুর",
            "schools": []
          },
          {
            "name": "বিরুনিয়া",
            "schools": []
          },
          {
            "name": "ভরাডোবা",
            "schools": []
          },
          {
            "name": "ভালুকা",
            "schools": []
          },
          {
            "name": "মল্লিকবাড়ী",
            "schools": []
          },
          {
            "name": "মেদুয়ারী",
            "schools": []
          },
          {
            "name": "রাজৈ",
            "schools": []
          },
          {
            "name": "হবিরবাড়ী",
            "schools": []
          }
        ]
      },
      {
        "name": "ময়মনসিংহ সদর",
        "unions": [
          {
            "name": "অষ্টধার",
            "schools": []
          },
          {
            "name": "আকুয়া",
            "schools": []
          },
          {
            "name": "কুষ্টিয়া",
            "schools": []
          },
          {
            "name": "খাগডহর",
            "schools": []
          },
          {
            "name": "ঘাগড়া",
            "schools": []
          },
          {
            "name": "চর ঈশ্বরদিয়া",
            "schools": []
          },
          {
            "name": "চরনিলক্ষিয়া",
            "schools": []
          },
          {
            "name": "দাপুনিয়া",
            "schools": []
          },
          {
            "name": "পরানগঞ্জ",
            "schools": []
          },
          {
            "name": "বয়ড়া",
            "schools": []
          },
          {
            "name": "বোররচর",
            "schools": []
          },
          {
            "name": "ভাবখালী",
            "schools": []
          },
          {
            "name": "সিরতা",
            "schools": []
          }
        ]
      },
      {
        "name": "মুক্তাগাছা",
        "unions": [
          {
            "name": "কাশিমপুর",
            "schools": []
          },
          {
            "name": "কুমারগাতা",
            "schools": []
          },
          {
            "name": "খেরুয়াজানী",
            "schools": []
          },
          {
            "name": "ঘোগা",
            "schools": []
          },
          {
            "name": "তারাটি",
            "schools": []
          },
          {
            "name": "দাওগাঁও",
            "schools": []
          },
          {
            "name": "দুল্লা",
            "schools": []
          },
          {
            "name": "বড়গ্রাম",
            "schools": []
          },
          {
            "name": "বাশাটি",
            "schools": []
          },
          {
            "name": "মানকোন",
            "schools": []
          }
        ]
      },
      {
        "name": "হালুয়াঘাট",
        "unions": [
          {
            "name": "আমতৈল",
            "schools": []
          },
          {
            "name": "কৈচাপুর",
            "schools": []
          },
          {
            "name": "গাজিরভিটা",
            "schools": []
          },
          {
            "name": "জুগলী",
            "schools": []
          },
          {
            "name": "ধারা",
            "schools": []
          },
          {
            "name": "ধুরাইল",
            "schools": []
          },
          {
            "name": "নড়াইল",
            "schools": []
          },
          {
            "name": "বিলডোরা",
            "schools": []
          },
          {
            "name": "ভূবনকুড়া",
            "schools": []
          },
          {
            "name": "শাকুয়াই",
            "schools": []
          },
          {
            "name": "স্বদেশী",
            "schools": []
          },
          {
            "name": "হালুয়াঘাট",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "মাগুরা",
    "upazilas": [
      {
        "name": "মহম্মদপুর",
        "unions": [
          {
            "name": "দীঘা",
            "schools": []
          },
          {
            "name": "নহাটা",
            "schools": []
          },
          {
            "name": "পলাশবাড়ীয়া",
            "schools": []
          },
          {
            "name": "বাবুখালী",
            "schools": []
          },
          {
            "name": "বালিদিয়া",
            "schools": []
          },
          {
            "name": "বিনোদপুর",
            "schools": []
          },
          {
            "name": "মহম্মদপুর",
            "schools": []
          },
          {
            "name": "রাজাপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "মাগুরা সদর",
        "unions": [
          {
            "name": "আঠারখাদা",
            "schools": []
          },
          {
            "name": "কছুন্দী",
            "schools": []
          },
          {
            "name": "কুচিয়ামো",
            "schools": []
          },
          {
            "name": "গোপালগ্রাম",
            "schools": []
          },
          {
            "name": "চাউলিয়া",
            "schools": []
          },
          {
            "name": "জগদল",
            "schools": []
          },
          {
            "name": "বগিয়া",
            "schools": []
          },
          {
            "name": "বেরইল পলিতা",
            "schools": []
          },
          {
            "name": "মঘী",
            "schools": []
          },
          {
            "name": "রাঘবদাইড়",
            "schools": []
          },
          {
            "name": "শত্রুজিৎপুর",
            "schools": []
          },
          {
            "name": "হাজরাপুর",
            "schools": []
          },
          {
            "name": "হাজীপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "শালিখা",
        "unions": [
          {
            "name": "আড়পাড়া",
            "schools": []
          },
          {
            "name": "গঙ্গারামপুর",
            "schools": []
          },
          {
            "name": "তালখড়ি",
            "schools": []
          },
          {
            "name": "ধনেশ্বরগাতী",
            "schools": []
          },
          {
            "name": "বুনাগাতী",
            "schools": []
          },
          {
            "name": "শতখালী",
            "schools": []
          },
          {
            "name": "শালিখা",
            "schools": []
          }
        ]
      },
      {
        "name": "শ্রীপুর",
        "unions": [
          {
            "name": "আমলসার",
            "schools": []
          },
          {
            "name": "কাদিরপাড়া",
            "schools": []
          },
          {
            "name": "গয়েশপুর",
            "schools": []
          },
          {
            "name": "দ্বারিয়াপুর",
            "schools": []
          },
          {
            "name": "নাকোল",
            "schools": []
          },
          {
            "name": "শ্রীকোল",
            "schools": []
          },
          {
            "name": "শ্রীপুর",
            "schools": []
          },
          {
            "name": "সব্দালপুর",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "মাদারীপুর",
    "upazilas": [
      {
        "name": "কালকিনি",
        "unions": [
          {
            "name": "আলীনগর",
            "schools": []
          },
          {
            "name": "এনায়েতনগর",
            "schools": []
          },
          {
            "name": "কয়ারিয়া",
            "schools": []
          },
          {
            "name": "কাজীবাকাই",
            "schools": []
          },
          {
            "name": "গোপালপুর",
            "schools": []
          },
          {
            "name": "চরদৌলতখান",
            "schools": []
          },
          {
            "name": "ডাসার",
            "schools": []
          },
          {
            "name": "নবগ্রাম",
            "schools": []
          },
          {
            "name": "বাঁশগাড়ী",
            "schools": []
          },
          {
            "name": "বালীগ্রাম",
            "schools": []
          },
          {
            "name": "রমজানপুর",
            "schools": []
          },
          {
            "name": "লক্ষীপুর",
            "schools": []
          },
          {
            "name": "শিকারমঙ্গল",
            "schools": []
          },
          {
            "name": "সাহেবরামপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "ডাসার",
        "unions": []
      },
      {
        "name": "মাদারীপুর সদর",
        "unions": [
          {
            "name": "কালিকাপুর",
            "schools": []
          },
          {
            "name": "কুনিয়া",
            "schools": []
          },
          {
            "name": "কেন্দুয়া",
            "schools": []
          },
          {
            "name": "খোয়াজপুর",
            "schools": []
          },
          {
            "name": "ঘটমাঝি",
            "schools": []
          },
          {
            "name": "ছিলারচর",
            "schools": []
          },
          {
            "name": "ঝাউদী",
            "schools": []
          },
          {
            "name": "দুধখালী",
            "schools": []
          },
          {
            "name": "ধুরাইল",
            "schools": []
          },
          {
            "name": "পাঁচখোলা",
            "schools": []
          },
          {
            "name": "পেয়ারপুর",
            "schools": []
          },
          {
            "name": "বাহাদুরপুর",
            "schools": []
          },
          {
            "name": "মস্তফাপুর",
            "schools": []
          },
          {
            "name": "রাস্তি",
            "schools": []
          },
          {
            "name": "শিড়খাড়া",
            "schools": []
          }
        ]
      },
      {
        "name": "রাজৈর",
        "unions": [
          {
            "name": "আমগ্রাম",
            "schools": []
          },
          {
            "name": "ইশিবপুর",
            "schools": []
          },
          {
            "name": "কদমবাড়ী",
            "schools": []
          },
          {
            "name": "কবিরাজপুর",
            "schools": []
          },
          {
            "name": "খালিয়া",
            "schools": []
          },
          {
            "name": "পাইকপাড়া",
            "schools": []
          },
          {
            "name": "বদরপাশা",
            "schools": []
          },
          {
            "name": "বাজিতপুর",
            "schools": []
          },
          {
            "name": "রাজৈর",
            "schools": []
          },
          {
            "name": "হরিদাসদী-মহেন্দ্রদী",
            "schools": []
          },
          {
            "name": "হোসেনপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "শিবচর",
        "unions": [
          {
            "name": "উমেদপুর",
            "schools": []
          },
          {
            "name": "কাঁঠালবাড়ী",
            "schools": []
          },
          {
            "name": "কাদিরপুর",
            "schools": []
          },
          {
            "name": "কুতুবপুর",
            "schools": []
          },
          {
            "name": "চরজানাজাত",
            "schools": []
          },
          {
            "name": "দত্তপাড়া",
            "schools": []
          },
          {
            "name": "দ্বিতীয়খন্ড",
            "schools": []
          },
          {
            "name": "নিলখি",
            "schools": []
          },
          {
            "name": "পাঁচচর",
            "schools": []
          },
          {
            "name": "বন্দরখোলা",
            "schools": []
          },
          {
            "name": "বহেরাতলা উত্তর",
            "schools": []
          },
          {
            "name": "বহেরাতলা দক্ষিণ",
            "schools": []
          },
          {
            "name": "বাঁশকান্দি",
            "schools": []
          },
          {
            "name": "ভদ্রাসন",
            "schools": []
          },
          {
            "name": "ভান্ডারীকান্দি",
            "schools": []
          },
          {
            "name": "মাদবরেরচর",
            "schools": []
          },
          {
            "name": "শিবচর",
            "schools": []
          },
          {
            "name": "শিরুয়াইল",
            "schools": []
          },
          {
            "name": "সন্যাসিরচর",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "মানিকগঞ্জ",
    "upazilas": [
      {
        "name": "ঘিওর",
        "unions": [
          {
            "name": "ঘিওর",
            "schools": []
          },
          {
            "name": "নালী",
            "schools": []
          },
          {
            "name": "পয়লা",
            "schools": []
          },
          {
            "name": "বড়টিয়া",
            "schools": []
          },
          {
            "name": "বানিয়াজুড়ী",
            "schools": []
          },
          {
            "name": "বালিয়াখোড়া",
            "schools": []
          },
          {
            "name": "সিংজুড়ী",
            "schools": []
          }
        ]
      },
      {
        "name": "দৌলতপুর",
        "unions": [
          {
            "name": "কলিয়া",
            "schools": []
          },
          {
            "name": "খলশী",
            "schools": []
          },
          {
            "name": "চকমিরপুর",
            "schools": []
          },
          {
            "name": "চরকাটারী",
            "schools": []
          },
          {
            "name": "জিয়নপুর",
            "schools": []
          },
          {
            "name": "ধামশ্বর",
            "schools": []
          },
          {
            "name": "বাঘুটিয়া",
            "schools": []
          },
          {
            "name": "বাচামারা",
            "schools": []
          }
        ]
      },
      {
        "name": "মানিকগঞ্জ সদর",
        "unions": [
          {
            "name": "আটিগ্রাম",
            "schools": []
          },
          {
            "name": "কৃঞ্চপুর",
            "schools": []
          },
          {
            "name": "গড়পাড়া",
            "schools": []
          },
          {
            "name": "জাগীর",
            "schools": []
          },
          {
            "name": "দিঘী",
            "schools": []
          },
          {
            "name": "নবগ্রাম",
            "schools": []
          },
          {
            "name": "পুটাইল",
            "schools": []
          },
          {
            "name": "বেতিলা-মিতরা",
            "schools": []
          },
          {
            "name": "ভাড়ারিয়া",
            "schools": []
          },
          {
            "name": "হাটিপাড়া",
            "schools": []
          }
        ]
      },
      {
        "name": "শিবালয়",
        "unions": [
          {
            "name": "আরুয়া",
            "schools": []
          },
          {
            "name": "উথলী",
            "schools": []
          },
          {
            "name": "উলাইল",
            "schools": []
          },
          {
            "name": "তেওতা",
            "schools": []
          },
          {
            "name": "মহাদেবপুর",
            "schools": []
          },
          {
            "name": "শিবালয়",
            "schools": []
          },
          {
            "name": "শিমুলিয়া",
            "schools": []
          }
        ]
      },
      {
        "name": "সাটুরিয়া",
        "unions": [
          {
            "name": "তিল্লী",
            "schools": []
          },
          {
            "name": "দড়গ্রাম",
            "schools": []
          },
          {
            "name": "দিঘুলিয়া",
            "schools": []
          },
          {
            "name": "ধানকোড়া",
            "schools": []
          },
          {
            "name": "ফুকুরহাটি",
            "schools": []
          },
          {
            "name": "বরাইদ",
            "schools": []
          },
          {
            "name": "বালিয়াটি",
            "schools": []
          },
          {
            "name": "সাটুরিয়া",
            "schools": []
          },
          {
            "name": "হরগজ",
            "schools": []
          }
        ]
      },
      {
        "name": "সিংগাইর",
        "unions": [
          {
            "name": "চান্দহর",
            "schools": []
          },
          {
            "name": "চারিগ্রাম",
            "schools": []
          },
          {
            "name": "জয়মন্টপ",
            "schools": []
          },
          {
            "name": "জামশা",
            "schools": []
          },
          {
            "name": "জার্মিতা",
            "schools": []
          },
          {
            "name": "তালেবপুর",
            "schools": []
          },
          {
            "name": "ধল্লা",
            "schools": []
          },
          {
            "name": "বলধারা",
            "schools": []
          },
          {
            "name": "বায়রা",
            "schools": []
          },
          {
            "name": "শায়েস্তা",
            "schools": []
          },
          {
            "name": "সিংগাইর",
            "schools": []
          }
        ]
      },
      {
        "name": "হরিরামপুর",
        "unions": [
          {
            "name": "আজিমনগর",
            "schools": []
          },
          {
            "name": "কাঞ্চনপুর",
            "schools": []
          },
          {
            "name": "গালা",
            "schools": []
          },
          {
            "name": "গোপীনাথপুর",
            "schools": []
          },
          {
            "name": "চালা",
            "schools": []
          },
          {
            "name": "ধূলশুড়া",
            "schools": []
          },
          {
            "name": "বয়রা",
            "schools": []
          },
          {
            "name": "বলড়া",
            "schools": []
          },
          {
            "name": "বাল্লা",
            "schools": []
          },
          {
            "name": "রামকৃঞ্চপুর",
            "schools": []
          },
          {
            "name": "লেছড়াগঞ্জ",
            "schools": []
          },
          {
            "name": "সুতালড়ী",
            "schools": []
          },
          {
            "name": "হারুকান্দি",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "মুন্সিগঞ্জ",
    "upazilas": [
      {
        "name": "গজারিয়া",
        "unions": [
          {
            "name": "ইমামপুর",
            "schools": []
          },
          {
            "name": "গজারিয়া",
            "schools": []
          },
          {
            "name": "গুয়াগাছিয়া",
            "schools": []
          },
          {
            "name": "টেংগারচর",
            "schools": []
          },
          {
            "name": "বাউশিয়া",
            "schools": []
          },
          {
            "name": "বালুয়াকান্দী",
            "schools": []
          },
          {
            "name": "ভবেরচর",
            "schools": []
          },
          {
            "name": "হোসেন্দী",
            "schools": []
          }
        ]
      },
      {
        "name": "টংগীবাড়ি",
        "unions": [
          {
            "name": "আউটশাহী",
            "schools": []
          },
          {
            "name": "আড়িয়ল বালিগাঁও",
            "schools": []
          },
          {
            "name": "আব্দুল্লাপুর",
            "schools": []
          },
          {
            "name": "কাঠাদিয়া শিমুলিয়া",
            "schools": []
          },
          {
            "name": "কামারখাড়া",
            "schools": []
          },
          {
            "name": "দিঘীরপাড়",
            "schools": []
          },
          {
            "name": "ধীপুর",
            "schools": []
          },
          {
            "name": "পাঁচগাও",
            "schools": []
          },
          {
            "name": "বেতকা",
            "schools": []
          },
          {
            "name": "যশলং",
            "schools": []
          },
          {
            "name": "সোনারং টংগীবাড়ী",
            "schools": []
          },
          {
            "name": "হাসাইল বানারী",
            "schools": []
          }
        ]
      },
      {
        "name": "মুন্সিগঞ্জ সদর",
        "unions": [
          {
            "name": "আধারা",
            "schools": []
          },
          {
            "name": "চরকেওয়ার",
            "schools": []
          },
          {
            "name": "পঞ্চসার",
            "schools": []
          },
          {
            "name": "বজ্রযোগিনী",
            "schools": []
          },
          {
            "name": "বাংলাবাজার",
            "schools": []
          },
          {
            "name": "মহাকালী",
            "schools": []
          },
          {
            "name": "মোল্লাকান্দি",
            "schools": []
          },
          {
            "name": "রামপাল",
            "schools": []
          },
          {
            "name": "শিলই",
            "schools": []
          }
        ]
      },
      {
        "name": "লৌহজং",
        "unions": [
          {
            "name": "কনকসার",
            "schools": []
          },
          {
            "name": "কলমা",
            "schools": []
          },
          {
            "name": "কুমারভোগ",
            "schools": []
          },
          {
            "name": "খিদিরপাড়া",
            "schools": []
          },
          {
            "name": "গাওদিয়া",
            "schools": []
          },
          {
            "name": "বেজগাঁও",
            "schools": []
          },
          {
            "name": "বৌলতলী",
            "schools": []
          },
          {
            "name": "মেদিনীমন্ডল",
            "schools": []
          },
          {
            "name": "লৌহজং-তেওটিয়া",
            "schools": []
          },
          {
            "name": "হলদিয়া",
            "schools": []
          }
        ]
      },
      {
        "name": "শ্রীনগর",
        "unions": [
          {
            "name": "আটপাড়া",
            "schools": []
          },
          {
            "name": "কুকুটিয়া",
            "schools": []
          },
          {
            "name": "কুলাপাড়া",
            "schools": []
          },
          {
            "name": "তন্তর",
            "schools": []
          },
          {
            "name": "পাঢাভোগ",
            "schools": []
          },
          {
            "name": "বাঘড়া",
            "schools": []
          },
          {
            "name": "বাড়তারা",
            "schools": []
          },
          {
            "name": "বাড়েখাল",
            "schools": []
          },
          {
            "name": "ভাগ্যকুল",
            "schools": []
          },
          {
            "name": "রাঢ়ীখাল",
            "schools": []
          },
          {
            "name": "শ্যামসিদ্দি",
            "schools": []
          },
          {
            "name": "শ্রীনগর",
            "schools": []
          },
          {
            "name": "ষোলঘর",
            "schools": []
          },
          {
            "name": "হাসাড়া",
            "schools": []
          }
        ]
      },
      {
        "name": "সিরাজদিখান",
        "unions": [
          {
            "name": "ইছাপুরা",
            "schools": []
          },
          {
            "name": "কেয়াইন",
            "schools": []
          },
          {
            "name": "কোলা",
            "schools": []
          },
          {
            "name": "চিত্রকোট",
            "schools": []
          },
          {
            "name": "জৈনসার",
            "schools": []
          },
          {
            "name": "বয়রাগাদি",
            "schools": []
          },
          {
            "name": "বালুচর",
            "schools": []
          },
          {
            "name": "বাসাইল",
            "schools": []
          },
          {
            "name": "মধ্যপাড়া",
            "schools": []
          },
          {
            "name": "মালখানগর",
            "schools": []
          },
          {
            "name": "রশুনিয়া",
            "schools": []
          },
          {
            "name": "রাজানগর",
            "schools": []
          },
          {
            "name": "লতাব্দী",
            "schools": []
          },
          {
            "name": "শেখরনগার",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "মেহেরপুর",
    "upazilas": [
      {
        "name": "গাংনী",
        "unions": [
          {
            "name": "কাজিপুর",
            "schools": []
          },
          {
            "name": "কাথুলী",
            "schools": []
          },
          {
            "name": "তেঁতুলবাড়ীয়া",
            "schools": []
          },
          {
            "name": "ধানখোলা",
            "schools": []
          },
          {
            "name": "বামন্দী",
            "schools": []
          },
          {
            "name": "মটমুড়া",
            "schools": []
          },
          {
            "name": "রায়পুর",
            "schools": []
          },
          {
            "name": "ষোলটাকা",
            "schools": []
          },
          {
            "name": "সাহারবাটী",
            "schools": []
          }
        ]
      },
      {
        "name": "মুজিবনগর",
        "unions": [
          {
            "name": "দারিয়াপুর",
            "schools": []
          },
          {
            "name": "বাগোয়ান",
            "schools": []
          },
          {
            "name": "মহাজনপুর",
            "schools": []
          },
          {
            "name": "মোনাখালী",
            "schools": []
          }
        ]
      },
      {
        "name": "মেহেরপুর সদর",
        "unions": [
          {
            "name": "আমঝুপি",
            "schools": []
          },
          {
            "name": "আমদহ",
            "schools": []
          },
          {
            "name": "কতুবপুর",
            "schools": []
          },
          {
            "name": "পিরোজপুর",
            "schools": []
          },
          {
            "name": "বুড়িপোতা",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "মৌলভীবাজার",
    "upazilas": [
      {
        "name": "কমলগঞ্জ",
        "unions": [
          {
            "name": "আদমপুর",
            "schools": []
          },
          {
            "name": "আলী নগর",
            "schools": []
          },
          {
            "name": "ইসলামপুর",
            "schools": []
          },
          {
            "name": "কমলগঞ্জ",
            "schools": []
          },
          {
            "name": "পতনঊষার",
            "schools": []
          },
          {
            "name": "মাধবপুর",
            "schools": []
          },
          {
            "name": "মুন্সিবাজার",
            "schools": []
          },
          {
            "name": "রহিমপুর",
            "schools": []
          },
          {
            "name": "শমশেরনগর",
            "schools": []
          }
        ]
      },
      {
        "name": "কুলাউড়া",
        "unions": [
          {
            "name": "কর্মধা",
            "schools": []
          },
          {
            "name": "কাদিপুর",
            "schools": []
          },
          {
            "name": "কুলাউড়া",
            "schools": []
          },
          {
            "name": "জয়চন্ডি",
            "schools": []
          },
          {
            "name": "টিলাগাঁও",
            "schools": []
          },
          {
            "name": "পৃথিমপাশা",
            "schools": []
          },
          {
            "name": "বরমচাল",
            "schools": []
          },
          {
            "name": "ব্রাহ্মণবাজার",
            "schools": []
          },
          {
            "name": "ভাটেরা",
            "schools": []
          },
          {
            "name": "ভূকশিমইল",
            "schools": []
          },
          {
            "name": "রাউৎগাঁও",
            "schools": []
          },
          {
            "name": "শরীফপুর",
            "schools": []
          },
          {
            "name": "হাজীপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "জুড়ী",
        "unions": [
          {
            "name": "গোয়ালবাড়ী",
            "schools": []
          },
          {
            "name": "জায়ফরনগর",
            "schools": []
          },
          {
            "name": "পশ্চিম জুড়ী",
            "schools": []
          },
          {
            "name": "পুর্ব জুড়ী",
            "schools": []
          },
          {
            "name": "ফুলতলা",
            "schools": []
          },
          {
            "name": "সাগরনাল",
            "schools": []
          }
        ]
      },
      {
        "name": "বড়লেখা",
        "unions": [
          {
            "name": "উত্তর শাহবাজপুর",
            "schools": []
          },
          {
            "name": "তালিমপুর",
            "schools": []
          },
          {
            "name": "তালিমপুর",
            "schools": []
          },
          {
            "name": "দক্ষিণ শাহবাজপুর",
            "schools": []
          },
          {
            "name": "দক্ষিণভাগ (উত্তর)",
            "schools": []
          },
          {
            "name": "দক্ষিণভাগ (দক্ষিণ)",
            "schools": []
          },
          {
            "name": "দাসেরবাজার",
            "schools": []
          },
          {
            "name": "নিজবাহাদুরপুর",
            "schools": []
          },
          {
            "name": "বড়লেখা",
            "schools": []
          },
          {
            "name": "বর্ণি",
            "schools": []
          },
          {
            "name": "সুজানগর",
            "schools": []
          }
        ]
      },
      {
        "name": "মৌলভীবাজার সদর",
        "unions": [
          {
            "name": "আখাইলকুড়া",
            "schools": []
          },
          {
            "name": "আপার কাগাবলা",
            "schools": []
          },
          {
            "name": "আমতৈল",
            "schools": []
          },
          {
            "name": "একাটুনা",
            "schools": []
          },
          {
            "name": "কনকপুর",
            "schools": []
          },
          {
            "name": "কামালপুর",
            "schools": []
          },
          {
            "name": "খলিলপুর",
            "schools": []
          },
          {
            "name": "গিয়াসনগর",
            "schools": []
          },
          {
            "name": "চাঁদনীঘাট",
            "schools": []
          },
          {
            "name": "নাজিরাবাদ",
            "schools": []
          },
          {
            "name": "মনুমুখ",
            "schools": []
          },
          {
            "name": "মোস্তফাপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "রাজনগর",
        "unions": [
          {
            "name": "উত্তরভাগ",
            "schools": []
          },
          {
            "name": "কামারচাক",
            "schools": []
          },
          {
            "name": "টেংরা",
            "schools": []
          },
          {
            "name": "পাঁচগাঁও",
            "schools": []
          },
          {
            "name": "ফতেপুর",
            "schools": []
          },
          {
            "name": "মনসুরনগর",
            "schools": []
          },
          {
            "name": "মুন্সিবাজার",
            "schools": []
          },
          {
            "name": "রাজনগর",
            "schools": []
          }
        ]
      },
      {
        "name": "শ্রীমঙ্গল",
        "unions": [
          {
            "name": "আশিদ্রোন",
            "schools": []
          },
          {
            "name": "কালাপুর",
            "schools": []
          },
          {
            "name": "কালীঘাট",
            "schools": []
          },
          {
            "name": "ভূনবীর",
            "schools": []
          },
          {
            "name": "মির্জাপুর",
            "schools": []
          },
          {
            "name": "রাজঘাট",
            "schools": []
          },
          {
            "name": "শ্রীমঙ্গল",
            "schools": []
          },
          {
            "name": "সাতগাঁও",
            "schools": []
          },
          {
            "name": "সিন্দুরখান",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "যশোর",
    "upazilas": [
      {
        "name": "অভয়নগর",
        "unions": [
          {
            "name": "চলিশিয়া",
            "schools": []
          },
          {
            "name": "পায়রা",
            "schools": []
          },
          {
            "name": "প্রেমবাগ",
            "schools": []
          },
          {
            "name": "বাঘুটিয়া",
            "schools": []
          },
          {
            "name": "শুভরাড়া",
            "schools": []
          },
          {
            "name": "শ্রীধরপুর",
            "schools": []
          },
          {
            "name": "সিদ্দিপাশা",
            "schools": []
          },
          {
            "name": "সুন্দলী",
            "schools": []
          }
        ]
      },
      {
        "name": "কেশবপুর",
        "unions": [
          {
            "name": "কেশবপুর",
            "schools": []
          },
          {
            "name": "গৌরিঘোনা",
            "schools": []
          },
          {
            "name": "ত্রিমোহিনী",
            "schools": []
          },
          {
            "name": "পাজিয়া",
            "schools": []
          },
          {
            "name": "বিদ্যানন্দকাটি",
            "schools": []
          },
          {
            "name": "মঙ্গলকোর্ট",
            "schools": []
          },
          {
            "name": "মজিদপুর",
            "schools": []
          },
          {
            "name": "সাগরদাড়ী",
            "schools": []
          },
          {
            "name": "সুফলাকাটি",
            "schools": []
          }
        ]
      },
      {
        "name": "চৌগাছা",
        "unions": [
          {
            "name": "চৌগাছা",
            "schools": []
          },
          {
            "name": "জগদীশপুর",
            "schools": []
          },
          {
            "name": "ধুলিয়ানী",
            "schools": []
          },
          {
            "name": "নারায়নপুর",
            "schools": []
          },
          {
            "name": "পাতিবিলা",
            "schools": []
          },
          {
            "name": "পাশাপোল",
            "schools": []
          },
          {
            "name": "ফুলসারা",
            "schools": []
          },
          {
            "name": "সরুপদাহ",
            "schools": []
          },
          {
            "name": "সিংহঝুলি",
            "schools": []
          },
          {
            "name": "সুখপুকুরিয়া",
            "schools": []
          },
          {
            "name": "হাকিমপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "ঝিকরগাছা",
        "unions": [
          {
            "name": "গংগানন্দপুর",
            "schools": []
          },
          {
            "name": "গদখালী",
            "schools": []
          },
          {
            "name": "ঝিকরগাছা",
            "schools": []
          },
          {
            "name": "নাভারন",
            "schools": []
          },
          {
            "name": "নির্বাসখোলা",
            "schools": []
          },
          {
            "name": "পানিসারা",
            "schools": []
          },
          {
            "name": "বাঁকড়া",
            "schools": []
          },
          {
            "name": "মাগুরা",
            "schools": []
          },
          {
            "name": "শংকরপুর",
            "schools": []
          },
          {
            "name": "শিমুলিয়া",
            "schools": []
          },
          {
            "name": "হাজিরবাগ",
            "schools": []
          }
        ]
      },
      {
        "name": "বাঘারপাড়া",
        "unions": [
          {
            "name": "জহুরপুর",
            "schools": []
          },
          {
            "name": "জামদিয়া",
            "schools": []
          },
          {
            "name": "দরাজহাট",
            "schools": []
          },
          {
            "name": "দোহাকুলা",
            "schools": []
          },
          {
            "name": "ধলগ্রাম",
            "schools": []
          },
          {
            "name": "নারিকেলবাড়ীয়া",
            "schools": []
          },
          {
            "name": "বন্দবিলা",
            "schools": []
          },
          {
            "name": "বাসুয়াড়ী",
            "schools": []
          },
          {
            "name": "রায়পুর",
            "schools": []
          }
        ]
      },
      {
        "name": "মণিরামপুর",
        "unions": [
          {
            "name": "কাশিমনগর",
            "schools": []
          },
          {
            "name": "কুলটিয়া",
            "schools": []
          },
          {
            "name": "খানপুর",
            "schools": []
          },
          {
            "name": "খেদাপাড়া",
            "schools": []
          },
          {
            "name": "চালুয়াহাটি",
            "schools": []
          },
          {
            "name": "ঝাঁপা",
            "schools": []
          },
          {
            "name": "ঢাকুরিয়া",
            "schools": []
          },
          {
            "name": "দুর্বাডাংগা",
            "schools": []
          },
          {
            "name": "নেহালপুর",
            "schools": []
          },
          {
            "name": "ভোজগাতি",
            "schools": []
          },
          {
            "name": "মনিরামপুর",
            "schools": []
          },
          {
            "name": "মনোহরপুর",
            "schools": []
          },
          {
            "name": "মশ্মিমনগর",
            "schools": []
          },
          {
            "name": "রোহিতা",
            "schools": []
          },
          {
            "name": "শ্যামকুড়",
            "schools": []
          },
          {
            "name": "হরিদাসকাটি",
            "schools": []
          },
          {
            "name": "হরিহরনগর",
            "schools": []
          }
        ]
      },
      {
        "name": "যশোর সদর",
        "unions": [
          {
            "name": "আরবপুর",
            "schools": []
          },
          {
            "name": "ইছালী",
            "schools": []
          },
          {
            "name": "উপশহর",
            "schools": []
          },
          {
            "name": "কচুয়া",
            "schools": []
          },
          {
            "name": "কাশিমপুর",
            "schools": []
          },
          {
            "name": "চাঁচড়া",
            "schools": []
          },
          {
            "name": "চূড়ামনকাটি",
            "schools": []
          },
          {
            "name": "দেয়ারা মডেল",
            "schools": []
          },
          {
            "name": "নওয়াপাড়া",
            "schools": []
          },
          {
            "name": "নরেন্দ্রপুর",
            "schools": []
          },
          {
            "name": "ফতেপুর",
            "schools": []
          },
          {
            "name": "বসুন্দিয়া",
            "schools": []
          },
          {
            "name": "রামনগর",
            "schools": []
          },
          {
            "name": "লেবুতলা",
            "schools": []
          },
          {
            "name": "হৈবতপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "শার্শা",
        "unions": [
          {
            "name": "উলশী",
            "schools": []
          },
          {
            "name": "কায়বা",
            "schools": []
          },
          {
            "name": "গোগা",
            "schools": []
          },
          {
            "name": "ডিহি",
            "schools": []
          },
          {
            "name": "নিজামপুর",
            "schools": []
          },
          {
            "name": "পুটখালী",
            "schools": []
          },
          {
            "name": "বাগআচড়া",
            "schools": []
          },
          {
            "name": "বাহাদুরপুর",
            "schools": []
          },
          {
            "name": "বেনাপোল",
            "schools": []
          },
          {
            "name": "লক্ষণপুর",
            "schools": []
          },
          {
            "name": "শার্শা",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "রংপুর",
    "upazilas": [
      {
        "name": "কাউনিয়া",
        "unions": [
          {
            "name": "কুর্শা",
            "schools": []
          },
          {
            "name": "টেপামধুপুর",
            "schools": []
          },
          {
            "name": "বালাপাড়া",
            "schools": []
          },
          {
            "name": "শহীদবাগ",
            "schools": []
          },
          {
            "name": "সারাই",
            "schools": []
          },
          {
            "name": "হারাগাছ",
            "schools": []
          }
        ]
      },
      {
        "name": "গংগাচড়া",
        "unions": [
          {
            "name": "আলমবিদিতর",
            "schools": []
          },
          {
            "name": "কোলকোন্দ",
            "schools": []
          },
          {
            "name": "খলেয়া",
            "schools": []
          },
          {
            "name": "গংগাচড়া",
            "schools": []
          },
          {
            "name": "গজঘন্টা",
            "schools": []
          },
          {
            "name": "নোহালী",
            "schools": []
          },
          {
            "name": "বড়বিল",
            "schools": []
          },
          {
            "name": "বেতগাড়ী",
            "schools": []
          },
          {
            "name": "মর্ণেয়া",
            "schools": []
          },
          {
            "name": "লক্ষীটারী",
            "schools": []
          }
        ]
      },
      {
        "name": "তারাগঞ্জ",
        "unions": [
          {
            "name": "আলমপুর",
            "schools": []
          },
          {
            "name": "ইকরচালী",
            "schools": []
          },
          {
            "name": "কুর্শা",
            "schools": []
          },
          {
            "name": "সয়ার",
            "schools": []
          },
          {
            "name": "হাড়িয়ারকুঠি",
            "schools": []
          }
        ]
      },
      {
        "name": "পীরগঞ্জ",
        "unions": [
          {
            "name": "কাবিলপুর",
            "schools": []
          },
          {
            "name": "কুমেদপুর",
            "schools": []
          },
          {
            "name": "চতরা",
            "schools": []
          },
          {
            "name": "চৈত্রকোল",
            "schools": []
          },
          {
            "name": "টুকুরিয়া",
            "schools": []
          },
          {
            "name": "পাঁচগাছী",
            "schools": []
          },
          {
            "name": "পীরগঞ্জ",
            "schools": []
          },
          {
            "name": "বড় আলমপুর",
            "schools": []
          },
          {
            "name": "বড়দরগাহ",
            "schools": []
          },
          {
            "name": "ভেন্ডাবাড়ী",
            "schools": []
          },
          {
            "name": "মদনখালী",
            "schools": []
          },
          {
            "name": "মিঠিপুর",
            "schools": []
          },
          {
            "name": "রামনাথপুর",
            "schools": []
          },
          {
            "name": "রায়পুর",
            "schools": []
          },
          {
            "name": "শানেরহাট",
            "schools": []
          }
        ]
      },
      {
        "name": "পীরগাছা",
        "unions": [
          {
            "name": "অন্নদানগর",
            "schools": []
          },
          {
            "name": "ইটাকুমারী",
            "schools": []
          },
          {
            "name": "কল্যাণী",
            "schools": []
          },
          {
            "name": "কান্দি",
            "schools": []
          },
          {
            "name": "কৈকুড়ী",
            "schools": []
          },
          {
            "name": "ছাওলা",
            "schools": []
          },
          {
            "name": "তাম্বুলপুর",
            "schools": []
          },
          {
            "name": "পারুল",
            "schools": []
          },
          {
            "name": "পীরগাছা",
            "schools": []
          }
        ]
      },
      {
        "name": "বদরগঞ্জ",
        "unions": [
          {
            "name": "কালুপাড়া",
            "schools": []
          },
          {
            "name": "কুতুবপুর",
            "schools": []
          },
          {
            "name": "গোপালপুর",
            "schools": []
          },
          {
            "name": "গোপীনাথপুর",
            "schools": []
          },
          {
            "name": "দামোদরপুর",
            "schools": []
          },
          {
            "name": "বিষ্ণপুর",
            "schools": []
          },
          {
            "name": "মধুপুর",
            "schools": []
          },
          {
            "name": "রাধানগর",
            "schools": []
          },
          {
            "name": "রামনাথপুর",
            "schools": []
          },
          {
            "name": "লোহানীপাড়া",
            "schools": []
          }
        ]
      },
      {
        "name": "মিঠাপুকুর",
        "unions": [
          {
            "name": "ইমাদপুর",
            "schools": []
          },
          {
            "name": "কাফ্রিখাল",
            "schools": []
          },
          {
            "name": "খোরাগাছ",
            "schools": []
          },
          {
            "name": "গোপালপুর",
            "schools": []
          },
          {
            "name": "চেংমারী",
            "schools": []
          },
          {
            "name": "দূর্গাপুর",
            "schools": []
          },
          {
            "name": "পায়রাবন্দ",
            "schools": []
          },
          {
            "name": "বড় হযরতপুর",
            "schools": []
          },
          {
            "name": "বড়বালা",
            "schools": []
          },
          {
            "name": "বালারহাট",
            "schools": []
          },
          {
            "name": "বালুয়া মাসিমপুর",
            "schools": []
          },
          {
            "name": "ভাংনী",
            "schools": []
          },
          {
            "name": "ময়েনপুর",
            "schools": []
          },
          {
            "name": "মির্জাপুর",
            "schools": []
          },
          {
            "name": "মিলনপুর",
            "schools": []
          },
          {
            "name": "রাণীপুকুর",
            "schools": []
          },
          {
            "name": "লতিবপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "রংপুর সদর",
        "unions": [
          {
            "name": "উত্তম",
            "schools": []
          },
          {
            "name": "চন্দনপাট",
            "schools": []
          },
          {
            "name": "তপোধন",
            "schools": []
          },
          {
            "name": "তামপাট",
            "schools": []
          },
          {
            "name": "দর্শানা",
            "schools": []
          },
          {
            "name": "পরশুরাম",
            "schools": []
          },
          {
            "name": "মমিনপুর",
            "schools": []
          },
          {
            "name": "রাজেন্দ্রপুর",
            "schools": []
          },
          {
            "name": "সদ্যপুস্করনী",
            "schools": []
          },
          {
            "name": "সাতগারা",
            "schools": []
          },
          {
            "name": "হরিদেবপুর",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "রাঙ্গামাটি",
    "upazilas": [
      {
        "name": "কাউখালী",
        "unions": [
          {
            "name": "কলমপতি",
            "schools": []
          },
          {
            "name": "ঘাগড়া",
            "schools": []
          },
          {
            "name": "ফটিকছড়ি",
            "schools": []
          },
          {
            "name": "বেতবুনিয়া",
            "schools": []
          }
        ]
      },
      {
        "name": "কাপ্তাই",
        "unions": [
          {
            "name": "ওয়াজ্ঞা",
            "schools": []
          },
          {
            "name": "কাপ্তাই",
            "schools": []
          },
          {
            "name": "চন্দ্রঘোনা",
            "schools": []
          },
          {
            "name": "চিৎমরম",
            "schools": []
          },
          {
            "name": "রাইখালী",
            "schools": []
          }
        ]
      },
      {
        "name": "জুরাছড়ি",
        "unions": [
          {
            "name": "জুরাছড়ি",
            "schools": []
          },
          {
            "name": "দুমদুম্যা",
            "schools": []
          },
          {
            "name": "বনযোগীছড়া",
            "schools": []
          },
          {
            "name": "মৈদং",
            "schools": []
          }
        ]
      },
      {
        "name": "নানিয়ারচর",
        "unions": [
          {
            "name": "ঘিলাছড়ি",
            "schools": []
          },
          {
            "name": "নানিয়ারচর",
            "schools": []
          },
          {
            "name": "বুড়িঘাট",
            "schools": []
          },
          {
            "name": "সাবেক্ষ্যং",
            "schools": []
          }
        ]
      },
      {
        "name": "বরকল",
        "unions": [
          {
            "name": "আইমাছড়া",
            "schools": []
          },
          {
            "name": "বড় হরিণা",
            "schools": []
          },
          {
            "name": "বরকল",
            "schools": []
          },
          {
            "name": "ভূষনছড়া",
            "schools": []
          },
          {
            "name": "সুবলং",
            "schools": []
          }
        ]
      },
      {
        "name": "বাঘাইছড়ি",
        "unions": [
          {
            "name": "আমতলী",
            "schools": []
          },
          {
            "name": "খেদারমারা",
            "schools": []
          },
          {
            "name": "বঙ্গলতলী",
            "schools": []
          },
          {
            "name": "বাঘাইছড়ি",
            "schools": []
          },
          {
            "name": "মারিশ্যা",
            "schools": []
          },
          {
            "name": "রুপকারী",
            "schools": []
          },
          {
            "name": "সাজেক",
            "schools": []
          },
          {
            "name": "সারোয়াতলী",
            "schools": []
          }
        ]
      },
      {
        "name": "বিলাইছড়ি",
        "unions": [
          {
            "name": "কেংড়াছড়ি",
            "schools": []
          },
          {
            "name": "ফারুয়া",
            "schools": []
          },
          {
            "name": "বিলাইছড়ি",
            "schools": []
          }
        ]
      },
      {
        "name": "রাঙ্গামাটি সদর",
        "unions": [
          {
            "name": "কুতুকছড়ি",
            "schools": []
          },
          {
            "name": "জীবতলি",
            "schools": []
          },
          {
            "name": "বন্দুকভাঙ্গা",
            "schools": []
          },
          {
            "name": "বালুখালী",
            "schools": []
          },
          {
            "name": "মগবান",
            "schools": []
          },
          {
            "name": "সাপছড়ি",
            "schools": []
          }
        ]
      },
      {
        "name": "রাজস্থলী",
        "unions": [
          {
            "name": "গাইন্দ্যা",
            "schools": []
          },
          {
            "name": "ঘিলাছড়ি",
            "schools": []
          },
          {
            "name": "বাঙ্গালহালিয়া",
            "schools": []
          }
        ]
      },
      {
        "name": "লংগদু",
        "unions": [
          {
            "name": "আটারকছড়া",
            "schools": []
          },
          {
            "name": "কালাপাকুজ্যা",
            "schools": []
          },
          {
            "name": "গুলশাখালী",
            "schools": []
          },
          {
            "name": "বগাচতর",
            "schools": []
          },
          {
            "name": "ভাসান্যাদম",
            "schools": []
          },
          {
            "name": "মাইনীমুখ",
            "schools": []
          },
          {
            "name": "লংগদু",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "রাজবাড়ী",
    "upazilas": [
      {
        "name": "কালুখালী",
        "unions": [
          {
            "name": "কালিকাপুর",
            "schools": []
          },
          {
            "name": "কালুখালী",
            "schools": []
          },
          {
            "name": "বোয়ালিয়া",
            "schools": []
          },
          {
            "name": "মদাপুর",
            "schools": []
          },
          {
            "name": "মাজবাড়ী",
            "schools": []
          },
          {
            "name": "মৃগী",
            "schools": []
          },
          {
            "name": "রতনদিয়া",
            "schools": []
          },
          {
            "name": "সাওরাইল",
            "schools": []
          }
        ]
      },
      {
        "name": "গোয়ালন্দ",
        "unions": [
          {
            "name": "উজানচর",
            "schools": []
          },
          {
            "name": "ছোটভাকলা",
            "schools": []
          },
          {
            "name": "দেবগ্রাম",
            "schools": []
          },
          {
            "name": "দৌলতদিয়া",
            "schools": []
          }
        ]
      },
      {
        "name": "পাংশা",
        "unions": [
          {
            "name": "কলিমহর",
            "schools": []
          },
          {
            "name": "কসবামাজাইল",
            "schools": []
          },
          {
            "name": "পাট্টা",
            "schools": []
          },
          {
            "name": "বাবুপাড়া",
            "schools": []
          },
          {
            "name": "বাহাদুরপুর",
            "schools": []
          },
          {
            "name": "মাছপাড়া",
            "schools": []
          },
          {
            "name": "মৌরাট",
            "schools": []
          },
          {
            "name": "যশাই",
            "schools": []
          },
          {
            "name": "সরিষা",
            "schools": []
          },
          {
            "name": "হাবাসপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "বালিয়াকান্দি",
        "unions": [
          {
            "name": "ইসলামপুর",
            "schools": []
          },
          {
            "name": "জঙ্গল",
            "schools": []
          },
          {
            "name": "জামালপুর",
            "schools": []
          },
          {
            "name": "নবাবপুর",
            "schools": []
          },
          {
            "name": "নারুয়া",
            "schools": []
          },
          {
            "name": "বহরপুর",
            "schools": []
          },
          {
            "name": "বালিয়াকান্দি",
            "schools": []
          }
        ]
      },
      {
        "name": "রাজবাড়ী সদর",
        "unions": [
          {
            "name": "আলীপুর",
            "schools": []
          },
          {
            "name": "খানখানাপুর",
            "schools": []
          },
          {
            "name": "খানগঞ্জ",
            "schools": []
          },
          {
            "name": "চন্দনী",
            "schools": []
          },
          {
            "name": "দাদশী",
            "schools": []
          },
          {
            "name": "পাঁচুরিয়া",
            "schools": []
          },
          {
            "name": "বরাট",
            "schools": []
          },
          {
            "name": "বসন্তপুর",
            "schools": []
          },
          {
            "name": "বানীবহ",
            "schools": []
          },
          {
            "name": "মিজানপুর",
            "schools": []
          },
          {
            "name": "মুলঘর",
            "schools": []
          },
          {
            "name": "রামকান্তপুর",
            "schools": []
          },
          {
            "name": "শহীদওহাবপুর",
            "schools": []
          },
          {
            "name": "সুলতানপুর",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "রাজশাহী",
    "upazilas": [
      {
        "name": "গোদাগাড়ী",
        "unions": [
          {
            "name": "আষাড়িয়াদহ",
            "schools": []
          },
          {
            "name": "গোগ্রাম",
            "schools": []
          },
          {
            "name": "গোদাগাড়ী",
            "schools": []
          },
          {
            "name": "দেওপাড়া",
            "schools": []
          },
          {
            "name": "পাকড়ী",
            "schools": []
          },
          {
            "name": "বাসুদেবপুর",
            "schools": []
          },
          {
            "name": "মাটিকাটা",
            "schools": []
          },
          {
            "name": "মোহনপুর",
            "schools": []
          },
          {
            "name": "রিশিকুল",
            "schools": []
          }
        ]
      },
      {
        "name": "চারঘাট",
        "unions": [
          {
            "name": "ইউসুফপুর",
            "schools": []
          },
          {
            "name": "চারঘাট",
            "schools": []
          },
          {
            "name": "নিমপাড়া",
            "schools": []
          },
          {
            "name": "ভায়ালক্ষ্মীপুর",
            "schools": []
          },
          {
            "name": "শলুয়া",
            "schools": []
          },
          {
            "name": "সরদহ",
            "schools": []
          }
        ]
      },
      {
        "name": "তানোর",
        "unions": [
          {
            "name": "কলমা",
            "schools": []
          },
          {
            "name": "কামারগাঁ",
            "schools": []
          },
          {
            "name": "চান্দুড়িয়া",
            "schools": []
          },
          {
            "name": "তালন্দ",
            "schools": []
          },
          {
            "name": "পাঁচন্দর",
            "schools": []
          },
          {
            "name": "বাধাইড়",
            "schools": []
          },
          {
            "name": "সরঞ্জাই",
            "schools": []
          }
        ]
      },
      {
        "name": "দুর্গাপুর",
        "unions": [
          {
            "name": "কিসমতগণকৈড়",
            "schools": []
          },
          {
            "name": "জয়নগর",
            "schools": []
          },
          {
            "name": "ঝালুকা",
            "schools": []
          },
          {
            "name": "দেলুয়াবাড়ী",
            "schools": []
          },
          {
            "name": "নওপাড়া",
            "schools": []
          },
          {
            "name": "পানানগর",
            "schools": []
          },
          {
            "name": "মাড়িয়া",
            "schools": []
          }
        ]
      },
      {
        "name": "পবা",
        "unions": [
          {
            "name": "দর্শনপাড়া",
            "schools": []
          },
          {
            "name": "দামকুড়া",
            "schools": []
          },
          {
            "name": "পারিলা",
            "schools": []
          },
          {
            "name": "বড়্গাছি",
            "schools": []
          },
          {
            "name": "হড়গ্রাম",
            "schools": []
          },
          {
            "name": "হরিপুর",
            "schools": []
          },
          {
            "name": "হরিয়ান",
            "schools": []
          },
          {
            "name": "হুজুরী পাড়া",
            "schools": []
          }
        ]
      },
      {
        "name": "পুঠিয়া",
        "unions": [
          {
            "name": "জিউপাড়া",
            "schools": []
          },
          {
            "name": "পুঠিয়া",
            "schools": []
          },
          {
            "name": "বানেশ্বর",
            "schools": []
          },
          {
            "name": "বেলপুকুরিয়া",
            "schools": []
          },
          {
            "name": "ভালুক গাছি",
            "schools": []
          },
          {
            "name": "শিলমাড়িয়া",
            "schools": []
          }
        ]
      },
      {
        "name": "বাগমারা",
        "unions": [
          {
            "name": "আউচপাড়া",
            "schools": []
          },
          {
            "name": "কাচাড়ী কোয়লিপাড়া",
            "schools": []
          },
          {
            "name": "গণিপুর",
            "schools": []
          },
          {
            "name": "গোবিন্দপাড়া",
            "schools": []
          },
          {
            "name": "গোয়ালকান্দি",
            "schools": []
          },
          {
            "name": "ঝিকড়া",
            "schools": []
          },
          {
            "name": "দ্বীপপুর",
            "schools": []
          },
          {
            "name": "নরদাস",
            "schools": []
          },
          {
            "name": "বড়বিহানলী",
            "schools": []
          },
          {
            "name": "বাসুপাড়া",
            "schools": []
          },
          {
            "name": "মাড়িয়া",
            "schools": []
          },
          {
            "name": "যোগিপাড়া",
            "schools": []
          },
          {
            "name": "শুভডাঙ্গা",
            "schools": []
          },
          {
            "name": "শ্রীপুর",
            "schools": []
          },
          {
            "name": "সোনাডাঙ্গা",
            "schools": []
          },
          {
            "name": "হামিরকুৎসা",
            "schools": []
          }
        ]
      },
      {
        "name": "বাঘা",
        "unions": [
          {
            "name": "আড়ানী",
            "schools": []
          },
          {
            "name": "গড়গড়ি",
            "schools": []
          },
          {
            "name": "পাকুড়িয়া",
            "schools": []
          },
          {
            "name": "বাউসা",
            "schools": []
          },
          {
            "name": "বাজুবাঘা",
            "schools": []
          },
          {
            "name": "মনিগ্রাম",
            "schools": []
          }
        ]
      },
      {
        "name": "মোহনপুর",
        "unions": [
          {
            "name": "ঘষিগ্রাম",
            "schools": []
          },
          {
            "name": "জাহানাবাদ",
            "schools": []
          },
          {
            "name": "ধুরইল",
            "schools": []
          },
          {
            "name": "বাকশিমইল",
            "schools": []
          },
          {
            "name": "মৌগাছি",
            "schools": []
          },
          {
            "name": "রায়ঘাটি",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "লক্ষ্মীপুর",
    "upazilas": [
      {
        "name": "কমলনগর",
        "unions": [
          {
            "name": "চর কাদিরা",
            "schools": []
          },
          {
            "name": "চর কালকিনি",
            "schools": []
          },
          {
            "name": "চর ফলকন",
            "schools": []
          },
          {
            "name": "চর মার্টিন",
            "schools": []
          },
          {
            "name": "চর লরেঞ্চ",
            "schools": []
          },
          {
            "name": "তোরাবগঞ্জ",
            "schools": []
          },
          {
            "name": "পাটারীরহাট",
            "schools": []
          },
          {
            "name": "সাহেবেরহাট",
            "schools": []
          },
          {
            "name": "হাজিরহাট",
            "schools": []
          }
        ]
      },
      {
        "name": "রামগঞ্জ",
        "unions": [
          {
            "name": "ইছাপুর",
            "schools": []
          },
          {
            "name": "করপাড়া",
            "schools": []
          },
          {
            "name": "কাঞ্চনপুর",
            "schools": []
          },
          {
            "name": "চন্ডিপুর",
            "schools": []
          },
          {
            "name": "দরবেশপুর",
            "schools": []
          },
          {
            "name": "নোয়াগাঁও",
            "schools": []
          },
          {
            "name": "ভাটরা",
            "schools": []
          },
          {
            "name": "ভাদুর",
            "schools": []
          },
          {
            "name": "ভোলাকোট",
            "schools": []
          },
          {
            "name": "লামচর",
            "schools": []
          }
        ]
      },
      {
        "name": "রামগতি",
        "unions": [
          {
            "name": "আলেকজান্ডার",
            "schools": []
          },
          {
            "name": "চর আবদুল্যাহ",
            "schools": []
          },
          {
            "name": "চর আলগী",
            "schools": []
          },
          {
            "name": "চর পোড়াগাছা",
            "schools": []
          },
          {
            "name": "চর বাদাম",
            "schools": []
          },
          {
            "name": "চর রমিজ",
            "schools": []
          },
          {
            "name": "চরগাজী",
            "schools": []
          },
          {
            "name": "বড়খেড়ী",
            "schools": []
          }
        ]
      },
      {
        "name": "রায়পুর",
        "unions": [
          {
            "name": "উত্তর চর আবাবিল",
            "schools": []
          },
          {
            "name": "উত্তর চর বংশী",
            "schools": []
          },
          {
            "name": "কেরোয়া",
            "schools": []
          },
          {
            "name": "চর পাতা",
            "schools": []
          },
          {
            "name": "চর মোহনা",
            "schools": []
          },
          {
            "name": "দক্ষিন চর আবাবিল",
            "schools": []
          },
          {
            "name": "দক্ষিন চর বংশী",
            "schools": []
          },
          {
            "name": "বামনী",
            "schools": []
          },
          {
            "name": "রায়পুর",
            "schools": []
          },
          {
            "name": "সোনাপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "লক্ষ্মীপুর সদর",
        "unions": [
          {
            "name": "উত্তর জয়পুর",
            "schools": []
          },
          {
            "name": "কুশাখালী",
            "schools": []
          },
          {
            "name": "চন্দ্রগঞ্জ",
            "schools": []
          },
          {
            "name": "চররমনী মোহন",
            "schools": []
          },
          {
            "name": "চররুহিতা",
            "schools": []
          },
          {
            "name": "চরশাহী",
            "schools": []
          },
          {
            "name": "টুমচর",
            "schools": []
          },
          {
            "name": "তেয়ারীগঞ্জ",
            "schools": []
          },
          {
            "name": "দত্তপাড়া",
            "schools": []
          },
          {
            "name": "দালাল বাজার",
            "schools": []
          },
          {
            "name": "দিঘলী",
            "schools": []
          },
          {
            "name": "পার্বতীনগর",
            "schools": []
          },
          {
            "name": "বশিকপুর",
            "schools": []
          },
          {
            "name": "বাঙ্গাখাঁ",
            "schools": []
          },
          {
            "name": "ভবানীগঞ্জ",
            "schools": []
          },
          {
            "name": "লাহারকান্দি",
            "schools": []
          },
          {
            "name": "শাকচর",
            "schools": []
          },
          {
            "name": "হাজিরপাড়া",
            "schools": []
          },
          {
            "name": "হামছাদী (উত্তর)",
            "schools": []
          },
          {
            "name": "হামছাদী (দক্ষিন)",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "লালমনিরহাট",
    "upazilas": [
      {
        "name": "আদিতমারী",
        "unions": [
          {
            "name": "কমলাবাড়ী",
            "schools": []
          },
          {
            "name": "দূর্গাপুর",
            "schools": []
          },
          {
            "name": "পলাশী",
            "schools": []
          },
          {
            "name": "ভাদাই",
            "schools": []
          },
          {
            "name": "ভেলাবাড়ী",
            "schools": []
          },
          {
            "name": "মহিষখোচা",
            "schools": []
          },
          {
            "name": "সাপ্টিবাড়ী",
            "schools": []
          },
          {
            "name": "সারপুকুর",
            "schools": []
          }
        ]
      },
      {
        "name": "কালীগঞ্জ",
        "unions": [
          {
            "name": "কাকিনা",
            "schools": []
          },
          {
            "name": "গোড়ল",
            "schools": []
          },
          {
            "name": "চন্দ্রপুর",
            "schools": []
          },
          {
            "name": "চলবলা",
            "schools": []
          },
          {
            "name": "তুষভান্ডার",
            "schools": []
          },
          {
            "name": "দলগ্রাম",
            "schools": []
          },
          {
            "name": "ভোটমারী",
            "schools": []
          },
          {
            "name": "মদাতী",
            "schools": []
          }
        ]
      },
      {
        "name": "পাটগ্রাম",
        "unions": [
          {
            "name": "কুচলিবাড়ী",
            "schools": []
          },
          {
            "name": "জগতবেড়",
            "schools": []
          },
          {
            "name": "জোংড়া",
            "schools": []
          },
          {
            "name": "দহগ্রাম",
            "schools": []
          },
          {
            "name": "পাটগ্রাম",
            "schools": []
          },
          {
            "name": "বাউড়া",
            "schools": []
          },
          {
            "name": "বুড়িমারী",
            "schools": []
          },
          {
            "name": "শ্রীরামপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "লালমনিরহাট সদর",
        "unions": [
          {
            "name": "কুলাঘাট",
            "schools": []
          },
          {
            "name": "খুনিয়াগাছ",
            "schools": []
          },
          {
            "name": "গোকুন্ডা",
            "schools": []
          },
          {
            "name": "পঞ্চগ্রাম",
            "schools": []
          },
          {
            "name": "বড়বাড়ী",
            "schools": []
          },
          {
            "name": "মহেন্দ্রনগর",
            "schools": []
          },
          {
            "name": "মোগলহাট",
            "schools": []
          },
          {
            "name": "রাজপুর",
            "schools": []
          },
          {
            "name": "হারাটি",
            "schools": []
          }
        ]
      },
      {
        "name": "হাতীবান্ধা",
        "unions": [
          {
            "name": "গড্ডিমারী",
            "schools": []
          },
          {
            "name": "গোতামারী",
            "schools": []
          },
          {
            "name": "টংভাঙ্গা",
            "schools": []
          },
          {
            "name": "ডাউয়াবাড়ী",
            "schools": []
          },
          {
            "name": "নওদাবাস",
            "schools": []
          },
          {
            "name": "পাটিকাপাড়া",
            "schools": []
          },
          {
            "name": "ফকিরপাড়া",
            "schools": []
          },
          {
            "name": "বড়খাতা",
            "schools": []
          },
          {
            "name": "ভেলাগুড়ি",
            "schools": []
          },
          {
            "name": "সানিয়াজান",
            "schools": []
          },
          {
            "name": "সিংগীমারী",
            "schools": []
          },
          {
            "name": "সিন্দুর্ণা",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "শরীয়তপুর",
    "upazilas": [
      {
        "name": "গোসাইরহাট",
        "unions": [
          {
            "name": "আলাওলপুর",
            "schools": []
          },
          {
            "name": "ইদিলপুর",
            "schools": []
          },
          {
            "name": "কুচাইপট্টি",
            "schools": []
          },
          {
            "name": "কোদালপুর",
            "schools": []
          },
          {
            "name": "গোসাইরহাট",
            "schools": []
          },
          {
            "name": "নলমুড়ি",
            "schools": []
          },
          {
            "name": "নাগের পাড়া",
            "schools": []
          },
          {
            "name": "সামন্তসার",
            "schools": []
          }
        ]
      },
      {
        "name": "জাজিরা",
        "unions": [
          {
            "name": "কুন্ডেরচর",
            "schools": []
          },
          {
            "name": "জয়নগর",
            "schools": []
          },
          {
            "name": "জাজিরা সদর",
            "schools": []
          },
          {
            "name": "নাওডোবা",
            "schools": []
          },
          {
            "name": "পালেরচর",
            "schools": []
          },
          {
            "name": "পুর্ব নাওডোবা",
            "schools": []
          },
          {
            "name": "বড়কান্দি",
            "schools": []
          },
          {
            "name": "বড়গোপালপুর",
            "schools": []
          },
          {
            "name": "বি. কে. নগর",
            "schools": []
          },
          {
            "name": "বিলাসপুর",
            "schools": []
          },
          {
            "name": "মূলনা",
            "schools": []
          },
          {
            "name": "সেনেরচর",
            "schools": []
          }
        ]
      },
      {
        "name": "ডামুড্যা",
        "unions": [
          {
            "name": "ইসলামপুর",
            "schools": []
          },
          {
            "name": "কনেস্বর",
            "schools": []
          },
          {
            "name": "দারুল আমান",
            "schools": []
          },
          {
            "name": "ধানকাটি",
            "schools": []
          },
          {
            "name": "পুর্ব ডামুড্যা",
            "schools": []
          },
          {
            "name": "শিধলকুড়া",
            "schools": []
          },
          {
            "name": "সিড্যা",
            "schools": []
          }
        ]
      },
      {
        "name": "নড়িয়া",
        "unions": [
          {
            "name": "কেদারপুর",
            "schools": []
          },
          {
            "name": "ঘড়িষার",
            "schools": []
          },
          {
            "name": "চরআত্রা",
            "schools": []
          },
          {
            "name": "জপসা",
            "schools": []
          },
          {
            "name": "ডিংগামানিক",
            "schools": []
          },
          {
            "name": "নওপাড়া",
            "schools": []
          },
          {
            "name": "নশাসন",
            "schools": []
          },
          {
            "name": "ফতেজংপুর",
            "schools": []
          },
          {
            "name": "বিঝারি",
            "schools": []
          },
          {
            "name": "ভূমখাড়া",
            "schools": []
          },
          {
            "name": "ভোজেশ্বর",
            "schools": []
          },
          {
            "name": "মোত্তারেরচর",
            "schools": []
          },
          {
            "name": "রাজনগর",
            "schools": []
          }
        ]
      },
      {
        "name": "ভেদরগঞ্জ",
        "unions": [
          {
            "name": "আরশিনগর",
            "schools": []
          },
          {
            "name": "উত্তর তারাবুনিয়া",
            "schools": []
          },
          {
            "name": "কাচিকাঁটা",
            "schools": []
          },
          {
            "name": "চরকুমারিয়া",
            "schools": []
          },
          {
            "name": "চরভাগা",
            "schools": []
          },
          {
            "name": "চরসেনসাস",
            "schools": []
          },
          {
            "name": "ছয়গাঁও",
            "schools": []
          },
          {
            "name": "ডি.এম খালি",
            "schools": []
          },
          {
            "name": "দক্ষিন তারাবুনিয়া",
            "schools": []
          },
          {
            "name": "নারায়নপুর",
            "schools": []
          },
          {
            "name": "মহিষার",
            "schools": []
          },
          {
            "name": "রামভদ্রপুর",
            "schools": []
          },
          {
            "name": "সখিপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "শরিয়তপুর সদর",
        "unions": [
          {
            "name": "আংগারিয়া",
            "schools": []
          },
          {
            "name": "চন্দ্রপুর",
            "schools": []
          },
          {
            "name": "চিকন্দি",
            "schools": []
          },
          {
            "name": "চিতলয়া",
            "schools": []
          },
          {
            "name": "ডোমসার",
            "schools": []
          },
          {
            "name": "তুলাসার",
            "schools": []
          },
          {
            "name": "পালং",
            "schools": []
          },
          {
            "name": "বিনোদপুর",
            "schools": []
          },
          {
            "name": "মাহমুদপুর",
            "schools": []
          },
          {
            "name": "রুদ্রকর",
            "schools": []
          },
          {
            "name": "শৌলপাড়া",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "শেরপুর",
    "upazilas": [
      {
        "name": "ঝিনাইগাতী",
        "unions": [
          {
            "name": "কাংশা",
            "schools": []
          },
          {
            "name": "গৌরিপুর",
            "schools": []
          },
          {
            "name": "ঝিনাইগাতী",
            "schools": []
          },
          {
            "name": "ধানশাইল",
            "schools": []
          },
          {
            "name": "নলকুড়া",
            "schools": []
          },
          {
            "name": "মালিঝিকান্দা",
            "schools": []
          },
          {
            "name": "হাতিবান্দা",
            "schools": []
          }
        ]
      },
      {
        "name": "নকলা",
        "unions": [
          {
            "name": "উরফা",
            "schools": []
          },
          {
            "name": "গণপদ্দী",
            "schools": []
          },
          {
            "name": "গৌড়দ্বার",
            "schools": []
          },
          {
            "name": "চন্দ্রকোনা",
            "schools": []
          },
          {
            "name": "চরঅষ্টধর",
            "schools": []
          },
          {
            "name": "টালকী",
            "schools": []
          },
          {
            "name": "নকলা",
            "schools": []
          },
          {
            "name": "পাঠাকাটা",
            "schools": []
          },
          {
            "name": "বানেশ্বর্দী",
            "schools": []
          }
        ]
      },
      {
        "name": "নালিতাবাড়ী",
        "unions": [
          {
            "name": "কলসপাড়",
            "schools": []
          },
          {
            "name": "কাকরকান্দি",
            "schools": []
          },
          {
            "name": "নন্নী",
            "schools": []
          },
          {
            "name": "নয়াবীল",
            "schools": []
          },
          {
            "name": "নালিতাবাড়ী",
            "schools": []
          },
          {
            "name": "পোড়াগাও",
            "schools": []
          },
          {
            "name": "বাঘবেড়",
            "schools": []
          },
          {
            "name": "মরিচপুরাণ",
            "schools": []
          },
          {
            "name": "যোগনীয়া",
            "schools": []
          },
          {
            "name": "রাজনগর",
            "schools": []
          },
          {
            "name": "রামচন্দ্রকুড়া",
            "schools": []
          },
          {
            "name": "রূপনারায়নকুড়া",
            "schools": []
          }
        ]
      },
      {
        "name": "শেরপুর সদর",
        "unions": [
          {
            "name": "কামারিয়া",
            "schools": []
          },
          {
            "name": "কামারের চর",
            "schools": []
          },
          {
            "name": "গাজির খামার",
            "schools": []
          },
          {
            "name": "চর পক্ষীমারি",
            "schools": []
          },
          {
            "name": "চর মোচারিয়া",
            "schools": []
          },
          {
            "name": "চরশেরপুর",
            "schools": []
          },
          {
            "name": "ধলা",
            "schools": []
          },
          {
            "name": "পাকুরিয়া",
            "schools": []
          },
          {
            "name": "বলাইরচর",
            "schools": []
          },
          {
            "name": "বাজিতখিলা",
            "schools": []
          },
          {
            "name": "বেতমারি ঘুঘুরাকান্দি",
            "schools": []
          },
          {
            "name": "ভাতশালা",
            "schools": []
          },
          {
            "name": "রৌহা",
            "schools": []
          },
          {
            "name": "লছমনপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "শ্রীবরদী",
        "unions": [
          {
            "name": "কাকিলাকুড়া",
            "schools": []
          },
          {
            "name": "কুড়িকাহনিয়া",
            "schools": []
          },
          {
            "name": "খড়িয়া কাজিরচর",
            "schools": []
          },
          {
            "name": "গড়জরিপা",
            "schools": []
          },
          {
            "name": "গোশাইপুর",
            "schools": []
          },
          {
            "name": "তাতীহাটি",
            "schools": []
          },
          {
            "name": "ভেলুয়া",
            "schools": []
          },
          {
            "name": "রানীশিমুল",
            "schools": []
          },
          {
            "name": "শ্রীবরদী",
            "schools": []
          },
          {
            "name": "সিংগাবরুনা",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "সাতক্ষীরা",
    "upazilas": [
      {
        "name": "আশাশুনি",
        "unions": [
          {
            "name": "আনুলিয়া",
            "schools": []
          },
          {
            "name": "আশাশুনি",
            "schools": []
          },
          {
            "name": "কাদাকাটি",
            "schools": []
          },
          {
            "name": "কুল্যা",
            "schools": []
          },
          {
            "name": "খাজরা",
            "schools": []
          },
          {
            "name": "দরগাহপুর",
            "schools": []
          },
          {
            "name": "প্রতাপনগর",
            "schools": []
          },
          {
            "name": "বড়দল",
            "schools": []
          },
          {
            "name": "বুধহাটা",
            "schools": []
          },
          {
            "name": "শোভনালী",
            "schools": []
          },
          {
            "name": "শ্রীউলা",
            "schools": []
          }
        ]
      },
      {
        "name": "কলারোয়া",
        "unions": [
          {
            "name": "কয়লা",
            "schools": []
          },
          {
            "name": "কুশোডাংগা",
            "schools": []
          },
          {
            "name": "কেঁড়াগাছি",
            "schools": []
          },
          {
            "name": "কেরালকাতা",
            "schools": []
          },
          {
            "name": "চন্দনপুর",
            "schools": []
          },
          {
            "name": "জয়নগর",
            "schools": []
          },
          {
            "name": "জালালাবাদ",
            "schools": []
          },
          {
            "name": "দেয়ারা",
            "schools": []
          },
          {
            "name": "যুগিখালী",
            "schools": []
          },
          {
            "name": "লাঙ্গলঝাড়া",
            "schools": []
          },
          {
            "name": "সোনাবাড়িয়া",
            "schools": []
          },
          {
            "name": "হেলাতলা",
            "schools": []
          }
        ]
      },
      {
        "name": "কালিগঞ্জ",
        "unions": [
          {
            "name": "কুশুলিয়া",
            "schools": []
          },
          {
            "name": "কৃষ্ণনগর",
            "schools": []
          },
          {
            "name": "চাম্পাফুল",
            "schools": []
          },
          {
            "name": "তারালী",
            "schools": []
          },
          {
            "name": "দক্ষিণ শ্রীপুর",
            "schools": []
          },
          {
            "name": "ধলবাড়িয়া",
            "schools": []
          },
          {
            "name": "নলতা",
            "schools": []
          },
          {
            "name": "বিষ্ণুপুর",
            "schools": []
          },
          {
            "name": "ভাড়াশিমলা",
            "schools": []
          },
          {
            "name": "মথুরেশপুর",
            "schools": []
          },
          {
            "name": "মৌতলা",
            "schools": []
          },
          {
            "name": "রতনপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "তালা",
        "unions": [
          {
            "name": "ইসলামকাটি",
            "schools": []
          },
          {
            "name": "কুমিরা",
            "schools": []
          },
          {
            "name": "খলিলনগর",
            "schools": []
          },
          {
            "name": "খলিশখালী",
            "schools": []
          },
          {
            "name": "খেশরা",
            "schools": []
          },
          {
            "name": "জালালপুর",
            "schools": []
          },
          {
            "name": "তালা",
            "schools": []
          },
          {
            "name": "তেতুলিয়া",
            "schools": []
          },
          {
            "name": "ধানদিয়া",
            "schools": []
          },
          {
            "name": "নগরঘাটা",
            "schools": []
          },
          {
            "name": "মাগুরা",
            "schools": []
          },
          {
            "name": "সরুলিয়া",
            "schools": []
          }
        ]
      },
      {
        "name": "দেবহাটা",
        "unions": [
          {
            "name": "কুলিয়া",
            "schools": []
          },
          {
            "name": "দেবহাটা",
            "schools": []
          },
          {
            "name": "নওয়াপাড়া",
            "schools": []
          },
          {
            "name": "পারুলিয়া",
            "schools": []
          },
          {
            "name": "সখিপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "শ্যামনগর",
        "unions": [
          {
            "name": "আটুলিয়া",
            "schools": []
          },
          {
            "name": "ঈশ্বরীপুর",
            "schools": []
          },
          {
            "name": "কাশিমাড়ী",
            "schools": []
          },
          {
            "name": "কৈখালী",
            "schools": []
          },
          {
            "name": "গাবুরা",
            "schools": []
          },
          {
            "name": "নুরনগর",
            "schools": []
          },
          {
            "name": "পদ্মপুকুর",
            "schools": []
          },
          {
            "name": "বুড়িগোয়ালিনী",
            "schools": []
          },
          {
            "name": "ভুরুলিয়া",
            "schools": []
          },
          {
            "name": "মুন্সীগজ্ঞ",
            "schools": []
          },
          {
            "name": "রমজাননগর",
            "schools": []
          },
          {
            "name": "শ্যামনগর",
            "schools": []
          }
        ]
      },
      {
        "name": "সাতক্ষীরা সদর",
        "unions": [
          {
            "name": "আগরদাড়ী",
            "schools": []
          },
          {
            "name": "আলিপুর",
            "schools": []
          },
          {
            "name": "কুশখালী",
            "schools": []
          },
          {
            "name": "ঘোনা",
            "schools": []
          },
          {
            "name": "ঝাউডাঙ্গা",
            "schools": []
          },
          {
            "name": "ধুলিহর",
            "schools": []
          },
          {
            "name": "ফিংড়ি",
            "schools": []
          },
          {
            "name": "বল্লী",
            "schools": []
          },
          {
            "name": "বাঁশদহ",
            "schools": []
          },
          {
            "name": "বৈকারী",
            "schools": []
          },
          {
            "name": "ব্রক্ষ্মরাজপুর",
            "schools": []
          },
          {
            "name": "ভোমরা",
            "schools": []
          },
          {
            "name": "লাবসা",
            "schools": []
          },
          {
            "name": "শিবপুর",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "সিরাজগঞ্জ",
    "upazilas": [
      {
        "name": "উল্লাপাড়া",
        "unions": [
          {
            "name": "উধুনিয়া",
            "schools": []
          },
          {
            "name": "উল্লাপাড়া সদর",
            "schools": []
          },
          {
            "name": "দুর্গা নগর",
            "schools": []
          },
          {
            "name": "পঞ্চক্রোশী",
            "schools": []
          },
          {
            "name": "পূর্ণিমাগাতী",
            "schools": []
          },
          {
            "name": "বড়পাঙ্গাসী",
            "schools": []
          },
          {
            "name": "বড়হর",
            "schools": []
          },
          {
            "name": "বাঙ্গালা",
            "schools": []
          },
          {
            "name": "মোহনপুর",
            "schools": []
          },
          {
            "name": "রামকৃষ্ণপুর",
            "schools": []
          },
          {
            "name": "সলঙ্গা",
            "schools": []
          },
          {
            "name": "সলপ",
            "schools": []
          },
          {
            "name": "হটিকুমরুল",
            "schools": []
          }
        ]
      },
      {
        "name": "কাজীপুর",
        "unions": [
          {
            "name": "কাজিপুর সদর",
            "schools": []
          },
          {
            "name": "খাসরাজবাড়ী",
            "schools": []
          },
          {
            "name": "গান্ধাইল",
            "schools": []
          },
          {
            "name": "চরগিরিশ",
            "schools": []
          },
          {
            "name": "চালিতাডাঙ্গা",
            "schools": []
          },
          {
            "name": "তেকানী",
            "schools": []
          },
          {
            "name": "নাটুয়ারপাড়া",
            "schools": []
          },
          {
            "name": "নিশ্চিন্তপুর",
            "schools": []
          },
          {
            "name": "মনসুর নগর",
            "schools": []
          },
          {
            "name": "মাইজবাড়ী",
            "schools": []
          },
          {
            "name": "শুভগাছা",
            "schools": []
          },
          {
            "name": "সোনামুখী",
            "schools": []
          }
        ]
      },
      {
        "name": "কামারখন্দ",
        "unions": [
          {
            "name": "জামতৈল",
            "schools": []
          },
          {
            "name": "ঝাঐল",
            "schools": []
          },
          {
            "name": "ভদ্রঘাট",
            "schools": []
          },
          {
            "name": "রায়দৌলতপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "চৌহালি",
        "unions": [
          {
            "name": "উমারপুর",
            "schools": []
          },
          {
            "name": "খাসকাউলিয়া",
            "schools": []
          },
          {
            "name": "খাসপুকুরিয়া",
            "schools": []
          },
          {
            "name": "ঘোরজান",
            "schools": []
          },
          {
            "name": "বাঘুটিয়া",
            "schools": []
          },
          {
            "name": "সদিয়া চাঁদপুর",
            "schools": []
          },
          {
            "name": "স্থল",
            "schools": []
          }
        ]
      },
      {
        "name": "তাড়াশ",
        "unions": [
          {
            "name": "তাড়াশ সদর",
            "schools": []
          },
          {
            "name": "তালম",
            "schools": []
          },
          {
            "name": "দেশীগ্রাম",
            "schools": []
          },
          {
            "name": "নওগাঁ",
            "schools": []
          },
          {
            "name": "বারুহাস",
            "schools": []
          },
          {
            "name": "মাগুড়া বিনোদ",
            "schools": []
          },
          {
            "name": "মাধাইনগর",
            "schools": []
          },
          {
            "name": "সগুনা",
            "schools": []
          }
        ]
      },
      {
        "name": "বেলকুচি",
        "unions": [
          {
            "name": "দৌলতপুর",
            "schools": []
          },
          {
            "name": "ধুকুরিয়া বেড়া",
            "schools": []
          },
          {
            "name": "বড়ধুল",
            "schools": []
          },
          {
            "name": "বেলকুচি সদর",
            "schools": []
          },
          {
            "name": "ভাঙ্গাবাড়ী",
            "schools": []
          },
          {
            "name": "রাজাপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "রায়গঞ্জ",
        "unions": [
          {
            "name": "ঘুড়কা",
            "schools": []
          },
          {
            "name": "চান্দাইকোনা",
            "schools": []
          },
          {
            "name": "ধানগড়া",
            "schools": []
          },
          {
            "name": "ধামাইনগর",
            "schools": []
          },
          {
            "name": "ধুবিল",
            "schools": []
          },
          {
            "name": "নলকা",
            "schools": []
          },
          {
            "name": "পাঙ্গাসী",
            "schools": []
          },
          {
            "name": "ব্রহ্মগাছা",
            "schools": []
          },
          {
            "name": "সোনাখাড়া",
            "schools": []
          }
        ]
      },
      {
        "name": "শাহজাদপুর",
        "unions": [
          {
            "name": "কায়েমপুর",
            "schools": []
          },
          {
            "name": "কৈজুরী",
            "schools": []
          },
          {
            "name": "খুকনী",
            "schools": []
          },
          {
            "name": "গাড়াদহ",
            "schools": []
          },
          {
            "name": "গালা",
            "schools": []
          },
          {
            "name": "জালালপুর",
            "schools": []
          },
          {
            "name": "নরিনা",
            "schools": []
          },
          {
            "name": "পোতাজিয়া",
            "schools": []
          },
          {
            "name": "পোরজনা",
            "schools": []
          },
          {
            "name": "বেলতৈল",
            "schools": []
          },
          {
            "name": "রূপবাটি",
            "schools": []
          },
          {
            "name": "সোনাতনী",
            "schools": []
          },
          {
            "name": "হাবিবুল্লাহ নগর",
            "schools": []
          }
        ]
      },
      {
        "name": "সিরাজগঞ্জ সদর",
        "unions": [
          {
            "name": "কাওয়াখোলা",
            "schools": []
          },
          {
            "name": "কালিয়াহরিপুর",
            "schools": []
          },
          {
            "name": "খোকশাবাড়ী",
            "schools": []
          },
          {
            "name": "ছোনগাছা",
            "schools": []
          },
          {
            "name": "বহুলী",
            "schools": []
          },
          {
            "name": "বাগবাটি",
            "schools": []
          },
          {
            "name": "মেছড়া",
            "schools": []
          },
          {
            "name": "রতনকান্দি",
            "schools": []
          },
          {
            "name": "শিয়ালকোল",
            "schools": []
          },
          {
            "name": "সয়দাবাদ",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "সিলেট",
    "upazilas": [
      {
        "name": "ওসমানী নগর",
        "unions": [
          {
            "name": "উমরপুর",
            "schools": []
          },
          {
            "name": "উসমানপুর",
            "schools": []
          },
          {
            "name": "গোয়ালাবাজার",
            "schools": []
          },
          {
            "name": "তাজপুর",
            "schools": []
          },
          {
            "name": "দয়ামীর",
            "schools": []
          },
          {
            "name": "পশ্চিম পৈলনপুর",
            "schools": []
          },
          {
            "name": "বুরুঙ্গাবাজার",
            "schools": []
          },
          {
            "name": "সাদিরপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "কানাইঘাট",
        "unions": [
          {
            "name": "কানাইঘাট",
            "schools": []
          },
          {
            "name": "ঝিঙ্গাবাড়ী",
            "schools": []
          },
          {
            "name": "দক্ষিন বানিগ্রাম",
            "schools": []
          },
          {
            "name": "দিঘিরপার পূর্ব",
            "schools": []
          },
          {
            "name": "বড়চতুল",
            "schools": []
          },
          {
            "name": "রাজাগঞ্জ",
            "schools": []
          },
          {
            "name": "লক্ষীপ্রাসাদ পশ্চিম",
            "schools": []
          },
          {
            "name": "লক্ষীপ্রাসাদ পূর্ব",
            "schools": []
          },
          {
            "name": "সাতবাক",
            "schools": []
          }
        ]
      },
      {
        "name": "কোম্পানীগঞ্জ",
        "unions": [
          {
            "name": "ইসলামপুর পশ্চিম",
            "schools": []
          },
          {
            "name": "ইসলামপুর পূর্ব",
            "schools": []
          },
          {
            "name": "ইসাকলস",
            "schools": []
          },
          {
            "name": "উত্তর রনিখাই",
            "schools": []
          },
          {
            "name": "তেলিখাল",
            "schools": []
          },
          {
            "name": "দক্ষিন রনিখাই",
            "schools": []
          }
        ]
      },
      {
        "name": "গোয়াইনঘাট",
        "unions": [
          {
            "name": "আলীরগাঁও",
            "schools": []
          },
          {
            "name": "ডৌবাড়ী",
            "schools": []
          },
          {
            "name": "তোয়াকুল",
            "schools": []
          },
          {
            "name": "নন্দিরগাঁও",
            "schools": []
          },
          {
            "name": "পশ্চিম জাফলং",
            "schools": []
          },
          {
            "name": "পূর্ব জাফলং",
            "schools": []
          },
          {
            "name": "ফতেপুর",
            "schools": []
          },
          {
            "name": "রুস্তমপুর",
            "schools": []
          },
          {
            "name": "লেঙ্গুড়া",
            "schools": []
          }
        ]
      },
      {
        "name": "গোলাপগঞ্জ",
        "unions": [
          {
            "name": "উত্তর বাদেপাশা",
            "schools": []
          },
          {
            "name": "গোলাপগঞ্জ",
            "schools": []
          },
          {
            "name": "ঢাকাদক্ষিন",
            "schools": []
          },
          {
            "name": "পশ্চিম আমুরা",
            "schools": []
          },
          {
            "name": "ফুলবাড়ী",
            "schools": []
          },
          {
            "name": "বুধবারীবাজার",
            "schools": []
          },
          {
            "name": "ভাদেশ্বর",
            "schools": []
          },
          {
            "name": "লক্ষনাবন্দ",
            "schools": []
          },
          {
            "name": "লক্ষ্মীপাশা",
            "schools": []
          },
          {
            "name": "শরিফগঞ্জ",
            "schools": []
          }
        ]
      },
      {
        "name": "জকিগঞ্জ",
        "unions": [
          {
            "name": "কলাছড়া",
            "schools": []
          },
          {
            "name": "কসকনকপুর",
            "schools": []
          },
          {
            "name": "কাজলশার",
            "schools": []
          },
          {
            "name": "জকিগঞ্জ",
            "schools": []
          },
          {
            "name": "বারঠাকুরী",
            "schools": []
          },
          {
            "name": "বারহাল",
            "schools": []
          },
          {
            "name": "বিরশ্রী",
            "schools": []
          },
          {
            "name": "মানিকপুর",
            "schools": []
          },
          {
            "name": "সুলতানপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "জৈন্তাপুর",
        "unions": [
          {
            "name": "চারিকাটা",
            "schools": []
          },
          {
            "name": "চিকনাগুল",
            "schools": []
          },
          {
            "name": "জৈন্তাপুর",
            "schools": []
          },
          {
            "name": "দরবস্ত",
            "schools": []
          },
          {
            "name": "নিজপাট",
            "schools": []
          },
          {
            "name": "ফতেপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "দক্ষিণ সুরমা",
        "unions": [
          {
            "name": "কামালবাজার",
            "schools": []
          },
          {
            "name": "কুচাই",
            "schools": []
          },
          {
            "name": "জালালপুর",
            "schools": []
          },
          {
            "name": "তেতলী",
            "schools": []
          },
          {
            "name": "দাউদপুর",
            "schools": []
          },
          {
            "name": "বড়ইকান্দি",
            "schools": []
          },
          {
            "name": "মোগলাবাজার",
            "schools": []
          },
          {
            "name": "মোল্লারগাঁও",
            "schools": []
          },
          {
            "name": "লালাবাজার",
            "schools": []
          },
          {
            "name": "সিলাম",
            "schools": []
          }
        ]
      },
      {
        "name": "ফেঞ্চুগঞ্জ",
        "unions": [
          {
            "name": "উত্তর কুশিয়ারা",
            "schools": []
          },
          {
            "name": "উত্তর ফেঞ্চুগঞ্জ",
            "schools": []
          },
          {
            "name": "ঘিলাছড়া",
            "schools": []
          },
          {
            "name": "ফেঞ্চুগঞ্জ",
            "schools": []
          },
          {
            "name": "মাইজগাঁও",
            "schools": []
          }
        ]
      },
      {
        "name": "বালাগঞ্জ",
        "unions": [
          {
            "name": "দেওয়ান বাজার",
            "schools": []
          },
          {
            "name": "পশ্চিম গৌরীপুর",
            "schools": []
          },
          {
            "name": "পূর্ব গৌরীপুর",
            "schools": []
          },
          {
            "name": "পূর্ব পৈলনপুর",
            "schools": []
          },
          {
            "name": "বালাগঞ্জ",
            "schools": []
          },
          {
            "name": "বোয়ালজুর",
            "schools": []
          }
        ]
      },
      {
        "name": "বিয়ানীবাজার",
        "unions": [
          {
            "name": "আলীনগর",
            "schools": []
          },
          {
            "name": "কুড়ারবাজার",
            "schools": []
          },
          {
            "name": "চরখাই",
            "schools": []
          },
          {
            "name": "তিলপাড়া",
            "schools": []
          },
          {
            "name": "দুবাগ",
            "schools": []
          },
          {
            "name": "মাথিউরা",
            "schools": []
          },
          {
            "name": "মুড়িয়া",
            "schools": []
          },
          {
            "name": "মোল্লাপুর",
            "schools": []
          },
          {
            "name": "লাউতা",
            "schools": []
          },
          {
            "name": "শেওলা",
            "schools": []
          }
        ]
      },
      {
        "name": "বিশ্বনাথ",
        "unions": [
          {
            "name": "অলংকারী",
            "schools": []
          },
          {
            "name": "খাজাঞ্চী",
            "schools": []
          },
          {
            "name": "দশঘর",
            "schools": []
          },
          {
            "name": "দেওকলস",
            "schools": []
          },
          {
            "name": "দৌলতপুর",
            "schools": []
          },
          {
            "name": "বিশ্বনাথ",
            "schools": []
          },
          {
            "name": "রামপাশা",
            "schools": []
          },
          {
            "name": "লামাকাজী",
            "schools": []
          }
        ]
      },
      {
        "name": "সিলেট সদর",
        "unions": [
          {
            "name": "কান্দিগাও",
            "schools": []
          },
          {
            "name": "খাদিমনগর",
            "schools": []
          },
          {
            "name": "খাদিমপাড়া",
            "schools": []
          },
          {
            "name": "জালালাবাদ",
            "schools": []
          },
          {
            "name": "টুকেরবাজার",
            "schools": []
          },
          {
            "name": "টুলটিকর",
            "schools": []
          },
          {
            "name": "মোগলগাও",
            "schools": []
          },
          {
            "name": "হাটখোলা",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "সুনামগঞ্জ",
    "upazilas": [
      {
        "name": "ছাতক",
        "unions": [
          {
            "name": "ইসলামপুর",
            "schools": []
          },
          {
            "name": "কালারুকা",
            "schools": []
          },
          {
            "name": "খুরমা উত্তর",
            "schools": []
          },
          {
            "name": "খুরমা দক্ষিণ",
            "schools": []
          },
          {
            "name": "গোবিন্দগঞ্জ-সৈদেরগাঁও",
            "schools": []
          },
          {
            "name": "চরমহল্লা",
            "schools": []
          },
          {
            "name": "ছাতক সদর",
            "schools": []
          },
          {
            "name": "ছৈলা আফজলাবাদ",
            "schools": []
          },
          {
            "name": "জাউয়া বাজার",
            "schools": []
          },
          {
            "name": "দোলারবাজার",
            "schools": []
          },
          {
            "name": "নোয়ারাই",
            "schools": []
          },
          {
            "name": "ভাতগাঁও",
            "schools": []
          },
          {
            "name": "সিংচাপইড়",
            "schools": []
          }
        ]
      },
      {
        "name": "জগন্নাথপুর",
        "unions": [
          {
            "name": "আশারকান্দি",
            "schools": []
          },
          {
            "name": "কলকলিয়া",
            "schools": []
          },
          {
            "name": "চিলাউড়া হলদিপুর",
            "schools": []
          },
          {
            "name": "পাইলগাঁও",
            "schools": []
          },
          {
            "name": "পাটলী",
            "schools": []
          },
          {
            "name": "মীরপুর",
            "schools": []
          },
          {
            "name": "রানীগঞ্জ",
            "schools": []
          },
          {
            "name": "সৈয়দপুর শাহাড়পাড়া",
            "schools": []
          }
        ]
      },
      {
        "name": "জামালগঞ্জ",
        "unions": [
          {
            "name": "জামালগঞ্জ সদর",
            "schools": []
          },
          {
            "name": "ফেনারবাক",
            "schools": []
          },
          {
            "name": "বেহেলী",
            "schools": []
          },
          {
            "name": "ভীমখালী",
            "schools": []
          },
          {
            "name": "সাচনাবাজার",
            "schools": []
          }
        ]
      },
      {
        "name": "তাহিরপুর",
        "unions": [
          {
            "name": "তাহিরপুর সদর",
            "schools": []
          },
          {
            "name": "বড়দল উত্তর",
            "schools": []
          },
          {
            "name": "বড়দল দক্ষিণ",
            "schools": []
          },
          {
            "name": "বাদাঘাট",
            "schools": []
          },
          {
            "name": "বালিজুরী",
            "schools": []
          },
          {
            "name": "শ্রীপুর উত্তর",
            "schools": []
          },
          {
            "name": "শ্রীপুর দক্ষিণ",
            "schools": []
          }
        ]
      },
      {
        "name": "দিরাই",
        "unions": [
          {
            "name": "করিমপুর",
            "schools": []
          },
          {
            "name": "কুলঞ্জ",
            "schools": []
          },
          {
            "name": "চরনারচর",
            "schools": []
          },
          {
            "name": "জগদল",
            "schools": []
          },
          {
            "name": "তাড়ল",
            "schools": []
          },
          {
            "name": "দিরাই সরমঙ্গল",
            "schools": []
          },
          {
            "name": "ভাটিপাড়া",
            "schools": []
          },
          {
            "name": "রফিনগর",
            "schools": []
          },
          {
            "name": "রাজানগর",
            "schools": []
          }
        ]
      },
      {
        "name": "দোয়ারাবাজার",
        "unions": [
          {
            "name": "দোয়ারাবাজার",
            "schools": []
          },
          {
            "name": "দোহালিয়া",
            "schools": []
          },
          {
            "name": "নরসিংহপুর",
            "schools": []
          },
          {
            "name": "পান্ডারগাঁও",
            "schools": []
          },
          {
            "name": "বাংলাবাজার",
            "schools": []
          },
          {
            "name": "বোগলাবাজার",
            "schools": []
          },
          {
            "name": "মান্নারগাঁও",
            "schools": []
          },
          {
            "name": "লক্ষীপুর",
            "schools": []
          },
          {
            "name": "সুরমা",
            "schools": []
          }
        ]
      },
      {
        "name": "ধর্মপাশা",
        "unions": [
          {
            "name": "চামরদানী",
            "schools": []
          },
          {
            "name": "জয়শ্রী",
            "schools": []
          },
          {
            "name": "ধর্মপাশা সদর",
            "schools": []
          },
          {
            "name": "পাইকুরাটী",
            "schools": []
          },
          {
            "name": "বংশীকুন্ডা উত্তর",
            "schools": []
          },
          {
            "name": "বংশীকুন্ডা দক্ষিণ",
            "schools": []
          },
          {
            "name": "মধ্যনগর",
            "schools": []
          },
          {
            "name": "সুখাইড় রাজাপুর উত্তর",
            "schools": []
          },
          {
            "name": "সুখাইড় রাজাপুর দক্ষিণ",
            "schools": []
          },
          {
            "name": "সেলবরষ",
            "schools": []
          }
        ]
      },
      {
        "name": "বিশ্বম্ভরপুর",
        "unions": [
          {
            "name": "ধনপুর",
            "schools": []
          },
          {
            "name": "পলাশ",
            "schools": []
          },
          {
            "name": "ফতেপুর",
            "schools": []
          },
          {
            "name": "বাদাঘাট দক্ষিণ",
            "schools": []
          },
          {
            "name": "সলুকাবাদ",
            "schools": []
          }
        ]
      },
      {
        "name": "মধ্যনগর",
        "unions": []
      },
      {
        "name": "শান্তিগঞ্জ",
        "unions": [
          {
            "name": "জয়কলস",
            "schools": []
          },
          {
            "name": "দরগাপাশা",
            "schools": []
          },
          {
            "name": "পশ্চিম পাগলা",
            "schools": []
          },
          {
            "name": "পশ্চিম বীরগাঁও",
            "schools": []
          },
          {
            "name": "পাথারিয়া",
            "schools": []
          },
          {
            "name": "পূর্ব পাগলা",
            "schools": []
          },
          {
            "name": "পূর্ব বীরগাঁও",
            "schools": []
          },
          {
            "name": "শিমুলবাক",
            "schools": []
          }
        ]
      },
      {
        "name": "শাল্লা",
        "unions": [
          {
            "name": "আটগাঁও",
            "schools": []
          },
          {
            "name": "বাহারা",
            "schools": []
          },
          {
            "name": "শাল্লা সদর",
            "schools": []
          },
          {
            "name": "হবিবপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "সুনামগঞ্জ সদর",
        "unions": [
          {
            "name": "আপ্তাবনগর",
            "schools": []
          },
          {
            "name": "কাঠইর",
            "schools": []
          },
          {
            "name": "গৌরারং",
            "schools": []
          },
          {
            "name": "জাহাঙ্গীরনগর",
            "schools": []
          },
          {
            "name": "মোল্লাপাড়া",
            "schools": []
          },
          {
            "name": "মোহনপুর",
            "schools": []
          },
          {
            "name": "রংগারচর",
            "schools": []
          },
          {
            "name": "লক্ষণশ্রী",
            "schools": []
          },
          {
            "name": "সুরমা",
            "schools": []
          }
        ]
      }
    ]
  },
  {
    "district": "হবিগঞ্জ",
    "upazilas": [
      {
        "name": "আজমিরীগঞ্জ",
        "unions": [
          {
            "name": "আজমিরীগঞ্জ সদর",
            "schools": []
          },
          {
            "name": "কাকাইলছেও",
            "schools": []
          },
          {
            "name": "জলসুখা",
            "schools": []
          },
          {
            "name": "বদলপুর",
            "schools": []
          },
          {
            "name": "শিবপাশা",
            "schools": []
          }
        ]
      },
      {
        "name": "চুনারুঘাট",
        "unions": [
          {
            "name": "আহম্মদাবাদ",
            "schools": []
          },
          {
            "name": "উবাহাটা",
            "schools": []
          },
          {
            "name": "গাজীপুর",
            "schools": []
          },
          {
            "name": "চুনারুঘাট",
            "schools": []
          },
          {
            "name": "দেওরগাছ",
            "schools": []
          },
          {
            "name": "পাইকপাড়া",
            "schools": []
          },
          {
            "name": "মিরাশী",
            "schools": []
          },
          {
            "name": "রাণীগাঁও",
            "schools": []
          },
          {
            "name": "শানখলা",
            "schools": []
          },
          {
            "name": "সাটিয়াজুরী",
            "schools": []
          }
        ]
      },
      {
        "name": "নবীগঞ্জ",
        "unions": [
          {
            "name": "আউশকান্দি",
            "schools": []
          },
          {
            "name": "ইনাতগঞ্জ",
            "schools": []
          },
          {
            "name": "করগাঁও",
            "schools": []
          },
          {
            "name": "কালিয়ারভাংগা",
            "schools": []
          },
          {
            "name": "কুর্শি",
            "schools": []
          },
          {
            "name": "গজনাইপুর",
            "schools": []
          },
          {
            "name": "দীঘলবাক",
            "schools": []
          },
          {
            "name": "দেবপাড়া",
            "schools": []
          },
          {
            "name": "নবীগঞ্জ সদর",
            "schools": []
          },
          {
            "name": "পানিউমদা",
            "schools": []
          },
          {
            "name": "বড় ভাকৈর (পশ্চিম)",
            "schools": []
          },
          {
            "name": "বড় ভাকৈর (পূর্ব)",
            "schools": []
          },
          {
            "name": "বাউসা",
            "schools": []
          }
        ]
      },
      {
        "name": "বানিয়াচং",
        "unions": [
          {
            "name": "কাগাপাশা",
            "schools": []
          },
          {
            "name": "খাগাউড়া",
            "schools": []
          },
          {
            "name": "দৌলতপুর",
            "schools": []
          },
          {
            "name": "পুকড়া",
            "schools": []
          },
          {
            "name": "পৈলারকান্দি",
            "schools": []
          },
          {
            "name": "বড়ইউড়ি",
            "schools": []
          },
          {
            "name": "বানিয়াচং উত্তর পশ্চিম",
            "schools": []
          },
          {
            "name": "বানিয়াচং উত্তর পূর্ব",
            "schools": []
          },
          {
            "name": "বানিয়াচং দক্ষিণ পশ্চিম",
            "schools": []
          },
          {
            "name": "বানিয়াচং দক্ষিণ পূর্ব",
            "schools": []
          },
          {
            "name": "মক্রমপুর",
            "schools": []
          },
          {
            "name": "মন্দরী",
            "schools": []
          },
          {
            "name": "মুরাদপুর",
            "schools": []
          },
          {
            "name": "সুজাতপুর",
            "schools": []
          },
          {
            "name": "সুবিদপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "বাহুবল",
        "unions": [
          {
            "name": "পুটিজুরী",
            "schools": []
          },
          {
            "name": "বাহুবল সদর",
            "schools": []
          },
          {
            "name": "ভাদেশ্বর",
            "schools": []
          },
          {
            "name": "মিরপুর",
            "schools": []
          },
          {
            "name": "লামাতাশী",
            "schools": []
          },
          {
            "name": "সাতকাপন",
            "schools": []
          },
          {
            "name": "স্নানঘাট",
            "schools": []
          }
        ]
      },
      {
        "name": "মাধবপুর",
        "unions": [
          {
            "name": "আদাঐর",
            "schools": []
          },
          {
            "name": "আন্দিউড়া",
            "schools": []
          },
          {
            "name": "চৌমুহনী",
            "schools": []
          },
          {
            "name": "ছাতিয়াইন",
            "schools": []
          },
          {
            "name": "জগদীশপুর",
            "schools": []
          },
          {
            "name": "ধর্মঘর",
            "schools": []
          },
          {
            "name": "নোয়াপাড়া",
            "schools": []
          },
          {
            "name": "বহরা",
            "schools": []
          },
          {
            "name": "বাঘাসুরা",
            "schools": []
          },
          {
            "name": "বুল্লা",
            "schools": []
          },
          {
            "name": "শাহজাহানপুর",
            "schools": []
          }
        ]
      },
      {
        "name": "লাখাই",
        "unions": [
          {
            "name": "করাব",
            "schools": []
          },
          {
            "name": "বামৈ",
            "schools": []
          },
          {
            "name": "বুল্লা",
            "schools": []
          },
          {
            "name": "মুড়িয়াউক",
            "schools": []
          },
          {
            "name": "মোড়াকরি",
            "schools": []
          },
          {
            "name": "লাখাই",
            "schools": []
          }
        ]
      },
      {
        "name": "শায়েস্তাগঞ্জ",
        "unions": []
      },
      {
        "name": "হবিগঞ্জ সদর",
        "unions": [
          {
            "name": "গোপায়া",
            "schools": []
          },
          {
            "name": "তেঘরিয়া",
            "schools": []
          },
          {
            "name": "নিজামপুর",
            "schools": []
          },
          {
            "name": "নুরপুর",
            "schools": []
          },
          {
            "name": "পইল",
            "schools": []
          },
          {
            "name": "রাজিউড়া",
            "schools": []
          },
          {
            "name": "রিচি",
            "schools": []
          },
          {
            "name": "লস্করপুর",
            "schools": []
          },
          {
            "name": "লুকড়া",
            "schools": []
          },
          {
            "name": "শায়েস্তাগঞ্জ",
            "schools": []
          }
        ]
      }
    ]
  }
];
