export interface EmailTemplate {
  name: string
  subjectPrefix: string
  fields: string[]
  body?: string
  queue?: string
}

export interface CustomerInfo {
  name?: string
  email?: string
  phone?: string
  orderId?: string
  customerId?: string
}

export interface FeedbackToastState {
  message: string
  isVisible: boolean
  type: "success" | "error" | "info" | "warning"
}

export interface Customer {
  name: string
  phone: string
  country: string
  gender: string
}

export interface Agent {
  name: string
}

export type Language = "en" | "ar"
export type TabId = "customer-info" | "order-converter" | "additional-info" // Removed "smart-recommendations"
