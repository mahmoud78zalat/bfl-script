import { countryCodes } from "@/data/countries"

export const detectCountryFromPhone = (phone: string): { country?: string; flag?: string; error?: string } => {
  if (!phone.trim()) {
    return { error: "Please enter a phone number" }
  }

  const cleanPhone = phone.replace(/[^\d]/g, "")

  for (const [code, country] of Object.entries(countryCodes)) {
    if (cleanPhone.startsWith(code)) {
      return {
        country: country.name,
        flag: country.flag,
      }
    }
  }

  return { error: "Country not supported or invalid phone number" }
}
