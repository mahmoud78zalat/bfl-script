"use client"

import type { TabId } from "@/types"

interface NavigationTab {
  id: TabId
  label: string
  icon: string
}

interface NavigationTabsProps {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
}

const navigationTabs: NavigationTab[] = [
  { id: "customer-info", label: "Customer Info", icon: "👤" },
  { id: "order-converter", label: "Order Converter", icon: "🔄" },
  { id: "additional-info", label: "Additional Info", icon: "📋" },
]

export default function NavigationTabs({ activeTab, onTabChange }: NavigationTabsProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Navigation</h3>
      <div className="space-y-2">
        {navigationTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-3 ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg transform scale-105"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-md"
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
