// Chatbase utility functions for identity verification
import crypto from "crypto"

const CHATBASE_SECRET = process.env.CHATBASE_SECRET_KEY || "your-secret-key-here"

export function generateChatbaseHash(userId: string): string {
  return crypto.createHmac("sha256", CHATBASE_SECRET).update(userId).digest("hex")
}

export function initializeChatbaseWithUser(userId: string) {
  if (typeof window !== "undefined" && window.chatbase) {
    const hash = generateChatbaseHash(userId)
    window.chatbase("identify", {
      userId: userId,
      userHash: hash,
    })
  }
}

// Type declaration for chatbase
declare global {
  interface Window {
    chatbase: any
  }
}
