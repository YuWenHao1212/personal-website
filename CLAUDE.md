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

### Design System（2026-10-12 起）

顏色、字級、間距、字重只在 `src/styles/tokens.css` 定義。**新頁面和新文章一律用那裡的變數**，不寫死色碼、字級、間距，不用 Tailwind 舊配色的樣式名。規則和各階的用途在 `docs/DESIGN.md`。

- `npm run build` 前會自動跑 `scripts/check-tokens.mjs`，新檔案有寫死的值就建置失敗。
- 被擋下來就改檔案。**不要把檔案加進 `scripts/check-tokens-exempt.json`**，那份清單只列 10/12 之前的舊檔，只能變短。
- 文章的 Markdown 不放自己的 `<style>`。要新的版面元件，加在 `src/styles/reading.css`。

### 工作坊換梯（2026-10-12 起）

- 梯次的日期、星期、城市、第幾班、開不開放報名，只住一個檔：`src/data/cohorts.ts`。**換梯只改這個檔**，檔頭有步驟。
- 工作坊頁和中文文章裡指向工作坊的那一句，都讀這個檔。文章裡的寫法是 `<span data-ws-status>實體工作坊</span>`（舊文章的那一句）或 `<span data-workshop-cta>…</span>`（整句），由 `src/layouts/ArticleLayout.astro` 結尾的 script 在讀者開頁面時填字。標記裡的原文是沒有程式、搜尋引擎、沒有梯次招生時看到的字，所以不要在裡面寫日期。
- 剩幾個名額不在這個 repo：讀者開頁面時問後端 `/api/workshop/availability`（personal-website-api）。5 個以下才顯示，額滿整句會換掉，後端沒回應就不顯示。文章和工作坊頁用同一個規則。
- 新文章要放工作坊那一句，用上面的標記，不要手打日期和名額。
- 本機預覽沒有後端，網址加 `?seats=2`（只在本機有效）可以看各種名額的樣子。
- 改了 `cohorts.ts` 或 `ArticleLayout.astro` 之後一樣要跑 `npm run fonts`：字型檔會讀這兩個檔來決定要帶哪些字。

---

## Key Requirements

### i18n

- 繁體中文 (zh-TW) - 預設
- English (en)
- URL: `/zh-TW/...` 和 `/en/...`；`/` 一律 301 到 `/zh-TW/`（`public/_redirects`）。網站是靜態 build，不偵測瀏覽器語言

### 頁面

實際有哪些頁面，以 `src/pages/zh-TW/`、`src/pages/en/` 為準，這裡不另列清單。

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
│   ├── data/            ← cohorts.ts（工作坊梯次）等資料檔
│   ├── i18n/            ← 翻譯檔
│   └── styles/          ← tokens.css、reading.css
├── scripts/             ← 字型裁切、tokens 檢查等建置腳本
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
npm run build    # Build for production（會先跑 tokens 檢查）
npm run preview  # Preview production build
npm run fonts    # 重做中文文章和標題的字型檔（見上面「中文文章的字型檔」）
```

---

## 文章結尾（CTA）

**通用的結尾由版型自動放，文章內文不寫。** `src/layouts/ArticleLayout.astro` 的 `.ar-end` 區塊（2026-10-09 新版文章頁起）排在 FAQ、tags、作者介紹之後：

- 中文：「想讓新的文章寄給你 → 訂閱電子報」，下面兩行「公司要導入 AI → 到匯流顧問找我們」「個人想學這套做法 → 一日的公開班」
- 英文：「Questions, or something to work on together? → Find me on LinkedIn」

所以內文**不寫**電子報、LinkedIn、泛泛的「看服務」「找匯流顧問」這類句子，舊文章改版時看到就刪。

**這篇有特別要讀者做的事，才在內文寫一句**，而且要跟版型區塊說的不一樣，例如報名某一班課、去看某篇文章。報名工作坊用 `<span data-workshop-cta>…</span>` 的寫法（見上面「工作坊換梯」），日期和名額由版型帶，不手打。

- 不用 HTML `<a>` 標籤，一律用 markdown
- 不需要手動寫「延伸閱讀」區塊，`relatedPosts` frontmatter 會自動處理

規則的正本在 FLUX Vault 的 `.claude/skills/article-publish/references/site-matrix.md`「CTA」段（2026-10-19 定），兩邊不一致時以那份為準。

---

## Backend API (personal-website-api)

yu-wenhao.com 專用的 FastAPI 後端。

- **Repo**: `~/GitHub/personal-website-api`
- **URL**: `https://api.yu-wenhao.com`（前端一律打這個網域）
- **主機與資料庫**：Zeabur（專案 `flux-prod`，資料庫服務 `pg-yu-wenhao`，見該 repo 的 `scripts/README-db.md`）。原本在 Azure，2026-08-18 刪掉 Azure 的部署設定
- **端點以該 repo 的程式為準**。前端用到的：工作坊名額、報名、結帳、推薦碼（`/api/workshop/*`）、電子報訂閱（`/api/newsletter/subscribe-form`）、後台讀問卷回覆和 Kit 統計（`/api/survey/responses/*`、`/api/kit/*`）
- 問卷頁 2026-10-09 下架，前端已經不再送 `/api/survey/submit`

---

## Related

- Project Charter: `docs/PROJECT_CHARTER.md`
- 設計規則：`docs/DESIGN.md`
- 品牌策略：FLUX Vault `efforts/areas/personal-brand/BRAND-STRATEGY.md`
- 文章從寫作到上架：FLUX Vault `efforts/projects/active/article-flow/`、`article-publish` skill
