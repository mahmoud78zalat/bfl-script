export function analyzeCustomerMessage(message: string): string[] {
  const suggestions: string[] = []
  const lowerMessage = message.toLowerCase()

  // Analyze message content and suggest templates
  if (lowerMessage.includes("complaint") || lowerMessage.includes("defective") || lowerMessage.includes("damaged")) {
    suggestions.push("ITEM_COMPLAINT")
  }

  if (lowerMessage.includes("invoice") || lowerMessage.includes("receipt")) {
    suggestions.push("INVOICE_REQUEST")
  }

  if (lowerMessage.includes("cancel") && lowerMessage.includes("order")) {
    suggestions.push("ORDER_CANCELLATION")
  }

  if (lowerMessage.includes("cancel") && lowerMessage.includes("return")) {
    suggestions.push("RETURN_CANCELLATION")
  }

  if (lowerMessage.includes("arn") || lowerMessage.includes("return number")) {
    suggestions.push("ARN_REQUEST")
  }

  if (lowerMessage.includes("pod") || lowerMessage.includes("proof of delivery")) {
    suggestions.push("POD_REQUEST")
  }

  if (lowerMessage.includes("discount") || lowerMessage.includes("coupon") || lowerMessage.includes("promo")) {
    suggestions.push("DISCOUNT_CODE_ISSUE")
  }

  if (lowerMessage.includes("call") || lowerMessage.includes("speak") || lowerMessage.includes("manager")) {
    suggestions.push("CALL_ESCALATION")
  }

  if (lowerMessage.includes("status") || lowerMessage.includes("update")) {
    suggestions.push("CHANGE_ITEM_STATUS")
  }

  if (lowerMessage.includes("otp") || lowerMessage.includes("verification code")) {
    suggestions.push("OTP_REQUEST")
  }

  if (lowerMessage.includes("unverify") || lowerMessage.includes("remove verification")) {
    suggestions.push("UNVERIFY_REQUEST")
  }

  if (lowerMessage.includes("return") && lowerMessage.includes("outside")) {
    suggestions.push("RPU_OUTSIDE_UAE")
  }

  if (lowerMessage.includes("pickup") || lowerMessage.includes("collect")) {
    suggestions.push("RPU_FOLLOW_UP")
  }

  if (lowerMessage.includes("hold") || lowerMessage.includes("delay")) {
    suggestions.push("HOLD_ORDER")
  }

  if (lowerMessage.includes("delivery") || lowerMessage.includes("deliver")) {
    suggestions.push("PUSH_FOR_DELIVERY")
  }

  if (lowerMessage.includes("expedite") || lowerMessage.includes("urgent")) {
    suggestions.push("EXPEDITE_DELIVERY_REQUEST")
  }

  if (lowerMessage.includes("refund") && lowerMessage.includes("delay")) {
    suggestions.push("DELAYED_REFUND")
  }

  return suggestions
}

// Export alias for backward compatibility
export const analyzeMessage = analyzeCustomerMessage
