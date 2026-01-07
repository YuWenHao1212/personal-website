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
