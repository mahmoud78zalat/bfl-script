"use client"

import { useState, useEffect } from "react"

export default function BFLCustomerServiceHelper() {
  const [currentLanguage, setCurrentLanguage] = useState("en")
  const [currentCustomerName, setCurrentCustomerName] = useState("")
  const [currentAgentName, setCurrentAgentName] = useState("")
  const [currentCustomerCountry, setCurrentCustomerCountry] = useState("")
  const [customerGender, setCustomerGender] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [orderInput, setOrderInput] = useState("")
  const [resultValue, setResultValue] = useState("-")
  const [showResult, setShowResult] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [itemName, setItemName] = useState("")
  const [deliveryDate, setDeliveryDate] = useState("")
  const [waitingTime, setWaitingTime] = useState("")
  const [ticketNumber, setTicketNumber] = useState("")
  const [feedback, setFeedback] = useState("")
  const [showFeedback, setShowFeedback] = useState(false)
  const [copiedCards, setCopiedCards] = useState<Set<string>>(new Set())
  const [lastUsedTemplate, setLastUsedTemplate] = useState<string>("")
  const [recommendations, setRecommendations] = useState<
    Array<{ id: string; text: string; category: string; priority: number; reason: string }>
  >([])
  const [conversationStage, setConversationStage] = useState<
    "greeting" | "helping" | "resolving" | "closing" | "ended"
  >("greeting")
  const [usedTemplates, setUsedTemplates] = useState<Set<string>>(new Set())
  const [showAboutTool, setShowAboutTool] = useState(false)
  const [customerMessage, setCustomerMessage] = useState("")
  const [keywordRecommendations, setKeywordRecommendations] = useState<
    Array<{ id: string; text: string; category: string; keywords: string[]; score: number }>
  >([])
  const [showAgentSetup, setShowAgentSetup] = useState(false)
  const [tempAgentName, setTempAgentName] = useState("")
  const [showOrderConverter, setShowOrderConverter] = useState(true)
  const [showPersonalization, setShowPersonalization] = useState(false)
  const [showTicketInfo, setShowTicketInfo] = useState(false)
  const [showSmartRecommendations, setShowSmartRecommendations] = useState(false)
  const [showReplyTemplates, setShowReplyTemplates] = useState(false)

  // Check for saved agent name on component mount
  useEffect(() => {
    const savedAgentName = localStorage.getItem("bfl_agent_name")
    if (savedAgentName) {
      setCurrentAgentName(savedAgentName)
    } else {
      setShowAgentSetup(true)
    }
  }, [])

  // Reset used templates and copied cards when customer name or language changes
  useEffect(() => {
    setUsedTemplates(new Set())
    setCopiedCards(new Set())
  }, [currentCustomerName, currentLanguage])

  // Save agent name to localStorage
  const saveAgentName = () => {
    if (tempAgentName.trim()) {
      setCurrentAgentName(tempAgentName.trim())
      localStorage.setItem("bfl_agent_name", tempAgentName.trim())
      setShowAgentSetup(false)
    }
  }

  // Change agent name (clear localStorage)
  const changeAgentName = () => {
    localStorage.removeItem("bfl_agent_name")
    setTempAgentName(currentAgentName)
    setShowAgentSetup(true)
  }

  // Name translation dictionary
  const nameTranslations: { [key: string]: string } = {
    john: "جون",
    mary: "مريم",
    ahmed: "أحمد",
    sara: "سارة",
    sarah: "سارة",
    mohammed: "محمد",
    muhammad: "محمد",
    fatima: "فاطمة",
    ali: "علي",
    aisha: "عائشة",
    omar: "عمر",
    khadija: "خديجة",
    hassan: "حسن",
    zainab: "زينب",
    ibrahim: "إبراهيم",
    amina: "آمينة",
    yusuf: "يوسف",
    layla: "ليلى",
    khalid: "خالد",
    nour: "نور",
    adam: "آدم",
    yasmin: "ياسمين",
    david: "داود",
    michael: "ميخائيل",
    daniel: "دانيال",
    mahmoud: "محمود",
    ahmad: "أحمد",
    hussein: "حسين",
  }

  // Country fee information
  const countryFees: { [key: string]: { fee: string; details: string } } = {
    uae: { fee: "Free", details: "Free collection" },
    ksa: { fee: "Free", details: "Free collection" },
    lebanon: { fee: "1 USD", details: "1 USD (no shop available)" },
    kuwait: { fee: "3 KWD", details: "3 KWD (Can also return to the branch(s) for free.)" },
    oman: { fee: "3.10 OMR", details: "3.10 OMR (Can also return to the branch(s) for free.)" },
    qatar: { fee: "20 QAR", details: "20 QAR (Can also return to the branch(s) for free.)" },
    bahrain: { fee: "3 BHD", details: "3 BHD (Can also return to the branch(s) for free.)" },
    singapore: { fee: "Free", details: "Free (Can also return to the branch)" },
    malaysia: { fee: "Free", details: "Free collection" },
  }

  // MASSIVELY EXPANDED keyword-based recommendation system with template binding
  const analyzeCustomerMessage = (message: string) => {
    const lowerMessage = message.toLowerCase()
    const recommendations: Array<{
      id: string
      text: string
      category: string
      keywords: string[]
      score: number
    }> = []

    // COMPREHENSIVE keyword patterns bound to specific templates
    const keywordPatterns = [
      // GREETING KEYWORDS
      {
        keywords: [
          "hello",
          "hi",
          "hey",
          "good morning",
          "good afternoon",
          "good evening",
          "greetings",
          "salaam",
          "marhaba",
          "ahlan",
          "hola",
          "bonjour",
          "thank you",
          "thanks",
          "appreciate",
        ],
        template: "greeting-welcome",
        category: "Greeting",
        weight: 3,
      },

      // ORDER STATUS KEYWORDS - MASSIVELY EXPANDED
      {
        keywords: [
          "order",
          "status",
          "track",
          "tracking",
          "where is my",
          "find my order",
          "check order",
          "order number",
          "order id",
          "my purchase",
          "shipment",
          "dispatch",
          "shipped",
          "delivery status",
          "order update",
          "purchase status",
          "my order",
          "order details",
          "order info",
          "order information",
          "when will i get",
          "delivery time",
          "shipping time",
        ],
        template: "order_status-ask_order_id",
        category: "Order Status",
        weight: 3,
      },
      {
        keywords: ["confirmed", "processing", "prepared", "ready", "accepted", "approved"],
        template: "order_status-order_confirmed",
        category: "Order Status",
        weight: 2,
      },
      {
        keywords: ["shipped", "dispatched", "sent", "on the way", "in transit", "courier"],
        template: "order_status-order_shipped",
        category: "Order Status",
        weight: 2,
      },
      {
        keywords: ["delivered", "received", "got it", "arrived", "delivery complete"],
        template: "order_status-order_delivered",
        category: "Order Status",
        weight: 2,
      },
      {
        keywords: ["out for delivery", "delivery today", "coming today", "delivery partner"],
        template: "order_status-order_out_for_delivery",
        category: "Order Status",
        weight: 2,
      },

      // COMPLAINTS & DEFECTIVE ITEMS - MASSIVELY EXPANDED
      {
        keywords: [
          "defect",
          "defective",
          "broken",
          "damaged",
          "quality",
          "problem",
          "issue",
          "wrong",
          "faulty",
          "bad",
          "poor quality",
          "not working",
          "malfunction",
          "torn",
          "ripped",
          "stained",
          "dirty",
          "used",
          "worn",
          "scratched",
          "cracked",
          "bent",
          "missing parts",
          "incomplete",
          "different item",
          "wrong size",
          "wrong color",
          "not as described",
          "fake",
          "counterfeit",
          "cheap quality",
          "manufacturing defect",
          "product issue",
          "item problem",
          "doesn't work",
          "broken item",
          "damaged package",
          "wrong product",
        ],
        template: "complaints-defective_item",
        category: "Complaints",
        weight: 3,
      },

      // INVOICE & RECEIPT - EXPANDED
      {
        keywords: [
          "invoice",
          "receipt",
          "bill",
          "tax",
          "vat",
          "document",
          "proof",
          "purchase proof",
          "tax invoice",
          "official receipt",
          "billing",
          "payment proof",
          "transaction receipt",
          "purchase document",
          "invoice copy",
          "receipt copy",
          "tax document",
          "billing document",
        ],
        template: "invoice_request-invoice_info",
        category: "Invoice Request",
        weight: 3,
      },

      // CANCELLATION & REFUND - MASSIVELY EXPANDED
      {
        keywords: [
          "cancel",
          "cancelled",
          "refund",
          "money back",
          "return money",
          "get money",
          "cancel order",
          "cancel my order",
          "don't want",
          "change mind",
          "refund request",
          "cancel item",
          "remove item",
          "delete order",
          "cancel purchase",
          "refund money",
          "get refund",
          "money refund",
          "cancel everything",
          "don't need",
          "changed my mind",
        ],
        template: "order_status-order_cancelled",
        category: "Order Status",
        weight: 3,
      },

      // PAYMENT ISSUES - MASSIVELY EXPANDED
      {
        keywords: [
          "payment",
          "failed",
          "declined",
          "card",
          "pay",
          "transaction",
          "billing",
          "payment failed",
          "card declined",
          "payment error",
          "transaction failed",
          "payment issue",
          "can't pay",
          "payment problem",
          "card not working",
          "payment method",
          "credit card",
          "debit card",
          "visa",
          "mastercard",
          "paypal",
          "apple pay",
          "payment declined",
          "transaction error",
          "billing issue",
        ],
        template: "payment_methods-payment_security",
        category: "Payment Methods",
        weight: 3,
      },
      {
        keywords: ["cod", "cash on delivery", "pay on delivery", "cash payment", "pay when delivered"],
        template: "payment_methods-cod_not_available",
        category: "Payment Methods",
        weight: 3,
      },

      // RETURN & EXCHANGE - MASSIVELY EXPANDED
      {
        keywords: [
          "return",
          "exchange",
          "give back",
          "send back",
          "return policy",
          "exchange policy",
          "return item",
          "exchange item",
          "return process",
          "how to return",
          "return procedure",
          "exchange procedure",
          "swap",
          "replace",
          "return product",
          "exchange product",
          "send item back",
          "return this",
          "want to return",
          "need to return",
        ],
        template: "return-return_policy",
        category: "Return",
        weight: 3,
      },

      // DELIVERY & SHIPPING - MASSIVELY EXPANDED
      {
        keywords: [
          "delivery",
          "shipping",
          "when",
          "arrive",
          "receive",
          "get",
          "delivery date",
          "shipping date",
          "when will i get",
          "delivery time",
          "shipping time",
          "delivery schedule",
          "when delivered",
          "delivery estimate",
          "shipping estimate",
          "delivery timeline",
          "when will it arrive",
          "delivery expected",
          "shipping expected",
        ],
        template: "delivery_date-delivery_confirmation",
        category: "Delivery Date",
        weight: 3,
      },
      {
        keywords: ["delivery delay", "late delivery", "delayed", "shipping delay", "not arrived", "taking long"],
        template: "delivery_date-delivery_delay",
        category: "Delivery Date",
        weight: 2,
      },

      // AVAILABILITY & STOCK - MASSIVELY EXPANDED
      {
        keywords: [
          "available",
          "stock",
          "find",
          "looking for",
          "search",
          "have",
          "in stock",
          "out of stock",
          "availability",
          "do you have",
          "can i find",
          "is available",
          "stock status",
          "inventory",
          "product availability",
          "item availability",
          "treasure hunt",
          "treasure",
          "hunt",
          "available in store",
          "stock check",
        ],
        template: "availability-treasure_hunt",
        category: "Availability",
        weight: 3,
      },

      // TECHNICAL SUPPORT - MASSIVELY EXPANDED
      {
        keywords: [
          "website",
          "app",
          "login",
          "technical",
          "error",
          "bug",
          "not working",
          "website issue",
          "app issue",
          "login problem",
          "can't login",
          "website down",
          "app crash",
          "technical problem",
          "system error",
          "page not loading",
          "website not working",
          "app not working",
          "login error",
          "password",
          "forgot password",
          "reset password",
          "site not loading",
          "page error",
        ],
        template: "technical_support-website_issues",
        category: "Technical Support",
        weight: 3,
      },
      {
        keywords: ["unverify", "unverified", "verify", "verification", "email verification", "phone verification"],
        template: "technical_support-login_assistance",
        category: "Technical Support",
        weight: 2,
      },

      // PROMOTIONS & OFFERS - MASSIVELY EXPANDED
      {
        keywords: [
          "offer",
          "discount",
          "sale",
          "promotion",
          "deal",
          "coupon",
          "promo code",
          "discount code",
          "special offer",
          "flash sale",
          "clearance",
          "bargain",
          "cheap",
          "price",
          "cost",
          "offers",
          "deals",
          "promotions",
          "sales",
          "discounts",
          "special price",
          "reduced price",
          "sale price",
        ],
        template: "promotions-current_offers",
        category: "Promotions",
        weight: 3,
      },

      // ADDRESS CHANGE - EXPANDED
      {
        keywords: [
          "address",
          "change address",
          "wrong address",
          "different address",
          "delivery address",
          "shipping address",
          "update address",
          "modify address",
          "incorrect address",
          "address change",
          "new address",
          "address update",
        ],
        template: "address_change-order_in_process",
        category: "Address Change",
        weight: 3,
      },

      // TICKET SYSTEM - EXPANDED
      {
        keywords: [
          "ticket",
          "reference",
          "complaint number",
          "case",
          "ticket number",
          "reference number",
          "complaint",
          "escalate",
          "supervisor",
          "manager",
          "complaint reference",
          "case number",
          "follow up",
          "update",
        ],
        template: "ticket_system-create_ticket",
        category: "Ticket System",
        weight: 3,
      },

      // BEAR WITH ME / WAITING - EXPANDED
      {
        keywords: [
          "wait",
          "checking",
          "please wait",
          "hold on",
          "give me a moment",
          "let me check",
          "checking system",
          "looking into",
          "investigating",
          "processing",
          "one moment",
          "just a moment",
          "bear with me",
        ],
        template: "bear_with_me-checking_system",
        category: "Bear With Me",
        weight: 2,
      },

      // CLOSING & ASSISTANCE - EXPANDED
      {
        keywords: [
          "thank you",
          "thanks",
          "that's all",
          "nothing else",
          "all good",
          "resolved",
          "solved",
          "fixed",
          "done",
          "complete",
          "finished",
          "perfect",
          "great",
          "excellent",
          "satisfied",
        ],
        template: "closing_help-closing_offer",
        category: "Closing",
        weight: 2,
      },
      {
        keywords: [
          "anything else",
          "more help",
          "additional help",
          "other questions",
          "something else",
          "help with anything else",
          "need more help",
        ],
        template: "closing_help-additional_assistance",
        category: "Closing",
        weight: 2,
      },

      // CANCEL SINGLE ITEM - EXPANDED
      {
        keywords: [
          "cancel one item",
          "cancel single item",
          "remove one item",
          "delete one item",
          "cancel part of order",
          "cancel specific item",
          "remove specific item",
        ],
        template: "cancel_item-handed_to_shipper",
        category: "Cancel Item",
        weight: 3,
      },

      // OFFENSIVE LANGUAGE HANDLING
      {
        keywords: ["frustrated", "angry", "upset", "disappointed", "annoyed", "mad", "furious", "irritated"],
        template: "offensive_language_warnings-warning_1",
        category: "Offensive Language",
        weight: 1,
      },

      // CSAT & SATISFACTION
      {
        keywords: ["satisfied", "satisfaction", "happy", "pleased", "rating", "review", "feedback", "survey"],
        template: "csat_ending-satisfaction_check",
        category: "CSAT",
        weight: 2,
      },
    ]

    // Logic to analyze message and generate recommendations
    keywordPatterns.forEach((pattern) => {
      const matchedKeywords = pattern.keywords.filter((keyword) => lowerMessage.includes(keyword))
      if (matchedKeywords.length > 0) {
        const score = matchedKeywords.length * pattern.weight
        recommendations.push({
          id: pattern.template,
          text: getTemplateText(pattern.template),
          category: pattern.category,
          keywords: matchedKeywords,
          score: score,
        })
      }
    })

    return recommendations.sort((a, b) => b.score - a.score).slice(0, 6)
  }

  const getTemplateText = (templateId: string) => {
    const [categoryKey, templateKey] = templateId.split("-")
    const category = replyCategories[categoryKey as keyof typeof replyCategories]
    if (category && category.templates[templateKey as keyof typeof category.templates]) {
      const template = category.templates[templateKey as keyof typeof category.templates]
      return template[currentLanguage]
    }
    return "Template not found"
  }

  // Enhanced smart recommendation system
  const getSmartRecommendations = (templateId: string) => {
    const [category, template] = templateId.split("-")
    const recommendations: Array<{
      id: string
      text: string
      category: string
      priority: number
      reason: string
    }> = []

    // Logic-based recommendations based on template used
    switch (templateId) {
      case "greeting-welcome":
      case "greeting-warm_welcome":
        recommendations.push(
          {
            id: "order_status-ask_order_id",
            text: "I can help you check your order status. Please share your order ID starting with letter A.",
            category: "Order Status",
            priority: 1,
            reason: "Most customers contact us about orders after greeting",
          },
          {
            id: "availability-treasure_hunt",
            text: "I can explain our treasure hunt concept and help you find what you need.",
            category: "Availability",
            priority: 2,
            reason: "Second most common inquiry is product availability",
          },
          {
            id: "return-return_policy",
            text: "I can guide you through our 14-day return policy if you need assistance with returns.",
            category: "Return",
            priority: 3,
            reason: "Returns are common after greetings",
          },
        )
        break

      case "order_status-ask_order_id":
        recommendations.push(
          {
            id: "bear_with_me-checking_system",
            text: "Please bear with me while I check your order details in our system.",
            category: "Bear With Me",
            priority: 1,
            reason: "Always inform customer about wait time when checking orders",
          },
          {
            id: "order_status-order_confirmed",
            text: "Great news! Your order has been confirmed and is being prepared for shipment.",
            category: "Order Status",
            priority: 2,
            reason: "Most common positive order status",
          },
        )
        break

      default:
        // General recommendations based on conversation stage
        if (conversationStage === "helping" || conversationStage === "resolving") {
          if (usedTemplates.size >= 2) {
            recommendations.push({
              id: "closing_help-additional_assistance",
              text: "Is there anything else I can assist you with?",
              category: "Closing",
              priority: 1,
              reason: "Check for additional needs after helping",
            })
          }
        }
        break
    }

    return recommendations.sort((a, b) => a.priority - b.priority).slice(0, 6)
  }

  // Reply templates
  const replyCategories = {
    greeting: {
      title: "Greeting",
      templates: {
        welcome: {
          en: "Hi [Customer], thank you for contacting Brands For Less. My name is [Agent], and I'm here to assist you today. 😊",
          ar: "مرحبًا [Customer]، شكرًا لتواصلك مع براندز فور ليس. اسمي [Agent]، وأنا هنا لمساعدتك اليوم. 😊",
        },
        warm_welcome: {
          en: "Hello [Customer]! Welcome to Brands For Less customer support. I'm [Agent], and it's my pleasure to help you today. How may I assist you?",
          ar: "مرحبًا [Customer]! أهلاً بك في دعم عملاء براندز فور ليس. أنا [Agent]، ومن دواعي سروري مساعدتك اليوم. كيف يمكنني مساعدتك؟",
        },
      },
    },
    order_status: {
      title: "Order Status & Tracking",
      templates: {
        ask_order_id: {
          en: "I can help you check your order status. Please share your order ID starting with letter A.",
          ar: "يمكنني مساعدتك في التحقق من حالة طلبك. يرجى مشاركة رقم الطلب الذي يبدأ بالحرف A.",
        },
        checking_order: {
          en: "Let me check the status of your order right now, [Customer]. Please give me a moment.",
          ar: "دعني أتحقق من حالة طلبك الآن يا [Customer]. أرجو منك الانتظار لحظة.",
        },
        order_confirmed: {
          en: "Great news [Customer]! Your order has been confirmed and is being prepared for shipment. You should receive it within 2-3 business days.",
          ar: "أخبار رائعة [Customer]! تم تأكيد طلبك ويتم تحضيره للشحن. ستستلمه خلال 2-3 أيام عمل.",
        },
        order_processing: {
          en: "Your order is currently being processed, [Customer]. Our team is carefully preparing your items for shipment. I'll keep you updated on any progress.",
          ar: "طلبك قيد المعالجة حاليًا، [Customer]. فريقنا يحضر منتجاتك بعناية للشحن. سأبقيك على اطلاع بأي تقدم.",
        },
        order_shipped: {
          en: "Excellent news [Customer]! Your order has been shipped and is on its way to you. You should receive it within 2-3 business days.",
          ar: "أخبار ممتازة [Customer]! تم شحن طلبك وهو في طريقه إليك. ستستلمه خلال 2-3 أيام عمل.",
        },
        order_out_for_delivery: {
          en: "Your order is out for delivery today, [Customer]! Our delivery partner will contact you shortly to arrange the delivery time. Please keep your phone available.",
          ar: "طلبك خارج للتسليم اليوم، [Customer]! شريك التوصيل سيتصل بك قريبًا لترتيب وقت التسليم. يرجى إبقاء هاتفك متاحًا.",
        },
        order_delivered: {
          en: "Your order has been successfully delivered, [Customer]! I hope you're satisfied with your purchase. If you have any concerns, please don't hesitate to reach out.",
          ar: "تم تسليم طلبك بنجاح، [Customer]! أتمنى أن تكون راضيًا عن مشترياتك. إذا كان لديك أي مخاوف، لا تتردد في التواصل معنا.",
        },
        order_cancelled: {
          en: "I've successfully cancelled your order, [Customer]. The refund will be processed within 7-14 business days to your original payment method.",
          ar: "لقد ألغيت طلبك بنجاح، [Customer]. سيتم معالجة الاسترداد خلال 7-14 يوم عمل إلى طريقة الدفع الأصلية.",
        },
      },
    },
    bear_with_me: {
      title: "Bear With Me / Agent Waiting",
      templates: {
        checking_system: {
          en: "Please bear with me for [WaitTime], [Customer]. I'm checking our system to get you the most accurate information.",
          ar: "يرجى الانتظار [WaitTime]، [Customer]. أنا أتحقق من نظامنا للحصول على أدق المعلومات لك.",
        },
        processing_request: {
          en: "I'm working on your request right now, [Customer]. Please give me [WaitTime] to process this for you.",
          ar: "أعمل على طلبك الآن، [Customer]. يرجى إعطائي [WaitTime] لمعالجة هذا لك.",
        },
        detailed_check: {
          en: "Thank you for your patience, [Customer]. I'm doing a detailed check on your account. This will take approximately [WaitTime].",
          ar: "شكرًا لصبرك، [Customer]. أقوم بفحص مفصل لحسابك. سيستغرق هذا حوالي [WaitTime].",
        },
      },
    },
    availability: {
      title: "Availability / Treasure Hunt Concept",
      templates: {
        treasure_hunt: {
          en: '[ItemName]At Brands For Less, we follow a "Treasure Hunt" concept, which means our stock changes quickly and constantly. Due to this, we are not able to check the availability of specific items. This is why sometimes items may be out of stock in our shops or online. We recommend checking back often, as new items are added daily!',
          ar: '[ItemName]في براندز فور ليس، نتبع مفهوم "البحث عن الكنز"، مما يعني أن مخزوننا يتغير بسرعة وباستمرار. لهذا السبب، لا نستطيع التحقق من توفر منتجات محددة. لهذا قد تكون بعض المنتجات غير متوفرة في متاجرنا أو عبر الإنترنت. ننصح بالتحقق كثيراً، حيث تُضاف منتجات جديدة يومياً!',
        },
        stock_explanation: {
          en: "I understand your interest in this item, [Customer]. Our inventory system works on a treasure hunt model where new arrivals happen daily, but specific item availability can't be guaranteed. I'd recommend visiting our stores or checking online regularly for the best selection.",
          ar: "أفهم اهتمامك بهذا المنتج، [Customer]. نظام المخزون لدينا يعمل على نموذج البحث عن الكنز حيث تحدث وصولات جديدة يوميًا، لكن لا يمكن ضمان توفر منتج محدد. أنصح بزيارة متاجرنا أو التحقق عبر الإنترنت بانتظام للحصول على أفضل تشكيلة.",
        },
      },
    },
    address_change: {
      title: "🏠 Address Change Request",
      templates: {
        order_in_process: {
          en: "We're sorry, but once the order is in process, it is no longer possible to change the delivery address 🙏 You can, however, cancel this order and place a new one with the correct address.",
          ar: "نحن آسفون، لكن بمجرد أن يكون الطلب قيد المعالجة، لم يعد من الممكن تغيير عنوان التسليم 🙏 يمكنك، مع ذلك، إلغاء هذا الطلب وتقديم طلب جديد بالعنوان الصحيح.",
        },
      },
    },
    cancel_item: {
      title: "📦 Cancel Single Item",
      templates: {
        handed_to_shipper: {
          en: "We regret to inform you that it's not possible to cancel a single item at this stage. Once the order is handed over to the shipper, the entire order is processed as one shipment.",
          ar: "نأسف لإبلاغك أنه ليس من الممكن إلغاء منتج واحد في هذه المرحلة. بمجرد تسليم الطلب إلى شركة الشحن، يتم معالجة الطلب بأكمله كشحنة واحدة.",
        },
      },
    },
    ticket_system: {
      title: "🎫 Ticket System",
      templates: {
        create_ticket: {
          en: "I have raised a ticket for you with reference number: [TicketNumber] ✅ We'll keep you updated as soon as we hear back from the concerned department.",
          ar: "لقد أنشأت تذكرة لك برقم المرجع: [TicketNumber] ✅ سنبقيك على اطلاع بمجرد أن نسمع من القسم المختص.",
        },
        follow_up_ticket: {
          en: "After checking your ticket ([TicketNumber]), it's still under investigation by our specialized team. We appreciate your patience and we'll keep you updated as soon as there's progress. 😊",
          ar: "بعد التحقق من تذكرتك ([TicketNumber])، ما زالت قيد التحقيق من قبل فريقنا المتخصص. نقدر صبرك وسنبقيك على اطلاع بمجرد أن يكون هناك تقدم. 😊",
        },
      },
    },
    user_idle: {
      title: "📦 User Idle Replies",
      templates: {
        idle_check: {
          en: "We noticed that you've been idle for a while 😊 I wanted to check if you are still connected. If you need more time, that's perfectly fine too. Just let me know! We're here to help you. If we do not hear from you in an hour, we assume your issue has been resolved or you have stepped away.",
          ar: "لاحظنا أنك كنت غير نشط لفترة 😊 أردت التحقق من أنك ما زلت متصلاً. إذا كنت تحتاج المزيد من الوقت، فهذا جيد تماماً أيضاً. فقط أعلمني! نحن هنا لمساعدتك. إذا لم نسمع منك خلال ساعة، نفترض أن مشكلتك قد تم حلها أو أنك قد ابتعدت.",
        },
        closing_idle_5min: {
          en: "Since we have been idle for over 5 minutes, I hope your issue is resolved or you no longer need assistance at the moment 🙂 Please be assured, we are always here if you need any help! Feel free to reach out to us. I am closing this chat, and I look forward to hearing from you soon! Take care & have a wonderful day! 🌟",
          ar: "بما أننا كنا غير نشطين لأكثر من 5 دقائق، أتمنى أن تكون مشكلتك قد حُلت أو أنك لم تعد تحتاج المساعدة في الوقت الحالي 🙂 كن مطمئناً، نحن دائماً هنا إذا كنت تحتاج أي مساعدة! لا تتردد في التواصل معنا. سأقوم بإغلاق هذه المحادثة، وأتطلع لسماع أخبارك قريباً! اعتن بنفسك واستمتع بيوم رائع! 🌟",
        },
        closing_idle_1hour: {
          en: "Since we haven't received any further response, we assume your issue has been resolved. If you need any additional assistance, please don't hesitate to reach out to us again. For now, we'll be closing this chat. Thank you for reaching out. We're here whenever you need support.",
          ar: "بما أننا لم نتلق أي رد إضافي، نفترض أن مشكلتك قد تم حلها. إذا كنت تحتاج أي مساعدة إضافية، لا تتردد في التواصل معنا مرة أخرى. في الوقت الحالي، سنقوم بإغلاق هذه المحادثة. شكراً لتواصلك معنا. نحن هنا كلما احتجت للدعم.",
        },
      },
    },
    invoice_request: {
      title: "📝 Invoice Request",
      templates: {
        invoice_info: {
          en: "We can proceed with a request to our specialized department to get the invoice number. We kindly request you to cooperate and provide us with the below information:\n\nYour mobile number:\nStore Name:\nDate And Time Of Purchase:\nItem Code:\nItem Price:\nTotal Amount Of The Invoice:\nLast four digits of CC:\nYour active email address:",
          ar: "يمكننا المتابعة بطلب إلى قسمنا المتخصص للحصول على رقم الفاتورة. نطلب منك بلطف التعاون وتزويدنا بالمعلومات التالية:\n\nرقم هاتفك المحمول:\nاسم المتجر:\nتاريخ ووقت الشراء:\nكود المنتج:\nسعر المنتج:\nالمبلغ الإجمالي للفاتورة:\nآخر أربعة أرقام من البطاقة الائتمانية:\nعنوان بريدك الإلكتروني النشط:",
        },
      },
    },
    complaints: {
      title: "🛠 Complaints / Defective Items",
      templates: {
        defective_item: {
          en: "We're truly sorry to hear about this! 🙏 Could you please share a clear photo of the defected item so we can assist you further?\n\nAlso, kindly note that for items related to personal hygiene or underwear, due to health and safety reasons, these cannot be returned or exchanged once opened.",
          ar: "نحن آسفون حقاً لسماع هذا! 🙏 هل يمكنك مشاركة صورة واضحة للمنتج المعيب حتى نتمكن من مساعدتك أكثر؟\n\nكما يرجى ملاحظة أنه بالنسبة للمنتجات المتعلقة بالنظافة الشخصية أو الملابس الداخلية، لأسباب صحية وأمان، لا يمكن إرجاعها أو استبدالها بمجرد فتحها.",
        },
      },
    },
    payment_methods: {
      title: "Payment Methods & COD",
      templates: {
        cod_not_available: {
          en: "I apologize, [Customer], but Cash on Delivery is not available for your country at the moment. We currently offer COD service only in UAE and KSA. However, you can complete your purchase using credit/debit cards or Apple Pay, which are secure and convenient payment options.",
          ar: "أعتذر، [Customer]، لكن الدفع عند التسليم غير متوفر لبلدك في الوقت الحالي. نحن نقدم خدمة الدفع عند التسليم فقط في الإمارات والسعودية. ومع ذلك، يمكنك إتمام عملية الشراء باستخدام بطاقات الائتمان/الخصم أو Apple Pay، وهي خيارات دفع آمنة ومريحة.",
        },
        available_payment_methods: {
          en: "For your convenience, [Customer], we accept the following payment methods: Credit Cards (Visa, MasterCard, American Express), Debit Cards, and Apple Pay. All transactions are secured with the latest encryption technology.",
          ar: "لراحتك، [Customer]، نحن نقبل طرق الدفع التالية: بطاقات الائتمان (فيزا، ماستركارد، أمريكان إكسبريس)، بطاقات الخصم، و Apple Pay. جميع المعاملات مؤمنة بأحدث تقنيات التشفير.",
        },
        payment_security: {
          en: "Rest assured, [Customer], all our online payment methods are completely secure and protected. Your financial information is encrypted and never stored on our servers. You can shop with confidence using any of our available payment options.",
          ar: "كن مطمئنًا، [Customer]، جميع طرق الدفع عبر الإنترنت آمنة ومحمية تمامًا. معلوماتك المالية مشفرة ولا يتم تخزينها على خوادمنا. يمكنك التسوق بثقة باستخدام أي من خيارات الدفع المتاحة لدينا.",
        },
      },
    },
    delivery_date: {
      title: "Delivery Date Information",
      templates: {
        delivery_confirmation: {
          en: "[Customer], your order is confirmed for delivery on [DeliveryDate]. Please ensure someone is available to receive the package during business hours.",
          ar: "[Customer]، تم تأكيد طلبك للتسليم في [DeliveryDate]. يرجى التأكد من وجود شخص متاح لاستلام الطرد خلال ساعات العمل.",
        },
        delivery_update: {
          en: "[Customer], I wanted to update you that your delivery date has been scheduled for [DeliveryDate]. You'll receive a tracking notification once your order is dispatched.",
          ar: "[Customer]، أردت إعلامك أن تاريخ التسليم تم تحديده في [DeliveryDate]. ستتلقى إشعار تتبع بمجرد إرسال طلبك.",
        },
        delivery_delay: {
          en: "I sincerely apologize for the inconvenience, [Customer]. Due to unforeseen circumstances, your delivery has been rescheduled to [DeliveryDate]. We appreciate your patience and understanding.",
          ar: "أعتذر بصدق عن الإزعاج، [Customer]. بسبب ظروف غير متوقعة، تم إعادة جدولة التسليم إلى [DeliveryDate]. نقدر صبرك وتفهمك.",
        },
      },
    },
    technical_support: {
      title: "Technical Support",
      templates: {
        website_issues: {
          en: "I understand you're experiencing issues with our website, [Customer]. Let me help you troubleshoot this. Could you please try clearing your browser cache and cookies, then refresh the page?",
          ar: "أفهم أنك تواجه مشاكل مع موقعنا الإلكتروني، [Customer]. دعني أساعدك في حل هذه المشكلة. هل يمكنك محاولة مسح ذاكرة التخزين المؤقت وملفات تعريف الارتباط في المتصفح، ثم تحديث الصفحة؟",
        },
        app_troubleshooting: {
          en: "For app-related issues, [Customer], I recommend updating to the latest version from your app store. If the problem persists, please try logging out and logging back in.",
          ar: "بالنسبة لمشاكل التطبيق، [Customer]، أنصح بالتحديث إلى أحدث إصدار من متجر التطبيقات. إذا استمرت المشكلة، يرجى تسجيل الخروج وتسجيل الدخول مرة أخرى.",
        },
        login_assistance: {
          en: "Since you don't have access to your current email right now, [Customer], we can proceed with an unverified mobile number request. Please note that this process will result in the loss of all your loyalty points and wallet credits. Would you like to proceed with this option?",
          ar: "بما أنك لا تملك وصولاً لبريدك الإلكتروني الحالي الآن، [Customer]، يمكننا المتابعة بطلب رقم هاتف محمول غير مؤكد. يرجى ملاحظة أن هذه العملية ستؤدي إلى فقدان جميع نقاط الولاء ورصيد المحفظة. هل تريد المتابعة بهذا الخيار؟",
        },
      },
    },
    return: {
      title: "Return & Exchange",
      templates: {
        return_policy: {
          en: "You can return items within 14 days of purchase with the original receipt, [Customer]. Would you like me to check your order details?",
          ar: "يمكنك إرجاع المنتجات خلال 14 يوم من الشراء مع الإيصال الأصلي، [Customer]. هل تريد مني التحقق من تفاصيل طلبك؟",
        },
        return_process: {
          en: "To process your return [Customer], please visit any of our branches with your receipt and the items. The refund will be processed within 7-14 working days.",
          ar: "لمعالجة الإرجاع [Customer]، يرجى زيارة أي من فروعنا مع الإيصال والمنتجات. سيتم معالجة الاسترداد خلال 7-14 يوم عمل.",
        },
        exchange_policy: {
          en: "Exchanges may be available at the store, [Customer], but we don't offer that service online. If you go to the store and find the same item, you may exchange it there subject to our exchange policy and item availability.",
          ar: "قد يكون التبديل متاحًا في المتجر، [Customer]، لكننا لا نقدم هذه الخدمة عبر الإنترنت. إذا ذهبت إلى المتجر ووجدت نفس المنتج، يمكنك تبديله هناك وفقًا لسياسة التبديل وتوفر المنتج.",
        },
      },
    },
    promotions: {
      title: "Promotions & Offers",
      templates: {
        current_offers: {
          en: "We have some amazing offers running right now, [Customer]! Check our website and app for the latest deals, flash sales, and seasonal discounts. Don't miss out on our limited-time promotions!",
          ar: "لدينا عروض رائعة تعمل الآن، [Customer]! تحقق من موقعنا الإلكتروني والتطبيق لأحدث الصفقات والمبيعات السريعة والخصومات الموسمية. لا تفوت عروضنا محدودة الوقت!",
        },
        newsletter_signup: {
          en: "To stay updated on our latest offers and exclusive deals, [Customer], I recommend subscribing to our newsletter. You'll be the first to know about sales, new arrivals, and special promotions!",
          ar: "للبقاء على اطلاع على أحدث عروضنا والصفقات الحصرية، [Customer]، أنصح بالاشتراك في نشرتنا الإخبارية. ستكون أول من يعرف عن المبيعات والوصولات الجديدة والعروض الخاصة!",
        },
        discount_codes: {
          en: "We don't have discount codes available right now, [Customer], but keep checking our social media channels - we might have some soon! Follow us on Instagram, Facebook, and Twitter for the latest updates.",
          ar: "ليس لدينا رموز خصم متاحة الآن، [Customer]، لكن استمر في متابعة قنوات التواصل الاجتماعي - قد نحصل على بعضها قريبًا! تابعنا على إنستغرام وفيسبوك وتويتر لآخر التحديثات.",
        },
      },
    },
    offensive_language_warnings: {
      title: "Offensive Language Warnings",
      templates: {
        warning_1: {
          en: "I understand you may be frustrated, [Customer], but I kindly ask that we keep our conversation respectful. I'm here to help you resolve your issue. Let's work together to find a solution.",
          ar: "أفهم أنك قد تكون محبطًا، [Customer]، لكنني أطلب بلطف أن نحافظ على احترام محادثتنا. أنا هنا لمساعدتك في حل مشكلتك. دعنا نعمل معًا لإيجاد حل.",
        },
        warning_2: {
          en: "[Customer], I want to help you, but I must ask that we maintain a professional and respectful tone. If the inappropriate language continues, I may need to end this conversation. Please let me assist you properly.",
          ar: "[Customer]، أريد مساعدتك، لكن يجب أن أطلب منك الحفاظ على نبرة مهنية ومحترمة. إذا استمرت اللغة غير المناسبة، قد أحتاج لإنهاء هذه المحادثة. يرجى السماح لي بمساعدتك بشكل صحيح.",
        },
        closure_offensive: {
          en: "I'm sorry, [Customer], but due to the continued use of inappropriate language, I need to end this conversation. If you'd like to continue receiving assistance, please contact us again with a respectful approach. Thank you for understanding.",
          ar: "أعتذر، [Customer]، لكن بسبب الاستمرار في استخدام لغة غير مناسبة، أحتاج لإنهاء هذه المحادثة. إذا كنت تريد الاستمرار في تلقي المساعدة، يرجى الاتصال بنا مرة أخرى بطريقة محترمة. شكرًا لتفهمك.",
        },
      },
    },
    closing_help: {
      title: "Closing & Additional Assistance",
      templates: {
        closing_offer: {
          en: "Thank you [Customer]! If you need any further assistance, please don't hesitate to reach out. Have a wonderful day!",
          ar: "شكرًا لك [Customer]! إذا كنت تحتاج أي مساعدة إضافية، لا تتردد في التواصل معنا. أتمنى لك يومًا رائعًا!",
        },
        additional_assistance: {
          en: "Is there anything else I can assist you with?",
          ar: "هل هناك أي شيء آخر يمكنني مساعدتك به؟",
        },
        pleasure_to_assist: {
          en: "You're more than welcome. It's my pleasure to assist you. Thank you for giving me the time to help you today.",
          ar: "أهلاً وسهلاً بك. من دواعي سروري مساعدتك. شكرًا لك على إعطائي الوقت لمساعدتك اليوم.",
        },
      },
    },
    csat_ending: {
      title: "CSAT Ending & Customer Satisfaction",
      templates: {
        satisfaction_check: {
          en: "Before we end our conversation, [Customer], I want to ensure you're completely satisfied with the assistance I've provided today. Have I been able to resolve your inquiry to your satisfaction?",
          ar: "قبل أن ننهي محادثتنا، [Customer]، أريد التأكد من أنك راضٍ تمامًا عن المساعدة التي قدمتها اليوم. هل تمكنت من حل استفسارك بما يرضيك؟",
        },
        survey_request: {
          en: "Thank you for choosing Brands For Less, [Customer]! You'll receive a short survey after this chat ends. I would greatly appreciate if you could take a moment to rate our interaction - your feedback helps us improve our services and serve you better.",
          ar: "شكرًا لاختيارك براندز فور ليس، [Customer]! ستتلقى استطلاع قصير بعد انتهاء هذه المحادثة. سأقدر كثيرًا إذا كان بإمكانك تقييم تفاعلنا - ملاحظاتك تساعدنا على تحسين خدماتنا وخدمتك بشكل أفضل.",
        },
        kind_closure: {
          en: "It has been an absolute pleasure assisting you today, [Customer]. Your patience and kindness made this interaction wonderful. Please don't hesitate to reach out whenever you need support. Have a fantastic day ahead! 🌟",
          ar: "لقد كان من دواعي سروري المطلق مساعدتك اليوم، [Customer]. صبرك ولطفك جعل هذا التفاعل رائعًا. لا تتردد في التواصل معنا كلما احتجت للدعم. أتمنى لك يومًا رائعًا! 🌟",
        },
      },
    },
  }

  const translateName = (name: string) => {
    if (currentLanguage === "ar" && name) {
      const lowerName = name.toLowerCase().trim()
      return nameTranslations[lowerName] || name
    }
    return name
  }

  const convertOrderId = () => {
    setErrorMessage("")

    if (!orderInput.trim()) {
      setErrorMessage("Please enter an Order ID")
      return
    }

    if (!/^[A-Za-z]\d{12,}$/.test(orderInput)) {
      setErrorMessage("Order ID must start with a letter followed by at least 12 digits (e.g., A176177000006)")
      return
    }

    let processed = orderInput.substring(1)
    processed = processed.substring(0, processed.length - 5)

    if (!processed) {
      setErrorMessage("Unable to generate User ID from this Order ID")
      return
    }

    setResultValue(processed)
    setShowResult(true)
  }

  const updateConversationStage = (templateId: string) => {
    const template = templateId.split("-")[0]

    if (template === "greeting") {
      setConversationStage("helping")
    } else if (template === "closing_help" || template === "csat_ending") {
      setConversationStage("closing")
    } else if (templateId.includes("closing_offer") || templateId.includes("kind_closure")) {
      setConversationStage("ended")
    } else {
      setConversationStage("resolving")
    }
  }

  const updateRecommendations = (templateId: string) => {
    const smartRecs = getSmartRecommendations(templateId)
    setRecommendations(smartRecs)
    setLastUsedTemplate(templateId)

    // Update conversation stage
    updateConversationStage(templateId)

    // Track used templates
    setUsedTemplates((prev) => new Set([...prev, templateId]))
  }

  const copyToClipboard = async (text: string, message = "Copied!", cardId?: string, templateId?: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setFeedback(message)
      setShowFeedback(true)

      if (cardId) {
        setCopiedCards((prev) => new Set([...prev, cardId]))
        setTimeout(() => {
          setCopiedCards((prev) => {
            const newSet = new Set(prev)
            newSet.delete(cardId)
            return newSet
          })
        }, 2000)
      }

      if (templateId) {
        updateRecommendations(templateId)
      }

      setTimeout(() => setShowFeedback(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const insertToVerloop = async (text: string, templateId?: string) => {
    try {
      // Try to find Verloop editor
      const editor = document.querySelector(".editor") as HTMLElement

      if (editor) {
        // HTML encode the text to prevent breaking the editor
        const encodedText = text
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#39;")

        // Insert text into Verloop editor
        editor.innerHTML = `<p class="editor-paragraph">${encodedText}</p>`

        // Focus the editor so agent can press Enter to send
        editor.focus()

        await copyToClipboard(text, "Inserted to Verloop!", undefined, templateId)
      } else {
        // Fallback to clipboard if Verloop editor not found
        await copyToClipboard(text, "Verloop editor not found - copied to clipboard!", undefined, templateId)
      }
    } catch (error) {
      // Fallback to clipboard on any error
      await copyToClipboard(text, "Insert failed - copied to clipboard instead", undefined, templateId)
      console.error("Verloop integration error:", error)
    }
  }

  const processReplyText = (template: any, categoryKey: string) => {
    const translatedCustomerName = translateName(currentCustomerName) || ""
    const translatedAgentName = translateName(currentAgentName) || ""

    let replyText = template[currentLanguage]

    // Only replace if names are provided
    if (translatedCustomerName) {
      replyText = replyText.replace(/\[Customer\]/g, translatedCustomerName)
    } else {
      // Remove [Customer] and adjust text naturally
      replyText = replyText.replace(/\[Customer\],?\s*/g, "").replace(/,\s*\[Customer\]/g, "")
    }

    if (translatedAgentName) {
      replyText = replyText.replace(/\[Agent\]/g, translatedAgentName)
    } else {
      // Remove [Agent] and adjust text naturally
      replyText = replyText.replace(/\[Agent\],?\s*/g, "").replace(/,\s*\[Agent\]/g, "")
    }

    if (categoryKey === "availability") {
      const itemPrefix = itemName ? `Regarding ${itemName}: ` : ""
      replyText = replyText.replace("[ItemName]", itemPrefix)
    }

    if (categoryKey === "delivery_date") {
      const deliveryDateText = deliveryDate || "[DeliveryDate]"
      replyText = replyText.replace(/\[DeliveryDate\]/g, deliveryDateText)
    }

    if (categoryKey === "bear_with_me") {
      const waitingTimeText = waitingTime || "[WaitTime]"
      replyText = replyText.replace(/\[WaitTime\]/g, waitingTimeText)
    }

    if (categoryKey === "ticket_system") {
      const ticketNumberText = ticketNumber || "[TicketNumber]"
      replyText = replyText.replace(/\[TicketNumber\]/g, ticketNumberText)
    }

    return replyText
  }

  const processRecommendationText = (text: string) => {
    const translatedCustomerName = translateName(currentCustomerName) || ""
    const translatedAgentName = translateName(currentAgentName) || ""

    let processedText = text

    if (translatedCustomerName) {
      processedText = processedText.replace(/\[Customer\]/g, translatedCustomerName)
    } else {
      processedText = processedText.replace(/\[Customer\],?\s*/g, "").replace(/,\s*\[Customer\]/g, "")
    }

    if (translatedAgentName) {
      processedText = processedText.replace(/\[Agent\]/g, translatedAgentName)
    } else {
      processedText = processedText.replace(/\[Agent\],?\s*/g, "").replace(/,\s*\[Agent\]/g, "")
    }

    return processedText
  }

  // Filter templates based on search term - IMPROVED SEARCH
  const filteredCategories = Object.entries(replyCategories).filter(([categoryKey, category]) => {
    if (!searchTerm) return true

    const searchLower = searchTerm.toLowerCase()

    // Search in category title
    const categoryMatch = category.title.toLowerCase().includes(searchLower)

    // Search in template content (both languages)
    const templateMatch = Object.entries(category.templates).some(([templateKey, template]) => {
      const keyMatch = templateKey.toLowerCase().includes(searchLower)
      const englishMatch = template.en.toLowerCase().includes(searchLower)
      const arabicMatch = template.ar.toLowerCase().includes(searchLower)
      return keyMatch || englishMatch || arabicMatch
    })

    return categoryMatch || templateMatch
  })

  // Update keyword recommendations when customer message changes
  useEffect(() => {
    if (customerMessage.trim()) {
      const keywordRecs = analyzeCustomerMessage(customerMessage)
      setKeywordRecommendations(keywordRecs)
    } else {
      setKeywordRecommendations([])
    }
  }, [customerMessage, currentLanguage])

  // Agent Setup Modal
  if (showAgentSetup) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 border-4 border-amber-400">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🛠️</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to CS Helper</h2>
            <p className="text-gray-600">Please enter your name to get started:</p>
          </div>
          <input
            type="text"
            value={tempAgentName}
            onChange={(e) => setTempAgentName(e.target.value)}
            placeholder="Your name"
            className="w-full p-3 border-2 border-amber-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            onKeyPress={(e) => e.key === "Enter" && saveAgentName()}
            autoFocus
          />
          <button
            onClick={saveAgentName}
            disabled={!tempAgentName.trim()}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-lg font-bold hover:from-amber-600 hover:to-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
          >
            Start Using CS Helper
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-4 shadow-lg sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span className="text-xl">🛠️</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">CS Helper</h1>
              <p className="text-amber-100 text-sm">Brands For Less Customer Service Tool</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-amber-100">Agent</p>
              <p className="font-semibold">{currentAgentName}</p>
            </div>
            <button
              onClick={changeAgentName}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded-lg text-sm transition-all"
            >
              Change
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Vertical Layout */}
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Order ID to User ID Converter - Open by default */}
        <div className="bg-white rounded-xl shadow-lg border-2 border-amber-200">
          <div
            className="p-4 cursor-pointer flex items-center justify-between bg-gradient-to-r from-amber-100 to-orange-100 rounded-t-xl"
            onClick={() => setShowOrderConverter(!showOrderConverter)}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🔄</span>
              <h2 className="text-xl font-bold text-gray-800">Order ID → User ID Converter</h2>
            </div>
            <span className={`transform transition-transform ${showOrderConverter ? "rotate-180" : ""}`}>⬇️</span>
          </div>
          {showOrderConverter && (
            <div className="p-6">
              <div className="flex space-x-4 mb-4">
                <input
                  type="text"
                  value={orderInput}
                  onChange={(e) => setOrderInput(e.target.value)}
                  placeholder="Enter Order ID (e.g., A176177000006)"
                  className="flex-1 p-3 border-2 border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  onKeyPress={(e) => e.key === "Enter" && convertOrderId()}
                />
                <button
                  onClick={convertOrderId}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-lg font-bold hover:from-amber-600 hover:to-orange-600 transition-all"
                >
                  Convert
                </button>
              </div>
              {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}
              {showResult && (
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                  <p className="text-green-800 font-semibold mb-2">User ID:</p>
                  <div className="flex items-center space-x-2">
                    <code
                      className="bg-green-100 px-3 py-2 rounded font-mono text-lg cursor-pointer hover:bg-green-200 transition-colors flex-1"
                      onClick={() => copyToClipboard(resultValue, "User ID copied!")}
                    >
                      {resultValue}
                    </code>
                    <button
                      onClick={() => copyToClipboard(resultValue, "User ID copied!")}
                      className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition-colors"
                    >
                      📋
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Reply Templates Section */}
        <div className="bg-white rounded-xl shadow-lg border-2 border-amber-200">
          <div
            className="p-4 cursor-pointer flex items-center justify-between bg-gradient-to-r from-blue-100 to-indigo-100 rounded-t-xl"
            onClick={() => setShowReplyTemplates(!showReplyTemplates)}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">💬</span>
              <h2 className="text-xl font-bold text-gray-800">Reply Templates</h2>
            </div>
            <span className={`transform transition-transform ${showReplyTemplates ? "rotate-180" : ""}`}>⬇️</span>
          </div>
          {showReplyTemplates && (
            <div className="p-6">
              {/* Search Bar */}
              <div className="mb-6">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search templates by title or content..."
                  className="w-full p-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Template Categories */}
              <div className="space-y-4">
                {filteredCategories.map(([categoryKey, category]) => (
                  <div key={categoryKey} className="border border-gray-200 rounded-lg">
                    <h3 className="bg-gray-50 px-4 py-2 font-semibold text-gray-700 rounded-t-lg">{category.title}</h3>
                    <div className="p-4 space-y-3">
                      {Object.entries(category.templates).map(([templateKey, template]) => {
                        const templateId = `${categoryKey}-${templateKey}`
                        const processedText = processReplyText(template, categoryKey)
                        const isUsed = copiedCards.has(templateId)

                        return (
                          <div
                            key={templateKey}
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                              isUsed
                                ? "bg-green-100 border-green-300"
                                : "bg-gray-50 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                            }`}
                            onClick={() => insertToVerloop(processedText, templateId)}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <p className="text-gray-800 leading-relaxed whitespace-pre-line">{processedText}</p>
                              </div>
                              <button className="ml-4 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors">
                                Insert
                              </button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Smart Recommendations */}
        <div className="bg-white rounded-xl shadow-lg border-2 border-amber-200">
          <div
            className="p-4 cursor-pointer flex items-center justify-between bg-gradient-to-r from-purple-100 to-pink-100 rounded-t-xl"
            onClick={() => setShowSmartRecommendations(!showSmartRecommendations)}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🧠</span>
              <h2 className="text-xl font-bold text-gray-800">Smart Recommendations</h2>
            </div>
            <span className={`transform transition-transform ${showSmartRecommendations ? "rotate-180" : ""}`}>⬇️</span>
          </div>
          {showSmartRecommendations && (
            <div className="p-6">
              {/* Customer Message Analysis */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Customer Message (for keyword analysis):
                </label>
                <textarea
                  value={customerMessage}
                  onChange={(e) => setCustomerMessage(e.target.value)}
                  placeholder="Paste customer message here to get smart recommendations..."
                  className="w-full p-3 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  rows={3}
                />
              </div>

              {/* Keyword-based Recommendations */}
              {keywordRecommendations.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">📊 Keyword-Based Recommendations</h3>
                  <div className="space-y-3">
                    {keywordRecommendations.map((rec) => {
                      const processedText = processRecommendationText(rec.text)
                      const isUsed = copiedCards.has(rec.id)

                      return (
                        <div
                          key={rec.id}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            isUsed
                              ? "bg-green-100 border-green-300"
                              : "bg-purple-50 border-purple-200 hover:border-purple-400 hover:bg-purple-100"
                          }`}
                          onClick={() => insertToVerloop(processedText, rec.id)}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="bg-purple-200 text-purple-800 px-2 py-1 rounded text-xs font-medium">
                                  {rec.category}
                                </span>
                                <span className="text-xs text-gray-500">
                                  Score: {rec.score} | Keywords: {rec.keywords.join(", ")}
                                </span>
                              </div>
                              <p className="text-gray-800 leading-relaxed whitespace-pre-line">{processedText}</p>
                            </div>
                            <button className="ml-4 bg-purple-500 text-white px-3 py-1 rounded text-sm hover:bg-purple-600 transition-colors">
                              Insert
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Context-based Recommendations */}
              {recommendations.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">🎯 Context-Based Recommendations</h3>
                  <div className="space-y-3">
                    {recommendations.map((rec) => {
                      const processedText = processRecommendationText(rec.text)
                      const isUsed = copiedCards.has(rec.id)

                      return (
                        <div
                          key={rec.id}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            isUsed
                              ? "bg-green-100 border-green-300"
                              : "bg-purple-50 border-purple-200 hover:border-purple-400 hover:bg-purple-100"
                          }`}
                          onClick={() => insertToVerloop(processedText, rec.id)}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="bg-purple-200 text-purple-800 px-2 py-1 rounded text-xs font-medium">
                                  {rec.category}
                                </span>
                                <span className="text-xs text-gray-500">{rec.reason}</span>
                              </div>
                              <p className="text-gray-800 leading-relaxed">{processedText}</p>
                            </div>
                            <button className="ml-4 bg-purple-500 text-white px-3 py-1 rounded text-sm hover:bg-purple-600 transition-colors">
                              Insert
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {keywordRecommendations.length === 0 && recommendations.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-lg">🤖 No recommendations yet</p>
                  <p className="text-sm">
                    Paste a customer message above or use a template to get smart recommendations
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Customer Personalization */}
        <div className="bg-white rounded-xl shadow-lg border-2 border-amber-200">
          <div
            className="p-4 cursor-pointer flex items-center justify-between bg-gradient-to-r from-green-100 to-teal-100 rounded-t-xl"
            onClick={() => setShowPersonalization(!showPersonalization)}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">👤</span>
              <h2 className="text-xl font-bold text-gray-800">Customer Personalization</h2>
            </div>
            <span className={`transform transition-transform ${showPersonalization ? "rotate-180" : ""}`}>⬇️</span>
          </div>
          {showPersonalization && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Customer Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
                  <input
                    type="text"
                    value={currentCustomerName}
                    onChange={(e) => setCurrentCustomerName(e.target.value)}
                    placeholder="Enter customer name"
                    className="w-full p-3 border-2 border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                {/* Language Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setCurrentLanguage("en")}
                      className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                        currentLanguage === "en"
                          ? "bg-green-500 text-white border-green-500"
                          : "bg-white text-gray-700 border-green-300 hover:border-green-500"
                      }`}
                    >
                      🇬🇧 English
                    </button>
                    <button
                      onClick={() => setCurrentLanguage("ar")}
                      className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                        currentLanguage === "ar"
                          ? "bg-green-500 text-white border-green-500"
                          : "bg-white text-gray-700 border-green-300 hover:border-green-500"
                      }`}
                    >
                      🇸🇦 العربية
                    </button>
                  </div>
                </div>

                {/* Gender Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setCustomerGender("male")}
                      className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                        customerGender === "male"
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-white text-gray-700 border-green-300 hover:border-green-500"
                      }`}
                    >
                      👨 Male
                    </button>
                    <button
                      onClick={() => setCustomerGender("female")}
                      className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                        customerGender === "female"
                          ? "bg-pink-500 text-white border-pink-500"
                          : "bg-white text-gray-700 border-green-300 hover:border-green-500"
                      }`}
                    >
                      👩 Female
                    </button>
                  </div>
                </div>

                {/* Customer Country */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Customer Country</label>
                  <select
                    value={currentCustomerCountry}
                    onChange={(e) => setCurrentCustomerCountry(e.target.value)}
                    className="w-full p-3 border-2 border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select Country</option>
                    <option value="uae">🇦🇪 UAE</option>
                    <option value="ksa">🇸🇦 Saudi Arabia</option>
                    <option value="lebanon">🇱🇧 Lebanon</option>
                    <option value="kuwait">🇰🇼 Kuwait</option>
                    <option value="oman">🇴🇲 Oman</option>
                    <option value="qatar">🇶🇦 Qatar</option>
                    <option value="bahrain">🇧🇭 Bahrain</option>
                    <option value="singapore">🇸🇬 Singapore</option>
                    <option value="malaysia">🇲🇾 Malaysia</option>
                  </select>
                </div>
              </div>

              {/* Return Fee Information */}
              {currentCustomerCountry && countryFees[currentCustomerCountry] && (
                <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Return Fee Information:</h3>
                  <p className="text-blue-700">
                    <strong>Fee:</strong> {countryFees[currentCustomerCountry].fee}
                  </p>
                  <p className="text-blue-700">
                    <strong>Details:</strong> {countryFees[currentCustomerCountry].details}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Ticket & Additional Information */}
        <div className="bg-white rounded-xl shadow-lg border-2 border-amber-200">
          <div
            className="p-4 cursor-pointer flex items-center justify-between bg-gradient-to-r from-red-100 to-pink-100 rounded-t-xl"
            onClick={() => setShowTicketInfo(!showTicketInfo)}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🎫</span>
              <h2 className="text-xl font-bold text-gray-800">Ticket & Additional Information</h2>
            </div>
            <span className={`transform transition-transform ${showTicketInfo ? "rotate-180" : ""}`}>⬇️</span>
          </div>
          {showTicketInfo && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Ticket Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ticket Number</label>
                  <input
                    type="text"
                    value={ticketNumber}
                    onChange={(e) => setTicketNumber(e.target.value)}
                    placeholder="Enter ticket number"
                    className="w-full p-3 border-2 border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                {/* Item Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
                  <input
                    type="text"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    placeholder="Enter item name"
                    className="w-full p-3 border-2 border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                {/* Delivery Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Date</label>
                  <input
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full p-3 border-2 border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                {/* Waiting Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Waiting Time</label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={waitingTime}
                      onChange={(e) => setWaitingTime(e.target.value)}
                      placeholder="Enter waiting time"
                      className="flex-1 p-3 border-2 border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                    <button
                      onClick={() => setWaitingTime("1 minute")}
                      className="bg-red-500 text-white px-3 py-2 rounded text-sm hover:bg-red-600 transition-colors"
                    >
                      1min
                    </button>
                    <button
                      onClick={() => setWaitingTime("2 minutes")}
                      className="bg-red-500 text-white px-3 py-2 rounded text-sm hover:bg-red-600 transition-colors"
                    >
                      2min
                    </button>
                    <button
                      onClick={() => setWaitingTime("5 minutes")}
                      className="bg-red-500 text-white px-3 py-2 rounded text-sm hover:bg-red-600 transition-colors"
                    >
                      5min
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* About This Tool - At Bottom */}
        <div className="bg-white rounded-xl shadow-lg border-2 border-amber-200">
          <div
            className="p-4 cursor-pointer flex items-center justify-between bg-gradient-to-r from-gray-100 to-slate-100 rounded-t-xl"
            onClick={() => setShowAboutTool(!showAboutTool)}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">ℹ️</span>
              <h2 className="text-xl font-bold text-gray-800">About This Tool</h2>
            </div>
            <span className={`transform transition-transform ${showAboutTool ? "rotate-180" : ""}`}>⬇️</span>
          </div>
          {showAboutTool && (
            <div className="p-6">
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-amber-800 mb-4">🛠️ CS Helper - Agent Support Tool</h3>
                <div className="space-y-3 text-gray-700">
                  <p>
                    <strong>Purpose:</strong> Streamline customer service operations with quick access to templates,
                    order conversion, and smart recommendations.
                  </p>
                  <p>
                    <strong>Features:</strong> Order ID conversion, personalized reply templates, smart recommendations,
                    and customer personalization tools.
                  </p>
                  <p>
                    <strong>Usage:</strong> Click templates to insert directly into Verloop or copy to clipboard.
                    Templates automatically adapt based on customer language and personalization settings.
                  </p>
                  <p>
                    <strong>Smart Recommendations:</strong> Get context-aware suggestions based on conversation flow and
                    customer message analysis.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-amber-200 text-center">
                  <p className="text-sm text-gray-600">Made by agent for agents ✨</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Feedback Toast */}
      {showFeedback && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
          {feedback}
        </div>
      )}
    </div>
  )
}
