"use client"

import { useState } from "react"

interface AgentSetupModalProps {
  isOpen: boolean
  initialName?: string
  onSave: (name: string) => void
}

export default function AgentSetupModal({ isOpen, initialName = "", onSave }: AgentSetupModalProps) {
  const [tempAgentName, setTempAgentName] = useState(initialName)

  if (!isOpen) return null

  const handleSave = () => {
    if (tempAgentName.trim()) {
      onSave(tempAgentName.trim())
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">👤</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Welcome to BFL Helper!</h2>
          <p className="text-gray-600 mt-2">Please enter your name to personalize your experience</p>
        </div>
        <div className="space-y-4">
          <input
            type="text"
            value={tempAgentName}
            onChange={(e) => setTempAgentName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onKeyPress={(e) => e.key === "Enter" && handleSave()}
          />
          <button
            onClick={handleSave}
            disabled={!tempAgentName.trim()}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}
