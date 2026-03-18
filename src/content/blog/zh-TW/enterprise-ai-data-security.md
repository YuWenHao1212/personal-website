---
title: "公司用 AI，資料會外洩嗎？自架 LLM、雲端託管、訂閱制三種部署方式完整比較"
description: "企業導入 AI 最常卡在資安問題。這篇文章拆解三種部署方式：API 訂閱制、雲端託管（AWS Bedrock / Azure OpenAI）、自建開源模型，比較成本、資料處理流程、前端可用性，附完整引用來源，幫你選出最適合的路。"
pubDate: 2026-03-18
category: building-products
tags: ["AI", "企業AI", "LLM部署", "Claude API", "AWS Bedrock", "Azure OpenAI", "資安", "local LLM", "自架LLM"]
keywords: ["自架 LLM", "local llm", "企業 AI 部署", "claude api", "aws bedrock", "azure openai", "地端 AI", "vllm", "企業 AI 資安", "LLM 部署方式比較"]
lang: zh-TW
translationKey: enterprise-ai-data-security
draft: true
featured: false
heroImage: /images/blog/enterprise-ai-data-security.webp
focus_keyphrase: "自架 LLM"
relatedPosts: ["claude-code-tutorial.md", "agentic-coding-guide.md", "ai-harness.md"]
faq:
  - question: "企業用 AI 資料會外洩嗎？"
    answer: "取決於你選的部署方式。API 直接呼叫時，資料會經過 AI 公司的伺服器，但全程加密且商業用戶資料不用於訓練。雲端託管（如 AWS Bedrock）的資料留在你自己的雲端帳號，AI 公司看不到。自建開源模型則資料完全在你自己的機房。三條路的安全等級不同，成本也差很多。"
  - question: "AWS Bedrock 是自建 LLM 嗎？"
    answer: "不是。Bedrock 是 AWS 的託管服務，模型由 Anthropic 提供並跑在 AWS 的 GPU 上。你不需要管硬體、不需要懂 ML。差別在於資料的進出口綁在你的 AWS 帳號裡，Anthropic 無法存取。"
  - question: "Claude Pro 和 Claude API 的資料保留政策有什麼不同？"
    answer: "API（商業條款）資料保留 7 天後自動刪除，且不用於訓練。Pro 個人方案在關閉訓練選項時保留 30 天，開啟訓練時最長 5 年。企業用 API 商業條款最嚴格。"
  - question: "自建 LLM 可以跑 Claude 或 GPT-5 嗎？"
    answer: "不行。Anthropic 和 OpenAI 都不釋出旗艦模型（Claude Opus、GPT-5）的權重。想自建只能用開源模型如 Meta 的 Llama 或 OpenAI 的 gpt-oss 系列，能力與旗艦模型有落差。"
  - question: "訂閱制和 API 按量計費差多少？"
    answer: "訂閱制是吃到飽（有速率限制），API 是按量計費。同樣的使用量，API 費用遠高於訂閱價。AI 公司在訂閱制上大量補貼，所以讓員工日常使用 AI，訂閱制的性價比遠勝 Bedrock。"
---

## TL;DR

| 路線 | 方案 | 資料經過誰 | 月成本 / 人 | 啟動時間 |
|------|------|-----------|------------|---------|
| **🍽️ 去餐廳吃** | Claude Pro / ChatGPT | AI 公司伺服器 | **$20**（大量補貼） | 今天 |
| **🧑‍🍳 租廚房請廚師** | AWS Bedrock / Azure OpenAI | 你的 AWS / Azure 帳號 | **API 按量計費（遠高於訂閱制）** | 1-2 週 |
| **🏠 自己蓋廚房** | Ollama + Llama / gpt-oss | 你自己的機房 | **硬體千萬台幣 + ML 工程師** | 數月 |

> 三條路的差別不是安全性高低，是**你願意為「資料不經過 AI 公司」付多少代價**。

---

## 前言

「公司的資料傳到 AI，安全嗎？」

「這樣資料不就放到雲端了？不會有外洩風險嗎？」

「那我們是不是要自己架一套 LLM，資料才不會外流？」

這是我幫企業導入 AI 時最常聽到的三連問。從模糊的不安，到「雲端 = 不安全」，最後跳到「那就自己架」。

但自己架一套能用的 LLM 系統，光硬體就是千萬台幣起跳。而且你用不到最強的模型——因為 Anthropic 和 OpenAI 都不賣旗艦模型的權重。

自己架不是唯一的答案，多數情況下也不是最好的答案。這個問題歸根到底只有三件事：

1. **你的資料敏感到什麼程度？**
2. **你的員工是誰？**
3. **你願意為「資料不經過 AI 公司」付多少代價？**

這篇把三條路攤開——成本算到具體數字，資安政策附上官方來源，幫你做出正確的決策。

---

## 三條路總覽：去餐廳吃、自己租廚房請廚師來煮、自己蓋廚房

想像你要讓公司員工每天吃到好菜。

**去餐廳吃。** 你帶員工去米其林餐廳。廚藝頂級、點了就上、不用管廚房。食材（你的資料）會經過餐廳的廚房處理，但餐廳有嚴格的衛生認證，用完後短期內就清掉，不會拿你的食譜去開分店。

**租廚房請廚師。** 你請同一位米其林廚師到你公司的員工餐廳煮。廚藝一模一樣，但食材從頭到尾只在你租的廚房裡，廚師的老闆（AI 公司）碰不到。代價是：外燴按原價計費，沒有餐廳的套餐優惠。而且你的員工餐廳只有廚房，沒有前台——員工怎麼點餐？這個你要自己想辦法。

**自己蓋廚房。** 你蓋一間專屬廚房，自己請廚師。食材百分之百在你手上。但米其林廚師不外派——你只能請到手藝不錯但沒那麼頂的師傅。蓋廚房要買設備（GPU）、請人維護、付水電費（機房 + 電費），而且不管有沒有人吃飯，這些成本都在燒。

| | 🍽️ 去餐廳吃 | 🧑‍🍳 租廚房請廚師 | 🏠 自己蓋廚房 |
|--|---------|---------|-----------|
| **對應方案** | Claude Pro / ChatGPT | AWS Bedrock / Azure OpenAI | Ollama + Llama / gpt-oss |
| **資料經過誰** | AI 公司伺服器 | 你的 AWS / GCP / Azure 帳號 | 你自己的機房 |
| **廚師（模型）** | 米其林（Opus / GPT-5） | 同一位米其林 | 家常菜等級（開源模型） |
| **需要 GPU** | 不用 | 不用（雲端商管） | 要，很多 |
| **前端介面** | claude.ai / ChatGPT 完整介面 | ⚠️ 只有 API，沒有介面 | 自己做 |
| **付費方式** | 訂閱制（大量補貼） | 按量計費（API 原價） | 一次性大額 + 持續維護 |
| **不用的月份** | $20（訂閱費） | $0 | GPU 還是在折舊、吃電 |
| **啟動時間** | 今天 | 1-2 週 | 數月 |

> 來源：[Anthropic Pricing](https://platform.claude.com/docs/en/about-claude/pricing)、[AWS Bedrock Pricing](https://aws.amazon.com/bedrock/pricing/)、[Azure OpenAI Pricing](https://azure.microsoft.com/en-us/pricing/details/azure-openai/)

---

## 第一條路：去餐廳吃（API / 訂閱制）

**代表方案：** Claude Pro ($20/月)、ChatGPT Plus ($20/月)、API 直接呼叫

這是大部分企業的正確起點。

### 資料怎麼被處理？

![AI 資料處理流程與風險說明](/images/blog/ai-data-flow.webp)

「資料傳到 AI 安不安全？」與其猜，不如拆開來看——從資料離開你的電腦、到結果回到你手上，中間到底經過什麼、每一步誰能看到、風險多高：

| 步驟 | 做了什麼 | 誰能看到資料 | 風險 |
|------|---------|------------|------|
| 1. 加密打包 | 資料變密文離開電腦 | 沒有人 | 極低 — 跟網路銀行同技術 |
| 2. 到達伺服器 | 進入 Anthropic AWS 機房 | 沒有人 — 機器自動接收 | 低 — 通過國際資安稽核，同等級銀行機房 |
| 3. 安全檢查 | 自動程式掃描 | 沒有人 — 除非觸發違規警報（僅在要求 AI 產出嚴重違法內容時才會觸發，如暴力、犯罪教唆等。一般商業文書作業不可能觸發） | 低 |
| 4. 模型推論 | AI 讀資料、生成回應 | 沒有人 — 純機器 | 低 — 不訓練、不儲存到模型 |
| 5. 回傳結果 | 加密傳回電腦 | 沒有人 | 極低 |

> ※ 伺服器端會暫存加密的處理紀錄，依方案不同保留 7-30 天後自動刪除，一律不用於模型訓練。存取有嚴格權限管控，只有法院命令才能調閱。

> 來源：[Anthropic Certifications](https://privacy.claude.com/en/articles/10015870-what-certifications-has-anthropic-obtained)、[Anthropic — Data Retention](https://privacy.claude.com/en/articles/10023548-how-long-do-you-store-my-data)

### 跟你現在用的工具比

大部分企業員工每天都在用 Google Docs 處理公司資料，沒有人覺得有問題。但 Claude API 的保護其實更嚴格：

| 項目 | Claude API | Google Docs / iCloud |
|------|-----------|---------------------|
| 資料加密傳輸 | ✅ | ✅ |
| 雲端資料保留 | **7-30 天後刪除**（依方案） | 長期保存 |
| 用於訓練 / 改善服務 | **否** | Google 會用於改善服務 |
| 安全認證 | **通過國際資安稽核（持續性）+ AI 專用認證** | 通過國際資安稽核 |
| 人類會看到內容 | **不會**（純機器） | 可能（客服、審查人員） |

你用 Google Docs 都不擔心了，用 Claude API 其實沒有更不安全。

### 訂閱制 vs. API 按量計費

這是多數人不知道的——**訂閱制是吃到飽（有速率限制），API 是按量計費。同樣的使用量，API 費用遠高於 $20/月的訂閱價。**

AI 公司在訂閱制上大量補貼，目的是養成用戶習慣。OpenAI CEO [公開承認](https://futurism.com/the-byte/openai-chatgpt-pro-subscription-losing-money)訂閱方案正在虧錢，因為用戶使用量超出預期。

這代表什麼？如果你讓員工用 Claude Pro 或 ChatGPT Plus，每人 $20/月就能大量使用（用太快會有冷卻期，但日常工作綽綽有餘）。但如果你走 Bedrock / Azure OpenAI 的 API 按量計費，同樣的使用量要貴很多——因為 API 沒有補貼。

後面講第二條路時會再回來看這個差距。

### 適合誰

- 一般商業文書、行政作業、內容產出
- 非高度監管產業
- 想要最快啟動、最高性價比的企業
- 啟動時間：**今天**

---

## 第二條路：租廚房請廚師（雲端託管）

**代表方案：** AWS Bedrock（Claude）、Azure OpenAI Service（GPT）、GCP Vertex AI（Claude）

![雲端託管（Bedrock / Azure OpenAI）資料處理流程](/images/blog/ai-data-flow-bedrock.webp)

### Bedrock 是自建 LLM 嗎？不是

這是最多人搞錯的地方。Bedrock 不是「買一套 Claude 回來裝在自己的伺服器」。

回到廚師的比喻：**廚房是你跟 AWS 租的，廚師是 Anthropic 派來的。** 食材（資料）從頭到尾在你的廚房裡，廚師的老闆（AI 公司）碰不到。

你不需要碰 GPU、不需要管模型、不需要懂機器學習。就跟用 AWS 上的任何其他服務（S3、RDS）一樣，只是多了一個 AI 的 API endpoint。帳單也是跟 AWS 結，不用另外付 Anthropic。

關鍵差異是：**資料的進出口綁在你的 AWS 帳號裡，Anthropic 看不到。**

Anthropic 在官方文件裡寫得很明確：

> "The technology provided by Anthropic to AWS to enable Customer's access to the Services **does not give Anthropic access to Customer's AWS instance**, including Prompts or Outputs."

翻譯：Anthropic 無法存取你在 AWS 裡的任何東西，包括你問的問題和收到的回答。

> 來源：[Claude on Amazon Bedrock](https://platform.claude.com/docs/en/build-with-claude/claude-on-amazon-bedrock)、[AWS Bedrock Data Protection](https://docs.aws.amazon.com/bedrock/latest/userguide/data-protection.html)、[Azure OpenAI Data Privacy](https://learn.microsoft.com/en-us/legal/cognitive-services/openai/data-privacy)

### Token 同價，但記得補貼的事

Bedrock 上的 Claude 定價和 Anthropic API 一模一樣：

| 模型 | Anthropic API | AWS Bedrock |
|------|--------------|-------------|
| Sonnet 4.6 Input | $3 / M tokens | $3 / M tokens |
| Sonnet 4.6 Output | $15 / M tokens | $15 / M tokens |
| Opus 4.6 Input | $5 / M tokens | $5 / M tokens |
| Opus 4.6 Output | $25 / M tokens | $25 / M tokens |

帳怎麼走？**你只付 AWS 帳單**，不需要另外付 Anthropic。AWS 和 Anthropic 在後面自己拆帳，跟你無關。

> 來源：[AWS Bedrock Pricing](https://aws.amazon.com/bedrock/pricing/)

看起來沒差？別忘了前面算過的補貼差距——訂閱制是吃到飽，Bedrock 是按量計費。同一個員工同樣的使用量，Bedrock 的費用會遠高於 $20/月的訂閱價。這就是讓資料留在你自己雲端帳號的代價。

如果公司本來就在用 AWS，雲端環境的費用是既有成本，不算新增。但 token 費用是真金白銀多出來的。

### 前端問題：大部分人沒想到的坑

很多企業評估到「Bedrock 比較安全」就決定用了。但他們漏了一個問題：

**Bedrock 只有 API，沒有聊天介面。**

Claude Pro 有 claude.ai——打開瀏覽器就能聊天、上傳檔案、管理對話。Bedrock 什麼都沒有，只有一個 API endpoint。

| 使用者類型 | 有沒有前端問題 | 怎麼解 |
|-----------|-------------|--------|
| **一般員工** | ⚠️ 有 — 不會用 API | 要自建或買第三方介面（[Typingmind](https://www.typingmind.com/)、[Librechat](https://www.librechat.ai/) 等），開發 + 維護成本遠超 $20/月 |
| **工程師用 [Claude Code](/zh-TW/blog/claude-code-tutorial/)** | ✅ 沒有 — CLI 本來就不需要前端 | 兩個環境變數就能切換到 Bedrock |
| **系統自動化** | ✅ 沒有 — API 對 API | 本來就不需要人用的介面 |

我見過的案例：老闆說「Bedrock 比較安全，我們用 Bedrock」。IT 收到需求，開始開發內部聊天介面。兩個月後介面還在做，員工還是沒有 AI 可以用。原本想解決的效率問題，反而多卡了兩個月。

### Claude Code + Bedrock：工程團隊可以直接走

如果你的團隊本來就在用 [Claude Code](/zh-TW/blog/claude-code-tutorial/)，Bedrock 反而是最乾淨的路——因為 Claude Code 是 CLI，不需要前端。只要設兩個環境變數就能切換到 Bedrock，其他使用方式完全不變。IT 設好 AWS IAM 權限，工程師就能用，資料走公司 AWS VPC，Anthropic 碰不到。

> 來源：[Claude Code on Amazon Bedrock](https://code.claude.com/docs/en/amazon-bedrock)

### 適合誰

資料處理環境必須在已通過內部合規審計的基礎設施上，不能多一個新的外部供應商——這是走 Bedrock / Azure OpenAI 的核心理由。如果你的 AWS/Azure 已經在核准名單上，加一個 Bedrock 比重新審計 Anthropic API 簡單得多。

但要有心理準備：Bedrock 走的是 API 按量計費，沒有訂閱制的補貼，同樣的使用量成本會高出不少。這是合規的代價。

- 已有 AWS / GCP / Azure 且有合規需求的企業（金融、醫療等）
- 工程團隊用 Claude Code（最無痛的組合）
- 啟動時間：**1-2 週**（IT 設定）

---

## 第三條路：自己蓋廚房（自建開源模型）

![自建開源模型（地端部署）資料處理流程](/images/blog/ai-data-flow-selfhost.webp)

**代表方案：** Ollama + Llama、gpt-oss、vLLM 推論引擎

### 可以買 Claude 或 GPT-5 回來自己跑嗎？不行

先講一個很多人不知道的事實。

你沒辦法「買一套 Claude Opus 裝在公司機房裡跑」。同樣的，GPT-5 也不行。

**不管 Anthropic 還是 OpenAI，最強的模型權重都不對外釋出。**

| 模型 | 能不能下載回來自己跑？ |
|------|---------------------|
| Claude Opus / Sonnet | ❌ 不賣 |
| GPT-5 / GPT-5.4 | ❌ 不賣 |

> 來源：[anthropic.com/company](https://www.anthropic.com/company)、[OpenAI GPT-5 Models](https://platform.openai.com/docs/models/gpt-5)

想自建？只能用開源模型。

### 你能請到的廚師

| 模型 | 來源 | 參數量 | 硬體需求 | 能力 |
|------|------|--------|---------|------|
| gpt-oss-120b | OpenAI (Apache 2.0) | 117B（MoE, 5.1B active） | 單張 H100 (80GB) | AIME 2025: 97.9%（超越 o4-mini）、SWE-bench: 62.4%（o4-mini: 68.1%）|
| gpt-oss-20b | OpenAI (Apache 2.0) | 21B（MoE, 3.6B active） | 16GB GPU（需 MXFP4 量化） | 接近 o3-mini |
| Llama 3.1 405B | Meta | 405B | 多張 GPU | 中上 |

gpt-oss-120b 在數學上超越 o4-mini，但軟體工程略輸。整體接近打平。不差，但跟 Claude Opus 或 GPT-5 比仍有明顯差距。

> 來源：[OpenAI gpt-oss](https://openai.com/index/introducing-gpt-oss/)、[gpt-oss Model Card](https://openai.com/index/gpt-oss-model-card/)

### 自建 LLM 要花多少錢？

API 和訂閱制是**用多少付多少**——這個月沒人用，費用是 $0。

自建不是。GPU 買了就在折舊、在吃電，不管有沒有人用。

| 成本項目 | 概估 |
|---------|------|
| GPU 硬體（H100 一張） | ~$30,000-40,000 USD |
| 跑大型模型的 GPU 需求 | 數張到數百張，看模型大小 |
| ML 工程師 | 年薪百萬台幣以上 |
| 電費、機房、散熱 | 持續性支出 |
| 模型更新 | 每次新版本手動重新部署 |
| 前端介面 | 自己開發 + 持續維護 |

[gpt-oss-120b 只需要一張 H100 就能跑](https://huggingface.co/openai/gpt-oss-120b)，門檻比以前低很多。但如果你要服務整個公司的員工、需要多 instance 並行，硬體需求會快速上升。

### 適合誰

- 法規明確禁止資料離開內網（國防、特定政府機關）
- 有自己的 ML 團隊和 GPU 叢集
- 能接受模型能力不如旗艦的 trade-off
- 啟動時間：**數月**

---

## 決策框架

### 選擇流程圖

```
你的資料敏感到什麼程度？
    │
    ├─ 一般商業資料
    │   → 去餐廳吃：Claude Pro / ChatGPT，$20/月/人
    │     （API 安全措施已比 Google Docs 嚴格）
    │
    ├─ 有合規需求（金融 / 醫療 / 個資法）
    │   → 租廚房請廚師：Bedrock / Azure OpenAI
    │   │
    │   ├─ 員工是一般人 → 要解決前端問題，成本高
    │   └─ 員工是工程師 → Claude Code + Bedrock，最乾淨
    │
    └─ 資料不能離開自己的機房
        → 自己蓋廚房：開源模型 + 自有 GPU
          （千萬台幣起步，模型能力打折）
```

### 按使用者類型選

| 你的員工是誰 | 最佳方案 | 原因 |
|-------------|---------|------|
| 一般員工（行政、行銷、業務） | Claude Pro / ChatGPT | 完整介面、補貼最多、馬上能用 |
| 工程師 / 開發團隊 | Claude Code（可走 Bedrock） | 不需前端，Bedrock 可資料隔離 |
| 系統自動化（客服、報告） | API 或 Bedrock API | API 對 API，用量可控 |
| 國防 / 晶圓廠 IT | 自建開源模型 | 法規要求 |

---

## 我的選擇：為什麼推薦 Claude

> 以下是我的個人觀點。每個論點附有來源，你可以自己判斷。

我在幫企業導入 AI 時推薦 Claude，不只是因為模型能力。

### Anthropic 對安全的立場

Claude 的開發公司 Anthropic 是目前主要 AI 公司中對安全立場最強硬的：

- **2026 年 2 月**：美國國防部要求 Anthropic 移除合約中「禁止用於自主武器」和「禁止大規模監控」的條款。Anthropic CEO 公開拒絕，表示「無法昧著良心同意」。國防部因此將 Anthropic 列為「供應鏈風險」，下令所有聯邦機構停用 Claude，預估損失數十億美元營收。Anthropic 選擇接受損失，並於 2026 年 3 月對美國政府提起訴訟。
- **公司創立背景**：Anthropic 由前 OpenAI 研究員於 2021 年創立，正是因為認為 OpenAI 將商業利益置於安全之上。他們的 [Responsible Scaling Policy](https://www.anthropic.com/responsible-scaling-policy) v3.0 公開可查。

> 一家公司願意為了安全原則放棄數十億美元的政府合約，這代表他們對資料保護的承諾不只是寫在紙上。

> 來源：[ABC News](https://abcnews.com/Politics/anthropic-latest-pentagon-contract-bar-ai-autonomous-weapons/story?id=130558898)、[TechPolicy.Press Timeline](https://www.techpolicy.press/a-timeline-of-the-anthropic-pentagon-dispute/)、[EFF Analysis](https://www.eff.org/deeplinks/2026/03/anthropic-dod-conflict-privacy-protections-shouldnt-depend-decisions-few-powerful)

### Claude 在企業市場的領導地位

Claude 不只安全，在企業導入上也是目前的市場領導者：

| 指標 | Claude (Anthropic) | ChatGPT (OpenAI) |
|------|-------------------|-------------------|
| 企業市佔率 | **約三分之一** | 約 25% |
| Fortune 10 採用率 | **10 家中有 8 家** | — |
| 年花費 >$100 萬的企業客戶 | **500+ 家** | 未公開 |
| 年化營收（2026/2） | $14B | $25B |

> 來源：[Fortune](https://fortune.com/2026/02/05/chatgpt-openai-market-share-app-slip-google-rivals-close-the-gap/)、[Anthropic Series G](https://www.anthropic.com/news/anthropic-raises-30-billion-series-g-funding-380-billion-post-money-valuation)、[Yahoo Finance](https://finance.yahoo.com/news/openai-tops-25-billion-annualized-033836274.html)

---

## 結語

大部分企業不需要花千萬台幣自建 LLM，就能得到足夠的資料保護。

你的員工每天都在用 Google Docs，那也是雲端。真正的問題不是「要不要上雲端」，是**你願意為「資料不經過 AI 公司」付多少代價**。

| 你的答案 | 走哪條路 | 成本 |
|---------|---------|------|
| 不需要特別多 | Claude Pro / ChatGPT | $20/月，今天開始 |
| 資料不能經過 AI 公司 | Bedrock / Azure OpenAI | API 按量計費（遠高於訂閱制），需自建前端介面，1-2 週起 |
| 資料不能離開我的機房 | 自建開源模型 | 千萬台幣起，數月啟動 |

選錯路的代價不是不安全——是員工等了半年，還是沒有 AI 可以用。

---

*如果這篇讓你有了想法，[訂閱每週一封信](/zh-TW/)——我固定寫 AI 工作流、和一路上想通的事。*

*想聊聊怎麼把 AI 融入你的工作流？[看看我的服務](/zh-TW/services/)。*
