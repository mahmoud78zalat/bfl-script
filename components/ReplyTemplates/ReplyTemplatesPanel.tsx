"use client"

import { useState, useEffect, useCallback } from "react" // Added useCallback
import { replyCategories, getSmartRecommendations, determineConversationStage } from "@/data/replyTemplates"
import { processTemplate } from "@/utils/templateProcessor"
import { copyToClipboard } from "@/utils/clipboard"
import type { Customer, Language } from "@/types"

interface ReplyTemplatesPanelProps {
  customer: Customer
  agentName: string
  language: Language
  itemName: string
  deliveryDate: string
  waitingTime: string
  onShowFeedback: (message: string) => void
}

export default function ReplyTemplatesPanel({
  customer,
  agentName,
  language,
  itemName,
  deliveryDate,
  waitingTime,
  onShowFeedback,
}: ReplyTemplatesPanelProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [usedTemplates, setUsedTemplates] = useState<string[]>([])
  const [conversationStage, setConversationStage] = useState("ready_to_start") // Initial state set to ready_to_start
  const [smartRecommendationsEnabled, setSmartRecommendationsEnabled] = useState(true)

  // Update conversation stage when usedTemplates changes
  useEffect(() => {
    const newStage = determineConversationStage(usedTemplates)
    setConversationStage(newStage)
  }, [usedTemplates])

  // Define all templates that should trigger a conversation reset
  const resetTriggerTemplates = [
    // CSAT templates
    "survey_request",
    "rating_request",
    "feedback_appreciation",
    "survey_reminder",
    "service_quality",
    // Closure templates
    "thank_you",
    "pleasure_helping",
    "satisfaction_check_closure",
    "professional_closure",
    "idle_closure",
    "offensive_closure", // Added offensive_closure to trigger reset
  ]

  // Check if a template is a closure/CSAT template that should trigger a reset
  const isResetTriggerTemplate = useCallback(
    (templateKey: string) => {
      return resetTriggerTemplates.includes(templateKey)
    },
    [resetTriggerTemplates],
  )

  const handleCopyTemplate = async (templateKey: string, templateText: string) => {
    const processedText = processTemplate(templateText, {
      customer,
      agentName,
      itemName,
      deliveryDate,
      waitingTime,
      language,
    })

    const success = await copyToClipboard(processedText)
    if (success) {
      onShowFeedback("✨ Template copied!")

      // Add to used templates
      setUsedTemplates((prev) => {
        if (!prev.includes(templateKey)) {
          return [...prev, templateKey]
        }
        return prev
      })

      // If it's a reset-triggering template, clear usedTemplates immediately
      if (isResetTriggerTemplate(templateKey)) {
        setUsedTemplates([]) // This will cause useEffect to set stage to ready_to_start
      }
    } else {
      onShowFeedback("❌ Failed to copy template")
    }
  }

  const handleTemplateClick = (templateKey: string, templateText: string) => {
    handleCopyTemplate(templateKey, templateText)
  }

  // Filter templates based on search
  const filteredCategories = Object.entries(replyCategories).reduce(
    (acc, [categoryKey, category]) => {
      const filteredTemplates = Object.entries(category.templates).filter(([templateKey, template]) => {
        const templateText = template[language] || template.en
        const searchLower = searchTerm.toLowerCase()
        return (
          templateKey.toLowerCase().includes(searchLower) ||
          templateText.toLowerCase().includes(searchLower) ||
          category.title.toLowerCase().includes(searchLower)
        )
      })

      if (filteredTemplates.length > 0) {
        acc[categoryKey] = {
          ...category,
          templates: Object.fromEntries(filteredTemplates),
        }
      }

      return acc
    },
    {} as typeof replyCategories,
  )

  // Get smart recommendations
  const smartRecommendations = smartRecommendationsEnabled
    ? getSmartRecommendations(conversationStage, usedTemplates)
    : []

  // Get stage display text
  const getStageDisplayText = (stage: string) => {
    const stageTexts: Record<string, string> = {
      ready_to_start: "Ready to Start",
      greeting_sent: "Greeting Sent",
      order_id_asked: "Order ID Asked",
      bear_with_me_sent: "Processing Request",
      resolution_offered: "Offering Additional Help",
      conversation_concluded: "Conversation Concluded",
      customer_inquiry: "Customer Inquiry",
      assistance: "Providing Assistance",
    }
    return stageTexts[stage] || stage
  }

  // Get stage color
  const getStageColor = (stage: string) => {
    const stageColors: Record<string, string> = {
      ready_to_start: "bg-gray-100 text-gray-600",
      greeting_sent: "bg-blue-100 text-blue-600",
      order_id_asked: "bg-yellow-100 text-yellow-600",
      bear_with_me_sent: "bg-purple-100 text-purple-600",
      resolution_offered: "bg-orange-100 text-orange-600",
      conversation_concluded: "bg-red-100 text-red-600",
      customer_inquiry: "bg-green-100 text-green-600",
      assistance: "bg-teal-100 text-teal-600",
    }
    return stageColors[stage] || "bg-gray-100 text-gray-600"
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <span className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center mr-3">
              <span className="text-white text-xl">💬</span>
            </span>
            Reply Templates
          </h2>
          <div className={`text-sm px-3 py-1 rounded-full font-semibold ${getStageColor(conversationStage)}`}>
            {getStageDisplayText(conversationStage)}
          </div>
        </div>

        {/* Smart Recommendations Toggle */}
        <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-xl">
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-700 mr-2">🤖 Auto Recommendations</span>
            <span className="text-xs text-gray-500">Stage-based template suggestions</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={smartRecommendationsEnabled}
              onChange={(e) => setSmartRecommendationsEnabled(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-12 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">🔍</span>
        </div>
      </div>

      {/* Smart Recommendations */}
      {smartRecommendations.length > 0 && (
        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-2">
              <span className="text-white text-sm">🎯</span>
            </span>
            Smart Recommendations
            <span className="ml-2 text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">Next Steps</span>
          </h3>
          <div className="grid grid-cols-1 gap-2">
            {smartRecommendations.map((templateKey) => {
              // Find the template in categories
              let foundTemplate = null
              let foundCategoryKey = ""

              for (const [categoryKey, category] of Object.entries(replyCategories)) {
                if (category.templates[templateKey]) {
                  foundTemplate = category.templates[templateKey]
                  foundCategoryKey = categoryKey
                  break
                }
              }

              if (!foundTemplate) return null

              const templateText = foundTemplate[language] || foundTemplate.en
              const processedText = processTemplate(templateText, {
                customer,
                agentName,
                itemName,
                deliveryDate,
                waitingTime,
                language,
              })

              return (
                <div
                  key={templateKey}
                  onClick={() => {
                    handleTemplateClick(templateKey, templateText)
                  }}
                  className="bg-white border-2 border-purple-200 rounded-xl p-4 cursor-pointer hover:border-purple-400 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full mr-2">
                          RECOMMENDED
                        </span>
                        <span className="text-xs text-gray-500 capitalize">{foundCategoryKey.replace("_", " ")}</span>
                      </div>
                      <p className="text-gray-800 text-sm leading-relaxed">{processedText}</p>
                    </div>
                    <div className="ml-3 text-purple-500 group-hover:text-purple-700 transition-colors">
                      <span className="text-lg">📋</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Templates */}
      <div className="p-6 max-h-[600px] overflow-y-auto">
        {Object.keys(filteredCategories).length === 0 ? (
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">🔍</span>
            <p className="text-gray-500 text-lg">No templates found matching your search.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(filteredCategories).map(([categoryKey, category]) => (
              <div key={categoryKey}>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="mr-2">{category.title}</span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {Object.keys(category.templates).length}
                  </span>
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {Object.entries(category.templates).map(([templateKey, template]) => {
                    const templateText = template[language] || template.en
                    const processedText = processTemplate(templateText, {
                      customer,
                      agentName,
                      itemName,
                      deliveryDate,
                      waitingTime,
                      language,
                    })

                    const isUsed = usedTemplates.includes(templateKey)

                    return (
                      <div
                        key={templateKey}
                        onClick={() => {
                          handleTemplateClick(templateKey, templateText)
                        }}
                        className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 group ${
                          isUsed
                            ? "border-green-200 bg-green-50 hover:border-green-400"
                            : "border-gray-200 bg-white hover:border-blue-400 hover:shadow-md"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            {isUsed && (
                              <div className="flex items-center mb-2">
                                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                                  ✓ USED
                                </span>
                              </div>
                            )}
                            <p className="text-gray-800 text-sm leading-relaxed">{processedText}</p>
                          </div>
                          <div
                            className={`ml-3 transition-colors ${
                              isUsed
                                ? "text-green-500 group-hover:text-green-700"
                                : "text-gray-400 group-hover:text-blue-500"
                            }`}
                          >
                            <span className="text-lg">📋</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
