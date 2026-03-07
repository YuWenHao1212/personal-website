export const languages = {
  'zh-TW': '中文',
  'en': 'EN',
} as const;

export const defaultLang = 'zh-TW' as const;

export type Lang = keyof typeof languages;

export const ui = {
  'zh-TW': {
    // Navigation
    'nav.home': '首頁',
    'nav.products': '產品',
    'nav.blog': 'Blog',
    'nav.picks': '推薦工具',
    'nav.about': '關於我',
    'nav.contact': '聯繫',

    // Hero
    'hero.greeting': '我是文皓',
    'hero.tagline': '打造自己的 AI 工作流，每天往前走一步',
    'hero.description': '方向比速度重要，讓複利帶你走遠。',
    'hero.cta.story': '閱讀我的故事',
    'hero.cta.posts': '最新文章',
    'hero.cta.chat': '寫信給我',

    // Blog Categories
    'blogCategories.title': '這個部落格寫什麼',
    'blogCategories.buildingProducts.title': 'AI 實戰',
    'blogCategories.buildingProducts.description': '用白話聊 AI，搞懂工具、看懂趨勢、學了就能用',
    'blogCategories.productivity.title': '效率系統',
    'blogCategories.productivity.description': '目標管理、知識系統、用 AI 放大每一步',
    'blogCategories.lifeLearning.title': '人生思考',
    'blogCategories.lifeLearning.description': '書籍心得、價值觀、長期主義',

    // Sections
    'section.featured': '精選文章',
    'section.products': '我的產品',
    'section.newsletter': '訂閱電子報',
    'section.about': '關於我',

    // Newsletter
    'newsletter.title': '訂閱電子報',
    'newsletter.description': '我每週寫一封信——聊怎麼把 AI 用在真實生活和工作裡，和一路上想通的道理。',
    'newsletter.placeholder': '輸入你的 Email',
    'newsletter.button': '寄給我',
    'newsletter.privacy': '不會濫發垃圾郵件，隨時可以退訂。',

    // Blog
    'blog.readMore': '閱讀全文',
    'blog.readTime': '分鐘閱讀',
    'blog.allPosts': '所有文章',
    'blog.categories.all': '全部',

    // Footer
    'footer.copyright': '© {year} WenHao Yu. All rights reserved.',
    'footer.social': '社群連結',

    // Services
    'nav.services': '服務',
    'services.title': '服務項目',
    'services.description': '從 AI 導入到效率系統，幫你把 AI 變成真正的生產力。',
    'services.consulting.title': 'AI 導入顧問',
    'services.consulting.subtitle': '企業服務',
    'services.consulting.description': '不只是教你用工具，而是幫你的團隊建立一套會複利的 AI 工作流。',
    'services.consulting.training.title': 'AI Coding 企業內訓',
    'services.consulting.training.description': 'Claude Code、Vibe Coding、Agentic Coding — 從觀念到實作，讓團隊真正能用 AI 寫程式。',
    'services.consulting.workflow.title': 'AI 工作流規劃與導入',
    'services.consulting.workflow.description': '評估現有流程，找出 AI 能產生最大槓桿的環節，設計落地方案。',
    'services.consulting.website.title': '企業網站建置與代管',
    'services.consulting.website.description': '從設計到上線一條龍，包含 SEO 基礎建設，讓網站真正幫你帶來客戶。',
    'services.consulting.seo.title': 'SEO 與經營策略',
    'services.consulting.seo.description': '關鍵字研究、內容策略、技術 SEO — 讓你的網站被對的人找到。',
    'services.system.title': 'AI 效率系統設計',
    'services.system.subtitle': '個人 / 團隊',
    'services.system.description': '多數人追工具，卻不知道要拿來做什麼。我幫你先想清楚方向，再建系統。',
    'services.system.knowledge.title': '知識管理系統',
    'services.system.knowledge.description': '用 Obsidian 打造你的第二大腦，讓筆記不只是紀錄，而是會長出新想法的系統。',
    'services.system.goals.title': '目標管理系統',
    'services.system.goals.description': '結合 12 Week Year 方法論，設計每日可執行、每週可回顧的目標系統。',
    'services.system.ai-workflow.title': 'AI 驅動工作流',
    'services.system.ai-workflow.description': '把 AI 整合進你的日常工作流，從筆記、規劃到產出，每一步都有 AI 幫你放大。',
    'services.cta.title': '想了解更多？',
    'services.cta.description': '每個企業和個人的需求都不同，預約一次免費諮詢，聊聊你的狀況。',
    'services.cta.button': '預約免費諮詢',
    'services.cta.email': '或直接寫信給我',

    // Contact
    'contact.title': '想聊聊？',
    'contact.description': '不管是 Vibe Coding、AI 產品開發、合作邀約，或只是打個招呼——都歡迎。',
    'contact.social.title': '找到我',
    'contact.social.description': '選一個你習慣的平台',
    'contact.response': '我通常會在 1-2 個工作天內回覆',
    'contact.booking.title': '預約時間聊聊',
    'contact.booking.description': '想聊 AI、合作、或只是 coffee chat？選一個方便的時間，我們線上聊。',
    'contact.booking.button': '預約 30 分鐘',

    // 404
    '404.title': '頁面不存在',
    '404.description': '抱歉，找不到你要的頁面',
    '404.back': '返回首頁',

    // Language
    'language.switch': '切換語言',
    'language.available': '這篇文章也有英文版本',

    // Header CTA
    'header.subscribe': '訂閱電子報',
  },
  'en': {
    // Navigation
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.blog': 'Blog',
    'nav.picks': 'Tools',
    'nav.about': 'About',
    'nav.contact': 'Contact',

    // Hero
    'hero.greeting': "I'm WenHao",
    'hero.tagline': 'Building Products, Systems, and a Life with AI',
    'hero.description': 'PM turned solo builder. I use AI to ship products, design systems, and document the entire process — tools, workflows, real numbers.',
    'hero.cta.story': 'Read My Story',
    'hero.cta.posts': 'Latest Posts',
    'hero.cta.chat': 'Say Hello',

    // Blog Categories
    'blogCategories.title': 'What I Write About',
    'blogCategories.buildingProducts.title': 'AI in Practice',
    'blogCategories.buildingProducts.description': 'AI explained in plain language — tools, trends, and practical how-tos',
    'blogCategories.productivity.title': 'Productivity',
    'blogCategories.productivity.description': 'Goal management, knowledge systems, amplify every step with AI',
    'blogCategories.lifeLearning.title': 'Life & Learning',
    'blogCategories.lifeLearning.description': 'Book reviews, values, long-term thinking',

    // Sections
    'section.featured': 'Featured Posts',
    'section.products': 'My Products',
    'section.newsletter': 'Newsletter',
    'section.about': 'About Me',

    // Newsletter
    'newsletter.title': 'Subscribe to My Newsletter',
    'newsletter.description': 'A weekly letter on using AI in real life and work — and the lessons I learn along the way.',
    'newsletter.placeholder': 'Enter your email',
    'newsletter.button': 'Send Me Letters',
    'newsletter.privacy': 'No spam. Unsubscribe anytime.',

    // Blog
    'blog.readMore': 'Read More',
    'blog.readTime': 'min read',
    'blog.allPosts': 'All Posts',
    'blog.categories.all': 'All',

    // Footer
    'footer.copyright': '© {year} WenHao Yu. All rights reserved.',
    'footer.social': 'Connect',

    // Services
    'nav.services': 'Services',
    'services.title': 'Services',
    'services.description': 'From AI adoption to productivity systems — turning AI into real leverage for your work.',
    'services.consulting.title': 'AI Consulting',
    'services.consulting.subtitle': 'For Teams & Businesses',
    'services.consulting.description': "Not just teaching tools — building AI workflows that compound over time.",
    'services.consulting.training.title': 'AI Coding Training',
    'services.consulting.training.description': 'Claude Code, Vibe Coding, Agentic Coding — from concepts to hands-on practice. Get your team shipping with AI.',
    'services.consulting.workflow.title': 'AI Workflow Design',
    'services.consulting.workflow.description': 'Audit existing processes, identify where AI creates the most leverage, and design an implementation plan.',
    'services.consulting.website.title': 'Website Build & Hosting',
    'services.consulting.website.description': 'End-to-end website development with SEO foundations — a site that actually brings you customers.',
    'services.consulting.seo.title': 'SEO & Growth Strategy',
    'services.consulting.seo.description': 'Keyword research, content strategy, technical SEO — get found by the right people.',
    'services.system.title': 'AI Productivity Systems',
    'services.system.subtitle': 'For Individuals & Teams',
    'services.system.description': "Most people chase tools without knowing what to build. I help you find direction first, then design the system.",
    'services.system.knowledge.title': 'Knowledge Management',
    'services.system.knowledge.description': 'Build your second brain with Obsidian — notes that generate new ideas, not just store old ones.',
    'services.system.goals.title': 'Goal Management',
    'services.system.goals.description': 'A 12 Week Year system with daily execution and weekly reviews — goals you actually hit.',
    'services.system.ai-workflow.title': 'AI-Powered Workflow',
    'services.system.ai-workflow.description': 'Integrate AI into your daily workflow — from notes to planning to output, every step amplified.',
    'services.cta.title': 'Want to learn more?',
    'services.cta.description': "Every business and individual is different. Book a free consultation and let's talk about your situation.",
    'services.cta.button': 'Book a Free Call',
    'services.cta.email': 'Or email me directly',

    // Contact
    'contact.title': "Let's Chat",
    'contact.description': "Whether it's Vibe Coding, AI product development, collaboration, or just saying hi—I'd love to hear from you.",
    'contact.social.title': 'Find Me',
    'contact.social.description': 'Pick your preferred platform',
    'contact.response': 'I typically respond within 1-2 business days',
    'contact.booking.title': 'Book a Call',
    'contact.booking.description': "Want to chat about AI, collaboration, or just a coffee chat? Pick a time that works for you.",
    'contact.booking.button': 'Book 30 Minutes',

    // 404
    '404.title': 'Page Not Found',
    '404.description': 'Sorry, the page you are looking for does not exist.',
    '404.back': 'Back to Home',

    // Language
    'language.switch': 'Switch Language',
    'language.available': 'This article is also available in Chinese',

    // Header CTA
    'header.subscribe': 'Subscribe',
  },
} as const;
