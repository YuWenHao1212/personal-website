---
title: "為什麼我要花 $3 美金，把 Claude Code 從筆電搬到雲端"
description: "把 Claude Code 從「要坐在電腦前」變成「手機隨時隨地可用」的個人 Agent 基礎設施規劃。從 $3 VPS、K3S Pod、Tailscale，到未來 Mac Mini 24h 常開的完整路徑。"
pubDate: 2026-04-07
category: ai-productivity
tags: ["AI Agent", "Claude Code", "個人基礎設施", "Discord Bot", "K3S"]
lang: zh-TW
featured: false
heroImage: /images/blog/agent-infra/hero.webp
---

## 一個我每天都遇到的小問題

我每天通勤、散步、排隊等咖啡的時候，常常冒出這種念頭：

「啊，這個想法要記到日記裡。」
「等等，今天到底排了什麼會議？」
「昨天那個客戶的 email 我回了沒？」

過去的解法：拿 iPhone 打開 Obsidian 寫一段、切到 Calendar 看一下、再切到 Gmail 翻一下。三個 App 跳來跳去，靈感早就忘了一半。

而我桌上那台 MacBook，裝了 Claude Code，掛了一堆我自己寫的工具——Vault MCP、Email、Calendar、Analytics——只要我坐在電腦前，一句「規劃今天」它就能幫我把這些事情全部串起來。

問題就是：**我必須坐在電腦前。**

這篇是我這兩天研究 Pahud Dev 的 7 支 YouTube 影片、加上 4/1 和他面對面聊完之後，整理出來的個人 Agent 基礎設施規劃。目標只有一個——

**把 Claude Code 能做的所有事，從「要坐在電腦前」變成「手機隨時隨地」。**

---

## 想像中的畫面

```
捷運上 → Discord 說「規劃今天」
       → Claude Code 讀 Vault、查 Calendar、看 Email
       → 回你一份今日 briefing

散步時 → Discord 說「把這個想法記到日記」
       → Claude Code 寫入 FLUX Vault
       → iCloud 同步到 iPhone，10 秒後我自己也看得到
```

聽起來像科幻？其實 Phase 0 只要半天 + 每月 $3 美金就能做到。

---

## 為什麼是 VPS，不是直接讓 MacBook 對外？

我一開始的直覺方案很蠢：**MacBook 開個 port，手機直接連回家。**

這方案有三個致命問題：

1. **MacBook 蓋上就斷了。** 我會帶筆電出門，沒有「永遠在家」這件事。
2. **家裡網路斷了就斷了。** 那一刻 Agent 變成廢鐵。
3. **要 NAT 穿透、要動態 DNS、要 SSL 憑證……** 一堆運維工作只為了一個個人專案。

Pahud 的設計給了我答案：**Agent 永遠住在 VPS，不搬。**

VPS 的角色是「永遠在線、永遠可被 Discord 找到」的入口。它就一個 $3/月的小機器，做的事情很單純：收 Discord 訊息 → 啟動 Claude Code → 把回應流回 Discord。

家裡網路斷了？沒差，VPS 還在，Agent 還能跟你純對話。
我帶筆電出差？沒差，VPS 還在。

未來 Mac Mini 上線之後，VPS 也不會退役。它從頭到尾都是我這套系統的「大門」。

---

## 第二個關鍵決策：一開始就用 K3S + Pod

這點是 Pahud 在影片裡反覆強調的，我聽了三次才完全理解他的意思。

直覺上你會想：「我就一個人用，幹嘛搞 Kubernetes？直接 `node index.js` 不就好了？」

Pahud 的反駁是：**現在裸跑很爽，之後就回不去了。**

- 之後想加一個給太太用的 Bot？裸跑就要重寫 process 管理。
- 之後想商業化、給客戶開 Pod？裸跑就要砍掉重練。
- 之後想從個人 VPS 搬到 AWS Fargate（micro-VM 隔離）？裸跑就要全部重來。

如果一開始就在 Pod 裡跑，這些「之後」全部都只是 `helm install` 一行指令。Pod 不是「機器」，它是同一台機器裡的 process group——一台 $3 的 VPS 可以塞 2-3 個 Pod，成本不變。

這就是「**為未來的自己降低切換成本**」。一次性的 setup 成本換 N 次的零成本擴展。值。

---

## 完成態長這樣

```
你（手機 Discord）
  ↕
VPS ($3/月, K3S, 永久不搬)
  ├─ Pod: Agent Broker（Discord ↔ Claude Code）
  ├─ Claude Code（ACP mode）
  └─ Tailscale
      ↕ MCP over Tailscale VPN
Mac Mini（家裡常開，不接螢幕鍵盤）
  ├─ FLUX Vault（iCloud 即時同步）
  ├─ Vault MCP Server（只 listen Tailscale IP）
  ├─ Email / Calendar / Analytics MCP tools
  └─ launchd 開機自動啟動
```

三層：**手機**是介面、**VPS** 是 Agent 的家、**Mac Mini** 是工具和資料的家。中間靠 Tailscale 把兩台機器接成一個私有網路。

---

## 漸進式路徑：四個 Phase

我刻意把整個計畫切成四個 Phase，每個 Phase 都有獨立價值，每個 Phase 結束都能用。不貪心、不一次到位。

### Phase 0：讓 Discord 的 Bot 會回應（半天，$3）

**只做一件事**：手機 Discord @Bot，VPS 的 K3S Pod 裡的 Claude Code 會回應你。

不接 Vault、不接 Email、不接任何工具。**純對話。**

為什麼這麼克制？因為這個階段我要驗證的是：Discord ↔ Agent Broker ↔ Claude Code 這條鏈路通不通。一次驗證一件事，出問題才知道是哪裡壞掉。

關鍵元件：
- **Zeabur** 的 2V4G VPS（東京區，$3/月）
- **K3S**（一行 `curl | sh` 安裝）
- **Discord Bot**（developer portal 建一個，記得勾 Message Content Intent）
- **Agent Broker**（Pahud 寫的 Rust 程式，Helm Chart 一行部署）

```bash
helm install my-agent agent-broker/agent-broker \
  --set discord.botToken="$DISCORD_BOT_TOKEN" \
  --set discord.allowedChannels[0]="CHANNEL_ID" \
  --set agent.preset=claude
```

進 Pod 跑一次 `claude setup-token` 把 Anthropic 訂閱認證進去，就完成了。

### Phase 1：接上 FLUX Vault（一天）

VPS 上的 Agent 要能讀寫我家 MacBook 上的 Obsidian Vault。

中間隔著家裡的 NAT 怎麼辦？答案是 **Tailscale**——一個基於 WireGuard 的零設定 VPN。MacBook 和 VPS 各裝一次，兩台機器就有了 100.x.x.x 的私有 IP，互相直接通。

然後在 MacBook 上寫一個 **Vault MCP Server**，只 listen 在 Tailscale IP 上（**不暴露公網**，這是 Pahud 在 OpenClaw EP2 講的 Security by Design 原則）。

Expose 給 Agent 的工具就四個：

- `read_note(path)` — 讀檔
- `write_note(path, content)` — 寫檔
- `search_vault(query)` — 全文搜尋
- `list_daily_notes()` — 最近的 daily notes

驗證很簡單：**Discord 說「把這個想法記到今天的日記」→ MacBook 上的 Vault 多一個檔案 → iCloud 同步到 iPhone → 我自己 10 秒後也看得到。**

### Phase 2：接 Email / Calendar / Analytics

我已經有現成的 CLI 工具了——`email_ops.py` 管三個信箱、`gws` + `gog` 管三個 Calendar 帳號、Umami 的 API 看流量。

這個 Phase 就是把它們**包成 MCP Server**。基本上就是寫一層薄薄的 wrapper，把 CLI 的輸出轉成 MCP 的 schema。一個工具半天，幾天搞定。

完成之後我在 Discord 就能說：

- 「今天有什麼 email 要處理」
- 「下午三點到五點我有空嗎」
- 「昨天網站流量怎樣」

### Phase 3：Mac Mini 上線，MacBook 終於可以蓋上

Phase 1 和 2 有一個明顯的限制：**MacBook 不能關機**。

解法是買一台 Mac Mini，放家裡常開、不接螢幕鍵盤。把所有 MCP Server 從 MacBook 搬到 Mac Mini，用 launchd 設定成開機自動啟動。

注意——**只搬 Vault 和 MCP tools，不搬 Agent**。Agent 永遠住在 VPS 上。Mac Mini 只是「工具的家」。

iCloud 會自動把 MacBook 和 Mac Mini 上的 Vault 即時同步。Git 操作仍然只從 MacBook 做（避免兩台 Mac 同時 push 衝突）。

這個 Phase 的改動其實很小——只是把 VPS 上的 MCP endpoint 從「MacBook 的 Tailscale IP」換成「Mac Mini 的 Tailscale IP」。成本：Mac Mini 約 $500 一次性。

---

## 八條設計原則

整套規劃背後，我從 Pahud 的影片和座談裡濃縮了八條原則。這些原則彼此呼應，缺一個整套都會卡：

1. **CLI 是唯一的 Interface** — 不自己打指令，全部透過 AI CLI 操作。
2. **一開始就 Pod 化** — 養成在 Pod 裡跑的習慣，加人或切 micro-VM 零成本。
3. **Security by Design** — 預設 bind Tailscale IP / loopback，不暴露公網。
4. **Decouple Browser** — Agent 需要瀏覽器時用遠端的，不消耗本機資源。
5. **Stay Relevant** — `agents.md` / `soul.md` / `CLAUDE.md`，每次新 Session 都讀。
6. **寫文件給 Agent 看** — How-to 設計給 Agent 讀，Agent 自動導引配置。
7. **配好後寫成 Skill** — Agent 學到東西就提取成 SKILL.md。
8. **漸進式 Tune** — 犯錯 → 修正 → 寫回 Steering Docs。

我覺得最反直覺的是第六條：「寫文件給 Agent 看」。過去我寫 README 是給「未來的自己或其他工程師」看。現在 Pahud 的做法是——README 的第一個讀者是 **Agent**。Agent 讀完 README 就能自動把環境配起來。

---

## 為什麼我覺得這件事重要

說實話，如果只是「在手機上跟 AI 聊天」，那 Claude App 早就有了。我為什麼還要折騰這套東西？

三個理由：

**第一，我的工具是我自己的。** Vault 是我的、Email credentials 是我的、Calendar OAuth token 是我的。我不想把這些東西交給某個第三方平台。VPS + Tailscale 的方案，所有資料都在我自己的機器上流動。

**第二，這套架構可以長大。** 今天是我一個人用、Discord 對話。明天可能是我太太也想用、可能要接 LINE、可能要加 Browser Agent 自動訂日本飯店。每一步都只是 `helm install` 多一個 Pod，架構不用動。

**第三，這是我學 Cloud Native 最便宜的學費。** $3 美金一個月，我就能在真實環境裡碰 K3S、Helm、Tailscale、MCP、ACP。比起讀一本 Kubernetes 的書，這個學習迴路快太多了。

---

## 接下來

這篇文章寫完的時候，Phase 0 我已經跑通了。Discord 的 Bot 已經會回應，Pod 已經在 Zeabur 的東京機房裡跑著。

接下來的幾週我會慢慢推 Phase 1（Vault MCP）和 Phase 2（Email / Calendar）。每個 Phase 完成我都會寫一篇實作筆記，記錄踩到的坑和解法。

如果你也對「個人 Agent 基礎設施」這件事有興趣，歡迎來信跟我聊聊。我特別想知道——

**你最想讓 Agent 在手機上幫你做什麼？**

---

## 參考資料

- Pahud Dev YouTube 頻道（AgentCore 入門 EP01-03、Agent Browser、OpenClaw EP1-2、Agent Broker）
- [Agent Broker repo](https://github.com/thepagent/agent-broker)
- [Tailscale](https://tailscale.com)
- [ACP（Agent Client Protocol）](https://github.com/anthropics/agent-protocol)
