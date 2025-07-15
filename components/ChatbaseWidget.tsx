"use client"

import { useEffect } from "react"

interface ChatbaseWidgetProps {
  userId?: string
}

export default function ChatbaseWidget({ userId }: ChatbaseWidgetProps) {
  useEffect(() => {
    // Initialize Chatbase with user identity if provided
    if (userId && typeof window !== "undefined" && window.chatbase) {
      // Generate HMAC hash for user verification
      // Note: In production, this should be done on the server side
      const initializeUser = async () => {
        try {
          // Call your API endpoint to get the hash
          const response = await fetch("/api/chatbase-auth", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
          })

          if (response.ok) {
            const { hash } = await response.json()
            window.chatbase("identify", {
              userId: userId,
              userHash: hash,
            })
          }
        } catch (error) {
          console.error("Failed to initialize Chatbase with user:", error)
        }
      }

      initializeUser()
    }
  }, [userId])

  return null // This component doesn't render anything visible
}
