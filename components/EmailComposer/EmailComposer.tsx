"use client"

import { useState, useEffect } from "react"
import { emailTemplates, queueAssignments } from "@/data/emailTemplates"
import { copyToClipboard } from "@/utils/clipboard"
import FeedbackToast, { useFeedbackToast, showFeedbackToast } from "@/components/UI/FeedbackToast"

interface EmailComposerProps {
  agentName: string
  onClose: () => void
  onShowFeedback: (message: string) => void
}

export default function EmailComposer({ agentName, onClose, onShowFeedback }: EmailComposerProps) {
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [emailFields, setEmailFields] = useState<Record<string, string>>({})
  const [customFields, setCustomFields] = useState<Array<{ label: string; value: string }>>([])
  const [composedSubject, setComposedSubject] = useState("")
  const [composedEmail, setComposedEmail] = useState("")
  const [showCancellationOptions, setShowCancellationOptions] = useState(false)

  // Use the feedback toast hook
  const toastState = useFeedbackToast()

  const handleTemplateChange = (templateKey: string) => {
    if (templateKey === "CANCELLATION") {
      setShowCancellationOptions(true)
      return
    }

    setShowCancellationOptions(false)
    setSelectedTemplate(templateKey)
    setEmailFields({})
    setCustomFields([])

    if (templateKey && emailTemplates[templateKey]) {
      const template = emailTemplates[templateKey]
      const initialFields: Record<string, string> = {}
      template.fields.forEach((field) => {
        initialFields[field] = ""
      })
      setEmailFields(initialFields)
    }
  }

  const handleCancellationChoice = (choice: string) => {
    setShowCancellationOptions(false)
    setSelectedTemplate(choice)
    setEmailFields({})
    setCustomFields([])

    if (choice && emailTemplates[choice]) {
      const template = emailTemplates[choice]
      const initialFields: Record<string, string> = {}
      template.fields.forEach((field) => {
        initialFields[field] = ""
      })
      setEmailFields(initialFields)
    }
  }

  const updateEmailField = (fieldName: string, value: string) => {
    setEmailFields((prev) => ({ ...prev, [fieldName]: value }))
  }

  const addCustomField = () => {
    setCustomFields((prev) => [...prev, { label: "", value: "" }])
  }

  const updateCustomField = (index: number, type: "label" | "value", value: string) => {
    setCustomFields((prev) => prev.map((field, i) => (i === index ? { ...field, [type]: value } : field)))
  }

  const removeCustomField = (index: number) => {
    setCustomFields((prev) => prev.filter((_, i) => i !== index))
  }

  const generateEmailSubject = () => {
    if (!selectedTemplate) return ""

    const template = emailTemplates[selectedTemplate]
    if (!template) return ""

    let subject = template.subjectPrefix

    if (selectedTemplate === "OTP_REQUEST") {
      const customerPhone = emailFields["Customer Phone"] || ""
      if (customerPhone) {
        subject += ` | ${customerPhone}`
      }
      return subject
    }

    if (
      selectedTemplate === "ARN_REQUEST" ||
      selectedTemplate === "POD_REQUEST" ||
      selectedTemplate === "RPU_FOLLOW_UP" ||
      selectedTemplate === "EXPEDITE_DELIVERY_REQUEST" ||
      selectedTemplate === "RETURN_CANCELLATION" ||
      selectedTemplate === "DELAYED_REFUND"
    ) {
      const orderID = emailFields["Order ID"] || ""
      const awb = emailFields["AWB"] || ""
      if (orderID || awb) {
        subject += ` ${orderID} || ${awb}`
      }
      return subject
    }

    // For other templates, add Order ID and AWB if available
    const orderID = emailFields["Order ID"] || ""
    const awb = emailFields["AWB"] || ""

    if (orderID) subject += ` | ${orderID}`
    if (awb) subject += ` | ${awb}`

    return subject
  }

  const generateEmailBody = () => {
    if (!selectedTemplate) return ""

    const template = emailTemplates[selectedTemplate]
    if (!template) return ""

    let body = ""

    // Special handling for EXPEDITE_DELIVERY_REQUEST which has a predefined body
    if (selectedTemplate === "EXPEDITE_DELIVERY_REQUEST" && template.body) {
      body = template.body

      // Replace placeholders with actual values
      body = body.replace(/\[DeliveryDate\]/g, emailFields["DeliveryDate"] || "[DeliveryDate]")
      body = body.replace(/\[Reason\]/g, emailFields["Reason"] || "[Reason]")
      body = body.replace(/\[OrderID\]/g, emailFields["OrderID"] || "[OrderID]")
      body = body.replace(/\[AWB\]/g, emailFields["AWB"] || "[AWB]")
      body = body.replace(/\[AgentName\]/g, agentName || "[AgentName]")

      return body
    }

    // For all other templates, generate body based on fields
    body = "Dear Team,\n\nGood Day!\n\n"

    // Add template-specific content
    if (selectedTemplate === "INVOICE_REQUEST") {
      body += "Kindly need your assistance with providing the invoice number for this:\n\n"
    } else if (selectedTemplate === "ARN_REQUEST") {
      const orderID = emailFields["Order ID"] || "[Order ID]"
      const awb = emailFields["AWB"] || "[AWB]"
      body += `Kindly share the ARN for this return ${orderID} || ${awb}\n\n`
    } else if (selectedTemplate === "POD_REQUEST") {
      const orderID = emailFields["Order ID"] || "[Order ID]"
      const awb = emailFields["AWB"] || "[AWB]"
      body += `Kindly seeking for assistance to prove this order is delivered, as the customer said that he didnt receive it. ${orderID} | ${awb}\n\n`
    } else if (selectedTemplate === "RPU_FOLLOW_UP") {
      body = "Dear LMT,\n\nGreetings!\n\n"
      body +=
        "Seeking your kind assistance to ensure the collection of the return from the below location at the earliest possible time, as the customer has urgently requested:\n\n"

      const pickupAddress = emailFields["Pickup address"] || "[Pickup address]"
      const orderID = emailFields["Order ID"] || "[Order ID]"
      const awb = emailFields["AWB"] || "[AWB]"

      body += `${pickupAddress}\n`
      body += `${orderID} | ${awb}\n\n`
    } else if (selectedTemplate === "RETURN_CANCELLATION") {
      body = "Dear team,\n\nGreetings of the day!\n\n"
      body += "Kindly seeking your assistance to cancel this return request as a customer request.\n\n"

      const orderID = emailFields["Order ID"] || "[Order ID]"
      const awb = emailFields["AWB"] || "[AWB]"
      body += `${orderID}\n${awb}\n\n`
    } else if (selectedTemplate === "DELAYED_REFUND") {
      body = "Dear Team,\n\n"
      body += "Kindly initiate the refund of the below order.\n\n"

      const orderID = emailFields["Order ID"] || "[Order ID]"
      const awb = emailFields["AWB"] || "[AWB]"
      const reason = emailFields["Reason"] || "[Reason]"

      body += `${orderID} || ${awb}\n`
      body += `${reason}\n\n`
    } else if (selectedTemplate === "UNVERIFY_REQUEST") {
      body = "Dear TL,\n\nGood Day!\n\n"
      body += "As requested by the customer, I'd like your help unverifying the mobile number below.\n\n"
      body += "Please review the information below for your reference:\n\n"
    } else if (selectedTemplate === "HOLD_ORDER") {
      const orderID = emailFields["Order ID"] || "[Order ID]"
      const awb = emailFields["AWB"] || "[AWB]"
      const holdDate = emailFields["Hold Date"] || "[Hold Date]"
      body += `Kindly hold this order ${orderID} ${awb} until ${holdDate} as per customer request.\n\n`
    } else if (selectedTemplate === "PUSH_FOR_DELIVERY") {
      const orderID = emailFields["Order ID"] || "[Order ID]"
      const awb = emailFields["AWB"] || "[AWB]"
      const holdTime = emailFields["Hold Time"] || "[Hold Time]"
      body += `Kindly arrange the delivery of ${orderID} ${awb} as it's been on hold since ${holdTime}.\n\n`
    } else if (selectedTemplate === "RPU_OUTSIDE_UAE") {
      body = "Dear LMT,\n\nGood Day!\n\n"
      body += "For your assistance to create a return request for the customer below.\n\n"
    } else if (selectedTemplate === "ITEM_COMPLAINT") {
      body += "Seeking assistance regarding a complaint.\n\n"
    } else if (selectedTemplate === "CHANGE_ITEM_STATUS") {
      body += "Kindly update the status of this order\n\n"
    } else if (selectedTemplate === "ORDER_CANCELLATION") {
      body += "Please cancel the order as the customer no longer needs it.\n\n"
    } else if (selectedTemplate === "DISCOUNT_CODE_ISSUE") {
      body += "I would like to raise a case regarding a discount code issue.\n\n"
    } else if (selectedTemplate === "OTP_REQUEST") {
      body += "Please assist in sending the OTP to the customer.\n\n"
    } else if (selectedTemplate === "CALL_ESCALATION") {
      body += "Please assist with the following call escalation request.\n\n"
    }

    // Add all template fields (skip already handled fields for specific templates)
    const skipFields = ["Order ID", "AWB", "Pickup address", "Hold Date", "Hold Time", "Reason"]
    const shouldSkipField = (field: string) => {
      if (selectedTemplate === "RPU_FOLLOW_UP" && skipFields.includes(field)) return true
      if (selectedTemplate === "RETURN_CANCELLATION" && ["Order ID", "AWB"].includes(field)) return true
      if (selectedTemplate === "DELAYED_REFUND" && ["Order ID", "AWB", "Reason"].includes(field)) return true
      if (selectedTemplate === "HOLD_ORDER" && ["Order ID", "AWB", "Hold Date"].includes(field)) return true
      if (selectedTemplate === "PUSH_FOR_DELIVERY" && ["Order ID", "AWB", "Hold Time"].includes(field)) return true
      if (selectedTemplate === "ARN_REQUEST" && ["Order ID", "AWB"].includes(field)) return true
      if (selectedTemplate === "POD_REQUEST" && ["Order ID", "AWB"].includes(field)) return true
      return false
    }

    Object.entries(emailFields).forEach(([field, value]) => {
      if (value.trim() && !shouldSkipField(field)) {
        body += `${field}: ${value}\n`
      }
    })

    // Add custom fields
    customFields.forEach((field) => {
      if (field.label.trim() && field.value.trim()) {
        body += `${field.label}: ${field.value}\n`
      }
    })

    // Add special field for UNVERIFY_REQUEST
    if (selectedTemplate === "UNVERIFY_REQUEST") {
      body += "Did you inform the customer that points will not be transferred to the new account?: yes\n"
    }

    // Add closing
    if (selectedTemplate === "DELAYED_REFUND") {
      body += "Thank you!\n"
    } else if (
      Object.keys(emailFields).some((key) => emailFields[key].trim()) ||
      customFields.some((field) => field.label.trim() && field.value.trim())
    ) {
      body += "\nThank you.\n"
    }

    body += `\nBest Regards,\n${agentName || "CS Agent"}\nCS Agent`

    // Special handling for ARN_REQUEST
    if (selectedTemplate === "ARN_REQUEST") {
      body += "\nThank you"
    }

    // Special handling for POD_REQUEST
    if (selectedTemplate === "POD_REQUEST") {
      body += "\nThank you"
    }

    return body
  }

  const copyEmailToClipboard = async () => {
    try {
      const emailText = `Subject: ${composedSubject}\n\n${composedEmail}`
      const success = await copyToClipboard(emailText)
      if (success) {
        showFeedbackToast("✨ Email copied successfully!", "success")
        onShowFeedback("✨ Email copied successfully!")
      } else {
        showFeedbackToast("❌ Failed to copy email", "error")
        onShowFeedback("❌ Failed to copy email")
      }
    } catch (err) {
      showFeedbackToast("❌ Failed to copy email", "error")
      onShowFeedback("❌ Failed to copy email")
    }
  }

  const copySubjectToClipboard = async () => {
    const success = await copyToClipboard(composedSubject)
    if (success) {
      showFeedbackToast("✨ Subject copied!", "success")
      onShowFeedback("✨ Subject copied!")
    } else {
      showFeedbackToast("❌ Failed to copy subject", "error")
      onShowFeedback("❌ Failed to copy subject")
    }
  }

  const copyBodyToClipboard = async () => {
    const success = await copyToClipboard(composedEmail)
    if (success) {
      showFeedbackToast("✨ Email body copied!", "success")
      onShowFeedback("✨ Email body copied!")
    } else {
      showFeedbackToast("❌ Failed to copy email body", "error")
      onShowFeedback("❌ Failed to copy email body")
    }
  }

  const resetComposer = () => {
    setSelectedTemplate("")
    setEmailFields({})
    setCustomFields([])
    setShowCancellationOptions(false)
  }

  // Update email content when fields change
  useEffect(() => {
    setComposedSubject(generateEmailSubject())
    setComposedEmail(generateEmailBody())
  }, [selectedTemplate, emailFields, customFields, agentName])

  return (
    <>
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 z-40 overflow-y-auto animate-in slide-in-from-right duration-300">
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Back Button */}
          <div className="mb-8">
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2"
            >
              <span className="text-lg">←</span>
              <span>Back to Main Tool</span>
            </button>
          </div>

          {/* Email Composer Header */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8">
            <div className="p-8 border-b border-gray-100">
              <h2 className="text-4xl font-bold text-gray-800 flex items-center">
                <span className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mr-4">
                  <span className="text-white text-3xl">✉️</span>
                </span>
                Email Composer
              </h2>
              <p className="text-gray-600 text-lg mt-2">Create professional support emails quickly and consistently</p>
            </div>
          </div>

          {/* Queue Assignment Warning Box */}
          {selectedTemplate && queueAssignments[selectedTemplate] && (
            <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-6 mb-8 shadow-lg">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-white text-2xl">⚠️</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-red-800 mb-2">Queue Assignment Required</h3>
                  <p className="text-red-700 text-lg">
                    <span className="font-semibold">Assign this email to:</span> {queueAssignments[selectedTemplate]}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Panel - Email Configuration */}
            <div className="space-y-6">
              {/* Template Selection */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-sm">📋</span>
                  </span>
                  Select Email Template
                </h3>
                <div className="relative">
                  <select
                    value={showCancellationOptions ? "CANCELLATION" : selectedTemplate}
                    onChange={(e) => handleTemplateChange(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white cursor-pointer relative z-10 text-gray-900"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                      backgroundPosition: "right 0.5rem center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "1.5em 1.5em",
                    }}
                  >
                    <option value="" className="text-gray-900">
                      Choose a template...
                    </option>
                    {Object.entries(emailTemplates)
                      .filter(([key]) => !["ORDER_CANCELLATION", "RETURN_CANCELLATION"].includes(key))
                      .map(([key, template]) => (
                        <option key={key} value={key} className="text-gray-900">
                          {template.name}
                        </option>
                      ))}
                    <option value="CANCELLATION" className="text-gray-900">
                      🛑 Cancellation
                    </option>
                  </select>
                </div>
              </div>

              {/* Cancellation Options Modal */}
              {showCancellationOptions && (
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 relative z-20">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-sm">🛑</span>
                    </span>
                    Choose Cancellation Type
                  </h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => handleCancellationChoice("ORDER_CANCELLATION")}
                      className="w-full p-4 text-left bg-gray-50 hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-300 rounded-xl transition-all duration-200"
                    >
                      <div className="font-semibold text-gray-800">🛑 Order Cancellation</div>
                      <div className="text-sm text-gray-600 mt-1">Cancel a customer's order</div>
                    </button>
                    <button
                      onClick={() => handleCancellationChoice("RETURN_CANCELLATION")}
                      className="w-full p-4 text-left bg-gray-50 hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-300 rounded-xl transition-all duration-200"
                    >
                      <div className="font-semibold text-gray-800">🔄 Return Cancellation</div>
                      <div className="text-sm text-gray-600 mt-1">Cancel a return request</div>
                    </button>
                  </div>
                  <button
                    onClick={() => setShowCancellationOptions(false)}
                    className="mt-4 text-sm text-gray-500 hover:text-gray-700"
                  >
                    ← Back to template selection
                  </button>
                </div>
              )}

              {/* Template Fields */}
              {selectedTemplate && !showCancellationOptions && (
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                      <span className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-sm">📝</span>
                      </span>
                      Template Fields
                    </h3>
                    <button
                      onClick={resetComposer}
                      className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg text-sm hover:from-orange-600 hover:to-red-600 transition-all duration-200"
                    >
                      🔄 Reset
                    </button>
                  </div>
                  <div className="space-y-4">
                    {emailTemplates[selectedTemplate].fields.map((field) => (
                      <div key={field}>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">{field}</label>
                        <input
                          type="text"
                          value={emailFields[field] || ""}
                          onChange={(e) => updateEmailField(field, e.target.value)}
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white text-gray-900 placeholder-gray-500"
                          placeholder={`Enter ${field.toLowerCase()}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Custom Fields */}
              {selectedTemplate && !showCancellationOptions && (
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                      <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-sm">➕</span>
                      </span>
                      Custom Fields
                    </h3>
                    <button
                      onClick={addCustomField}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg text-sm hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                    >
                      + Add Field
                    </button>
                  </div>
                  {customFields.length === 0 && (
                    <p className="text-gray-500 text-sm mb-4">
                      No custom fields added yet. Click "Add Field" to add custom information.
                    </p>
                  )}
                  {customFields.map((field, index) => (
                    <div key={index} className="flex space-x-2 mb-3">
                      <input
                        type="text"
                        value={field.label}
                        onChange={(e) => updateCustomField(index, "label", e.target.value)}
                        placeholder="Field name"
                        className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white text-gray-900 placeholder-gray-500"
                      />
                      <input
                        type="text"
                        value={field.value}
                        onChange={(e) => updateCustomField(index, "value", e.target.value)}
                        placeholder="Field value"
                        className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white text-gray-900 placeholder-gray-500"
                      />
                      <button
                        onClick={() => removeCustomField(index)}
                        className="px-3 py-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Panel - Email Preview */}
            <div className="space-y-6">
              {/* Subject Preview */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                    <span className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-sm">📝</span>
                    </span>
                    Subject Line
                  </h3>
                  {composedSubject && (
                    <button
                      onClick={copySubjectToClipboard}
                      className="text-sm text-blue-600 hover:text-blue-800 px-3 py-1 rounded hover:bg-blue-50 transition-colors"
                    >
                      📋 Copy Subject
                    </button>
                  )}
                </div>
                <textarea
                  value={composedSubject}
                  onChange={(e) => setComposedSubject(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white text-gray-900 placeholder-gray-500"
                  rows={2}
                  placeholder="Select a template to generate subject..."
                />
              </div>

              {/* Email Body Preview */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                    <span className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-sm">📧</span>
                    </span>
                    Email Body
                  </h3>
                  {composedEmail && (
                    <button
                      onClick={copyBodyToClipboard}
                      className="text-sm text-blue-600 hover:text-blue-800 px-3 py-1 rounded hover:bg-blue-50 transition-colors"
                    >
                      📋 Copy Body
                    </button>
                  )}
                </div>
                <textarea
                  value={composedEmail}
                  onChange={(e) => setComposedEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white text-gray-900 placeholder-gray-500"
                  rows={15}
                  placeholder="Select a template and fill fields to generate email..."
                />
              </div>

              {/* Copy Full Email Button */}
              {composedEmail && composedSubject && !showCancellationOptions && (
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                  <button
                    onClick={copyEmailToClipboard}
                    className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white py-4 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
                  >
                    <span className="text-2xl">📧</span>
                    <span className="text-lg">Copy Complete Email</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Toast */}
      <FeedbackToast
        message={toastState.message}
        isVisible={toastState.isVisible}
        type={toastState.type as "success" | "error" | "info" | "warning"}
      />
    </>
  )
}
