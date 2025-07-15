import type { Language } from "@/types"
import { nameTranslations } from "@/data/translations"

interface TemplateVariables {
  customer: {
    name: string
    phone: string
    country: string
    gender: string
  }
  agentName: string
  itemName: string
  deliveryDate: string
  waitingTime: string
  language: Language
}

export const processTemplate = (template: string, variables: TemplateVariables): string => {
  let processed = template

  // Replace customer name
  if (variables.customer?.name) {
    let customerName = variables.customer.name

    // Only translate to Arabic if the language is set to Arabic
    if (variables.language === "ar" && nameTranslations[variables.customer.name.toLowerCase()]) {
      customerName = nameTranslations[variables.customer.name.toLowerCase()]
    }

    processed = processed.replace(/\[Customer\]/g, customerName)
  } else {
    processed = processed.replace(/\[Customer\]/g, variables.language === "ar" ? "عزيزي العميل" : "valued customer")
  }

  // Replace other variables
  processed = processed.replace(/\[Agent\]/g, variables.agentName || "Customer Service Agent")
  processed = processed.replace(/\[ItemName\]/g, variables.itemName || "")
  processed = processed.replace(/\[DeliveryDate\]/g, variables.deliveryDate || "")
  processed = processed.replace(/\[WaitTime\]/g, variables.waitingTime || "a moment")
  processed = processed.replace(/\[CustomerPhone\]/g, variables.customer?.phone || "")

  return processed.trim()
}
