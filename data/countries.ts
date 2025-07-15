import type { CountryInfo, CountryFee } from "@/types"

export const countryCodes: Record<string, CountryInfo> = {
  "971": { name: "uae", code: "+971", flag: "🇦🇪" },
  "966": { name: "ksa", code: "+966", flag: "🇸🇦" },
  "961": { name: "lebanon", code: "+961", flag: "🇱🇧" },
  "965": { name: "kuwait", code: "+965", flag: "🇰🇼" },
  "968": { name: "oman", code: "+968", flag: "🇴🇲" },
  "974": { name: "qatar", code: "+974", flag: "🇶🇦" },
  "973": { name: "bahrain", code: "+973", flag: "🇧🇭" },
  "65": { name: "singapore", code: "+65", flag: "🇸🇬" },
  "60": { name: "malaysia", code: "+60", flag: "🇲🇾" },
}

export const countryFees: Record<string, CountryFee> = {
  uae: { fee: "Free", details: "Free collection" },
  ksa: { fee: "Free", details: "Free collection" },
  lebanon: { fee: "1 USD", details: "1 USD (no shop available)" },
  kuwait: { fee: "3 KWD", details: "3 KWD (Can also return to the branch(s) for free.)" },
  oman: { fee: "3.10 OMR", details: "3.10 OMR (Can also return to the branch(s) for free.)" },
  qatar: { fee: "20 QAR", details: "20 QAR (Can also return to the branch(s) for free.)" },
  bahrain: { fee: "3 BHD", details: "3 BHD (Can also return to the branch(s) for free.)" },
  singapore: { fee: "Free", details: "Free (Can also return to the branch)" },
  malaysia: { fee: "Free", details: "Free collection" },
}
