---
title: "Claude Skills 是什麼？一次搞懂 AI 的「可複用食譜」"
description: "Claude Skills 讓你教 AI 一次，每次都照你的方式做事。這篇用廚房比喻帶你理解 Skill 是什麼、怎麼運作、為什麼重要，附 5 種設計模式和實際案例。"
pubDate: 2026-02-16
category: building-products
tags: ["AI", "Claude Code", "agentic coding", "Claude Skills", "MCP", "developer-tools", "工作流"]
lang: zh-TW
translationKey: claude-skills-guide
featured: false
draft: true
focus_keyphrase: "Claude Skills"
relatedPosts: ["agentic-coding-guide.md", "claude-code-tutorial.md", "openclaw-tools-skills-tutorial.md"]
---

每次用 Claude 都要重新解釋一次「我喜歡怎樣的格式」「先做 A 再做 B」「用這個風格寫」。

煩不煩？

我煩死了。

我的每日規劃流程有 8 個步驟：確認日期、回顧昨天、查看週目標、同步專案任務、盤點 Obsidian inbox、跑內容發現系統、建立 daily note、跟自己討論今天要做什麼。

每天早上，我要從零解釋這整套流程給 Claude 聽。八步。每天。

後來我直接寫了一份 prompt，每天早上貼進去。貼了一個月。

然後 Anthropic 做了一件事。


## Skill：教一次，每次都照做

2025 年底，Anthropic 推出了 **Skills**。

一句話解釋：Skill 就是一份「食譜」，教 Claude 怎麼按照你的方式做事。

寫一次。之後每次對話自動套用。不用貼 prompt。不用重複解釋。

我把那份每天貼的 prompt 改寫成一個 skill，叫 `/daily`。

現在每天早上我說「早安」，Claude 就自動跑完 8 個步驟——讀我的行事曆、檢查昨天的 carry-over、查 12 Week Year 週目標、同步四個專案的任務狀態、掃一遍我的 Obsidian inbox、從 Panopticon（我的內容發現系統）抓今天的靈感、建好 daily note、然後問我：「今天要先做哪個？」

我只需要說兩個字。


## 廚房 vs 食譜

如果你用過 Claude 的 MCP（Model Context Protocol），你已經給了 Claude 一整間廚房——各種工具、食材、設備都有。

但有廚房不代表會做菜。

**MCP 是廚房。Skills 是食譜。**

| MCP（廚房） | Skills（食譜） |
|------------|--------------|
| 連接工具（Notion、Linear、GitHub...） | 教 Claude 怎麼用這些工具 |
| 提供即時資料存取 | 嵌入最佳實踐和工作流 |
| 解決「能不能做」 | 解決「怎麼做最好」 |

沒有食譜的廚房，每次做菜都要重新摸索。
沒有廚房的食譜，有知識但沒有執行能力。

我的 Panopticon 系統就是一個好例子。MCP 讓 Claude 能連到我的 API 抓取 Reddit、Hacker News、Product Hunt 的熱門內容。但「抓到之後要怎麼處理」——篩選互動分數 4 以上的、分成 5 種內容類型、推薦 2-3 個題材——這些判斷邏輯都寫在 skill 裡。

廚房 + 食譜。缺一不可。


## 一個 Skill 長什麼樣

技術上，Skill 就是一個資料夾。裡面最重要的是一個叫 `SKILL.md` 的檔案。

```
my-daily-planning/
├── SKILL.md          ← 主要指令（必要）
├── scripts/          ← 可執行的腳本（選用）
├── references/       ← 參考文件（選用）
└── assets/           ← 模板（選用）
```

`SKILL.md` 的開頭有一段 YAML 設定，告訴 Claude「這個 skill 是做什麼的、什麼時候該用」。後面就是具體的步驟和指令。

像一份有標題、有材料清單、有步驟的食譜。


## 最聰明的設計：漸進式揭露

這是我覺得最精巧的部分。

Claude 不會一口氣讀完你所有 skill 的全部內容。那樣太浪費了——想像一個廚師同時翻開 20 本食譜的所有頁面。

Anthropic 設計了一個三層架構：

**第一層：標題和簡介**（永遠載入）
就像食譜封面——「番茄義大利麵，適合週末午餐」。Claude 讀這個就知道什麼時候該用這個 skill。

**第二層：完整指令**（覺得相關才載入）
Claude 判斷「嗯，這個任務需要用到這份食譜」，才會翻開來讀。

**第三層：附加文件**（按需查閱）
更詳細的參考資料。Claude 需要時才去翻。

這個設計叫 **Progressive Disclosure**（漸進式揭露）。

我現在同時掛了 18 個 skills。如果每個都全部載入，Claude 會被資訊淹沒。但因為有這個三層架構，平常只有「封面」被載入。我說「早安」，只有 `/daily` 會被完整打開。其他 17 個安靜待命。


## 那個「標題」比你想像的重要 100 倍

Skill 的 YAML frontmatter 裡有一個 `description` 欄位。

這東西看起來不起眼，但它**決定了你的 skill 會不會被觸發**。

Claude 就是靠這段文字來判斷：「使用者現在說的話，跟這個 skill 有關嗎？」

寫得好：

```yaml
description: 每日工作規劃流程。當用戶說「規劃今天」「daily planning」
  「今日規劃」「早安」時使用。包含完整 8 步驟。
```

Claude 聽到「早安」就知道該啟動。

寫得爛：

```yaml
description: 幫助處理日常工作。
```

太模糊了。Claude 不知道什麼時候該用它。結果就是——永遠不觸發。

**公式**：`[做什麼] + [什麼時候用] + [具體觸發詞]`

這其實跟產品的 landing page 一樣。你怎麼描述你的產品，決定了別人會不會點進來。

我在 description 裡會同時寫中文和英文的觸發詞。因為我有時候打中文，有時候打英文。「規劃今天」和「daily planning」都要能觸發同一個 skill。


## 5 種設計模式

Anthropic 從早期使用者中歸納了 5 種常見的 skill 設計方式。

我用自己的 skills 來對照，比較好理解。

### 1. 按步驟執行

最直觀的。步驟 1、步驟 2、步驟 3，照順序做。

我的 `/daily` 就是這種。8 個步驟，順序不能亂——你不能還沒看昨天的 carry-over 就開始規劃今天。

我的 `/wam`（Weekly Accountability Meeting）也是。每週二固定跑一次週會：算分數 → 看落後指標 → 規劃下週 → 更新追蹤表。15 分鐘，一個人的週會。

### 2. 跨工具協作

一個工作流要用到好幾個工具，資料在不同系統之間流動。

我的 `/creative-team` 是最好的例子。寫一篇 Blog，它會先叫 Researcher 去 web search 收集資料，Archivist 去 Obsidian 翻我的舊筆記看有沒有可以引用的，Writer 根據素材寫初稿，Editor 用我的寫作風格指南校稿，最後存到 personal-website 的 blog 目錄。

一個指令，五個工具，四個步驟。

### 3. 反覆打磨

先做一版，檢查品質，有問題就修，再檢查，直到達標。

`/creative-team` 的 Editor 就是做這件事。初稿出來後，它會跑校稿層——簡繁轉換、台灣用語替換、載入寫作風格、套用 5 大內容類型風格、最終品質檢查。

不及格就打回去重寫。

### 4. 看情況選工具

目標一樣，但根據不同條件用不同方式做。

我的 `/seo` skill 會根據查詢的網站不同（freetools.tw、yu-wenhao.com、airesumeadvisor.com），選擇不同的關鍵字策略和競爭分析方式。同一個「做 SEO」的目標，三種不同路徑。

### 5. 嵌入專業知識

不只是工具操作，而是把領域知識寫進去。

我的 `/content` skill 裡面嵌入了整套寫作方法論：Hook-First 方法論、WenHao Style 的定義（短段落 + 思考外顯 + Hook → Story → Offer 結構）、5 類 15+ 種開頭公式、結尾不說教原則。

Claude 不需要「學會寫作」。它只需要讀我寫好的風格指南，然後照做。


## 我的一天，有 skill 和沒有 skill

這是最直觀的對比。

### 沒有 skill 的早上

```
我：幫我規劃今天的工作。
    先讀一下昨天和前天的 daily note，
    路徑是 ~/Cockpit/daily/，
    然後幫我查 WEEKLY_BREAKDOWN...
    對了，personal-brand 和 product-growth 各有一份...
    然後幫我看四個專案的 in-progress 任務...
    路徑分別是 ~/GitHub/azure_container/docs/tasks/...
    還有 Obsidian inbox 也看一下...
    啊對，iCloud 路徑是那個很長的...
    然後跑一下 Panopticon API...
    endpoint 是...
```

每天。

光是把這段貼完就要 2 分鐘。Claude 處理完可能 5 分鐘。如果中間忘了一個步驟，還要補充。

### 有 skill 的早上

```
我：早安
```

Claude 自動跑完全部 8 個步驟。3 分鐘後，daily note 已經建好，任務已經排好，問我：「Vista 的客座電子報今天要開始寫嗎？」

**每天省 5 分鐘。一週省半小時。一個月省 2 小時。**

但真正省的不是時間。是**認知負擔**。我不需要記得流程的每一步，不需要記得每個路徑、每個 API endpoint。那些東西都封裝在 skill 裡了。

我的腦袋只需要做一件事：決定今天先做什麼。


## 從 18 個 skill 學到的事

我現在有 18 個 skills。從每日規劃到 SEO 研究到內容創作到知識歸檔。

但它們不是一次建好的。

最早我只有 `/daily`。而且第一版很爛——步驟不清楚、路徑寫錯、有些情況沒處理到。

Anthropic 在指南裡提到一個建議，我覺得是最有價值的：

> 先在一個具體任務上反覆嘗試，直到 Claude 做對。然後再把成功的方法抽取成 skill。

我的 `/daily` 現在是 v5。中間改了四次。

第一版沒有 Panopticon 整合。第二版加了。第三版發現 Week 進度計算常常出錯，加了明確的計算規則。第四版加了自動觸發——週二提醒跑週會、月初提醒歸檔上月 notes。

每一版都是因為我在使用中發現「這裡不夠好」，然後改進。

**不要一開始就想做一個完美的 skill。先做一個能用的，然後慢慢疊加。**

具體 → 抽象。永遠比反過來有效。


## 這意味著什麼

Skills 本身不難。就是一個 Markdown 檔案加上一些結構。

但它代表的趨勢很重要：**AI 正在從「你每次都要教它」變成「你教一次就好」。**

以前用 AI 像是每次都跟一個新實習生說話。

現在，我有一個訓練好的團隊。`/daily` 是我的行政助理，`/creative-team` 是我的編輯部，`/seo` 是我的 SEO 顧問，`/content` 是我的寫作教練。

它們不會忘記流程、不會漏掉步驟、不會用我不喜歡的格式。

而且這個標準是開放的。Anthropic 把 Agent Skills 做成了開放標準，希望 skill 可以跨平台使用——不只在 Claude 上。

MCP 統一了「工具怎麼連」。
Agent Skills 統一了「工具怎麼用」。

對我來說，這是 AI 從「能用」變成「好用」的那一步。

---

*如果這篇讓你有了想法 — [找我談談怎麼做](/zh-TW/services/)，或[訂閱每週一封信](/zh-TW/)，我固定寫 AI 工作流、和一路上想通的事。*
