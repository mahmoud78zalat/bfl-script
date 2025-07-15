import type { EmailTemplate } from "@/types"

export const emailTemplates: Record<string, EmailTemplate> = {
  ITEM_COMPLAINT: {
    id: "item-complaint",
    name: "🧥 Item Complaint",
    emoji: "🛍️",
    category: "complaints",
    subject: "Regarding Your Recent Order - We're Here to Help",
    content: `Dear {{customerName}},

Thank you for reaching out to us regarding your recent order {{orderNumber}}.

I sincerely apologize for any inconvenience you've experienced with your purchase. Your satisfaction is our top priority, and I want to make this right for you.

Based on your message, I understand that you're facing issues with {{issueDescription}}. Here's what I can do to help:

• I will immediately escalate this to our quality team for investigation
• We can arrange for a replacement item to be sent to you
• If you prefer, we can process a full refund for the affected item(s)
• I will personally monitor this case to ensure swift resolution

Could you please provide the following information to help me assist you better:
- Photos of the item (if applicable)
- Your preferred resolution (replacement/refund)
- Best contact number for updates

I will follow up with you within 24 hours with a concrete solution.

Thank you for your patience and for giving us the opportunity to make this right.

Best regards,
{{agentName}}
Customer Care Team
{{companyName}}`,
    description: "Use when customer complains about product quality or defects",
    keywords: ["complaint", "defective", "broken", "damaged", "quality", "issue", "problem", "wrong item"],
    fields: [
      "Reason",
      "Customer Name",
      "Customer ID",
      "Ticket Link",
      "Order ID",
      "Delivered/Received Date",
      "Item Code",
      "Item Description",
      "Action Taken",
      "Received complaint from",
    ],
    subjectPrefix: "ITEM COMPLAINT",
  },
  INVOICE_REQUEST: {
    id: "invoice-request",
    name: "📄 Invoice Request",
    emoji: "🧾",
    category: "documentation",
    subject: "Your Invoice Request - Order {{orderNumber}}",
    content: `Dear {{customerName}},

Thank you for contacting us regarding the invoice for your order {{orderNumber}}.

I'm happy to help you with your invoice request. Here are the details:

Order Information:
- Order Number: {{orderNumber}}
- Order Date: {{orderDate}}
- Total Amount: {{orderTotal}}

I will send your detailed invoice to your registered email address ({{customerEmail}}) within the next 2 hours.

The invoice will include:
• Itemized breakdown of all products
• Applicable taxes and fees
• Payment method used
• Delivery address

If you need the invoice in a specific format or have any special requirements, please let me know and I'll be happy to accommodate.

Is there anything else I can help you with regarding your order?

Best regards,
{{agentName}}
Customer Care Team
{{companyName}}`,
    description: "Use when customer requests invoice or receipt",
    keywords: ["invoice", "receipt", "bill", "tax", "document", "proof of purchase"],
    fields: [
      "Mobile number",
      "Store Name",
      "Date And Time Of Purchase",
      "Item Code",
      "Item Price",
      "Total Amount Of The Invoice",
      "Last four digits of CC/cash",
      "Active email address",
    ],
    subjectPrefix: "INVOICE REQUEST",
  },
  ORDER_CANCELLATION: {
    id: "cancellation",
    name: "🛑 Order Cancellation",
    emoji: "🛑",
    category: "cancellation",
    subject: "Order Cancellation Confirmation - {{orderNumber}}",
    content: `Dear {{customerName}},

I've received your request to cancel order {{orderNumber}} and I'm here to help you with this process.

Cancellation Request Details:
- Order Number: {{orderNumber}}
- Order Date: {{orderDate}}
- Order Value: {{orderValue}}
- Current Status: {{currentOrderStatus}}
- Cancellation Reason: {{cancellationReason}}

Cancellation Status:
{{cancellationStatus}}

If Cancellation is Possible:
✅ Order processing will be stopped immediately
✅ Full refund will be processed
✅ Refund timeline: {{refundTimeline}}
✅ Confirmation email will be sent

If Order Already Shipped:
• You can refuse delivery for automatic return
• Return process will be initiated
• Refund after return inspection
• Return shipping: Free of charge

Refund Information:
- Refund Method: {{refundMethod}}
- Refund Amount: {{refundAmount}}
- Processing Time: {{refundProcessingTime}}
- Expected Credit: {{expectedCreditDate}}

Alternative Options:
If you'd like to consider alternatives:
• Exchange for different items
• Store credit for future purchases
• Modify delivery address or date
• Hold order for later delivery

Next Steps:
1. {{nextStep1}}
2. {{nextStep2}}
3. {{nextStep3}}

I want to ensure you're completely satisfied with the resolution. If you have any questions or would like to explore alternatives, please let me know.

Thank you for giving us the opportunity to assist you.

Best regards,
{{agentName}}
Customer Care Team
{{companyName}}`,
    description: "Use when customer wants to cancel an order",
    keywords: ["cancel", "cancellation", "don't want", "remove order", "stop order"],
    fields: ["Order ID"],
    subjectPrefix: "CANCEL ORDER",
  },
  RETURN_CANCELLATION: {
    id: "return-cancellation",
    name: "🔄 Return Cancellation",
    emoji: "🔄",
    category: "returns",
    subject: "Return Cancellation Confirmation - {{orderNumber}}",
    content: `Dear {{customerName}},

Thank you for your request to cancel the return of order {{orderNumber}}.

I've received your request and I'm here to help you with this process.

Return Cancellation Request Details:
- Order Number: {{orderNumber}}
- AWB: {{awb}}
- Return Reason: {{returnReason}}

Return Cancellation Status:
{{cancellationStatus}}

If Return Cancellation is Possible:
✅ Return request will be stopped immediately
✅ Refund will be processed if applicable
✅ Refund timeline: {{refundTimeline}}
✅ Confirmation email will be sent

If Return Already Processed:
• You can contact our returns team for further assistance
• Refund after return inspection
• Return shipping: Free of charge

Refund Information:
- Refund Method: {{refundMethod}}
- Refund Amount: {{refundAmount}}
- Processing Time: {{refundProcessingTime}}
- Expected Credit: {{expectedCreditDate}}

Alternative Options:
If you'd like to consider alternatives:
• Exchange for different items
• Store credit for future purchases
• Modify delivery address or date
• Hold order for later delivery

Next Steps:
1. {{nextStep1}}
2. {{nextStep2}}
3. {{nextStep3}}

I want to ensure you're completely satisfied with the resolution. If you have any questions or would like to explore alternatives, please let me know.

Thank you for giving us the opportunity to assist you.

Best regards,
{{agentName}}
Customer Care Team
{{companyName}}`,
    description: "Use when customer wants to cancel a return",
    keywords: ["cancel return", "return cancellation", "don't want return", "remove return", "stop return"],
    fields: ["Order ID", "AWB"],
    subjectPrefix: "RETURN CANCELLATION",
  },
  ARN_REQUEST: {
    id: "arn-request",
    name: "🔄 ARN Request",
    emoji: "🔢",
    category: "refunds",
    subject: "ARN Details for Your Refund - Order {{orderNumber}}",
    content: `Dear {{customerName}},

Thank you for your inquiry about the ARN (Acquirer Reference Number) for your refund related to order {{orderNumber}}.

I understand you need the ARN details for tracking your refund with your bank. Here's the information:

Refund Details:
- Order Number: {{orderNumber}}
- Refund Amount: {{refundAmount}}
- Refund Date: {{refundDate}}
- ARN: {{arnNumber}}
- Expected Credit Timeline: 5-7 business days

Please note:
• The ARN helps your bank locate the refund transaction
• Refund processing time may vary depending on your bank
• You can share this ARN with your bank if they require it

If your refund doesn't reflect in your account within 7 business days, please contact your bank with the ARN number provided above.

Feel free to reach out if you need any additional assistance or have questions about your refund.

Best regards,
{{agentName}}
Customer Care Team
{{companyName}}`,
    description: "Use when customer requests ARN for refund tracking",
    keywords: ["ARN", "refund", "bank", "reference number", "transaction", "credit"],
    fields: ["Order ID", "AWB"],
    subjectPrefix: "ARN REQUEST",
  },
  POD_REQUEST: {
    id: "pod-request",
    name: "📋 POD Request",
    emoji: "📦",
    category: "delivery",
    subject: "Proof of Delivery - Order {{orderNumber}}",
    content: `Dear {{customerName}},

Thank you for requesting the Proof of Delivery (POD) for your order {{orderNumber}}.

I'm pleased to confirm that your order was successfully delivered:

Delivery Details:
- Order Number: {{orderNumber}}
- Delivery Date: {{deliveryDate}}
- Delivery Time: {{deliveryTime}}
- Delivered To: {{deliveryAddress}}
- Received By: {{recipientName}}

I will email you the official POD document within the next hour to your registered email address ({{customerEmail}}). The document will include:

• Delivery confirmation with timestamp
• Recipient signature (if available)
• Delivery agent details
• Photo proof (if available)

If you need the POD in a specific format or have any questions about the delivery, please don't hesitate to reach out.

Thank you for choosing {{companyName}}!

Best regards,
{{agentName}}
Customer Care Team
{{companyName}}`,
    description: "Use when customer requests proof of delivery",
    keywords: ["POD", "proof of delivery", "delivered", "confirmation", "receipt"],
    fields: ["Order ID", "AWB"],
    subjectPrefix: "POD REQUEST",
  },
  DISCOUNT_CODE_ISSUE: {
    id: "discount-code-issue",
    name: "🏷 Discount Code Issue",
    emoji: "🎫",
    category: "promotions",
    subject: "Discount Code Issue Resolution - We've Got You Covered",
    content: `Dear {{customerName}},

Thank you for reaching out about the discount code issue you experienced.

I sincerely apologize for the inconvenience with the discount code {{discountCode}}. I understand how frustrating this must be, especially when you're trying to complete your purchase.

Here's what I'm doing to resolve this immediately:

✅ I've verified the discount code status
✅ I can see the issue on our end
✅ I'm applying the discount manually to your account

Resolution Options:
1. I can apply the discount directly to your current cart
2. I can create a new, personalized discount code for you
3. I can process your order with the discount applied retroactively

The discount value is {{discountValue}}, and I want to ensure you receive the full benefit.

To proceed, please let me know:
- Your preferred resolution method
- If you'd like to complete the purchase now
- Any other items you'd like to add to your order

I'll have this resolved within the next 30 minutes. Thank you for your patience!

Best regards,
{{agentName}}
Customer Care Team
{{companyName}}`,
    description: "Use when customer has issues with discount codes or promotions",
    keywords: ["discount", "coupon", "promo code", "offer", "not working", "expired"],
    fields: ["Customer tried to use coupon", "But system rejected it because", "Order ID", "Mobile Number"],
    subjectPrefix: "DISCOUNT CODE ISSUE",
  },
  CALL_ESCALATION: {
    id: "call-escalation",
    name: "☎️ Call Escalation",
    emoji: "📞",
    category: "escalation",
    subject: "Priority Call Scheduled - We're Here to Help",
    content: `Dear {{customerName}},

Thank you for your message regarding order {{orderNumber}}. I understand the urgency of your concern and want to provide you with immediate, personalized assistance.

I'm escalating your case for a priority phone call from our senior customer care specialist.

Call Details:
- Priority Level: High
- Estimated Call Time: Within 2 hours
- Call Duration: Up to 30 minutes
- Direct Line: We'll call you at {{customerPhone}}

What to Expect:
• A senior specialist will call you directly
• Complete review of your order and concerns
• Immediate resolution or clear action plan
• Direct contact information for follow-up

Before the call, I've already:
✅ Reviewed your complete order history
✅ Prepared your case file for the specialist
✅ Flagged your account for priority handling

If the provided phone number needs to be updated or if you prefer a specific time for the call, please reply immediately.

Your satisfaction is our priority, and we're committed to resolving this to your complete satisfaction.

Best regards,
{{agentName}}
Customer Care Team
{{companyName}}`,
    description: "Use when escalating to phone support",
    keywords: ["call", "phone", "speak", "talk", "urgent", "escalate", "manager"],
    fields: [
      "Issue",
      "Customer Concern",
      "Customer Request",
      "Clarified to Customer",
      "Manager response time",
      "Priority status",
      "Mobile Number",
    ],
    subjectPrefix: "CALL ESCALATION",
  },
  CHANGE_ITEM_STATUS: {
    id: "change-item-status",
    name: "🛠 Change Status of Item",
    emoji: "🔄",
    category: "order-management",
    subject: "Order Status Update - {{orderNumber}}",
    content: `Dear {{customerName}},

Thank you for your request to update the status of items in your order {{orderNumber}}.

I've successfully processed your request and here's the updated information:

Order Status Changes:
- Previous Status: {{previousStatus}}
- New Status: {{newStatus}}
- Updated Date: {{updateDate}}
- Estimated Timeline: {{estimatedTimeline}}

What This Means:
• {{statusExplanation}}
• Next steps in the process: {{nextSteps}}
• You'll receive updates at each milestone

Tracking Information:
- You can track your order at: {{trackingLink}}
- SMS updates will be sent to: {{customerPhone}}
- Email updates will be sent to: {{customerEmail}}

If you have any questions about the status change or need further modifications, please don't hesitate to reach out. I'm here to help!

Thank you for your patience and for choosing {{companyName}}.

Best regards,
{{agentName}}
Customer Care Team
{{companyName}}`,
    description: "Use when changing order or item status",
    keywords: ["status", "change", "update", "modify", "processing", "shipped"],
    fields: ["Order ID", "Item Code", "Requested New Status", "Reason"],
    subjectPrefix: "CHANGE ITEM STATUS",
  },
  OTP_REQUEST: {
    id: "otp-request",
    name: "📲 OTP Request",
    emoji: "🔐",
    category: "security",
    subject: "OTP Verification Assistance",
    content: `Dear {{customerName}},

Thank you for contacting us regarding OTP (One-Time Password) verification.

I understand you're having trouble receiving or using your OTP. Let me help you resolve this quickly:

Current Situation:
- Registered Mobile: {{customerPhone}}
- Last OTP Sent: {{otpSentTime}}
- Purpose: {{otpPurpose}}

Troubleshooting Steps:
1. ✅ I've verified your mobile number is correct
2. ✅ I've checked for any network delays
3. ✅ I've confirmed OTP service is active

Immediate Solutions:
• I can resend a new OTP to your registered number
• I can verify your identity through alternative methods
• I can update your mobile number if needed

Alternative Verification:
If you continue to face issues, I can verify your identity using:
- Order details and purchase history
- Registered email verification
- Security questions

Please reply with:
- Confirmation that {{customerPhone}} is correct
- Whether you'd like me to resend the OTP
- Any error messages you're seeing

I'll resolve this within the next 15 minutes!

Best regards,
{{agentName}}
Customer Care Team
{{companyName}}`,
    description: "Use when customer has OTP verification issues",
    keywords: ["OTP", "verification", "code", "SMS", "not received", "expired"],
    fields: ["Customer Phone"],
    subjectPrefix: "OTP REQUEST",
  },
  UNVERIFY_REQUEST: {
    id: "unverify-request",
    name: "📱 Unverify Request",
    emoji: "❌",
    category: "account",
    subject: "Account Verification Status Update",
    content: `Dear {{customerName}},

Thank you for your request regarding the verification status of your account.

I understand you'd like to modify the verification status, and I'm here to help you with this process.

Current Account Status:
- Account: {{customerEmail}}
- Current Verification: {{currentVerificationStatus}}
- Request Type: {{requestType}}

Important Information:
Unverifying your account may affect:
• Order placement capabilities
• Access to premium features
• Security of your account
• Eligibility for certain promotions

Next Steps:
1. I need to confirm this request for security purposes
2. Please verify your identity by providing:
   - Last order number
   - Registered phone number
   - Reason for unverification

Security Confirmation Required:
For your account protection, I'll need you to confirm:
- You are the account owner
- You understand the implications
- This is a voluntary request

Once confirmed, I can process this request within 24 hours.

If you have any concerns or questions about this process, please let me know. I'm here to ensure your account security and satisfaction.

Best regards,
{{agentName}}
Customer Care Team
{{companyName}}`,
    description: "Use when customer requests account unverification",
    keywords: ["unverify", "verification", "account", "remove", "disable"],
    fields: [
      "Name",
      "Mobile number",
      "Old Email",
      "New Email",
      "Reason for the request",
      "Is there any recent purchase?",
      "Confirm if the customer has access to the email",
      "Confirm if the customer has access to the BFL account",
      "Action taken to verify the request is valid",
      "Confirm if there's any previous request for the same concern",
      "Ticket reference",
    ],
    subjectPrefix: "UNVERIFY REQUEST",
  },
  RPU_OUTSIDE_UAE: {
    id: "rpu-outside-uae",
    name: "🌍 RPU Outside UAE",
    emoji: "🌍",
    category: "delivery",
    subject: "International Delivery Update - Order {{orderNumber}}",
    content: `Dear {{customerName}},

Thank you for your inquiry about delivery to {{deliveryCountry}} for order {{orderNumber}}.

I understand you need your order delivered outside the UAE, and I'm here to provide you with all the necessary information.

International Delivery Details:
- Destination: {{deliveryCountry}}
- Service Available: {{serviceAvailability}}
- Estimated Delivery: {{internationalDeliveryTime}}
- Additional Charges: {{internationalShippingCost}}

Important Information:
• Customs duties may apply based on destination country
• Some items may have shipping restrictions
• Tracking will be available throughout the journey
• Signature confirmation required for delivery

Required Documentation:
- Valid delivery address with postal code
- Recipient contact number
- Customs declaration (handled by us)

Next Steps:
1. I'll verify if all items in your order can be shipped internationally
2. Calculate exact shipping costs and duties
3. Update your delivery address if needed
4. Arrange for international courier pickup

Please confirm:
- Complete delivery address with postal code
- Best contact number for the recipient
- Preferred delivery timeline

I'll have all details ready for you within 2 hours!

Best regards,
{{agentName}}
Customer Care Team
{{companyName}}`,
    description: "Use for international delivery requests outside UAE",
    keywords: ["international", "outside UAE", "abroad", "overseas", "country", "shipping"],
    fields: [
      "Reason for return",
      "Customer Name",
      "Pick up Address",
      "Mobile Number",
      "Active Email Address",
      "Order ID(s)",
      "Item Codes",
      "Refund mode",
    ],
    subjectPrefix: "RPU OUTSIDE UAE",
  },
  RPU_FOLLOW_UP: {
    id: "rpu-follow-up",
    name: "🔄 RPU Follow Up",
    emoji: "📋",
    category: "follow-up",
    subject: "Follow-up on Your Recent Request - Order {{orderNumber}}",
    content: `Dear {{customerName}},

I hope this message finds you well. I'm following up on your recent request regarding order {{orderNumber}}.

Previous Request Summary:
- Date of Request: {{requestDate}}
- Request Type: {{requestType}}
- Current Status: {{currentStatus}}
- Reference Number: {{referenceNumber}}

Update on Your Request:
{{updateDetails}}

Current Progress:
✅ {{completedStep1}}
✅ {{completedStep2}}
🔄 {{inProgressStep}}
⏳ {{pendingStep}}

What's Next:
- Expected completion: {{expectedCompletion}}
- Next update scheduled: {{nextUpdateDate}}
- Your action required: {{customerAction}}

I want to ensure you're completely satisfied with the progress. If you have any questions or concerns, please don't hesitate to reach out.

Additional Support:
- Direct contact: {{agentEmail}}
- Reference this case: {{caseNumber}}
- Priority support available if needed

Thank you for your patience as we work to resolve this completely.

Best regards,
{{agentName}}
Customer Care Team
{{companyName}}`,
    description: "Use for following up on previous requests",
    keywords: ["follow up", "update", "status", "progress", "checking"],
    fields: ["Pickup address", "Order ID", "AWB"],
    subjectPrefix: "RPU FOLLOW UP",
  },
  HOLD_ORDER: {
    id: "hold-order",
    name: "⏸️ Hold Order",
    emoji: "⏸️",
    category: "order-management",
    subject: "Order Hold Confirmation - {{orderNumber}}",
    content: `Dear {{customerName}},

Thank you for your request to place a hold on order {{orderNumber}}.

I've successfully processed your hold request and here are the details:

Hold Information:
- Order Number: {{orderNumber}}
- Hold Placed: {{holdDate}}
- Hold Duration: {{holdDuration}}
- Reason: {{holdReason}}
- Hold Expires: {{holdExpiryDate}}

What This Means:
• Your order processing has been temporarily paused
• No charges will be processed during the hold period
• Items remain reserved for you
• You can resume or cancel anytime before expiry

During the Hold Period:
- Order status: "On Hold"
- Inventory: Reserved for you
- Payment: Suspended
- Modifications: Available upon request

To Resume Your Order:
- Reply to this email with "Resume Order"
- Call our customer service line
- Log into your account and update order status

Important Notes:
• Hold will automatically expire on {{holdExpiryDate}}
• Items may become unavailable if hold expires
• Prices may change after hold period
• We'll send reminders before expiry

If you need to extend the hold period or have any questions, please let me know immediately.

Best regards,
{{agentName}}
Customer Care Team
{{companyName}}`,
    description: "Use when customer requests to hold an order",
    keywords: ["hold", "pause", "stop", "delay", "wait", "suspend"],
    fields: ["Order ID", "AWB", "Hold Date"],
    subjectPrefix: "HOLD ORDER",
  },
  PUSH_FOR_DELIVERY: {
    id: "push-for-delivery",
    name: "🚚 Push for Delivery",
    emoji: "🚚",
    category: "delivery",
    subject: "Delivery Acceleration Request - Order {{orderNumber}}",
    content: `Dear {{customerName}},

Thank you for your request to expedite the delivery of order {{orderNumber}}.

I understand the urgency of your request and I'm taking immediate action to push your delivery forward.

Current Status:
- Order Number: {{orderNumber}}
- Current Status: {{currentStatus}}
- Original Delivery Date: {{originalDeliveryDate}}
- Requested Delivery: {{requestedDeliveryDate}}

Actions Taken:
✅ Escalated to fulfillment team
✅ Marked as priority delivery
✅ Coordinated with logistics partner
✅ Updated delivery timeline

New Delivery Schedule:
- Updated Delivery Date: {{newDeliveryDate}}
- Delivery Window: {{deliveryWindow}}
- Tracking Number: {{trackingNumber}}
- Delivery Partner: {{deliveryPartner}}

What to Expect:
• SMS notification when order ships
• Real-time tracking updates
• Call from delivery agent before arrival
• Priority handling throughout the process

Additional Services:
- Express delivery upgrade (if available)
- Specific time slot delivery
- Alternative delivery address
- Special delivery instructions

I'll personally monitor your order to ensure it meets the new timeline. You'll receive updates at every step.

If you need any additional assistance or have specific delivery requirements, please let me know immediately.

Best regards,
{{agentName}}
Customer Care Team
{{companyName}}`,
    description: "Use when customer requests faster delivery",
    keywords: ["fast delivery", "urgent", "expedite", "rush", "quick", "ASAP"],
    fields: ["Order ID", "AWB", "Hold Time"],
    subjectPrefix: "PUSH FOR DELIVERY",
  },
  EXPEDITE_DELIVERY_REQUEST: {
    id: "expedite-delivery-request",
    name: "🚀 Expedite Delivery Request",
    emoji: "⚡",
    category: "delivery",
    subject: "Express Delivery Arranged - Order {{orderNumber}}",
    content: "",
    description: "Use for confirmed express delivery arrangements",
    keywords: ["express", "expedite", "urgent delivery", "same day", "priority"],
    fields: ["OrderID", "AWB", "DeliveryDate", "Reason"],
    subjectPrefix: "EXPEDITE DELIVERY",
    queue: "LAST MILE TEAM",
    body: `Dear Last Mile Team,

Kindly expedite the order to be delivered on the [DeliveryDate], as the customer is [Reason].

Order ID: [OrderID]
AWB: [AWB]

Thank you.

Best Regards,
[AgentName]
CS Agent`,
  },
  DELAYED_REFUND: {
    id: "delayed-refund",
    name: "💰 Delayed Refund",
    emoji: "💰",
    category: "refunds",
    subject: "Refund Status Update - We're Resolving This Priority",
    content: `Dear {{customerName}},

Thank you for contacting us about the delay in your refund for order {{orderNumber}}.

I sincerely apologize for the delay in processing your refund. I understand how concerning this must be, and I want to provide you with complete transparency about the situation.

Refund Details:
- Order Number: {{orderNumber}}
- Refund Amount: {{refundAmount}}
- Refund Initiated: {{refundInitiatedDate}}
- Expected Credit Date: {{originalExpectedDate}}
- Current Status: {{currentRefundStatus}}

Reason for Delay:
{{delayReason}}

Immediate Actions Taken:
✅ Escalated to finance team as priority case
✅ Direct follow-up with payment processor
✅ Expedited processing requested
✅ Senior manager oversight assigned

Updated Timeline:
- New Expected Credit Date: {{newExpectedDate}}
- Maximum Timeline: {{maximumTimeline}}
- Daily monitoring: Until resolution

Compensation for Inconvenience:
Due to this delay, I'm arranging:
• {{compensationOffer}}
• Priority customer status for future orders
• Direct contact line for any future concerns

What You Can Expect:
- Daily updates until refund is credited
- SMS notification when refund is processed
- Email confirmation with transaction details
- Follow-up call to confirm receipt

If your refund doesn't appear by {{guaranteedDate}}, I will personally ensure immediate escalation to our senior management team.

My direct contact for this case: {{agentDirectEmail}}
Case Reference: {{caseReference}}

Thank you for your patience. Your satisfaction is our priority.

Best regards,
{{agentName}}
Senior Customer Care Specialist
{{companyName}}`,
    description: "Use when customer's refund is delayed",
    keywords: ["refund delay", "money not received", "refund pending", "late refund"],
    fields: ["Order ID", "AWB", "Reason"],
    subjectPrefix: "DELAYED REFUND",
  },
}

// Queue/Team assignments for email templates
export const queueAssignments: Record<string, string> = {
  ITEM_COMPLAINT: "UAE OMT | KSA OMT",
  INVOICE_REQUEST: "TL [Belle]",
  ORDER_CANCELLATION: "Last mile team",
  RETURN_CANCELLATION: "Last mile team",
  ARN_REQUEST: "OMT",
  POD_REQUEST: "Last mile team",
  DISCOUNT_CODE_ISSUE: "Josy Josy",
  CALL_ESCALATION: "The one customer requested to talk to",
  CHANGE_ITEM_STATUS: "Last mile team",
  OTP_REQUEST: "Last mile KSA",
  UNVERIFY_REQUEST: "Leah or Belle",
  RPU_OUTSIDE_UAE: "UAE LASTMILE",
  RPU_FOLLOW_UP: "LAST MILE TEAM",
  HOLD_ORDER: "To the store email",
  PUSH_FOR_DELIVERY: "Last mile team",
  EXPEDITE_DELIVERY_REQUEST: "LAST MILE TEAM",
  DELAYED_REFUND: "OMT",
}
