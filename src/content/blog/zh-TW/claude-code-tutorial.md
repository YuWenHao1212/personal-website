---
title: "Claude Code 教學：5 分鐘完成安裝與第一個任務"
description: "Claude Code 安裝教學與使用心得。5 分鐘完成安裝和第一個任務。讓 AI 不只對話，還能讀寫檔案、執行指令、串接 API、開發產品。非工程師也能上手。"
pubDate: 2026-01-28
category: building-products
tags: ["claude code 教學", "claude code 使用心得", "claude code 安裝"]
lang: zh-TW
featured: true
heroImage: /images/blog/claude-code-tutorial.webp
translationKey: claude-code-tutorial
relatedPosts: ["nocode-to-ai-coding.md", "ai-coding-arbitrage.md", "ai-goal-management-system.md"]
focus_keyphrase: "claude code 教學"
---

你用過 ChatGPT、用過 Claude。

你知道 AI 很強。

但每次用完，你還是得自己複製貼上、自己整理檔案、自己執行它給的建議。

為什麼？

因為這些 AI 被關在瀏覽器裡——它們不能碰你的電腦，只能在對話框裡回答問題。

Claude Code 不一樣。

它直接跑在你的電腦裡，可以讀寫檔案、執行指令、幫你完成實際的工作。

這篇 Claude Code 教學帶你從安裝到完成第一個任務，只要 5 分鐘。

---

## 什麼是 Claude Code

Claude Code 是 Anthropic 的命令列工具（CLI），讓 AI 直接在你的電腦裡工作。

和網頁版 Claude 最大的差別：網頁版只能「說」，Claude Code 可以「做」。

你告訴它目標，它會自己讀取檔案、執行指令、寫程式、甚至部署到雲端。整個過程你只需要審核和確認，不用自己動手。

這讓它特別適合：
- **批次處理**：一次處理幾百個檔案
- **自動化**：建立每天自動執行的系統
- **開發產品**：從零開始寫程式、建資料庫、部署上線

簡單說，Claude Code 把 AI 從「顧問」變成「執行者」。

## Claude 產品線比較

Anthropic 的 Claude 產品線包括：網頁版、Chrome 擴充、Cowork、Claude Code。先看它們的差別：

| | 網頁版 | Chrome 擴充 | Cowork | Claude Code |
|---|--------|-------------|--------|-------------|
| 環境 | 瀏覽器 | 瀏覽器 | macOS App（隔離環境） | CLI |
| 能做 | 對話 | 操作網頁、填表單 | 讀寫檔案、執行指令 | 讀寫檔案、執行指令 |
| 存取 | 你貼的內容 | 當前網頁 | 你授權的資料夾 | 整台電腦 |
| 執行指令 | ❌ | ❌ | ✅（沙盒內） | ✅ |
| Skills | ❌ | ❌ | ✅ | ✅ |
| MCP Integrations | ✅ | ❌ | ✅ | ✅ |
| Hooks | ❌ | ❌ | ❌ | ✅ |
| 平台 | 瀏覽器 | Chrome | macOS | 跨平台 |

> **資料來源**（查證日期：2026-01-28）：
> - [Claude Code 官方文件](https://docs.anthropic.com/en/docs/claude-code) — Claude Code 功能、Skills、MCP、Hooks
> - [Cowork 官方文件](https://support.claude.com/en/articles/13345190-getting-started-with-cowork)（2026/01）— Cowork 功能、Skills
> - [Claude Blog - Integrations](https://claude.com/blog/integrations)（2026/01）— 網頁版支援 MCP Integrations
> - [First impressions of Claude Cowork](https://simonwillison.net/2026/Jan/12/claude-cowork/) - Simon Willison（2026/01/12）— Cowork 可執行指令（沙盒內）

**名詞解釋**：

- **沙盒（Sandbox）**：一個隔離的安全空間，像是給小孩玩的沙坑——在裡面怎麼玩都可以，但沙子不會跑到外面。Cowork 就是在沙盒裡運作，所以它可以執行指令，但只能動你授權的資料夾，不會動到系統其他地方。安全，但也有限制。

- **執行指令**：讓 AI 在你的電腦裡「動手做」，不只是「用嘴巴回答」。網頁版 Claude 會告訴你怎麼整理照片，但你還是得自己動手。能執行指令的工具（Cowork、Claude Code）就不一樣——你說「把截圖移到 Screenshots 資料夾」，它就真的去移。批次改檔名、壓縮圖片、自動備份，都是這個能力的應用。

- **Skills**：把你的工作方式教給 AI 的文件。可以是 SOP（遇到什麼情況怎麼做）、操作流程（先做 A 再做 B）、或是 best practices（寫文章要符合這些原則）。寫成文件後，AI 就會照著做。等於把你的專業知識、個人偏好都文件化，讓 AI 變成「懂你的助手」。

- **MCP Integrations**：讓 AI 連接其他服務的標準協議。你可能聽過 API——每個服務的 API 都不一樣，要連十個服務就要寫十種串接。MCP 是統一的標準，像 USB-C 一樣，一個介面就能連接 Slack、Google Drive、Notion 等各種工具。對使用者來說，就是「AI 可以直接幫你操作這些服務」。

- **Hooks**：AI 動作前的自動檢查機制。像是門口的感應器——每次 AI 要做某件事之前，Hook 會先檢查。你可以設定規則，例如「刪除檔案前先備份」或「執行指令前先讓我確認」。這是進階功能，用來確保 AI 不會做出你不想要的事。

**Cowork vs Claude Code：沙盒的限制**

Cowork 和 Claude Code 都能執行指令，但 Cowork 跑在隔離環境裡。它可以上網、下載、安裝程式——但都在沙盒內，關掉就沒了。

| | Cowork（沙盒） | Claude Code（本機） |
|---|--------|-------------|
| 整理授權資料夾的檔案 | ✅ | ✅ |
| 上網研究、下載資料 | ✅ | ✅ |
| 安裝軟體到你的電腦 | ❌（只在沙盒內） | ✅ |
| 用你的 SSH key 推 GitHub | ❌（沒有你的憑證） | ✅ |
| 用你的 API keys 串接服務 | ❌（沒有你的憑證） | ✅ |
| 修改系統設定、環境變數 | ❌ | ✅ |

**簡單說**：
- 一次性任務（整理檔案、做研究、寫報告）→ Cowork 就夠了
- 持久性系統（每天自動執行、串接 API、部署上線）→ 用 Claude Code

---

## 什麼時候需要 Claude Code？

**情境一：一句話處理 500 張照片**

你剛從日本回來，拍了 500 張照片，每張 5MB。

想上傳到部落格，但太大了，載入超慢。

一張一張壓縮？光想就累。

用 Claude Code，一句話：

「幫我把這個資料夾的照片全部壓縮到 500KB 以下，保持原本的檔名。」

它會執行終端機指令（就是工程師在黑底白字視窗裡打的那些指令），幾分鐘處理完 500 張。

Cowork 或許也能處理檔案，但 Claude Code 可以做更多——例如把處理完的照片自動上傳到雲端、或是寫一個腳本讓你以後一鍵執行。

**情境二：打造自動化的目標管理系統**

這是我自己的真實案例。

我需要一個系統，把散落在各處的資訊（Google Calendar、Tasks、郵件）整合起來，每天早上自動推送到手機。

網頁版 Claude 可以幫我「規劃」這個系統，但沒辦法幫我「建」出來。

用 Claude Code，我告訴它我要什麼，它就幫我：
- 寫好串接 API 的程式碼
- 建立自動排程
- 部署到雲端，每天早上 6:45 自動執行

現在每天起床，手機就有一則訊息告訴我今天該做什麼。

想看完整的系統怎麼運作，可以參考我的另一篇文章：[AI 目標管理系統](/zh-TW/blog/ai-goal-management-system)。

**情境三：不會寫程式也能開發產品**

你有一個 App 的點子。

以前，你得找工程師、找外包、學寫程式。

現在，你可以用 Claude Code。

告訴它你想要什麼，它會幫你寫程式、建資料庫、部署上線。

我自己就是這樣做的。

用 Claude Code，我花兩天建立了個人網站（是的，你現在看的這個網站）。

還做了一個 <a href="/zh-TW/products/ai-resume-advisor" target="_blank">SaaS 產品</a>和一個 <a href="/zh-TW/products/linkedin-resume-checker" target="_blank">Chrome Extension</a>。

這不是未來，是現在正在發生的事。

**你需要哪一個？**

- 只是想問問題、寫文案 → **網頁版**就夠了
- 想讓 AI 幫你操作網頁、填表單 → **Chrome 擴充**
- 一次性任務（整理檔案、做研究）→ **Cowork**
- 想批次處理、串接 API、開發產品 → **Claude Code**

---

## 安裝與啟用（2 分鐘）

打開終端機（Terminal），貼上這行：

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

不需要額外安裝其他東西，貼上就能用。

安裝完成後，輸入 `claude`，登入你的 Anthropic 帳號。

**注意**：Claude Code 需要付費訂閱。Pro 方案 $20 美元/月，Max 方案 $100 或 $200 美元/月（用量更高）。免費帳號無法使用。

登入後就可以開始使用了。

---

## 第一個任務：統一整理散落各處的截圖

你的截圖可能散落在三個地方：

- 桌面
- 下載
- 文件

用 Claude Code，一句話就能搞定。

在 Claude Code 中輸入：

```
幫我把散落在桌面、下載、文件的截圖統一整理好
```

就這樣。

Claude 會自己決定怎麼做：掃描資料夾、找出截圖、移動、重新命名。

你不需要告訴它每一個步驟，只要說你想要的結果。

幾秒鐘完成，省下你 30 分鐘手動整理的時間。

---

## 使用心得：怎麼跟 Claude Code 溝通

用 Claude Code 最重要的一件事：

**說目標，不說步驟。**

❌ 不要這樣說：「先列出桌面的檔案，然後篩選 .png，然後移動到...」

✅ 這樣說就好：「幫我把截圖整理好。」

你定義目標，AI 負責想辦法。

但這不代表完全放手。

你可以加上範圍（「桌面、下載、文件的截圖」），也可以請 AI 先提方案（「先告訴我你打算怎麼做」），審核後再讓它執行。

你是指揮官，不是打字員。

---

## 下一步

這篇帶你從安裝到完成第一個任務。

Claude Code 還有很多進階用法——Skills、Hooks、MCP 串接——等你熟悉基本操作後再慢慢探索。

---

*延伸閱讀：*

- *[離開工程師 14 年，我用 AI 做出完整產品](/zh-TW/blog/nocode-to-ai-coding/)* — 從 No-Code 到 AI Coding 的轉變
- *[AI 時代的套利機會](/zh-TW/blog/ai-coding-arbitrage/)* — 為什麼現在是學 AI Coding 的最佳時機
- *[AI 目標管理系統](/zh-TW/blog/ai-goal-management-system/)* — 用 Claude Code 打造的實際案例

*想收到更多這類內容？[訂閱電子報](https://yu-wenhao.com/newsletter)*

---

## 相關資源

- [Claude Code 官方文件](https://docs.anthropic.com/en/docs/claude-code)
