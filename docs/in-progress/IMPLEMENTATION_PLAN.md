# Personal Website - Implementation Plan

**Based on**: PROJECT_CHARTER.md v1.3
**Created**: 2026-01-07
**Updated**: 2026-01-07 (based on PLAN_REVIEW.md)
**Deadline**: 2026-01-25

---

## Phase 1: Foundation

### 1.1 Project Setup

**Goal**: 建立專案基礎架構

| Task | Description | Files |
|------|-------------|-------|
| 1.1.1 | 安裝 Tailwind CSS | `tailwind.config.mjs`, `src/styles/global.css` |
| 1.1.2 | 設定色彩系統 | James Clear 風格：米白背景、深灰文字 |
| 1.1.3 | 設定字型 | 選擇適合閱讀的字型組合 |
| 1.1.4 | 建立基礎 CSS variables | 間距、圓角、陰影等 |

**色彩方案（參考 James Clear）**：

```css
:root {
  --color-background: #F9F8F4;     /* 米白背景 */
  --color-surface: #FFFFFF;         /* 卡片白 */
  --color-text-primary: #1A1A1A;    /* 深灰文字 */
  --color-text-secondary: #6B6B6B;  /* 次要文字 */
  --color-accent: #2563EB;          /* 強調色（藍） */
  --color-border: #E5E5E5;          /* 邊框 */
}
```

### 1.2 i18n Setup

**Goal**: 設定多語言支援

| Task | Description | Files |
|------|-------------|-------|
| 1.2.1 | 設定 Astro i18n config | `astro.config.mjs` |
| 1.2.2 | 建立翻譯檔結構 | `src/i18n/ui.ts`, `src/i18n/utils.ts` |
| 1.2.3 | 實作語言偵測 middleware | `src/middleware.ts` |
| 1.2.4 | 建立語言切換 helper | `src/i18n/utils.ts` |

**i18n 設定**：

```typescript
// astro.config.mjs
export default defineConfig({
  i18n: {
    defaultLocale: 'zh-TW',
    locales: ['zh-TW', 'en'],
    routing: {
      prefixDefaultLocale: true
    }
  }
});
```

**翻譯檔結構**：

```
src/i18n/
├── ui.ts           # UI 字串翻譯
├── utils.ts        # i18n helper functions
└── translations/
    ├── zh-TW.json  # 中文翻譯
    └── en.json     # 英文翻譯
```

### 1.3 Layout Components

**Goal**: 建立共用 Layout 元件

| Task | Description | Files |
|------|-------------|-------|
| 1.3.1 | 建立 BaseLayout | `src/layouts/BaseLayout.astro` |
| 1.3.2 | 建立 Header | `src/components/Header.astro` |
| 1.3.3 | 建立 Footer | `src/components/Footer.astro` |
| 1.3.4 | 建立 LanguageSwitcher | `src/components/LanguageSwitcher.astro` |
| 1.3.5 | 設定 SEO meta tags | `src/components/SEO.astro` |

### 1.4 Root Redirect

**Goal**: 設定根路徑重導向

| Task | Description | Files |
|------|-------------|-------|
| 1.4.1 | 建立 root redirect 頁面 | `src/pages/index.astro` |

```astro
---
// src/pages/index.astro
return Astro.redirect('/zh-TW/');
---
```

**Header 結構**：

```
┌─────────────────────────────────────────────────────────┐
│ [Logo]     [Blog] [About] [Contact]    [EN/中] [Theme] │
└─────────────────────────────────────────────────────────┘
```

**Footer 結構**：

```
┌─────────────────────────────────────────────────────────┐
│ Social Links: [FB] [LinkedIn] [GitHub]                  │
│ © 2026 Yu-Wen Hao. All rights reserved.                │
└─────────────────────────────────────────────────────────┘
```

---

## Phase 2: Pages

### 2.1 Homepage

**Goal**: 建立首頁（中/英）

| Task | Description | Files |
|------|-------------|-------|
| 2.1.1 | 建立 Hero 元件 | `src/components/Hero.astro` |
| 2.1.2 | 建立 FeaturedPosts 元件 | `src/components/FeaturedPosts.astro` |
| 2.1.3 | 建立 ProductCard 元件 | `src/components/ProductCard.astro` |
| 2.1.4 | 建立 NewsletterForm 元件 | `src/components/NewsletterForm.astro` |
| 2.1.5 | 建立 AboutSnippet 元件 | `src/components/AboutSnippet.astro` |
| 2.1.6 | 組裝首頁 | `src/pages/zh-TW/index.astro`, `src/pages/en/index.astro` |
| 2.1.7 | 準備 Hero 專業照片或 placeholder | `public/images/hero.jpg` |
| 2.1.8 | 建立 OG 社群分享圖片 | `public/images/og-default.jpg` |

**Hero 內容**：

| Language | Brand Statement | CTA |
|----------|-----------------|-----|
| zh-TW | AI 時代的一人公司創業者 | 閱讀我的故事 / 最新文章 |
| en | Solo Entrepreneur in the AI Era | Read My Story / Latest Posts |

**Products Section**：

| Product | Description | Link |
|---------|-------------|------|
| AI Resume Advisor | AI 驅動的履歷分析工具 | airesumeadvisor.com |
| Coming Soon | 未來產品/課程 | - |

**Featured Posts 選取邏輯**：

1. 優先選取 `featured: true` 的文章
2. 若不足 4 篇，按 `pubDate` 降序補充
3. 只顯示當前語言的文章

### 2.2 About Page

**Goal**: 建立 About 頁（中/英）

| Task | Description | Files |
|------|-------------|-------|
| 2.2.1 | 撰寫 About 內容（中文） | Content in page |
| 2.2.2 | 撰寫 About 內容（英文） | Content in page |
| 2.2.3 | 建立 About 頁面 | `src/pages/zh-TW/about.astro`, `src/pages/en/about.astro` |

**About 頁面結構**：

```
┌─────────────────────────────────────────────────────────┐
│ Origin Story                                            │
│ - 14 年工程師 → PM → AI 機會 → 一人公司                  │
├─────────────────────────────────────────────────────────┤
│ What I Believe (The Cause)                              │
│ - 核心價值觀：自由、斯多葛、長期主義                      │
├─────────────────────────────────────────────────────────┤
│ What I Do                                               │
│ - AI Resume Advisor                                     │
│ - 內容創作（Blog、FB）                                   │
├─────────────────────────────────────────────────────────┤
│ Connect CTA                                             │
└─────────────────────────────────────────────────────────┘
```

### 2.3 Contact Page

**Goal**: 建立 Contact 頁（中/英）

| Task | Description | Files |
|------|-------------|-------|
| 2.3.1 | 建立 SocialLinks 元件 | `src/components/SocialLinks.astro` |
| 2.3.2 | 建立 Contact 頁面 | `src/pages/zh-TW/contact.astro`, `src/pages/en/contact.astro` |

**Contact 內容**：

| Platform | Link |
|----------|------|
| Facebook | Personal profile |
| LinkedIn | Company page |
| GitHub | Personal profile |
| Email | Contact email |

---

## Phase 3: Blog System

### 3.1 Content Collections Setup

**Goal**: 設定 Blog 內容系統

| Task | Description | Files |
|------|-------------|-------|
| 3.1.1 | 定義 Blog schema | `src/content/config.ts` |
| 3.1.2 | 建立 Blog 目錄結構 | `src/content/blog/zh-TW/`, `src/content/blog/en/` |
| 3.1.3 | 建立範例文章 | 各分類一篇測試文章 |

**Blog Schema**：

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    heroImage: z.string().optional(),
    category: z.enum(['ai-tech', 'entrepreneurship', 'productivity', 'thoughts-life']),
    tags: z.array(z.string()).default([]),
    lang: z.enum(['zh-TW', 'en']),
    translationKey: z.string().optional(),
    videoUrl: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  blog: blogCollection,
};
```

### 3.2 Blog List Page

**Goal**: 建立 Blog 列表頁

| Task | Description | Files |
|------|-------------|-------|
| 3.2.1 | 建立 BlogCard 元件 | `src/components/BlogCard.astro` |
| 3.2.2 | 建立 CategoryFilter 元件 | `src/components/CategoryFilter.astro` |
| 3.2.3 | 建立 Pagination 元件 | `src/components/Pagination.astro` |
| 3.2.4 | 建立 Blog 列表頁 | `src/pages/zh-TW/blog/index.astro`, `src/pages/en/blog/index.astro` |
| 3.2.5 | 建立分類名稱翻譯對應 | `src/i18n/categories.ts` |

**分類名稱翻譯對應**：

```typescript
// src/i18n/categories.ts
export const categoryNames = {
  'ai-tech': {
    'zh-TW': 'AI & 科技',
    'en': 'AI & Tech',
  },
  'entrepreneurship': {
    'zh-TW': '創業筆記',
    'en': 'Entrepreneurship',
  },
  'productivity': {
    'zh-TW': '生產力',
    'en': 'Productivity',
  },
  'thoughts-life': {
    'zh-TW': '思考與生活',
    'en': 'Thoughts & Life',
  },
};
```

**分類篩選 UI**：

```
┌─────────────────────────────────────────────────────────┐
│ [全部] [AI & 科技] [創業筆記] [生產力] [思考與生活]        │
└─────────────────────────────────────────────────────────┘
```

### 3.3 Blog Article Page

**Goal**: 建立 Blog 文章頁

| Task | Description | Files |
|------|-------------|-------|
| 3.3.1 | 建立 BlogLayout | `src/layouts/BlogLayout.astro` |
| 3.3.2 | 建立 VideoEmbed 元件 | `src/components/VideoEmbed.astro` |
| 3.3.3 | 建立 RelatedPosts 元件 | `src/components/RelatedPosts.astro` |
| 3.3.4 | 設定 Typography 樣式 | `src/styles/prose.css` |
| 3.3.5 | 設定 Code highlighting | Shiki / Prism |
| 3.3.6 | 建立動態路由 | `src/pages/zh-TW/blog/[slug].astro`, `src/pages/en/blog/[slug].astro` |
| 3.3.7 | 實作閱讀時間計算 helper | `src/utils/readingTime.ts` |
| 3.3.8 | 實作相關文章推薦邏輯 | `src/utils/relatedPosts.ts` |
| 3.3.9 | 實作語言版本連結 UI | `src/components/LanguageVersionLink.astro` |

**閱讀時間計算**：

```typescript
// src/utils/readingTime.ts
export function getReadingTime(content: string): number {
  const wordsPerMinute = 200; // 中文約 300-400 字/分鐘
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}
```

**相關文章推薦邏輯**：

1. 優先：同分類 (category) 的文章
2. 次優先：有相同標籤 (tags) 的文章
3. 排除：當前文章本身
4. 限制：最多顯示 3 篇
5. 排序：按 `pubDate` 降序

**語言版本連結 UI**：

當文章有對應的翻譯版本（透過 `translationKey` 連結）時，顯示：

```
┌─────────────────────────────────────────────────────────┐
│ 🌐 This article is also available in English → [Read]  │
└─────────────────────────────────────────────────────────┘
```

### 3.4 SEO & hreflang

**Goal**: 設定 SEO 和多語言標記

| Task | Description | Files |
|------|-------------|-------|
| 3.4.1 | 實作 hreflang 標記 | `src/components/SEO.astro` |
| 3.4.2 | 設定 Sitemap | `astro.config.mjs` |
| 3.4.3 | 設定 OG tags | `src/components/SEO.astro` |
| 3.4.4 | 建立多語言 RSS feeds | `src/pages/zh-TW/rss.xml.ts`, `src/pages/en/rss.xml.ts` |

**hreflang 範例**：

```html
<link rel="alternate" hreflang="zh-TW" href="https://yu-wenhao.com/zh-TW/blog/article" />
<link rel="alternate" hreflang="en" href="https://yu-wenhao.com/en/blog/article" />
<link rel="alternate" hreflang="x-default" href="https://yu-wenhao.com/zh-TW/blog/article" />
```

---

## Phase 4: Content Migration

### 4.1 WordPress Export

**Goal**: 匯出 WordPress 文章

| Task | Description |
|------|-------------|
| 4.1.1 | 從 WordPress 匯出 XML |
| 4.1.2 | 分析現有文章數量和分類 |
| 4.1.3 | 列出需要遷移的文章清單 |

### 4.2 Content Conversion

**Goal**: 轉換內容格式

| Task | Description |
|------|-------------|
| 4.2.1 | 建立 HTML → MDX 轉換腳本 |
| 4.2.2 | 處理圖片路徑 |
| 4.2.3 | 對應分類到 4 大類 |
| 4.2.4 | 轉換所有文章 |

### 4.3 Image Migration

**Goal**: 遷移圖片資源

| Task | Description |
|------|-------------|
| 4.3.1 | 下載所有圖片 |
| 4.3.2 | 優化圖片（壓縮、轉 WebP） |
| 4.3.3 | 上傳到 public/images |
| 4.3.4 | 更新文章中的圖片路徑 |

---

## Phase 5: Integrations

### 5.1 Newsletter (Buttondown)

**Goal**: 整合電子報訂閱

| Task | Description | Files |
|------|-------------|-------|
| 5.1.1 | 註冊 Buttondown 帳號 | - |
| 5.1.2 | 取得 API key 或 embed code | - |
| 5.1.3 | 實作 NewsletterForm 表單送出 | `src/components/NewsletterForm.astro` |
| 5.1.4 | 測試訂閱流程 | - |

### 5.2 Analytics (Umami) - Post-MVP

**Goal**: 整合網站分析（可延後）

| Task | Description |
|------|-------------|
| 5.2.1 | 部署 Umami 到 Azure |
| 5.2.2 | 取得 tracking script |
| 5.2.3 | 加入到 BaseLayout |
| 5.2.4 | 驗證資料收集 |
| 5.2.5 | 設定 Umami 追蹤事件 | Newsletter signup, category clicks |

**追蹤事件設定**：

| Event | Trigger | Data |
|-------|---------|------|
| `newsletter_signup` | 訂閱電子報成功 | email (hashed) |
| `category_click` | 點擊分類篩選 | category name |
| `product_click` | 點擊產品卡片 | product name |
| `language_switch` | 切換語言 | from/to language |

---

## Phase 6: Deployment

### 6.1 Azure Static Web Apps

**Goal**: 部署到 Azure

| Task | Description | Files |
|------|-------------|-------|
| 6.1.1 | 建立 Azure Static Web App 資源 | Azure Portal |
| 6.1.2 | 設定 GitHub Actions workflow | `.github/workflows/azure-static-web-apps.yml` |
| 6.1.3 | 設定環境變數 | Azure Portal |
| 6.1.4 | 測試部署 | - |

### 6.2 DNS & Domain

**Goal**: 設定網域

| Task | Description |
|------|-------------|
| 6.2.1 | 在 Azure 設定 custom domain |
| 6.2.2 | 更新 DNS 記錄（CNAME / A） |
| 6.2.3 | 啟用 HTTPS |
| 6.2.4 | 驗證 SSL 憑證 |

### 6.3 Final Testing

**Goal**: 上線前測試

| Task | Description |
|------|-------------|
| 6.3.1 | 測試所有頁面（中/英） |
| 6.3.2 | 測試語言切換 |
| 6.3.3 | 測試 Newsletter 訂閱 |
| 6.3.4 | 執行 Lighthouse 測試（目標 > 90） |
| 6.3.5 | 測試 OG tags（社群分享預覽） |
| 6.3.6 | 測試 Mobile 響應式 |

---

## File Structure (Final)

```
src/
├── components/
│   ├── Header.astro
│   ├── Footer.astro
│   ├── Hero.astro
│   ├── BlogCard.astro
│   ├── CategoryFilter.astro
│   ├── Pagination.astro
│   ├── ProductCard.astro
│   ├── NewsletterForm.astro
│   ├── VideoEmbed.astro
│   ├── RelatedPosts.astro
│   ├── SocialLinks.astro
│   ├── LanguageSwitcher.astro
│   ├── LanguageVersionLink.astro
│   ├── SEO.astro
│   └── AboutSnippet.astro
├── layouts/
│   ├── BaseLayout.astro
│   └── BlogLayout.astro
├── pages/
│   ├── index.astro              # Redirect to /zh-TW/
│   ├── zh-TW/
│   │   ├── index.astro          # 首頁
│   │   ├── about.astro          # About
│   │   ├── contact.astro        # Contact
│   │   └── blog/
│   │       ├── index.astro      # Blog 列表
│   │       └── [slug].astro     # Blog 文章
│   └── en/
│       ├── index.astro
│       ├── about.astro
│       ├── contact.astro
│       └── blog/
│           ├── index.astro
│           └── [slug].astro
├── content/
│   ├── config.ts
│   └── blog/
│       ├── zh-TW/
│       │   └── *.md
│       └── en/
│           └── *.md
├── i18n/
│   ├── ui.ts
│   ├── utils.ts
│   ├── categories.ts
│   └── translations/
│       ├── zh-TW.json
│       └── en.json
├── utils/
│   ├── readingTime.ts
│   └── relatedPosts.ts
├── styles/
│   ├── global.css
│   └── prose.css
└── middleware.ts
```

---

## Priority Matrix

| Priority | Items | Reason |
|----------|-------|--------|
| P0 (Must) | Layout, i18n, Homepage, Blog 系統, Root redirect, Reading time, Category names | 核心功能 |
| P1 (Should) | About, Contact, Newsletter, SEO, Related posts, Language version link, OG image | 完整體驗 |
| P2 (Could) | Analytics, 深色模式, Multi-language RSS, Analytics events | 可後續加 |
| P3 (Won't) | 評論系統, 搜尋功能 | MVP 不需要 |

---

## Dependencies

```
Phase 1 (Foundation)
    │
    ├── 1.1 Project Setup
    │       │
    │       └── 1.2 i18n Setup ──┐
    │                            │
    └── 1.3 Layout Components ───┤
                                 │
Phase 2 (Pages) ◄────────────────┘
    │
    ├── 2.1 Homepage
    ├── 2.2 About
    └── 2.3 Contact
            │
Phase 3 (Blog) ◄─────────────────┘
    │
    ├── 3.1 Content Collections
    ├── 3.2 Blog List
    ├── 3.3 Blog Article
    └── 3.4 SEO
            │
Phase 4 (Content) ◄──────────────┘
    │
    └── 4.1-4.3 Migration
            │
Phase 5 (Integrations) ◄─────────┘
    │
    └── 5.1 Newsletter
            │
Phase 6 (Deploy) ◄───────────────┘
```

---

## Checklist Summary

### Phase 1: Foundation
- [ ] Tailwind CSS 設定
- [ ] 色彩系統 + 字型
- [ ] i18n 設定
- [ ] 語言偵測 middleware
- [ ] Header + Footer
- [ ] LanguageSwitcher
- [ ] SEO 元件
- [ ] Root redirect 頁面

### Phase 2: Pages
- [ ] Hero 元件
- [ ] FeaturedPosts 元件（含選取邏輯）
- [ ] ProductCard 元件
- [ ] NewsletterForm 元件
- [ ] 首頁（中/英）
- [ ] About 頁（中/英）
- [ ] Contact 頁（中/英）
- [ ] Hero 專業照片或 placeholder
- [ ] OG 社群分享圖片

### Phase 3: Blog
- [ ] Content Collections schema
- [ ] BlogCard 元件
- [ ] CategoryFilter 元件
- [ ] 分類名稱翻譯對應
- [ ] Blog 列表頁（中/英）
- [ ] BlogLayout
- [ ] VideoEmbed 元件
- [ ] 閱讀時間計算 helper
- [ ] 相關文章推薦邏輯
- [ ] 語言版本連結 UI
- [ ] Blog 文章頁（中/英）
- [ ] hreflang 標記
- [ ] Sitemap
- [ ] 多語言 RSS feeds

### Phase 4: Content
- [ ] WordPress 匯出
- [ ] HTML → MDX 轉換
- [ ] 圖片遷移
- [ ] 分類對應

### Phase 5: Integrations
- [ ] Buttondown 整合
- [ ] (Post-MVP) Umami 整合
- [ ] (Post-MVP) Umami 追蹤事件設定

### Phase 6: Deploy
- [ ] Azure Static Web Apps 設定
- [ ] GitHub Actions
- [ ] DNS 設定
- [ ] Final testing
- [ ] Lighthouse > 90

---

## Task Count Summary

| Phase | Tasks |
|-------|-------|
| Phase 1: Foundation | 14 |
| Phase 2: Pages | 12 |
| Phase 3: Blog | 20 |
| Phase 4: Content | 7 |
| Phase 5: Integrations | 6 |
| Phase 6: Deploy | 10 |
| **Total** | **69** |

---

**Document Control**

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-07 | Initial implementation plan |
| 1.1 | 2026-01-07 | Added missing items from PLAN_REVIEW.md: root redirect, reading time, category names, related posts logic, language version link, OG image, multi-language RSS, analytics events |
