---
title: "OpenClaw 部署成本全攻略：$0-8/月打造你的私人 AI 助理"
description: "2026 年 3 月更新。OpenClaw 雲端部署成本完整分析：VM 選擇、LLM API 定價比較（含 GPT-OSS-120B、GPT-5.4、Gemini 3）、Agent token 用量基準、Heartbeat 隱藏成本。幫你找到最適合的組合。"
pubDate: 2026-02-01
updatedDate: 2026-03-17
category: building-products
tags: ["AI", "獨立開發者", "數位工具", "OpenClaw", "self-hosted AI"]
lang: zh-TW
translationKey: openclaw-deploy-cost-guide
featured: true
relatedPosts: ["personal-panopticon.md", "free-azure-startup-credits.md", "openclaw-tools-skills-tutorial.md"]
heroImage: /images/blog/openclaw-deploy-cost.webp
keywords: ["OpenClaw deploy", "OpenClaw hosting cost", "Oracle Cloud free tier", "Hetzner VPS", "LLM API pricing", "self-hosted AI agent", "personal AI assistant", "GPT-OSS-120B", "OpenClaw heartbeat cost"]
faq:
  - question: "OpenClaw 部署一個月要花多少錢？"
    answer: "取決於你選的 LLM 模型和 VM。免費方案（Oracle Cloud + Gemini 免費額度）$0/月；超低成本方案（Oracle + GPT-OSS-120B）約 $2-5/月；日常工作（Hetzner + GPT-OSS-120B）約 $7/月；旗艦體驗（Hetzner + Opus 4.6）可達 $330/月。可以從 GPT-OSS-120B 開始試，不夠再升級。"
  - question: "OpenClaw heartbeat 是什麼？會額外花錢嗎？"
    answer: "Heartbeat 是 OpenClaw 預設開啟的背景機制，每 30 分鐘自動送一次 LLM 請求檢查狀態。每次消耗 8K-15K input tokens。用旗艦模型時，光 heartbeat 就可能 $30-100/月。可以用 every: 0m 關掉，或開啟 isolatedSession + lightContext 省 90%。"
  - question: "GPT-OSS-120B 適合跑 OpenClaw 嗎？"
    answer: "非常適合。GPT-OSS-120B 是 OpenAI 開源的 117B MoE 模型，tool calling 能力超越 o4-mini（TauBench 68% vs 65%），API 定價只要 $0.039/$0.10 per 1M tokens，日常使用月費約 $2。是目前 OpenClaw 性價比最高的選擇。"
  - question: "Oracle Cloud 免費方案真的永久免費嗎？"
    answer: "是的，Oracle Cloud Always Free ARM 資源（最多 4 OCPU + 24 GB RAM）永久免費，不是 12 個月試用。但建議升級到 Pay As You Go 並設定 Budget Alert，避免帳號因閒置被回收。"
---

## TL;DR

| 路線 | 硬體方案 | LLM API | 月成本 |
|------|----------|---------|--------|
| **🆓 免費試用** | Oracle Cloud ARM | Gemini 2.5 Flash 免費額度 | **$0** |
| **💰 超低成本** | Oracle Cloud ARM | GPT-OSS-120B | **約 $2-5** |
| **⚖️ 日常工作** | Hetzner CAX11 | GPT-OSS-120B | **約 $7** |
| **🚀 旗艦體驗** | Hetzner CAX11 | GPT-5.4 / Sonnet 4.6 / Opus 4.6 | **約 $140-330** |
| **🏠 本地部署** | Mac Mini M4 | 任選 | **一次性 $599+** |

> 月成本 = VM 費用 + LLM API（任務 + heartbeat）。Token 用量基準和計算方式見 [Part 2](#part-2llm-api-pricing)。

---

## 前言

「這是我用過最接近 JARVIS 的東西。」

這句話最近在開發者圈瘋傳，說的是 [OpenClaw](https://openclaw.ai/)——一個開源的 **AI agent framework**，讓你擁有 24 小時待命的 personal AI assistant，隨時在 Telegram、Discord、WhatsApp 回應你。

超過 **25 萬顆 GitHub stars**（60 天內超越 React，全 GitHub 軟體專案排名第一）、TikTok 上的 demo 影片瘋傳——被開發者稱為「最接近 JARVIS 的東西」。但很多人卡在一個問題：

> 「擁有自己的 JARVIS，OpenClaw hosting cost 是多少？」

### 跑一個 AI Bot 需要什麼？

想像你要開一間 24 小時營業的咖啡店。

首先，你需要**一間店面**——可以買，也可以租。這就是「硬體」，讓 OpenClaw 程式跑起來的電腦。

**買店面（本地部署）**？不少人選擇 Mac Mini M4，不到 2 萬台幣、省電又安靜；或者直接用家裡閒置的舊電腦。好處是一次性購買、資料在自己手上，但要自己處理斷電、網路、24 小時開機的問題。

**租店面（雲端主機）**？電腦放在 Amazon、Google 等機房，透過網路操作。不用維護硬體、24 小時穩定運作，最低只要 **$0～$4/月**——但每月要付租金。

> 💡 有閒置舊電腦？本地部署幾乎零成本。沒有的話，雲端 CP 值更高。**本文重點是「租」——幫你找到最便宜的雲端方案。**

店面有了，你還需要**請一位咖啡師**。OpenClaw 本身只是一個「框架」——你需要接上 AI 大腦，它才會思考、回答。這個 AI 大腦就是 **LLM（Large Language Model）**，像 ChatGPT、Claude、Gemini 都是。

> 💡 咖啡師有兩種請法：
> - **自己泡（Local LLM）**：AI 跑在你的電腦上，不用付 API 費。即溶咖啡（7B 小模型）普通電腦能跑，但能力有限；想要大師級（70B+）就需要高階 GPU，成本動輒數萬元
> - **叫外送（API LLM）**：AI 在雲端，用多少付多少，普通電腦就能點到頂級咖啡師
>
> 本文聚焦 **API LLM**——硬體門檻最低、不需要額外投資顯卡。

外送咖啡師有貴有便宜：
- 💰 便宜但夠用：GPT-OSS-120B、Gemini Flash
- 👑 貴但更強：GPT-5.4、Claude Sonnet / Opus

那咖啡師怎麼收費？**按處理的文字量算**——這叫 token。

- 你傳給 AI 的訊息 = input tokens
- AI 回覆你的內容 = output tokens（通常比較貴，因為「產出」比「閱讀」費工）

點單越複雜、回覆越長，費用越高。但 agent 的用量比你想像的大——因為每次任務都要帶上 system prompt、工具定義、對話歷史，而且一個任務通常要跑 3-8 輪 LLM call。後面會詳細算給你看。

---

基本概念有了，開始算帳——本文聚焦「租店面 + 叫外送」的組合：

- **雲端硬體**：租一台遠端電腦跑 OpenClaw
- **API LLM**：叫外送咖啡師處理訊息

目標：**幫你算清楚每種組合的真實成本**，從免費到旗艦都攤開。

---

## Part 1：雲端硬體要花多少錢？

---

### OpenClaw 最低硬體需求是什麼？

根據 [OpenClaw 官方文件](https://docs.openclaw.ai/help/faq)：

| 項目 | 最低需求 | 建議規格 | 瀏覽器自動化 |
|------|----------|----------|-------------|
| **vCPU** | 2 | 2-4 | 4+ |
| **RAM** | 2 GB | 4 GB | 8 GB |
| **Storage** | 2 GB | 10 GB+ | 40 GB+ |
| **OS** | Ubuntu 22.04+ / macOS | Ubuntu 24.04 | - |
| **依賴** | Node.js ≥ 22 | Docker（可選） | Docker 24+ |

> 💡 **官方說法**：OpenClaw Gateway 很輕量，**Raspberry Pi 4 都能跑**。
> 但如果你要跑多個 channel、browser automation 或 media tools，建議 4GB+ RAM。

> ⚠️ **實測經驗**：為了跑得順暢，建議至少 **2 vCPU + 4GB RAM**。v2026.3.13 新增的 Chrome DevTools attach mode（瀏覽器自動化）每個 instance 會額外吃 1-2 GB RAM。

---

### 哪家雲端最便宜？

| 廠商 | 方案 | vCPU | RAM | Storage | 月費 | 備註 |
|------|------|:----:|:---:|:-------:|------|------|
| **Oracle Cloud** | ARM Flex | 2 OCPU (4 vCPU) | 4 GB | 100 GB | **免費** | ⚠️ 有風險 |
| **Hetzner** | CAX11 | 2 | 4 GB | 40 GB | 約 $4 (~130 NTD) | ✅ 穩定首選（4/1 起漲至 約 $5） |
| **AWS** | t4g.small | 2 | 2 GB | EBS 另計 | $12.26 (~390 NTD) | 免費試用至 2026/12 |
| **GCP** | e2-small | 2 | 2 GB | 10 GB | $12.23 (~390 NTD) | - |
| **Azure** | B2s | 2 | 4 GB | 需另購 | $30.37 (~970 NTD) | 最貴 |

---

### 🏆 推薦方案 1：Oracle Cloud Free Tier（免費）

Oracle 提供業界最大方的免費方案：

**Always Free ARM 規格：**
- **4 OCPU（相當於 8 vCPU）+ 24 GB RAM**
- 200 GB Block Storage
- 10 TB/月 流量
- **永久免費**（不是 12 個月試用）

**建議配置：**

OpenClaw 不需要很多資源，2 OCPU (4 vCPU) + 4 GB RAM 就很夠用。當然，你也可以直接開滿 4 OCPU + 24 GB——反正都是免費的。

> 💡 **避免閒置回收**：升級到 Pay As You Go 帳戶。你現有的 Always Free 資源**完全不收費**，只有你自己手動創建超過限制的資源才會被收費。升級後不會因為閒置被停機。

**⚠️ 已知風險：** 如果你**沒有升級到 PAYG**，有用戶回報帳號無預警被終止——deployment 直接被清掉，救不回來。

**建議**：綁信用卡升級到 Pay As You Go。Always Free 資源仍然免費，帳號更穩定、不會被閒置回收。擔心被收費？在 OCI Console 設定 **Budget Alert**（例如 $1），超過就會收到 email 通知。

**結論**：升級 PAYG + 設定 Budget Alert，免費又安心。

---

### 🏆 推薦方案 2：Hetzner VPS CAX11（穩定平價）

如果你想要穩定、不想折騰：

| 方案 | vCPU | RAM | Storage | 月費 |
|------|------|-----|---------|------|
| CAX11 | 2 (ARM) | 4 GB | 40 GB NVMe | **約 $4 (~130 NTD)** |

價格透明、無隱藏費用、不會閒置回收、效能穩定。想要省心，選這個就對了。

> ⚠️ **漲價預告**：Hetzner 宣布 2026/4/1 起德國/芬蘭區域全面調漲，CAX11 從 €3.29 → €4.49（+36%）。漲幅不小，但仍是同規格最便宜的選擇。

---

### 三大雲比較（AWS / GCP / Azure）

如果你偏好主流雲端：

| 廠商 | 方案 | vCPU | RAM | Storage | 月費 |
|------|------|:----:|:---:|:-------:|------|
| **AWS** | t4g.small | 2 | 2 GB | 10 GB | 約 $13 |
| **GCP** | e2-small | 2 | 2 GB | 10 GB | 約 $13 |
| **Azure** | B2s | 2 | 4 GB | 10 GB | 約 $31 |

---

#### ⚠️ 三大雲的免費方案（規格偏低，不推薦）

AWS、GCP、Azure 也有免費方案，規格雖然**滿足 OpenClaw 最低需求**（1 vCPU + 1 GB），但在複雜任務時效能受限——例如跑多個 channel、browser automation 或處理大量訊息時，可能會卡頓。

| 廠商 | 方案 | 規格 |
|------|------|------|
| GCP | e2-micro | 1 vCPU, 1 GB |
| Azure | B1s | 1 vCPU, 1 GB |
| AWS Lightsail | 最低方案 | 1 vCPU, 512 MB |

如果只是輕度使用、想試試看，可以用。但長期穩定運作，建議選 2 vCPU + 2 GB 以上。

---

## Part 2：LLM API 要花多少錢？

### 該怎麼選模型？

1. **必須支援 Vision**（圖片解析）——OpenClaw 支援傳送圖片給 AI 分析，很實用
2. **Agent 能力要夠強**——OpenClaw 是 agent，不是 chatbot

第二點很重要。OpenClaw agent 需要準確的 tool calling、多步推理、以及在複雜任務中不放棄的能力。太弱的模型會讓 agent 選錯工具、任務做到一半繞圈，UX 很差。

> ⚠️ **不推薦用於 OpenClaw 的模型**：Qwen3 VL Flash、Gemini 2.5 Flash-Lite、GPT-4.1-mini——雖然便宜，但 tool calling 和多步推理能力不足。省了 API 費，賠了使用體驗。想了解 OpenClaw 的 25 個 Tools 和 53 個 Skills 怎麼運作，可以參考 [Tools & Skills 完整指南](/zh-TW/blog/openclaw-tools-skills-tutorial/)。

---

### LLM 推薦模型（支援 Vision + Agent 能力足夠）

> 價格單位：**USD / 1M tokens**｜按 input 價格排序

| 服務 | 模型 | Input | Output | 免費額度 | Agent 能力 |
|------|------|-------|--------|----------|-----------|
| **OpenAI** | GPT-OSS-120B | $0.039 | $0.10 | ❌ | ⭐⭐⭐⭐⭐ |
| **Google** | Gemini 2.5 Flash | $0.30 | $2.50 | ✅ 10 RPM, 250次/天 | ⭐⭐⭐ |
| **Google** | Gemini 3 Flash | $0.50 | $3.00 | ✅ 免費可用 | ⭐⭐⭐⭐ |
| **Google** | Gemini 2.5 Pro | $1.25 | $10.00 | ✅ 5 RPM, 100次/天 | ⭐⭐⭐⭐⭐ |
| **OpenAI** | GPT-5.2 | $1.75 | $14.00 | ❌ | ⭐⭐⭐⭐⭐ |
| **OpenAI** | GPT-4.1 | $2.00 | $8.00 | ❌ | ⭐⭐⭐⭐ |
| **OpenAI** | GPT-5.4 | $2.50 | $15.00 | ❌ | ⭐⭐⭐⭐⭐ |
| **Anthropic** | Claude Sonnet 4.6 | $3.00 | $15.00 | ❌ | ⭐⭐⭐⭐⭐ |
| **Anthropic** | Claude Opus 4.6 | $5.00 | $25.00 | ❌ | ⭐⭐⭐⭐⭐ |

> 💡 **GPT-OSS-120B 是什麼？** OpenAI 開源的 117B MoE 模型（Apache 2.0），每次只啟動 5.1B 參數，單張 H100 就能跑。在 TauBench（tool calling）上得分 68%，**超越 o4-mini 的 65%**；數學（AIME 2025: 97.9%）和程式碼（HumanEval: 92.1）也都是頂級水準。價格卻只有旗艦模型的 1/50。
>
> 💡 **免費額度說明**：
> - **RPM**（Requests Per Minute）= 每分鐘可發送的請求數
> - **次/天** = 每日請求上限，超過就要等隔天重置（太平洋時間午夜）
> - Google AI Studio 不綁卡即可使用，超過限制會被暫時擋住，不會收費

---

### Agent 一個月到底用多少 Token？

OpenClaw 的 LLM 費用來自兩個地方：

1. **任務消耗** — 你主動下指令、agent 幫你做事時產生的 token
2. **Heartbeat 消耗** — 就算你什麼都沒做，OpenClaw 也會在背景定期送 LLM 請求，檢查有沒有待辦事項

第一個你可以控制（少用就少花），第二個很多人根本不知道它存在。先來看任務消耗——很多成本估算只算「每天傳幾條訊息 × 每條幾百 token」，這嚴重低估了 agent 的實際消耗。

**OpenClaw agent 每次任務的 token 結構：**

| 組成 | Input tokens | 說明 |
|------|-------------|------|
| System prompt + 人設 | ~2K | 每次 LLM call 都送 |
| Tool definitions（25 個工具） | ~3-5K | 每次 LLM call 都送 |
| Skills context | ~1-3K | 啟用的 skill 描述 |
| 對話歷史（多輪累積） | ~2-10K | agent 每一步都帶著前面的 context |
| 使用者 input | ~0.5-1K | 你實際打的指令 |

Agent 一個任務通常要跑 **3-8 輪 LLM call**（思考→選工具→執行→判斷→再選→完成），所以一個中等任務就要吃掉 80K-150K input tokens。

**三種使用者 profile：**

| Profile | 每天任務數 | 月 input tokens | 月 output tokens |
|---------|-----------|----------------|-----------------|
| **輕度** | 5-10 次 | ~5M | ~1M |
| **日常** | 15-25 次 | ~20M | ~5M |
| **重度** | 40+ 次 | ~80M | ~20M |

---

### Heartbeat 是什麼？為什麼會偷偷燒錢？

Heartbeat 就像是你請的咖啡師每隔一段時間主動巡一圈：「有沒有新訂單？老闆有沒有交代什麼？」——即使店裡沒客人，他也會巡。

這個機制的用途是讓 OpenClaw 在你沒有主動下指令的時候，仍然能定期檢查待辦事項、讀取 HEARTBEAT.md 裡的排程任務（例如每天早上推送 Daily Brief）、或回報系統狀態。如果你有設定定時任務，heartbeat 就是驅動它們的引擎。

問題是：**heartbeat 預設是開啟的**，每 30 分鐘自動送一次 LLM 請求（Anthropic 帳號是 60 分鐘），即使你沒有設定任何排程任務。每次 heartbeat 都會送出完整的 workspace context（SOUL.md、AGENTS.md、MEMORY.md 等），消耗 8K-15K input tokens。

一天下來就是 ~38 次 × 15K = **~570K input tokens**，什麼都沒做就燒掉了。

> **省錢建議：**
> - 沒有排程任務？直接關掉：`every: "0m"`
> - 有排程但想省錢？開啟 `isolatedSession: true` + `lightContext: true`，每次 heartbeat 降到 ~2-5K tokens，省 90%

---

### 每個月實際要付多少？（含 Heartbeat）

以**日常使用者**（20M input / 5M output）+ **預設 heartbeat**（每日 ~570K input / ~19K output）計算：

| 模型 | 任務費 | Heartbeat 費 | **月總計（LLM only）** |
|------|--------|-------------|----------------------|
| GPT-OSS-120B | $1.28 | $0.72 | **約 $2** |
| Gemini 2.5 Flash | $18.50 | $5.27 | **約 $24** |
| Gemini 2.5 Pro | $75.00 | $29.25 | **約 $104** |
| GPT-5.2 | $105.00 | $30.75 | **約 $136** |
| GPT-4.1 | $80.00 | $22.38 | **約 $102** |
| GPT-5.4 | $125.00 | $35.48 | **約 $160** |
| Sonnet 4.6 | $135.00 | $52.73 | **約 $188** |
| Opus 4.6 | $225.00 | $99.75 | **約 $325** |

> 💡 Gemini 免費額度（2.5 Flash 250 次/天、2.5 Pro 100 次/天）對輕度使用者夠用，但 agent 模式下 100 次/天大約只撐 **10-15 個中等任務**。

---

## Part 3：哪種組合最適合你？

### 🆓 免費試用方案

| 項目 | 選擇 |
|------|------|
| 雲端 | Oracle Cloud ARM (2 OCPU + 4GB) |
| LLM | Google AI Studio Gemini 2.5 Flash 免費額度 |
| Heartbeat | 關掉（`every: "0m"`） |
| **月成本** | **$0** |
| 適合 | 想試試看、輕度使用（每日 10-15 個任務以內）|
| 限制 | Oracle 閒置回收風險、Gemini 每日 250 次 / 10 RPM |

> ⚠️ Gemini 2.5 Flash 的 agent 能力只有 ⭐⭐⭐——簡單任務沒問題，但複雜的多步驟操作可能會卡住或選錯工具。這個方案的目的是**零成本體驗 OpenClaw 的運作方式**，不是拿來當主力工具。體驗完覺得有用，建議升級到 GPT-OSS-120B 或更強的模型。

---

### 💰 超低成本方案（約 $2-5/月）

| 項目 | 選擇 |
|------|------|
| 雲端 | Oracle Cloud ARM (免費) |
| LLM | GPT-OSS-120B |
| Heartbeat | 開著也才 約 $0.72/月 |
| **月成本** | **約 $2-5 (~65-160 NTD)** |
| 適合 | 省錢但要真正能用的 agent 能力 |
| 風險 | Oracle 閒置回收 |

> 💡 GPT-OSS-120B 的 tool calling 能力超越 o4-mini，重度使用也才 約 $5/月。這是目前性價比最炸裂的組合。

---

### ⚖️ 日常工作方案（約 $7/月）

| 項目 | 選擇 |
|------|------|
| 雲端 | Hetzner CAX11 (約 $4-5) |
| LLM | GPT-OSS-120B |
| Heartbeat | 開著也才 約 $0.72/月 |
| **月成本** | **約 $7 (~225 NTD)** |
| 適合 | 每天穩定使用、工作整合，想要穩定 VM 不折騰 |
| 與超低成本的差別 | VM 從 Oracle（免費但有閒置回收風險）換成 Hetzner（穩定付費） |

> 💡 GPT-OSS-120B 的 agent 能力是 ⭐⭐⭐⭐⭐，日常工作完全夠用。$7/月 = 一杯咖啡的錢，換一個 24 小時待命的 AI agent。

---

### 🚀 旗艦體驗方案（約 $140-330/月）

| 項目 | 選擇 |
|------|------|
| 雲端 | Hetzner CAX11 (約 $4-5) |
| LLM | GPT-5.4 / Claude Sonnet 4.6 / Opus 4.6 |
| Heartbeat | 含在費用中（Opus heartbeat 就 約 $100/月） |
| **月成本** | **約 $144-330 (~4600-10500 NTD)** |
| 適合 | 最強推理、全天候自動化、對回覆品質要求極高 |
| 注意 | Opus 4.6 光 heartbeat 就 約 $100/月，確認你需要再開 |

> ⚠️ 從 $7 跳到 $140+，價格差 20 倍。差在哪？旗艦模型在**複雜推理、程式碼品質、細膩的語言理解**上確實更強，但對大部分日常任務來說，GPT-OSS-120B 已經夠用。建議先用 OSS-120B 跑一陣子，遇到瓶頸再升級。

---

## 選擇流程圖

```
你的預算是？
    │
    ├─ $0（免費）→ Oracle + Gemini 2.5 Flash 免費額度（heartbeat 關掉）
    │
    ├─ < $5 → Oracle + GPT-OSS-120B（免費 VM，有閒置風險）
    │
    ├─ < $10 → Hetzner + GPT-OSS-120B（穩定 VM，最推薦）
    │
    └─ 不限 → Hetzner + GPT-5.4 / Sonnet 4.6 / Opus 4.6
```

---

## 我的選擇

我自己用的是 **Azure B2s（2 vCPU + 4GB RAM）+ Azure OpenAI GPT-5.2**。

為什麼不選更便宜的 Oracle 或 Hetzner？因為我透過 [Microsoft for Startups](/zh-TW/blog/free-azure-startup-credits) 拿到了 **$25,000 美元的免費 Azure 額度**（效期一年）——雲端主機和 LLM API 全部涵蓋，目前**月成本 $0**。

如果你是獨立開發者或早期創業者，這條路線值得考慮：硬體 + LLM 成本直接歸零。

部署好之後做什麼？我把 OpenClaw 當作[整套 AI 工作流](/zh-TW/blog/personal-panopticon/)的手機入口——不在電腦前的時候，它每天早上推送 Daily Brief、隨時回報任務狀態，讓我在手機上就能跟整個系統互動。

---

## 結語

Self-hosted AI agent 的部署成本取決於兩件事：**你選的模型**和**你有沒有關 heartbeat**。

| 你的需求 | 推薦組合 | 月成本 |
|----------|----------|--------|
| 先試試看 | Oracle + Gemini 2.5 Flash 免費額度 | $0 |
| 省錢但要能用 | Oracle + GPT-OSS-120B | 約 $2-5 |
| 日常工作 | Hetzner + GPT-OSS-120B | 約 $7 |
| 旗艦體驗 | Hetzner + GPT-5.4 / Sonnet 4.6 / Opus 4.6 | 約 $140-330 |

**Oracle Cloud free tier 是免費的最佳選擇，但要有心理準備可能需要遷移。**

**Hetzner VPS 是付費的 CP 值之王，$4-5/月 買到穩定。**

**GPT-OSS-120B 是成本的 game changer** — tool calling 超越 o4-mini，月費卻只要 $2-5。如果預算有限，這是目前最值得的選擇。

---

## 下一步：OpenClaw Deploy 只要 30 分鐘

讀到這裡，你已經知道成本了。現在就差動手。

**推薦起步路線**：
1. 註冊 [Oracle Cloud](https://www.oracle.com/cloud/free/)（免費，5 分鐘）
2. 開一台 ARM VM（2 OCPU + 4GB）
3. 跟著 [OpenClaw 官方部署指南](https://docs.openclaw.ai/) 走
4. 接上 [Google AI Studio](https://ai.google.dev/)（免費 Gemini 2.5 Flash API）
5. 關掉 heartbeat（`every: "0m"`）省 token，等熟悉後再決定要不要開

30 分鐘後，你就有一個 24 小時待命的 self-hosted AI agent 了。

> 💡 部署前建議先讀 [OpenClaw 安全指南](/zh-TW/blog/2026-02-04-is-openclaw-safe-security-guide/)——設定好 token 上限、工具白名單和網路隔離，避免安全踩坑。

> 💡 **卡關了？** 歡迎到 [OpenClaw Discord](https://discord.gg/openclaw) 發問，社群很活躍。

---

## 常見問題

### OpenClaw 部署一個月要花多少錢？

取決於你選的 LLM 模型和 VM。免費方案（Oracle Cloud + Gemini 免費額度）$0/月；超低成本方案（Oracle + GPT-OSS-120B）約 $2-5/月；日常工作（Hetzner + GPT-OSS-120B）約 $7/月；旗艦體驗（Hetzner + Opus 4.6）可達 $330/月。可以從 GPT-OSS-120B 開始試，不夠再升級。

### OpenClaw heartbeat 是什麼？會額外花錢嗎？

Heartbeat 是 OpenClaw 預設開啟的背景機制，每 30 分鐘自動送一次 LLM 請求檢查狀態，每次消耗 8K-15K input tokens。用旗艦模型時，光 heartbeat 就可能 $30-100/月。可以用 `every: "0m"` 關掉，或開啟 `isolatedSession: true` + `lightContext: true` 省 90%。

### GPT-OSS-120B 適合跑 OpenClaw 嗎？

非常適合。GPT-OSS-120B 是 OpenAI 開源的 117B MoE 模型，tool calling 能力超越 o4-mini（TauBench 68% vs 65%），API 定價只要 $0.039/$0.10 per 1M tokens，日常使用月費約 $2。是目前 OpenClaw 性價比最高的選擇。

### Oracle Cloud 免費方案真的永久免費嗎？

是的，Oracle Cloud Always Free ARM 資源（最多 4 OCPU + 24 GB RAM）永久免費，不是 12 個月試用。但建議升級到 Pay As You Go 並設定 Budget Alert，避免帳號因閒置被回收。

---

*如果這篇讓你有了想法，[訂閱每週一封信](/zh-TW/)——我固定寫 AI 工作流、和一路上想通的事。*

*想聊聊怎麼把 AI 融入你的工作流？[看看我的服務](/zh-TW/services/)。*

---

## 參考資源

**雲端主機**
- [Oracle Cloud Free Tier](https://www.oracle.com/cloud/free/)
- [Hetzner Cloud](https://www.hetzner.com/cloud)
- [AWS EC2 Pricing](https://aws.amazon.com/ec2/pricing/on-demand/)
- [GCP Compute Engine Pricing](https://cloud.google.com/compute/all-pricing)
- [Azure VM Pricing](https://azure.microsoft.com/en-us/pricing/details/virtual-machines/linux/)

**LLM API**
- [OpenAI Pricing](https://openai.com/api/pricing/)
- [Anthropic Claude Pricing](https://www.anthropic.com/pricing)
- [Google AI Studio Pricing](https://ai.google.dev/pricing)
- [GPT-OSS-120B Model Card](https://openai.com/index/gpt-oss-model-card/)
- [LLM API Pricing 比較工具](https://pricepertoken.com/)

**OpenClaw**
- [OpenClaw 官網](https://openclaw.ai/)
- [OpenClaw GitHub](https://github.com/openclaw/openclaw)
- [OpenClaw Docs](https://docs.openclaw.ai/)

---

*最後更新：2026-03-17*
