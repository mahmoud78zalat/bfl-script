"use client"

import { useState, useEffect } from "react"
import type { Customer, Agent, Language, TabId } from "@/types"
import { getAgentName, saveAgentName, getWaitTime, saveWaitTime } from "@/utils/storage"

// Components
import NavigationTabs from "@/components/Navigation/NavigationTabs"
import CustomerInfoPanel from "@/components/CustomerInfo/CustomerInfoPanel"
import OrderConverterPanel from "@/components/OrderConverter/OrderConverterPanel"
// import SmartRecommendationsPanel from "@/components/SmartRecommendations/SmartRecommendationsPanel" // Removed import
import AdditionalInfoPanel from "@/components/AdditionalInfo/AdditionalInfoPanel"
import ReplyTemplatesPanel from "@/components/ReplyTemplates/ReplyTemplatesPanel"
import EmailComposer from "@/components/EmailComposer/EmailComposer"
import AboutToolModal from "@/components/Modals/AboutToolModal"
import AgentSetupModal from "@/components/Modals/AgentSetupModal"
import FeedbackToast from "@/components/UI/FeedbackToast"

export default function BFLCustomerServiceHelper() {
  // State management
  const [customer, setCustomer] = useState<Customer>({
    name: "",
    phone: "",
    country: "",
    gender: "",
  })

  const [agent, setAgent] = useState<Agent>({ name: "" })
  const [language, setLanguage] = useState<Language>("en")
  const [activeTab, setActiveTab] = useState<TabId>("customer-info")

  // Additional info state
  const [itemName, setItemName] = useState("")
  const [deliveryDate, setDeliveryDate] = useState("")
  const [waitingTime, setWaitingTime] = useState("")

  // UI state
  const [showEmailComposer, setShowEmailComposer] = useState(false)
  const [showAboutTool, setShowAboutTool] = useState(false)
  const [showAgentSetup, setShowAgentSetup] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [showFeedback, setShowFeedback] = useState(false)

  // Initialize agent data on mount
  useEffect(() => {
    const savedAgentName = getAgentName()
    const savedWaitTime = getWaitTime()

    if (savedAgentName) {
      setAgent({ name: savedAgentName })
    } else {
      setShowAgentSetup(true)
    }

    if (savedWaitTime) {
      setWaitingTime(savedWaitTime)
    }
  }, [])

  // Save wait time when it changes
  useEffect(() => {
    if (waitingTime.trim()) {
      saveWaitTime(waitingTime.trim())
    }
  }, [waitingTime])

  // Feedback management
  const showFeedbackMessage = (message: string) => {
    setFeedback(message)
    setShowFeedback(true)
    setTimeout(() => setShowFeedback(false), 2000)
  }

  // Agent management
  const handleSaveAgent = (name: string) => {
    setAgent({ name })
    saveAgentName(name)
    setShowAgentSetup(false)
  }

  const handleChangeAgent = () => {
    setShowAgentSetup(true)
  }

  // Tab content renderer
  const renderTabContent = () => {
    switch (activeTab) {
      case "customer-info":
        return (
          <CustomerInfoPanel
            customer={customer}
            language={language}
            onCustomerChange={setCustomer}
            onLanguageChange={setLanguage}
            onShowFeedback={showFeedbackMessage}
          />
        )
      case "order-converter":
        return <OrderConverterPanel onShowFeedback={showFeedbackMessage} />
      // case "smart-recommendations": // Removed case
      //   return <SmartRecommendationsPanel language={language} onShowFeedback={showFeedbackMessage} />
      case "additional-info":
        return (
          <AdditionalInfoPanel
            itemName={itemName}
            deliveryDate={deliveryDate}
            waitingTime={waitingTime}
            onItemNameChange={setItemName}
            onDeliveryDateChange={setDeliveryDate}
            onWaitingTimeChange={setWaitingTime}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-xl border-b-4 border-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/640f135187c24-J1uCFYr82SU4iLmqL4ikCHZ0Lzm1fO.webp"
                  alt="Brands For Less"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  BFL Customer Service Helper
                </h1>
                <p className="text-gray-600 text-lg mt-1">
                  {agent.name ? `Welcome back, ${agent.name}!` : "Customer Service Assistant"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowEmailComposer(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-3"
              >
                <span className="text-2xl">✉️</span>
                <span className="text-lg">Email Composer</span>
              </button>
              <button
                onClick={() => setShowAboutTool(true)}
                className="bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg"
              >
                About Tool
              </button>
              {agent.name && (
                <button
                  onClick={handleChangeAgent}
                  className="bg-gradient-to-r from-orange-100 to-orange-200 hover:from-orange-200 hover:to-orange-300 text-orange-700 px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Change Agent
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Navigation & Settings */}
          <div className="space-y-6">
            <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />
            {renderTabContent()}
          </div>

          {/* Right Panel - Reply Templates */}
          <div className="lg:col-span-2">
            <ReplyTemplatesPanel
              customer={customer}
              agentName={agent.name}
              language={language}
              itemName={itemName}
              deliveryDate={deliveryDate}
              waitingTime={waitingTime}
              onShowFeedback={showFeedbackMessage}
            />
          </div>
        </div>
      </div>

      {/* Modals and Overlays */}
      {showEmailComposer && (
        <EmailComposer
          agentName={agent.name}
          onClose={() => setShowEmailComposer(false)}
          onShowFeedback={showFeedbackMessage}
        />
      )}

      <AboutToolModal isOpen={showAboutTool} onClose={() => setShowAboutTool(false)} />

      <AgentSetupModal isOpen={showAgentSetup} initialName={agent.name} onSave={handleSaveAgent} />

      <FeedbackToast message={feedback} isVisible={showFeedback} />
    </div>
  )
}
