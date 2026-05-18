// Curated Unsplash images chosen to fit the Magistrum brand: warm tones,
// considered composition, UAE/Dubai context where applicable. Each photo is
// picked to be thematically tied to the section it appears in, not generic
// stock filler. All under the Unsplash licence.

export type StockImage = {
  id: string;             // Unsplash photo ID
  alt: string;            // descriptive alt text
  credit: string;         // photographer (Unsplash)
  tone: "warm" | "neutral" | "cool";
};

export const IMAGES = {
  // Per-emirate imagery (verified landmarks)
  dubaiSkylineGold: { id: "photo-1546412414-e1885259563a", alt: "Dubai skyline at golden hour with Burj Khalifa", credit: "Unsplash", tone: "warm" },
  dubaiArchitecture: { id: "photo-1583416750470-965b2707b355", alt: "Modern Dubai architecture and waterway", credit: "Unsplash", tone: "warm" },
  dubaiMarinaSunset: { id: "photo-1582672060674-bc2bd808a8ce", alt: "Dubai Marina at sunset, business district", credit: "Unsplash", tone: "warm" },
  // Sheikh Zayed Grand Mosque, Abu Dhabi (verified Unsplash CDN photo)
  abuDhabiMosque: { id: "photo-1769428197774-2dfdffe4a723", alt: "Sheikh Zayed Grand Mosque arches and columns, Abu Dhabi", credit: "Unsplash", tone: "warm" },
  abuDhabiCorniche: { id: "photo-1512632578888-169bbbc64f33", alt: "Abu Dhabi corniche skyline at dusk", credit: "Unsplash", tone: "warm" },
  // Sharjah lagoon + skyline by the Central Souq / Al Noor area
  sharjahLagoon: { id: "photo-1566555108172-f8a02274a3d3", alt: "Sharjah high-rises along the lagoon, viewed from the Central Souq Mosque area", credit: "Unsplash", tone: "warm" },
  // Jebel Jais, Ras Al Khaimah — winding mountain road, representing the Northern Emirates
  northernEmiratesMountain: { id: "photo-1745708804966-fc71b259a01b", alt: "Winding mountain road on Jebel Jais, Ras Al Khaimah, Northern Emirates", credit: "Unsplash", tone: "warm" },
  uaeDesertCity: { id: "photo-1518684079-3c830dcef090", alt: "UAE city at golden evening", credit: "Unsplash", tone: "warm" },

  // Zoho Books — accounting paperwork with warm lighting
  zohoBooks: { id: "photo-1554224155-6726b3ff858f", alt: "Laptop showing finance dashboard on a warm desk", credit: "Unsplash", tone: "warm" },
  bookkeeping: { id: "photo-1554224154-26032ffc0d07", alt: "Calculator and ledger on a warm wood desk", credit: "Unsplash", tone: "warm" },

  // Zoho CRM — relationships, sales conversations
  zohoCrm: { id: "photo-1556761175-5973dc0f32e7", alt: "Sales professional reviewing CRM pipeline on a laptop", credit: "Unsplash", tone: "warm" },
  salesMeeting: { id: "photo-1556761175-b413da4baf72", alt: "Sales conversation across a table with warm lighting", credit: "Unsplash", tone: "warm" },

  // Zoho Workplace — collaboration, cloud move
  zohoWorkplace: { id: "photo-1600880292203-757bb62b4baf", alt: "Laptop and notebook on a warm desk, ready for collaboration", credit: "Unsplash", tone: "warm" },
  cloudMigration: { id: "photo-1521737711867-e3b97375f902", alt: "Two colleagues collaborating on a laptop, warm office", credit: "Unsplash", tone: "warm" },

  // Zoho Finance Suite — dashboards, multi-module
  zohoFinance: { id: "photo-1460925895917-afdab827c52f", alt: "Analytics charts on a screen with notes on the desk", credit: "Unsplash", tone: "neutral" },
  dataDashboards: { id: "photo-1551288049-bebda4e38f71", alt: "Business analytics dashboard on a laptop screen", credit: "Unsplash", tone: "neutral" },

  // Zoho One — full stack, executive office
  zohoOne: { id: "photo-1497215842964-222b430dc094", alt: "Modern office workspace with warm wood and natural light", credit: "Unsplash", tone: "warm" },
  executiveOffice: { id: "photo-1497366754035-5f07c9e0a3e8", alt: "Clean executive office with warm tones", credit: "Unsplash", tone: "warm" },

  // Training — learners taking notes
  zohoTraining: { id: "photo-1503676260728-1c00da094a0b", alt: "Learner taking notes during a training session", credit: "Unsplash", tone: "warm" },
  certification: { id: "photo-1606326608606-aa0b62935f2b", alt: "Certificate of completion with warm tones", credit: "Unsplash", tone: "warm" },

  // About / company
  modernOfficeWarm: { id: "photo-1497366216548-37526070297c", alt: "Modern open-plan office with warm wood and large windows", credit: "Unsplash", tone: "warm" },

  // Legacy aliases (kept so existing imports don't break)
  dubaiSkyline: { id: "photo-1546412414-e1885259563a", alt: "Dubai skyline at golden hour", credit: "Unsplash", tone: "warm" },
  dubaiMarina: { id: "photo-1582672060674-bc2bd808a8ce", alt: "Dubai Marina at sunset", credit: "Unsplash", tone: "warm" },
  // difcDistrict was wrongly used for Abu Dhabi pages; now points to a real Abu Dhabi photo (Sheikh Zayed Grand Mosque)
  difcDistrict: { id: "photo-1769428197774-2dfdffe4a723", alt: "Sheikh Zayed Grand Mosque, Abu Dhabi", credit: "Unsplash", tone: "warm" },
  // dubaiAerial was wrongly used for Northern Emirates; now points to Jebel Jais
  dubaiAerial: { id: "photo-1745708804966-fc71b259a01b", alt: "Jebel Jais mountain road, Ras Al Khaimah", credit: "Unsplash", tone: "warm" },
  modernOffice: { id: "photo-1497366216548-37526070297c", alt: "Modern office with warm wood and natural light", credit: "Unsplash", tone: "warm" },
  teamMeeting: { id: "photo-1556761175-5973dc0f32e7", alt: "Team reviewing work on a laptop, warm office", credit: "Unsplash", tone: "warm" },
  laptopFinance: { id: "photo-1554224155-6726b3ff858f", alt: "Laptop with finance dashboard, warm desk", credit: "Unsplash", tone: "warm" },
  collaboration: { id: "photo-1600880292203-757bb62b4baf", alt: "Collaboration on a laptop at a warm desk", credit: "Unsplash", tone: "warm" },
  dataCharts: { id: "photo-1460925895917-afdab827c52f", alt: "Data charts and notes on a desk", credit: "Unsplash", tone: "neutral" },
  workshopTraining: { id: "photo-1503676260728-1c00da094a0b", alt: "Learner taking notes in a training workshop", credit: "Unsplash", tone: "warm" },
  presentation: { id: "photo-1556761175-5973dc0f32e7", alt: "Professional reviewing work at a laptop", credit: "Unsplash", tone: "warm" },
  signingContract: { id: "photo-1450101499163-c8848c66ca85", alt: "Person signing a document at a desk", credit: "Unsplash", tone: "warm" },
  taxAccounting: { id: "photo-1554224154-26032ffc0d07", alt: "Calculator and ledger on a warm wood desk", credit: "Unsplash", tone: "warm" },
  handsKeyboard: { id: "photo-1551434678-e076c223a692", alt: "Hands typing on a keyboard with notebook on desk", credit: "Unsplash", tone: "warm" },
} as const;

export type ImageKey = keyof typeof IMAGES;

export function img(stock: StockImage, w: number = 1600, h: number = 900, q: number = 75) {
  // Add a warm crop and tone overlay-friendly settings.
  return `https://images.unsplash.com/${stock.id}?w=${w}&h=${h}&fit=crop&auto=format&q=${q}`;
}
