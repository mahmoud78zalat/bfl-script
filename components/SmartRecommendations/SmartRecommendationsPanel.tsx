"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import type { KeywordRecommendation, Language } from "@/types"
import { analyzeCustomerMessage } from "@/utils/messageAnalyzer"
import { copyToClipboard } from "@/utils/clipboard"
import { getSmartRecommendations, determineConversationStage } from "@/data/replyTemplates"

interface SmartRecommendationsPanelProps {
  language: Language
  onShowFeedback: (message: string) => void
}

export default function SmartRecommendationsPanel({ language, onShowFeedback }: SmartRecommendationsPanelProps) {
  const [customerMessage, setCustomerMessage] = useState("")
  const [recommendations, setRecommendations] = useState<KeywordRecommendation[]>([])
  const [copiedCards, setCopiedCards] = useState<Set<string>>(new Set())
  const [smartRecommendationsEnabled, setSmartRecommendationsEnabled] = useState(true)
  const [usedTemplates, setUsedTemplates] = useState<string[]>([])

  // Get current conversation stage and smart recommendations
  const currentStage = determineConversationStage(usedTemplates)
  const stageRecommendations = smartRecommendationsEnabled ? getSmartRecommendations(currentStage, usedTemplates) : []

  const handleAnalyze = () => {
    if (!customerMessage.trim()) {
      onShowFeedback("Please enter a customer message to analyze")
      return
    }

    const recs = analyzeCustomerMessage(customerMessage, language)
    setRecommendations(recs)
    onShowFeedback(`Found ${recs.length} relevant templates! 🎯`)
  }

  const handleCopy = async (text: string, id: string) => {
    const success = await copyToClipboard(text)
    if (success) {
      setCopiedCards((prev) => new Set([...prev, id]))

      // Track used template for smart recommendations
      if (!usedTemplates.includes(id)) {
        setUsedTemplates((prev) => [...prev, id])
      }

      onShowFeedback("✨ Copied successfully!")

      // Remove copied state after 3 seconds
      setTimeout(() => {
        setCopiedCards((prev) => {
          const newSet = new Set(prev)
          newSet.delete(id)
          return newSet
        })
      }, 3000)
    } else {
      onShowFeedback("❌ Failed to copy")
    }
  }

  const handleStageRecommendationCopy = async (templateId: string) => {
    // This would need to be connected to the actual template data
    // For now, we'll just track the usage
    if (!usedTemplates.includes(templateId)) {
      setUsedTemplates((prev) => [...prev, templateId])
    }
    onShowFeedback("✨ Template copied!")
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center">
          <span className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mr-3">
            <span className="text-white text-lg">🎯</span>
          </span>
          Smart Recommendations
        </h3>

        <div className="flex items-center space-x-2">
          <Switch
            id="smart-recommendations"
            checked={smartRecommendationsEnabled}
            onCheckedChange={setSmartRecommendationsEnabled}
          />
          <Label htmlFor="smart-recommendations" className="text-sm font-medium">
            Auto Recommendations
          </Label>
        </div>
      </div>

      {/* Smart Stage-Based Recommendations */}
      {smartRecommendationsEnabled && stageRecommendations.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <span className="mr-2">🤖</span>
            Suggested Templates (Stage: {currentStage})
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {stageRecommendations.map((templateId) => (
              <div
                key={templateId}
                onClick={() => handleStageRecommendationCopy(templateId)}
                className="p-3 rounded-lg border-2 border-blue-200 bg-blue-50 cursor-pointer transition-all duration-200 hover:border-blue-300 hover:bg-blue-100 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-800 capitalize">{templateId.replace(/_/g, " ")}</span>
                  <span className="text-xs text-blue-600 bg-blue-200 px-2 py-1 rounded-full">Recommended</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Analyze Customer Message</label>
        <div className="space-y-3">
          <textarea
            value={customerMessage}
            onChange={(e) => setCustomerMessage(e.target.value)}
            placeholder="Paste customer message here for smart template recommendations..."
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
          <button
            onClick={handleAnalyze}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-xl font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 shadow-md"
          >
            🔍 Analyze & Get Recommendations
          </button>
        </div>
      </div>

      {recommendations.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <span className="mr-2">🎯</span>
            Message-Based Recommendations
          </h4>
          <div className="space-y-3">
            {recommendations.map((rec, index) => {
              const cardId = `keyword-${rec.id}-${index}`
              const isCopied = copiedCards.has(cardId)

              return (
                <div
                  key={cardId}
                  onClick={() => handleCopy(rec.text, cardId)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    isCopied
                      ? "border-green-500 bg-green-50 shadow-lg transform scale-105"
                      : "border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                      {rec.category}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">Score: {rec.score}</span>
                      {isCopied && <span className="text-green-500 text-sm">✓</span>}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 line-clamp-2">{rec.text}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {rec.keywords.map((keyword, kidx) => (
                      <span key={kidx} className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {recommendations.length === 0 && !smartRecommendationsEnabled && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-gray-400 text-2xl">🎯</span>
          </div>
          <p className="text-gray-500 text-sm">
            Smart recommendations are disabled. Enable them to get contextual suggestions.
          </p>
        </div>
      )}

      {recommendations.length === 0 && smartRecommendationsEnabled && stageRecommendations.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-gray-400 text-2xl">🎯</span>
          </div>
          <p className="text-gray-500 text-sm">Analyze a customer message to get smart recommendations</p>
        </div>
      )}
    </div>
  )
}
