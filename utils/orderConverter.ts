export const convertOrderToUserId = (orderInput: string): { success: boolean; userId?: string; error?: string } => {
  if (!orderInput.trim()) {
    return { success: false, error: "Please enter an order ID" }
  }

  const cleanInput = orderInput.trim()

  try {
    let processed = cleanInput

    // Step 1: Remove shipment suffix (e.g., "-1", "-2", etc.)
    if (processed.includes("-")) {
      processed = processed.split("-")[0]
    }

    // Step 2: Remove first character if it's a letter (typically "A")
    if (processed.length > 0 && /^[A-Za-z]/.test(processed)) {
      processed = processed.substring(1)
    }

    // Step 3: Remove last 5 characters
    if (processed.length > 5) {
      const userId = processed.substring(0, processed.length - 5)
      return { success: true, userId }
    } else {
      return { success: false, error: "Order ID too short - need at least 6 characters after processing" }
    }
  } catch (error) {
    return { success: false, error: "Invalid order ID format" }
  }
}
