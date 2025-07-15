"use client"

import { useState, useEffect } from "react"

interface FeedbackToastProps {
  message: string
  isVisible: boolean
  type?: "success" | "error" | "info" | "warning"
}

export default function FeedbackToast({ message, isVisible, type = "success" }: FeedbackToastProps) {
  if (!isVisible) return null

  const getToastStyles = () => {
    switch (type) {
      case "success":
        return "bg-gradient-to-r from-green-500 to-emerald-500"
      case "error":
        return "bg-gradient-to-r from-red-500 to-rose-500"
      case "warning":
        return "bg-gradient-to-r from-yellow-500 to-orange-500"
      case "info":
        return "bg-gradient-to-r from-blue-500 to-cyan-500"
      default:
        return "bg-gradient-to-r from-green-500 to-emerald-500"
    }
  }

  const getIcon = () => {
    switch (type) {
      case "success":
        return "✅"
      case "error":
        return "❌"
      case "warning":
        return "⚠️"
      case "info":
        return "ℹ️"
      default:
        return "✨"
    }
  }

  return (
    <div
      className={`fixed bottom-6 right-6 ${getToastStyles()} text-white px-6 py-4 rounded-xl shadow-2xl z-50 animate-in slide-in-from-bottom duration-300`}
    >
      <div className="flex items-center space-x-3">
        <span className="text-xl">{getIcon()}</span>
        <span className="font-medium text-white">{message}</span>
      </div>
    </div>
  )
}

// Toast state management
let toastTimeout: NodeJS.Timeout | null = null
let setToastState: ((state: { message: string; isVisible: boolean; type: string }) => void) | null = null

export function showFeedbackToast(message: string, type: "success" | "error" | "info" | "warning" = "success") {
  if (setToastState) {
    if (toastTimeout) {
      clearTimeout(toastTimeout)
    }

    setToastState({ message, isVisible: true, type })

    toastTimeout = setTimeout(() => {
      setToastState({ message: "", isVisible: false, type: "success" })
    }, 3000)
  }
}

// Hook for components to use the toast
export function useFeedbackToast() {
  const [toastState, setToastStateInternal] = useState({
    message: "",
    isVisible: false,
    type: "success",
  })

  useEffect(() => {
    setToastState = setToastStateInternal
    return () => {
      setToastState = null
      if (toastTimeout) {
        clearTimeout(toastTimeout)
      }
    }
  }, [])

  return toastState
}
