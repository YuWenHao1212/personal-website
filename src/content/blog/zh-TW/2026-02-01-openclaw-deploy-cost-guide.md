---
title: "OpenClaw 部署成本全攻略：$0-8/月打造你的私人 AI 助理"
description: "完整 OpenClaw 雲端部署成本分析：Oracle Cloud 免費方案、Hetzner 穩定平價、LLM API 價格比較。從免費到 $50/月，幫你找到最適合的個人 AI 雲端組合。"
pubDate: 2026-02-01
category: building-products
tags: ["AI", "獨立開發者", "數位工具", "OpenClaw", "self-hosted AI"]
lang: zh-TW
translationKey: openclaw-deploy-cost-guide
featured: true
relatedPosts: ["free-azure-startup-credits.md"]
heroImage: /images/blog/openclaw-deploy-cost.webp
keywords: ["OpenClaw deploy", "OpenClaw hosting cost", "Oracle Cloud free tier", "Hetzner VPS", "LLM API pricing", "self-hosted AI agent", "personal AI assistant"]
---

## TL;DR

| 路線 | 硬體方案 | LLM API | 成本 |
|------|----------|---------|------|
| **🆓 完全免費** | Oracle Cloud ARM | Gemini Flash-Lite 免費層 | **$0/月** |
| **💰 超低成本** | Oracle Cloud ARM | Claude Haiku 3 | **~$1-3/月** |
| **⚖️ 穩定平價** | Hetzner CAX11 | GPT-4.1-mini | **~$8/月** |
| **🏠 本地部署** | Mac Mini M4 | 任選 | **一次性 $599+** |

---

## 前言

「這是我用過最接近 JARVIS 的東西。」

這句話最近在開發者圈瘋傳，說的是 [OpenClaw](https://openclaw.ai/)——一個開源的 **AI agent framework**，讓你擁有 24 小時待命的 personal AI assistant，隨時在 Telegram、Discord、WhatsApp 回應你。

超過 **10 萬顆 GitHub stars**、TikTok 上的 demo 影片瘋傳——被開發者稱為「最接近 JARVIS 的東西」。但很多人卡在一個問題：

> 「擁有自己的 JARVIS，OpenClaw hosting cost 是多少？」

### 先搞懂：跑一個 AI Bot 需要什麼？

想像你要開一間 24 小時營業的咖啡店。

首先，你需要**一間店面**——可以買，也可以租。這就是「硬體」，讓 OpenClaw 程式跑起來的電腦。

**買店面（本地部署）**？不少人選擇 Mac Mini M4，不到 2 萬台幣、省電又安靜；或者直接用家裡閒置的舊電腦。好處是一次性購買、資料在自己手上，但要自己處理斷電、網路、24 小時開機的問題。

**租店面（雲端主機）**？電腦放在 Amazon、Google 等機房，透過網路操作。不用維護硬體、24 小時穩定運作，最低只要 **$0～$4/月**——但每月要付租金。

> 💡 有閒置舊電腦？本地部署幾乎零成本。沒有的話，雲端 CP 值更高。**本文重點是「租」——幫你找到最便宜的雲端方案。**

接著，你需要**請一位咖啡師**。OpenClaw 本身只是一個「框架」——你需要接上 AI 大腦，它才會思考、回答。這個 AI 大腦就是 **LLM（Large Language Model）**，像 ChatGPT、Claude、Gemini 都是。

> 💡 咖啡師有兩種請法：
> - **自己泡（Local LLM）**：AI 跑在你的電腦上，不用付 API 費。即溶咖啡（7B 小模型）普通電腦能跑，但能力有限；想要大師級（70B+）就需要高階 GPU，成本動輒數萬元
> - **叫外送（API LLM）**：AI 在雲端，用多少付多少，普通電腦就能點到頂級咖啡師
>
> 本文聚焦 **API LLM**——硬體門檻最低、不需要額外投資顯卡。

外送咖啡師有貴有便宜：
- 💰 便宜但夠用：Gemini Flash、Claude Haiku
- 👑 貴但更強：GPT-5、Claude Sonnet

那咖啡師怎麼收費？**按處理的文字量算**——這叫 token。

- 你傳給 AI 的訊息 = input tokens
- AI 回覆你的內容 = output tokens（通常比較貴，因為「產出」比「閱讀」費工）

點單越複雜、回覆越長，費用越高。輕度使用，一個月可能只要 $1-5。

---

好，基本概念有了。接下來算帳——本文聚焦「租店面 + 叫外送」的組合：

- **雲端硬體**：租一台遠端電腦跑 OpenClaw
- **API LLM**：叫外送咖啡師處理訊息

目標：**150 NTD/月以內** 搞定。

---

## Part 1：雲端硬體成本

---

### 最低硬體需求

根據 [OpenClaw 官方文件](https://docs.openclaw.ai/help/faq)：

| 項目 | 最低需求 | 建議規格 | 舒適配置 |
|------|----------|----------|----------|
| **vCPU** | 1 | 2 | 2+ |
| **RAM** | 1 GB | 2 GB | 4 GB |
| **Storage** | 500 MB | 2 GB | 10 GB+ |
| **OS** | Ubuntu 22.04+ / macOS | Ubuntu 24.04 | - |
| **依賴** | Node.js ≥ 22 | Docker（可選） | - |

> 💡 **官方說法**：OpenClaw Gateway 很輕量，**Raspberry Pi 4 都能跑**。
> 但如果你要跑多個 channel、browser automation 或 media tools，建議 2GB+ RAM。

> ⚠️ **實測經驗**：為了跑得順暢，建議至少 **2 vCPU + 2GB RAM**。

---

### 方案比較表（符合規格）

| 廠商 | 方案 | vCPU | RAM | Storage | 月費 | 備註 |
|------|------|:----:|:---:|:-------:|------|------|
| **Oracle Cloud** | ARM Flex | 2 OCPU (4 vCPU) | 4 GB | 100 GB | **免費** | ⚠️ 有風險 |
| **Hetzner** | CAX11 | 2 | 4 GB | 40 GB | ~$4 (~130 NTD) | ✅ 穩定首選 |
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
| CAX11 | 2 (ARM) | 4 GB | 40 GB NVMe | **~$4 (~130 NTD)** |

價格透明、無隱藏費用、不會閒置回收、效能穩定。想要省心，選這個就對了。

---

### 三大雲比較（AWS / GCP / Azure）

如果你偏好主流雲端：

| 廠商 | 方案 | vCPU | RAM | Storage | 月費 |
|------|------|:----:|:---:|:-------:|------|
| **AWS** | t4g.small | 2 | 2 GB | 10 GB | ~$13 |
| **GCP** | e2-small | 2 | 2 GB | 10 GB | ~$13 |
| **Azure** | B2s | 2 | 4 GB | 10 GB | ~$31 |

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

## Part 2：LLM API Pricing（API 成本）

### 篩選條件：必須支援 Vision（圖片解析）

OpenClaw 支援傳送圖片給 AI 分析，這是很實用的功能。因此本文只推薦**支援 Vision 的模型**。

---

### LLM 價格比較（支援 Vision）

> 價格單位：**USD / 1M tokens**

| 服務 | 模型 | Input | Output | 免費額度 |
|------|------|-------|--------|----------|
| **阿里雲** | Qwen3 VL Flash | $0.075 | $0.42 | ❌ |
| **Google** | Gemini 2.5 Flash-Lite | $0.10 | $0.40 | ✅ 15 RPM, 1000次/天 |
| **Anthropic** | Claude Haiku 3 | $0.25 | $1.25 | ❌ |
| **Google** | Gemini 2.5 Flash | $0.30 | $2.50 | ✅ 15 RPM, 500次/天 |
| **OpenAI** | GPT-4.1-mini | $0.40 | $1.60 | ❌ |
| **Anthropic** | Claude 3.5 Haiku | $0.80 | $4.00 | ❌ |
| **Google** | Gemini 2.5 Pro | $1.25 | $10.00 | ✅ 5 RPM, 100次/天 |
| **OpenAI** | GPT-5.2 | $1.75 | $14.00 | ❌ |
| **OpenAI** | GPT-4.1 | $2.00 | $8.00 | ❌ |
| **Anthropic** | Claude Sonnet 4.5 | $3.00 | $15.00 | ❌ |
| **Anthropic** | Claude Opus 4.5 | $5.00 | $25.00 | ❌ |

> 💡 **免費額度說明**：
> - **RPM**（Requests Per Minute）= 每分鐘可發送的請求數。15 RPM 代表每 4 秒可發一條訊息。
> - **次/天** = 每日請求上限，超過就要等隔天重置。
> - Google AI Studio 不綁卡即可使用，超過限制會被暫時擋住，不會收費。其他服務需綁卡。
>
> 💡 **最便宜有 Vision**：阿里雲 Qwen3 VL Flash（$0.075 input）

---

### 月成本估算

假設每天使用 OpenClaw 發送 **50 條訊息**（含少量圖片）：

- 平均每條：1,000 input + 1,500 output tokens
- 每日：50K input + 75K output
- **每月：~1.5M input + 2.25M output tokens**

| LLM 方案 | Input 成本 | Output 成本 | **月總計** |
|----------|------------|-------------|------------|
| Gemini Flash-Lite 免費層 | $0 | $0 | **$0**（每日 50 條在 1000 次限額內）|
| Gemini 2.5 Flash-Lite（付費）| $0.15 | $0.90 | **~$1** |
| Claude Haiku 3 | $0.38 | $2.81 | **~$3** |
| GPT-4.1-mini | $0.60 | $3.60 | **~$4** |
| Gemini 2.5 Flash（付費）| $0.45 | $5.63 | **~$6** |
| GPT-5.2 | $2.63 | $31.50 | **~$34** |

---

## Part 3：組合方案推薦

### 🆓 完全免費方案

| 項目 | 選擇 |
|------|------|
| 雲端 | Oracle Cloud ARM (2 OCPU + 4GB) |
| LLM | Google AI Studio Gemini 2.5 Flash-Lite |
| **月成本** | **$0** |
| 適合 | 想試試看、輕度使用（每日 50 條訊息以內）|
| 風險 | Oracle 閒置回收、Gemini 每日 1000 次限額 |

---

### 💰 超低成本方案（~100 NTD/月）

| 項目 | 選擇 |
|------|------|
| 雲端 | Oracle Cloud ARM (免費) |
| LLM | Claude Haiku 3 / Gemini Flash-Lite |
| **月成本** | **~$1-3 (~30-100 NTD)** |
| 適合 | 省錢但想要穩定 LLM |
| 風險 | Oracle 閒置回收 |

---

### ⚖️ 穩定平價方案（~250 NTD/月）

| 項目 | 選擇 |
|------|------|
| 雲端 | Hetzner CAX11 (~$4) |
| LLM | GPT-4.1-mini (~$4/月) 或 Gemini Flash-Lite (~$1/月) |
| **月成本** | **~$5-8 (~160-250 NTD)** |
| 適合 | 想要穩定、不想折騰 |
| 風險 | 低 |

---

### 🌐 主流體驗方案（~400 NTD/月）

| 項目 | 選擇 |
|------|------|
| 雲端 | Hetzner CAX11 (~$4) |
| LLM | GPT-5.2 / Claude Sonnet 4.5 |
| **月成本** | **~$38-50 (~1200-1600 NTD)** |
| 適合 | 想要最新模型體驗 |

---

## 選擇流程圖

```
你需要圖片解析功能嗎？
    │
    ├─ 否 → DeepSeek 最便宜（但本文不深入）
    │
    └─ 是 → 繼續 ↓

你的預算是？
    │
    ├─ $0（免費）→ Oracle + Gemini Flash-Lite 免費層
    │
    ├─ < $5 → Oracle + Claude Haiku 3 (~$3)
    │
    ├─ < $10 → Hetzner + GPT-4.1-mini (~$8)
    │
    └─ 不限 → Hetzner + GPT-5.2 / Claude Sonnet
```

---

## 我的選擇

我自己用的是 **Azure B2s（2 vCPU + 4GB RAM）+ Azure OpenAI GPT-5.1**。

為什麼不選更便宜的 Oracle 或 Hetzner？因為我透過 [Microsoft for Startups](/zh-TW/blog/free-azure-startup-credits) 拿到了 **$25,000 美元的免費 Azure 額度**（效期一年）——雲端主機和 LLM API 全部涵蓋，目前**月成本 $0**。

如果你是獨立開發者或早期創業者，這條路線值得考慮：硬體 + LLM 成本直接歸零。

---

## 結語

Self-hosted AI agent 的部署成本可以從 **$0 到 $50/月** 不等，取決於你的需求：

| 你的需求 | 推薦組合 | 月成本 |
|----------|----------|--------|
| 試試看就好 | Oracle + Gemini Flash-Lite 免費 | $0 |
| 省錢但堪用 | Oracle + Haiku 3 | ~$3 |
| 穩定不折騰 | Hetzner + GPT-4.1-mini | ~$8 |
| 最佳體驗 | Hetzner + Claude Sonnet | ~$50 |

**Oracle Cloud free tier 是免費的最佳選擇，但要有心理準備可能需要遷移。**

**Hetzner VPS 是付費的 CP 值之王，$4/月 買到穩定。**

---

## 下一步：OpenClaw Deploy 只要 30 分鐘

讀到這裡，你已經知道成本了。現在就差動手。

**推薦起步路線**：
1. 註冊 [Oracle Cloud](https://www.oracle.com/cloud/free/)（免費，5 分鐘）
2. 開一台 ARM VM（2 OCPU + 4GB）
3. 跟著 [OpenClaw 官方部署指南](https://docs.openclaw.ai/) 走
4. 接上 [Google AI Studio](https://ai.google.dev/)（免費 Gemini API）

30 分鐘後，你就有一個 24 小時待命的 self-hosted AI agent 了。

> 💡 **卡關了？** 歡迎到 [OpenClaw Discord](https://discord.gg/openclaw) 發問，社群很活躍。

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
- [Google AI Studio](https://ai.google.dev/pricing)
- [LLM API Pricing 比較工具](https://pricepertoken.com/)

**OpenClaw**
- [OpenClaw 官網](https://openclaw.ai/)
- [OpenClaw GitHub](https://github.com/openclaw/openclaw)
- [OpenClaw Docs](https://docs.openclaw.ai/)

---

*最後更新：2026-02-01*
