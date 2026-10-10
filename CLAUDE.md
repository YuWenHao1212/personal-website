# Personal Website - Claude Instructions

## Project Overview

個人品牌網站 (yu-wenhao.com)，使用 Astro + Tailwind CSS。

---

## Tech Stack

- **Framework**: Astro 5.x
- **Styling**: Tailwind CSS
- **Content**: MDX (Content Collections)
- **i18n**: Astro 內建 i18n
- **Hosting**: Cloudflare Pages（前身 Azure Static Web Apps，已遷移）

### Deployment

- **Push to main → Cloudflare Pages 自動 build + deploy**（repo 內沒有 GitHub Actions、設定在 Cloudflare 平台端）
- 生效時間約 1-3 分鐘，push 後用 `curl -s -o /dev/null -w "%{http_code}" <url>` 輪詢驗證
- 新增 `public/` 靜態檔（zip / 圖片）也是同一條 pipeline，跟著 push 上線

### 中文文章的字型檔（2026-10-11 起）

- 中文文章的內文字體（源雲明體）是每篇文章自己一小包字型檔：`public/fonts/a/<slug>-400.woff2`、`-600.woff2`。
- **新增或改過 `src/content/blog/zh-TW/` 的文章後，commit 前跑 `npm run fonts`**，把產出的字型檔和 `src/data/article-font-chars.json` 跟文章一起 commit。它只重做內容有變動的文章。
- 沒跑的話 `npm run build` 會停下來並列出是哪幾篇。Cloudflare 的建置也一樣會失敗：網站停在上一個成功的版本，**沒有通知**。
- 所以 push 後一定要確認新文章的網址打得開（上面的 curl 輪詢）。回 404 或內容沒變，先去 Cloudflare 看建置紀錄。
- 標題字體（昭源宋體）也是自己裁的，全站中文頁共用兩個檔：`public/fonts/head-900.woff2`、`head-700.woff2`。**改了中文頁面的標題文字、或文章的標題與小標，同樣要跑 `npm run fonts`**，檢查機制是同一個。
- 做法與原因寫在 `scripts/article-font.mjs` 開頭。

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

### zh-TW（電子報 + 服務頁，拆兩行）

```markdown
*如果這篇讓你有了想法，[訂閱每週一封信](/zh-TW/)——我固定寫 AI 工作流、和一路上想通的事。*

*想聊聊怎麼把 AI 融入你的工作流？[看看我的服務](/zh-TW/services/)。*
```

### EN（導向 LinkedIn）

```markdown
*Enjoyed this? [Connect with me on LinkedIn](https://www.linkedin.com/in/hence/) — I'm always happy to chat about AI, systems, and building things solo.*
```

### 注意事項

- zh-TW 第一行：電子報 `/zh-TW/`（首頁訂閱區塊），第二行：服務頁 `/zh-TW/services/`
- EN 連結指向 LinkedIn profile（沒有英文電子報）
- 不用 HTML `<a>` 標籤，一律用 markdown
- CTA 前不加「延伸閱讀」或其他導言
- 不需要手動寫「延伸閱讀」區塊，`relatedPosts` frontmatter 會自動處理

---

## Backend API (personal-website-api)

yu-wenhao.com 專用的輕量 FastAPI backend，獨立 Azure Container App。

- **Repo**: `~/GitHub/personal-website-api`
- **URL**: `https://yu-wenhao-api.calmisland-ea7fe91e.japaneast.azurecontainerapps.io`
- **Database**: PostgreSQL (`yuwenhao` database on existing server)
- **CI/CD**: Push to main → ACR build → Container App deploy

### Endpoints

| Method | Path | Auth | 用途 |
|--------|------|------|------|
| POST | `/api/survey/submit` | Public | Survey 表單提交（dual submit with Kit） |
| GET | `/api/survey/responses/{survey_id}` | `?key=ADMIN_KEY` | 查看 survey 回覆 |
| GET | `/health` | Public | Health check |

### Survey 雙寫架構

前端表單同時送到 Kit (ConvertKit) + personal-website-api：
- Kit：email marketing、發信用
- Backend：完整資料備份（含 role、scenario、IP、UA）
- Backend 失敗不影響 Kit 送出

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
