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
    'nav.blog': 'Blog',
    'nav.about': '關於我',
    'nav.contact': '聯繫',

    // Hero
    'hero.greeting': '我是文皓',
    'hero.tagline': '我用 AI 打造產品',
    'hero.description': '在 AI 時代，個人可以創造出以前需要整個團隊才能做到的東西。這不是幻想，我正在實踐。我追求的是自由——思想的自由、財務的自由、時間的自由。',
    'hero.cta.story': '閱讀我的故事',
    'hero.cta.posts': '最新文章',

    // Blog Categories
    'blogCategories.title': '這個部落格寫什麼',
    'blogCategories.buildingProducts.title': '打造產品',
    'blogCategories.buildingProducts.description': 'No-Code、AI 工具、從想法到上線',
    'blogCategories.productivity.title': '效率系統',
    'blogCategories.productivity.description': '知識管理、工作流、做更少產出更多',
    'blogCategories.lifeLearning.title': '人生思考',
    'blogCategories.lifeLearning.description': '書籍心得、價值觀、長期主義',

    // Sections
    'section.featured': '精選文章',
    'section.products': '我的產品',
    'section.newsletter': '訂閱電子報',
    'section.about': '關於我',

    // Newsletter
    'newsletter.title': '訂閱我的電子報',
    'newsletter.description': '每週分享 AI、創業與生產力的深度觀點',
    'newsletter.placeholder': '輸入你的 Email',
    'newsletter.button': '訂閱',
    'newsletter.privacy': '不會濫發垃圾郵件，隨時可以退訂',

    // Blog
    'blog.readMore': '閱讀全文',
    'blog.readTime': '分鐘閱讀',
    'blog.allPosts': '所有文章',
    'blog.categories.all': '全部',

    // Footer
    'footer.copyright': '© {year} WenHao Yu. All rights reserved.',
    'footer.social': '社群連結',

    // Contact
    'contact.title': '聯繫我',
    'contact.description': '有任何問題或合作想法，歡迎透過以下方式聯繫我',
    'contact.social.title': '社群連結',
    'contact.social.description': '在這些平台上找到我',
    'contact.response': '我通常會在 1-2 個工作天內回覆',

    // 404
    '404.title': '頁面不存在',
    '404.description': '抱歉，找不到你要的頁面',
    '404.back': '返回首頁',

    // Language
    'language.switch': '切換語言',
    'language.available': '這篇文章也有英文版本',
  },
  'en': {
    // Navigation
    'nav.home': 'Home',
    'nav.blog': 'Blog',
    'nav.about': 'About',
    'nav.contact': 'Contact',

    // Hero
    'hero.greeting': "I'm WenHao",
    'hero.tagline': 'I Build Products with AI',
    'hero.description': "In the AI era, individuals can create what previously required entire teams. This isn't a fantasy—I'm living it. I pursue freedom: freedom of thought, financial freedom, and freedom of time.",
    'hero.cta.story': 'Read My Story',
    'hero.cta.posts': 'Latest Posts',

    // Blog Categories
    'blogCategories.title': 'What I Write About',
    'blogCategories.buildingProducts.title': 'Building Products',
    'blogCategories.buildingProducts.description': 'No-Code, AI tools, from idea to launch',
    'blogCategories.productivity.title': 'Productivity',
    'blogCategories.productivity.description': 'Knowledge management, workflows, do less achieve more',
    'blogCategories.lifeLearning.title': 'Life & Learning',
    'blogCategories.lifeLearning.description': 'Book reviews, values, long-term thinking',

    // Sections
    'section.featured': 'Featured Posts',
    'section.products': 'My Products',
    'section.newsletter': 'Newsletter',
    'section.about': 'About Me',

    // Newsletter
    'newsletter.title': 'Subscribe to My Newsletter',
    'newsletter.description': 'Weekly insights on AI, entrepreneurship & productivity',
    'newsletter.placeholder': 'Enter your email',
    'newsletter.button': 'Subscribe',
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
    'contact.title': 'Contact',
    'contact.description': 'Have a question or collaboration idea? Feel free to reach out',
    'contact.social.title': 'Social Links',
    'contact.social.description': 'Find me on these platforms',
    'contact.response': 'I typically respond within 1-2 business days',

    // 404
    '404.title': 'Page Not Found',
    '404.description': 'Sorry, the page you are looking for does not exist.',
    '404.back': 'Back to Home',

    // Language
    'language.switch': 'Switch Language',
    'language.available': 'This article is also available in Chinese',
  },
} as const;
