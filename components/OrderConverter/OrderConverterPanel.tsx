"use client"

import { useState } from "react"
import { convertOrderToUserId } from "@/utils/orderConverter"
import { copyToClipboard } from "@/utils/clipboard"

interface OrderConverterPanelProps {
  onShowFeedback: (message: string) => void
}

export default function OrderConverterPanel({ onShowFeedback }: OrderConverterPanelProps) {
  const [orderInput, setOrderInput] = useState("")
  const [resultValue, setResultValue] = useState("-")
  const [showResult, setShowResult] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleConvert = () => {
    const result = convertOrderToUserId(orderInput)

    if (result.success && result.userId) {
      setResultValue(result.userId)
      setShowResult(true)
      setErrorMessage("")
    } else {
      setErrorMessage(result.error || "Conversion failed")
      setShowResult(false)
    }
  }

  const handleCopy = async () => {
    const success = await copyToClipboard(resultValue)
    if (success) {
      onShowFeedback("✨ User ID copied!")
    } else {
      onShowFeedback("❌ Failed to copy")
    }
  }

  const handleResultClick = () => {
    if (showResult && resultValue !== "-") {
      handleCopy()
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
        <span className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mr-3">
          <span className="text-white text-lg">🔄</span>
        </span>
        Order ID → User ID
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Order ID</label>
          <input
            type="text"
            value={orderInput}
            onChange={(e) => setOrderInput(e.target.value)}
            placeholder="A123456789"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onKeyPress={(e) => e.key === "Enter" && handleConvert()}
          />
        </div>

        <button
          onClick={handleConvert}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-md"
        >
          Convert
        </button>

        {showResult && (
          <div
            className="bg-green-50 border-2 border-green-200 rounded-xl p-4 cursor-pointer hover:bg-green-100 transition-all duration-200"
            onClick={handleResultClick}
            title="Click to copy User ID"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">User ID (Click to Copy):</p>
                <p className="text-xl font-bold text-green-900">{resultValue}</p>
              </div>
              <div className="text-green-500 text-2xl">📋</div>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
            <p className="text-sm text-red-800">{errorMessage}</p>
          </div>
        )}
      </div>
    </div>
  )
}
