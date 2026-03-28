---
title: "我建了一間 AI Agent 公司，第一天就想解散它"
description: "6 個 AI agent、OKR、簽核流程全到位。第一天就發現：管理成本比執行成本還高。做了 10 年 PM 被流程卡過無數次，沒想到自己又建了一遍。"
pubDate: 2026-03-28
category: building-products
tags: ["AI agent", "multi agent", "Paperclip AI", "agentic coding", "AI 自動化"]
author: "余文皓"
keywords: ["multi agent", "AI agent", "Paperclip AI", "multi agent system", "AI 自動化", "AI agent 管理", "multi agent 成本"]
lang: zh-TW
translationKey: multi-agent-hidden-cost
draft: false
featured: false
heroImage: /images/blog/multi-agent-hidden-cost.webp
focus_keyphrase: "multi agent"
relatedPosts: ["ai-harness.md", "agentic-coding.md", "claude-code-tutorial.md", "claude-skills-guide.md"]
faq:
  - question: "什麼時候該用 multi agent 系統？"
    answer: "當你的工作需要 7x24 無人值守持續運轉，或是有明確的流水線流程（固定輸入、固定步驟、固定的 pass/fail）時，multi agent 系統的管理成本才值得。一個人或小團隊操作，一個 agent 搭配好的 Harness 就夠了。"
  - question: "multi agent 系統有哪些隱藏成本？"
    answer: "三個：管理成本（每個 agent 的指令都要寫到具體操作層級，而且持續維護）、交接成本（agent 之間的每一步交接都可能出錯，少寫一步流程就卡住）、context 重建成本（每次叫醒一個 agent 都要從零載入所有指令和歷史紀錄）。"
  - question: "Paperclip 是什麼？"
    answer: "Paperclip 是一個開源的 AI agent 編排平台（GitHub 23,000+ stars），用真實公司的管理方法論（OKR、組織架構、簽核流程、預算控制）來管理 AI 團隊。願景是打造零人公司（zero-human company）。"
---

6 個 AI agent、OKR、簽核流程、預算控制。全到位。

第一天結束，我在想怎麼解散它。

---

## 零人公司的誘惑

[Paperclip](https://github.com/paperclipai/paperclip) 是一個開源的 AI agent 編排平台，上線幾週就拿到 23,000+ stars。

它的願景很大膽：**zero-human companies**——零人公司。

不是讓 AI 回答問題，是讓 AI 自己開公司。用真實企業的管理方法論來管 AI 團隊：

- **組織架構**：CEO → PM → Developer → Reviewer，有彙報線
- **OKR**：公司目標 → 專案目標 → 每個任務綁目標
- **簽核流程**：策略決定、文章發布，走正式簽核
- **預算控制**：每個 agent 月預算上限，超支自動暫停
- **Heartbeat（定時喚醒）**：agent 不是一直跑的，按排程短暫醒來，做完再休眠

PM 出身的人看到 OKR、組織架構、簽核流程、預算控制這些關鍵字，很難不心動。

我用 [Claude Code](/zh-TW/blog/claude-code-tutorial/) 搭配 [Harness](/zh-TW/blog/ai-harness/)（CLAUDE.md + Skills），一個 agent 做 [agentic coding](/zh-TW/blog/agentic-coding/) 已經很強了。但 Paperclip 打的是更上一層：讓 AI 自己跑，我只管 approve。

研究員找題目、作者寫稿、編輯審稿、工程師處理技術——四個角色，各司其職，自動接力。

我決定認真建一間。

---

## 第一天

半天時間，6 個 AI agent——有管策略的、有做研究的、有寫東西的、有審稿的、有處理技術的。OKR、簽核、預算、定時喚醒、操作紀錄，全部到位。不是 demo，是認真要拿來用的。

開了第一個工單，指派給 CEO。

接下來四個小時，我修了四次指令，手動推進了無數次流程，在 Inbox 裡按了 approve，看 agent 跑了又卡、卡了又修。

文章最後寫出來了。3,200 字，結構完整，品質不差。

但我坐在那裡想：**我到底在做什麼？**

我在管理。不是在產出。

---

## multi agent 有哪些隱藏成本？

### 管理成本

一個 agent 負責追進度。它寫了一份漂亮的進度報告，但沒有實際把工作交出去。因為指令寫了「推進到下一站」，卻沒告訴它具體怎麼操作。

6 個 agent，每個的指令都改了 3-4 次。業務一變，6 份指令的維護成本是 1 份的 6 倍。

### 交接成本

真實公司裡，做完了，走到同事座位前說「好了你看一下」。人有常識，不需要 protocol。

AI 沒有常識。每一個「走到座位前」都要寫成明確的指令——改狀態、改負責人、用正確格式通知對方。少寫一步，流程就卡住。

### Context 重建成本

每次叫醒一個 agent，它要從零載入所有指令、歷史紀錄、前情提要，然後才開始想。

6 個 agent 各跑 3 次 = 18 次重建。一個 Claude Code session 只載入一次。**18 次 vs 1 次，不是百分比的差距。**

---

## 流程的目的是什麼？

做了 10 年 PM，我太熟悉流程了。

一張簽核單上 5 個人，不同單位。順利的話一週，不順利簽兩週以上。沒有人跟催，更久。

有了流程，每件事都有「該走的路」。但該走的路往往是最沒有彈性、最慢的路。

PM 的日常：30% 的時間做事，70% 的時間推流程——催簽核、開會對齊、寫進度報告、等相關人回覆。

流程存在的目的，是讓多人協作時降低出錯。10 個人的團隊沒有流程會亂，100 個人沒有流程會崩潰。

但如果一件事本來一個對話就能做完呢？

拆成流程的瞬間，就多了交接、簽核、等待。2 個節點是 1 次交接，6 個節點是 15 次可能的交互。**複雜度不是線性成長，是指數級的。**

我從真實公司帶著這套經驗出來，覺得自己很懂管理。然後認認真真地，把一句話能解決的事，拆成了一套管理系統。

然後花四個小時在管理這套系統。

---

## 一個 agent 能做到什麼？

同一天稍早，我用 Claude Code 準備了一場工作坊。修改模板、更新網頁、寫流程文件、壓縮上傳、部署網站。

一個 session。40 分鐘。全部搞定。

同一個對話裡，它是研究員、是寫手、是工程師——需要什麼角色就切換，所有 context 都在。不需要開工單、不需要等排程、不需要跑簽核、不需要特殊格式才能叫醒同事。

我說「改這個」，它改了。我說「不對」，它馬上改。

換成 Paperclip？我要在工單上寫一條留言，用正確的格式 @mention 那個 agent，它醒來後重新載入所有 context，讀完歷史紀錄，理解我要改什麼，然後才開始動。

一句話的修改，變成一條完整的工單流程。

回頭看那 6 個 agent 的管理系統——

| | 6 個 Agent + 管理系統 | 1 個 Session |
|---|---|---|
| 從想法到初稿 | 15+ 步、4 小時 | 1 步、30 分鐘 |
| 中間的等待 | 每步等排程叫醒 | 0 |
| 簽核流程 | 2 次正式簽核 | 看了直接說改哪裡 |
| 出錯修正 | 改指令 → 重跑 → 等結果 | 「不對，改成這樣」 |

Paperclip 把一句話能解決的事，變成了一套簽核流程。

---

## 什麼時候才需要？

不是 Paperclip 不好。它的底層設計很紮實——兩個 agent 不會搶同一個任務、預算超支自動暫停、所有操作都有紀錄不能竄改。這些機制在對的場景會救命。

問題是場景。

| 你的情況 | 建議 | 原因 |
|---------|------|------|
| 一個人或小團隊 | 一個 agent + 好的 [Harness](/zh-TW/blog/ai-harness/) | 說改就改，比任何流程都快 |
| 無人值守、7x24 持續運轉 | 持久化多 agent 系統 | 沒有人在線，系統自己跑 |

工作性質也會影響。如果你的任務有明確的規格和 pass/fail——跑測試、跑部署、跑數據流程——流程和自動化的價值就高。但如果每一步都需要人判斷、方向隨時會變，硬套流程只會把彈性鎖死。

跟真實公司一樣——3 個人的團隊不需要 OKR、不需要簽核流程、不需要週會。硬要導入只會拖慢速度。Anthropic 在 [Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents) 中也強調：

> Success in the LLM space isn't about building the most sophisticated system. It's about building the right system for your needs.
>
> （在 LLM 領域，成功不是建最複雜的系統，而是建最適合你需求的系統。）

---

## 那一天白費了嗎？

沒有。

跑過一次才知道，我的工作裡哪些環節真的需要流程，哪些只是在給自己製造工作。

公司架構保留著。6 個 agent 的指令寫好了。一個指令就能啟動。

等有一天真的需要無人值守，或是工作變成有明確流程的流水線——有固定的輸入、固定的步驟、固定的 pass/fail——那天再啟動它。但那天不是今天。

回到 Claude Code + Harness。一個 session。一個 agent。說什麼做什麼。不對馬上改。

做了 10 年 PM，學到最重要的一課：**流程是為了規模。沒有規模，流程就是枷鎖。**

用 AI 組團隊也一樣。

---

> 想自己建一套高效運轉的 AI 系統？**5/16（六）** 我和 Vista 在台北開一場 6 小時實作工作坊，帶你從零建好 Claude Code + Obsidian 的個人 AI 指揮中心——不需要會寫程式。[看工作坊詳情 →](https://www.solo.tw/courses/ai-command-center)

*喜歡這類內容？我每週寫一封信，聊怎麼把 AI 用在真實生活和工作裡，和一路上想通的道理。[訂閱直接寄給你](/zh-TW/)。*
