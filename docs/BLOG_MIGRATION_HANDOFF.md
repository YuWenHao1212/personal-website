# Blog Migration Handoff Document

## Why - 為什麼要做這件事

將原網站 (yu-wenhao.com) 的部落格文章遷移到新的 Astro 網站。原網站使用 WordPress，新網站使用 Astro + MDX Content Collections。

## What - 目前進度

### 已完成的文章 (4 篇)

| 文章 | 狀態 | 圖片數量 | 備註 |
|------|------|----------|------|
| otter.md | ✅ 完成 | 8 張 | 含推薦連結 |
| readwise.md | ✅ 完成 | 14 張 | 含推薦連結 |
| ynab.md | ✅ 完成 | 12 張 (含 1 GIF) | 含推薦連結、工作坊連結 |
| jira.md | ✅ 完成 | 12 張 | 含 Udemy 課程連結、價格表連結 |

### 待處理的文章 (6 篇)

| 文章 | 原文 URL |
|------|----------|
| mymind-and-roam-research.md | https://yu-wenhao.com/blog/mymind-and-roam-research |
| plan-idea-by-miro.md | https://yu-wenhao.com/blog/plan-idea-by-miro |
| outsource-by-fiverr.md | https://yu-wenhao.com/blog/outsource-by-fiverr |
| project-cost-calculation.md | https://yu-wenhao.com/blog/project-cost-calculation |
| persona-1000-users.md | https://yu-wenhao.com/blog/persona-1000-users |
| 卡片盒筆記法.md | https://yu-wenhao.com/blog/zettelkasten |

**注意**：這 6 篇目前的內容是摘要版，不是完整原文。需要重新從原網站抓取完整內容。

---

## Lessons Learned - 重要教訓

### 1. 文章內容必須逐字比對

**問題**：WebFetch 抓取的內容經常會省略或摘要化，導致遺漏重要細節。

**範例**：
- 原文：「作為一個專案經理我們必須把專案的現況搞清楚，也要能清楚的表達出來。這不是一件容易的事情。因為這包含了每一個要花人力、時間去執行的大大小小工作其...」
- 摘要版：「作為專案經理必須把專案現況搞清楚並清楚表達。這包含了每項工作的...」

**解決方法**：
1. 使用 WebFetch 時，prompt 要明確說「逐字擷取，不要省略任何句子」
2. 完成後請用戶確認，必要時多次比對
3. 特別注意：括號內的補充說明、引號內的名言、粗體文字

### 2. 圖片可能會被誤植（下載錯誤）

**問題**：使用 curl 下載圖片時，可能會：
- 下載到 HTML 錯誤頁面而非實際圖片
- 多張圖片下載到同一個檔案（檔案大小相同）
- URL 編碼問題導致下載失敗

**範例**：
- jira 文章中 `kanban.jpg` 下載後實際是 HTML 文件
- `udemy-concept.webp` 和 `udemy-realworld.webp` 曾經是同一張圖（檔案大小 63850 bytes 相同）

**解決方法**：
1. 下載後用 `file` 命令檢查檔案類型
2. 用 `ls -la` 比較檔案大小，大小相同的可能是重複
3. 讓用戶在 localhost 上實際查看圖片確認

### 3. 圖片需要有 figcaption 小標題

**問題**：原網站的圖片都有 `<figcaption>` 小標題，單純用 Markdown `![alt](src)` 格式無法顯示。

**解決方法**：使用 HTML `<figure>` + `<figcaption>` 格式：

```html
<figure>
<img src="/images/blog/jira/workflow-quote.webp" alt="客戶報價工作流程" />
<figcaption>客戶報價工作流程</figcaption>
</figure>
```

已在 `src/styles/global.css` 加入樣式：
```css
figure {
  @apply my-6;
}

figure img {
  @apply w-full rounded-lg;
}

figcaption {
  @apply text-center text-sm text-ink-600 mt-2 italic;
}
```

### 4. 圖片位置要與原文一致

**問題**：圖片放錯位置會影響閱讀體驗。

**範例**：jira 文章中的 Udemy 課程圖片原本應該只在「學習資源」段落，但被誤放在「Jira 功能介紹」段落。

**解決方法**：仔細比對原文的圖片出現位置，必要時請用戶提供截圖確認。

### 5. 不要遺漏推薦連結和外部連結

**重要連結類型**：
- 推薦/聯盟連結（如 YNAB referral、Fiverr 折扣）
- 外部資源連結（如 Udemy 課程、官方試用頁面）
- 書籍/文章引用連結

---

## 標準作業流程 (SOP)

### 處理每篇文章的步驟：

1. **抓取原文**
   ```
   WebFetch URL，prompt: "請逐字擷取整篇文章的完整內容，不要省略任何句子"
   ```

2. **列出所有圖片 URL**
   ```
   WebFetch URL，prompt: "請列出所有圖片的 URL 和 figcaption"
   ```

3. **下載圖片**
   ```bash
   mkdir -p public/images/blog/{article-name}
   cd public/images/blog/{article-name}
   curl -L -o filename.png "URL"
   ```

4. **驗證圖片**
   ```bash
   file *.png *.jpg  # 確認是真正的圖片檔
   ls -la  # 比較檔案大小，找出可能重複的
   ```

5. **轉換為 webp**
   ```bash
   npx sharp-cli -i input.png -o output.webp resize 800
   rm input.png
   ```

6. **撰寫 Markdown**
   - 使用 `<figure>` + `<figcaption>` 格式
   - 保留所有粗體、引號、括號內容
   - 加入所有外部連結

7. **請用戶確認**
   - 文字內容是否完整
   - 圖片是否正確顯示
   - 圖片位置是否正確
   - figcaption 是否顯示

---

## 檔案結構

```
/public/images/blog/
├── otter/          # 8 張 webp
├── readwise/       # 14 張 webp
├── ynab/           # 11 張 webp + 1 gif
├── jira/           # 12 張 webp (含 2 張 udemy)
└── {其他文章}/     # 待建立

/src/content/blog/zh-TW/
├── otter.md        ✅ 完成
├── readwise.md     ✅ 完成
├── ynab.md         ✅ 完成
├── jira.md         ✅ 完成
├── mymind-and-roam-research.md  ⚠️ 需重寫
├── plan-idea-by-miro.md         ⚠️ 需重寫
├── outsource-by-fiverr.md       ⚠️ 需重寫
├── project-cost-calculation.md  ⚠️ 需重寫
├── persona-1000-users.md        ⚠️ 需重寫
└── 卡片盒筆記法.md               ⚠️ 需重寫
```

---

## 下一步

1. 繼續處理剩餘 6 篇文章
2. 每篇都要：
   - 從原網站抓取完整內容（逐字）
   - 下載並驗證所有圖片
   - 使用 figure/figcaption 格式
   - 請用戶確認後才進入下一篇

---

**Last Updated**: 2026-01-07
