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

    // Contact
    'contact.title': '想聊聊？',
    'contact.description': '不管是 Vibe Coding、AI 產品開發、合作邀約，或只是打個招呼——都歡迎。',
    'contact.social.title': '找到我',
    'contact.social.description': '選一個你習慣的平台',
    'contact.response': '我通常會在 1-2 個工作天內回覆',

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

    // Contact
    'contact.title': "Let's Chat",
    'contact.description': "Whether it's Vibe Coding, AI product development, collaboration, or just saying hi—I'd love to hear from you.",
    'contact.social.title': 'Find Me',
    'contact.social.description': 'Pick your preferred platform',
    'contact.response': 'I typically respond within 1-2 business days',

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
