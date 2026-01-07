# URL Redirects - 網站遷移

## 背景

從舊網站 (yu-wenhao.com) 遷移到新 Astro 網站時，URL 結構有變更：
- 舊站：`/blog/{slug}`
- 新站：`/zh-TW/blog/{slug}`

需要設定 301 redirects 確保 SEO 和舊連結不會失效。

---

## 需要處理的 Redirects

### 頁面 (4 個)

| 舊 URL | 新 URL |
|--------|--------|
| `/` | `/zh-TW/` |
| `/blog` | `/zh-TW/blog` |
| `/about` | `/zh-TW/about` |
| `/contact` | `/zh-TW/contact` |

### 文章 (34 篇)

| 舊 URL | 新 URL |
|--------|--------|
| `/blog/ai-agent-first-saas` | `/zh-TW/blog/ai-agent-first-saas` |
| `/blog/ai-resume-advisor-mvp` | `/zh-TW/blog/ai-resume-advisor-mvp` |
| `/blog/ai-tool-workflow-2024` | `/zh-TW/blog/ai-tool-workflow-2024` |
| `/blog/atomic-habits` | `/zh-TW/blog/atomic-habits` |
| `/blog/build-second-brain` | `/zh-TW/blog/build-second-brain` |
| `/blog/claude-code-development` | `/zh-TW/blog/claude-code-development` |
| `/blog/claude-code-guide` | `/zh-TW/blog/claude-code-guide` |
| `/blog/cursor-ai-developer` | `/zh-TW/blog/cursor-ai-developer` |
| `/blog/cursor-prompt-principles` | `/zh-TW/blog/cursor-prompt-principles` |
| `/blog/die-with-zero` | `/zh-TW/blog/die-with-zero` |
| `/blog/digital-minimalism` | `/zh-TW/blog/digital-minimalism` |
| `/blog/firecrawl-guide` | `/zh-TW/blog/firecrawl-guide` |
| `/blog/getting-things-done` | `/zh-TW/blog/getting-things-done` |
| `/blog/how-to-take-smart-notes` | `/zh-TW/blog/how-to-take-smart-notes` |
| `/blog/indiehacker-challenges-2024` | `/zh-TW/blog/indiehacker-challenges-2024` |
| `/blog/make-time` | `/zh-TW/blog/make-time` |
| `/blog/mcp-server-guide` | `/zh-TW/blog/mcp-server-guide` |
| `/blog/minerva-experience` | `/zh-TW/blog/minerva-experience` |
| `/blog/n8n-automation-guide` | `/zh-TW/blog/n8n-automation-guide` |
| `/blog/obsidian-setup-guide` | `/zh-TW/blog/obsidian-setup-guide` |
| `/blog/obsidian-web-clipper` | `/zh-TW/blog/obsidian-web-clipper` |
| `/blog/one-person-company` | `/zh-TW/blog/one-person-company` |
| `/blog/perplexity-guide` | `/zh-TW/blog/perplexity-guide` |
| `/blog/pm-ai-builder` | `/zh-TW/blog/pm-ai-builder` |
| `/blog/product-manager-ai-coding` | `/zh-TW/blog/product-manager-ai-coding` |
| `/blog/psychology-of-money` | `/zh-TW/blog/psychology-of-money` |
| `/blog/same-as-ever` | `/zh-TW/blog/same-as-ever` |
| `/blog/steal-like-an-artist` | `/zh-TW/blog/steal-like-an-artist` |
| `/blog/the-mom-test` | `/zh-TW/blog/the-mom-test` |
| `/blog/todoist-guide` | `/zh-TW/blog/todoist-guide` |
| `/blog/卡片盒筆記法` | `/zh-TW/blog/卡片盒筆記法` |
| `/blog/數據分析師` | `/zh-TW/blog/數據分析師` |
| `/blog/非暴力溝通` | `/zh-TW/blog/非暴力溝通` |

> **注意**：3 篇中文 slug 文章需要 URL encode 處理

---

## 實作方式

使用 Azure Static Web Apps 的 `staticwebapp.config.json`：

```json
{
  "routes": [
    {
      "route": "/blog/*",
      "redirect": "/zh-TW/blog/*",
      "statusCode": 301
    },
    {
      "route": "/about",
      "redirect": "/zh-TW/about",
      "statusCode": 301
    },
    {
      "route": "/contact",
      "redirect": "/zh-TW/contact",
      "statusCode": 301
    },
    {
      "route": "/",
      "redirect": "/zh-TW/",
      "statusCode": 301
    }
  ]
}
```

---

## 狀態

- [ ] 確認所有文章 slug 對應正確
- [ ] 建立 `staticwebapp.config.json`
- [ ] 測試 redirects
- [ ] 部署到 production

---

**Created**: 2026-01-07
**Priority**: Medium (遷移時處理)
