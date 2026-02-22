# Personal Website - Project Charter

**Project**: yu-wenhao.com
**Created**: 2026-01-07
**Status**: In Progress
**Deadline**: 2026-01-25 (日本出遊前)

---

## Overview

個人品牌網站，從 WordPress 遷移至 Astro + Azure Static Web Apps。

### Why

- WordPress 套裝自由度低
- 發文流程繁瑣
- 技術棧統一（與 Landing Page 一致）
- 成本降低（Azure Static Web Apps 免費）
- 速度提升（Astro 靜態站）

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Astro 5.x |
| Styling | Tailwind CSS |
| Content | MDX (Content Collections) |
| i18n | Astro i18n (內建) |
| Hosting | Azure Static Web Apps |
| Domain | yu-wenhao.com (現有) |

---

## MVP Requirements

### Pages

| Page | Route | Description |
|------|-------|-------------|
| 首頁 | `/[lang]/` | Hero + Featured Posts + 產品展示區 |
| About | `/[lang]/about` | 個人故事、經歷、價值觀 |
| Blog 列表 | `/[lang]/blog` | 文章列表 + 4 大分類篩選 |
| Blog 文章 | `/[lang]/blog/[slug]` | 文章內容（支援影片嵌入） |
| Contact | `/[lang]/contact` | 社群連結、聯繫方式 |

### i18n Requirements

| Requirement | Description |
|-------------|-------------|
| 支援語言 | 繁體中文 (zh-TW)、English (en) |
| 預設語言 | zh-TW |
| 自動偵測 | 根據瀏覽器 Accept-Language 自動導向 |
| 語言切換 | Header 上的切換按鈕 |
| URL 結構 | `/zh-TW/...` 和 `/en/...` |

### Blog Content Strategy

| Content | Language | Note |
|---------|----------|------|
| 舊文章 | 中文 only | WordPress 匯入，不翻譯 |
| 新文章 | 中文 + 英文 | 雙語版本，用 translationKey 連結 |

### Blog Categories

| Slug | 中文 | English | 內容方向 |
|------|------|---------|----------|
| building-products | AI 實戰 | AI in Practice | AI 工具、趨勢、實用指南 |
| productivity | 效率系統 | Systems & Productivity | 目標管理、知識系統、AI 放大每一步 |
| life-learning | 人生思考 | Life & Learning | 書籍心得、價值觀、長期主義 |

### SEO Requirements

| Requirement | Implementation |
|-------------|----------------|
| hreflang | 標記語言版本對應關係 |
| Sitemap | 自動生成，含所有語言版本 |
| Meta tags | 每頁獨立 title, description |
| OG tags | Social sharing 支援 |

### Newsletter

| Item | Description |
|------|-------------|
| 服務 | [Kit.com](https://kit.com) (ConvertKit) |
| 訂閱位置 | 首頁 Hero (zh-TW only)、文章底部 |
| 整合方式 | Kit.com Form API (`POST /forms/{id}/subscriptions`) |
| 語言 | 中文（EN 版不設電子報，導向 LinkedIn） |

### Analytics

| Item | Description |
|------|-------------|
| 服務 | [Umami](https://umami.is) (self-hosted) |
| 部署 | Azure Container Apps 或 Azure Web App |
| 隱私 | GDPR 友好，不需 cookie banner |

**追蹤指標**：

| 指標 | 頻率 | 用途 |
|------|------|------|
| Blog page views | 每日 | 看哪篇文章受歡迎 |
| 網站流量來源 | 每週 | 看哪個 channel 有效 |
| 熱門文章排行 | 每週 | 調整內容策略 |
| 分類表現 | 每月 | 評估 4 大分類效果 |

---

## Content Structure

```
/src/content/blog/
├── zh-TW/
│   ├── old-article-1.md      ← 舊文章（只有中文）
│   ├── old-article-2.md
│   ├── new-article-1.md      ← 新文章（有對應英文版）
│   └── ...
└── en/
    ├── new-article-1.md      ← 新文章英文版
    └── ...
```

### Frontmatter Schema

```yaml
---
title: "文章標題"
description: "文章描述"
pubDate: 2026-01-07
updatedDate: 2026-01-07
heroImage: "/images/blog/hero.jpg"
category: "ai-tech"  # ai-tech | entrepreneurship | productivity | thoughts-life
tags: ["tag1", "tag2"]
lang: "zh-TW"
translationKey: "unique-article-id"  # 連結中英文版本
videoUrl: ""  # YouTube 影片連結（可選）
---
```

---

## UI/UX Requirements

### Design Principles

- 極簡、專業
- 重視閱讀體驗
- 快速載入（Lighthouse > 90）
- Mobile-first responsive

### Components

| Component | Description |
|-----------|-------------|
| Header | Logo, Nav, Language Switcher |
| Footer | Social links, Copyright |
| Hero | 首頁 Hero（照片 + 品牌聲明 + CTA） |
| ProductCard | 產品展示卡片（AI Resume Advisor 等） |
| BlogCard | Featured image, Title, Date, Category, Excerpt |
| CategoryFilter | Blog 分類篩選 UI |
| Article | Typography, Code highlighting, Video embed |
| VideoEmbed | YouTube 影片嵌入元件 |
| NewsletterForm | Kit.com 訂閱表單（文章底部） |

### Homepage Strategy

兩個語言版本有不同的漏斗目標，但共享相同的設計語言：

| | zh-TW | EN |
|---|---|---|
| **定位** | Media homepage（知識型媒體） | Professional presence（專業形象） |
| **目標訪客** | SEO 進來的讀者 | SEO 進來的讀者 |
| **漏斗終點** | 訂閱電子報 → 信任 → 知識產品 | 連結 LinkedIn → 專業關係 |
| **核心價值** | 中文賣的是你的知識 | 英文賣的是你這個人 |

**設計決策**：

1. **Products 權重不同**：EN 版 Products 放在 Hero 下方（大卡片），因為作品集是專業形象的核心證據；zh-TW 版 Products 放在頁面底部（社會證明），因為重點是內容而非產品。
2. **CTA 不同**：zh-TW Hero 放 Newsletter 訂閱表單（Kit.com），EN Hero 放 LinkedIn + Blog 按鈕。
3. **共同元素**：兩版都有 Author Context（一行自我介紹）+ Content Pillars（3 分類卡片）+ Featured Posts，因為兩邊的訪客都是 SEO 進來的，需要快速理解「這個人是誰」和「這裡有什麼內容」。
4. **背景色交替**：`#FAF8F5` / `#F5F1EB` / `#FFFDF9` 交替使用，讓各 section 有視覺層次分隔。

### Homepage Layout

**zh-TW（知識漏斗）**

```
┌─────────────────────────────────────────────────┐
│ Hero Section                                    │
│ - 照片 + Tagline + Description                  │
│ - Newsletter CTA (Kit.com form)                 │
│ - Secondary CTAs (About / Blog / Email)         │
├─────────────────────────────────────────────────┤
│ Author Context + Content Pillars + Featured     │
│ - 一行自我介紹                                    │
│ - 3 分類卡片 (AI 實戰 / 效率系統 / 人生思考)      │
│ - 精選文章 6 篇 + 查看全部                        │
├─────────────────────────────────────────────────┤
│ Products (Social Proof)                         │
│ - 3 products with images (credibility)          │
├─────────────────────────────────────────────────┤
│ Recommended Tools                               │
│ - 實際使用過的工具推薦                             │
└─────────────────────────────────────────────────┘
```

**EN（專業形象）**

```
┌─────────────────────────────────────────────────┐
│ Hero Section                                    │
│ - Photo + Tagline + Description                 │
│ - LinkedIn + Blog CTA                           │
│ - Secondary CTAs (About / Blog / Email)         │
├── Products I Built ─────────────────────────────┤
│ - 3 products with images + badges (portfolio)   │
├─────────────────────────────────────────────────┤
│ Author Context + Content Pillars + Featured     │
│ - One-line author intro                         │
│ - 3 category cards (AI / Systems / Life)        │
│ - Featured Posts 6 cards + View All             │
├─────────────────────────────────────────────────┤
│ Recommended Tools                               │
│ - Tools and resources I actually use            │
└─────────────────────────────────────────────────┘
```

### Blog Article Layout

```
┌─────────────────────────────────────────────────┐
│ 文章標題                                         │
│ 發布日期 · 分類 · 閱讀時間                        │
├─────────────────────────────────────────────────┤
│ Hero Image (可選)                               │
├─────────────────────────────────────────────────┤
│ 文章內容（MDX，可嵌入影片、互動元件）              │
├─────────────────────────────────────────────────┤
│ 🎬 相關影片 (如有 videoUrl)                      │
├─────────────────────────────────────────────────┤
│ 📧 Newsletter Form (Buttondown)                 │
├─────────────────────────────────────────────────┤
│ 相關文章推薦                                     │
└─────────────────────────────────────────────────┘
```

---

## Reference

### Reusable from Landing Page

```
~/GitHub/airesumeadvisor-landing/
├── src/layouts/
│   ├── Layout.astro       ← 參考
│   └── BlogLayout.astro   ← 參考
├── src/content/config.ts  ← Content Collections 設定
└── tailwind.config.mjs    ← Tailwind 設定
```

### Inspiration

**設計風格參考**：

| 網站 | 特色 | 學習重點 |
|------|------|----------|
| [jamesclear.com](https://jamesclear.com) | 極簡優雅、米白色調 | 基底風格、閱讀體驗 |
| [tim.blog](https://tim.blog) | 實用主義、內容密集 | Start Here 導覽、內容分類 |
| [aliabdaal.com](https://aliabdaal.com) | 年輕活潑、多媒體整合 | 影片嵌入、產品展示 |

**台灣參考**：

| 網站 | 特色 |
|------|------|
| [mrjamie.cc](https://mrjamie.cc) | 長期經營、Essentials 精選頁 |
| [wendellyu.com](https://wendellyu.com) | 一人公司、多元變現 |
| [vista.tw](https://www.vista.tw) | 深淺色主題切換 |

**設計決策**：
- 基底採用 James Clear 極簡風格（淺色背景、大量留白）
- 加入 Ali Abdaal 多媒體整合（支援影片嵌入）
- 參考 Tim Ferriss 導覽設計（清晰內容分類）

---

## Task Breakdown

### Phase 1: Foundation (Day 1-2)

- [ ] Tailwind CSS 設定
- [ ] Layout 元件（Header, Footer）
- [ ] i18n 設定 + 自動語言偵測
- [ ] 語言切換 UI

### Phase 2: Pages (Day 3-5)

- [ ] 首頁（中/英）
- [ ] About 頁（中/英）
- [ ] Contact 頁（中/英）

### Phase 3: Blog (Day 6-8)

- [ ] Content Collections 設定
- [ ] Blog 列表頁
- [ ] Blog 文章頁
- [ ] hreflang 標記

### Phase 4: Content (Day 9-11)

- [ ] WordPress 文章匯入
- [ ] 格式轉換（HTML → MDX）
- [ ] 圖片遷移

### Phase 5: Deploy (Day 12-13)

- [ ] Azure Static Web Apps 設定
- [ ] GitHub Actions CI/CD
- [ ] DNS 切換
- [ ] 測試 + 修復

---

## Timeline

```
1/7  1/8  1/9  1/10 1/11 1/12 1/13 1/14 1/15 ... 1/25  1/26
 │    │    │    │    │    │    │    │    │        │     │
 └─Phase 1─┴Phase 2──┴Phase 3───┴Phase 4──┴Phase 5─┘     │
                                                    Deadline  Japan
```

---

## Success Criteria

- [ ] 所有 MVP 頁面上線
- [ ] i18n 功能正常（自動偵測 + 手動切換）
- [ ] 舊文章全部匯入
- [ ] Lighthouse Performance > 90
- [ ] DNS 切換完成，yu-wenhao.com 指向新站

---

## Risks

| Risk | Mitigation |
|------|------------|
| 時間不足 | 優先完成核心頁面，樣式微調可後續 |
| 文章匯入複雜 | 先匯入重要文章，其餘後續補 |
| i18n 複雜度 | 使用 Astro 內建方案，避免過度設計 |

---

## Related Documents

- Brand strategy: `~/Cockpit/efforts/areas/personal-brand/`
- Product growth: `~/Cockpit/efforts/projects/active/airesumeadvisor/`

---

**Document Control**

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-07 | Initial charter with i18n requirements |
| 1.1 | 2026-01-07 | Added design inspiration, blog categories, page layouts |
| 1.2 | 2026-01-07 | Added Buttondown newsletter integration |
| 1.3 | 2026-01-07 | Added Umami analytics |
| 2.0 | 2026-02-22 | Homepage Strategy: dual-purpose design (zh-TW knowledge funnel / EN professional presence), newsletter migrated to Kit.com, blog categories updated to 3 pillars |
