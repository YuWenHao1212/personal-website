---
title: "Agentic Coding 實戰工作流：七階段開發 + Multi-Agent 協作"
description: "從 Intent 到 Merge 的七階段 agentic coding 工作流，加上 Multi-Agent 模式處理複雜任務。附日常開發流程與關鍵心態轉換。"
pubDate: 2026-02-12
category: building-products
tags: ["AI", "Claude Code", "agentic coding", "workflow", "developer-tools"]
lang: zh-TW
translationKey: agentic-coding-workflow
draft: false
featured: false
heroImage: /images/blog/agentic-coding-workflow.webp
focus_keyphrase: "agentic coding workflow"
relatedPosts: ["agentic-coding-guide.md", "claude-code-tutorial.md"]
---

每天用 Claude Code 做產品開發，我的流程已經固定下來。

這篇文章分享我的日常開發流程、完整的七階段工作流、以及處理複雜任務的 Multi-Agent 模式。

> 這篇是 [Agentic Coding 完全指南](/zh-TW/blog/agentic-coding-guide) 的延伸閱讀。

---

## 日常開發流程

```
Intent（想做什麼）
  → Plan（用 plan mode 規劃）
  → Agent Execution（Agent 自動執行）
  → Review（我審查 diff）
  → Test（Agent 跑測試、我確認）
  → Merge（合進主分支）
```

這不是理論。是我每天在做的事。

---

## 七階段工作流

更完整的版本，我把它拆成七個階段：

### Phase 1: Brainstorm

先想清楚要做什麼。不急著寫程式碼。用對話釐清需求、探索可能的方案、確認技術限制。

### Phase 2: Worktree

用 Git Worktree 建立獨立的工作空間。這樣即使 Agent 搞砸了，也不會影響主分支。每個功能一個 worktree，乾淨隔離。

### Phase 3: Plan

進入 Plan Mode。Agent 分析程式碼庫、理解現有架構、提出實作計畫。我審核計畫，確認方向對了再開始。

這一步是整個流程中最重要的。計畫錯了，後面做得再快也是浪費。

### Phase 4: Execute

Agent 按照計畫執行。寫程式碼、建立檔案、修改設定。這個階段 Agent 有很大的自主權，但遇到模糊的地方會停下來問我。

### Phase 5: TDD（測試驅動開發）

寫測試、跑測試、修復失敗的測試。Agent 自己跑這個迴圈，直到所有測試通過。

### Phase 6: Review

我審查所有變更。看 diff、確認邏輯、檢查安全性。如果有問題，Agent 修正後重新提交。

### Phase 7: Finish

合併分支、清理 worktree、更新文件。收工。

---

## Multi-Agent 模式

複雜任務我會用多個 Agent 平行工作。

比如重構一個模組：
- Agent A 負責寫新的實作
- Agent B 負責寫測試
- Agent C 負責更新文件

三個 Agent 各自獨立工作，最後合併結果。這就是 Anthropic 報告中說的 **Multi-Agent Systems**——57% 的組織已經在用這種模式。

### 什麼時候用 Multi-Agent？

| 場景 | 單一 Agent | Multi-Agent |
|------|-----------|-------------|
| 修一個 bug | ✓ | |
| 加一個小功能 | ✓ | |
| 重構一個模組 | | ✓ |
| 新功能 + 測試 + 文件 | | ✓ |
| 大型 migration | | ✓ |

原則：**任務可以平行拆分、互不干擾**時，用 Multi-Agent。

---

## 一個關鍵心態

Agentic Coding 最重要的一件事：**你不是在寫程式碼，你是在定義和驗收**。

以前花 80% 時間寫程式碼、20% 時間想設計。

現在反過來。80% 時間想清楚要做什麼、怎麼驗收、有什麼限制條件。20% 時間審查 Agent 的產出。

寫程式碼的部分？Agent 做。

---

## 下一步

如果你還沒開始用 Agentic Coding，建議從這裡開始：

1. **裝 Claude Code**：[5 分鐘完成安裝與第一個任務](/zh-TW/blog/claude-code-tutorial)
2. **找一個小任務**：從現有專案中找一個修 bug 或加小功能的任務
3. **練習七階段流程**：先從 Brainstorm → Plan → Execute 開始

一旦這個迴圈建立起來，效率會以複利的方式成長。

---

## 延伸閱讀

- [Agentic Coding 完全指南：從概念到實踐](/zh-TW/blog/agentic-coding-guide)
- [2026 Agentic Coding 趨勢：Anthropic 報告解讀](/zh-TW/blog/agentic-coding-trends-2026)
- [Claude Code 教學：5 分鐘完成安裝與第一個任務](/zh-TW/blog/claude-code-tutorial)
