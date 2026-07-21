import { BANGLADESH_LOCATIONS_DATABASE } from "./locationData";

// Safe fetch wrapper with timeout to abort hung external APIs (like bdapis)
async function fetchWithTimeout(resource: string, options: any = {}, timeout = 3500): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

export interface GeoDistrict {
  id: string;
  name: string;
  bn_name: string;
}

export interface GeoUpazila {
  id: string;
  district_id: string;
  name: string;
  bn_name: string;
}

export interface GeoUnion {
  id: string;
  name: string;
  bn_name: string;
}

// In-memory cache for session
const cache: {
  districts: GeoDistrict[] | null;
  upazilas: Record<string, GeoUpazila[]>;
  unions: Record<string, GeoUnion[]>;
} = {
  districts: null,
  upazilas: {},
  unions: {}
};

// Clean name for matching (e.g., strips suffix)
function cleanName(name: string): string {
  if (!name) return "";
  return name
    .replace(/ ইউনিয়ন| ইউনিয়ন| পৌরসভা| পৌর এলাকা| সদর| সিটি কর্পোরেশন| পৌরসভা এলাকা| এলাকা/g, "")
    .trim();
}

// 1. Fetch all districts
export async function getDistricts(): Promise<GeoDistrict[]> {
  try {
    const res = await fetch("/api/settings");
    if (res.ok) {
      const settings = await res.json();
      if (settings && settings.locations && settings.locations.length > 0) {
        const districts = settings.locations.map((loc: any, idx: number) => ({
          id: `settings_dist_${idx}`,
          name: loc.district,
          bn_name: loc.district
        }));
        return districts.sort((a: GeoDistrict, b: GeoDistrict) => a.bn_name.localeCompare(b.bn_name, "bn"));
      }
    }
  } catch (err) {
    console.error("Error fetching districts from settings:", err);
  }

  if (cache.districts) return cache.districts;

  try {
    const res = await fetchWithTimeout("https://bdapis.vercel.app/geo/v2.0/districts", {}, 3500);
    const data = await res.json();
    if (data.success && Array.isArray(data.data)) {
      // Sort districts alphabetically by Bengali name for consistent user experience
      const sorted = [...data.data].sort((a, b) => (a.bn_name || a.name).localeCompare(b.bn_name || b.name, "bn"));
      cache.districts = sorted;
      return sorted;
    }
  } catch (err) {
    console.error("Error fetching districts, falling back:", err);
  }

  // Fallback to local database districts
  const fallback = BANGLADESH_LOCATIONS_DATABASE.map((d, index) => ({
    id: String(index + 1),
    name: d.district,
    bn_name: d.district
  })).sort((a, b) => a.bn_name.localeCompare(b.bn_name, "bn"));
  return fallback;
}

// 2. Fetch upazilas for a given district name
export async function getUpazilas(districtName: string): Promise<GeoUpazila[]> {
  if (!districtName) return [];

  try {
    const res = await fetch("/api/settings");
    if (res.ok) {
      const settings = await res.json();
      if (settings && settings.locations) {
        const matchedDist = settings.locations.find((loc: any) => loc.district === districtName);
        if (matchedDist && matchedDist.upazilas) {
          const upazilas = matchedDist.upazilas.map((up: any, idx: number) => ({
            id: `settings_up_${idx}`,
            district_id: "settings_dist",
            name: up.name,
            bn_name: up.name
          }));
          return upazilas.sort((a: GeoUpazila, b: GeoUpazila) => a.bn_name.localeCompare(b.bn_name, "bn"));
        }
      }
    }
  } catch (err) {
    console.error("Error fetching upazilas from settings:", err);
  }

  const districts = await getDistricts();
  const matchedDist = districts.find(
    d => d.bn_name === districtName || d.name === districtName
  );
  if (!matchedDist) {
    // Fallback to static upazilas
    const localDist = BANGLADESH_LOCATIONS_DATABASE.find(d => d.district === districtName);
    if (localDist) {
      return localDist.upazilas.map((u, index) => ({
        id: `fallback_up_${index}`,
        district_id: "0",
        name: u.name,
        bn_name: u.name
      })).sort((a, b) => a.bn_name.localeCompare(b.bn_name, "bn"));
    }
    return [];
  }

  const distId = matchedDist.id;
  if (cache.upazilas[distId]) return cache.upazilas[distId];

  try {
    const res = await fetchWithTimeout(`https://bdapis.vercel.app/geo/v2.0/upazilas/${distId}`, {}, 3500);
    const data = await res.json();
    if (data.success && Array.isArray(data.data)) {
      const sorted = [...data.data].sort((a, b) => (a.bn_name || a.name).localeCompare(b.bn_name || b.name, "bn"));
      cache.upazilas[distId] = sorted;
      return sorted;
    }
  } catch (err) {
    console.error(`Error fetching upazilas for district ${districtName}:`, err);
  }

  // Fallback
  const localDist = BANGLADESH_LOCATIONS_DATABASE.find(d => d.district === districtName);
  if (localDist) {
    return localDist.upazilas.map((u, index) => ({
      id: `fallback_up_${index}`,
      district_id: distId,
      name: u.name,
      bn_name: u.name
    })).sort((a, b) => a.bn_name.localeCompare(b.bn_name, "bn"));
  }
  return [];
}

// 3. Fetch unions for a given district & upazila
export async function getUnions(districtName: string, upazilaName: string): Promise<GeoUnion[]> {
  if (!districtName || !upazilaName) return [];

  try {
    const res = await fetch("/api/settings");
    if (res.ok) {
      const settings = await res.json();
      if (settings && settings.locations) {
        const matchedDist = settings.locations.find((loc: any) => loc.district === districtName);
        if (matchedDist && matchedDist.upazilas) {
          const matchedUp = matchedDist.upazilas.find((up: any) => up.name === upazilaName);
          if (matchedUp && matchedUp.unions) {
            const unions = matchedUp.unions.map((un: any, idx: number) => {
              return {
                id: `settings_un_${idx}`,
                name: un.name,
                bn_name: un.name
              };
            });
            return unions.sort((a: GeoUnion, b: GeoUnion) => a.bn_name.localeCompare(b.bn_name, "bn"));
          }
        }
      }
    }
  } catch (err) {
    console.error("Error fetching unions from settings:", err);
  }

  const upazilas = await getUpazilas(districtName);
  const matchedUp = upazilas.find(
    u => u.bn_name === upazilaName || u.name === upazilaName
  );

  if (!matchedUp) {
    // Fallback
    const localDist = BANGLADESH_LOCATIONS_DATABASE.find(d => d.district === districtName);
    const localUp = localDist?.upazilas.find(u => u.name === upazilaName);
    if (localUp) {
      return localUp.unions.map((un, index) => ({
        id: `fallback_un_${index}`,
        name: un.name,
        bn_name: un.name
      })).sort((a, b) => a.bn_name.localeCompare(b.bn_name, "bn"));
    }
    return [];
  }

  const upId = matchedUp.id;
  if (cache.unions[upId]) return cache.unions[upId];

  try {
    const res = await fetchWithTimeout(`https://bdapis.vercel.app/geo/v2.0/unions/${upId}`, {}, 3500);
    const data = await res.json();
    if (data.success && Array.isArray(data.data)) {
      // Format union names with proper "ইউনিয়ন" or "পৌরসভা" suffix
      const formatted: GeoUnion[] = data.data.map(un => {
        let bnName = un.bn_name || un.name;
        
        // Remove existing suffixes first to clean it up
        const baseName = bnName.replace(/ ইউনিয়ন| ইউনিয়ন| পৌরসভা/g, "").trim();
        const baseUpazilaClean = cleanName(upazilaName);
        const baseUnionClean = cleanName(baseName);

        let finalName = baseName;
        if (baseUnionClean === baseUpazilaClean || baseName.includes("পৌরসভা") || baseName.includes("পৌর")) {
          if (!baseName.endsWith("পৌরসভা") && !baseName.endsWith("পৌর")) {
            finalName = `${baseName} পৌরসভা`;
          } else if (baseName.endsWith("পৌর")) {
            finalName = `${baseName}সভা`;
          }
        } else {
          if (!baseName.endsWith("ইউনিয়ন") && !baseName.endsWith("ইউনিয়ন")) {
            finalName = `${baseName} ইউনিয়ন`;
          }
        }

        return {
          id: un.id,
          name: un.name,
          bn_name: finalName
        };
      });

      const sorted = formatted.sort((a, b) => a.bn_name.localeCompare(b.bn_name, "bn"));
      cache.unions[upId] = sorted;
      return sorted;
    }
  } catch (err) {
    console.error(`Error fetching unions for ${upazilaName}:`, err);
  }

  // Fallback
  const localDist = BANGLADESH_LOCATIONS_DATABASE.find(d => d.district === districtName);
  const localUp = localDist?.upazilas.find(u => u.name === upazilaName);
  if (localUp) {
    return localUp.unions.map((un, index) => ({
      id: `fallback_un_${index}`,
      name: un.name,
      bn_name: un.name
    })).sort((a, b) => a.bn_name.localeCompare(b.bn_name, "bn"));
  }
  return [];
}

// 4. Generate dynamic, realistic school names (with settings support)
export async function getGeneratedSchools(unionName: string): Promise<string[]> {
  if (!unionName) return [];

  try {
    const res = await fetch("/api/settings");
    if (res.ok) {
      const settings = await res.json();
      if (settings && settings.locations) {
        // Find if this union is in the settings tree and has schools defined
        for (const loc of settings.locations) {
          for (const up of loc.upazilas) {
            const matchedUn = up.unions.find(
              (un: any) =>
                un.name === unionName ||
                un.name.replace(/ ইউনিয়ন| ইউনিয়ন| পৌরসভা/g, "").trim() === unionName.replace(/ ইউনিয়ন| ইউনিয়ন| পৌরসভা/g, "").trim()
            );
            if (matchedUn && Array.isArray(matchedUn.schools) && matchedUn.schools.length > 0) {
              return matchedUn.schools;
            }
          }
        }
      }
    }
  } catch (err) {
    console.error("Error fetching schools from settings:", err);
  }
  
  // Clean up union suffixes
  const cleanUnion = unionName.replace(/ ইউনিয়ন| ইউনিয়ন| পৌরসভা| পৌর/g, "").trim();
  
  return [
    `${cleanUnion} সরকারি প্রাথমিক বিদ্যালয়`,
    `পূর্ব ${cleanUnion} সরকারি প্রাথমিক বিদ্যালয়`,
    `পশ্চিম ${cleanUnion} সরকারি প্রাথমিক বিদ্যালয়`,
    `${cleanUnion} মডেল সরকারি প্রাথমিক বিদ্যালয়`
  ];
}
