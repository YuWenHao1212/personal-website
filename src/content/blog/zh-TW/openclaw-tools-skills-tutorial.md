---
title: "OpenClaw 教學：25 個 Tools + 53 個 Skills 完整指南"
description: "OpenClaw 裝完了不知道怎麼設定？這篇研究筆記整理了 25 個 Tools 和 53 個官方 Skills 的功能、風險和配置建議。附完整清單和可直接複製的 JSON 設定檔。"
pubDate: 2026-02-05
category: building-products
tags: ["AI", "一人公司", "OpenClaw", "self-hosted AI", "數位工具"]
lang: zh-TW
translationKey: openclaw-tools-skills-tutorial
draft: false
featured: true
heroImage: /images/blog/openclaw-tools-skills-tutorial.webp
keywords: ["OpenClaw 教學", "OpenClaw tools", "OpenClaw skills", "OpenClaw 設定", "openclaw setup", "best ai agent", "AI 助理", "AI 自動化", "AI 工具推薦", "personal ai agent"]
faq:
  - question: "Skills 安裝後權限會改變嗎？"
    answer: "不會。Skills 只是教科書，真正控制能力的是 tools.allow。"
  - question: "1password Skill 真的能讀取所有密碼嗎？"
    answer: "是的。一旦授權，整個密碼庫都能存取——你存了什麼它就能讀什麼。"
  - question: "如何撤銷 gog 的 Google 存取權限？"
    answer: "Google 帳戶 → 安全性 → 第三方應用程式存取權 → 找到 gog → 移除。"
  - question: "ClawHub 的第三方 Skills 安全嗎？"
    answer: "不能預設安全。安裝前務必審查 GitHub repo。詳細的審查方法和 prompt，請見安全指南。"
  - question: "OpenClaw 跟 ChatGPT 有什麼不同？"
    answer: "ChatGPT 是聊天工具，OpenClaw 是 Agent。差別在「聊完之後」：ChatGPT 只能跟你聊天，OpenClaw 可以接著幫你做事——上網查資料、讀寫文件、操作日曆、讀你的 Gmail 並草稿回覆。"
  - question: "OpenClaw 可以自動化哪些任務？"
    answer: "搭配 cron（排程）和 message（訊息推送），OpenClaw 可以定時執行任務並推送結果。常見場景包括：每日 Daily Brief、定期整理 Email、監控 CI/CD 狀態、收集熱門討論整理成寫作素材。"
  - question: "不會寫程式也能用 OpenClaw 嗎？"
    answer: "日常使用不需要寫程式，用自然語言對話就好。但安裝和設定有門檻，建議用 Claude Code 之類的 AI CLI 工具協助完成設定。"
---

OpenClaw 裝完了，然後呢？

Tools 散在不同文件，Skills 預設自動載入——你甚至不知道有些東西已經開了。全開怕出事，全關等於白裝，但要自己從文件和 codebase 拼出全貌，還是得花點時間。

這篇是我自己裝完之後的研究筆記——25 個 Tools 和 53 個官方 bundled Skills 各是什麼、該不該開、我怎麼配、為什麼這樣配（社群另有 3000+ 個第三方 Skills，不在這篇範圍）。安全面的分析在<a href="/zh-TW/blog/2026-02-04-is-openclaw-safe-security-guide" target="_blank">上一篇</a>，這篇講每個 Tool 和 Skill 在幹嘛、以及怎麼根據需求配置。

---

## 先搞懂：OpenClaw Tools 和 Skills 的差別

很多人搞混這兩個，其實很簡單。

**Tools 是器官**——決定 OpenClaw「能不能」做某件事。`read` 和 `write` 讓它讀寫檔案，`exec` 讓它執行系統命令，`web_search` 讓它像 Google 一樣搜尋，`web_fetch` 讓它點進網頁讀內容，`browser` 讓它操作網頁（點按鈕、填表單、截圖）。沒開 Tool，就像沒有手，什麼都做不了。

**Skills 是教科書**——教 OpenClaw「怎麼組合 Tools」來完成任務。`gog` 教它怎麼用 Google Workspace 收發 Email 和管行事曆，`obsidian` 教它怎麼整理筆記，`github` 教它怎麼操作 repo，`slack` 教它怎麼發訊息到頻道。53 個官方 Skills 涵蓋筆記、Email、社群、開發、智慧家居等場景。

裝 Skill 會不會自動給 OpenClaw 新權限？**不會。**

舉例：你裝了 `obsidian` Skill，OpenClaw 知道怎麼組織筆記——但如果沒開 `write` Tool，它根本寫不了檔案。Skill 只是說明書，真正的開關在 Tools。

OpenClaw 要用 Skill 幫你做事，有三個條件要滿足。拿「幫你讀 Gmail」舉例：

1. **設定**：你有沒有在設定檔裡允許 OpenClaw 執行命令？（沒開 `exec`，它連啟動程式都做不到）
2. **安裝**：電腦上有沒有裝 `gog` 這個橋接工具？（沒裝的話，OpenClaw 知道怎麼做但連不上 Google）
3. **授權**：你有沒有登入 Google 帳戶並允許存取？（沒授權，Google 不會讓它進來）

三個條件缺一不可。所以 Skill 只是說明書，能不能做到要看這三個條件有沒有滿足。

---

## 同心圓架構：從核心到外圍

把 25 個 Tools 和 53 個 Skills 全部列出來太亂了。我用同心圓的方式整理：

- **Layer 1 核心能力（8 Tools）**：讀寫檔案、執行命令、網路存取。幾乎每個人都會開。
- **Layer 2 進階能力（17 Tools）**：瀏覽器、記憶、多 Session、自動化。按需開啟。
- **Layer 3 知識層（53 Skills）**：教 OpenClaw 操作 Google、Obsidian、Slack 等服務。用什麼裝什麼。

![OpenClaw 同心圓架構：Layer 1 核心工具（read、write、exec）、Layer 2 進階工具（browser、memory、automation）、Layer 3 知識層含 53 個 Skills 依場景分類](/images/blog/openclaw-tools-skills-tutorial/openclaw-tools-skills-architecture.webp)

---

## Layer 1：核心能力（8 Tools）

這 8 個是 OpenClaw 最基本的能力——只開這些的話，它就是一個能讀寫檔案、跑命令、上網查資料的 ChatGPT，不會記住你的偏好，也不會主動推訊息給你。真正讓 OpenClaw 變成「助理」而不是「聊天機器人」的是 Layer 2。但沒有 Layer 1，Layer 2 也跑不起來。

### 檔案操作：read、write、edit、apply_patch

`read` 只能讀。`write` 和 `edit` 能改檔案，`apply_patch` 套用程式碼修改。這四個是最基本的檔案操作，大多數人都會開。

### 執行與程序管理：exec、process

`exec` 讓 OpenClaw 執行任何 shell 命令——安裝套件、跑腳本、操作系統。「任何」是關鍵字：它能幫你裝套件，也能 `rm -rf`（刪除所有檔案）你的整台機器。不開 `exec`，大部分任務都做不了；開了但不設防，等於把 root 權限交出去。

所以我強烈建議開 `exec` 的同時開審批——每個命令執行前，OpenClaw 會先顯示它要跑什麼，你確認了才會執行：

```json
{
  "approvals": {
    "exec": { "enabled": true }
  }
}
```

會不會很煩？老實說會。但這是最基本的保護——萬一哪天 AI 誤判或被 Prompt Injection 攻擊，這道關卡就是你的最後防線。

`process` 管理背景程序——列出任務、查看輸出、終止卡住的程序。通常跟 `exec` 一起開。

### 網路存取：web_search、web_fetch

`web_search` 做關鍵字搜尋，`web_fetch` 抓取網頁內容。搭配起來就是讓 OpenClaw 能上網查資料。

---

## Layer 2：進階能力（17 Tools）

Layer 1 是「能不能用」，Layer 2 是「好不好用」。這一層的 Tools 讓 OpenClaw 從一個指令執行器變成真正的助理——記得你的偏好、能操作瀏覽器、會定時推送訊息。但每多開一個，攻擊面就多一塊，要自己判斷值不值得。

### 瀏覽器：browser、canvas、image

`browser` 讓 OpenClaw 操作 Chrome——點按鈕、填表單、截圖。我會讓它幫我上網比價、整理規格、把東西加到購物車，但結帳一定自己來。涉及付款的「最後一哩」不交給 AI，這是我的底線。

`canvas` 是視覺化工作區，畫流程圖、架構圖。`image` 讓 OpenClaw「看懂」圖片。

### 記憶：memory_search、memory_get

讓 OpenClaw 記住跨 session 的資訊。用了一個多星期後，它記得我用 Astro 寫 blog、部署在 Azure、偏好繁體中文，不用每次都重新解釋。用越久越懂你。

### 多 Session：sessions 系列（5 個）

可以同時開多個 Session 處理不同任務——例如一個在跟你討論新的產品點子，一個在幫你查旅遊資料，互不干擾。

`sessions_list` 和 `sessions_history` 查看 session，`session_status` 查狀態。`sessions_send` 和 `sessions_spawn` 讓 session 之間能互相通訊和啟動子任務。

### 訊息：message

讓 OpenClaw 發訊息到 Discord、Slack、Telegram、WhatsApp、iMessage。

這個 Tool 我有開，但只用來讓 OpenClaw 傳訊息給我自己——不讓它代替我跟任何人溝通。原因很簡單：AI 用你的名義發出去的訊息，收回不了。萬一它理解錯意思、語氣不對、甚至被 Prompt Injection 騙去發訊息，後果是你自己承擔。

我用 OpenClaw 當作<a href="/zh-TW/blog/ai-goal-management-system" target="_blank">目標管理系統</a>的溝通界面，而啟用 `message` 是讓它可以主動傳訊息給我——每天推送 Daily Brief、任務通知、待辦提醒，全部都是發給我自己。

### 硬體控制：nodes

跨設備控制硬體——遠端截圖、GPS 定位、開相機。

我第一次看到這個 Tool 的時候想了一下：什麼情況需要 AI 主動開我的相機？想不到。截圖的話，自己在 Telegram 傳給它就好，多一步但安心很多。關掉。

### 自動化：cron、gateway

`cron` 設定定時任務，`gateway` 讓它能重啟自己。

每天早上 6:47，我的 Telegram 會收到 OpenClaw 整理好的 Daily Brief——今天要做什麼、有哪些待回覆的訊息、天氣預報。這就是 `cron` 搭配 `message` 的效果，也是我<a href="/zh-TW/blog/ai-goal-management-system" target="_blank">AI 目標管理系統</a>的核心。

### Agent 通訊：agents_list

列出可用的 Agent ID。OpenClaw 支持多 Agent 架構，但官方文檔沒詳細說明。如果只用一個 OpenClaw，這個用不到。

### Extension Tools：llm_task、lobster

`lobster` 是工作流引擎，定義多步驟流程。`llm_task` 在工作流中插入 LLM 處理步驟。

如果沒有用工作流引擎，這兩個不需要開。

---

## Layer 3：知識層（53 個官方 Skills）

53 個聽起來很多，但掃過一遍之後你會發現，跟自己相關的大概就十幾個。剩下的像是外送、智慧家居、語音通話——不是不好，是跟你的使用場景無關就不用管。

**重要：bundled Skills 預設會自動載入**——只要對應的 CLI 工具已安裝在系統上，該 Skill 就會自動啟用。不是「不裝就沒有」，而是「不關就全開」。如果你不想讓某個 Skill 被啟用，需要用 `skills.allowBundled` 白名單模式，只保留你需要的（設定範例見下方「我的設定」段落）。

ClawHub 社群另有 3000+ 個第三方 Skills，但第三方的安全風險另當別論（見<a href="/zh-TW/blog/2026-02-04-is-openclaw-safe-security-guide" target="_blank">安全指南</a>）。

以下按使用場景分類。

### 📝 筆記管理

筆記相關有 4 個 Skill：`obsidian`、`notion`、`apple-notes`、`bear-notes`。但能不能用取決於你的部署方式。

`apple-notes` 和 `bear-notes` 只能在 Mac 上本機跑，OpenClaw 裝在 VM 的話直接排除。`obsidian` 操作的是本地檔案。我自己用 Obsidian，但 vault 在本機、OpenClaw 在 Azure VM，中間隔了一層，所以筆記這塊我用本機的 Claude Code 協作，不經過 OpenClaw。如果你希望 OpenClaw 直接幫你管筆記，而它又跑在 VM 上，`notion` 是雲端服務，不受部署位置限制，最沒有障礙。

### ✅ 工作生產力

Email 有兩個 Skill：`gog` 和 `himalaya`。`gog` 整合整個 Google Workspace（Gmail、Calendar、Tasks、Drive、Docs、Sheets），`himalaya` 走 IMAP/SMTP，只管收發信。如果你用 Google，直接選 `gog`——功能更完整，而且可以隨時從 Google 帳戶撤銷存取。我全開了，因為工作上都用得到。

任務管理有 `things-mac`（Things 3）、`apple-reminders`、`trello`，但如果你已經裝了 `gog`，Google Tasks 就包含在內，不需要額外裝。

### 💬 即時通訊 & 社群媒體

`wacli`（WhatsApp）、`imsg`（iMessage）、`bird`（X/Twitter）、`slack`、`discord`——這些 Skill 讓 OpenClaw 深度操作各平台，包括搜尋歷史訊息、同步對話記錄、管理頻道等。跟 `message` tool（只負責發訊息）不同，裝了這些等於讓它完整存取你在該平台上的資料。

我一個都沒裝。對外溝通的最後一步，一定自己來。

### 🐙 開發者工具

- `github`：透過 `gh` CLI 操作 GitHub，需要 OAuth，權限可控
- `tmux`：管理多個終端 session
- `session-logs`：搜尋和分析過去的對話記錄
- `coding-agent`：在背景呼叫其他 AI 編程助手（Codex、Claude Code 等）

我有裝 `github`、`tmux`、`session-logs`。寫程式碼在本地用 Claude Code，但 OpenClaw 隨時都能透過 Telegram 操作——例如人在外面，CI/CD 突然掛了，直接在手機問「幫我看一下這個 PR 為什麼 build fail」，它就會去查 GitHub Actions 的 error log，告訴你原因。

`coding-agent` 目前沒裝，但這塊潛力很大——可以在 OpenClaw 的 VM 上安裝 Claude Code，讓 OpenClaw 在背景調用它處理編程任務。想像一下：你在 Telegram 跟 OpenClaw 說「我在 GitHub 上看到這個 repo 很有趣，幫我 clone 下來、研究一下、做成一個可以 demo 的網站」，它就自動啟動 Claude Code 執行，完成後推送通知給你。等於讓 AI 協調 AI。我還沒深入研究，有空再來試試能不能整合到工作流。

### 🔐 密碼管理

`1password` 讓 OpenClaw 存取你的 1Password 密碼庫——幫你查密碼、自動登入、填寫表單。使用情境像是：「幫我登入 AWS Console」或「這個網站的密碼是什麼」。

但它的權限模式是一旦授權就是整個密碼庫，沒辦法只開放某幾組密碼，你存了什麼它就能讀什麼。我選擇不裝。如果真的需要，可以建立「AI 專用 vault」，只放可以讓 AI 存取的密碼。

### 🎨 其他場景

上面是我有在用或認真考慮過的分類。其餘像音樂播放、智慧家居、圖片生成、語音轉文字、外送等場景，我都沒裝，完整清單見文末附錄。

---

## 我的 OpenClaw 設定：怎麼根據需求配置 Tools 和 Skills

我的 OpenClaw 跑在 Azure VM 上，透過 Telegram 操作。搭配桌面端的 Claude Code，形成移動端 + 桌面端的雙系統工作流——移動端隨時討論、研究、捕捉想法，對話記錄自動同步，桌面端直接接手執行。日常還用它管 Email、行事曆、查資料，以及每天早上推送 Daily Brief。

以下是我目前的設定，以及每個選擇背後的原因。

### Tools（25 個開了 21 個）

我的判斷原則很簡單：**想不到使用場景的就不開。**

```json
{
  "tools": {
    "allow": [
      "read", "write", "edit", "apply_patch",
      "exec", "process",
      "web_search", "web_fetch",
      "browser", "image",
      "memory_search", "memory_get",
      "sessions_list", "sessions_history", "sessions_send", "sessions_spawn", "session_status",
      "message", "cron", "gateway", "agents_list"
    ],
    "deny": ["nodes", "canvas", "llm_task", "lobster"]
  },
  "approvals": {
    "exec": { "enabled": true }
  }
}
```

**開了 21 個，關了 4 個**：`nodes`（想不到場景）、`canvas`（用不到）、`llm_task` / `lobster`（沒用工作流引擎）。`exec` 開審批，`message` 只用來傳給自己。

### Skills（53 個只開 9 個）

前面提過，bundled Skills 預設全部自動載入。我用 `allowBundled` 白名單限制只開需要的：

```json
{
  "skills": {
    "allowBundled": [
      "gog", "github", "tmux", "session-logs",
      "weather", "summarize", "clawhub",
      "healthcheck", "skill-creator"
    ]
  }
}
```

簡單來說：`gog` 管 Email 和行事曆、`github` 管 repo、其餘是 Daily Brief 和系統管理用的基礎工具。

---

## 下一步：開始設定你的 OpenClaw

25 個 Tools 不用全開，53 個 bundled Skills 預設全開——用 `allowBundled` 只留你需要的。打開你的 `openclaw.json`，從這三個原則開始：

1. **想不到場景的就不開**
2. **能力越大，管控越嚴**——`exec` 開審批，`message` 只傳給自己
3. **最後一哩自己來**——結帳、發訊息、發文，收不回來的操作不交給 AI

我的配置可以直接當起點，複製上去再根據自己的需求刪減。安全設定的部分，搭配<a href="/zh-TW/blog/2026-02-04-is-openclaw-safe-security-guide" target="_blank">安全指南</a>一起看。

OpenClaw 對我來說不只是工具——它是讓一個人能做到一整個團隊事情的基礎建設。我相信在 AI 時代，一個人就能打造一間公司。我正在用自己的經歷證明這件事——從產品開發到行銷成長到生活管理，全部一個人。每一步怎麼做到的，我都寫進電子報裡。<a href="/zh-TW/" target="_blank">訂閱</a>，一起見證。

---

## 常見問題 FAQ

### Skills 安裝後權限會改變嗎？

不會。Skills 只是教科書，真正控制能力的是 `tools.allow`。

### 1password Skill 真的能讀取所有密碼嗎？

是的。一旦授權，整個密碼庫都能存取——你存了什麼它就能讀什麼。

### 如何撤銷 gog 的 Google 存取權限？

[Google 帳戶](https://myaccount.google.com/) → 安全性 → 第三方應用程式存取權 → 找到 gog → 移除。

### ClawHub 的第三方 Skills 安全嗎？

不能預設安全。安裝前務必審查 GitHub repo。詳細的審查方法和 prompt，請見<a href="/zh-TW/blog/2026-02-04-is-openclaw-safe-security-guide" target="_blank">安全指南</a>。

### 為什麼是 25 個 Tools？

官方文檔列 18 個，我從 codebase 整理出 25 個。多出來的是 session 相關、`agents_list`、以及工作流引擎（`llm_task`、`lobster`）等文檔沒列的 Tools。

### OpenClaw 跟 ChatGPT 有什麼不同？

ChatGPT 是聊天工具，OpenClaw 是 Agent。差別在「聊完之後」：

- **ChatGPT**：討論完，你要手動複製內容、貼到別的地方。它只能跟你聊天。
- **OpenClaw**：討論完，它可以接著幫你做事——上網查資料、讀寫文件、操作日曆、讀你的 Gmail 並草稿回覆、自動同步到電腦讓 Claude Code 接手執行。

連「同步」的意義都不同：LLM App 的同步是你在手機和電腦都能看到對話記錄；OpenClaw 的同步是對話記錄直接變成電腦資料夾裡的文件，其他工具可以直接讀取、接手工作。一個是「看得到」，一個是「能接著用」。

如果你只是想聊天，ChatGPT 夠用。如果你想聊完之後讓 AI 接著幫你做事，那需要 OpenClaw 這種 Agent。

### OpenClaw 可以自動化哪些任務？

搭配 `cron`（排程）和 `message`（訊息推送）這兩個 Tools，OpenClaw 可以定時執行任務並把結果推送給你。我每天早上 6:47 會收到它整理好的 Daily Brief——今天要做什麼、有哪些待回覆的訊息、天氣預報。

除了定時推送，常見的自動化場景還包括：定期整理 Email 並摘要重點、監控 GitHub repo 的 CI/CD 狀態、定時收集特定主題的熱門討論整理成寫作素材、定期追蹤產業動態並摘要重點。基本上只要能拆成「觸發條件 + 執行步驟」的任務，OpenClaw 都能自動化。

### 不會寫程式也能用 OpenClaw 嗎？

日常使用完全不需要寫程式——你用自然語言跟它對話就好。「幫我查今天有什麼 Email」、「幫我排一個明天早上 9 點的提醒」，這些都是直接說就行。

但 OpenClaw 是開源專案，安裝和設定有門檻。你可以部署到雲端 VM，也可以本機安裝——但基於安全性，建議用一台獨立的機器來跑，不要裝在你的主力電腦上。安裝過程中如果有在用 Claude Code 之類的 AI CLI 工具，可以讓它協助你完成設定，會省很多摸索的時間。

建議搭配這三篇一起看：<a href="/zh-TW/blog/2026-02-01-openclaw-deploy-cost-guide" target="_blank">部署成本全攻略</a>搞清楚要花多少錢、<a href="/zh-TW/blog/2026-02-04-is-openclaw-safe-security-guide" target="_blank">安全指南</a>搞清楚怎麼防護、這篇搞清楚功能怎麼配。

---

## 附錄：完整清單

<details>
<summary>📦 點擊展開 25 個 Tools 完整表格</summary>

| Layer | Tool | 功能 | 風險 |
|-------|------|------|------|
| 1 | `read` | 讀取檔案 | 🟢 低 |
| 1 | `write` | 寫入檔案 | 🟡 中 |
| 1 | `edit` | 結構化編輯 | 🟡 中 |
| 1 | `apply_patch` | 套用 patch | 🟡 中 |
| 1 | `exec` | 執行命令 | 🔴 極高 |
| 1 | `process` | 管理程序 | 🟡 中 |
| 1 | `web_search` | 搜尋 | 🟢 低 |
| 1 | `web_fetch` | 抓取網頁 | 🟡 中 |
| 2 | `browser` | 瀏覽器操作 | 🟠 高 |
| 2 | `canvas` | 視覺化工作區 | 🟢 低 |
| 2 | `image` | 圖片分析 | 🟢 低 |
| 2 | `memory_search` | 搜尋記憶 | 🟡 中 |
| 2 | `memory_get` | 取得記憶 | 🟡 中 |
| 2 | `sessions_list` | 列出 session | 🟢 低 |
| 2 | `sessions_history` | 對話歷史 | 🟡 中 |
| 2 | `sessions_send` | 發送訊息 | 🟠 高 |
| 2 | `sessions_spawn` | 啟動子 Agent | 🟠 高 |
| 2 | `session_status` | 狀態檢查 | 🟢 低 |
| 2 | `message` | 跨平台訊息 | 🔴 極高 |
| 2 | `nodes` | 硬體控制 | 🔴 極高 |
| 2 | `cron` | 排程任務 | 🟠 高 |
| 2 | `gateway` | Gateway 管理 | 🟠 高 |
| 2 | `agents_list` | 列出 Agent | 🟢 低 |
| Ext | `llm_task` | 工作流 LLM 步驟 | 🟡 中 |
| Ext | `lobster` | 工作流引擎 | 🟡 中 |

</details>

<details>
<summary>🎯 點擊展開 53 個 Skills 完整表格</summary>

| 場景 | Skill | 平台/功能 | 風險 |
|------|-------|-----------|------|
| 📝 筆記 | `obsidian` | Obsidian | 🟢 低 |
| 📝 筆記 | `notion` | Notion | 🟡 中 |
| 📝 筆記 | `apple-notes` | Apple Notes | 🟢 低 |
| 📝 筆記 | `bear-notes` | Bear | 🟢 低 |
| ✅ 任務 | `things-mac` | Things 3 | 🟢 低 |
| ✅ 任務 | `apple-reminders` | Reminders | 🟢 低 |
| ✅ 任務 | `trello` | Trello | 🟡 中 |
| 📧 工作 | `gog` | Google Workspace | 🟡 中 |
| 📧 工作 | `himalaya` | IMAP/SMTP | 🔴 高 |
| 💬 通訊 | `slack` | Slack | 🟡 中 |
| 💬 通訊 | `discord` | Discord | 🟡 中 |
| 💬 通訊 | `wacli` | WhatsApp | 🔴 極高 |
| 💬 通訊 | `imsg` | iMessage | 🔴 極高 |
| 💬 通訊 | `bluebubbles` | iMessage (外部) | 🟠 高 |
| 🐦 社群 | `bird` | X (Twitter) | 🔴 極高 |
| 🐙 開發 | `github` | GitHub | 🟡 中 |
| 🐙 開發 | `coding-agent` | AI 編程 | 🟡 中 |
| 🐙 開發 | `tmux` | 終端機 | 🟢 低 |
| 🐙 開發 | `session-logs` | 記錄搜尋 | 🟢 低 |
| 🎵 音樂 | `spotify-player` | Spotify | 🟢 低 |
| 🎵 音樂 | `sonoscli` | Sonos | 🟢 低 |
| 🎵 音樂 | `blucli` | BluOS | 🟢 低 |
| 💡 家居 | `openhue` | Philips Hue | 🟢 低 |
| 💡 家居 | `eightctl` | Eight Sleep | 🟢 低 |
| 🍔 外送 | `food-order` | 多平台 | 🟠 高 |
| 🍔 外送 | `ordercli` | Foodora | 🟡 中 |
| 🎨 創作 | `openai-image-gen` | OpenAI 圖片 | 🟢 低 |
| 🎨 創作 | `nano-banana-pro` | Gemini 圖片 | 🟢 低 |
| 🎨 創作 | `video-frames` | 影片截圖 | 🟢 低 |
| 🎨 創作 | `gifgrep` | GIF 搜尋 | 🟢 低 |
| 🎙️ 語音 | `sag` | ElevenLabs TTS | 🟢 低 |
| 🎙️ 語音 | `openai-whisper` | 語音轉文字 | 🟢 低 |
| 🎙️ 語音 | `openai-whisper-api` | 雲端 STT | 🟢 低 |
| 🎙️ 語音 | `sherpa-onnx-tts` | 離線 TTS | 🟢 低 |
| 🔐 密碼 | `1password` | 1Password | 🔴 極高 |
| 🤖 AI | `gemini` | Gemini | 🟢 低 |
| 🤖 AI | `oracle` | Oracle CLI | 🟢 低 |
| 🤖 AI | `mcporter` | MCP 整合 | 🟡 中 |
| 🛠️ 系統 | `clawhub` | Skill 管理 | 🟢 低 |
| 🛠️ 系統 | `skill-creator` | 建立 Skill | 🟢 低 |
| 🛠️ 系統 | `healthcheck` | 安全檢查 | 🟢 低 |
| 🛠️ 系統 | `summarize` | 摘要 | 🟢 低 |
| 🛠️ 系統 | `weather` | 天氣 | 🟢 低 |
| 📍 地點 | `goplaces` | Google Places | 🟢 低 |
| 📍 地點 | `local-places` | 本地 proxy | 🟢 低 |
| 📸 媒體 | `camsnap` | RTSP 相機 | 🟡 中 |
| 📰 資訊 | `blogwatcher` | RSS 監控 | 🟢 低 |
| 📄 文件 | `nano-pdf` | PDF 編輯 | 🟢 低 |
| 📊 監控 | `model-usage` | 用量追蹤 | 🟢 低 |
| 🖥️ 系統 | `peekaboo` | macOS UI | 🟠 高 |
| 📞 通訊 | `voice-call` | 語音通話 | 🟠 高 |
| 🎨 創作 | `canvas` | Canvas 操作 | 🟢 低 |
| 🎵 音樂 | `songsee` | 音頻視覺化 | 🟢 低 |

</details>

<details>
<summary>⚡ Tool Groups 快捷</summary>

| Group | 包含 |
|-------|------|
| `group:fs` | read, write, edit, apply_patch |
| `group:web` | web_search, web_fetch |
| `group:ui` | browser, canvas |
| `group:memory` | memory_search, memory_get |
| `group:sessions` | sessions_list, sessions_history, sessions_send, sessions_spawn, session_status |
| `group:messaging` | message |
| `group:nodes` | nodes |
| `group:automation` | cron, gateway |

</details>

---

## 延伸閱讀

- <a href="/zh-TW/blog/2026-02-04-is-openclaw-safe-security-guide" target="_blank">OpenClaw 安全嗎？5 個必做的安全設定</a>
- <a href="/zh-TW/blog/2026-02-01-openclaw-deploy-cost-guide" target="_blank">OpenClaw 部署成本全攻略：$0-8/月打造你的 AI 助理</a>
- <a href="/zh-TW/blog/claude-code-tutorial" target="_blank">Claude Code 教學：5 分鐘完成安裝與第一個任務</a>

---

*最後更新：2026-02-05*
