# Personal Website - Claude Instructions

## Project Overview

個人品牌網站 (yu-wenhao.com)，使用 Astro + Tailwind CSS。

---

## Tech Stack

- **Framework**: Astro 5.x
- **Styling**: Tailwind CSS
- **Content**: MDX (Content Collections)
- **i18n**: Astro 內建 i18n
- **Hosting**: Azure Static Web Apps

---

## Key Requirements

### i18n

- 繁體中文 (zh-TW) - 預設
- English (en)
- 自動偵測瀏覽器語言
- URL: `/zh-TW/...` 和 `/en/...`

### Pages (MVP)

- 首頁 (/)
- About (/about)
- Blog (/blog, /blog/[slug])
- Contact (/contact)

---

## Project Structure

```
/
├── src/
│   ├── components/      ← UI 元件
│   ├── layouts/         ← 頁面 Layout
│   ├── pages/
│   │   ├── zh-TW/       ← 中文頁面
│   │   └── en/          ← 英文頁面
│   ├── content/
│   │   └── blog/
│   │       ├── zh-TW/   ← 中文文章
│   │       └── en/      ← 英文文章
│   ├── i18n/            ← 翻譯檔
│   └── styles/          ← Global CSS
├── public/              ← Static assets
├── docs/
│   ├── PROJECT_CHARTER.md
│   ├── tasks/
│   └── tasks-done/
└── astro.config.mjs
```

---

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## Blog CTA Rules

每篇 blog 結尾都要放 CTA，位於 `---` 分隔線之後，格式為 italic markdown（`*...*`）。中英文各一版，全站統一，不因文章主題改動措辭。

### zh-TW（導向電子報）

```markdown
*喜歡這類內容？我每週寫一封信，聊怎麼把 AI 用在真實生活和工作裡，和一路上想通的道理。[訂閱直接寄給你](/zh-TW/)。*
```

### EN（導向 LinkedIn）

```markdown
*Enjoyed this? [Connect with me on LinkedIn](https://www.linkedin.com/in/hence/) — I'm always happy to chat about AI, systems, and building things solo.*
```

### 注意事項

- zh-TW 連結指向 `/zh-TW/`（首頁訂閱區塊）
- EN 連結指向 LinkedIn profile（沒有英文電子報）
- 不用 HTML `<a>` 標籤，一律用 markdown
- CTA 前不加「延伸閱讀」或其他導言
- 不需要手動寫「延伸閱讀」區塊，`relatedPosts` frontmatter 會自動處理

---

## Reference

可從 Landing Page 複用：
- `~/GitHub/airesumeadvisor-landing/src/layouts/`
- `~/GitHub/airesumeadvisor-landing/tailwind.config.mjs`

---

## Related

- Project Charter: `docs/PROJECT_CHARTER.md`
- Brand Strategy: `~/Cockpit/projects/personal-brand/STRATEGY.md`
- Cockpit: `~/Cockpit/ideas/personal-website-rebuild.md`

---

**Deadline**: 2026-01-25 (日本出遊前)
