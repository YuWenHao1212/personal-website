---
title: "養一隻龍蝦，還是把 Claude Code 搬上雲？兩種 Discord Agent 的根本差異"
description: "OpenClaw 和 Agent Broker 都是 Pahud Dev 出的、都跑在 $2-3 的 VPS、都用 Discord/Telegram 對話。但兩者代表完全不同的 AI 工作哲學：一個是養人格化助理，一個是把你的 Coding CLI 變成雲端服務。這篇拆解它們的根本差異。"
pubDate: 2026-04-07
category: ai-productivity
tags: ["AI Agent", "OpenClaw", "Claude Code", "Discord Bot", "Cloud Native"]
lang: zh-TW
featured: false
heroImage: /images/blog/openclaw-vs-coding-cli/hero.webp
---

## 一個讓我困惑了三天的問題

過去三週我把 Pahud Dev 的 7 支 YouTube 影片全部看完了。看到第三支的時候我就有一個揮之不去的疑問——

**OpenClaw 和 Agent Broker，到底差在哪？**

兩個都是同一個作者寫的。
兩個都跑在 Zeabur 的 $2-3 VPS。
兩個都用 K3S + Helm Chart 部署。
兩個都用 Discord 或 Telegram 對話。
兩個的人格設定都用一個 markdown 檔（soul.md / agents.md）。

連 Demo 影片都長得超像：SSH 進主機 → Kiro CLI 跑 helm install → Pod 內認證 → 在 Discord 講「嗨嗨」→ Bot 回你一個冷笑話。

但 Pahud 在 Agent Broker 那集明明白白講了一句：「**Coding Agent in the Cloud 是趨勢**」。語氣完全不是「OpenClaw 的小弟」，而是「另外一個方向」。

我想了三天，加上自己 Phase 0 把 Agent Broker 跑通之後，才終於看懂這兩個東西的根本差異。這篇就是把這個差異講清楚。

如果你也在猶豫該裝哪一個——這篇就是寫給你的。

---

## TL;DR

| | OpenClaw | Coding CLI on Discord（Agent Broker） |
|---|---|---|
| **本質** | 一隻有人格的數位生物 | 把你 IDE 裡的 Coding CLI 搬上雲 |
| **誰住在 Pod 裡** | OpenClaw runtime（自有） | Claude Code / Kiro / Gemini / Codex |
| **協議** | 自有 | **ACP**（Anthropic 標準） |
| **人格檔** | `soul.md` | `agents.md` / `CLAUDE.md` |
| **工具來源** | 內建 onboard 流程（OpenAI、Browser、Telegram） | 你自己掛 MCP |
| **記憶/狀態** | OpenClaw 自己管 | Coding CLI 的 session/context |
| **適合誰** | 「我想養一隻 AI 寵物/分身」 | 「我想把開發工作流帶著走」 |
| **最小成本** | $2/月 | $3/月 |

兩者不是替代關係。兩者是**兩種不同的 AI 使用哲學**長出來的工具。

---

## 表面相似的三件事

先講相似的——這也是讓我困惑的根源。

**第一，部署方式幾乎一樣。** 兩個都走 Cloud Native 路線、都用 Pahud 自己寫的 Helm Chart、都建議在 K3S 上跑、都可以在 Zeabur $2-3 的小機器跑得動。Pahud 在 OpenClaw EP2 那集對 Helm Chart 的設計原則——**Security by Design（預設 bind loopback）**、**Decouple Browser（不裝 Chromium）**、**最少資源**、**Cloud Native 不鎖平台**——這些原則他在 Agent Broker 上完全照抄。

**第二，使用體驗幾乎一樣。** Discord/Telegram 收訊息 → Pod 裡的 Agent 回應 → 用 Emoji 反應顯示狀態（OpenClaw 在 Telegram 用 emoji，Agent Broker 在 Discord 用 👀→🤔→🔥→👍）。Pahud 用了一句話形容：「整個體驗就像 Discord 聊天，**情緒價值給滿了**，跟 OpenClaw 很像。」

**第三，第一次啟動都是「白紙一張」。** OpenClaw 第一次起來要 `openclaw onboard` 配 OpenAI key、Telegram Bot、產生 soul.md。Agent Broker 第一次起來要在 Pod 裡 `claude setup-token` 認證、產生 agents.md。兩者都強調「給它一個身份、一個人格」。

如果你只看 Demo，這兩個東西就是同一隻動物穿不同衣服。

---

## 但底層哲學完全不同

差異要從一個問題開始問：**那個跑在 Pod 裡、實際在「思考」的東西，是誰？**

### OpenClaw：跑的是「OpenClaw 自己」

OpenClaw 是一個**完整的 AI Agent runtime**。Pod 裡跑的是 OpenClaw 自家的 process，它自己管：

- 怎麼接收 Telegram/Discord 訊息
- 怎麼選 Model（OpenAI、OpenRouter Free Model failover）
- 怎麼呼叫工具（內建 Browser、內建備份機制）
- 怎麼維護人格和記憶（`soul.md`）
- 怎麼 onboard（一個指令把上面這些全部配起來）

你跟它互動的時候，它是一個**自成一體的數位角色**。Pahud 在 EP1 裡示範把它配成「三國張飛」，然後在 Telegram 講「乃張飛張翼德在此！」這句話的時候，那隻在 Pod 裡的 OpenClaw 就是張飛。它有名字、有口氣、有自己的工具箱、有自己的記憶。

它不依賴你已有的工作流。它**就是**那個工作流。

### Agent Broker：跑的是「你習慣的 Coding CLI」

Agent Broker 不是 Agent。它是一個**很薄的 Bridge**——Rust 寫的、幾百 KB、唯一的任務就是把 Discord 的訊息和你選的 Coding CLI 的 stdin/stdout 串起來。

```
Discord ←→ agent-broker（Rust）←→ Claude Code / Kiro / Gemini / Codex
                                   （透過 ACP 標準協議）
```

那個真正在「思考」的東西是 **Claude Code**（或你選的其他 Coding CLI）。Claude Code 平常跑在你的 MacBook 上做哪些事，現在搬到 Pod 裡就做一模一樣的事——讀檔、寫程式、跑 bash、管 session、讀 `CLAUDE.md`。

換句話說，Agent Broker 的核心價值不是「我給你一個 Agent」，而是——

> **「把你已經習慣的那個 Coding CLI，從筆電搬到雲端，然後給它一個 Discord 的入口。」**

這就是為什麼 Pahud 用「**Bring your own Coding CLI to the Cloud**」當副標題。重點不是 Broker，重點是「**your own**」。

---

## ACP 是這個差異的關鍵

這裡要插一段技術細節，因為這是兩者本質差異的根基。

**ACP（Agent Client Protocol）** 是 Anthropic 推的標準協議，本質上是 JSON-RPC over stdio。它定義了「一個外部 client 怎麼跟一個 Coding Agent 溝通」——open session、send message、receive streaming response、tool call、tool result，這些都有標準格式。

Claude Code 原生支援 ACP（用 `claude --acp` 模式啟動）。Pahud 在影片裡明講：「Agent Broker 之後 Claude Code、Codex、Gemini、甚至 Copilot、Cursor、OpenCode，**只要支持 ACP，理論上全部都可以支持**。」

這句話的潛台詞是：**Agent Broker 不綁定任何特定的 AI Agent**。它只綁定 ACP 這個標準。今天你用 Claude Code，明天你想換 Gemini，只要 Gemini 支援 ACP，你就只要改一個 Helm 的 `agent.preset` 值，整個系統照跑。

OpenClaw 不是這樣。OpenClaw 是它自己。它沒有「換成另一個 Agent」這個選項——它**就是**那個 Agent。

這就好像：

- **OpenClaw** 像是一台**完整的 Console**（PlayStation）。你買的是這台機器和它的生態系。
- **Agent Broker** 像是一條**HDMI 線**。你已經有的螢幕、有的主機、有的遊戲，它只是把它們接起來。

---

## 兩個哲學長出兩種使用者

理解了底層差異，你會發現它們適合的人完全不同。

### OpenClaw 適合：想養一隻數位生物的人

OpenClaw 強的地方在於它是**自帶完整體驗**的。`openclaw onboard` 一跑，OpenAI 接好、Telegram Bot 接好、Browser 接好、人格 `soul.md` 產出來。你不用想「我要掛哪些 MCP」、「我要寫哪些工具 wrapper」。

它是一個**產品**，不是一個工具箱。

它的目標使用者是——

- 想要「**一個 AI 助理 / 分身 / 寵物**」的人
- 不想自己組合 MCP、不想自己寫 wrapper 的人
- 想要一個有名字、有人格、可以對外展示的 Agent 的人
- 想學 Cloud Native 但不想學太多的人

Pahud 在 EP1 講得很白：「OpenClaw 就是一隻龍蝦」。語氣是擬人化的、是有感情的、是「養寵物」的。你不會說「我寫的 Python script 是我的寵物」，但你會說「我家的張飛龍蝦」。

### Coding CLI on Discord 適合：想把開發工作流帶著走的人

Agent Broker 強的地方在於它**完全不假設你想做什麼**。它只負責一件事：把 Discord 的訊息送進你的 Coding CLI、把 Coding CLI 的回應送回 Discord。其他全部交給 Coding CLI 的生態系——MCP server、CLAUDE.md、subagents、skills、slash commands、whatever。

它是一個**入口**，不是一個產品。

它的目標使用者是——

- 已經重度使用某個 Coding CLI（Claude Code、Kiro、Gemini）的人
- 已經有自己的 MCP server、自己的 skills、自己的工作流的人
- 需要「**手機就能觸發桌機級的工作流**」的人
- 工程師、開發者、想把 IDE 體驗帶到雲端的人

Pahud 在 Agent Broker 那集講的趨勢——

> 「未來很快，到年底之前，很多人都不需要再用 IDE、不需要用 Laptop 了。你習慣用的 Kiro CLI、Claude Code、Gemini、Codex、Copilot、Cursor 這些命令列工具，全部都會跑在 Cloud 上面，而且是一個受保護的沙箱。然後你只要用 Discord、Telegram 這些工具跟它保持對話、保持連線就可以了。」

這段話的對象不是「想養 AI 寵物的人」，而是「**已經把 Coding CLI 當成主力工作工具的人**」。Pahud 自己就是這種人——他在 OpenClaw EP2 講他所有的 Git 操作都是 thepagent（他的 Kiro Agent）幫他做的。Agent Broker 是他把這個工作流從 MacBook 搬到雲端的方案。

---

## 如果你已經是 Claude Code 使用者，OpenClaw 對你來說太重了

講完哲學差異，我要對一個特定族群說一句直接的話——

**如果你已經在用 Claude Code（而且養出了自己的工作流），不要裝 OpenClaw。**

不是 OpenClaw 不好，是**方向錯了**。我從三個層次解釋為什麼。

### 1. Runtime 層：重複造輪子

OpenClaw 自己是一個完整的 Agent runtime——它有自己的 model 路由、自己的 tool 機制、自己的 session 管理、自己的記憶系統。

但這些 Claude Code 全部都有，而且做得更成熟：

| OpenClaw 的元件 | Claude Code 對應 |
|---|---|
| Model 路由（OpenAI / OpenRouter failover） | Claude Code + Anthropic 訂閱 |
| Tool 機制 | **MCP**（已是業界標準） |
| Session 管理 | Claude Code 原生 session |
| 記憶系統 | `CLAUDE.md` + memory + skills |
| 人格設定 | `agents.md` / soul.md / CLAUDE.md |

對 Claude Code 使用者而言，OpenClaw 那一整層 runtime 是**重複建設**。你裝了 OpenClaw，等於 Pod 裡跑了一整套你不會用到的東西。

### 2. 生態層：你進不去你已經有的世界

這才是真正的「重」。我自己的 Claude Code 上養了：

- 30+ 個 skills（`/daily`、`/journal`、`/content`、`/wam`...）
- 一堆 MCP server（Email、Calendar、Vault、Umami Analytics）
- 完整的 CLAUDE.md 規則和子規則
- Memory 系統累積的個人脈絡（誰是誰、什麼專案到哪裡、踩過哪些坑）

OpenClaw **讀不到這些**。它是另一個物種。如果我選 OpenClaw，等於要在裡面**從零再養一次**——重寫 skills（而且 skills 是 Claude Code 專有格式，搬不過去）、重接工具、重訓人格、重建記憶。

這個遷移成本是無限大的。不是「花一週搬」那種無限大，是「**根本沒有對應物可以搬**」的無限大。

Agent Broker 不是。Agent Broker 把 Pod 裡那個 Claude Code **就當成 Claude Code**——掛 `~/.claude`、接 MCP、讀 CLAUDE.md，它跟你 MacBook 上的 Claude Code 是**同一隻動物**，只是入口從 terminal 換成 Discord。

**零遷移成本。**

### 3. 心智層：你買的是哪個產品？

最關鍵的差異是——你買的到底是什麼？

- **OpenClaw 賣的是「一隻 AI 寵物」**。產品是龍蝦本身。Discord/Telegram 只是它的嘴。
- **Agent Broker 賣的是「Discord 入口」**。產品是那條 HDMI 線。Claude Code 才是主機。

對 Claude Code 重度使用者來說，**你要的不是另一個 Agent**，你要的是「**讓我已經有的 Agent 出現在手機上**」。

OpenClaw 解的不是這個問題。它解的是「**我還沒有 Agent，請給我一隻**」這個問題。

兩個問題的答案不一樣，是正常的。

---

## 我為什麼選 Agent Broker

我自己這次 Phase 0 選了 Agent Broker，沒選 OpenClaw。理由很簡單——

**我要把我已經養好的 Claude Code workflow 帶著走。**

我的 Claude Code 已經有：
- 30+ 個 skills（`/daily`、`/journal`、`/content`、`/wam`...）
- 一堆 MCP server（Email、Calendar、Umami Analytics、Vault）
- 完整的 CLAUDE.md 規則
- Memory 系統累積的個人脈絡

OpenClaw 沒辦法讀這些。它有自己的 runtime、自己的 tool 機制、自己的記憶系統。如果我用 OpenClaw，我等於要從零開始養一隻新動物。

但 Agent Broker 不是。Agent Broker 跑起來的那一刻，**Pod 裡那個 Claude Code 就是 Claude Code**。我把 `~/.claude` 掛進 Pod、把 MCP config 接好，它就有所有 skills、所有記憶、所有工具——只是入口從我的 MacBook terminal 變成了 Discord。

對我來說，選擇是這樣的：

> **如果你已經在 Coding CLI 上養了一個工作流，選 Agent Broker。**
> **如果你想要一個對外的、有人格的 AI 助理，選 OpenClaw。**

兩者甚至可以**並存**。它們都跑在 K3S Pod 裡，一台 $3 的 VPS 同時跑兩個 Pod 完全沒問題——一個 Pod 是「Z 伯伯」，對外給朋友/家人玩；另一個 Pod 是「我自己的 Claude Code」，連接我的 Vault 和 Email，是我私人的工作助理。

---

## 一個我預測會發生的趨勢

寫到這裡我想做一個預測。

短期內（半年內），**Agent Broker 這條路會跑得比 OpenClaw 快**。

不是因為 OpenClaw 不好——OpenClaw 是個完整、好用的產品。而是因為 ACP 是標準。當 Claude Code、Kiro、Gemini、Codex、Copilot、Cursor 都支援 ACP 之後，每個人都能把自己**已經習慣**的 Coding CLI 搬上雲。沒有學習曲線、沒有遷移成本、沒有「要不要重新養一隻」的猶豫。

長期來看，這兩條路會匯流。你會看到：
- OpenClaw 開放掛 MCP（變得更像 Coding CLI）
- Coding CLI 學會更多 OpenClaw 的「人格化」設計（agents.md 已經開始）
- 兩者都跑在同一套 K3S + Helm 基礎上

但今天 2026 年 4 月，這兩條路長得像，骨子裡是不同的。搞清楚差異再選一個，比兩個都裝來踩坑省時間。

---

## 接下來

我的 Phase 0 已經跑完了——Discord Bot 接到 K3S Pod 裡的 Claude Code，純對話可用。下一步是 Phase 1：把 FLUX Vault 的 MCP server 接上去，讓 Discord 能讀寫我的 Obsidian 知識庫。

如果你對「個人 Agent 基礎設施」的完整路線有興趣，可以看我前一篇——[為什麼我要花 $3 美金，把 Claude Code 從筆電搬到雲端](#)。

如果你看完這篇還在猶豫該選哪個——歡迎來信跟我聊。我特別想知道——

**你是想養一隻 AI 寵物，還是想把你的開發工作流搬上雲？**

---

## 參考資料

- [OpenClaw EP1 — Zeabur 部署教學](https://www.youtube.com/watch?v=SacFPjsTJA8)（Pahud Dev）
- [OpenClaw EP2 — 自製 Helm Chart 與 Kiro CLI Free Plan](https://www.youtube.com/watch?v=1YLN3aS26vc)（Pahud Dev）
- [Agent Broker — Bring your own Coding CLI to the Cloud](https://www.youtube.com/watch?v=iBZCYVtT20M)（Pahud Dev）
- [Agent Broker repo](https://github.com/thepagent/agent-broker)
- [OpenClaw Helm Chart](https://github.com/thepagent/openclaw-helm)
- [ACP（Agent Client Protocol）](https://github.com/anthropics/agent-protocol)
