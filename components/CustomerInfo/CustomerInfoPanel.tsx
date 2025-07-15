"use client"
import type { Customer, Language } from "@/types"
import { detectCountryFromPhone } from "@/utils/countryDetection"
import { countryCodes } from "@/data/countries"

interface CustomerInfoPanelProps {
  customer: Customer
  language: Language
  onCustomerChange: (customer: Customer) => void
  onLanguageChange: (language: Language) => void
  onShowFeedback: (message: string) => void
}

export default function CustomerInfoPanel({
  customer,
  language,
  onCustomerChange,
  onLanguageChange,
  onShowFeedback,
}: CustomerInfoPanelProps) {
  const handlePhoneCountryDetection = () => {
    const result = detectCountryFromPhone(customer.phone)

    if (result.country) {
      onCustomerChange({ ...customer, country: result.country })
      onShowFeedback(`Country detected: ${result.flag} ${result.country.toUpperCase()}`)
    } else {
      onShowFeedback(result.error || "Detection failed")
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
        <span className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center mr-3">
          <span className="text-white text-lg">👤</span>
        </span>
        Customer Information
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
          <input
            type="text"
            value={customer.name}
            onChange={(e) => onCustomerChange({ ...customer, name: e.target.value })}
            placeholder="Enter customer name"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onLanguageChange("en")}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                language === "en"
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              🇺🇸 English
            </button>
            <button
              onClick={() => onLanguageChange("ar")}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                language === "ar"
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              🇸🇦 العربية
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={customer.phone}
              onChange={(e) => onCustomerChange({ ...customer, phone: e.target.value })}
              placeholder="+971501234567"
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handlePhoneCountryDetection}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-3 rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-md"
            >
              🌍
            </button>
          </div>

          {customer.country && (
            <div className="mt-3 p-3 bg-green-50 border-2 border-green-200 rounded-xl">
              <div className="text-sm text-green-600 font-medium">
                Country:{" "}
                {
                  countryCodes[
                    Object.keys(countryCodes).find((code) => countryCodes[code].name === customer.country) || ""
                  ]?.flag
                }{" "}
                {customer.country.toUpperCase()}
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Gender (Optional)</label>
          <select
            value={customer.gender}
            onChange={(e) => onCustomerChange({ ...customer, gender: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>
    </div>
  )
}
