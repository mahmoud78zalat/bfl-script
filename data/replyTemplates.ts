import type { TemplateCategory } from "@/types"

export const replyCategories: Record<string, TemplateCategory> = {
  greetings: {
    title: "🌟 Greetings",
    templates: {
      welcome: {
        en: "Hello [Customer]! Welcome to Brands for Less customer service. I'm [Agent] and I'm here to help you today. How can I assist you?",
        ar: "مرحباً [Customer]! أهلاً بك في خدمة عملاء براندز فور ليس. أنا [Agent] وأنا هنا لمساعدتك اليوم. كيف يمكنني مساعدتك؟",
      },
      good_morning: {
        en: "Good morning [Customer]! I hope you're having a wonderful day. I'm [Agent] from Brands for Less customer service. How may I help you today?",
        ar: "صباح الخير [Customer]! أتمنى أن تقضي يوماً رائعاً. أنا [Agent] من خدمة عملاء براندز فور ليس. كيف يمكنني مساعدتك اليوم؟",
      },
      good_afternoon: {
        en: "Good afternoon [Customer]! Thank_you for contacting Brands for Less. I'm [Agent] and I'm ready to assist you. What can I do for you?",
        ar: "مساء الخير [Customer]! شكراً لتواصلك مع براندز فور ليس. أنا [Agent] ومستعد لمساعدتك. ماذا يمكنني أن أفعل لك؟",
      },
    },
  },

  order_inquiries: {
    title: "📦 Order Inquiries",
    templates: {
      ask_order_id: {
        en: "I can help you check your order status. Please share your order ID starting with letter A.",
        ar: "يمكنني مساعدتك في التحقق من حالة طلبك. يرجى مشاركة رقم الطلب الذي يبدأ بالحرف A.",
      },
      order_status: {
        en: "Hi [Customer], I'd be happy to check your order status for you. Could you please provide me with your order number or the phone number used for the purchase?",
        ar: "مرحباً [Customer]، سأكون سعيداً للتحقق من حالة طلبك. هل يمكنك تزويدي برقم الطلب أو رقم الهاتف المستخدم للشراء؟",
      },
      delivery_inquiry: {
        en: "Hello [Customer], regarding your delivery inquiry, I'll check the current status of your order. The estimated delivery date is [DeliveryDate]. I'll provide you with an update shortly.",
        ar: "مرحباً [Customer]، بخصوص استفسارك عن التوصيل، سأتحقق من الحالة الحالية لطلبك. تاريخ التوصيل المقدر هو [DeliveryDate]. سأزودك بالتحديث قريباً.",
      },
      order_modification: {
        en: "Hi [Customer], I understand you'd like to modify your order. Let me check if this is possible. Please note that modifications can only be made if the order hasn't been processed yet.",
        ar: "مرحباً [Customer]، أفهم أنك تريد تعديل طلبك. دعني أتحقق من إمكانية ذلك. يرجى ملاحظة أن التعديلات يمكن إجراؤها فقط إذا لم تتم معالجة الطلب بعد.",
      },
    },
  },

  returns_exchanges: {
    title: "🔄 Returns & Exchanges",
    templates: {
      return_policy: {
        en: "Hi [Customer], I'd be happy to help you with your return. Our return policy allows returns within 14 days of purchase with the original receipt and tags attached. What item would you like to return?",
        ar: "مرحباً [Customer]، سأكون سعيداً لمساعدتك في الإرجاع. سياسة الإرجاع لدينا تسمح بالإرجاع خلال 14 يوماً من الشراء مع الإيصال الأصلي والعلامات مرفقة. ما هو المنتج الذي تريد إرجاعه؟",
      },
      exchange_request: {
        en: "Hello [Customer], I can help you with your exchange request. Please provide me with your order details and let me know what size/color you'd like to exchange to.",
        ar: "مرحباً [Customer]، يمكنني مساعدتك في طلب الاستبدال. يرجى تزويدي بتفاصيل طلبك وأخبرني بالمقاس/اللون الذي تريد الاستبدال إليه.",
      },
      refund_status: {
        en: "Hi [Customer], regarding your refund inquiry, I'll check the status for you. Refunds typically take 5-7 business days to process once the return is received. Let me get you an update.",
        ar: "مرحباً [Customer]، بخصوص استفسارك عن الاسترداد، سأتحقق من الحالة لك. عادة ما يستغرق الاسترداد 5-7 أيام عمل للمعالجة بمجرد استلام الإرجاع. دعني أحصل لك على تحديث.",
      },
    },
  },

  payment_issues: {
    title: "💳 Payment Issues",
    templates: {
      payment_failed: {
        en: "Hi [Customer], I see you're experiencing payment issues. Let me help you resolve this. Could you please try using a different payment method or contact your bank to ensure there are no restrictions?",
        ar: "مرحباً [Customer]، أرى أنك تواجه مشاكل في الدفع. دعني أساعدك في حل هذا. هل يمكنك المحاولة باستخدام طريقة دفع مختلفة أو الاتصال بالبنك للتأكد من عدم وجود قيود؟",
      },
      refund_inquiry: {
        en: "Hello [Customer], I understand you have a question about your refund. Let me check the status of your refund request and provide you with an accurate update.",
        ar: "مرحباً [Customer]، أفهم أن لديك سؤال حول الاسترداد. دعني أتحقق من حالة طلب الاسترداد وأزودك بتحديث دقيق.",
      },
      billing_dispute: {
        en: "Hi [Customer], I'm here to help resolve your billing concern. Could you please provide me with more details about the charge you're questioning so I can investigate this for you?",
        ar: "مرحباً [Customer]، أنا هنا لمساعدتك في حل مشكلة الفوترة. هل يمكنك تزويدي بمزيد من التفاصيل حول الرسوم التي تستفسر عنها حتى أتمكن من التحقيق في هذا الأمر؟",
      },
    },
  },

  product_information: {
    title: "🛍️ Product Information",
    templates: {
      treasure_hunt_concept: {
        en: `At Brands For Less, we follow a unique "treasure hunt" shopping concept, which means our products are always changing and selling out fast. We do not reserve or hold stock in any specific store, and inventory moves quickly as our customers love finding great deals and limited pieces. Because of this, we’re unable to confirm the availability of specific items at a particular store. Even if a product is available at the time of inquiry, it may be sold out by the time you visit. We kindly encourage you to visit your nearest Brands For Less store—each visit is a new experience, and we’re sure you’ll find amazing items you’ll love!`,
        ar: `في براندز فور ليس، نتبع مفهوم تسوق فريد يسمى "البحث عن الكنز"، مما يعني أن منتجاتنا تتغير باستمرار وتُباع بسرعة. نحن لا نحتفظ أو نحجز المخزون في أي متجر معين، والمخزون يتحرك بسرعة حيث يحب عملاؤنا العثور على صفقات رائعة وقطع محدودة. لهذا السبب، لا يمكننا تأكيد توفر منتجات معينة في متجر معين. حتى لو كان المنتج متاحًا وقت الاستفسار، فقد يكون قد بيع بحلول وقت زيارتك. نشجعك بلطف على زيارة أقرب متجر لبراندز فور ليس—كل زيارة هي تجربة جديدة، ونحن على يقين بأنك ستجد منتجات رائعة ستحبها!`,
      },
    },
  },

  technical_support: {
    title: "🔧 Technical Support",
    templates: {
      website_issues: {
        en: `Hi [Customer], I'm sorry to hear you're experiencing technical difficulties with our website. Let me help you resolve this. Could you please describe the specific issue you're encountering?`,
        ar: `مرحباً [Customer]، أعتذر لسماع أنك تواجه صعوبات تقنية مع موقعنا. دعني أساعدك في حل هذا. هل يمكنك وصف المشكلة المحددة التي تواجهها؟`,
      },
      app_troubleshooting: {
        en: `Hello [Customer], I can help you troubleshoot the app issue. Please try clearing your app cache, updating to the latest version, or restarting your device. Let me know if the problem persists.`,
        ar: `مرحباً [Customer]، يمكنني مساعدتك في حل مشكلة التطبيق. يرجى المحاولة بمسح ذاكرة التطبيق المؤقتة، التحديث إلى أحدث إصدار، أو إعادة تشغيل جهازك. أخبرني إذا استمرت المشكلة.`,
      },
      login_problems: {
        en: `Hi [Customer], I understand you're having trouble logging in. Let me help you regain access to your account. Have you tried resetting your password using the "Forgot Password" option?`,
        ar: `مرحباً [Customer]، أفهم أنك تواجه مشكلة في تسجيل الدخول. دعني أساعدك في استعادة الوصول إلى حسابك. هل جربت إعادة تعيين كلمة المرور باستخدام خيار "نسيت كلمة المرور"؟`,
      },
    },
  },

  waiting_responses: {
    title: "⏳ Waiting Responses",
    templates: {
      checking_system: {
        en: `Thank you for your patience, [Customer]. I'm currently checking our system for the most up-to-date information regarding your inquiry. This will just take [WaitTime].`,
        ar: `شكراً لصبرك، [Customer]. أتحقق حالياً من نظامنا للحصول على أحدث المعلومات بخصوص استفسارك. سيستغرق هذا [WaitTime] فقط.`,
      },
      contacting_department: {
        en: `Please hold on, [Customer]. I'm contacting the relevant department to get you the most accurate information. I'll be back with you shortly.`,
        ar: `يرجى الانتظار، [Customer]. أتواصل مع القسم المختص للحصول على أدق المعلومات. سأعود إليك قريباً.`,
      },
      processing_request: {
        en: `I'm processing your request now, [Customer]. Thank you for your patience while I gather all the necessary details for you.`,
        ar: `أقوم بمعالجة طلبك الآن، [Customer]. شكراً لصبرك بينما أجمع كل التفاصيل اللازمة لك.`,
      },
    },
  },

  apologies: {
    title: "🙏 Apologies",
    templates: {
      general_apology: {
        en: `I sincerely apologize for any inconvenience this has caused you, [Customer]. Let me work on resolving this issue for you right away.`,
        ar: `أعتذر بصدق عن أي إزعاج تسبب لك هذا، [Customer]. دعني أعمل على حل هذه المشكلة لك فوراً.`,
      },
      delay_apology: {
        en: `I apologize for the delay in your order, [Customer]. I understand how frustrating this must be, and I'm here to help resolve this situation as quickly as possible.`,
        ar: `أعتذر عن التأخير في طلبك، [Customer]. أفهم مدى الإحباط الذي قد تشعر به، وأنا هنا لمساعدتك في حل هذا الوضع بأسرع ما يمكن.`,
      },
      service_apology: {
        en: `I'm truly sorry for the poor service experience you've had, [Customer]. This is not the standard we strive for at Brands for Less. Let me make this right for you.`,
        ar: `أعتذر بصدق عن تجربة الخدمة السيئة التي واجهتها، [Customer]. هذا ليس المستوى الذي نسعى إليه في براندز فور ليس. دعني أصحح هذا لك.`,
      },
    },
  },

  escalation: {
    title: "📞 Escalation",
    templates: {
      manager_escalation: {
        en: `I understand your concern, [Customer]. Let me escalate this to my supervisor who will be better equipped to assist you with this matter. Please hold while I connect you.`,
        ar: `أفهم قلقك، [Customer]. دعني أحيل هذا إلى مشرفي الذي سيكون مجهزاً بشكل أفضل لمساعدتك في هذا الأمر. يرجى الانتظار بينما أوصلك.`,
      },
      specialist_referral: {
        en: `For this specific issue, [Customer], I'd like to connect you with our specialist team who can provide you with more detailed assistance. They'll be able to help you better than I can.`,
        ar: `لهذه المشكلة المحددة، [Customer]، أود أن أوصلك بفريق المختصين لدينا الذي يمكنه تزويدك بمساعدة أكثر تفصيلاً. سيكونون قادرين على مساعدتك أفضل مني.`,
      },
      callback_arrangement: {
        en: `I'd like to arrange for a senior team member to call you back, [Customer]. What would be the best time to reach you at [CustomerPhone]?`,
        ar: `أود ترتيب مكالمة من عضو كبير في الفريق، [Customer]. ما هو أفضل وقت للوصول إليك على [CustomerPhone]؟`,
      },
    },
  },

  ticket_replies: {
    title: "🎫 Ticket Replies",
    templates: {
      ticket_opened: {
        en: `I've opened a ticket regarding your case, [Customer], and escalated it to the concerned team. You should receive a reply within 48 hours. Your ticket reference number will be provided shortly.`,
        ar: `لقد فتحت تذكرة بخصوص حالتك، [Customer]، وأحلتها إلى الفريق المختص. يجب أن تتلقى رداً خلال 48 ساعة. سيتم تزويدك برقم مرجع التذكرة قريباً.`,
      },
      ticket_escalated: {
        en: `Your case has been escalated to our specialized department, [Customer]. A ticket has been created and you'll receive an update within 48 hours. We appreciate your patience.`,
        ar: `تم تصعيد حالتك إلى قسمنا المتخصص، [Customer]. تم إنشاء تذكرة وستتلقى تحديثاً خلال 48 ساعة. نقدر صبرك.`,
      },
      ticket_follow_up: {
        en: `I've created a priority ticket for your case, [Customer]. Our specialized team will review this thoroughly and provide you with a comprehensive solution within 48 hours.`,
        ar: `لقد أنشأت تذكرة ذات أولوية لحالتك، [Customer]. سيراجع فريقنا المتخصص هذا بدقة ويزودك بحل شامل خلال 48 ساعة.`,
      },
    },
  },

  invoice_request: {
    title: "🧾 Invoice Request",
    templates: {
      invoice_request: {
        en: `We can proceed with a request to our specialized department to get the invoice number, [Customer]. We kindly request you to cooperate and provide us with the below information:

- Your mobile number: [CustomerPhone]
- Store Name:
- Date And Time Of Purchase:
- Item Code:
- Item Price:
- Total Amount Of The Invoice:
- Last four digits of CC:
- Your active email address:`,
        ar: `يمكننا المتابعة بطلب إلى قسمنا المتخصص للحصول على رقم الفاتورة، [Customer]. نطلب منك بلطف التعاون وتزويدنا بالمعلومات التالية:

- رقم هاتفك المحمول: [CustomerPhone]
- اسم المتجر:
- تاريخ ووقت الشراء:
- كود المنتج:
- سعر المنتج:
- المبلغ الإجمالي للفاتورة:
- آخر أربعة أرقام من بطاقة الائتمان:
- عنوان بريدك الإلكتروني النشط:`,
      },
      invoice_request_detailed: {
        en: `Hello [Customer], I'll be happy to help you obtain your invoice. To process this request efficiently, our billing department requires the following information. Please provide:

- Mobile number: [CustomerPhone]
- Store Name where purchase was made:
- Exact Date And Time Of Purchase:
- Item Code/SKU:
- Item Price:
- Total Amount Of The Invoice:
- Last four digits of your Credit Card:
- Your active email address:

Once I have this information, I'll forward your request to our specialized invoice department.`,
        ar: `مرحباً [Customer]، سأكون سعيداً لمساعدتك في الحصول على فاتورتك. لمعالجة هذا الطلب بكفاءة، يتطلب قسم الفوترة لدينا المعلومات التالية. يرجى تقديم:

- رقم الهاتف المحمول: [CustomerPhone]
- اسم المتجر حيث تم الشراء:
- التاريخ والوقت الدقيق للشراء:
- كود المنتج/رقم التخزين:
- سعر المنتج:
- المبلغ الإجمالي للفاتورة:
- آخر أربعة أرقام من بطاقتك الائتمانية:
- عنوان بريدك الإلكتروني النشط:

بمجرد حصولي على هذه المعلومات، سأحيل طلبك إلى قسم الفواتير المتخصص لدينا.`,
      },
    },
  },

  idle_checking: {
    title: "💤 Idle Checking",
    templates: {
      idle_1: {
        en: `Hello [Customer], are you still connected?`,
        ar: `مرحباً [Customer]، هل لا تزال متصلاً؟`,
      },
      idle_2: {
        en: `Hi [Customer], I'm still here to help you. Please let me know if you need any assistance or if you have any questions.`,
        ar: `مرحباً [Customer]، لا أزال هنا لمساعدتك. يرجى إعلامي إذا كنت بحاجة إلى أي مساعدة أو إذا كان لديك أي أسئلة.`,
      },
      idle_closure: {
        en: `Thank you for contacting Brands For Less, [Customer]. Since I haven't heard from you for a while, I'll be closing this chat now. If you need any assistance in the future, please don't hesitate to reach out to us. We're always here to help! Have a great day! 😊`,
        ar: `شكرًا لتواصلك مع براندز فور ليس، [Customer]. بما أنني لم أسمع منك منذ فترة، سأقوم بإغلاق هذه المحادثة الآن. إذا كنت بحاجة إلى أي مساعدة في المستقبل، لا تتردد في التواصل معنا. نحن دائماً هنا للمساعدة! أتمنى لك يومًا رائعًا! 😊`,
      },
    },
  },

  // New category for offensive language warnings
  offensive_language: {
    title: "⚠️ Offensive Language",
    templates: {
      first_warning: {
        en: `[Customer], I understand you may be frustrated, but I kindly ask you to maintain respectful language during our conversation. I'm here to help you resolve your issue. Let's work together to find a solution.`,
        ar: `[Customer]، أفهم أنك قد تكون محبطاً، لكنني أطلب منك بلطف الحفاظ على لغة محترمة أثناء محادثتنا. أنا هنا لمساعدتك في حل مشكلتك. دعنا نعمل معاً لإيجاد حل.`,
      },
      second_warning: {
        en: `[Customer], this is my second request for you to use appropriate language. I want to help you, but I need you to communicate respectfully. If the inappropriate language continues, I may need to end this conversation.`,
        ar: `[Customer]، هذا طلبي الثاني لك لاستخدام لغة مناسبة. أريد مساعدتك، لكنني أحتاج منك التواصل باحترام. إذا استمرت اللغة غير المناسبة، قد أحتاج إلى إنهاء هذه المحادثة.`,
      },
      offensive_closure: {
        en: `[Customer], I'm sorry, but due to the continued use of inappropriate language, I need to end this conversation. You're welcome to contact us again when you're ready to communicate respectfully. Thank you for understanding.`,
        ar: `[Customer], أنا آسف، لكن بسبب الاستمرار في استخدام لغة غير مناسبة، أحتاج إلى إنهاء هذه المحادثة. يمكنك التواصل معنا مرة أخرى عندما تكون مستعداً للتواصل باحترام. شكراً لتفهمك.`,
      },
    },
  },

  // Enhanced Resolution Check category
  customer_resolution_check: {
    title: "✅ Resolution Check",
    templates: {
      offer_additional_help: {
        en: `I hope I was able to resolve your concern today, [Customer]. Is there anything else I can help you with before we conclude our chat?`,
        ar: `أتمنى أن أكون قد تمكنت من حل مشكلتك اليوم، [Customer]. هل هناك أي شيء آخر يمكنني مساعدتك به قبل أن ننهي محادثتنا؟`,
      },
      satisfaction_check: {
        en: `How are you feeling about the solution we've provided today, [Customer]? Is there anything else you'd like me to clarify or assist you with?`,
        ar: `كيف تشعر بخصوص الحل الذي قدمناه اليوم، [Customer]؟ هل هناك أي شيء آخر تريد مني توضيحه أو مساعدتك به؟`,
      },
      final_check: {
        en: `Before we wrap up, [Customer], I want to make sure all your questions have been answered and your concerns addressed. Is there anything else on your mind?`,
        ar: `قبل أن ننهي، [Customer]، أريد التأكد من أن جميع أسئلتك قد تمت الإجابة عليها ومخاوفك قد تم التعامل معها. هل هناك أي شيء آخر في ذهنك؟`,
      },
      follow_up_offer: {
        en: `Is there any other way I can assist you today, [Customer]? I want to ensure you have everything you need before we close this conversation.`,
        ar: `هل هناك أي طريقة أخرى يمكنني مساعدتك بها اليوم، [Customer]؟ أريد التأكد من أن لديك كل ما تحتاجه قبل أن نغلق هذه المحادثة.`,
      },
      concern_resolution: {
        en: `I believe we've addressed your main concern, [Customer]. Do you feel satisfied with the resolution, or is there anything else you'd like to discuss?`,
        ar: `أعتقد أننا تعاملنا مع مشكلتك الرئيسية، [Customer]. هل تشعر بالرضا عن الحل، أم هناك أي شيء آخر تريد مناقشته؟`,
      },
      comprehensive_check: {
        en: `Let me do a quick check, [Customer] - have we covered everything you needed help with today? Any other questions or concerns I can address for you?`,
        ar: `دعني أقوم بفحص سريع، [Customer] - هل غطينا كل ما احتجت المساعدة به اليوم؟ أي أسئلة أو مخاوف أخرى يمكنني التعامل معها لك؟`,
      },
      quality_assurance: {
        en: `I want to ensure we've provided you with excellent service today, [Customer]. Are you completely satisfied with how we've handled your request?`,
        ar: `أريد التأكد من أننا قدمنا لك خدمة ممتازة اليوم، [Customer]. هل أنت راضٍ تماماً عن كيفية تعاملنا مع طلبك؟`,
      },
      service_completion: {
        en: `We're almost done here, [Customer]. Is there anything else you need clarification on or any other matter I can help you with today?`,
        ar: `نحن على وشك الانتهاء هنا، [Customer]. هل هناك أي شيء آخر تحتاج توضيحاً بشأنه أو أي أمر آخر يمكنني مساعدتك به اليوم؟`,
      },
    },
  },

  csat: {
    title: "⭐ Customer Satisfaction (CSAT)",
    templates: {
      survey_request: {
        en: `Thank you for contacting Brands For Less, [Customer]. There will be a survey after we close this chat - I kindly request you to rate our interaction today. Your feedback helps us improve our service! 🌟`,
        ar: `شكراً لتواصلك مع براندز فور ليس، [Customer]. سيكون هناك استطلاع بعد إغلاق هذه المحادثة - أطلب منك بلطف تقييم تفاعلنا اليوم. ملاحظاتك تساعدنا على تحسين خدمتنا! 🌟`,
      },
      rating_request: {
        en: `Before we close this chat, [Customer], there will be a survey where I kindly request you to rate our interaction today. Your feedback is very important to us and helps us serve you better! ⭐`,
        ar: `قبل إغلاق هذه المحادثة، [Customer]، سيكون هناك استطلاع حيث أطلب منك بلطف تقييم تفاعلنا اليوم. ملاحظاتك مهمة جداً بالنسبة لنا وتساعدنا على خدمتك بشكل أفضل! ⭐`,
      },
      feedback_appreciation: {
        en: `I hope I was able to assist you well today, [Customer]. After closing this chat, there will be a survey - please be kind and rate our interaction. Your feedback means a lot to us! 💙`,
        ar: `أتمنى أن أكون قد تمكنت من مساعدتك جيداً اليوم، [Customer]. بعد إغلاق هذه المحادثة، سيكون هناك استطلاع - يرجى أن تكون لطيفاً وتقيم تفاعلنا. ملاحظاتك تعني الكثير بالنسبة لنا! 💙`,
      },
      survey_reminder: {
        en: `Thank you for your patience today, [Customer]. Please remember there will be a survey after this chat closes. I request you to be kind and rate our interaction - it really helps us improve! ✨`,
        ar: `شكراً لصبرك اليوم، [Customer]. يرجى تذكر أنه سيكون هناك استطلاع بعد إغلاق هذه المحادثة. أطلب منك أن تكون لطيفاً وتقيم تفاعلنا - هذا يساعدنا حقاً على التحسن! ✨`,
      },
      service_quality: {
        en: `Thank you for choosing Brands For Less, [Customer]. There will be a survey after we close this chat - I kindly ask you to rate our interaction today. Your honest feedback is valuable to us! 💯`,
        ar: `شكراً لاختيارك براندز فور ليس، [Customer]. سيكون هناك استطلاع بعد إغلاق هذه المحادثة - أطلب منك بلطف تقييم تفاعلنا اليوم. ملاحظاتك الصادقة قيمة بالنسبة لنا! 💯`,
      },
    },
  },

  closures: {
    title: "✅ Closures",
    templates: {
      thank_you: {
        en: `Thank you for contacting Brands for Less, [Customer]. It was my pleasure assisting you today. There will be a survey after this chat - please be kind and rate our interaction. Have a wonderful day!`,
        ar: `شكراً لتواصلك مع براندز فور ليس، [Customer]. كان من دواعي سروري مساعدتك اليوم. سيكون هناك استطلاع بعد هذه المحادثة - يرجى أن تكون لطيفاً وتقيم تفاعلنا. أتمنى لك يوماً رائعاً!`,
      },
      pleasure_helping: {
        en: `It was a pleasure helping you today, [Customer]. I hope I was able to resolve your concern satisfactorily. There will be a survey after this chat - please rate our interaction. Thank you for choosing Brands for Less!`,
        ar: `كان من دواعي سروري مساعدتك اليوم، [Customer]. أتمنى أن أكون قد تمكنت من حل مشكلتك بشكل مرضٍ. سيكون هناك استطلاع بعد هذه المحادثة - يرجى تقييم تفاعلنا. شكراً لاختيارك براندز فور ليس!`,
      },
      satisfaction_check_closure: {
        // This is a distinct closure template, different from the prompt in customer_resolution_check
        en: `Before we end our conversation, [Customer], is there anything else I can help you with today? There will be a survey after this chat - I kindly request you to rate our interaction. I want to make sure all your concerns have been addressed.`,
        ar: `قبل أن ننهي محادثتنا، [Customer]، هل هناك أي شيء آخر يمكنني مساعدتك به اليوم؟ سيكون هناك استطلاع بعد هذه المحادثة - أطلب منك بلطف تقييم تفاعلنا. أريد التأكد من أن جميع مخاوفك قد تم التعامل معها.`,
      },
      professional_closure: {
        en: `Thank you for your time today, [Customer]. Your issue has been resolved/escalated as discussed. There will be a survey after this chat - please be kind and rate our interaction. You can always contact us if you need further assistance. Have a great day!`,
        ar: `شكراً لوقتك اليوم، [Customer]. تم حل/تصعيد مشكلتك كما تم مناقشته. سيكون هناك استطلاع بعد هذه المحادثة - يرجى أن تكون لطيفاً وتقيم تفاعلنا. يمكنك دائماً الاتصال بنا إذا كنت بحاجة إلى مساعدة إضافية. أتمنى لك يوماً رائعاً!`,
      },
    },
  },
}

// Smart recommendation system with precise stage-based flow
export const getSmartRecommendations = (stage: string, usedTemplates: string[]): string[] => {
  const recommendations: Record<string, string[]> = {
    ready_to_start: ["welcome", "good_morning", "good_afternoon"], // Stage 1: Suggest greetings
    greeting_sent: ["ask_order_id"], // Stage 2: After greeting, ask for order ID
    order_id_asked: ["checking_system", "contacting_department", "processing_request"], // Stage 3: After asking for order ID, suggest "bear with me"
    bear_with_me_sent: ["offer_additional_help"], // Stage 4: After "bear with me", suggest "Is there anything else?"
    resolution_offered: [
      // Stage 5: After "Is there anything else?" is sent, suggest all CSAT and Closure templates
      "survey_request",
      "rating_request",
      "feedback_appreciation",
      "survey_reminder",
      "service_quality",
      "thank_you",
      "pleasure_helping",
      "professional_closure",
      "satisfaction_check_closure",
    ],
    conversation_concluded: [], // Stage 6: After CSAT/Closure, no more suggestions (implies reset for next conversation)
    // Fallback stages for other inquiries not following the main flow
    customer_inquiry: [
      "checking_system",
      "contacting_department",
      "processing_request",
      "general_apology",
      "invoice_request",
      "treasure_hunt_concept",
      "order_status",
      "return_policy",
      "payment_failed",
      "website_issues",
    ],
    assistance: ["general_apology", "invoice_request", "ticket_opened", "manager_escalation"],
  }

  const stageRecommendations = recommendations[stage] || []

  // Filter out already used templates
  return stageRecommendations.filter((template) => !usedTemplates.includes(template))
}

// Determine conversation stage based on used templates with precise logic
export const determineConversationStage = (usedTemplates: string[]): string => {
  // If no templates have been used, it's the very beginning of a new conversation.
  // This is the primary mechanism for "resetting" the flow for a new interaction.
  if (usedTemplates.length === 0) {
    return "ready_to_start"
  }

  // Define template groups for easier checking
  const greetingTemplates = ["welcome", "good_morning", "good_afternoon"]
  const askOrderIdTemplate = "ask_order_id" // Single template
  const processingRequestTemplates = ["checking_system", "contacting_department", "processing_request"]
  const offerAdditionalHelpTemplate = "offer_additional_help" // The specific prompt for "anything else?"
  const csatTemplates = [
    "survey_request",
    "rating_request",
    "feedback_appreciation",
    "survey_reminder",
    "service_quality",
  ]
  const closureTemplates = [
    "thank_you",
    "pleasure_helping",
    "satisfaction_check_closure",
    "professional_closure",
    "idle_closure",
    "offensive_closure", // Added offensive_closure to trigger reset
  ]

  // Helper to check if any template from a group is in usedTemplates
  const hasUsedAny = (templateGroup: string[]) => usedTemplates.some((t) => templateGroup.includes(t))
  const hasUsedSpecific = (template: string) => usedTemplates.includes(template)

  // --- Primary Agent-Driven Flow (Highest Priority Checks) ---
  // The order of these checks is crucial for correct stage progression.
  // We check for the most "advanced" stage first.

  // Stage 6: Conversation Concluded (Closure or CSAT sent)
  // This is the highest priority. If any closure template OR any CSAT template
  // has been used, the conversation is considered in its final state.
  if (hasUsedAny(closureTemplates) || hasUsedAny(csatTemplates)) {
    return "conversation_concluded"
  }

  // Stage 5: Resolution Offered (The "Is there anything else?" prompt has been sent)
  if (hasUsedSpecific(offerAdditionalHelpTemplate)) {
    return "resolution_offered"
  }

  // Stage 4: Bear With Me Sent (Processing in progress)
  if (hasUsedAny(processingRequestTemplates)) {
    return "bear_with_me_sent"
  }

  // Stage 3: Order ID Asked
  if (hasUsedSpecific(askOrderIdTemplate)) {
    return "order_id_asked"
  }

  // Stage 2: Greeting Sent
  if (hasUsedAny(greetingTemplates)) {
    return "greeting_sent"
  }

  // --- Fallback Stages (Lower Priority, for non-linear conversations) ---
  // These stages are for when the conversation doesn't follow the strict agent-driven flow.
  const generalAssistanceTemplates = [
    "general_apology",
    "delay_apology",
    "service_apology",
    "manager_escalation",
    "specialist_referral",
    "callback_arrangement",
    "ticket_opened",
    "ticket_escalated",
    "ticket_follow_up",
    "invoice_request",
    "invoice_request_detailed",
    "first_warning", // Added offensive language warnings to assistance
    "second_warning", // Added offensive language warnings to assistance
  ]
  if (hasUsedAny(generalAssistanceTemplates)) {
    return "assistance"
  }

  const customerInquiryTemplates = [
    "order_status",
    "delivery_inquiry",
    "order_modification",
    "return_policy",
    "exchange_request",
    "refund_status",
    "payment_failed",
    "refund_inquiry",
    "billing_dispute",
    "treasure_hunt_concept",
    "website_issues",
    "app_troubleshooting",
    "login_problems",
  ]
  if (hasUsedAny(customerInquiryTemplates)) {
    return "customer_inquiry"
  }

  // If none of the above conditions are met, but usedTemplates is not empty,
  // it implies a template was used that isn't part of the defined stages,
  // or the conversation is in an unexpected state. Default to the initial state.
  return "ready_to_start"
}
