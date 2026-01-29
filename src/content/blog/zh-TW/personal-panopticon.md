---
title: "從 Obsidian 到 Claude Code：打造可程式化的人生"
description: "70 萬人看過的 Personal Panopticon 啟發了我建立自己的 AI 系統。三個核心原則：Markdown 優先、API 優先、數據驅動。分享我用 Claude Code 和 Obsidian 打造的個人指揮中心。"
pubDate: 2026-01-14
category: building-products
lang: zh-TW
featured: true
heroImage: /images/blog/personal-panopticon.webp
translationKey: personal-panopticon
relatedPosts: ["12-week-year-guide.md", "ai-goal-management-system.md"]
---

前陣子在 X 上看到一篇文章。70 萬人看過，4000 多人收藏。

作者 Molly Cantillon 用 8 個 Claude Code 管理她的人生：產品、郵件、投資、健康、寫作。每天早上 AI 自動生成 brief，Email 達到 Inbox Zero，甚至找出 $2000 不知道自己在付的訂閱。

她說：「監視塔還是監視塔，但鑰匙在你手上。」

看完之後，我想了很久。不是「哇好厲害」，是想：為什麼她能做到？

## 三個原則

我開始整理自己的系統。發現核心不是「用什麼工具」，是「怎麼選擇」。

有三個原則。

### 原則一：可程式化的基礎設施

什麼叫可程式化？

就是機器能讀、能寫、能操作。

我所有的文件都用 Markdown。純文字、跨平台、永不過時。更重要的是，AI 可以直接讀。

選服務的時候，第一件事看有沒有 API。沒有 API，數據就被困住了。你可以用，但你帶不走。

所以我用 Obsidian 管理知識庫，不用 Notion。Obsidian 的筆記是本地的 .md 檔案。Notion 的筆記在他們的伺服器裡。

自建網站也是這個邏輯。我的 Blog 用 Astro + Markdown。Claude Code 可以直接幫我發文。不用開後台、不用登入、不用複製貼上。

這不是技術潔癖。是為了讓 AI 能幫我做事。

### 原則二：數據驅動決策

這是 Minerva 教我的。

在 Minerva 讀書的時候，每個決策都要問：數據在哪？沒有數據，你在猜。有數據，你在決策。

聽起來很簡單。但做起來很難。因為大部分人的數據散在各處。Google Analytics 一個地方、社群互動另一個地方、產品指標又在另一個地方。

看 Dashboard？太慢了。每天開五個網站，看一堆數字，然後呢？

我想要的是：AI 幫我看完，告訴我「哪裡有問題」。

所以我建了一個叫 Content Discovery 的系統。每天自動抓 Reddit、Hacker News、X 的熱門內容。AI 分析、評分、分類。每天早上，我收到一份 brief。

不是我去找資訊，是資訊來找我。

### 原則三：自動化執行

重複的事不該手動做。

| 手動 | 自動化 |
|------|--------|
| 每天開 10 個網站看新聞 | Cron job 自動抓取 + AI 摘要 |
| 手動發布 Blog | GitHub Actions 自動部署 |
| 手動整理數據 | 腳本定時執行 + 生成報告 |

我的原則：

- 做一次的事，手動做
- 做兩次的事，考慮自動化
- 做三次以上，一定要自動化

時間應該花在決策，不是執行。

## 我正在建的系統

我沒有 Molly 的 8 個 Claude Code。但我開始建立自己的版本。

### Cockpit（個人指揮中心）

```
~/Cockpit/
├── daily/           <- 每日規劃
├── projects/        <- 專案追蹤
├── content/         <- 內容創作
├── inbox/           <- 快速捕捉
└── ideas/           <- 整理過的點子
```

為什麼叫 Cockpit？因為這是我的駕駛艙。

每天早上，我在這裡跟 AI 經理人對齊：昨天完成了什麼、今天要推進什麼。對齊完，再到各個專案去執行。下班前回來更新日誌，把途中的想法丟進 inbox。

全部都是 Markdown，Claude Code 可以直接讀寫。

### Content Discovery（每日 Brief）

自動抓 Reddit、Hacker News、X 熱門內容，AI 分析評分，每天早上生成一份 brief。

GitHub Actions 每天定時跑，我只需要掃一眼「值得關注的」。

### 還沒完成的

誠實說，我還沒做到 Molly 的程度。

- Email 自動化？還在手動
- 財務追蹤？還沒串 API
- 健康數據整合？還沒開始

但這沒關係。系統是慢慢建的，不是一次到位。

## 你可以開始的地方

如果你看到這裡，可能也想試試。

不需要一次建 8 個系統。從一個痛點開始。

問自己三個問題：

1. 我每天重複做什麼？
2. 我花最多時間在找什麼資訊？
3. 我最常「忘記」什麼？

答案就是你的起點。

### 工具建議

| 用途 | 入門 | 進階 |
|------|------|------|
| 筆記 | Obsidian | Obsidian + MCP |
| 自動化 | Zapier / Make | GitHub Actions / Cron |
| AI 助手 | ChatGPT | Claude Code |
| 網站 | Notion Site | Astro + Markdown |

入門的選擇不用想太多。重要的是開始。

## 寫在最後

Molly 的系統很厲害。但她花了好幾個月才建起來。

我的系統還在建。這篇文章不是「我做到了」的分享，是「我正在做」的紀錄。

以前，我們被工具塑造。用什麼 App，就被什麼 App 的邏輯限制。

現在，我們可以塑造自己的工具。

監視塔還是監視塔。但鑰匙，可以在你手上。

---

*延伸閱讀：[Molly Cantillon 原文](https://x.com/mollycantillon/status/2008918474006122936)*

*想看更多這類內容？[訂閱我的電子報](/zh-TW/)*
