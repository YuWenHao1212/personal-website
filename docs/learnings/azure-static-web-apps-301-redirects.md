# Azure Static Web Apps 301 Redirects 設定指南

## Meta

| 項目 | 內容 |
|------|------|
| **主題** | Azure Static Web Apps 的 301 redirect 設定 |
| **情境** | 網站遷移後處理 Google Search Console 404 錯誤 |
| **建立日期** | 2026-01-15 |
| **相關專案** | personal-website (yu-wenhao.com) |
| **關鍵字** | Azure, Static Web Apps, 301 redirect, SEO, GSC, 404, staticwebapp.config.json |

---

## 背景

從舊網站遷移到新 Astro 網站時，URL 結構變更：
- 舊站：`/blog/{slug}`
- 新站：`/zh-TW/blog/{slug}`

Google Search Console 報告大量 404 錯誤，需要設定 301 redirects。

---

## 關鍵學習

### 1. staticwebapp.config.json 必須放在 `public/` 資料夾

**問題**：設定檔放在專案根目錄，但 Azure 讀不到。

**原因**：Astro build 只會把 `public/` 資料夾的內容複製到 `dist/`。

**解決**：
```bash
mv staticwebapp.config.json public/
```

**驗證**：build 後檢查 `dist/staticwebapp.config.json` 是否存在。

---

### 2. Azure 不支援 Wildcard 變數在 Redirect 目標

**問題**：想用 wildcard 簡化設定：
```json
{
  "route": "/blog/*",
  "redirect": "/zh-TW/blog/{*}",  // ❌ 不會運作！
  "statusCode": 301
}
```

**結果**：Azure 把 `{*}` 當成字面值，redirect 到 `/zh-TW/blog/%7b*%7d`。

**解決**：必須為每篇文章建立明確的 redirect 規則：
```json
{
  "route": "/blog/otter",
  "redirect": "/zh-TW/blog/otter",
  "statusCode": 301
},
{
  "route": "/blog/ynab",
  "redirect": "/zh-TW/blog/ynab",
  "statusCode": 301
}
// ... 每篇文章都要
```

**Fallback**：用 wildcard 處理不存在的文章，redirect 到列表頁：
```json
{
  "route": "/blog/*",
  "redirect": "/zh-TW/blog/",
  "statusCode": 301
}
```

---

### 3. 不能有重複的 Route（包含 Trailing Slash）

**問題**：Azure 部署失敗，錯誤訊息：
```
A rule was already processed with a duplicate route /courage-to-be-disliked/
```

**原因**：同時設定了 `/path` 和 `/path/` 兩個 route。

**解決**：Azure 會自動處理 trailing slash，只需要設定一個版本：
```json
// ✅ 正確 - 只需要一個
{
  "route": "/courage-to-be-disliked",
  "redirect": "/zh-TW/blog/courage-to-be-disliked",
  "statusCode": 301
}

// ❌ 錯誤 - 不要同時設定兩個
{
  "route": "/courage-to-be-disliked",
  "redirect": "/zh-TW/blog/courage-to-be-disliked",
  "statusCode": 301
},
{
  "route": "/courage-to-be-disliked/",  // 重複！
  "redirect": "/zh-TW/blog/courage-to-be-disliked",
  "statusCode": 301
}
```

---

### 4. Route 順序很重要

Azure 會按照 routes 陣列的順序匹配，**第一個匹配的規則會生效**。

**建議順序**：
1. 特殊 redirect（如文章改名）
2. 明確的文章 redirect（`/blog/otter` → `/zh-TW/blog/otter`）
3. Wildcard fallback（`/blog/*` → `/zh-TW/blog/`）
4. Headers 設定

```json
{
  "routes": [
    // 1. 特殊 redirect（文章改名）
    { "route": "/blog/old-slug", "redirect": "/zh-TW/blog/new-slug", "statusCode": 301 },

    // 2. 明確的文章 redirect
    { "route": "/blog/otter", "redirect": "/zh-TW/blog/otter", "statusCode": 301 },

    // 3. Wildcard fallback（放在明確規則之後）
    { "route": "/blog/*", "redirect": "/zh-TW/blog/", "statusCode": 301 },

    // 4. Headers
    { "route": "/zh-TW/*", "headers": { "content-language": "zh-TW" } }
  ]
}
```

---

### 5. 中文 URL 會被自動 Encode

中文 slug 在 redirect 時會被 URL encode，這是正常的：

```
/卡片盒筆記法/ → /zh-TW/blog/%e5%8d%a1%e7%89%87%e7%9b%92%e7%ad%86%e8%a8%98%e6%b3%95
```

瀏覽器會自動 decode 顯示，不需要特別處理。

---

## 完整設定範例

```json
{
  "navigationFallback": {
    "rewrite": "/index.html",
    "exclude": ["/api/*", "/data/*", "*.xml", "*.json", "*.txt"]
  },
  "routes": [
    // 首頁
    { "route": "/", "redirect": "/zh-TW/", "statusCode": 301 },

    // 文章改名
    {
      "route": "/blog/old-article-name",
      "redirect": "/zh-TW/blog/new-article-name",
      "statusCode": 301
    },

    // 不存在的頁面類型 redirect 到列表
    { "route": "/blog/article/*", "redirect": "/zh-TW/blog/", "statusCode": 301 },
    { "route": "/blog/category/*", "redirect": "/zh-TW/blog/", "statusCode": 301 },
    { "route": "/blog/tag/*", "redirect": "/zh-TW/blog/", "statusCode": 301 },

    // 每篇文章的明確 redirect
    { "route": "/blog/otter", "redirect": "/zh-TW/blog/otter", "statusCode": 301 },
    { "route": "/blog/ynab", "redirect": "/zh-TW/blog/ynab", "statusCode": 301 },
    // ... 其他文章

    // Wildcard fallback（放在最後）
    { "route": "/blog/*", "redirect": "/zh-TW/blog/", "statusCode": 301 },

    // 其他頁面
    { "route": "/about", "redirect": "/zh-TW/about", "statusCode": 301 },
    { "route": "/contact", "redirect": "/zh-TW/contact", "statusCode": 301 },

    // Headers
    { "route": "/zh-TW/*", "headers": { "content-language": "zh-TW" } },
    { "route": "/en/*", "headers": { "content-language": "en" } }
  ],
  "responseOverrides": {
    "404": { "rewrite": "/404.html" }
  }
}
```

---

## 測試方法

使用 curl 測試 redirect：

```bash
# 測試單一 URL
curl -sI "https://yu-wenhao.com/blog/otter" | grep -E "(HTTP|location)"

# 預期結果
HTTP/2 301
location: /zh-TW/blog/otter
```

---

## 相關資源

- [Azure Static Web Apps Configuration](https://learn.microsoft.com/en-us/azure/static-web-apps/configuration)
- [GitHub Discussion: Wildcard Support](https://github.com/Azure/static-web-apps/discussions/1481)

---

## 變更記錄

| 日期 | 變更 |
|------|------|
| 2026-01-15 | 建立文檔 |
