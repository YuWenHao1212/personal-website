# Agentic Coding 文章拆分計畫

## 背景

根據 [Agentic Coding SEO 攻擊策略](~/Cockpit/research/seo/keywords/agentic-coding-5W1H-2026-02-11.md)，Pillar Page 建議 6,000-8,000 字，目前文章過長，需拆分成 Topic Cluster。

---

## 現有結構分析

**檔案**: `src/content/blog/zh-TW/agentic-coding-guide.md`

### 目前段落

| Section | 行數 | 字數估計 | 拆分建議 |
|---------|------|----------|----------|
| 開頭 + Vibe Coding 是什麼 | 25-65 | ~800 | 保留 |
| Agentic Coding 是什麼（含三階段、Karpathy） | 67-130 | ~1,500 | 保留 |
| Vibe vs Agentic 比較表 | 132-153 | ~400 | 保留 |
| **我的實戰工作流**（七階段 + Multi-Agent） | 156-227 | ~1,500 | → 拆出 Article 3 |
| **2026 關鍵趨勢**（8 趨勢 + 市場數據） | 230-330 | ~2,000 | → 拆出 Article 5 |
| 如何開始 Agentic Coding | 333-387 | ~1,000 | 保留（精簡） |
| FAQ | 390-437 | ~900 | 保留 |
| 下一步 + CTA | 440-462 | ~300 | 保留 |

**目前總字數估計**: ~8,400 字（超標）

---

## 拆分計畫

### Pillar Page（保留）

**目標字數**: 5,000-6,000 字

保留內容：
- 開頭 hook + Vibe Coding 定義
- Agentic Coding 定義（三階段 + Karpathy）
- Vibe vs Agentic 比較表
- **新增**：工作流簡介（3-4 句概述）+ 連結到 Article 3
- **新增**：趨勢簡介（3-4 句概述）+ 連結到 Article 5
- 如何開始（Step 1-3 精簡版）
- FAQ
- 下一步 CTA

### Article 3：實戰 Workflow 教學

**新檔案**: `src/content/blog/zh-TW/agentic-coding-workflow.md`

**目標關鍵字**: "agentic coding workflow"

內容：
- 日常開發流程（六步驟）
- 七階段工作流（詳細版）
- Multi-Agent 模式
- 關鍵心態：你不是在寫程式碼
- 實際案例 demo

**預估字數**: 2,500-3,000 字

### Article 5：2026 趨勢解讀

**新檔案**: `src/content/blog/zh-TW/agentic-coding-trends-2026.md`

**目標關鍵字**: "agentic coding trends 2026"

內容：
- Anthropic 報告概述
- 8 大趨勢完整版
  - Foundation（SDLC、Multi-Agent、Long-Running）
  - Capabilities（Scaled Oversight、New Surfaces）
  - Impact（Economics、Non-Tech、Security）
- 模型軍備競賽（Opus 4.6 vs GPT-5.3）
- 技能退化風險
- 市場數據表

**預估字數**: 2,500-3,000 字

---

## 內部連結策略

```
Pillar Page (agentic-coding-guide)
    ├── → Article 3 (workflow)
    │       └── ← 返回 Pillar
    └── → Article 5 (trends)
            └── ← 返回 Pillar
```

### Pillar → Articles

在 Pillar 中新增：

```markdown
## 我的 Agentic Coding 實戰工作流

每天用 Claude Code 做產品開發，我的流程已經固定下來——從 Intent 到 Merge 的七個階段，加上複雜任務用的 Multi-Agent 模式。

→ [完整的七階段工作流與 Multi-Agent 實戰](/zh-TW/blog/agentic-coding-workflow)

---

## 2026 年 Agentic Coding 關鍵趨勢

Anthropic 在 2026 年 1 月發布了 Agentic Coding Trends Report。報告的核心論述：軟體開發正經歷自 GUI 以來最重大的變革。

→ [8 大趨勢完整解讀 + 市場數據](/zh-TW/blog/agentic-coding-trends-2026)
```

### Articles → Pillar

在每篇 Article 結尾：

```markdown
---

## 延伸閱讀

- [Agentic Coding 完全指南：從概念到實踐](/zh-TW/blog/agentic-coding-guide)
```

---

## Frontmatter 更新

### Pillar Page

```yaml
relatedPosts:
  - "agentic-coding-workflow.md"
  - "agentic-coding-trends-2026.md"
  - "claude-code-tutorial.md"
  - "nocode-to-ai-coding.md"
```

### Article 3 (workflow)

```yaml
title: "Agentic Coding 實戰工作流：七階段開發 + Multi-Agent 協作"
description: "從 Intent 到 Merge 的七階段 agentic coding 工作流，加上 Multi-Agent 模式處理複雜任務。附實際案例。"
focus_keyphrase: "agentic coding workflow"
relatedPosts:
  - "agentic-coding-guide.md"
  - "claude-code-tutorial.md"
```

### Article 5 (trends)

```yaml
title: "2026 Agentic Coding 趨勢：Anthropic 報告 8 大重點解讀"
description: "Anthropic 2026 Agentic Coding Trends Report 完整解讀。8 大趨勢、Opus 4.6 vs GPT-5.3、市場數據、技能退化風險。"
focus_keyphrase: "agentic coding trends 2026"
relatedPosts:
  - "agentic-coding-guide.md"
```

---

## 執行步驟

1. [x] 建立 `agentic-coding-workflow.md`（從 Pillar 搬移內容）
2. [x] 建立 `agentic-coding-trends-2026.md`（從 Pillar 搬移內容）
3. [x] 修改 Pillar：移除詳細內容，改為簡介 + 連結
4. [x] 更新所有 relatedPosts
5. [ ] 驗證內部連結
6. [ ] 建立英文版（en/）對應文章

---

## 待決定

- [ ] Article 3 是否需要更多實際案例截圖？
- [ ] Article 5 是否加入競品分析（Cursor vs Claude Code）？
- [ ] 是否先發 Pillar，再逐步發 satellite articles？

---

**建立日期**: 2026-02-12
**執行日期**: 2026-02-12
**狀態**: Executed (zh-TW)
