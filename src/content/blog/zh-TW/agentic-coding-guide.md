---
title: "Agentic Coding 完全指南：從 Vibe Coding 到 AI 自主寫程式的進化"
description: "Agentic Coding 是什麼？和 Vibe Coding 差在哪？這篇完全指南涵蓋定義、工具比較、實戰工作流、Anthropic 2026 趨勢解讀，帶你從概念到實踐。"
pubDate: 2026-02-11
category: building-products
tags: ["AI", "一人公司", "Claude Code", "agentic coding", "vibe coding", "developer-tools"]
lang: zh-TW
translationKey: agentic-coding-guide
draft: true
featured: true
heroImage: /images/blog/agentic-coding-guide.webp
focus_keyphrase: "agentic coding"
relatedPosts: ["claude-code-tutorial.md", "nocode-to-ai-coding.md", "ai-coding-arbitrage.md"]
faq:
  - question: "Agentic Coding 是什麼？"
    answer: "Agentic Coding 是由自主 AI Agent 來規劃、撰寫、測試、修正程式碼的開發方法。開發者設定目標後，Agent 自行拆解任務並執行，形成推理、行動、驗證的自主迴圈。"
  - question: "Vibe Coding 和 Agentic Coding 有什麼差別？"
    answer: "Vibe Coding 是透過自然語言對話讓 AI 寫程式，開發者持續引導每一步；Agentic Coding 則是設定目標後讓 AI Agent 自主完成，開發者角色從指揮者轉為監督者。"
  - question: "Agentic Coding 會取代工程師嗎？"
    answer: "不會取代，但會改變角色。工程師從寫程式碼轉為協調 AI Agent，更像指揮家而非演奏者。目前開發者 60% 工作使用 AI，但僅 0-20% 可完全委派。"
  - question: "非工程師可以用 Agentic Coding 嗎？"
    answer: "可以。Anthropic 報告顯示 agentic coding 正擴展到非技術團隊。Zapier 全組織 89% AI 採用率就是例證。但生產級應用仍需要工程背景來監督品質和安全。"
---

60% 的開發者已經在用 AI 寫程式。

但能完全放手讓 AI 自己來的？不到 20%。

這個落差，就是 Vibe Coding 和 Agentic Coding 的距離。

一年前，Andrej Karpathy 隨手發了一則推文，創造了「Vibe Coding」這個詞。一年後，他自己說這個詞不夠用了——2026 年 2 月，他提出了新概念：**Agentic Engineering**。

這篇文章，從 Vibe Coding 的起點開始，帶你走到 Agentic Coding 的前沿。

不只是定義和比較。還有我每天用 Claude Code 做產品開發的真實工作流、Anthropic 官方趨勢報告的深度解讀、以及具體的入門路徑。

---

## Vibe Coding 是什麼？

2025 年 2 月 2 日，前 Tesla AI 負責人 Andrej Karpathy 在 X 上發了一則推文。

> "There's a new kind of coding I call 'vibe coding', where you fully give in to the vibes, embrace exponentials, and forget that the code even exists."

這則推文被看了 450 萬次。

「Vibe Coding」——憑感覺寫程式。你用自然語言告訴 AI 你想要什麼，AI 產出程式碼，你看看結果對不對，不對就再說一次。

整個流程大概是這樣：

1. 看到問題或想法
2. 用自然語言描述給 AI
3. AI 產出程式碼
4. 跑跑看，能動就好
5. 不能動？複製錯誤訊息貼回去

不看 diff。不讀程式碼。Accept All。

Collins Dictionary 把 Vibe Coding 選為 2025 年度詞彙。Y Combinator 2025 冬季班有 25% 的新創公司用 AI 生成了 95% 的程式碼。Lovable 在 8 個月內達到 1 億美元 ARR。

聽起來很美好。

但問題很快浮現。

CSO Online 的研究顯示，5 個 AI 程式碼生成工具產出了 69 個安全漏洞。Wiz 的報告指出，20% 的 AI 生成應用存在嚴重安全問題。

Vibe Coding 最適合的場景：原型驗證、週末 side project、學習和教育。

它不適合的場景：任何你在乎品質、安全、和長期維護的東西。

這就是問題所在——大部分有價值的軟體，都屬於後者。

---

## Agentic Coding 是什麼？

如果 Vibe Coding 是「對話式地讓 AI 幫你寫程式」，Agentic Coding 就是「設定目標後，讓 AI Agent 自主完成整個開發流程」。

差別不只是程度，而是本質上的不同。

### 從 Autocomplete 到 Agent：三個階段

AI 輔助寫程式經歷了三個階段：

**第一階段：Autocomplete（自動補全）**

2021 年的 GitHub Copilot。你打字，AI 猜你下一行要寫什麼。像智慧型手機的自動完成，但用在程式碼上。

人類主導一切。AI 只是打字加速器。

**第二階段：Copilot / Chat（對話式協作）**

2023-2025 年的主流模式。你描述需求，AI 生成一段程式碼，你審核、修改、再描述。Cursor Composer、ChatGPT Canvas 都屬於這個階段。

人類還是指揮者。每一步都需要你引導。

這就是 Vibe Coding 的運作模式。

**第三階段：Agent（自主代理）**

2025 年底至 2026 年。你定義目標和限制條件，AI Agent 自行規劃任務、撰寫程式碼、執行測試、發現問題、修正錯誤。整個過程形成一個自主迴圈：**推理 → 行動 → 觀察 → 再推理**。

人類的角色從「指揮者」變成「監督者」。

這就是 Agentic Coding。

### Agentic Coding 的五個核心特徵

1. **目標驅動**：你設定意圖（intent），不是逐步指令
2. **自主迴圈**：Agent 自己規劃、執行、驗證、修正
3. **工具使用**：Agent 可以讀寫檔案、執行命令、呼叫 API、搜尋程式碼庫
4. **多 Agent 協作**：複雜任務由多個專業化 Agent 平行處理
5. **人類監督**：Agent 知道什麼時候該停下來問你

### Agentic Coding 的運作流程

```
意圖（Intent）
  → 規格定義（Spec：驗收標準、限制條件）
  → 任務規劃（Plan：任務圖、風險標記）
  → 實作（Implement：程式碼變更）
  → 驗證（Verify：測試、lint、安全掃描）
  → 文件（Docs：changelog、runbook）
  → 審查（Review：人類 + 自動化）
  → 部署（Release）
  → 監控（Monitor）
  → 迭代（Iterate）
```

這個流程來自 Anthropic 2026 年的官方報告，他們稱之為 **Agentic SDLC**——Agent 驅動的軟體開發生命週期。

### Karpathy 的最新觀點：Agentic Engineering

2026 年 2 月 4 日，Karpathy 在 X 上提出了 Vibe Coding 的進化版概念：

> "Agentic" because the new default is that you are not writing the code directly 99% of the time, you are orchestrating agents who do and acting as oversight. "Engineering" to emphasize that there is an art & science and expertise to it.

「Agentic」——因為 99% 的時間你不是自己寫程式碼，而是指揮 Agent 來寫，你負責監督。「Engineering」——強調這是一門有藝術、有科學、需要專業技能的工作。

用他自己的話來對比：

> "Vibe coding is fun throwaway weekend projects. Agentic engineering is professional work — orchestrating agents as an overseer, gaining leverage without compromising."

Vibe Coding 是有趣的週末拋棄式專案。Agentic Engineering 是專業工作——以監督者的身份指揮 Agent，在不妥協品質的前提下獲得槓桿。

---

## Vibe Coding vs Agentic Coding：完整比較

| 維度 | Vibe Coding | Agentic Coding |
|------|-------------|----------------|
| **本質** | 憑感覺、對話式讓 AI 寫 | 目標驅動的自主 Agent |
| **人類角色** | 持續互動的指揮者 | 設定目標後的監督者 |
| **自主程度** | 低：每步需引導 | 高：自主分解並執行 |
| **工作流** | 看 → 說 → 跑 → 複製貼上 | 設目標 → Agent 規劃 → 自動執行 → 報告 |
| **品質控制** | 「Accept All」不看 diff | Agent 自行測試並修正 |
| **適用場景** | 原型、週末專案、教育 | 企業級自動化、大型重構、產品開發 |
| **代表工具** | Cursor Composer, Lovable, Bolt.new | Claude Code, Devin, SWE-agent |
| **技術門檻** | 極低（非工程師可用） | 中等（需理解架構來監督） |

### 什麼時候用哪種？

**用 Vibe Coding**：
- 快速驗證一個想法能不能動
- 週末 side project，不在乎長期維護
- 學習新技術，先跑起來再說
- 做 demo 或 prototype 給人看

**用 Agentic Coding**：
- 要上線的產品
- 需要測試、安全、可維護的程式碼
- 大型重構或技術債清理
- 多人協作的專案
- 任何你會在半夜被叫起來修 bug 的系統

### 我的實際經驗

我兩種都用。

做[個人網站](/)的時候，很多小功能我會用 Vibe Coding 的方式——描述一下想要的效果，看結果，微調。快速、直覺、夠用。

但做 [AIResumeAdvisor](https://airesumeadvisor.com)（一個 SaaS 產品）的時候，我用的是 Agentic Coding。後端 API、前端應用、Landing Page，三個 Git repo，每個功能都經過規劃、測試、審查的流程。

差別在哪？

Vibe Coding 做出來的東西，我不太敢讓別人用。Agentic Coding 做出來的，我敢收錢。

---

## 我的 Agentic Coding 實戰工作流

每天用 Claude Code 做產品開發，我的流程已經固定下來。

### 日常開發流程

```
Intent（想做什麼）
  → Plan（用 plan mode 規劃）
  → Agent Execution（Agent 自動執行）
  → Review（我審查 diff）
  → Test（Agent 跑測試、我確認）
  → Merge（合進主分支）
```

這不是理論。是我每天在做的事。

### 七階段工作流

更完整的版本，我把它拆成七個階段：

**Phase 1: Brainstorm**

先想清楚要做什麼。不急著寫程式碼。用對話釐清需求、探索可能的方案、確認技術限制。

**Phase 2: Worktree**

用 Git Worktree 建立獨立的工作空間。這樣即使 Agent 搞砸了，也不會影響主分支。每個功能一個 worktree，乾淨隔離。

**Phase 3: Plan**

進入 Plan Mode。Agent 分析程式碼庫、理解現有架構、提出實作計畫。我審核計畫，確認方向對了再開始。

這一步是整個流程中最重要的。計畫錯了，後面做得再快也是浪費。

**Phase 4: Execute**

Agent 按照計畫執行。寫程式碼、建立檔案、修改設定。這個階段 Agent 有很大的自主權，但遇到模糊的地方會停下來問我。

**Phase 5: TDD（測試驅動開發）**

寫測試、跑測試、修復失敗的測試。Agent 自己跑這個迴圈，直到所有測試通過。

**Phase 6: Review**

我審查所有變更。看 diff、確認邏輯、檢查安全性。如果有問題，Agent 修正後重新提交。

**Phase 7: Finish**

合併分支、清理 worktree、更新文件。收工。

### Multi-Agent 模式

複雜任務我會用多個 Agent 平行工作。

比如重構一個模組：
- Agent A 負責寫新的實作
- Agent B 負責寫測試
- Agent C 負責更新文件

三個 Agent 各自獨立工作，最後合併結果。這就是 Anthropic 報告中說的 **Multi-Agent Systems**——57% 的組織已經在用這種模式。

### 一個關鍵心態

Agentic Coding 最重要的一件事：**你不是在寫程式碼，你是在定義和驗收**。

以前花 80% 時間寫程式碼、20% 時間想設計。

現在反過來。80% 時間想清楚要做什麼、怎麼驗收、有什麼限制條件。20% 時間審查 Agent 的產出。

寫程式碼的部分？Agent 做。

---

## 2026 年 Agentic Coding 關鍵趨勢

Anthropic 在 2026 年 1 月 21 日發布了 *2026 Agentic Coding Trends Report*。這是目前最完整的 Agentic Coding 產業分析。

報告的核心論述：軟體開發正經歷自 GUI 以來最重大的變革。

以下是八大趨勢的重點整理。

### Foundation（結構性轉變）

**趨勢 1：Agentic SDLC**

軟體開發生命週期從傳統的循序交接，轉變為 Agent 驅動的流動循環。

Augment Code（Claude 驅動）讓一家企業把 4-8 個月的專案壓縮到兩週完成。

**趨勢 2：Multi-Agent Systems**

單一 Agent 進化為多 Agent 協作團隊。57% 的組織已經部署了多步驟 Agent 工作流。

Anthropic 推薦的模式是 **Hierarchical Orchestration**——一個協調者 Agent 將子任務分配給專家 Agent，各自平行工作。

**趨勢 3：Long-Running Agents**

Agent 從分鐘級任務擴展到連續數天自主工作。

Rakuten 的工程師讓 Claude Code 在一個 1,250 萬行的程式碼庫中自主工作了 7 小時，達到 99.9% 的數值精確度。

### Capabilities（能力擴展）

**趨勢 4：Scaled Oversight（規模化監督）**

AI 生成的程式碼越來越多，人類不可能每一行都看。解法是風險分級：低風險自動合併、中風險需要人類核准、高風險需要多人審查加威脅建模。

關鍵數據：開發者在 60% 的工作中使用 AI，但能「完全委派」的僅 0-20%。

**趨勢 5：New Surfaces & Users**

Agentic Coding 擴展到傳統 IDE 之外。

2026 年 2 月 3 日，Apple 發布 Xcode 26.3，原生整合 Anthropic Claude Agent SDK 和 OpenAI Codex。開發者可以直接在 Xcode 裡使用 agentic coding，不用切換工具。

法律平台 Legora 讓律師無需工程專業就能建立自動化流程。Agentic Coding 不再只屬於工程師。

### Impact（商業影響）

**趨勢 6：Economics & Productivity**

生產力提升不只是「每個任務更快」，而是「產出總量的淨增加」。

約 27% 的 AI 輔助工作是以前「不會去做的任務」——修復 papercuts（小瑕疵）、建立 nice-to-have 的工具、以前手動做不划算的探索性工作。

TELUS 建立了超過 13,000 個自訂 AI 解決方案，累計節省 500,000+ 小時。

**趨勢 7：Non-Technical Use Cases**

Zapier 全組織達到 89% AI 採用率，部署了 800+ 個內部 Agent。設計團隊在客戶訪談期間即時做原型。

Anthropic 自己的法務團隊也在用——行銷審查時間從 2-3 天縮短到 24 小時，完全由非工程背景的律師操作。

**趨勢 8：Security-First Architecture**

Agentic Coding 是雙面刃。它民主化了安全知識，但同樣的能力也讓攻擊者受益。

需要從設計階段就嵌入安全架構：最小權限工具存取、網路出口控制、密鑰衛生、Policy-as-code、不可變的稽核日誌。

### 模型軍備競賽

2026 年 2 月 5 日，Anthropic 發布 Claude Opus 4.6，OpenAI 幾乎同時發布 GPT-5.3-Codex。

Opus 4.6 的亮點：
- Terminal-Bench 2.0 得分 65.4%——史上最高
- 1M token context window（Beta）
- 128K max output tokens
- **Agent Teams**：多個 Agent 自動分工協作

GPT-5.3-Codex 偏重自主軟體工程執行，Opus 偏重長 context 推理和企業工作流。

兩家公司在同一天發布下一代模型，說明 Agentic Coding 的基礎設施正在以前所未有的速度演進。

### 不能忽略的風險：技能退化

Anthropic 自己的研究（2026 年 1 月 29 日發表）發現，依賴 AI 助手的開發者在理解力測試中得分比手動編碼者**低 17%**。除錯技能下降最為嚴重。

核心矛盾：當公司轉向更多 AI 編碼 + 人類監督時，如果人類的技能被 AI 抑制，誰來驗證和除錯 AI 寫的程式碼？

這不是要反對使用 AI。而是提醒：Agentic Coding 的「監督者」角色，前提是你要有足夠的技術判斷力。

### 市場數據一覽

| 指標 | 數據 |
|------|------|
| Claude Code ARR | ~$11 億（上線不到一年） |
| Claude Code 佔 GitHub 公開 commit | 4%，預計年底 20%+ |
| Cursor 估值 | $293 億（100 萬+ DAU） |
| Cursor ARR | $10 億（SaaS 史上最快） |
| Devin (Cognition) 估值 | $102 億 |
| Lovable 估值 | $66 億（8 個月達 $1 億 ARR） |
| AI Agent 市場 2030 | $526.2 億（CAGR 46.3%） |
| GitHub Copilot 使用者 | 2,000 萬+ |

---

## 如何開始 Agentic Coding

### Step 1：選擇工具

目前主流的 agentic coding 工具：

| 工具 | 類型 | 特色 | 適合誰 |
|------|------|------|--------|
| **Claude Code** | CLI Agent | 最強 agentic 能力、Terminal-Bench #1 | 喜歡命令列、重度開發者 |
| **Cursor** | IDE（VS Code fork） | 最好的編輯器體驗、100 萬 DAU | 偏好圖形介面、日常開發 |
| **GitHub Copilot** | IDE 外掛 | 最廣泛的整合、2,000 萬使用者 | 已在用 VS Code 的團隊 |
| **Devin** | 全自主 Agent | 可以獨立處理完整任務 | 想要最大程度委派的團隊 |
| **Xcode + Claude** | IDE 整合 | Apple 生態系原生支援 | iOS/macOS 開發者 |

我個人用 Claude Code。原因很簡單：它是目前 agentic 能力最強的工具，而且 CLI 介面讓你對整個過程有完整的控制和可見性。

→ 詳細的工具比較和實測，之後會有一篇專文。

### Step 2：設定工作環境

Agentic Coding 的效果取決於你給 Agent 多少 context。

最重要的設定：**CLAUDE.md**（或對應工具的設定檔）。

這是一份放在專案根目錄的文件，告訴 Agent 你的專案結構、技術棧、程式碼風格、工作流程規範。Agent 每次啟動時都會讀取這份文件。

想像你聘了一個新工程師。CLAUDE.md 就是給他的 onboarding 文件。

好的 CLAUDE.md 包含：
- 專案結構和技術棧
- 命名規則和程式碼風格
- 開發流程（branching strategy、commit convention）
- 常用指令（build、test、deploy）
- 重要的架構決策和限制條件

→ CLAUDE.md 的完整設定教學，之後也會有專文。

### Step 3：第一個 Agentic Workflow

從小開始。

1. 找一個現有專案中的小改動（修一個 bug、加一個小功能）
2. 不要直接告訴 Agent 怎麼做，而是描述你想達成什麼
3. 讓 Agent 先規劃，你審核計畫
4. 計畫 OK 後讓 Agent 執行
5. 審查結果、跑測試

第一次可能會覺得比自己做還慢。這很正常。

重點不是速度，而是建立「設定目標 → Agent 規劃 → 執行 → 人類審查」的肌肉記憶。

一旦這個迴圈建立起來，效率會以複利的方式成長。

→ 完整的 step-by-step workflow 教學，之後會發一篇實戰指南。

---

## FAQ

### Agentic Coding 會取代工程師嗎？

不會取代，但會改變角色。

Anthropic 的報告說得很清楚：工程師的價值正在從「寫程式碼」轉向「架構設計、系統設計、策略決策」。更像指揮家而非演奏者。

60% 的工作使用 AI，但只有 0-20% 能完全委派。剩下的 80% 需要人類的監督、判斷、和專業知識。

會被取代的不是工程師，而是不會用 AI 的工程師。

### Vibe Coding 和 Agentic Coding 哪個好？

不是非此即彼。

Vibe Coding 像開自排車——簡單直覺，任何人都能上手。Agentic Coding 像帶著自動駕駛功能的手排車——有更多控制權，但需要知道什麼時候介入。

做 prototype？Vibe Coding。
做產品？Agentic Coding。

最好的開發者兩種都會用，在不同場景切換。

### 非工程師可以用 Agentic Coding 嗎？

可以，而且正在發生。

Anthropic 報告中的 Trend 7 專門討論這件事。Zapier 全組織 89% 的 AI 採用率包含了非工程團隊。Anthropic 自己的法務團隊用 Claude Code 建立了自助服務工具。

但有個重要前提：**生產級應用仍然需要工程背景來監督品質和安全**。

非工程師可以用 Agentic Coding 做內部工具和自動化。要上線面對使用者的產品，最好有懂技術的人把關。

### Agentic Coding 安全嗎？

Agent 有多安全，取決於你給它多少權限和多少監督。

Anthropic 報告中的 Trend 8 整理了五大護欄：
1. 最小權限工具存取
2. 網路出口控制
3. 密鑰衛生（短期 token、遮罩日誌）
4. Policy-as-code
5. 不可變的稽核日誌

此外，OWASP 已經發布了 LLM App Top 10，涵蓋 prompt injection、資料外洩、供應鏈攻擊等 Agent 特有的威脅。

安全不是二選一的問題。它是一個需要持續投入的工程實踐。

---

## 下一步：開始你的第一個 Agentic Workflow

看完這篇，建議的行動路徑：

1. **裝一個工具**：推薦從 [Claude Code](/zh-TW/blog/claude-code-tutorial) 開始，它的 agentic 能力最完整
2. **找一個小任務**：從你現有專案中找一個修 bug 或加小功能的任務
3. **練習「設定目標」而非「寫指令」**：告訴 Agent「我想讓這個按鈕在點擊後顯示確認對話框」，而不是「請在 onClick handler 裡加一個 confirm()」
4. **審查、審查、再審查**：看 diff、跑測試、理解 Agent 做了什麼

Agentic Coding 的門檻不在技術，而在思維的轉換——從「我來寫」變成「我來定義和驗收」。

---

我相信在 AI 時代，一個人就能打造一間公司。我正在用自己的經歷證明這件事——從產品開發到行銷成長到生活管理，全部一個人。每一步怎麼做到的，我都寫進電子報裡。[訂閱](/zh-TW/newsletter)，一起見證。

---

## 延伸閱讀

- [Claude Code 教學：5 分鐘完成安裝與第一個任務](/zh-TW/blog/claude-code-tutorial)
- [從 No-Code 到 AI Coding：一個 PM 的轉型之路](/zh-TW/blog/nocode-to-ai-coding)
- [AI Coding 套利：用 AI 做到以前做不到的事](/zh-TW/blog/ai-coding-arbitrage)
