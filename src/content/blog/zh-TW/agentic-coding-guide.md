---
title: "Agentic Coding 完全指南：從 Vibe Coding 到 AI 自主開發"
description: "Agentic Coding 是什麼？跟 Vibe Coding 差在哪？這篇完全指南涵蓋定義、工具比較、實戰工作流、Anthropic 2026 趨勢分析，以及如何開始。"
pubDate: 2026-02-11
category: building-products
tags: ["AI", "一人公司", "Claude Code", "agentic coding", "vibe coding", "developer-tools"]
lang: zh-TW
translationKey: agentic-coding-guide
featured: true
draft: true
heroImage: /images/blog/agentic-coding-guide.webp
focus_keyphrase: "agentic coding"
relatedPosts: ["agentic-coding.md", "claude-code-tutorial.md", "nocode-to-ai-coding.md", "ai-coding-arbitrage.md"]
faq:
  - question: "Agentic Coding 是什麼？"
    answer: "Agentic Coding 是一種由 AI Agent 自主規劃、撰寫、測試和修復程式碼的開發方式。開發者設定目標和限制條件，Agent 獨立拆解任務、執行並透過推理-行動-驗證的迴圈持續迭代。"
  - question: "Vibe Coding 和 Agentic Coding 有什麼差別？"
    answer: "Vibe Coding 是對話式的 AI 輔助寫程式，開發者每一步都要引導。Agentic Coding 是目標導向的自主開發，AI Agent 獨立規劃和執行，人類的角色從指揮者轉為監督者。"
  - question: "Agentic Coding 會取代工程師嗎？"
    answer: "不會，但角色會改變。工程師從自己寫程式轉為指揮 AI Agent——更像指揮家而非演奏者。目前開發者有 60% 的工作使用 AI，但只有 0-20% 可以完全交給 AI。"
  - question: "非工程師可以用 Agentic Coding 嗎？"
    answer: "可以。Anthropic 報告顯示 Agentic Coding 正擴展到非技術團隊。Zapier 達成 89% 全公司 AI 採用率。但要上線的產品級應用，仍需要工程專業來把關品質和安全。"
---

60% 的開發者已經在用 AI 寫程式。但能完全把工作交給 AI 的比例？不到 20%。

這個落差，就是 Vibe Coding 和 Agentic Coding 之間的距離。

> 想看 AI 寫程式從自動補全到自主代理的完整故事？請看 [Agentic Coding：從 Vibe Coding 到 AI 自主寫程式的進化](/zh-TW/blog/agentic-coding)——同一主題的敘事觀點版。

這篇指南涵蓋定義、比較、工作流、工具和趨勢——你需要了解的 Agentic Coding 全貌，以及如何開始。

---

## Vibe Coding 是什麼？

2025 年初，Andrej Karpathy 創造了「Vibe Coding」這個詞——憑感覺寫程式。你用自然語言描述想要什麼，AI 產出程式碼，看看能不能跑，不行就再描述一次。不看 diff、不讀程式碼。Accept All。

這個詞迅速爆紅。Collins Dictionary 選它為 2025 年度詞彙。Y Combinator 2025 冬季班有 25% 的新創用 AI 生成了 95% 的程式碼。

但問題很快浮現。CSO Online 研究發現 5 個 AI 程式碼生成工具產出了 69 個安全漏洞。Wiz 報告顯示 20% 的 AI 生成應用有嚴重安全問題。

Vibe Coding 適合原型和週末 side project。在你在乎品質、安全和可維護性的場景，它力有未逮。

---

## Agentic Coding 是什麼？

如果 Vibe Coding 是「用對話讓 AI 幫你寫程式」，Agentic Coding 就是「設定目標，讓 AI Agent 自主完成整個開發流程」。

差別不是程度，而是本質。

想了解 AI 寫程式從自動補全到對話再到自主代理的三階段演化完整故事，請看 [Agentic Coding：從 Vibe Coding 到 AI 自主寫程式的進化](/zh-TW/blog/agentic-coding)。

### Agentic Coding 的五大核心特徵

1. **目標導向**：你設定意圖，不是逐步指令
2. **自主迴圈**：Agent 自行規劃、執行、驗證、修正
3. **工具使用**：Agent 可以讀寫檔案、執行指令、呼叫 API、搜尋程式庫
4. **多 Agent 協作**：複雜任務由多個專業 Agent 平行處理
5. **人類監督**：Agent 知道什麼時候該停下來問你

### Agentic Coding 怎麼運作

```
意圖（Intent）
  -> 規格（驗收標準、限制條件）
  -> 計畫（任務圖、風險標記）
  -> 實作（程式碼變更）
  -> 驗證（測試、lint、安全掃描）
  -> 文件（changelog、runbook）
  -> 審查（人工 + 自動化）
  -> 發布
  -> 監控
  -> 迭代
```

這個流程來自 Anthropic 2026 年官方報告，他們稱之為 **Agentic SDLC**——Agent 驅動的軟體開發生命週期。

### Karpathy 的最新觀點：Agentic Engineering

2026 年 2 月 4 日，Karpathy 提出了進化版的概念：

> "Agentic"——因為 99% 的時間你不是自己寫程式碼，而是指揮 Agent 來寫，你負責監督。"Engineering"——強調這是一門有藝術、有科學、需要專業技能的工作。

Vibe Coding 是好玩的週末拋棄式專案。Agentic Engineering 是專業工作——以監督者的角色指揮 Agent，獲得槓桿而不犧牲品質。

---

## Vibe Coding vs Agentic Coding：完整比較

| 面向 | Vibe Coding | Agentic Coding |
|------|-------------|----------------|
| **本質** | 憑感覺的對話式 AI 寫程式 | 目標導向的自主代理 |
| **人的角色** | 持續互動的指揮者 | 設定目標的監督者 |
| **自主性** | 低：每一步都需要引導 | 高：自主拆解與執行 |
| **工作流** | 看到 → 描述 → 跑 → 貼錯誤訊息 | 設目標 → Agent 規劃 → 自動執行 → 回報 |
| **品質控制** | 「Accept All」，跳過 diff | Agent 自我測試、自我修正 |
| **適合場景** | 原型、週末專案、學習 | 企業自動化、大型重構、產品開發 |
| **代表工具** | Cursor Composer、Lovable、Bolt.new | Claude Code、Devin、SWE-agent |
| **技術門檻** | 很低（非工程師也能用） | 中等（需要理解架構才能監督） |

### 什麼時候用哪個？

**用 Vibe Coding 的時機：**
- 快速驗證一個想法是否可行
- 不需要長期維護的週末 side project
- 學習新技術——先跑起來再說
- 做 demo 或原型給人看

**用 Agentic Coding 的時機：**
- 要上線的產品
- 需要有測試、安全、可維護的程式碼
- 大規模重構或技術債清理
- 團隊協作的專案
- 任何可能半夜三點叫你起來修 bug 的系統

### 我的實際經驗

兩種我都用。[個人網站](/)的小功能，我用 Vibe Coding——快速、直覺、夠用就好。但 [AIResumeAdvisor](https://airesumeadvisor.com)（SaaS 產品），我用 Agentic Coding——每個功能都經過規劃、測試、審查。

差別在哪？用 Vibe Coding 做的東西，我不太敢讓別人用。用 Agentic Coding 做的東西，我有信心收費。

想看我的 PM 背景如何塑造 Agentic Coding 工作流的完整故事，請看 [Agentic Coding：從 Vibe Coding 到 AI 自主寫程式的進化](/zh-TW/blog/agentic-coding)。

---

## 我的 Agentic Coding 實戰工作流

我每天用 Claude Code 開發產品。流程已經穩定下來。

### 日常開發流程

```
意圖（想做什麼）
  -> 計畫（用 Plan Mode 設計方案）
  -> Agent 執行（Agent 自主運作）
  -> 審查（我看 diff）
  -> 測試（Agent 跑測試，我驗證）
  -> 合併（進主分支）
```

這不是理論，是我每天在做的事。

### 七階段工作流

更完整的版本，拆成七個階段：

**階段 1：腦力激盪**

先想清楚要做什麼。不要急著寫程式碼。用對話釐清需求、探索可能的方案、確認技術限制。

**階段 2：Worktree**

用 Git Worktree 建立隔離的工作空間。就算 Agent 搞壞了什麼，也不會影響主分支。一個功能一個 worktree，乾淨隔離。

**階段 3：計畫**

進入 Plan Mode。Agent 分析程式庫、理解現有架構，提出實作計畫。我審核計畫、確認方向後才開始。

這一步是整個流程中最重要的。計畫錯了，後面再快都是白做。

**階段 4：執行**

Agent 按計畫執行。寫程式碼、建檔案、改設定。這個階段 Agent 有很大的自主權，但遇到模糊的地方會暫停來問我。

**階段 5：TDD（測試驅動開發）**

寫測試、跑測試、修失敗的測試。Agent 自己跑這個迴圈，直到所有測試通過。

**階段 6：審查**

我審查所有變更。看 diff、驗邏輯、檢查安全。有問題的話 Agent 修完再送。

**階段 7：收尾**

合併分支、清理 worktree、更新文件。完成。

### 多 Agent 模式

複雜任務我會讓多個 Agent 平行工作。

例如重構一個模組：
- Agent A 負責寫新實作
- Agent B 負責寫測試
- Agent C 負責更新文件

三個 Agent 獨立工作，最後合併結果。這就是 Anthropic 報告說的 **Multi-Agent Systems**——57% 的組織已經在用這個模式。

### 一個關鍵的思維轉變

Agentic Coding 最重要的事：**你不是在寫程式碼，你是在定義和驗收交付物。**

以前：80% 的時間寫程式碼，20% 想設計。

現在反過來。80% 的時間想要做什麼、怎麼驗證、限制條件是什麼。20% 的時間審查 Agent 的產出。

寫程式碼的部分？Agent 做。

---

## 2026 年 Agentic Coding 關鍵趨勢

Anthropic 在 2026 年 1 月 21 日發布了 *2026 Agentic Coding 趨勢報告*——目前最全面的 Agentic Coding 產業分析。核心論點：軟體開發正在經歷自 GUI 以來最重大的轉型。

以下是八大趨勢。

### 基礎建設

**趨勢 1：Agentic SDLC**——開發生命週期從傳統的循序移交轉為 Agent 驅動的流暢循環。Augment Code 幫助企業將 4-8 個月的專案壓縮到兩週。

**趨勢 2：多 Agent 系統**——單一 Agent 演化為協作團隊。57% 的組織已部署多步驟 Agent 工作流，使用分層編排架構——協調者 Agent 分配子任務給專家 Agent 平行執行。

**趨勢 3：長時間運行 Agent**——Agent 從分鐘級任務擴展到連續工作數天。Rakuten 工程師讓 Claude Code 在 1,250 萬行程式碼庫中自主工作 7 小時，達到 99.9% 準確率。

### 能力擴展

**趨勢 4：規模化監督**——隨著 AI 生成的程式碼增加，人類無法逐行審查。解法：風險分層——低風險自動合併、中風險需人工核准、高風險需多人審查。開發者有 60% 的工作使用 AI，但只有 0-20% 可以完全委託。

**趨勢 5：新場域與新使用者**——Agentic Coding 擴展到 IDE 之外。Apple 的 Xcode 26.3 原生整合 Claude Agent SDK 和 OpenAI Codex。法律平台 Legora 讓律師不需要工程背景就能建立自動化工作流。

### 產業影響

**趨勢 6：經濟效益與生產力**——約 27% 的 AI 輔助工作是「以前不會做的事」——修小問題、做錦上添花的工具、過去成本太高不值得做的探索性工作。TELUS 靠 13,000+ 客製 AI 方案節省了 50 萬+ 小時。

**趨勢 7：非技術使用案例**——Zapier 達到 89% 全公司 AI 採用率，部署了 800+ 內部 Agent。Anthropic 自己的法務團隊將行銷審查時間從 2-3 天縮短到 24 小時，全由律師操作。

**趨勢 8：安全優先架構**——Agentic Coding 讓能力普及化，但同樣的能力也能被攻擊者利用。安全必須從第一天就嵌入：最小權限存取、網路出口控制、密鑰衛生、策略即程式碼、不可變更的稽核日誌。

### 模型軍備競賽

2026 年 2 月 5 日，Anthropic 發布 Claude Opus 4.6（Terminal-Bench 65.4%、100 萬 token 上下文視窗、Agent Teams），OpenAI 幾乎同步發布 GPT-5.3-Codex——顯示 Agentic Coding 的基礎設施正以前所未有的速度演進。

### 不能忽視的風險：技能退化

Anthropic 的研究發現，依賴 AI 助手的開發者在理解力測試中得分低了 **17%**。核心矛盾：當企業推動更多 AI 寫程式，如果人類技能因此退化，誰來驗證和除錯 AI 寫的程式碼？「監督者」的角色需要足夠的技術判斷力才能勝任。

### 市場數據一覽

| 指標 | 數據 |
|------|------|
| Claude Code 年營收 | ~11 億美元（上線不到一年） |
| Claude Code 在 GitHub 公開 commit 佔比 | 4%，年底預估 20%+ |
| Cursor 估值 | 293 億美元（100 萬+ DAU） |
| Cursor 年營收 | 10 億美元（SaaS 史上最快） |
| Devin (Cognition) 估值 | 102 億美元 |
| Lovable 估值 | 66 億美元（8 個月達 1 億美元年營收） |
| AI Agent 2030 年市場規模 | 526.2 億美元（CAGR 46.3%） |
| GitHub Copilot 用戶數 | 2,000 萬+ |

---

## 如何開始 Agentic Coding

### 第一步：選擇工具

| 工具 | 類型 | 強項 | 最適合 |
|------|------|------|--------|
| **Claude Code** | CLI Agent | 最強 agentic 能力，Terminal-Bench 第一 | 偏好 CLI、進階開發者 |
| **Cursor** | IDE（VS Code 分支）| 最佳編輯器體驗，100 萬 DAU | 偏好 GUI、日常開發 |
| **GitHub Copilot** | IDE 擴充套件 | 最廣整合、2,000 萬用戶 | 已在用 VS Code 的團隊 |
| **Devin** | 全自主 Agent | 可獨立完成完整任務 | 想最大程度委託的團隊 |
| **Xcode + Claude** | IDE 整合 | 原生 Apple 生態支援 | iOS/macOS 開發者 |

我用 Claude Code。原因很簡單：它的 agentic 能力目前最強，CLI 介面讓你對整個過程有完整的掌控和可見性。

-> 詳細的工具實測比較文章即將推出。

### 第二步：建立環境

Agentic Coding 的效果取決於你給 Agent 多少上下文。

最重要的設定：**CLAUDE.md**（或你工具的對應設定檔）。

這是放在專案根目錄的檔案，告訴 Agent 你的專案結構、技術棧、程式碼風格和工作流慣例。Agent 每次啟動都會讀這個檔案。

把它想成你剛招的新工程師的 onboarding 文件。

好的 CLAUDE.md 包含：
- 專案結構和技術棧
- 命名慣例和程式碼風格
- 開發工作流（分支策略、commit 慣例）
- 常用指令（build、test、deploy）
- 重要的架構決策和限制

-> 完整的 CLAUDE.md 設定指南也即將推出。

### 第三步：你的第一個 Agentic Workflow

從小處開始。

1. 在現有專案中找一個小改動（修 bug、加小功能）
2. 不要告訴 Agent 怎麼做——描述你想達成什麼
3. 讓 Agent 先做計畫，你審核計畫
4. 計畫看起來沒問題，讓 Agent 執行
5. 審查結果、跑測試

第一次可能會覺得比自己做還慢。這很正常。

重點不是速度，而是建立「設定目標 → Agent 規劃 → 執行 → 人類審查」的肌肉記憶。

一旦這個迴圈建立起來，效率會複利成長。

-> 完整的步驟教學即將在實戰指南中推出。

---

## FAQ

### Agentic Coding 會取代工程師嗎？

不會，但角色會改變。

Anthropic 的報告很明確：工程價值正從「寫程式碼」轉向「架構設計、系統設計和策略決策」。更像指揮家而非演奏者。

60% 的工作使用 AI，但只有 0-20% 可以完全委託。剩下的 80% 需要人類的監督、判斷和領域專業。

被取代的不會是工程師，而是不用 AI 的工程師。

### Vibe Coding 和 Agentic Coding 哪個好？

不是二選一。

Vibe Coding 像開自排車——簡單、直覺、誰都能開。Agentic Coding 像有自動駕駛功能的手排車——控制更多，但你得知道什麼時候該介入。

做原型？Vibe Coding。
做產品？Agentic Coding。

最強的開發者兩種都用，看情境切換。

### 非工程師可以用 Agentic Coding 嗎？

可以，而且已經在發生了。

Anthropic 報告的趨勢 7 直接回答了這個問題。Zapier 的 89% 全公司 AI 採用包含非工程團隊。Anthropic 自己的法務團隊用 Claude Code 做了自助工具。

但有個重要前提：**產品級應用仍需要工程專業來把關品質和安全。**

非工程師可以用 Agentic Coding 做內部工具和自動化。但要上線給使用者的產品，你需要有技術背景的人做品質保證。

### Agentic Coding 安全嗎？

Agent 的安全性取決於你給它的權限和監督。

Anthropic 報告的趨勢 8 列出了五個防護措施：
1. 最小權限工具存取
2. 網路出口控制
3. 密鑰衛生（短期 token、遮蔽日誌）
4. 策略即程式碼
5. 不可變更的稽核日誌

此外，OWASP 已發布 LLM App Top 10，涵蓋 Agent 特有的威脅，包括提示注入、資料外洩和供應鏈攻擊。

安全不是二元選擇，而是需要持續投入的工程實踐。

---

## 下一步：開始你的第一個 Agentic Workflow

看完這篇，建議的行動路徑：

1. **安裝工具**：推薦從 [Claude Code](/zh-TW/blog/claude-code-tutorial) 開始——agentic 能力最完整
2. **找一個小任務**：在現有專案中挑一個 bug 修復或小功能
3. **練習「設定目標」而非「寫指令」**：告訴 Agent「我要這個按鈕點擊後顯示確認對話框」，而不是「請在 onClick handler 加 confirm()」
4. **審查、審查、再審查**：看 diff、跑測試、理解 Agent 做了什麼

Agentic Coding 的門檻不在技術，而在思維轉變——從「我寫程式碼」到「我定義和驗收交付物」。

---

我相信在 AI 時代，一個人可以打造一間公司。我正在用自己的旅程證明這件事——從產品開發到行銷成長到生活管理，全部一個人。每一步怎麼做的都寫進我的電子報。[訂閱](/zh-TW/)跟著我一起走。

---

## 延伸閱讀

- [Agentic Coding：從 Vibe Coding 到 AI 自主寫程式的進化](/zh-TW/blog/agentic-coding)——AI 寫程式演化的敘事觀點版
- [Claude Code 教學：5 分鐘完成安裝與第一個任務](/zh-TW/blog/claude-code-tutorial)
- [從 No-Code 到 AI 寫程式：一個 PM 的轉型](/zh-TW/blog/nocode-to-ai-coding)
- [AI 寫程式套利：做以前做不到的事](/zh-TW/blog/ai-coding-arbitrage)
