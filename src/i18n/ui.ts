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
    'hero.tagline': '一個人，也能做出產品',
    'hero.description': '用 AI 加速從想法到上線。分享工具、流程、踩坑經驗。',
    'hero.cta.story': '閱讀我的故事',
    'hero.cta.posts': '最新文章',
    'hero.cta.chat': '聊聊 Vibe Coding',

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
    'newsletter.title': '訂閱電子報',
    'newsletter.description': '想少走彎路？我把一路上的心得寫成信寄給你。',
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
    'hero.tagline': 'One Person Can Ship Products',
    'hero.description': 'Using AI to go from idea to launch. Sharing tools, workflows, and lessons learned.',
    'hero.cta.story': 'Read My Story',
    'hero.cta.posts': 'Latest Posts',
    'hero.cta.chat': 'Chat About Vibe Coding',

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
    'newsletter.description': 'Want to avoid common pitfalls? I share lessons learned along the way.',
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

    // Header CTA
    'header.subscribe': 'Subscribe',
  },
} as const;
