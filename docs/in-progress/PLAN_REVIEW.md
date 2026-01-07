# Implementation Plan Review

**Reviewed**: 2026-01-07
**Compared**: IMPLEMENTATION_PLAN.md v1.0 vs PROJECT_CHARTER.md v1.3

---

## Summary

經過比對 PROJECT_CHARTER.md 和 IMPLEMENTATION_PLAN.md，發現以下遺漏或不完整的項目需要補充。

---

## Findings

### 1. Completely Missing Items

| Item | Charter Location | Description |
|------|------------------|-------------|
| **Root redirect page** | File Structure | `src/pages/index.astro` 需 redirect 到 `/zh-TW/`，Plan 有提到但沒有對應 task |
| **Reading time calculation** | Blog Article Layout | Charter 提到顯示「閱讀時間」，Plan 完全沒有相關 task |
| **Related posts algorithm** | Blog Article Layout | Plan 有 RelatedPosts 元件但沒有推薦演算法說明 |
| **Multi-language RSS** | SEO Requirements | Plan 只有 `rss.xml.ts`，沒說明多語言 RSS 處理方式 |
| **Language version link UI** | i18n Requirements | 使用 translationKey 連結中英版本的 UI（如「閱讀英文版」） |

### 2. Incomplete Details

| Item | Charter Requirement | Plan Gap |
|------|---------------------|----------|
| **Category display names** | 4 大分類有中英文名稱 | Plan 只有 enum 值，沒有翻譯對應表 |
| **Hero photo** | 首頁需要專業照片 | 沒有提到照片準備或 placeholder |
| **OG image** | Social sharing 支援 | 沒有提到需準備社群分享圖片 |
| **Analytics events** | 詳細追蹤指標表格 | Plan 只說「驗證資料收集」，沒有事件設定 |
| **Featured posts logic** | FeaturedPosts 元件 | 沒說明如何選取 featured 文章 |

### 3. Well Covered Items

以下項目規劃完整：

- Tailwind CSS 設定
- i18n 架構與 middleware
- Layout 元件（Header, Footer, SEO）
- 頁面結構（Homepage, About, Contact）
- Content Collections schema
- Blog 列表/文章頁
- Newsletter (Buttondown) 整合
- Azure 部署流程
- DNS 設定

---

## Recommended Actions

### Phase 1: Foundation - Add

```markdown
| Task | Description | Files |
|------|-------------|-------|
| 1.4.1 | 建立 root redirect 頁面 | `src/pages/index.astro` |
```

### Phase 2: Pages - Add

```markdown
| Task | Description | Files |
|------|-------------|-------|
| 2.1.7 | 準備 Hero 專業照片或 placeholder | `public/images/hero.jpg` |
| 2.1.8 | 建立 OG 社群分享圖片 | `public/images/og-default.jpg` |
```

### Phase 3: Blog - Add

```markdown
| Task | Description | Files |
|------|-------------|-------|
| 3.2.5 | 建立分類名稱翻譯對應 | `src/i18n/categories.ts` |
| 3.3.7 | 實作閱讀時間計算 helper | `src/utils/readingTime.ts` |
| 3.3.8 | 實作相關文章推薦邏輯 | `src/utils/relatedPosts.ts` |
| 3.3.9 | 實作語言版本連結 UI | `src/components/LanguageVersionLink.astro` |
| 3.4.5 | 建立多語言 RSS feeds | `src/pages/zh-TW/rss.xml.ts`, `src/pages/en/rss.xml.ts` |
```

### Phase 5: Integrations - Add

```markdown
| Task | Description | Files |
|------|-------------|-------|
| 5.2.5 | 設定 Umami 追蹤事件 | Newsletter signup, category clicks |
```

---

## Priority Assessment

| Priority | New Items | Reason |
|----------|-----------|--------|
| P0 (Must) | Root redirect, Reading time, Category names | 核心功能/UX |
| P1 (Should) | Related posts, Language version link, OG image | 完整體驗 |
| P2 (Could) | Multi-language RSS, Analytics events | 可後續加 |

---

## Updated Task Count

| Phase | Original Tasks | New Tasks | Total |
|-------|----------------|-----------|-------|
| Phase 1 | 13 | +1 | 14 |
| Phase 2 | 10 | +2 | 12 |
| Phase 3 | 15 | +5 | 20 |
| Phase 5 | 5 | +1 | 6 |
| **Total** | 43 | +9 | 52 |

---

## Next Steps

1. 決定哪些項目要加入 MVP scope
2. 更新 IMPLEMENTATION_PLAN.md
3. 調整時程評估（如有需要）

---

**Document Control**

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-07 | Initial review |
